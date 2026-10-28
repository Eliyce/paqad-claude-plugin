import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/core/fs/read-if-exists.ts
init_esm_shims();
import { readFileSync } from "fs";
import { readFile } from "fs/promises";
function isMissingFileError(error) {
  return typeof error === "object" && error !== null && error.code === "ENOENT";
}
function readTextIfExistsSync(path) {
  try {
    return readFileSync(path, "utf8");
  } catch (error) {
    if (isMissingFileError(error)) return null;
    throw error;
  }
}

export {
  isMissingFileError,
  readTextIfExistsSync
};
