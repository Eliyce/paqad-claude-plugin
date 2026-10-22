import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  join
} from "./chunk-EGDL57MD.js";
import {
  PATHS
} from "./chunk-UCSN7SVD.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/core/ids/ulid.ts
init_esm_shims();
import { randomBytes } from "crypto";
var ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
var ENCODING_LEN = ENCODING.length;
var TIME_LEN = 10;
var RANDOM_LEN = 16;
var ULID_BODY = `[0-9A-HJKMNP-TV-Z]{${TIME_LEN + RANDOM_LEN}}`;
var lastTime = -1;
var lastRandom = [];
function encodeTime(time) {
  let remainder = time;
  let out = "";
  for (let i = TIME_LEN - 1; i >= 0; i--) {
    const mod = remainder % ENCODING_LEN;
    out = ENCODING[mod] + out;
    remainder = (remainder - mod) / ENCODING_LEN;
  }
  return out;
}
function randomIndices() {
  const bytes = randomBytes(RANDOM_LEN);
  return Array.from(bytes, (byte) => byte % ENCODING_LEN);
}
function incrementIndices(indices) {
  const next = [...indices];
  for (let i = next.length - 1; i >= 0; i--) {
    if (next[i] < ENCODING_LEN - 1) {
      next[i] = next[i] + 1;
      return next;
    }
    next[i] = 0;
  }
  return randomIndices();
}
function ulid(seedTime = Date.now()) {
  if (seedTime <= lastTime) {
    lastRandom = incrementIndices(lastRandom);
  } else {
    lastTime = seedTime;
    lastRandom = randomIndices();
  }
  return encodeTime(seedTime) + lastRandom.map((index) => ENCODING[index]).join("");
}

// src/planning/slug-utils.ts
init_esm_shims();

// src/core/text/trim-char.ts
init_esm_shims();
function trimLeadingChar(value, char) {
  let start = 0;
  while (start < value.length && value[start] === char) start += 1;
  return start === 0 ? value : value.slice(start);
}
function trimTrailingChar(value, char) {
  let end = value.length;
  while (end > 0 && value[end - 1] === char) end -= 1;
  return end === value.length ? value : value.slice(0, end);
}
function trimChar(value, char) {
  return trimTrailingChar(trimLeadingChar(value, char), char);
}
function slugifyAscii(value) {
  return trimChar(value.toLowerCase().replace(/[^a-z0-9]+/g, "-"), "-");
}

// src/planning/slug-utils.ts
var MAX_SLUG_LENGTH = 80;
function deriveSlug(featureId, requestText) {
  const source = [featureId, requestText].filter(Boolean).join(" ");
  const normalized = slugifyAscii(source);
  if (!normalized) {
    return "planning-manifest";
  }
  return trimTrailingChar(normalized.slice(0, MAX_SLUG_LENGTH), "-") || "planning-manifest";
}
function isSlugSafe(slug) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

