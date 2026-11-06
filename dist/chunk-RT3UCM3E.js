import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  frameworkLinkHome
} from "./chunk-VNMVILDR.js";
import {
  getPackageRoot
} from "./chunk-VVRAO2BK.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/core/optional-package.ts
init_esm_shims();
import { execFileSync, spawn } from "child_process";
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  writeFileSync
} from "fs";
import { createRequire } from "module";
import { dirname, isAbsolute, join, relative } from "path";
function alternateBases(env) {
  const bases = [];
  const pluginData = env.CLAUDE_PLUGIN_DATA;
  if (pluginData) {
    bases.push(join(pluginData, "package.json"));
  }
  try {
    const runtimeReal = realpathSync(frameworkLinkHome(env));
    bases.push(join(dirname(runtimeReal), "package.json"));
  } catch {
  }
  const globalRoot = npmGlobalRoot();
  if (globalRoot) {
    bases.push(join(globalRoot, "paqad-ai", "package.json"));
  }
  return bases;
}
function npmGlobalRoot() {
  try {
    const out = execFileSync("npm", ["root", "-g"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
    return out.length > 0 ? out : null;
  } catch {
    return null;
  }
}
function resolveOptionalPackage(name, env = process.env) {
  for (const base of [import.meta.url, ...alternateBases(env)]) {
    try {
      return createRequire(base).resolve(name);
    } catch {
    }
  }
  return null;
}
async function loadOptionalPackage(name, env = process.env) {
  try {
    return await import(name);
  } catch {
  }
  for (const base of alternateBases(env)) {
    let loaded;
    try {
      loaded = createRequire(base)(name);
    } catch {
      continue;
    }
    kickOffEngineInstall(env);
    return loaded;
  }
  kickOffEngineInstall(env);
  throw new Error(`optional package ${name} is not installed`);
}
function kickOffEngineInstall(env) {
  try {
    maybeStartOptionalEngineInstall(env);
  } catch {
  }
}
var OPTIONAL_ENGINES = ["@huggingface/transformers", "openai"];
var PRIMARY_ENGINE = "@huggingface/transformers";
var INSTALL_RETRY_INTERVAL_MS = 24 * 60 * 60 * 1e3;
var EXACT_VERSION = /^\d+\.\d+\.\d+$/;
var ENGINE_INSTALL_NETWORK_HINT = "If this machine is offline or behind a proxy, install the engine manually: run `npm install @huggingface/transformers` inside the CLAUDE_PLUGIN_DATA directory.";
function engineInstallNetworkHint(env = process.env) {
  const specs = readEngineSpecs(env);
  if (specs.length === 0) {
    return ENGINE_INSTALL_NETWORK_HINT;
  }
  return `If this machine is offline or behind a proxy, install the engine manually: run \`npm install ${specs.join(" ")} --save-exact\` inside the CLAUDE_PLUGIN_DATA directory.`;
}
function engineInstallArguments() {
  return [join(getPackageRoot(), "runtime", "scripts", "install-engine.mjs")];
}
function enginePaths(pluginData) {
  return {
    marker: join(pluginData, ".paqad-engine-install.json"),
    lock: join(pluginData, ".paqad-engine-install.lock"),
    log: join(pluginData, ".paqad-engine-install.log")
  };
}
function readInstallMarker(markerPath) {
  try {
    return JSON.parse(readFileSync(markerPath, "utf8"));
  } catch {
    return null;
  }
}
function pinnedEngineSpecs(pins) {
  if (typeof pins !== "object" || pins === null) {
    return [];
  }
  const specs = [];
  for (const name of OPTIONAL_ENGINES) {
    const version = pins[name];
    if (typeof version !== "string" || !EXACT_VERSION.test(version)) {
      return [];
    }
    specs.push(`${name}@${version}`);
  }
  return specs;
}
function readEngineSpecs(env) {
  try {
    const pkgRoot = dirname(realpathSync(frameworkLinkHome(env)));
    const pkg = JSON.parse(readFileSync(join(pkgRoot, "package.json"), "utf8"));
    if ("paqadEngines" in pkg) {
      return pinnedEngineSpecs(pkg.paqadEngines);
    }
    const deps = pkg.dependencies ?? {};
    const specs = [];
    for (const name of OPTIONAL_ENGINES) {
      const range = deps[name];
      if (typeof range === "string" && range.length > 0) {
        specs.push(`${name}@${range}`);
      }
    }
    return specs;
  } catch {
    return [];
  }
}
function isWithin(dir, file) {
  const rel = relative(dir, file);
  return rel.length > 0 && !rel.startsWith("..") && !isAbsolute(rel);
}
function resolvesFromPluginData(resolved, pluginData) {
  if (isWithin(pluginData, resolved)) {
    return true;
  }
  try {
    return isWithin(realpathSync(pluginData), resolved);
  } catch {
    return false;
  }
}
function installedSpecsMatch(marker, declared) {
  const installed = marker?.status === "ready" ? marker.specs : void 0;
  return Array.isArray(installed) && [...installed].sort().join(" ") === [...declared].sort().join(" ");
}
function maybeStartOptionalEngineInstall(env = process.env, deps = {}, options = {}) {
  const pluginData = env.CLAUDE_PLUGIN_DATA;
  if (!pluginData) {
    return "no-plugin-data";
  }
  const resolve = deps.resolve ?? resolveOptionalPackage;
  const resolved = resolve(PRIMARY_ENGINE, env);
  if (resolved !== null && !resolvesFromPluginData(resolved, pluginData)) {
    return "already-present";
  }
  const paths = enginePaths(pluginData);
  const marker = readInstallMarker(paths.marker);
  const specs = (deps.readSpecs ?? readEngineSpecs)(env);
  if (resolved !== null && (specs.length === 0 || installedSpecsMatch(marker, specs))) {
    return "already-present";
  }
  if (marker?.status === "installing" && existsSync(paths.lock)) {
    return "in-progress";
  }
  const now = deps.now ?? Date.now;
  if (marker && now() - Date.parse(marker.attempted_at) < INSTALL_RETRY_INTERVAL_MS) {
    return "throttled";
  }
  if (specs.length === 0) {
    return "no-pinned-range";
  }
  const installScript = deps.installScript ?? engineInstallArguments()[0];
  mkdirSync(pluginData, { recursive: true });
  if (!existsSync(installScript)) {
    appendFileSync(paths.log, `The engine install script is missing: ${installScript}
`);
    return "install-script-missing";
  }
  writeFileSync(
    join(pluginData, "package.json"),
    `${JSON.stringify({ private: true }, null, 2)}
`
  );
  writeFileSync(paths.lock, String(process.pid));
  writeFileSync(
    paths.marker,
    JSON.stringify({ status: "installing", attempted_at: new Date(now()).toISOString(), specs })
  );
  (deps.startInstall ?? spawnEngineInstall)(specs, pluginData, paths, options.projectRoot);
  return "started";
}
function spawnEngineInstall(specs, dir, paths, projectRoot) {
  const child = spawn(process.execPath, engineInstallArguments(), {
    detached: true,
    stdio: "ignore",
    windowsHide: true,
    env: {
      ...process.env,
      PAQAD_ENGINE_SPECS: specs.join(" "),
      PAQAD_ENGINE_DIR: dir,
      PAQAD_ENGINE_LOG: paths.log,
      PAQAD_ENGINE_MARKER: paths.marker,
      PAQAD_ENGINE_LOCK: paths.lock,
      ...projectRoot ? {
        PAQAD_ENGINE_REBUILD_ROOT: projectRoot,
        PAQAD_ENGINE_CLI: join(getPackageRoot(), "dist", "cli", "index.js")
      } : {}
    }
  });
  child.unref();
}
function describeOptionalEngine(env = process.env, deps = {}) {
  const resolve = deps.resolve ?? resolveOptionalPackage;
  if (resolve(PRIMARY_ENGINE, env) !== null) {
    return { state: "ready" };
  }
  const pluginData = env.CLAUDE_PLUGIN_DATA;
  if (pluginData) {
    const marker = readInstallMarker(enginePaths(pluginData).marker);
    if (marker?.status === "installing") {
      return { state: "installing" };
    }
    if (marker?.status === "failed") {
      return {
        state: "install failed",
        detail: (marker.error ?? "").split("\n")[0],
        hint: engineInstallNetworkHint(env)
      };
    }
  }
  return { state: "not installed" };
}

export {
  loadOptionalPackage,
  engineInstallNetworkHint,
  maybeStartOptionalEngineInstall,
  describeOptionalEngine
};
