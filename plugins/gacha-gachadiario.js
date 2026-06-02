const handler = async (m, { conn, args }) => {

  let user = global.db.data.users[m.sender]
  const cooldown = 1000 * 60 * 60 * 24 // 24 horas

  if (!user.lastGacha) user.lastGacha = 0

  if (Date.now() - user.lastGacha < cooldown) {
    let restante = cooldown - (Date.now() - user.lastGacha)
    let horas = Math.floor(restante / 1000 / 60 / 60)
    let minutos = Math.floor((restante / 1000 / 60) % 60)
    return m.reply(`⏳ Ya tiraste tu Gacha diario hoy.\nVuelve en ${horas}h ${minutos}m.`)
  }

  user.lastGacha = Date.now()

  // Premios diarios
  const premios = [
    { name: '🌸 Sticker Elyssia', type: 'sticker', chance: 50 },
    { name: '💎 Diamante', type: 'diamond', amount: 2, chance: 25 },
    { name: '🪙 Coins', type: 'coin', amount: 100, chance: 15 },
    { name: '🔥 Item raro', type: 'item', chance: 7 },
    { name: '👑 Elyssia Legendaria', type: 'legend', chance: 3 }
  ]

  const rand = Math.random() * 100
  let acumulado = 0
  let premio
  for (let p of premios) {
    acumulado += p.chance
    if (rand <= acumulado) {
      premio = p
      break
    }
  }

  let textoPremio = ''
  switch (premio.type) {
    case 'diamond':
      user.diamond += premio.amount
      textoPremio = `💎 Ganaste ${premio.amount} Diamante(s) en tu Gacha diario!`
      break
    case 'coin':
      user.coin += premio.amount
      textoPremio = `🪙 Ganaste ${premio.amount} Coins en tu Gacha diario!`
      break
    case 'sticker':
      user.stickers = (user.stickers || 0) + 1
      textoPremio = `🌸 Ganaste un Sticker Elyssia en tu Gacha diario!`
      break
    case 'item':
      user.items = (user.items || [])
      user.items.push('🔥 Item raro')
      textoPremio = `🔥 Ganaste un Item Raro en tu Gacha diario!`
      break
    case 'legend':
      user.legend = (user.legend || [])
      user.legend.push('👑 Elyssia Legendaria')
      textoPremio = `👑 Ganaste la Elyssia Legendaria en tu Gacha diario!`
      break
  }

  await conn.sendMessage(m.chat, {
    text: `🎲 **GACHA DIARIO ELYSSIA**\n\n${textoPremio}\n\n💖 Coins actuales: ${user.coin}`
  }, { quoted: m })

}

handler.help = ['gachadiario', 'gacha-bonus']
handler.tags = ['gacha']
handler.command = /^(gachadiario|gacha-bonus)$/i

export default handler