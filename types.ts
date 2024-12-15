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
        filename: "ThemeLibrary",
        filesearch: "ThemeLibrary",
        downloadUrl: "https://github.com/Faf4a/plugins/archive/refs/heads/main.zip",
        downloadFiles: ["userplugins/ThemeLibrary/components", "userplugins/ThemeLibrary/index.tsx", "userplugins/ThemeLibrary/types.ts"],
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
        name: "Cute AnimeBoys",
        filename: "cuteAnimeBoys.ts",
        filesearch: "cuteAnimeBoys.ts",
        downloadUrl: "https://github.com/ScattrdBlade/CuteAnimeBoys/archive/refs/heads/main.zip",
        downloadFiles: ["cuteAnimeBoys.ts"],
        description: "Add a command to send cute anime boys in the chat",
        tags: ["command", "guys", "femboys"],
        dateAdded: "1715326747",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "Multistickers",
        filename: "multistickers",
        filesearch: "multistickers",
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
    {
        name: "SidebarChat",
        filename: "vc-sidebarchat",
        filesearch: "vc-sidebarchat",
        downloadUrl: "https://github.com/Masterjoona/vc-sidebarchat/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx", "store.ts"],
        description: "Open a another channel or a DM as a sidebar or as a popout",
        tags: ["extra", "split", "splitview"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "UnreadCountBadges",
        filename: "vc-unreadcountbadge",
        filesearch: "vc-unreadcountbadge",
        downloadUrl: "https://github.com/Masterjoona/vc-unreadcountbadge/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx", "styles.css"],
        description: "Show a badge in the channel list for unread messages",
        tags: ["css", "ping", "notification"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "CollapseChatButtons",
        filename: "collapseChatButtons",
        filesearch: "collapseChatButtons",
        downloadUrl: "https://github.com/coldcord/collapseChatButtons/archive/refs/heads/master.zip",
        downloadFiles: ["index.tsx",],
        description: "Collapse the chat buttons at any time you want. Just press a single button.",
        tags: ["hide", "minimize"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "RandomGary",
        filename: "randomGary",
        filesearch: "randomGary",
        downloadUrl: "https://github.com/Zach11111/randomGary/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx", "styles.css", "native.ts"],
        description: "Adds a button to send random Gary, Minky, or cat pictures in your Discord chats!",
        tags: ["car", "bleh", "chipi chipi chapa chapa"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "VoiceChatUtilities",
        filename: "vc-voiceChatUtilities",
        filesearch: "vc-voiceChatUtilities",
        downloadUrl: "https://github.com/D3SOX/vc-voiceChatUtilities/archive/refs/heads/master.zip",
        downloadFiles: ["index.tsx"],
        description: "Allows you to perform multiple actions on an entire channel (move, mute, disconnect, etc.)",
        tags: ["VC"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "KeywordNotify",
        filename: "vencord-KeywordNotify",
        filesearch: "vencord-KeywordNotify",
        downloadUrl: "https://github.com/x3rt/vencord-KeywordNotify/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx", "style.css"],
        description: `"ping" the user if a message matches custom regular expressions`,
        tags: ["notification", "regex"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "FriendCodes",
        filename: "FriendCodes",
        filesearch: "FriendCodes",
        downloadUrl: "https://github.com/Domis-Vencord-Plugins/FriendCodes/archive/refs/heads/main.zip",
        downloadFiles: ["components", "types", "index.tsx", "tsconfig.json"],
        description: "Generate FriendCodes to easily add friends",
        tags: ["QR", "link", "invite"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "CategoryCloner",
        filename: "vencord-category-cloner",
        filesearch: "vencord-category-cloner",
        downloadUrl: "https://github.com/mafineeek/vencord-category-cloner/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx"],
        description: `Adds "Clone category" context menu option which is missing natively.`,
        tags: [],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "BigFileUpload",
        filename: "bigFileUpload",
        filesearch: "bigFileUpload",
        downloadUrl: "https://github.com/ScattrdBlade/bigFileUpload/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx", "native.ts"],
        description: "Bypass Discord's upload limit by uploading files using the 'Upload a Big File' button or /fileupload and they'll get uploaded as links into chat via file uploaders.",
        tags: ["nitro", "uploader", "API", "external", "FTP", "Sharex", "catbox.moe", "anonfiles.com", "gofile.io", "litterbox", "chibisafe"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "CopyFolderId",
        filename: "vc-copyFolderId",
        filesearch: "vc-copyFolderId",
        downloadUrl: "https://github.com/sadan4/vc-copyFolderId/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx"],
        description: "Adds an option to copy folder ids. This isn't used that much, but when you need it its really annoying to get.",
        tags: ["servers"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "HolyNotes",
        filename: "HolyNotes-VC",
        filesearch: "HolyNotes-VC",
        downloadUrl: "https://github.com/WolfPlugs/HolyNotes-VC/archive/refs/heads/main.zip",
        downloadFiles: ["components", "NoteHandler.ts", "index.tsx", "style.css", "types.ts", "utils.ts"],
        description: "Save messages on a personal notebook, u can store a large amount of messages on this notebook",
        tags: [],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "DiscordColorways",
        filename: "DiscordColorways-VencordUserplugin",
        filesearch: "DiscordColorways-VencordUserplugin",
        downloadUrl: "https://github.com/DaBluLite/DiscordColorways-VencordUserplugin/archive/refs/heads/master.zip",
        downloadFiles: ["components", "colorwaysAPI.ts", "constants.ts", "contexts.tsx", "css.ts", "defaultsLoader.tsx", "index.tsx", "style.css", "theme.discord.css", "types.ts", "utils.ts", "wsClient.tsx"],
        description: "A plugin that offers easy access to simple color schemes/themes for Discord, also known as Colorways",
        tags: ["css", "editor"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "atSomeone",
        filename: "vc-atsomeone",
        filesearch: "vc-atsomeone",
        downloadUrl: "https://github.com/Masterjoona/vc-atsomeone/archive/refs/heads/main.zip",
        downloadFiles: ["index.ts"],
        description: "Mention someone randomly",
        tags: ["ping"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "WriteUpperCase",
        filename: "WriteUpperCase",
        filesearch: "WriteUpperCase",
        downloadUrl: "https://github.com/KrstlSkll69/WriteUpperCase/archive/refs/heads/main.zip",
        downloadFiles: ["index.ts"],
        description: "Changes the first Letter of each Sentence in Message Inputs to Uppercase",
        tags: ["text"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "KaTeX",
        filename: "ventex",
        filesearch: "ventex",
        downloadUrl: "https://github.com/vgskye/ventex/archive/refs/heads/rubber.zip",
        downloadFiles: ["index.tsx", "katex.css"],
        description: "TeX typesetting in discord",
        tags: ["latex"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "AntiRickRoll",
        filename: "vencord-antirickroll",
        filesearch: "vencord-antirickroll",
        downloadUrl: "https://github.com/ryawaa/vencord-antirickroll/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx", "knownHosts.ts", "knownVideoIDs.ts"],
        description: "Warns you of potential Rickrolls in messages, including masked links (supports custom rules)",
        tags: ["warning"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "SpotifyLyrics",
        filename: "vc-spotifylyrics",
        filesearch: "vc-spotifylyrics",
        downloadUrl: "https://github.com/Masterjoona/vc-spotifylyrics/archive/refs/heads/main.zip",
        downloadFiles: ["components", "providers", "api.tsx", "index.tsx", "settings.tsx", "styles.css"],
        description: "Show lyrics for the currently playing song on Spotify. ",
        tags: ["music"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "MessageColors",
        filename: "vc-messageColors",
        filesearch: "vc-messageColors",
        downloadUrl: "https://github.com/henmalib/vc-messageColors/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx", "styles.css", "constants.ts"],
        description: "Displays color codes like #cba6f7 or rgb(255,0,0) inside of messages",
        tags: ["custom", "hex"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "IconViewer",
        filename: "iconViewer",
        filesearch: "iconViewer",
        downloadUrl: "https://github.com/coldcord/iconViewer/archive/refs/heads/master.zip",
        downloadFiles: ["IconModal.tsx", "IconsTab.css", "IconsTab.tsx", "index.tsx", "saveModal.tsx", "utils.tsx"],
        description: "Adds a new tab to settings, to preview all icons",
        tags: ["picture", "image"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "TextProfileView",
        filename: "vc-fullUserInChatbox",
        filesearch: "vc-fullUserInChatbox",
        downloadUrl: "https://github.com/sadan4/vc-fullUserInChatbox/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx"],
        description: "Adds the full user mention object to the chat box",
        tags: ["username", "ping"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "SortReactions",
        filename: "SortReactions",
        filesearch: "SortReactions",
        downloadUrl: "https://github.com/HAHALOSAH/SortReactions/archive/refs/heads/main.zip",
        downloadFiles: ["index.ts"],
        description: "Sorts reactions by count in chat.",
        tags: ["emoji"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "LoginWithQR",
        filename: "LoginWithQR",
        filesearch: "LoginWithQR",
        downloadUrl: "https://github.com/nexpid/LoginWithQR/archive/refs/heads/main.zip",
        downloadFiles: ["lib", "ui", "images.ts", "index.tsx"],
        description: "Allows you to login to another device by scanning a login QR code, just like on mobile!",
        tags: ["signin"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "MediaPlaybackSpeed",
        filename: "vc-mediaPlaybackSpeed",
        filesearch: "vc-mediaPlaybackSpeed",
        downloadUrl: "https://github.com/D3SOX/vc-mediaPlaybackSpeed/archive/refs/heads/master.zip",
        downloadFiles: ["components", "index.tsx", "styles.css"],
        description: "Allows changing the (default) playback speed of media embeds",
        tags: ["video", "sound", "audio", "voice message"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "TimelessClips",
        filename: "vc-timelessclips",
        filesearch: "vc-timelessclips",
        downloadUrl: "https://github.com/Masterjoona/vc-timelessclips/archive/refs/heads/main.zip",
        downloadFiles: ["index.ts"],
        description: "Allows you to set a custom clip length if you want to save more of your precious streams",
        tags: ["nitro"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "CtrlEnterSave",
        filename: "vc-ctrlEnterSave",
        filesearch: "vc-ctrlEnterSave",
        downloadUrl: "https://github.com/sadan4/vc-ctrlEnterSave/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx"],
        description: "Adds the keybind ctrl+enter to save changes when editing channels, servers, roles etc.",
        tags: [],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "MoreReact",
        filename: "moreReact",
        filesearch: "moreReact",
        downloadUrl: "https://github.com/coldcord/moreReact/archive/refs/heads/main.zip",
        downloadFiles: ["index.ts"],
        description: "Modify the max count of frencency reactions.",
        tags: ["emoji"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "WhosWatching",
        filename: "vencord-whos-watching",
        filesearch: "vencord-whos-watching",
        downloadUrl: "https://github.com/fres621/vencord-whos-watching/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx"],
        description: "View who's spectating your stream on Discord",
        tags: ["screenshare", "streaming", "viewing", "viewer"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "NotifyUserChanges",
        filename: "vc-notifyUserChanges",
        filesearch: "vc-notifyUserChanges",
        downloadUrl: "https://github.com/D3SOX/vc-notifyUserChanges/archive/refs/heads/master.zip",
        downloadFiles: ["components", "index.tsx"],
        description: "Adds a notify option in the user context menu to get notified when a user changes voice channels or online status",
        tags: ["notification", "online", "offline", "idle", "dnd"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "NewPluginsManager",
        filename: "vc-newPluginsManager",
        filesearch: "vc-newPluginsManager",
        downloadUrl: "https://github.com/Sqaaakoi/vc-newPluginsManager/archive/refs/heads/main.zip",
        downloadFiles: ["NewPluginsModal.css", "NewPluginsModal.tsx", "index.tsx", "knownSettings.ts"],
        description: "Utility that notifies you when new plugins are added to Vencord",
        tags: ["notification"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "FollowUser",
        filename: "vc-followUser",
        filesearch: "vc-followUser",
        downloadUrl: "https://github.com/D3SOX/vc-followUser/archive/refs/heads/master.zip",
        downloadFiles: ["index.tsx"],
        description: "Adds a follow option in the user context menu to always be in the same VC as them",
        tags: ["stalker", "stalking", "troll"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "UnitConverter",
        filename: "plugin-unitConverter",
        filesearch: "plugin-unitConverter",
        downloadUrl: "https://github.com/sadan4/plugin-unitConverter/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx", "ConverterAccessory.tsx", "converter.ts", "style.css"],
        description: "Allows you to convert units to imperial or metric.",
        tags: ["converter"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "WigglyText",
        filename: "WigglyText",
        filesearch: "WigglyText",
        downloadUrl: "https://github.com/nexpid/WigglyText/archive/refs/heads/main.zip",
        downloadFiles: ["ui", "index.tsx"],
        description: "Adds a new markdown formatting that makes text wiggly.",
        tags: [],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "KeyboardSounds",
        filename: "KeyboardSounds",
        filesearch: "KeyboardSounds",
        downloadUrl: "https://github.com/Domis-Vencord-Plugins/KeyboardSounds/archive/refs/heads/main.zip",
        downloadFiles: ["sounds", "index.ts", "tsconfig.json"],
        description: "Adds the Opera GX Keyboard Sounds to Discord",
        tags: ["clicks"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "ExitSounds",
        filename: "vencord-ExitSounds",
        filesearch: "vencord-ExitSounds",
        downloadUrl: "https://github.com/hauntii/vencord-ExitSounds/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx"],
        description: "Plays a soundboard to others when you disconnect from a call!",
        tags: ["leave", "outro"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "VideoStartNotifier",
        filename: "videoStartNotifier",
        filesearch: "videoStartNotifier",
        downloadUrl: "https://github.com/redbaron2k7/videoStartNotifier/archive/refs/heads/main.zip",
        downloadFiles: ["index.ts", "start.mp3", "stop.mp3"],
        description: "Simple plugin that adds sound effects for when someone starts/stops their webcam in a voice channel.",
        tags: ["notification", "notifier", "notify"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "CopyStatusUrls",
        filename: "vc-copyStatusUrls",
        filesearch: "vc-copyStatusUrls",
        downloadUrl: "https://github.com/sadan4/vc-copyStatusUrls/archive/refs/heads/main.zip",
        downloadFiles: ["index.ts"],
        description: "Copy the users status url when you right-click it",
        tags: ["rpc", "rich presence", "button"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "StaticTitle",
        filename: "vc-staticTitle",
        filesearch: "vc-staticTitle",
        downloadUrl: "https://github.com/sadan4/vc-staticTitle/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx"],
        description: "Gives the discord window a static title, using the string of your choice",
        tags: [""],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "BetterActivities",
        filename: "vc-betterActivities",
        filesearch: "vc-betterActivities",
        downloadUrl: "https://github.com/D3SOX/vc-betterActivities/archive/refs/heads/master.zip",
        downloadFiles: ["components", "index.tsx", "styles.css", "types.ts"],
        description: "Shows activity icons in the member list and allows showing all activities",
        tags: [""],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "ReplaceActivityTypes",
        filename: "replaceActivityTypes",
        filesearch: "replaceActivityTypes",
        downloadUrl: "https://github.com/nyakowint/replaceActivityTypes/archive/refs/heads/main.zip",
        downloadFiles: ["ReplaceSettings.tsx", "index.tsx"],
        description: "Swap the Activity Types of rich presence applications",
        tags: [""],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "Jumpscare",
        filename: "VencordJumpscare",
        filesearch: "VencordJumpscare",
        downloadUrl: "https://github.com/surgedevs/VencordJumpscare/archive/refs/heads/main.zip",
        downloadFiles: ["defaultfiles", "index.tsx", "styles.css"],
        description: "Adds a configurable chance of jumpscaring you whenever you open any channel",
        tags: [""],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "(Tweaked) VCNarrator",
        filename: "vcNarrator-custom",
        filesearch: "vcNarrator-custom",
        downloadUrl: "https://github.com/nyakowint/vcNarrator-custom/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx"],
        description: "VCNarrator but slightly modified",
        tags: [""],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "NeverPausePreviews",
        filename: "NeverPausePreviews",
        filesearch: "NeverPausePreviews",
        downloadUrl: "https://github.com/RattletraPM/NeverPausePreviews/archive/refs/heads/main.zip",
        downloadFiles: ["index.ts"],
        description: "Prevents in-call/PiP previews (screenshare, streams, etc) from pausing even if the client loses focus",
        tags: [""],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "TriggerWarning",
        filename: "vc-triggerwarning",
        filesearch: "vc-triggerwarning",
        downloadUrl: "https://github.com/Masterjoona/vc-triggerwarning/archive/refs/heads/main.zip",
        downloadFiles: ["index.ts"],
        description: "Allows you to spoiler words in messages and files/embeds based on a list of keywords.",
        tags: [""],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "Encryptcord",
        filename: "Encryptcord",
        filesearch: "Encryptcord",
        downloadUrl: "https://github.com/Inbestigator/encryptcord/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx", "rsa-utils.ts"],
        description: "Encryptcord allows you to securely communicate with other people using end-to-end encryption.",
        tags: [""],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "GlobalBadges",
        filename: "GlobalBadges",
        filesearch: "GlobalBadges",
        downloadUrl: "https://github.com/Domis-Vencord-Plugins/GlobalBadges/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx", "tsconfig.json"],
        description: "Adds global badges from other client mods",
        tags: [""],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "BetterPlusReacts",
        filename: "vc-betterplusreacts",
        filesearch: "vc-betterplusreacts",
        downloadUrl: "https://github.com/Masterjoona/vc-betterplusreacts/archive/refs/heads/main.zip",
        downloadFiles: ["index.ts"],
        description: "The amount of the pluses you add is the message the reaction will get added to!",
        tags: [""],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "ServerProfilesToolbox",
        filename: "vc-serverProfilesToolbox",
        filesearch: "vc-serverProfilesToolbox",
        downloadUrl: "https://github.com/D3SOX/vc-serverProfilesToolbox/archive/refs/heads/master.zip",
        downloadFiles: ["index.tsx", "styles.css"],
        description: "Adds a copy/paste/reset button to the server profiles editor",
        tags: ["edit"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "BlockKrisp",
        filename: "vc-blockKrisp",
        filesearch: "vc-blockKrisp",
        downloadUrl: "https://github.com/D3SOX/vc-blockKrisp/archive/refs/heads/master.zip",
        downloadFiles: ["index.ts"],
        description: "Prevent Krisp from loading",
        tags: [""],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "EmojiOnMouseUp",
        filename: "emojiOnMouseUp",
        filesearch: "emojiOnMouseUp",
        downloadUrl: "https://github.com/sadan4/emojiOnMouseUp/archive/refs/heads/main.zip",
        downloadFiles: ["index.tsx"],
        description: "This is a simple plugin that sends the emoji you are hovering when you release your mouse.",
        tags: [""],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
    {
        name: "SilentTyping (Enhanced)",
        filename: "vc-silentTypingEnhanced",
        filesearch: "vc-silentTypingEnhanced",
        downloadUrl: "https://github.com/D3SOX/vc-silentTypingEnhanced/archive/refs/heads/master.zip",
        downloadFiles: ["index.tsx"],
        description: "Enhanced version of SilentTyping with the feature to disable it for specific guilds or users",
        tags: ["quiet"],
        dateAdded: "1734209767",
        options: {},
        customInfo: "Custom information specific to Example Plugin 1."
    },
];

