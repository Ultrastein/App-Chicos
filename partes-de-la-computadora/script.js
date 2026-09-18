// Módulo independiente: "Partes de la Computadora"
// No depende de script.js/style.css/Firebase del resto de la app.

const PARTS = [
    // ----- POR FUERA -----
    {
        id: 'monitor', cat: 'exterior', emoji: '🖥️', name: 'Monitor',
        wiki: ['Monitor de computadora', 'Pantalla de computadora'],
        desc: 'Es la pantalla donde ves todo lo que hace la compu: juegos, videos y dibujos.',
        fun: '💡 Dato curioso: los primeros monitores eran gigantes y pesados, ¡como una tele vieja!'
    },
    {
        id: 'teclado', cat: 'exterior', emoji: '⌨️', name: 'Teclado',
        wiki: ['Teclado (informática)'],
        desc: 'Tiene todas las letras, números y botones para escribir y darle órdenes a la compu.',
        fun: '💡 Dato curioso: el orden de las letras se llama "QWERTY", por las primeras 6 letras de arriba.'
    },
    {
        id: 'mouse', cat: 'exterior', emoji: '🖱️', name: 'Mouse (Ratón)',
        wiki: ['Ratón (informática)'],
        desc: 'Lo movés con la mano y así movés la flechita en la pantalla para señalar y hacer clic.',
        fun: '💡 Dato curioso: se llama "mouse" (ratón) porque el cable parecía una colita.'
    },
    {
        id: 'gabinete', cat: 'exterior', emoji: '🗄️', name: 'Gabinete (Torre)',
        wiki: ['Caja (informática)', 'Gabinete de computadora'],
        desc: 'Es la caja que guarda adentro todas las piezas importantes, como el cerebro de la compu.',
        fun: '💡 Dato curioso: adentro del gabinete puede hacer bastante calor, por eso tiene ventiladores.'
    },
    {
        id: 'parlantes', cat: 'exterior', emoji: '🔊', name: 'Parlantes',
        wiki: ['Altavoz'],
        desc: 'Son los que hacen que escuches la música, los juegos y los videos.',
        fun: '💡 Dato curioso: convierten la electricidad en sonido moviendo el aire muy rápido.'
    },
    {
        id: 'impresora', cat: 'exterior', emoji: '🖨️', name: 'Impresora',
        wiki: ['Impresora'],
        desc: 'Convierte lo que ves en la pantalla en un dibujo o texto de papel.',
        fun: '💡 Dato curioso: hay impresoras que hasta pueden imprimir en 3 dimensiones.'
    },

    // ----- POR DENTRO -----
    {
        id: 'placamadre', cat: 'interior', emoji: '🧩', name: 'Placa Madre',
        wiki: ['Placa base'],
        desc: 'Es como el esqueleto de la compu: conecta todas las piezas de adentro entre sí.',
        fun: '💡 Dato curioso: también se la llama "motherboard", que en inglés significa "placa mamá".'
    },
    {
        id: 'procesador', cat: 'interior', emoji: '🧠', name: 'Procesador (CPU)',
        wiki: ['Microprocesador', 'Unidad central de procesamiento'],
        desc: 'Es el cerebro de la compu: piensa y hace todos los cálculos súper rápido.',
        fun: '💡 Dato curioso: puede hacer miles de millones de cálculos en un solo segundo.'
    },
    {
        id: 'ram', cat: 'interior', emoji: '⚡', name: 'Memoria RAM',
        wiki: ['Memoria de acceso aleatorio'],
        desc: 'Es la memoria rápida donde la compu guarda lo que está usando en este momento.',
        fun: '💡 Dato curioso: si apagás la compu, la RAM se borra solita, ¡por eso hay que guardar los archivos!'
    },
    {
        id: 'disco', cat: 'interior', emoji: '💾', name: 'Disco Duro / SSD',
        wiki: ['Unidad de disco duro', 'Unidad de estado sólido'],
        desc: 'Es donde se guardan para siempre tus fotos, juegos y archivos, aunque apagues la compu.',
        fun: '💡 Dato curioso: los discos nuevos (SSD) no tienen partes que giran, ¡son mucho más rápidos!'
    },
    {
        id: 'fuente', cat: 'interior', emoji: '🔌', name: 'Fuente de Poder',
        wiki: ['Fuente de alimentación'],
        desc: 'Le da energía eléctrica a todas las piezas para que puedan funcionar.',
        fun: '💡 Dato curioso: transforma la electricidad de tu casa en la energía justa que necesita la compu.'
    },
    {
        id: 'gpu', cat: 'interior', emoji: '🎮', name: 'Placa de Video',
        wiki: ['Unidad de procesamiento gráfico'],
        desc: 'Se encarga de que las imágenes y los juegos se vean lindos, rápidos y en movimiento.',
        fun: '💡 Dato curioso: es la pieza clave para que los videojuegos se vean con gráficos increíbles.'
    },
    {
        id: 'cooler', cat: 'interior', emoji: '❄️', name: 'Cooler (Ventilador)',
        wiki: ['Ventilador (informática)', 'Disipador de calor'],
        desc: 'Enfría las piezas para que no se calienten demasiado mientras trabajan.',
        fun: '💡 Dato curioso: si la compu se calienta mucho, ¡puede apagarse sola para protegerse!'
    },
];

