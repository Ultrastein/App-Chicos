// ==========================================
// 1. CONFIGURACIÓN FIREBASE
// ==========================================
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
} catch(e) { console.error("Error Firebase (Offline mode)", e); }

// ==========================================
// 2. BASES DE DATOS (CONTENIDO)
// ==========================================

const DB_TECLADO = {
    // INICIAL: Letras y Números (Case Sensitive)
    inicial: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(''),
    
    // INTERMEDIA: Frases naturales -> Símbolos
    intermedia: [
        "Hola mundo", "Buen dia", "Gato negro", "Perro grande", "Sol amarillo", 
        "Luna blanca", "Mar azul", "Flor roja", "Mesa grande", "Silla chica", 
        "Auto verde", "Casa linda", "Tren rapido", "Luz fuerte", "Pan rico",
        "Sal y pimienta", "Agua fria", "Viento suave", "Cielo claro", "Noche oscura",
        "Manzana roja", "Pera verde", "Libro nuevo", "Papel blanco", "Lapiz corto",
        ".", ",", ";", ":", "-", "_", "!", "¡", "?", "¿", 
        "@", "#", "$", "%", "&", "/", "(", ")", "=", "+", 
        "[", "]", "{", "}", "*", "|"
    ],
    
    // DIFICIL: Estructurada por etapas
    dificil: {
        sinTilde: [
            "El viento sopla muy fuerte en la montaña", "Los estudiantes leen muchos libros interesantes", 
            "La computadora procesa datos a gran velocidad", "El tren llega puntual a la estacion central",
            "Los gatos corren rapido por el jardin", "Quiero aprender a programar en Python",
            "La tecnologia avanza cada dia mas rapido"
        ],
        conTildeFacil: [
            "El árbol es alto", "Tomé un café", "El león ruge", "El sofá es cómodo", "Papá y mamá", 
            "El avión vuela", "La canción es linda", "El lápiz es mío", "El balón", "Jugué mucho"
        ],
        conTildeDificil: [
            "La biología es una ciencia fascinante", "El pájaro cantó una melodía alegre", 
            "La geografía estudia la Tierra", "El ejército avanzó con determinación", 
            "La música clásica es relajante", "El círculo tiene un radio y un diámetro"
        ],
        dieresis: [
            "El pingüino nada en el agua helada", "La cigüeña trae buenas noticias", 
            "Siento vergüenza ajena", "Es un texto bilingüe", "Hay ambigüedad en su respuesta", 
            "El desagüe esta tapado", "La antigüedad de este objeto es valiosa"
        ]
    },
    experta: [
        "El gato duerme, plácidamente, en el sofá.", "¡Qué sorpresa verte aquí hoy!", 
        "¿Podrías pasarme la sal, por favor?", "La programación: arte y lógica.", 
        "Ayer fui al cine; la película estuvo genial.", "El éxito depende del esfuerzo diario.",
        "10 + 10 = 20, eso es matemática básica.", "Mi correo es: usuario@email.com",
        "Cuidado con el escalón, ¡es peligroso!", "La 'constitución' es la ley suprema."
    ],
    prodigio: [
        "En un lugar de la Mancha de cuyo nombre no quiero acordarme.",
        "La práctica hace al maestro y escribir rápido requiere constancia.",
        "Los programadores resuelven problemas que no sabías que tenías.",
        "El veloz murciélago hindú comía feliz cardillo y kiwi.",
        "La inteligencia artificial está transformando el mundo laboral.",
        "Aprender mecanografía te ahorrará cientos de horas en tu vida.",
        "El respeto y la educación son fundamentales para la sociedad.",
        "No dejes para mañana lo que puedes codificar hoy mismo."
    ]
};

const DB_PYTHON_THEORY = {
    inicial: [ 
        {q:"¿Para qué sirve print()?", ans:"Mostrar texto en pantalla", opts:["Mostrar texto en pantalla", "Imprimir en papel", "Borrar todo"]},
        {q:"¿Qué son las comillas \" \"?", ans:"Indican texto (String)", opts:["Indican texto (String)", "Son para decorar", "Son para multiplicar"]},
        {q:"¿Cómo se escribe Hola?", ans:"print(\"Hola\")", opts:["print(\"Hola\")", "escribir Hola", "imprimir(Hola)"]},
        {q:"¿Qué es un SyntaxError?", ans:"Un error de escritura", opts:["Un error de escritura", "Un virus", "Un premio"]},
        {q:"¿El código se lee de...?", ans:"Arriba a abajo", opts:["Arriba a abajo", "Abajo a arriba", "Derecha a izquierda"]}
    ],
    intermedia: [ 
        {q:"¿Qué es una variable?", ans:"Una caja para guardar datos", opts:["Una caja para guardar datos", "Una variante", "Un número fijo"]},
        {q:"Si x = 10, ¿cuánto vale x?", ans:"10", opts:["10", "x", "0"]},
        {q:"¿Cómo guardas tu nombre?", ans:"nombre = \"Juan\"", opts:["nombre = \"Juan\"", "Juan = nombre", "nombre: Juan"]},
        {q:"¿Qué es un Integer (int)?", ans:"Un número entero", opts:["Un número entero", "Un texto", "Un decimal"]},
        {q:"¿Qué signo se usa para asignar?", ans:"=", opts:["=", "==", ":"]}
    ],
    dificil: [ 
        {q:"¿Para qué sirve 'if'?", ans:"Para tomar decisiones", opts:["Para tomar decisiones", "Para repetir", "Para terminar"]},
        {q:"¿Qué significa 'else'?", ans:"Si no, haz esto otro", opts:["Si no, haz esto otro", "Entonces", "Repetir"]},
        {q:"¿Cuál es Verdadero?", ans:"True", opts:["True", "False", "Verdad"]},
        {q:"El signo mayor que es...", ans:">", opts:[">", "<", "="]},
        {q:"Si 5 > 2...", ans:"Es verdadero (True)", opts:["Es verdadero (True)", "Es falso (False)", "Da error"]}
    ]
};

