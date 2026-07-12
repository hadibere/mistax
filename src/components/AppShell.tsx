'use client';

import { Box } from '@mui/material';
import { colors } from '@/design-system/neon/tokens';
import { layout } from '@/design-system/tokens';
import { Masthead } from './Masthead';
import { BottomNav } from './BottomNav';

/**
 * <AppShell> — cadre applicatif commun (« Néon Arena »).
 * Conteneur "téléphone" centré ; le fond d'arène (dégradé néon) vient du <body>
 * (thème). Masthead + BottomNav toujours visibles ; seul le contenu défile.
 */
export function AppShell({
  children,
  showBottomNav = false,
}: {
  children: React.ReactNode;
  showBottomNav?: boolean;
}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '100dvh', overflow: 'hidden' }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: layout.phoneMaxWidth,
          height: '100dvh',
          display: 'grid',
          gridTemplateRows: showBottomNav ? 'auto minmax(0, 1fr) auto' : 'auto minmax(0, 1fr)',
          overflow: 'hidden',
          borderLeft: `1px solid ${colors.hairline}`,
          borderRight: `1px solid ${colors.hairline}`,
        }}
      >
        <Masthead />

        <Box component="main" sx={{ minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {children}
        </Box>

        {showBottomNav && <BottomNav />}
      </Box>
    </Box>
  );
}

export default AppShell;
