import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  StackSnapshotCache
} from "./chunk-WRHJCBRI.js";
import {
  buildDetectedStackProfile
} from "./chunk-HNYZUZ7D.js";
import {
  DEFAULT_IGNORE_GLOBS,
  dropGitIgnored,
  scanWorkingTree
} from "./chunk-LBNBI3D6.js";
import {
  require_out
} from "./chunk-P4RPU2KB.js";
import {
  toPosixPath
} from "./chunk-LYNDVGNE.js";
import {
  layeredConfigMap,
  readTextIfExistsSync,
  require_dist
} from "./chunk-ACJQW7SB.js";
import {
  renameWithRetrySync
} from "./chunk-Z3NGWHFX.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/rules-discovery/nudge.ts
init_esm_shims();
import { createHash } from "crypto";
import { readFileSync as readFileSync3 } from "fs";
import { basename as basename3, join as join9 } from "path";

// src/introspection/ecosystems/registry.ts
init_esm_shims();
var import_fast_glob = __toESM(require_out(), 1);

// src/introspection/ecosystems/shared.ts
init_esm_shims();
import { readFile } from "fs/promises";
import { join } from "path";
async function readProjectFile(projectRoot, relativePath) {
  try {
    return await readFile(join(projectRoot, relativePath), "utf8");
  } catch {
    return null;
  }
}
function readJson(content) {
  try {
    return JSON.parse(content);
  } catch {
    return null;
  }
}
function normalizeConstraint(value) {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (value && typeof value === "object") {
    const record = value;
    if (typeof record.path === "string") {
      return `path:${record.path}`;
    }
    if (typeof record.git === "string" || record.git && typeof record.git === "object") {
      const git = record.git;
      return `git:${typeof git === "string" ? git : String(git.url ?? "")}`;
    }
    if (typeof record.sdk === "string") {
      return `sdk:${record.sdk}`;
    }
    if (typeof record.version === "string") {
      return record.version;
    }
  }
  return "unknown";
}
function parseKeyValueLines(content, separator) {
  return content.split("\n").map((line) => line.trim()).filter((line) => line !== "" && !line.startsWith("#")).map((line) => {
    const index = line.indexOf(separator);
    if (index === -1) {
      return null;
    }
    const name = line.slice(0, index).trim();
    const value = line.slice(index + separator.length).trim();
    if (name === "" || value === "") {
      return null;
    }
    return { name, value };
  }).filter((entry) => entry !== null);
}

// src/introspection/ecosystems/dart.ts
init_esm_shims();
var import_yaml = __toESM(require_dist(), 1);
var dartParser = {
  ecosystem: "dart",
  packageManager: "pub",
  manifestFiles: ["pubspec.yaml"],
  lockfileFiles: ["pubspec.lock"],
  parseManifest(content) {
    let parsed;
    try {
      parsed = import_yaml.default.parse(content);
    } catch {
      parsed = null;
    }
    return {
      ecosystem: "dart",
      packages: [
        ...Object.entries(parsed?.dependencies ?? {}).map(([name, value]) => ({
          name,
          constraint: normalizeConstraint(value),
          isDev: false
        })),
        ...Object.entries(parsed?.dev_dependencies ?? {}).map(([name, value]) => ({
          name,
          constraint: normalizeConstraint(value),
          isDev: true
        }))
      ].sort((left, right) => left.name.localeCompare(right.name))
    };
  },
  parseLockfile(content) {
    let parsed;
    try {
      parsed = import_yaml.default.parse(content);
    } catch {
      parsed = null;
    }
    return {
      ecosystem: "dart",
      packages: Object.entries(parsed?.packages ?? {}).filter(([, value]) => typeof value.version === "string").map(([name, value]) => ({ name, version: value.version })).sort((left, right) => left.name.localeCompare(right.name))
    };
  }
};

// src/introspection/ecosystems/dotnet.ts
init_esm_shims();
var dotnetParser = {
  ecosystem: "dotnet",
  packageManager: "nuget",
  manifestFiles: ["*.csproj"],
  lockfileFiles: ["packages.lock.json"],
  parseManifest(content) {
    return {
      ecosystem: "dotnet",
      packages: Array.from(
        content.matchAll(/<PackageReference\b([^>]*?)(\/>|>([\s\S]*?)<\/PackageReference>)/g)
      ).map((match) => {
        const attributes = match[1] ?? "";
        const name = /\bInclude\s*=\s*"([^"]+)"/.exec(attributes)?.[1];
        if (!name) {
          return null;
        }
        const version = /\bVersion\s*=\s*"([^"]+)"/.exec(attributes)?.[1] ?? /<Version>([^<]+)<\/Version>/.exec(match[3] ?? "")?.[1];
        const privateAssets = /\bPrivateAssets\s*=\s*"all"/i.test(attributes) || /<PrivateAssets>\s*all\s*<\/PrivateAssets>/i.test(match[3] ?? "");
        return { name, constraint: version, isDev: privateAssets };
      }).filter(
        (entry) => entry !== null
      ).sort((left, right) => left.name.localeCompare(right.name))
    };
  },
  parseLockfile(content) {
    const parsed = readJson(content);
    const seen = /* @__PURE__ */ new Map();
    for (const framework of Object.values(parsed?.dependencies ?? {})) {
      for (const [name, entry] of Object.entries(framework)) {
        if (entry.type === "Direct" && typeof entry.resolved === "string" && !seen.has(name)) {
          seen.set(name, entry.resolved);
        }
      }
    }
    return {
      ecosystem: "dotnet",
      packages: [...seen.entries()].map(([name, version]) => ({ name, version })).sort((left, right) => left.name.localeCompare(right.name))
    };
  }
};

