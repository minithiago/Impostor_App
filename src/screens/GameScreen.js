// Pantalla de juego: debate, temporizador opcional y revelación final.
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, font } from '../theme';
import { Button, Card } from '../components/UI';
import { playerName } from '../logic';

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function GameScreen({ round, config, onReveal }) {
  const impostorNumbers = round.roles
    .filter((r) => r.isImpostor)
    .map((r) => r.index + 1);

  // Temporizador de debate.
  const DURATION = 120; // 2 min
  const [seconds, setSeconds] = useState(DURATION);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const toggleTimer = () => {
    if (seconds === 0) {
      setSeconds(DURATION);
      setRunning(true);
    } else {
      setRunning((r) => !r);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>¡A debatir!</Text>
        <Text style={styles.subtitle}>
          Por turnos, cada uno da una pista sobre la palabra sin decirla.
        </Text>
      </View>

      <Card style={styles.startCard}>
        <Text style={styles.startCaption}>Empieza a hablar</Text>
        <Text style={styles.startPlayer}>{playerName(config.names, round.startPlayer)}</Text>
      </Card>

      <Card style={styles.timerCard}>
        <Text style={styles.timer}>{formatTime(seconds)}</Text>
        <View style={styles.timerBtns}>
          <Button
            title={running ? 'Pausar' : seconds === 0 ? 'Reiniciar' : 'Iniciar tiempo'}
            variant="secondary"
            onPress={toggleTimer}
            style={styles.flex1}
          />
        </View>
      </Card>

      <View style={styles.bottom}>
        <Text style={styles.voteHint}>
          Cuando estéis listos, votad quién creéis que es el impostor y
          revelad el resultado.
        </Text>
        <Button title="Revelar impostor y palabra" variant="danger" onPress={onReveal} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, justifyContent: 'space-between' },
  top: { alignItems: 'center', gap: spacing.sm, marginTop: spacing.md },
  title: { color: colors.text, fontSize: font.h1, fontWeight: '900' },
  subtitle: {
    color: colors.textMuted,
    fontSize: font.body,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  startCard: { alignItems: 'center', gap: spacing.xs, paddingVertical: spacing.lg },
  startCaption: { color: colors.textMuted, fontSize: font.body },
  startPlayer: { color: colors.primary, fontSize: font.h1, fontWeight: '900' },
  timerCard: { alignItems: 'center', gap: spacing.md },
  timer: {
    color: colors.text,
    fontSize: 56,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
  },
  timerBtns: { flexDirection: 'row', width: '100%' },
  flex1: { flex: 1 },
  bottom: { gap: spacing.md },
  voteHint: {
    color: colors.textMuted,
    fontSize: font.small,
    textAlign: 'center',
  },
});
