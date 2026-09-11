import type { Client } from "discord.js";

export default {
  name: "ready" as const,
  once: true,
  execute(client: Client) {
    console.log(`Logged in as ${client.user?.tag}`);
  },
};
