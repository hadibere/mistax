'use client';

import { Box, Button, Typography } from '@mui/material';
import { Ticket, Barcode } from '@/design-system/Ticket';
import { colors, fonts } from '@/design-system/tokens';
import type { Boxer } from '@/design-system/types';
import { recordOf } from '@/data/mock-data';

/**
 * <FighterCard> — carte combattant, écran Boxeurs (COMPONENTS.md §6).
 * Un <Ticket> : infos + bilan, perforation, souche (PASS + barcode) puis
 * actions FICHE (outlined) / DÉFIER (contained red).
 */
export function FighterCard({ boxer }: { boxer: Boxer }) {
  const pass = 2100 + boxer.rank; // n° de licence dérivé (cf. écran Fiche)

  return (
    <Ticket>
      <Ticket.Body sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1.5 }}>
        {/* Infos */}
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontFamily: fonts.mono, fontSize: 8.5, letterSpacing: '.5px', color: colors.muted, textTransform: 'uppercase' }}>
            #{boxer.rank} · {boxer.weight}
          </Typography>
          <Typography sx={{ fontFamily: fonts.display, fontSize: 26, lineHeight: 0.95, color: colors.ink, textTransform: 'uppercase', mt: 0.25 }}>
            {boxer.name}
          </Typography>
          <Typography sx={{ fontFamily: fonts.ui, fontSize: 12, fontWeight: 500, color: colors.muted, textTransform: 'uppercase', mt: 0.25 }}>
            {boxer.gymName} · {boxer.city}
          </Typography>
        </Box>

        {/* Bilan */}
        <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
          <Typography sx={{ fontFamily: fonts.display, fontSize: 22, lineHeight: 1, color: colors.ink }}>
            {recordOf(boxer)}
          </Typography>
          <Typography sx={{ fontFamily: fonts.mono, fontSize: 9, color: colors.red, mt: 0.25 }}>
            {boxer.ko} KO
          </Typography>
        </Box>
      </Ticket.Body>

      <Ticket.Perforation />

      {/* Souche : PASS + code-barres */}
      <Ticket.Stub>
        <Typography sx={{ fontFamily: fonts.mono, fontSize: 9, color: colors.muted, whiteSpace: 'nowrap' }}>
          PASS N° {pass}
        </Typography>
        <Box sx={{ flex: 1, display: 'flex' }}>
          <Barcode height={18} />
        </Box>
      </Ticket.Stub>

      {/* Actions */}
      <Box sx={{ display: 'flex', gap: 1, px: 1.75, pb: 1.75 }}>
        <Button href={`/fiche/${boxer.id}`} variant="outlined" sx={{ flex: 1 }}>
          Fiche
        </Button>
        <Button href={`/lancer?adversaire=${boxer.id}`} variant="contained" color="primary" sx={{ flex: 1.5 }}>
          Défier
        </Button>
      </Box>
    </Ticket>
  );
}

export default FighterCard;
