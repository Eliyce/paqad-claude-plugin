import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/core/runtime-paths.ts
init_esm_shims();
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
function getRuntimeRoot() {
  return join(getPackageRoot(), "runtime");
}
function getRuntimeTemplatesRoot() {
  return join(getRuntimeRoot(), "templates");
}

export {
  findPackageRoot,
  getPackageRoot,
  getRuntimeRoot,
  getRuntimeTemplatesRoot
};
