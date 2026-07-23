// Categorías de palabras (todo en español).
// La primera (dia_a_dia) es la categoría por defecto.
// Cada categoría tiene un id, un nombre visible, un emoji y su lista de palabras.

export const categories = [
  {
    id: 'dia_a_dia',
    name: 'Día a día',
    emoji: '🏠',
    words: [
      'Café', 'Almohada', 'Paraguas', 'Cepillo de dientes', 'Nevera',
      'Llaves', 'Despertador', 'Ducha', 'Mochila', 'Cargador',
      'Espejo', 'Toalla', 'Ventana', 'Escalera', 'Bolígrafo',
      'Zapatillas', 'Cartera', 'Mando a distancia', 'Lavadora', 'Cuchara',
      'Sartén', 'Gafas', 'Reloj', 'Manta', 'Bicicleta',
      'Servilleta', 'Basura', 'Enchufe', 'Jabón', 'Peine',
      'Vaso', 'Silla', 'Almendra', 'Pan', 'Leche',
      'Microondas', 'Cortina', 'Alfombra', 'Mesa', 'Sofá',
    ],
  },
  {
    id: 'cine_tv',
    name: 'Cine y televisión',
    emoji: '🎬',
    words: [
      'Titanic', 'Star Wars', 'Harry Potter', 'El Rey León', 'Matrix',
      'Los Simpson', 'Friends', 'Juego de Tronos', 'Breaking Bad', 'Stranger Things',
      'El Padrino', 'Jurassic Park', 'Avatar', 'Toy Story', 'Batman',
      'Spider-Man', 'La Casa de Papel', 'El Señor de los Anillos', 'Piratas del Caribe', 'Frozen',
      'Gran Torino', 'Interstellar', 'Shrek', 'Los Vengadores', 'Regreso al Futuro',
      'El Resplandor', 'Forrest Gump', 'Rápido y Furioso', 'La La Land', 'Coco',
      'Peaky Blinders', 'The Office', 'Black Mirror', 'La Sirenita', 'Aladdín',
    ],
  },
  {
    id: 'futbol',
    name: 'Fútbol',
    emoji: '⚽',
    words: [
      'Messi', 'Cristiano Ronaldo', 'Portero', 'Penalti', 'Córner',
      'Árbitro', 'Fuera de juego', 'Tarjeta roja', 'Champions League', 'Mundial',
      'Real Madrid', 'Barcelona', 'Balón', 'Portería', 'Delantero',
      'Defensa', 'Centrocampista', 'Gol', 'Estadio', 'Afición',
      'Vestuario', 'Entrenador', 'Falta', 'Saque de banda', 'VAR',
      'Camiseta', 'Botas', 'Césped', 'Prórroga', 'Descuento',
      'Maradona', 'Guardiola', 'Derbi', 'Ascenso', 'Bota de Oro',
    ],
  },
  {
    id: 'famosos',
    name: 'Gente famosa',
    emoji: '⭐',
    words: [
      'Shakira', 'Bad Bunny', 'Beyoncé', 'Taylor Swift', 'Elon Musk',
      'Cristiano Ronaldo', 'Rosalía', 'Messi', 'Rihanna', 'Brad Pitt',
      'Ariana Grande', 'Will Smith', 'Dua Lipa', 'Lady Gaga', 'Leonardo DiCaprio',
      'Karol G', 'The Rock', 'Billie Eilish', 'Cristina Pedroche', 'Ibai',
      'Ronaldinho', 'Adele', 'Justin Bieber', 'Penélope Cruz', 'Antonio Banderas',
      'Michael Jackson', 'Freddie Mercury', 'Kim Kardashian', 'Quevedo', 'Aitana',
    ],
  },
  {
    id: 'marcas',
    name: 'Marcas',
    emoji: '🏷️',
    words: [
      'Coca-Cola', 'Nike', 'Apple', 'McDonalds', 'Adidas',
      'Samsung', 'Netflix', 'Google', 'Amazon', 'Zara',
      'Ikea', 'Lego', 'Ferrari', 'Mercedes', 'Nutella',
      'Nintendo', 'PlayStation', 'Spotify', 'Instagram', 'WhatsApp',
      'Nestlé', 'Pepsi', 'Puma', 'Rolex', 'Lamborghini',
      'Disney', 'YouTube', 'Starbucks', 'Burger King', 'H&M',
      'Movistar', 'Mercadona', 'El Corte Inglés', 'Fanta', 'Danone',
    ],
  },
  {
    id: 'lugares',
    name: 'Lugares',
    emoji: '🗺️',
    words: [
      'París', 'Playa', 'Montaña', 'Desierto', 'Aeropuerto',
      'Hospital', 'Supermercado', 'Museo', 'Biblioteca', 'Gimnasio',
      'Estadio', 'Cárcel', 'Selva', 'Cine', 'Restaurante',
      'Colegio', 'Iglesia', 'Castillo', 'Faro', 'Volcán',
      'Nueva York', 'Tokio', 'Roma', 'Egipto', 'Isla',
      'Bosque', 'Cueva', 'Puerto', 'Estación de tren', 'Zoológico',
      'Discoteca', 'Peluquería', 'Farmacia', 'Parque', 'Cementerio',
    ],
  },
  {
    id: 'personajes',
    name: 'Personajes',
    emoji: '🦸',
    words: [
      'Superman', 'Mickey Mouse', 'Bob Esponja', 'Pikachu', 'Mario',
      'Homer Simpson', 'Darth Vader', 'Sherlock Holmes', 'Gandalf', 'Hulk',
      'Cenicienta', 'Peter Pan', 'Winnie the Pooh', 'James Bond', 'Yoda',
      'Goku', 'Doraemon', 'Shrek', 'El Joker', 'Woody',
      'Elsa', 'Iron Man', 'Buzz Lightyear', 'Popeye', 'Papá Noel',
      'Drácula', 'Frankenstein', 'Tarzán', 'Aladdín', 'Blancanieves',
      'Sonic', 'Kratos', 'Lara Croft', 'Bugs Bunny', 'Garfield',
    ],
  },
  {
    id: 'trabajos',
    name: 'Trabajos',
    emoji: '💼',
    words: [
      'Médico', 'Profesor', 'Bombero', 'Policía', 'Cocinero',
      'Fontanero', 'Abogado', 'Peluquero', 'Piloto', 'Enfermero',
      'Panadero', 'Carpintero', 'Electricista', 'Dentista', 'Veterinario',
      'Camarero', 'Astronauta', 'Futbolista', 'Cantante', 'Actor',
      'Pintor', 'Jardinero', 'Mecánico', 'Periodista', 'Arquitecto',
      'Científico', 'Granjero', 'Pescador', 'Cartero', 'Juez',
      'Payaso', 'Modelo', 'Fotógrafo', 'Taxista', 'Recepcionista',
    ],
  },
];

export const defaultCategoryId = 'dia_a_dia';
