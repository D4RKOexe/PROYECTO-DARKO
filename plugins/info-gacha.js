import fs from 'fs'
import path from 'path'

let handler = async (m, { conn }) => {
  let who = m.sender
  let user = global.db.data.users[who]
  if (!user) user = { inventory: [], inventory2: [] }

  let gachaPath = path.join(process.cwd(), 'gacha.json')
  let totalGacha = 0
  if (fs.existsSync(gachaPath)) {
    totalGacha = JSON.parse(fs.readFileSync(gachaPath, 'utf8')).length
  }

  let inv1 = user.inventory?.length || 0
  let inv2 = user.inventory2?.length || 0

  let texto = '❀ HINATA INFO GACHA ❀\n\n'
  texto += 'Colección 1: ' + inv1 + '/' + totalGacha + ' personajes\n'
  texto += 'Colección 2: ' + inv2 + ' personajes\n'
  texto += 'Total personajes únicos: ' + totalGacha + '\n\n'
  texto += '> Usa #coleccion para ver tu progreso\n> #rw y #rw2 para conseguir más'

  await conn.sendMessage(m.chat, { text: texto }, { quoted: m })
}

handler.help = ['infogacha']
handler.tags = ['gacha']
handler.command = /^(infogacha)$/i
handler.desc = 'Estadísticas de gacha'

export default handler