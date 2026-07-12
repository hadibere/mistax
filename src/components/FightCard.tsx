import { Box, Typography } from '@mui/material';
import { colors, fonts, gradients, glow, borders, radius, shadows } from '@/design-system/neon/tokens';
import type { Boxer, Challenge } from '@/design-system/types';

/**
 * <FightCard> — carte de combat signature « Néon Arena » (COMPONENTS.md §1).
 * Titre NOM vs NOM → bloc statut → 2 photos (placeholder initiales/silhouette)
 * → 2 blocs info → zone d'action (slot) → tagline. Thème sombre glossy néon.
 */

const STATUS: Record<
  Challenge['status'],
  { label: string; color: string; icon: 'check' | 'clock' | 'x'; tagline: string }
> = {
  accepted: { label: 'Confirmé', color: colors.confirmedText, icon: 'check', tagline: 'Le combat est scellé.' },
  pending:  { label: 'En attente', color: colors.pending, icon: 'clock', tagline: 'Validation en cours.' },
  sent:     { label: 'En attente', color: colors.pending, icon: 'clock', tagline: 'En attente du coach.' },
  refused:  { label: 'Refusé', color: colors.refused, icon: 'x', tagline: 'Défi refusé.' },
  open:     { label: 'Ouvert', color: colors.neonText, icon: 'clock', tagline: 'En quête d’un adversaire.' },
};

function StatusIcon({ kind, color }: { kind: 'check' | 'clock' | 'x'; color: string }) {
  const paths: Record<string, string> = {
    check: 'M5 12.5l4.5 4.5L19 7',
    x: 'M7 7l10 10M17 7L7 17',
    clock: 'M12 7v5l3.5 2',
  };
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      {kind === 'clock' && <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2.4" />}
      <path d={paths[kind]} stroke={color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Cadre photo 3/4 avec placeholder initiales + silhouette. */
function PhotoSlot({ boxer }: { boxer?: Boxer | null }) {
  return (
    <Box
      sx={{
        position: 'relative',
        aspectRatio: '3 / 4',
        borderRadius: `${radius.md}px`,
        overflow: 'hidden',
        border: borders.photo,
        boxShadow: glow.photoInset,
        background: 'linear-gradient(180deg,#161C11,#0C100A)',
      }}
    >
      {boxer?.avatarUrl ? (
        <Box component="img" src={boxer.avatarUrl} alt={boxer.name}
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
      ) : (
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* silhouette buste */}
          <svg width="76" height="76" viewBox="0 0 24 24" fill="none" aria-hidden style={{ position: 'absolute', opacity: 0.9 }}>
            <circle cx="12" cy="8" r="4" stroke="rgba(120,245,60,0.22)" strokeWidth="1.6" />
            <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" stroke="rgba(120,245,60,0.22)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <Typography sx={{ position: 'relative', fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 40, color: colors.neon, textShadow: glow.sm }}>
            {boxer?.initials ?? '—'}
          </Typography>
        </Box>
      )}
      {/* voile bas + ligne néon */}
      <Box sx={{ position: 'absolute', inset: 0, background: gradients.photoFade, pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '2px', background: 'linear-gradient(90deg,transparent,#78F53C,transparent)' }} />
    </Box>
  );
}

function InfoBlock({ label, children, icon }: { label: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <Box sx={{ background: 'rgba(255,255,255,0.03)', border: borders.hairline, borderRadius: `${radius.md}px`, p: '12px 14px', position: 'relative' }}>
      <Typography sx={{ fontFamily: fonts.action, fontWeight: 600, fontSize: 10, letterSpacing: '0.18em', color: colors.textMuted, textTransform: 'uppercase' }}>
        {label}
      </Typography>
      {icon && <Box sx={{ position: 'absolute', top: 12, right: 12, color: colors.textFaint }}>{icon}</Box>}
      <Box sx={{ mt: 0.75 }}>{children}</Box>
    </Box>
  );
}

export function FightCard({
  challenge,
  tenant,
  challenger,
  action,
}: {
  challenge: Challenge;
  tenant?: Boxer | null;
  challenger?: Boxer | null;
  action?: React.ReactNode;
}) {
  const st = STATUS[challenge.status] ?? STATUS.pending;
  const [wNum, wUnit] = (challenge.weight ?? '').split(' ');

  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: 404,
        mx: 'auto',
        background: gradients.card,
        border: borders.card,
        borderRadius: `${radius.card}px`,
        boxShadow: shadows.card,
        overflow: 'hidden',
        p: '22px 20px 24px',
      }}
    >
      {/* halo d'ambiance */}
      <Box sx={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: gradients.ambient, pointerEvents: 'none' }} />

      {/* Titre */}
      <Box sx={{ textAlign: 'center', mt: '10px', position: 'relative' }}>
        <Typography sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 40, lineHeight: 0.92, textTransform: 'uppercase', color: colors.text, textShadow: glow.sm }}>
          {tenant?.name ?? '—'}
        </Typography>
        <Typography sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 40, lineHeight: 0.92, textTransform: 'uppercase', color: colors.text }}>
          <Box component="span" sx={{ fontSize: 22, color: '#7FA36B', mr: 0.75 }}>VS</Box>
          {challenger?.name ?? 'À définir'}
        </Typography>
      </Box>

      {/* Statut */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '9px', m: '20px 0 22px' }}>
        <Box sx={{ width: 50, height: 50, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: challenge.status === 'accepted' ? gradients.confirmed : 'transparent',
          border: challenge.status === 'accepted' ? 'none' : `2px solid ${st.color}`,
          boxShadow: challenge.status === 'accepted' ? glow.confirmed : 'none' }}>
          <StatusIcon kind={st.icon} color={challenge.status === 'accepted' ? colors.onNeon : st.color} />
        </Box>
        <Typography sx={{ fontFamily: fonts.action, fontWeight: 700, fontSize: 15, letterSpacing: '0.2em', textTransform: 'uppercase', color: st.color }}>
          {st.label}
        </Typography>
      </Box>

      {/* Photos */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <PhotoSlot boxer={tenant} />
        <PhotoSlot boxer={challenger} />
      </Box>

      {/* Blocs info */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', mt: '12px' }}>
        <InfoBlock label="Catégorie">
          <Typography component="span" sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 26, color: colors.text }}>
            {wNum}
          </Typography>
          <Typography component="span" sx={{ fontFamily: fonts.data, fontSize: 14, color: colors.textMuted, ml: 0.5, textTransform: 'uppercase' }}>
            {wUnit}
          </Typography>
        </InfoBlock>
        <InfoBlock
          label="Date"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
              <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          }
        >
          <Typography sx={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 19, color: colors.text, textTransform: 'uppercase', lineHeight: 1.05 }}>
            {challenge.date || 'À définir'}
          </Typography>
        </InfoBlock>
      </Box>

      {/* Zone d'action (slot fourni par la page) */}
      {action && <Box sx={{ mt: '20px' }}>{action}</Box>}

      {/* Tagline */}
      <Typography sx={{ mt: '18px', textAlign: 'center', fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 26, textTransform: 'uppercase', color: colors.neonText, textShadow: glow.sm }}>
        {st.tagline}
      </Typography>
    </Box>
  );
}

export default FightCard;
