'use client';

import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { colors, fonts } from '@/design-system/neon/tokens';
import { layout } from '@/design-system/tokens';
import { RoleToggle } from './RoleToggle';

/**
 * <Masthead> — en-tête fixe (« Néon Arena »).
 * Fond sombre + liseré néon. Gauche : wordmark + tagline. Droite : bascule de rôle.
 */
export function Masthead() {
  return (
    <AppBar position="static" elevation={0} color="transparent" sx={{ backgroundColor: colors.bg, borderBottom: `1px solid ${colors.neonLineSoft}` }}>
      <Toolbar
        disableGutters
        sx={{ minHeight: layout.mastheadHeight, height: layout.mastheadHeight, px: 2, justifyContent: 'space-between' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography
            component="span"
            sx={{ fontFamily: fonts.action, fontWeight: 700, fontSize: 22, lineHeight: 1, color: colors.text, textTransform: 'uppercase', letterSpacing: '1px' }}
          >
            MistaX
          </Typography>
          <Typography
            component="span"
            sx={{ fontFamily: fonts.action, fontWeight: 600, fontSize: 9, letterSpacing: '0.2em', color: colors.neonText, textTransform: 'uppercase' }}
          >
            Le Défi Encadré
          </Typography>
        </Box>
        <RoleToggle />
      </Toolbar>
    </AppBar>
  );
}

export default Masthead;
