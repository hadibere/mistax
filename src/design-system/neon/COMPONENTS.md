# MistaX — Composants · direction "Néon Arena"

Thème **sombre** (glossy, néon vert), inspiré d'une affiche de gala / jeu de combat. Le moment **« combat confirmé »** est héroïque ; le **coach est le décideur**. Coins arrondis, lueurs néon, photos de combattants comme points chauds. Toutes les valeurs viennent de `tokens.ts` / `tokens.json`.

> ⚠️ Pas de mode clair. ⚠️ Aucun texte de billetterie (« places limitées », « lien billetterie ») — ce sont des combats **validés par le coach**, pas de la vente de tickets.

---

## Polices (Google Fonts, avec fallbacks)

| Rôle | Police | Graisses | Style | Usage | Fallback |
|---|---|---|---|---|---|
| **Display** | **Saira Condensed** | 700, 800 | italique | Titres (noms des combattants), tagline héroïque, gros chiffres (−71KG) | `Oswald, Arial Narrow, sans-serif` |
| **Action** | **Chakra Petch** | 500/600/700 | droit | CTA `VALIDER_LE_COMBAT`, labels, badges, serial, méta (support thaï = clin d'œil Muay Thaï) | `ui-sans-serif, Segoe UI, sans-serif` |
| **Data** | **Barlow Semi Condensed** | 500/600/700 | droit | Records/bilans (`8-2-1`), clubs, captions | `Roboto Condensed, system-ui, sans-serif` |

Import Next :
```tsx
import { Saira_Condensed, Chakra_Petch, Barlow_Semi_Condensed } from 'next/font/google';
export const saira  = Saira_Condensed({ weight:['700','800'], style:['italic','normal'], subsets:['latin'], variable:'--f-display' });
export const chakra = Chakra_Petch({ weight:['500','600','700'], subsets:['latin'], variable:'--f-action' });
export const barlow = Barlow_Semi_Condensed({ weight:['500','600','700'], subsets:['latin'], variable:'--f-data' });
```

**Échelle** (px) : 10 (label info) · 12 (data/badge) · 14 (label UI) · 17 (CTA) · 19 (date) · 26 (−71KG) · 27 (tagline) · 40 (titre).
**Letter-spacing** : titres `-0.5px` ; CTA `0.12em` ; labels UI `0.14em` ; serial/badges `0.18em` ; sur-titre `KRU://DEFI` `0.32em`.

---

## Couleurs (rappel)

Fonds : `bg #050704` · `surface #0C110A` · `surfaceTop #151B0F` · `raised #171C12`.
**Surface affiche (variante claire, comme la réf)** : `poster #C4C3BF` (RGB 196,195,191) · dégradé `posterHi #E4E3DF → posterLo #A9A8A2` · texte dessus `onPoster #141410`.
Néon : `neon #78F53C` · `neonCore #B6FF7A` · `neonDeep #43C018` · en texte `neonText #A9F572`.
Statuts : `confirmed #33D06A` · `pending #F2B23C` · `refused #FF5468`.
Texte : `text #EDF3E8` · `textMuted #9AA790` · `textFaint #5E6B54` · **sur néon `onNeon #0A1206`**.

**Contraste** : `onNeon` sur néon ≈ 12:1 (AAA) ; `text` sur surface ≈ 15:1 ; `neonText` sur surface ≈ 12:1 ; `textMuted` ≈ 7:1 (AA). **Ne jamais** mettre de texte clair sur le vert.

---

## Effets

- **Glow CTA (repos)** : `0 0 24px rgba(120,245,60,.6), 0 0 60px rgba(120,245,60,.38)` + bevel interne `inset 0 2px 0 rgba(255,255,255,.7), inset 0 -4px 10px rgba(20,70,0,.55)`.
- **Glow CTA (hover)** : flou/opacité augmentés (`glow.ctaHover`).
- **Glow moyen** (accents, focus) : `0 0 20px rgba(120,245,60,.55), 0 0 44px rgba(120,245,60,.30)`.
- **Sous-lueur photo** : `inset 0 -30px 40px -20px rgba(120,245,60,.35)` + fine ligne néon en bas.
- **Rayons** : sm 8 · md 12 · lg 14 · xl 16 · **card 22** · pill 999.
- **Bordures** : carte `1px rgba(120,245,60,.18)` ; photo/chips `1px rgba(120,245,60,.35)` ; neutres `1px rgba(255,255,255,.08)`.
- **Ombre carte** : `0 30px 70px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.05)`.

---

## 1. `<FightCard>` — carte de combat ⭐

Conteneur : `background: gradients.card` · `border: borders.card` · `radius 22` · `boxShadow: shadows.card` · `overflow:hidden` · padding `22px 20px 24px`. Largeur type mobile ~404px (fluide). Ajoute un halo d'ambiance : div absolu en haut-droite `radial-gradient` néon (`gradients.ambient`).

**Surface = sombre glossy** `gradients.card` (`#151B0F → #0C110A → #090C07`), bordure `borders.card` (`1px rgba(120,245,60,.18)`), texte clair `text`/`neonText`. Blocs info translucides `rgba(255,255,255,.03)` + bordure `rgba(255,255,255,.08)`. (Variante « affiche claire » `poster #C4C3BF` + texte `onPoster` disponible si besoin d'un autre écran.)

Structure épurée (version validée) : **titre `NOM 1 / VS NOM 2`** → **bloc CONFIRMÉ centré** → **2 photos** (sans légende) → **2 blocs info** → **CTA** → **tagline une ligne**. Pas de serial, pas de sur-titre, pas de label « validation », pas de légendes sous les photos, pas de pied de page.

Ordre vertical :

1. **Titre** (centré, margin-top ~10) : `NOM 1` puis ligne `VS NOM 2`. Saira **800 italic**, 40px, uppercase, léger `text-shadow` néon. Le `VS` est plus petit (22px), vert atténué `#7FA36B`.
2. **Statut — centré** : colonne centrée (gap 9, margin `20px 0 22px`). Anneau 50px `gradients.confirmed` avec ✓ (`stroke onNeon 3.2`), `boxShadow: glow.confirmed` ; sous l'anneau, libellé d'état (Chakra 700, 15px, `0.2em`) coloré selon le statut. **Pas de label « validation »**, pas de séparateur.
3. **Photos combattants** : grille 2 colonnes gap 12 (voir §4). **Aucune légende** sous les photos.
4. **Blocs info** : grille 2 colonnes gap 12. Chaque bloc `background rgba(255,255,255,.03)`, `border hairline`, radius 12, padding 12×14. Label Chakra 600, 10px, `0.18em`, `textMuted`.
   - CATÉGORIE → valeur `−71KG` (Saira 800, 26px ; `KG` 14px `textMuted`). **Sans icône.**
   - DATE → `SAM. 12 / JUIL. 2026` (Saira 700, 19px) · **icône calendrier** à droite (`textFaint`, stroke 1.7).
5. **CTA** (voir §2) — pleine largeur, margin-top 20.
6. **Tagline héroïque** (centrée, une ligne) : Saira 800 italic 26px uppercase, `neonText` + glow texte. Ex. « LE COMBAT EST SCELLÉ. ». Aucune sous-ligne.

**États de la carte** = l'anneau/libellé de statut (§3) + le CTA (§2) changent selon `confirmed | pending | refused`. En `pending`, le CTA est actif **pour le coach** ; côté boxeur il est remplacé par un texte « En attente de ton coach » (le boxeur ne valide pas).

## 2. Bouton CTA lumineux `VALIDER_LE_COMBAT`

- **Normal** : `background: gradients.neonBtn` · `color: onNeon` · radius 14 · padding 17 · Chakra 700, 17px, `0.12em` · `boxShadow: glow.cta` (glow + bevel). Texte "action" en UPPERCASE avec underscores.
- **Hover** : `background: gradients.neonBtnHover` · `boxShadow: glow.ctaHover` (halo plus large/intense).
- **Désactivé** : `background rgba(120,245,60,.06)` · `color textFaint` · `border 1px rgba(120,245,60,.3)` · pas de glow.
- Pulsation optionnelle du glow : `animation: ctapulse 2.6s ease-in-out infinite` (keyframe fourni dans le thème).
- **Toujours** texte `onNeon` (near-black) — jamais blanc.

## 3. Badges de statut

Pastille pill : `background: alpha(status,.12)` · `border 1px alpha(status,.45)` · radius pill · padding 7×14 · point lumineux 9px (`box-shadow 0 0 8px status`) + label Chakra 700, 12px, `0.12em`, couleur = statut.

- **CONFIRMÉ** → `#33D06A` (texte `#4BE07E`). Dans la carte, version "héroïque" = **disque** 44px `gradients.confirmed` avec ✓ (`stroke onNeon 3.2`), `boxShadow: glow.confirmed`, + libellé `CONFIRMÉ` dessous.
- **EN ATTENTE** → `#F2B23C`.
- **REFUSÉ** → `#FF5468`.

## 4. Cadrage photo combattant + placeholder

- **Cadre** : `aspect-ratio: 3/4` (portrait), `radius 12`, `overflow:hidden`, `border: borders.photo`, `boxShadow: glow.photoInset`. La photo : `object-fit: cover`, cadrée **haut** (le visage). En Next, `<Image fill style={{objectFit:'cover',objectPosition:'top'}} />`.
- **Traitement** : voile bas `gradients.photoFade` (fondu vers la surface) + fine **ligne néon** en bas (`linear-gradient(90deg,transparent,#78F53C,transparent)`, hauteur 2px). Donne l'effet "sous les projecteurs".
- **Placeholder (pas de photo — fréquent)** : même cadre, `background: linear-gradient(180deg,#161C11,#0C100A)`. Au centre, **initiales** du combattant (Saira 800 italic, 40px, `neon`, glow texte) superposées à une **silhouette** (icône buste `stroke rgba(120,245,60,.22)`, ~76px) en arrière-plan. Conserver la ligne néon du bas pour l'homogénéité.
  ```tsx
  <div className="frame">            {/* aspect 3/4, border photo, glow.photoInset */}
    {photoUrl
      ? <Image fill src={photoUrl} style={{objectFit:'cover',objectPosition:'top'}}/>
      : <Placeholder initials={initials} />}
    <span className="photo-fade"/><span className="neon-baseline"/>
  </div>
  ```

## 5. Typographie "action" (uppercase + underscores)

Pour les libellés d'action/commande (`VALIDER_LE_COMBAT`, `PARIS_19`) : **Chakra Petch** 600/700, UPPERCASE, `letter-spacing 0.12–0.18em`, remplacer les espaces par `_` dans les libellés d'action système (pas dans le texte éditorial). Couleur `onNeon` sur bouton, `neonText` ou `textFaint` en contexte sombre.

## 6. Layout / fond d'app

Fond d'app (arène), 3 couches empilées sous la carte (`z-index:0`), la carte au-dessus (`z-index:1`) :
1. base `#080B06` + **grillage/cage** `arenaMesh` (deux `repeating-linear-gradient` diagonaux, mailles ~26px) ;
2. **projecteurs** : halo néon haut `arenaGlow` ;
3. **vignette** `arenaVignette` (assombrit les bords, concentre le regard sur la carte).
Option : remplacer la base+grillage par une **photo d'arène** plein écran recouverte de `arenaScrim` + `arenaGlow`.

Espacement entre sections ≥ 32px.

> **Sobriété** : garder la carte peu chargée — un seul titre, le bloc statut centré, les 2 photos, 2 blocs info, le CTA, une tagline **d'une ligne**. Éviter serial, sur-titres, légendes sous les photos, sous-lignes explicatives et pieds de page décoratifs.

---

## Fichiers

```
design_system_mistax_neon/
├── tokens.ts        ← source de vérité (couleurs, dégradés, glow, typo, radius, a11y)
├── tokens.json      ← miroir JSON
├── theme.ts         ← thème MUI dark (à copier dans src/)
├── COMPONENTS.md    ← ce fichier
└── reference/       ← image de référence + rendu de la maquette
```
