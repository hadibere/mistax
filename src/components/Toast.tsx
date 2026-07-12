import { Box } from '@mui/material';
import { colors, fonts, glow } from '@/design-system/neon/tokens';

/**
 * <Toast> — notification basse centrée (« Néon Arena »).
 * Fond sombre, liseré néon à gauche, texte clair. Affiché immédiatement ;
 * l'auto-dismiss (3200ms) est géré par l'appelant.
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
        backgroundColor: colors.raised,
        color: colors.text,
        borderLeft: `3px solid ${colors.neon}`,
        borderRadius: '8px',
        px: 2,
        py: 1.5,
        boxShadow: glow.md,
        fontFamily: fonts.action,
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      {message}
    </Box>
  );
}

export default Toast;
