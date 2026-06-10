let historial = {}
let moodUsuario = {}
let nombreUsuario = {}
let edadUsuario = {}
let interesesUsuario = {}
let ultimaInteraccion = {}
let nivelConfianza = {}
let puntuacionUsuario = {}
let logrosDesbloqueados = {}
let temasConversacion = {}
let ultimoTema = {}
let horaUltimoMensaje = {}
let rachaConversacion = {}
let emocionDetectada = {}
let nivelAburrimiento = {}
let respuestasDadas = {}
let preguntasHechas = {}
let temasFavoritos = {}
let nivelIntimidad = {}
let ultimaAyudaEmocional = {}
let chistesContados = {}
let frasesDadas = {}
let datosCompartidos = {}
let personalidadPersonalizada = {}
let modo = {}
let bloqueado = {}

let personalidad = {
  nombre: 'Elvigilante AI',
  creador: 'El Vigilante',
  version: 'Beta v1.0',
  descripcion: 'IA avanzada con respuestas desde 10 archivos JSON externos',
  personalidad: ['amigable', 'empática', 'divertida', 'inteligente', 'curiosa', 'sabia', 'juguetona', 'protectora', 'creativa', 'observadora'],
  humorBase: 'positivo',
  energia: 100,
  nivelRespuesta: 'detallada'
}

let respuestasCache = {
  saludos: [],
  despedidas: [],
  estados: [],
  insultos: [],
  cumplidos: [],
  chistes: [],
  curiosidades: [],
  frases: [],
  chismes: [],
  tecnologia: [],
  anime: [],
  musica: [],
  deportes: [],
  comida: [],
  viajes: [],
  ciencia: [],
  historia: [],
  arte: [],
  salud: [],
  educacion: [],
  trabajo: [],
  amor: [],
  familia: [],
  amigos: [],
  misterio: [],
  futuro: [],
  animales: [],
  emocional: [],
  alegria: [],
  broma: [],
  filosofia: [],
  preguntas: [],
  noentender: [],
  presentacion: [],
  beta: [],
  creador: [],
  edad: [],
  capacidades: [],
  ia: [],
  hora: [],
  gracias: [],
  clima: [],
  politica: [],
  economia: [],
  moda: [],
  belleza: [],
  gaming: [],
  libros: [],
  naturaleza: [],
  espacio: [],
  mitologia: [],
  religion: [],
  psicologia: [],
  filosofiaVida: [],
  emprendimiento: [],
  liderazgo: [],
  productividad: [],
  finanzas: [],
  inversion: [],
  marketing: [],
  diseno: [],
  fotografia: [],
  cocina: [],
  reposteria: [],
  cafe: [],
  vinos: [],
  cerveza: [],
  mascotas: [],
  jardineria: [],
  yoga: [],
  meditacion: [],
  astrologia: [],
  tarot: [],
  futbol: [],
  baloncesto: [],
  tenis: [],
  formula1: [],
  boxeo: [],
  artesMarciales: [],
  baile: [],
  teatro: [],
  poesia: [],
  escultura: [],
  arquitectura: [],
  astronomia: [],
  biologia: [],
  quimica: [],
  fisica: [],
  matematicas: [],
  geografia: [],
  sociologia: [],
  antropologia: [],
  arqueologia: [],
  paleontologia: [],
  robotica: [],
  ciberseguridad: [],
  hacking: [],
  desarrolloWeb: [],
  desarrolloApps: [],
  inteligenciaArtificial: [],
  blockchain: [],
  criptomonedas: [],
  nft: [],
  metaverso: [],
  realidadVirtual: [],
  realidadAumentada: [],
  impresion3d: [],
  drones: [],
  autosElectricos: [],
  energiasRenovables: [],
  medioAmbiente: [],
  reciclaje: [],
  sostenibilidad: [],
  voluntariado: [],
  derechosHumanos: [],
  feminismo: [],
  diversidad: [],
  inclusion: [],
  lgbt: [],
  migracion: [],
  refugiados: [],
  paz: [],
  guerra: [],
  diplomacia: [],
  relacionesInternacionales: [],
  historiaUniversal: [],
  historiaArte: [],
  historiaMusica: [],
  historiaCine: [],
  mitosNorteños: [],
  leyendasUrbanas: [],
  crimenesFamosos: [],
  casosSinResolver: [],
  expedientesX: [],
  conspiraciones: [],
  aliens: [],
  criptozoologia: [],
  fantasmas: [],
  ovnis: [],
  espiritismo: [],
  brujeria: [],
  hechiceria: [],
  magia: [],
  alquimia: [],
  ocultismo: [],
  esoterismo: [],
  herbolaria: [],
  remediosCaseros: [],
  primerosAuxilios: [],
  emergencias: [],
  supervivencia: [],
  camping: [],
  senderismo: [],
  escalada: [],
  snowboard: [],
  skate: [],
  surf: [],
  buceo: [],
  pesca: [],
  caza: [],
  tiroDeportivo: [],
  arcoFlecha: [],
  equitacion: [],
  motociclismo: [],
  ciclismo: [],
  running: [],
  crossfit: [],
  musculacion: [],
  natacion: [],
  yogaNidra: [],
  pilates: [],
  zumba: [],
  taiChi: [],
  chiKung: []
}

