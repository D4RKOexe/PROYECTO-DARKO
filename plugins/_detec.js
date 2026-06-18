import { spawn } from 'child_process'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

const audios = {
  'Hola': 'https://files.catbox.moe/mz46rb.mp3',
  'Adios': 'https://files.catbox.moe/ru75hf.mp3',
  'Jaja': 'https://files.catbox.moe/t2c3hw.mp3',
  'Buenos dias': 'https://files.catbox.moe/u0iry4.mp3',
  'Buenas noches': 'https://files.catbox.moe/wwul7x.mp3',
  'reportense': 'https://files.catbox.moe/dnsq3y.mp3'
}

let handler = async (m, { conn }) => {

}

handler.all = async function (m) {
  if (m.fromMe) return
  if (!m.text) return

  let textoOriginal = m.text.trim().toLowerCase()
  let textoCapitalizado = textoOriginal.charAt(0).toUpperCase() + textoOriginal.slice(1)

  let audioUrl = audios[textoCapitalizado]
  if (!audioUrl) return

  let conn = this

  let tmpDir = path.join(process.cwd(), 'tmp')
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true })

  let inFile = path.join(tmpDir, `audio_${Date.now()}.mp3`)
  let outFile = path.join(tmpDir, `audio_${Date.now()}.ogg`)

  try {
    let res = await fetch(audioUrl)
    if (!res.ok) {
      console.log('[DETECTOR AUDIO] Error descargando audio:', res.status)
      return
    }

    let buffer = Buffer.from(await res.arrayBuffer())
    fs.writeFileSync(inFile, buffer)

    await new Promise((resolve, reject) => {
      let ff = spawn('ffmpeg', [
        '-y', '-i', inFile,
        '-c:a', 'libopus', '-b:a', '32k',
        '-vbr', 'on', '-compression_level', '10',
        '-frame_duration', '20', '-application', 'voip',
        outFile
      ], { stdio: ['ignore', 'ignore', 'pipe'] })

      ff.stderr.on('data', (data) => {
        console.log('[FFMPEG]', data.toString())
      })

      ff.on('close', code => {
        if (code === 0) resolve()
        else reject(new Error('ffmpeg salió con código ' + code))
      })

      ff.on('error', reject)
    })

    await conn.sendMessage(m.chat, {
      audio: fs.readFileSync(outFile),
      mimetype: 'audio/ogg; codecs=opus',
      ptt: true
    }, { quoted: m })

  } catch (e) {
    console.error('[DETECTOR AUDIO] Error:', e.message)
  } finally {
    try { fs.unlinkSync(inFile) } catch {}
    try { fs.unlinkSync(outFile) } catch {}
  }
}

handler.command = []
handler.tags = ['tools']

export default handler
