'use client';

import { Box } from '@mui/material';
import { colors, layout, shadows } from '@/design-system/tokens';
import { Masthead } from './Masthead';
import { BottomNav } from './BottomNav';

/**
 * <AppShell> — cadre applicatif commun.
 * Conteneur "téléphone" (max 428px, fond cream) centré sur un fond sombre.
 * Structure d'app mobile : hauteur d'écran fixe, Masthead + BottomNav TOUJOURS
 * visibles, et seul le contenu (main) défile à l'intérieur.
 */
export function AppShell({
  children,
  showBottomNav = false,
}: {
  children: React.ReactNode;
  showBottomNav?: boolean;
}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#100c08', height: '100dvh', overflow: 'hidden' }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: layout.phoneMaxWidth,
          height: '100dvh',
          display: 'grid',
          // header (auto) / contenu défilant (1fr, peut rétrécir) / nav (auto)
          gridTemplateRows: showBottomNav ? 'auto minmax(0, 1fr) auto' : 'auto minmax(0, 1fr)',
          backgroundColor: colors.cream,
          boxShadow: shadows.frame,
          overflow: 'hidden',
        }}
      >
        {/* Toujours visible en haut */}
        <Masthead />

        {/* Seule zone qui défile */}
        <Box
          component="main"
          sx={{ minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', animation: 'fcfade .3s ease' }}
        >
          {children}
        </Box>

        {/* Toujours visible en bas (rôle boxeur) */}
        {showBottomNav && <BottomNav />}
      </Box>
    </Box>
  );
}

export default AppShell;
