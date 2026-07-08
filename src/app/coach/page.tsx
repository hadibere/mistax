import { Box, Divider, Typography } from '@mui/material';
import { Screen } from '@/components/Screen';
import { colors, fonts } from '@/design-system/tokens';
import { coaches } from '@/data/mock-data';

export default function CoachPage() {
  const coach = coaches[0];
  const nbBoxeurs = coach.fighterIds.length;

  return (
    <Screen>
      {/* En-tête coach (bloc encre) */}
      <Box sx={{ backgroundColor: colors.ink, p: 2 }}>
        <Typography sx={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '1.5px', color: colors.amber, textTransform: 'uppercase' }}>
          Espace coach — tu signes les combats
        </Typography>
        <Typography sx={{ fontFamily: fonts.display, fontSize: 30, color: colors.cream, textTransform: 'uppercase', mt: 0.5, lineHeight: 0.95 }}>
          {coach.name}
        </Typography>
        <Typography sx={{ fontFamily: fonts.ui, fontSize: 12, color: colors.onInkMuted, textTransform: 'uppercase', mt: 0.5 }}>
          {coach.gymName} · {nbBoxeurs} boxeurs
        </Typography>
      </Box>

      <Divider sx={{ borderColor: colors.ink, mt: 2 }} />
      <Typography sx={{ fontFamily: fonts.ui, fontSize: 13, color: colors.muted, mt: 3, textTransform: 'uppercase' }}>
        Écran à venir — section « À SIGNER » + ValidationTicket.
      </Typography>
    </Screen>
  );
}
