let handler = async (m, { conn, text }) => {
  let who = m.sender
  let user = global.db.data.users[who]
  if (!user) {
    global.db.data.users[who] = { diamantes: 0, exp: 0, level: 0, reclamoApi: false }
    user = global.db.data.users[who]
  }

  if (!('reclamoApi' in user)) user.reclamoApi = false

  if (text && text.trim().toLowerCase() === 'reclamar') {
    if (user.reclamoApi) {
      let textoYa = '࿇ ══━━━✥◈✥━━━══ ࿇\n'
      textoYa += ' 𝕽𝖊𝖈𝖔𝖒𝖕𝖊𝖓𝖘𝖆𝖘\n'
      textoYa += '࿇ ══━━━✥◈✥━━━══ ࿇\n\n'
      textoYa += '❧ » Ya reclamaste esta recompensa anteriormente\n'
      textoYa += '💰 » Tu saldo actual: ' + user.diamantes + ' 💎\n\n'
      textoYa += '࿇ ══━━━✥◈✥━━━══ ࿇'

      return conn.sendMessage(m.chat, { text: textoYa }, { quoted: m })
    }

    user.diamantes = (user.diamantes || 0) + 10000
    user.reclamoApi = true

    let textoOk = '࿇ ══━━━✥◈✥━━━══ ࿇\n'
    textoOk += ' 𝕽𝖊𝖈𝖔𝖒𝖕𝖊𝖓𝖘𝖆 𝖗𝖊𝖈𝖑𝖆𝖒𝖆𝖉𝖆\n'
    textoOk += '࿇ ══━━━✥◈✥━━━══ ࿇\n\n'
    textoOk += '✅ » ¡Recompensa entregada con éxito!\n'
    textoOk += '💎 » +10,000 diamantes\n'
    textoOk += '💰 » Nuevo saldo: ' + user.diamantes + ' 💎\n\n'
    textoOk += '❧ » Gracias por registrarte en nuestra API 🌸\n\n'
    textoOk += '࿇ ══━━━✥◈✥━━━══ ࿇'

    return conn.sendMessage(m.chat, { text: textoOk }, { quoted: m })
  }

  let texto = '࿇ ══━━━✥◈✥━━━══ ࿇\n'
  texto += ' 𝕽𝖊𝖈𝖔𝖒𝖕𝖊𝖓𝖘𝖆𝖘 𝕳𝖎𝖓𝖆𝖙𝖆\n'
  texto += '࿇ ══━━━✥◈✥━━━══ ࿇\n\n'

  texto += '𖣔 ʀᴇᴄᴏᴍᴘᴇɴsᴀ ᴀᴘɪ ˚ʚ♡ɞ˚\n\n'
  texto += '❧ » Inicia sesión en nuestra API:\n'
  texto += '🔗 » https://elvigilante-api.onrender.com/dash\n\n'
  texto += '❧ » Obtén 100 solicitudes gratis al día\n'
  texto += '💎 » Recompensa: +10,000 diamantes\n\n'
  texto += '✦ » Para reclamar usa:\n'
  texto += '*#recompensas reclamar*\n\n'

  texto += '𖣔 ʙᴏɴᴜs ᴇxᴛʀᴀ ˚ʚ♡ɞ˚\n\n'
  texto += '❧ » Envía captura de tu registro al DM:\n'
  texto += '📩 » wa.me/59177474230\n\n'
  texto += '🎁 » Recibirás +300 solicitudes extra gratis\n\n'

  texto += '࿇ ══━━━✥◈✥━━━══ ࿇\n'
  texto += 'ᶜʳᵉᵃᵈᵃ ᵖᵒʳ ᴱˡ ᵛⁱᵍⁱˡᵃⁿᵗᵉ ✦ ᴮʳᵃʸᵃⁿᴿᴷ\n'
  texto += '࿇ ══━━━✥◈✥━━━══ ࿇'

  await conn.sendMessage(m.chat, { text: texto }, { quoted: m })
}

handler.help = ['recompensas']
handler.tags = ['rpg']
handler.command = /^(recompensas|recompensa|rewards)$/i
handler.desc = 'Muestra recompensas disponibles por usar la API'

export default handler