// src/feature-evidence/paths.ts
init_esm_shims();
var FEATURE_BUNDLE_FILES = {
  feature: "feature.json",
  plan: "plan.json",
  specification: "specification.json",
  review: "review.json",
  stageEvidence: "stage-evidence.jsonl",
  ruleRun: "rule-run.jsonl",
  rulesLoaded: "rules-loaded.json",
  delivery: "delivery.json",
  receipt: "receipt.json",
  aiBom: "ai-bom.json",
  rag: "rag.jsonl",
  checks: "checks.json",
  duplication: "duplication.jsonl",
  changeMetrics: "change-metrics.jsonl",
  evidence: "evidence.jsonl",
  visualEvidence: "visual-evidence.json",
  specMd: "spec.md",
  request: "request.md",
  clarification: "clarification.json",
  experts: "experts.json",
  highTable: "high-table.jsonl",
  cost: "cost.json",
  decisions: "decisions.json",
  techDebt: "tech-debt.json",
  ruleOverrides: "rule-overrides.jsonl",
  fixProof: "fix-proof.json"
};
var LEGACY_BUNDLE_FILES = {
  specificationMd: "specification.md",
  contextEfficiency: "context-efficiency.jsonl"
};
var SCREENSHOTS_DIR = "screenshots";
var JIRA_ISSUE = "[A-Z][A-Z0-9]*-\\d+";
var GITHUB_ISSUE = "\\d+";
var DIR_NAME_RE = new RegExp(
  `^(?:(${JIRA_ISSUE}|${GITHUB_ISSUE})-)?([a-z0-9]+(?:-[a-z0-9]+)*)-(${ULID_BODY})$`
);
var ISSUE_RE = new RegExp(`^(?:${JIRA_ISSUE}|${GITHUB_ISSUE})$`);
function featureDir(dirName) {
  return join(PATHS.FEATURE_EVIDENCE_DIR, dirName);
}
function featureChangeKey(dirName) {
  return parseFeatureDirName(dirName)?.ulid ?? dirName;
}
function featureFilePath(dirName, file) {
  return join(featureDir(dirName), FEATURE_BUNDLE_FILES[file]);
}
function featureReportPath(dirName) {
  return join(featureDir(dirName), "report.html");
}
function featureScreenshotsDir(dirName) {
  return join(featureDir(dirName), SCREENSHOTS_DIR);
}
function featureLegacySpecMarkdownPath(dirName) {
  return join(featureDir(dirName), LEGACY_BUNDLE_FILES.specificationMd);
}
function featureSessionControlPath(sessionId) {
  return join(PATHS.FEATURE_EVIDENCE_SESSION_DIR, `${sessionId}.json`);
}
function chatDir(sessionId) {
  return join(PATHS.CHAT_LEDGER_DIR, sessionId);
}
function chatRagPath(sessionId) {
  return join(chatDir(sessionId), FEATURE_BUNDLE_FILES.rag);
}
function formatFeatureDirName(parts) {
  if (!isSlugSafe(parts.slug)) {
    throw new Error(`Unsafe feature slug: ${JSON.stringify(parts.slug)}`);
  }
  if (!new RegExp(`^${ULID_BODY}$`).test(parts.ulid)) {
    throw new Error(`Malformed feature ULID: ${JSON.stringify(parts.ulid)}`);
  }
  if (parts.issue !== null && !ISSUE_RE.test(parts.issue)) {
    throw new Error(`Malformed feature issue ref: ${JSON.stringify(parts.issue)}`);
  }
  const prefix = parts.issue ? `${parts.issue}-` : "";
  return `${prefix}${parts.slug}-${parts.ulid}`;
}
function parseFeatureDirName(dirName) {
  const match = DIR_NAME_RE.exec(dirName);
  if (!match) {
    return null;
  }
  return { issue: match[1] ?? null, slug: match[2], ulid: match[3] };
}
function isFeatureDirName(dirName) {
  return parseFeatureDirName(dirName) !== null;
}

// src/feature-evidence/session-control.ts
init_esm_shims();
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join as join2 } from "path";

// src/feature-evidence/types.ts
init_esm_shims();
var FEATURE_DOC_TYPE = "paqad.feature";
var PLAN_DOC_TYPE = "paqad.plan";
var REVIEW_DOC_TYPE = "paqad.review";
var SPECIFICATION_DOC_TYPE = "paqad.specification";
var SPEC_SOURCE_DOC_TYPE = "paqad.spec";
var REQUEST_DOC_TYPE = "paqad.request";
var CLARIFICATION_DOC_TYPE = "paqad.clarification";
var EXPERTS_DOC_TYPE = "paqad.experts";
var DECISIONS_DOC_TYPE = "paqad.decisions";
var TECH_DEBT_DOC_TYPE = "paqad.tech-debt";
var RULE_OVERRIDE_DOC_TYPE = "paqad.rule-override";
var FIX_PROOF_DOC_TYPE = "paqad.fix-proof";
var FEATURE_SESSION_DOC_TYPE = "paqad.feature-session";
var FEATURE_EVIDENCE_SCHEMA_VERSION = 1;
var FEATURE_DOC_SCHEMA_VERSION = 2;

