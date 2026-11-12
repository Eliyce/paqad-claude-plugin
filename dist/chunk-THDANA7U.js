import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/health/plugin-install.ts
init_esm_shims();
import { existsSync, readdirSync, readFileSync, readlinkSync, realpathSync } from "fs";
import { homedir } from "os";
import { dirname, join, resolve } from "path";
function frameworkLinkHome(env = process.env) {
  return env.PAQAD_FRAMEWORK_HOME ?? join(homedir(), ".paqad-ai", "current");
}
var PLUGIN_ID = "paqad@eliyce";
function installedPluginsPath() {
  return join(homedir(), ".claude", "plugins", "installed_plugins.json");
}
function isPluginInstalled(path = installedPluginsPath()) {
  try {
    const parsed = JSON.parse(readFileSync(path, "utf8"));
    return JSON.stringify(parsed).includes(PLUGIN_ID);
  } catch {
    return false;
  }
}
function readJsonFile(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return void 0;
  }
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function canonicalRoot(path) {
  let full;
  try {
    full = realpathSync.native(path);
  } catch {
    full = resolve(path);
  }
  const trimmed = full.replace(/[\\/]+$/, "");
  return process.platform === "win32" ? trimmed.toLowerCase() : trimmed;
}
function claudeConfigDir(env, home) {
  return env.CLAUDE_CONFIG_DIR || join(home, ".claude");
}
function entryLoadsHere(entry, projectRoot) {
  if (!isRecord(entry)) return false;
  const path = entry.installPath;
  if (typeof path !== "string" || path.trim() === "" || !existsSync(path)) return false;
  const scope = typeof entry.scope === "string" ? entry.scope : "user";
  if (scope !== "project" && scope !== "local") return true;
  return projectRoot !== null && typeof entry.projectPath === "string" && canonicalRoot(entry.projectPath) === canonicalRoot(projectRoot);
}
function pluginSwitchedOn(projectRoot, env, home) {
  const layers = [join(claudeConfigDir(env, home), "settings.json")];
  if (projectRoot !== null) {
    layers.push(
      join(projectRoot, ".claude", "settings.json"),
      join(projectRoot, ".claude", "settings.local.json")
    );
  }
  let enabled;
  for (const layer of layers) {
    const settings = readJsonFile(layer);
    const map = isRecord(settings) ? settings.enabledPlugins : void 0;
    if (isRecord(map) && typeof map[PLUGIN_ID] === "boolean") enabled = map[PLUGIN_ID];
  }
  return enabled !== false;
}
function projectPluginSwitch(projectRoot, file) {
  const settings = readJsonFile(join(projectRoot, ".claude", file));
  const map = isRecord(settings) ? settings.enabledPlugins : void 0;
  return isRecord(map) && typeof map[PLUGIN_ID] === "boolean" ? map[PLUGIN_ID] : void 0;
}
function projectTurnsPluginOn(projectRoot) {
  return projectPluginSwitch(projectRoot, "settings.json") === true;
}
function pluginOptedOutLocally(projectRoot) {
  return projectPluginSwitch(projectRoot, "settings.local.json") === false;
}
function pluginLoadState(projectRoot, options = {}) {
  const env = options.env ?? process.env;
  const home = options.home ?? homedir();
  const parsed = readJsonFile(
    join(claudeConfigDir(env, home), "plugins", "installed_plugins.json")
  );
  if (!isRecord(parsed) || parsed.version !== 2 || !isRecord(parsed.plugins)) return "unknown";
  const value = parsed.plugins[PLUGIN_ID];
  const entries = Array.isArray(value) ? value : [value];
  if (!entries.some((entry) => entryLoadsHere(entry, projectRoot))) return "absent";
  return pluginSwitchedOn(projectRoot, env, home) ? "live" : "absent";
}
var DISCOVERY_PLUGIN_PREFIX = "paqad-product-discovery@";
var DISCOVERY_CLASH_MESSAGE = "The paqad discovery plugin is installed next to the paqad plugin. Both are named paqad, so Claude Code may run the hooks of only one, and your stage checks can stop. Remove paqad discovery: the paqad plugin already has discover and ask.";
function childFolders(dir) {
  try {
    return readdirSync(dir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => join(dir, entry.name));
  } catch {
    return [];
  }
}
function syncedPaqadManifests(configDir) {
  const folders = childFolders(join(configDir, "plugins", "synced"));
  return [...folders, ...folders.flatMap(childFolders)].map((folder) => readJsonFile(join(folder, ".claude-plugin", "plugin.json"))).filter(isRecord).filter((manifest) => manifest.name === "paqad");
}
function discoveryPluginClash(options = {}) {
  const env = options.env ?? process.env;
  const configDir = claudeConfigDir(env, options.home ?? homedir());
  const installed = readJsonFile(join(configDir, "plugins", "installed_plugins.json"));
  const keys = isRecord(installed) && isRecord(installed.plugins) ? Object.keys(installed.plugins) : [];
  const synced = syncedPaqadManifests(configDir);
  const discovery = keys.some((key) => key.startsWith(DISCOVERY_PLUGIN_PREFIX)) || synced.some((manifest) => manifest.hooks === void 0);
  const engineering = keys.includes(PLUGIN_ID) || synced.some((manifest) => manifest.hooks !== void 0);
  return discovery && engineering;
}
function readPackageVersion(dir) {
  try {
    const parsed = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
    return typeof parsed.version === "string" ? parsed.version : null;
  } catch {
    return null;
  }
}
function readRuntimeCopyVersion(copyRoot) {
  try {
    const version = readFileSync(join(copyRoot, "version"), "utf8").trim();
    return version === "" ? null : version;
  } catch {
    return null;
  }
}
function readCopyVersion(dir) {
  return readPackageVersion(dir) ?? readRuntimeCopyVersion(dir);
}
function classifyFrameworkCopy(target) {
  if (target.includes("/plugins/") || target.includes("\\plugins\\")) return "plugin";
  if (target.includes("node_modules")) return "npm";
  return "unknown";
}
function describeFrameworkLink(env = process.env) {
  const home = frameworkLinkHome(env);
  let linkTarget;
  try {
    linkTarget = readlinkSync(home);
  } catch {
    linkTarget = null;
  }
  if (linkTarget === null) {
    const isDir = existsSync(home);
    return {
      home,
      linkTarget: null,
      targetExists: isDir,
      copy: isDir ? "directory" : "unknown",
      version: isDir ? readCopyVersion(dirname(home)) : null
    };
  }
  const targetExists = existsSync(linkTarget);
  return {
    home,
    linkTarget,
    targetExists,
    copy: targetExists ? classifyFrameworkCopy(linkTarget) : "unknown",
    version: targetExists ? readCopyVersion(dirname(linkTarget)) : null
  };
}

export {
  frameworkLinkHome,
  PLUGIN_ID,
  isPluginInstalled,
  projectTurnsPluginOn,
  pluginOptedOutLocally,
  pluginLoadState,
  DISCOVERY_CLASH_MESSAGE,
  discoveryPluginClash,
  readPackageVersion,
  readRuntimeCopyVersion,
  classifyFrameworkCopy,
  describeFrameworkLink
};
