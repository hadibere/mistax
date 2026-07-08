import { Divider, Typography } from '@mui/material';
import { Screen } from '@/components/Screen';
import { colors, fonts } from '@/design-system/tokens';

export default function ClassementPage() {
  return (
    <Screen>
      <Typography variant="h3" component="h1" sx={{ color: colors.ink }}>
        Le Classement
      </Typography>
      <Divider sx={{ borderColor: colors.ink, mt: 1.5 }} />
      <Typography sx={{ fontFamily: fonts.ui, fontSize: 13, color: colors.muted, mt: 3, textTransform: 'uppercase' }}>
        Écran à venir — RankingRow (perforation verticale).
      </Typography>
    </Screen>
  );
}
