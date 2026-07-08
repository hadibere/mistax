'use client';

import { createTheme, alpha } from '@mui/material/styles';
import { colors, fonts, borders, shadows } from './tokens';

/**
 * KRU — Thème MUI (direction "Fight Card").
 *
 * Chargement des polices : utilise next/font/google dans app/layout.tsx et
 * passe les CSS variables ici (voir README, section "Polices").
 * Les familles ci-dessous supposent que les @font-face sont disponibles globalement.
 *
 * Palette : mode "light" (fond papier cream, encre foncée).
 * Note : le style billet est PLAT et à ANGLE DROIT — shape.borderRadius = 0
 * et la plupart des ombres sont désactivées.
 */

// Étend la palette avec nos rôles custom (paper alt, ink, amber)
declare module '@mui/material/styles' {
  interface Palette {
    ink: Palette['primary'];
    cream: { main: string; alt: string; card: string };
  }
  interface PaletteOptions {
    ink?: PaletteOptions['primary'];
    cream?: { main: string; alt: string; card: string };
  }
}

export const kruTheme = createTheme({
  palette: {
    mode: 'light',
    primary:   { main: colors.red, dark: colors.redDark, contrastText: colors.redInk },
    secondary: { main: colors.amber, contrastText: colors.ink },
    ink:       { main: colors.ink, contrastText: colors.onInk } as any,
    cream:     { main: colors.cream, alt: colors.paperAlt, card: colors.paper },
    background: { default: colors.cream, paper: colors.paper },
    text:      { primary: colors.ink, secondary: colors.muted },
    divider:   colors.ink,
    error:     { main: colors.red },
    warning:   { main: colors.amber },
  },

  shape: { borderRadius: 0 }, // angle droit partout

  typography: {
    fontFamily: fonts.ui, // Barlow Condensed par défaut
    // Display / titres — Anton
    h1: { fontFamily: fonts.display, fontSize: 52, lineHeight: 0.86, letterSpacing: '-.5px', textTransform: 'uppercase' },
    h2: { fontFamily: fonts.display, fontSize: 44, lineHeight: 0.86, letterSpacing: '-.5px', textTransform: 'uppercase' },
    h3: { fontFamily: fonts.display, fontSize: 34, lineHeight: 0.9,  textTransform: 'uppercase' },
    h4: { fontFamily: fonts.display, fontSize: 26, lineHeight: 0.92, textTransform: 'uppercase' },
    h5: { fontFamily: fonts.display, fontSize: 20, lineHeight: 0.95, textTransform: 'uppercase' },
    h6: { fontFamily: fonts.display, fontSize: 19, lineHeight: 0.95, textTransform: 'uppercase' },
    // Corps / UI — Barlow Condensed
    body1: { fontFamily: fonts.ui, fontSize: 14, fontWeight: 500 },
    body2: { fontFamily: fonts.ui, fontSize: 13, fontWeight: 500, color: colors.muted },
    button: { fontFamily: fonts.display, fontSize: 16, letterSpacing: '1px', textTransform: 'uppercase' },
    // Labels condensés
    subtitle2: { fontFamily: fonts.ui, fontSize: 11.5, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' },
    // Data / séries — utilise la classe .mono ou sx={{ fontFamily: 'Space Mono' }}
    caption: { fontFamily: fonts.mono, fontSize: 10, letterSpacing: '.5px' },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@keyframes fcfade': {
          from: { opacity: 0, transform: 'translateY(7px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        '@keyframes fctoast': {
          from: { opacity: 0, transform: 'translate(-50%,14px)' },
          to:   { opacity: 1, transform: 'translate(-50%,0)' },
        },
        body: { backgroundColor: colors.cream },
      },
    },

    // Boutons : pleins rouges (Anton) ou outline encre
    MuiButton: {
      defaultProps: { disableElevation: true, disableRipple: false },
      styleOverrides: {
        root: { borderRadius: 0, fontFamily: fonts.display, letterSpacing: '1px', paddingTop: 11, paddingBottom: 11 },
        outlined: {
          border: borders.card, color: colors.ink, fontFamily: fonts.ui, fontWeight: 700,
          '&:hover': { border: borders.card, backgroundColor: alpha(colors.ink, 0.05) },
        },
      },
      // MUI récent : les slots combinés (containedPrimary) sont remplacés par l'API variants.
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: { backgroundColor: colors.red, color: colors.onInk, '&:hover': { backgroundColor: colors.redDark } },
        },
      ],
    },

    // Cartes : bord encre net, pas d'ombre, pas de radius. La perforation
    // est ajoutée par le composant <Ticket> (voir specs), pas ici.
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundColor: colors.paper, borderRadius: 0, backgroundImage: 'none' },
        outlined: { border: borders.card },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { border: borders.card, borderRadius: 0, backgroundColor: colors.paper } },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0, backgroundColor: colors.paper,
          '& fieldset': { border: borders.card },
          '&:hover fieldset': { border: borders.card },
          '&.Mui-focused fieldset': { border: `1.5px solid ${colors.red}` },
        },
        input: { fontFamily: fonts.ui, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px' },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 0, fontFamily: fonts.ui, fontWeight: 700, letterSpacing: '.5px' },
      },
      variants: [
        {
          props: { variant: 'filled', color: 'primary' },
          style: { backgroundColor: colors.ink, color: colors.onInk },
        },
      ],
    },

    MuiAppBar: {
      defaultProps: { elevation: 0, color: 'transparent' },
      styleOverrides: {
        root: { backgroundColor: colors.ink, color: colors.onInk, borderBottom: borders.masthead },
      },
    },
  },
});

export default kruTheme;
