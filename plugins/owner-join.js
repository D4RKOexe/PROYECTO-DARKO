let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text }) => {
  let who = m.sender
  let owners = ['59177474230@s.whatsapp.net', '573223090406@s.whatsapp.net']

  if (!owners.includes(who)) {
    return conn.sendMessage(m.chat, {
      text: '🔗 「 HINATA JOIN 」 🔗\n\n💫 » Solo los creadores pueden usar este comando bb'
    }, { quoted: m })
  }

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: '🔗 「 HINATA JOIN 」 🔗\n\n💫 » Ingresa el enlace del Grupo bb\n\n> #join https://chat.whatsapp.com/XXXXX'
    }, { quoted: m })
  }

  try {
    let match = text.match(linkRegex)
    let code = match ? match[1] : null  // ← índice [1], no [0]

    if (!code) {
      return conn.sendMessage(m.chat, {
        text: '🔗 「 HINATA JOIN 」 🔗\n\n🐢 » Enlace inválido bb\n\nEjemplo: https://chat.whatsapp.com/XXXXXXXXXXXXXXXXX'
      }, { quoted: m })
    }

    await conn.groupAcceptInvite(code)
    await conn.sendMessage(m.chat, {
      text: '🔗 「 HINATA JOIN 」 🔗\n\n🍭 » El jefe ordenó y la bot obedeció — me uní al grupo bb ✅'
    }, { quoted: m })

  } catch (e) {
    await conn.sendMessage(m.chat, {
      text: `🔗 「 HINATA JOIN 」 🔗\n\n✘ » Error al unirse bb\n\n_${e.message || e}_`
    }, { quoted: m })
  }
}

handler.help = ['join']
handler.tags = ['owner']
handler.command = /^(join|entrar)$/i
handler.desc = 'Une la bot a un grupo bb'
handler.rowner = true

export default handler
