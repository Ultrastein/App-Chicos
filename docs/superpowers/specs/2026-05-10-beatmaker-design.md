# BeatMaker — Design Spec
**Date:** 2026-05-10  
**Project:** App-Chicos (educational web app for kids)

---

## Overview

Add an Incredibox-style music creation game ("BeatMaker") to the existing educational app. Players drag characters onto a stage to activate musical loops, building a layered song. Completing all 5 slots rewards 200 coins.

---

## User Flow

1. Dashboard → click **🎵 BeatMaker** button (new entry in subject grid)
2. Submenú → choose one of 4 themes
3. Game screen → drag characters from bench (bottom) onto stage slots (top)
4. Each dropped character plays its looping sound via Web Audio API
5. All 5 slots filled → celebration animation + 200 coins via `addCoins(200)`
6. Click a character on the stage → removes it and stops its loop
7. "← Volver" → returns to theme submenu; audio stops and `AudioContext` is closed

---

## Themes & Characters

Each theme has **5 stage slots** and **6–7 draggable characters** (more than slots to give variety).

### ⛏️ Minecraft Beats
| Character | Emoji | Sound Type |
|-----------|-------|------------|
| Steve | ⛏️ | Bass (low oscillator ~80 Hz) |
| Creeper | 💚 | Explosion hit (noise burst) |
| Villager | 🏠 | Melody (pentatonic, mid-range) |
| Cerdo | 🐷 | Beat (rhythmic clicks) |
| Zombie | 🧟 | Harmony (detuned oscillator) |
| Araña | 🕷️ | High synth (fast arpeggio) |

### 🐸 Animales que Cantan
| Character | Emoji | Sound Type |
|-----------|-------|------------|
| Rana | 🐸 | Bass croak (low oscillator) |
| Vaca | 🐄 | Melody "moo" (smooth wave) |
| Perro | 🐕 | Beat bark (noise + envelope) |
| Gato | 🐱 | Harmony meow (sine wave) |
| Pato | 🦆 | Percussion quack |
| Zorro | 🦊 | High synth |

### 🤖 Robots Musicales
| Character | Emoji | Sound Type |
|-----------|-------|------------|
| R-Kick | 🤖 | Kick drum (sine sweep) |
| R-Bass | 🦾 | Synth bass (square wave) |
| R-Arp | ⚙️ | Arpeggio (sawtooth) |
| R-Clap | 🔧 | Clap (filtered noise) |
| R-Beep | 💡 | Melody beeps |
| R-Noise | 📡 | Noise hit |

### 📚 Banda Escolar
| Character | Emoji | Sound Type |
|-----------|-------|------------|
| Tambor | 🥁 | Kick/snare pattern |
| Bajo | 🎸 | Bass guitar (sawtooth) |
| Piano | 🎹 | Chord stabs |
| Trompeta | 🎺 | Melody (bright oscillator) |
| Flauta | 🎵 | High melody (sine) |
| Maracas | 🪇 | Shaker percussion |

---

## Architecture

### Files changed
- `index.html` — add BeatMaker button in `#view-dashboard`, add BeatMaker view HTML
- `script.js` — add `BEATMAKER_THEMES`, `BeatMakerEngine` class, and view functions
- `style.css` — add BeatMaker-specific styles (stage, slots, bench, visualizer)

### No new files created.

### Data structure
```js
const BEATMAKER_THEMES = {
  minecraft: {
    name: "Minecraft Beats",
    emoji: "⛏️",
    color: "#5d4037",
    characters: [
      { id: "steve", name: "Steve", emoji: "⛏️", soundType: "bass", freq: 80 },
      // ...
    ]
  },
  // animales, robots, escuela...
};
```

### BeatMakerEngine (class)
- `constructor()` — creates `AudioContext`, sets BPM = 120, starts scheduler loop
- `play(character)` — starts a looping oscillator/noise node for the given character's soundType
- `stop(characterId)` — stops and disconnects that character's node
- `stopAll()` — stops all nodes, closes `AudioContext`
- Scheduler uses `setInterval` + `AudioContext.currentTime` lookahead for tight timing

### Sound types (Web Audio API)
| Type | Implementation |
|------|----------------|
| bass | `OscillatorNode` sine, low freq, long note every 2 beats |
| beat | `AudioBufferSourceNode` white noise + `GainNode` envelope, every beat |
| melody | `OscillatorNode` triangle, plays pentatonic scale pattern every 4 beats |
| harmony | `OscillatorNode` sine, slightly detuned from melody, sustained |
| high | `OscillatorNode` sawtooth, high freq, fast arpeggio pattern |
| chord | Multiple `OscillatorNode`s stacked (root + major third + fifth) |

### View functions
- `openBeatMaker()` — shows theme submenu inside `#view-map`
- `startBeatTheme(themeKey)` — renders game screen, initializes `BeatMakerEngine`
- `initBeatDragDrop()` — attaches drag events to characters and drop events to slots
- `dropCharacterOnSlot(charId, slotIndex)` — calls `engine.play(char)`, renders char in slot
- `removeCharacterFromSlot(slotIndex)` — calls `engine.stop(charId)`, clears slot
- `checkBeatCompletion()` — if all 5 slots filled: confetti, `addCoins(200)`, `showNotification()`
- `closeBeatMaker()` — calls `engine.stopAll()`, shows theme submenu or dashboard

---

## UI Layout (Vertical)

```
┌─────────────────────────────────────┐
│  🎵 [Theme Name]   [← Volver] [🔇]  │
├─────────────────────────────────────┤
│  ESCENARIO — completá los 5 slots   │
│  [slot] [slot] [slot] [slot] [slot] │
├─────────────────────────────────────┤
│  ▓▓▓ ▓▓▓▓▓ ▓▓ ▓▓▓▓ ▓▓ ♪ PLAYING   │  ← visualizer (animated bars)
├─────────────────────────────────────┤
│  🎭 PERSONAJES — arrastrá al escenario │
│  [char] [char] [char] [char] [char] │
│  [char] [char]                      │
└─────────────────────────────────────┘
```

- Slots show dashed border when empty, character emoji + name when filled
- Visualizer: 8–12 bars that animate height based on `AudioContext.currentTime` while audio plays
- Characters on bench: colored cards with emoji + name + sound type label
- Dragged character gets CSS class `dragging` (opacity 0.5, scale 0.9)
- Slot highlights with green border on `dragover`

---

## Coin Reward

- Trigger: all 5 slots filled simultaneously
- Amount: 200 coins (`addCoins(200)`)
- Notification: `showNotification("🎵 ¡Ritmo completo! +200 🪙")`
- Only fires once per "session" (flag `beatCompleted = true`, reset when changing theme)
- Does NOT block continued playing — user can keep swapping characters after winning

---

## Integration Points

| Existing function | How BeatMaker uses it |
|-------------------|-----------------------|
| `addCoins(n)` | Called with 200 on completion |
| `showNotification(msg)` | Shows win message |
| `showDashboard()` | "← Volver" from theme submenu |
| `#view-map` | Reused to render BeatMaker views |
| `.mc-btn` CSS classes | Used for buttons in BeatMaker UI |
| `--font-ui`, color variables | Inherited from existing CSS |

---

## Out of Scope

- Saving/sharing created songs
- Recording or exporting audio
- Multiplayer
- Mobile touch drag-drop (desktop only for now)
- Per-level progression (BeatMaker is free-play, no levels)
