// Módulo independiente: "¿Qué es SQL?"
// No depende de script.js/style.css/Firebase del resto de la app.
// Es una base de datos falsa que vive solo en el navegador (un array de JS).

const ALL_COLUMNS = ['nombre', 'tipo', 'edad', 'color'];

const ORIGINAL_MASCOTAS = [
    { id: 1, nombre: 'Rocky', tipo: 'perro', edad: 3, color: 'marrón' },
    { id: 2, nombre: 'Michi', tipo: 'gato', edad: 2, color: 'negro' },
    { id: 3, nombre: 'Piolín', tipo: 'pájaro', edad: 1, color: 'amarillo' },
    { id: 4, nombre: 'Firulais', tipo: 'perro', edad: 5, color: 'negro' },
    { id: 5, nombre: 'Nemo', tipo: 'pez', edad: 1, color: 'naranja' },
    { id: 6, nombre: 'Luna', tipo: 'gato', edad: 4, color: 'blanco' },
    { id: 7, nombre: 'Toby', tipo: 'perro', edad: 2, color: 'blanco' },
    { id: 8, nombre: 'Kiwi', tipo: 'pájaro', edad: 1, color: 'verde' },
];

let mascotas = ORIGINAL_MASCOTAS.map(r => ({ ...r }));
let nextId = 9;

function resetData(showFeedback) {
    mascotas = ORIGINAL_MASCOTAS.map(r => ({ ...r }));
    nextId = 9;
    runBuilderQuery();
    renderFullTable();
    if (showFeedback) showToast('🔄 Tabla reiniciada');
}

// ---------------- VOCABULARIO ----------------

const VOCAB = [
    { emoji: '🗄️', tag: 'BASE DE DATOS', name: 'Base de Datos', desc: 'Es como un gran armario de archivos ordenado dentro de la compu, donde se guarda información para no perderla.' },
    { emoji: '📋', tag: 'TABLA', name: 'Tabla', desc: 'Es como una hoja de cálculo: tiene filas y columnas con datos organizados sobre un mismo tema, por ejemplo "mascotas".' },
    { emoji: '📏', tag: 'FILA / REGISTRO', name: 'Fila', desc: 'Es una línea de la tabla: representa "una cosa completa", por ejemplo, un solo animal con todos sus datos.' },
    { emoji: '📊', tag: 'COLUMNA / CAMPO', name: 'Columna', desc: 'Es una categoría de información que se repite en cada fila, como el "nombre" o la "edad".' },
    { emoji: '🗣️', tag: 'SQL', name: 'SQL', desc: 'Es el idioma especial que usamos para pedirle cosas a la base de datos, como si le hicieras una pregunta.' },
    { emoji: '👀', tag: 'SELECT', name: 'SELECT (Mostrar)', desc: 'Se usa para pedirle a la base de datos que te muestre datos. Es la palabra más usada de todas.' },
    { emoji: '📍', tag: 'FROM', name: 'FROM (De)', desc: 'Le decís de qué tabla querés sacar la información. Por ejemplo: "de la tabla mascotas".' },
    { emoji: '🔍', tag: 'WHERE', name: 'WHERE (Donde)', desc: 'Se usa para pedir solo los datos que cumplen una condición, como "donde el tipo sea perro".' },
    { emoji: '🔢', tag: 'ORDER BY', name: 'ORDER BY (Ordenar por)', desc: 'Sirve para ordenar los resultados, por ejemplo de la mascota más chica a la más grande.' },
    { emoji: '➕', tag: 'INSERT', name: 'INSERT (Agregar)', desc: 'Se usa para sumar un dato nuevo a la tabla, como anotar una mascota nueva en la lista.' },
    { emoji: '✏️', tag: 'UPDATE', name: 'UPDATE (Actualizar)', desc: 'Se usa para cambiar un dato que ya existe, como corregir la edad de una mascota.' },
    { emoji: '🗑️', tag: 'DELETE', name: 'DELETE (Borrar)', desc: 'Se usa para eliminar un dato de la tabla, como sacar una mascota de la lista.' },
];