let currentCategory = 'exterior';
const imageCache = {};

function setCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.pc-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cat === cat);
    });
    renderGrid();
}

function renderGrid() {
    const grid = document.getElementById('partsGrid');
    grid.innerHTML = '';
    PARTS.filter(p => p.cat === currentCategory).forEach(part => {
        const card = document.createElement('div');
        card.className = 'pc-card';
        card.onclick = () => openModal(part.id);
        card.innerHTML = `
            <div class="pc-media" id="media-${part.id}"><span>${part.emoji}</span></div>
            <h3>${part.name}</h3>
            <p>${part.desc}</p>
        `;
        grid.appendChild(card);
        loadPartImage(part, `media-${part.id}`);
    });
}

// Busca una foto real en Wikipedia (API pública con CORS habilitado).
// Si no encuentra nada o falla la conexión, se queda con el emoji.
async function fetchWikiThumbnail(titles) {
    for (const title of titles) {
        try {
            const url = `https://es.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&pithumbsize=500&format=json&origin=*`;
            const res = await fetch(url);
            if (!res.ok) continue;
            const data = await res.json();
            const pages = data.query && data.query.pages;
            if (!pages) continue;
            const page = Object.values(pages)[0];
            if (page && page.thumbnail && page.thumbnail.source) {
                return page.thumbnail.source;
            }
        } catch (e) {
            // sin conexión o bloqueado: seguimos con el próximo título / con el emoji
        }
    }
    return null;
}

async function loadPartImage(part, mediaElId) {
    if (imageCache[part.id] === undefined) {
        imageCache[part.id] = await fetchWikiThumbnail(part.wiki);
    }
    const src = imageCache[part.id];
    if (!src) return;
    const el = document.getElementById(mediaElId);
    if (!el) return; // el usuario ya cambió de pestaña
    const img = new Image();
    img.onload = () => {
        el.innerHTML = '';
        el.appendChild(img);
    };
    img.onerror = () => { /* se queda el emoji */ };
    img.src = src;
    img.alt = part.name;
}

function openModal(partId) {
    const part = PARTS.find(p => p.id === partId);
    if (!part) return;
    document.getElementById('pcModalTitle').textContent = `${part.emoji} ${part.name}`;
    document.getElementById('pcModalDesc').textContent = part.desc;
    document.getElementById('pcModalFun').textContent = part.fun;

    const media = document.getElementById('pcModalMedia');
    const cached = imageCache[part.id];
    if (cached) {
        media.innerHTML = `<img src="${cached}" alt="${part.name}">`;
    } else {
        media.innerHTML = `<span>${part.emoji}</span>`;
    }

    document.getElementById('pcModalOverlay').classList.add('open');
}

function closeModal() {
    document.getElementById('pcModalOverlay').classList.remove('open');
}

function closeModalOutside(ev) {
    if (ev.target.id === 'pcModalOverlay') closeModal();
}

