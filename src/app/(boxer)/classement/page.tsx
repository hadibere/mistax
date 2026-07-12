import { Divider, Stack, Typography } from '@mui/material';
import { RankingRow } from '@/components/RankingRow';
import { Screen } from '@/components/Screen';
import { colors, fonts } from '@/design-system/neon/tokens';
import { getBoxers } from '@/lib/queries';
import { DEMO_ME } from '@/lib/current-user';

export default async function ClassementPage() {
  const boxers = await getBoxers();
  const ranked = [...boxers].sort((a, b) => a.rank - b.rank);

  return (
    <Screen>
      <Typography component="h1" sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 34, color: colors.text, textTransform: 'uppercase', lineHeight: 1 }}>
        Le Classement
      </Typography>
      <Typography sx={{ fontFamily: fonts.data, fontSize: 13, fontWeight: 600, color: colors.textMuted, mt: 0.75, textTransform: 'uppercase' }}>
        Régional · toutes catégories
      </Typography>
      <Divider sx={{ borderColor: colors.hairline, mt: 1.5 }} />

      <Stack spacing={1.25} sx={{ mt: 2.5 }}>
        {ranked.map((b) => (
          <RankingRow key={b.id} boxer={b} isMe={b.id === DEMO_ME} />
        ))}
      </Stack>
    </Screen>
  );
}
