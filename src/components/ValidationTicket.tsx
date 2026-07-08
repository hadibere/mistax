'use client';

import { Box, Button, Typography } from '@mui/material';
import { Ticket } from '@/design-system/Ticket';
import { colors, fonts } from '@/design-system/tokens';
import type { Challenge } from '@/design-system/types';
import { boxerById, recordOf } from '@/data/mock-data';

/**
 * <ValidationTicket> — un défi à signer, écran Coach (COMPONENTS.md §10).
 * Band rouge « DÉFI POUR {boxeur} · {poids} » + serial, corps = challenger,
 * perforation, puis date·lieu + actions REFUSER / SIGNER LE COMBAT.
 */
export function ValidationTicket({
  challenge,
  onSign,
  onRefuse,
}: {
  challenge: Challenge;
  onSign: (c: Challenge) => void;
  onRefuse: (c: Challenge) => void;
}) {
  const defended = challenge.toId ? boxerById(challenge.toId) : null;
  const challenger = boxerById(challenge.fromId);

  return (
    <Ticket>
      <Ticket.Band bg={colors.red} fg={colors.redInk}>
        <span>Défi pour {defended?.name ?? '—'} · {challenge.weight}</span>
        <Box component="span" sx={{ fontFamily: fonts.mono, fontSize: 10 }}>{challenge.serial}</Box>
      </Ticket.Band>

      <Ticket.Body sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1.5 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontFamily: fonts.mono, fontSize: 8.5, letterSpacing: '.5px', color: colors.red, textTransform: 'uppercase' }}>
            Challenger
          </Typography>
          <Typography sx={{ fontFamily: fonts.display, fontSize: 25, lineHeight: 0.95, color: colors.ink, textTransform: 'uppercase', mt: 0.25 }}>
            {challenger?.name ?? '—'}
          </Typography>
          <Typography sx={{ fontFamily: fonts.ui, fontSize: 12, fontWeight: 500, color: colors.muted, textTransform: 'uppercase', mt: 0.25 }}>
            {challenger?.gymName ?? ''}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
          <Typography sx={{ fontFamily: fonts.display, fontSize: 22, lineHeight: 1, color: colors.ink }}>
            {challenger ? recordOf(challenger) : '—'}
          </Typography>
          <Typography sx={{ fontFamily: fonts.mono, fontSize: 9, color: colors.red, mt: 0.25 }}>
            Série {challenger?.streak ?? 0}V
          </Typography>
        </Box>
      </Ticket.Body>

      <Ticket.Perforation />

      <Box sx={{ px: 1.75, py: 1.75 }}>
        <Typography sx={{ fontFamily: fonts.ui, fontSize: 12, color: colors.muted, textTransform: 'uppercase' }}>
          {challenge.date} · {challenge.venue}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
          <Button variant="outlined" onClick={() => onRefuse(challenge)} sx={{ flex: 1 }}>
            Refuser
          </Button>
          <Button variant="contained" color="primary" onClick={() => onSign(challenge)} sx={{ flex: 1.6 }}>
            Signer le combat
          </Button>
        </Box>
      </Box>
    </Ticket>
  );
}

export default ValidationTicket;
