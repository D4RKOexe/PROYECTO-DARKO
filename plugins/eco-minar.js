const cooldown = 60000 // 1 min

const handler = async (m, { conn }) => {

  let user = global.db.data.users[m.sender]

  if (Date.now() - (user.lastmining || 0) < cooldown)
    return m.reply("🌸 Espera un poco antes de minar otra vez...")

  let items = [
    { name: "🪨 Piedra", value: "piedra", min: 1, max: 8 },
    { name: "⛓️ Hierro", value: "hierro", min: 1, max: 5 },
    { name: "🥈 Plata", value: "plata", min: 1, max: 3 },
    { name: "🥇 Oro", value: "oro", min: 1, max: 2 },
    { name: "💎 Diamante", value: "diamond", min: 1, max: 1 }
  ]

  let item = items[Math.floor(Math.random() * items.length)]
  let amount = Math.floor(Math.random() * (item.max - item.min + 1)) + item.min

  user[item.value] = (user[item.value] || 0) + amount

  let xp = Math.floor(Math.random() * 50) + 10
  let coins = Math.floor(Math.random() * 100) + 20

  user.exp += xp
  user.coin += coins
  user.lastmining = Date.now()

  let txt = `
🌸 MINA ELYSSIA 🌸

⛏️ Encontraste:
➤ ${item.name} x${amount}

✨ XP +${xp}
🪙 Coins +${coins}

💖 Sigue minando para más tesoros
`

  conn.reply(m.chat, txt, m)
}

handler.command = /^(minar|mine)$/i
handler.tags = ['eco']
handler.help = ['minar']

export default handler