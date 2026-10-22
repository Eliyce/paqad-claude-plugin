import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);

// src/core/optional-package.ts
import { execFileSync, spawn } from "child_process";
import { existsSync as existsSync2, mkdirSync, readFileSync as readFileSync3, realpathSync, writeFileSync } from "fs";
import { createRequire } from "module";
import { dirname as dirname3, isAbsolute, join as join3, relative } from "path";

// src/core/runtime-paths.ts
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
var PACKAGE_NAME = "paqad-ai";
var packageRoot = null;
function isPaqadPackageDir(dir) {
  try {
    const parsed = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
    return parsed?.name === PACKAGE_NAME;
  } catch {
    return false;
  }
}
function findPackageRoot(start) {
  let dir = start;
  for (; ; ) {
    if (isPaqadPackageDir(dir)) return dir;
    const parent = dirname(dir);
    if (parent === dir) {
      throw new Error(`${PACKAGE_NAME}: could not find the package root above ${start}`);
    }
    dir = parent;
  }
}
function getPackageRoot() {
  packageRoot ??= findPackageRoot(dirname(fileURLToPath(import.meta.url)));
  return packageRoot;
}

// src/health/plugin-install.ts
import { existsSync, readFileSync as readFileSync2, readlinkSync } from "fs";
import { homedir } from "os";
import { dirname as dirname2, join as join2 } from "path";
function frameworkLinkHome(env = process.env) {
  return env.PAQAD_FRAMEWORK_HOME ?? join2(homedir(), ".paqad-ai", "current");
}

// src/core/optional-package.ts
function alternateBases(env) {
  const bases = [];
  const pluginData = env.CLAUDE_PLUGIN_DATA;
  if (pluginData) {
    bases.push(join3(pluginData, "package.json"));
  }
  try {
    const runtimeReal = realpathSync(frameworkLinkHome(env));
    bases.push(join3(dirname3(runtimeReal), "package.json"));
  } catch {
  }
  const globalRoot = npmGlobalRoot();
  if (globalRoot) {
    bases.push(join3(globalRoot, "paqad-ai", "package.json"));
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
function enginePaths(pluginData) {
  return {
    marker: join3(pluginData, ".paqad-engine-install.json"),
    lock: join3(pluginData, ".paqad-engine-install.lock"),
    log: join3(pluginData, ".paqad-engine-install.log")
  };
}
function readInstallMarker(markerPath) {
  try {
    return JSON.parse(readFileSync3(markerPath, "utf8"));
  } catch {
    return null;
  }
}
function readEngineSpecs(env) {
  try {
    const pkgRoot = dirname3(realpathSync(frameworkLinkHome(env)));
    const pkg = JSON.parse(readFileSync3(join3(pkgRoot, "package.json"), "utf8"));
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
  if (marker?.status === "installing" && existsSync2(paths.lock)) {
    return "in-progress";
  }
  const now = deps.now ?? Date.now;
  if (marker && now() - Date.parse(marker.attempted_at) < INSTALL_RETRY_INTERVAL_MS) {
    return "throttled";
  }
  if (specs.length === 0) {
    return "no-pinned-range";
  }
  mkdirSync(pluginData, { recursive: true });
  writeFileSync(
    join3(pluginData, "package.json"),
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
  const installer = `
    const { execFileSync } = require('node:child_process');
    const { openSync, writeFileSync, rmSync } = require('node:fs');
    const specs = process.env.PAQAD_ENGINE_SPECS.split(' ');
    try {
      const fd = openSync(process.env.PAQAD_ENGINE_LOG, 'a');
      execFileSync('npm', ['install', ...specs, '--no-audit', '--no-fund', '--omit=dev'], {
        cwd: process.env.PAQAD_ENGINE_DIR, stdio: ['ignore', fd, fd],
      });
      writeFileSync(process.env.PAQAD_ENGINE_MARKER, JSON.stringify({ status: 'ready', attempted_at: new Date().toISOString(), specs }));
      if (process.env.PAQAD_ENGINE_REBUILD_ROOT && process.env.PAQAD_ENGINE_CLI) {
        try {
          execFileSync(process.execPath, [process.env.PAQAD_ENGINE_CLI, 'rag', 'rebuild', '--project-root', process.env.PAQAD_ENGINE_REBUILD_ROOT], {
            cwd: process.env.PAQAD_ENGINE_REBUILD_ROOT, stdio: ['ignore', fd, fd],
          });
        } catch {}
      }
    } catch (e) {
      const msg = String(e && e.message ? e.message : e).split('\\n')[0];
      writeFileSync(process.env.PAQAD_ENGINE_MARKER, JSON.stringify({ status: 'failed', attempted_at: new Date().toISOString(), error: msg }));
    } finally {
      try { rmSync(process.env.PAQAD_ENGINE_LOCK); } catch {}
    }
  `;
  const child = spawn(process.execPath, ["-e", installer], {
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
        PAQAD_ENGINE_CLI: join3(getPackageRoot(), "dist", "cli", "index.js")
      } : {}
    }
  });
  child.unref();
}

// src/context/tokenizer-cache.ts
var HEURISTIC_TOKENIZER_VERSION = "heuristic";
var cache = /* @__PURE__ */ new Map();
function heuristicCount(text) {
  return Math.ceil(text.length / 4);
}
function heuristicTokenizer() {
  return {
    tokenizer_version: HEURISTIC_TOKENIZER_VERSION,
    countTokens: heuristicCount
  };
}
async function loadTokenizer(version) {
  try {
    const { AutoTokenizer } = await loadOptionalPackage(
      "@huggingface/transformers"
    );
    const native = await AutoTokenizer.from_pretrained(version);
    return {
      tokenizer_version: version,
      countTokens: (text) => native.encode(text).length
    };
  } catch {
    return heuristicTokenizer();
  }
}
function getOrLoad(version) {
  const cached = cache.get(version);
  if (cached) {
    return cached;
  }
  const loading = loadTokenizer(version);
  cache.set(version, loading);
  return loading;
}
function clearTokenizerCache() {
  cache.clear();
}
export {
  HEURISTIC_TOKENIZER_VERSION,
  clearTokenizerCache,
  getOrLoad
};
//# sourceMappingURL=tokenizer-cache.js.map