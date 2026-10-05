# 🕵️ The Impostor

A party game of deception designed to be played **locally with friends, completely offline**. One phone is passed around from player to player.

Built with **Expo + React Native**. Interface and word lists are in Spanish.

## How to Play

1. Configure the match:
   - **Players** (3–12)
   - **Impostors** (1 up to half of the group)
   - **Hint for the impostor** (if enabled, the impostor sees the *category* but not the secret word)
   - **Word category**
2. Pass the phone to each player. Each person secretly discovers whether they know the word or are the impostor.
3. Taking turns, each player gives a clue about the word **without saying it**. The impostor must improvise.
4. Discuss (there is an optional 2-minute timer), vote for the suspect, and press **Reveal**.

## Included Categories

Everyday Life (default), Movies & TV, Football, Famous People, Brands, Places, Characters, and Jobs.

## Running the App

You need [Node.js](https://nodejs.org) installed.

```bash
npm install
npm start
```

Expo will open and display a **QR code**:

- **On your phone:** install the free **Expo Go** app (Google Play / App Store) and scan the QR code. Once loaded, the game works offline.
- **In the browser** (for quick testing): press `w` in the terminal.

## Building an Installable APK (Android)

To install the game as a standalone `.apk` without Expo Go, use EAS Build (free):

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

When the build finishes, you will receive a download link for the generated `.apk`.

## Project Structure

```text
App.js                      State machine between screens

src/
  theme.js                  Colors and sizing
  logic.js                  Role assignment and word selection
  data/categories.js        All categories and word lists
  components/UI.js          Button, number selector, card

  screens/
    SetupScreen.js          Match configuration
    RevealScreen.js         Secret role reveal (pass the phone)
    GameScreen.js           Discussion + timer
    ResultScreen.js         Final result
```

### Adding or Editing Words

Edit `src/data/categories.js`.

Each category is an object containing:

- `id`
- `name`
- `emoji`
- `words`

You can add as many new categories and words as you like.

---

## 📸 Screenshots

```html
<p align="center">
  <img src="https://github.com/user-attachments/assets/42521d6c-3be3-4eb3-8191-e3f557117d3e" width="22%" />
  <img src="https://github.com/user-attachments/assets/820549eb-0b61-4538-8421-7796a1f31a4a" width="22%" />
  <img src="https://github.com/user-attachments/assets/f7a0d58d-be35-4cef-affa-80e14a7f6cbb" width="22%" />
  <img src="https://github.com/user-attachments/assets/20d756b9-de83-45e4-9f97-29d9e0c2f566" width="22%" />
  <img src="https://github.com/user-attachments/assets/aa1e66a5-554b-4346-a0b0-028c1af2bdcb" width="22%" />
  <img src="https://github.com/user-attachments/assets/3d5e4e6d-09a0-4d42-8a81-2b07b5ad874d" width="22%" />
</p>
```

---

## 👾 About the Developer

Developed by Ivan.
