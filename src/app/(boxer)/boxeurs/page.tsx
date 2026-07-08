import { Divider, Typography } from '@mui/material';
import { Screen } from '@/components/Screen';
import { colors, fonts } from '@/design-system/tokens';

export default function BoxeursPage() {
  return (
    <Screen>
      <Typography variant="h3" component="h1" sx={{ color: colors.ink }}>
        Les Combattants
      </Typography>
      <Divider sx={{ borderColor: colors.ink, mt: 1.5 }} />
      <Typography sx={{ fontFamily: fonts.ui, fontSize: 13, color: colors.muted, mt: 3, textTransform: 'uppercase' }}>
        Écran à venir — recherche + FighterCard.
      </Typography>
    </Screen>
  );
}