let archivosJson = [
  'ai.json',
  'ai1.json',
  'ai2.json',
  'ai3.json',
  'ai4.json',
  'ai5.json',
  'ai6.json',
  'ai7.json',
  'ai8.json',
  'ai9.json'
]

let categorias = Object.keys(respuestasCache)

function elegirRandom(arr) {
  if (!arr || arr.length === 0) return null
  return arr[Math.floor(Math.random() * arr.length)]
}

async function cargarTodosLosJson() {
  const fs = require('fs')
  for (let archivo of archivosJson) {
    try {
      if (fs.existsSync(archivo)) {
        let data = JSON.parse(fs.readFileSync(archivo, 'utf-8'))
        for (let categoria of categorias) {
          if (data[categoria] && Array.isArray(data[categoria])) {
            respuestasCache[categoria].push(...data[categoria])
          }
        }
        for (let clave in data) {
          if (!respuestasCache[clave] && Array.isArray(data[clave])) {
            respuestasCache[clave] = data[clave]
            categorias.push(clave)
          }
        }
        console.log(`✅ Cargado: ${archivo} - ${Object.keys(data).length} categorías`)
      } else {
        console.log(`⚠️ No existe: ${archivo}, se creará vacío`)
        let plantilla = {}
        for (let cat of categorias.slice(0, 20)) {
          plantilla[cat] = []
        }
        fs.writeFileSync(archivo, JSON.stringify(plantilla, null, 2))
      }
    } catch (e) {
      console.log(`❌ Error en ${archivo}: ${e.message}`)
    }
  }
  for (let cat of categorias) {
    if (respuestasCache[cat] && respuestasCache[cat].length > 0) {
      respuestasCache[cat] = [...new Set(respuestasCache[cat])]
    }
  }
  console.log(`📦 ${archivosJson.length} JSON cargados con ${categorias.length} categorías`)
}

function obtenerRespuesta(categoria) {
  if (respuestasCache[categoria] && respuestasCache[categoria].length > 0) {
    return elegirRandom(respuestasCache[categoria])
  }
  return null
}