function renderVocab() {
    const grid = document.getElementById('vocabGrid');
    grid.innerHTML = VOCAB.map(v => `
        <div class="sql-vocab-card">
            <div class="vc-top"><span class="vc-emoji">${v.emoji}</span><h3>${v.name}</h3></div>
            <span class="vc-tag">${v.tag}</span>
            <p>${v.desc}</p>
        </div>
    `).join('');
}

// ---------------- TABS ----------------

function setTab(tab) {
    document.querySelectorAll('.sql-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    ['vocab', 'probar', 'desafios'].forEach(t => {
        document.getElementById('panel-' + t).style.display = (t === tab) ? 'block' : 'none';
    });
    if (tab === 'desafios') {
        resetData(false);
        if (!challengeStarted) startChallenges();
    }
}

// ---------------- INTÉRPRETE DE CONSULTAS ----------------

function coerce(v) {
    if (v === null || v === undefined) return v;
    const n = Number(v);
    return (v !== '' && !isNaN(n)) ? n : String(v).toLowerCase();
}

function matchesWhere(row, where) {
    if (!where) return true;
    const rowVal = row[where.col];
    switch (where.op) {
        case '=': return coerce(rowVal) === coerce(where.val);
        case '>': return Number(rowVal) > Number(where.val);
        case '<': return Number(rowVal) < Number(where.val);
        case 'contiene': return String(rowVal).toLowerCase().includes(String(where.val).toLowerCase());
        default: return true;
    }
}

function compareRows(a, b, orderBy) {
    const av = a[orderBy.col], bv = b[orderBy.col];
    let cmp;
    if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv;
    else cmp = String(av).localeCompare(String(bv), 'es');
    return orderBy.dir === 'DESC' ? -cmp : cmp;
}

function runQuery(state, data) {
    let rows = data.filter(r => matchesWhere(r, state.where));
    if (state.orderBy) rows = [...rows].sort((a, b) => compareRows(a, b, state.orderBy));
    const isStar = state.columns.length === 0 || (state.columns.length === 1 && state.columns[0] === '*');
    const cols = isStar ? ALL_COLUMNS : state.columns;
    const projected = rows.map(r => {
        const o = {};
        cols.forEach(c => o[c] = r[c]);
        return o;
    });
    return { rows: projected, cols };
}

function buildSQL(state) {
    const isStar = state.columns.length === 0 || (state.columns.length === 1 && state.columns[0] === '*');
    const colsText = isStar ? '*' : state.columns.join(', ');
    let sql = `SELECT ${colsText} FROM mascotas`;
    if (state.where) {
        const isNumericVal = !isNaN(Number(state.where.val)) && state.where.val !== '';
        let valText;
        if (state.where.op === 'contiene') {
            sql += ` WHERE ${state.where.col} LIKE '%${state.where.val}%'`;
        } else {
            valText = isNumericVal ? Number(state.where.val) : `'${state.where.val}'`;
            sql += ` WHERE ${state.where.col} ${state.where.op} ${valText}`;
        }
    }
    if (state.orderBy) sql += ` ORDER BY ${state.orderBy.col} ${state.orderBy.dir}`;
    return sql + ';';
}

function renderResultTable(containerId, cols, rows) {
    const wrap = document.getElementById(containerId);
    if (!rows.length) {
        wrap.innerHTML = `<p class="sql-empty">(sin resultados)</p>`;
        return;
    }
    let html = '<table class="sql-table"><thead><tr>';
    cols.forEach(c => html += `<th>${c}</th>`);
    html += '</tr></thead><tbody>';
    rows.forEach(r => {
        html += '<tr>' + cols.map(c => `<td>${r[c]}</td>`).join('') + '</tr>';
    });
    html += '</tbody></table>';
    wrap.innerHTML = html;
}

// ---------------- TAB "PROBALO VOS" ----------------

function fillColumnSelectors() {
    const targets = ['qbColumns', 'qbWhereCol', 'qbOrderCol', 'chColumns', 'chWhereCol', 'chOrderCol'];
    targets.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = ALL_COLUMNS.map(c => `<option value="${c}">${c}</option>`).join('');
    });
}

