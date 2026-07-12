'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Screen } from '@/components/Screen';
import { BackLink } from '@/components/BackLink';
import { colors, fonts, gradients, borders, radius } from '@/design-system/neon/tokens';
import type { Boxer, FightLevel, RoundsFormat } from '@/design-system/types';
import { recordOf } from '@/data/mock-data';
import { DEMO_ME } from '@/lib/current-user';

const ROUNDS: RoundsFormat[] = ['3 × 3 min', '5 × 3 min'];
const LEVELS: FightLevel[] = ['Amateur', 'Pro-Am', 'Pro'];

const titleSx = { fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', color: colors.text, textTransform: 'uppercase', lineHeight: 1 } as const;

function Label({ children }: { children: React.ReactNode }) {
  return (
    <Typography sx={{ fontFamily: fonts.action, fontWeight: 600, fontSize: 9, letterSpacing: '0.16em', color: colors.textMuted, textTransform: 'uppercase', mb: 1 }}>
      {children}
    </Typography>
  );
}

/** Sélecteur segmenté (rounds / niveau). */
function ChoiceGroup<T extends string>({ options, value, onChange }: { options: T[]; value: T; onChange: (v: T) => void }) {
  return (
    <Box sx={{ display: 'flex', border: `1px solid ${colors.neonLineSoft}`, borderRadius: `${radius.md}px`, overflow: 'hidden' }}>
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
              backgroundColor: active ? colors.neon : 'transparent',
              color: active ? colors.onNeon : colors.textMuted,
              borderLeft: i > 0 ? `1px solid ${colors.neonLineSoft}` : 'none',
              fontFamily: fonts.action,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'background-color .15s, color .15s',
            }}
          >
            {opt}
          </Box>
        );
      })}
    </Box>
  );
}

export function LancerFlow({ boxers }: { boxers: Boxer[] }) {
  const params = useSearchParams();
  const advId = params.get('adversaire');
  const preOpponent = advId ? boxers.find((b) => b.id === advId) ?? null : null;

  const [opponent, setOpponent] = useState<Boxer | null>(preOpponent);
  const [step, setStep] = useState<1 | 2 | 3>(preOpponent ? 2 : 1);
  const [rounds, setRounds] = useState<RoundsFormat>('3 × 3 min');
  const [level, setLevel] = useState<FightLevel>('Amateur');

  const opponents = boxers.filter((b) => b.id !== DEMO_ME);

  // --- Étape 1 : choix de l'adversaire ---
  if (step === 1) {
    return (
      <Screen>
        <BackLink label="La Carte" href="/" />
        <Typography component="h1" sx={{ ...titleSx, fontSize: 34 }}>Lancer un défi</Typography>
        <Label>Étape 1 · Adversaire</Label>

        <Stack spacing={1.25} sx={{ mt: 1 }}>
          {opponents.map((b) => (
            <Box
              key={b.id}
              role="button"
              onClick={() => { setOpponent(b); setStep(2); }}
              sx={{
                background: gradients.card,
                border: borders.card,
                borderRadius: `${radius.lg}px`,
                p: 1.5,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1,
                transition: 'border-color .15s',
                '&:hover': { borderColor: colors.neonLine },
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ ...titleSx, fontSize: 20 }}>{b.name}</Typography>
                <Typography sx={{ fontFamily: fonts.data, fontSize: 11, color: colors.textMuted, textTransform: 'uppercase', mt: 0.25 }}>
                  {b.gymName} · {b.weight}
                </Typography>
              </Box>
              <Typography sx={{ ...titleSx, fontSize: 18, flexShrink: 0 }}>{recordOf(b)}</Typography>
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
          <Typography component="h1" sx={{ ...titleSx, fontSize: 44, color: colors.neonText, textShadow: '0 0 20px rgba(120,245,60,0.5)' }}>
            Défi envoyé
          </Typography>
          <Typography sx={{ fontFamily: fonts.data, fontSize: 14, fontWeight: 500, color: colors.textMuted, mt: 2, lineHeight: 1.5 }}>
            Ton défi contre <Box component="b" sx={{ color: colors.text }}>{opponent?.name}</Box> part d’abord à <Box component="b" sx={{ color: colors.neonText }}>ton coach</Box> pour validation, puis au coach adverse. Un combat n’est officiel que quand les deux coachs ont signé.
          </Typography>
          <Button href="/" fullWidth sx={{ mt: 4 }}>Retour à l’affiche</Button>
        </Box>
      </Screen>
    );
  }

  // --- Étape 2 : conditions ---
  return (
    <Screen>
      {preOpponent ? (
        <BackLink label="Les Combattants" href="/boxeurs" />
      ) : (
        <Box
          role="button"
          tabIndex={0}
          onClick={() => setStep(1)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStep(1); } }}
          sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, cursor: 'pointer', fontFamily: fonts.action, fontWeight: 600, fontSize: 12.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: colors.neonText, mb: 2, '&:hover': { color: colors.neon } }}
        >
          ← Adversaire
        </Box>
      )}

      <Typography component="h1" sx={{ ...titleSx, fontSize: 34 }}>Lancer un défi</Typography>
      <Label>Étape 2 · Conditions</Label>

      {/* Adversaire choisi */}
      <Box sx={{ background: gradients.card, border: `1px solid ${colors.neonLine}`, borderRadius: `${radius.lg}px`, p: 1.5, mt: 1 }}>
        <Typography sx={{ fontFamily: fonts.action, fontWeight: 600, fontSize: 9, letterSpacing: '0.14em', color: colors.neonText, textTransform: 'uppercase' }}>
          Adversaire
        </Typography>
        <Typography sx={{ ...titleSx, fontSize: 24, mt: 0.25 }}>{opponent?.name}</Typography>
        <Typography sx={{ fontFamily: fonts.data, fontSize: 12, color: colors.textMuted, textTransform: 'uppercase', mt: 0.25 }}>
          {opponent?.gymName} · {opponent?.weight} · {opponent && recordOf(opponent)}
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Label>Rounds</Label>
        <ChoiceGroup options={ROUNDS} value={rounds} onChange={setRounds} />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Label>Niveau</Label>
        <ChoiceGroup options={LEVELS} value={level} onChange={setLevel} />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Label>Lieu & date</Label>
        <Typography sx={{ fontFamily: fonts.data, fontSize: 13, color: colors.text, textTransform: 'uppercase' }}>
          À convenir entre les deux clubs après validation.
        </Typography>
      </Box>

      {/* Rappel validation encadrée */}
      <Box sx={{ background: gradients.card, border: `1px solid ${colors.neonLineSoft}`, borderRadius: `${radius.md}px`, p: 1.75, mt: 3 }}>
        <Typography sx={{ fontFamily: fonts.data, fontSize: 12.5, fontWeight: 600, color: colors.text, textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1.5 }}>
          Ton défi partira d’abord à <Box component="span" sx={{ color: colors.neonText }}>ton coach</Box>, puis au coach adverse. Tu ne signes pas toi-même.
        </Typography>
      </Box>

      <Button fullWidth sx={{ mt: 3 }} onClick={() => setStep(3)}>Envoyer le défi</Button>
    </Screen>
  );
}

export default LancerFlow;
