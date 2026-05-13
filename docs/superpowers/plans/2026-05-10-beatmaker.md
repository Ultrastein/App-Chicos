# BeatMaker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an Incredibox-style drag-and-drop music game with 4 themes (Minecraft, Animales, Robots, Banda Escolar) and Web Audio API sound loops to the existing educational app.

**Architecture:** Three existing files are modified (no new files). `BEATMAKER_THEMES` defines the 4 themes and character data. `BeatMakerEngine` manages Web Audio API oscillator loops. View functions integrate with the existing `setView()` / `showToast()` / `player.coins` system.

**Tech Stack:** Vanilla JS, Web Audio API, HTML5 drag-and-drop, CSS animations. No libraries or build tools.

---

## File Map

| File | Changes |
|------|---------|
| `index.html` | Add BeatMaker button in `#view-dashboard`, add `#view-beatmaker-menu` and `#view-beatmaker-game` divs |
| `script.js` | Add `BEATMAKER_THEMES`, `BeatMakerEngine` class, `openBeatMaker`, `startBeatTheme`, `closeBeatMaker`, `initBeatDragDrop`, `dropCharacterOnSlot`, `removeCharacterFromSlot`, `checkBeatCompletion`, `renderBeatVisualizer` |
| `style.css` | Add styles for `.bm-*` classes (stage, slots, bench, characters, visualizer) |

---

## Task 1: CSS — BeatMaker styles

**Files:**
- Modify: `style.css` (append at end)

- [ ] **Step 1: Append BeatMaker CSS to style.css**

Add this block at the very end of `style.css`:

```css
/* ==========================================
   BEATMAKER
   ========================================== */
#view-beatmaker-menu,
#view-beatmaker-game {
    display: none;
}

.bm-theme-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-top: 10px;
}

.bm-theme-btn {
    border: none;
    border-radius: 12px;
    padding: 25px 15px;
    font-family: var(--font-ui);
    font-size: 1rem;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.bm-theme-btn:hover {
    transform: scale(1.04);
    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
}

.bm-theme-btn .bm-theme-emoji {
    font-size: 2rem;
}

/* Game screen */
.bm-stage-area {
    background: #0d1f0d;
    border-radius: 10px;
    padding: 12px;
    margin-bottom: 10px;
}

.bm-stage-label {
    color: #81c784;
    font-size: 0.75rem;
    text-align: center;
    margin-bottom: 8px;
    font-family: var(--font-ui);
    font-weight: bold;
    letter-spacing: 1px;
}

.bm-slots {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
}

.bm-slot {
    width: 60px;
    height: 70px;
    background: #1a3a1a;
    border: 2px dashed #4a7a4a;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, transform 0.15s;
    position: relative;
}

.bm-slot.dragover {
    border-color: #4caf50;
    background: #2e5c2e;
    transform: scale(1.08);
}

.bm-slot.filled {
    border-style: solid;
    border-color: #4caf50;
    background: #1b4a1b;
    cursor: pointer;
}

.bm-slot.filled:hover {
    border-color: #ef5350;
    background: #3a1a1a;
}

.bm-slot .bm-slot-name {
    font-size: 0.45rem;
    color: #a5d6a7;
    margin-top: 2px;
    font-family: var(--font-ui);
}

.bm-slot.filled .bm-slot-name {
    color: #c8e6c9;
}

/* Visualizer */
.bm-visualizer {
    background: #060f06;
    border-radius: 8px;
    padding: 8px 12px;
    display: flex;
    gap: 3px;
    align-items: flex-end;
    justify-content: center;
    height: 50px;
    margin-bottom: 10px;
    overflow: hidden;
}

.bm-bar {
    width: 10px;
    background: #2e7d32;
    border-radius: 2px 2px 0 0;
    transition: height 0.12s ease;
    min-height: 4px;
}

.bm-bar.active {
    background: #4caf50;
}

/* Bench */
.bm-bench-area {
    border-radius: 10px;
    padding: 12px;
    margin-bottom: 10px;
}

.bm-bench-label {
    font-size: 0.75rem;
    text-align: center;
    margin-bottom: 8px;
    font-family: var(--font-ui);
    font-weight: bold;
    letter-spacing: 1px;
    color: #90caf9;
}

.bm-bench {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
}

.bm-char {
    width: 62px;
    height: 72px;
    border-radius: 10px;
    border: 2px solid rgba(255,255,255,0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    cursor: grab;
    transition: transform 0.15s, opacity 0.15s;
    user-select: none;
}

.bm-char:hover {
    transform: scale(1.1);
    border-color: rgba(255,255,255,0.6);
}

.bm-char.dragging {
    opacity: 0.45;
    transform: scale(0.9);
    cursor: grabbing;
}

.bm-char .bm-char-name {
    font-size: 0.45rem;
    color: rgba(255,255,255,0.85);
    margin-top: 3px;
    font-family: var(--font-ui);
    text-align: center;
    line-height: 1.1;
}

/* Bottom bar */
.bm-bottom-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
}

.bm-reward-hint {
    color: #ffd54f;
    font-size: 0.75rem;
    font-family: var(--font-ui);
    text-align: center;
}

/* Bounce animation for completed slot */
@keyframes bmBounce {
    0%   { transform: scale(1); }
    40%  { transform: scale(1.25); }
    70%  { transform: scale(0.92); }
    100% { transform: scale(1); }
}

.bm-slot.bounce {
    animation: bmBounce 0.4s ease;
}
```

