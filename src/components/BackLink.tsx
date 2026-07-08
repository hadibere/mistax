'use client';

import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { colors, fonts } from '@/design-system/tokens';

/**
 * <BackLink> — retour arrière explicite dans l'UI (ex. « ← LA CARTE »).
 * Toujours présent sur les écrans secondaires : on ne compte pas sur le geste
 * système du téléphone (absent en PWA / sur desktop).
 * `href` → navigation ciblée ; sans `href` → retour à l'écran précédent.
 */
export function BackLink({ label = 'Retour', href }: { label?: string; href?: string }) {
  const router = useRouter();

  return (
    <Box
      role="button"
      tabIndex={0}
      aria-label={`Retour : ${label}`}
      onClick={() => (href ? router.push(href) : router.back())}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          href ? router.push(href) : router.back();
        }
      }}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        cursor: 'pointer',
        fontFamily: fonts.ui,
        fontWeight: 700,
        fontSize: 12.5,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        color: colors.ink,
        mb: 2,
        '&:hover': { color: colors.red },
      }}
    >
      ← {label}
    </Box>
  );
}

export default BackLink;
