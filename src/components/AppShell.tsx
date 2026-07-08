'use client';

import { Box } from '@mui/material';
import { colors, layout, shadows } from '@/design-system/tokens';
import { Masthead } from './Masthead';
import { BottomNav } from './BottomNav';

/**
 * <AppShell> — cadre applicatif commun.
 * Conteneur "téléphone" (max 428px, fond cream) centré sur un fond sombre,
 * avec Masthead sticky en haut et, côté boxeur, BottomNav sticky en bas.
 * Le style billet reste phone-first ; le responsive desktop viendra ensuite.
 */
export function AppShell({
  children,
  showBottomNav = false,
}: {
  children: React.ReactNode;
  showBottomNav?: boolean;
}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#100c08', minHeight: '100dvh' }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: layout.phoneMaxWidth,
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: colors.cream,
          boxShadow: shadows.frame,
        }}
      >
        <Masthead />
        <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column', animation: 'fcfade .3s ease' }}>
          {children}
        </Box>
        {showBottomNav && <BottomNav />}
      </Box>
    </Box>
  );
}

export default AppShell;
