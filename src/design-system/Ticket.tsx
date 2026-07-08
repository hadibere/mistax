'use client';

import * as React from 'react';
import { Box, type BoxProps } from '@mui/material';
import { colors, layout, fonts } from './tokens';

/**
 * <Ticket> — LE composant signature de KRU.
 * Un conteneur "billet de match" : bord encre net + ligne de perforation
 * (traits pointillés) creusée par deux encoches circulaires qui reprennent
 * la couleur du fond de page (cream) pour donner l'illusion de trous.
 *
 * Usage :
 *   <Ticket>
 *     <Ticket.Band status="pending">SAM 12 JUIL · À VALIDER</Ticket.Band>
 *     <Ticket.Body> ...contenu haut... </Ticket.Body>
 *     <Ticket.Perforation />            // la déchirure horizontale
 *     <Ticket.Stub>                     // la souche : serial + code-barres
 *       <Barcode /> <span>N° 0451</span>
 *     </Ticket.Stub>
 *   </Ticket>
 *
 * IMPORTANT : la couleur des encoches (notchColor) DOIT être celle du fond
 * DERRIÈRE le ticket (cream par défaut). Si un ticket est posé sur une
 * surface encre, passer notchColor={colors.ink}.
 */

interface TicketProps extends BoxProps {
  /** Couleur du fond derrière le ticket (pour les encoches). Défaut cream. */
  notchColor?: string;
}

export function Ticket({ children, notchColor = colors.cream, sx, ...rest }: TicketProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: colors.paper,
        border: `1.5px solid ${colors.ink}`,
        overflow: 'hidden',
        // expose la couleur d'encoche aux sous-composants via CSS var
        '--notch': notchColor,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

/** Bandeau coloré en tête de ticket (statut / date). */
Ticket.Band = function Band({
  bg = colors.red,
  fg = colors.redInk,
  children,
  sx,
  ...rest
}: BoxProps & { bg?: string; fg?: string }) {
  return (
    <Box
      sx={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        px: 1.5, py: 0.75, backgroundColor: bg, color: fg,
        fontFamily: fonts.ui, fontWeight: 700,
        fontSize: 12, letterSpacing: '1px',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

Ticket.Body = function Body({ children, sx, ...rest }: BoxProps) {
  return <Box sx={{ p: 1.75, ...sx }} {...rest}>{children}</Box>;
};

/** La ligne de déchirure : perforation pointillée + 2 encoches rondes. */
Ticket.Perforation = function Perforation() {
  const notch = {
    content: '""', position: 'absolute', top: -layout.notchDiameter / 2,
    width: layout.notchDiameter, height: layout.notchDiameter,
    borderRadius: '50%', background: 'var(--notch)',
  } as const;
  return (
    <Box sx={{ position: 'relative', height: 0, borderTop: `1.5px dashed ${colors.ink}` }}>
      <Box sx={{ ...notch, left: -layout.notchDiameter / 2 }} />
      <Box sx={{ ...notch, right: -layout.notchDiameter / 2 }} />
    </Box>
  );
};

/** La souche : n° de série + code-barres. */
Ticket.Stub = function Stub({ children, sx, ...rest }: BoxProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1.75, py: 1.5, ...sx }} {...rest}>
      {children}
    </Box>
  );
};

/**
 * <Barcode> — code-barres décoratif en CSS pur (repeating-linear-gradient).
 * `light` = barres claires (sur fond encre), sinon barres encre (sur papier).
 */
export function Barcode({ height = 18, light = false }: { height?: number; light?: boolean }) {
  const bar = light ? colors.cream : colors.ink;
  return (
    <Box
      aria-hidden
      sx={{
        flex: 1, height,
        background: `repeating-linear-gradient(90deg, ${bar} 0 2px, transparent 2px 4px, ${bar} 4px 6px, transparent 6px 9px, ${bar} 9px 11px, transparent 11px 14px)`,
      }}
    />
  );
}

export default Ticket;
