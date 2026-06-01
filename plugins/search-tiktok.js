import axios from 'axios'
import fs from 'fs'
import path from 'path'

// 🌸 Configuración temporal de archivos
process.env.TMPDIR = path.join(process.cwd(), 'tmp')
if (!fs.existsSync(process.env.TMPDIR)) fs.mkdirSync(process.env.TMPDIR, { recursive: true })

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      return conn.reply(
        m.chat,
        `🐉 *ELYSSIA MD - TIKTOK SEARCH*\n\nEjemplo de uso: ${usedPrefix + command} Gohan beast edits`,
        m
      );
    }

    // 🌀 Reacción inicial
    await m.react('🌀');

    const inicio = new Date();

    const res = await ttks(text);
    const videos = res.data;

    if (!videos.length) {
      return conn.reply(m.chat, "⚠️ *ELYSSIA MD* No se encontraron videos Beast para esa búsqueda.", m);
    }

    // 🌸 Mensaje de cabecera
    const cap = `╭─〔 𝗧𝗶𝗸𝘁𝗼𝗸 • Elyssia MD 〕─⬣\n`
              + `│ 🐉 Título  : ${videos[0].title}\n`
              + `│ 🌀 Búsqueda: ${text}\n`
              + `╰─────────────⬣`;

    // 🌸 Preparar medios
    const medias = videos.map((video, index) => ({
      type: "video",
      data: { url: video.no_wm },
      caption: index === 0
        ? cap
        : `👤 Título  : ${video.title}\n🐉 Proceso: ${((new Date() - inicio))} ms`
    }));

    await conn.sendSylphy(m.chat, medias, { quoted: m });

    // ✅ Reacción final
    await m.react('✅');

  } catch (e) {
    return conn.reply(
      m.chat,
      `❌ *ELYSSIA MD - ERROR*\nOcurrió un problema al obtener los videos. La API Gohan falló:\n\n${e}`,
      m
    );
  }
};

handler.command = ["ttsesearch", "tiktoks", "ttrndm", "ttks", "tiktoksearch"];
handler.help = ["tiktoksearch"];
handler.tags = ["search"];
export default handler;

// 🌸 Función de búsqueda TikTok
async function ttks(query) {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://tikwm.com/api/feed/search',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'current_language=en',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
      },
      data: {
        keywords: query,
        count: 20,
        cursor: 0,
        HD: 1
      }
    });

    const videos = response.data.data.videos;
    if (!videos?.length) throw new Error("🐉 No se encontraron videos para esa búsqueda. ¡Desata todo tu poder!");

    // 🌸 Selección aleatoria de 5 videos
    const shuffled = videos.sort(() => 0.5 - Math.random()).slice(0, 5);

    return {
      status: true,
      creator: "Elyssia MD",
      data: shuffled.map(video => ({
        title: video.title,
        no_wm: video.play,
        watermark: video.wmplay,
        music: video.music
      }))
    };
  } catch (error) {
    throw error;
  }
}