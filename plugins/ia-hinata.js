import fetch from 'node-fetch'

const API_URL = 'https://elvigilante-api.onrender.com/api/ai/gemini'
const API_KEY = 'elvigilante'

const SYSTEM_PROMPT = `Eres un asistente de HINATA BOT, un bot de WhatsApp. 
Eres amable, útil y conciso. Respondes en español a menos que te hablen en otro idioma.
No eres una IA genérica, eres el asistente oficial de HINATA BOT creado por El Vigilante y BrayanRK.
Nunca digas que eres Gemini o Google. Si preguntan quién te creó, di "El Vigilante y BrayanRK".`

const sesiones = new Map()

function getSesion(sender) {
  if (!sesiones.has(sender)) sesiones.set(sender, { cookie: '', conversationID: '' })
  return sesiones.get(sender)
}

async function preguntarGemini(texto, sender) {
  const sesion = getSesion(sender)
  const prompt = sesion.conversationID ? texto : `${SYSTEM_PROMPT}\n\nUsuario: ${texto}`

  const url = `${API_URL}?apiKey=${API_KEY}&text=${encodeURIComponent(prompt)}&cookie=${encodeURIComponent(sesion.cookie)}`

  const res = await fetch(url)
  const json = await res.json()

  if (!json.status || !json.data?.response) throw new Error('Sin respuesta de la IA')

  sesion.cookie = json.data.conversationID || sesion.cookie
  sesion.conversationID = json.data.conversationID || sesion.conversationID

  return json.data.response
}

let handler = async (m, { conn, text }) => {
  const pregunta = text?.trim()
  const sender = m.sender || m.key?.participant || m.key?.remoteJid || ''

  if (!pregunta) return conn.sendMessage(m.chat, {
    text: '𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ㅤ֢ㅤׄㅤׅ\n\n❀ Escribe tu pregunta\n\n> .ai <pregunta>'
  }, { quoted: m })

  try {
    await conn.sendPresenceUpdate('composing', m.chat)
    const respuesta = await preguntarGemini(pregunta, sender)
    await conn.sendPresenceUpdate('paused', m.chat)
    await m.reply(respuesta)
  } catch (e) {
    console.error('[AI ERROR]', e.message)
    await conn.sendPresenceUpdate('paused', m.chat).catch(() => {})
    await m.reply('𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ㅤ֢ㅤׄㅤׅ\n\n❌ Error al conectar con la IA\n\n> Intenta de nuevo')
  }
}

const botLidMap = new Map()

handler.all = async function (m, { conn }) {
  if (!m.text) return
  if (m.fromMe) return

  const connRef = conn || this
  const botJid = connRef?.user?.id || connRef?.user?.jid || ''
  const botNum = botJid.split('@')[0].split(':')[0]

  if (m.isGroup && !botLidMap.has(m.chat)) {
    try {
      const botLids = await connRef.onWhatsApp(botNum).catch(() => [])
      const botLidJid = botLids?.[0]?.lid
      if (botLidJid) {
        botLidMap.set(m.chat, botLidJid)
      } else {
        const meta = await connRef.groupMetadata(m.chat)
        const me = meta.participants.find(p =>
          p.id.split('@')[0].split(':')[0] === botNum ||
          (p.phoneNumber || '').replace(/\D/g, '') === botNum
        )
        if (me?.id) botLidMap.set(m.chat, me.id)
      }
    } catch {}
  }

  const botLid = botLidMap.get(m.chat) || null

  const isReplyToBot = !!(m.quoted && (
    m.quoted.fromMe === true ||
    (m.quoted.sender && (
      m.quoted.sender.split('@')[0].split(':')[0] === botNum ||
      (botLid && m.quoted.sender === botLid)
    ))
  ))

  let isMention = false
  if (!isReplyToBot) {
    const menciones = m.mentionedJid || []
    if (menciones.length) {
      isMention = menciones.some(jid => {
        if (jid.split('@')[0].split(':')[0] === botNum) return true
        if (botLid && jid === botLid) return true
        return false
      })

      if (!isMention && menciones.some(j => j.endsWith('@lid'))) {
        try {
          const meta = await connRef.groupMetadata(m.chat)
          for (const p of meta.participants) {
            const pid = p.id.split('@')[0].split(':')[0]
            const ppn = (p.phoneNumber || '').replace(/\D/g, '')
            if (pid === botNum || ppn === botNum) {
              botLidMap.set(m.chat, p.id)
              isMention = menciones.some(jid => jid === p.id)
              break
            }
          }
        } catch {}
      }
    }
  }

  if (!isReplyToBot && !isMention) return

  const pregunta = m.text.replace(/@\d+/g, '').trim()
  if (!pregunta) return

  const sender = m.sender || m.key?.participant || m.key?.remoteJid || ''

  try {
    await connRef.sendPresenceUpdate('composing', m.chat)
    const respuesta = await preguntarGemini(pregunta, sender)
    await connRef.sendPresenceUpdate('paused', m.chat)
    await m.reply(respuesta)
  } catch (e) {
    console.error('[AI ALL ERROR]', e.message)
    await connRef.sendPresenceUpdate('paused', m.chat).catch(() => {})
  }
}

handler.before = async function () {}

handler.help = ['ai']
handler.tags = ['ia']
handler.command = /^(ai|gemini|gpt)$/i
handler.desc = 'Asistente IA con Gemini'

export default handler