function readBuilderState(prefix) {
    const colsSel = document.getElementById(prefix + 'Columns');
    const selected = Array.from(colsSel.selectedOptions).map(o => o.value);
    const whereOn = document.getElementById(prefix + 'WhereToggle').checked;
    const orderOn = document.getElementById(prefix + 'OrderToggle').checked;
    const whereVal = document.getElementById(prefix + 'WhereVal').value.trim();

    return {
        columns: selected.length ? selected : ['*'],
        where: (whereOn && whereVal !== '') ? {
            col: document.getElementById(prefix + 'WhereCol').value,
            op: document.getElementById(prefix + 'WhereOp').value,
            val: whereVal
        } : null,
        orderBy: orderOn ? {
            col: document.getElementById(prefix + 'OrderCol').value,
            dir: document.getElementById(prefix + 'OrderDir').value
        } : null
    };
}

function runBuilderQuery() {
    const state = readBuilderState('qb');
    const sql = buildSQL(state);
    document.getElementById('sqlCodeBox').textContent = sql;
    const { cols, rows } = runQuery(state, mascotas);
    renderResultTable('resultTableWrap', cols, rows);
    renderFullTable();
}

function renderBuilderState() {
    // se llama al tildar los checkboxes, no hace falta lógica extra
}

function renderFullTable() {
    const wrap = document.getElementById('fullTableWrap');
    if (!wrap) return;
    if (!mascotas.length) {
        wrap.innerHTML = `<p class="sql-empty">(la tabla está vacía)</p>`;
        return;
    }
    let html = '<table class="sql-table"><thead><tr><th>nombre</th><th>tipo</th><th>edad</th><th>color</th><th></th></tr></thead><tbody>';
    mascotas.forEach(r => {
        html += `<tr>
            <td>${r.nombre}</td><td>${r.tipo}</td><td>${r.edad}</td><td>${r.color}</td>
            <td><button class="del-btn" title="Borrar" onclick="deleteMascota(${r.id})">🗑️</button></td>
        </tr>`;
    });
    html += '</tbody></table>';
    wrap.innerHTML = html;
}

function insertMascota() {
    const nombre = document.getElementById('newNombre').value.trim();
    const tipo = document.getElementById('newTipo').value.trim();
    const edad = document.getElementById('newEdad').value.trim();
    const color = document.getElementById('newColor').value.trim();

    if (!nombre || !tipo || !edad || !color) {
        showToast('⚠️ Completá los 4 datos');
        return;
    }

    mascotas.push({ id: nextId, nombre, tipo, edad: Number(edad), color });
    showToast(`INSERT INTO mascotas VALUES ('${nombre}', '${tipo}', ${Number(edad)}, '${color}');`);
    nextId++;

    document.getElementById('newNombre').value = '';
    document.getElementById('newTipo').value = '';
    document.getElementById('newEdad').value = '';
    document.getElementById('newColor').value = '';

    runBuilderQuery();
}

function deleteMascota(id) {
    const row = mascotas.find(r => r.id === id);
    mascotas = mascotas.filter(r => r.id !== id);
    if (row) showToast(`DELETE FROM mascotas WHERE nombre = '${row.nombre}';`);
    runBuilderQuery();
}

function showToast(text) {
    const area = document.getElementById('sqlToast');
    const item = document.createElement('div');
    item.className = 'sql-toast-item';
    item.textContent = text;
    area.appendChild(item);
    setTimeout(() => item.remove(), 2800);
}

// ---------------- TAB "DESAFÍOS" ----------------

