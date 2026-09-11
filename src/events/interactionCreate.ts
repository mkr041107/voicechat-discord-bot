import type { Interaction } from "discord.js";
import { EmbedBuilder } from "discord.js";
import type { BotClient } from "../client.js";
import { parseCategoryButtonId } from "../commands/help.js";
import { getCategory } from "../content.js";

export default {
  name: "interactionCreate" as const,
  once: false,
  async execute(interaction: Interaction, client: BotClient) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing /${interaction.commandName}:`, error);
        const reply = {
          content: "Something went wrong. Please try `/help` again.",
          ephemeral: true,
        };
        if (interaction.deferred || interaction.replied) {
          await interaction.editReply(reply).catch(() => {});
        } else {
          await interaction.reply(reply).catch(() => {});
        }
      }
      return;
    }

    if (interaction.isButton()) {
      const categoryId = parseCategoryButtonId(interaction.customId);
      if (!categoryId) return;

      const category = getCategory(categoryId);
      if (!category) {
        await interaction.reply({
          content: "That guide could not be found. Run `/help` again.",
          ephemeral: true,
        });
        return;
      }

      try {
        const embed = new EmbedBuilder()
          .setColor(0x1f8a70)
          .setTitle(`${category.icon} ${category.title}`)
          .setDescription(category.text);

        await interaction.reply({ embeds: [embed], ephemeral: true });
      } catch (error) {
        console.error("Button interaction error:", error);
        const reply = {
          content: "Something went wrong. Please try `/help` again.",
          ephemeral: true,
        };
        if (interaction.deferred || interaction.replied) {
          await interaction.followUp(reply).catch(() => {});
        } else {
          await interaction.reply(reply).catch(() => {});
        }
      }
    }
  },
};
