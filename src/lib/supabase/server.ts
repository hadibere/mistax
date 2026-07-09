import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Client Supabase côté serveur (Server Components, Server Actions, Route Handlers).
 * Lit/écrit la session via les cookies → c'est ce qui donne au RLS l'identité
 * de l'utilisateur connecté. En Next 16, `cookies()` est asynchrone.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // Depuis un Server Component, l'écriture de cookies échoue : c'est
          // le middleware qui rafraîchit la session. On ignore alors l'erreur.
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // no-op (appelé hors Server Action / Route Handler)
          }
        },
      },
    },
  );
}
