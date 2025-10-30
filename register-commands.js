require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {
  console.error('Missing DISCORD_TOKEN or CLIENT_ID or GUILD_ID in .env');
  process.exit(1);
}

// Define commands
const commands = [
  new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Ask ChatGPT')
    .addStringOption(opt =>
      opt.setName('prompt')
        .setDescription('What should I answer?')
        .setRequired(true)
    )
    .toJSON(),
  new SlashCommandBuilder()
    .setName('reset')
    .setDescription('Reset your conversation memory')
    .toJSON(),
];

(async () => {
  try {
    const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);
    console.log('Refreshing guild (dev) commands…');
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log('✅ Slash commands registered to guild.');
  } catch (e) {
    console.error('Failed to register commands:', e);
    process.exit(1);
  }
})();
