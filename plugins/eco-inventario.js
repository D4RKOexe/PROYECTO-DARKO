const handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]

  let txt = `
╭━━━〔 🌸 ELYSSIA INVENTORY 🌸 〕━━━⬣

👤 Usuario: @${m.sender.split('@')[0]}

╭─〔 🌷 PERFIL 〕
│ ⭐ Nivel: ${user.level || 1}
│ ✨ XP: ${user.exp || 0}
│ 💰 Coins: ${user.money || 0}
│ 💎 Gems: ${user.gems || 0}
╰────────────⬣

╭─〔 ⛏️ RECURSOS 〕
│ 🪨 Piedra: ${user.piedra || 0}
│ 🌲 Madera: ${user.madera || 0}
│ 🪵 Carbón: ${user.carbon || 0}
│ ⛓️ Hierro: ${user.hierro || 0}
╰────────────⬣

╭─〔 💎 MINERALES 〕
│ 🥈 Plata: ${user.plata || 0}
│ 🥇 Oro: ${user.oro || 0}
│ 💎 Diamante: ${user.diamante || 0}
│ ❤️ Rubí: ${user.rubi || 0}
│ 💚 Esmeralda: ${user.esmeralda || 0}
╰────────────⬣

╭─〔 🎒 OBJETOS 〕
│ 🎁 Cofres: ${user.cofre || 0}
│ 🗝️ Llaves: ${user.llave || 0}
│ 🧪 Pociones: ${user.pocion || 0}
│ 🍖 Comida: ${user.comida || 0}
╰────────────⬣

╭─〔 ⚔️ EQUIPO 〕
│ ⛏️ Pico: ${user.pico || 1}
│ 🗡️ Espada: ${user.espada || 0}
│ 🛡️ Armadura: ${user.armadura || 0}
╰────────────⬣

╭─〔 🐾 MASCOTAS 〕
│ 🐇 Mascota: ${user.pet || 'Ninguna'}
╰────────────⬣

🌸 "Los tesoros más valiosos son las aventuras vividas."
╰━━━━━━━━━━━━━━━━━━⬣
`

  await conn.sendMessage(
    m.chat,
    {
      text: txt,
      mentions: [m.sender]
    },
    { quoted: m }
  )
}

handler.help = ['inventario']
handler.tags = ['eco']
handler.command = ['inventario', 'inv', 'bag']

export default handler