// src/introspection/ecosystems/go.ts
init_esm_shims();
var goParser = {
  ecosystem: "go",
  packageManager: "go",
  manifestFiles: ["go.mod"],
  lockfileFiles: ["go.sum"],
  parseManifest(content) {
    return {
      ecosystem: "go",
      packages: goRequireLines(content).map((line) => /^([^\s]+)\s+([^\s]+)/.exec(line)).filter((match) => match !== null).map((match) => ({
        name: match[1],
        constraint: match[2],
        isDev: false
      }))
    };
  },
  parseLockfile(content) {
    return {
      ecosystem: "go",
      packages: content.split("\n").map((line) => line.trim()).filter((line) => line !== "").map((line) => {
        const [name, version] = line.split(/\s+/, 3);
        if (!name || !version) {
          return null;
        }
        return { name, version };
      }).filter((entry) => entry !== null)
    };
  }
};
function goRequireLines(content) {
  const lines = [];
  let inBlock = false;
  for (const raw of content.split("\n")) {
    const line = raw.replace(/\/\/.*$/, "").trim();
    if (inBlock) {
      if (line === ")") {
        inBlock = false;
      } else if (line !== "") {
        lines.push(line);
      }
      continue;
    }
    if (/^require\s*\($/.test(line)) {
      inBlock = true;
    } else if (line.startsWith("require ")) {
      lines.push(line.slice("require ".length).trim());
    }
  }
  return lines;
}
function goLocalReplacements(content) {
  const names = [];
  let inBlock = false;
  for (const raw of content.split("\n")) {
    const line = raw.replace(/\/\/.*$/, "").trim();
    if (/^replace\s*\($/.test(line)) {
      inBlock = true;
      continue;
    }
    if (inBlock && line === ")") {
      inBlock = false;
      continue;
    }
    const body = inBlock ? line : line.startsWith("replace ") ? line.slice(8).trim() : null;
    const match = body === null ? null : /^([^\s]+)(?:\s+[^\s]+)?\s*=>\s*([^\s]+)/.exec(body);
    if (match?.[1] && match[2] && /^(\.{1,2}\/|\/)/.test(match[2])) {
      names.push(match[1]);
    }
  }
  return names;
}

// src/introspection/ecosystems/jvm.ts
init_esm_shims();
var jvmParser = {
  ecosystem: "jvm",
  packageManager: "gradle",
  manifestFiles: ["build.gradle", "build.gradle.kts", "pom.xml"],
  lockfileFiles: ["gradle.lockfile"],
  parseManifest(content, filename) {
    if (filename === "pom.xml") {
      return {
        ecosystem: "jvm",
        packages: Array.from(
          content.matchAll(
            /<dependency>[\s\S]*?<groupId>([^<]+)<\/groupId>[\s\S]*?<artifactId>([^<]+)<\/artifactId>[\s\S]*?(?:<version>([^<]+)<\/version>)?[\s\S]*?<\/dependency>/g
          )
        ).map((match) => ({
          name: `${match[1]}:${match[2]}`,
          constraint: match[3],
          isDev: false
        }))
      };
    }
    return {
      ecosystem: "jvm",
      packages: Array.from(
        content.matchAll(
          /(?:implementation|api|compileOnly|runtimeOnly|testImplementation)\s*\(?["']([^:"']+):([^:"']+):([^"')]+)["']\)?/g
        )
      ).map((match) => ({
        name: `${match[1]}:${match[2]}`,
        constraint: match[3],
        isDev: match[0].startsWith("test")
      }))
    };
  },
  parseLockfile(content) {
    return {
      ecosystem: "jvm",
      packages: content.split("\n").map((line) => line.trim()).filter((line) => line !== "" && !line.startsWith("#")).map((line) => {
        const [name, version] = line.split("=");
        if (!name || !version) {
          return null;
        }
        return { name, version };
      }).filter((entry) => entry !== null)
    };
  }
};

// src/introspection/ecosystems/node-npm.ts
init_esm_shims();
var npmParser = {
  ecosystem: "node",
  packageManager: "npm",
  manifestFiles: ["package.json"],
  lockfileFiles: ["package-lock.json", "yarn.lock"],
  parseManifest(content) {
    const parsed = readJson(content);
    return {
      ecosystem: "node",
      packages: [
        ...Object.entries(parsed?.dependencies ?? {}).map(([name, constraint]) => ({
          name,
          constraint,
          isDev: false
        })),
        ...Object.entries(parsed?.devDependencies ?? {}).map(([name, constraint]) => ({
          name,
          constraint,
          isDev: true
        }))
      ].sort((left, right) => left.name.localeCompare(right.name)),
      scripts: parsed?.scripts ?? {}
    };
  },
  parseLockfile(content, filename) {
    if (filename === "yarn.lock") {
      return { ecosystem: "node", packages: parseYarnLock(content) };
    }
    const parsed = readJson(content);
    return {
      ecosystem: "node",
      packages: Object.entries(parsed?.packages ?? {}).filter(([key, value]) => key.startsWith("node_modules/") && value.version !== void 0).map(([key, value]) => ({
        name: key.replace(/^node_modules\//, ""),
        version: value.version
      })).sort((left, right) => left.name.localeCompare(right.name))
    };
  }
};
function parseYarnLock(content) {
  const entries = /* @__PURE__ */ new Map();
  for (const block of content.split(/\n(?=\S)/)) {
    const header = block.split("\n")[0]?.trim() ?? "";
    if (header === "" || header.startsWith("#") || header.startsWith("__metadata")) {
      continue;
    }
    const first = header.replace(/:$/, "").split(",")[0]?.trim().replace(/^"|"$/g, "") ?? "";
    const at = first.indexOf("@", first.startsWith("@") ? 1 : 0);
    const name = at > 0 ? first.slice(0, at) : first;
    const version = /^\s+version:?\s+"?([^"\s]+)"?/m.exec(block)?.[1];
    const resolved = /^\s+(?:resolved|resolution):?\s+"?([^"\s]+)"?/m.exec(block)?.[1];
    if (name !== "" && version !== void 0 && !entries.has(name)) {
      entries.set(name, resolved === void 0 ? { name, version } : { name, version, resolved });
    }
  }
  return [...entries.values()].sort((left, right) => left.name.localeCompare(right.name));
}

// src/introspection/ecosystems/node-pnpm.ts
init_esm_shims();
var import_yaml2 = __toESM(require_dist(), 1);
var pnpmParser = {
  ecosystem: "node",
  packageManager: "pnpm",
  manifestFiles: ["package.json"],
  lockfileFiles: ["pnpm-lock.yaml"],
  parseManifest(content) {
    const parsed = readJson(content);
    return {
      ecosystem: "node",
      packages: [
        ...Object.entries(parsed?.dependencies ?? {}).map(([name, constraint]) => ({
          name,
          constraint,
          isDev: false
        })),
        ...Object.entries(parsed?.devDependencies ?? {}).map(([name, constraint]) => ({
          name,
          constraint,
          isDev: true
        }))
      ].sort((left, right) => left.name.localeCompare(right.name)),
      scripts: parsed?.scripts ?? {}
    };
  },
  parseLockfile(content) {
    let parsed;
    try {
      parsed = import_yaml2.default.parse(content);
    } catch {
      parsed = null;
    }
    return {
      ecosystem: "node",
      packages: Object.entries(parsed?.packages ?? {}).map(([key, value]) => {
        const match = key.match(/^\/?(@?[^@/]+(?:\/[^@/]+)?)@([^(@]+)?/);
        const version = value.version ?? match?.[2];
        if (!match?.[1] || version === void 0) {
          return null;
        }
        return {
          name: match[1],
          version
        };
      }).filter((entry) => entry !== null).sort((left, right) => left.name.localeCompare(right.name))
    };
  }
};

// src/introspection/ecosystems/php.ts
init_esm_shims();
var phpParser = {
  ecosystem: "php",
  packageManager: "composer",
  manifestFiles: ["composer.json"],
  lockfileFiles: ["composer.lock"],
  parseManifest(content) {
    const parsed = readJson(content);
    return {
      ecosystem: "php",
      packages: [
        ...Object.entries(parsed?.require ?? {}).map(([name, constraint]) => ({
          name,
          constraint,
          isDev: false
        })),
        ...Object.entries(parsed?.["require-dev"] ?? {}).map(([name, constraint]) => ({
          name,
          constraint,
          isDev: true
        }))
      ].sort((left, right) => left.name.localeCompare(right.name))
    };
  },
  parseLockfile(content) {
    const parsed = readJson(content);
    return {
      ecosystem: "php",
      packages: [...parsed?.packages ?? [], ...parsed?.["packages-dev"] ?? []].map((pkg) => ({ name: pkg.name, version: pkg.version })).sort((left, right) => left.name.localeCompare(right.name))
    };
  }
};

// src/introspection/ecosystems/python.ts
init_esm_shims();
function parsePythonManifest(content, filename) {
  const trimmed = filename.toLowerCase();
  if (trimmed === "requirements.txt") {
    return {
      ecosystem: "python",
      packages: parseKeyValueLines(content, "==").map(({ name, value }) => ({
        name,
        constraint: value,
        isDev: false
      }))
    };
  }
  if (trimmed === "pyproject.toml") {
    return { ecosystem: "python", packages: parsePyproject(content) };
  }
  const matches = Array.from(
    content.matchAll(/^[ \t]*["']?([A-Za-z0-9_.-]+)["']?\s*(?:[<>=!~]=?.+)?/gm)
  );
  return {
    ecosystem: "python",
    packages: matches.map((match) => match[1]?.trim()).filter((name) => Boolean(name) && !name.startsWith("[")).map((name) => ({ name, isDev: false }))
  };
}
var pythonParser = {
  ecosystem: "python",
  packageManager: "pip",
  manifestFiles: ["requirements.txt", "pyproject.toml", "Pipfile", "setup.py"],
  lockfileFiles: ["Pipfile.lock", "poetry.lock", "uv.lock"],
  parseManifest(content, filename) {
    return parsePythonManifest(content, filename);
  },
  parseLockfile(content, filename) {
    if (filename === "Pipfile.lock") {
      try {
        const parsed = JSON.parse(content);
        return {
          ecosystem: "python",
          packages: [
            ...Object.entries(parsed.default ?? {}),
            ...Object.entries(parsed.develop ?? {})
          ].filter(([, value]) => typeof value.version === "string").map(([name, value]) => ({ name, version: value.version }))
        };
      } catch {
        return { ecosystem: "python", packages: [] };
      }
    }
    const tomlPackages = Array.from(
      content.matchAll(/\[\[package\]\]\s*\nname\s*=\s*"([^"]+)"\s*\nversion\s*=\s*"([^"]+)"/g)
    ).map((match) => ({ name: match[1], version: match[2] }));
    if (tomlPackages.length > 0) {
      return { ecosystem: "python", packages: tomlPackages };
    }
    return {
      ecosystem: "python",
      packages: parseKeyValueLines(content, "==").map(({ name, value }) => ({
        name,
        version: value
      }))
    };
  }
};
function parsePyproject(content) {
  const packages = /* @__PURE__ */ new Map();
  const add = (name, constraint, isDev) => {
    if (name === "" || name.toLowerCase() === "python" || packages.has(name)) {
      return;
    }
    packages.set(name, constraint === void 0 ? { name, isDev } : { name, constraint, isDev });
  };
  const requirement = (spec, isDev) => {
    const match = /^\s*([A-Za-z0-9_.-]+)(?:\[[^\]]*\])?\s*(.*)$/.exec(spec);
    if (match?.[1]) {
      add(match[1], match[2]?.trim() || void 0, isDev);
    }
  };
  let section = "";
  let arrayFor = null;
  for (const raw of content.split("\n")) {
    const line = raw.trim();
    if (arrayFor !== null) {
      for (const quoted of line.matchAll(/["']([^"']+)["']/g)) {
        requirement(quoted[1] ?? "", arrayFor === "dev");
      }
      if (line.includes("]")) {
        arrayFor = null;
      }
      continue;
    }
    const header = /^\[([^\]]+)\]$/.exec(line);
    if (header) {
      section = header[1]?.trim() ?? "";
      continue;
    }
    const isDevTable = /^tool\.poetry\.(dev-dependencies|group\.[^.]+\.dependencies)$/.test(
      section
    );
    if (section === "tool.poetry.dependencies" || isDevTable) {
      const entry = /^([A-Za-z0-9_.-]+)\s*=\s*(.+)$/.exec(line);
      if (entry?.[1]) {
        const plain = /^"([^"]*)"$/.exec(entry[2]?.trim() ?? "");
        const table = /\bversion\s*=\s*"([^"]+)"/.exec(entry[2] ?? "");
        const path = /\bpath\s*=\s*"([^"]+)"/.exec(entry[2] ?? "");
        const git = /\bgit\s*=\s*"([^"]+)"/.exec(entry[2] ?? "");
        add(
          entry[1],
          plain?.[1] ?? table?.[1] ?? (path ? `path:${path[1]}` : git ? `git:${git[1]}` : void 0),
          isDevTable
        );
      }
      continue;
    }
    const isProjectDeps = section === "project" && /^dependencies\s*=\s*\[/.test(line);
    const isDevGroup = (section === "project.optional-dependencies" || section === "dependency-groups") && /^(dev|test|tests|lint)\s*=\s*\[/.test(line);
    if (isProjectDeps || isDevGroup) {
      const body = line.slice(line.indexOf("[") + 1);
      for (const quoted of body.matchAll(/["']([^"']+)["']/g)) {
        requirement(quoted[1] ?? "", isDevGroup);
      }
      if (!body.includes("]")) {
        arrayFor = isDevGroup ? "dev" : "deps";
      }
    }
  }
  return [...packages.values()].sort((left, right) => left.name.localeCompare(right.name));
}

