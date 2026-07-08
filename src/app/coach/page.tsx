'use client';

import { useRef, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { ValidationTicket } from '@/components/ValidationTicket';
import { Toast } from '@/components/Toast';
import { Screen } from '@/components/Screen';
import { colors, fonts } from '@/design-system/tokens';
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
      <Box sx={{ backgroundColor: colors.ink, p: 2 }}>
        <Typography sx={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '1.5px', color: colors.amber, textTransform: 'uppercase' }}>
          Espace coach — tu signes les combats
        </Typography>
        <Typography sx={{ fontFamily: fonts.display, fontSize: 30, color: colors.cream, textTransform: 'uppercase', mt: 0.5, lineHeight: 0.95 }}>
          {coach.name}
        </Typography>
        <Typography sx={{ fontFamily: fonts.ui, fontSize: 12, color: colors.onInkMuted, textTransform: 'uppercase', mt: 0.5 }}>
          {coach.gymName} · {coach.fighterIds.length} boxeurs
        </Typography>
      </Box>

      {/* À SIGNER */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3, mb: 1.5 }}>
        <Typography variant="h4" component="h2" sx={{ color: colors.ink }}>
          À signer
        </Typography>
        <Box sx={{ minWidth: 34, height: 34, px: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.red }}>
          <Typography sx={{ fontFamily: fonts.display, fontSize: 18, color: colors.cream }}>{toSign.length}</Typography>
        </Box>
      </Box>

      {toSign.length === 0 ? (
        <Box sx={{ border: `1.5px solid ${colors.ink}`, p: 2.5, textAlign: 'center' }}>
          <Typography sx={{ fontFamily: fonts.ui, fontSize: 13, fontWeight: 600, color: colors.muted, textTransform: 'uppercase' }}>
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
      <Typography variant="h4" component="h2" sx={{ color: colors.ink, mt: 4, mb: 1.5 }}>
        Mes boxeurs
      </Typography>
      <Box sx={{ border: `1.5px solid ${colors.ink}` }}>
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
                <Typography sx={{ fontFamily: fonts.display, fontSize: 19, color: colors.ink, textTransform: 'uppercase', lineHeight: 1 }}>
                  {b!.name}
                </Typography>
                <Typography sx={{ fontFamily: fonts.ui, fontSize: 11, color: colors.muted, textTransform: 'uppercase', mt: 0.25 }}>
                  {b!.gymName} · {b!.weight}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: fonts.mono,
                  fontSize: 9,
                  letterSpacing: '.5px',
                  textTransform: 'uppercase',
                  color: n > 0 ? colors.red : colors.muted,
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
