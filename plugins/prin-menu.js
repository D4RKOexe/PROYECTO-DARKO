import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

const charset = { a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ꜰ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'ꜱ',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ' }
const textCyberpunk = t => t.replace(/[a-z]/gi, c => charset[c.toLowerCase()] || c)

const defaultMenu = {
  before: `
࿇ ══━━━✥◈✥━━━══ ࿇
    ĐªŘĶØ BØŤ
࿇ ══━━━✥◈✥━━━══ ࿇

𖣔 ɪɴꜰᴏ ˚ʚ♡ɞ˚
👤 Usuario
> %name
✨ Experiencia
> %exp / %maxexp
👻 Modo
> %mode
💯 Activo
> %muptime
✅ Registrados
> %totalreg

⛓ ᴇɴʟᴀᴄᴇs ˚ʚ♡ɞ˚
❧ API
> https://elvigilante-api.onrender.com/dash

%readmore
`.trim(),
  header: '\n𖣔 %category ˚ʚ♡ɞ˚',
  body: '❧ %cmd',
  footer: '⸻⸻⸻⸻⸻⸻',
  after: '\n࿇ ══━━━✥◈✥━━━══ ࿇\n   𝕳𝖎𝖓𝖆𝖙𝖆 𝕭𝖔𝖙\n࿇ ══━━━✥◈✥━━━══ ࿇\n\n𖣔 ᴄʀᴇᴀᴅᴏʀᴇs D4RKO\n'
}

const menuDir = './media/menu'
fs.mkdirSync(menuDir, { recursive: true })

const getMenuMediaFile = jid =>
  path.join(menuDir, `menuMedia_${jid.replace(/[:@.]/g, '_')}.json`)

const loadMenuMedia = jid => {
  try {
    return JSON.parse(fs.readFileSync(getMenuMediaFile(jid)))
  } catch { return {} }
}

const fetchBuffer = url => fetch(url).then(r => r.arrayBuffer()).then(b => Buffer.from(b))

const defaultThumb = await fetchBuffer('https://files.catbox.moe/mln8cc.png')

let handler = async (m, { conn, usedPrefix }) => {
  await conn.sendMessage(m.chat, { react: { text: '❧', key: m.key } })

  const botJid = conn.user.jid
  const menuMedia = loadMenuMedia(botJid)
  const menu = global.subBotMenus?.[botJid] || defaultMenu

  const user = global.db.data.users[m.sender] || { level: 0, exp: 0 }
  const { min, xp } = xpRange(user.level, global.multiplier)

  const replace = {
    name: await conn.getName(m.sender),
    level: user.level,
    exp: user.exp - min,
    maxexp: xp,
    totalreg: Object.keys(global.db.data.users).length,
    mode: global.opts.self ? 'Privado' : 'Público',
    muptime: clockString(process.uptime() * 1000),
    readmore: String.fromCharCode(8206).repeat(4001)
  }

  const plugins = Object.values(global.plugins || {}).filter(p => !p.disabled)

  const help = plugins.map(p => ({
    help: [].concat(p.help || []),
    tags: [].concat(p.tags || []),
    prefix: 'customPrefix' in p,
    desc: p.desc || ''
  }))

  const tags = {}
  help.forEach(({ tags: tg }) =>
    tg.forEach(t => t && !tags[t] && (tags[t] = textCyberpunk(t)))
  )

  const text = [
    menu.before,
    ...Object.keys(tags).map(tag => {
      const cmds = help
        .filter(p => p.tags.includes(tag))
        .flatMap(p => p.help.map(c =>
          menu.body.replace('%cmd', p.prefix ? c : usedPrefix + c) +
          (p.desc ? `\n> ${p.desc}` : '')
        )).join('\n')
      return cmds ? `${menu.header.replace('%category', tags[tag])}\n${cmds}\n${menu.footer}` : ''
    }).filter(Boolean),
    menu.after
  ].join('\n').replace(/%(\w+)/g, (_, k) => replace[k] ?? '')

  const thumb = menuMedia.thumbnail && fs.existsSync(menuMedia.thumbnail)
    ? fs.readFileSync(menuMedia.thumbnail)
    : defaultThumb

  await conn.sendMessage(m.chat, {
    image: thumb,
    caption: text,
    footer: 'DARKO SYSTEM',
    headerType: 4
  })
}

handler.help = ['menu', 'menú']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'ayuda']
handler.desc = 'muestra el menu'
handler.register = false

export default handler

const clockString = ms =>
  [3600000, 60000, 1000].map((v, i) =>
    String(Math.floor(ms / v) % (i ? 60 : 99)).padStart(2, '0')
  ).join(':')
