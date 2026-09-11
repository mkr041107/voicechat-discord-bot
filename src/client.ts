import { Client, Collection, GatewayIntentBits } from "discord.js";
import type { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface Command {
  data: SlashCommandBuilder;
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

export class BotClient extends Client {
  public commands = new Collection<string, Command>();

  constructor() {
    super({
      intents: [GatewayIntentBits.Guilds],
    });
  }
}
