'use client';

import { Box, Button, Typography } from '@mui/material';
import { colors, fonts, gradients, borders, radius } from '@/design-system/neon/tokens';
import type { Challenge } from '@/design-system/types';
import { boxerById, recordOf } from '@/data/mock-data';

/**
 * <ValidationTicket> — un défi à signer, écran Coach (« Néon Arena »).
 * Conscient du SENS (via `mineId`) : entrant « DÉFI POUR {mon boxeur} » (accepter)
 * ou sortant « DÉFI DE {mon boxeur} » (valider avant envoi).
 */
export function ValidationTicket({
  challenge,
  mineId,
  onSign,
  onRefuse,
}: {
  challenge: Challenge;
  mineId: string;
  onSign: (c: Challenge) => void;
  onRefuse: (c: Challenge) => void;
}) {
  const outgoing = challenge.fromId === mineId;
  const mine = boxerById(mineId);
  const otherId = outgoing ? challenge.toId : challenge.fromId;
  const other = otherId ? boxerById(otherId) : null;

  const bandLabel = outgoing ? `Défi de ${mine?.name ?? '—'}` : `Défi pour ${mine?.name ?? '—'}`;
  const otherLabel = outgoing ? 'Adversaire' : 'Challenger';
  const signLabel = outgoing ? "Valider l’envoi" : 'Signer le combat';
  const refuseLabel = outgoing ? 'Annuler' : 'Refuser';

  return (
    <Box sx={{ background: gradients.card, border: borders.card, borderRadius: `${radius.lg}px`, overflow: 'hidden' }}>
      {/* Bandeau */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1.75, py: 1, borderBottom: `1px solid ${colors.hairline}`, background: 'rgba(120,245,60,0.06)' }}>
        <Typography sx={{ fontFamily: fonts.action, fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', color: colors.neonText, textTransform: 'uppercase' }}>
          {bandLabel} · {challenge.weight}
        </Typography>
        <Typography sx={{ fontFamily: fonts.action, fontSize: 10, color: colors.textFaint }}>{challenge.serial}</Typography>
      </Box>

      {/* Corps */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1.5, p: 1.75 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontFamily: fonts.action, fontWeight: 600, fontSize: 9, letterSpacing: '0.14em', color: colors.textMuted, textTransform: 'uppercase' }}>
            {otherLabel}
          </Typography>
          <Typography sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 22, lineHeight: 1, color: colors.text, textTransform: 'uppercase', mt: 0.25 }}>
            {other?.name ?? 'À définir'}
          </Typography>
          <Typography sx={{ fontFamily: fonts.data, fontWeight: 600, fontSize: 12, color: colors.textMuted, textTransform: 'uppercase', mt: 0.25 }}>
            {other?.gymName ?? ''}
          </Typography>
        </Box>
        {other && (
          <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
            <Typography sx={{ fontFamily: fonts.display, fontWeight: 800, fontStyle: 'italic', fontSize: 20, lineHeight: 1, color: colors.text }}>
              {recordOf(other)}
            </Typography>
            <Typography sx={{ fontFamily: fonts.action, fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', color: colors.neonText, mt: 0.25 }}>
              Série {other.streak}V
            </Typography>
          </Box>
        )}
      </Box>

      {/* Actions */}
      <Box sx={{ px: 1.75, pb: 1.75 }}>
        <Typography sx={{ fontFamily: fonts.data, fontSize: 12, color: colors.textMuted, textTransform: 'uppercase', mb: 1.25 }}>
          {challenge.date} · {challenge.venue}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" onClick={() => onRefuse(challenge)} sx={{ flex: 1, py: 1 }}>
            {refuseLabel}
          </Button>
          <Button onClick={() => onSign(challenge)} sx={{ flex: 1.6, py: 1 }}>
            {signLabel}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ValidationTicket;
