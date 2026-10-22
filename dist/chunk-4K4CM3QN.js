import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/core/path-utils.ts
init_esm_shims();
import { isAbsolute, relative, resolve, sep } from "path";
function toPosixPath(path) {
  return path.split(sep).join("/");
}
function stripTrailingChars(value, chars) {
  let end = value.length;
  while (end > 0 && chars.includes(value[end - 1])) {
    end -= 1;
  }
  return end === value.length ? value : value.slice(0, end);
}
function toProjectRelativePath(projectRoot, path) {
  const root = resolve(projectRoot);
  const relativePath = relative(root, resolve(root, path));
  if (relativePath === "" || relativePath === ".." || relativePath.startsWith(`..${sep}`) || isAbsolute(relativePath)) {
    return null;
  }
  return toPosixPath(relativePath);
}

export {
  toPosixPath,
  stripTrailingChars,
  toProjectRelativePath
};
