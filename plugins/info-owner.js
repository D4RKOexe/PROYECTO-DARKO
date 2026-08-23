let handler = async (m, { conn }) => {
  const texto = `𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ DARKO BOT ㅤ֢ㅤׄㅤׅ

╭━━━〔 👑 *CREADOR* 〕━━⬣
┃
┃ 👑 *DARKO.exe/Gxrcix* 🇵🇪
┃ ❀ creador
┃ ❀ +591 77474230
┃ ❀ Hola soy de Peru, creador de
┃   DARKO BOT. Me apasiona la tecnología
┃   y los programas.
╰━━━━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 🌸 *REPO* 〕━━
┃
┃ 📦 *Repositorio*
┃ ❀ ingcognito🤫
┃
╰━━━━━━━━━━━━━━━━━━━━━━⬣

> Contáctanos si tienes dudas `

  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/7ktyoa.jpg' },
    caption: texto
  }, { quoted: m })
}

handler.help = ['owner']
handler.tags = ['info']
handler.command = /^(owner|creador|creadores|devs)$/i
handler.desc = 'Info de los creadores'

export default handler
