/**
 * KRU — Modèle de données (types partagés front/back).
 * Sert de contrat pour l'API Next.js (route handlers / server actions).
 */

export type WeightClass = '-60 kg' | '-63 kg' | '-67 kg' | '-71 kg';

export type FightLevel = 'Amateur' | 'Pro-Am' | 'Pro';

export type RoundsFormat = '3 × 3 min' | '5 × 3 min';

export type UserRole = 'boxer' | 'coach';

/** Un boxeur (combattant). */
export interface Boxer {
  id: string;
  name: string;
  gymId: string;
  gymName: string;
  city: string;
  weight: WeightClass;
  wins: number;
  losses: number;
  draws: number;
  ko: number;
  streak: number;      // série de victoires en cours
  rank: number;        // classement régional
  coachId: string;     // le coach qui valide ses défis
  initials: string;    // ex "YB" (avatar de repli)
  avatarUrl?: string;
}

/** Bilan formaté, ex "8-2-1" */
export type Record = `${number}-${number}-${number}`;

/** Statut d'un défi dans son cycle de vie. */
export type ChallengeStatus =
  | 'sent'       // envoyé par un boxeur, en attente de SON coach
  | 'pending'    // reçu, en attente de validation du coach destinataire
  | 'accepted'   // signé par le(s) coach(s) — combat officiel
  | 'refused'    // refusé par un coach
  | 'open';      // défi ouvert (pas d'adversaire désigné)

export interface Challenge {
  id: string;
  serial: string;          // n° de billet affiché, ex "N° 0451"
  fromId: string;          // boxeur qui lance
  toId: string | null;     // boxeur défié (null si défi ouvert)
  weight: WeightClass;
  rounds: RoundsFormat;
  level: FightLevel;
  date: string;            // ISO ou libellé "SAM 12 JUIL" / "À DÉFINIR"
  venue: string;
  status: ChallengeStatus;
  createdAt: string;       // ISO
}

/** Un coach (le Kru) — valide les combats de ses boxeurs. */
export interface Coach {
  id: string;
  name: string;            // ex "Kru Somchai"
  gymId: string;
  gymName: string;
  fighterIds: string[];    // boxeurs sous sa responsabilité
  acceptanceRate?: number; // % de défis acceptés
}

export interface Gym {
  id: string;
  name: string;
  city: string;
}

/** Étape de la timeline d'un défi (écran Détail). */
export interface TimelineStep {
  label: string;           // "DÉFI LANCÉ", "VALIDATION DU COACH", ...
  done: boolean;
}

/** Résultat de combat passé (palmarès). */
export interface Bout {
  opponentName: string;
  result: 'V' | 'D' | 'N';
  method: string;          // "KO · Round 2", "Décision unanime"...
  date: string;            // "MAI 26"
}
