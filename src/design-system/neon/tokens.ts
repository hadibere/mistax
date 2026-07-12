/**
 * MistaX — Design Tokens · direction "Néon Arena" (dark, glossy, néon vert)
 * Thème SOMBRE uniquement. Source de vérité ; consommé par theme.ts (MUI).
 * Valeurs alignées sur la maquette de référence "Neon Fight Card".
 */

export const colors = {
  /* ---- Rampe de fonds sombres (teinte verte froide) ---- */
  bg:        '#050704',  // fond application (near-black)
  surface:   '#0C110A',  // surface carte (bas de dégradé)
  surfaceTop:'#151B0F',  // haut de dégradé carte
  raised:    '#171C12',  // blocs info / surfaces surélevées
  raised2:   '#202619',  // hover surface / puce

  /* ---- Surface "affiche" claire (comme la réf : carte gris clair sur arène sombre) ---- */
  poster:    '#C4C3BF',  // surface carte claire (RGB 196,195,191)
  posterHi:  '#E4E3DF',  // haut du dégradé affiche
  posterLo:  '#A9A8A2',  // bas / ombre affiche
  onPoster:  '#141410',  // texte sur l'affiche claire (near-black) — ratio ≈ 12:1 AAA

  /* ---- Néon principal + variantes ---- */
  neon:      '#78F53C',  // accent principal
  neonCore:  '#B6FF7A',  // cœur clair (haut du bevel / dégradé)
  neonHi:    '#DAFFB0',  // reflet le plus clair
  neonDeep:  '#43C018',  // bas du dégradé (ombre du bouton)
  neonText:  '#A9F572',  // néon en TEXTE sur fond sombre (plus lisible que #78F53C)

  /* ---- Statuts ---- */
  confirmed: '#33D06A',  // pastille "confirmé"
  confirmedText: '#4BE07E',
  pending:   '#F2B23C',  // en attente
  refused:   '#FF5468',  // refusé

  /* ---- Texte ---- */
  text:      '#EDF3E8',  // principal sur fond sombre
  textMuted: '#9AA790',  // secondaire / labels
  textFaint: '#5E6B54',  // méta, séparateurs "|", coordonnées
  onNeon:    '#0A1206',  // texte SUR le vert (near-black — jamais de blanc sur le néon)

  /* ---- Lignes / bordures ---- */
  hairline:  'rgba(255,255,255,0.08)',   // séparateurs neutres
  neonLine:  'rgba(120,245,60,0.35)',    // contour néon (photos, serial, chips)
  neonLineSoft:'rgba(120,245,60,0.18)',  // bordure de carte
} as const;

/** RGB du néon, pour composer glows/tints à l'opacité voulue. */
export const NEON_RGB = '120,245,60';
export const CONFIRMED_RGB = '51,208,106';

export const gradients = {
  /* Surface carte */
  card:   'linear-gradient(180deg,#151B0F 0%,#0C110A 60%,#090C07 100%)',
  /* Bouton néon glossy (le point chaud) */
  neonBtn:'linear-gradient(180deg,#BFFF86 0%,#86F84A 20%,#5FE22A 62%,#43C018 100%)',
  neonBtnHover:'linear-gradient(180deg,#D2FFA4 0%,#98FF5E 20%,#6BF033 62%,#4FD41E 100%)',
  /* Pastille "confirmé" */
  confirmed:'linear-gradient(160deg,#5BE87F,#22A94F)',
  /* Voile bas des photos (fondu vers la surface) */
  photoFade:'linear-gradient(180deg,transparent 48%,rgba(6,9,5,0.85) 100%)',
  /* Halo d'ambiance (coin de carte) */
  ambient:'radial-gradient(circle,rgba(120,245,60,0.20) 0%,transparent 62%)',
  /* Fond d'app (sans photo) */
  appBg:'radial-gradient(120% 70% at 50% -8%, #10210A 0%, #0A0E07 42%, #050704 100%)',
  /* Voile posé SUR la photo d'arène en fond (garde la lisibilité) */
  arenaScrim:'linear-gradient(180deg,rgba(5,7,4,0.70) 0%,rgba(5,7,4,0.88) 55%,#050704 100%)',
  /* Halo néon haut, par-dessus l'arène */
  arenaGlow:'radial-gradient(120% 60% at 50% -8%, rgba(120,245,60,0.14) 0%, transparent 55%)',
  /* Grillage/cage + vignette (fond d'arène par défaut, sans photo) */
  arenaMesh:'repeating-linear-gradient(45deg,rgba(120,245,60,0.05) 0 1px,transparent 1px 26px),repeating-linear-gradient(-45deg,rgba(255,255,255,0.035) 0 1px,transparent 1px 26px)',
  arenaVignette:'radial-gradient(75% 60% at 50% 42%, transparent 0%, rgba(5,7,4,0.55) 70%, rgba(5,7,4,0.9) 100%)',
} as const;

