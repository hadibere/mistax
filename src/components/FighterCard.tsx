'use client';

import { Box, Button, Typography } from '@mui/material';
import { colors, fonts, gradients, borders, radius, glow } from '@/design-system/neon/tokens';
import type { Boxer } from '@/design-system/types';
import { recordOf } from '@/data/mock-data';

/** Petite pastille initiales (rappel du placeholder photo). */
function Avatar({ boxer }: { boxer: Boxer }) {
  return (
    <Box
      sx={{
        width: 52,
        height: 52,
        flexShrink: 0,
        borderRadius: `${radius.md}px`,
        border: borders.photo,
        background: 'linear-gradient(180deg,#161C11,#0C100A)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: glow.photoInset,
        overflow: 'hidden',
      }}
    >
      {boxer.avatarUrl ? (
        <Box component="img" src={boxer.avatarUrl} alt={boxer.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
      ) : (
        <Typography sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 20, color: colors.neon, textShadow: glow.sm }}>
          {boxer.initials}
        </Typography>
      )}
    </Box>
  );
}

/** <FighterCard> — carte combattant, écran Boxeurs (« Néon Arena »). */
export function FighterCard({ boxer }: { boxer: Boxer }) {
  return (
    <Box sx={{ background: gradients.card, border: borders.card, borderRadius: `${radius.lg}px`, p: '14px 16px 16px' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        <Avatar boxer={boxer} />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography sx={{ fontFamily: fonts.action, fontWeight: 600, fontSize: 10, letterSpacing: '0.14em', color: colors.textMuted, textTransform: 'uppercase' }}>
            #{boxer.rank} · {boxer.weight}
          </Typography>
          <Typography sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 22, lineHeight: 1, color: colors.text, textTransform: 'uppercase', mt: 0.25 }}>
            {boxer.name}
          </Typography>
          <Typography sx={{ fontFamily: fonts.data, fontWeight: 600, fontSize: 12, color: colors.textMuted, textTransform: 'uppercase', mt: 0.25 }}>
            {boxer.gymName} · {boxer.city}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
          <Typography sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 20, lineHeight: 1, color: colors.text }}>
            {recordOf(boxer)}
          </Typography>
          <Typography sx={{ fontFamily: fonts.action, fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', color: colors.neonText, mt: 0.25 }}>
            {boxer.ko} KO
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mt: 1.75 }}>
        <Button href={`/fiche/${boxer.id}`} variant="outlined" sx={{ flex: 1, py: 1 }}>
          Fiche
        </Button>
        <Button href={`/lancer?adversaire=${boxer.id}`} sx={{ flex: 1.5, py: 1 }}>
          Défier
        </Button>
      </Box>
    </Box>
  );
}

export default FighterCard;
