import { Divider, Typography } from '@mui/material';
import { Screen } from '@/components/Screen';
import { colors, fonts } from '@/design-system/tokens';
import { boxerById } from '@/data/mock-data';

export default async function FichePage({ params }: PageProps<'/fiche/[id]'>) {
  const { id } = await params;
  const boxer = boxerById(id);

  return (
    <Screen>
      <Typography variant="h3" component="h1" sx={{ color: colors.ink }}>
        {boxer?.name ?? 'Fiche'}
      </Typography>
      <Divider sx={{ borderColor: colors.ink, mt: 1.5 }} />
      <Typography sx={{ fontFamily: fonts.ui, fontSize: 13, color: colors.muted, mt: 3, textTransform: 'uppercase' }}>
        Écran à venir — FighterPass + stats + palmarès.
      </Typography>
    </Screen>
  );
}
