import { AppShell } from '@/components/AppShell';

/** Layout des écrans "boxeur" : cadre + Masthead + BottomNav. */
export default function BoxerLayout({ children }: { children: React.ReactNode }) {
  return <AppShell showBottomNav>{children}</AppShell>;
}
