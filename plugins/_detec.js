import { spawn } from 'child_process'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

const handler = async (m, { conn }) => {
  // Solo funciona como detector automático, no tiene comando
}

handler.before = async (m, { conn }) => {
  if (m.fromMe) return false
  const text = m.text?.trim().toLowerCase() || ''
  if (text !== 'hola') return false

  const audioUrl = 'https://files.catbox.moe/83v5ip.mp3'
  const tmpDir = path.join(process.cwd(), 'tmp')
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true })

  const inFile = path.join(tmpDir, `hola_${Date.now()}.mp3`)
  const outFile = path.join(tmpDir, `hola_${Date.now()}.ogg`)

  try {
    const res = await fetch(audioUrl)
    if (!res.ok) throw new Error('No se pudo descargar el audio')
    fs.writeFileSync(inFile, Buffer.from(await res.arrayBuffer()))

    await new Promise((resolve, reject) => {
      const ff = spawn('ffmpeg', [
        '-y', '-i', inFile,
        '-c:a', 'libopus', '-b:a', '32k',
        '-vbr', 'on', '-compression_level', '10',
        '-frame_duration', '20', '-application', 'voip',
        outFile
      ], { stdio: ['ignore', 'ignore', 'pipe'] })
      ff.on('close', code => code === 0 ? resolve() : reject(new Error('ffmpeg error')))
      ff.on('error', reject)
    })

    await conn.sendMessage(m.chat, {
      audio: fs.readFileSync(outFile),
      mimetype: 'audio/ogg',
      ptt: true
    }, { quoted: m })

    return true
  } catch (e) {
    console.error('[HOLA DETECTOR]', e.message)
    return false
  } finally {
    try { fs.unlinkSync(inFile) } catch {}
    try { fs.unlinkSync(outFile) } catch {}
  }
}

export default handler