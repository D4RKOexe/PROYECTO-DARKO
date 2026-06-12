const MISIONES = [
  { id: 'pesca', emoji: '🎣', nombre: 'Pescador', desc: 'Pesca en el río', accion: 'pesca', veces: 3, xp: 120, diamantes: 1 },
  { id: 'pesca2', emoji: '🎣', nombre: 'Gran Pescador', desc: 'Pesca en aguas profundas', accion: 'pesca', veces: 7, xp: 280, diamantes: 2 },
  { id: 'caza', emoji: '🏹', nombre: 'Cazador', desc: 'Caza en el bosque', accion: 'caza', veces: 3, xp: 150, diamantes: 1 },
  { id: 'caza2', emoji: '🏹', nombre: 'Cazador Experto', desc: 'Caza presas difíciles', accion: 'caza', veces: 8, xp: 320, diamantes: 3 },
  { id: 'mineria', emoji: '⛏️', nombre: 'Minero', desc: 'Extrae minerales', accion: 'minar', veces: 3, xp: 130, diamantes: 1 },
  { id: 'mineria2', emoji: '⛏️', nombre: 'Minero Experto', desc: 'Excava en las profundidades', accion: 'minar', veces: 8, xp: 300, diamantes: 2 },
  { id: 'batalla', emoji: '⚔️', nombre: 'Guerrero', desc: 'Pelea contra enemigos', accion: 'pelear', veces: 3, xp: 200, diamantes: 2 },
  { id: 'batalla2', emoji: '⚔️', nombre: 'Campeón', desc: 'Derrota enemigos poderosos', accion: 'pelear', veces: 7, xp: 450, diamantes: 4 },
  { id: 'cofre', emoji: '📦', nombre: 'Explorador', desc: 'Abre cofres del tesoro', accion: 'cofre', veces: 2, xp: 180, diamantes: 2 },
  { id: 'cofre2', emoji: '📦', nombre: 'Buscador de Tesoros', desc: 'Encuentra cofres legendarios', accion: 'cofre', veces: 5, xp: 400, diamantes: 3 },
  { id: 'aventura', emoji: '🗺️', nombre: 'Aventurero', desc: 'Explora nuevas tierras', accion: 'aventura', veces: 2, xp: 220, diamantes: 2 },
  { id: 'aventura2', emoji: '🗺️', nombre: 'Gran Aventurero', desc: 'Conquista territorios lejanos', accion: 'aventura', veces: 5, xp: 500, diamantes: 4 },
  { id: 'trabajo', emoji: '💼', nombre: 'Trabajador', desc: 'Completa jornadas laborales', accion: 'work', veces: 3, xp: 100, diamantes: 1 },
  { id: 'trabajo2', emoji: '💼', nombre: 'Empleado del Mes', desc: 'Trabaja sin descanso', accion: 'work', veces: 8, xp: 260, diamantes: 2 },
  { id: 'crimen', emoji: '🦹', nombre: 'Delincuente', desc: 'Comete delitos menores', accion: 'crime', veces: 3, xp: 170, diamantes: 1 },
  { id: 'crimen2', emoji: '🦹', nombre: 'Criminal', desc: 'Escapa de la justicia', accion: 'crime', veces: 7, xp: 350, diamantes: 3 },
  { id: 'robo', emoji: '🗡️', nombre: 'Ladrón', desc: 'Roba a otros usuarios', accion: 'steal', veces: 2, xp: 200, diamantes: 2 },
  { id: 'robo2', emoji: '🗡️', nombre: 'Maestro Ladrón', desc: 'Roba sin dejar rastro', accion: 'steal', veces: 5, xp: 420, diamantes: 3 },
  { id: 'casino', emoji: '🎰', nombre: 'Apostador', desc: 'Prueba tu suerte en el casino', accion: 'casino', veces: 3, xp: 150, diamantes: 1 },
  { id: 'casino2', emoji: '🎰', nombre: 'Rey del Casino', desc: 'Domina las mesas de juego', accion: 'casino', veces: 7, xp: 330, diamantes: 3 },
  { id: 'ruleta', emoji: '🎡', nombre: 'Ruleta Rusa', desc: 'Gira la ruleta del destino', accion: 'ruleta', veces: 3, xp: 140, diamantes: 1 },
  { id: 'ruleta2', emoji: '🎡', nombre: 'Maestro de la Ruleta', desc: 'Desafía al azar', accion: 'ruleta', veces: 6, xp: 290, diamantes: 2 },
  { id: 'slut', emoji: '💃', nombre: 'Seductor', desc: 'Usa tus encantos', accion: 'slut', veces: 3, xp: 160, diamantes: 1 },
  { id: 'slut2', emoji: '💃', nombre: 'Gran Seductor', desc: 'Nadie puede resistirte', accion: 'slut', veces: 7, xp: 340, diamantes: 2 },
  { id: 'diario', emoji: '📅', nombre: 'Constante', desc: 'Reclama tu recompensa diaria', accion: 'daily', veces: 1, xp: 80, diamantes: 1 },
  { id: 'semanal', emoji: '📆', nombre: 'Dedicado', desc: 'Reclama tu recompensa semanal', accion: 'weekly', veces: 1, xp: 200, diamantes: 2 },
  { id: 'pez_oro', emoji: '🐠', nombre: 'Pez de Oro', desc: 'Pesca algo especial', accion: 'pesca', veces: 5, xp: 220, diamantes: 2 },
  { id: 'gladiador', emoji: '🛡️', nombre: 'Gladiador', desc: 'Sobrevive al coliseo', accion: 'pelear', veces: 5, xp: 380, diamantes: 3 },
  { id: 'minero_oro', emoji: '🥇', nombre: 'Veta de Oro', desc: 'Encuentra oro puro', accion: 'minar', veces: 5, xp: 250, diamantes: 2 },
  { id: 'trabajador_elite', emoji: '👔', nombre: 'Elite Laboral', desc: 'El mejor empleado', accion: 'work', veces: 5, xp: 180, diamantes: 2 },
]

