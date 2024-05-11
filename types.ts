/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import type { MouseEventHandler, ReactNode } from "react";

export interface PluginInfo {
    name: string;
    filename: string;
    filesearch: string;
    downloadUrl: string;
    downloadFiles?: string[];
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
        downloadFiles: ["ThemeLibrary/components", "ThemeLibrary/index.ts", "ThemeLibrary/types.ts"],
        description: "A library of themes for Vencord.",
        tags: ["example", "plugin"],
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
        tags: ["example", "plugin"],
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
        tags: ["example", "plugin"],
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
        tags: ["example", "plugin"],
        dateAdded: "1715326747",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    // More plugins when complete
];
