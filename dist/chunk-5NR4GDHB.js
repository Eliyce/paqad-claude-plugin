import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  currentOrdinal,
  openSessionDoc
} from "./chunk-QINSFA6R.js";
import {
  resolveSessionId
} from "./chunk-HV6ESCNW.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/session-ledger/disabled-audit.ts
init_esm_shims();
var DISABLED_SESSION_DOC_TYPE = "disabled-session";
var DISABLED_SESSION_SCHEMA_VERSION = 1;
function recordDisabledSession(projectRoot, ctx = {}) {
  try {
    const sessionId = resolveSessionId(projectRoot, ctx.sessionId);
    if (currentOrdinal(projectRoot, DISABLED_SESSION_DOC_TYPE, sessionId) > 0) {
      return null;
    }
    return openSessionDoc(
      projectRoot,
      DISABLED_SESSION_DOC_TYPE,
      sessionId,
      {
        reason: "paqad-disabled",
        origin: ctx.origin ?? "unknown",
        adapter: ctx.adapter ?? "unknown"
      },
      { schemaVersion: DISABLED_SESSION_SCHEMA_VERSION, now: ctx.now }
    );
  } catch {
    return null;
  }
}

export {
  DISABLED_SESSION_DOC_TYPE,
  DISABLED_SESSION_SCHEMA_VERSION,
  recordDisabledSession
};