const DB_INGLES = {
    inicial: [ 
        {q:"Red", ans:"Rojo", opts:["Rojo","Verde","Azul"]}, {q:"Blue", ans:"Azul", opts:["Azul","Rojo","Amarillo"]},
        {q:"One", ans:"Uno", opts:["Uno","Dos","Diez"]}, {q:"Cat", ans:"Gato", opts:["Gato","Perro","Pez"]},
        {q:"Dog", ans:"Perro", opts:["Perro","Gato","Vaca"]}, {q:"Yellow", ans:"Amarillo", opts:["Amarillo","Negro","Blanco"]},
        {q:"Ten", ans:"Diez", opts:["Diez","Uno","Cero"]}, {q:"Fish", ans:"Pez", opts:["Pez","Pollo","León"]},
        {q:"Sun", ans:"Sol", opts:["Sol","Luna","Estrella"]}, {q:"Moon", ans:"Luna", opts:["Luna","Sol","Mar"]}
    ],
    intermedia: [ 
        {q:"Table", ans:"Mesa", opts:["Mesa","Silla","Cama"]}, {q:"Chair", ans:"Silla", opts:["Silla","Mesa","Puerta"]},
        {q:"To Run", ans:"Correr", opts:["Correr","Saltar","Comer"]}, {q:"To Eat", ans:"Comer", opts:["Comer","Beber","Dormir"]},
        {q:"Window", ans:"Ventana", opts:["Ventana","Pared","Piso"]}, {q:"Door", ans:"Puerta", opts:["Puerta","Llave","Casa"]},
        {q:"Book", ans:"Libro", opts:["Libro","Papel","Lápiz"]}, {q:"School", ans:"Escuela", opts:["Escuela","Casa","Parque"]},
        {q:"Teacher", ans:"Maestro", opts:["Maestro","Alumno","Doctor"]}, {q:"Student", ans:"Estudiante", opts:["Estudiante","Profesor","Director"]}
    ],
    dificil: [ 
        {q:"Yesterday", ans:"Ayer", opts:["Ayer","Hoy","Mañana"]}, {q:"Tomorrow", ans:"Mañana", opts:["Mañana","Ayer","Siempre"]},
        {q:"Beautiful", ans:"Hermoso", opts:["Hermoso","Feo","Triste"]}, {q:"Ugly", ans:"Feo", opts:["Feo","Lindo","Rápido"]},
        {q:"Fast", ans:"Rápido", opts:["Rápido","Lento","Quieto"]}, {q:"Slow", ans:"Lento", opts:["Lento","Rápido","Fuerte"]},
        {q:"Happy", ans:"Feliz", opts:["Feliz","Triste","Enojado"]}, {q:"Angry", ans:"Enojado", opts:["Enojado","Feliz","Cansado"]},
        {q:"Always", ans:"Siempre", opts:["Siempre","Nunca","A veces"]}, {q:"Never", ans:"Nunca", opts:["Nunca","Siempre","Quizás"]}
    ],
    experta: [ 
        {q:"I am playing", ans:"Estoy jugando", opts:["Estoy jugando","Jugué","Jugaré"]},
        {q:"She is smart", ans:"Ella es lista", opts:["Ella es lista","El es listo","Soy listo"]},
        {q:"We are friends", ans:"Somos amigos", opts:["Somos amigos","Son amigos","Fueron amigos"]},
        {q:"Where is the cat?", ans:"¿Dónde está el gato?", opts:["¿Dónde está el gato?","¿Quién es el gato?","¿Qué es el gato?"]},
        {q:"I don't know", ans:"No lo sé", opts:["No lo sé","Lo sé","Tal vez"]},
        {q:"The book is on the table", ans:"El libro está en la mesa", opts:["El libro está en la mesa", "El libro es la mesa", "La mesa es el libro"]},
        {q:"He has a car", ans:"Él tiene un auto", opts:["Él tiene un auto", "Ella tiene un auto", "Él es un auto"]}
    ],
    prodigio: [
        {q:"Hola", ans:"Hello"}, {q:"Buenos días", ans:"Good morning"},
        {q:"Adiós", ans:"Goodbye"}, {q:"Por favor", ans:"Please"},
        {q:"Gracias", ans:"Thank you"}, {q:"De nada", ans:"You are welcome"},
        {q:"Sí", ans:"Yes"}, {q:"No", ans:"No"},
        {q:"Yo soy", ans:"I am"}, {q:"Ella es", ans:"She is"},
        {q:"El gato es negro", ans:"The cat is black"}, {q:"El perro es grande", ans:"The dog is big"},
        {q:"Me gusta jugar", ans:"I like to play"}, {q:"Mi nombre es Juan", ans:"My name is Juan"},
        {q:"Tengo hambre", ans:"I am hungry"}, {q:"Tengo sed", ans:"I am thirsty"},
        {q:"¿Dónde está el baño?", ans:"Where is the bathroom?"}, {q:"¿Cómo estás?", ans:"How are you?"},
        {q:"Estoy bien", ans:"I am fine"}, {q:"El auto es rojo", ans:"The car is red"},
        {q:"La casa es azul", ans:"The house is blue"}, {q:"Hoy es lunes", ans:"Today is Monday"},
        {q:"Mañana es martes", ans:"Tomorrow is Tuesday"}, {q:"Me gusta la pizza", ans:"I like pizza"},
        {q:"No me gusta esto", ans:"I do not like this"}, {q:"Somos amigos", ans:"We are friends"},
        {q:"Ellos son felices", ans:"They are happy"}, {q:"El sol brilla", ans:"The sun is shining"},
        {q:"Abre la puerta", ans:"Open the door"}, {q:"Cierra la ventana", ans:"Close the window"},
        {q:"Feliz cumpleaños", ans:"Happy birthday"}, {q:"Buenas noches", ans:"Good night"},
        {q:"Hasta luego", ans:"See you later"}, {q:"Te quiero", ans:"I love you"},
        {q:"Yo puedo correr", ans:"I can run"}, {q:"Ella puede cantar", ans:"She can sing"},
        {q:"Es muy tarde", ans:"It is very late"}, {q:"Es temprano", ans:"It is early"},
        {q:"¿Qué hora es?", ans:"What time is it?"}, {q:"Es un libro", ans:"It is a book"},
        {q:"Esta es mi escuela", ans:"This is my school"}, {q:"Quiero agua", ans:"I want water"},
        {q:"Necesito ayuda", ans:"I need help"}, {q:"¿Puedes ayudarme?", ans:"Can you help me?"},
        {q:"El cielo es azul", ans:"The sky is blue"}, {q:"La flor es bonita", ans:"The flower is beautiful"},
        {q:"Tengo un hermano", ans:"I have a brother"}, {q:"Tengo una hermana", ans:"I have a sister"},
        {q:"Mi madre es buena", ans:"My mother is good"}, {q:"Mi padre es alto", ans:"My father is tall"}
    ]
};

