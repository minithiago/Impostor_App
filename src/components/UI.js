// Componentes de interfaz reutilizables.
import React from 'react';
import {
  Text,
  Pressable,
  View,
  StyleSheet,
} from 'react-native';
import { colors, radius, spacing, font } from '../theme';

// Botón principal / secundario.
export function Button({ title, onPress, variant = 'primary', disabled, style }) {
  const isPrimary = variant === 'primary';
  const isDanger = variant === 'danger';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        isPrimary && styles.btnPrimary,
        isDanger && styles.btnDanger,
        !isPrimary && !isDanger && styles.btnSecondary,
        pressed && !disabled && styles.btnPressed,
        disabled && styles.btnDisabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.btnText,
          isPrimary ? styles.btnTextOnPrimary : styles.btnTextSecondary,
          isDanger && styles.btnTextOnPrimary,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

// Selector numérico con botones - / +.
export function Stepper({ value, onChange, min, max, disabled }) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  const canDec = !disabled && value > min;
  const canInc = !disabled && value < max;
  return (
    <View style={styles.stepper}>
      <Pressable
        onPress={dec}
        disabled={!canDec}
        style={({ pressed }) => [
          styles.stepBtn,
          pressed && canDec && styles.btnPressed,
          !canDec && styles.stepBtnDisabled,
        ]}
      >
        <Text style={styles.stepBtnText}>−</Text>
      </Pressable>
      <Text style={styles.stepValue}>{value}</Text>
      <Pressable
        onPress={inc}
        disabled={!canInc}
        style={({ pressed }) => [
          styles.stepBtn,
          pressed && canInc && styles.btnPressed,
          !canInc && styles.stepBtnDisabled,
        ]}
      >
        <Text style={styles.stepBtnText}>+</Text>
      </Pressable>
    </View>
  );
}

// Tarjeta contenedora.
export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 16,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: { backgroundColor: colors.primary },
  btnDanger: { backgroundColor: colors.danger },
  btnSecondary: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  btnPressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
  btnDisabled: { opacity: 0.4 },
  btnText: { fontSize: font.body, fontWeight: '700' },
  btnTextOnPrimary: { color: colors.onPrimary },
  btnTextSecondary: { color: colors.text },

  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  stepBtn: {
    width: 46,
    height: 46,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnDisabled: { opacity: 0.35 },
  stepBtnText: { color: colors.text, fontSize: 26, fontWeight: '600', lineHeight: 30 },
  stepValue: {
    color: colors.text,
    fontSize: font.h2,
    fontWeight: '800',
    minWidth: 44,
    textAlign: 'center',
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