const CHALLENGES = [
    {
        text: 'Mostrá el NOMBRE de todos los PERROS.',
        expected: { columns: ['nombre'], where: { col: 'tipo', op: '=', val: 'perro' }, orderBy: null }
    },
    {
        text: 'Mostrá TODOS los datos de las mascotas de color NEGRO.',
        expected: { columns: ['*'], where: { col: 'color', op: '=', val: 'negro' }, orderBy: null }
    },
    {
        text: 'Mostrá el NOMBRE y la EDAD de las mascotas, ordenadas por EDAD de mayor a menor.',
        expected: { columns: ['nombre', 'edad'], where: null, orderBy: { col: 'edad', dir: 'DESC' } }
    },
    {
        text: 'Mostrá el NOMBRE de las mascotas que tengan MÁS de 2 años.',
        expected: { columns: ['nombre'], where: { col: 'edad', op: '>', val: 2 }, orderBy: null }
    },
    {
        text: 'Mostrá el TIPO y el COLOR de todas las mascotas, ordenadas por TIPO de la A a la Z.',
        expected: { columns: ['tipo', 'color'], where: null, orderBy: { col: 'tipo', dir: 'ASC' } }
    },
    {
        text: 'Mostrá el NOMBRE de las mascotas cuyo nombre CONTENGA la letra "i".',
        expected: { columns: ['nombre'], where: { col: 'nombre', op: 'contiene', val: 'i' }, orderBy: null }
    },
];

let challengeIndex = 0;
let challengeScore = 0;
let challengeStarted = false;

function startChallenges() {
    challengeStarted = true;
    challengeIndex = 0;
    challengeScore = 0;
    document.getElementById('challengeTotal').textContent = CHALLENGES.length;
    document.getElementById('challengeScore').textContent = challengeScore;
    showChallenge();
}

function showChallenge() {
    if (challengeIndex >= CHALLENGES.length) {
        document.getElementById('challengeText').textContent = `¡Completaste todos los desafíos! 🏆 Puntaje: ${challengeScore} / ${CHALLENGES.length}`;
        document.getElementById('challengeCodeBox').textContent = '';
        document.getElementById('challengeFeedback').innerHTML = `
            <button class="sql-run-btn small" onclick="startChallenges()">🔁 Jugar de nuevo</button>
        `;
        return;
    }
    const ch = CHALLENGES[challengeIndex];
    document.getElementById('challengeText').textContent = `Desafío ${challengeIndex + 1}/${CHALLENGES.length}: ${ch.text}`;
    document.getElementById('challengeFeedback').textContent = '';
    document.getElementById('challengeCodeBox').textContent = '';

    // resetear el armador de consulta del desafío
    document.getElementById('chColumns').selectedIndex = -1;
    document.getElementById('chWhereToggle').checked = false;
    document.getElementById('chWhereVal').value = '';
    document.getElementById('chOrderToggle').checked = false;
}

function sameColumns(a, b) {
    const aStar = a.length === 0 || (a.length === 1 && a[0] === '*');
    const bStar = b.length === 0 || (b.length === 1 && b[0] === '*');
    if (aStar || bStar) return aStar && bStar;
    const as = [...a].sort(), bs = [...b].sort();
    return as.length === bs.length && as.every((v, i) => v === bs[i]);
}

function sameWhere(a, b) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a.col === b.col && a.op === b.op &&
        String(a.val).toLowerCase().trim() === String(b.val).toLowerCase().trim();
}

function sameOrderBy(a, b) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a.col === b.col && a.dir === b.dir;
}

function checkChallenge() {
    const userState = readBuilderState('ch');
    document.getElementById('challengeCodeBox').textContent = buildSQL(userState);

    const expected = CHALLENGES[challengeIndex].expected;
    const feedback = document.getElementById('challengeFeedback');

    const ok = sameColumns(userState.columns, expected.columns) &&
        sameWhere(userState.where, expected.where) &&
        sameOrderBy(userState.orderBy, expected.orderBy);

    if (ok) {
        challengeScore++;
        document.getElementById('challengeScore').textContent = challengeScore;
        feedback.textContent = '¡Correcto! 🎉';
        feedback.style.color = '#43a047';
        challengeIndex++;
        setTimeout(showChallenge, 1400);
    } else {
        feedback.textContent = 'No es esa consulta todavía, ¡probá de nuevo! 🤔';
        feedback.style.color = '#e53935';
    }
}

// ---------------- INIT ----------------

document.addEventListener('DOMContentLoaded', () => {
    fillColumnSelectors();
    renderVocab();
    resetData(false);
});
