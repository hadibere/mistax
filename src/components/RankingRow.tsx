import { Box, Typography } from '@mui/material';
import { colors, fonts, gradients, borders, radius, glow } from '@/design-system/neon/tokens';
import type { Boxer } from '@/design-system/types';
import { recordOf } from '@/data/mock-data';

/**
 * <RankingRow> — ligne de classement (« Néon Arena »).
 * Rang proéminent (#1 en néon), nom + club/poids, bilan + KO.
 * La ligne de l'utilisateur est surlignée (fond néon léger + « · TOI »).
 */
export function RankingRow({ boxer, isMe = false }: { boxer: Boxer; isMe?: boolean }) {
  const isFirst = boxer.rank === 1;
  const rankColor = isFirst ? colors.neon : colors.text;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: '10px 14px',
        borderRadius: `${radius.lg}px`,
        background: isMe ? 'rgba(120,245,60,0.10)' : gradients.card,
        border: isMe ? `1px solid ${colors.neonLine}` : borders.card,
        boxShadow: isMe ? glow.sm : 'none',
      }}
    >
      {/* Rang */}
      <Typography sx={{ width: 40, flexShrink: 0, textAlign: 'center', fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 28, lineHeight: 1, color: rankColor, textShadow: isFirst ? glow.sm : 'none' }}>
        {boxer.rank}
      </Typography>

      {/* Corps */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography component="div" sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 18, lineHeight: 1, color: colors.text, textTransform: 'uppercase' }}>
          {boxer.name}
          {isMe && (
            <Box component="span" sx={{ fontFamily: fonts.action, fontWeight: 700, fontSize: 9, color: colors.neonText, ml: 0.75, letterSpacing: '0.1em' }}>
              · TOI
            </Box>
          )}
        </Typography>
        <Typography sx={{ fontFamily: fonts.data, fontWeight: 600, fontSize: 11, color: colors.textMuted, textTransform: 'uppercase', mt: 0.25 }}>
          {boxer.gymName} · {boxer.weight}
        </Typography>
      </Box>

      {/* Bilan */}
      <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
        <Typography sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 18, lineHeight: 1, color: colors.text }}>
          {recordOf(boxer)}
        </Typography>
        <Typography sx={{ fontFamily: fonts.action, fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', color: colors.neonText, mt: 0.25 }}>
          {boxer.ko} KO
        </Typography>
      </Box>
    </Box>
  );
}

export default RankingRow;
