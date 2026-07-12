import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { ChallengeCard } from '@/components/ChallengeCard';
import { Screen } from '@/components/Screen';
import { colors, fonts } from '@/design-system/neon/tokens';
import { getBoxers, getChallenges } from '@/lib/queries';

export default async function AffichePage() {
  const [challenges, boxers] = await Promise.all([getChallenges(), getBoxers()]);
  const byId = new Map(boxers.map((b) => [b.id, b]));

  return (
    <Screen>
      {/* En-tête d'écran */}
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Typography component="h1" sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 34, color: colors.text, textTransform: 'uppercase', lineHeight: 1 }}>
          La Carte
        </Typography>
        <Typography sx={{ fontFamily: fonts.action, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', color: colors.textMuted, textTransform: 'uppercase' }}>
          Saison 2026
        </Typography>
      </Box>
      <Typography sx={{ fontFamily: fonts.data, fontSize: 13, fontWeight: 600, color: colors.textMuted, mt: 0.75, textTransform: 'uppercase' }}>
        Team Sitan Paris · {challenges.length} combats à l'affiche
      </Typography>
      <Divider sx={{ borderColor: colors.hairline, mt: 1.5 }} />

      {/* CTA principal (bouton néon glossy via le thème) */}
      <Button href="/lancer" fullWidth sx={{ mt: 2.5 }}>
        + Lancer un défi
      </Button>

      {/* Liste des cartes de défi (compactes) */}
      <Stack spacing={1.5} sx={{ mt: 2.5 }}>
        {challenges.map((c) => (
          <ChallengeCard
            key={c.id}
            challenge={c}
            tenant={byId.get(c.fromId) ?? null}
            challenger={c.toId ? byId.get(c.toId) ?? null : null}
            href={`/defi/${c.id}`}
          />
        ))}
      </Stack>
    </Screen>
  );
}
