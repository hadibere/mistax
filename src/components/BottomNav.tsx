'use client';

import { Box } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { colors, fonts } from '@/design-system/neon/tokens';
import { layout } from '@/design-system/tokens';
import { DEMO_ME } from '@/lib/current-user';

/**
 * <BottomNav> — navigation basse, rôle boxeur uniquement (« Néon Arena »).
 * Fond sombre + liseré néon en haut, typo seule (pas d'icônes).
 * L'onglet actif s'allume en néon (texte + liseré). Fiche → utilisateur courant.
 */

const ITEMS = [
  { label: 'Affiche', href: '/', match: (p: string) => p === '/' },
  { label: 'Boxeurs', href: '/boxeurs', match: (p: string) => p.startsWith('/boxeurs') },
  { label: 'Rang', href: '/classement', match: (p: string) => p.startsWith('/classement') },
  { label: 'Fiche', href: `/fiche/${DEMO_ME}`, match: (p: string) => p.startsWith('/fiche') },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <Box
      component="nav"
      sx={{
        height: layout.bottomNavHeight,
        display: 'grid',
        gridTemplateColumns: `repeat(${ITEMS.length}, 1fr)`,
        backgroundColor: colors.bg,
        borderTop: `1px solid ${colors.neonLineSoft}`,
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
              fontFamily: fonts.action,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: active ? colors.neonText : colors.textMuted,
              borderTop: active ? `2px solid ${colors.neon}` : '2px solid transparent',
              mt: '-1px',
              textShadow: active ? colors.neon && '0 0 12px rgba(120,245,60,0.45)' : 'none',
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
