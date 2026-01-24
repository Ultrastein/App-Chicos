// 1. CONFIGURACIÓN FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyD_EIqwof3YhStlpSY4PhWJLqoDtjUqsVM",
    authDomain: "web-de-juego.firebaseapp.com",
    projectId: "web-de-juego",
    storageBucket: "web-de-juego.firebasestorage.app",
    messagingSenderId: "251119316368",
    appId: "1:251119316368:web:a755c6deb4c4b476ce9715",
    measurementId: "G-C0QXJC0CWV"
};

let dbOnline = null;
try {
    firebase.initializeApp(firebaseConfig);
    dbOnline = firebase.firestore();
} catch(e) { console.error("Error Firebase", e); }

// ==========================================
// 2. BASES DE DATOS (CONTENIDO)
// ==========================================

const DB_TECLADO = {
    inicial: { letras: "ASDFJKLÑQWERTYUIOPZXCVBNM".split(''), simbolos: [".", ",", ";", ":", "-", "_", "!", "?"], palabras: ["SOL","LUZ","PAN","MAR","OSO","MAMA"] },
    intermedia: { palabras: ["ESCUELA", "AMIGO", "JUGUETE", "PARQUE"], tildes: ["ÁRBOL", "CANTÓ", "AVIÓN"], oraciones: ["EL PERRO LADRA.", "HOLA MUNDO."] },
    dificil: { palabras: ["ELECTRODOMESTICO", "FERROCARRIL", "CONSTITUCION"], simbolos: ["@", "#", "$", "%"], codigo: ["width:100%", "#FFAA00", "user_name"] },
    experta: { oraciones: ["LA TECNOLOGIA AVANZA EXPONENCIALMENTE.", "LOS ALGORITMOS DE BUSQUEDA SON FUNDAMENTALES."] },
    prodigio: { textos: ["En un lugar de la Mancha, de cuyo nombre no quiero acordarme.", "Programar es el arte de decirle a otro humano lo que la PC debe hacer."] }
};

const DB_COMPUTING = {
    inicial: [{q:"¿Qué usas para hacer clic?", ans:"Mouse", opts:["Mouse", "Teclado", "Pantalla"]}, {q:"¿Dónde ves las imágenes?", ans:"Monitor", opts:["Monitor", "Impresora", "Mouse"]}, {q:"El cerebro de la PC", ans:"CPU", opts:["CPU", "Botón", "Cable"]}],
    intermedia: [{q:"¿Qué es Software?", ans:"Programas", opts:["Programas", "Teclado", "Cables"]}, {q:"Navegador de internet", ans:"Chrome", opts:["Chrome", "Word", "Excel"]}, {q:"Memoria Temporal", ans:"RAM", opts:["RAM", "HDD", "USB"]}],
    dificil: [{q:"8 bits son...", ans:"1 Byte", opts:["1 Byte", "1 Kilo", "1 Bit"]}, {q:"Binario usa...", ans:"0 y 1", opts:["0 y 1", "1 y 2", "A y B"]}, {q:"Red mundial", ans:"WAN", opts:["WAN", "LAN", "WIFI"]}],
    experta: [{q:"¿Qué es un Algoritmo?", ans:"Pasos lógicos", opts:["Pasos lógicos", "Virus", "Pieza"]}, {q:"Variable sirve para...", ans:"Guardar datos", opts:["Guardar datos", "Borrar", "Imprimir"]}],
    prodigio: [{q:"Binario: 101 es...", ans:"5", opts:["5", "3", "2", "10"]}, {q:"Hexadecimal: A es...", ans:"10", opts:["10", "11", "12"]}, {q:"1024 GB son...", ans:"1 TB", opts:["1 TB", "1 PB", "1 MB"]}]
};

