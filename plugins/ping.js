const os = require("os");

let handler = async (m, { conn }) => {
  const start = Date.now();

  // Mensaje inicial
  const msg = await conn.sendMessage(m.chat, { text: "⏳ Midiendo velocidad y rendimiento..." }, { quoted: m });

  const latency = Date.now() - start;
  const uptime = process.uptime();

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
  };

  // Rendimiento
  const cpuUsage = os.loadavg()[0].toFixed(2); // carga promedio 1 min
  const ramUsage = ((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(0); // en MB

  // Emoji dinámico según latencia
  const speedEmoji = latency < 100 ? "🚀" : latency < 300 ? "⚡" : "🐢";

  await conn.sendMessage(m.chat, {
    text: `
╭━━〔 ⚡ ELYSSIA MD ULTRA PRO 〕━━╮
┃ 📡 Ping: ${latency} ms ${speedEmoji}
┃ ⏱ Uptime: ${formatTime(uptime)}
┃ 🖥 CPU load: ${cpuUsage}%
┃ 💾 RAM usada: ${ramUsage} MB
┃ 🤖 Motor: Baileys
┃ 🔥 Estado: Online
╰━━━━━━━━━━━━━━━━━━━━╯
`.trim()
  }, { quoted: m });
};

handler.command = /^ping|speed|latency$/i;
handler.tags = ['info'];
handler.help = ['ping'];

module.exports = handler;