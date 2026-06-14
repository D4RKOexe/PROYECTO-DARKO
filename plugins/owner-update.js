import { exec } from 'child_process'

const handler = async (m, { conn }) => {
  let who = m.sender

  let textoEspera = '࿇ ══━━━✥◈✥━━━══ ࿇\n'
  textoEspera += '   𝕳𝖎𝖓𝖆𝖙𝖆 𝖀𝖕𝖉𝖆𝖙𝖊\n'
  textoEspera += '࿇ ══━━━✥◈✥━━━══ ࿇\n\n'
  textoEspera += '𖣔 ʙᴜsᴄᴀɴᴅᴏ ᴀᴄᴛᴜᴀʟɪᴢᴀᴄɪᴏɴᴇs ˚ʚ♡ɞ˚\n'
  textoEspera += '❧ Espera un momento...\n\n'
  textoEspera += '࿇ ══━━━✥◈✥━━━══ ࿇'

  await conn.sendMessage(m.chat, { text: textoEspera }, { quoted: m })

  exec('git pull', async (err, stdout, stderr) => {
    if (err) {
      let error = err.message
      let motivo = 'Error inesperado'
      let solucion = error

      if (error.includes('not a git repository')) {
        motivo = 'No es un repositorio git'
        solucion = 'Clona el bot con git clone'
      } else if (error.includes('Could not resolve host')) {
        motivo = 'Sin conexión a internet'
        solucion = 'Verifica tu conexión'
      } else if (error.includes('Merge conflict')) {
        motivo = 'Conflicto de fusión detectado'
        solucion = 'Usa #exec git stash && git pull --force'
      } else if (error.includes('Please commit')) {
        motivo = 'Tienes cambios locales sin guardar'
        solucion = 'Usa #exec git stash && git pull'
      }

      let textoError = '࿇ ══━━━✥◈✥━━━══ ࿇\n'
      textoError += '   𝕳𝖎𝖓𝖆𝖙𝖆 𝖀𝖕𝖉𝖆𝖙𝖊\n'
      textoError += '࿇ ══━━━✥◈✥━━━══ ࿇\n\n'
      textoError += '𖣔 ᴇʀʀᴏʀ ˚ʚ♡ɞ˚\n'
      textoError += '❧ ' + motivo + '\n'
      textoError += '> ' + solucion + '\n\n'
      textoError += '࿇ ══━━━✥◈✥━━━══ ࿇'

      await conn.sendMessage(m.chat, { text: textoError }, { quoted: m })
      return
    }

    if (stdout.includes('Already up to date')) {
      let textoAlDia = '𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ㅤ֢ㅤׄㅤׅ\n\n'
      textoAlDia += '𖣔 ᴇsᴛᴀᴅᴏ ˚ʚ♡ɞ˚\n'
      textoAlDia += '❧ Hinata ya está en su mejor versión\n'
      textoAlDia += '❧ No hay actualizaciones pendientes\n\n'
      textoAlDia += '> Solicitado por @' + who.split('@')[0]

      await conn.sendMessage(m.chat, {
        image: { url: 'https://files.catbox.moe/b7a14a.png' },
        caption: textoAlDia,
        mentions: [who]
      }, { quoted: m })
      return
    }

    let creados = stdout.match(/create mode \d+ (.+)/g) || []
    let eliminados = stdout.match(/delete mode \d+ (.+)/g) || []

    let filesCreados = creados.map(c => c.split(' ').pop())
    let filesEliminados = eliminados.map(c => c.split(' ').pop())

    let texto = '𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ACTUALIZADA ㅤ֢ㅤׄㅤׅ\n\n'

    texto += '𖣔 ʀᴇsᴜᴍᴇɴ ˚ʚ♡ɞ˚\n'
    texto += '❧ Hinata se ha renovado\n\n'

    if (filesCreados.length > 0) {
      texto += '𖣔 ɴᴜᴇᴠᴏs ᴀʀᴄʜɪᴠᴏs ˚ʚ♡ɞ˚\n'
      for (let file of filesCreados.slice(0, 15)) {
        texto += '❧ ' + file + '\n'
      }
      if (filesCreados.length > 15) {
        texto += '> y ' + (filesCreados.length - 15) + ' archivo(s) más\n'
      }
      texto += '\n'
    }

    let changedMatch = stdout.match(/(\d+) files? changed/)
    if (changedMatch) {
      texto += '𖣔 ᴀʀᴄʜɪᴠᴏs ᴍᴏᴅɪғɪᴄᴀᴅᴏs ˚ʚ♡ɞ˚\n'
      texto += '❧ ' + changedMatch[1] + ' archivo(s)\n\n'
    }

    if (filesEliminados.length > 0) {
      texto += '𖣔 ᴀʀᴄʜɪᴠᴏs ᴇʟɪᴍɪɴᴀᴅᴏs ˚ʚ♡ɞ˚\n'
      for (let file of filesEliminados.slice(0, 15)) {
        texto += '❧ ' + file + '\n'
      }
      if (filesEliminados.length > 15) {
        texto += '> y ' + (filesEliminados.length - 15) + ' archivo(s) más\n'
      }
      texto += '\n'
    }

    let summary = stdout.match(/\d+ files? changed, \d+ insertions?\(\+\), \d+ deletions?\(-\)/)
    if (summary) {
      let nums = summary[0].match(/\d+/g)
      texto += '𖣔 ᴄᴀᴍʙɪᴏs ᴅᴇ ᴄóᴅɪɢᴏ ˚ʚ♡ɞ˚\n'
      texto += '❧ +' + nums[1] + ' línea(s) agregada(s)\n'
      texto += '❧ -' + nums[2] + ' línea(s) eliminada(s)\n\n'
    }

    texto += '> Actualizado por @' + who.split('@')[0]

    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/b7a14a.png' },
      caption: texto,
      mentions: [who]
    }, { quoted: m })

    setTimeout(() => {
      console.log('[UPDATE] Reiniciando proceso para aplicar cambios...')
      process.exit(0)
    }, 3000)
  })
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = /^(update|actualizar)$/i
handler.desc = 'Actualiza Hinata a la última versión'
handler.owner = true

export default handler
