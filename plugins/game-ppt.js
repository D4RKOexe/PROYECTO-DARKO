let handler = async (m, { conn, usedPrefix, command }) => {

  const opciones = ['piedra', 'papel', 'tijera']
  const emojis = { piedra: '✊', papel: '✋', tijera: '✌️' }

  let user = (m.text || '').toLowerCase().trim()

  // 📌 MENU SI NO PONE NADA
  if (!user || !opciones.includes(user)) {
    return m.reply(`
╭━━━〔 🎮 PPT ELYSSIA MD 〕━━━⬣
┃ ✊ piedra
┃ ✋ papel
┃ ✌️ tijera
┃
┃ 💡 Uso:
┃ ${usedPrefix}${command} piedra
╰━━━━━━━━━━━━━━━━━━━━⬣
    `)
  }

  let bot = opciones[Math.floor(Math.random() * opciones.length)]

  let resultado = ''
  if (user === bot) {
    resultado = '🤝 EMPATE'
  } else if (
    (user === 'piedra' && bot === 'tijera') ||
    (user === 'papel' && bot === 'piedra') ||
    (user === 'tijera' && bot === 'papel')
  ) {
    resultado = '🏆 GANASTE'
  } else {
    resultado = '💀 PERDISTE'
  }

  let txt = `
╭━━━〔 🎮 RESULTADO PPT 〕━━━⬣
┃ 👤 Tú: ${emojis[user]} ${user}
┃ 🤖 Bot: ${emojis[bot]} ${bot}
┃
┃ 📊 ${resultado}
╰━━━━━━━━━━━━━━━━━━━━⬣

⚡ Elyssia MD
  `

  await conn.sendMessage(m.chat, { text: txt }, { quoted: m })
}

handler.help = ['ppt <piedra/papel/tijera>']
handler.tags = ['game']
handler.command = ['ppt']

export default handler