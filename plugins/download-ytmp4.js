import yts from 'yt-search'
import fetch from 'node-fetch'

const API_KEY = 'dvyer079708280996'

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('🎬 Ingresa el nombre o enlace de YouTube.')

  await m.react('🎥')

  try {
    let url = text
    let video

    // Buscar video si es texto
    if (!/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(text)) {
      const search = await yts(text)
      if (!search.videos.length) return m.reply('❌ No encontré resultados.')
      video = search.videos[0]
      url = video.url
    } else {
      const search = await yts({ videoId: getVideoId(text) })
      if (!search) return m.reply('❌ No pude obtener información.')
      video = search
    }

    const caption = `
✧━━━『 ✨ PLAY2 YT ✨ 』━━━✧

🎼 *Título:* ${video.title}
📺 *Canal:* ${video.author?.name || 'Desconocido'}
⏳ *Duración:* ${video.timestamp}
👁️ *Vistas:* ${formatViews(video.views)}
🔗 *URL:* ${url}

🌸 Powered by ElyssiaMD 🌸
`

    await conn.sendMessage(
      m.chat,
      { image: { url: video.thumbnail }, caption },
      { quoted: m }
    )

    const msg = await conn.sendMessage(
      m.chat,
      { text: '⏳ Descargando video...' },
      { quoted: m }
    )

    const apiUrl =
      `https://dv-yer-api.online/ytmp4?url=${encodeURIComponent(url)}&apikey=${API_KEY}`

    const res = await fetch(apiUrl)
    console.log('STATUS:', res.status)

    const raw = await res.text()
    console.log('RESPUESTA:', raw)

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = JSON.parse(raw)

    const videoUrl =
      data.download ||
      data.url ||
      data.result?.download ||
      data.result?.url ||
      data.result?.download_url

    if (!videoUrl) throw new Error('No se encontró el enlace del video.')

    const title = cleanName(
      data.title ||
      data.result?.title ||
      video.title
    )

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
      { text: `✅ Video enviado\n\n🎼 ${title}`, edit: msg.key }
    )

    await m.react('✅')

  } catch (e) {
    console.error(e)
    await m.react('❌')
    m.reply(`Error:\n${e.message}`)
  }
}

// Funciones auxiliares
function cleanName(text) {
  return String(text).replace(/[^\w\s.-]/g, '').substring(0, 60)
}

function formatViews(views) {
  const n = Number(views)
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B'
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'
  return String(n || 0)
}

function getVideoId(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/)
  return match ? match[1] : null
}

// Configuración del handler
handler.command = ['play2', 'ytmp4', 'playvideo']
handler.help = ['play2 <texto|url>']
handler.tags = ['descargas']

export default handler