import { AppShell } from '@/components/AppShell';

/** Layout de l'espace coach : cadre + Masthead, SANS BottomNav. */
export default function CoachLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
