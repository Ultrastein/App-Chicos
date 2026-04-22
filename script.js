// ==========================================
// 1. GAME CONTENT DATABASE (Scalable)
// ==========================================

const GAME_CONTENT = {
    teclado: {
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
    },
    python: {
        inicial: [
            { q: "¿Para qué sirve print()?", ans: "Mostrar texto en pantalla", opts: ["Mostrar texto en pantalla", "Imprimir en papel", "Borrar todo"] },
            { q: "¿Qué son las comillas \" \"?", ans: "Indican texto (String)", opts: ["Indican texto (String)", "Son para decorar", "Son para multiplicar"] },
            { q: "¿Cómo se escribe Hola?", ans: "print(\"Hola\")", opts: ["print(\"Hola\")", "escribir Hola", "imprimir(Hola)"] },
            { q: "¿Qué es un SyntaxError?", ans: "Un error de escritura", opts: ["Un error de escritura", "Un virus", "Un premio"] },
            { q: "¿El código se lee de...?", ans: "Arriba a abajo", opts: ["Arriba a abajo", "Abajo a arriba", "Derecha a izquierda"] }
        ],
        intermedia: [
            { q: "¿Qué es una variable?", ans: "Una caja para guardar datos", opts: ["Una caja para guardar datos", "Una variante", "Un número fijo"] },
            { q: "Si x = 10, ¿cuánto vale x?", ans: "10", opts: ["10", "x", "0"] },
            { q: "¿Cómo guardas tu nombre?", ans: "nombre = \"Juan\"", opts: ["nombre = \"Juan\"", "Juan = nombre", "nombre: Juan"] },
            { q: "¿Qué es un Integer (int)?", ans: "Un número entero", opts: ["Un número entero", "Un texto", "Un decimal"] },
            { q: "¿Qué signo se usa para asignar?", ans: "=", opts: ["=", "==", ":"] }
        ],
        dificil: [
            { q: "¿Para qué sirve 'if'?", ans: "Para tomar decisiones", opts: ["Para tomar decisiones", "Para repetir", "Para terminar"] },
            { q: "¿Qué significa 'else'?", ans: "Si no, haz esto otro", opts: ["Si no, haz esto otro", "Entonces", "Repetir"] },
            { q: "¿Cuál es Verdadero?", ans: "True", opts: ["True", "False", "Verdad"] },
            { q: "El signo mayor que es...", ans: ">", opts: [">", "<", "="] },
            { q: "Si 5 > 2...", ans: "Es verdadero (True)", opts: ["Es verdadero (True)", "Es falso (False)", "Da error"] }
        ]
    },
    ingles: {
        inicial: [
            { q: "Red", ans: "Rojo", opts: ["Rojo", "Verde", "Azul"] }, { q: "Blue", ans: "Azul", opts: ["Azul", "Rojo", "Amarillo"] },
            { q: "One", ans: "Uno", opts: ["Uno", "Dos", "Diez"] }, { q: "Cat", ans: "Gato", opts: ["Gato", "Perro", "Pez"] },
            { q: "Dog", ans: "Perro", opts: ["Perro", "Gato", "Vaca"] }, { q: "Yellow", ans: "Amarillo", opts: ["Amarillo", "Negro", "Blanco"] },
            { q: "Ten", ans: "Diez", opts: ["Diez", "Uno", "Cero"] }, { q: "Fish", ans: "Pez", opts: ["Pez", "Pollo", "León"] },
            { q: "Sun", ans: "Sol", opts: ["Sol", "Luna", "Estrella"] }, { q: "Moon", ans: "Luna", opts: ["Luna", "Sol", "Mar"] }
        ],
        intermedia: [
            { q: "Table", ans: "Mesa", opts: ["Mesa", "Silla", "Cama"] }, { q: "Chair", ans: "Silla", opts: ["Silla", "Mesa", "Puerta"] },
            { q: "To Run", ans: "Correr", opts: ["Correr", "Saltar", "Comer"] }, { q: "To Eat", ans: "Comer", opts: ["Comer", "Beber", "Dormir"] },
            { q: "Window", ans: "Ventana", opts: ["Ventana", "Pared", "Piso"] }, { q: "Door", ans: "Puerta", opts: ["Puerta", "Llave", "Casa"] },
            { q: "Book", ans: "Libro", opts: ["Libro", "Papel", "Lápiz"] }, { q: "School", ans: "Escuela", opts: ["Escuela", "Casa", "Parque"] },
            { q: "Teacher", ans: "Maestro", opts: ["Maestro", "Alumno", "Doctor"] }, { q: "Student", ans: "Estudiante", opts: ["Estudiante", "Profesor", "Director"] }
        ],
        dificil: [
            { q: "Yesterday", ans: "Ayer", opts: ["Ayer", "Hoy", "Mañana"] }, { q: "Tomorrow", ans: "Mañana", opts: ["Mañana", "Ayer", "Siempre"] },
            { q: "Beautiful", ans: "Hermoso", opts: ["Hermoso", "Feo", "Triste"] }, { q: "Ugly", ans: "Feo", opts: ["Feo", "Lindo", "Rápido"] },
            { q: "Fast", ans: "Rápido", opts: ["Rápido", "Lento", "Quieto"] }, { q: "Slow", ans: "Lento", opts: ["Lento", "Rápido", "Fuerte"] },
            { q: "Happy", ans: "Feliz", opts: ["Feliz", "Triste", "Enojado"] }, { q: "Angry", ans: "Enojado", opts: ["Enojado", "Feliz", "Cansado"] },
            { q: "Always", ans: "Siempre", opts: ["Siempre", "Nunca", "A veces"] }, { q: "Never", ans: "Nunca", opts: ["Nunca", "Siempre", "Quizás"] }
        ],
        experta: [
            { q: "I am playing", ans: "Estoy jugando", opts: ["Estoy jugando", "Jugué", "Jugaré"] },
            { q: "She is smart", ans: "Ella es lista", opts: ["Ella es lista", "El es listo", "Soy listo"] },
            { q: "We are friends", ans: "Somos amigos", opts: ["Somos amigos", "Son amigos", "Fueron amigos"] },
            { q: "Where is the cat?", ans: "¿Dónde está el gato?", opts: ["¿Dónde está el gato?", "¿Quién es el gato?", "¿Qué es el gato?"] },
            { q: "I don't know", ans: "No lo sé", opts: ["No lo sé", "Lo sé", "Tal vez"] },
            { q: "The book is on the table", ans: "El libro está en la mesa", opts: ["El libro está en la mesa", "El libro es la mesa", "La mesa es el libro"] },
            { q: "He has a car", ans: "Él tiene un auto", opts: ["Él tiene un auto", "Ella tiene un auto", "Él es un auto"] }
        ],
        prodigio: [
            { q: "Hola", ans: "Hello" }, { q: "Buenos días", ans: "Good morning" },
            { q: "Adiós", ans: "Goodbye" }, { q: "Por favor", ans: "Please" },
            { q: "Gracias", ans: "Thank you" }, { q: "De nada", ans: "You are welcome" },
            { q: "Sí", ans: "Yes" }, { q: "No", ans: "No" },
            { q: "Yo soy", ans: "I am" }, { q: "Ella es", ans: "She is" },
            { q: "El gato es negro", ans: "The cat is black" }, { q: "El perro es grande", ans: "The dog is big" },
            { q: "Me gusta jugar", ans: "I like to play" }, { q: "Mi nombre es Juan", ans: "My name is Juan" },
            { q: "Tengo hambre", ans: "I am hungry" }, { q: "Tengo sed", ans: "I am thirsty" },
            { q: "¿Dónde está el baño?", ans: "Where is the bathroom?" }, { q: "¿Cómo estás?", ans: "How are you?" },
            { q: "Estoy bien", ans: "I am fine" }, { q: "El auto es rojo", ans: "The car is red" },
            { q: "La casa es azul", ans: "The house is blue" }, { q: "Hoy es lunes", ans: "Today is Monday" },
            { q: "Mañana es martes", ans: "Tomorrow is Tuesday" }, { q: "Me gusta la pizza", ans: "I like pizza" },
            { q: "No me gusta esto", ans: "I do not like this" }, { q: "Somos amigos", ans: "We are friends" },
            { q: "Ellos son felices", ans: "They are happy" }, { q: "El sol brilla", ans: "The sun is shining" },
            { q: "Abre la puerta", ans: "Open the door" }, { q: "Cierra la ventana", ans: "Close the window" },
            { q: "Feliz cumpleaños", ans: "Happy birthday" }, { q: "Buenas noches", ans: "Good night" },
            { q: "Hasta luego", ans: "See you later" }, { q: "Te quiero", ans: "I love you" },
            { q: "Yo puedo correr", ans: "I can run" }, { q: "Ella puede cantar", ans: "She can sing" },
            { q: "Es muy tarde", ans: "It is very late" }, { q: "Es temprano", ans: "It is early" },
            { q: "¿Qué hora es?", ans: "What time is it?" }, { q: "Es un libro", ans: "It is a book" },
            { q: "Esta es mi escuela", ans: "This is my school" }, { q: "Quiero agua", ans: "I want water" },
            { q: "Necesito ayuda", ans: "I need help" }, { q: "¿Puedes ayudarme?", ans: "Can you help me?" },
            { q: "El cielo es azul", ans: "The sky is blue" }, { q: "La flor es bonita", ans: "The flower is beautiful" },
            { q: "Tengo un hermano", ans: "I have a brother" }, { q: "Tengo una hermana", ans: "I have a sister" },
            { q: "Mi madre es buena", ans: "My mother is good" }, { q: "Mi padre es alto", ans: "My father is tall" }
        ]
    },
    geografia: {
        inicial: [
            { q: "Capital de Argentina", ans: "Buenos Aires", opts: ["Buenos Aires", "Córdoba", "Rosario"] },
            { q: "Capital de Uruguay", ans: "Montevideo", opts: ["Montevideo", "Punta del Este", "Colonia"] },
            { q: "País con forma de bota", ans: "Italia", opts: ["Italia", "Francia", "España"] },
            { q: "Dónde está la Torre Eiffel", ans: "Francia", opts: ["Francia", "Italia", "Alemania"] },
            { q: "Bandera con un Sol", ans: "Argentina", opts: ["Argentina", "Chile", "Perú"] },
            { q: "País de Buenos Aires", ans: "Argentina", opts: ["Argentina", "Brasil", "Chile"] },
            { q: "País de Brasilia", ans: "Brasil", opts: ["Brasil", "Perú", "Uruguay"] },
            { q: "País de Santiago", ans: "Chile", opts: ["Chile", "Argentina", "Bolivia"] },
            { q: "País de Montevideo", ans: "Uruguay", opts: ["Uruguay", "Paraguay", "Colombia"] },
            { q: "Continente de Argentina", ans: "América", opts: ["América", "Europa", "Asia"] },
            { q: "País con forma de bota", ans: "Italia", opts: ["Italia", "España", "Francia"] },
            { q: "Tiene la Torre Eiffel", ans: "Francia", opts: ["Francia", "Italia", "Alemania"] },
            { q: "Capital de España", ans: "Madrid", opts: ["Madrid", "Barcelona", "Sevilla"] },
            { q: "País del sushi", ans: "Japón", opts: ["Japón", "China", "Corea"] },
            { q: "País de las pirámides", ans: "Egipto", opts: ["Egipto", "México", "Perú"] },
        ],
        intermedia: [
            { q: "Capital de España", ans: "Madrid", opts: ["Madrid", "Barcelona", "Sevilla"] },
            { q: "Capital de Brasil", ans: "Brasilia", opts: ["Brasilia", "Río de Janeiro", "San Pablo"] },
            { q: "Capital de EEUU", ans: "Washington", opts: ["Washington", "Nueva York", "Miami"] },
            { q: "Capital de Inglaterra", ans: "Londres", opts: ["Londres", "Liverpool", "Manchester"] },
            { q: "País del Sushi", ans: "Japón", opts: ["Japón", "China", "Corea"] }
        ],
        dificil: [
            { q: "Río más largo del mundo", ans: "Amazonas", opts: ["Amazonas", "Nilo", "Misisipi"] },
            { q: "Capital de Alemania", ans: "Berlín", opts: ["Berlín", "Múnich", "Hamburgo"] },
            { q: "Capital de Rusia", ans: "Moscú", opts: ["Moscú", "Kiev", "San Petersburgo"] },
            { q: "Montaña más alta", ans: "Everest", opts: ["Everest", "Aconcagua", "K2"] },
            { q: "Océano más grande", ans: "Pacífico", opts: ["Pacífico", "Atlántico", "Índico"] }
        ],
        experta: [
            { q: "Capital de Australia", ans: "Canberra", opts: ["Canberra", "Sídney", "Melbourne"] },
            { q: "Capital de Canadá", ans: "Ottawa", opts: ["Ottawa", "Toronto", "Montreal"] },
            { q: "Capital de Turquía", ans: "Ankara", opts: ["Ankara", "Estambul", "Antalya"] },
            { q: "Capital de Egipto", ans: "El Cairo", opts: ["El Cairo", "Alejandría", "Giza"] },
            { q: "Continente de Kenia", ans: "África", opts: ["África", "Asia", "Europa"] },
            { q: "Bandera 🇧🇷", ans: "Brasil", opts: ["Brasil", "Portugal", "Bolivia"] },
            { q: "Bandera 🇺🇸", ans: "EEUU", opts: ["EEUU", "UK", "Liberia"] },
            { q: "Bandera 🇯🇵", ans: "Japón", opts: ["Japón", "China", "Corea"] },
            { q: "Bandera 🇪🇸", ans: "España", opts: ["España", "Italia", "Francia"] },
            { q: "Bandera 🇨🇦", ans: "Canadá", opts: ["Canadá", "Perú", "Austria"] },
            { q: "Bandera 🇩🇪", ans: "Alemania", opts: ["Alemania", "Bélgica", "Holanda"] },
            { q: "Desierto más grande", ans: "Sahara", opts: ["Sahara", "Atacama", "Gobi"] },
            { q: "Selva más grande", ans: "Amazonas", opts: ["Amazonas", "Congo", "Misiones"] },
            { q: "Monte más alto", ans: "Everest", opts: ["Everest", "Aconcagua", "K2"] },
            { q: "Capital de Australia", ans: "Canberra", opts: ["Canberra", "Sídney", "Melbourne"] },
            { q: "Capital de Canadá", ans: "Ottawa", opts: ["Ottawa", "Toronto", "Vancouver"] },
            { q: "Capital de Italia", ans: "Roma", opts: ["Roma", "Milán", "Nápoles"] },
            { q: "Donde queda el Coliseo", ans: "Roma", opts: ["Roma", "Atenas", "París"] },
            { q: "Donde queda Machu Picchu", ans: "Perú", opts: ["Perú", "Chile", "Bolivia"] },
            { q: "Capital de Japón", ans: "Tokio", opts: ["Tokio", "Kioto", "Osaka"] },
            { q: "Idioma de Brasil", ans: "Portugués", opts: ["Portugués", "Español", "Inglés"] },
            { q: "Idioma de Inglaterra", ans: "Inglés", opts: ["Inglés", "Francés", "Alemán"] },
            { q: "Moneda de Europa", ans: "Euro", opts: ["Euro", "Dólar", "Peso"] },
            { q: "Moneda de EEUU", ans: "Dólar", opts: ["Dólar", "Euro", "Libra"] },
            { q: "Continente de China", ans: "Asia", opts: ["Asia", "África", "Europa"] },
            { q: "Continente de Kenia", ans: "África", opts: ["África", "Asia", "Oceanía"] },
            { q: "Isla grande cerca de Australia", ans: "Nueva Zelanda", opts: ["Nueva Zelanda", "Japón", "Madagascar"] },
            { q: "Polo donde hay pingüinos", ans: "Sur", opts: ["Sur", "Norte", "Este"] },
            { q: "Polo donde hay osos", ans: "Norte", opts: ["Norte", "Sur", "Oeste"] },
            { q: "Capital de Turquía", ans: "Ankara", opts: ["Ankara", "Estambul", "Izmir"] }
        ],
        prodigio: [
            { q: "País más poblado", ans: "India", opts: ["India", "China", "EEUU"] },
            { q: "Capital de Suiza", ans: "Berna", opts: ["Berna", "Zúrich", "Ginebra"] },
            { q: "País más grande", ans: "Rusia", opts: ["Rusia", "Canadá", "China"] },
            { q: "Capital de Marruecos", ans: "Rabat", opts: ["Rabat", "Casablanca", "Marrakech"] },
            { q: "Estrecho entre España y África", ans: "Gibraltar", opts: ["Gibraltar", "Magallanes", "Bering"] }
        ]
    },
    compu: {
        inicial: [
            { q: "Sirve para hacer clic", ans: "Mouse", opts: ["Mouse", "Teclado", "Monitor"] },
            { q: "Sirve para ver", ans: "Monitor", opts: ["Monitor", "CPU", "Parlante"] },
            { q: "Sirve para escribir", ans: "Teclado", opts: ["Teclado", "Mouse", "Impresora"] },
            { q: "Cerebro de la PC", ans: "CPU", opts: ["CPU", "RAM", "Disco"] },
            { q: "Saca hojas de papel", ans: "Impresora", opts: ["Impresora", "Escáner", "Webcam"] }
        ],
        intermedia: [
            { q: "Navegador de internet", ans: "Chrome", opts: ["Chrome", "Word", "Excel"] },
            { q: "Programa para escribir textos", ans: "Word", opts: ["Word", "Paint", "Calculadora"] },
            { q: "Sistema Operativo", ans: "Windows", opts: ["Windows", "Office", "Google"] },
            { q: "Red social de fotos", ans: "Instagram", opts: ["Instagram", "Excel", "Outlook"] },
            { q: "Sitio de videos", ans: "YouTube", opts: ["YouTube", "Gmail", "Maps"] }
        ],
        dificil: [
            { q: "Memoria temporal", ans: "RAM", opts: ["RAM", "Disco Duro", "USB"] },
            { q: "Conexión sin cables", ans: "WiFi", opts: ["WiFi", "Ethernet", "HDMI"] },
            { q: "Puerto para pendrive", ans: "USB", opts: ["USB", "VGA", "Audio"] },
            { q: "Unidad de almacenamiento", ans: "Disco SSD", opts: ["Disco SSD", "CPU", "Monitor"] },
            { q: "Lenguaje de páginas web", ans: "HTML", opts: ["HTML", "EXE", "JPG"] }
        ],
        experta: [
            { q: "Procesador Gráfico", ans: "GPU", opts: ["GPU", "CPU", "APU"] },
            { q: "Red de área local", ans: "LAN", opts: ["LAN", "WAN", "PAN"] },
            { q: "Dirección única de red", ans: "IP", opts: ["IP", "DNS", "URL"] },
            { q: "8 Bits equivalen a", ans: "1 Byte", opts: ["1 Byte", "1 Kilo", "1 Mega"] },
            { q: "Sistema de código abierto", ans: "Linux", opts: ["Linux", "Windows", "MacOS"] }
        ],
        prodigio: [
            { q: "Error en un programa", ans: "Bug", opts: ["Bug", "Feature", "Virus"] },
            { q: "Bucle infinito", ans: "Loop", opts: ["Loop", "Crash", "Break"] },
            { q: "Inteligencia Artificial", ans: "IA", opts: ["IA", "VR", "AR"] },
            { q: "Base de Datos", ans: "SQL", opts: ["SQL", "HTML", "CSS"] },
            { q: "Protección contra virus", ans: "Antivirus", opts: ["Antivirus", "Firewall", "Spyware"] }
        ]
    },
    algoritmos: {
        inicial: [
            { title: "Lavarse los dientes", blocks: [{ text: "Poner pasta", type: "blk-action" }, { text: "Cepillar", type: "blk-action" }, { text: "Enjuagar", type: "blk-action" }] },
            { title: "Plantar semilla", blocks: [{ text: "Hacer pozo", type: "blk-action" }, { text: "Poner semilla", type: "blk-action" }, { text: "Tapar", type: "blk-action" }, { text: "Regar", type: "blk-action" }] },
            { title: "Hacer un Té", blocks: [{ text: "Hervir agua", type: "blk-action" }, { text: "Poner saquito", type: "blk-action" }, { text: "Servir agua", type: "blk-action" }] },
            { title: "Dibujar Círculo", blocks: [{ text: "Tomar lápiz", type: "blk-action" }, { text: "Apoyar punta", type: "blk-action" }, { text: "Girar 360°", type: "blk-action" }] },
            { title: "Cruzar Calle", blocks: [{ text: "Mirar ambos lados", type: "blk-action" }, { text: "Esperar verde", type: "blk-action" }, { text: "Caminar", type: "blk-action" }] },
            { title: "Ponerse Zapatos", blocks: [{ text: "Poner medias", type: "blk-action" }, { text: "Poner zapatos", type: "blk-action" }, { text: "Atar cordones", type: "blk-action" }] },
            { title: "Comer Banana", blocks: [{ text: "Pelar fruta", type: "blk-action" }, { text: "Morder", type: "blk-action" }, { text: "Tirar cáscara", type: "blk-action" }] },
            { title: "Hacer la Cama", blocks: [{ text: "Estirar sábanas", type: "blk-action" }, { text: "Poner almohada", type: "blk-action" }, { text: "Doblar colcha", type: "blk-action" }] },
            { title: "Llamar por Teléfono", blocks: [{ text: "Desbloquear", type: "blk-action" }, { text: "Marcar número", type: "blk-action" }, { text: "Hablar", type: "blk-action" }] },
            { title: "Sacar punta", blocks: [{ text: "Poner lápiz", type: "blk-action" }, { text: "Girar manivela", type: "blk-action" }, { text: "Verificar punta", type: "blk-action" }] },
            { title: "Cargar Tablet", blocks: [{ text: "Buscar cable", type: "blk-action" }, { text: "Enchufar", type: "blk-action" }, { text: "Esperar carga", type: "blk-action" }] },
            { title: "Lavar Manos", blocks: [{ text: "Poner jabón", type: "blk-action" }, { text: "Frotar", type: "blk-action" }, { text: "Secar", type: "blk-action" }] },
            { title: "Ver TV", blocks: [{ text: "Sentarse", type: "blk-action" }, { text: "Tomar control", type: "blk-action" }, { text: "Prender", type: "blk-action" }] },
            { title: "Dibujar Sol", blocks: [{ text: "Hacer círculo", type: "blk-action" }, { text: "Hacer rayos", type: "blk-action" }, { text: "Pintar amarillo", type: "blk-action" }] },
            { title: "Poner la Mesa", blocks: [{ text: "Poner mantel", type: "blk-action" }, { text: "Poner plato", type: "blk-action" }, { text: "Poner cubiertos", type: "blk-action" }] },
            { title: "Beber Jugo", blocks: [{ text: "Servir vaso", type: "blk-action" }, { text: "Beber", type: "blk-action" }, { text: "Lavar vaso", type: "blk-action" }] },
            { title: "Ir a la Escuela", blocks: [{ text: "Poner mochila", type: "blk-action" }, { text: "Cerrar puerta", type: "blk-action" }, { text: "Caminar", type: "blk-action" }] },
            { title: "Pintar Cuadro", blocks: [{ text: "Mojar pincel", type: "blk-action" }, { text: "Pasar pintura", type: "blk-action" }, { text: "Limpiar pincel", type: "blk-action" }] },
            { title: "Tocar Piano", blocks: [{ text: "Sentarse derecho", type: "blk-action" }, { text: "Poner manos", type: "blk-action" }, { text: "Presionar tecla", type: "blk-action" }] },
            { title: "Hacer Foto", blocks: [{ text: "Apuntar", type: "blk-action" }, { text: "Sonreír", type: "blk-action" }, { text: "Presionar botón", type: "blk-action" }] },
            { title: "Subir Escalera", blocks: [{ text: "Mirar escalón", type: "blk-action" }, { text: "Levantar pie", type: "blk-action" }, { text: "Avanzar", type: "blk-action" }] },
            { title: "Cerrar Ventana", blocks: [{ text: "Acercarse", type: "blk-action" }, { text: "Empujar", type: "blk-action" }, { text: "Trabar", type: "blk-action" }] },
            { title: "Regar Flor", blocks: [{ text: "Llenar regadera", type: "blk-action" }, { text: "Ir a la flor", type: "blk-action" }, { text: "Volcar agua", type: "blk-action" }] },
            { title: "Leer Libro", blocks: [{ text: "Abrir tapa", type: "blk-action" }, { text: "Leer texto", type: "blk-action" }, { text: "Pasar página", type: "blk-action" }] },
            { title: "Comer Galleta", blocks: [{ text: "Abrir paquete", type: "blk-action" }, { text: "Sacar una", type: "blk-action" }, { text: "Masticar", type: "blk-action" }] },
            { title: "Atarse Pelo", blocks: [{ text: "Juntar pelo", type: "blk-action" }, { text: "Poner colita", type: "blk-action" }, { text: "Dar vuelta", type: "blk-action" }] },
            { title: "Usar Gorra", blocks: [{ text: "Agarrar gorra", type: "blk-action" }, { text: "Alinear frente", type: "blk-action" }, { text: "Bajar a la cabeza", type: "blk-action" }] },
            { title: "Abrir Regalo", blocks: [{ text: "Romper papel", type: "blk-action" }, { text: "Abrir caja", type: "blk-action" }, { text: "Festejar", type: "blk-action" }] },
            { title: "Patear Pelota", blocks: [{ text: "Correr", type: "blk-action" }, { text: "Mirar pelota", type: "blk-action" }, { text: "Golpear con pie", type: "blk-action" }] },
            { title: "Hacer Nudo", blocks: [{ text: "Cruzar hilos", type: "blk-action" }, { text: "Pasar por abajo", type: "blk-action" }, { text: "Tirar fuerte", type: "blk-action" }] },
            { title: "Dormir", blocks: [{ text: "Acostarse", type: "blk-action" }, { text: "Cerrar ojos", type: "blk-action" }, { text: "Soñar", type: "blk-action" }] },
            { title: "Bañarse", blocks: [{ text: "Entrar", type: "blk-action" }, { text: "Enjabonar", type: "blk-action" }, { text: "Enjuagar", type: "blk-action" }] },
            { title: "Comer Sopa", blocks: [{ text: "Soplar cuchara", type: "blk-action" }, { text: "Llevar a boca", type: "blk-action" }, { text: "Tragar", type: "blk-action" }] },
            { title: "Pelar Huevo", blocks: [{ text: "Golpear cáscara", type: "blk-action" }, { text: "Sacar trozos", type: "blk-action" }, { text: "Lavar huevo", type: "blk-action" }] },
            { title: "Hacer Puzzle", blocks: [{ text: "Buscar bordes", type: "blk-action" }, { text: "Unir piezas", type: "blk-action" }, { text: "Completar", type: "blk-action" }] },
            { title: "Guardar Auto", blocks: [{ text: "Abrir garage", type: "blk-action" }, { text: "Entrar auto", type: "blk-action" }, { text: "Apagar motor", type: "blk-action" }] },
            { title: "Volar Avión Papel", blocks: [{ text: "Doblar hoja", type: "blk-action" }, { text: "Apuntar alto", type: "blk-action" }, { text: "Lanzar", type: "blk-action" }] },
            { title: "Comer Manzana", blocks: [{ text: "Lavar fruta", type: "blk-action" }, { text: "Morder", type: "blk-action" }, { text: "Tirar restos", type: "blk-action" }] },
            { title: "Jugar Dados", blocks: [{ text: "Agitar mano", type: "blk-action" }, { text: "Lanzar", type: "blk-action" }, { text: "Contar puntos", type: "blk-action" }] },
            { title: "Apagar PC", blocks: [{ text: "Guardar todo", type: "blk-action" }, { text: "Menú inicio", type: "blk-action" }, { text: "Click Apagar", type: "blk-action" }] }
        ],
        intermedia: [
            { title: "Robot Laberinto", blocks: [{ text: "Inicio", type: "blk-event" }, { text: "Avanzar 2", type: "blk-action" }, { text: "Girar Derecha", type: "blk-action" }, { text: "Avanzar 1", type: "blk-action" }] },
            { title: "Hacer Pizza", blocks: [{ text: "Estirar masa", type: "blk-action" }, { text: "Salsa tomate", type: "blk-action" }, { text: "Poner queso", type: "blk-action" }, { text: "Hornear 10m", type: "blk-action" }] },
            { title: "Enviar Mail", blocks: [{ text: "Escribir para:", type: "blk-action" }, { text: "Poner asunto", type: "blk-action" }, { text: "Redactar", type: "blk-action" }, { text: "Click Enviar", type: "blk-action" }] },
            { title: "Robot Limpiador", blocks: [{ text: "Prender", type: "blk-event" }, { text: "Avanzar recto", type: "blk-action" }, { text: "Girar al chocar", type: "blk-action" }, { text: "Aspirar", type: "blk-action" }] },
            { title: "Cargar Celular", blocks: [{ text: "Tomar cable", type: "blk-action" }, { text: "Conectar USB", type: "blk-action" }, { text: "Ver rayito", type: "blk-action" }, { text: "Dejar en mesa", type: "blk-action" }] },
            { title: "Ir al Cine", blocks: [{ text: "Comprar ticket", type: "blk-action" }, { text: "Comprar pochoclo", type: "blk-action" }, { text: "Buscar sala", type: "blk-action" }, { text: "Hacer silencio", type: "blk-action" }] },
            { title: "Lavar Ropa", blocks: [{ text: "Meter ropa", type: "blk-action" }, { text: "Poner jabón", type: "blk-action" }, { text: "Elegir programa", type: "blk-action" }, { text: "Dar inicio", type: "blk-action" }] },
            { title: "Tirar Basura", blocks: [{ text: "Atar bolsa", type: "blk-action" }, { text: "Sacar afuera", type: "blk-action" }, { text: "Poner en tacho", type: "blk-action" }, { text: "Volver", type: "blk-action" }] },
            { title: "Hacer Dibujo", blocks: [{ text: "Bocetar", type: "blk-action" }, { text: "Entintar", type: "blk-action" }, { text: "Borrar lápiz", type: "blk-action" }, { text: "Colorear", type: "blk-action" }] },
            { title: "Sacar Perro", blocks: [{ text: "Poner correa", type: "blk-action" }, { text: "Salir calle", type: "blk-action" }, { text: "Caminar 20m", type: "blk-action" }, { text: "Juntar cacas", type: "blk-action" }] },
            { title: "Hacer Jugo", blocks: [{ text: "Cortar naranja", type: "blk-action" }, { text: "Exprimir", type: "blk-action" }, { text: "Sacar semillas", type: "blk-action" }, { text: "Servir con hielo", type: "blk-action" }] },
            { title: "Ir al Super", blocks: [{ text: "Hacer lista", type: "blk-action" }, { text: "Llenar carro", type: "blk-action" }, { text: "Pagar cajera", type: "blk-action" }, { text: "Cargar bolsas", type: "blk-action" }] },
            { title: "Planchar Remera", blocks: [{ text: "Calentar plancha", type: "blk-action" }, { text: "Estirar tela", type: "blk-action" }, { text: "Pasar plancha", type: "blk-action" }, { text: "Doblar", type: "blk-action" }] },
            { title: "Hacer Ensalada", blocks: [{ text: "Lavar lechuga", type: "blk-action" }, { text: "Trocear tomate", type: "blk-action" }, { text: "Poner sal", type: "blk-action" }, { text: "Mezclar", type: "blk-action" }] },
            { title: "Arreglar Cama", blocks: [{ text: "Sacudir sábanas", type: "blk-action" }, { text: "Acomodar funda", type: "blk-action" }, { text: "Poner manta", type: "blk-action" }, { text: "Perfumar", type: "blk-action" }] },
            { title: "Hacer Sandwich", blocks: [{ text: "Poner pan", type: "blk-action" }, { text: "Poner jamón", type: "blk-action" }, { text: "Poner queso", type: "blk-action" }, { text: "Tapar", type: "blk-action" }] },
            { title: "Grabar Video", blocks: [{ text: "Elegir fondo", type: "blk-action" }, { text: "Check sonido", type: "blk-action" }, { text: "Click Rec", type: "blk-action" }, { text: "Hablar", type: "blk-action" }] },
            { title: "Lavar Bici", blocks: [{ text: "Mojar cuadro", type: "blk-action" }, { text: "Pasar esponja", type: "blk-action" }, { text: "Enjuagar", type: "blk-action" }, { text: "Secar cadena", type: "blk-action" }] },
            { title: "Usar Cajero", blocks: [{ text: "Poner tarjeta", type: "blk-action" }, { text: "Poner PIN", type: "blk-action" }, { text: "Elegir monto", type: "blk-action" }, { text: "Retirar billetes", type: "blk-action" }] },
            { title: "Hacer Batido", blocks: [{ text: "Poner leche", type: "blk-action" }, { text: "Poner fruta", type: "blk-action" }, { text: "Licuar", type: "blk-action" }, { text: "Poner pajita", type: "blk-action" }] },
            { title: "Pintar Pared", blocks: [{ text: "Lijar", type: "blk-action" }, { text: "Tapar grietas", type: "blk-action" }, { text: "Primera mano", type: "blk-action" }, { text: "Segunda mano", type: "blk-action" }] },
            { title: "Cargar Nafta", blocks: [{ text: "Apagar motor", type: "blk-action" }, { text: "Abrir tapa", type: "blk-action" }, { text: "Cargar litros", type: "blk-action" }, { text: "Cerrar tapa", type: "blk-action" }] },
            { title: "Hacer Mate", blocks: [{ text: "Poner yerba", type: "blk-action" }, { text: "Poner bombilla", type: "blk-action" }, { text: "Cebar tibio", type: "blk-action" }, { text: "Cebar caliente", type: "blk-action" }] },
            { title: "Hacer Gimnasia", blocks: [{ text: "Calentar", type: "blk-action" }, { text: "Hacer rutina", type: "blk-action" }, { text: "Tomar agua", type: "blk-action" }, { text: "Elongar", type: "blk-action" }] },
            { title: "Atender Mesa", blocks: [{ text: "Saludar", type: "blk-action" }, { text: "Tomar pedido", type: "blk-action" }, { text: "Traer comida", type: "blk-action" }, { text: "Cobrar", type: "blk-action" }] },
            { title: "Hacer Gelatina", blocks: [{ text: "Hervir agua", type: "blk-action" }, { text: "Disolver polvo", type: "blk-action" }, { text: "Poner agua fría", type: "blk-action" }, { text: "Enfriar 2hs", type: "blk-action" }] },
            { title: "Usar Impresora", blocks: [{ text: "Poner papel", type: "blk-action" }, { text: "Prender", type: "blk-action" }, { text: "Enviar doc", type: "blk-action" }, { text: "Retirar hoja", type: "blk-action" }] },
            { title: "Hacer Pochoclo", blocks: [{ text: "Poner aceite", type: "blk-action" }, { text: "Poner maíz", type: "blk-action" }, { text: "Calentar", type: "blk-action" }, { text: "Poner sal", type: "blk-action" }] },
            { title: "Limpiar Mesa", blocks: [{ text: "Sacar cosas", type: "blk-action" }, { text: "Pasar trapo", type: "blk-action" }, { text: "Lavar trapo", type: "blk-action" }, { text: "Acomodar sillas", type: "blk-action" }] },
            { title: "Hacer Arroz", blocks: [{ text: "Hervir agua", type: "blk-action" }, { text: "Poner arroz", type: "blk-action" }, { text: "Colar", type: "blk-action" }, { text: "Servir", type: "blk-action" }] },
            { title: "Subir Video", blocks: [{ text: "Editar", type: "blk-action" }, { text: "Poner título", type: "blk-action" }, { text: "Poner miniatura", type: "blk-action" }, { text: "Publicar", type: "blk-action" }] },
            { title: "Plantar Arbol", blocks: [{ text: "Cavar pozo", type: "blk-action" }, { text: "Poner árbol", type: "blk-action" }, { text: "Tapar raíz", type: "blk-action" }, { text: "Atar guía", type: "blk-action" }] },
            { title: "Hacer Regalo", blocks: [{ text: "Comprar objeto", type: "blk-action" }, { text: "Envolver", type: "blk-action" }, { text: "Poner tarjeta", type: "blk-action" }, { text: "Entregar", type: "blk-action" }] },
            { title: "Lavar Platos", blocks: [{ text: "Poner detergente", type: "blk-action" }, { text: "Refregar", type: "blk-action" }, { text: "Enjuagar", type: "blk-action" }, { text: "Secar", type: "blk-action" }] },
            { title: "Armar Juguete", blocks: [{ text: "Abrir caja", type: "blk-action" }, { text: "Leer manual", type: "blk-action" }, { text: "Unir piezas", type: "blk-action" }, { text: "Probar", type: "blk-action" }] }
        ],
        dificil: [
            { title: "Cuadrado", blocks: [{ text: "Repetir 4", type: "blk-control" }, { text: "  Mover 100", type: "blk-action" }, { text: "  Girar 90", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Triángulo", blocks: [{ text: "Repetir 3", type: "blk-control" }, { text: "  Mover 100", type: "blk-action" }, { text: "  Girar 120", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Círculo (Puntos)", blocks: [{ text: "Repetir 36", type: "blk-control" }, { text: "  Mover 10", type: "blk-action" }, { text: "  Girar 10", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Escalera", blocks: [{ text: "Repetir 5", type: "blk-control" }, { text: "  Subir 1", type: "blk-action" }, { text: "  Avanzar 1", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Llenar 10 Vasos", blocks: [{ text: "Repetir 10", type: "blk-control" }, { text: "  Llenar vaso", type: "blk-action" }, { text: "  Mover al siguiente", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Hexágono", blocks: [{ text: "Repetir 6", type: "blk-control" }, { text: "  Mover 50", type: "blk-action" }, { text: "  Girar 60", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Octógono", blocks: [{ text: "Repetir 8", type: "blk-control" }, { text: "  Mover 50", type: "blk-action" }, { text: "  Girar 45", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Saludar Fila", blocks: [{ text: "Repetir 20", type: "blk-control" }, { text: "  Decir Hola", type: "blk-action" }, { text: "  Pasar alumno", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Clavar 5 Clavos", blocks: [{ text: "Repetir 5", type: "blk-control" }, { text: "  Martillar", type: "blk-action" }, { text: "  Check clavo", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Borrar Pizarrón", blocks: [{ text: "Repetir 10", type: "blk-control" }, { text: "  Pasar borrador", type: "blk-action" }, { text: "  Bajar mano", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Estrella 5", blocks: [{ text: "Repetir 5", type: "blk-control" }, { text: "  Mover 100", type: "blk-action" }, { text: "  Girar 144", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Cargar 10 Cajas", blocks: [{ text: "Repetir 10", type: "blk-control" }, { text: "  Alzar caja", type: "blk-action" }, { text: "  Poner en camión", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Repartir Cartas", blocks: [{ text: "Repetir 40", type: "blk-control" }, { text: "  Sacar carta", type: "blk-action" }, { text: "  Entregar", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Cruzar 4 Calles", blocks: [{ text: "Repetir 4", type: "blk-control" }, { text: "  Mirar semáforo", type: "blk-action" }, { text: "  Cruzar", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Limpiar Ventanas", blocks: [{ text: "Repetir 8", type: "blk-control" }, { text: "  Poner líquido", type: "blk-action" }, { text: "  Secar", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Caminar Cuadra", blocks: [{ text: "Repetir 100", type: "blk-control" }, { text: "  Paso izquierdo", type: "blk-action" }, { text: "  Paso derecho", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Atornillar", blocks: [{ text: "Repetir 15", type: "blk-control" }, { text: "  Girar derecha", type: "blk-action" }, { text: "  Presionar", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Cortar Pasto", blocks: [{ text: "Repetir 10", type: "blk-control" }, { text: "  Ir adelante", type: "blk-action" }, { text: "  Girar 180", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Subir 10 Pisos", blocks: [{ text: "Repetir 10", type: "blk-control" }, { text: "  Entrar ascensor", type: "blk-action" }, { text: "  Subir piso", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Poner 100 Ladrillos", blocks: [{ text: "Repetir 100", type: "blk-control" }, { text: "  Poner mezcla", type: "blk-action" }, { text: "  Poner ladrillo", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Inflar Rueda", blocks: [{ text: "Repetir 30", type: "blk-control" }, { text: "  Bajar inflador", type: "blk-action" }, { text: "  Subir inflador", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Hacer Abdominales", blocks: [{ text: "Repetir 20", type: "blk-control" }, { text: "  Subir torso", type: "blk-action" }, { text: "  Bajar suave", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Llenar Balde", blocks: [{ text: "Repetir 5", type: "blk-control" }, { text: "  Ir al grifo", type: "blk-action" }, { text: "  Volcar agua", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Picar Cebolla", blocks: [{ text: "Repetir 15", type: "blk-control" }, { text: "  Bajar cuchillo", type: "blk-action" }, { text: "  Mover cebolla", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Enrollar Cable", blocks: [{ text: "Repetir 10", type: "blk-control" }, { text: "  Dar vuelta", type: "blk-action" }, { text: "  Sujetar", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Pintar Rayas", blocks: [{ text: "Repetir 5", type: "blk-control" }, { text: "  Pintar blanca", type: "blk-action" }, { text: "  Espacio negro", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Servir 4 Platos", blocks: [{ text: "Repetir 4", type: "blk-control" }, { text: "  Servir comida", type: "blk-action" }, { text: "  Llevar mesa", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Saltear Verdura", blocks: [{ text: "Repetir 10", type: "blk-control" }, { text: "  Agitar sartén", type: "blk-action" }, { text: "  Mezclar", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Pedalear 1km", blocks: [{ text: "Repetir 200", type: "blk-control" }, { text: "  Pedal Der", type: "blk-action" }, { text: "  Pedal Izq", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Guardar Libros", blocks: [{ text: "Repetir 5", type: "blk-control" }, { text: "  Tomar libro", type: "blk-action" }, { text: "  Poner estante", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Barrer Patio", blocks: [{ text: "Repetir 12", type: "blk-control" }, { text: "  Empujar escoba", type: "blk-action" }, { text: "  Juntar", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Secar Platos", blocks: [{ text: "Repetir 10", type: "blk-control" }, { text: "  Pasar trapo", type: "blk-action" }, { text: "  Guardar", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Llamar 3 Veces", blocks: [{ text: "Repetir 3", type: "blk-control" }, { text: "  Marcar", type: "blk-action" }, { text: "  Esperar tono", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Cargar 4 Bolsas", blocks: [{ text: "Repetir 4", type: "blk-control" }, { text: "  Agarrar bolsa", type: "blk-action" }, { text: "  Llevar cocina", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Doblar 6 Toallas", blocks: [{ text: "Repetir 6", type: "blk-control" }, { text: "  Doblar medio", type: "blk-action" }, { text: "  Apilar", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Amasar Pan", blocks: [{ text: "Repetir 20", type: "blk-control" }, { text: "  Aprestar", type: "blk-action" }, { text: "  Doblar masa", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Servir Café", blocks: [{ text: "Repetir 2", type: "blk-control" }, { text: "  Poner azúcar", type: "blk-action" }, { text: "  Poner café", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Marcar Cancha", blocks: [{ text: "Repetir 4", type: "blk-control" }, { text: "  Línea 20m", type: "blk-action" }, { text: "  Girar 90", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Poner 3 Velas", blocks: [{ text: "Repetir 3", type: "blk-control" }, { text: "  Pegar vela", type: "blk-action" }, { text: "  Prender", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Aplaudi 5 veces", blocks: [{ text: "Repetir 5", type: "blk-control" }, { text: "  Chocar manos", type: "blk-action" }, { text: "  Separar", type: "blk-action" }, { text: "Fin Repetir", type: "blk-control" }] }
        ],
        experta: [
            { title: "Semáforo", blocks: [{ text: "Mirar luz", type: "blk-action" }, { text: "SI es Verde", type: "blk-control" }, { text: "  Cruzar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Esperar", type: "blk-action" }] },
            { title: "Paraguas", blocks: [{ text: "Mirar cielo", type: "blk-action" }, { text: "SI llueve", type: "blk-control" }, { text: "  Abrir paraguas", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Guardar", type: "blk-action" }] },
            { title: "Despertador", blocks: [{ text: "Check hora", type: "blk-action" }, { text: "SI es 7:00", type: "blk-control" }, { text: "  Sonar alarma", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Dormir", type: "blk-action" }] },
            { title: "Cajero Dinero", blocks: [{ text: "Check saldo", type: "blk-action" }, { text: "SI saldo > 0", type: "blk-control" }, { text: "  Dar billetes", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Error", type: "blk-action" }] },
            { title: "Luz Automática", blocks: [{ text: "Mirar sensor", type: "blk-action" }, { text: "SI es oscuro", type: "blk-control" }, { text: "  Prender luz", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Apagar", type: "blk-action" }] },
            { title: "Puerta Super", blocks: [{ text: "Check sensor", type: "blk-action" }, { text: "SI hay persona", type: "blk-control" }, { text: "  Abrir puerta", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Cerrar", type: "blk-action" }] },
            { title: "Batería Celu", blocks: [{ text: "Check %", type: "blk-action" }, { text: "SI es < 10%", type: "blk-control" }, { text: "  Aviso carga", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  OK", type: "blk-action" }] },
            { title: "Helado", blocks: [{ text: "Tengo plata?", type: "blk-action" }, { text: "SI tengo", type: "blk-control" }, { text: "  Comprar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Mirar", type: "blk-action" }] },
            { title: "Examen", blocks: [{ text: "Nota final", type: "blk-action" }, { text: "SI nota >= 7", type: "blk-control" }, { text: "  Aprobar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Recuperar", type: "blk-action" }] },
            { title: "Sopa Caliente", blocks: [{ text: "Probar sopa", type: "blk-action" }, { text: "SI quema", type: "blk-control" }, { text: "  Soplar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Comer", type: "blk-action" }] },
            { title: "Voto", blocks: [{ text: "Edad?", type: "blk-action" }, { text: "SI >= 16", type: "blk-control" }, { text: "  Votar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Esperar", type: "blk-action" }] },
            { title: "Tanque Agua", blocks: [{ text: "Check flotante", type: "blk-action" }, { text: "SI abajo", type: "blk-control" }, { text: "  Prender bomba", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Apagar", type: "blk-action" }] },
            { title: "Wifi", blocks: [{ text: "Check señal", type: "blk-action" }, { text: "SI conecta", type: "blk-control" }, { text: "  Navegar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Reset", type: "blk-action" }] },
            { title: "Password", blocks: [{ text: "Input pass", type: "blk-action" }, { text: "SI es correcta", type: "blk-control" }, { text: "  Acceder", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Bloquear", type: "blk-action" }] },
            { title: "Termostato", blocks: [{ text: "Check Temp", type: "blk-action" }, { text: "SI Temp < 18", type: "blk-control" }, { text: "  Calefacción", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Apagar", type: "blk-action" }] },
            { title: "Hambre", blocks: [{ text: "Check panza", type: "blk-action" }, { text: "SI ruge", type: "blk-control" }, { text: "  Cocinar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Jugar", type: "blk-action" }] },
            { title: "Llenar Balde", blocks: [{ text: "SI lleno", type: "blk-control" }, { text: "  Cerrar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Seguir", type: "blk-action" }] },
            { title: "Edad Cine", blocks: [{ text: "SI >= 13", type: "blk-control" }, { text: "  Entrar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Con adulto", type: "blk-action" }] },
            { title: "Lavado Auto", blocks: [{ text: "SI sucio", type: "blk-control" }, { text: "  Lavar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Pasear", type: "blk-action" }] },
            { title: "Planchado", blocks: [{ text: "SI arrugado", type: "blk-control" }, { text: "  Planchar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Guardar", type: "blk-action" }] },
            { title: "Regar Jardín", blocks: [{ text: "SI seco", type: "blk-control" }, { text: "  Regar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Nada", type: "blk-action" }] },
            { title: "Comprar Pan", blocks: [{ text: "SI abierto", type: "blk-control" }, { text: "  Comprar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Volver", type: "blk-action" }] },
            { title: "Tarea", blocks: [{ text: "SI termine", type: "blk-control" }, { text: "  Salir", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Seguir", type: "blk-action" }] },
            { title: "Llamada", blocks: [{ text: "SI suena", type: "blk-control" }, { text: "  Atender", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Ignorar", type: "blk-action" }] },
            { title: "Ascensor", blocks: [{ text: "SI llego", type: "blk-control" }, { text: "  Abrir", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Mover", type: "blk-action" }] },
            { title: "Micrófono", blocks: [{ text: "SI hablo", type: "blk-control" }, { text: "  Sonar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Mute", type: "blk-action" }] },
            { title: "Mouse", blocks: [{ text: "SI click", type: "blk-control" }, { text: "  Acción", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Puntero", type: "blk-action" }] },
            { title: "Horno", blocks: [{ text: "SI timer 0", type: "blk-control" }, { text: "  Pip pip", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Calor", type: "blk-action" }] },
            { title: "Heladera", blocks: [{ text: "SI abierta", type: "blk-control" }, { text: "  Luz on", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Luz off", type: "blk-action" }] },
            { title: "Lámpara", blocks: [{ text: "SI quemada", type: "blk-control" }, { text: "  Cambiar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Prender", type: "blk-action" }] },
            { title: "Bici", blocks: [{ text: "SI pinchada", type: "blk-control" }, { text: "  Parchar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Andar", type: "blk-action" }] },
            { title: "Reloj", blocks: [{ text: "SI sin pila", type: "blk-control" }, { text: "  Poner pila", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Tictac", type: "blk-action" }] },
            { title: "Mochila", blocks: [{ text: "SI pesada", type: "blk-control" }, { text: "  Sacar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Llevar", type: "blk-action" }] },
            { title: "Silla", blocks: [{ text: "SI rota", type: "blk-control" }, { text: "  Fix it", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Sentarse", type: "blk-action" }] },
            { title: "Vaso", blocks: [{ text: "SI vacío", type: "blk-control" }, { text: "  Llenar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Beber", type: "blk-action" }] },
            { title: "Zapatos", blocks: [{ text: "SI sucios", type: "blk-control" }, { text: "  Limpiar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Usar", type: "blk-action" }] },
            { title: "Pasto", blocks: [{ text: "SI largo", type: "blk-control" }, { text: "  Cortar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Jugar", type: "blk-action" }] },
            { title: "Canilla", blocks: [{ text: "SI pierde", type: "blk-control" }, { text: "  Cerrar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Nada", type: "blk-action" }] },
            { title: "Ropa", blocks: [{ text: "SI seca", type: "blk-control" }, { text: "  Guardar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Dejar", type: "blk-action" }] },
            { title: "Lápiz", blocks: [{ text: "SI sin punta", type: "blk-control" }, { text: "  Sacar", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Escribir", type: "blk-action" }] }
        ],
        prodigio: [
            { title: "Lluvia Inteligente", blocks: [{ text: "SI llueve", type: "blk-control" }, { text: "  ¿Tengo paraguas?", type: "blk-logic" }, { text: "    SI: Usarlo", type: "blk-action" }, { text: "    NO: Correr", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Caminar", type: "blk-action" }] },
            { title: "Bucle Llenado", blocks: [{ text: "Repetir 5", type: "blk-control" }, { text: "  SI vacío", type: "blk-control" }, { text: "    Llenar", type: "blk-action" }, { text: "  Fin SI", type: "blk-control" }, { text: "Fin Repetir", type: "blk-control" }] },
            { title: "Alarma Robo", blocks: [{ text: "SI sensor on", type: "blk-control" }, { text: "  SI es noche", type: "blk-logic" }, { text: "    Llamar 911", type: "blk-action" }, { text: "    Sirena", type: "blk-action" }, { text: "SINO", type: "blk-control" }, { text: "  Off", type: "blk-action" }] },
            { title: "Cajero", blocks: [{ text: "SI PIN OK", type: "blk-control" }, { text: "  SI plata > 0", type: "blk-logic" }, { text: "    Dar billete", type: "blk-action" }, { text: "  SINO: Error", type: "blk-action" }, { text: "SINO: Bloqueo", type: "blk-action" }] },
            { title: "Auto Autónomo", blocks: [{ text: "SI obstáculo", type: "blk-control" }, { text: "  SI hay espacio", type: "blk-logic" }, { text: "    Esquivar", type: "blk-action" }, { text: "    SINO: Frenar", type: "blk-action" }, { text: "SINO: Go", type: "blk-action" }] },
            { title: "Logueo Web", blocks: [{ text: "SI user ok", type: "blk-control" }, { text: "  SI pass ok", type: "blk-logic" }, { text: "    Dashboard", type: "blk-action" }, { text: "    SINO: Error", type: "blk-action" }, { text: "SINO: Error", type: "blk-action" }] },
            { title: "Dron", blocks: [{ text: "SI bat > 20%", type: "blk-control" }, { text: "  SI señal", type: "blk-logic" }, { text: "    Volar", type: "blk-action" }, { text: "    SINO: Volver", type: "blk-action" }, { text: "SINO: Aterrizar", type: "blk-action" }] },
            { title: "Calefón", blocks: [{ text: "SI agua fluye", type: "blk-control" }, { text: "  SI hay gas", type: "blk-logic" }, { text: "    Prender", type: "blk-action" }, { text: "    SINO: Error", type: "blk-action" }, { text: "SINO: Esperar", type: "blk-action" }] },
            { title: "Elevador 2", blocks: [{ text: "SI botón apretado", type: "blk-control" }, { text: "  SI ocupado", type: "blk-logic" }, { text: "    Cola espera", type: "blk-action" }, { text: "    SINO: Ir", type: "blk-action" }, { text: "SINO: Sleep", type: "blk-action" }] },
            { title: "Fábrica", blocks: [{ text: "SI pieza ok", type: "blk-control" }, { text: "  SI pesada", type: "blk-logic" }, { text: "    Caja A", type: "blk-action" }, { text: "    SINO: Caja B", type: "blk-action" }, { text: "SINO: Basura", type: "blk-action" }] },
            { title: "Cajero 2", blocks: [{ text: "SI tarjeta", type: "blk-control" }, { text: "  SI PIN ok", type: "blk-logic" }, { text: "    Elegir", type: "blk-action" }, { text: "    SINO: Retener", type: "blk-action" }, { text: "SINO: Nada", type: "blk-action" }] },
            { title: "Semáforo Inteligente", blocks: [{ text: "SI hay autos", type: "blk-control" }, { text: "  SI espera > 30s", type: "blk-logic" }, { text: "    Verde", type: "blk-action" }, { text: "    SINO: Rojo", type: "blk-action" }, { text: "SINO: Rojo", type: "blk-action" }] },
            { title: "Nave Espacial", blocks: [{ text: "SI combustible", type: "blk-control" }, { text: "  SI motor frío", type: "blk-logic" }, { text: "    Ignición", type: "blk-action" }, { text: "    SINO: Enfriar", type: "blk-action" }, { text: "SINO: Abortar", type: "blk-action" }] },
            { title: "Chatbot", blocks: [{ text: "SI mensaje", type: "blk-control" }, { text: "  SI es Hola", type: "blk-logic" }, { text: "    Responder", type: "blk-action" }, { text: "    SINO: Menú", type: "blk-action" }, { text: "SINO: Sleep", type: "blk-action" }] },
            { title: "Sensor Humedad", blocks: [{ text: "SI < 40%", type: "blk-control" }, { text: "  SI noche", type: "blk-logic" }, { text: "    Riego on", type: "blk-action" }, { text: "    SINO: Esperar", type: "blk-action" }, { text: "SINO: Riego off", type: "blk-action" }] },
            { title: "Bomba Agua", blocks: [{ text: "SI tanque bajo", type: "blk-control" }, { text: "  SI pozo alto", type: "blk-logic" }, { text: "    Bombear", type: "blk-action" }, { text: "    SINO: Alarma", type: "blk-action" }, { text: "SINO: Stop", type: "blk-action" }] },
            { title: "Ventilador", blocks: [{ text: "SI Temp > 25", type: "blk-control" }, { text: "  SI hay gente", type: "blk-logic" }, { text: "    Vel 3", type: "blk-action" }, { text: "    SINO: Vel 1", type: "blk-action" }, { text: "SINO: Off", type: "blk-action" }] },
            { title: "Música", blocks: [{ text: "SI play", type: "blk-control" }, { text: "  SI auriculares", type: "blk-logic" }, { text: "    Parlante off", type: "blk-action" }, { text: "    SINO: Parlante on", type: "blk-action" }, { text: "SINO: Mute", type: "blk-action" }] },
            { title: "Seguridad", blocks: [{ text: "SI huella", type: "blk-control" }, { text: "  SI admin", type: "blk-logic" }, { text: "    Full access", type: "blk-action" }, { text: "    SINO: Guest", type: "blk-action" }, { text: "SINO: Denied", type: "blk-action" }] },
            { title: "Juego Vida", blocks: [{ text: "SI vida < 0", type: "blk-control" }, { text: "  SI monedas > 10", type: "blk-logic" }, { text: "    Revivir", type: "blk-action" }, { text: "    SINO: Game Over", type: "blk-action" }, { text: "SINO: Seguir", type: "blk-action" }] },
            { title: "Aire", blocks: [{ text: "SI calor", type: "blk-control" }, { text: "  SI ventana cerrada", type: "blk-logic" }, { text: "    AC on", type: "blk-action" }, { text: "    SINO: Avisar", type: "blk-action" }, { text: "SINO: AC off", type: "blk-action" }] },
            { title: "Tren", blocks: [{ text: "SI en estación", type: "blk-control" }, { text: "  SI gente bajó", type: "blk-logic" }, { text: "    Cerrar", type: "blk-action" }, { text: "    SINO: Esperar", type: "blk-action" }, { text: "SINO: Viajar", type: "blk-action" }] },
            { title: "Microondas", blocks: [{ text: "SI puerta cerrada", type: "blk-control" }, { text: "  SI timer > 0", type: "blk-logic" }, { text: "    Girar", type: "blk-action" }, { text: "    SINO: Beep", type: "blk-action" }, { text: "SINO: Error", type: "blk-action" }] },
            { title: "Smart TV", blocks: [{ text: "SI internet", type: "blk-control" }, { text: "  SI Netflix", type: "blk-logic" }, { text: "    Ver peli", type: "blk-action" }, { text: "    SINO: Youtube", type: "blk-action" }, { text: "SINO: Cable", type: "blk-action" }] },
            { title: "Carga Auto", blocks: [{ text: "SI conectado", type: "blk-control" }, { text: "  SI < 100%", type: "blk-logic" }, { text: "    Cargar", type: "blk-action" }, { text: "    SINO: Cortar", type: "blk-action" }, { text: "SINO: Nada", type: "blk-action" }] },
            { title: "Luz Escalera", blocks: [{ text: "SI mov detectado", type: "blk-control" }, { text: "  SI noche", type: "blk-logic" }, { text: "    Prender", type: "blk-action" }, { text: "    SINO: Off", type: "blk-action" }, { text: "SINO: Off", type: "blk-action" }] },
            { title: "Email", blocks: [{ text: "SI spam", type: "blk-control" }, { text: "  SI importante", type: "blk-logic" }, { text: "    Inbox", type: "blk-action" }, { text: "    SINO: Trash", type: "blk-action" }, { text: "SINO: Inbox", type: "blk-action" }] },
            { title: "Riego 2", blocks: [{ text: "SI lunes", type: "blk-control" }, { text: "  SI no llovió", type: "blk-logic" }, { text: "    Regar", type: "blk-action" }, { text: "    SINO: Skip", type: "blk-action" }, { text: "SINO: Skip", type: "blk-action" }] },
            { title: "Antivirus", blocks: [{ text: "SI virus", type: "blk-control" }, { text: "  SI conocido", type: "blk-logic" }, { text: "    Eliminar", type: "blk-action" }, { text: "    SINO: Cuarentena", type: "blk-action" }, { text: "SINO: Scan", type: "blk-action" }] },
            { title: "Caja Fuerte", blocks: [{ text: "SI huella", type: "blk-control" }, { text: "  SI llave", type: "blk-logic" }, { text: "    Abrir", type: "blk-action" }, { text: "    SINO: Alarma", type: "blk-action" }, { text: "SINO: Bloqueo", type: "blk-action" }] },
            { title: "Venta", blocks: [{ text: "SI stock", type: "blk-control" }, { text: "  SI pago ok", type: "blk-logic" }, { text: "    Enviar", type: "blk-action" }, { text: "    SINO: Error", type: "blk-action" }, { text: "SINO: Agotado", type: "blk-action" }] },
            { title: "Auto 2", blocks: [{ text: "SI reversa", type: "blk-control" }, { text: "  SI sensor < 1m", type: "blk-logic" }, { text: "    Beep rápido", type: "blk-action" }, { text: "    SINO: Beep lento", type: "blk-action" }, { text: "SINO: Mute", type: "blk-action" }] },
            { title: "Horario", blocks: [{ text: "SI día", type: "blk-control" }, { text: "  SI escuela", type: "blk-logic" }, { text: "    Estudiar", type: "blk-action" }, { text: "    SINO: Jugar", type: "blk-action" }, { text: "SINO: Dormir", type: "blk-action" }] },
            { title: "Clima", blocks: [{ text: "SI frío", type: "blk-control" }, { text: "  SI viento", type: "blk-logic" }, { text: "    Campera", type: "blk-action" }, { text: "    SINO: Buzo", type: "blk-action" }, { text: "SINO: Remera", type: "blk-action" }] },
            { title: "Impresora 2", blocks: [{ text: "SI papel", type: "blk-control" }, { text: "  SI tinta", type: "blk-logic" }, { text: "    Imprimir", type: "blk-action" }, { text: "    SINO: Alerta", type: "blk-action" }, { text: "SINO: Alerta", type: "blk-action" }] },
            { title: "Luz 2", blocks: [{ text: "SI on", type: "blk-control" }, { text: "  SI led", type: "blk-logic" }, { text: "    Ahorrar", type: "blk-action" }, { text: "    SINO: Gastar", type: "blk-action" }, { text: "SINO: Off", type: "blk-action" }] },
            { title: "Ascensor 3", blocks: [{ text: "SI piso 10", type: "blk-control" }, { text: "  SI VIP", type: "blk-logic" }, { text: "    Directo", type: "blk-action" }, { text: "    SINO: Parar", type: "blk-action" }, { text: "SINO: Ir", type: "blk-action" }] },
            { title: "Alarma 2", blocks: [{ text: "SI 08:00", type: "blk-control" }, { text: "  SI lunes", type: "blk-logic" }, { text: "    Sonar", type: "blk-action" }, { text: "    SINO: Off", type: "blk-action" }, { text: "SINO: Off", type: "blk-action" }] },
            { title: "Pago", blocks: [{ text: "SI debito", type: "blk-control" }, { text: "  SI plata", type: "blk-logic" }, { text: "    OK", type: "blk-action" }, { text: "    SINO: Rechazo", type: "blk-action" }, { text: "SINO: Efectivo", type: "blk-action" }] },
            { title: "Final", blocks: [{ text: "SI aprendiste", type: "blk-control" }, { text: "  SI festejas", type: "blk-logic" }, { text: "    Ganaste!", type: "blk-action" }, { text: "    SINO: Chau", type: "blk-action" }, { text: "SINO: Seguir", type: "blk-action" }] }
        ]
    }
};


const compuExtra = {
    inicial: [
        { q: "Para escuchar sonido", ans: "Parlante", opts: ["Parlante", "Teclado", "Mouse"] },
        { q: "Nos muestra la imagen", ans: "Display", opts: ["Display", "Ratón", "Escáner"] },
        { q: "Para videollamadas", ans: "Cámara", opts: ["Cámara", "CPU", "Disco"] },
        { q: "Para grabar voces", ans: "Micrófono", opts: ["Micrófono", "Impresora", "Pantalla"] },
        { q: "Escuchar en silencio", ans: "Auriculares", opts: ["Auriculares", "Monitor", "Teclado"] },
        { q: "Da internet sin cables", ans: "WiFi", opts: ["WiFi", "Pendrive", "CPU"] },
        { q: "Lo usamos para clickear", ans: "Mouse", opts: ["Mouse", "Pantalla", "Teclado"] },
        { q: "Guardamos cosas de llevar", ans: "Pendrive", opts: ["Pendrive", "Cable", "Cámara"] },
        { q: "Da energía a la compu", ans: "Cargador", opts: ["Cargador", "Ratón", "Escáner"] },
        { q: "Saca copias a papel", ans: "Impresora", opts: ["Impresora", "Monitor", "Micrófono"] }
    ],
    intermedia: [
        { q: "Para mandar correos", ans: "Gmail", opts: ["Gmail", "Word", "Paint"] },
        { q: "Planilla de cálculo", ans: "Excel", opts: ["Excel", "Chrome", "YouTube"] },
        { q: "Buscador famoso", ans: "Google", opts: ["Google", "Windows", "Office"] },
        { q: "Red sin cables", ans: "WiFi", opts: ["WiFi", "USB", "Cable"] },
        { q: "Programa de dibujo", ans: "Paint", opts: ["Paint", "Chrome", "Excel"] },
        { q: "Chatear desde el celu", ans: "WhatsApp", opts: ["WhatsApp", "Word", "Excel"] },
        { q: "Para videollamadas", ans: "Zoom", opts: ["Zoom", "Paint", "Chrome"] },
        { q: "Formato de documentos", ans: "PDF", opts: ["PDF", "JPG", "MP3"] },
        { q: "El corazón de internet", ans: "Servidor", opts: ["Servidor", "Monitor", "Teclado"] },
        { q: "Sistema de Apple", ans: "MacOS", opts: ["MacOS", "Windows", "Linux"] }
    ],
    dificil: [
        { q: "Tipo de archivo de foto", ans: "JPG", opts: ["JPG", "MP3", "EXE"] },
        { q: "Tipo de archivo de música", ans: "MP3", opts: ["MP3", "PDF", "JPG"] },
        { q: "Para descomprimir", ans: "WinRAR", opts: ["WinRAR", "Chrome", "Word"] },
        { q: "Conecta disp. de cerca", ans: "Bluetooth", opts: ["Bluetooth", "WiFi", "Ethernet"] },
        { q: "Cable de red local", ans: "Ethernet", opts: ["Ethernet", "HDMI", "VGA"] },
        { q: "Formato de video", ans: "MP4", opts: ["MP4", "TXT", "ZIP"] },
        { q: "Tarjeta base", ans: "Motherboard", opts: ["Motherboard", "CPU", "RAM"] },
        { q: "Cable de video", ans: "HDMI", opts: ["HDMI", "USB", "Audio"] },
        { q: "Ejecutable Windows", ans: "EXE", opts: ["EXE", "PDF", "PNG"] },
        { q: "Para leer PDFs", ans: "Acrobat", opts: ["Acrobat", "Excel", "WinRAR"] }
    ],
    experta: [
        { q: "Dirección de página web", ans: "URL", opts: ["URL", "DNS", "IP"] },
        { q: "Servidor de nombres", ans: "DNS", opts: ["DNS", "IP", "FTP"] },
        { q: "Para copiar texto", ans: "Ctrl+C", opts: ["Ctrl+C", "Ctrl+V", "Ctrl+X"] },
        { q: "Para pegar texto", ans: "Ctrl+V", opts: ["Ctrl+V", "Ctrl+C", "Ctrl+Z"] },
        { q: "Deshacer acción", ans: "Ctrl+Z", opts: ["Ctrl+Z", "Ctrl+X", "Ctrl+C"] },
        { q: "Protocolo web", ans: "HTTP", opts: ["HTTP", "FTP", "SSH"] },
        { q: "Subir archivos relamp.", ans: "FTP", opts: ["FTP", "DNS", "IP"] },
        { q: "Lenguaje hojas de estilo", ans: "CSS", opts: ["CSS", "HTML", "PHP"] },
        { q: "Ataque a sitios web", ans: "DDoS", opts: ["DDoS", "Spam", "Phishing"] },
        { q: "Red Segura", ans: "HTTPS", opts: ["HTTPS", "HTTP", "FTP"] }
    ],
    prodigio: [
        { q: "Programa espía", ans: "Spyware", opts: ["Spyware", "Adware", "Trojan"] },
        { q: "Correo basura", ans: "Spam", opts: ["Spam", "Phishing", "Malware"] },
        { q: "Robo de identidad digital", ans: "Phishing", opts: ["Phishing", "Spam", "Ransomware"] },
        { q: "Cortafuegos de red", ans: "Firewall", opts: ["Firewall", "Antivirus", "Proxy"] },
        { q: "Red privada virtual", ans: "VPN", opts: ["VPN", "LAN", "WAN"] },
        { q: "Ataque por secuestro", ans: "Ransomware", opts: ["Ransomware", "Troyano", "Gusano"] },
        { q: "Dirección física de Red", ans: "MAC", opts: ["MAC", "IP", "DNS"] },
        { q: "Sistema de Google celular", ans: "Android", opts: ["Android", "iOS", "Windows"] },
        { q: "Intermediario red", ans: "Proxy", opts: ["Proxy", "Switch", "Hub"] },
        { q: "Publicidad no deseada", ans: "Adware", opts: ["Adware", "Malware", "Spyware"] }
    ]
};

const algoritmosExtra = {
    "inicial": [
        {
            "title": "Abrir Puerta",
            "blocks": [
                {
                    "text": "Poner llave",
                    "type": "blk-action"
                },
                {
                    "text": "Girar llave",
                    "type": "blk-action"
                },
                {
                    "text": "Empujar",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Encender Fuego",
            "blocks": [
                {
                    "text": "Juntar leña",
                    "type": "blk-action"
                },
                {
                    "text": "Usar fósforo",
                    "type": "blk-action"
                },
                {
                    "text": "Soplar suave",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Cortar Papel",
            "blocks": [
                {
                    "text": "Tomar tijera",
                    "type": "blk-action"
                },
                {
                    "text": "Abrir hojas",
                    "type": "blk-action"
                },
                {
                    "text": "Cerrar en papel",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Leer Mensaje",
            "blocks": [
                {
                    "text": "Tomar celu",
                    "type": "blk-action"
                },
                {
                    "text": "Desbloquear",
                    "type": "blk-action"
                },
                {
                    "text": "Abrir chat",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Comer Helado",
            "blocks": [
                {
                    "text": "Quitar papel",
                    "type": "blk-action"
                },
                {
                    "text": "Poner en boca",
                    "type": "blk-action"
                },
                {
                    "text": "Saborear",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Dibujar Casa",
            "blocks": [
                {
                    "text": "Hacer cuadrado",
                    "type": "blk-action"
                },
                {
                    "text": "Hacer techo",
                    "type": "blk-action"
                },
                {
                    "text": "Hacer puerta",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Cazar Mosquito",
            "blocks": [
                {
                    "text": "Verlo",
                    "type": "blk-action"
                },
                {
                    "text": "Apuntar",
                    "type": "blk-action"
                },
                {
                    "text": "Aplaudir",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Sonarse Nariz",
            "blocks": [
                {
                    "text": "Tomar pañuelo",
                    "type": "blk-action"
                },
                {
                    "text": "Poner en nariz",
                    "type": "blk-action"
                },
                {
                    "text": "Soplar",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Lavar Cara",
            "blocks": [
                {
                    "text": "Agarrar agua",
                    "type": "blk-action"
                },
                {
                    "text": "Frotar cara",
                    "type": "blk-action"
                },
                {
                    "text": "Secar toalla",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Vestirse",
            "blocks": [
                {
                    "text": "Remera",
                    "type": "blk-action"
                },
                {
                    "text": "Pantalón",
                    "type": "blk-action"
                },
                {
                    "text": "Zapatillas",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Pisar Uva",
            "blocks": [
                {
                    "text": "Poner uva",
                    "type": "blk-action"
                },
                {
                    "text": "Saltar",
                    "type": "blk-action"
                },
                {
                    "text": "Hacer jugo",
                    "type": "blk-action"
                }
            ]
        }
    ],
    "intermedia": [
        {
            "title": "Armar Torre",
            "blocks": [
                {
                    "text": "Base grande",
                    "type": "blk-action"
                },
                {
                    "text": "Base media",
                    "type": "blk-action"
                },
                {
                    "text": "Cubo chico",
                    "type": "blk-action"
                },
                {
                    "text": "Punta",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Jugar Cartas",
            "blocks": [
                {
                    "text": "Mezclar",
                    "type": "blk-action"
                },
                {
                    "text": "Repartir",
                    "type": "blk-action"
                },
                {
                    "text": "Mirar mano",
                    "type": "blk-action"
                },
                {
                    "text": "Lanzar carta",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Manejar Bici",
            "blocks": [
                {
                    "text": "Subir",
                    "type": "blk-action"
                },
                {
                    "text": "Pedal Der",
                    "type": "blk-action"
                },
                {
                    "text": "Pedal Izq",
                    "type": "blk-action"
                },
                {
                    "text": "Frenar",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Cocinar Huevo",
            "blocks": [
                {
                    "text": "Sartén al fuego",
                    "type": "blk-action"
                },
                {
                    "text": "Poner aceite",
                    "type": "blk-action"
                },
                {
                    "text": "Romper huevo",
                    "type": "blk-action"
                },
                {
                    "text": "Sacar",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Comprar Helado",
            "blocks": [
                {
                    "text": "Pedir gusto",
                    "type": "blk-action"
                },
                {
                    "text": "Dar billete",
                    "type": "blk-action"
                },
                {
                    "text": "Recibir vuelto",
                    "type": "blk-action"
                },
                {
                    "text": "Comer",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Bañar Perro",
            "blocks": [
                {
                    "text": "Mojar pelo",
                    "type": "blk-action"
                },
                {
                    "text": "Poner shampoo",
                    "type": "blk-action"
                },
                {
                    "text": "Enjuagar",
                    "type": "blk-action"
                },
                {
                    "text": "Secar",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Sembrar",
            "blocks": [
                {
                    "text": "Hacer pozo",
                    "type": "blk-action"
                },
                {
                    "text": "Poner semilla",
                    "type": "blk-action"
                },
                {
                    "text": "Tapar tierra",
                    "type": "blk-action"
                },
                {
                    "text": "Regar",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Viajar Colectivo",
            "blocks": [
                {
                    "text": "Hacer parada",
                    "type": "blk-action"
                },
                {
                    "text": "Subir",
                    "type": "blk-action"
                },
                {
                    "text": "Pagar boleto",
                    "type": "blk-action"
                },
                {
                    "text": "Sentarse",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Mirar Cine",
            "blocks": [
                {
                    "text": "Entrar sala",
                    "type": "blk-action"
                },
                {
                    "text": "Boleto al señor",
                    "type": "blk-action"
                },
                {
                    "text": "Sentarse en butaca",
                    "type": "blk-action"
                },
                {
                    "text": "Mirar silencio",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Pintar Uñas",
            "blocks": [
                {
                    "text": "Abrir esmalte",
                    "type": "blk-action"
                },
                {
                    "text": "Pasar pincel",
                    "type": "blk-action"
                },
                {
                    "text": "Dejar secar",
                    "type": "blk-action"
                },
                {
                    "text": "Segunda capa",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Cortar Pelo",
            "blocks": [
                {
                    "text": "Poner capa",
                    "type": "blk-action"
                },
                {
                    "text": "Cortar mechón",
                    "type": "blk-action"
                },
                {
                    "text": "Peinar",
                    "type": "blk-action"
                },
                {
                    "text": "Espejo final",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Lavar Auto",
            "blocks": [
                {
                    "text": "Manguera",
                    "type": "blk-action"
                },
                {
                    "text": "Esponja jabón",
                    "type": "blk-action"
                },
                {
                    "text": "Enjuagar",
                    "type": "blk-action"
                },
                {
                    "text": "Secar trapo",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Correr Carrera",
            "blocks": [
                {
                    "text": "En sus marcas",
                    "type": "blk-action"
                },
                {
                    "text": "Listos",
                    "type": "blk-action"
                },
                {
                    "text": "Ya!",
                    "type": "blk-action"
                },
                {
                    "text": "Correr meta",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Hacer Yoga",
            "blocks": [
                {
                    "text": "Sentarse loto",
                    "type": "blk-action"
                },
                {
                    "text": "Respirar hondo",
                    "type": "blk-action"
                },
                {
                    "text": "Estirar brazos",
                    "type": "blk-action"
                },
                {
                    "text": "Soltar aire",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Construir Muro",
            "blocks": [
                {
                    "text": "Poner cemento",
                    "type": "blk-action"
                },
                {
                    "text": "Poner ladrillo",
                    "type": "blk-action"
                },
                {
                    "text": "Nivelar",
                    "type": "blk-action"
                },
                {
                    "text": "Sacar sobra",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Apagar Fuego",
            "blocks": [
                {
                    "text": "Agarrar extintor",
                    "type": "blk-action"
                },
                {
                    "text": "Sacar seguro",
                    "type": "blk-action"
                },
                {
                    "text": "Apuntar base",
                    "type": "blk-action"
                },
                {
                    "text": "Apretar",
                    "type": "blk-action"
                }
            ]
        }
    ],
    "dificil": [
        {
            "title": "Salto 5 vallas",
            "blocks": [
                {
                    "text": "Repetir 5",
                    "type": "blk-control"
                },
                {
                    "text": "  Correr",
                    "type": "blk-action"
                },
                {
                    "text": "  Saltar",
                    "type": "blk-action"
                },
                {
                    "text": "Fin Repetir",
                    "type": "blk-control"
                }
            ]
        },
        {
            "title": "Estirar 10 veces",
            "blocks": [
                {
                    "text": "Repetir 10",
                    "type": "blk-control"
                },
                {
                    "text": "  Brazo arriba",
                    "type": "blk-action"
                },
                {
                    "text": "  Brazo abajo",
                    "type": "blk-action"
                },
                {
                    "text": "Fin Repetir",
                    "type": "blk-control"
                }
            ]
        },
        {
            "title": "Servir 5 Vasos",
            "blocks": [
                {
                    "text": "Repetir 5",
                    "type": "blk-control"
                },
                {
                    "text": "  Poner vaso",
                    "type": "blk-action"
                },
                {
                    "text": "  Llenarlo",
                    "type": "blk-action"
                },
                {
                    "text": "Fin Repetir",
                    "type": "blk-control"
                }
            ]
        },
        {
            "title": "Borrar 8 errores",
            "blocks": [
                {
                    "text": "Repetir 8",
                    "type": "blk-control"
                },
                {
                    "text": "  Backspace",
                    "type": "blk-action"
                },
                {
                    "text": "  Limpiar",
                    "type": "blk-action"
                },
                {
                    "text": "Fin Repetir",
                    "type": "blk-control"
                }
            ]
        },
        {
            "title": "Leer 3 páginas",
            "blocks": [
                {
                    "text": "Repetir 3",
                    "type": "blk-control"
                },
                {
                    "text": "  Mirar texto",
                    "type": "blk-action"
                },
                {
                    "text": "  Pasar hoja",
                    "type": "blk-action"
                },
                {
                    "text": "Fin Repetir",
                    "type": "blk-control"
                }
            ]
        },
        {
            "title": "Saltar soga 100",
            "blocks": [
                {
                    "text": "Repetir 100",
                    "type": "blk-control"
                },
                {
                    "text": "  Girar soga",
                    "type": "blk-action"
                },
                {
                    "text": "  Saltar alto",
                    "type": "blk-action"
                },
                {
                    "text": "Fin Repetir",
                    "type": "blk-control"
                }
            ]
        },
        {
            "title": "Decir 5 hola",
            "blocks": [
                {
                    "text": "Repetir 5",
                    "type": "blk-control"
                },
                {
                    "text": "  Abrir boca",
                    "type": "blk-action"
                },
                {
                    "text": "  Decir Hola",
                    "type": "blk-action"
                },
                {
                    "text": "Fin Repetir",
                    "type": "blk-control"
                }
            ]
        },
        {
            "title": "Clavar 3 clavos",
            "blocks": [
                {
                    "text": "Repetir 3",
                    "type": "blk-control"
                },
                {
                    "text": "  Poner clavo",
                    "type": "blk-action"
                },
                {
                    "text": "  Golpear",
                    "type": "blk-action"
                },
                {
                    "text": "Fin Repetir",
                    "type": "blk-control"
                }
            ]
        },
        {
            "title": "Cortar 6 rebanadas",
            "blocks": [
                {
                    "text": "Repetir 6",
                    "type": "blk-control"
                },
                {
                    "text": "  Bajar cuchillo",
                    "type": "blk-action"
                },
                {
                    "text": "  Subir cuchillo",
                    "type": "blk-action"
                },
                {
                    "text": "Fin Repetir",
                    "type": "blk-control"
                }
            ]
        },
        {
            "title": "Revisar 4 ruedas",
            "blocks": [
                {
                    "text": "Repetir 4",
                    "type": "blk-control"
                },
                {
                    "text": "  Ir a rueda",
                    "type": "blk-action"
                },
                {
                    "text": "  Tocar goma",
                    "type": "blk-action"
                },
                {
                    "text": "Fin Repetir",
                    "type": "blk-control"
                }
            ]
        },
        {
            "title": "Regar 10 Plantas",
            "blocks": [
                {
                    "text": "Repetir 10",
                    "type": "blk-control"
                },
                {
                    "text": "  Mover a planta",
                    "type": "blk-action"
                },
                {
                    "text": "  Echar agua",
                    "type": "blk-action"
                },
                {
                    "text": "Fin Repetir",
                    "type": "blk-control"
                }
            ]
        }
    ],
    "experta": [
        {
            "title": "Si llueve",
            "blocks": [
                {
                    "text": "Mirar clima",
                    "type": "blk-action"
                },
                {
                    "text": "SI llueve",
                    "type": "blk-control"
                },
                {
                    "text": "  Botas",
                    "type": "blk-action"
                },
                {
                    "text": "SINO",
                    "type": "blk-control"
                },
                {
                    "text": "  Zapas",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Batería 0",
            "blocks": [
                {
                    "text": "Ver batería",
                    "type": "blk-action"
                },
                {
                    "text": "SI 0%",
                    "type": "blk-control"
                },
                {
                    "text": "  Apagar",
                    "type": "blk-action"
                },
                {
                    "text": "SINO",
                    "type": "blk-control"
                },
                {
                    "text": "  Prendido",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Si es dulce",
            "blocks": [
                {
                    "text": "Probar comida",
                    "type": "blk-action"
                },
                {
                    "text": "SI es dulce",
                    "type": "blk-control"
                },
                {
                    "text": "  Sonreír",
                    "type": "blk-action"
                },
                {
                    "text": "SINO",
                    "type": "blk-control"
                },
                {
                    "text": "  Arrugar",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Si hay luz",
            "blocks": [
                {
                    "text": "Mirar foco",
                    "type": "blk-action"
                },
                {
                    "text": "SI luz on",
                    "type": "blk-control"
                },
                {
                    "text": "  Leer",
                    "type": "blk-action"
                },
                {
                    "text": "SINO",
                    "type": "blk-control"
                },
                {
                    "text": "  Dormir",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Si es caro",
            "blocks": [
                {
                    "text": "Ver precio",
                    "type": "blk-action"
                },
                {
                    "text": "SI caro",
                    "type": "blk-control"
                },
                {
                    "text": "  Ahorrar",
                    "type": "blk-action"
                },
                {
                    "text": "SINO",
                    "type": "blk-control"
                },
                {
                    "text": "  Comprar",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Luz Roja",
            "blocks": [
                {
                    "text": "Semáforo",
                    "type": "blk-action"
                },
                {
                    "text": "SI rojo",
                    "type": "blk-control"
                },
                {
                    "text": "  Frenar",
                    "type": "blk-action"
                },
                {
                    "text": "SINO",
                    "type": "blk-control"
                },
                {
                    "text": "  Avanzar",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Si es feriado",
            "blocks": [
                {
                    "text": "Ver calendario",
                    "type": "blk-action"
                },
                {
                    "text": "SI feriado",
                    "type": "blk-control"
                },
                {
                    "text": "  Descansar",
                    "type": "blk-action"
                },
                {
                    "text": "SINO",
                    "type": "blk-control"
                },
                {
                    "text": "  Trabajar",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Perro ladra",
            "blocks": [
                {
                    "text": "Perro ve algo",
                    "type": "blk-action"
                },
                {
                    "text": "SI es ladrón",
                    "type": "blk-control"
                },
                {
                    "text": "  Ladrar",
                    "type": "blk-action"
                },
                {
                    "text": "SINO",
                    "type": "blk-control"
                },
                {
                    "text": "  Mover cola",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Planta seca",
            "blocks": [
                {
                    "text": "Tocar tierra",
                    "type": "blk-action"
                },
                {
                    "text": "SI seca",
                    "type": "blk-control"
                },
                {
                    "text": "  Agua",
                    "type": "blk-action"
                },
                {
                    "text": "SINO",
                    "type": "blk-control"
                },
                {
                    "text": "  Nada",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Coche sin nafta",
            "blocks": [
                {
                    "text": "Mirar tanque",
                    "type": "blk-action"
                },
                {
                    "text": "SI vacío",
                    "type": "blk-control"
                },
                {
                    "text": "  Cargar",
                    "type": "blk-action"
                },
                {
                    "text": "SINO",
                    "type": "blk-control"
                },
                {
                    "text": "  Manejar",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Película de terror",
            "blocks": [
                {
                    "text": "Ver género",
                    "type": "blk-action"
                },
                {
                    "text": "SI terror",
                    "type": "blk-control"
                },
                {
                    "text": "  Cerrar ojos",
                    "type": "blk-action"
                },
                {
                    "text": "SINO",
                    "type": "blk-control"
                },
                {
                    "text": "  Mirar",
                    "type": "blk-action"
                }
            ]
        }
    ],
    "prodigio": [
        {
            "title": "Clave cajero",
            "blocks": [
                {
                    "text": "SI clave ok",
                    "type": "blk-control"
                },
                {
                    "text": "  SI saldo ok",
                    "type": "blk-logic"
                },
                {
                    "text": "    Retirar",
                    "type": "blk-action"
                },
                {
                    "text": "    SINO: Rechazado",
                    "type": "blk-action"
                },
                {
                    "text": "SINO: Alarma",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Viaje Avión",
            "blocks": [
                {
                    "text": "SI hay ticket",
                    "type": "blk-control"
                },
                {
                    "text": "  SI pasaporte ok",
                    "type": "blk-logic"
                },
                {
                    "text": "    Embarcar",
                    "type": "blk-action"
                },
                {
                    "text": "    SINO: A casa",
                    "type": "blk-action"
                },
                {
                    "text": "SINO: Llorar",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Cine 3D",
            "blocks": [
                {
                    "text": "SI hay entrada",
                    "type": "blk-control"
                },
                {
                    "text": "  SI dan lentes",
                    "type": "blk-logic"
                },
                {
                    "text": "    Mirar peli",
                    "type": "blk-action"
                },
                {
                    "text": "    SINO: Quejarse",
                    "type": "blk-action"
                },
                {
                    "text": "SINO: Irse",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Juego Online",
            "blocks": [
                {
                    "text": "SI hay ping",
                    "type": "blk-control"
                },
                {
                    "text": "  SI es bajo",
                    "type": "blk-logic"
                },
                {
                    "text": "    Jugar",
                    "type": "blk-action"
                },
                {
                    "text": "    SINO: Lag",
                    "type": "blk-action"
                },
                {
                    "text": "SINO: Desconect",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Robot Cocina",
            "blocks": [
                {
                    "text": "SI hay olla",
                    "type": "blk-control"
                },
                {
                    "text": "  SI hay fuego",
                    "type": "blk-logic"
                },
                {
                    "text": "    Cocinar",
                    "type": "blk-action"
                },
                {
                    "text": "    SINO: Prender",
                    "type": "blk-action"
                },
                {
                    "text": "SINO: Buscar",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Navegar GPS",
            "blocks": [
                {
                    "text": "SI destino ok",
                    "type": "blk-control"
                },
                {
                    "text": "  SI satélite ok",
                    "type": "blk-logic"
                },
                {
                    "text": "    Ruta",
                    "type": "blk-action"
                },
                {
                    "text": "    SINO: Buscando",
                    "type": "blk-action"
                },
                {
                    "text": "SINO: Error",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Ascensor VIP",
            "blocks": [
                {
                    "text": "SI tarjeta VIP",
                    "type": "blk-control"
                },
                {
                    "text": "  SI piso 100",
                    "type": "blk-logic"
                },
                {
                    "text": "    Subir",
                    "type": "blk-action"
                },
                {
                    "text": "    SINO: Normal",
                    "type": "blk-action"
                },
                {
                    "text": "SINO: Denegado",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Lavarropas Auto",
            "blocks": [
                {
                    "text": "SI puerta cierra",
                    "type": "blk-control"
                },
                {
                    "text": "  SI peso ok",
                    "type": "blk-logic"
                },
                {
                    "text": "    Lavar",
                    "type": "blk-action"
                },
                {
                    "text": "    SINO: Sacar ropa",
                    "type": "blk-action"
                },
                {
                    "text": "SINO: Bip",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Dron Reparto",
            "blocks": [
                {
                    "text": "SI caja pesa",
                    "type": "blk-control"
                },
                {
                    "text": "  SI < 2kg",
                    "type": "blk-logic"
                },
                {
                    "text": "    Volar",
                    "type": "blk-action"
                },
                {
                    "text": "    SINO: Caer",
                    "type": "blk-action"
                },
                {
                    "text": "SINO: Vacío",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Alarma Humo",
            "blocks": [
                {
                    "text": "SI hay humo",
                    "type": "blk-control"
                },
                {
                    "text": "  SI es espeso",
                    "type": "blk-logic"
                },
                {
                    "text": "    Agua!",
                    "type": "blk-action"
                },
                {
                    "text": "    SINO: Bip",
                    "type": "blk-action"
                },
                {
                    "text": "SINO: Todo ok",
                    "type": "blk-action"
                }
            ]
        },
        {
            "title": "Frenado Auto",
            "blocks": [
                {
                    "text": "SI obstáculo",
                    "type": "blk-control"
                },
                {
                    "text": "  SI < 5m",
                    "type": "blk-logic"
                },
                {
                    "text": "    Freno seco",
                    "type": "blk-action"
                },
                {
                    "text": "    SINO: Despacio",
                    "type": "blk-action"
                },
                {
                    "text": "SINO: Avanzar",
                    "type": "blk-action"
                }
            ]
        }
    ]
};
Object.keys(compuExtra).forEach(k => GAME_CONTENT.compu[k].push(...compuExtra[k]));
Object.keys(algoritmosExtra).forEach(k => GAME_CONTENT.algoritmos[k].push(...algoritmosExtra[k]));


const DEFAULT_SHOP = [
    { id: 't1', name: 'Camisa Steve', type: 'torso', color: '#29b6f6', price: 0 },
    { id: 'l1', name: 'Pantalón Azul', type: 'legs', color: '#3f51b5', price: 0 },
    { id: 'h1', name: 'Piel Base', type: 'head', color: '#ffcc80', price: 0 },
    { id: 'h2', name: 'Cara Zombie', type: 'head', color: '#66bb6a', price: 150 },
    { id: 't2', name: 'Oro Puro', type: 'torso', color: '#fbc02d', price: 200 },

    { id: 'h3', name: 'Alex Face', type: 'head', color: 'img/alex-face.png', price: 150 },
    { id: 'h4', name: 'Cow Face', type: 'head', color: 'img/cow-face.png', price: 150 },
    { id: 'h5', name: 'Creeper Face', type: 'head', color: 'img/creeper-face.png', price: 150 },
    { id: 'h6', name: 'Dog Face', type: 'head', color: 'img/dog-face.png', price: 150 },
    { id: 'h7', name: 'Frog Face', type: 'head', color: 'img/frog-face.png', price: 150 },
    { id: 'h8', name: 'Fox Face', type: 'head', color: 'img/fox-face.png', price: 150 },
    { id: 'h9', name: 'Guardian Face', type: 'head', color: 'img/guardian-face.png', price: 150 },
    { id: 'h10', name: 'Pig Face', type: 'head', color: 'img/pig-face.png', price: 150 },
    { id: 'h11', name: 'Steve Face', type: 'head', color: 'img/steve-face.png', price: 150 },
    { id: 'h12', name: 'Vindicator Face', type: 'head', color: 'img/vindicator-face.png', price: 150 }
];


// ==========================================
// 3. ESTADO DEL JUEGO & ROBUSTEZ
// ==========================================
let isTransitioning = false; // Anti-Frustración (Debouncing)
let player = {
    name: 'Jugador',
    grade: 'inicial',
    coins: 2000,
    answered: [],
    progress: {
        inicial: { matematica: 1, compu: 1, teclado: 1, ingles: 1, Geografia: 1, claves: 1, Algoritmos: 1, python: 1 },
        intermedia: { matematica: 1, compu: 1, teclado: 1, ingles: 1, Geografia: 1, claves: 1, Algoritmos: 1, python: 1 },
        dificil: { matematica: 1, compu: 1, teclado: 1, ingles: 1, Geografia: 1, claves: 1, Algoritmos: 1, python: 1 },
        experta: { matematica: 1, compu: 1, teclado: 1, ingles: 1, Geografia: 1, claves: 1, Algoritmos: 1, python: 1 },
        prodigio: { matematica: 1, compu: 1, teclado: 1, ingles: 1, Geografia: 1, claves: 1, Algoritmos: 1, python: 1 }
    },
    inventory: ['t1', 'l1', 'h1'],
    skin: { head: '#ffcc80', torso: '#29b6f6', legs: '#3f51b5', arm: '#ffcc80', pupil: '#1e3a8a' }
};
let localDB = { customLevels: [], shopItems: DEFAULT_SHOP };
let currentSession = { subject: null, level: 1, startTime: null, backspaces: 0, pythonValid: [], pythonOut: "", sequence: [], seqPoolId: null };
let timerInterval = null;
let currentPuzzleSolution = [];

// ==========================================
// 4. INICIALIZACIÓN
// ==========================================
window.onload = function () {
    if (localStorage.getItem('eduPlayer')) {
        try {
            let saved = JSON.parse(localStorage.getItem('eduPlayer'));
            ['inicial', 'intermedia', 'dificil', 'experta', 'prodigio'].forEach(g => {
                if (!saved.progress[g]) saved.progress[g] = { matematica: 1, compu: 1, teclado: 1, ingles: 1, Geografia: 1, claves: 1, Algoritmos: 1, python: 1 };
                else {
                    saved.progress[g].Geografia = saved.progress[g].Geografia || 1;
                    saved.progress[g].claves = saved.progress[g].claves || 1;
                    saved.progress[g].Algoritmos = saved.progress[g].Algoritmos || 1;
                    saved.progress[g].python = saved.progress[g].python || 1;
                }
            });
            player = saved;
            if (!player.answered) player.answered = [];
        } catch (e) { console.error("Error save", e); }
    }
    if (localStorage.getItem('eduDB')) localDB = JSON.parse(localStorage.getItem('eduDB'));

    document.getElementById('usernameInput').value = player.name;
    document.getElementById('gradeSelect').value = player.grade;
    updateUI();
    loadLeaderboard();
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

    const pl = document.getElementById('avPupilL');
    if (pl) pl.style.backgroundColor = player.skin.pupil || '#1e3a8a';
    const pr = document.getElementById('avPupilR');
    if (pr) pr.style.backgroundColor = player.skin.pupil || '#1e3a8a';
}

function applyTexture(elementId, value) {
    const el = document.getElementById(elementId);
    if (!el) return;

    // Nueva condición: verifica si es una URL, un data:image o un archivo con extensión
    const isImage = value && (
        value.startsWith('http') ||
        value.startsWith('data:image') ||
        value.includes('.png') ||
        value.includes('.jpg') ||
        value.includes('.jpeg')
    );

    if (isImage) {
        el.style.backgroundColor = 'transparent';
        el.style.backgroundImage = `url('${value}')`;
    } else {
        el.style.backgroundImage = 'none';
        el.style.backgroundColor = value;
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

// ==========================================
// CHARACTER CREATOR LOGIC
// ==========================================
function openCharacterCreator() {
    document.getElementById('avatarCreatorModal').style.display = 'flex';
    document.getElementById('ccHeadColor').value = player.skin.head || '#ffcc80';
    document.getElementById('ccArmsColor').value = player.skin.arm || '#ffcc80';
    document.getElementById('ccTorsoColor').value = player.skin.torso || '#3b82f6';
    document.getElementById('ccLegsColor').value = player.skin.legs || '#1e3a8a';
    document.getElementById('ccPupilColor').value = player.skin.pupil || '#1e3a8a';
    updateCreatorPreview();
}

function updateCreatorPreview() {
    const head = document.getElementById('ccHeadColor').value;
    const arms = document.getElementById('ccArmsColor').value;
    const torso = document.getElementById('ccTorsoColor').value;
    const legs = document.getElementById('ccLegsColor').value;
    const pupil = document.getElementById('ccPupilColor').value;

    applyTexture('prevHead', head);
    applyTexture('prevArmL', arms);
    applyTexture('prevArmR', arms);
    applyTexture('prevTorso', torso);
    applyTexture('prevLegL', legs);
    applyTexture('prevLegR', legs);

    const ppl = document.getElementById('prevPupilL');
    if (ppl) ppl.style.backgroundColor = pupil;
    const ppr = document.getElementById('prevPupilR');
    if (ppr) ppr.style.backgroundColor = pupil;
}

function saveCharacterCreator() {
    const head = document.getElementById('ccHeadColor').value;
    const arms = document.getElementById('ccArmsColor').value;
    const torso = document.getElementById('ccTorsoColor').value;
    const legs = document.getElementById('ccLegsColor').value;
    const pupil = document.getElementById('ccPupilColor').value;

    player.skin.head = head;
    player.skin.arm = arms;
    player.skin.torso = torso;
    player.skin.legs = legs;
    player.skin.pupil = pupil;

    saveData();
    updateUI();
    document.getElementById('avatarCreatorModal').style.display = 'none';
    showToast("¡Avatar actualizado!");
}

function showDashboard() { setView('view-dashboard'); }
function showShop() { setView('view-shop'); renderShop(); }
function setView(id) {
    ['view-dashboard', 'view-map', 'view-shop'].forEach(v => document.getElementById(v).style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

function closeGame() {
    document.getElementById('gameModal').style.display = 'none';
    if (timerInterval) clearInterval(timerInterval);
    if (currentSession.subject === 'claves') showDashboard();
    else renderMap();
}

function renderMap() {
    const grid = document.getElementById('mapGrid'); grid.innerHTML = '';
    const cur = player.progress[player.grade][currentSession.subject];
    for (let i = 1; i <= 50; i++) { // 50 Niveles
        const btn = document.createElement('div'); btn.className = 'level-block'; btn.innerText = i;
        if (i < cur) { btn.classList.add('completed'); btn.onclick = () => playLevel(i); }
        else if (i === cur) { btn.classList.add('current'); btn.onclick = () => playLevel(i); }
        else btn.classList.add('locked');
        grid.appendChild(btn);
    }
}

function playLevel(lvl) {
    currentSession.level = lvl;
    currentSession.startTime = null;
    currentSession.backspaces = 0;
    currentSession.currentQuestionId = null;
    isTransitioning = false;
    if (timerInterval) clearInterval(timerInterval);

    document.getElementById('gameModal').style.display = 'flex';
    const content = document.getElementById('gameContent');
    document.getElementById('gameTitle').innerText = `Nivel ${lvl} (${player.grade.toUpperCase()})`;

    const custom = localDB.customLevels.find(l => l.grade == player.grade && l.subject === currentSession.subject && l.level == lvl);

    if (custom) {
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

function getShuffledItem(pool, subj, grade, lvl) {
    if (!pool || pool.length === 0) return null;
    if (!player.answered) player.answered = [];

    function seededRandom(seed) {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }

    let baseSeed = 0;
    const poolId = subj + "_" + grade + "_" + player.name;
    for (let i = 0; i < poolId.length; i++) {
        baseSeed += poolId.charCodeAt(i);
    }

    let seq = Array.from({ length: pool.length }, (_, i) => i);
    let currentSeed = baseSeed;
    function nextRand() { currentSeed += 1; return seededRandom(currentSeed); }

    for (let i = seq.length - 1; i > 0; i--) {
        const j = Math.floor(nextRand() * (i + 1));
        [seq[i], seq[j]] = [seq[j], seq[i]];
    }

    let availableIdxs = seq.filter(idx => {
        let item = pool[idx];
        let qId = item.title || item.q || (typeof item === 'string' ? item : item.ans);
        return !player.answered.includes(qId);
    });

    if (availableIdxs.length === 0) return null;
    return pool[availableIdxs[0]];
}

function generateProceduralLevel(container, subj, lvl) {
    let q, ans, opts;
    const grade = player.grade;

    // --- MATEMÁTICA ---
    if (subj === 'matematica') {
        let n1, n2, n3, mathAttempts = 0;
        if (!player.answered) player.answered = [];
        do {

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
            let table = Math.floor((lvl - 1) / 5) + 2; if (table > 12) table = 12;
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
                    let base = Math.floor(Math.random() * 6) + 2 + Math.floor(lvl / 4);
                    let exp = (Math.random() > 0.8) ? 3 : 2;
                    q = `¿${base} ${exp === 2 ? 'al cuadrado' : 'al cubo'}? (${base}${exp === 2 ? '²' : '³'})`;
                    ans = Math.pow(base, exp);
                } else {
                    let res = Math.floor(Math.random() * 8) + 2 + Math.floor(lvl / 3);
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
                    let perc = [10, 20, 25, 50][Math.floor(Math.random() * 4)];
                    let total = Math.floor(Math.random() * 20 + 1) * 10;
                    q = `¿${perc}% de ${total}?`; ans = (perc * total) / 100;
                } else {
                    let A = Math.floor(Math.random() * 10) + 5;
                    let B = Math.floor(Math.random() * 10) + 2;
                    let C = Math.floor(Math.random() * 20) + 5;
                    q = `(${A} x ${B}) - ${C}`; ans = (A * B) - C;
                }
            }
        }

        let distractor1 = ans + Math.floor(Math.random() * 5) + 1;
        let distractor2 = ans - Math.floor(Math.random() * 5) - 1;
        let distractor3 = ans + 10;
        opts = [...new Set([ans, distractor1, distractor2, distractor3])].sort(() => Math.random() - 0.5);

        currentSession.currentQuestionId = q;
        mathAttempts++;
        } while (player.answered.includes(q) && mathAttempts < 50);

        renderQuestion(container, q, ans, opts);
        return;
    }

    // --- PYTHON (TEORÍA + SIMULADOR MEJORADO) ---
    else if (subj === 'python') {
        let isTheory = (lvl % 2 !== 0) && (grade !== 'experta' && grade !== 'prodigio');

        if (isTheory) {
            // TEORÍA
            const pool = GAME_CONTENT.python[grade] || GAME_CONTENT.python['inicial'];
            const item = getShuffledItem(pool, 'python', grade, Math.floor((lvl - 1) / 2) + 1);
            if (!item) { container.innerHTML = "<h3>¡Felicidades! Completaste toda la teoría.</h3>"; return; }
            currentSession.currentQuestionId = item.title || item.q || item.ans;
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
                    const vars = ['x', 'y', 'z', 'puntos', 'vida', 'score'];
                    const varName = vars[Math.floor(Math.random() * vars.length)];
                    if (Math.random() > 0.5) {
                        const val = Math.floor(Math.random() * 50) + 1;
                        mision = `Crea variable '${varName}' con valor ${val}`; hint = `${varName} = ${val}`;
                        valid = [`${varName}=${val}`, `${varName} = ${val}`]; output = `Variable ${varName}: ${val}`;
                    } else {
                        const txts = ['Hola', 'Juego', 'Python', 'Win'];
                        const val = txts[Math.floor(Math.random() * txts.length)];
                        mision = `Crea variable '${varName}' con texto "${val}"`; hint = `${varName} = "${val}"`;
                        valid = [`${varName}="${val}"`, `${varName} = "${val}"`, `${varName}='${val}'`, `${varName} = '${val}'`]; output = `Variable ${varName}: ${val}`;
                    }
                } else if (lvl <= 20) {
                    let n1 = Math.floor(Math.random() * 20) + 1; let n2 = Math.floor(Math.random() * 10) + 1;
                    const op = Math.random() > 0.5 ? '+' : '-';
                    mision = `Imprime el resultado de ${n1} ${op} ${n2}`; hint = `print(${n1} ${op} ${n2})`;
                    valid = [`print(${n1}${op}${n2})`, `print(${n1} ${op} ${n2})`]; output = eval(`${n1}${op}${n2}`);
                } else if (lvl <= 30) {
                    const items = [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)];
                    mision = `Crea lista 'L' con números ${items[0]} y ${items[1]}`; hint = `L = [${items[0]}, ${items[1]}]`;
                    valid = [`L=[${items[0]},${items[1]}]`, `L = [${items[0]}, ${items[1]}]`]; output = `Lista L creada.`;
                } else if (lvl <= 40) {
                    let r = Math.floor(Math.random() * 5) + 2;
                    mision = `Bucle que repita "Gol" ${r} veces`; hint = `for i in range(${r}): print("Gol")`;
                    valid = [`for i in range(${r}): print("Gol")`, `for x in range(${r}): print("Gol")`]; output = "Gol\n...";
                } else {
                    const fnames = ['ver', 'correr', 'saltar', 'jugar'];
                    const fname = fnames[Math.floor(Math.random() * fnames.length)];
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
            const pool = GAME_CONTENT.teclado.inicial; target = getShuffledItem(pool, 'teclado', 'inicial', lvl); prompt = "Encuentra la tecla exacta:";
        } else if (player.grade === 'intermedia') {
            const pool = GAME_CONTENT.teclado.intermedia; target = getShuffledItem(pool, 'teclado', 'intermedia', lvl);
            if (lvl <= 25) prompt = "Escribe la frase (Respeta Mayúsculas):"; else prompt = "Encuentra el símbolo:";
        } else if (player.grade === 'dificil') {
            const pool = GAME_CONTENT.teclado.dificil; let subPool = [];
            if (lvl <= 15) { subPool = pool.sinTilde; prompt = "Frase compleja (Sin tildes):"; }
            else if (lvl <= 30) { subPool = pool.conTildeFacil; prompt = "Atención a las tildes:"; }
            else if (lvl <= 40) { subPool = pool.conTildeDificil; prompt = "Frase compleja con tildes:"; }
            else { subPool = pool.dieresis; prompt = "Palabras con Diéresis (ü):"; }
            let typingAttempts = 0;
            if (!player.answered) player.answered = [];
            do {
                target = subPool[Math.floor(Math.random() * subPool.length)];
                typingAttempts++;
            } while (player.answered.includes(target) && typingAttempts < 50);
        } else if (player.grade === 'experta') {
            const pool = GAME_CONTENT.teclado.experta; target = getShuffledItem(pool, 'teclado', 'experta', lvl); prompt = "Escribe la oración exacta:";
        } else {
            const pool = GAME_CONTENT.teclado.prodigio; target = getShuffledItem(pool, 'teclado', 'prodigio', lvl); prompt = "Velocidad (PPM):";
        }

        ans = target;
        if (!ans) { container.innerHTML = "<h3>¡Felicidades! Completaste todas las misiones de tipeo.</h3>"; return; }
        currentSession.currentQuestionId = ans;
        let inputStyle = "text-align:center; font-size:1.2rem; width:100%; padding:15px;";
        let statsHTML = '';
        if (isProdigio) {
            statsHTML = `<div class="stats-bar" style="display:flex; justify-content:space-around; background:#263238; color:#fff; padding:10px; margin-bottom:15px; border-radius:5px;"><div class="stats-item">⏱️ <span id="timeCounter">0.0s</span></div><div class="stats-item">🚀 <span id="wpmCounter" style="color:#00e676; font-weight:bold;">0 PPM</span></div><div class="stats-item">❌ <span id="errCounter" class="stat-danger">0</span></div></div>`;
        }
        container.innerHTML = `${statsHTML}<div style="color:#78909c; font-size:0.9rem; margin-bottom:5px;">${prompt}</div><div style="background:#fff; padding:15px; border-radius:8px; border:2px solid #ccc; margin-bottom:15px; font-family:'Roboto Mono', monospace;"><h3 style="color:#333; margin:0; font-size:${ans.length > 25 ? '1rem' : '1.5rem'}; word-break:break-word;">${ans}</h3></div><input type="text" id="typingInput" autocomplete="off" style="${inputStyle}" placeholder="Escribe aquí..."><button class="mc-btn green" style="width:100%; margin-top:15px;" onclick="checkAnswer(document.getElementById('typingInput').value, '${ans.replace(/'/g, "\\'")}', true)">Confirmar</button>`;

        setTimeout(() => {
            const inp = document.getElementById('typingInput');
            if (inp) {
                inp.focus();
                inp.oninput = () => { if (!currentSession.startTime && isProdigio) { currentSession.startTime = new Date(); timerInterval = setInterval(() => { if (!currentSession.startTime) return; const diff = (new Date() - currentSession.startTime) / 1000; document.getElementById('timeCounter').innerText = diff.toFixed(1) + 's'; const chars = inp.value.length; const mins = diff / 60; const wpm = (mins > 0) ? Math.round((chars / 5) / mins) : 0; document.getElementById('wpmCounter').innerText = wpm + " PPM"; }, 100); } };
                inp.onkeydown = (e) => { if (isProdigio && e.key === 'Backspace') { currentSession.backspaces++; document.getElementById('errCounter').innerText = currentSession.backspaces; } if (e.key === 'Enter') checkAnswer(inp.value, ans, true); };
            }
        }, 50);
        return;
    }

    // --- TRIVIA (INGLES, GEO, COMPU) ---
    else {
        let dbTarget;
        if (subj === 'ingles') dbTarget = GAME_CONTENT.ingles;
        else if (subj === 'Geografia') dbTarget = GAME_CONTENT.geografia;
        else if (subj === 'compu') dbTarget = GAME_CONTENT.compu;

        if (subj === 'ingles' && grade === 'prodigio') {
            const pool = dbTarget.prodigio;
            const item = getShuffledItem(pool, subj, grade, lvl);
            if (!item) { container.innerHTML = "<h3>¡Completaste este modo!</h3>"; return; }
            currentSession.currentQuestionId = item.title || item.q || item.ans;
            ans = item.ans;
            container.innerHTML = `<h3 style="color:#555;">Traduce al Inglés:</h3><div style="background:#fff; padding:15px; border-radius:8px; border:2px solid #ccc; margin-bottom:15px;"><h2 style="color:#1565c0; margin:0;">"${item.q}"</h2></div><input type="text" id="translInput" autocomplete="off" style="text-align:center; font-size:1.2rem; width:100%; padding:10px;" placeholder="Escribe en inglés..."><button class="mc-btn green" style="width:100%; margin-top:15px;" onclick="checkAnswer(document.getElementById('translInput').value, '${ans.replace(/'/g, "\\'")}', false)">Comprobar</button>`;

            setTimeout(() => {
                const inp = document.getElementById('translInput');
                if (inp) {
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
        const item = getShuffledItem(difficultyArray, subj, grade, lvl);
        if (item) {
            currentSession.currentQuestionId = item.title || item.q || item.ans;
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
    const pool = GAME_CONTENT.algoritmos[difficulty] || GAME_CONTENT.algoritmos['inicial'];
    const puzzle = getShuffledItem(pool, 'Algoritmos', difficulty, lvl);
    if (!puzzle) {
        container.innerHTML = "<h3>¡Completaste todas las misiones de lógica!</h3>";
        return;
    }
    currentSession.currentQuestionId = puzzle.title;
    currentPuzzleSolution = puzzle.blocks.map(b => b.text);
    let shuffled = [...puzzle.blocks].sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <div style="text-align:left; margin-bottom:10px;"><h4 style="margin:0; color:#0277bd;">Misión: ${puzzle.title}</h4><small style="color:#555;">Ordena los bloques arrastrándolos (Drag & Drop) o haciendo click.</small></div>
        <div class="algo-container">
            <div style="font-size:0.6rem; color:#999; margin-bottom:-15px;">Tu Programa:</div>
            <div class="algo-workspace" id="workspaceArea" ondrop="drop(event, this)" ondragover="allowDrop(event)">
                <div id="emptyMsg" style="width:100%; text-align:center; padding-top:50px; color:#ccc; pointer-events:none;">Arrastra o haz clic</div>
            </div>
            <div style="font-size:0.6rem; color:#999; margin-bottom:-15px;">Piezas:</div>
            <div class="algo-toolbox" id="toolboxArea" ondrop="drop(event, this)" ondragover="allowDrop(event)">
                ${shuffled.map((b, i) => `<div class="code-block ${b.type}" id="blk_${i}" draggable="true" ondragstart="drag(event)" onclick="moveBlock(this)">${b.text}</div>`).join('')}
            </div>
        </div>
        <button class="mc-btn green" style="width:100%; margin-top:20px;" onclick="checkAlgorithm()">▶️ EJECUTAR</button>
    `;
}

// Funciones Drag & Drop
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, container) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let el = document.getElementById(data);
    if (!el || !container) return;

    // Si soltamos sobre otro bloque, lo insertamos en su contenedor
    if (container.classList.contains('code-block')) {
        container = container.parentElement;
    }

    if (container.id === 'workspaceArea' || container.id === 'toolboxArea') {
        container.appendChild(el);
        const msg = document.getElementById('emptyMsg');
        const ws = document.getElementById('workspaceArea');
        if (msg) msg.style.display = (ws.children.length > 1 && ws.children[0].id === 'emptyMsg') ? 'none' : 'none';
        if (ws.children.length === 1 && ws.children[0].id === 'emptyMsg') msg.style.display = 'block';
    }
}

function moveBlock(el) {
    const ws = document.getElementById('workspaceArea');
    const tb = document.getElementById('toolboxArea');
    const msg = document.getElementById('emptyMsg');

    if (el.parentElement === tb) {
        ws.appendChild(el);
        if (msg) msg.style.display = 'none';
    } else {
        tb.appendChild(el);
        if (ws.children.length <= 1 && msg) msg.style.display = 'block';
    }
}

function checkAlgorithm() {
    if (isTransitioning) return;
    isTransitioning = true;

    const userBlocks = Array.from(document.querySelectorAll('#workspaceArea .code-block'));
    const userSeq = userBlocks.map(el => el.innerText.trim());
    if (JSON.stringify(userSeq) === JSON.stringify(currentPuzzleSolution)) {
        successAction("¡Algoritmo Correcto! +30 🪙", 30);
    } else {
        failAction("Orden Incorrecto");
        document.getElementById('workspaceArea').classList.add('shake-anim');
        setTimeout(() => { document.getElementById('workspaceArea').classList.remove('shake-anim'); }, 500);
    }
}

// 8. LÓGICA DE PYTHON (IDE)
function runPythonCode() {
    if (isTransitioning) return;
    isTransitioning = true;

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
    const len = document.getElementById('pwdLength').value, u = document.getElementById('incUpper').checked, l = document.getElementById('incLower').checked, n = document.getElementById('incNum').checked, s = document.getElementById('incSym').checked;
    let chars = ""; if (u) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; if (l) chars += "abcdefghijklmnopqrstuvwxyz"; if (n) chars += "0123456789"; if (s) chars += "!@#$%^&*";
    if (!chars) return showToast("Elige opciones", "error");
    let pwd = ""; for (let i = 0; i < len; i++) pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    document.getElementById('resultPwd').innerText = pwd;
}
function savePwd() {
    const site = document.getElementById('siteName').value, pwd = document.getElementById('resultPwd').innerText;
    if (!site || pwd === "???") return showToast("Faltan datos", "error");
    const d = document.createElement('div'); d.innerHTML = `<b>${site}:</b> <span style="color:blue">${pwd}</span>`;
    document.getElementById('savedList').prepend(d);
    player.coins += 5; updateUI(); saveData(); showToast("¡Guardado! +5");
}

// 10. VALIDACIÓN Y UTILIDADES GENERALES
function checkAnswer(user, correct, strict = false) {
    if (isTransitioning) return;
    isTransitioning = true;

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
    if (currentSession.level === player.progress[player.grade][currentSession.subject]) player.progress[player.grade][currentSession.subject]++;
    
    // Anotar la pregunta correcta como respondida
    if (!player.answered) player.answered = [];
    if (currentSession.currentQuestionId && !player.answered.includes(currentSession.currentQuestionId)) {
        player.answered.push(currentSession.currentQuestionId);
    }
    
    saveData(); updateUI(); showToast(msg);
    if (timerInterval) clearInterval(timerInterval);
    setTimeout(() => {
        isTransitioning = false;
        if (currentSession.level < 50) playLevel(currentSession.level + 1);
        else closeGame();
    }, 1000);
}

function failAction(msg) {
    player.coins = Math.max(0, player.coins - 10);
    saveData(); updateUI(); showToast(msg, 'error');
    setTimeout(() => { isTransitioning = false; }, 600); // Allow retry shortly after
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

function showToast(msg, type = 'success') { const t = document.createElement('div'); t.className = `toast ${type}`; t.innerHTML = `<span>${type == 'success' ? '✅' : '❌'}</span><span>${msg}</span>`; document.getElementById('notification-area').appendChild(t); setTimeout(() => t.remove(), 4000); }
function resetGame() { if (confirm("¿Borrar todos los datos y avatares (irrecuperable)?")) { localStorage.clear(); sessionStorage.clear(); location.reload(); } }

function saveData() { localStorage.setItem('eduPlayer', JSON.stringify(player)); localStorage.setItem('eduDB', JSON.stringify(localDB)); syncWithCloud(); }

// ==========================================
// API LEADERBOARD LOGIC (FIREBASE)
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

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function syncWithCloud() {
    try {
        await db.collection("leaderboard").doc(player.name).set({
            name: player.name,
            coins: player.coins,
            skin: player.skin,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true }); // Usamos merge para actualizar si ya existe o crear si no
        loadLeaderboard();
    } catch (e) {
        console.warn("API falló (modo offline), Leaderboard no sincronizado: ", e);
    }
}

async function loadLeaderboard() {
    try {
        const snapshot = await db.collection("leaderboard")
            .orderBy("coins", "desc")
            .limit(10)
            .get();

        const players = [];
        snapshot.forEach(doc => {
            players.push(doc.data());
        });

        const list = document.getElementById('leaderboardList');
        if (list) list.innerHTML = '';
        let rank = 1;

        players.forEach(p => {
            const row = document.createElement('div');
            row.className = `leaderboard-item ${rank <= 3 ? 'rank-' + rank : ''}`;

            // Default skin just in case
            const skin = p.skin || { head: '#ffcc80' };
            const bg = (skin.head && skin.head.startsWith('http')) ? `background-image:url('${skin.head}'); background-size:cover;` : `background:${skin.head || '#ffcc80'};`;

            row.innerHTML = `
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="font-size:1.1rem; color:#64748b; font-weight:900; width:20px;">#${rank}</div>
                    <div style="width:30px; height:30px; border-radius:4px; ${bg}"></div>
                    <div style="color:#1e293b; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:100px;">${p.name}</div>
                </div>
                <div style="color:#ca8a04;">${p.coins} 🪙</div>
            `;
            if (list) list.appendChild(row);
            rank++;
        });
    } catch (e) {
        console.error("Error cargando leaderboard", e);
        const list = document.getElementById('leaderboardList');
        if (list) list.innerHTML = `<div style="text-align:center; padding:20px; color:#94a3b8; font-size:0.8rem;">🔌 Ranking Offline<br>Tus datos se guardan localmente.</div>`;
    }
}

function renderShop() {
    const g = document.getElementById('shopGrid'); g.innerHTML = '';
    localDB.shopItems.forEach(it => {
        const owned = player.inventory.includes(it.id);
        const d = document.createElement('div'); d.className = 'panel center-content';

        // --- CAMBIO AQUÍ: Lógica para detectar imagen local o color ---
        const isImage = it.color && (it.color.includes('.') || it.color.startsWith('http'));
        let bg = isImage ? `background-image:url('${it.color}'); background-size:cover;` : `background:${it.color};`;

        d.innerHTML = `<div style="width:40px;height:40px;${bg} margin:0 auto 10px;border:2px solid #000;"></div><b>${it.name}</b><br><small>${owned ? 'Tuyo' : it.price}</small>`;

        d.onclick = () => {
            if (owned) {
                player.skin[it.type] = it.color;
                saveData(); updateUI(); showToast("Equipado");
            }
            else if (player.coins >= it.price) {
                player.coins -= it.price;
                player.inventory.push(it.id);
                player.skin[it.type] = it.color;
                saveData(); updateUI(); renderShop(); showToast("Comprado");
            }
            else showToast("Faltan Monedas", 'error');
        };
        g.appendChild(d);
    });
}

function openAdminLogin() { document.getElementById('adminLoginModal').style.display = 'flex'; }
function checkAdmin() { if (document.getElementById('adminUser').value === 'admin' && document.getElementById('adminPass').value === 'minecraft') { document.getElementById('adminLoginModal').style.display = 'none'; document.getElementById('adminPanelModal').style.display = 'flex'; } else showToast("Error", 'error'); }
function closeAdmin() { document.getElementById('adminPanelModal').style.display = 'none'; }
function adminAddManualPlayer() {
    const name = document.getElementById('manualName').value, coins = parseInt(document.getElementById('manualCoins').value);
    if (!name || isNaN(coins)) return showToast("Datos incorrectos", 'error');
    const newPlayer = { name: name, coins: coins, skin: { head: '#ffcc80', torso: '#29b6f6', legs: '#3f51b5', arm: '#ffcc80' } };
    if (dbOnline) dbOnline.collection("players").doc(name).set(newPlayer).then(() => { showToast(`¡${name} inyectado!`); });
}
function adminAddItem() {
    const n = document.getElementById('admItemName').value, p = document.getElementById('admPrice').value, t = document.getElementById('admType').value, c = document.getElementById('admTexture').value;
    if (!n || !c) return showToast("Falta Info", 'error');
    localDB.shopItems.push({ id: 'c_' + Date.now(), name: n, price: parseInt(p), type: t, color: c }); saveData(); showToast("Item Creado");
}
function adminAddLevel() {
    const g = document.getElementById('admGrade').value, s = document.getElementById('admSubj').value, l = document.getElementById('admLvlNum').value, q = document.getElementById('admQ').value, a = document.getElementById('admAns').value, o = document.getElementById('admOpts').value;
    if (!l || !q || !a) return showToast("Faltan Datos", 'error');
    localDB.customLevels.push({ grade: g, subject: s, level: parseInt(l), question: q, answer: a, options: o }); saveData(); showToast("Nivel Guardado");
}

// ==========================================
// AYUDAS Y SALTOS DE NIVEL
// ==========================================
function buyHelp() {
    if (player.coins >= 1000) {
        player.coins -= 1000;
        saveData();
        updateUI();

        // Determinar qué tipo de ayuda dar basado en la materia actual
        const subj = currentSession.subject;

        if (subj === 'Algoritmos') {
            showToast("💡 Ayuda: Revisa el orden de los primeros pasos, o intenta ejecutar el código para ver dónde falla.", "success");
        } else if (subj === 'python') {
            showToast("💡 Ayuda: Revisa la ortografía (mayúsculas/minúsculas) y la tabulación si usas if/for.", "success");
        } else if (subj === 'teclado') {
            showToast("💡 Ayuda: Trata de posicionar tus dedos índice en las teclas F y J.", "success");
        } else if (subj === 'claves') {
            showToast("💡 Ayuda: Puedes añadir símbolos especiales marcando la casilla.", "success");
        } else {
            // Eliminar opciones incorrectas en trivia o matemática
            const currentOpts = Array.from(document.querySelectorAll('#gameContent button.mc-btn.blue'));
            if (currentOpts.length > 2) {
                // Dejar solo la respuesta correcta y una incorrecta
                const correctBtn = currentOpts.find(btn => btn.getAttribute('onclick').includes(btn.innerText) || btn.innerText === currentPuzzleSolution[0] || btn.innerText == btn.getAttribute('onclick').match(/'([^']+)'\)/)?.[1]);

                let removed = 0;
                for (let i = 0; i < currentOpts.length; i++) {
                    let btn = currentOpts[i];
                    if (btn !== correctBtn && removed < (currentOpts.length - 2)) {
                        btn.style.visibility = 'hidden';
                        removed++;
                    }
                }
                showToast("💡 Ayuda: Hemos ocultado algunas opciones incorrectas.", "success");
            } else {
                showToast("💡 Ayuda: Piensa bien tu respuesta. Esta vez no es tan fácil.", "success");
            }
        }
    } else {
        showToast("❌ No tienes suficientes monedas (1000🪙)", "error");
        const btn = event.currentTarget;
        btn.classList.add('shake-anim');
        setTimeout(() => btn.classList.remove('shake-anim'), 500);
    }
}

function buySkip() {
    if (player.coins >= 2000) {
        player.coins -= 2000;

        // Forzar progreso en el nivel
        const grade = player.grade;
        const subj = currentSession.subject;
        const p = player.progress[grade];

        if (currentSession.level === p[subj]) {
            p[subj]++;
        }

        saveData();
        updateUI();
        closeGame();

        showToast("⏭️ Nivel Saltado", "success");

        // Re-abrir el mapa actualizado
        setTimeout(() => {
            if (subj !== 'claves') {
                openSubject(subj);
            }
        }, 500);

    } else {
        showToast("❌ No tienes suficientes monedas (2000🪙)", "error");
        const btn = event.currentTarget;
        btn.classList.add('shake-anim');
        setTimeout(() => btn.classList.remove('shake-anim'), 500);
    }
}