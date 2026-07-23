// Lógica pura del juego: elegir palabra y repartir roles.
import { categories } from './data/categories';

export function getCategoryById(id) {
  return categories.find((c) => c.id === id) || categories[0];
}

// Nombre a mostrar para un jugador. Usa el nombre escrito o "Jugador N" por defecto.
export function playerName(names, index) {
  const n = names && typeof names[index] === 'string' ? names[index].trim() : '';
  return n || `Jugador ${index + 1}`;
}

// Ajusta el array de nombres a un número de jugadores (añade vacíos o recorta).
export function resizeNames(names, count) {
  const out = (names || []).slice(0, count);
  while (out.length < count) out.push('');
  return out;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Genera una partida a partir de la configuración.
// config = { playerCount, impostorCount, hintEnabled, categoryId }
// Devuelve { word, category, roles: [{ index, isImpostor }], startPlayer }
export function createRound(config) {
  const { playerCount, impostorCount, categoryId } = config;
  const category = getCategoryById(categoryId);

  const word = category.words[Math.floor(Math.random() * category.words.length)];

  // Índices de jugadores 0..playerCount-1; elegimos al azar quién es impostor.
  const indices = shuffle(
    Array.from({ length: playerCount }, (_, i) => i)
  );
  const impostorSet = new Set(indices.slice(0, impostorCount));

  const roles = Array.from({ length: playerCount }, (_, i) => ({
    index: i,
    isImpostor: impostorSet.has(i),
  }));

  // Quién empieza a hablar (jugador al azar).
  const startPlayer = Math.floor(Math.random() * playerCount);

  return { word, category, roles, startPlayer };
}

// Límites de configuración razonables.
export const LIMITS = {
  minPlayers: 3,
  maxPlayers: 12,
  minImpostors: 1,
};

// El número máximo de impostores debe dejar siempre al menos 2 tripulantes
// para que el juego tenga sentido.
export function maxImpostorsFor(playerCount) {
  return Math.max(1, Math.min(playerCount - 2, Math.floor(playerCount / 2)));
}
