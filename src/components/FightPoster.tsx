'use client';

import { Box, Typography } from '@mui/material';
import { Ticket, Barcode } from '@/design-system/Ticket';
import { colors, fonts } from '@/design-system/tokens';
import type { Boxer, Challenge } from '@/design-system/types';
import { recordOf } from '@/data/mock-data';

/**
 * <FightPoster> — l'affiche de combat plein format (COMPONENTS.md §8).
 * Un <Ticket> : bande rouge, sous-titre cérémoniel, tenant / VS / challenger,
 * perforation, souche (BILLET N° + code-barres + ADMISSION 1).
 */
function Side({ label, name }: { label: string; name: string }) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography sx={{ fontFamily: fonts.display, fontSize: 44, lineHeight: 0.92, color: colors.ink, textTransform: 'uppercase' }}>
        {name}
      </Typography>
      <Typography sx={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '1px', color: colors.muted, textTransform: 'uppercase', mt: 0.5 }}>
        {label}
      </Typography>
    </Box>
  );
}

export function FightPoster({
  challenge,
  tenant,
  challenger,
}: {
  challenge: Challenge;
  tenant?: Boxer;
  challenger?: Boxer | null;
}) {
  return (
    <Ticket>
      <Ticket.Band bg={colors.red} fg={colors.redInk} sx={{ justifyContent: 'center', textAlign: 'center' }}>
        {challenge.date} — {challenge.venue}
      </Ticket.Band>

      <Ticket.Body sx={{ px: 2, py: 3 }}>
        {/* Sous-titre cérémoniel souligné */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box component="span" sx={{ display: 'inline-block', borderBottom: `2px solid ${colors.ink}`, pb: 0.75 }}>
            <Typography
              component="span"
              sx={{ fontFamily: fonts.ui, fontSize: 13, fontWeight: 600, letterSpacing: '3px', color: colors.red, textTransform: 'uppercase' }}
            >
              Muay Thaï · {challenge.weight}
            </Typography>
          </Box>
        </Box>

        <Side label={`Le Tenant · ${tenant ? recordOf(tenant) : '—'}`} name={tenant?.name ?? '—'} />

        {/* Séparateur VS */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
          <Box sx={{ flex: 1, height: '3px', backgroundColor: colors.ink }} />
          <Typography sx={{ fontFamily: fonts.display, fontSize: 52, lineHeight: 1, color: colors.red }}>VS</Typography>
          <Box sx={{ flex: 1, height: '3px', backgroundColor: colors.ink }} />
        </Box>

        <Side
          label={`Le Challenger · ${challenger ? recordOf(challenger) : '—'}`}
          name={challenger?.name ?? 'À DÉFINIR'}
        />
      </Ticket.Body>

      <Ticket.Perforation />

      <Ticket.Stub>
        <Typography sx={{ fontFamily: fonts.mono, fontSize: 10, color: colors.muted, whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
          Billet {challenge.serial}
        </Typography>
        <Box sx={{ flex: 1, display: 'flex' }}>
          <Barcode height={30} />
        </Box>
        <Typography sx={{ fontFamily: fonts.mono, fontSize: 10, color: colors.muted, whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
          Admission 1
        </Typography>
      </Ticket.Stub>
    </Ticket>
  );
}

export default FightPoster;
