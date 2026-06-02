const handler = async (m, { conn }) => {

  let user = global.db.data.users[m.sender]
  const cooldown = 5 * 60 * 1000 // 5 minutos
  if (Date.now() - (user.lastCofre || 0) < cooldown)
    return m.reply(`🌸 Espera un poco antes de abrir otro cofre...`)

  const cofres = [
    {
      name: "Cofre Común 🟫",
      chance: 60,
      rewards: [
        { type: "coin", min: 20, max: 50 },
        { type: "piedra", min: 1, max: 3 }
      ]
    },
    {
      name: "Cofre Raro 🟦",
      chance: 30,
      rewards: [
        { type: "coin", min: 50, max: 100 },
        { type: "hierro", min: 1, max: 3 },
        { type: "diamond", min: 1, max: 2 }
      ]
    },
    {
      name: "Cofre Legendario 🟪",
      chance: 10,
      rewards: [
        { type: "coin", min: 100, max: 300 },
        { type: "diamond", min: 2, max: 5 },
        { type: "oro", min: 1, max: 3 },
        { type: "vida", min: 20, max: 50 }
      ]
    }
  ]

  const rand = Math.random() * 100
  let acumulado = 0
  let cofre
  for (let c of cofres) {
    acumulado += c.chance
    if (rand <= acumulado) {
      cofre = c
      break
    }
  }

  let rewardsText = ''
  for (let r of cofre.rewards) {
    const amount = Math.floor(Math.random() * (r.max - r.min + 1)) + r.min
    if (r.type === "coin") user.coin += amount
    else if (r.type === "diamond") user.diamond += amount
    else if (r.type === "piedra") user.piedra = (user.piedra || 0) + amount
    else if (r.type === "hierro") user.hierro = (user.hierro || 0) + amount
    else if (r.type === "oro") user.oro = (user.oro || 0) + amount
    else if (r.type === "vida") user.health = Math.min(user.health + amount, 100)

    rewardsText += `➤ ${r.type.charAt(0).toUpperCase() + r.type.slice(1)} x${amount}\n`
  }

  user.lastCofre = Date.now()

  const txt = `
🌸 ¡Abriste un ${cofre.name}! 🌸

🎁 Recompensas:
${rewardsText}

⏳ Próximo cofre disponible en 5 minutos
`
  conn.sendMessage(m.chat, { text: txt, mentions: [m.sender] }, { quoted: m })
}

handler.command = /^(cofre|openchest|treasure)$/i
handler.tags = ['eco']
handler.help = ['cofre']

export default handler