// src/introspection/ecosystems/ruby.ts
init_esm_shims();
var rubyParser = {
  ecosystem: "ruby",
  packageManager: "bundler",
  manifestFiles: ["Gemfile"],
  lockfileFiles: ["Gemfile.lock"],
  parseManifest(content) {
    return {
      ecosystem: "ruby",
      packages: Array.from(
        content.matchAll(/gem\s+["']([^"']+)["'](?:,\s*["']([^"']+)["'])?/g)
      ).map((match) => ({
        name: match[1],
        constraint: match[2],
        isDev: false
      }))
    };
  },
  parseLockfile(content) {
    return {
      ecosystem: "ruby",
      packages: parseKeyValueLines(
        content.split("\n").map((line) => line.trim()).filter((line) => line.startsWith(" ") === false && /\(.+\)/.test(line)).join("\n"),
        " ("
      ).map(({ name, value }) => ({
        name,
        version: value.replace(/\)$/, "")
      }))
    };
  }
};

// src/introspection/ecosystems/rust.ts
init_esm_shims();
var rustParser = {
  ecosystem: "rust",
  packageManager: "cargo",
  manifestFiles: ["Cargo.toml"],
  lockfileFiles: ["Cargo.lock"],
  parseManifest(content) {
    return {
      ecosystem: "rust",
      packages: parseCargoDependencies(content)
    };
  },
  parseLockfile(content) {
    return {
      ecosystem: "rust",
      packages: Array.from(
        content.matchAll(
          /\[\[package\]\][\s\S]*?name\s*=\s*"([^"]+)"[\s\S]*?version\s*=\s*"([^"]+)"/g
        )
      ).map((match) => ({
        name: match[1],
        version: match[2]
      }))
    };
  }
};
function parseCargoDependencies(content) {
  const packages = [];
  let section = null;
  for (const raw of content.split("\n")) {
    const line = raw.trim();
    const header = /^\[([^\]]+)\]$/.exec(line);
    if (header) {
      const name = header[1]?.trim() ?? "";
      section = /(^|\.)dependencies$/.test(name) ? name.endsWith("dev-dependencies") ? "dev" : name.endsWith("build-dependencies") ? null : "deps" : null;
      continue;
    }
    if (section === null) {
      continue;
    }
    const entry = /^([A-Za-z0-9_-]+)\s*=\s*(.+)$/.exec(line);
    if (!entry?.[1] || !entry[2]) {
      continue;
    }
    packages.push({
      name: entry[1],
      constraint: cargoConstraint(entry[2]),
      isDev: section === "dev"
    });
  }
  return packages.sort((left, right) => left.name.localeCompare(right.name));
}
function cargoConstraint(value) {
  const plain = /^"([^"]*)"$/.exec(value.trim());
  if (plain) {
    return plain[1] ?? "unknown";
  }
  const path = /\bpath\s*=\s*"([^"]+)"/.exec(value)?.[1];
  if (path !== void 0) {
    return `path:${path}`;
  }
  const git = /\bgit\s*=\s*"([^"]+)"/.exec(value)?.[1];
  if (git !== void 0) {
    return `git:${git}`;
  }
  return /\bversion\s*=\s*"([^"]+)"/.exec(value)?.[1] ?? "unknown";
}

// src/introspection/ecosystems/registry.ts
var EcosystemParserRegistry = class {
  parsers = [];
  constructor(parsers = []) {
    for (const parser of parsers) {
      this.register(parser);
    }
  }
  register(parser) {
    this.parsers.push(parser);
  }
  list() {
    return [...this.parsers];
  }
  getKnownFiles() {
    return Array.from(
      new Set(this.parsers.flatMap((parser) => [...parser.manifestFiles, ...parser.lockfileFiles]))
    ).sort();
  }
  async parseProject(projectRoot) {
    const results = [];
    for (const parser of this.parsers) {
      const manifest = await findFirstExistingFile(projectRoot, parser.manifestFiles);
      if (manifest === null) {
        continue;
      }
      const parsedManifest = parser.parseManifest(manifest.content, manifest.filename);
      const lockfile = await findFirstExistingFile(projectRoot, parser.lockfileFiles);
      const parsedLockfile = lockfile === null ? { ecosystem: parser.ecosystem, packages: [] } : parser.parseLockfile(lockfile.content, lockfile.filename);
      const lockedVersions = new Map(parsedLockfile.packages.map((pkg) => [pkg.name, pkg.version]));
      results.push({
        toolchain: {
          ecosystem: parser.ecosystem,
          package_manager: parser.packageManager,
          lockfile: lockfile?.filename ?? parser.lockfileFiles[0] ?? ""
        },
        packages: parsedManifest.packages.map((pkg) => ({
          name: pkg.name,
          version_constraint: pkg.constraint ?? "unknown",
          locked_version: lockedVersions.get(pkg.name) ?? pkg.constraint ?? "unknown",
          ecosystem: parser.ecosystem,
          is_dev: pkg.isDev ?? false,
          manifest: manifest.filename
        })).sort((left, right) => left.name.localeCompare(right.name))
      });
    }
    return results;
  }
};
async function findFirstExistingFile(projectRoot, filenames) {
  for (const filename of expandManifestNames(projectRoot, filenames)) {
    const content = await readProjectFile(projectRoot, filename);
    if (content !== null) {
      return { filename, content };
    }
  }
  return null;
}
function expandManifestNames(projectRoot, filenames) {
  return filenames.flatMap(
    (filename) => filename.includes("*") ? import_fast_glob.default.sync(filename, { cwd: projectRoot, onlyFiles: true, deep: 1 }).sort() : [filename]
  );
}
function createDefaultEcosystemParserRegistry() {
  return new EcosystemParserRegistry([
    pnpmParser,
    npmParser,
    phpParser,
    dartParser,
    pythonParser,
    rubyParser,
    jvmParser,
    goParser,
    rustParser,
    dotnetParser
  ]);
}

// src/rules-discovery/baseline.ts
init_esm_shims();
import { join as join3 } from "path";

// src/rules-discovery/files.ts
init_esm_shims();
import { mkdirSync, writeFileSync } from "fs";
import { dirname } from "path";
function atomicWriteText(absPath, text) {
  mkdirSync(dirname(absPath), { recursive: true });
  const tmp = `${absPath}.${process.pid}.tmp`;
  writeFileSync(tmp, text, "utf8");
  renameWithRetrySync(tmp, absPath);
}
function atomicWriteJson(absPath, value) {
  atomicWriteText(absPath, `${JSON.stringify(value, null, 2)}
`);
}
function readJsonFile(absPath) {
  const text = readTextIfExistsSync(absPath);
  if (text === null) {
    return { state: "missing" };
  }
  try {
    return { state: "ok", value: JSON.parse(text) };
  } catch (error) {
    return { state: "unreadable", error: error instanceof Error ? error.message : String(error) };
  }
}

// src/rules-discovery/paths.ts
init_esm_shims();
import { join as join2 } from "path";
var RULES_DISCOVERY_DIR = ".paqad/ledger/rules-discovery";
var RULES_DISCOVERY_BASELINE = `${RULES_DISCOVERY_DIR}/baseline.json`;
var RULES_DISCOVERY_NUDGE_STATE = ".paqad/rules-discovery-nudge.json";
var STACK_SNAPSHOT_PATH = ".paqad/stack-snapshot.json";
var RULES_ROOT = "docs/instructions/rules";
var PROJECT_RULES_DIR = `${RULES_ROOT}/project`;
var RUN_FILES = {
  run: "run.json",
  inventory: "stack-inventory.json",
  fromDecisions: "from-decisions.json",
  fromResearch: "from-research.json",
  research: "research.json",
  sources: "sources.json",
  judgements: "proposal-judgements.json",
  proposal: "proposal.json",
  proposalMarkdown: "proposal.md",
  apply: "apply.json",
  report: "report.json"
};
var RUN_ID_RE = /^rd-\d{8}-\d{6}(?:-[a-z0-9]{1,8})?$/;
function isRunId(value) {
  return RUN_ID_RE.test(value);
}
function mintRunId(now, suffix) {
  const stamp = now.toISOString().replace(/[-:]/g, "").replace("T", "-").slice(0, 15);
  return suffix === void 0 ? `rd-${stamp}` : `rd-${stamp}-${suffix}`;
}
function runDirPath(runId) {
  if (!isRunId(runId)) {
    throw new Error(`invalid rules discovery run id "${runId}"`);
  }
  return `${RULES_DISCOVERY_DIR}/${runId}`;
}
function runFilePath(runId, file) {
  return `${runDirPath(runId)}/${RUN_FILES[file]}`;
}
function absRunFile(projectRoot, runId, file) {
  return join2(projectRoot, runFilePath(runId, file));
}

