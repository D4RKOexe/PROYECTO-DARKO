let handler = async (m, { conn, text, mentionedJid }) => {
  let who = mentionedJid && mentionedJid[0] ? mentionedJid[0] : m.sender

  let porcentaje = Math.floor(Math.random() * 101)

  let nivel, emoji, descripcion

  if (porcentaje >= 90) {
    nivel = 'LESBIANA SUPREMA'
    emoji = '🌈👑'
    descripcion = 'Eres la reina indiscutible, todas caen ante ti'
  } else if (porcentaje >= 75) {
    nivel = 'LESBIANA CERTIFICADA'
    emoji = '🌈🎖️'
    descripcion = 'No hay duda alguna, el arcoíris te pertenece'
  } else if (porcentaje >= 60) {
    nivel = 'LESBIANA CONFIRMADA'
    emoji = '🌸💜'
    descripcion = 'Lo sabes, yo lo sé, todos lo saben'
  } else if (porcentaje >= 45) {
    nivel = 'SEMI LESBIANA'
    emoji = '🌸🤔'
    descripcion = 'Estás en el camino, solo falta un empujoncito'
  } else if (porcentaje >= 30) {
    nivel = 'LESBIANA EN CONSTRUCCIÓN'
    emoji = '🚧🌸'
    descripcion = 'Algo hay ahí dentro, sigue explorando'
  } else if (porcentaje >= 15) {
    nivel = 'CASI NADA'
    emoji = '😐🍃'
    descripcion = 'Hay una chispa pero muy muy pequeña'
  } else {
    nivel = 'HETEROSEXUAL TOTAL'
    emoji = '💀😭'
    descripcion = 'Cero, nada, vacío total... qué aburrido'
  }

  let barra = ''
  let llenas = Math.floor(porcentaje / 10)
  for (let i = 0; i < 10; i++) {
    barra += i < llenas ? '🟣' : '⬜'
  }

  let texto = '࿇ ══━━━✥◈✥━━━══ ࿇\n'
  texto += ' 𝕸𝖊𝖉𝖎𝖉𝖔𝖗 𝕷𝖊𝖘𝖇𝖎𝖆𝖓𝖆\n'
  texto += '࿇ ══━━━✥◈✥━━━══ ࿇\n\n'
  texto += '👤 » @' + who.split('@')[0] + '\n\n'
  texto += barra + '\n'
  texto += '🌈 » ' + porcentaje + '%\n'
  texto += emoji + ' » ' + nivel + '\n'
  texto += '❧ » ' + descripcion + '\n\n'
  texto += '࿇ ══━━━✥◈✥━━━══ ࿇'

  await conn.sendMessage(m.chat, {
    text: texto,
    mentions: [who]
  }, { quoted: m })
}

handler.help = ['lesbiana']
handler.tags = ['diversion']
handler.command = /^(lesbiana|lesbian|lesbi)$/i
handler.desc = 'Mide tu nivel lesbiana'

export default handler