let handler = async (m, { conn, usedPrefix, command }) => {
  const opciones = ['piedra', 'papel', 'tijera']
  const emojis = { piedra: '✊', papel: '✋', tijera: '✌️' }

  let user = (m.text || '').toLowerCase().trim()

  // MENU INICIAL SI NO HAY ELECCIÓN
  if (!user || !opciones.includes(user)) {
    return m.reply(`
╭━━━〔 🎮 PPT ELYSSIA MD 〕━━━⬣
┃ ✊ piedra
┃ ✋ papel
┃ ✌️ tijera
┃
┃ 💡 Escribe tu jugada o toca un botón si tu bot lo soporta
┃ Ejemplo: ${usedPrefix}${command} piedra
╰━━━━━━━━━━━━━━━━━━━━⬣
    `)
  }

  // BOT ELIGE ALEATORIAMENTE
  let bot = opciones[Math.floor(Math.random() * opciones.length)]

  // RESULTADO
  let resultado = ''
  if (user === bot) resultado = '🤝 EMPATE'
  else if (
    (user === 'piedra' && bot === 'tijera') ||
    (user === 'papel' && bot === 'piedra') ||
    (user === 'tijera' && bot === 'papel')
  ) resultado = '🏆 GANASTE'
  else resultado = '💀 PERDISTE'

  // MENSAJE ESTILO ELYSSIA
  let txt = `
╭━━━〔 🎮 PPT – ELYSSIA MD 〕━━━⬣
┃ 👤 Tú: ${emojis[user]} ${user}
┃ 🤖 Bot: ${emojis[bot]} ${bot}
┃
┃ 📊 ${resultado}
╰━━━━━━━━━━━━━━━━━━━━⬣

💡 Escribe ${usedPrefix}${command} piedra/papel/tijera para jugar otra vez
  `

  await conn.sendMessage(m.chat, { text: txt }, { quoted: m })
}

handler.help = ['ppt <piedra/papel/tijera>']
handler.tags = ['game']
handler.command = ['ppt']

export default handler