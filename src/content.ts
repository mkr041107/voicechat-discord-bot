export interface VoiceChatCategory {
  id: string;
  icon: string;
  label: string;
  title: string;
  text: string;
}

export const categories: VoiceChatCategory[] = [
  {
    id: "install-loaders",
    icon: "📥",
    label: "Install — Loaders",
    title: "Installation — Mod Loaders",
    text: `**📥 INSTALLATION — MOD LOADERS**
*(Fabric / NeoForge / Forge / Quilt)*

You must install Simple Voice Chat on **both** the client and the server. Skipping the client install still lets you join, but you won't be able to use any voice features.

All loaders are cross-compatible with each other — the loader choice just has to match what your client/server already runs.

**Fabric**
> Requires the Fabric Loader installed on client/server.
Copy the **Fabric** build of the mod jar into your \`/mods\` folder.

**NeoForge**
> Requires NeoForge installed on client/server.
Copy the **NeoForge** build of the mod jar into your \`/mods\` folder.

**Forge**
> Requires Forge installed on client/server.
Copy the **Forge** build of the mod jar into your \`/mods\` folder.

**Quilt**
> Requires the Quilt Loader installed on client/server.
Copy the **Quilt** build of the mod jar into your \`/mods\` folder.

⚠️ **Note:** If you hit loader-specific issues (Fabric/Forge/etc. itself crashing, not the mod), ask in that loader's own Discord — not Simple Voice Chat support.`,
  },
  {
    id: "install-plugins",
    icon: "🔌",
    label: "Install — Server Plugins",
    title: "Installation — Bukkit / Proxy Plugins",
    text: `**🔌 INSTALLATION — SERVER & PROXY PLUGINS**
*(Bukkit / Spigot / Paper · Velocity / BungeeCord / Waterfall)*

**Bukkit / Spigot / Paper**
Drop the Simple Voice Chat **plugin** jar into your server's \`/plugins\` folder.

⚠️ **Important:** Players still need the Fabric, NeoForge, Forge, or Quilt **mod** installed on their client — the Bukkit/Spigot/Paper plugin only handles the server side.

**Velocity / BungeeCord / Waterfall (proxy)**
Drop the Simple Voice Chat **proxy plugin** jar into your proxy's \`/plugins\` folder.

⚠️ **Important:** You still need the mod/plugin installed on each backend Minecraft server behind the proxy.`,
  },
  {
    id: "client-setup",
    icon: "🎙️",
    label: "Client Setup",
    title: "Client Setup (v2.5.2+)",
    text: `**🎙️ CLIENT SETUP**
*(Version 2.5.2 and later)*

Since v2.5.2 the mod ships with an onboarding guide.

**Steps:**
1. Install the mod and join any server or singleplayer world.
2. You'll get a chat message saying voice chat needs to be set up.
3. Press **V** to open the setup guide.
4. The guide walks you through:
   • Selecting your microphone device
   • Selecting your speaker device
   • Choosing activation mode — **Push to Talk** or **Voice Activation**
   • Setting a push-to-talk keybind
   • Adjusting your mic's voice activation sensitivity

💡 You can reopen/redo this guide any time from the mod's settings if your audio devices change.`,
  },
];

export function getCategory(id: string): VoiceChatCategory | undefined {
  return categories.find((c) => c.id === id);
}
