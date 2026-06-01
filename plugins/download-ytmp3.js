import yts from 'yt-search'
import fetch from 'node-fetch'

const API_KEY = 'dvyer079708280996'

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('🎵 Ingresa un nombre o enlace de YouTube.')

  await m.react('🎧')

  try {
    let url = text
    let video

    if (!/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(text)) {
      const search = await yts(text)

      if (!search.videos.length) {
        return m.reply('❌ No encontré resultados.')
      }

      video = search.videos[0]
      url = video.url
    } else {
      const search = await yts({ videoId: getVideoId(text) })

      if (!search) {
        return m.reply('❌ No pude obtener información.')
      }

      video = search
    }

    const caption = `
✧━━━『 ✨ AUDIO YT ✨ 』━━━✧

🎼 *Título:* ${video.title}
📺 *Canal:* ${video.author?.name || 'Desconocido'}
⏳ *Duración:* ${video.timestamp}
👁️ *Vistas:* ${formatViews(video.views)}
🔗 *URL:* ${url}

🌸 Powered by ElyssiaMD 🌸
`

    await conn.sendMessage(
      m.chat,
      {
        image: { url: video.thumbnail },
        caption
      },
      { quoted: m }
    )

    const msg = await conn.sendMessage(
      m.chat,
      { text: '⏳ Descargando audio...' },
      { quoted: m }
    )

    const apiUrl =
      `https://dv-yer-api.online/ytmp3?url=${encodeURIComponent(url)}&apikey=${API_KEY}`

    const res = await fetch(apiUrl)

    console.log('STATUS:', res.status)

    const raw = await res.text()

    console.log('RESPUESTA:', raw)

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }

    const data = JSON.parse(raw)

    const audioUrl =
      data.download ||
      data.url ||
      data.result?.download ||
      data.result?.url ||
      data.result?.download_url

    if (!audioUrl) {
      throw new Error('No se encontró el enlace de descarga.')
    }

    const title = cleanName(
      data.title ||
      data.result?.title ||
      video.title
    )

    await conn.sendMessage(
      m.chat,
      {
        audio: { url: audioUrl },
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`
      },
      { quoted: m }
    )

    await conn.sendMessage(
      m.chat,
      {
        text: `✅ Audio enviado\n\n🎼 ${title}`,
        edit: msg.key
      }
    )

    await m.react('✅')

  } catch (e) {
    console.error(e)
    await m.react('❌')
    m.reply(`Error:\n${e.message}`)
  }
}

function cleanName(text) {
  return String(text)
    .replace(/[^\w\s.-]/g, '')
    .substring(0, 60)
}

function formatViews(views) {
  const n = Number(views)

  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B'
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'

  return String(n || 0)
}

function getVideoId(url) {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
  )

  return match ? match[1] : null
}

handler.command = ['mp3', 'yta', 'ytmp3']
handler.help = ['mp3']
handler.tags = ['descargas']

export default handler