const DB_GEOGRAFIA = {
    inicial: [{q:"¿Planeta?", ans:"Tierra", opts:["Tierra", "Marte", "Sol"]}, {q:"¿Continentes?", ans:"7", opts:["5", "6", "7"]}],
    intermedia: [{q:"Capital Argentina", ans:"Buenos Aires", opts:["Buenos Aires", "Córdoba", "Lima"]}, {q:"Capital España", ans:"Madrid", opts:["Madrid", "Paris", "Roma"]}],
    dificil: [{q:"Río más largo", ans:"Amazonas", opts:["Amazonas", "Nilo", "Misisipi"]}, {q:"Desierto mayor", ans:"Sahara", opts:["Sahara", "Atacama", "Gobi"]}],
    experta: [
        {img:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/640px-Empire_State_Building_from_the_Top_of_the_Rock.jpg", ans:"Nueva York", opts:["Nueva York", "Chicago", "Toronto"]},
        {img:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_from_Bridge.jpg/640px-London_Skyline_from_Bridge.jpg", ans:"Londres", opts:["Londres", "París", "Berlín"]}
    ],
    prodigio: [
        {img:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/640px-Machu_Picchu%2C_Peru.jpg", ans:"Machu Picchu", opts:["Machu Picchu", "Chichén Itzá", "Tikal"]},
        {img:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/640px-Taj_Mahal_%28Edited%29.jpeg", ans:"Taj Mahal", opts:["Taj Mahal", "Petra", "Coliseo"]}
    ]
};

const DB_INGLES = [
    {q:"Red", ans:"Rojo", opts:["Rojo","Azul","Verde"]}, {q:"Blue", ans:"Azul", opts:["Azul","Rojo","Amarillo"]}, 
    {q:"Dog", ans:"Perro", opts:["Perro","Gato","Pato"]}, {q:"Cat", ans:"Gato", opts:["Gato","Perro","Vaca"]}
];

const DB_ALGORITMOS = {
    inicial: [{ title: "Lavarse los dientes", blocks: [{text: "Poner pasta", type: "blk-action"}, {text: "Cepillar", type: "blk-action"}, {text: "Enjuagar", type: "blk-action"}] }, { title: "Plantar semilla", blocks: [{text: "Hacer pozo", type: "blk-action"}, {text: "Poner semilla", type: "blk-action"}, {text: "Tapar", type: "blk-action"}, {text: "Regar", type: "blk-action"}] }],
    intermedia: [{ title: "Robot Laberinto", blocks: [{text: "Inicio", type: "blk-event"}, {text: "Avanzar 2", type: "blk-action"}, {text: "Girar Derecha", type: "blk-action"}, {text: "Avanzar 1", type: "blk-action"}] }],
    dificil: [{ title: "Cuadrado", blocks: [{text: "Repetir 4", type: "blk-control"}, {text: "  Mover 100", type: "blk-action"}, {text: "  Girar 90", type: "blk-action"}, {text: "Fin Repetir", type: "blk-control"}] }],
    experta: [{ title: "Semáforo", blocks: [{text: "Mirar luz", type: "blk-action"}, {text: "SI es Verde", type: "blk-control"}, {text: "  Cruzar", type: "blk-action"}, {text: "SINO", type: "blk-control"}, {text: "  Esperar", type: "blk-action"}] }],
    prodigio: [{ title: "Lluvia", blocks: [{text: "SI llueve", type: "blk-control"}, {text: "  ¿Tengo paraguas?", type: "blk-logic"}, {text: "    SI: Usarlo", type: "blk-action"}, {text: "    NO: Correr", type: "blk-action"}, {text: "SINO", type: "blk-control"}, {text: "  Caminar", type: "blk-action"}] }]
};

const DB_PYTHON_TASKS = {
    inicial: [
        { mision: "Haz que diga: Hola", hint: 'print("Hola")', valid: ['print("Hola")'], output: "Hola" },
        { mision: "Imprime el número 100", hint: "print(100)", valid: ["print(100)"], output: "100" }
    ],
    intermedia: [
        { mision: "Variable x vale 10", hint: "x = 10", valid: ["x=10"], output: "x guardada: 10" },
        { mision: "Suma 20 + 30", hint: "print(20+30)", valid: ["print(20+30)"], output: "50" }
    ],
    dificil: [
        { mision: "Pide nombre", hint: "input()", valid: ["input()", "nombre=input()"], output: "> Esperando..." }
    ],
    experta: [
        { mision: "Si 5 > 2 imprime Si", hint: "if 5 > 2: print('Si')", valid: ['if 5 > 2: print("Si")'], output: "Si" }
    ],
    prodigio: [
        { mision: "Bucle de 3 veces", hint: "for i in range(3):", valid: ["for i in range(3):"], output: "0\n1\n2" }
    ]
};

const DEFAULT_SHOP = [
    {id:'t1', name:'Camisa Steve', type:'torso', color:'#29b6f6', price:0},
    {id:'l1', name:'Pantalón Azul', type:'legs', color:'#3f51b5', price:0},
    {id:'h1', name:'Piel Base', type:'head', color:'#ffcc80', price:0},
    {id:'t2', name:'Camisa Creeper', type:'torso', color:'https://i.imgur.com/u3l2j1S.png', price:100},
    {id:'h2', name:'Cara Zombie', type:'head', color:'#66bb6a', price:150},
    {id:'t3', name:'Oro Puro', type:'torso', color:'#fbc02d', price:200}
];

// 3. ESTADO DEL JUEGO
let player = { 
    name: 'Jugador',
    grade: 'inicial', 
    coins: 50, 
    progress: {
        inicial: { matematica: 1, compu: 1, teclado: 1, ingles: 1, Geografia: 1, claves: 1, Algoritmos: 1, python: 1 },
        intermedia: { matematica: 1, compu: 1, teclado: 1, ingles: 1, Geografia: 1, claves: 1, Algoritmos: 1, python: 1 },
        dificil: { matematica: 1, compu: 1, teclado: 1, ingles: 1, Geografia: 1, claves: 1, Algoritmos: 1, python: 1 },
        experta: { matematica: 1, compu: 1, teclado: 1, ingles: 1, Geografia: 1, claves: 1, Algoritmos: 1, python: 1 },
        prodigio: { matematica: 1, compu: 1, teclado: 1, ingles: 1, Geografia: 1, claves: 1, Algoritmos: 1, python: 1 }
    },
    inventory: ['t1', 'l1', 'h1'], 
    skin: { head:'#ffcc80', torso:'#29b6f6', legs:'#3f51b5', arm:'#ffcc80' } 
};
let localDB = { customLevels: [], shopItems: DEFAULT_SHOP };
let currentSession = { subject: null, level: 1, startTime: null, backspaces: 0 };
let timerInterval = null; 
let currentPuzzleSolution = []; 

// 4. INICIALIZACIÓN
window.onload = function() {
    if(localStorage.getItem('eduPlayer')) {
        try {
            let saved = JSON.parse(localStorage.getItem('eduPlayer'));
            if(saved.grade === 1) saved.grade = 'inicial';
            // Parche para nuevos niveles
            ['inicial','intermedia','dificil','experta','prodigio'].forEach(g => {
                if(!saved.progress[g]) saved.progress[g] = { matematica:1, compu:1, teclado:1, ingles:1, Geografia:1, claves:1, Algoritmos:1, python:1 };
                else {
                    saved.progress[g].Geografia = saved.progress[g].Geografia || 1;
                    saved.progress[g].claves = saved.progress[g].claves || 1;
                    saved.progress[g].Algoritmos = saved.progress[g].Algoritmos || 1;
                    saved.progress[g].python = saved.progress[g].python || 1;
                }
            });
            player = saved;
        } catch(e) { console.error("Error save", e); }
    }
    if(localStorage.getItem('eduDB')) localDB = JSON.parse(localStorage.getItem('eduDB'));
    
    document.getElementById('usernameInput').value = player.name;
    document.getElementById('gradeSelect').value = player.grade;
    updateUI();
    if(dbOnline) syncWithCloud();
};

function updateUI() {
    document.getElementById('uiCoins').innerText = player.coins;
    const p = player.progress[player.grade];
    
    document.getElementById('lbl-matematica').innerText = p.matematica;
    document.getElementById('lbl-logic').innerText = p.compu;
    document.getElementById('lbl-typing').innerText = p.teclado;
    document.getElementById('lbl-ingles').innerText = p.ingles;
    document.getElementById('lbl-geografia').innerText = p.Geografia;
    document.getElementById('lbl-algoritmos').innerText = p.Algoritmos;
    document.getElementById('lbl-python').innerText = p.python;
    
    applyTexture('avHead', player.skin.head || '#ffcc80');
    applyTexture('avTorso', player.skin.torso);
    applyTexture('avLegL', player.skin.legs);
    applyTexture('avLegR', player.skin.legs);
    applyTexture('avArmL', player.skin.arm || player.skin.torso);
    applyTexture('avArmR', player.skin.arm || player.skin.torso);
}

function applyTexture(elementId, value) {
    const el = document.getElementById(elementId);
    if(!el) return;
    if(value && (value.startsWith('http') || value.startsWith('data:image'))) {
        el.style.backgroundColor = 'transparent'; el.style.backgroundImage = `url('${value}')`;
    } else {
        el.style.backgroundImage = 'none'; el.style.backgroundColor = value;
    }
}

function openSubject(s) { 
    currentSession.subject = s; 
    if (s === 'claves') {
        document.getElementById('gameModal').style.display = 'flex';
        document.getElementById('gameTitle').innerText = "Generador Seguro";
        renderPasswordTool(document.getElementById('gameContent'));
    } 
    else {
        setView('view-map'); 
        document.getElementById('mapTitle').innerText = s.toUpperCase(); 
        renderMap(); 
    }
}

function showDashboard() { setView('view-dashboard'); }
function showShop() { setView('view-shop'); renderShop(); }
function setView(id) { 
    ['view-dashboard','view-map','view-shop'].forEach(v => document.getElementById(v).style.display = 'none'); 
    document.getElementById(id).style.display = 'block'; 
}

function closeGame() { 
    document.getElementById('gameModal').style.display = 'none'; 
    if(timerInterval) clearInterval(timerInterval); 
    if(currentSession.subject === 'claves') showDashboard();
    else renderMap();
}

function renderMap() {
    const grid = document.getElementById('mapGrid'); grid.innerHTML = '';
    const cur = player.progress[player.grade][currentSession.subject];
    for(let i=1; i<=60; i++) {
        const btn = document.createElement('div'); btn.className = 'level-block'; btn.innerText = i;
        if(i<cur) { btn.classList.add('completed'); btn.onclick = () => playLevel(i); }
        else if(i===cur) { btn.classList.add('current'); btn.onclick = () => playLevel(i); }
        else btn.classList.add('locked');
        grid.appendChild(btn);
    }
}

function playLevel(lvl) {
    currentSession.level = lvl;
    currentSession.startTime = null; 
    currentSession.backspaces = 0;   
    if(timerInterval) clearInterval(timerInterval);
    
    document.getElementById('gameModal').style.display = 'flex';
    const content = document.getElementById('gameContent');
    document.getElementById('gameTitle').innerText = `Nivel ${lvl} (${player.grade.toUpperCase()})`;
    
    const custom = localDB.customLevels.find(l => l.grade == player.grade && l.subject === currentSession.subject && l.level == lvl);
    
    if(custom) {
        renderQuestion(content, custom.question, custom.answer, custom.options);
    } 
    else if (currentSession.subject === 'Algoritmos') {
        generateAlgorithmLevel(content, lvl);
    }
    else {
        generateProceduralLevel(content, currentSession.subject, lvl);
    }
}

function generateProceduralLevel(container, subj, lvl) {
    let q, ans, opts;

    // --- PYTHON IDE ---
    if (subj === 'python') {
        const pool = DB_PYTHON_TASKS[player.grade] || DB_PYTHON_TASKS['inicial'];
        const task = pool[(lvl - 1) % pool.length];
        const validString = encodeURIComponent(JSON.stringify(task.valid));
        const outputString = encodeURIComponent(task.output);
        
        container.innerHTML = `
            <div class="ide-container">
                <div style="background:#e3f2fd; padding:10px; border-left:5px solid #2196f3; color:#0d47a1;">
                    <strong>Misión:</strong> ${task.mision}<br><small>Pista: ${task.hint}</small>
                </div>
                <div>Escribe tu código:</div>
                <textarea id="pyEditor" class="code-editor" spellcheck="false" placeholder='>>>'></textarea>
                <button class="run-btn" onclick="runPythonCode('${validString}', '${outputString}')">▶ EJECUTAR</button>
                <div style="font-size:0.7rem;">Consola:</div>
                <div id="pyConsole" class="console-output">Esperando...</div>
            </div>
        `;
        setTimeout(() => document.getElementById('pyEditor').focus(), 100);
        return; 
    }

    // --- OTRAS MATERIAS ---
    if (subj === 'Geografia') {
        const pool = DB_GEOGRAFIA[player.grade] || DB_GEOGRAFIA['inicial'];
        const item = getRandom(pool);
        if (item.img) {
            ans = item.ans; opts = item.opts.sort(() => Math.random() - 0.5);
            let html = `<h4 style="color:#555;">¿Dónde es esto?</h4><div style="width:100%; height:180px; background-image:url('${item.img}'); background-size:cover; background-position:center; border:4px solid #333; border-radius:10px; margin-bottom:15px;"></div><div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">`;
            opts.forEach(opt => { html += `<button class="mc-btn blue" onclick="checkAnswer('${opt}', '${ans}')">${opt}</button>`; });
            html += `</div>`;
            container.innerHTML = html;
            return;
        } else {
            q = item.q; ans = item.ans; opts = item.opts.sort(() => Math.random() - 0.5);
        }
    }
    else if (subj === 'compu') {
        const pool = DB_COMPUTING[player.grade] || DB_COMPUTING['inicial'];
        const item = getRandom(pool);
        q = item.q; ans = item.ans; opts = item.opts.sort(()=>Math.random()-0.5);
    }
    else if (subj === 'teclado') {
        let target = "", prompt = "", showStats = false;
        let pool = DB_TECLADO[player.grade]; 
        let isProdigio = player.grade === 'prodigio';
        if(isProdigio) showStats = true;

        if (player.grade === 'inicial') {
            if(lvl <= 25) { target = getRandom(pool.letras); prompt = "Tecla:"; } else { target = getRandom(pool.palabras); prompt = "Palabra:"; }
        } else if (player.grade === 'intermedia') { target = getRandom(pool.palabras); prompt = "Palabra:"; }
        else if (player.grade === 'dificil') { target = getRandom(pool.palabras); prompt = "Escribe:"; }
        else if (player.grade === 'experta') { target = getRandom(pool.oraciones); prompt = "Oración:"; }
        else { target = getRandom(pool.textos); prompt = "Transcribe:"; }
        
        ans = target;
        let inputStyle = "text-align:center; font-size:1.2rem; width:100%;" + (isProdigio ? "" : " text-transform:uppercase;");
        
        container.innerHTML = `${showStats ? `<div class="stats-bar"><div class="stats-item">⏳ <span id="timeCounter">0.0s</span></div><div class="stats-item">⌨️ <span id="delCounter" class="stat-danger">0</span></div><div class="stats-item">📝 <span id="wCounter">0</span></div></div>` : ''}<div style="color:#78909c; font-size:0.8rem; margin-bottom:10px;">${prompt}</div><h3 style="color:#555; font-size:${ans.length>25?'0.7rem':'1.2rem'}">${ans}</h3><input type="text" id="typingInput" autocomplete="off" style="${inputStyle}"><button class="mc-btn green" style="width:100%; margin-top:15px;" onclick="checkAnswer(document.getElementById('typingInput').value, '${ans}')">Confirmar</button>`;
        setTimeout(() => { 
            const i = document.getElementById('typingInput'); 
            if(i) { i.focus(); i.oninput = () => { if(!currentSession.startTime && showStats) { currentSession.startTime = new Date(); timerInterval = setInterval(() => { document.getElementById('timeCounter').innerText = ((new Date() - currentSession.startTime)/1000).toFixed(1) + 's'; }, 100); } if(showStats) document.getElementById('wCounter').innerText = i.value.trim().split(/\s+/).filter(x=>x).length; }; i.onkeydown = (e) => { if(showStats && e.key === 'Backspace') {currentSession.backspaces++; document.getElementById('delCounter').innerText = currentSession.backspaces;} if(e.key === 'Enter') checkAnswer(i.value, ans); }; }
        }, 50);
        return;
    }
    else if (subj === 'matematica') {
        let a, b, opSelector = Math.random();
        let max = (player.grade==='inicial') ? 20 : 100;
        if (opSelector < 0.4) { a=r(max); b=r(max); q=`¿${a}+${b}?`; ans=a+b; }
        else { b=r(5)+1; ans=r(10)+1; a=b*ans; q=`¿${a}/${b}?`; }
        opts = [ans, ans+1, ans-1, ans+5].sort(()=>Math.random()-0.5);
    }
    else {
        const item = getRandom(DB_INGLES); q = item.q; ans = item.ans; opts = item.opts.sort(()=>Math.random()-0.5);
    }

    renderQuestion(container, q, ans, opts);
}

function r(max) { return Math.floor(Math.random() * max) + 1; }

function renderQuestion(container, q, ans, opts) {
    if (!Array.isArray(opts)) opts = opts.split(',');
    let html = `<h2 style="color:#455a64; margin-bottom:30px;">${q}</h2><div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">`;
    opts.forEach(opt => { html += `<button class="mc-btn blue" onclick="checkAnswer('${opt}','${ans}')">${opt}</button>`; });
    html += `</div>`;
    container.innerHTML = html;
}

// 7. LÓGICA DE ALGORITMOS (BLOCKLY)
function generateAlgorithmLevel(container, lvl) {
    const difficulty = player.grade; 
    const pool = DB_ALGORITMOS[difficulty] || DB_ALGORITMOS['inicial'];
    const puzzle = pool[(lvl - 1) % pool.length];
    currentPuzzleSolution = puzzle.blocks.map(b => b.text);
    let shuffled = [...puzzle.blocks].sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <div style="text-align:left; margin-bottom:10px;"><h4 style="margin:0; color:#0277bd;">Misión: ${puzzle.title}</h4><small style="color:#555;">Ordena los bloques.</small></div>
        <div class="algo-container"><div style="font-size:0.6rem; color:#999; margin-bottom:-15px;">Tu Programa:</div><div class="algo-workspace" id="workspaceArea"><div id="emptyMsg" style="width:100%; text-align:center; padding-top:50px; color:#ccc;">Arrastra o haz clic</div></div><div style="font-size:0.6rem; color:#999; margin-bottom:-15px;">Piezas:</div><div class="algo-toolbox" id="toolboxArea">${shuffled.map(b => `<div class="code-block ${b.type}" onclick="moveBlock(this)">${b.text}</div>`).join('')}</div></div>
        <button class="mc-btn green" style="width:100%; margin-top:20px;" onclick="checkAlgorithm()">▶️ EJECUTAR</button>
    `;
}

function moveBlock(el) {
    const ws = document.getElementById('workspaceArea');
    const tb = document.getElementById('toolboxArea');
    const msg = document.getElementById('emptyMsg');
    if (el.parentElement === tb) { ws.appendChild(el); if(msg) msg.style.display = 'none'; }
    else { tb.appendChild(el); if(ws.children.length <= 1 && msg) msg.style.display = 'block'; }
}

function checkAlgorithm() {
    const userBlocks = Array.from(document.querySelectorAll('#workspaceArea .code-block'));
    const userSeq = userBlocks.map(el => el.innerText.trim());
    if (JSON.stringify(userSeq) === JSON.stringify(currentPuzzleSolution)) {
        successAction("¡Algoritmo Correcto! +30 🪙", 30);
    } else {
        failAction("Orden Incorrecto");
        document.getElementById('workspaceArea').classList.add('shake-anim');
        setTimeout(()=>document.getElementById('workspaceArea').classList.remove('shake-anim'), 500);
    }
}

// 8. LÓGICA DE PYTHON (IDE - MODO ESTRICTO PERO SMART QUOTES)
function normalizeCode(code) {
    // Solo arregla comillas raras de celular, pero respeta mayúsculas y espacios
    return code
        .trim()
        .replace(/[“”]/g, '"')   // Smart quotes dobles -> normales
        .replace(/[‘’]/g, "'");  // Smart quotes simples -> normales
}

function runPythonCode(validEncoded, outputEncoded) {
    const code = document.getElementById('pyEditor').value;
    const cons = document.getElementById('pyConsole');
    const valid = JSON.parse(decodeURIComponent(validEncoded));
    const output = decodeURIComponent(outputEncoded);
    
    cons.innerText = "Procesando...";
    cons.style.color = "#ffff00";

    setTimeout(() => {
        const userClean = normalizeCode(code);
        // Comparación estricta (salvo comillas)
        const match = valid.some(v => normalizeCode(v) === userClean);
        
        if (match) {
            cons.style.color = "#00ff00";
            cons.innerText = ">>> " + output + "\n\n[Exit code 0]";
            successAction("¡Código Funcional! +25 🪙", 25);
        } else {
            cons.style.color = "#ff4444";
            cons.innerText = `Traceback (most recent call last):\n  File "main.py", line 1\n    ${code}\nSyntaxError: invalid syntax (o no cumple la misión)`;
            failAction("Error en el código");
        }
    }, 600);
}

// 9. HERRAMIENTA CLAVES
function renderPasswordTool(container) {
    container.innerHTML = `
        <div style="text-align:left; padding:10px;">
            <label>Longitud: <input type="number" id="pwdLength" min="4" max="20" value="12" style="width:60px; padding:5px;"></label>
            <div style="margin:10px 0; display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.7rem;">
                <label><input type="checkbox" id="incUpper" checked> ABC</label><label><input type="checkbox" id="incLower" checked> abc</label>
                <label><input type="checkbox" id="incNum" checked> 123</label><label><input type="checkbox" id="incSym" checked> @#$</label>
            </div>
            <button class="mc-btn blue" style="width:100%; margin-bottom:15px;" onclick="genPwd()">🔄 Generar</button>
            <div id="resultPwd" style="background:#263238; color:#81c784; padding:15px; font-family:monospace; font-size:1.2rem; text-align:center; margin-bottom:20px;">???</div>
            <h4 style="margin:0 0 10px 0; color:#0277bd;">Guardar:</h4>
            <input type="text" id="siteName" placeholder="Sitio..." style="margin-bottom:10px;">
            <button class="mc-btn green" style="width:100%;" onclick="savePwd()">💾 Guardar</button>
            <div id="savedList" style="margin-top:15px; background:#eceff1; height:100px; overflow-y:auto; border:2px solid #b0bec5; padding:5px; font-size:0.6rem;"></div>
        </div>`;
}
function genPwd() {
    const len=document.getElementById('pwdLength').value, u=document.getElementById('incUpper').checked, l=document.getElementById('incLower').checked, n=document.getElementById('incNum').checked, s=document.getElementById('incSym').checked;
    let chars = ""; if(u) chars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ"; if(l) chars+="abcdefghijklmnopqrstuvwxyz"; if(n) chars+="0123456789"; if(s) chars+="!@#$%^&*";
    if(!chars) return showToast("Elige opciones", "error");
    let pwd = ""; for(let i=0; i<len; i++) pwd += chars.charAt(Math.floor(Math.random()*chars.length));
    document.getElementById('resultPwd').innerText = pwd;
}
function savePwd() {
    const site=document.getElementById('siteName').value, pwd=document.getElementById('resultPwd').innerText;
    if(!site || pwd==="???") return showToast("Faltan datos", "error");
    const d = document.createElement('div'); d.innerHTML = `<b>${site}:</b> <span style="color:blue">${pwd}</span>`;
    document.getElementById('savedList').prepend(d);
    player.coins += 5; updateUI(); saveData(); showToast("¡Guardado! +5");
}

// 10. VALIDACIÓN Y UTILIDADES GENERALES
function checkAnswer(user, correct) {
    let isCorrect = false;
    if (player.grade === 'prodigio' && currentSession.subject === 'teclado') { if (String(user).trim() === String(correct).trim()) isCorrect = true; }
    else { if (String(user).toUpperCase().trim() === String(correct).toUpperCase().trim()) isCorrect = true; }

    if (isCorrect) successAction("¡Correcto! +20 🪙", 20);
    else failAction("Incorrecto -10 🪙");
}

function successAction(msg, coins) {
    player.coins += coins;
    if(currentSession.level === player.progress[player.grade][currentSession.subject]) player.progress[player.grade][currentSession.subject]++;
    saveData(); updateUI(); showToast(msg);
    if(timerInterval) clearInterval(timerInterval);
    setTimeout(() => { if(currentSession.level < 60) playLevel(currentSession.level + 1); else closeGame(); }, 1000);
}

function failAction(msg) {
    player.coins = Math.max(0, player.coins - 10);
    saveData(); updateUI(); showToast(msg, 'error');
}

function getRandom(arr) { if(!arr) return "X"; return arr[Math.floor(Math.random() * arr.length)]; }
function updateUsername(val) { player.name = val; saveData(); }
function changeGrade() { player.grade = document.getElementById('gradeSelect').value; updateUI(); showToast(`Dificultad: ${player.grade.toUpperCase()}`); }
function showToast(msg, type='success') { const t = document.createElement('div'); t.className = `toast ${type}`; t.innerHTML = `<span>${type=='success'?'✅':'❌'}</span><span>${msg}</span>`; document.getElementById('notification-area').appendChild(t); setTimeout(() => t.remove(), 4000); }
function resetGame() { if(confirm("¿Borrar todo?")) { localStorage.removeItem('eduPlayer'); location.reload(); } }

function saveData() { localStorage.setItem('eduPlayer', JSON.stringify(player)); localStorage.setItem('eduDB', JSON.stringify(localDB)); if(dbOnline) syncWithCloud(); }
function syncWithCloud() { if(dbOnline) dbOnline.collection("players").doc(player.name).set(player).then(() => loadLeaderboard()).catch(e => console.error(e)); }
function loadLeaderboard() {
    if(!dbOnline) return;
    dbOnline.collection("players").orderBy("coins", "desc").limit(10).onSnapshot(snapshot => {
        const list = document.getElementById('leaderboardList'); list.innerHTML = ''; let rank = 1;
        snapshot.forEach(doc => {
            const p = doc.data(); const row = document.createElement('div'); row.className = `leaderboard-row ${rank===1?'top-1':''}`;
            const bg = (p.skin.head && p.skin.head.startsWith('http')) ? `background-image:url('${p.skin.head}'); background-size:cover;` : `background:${p.skin.head||'#ffcc80'};`;
            row.innerHTML = `<div class="rank">#${rank++}</div><div class="mini-avatar-box"><div class="mc-head mc-part" style="${bg} width:40px; height:40px;"></div></div><div style="flex:1; display:flex; justify-content:space-between;"><div style="font-weight:bold; color:#37474f;">${p.name}</div><div style="color:#f9a825;">${p.coins}</div></div>`;
            list.appendChild(row);
        });
    });
}