// ---------------- QUIZ ----------------

let quizScore = 0;
let quizRound = 0;
const QUIZ_ROUNDS = 10;
let quizCurrentPart = null;
let quizLocked = false;

function startQuiz() {
    quizScore = 0;
    quizRound = 0;
    document.getElementById('quizTotal').textContent = QUIZ_ROUNDS;
    document.getElementById('pcQuizOverlay').classList.add('open');
    nextQuizQuestion();
}

function closeQuiz() {
    document.getElementById('pcQuizOverlay').classList.remove('open');
}

function nextQuizQuestion() {
    if (quizRound >= QUIZ_ROUNDS) {
        showFinalScore();
        return;
    }
    quizRound++;
    quizLocked = false;
    document.getElementById('quizFeedback').textContent = '';
    document.getElementById('quizScore').textContent = quizScore;

    const pool = [...PARTS];
    quizCurrentPart = pool[Math.floor(Math.random() * pool.length)];

    const media = document.getElementById('quizMedia');
    const cached = imageCache[quizCurrentPart.id];
    media.innerHTML = cached
        ? `<img src="${cached}" alt="${quizCurrentPart.name}">`
        : `<span>${quizCurrentPart.emoji}</span>`;

    document.getElementById('quizQuestion').textContent = '¿Qué pieza es esta?';

    const wrongOptions = pool
        .filter(p => p.id !== quizCurrentPart.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    const options = [...wrongOptions, quizCurrentPart].sort(() => Math.random() - 0.5);

    const optionsEl = document.getElementById('quizOptions');
    optionsEl.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'pc-quiz-opt';
        btn.textContent = opt.name;
        btn.onclick = () => answerQuiz(opt.id, btn);
        optionsEl.appendChild(btn);
    });
}

function answerQuiz(chosenId, btnEl) {
    if (quizLocked) return;
    quizLocked = true;
    const correct = chosenId === quizCurrentPart.id;
    const feedback = document.getElementById('quizFeedback');

    document.querySelectorAll('.pc-quiz-opt').forEach(btn => {
        if (btn.textContent === quizCurrentPart.name) btn.classList.add('correct');
    });

    if (correct) {
        quizScore++;
        btnEl.classList.add('correct');
        feedback.textContent = '¡Muy bien! 🎉';
        feedback.style.color = '#43a047';
    } else {
        btnEl.classList.add('wrong');
        feedback.textContent = `Era ${quizCurrentPart.name} ${quizCurrentPart.emoji}`;
        feedback.style.color = '#e53935';
    }

    document.getElementById('quizScore').textContent = quizScore;
    setTimeout(nextQuizQuestion, 1300);
}

function showFinalScore() {
    let bestScore = 0;
    try {
        bestScore = parseInt(localStorage.getItem('pcParts_bestScore') || '0', 10);
    } catch (e) { /* localStorage no disponible */ }
    const isNewBest = quizScore > bestScore;
    if (isNewBest) {
        try { localStorage.setItem('pcParts_bestScore', String(quizScore)); } catch (e) { /* ignorar */ }
        bestScore = quizScore;
    }

    document.getElementById('quizMedia').innerHTML = `<span>🏆</span>`;
    document.getElementById('quizQuestion').textContent = `¡Terminaste! Puntaje: ${quizScore} / ${QUIZ_ROUNDS}`;
    document.getElementById('quizOptions').innerHTML = `
        <button class="pc-quiz-opt" onclick="startQuiz()" style="grid-column: 1 / -1;">🔁 Jugar de nuevo</button>
        <button class="pc-quiz-opt" onclick="closeQuiz()" style="grid-column: 1 / -1;">✅ Salir</button>
    `;
    document.getElementById('quizFeedback').textContent = isNewBest
        ? `🌟 ¡Nuevo mejor puntaje!`
        : `Mejor puntaje: ${bestScore} / ${QUIZ_ROUNDS}`;
    document.getElementById('quizFeedback').style.color = '#8d6e00';
}

// ---------------- INIT ----------------

document.addEventListener('DOMContentLoaded', () => {
    renderGrid();
});
