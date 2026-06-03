let handler = async (m, { conn, isAdmin, args }) => {
  if (!m.isGroup) return conn.sendMessage(m.chat, { text: '👥 「 HINATA WELCOME 」 👥\n▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n\n❥ Solo para grupos\n\n▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔' }, { quoted: m })
  if (!isAdmin) return conn.sendMessage(m.chat, { text: '👥 「 HINATA WELCOME 」 👥\n▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n\n❥ Solo administradores\n\n▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔' }, { quoted: m })

  let chat = global.db.data.chats[m.chat]
  let opcion = args[0]?.toLowerCase()

  if (!opcion || !['on', 'off'].includes(opcion)) {
    let estado = chat?.welcome ? '✅ Activada' : '❌ Desactivada'
    return conn.sendMessage(m.chat, {
      text: '👥 「 HINATA WELCOME 」 👥\n▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n\n🌸 » Estado: ' + estado + '\n\n▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n> #welcome on | #welcome off'
    }, { quoted: m })
  }

  if (opcion === 'on') {
    chat.welcome = true
    global.markDatabaseModified()
    return conn.sendMessage(m.chat, {
      text: '👥 「 HINATA WELCOME 」 👥\n▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n\n✅ » Bienvenida activada\n🌸 » Nuevos miembros recibidos\n\n▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔'
    }, { quoted: m })
  }

  if (opcion === 'off') {
    chat.welcome = false
    global.markDatabaseModified()
    return conn.sendMessage(m.chat, {
      text: '👥 「 HINATA WELCOME 」 👥\n▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n\n❌ » Bienvenida desactivada\n🌸 » Ya no se anunciarán\n\n▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔'
    }, { quoted: m })
  }
}

handler.help = ['welcome']
handler.tags = ['group']
handler.command = /^(welcome|bienvenida)$/i
handler.desc = 'Activa/desactiva bienvenida'
handler.admin = true

export default handler