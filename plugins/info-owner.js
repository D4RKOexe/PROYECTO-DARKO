let handler = async (m, { conn }) => {
  const texto = `𑁍ࠬܓ ⁾ ㅤׄㅤׅㅤׄ HINATA BOT ㅤ֢ㅤׄㅤׅ

╭━━━〔 👑 *CREADORES* 〕━━⬣
┃
┃ 👑 *EL VIGILANTE* 🇭🇳
┃ ❀ Desarrollador Principal
┃ ❀ +591 77474230
┃ ❀ Hola soy de Honduras, creador de
┃   HINATA BOT. Me apasiona la tecnología
┃   y el anime. Hinata es mi waifu favorita.
┃ ❀ github.com/ElvigilanteDv
┃
┃ 👑 *BRAYANRK* 🇨🇴
┃ ❀ Desarrollador Principal
┃ ❀ +57 3223090406
┃ ❀ Estudiante de Ingeniería de Software,
┃   aprendiendo cada día sobre programación
┃   y nuevas tecnologías.
┃ ❀ github.com/BrayanRK
┃
╰━━━━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 🌸 *COMUNIDAD* 〕━━⬣
┃
┃ 💬 *Grupo Oficial*
┃ ❀ https://chat.whatsapp.com/EEppolIlNjGDZrmNyDERRr
┃
┃ 📦 *Repositorio*
┃ ❀ github.com/ElvigilanteDv/Hinata-Bot
┃
╰━━━━━━━━━━━━━━━━━━━━━━⬣

> Contáctanos si tienes dudas ♡`

  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/yp1tti.png' },
    caption: texto
  }, { quoted: m })
}

handler.help = ['owner']
handler.tags = ['info']
handler.command = /^(owner|creador|creadores|devs)$/i
handler.desc = 'Info de los creadores'

export default handler
