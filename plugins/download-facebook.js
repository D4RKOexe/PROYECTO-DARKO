import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Obtener enlace del mensaje o texto citado
    let query = text ? text.trim() : (m.quoted?.text || null)
    if (!query) 
        return conn.reply(m.chat, `🌸 *Ingresa un enlace de Facebook para descargar*\n\n> *Ejemplo:* ${usedPrefix + command} https://facebook.com/...`, m)

    await m.react('🌀') // Emoji de “procesando”

    try {
        // API DVYER con API key
        const apiUrl = `https://dv-yer-api.online/api/facebook?apikey=dvyer079708280996&url=${encodeURIComponent(query)}`

        const { data } = await axios.get(apiUrl)

        if (!data || !data.result || !data.result.url) {
            await m.react('❌')
            return m.reply('⚠️ *No se pudo obtener el video. Verifica el enlace.*', m)
        }

        const downloadUrl = data.result.url
        const quality = data.result.quality || 'HD'

        // Mensaje con estilo Elyssia
        const ui = `
╭━━━〔 📥 DESCARGADOR 〕━━━⬣
┃ 🌸 Facebook Video
┃
┃ 📝 Calidad: ${quality}
┃ 🌐 Elyssia MD
╰━━━━━━━━━━━━━━━━━━⬣
        `

        await conn.sendMessage(m.chat, { 
            video: { url: downloadUrl }, 
            caption: ui,
            mimetype: 'video/mp4'
        }, { quoted: m })

        await m.react('🌸') // Emoji de “listo”

    } catch (e) {
        console.error(e)
        await m.react('❌')
        m.reply('⚠️ *Error al conectar con la API. Verifica el enlace o intenta más tarde.*', m)
    }
}

handler.help = ['fb', 'facebook']
handler.tags = ['descargas']
handler.command = /^(fb|facebook|fb2|faceboo)$/i

export default handler