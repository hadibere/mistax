'use client';

import { Box, Button, Typography } from '@mui/material';
import { Ticket } from '@/design-system/Ticket';
import { colors, fonts } from '@/design-system/tokens';
import type { Challenge } from '@/design-system/types';
import { boxerById, recordOf } from '@/data/mock-data';

/**
 * <ValidationTicket> — un défi à signer, écran Coach (COMPONENTS.md §10).
 * Conscient du SENS (perspective du coach, via `mineId` = son boxeur impliqué) :
 *  - entrant  : « DÉFI POUR {mon boxeur} », l'autre est le CHALLENGER (à accepter).
 *  - sortant  : « DÉFI DE {mon boxeur} », l'autre est l'ADVERSAIRE (à valider avant envoi).
 */
export function ValidationTicket({
  challenge,
  mineId,
  onSign,
  onRefuse,
}: {
  challenge: Challenge;
  mineId: string;
  onSign: (c: Challenge) => void;
  onRefuse: (c: Challenge) => void;
}) {
  const outgoing = challenge.fromId === mineId; // mon boxeur lance le défi
  const mine = boxerById(mineId);
  const otherId = outgoing ? challenge.toId : challenge.fromId;
  const other = otherId ? boxerById(otherId) : null;

  const bandLabel = outgoing ? `Défi de ${mine?.name ?? '—'}` : `Défi pour ${mine?.name ?? '—'}`;
  const otherLabel = outgoing ? 'Adversaire' : 'Challenger';
  const signLabel = outgoing ? "Valider l’envoi" : 'Signer le combat';
  const refuseLabel = outgoing ? 'Annuler' : 'Refuser';

  return (
    <Ticket>
      <Ticket.Band bg={colors.red} fg={colors.redInk}>
        <span>{bandLabel} · {challenge.weight}</span>
        <Box component="span" sx={{ fontFamily: fonts.mono, fontSize: 10 }}>{challenge.serial}</Box>
      </Ticket.Band>

      <Ticket.Body sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1.5 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontFamily: fonts.mono, fontSize: 8.5, letterSpacing: '.5px', color: colors.red, textTransform: 'uppercase' }}>
            {otherLabel}
          </Typography>
          <Typography sx={{ fontFamily: fonts.display, fontSize: 25, lineHeight: 0.95, color: colors.ink, textTransform: 'uppercase', mt: 0.25 }}>
            {other?.name ?? 'À définir'}
          </Typography>
          <Typography sx={{ fontFamily: fonts.ui, fontSize: 12, fontWeight: 500, color: colors.muted, textTransform: 'uppercase', mt: 0.25 }}>
            {other?.gymName ?? ''}
          </Typography>
        </Box>
        {other && (
          <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
            <Typography sx={{ fontFamily: fonts.display, fontSize: 22, lineHeight: 1, color: colors.ink }}>
              {recordOf(other)}
            </Typography>
            <Typography sx={{ fontFamily: fonts.mono, fontSize: 9, color: colors.red, mt: 0.25 }}>
              Série {other.streak}V
            </Typography>
          </Box>
        )}
      </Ticket.Body>

      <Ticket.Perforation />

      <Box sx={{ px: 1.75, py: 1.75 }}>
        <Typography sx={{ fontFamily: fonts.ui, fontSize: 12, color: colors.muted, textTransform: 'uppercase' }}>
          {challenge.date} · {challenge.venue}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
          <Button variant="outlined" onClick={() => onRefuse(challenge)} sx={{ flex: 1 }}>
            {refuseLabel}
          </Button>
          <Button variant="contained" color="primary" onClick={() => onSign(challenge)} sx={{ flex: 1.6 }}>
            {signLabel}
          </Button>
        </Box>
      </Box>
    </Ticket>
  );
}

export default ValidationTicket;
