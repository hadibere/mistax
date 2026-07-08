import type { Boxer, Bout, Challenge, Coach, Gym } from '../design-system/types';

/**
 * Données de démo (fictives) reprises des prototypes.
 * À remplacer par ta vraie source (DB / API). Sert de seed et d'exemple de forme.
 * L'utilisateur courant côté "boxeur" est `you` (Younes Benali).
 * L'utilisateur courant côté "coach" est `somchai`.
 */

export const gyms: Gym[] = [
  { id: 'sitan-paris', name: 'Team Sitan Paris', city: 'Paris' },
  { id: 'venum-lyon', name: 'Venum Lyon', city: 'Lyon' },
  { id: 'ares-lille', name: 'Team Arès Lille', city: 'Lille' },
  { id: 'kombat-nice', name: 'Kombat Nice', city: 'Nice' },
  { id: 'sitan-marseille', name: 'Sitan Marseille', city: 'Marseille' },
];

export const boxers: Boxer[] = [
  { id: 'you',     name: 'Younes Benali', gymId: 'sitan-paris', gymName: 'Team Sitan Paris', city: 'Paris', weight: '-71 kg', wins: 8, losses: 2, draws: 1, ko: 5, streak: 3, rank: 4, coachId: 'somchai', initials: 'YB' },
  { id: 'rayan',   name: 'Rayan Koné',    gymId: 'venum-lyon',  gymName: 'Venum Lyon',       city: 'Lyon',  weight: '-71 kg', wins: 11, losses: 3, draws: 0, ko: 7, streak: 5, rank: 1, coachId: 'chai',   initials: 'RK' },
  { id: 'sofiane', name: 'Sofiane Amrani', gymId: 'ares-lille',  gymName: 'Team Arès Lille', city: 'Lille', weight: '-67 kg', wins: 12, losses: 2, draws: 1, ko: 8, streak: 4, rank: 2, coachId: 'chai',   initials: 'SA' },
  { id: 'theo',    name: 'Théo Marchand', gymId: 'kombat-nice', gymName: 'Kombat Nice',      city: 'Nice',  weight: '-71 kg', wins: 9, losses: 4, draws: 1, ko: 3, streak: 1, rank: 3, coachId: 'chai',   initials: 'TM' },
  { id: 'idriss',  name: 'Idriss Fofana', gymId: 'venum-lyon',  gymName: 'Venum Lyon',       city: 'Lyon',  weight: '-71 kg', wins: 7, losses: 2, draws: 0, ko: 4, streak: 2, rank: 5, coachId: 'chai',   initials: 'IF' },
  { id: 'malik',   name: 'Malik Traoré',  gymId: 'sitan-marseille', gymName: 'Sitan Marseille', city: 'Marseille', weight: '-67 kg', wins: 6, losses: 1, draws: 0, ko: 4, streak: 6, rank: 6, coachId: 'chai', initials: 'MT' },
  { id: 'karim',   name: 'Karim Haddad',  gymId: 'ares-lille',  gymName: 'Team Arès Lille', city: 'Lille', weight: '-60 kg', wins: 5, losses: 3, draws: 0, ko: 2, streak: 1, rank: 7, coachId: 'chai',   initials: 'KH' },
  { id: 'nael',    name: 'Naël Dubois',   gymId: 'kombat-nice', gymName: 'Kombat Nice',      city: 'Nice',  weight: '-63 kg', wins: 4, losses: 0, draws: 0, ko: 3, streak: 4, rank: 8, coachId: 'chai',   initials: 'ND' },
  { id: 'lina',    name: 'Lina Rossi',    gymId: 'sitan-paris', gymName: 'Team Sitan Paris', city: 'Paris', weight: '-60 kg', wins: 3, losses: 1, draws: 0, ko: 1, streak: 2, rank: 12, coachId: 'somchai', initials: 'LR' },
];

export const coaches: Coach[] = [
  { id: 'somchai', name: 'Kru Somchai', gymId: 'sitan-paris', gymName: 'Team Sitan Paris', fighterIds: ['you', 'lina'], acceptanceRate: 0.78 },
];

export const challenges: Challenge[] = [
  { id: 'c1', serial: 'N° 0451', fromId: 'rayan',   toId: 'you',    weight: '-71 kg', rounds: '5 × 3 min', level: 'Amateur', date: 'SAM 12 JUIL', venue: 'GYMNASE DE LA VILLETTE', status: 'pending',  createdAt: '2026-06-20T10:00:00Z' },
  { id: 'c2', serial: 'N° 0474', fromId: 'karim',   toId: 'lina',   weight: '-60 kg', rounds: '3 × 3 min', level: 'Amateur', date: 'DIM 20 JUIL', venue: 'SALLE MARCEL-CERDAN',    status: 'pending',  createdAt: '2026-06-22T10:00:00Z' },
  { id: 'c3', serial: 'N° 0497', fromId: 'sofiane', toId: 'theo',   weight: '-67 kg', rounds: '5 × 3 min', level: 'Pro-Am',  date: 'SAM 26 JUIL', venue: 'HALLE CARPENTIER',      status: 'accepted', createdAt: '2026-06-18T10:00:00Z' },
  { id: 'c4', serial: 'N° 0520', fromId: 'you',     toId: 'idriss', weight: '-71 kg', rounds: '3 × 3 min', level: 'Amateur', date: 'À DÉFINIR',   venue: 'À DÉFINIR',             status: 'sent',     createdAt: '2026-06-25T10:00:00Z' },
];

/**
 * Palmarès de démo. Younes ('you') reprend la capture de référence.
 * Pour les autres, un palmarès générique est dérivé du bilan (voir boutsOf).
 */
export const palmares: Partial<Record<string, Bout[]>> = {
  you: [
    { opponentName: 'Rayan Koné', result: 'V', method: 'KO · Round 2', date: 'MAI 26' },
    { opponentName: 'Sofiane Amrani', result: 'V', method: 'Décision unanime', date: 'MARS 26' },
    { opponentName: 'Théo Marchand', result: 'D', method: 'Décision partagée', date: 'JAN 26' },
  ],
};

const DEMO_METHODS = ['KO · Round 2', 'Décision unanime', 'Arrêt médical', 'Décision partagée'];

/** Helpers de dérivation utiles côté UI. */
export const recordOf = (b: Boxer) => `${b.wins}-${b.losses}-${b.draws}` as const;
export const boxerById = (id: string) => boxers.find((b) => b.id === id);
export const challengeById = (id: string) => challenges.find((c) => c.id === id);

/** Palmarès d'un boxeur : celui défini, sinon un générique dérivé du bilan. */
export function boutsOf(boxer: Boxer): Bout[] {
  const defined = palmares[boxer.id];
  if (defined) return defined;

  const opponents = boxers.filter((b) => b.id !== boxer.id);
  const total = Math.min(boxer.wins + boxer.losses, 5);
  return Array.from({ length: total }, (_, i) => {
    const isWin = i < boxer.wins;
    return {
      opponentName: opponents[i % opponents.length]?.name ?? 'Adversaire',
      result: isWin ? 'V' : 'D',
      method: DEMO_METHODS[i % DEMO_METHODS.length],
      date: 'SAISON 26',
    } satisfies Bout;
  });
}
