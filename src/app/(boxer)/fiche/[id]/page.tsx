import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { FighterPass } from '@/components/FighterPass';
import { Screen } from '@/components/Screen';
import { BackLink } from '@/components/BackLink';
import { colors, fonts } from '@/design-system/tokens';
import type { Boxer } from '@/design-system/types';
import { boutsOf } from '@/data/mock-data';
import { getBoxer } from '@/lib/queries';
import { DEMO_ME } from '@/lib/current-user';

/** Bandeau de 4 stats sous la licence. */
function StatsBand({ boxer }: { boxer: Boxer }) {
  const stats = [
    { label: 'Vict.', value: boxer.wins, color: colors.red },
    { label: 'Déf.', value: boxer.losses, color: colors.ink },
    { label: 'KO', value: boxer.ko, color: colors.red },
    { label: 'Série', value: boxer.streak, color: colors.ink },
  ];
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: `1.5px solid ${colors.ink}`, mt: 2 }}>
      {stats.map((s, i) => (
        <Box
          key={s.label}
          sx={{ textAlign: 'center', py: 1.5, borderRight: i < stats.length - 1 ? `1.5px solid ${colors.ink}` : 'none' }}
        >
          <Typography sx={{ fontFamily: fonts.display, fontSize: 26, lineHeight: 1, color: s.color }}>
            {s.value}
          </Typography>
          <Typography sx={{ fontFamily: fonts.ui, fontSize: 10, fontWeight: 700, letterSpacing: '.5px', color: colors.muted, textTransform: 'uppercase', mt: 0.5 }}>
            {s.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

/** Une ligne de palmarès : pastille V/D + adversaire + méthode + date. */
function BoutRow({ opponentName, result, method, date }: ReturnType<typeof boutsOf>[number]) {
  const isWin = result === 'V';
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box
        sx={{
          width: 34,
          height: 34,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isWin ? colors.red : colors.ink,
          color: colors.cream,
          fontFamily: fonts.display,
          fontSize: 18,
        }}
      >
        {result}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontFamily: fonts.ui, fontSize: 14, fontWeight: 700, color: colors.ink, textTransform: 'uppercase' }}>
          VS {opponentName}
        </Typography>
        <Typography sx={{ fontFamily: fonts.ui, fontSize: 12, color: colors.muted }}>
          {method}
        </Typography>
      </Box>
      <Typography sx={{ fontFamily: fonts.mono, fontSize: 9, color: colors.muted, whiteSpace: 'nowrap' }}>
        {date}
      </Typography>
    </Box>
  );
}

export default async function FichePage({ params }: PageProps<'/fiche/[id]'>) {
  const { id } = await params;
  const boxer = await getBoxer(id);

  if (!boxer) {
    return (
      <Screen>
        <BackLink label="Les Combattants" href="/boxeurs" />
        <Typography variant="h3" component="h1" sx={{ color: colors.ink }}>
          Boxeur introuvable
        </Typography>
      </Screen>
    );
  }

  const bouts = boutsOf(boxer);
  const isMe = boxer.id === DEMO_ME;
  const firstName = boxer.name.split(' ')[0];

  return (
    <Screen>
      <BackLink label="Les Combattants" href="/boxeurs" />

      <FighterPass boxer={boxer} />
      <StatsBand boxer={boxer} />

      {/* Palmarès */}
      <Typography variant="h5" component="h2" sx={{ color: colors.ink, mt: 3 }}>
        Palmarès
      </Typography>
      <Divider sx={{ borderColor: colors.ink, mt: 1 }} />
      {bouts.length === 0 ? (
        <Typography sx={{ fontFamily: fonts.ui, fontSize: 13, color: colors.muted, mt: 2, textTransform: 'uppercase' }}>
          Aucun combat enregistré.
        </Typography>
      ) : (
        <Stack spacing={1.5} sx={{ mt: 2 }}>
          {bouts.map((b, i) => (
            <BoutRow key={i} {...b} />
          ))}
        </Stack>
      )}

      {/* Action : défier (si ce n'est pas soi) */}
      {!isMe && (
        <Button href={`/lancer?adversaire=${boxer.id}`} variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.75 }}>
          Défier {firstName}
        </Button>
      )}
    </Screen>
  );
}
