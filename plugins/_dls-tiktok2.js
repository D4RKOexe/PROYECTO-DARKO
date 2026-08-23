import fetch from 'node-fetch'

const API_KEY = 'nyx_8_35kniYrUDxyl8horAJ9hy9LsZsbDNh'
const API_URL = 'https://nyxdlapi.vercel.app/api/downloads/tiktok'
const SEARCH_URL = 'https://dv-yer-api.online/tiktoksearch'

function isTikTokUrl(text) {
  return /tiktok\.com|vm\.tiktok\.com/i.test(text)
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const input = text?.trim()

  if (!input) return conn.sendMessage(m.chat, {
    text: `⚡ ㅤׄㅤׅㅤׄ DARKO BOT ㅤ֢ㅤׄㅤׅ\n\n⚡ Descarga videos de TikTok\n\n> ${usedPrefix}${command} <link o nombre>\n> Ejemplo: ${usedPrefix}${command} ozuna\n> Ejemplo: ${usedPrefix}${command} https://vm.tiktok.com/xxx`
  }, { quoted: m })

  await m.react('🔍')

  try {
    let videoUrl = input

    if (!isTikTokUrl(input)) {
      await conn.sendMessage(m.chat, {
        text: `𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ㅤ֢ㅤׄㅤׅ\n\n❀ Buscando: *${input}*\n\n> Espera un momento...`
      }, { quoted: m })

      const searchRes = await fetch(`${SEARCH_URL}?q=${encodeURIComponent(input)}&apikey=${API_KEY}`)
      const searchJson = await searchRes.json()

      if (!searchJson.ok || !searchJson.url) {
        await m.react('❌')
        return conn.sendMessage(m.chat, {
          text: `𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ㅤ֢ㅤׄㅤׅ\n\n❌ No se encontraron resultados\n\n> Intenta con otro término`
        }, { quoted: m })
      }

      videoUrl = searchJson.url
    }

    await m.react('⏳')

    const res = await fetch(`${API_URL}?url=${encodeURIComponent(videoUrl)}&quality=low&apikey=${API_KEY}`)
    const json = await res.json()

    if (!json.ok || !json.download_url) {
      await m.react('❌')
      return conn.sendMessage(m.chat, {
        text: '⚠️⁾ ㅤׄㅤׅㅤׄ DARKO BOT ㅤ֢ㅤׄㅤׅ\n\n❌ No se pudo obtener el video\n\n> Intenta más tarde'
      }, { quoted: m })
    }

    const title = json.title || 'TikTok'
    const downloadUrl = json.download_url
    const quality = json.quality || 'MP4'
    const thumbnail = json.thumbnail || null

    const caption = `🔽ㅤׄㅤׅㅤׄ DARKO BOT ㅤ֢ㅤׄㅤׅ\n\nℹ ${title}\nℹ Formato: *${quality}*\nℹ Plataforma: *TikTok*`

    try {
      await conn.sendMessage(m.chat, {
        video: { url: downloadUrl },
        mimetype: 'video/mp4',
        fileName: 'tiktok.mp4',
        caption,
        jpegThumbnail: thumbnail ? await fetch(thumbnail).then(r => r.arrayBuffer()).then(b => Buffer.from(b)) : undefined
      }, { quoted: m })
    } catch {
      await conn.sendMessage(m.chat, {
        document: { url: downloadUrl },
        mimetype: 'video/mp4',
        fileName: 'tiktok.mp4',
        caption
      }, { quoted: m })
    }

    await m.react('✅')

  } catch (e) {
    await m.react('❌')
    await conn.sendMessage(m.chat, {
      text: `⚠️ ㅤׄㅤׅㅤׄ DARKO BOT ㅤ֢ㅤׄㅤׅ\n\n❌ Error al descargar\n\n> ${e.message}`
    }, { quoted: m })
  }
}

handler.help = ['tiktok2']
handler.tags = ['downloader']
handler.command = /^tiktok2$/i
handler.desc = 'Descarga videos de TikTok por link'

export default handler
