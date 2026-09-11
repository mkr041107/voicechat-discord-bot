import "dotenv/config";
import { REST, Routes } from "discord.js";
import { data as helpCommand } from "./commands/help.js";

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;

if (!token || !clientId) {
  throw new Error(
    "Missing DISCORD_TOKEN or DISCORD_CLIENT_ID. Copy .env.example to .env and fill in your bot credentials.",
  );
}

const rest = new REST({ version: "10" }).setToken(token);
const body = [helpCommand.toJSON()];

const route = guildId
  ? Routes.applicationGuildCommands(clientId, guildId)
  : Routes.applicationCommands(clientId);

await rest.put(route, { body });

console.log(
  `Registered ${body.length} command(s) (${guildId ? `guild ${guildId}` : "global — may take up to an hour"})`,
);
