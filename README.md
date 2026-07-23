# 🕵️ El Impostor

Juego de fiesta del impostor para jugar **en local con amigos, sin conexión a internet**. Se pasa un solo móvil de mano en mano.

Hecho con **Expo + React Native**. Interfaz y palabras en español.

## Cómo jugar

1. Configura la partida:
   - **Jugadores** (3–12)
   - **Impostores** (1 hasta la mitad del grupo)
   - **Pista para el impostor** (si está activada, el impostor ve la *categoría* pero no la palabra)
   - **Categoría** de palabras
2. Pasa el móvil a cada jugador. Cada uno ve en secreto si tiene la palabra o si es el impostor.
3. Por turnos, cada jugador da una pista sobre la palabra **sin decirla**. El impostor improvisa.
4. Debatid (hay un temporizador opcional de 2 min), votad al sospechoso y pulsad **Revelar**.

## Categorías incluidas

Día a día (por defecto), Cine y televisión, Fútbol, Gente famosa, Marcas, Lugares, Personajes y Trabajos.

## Cómo ejecutarla

Necesitas [Node.js](https://nodejs.org) instalado (ya lo tienes).

```bash
npm install
npm start
```

Se abrirá Expo con un **código QR**:

- **En tu móvil**: instala la app gratuita **Expo Go** (Play Store / App Store) y escanea el QR. Una vez cargada funciona sin internet.
- **En el navegador** (para probar rápido): pulsa `w` en la terminal.

## Generar un APK instalable (Android)

Para tener la app como un `.apk` instalable sin Expo Go, usa EAS Build (gratis):

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

Al terminar te da un enlace para descargar el `.apk`.

## Estructura del proyecto

```
App.js                      Máquina de estados entre pantallas
src/
  theme.js                  Colores y tamaños
  logic.js                  Reparto de roles y elección de palabra
  data/categories.js        Todas las categorías y palabras
  components/UI.js          Botón, selector numérico, tarjeta
  screens/
    SetupScreen.js          Configuración
    RevealScreen.js         Revelación (pasar el móvil)
    GameScreen.js           Debate + temporizador
    ResultScreen.js         Resultado final
```

### Añadir o cambiar palabras

Edita `src/data/categories.js`. Cada categoría es un objeto con `id`, `name`, `emoji` y su lista `words`. Puedes añadir categorías nuevas al array.


## 📸 Vista previa

<p align="center">
  <img src="https://github.com/user-attachments/assets/42521d6c-3be3-4eb3-8191-e3f557117d3e" width="22%" />
  <img src="https://github.com/user-attachments/assets/820549eb-0b61-4538-8421-7796a1f31a4a" width="22%" />
  <img src="https://github.com/user-attachments/assets/f7a0d58d-be35-4cef-affa-80e14a7f6cbb" width="22%" />
  <img src="https://github.com/user-attachments/assets/20d756b9-de83-45e4-9f97-29d9e0c2f566" width="22%" />
  <img src="https://github.com/user-attachments/assets/aa1e66a5-554b-4346-a0b0-028c1af2bdcb" width="22%" />
  <img width="22%" src="https://github.com/user-attachments/assets/3d5e4e6d-09a0-4d42-8a81-2b07b5ad874d" />

</p>


## 👾 Sobre el desarrollador

Desarrollado por Ivan. 
