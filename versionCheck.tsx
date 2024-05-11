/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { showNotification } from "@api/Notifications";
import { Button } from "@webpack/common";
import { PluginNative } from "@utils/types";

const Native = VencordNative.pluginHelpers.PluginsRepo as PluginNative<typeof import("../native")>;

export const VERSION = "1.0.1";

async function getVersion() {
    const repoVersion = await (await fetch("https://raw.githubusercontent.com/ScattrdBlade/plugin-repo-vencord/main/utils/versionCheck.tsx", { cache: "no-cache" })).text();
    const repoVersionMatch = repoVersion.match(/export const VERSION = "(.+)";/);
    if (!repoVersionMatch) return;
    const [_, version] = repoVersionMatch;
    const [major, minor, patch] = version.split(".").map(m => parseInt(m));
    if (Number.isNaN(major) || Number.isNaN(minor) || Number.isNaN(patch)) return false;
    const [currMajor, currMinor, currPatch] = VERSION.split(".").map(m => parseInt(m));
    if (major > currMajor || minor > currMinor || patch > currPatch) return version;
    return false;
}

export async function checkUpdate() {
    const updateVer = await getVersion();
    if (!updateVer) return;

    const onClickNotification = async () => {
        const installedPlugins = await Native.getInstalledPlugins();
        const pluginToUpdate = installedPlugins.find(p => p.name === "Plugin Repo");
        if (!pluginToUpdate) {
            console.error("Plugin not found among installed.");
            return;
        }

        try {
            await Native.uninstallPlugin(pluginToUpdate.filename);
            console.log("Old plugin version uninstalled.");

            await Native.installPlugin(undefined, pluginToUpdate); // Assuming the first argument can be ignored or is irrelevant
            console.log("New plugin version installed.");
        } catch (error) {
            console.error("Error updating plugin:", error);
        }
    };

    showNotification({
        title: `Update available for Plugin Repo: ${updateVer}`,
        body: "Click here to update to the latest version.",
        permanent: false,
        noPersist: true,
        onClick: onClickNotification
    });
}

export function updateButton() {
    return (<Button onClick={() => checkUpdate()}>Check for update!</Button>);
}
