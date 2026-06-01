let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `🌸 *Elyssia Bot MD - Reporte*\n\nEjemplo:\n.report El comando menú no funciona`,
      m
    )
  }

  const owner = '51910227479@s.whatsapp.net'

  const reporte = `
╭━━━〔 📢 REPORTE 〕━━━⬣
┃ 👤 Usuario:
┃ wa.me/${m.sender.split('@')[0]}
┃
┃ 💬 Mensaje:
┃ ${text}
┃
┃ 📍 Chat:
┃ ${m.chat}
╰━━━━━━━━━━━━⬣
`

  await conn.sendMessage(owner, {
    text: reporte,
    mentions: [m.sender]
  })

  await conn.reply(
    m.chat,
    `✅ Tu reporte fue enviado correctamente al desarrollador.\n\n🌸 Gracias por ayudar a mejorar Elyssia Bot MD.`,
    m
  )
}

handler.help = ['report <texto>']
handler.tags = ['info']
handler.command = ['report', 'reporte']

export default handler