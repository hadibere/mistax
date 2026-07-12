'use client';

import { createTheme, alpha } from '@mui/material/styles';
import { colors, fonts, gradients, radius, glow, borders, shadows } from './tokens';
import { LinkBehaviour } from '@/components/NextLink';

/**
 * MistaX — Thème MUI « Néon Arena » (dark only).
 * Polices via next/font/google → variables CSS (voir neon/fonts.ts).
 * Adapté à MUI 9.2.0 : slots combinés (containedPrimary) remplacés par l'API `variants`.
 */

declare module '@mui/material/styles' {
  interface Palette { neon: Palette['primary']; confirmed: Palette['success']; }
  interface PaletteOptions { neon?: PaletteOptions['primary']; confirmed?: PaletteOptions['success']; }
  interface TypeBackground { raised?: string; }
}

export const mistaxTheme = createTheme({
  palette: {
    mode: 'dark',
    primary:   { main: colors.neon, light: colors.neonCore, dark: colors.neonDeep, contrastText: colors.onNeon },
    secondary: { main: colors.neonText, contrastText: colors.onNeon },
    neon:      { main: colors.neon, light: colors.neonCore, dark: colors.neonDeep, contrastText: colors.onNeon } as never,
    success:   { main: colors.confirmed, contrastText: colors.onNeon },
    confirmed: { main: colors.confirmed, contrastText: colors.onNeon } as never,
    warning:   { main: colors.pending, contrastText: colors.onNeon },
    error:     { main: colors.refused, contrastText: '#1A0406' },
    background:{ default: colors.bg, paper: colors.surface, raised: colors.raised } as never,
    text:      { primary: colors.text, secondary: colors.textMuted, disabled: colors.textFaint },
    divider:   colors.hairline,
  },

  shape: { borderRadius: radius.lg },

  typography: {
    fontFamily: fonts.data,
    h1: { fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 40, lineHeight: 0.92, letterSpacing: '-0.5px', textTransform: 'uppercase' },
    h2: { fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 27, lineHeight: 0.98, textTransform: 'uppercase' },
    h3: { fontFamily: fonts.display, fontWeight: 800, fontSize: 26, lineHeight: 1, textTransform: 'uppercase' },
    overline:  { fontFamily: fonts.action, fontWeight: 600, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' },
    subtitle2: { fontFamily: fonts.action, fontWeight: 600, fontSize: 14, letterSpacing: '0.14em', textTransform: 'uppercase' },
    button:    { fontFamily: fonts.action, fontWeight: 700, fontSize: 17, letterSpacing: '0.12em', textTransform: 'uppercase' },
    body1:     { fontFamily: fonts.data, fontWeight: 600, fontSize: 13 },
    body2:     { fontFamily: fonts.data, fontWeight: 600, fontSize: 12, color: colors.textMuted },
    caption:   { fontFamily: fonts.action, fontWeight: 600, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: colors.textMuted },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: colors.bg, backgroundImage: gradients.appBg, backgroundAttachment: 'fixed' },
        '@keyframes ctapulse': {
          '0%,100%': { boxShadow: glow.cta },
          '50%':     { boxShadow: glow.ctaHover },
        },
      },
    },

    // Next <Link> par défaut (nav client-side via <Button href> / <Link href>)
    MuiButtonBase: { defaultProps: { LinkComponent: LinkBehaviour } },
    MuiLink: { defaultProps: { component: LinkBehaviour } },

    // Bouton néon glossy = variante "contained primary" (API variants, MUI 9)
    MuiButton: {
      defaultProps: { disableElevation: true, variant: 'contained' },
      styleOverrides: {
        root: { borderRadius: radius.lg, fontFamily: fonts.action, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', paddingTop: 15, paddingBottom: 15 },
        outlined: {
          border: `1px solid ${colors.neonLine}`, color: colors.neonText,
          '&:hover': { border: `1px solid ${colors.neon}`, background: alpha(colors.neon, 0.08), boxShadow: glow.sm },
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            background: gradients.neonBtn, color: colors.onNeon, boxShadow: glow.cta,
            '&:hover': { background: gradients.neonBtnHover, boxShadow: glow.ctaHover },
            '&.Mui-disabled': { background: alpha(colors.neon, 0.06), color: colors.textFaint, border: `1px solid ${alpha(colors.neon, 0.3)}`, boxShadow: 'none' },
          },
        },
      ],
    },

    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundColor: colors.surface, backgroundImage: 'none', borderRadius: radius.xl },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { background: gradients.card, border: borders.card, borderRadius: radius.card, boxShadow: shadows.card, overflow: 'hidden' },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: { borderRadius: radius.pill, fontFamily: fonts.action, fontWeight: 700, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' },
        outlined: { borderColor: colors.neonLine, color: colors.neonText, background: alpha(colors.neon, 0.12) },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: radius.md, backgroundColor: colors.raised,
          '& fieldset': { borderColor: colors.hairline },
          '&:hover fieldset': { borderColor: colors.neonLine },
          '&.Mui-focused fieldset': { borderColor: colors.neon, boxShadow: glow.sm },
        },
      },
    },
  },
});

export default mistaxTheme;
