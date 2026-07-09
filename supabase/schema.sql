-- ============================================================
--  MistaX — Schéma initial : tables + RLS + fonctions + seed démo
--  À coller dans Supabase → SQL Editor → Run (une seule fois).
--
--  Modèle : le COACH vérifié est le gardien. Il s'inscrit (tu le valides),
--  il gère/invite ses boxeurs, et lui seul valide les défis.
--  Lecture publique (vitrine : classement, fiches, défis) ; écriture réservée.
-- ============================================================

create extension if not exists pgcrypto;  -- gen_random_uuid()

-- ------------------------------------------------------------
--  TABLES
-- ------------------------------------------------------------

create table if not exists public.gyms (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  city       text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.coaches (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid unique references auth.users(id) on delete cascade,   -- compte du coach
  name       text not null,
  gym_id     uuid references public.gyms(id) on delete set null,
  status     text not null default 'pending' check (status in ('pending','verified','rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.boxers (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid unique references auth.users(id) on delete set null,  -- NULL tant que pas invité
  name       text not null,
  gym_id     uuid references public.gyms(id) on delete set null,
  city       text,
  weight     text,
  wins       int not null default 0,
  losses     int not null default 0,
  draws      int not null default 0,
  ko         int not null default 0,
  streak     int not null default 0,
  rank       int,
  coach_id   uuid references public.coaches(id) on delete set null,     -- le coach qui le gère
  initials   text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.challenges (
  id         uuid primary key default gen_random_uuid(),
  serial     text,
  from_id    uuid not null references public.boxers(id) on delete cascade,  -- le tenant (qui lance)
  to_id      uuid references public.boxers(id) on delete cascade,           -- le challenger (NULL = ouvert)
  weight     text,
  rounds     text check (rounds in ('3 × 3 min','5 × 3 min')),
  level      text check (level in ('Amateur','Pro-Am','Pro')),
  date       text,
  venue      text,
  status     text not null default 'sent' check (status in ('sent','pending','accepted','refused','open')),
  created_at timestamptz not null default now()
);

create table if not exists public.invitations (
  id         uuid primary key default gen_random_uuid(),
  token      text unique not null,
  boxer_id   uuid not null references public.boxers(id) on delete cascade,
  coach_id   uuid not null references public.coaches(id) on delete cascade,
  expires_at timestamptz not null,
  used_at    timestamptz,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
--  FONCTIONS D'AIDE (security definer = bypass RLS, sans récursion)
-- ------------------------------------------------------------

create or replace function public.current_coach_id()
returns uuid language sql stable security definer set search_path = public as $$
  select id from public.coaches
  where user_id = auth.uid() and status = 'verified'
  limit 1;
$$;

create or replace function public.current_boxer_id()
returns uuid language sql stable security definer set search_path = public as $$
  select id from public.boxers where user_id = auth.uid() limit 1;
$$;

grant execute on function public.current_coach_id() to anon, authenticated;
grant execute on function public.current_boxer_id() to anon, authenticated;

-- ------------------------------------------------------------
--  RLS
-- ------------------------------------------------------------

alter table public.gyms        enable row level security;
alter table public.coaches     enable row level security;
alter table public.boxers      enable row level security;
alter table public.challenges  enable row level security;
alter table public.invitations enable row level security;

-- GYMS : lecture publique ; un coach (en cours d'inscription) peut créer son club
create policy "gyms_read_all"    on public.gyms for select using (true);
create policy "gyms_insert_auth" on public.gyms for insert to authenticated with check (true);

-- COACHES : lecture publique ; un utilisateur crée SON coach en 'pending'
-- (le passage à 'verified' se fait côté dashboard Supabase = service_role, qui bypass RLS)
create policy "coaches_read_all"     on public.coaches for select using (true);
create policy "coaches_insert_self"  on public.coaches for insert to authenticated
  with check (user_id = auth.uid() and status = 'pending');

-- BOXERS : lecture publique ; le coach vérifié gère ses boxeurs
create policy "boxers_read_all"        on public.boxers for select using (true);
create policy "boxers_insert_by_coach" on public.boxers for insert to authenticated
  with check (coach_id = public.current_coach_id() and user_id is null);
create policy "boxers_update_by_coach" on public.boxers for update to authenticated
  using (coach_id = public.current_coach_id())
  with check (coach_id = public.current_coach_id());
create policy "boxers_delete_by_coach" on public.boxers for delete to authenticated
  using (coach_id = public.current_coach_id());

-- CHALLENGES : lecture publique
create policy "challenges_read_all" on public.challenges for select using (true);

-- création : par le boxeur concerné OU par son coach ; statut initial 'sent'
create policy "challenges_insert" on public.challenges for insert to authenticated
  with check (
    status = 'sent' and (
      from_id = public.current_boxer_id()
      or exists (select 1 from public.boxers b where b.id = from_id and b.coach_id = public.current_coach_id())
    )
  );

-- MAJ (signer / refuser) : UNIQUEMENT le coach d'un boxeur impliqué  ← LE différenciateur, imposé en base
create policy "challenges_update_by_coach" on public.challenges for update to authenticated
  using (
    exists (select 1 from public.boxers b where b.id = challenges.from_id and b.coach_id = public.current_coach_id())
    or exists (select 1 from public.boxers b where b.id = challenges.to_id and b.coach_id = public.current_coach_id())
  )
  with check (
    exists (select 1 from public.boxers b where b.id = challenges.from_id and b.coach_id = public.current_coach_id())
    or exists (select 1 from public.boxers b where b.id = challenges.to_id and b.coach_id = public.current_coach_id())
  );

-- INVITATIONS : privées au coach créateur (l'anonyme lit le billet via la RPC ci-dessous)
create policy "invitations_select_coach" on public.invitations for select to authenticated
  using (coach_id = public.current_coach_id());
create policy "invitations_insert_coach" on public.invitations for insert to authenticated
  with check (
    coach_id = public.current_coach_id()
    and exists (select 1 from public.boxers b where b.id = boxer_id and b.coach_id = public.current_coach_id())
  );
create policy "invitations_delete_coach" on public.invitations for delete to authenticated
  using (coach_id = public.current_coach_id());

-- ------------------------------------------------------------
--  RPC INVITATION
--   - get_invitation   : l'anonyme lit le billet (fiche pré-remplie) via un token valide
--   - accept_invitation: le boxeur (connecté) relie son compte à sa fiche
-- ------------------------------------------------------------

create or replace function public.get_invitation(p_token text)
returns table (boxer_name text, gym_name text, weight text, record text)
language sql stable security definer set search_path = public as $$
  select b.name, g.name, b.weight,
         (b.wins::text || '-' || b.losses::text || '-' || b.draws::text)
  from public.invitations i
  join public.boxers b on b.id = i.boxer_id
  left join public.gyms g on g.id = b.gym_id
  where i.token = p_token and i.used_at is null and i.expires_at > now();
$$;

create or replace function public.accept_invitation(p_token text)
returns uuid
language plpgsql security definer set search_path = public as $$
declare v_boxer uuid;
begin
  select boxer_id into v_boxer
  from public.invitations
  where token = p_token and used_at is null and expires_at > now()
  for update;

  if v_boxer is null then
    raise exception 'Invitation invalide ou expirée';
  end if;

  update public.boxers set user_id = auth.uid()
  where id = v_boxer and user_id is null;

  if not found then
    raise exception 'Cette fiche est déjà reliée à un compte';
  end if;

  update public.invitations set used_at = now() where token = p_token;
  return v_boxer;
end;
$$;

grant execute on function public.get_invitation(text)    to anon, authenticated;
grant execute on function public.accept_invitation(text) to authenticated;

-- ------------------------------------------------------------
--  SEED DÉMO (données fictives ; le coach démo n'a pas de compte → user_id NULL, déjà 'verified')
-- ------------------------------------------------------------

insert into public.gyms (id, name, city) values
 ('10000000-0000-4000-8000-000000000001','Team Sitan Paris','Paris'),
 ('10000000-0000-4000-8000-000000000002','Venum Lyon','Lyon'),
 ('10000000-0000-4000-8000-000000000003','Team Arès Lille','Lille'),
 ('10000000-0000-4000-8000-000000000004','Kombat Nice','Nice'),
 ('10000000-0000-4000-8000-000000000005','Sitan Marseille','Marseille')
on conflict (id) do nothing;

insert into public.coaches (id, user_id, name, gym_id, status) values
 ('20000000-0000-4000-8000-000000000001', null, 'Coach Somchai', '10000000-0000-4000-8000-000000000001', 'verified')
on conflict (id) do nothing;

insert into public.boxers
 (id, name, gym_id, city, weight, wins, losses, draws, ko, streak, rank, coach_id, initials) values
 ('30000000-0000-4000-8000-000000000001','Younes Benali','10000000-0000-4000-8000-000000000001','Paris','-71 kg', 8,2,1,5,3, 4,'20000000-0000-4000-8000-000000000001','YB'),
 ('30000000-0000-4000-8000-000000000002','Rayan Koné',   '10000000-0000-4000-8000-000000000002','Lyon', '-71 kg',11,3,0,7,5, 1, null,'RK'),
 ('30000000-0000-4000-8000-000000000003','Sofiane Amrani','10000000-0000-4000-8000-000000000003','Lille','-67 kg',12,2,1,8,4, 2, null,'SA'),
 ('30000000-0000-4000-8000-000000000004','Théo Marchand','10000000-0000-4000-8000-000000000004','Nice', '-71 kg', 9,4,1,3,1, 3, null,'TM'),
 ('30000000-0000-4000-8000-000000000005','Idriss Fofana','10000000-0000-4000-8000-000000000002','Lyon', '-71 kg', 7,2,0,4,2, 5, null,'IF'),
 ('30000000-0000-4000-8000-000000000006','Malik Traoré', '10000000-0000-4000-8000-000000000005','Marseille','-67 kg',6,1,0,4,6, 6, null,'MT'),
 ('30000000-0000-4000-8000-000000000007','Karim Haddad', '10000000-0000-4000-8000-000000000003','Lille','-60 kg', 5,3,0,2,1, 7, null,'KH'),
 ('30000000-0000-4000-8000-000000000008','Naël Dubois',  '10000000-0000-4000-8000-000000000004','Nice', '-63 kg', 4,0,0,3,4, 8, null,'ND'),
 ('30000000-0000-4000-8000-000000000009','Lina Rossi',   '10000000-0000-4000-8000-000000000001','Paris','-60 kg', 3,1,0,1,2,12,'20000000-0000-4000-8000-000000000001','LR')
on conflict (id) do nothing;

insert into public.challenges
 (id, serial, from_id, to_id, weight, rounds, level, date, venue, status) values
 ('40000000-0000-4000-8000-000000000001','N° 0451','30000000-0000-4000-8000-000000000002','30000000-0000-4000-8000-000000000001','-71 kg','5 × 3 min','Amateur','SAM 12 JUIL','GYMNASE DE LA VILLETTE','pending'),
 ('40000000-0000-4000-8000-000000000002','N° 0474','30000000-0000-4000-8000-000000000007','30000000-0000-4000-8000-000000000009','-60 kg','3 × 3 min','Amateur','DIM 20 JUIL','SALLE MARCEL-CERDAN','pending'),
 ('40000000-0000-4000-8000-000000000003','N° 0497','30000000-0000-4000-8000-000000000003','30000000-0000-4000-8000-000000000004','-67 kg','5 × 3 min','Pro-Am','SAM 26 JUIL','HALLE CARPENTIER','accepted'),
 ('40000000-0000-4000-8000-000000000004','N° 0520','30000000-0000-4000-8000-000000000001','30000000-0000-4000-8000-000000000005','-71 kg','3 × 3 min','Amateur','À DÉFINIR','À DÉFINIR','sent')
on conflict (id) do nothing;
