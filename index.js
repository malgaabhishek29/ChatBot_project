const BAD_WORDS = [/http[s]?:\/\//i]; // example: block links
function isSafe(text) {
  if (text.length > 2000) return false;
  return !BAD_WORDS.some(rx => rx.test(text));
}
require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');
const OpenAI = require('openai');
const pino = require('pino');

// ---- ENV & clients ----
const log = pino({ level: process.env.LOG_LEVEL || 'info' });
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!DISCORD_TOKEN || !OPENAI_API_KEY) {
  log.error('Missing DISCORD_TOKEN or OPENAI_API_KEY in .env');
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// ---- Simple per-user memory ----
// { userId: [ { role: 'user'|'assistant'|'system', content: '...' }, ... ] }
const memory = new Map();

// Add/trim history per user (keep it lean)
function addToHistory(userId, role, content) {
  const maxTurns = 6; // user+assistant pairs (tune)
  const maxChars = 4000;

  const arr = memory.get(userId) || [];
  arr.push({ role, content });

  // Trim by length
  let total = arr.reduce((n, m) => n + m.content.length, 0);
  while (total > maxChars || arr.length > maxTurns * 2) {
    const removed = arr.shift();
    total -= removed.content.length;
  }
  memory.set(userId, arr);
}

client.once(Events.ClientReady, () => {
  log.info({ bot: client.user.tag, id: client.user.id }, 'Bot online');
});

// Handle slash commands
client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'reset') {
      memory.delete(interaction.user.id);
      return interaction.reply({ content: '🗑️ Conversation reset.', ephemeral: true });
    }

    if (interaction.commandName === 'chat') {
      const prompt = interaction.options.getString('prompt', true);

      // Acknowledge quickly (ephemeral while thinking)
      await interaction.deferReply();

      // Build message array with a system primer + memory
      const history = memory.get(interaction.user.id) || [];
      const messages = [
        { role: 'system', content: 'You are a helpful, concise assistant chatting on Discord.' },
        ...history,
        { role: 'user', content: prompt },
      ];
if (!isSafe(prompt)) {
  return interaction.editReply('⚠️ That prompt is not allowed or is too long.');
}
      // Call OpenAI
      let completion;
      try {
        completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages,
          max_tokens: 700,
        });
      } catch (err) {
        log.error({ err }, 'OpenAI error');
        return interaction.editReply('❌ I had trouble reaching the AI service. Try again.');
      }

      const answer = completion?.choices?.[0]?.message?.content?.trim() ||
        "I couldn't generate a response.";

      // Update memory
      addToHistory(interaction.user.id, 'user', prompt);
      addToHistory(interaction.user.id, 'assistant', answer);

      return interaction.editReply(answer);
    }
  } catch (err) {
    log.error({ err }, 'Handler error');
    if (interaction.deferred || interaction.replied) {
      return interaction.editReply('Sorry, something went wrong.');
    } else {
      return interaction.reply({ content: 'Sorry, something went wrong.', ephemeral: true });
    }
  }
});

client.login(DISCORD_TOKEN);
