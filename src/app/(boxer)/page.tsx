import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { ChallengeTicket } from '@/components/ChallengeTicket';
import { Screen } from '@/components/Screen';
import { colors, fonts } from '@/design-system/tokens';
import { challenges } from '@/data/mock-data';

export default function AffichePage() {
  return (
    <Screen>
      {/* En-tête d'écran */}
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Typography variant="h3" component="h1" sx={{ color: colors.ink }}>
          La Carte
        </Typography>
        <Typography sx={{ fontFamily: fonts.ui, fontSize: 11.5, fontWeight: 700, letterSpacing: '1px', color: colors.muted }}>
          SAISON 2026
        </Typography>
      </Box>
      <Typography sx={{ fontFamily: fonts.ui, fontSize: 13, fontWeight: 600, color: colors.muted, mt: 0.5, textTransform: 'uppercase' }}>
        Team Sitan Paris · {challenges.length} combats à l'affiche
      </Typography>
      <Divider sx={{ borderColor: colors.ink, mt: 1.5 }} />

      {/* CTA principal */}
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2.5, py: 1.75 }}>
        + Lancer un défi
      </Button>

      {/* Liste des billets de défi */}
      <Stack spacing={1.875} sx={{ mt: 2.5 }}>
        {challenges.map((c) => (
          <ChallengeTicket key={c.id} challenge={c} />
        ))}
      </Stack>
    </Screen>
  );
}
