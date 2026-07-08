import { Divider, Stack, Typography } from '@mui/material';
import { RankingRow } from '@/components/RankingRow';
import { Screen } from '@/components/Screen';
import { colors, fonts } from '@/design-system/tokens';
import { boxers } from '@/data/mock-data';

const ME = 'you'; // utilisateur courant (Younes)

export default function ClassementPage() {
  const ranked = [...boxers].sort((a, b) => a.rank - b.rank);

  return (
    <Screen>
      <Typography variant="h3" component="h1" sx={{ color: colors.ink }}>
        Le Classement
      </Typography>
      <Typography sx={{ fontFamily: fonts.ui, fontSize: 13, fontWeight: 600, color: colors.muted, mt: 0.5, textTransform: 'uppercase' }}>
        Régional · toutes catégories
      </Typography>
      <Divider sx={{ borderColor: colors.ink, mt: 1.5 }} />

      <Stack spacing={1.25} sx={{ mt: 2.5 }}>
        {ranked.map((b) => (
          <RankingRow key={b.id} boxer={b} isMe={b.id === ME} />
        ))}
      </Stack>
    </Screen>
  );
}
