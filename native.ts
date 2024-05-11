/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { exec } from "child_process";
import { unzip } from "fflate";
import { constants } from "fs";
import { access, mkdir, readdir, readFile, rm, unlink, writeFile } from "fs/promises";
import os from "os";
import { dirname, join } from "path";

import { PluginInfo } from "./types";

const pluginsDir = join(__dirname, "../src/userplugins");
const userDirectory = join(os.homedir(), "Vencord"); // Adjust the path as needed

async function ensureDirectoryExists(dir: string) {
    try {
        await mkdir(dir, { recursive: true });
        console.log("Directory created:", dir);
    } catch (error) {
        console.error("Error creating directory:", error);
        throw new Error(`Failed to create directory ${dir}: ${error}`);
    }
}

async function getInstalledPlugins(): Promise<string[]> {
    try {
        const files = await readdir(pluginsDir);
        console.log("Installed plugins:", files);
        return files;
    } catch (error) {
        console.error("Error retrieving installed plugins:", error);
        throw new Error("Failed to retrieve installed plugins.");
    }
}

const runShellCommand = (command, cwd) => {
    return new Promise((resolve, reject) => {
        exec(command, { cwd }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error}`);
                return reject(stderr);
            }
            console.log(stdout);
            resolve(stdout);
        });
    });
};

async function installPlugin(_: any, plugin: PluginInfo): Promise<void> {
    if (!plugin.downloadUrl) {
        throw new Error(`Download URL is undefined for plugin ${plugin.name}`);
    }

    const filePath = join(pluginsDir, (plugin.filename || "default") + ".zip");
    try {
        const response = await fetch(plugin.downloadUrl);
        if (!response.ok) throw new Error(`Failed to fetch ${plugin.downloadUrl}: ${response.statusText}`);

        const zipData = new Uint8Array(await response.arrayBuffer());
        await writeFile(filePath, zipData);

        const zipBuffer = await readFile(filePath);
        await extract(zipBuffer, pluginsDir, plugin);
        console.log(`Plugin ${plugin.name} extracted successfully.`);

        // Run pnpm build and inject commands
        await runShellCommand("pnpm build", userDirectory);
        console.log(`Build completed successfully in ${userDirectory}.`);

        await runShellCommand("pnpm inject", userDirectory);
        console.log(`Injection completed successfully in ${userDirectory}.`);
    } catch (error) {
        console.error(`Error installing ${plugin.name} plugin:`, error);
    }
}

async function extract(data: Buffer, pluginsDir: string, plugin: PluginInfo): Promise<void> {
    await ensureDirectoryExists(pluginsDir);
    const zipFilePath = join(pluginsDir, (plugin.filename || "default") + ".zip");
    const baseDir = plugin.filename && !plugin.filename.includes(".") ? join(pluginsDir, plugin.filename) : pluginsDir;

    return new Promise<void>((resolve, reject) => {
        unzip(data, async (err, files) => {
            if (err) return void reject(err);

            // Collect the first level directories from the paths
            const firstLevelDirs = new Set<string>();
            Object.keys(files).forEach(filePath => {
                const parts = filePath.split("/");
                if (parts.length > 1) {
                    firstLevelDirs.add(parts[0]);
                }
            });

            if (firstLevelDirs.size === 1) {
                const rootDirName = Array.from(firstLevelDirs)[0];
                const rootDirPath = join(pluginsDir, rootDirName);
                try {
                    const filesToMove = plugin.downloadFiles
                        ? Object.keys(files).filter(filePath =>
                            plugin.downloadFiles!.some(
                                pattern => filePath.startsWith(`${rootDirName}/${pattern}`)
                            )
                        )
                        : Object.keys(files);

                    // Move files and maintain the specified directory structure
                    await Promise.all(
                        filesToMove.map(async filePath => {
                            const srcPath = join(rootDirPath, filePath.replace(`${rootDirName}/`, ""));
                            // Maintain the directory structure as specified, but adjust to remove the rootDirName prefix
                            const relativePath = filePath.replace(`${rootDirName}/`, "");
                            const destPathComponents = relativePath.split("/");
                            // Check if the path refers to a directory or a file
                            const isDirectory = destPathComponents.slice(-1)[0].indexOf(".") === -1;
                            const destPath = isDirectory ? join(baseDir, relativePath) : join(baseDir, destPathComponents.slice(0, -1).join("/"), destPathComponents.slice(-1)[0]);

                            await mkdir(dirname(destPath), { recursive: true });

                            if (isDirectory) {
                                await mkdir(destPath, { recursive: true });
                            } else {
                                await writeFile(destPath, files[filePath]);
                            }
                        })
                    );

                    // Delete the now-empty root directory (ZIP folder) only if all its content has been moved
                    if (plugin.downloadFiles) {
                        await rm(rootDirPath, { recursive: true, force: true });
                    }

                    resolve();
                } catch (moveErr) {
                    console.error(`Error moving files: ${moveErr}`);
                    reject(moveErr);
                }
            } else {
                // If there's no single root folder or specific files to move, just extract normally
                try {
                    await Promise.all(
                        Object.keys(files).map(async filePath => {
                            const fullPath = join(baseDir, filePath);
                            await mkdir(dirname(fullPath), { recursive: true });
                            await writeFile(fullPath, files[filePath]);
                        })
                    );

                    resolve();
                } catch (writeErr) {
                    console.error(`Error writing files: ${writeErr}`);
                    reject(writeErr);
                }
            }

            // Delete the original ZIP file
            await rm(zipFilePath, { force: true });
        });
    });
}


async function moveFilesToRoot(srcDir: string, destDir: string) {
    const entries = await readdir(srcDir, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = join(srcDir, entry.name);
        const destPath = join(destDir, entry.name);
        if (entry.isDirectory()) {
            await moveFilesToRoot(srcPath, destPath);
            await rm(srcPath, { recursive: true });
        } else {
            await mkdir(dirname(destPath), { recursive: true });
            await writeFile(destPath, await readFile(srcPath));
            await unlink(srcPath);
        }
    }
}

async function uninstallPlugin(_: any, filename: string): Promise<void> {
    try {
        const filePath = join(pluginsDir, filename);
        await unlink(filePath);
        console.log(`Plugin ${filename} has been successfully uninstalled.`);
    } catch (error) {
        console.error(`Error uninstalling plugin ${filename}:`, error);
        throw new Error(`Uninstallation failed for ${filename}: ${error}`);
    }
}

async function updatePluginRepo() {
    const pluginInfo: PluginInfo = {
        name: "Plugins Repo",
        filename: "PluginsRepo",
        filesearch: "PluginsRepo",
        downloadUrl: "https://github.com/ScattrdBlade/PluginsRepo/archive/refs/heads/main.zip",
        description: "Updates the Plugin Repo with the latest files.",
        tags: ["management"],
        dateAdded: new Date().toISOString(),
        options: {},
    };

    const pluginDir = join(pluginsDir, pluginInfo.filename);

    // Remove existing plugin directory if it exists
    if (await checkExists(pluginDir)) {
        await rm(pluginDir, { recursive: true });
        console.log("Existing Plugin Repo removed.");
    }

    // Download and extract new plugin version
    try {
        const response = await fetch(pluginInfo.downloadUrl);
        if (!response.ok) throw new Error(`Failed to fetch ${pluginInfo.downloadUrl}: ${response.statusText}`);

        const zipDataArray = new Uint8Array(await response.arrayBuffer()); // Retrieve the data as a Uint8Array
        const zipData = Buffer.from(zipDataArray); // Convert to Buffer
        const zipFilePath = join(pluginsDir, pluginInfo.filename + ".zip");
        await writeFile(zipFilePath, zipData);
        console.log("Plugin zip file downloaded.");

        await extract(zipData, pluginsDir, pluginInfo);
        console.log("Plugin extracted successfully.");

        // Optionally run additional setup commands here
        await runShellCommand("pnpm build", pluginDir);
        console.log("Plugin build completed.");

        await runShellCommand("pnpm inject", pluginDir);
        console.log("Plugin injection completed.");
    } catch (error) {
        console.error("Error updating Plugin Repo:", error);
    }
}

async function checkExists(path: string): Promise<boolean> {
    try {
        await access(path, constants.F_OK);
        return true; // The file or directory exists
    } catch {
        return false; // The file or directory does not exist
    }
}

export { getInstalledPlugins, installPlugin, uninstallPlugin, updatePluginRepo };
