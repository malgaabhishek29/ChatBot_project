# Discord Chatbot Project — README

This repository contains a simple **Discord Chatbot** built using **Node.js** and **discord.js**. The bot listens for slash commands or messages in a Discord server and responds intelligently. This README explains the **folder structure**, **how to set up the environment**, and **how to run and extend the bot**.

---

## Project Structure

```
ChatBot_project/
├── .gitignore              # Files and folders ignored by Git
├── index.js                # Main entry point of the Discord bot
├── package.json            # Project dependencies and scripts
├── package-lock.json       # Dependency lock file (auto-generated)
├── register-commands.js    # Script to register slash commands with Discord
└── README.md               # Project documentation (this file)
```

### File Descriptions

* **index.js** — Initializes the Discord bot client, loads environment variables, and defines how the bot reacts to messages/events.
* **register-commands.js** — Registers the bot’s slash commands with Discord using your Application ID and Token.
* **package.json** — Lists required npm packages like `discord.js` and defines project scripts.
* **.gitignore** — Prevents node_modules and sensitive files (like `.env`) from being pushed to GitHub.

---

## Requirements

Before running the bot, make sure you have:

* **Node.js** version 18 or higher → [Download Node.js](https://nodejs.org/)
* A **Discord Bot Token** → From the [Discord Developer Portal](https://discord.com/developers/applications)
* **npm** (comes with Node.js)

---

## Setup Environment Variables

1. Create a file named `.env` in the project root.
2. Add the following lines:

   ```bash
   DISCORD_TOKEN=your-bot-token-here
   CLIENT_ID=your-app-client-id-here
   GUILD_ID=your-discord-server-id-here   # Optional: for local testing
   ```

---

## How to Run the Bot Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/<your-username>/ChatBot_project.git
   cd ChatBot_project
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Register slash commands (one time):**

   ```bash
   node register-commands.js
   ```

4. **Start the bot:**

   ```bash
   node index.js
   ```

5. You should see a message in the terminal:

   ```
   Bot is online!
   ```

6. In your Discord server, type a slash command or message as per your logic in `index.js` to see it respond.

---

## How It Works

1. `index.js` connects to the **Discord Gateway** using your bot token.
2. It listens for events such as:

   * `ready` → confirms the bot is online.
   * `interactionCreate` → handles slash commands.
   * `messageCreate` → responds to normal chat messages.
3. The `register-commands.js` script pushes command definitions to Discord so users can use them in chat.

---

## Example Code (index.js)

```js
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
  console.log(`✅ Bot logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.content.toLowerCase() === 'hello') {
    await message.reply('Hey there! 🤖 I am your friendly chatbot.');
  }
});

client.login(process.env.DISCORD_TOKEN);
```

---

## Example Command Registration (register-commands.js)

```js
const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!'
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
```

---

## Deployment (Optional)

You can deploy the bot to platforms like:

* [**Render**](https://render.com)
* [**Railway**](https://railway.app)

**Steps:**

1. Push your code to GitHub.
2. Connect your GitHub repo to Render/Railway.
3. Add the `.env` variables inside the platform’s “Environment Variables” section.
4. Set the **Start Command**:

   ```bash
   node index.js
   ```
5. Deploy and verify logs.

---

## Troubleshooting

| Issue                        | Fix                                                                         |
| ---------------------------- | --------------------------------------------------------------------------- |
| Bot not responding           | Check that `MESSAGE CONTENT INTENT` is enabled in Discord Developer Portal. |
| Invalid token error          | Regenerate your bot token and update `.env`.                                |
| Slash commands not appearing | Rerun `node register-commands.js`.                                          |

---

## License

You may use or modify this bot freely under the **MIT License**.

---

## Quick Commands Summary

| Command                     | Action                              |
| --------------------------- | ----------------------------------- |
| `node register-commands.js` | Registers your bot’s slash commands |
| `node index.js`             | Starts the bot                      |
| `npm install`               | Installs all required packages      |

---

**Author:** [Abhishek Malga](https://github.com/malgaabhishek29)
**Project:** Discord ChatGPT Bot
