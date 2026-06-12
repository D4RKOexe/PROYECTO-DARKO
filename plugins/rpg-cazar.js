const COOLDOWN = 30 * 1000

const PRESAS = [
  { nombre: 'Conejo', emoji: '🐰', monedas: [10, 30], xp: [5, 15], rareza: 'común' },
  { nombre: 'Zorro', emoji: '🦊', monedas: [20, 50], xp: [10, 25], rareza: 'común' },
  { nombre: 'Venado', emoji: '🦌', monedas: [40, 80], xp: [20, 40], rareza: 'común' },
  { nombre: 'Jabalí', emoji: '🐗', monedas: [50, 100], xp: [25, 50], rareza: 'común' },
  { nombre: 'Oso Pardo', emoji: '🐻', monedas: [70, 130], xp: [35, 65], rareza: 'común' },
  { nombre: 'Lobo', emoji: '🐺', monedas: [60, 110], xp: [30, 55], rareza: 'común' },
  { nombre: 'Pato Salvaje', emoji: '🦆', monedas: [15, 35], xp: [8, 18], rareza: 'común' },
  { nombre: 'Faisán', emoji: '🐦', monedas: [25, 55], xp: [12, 28], rareza: 'común' },
  { nombre: 'Tortuga', emoji: '🐢', monedas: [30, 60], xp: [15, 30], rareza: 'común' },
  { nombre: 'Serpiente', emoji: '🐍', monedas: [35, 75], xp: [18, 38], rareza: 'común' },
  { nombre: 'Mapache', emoji: '🦝', monedas: [20, 45], xp: [10, 22], rareza: 'común' },
  { nombre: 'Ardilla', emoji: '🐿️', monedas: [8, 20], xp: [4, 10], rareza: 'común' },
  { nombre: 'Búho', emoji: '🦉', monedas: [45, 90], xp: [22, 45], rareza: 'poco común' },
  { nombre: 'Ciervo Blanco', emoji: '🦌', monedas: [80, 160], xp: [40, 80], rareza: 'poco común' },
  { nombre: 'Pantera', emoji: '🐆', monedas: [100, 200], xp: [50, 100], rareza: 'poco común' },
  { nombre: 'Leopardo', emoji: '🐅', monedas: [110, 220], xp: [55, 110], rareza: 'poco común' },
  { nombre: 'Águila Real', emoji: '🦅', monedas: [90, 180], xp: [45, 90], rareza: 'poco común' },
  { nombre: 'Oso Negro', emoji: '🐻', monedas: [85, 170], xp: [42, 85], rareza: 'poco común' },
  { nombre: 'Cóndor', emoji: '🦅', monedas: [95, 190], xp: [47, 95], rareza: 'poco común' },
  { nombre: 'Lince', emoji: '🐱', monedas: [75, 150], xp: [37, 75], rareza: 'poco común' },
  { nombre: 'Bisonte', emoji: '🐃', monedas: [120, 240], xp: [60, 120], rareza: 'poco común' },
  { nombre: 'Cabra Montesa', emoji: '🐐', monedas: [55, 110], xp: [27, 55], rareza: 'poco común' },
  { nombre: 'Nutria Gigante', emoji: '🦦', monedas: [65, 130], xp: [32, 65], rareza: 'poco común' },
  { nombre: 'Hipogrifo', emoji: '🦄', monedas: [200, 400], xp: [100, 200], rareza: 'raro' },
  { nombre: 'Dragón Joven', emoji: '🐲', monedas: [250, 500], xp: [125, 250], rareza: 'raro' },
  { nombre: 'Fénix', emoji: '🔥', monedas: [300, 600], xp: [150, 300], rareza: 'raro' },
  { nombre: 'Grifo', emoji: '🦁', monedas: [280, 560], xp: [140, 280], rareza: 'raro' },
  { nombre: 'Quimera', emoji: '🐉', monedas: [320, 640], xp: [160, 320], rareza: 'raro' },
  { nombre: 'Lobo Fantasma', emoji: '👻', monedas: [230, 460], xp: [115, 230], rareza: 'raro' },
  { nombre: 'Oso Polar Mutante', emoji: '❄️', monedas: [210, 420], xp: [105, 210], rareza: 'raro' },
  { nombre: 'Dragón Anciano', emoji: '🐉', monedas: [500, 1000], xp: [250, 500], rareza: 'épico' },
  { nombre: 'Leviatán', emoji: '🌊', monedas: [600, 1200], xp: [300, 600], rareza: 'épico' },
  { nombre: 'Behemot', emoji: '⚡', monedas: [550, 1100], xp: [275, 550], rareza: 'épico' },
  { nombre: 'Kraken Terrestre', emoji: '🦑', monedas: [580, 1160], xp: [290, 580], rareza: 'épico' },
  { nombre: 'Titán del Bosque', emoji: '🌳', monedas: [620, 1240], xp: [310, 620], rareza: 'épico' },
]

