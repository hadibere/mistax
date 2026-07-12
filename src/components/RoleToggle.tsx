'use client';

import { Box } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { colors, fonts } from '@/design-system/neon/tokens';

/**
 * <RoleToggle> — segmented control Boxeur / Coach (« Néon Arena »).
 * Bascule de rôle = changement de route : boxeur → `/`, coach → `/coach`.
 * Onglet actif = pastille néon (texte sombre) ; inactif = texte atténué.
 */
export function RoleToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const isCoach = pathname.startsWith('/coach');

  const base = {
    fontFamily: fonts.action,
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    px: 1.75,
    py: 0.75,
    cursor: 'pointer',
    userSelect: 'none',
    lineHeight: 1,
    transition: 'background-color .15s, color .15s',
  } as const;

  return (
    <Box sx={{ display: 'flex', border: `1px solid ${colors.neonLineSoft}`, borderRadius: '999px', overflow: 'hidden' }}>
      <Box
        role="button"
        aria-pressed={!isCoach}
        onClick={() => router.push('/')}
        sx={{ ...base, backgroundColor: isCoach ? 'transparent' : colors.neon, color: isCoach ? colors.textMuted : colors.onNeon }}
      >
        Boxeur
      </Box>
      <Box
        role="button"
        aria-pressed={isCoach}
        onClick={() => router.push('/coach')}
        sx={{ ...base, backgroundColor: isCoach ? colors.neon : 'transparent', color: isCoach ? colors.onNeon : colors.textMuted }}
      >
        Coach
      </Box>
    </Box>
  );
}

export default RoleToggle;
