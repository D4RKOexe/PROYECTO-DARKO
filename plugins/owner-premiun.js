let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return conn.sendMessage(m.chat, {
    text: `🔰⁾ ㅤׄㅤׅㅤׄ DARKO BOT ㅤ֢ㅤׄㅤׅ\n\n🔰 Gestión de usuarios premium\n\n> ${usedPrefix}darpremium <número>\n> ${usedPrefix}quitarpremium <número>\n> ${usedPrefix}listapremium`
  }, { quoted: m })

  const sub = command.toLowerCase()

  if (sub === 'listapremium') {
    const users = global.db.data.users
    const prems = Object.entries(users).filter(([, u]) => u.premium === true)

    if (!prems.length) return conn.sendMessage(m.chat, {
      text: '🔰⁾ ㅤׄㅤׅㅤׄ DARKO BOT ㅤ֢ㅤׄㅤׅ\n\n🔰 No hay usuarios premium actualmente'
    }, { quoted: m })

    const lista = prems.map(([jid]) => `❀ @${jid.split('@')[0]}`).join('\n')
    const mentions = prems.map(([jid]) => jid)

    return conn.sendMessage(m.chat, {
      text: `𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ DARKO BOT ㅤ֢ㅤׄㅤׅ\n\n╭━━━〔 🔱 *USUARIOS PREMIUM* 〕━━⬣\n┃\n${lista}\n┃\n┃ 🔱 Total: *${prems.length}*\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣`,
      mentions
    }, { quoted: m })
  }

  let numero = args[0].replace(/[^0-9]/g, '')
  if (!numero) return conn.sendMessage(m.chat, {
    text: 'ℹ⁾ ㅤׄㅤׅㅤׄ DARKO BOT ㅤ֢ㅤׄㅤׅ\n\n❌ Número inválido\n\n> Ejemplo: .darpremium 591774742300'
  }, { quoted: m })

  const jid = numero + '@s.whatsapp.net'

  if (!global.db.data.users[jid]) {
    global.db.data.users[jid] = { premium: false, premiumTime: 0 }
  }

  const user = global.db.data.users[jid]

  if (sub === 'darpremium') {
    user.premium = true
    user.premiumTime = -1

    await conn.sendMessage(m.chat, {
      text: `🔱 ⁾ ㅤׄㅤׅㅤׄ DARKO BOT ㅤ֢ㅤׄㅤׅ\n\n╭━━━〔 🔱 *PREMIUM ACTIVADO* 〕━━⬣\n┃\n┃ ✅ @${numero} ahora es premium\n┃ 💎 Acceso permanente\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣`,
      mentions: [jid]
    }, { quoted: m })

    try {
      await conn.sendMessage(jid, {
        text: `𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ㅤ֢ㅤׄㅤׅ\n\n╭━━━〔 🔱 *¡ERES PREMIUM!* 〕━━⬣\n┃\n┃ 🌸 ¡Felicidades!\n┃ ❀ Ahora tienes acceso premium\n┃ ❀ Disfruta los comandos exclusivos\n┃ 💎 Acceso permanente\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣`
      })
    } catch {}

    await m.react('✅')

  } else if (sub === 'quitarpremium') {
    if (!user.premium) return conn.sendMessage(m.chat, {
      text: `ℹ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ㅤ֢ㅤׄㅤׅ\n\n❌ @${numero} no tiene premium`,
      mentions: [jid]
    }, { quoted: m })

    user.premium = false
    user.premiumTime = 0

    await conn.sendMessage(m.chat, {
      text: `ℹ⁾ ㅤׄㅤׅㅤׄ DARKO BOT ㅤ֢ㅤׄㅤׅ\n\n╭━━━〔 💎 *PREMIUM REMOVIDO* 〕━━⬣\n┃\n┃ ❌ @${numero} ya no es premium\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣`,
      mentions: [jid]
    }, { quoted: m })

    await m.react('✅')
  }
}

handler.help = ['darpremium', 'quitarpremium', 'listapremium']
handler.tags = ['owner']
handler.command = /^(darpremium|quitarpremium|listapremium)$/i
handler.desc = 'Gestión de usuarios premium'
handler.owner = true

export default handler
