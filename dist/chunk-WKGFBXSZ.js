import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/stage-evidence/ledger-era.ts
init_esm_shims();
var CHAINED_VERSION = 3;
function bundleLedgerEra(rows) {
  return rows[0]?.schema_version === CHAINED_VERSION ? "v3" : "legacy";
}
function stageLedgerEra(rows, stage) {
  for (let index = rows.length - 1; index >= 0; index -= 1) {
    const row = rows[index];
    if (row.kind === "stage_start" && row.stage === stage) {
      return row.schema_version === CHAINED_VERSION ? "v3" : "legacy";
    }
  }
  return "legacy";
}

export {
  bundleLedgerEra,
  stageLedgerEra
};
