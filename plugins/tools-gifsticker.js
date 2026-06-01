import fs from 'fs'

let handler = async (m, { conn, usedPrefix, command }) => {
  const q = m.quoted ? m.quoted : m
  const mime = (q.msg || q).mimetype || ''

  if (!/video|image/.test(mime)) {
    return conn.reply(
      m.chat,
      `🎞️ Responde a un *GIF o video corto* con *${usedPrefix + command}*`,
      m
    )
  }

  try {
    await conn.reply(m.chat, '🌸 Elyssia Bot MD\n\n✨ Convirtiendo a sticker...', m)

    const stream = await q.download()

    let buffer = Buffer.from([])
    for await (const chunk of stream) buffer.push(chunk)

    const file = './temp.gif'

    fs.writeFileSync(file, buffer)

    await conn.sendMessage(
      m.chat,
      {
        sticker: { url: file }
      },
      { quoted: m }
    )

    fs.unlinkSync(file)

  } catch (e) {
    console.log(e)
    conn.reply(m.chat, '❌ Error al convertir GIF a sticker', m)
  }
}

handler.help = ['togif', 'sticker']
handler.tags = ['tools']
handler.command = ['togif', 'gifsticker', 'stikergif']

export default handler