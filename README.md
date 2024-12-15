**UPDATE: Added all plugins from [#unofficial-plugins](https://discordapp.com/channels/1015060230222131221/1256395889354997771) (except nin0's because his repos are down) and fixed all previously broken plugins**

# Plugin Repo (Vencord)
This is a Vencord plugin that adds a Plugin Repo to settings so you can search for and download third-party Vencord plugins directly within Discord, just like BetterDiscord's plugin repo. This eliminates the need to manually search for and download third-party plugins from external sources, making the process a lot more user-friendly and convenient.
> [!NOTE]
> You can find the Plugin Repo by going to your Discord settings and locating the Vencord category.<br/>
The Plugin Repo should be located at the bottom of the Vencord category.

## DOWNLOAD INSTRUCTIONS
You can either __git clone__ the repository OR __manually install__ it by downloading it as a zip file.<br/>
> [!WARNING]
> Make sure you have the Vencord [developer build](https://docs.vencord.dev/installing/) installed.<br/>

> [!IMPORTANT]
> Inside the `Vencord` folder should be a folder called `src`. If you haven't already, create a folder called `userplugins` inside the `src` folder.

### GIT CLONE INSTALLATION
The full cloning installation guide can be found [here](https://discord.com/channels/1015060230222131221/1257038407503446176/1257038407503446176) or via [the official Vencord Docs](https://docs.vencord.dev/installing/custom-plugins/).
1. Direct your terminal (command prompt/CMD) to the `userplugins` folder, e.g. `cd src/userplugins`.
2. Open the terminal and paste `git clone https://github.com/ScattrdBlade/pluginRepo`
3. Ensure it's structured as `src/userplugins/pluginRepo` or `src/userplugins/pluginRepo-main`
4. Run `pnpm build` in the terminal (command prompt/CMD) and the plugin should be added.

### MANUAL INSTALLATION
1. Click the green `<> Code` button at the top right of the repository and select `Download ZIP`
2. Unzip the downloaded ZIP file into the `userplugins` folder.
3. Ensure it's structured as `src/userplugins/pluginRepo` or `src/userplugins/pluginRepo-main`
5. Run `pnpm build` in the terminal (command prompt/CMD) and the plugin should be added.

> [!TIP]
> If you run into any issues, please feel free to message me on Discord: [scattrdblade](https://discord.com/users/678007540608532491)
