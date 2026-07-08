import { Box, Typography } from '@mui/material';
import { colors, fonts, layout } from '@/design-system/tokens';
import type { Boxer } from '@/design-system/types';
import { recordOf } from '@/data/mock-data';

/**
 * <RankingRow> — ligne de classement (COMPONENTS.md §7).
 * Un billet à PERFORATION VERTICALE : souche = colonne rang à gauche,
 * puis ligne de déchirure verticale (dashed + 2 encoches haut/bas), puis corps.
 * La ligne de l'utilisateur est mise en avant (fond paperAlt + tag « · TOI »).
 * #1 en rouge.
 */
export function RankingRow({ boxer, isMe = false }: { boxer: Boxer; isMe?: boolean }) {
  const rankColor = boxer.rank === 1 ? colors.red : colors.ink;
  const d = layout.notchDiameter;

  // Encoche : demi-cercle « mordu » dans les bords haut/bas, couleur = fond de page (cream).
  const notch = {
    content: '""',
    position: 'absolute',
    left: -d / 2,
    width: d,
    height: d,
    borderRadius: '50%',
    backgroundColor: colors.cream,
  } as const;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'stretch',
        border: `1.5px solid ${colors.ink}`,
        backgroundColor: isMe ? colors.paperAlt : colors.paper,
        overflow: 'hidden',
      }}
    >
      {/* Souche : rang */}
      <Box sx={{ width: 52, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 1.5 }}>
        <Typography sx={{ fontFamily: fonts.display, fontSize: 30, lineHeight: 1, color: rankColor }}>
          {boxer.rank}
        </Typography>
      </Box>

      {/* Perforation verticale */}
      <Box sx={{ position: 'relative', width: 0, borderLeft: `1.5px dashed ${colors.ink}` }}>
        <Box sx={{ ...notch, top: -d / 2 }} />
        <Box sx={{ ...notch, bottom: -d / 2 }} />
      </Box>

      {/* Corps */}
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, px: 1.75, py: 1.25 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography component="div" sx={{ fontFamily: fonts.display, fontSize: 19, lineHeight: 1, color: colors.ink, textTransform: 'uppercase' }}>
            {boxer.name}
            {isMe && (
              <Box component="span" sx={{ fontFamily: fonts.mono, fontSize: 9, color: colors.red, ml: 0.75, letterSpacing: '.5px' }}>
                · TOI
              </Box>
            )}
          </Typography>
          <Typography sx={{ fontFamily: fonts.ui, fontSize: 11, fontWeight: 500, color: colors.muted, mt: 0.25, textTransform: 'uppercase' }}>
            {boxer.gymName} · {boxer.weight}
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
          <Typography sx={{ fontFamily: fonts.display, fontSize: 19, lineHeight: 1, color: colors.ink }}>
            {recordOf(boxer)}
          </Typography>
          <Typography sx={{ fontFamily: fonts.mono, fontSize: 9, color: colors.red, mt: 0.25 }}>
            {boxer.ko} KO
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default RankingRow;
