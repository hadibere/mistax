'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Screen } from '@/components/Screen';
import { BackLink } from '@/components/BackLink';
import { colors, fonts } from '@/design-system/tokens';
import type { Boxer, FightLevel, RoundsFormat } from '@/design-system/types';
import { boxerById, boxers, recordOf } from '@/data/mock-data';

const ME = 'you'; // utilisateur courant (Younes)
const ROUNDS: RoundsFormat[] = ['3 × 3 min', '5 × 3 min'];
const LEVELS: FightLevel[] = ['Amateur', 'Pro-Am', 'Pro'];

/** Petit label de section (mono). */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <Typography sx={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: '1.5px', color: colors.muted, textTransform: 'uppercase', mb: 1 }}>
      {children}
    </Typography>
  );
}

/** Sélecteur segmenté (rounds / niveau). */
function ChoiceGroup<T extends string>({ options, value, onChange }: { options: T[]; value: T; onChange: (v: T) => void }) {
  return (
    <Box sx={{ display: 'flex', border: `1.5px solid ${colors.ink}` }}>
      {options.map((opt, i) => {
        const active = opt === value;
        return (
          <Box
            key={opt}
            role="button"
            aria-pressed={active}
            onClick={() => onChange(opt)}
            sx={{
              flex: 1,
              textAlign: 'center',
              py: 1.25,
              cursor: 'pointer',
              userSelect: 'none',
              backgroundColor: active ? colors.ink : 'transparent',
              color: active ? colors.cream : colors.ink,
              borderLeft: i > 0 ? `1.5px solid ${colors.ink}` : 'none',
              fontFamily: fonts.ui,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '.5px',
              textTransform: 'uppercase',
            }}
          >
            {opt}
          </Box>
        );
      })}
    </Box>
  );
}

export function LancerFlow() {
  const params = useSearchParams();
  const preOpponent = params.get('adversaire') ? boxerById(params.get('adversaire')!) : null;

  const [opponent, setOpponent] = useState<Boxer | null>(preOpponent ?? null);
  const [step, setStep] = useState<1 | 2 | 3>(preOpponent ? 2 : 1);
  const [rounds, setRounds] = useState<RoundsFormat>('3 × 3 min');
  const [level, setLevel] = useState<FightLevel>('Amateur');

  const opponents = boxers.filter((b) => b.id !== ME);

  // --- Étape 1 : choix de l'adversaire ---
  if (step === 1) {
    return (
      <Screen>
        <BackLink label="La Carte" href="/" />
        <Typography variant="h3" component="h1" sx={{ color: colors.ink }}>
          Lancer un défi
        </Typography>
        <Label>Étape 1 · Adversaire</Label>

        <Stack spacing={1.25} sx={{ mt: 1 }}>
          {opponents.map((b) => (
            <Box
              key={b.id}
              role="button"
              onClick={() => {
                setOpponent(b);
                setStep(2);
              }}
              sx={{
                border: `1.5px solid ${colors.ink}`,
                backgroundColor: colors.paper,
                p: 1.5,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1,
                '&:hover': { backgroundColor: colors.paperAlt },
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontFamily: fonts.display, fontSize: 20, color: colors.ink, textTransform: 'uppercase', lineHeight: 1 }}>
                  {b.name}
                </Typography>
                <Typography sx={{ fontFamily: fonts.ui, fontSize: 11, color: colors.muted, textTransform: 'uppercase', mt: 0.25 }}>
                  {b.gymName} · {b.weight}
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: fonts.display, fontSize: 18, color: colors.ink, flexShrink: 0 }}>
                {recordOf(b)}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Screen>
    );
  }

  // --- Étape 3 : confirmation ---
  if (step === 3) {
    return (
      <Screen>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h2" component="h1" sx={{ color: colors.red }}>
            Défi envoyé
          </Typography>
          <Typography sx={{ fontFamily: fonts.ui, fontSize: 14, fontWeight: 500, color: colors.inkSoft, mt: 2 }}>
            Ton défi contre <b>{opponent?.name}</b> part d’abord à <b>ton coach</b> pour validation, puis au coach adverse.
            Un combat n’est officiel que quand les deux coachs ont signé.
          </Typography>
          <Button href="/" variant="contained" color="primary" fullWidth sx={{ mt: 4, py: 1.75 }}>
            Retour à l’affiche
          </Button>
        </Box>
      </Screen>
    );
  }

  // --- Étape 2 : conditions ---
  return (
    <Screen>
      {/* Un seul retour : vers Les Combattants si pré-sélection, sinon vers l'étape 1 */}
      {preOpponent ? (
        <BackLink label="Les Combattants" href="/boxeurs" />
      ) : (
        <Box
          role="button"
          tabIndex={0}
          onClick={() => setStep(1)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStep(1); } }}
          sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, cursor: 'pointer', fontFamily: fonts.ui, fontWeight: 700, fontSize: 12.5, letterSpacing: '1px', textTransform: 'uppercase', color: colors.ink, mb: 2, '&:hover': { color: colors.red } }}
        >
          ← Adversaire
        </Box>
      )}

      <Typography variant="h3" component="h1" sx={{ color: colors.ink }}>
        Lancer un défi
      </Typography>
      <Label>Étape 2 · Conditions</Label>

      {/* Adversaire choisi */}
      <Box sx={{ border: `1.5px solid ${colors.ink}`, backgroundColor: colors.paperAlt, p: 1.5, mt: 1 }}>
        <Typography sx={{ fontFamily: fonts.mono, fontSize: 8.5, letterSpacing: '.5px', color: colors.red, textTransform: 'uppercase' }}>
          Adversaire
        </Typography>
        <Typography sx={{ fontFamily: fonts.display, fontSize: 24, color: colors.ink, textTransform: 'uppercase', lineHeight: 1 }}>
          {opponent?.name}
        </Typography>
        <Typography sx={{ fontFamily: fonts.ui, fontSize: 12, color: colors.muted, textTransform: 'uppercase', mt: 0.25 }}>
          {opponent?.gymName} · {opponent?.weight} · {opponent && recordOf(opponent)}
        </Typography>
      </Box>

      {/* Rounds */}
      <Box sx={{ mt: 3 }}>
        <Label>Rounds</Label>
        <ChoiceGroup options={ROUNDS} value={rounds} onChange={setRounds} />
      </Box>

      {/* Niveau */}
      <Box sx={{ mt: 3 }}>
        <Label>Niveau</Label>
        <ChoiceGroup options={LEVELS} value={level} onChange={setLevel} />
      </Box>

      {/* Lieu & date */}
      <Box sx={{ mt: 3 }}>
        <Label>Lieu & date</Label>
        <Typography sx={{ fontFamily: fonts.ui, fontSize: 13, color: colors.inkSoft, textTransform: 'uppercase' }}>
          À convenir entre les deux clubs après validation.
        </Typography>
      </Box>

      {/* Rappel validation encadrée */}
      <Box sx={{ backgroundColor: colors.ink, p: 1.75, mt: 3 }}>
        <Typography sx={{ fontFamily: fonts.ui, fontSize: 12.5, fontWeight: 600, color: colors.onInk, textTransform: 'uppercase', letterSpacing: '.5px' }}>
          Ton défi partira d’abord à <Box component="span" sx={{ color: colors.amber }}>ton coach</Box>, puis au coach adverse. Tu ne signes pas toi-même.
        </Typography>
      </Box>

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.75 }} onClick={() => setStep(3)}>
        Envoyer le défi
      </Button>
    </Screen>
  );
}

export default LancerFlow;