// src/rules-discovery/baseline.ts
function readBaseline(projectRoot) {
  const read = readJsonFile(join3(projectRoot, RULES_DISCOVERY_BASELINE));
  if (read.state !== "ok" || !Array.isArray(read.value.packages)) {
    return null;
  }
  return read.value;
}
function baselineLabel(baseline) {
  return baseline.inventory ?? baseline.seeded_from ?? RULES_DISCOVERY_BASELINE;
}
function seedBaselineFromSnapshot(projectRoot, now = /* @__PURE__ */ new Date()) {
  const snapshot = readJsonFile(join3(projectRoot, STACK_SNAPSHOT_PATH));
  if (snapshot.state !== "ok" || !Array.isArray(snapshot.value.packages)) {
    return null;
  }
  const baseline = {
    schema_version: 1,
    source: "seed",
    inventory: null,
    run_id: null,
    seeded_from: STACK_SNAPSHOT_PATH,
    updated_at: now.toISOString(),
    packages: snapshot.value.packages.map((pkg) => ({
      name: pkg.name,
      ecosystem: pkg.ecosystem,
      declared: knownVersion(pkg.version_constraint),
      installed: knownVersion(pkg.locked_version),
      dev: pkg.is_dev
    }))
  };
  atomicWriteJson(join3(projectRoot, RULES_DISCOVERY_BASELINE), baseline);
  return baseline;
}
function readOrSeedBaseline(projectRoot, now = /* @__PURE__ */ new Date()) {
  return readBaseline(projectRoot) ?? seedBaselineFromSnapshot(projectRoot, now);
}
function moveBaselineToRun(projectRoot, inventory, now = /* @__PURE__ */ new Date()) {
  const baseline = {
    schema_version: 1,
    source: "run",
    inventory: runFilePath(inventory.run_id, "inventory"),
    run_id: inventory.run_id,
    seeded_from: null,
    updated_at: now.toISOString(),
    packages: inventory.packages.filter((pkg) => pkg.status !== "removed").map((pkg) => ({
      name: pkg.name,
      ecosystem: pkg.ecosystem,
      declared: pkg.declared,
      installed: pkg.installed,
      dev: pkg.dev
    }))
  };
  atomicWriteJson(join3(projectRoot, RULES_DISCOVERY_BASELINE), baseline);
  return baseline;
}
function knownVersion(value) {
  return value === void 0 || value === null || value === "" || value === "unknown" ? null : value;
}

// src/rules-discovery/inventory.ts
init_esm_shims();
var import_yaml3 = __toESM(require_dist(), 1);
import { readFileSync as readFileSync2 } from "fs";
import { basename as basename2, dirname as dirname2, join as join7, posix } from "path";

// src/introspection/stack-introspector.ts
init_esm_shims();
import { join as join6 } from "path";

// src/repository/discovery.ts
init_esm_shims();
import { lstat, readdir } from "fs/promises";
import { basename, join as join4 } from "path";
var DEFAULT_SCAN_MAX_DEPTH = 5;
var PROJECT_MARKERS = /* @__PURE__ */ new Map([
  ["package.json", "node"],
  ["composer.json", "php"],
  ["pubspec.yaml", "dart"],
  ["pyproject.toml", "python"],
  ["requirements.txt", "python"],
  ["Pipfile", "python"],
  ["setup.py", "python"],
  ["Gemfile", "ruby"],
  ["go.mod", "go"],
  ["Cargo.toml", "rust"],
  ["pom.xml", "jvm"],
  ["build.gradle", "jvm"],
  ["build.gradle.kts", "jvm"],
  ["artisan", "php"],
  ["manage.py", "python"]
]);
var IGNORED_DIRECTORIES = /* @__PURE__ */ new Set([
  ".git",
  ".next",
  ".nuxt",
  ".dart_tool",
  ".gradle",
  ".turbo",
  "build",
  "coverage",
  "dist",
  "docs",
  "modules",
  "node_modules",
  "out",
  "target",
  "tests",
  "vendor"
]);
var NON_CANONICAL_DIRECTORIES = /* @__PURE__ */ new Set([
  "__fixtures__",
  "demo",
  "demos",
  "example",
  "examples",
  "fixtures",
  "test-fixtures",
  "tmp"
]);
var COMPONENT_DIRECTORY_NAMES = /* @__PURE__ */ new Set(["client", "frontend", "ui", "web"]);
async function discoverRepositoryContext(projectRoot, options) {
  const maxDepth = options?.maxDepth ?? DEFAULT_SCAN_MAX_DEPTH;
  const ignoredPaths = /* @__PURE__ */ new Set();
  const candidates = /* @__PURE__ */ new Map();
  const tree = await buildTree(projectRoot, ".", 0, maxDepth);
  const checkPaths = collectCheckPaths(tree);
  const visible = new Set(checkPaths.length > 0 ? dropGitIgnored(projectRoot, checkPaths) : []);
  resolveTree(tree, visible, candidates, ignoredPaths);
  const sortedCandidates = Array.from(candidates.values()).sort(compareCandidates);
  const projects = classifyProjects(sortedCandidates);
  const applications = buildApplications(projects);
  const primaryProjectRoot = resolvePrimaryProjectRoot(projects, applications);
  return {
    selected_root: projectRoot,
    scan_max_depth: maxDepth,
    ignored_paths: Array.from(ignoredPaths).sort(),
    projects,
    applications,
    primary_project_root: primaryProjectRoot
  };
}
function prefixRepositoryPath(root, relativePath) {
  if (root === "." || root === "") {
    return relativePath;
  }
  return join4(root, relativePath);
}
function emptyNode(relativeDir) {
  return { relativeDir, markerCandidates: [], markerPaths: [], staticIgnored: [], children: [] };
}
async function buildTree(projectRoot, relativeDir, depth, maxDepth) {
  const absoluteDir = relativeDir === "." ? projectRoot : join4(projectRoot, relativeDir);
  const node = emptyNode(relativeDir);
  let entries;
  try {
    entries = await readdir(absoluteDir, { withFileTypes: true });
  } catch {
    return node;
  }
  const entryNames = new Set(entries.map((entry) => entry.name));
  node.markerCandidates = Array.from(PROJECT_MARKERS.keys()).filter(
    (marker) => entryNames.has(marker)
  );
  node.markerPaths = node.markerCandidates.map((marker) => repositoryPath(relativeDir, marker));
  if (depth >= maxDepth) {
    return node;
  }
  for (const entry of entries) {
    const childRelativePath = repositoryPath(relativeDir, entry.name);
    if (entry.name.startsWith(".")) {
      node.staticIgnored.push(childRelativePath);
      continue;
    }
    if (!entry.isDirectory()) {
      continue;
    }
    if (IGNORED_DIRECTORIES.has(entry.name) || NON_CANONICAL_DIRECTORIES.has(entry.name)) {
      node.staticIgnored.push(childRelativePath);
      continue;
    }
    const vcsBoundary = await hasVcsBoundary(join4(absoluteDir, entry.name));
    const childNode = vcsBoundary ? emptyNode(childRelativePath) : await buildTree(projectRoot, childRelativePath, depth + 1, maxDepth);
    node.children.push({ relativePath: childRelativePath, vcsBoundary, node: childNode });
  }
  return node;
}
function collectCheckPaths(node, out = []) {
  for (const markerPath of node.markerPaths) {
    out.push(markerPath);
  }
  for (const child of node.children) {
    out.push(child.relativePath);
    collectCheckPaths(child.node, out);
  }
  return out;
}
function resolveTree(node, visible, candidates, ignoredPaths) {
  const markers = node.markerCandidates.filter((_marker, index) => {
    const markerPath = node.markerPaths[index];
    if (visible.has(markerPath)) {
      return true;
    }
    ignoredPaths.add(markerPath);
    return false;
  });
  if (markers.length > 0) {
    const ecosystems = Array.from(
      new Set(markers.map((marker) => PROJECT_MARKERS.get(marker)).filter(isDefined))
    ).sort();
    candidates.set(node.relativeDir, {
      root: node.relativeDir,
      role: "standalone",
      parent_root: null,
      markers: markers.sort(),
      ecosystems
    });
  }
  for (const staticIgnoredPath of node.staticIgnored) {
    ignoredPaths.add(staticIgnoredPath);
  }
  for (const child of node.children) {
    if (!visible.has(child.relativePath) || child.vcsBoundary) {
      ignoredPaths.add(child.relativePath);
      continue;
    }
    resolveTree(child.node, visible, candidates, ignoredPaths);
  }
}
function repositoryPath(relativeDir, entryName) {
  return toPosixPath(relativeDir === "." ? entryName : join4(relativeDir, entryName));
}
async function hasVcsBoundary(absoluteDir) {
  try {
    await lstat(join4(absoluteDir, ".git"));
    return true;
  } catch {
    return false;
  }
}
function classifyProjects(candidates) {
  const byRoot = new Map(candidates.map((candidate) => [candidate.root, candidate]));
  const result = [];
  for (const candidate of candidates) {
    const ancestors = findAncestorCandidates(candidate.root, byRoot);
    const parent = ancestors[0] ?? null;
    const role = parent && isLinkedComponent(parent, candidate) ? "component" : "standalone";
    result.push({
      ...candidate,
      role,
      parent_root: role === "component" ? parent.root : null
    });
  }
  return result.sort(compareCandidates);
}
function findAncestorCandidates(root, candidates) {
  if (root === ".") {
    return [];
  }
  const segments = root.split("/").filter(Boolean);
  const ancestors = [];
  for (let index = segments.length - 1; index >= 1; index -= 1) {
    const candidate = candidates.get(segments.slice(0, index).join("/"));
    if (candidate) {
      ancestors.push(candidate);
    }
  }
  const selectedRoot = candidates.get(".");
  if (selectedRoot) {
    ancestors.push(selectedRoot);
  }
  return ancestors.sort(compareCandidates);
}
function isLinkedComponent(parent, candidate) {
  const candidateName = basename(candidate.root);
  const candidateNodeOnly = candidate.ecosystems.length > 0 && candidate.ecosystems.every((ecosystem) => ecosystem === "node");
  const parentHasNonNode = parent.ecosystems.some((ecosystem) => ecosystem !== "node");
  return candidateNodeOnly && parentHasNonNode && COMPONENT_DIRECTORY_NAMES.has(candidateName);
}
function buildApplications(projects) {
  const standaloneRoots = projects.filter((project) => project.role === "standalone").map((project) => project.root);
  return standaloneRoots.map((root) => ({
    root,
    component_roots: projects.filter((project) => project.parent_root === root).map((project) => project.root).sort()
  }));
}
function resolvePrimaryProjectRoot(projects, applications) {
  if (applications.length === 0) {
    return null;
  }
  const byRoot = new Map(projects.map((project) => [project.root, project]));
  return [...applications].sort((left, right) => {
    const leftProject = byRoot.get(left.root);
    const rightProject = byRoot.get(right.root);
    return scoreCandidate(rightProject) - scoreCandidate(leftProject) || compareByRoot(left.root, right.root);
  })[0]?.root ?? null;
}
function compareCandidates(left, right) {
  return compareByRoot(left.root, right.root);
}
function compareByRoot(left, right) {
  return depthOf(left) - depthOf(right) || left.localeCompare(right);
}
function depthOf(root) {
  return root === "." ? 0 : root.split("/").filter(Boolean).length;
}
function scoreCandidate(candidate) {
  if (!candidate) {
    return -1;
  }
  return candidate.markers.reduce((score, marker) => score + markerScore(marker), 0) - depthOf(candidate.root);
}
function markerScore(marker) {
  switch (marker) {
    case "composer.json":
    case "package.json":
    case "pubspec.yaml":
      return 5;
    case "artisan":
    case "manage.py":
      return 4;
    case "pyproject.toml":
    case "Gemfile":
    case "go.mod":
    case "Cargo.toml":
    case "pom.xml":
    case "build.gradle":
    case "build.gradle.kts":
      return 3;
    default:
      return 1;
  }
}
function isDefined(value) {
  return value !== void 0;
}