- [ ] **Step 2: Verify visually**

Open `index.html` in a browser. No errors in console. The new CSS classes exist but nothing new is visible yet (the views are `display:none`).

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: add BeatMaker CSS styles"
```

---

## Task 2: HTML — New views and dashboard button

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add BeatMaker button to `#view-dashboard` subject grid**

In `index.html`, find the last `<button>` in the `.subject-grid` inside `#view-dashboard`. It currently ends with the "Claves" button:

```html
                    <button class="mc-btn cyan big-btn" onclick="openSubject('claves')">
                        <div style="font-size:2rem; margin-bottom:10px;">🔐</div>
                        Claves<br><br><small>Herramienta</small>
                    </button>
```

Add this new button **immediately after** it, before the closing `</div>` of `.subject-grid`:

```html
                    <button class="mc-btn pink big-btn" onclick="openBeatMaker()" style="background:linear-gradient(135deg,#6a1b9a,#c2185b);">
                        <div style="font-size:2rem; margin-bottom:10px;">🎵</div>
                        BeatMaker<br><br><small>¡Hacer música!</small>
                    </button>
```

- [ ] **Step 2: Add `#view-beatmaker-menu` and `#view-beatmaker-game` divs**

In `index.html`, find the closing `</div>` of `#view-shop` (around line 136). Add both new views **immediately after** it, before `</main>`:

```html
            <div id="view-beatmaker-menu" style="display:none;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
                    <h3 style="margin:0;">🎵 BeatMaker — Elegí tu banda</h3>
                    <button class="mc-btn gray" style="width:auto;" onclick="showDashboard()">← Volver</button>
                </div>
                <div class="bm-theme-grid" id="bmThemeGrid"></div>
            </div>

            <div id="view-beatmaker-game" style="display:none;">
                <div class="bm-bottom-bar" style="margin-bottom:12px;">
                    <button class="mc-btn gray" style="width:auto; padding:8px 14px; font-size:0.8rem;" onclick="closeBeatTheme()">← Temas</button>
                    <h3 id="bmGameTitle" style="margin:0; font-size:1rem;"></h3>
                    <button class="mc-btn red" style="width:auto; padding:8px 14px; font-size:0.8rem;" onclick="stopBeatMaker()">🔇 Parar</button>
                </div>
                <div class="bm-stage-area">
                    <div class="bm-stage-label">🎵 ESCENARIO — completá los 5 slots</div>
                    <div class="bm-slots" id="bmSlots"></div>
                </div>
                <div class="bm-visualizer" id="bmVisualizer"></div>
                <div class="bm-bench-area" id="bmBenchArea">
                    <div class="bm-bench-label">🎭 PERSONAJES — arrastrá al escenario</div>
                    <div class="bm-bench" id="bmBench"></div>
                </div>
                <div class="bm-bottom-bar">
                    <span class="bm-reward-hint">🏆 Completá los 5 slots → <strong>200 🪙</strong></span>
                </div>
            </div>
```

- [ ] **Step 3: Verify**

