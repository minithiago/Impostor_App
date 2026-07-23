// Pantalla de resultado: revela la palabra y quién era el impostor.
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, font } from '../theme';
import { Button, Card } from '../components/UI';
import { playerName } from '../logic';

export default function ResultScreen({ round, config, onPlayAgain, onHome }) {
  const impostorNames = round.roles
    .filter((r) => r.isImpostor)
    .map((r) => playerName(config.names, r.index));

  const many = impostorNames.length > 1;

  return (
    <View style={styles.container}>
      <View style={styles.middle}>
        <Text style={styles.emoji}>🕵️</Text>
        <Text style={styles.label}>{many ? 'Los impostores eran' : 'El impostor era'}</Text>
        <Text style={styles.impostors}>
          {impostorNames.join('  ·  ')}
        </Text>

        <Card style={styles.wordCard}>
          <Text style={styles.wordCaption}>La palabra era</Text>
          <Text style={styles.word}>{round.word}</Text>
          <Text style={styles.category}>
            {round.category.emoji} {round.category.name}
          </Text>
        </Card>
      </View>

      <View style={styles.actions}>
        <Button title="Jugar otra vez" onPress={onPlayAgain} />
        <Button title="Volver al menú" variant="secondary" onPress={onHome} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, justifyContent: 'space-between' },
  middle: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  emoji: { fontSize: 56 },
  label: { color: colors.textMuted, fontSize: font.h3 },
  impostors: {
    color: colors.danger,
    fontSize: font.h1,
    fontWeight: '900',
    textAlign: 'center',
  },
  wordCard: {
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.lg,
    width: '100%',
    borderColor: colors.primary,
  },
  wordCaption: { color: colors.textMuted, fontSize: font.body },
  word: { color: colors.primary, fontSize: font.h1, fontWeight: '900', textAlign: 'center' },
  category: { color: colors.textMuted, fontSize: font.body },
  actions: { gap: spacing.sm },
});