// src/introspection/environment-traits.ts
init_esm_shims();
import { existsSync, readFileSync } from "fs";
import { join as join5 } from "path";
var COMPOSE_FILES = ["docker-compose.yml", "docker-compose.yaml", "compose.yml", "compose.yaml"];
function detectEnvironmentTraits(projectRoot, options) {
  const packageNames = new Set(options?.packageNames ?? []);
  const traits = /* @__PURE__ */ new Set();
  const sources = [];
  const signals = [];
  for (const file of COMPOSE_FILES) {
    if (existsSync(join5(projectRoot, file))) {
      traits.add("compose");
      sources.push({
        file,
        kind: "config",
        detail: "Detected docker compose environment from compose configuration"
      });
      signals.push({
        signal: "compose file exists",
        file,
        implies: "compose",
        confidence: "high"
      });
      break;
    }
  }
  const dockerFiles = listDockerIndicators(projectRoot);
  if (dockerFiles.length > 0) {
    traits.add("docker");
    for (const file of dockerFiles) {
      sources.push({
        file,
        kind: "config",
        detail: "Detected docker environment from Docker build assets"
      });
      signals.push({
        signal: "docker build asset exists",
        file,
        implies: "docker",
        confidence: "medium"
      });
    }
  }
  if (packageNames.has("laravel/sail")) {
    traits.add("sail");
    sources.push({
      file: "composer.json",
      kind: "manifest",
      detail: "Detected laravel sail from composer dependency"
    });
    signals.push({
      signal: "composer dependency laravel/sail",
      file: "composer.json",
      implies: "sail",
      confidence: "high"
    });
  } else if (referencesSailBinary(projectRoot)) {
    traits.add("sail");
    sources.push({
      file: detectSailReferenceFile(projectRoot) ?? "project files",
      kind: "heuristic",
      detail: "Detected laravel sail from vendor/bin/sail reference"
    });
    signals.push({
      signal: "vendor/bin/sail reference found",
      file: detectSailReferenceFile(projectRoot) ?? "project files",
      implies: "sail",
      confidence: "medium"
    });
  }
  return {
    traits: Array.from(traits).sort(),
    sources,
    signals
  };
}
function listDockerIndicators(projectRoot) {
  const indicators = [];
  const directFiles = ["Dockerfile", "Dockerfile.dev", "Dockerfile.prod"];
  for (const file of directFiles) {
    if (existsSync(join5(projectRoot, file))) {
      indicators.push(file);
    }
  }
  if (existsSync(join5(projectRoot, "docker"))) {
    indicators.push("docker/");
  }
  if (existsSync(join5(projectRoot, ".docker"))) {
    indicators.push(".docker/");
  }
  return indicators;
}
function referencesSailBinary(projectRoot) {
  return detectSailReferenceFile(projectRoot) !== null;
}
function detectSailReferenceFile(projectRoot) {
  const candidates = ["composer.json", "package.json"];
  for (const relativePath of candidates) {
    try {
      const content = readFileSync(join5(projectRoot, relativePath), "utf8");
      if (content.includes("vendor/bin/sail")) {
        return relativePath;
      }
    } catch {
      continue;
    }
  }
  return null;
}

