'use client';

import * as React from 'react';
import NextLink, { type LinkProps } from 'next/link';

/**
 * Adaptateur pour brancher Next.js <Link> comme LinkComponent par défaut de MUI
 * (voir theme.ts, MuiButtonBase/MuiLink). Permet d'écrire <Button href="/x">
 * tout en gardant la navigation client-side de Next — sans passer de composant
 * en prop à travers la frontière serveur/client.
 */
export const LinkBehaviour = React.forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, 'href'> & { href?: LinkProps['href'] }
>(function LinkBehaviour({ href = '', ...props }, ref) {
  return <NextLink ref={ref} href={href} {...props} />;
});

export default LinkBehaviour;