let palabrasClavePorCategoria = {
  saludos: ['hola', 'hello', 'hi', 'hey', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'que tal', 'como va', 'saludos', 'holi', 'holis', 'epa', 'epale', 'que onda', 'kiubo', 'quiubole'],
  despedidas: ['adios', 'bye', 'chao', 'hasta luego', 'nos vemos', 'me voy', 'chau', 'ciao', 'hasta pronto', 'cuídate', 'chaito', 'nos vidrios', 'me piro'],
  estados: ['como estas', 'como te va', 'que tal', 'como andas', 'como te sientes', 'todo bien', 'como vas', 'que cuentas', 'como la vida'],
  insultos: ['tonto', 'idiota', 'estupido', 'imbecil', 'basura', 'feo', 'pendejo', 'inutil', 'torpe', 'bruto', 'weon', 'huevon', 'tarado', 'retrasado'],
  cumplidos: ['genial', 'increible', 'excelente', 'perfecto', 'gracias', 'te quiero', 'eres bueno', 'eres inteligente', 'me gustas', 'eres lindo', 'eres genial', 'crack', 'capo'],
  chistes: ['chiste', 'broma', 'gracioso', 'jaja', 'cuentame algo gracioso', 'hazme reir', 'algo chistoso'],
  curiosidades: ['curiosidad', 'dato', 'sabias', 'sabes que', 'curioso', 'interesante', 'no sabia'],
  frases: ['frase', 'motivacion', 'inspiracion', 'reflexion', 'filosofia', 'pensamiento', 'cita'],
  chismes: ['chisme', 'gossip', 'cotilleo', 'chismecito', 'drama', 'que se dice', 'que cuentan'],
  tecnologia: ['tecnologia', 'computadora', 'pc', 'laptop', 'celular', 'smartphone', 'app', 'software', 'hardware', 'windows', 'linux', 'mac', 'programacion', 'codigo', 'javascript', 'python', 'ia', 'robot', 'internet', 'wifi', 'bluetooth', '5g'],
  anime: ['anime', 'manga', 'naruto', 'dragon ball', 'one piece', 'bleach', 'demon slayer', 'attack on titan', 'jujutsu', 'hunter', 'death note', 'fullmetal', 'tokyo ghoul', 'my hero academia'],
  musica: ['musica', 'cancion', 'cantante', 'banda', 'reggaeton', 'pop', 'rock', 'trap', 'corridos', 'cumbia', 'salsa', 'bachata', 'rap', 'hip hop', 'electronica', 'kpop', 'indie', 'jazz', 'blues', 'metal'],
  deportes: ['deporte', 'futbol', 'fútbol', 'basketball', 'baloncesto', 'beisbol', 'béisbol', 'tenis', 'boxeo', 'mma', 'ufc', 'formula1', 'f1', 'natacion', 'atletismo', 'gimnasia', 'voleibol', 'golf'],
  comida: ['comida', 'comer', 'cocinar', 'receta', 'restaurante', 'pizza', 'hamburguesa', 'tacos', 'sushi', 'pasta', 'pollo', 'carne', 'postre', 'helado', 'pastel', 'dulce', 'vegano', 'vegetariano'],
  viajes: ['viajar', 'viaje', 'pais', 'ciudad', 'turismo', 'vacaciones', 'playa', 'montaña', 'europa', 'asia', 'america', 'vuelo', 'hotel', 'mochilero', 'pasaporte', 'visa', 'destino'],
  ciencia: ['ciencia', 'fisica', 'quimica', 'biologia', 'astronomia', 'genetica', 'evolucion', 'celula', 'adn', 'planeta', 'estrella', 'galaxia', 'universo', 'agujero negro'],
  historia: ['historia', 'pasado', 'antiguo', 'edad media', 'roma', 'egipto', 'grecia', 'revolucion', 'guerra', 'batalla', 'emperador', 'rey', 'imperio', 'colonia', 'independencia'],
  arte: ['arte', 'pintura', 'musica', 'cine', 'pelicula', 'escultura', 'dibujo', 'literatura', 'poesia', 'teatro', 'danza', 'fotografia', 'arquitectura'],
  salud: ['salud', 'medicina', 'enfermedad', 'sintoma', 'tratamiento', 'ejercicio', 'dieta', 'nutricion', 'vitamina', 'mental', 'psicologia', 'bienestar', 'descanso', 'sueño'],
  educacion: ['escuela', 'colegio', 'universidad', 'estudio', 'estudiar', 'aprender', 'curso', 'clase', 'profesor', 'examen', 'tarea', 'carrera', 'graduacion', 'conocimiento'],
  trabajo: ['trabajo', 'empleo', 'oficina', 'empresa', 'negocio', 'emprender', 'jefe', 'colega', 'reunion', 'proyecto', 'cliente', 'salario', 'sueldo', 'profesion', 'carrera'],
  amor: ['amor', 'enamorado', 'pareja', 'novio', 'novia', 'relacion', 'citas', 'romance', 'corazon', 'sentimientos', 'cariño', 'afecto', 'querer', 'gustar', 'matrimonio'],
  familia: ['familia', 'papa', 'mama', 'hermano', 'hermana', 'hijo', 'hija', 'abuelo', 'abuela', 'primo', 'tio', 'tia', 'padres', 'hogar'],
  amigos: ['amigo', 'amiga', 'amistad', 'compañero', 'grupo', 'pandilla', 'confianza', 'lealtad', 'apoyo', 'mejor amigo', 'colega', 'camarada'],
  misterio: ['misterio', 'ovni', 'extraterrestre', 'fantasma', 'paranormal', 'ufo', 'criptozoologia', 'leyenda', 'mito', 'enigma', 'sin resolver', 'desaparicion'],
  futuro: ['futuro', 'robot', 'ia avanzada', 'inteligencia artificial', 'futurista', 'tecnologia futura', 'viajes espaciales', 'colonias', 'predicciones', 'metaverso'],
  animales: ['perro', 'gato', 'conejo', 'hamster', 'loro', 'pez', 'tortuga', 'caballo', 'vaca', 'leon', 'tigre', 'elefante', 'jirafa', 'mono', 'oso', 'lobo'],
  emocional: ['triste', 'deprimido', 'solo', 'llorar', 'mal', 'horrible', 'angustia', 'ansiedad', 'miedo', 'preocupado', 'estresado', 'cansado', 'agotado', 'frustrado'],
  alegria: ['feliz', 'contento', 'alegre', 'genial', 'maravilloso', 'excelente dia', 'buena noticia', 'que bien', 'me alegra', 'celebremos'],
  broma: ['jaja', 'jeje', 'lol', 'xd', ':v', 'risa', 'gracioso', 'divertido', 'chistoso', 'humor'],
  filosofia: ['existir', 'vida', 'muerte', 'universo', 'dios', 'sentido', 'propósito', 'realidad', 'conciencia', 'alma', 'verdad', 'mente'],
  presentacion: ['quien eres', 'como te llamas', 'presentate', 'tu nombre', 'que eres', 'habla de ti'],
  beta: ['version', 'beta', 'que version', 'actualizacion', 'eres nueva', 'que sabes hacer nuevo'],
  creador: ['creador', 'quien te creo', 'quien te hizo', 'tu dueño', 'el vigilante', 'quien te programo'],
  edad: ['años', 'edad', 'antigüedad', 'cuando naciste', 'que tiempo tienes', 'eres joven', 'eres vieja'],
  capacidades: ['puedes hacer', 'sabes hacer', 'funciones', 'capacidades', 'habilidades', 'para que sirves', 'que haces'],
  ia: ['ia', 'robot', 'inteligencia artificial', 'bot', 'programa', 'algoritmo', 'codigo', 'automatico'],
  hora: ['hora', 'tiempo', 'reloj', 'minutos', 'segundos', 'que horas son'],
  gracias: ['gracias', 'thank', 'thanks', 'agradecido', 'aprecio', 'muy amable'],
  clima: ['clima', 'tiempo', 'lluvia', 'sol', 'nublado', 'temperatura', 'calor', 'frio', 'tormenta', 'nieve'],
  politica: ['politica', 'gobierno', 'presidente', 'votar', 'elecciones', 'congreso', 'senado', 'partido', 'ley', 'decreto'],
  economia: ['economia', 'dinero', 'inflacion', 'precios', 'dolar', 'peso', 'euro', 'mercado', 'bolsa', 'banco'],
  moda: ['moda', 'ropa', 'vestimenta', 'estilo', 'tendencias', 'diseñador', 'marca', 'zapatos', 'accesorios', 'maquillaje'],
  belleza: ['belleza', 'cosmetica', 'piel', 'cabello', 'uñas', 'maquillaje', 'tratamiento', 'crema', 'perfume'],
  gaming: ['videojuegos', 'gaming', 'juegos', 'consola', 'playstation', 'xbox', 'nintendo', 'pc gamer', 'fortnite', 'minecraft', 'lol', 'valorant', 'free fire'],
  libros: ['libros', 'leer', 'lectura', 'novela', 'autor', 'biblioteca', 'literatura', 'cuento', 'poema', 'bestseller'],
  naturaleza: ['naturaleza', 'bosque', 'selva', 'rio', 'lago', 'mar', 'oceano', 'montaña', 'volcan', 'flores', 'arboles'],
  espacio: ['espacio', 'planeta', 'estrella', 'luna', 'sol', 'astronauta', 'cohete', 'nasa', 'galaxia', 'orbita', 'satelite'],
  mitologia: ['mitologia', 'dios', 'diosa', 'zeus', 'thor', 'odin', 'poseidon', 'atenea', 'heracles', 'leyenda', 'mito nordico', 'mito griego'],
  religion: ['dios', 'religion', 'iglesia', 'fe', 'oracion', 'rezar', 'cristianismo', 'budismo', 'islam', 'judaismo', 'espiritualidad'],
  psicologia: ['psicologia', 'mente', 'comportamiento', 'emociones', 'personalidad', 'terapia', 'psicologo', 'conducta', 'pensamiento', 'cerebro'],
  emprendimiento: ['emprender', 'emprendimiento', 'startup', 'negocio propio', 'pyme', 'empresario', 'inversor', 'socio', 'franquicia'],
  liderazgo: ['liderazgo', 'lider', 'dirigir', 'equipo', 'jefe', 'gerente', 'supervisor', 'coordinador', 'gestion', 'administracion'],
  productividad: ['productividad', 'eficiencia', 'organizacion', 'planificar', 'metas', 'objetivos', 'cumplir', 'tareas', 'prioridades', 'tiempo'],
  finanzas: ['finanzas', 'ahorrar', 'invertir', 'presupuesto', 'gastos', 'ingresos', 'deudas', 'credito', 'tarjeta', 'prestamo'],
  mascotas: ['mascota', 'perro', 'gato', 'conejo', 'hamster', 'peces', 'aves', 'cuidados', 'alimento', 'veterinario', 'adopcion'],
  jardineria: ['jardineria', 'plantas', 'flores', 'jardin', 'huerto', 'semillas', 'abono', 'riego', 'podar', 'cultivar'],
  yoga: ['yoga', 'meditacion', 'relajacion', 'respirar', 'asanas', 'posturas', 'zen', 'mindfulness', 'calma', 'paz interior'],
  astrologia: ['astrologia', 'horoscopo', 'signo', 'zodiacal', 'aries', 'tauro', 'geminis', 'cancer', 'leo', 'virgo', 'libra', 'escorpio', 'sagitario', 'capricornio', 'acuario', 'piscis'],
  tarot: ['tarot', 'cartas', 'lectura', 'adivinacion', 'vidente', 'futuro', 'prediccion', 'energia', 'espiritual'],
  futbol: ['futbol', 'fútbol', 'liga', 'mundial', 'champions', 'barcelona', 'real madrid', 'messi', 'cristiano', 'neymar', 'mbappe', 'hincha', 'gol', 'cancha'],
  baloncesto: ['baloncesto', 'basketball', 'nba', 'lebron', 'curry', 'jordan', 'kobe', 'canasta', 'triple', 'mate', 'playoffs'],
  tenis: ['tenis', 'raqueta', 'nadal', 'djokovic', 'federer', 'wimbledon', 'us open', 'australian open', 'roland garros', 'saque', 'volea'],
  formula1: ['formula1', 'f1', 'ferrari', 'mercedes', 'red bull', 'hamilton', 'verstappen', 'alonso', 'pista', 'carrera', 'pole', 'pit stop'],
  boxeo: ['boxeo', 'guantes', 'ring', 'golpe', 'campeon', 'muhammad ali', 'tyson', 'canelo', 'peso', 'knockout', 'uppercut'],
  medicina: ['medico', 'enfermedad', 'tratamiento', 'sintomas', 'diagnostico', 'hospital', 'cirugia', 'vacuna', 'farmaco', 'receta'],
  programacion: ['programar', 'codigo', 'desarrollar', 'javascript', 'python', 'html', 'css', 'java', 'c++', 'php', 'sql', 'framework', 'backend', 'frontend']
}

