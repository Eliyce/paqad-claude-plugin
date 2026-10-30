import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  PATHS
} from "./chunk-CWGYZAT6.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/core/logging/hooks-log.ts
init_esm_shims();
import { appendFileSync, mkdirSync } from "fs";
import { join } from "path";
function hooksLogPath(projectRoot) {
  return join(projectRoot, PATHS.LOGS_DIR, "hooks.log");
}
function appendHooksLog(projectRoot, line) {
  try {
    mkdirSync(join(projectRoot, PATHS.LOGS_DIR), { recursive: true });
    appendFileSync(hooksLogPath(projectRoot), `${(/* @__PURE__ */ new Date()).toISOString()} ${line}
`);
  } catch {
  }
}

export {
  appendHooksLog
};
