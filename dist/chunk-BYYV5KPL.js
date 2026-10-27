import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  appendSessionEvent,
  currentOrdinal,
  openSessionDoc,
  readSessionDoc
} from "./chunk-QINSFA6R.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/session-ledger/project-ledger.ts
init_esm_shims();
var PROJECT_SESSION = "_project";
function ensureUnit(projectRoot, docType) {
  const current = currentOrdinal(projectRoot, docType, PROJECT_SESSION);
  if (current > 0) {
    return current;
  }
  return openSessionDoc(projectRoot, docType, PROJECT_SESSION, {}).ordinal;
}
function recordProjectEvent(projectRoot, docType, row, schemaVersion = 1) {
  try {
    const ordinal = ensureUnit(projectRoot, docType);
    appendSessionEvent(projectRoot, docType, PROJECT_SESSION, ordinal, row, { schemaVersion });
  } catch {
  }
}
function readProjectEvents(projectRoot, docType) {
  return readSessionDoc(projectRoot, docType, PROJECT_SESSION);
}
function readLatestProjectEvent(projectRoot, docType, match) {
  const rows = readSessionDoc(projectRoot, docType, PROJECT_SESSION);
  for (let i = rows.length - 1; i >= 0; i--) {
    if (match(rows[i])) {
      return rows[i];
    }
  }
  return null;
}

export {
  recordProjectEvent,
  readProjectEvents,
  readLatestProjectEvent
};
