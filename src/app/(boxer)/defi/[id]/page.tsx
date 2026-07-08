import { notFound } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';
import { FightPoster } from '@/components/FightPoster';
import { Screen } from '@/components/Screen';
import { BackLink } from '@/components/BackLink';
import { colors, fonts } from '@/design-system/tokens';
import type { Challenge, TimelineStep } from '@/design-system/types';
import { boxerById, challengeById, challenges } from '@/data/mock-data';

const ME = 'you'; // utilisateur courant (Younes)

/** Prérend les défis mock au build → le build rend réellement la page (garde-fou). */
export function generateStaticParams() {
  return challenges.map((c) => ({ id: c.id }));
}

/** Étapes de suivi dérivées du statut du défi. */
function timelineFor(status: Challenge['status']): TimelineStep[] {
  const signedByChallengerCoach = status === 'pending' || status === 'accepted';
  const official = status === 'accepted';
  return [
    { label: 'Défi lancé', done: status !== 'open' },
    { label: 'Validé côté tenant', done: signedByChallengerCoach },
    { label: 'Validé côté challenger', done: official },
    { label: 'Combat officiel', done: official },
  ];
}

/** Bloc « Suivi du combat » : timeline sur fond encre. */
function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <Box sx={{ backgroundColor: colors.ink, p: 2, mt: 2 }}>
      <Typography sx={{ fontFamily: fonts.ui, fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', color: colors.amber, textTransform: 'uppercase', mb: 1.5 }}>
        Suivi du combat
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        {steps.map((s) => (
          <Box key={s.label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 13,
                height: 13,
                flexShrink: 0,
                backgroundColor: s.done ? colors.amber : 'transparent',
                border: s.done ? 'none' : `1.5px solid ${colors.onInkFaint}`,
              }}
            />
            <Typography sx={{ fontFamily: fonts.ui, fontSize: 13, fontWeight: 600, letterSpacing: '.5px', color: s.done ? colors.cream : colors.onInkFaint, textTransform: 'uppercase' }}>
              {s.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/** Zone d'action selon le statut et le rôle du spectateur. */
function ActionZone({ challenge }: { challenge: Challenge }) {
  const isIncoming = challenge.toId === ME; // je suis le défié

  if (challenge.status === 'accepted') {
    return (
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.75 }}>
        Ajouter au calendrier
      </Button>
    );
  }

  if (challenge.status === 'pending' && isIncoming) {
    return (
      <Box sx={{ mt: 2 }}>
        <Box sx={{ backgroundColor: colors.red, color: colors.redInk, p: 1.5, textAlign: 'center' }}>
          <Typography sx={{ fontFamily: fonts.ui, fontSize: 13, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
            En attente du coach — tu ne signes pas toi-même
          </Typography>
        </Box>
        <Button
          href="/coach"
          variant="contained"
          fullWidth
          sx={{ mt: 1.5, py: 1.75, backgroundColor: colors.ink, color: colors.cream, '&:hover': { backgroundColor: colors.ink } }}
        >
          Voir côté coach
        </Button>
      </Box>
    );
  }

  const waiting =
    challenge.status === 'sent'
      ? 'En attente de la validation de ton coach.'
      : challenge.status === 'pending'
        ? 'En attente de la validation du coach adverse.'
        : challenge.status === 'refused'
          ? 'Défi refusé.'
          : 'Défi ouvert — pas encore d’adversaire désigné.';

  return (
    <Typography sx={{ fontFamily: fonts.ui, fontSize: 13, color: colors.muted, textTransform: 'uppercase', mt: 2, textAlign: 'center' }}>
      {waiting}
    </Typography>
  );
}

export default async function DefiPage({ params }: PageProps<'/defi/[id]'>) {
  const { id } = await params;
  const challenge = challengeById(id);
  if (!challenge) notFound();

  const tenant = boxerById(challenge.fromId);
  const challenger = challenge.toId ? boxerById(challenge.toId) : null;

  return (
    <Screen>
      <BackLink label="La Carte" href="/" />
      <FightPoster challenge={challenge} tenant={tenant} challenger={challenger} />
      <Timeline steps={timelineFor(challenge.status)} />
      <ActionZone challenge={challenge} />
    </Screen>
  );
}