// src/introspection/stack-introspector.ts
var StackIntrospector = class {
  cache = new StackSnapshotCache();
  parserRegistry = createDefaultEcosystemParserRegistry();
  async snapshot(projectRoot, options = {}) {
    const persist = options.persist ?? true;
    const repository = await discoverRepositoryContext(projectRoot);
    const candidateRoots = repository.projects.map((project) => project.root);
    const currentHashes = await this.cache.hashFiles(
      projectRoot,
      buildRepositoryHashInputs(candidateRoots, this.parserRegistry.getKnownFiles())
    );
    const cached = await this.cache.read(projectRoot);
    if (cached !== null && JSON.stringify(cached.source_hashes) === JSON.stringify(currentHashes)) {
      return cached;
    }
    const toolchains = [];
    const packages = [];
    const environmentSources = [];
    const environmentTraits = /* @__PURE__ */ new Set();
    for (const project of repository.projects) {
      const absoluteRoot = project.root === "." ? projectRoot : join6(projectRoot, project.root);
      const results = await this.parserRegistry.parseProject(absoluteRoot);
      for (const result of results) {
        toolchains.push({
          ...result.toolchain,
          lockfile: prefixRepositoryPath(project.root, result.toolchain.lockfile)
        });
        packages.push(
          ...result.packages.map((pkg) => ({
            ...pkg,
            root: project.root
          }))
        );
      }
      const packageNames = packages.filter((pkg) => pkg.root === project.root).map((pkg) => pkg.name);
      const environment = detectEnvironmentTraits(absoluteRoot, { packageNames });
      for (const trait of environment.traits) {
        environmentTraits.add(trait);
      }
      environmentSources.push(
        ...environment.sources.map((source) => ({
          ...source,
          file: prefixRepositoryPath(project.root, source.file)
        }))
      );
    }
    const hashedSources = Object.keys(currentHashes).sort().map((file) => ({
      file,
      kind: classifySourceKind(file),
      detail: classifySourceKind(file) === "config" ? "Used for environment trait detection" : "Used for stack detection and version resolution"
    }));
    const sources = dedupeSources([...hashedSources, ...environmentSources]);
    const snapshot = {
      generated_at: (/* @__PURE__ */ new Date()).toISOString(),
      source_hashes: currentHashes,
      toolchains: dedupeToolchains(toolchains),
      packages,
      profile: buildDetectedStackProfile({
        toolchains: dedupeToolchains(toolchains),
        packages,
        sources,
        detectedTraits: Array.from(environmentTraits).sort()
      }),
      repository
    };
    if (persist) {
      await this.cache.write(projectRoot, snapshot);
    }
    return snapshot;
  }
};
function buildRepositoryHashInputs(candidateRoots, knownFiles) {
  const inputs = /* @__PURE__ */ new Set();
  const extraFiles = [
    "docker-compose.yml",
    "docker-compose.yaml",
    "compose.yml",
    "compose.yaml",
    "Dockerfile",
    "Dockerfile.dev",
    "Dockerfile.prod",
    "docker",
    ".docker"
  ];
  for (const root of candidateRoots.length > 0 ? candidateRoots : ["."]) {
    for (const file of [...knownFiles, ...extraFiles]) {
      inputs.add(prefixRepositoryPath(root, file));
    }
  }
  return Array.from(inputs).sort();
}
function dedupeToolchains(toolchains) {
  const seen = /* @__PURE__ */ new Set();
  return toolchains.filter((toolchain) => {
    const key = `${toolchain.ecosystem}:${toolchain.package_manager}:${toolchain.lockfile}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
function classifySourceKind(file) {
  if (file.endsWith(".lock") || file.includes("lock")) {
    return "lockfile";
  }
  if (file === "docker-compose.yml" || file === "docker-compose.yaml" || file === "compose.yml" || file === "compose.yaml" || file === "Dockerfile" || file === "Dockerfile.dev" || file === "Dockerfile.prod" || file === "docker" || file === ".docker") {
    return "config";
  }
  return "manifest";
}
function dedupeSources(sources) {
  const seen = /* @__PURE__ */ new Set();
  return sources.filter((source) => {
    const key = `${source.file}:${source.kind}:${source.detail}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

// src/rules-discovery/inventory.ts
var PUBLIC_REGISTRY_HOSTS = {
  node: ["registry.npmjs.org", "registry.yarnpkg.com", "registry.npmmirror.com"],
  rust: ["github.com/rust-lang/crates.io-index", "index.crates.io"]
};
function knownManifestNames() {
  return Array.from(
    new Set(
      createDefaultEcosystemParserRegistry().list().flatMap((parser) => parser.manifestFiles)
    )
  ).sort();
}
function findManifests(projectRoot) {
  const parsers = createDefaultEcosystemParserRegistry().list();
  const names = knownManifestNames();
  const files = scanWorkingTree(
    projectRoot,
    names.map((name) => `**/${name}`),
    DEFAULT_IGNORE_GLOBS
  );
  return files.flatMap((manifest) => {
    const candidates = parsers.filter(
      (parser) => parser.manifestFiles.some((pattern) => matchesManifestName(basename2(manifest), pattern))
    );
    if (candidates.length === 0) {
      return [];
    }
    for (const dir of ancestorDirs(dirname2(manifest))) {
      for (const parser of candidates) {
        const lock = parser.lockfileFiles.find(
          (file) => readTextIfExistsSync(join7(projectRoot, dir, file)) !== null
        );
        if (lock !== void 0) {
          return [{ manifest, parser, lockfile: dir === "." ? lock : `${dir}/${lock}` }];
        }
      }
    }
    return [{ manifest, parser: candidates[0], lockfile: null }];
  });
}
function matchesManifestName(name, pattern) {
  return pattern.startsWith("*") ? name.endsWith(pattern.slice(1)) : name === pattern;
}
function ancestorDirs(dir) {
  const dirs = [];
  let current = dir === "" ? "." : dir;
  while (true) {
    dirs.push(current);
    if (current === ".") {
      return dirs;
    }
    const parent = posix.dirname(current);
    current = parent === current ? "." : parent;
  }
}
function readPackages(projectRoot, pick) {
  const content = readFileSync2(join7(projectRoot, pick.manifest), "utf8");
  const manifest = pick.parser.parseManifest(content, basename2(pick.manifest));
  const lockContent = pick.lockfile === null ? null : readFileSync2(join7(projectRoot, pick.lockfile), "utf8");
  const locked = /* @__PURE__ */ new Map();
  if (lockContent !== null && pick.lockfile !== null) {
    for (const entry of pick.parser.parseLockfile(lockContent, basename2(pick.lockfile)).packages) {
      locked.set(entry.name, entry.version);
    }
  }
  const lockSources = lockContent === null || pick.lockfile === null ? /* @__PURE__ */ new Map() : lockfileSources(lockContent, basename2(pick.lockfile));
  const replaced = pick.parser.ecosystem === "go" ? new Set(goLocalReplacements(content)) : /* @__PURE__ */ new Set();
  return manifest.packages.map((pkg) => {
    const declared = knownVersion(pkg.constraint);
    const reason = sourceReason(declared) ?? (replaced.has(pkg.name) ? "local-path" : void 0) ?? registryReason(pick.parser.ecosystem, lockSources.get(pkg.name));
    return {
      name: pkg.name,
      ecosystem: pick.parser.ecosystem,
      declared,
      installed: knownVersion(locked.get(pkg.name)),
      manifest: pick.manifest,
      dev: pkg.isDev ?? false,
      ...reason === void 0 ? {} : { privateReason: reason }
    };
  });
}
function sourceReason(declared) {
  if (declared === null) {
    return void 0;
  }
  if (declared.startsWith("workspace:")) {
    return "workspace-source";
  }
  if (/^(file:|link:|path:|portal:|\.{1,2}\/|\/)/.test(declared)) {
    return "local-path";
  }
  if (/^(git\+|git:|github:|gitlab:|bitbucket:|https?:\/\/|ssh:\/\/)/.test(declared)) {
    return "git-source";
  }
  return void 0;
}
function registryReason(ecosystem, resolved) {
  const publicHosts = PUBLIC_REGISTRY_HOSTS[ecosystem];
  if (resolved === void 0 || publicHosts === void 0) {
    return void 0;
  }
  if (/^(git\+|git:|github:)/.test(resolved)) {
    return "git-source";
  }
  if (resolved.startsWith("path+") || resolved.startsWith("file:")) {
    return "local-path";
  }
  if (!/^(https?:\/\/|registry\+|sparse\+)/.test(resolved)) {
    return void 0;
  }
  return publicHosts.some((host) => resolved.includes(host)) ? void 0 : "private-registry";
}
function lockfileSources(content, filename) {
  const sources = /* @__PURE__ */ new Map();
  if (filename === "package-lock.json") {
    try {
      const parsed = JSON.parse(content);
      for (const [key, value] of Object.entries(parsed.packages ?? {})) {
        if (key.startsWith("node_modules/") && typeof value.resolved === "string") {
          sources.set(key.slice("node_modules/".length), value.resolved);
        }
      }
    } catch {
      return sources;
    }
  } else if (filename === "yarn.lock") {
    for (const entry of parseYarnLock(content)) {
      if (entry.resolved !== void 0) {
        sources.set(entry.name, entry.resolved);
      }
    }
  } else if (filename === "pnpm-lock.yaml") {
    try {
      const parsed = import_yaml3.default.parse(content);
      for (const [key, value] of Object.entries(parsed?.packages ?? {})) {
        const name = /^\/?(@?[^@/]+(?:\/[^@/]+)?)@/.exec(key)?.[1];
        const tarball = value?.resolution?.tarball;
        if (name !== void 0 && typeof tarball === "string") {
          sources.set(name, tarball);
        }
      }
    } catch {
      return sources;
    }
  } else if (filename === "Cargo.lock") {
    for (const match of content.matchAll(
      /\[\[package\]\]\s*\nname\s*=\s*"([^"]+)"[^[]*?\nsource\s*=\s*"([^"]+)"/g
    )) {
      sources.set(match[1], match[2]);
    }
  } else if (filename === "composer.lock") {
    try {
      const parsed = JSON.parse(content);
      for (const entry of [...parsed.packages ?? [], ...parsed["packages-dev"] ?? []]) {
        if (typeof entry.name === "string" && entry.dist?.type === "path") {
          sources.set(entry.name, "path+local");
        }
      }
    } catch {
      return sources;
    }
  }
  return sources;
}
function workspacePackageNames(projectRoot, picks) {
  const names = /* @__PURE__ */ new Set();
  for (const pick of picks) {
    const text = readFileSync2(join7(projectRoot, pick.manifest), "utf8");
    const file = basename2(pick.manifest);
    if (file === "package.json" || file === "composer.json") {
      try {
        const name = JSON.parse(text).name;
        if (typeof name === "string") names.add(name);
      } catch {
        continue;
      }
    } else if (file === "Cargo.toml") {
      const name = /\[package\][^[]*?\nname\s*=\s*"([^"]+)"/.exec(text)?.[1];
      if (name !== void 0) names.add(name);
    } else if (file === "pubspec.yaml") {
      const name = /^name:\s*([A-Za-z0-9_]+)/m.exec(text)?.[1];
      if (name !== void 0) names.add(name);
    } else if (file === "go.mod") {
      const name = /^module\s+(\S+)/m.exec(text)?.[1];
      if (name !== void 0) names.add(name);
    }
  }
  return names;
}
function readPrivatePatterns(projectRoot, env = process.env) {
  const raw = layeredConfigMap(projectRoot, env).get("rules_discovery_private_packages") ?? "";
  return raw.split(",").map((entry) => entry.trim()).filter((entry) => entry !== "");
}
function matchesPrivatePattern(name, patterns) {
  return patterns.some((pattern) => {
    const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
    return new RegExp(`^${escaped}$`, "i").test(name);
  });
}
var SOURCE_EXTENSIONS = {
  node: "{ts,tsx,js,jsx,mjs,cjs,vue,svelte}",
  python: "py",
  go: "go",
  rust: "rs",
  ruby: "rb",
  dart: "dart",
  dotnet: "cs",
  jvm: "{java,kt,kts,scala}"
};
function importSpecifiers(ecosystem, text) {
  const all = (re) => Array.from(text.matchAll(re), (m) => m[1] ?? "");
  switch (ecosystem) {
    case "node":
      return [
        ...all(/\bfrom\s+['"]([^'"]+)['"]/g),
        ...all(/\bimport\s+['"]([^'"]+)['"]/g),
        ...all(/\b(?:require|import)\s*\(\s*['"]([^'"]+)['"]\s*\)/g)
      ];
    case "python":
      return [
        ...all(/^\s*import\s+([A-Za-z0-9_.]+)/gm),
        ...all(/^\s*from\s+([A-Za-z0-9_.]+)\s+import\b/gm)
      ];
    case "go":
      return all(/^\s*(?:import\s+)?(?:[A-Za-z_.]+\s+)?"([^"\s]+)"\s*$/gm);
    case "rust":
      return all(/^\s*(?:pub\s+)?(?:use|extern\s+crate)\s+([A-Za-z0-9_]+)/gm);
    case "ruby":
      return all(/^\s*require\s+['"]([^'"]+)['"]/gm);
    case "dart":
      return all(/['"]package:([A-Za-z0-9_]+)\//g);
    case "dotnet":
      return all(/^\s*using\s+(?:static\s+)?([A-Za-z0-9_.]+)\s*;/gm);
    case "jvm":
      return all(/^\s*import\s+(?:static\s+)?([A-Za-z0-9_.]+)/gm);
    default:
      return [];
  }
}
function importMatches(ecosystem, name, spec) {
  switch (ecosystem) {
    case "node":
      return spec === name || spec.startsWith(`${name}/`);
    case "python": {
      const top = spec.split(".")[0]?.toLowerCase() ?? "";
      return top === name.toLowerCase().replace(/-/g, "_");
    }
    case "go":
      return spec === name || spec.startsWith(`${name}/`);
    case "rust":
      return spec === name.replace(/-/g, "_");
    case "ruby":
      return spec === name || spec.startsWith(`${name}/`);
    case "dart":
      return spec === name;
    case "dotnet":
      return spec === name || spec.startsWith(`${name}.`);
    case "jvm": {
      const group = name.split(":")[0] ?? "";
      return group !== "" && (spec === group || spec.startsWith(`${group}.`));
    }
    default:
      return false;
  }
}
function countImports(projectRoot, packages) {
  const counts = /* @__PURE__ */ new Map();
  const ecosystems = new Set(packages.map((pkg) => pkg.ecosystem));
  for (const ecosystem of ecosystems) {
    const extension = SOURCE_EXTENSIONS[ecosystem];
    const own = packages.filter((pkg) => pkg.ecosystem === ecosystem);
    if (extension === void 0) {
      for (const pkg of own) counts.set(packageKey(pkg), null);
      continue;
    }
    for (const pkg of own) counts.set(packageKey(pkg), 0);
    const files = scanWorkingTree(projectRoot, [`**/*.${extension}`], DEFAULT_IGNORE_GLOBS);
    for (const file of files) {
      const text = readTextIfExistsSync(join7(projectRoot, file));
      if (text === null) continue;
      const specs = importSpecifiers(ecosystem, text);
      if (specs.length === 0) continue;
      for (const pkg of own) {
        if (specs.some((spec) => importMatches(ecosystem, pkg.name, spec))) {
          const key = packageKey(pkg);
          counts.set(key, (counts.get(key) ?? 0) + 1);
        }
      }
    }
  }
  return counts;
}
function packageKey(pkg) {
  return `${pkg.ecosystem}:${pkg.name}`;
}
function statusAgainst(pkg, baseline) {
  if (baseline === null) {
    return "unchanged";
  }
  const before = baseline.get(packageKey(pkg));
  if (before === void 0) {
    return "new";
  }
  const changed = pkg.installed !== null && before.installed !== null && pkg.installed !== before.installed || pkg.declared !== null && before.declared !== null && pkg.declared !== before.declared;
  return changed ? "version-changed" : "unchanged";
}
async function detectFrameworks(projectRoot) {
  const snapshot = await new StackIntrospector().snapshot(projectRoot, { persist: false });
  return [...snapshot.profile.frameworks].sort();
}
async function buildStackInventory(input) {
  const now = input.now ?? /* @__PURE__ */ new Date();
  const picks = findManifests(input.projectRoot);
  const raw = picks.flatMap((pick) => readPackages(input.projectRoot, pick));
  const workspaceNames = workspacePackageNames(input.projectRoot, picks);
  const patterns = readPrivatePatterns(input.projectRoot, input.env);
  const baseline = readOrSeedBaseline(input.projectRoot, now);
  const baselineMap = baseline === null ? null : baselineIndex(baseline);
  const counts = countImports(input.projectRoot, raw);
  const current = raw.map((pkg) => {
    const reason = pkg.privateReason ?? (workspaceNames.has(pkg.name) ? "workspace-package" : void 0) ?? (matchesPrivatePattern(pkg.name, patterns) ? "configured" : void 0);
    const importCount = counts.get(packageKey(pkg)) ?? null;
    return {
      name: pkg.name,
      ecosystem: pkg.ecosystem,
      declared: pkg.declared,
      installed: pkg.installed,
      manifest: pkg.manifest,
      dev: pkg.dev,
      import_count: importCount,
      unused: importCount === 0,
      status: statusAgainst(pkg, baselineMap),
      private: reason !== void 0,
      ...reason === void 0 ? {} : { private_reason: reason }
    };
  });
  const present = new Set(current.map(packageKey));
  const removed = baseline === null ? [] : baseline.packages.filter((pkg) => !present.has(packageKey(pkg))).map((pkg) => ({
    name: pkg.name,
    ecosystem: pkg.ecosystem,
    declared: pkg.declared,
    installed: pkg.installed,
    manifest: "",
    dev: pkg.dev,
    import_count: null,
    unused: false,
    status: "removed",
    private: false
  }));
  const inventory = {
    schema_version: 1,
    generated_at: now.toISOString(),
    run_id: input.runId,
    packages: [...current, ...removed].sort(
      (left, right) => left.ecosystem.localeCompare(right.ecosystem) || left.name.localeCompare(right.name) || left.manifest.localeCompare(right.manifest)
    ),
    frameworks: input.frameworks ?? await detectFrameworks(input.projectRoot),
    manifests: picks.map((pick) => pick.manifest),
    manifests_looked_for: picks.length === 0 ? knownManifestNames() : [],
    compared_to: baseline === null ? null : baselineLabel(baseline)
  };
  return inventory;
}
function baselineIndex(baseline) {
  return new Map(baseline.packages.map((pkg) => [packageKey(pkg), pkg]));
}
async function writeStackInventory(input) {
  const inventory = await buildStackInventory(input);
  atomicWriteJson(absRunFile(input.projectRoot, input.runId, "inventory"), inventory);
  return inventory;
}
function inventorySummary(inventory) {
  if (inventory.manifests.length === 0) {
    return `no package manifest found \u2014 looked for ${inventory.manifests_looked_for.join(", ")}. Rules discovery goes on with decisions and existing rules only.`;
  }
  const count = (status) => inventory.packages.filter((pkg) => pkg.status === status).length;
  const listed = inventory.packages.filter((pkg) => pkg.status !== "removed").length;
  return `${listed} packages from ${inventory.manifests.length} manifest${inventory.manifests.length === 1 ? "" : "s"}: ${count("new")} new, ${count("version-changed")} version-changed, ${count("removed")} removed${inventory.compared_to === null ? " (first run, no baseline)" : ` against ${inventory.compared_to}`}.`;
}

// src/rules-discovery/run-store.ts
init_esm_shims();
import { readdirSync } from "fs";
import { join as join8 } from "path";
var RUN_STEPS = [
  "inventory",
  "decisions",
  "research",
  "propose",
  "sign_off",
  "apply",
  "docs",
  "done"
];
var RUN_DOC_TYPE = "paqad.rules-discovery.run";
function stepIndex(step) {
  return RUN_STEPS.indexOf(step);
}
function isRunRecord(value) {
  if (typeof value !== "object" || value === null) return false;
  const record = value;
  return record.doc_type === RUN_DOC_TYPE && typeof record.run_id === "string" && typeof record.revision === "number" && typeof record.step === "string" && RUN_STEPS.includes(record.step) && (record.status === "open" || record.status === "done" || record.status === "abandoned");
}
function readRun(projectRoot, runId) {
  if (!isRunId(runId)) {
    return { state: "unreadable", reason: `"${runId}" is not a rules discovery run id` };
  }
  const read = readJsonFile(absRunFile(projectRoot, runId, "run"));
  if (read.state === "missing") return { state: "missing" };
  if (read.state === "unreadable") return { state: "unreadable", reason: read.error };
  if (!isRunRecord(read.value)) {
    return { state: "unreadable", reason: "run.json does not hold a rules discovery run" };
  }
  return { state: "ok", record: read.value };
}
function listRunIds(projectRoot) {
  try {
    return readdirSync(join8(projectRoot, RULES_DISCOVERY_DIR), { withFileTypes: true }).filter((entry) => entry.isDirectory() && isRunId(entry.name)).map((entry) => entry.name).sort();
  } catch {
    return [];
  }
}
function findOpenRunId(projectRoot) {
  const open = listRunIds(projectRoot).filter((runId) => {
    const read = readRun(projectRoot, runId);
    return read.state !== "ok" || read.record.status === "open";
  });
  return open.length === 0 ? null : open[open.length - 1];
}
function openRun(projectRoot, now = /* @__PURE__ */ new Date()) {
  let runId = mintRunId(now);
  for (let suffix = 2; readRun(projectRoot, runId).state !== "missing"; suffix += 1) {
    runId = mintRunId(now, String(suffix));
  }
  const at = now.toISOString();
  const record = {
    schema_version: 1,
    doc_type: RUN_DOC_TYPE,
    run_id: runId,
    revision: 1,
    step: "inventory",
    status: "open",
    opened_at: at,
    updated_at: at,
    signoff_decision: null,
    proposal_hash: null,
    steps: [{ step: "inventory", at }]
  };
  atomicWriteJson(absRunFile(projectRoot, runId, "run"), record);
  return record;
}
function updateRun(projectRoot, runId, expectedRevision, patch, now = /* @__PURE__ */ new Date()) {
  const read = readRun(projectRoot, runId);
  if (read.state === "missing") {
    return { ok: false, reason: "missing", detail: `run ${runId} has no run.json` };
  }
  if (read.state === "unreadable") {
    return { ok: false, reason: "unreadable", detail: read.reason };
  }
  const current = read.record;
  if (current.revision !== expectedRevision) {
    return {
      ok: false,
      reason: "revision-mismatch",
      detail: `run ${runId} is at revision ${current.revision}, expected ${expectedRevision}; another session changed it`
    };
  }
  if (current.status !== "open") {
    return { ok: false, reason: "closed", detail: `run ${runId} is ${current.status}` };
  }
  if (patch.step !== void 0 && stepIndex(patch.step) < stepIndex(current.step)) {
    return {
      ok: false,
      reason: "step-backwards",
      detail: `run ${runId} is at ${current.step} and cannot go back to ${patch.step}`
    };
  }
  const at = now.toISOString();
  const step = patch.step ?? current.step;
  const record = {
    ...current,
    revision: current.revision + 1,
    step,
    status: patch.status ?? (step === "done" ? "done" : current.status),
    updated_at: at,
    signoff_decision: patch.signoff_decision === void 0 ? current.signoff_decision : patch.signoff_decision,
    proposal_hash: patch.proposal_hash === void 0 ? current.proposal_hash : patch.proposal_hash,
    steps: step === current.step ? current.steps : [...current.steps, { step, at }]
  };
  atomicWriteJson(absRunFile(projectRoot, runId, "run"), record);
  return { ok: true, record };
}

// src/rules-discovery/nudge.ts
var NUDGE_NAME_LIMIT = 64;
var SHOWN_NAMES = 3;
var NAME_FORMATS = {
  node: /^(?:@[a-z0-9~-][a-z0-9._~-]*\/)?[a-z0-9~-][a-z0-9._~-]*$/,
  python: /^[A-Za-z0-9](?:[A-Za-z0-9._-]*[A-Za-z0-9])?$/,
  php: /^[a-z0-9]+(?:[_.-][a-z0-9]+)*\/[a-z0-9]+(?:(?:[_.]|-{1,2})[a-z0-9]+)*$/,
  go: /^[A-Za-z0-9][A-Za-z0-9._~/-]*$/,
  rust: /^[A-Za-z0-9_-]+$/,
  ruby: /^[A-Za-z0-9][A-Za-z0-9._-]*$/,
  jvm: /^[A-Za-z0-9._-]+:[A-Za-z0-9._-]+$/,
  dart: /^[a-z0-9_]+$/,
  dotnet: /^[A-Za-z0-9_][A-Za-z0-9._-]*$/
};
function isShowablePackageName(ecosystem, name) {
  return name.length <= NUDGE_NAME_LIMIT && NAME_FORMATS[ecosystem].test(name);
}
function nodeNamesInOrder(text) {
  try {
    const parsed = JSON.parse(text);
    return ["dependencies", "devDependencies"].flatMap((field) => {
      const block = parsed[field];
      return block !== null && typeof block === "object" ? Object.keys(block) : [];
    });
  } catch {
    return null;
  }
}
function manifestPackageNames(projectRoot) {
  const parsers = createDefaultEcosystemParserRegistry().list();
  const patterns = Array.from(new Set(parsers.flatMap((parser) => parser.manifestFiles)));
  const files = scanWorkingTree(
    projectRoot,
    patterns.map((pattern) => `**/${pattern}`),
    DEFAULT_IGNORE_GLOBS
  );
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const file of files) {
    const name = basename3(file);
    const parser = parsers.find(
      (candidate) => candidate.manifestFiles.some(
        (pattern) => pattern.startsWith("*") ? name.endsWith(pattern.slice(1)) : name === pattern
      )
    );
    if (parser === void 0) continue;
    const text = readFileSync3(join9(projectRoot, file), "utf8");
    const names = (name === "package.json" ? nodeNamesInOrder(text) : null) ?? parser.parseManifest(text, name).packages.map((pkg) => pkg.name);
    for (const packageName of names) {
      const entry = { name: packageName, ecosystem: parser.ecosystem };
      if (!seen.has(packageKey(entry))) {
        seen.add(packageKey(entry));
        out.push(entry);
      }
    }
  }
  return out;
}
function nudgeLine(count, names, openRun2) {
  const noun = count === 1 ? "new package" : "new packages";
  const shown = names.length === 0 ? "" : ` (${names.join(", ")})`;
  const ask = openRun2 ? "A rules discovery run is open: say 'discover rules' to continue it." : "Say 'discover rules' to update them.";
  return `Your rules may be behind: ${count} ${noun}${shown}. ${ask}`;
}
function computeRulesDriftNudge(projectRoot, now = /* @__PURE__ */ new Date()) {
  const baseline = readOrSeedBaseline(projectRoot, now);
  if (baseline === null) return null;
  const known = new Set(baseline.packages.map(packageKey));
  const added = manifestPackageNames(projectRoot).filter((pkg) => !known.has(packageKey(pkg)));
  if (added.length === 0) return null;
  const names = added.filter((pkg) => isShowablePackageName(pkg.ecosystem, pkg.name)).slice(0, SHOWN_NAMES).map((pkg) => pkg.name);
  const setHash = createHash("sha256").update(added.map(packageKey).sort().join("\n")).digest("hex");
  const openRun2 = findOpenRunId(projectRoot);
  return {
    line: nudgeLine(added.length, names, openRun2),
    set_hash: setHash,
    count: added.length,
    names,
    open_run: openRun2
  };
}
function readNudgeState(projectRoot) {
  const read = readJsonFile(join9(projectRoot, RULES_DISCOVERY_NUDGE_STATE));
  return read.state === "ok" && typeof read.value.set_hash === "string" ? read.value : null;
}
function clearNudgeState(projectRoot) {
  atomicWriteJson(join9(projectRoot, RULES_DISCOVERY_NUDGE_STATE), {
    set_hash: "",
    shown_at: "",
    line: ""
  });
}
function rulesDriftSessionStartText(projectRoot, now = /* @__PURE__ */ new Date()) {
  const nudge = computeRulesDriftNudge(projectRoot, now);
  const state = readNudgeState(projectRoot);
  if (nudge === null) {
    if (state !== null && state.line !== "") clearNudgeState(projectRoot);
    return null;
  }
  const key = `${nudge.set_hash}:${nudge.open_run ?? ""}`;
  if (state?.set_hash === key) return null;
  atomicWriteJson(join9(projectRoot, RULES_DISCOVERY_NUDGE_STATE), {
    set_hash: key,
    shown_at: now.toISOString(),
    line: nudge.line
  });
  return nudge.line;
}
function rulesDriftHeadline(projectRoot) {
  const state = readNudgeState(projectRoot);
  return state === null || state.line === "" ? null : state.line;
}

export {
  prefixRepositoryPath,
  jvmParser,
  EcosystemParserRegistry,
  expandManifestNames,
  createDefaultEcosystemParserRegistry,
  detectEnvironmentTraits,
  StackIntrospector,
  atomicWriteText,
  atomicWriteJson,
  readJsonFile,
  RULES_ROOT,
  PROJECT_RULES_DIR,
  isRunId,
  mintRunId,
  runFilePath,
  absRunFile,
  moveBaselineToRun,
  packageKey,
  writeStackInventory,
  inventorySummary,
  RUN_DOC_TYPE,
  readRun,
  findOpenRunId,
  openRun,
  updateRun,
  NUDGE_NAME_LIMIT,
  isShowablePackageName,
  manifestPackageNames,
  nudgeLine,
  computeRulesDriftNudge,
  readNudgeState,
  clearNudgeState,
  rulesDriftSessionStartText,
  rulesDriftHeadline
};
