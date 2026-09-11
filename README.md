# Simple Voice Chat Discord Bot

A Discord bot that helps users install and configure the [Simple Voice Chat](https://modrepo.de/minecraft/voicechat/wiki/installation) mod/plugin. Run `/help` to get an embed with buttons for each setup guide.

## Features

- **`/help`** — Shows an overview embed with three interactive buttons:
  - **Install — Loaders** — Fabric, NeoForge, Forge, and Quilt mod installation
  - **Install — Server Plugins** — Bukkit/Spigot/Paper and Velocity/BungeeCord/Waterfall proxy plugins
  - **Client Setup** — Microphone, speakers, push-to-talk, and voice activation (v2.5.2+)
- Button responses are **ephemeral** (only visible to the person who clicked).

Content is sourced from the official Simple Voice Chat wiki.

## Setup

### 1. Create a Discord application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications) and create an application.
2. Open **Bot** → **Reset Token** and copy the token.
3. Copy the **Application ID** from **General Information**.
4. Under **Bot**, enable **Message Content Intent** is *not* required for this bot (slash commands only).
5. Invite the bot to your server with the `applications.commands` scope:
   ```
   https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=0&scope=bot%20applications.commands
   ```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

| Variable | Required | Description |
|----------|----------|-------------|
| `DISCORD_TOKEN` | Yes | Bot token from the Developer Portal |
| `DISCORD_CLIENT_ID` | Yes | Application ID |
| `DISCORD_GUILD_ID` | No | Server ID for instant command registration during development |

### 3. Install, register commands, and run

```bash
npm install
npm run deploy-commands   # register /help (instant if DISCORD_GUILD_ID is set)
npm run dev
```

For production:

```bash
npm run build
npm run deploy-commands
npm start
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run the bot with hot reload via `tsx` |
| `npm run deploy-commands` | Register slash commands via REST (run separately from the bot) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled bot |

## Project structure

```
src/
  client.ts              — Extended Client with command Collection
  content.ts             — Wiki guide text (mirrors voicechat-setup.html)
  commands/help.ts       — /help slash command, embed, and buttons
  events/
    ready.ts             — Login confirmation
    interactionCreate.ts — Slash commands and button handlers
  deploy-commands.ts     — Standalone command registration script
  index.ts               — Entry point — load events, login
```

Built with the [discord-skill](https://github.com/ItsChakal/discord-skill) patterns (discord.js v14).

## Bot hosting (FadeHost, Bot-Hosting.net, etc.)

Set these **environment variables** on the host:

| Variable | Required |
|----------|----------|
| `DISCORD_TOKEN` | Yes |
| `DISCORD_CLIENT_ID` | Yes |
| `DISCORD_GUILD_ID` | No |

**Start command:** `npm start` (default)

If the host skips the TypeScript build and `dist/` is missing, use this start command instead:

```bash
npm run start:ts
```

After the first deploy, run **`npm run deploy-commands` once** in the host console to register `/help`.
