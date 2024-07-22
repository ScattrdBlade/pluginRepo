- **Recent Changes:** Fixed plugin repo's updater for when a new version is released.
- **ToDo:** Re-check all plugins and fix the plugins that have been moved to different repos, got deleted, or no longer work.

> [!TIP]
> **If you run into any issues, please feel free to message me on Discord: [scattrdblade](https://discord.com/users/678007540608532491)**
# Plugin Repo (Vencord)
This is a Vencord plugin that adds a Plugin Repo so you can search for and download third-party Vencord plugins directly within Discord. This eliminates the need to manually search for and download third-party plugins from external sources, making the process a lot more user-friendly and convenient.
> [!NOTE]
> You can find the Plugin Repo by going to your Discord settings and locating the Vencord category.<br/>
The Plugin Repo should be located at the bottom of the Vencord category.

## DOWNLOAD INSTRUCTIONS
You can either __clone__ the repository OR __manually install__ it by downloading it as a zip file.<br/>
> [!WARNING]
> Make sure you have the Vencord [developer build](https://docs.vencord.dev/installing/) installed.<br/>

### CLONE INSTALLATION
The cloning installation guide can be found [here](https://discord.com/channels/1015060230222131221/1257038407503446176/1257038407503446176) or via [the official Vencord Docs](https://docs.vencord.dev/installing/custom-plugins/).

### MANUAL INSTALLATION
> [!IMPORTANT]
> Inside the `Vencord` folder should be a folder called `src`. If you haven't already, create a folder called `userplugins` inside the `src` folder.
1. Click the green `<> Code` button at the top right of the repository and select `Download ZIP`
2. Unzip the downloaded ZIP file into the `userplugins` folder.
3. Ensure it's structured as `src/userplugins/pluginRepo` or `src/userplugins/pluginRepo-main`
5. Run `pnpm build` in the terminal (command prompt/CMD) and the plugin should be added.
