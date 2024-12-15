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
        // Convert Buffer to Uint8Array using Uint8Array.from()
        const uint8Array = Uint8Array.from(data);
        unzip(uint8Array, async (err, files) => {
            if (err) return void reject(err);

            try {
                if (plugin.downloadFiles) {
                    // Get the actual root directory from the ZIP
                    const firstLevelDirs = new Set<string>();
                    Object.keys(files).forEach(filePath => {
                        const parts = filePath.split("/");
                        if (parts.length > 1) {
                            firstLevelDirs.add(parts[0]);
                        }
                    });

                    const rootDirName = firstLevelDirs.size === 1 ? Array.from(firstLevelDirs)[0] : "";

                    // Check if this is a multi-file plugin with a common prefix
                    const paths = plugin.downloadFiles.map(f => f.split("/"));
                    const commonPrefix: string[] = [];

                    if (paths.length > 0 && paths[0].length > 1) {
                        // Only look for common prefix if at least one path has multiple segments
                        const firstPath = paths[0];
                        for (let i = 0; i < firstPath.length - 1; i++) {
                            const segment = firstPath[i];
                            if (paths.every(path => path[i] === segment)) {
                                commonPrefix.push(segment);
                            } else {
                                break;
                            }
                        }
                    }

                    const commonPrefixStr = commonPrefix.join("/");

                    // Find matching files in the ZIP
                    const filesToMove = Object.keys(files).filter(filePath => {
                        if (commonPrefixStr) {
                            // Multi-file case with common prefix
                            const zipPath = `${rootDirName}/${commonPrefixStr}`;
                            return plugin.downloadFiles!.some(pattern => {
                                const targetPath = pattern.substring(commonPrefixStr.length + 1);
                                return filePath.startsWith(`${zipPath}/${targetPath}`);
                            });
                        } else {
                            // Multi-file or single file case without prefix
                            return plugin.downloadFiles!.some(pattern => {
                                // Check if the file matches exactly or is inside a requested directory
                                const inRequestedDir = plugin.downloadFiles!.some(dir => {
                                    // If dir doesn't have an extension, treat it as a directory
                                    if (!dir.includes(".")) {
                                        return filePath === `${rootDirName}/${dir}` ||
                                            filePath.startsWith(`${rootDirName}/${dir}/`);
                                    }
                                    return false;
                                });

                                // Check for exact file matches
                                const exactMatch = filePath === pattern ||
                                    filePath === `${rootDirName}/${pattern}` ||
                                    filePath.endsWith(`/${pattern}`);

                                return exactMatch || inRequestedDir;
                            });
                        }
                    });

                    // Create plugin directory if needed
                    if (plugin.filename && !plugin.filename.includes(".")) {
                        await mkdir(baseDir, { recursive: true });
                    }

                    // Move files while maintaining the desired structure
                    await Promise.all(
                        filesToMove.map(async filePath => {
                            let relativePath;
                            if (commonPrefixStr) {
                                // Multi-file case: remove root dir and common prefix
                                relativePath = filePath
                                    .replace(`${rootDirName}/`, "")
                                    .replace(`${commonPrefixStr}/`, "");
                            } else {
                                // For files in directories or root files
                                relativePath = filePath.replace(`${rootDirName}/`, "");
                            }

                            const destPath = join(baseDir, relativePath);
                            await mkdir(dirname(destPath), { recursive: true });

                            const isDirectory = !relativePath.includes(".");
                            if (isDirectory) {
                                await mkdir(destPath, { recursive: true });
                            } else {
                                await writeFile(destPath, files[filePath]);
                            }
                        })
                    );

                    // Cleanup: remove the root directory if it exists
                    if (rootDirName) {
                        const rootPath = join(pluginsDir, rootDirName);
                        await rm(rootPath, { recursive: true, force: true });
                    }
                } else {
                    // Default behavior for when no specific files are requested
                    await Promise.all(
                        Object.keys(files).map(async filePath => {
                            const fullPath = join(baseDir, filePath);
                            await mkdir(dirname(fullPath), { recursive: true });
                            await writeFile(fullPath, files[filePath]);
                        })
                    );
                }

                // Delete the original ZIP file
                await rm(zipFilePath, { force: true });

                resolve();
            } catch (err) {
                console.error(`Error moving or renaming files: ${err}`);
                reject(err);
            }
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
            // Convert the Buffer to Uint8Array
            const fileContent = await readFile(srcPath);
            await writeFile(destPath, new Uint8Array(fileContent));
            await unlink(srcPath);
        }
    }
}

async function uninstallPlugin(_, plugin: PluginInfo): Promise<void> {
    try {
        if (plugin.downloadFiles && plugin.downloadFiles.length > 0) {
            const parentDirs = new Set<string>();

            for (const originalFileName of plugin.downloadFiles) {
                // Assuming files may be renamed to `plugin.filename` during installation if specified
                const renamedFileName = plugin.filename || originalFileName;
                const fullPath = join(pluginsDir, renamedFileName);
                await rm(fullPath, { recursive: true, force: true });
                // Collect parent directories to potentially remove later
                parentDirs.add(dirname(fullPath));
            }

            // Additional cleanup to remove any empty parent directories
            for (const dir of parentDirs) {
                if ((await readdir(dir)).length === 0) { // Check if the directory is empty
                    await rm(dir, { recursive: true, force: true });
                }
            }
        } else if (plugin.filename) {
            // If no specific files are listed, remove the entire plugin directory/file
            const fullPath = join(pluginsDir, plugin.filename);
            await rm(fullPath, { recursive: true, force: true });
        }

        console.log(`Plugin ${plugin.name} has been successfully uninstalled.`);
    } catch (error) {
        console.error(`Error uninstalling plugin ${plugin.name}:`, error);
        throw new Error(`Uninstallation failed for ${plugin.name}: ${error}`);
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

    try {
        const response = await fetch(pluginInfo.downloadUrl);
        if (!response.ok) throw new Error(`Failed to fetch ${pluginInfo.downloadUrl}: ${response.statusText}`);

        // Get the data as Uint8Array
        const zipDataArray = new Uint8Array(await response.arrayBuffer());
        const zipFilePath = join(pluginsDir, pluginInfo.filename + ".zip");

        // Write the file using Uint8Array
        await writeFile(zipFilePath, zipDataArray);
        console.log("Plugin zip file downloaded.");

        // Convert to Buffer for the extract function
        const zipBuffer = Buffer.from(zipDataArray);
        await extract(zipBuffer, pluginsDir, pluginInfo);
        console.log("Plugin extracted successfully.");

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