Open `index.html` in browser. Dashboard shows a new pink/purple "🎵 BeatMaker" button. Clicking it does nothing yet (function not defined). No console errors from HTML.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add BeatMaker HTML views and dashboard button"
```

---

## Task 3: JS — BEATMAKER_THEMES data

**Files:**
- Modify: `script.js` (add near top, after the existing `GAME_CONTENT` block)

- [ ] **Step 1: Add BEATMAKER_THEMES constant**

Find the line `const GAME_CONTENT = {` in `script.js`. Add the following block **immediately before** it:

```js
// ==========================================
// BEATMAKER — THEMES & CHARACTERS
// ==========================================
const BEATMAKER_THEMES = {
    minecraft: {
        name: "Minecraft Beats",
        emoji: "⛏️",
        btnColor: "#5d4037",
        benchBg: "#1a0f0a",
        characters: [
            { id: "steve",    name: "Steve",   emoji: "⛏️", soundType: "bass",    freq: 80,     color: "#5d4037" },
            { id: "creeper",  name: "Creeper", emoji: "💚", soundType: "beat",    freq: null,   color: "#2e7d32" },
            { id: "villager", name: "Aldean",  emoji: "🏘️", soundType: "melody",  scale: [261.63, 293.66, 329.63, 392, 440], color: "#f57f17" },
            { id: "cerdo",    name: "Cerdo",   emoji: "🐷", soundType: "beat",    freq: null,   color: "#ec407a" },
            { id: "zombie",   name: "Zombie",  emoji: "🧟", soundType: "harmony", freq: 110,    color: "#558b2f" },
            { id: "araña",    name: "Araña",   emoji: "🕷️", soundType: "high",    freq: 220,    color: "#4a148c" }
        ]
    },
    animales: {
        name: "Animales",
        emoji: "🐸",
        btnColor: "#2e7d32",
        benchBg: "#0a1a0a",
        characters: [
            { id: "rana",   name: "Rana",  emoji: "🐸", soundType: "bass",    freq: 90,  color: "#2e7d32" },
            { id: "vaca",   name: "Vaca",  emoji: "🐄", soundType: "melody",  scale: [220, 246.94, 277.18, 329.63, 369.99], color: "#795548" },
            { id: "perro",  name: "Perro", emoji: "🐕", soundType: "beat",    freq: null, color: "#f57f17" },
            { id: "gato",   name: "Gato",  emoji: "🐱", soundType: "harmony", freq: 165, color: "#ff8f00" },
            { id: "pato",   name: "Pato",  emoji: "🦆", soundType: "beat",    freq: null, color: "#fdd835" },
            { id: "zorro",  name: "Zorro", emoji: "🦊", soundType: "high",    freq: 200, color: "#e64a19" }
        ]
    },
    robots: {
        name: "Robots",
        emoji: "🤖",
        btnColor: "#1565c0",
        benchBg: "#0a0a1a",
        characters: [
            { id: "rkick",  name: "R-Kick",  emoji: "🤖", soundType: "bass",    freq: 60,  color: "#1565c0" },
            { id: "rbass",  name: "R-Bass",  emoji: "🦾", soundType: "bass",    freq: 100, color: "#0288d1" },
            { id: "rarp",   name: "R-Arp",   emoji: "⚙️", soundType: "high",    freq: 440, color: "#00838f" },
            { id: "rclap",  name: "R-Clap",  emoji: "🔧", soundType: "beat",    freq: null, color: "#37474f" },
            { id: "rbeep",  name: "R-Beep",  emoji: "💡", soundType: "melody",  scale: [523.25, 587.33, 659.25, 783.99, 880], color: "#f9a825" },
            { id: "rnoise", name: "R-Noise", emoji: "📡", soundType: "beat",    freq: null, color: "#6a1b9a" }
        ]
    },
    escuela: {
        name: "Banda Escolar",
        emoji: "📚",
        btnColor: "#e65100",
        benchBg: "#1a0a00",
        characters: [
            { id: "tambor",   name: "Tambor",   emoji: "🥁", soundType: "beat",    freq: null,   color: "#b71c1c" },
            { id: "bajo",     name: "Bajo",     emoji: "🎸", soundType: "bass",    freq: 73.42,  color: "#1b5e20" },
            { id: "piano",    name: "Piano",    emoji: "🎹", soundType: "chord",   freq: 261.63, color: "#1a237e" },
            { id: "trompeta", name: "Trompeta", emoji: "🎺", soundType: "melody",  scale: [329.63, 369.99, 415.3, 493.88, 523.25], color: "#e65100" },
            { id: "flauta",   name: "Flauta",   emoji: "🎵", soundType: "high",    freq: 523.25, color: "#00695c" },
            { id: "maracas",  name: "Maracas",  emoji: "🪇", soundType: "beat",    freq: null,   color: "#6d4c41" }
        ]
    }
};
```

- [ ] **Step 2: Verify**

Open `index.html` in browser. Open DevTools console and type `Object.keys(BEATMAKER_THEMES)`. Expected output: `["minecraft", "animales", "robots", "escuela"]`. No errors.

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "feat: add BEATMAKER_THEMES data"
```

---

## Task 4: JS — BeatMakerEngine (Web Audio API)

**Files:**
- Modify: `script.js` (add after `BEATMAKER_THEMES`, before `GAME_CONTENT`)

- [ ] **Step 1: Add BeatMakerEngine class**

Add this immediately after the `BEATMAKER_THEMES` block:

```js
// ==========================================
// BEATMAKER — AUDIO ENGINE
// ==========================================
class BeatMakerEngine {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.bpm = 120;
        this.beatMs = (60 / this.bpm) * 1000; // 500ms per beat
        this.nodes = {};   // charId -> { timers: [] }
        this.master = this.ctx.createGain();
        this.master.gain.value = 0.45;
        this.master.connect(this.ctx.destination);
    }

    play(char) {
        if (this.nodes[char.id]) return;
        this.nodes[char.id] = { timers: [] };
        this._loop(char);
    }

    stop(charId) {
        if (!this.nodes[charId]) return;
        this.nodes[charId].timers.forEach(t => clearTimeout(t));
        delete this.nodes[charId];
    }

    stopAll() {
        Object.keys(this.nodes).forEach(id => this.stop(id));
        try { if (this.ctx.state !== 'closed') this.ctx.close(); } catch(e) {}
    }

    _loop(char) {
        const repeatBeats = { bass: 2, beat: 1, melody: 4, harmony: 4, high: 1, chord: 2 };
        const interval = this.beatMs * (repeatBeats[char.soundType] || 2);
        const fire = () => {
            if (!this.nodes[char.id]) return;
            this._playSound(char);
            const t = setTimeout(fire, interval);
            this.nodes[char.id].timers.push(t);
        };
        fire();
    }

    _playSound(char) {
        const t = this.ctx.currentTime;
        switch (char.soundType) {
            case 'bass':    this._bass(char.freq || 80, t);    break;
            case 'beat':    this._beat(t);                     break;
            case 'melody':  this._melody(char.scale, t);       break;
            case 'harmony': this._harmony(char.freq || 220, t); break;
            case 'high':    this._high(char.freq || 440, t);   break;
            case 'chord':   this._chord(char.freq || 261.63, t); break;
        }
    }

    _osc(type, freq, gainVal, duration, startTime) {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        g.gain.setValueAtTime(gainVal, startTime);
        g.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        osc.connect(g);
        g.connect(this.master);
        osc.start(startTime);
        osc.stop(startTime + duration);
    }

    _bass(freq, t) {
        this._osc('sine', freq, 0.9, 0.45, t);
    }

    _beat(t) {
        const size = this.ctx.sampleRate * 0.08;
        const buf = this.ctx.createBuffer(1, size, this.ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < size; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / size);
        const src = this.ctx.createBufferSource();
        src.buffer = buf;
        const filt = this.ctx.createBiquadFilter();
        filt.type = 'bandpass';
        filt.frequency.value = 800;
        filt.Q.value = 0.8;
        const g = this.ctx.createGain();
        g.gain.setValueAtTime(1.2, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
        src.connect(filt);
        filt.connect(g);
        g.connect(this.master);
        src.start(t);
        src.stop(t + 0.1);
    }

    _melody(scale, t) {
        const notes = scale || [261.63, 293.66, 329.63, 392, 440];
        const note = notes[Math.floor(Math.random() * notes.length)];
        this._osc('triangle', note, 0.5, 0.28, t);
    }

    _harmony(freq, t) {
        [1, 1.25, 1.5].forEach(mult => this._osc('sine', freq * mult, 0.18, 0.85, t));
    }

    _high(freq, t) {
        const note = freq * (1 + Math.floor(Math.random() * 3) * 0.5);
        this._osc('sawtooth', note, 0.25, 0.12, t);
    }

    _chord(root, t) {
        [1, 1.2599, 1.4983].forEach(mult => this._osc('square', root * mult, 0.14, 0.42, t));
    }
}

let beatEngine = null;
let beatSlots = [null, null, null, null, null]; // charId or null per slot
let beatCompleted = false;
let beatVisualizerInterval = null;
```

- [ ] **Step 2: Verify engine in console**

Open `index.html` in browser. In DevTools console:

```js
const eng = new BeatMakerEngine();
eng.play({ id: 'test', soundType: 'beat', freq: null });
// You should hear a snare/hi-hat sound repeating every 500ms
setTimeout(() => eng.stopAll(), 3000);
```

Expected: hear 6 beat sounds over 3 seconds, then silence. No console errors.

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "feat: add BeatMakerEngine Web Audio API class"
```

---

## Task 5: JS — View navigation

**Files:**
- Modify: `script.js` (add near the view functions section, after `showShop`)
- Modify: `script.js` — update the `setView` function

- [ ] **Step 1: Update `setView` to include the two new views**

Find this exact line in `script.js`:

```js
    ['view-dashboard', 'view-map', 'view-shop'].forEach(v => document.getElementById(v).style.display = 'none');
```

Replace it with:

```js
    ['view-dashboard', 'view-map', 'view-shop', 'view-beatmaker-menu', 'view-beatmaker-game'].forEach(v => document.getElementById(v).style.display = 'none');
```

- [ ] **Step 2: Add BeatMaker view functions**

Find the line `function showDashboard() { setView('view-dashboard'); }` in `script.js`.
Add the following block **immediately after** `function showShop() { ... }`:

```js
// ==========================================
// BEATMAKER — VIEW FUNCTIONS
// ==========================================
function openBeatMaker() {
    setView('view-beatmaker-menu');
    const grid = document.getElementById('bmThemeGrid');
    grid.innerHTML = '';
    Object.entries(BEATMAKER_THEMES).forEach(([key, theme]) => {
        const btn = document.createElement('button');
        btn.className = 'bm-theme-btn';
        btn.style.background = theme.btnColor;
        btn.innerHTML = `<span class="bm-theme-emoji">${theme.emoji}</span>${theme.name}`;
        btn.onclick = () => startBeatTheme(key);
        grid.appendChild(btn);
    });
}

function startBeatTheme(themeKey) {
    // Stop any previous engine
    if (beatEngine) { beatEngine.stopAll(); beatEngine = null; }
    if (beatVisualizerInterval) { clearInterval(beatVisualizerInterval); beatVisualizerInterval = null; }
    beatSlots = [null, null, null, null, null];
    beatCompleted = false;

    const theme = BEATMAKER_THEMES[themeKey];
    document.getElementById('bmGameTitle').textContent = `${theme.emoji} ${theme.name}`;
    document.getElementById('bmBenchArea').style.background = theme.benchBg;

    // Render slots
    const slotsEl = document.getElementById('bmSlots');
    slotsEl.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const slot = document.createElement('div');
        slot.className = 'bm-slot';
        slot.dataset.index = i;
        slot.innerHTML = `<span style="color:#4a7a4a;font-size:1.4rem;">+</span><span class="bm-slot-name">vacío</span>`;
        slot.ondragover = e => { e.preventDefault(); slot.classList.add('dragover'); };
        slot.ondragleave = () => slot.classList.remove('dragover');
        slot.ondrop = e => {
            e.preventDefault();
            slot.classList.remove('dragover');
            const charId = e.dataTransfer.getData('charId');
            if (charId) dropCharacterOnSlot(charId, i, themeKey);
        };
        slot.onclick = () => { if (beatSlots[i]) removeCharacterFromSlot(i); };
        slotsEl.appendChild(slot);
    }

    // Render bench
    const bench = document.getElementById('bmBench');
    bench.innerHTML = '';
    theme.characters.forEach(char => {
        const card = document.createElement('div');
        card.className = 'bm-char';
        card.id = `bmChar-${char.id}`;
        card.style.background = char.color;
        card.draggable = true;
        card.innerHTML = `${char.emoji}<span class="bm-char-name">${char.name}</span>`;
        card.ondragstart = e => {
            e.dataTransfer.setData('charId', char.id);
            card.classList.add('dragging');
        };
        card.ondragend = () => card.classList.remove('dragging');
        bench.appendChild(card);
    });

    // Init visualizer bars
    const viz = document.getElementById('bmVisualizer');
    viz.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const bar = document.createElement('div');
        bar.className = 'bm-bar';
        bar.style.height = '4px';
        viz.appendChild(bar);
    }

    // Create engine
    beatEngine = new BeatMakerEngine();

    setView('view-beatmaker-game');
}

