import fetch from 'node-fetch'
import {
  generateWAMessageFromContent,
  proto
} from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
  let who = m.sender

  if (global.tebaktebakan && global.tebaktebakan[who]) {
    return conn.sendMessage(m.chat, {
      text: '🧩 「 HINATA ADIVINANZA 」 🧩\n\n💫 » Ya tienes una adivinanza activa\n\n> Responde con la respuesta'
    }, { quoted: m })
  }

  try {
    let searchUrl = 'https://api-faa.my.id/faa/tebaktebakan'
    let res = await fetch(searchUrl)
    let json = await res.json()

    if (!json.estado || !json.resultado) {
      return conn.sendMessage(m.chat, {
        text: '🧩 「 HINATA ADIVINANZA 」 🧩\n\n💫 » No se pudo obtener adivinanza'
      }, { quoted: m })
    }

    if (!global.tebaktebakan) global.tebaktebakan = {}
    global.tebaktebakan[who] = {
      respuesta: json.resultado.respuesta.toLowerCase(),
      tiempo: Date.now() + 60000
    }

    let texto = '🧩 「 HINATA ADIVINANZA 」 🧩\n\n'
    texto += '💫 » Adivina la respuesta\n\n'
    texto += '❓ » ' + json.resultado.soal + '\n\n'
    texto += '> Tienes 60 segundos\n> Responde con texto'

    await conn.sendMessage(m.chat, { text: texto }, { quoted: m })

    setTimeout(() => {
      if (global.tebaktebakan && global.tebaktebakan[who]) {
        let resp = global.tebaktebakan[who].respuesta
        delete global.tebaktebakan[who]
        conn.sendMessage(m.chat, { 
          text: '🧩 「 HINATA ADIVINANZA 」 🧩\n\n⏰ » ¡Se acabó el tiempo!\n📝 » Era: ' + resp 
        }, { quoted: m })
      }
    }, 60000)

  } catch (e) {
    console.log(e)
    conn.sendMessage(m.chat, { text: '❌ Error al obtener adivinanza' }, { quoted: m })
  }
}

handler.before = async (m, { conn }) => {
  let who = m.sender
  if (!m.text || !global.tebaktebakan || !global.tebaktebakan[who]) return

  let game = global.tebaktebakan[who]
  let respuesta = m.text.toLowerCase().trim()

  if (respuesta === game.respuesta) {
    let user = global.db.data.users[who]
    if (!user) {
      global.db.data.users[who] = { diamantes: 0, diamond: 0, exp: 0 }
      user = global.db.data.users[who]
    }

    let premio = Math.floor(Math.random() * 3) + 2

    if (user.diamantes !== undefined) {
      user.diamantes = (user.diamantes || 0) + premio
    } else {
      user.diamond = (user.diamond || 0) + premio
    }

    user.exp = (user.exp || 0) + 10
    delete global.tebaktebakan[who]

    let total = user.diamantes !== undefined ? user.diamantes : (user.diamond || 0)

    await m.react('✅')
    await conn.sendMessage(m.chat, {
      text: '🧩 「 HINATA ADIVINANZA 」 🧩\n\n🏆 » ¡CORRECTO!\n\n📝 » ' + game.respuesta + '\n💎 » +' + premio + ' diamantes\n✨ » +10 exp\n💰 » Total: ' + total + ' 💎'
    }, { quoted: m })
    return true
  }
}

handler.help = ['adivinanza']
handler.tags = ['diversion']
handler.command = /^(adivinanza|adivina|tebakan)$/i
handler.desc = 'Adivina la respuesta y gana 💎'

export default handler