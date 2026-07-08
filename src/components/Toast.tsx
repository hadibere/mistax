import { Box } from '@mui/material';
import { colors, fonts, shadows } from '@/design-system/tokens';

/**
 * <Toast> — notification basse centrée (COMPONENTS.md §11).
 * Fond encre, liseré rouge à gauche, texte cream. Animation fctoast.
 * L'auto-dismiss (3200ms) est géré par l'appelant.
 */
export function Toast({ message }: { message: string }) {
  return (
    <Box
      role="status"
      sx={{
        position: 'fixed',
        bottom: 80,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1300,
        backgroundColor: colors.ink,
        color: colors.cream,
        borderLeft: `4px solid ${colors.red}`,
        px: 2,
        py: 1.5,
        boxShadow: shadows.toast,
        fontFamily: fonts.ui,
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: '.5px',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        animation: 'fctoast .3s ease',
      }}
    >
      {message}
    </Box>
  );
}

export default Toast;
