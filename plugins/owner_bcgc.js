const handler = async (m, { conn, isROwner, text }) => {
  if (!isROwner) return m.reply('❌ Solo el dueño puede usar esta función.');

  const delay = (min, max) =>
    new Promise((res) => setTimeout(res, Math.floor(Math.random() * (max - min + 1)) + min));

  const getGroups = await conn.groupFetchAllParticipating();
  const groups = Object.entries(getGroups).map(([id, data]) => data.id);

  const mensaje = m.quoted?.text || text;
  if (!mensaje) throw '⚡ No se detectó ningún contenido para transmitir.';

  let enviados = 0;

  // Mensaje inicial con estilo Elyssia MD
  await m.reply(
    `╭━━━〔 ELYSSIA MD 〕━━━⬣
┃ 📡 Iniciando transmisión global...
┃ 🎯 Grupos detectados: ${groups.length}
╰━━━━━━━━━━━━━━⬣`
  );

  for (const id of groups) {
    try {
      await conn.sendMessage(
        id,
        {
          text: `╭━━━〔 📢 ELYSSIA MD 〕━━━⬣
┃ ✨ Comunicado Oficial
╰━━━━━━━━━━━━━━⬣

${mensaje}

╭━━━━━━━━━━━━━━⬣
┃ 🤖 Enviado mediante Elyssia MD
╰━━━━━━━━━━━━━━⬣`,
        },
        { quoted: m }
      );
      enviados++;
      await delay(800, 1500); // retraso aleatorio entre envíos
    } catch {
      // Ignora errores de grupos cerrados o bloqueados
    }
  }

  // Mensaje final con estilo Elyssia MD
  await m.reply(
    `╭━━━〔 ELYSSIA MD 〕━━━⬣
┃ ✅ Transmisión completada
┃ 📨 Entregado en ${enviados} grupos
┃ ✨ Proceso finalizado con éxito
╰━━━━━━━━━━━━━━⬣`
  );
};

handler.help = ['broadcastgroup', 'bcgc'];
handler.tags = ['owner'];
handler.command = ['bcgc'];
handler.rowner = true;

export default handler;