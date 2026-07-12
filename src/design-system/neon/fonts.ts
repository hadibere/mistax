import { Saira_Condensed, Chakra_Petch, Barlow_Semi_Condensed } from 'next/font/google';

/**
 * Polices MistaX « Néon Arena », auto-hébergées via next/font/google.
 * Exposées en variables CSS, consommées par neon/tokens.ts (`fonts`).
 *  - Saira Condensed      → display : titres italiques, gros chiffres, tagline
 *  - Chakra Petch         → action : CTA, labels, badges (support thaï)
 *  - Barlow Semi Condensed → data : records, clubs, captions
 */

export const saira = Saira_Condensed({
  weight: ['700', '800'],
  subsets: ['latin'],
  variable: '--f-display',
  display: 'swap',
  // Saira Condensed n'a pas d'italique sur Google Fonts → l'italique est
  // synthétisé en CSS (fontStyle: 'italic' dans le thème).
});

export const chakra = Chakra_Petch({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--f-action',
  display: 'swap',
});

export const barlow = Barlow_Semi_Condensed({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--f-data',
  display: 'swap',
});

/** À appliquer sur <body> pour exposer les 3 variables CSS. */
export const neonFontVariables = `${saira.variable} ${chakra.variable} ${barlow.variable}`;
