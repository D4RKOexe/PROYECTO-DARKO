import acrcloud from 'acrcloud'

let acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    if (!/video|audio/.test(mime)) {
      return conn.reply(
        m.chat,
        `⚡ *ELYSSIA MD - WHATMUSIC* ⚡\n\nEtiqueta un audio o video de corta duración usando el comando *${usedPrefix + command}* para descubrir su música. 🐉🌀`,
        m
      )
    }

    // 🌀 Reacción inicial
    await m.react('🌀')

    // 🔥 Descargar audio/video
    let buffer = await q.download()

    // 🎵 Identificar música
    let { status, metadata } = await acr.identify(buffer)
    if (status.code !== 0) throw status.msg 

    let { title, artists, album, genres, release_date } = metadata.music[0]

    // 🌸 Mensaje con estilo Elyssia MD
    let txt = '╭─⬣「 🐉 *Whatmusic Gohan • Elyssia MD* 🌀 」⬣\n'
    txt += `│  ≡◦ *Título*        : ${title}`
    if (artists) txt += `\n│  ≡◦ *Artista*      : ${artists.map(a => a.name).join(', ')}`
    if (album) txt += `\n│  ≡◦ *Álbum*        : ${album.name}`
    if (genres) txt += `\n│  ≡◦ *Género*       : ${genres.map(g => g.name).join(', ')}`
    txt += `\n│  ≡◦ *Lanzamiento*  : ${release_date}`
    txt += `\n╰─⬣`

    await conn.reply(m.chat, txt, m)

    // ✅ Reacción final
    await m.react('✅')

  } catch (e) {
    await conn.reply(
      m.chat,
      `❌ *ELYSSIA MD - ERROR* ❌\nOcurrió un problema al identificar la música.\n\n${e}`,
      m
    )
  }
}

handler.help = ['whatmusic <audio/video>']
handler.tags = ['tools']
handler.command = ['shazam', 'whatmusic']
handler.register = false
export default handler