function closeBeatTheme() {
    if (beatEngine) { beatEngine.stopAll(); beatEngine = null; }
    if (beatVisualizerInterval) { clearInterval(beatVisualizerInterval); beatVisualizerInterval = null; }
    beatSlots = [null, null, null, null, null];
    beatCompleted = false;
    openBeatMaker();
}

function stopBeatMaker() {
    if (beatEngine) { beatEngine.stopAll(); beatEngine = null; }
    if (beatVisualizerInterval) { clearInterval(beatVisualizerInterval); beatVisualizerInterval = null; }
    // Refresh slot visuals to show stopped state
    document.querySelectorAll('.bm-slot').forEach(s => s.style.opacity = '0.5');
}
```

- [ ] **Step 3: Verify navigation**

Open `index.html` in browser:
1. Click "🎵 BeatMaker" on dashboard → see the theme grid with 4 colored buttons
2. Click "⛏️ Minecraft Beats" → see game screen with 5 empty slots and 6 character cards
3. Click "← Temas" → go back to theme menu
4. Click "← Volver" → go back to dashboard

No console errors at any step.

- [ ] **Step 4: Commit**

```bash
git add script.js
git commit -m "feat: add BeatMaker view navigation functions"
```

---

## Task 6: JS — Drag & drop, drop handler, remove

**Files:**
- Modify: `script.js` (add after `stopBeatMaker`)

- [ ] **Step 1: Add `dropCharacterOnSlot` and `removeCharacterFromSlot`**

Add immediately after the `stopBeatMaker` function:

```js
function dropCharacterOnSlot(charId, slotIndex, themeKey) {
    const theme = BEATMAKER_THEMES[themeKey];
    const char = theme.characters.find(c => c.id === charId);
    if (!char) return;

    // If slot already has a character, remove it first
    if (beatSlots[slotIndex]) removeCharacterFromSlot(slotIndex);

    // Place character in slot
    beatSlots[slotIndex] = charId;

    const slot = document.querySelector(`.bm-slot[data-index="${slotIndex}"]`);
    slot.innerHTML = `${char.emoji}<span class="bm-slot-name">${char.name}</span>`;
    slot.classList.add('filled');
    slot.classList.remove('bounce');
    // Trigger bounce
    void slot.offsetWidth; // reflow to restart animation
    slot.classList.add('bounce');

    // Play sound
    if (beatEngine) beatEngine.play(char);

    // Start visualizer if not running
    if (!beatVisualizerInterval) startBeatVisualizer();

    checkBeatCompletion();
}

