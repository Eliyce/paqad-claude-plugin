import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  readGitStatusFiles
} from "./chunk-IIFF75TG.js";
import {
  STAGE_EVIDENCE_DOC_TYPE
} from "./chunk-VV76C43H.js";
import {
  sessionLedgerDir
} from "./chunk-QINSFA6R.js";
import {
  resolveSessionId
} from "./chunk-HV6ESCNW.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/pipeline/dirty-baseline.ts
init_esm_shims();
import { createHash } from "crypto";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
var BASELINE_FILE = ".dirty-baseline.json";
function baselinePath(projectRoot, sessionId) {
  return join(projectRoot, sessionLedgerDir(STAGE_EVIDENCE_DOC_TYPE, sessionId), BASELINE_FILE);
}
function digestFile(projectRoot, relativePath) {
  try {
    return createHash("sha256").update(readFileSync(join(projectRoot, relativePath))).digest("hex");
  } catch {
    return null;
  }
}
async function captureSessionDirtyBaseline(projectRoot, sessionHint) {
  const sessionId = resolveSessionId(projectRoot, sessionHint);
  const path = baselinePath(projectRoot, sessionId);
  const dirty = await readGitStatusFiles(projectRoot);
  const files = {};
  for (const relativePath of dirty) {
    const digest = digestFile(projectRoot, relativePath);
    if (digest !== null) {
      files[relativePath] = digest;
    }
  }
  try {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(
      path,
      `${JSON.stringify({ captured_at: (/* @__PURE__ */ new Date()).toISOString(), files }, null, 2)}
`,
      { flag: "wx" }
    );
  } catch {
  }
}
function readSessionDirtyBaseline(projectRoot, sessionHint) {
  const sessionId = resolveSessionId(projectRoot, sessionHint);
  try {
    const parsed = JSON.parse(
      readFileSync(baselinePath(projectRoot, sessionId), "utf8")
    );
    if (parsed !== null && typeof parsed === "object" && typeof parsed.files === "object" && parsed.files !== null) {
      return parsed;
    }
  } catch {
  }
  return null;
}
function subtractUnchangedBaselineFiles(projectRoot, sessionHint, files) {
  const baseline = readSessionDirtyBaseline(projectRoot, sessionHint);
  if (baseline === null) {
    return [...files];
  }
  return files.filter((relativePath) => {
    const baselineDigest = baseline.files[relativePath];
    if (baselineDigest === void 0) {
      return true;
    }
    const currentDigest = digestFile(projectRoot, relativePath);
    if (currentDigest === null) {
      return true;
    }
    return currentDigest !== baselineDigest;
  });
}

export {
  digestFile,
  captureSessionDirtyBaseline,
  readSessionDirtyBaseline,
  subtractUnchangedBaselineFiles
};
