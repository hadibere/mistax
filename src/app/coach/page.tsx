'use client';

import { useRef, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { ValidationTicket } from '@/components/ValidationTicket';
import { Toast } from '@/components/Toast';
import { Screen } from '@/components/Screen';
import { colors, fonts, gradients, borders, radius } from '@/design-system/neon/tokens';
import type { Challenge } from '@/design-system/types';
import { boxerById, challenges, coaches } from '@/data/mock-data';

const coach = coaches[0];

/** Le défi implique-t-il un boxeur du coach ? Dans quel sens ? */
const isIncoming = (c: (typeof challenges)[number]) =>
  !!c.toId && coach.fighterIds.includes(c.toId) && c.status === 'pending';
const isOutgoing = (c: (typeof challenges)[number]) =>
  coach.fighterIds.includes(c.fromId) && c.status === 'sent';

/** Le boxeur du coach impliqué dans un défi (pour la perspective du ticket). */
const mineIdOf = (c: (typeof challenges)[number]) =>
  coach.fighterIds.includes(c.fromId) ? c.fromId : c.toId!;

/**
 * Défis à signer par le coach, dans les DEUX sens :
 *  - entrants  (pending) : « DÉFI POUR son boxeur » — à accepter
 *  - sortants  (sent)    : « DÉFI DE son boxeur »   — à valider avant envoi
 */
const initialToSign = challenges.filter((c) => isIncoming(c) || isOutgoing(c));

export default function CoachPage() {
  const [toSign, setToSign] = useState<Challenge[]>(initialToSign);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = (msg: string) => {
    setToast(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 3200);
  };

  const resolve = (c: Challenge, verb: string) => {
    setToSign((list) => list.filter((x) => x.id !== c.id));
    notify(`${verb} · ${c.serial}`);
  };

  const myFighters = coach.fighterIds.map(boxerById).filter(Boolean);
  const pendingFor = (id: string) => toSign.filter((c) => mineIdOf(c) === id).length;

  return (
    <Screen>
      {/* En-tête coach */}
      <Box sx={{ position: 'relative', background: gradients.card, border: borders.card, borderRadius: `${radius.card}px`, overflow: 'hidden', p: 2 }}>
        <Box sx={{ position: 'absolute', top: -40, right: -40, width: 150, height: 150, background: gradients.ambient, pointerEvents: 'none' }} />
        <Typography sx={{ fontFamily: fonts.action, fontWeight: 600, fontSize: 10, letterSpacing: '0.16em', color: colors.neonText, textTransform: 'uppercase', position: 'relative' }}>
          Espace coach — tu signes les combats
        </Typography>
        <Typography sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 30, color: colors.text, textTransform: 'uppercase', mt: 0.5, lineHeight: 0.95, position: 'relative' }}>
          {coach.name}
        </Typography>
        <Typography sx={{ fontFamily: fonts.data, fontSize: 12, color: colors.textMuted, textTransform: 'uppercase', mt: 0.5, position: 'relative' }}>
          {coach.gymName} · {coach.fighterIds.length} boxeurs
        </Typography>
      </Box>

      {/* À SIGNER */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3, mb: 1.5 }}>
        <Typography component="h2" sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 26, color: colors.text, textTransform: 'uppercase' }}>
          À signer
        </Typography>
        <Box sx={{ minWidth: 34, height: 34, px: 1, borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.neon }}>
          <Typography sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 18, color: colors.onNeon }}>{toSign.length}</Typography>
        </Box>
      </Box>

      {toSign.length === 0 ? (
        <Box sx={{ border: borders.card, borderRadius: `${radius.lg}px`, p: 2.5, textAlign: 'center' }}>
          <Typography sx={{ fontFamily: fonts.data, fontSize: 13, fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase' }}>
            Rien à signer. Tes boxeurs sont à jour.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={1.875}>
          {toSign.map((c) => (
            <ValidationTicket
              key={c.id}
              challenge={c}
              mineId={mineIdOf(c)}
              onSign={(x) => resolve(x, isOutgoing(x) ? 'Défi validé' : 'Combat signé')}
              onRefuse={(x) => resolve(x, isOutgoing(x) ? 'Envoi annulé' : 'Défi refusé')}
            />
          ))}
        </Stack>
      )}

      {/* MES BOXEURS */}
      <Typography component="h2" sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 26, color: colors.text, textTransform: 'uppercase', mt: 4, mb: 1.5 }}>
        Mes boxeurs
      </Typography>
      <Box sx={{ border: borders.card, borderRadius: `${radius.lg}px`, overflow: 'hidden' }}>
        {myFighters.map((b, i) => {
          const n = pendingFor(b!.id);
          return (
            <Box
              key={b!.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 1.75,
                py: 1.5,
                borderTop: i > 0 ? `1px solid ${colors.hairline}` : 'none',
              }}
            >
              <Box>
                <Typography sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 19, color: colors.text, textTransform: 'uppercase', lineHeight: 1 }}>
                  {b!.name}
                </Typography>
                <Typography sx={{ fontFamily: fonts.data, fontSize: 11, color: colors.textMuted, textTransform: 'uppercase', mt: 0.25 }}>
                  {b!.gymName} · {b!.weight}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: fonts.action,
                  fontWeight: 700,
                  fontSize: 9,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: n > 0 ? colors.neonText : colors.textMuted,
                }}
              >
                {n > 0 ? `${n} à signer` : 'À jour'}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {toast && <Toast message={toast} />}
    </Screen>
  );
}
