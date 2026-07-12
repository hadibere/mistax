import { Box, Typography } from '@mui/material';
import { colors, fonts, gradients, borders, radius, glow } from '@/design-system/neon/tokens';
import type { Boxer } from '@/design-system/types';

/**
 * <FighterPass> — en-tête de la Fiche (« Néon Arena »).
 * Carte identité : photo/placeholder + rang, nom, club. Style « licence » néon.
 */
export function FighterPass({ boxer }: { boxer: Boxer }) {
  return (
    <Box sx={{ position: 'relative', background: gradients.card, border: borders.card, borderRadius: `${radius.card}px`, boxShadow: glow.sm, overflow: 'hidden', p: '18px' }}>
      <Box sx={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, background: gradients.ambient, pointerEvents: 'none' }} />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative' }}>
        {/* Photo / placeholder */}
        <Box
          sx={{
            width: 92,
            height: 112,
            flexShrink: 0,
            borderRadius: `${radius.md}px`,
            border: borders.photo,
            background: 'linear-gradient(180deg,#161C11,#0C100A)',
            boxShadow: glow.photoInset,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {boxer.avatarUrl ? (
            <Box component="img" src={boxer.avatarUrl} alt={boxer.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          ) : (
            <Typography sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 34, color: colors.neon, textShadow: glow.sm }}>
              {boxer.initials}
            </Typography>
          )}
        </Box>

        {/* Identité */}
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontFamily: fonts.action, fontWeight: 600, fontSize: 11, letterSpacing: '0.16em', color: colors.neonText, textTransform: 'uppercase' }}>
            #{boxer.rank} Régional · {boxer.weight}
          </Typography>
          <Typography sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 34, lineHeight: 0.95, color: colors.text, textTransform: 'uppercase', mt: 0.5 }}>
            {boxer.name}
          </Typography>
          <Typography sx={{ fontFamily: fonts.data, fontWeight: 600, fontSize: 12, color: colors.textMuted, textTransform: 'uppercase', mt: 0.5 }}>
            {boxer.gymName} · {boxer.city}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default FighterPass;
