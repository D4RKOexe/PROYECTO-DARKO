let handler = async (m, { conn, isOwner }) => {
  if (!isOwner) {
    return conn.reply(
      m.chat,
      `❌ *ELYSSIA MD - ACCESO DENEGADO*\n\nSolo el propietario puede reiniciar el sistema.`,
      m
    )
  }

  await m.react('🔄')

  await conn.reply(
    m.chat,
    `╭━━━〔 🌸 ELYSSIA MD • SISTEMA 〕━━━⬣

🔄 Reiniciando sistema...

⚡ Estado: EN PROCESO
💻 Bot: Elyssia MD
⏳ Espere unos segundos...

╰━━━━━━━━━━━━━━━━━━⬣`,
    m
  )

  // pequeña pausa opcional
  await new Promise(r => setTimeout(r, 1500))

  await conn.reply(
    m.chat,
    `╭━━━〔 🌸 ELYSSIA MD • SISTEMA 〕━━━⬣

✅ Reinicio completado

⚡ Estado: ONLINE
🌸 Elyssia MD ha sido restaurado correctamente

╰━━━━━━━━━━━━━━━━━━⬣`,
    m
  )

  // 🔁 reinicio real del bot
  if (process.send) {
    process.send('reset')
  } else {
    process.exit(0)
  }
}

handler.help = ['restart', 'reiniciar']
handler.tags = ['owner']
handler.command = ['restart', 'reiniciar', 'reset']
handler.rowner = true

export default handler