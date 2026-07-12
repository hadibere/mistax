'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { colors, fonts, gradients, borders, radius, glow } from '@/design-system/neon/tokens';
import type { Boxer, Challenge } from '@/design-system/types';

/**
 * <ChallengeCard> — carte de combat COMPACTE pour le feed (« Néon Arena »).
 * Version resserrée de la FightCard : statut, tenant vs challenger, poids + lieu.
 * Sans photos (réservées à la grande carte de détail). Cliquable → /defi/[id].
 */

const STATUS: Record<Challenge['status'], { label: string; color: string }> = {
  pending:  { label: 'À valider', color: colors.pending },
  accepted: { label: 'Signé', color: colors.confirmedText },
  sent:     { label: 'Envoyé', color: colors.textMuted },
  refused:  { label: 'Refusé', color: colors.refused },
  open:     { label: 'Ouvert', color: colors.neonText },
};

function Corner({ name, club, align }: { name: string; club: string; align: 'left' | 'right' }) {
  return (
    <Box sx={{ textAlign: align, minWidth: 0 }}>
      <Typography sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 19, lineHeight: 1, color: colors.text, textTransform: 'uppercase' }}>
        {name}
      </Typography>
      <Typography sx={{ fontFamily: fonts.data, fontWeight: 600, fontSize: 11, color: colors.textMuted, textTransform: 'uppercase', mt: 0.25 }}>
        {club}
      </Typography>
    </Box>
  );
}

export function ChallengeCard({
  challenge,
  tenant,
  challenger,
  href,
}: {
  challenge: Challenge;
  tenant?: Boxer | null;
  challenger?: Boxer | null;
  href?: string;
}) {
  const st = STATUS[challenge.status] ?? STATUS.pending;

  return (
    <Box
      {...(href ? { component: Link, href } : {})}
      sx={{
        display: 'block',
        textDecoration: 'none',
        cursor: href ? 'pointer' : 'default',
        background: gradients.card,
        border: borders.card,
        borderRadius: `${radius.lg}px`,
        p: '14px 16px 16px',
        transition: 'border-color .15s, box-shadow .15s',
        '&:hover': href ? { borderColor: colors.neonLine, boxShadow: glow.sm } : undefined,
      }}
    >
      {/* Ligne haute : date + statut */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.25 }}>
        <Typography sx={{ fontFamily: fonts.action, fontWeight: 600, fontSize: 10, letterSpacing: '0.16em', color: colors.textMuted, textTransform: 'uppercase' }}>
          {challenge.date || 'À définir'}
        </Typography>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1, py: 0.4, borderRadius: '999px', backgroundColor: `${st.color}1F`, border: `1px solid ${st.color}66` }}>
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: st.color, boxShadow: `0 0 6px ${st.color}` }} />
          <Typography sx={{ fontFamily: fonts.action, fontWeight: 700, fontSize: 10, letterSpacing: '0.12em', color: st.color, textTransform: 'uppercase' }}>
            {st.label}
          </Typography>
        </Box>
      </Box>

      {/* Combattants */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 1 }}>
        <Corner align="left" name={tenant?.name ?? '—'} club={tenant?.gymName ?? ''} />
        <Typography sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 18, color: colors.neonText, textShadow: glow.sm }}>
          VS
        </Typography>
        <Corner align="right" name={challenger?.name ?? 'À définir'} club={challenger?.gymName ?? ''} />
      </Box>

      {/* Pied : poids + lieu */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5 }}>
        <Box sx={{ px: 1, py: 0.35, borderRadius: '999px', border: `1px solid ${colors.neonLine}`, backgroundColor: 'rgba(120,245,60,0.08)' }}>
          <Typography component="span" sx={{ fontFamily: fonts.action, fontWeight: 700, fontSize: 11, letterSpacing: '0.06em', color: colors.neonText, textTransform: 'uppercase' }}>
            {challenge.weight}
          </Typography>
        </Box>
        <Typography sx={{ fontFamily: fonts.data, fontWeight: 500, fontSize: 12, color: colors.textMuted, textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {challenge.venue}
        </Typography>
      </Box>
    </Box>
  );
}

export default ChallengeCard;
