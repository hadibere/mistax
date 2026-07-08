'use client';

import { Box } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { colors, fonts, layout } from '@/design-system/tokens';

/**
 * <BottomNav> — navigation basse, rôle boxeur uniquement (COMPONENTS.md §4).
 * Fond encre + liseré rouge en haut, typo seule (pas d'icônes).
 * L'onglet actif reprend un liseré rouge qui chevauche la bordure.
 */

const ITEMS = [
  { label: 'Affiche', href: '/', match: (p: string) => p === '/' },
  { label: 'Boxeurs', href: '/boxeurs', match: (p: string) => p.startsWith('/boxeurs') },
  { label: 'Rang', href: '/classement', match: (p: string) => p.startsWith('/classement') },
  { label: 'Fiche', href: '/fiche/you', match: (p: string) => p.startsWith('/fiche') },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <Box
      component="nav"
      sx={{
        position: 'sticky',
        bottom: 0,
        zIndex: 10,
        height: layout.bottomNavHeight,
        display: 'grid',
        gridTemplateColumns: `repeat(${ITEMS.length}, 1fr)`,
        backgroundColor: colors.ink,
        borderTop: `3px solid ${colors.red}`,
      }}
    >
      {ITEMS.map((item) => {
        const active = item.match(pathname);
        return (
          <Box
            key={item.href}
            component={Link}
            href={item.href}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: fonts.ui,
              fontWeight: 700,
              fontSize: 12.5,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: active ? colors.cream : colors.onInkFaint,
              borderTop: active ? `3px solid ${colors.red}` : '3px solid transparent',
              mt: '-3px',
            }}
          >
            {item.label}
          </Box>
        );
      })}
    </Box>
  );
}

export default BottomNav;
