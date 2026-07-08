/**
 * KRU — Design Tokens (source of truth)
 * Direction visuelle : "Fight Card" — billet de match perforé.
 * Papier cream + encre + rouge sang, typo massive Anton, code-barres & perforations.
 *
 * Ces tokens sont volontairement framework-agnostiques.
 * Le thème MUI (theme.ts) les consomme.
 */

export const colors = {
  // Surfaces "papier"
  cream: '#ECE3CE',        // fond principal (le papier du billet)
  paper: '#F5EEDD',        // surface carte (papier légèrement plus clair)
  paperAlt: '#F0D9C8',     // surface carte mise en avant (ligne "toi" du classement)

  // Encre
  ink: '#17130E',          // texte principal / masthead / bordures
  inkSoft: '#4A3D2E',      // texte secondaire sur papier
  muted: '#6E5B45',        // labels, méta, clubs
  hairline: '#D8CBAE',     // séparateurs fins sur papier

  // Accent principal — rouge sang
  red: '#B0201F',
  redDark: '#7A2018',      // rouge foncé (labels d'accent, liens hover)
  redInk: '#F3E9D2',       // texte sur fond rouge

  // Accent secondaire — ambre (statut "signé/validé", coach)
  amber: '#E6A24C',

  // Sur fond encre
  onInk: '#ECE3CE',        // texte clair sur encre
  onInkMuted: '#C9BCA6',   // texte clair atténué sur encre
  onInkFaint: '#9A8E78',   // nav inactive sur encre

  // Résultats de combat
  win: '#B0201F',          // V (victoire) — bloc rouge
  loss: '#17130E',         // D (défaite) — bloc encre
} as const;

/** Statuts d'un défi → couleur du bandeau de ticket */
export const statusColors = {
  pending:  { bg: colors.red,     fg: colors.redInk },   // à valider par le coach
  accepted: { bg: colors.ink,     fg: colors.amber },    // signé
  sent:     { bg: colors.muted,   fg: colors.onInk },    // envoyé, en attente
  refused:  { bg: colors.muted,   fg: colors.onInk },    // refusé (non affiché en liste)
} as const;

/** Échelle d'espacement (px). Multiples de 2, base 4. */
export const spacing = {
  xxs: 4,
  xs: 6,
  sm: 8,
  md: 12,
  lg: 14,
  xl: 16,
  '2xl': 18,
  '3xl': 22,
  '4xl': 26,
} as const;

/**
 * Typographie.
 * 3 familles : Anton (display), Barlow Condensed (UI/texte), Space Mono (data/serials).
 * Charge via next/font/google.
 */
export const fonts = {
  // Variables CSS injectées par next/font/google (voir fonts.ts + layout.tsx).
  display: 'var(--font-anton), sans-serif',   // titres, noms de boxeurs, VS, CTAs
  ui: 'var(--font-barlow), sans-serif',       // labels, méta, boutons secondaires, corps
  mono: 'var(--font-mono), monospace',        // numéros de billet, KO, coordonnées, codes
} as const;

export const fontSizes = {
  micro: 8.5,   // labels TENANT/CHALLENGER (mono)
  caption: 10,  // méta mono
  small: 11.5,  // labels UI condensés
  body: 13,
  bodyLg: 14,
  h6: 19,       // noms dans les listes
  h5: 20,
  h4: 26,       // noms de boxeurs (cartes)
  h3: 34,       // titres d'écran (LA CARTE)
  h2: 44,       // noms sur l'affiche détail
  display: 52,  // VS géant
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  // Anton n'a qu'une graisse (400) mais paraît "black".
} as const;

export const letterSpacing = {
  tight: '-.5px',   // Anton en grand
  normal: '0',
  wide: '1px',
  wider: '1.5px',
  widest: '3px',    // labels cérémoniels (MUAY THAÏ · -71 KG)
} as const;

/**
 * Bordures : le langage "billet" repose sur des traits nets, PAS de border-radius.
 * Tout est à angle droit sauf les encoches (cercles) qui perforent.
 */
export const borders = {
  card: `1.5px solid ${colors.ink}`,
  hairlineDashed: `1.5px dashed ${colors.ink}`,  // ligne de perforation
  masthead: `3px solid ${colors.red}`,           // sous le masthead + au-dessus de la nav
  radius: 0,                                     // ANGLE DROIT partout
} as const;

export const shadows = {
  // Le style billet est "plat". Ombres uniquement pour l'écran-conteneur et le toast.
  frame: '0 0 90px rgba(0,0,0,.7)',
  toast: '0 12px 30px rgba(0,0,0,.5)',
} as const;

/** Dimensions de layout */
export const layout = {
  phoneMaxWidth: 428,   // largeur max du conteneur mobile
  mastheadHeight: 52,
  bottomNavHeight: 50,
  notchDiameter: 18,    // diamètre des encoches perforées
} as const;

export const motion = {
  fadeIn: 'fcfade .3s ease',       // entrée d'écran
  toastIn: 'fctoast .3s ease',     // entrée du toast
  toastDuration: 3200,             // ms d'affichage du toast
} as const;
