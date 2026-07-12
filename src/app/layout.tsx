import type { Metadata } from 'next';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { mistaxTheme } from '@/design-system/neon/theme';
import { neonFontVariables } from '@/design-system/neon/fonts';
import { fontVariables } from '@/design-system/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'MistaX — Le Défi Encadré',
  description: 'Défis de Muay Thaï entre clubs, validés par le coach.',
  // Site en construction : on empêche l'indexation par les moteurs de recherche.
  // À retirer au lancement (avec nom de domaine + Search Console).
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${neonFontVariables} ${fontVariables}`}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={mistaxTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