const FRACASOS = [
  { msg: 'tropezaste y asustaste a la presa 😅', penalidad: 0 },
  { msg: 'tu flecha falló por centímetros 🏹', penalidad: 0 },
  { msg: 'la presa escapó entre los arbustos 🌿', penalidad: 0 },
  { msg: 'se te cayó el arma al río 💦', penalidad: 5 },
  { msg: 'la presa te atacó primero 😱', penalidad: 10 },
  { msg: 'te perdiste en el bosque 🌲', penalidad: 0 },
  { msg: 'lluvia repentina arruinó la cacería 🌧️', penalidad: 0 },
  { msg: 'la presa olía tu rastro y huyó 👃', penalidad: 0 },
  { msg: 'un guardia forestal te detuvo 👮', penalidad: 15 },
  { msg: 'resbalaste en el barro 🤦', penalidad: 0 },
  { msg: 'tu arco se rompió en el momento clave 🏹', penalidad: 0 },
  { msg: 'una trampa se activó sobre ti 🪤', penalidad: 20 },
  { msg: 'el sol te cegó en el momento del disparo ☀️', penalidad: 0 },
  { msg: 'un pájaro distrajo tu puntería 🐦', penalidad: 0 },
  { msg: 'dormiste demasiado y la presa se fue 😴', penalidad: 0 },
  { msg: 'olvidaste las flechas en casa 🤦', penalidad: 0 },
  { msg: 'un oso te robó la presa 🐻', penalidad: 8 },
  { msg: 'tu perro de caza salió corriendo 🐕', penalidad: 0 },
  { msg: 'la niebla espesa cubrió el bosque 🌫️', penalidad: 0 },
  { msg: 'pisaste una rama y todo se fue al diablo 🌿', penalidad: 0 },
  { msg: 'te mordió una serpiente y tuviste que retirarte 🐍', penalidad: 12 },
  { msg: 'el viento cambió y te delataron los olores 💨', penalidad: 0 },
  { msg: 'te quedaste dormido esperando la presa 💤', penalidad: 0 },
  { msg: 'tu carcaj estaba vacío sin saberlo 😬', penalidad: 0 },
  { msg: 'una bandada de cuervos alertó a la presa 🐦‍⬛', penalidad: 0 },
  { msg: 'el terreno era un pantano y no podías avanzar 🪨', penalidad: 0 },
  { msg: 'tu linterna se apagó en la cacería nocturna 🔦', penalidad: 0 },
  { msg: 'un cazador rival te ganó la presa 😤', penalidad: 5 },
  { msg: 'llovió tan fuerte que tuviste que refugiarte ⛈️', penalidad: 0 },
  { msg: 'la presa resultó ser una roca con ojos 🪨', penalidad: 0 },
]

const RAREZA_COLORES = {
  'común': '⚪',
  'poco común': '🟢',
  'raro': '🔵',
  'épico': '🟣',
}

const RAREZA_PROB = {
  'común': 55,
  'poco común': 30,
  'raro': 12,
  'épico': 3,
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function elegirPresa() {
  const roll = Math.random() * 100
  let acum = 0
  let rareza = 'común'
  for (const [r, prob] of Object.entries(RAREZA_PROB)) {
    acum += prob
    if (roll < acum) { rareza = r; break }
  }
  const pool = PRESAS.filter(p => p.rareza === rareza)
  return pool[Math.floor(Math.random() * pool.length)]
}

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  if (!user) return

  const ahora = Date.now()
  const ultimo = user.lastcazar || 0

  if (ahora - ultimo < COOLDOWN) {
    const restante = Math.ceil((COOLDOWN - (ahora - ultimo)) / 1000)
    return conn.sendMessage(m.chat, {
      text: `╭━━━〔 🏹 *CAZAR* 〕━━⬣\n┃\n┃ ⏳ Debes descansar\n┃ ❀ Espera *${restante}s* más\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣`
    }, { quoted: m })
  }

  user.lastcazar = ahora

  const exito = Math.random() < 0.65

  if (!exito) {
    const fracaso = FRACASOS[Math.floor(Math.random() * FRACASOS.length)]
    if (fracaso.penalidad > 0) {
      user.coin = Math.max(0, (user.coin || 0) - fracaso.penalidad)
    }

    await m.react('❌')
    return conn.sendMessage(m.chat, {
      text: `╭━━━〔 🏹 *CAZAR* 〕━━⬣\n┃\n┃ ❌ *Cacería fallida*\n┃ ❀ ${fracaso.msg}${fracaso.penalidad > 0 ? `\n┃ 💸 Perdiste *${fracaso.penalidad}* monedas` : ''}\n┃\n┃ 💰 *Balance:*\n┃ 🪙 Coins: ${user.coin || 0}\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣`
    }, { quoted: m })
  }

  const presa = elegirPresa()
  const monedas = rand(presa.monedas[0], presa.monedas[1])
  const xp = rand(presa.xp[0], presa.xp[1])
  const rareza = RAREZA_COLORES[presa.rareza]

  user.coin = (user.coin || 0) + monedas
  user.exp = (user.exp || 0) + xp

  await m.react('✅')
  return conn.sendMessage(m.chat, {
    text: `╭━━━〔 🏹 *CAZAR* 〕━━⬣\n┃\n┃ ${rareza} *${presa.emoji} ${presa.nombre}*\n┃ ❀ Rareza: *${presa.rareza.toUpperCase()}*\n┃\n┃ 🎁 *Recompensas:*\n┃ 🪙 +${monedas} monedas\n┃ ✨ +${xp} XP\n┃\n┃ 💰 *Balance actual:*\n┃ 🪙 Coins: ${user.coin}\n┃ ✨ XP: ${user.exp}\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣`
  }, { quoted: m })
}

handler.help = ['cazar']
handler.tags = ['rpg']
handler.command = /^cazar$/i
handler.desc = 'Caza animales y criaturas para ganar monedas y XP'

export default handler
