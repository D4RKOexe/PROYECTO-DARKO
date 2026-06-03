import fetch from 'node-fetch'
import {
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  proto
} from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let who = m.sender
  let user = global.db.data.users[who]
  if (!user) {
    global.db.data.users[who] = { diamantes: 0 }
    user = global.db.data.users[who]
  }

  if (!text) {
    let media = await prepareWAMessageMedia({ image: { url: 'https://files.catbox.moe/r60c8l.jpg' } }, { upload: conn.waUploadToServer })

    const interactiveMessage = proto.Message.InteractiveMessage.create({
      header: {
        title: 'HINATA BOT - TIKTOK',
        subtitle: 'Busca y descarga videos',
        hasMediaAttachment: true,
        imageMessage: media.imageMessage
      },
      body: {
        text: '𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT - TIKTOK ㅤ֢ㅤׄㅤׅ\n\n❥ *COMANDO:* ' + usedPrefix + command + ' (búsqueda o link)\n\n> Ejemplo: ' + usedPrefix + command + ' Goku\n> O pega un link de TikTok\n> 💎 Cuesta 2 diamantes por descarga'
      },
      footer: { text: '⫏⫏ HINATA BOT ✿' },
      nativeFlowMessage: {
        buttons: [{
          name: 'single_select',
          buttonParamsJson: JSON.stringify({
            title: '🎵 TIKTOK',
            sections: [{
              title: '🔍 BUSCAR O LINK',
              rows: [{
                header: '📥 DESCARGAR',
                title: '🎬 BUSCAR VIDEO O PEGAR LINK',
                description: '💎 2 diamantes | Ejemplo: Goku',
                id: 'tt '
              }]
            }]
          })
        }]
      }
    })

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: { message: { messageContextInfo: {}, interactiveMessage } }
    }, { quoted: m })

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    return
  }

  let query = text.trim()
  let isDirectLink = query.includes('tiktok.com') || query.includes('vm.tiktok.com')

  if (isDirectLink) {
    if ((user.diamantes || 0) < 2) {
      return conn.sendMessage(m.chat, {
        text: '𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ㅤ֢ㅤׄㅤׅ\n\n❥ ❌ No tienes 2 diamantes\n\n> Usa #work para ganar'
      }, { quoted: m })
    }

    await m.react('⏳')
    await conn.sendMessage(m.chat, { text: '⏳ Descargando video...\n💎 -2 diamantes' }, { quoted: m })

    try {
      const downloadUrl = `https://api-de-el-vigilante-8jnf.onrender.com/download/tiktok?url=${encodeURIComponent(query)}`
      const res = await fetch(downloadUrl)
      const json = await res.json()

      if (!json.status || !json.tiktok_url) {
        throw new Error('No se pudo descargar')
      }

      user.diamantes -= 2

      await conn.sendMessage(m.chat, {
        video: { url: json.tiktok_url },
        caption: '𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT - TIKTOK ㅤ֢ㅤׄㅤׅ\n\n❥ ✅ Descarga completada\n\n🎬 ' + (json.titulo || '') + '\n👤 ' + (json.autor || '') + '\n⏱️ ' + (json.duracion || '') + 's | 👁️ ' + (json.vistas || '') + '\n💎 Restantes: ' + user.diamantes + '\n\n⫏⫏ HINATA BOT ✿'
      }, { quoted: m })

      await m.react('✅')

    } catch (e) {
      console.log(e)
      await m.react('❌')
      conn.sendMessage(m.chat, { text: '𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ㅤ֢ㅤׄㅤׅ\n\n❥ ❌ Error al descargar' }, { quoted: m })
    }
    return
  }

  await m.react('🔍')

  try {
    const searchUrl = `https://api-de-el-vigilante-8jnf.onrender.com/search/tiktok?query=${encodeURIComponent(query)}`
    const searchRes = await fetch(searchUrl)
    const searchData = await searchRes.json()

    if (!searchData.status || !searchData.resultados?.length) {
      throw new Error('No se encontraron resultados')
    }

    const resultados = searchData.resultados.slice(0, 10)
    let primeraMiniatura = resultados[0].cover || ''

    let media = null
    if (primeraMiniatura) {
      media = await prepareWAMessageMedia({ image: { url: primeraMiniatura } }, { upload: conn.waUploadToServer })
    }

    const rows = resultados.map((video, i) => ({
      header: '🎬 ' + (video.autor || 'Desconocido'),
      title: video.titulo.substring(0, 35),
      description: '⏱️ ' + video.duracion + 's | 👁️ ' + (video.vistas || '?'),
      id: 'tt_' + i + '_' + Buffer.from(video.tiktok_url).toString('base64') + '_' + Buffer.from(video.titulo).toString('base64')
    }))

    const interactiveMessage = proto.Message.InteractiveMessage.create({
      header: {
        title: 'HINATA BOT - TIKTOK',
        subtitle: 'Selecciona un video',
        hasMediaAttachment: !!media,
        imageMessage: media ? media.imageMessage : undefined
      },
      body: {
        text: '𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ RESULTADOS ㅤ֢ㅤׄㅤׅ\n\n❥ *BÚSQUEDA:* ' + query + '\n\n> Elige una opción\n> 💎 2 diamantes al descargar'
      },
      footer: { text: '⫏⫏ HINATA BOT ✿' },
      nativeFlowMessage: {
        buttons: [{
          name: 'single_select',
          buttonParamsJson: JSON.stringify({
            title: '🎬 RESULTADOS',
            sections: [{ title: '📋 ' + query.toUpperCase(), rows }]
          })
        }]
      }
    })

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: { message: { messageContextInfo: {}, interactiveMessage } }
    }, { quoted: m })

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

  } catch (error) {
    console.log(error)
    await m.react('❌')
    conn.sendMessage(m.chat, { text: '𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ㅤ֢ㅤׄㅤׅ\n\n❥ ❌ No se encontraron resultados' }, { quoted: m })
  }
}

