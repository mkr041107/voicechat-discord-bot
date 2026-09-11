import "dotenv/config";
import { REST, Routes } from "discord.js";
import { data as helpCommand } from "./commands/help.js";

const token = process.env.DISCORD_TOKEN?.trim();
const clientId = process.env.DISCORD_CLIENT_ID?.trim();
const rawGuildId = process.env.DISCORD_GUILD_ID?.trim().replace(/^["']|["']$/g, "");

if (!token || !clientId) {
  throw new Error(
    "Missing DISCORD_TOKEN or DISCORD_CLIENT_ID. Copy .env.example to .env and fill in your bot credentials.",
  );
}

function parseGuildId(value: string | undefined): string | undefined {
  if (!value || value === "your_server_id_here") return undefined;

  if (!/^\d{17,20}$/.test(value)) {
    throw new Error(
      `DISCORD_GUILD_ID looks invalid: "${value}". It must be a numeric server ID (17–20 digits) copied via Developer Mode → right-click server → Copy Server ID. Do not use a channel ID, user ID, or application ID.`,
    );
  }

  return value;
}

const guildId = parseGuildId(rawGuildId);

const rest = new REST({ version: "10" }).setToken(token);
const body = [helpCommand.toJSON()];

const route = guildId
  ? Routes.applicationGuildCommands(clientId, guildId)
  : Routes.applicationCommands(clientId);

try {
  await rest.put(route, { body });
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);

  if (guildId && /Unknown Guild|10004|Missing Access|50001/.test(message)) {
    throw new Error(
      `Discord rejected guild ID ${guildId}. Make sure:\n` +
        "• You copied the **Server ID** (right-click the server name), not a channel/user ID\n" +
        "• The bot is **invited to that server**\n" +
        "• DISCORD_CLIENT_ID matches the same application as DISCORD_TOKEN",
      { cause: error },
    );
  }

  throw error;
}

console.log(
  guildId
    ? `Registered /help for guild ${guildId} (should appear immediately in that server)`
    : `Registered /help globally (may take up to an hour). Set DISCORD_GUILD_ID in .env for instant guild registration.`,
);
