import { createClient } from '@/lib/supabase/server';
import type { Boxer, Challenge } from '@/design-system/types';

/**
 * Couche de lecture Supabase (côté serveur).
 * Mappe les lignes de la base (snake_case) vers les types de domaine (camelCase)
 * pour que les composants restent inchangés. Lecture publique (RLS).
 */

type BoxerRow = {
  id: string;
  name: string;
  gym_id: string | null;
  gyms: { name: string } | null;
  city: string | null;
  weight: string | null;
  wins: number;
  losses: number;
  draws: number;
  ko: number;
  streak: number;
  rank: number | null;
  coach_id: string | null;
  initials: string | null;
  avatar_url: string | null;
};

function mapBoxer(row: BoxerRow): Boxer {
  return {
    id: row.id,
    name: row.name,
    gymId: row.gym_id ?? '',
    gymName: row.gyms?.name ?? '',
    city: row.city ?? '',
    weight: (row.weight ?? '-71 kg') as Boxer['weight'],
    wins: row.wins,
    losses: row.losses,
    draws: row.draws,
    ko: row.ko,
    streak: row.streak,
    rank: row.rank ?? 0,
    coachId: row.coach_id ?? '',
    initials: row.initials ?? '',
    avatarUrl: row.avatar_url ?? undefined,
  };
}

const BOXER_SELECT = '*, gyms(name)';

export async function getBoxers(): Promise<Boxer[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('boxers')
    .select(BOXER_SELECT)
    .order('rank', { ascending: true, nullsFirst: false });
  if (error) {
    console.error('getBoxers', error.message);
    return [];
  }
  return (data as BoxerRow[]).map(mapBoxer);
}

export async function getBoxer(id: string): Promise<Boxer | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('boxers').select(BOXER_SELECT).eq('id', id).maybeSingle();
  if (error || !data) return null;
  return mapBoxer(data as BoxerRow);
}

type ChallengeRow = {
  id: string;
  serial: string | null;
  from_id: string;
  to_id: string | null;
  weight: string | null;
  rounds: string | null;
  level: string | null;
  date: string | null;
  venue: string | null;
  status: string;
  created_at: string;
};

function mapChallenge(row: ChallengeRow): Challenge {
  return {
    id: row.id,
    serial: row.serial ?? '',
    fromId: row.from_id,
    toId: row.to_id,
    weight: (row.weight ?? '-71 kg') as Challenge['weight'],
    rounds: (row.rounds ?? '3 × 3 min') as Challenge['rounds'],
    level: (row.level ?? 'Amateur') as Challenge['level'],
    date: row.date ?? '',
    venue: row.venue ?? '',
    status: row.status as Challenge['status'],
    createdAt: row.created_at,
  };
}

export async function getChallenges(): Promise<Challenge[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('challenges')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) {
    console.error('getChallenges', error.message);
    return [];
  }
  return (data as ChallengeRow[]).map(mapChallenge);
}

export async function getChallenge(id: string): Promise<Challenge | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('challenges').select('*').eq('id', id).maybeSingle();
  if (error || !data) return null;
  return mapChallenge(data as ChallengeRow);
}
