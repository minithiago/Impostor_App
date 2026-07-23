// Gestor de audio del juego.
// - Música del menú (MainTheme) y de la partida (InGame), en bucle.
// - 4 sonidos de final (EndGame1..4): al revelar suena uno al azar.
import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';

const sources = {
  menu: require('../assets/audio/MainTheme.mp3'),
  game: require('../assets/audio/InGame.mp3'),
  endgame: [
    require('../assets/audio/EndGame1.mp3'),
    require('../assets/audio/EndGame2.mp3'),
    require('../assets/audio/EndGame3.mp3'),
    require('../assets/audio/EndGame4.mp3'),
  ],
};

let players = null;
let muted = false;
let currentBg = null; // 'menu' | 'game' | null

// Creamos los reproductores una sola vez, la primera vez que se necesitan.
function ensure() {
  if (players) return players;
  setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
  const menu = createAudioPlayer(sources.menu);
  menu.loop = true;
  const game = createAudioPlayer(sources.game);
  game.loop = true;
  const endgame = sources.endgame.map((s) => createAudioPlayer(s));
  players = { menu, game, endgame };
  return players;
}

function startLoop(player) {
  if (muted) return;
  try {
    player.seekTo(0);
    player.play();
  } catch (e) {
    // Ignoramos errores de audio para no romper el juego.
  }
}

export function playMenuMusic() {
  const p = ensure();
  if (currentBg === 'menu') return;
  currentBg = 'menu';
  p.game.pause();
  startLoop(p.menu);
}

export function playGameMusic() {
  const p = ensure();
  if (currentBg === 'game') return;
  currentBg = 'game';
  p.menu.pause();
  startLoop(p.game);
}

export function stopMusic() {
  const p = ensure();
  currentBg = null;
  p.menu.pause();
  p.game.pause();
}

// Reproduce uno de los 4 sonidos de final al azar.
export function playEndgameSting() {
  const p = ensure();
  if (muted) return;
  const i = Math.floor(Math.random() * p.endgame.length);
  const s = p.endgame[i];
  try {
    s.seekTo(0);
    s.play();
  } catch (e) {}
}

// Silencia / reactiva todo el audio (afecta a la música de fondo actual).
export function setMuted(value) {
  muted = value;
  const p = ensure();
  if (value) {
    p.menu.pause();
    p.game.pause();
  } else if (currentBg === 'menu') {
    startLoop(p.menu);
  } else if (currentBg === 'game') {
    startLoop(p.game);
  }
}
