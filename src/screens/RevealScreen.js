// Pantalla de revelación de roles: se pasa el móvil de jugador en jugador.
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, font } from '../theme';
import { Button } from '../components/UI';
import { playerName } from '../logic';

export default function RevealScreen({ round, config, onFinish, onCancel }) {
  const total = config.playerCount;
  // Fase por jugador: 'handoff' (pasa el móvil) -> 'revealed' (mira tu rol)
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState('handoff');

  const role = round.roles[current];

  const reveal = () => setPhase('revealed');

  const next = () => {
    if (current + 1 >= total) {
      onFinish();
    } else {
      setCurrent(current + 1);
      setPhase('handoff');
    }
  };

  const playerLabel = playerName(config.names, current);

  if (phase === 'handoff') {
    return (
      <View style={styles.container}>
        <Text style={styles.step}>
          {current + 1} de {total}
        </Text>
        <View style={styles.middle}>
          <Text style={styles.bigEmoji}>📱➡️</Text>
          <Text style={styles.handoffTitle}>Pásale el móvil a</Text>
          <Text style={styles.playerName}>{playerLabel}</Text>
          <Text style={styles.handoffHint}>
            Que nadie más mire la pantalla.
          </Text>
        </View>
        <View style={styles.actions}>
          <Button title={`Soy ${playerLabel}, ver mi rol`} onPress={reveal} />
          <Button title="Cancelar partida" variant="secondary" onPress={onCancel} />
        </View>
      </View>
    );
  }

  // phase === 'revealed'
  const isImpostor = role.isImpostor;
  return (
    <View style={styles.container}>
      <Text style={styles.step}>{playerLabel}</Text>
      <View style={styles.middle}>
        {isImpostor ? (
          <View style={styles.roleCardImpostor}>
            <Text style={styles.roleEmoji}>🕵️</Text>
            <Text style={styles.impostorLabel}>ERES EL IMPOSTOR</Text>
            {config.hintEnabled ? (
              <>
                <Text style={styles.hintCaption}>Tu única pista es la categoría:</Text>
                <Text style={styles.hintValue}>
                  {round.category.emoji} {round.category.name}
                </Text>
                <Text style={styles.impostorTip}>
                  Disimula. Averigua la palabra sin que te pillen.
                </Text>
              </>
            ) : (
              <Text style={styles.impostorTip}>
                No tienes ninguna pista. ¡Disimula y descubre la palabra!
              </Text>
            )}
          </View>
        ) : (
          <View style={styles.roleCardWord}>
            <Text style={styles.wordCaption}>La palabra es</Text>
            <Text style={styles.word}>{round.word}</Text>
            <Text style={styles.wordCategory}>
              {round.category.emoji} {round.category.name}
            </Text>
            <Text style={styles.crewTip}>
              Descríbela sin decirla para encontrar al impostor.
            </Text>
          </View>
        )}
      </View>
      <View style={styles.actions}>
        <Button
          title={current + 1 >= total ? 'Ocultar y empezar a jugar' : 'Ocultar y pasar el móvil'}
          onPress={next}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  step: {
    color: colors.textMuted,
    fontSize: font.body,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: spacing.md,
  },
  middle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  bigEmoji: { fontSize: 64, marginBottom: spacing.md },
  handoffTitle: { color: colors.textMuted, fontSize: font.h3 },
  playerName: { color: colors.text, fontSize: font.h1, fontWeight: '900' },
  handoffHint: {
    color: colors.textMuted,
    fontSize: font.body,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  actions: { gap: spacing.sm },

  roleCardWord: {
    backgroundColor: colors.surface,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: radius.lg,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    width: '100%',
    gap: spacing.sm,
  },
  wordCaption: { color: colors.textMuted, fontSize: font.body },
  word: {
    color: colors.primary,
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
  },
  wordCategory: { color: colors.textMuted, fontSize: font.body, marginTop: 2 },
  crewTip: {
    color: colors.textMuted,
    fontSize: font.small,
    textAlign: 'center',
    marginTop: spacing.sm,
  },

  roleCardImpostor: {
    backgroundColor: colors.surface,
    borderColor: colors.danger,
    borderWidth: 2,
    borderRadius: radius.lg,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    width: '100%',
    gap: spacing.sm,
  },
  roleEmoji: { fontSize: 48 },
  impostorLabel: {
    color: colors.danger,
    fontSize: font.h2,
    fontWeight: '900',
    letterSpacing: 1,
  },
  hintCaption: { color: colors.textMuted, fontSize: font.body, marginTop: spacing.sm },
  hintValue: { color: colors.text, fontSize: font.h2, fontWeight: '800' },
  impostorTip: {
    color: colors.textMuted,
    fontSize: font.small,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