const MAX_MISIONES_DIA = 10
const COOLDOWN_MS = 24 * 60 * 60 * 1000

function getMisionesUsuario(user) {
  if (!user.misiones) user.misiones = {}
  if (!user.misiones.activas) user.misiones.activas = []
  if (!user.misiones.completadas_hoy) user.misiones.completadas_hoy = []
  if (!user.misiones.ultimo_reset) user.misiones.ultimo_reset = 0
  if (!user.misiones.progreso) user.misiones.progreso = {}
  return user.misiones
}

function resetearSiNuevoDia(misiones) {
  const ahora = Date.now()
  if (ahora - misiones.ultimo_reset >= COOLDOWN_MS) {
    misiones.activas = []
    misiones.completadas_hoy = []
    misiones.progreso = {}
    misiones.ultimo_reset = ahora
  }
}

function asignarMisiones(misiones) {
  if (misiones.activas.length > 0) return
  const pool = [...MISIONES].sort(() => Math.random() - 0.5)
  misiones.activas = pool.slice(0, MAX_MISIONES_DIA).map(m => m.id)
}

function tiempoRestante(misiones) {
  const diff = COOLDOWN_MS - (Date.now() - misiones.ultimo_reset)
  const h = Math.floor(diff / 3600000)
  const min = Math.floor((diff % 3600000) / 60000)
  return `${h}h ${min}m`
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  if (!user) return

  const misiones = getMisionesUsuario(user)
  resetearSiNuevoDia(misiones)
  asignarMisiones(misiones)

  const subcomando = text?.trim().toLowerCase()

  if (!subcomando || subcomando === 'ver') {
    const activas = misiones.activas.map(id => MISIONES.find(m => m.id === id)).filter(Boolean)
    const completadas = misiones.completadas_hoy.length

    let lista = ''
    for (const mis of activas) {
      const prog = misiones.progreso[mis.id] || 0
      const completada = misiones.completadas_hoy.includes(mis.id)
      const barra = completada ? '✅' : `${prog}/${mis.veces}`
      lista += `┃ ${mis.emoji} *${mis.nombre}*\n`
      lista += `┃ ❀ ${mis.desc}\n`
      lista += `┃ ❀ Progreso: ${barra}\n`
      lista += `┃ ❀ Recompensa: 💎${mis.diamantes} · ✨${mis.xp}xp\n`
      lista += `┃\n`
    }

    return conn.sendMessage(m.chat, {
      text: `╭━━━〔 🗺️ *MISIONES DIARIAS* 〕━━⬣\n┃\n${lista}┃ ✅ Completadas: *${completadas}/${MAX_MISIONES_DIA}*\n┃ ⏳ Reset en: *${tiempoRestante(misiones)}*\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣\n\n> Usa *${usedPrefix}${command} <accion>* para avanzar`
    }, { quoted: m })
  }

  const misionesActivas = misiones.activas.map(id => MISIONES.find(m => m.id === id)).filter(Boolean)
  const pendientes = misionesActivas.filter(m =>
    m.accion === subcomando && !misiones.completadas_hoy.includes(m.id)
  )

  if (pendientes.length === 0) {
    const existe = MISIONES.some(m => m.accion === subcomando)
    if (!existe) return conn.sendMessage(m.chat, {
      text: `𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ㅤ֢ㅤׄㅤׅ\n\n❌ Acción no reconocida\n\n> Acciones: pesca, caza, minar, pelear, cofre, aventura, work, crime, steal, casino, ruleta, slut, daily, weekly`
    }, { quoted: m })

    return conn.sendMessage(m.chat, {
      text: `𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ㅤ֢ㅤׄㅤׅ\n\n✅ No tienes misiones pendientes de *${subcomando}*\n\n> Todas completadas o no asignadas hoy`
    }, { quoted: m })
  }

  const mis = pendientes[0]
  if (!misiones.progreso[mis.id]) misiones.progreso[mis.id] = 0
  misiones.progreso[mis.id]++

  const prog = misiones.progreso[mis.id]
  const completada = prog >= mis.veces

  if (completada) {
    misiones.completadas_hoy.push(mis.id)
    user.diamantes = (user.diamantes || 0) + mis.diamantes
    user.diamond = (user.diamond || 0) + mis.diamantes
    user.exp = (user.exp || 0) + mis.xp

    const completadas = misiones.completadas_hoy.length

    return conn.sendMessage(m.chat, {
      text: `╭━━━〔 ${mis.emoji} *MISIÓN COMPLETADA* 〕━━⬣\n┃\n┃ ✅ *${mis.nombre}*\n┃ ❀ ${mis.desc}\n┃\n┃ 🎁 *Recompensas:*\n┃ 💎 +${mis.diamantes} diamantes\n┃ ✨ +${mis.xp} XP\n┃\n┃ 📊 Completadas hoy: *${completadas}/${MAX_MISIONES_DIA}*\n┃ ⏳ Reset en: *${tiempoRestante(misiones)}*\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣`
    }, { quoted: m })
  }

  await m.react('⚡')
  return conn.sendMessage(m.chat, {
    text: `╭━━━〔 ${mis.emoji} *PROGRESO DE MISIÓN* 〕━━⬣\n┃\n┃ ⚔️ *${mis.nombre}*\n┃ ❀ ${mis.desc}\n┃\n┃ 📊 Progreso: *${prog}/${mis.veces}*\n┃ 🎯 Faltan: *${mis.veces - prog}* más\n┃\n┃ 🎁 Recompensa al completar:\n┃ 💎 ${mis.diamantes} diamantes · ✨ ${mis.xp} XP\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣`
  }, { quoted: m })
}

handler.help = ['mision']
handler.tags = ['rpg']
handler.command = /^(mision|misiones|mission)$/i
handler.desc = 'Sistema de misiones diarias'

export default handler
