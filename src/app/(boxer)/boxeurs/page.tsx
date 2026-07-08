'use client';

import { useMemo, useState } from 'react';
import { Divider, OutlinedInput, Stack, Typography } from '@mui/material';
import { FighterCard } from '@/components/FighterCard';
import { Screen } from '@/components/Screen';
import { colors, fonts } from '@/design-system/tokens';
import { boxers } from '@/data/mock-data';

const ME = 'you'; // utilisateur courant (Younes) — exclu de la liste des adversaires

export default function BoxeursPage() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return boxers
      .filter((b) => b.id !== ME)
      .filter((b) =>
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.gymName.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q),
      );
  }, [query]);

  return (
    <Screen>
      <Typography variant="h3" component="h1" sx={{ color: colors.ink }}>
        Les Combattants
      </Typography>
      <Divider sx={{ borderColor: colors.ink, mt: 1.5 }} />

      <OutlinedInput
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Nom, club, ville…"
        sx={{ mt: 2 }}
      />

      {results.length === 0 ? (
        <Typography sx={{ fontFamily: fonts.ui, fontSize: 13, color: colors.muted, mt: 3, textTransform: 'uppercase' }}>
          Aucun combattant ne correspond.
        </Typography>
      ) : (
        <Stack spacing={1.875} sx={{ mt: 2.5 }}>
          {results.map((b) => (
            <FighterCard key={b.id} boxer={b} />
          ))}
        </Stack>
      )}
    </Screen>
  );
}
