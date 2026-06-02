let handler = async (m, { conn, text }) => {
  if (!m.isGroup) return m.reply('❌ Este comando solo funciona en grupos 🌸')
  if (!text) return m.reply('🌸 Uso: #kick @usuario 💫')

  let who = m.mentionedJid?.[0] || (text.split(' ')[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net')
  if (!who) return m.reply('❌ Por favor etiqueta o escribe el número del usuario 🌸')

  // Evitar expulsar al bot o al dueño
  if (who === conn.user.jid) return m.reply('💖 No puedo expulsarme a mí mismo 🌸')
  if (who === global.owner[0][0] + '@s.whatsapp.net') return m.reply('👑 No puedes expulsar al dueño 🌸')

  try {
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
    m.reply(`✨ Usuario expulsado 🌸\n\n👤 Usuario: ${who}\n💫 Ahora el grupo está más tranquilo 🌺`)
  } catch (e) {
    m.reply('❌ No pude expulsar al usuario, asegúrate que el bot es admin 🌸')
  }
}

handler.help = ['kick <@usuario>']
handler.tags = ['group']
handler.command = ['kick']
handler.admin = true
handler.botAdmin = true

export default handler