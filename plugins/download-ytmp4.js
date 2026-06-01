import yts from 'yt-search'
import fetch from 'node-fetch'

const API_KEY = 'dvyer079708280996'

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('🎬 Ingresa un nombre o enlace de YouTube.')

  await m.react('🎥')

  try {
    // Buscar los primeros 4 videos
    const search = await yts(text)
    if (!search.videos.length) return m.reply('❌ No encontré resultados.')

    const results = search.videos.slice(0, 4)

    // Preparar el mensaje con botones
    let txt = `╭━━〔 🎬 PLAY2 SEARCH 🎬 〕━━⬣\n\nSelecciona un resultado para descargar:\n\n`
    for (let i = 0; i < results.length; i++) {
      txt += `${i + 1}. ${results[i].title}\n`
    }
    txt += '\n🌸 ElyssiaMD 🌸'

    const buttons = results.map((v, i) => ({
      buttonId: `.ytmp4 ${v.url}`,
      buttonText: { displayText: `🎥 Video ${i + 1}` },
      type: 1
    }))

    await conn.sendMessage(
      m.chat,
      {
        image: { url: results[0].thumbnail },
        caption: txt,
        buttons,
        headerType: 4
      },
      { quoted: m }
    )

  } catch (e) {
    console.error(e)
    await m.react('❌')
    m.reply(`Error:\n${e.message}`)
  }
}

// Función de descarga MP4 reutilizando tu API Key
export const downloadYtMp4 = async (url, conn, m) => {
  try {
    const msg = await conn.sendMessage(
      m.chat,
      { text: '⏳ Descargando video...' },
      { quoted: m }
    )

    const apiUrl = `https://dv-yer-api.online/ytmp4?url=${encodeURIComponent(url)}&apikey=${API_KEY}`

    const res = await fetch(apiUrl)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()
    const videoUrl = data.download || data.url || data.result?.download || data.result?.url || data.result?.download_url
    if (!videoUrl) throw new Error('No se encontró el enlace del video.')

    const title = (data.title || data.result?.title || 'video').replace(/[^\w\s.-]/g, '').substring(0, 60)

    await conn.sendMessage(
      m.chat,
      {
        video: { url: videoUrl },
        mimetype: 'video/mp4',
        fileName: `${title}.mp4`
      },
      { quoted: m }
    )

    await conn.sendMessage(
      m.chat,
      { text: `✅ Video enviado\n🎬 ${title}`, edit: msg.key }
    )

    await m.react('✅')
  } catch (e) {
    console.error(e)
    await m.react('❌')
    m.reply(`Error:\n${e.message}`)
  }
}

// Función auxiliar para extraer ID de YouTube
function getVideoId(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/)
  return match ? match[1] : null
}

// Configuración del handler
handler.command = ['play2', 'ytmp4', 'playvideo']
handler.help = ['play2 <texto|url>']
handler.tags = ['descargas']

export default handler