const DB_GEOGRAFIA = {
    inicial: [ 
        {q:"Capital de Argentina", ans:"Buenos Aires", opts:["Buenos Aires","Córdoba","Rosario"]},
        {q:"Capital de Uruguay", ans:"Montevideo", opts:["Montevideo","Punta del Este","Colonia"]},
        {q:"País con forma de bota", ans:"Italia", opts:["Italia","Francia","España"]},
        {q:"Dónde está la Torre Eiffel", ans:"Francia", opts:["Francia","Italia","Alemania"]},
        {q:"Bandera con un Sol", ans:"Argentina", opts:["Argentina","Chile","Perú"]}
        {q:"País de Buenos Aires", ans:"Argentina", opts:["Argentina","Brasil","Chile"]}, 
        {q:"País de Brasilia", ans:"Brasil", opts:["Brasil","Perú","Uruguay"]},
        {q:"País de Santiago", ans:"Chile", opts:["Chile","Argentina","Bolivia"]}, 
        {q:"País de Montevideo", ans:"Uruguay", opts:["Uruguay","Paraguay","Colombia"]},
        {q:"Continente de Argentina", ans:"América", opts:["América","Europa","Asia"]}, 
        {q:"País con forma de bota", ans:"Italia", opts:["Italia","España","Francia"]},
        {q:"Tiene la Torre Eiffel", ans:"Francia", opts:["Francia","Italia","Alemania"]}, 
        {q:"Capital de España", ans:"Madrid", opts:["Madrid","Barcelona","Sevilla"]},
        {q:"País del sushi", ans:"Japón", opts:["Japón","China","Corea"]}, 
        {q:"País de las pirámides", ans:"Egipto", opts:["Egipto","México","Perú"]},
    ],
    intermedia: [ 
        {q:"Capital de España", ans:"Madrid", opts:["Madrid","Barcelona","Sevilla"]},
        {q:"Capital de Brasil", ans:"Brasilia", opts:["Brasilia","Río de Janeiro","San Pablo"]},
        {q:"Capital de EEUU", ans:"Washington", opts:["Washington","Nueva York","Miami"]},
        {q:"Capital de Inglaterra", ans:"Londres", opts:["Londres","Liverpool","Manchester"]},
        {q:"País del Sushi", ans:"Japón", opts:["Japón","China","Corea"]}
    ],
    dificil: [ 
        {q:"Río más largo del mundo", ans:"Amazonas", opts:["Amazonas","Nilo","Misisipi"]},
        {q:"Capital de Alemania", ans:"Berlín", opts:["Berlín","Múnich","Hamburgo"]},
        {q:"Capital de Rusia", ans:"Moscú", opts:["Moscú","Kiev","San Petersburgo"]},
        {q:"Montaña más alta", ans:"Everest", opts:["Everest","Aconcagua","K2"]},
        {q:"Océano más grande", ans:"Pacífico", opts:["Pacífico","Atlántico","Índico"]}
    ],
    experta: [ 
        {q:"Capital de Australia", ans:"Canberra", opts:["Canberra","Sídney","Melbourne"]},
        {q:"Capital de Canadá", ans:"Ottawa", opts:["Ottawa","Toronto","Montreal"]},
        {q:"Capital de Turquía", ans:"Ankara", opts:["Ankara","Estambul","Antalya"]},
        {q:"Capital de Egipto", ans:"El Cairo", opts:["El Cairo","Alejandría","Giza"]},
        {q:"Continente de Kenia", ans:"África", opts:["África","Asia","Europa"]}
        {q:"Bandera 🇧🇷", ans:"Brasil", opts:["Brasil","Portugal","Bolivia"]}, 
        {q:"Bandera 🇺🇸", ans:"EEUU", opts:["EEUU","UK","Liberia"]},
        {q:"Bandera 🇯🇵", ans:"Japón", opts:["Japón","China","Corea"]}, 
        {q:"Bandera 🇪🇸", ans:"España", opts:["España","Italia","Francia"]},
        {q:"Bandera 🇨🇦", ans:"Canadá", opts:["Canadá","Perú","Austria"]}, 
        {q:"Bandera 🇩🇪", ans:"Alemania", opts:["Alemania","Bélgica","Holanda"]},
        {q:"Desierto más grande", ans:"Sahara", opts:["Sahara","Atacama","Gobi"]}, 
        {q:"Selva más grande", ans:"Amazonas", opts:["Amazonas","Congo","Misiones"]},
        {q:"Monte más alto", ans:"Everest", opts:["Everest","Aconcagua","K2"]}, 
        {q:"Capital de Australia", ans:"Canberra", opts:["Canberra","Sídney","Melbourne"]},
        {q:"Capital de Canadá", ans:"Ottawa", opts:["Ottawa","Toronto","Vancouver"]}, 
        {q:"Capital de Italia", ans:"Roma", opts:["Roma","Milán","Nápoles"]},
        {q:"Donde queda el Coliseo", ans:"Roma", opts:["Roma","Atenas","París"]}, 
        {q:"Donde queda Machu Picchu", ans:"Perú", opts:["Perú","Chile","Bolivia"]},
        {q:"Capital de Japón", ans:"Tokio", opts:["Tokio","Kioto","Osaka"]}, 
        {q:"Idioma de Brasil", ans:"Portugués", opts:["Portugués","Español","Inglés"]},
        {q:"Idioma de Inglaterra", ans:"Inglés", opts:["Inglés","Francés","Alemán"]}, 
        {q:"Moneda de Europa", ans:"Euro", opts:["Euro","Dólar","Peso"]},
        {q:"Moneda de EEUU", ans:"Dólar", opts:["Dólar","Euro","Libra"]}, 
        {q:"Continente de China", ans:"Asia", opts:["Asia","África","Europa"]},
        {q:"Continente de Kenia", ans:"África", opts:["África","Asia","Oceanía"]}, 
        {q:"Isla grande cerca de Australia", ans:"Nueva Zelanda", opts:["Nueva Zelanda","Japón","Madagascar"]},
        {q:"Polo donde hay pingüinos", ans:"Sur", opts:["Sur","Norte","Este"]}, 
        {q:"Polo donde hay osos", ans:"Norte", opts:["Norte","Sur","Oeste"]},
        {q:"Capital de Turquía", ans:"Ankara", opts:["Ankara","Estambul","Izmir"]}
    ],
    prodigio: [ 
        {q:"País más poblado", ans:"India", opts:["India","China","EEUU"]},
        {q:"Capital de Suiza", ans:"Berna", opts:["Berna","Zúrich","Ginebra"]},
        {q:"País más grande", ans:"Rusia", opts:["Rusia","Canadá","China"]},
        {q:"Capital de Marruecos", ans:"Rabat", opts:["Rabat","Casablanca","Marrakech"]},
        {q:"Estrecho entre España y África", ans:"Gibraltar", opts:["Gibraltar","Magallanes","Bering"]}
    ]
};