/**
 * Typographies — toutes Google Fonts (aucune propriétaire).
 * charge via next/font/google (weights indiqués).
 */
export const fonts = {
  // Variables CSS injectées par next/font/google (voir neon/fonts.ts + layout.tsx).
  /* Titres / display : gothique condensé italique agressif (Saira Condensed). */
  display: "var(--f-display), 'Arial Narrow', sans-serif",
  /* "Action" tech (VALIDER_LE_COMBAT), labels, badges, UI (Chakra Petch). */
  action:  "var(--f-action), ui-sans-serif, sans-serif",
  /* Données / records / captions (Barlow Semi Condensed). */
  data:    "var(--f-data), system-ui, sans-serif",
} as const;

export const fontWeights = {
  display: { bold: 700, black: 800 },   // black + italic pour les titres
  action:  { medium: 500, semibold: 600, bold: 700 },
  data:    { medium: 500, semibold: 600, bold: 700 },
} as const;

export const fontSizes = {
  micro: 10,   // labels info (CATÉGORIE)
  caption: 12, // données, badges
  label: 14,   // STATUT DE VALIDATION, CONFIRMÉ
  cta: 17,     // bouton
  dateVal: 19, // valeur date
  tagline: 27, // "LE COMBAT EST SCELLÉ"
  infoVal: 26, // −71KG
  title: 40,   // noms des combattants
} as const;

export const letterSpacing = {
  displayTight: '-0.5px',  // titres condensés
  action: '0.12em',        // CTA (style "underscore")
  label: '0.14em',         // labels UI
  wide: '0.18em',          // serial, badges
  widest: '0.32em',        // KRU://DEFI
} as const;

export const radius = {
  sm: 8, md: 12, lg: 14, xl: 16, card: 22, pill: 999,
} as const;

export const spacing = { xxs:4, xs:8, sm:12, md:16, lg:20, xl:24, '2xl':32 } as const;

/** Lueurs / glow (box-shadow). */
export const glow = {
  sm:  `0 0 12px rgba(${NEON_RGB},0.45)`,
  md:  `0 0 20px rgba(${NEON_RGB},0.55), 0 0 44px rgba(${NEON_RGB},0.30)`,
  /* CTA au repos : glow externe + bevel interne (reflet haut + ombre basse) */
  cta: `0 0 24px rgba(${NEON_RGB},0.60), 0 0 60px rgba(${NEON_RGB},0.38), inset 0 2px 0 rgba(255,255,255,0.70), inset 0 -4px 10px rgba(20,70,0,0.55)`,
  ctaHover:`0 0 34px rgba(${NEON_RGB},0.85), 0 0 84px rgba(${NEON_RGB},0.50), inset 0 2px 0 rgba(255,255,255,0.80), inset 0 -4px 10px rgba(20,70,0,0.55)`,
  confirmed:`0 0 18px rgba(${CONFIRMED_RGB},0.60), inset 0 1px 0 rgba(255,255,255,0.50)`,
  chip:`0 0 8px rgba(${NEON_RGB},0.80)`,
  /* Sous-lueur intégrée aux photos (inset depuis le bas) */
  photoInset:`inset 0 -30px 40px -20px rgba(${NEON_RGB},0.35)`,
} as const;

export const borders = {
  card:    `1px solid ${colors.neonLineSoft}`,
  photo:   `1px solid ${colors.neonLine}`,
  hairline:`1px solid ${colors.hairline}`,
  neonChip:`1px solid ${colors.neonLine}`,
} as const;

export const shadows = {
  card: '0 30px 70px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.05)',
} as const;

export const motion = {
  ctaPulse: 'ctapulse 2.6s ease-in-out infinite', // pulsation du glow CTA (facultatif)
} as const;

/**
 * CONTRASTE / accessibilité (vérifié) :
 * - onNeon #0A1206 sur neon #78F53C ......... ratio ≈ 12:1  → AA & AAA ✓
 * - text #EDF3E8 sur surface #0C110A ......... ratio ≈ 15:1  → AAA ✓
 * - neonText #A9F572 sur surface #0C110A ..... ratio ≈ 12:1  → AAA ✓
 * - textMuted #9AA790 sur surface #0C110A .... ratio ≈ 7:1   → AA ✓ (corps & labels)
 * - textFaint #5E6B54 : ≈ 3:1 → réservé au TEXTE DÉCORATIF/large uniquement (méta), pas au corps.
 * RÈGLE : ne jamais mettre de texte blanc/clair sur le vert néon (échoue) — toujours onNeon.
 */
