import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { categories, downloadLinks } from "../content.js";

export const BUTTON_PREFIX = "vc:";

export const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription(
    "Get help installing and configuring Simple Voice Chat (buttons for each guide)",
  );

export function categoryButtonId(id: string): string {
  return `${BUTTON_PREFIX}${id}`;
}

export function parseCategoryButtonId(customId: string): string | null {
  if (!customId.startsWith(BUTTON_PREFIX)) return null;
  return customId.slice(BUTTON_PREFIX.length);
}

export function buildHelpEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(0x1f8a70)
    .setTitle("Simple Voice Chat — Setup & Installation")
    .setDescription(
      [
        "Need help installing or configuring **Simple Voice Chat**?",
        "",
        "Use the buttons below to get step-by-step guides:",
        "",
        "📥 **Install — Loaders** — Fabric, NeoForge, Forge, or Quilt mod install",
        "🔌 **Install — Server Plugins** — Bukkit/Spigot/Paper and proxy plugins",
        "🎙️ **Client Setup** — Microphone, speakers, and push-to-talk (v2.5.2+)",
        "",
        `**Downloads:** [Modrinth](${downloadLinks.modrinth.mod}) · [CurseForge](${downloadLinks.curseforge.mod})`,
        "",
        "Source: [modrepo.de/minecraft/voicechat/wiki](https://modrepo.de/minecraft/voicechat/wiki/installation)",
      ].join("\n"),
    )
    .setFooter({ text: "Pick a topic below — only you will see the detailed guide." });
}

export function buildHelpButtons(): ActionRowBuilder<ButtonBuilder>[] {
  const guideRow = new ActionRowBuilder<ButtonBuilder>();

  for (const category of categories) {
    guideRow.addComponents(
      new ButtonBuilder()
        .setCustomId(categoryButtonId(category.id))
        .setLabel(category.label)
        .setEmoji(category.icon)
        .setStyle(ButtonStyle.Primary),
    );
  }

  const downloadRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel("Modrinth")
      .setEmoji("📦")
      .setStyle(ButtonStyle.Link)
      .setURL(downloadLinks.modrinth.mod),
    new ButtonBuilder()
      .setLabel("CurseForge")
      .setEmoji("🔥")
      .setStyle(ButtonStyle.Link)
      .setURL(downloadLinks.curseforge.mod),
  );

  return [guideRow, downloadRow];
}

export async function execute(
  interaction: ChatInputCommandInteraction,
): Promise<void> {
  await interaction.reply({
    embeds: [buildHelpEmbed()],
    components: buildHelpButtons(),
    ephemeral: true,
  });
}