// src/feature-evidence/session-control.ts
function emptyControl(sessionId, now = () => /* @__PURE__ */ new Date()) {
  return {
    schema_version: FEATURE_EVIDENCE_SCHEMA_VERSION,
    doc_type: FEATURE_SESSION_DOC_TYPE,
    session_id: sessionId,
    active: null,
    paused: [],
    lane: null,
    updated_at: now().toISOString()
  };
}
function readSessionControl(projectRoot, sessionId, now = () => /* @__PURE__ */ new Date()) {
  try {
    const raw = readFileSync(join2(projectRoot, featureSessionControlPath(sessionId)), "utf8");
    const parsed = JSON.parse(raw);
    if (isControl(parsed)) {
      return parsed;
    }
  } catch {
  }
  return emptyControl(sessionId, now);
}
function writeSessionControl(projectRoot, control, now = () => /* @__PURE__ */ new Date(), writtenBy) {
  const stamped = {
    ...control,
    written_by: writtenBy ?? control.written_by ?? "unknown",
    pid: process.pid,
    updated_at: now().toISOString()
  };
  const abs = join2(projectRoot, featureSessionControlPath(control.session_id));
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, `${JSON.stringify(stamped, null, 2)}
`, "utf8");
  return stamped;
}
function setActiveFeature(projectRoot, sessionId, dirName, options = {}) {
  const now = options.now ?? (() => /* @__PURE__ */ new Date());
  const control = readSessionControl(projectRoot, sessionId, now);
  const paused = control.paused.filter((name) => name !== dirName);
  if (control.active && control.active !== dirName) {
    paused.push(control.active);
  }
  const next = {
    ...control,
    active: dirName,
    paused,
    lane: options.lane !== void 0 ? options.lane : control.lane
  };
  return writeSessionControl(projectRoot, next, now, options.writtenBy ?? "set-active");
}
function resumeFeature(projectRoot, sessionId, dirName, now = () => /* @__PURE__ */ new Date(), writtenBy = "resume") {
  const control = readSessionControl(projectRoot, sessionId, now);
  if (control.active === dirName) {
    return control;
  }
  if (!control.paused.includes(dirName)) {
    return null;
  }
  const paused = control.paused.filter((name) => name !== dirName);
  if (control.active) {
    paused.push(control.active);
  }
  return writeSessionControl(projectRoot, { ...control, active: dirName, paused }, now, writtenBy);
}
function markDone(projectRoot, sessionId, dirName, now = () => /* @__PURE__ */ new Date()) {
  const control = readSessionControl(projectRoot, sessionId, now);
  const next = {
    ...control,
    active: control.active === dirName ? null : control.active,
    paused: control.paused.filter((name) => name !== dirName)
  };
  return writeSessionControl(projectRoot, next, now, "mark-done");
}
function isControl(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const c = value;
  return c.doc_type === FEATURE_SESSION_DOC_TYPE && typeof c.session_id === "string" && (c.active === null || typeof c.active === "string") && Array.isArray(c.paused) && c.paused.every((name) => typeof name === "string");
}

export {
  trimTrailingChar,
  trimChar,
  slugifyAscii,
  ULID_BODY,
  ulid,
  deriveSlug,
  isSlugSafe,
  FEATURE_BUNDLE_FILES,
  LEGACY_BUNDLE_FILES,
  SCREENSHOTS_DIR,
  featureDir,
  featureChangeKey,
  featureFilePath,
  featureReportPath,
  featureScreenshotsDir,
  featureLegacySpecMarkdownPath,
  chatRagPath,
  formatFeatureDirName,
  parseFeatureDirName,
  isFeatureDirName,
  FEATURE_DOC_TYPE,
  PLAN_DOC_TYPE,
  REVIEW_DOC_TYPE,
  SPECIFICATION_DOC_TYPE,
  SPEC_SOURCE_DOC_TYPE,
  REQUEST_DOC_TYPE,
  CLARIFICATION_DOC_TYPE,
  EXPERTS_DOC_TYPE,
  DECISIONS_DOC_TYPE,
  TECH_DEBT_DOC_TYPE,
  RULE_OVERRIDE_DOC_TYPE,
  FIX_PROOF_DOC_TYPE,
  FEATURE_DOC_SCHEMA_VERSION,
  readSessionControl,
  writeSessionControl,
  setActiveFeature,
  resumeFeature,
  markDone
};