const DB_COMPUTING = {
    inicial: [ 
        {q:"Sirve para hacer clic", ans:"Mouse", opts:["Mouse","Teclado","Monitor"]},
        {q:"Sirve para ver", ans:"Monitor", opts:["Monitor","CPU","Parlante"]},
        {q:"Sirve para escribir", ans:"Teclado", opts:["Teclado","Mouse","Impresora"]},
        {q:"Cerebro de la PC", ans:"CPU", opts:["CPU","RAM","Disco"]},
        {q:"Saca hojas de papel", ans:"Impresora", opts:["Impresora","Escáner","Webcam"]}
    ],
    intermedia: [ 
        {q:"Navegador de internet", ans:"Chrome", opts:["Chrome","Word","Excel"]},
        {q:"Programa para escribir textos", ans:"Word", opts:["Word","Paint","Calculadora"]},
        {q:"Sistema Operativo", ans:"Windows", opts:["Windows","Office","Google"]},
        {q:"Red social de fotos", ans:"Instagram", opts:["Instagram","Excel","Outlook"]},
        {q:"Sitio de videos", ans:"YouTube", opts:["YouTube","Gmail","Maps"]}
    ],
    dificil: [ 
        {q:"Memoria temporal", ans:"RAM", opts:["RAM","Disco Duro","USB"]},
        {q:"Conexión sin cables", ans:"WiFi", opts:["WiFi","Ethernet","HDMI"]},
        {q:"Puerto para pendrive", ans:"USB", opts:["USB","VGA","Audio"]},
        {q:"Unidad de almacenamiento", ans:"Disco SSD", opts:["Disco SSD","CPU","Monitor"]},
        {q:"Lenguaje de páginas web", ans:"HTML", opts:["HTML","EXE","JPG"]}
    ],
    experta: [ 
        {q:"Procesador Gráfico", ans:"GPU", opts:["GPU","CPU","APU"]},
        {q:"Red de área local", ans:"LAN", opts:["LAN","WAN","PAN"]},
        {q:"Dirección única de red", ans:"IP", opts:["IP","DNS","URL"]},
        {q:"8 Bits equivalen a", ans:"1 Byte", opts:["1 Byte","1 Kilo","1 Mega"]},
        {q:"Sistema de código abierto", ans:"Linux", opts:["Linux","Windows","MacOS"]}
    ],
    prodigio: [ 
        {q:"Error en un programa", ans:"Bug", opts:["Bug","Feature","Virus"]},
        {q:"Bucle infinito", ans:"Loop", opts:["Loop","Crash","Break"]},
        {q:"Inteligencia Artificial", ans:"IA", opts:["IA","VR","AR"]},
        {q:"Base de Datos", ans:"SQL", opts:["SQL","HTML","CSS"]},
        {q:"Protección contra virus", ans:"Antivirus", opts:["Antivirus","Firewall","Spyware"]}
    ]
};

