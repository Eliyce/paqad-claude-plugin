import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  require_out
} from "./chunk-P4RPU2KB.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/core/fs/gitignore-scan.ts
init_esm_shims();
var import_fast_glob = __toESM(require_out(), 1);
import { execFileSync } from "child_process";
var DEFAULT_SOURCE_GLOBS = ["**/*.{ts,tsx,js,jsx,mjs,cjs,vue,svelte}"];
var DEFAULT_IGNORE_GLOBS = [
  "**/node_modules/**",
  "**/dist/**",
  "**/.paqad/**",
  "**/build/**",
  "**/vendor/**"
];
function dropGitIgnored(projectRoot, files) {
  try {
    const out = execFileSync("git", ["check-ignore", "-z", "--stdin"], {
      cwd: projectRoot,
      input: files.join("\0"),
      stdio: ["pipe", "pipe", "ignore"]
    });
    const ignored = new Set(out.toString("utf8").split("\0").filter(Boolean));
    return files.filter((f) => !ignored.has(f));
  } catch {
    return files;
  }
}
function scanWorkingTree(projectRoot, globs = DEFAULT_SOURCE_GLOBS, ignore = DEFAULT_IGNORE_GLOBS) {
  const listed = import_fast_glob.default.sync(globs, { cwd: projectRoot, ignore, onlyFiles: true });
  return dropGitIgnored(projectRoot, listed).sort();
}

export {
  DEFAULT_SOURCE_GLOBS,
  DEFAULT_IGNORE_GLOBS,
  dropGitIgnored,
  scanWorkingTree
};
