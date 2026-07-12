import { notFound } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';
import { FightCard } from '@/components/FightCard';
import { Screen } from '@/components/Screen';
import { BackLink } from '@/components/BackLink';
import { colors, fonts } from '@/design-system/neon/tokens';
import type { Challenge } from '@/design-system/types';
import { getBoxer, getChallenge } from '@/lib/queries';
import { DEMO_ME } from '@/lib/current-user';

/** Zone d'action de la carte selon le statut et le rôle du spectateur (boxeur). */
function actionFor(challenge: Challenge): React.ReactNode {
  const isIncoming = challenge.toId === DEMO_ME;

  if (challenge.status === 'accepted') {
    return <Button fullWidth>Ajouter au calendrier</Button>;
  }
  if (challenge.status === 'pending' && isIncoming) {
    return (
      <Box>
        <Typography sx={{ fontFamily: fonts.action, fontWeight: 600, fontSize: 12, letterSpacing: '0.1em', color: colors.pending, textTransform: 'uppercase', textAlign: 'center', mb: 1.25 }}>
          Tu ne signes pas — c’est ton coach qui valide
        </Typography>
        <Button href="/coach" fullWidth variant="outlined">Voir côté coach</Button>
      </Box>
    );
  }
  return null;
}

export default async function DefiPage({ params }: PageProps<'/defi/[id]'>) {
  const { id } = await params;
  const challenge = await getChallenge(id);
  if (!challenge) notFound();

  const [tenant, challenger] = await Promise.all([
    getBoxer(challenge.fromId),
    challenge.toId ? getBoxer(challenge.toId) : Promise.resolve(null),
  ]);

  return (
    <Screen>
      <BackLink label="La Carte" href="/" />
      <FightCard challenge={challenge} tenant={tenant} challenger={challenger} action={actionFor(challenge)} />
    </Screen>
  );
}
