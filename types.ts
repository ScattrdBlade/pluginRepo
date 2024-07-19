/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import type { MouseEventHandler, ReactNode } from "react";

export interface PluginInfo {
    name: string; // name of the plugin
    filename: string; // name of what the file/folder in plugindir should be (if blank, that means skip creating a folder. if ends in file extension, don't create a folder and just rename the singular file and leave it in plugdir)
    filesearch: string;
    downloadUrl: string;
    downloadFiles?: string[]; // files to download from the zip
    description: string;
    tags: string[];
    dateAdded: string;
    options: Record<string, any>;
    customInfo?: string; // Optional property for custom information
    started?: boolean | undefined; // Will get integrated later on
    authors?: string[]; // Will become required when integrated later on
}

export const enum SearchStatus {
    ALL,
    INSTALLED,
    NOT_INSTALLED,
    NEW
}

export interface Props {
    name: ReactNode;
    description: ReactNode;
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
    disabled?: boolean;
    isNew?: boolean;
    onMouseEnter?: MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: MouseEventHandler<HTMLDivElement>;

    infoButton?: ReactNode;
    footer?: ReactNode;
    author?: ReactNode;
}

export const presetPlugins: PluginInfo[] = [
    {
        name: "Theme Library",
        filename: "",
        filesearch: "ThemeLibrary",
        downloadUrl: "https://github.com/Faf4a/plugins/archive/refs/heads/main.zip",
        downloadFiles: ["ThemeLibrary/components", "ThemeLibrary/index.tsx", "ThemeLibrary/types.ts"],
        description: "A library of themes for Vencord.",
        tags: ["themes", "repo"],
        dateAdded: "1715326",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "Cute nekos",
        filename: "neko.ts",
        filesearch: "neko.ts",
        downloadUrl: "https://github.com/exhq/vencord-plugins/archive/refs/heads/main.zip",
        downloadFiles: ["neko.ts"],
        description: "what the fuck am i doing with my life",
        tags: ["girls", "catgirls", "cats"],
        dateAdded: "1715326747",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "Sekai Stickers",
        filename: "sekaistickers-vencord",
        filesearch: "sekaistickers-vencord",
        downloadUrl: "https://github.com/MaiKokain/sekaistickers-vencord/archive/refs/heads/main.zip",
        downloadFiles: ["Components", "utils", "characters.json.ts", "index.tsx", "kanade.svg.tsx"],
        description: "Sekai Stickers built in discord originally from github.com/TheOriginalAyaka",
        tags: ["sekai", "anime", "girls", "stickers"],
        dateAdded: "1715326747",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "Husk",
        filename: "husk.tsx",
        filesearch: "husk.tsx",
        downloadUrl: "https://github.com/nin0-dev/vc-userplugins/archive/refs/heads/master.zip",
        downloadFiles: ["husk.tsx"],
        description: "Adds husk (emoji) button (works only on the Vencord Server if no nitro)",
        tags: ["vencord sever", "server exclusive", "exclusive", "support"],
        dateAdded: "1715326747",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "Cute-Anime-Boys",
        filename: "cuteAnimeBoys.ts",
        filesearch: "cuteAnimeBoys.ts",
        downloadUrl: "https://github.com/ScattrdBlade/vencord-cuteanimeboys/archive/refs/heads/main.zip",
        downloadFiles: ["index.ts"],
        description: "Add a command to send cute anime boys in the chat",
        tags: ["command", "guys", "femboys"],
        dateAdded: "1715326747",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "multistickers",
        filename: "",
        filesearch: "multiStickers.ts",
        downloadUrl: "https://github.com/voidfill/multistickers/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx", "style.css"],
        description: "Let's you send up to 3 stickers and shift click stickers. WARNING: this plugin may get you banned since it uses the api in ways a real client doesn't",
        tags: ["stickers", "emoji"],
        dateAdded: "1715326747",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "Vencordo",
        filename: "explod.ts",
        filesearch: "explod.ts",
        downloadUrl: "https://github.com/exhq/vencord-plugins/archive/refs/heads/main.zip",
        downloadFiles: ["explod.ts"],
        description: "replace the \"discordo\" sound on startup with something a bit more interesting",
        tags: ["discord", "startup", "sound"],
        dateAdded: "1715326747",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
];