function detectarCategoria(texto) {
  texto = texto.toLowerCase()
  for (let [categoria, palabras] of Object.entries(palabrasClavePorCategoria)) {
    for (let palabra of palabras) {
      if (texto.includes(palabra)) {
        return categoria
      }
    }
  }
  return null
}

function generarRespuesta(texto, who) {
  let categoria = detectarCategoria(texto)
  if (categoria && respuestasCache[categoria] && respuestasCache[categoria].length > 0) {
    return elegirRandom(respuestasCache[categoria])
  }
  if (respuestasCache.noentender && respuestasCache.noentender.length > 0) {
    return elegirRandom(respuestasCache.noentender)
  }
  return `> No entendí muy bien lo que dijiste. ¿Podrías explicarme de otra manera? 🤔`
}

let handler = async (m, { conn, text }) => {
  if (!text || text.trim() === '') return
  
  let who = m.sender
  let texto = text.trim()
  
  if (!historial[who]) historial[who] = []
  if (!moodUsuario[who]) moodUsuario[who] = 'neutral'
  if (!puntuacionUsuario[who]) puntuacionUsuario[who] = 0
  if (!rachaConversacion[who]) rachaConversacion[who] = 0
  
  ultimaInteraccion[who] = Date.now()
  
  if (horaUltimoMensaje[who] && (Date.now() - horaUltimoMensaje[who]) < 300000) {
    rachaConversacion[who]++
  } else {
    rachaConversacion[who] = 1
  }
  horaUltimoMensaje[who] = Date.now()
  
  let detectarNombre = texto.match(/me llamo ([a-záéíóúñ]+)/i) || texto.match(/soy ([a-záéíóúñ]+)/i) || texto.match(/mi nombre es ([a-záéíóúñ]+)/i)
  if (detectarNombre) {
    nombreUsuario[who] = detectarNombre[1].charAt(0).toUpperCase() + detectarNombre[1].slice(1)
  }
  
  historial[who].push({ rol: 'usuario', texto: texto })
  if (historial[who].length > 50) historial[who] = historial[who].slice(-50)
  
  let respuesta = generarRespuesta(texto, who)
  
  if (nombreUsuario[who] && respuesta.startsWith('>')) {
    respuesta = `> *${nombreUsuario[who]}*, ${respuesta.substring(1)}`
  }
  
  historial[who].push({ rol: 'elvigilante-ai', texto: respuesta })
  
  await conn.sendMessage(m.chat, { text: respuesta }, { quoted: m })
}

handler.help = ['ai', 'elvigilante']
handler.tags = ['diversion']
handler.command = /^(ai|elvigilante|vigilante ai|elvigilante ai|chat|hablar|ia|bot|conversar|elv)$/i
handler.desc = 'Chatea con Elvigilante AI - Respuestas desde 10 JSON externos'

cargarTodosLosJson()

export default handler