function removeCharacterFromSlot(slotIndex) {
    const charId = beatSlots[slotIndex];
    if (!charId) return;

    beatSlots[slotIndex] = null;

    if (beatEngine) beatEngine.stop(charId);

    const slot = document.querySelector(`.bm-slot[data-index="${slotIndex}"]`);
    slot.innerHTML = `<span style="color:#4a7a4a;font-size:1.4rem;">+</span><span class="bm-slot-name">vacío</span>`;
    slot.classList.remove('filled', 'bounce');

    // Stop visualizer if no characters active
    const anyActive = beatSlots.some(s => s !== null);
    if (!anyActive && beatVisualizerInterval) {
        clearInterval(beatVisualizerInterval);
        beatVisualizerInterval = null;
        document.querySelectorAll('.bm-bar').forEach(b => b.style.height = '4px');
    }
}

function startBeatVisualizer() {
    if (beatVisualizerInterval) clearInterval(beatVisualizerInterval);
    beatVisualizerInterval = setInterval(() => {
        const activeCount = beatSlots.filter(s => s !== null).length;
        document.querySelectorAll('.bm-bar').forEach(bar => {
            const h = activeCount > 0
                ? 6 + Math.random() * (10 + activeCount * 5)
                : 4;
            bar.style.height = h + 'px';
            bar.classList.toggle('active', activeCount > 0);
        });
    }, 120);
}
```

- [ ] **Step 2: Verify drag & drop**

Open `index.html`, go to BeatMaker → any theme:
1. Drag a character card to a slot → slot shows character emoji, bounce animation plays, sound loops
2. Drag a second character to another slot → second sound adds on top
3. Click a filled slot → character is removed, sound stops
4. Drag same character to a slot that already has one → old character is removed, new one placed

No console errors. Audio overlaps correctly.

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "feat: add BeatMaker drag-and-drop and slot management"
```

