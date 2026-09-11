import "dotenv/config";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { BotClient } from "./client.js";
import { data as helpData, execute as helpExecute } from "./commands/help.js";

const token = process.env.DISCORD_TOKEN;

if (!token) {
  throw new Error(
    "Missing DISCORD_TOKEN. Copy .env.example to .env and fill in your bot credentials.",
  );
}

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const client = new BotClient();

client.commands.set(helpData.name, { data: helpData, execute: helpExecute });

const eventsPath = join(rootDir, "events");
for (const file of readdirSync(eventsPath).filter((f) => f.endsWith(".ts") || f.endsWith(".js"))) {
  const event = await import(join(eventsPath, file));
  const handler = (...args: unknown[]) => event.default.execute(...args, client);

  if (event.default.once) {
    client.once(event.default.name, handler);
  } else {
    client.on(event.default.name, handler);
  }
}

async function shutdown(): Promise<void> {
  console.log("Shutting down...");
  client.destroy();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
});

await client.login(token);
