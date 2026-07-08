'use client';

import { Box } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { colors, fonts } from '@/design-system/tokens';

/**
 * <RoleToggle> — segmented control Boxeur / Coach (COMPONENTS.md §3).
 * Bascule de rôle = changement de route : boxeur → `/`, coach → `/coach`.
 * Rôle actif déduit du pathname.
 */
export function RoleToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const isCoach = pathname.startsWith('/coach');

  const base = {
    fontFamily: fonts.ui,
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    px: 1.75,
    py: 0.75,
    cursor: 'pointer',
    userSelect: 'none',
    lineHeight: 1,
  } as const;

  return (
    <Box sx={{ display: 'flex', border: '1px solid #4A423A' }}>
      <Box
        role="button"
        aria-pressed={!isCoach}
        onClick={() => router.push('/')}
        sx={{
          ...base,
          backgroundColor: isCoach ? 'transparent' : colors.red,
          color: isCoach ? colors.onInkFaint : colors.cream,
        }}
      >
        Boxeur
      </Box>
      <Box
        role="button"
        aria-pressed={isCoach}
        onClick={() => router.push('/coach')}
        sx={{
          ...base,
          backgroundColor: isCoach ? colors.amber : 'transparent',
          color: isCoach ? colors.ink : colors.onInkFaint,
        }}
      >
        Coach
      </Box>
    </Box>
  );
}

export default RoleToggle;
