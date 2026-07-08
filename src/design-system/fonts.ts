import { Anton, Barlow_Condensed, Space_Mono } from 'next/font/google';

/**
 * Polices MistaX (direction "Fight Card"), auto-hébergées via next/font/google.
 * Exposées en variables CSS puis consommées par les tokens (voir tokens.ts `fonts`).
 *  - Anton          → display : titres, noms, VS, CTAs
 *  - Barlow Condensed → UI : labels, méta, corps, boutons secondaires
 *  - Space Mono     → data : n° de billet, KO, séries, coordonnées
 */

export const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

export const barlow = Barlow_Condensed({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
});

export const mono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

/** À appliquer sur <body> pour exposer les 3 variables CSS globalement. */
export const fontVariables = `${anton.variable} ${barlow.variable} ${mono.variable}`;