const DB_ALGORITMOS = {
    inicial: [{ title: "Lavarse los dientes", blocks: [{text: "Poner pasta", type: "blk-action"}, {text: "Cepillar", type: "blk-action"}, {text: "Enjuagar", type: "blk-action"}] }, 
            { title: "Plantar semilla", blocks: [{text: "Hacer pozo", type: "blk-action"}, {text: "Poner semilla", type: "blk-action"}, {text: "Tapar", type: "blk-action"}, {text: "Regar", type: "blk-action"}] }],
    intermedia: [{ title: "Robot Laberinto", blocks: [{text: "Inicio", type: "blk-event"}, {text: "Avanzar 2", type: "blk-action"}, {text: "Girar Derecha", type: "blk-action"}, {text: "Avanzar 1", type: "blk-action"}] }],
    dificil: [{ title: "Cuadrado", blocks: [{text: "Repetir 4", type: "blk-control"}, {text: "  Mover 100", type: "blk-action"}, {text: "  Girar 90", type: "blk-action"}, {text: "Fin Repetir", type: "blk-control"}] }],
    experta: [{ title: "Semáforo", blocks: [{text: "Mirar luz", type: "blk-action"}, {text: "SI es Verde", type: "blk-control"}, {text: "  Cruzar", type: "blk-action"}, {text: "SINO", type: "blk-control"}, {text: "  Esperar", type: "blk-action"}] }],
    prodigio: [{ title: "Lluvia", blocks: [{text: "SI llueve", type: "blk-control"}, {text: "  ¿Tengo paraguas?", type: "blk-logic"}, {text: "    SI: Usarlo", type: "blk-action"}, {text: "    NO: Correr", type: "blk-action"}, {text: "SINO", type: "blk-control"}, {text: "  Caminar", type: "blk-action"}] }]
};

const DEFAULT_SHOP = [
    {id:'t1', name:'Camisa Steve', type:'torso', color:'#29b6f6', price:0},
    {id:'l1', name:'Pantalón Azul', type:'legs', color:'#3f51b5', price:0},
    {id:'h1', name:'Piel Base', type:'head', color:'#ffcc80', price:0},
    {id:'t2', name:'Camisa Creeper', type:'torso', color:'https://i.imgur.com/u3l2j1S.png', price:100},
    {id:'h2', name:'Cara Zombie', type:'head', color:'#66bb6a', price:150},
    {id:'t3', name:'Oro Puro', type:'torso', color:'#fbc02d', price:200}
];

// ==========================================
// 3. ESTADO DEL JUEGO
// ==========================================
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
let currentSession = { subject: null, level: 1, startTime: null, backspaces: 0, pythonValid: [], pythonOut: "" };
let timerInterval = null; 
let currentPuzzleSolution = []; 

