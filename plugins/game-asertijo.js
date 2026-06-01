import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
  global.asertijo = global.asertijo || {}

  const acertijos = [
    { pregunta: 'Blanca por dentro, verde por fuera. Si quieres que te lo diga, espera.', respuesta: 'PERA' },
    { pregunta: 'Vuelo de noche, duermo en el día y nunca verás plumas en ala mía.', respuesta: 'MURCIELAGO' },
    { pregunta: 'No es hermano, no es hermana, pero todos saben que es hijo de mi madre.', respuesta: 'YO' }
  ]

  const { pregunta, respuesta } = acertijos[Math.floor(Math.random() * acertijos.length)]

  // Opciones de respuesta (mezclando correcta con otras aleatorias)
  const opciones = [respuesta, 'MANZANA', 'GATO', 'SOL'].sort(() => Math.random() - 0.5)

  // Guardamos el juego
  global.asertijo[m.sender] = {
    respuesta,
    timeout: setTimeout(() => {
      if (global.asertijo[m.sender]) {
        conn.sendMessage(m.chat, `⏰ Se acabó el tiempo\nLa respuesta era: *${respuesta}*`, { quoted: m })
        delete global.asertijo[m.sender]
      }
    }, 60000)
  }

  const text = `
╭━━━〔 🧩 ASERTIJO 〕━━━⬣
┃ ❓ Pregunta:
┃ ${pregunta}
┃
┃ ⏰ Tienes 60 segundos para responder
╰━━━━━━━━━━━━⬣
`

  // Creamos botones interactivos
  const buttons = opciones.map((opt, i) => ({
    buttonId: `asertijo_${opt}_${m.sender}`,
    buttonText: { displayText: opt },
    type: 1
  }))

  const message = generateWAMessageFromContent(m.chat, {
    templateMessage: {
      hydratedTemplate: {
        hydratedContentText: text,
        hydratedFooterText: '🎮 Elyssia MD 🌸',
        hydratedButtons: buttons
      }
    }
  }, { quoted: m })

  await conn.relayMessage(m.chat, message.message, { messageId: message.key.id })
}

// Capturamos la respuesta del botón
handler.before = async (m, { conn }) => {
  const id = m?.message?.buttonResponseMessage?.selectedButtonId
  if (!id || !id.startsWith('asertijo_')) return
  const parts = id.split('_')
  const opcion = parts[1]
  const userId = parts[2]

  const game = global.asertijo[userId]
  if (!game) return

  if (opcion === game.respuesta) {
    clearTimeout(game.timeout)
    await conn.sendMessage(m.chat, `🎉 ¡Correcto! La respuesta es: *${game.respuesta}*`, { quoted: m })
  } else {
    clearTimeout(game.timeout)
    await conn.sendMessage(m.chat, `❌ Incorrecto\nLa respuesta era: *${game.respuesta}*`, { quoted: m })
  }

  delete global.asertijo[userId]
  return true
}

handler.command = ['asertijo', 'acertijo']
handler.tags = ['game']
handler.help = ['asertijo']

export default handler