function renderShop() {
    const g = document.getElementById('shopGrid'); g.innerHTML = '';
    localDB.shopItems.forEach(it => {
        const owned = player.inventory.includes(it.id);
        const d = document.createElement('div'); d.className = 'panel center-content';
        let bg = it.color.startsWith('http') ? `background-image:url('${it.color}'); background-size:cover;` : `background:${it.color};`;
        d.innerHTML = `<div style="width:40px;height:40px;${bg} margin:0 auto 10px;border:2px solid #000;"></div><b>${it.name}</b><br><small>${owned?'Tuyo':it.price}</small>`;
        d.onclick = () => {
            if(owned) { player.skin[it.type] = it.color; saveData(); updateUI(); showToast("Equipado"); }
            else if(player.coins >= it.price) { player.coins -= it.price; player.inventory.push(it.id); player.skin[it.type] = it.color; saveData(); updateUI(); renderShop(); showToast("Comprado"); }
            else showToast("Faltan Monedas", 'error');
        };
        g.appendChild(d);
    });
}

function openAdminLogin() { document.getElementById('adminLoginModal').style.display = 'flex'; }
function checkAdmin() { if(document.getElementById('adminUser').value==='admin' && document.getElementById('adminPass').value==='minecraft') { document.getElementById('adminLoginModal').style.display='none'; document.getElementById('adminPanelModal').style.display='flex'; } else showToast("Error", 'error'); }
function closeAdmin() { document.getElementById('adminPanelModal').style.display='none'; }
function adminAddManualPlayer() {
    const name = document.getElementById('manualName').value, coins = parseInt(document.getElementById('manualCoins').value);
    if (!name || isNaN(coins)) return showToast("Datos incorrectos", 'error');
    const newPlayer = { name: name, coins: coins, skin: { head:'#ffcc80', torso:'#29b6f6', legs:'#3f51b5', arm:'#ffcc80' } };
    if(dbOnline) dbOnline.collection("players").doc(name).set(newPlayer).then(()=>{showToast(`¡${name} inyectado!`);});
}
function adminAddItem() {
    const n=document.getElementById('admItemName').value, p=document.getElementById('admPrice').value, t=document.getElementById('admType').value, c=document.getElementById('admTexture').value;
    if(!n || !c) return showToast("Falta Info",'error');
    localDB.shopItems.push({ id: 'c_'+Date.now(), name: n, price: parseInt(p), type: t, color: c }); saveData(); showToast("Item Creado");
}
function adminAddLevel() {
    const g=document.getElementById('admGrade').value, s=document.getElementById('admSubj').value, l=document.getElementById('admLvlNum').value, q=document.getElementById('admQ').value, a=document.getElementById('admAns').value, o=document.getElementById('admOpts').value;
    if(!l||!q||!a) return showToast("Faltan Datos",'error');
    localDB.customLevels.push({ grade: g, subject: s, level: parseInt(l), question: q, answer: a, options: o }); saveData(); showToast("Nivel Guardado");
}
