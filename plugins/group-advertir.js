let handler = async (m, { conn, isAdmin, isBotAdmin, args, text }) => {
  if (!m.isGroup) {
    let texto = '╭━━━〔 𝕳𝖎𝖓𝖆𝖙𝖆 𝖂𝖆𝖗𝖓 ˚ʚ♡ɞ˚ 〕━━⬣\n┃\n┃ ❧ Solo para grupos\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣'
    return conn.sendMessage(m.chat, { text: texto }, { quoted: m })
  }

  if (!isAdmin) {
    let texto = '╭━━━〔 𝕳𝖎𝖓𝖆𝖙𝖆 𝖂𝖆𝖗𝖓 ˚ʚ♡ɞ˚ 〕━━⬣\n┃\n┃ ❧ Solo administradores\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣'
    return conn.sendMessage(m.chat, { text: texto }, { quoted: m })
  }

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : null

  if (!who) {
    let texto = '╭━━━〔 𝕳𝖎𝖓𝖆𝖙𝖆 𝖂𝖆𝖗𝖓 ˚ʚ♡ɞ˚ 〕━━⬣\n┃\n┃ ❧ Menciona o responde a quien advertir\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣'
    return conn.sendMessage(m.chat, { text: texto }, { quoted: m })
  }

  let metadata = await conn.groupMetadata(m.chat)
  let isTargetOwner = metadata.participants.some(p => p.id === who && p.admin === 'superadmin')
  let isTargetAdmin = metadata.participants.some(p => p.id === who && (p.admin === 'admin' || p.admin === 'superadmin'))

  if (isTargetOwner || isTargetAdmin) {
    let texto = '╭━━━〔 𝕳𝖎𝖓𝖆𝖙𝖆 𝖂𝖆𝖗𝖓 ˚ʚ♡ɞ˚ 〕━━⬣\n┃\n┃ ❧ No se puede advertir a un admin\n┃ ❧ @' + who.split('@')[0] + '\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣'
    return conn.sendMessage(m.chat, { text: texto, mentions: [who] }, { quoted: m })
  }

  if (!global.db.data.users[who]) {
    global.db.data.users[who] = { exp: 0, level: 0, diamantes: 0, warn: 0 }
  }

  let user = global.db.data.users[who]
  if (!('warn' in user)) user.warn = 0

  let motivo = args.slice(1).join(' ') || text.replace(/@\d+/g, '').trim() || 'Sin especificar'

  user.warn = (user.warn || 0) + 1

  if (user.warn >= 3) {
    if (!isBotAdmin) {
      let texto = '╭━━━〔 𝕳𝖎𝖓𝖆𝖙𝖆 𝖂𝖆𝖗𝖓 ˚ʚ♡ɞ˚ 〕━━⬣\n┃\n┃ ❧ @' + who.split('@')[0] + ' llegó a 3 advertencias\n┃ ❧ La bot necesita ser admin para expulsarlo\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣'
      return conn.sendMessage(m.chat, { text: texto, mentions: [who] }, { quoted: m })
    }

    user.warn = 0

    let textoBan = '╭━━━〔 𝕳𝖎𝖓𝖆𝖙𝖆 𝖂𝖆𝖗𝖓 ˚ʚ♡ɞ˚ 〕━━⬣\n┃\n┃ ❧ @' + who.split('@')[0] + ' alcanzó 3 advertencias\n┃ ❧ Expulsado automáticamente\n┃\n┃ ❧ Motivo última advertencia\n┃ > ' + motivo + '\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣'
    await conn.sendMessage(m.chat, { text: textoBan, mentions: [who] }, { quoted: m })

    try {
      await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
    } catch (e) {
      let textoError = '╭━━━〔 𝕳𝖎𝖓𝖆𝖙𝖆 𝖂𝖆𝖗𝖓 ˚ʚ♡ɞ˚ 〕━━⬣\n┃\n┃ ❧ No se pudo expulsar al usuario\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━⬣'
      await conn.sendMessage(m.chat, { text: textoError }, { quoted: m })
    }
    return
  }

  let texto = '╭━━━〔 𝕳𝖎𝖓𝖆𝖙𝖆 𝖂𝖆𝖗𝖓 ˚ʚ♡ɞ˚ 〕━━⬣\n┃\n'
  texto += '┃ ❧ Usuario advertido\n'
  texto += '┃ ❧ @' + who.split('@')[0] + '\n┃\n'
  texto += '┃ ❧ Motivo\n'
  texto += '┃ > ' + motivo + '\n┃\n'
  texto += '┃ ❧ Advertencias\n'
  texto += '┃ > ' + user.warn + ' / 3\n┃\n'
  texto += '╰━━━━━━━━━━━━━━━━━━━━━━⬣'

  await conn.sendMessage(m.chat, { text: texto, mentions: [who] }, { quoted: m })
}

handler.help = ['advertir']
handler.tags = ['group']
handler.command = /^(advertir|warn|adv)$/i
handler.desc = 'Da una advertencia, al llegar a 3 se expulsa automáticamente'
handler.admin = true

export default handler
