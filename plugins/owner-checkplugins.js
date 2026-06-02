import fs from 'fs'
import path from 'path'

const handler = async (m, { conn, isROwner }) => {
  if (!isROwner) return m.reply('❌ Solo el propietario de Elyssia MD puede usar este comando.');

  const pluginsPath = './plugins'
  if (!fs.existsSync(pluginsPath)) return m.reply('📂 Carpeta de plugins no encontrada.');

  const files = fs.readdirSync(pluginsPath).filter(f => f.endsWith('.js'))
  if (files.length === 0) return m.reply('📂 No se encontraron plugins para revisar 🌸.')

  let reportOK = []
  let reportError = []

  for (let file of files) {
    try {
      // Analiza si el archivo tiene errores de sintaxis sin ejecutarlo
      const content = fs.readFileSync(path.join(pluginsPath, file), 'utf-8')
      new Function(content) // solo comprueba sintaxis
      reportOK.push(`😉 ${file} → Sin errores`)
    } catch (err) {
      reportError.push(`🌀 ${file} → ${err.message}`)
    }
  }

  // Crear mensaje final estilo Elyssia MD
  let message = `╭━━━〔 🌸 ELYSSIA MD 〕━━━⬣\n`
  message += `┃ 📋 Revisión de plugins 🫣\n`
  message += `╰━━━━━━━━━━━━━━━━⬣\n\n`

  if (reportOK.length) {
    message += `✅ *Plugins OK:*\n${reportOK.join('\n')}\n\n`
  }
  if (reportError.length) {
    message += `⚠️ *Plugins con errores:*\n${reportError.join('\n')}\n\n`
  }

  message += `✨ Elyssia MD completó la revisión de plugins.`
  await m.reply(message)
}

handler.command = /^checkplugins$/i
handler.help = ['checkplugins']
handler.tags = ['owner']
handler.rowner = true // solo owner

export default handler