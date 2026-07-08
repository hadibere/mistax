import { Divider, Typography } from '@mui/material';
import { Screen } from '@/components/Screen';
import { BackLink } from '@/components/BackLink';
import { colors, fonts } from '@/design-system/tokens';
import { boxerById } from '@/data/mock-data';

export default async function LancerPage({ searchParams }: PageProps<'/lancer'>) {
  const { adversaire } = await searchParams;
  const advId = Array.isArray(adversaire) ? adversaire[0] : adversaire;
  const opponent = advId ? boxerById(advId) : null;

  return (
    <Screen>
      <BackLink />
      <Typography variant="h3" component="h1" sx={{ color: colors.ink }}>
        Lancer un défi
      </Typography>
      <Divider sx={{ borderColor: colors.ink, mt: 1.5 }} />
      <Typography sx={{ fontFamily: fonts.ui, fontSize: 13, color: colors.muted, mt: 3, textTransform: 'uppercase' }}>
        Parcours à venir — adversaire, conditions, confirmation.
        {opponent ? ` Adversaire pré-sélectionné : ${opponent.name}.` : ''}
      </Typography>
    </Screen>
  );
}