handler.before = async (m, { conn }) => {
  const nativeFlow = m.message?.interactiveResponseMessage?.nativeFlowResponseMessage
  if (!nativeFlow) return false

  try {
    const data = JSON.parse(nativeFlow.paramsJson || '{}')
    const id = data.id || data.selectedId || data.selectedRowId || null
    if (!id) return false
    if (!id.startsWith('tt_')) return false

    let who = m.sender
    let user = global.db.data.users[who]
    if (!user) {
      global.db.data.users[who] = { diamantes: 0 }
      user = global.db.data.users[who]
    }

    if ((user.diamantes || 0) < 2) {
      await conn.sendMessage(m.chat, { text: '𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ㅤ֢ㅤׄㅤׅ\n\n❥ ❌ No tienes 2 diamantes\n\n> Usa #work para ganar' }, { quoted: m })
      return true
    }

    const parts = id.split('_')
    const urlBase64 = parts[2]
    const titleBase64 = parts[3]
    const tiktokUrl = Buffer.from(urlBase64, 'base64').toString()
    const titulo = Buffer.from(titleBase64, 'base64').toString()

    user.diamantes -= 2

    await m.react('⏳')
    await conn.sendMessage(m.chat, { text: '⏳ Descargando video...\n💎 -2 diamantes' }, { quoted: m })

    const downloadUrl = `https://api-de-el-vigilante-8jnf.onrender.com/download/tiktok?url=${encodeURIComponent(tiktokUrl)}`
    const res = await fetch(downloadUrl)
    const json = await res.json()

    if (!json.status || !json.tiktok_url) {
      user.diamantes += 2
      throw new Error('No se pudo descargar, diamantes devueltos')
    }

    await conn.sendMessage(m.chat, {
      video: { url: json.tiktok_url },
      caption: '𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT - TIKTOK ㅤ֢ㅤׄㅤׅ\n\n❥ ✅ Descarga completada\n\n🎬 ' + (json.titulo || titulo) + '\n👤 ' + (json.autor || '') + '\n⏱️ ' + (json.duracion || '') + 's | 👁️ ' + (json.vistas || '') + '\n💎 Restantes: ' + user.diamantes + '\n\n⫏⫏ HINATA BOT ✿'
    }, { quoted: m })

    await m.react('✅')
    return true

  } catch (e) {
    console.log(e)
    await conn.sendMessage(m.chat, { text: '❌ Error: ' + e.message }, { quoted: m })
    await m.react('❌')
    return true
  }
}

handler.help = ['tiktok']
handler.tags = ['downloader']
handler.command = /^(tiktok|tt|tik|tiktokdownload)$/i
handler.desc = 'Busca y descarga videos de TikTok 💎2'

export default handler