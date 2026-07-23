// Punto de entrada. Máquina de estados simple entre pantallas (sin librería de navegación).
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Platform,
  Pressable,
  Text,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { colors, radius } from './src/theme';
import { createRound } from './src/logic';
import { defaultCategoryId } from './src/data/categories';
import {
  playMenuMusic,
  playGameMusic,
  stopMusic,
  playEndgameSting,
  setMuted as audioSetMuted,
} from './src/audio';
import SetupScreen from './src/screens/SetupScreen';
import RevealScreen from './src/screens/RevealScreen';
import GameScreen from './src/screens/GameScreen';
import ResultScreen from './src/screens/ResultScreen';

export default function App() {
  // Pantallas: 'setup' | 'reveal' | 'game' | 'result'
  const [screen, setScreen] = useState('setup');
  const [muted, setMuted] = useState(false);
  const [config, setConfig] = useState({
    playerCount: 4,
    impostorCount: 1,
    hintEnabled: true,
    categoryId: defaultCategoryId,
    names: ['', '', '', ''],
  });
  const [round, setRound] = useState(null);

  // Música de fondo según la pantalla.
  useEffect(() => {
    if (screen === 'setup') playMenuMusic();
    else if (screen === 'reveal' || screen === 'game') playGameMusic();
    else if (screen === 'result') stopMusic();
  }, [screen]);

  const startGame = () => {
    setRound(createRound(config));
    setScreen('reveal');
  };

  const playAgain = () => {
    // Nueva palabra y nuevos roles con la misma configuración.
    setRound(createRound(config));
    setScreen('reveal');
  };

  // Al revelar: suena uno de los 4 sonidos de final y pasamos al resultado.
  const revealResult = () => {
    playEndgameSting();
    setScreen('result');
  };

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      audioSetMuted(next);
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ExpoStatusBar style="light" />
      <View style={styles.container}>
        {screen === 'setup' && (
          <SetupScreen config={config} setConfig={setConfig} onStart={startGame} />
        )}
        {screen === 'reveal' && round && (
          <RevealScreen
            round={round}
            config={config}
            onFinish={() => setScreen('game')}
            onCancel={() => setScreen('setup')}
          />
        )}
        {screen === 'game' && round && (
          <GameScreen
            round={round}
            config={config}
            onReveal={revealResult}
          />
        )}
        {screen === 'result' && round && (
          <ResultScreen
            round={round}
            config={config}
            onPlayAgain={playAgain}
            onHome={() => setScreen('setup')}
          />
        )}

        {/* Botón de silencio, siempre accesible arriba a la derecha. */}
        <Pressable
          onPress={toggleMute}
          style={({ pressed }) => [styles.muteBtn, pressed && styles.mutePressed]}
          hitSlop={10}
        >
          <Text style={styles.muteIcon}>{muted ? '🔇' : '🔊'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: { flex: 1, backgroundColor: colors.bg },
  muteBtn: {
    position: 'absolute',
    top: 8,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mutePressed: { opacity: 0.6 },
  muteIcon: { fontSize: 18 },
});