---

## Task 7: JS — Completion detection and coin reward

**Files:**
- Modify: `script.js` (add after `startBeatVisualizer`)

- [ ] **Step 1: Add `checkBeatCompletion`**

Add immediately after `startBeatVisualizer`:

```js
function checkBeatCompletion() {
    if (beatCompleted) return;
    const allFilled = beatSlots.every(s => s !== null);
    if (!allFilled) return;

    beatCompleted = true;

    // Award coins
    player.coins += 200;
    updateUI();
    saveData();
    showToast("🎵 ¡Ritmo completo! +200 🪙");

    // Flash all slots green briefly
    document.querySelectorAll('.bm-slot.filled').forEach(slot => {
        const orig = slot.style.borderColor;
        slot.style.borderColor = '#ffd54f';
        slot.style.boxShadow = '0 0 12px #ffd54f88';
        setTimeout(() => {
            slot.style.borderColor = orig;
            slot.style.boxShadow = '';
        }, 1200);
    });
}
```

- [ ] **Step 2: Verify reward**

Open `index.html`. Go to BeatMaker → Minecraft Beats. Fill all 5 slots:
1. Toast "🎵 ¡Ritmo completo! +200 🪙" appears
2. Coin counter in header increases by 200
3. Slots flash yellow briefly
4. Swapping characters after winning does NOT award coins again (flag is set)
5. Going back to theme menu and choosing a new theme → `beatCompleted` resets, can win again

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "feat: add BeatMaker completion detection and 200-coin reward"
```

---

## Task 8: Final wiring and smoke test

**Files:**
- Modify: `script.js` — ensure `showDashboard()` cleans up beat engine

- [ ] **Step 1: Patch `showDashboard` to stop audio on navigation away**

Find the existing line:

```js
function showDashboard() { setView('view-dashboard'); }
```

Replace it with:

```js
function showDashboard() {
    if (beatEngine) { beatEngine.stopAll(); beatEngine = null; }
    if (beatVisualizerInterval) { clearInterval(beatVisualizerInterval); beatVisualizerInterval = null; }
    beatSlots = [null, null, null, null, null];
    beatCompleted = false;
    setView('view-dashboard');
}
```

- [ ] **Step 2: Full smoke test**

Walk through each scenario and confirm no errors:

| Scenario | Expected |
|----------|----------|
| Dashboard → BeatMaker → theme → fill 1 slot | Sound plays, visualizer animates |
| Fill all 5 slots | Toast +200 🪙, coins increase, slots flash |
| Swap a character after winning | No extra coins |
| ← Temas → pick another theme | Old audio stops, new game starts clean |
| ← Volver (from menu) | Dashboard shows, no audio playing |
| Start BeatMaker, then click any other subject (Matemática etc.) | BeatMaker audio stops cleanly |
| Test all 4 themes | Each theme's characters produce distinct sounds |

- [ ] **Step 3: Final commit**

```bash
git add script.js
git commit -m "feat: wire up BeatMaker audio cleanup on navigation"
```

---

## Self-Review Checklist

- [x] **Dashboard button** → Task 2 Step 1
- [x] **4-theme submenu** → Task 5 Step 2 (`openBeatMaker`)
- [x] **Drag & drop to stage** → Task 6 Step 1 (`dropCharacterOnSlot`)
- [x] **Web Audio API loops** → Task 4 Step 1 (`BeatMakerEngine`)
- [x] **Remove by clicking slot** → Task 6 Step 1 (`removeCharacterFromSlot`)
- [x] **Visualizer animates** → Task 6 Step 1 (`startBeatVisualizer`)
- [x] **200 coins on completion** → Task 7 Step 1 (`checkBeatCompletion`)
- [x] **One reward per theme session** → `beatCompleted` flag, reset in `startBeatTheme`
- [x] **Audio stops on navigation** → Task 8 Step 1
- [x] **setView includes new views** → Task 5 Step 1
- [x] **All 4 themes playable** → Task 3 (data) + Task 5 (`startBeatTheme`)
- [x] **Type consistency** → `char.id`, `char.soundType`, `char.freq`, `char.scale`, `char.color` used consistently across Tasks 3, 4, 5, 6
