import { config } from "dotenv";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/** Project root (parent of src/ or dist/). */
export function getProjectRoot(): string {
  const scriptDir = fileURLToPath(new URL(".", import.meta.url));
  return dirname(scriptDir);
}

export function loadProjectEnv(): string {
  const envPath = join(getProjectRoot(), ".env");

  config({
    path: envPath,
    // Prefer .env over pre-set (often empty) shell variables.
    override: true,
  });

  return envPath;
}

export function readGuildIdFromEnv(): string | undefined {
  const raw =
    process.env.DISCORD_GUILD_ID?.trim() ??
    process.env.GUILD_ID?.trim();

  if (!raw) return undefined;

  return raw.replace(/^["']|["']$/g, "");
}

export function explainMissingGuildId(envPath: string): void {
  if (!existsSync(envPath)) {
    console.warn(`No .env file at:\n  ${envPath}`);
    console.warn("Create one with: cp .env.example .env");
    return;
  }

  console.warn(`Checked .env at:\n  ${envPath}`);
  console.warn(
    "DISCORD_GUILD_ID was not loaded. Common fixes:\n" +
      "  • Use exactly: DISCORD_GUILD_ID=123456789012345678 (no quotes, not commented with #)\n" +
      "  • Put .env in the project root (same folder as package.json)\n" +
      "  • On Windows, ensure the file is named .env — not .env.txt\n" +
      "  • Run npm run deploy-commands from the project root folder",
  );
}
