import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { FighterPass } from '@/components/FighterPass';
import { Screen } from '@/components/Screen';
import { BackLink } from '@/components/BackLink';
import { colors, fonts, borders, radius } from '@/design-system/neon/tokens';
import type { Boxer } from '@/design-system/types';
import { boutsOf } from '@/data/mock-data';
import { getBoxer } from '@/lib/queries';
import { DEMO_ME } from '@/lib/current-user';

/** Bandeau de 4 stats sous la licence. */
function StatsBand({ boxer }: { boxer: Boxer }) {
  const stats = [
    { label: 'Vict.', value: boxer.wins, color: colors.neonText },
    { label: 'Déf.', value: boxer.losses, color: colors.text },
    { label: 'KO', value: boxer.ko, color: colors.neonText },
    { label: 'Série', value: boxer.streak, color: colors.text },
  ];
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: borders.card, borderRadius: `${radius.md}px`, mt: 2, overflow: 'hidden' }}>
      {stats.map((s, i) => (
        <Box
          key={s.label}
          sx={{ textAlign: 'center', py: 1.5, background: 'rgba(255,255,255,0.02)', borderRight: i < stats.length - 1 ? `1px solid ${colors.hairline}` : 'none' }}
        >
          <Typography sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 26, lineHeight: 1, color: s.color }}>
            {s.value}
          </Typography>
          <Typography sx={{ fontFamily: fonts.action, fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', color: colors.textMuted, textTransform: 'uppercase', mt: 0.5 }}>
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
          borderRadius: `${radius.sm}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isWin ? colors.neon : 'rgba(255,255,255,0.05)',
          border: isWin ? 'none' : `1px solid ${colors.hairline}`,
          color: isWin ? colors.onNeon : colors.textMuted,
          fontFamily: fonts.display,
          fontWeight: 800,
          fontStyle: 'italic',
          fontSize: 18,
        }}
      >
        {result}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontFamily: fonts.data, fontSize: 14, fontWeight: 700, color: colors.text, textTransform: 'uppercase' }}>
          VS {opponentName}
        </Typography>
        <Typography sx={{ fontFamily: fonts.data, fontSize: 12, color: colors.textMuted }}>
          {method}
        </Typography>
      </Box>
      <Typography sx={{ fontFamily: fonts.action, fontSize: 9, letterSpacing: '0.1em', color: colors.textFaint, whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
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
        <Typography component="h1" sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 30, color: colors.text, textTransform: 'uppercase' }}>
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
      <Typography component="h2" sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 22, color: colors.text, textTransform: 'uppercase', mt: 3 }}>
        Palmarès
      </Typography>
      <Divider sx={{ borderColor: colors.hairline, mt: 1 }} />
      {bouts.length === 0 ? (
        <Typography sx={{ fontFamily: fonts.data, fontSize: 13, color: colors.textMuted, mt: 2, textTransform: 'uppercase' }}>
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
        <Button href={`/lancer?adversaire=${boxer.id}`} fullWidth sx={{ mt: 3 }}>
          Défier {firstName}
        </Button>
      )}
    </Screen>
  );
}
