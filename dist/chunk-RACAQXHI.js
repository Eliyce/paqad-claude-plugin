import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/health/plugin-install.ts
init_esm_shims();
import { existsSync, readFileSync, readlinkSync } from "fs";
import { homedir } from "os";
import { dirname, join } from "path";
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
  readPackageVersion,
  readRuntimeCopyVersion,
  classifyFrameworkCopy,
  describeFrameworkLink
};
