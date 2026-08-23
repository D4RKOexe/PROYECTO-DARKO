/**
 * Wrapper para compatibilidad de Baileys entre Anoni_bot y PROYECTO-DARKO
 * Proporciona funciones auxiliares específicas de Anoni_bot en ES Modules
 */

export const createAnoniSocketConfig = (version, logger) => {
  return {
    version: version,
    printQRInTerminal: false,
    logger,
    connectTimeoutMs: 60000,
    keepAliveIntervalMs: 30000,
  };
};

export const createAnoniAuthOptions = (state) => {
  return {
    auth: state,
    browser: ['DARKO BOT', 'Chrome', '1.0.0'],
  };
};

/**
 * Sistema de comandos compatible con Anoni_bot
 * Adaptado a la estructura de plugins de DARKO
 */
export class AnoniCommandManager {
  constructor() {
    this.commands = new Map();
  }

  register(commandNames, config) {
    if (typeof commandNames === 'string') {
      commandNames = [commandNames];
    }
    
    for (const name of commandNames) {
      this.commands.set(name.toLowerCase(), config);
    }
  }

  get(commandName) {
    return this.commands.get(commandName.toLowerCase());
  }

  getAll() {
    return Array.from(this.commands.values());
  }

  has(commandName) {
    return this.commands.has(commandName.toLowerCase());
  }

  size() {
    return this.commands.size;
  }
}

/**
 * Sistema de manejo de mensajes compatible
 */
export const parseMessageFromAnoni = (msg) => {
  if (!msg) return null;
  
  const message = msg.message || {};
  return {
    text: message.conversation || 
          message.extendedTextMessage?.text || 
          message.imageMessage?.caption || 
          message.videoMessage?.caption || 
          '',
    from: msg.key?.remoteJid,
    fromMe: msg.key?.fromMe,
    id: msg.key?.id,
    quoted: msg.message?.extendedTextMessage?.contextInfo?.quotedMessage,
    type: message.imageMessage ? 'image' : 
          message.videoMessage ? 'video' : 
          message.audioMessage ? 'audio' :
          message.documentMessage ? 'document' : 'text'
  };
};

/**
 * Validaciones de permisos compatibles
 */
export const validateOwner = (sender, ownerNumber) => {
  const cleanSender = String(sender || '').replace(/\D/g, '');
  const cleanOwner = String(ownerNumber || '').replace(/\D/g, '');
  return cleanSender === cleanOwner;
};

/**
 * Sistema de logging compatible con Anoni
 */
export class AnoniLogger {
  constructor(prefix = '[Anoni-Features]') {
    this.prefix = prefix;
  }

  info(text) {
    console.log(`${this.prefix} ℹ️ ${text}`);
  }

  warn(text) {
    console.warn(`${this.prefix} ⚠️ ${text}`);
  }

  error(text, error) {
    if (error) {
      console.error(`${this.prefix} ❌ ${text}`, error);
    } else {
      console.error(`${this.prefix} ❌ ${text}`);
    }
  }

  success(text) {
    console.log(`${this.prefix} ✅ ${text}`);
  }
}

export default {
  createAnoniSocketConfig,
  createAnoniAuthOptions,
  AnoniCommandManager,
  parseMessageFromAnoni,
  validateOwner,
  AnoniLogger
};
