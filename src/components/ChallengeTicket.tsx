'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { Ticket, Barcode } from '@/design-system/Ticket';
import { colors, fonts, statusColors } from '@/design-system/tokens';
import type { Challenge } from '@/design-system/types';
import { boxerById } from '@/data/mock-data';

/** Libellé de statut affiché dans la bande de tête. */
const statusLabel: Record<Challenge['status'], string> = {
  pending: 'À VALIDER',
  accepted: 'SIGNÉ',
  sent: 'ENVOYÉ',
  refused: 'REFUSÉ',
  open: 'OUVERT',
};

/** Un côté de l'affiche (tenant / challenger). */
function Corner({
  label,
  name,
  club,
  align,
}: {
  label: string;
  name: string;
  club: string;
  align: 'left' | 'right';
}) {
  return (
    <Box sx={{ textAlign: align, minWidth: 0 }}>
      <Typography
        component="p"
        sx={{ fontFamily: fonts.mono, fontSize: 8.5, letterSpacing: '.5px', color: colors.red, mb: 0.25 }}
      >
        {label}
      </Typography>
      <Typography
        component="p"
        sx={{ fontFamily: fonts.display, fontSize: 20, lineHeight: 0.95, textTransform: 'uppercase', color: colors.ink }}
      >
        {name}
      </Typography>
      <Typography
        component="p"
        sx={{ fontFamily: fonts.ui, fontSize: 11, fontWeight: 500, color: colors.muted, mt: 0.25, textTransform: 'uppercase' }}
      >
        {club}
      </Typography>
    </Box>
  );
}

export function ChallengeTicket({
  challenge,
  href,
}: {
  challenge: Challenge;
  href?: string;
}) {
  const tenant = boxerById(challenge.fromId);
  const challenger = challenge.toId ? boxerById(challenge.toId) : null;
  const band = statusColors[challenge.status as keyof typeof statusColors] ?? statusColors.sent;

  return (
    <Ticket
      {...(href ? { component: Link, href } : {})}
      sx={{
        display: 'block',
        cursor: href ? 'pointer' : 'default',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <Ticket.Band bg={band.bg} fg={band.fg}>
        <span>{challenge.date}</span>
        <span>{statusLabel[challenge.status]}</span>
      </Ticket.Band>

      <Ticket.Body
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Corner
          align="left"
          label="TENANT"
          name={tenant?.name ?? '—'}
          club={tenant?.gymName ?? ''}
        />
        <Typography
          component="span"
          sx={{ fontFamily: fonts.display, fontSize: 26, color: colors.red, textTransform: 'uppercase' }}
        >
          VS
        </Typography>
        <Corner
          align="right"
          label="CHALLENGER"
          name={challenger?.name ?? 'À DÉFINIR'}
          club={challenger?.gymName ?? ''}
        />
      </Ticket.Body>

      <Ticket.Perforation />

      <Ticket.Stub>
        <Box
          component="span"
          sx={{
            fontFamily: fonts.display,
            fontSize: 13,
            backgroundColor: colors.ink,
            color: colors.cream,
            px: 0.75,
            py: 0.25,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {challenge.weight}
        </Box>
        <Typography
          component="span"
          sx={{
            fontFamily: fonts.ui,
            fontSize: 12,
            color: colors.muted,
            textTransform: 'uppercase',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flex: 1,
          }}
        >
          {challenge.venue}
        </Typography>
        <Box sx={{ width: 56, display: 'flex' }}>
          <Barcode height={18} />
        </Box>
        <Typography
          component="span"
          sx={{ fontFamily: fonts.mono, fontSize: 9, color: colors.red, whiteSpace: 'nowrap' }}
        >
          {challenge.serial}
        </Typography>
      </Ticket.Stub>
    </Ticket>
  );
}

export default ChallengeTicket;
