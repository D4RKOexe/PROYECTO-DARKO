import yts from 'yt-search'
import fetch from 'node-fetch'

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('🎬 Ingresa el nombre o enlace de YouTube.')

  await m.react('🎥')

  try {
    // Si es un link directo, seguimos igual
    if (/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(text)) {
      return await descargarVideo(m, conn, text)
    }

    // Si es texto, buscamos videos
    const search = await yts(text)
    if (!search.videos.length) return m.reply('❌ No encontré resultados.')

    // Tomamos hasta 5 resultados
    const videos = search.videos.slice(0, 5)

    // Creamos botones tipo lista
    const sections = [
      {
        title: '🎵 Selecciona una canción',
        rows: videos.map((v, i) => ({
          title: v.title,
          rowId: `#ytselect ${v.url}`,
          description: `⏳ ${v.timestamp} | 👁️ ${formatViews(v.views)}`
        }))
      }
    ]

    const listMessage = {
      text: 'Selecciona el video que quieres descargar:',
      footer: '🌸 Powered by ElyssiaMD 🌸',
      buttonText: 'VER RESULTADOS',
      sections
    }

    await conn.sendMessage(m.chat, listMessage, { quoted: m })

  } catch (e) {
    console.error(e)
    await m.react('❌')
    m.reply(`Error:\n${e.message}`)
  }
}

// Función para descargar video (igual que antes)
async function descargarVideo(m, conn, url) {
  try {
    await m.react('⏳')
    const apiUrl = `https://api-de-el-vigilante-8jnf.onrender.com/download/ytvideo?url=${encodeURIComponent(url)}`
    const res = await fetch(apiUrl)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const videoUrl = data.downloadUrl || data.url
    const title = cleanName(data.title || 'video')

    if (!videoUrl) throw new Error('No se encontró el enlace del video.')

    await conn.sendMessage(
      m.chat,
      { video: { url: videoUrl }, mimetype: 'video/mp4', fileName: `${title}.mp4` },
      { quoted: m }
    )
    await m.react('✅')
  } catch (e) {
    console.error(e)
    await m.react('❌')
    m.reply(`Error al descargar:\n${e.message}`)
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

// Configuración del handler
handler.command = ['play2', 'ytmp4', 'playvideo']
handler.help = ['play2 <texto|url>']
handler.tags = ['descargas']

export default handler