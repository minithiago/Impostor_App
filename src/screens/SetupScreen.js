// Pantalla de configuración de la partida.
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  Pressable,
  TextInput,
} from 'react-native';
import { colors, spacing, radius, font } from '../theme';
import { Button, Stepper, Card } from '../components/UI';
import { categories } from '../data/categories';
import { LIMITS, maxImpostorsFor, resizeNames } from '../logic';

export default function SetupScreen({ config, setConfig, onStart }) {
  const maxImp = maxImpostorsFor(config.playerCount);

  // Si al cambiar jugadores el nº de impostores queda fuera de rango, lo ajustamos.
  // También redimensionamos la lista de nombres.
  const setPlayerCount = (v) => {
    const newMax = maxImpostorsFor(v);
    setConfig((c) => ({
      ...c,
      playerCount: v,
      impostorCount: Math.min(c.impostorCount, newMax),
      names: resizeNames(c.names, v),
    }));
  };

  const setName = (index, text) => {
    setConfig((c) => {
      const names = resizeNames(c.names, c.playerCount);
      names[index] = text;
      return { ...c, names };
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.emoji}>🕵️</Text>
        <Text style={styles.title}>El Impostor</Text>
        <Text style={styles.subtitle}>
          Pasa el móvil. Descubre quién no conoce la palabra.
        </Text>
      </View>

      {/* Jugadores */}
      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.label}>Jugadores</Text>
            <Text style={styles.hint}>Cuántos vais a jugar</Text>
          </View>
          <Stepper
            value={config.playerCount}
            onChange={setPlayerCount}
            min={LIMITS.minPlayers}
            max={LIMITS.maxPlayers}
          />
        </View>
      </Card>

      {/* Impostores */}
      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.label}>Impostores</Text>
            <Text style={styles.hint}>Máximo {maxImp} con {config.playerCount} jugadores</Text>
          </View>
          <Stepper
            value={config.impostorCount}
            onChange={(v) => setConfig((c) => ({ ...c, impostorCount: v }))}
            min={LIMITS.minImpostors}
            max={maxImp}
          />
        </View>
      </Card>

      {/* Nombres de los jugadores */}
      <Text style={styles.sectionTitle}>Nombres</Text>
      <Card style={styles.namesCard}>
        {Array.from({ length: config.playerCount }).map((_, i) => (
          <View key={i} style={styles.nameRow}>
            <Text style={styles.nameNum}>{i + 1}</Text>
            <TextInput
              value={config.names[i] || ''}
              onChangeText={(t) => setName(i, t)}
              placeholder={`Jugador ${i + 1}`}
              placeholderTextColor={colors.textMuted}
              style={styles.nameInput}
              maxLength={20}
              returnKeyType="done"
            />
          </View>
        ))}
      </Card>

      {/* Pista */}
      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.label}>Pista para el impostor</Text>
            <Text style={styles.hint}>Verá la categoría, pero no la palabra</Text>
          </View>
          <Switch
            value={config.hintEnabled}
            onValueChange={(v) => setConfig((c) => ({ ...c, hintEnabled: v }))}
            trackColor={{ false: colors.border, true: colors.primaryDark }}
            thumbColor={config.hintEnabled ? colors.primary : '#6B7580'}
          />
        </View>
      </Card>

      {/* Categoría */}
      <Text style={styles.sectionTitle}>Categoría</Text>
      <View style={styles.catGrid}>
        {categories.map((cat) => {
          const selected = cat.id === config.categoryId;
          return (
            <Pressable
              key={cat.id}
              onPress={() => setConfig((c) => ({ ...c, categoryId: cat.id }))}
              style={({ pressed }) => [
                styles.catChip,
                selected && styles.catChipSelected,
                pressed && styles.catChipPressed,
              ]}
            >
              <Text style={styles.catEmoji}>{cat.emoji}</Text>
              <Text
                style={[styles.catName, selected && styles.catNameSelected]}
                numberOfLines={1}
              >
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Button
        title="Empezar partida"
        onPress={onStart}
        style={styles.startBtn}
      />
      <Text style={styles.footer}>Sin internet · Para jugar en el mismo sitio</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
    gap: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  emoji: { fontSize: 52 },
  title: { color: colors.text, fontSize: font.h1, fontWeight: '900' },
  subtitle: {
    color: colors.textMuted,
    fontSize: font.body,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  card: { paddingVertical: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  rowText: { flex: 1 },
  label: { color: colors.text, fontSize: font.h3, fontWeight: '700' },
  hint: { color: colors.textMuted, fontSize: font.small, marginTop: 2 },
  sectionTitle: {
    color: colors.text,
    fontSize: font.h3,
    fontWeight: '700',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  namesCard: { paddingVertical: spacing.sm, gap: spacing.sm },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  nameNum: {
    color: colors.textMuted,
    fontSize: font.body,
    fontWeight: '700',
    width: 22,
    textAlign: 'center',
  },
  nameInput: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    color: colors.text,
    fontSize: font.body,
  },
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  catChip: {
    width: '48%',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
  },
  catChipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceAlt,
  },
  catChipPressed: { opacity: 0.7 },
  catEmoji: { fontSize: 22 },
  catName: { color: colors.textMuted, fontSize: font.body, fontWeight: '600', flexShrink: 1 },
  catNameSelected: { color: colors.text },
  startBtn: { marginTop: spacing.lg },
  footer: {
    color: colors.textMuted,
    fontSize: font.small,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
