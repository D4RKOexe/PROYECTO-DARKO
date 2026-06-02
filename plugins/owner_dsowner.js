import { promises as fs, existsSync } from 'fs'
import path from 'path'

const handler = async (m, { conn, isROwner }) => {
  if (!isROwner) return m.reply('❌ Solo el propietario de Elyssia MD puede usar este comando.');

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  const sessionPath = './Sessions/Principal/';

  // Mensaje inicial estilo Elyssia MD
  await m.reply(
    `╭━━━〔 🌸 ELYSSIA MD 〕━━━⬣
┃ 🧹 Iniciando limpieza de sesiones...
┃ 🔒 creds.json permanecerá seguro
╰━━━━━━━━━━━━━━⬣`
  );
  m.react('🕓');

  try {
    if (!existsSync(sessionPath)) {
      return conn.reply(m.chat, `⚠️ La carpeta de sesiones no existe o está vacía. Nada que limpiar.`, m);
    }

    const files = await fs.readdir(sessionPath);
    let deletedCount = 0;

    for (const file of files) {
      if (file !== 'creds.json') {
        await fs.unlink(path.join(sessionPath, file));
        deletedCount++;
        await delay(300); // efecto visual de limpieza
      }
    }

    // Mensajes finales estilo Elyssia MD
    if (deletedCount === 0) {
      await conn.reply(
        m.chat,
        `🌸 Elyssia MD revisó la carpeta: solo creds.json está presente, nada que eliminar.`,
        m
      );
    } else {
      m.react('🌀');
      await conn.reply(
        m.chat,
        `🌸 Elyssia MD ha limpiado correctamente ${deletedCount} archivo(s) de sesión.\n🔒 creds.json quedó intacto.`,
        m
      );
      await conn.reply(
        m.chat,
        `✨ Bot Elyssia MD limpio y listo para nuevas aventuras! 🌟`,
        m
      );
    }
  } catch (error) {
    console.error('❌ Error limpiando sesiones:', error);
    await conn.reply(
      m.chat,
      `⚠️ Ocurrió un error durante la limpieza de sesiones. Revisa la consola para más detalles.`,
      m
    );
  }
}

handler.help = ['dsowner'];
handler.tags = ['owner'];
handler.command = ['delai', 'dsowner', 'clearallsession'];
handler.rowner = true;

export default handler;