'use client';

import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { colors, fonts, layout } from '@/design-system/tokens';
import { RoleToggle } from './RoleToggle';

/**
 * <Masthead> — en-tête fixe (COMPONENTS.md §2).
 * Fond encre + liseré rouge (appliqués par le thème MuiAppBar).
 * Gauche : wordmark + tagline. Droite : bascule de rôle.
 */
export function Masthead() {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar
        disableGutters
        sx={{ minHeight: layout.mastheadHeight, height: layout.mastheadHeight, px: 2, justifyContent: 'space-between' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography
            component="span"
            sx={{ fontFamily: fonts.display, fontSize: 24, lineHeight: 1, color: colors.cream, textTransform: 'uppercase', letterSpacing: '.5px' }}
          >
            MistaX
          </Typography>
          <Typography
            component="span"
            sx={{ fontFamily: fonts.mono, fontSize: 9.5, letterSpacing: '1.5px', color: colors.red, textTransform: 'uppercase' }}
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
