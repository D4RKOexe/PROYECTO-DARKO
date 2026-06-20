let handler = async (m, { conn }) => {
  let totalUsuarios = Object.keys(global.db.data.users).length
  let totalChats = Object.keys(global.db.data.chats).length
  let totalComandos = Object.values(global.plugins || {}).filter(p => !p.disabled).length

  let uptime = process.uptime() * 1000
  let segundos = Math.floor((uptime / 1000) % 60)
  let minutos = Math.floor((uptime / (1000 * 60)) % 60)
  let horas = Math.floor((uptime / (1000 * 60 * 60)) % 24)
  let dias = Math.floor(uptime / (1000 * 60 * 60 * 24))

  let uptimeTexto = ''
  if (dias > 0) uptimeTexto += dias + 'd '
  if (horas > 0) uptimeTexto += horas + 'h '
  if (minutos > 0) uptimeTexto += minutos + 'm '
  uptimeTexto += segundos + 's'

  let usoMemoria = process.memoryUsage()
  let memoriaMB = (usoMemoria.heapUsed / 1024 / 1024).toFixed(2)

  let plataforma = process.platform
  let nodeVersion = process.version

  let texto = '࿇ ══━━━✥◈✥━━━══ ࿇\n'
  texto += '    INFO DARKO\n'
  texto += '࿇ ══━━━✥◈✥━━━══ ࿇\n\n'

  texto += 'ℹ ɢᴇɴᴇʀᴀʟ ˚ʚ♡ɞ˚\n'
  texto += '❧ Nombre\n> Hinata Bot\n'
  texto += '❧ Versión\n> 2.2.0\n'
  texto += '❧ Total comandos\n> ' + totalComandos + '\n'
  texto += '❧ Tiempo activo\n> ' + uptimeTexto + '\n\n'

  texto += '📊 ᴇsᴛᴀᴅísᴛɪᴄᴀs ˚ʚ♡ɞ˚\n'
  texto += '❧ Usuarios registrados\n> ' + totalUsuarios + '\n'
  texto += '❧ Chats activos\n> ' + totalChats + '\n'
  texto += '❧ Memoria usada\n> ' + memoriaMB + ' MB\n\n'

  texto += '⚙️ sɪsᴛᴇᴍᴀ ˚ʚ♡ɞ˚\n'
  texto += '❧ Plataforma\n> ' + plataforma + '\n'
  texto += '❧ Node.js\n> ' + nodeVersion + '\n\n'

  texto += '⛓ ᴇɴʟᴀᴄᴇs ˚ʚ♡ɞ˚\n'
  texto += '❧ API\n> https://elvigilante-api.onrender.com/dash\n'

  texto += '࿇ ══━━━✥◈✥━━━══ ࿇\n'
  texto += 'creado por DARKO\n'
  texto += '࿇ ══━━━✥◈✥━━━══ ࿇'

  await conn.sendMessage(m.chat, { text: texto }, { quoted: m })
}

handler.help = ['Darko']
handler.tags = ['info']
handler.command = /^(darko|infodarko|infohinata|info)$/i
handler.desc = 'Muestra información del bot'

export default handler
