import { downloadContentFromMessage } from '@whiskeysockets/baileys'

let handler = async (m, { conn, isAdmin, isBotAdmin }) => {
  if (!isBotAdmin) return conn.sendMessage(m.chat, {
    text: '𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ㅤ֢ㅤׄㅤׅ\n\n❌ Necesito ser administrador\n\n> Dame permisos de admin para usar este comando'
  }, { quoted: m })

  if (!isAdmin) return conn.sendMessage(m.chat, {
    text: '𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ㅤ֢ㅤׄㅤׅ\n\n❌ Solo administradores\n\n> No tienes permisos para usar este comando'
  }, { quoted: m })

  const msg = m.quoted || m
  const mime = msg?.mimetype || ''

  if (!mime.startsWith('image/')) return conn.sendMessage(m.chat, {
    text: '𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ㅤ֢ㅤׄㅤׅ\n\n❀ Envía o responde una imagen\n\n> Úsalo respondiendo a una foto'
  }, { quoted: m })

  await m.react('⏳')

  try {
    const stream = await downloadContentFromMessage(msg.msg || msg, 'image')
    let buffer = Buffer.from([])
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk])

    await conn.updateProfilePicture(m.chat, buffer)

    await conn.sendMessage(m.chat, {
      text: `𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ㅤ֢ㅤׄㅤׅ\n\n❀ Foto del grupo actualizada\n\n> Solicitado por @${m.sender.split('@')[0]}`,
      mentions: [m.sender]
    }, { quoted: m })

    await m.react('✅')
  } catch (e) {
    await m.react('❌')
    await conn.sendMessage(m.chat, {
      text: `𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ㅤ֢ㅤׄㅤׅ\n\n❌ No se pudo cambiar la foto\n\n> ${e.message}`
    }, { quoted: m })
  }
}

handler.help = ['setphoto']
handler.tags = ['group']
handler.command = /^setphoto$/i
handler.desc = 'Cambia la foto del grupo'
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