// ==========================================
// 4. INICIALIZACIÓN
// ==========================================
window.onload = function() {
    if(localStorage.getItem('eduPlayer')) {
        try {
            let saved = JSON.parse(localStorage.getItem('eduPlayer'));
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
    for(let i=1; i<=50; i++) { // 50 Niveles
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

// =========================================================
// 5. MOTOR DE GENERACIÓN DE NIVELES (PROCEDURAL & DATA)
// =========================================================
function generateProceduralLevel(container, subj, lvl) {
    let q, ans, opts;
    const grade = player.grade; 

    // --- MATEMÁTICA ---
    if (subj === 'matematica') {
        let n1, n2, n3;
        
        if (grade === 'inicial') {
            if (lvl <= 25) {
                n1 = lvl; n2 = Math.floor(Math.random() * 5) + 1;
                q = `¿${n1} + ${n2}?`; ans = n1 + n2;
            } else {
                n1 = Math.floor(Math.random() * 10) + 5; n2 = Math.floor(Math.random() * 5) + 1; 
                let mayor = Math.max(n1, n2) + (lvl - 25); let menor = Math.min(n1, n2);
                q = `¿${mayor} - ${menor}?`; ans = mayor - menor;
            }
        } 
        else if (grade === 'intermedia') {
            if (lvl <= 25) {
                n1 = 10 + lvl; n2 = Math.floor(Math.random() * 20) + 5;
                q = `¿${n1} + ${n2}?`; ans = n1 + n2;
            } else {
                n1 = 30 + lvl; n2 = Math.floor(Math.random() * 20) + 10;
                q = `¿${n1} - ${n2}?`; ans = n1 - n2;
            }
        } 
        else if (grade === 'dificil') {
            let table = Math.floor((lvl - 1) / 5) + 2; if(table > 12) table = 12;
            n2 = (lvl % 10) + 1; 
            if (n2 === 1 || Math.random() > 0.5) n2 = Math.floor(Math.random() * 9) + 2; 
            q = `¿${table} x ${n2}?`; ans = table * n2;
        } 
        else if (grade === 'experta') {
            if (lvl <= 25) { 
                n2 = Math.floor(Math.random() * 8) + 2; ans = lvl + 2; n1 = n2 * ans; 
                q = `¿${n1} / ${n2}?`; 
            } else { 
                n1 = Math.floor(Math.random() * 10) + 1; n2 = Math.floor(Math.random() * 10) + 1; n3 = 2;
                q = `(${n1} + ${n2}) x ${n3}`; ans = (n1 + n2) * n3;
            }
        } 
        // 5. PRODIGIO (DINÁMICO)
        else if (grade === 'prodigio') {
            if (lvl <= 20) {
                if (Math.random() > 0.5) {
                    let base = Math.floor(Math.random() * 6) + 2 + Math.floor(lvl/4); 
                    let exp = (Math.random() > 0.8) ? 3 : 2;
                    q = `¿${base} ${exp===2 ? 'al cuadrado' : 'al cubo'}? (${base}${exp===2?'²':'³'})`; 
                    ans = Math.pow(base, exp);
                } else {
                    let res = Math.floor(Math.random() * 8) + 2 + Math.floor(lvl/3);
                    let radicando = res * res;
                    q = `Raíz cuadrada de ${radicando} (√${radicando})`; 
                    ans = res;
                }
            } 
            else if (lvl <= 40) { 
                let x = Math.floor(Math.random() * 15) + 1;
                let a = Math.floor(Math.random() * 4) + 2;
                let b = Math.floor(Math.random() * 20) + 5;
                let c = (a * x) + b;
                q = `Hallar X:  ${a}x + ${b} = ${c}`; ans = x;
            } 
            else { 
                if (Math.random() > 0.5) {
                    let perc = [10, 20, 25, 50][Math.floor(Math.random()*4)];
                    let total = Math.floor(Math.random() * 20 + 1) * 10;
                    q = `¿${perc}% de ${total}?`; ans = (perc * total) / 100;
                } else {
                    let A = Math.floor(Math.random() * 10) + 5;
                    let B = Math.floor(Math.random() * 10) + 2;
                    let C = Math.floor(Math.random() * 20) + 5;
                    q = `(${A} x ${B}) - ${C}`; ans = (A*B) - C;
                }
            }
        }

        let distractor1 = ans + Math.floor(Math.random() * 5) + 1;
        let distractor2 = ans - Math.floor(Math.random() * 5) - 1;
        let distractor3 = ans + 10;
        opts = [ans, distractor1, distractor2, distractor3];
        opts = [...new Set(opts)].sort(() => Math.random() - 0.5);

        renderQuestion(container, q, ans, opts);
        return;
    }

    // --- PYTHON (TEORÍA + SIMULADOR MEJORADO) ---
    else if (subj === 'python') {
        let isTheory = (lvl % 2 !== 0) && (grade !== 'experta' && grade !== 'prodigio');

        if (isTheory) { 
            // TEORÍA
            const pool = DB_PYTHON_THEORY[grade] || DB_PYTHON_THEORY['inicial'];
            const index = Math.floor((lvl - 1) / 2) % pool.length;
            const item = pool[index];
            q = `<span style="font-size:0.8rem; color:#1565c0;">TEORÍA:</span><br>${item.q}`;
            ans = item.ans; opts = [...item.opts].sort(() => Math.random() - 0.5);
            renderQuestion(container, q, ans, opts);
        } 
        else { 
            // SIMULADOR (CÓDIGO)
            let mision, hint, valid, output;

            if (grade === 'inicial') {
                mision = `Usa print para mostrar el número ${lvl}`; 
                hint = `print(${lvl})`; valid = [`print(${lvl})`]; output = `${lvl}`;
            } 
            else if (grade === 'intermedia') {
                let v = lvl * 5;
                mision = `Crea variable 'puntos' igual a ${v}`; 
                hint = `puntos = ${v}`; valid = [`puntos=${v}`, `puntos = ${v}`]; output = `Variable puntos: ${v}`;
            } 
            else if (grade === 'dificil') {
                mision = `Si ${lvl} > 5, imprime "Mayor"`; 
                hint = `if ${lvl} > 5: print("Mayor")`; 
                valid = [`if ${lvl} > 5: print("Mayor")`, `if ${lvl}>5: print("Mayor")`]; 
                output = "Mayor";
            } 
            else if (grade === 'experta') {
                if (lvl <= 10) {
                    const vars = ['x','y','z','puntos','vida','score'];
                    const varName = vars[Math.floor(Math.random()*vars.length)];
                    if(Math.random()>0.5) {
                        const val = Math.floor(Math.random()*50)+1;
                        mision = `Crea variable '${varName}' con valor ${val}`; hint = `${varName} = ${val}`;
                        valid = [`${varName}=${val}`, `${varName} = ${val}`]; output = `Variable ${varName}: ${val}`;
                    } else {
                        const txts = ['Hola','Juego','Python','Win'];
                        const val = txts[Math.floor(Math.random()*txts.length)];
                        mision = `Crea variable '${varName}' con texto "${val}"`; hint = `${varName} = "${val}"`;
                        valid = [`${varName}="${val}"`, `${varName} = "${val}"`, `${varName}='${val}'`, `${varName} = '${val}'`]; output = `Variable ${varName}: ${val}`;
                    }
                } else if (lvl <= 20) {
                    let n1 = Math.floor(Math.random()*20)+1; let n2 = Math.floor(Math.random()*10)+1;
                    const op = Math.random()>0.5 ? '+' : '-';
                    mision = `Imprime el resultado de ${n1} ${op} ${n2}`; hint = `print(${n1} ${op} ${n2})`;
                    valid = [`print(${n1}${op}${n2})`, `print(${n1} ${op} ${n2})`]; output = eval(`${n1}${op}${n2}`);
                } else if (lvl <= 30) {
                    const items = [Math.floor(Math.random()*9), Math.floor(Math.random()*9)];
                    mision = `Crea lista 'L' con números ${items[0]} y ${items[1]}`; hint = `L = [${items[0]}, ${items[1]}]`;
                    valid = [`L=[${items[0]},${items[1]}]`, `L = [${items[0]}, ${items[1]}]`]; output = `Lista L creada.`;
                } else if (lvl <= 40) {
                    let r = Math.floor(Math.random()*5)+2;
                    mision = `Bucle que repita "Gol" ${r} veces`; hint = `for i in range(${r}): print("Gol")`;
                    valid = [`for i in range(${r}): print("Gol")`, `for x in range(${r}): print("Gol")`]; output = "Gol\n...";
                } else {
                    const fnames = ['ver','correr','saltar','jugar'];
                    const fname = fnames[Math.floor(Math.random()*fnames.length)];
                    mision = `Define función '${fname}' que imprima "Ok"`; hint = `def ${fname}(): print("Ok")`;
                    valid = [`def ${fname}(): print("Ok")`]; output = `Función definida.`;
                }
            }
            // --- MODIFICACIÓN: PRODIGIO DINÁMICO ---
            else { 
                const challengeType = Math.floor(Math.random() * 5); // 0 a 4
                if (challengeType === 0) {
                    mision = "Define función 'area(b,h)' que retorne b*h";
                    hint = "def area(b,h): return b*h";
                    valid = ["def area(b,h): return b*h", "def area(b, h): return b * h"];
                    output = "Area calculada.";
                } else if (challengeType === 1) {
                    mision = "Define función 'ultimo(L)' que retorne el último ítem";
                    hint = "def ultimo(L): return L[-1]";
                    valid = ["def ultimo(L): return L[-1]"];
                    output = "Elemento retornado.";
                } else if (challengeType === 2) {
                    mision = "Define función 'mayor(a,b)' que retorne el mayor (usa max)";
                    hint = "def mayor(a,b): return max(a,b)";
                    valid = ["def mayor(a,b): return max(a,b)", "def mayor(a, b): return max(a, b)"];
                    output = "Mayor retornado.";
                } else if (challengeType === 3) {
                    mision = "Define función 'texto(s)' que retorne el texto en mayúsculas (upper)";
                    hint = "def texto(s): return s.upper()";
                    valid = ["def texto(s): return s.upper()"];
                    output = "Texto MAYÚSCULAS.";
                } else {
                    mision = "Define función 'es_par(n)' que retorne True si n%2==0";
                    hint = "def es_par(n): return n%2==0";
                    valid = ["def es_par(n): return n%2==0", "def es_par(n): return n % 2 == 0"];
                    output = "Booleano retornado.";
                }
            }

            currentSession.pythonValid = valid;
            currentSession.pythonOut = output;
            
            container.innerHTML = `<div class="ide-container"><div style="background:#263238; color:#fff; padding:10px; border-radius:5px 5px 0 0; border-bottom:2px solid #37474f;"><strong>🐍 PYTHON IDE - Nivel ${lvl}</strong></div><div style="background:#eceff1; padding:10px; color:#37474f; font-size:0.9rem;"><strong>Misión:</strong> ${mision}<br><small style="color:#0277bd;">💡 Pista: ${hint}</small></div><textarea id="pyEditor" class="code-editor" spellcheck="false" placeholder=">>> Escribe tu código aquí..."></textarea><button class="run-btn" onclick="runPythonCode()">▶ EJECUTAR CÓDIGO</button><div style="background:#000; color:#0f0; font-family:monospace; padding:10px; border-radius:0 0 5px 5px; min-height:60px;"><span style="color:#666;">Salida de consola:</span><br><span id="pyConsole">Esperando ejecución...</span></div></div>`;
        }
        return;
    }

    // --- TECLADO / TYPING ---
    else if (subj === 'teclado') {
        let target = "", prompt = "";
        let isProdigio = (player.grade === 'prodigio');
        
        if (player.grade === 'inicial') {
            const pool = DB_TECLADO.inicial; target = pool[(lvl - 1) % pool.length]; if(lvl > pool.length) target = pool[Math.floor(Math.random()*pool.length)]; prompt = "Encuentra la tecla exacta:";
        } else if (player.grade === 'intermedia') {
            const pool = DB_TECLADO.intermedia; target = pool[(lvl - 1) % pool.length];
            if (lvl <= 25) prompt = "Escribe la frase (Respeta Mayúsculas):"; else prompt = "Encuentra el símbolo:";
        } else if (player.grade === 'dificil') {
            const pool = DB_TECLADO.dificil; let subPool = [];
            if (lvl <= 15) { subPool = pool.sinTilde; prompt = "Frase compleja (Sin tildes):"; }
            else if (lvl <= 30) { subPool = pool.conTildeFacil; prompt = "Atención a las tildes:"; }
            else if (lvl <= 40) { subPool = pool.conTildeDificil; prompt = "Frase compleja con tildes:"; }
            else { subPool = pool.dieresis; prompt = "Palabras con Diéresis (ü):"; }
            target = subPool[Math.floor(Math.random() * subPool.length)];
        } else if (player.grade === 'experta') {
            const pool = DB_TECLADO.experta; target = pool[(lvl - 1) % pool.length]; prompt = "Escribe la oración exacta:";
        } else {
            const pool = DB_TECLADO.prodigio; target = pool[(lvl - 1) % pool.length]; prompt = "Velocidad (PPM):";
        }

        ans = target;
        let inputStyle = "text-align:center; font-size:1.2rem; width:100%; padding:15px;";
        let statsHTML = '';
        if (isProdigio) {
            statsHTML = `<div class="stats-bar" style="display:flex; justify-content:space-around; background:#263238; color:#fff; padding:10px; margin-bottom:15px; border-radius:5px;"><div class="stats-item">⏱️ <span id="timeCounter">0.0s</span></div><div class="stats-item">🚀 <span id="wpmCounter" style="color:#00e676; font-weight:bold;">0 PPM</span></div><div class="stats-item">❌ <span id="errCounter" class="stat-danger">0</span></div></div>`;
        }
        container.innerHTML = `${statsHTML}<div style="color:#78909c; font-size:0.9rem; margin-bottom:5px;">${prompt}</div><div style="background:#fff; padding:15px; border-radius:8px; border:2px solid #ccc; margin-bottom:15px; font-family:'Roboto Mono', monospace;"><h3 style="color:#333; margin:0; font-size:${ans.length > 25 ? '1rem' : '1.5rem'}; word-break:break-word;">${ans}</h3></div><input type="text" id="typingInput" autocomplete="off" style="${inputStyle}" placeholder="Escribe aquí..."><button class="mc-btn green" style="width:100%; margin-top:15px;" onclick="checkAnswer(document.getElementById('typingInput').value, '${ans.replace(/'/g, "\\'")}', true)">Confirmar</button>`;
        
        setTimeout(() => { 
            const inp = document.getElementById('typingInput'); 
            if(inp) { 
                inp.focus(); 
                inp.oninput = () => { if(!currentSession.startTime && isProdigio) { currentSession.startTime = new Date(); timerInterval = setInterval(() => { if(!currentSession.startTime) return; const diff = (new Date() - currentSession.startTime) / 1000; document.getElementById('timeCounter').innerText = diff.toFixed(1) + 's'; const chars = inp.value.length; const mins = diff / 60; const wpm = (mins > 0) ? Math.round((chars / 5) / mins) : 0; document.getElementById('wpmCounter').innerText = wpm + " PPM"; }, 100); } }; 
                inp.onkeydown = (e) => { if(isProdigio && e.key === 'Backspace') { currentSession.backspaces++; document.getElementById('errCounter').innerText = currentSession.backspaces; } if(e.key === 'Enter') checkAnswer(inp.value, ans, true); }; 
            }
        }, 50);
        return;
    }

    // --- TRIVIA (INGLES, GEO, COMPU) ---
    else {
        let dbTarget;
        if (subj === 'ingles') dbTarget = DB_INGLES;
        else if (subj === 'Geografia') dbTarget = DB_GEOGRAFIA;
        else if (subj === 'compu') dbTarget = DB_COMPUTING;
        
        if (subj === 'ingles' && grade === 'prodigio') {
             const pool = dbTarget.prodigio;
             const index = (lvl - 1) % pool.length;
             const item = pool[index];
             ans = item.ans;
             container.innerHTML = `<h3 style="color:#555;">Traduce al Inglés:</h3><div style="background:#fff; padding:15px; border-radius:8px; border:2px solid #ccc; margin-bottom:15px;"><h2 style="color:#1565c0; margin:0;">"${item.q}"</h2></div><input type="text" id="translInput" autocomplete="off" style="text-align:center; font-size:1.2rem; width:100%; padding:10px;" placeholder="Escribe en inglés..."><button class="mc-btn green" style="width:100%; margin-top:15px;" onclick="checkAnswer(document.getElementById('translInput').value, '${ans.replace(/'/g, "\\'")}', false)">Comprobar</button>`;
             
             setTimeout(() => {
                const inp = document.getElementById('translInput');
                if(inp) {
                    inp.focus();
                    inp.onkeydown = (e) => {
                        if (e.key === 'Enter') {
                            checkAnswer(inp.value, ans, false); // false = no strict
                        }
                    };
                }
             }, 50);
             return;
        }

        const difficultyArray = dbTarget[grade] || [];
        const index = (lvl - 1) % difficultyArray.length;
        const item = difficultyArray[index];
        if(item) {
            q = item.q; ans = item.ans; opts = [...item.opts].sort(() => Math.random() - 0.5);
            renderQuestion(container, q, ans, opts);
        } else { container.innerHTML = "<h3>¡Fin del contenido por ahora!</h3>"; }
    }
}

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

// 8. LÓGICA DE PYTHON (IDE)
function runPythonCode() {
    const code = document.getElementById('pyEditor').value;
    const cons = document.getElementById('pyConsole');
    
    // Recuperamos de memoria global
    const valid = currentSession.pythonValid;
    const expectedOutput = currentSession.pythonOut;
    
    cons.innerText = "Procesando...";
    cons.style.color = "#ffff00"; 

    setTimeout(() => {
        let userClean = code.trim()
                            .replace(/[“”]/g, '"')
                            .replace(/[‘’]/g, "'")
                            .replace(/'/g, '"') 
                            .replace(/\s*([=+\-*/(),:])\s*/g, '$1'); 

        const match = valid.some(v => {
             let validClean = v.trim()
                               .replace(/[“”]/g, '"')
                               .replace(/[‘’]/g, "'")
                               .replace(/'/g, '"')
                               .replace(/\s*([=+\-*/(),:])\s*/g, '$1');
             return userClean === validClean;
        });
        
        if (match) {
            cons.style.color = "#00e676"; 
            cons.innerHTML = `>>> ${code}<br>${expectedOutput}<br><br><span style='color:#aaa'>[Process finished with exit code 0]</span>`;
            successAction("¡Código Compilado con Éxito! +30 🪙", 30);
        } else {
            cons.style.color = "#ff5252"; 
            cons.innerHTML = `Traceback (most recent call last):<br>  File "main.py", line 1<br>    ${code}<br><strong>SyntaxError:</strong> El código no hace lo que pide la misión.<br>Intenta guiarte por la pista.`;
            failAction("Error de Sintaxis");
            const editor = document.getElementById('pyEditor');
            editor.classList.add('shake-anim');
            setTimeout(() => editor.classList.remove('shake-anim'), 500);
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
function checkAnswer(user, correct, strict = false) {
    let isCorrect = false;
    let u = String(user).trim();
    let c = String(correct).trim();

    if (strict) {
        if (u === c) isCorrect = true; // Estricto (Teclado)
    } else {
        if (u.toUpperCase() === c.toUpperCase()) isCorrect = true; // Flexible
    }
    
    if (isCorrect) successAction("¡Correcto! +20 🪙", 20);
    else failAction("Incorrecto -10 🪙");
}

function successAction(msg, coins) {
    player.coins += coins;
    if(currentSession.level === player.progress[player.grade][currentSession.subject]) player.progress[player.grade][currentSession.subject]++;
    saveData(); updateUI(); showToast(msg);
    if(timerInterval) clearInterval(timerInterval);
    setTimeout(() => { if(currentSession.level < 50) playLevel(currentSession.level + 1); else closeGame(); }, 1000);
}

function failAction(msg) {
    player.coins = Math.max(0, player.coins - 10);
    saveData(); updateUI(); showToast(msg, 'error');
}

function updateUsername(val) { player.name = val; saveData(); }

function changeGrade() { 
    player.grade = document.getElementById('gradeSelect').value; 
    updateUI(); 
    
    if (document.getElementById('view-map').style.display !== 'none') {
        renderMap(); 
    }
    
    if (document.getElementById('gameModal').style.display !== 'none') {
        closeGame();
        showToast("Dificultad cambiada: Nivel reiniciado", "error");
    } else {
        showToast(`Dificultad: ${player.grade.toUpperCase()}`);
    }
}

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