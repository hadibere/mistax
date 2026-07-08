import { Box, Typography } from '@mui/material';
import { Barcode } from '@/design-system/Ticket';
import { colors, fonts, layout } from '@/design-system/tokens';
import type { Boxer } from '@/design-system/types';

/**
 * <FighterPass> — en-tête de la Fiche : le profil comme une licence (COMPONENTS.md §9).
 * Un billet PLEIN ENCRE : bloc identité + perforation + souche (licence + barcode clair).
 * Les encoches reprennent la couleur du fond de page (cream) — illusion de trou.
 */
export function FighterPass({ boxer }: { boxer: Boxer }) {
  const licence = 2100 + boxer.rank;
  const d = layout.notchDiameter;

  const notch = {
    content: '""',
    position: 'absolute',
    top: -d / 2,
    width: d,
    height: d,
    borderRadius: '50%',
    backgroundColor: colors.cream,
  } as const;

  return (
    <Box sx={{ position: 'relative', border: `1.5px solid ${colors.ink}`, backgroundColor: colors.ink, overflow: 'hidden' }}>
      {/* Identité */}
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '1.5px', color: colors.amber, textTransform: 'uppercase' }}>
          #{boxer.rank} Régional · {boxer.weight}
        </Typography>
        <Typography sx={{ fontFamily: fonts.display, fontSize: 46, lineHeight: 0.92, color: colors.cream, textTransform: 'uppercase', mt: 0.5 }}>
          {boxer.name}
        </Typography>
        <Typography sx={{ fontFamily: fonts.ui, fontSize: 12, fontWeight: 500, color: colors.onInkMuted, textTransform: 'uppercase', mt: 0.5 }}>
          {boxer.gymName} · {boxer.city}
        </Typography>
      </Box>

      {/* Perforation */}
      <Box sx={{ position: 'relative', height: 0, borderTop: `1.5px dashed ${colors.onInkFaint}` }}>
        <Box sx={{ ...notch, left: -d / 2 }} />
        <Box sx={{ ...notch, right: -d / 2 }} />
      </Box>

      {/* Souche : licence + code-barres clair */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.5 }}>
        <Typography sx={{ fontFamily: fonts.mono, fontSize: 10, color: colors.onInkMuted, whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
          Licence N° {licence}
        </Typography>
        <Box sx={{ flex: 1, display: 'flex' }}>
          <Barcode height={20} light />
        </Box>
      </Box>
    </Box>
  );
}

export default FighterPass;
