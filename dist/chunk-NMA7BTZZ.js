import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  cachedMessageUsage,
  computeChangeCost,
  decodeReceiptStatement,
  latestFeatureReceipt,
  messageUsd,
  readChangeCost,
  readCostCache,
  roundUsd
} from "./chunk-RNHINL6K.js";
import {
  CHIEF_ROLE,
  addTokenUsage,
  emptyTokenUsage,
  foldHighTable,
  highTableDoneTimes,
  maxTokenUsage,
  readHighTable
} from "./chunk-SDFPLJXM.js";
import {
  STAGE_AGENT_HOSTS
} from "./chunk-ZCZ5KQ6D.js";
import {
  PAQAD_STATUS_GLYPH,
  PAQAD_VERDICT
} from "./chunk-5QVCE2TS.js";
import {
  episodeStart,
  readRouteTurns
} from "./chunk-3H2ZWHNF.js";
import {
  BUNDLE_MANIFEST,
  aggregateSpecPipelineMetrics,
  isBundleFileRequired,
  isFrameworkEnabledForRoot,
  isSpecFrozenBeforePipeline,
  loadDeliveryPolicy,
  readAnyDecisionPacket,
  readCanonicalSiteMap,
  readContractDecisions,
  readFeaturePlan,
  readFeatureReview,
  readFeatureSpecification,
  readRuleStopRecord,
  readRulesLoaded,
  readSpecAdoption,
  resolveFlooredMode,
  resolveRuleComplianceMode,
  sessionWroteInEpisode
} from "./chunk-MPSM3WJY.js";
import {
  hudCostCachePath,
  hudReceiptPath,
  hudSnapshotPath,
  hudVerdictPath,
  writeFileAtomic
} from "./chunk-R6UFMTHJ.js";
import {
  appendHooksLog
} from "./chunk-CJ6GEKKF.js";
import {
  StackPackLoader,
  readProjectProfile
} from "./chunk-MY3XAUJK.js";
import {
  getRuntimeRoot
} from "./chunk-VVRAO2BK.js";
import {
  readReport
} from "./chunk-VAKHLEAY.js";
import {
  readDuplication,
  readFeatureEvidence,
  readRuleRun
} from "./chunk-EOKSVX6N.js";
import {
  isPaqadArtifactPath,
  isTestFile,
  loadChangeEvidence
} from "./chunk-PMSUN52C.js";
import {
  readWorkflowState
} from "./chunk-NIAPKHOQ.js";
import {
  require_out
} from "./chunk-DNG6DDRS.js";
import {
  stripTrailingChars,
  toPosixPath,
  toProjectRelativePath
} from "./chunk-4K4CM3QN.js";
import {
  currentFeature,
  foldFeature,
  isLaneStage,
  laneStages,
  readFeatureDelivery,
  readFeatureIndexEntries,
  readFeatureStageUnit,
  stampFeatureDocument,
  writeFeatureIndexDocument
} from "./chunk-MIXUQZID.js";
import {
  branchCarriesOtherWork,
  describeInherited
} from "./chunk-MLVRTWKF.js";
import {
  STAGE_AGENT_STAGES,
  SchemaValidator,
  isReservedWorkflowPolicyFile,
  isSubagentCapableAdapter,
  layeredConfigMap,
  readConfigsDir,
  readDotConfig,
  require_dist,
  resolveFrameworkConfig,
  resolveNumericConfig,
  resolveSpecPipelineSwitches,
  stageForAgentName,
  stripPluginAgentNamespace
} from "./chunk-QMZL6OH5.js";
import {
  ENVELOPE_HEADER_KEYS,
  LANES,
  featureBranch,
  isBundleClosed,
  isBundleMaterialized,
  isFeatureFinished,
  listFeatureDirs,
  readChangeConstants,
  readFeatureRecord,
  renameWithRetrySync,
  rowRecordedAt,
  stampBundleRow
} from "./chunk-37ZC7KVF.js";
import {
  STAGE_AGENT_KIND
} from "./chunk-R3VYFIEA.js";
import {
  readGitState,
  readHeadRef
} from "./chunk-O25SHWZA.js";
import {
  appendStampedRowToUnit,
  readUnitFile
} from "./chunk-3CUGDX3J.js";
import {
  readLedgerSessionId,
  resolveSessionId
} from "./chunk-MG36YCW4.js";
import {
  FEATURE_DOC_SCHEMA_VERSION,
  FIX_PROOF_DOC_TYPE,
  RULE_OVERRIDE_DOC_TYPE,
  TECH_DEBT_DOC_TYPE,
  ULID_BODY,
  featureChangeKey,
  featureDir,
  featureFilePath,
  parseFeatureDirName,
  ulid
} from "./chunk-KF7HHHJR.js";
import {
  PATHS
} from "./chunk-UCSN7SVD.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/hud/refresh.ts
init_esm_shims();
import { existsSync as existsSync13 } from "fs";
import { join as join19 } from "path";

// src/hud/snapshot.ts
init_esm_shims();
import { appendFileSync as appendFileSync2, existsSync as existsSync12, mkdirSync as mkdirSync6, readFileSync as readFileSync11, readdirSync as readdirSync3 } from "fs";
import { join as join18 } from "path";

// src/evidence/grading.ts
init_esm_shims();
var GATE_STRENGTH_TIER = {
  "change-completeness": "deterministic",
  "ac-test-mapping": "deterministic",
  "architecture-compliance": "deterministic",
  "code-tests-lint": "deterministic",
  "behavioral-correctness": "deterministic",
  "mutation-testing": "deterministic",
  "quality-ratchet": "deterministic",
  "database-quality": "deterministic",
  "module-docs-structure": "deterministic",
  "instructions-docs-structure": "deterministic",
  "documentation-freshness": "deterministic",
  "site-map-freshness": "deterministic",
  "extension-surface": "deterministic",
  duplication: "deterministic",
  "requirement-completeness": "llm-judged",
  "story-quality": "llm-judged",
  "spec-review": "llm-judged",
  "implementation-review": "llm-judged"
};
var LATE_GATE_STRENGTH_TIER = {
  "fix-proof": "deterministic"
};
function gradeGateResult(result) {
  if (result.outcome) {
    return { verdict: "skipped", strength_class: "deterministic", skip_kind: result.outcome };
  }
  if (result.inconclusive) {
    return { verdict: "inconclusive", strength_class: "blocked" };
  }
  return {
    verdict: result.passed ? "pass" : "fail",
    strength_class: GATE_STRENGTH_TIER[result.gate]
  };
}

// src/fix-protocol/fix-proof-record.ts
init_esm_shims();
var ROWS_KEY = "rows";
function readFixProofRows(projectRoot, dirName) {
  const rows = readFeatureIndexEntries(projectRoot, dirName, "fixProof", ROWS_KEY);
  return (rows ?? []).filter(
    (row) => row !== null && typeof row === "object" && (row.phase === "red" || row.phase === "green") && typeof row.outcome === "string" && typeof row.at === "string"
  );
}
function appendFixProofRow(projectRoot, dirName, row, options = {}) {
  const rows = [...readFixProofRows(projectRoot, dirName), row];
  return writeFeatureIndexDocument({
    projectRoot,
    dirName,
    file: "fixProof",
    key: ROWS_KEY,
    docType: FIX_PROOF_DOC_TYPE,
    schemaVersion: FEATURE_DOC_SCHEMA_VERSION,
    entries: rows,
    sessionId: options.sessionId,
    now: options.now
  }).path;
}
function countedRedRow(rows) {
  let red = null;
  for (const row of rows) {
    if (row.phase === "green" && row.outcome === "green") break;
    if (row.phase === "red" && row.outcome === "red") red = row;
  }
  return red;
}
var FIX_PROOF_STATE_LABEL = {
  none: "no proof recorded",
  red: "fails before the fix, no green yet",
  "red-green": "fails before the fix, passes after",
  "green-only": "passes, but never shown failing before the fix",
  "not-reproduced": "passed before the fix, so it never reproduced the problem",
  held: "held: the fix broke a check that passed before"
};
function foldFixProofState(rows) {
  const red = countedRedRow(rows);
  if (red !== null) {
    const after2 = rows.slice(rows.indexOf(red) + 1);
    const settled = after2.filter(
      (row) => row.phase === "green" && (row.outcome === "green" || row.outcome === "held")
    );
    const last = settled.at(-1);
    if (last === void 0) return "red";
    return last.outcome === "green" ? "red-green" : "held";
  }
  if (rows.some((row) => row.phase === "green" && row.outcome === "green")) return "green-only";
  if (rows.some((row) => row.outcome === "not-reproduced")) return "not-reproduced";
  return "none";
}

// src/feature-evidence/rule-overrides.ts
init_esm_shims();
function appendRuleOverride(projectRoot, dirName, input) {
  const at = (input.now ?? (() => /* @__PURE__ */ new Date()))().toISOString();
  const row = {
    kind: "rule-override",
    rule: input.rule,
    file: input.file,
    tool_use_id: input.toolUseId,
    by: "human",
    ...input.reason ? { reason: input.reason } : {},
    at,
    session: input.sessionId
  };
  const stamped = stampBundleRow({
    docType: RULE_OVERRIDE_DOC_TYPE,
    change: featureChangeKey(dirName),
    sessionId: input.sessionId,
    schemaVersion: FEATURE_DOC_SCHEMA_VERSION,
    row: { ...row },
    now: () => new Date(at)
  });
  appendStampedRowToUnit(projectRoot, featureFilePath(dirName, "ruleOverrides"), stamped);
  return row;
}
function str(value) {
  return typeof value === "string" && value !== "" ? value : null;
}
function readRuleOverrides(projectRoot, dirName) {
  return readUnitFile(projectRoot, featureFilePath(dirName, "ruleOverrides")).flatMap((raw) => {
    const row = raw;
    const rule = str(row.rule);
    const file = str(row.file);
    const at = str(row.at);
    const session = str(row.session);
    if (row.kind !== "rule-override" || !rule || !file || !at || !session) return [];
    const reason2 = str(row.reason);
    return [
      {
        kind: "rule-override",
        rule,
        file,
        tool_use_id: str(row.tool_use_id),
        by: "human",
        ...reason2 ? { reason: reason2 } : {},
        at,
        session
      }
    ];
  });
}

// src/feature-evidence/tech-debt-index.ts
init_esm_shims();

// src/tech-debt/items.ts
init_esm_shims();
var import_yaml = __toESM(require_dist(), 1);
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
var DEBT_KINDS = ["bug", "debt", "gap", "follow-up"];
var DEBT_SEVERITIES = ["low", "medium", "high"];
var DEBT_STATUSES = ["open", "promoted", "closed"];
var TD_ID_PATTERN = new RegExp(`^TD-${ULID_BODY}$`);
var FRONT_MATTER_BOUNDARY = "---";
var BODY_HEADING = "## What";
var TechDebtError = class extends Error {
};
function mintTechDebtId() {
  return `TD-${ulid()}`;
}
function isTechDebtId(id) {
  return TD_ID_PATTERN.test(id);
}
function assertTechDebtId(id) {
  if (!isTechDebtId(id)) {
    throw new TechDebtError(`"${id}" is not a tech-debt id; expected TD-<ULID>.`);
  }
}
function techDebtDir(projectRoot) {
  return join(projectRoot, PATHS.TECH_DEBT_DIR);
}
function techDebtItemPath(projectRoot, id) {
  assertTechDebtId(id);
  return join(techDebtDir(projectRoot), `${id}.md`);
}
function normalizeDebtTitle(title) {
  return title.toLowerCase().replace(/\s+/g, " ").trim();
}
function normalizeDebtFiles(projectRoot, files) {
  const normalized = files.map((file) => {
    const relativePath = toProjectRelativePath(projectRoot, file);
    if (relativePath === null) {
      throw new TechDebtError(`--file "${file}" resolves outside the project root.`);
    }
    return relativePath;
  });
  return [...new Set(normalized)].sort();
}
function dedupeKey(title, files) {
  return JSON.stringify([normalizeDebtTitle(title), [...files].sort()]);
}
function oneOf(value, allowed, flag) {
  if (allowed.includes(value)) {
    return value;
  }
  throw new TechDebtError(`${flag} must be one of ${allowed.join(", ")}; got "${value}".`);
}
function textOrNull(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}
function serializeDebtItem(item) {
  const frontMatter = {
    id: item.id,
    title: item.title,
    kind: item.kind,
    severity: item.severity,
    status: item.status,
    files: item.files,
    found_in: item.found_in,
    found_by: item.found_by,
    session: item.session,
    created_at: item.created_at,
    reopened_at: item.reopened_at,
    issue: item.issue,
    closed_reason: item.closed_reason
  };
  const yaml = import_yaml.default.stringify(frontMatter, {
    defaultStringType: "QUOTE_DOUBLE",
    defaultKeyType: "PLAIN",
    lineWidth: 0
  });
  const body = stripTrailingChars(item.body, " 	\r\n");
  return `${FRONT_MATTER_BOUNDARY}
${yaml}${FRONT_MATTER_BOUNDARY}

${BODY_HEADING}

${body}
`;
}
function parseDebtItem(text) {
  const lines = text.split(/\r?\n/);
  if (lines[0] !== FRONT_MATTER_BOUNDARY) {
    return null;
  }
  const closing = lines.indexOf(FRONT_MATTER_BOUNDARY, 1);
  if (closing === -1) {
    return null;
  }
  let data;
  try {
    const parsed = import_yaml.default.parse(lines.slice(1, closing).join("\n"));
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }
    data = parsed;
  } catch {
    return null;
  }
  const id = textOrNull(data.id);
  const title = textOrNull(data.title);
  if (id === null || !isTechDebtId(id) || title === null) {
    return null;
  }
  const kind = String(data.kind);
  const severity = String(data.severity);
  const status = String(data.status);
  if (!DEBT_KINDS.includes(kind) || !DEBT_SEVERITIES.includes(severity) || !DEBT_STATUSES.includes(status)) {
    return null;
  }
  const foundIn = data.found_in !== null && typeof data.found_in === "object" ? data.found_in : {};
  const rest = lines.slice(closing + 1);
  const headingAt = rest.indexOf(BODY_HEADING);
  const bodyLines = headingAt === -1 ? rest : rest.slice(headingAt + 1);
  return {
    id,
    title,
    kind,
    severity,
    status,
    files: Array.isArray(data.files) ? data.files.filter((f) => typeof f === "string") : [],
    found_in: {
      change: textOrNull(foundIn.change),
      issue: textOrNull(foundIn.issue),
      stage: textOrNull(foundIn.stage)
    },
    found_by: textOrNull(data.found_by) ?? "orchestrator",
    session: textOrNull(data.session),
    created_at: textOrNull(data.created_at) ?? "",
    reopened_at: textOrNull(data.reopened_at),
    issue: textOrNull(data.issue),
    closed_reason: textOrNull(data.closed_reason),
    body: bodyLines.join("\n").trim()
  };
}
function readDebtItems(projectRoot) {
  let names;
  try {
    names = readdirSync(techDebtDir(projectRoot));
  } catch {
    return [];
  }
  const items = [];
  for (const name of names.filter((entry) => /^TD-.+\.md$/.test(entry)).sort()) {
    const item = parseDebtItem(readFileSync(join(techDebtDir(projectRoot), name), "utf8"));
    if (item !== null && `${item.id}.md` === name) {
      items.push(item);
    }
  }
  return items;
}
function readDebtItem(projectRoot, id) {
  const path = techDebtItemPath(projectRoot, id);
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    throw new TechDebtError(`No tech-debt item ${id} under ${PATHS.TECH_DEBT_DIR}.`);
  }
  const item = parseDebtItem(text);
  if (item === null || item.id !== id) {
    throw new TechDebtError(`Tech-debt item ${id} has unreadable front matter.`);
  }
  return item;
}
function writeDebtItem(projectRoot, item) {
  const path = techDebtItemPath(projectRoot, item.id);
  mkdirSync(techDebtDir(projectRoot), { recursive: true });
  writeFileSync(path, serializeDebtItem(item));
}
function addDebtItem(projectRoot, input, now = /* @__PURE__ */ new Date()) {
  const title = input.title.trim();
  if (title.length === 0) {
    throw new TechDebtError("--title must not be empty.");
  }
  const kind = oneOf(input.kind, DEBT_KINDS, "--kind");
  const severity = oneOf(input.severity, DEBT_SEVERITIES, "--severity");
  const files = normalizeDebtFiles(projectRoot, input.files);
  const key = dedupeKey(title, files);
  const match = readDebtItems(projectRoot).find(
    (item2) => dedupeKey(item2.title, item2.files) === key
  );
  if (match !== void 0) {
    if (match.status !== "closed") {
      return { id: match.id, outcome: "existing", item: match };
    }
    const reopened = { ...match, status: "open", reopened_at: now.toISOString() };
    writeDebtItem(projectRoot, reopened);
    return { id: reopened.id, outcome: "reopened", item: reopened };
  }
  const item = {
    id: mintTechDebtId(),
    title,
    kind,
    severity,
    status: "open",
    files,
    found_in: {
      change: input.foundIn?.change ?? null,
      issue: input.foundIn?.issue ?? null,
      stage: input.foundIn?.stage ?? null
    },
    found_by: textOrNull(input.foundBy?.trim()) ?? "orchestrator",
    session: input.session ?? null,
    created_at: now.toISOString(),
    reopened_at: null,
    issue: null,
    closed_reason: null,
    body: input.body ?? ""
  };
  writeDebtItem(projectRoot, item);
  return { id: item.id, outcome: "created", item };
}
function promoteDebtItem(projectRoot, id, issue) {
  const ref = issue.trim();
  if (ref.length === 0) {
    throw new TechDebtError("--issue must not be empty.");
  }
  const item = { ...readDebtItem(projectRoot, id), status: "promoted", issue: ref };
  writeDebtItem(projectRoot, item);
  return item;
}
function closeDebtItem(projectRoot, id, reason2) {
  const why = reason2.trim();
  if (why.length === 0) {
    throw new TechDebtError("--reason must not be empty.");
  }
  const item = {
    ...readDebtItem(projectRoot, id),
    status: "closed",
    closed_reason: why
  };
  writeDebtItem(projectRoot, item);
  return item;
}
function listDebtItems(projectRoot, filter = {}) {
  const status = filter.status ?? "open";
  return readDebtItems(projectRoot).filter((item) => status === "all" || item.status === status).filter((item) => filter.change === void 0 || item.found_in.change === filter.change).sort(newestFirst);
}
function newestFirst(a, b) {
  return b.created_at.localeCompare(a.created_at) || b.id.localeCompare(a.id);
}

// src/feature-evidence/tech-debt-index.ts
function collectFeatureTechDebt(projectRoot, dirName) {
  const changeKey = featureChangeKey(dirName);
  return readDebtItems(projectRoot).filter((item) => item.found_in.change === changeKey).map((item) => ({ id: item.id, title: item.title, kind: item.kind, severity: item.severity })).sort((a, b) => a.id.localeCompare(b.id));
}
function readFeatureTechDebtIndex(projectRoot, dirName) {
  return readFeatureIndexEntries(projectRoot, dirName, "techDebt", "items");
}
function writeFeatureTechDebtIndex(projectRoot, dirName, options = {}) {
  const items = collectFeatureTechDebt(projectRoot, dirName);
  const { path, written } = writeFeatureIndexDocument({
    projectRoot,
    dirName,
    file: "techDebt",
    key: "items",
    docType: TECH_DEBT_DOC_TYPE,
    schemaVersion: FEATURE_DOC_SCHEMA_VERSION,
    entries: items,
    sessionId: options.sessionId,
    now: options.now
  });
  return { path, items, written };
}

// src/cost/session-cost.ts
init_esm_shims();
function workflowCostSince(projectRoot, sessionId, since) {
  const from = Date.parse(since);
  const cache = readCostCache(hudCostCachePath(projectRoot, sessionId), sessionId);
  const mains = Object.values(cache.sources).filter((source) => source.kind === "main");
  if (mains.length === 0 || Number.isNaN(from)) return { tokens: null, usd: null, unpriced: [] };
  const messages = /* @__PURE__ */ new Map();
  for (const source of mains) {
    for (const [id, kept] of Object.entries(source.messages)) {
      const at = kept[1] === null ? Number.NaN : Date.parse(kept[1]);
      if (Number.isNaN(at) || at < from) continue;
      const usage2 = cachedMessageUsage(kept);
      const existing = messages.get(id);
      messages.set(id, {
        model: existing?.model ?? kept[0],
        usage: existing ? maxTokenUsage(existing.usage, usage2) : usage2
      });
    }
  }
  let usage = emptyTokenUsage();
  let usd = 0;
  let priced = false;
  const unpriced = /* @__PURE__ */ new Set();
  for (const message of messages.values()) {
    usage = addTokenUsage(usage, message.usage);
    const cost = messageUsd(message.usage, message.model);
    if (cost === null) {
      unpriced.add(message.model ?? "unknown");
    } else {
      usd += cost;
      priced = true;
    }
  }
  return {
    tokens: usage.total,
    usd: priced ? roundUsd(usd) : null,
    unpriced: [...unpriced].sort()
  };
}

// src/traceability/change-map.ts
init_esm_shims();
import { closeSync, fstatSync, openSync, readFileSync as readFileSync3 } from "fs";
import { join as join6 } from "path";

// src/verification/gates/ac-test-mapping.ts
init_esm_shims();

// src/verification/gates/shared.ts
init_esm_shims();
function checkBooleanGate(gate, value, passDetail, failDetail, remediation) {
  return {
    gate,
    passed: value,
    detail: value ? passDetail : failDetail,
    remediation: value ? void 0 : remediation
  };
}
function createPass(gate, detail) {
  return { gate, passed: true, detail };
}
function createFail(gate, detail, remediation) {
  return { gate, passed: false, detail, remediation };
}
function createInconclusive(gate, detail, remediation) {
  return { gate, passed: false, inconclusive: true, detail, remediation };
}
function createNotRequired(gate, detail) {
  return { gate, passed: true, outcome: "not-required", detail };
}
function createDidNotRun(gate, detail, remediation) {
  return {
    gate,
    passed: true,
    outcome: "did-not-run",
    detail,
    ...remediation !== void 0 ? { remediation } : {}
  };
}

// src/verification/gates/ac-test-mapping.ts
var AC_ID_PATTERN = /AC-\d+(?:\.\d+)?/;
function extractAcIdFromIssue(issue) {
  const candidates = [issue.test_id, issue.suite ?? ""];
  for (const candidate of candidates) {
    if (!candidate) continue;
    const match = AC_ID_PATTERN.exec(candidate);
    if (match) {
      return match[0];
    }
  }
  return null;
}
function collectObservedAcIds(structuredResults) {
  const observed = /* @__PURE__ */ new Set();
  for (const result of structuredResults) {
    for (const issue of result.failures) {
      const acId = extractAcIdFromIssue(issue);
      if (acId) observed.add(acId);
    }
    for (const issue of result.errors) {
      const acId = extractAcIdFromIssue(issue);
      if (acId) observed.add(acId);
    }
  }
  return [...observed].sort();
}
var AcTestMappingGate = class {
  gate = "ac-test-mapping";
  async check(context) {
    const detail = context.ac_test_mapping_detail;
    if (!context.ac_test_mapping_passed || context.ac_test_mapping_outcome === "fail") {
      return createFail(
        this.gate,
        detail ?? "Acceptance criteria are missing test mappings",
        "Add a test that names each listed criterion id in its title, describe title or an `@obligation` tag."
      );
    }
    if (context.ac_test_mapping_outcome === "not-required") {
      return createNotRequired(
        this.gate,
        detail ?? "No frozen spec, so no acceptance criteria to map."
      );
    }
    if (context.ac_test_mapping_outcome === "did-not-run" || detail === void 0) {
      return createDidNotRun(
        this.gate,
        detail ?? "No acceptance-criteria map was built, so no criterion was checked."
      );
    }
    const observed = collectObservedAcIds(context.structured_test_results ?? []);
    return createPass(
      this.gate,
      observed.length > 0 ? `${detail} Observed in failing tests: ${observed.join(", ")}.` : detail
    );
  }
};

// src/traceability/inputs.ts
init_esm_shims();
var import_fast_glob = __toESM(require_out(), 1);
import { existsSync as existsSync2, readFileSync as readFileSync2 } from "fs";
import { join as join4 } from "path";

// src/graph/import-scanner.ts
init_esm_shims();
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import {
  dirname,
  extname,
  isAbsolute,
  join as join2,
  normalize,
  posix,
  relative,
  resolve,
  sep
} from "path";
var SOURCE_EXTENSIONS = /* @__PURE__ */ new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
var RESOLUTION_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"];
var IMPORT_PATTERNS = [
  /\bimport\s+(?:[^'";]+\s+from\s+)?["']([^"']+)["']/g,
  /\bexport\s+(?:\*|\{[^}]*\})\s+from\s+["']([^"']+)["']/g,
  /\bimport\(\s*["']([^"']+)["']\s*\)/g,
  /\brequire\(\s*["']([^"']+)["']\s*\)/g
];
function toForward(p) {
  return p.split(sep).join("/");
}
function toProjectRelative(projectRoot, abs) {
  const rel = relative(projectRoot, abs);
  return rel === "" ? "." : toForward(rel);
}
function isSourceFile(relPath) {
  return SOURCE_EXTENSIONS.has(extname(relPath).toLowerCase());
}
function resolveWithExtensions(absCandidate) {
  if (existsSync(absCandidate)) {
    const ext = extname(absCandidate).toLowerCase();
    if (SOURCE_EXTENSIONS.has(ext)) return absCandidate;
  }
  for (const ext of RESOLUTION_EXTENSIONS) {
    const withExt = absCandidate + ext;
    if (existsSync(withExt)) return withExt;
  }
  for (const ext of RESOLUTION_EXTENSIONS) {
    const indexFile = join2(absCandidate, "index" + ext);
    if (existsSync(indexFile)) return indexFile;
  }
  return null;
}
function stripExplicitExtension(spec) {
  const ext = extname(spec).toLowerCase();
  if (ext === ".js" || ext === ".mjs" || ext === ".cjs") {
    return spec.slice(0, -ext.length);
  }
  return spec;
}
function extractImportSpecifiers(content) {
  const specs = [];
  for (const pattern of IMPORT_PATTERNS) {
    pattern.lastIndex = 0;
    let m;
    while ((m = pattern.exec(content)) !== null) {
      specs.push(m[1]);
    }
  }
  return specs;
}
function resolveSpecifier(spec, fromAbsFile, projectRoot, aliases) {
  if (spec.startsWith("node:")) return null;
  for (const [alias, target] of Object.entries(aliases)) {
    if (spec === alias.replace(/\/$/, "") || spec.startsWith(alias)) {
      const remainder = spec.slice(alias.length);
      const aliasedAbs = join2(projectRoot, target, remainder);
      const resolved = resolveWithExtensions(stripExplicitExtension(aliasedAbs));
      return resolved ? toProjectRelative(projectRoot, resolved) : null;
    }
  }
  if (spec.startsWith(".") || isAbsolute(spec)) {
    const base = isAbsolute(spec) ? spec : resolve(dirname(fromAbsFile), spec);
    const resolved = resolveWithExtensions(stripExplicitExtension(base));
    return resolved ? toProjectRelative(projectRoot, resolved) : null;
  }
  return null;
}
async function scanImports(options) {
  const projectRoot = options.projectRoot;
  const aliases = options.aliases ?? {};
  const edges = [];
  const seen = /* @__PURE__ */ new Set();
  for (const relPath of options.files) {
    if (!isSourceFile(relPath)) continue;
    const absFile = join2(projectRoot, relPath);
    let content;
    try {
      content = await readFile(absFile, "utf8");
    } catch {
      continue;
    }
    const specs = extractImportSpecifiers(content);
    for (const spec of specs) {
      const target = resolveSpecifier(spec, absFile, projectRoot, aliases);
      if (!target) continue;
      const key = relPath + "\0" + target;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ from: normalize(relPath).split(sep).join(posix.sep), to: target });
    }
  }
  return edges;
}

// src/module-map/source-roots.ts
init_esm_shims();
function packModuleHealth(pack) {
  return pack.manifest.module_health;
}
function discoverSourceRoots(projectRoot) {
  const profile = readProjectProfile(projectRoot);
  const requested = profile?.stack_profile?.frameworks ?? [];
  const loader = new StackPackLoader();
  const registry = loader.load({
    runtimeRoot: getRuntimeRoot(),
    projectRoot
  });
  const orderedNames = requested.length > 0 ? [...requested, ...Array.from(registry.packs.keys()).filter((n) => !requested.includes(n))] : Array.from(registry.packs.keys());
  for (const name of orderedNames) {
    const pack = registry.packs.get(name);
    if (pack === void 0) continue;
    const mh = packModuleHealth(pack);
    if (mh !== void 0 && Array.isArray(mh.source_roots) && mh.source_roots.length > 0) {
      return { source_roots: mh.source_roots, reason: "pack", pack_name: name };
    }
  }
  return { source_roots: null, reason: "unknown", pack_name: null };
}
function discoverModuleHealth(projectRoot) {
  const profile = readProjectProfile(projectRoot);
  const requested = profile?.stack_profile?.frameworks ?? [];
  const loader = new StackPackLoader();
  const registry = loader.load({
    runtimeRoot: getRuntimeRoot(),
    projectRoot
  });
  const orderedNames = requested.length > 0 ? [...requested, ...Array.from(registry.packs.keys()).filter((n) => !requested.includes(n))] : Array.from(registry.packs.keys());
  for (const name of orderedNames) {
    const pack = registry.packs.get(name);
    if (pack === void 0) continue;
    const mh = packModuleHealth(pack);
    if (mh !== void 0 && Array.isArray(mh.source_roots) && mh.source_roots.length > 0) {
      return { module_health: mh, pack_name: name };
    }
  }
  return { module_health: null, pack_name: null };
}

// src/verification/evidence.ts
init_esm_shims();
import { mkdir, rename, writeFile } from "fs/promises";
import { dirname as dirname2, join as join3 } from "path";

// src/core/types/verification.ts
init_esm_shims();
var VERIFICATION_GATES = [
  "change-completeness",
  "requirement-completeness",
  "story-quality",
  "ac-test-mapping",
  "spec-review",
  "architecture-compliance",
  "code-tests-lint",
  "implementation-review",
  "behavioral-correctness",
  "mutation-testing",
  "quality-ratchet",
  "database-quality",
  "module-docs-structure",
  "instructions-docs-structure",
  "documentation-freshness",
  "site-map-freshness",
  "extension-surface",
  "duplication"
];
var BACKSTOP_VERIFICATION_ORIGINS = [
  "hook-completion",
  "git-backstop",
  "ci-backstop"
];
function isBackstopVerificationOrigin(origin) {
  return origin !== void 0 && BACKSTOP_VERIFICATION_ORIGINS.includes(origin);
}

// src/core/types/verification-evidence.ts
init_esm_shims();
var VERIFICATION_EVIDENCE_SCHEMA_VERSION = "1.1.0";
var EVIDENCE_GATE_STATUSES = ["pass", "fail", "inconclusive", "skipped"];
var EVIDENCE_OVERALL_STATUSES = ["pass", "fail", "error"];
var EVIDENCE_FAILURE_CATEGORIES = [
  "test-failure",
  "test-error",
  "test-timeout",
  "gate-failure"
];

// src/verification/evidence.ts
var VERIFICATION_EVIDENCE_RELATIVE_PATH = ".paqad/session/verification-evidence.json";
var VERIFICATION_EVIDENCE_STDERR_BUDGET_BYTES = 2048;
function buildVerificationEvidence(input) {
  const resultByGate = /* @__PURE__ */ new Map();
  for (const result of input.results) {
    resultByGate.set(result.gate, result);
  }
  const testFailures = collectTestFailures(input.context.structured_test_results ?? []);
  const mutationResult = input.context.mutation_result;
  const gates = VERIFICATION_GATES.map((gate) => {
    const result = resultByGate.get(gate);
    if (!result) {
      return {
        name: gate,
        status: "skipped",
        detail: "Gate did not run.",
        remediation: null,
        failures: [],
        skip_reason: "not checked in this run",
        skip_kind: "did-not-run"
      };
    }
    const status = mapGateStatus(result);
    const failures = gate === "code-tests-lint" ? testFailures : gate === "mutation-testing" ? collectMutationFailures(mutationResult) : [];
    return {
      name: gate,
      status,
      detail: result.detail,
      remediation: result.remediation ?? null,
      failures,
      ...result.outcome ? { skip_kind: result.outcome } : {},
      ...gate === "mutation-testing" && mutationResult ? { confidence: mutationResult.confidence } : {}
    };
  });
  const firstFailureGate = gates.find(
    (gate) => gate.status === "fail" || gate.status === "inconclusive"
  );
  const overallStatus = firstFailureGate ? "fail" : "pass";
  return {
    schema_version: VERIFICATION_EVIDENCE_SCHEMA_VERSION,
    run_id: input.run_id,
    started_at: input.started_at,
    completed_at: input.completed_at,
    overall_status: overallStatus,
    first_failure_gate: firstFailureGate?.name ?? null,
    gates
  };
}
async function writeVerificationEvidence(evidence, options) {
  const targetPath = join3(options.project_root, VERIFICATION_EVIDENCE_RELATIVE_PATH);
  await mkdir(dirname2(targetPath), { recursive: true });
  const tempPath = `${targetPath}.tmp-${process.pid}-${Date.now()}`;
  const payload = `${JSON.stringify(evidence, null, 2)}
`;
  await writeFile(tempPath, payload, "utf8");
  await rename(tempPath, targetPath);
  return targetPath;
}
function mapGateStatus(result) {
  if (result.outcome) {
    return "skipped";
  }
  if (result.passed) {
    return "pass";
  }
  if (result.inconclusive) {
    return "inconclusive";
  }
  return "fail";
}
function collectTestFailures(structuredResults) {
  const failures = [];
  for (const result of structuredResults) {
    for (const issue of result.failures) {
      failures.push(toEvidenceFailure(issue));
    }
    for (const issue of result.errors) {
      failures.push(toEvidenceFailure(issue));
    }
  }
  return failures;
}
function collectMutationFailures(mutationResult) {
  if (!mutationResult) {
    return [];
  }
  return mutationResult.surviving_mutants.map((mutant) => ({
    category: "gate-failure",
    file: mutant.file,
    line: mutant.line,
    test_id: null,
    suite: null,
    ac_id: null,
    message: mutant.description ? `Surviving mutant (${mutant.operator}): ${mutant.description}` : `Surviving mutant (${mutant.operator})`,
    stderr_excerpt: null
  }));
}
function toEvidenceFailure(issue) {
  const message = issue.message;
  const stderrSource = issue.stack_trace ?? issue.message;
  const stderrExcerpt = truncateForBudget(stderrSource, VERIFICATION_EVIDENCE_STDERR_BUDGET_BYTES);
  const acId = extractAcIdFromIssue(issue);
  return {
    category: mapTestCategory(issue.category),
    file: issue.file_path,
    line: issue.line_number,
    test_id: issue.test_id || null,
    suite: issue.suite,
    ac_id: acId,
    message,
    stderr_excerpt: stderrExcerpt
  };
}
function mapTestCategory(category) {
  if (category === "error") return "test-error";
  if (category === "timeout") return "test-timeout";
  if (category === "assertion" || category === "unknown") return "test-failure";
  return "test-failure";
}
function truncateForBudget(value, budgetBytes) {
  if (!value) {
    return null;
  }
  const buffer = Buffer.from(value, "utf8");
  if (buffer.byteLength <= budgetBytes) {
    return value;
  }
  return buffer.subarray(0, budgetBytes).toString("utf8");
}

// src/traceability/inputs.ts
function readComplianceReports(projectRoot) {
  const dir = join4(projectRoot, ".paqad", "compliance");
  if (!existsSync2(dir)) return [];
  const files = import_fast_glob.default.sync("**/report.json", { cwd: dir, absolute: true });
  const reports = [];
  for (const file of files) {
    try {
      const report = JSON.parse(readFileSync2(file, "utf8"));
      if (Array.isArray(report.obligations)) reports.push(report);
    } catch {
    }
  }
  return reports;
}
function readObligationPromises(projectRoot) {
  const promises = [];
  const proofs = [];
  const seenPromise = /* @__PURE__ */ new Set();
  for (const report of readComplianceReports(projectRoot)) {
    for (const obligation of report.obligations) {
      if (seenPromise.has(obligation.obligation_id)) continue;
      seenPromise.add(obligation.obligation_id);
      promises.push({
        promise_id: obligation.obligation_id,
        description: obligation.description,
        source: "obligation"
      });
      const checks = (obligation.evidence ?? []).map(toPosixPath);
      if (checks.length > 0) proofs.push({ promise_id: obligation.obligation_id, checks });
    }
  }
  return { promises, proofs };
}

// src/traceability/map-builder.ts
init_esm_shims();

// src/core/types/traceability.ts
init_esm_shims();
var TRACEABILITY_MAP_SCHEMA_VERSION = "1.0.0";

// src/traceability/reachability.ts
init_esm_shims();
var REACHED_FROM_SAMPLE = 3;
function solveReachability(input) {
  const importsOf = /* @__PURE__ */ new Map();
  const importedBy = /* @__PURE__ */ new Map();
  const push = (map, key, value) => {
    const bucket = map.get(key);
    if (bucket) bucket.push(value);
    else map.set(key, [value]);
  };
  for (const { from, to } of input.edges) {
    push(importsOf, from, to);
    push(importedBy, to, from);
  }
  const used = /* @__PURE__ */ new Set();
  const queue = [];
  for (const anchor of input.anchors) {
    if (!used.has(anchor)) {
      used.add(anchor);
      queue.push(anchor);
    }
  }
  while (queue.length > 0) {
    const current = queue.shift();
    for (const next of importsOf.get(current) ?? []) {
      if (!used.has(next)) {
        used.add(next);
        queue.push(next);
      }
    }
  }
  const anchorSet = new Set(input.anchors);
  const reachedFrom = /* @__PURE__ */ new Map();
  for (const file of used) {
    if (anchorSet.has(file)) continue;
    const importers = (importedBy.get(file) ?? []).filter((f) => used.has(f));
    reachedFrom.set(file, importers.slice(0, REACHED_FROM_SAMPLE));
  }
  const orphans = input.universe.filter((file) => !used.has(file)).sort();
  return { used, orphans, reachedFrom };
}

// src/traceability/map-builder.ts
function indexBy(rows, key) {
  const map = /* @__PURE__ */ new Map();
  for (const row of rows) map.set(key(row), row);
  return map;
}
function uniqueSorted(values) {
  return [...new Set(values)].sort();
}
function buildTraceabilityMap(input) {
  const mode = input.lane === "fast" ? "light" : "full";
  const universe = uniqueSorted(input.codeUniverse);
  const universeSet = new Set(universe);
  const deliveryByPromise = /* @__PURE__ */ new Map();
  const ensurePromise = (id) => {
    const existing = deliveryByPromise.get(id);
    if (existing) return existing;
    const fresh = /* @__PURE__ */ new Set();
    deliveryByPromise.set(id, fresh);
    return fresh;
  };
  for (const entry of input.delivery) {
    const bucket = ensurePromise(entry.promise_id);
    for (const file of entry.files) bucket.add(file);
  }
  for (const marker of input.markers ?? []) {
    for (const id of marker.promise_ids) ensurePromise(id).add(marker.file);
  }
  const proofsByPromise = /* @__PURE__ */ new Map();
  for (const entry of input.proofs) {
    const bucket = proofsByPromise.get(entry.promise_id) ?? /* @__PURE__ */ new Set();
    for (const check of entry.checks) bucket.add(check);
    proofsByPromise.set(entry.promise_id, bucket);
  }
  const promiseById = indexBy(input.promises, (p) => p.promise_id);
  const forward = [];
  const findings = [];
  for (const promise of input.promises) {
    const delivering = uniqueSorted(deliveryByPromise.get(promise.promise_id) ?? []);
    const checks = uniqueSorted(proofsByPromise.get(promise.promise_id) ?? []);
    const proven = checks.length > 0;
    forward.push({
      promise_id: promise.promise_id,
      source: promise.source,
      description: promise.description,
      delivering_code: delivering,
      proving_checks: checks,
      proven
    });
    if (!proven) {
      findings.push({
        code: "TR-UNTESTED-PROMISE",
        promise_id: promise.promise_id,
        paths: delivering,
        detail: `Promise "${promise.promise_id}" has no proving check \u2014 we said we'd do this and nothing tests it.`
      });
    }
  }
  const anchorFiles = /* @__PURE__ */ new Set();
  const promiseIdsByFile = /* @__PURE__ */ new Map();
  for (const [promiseId, files] of deliveryByPromise) {
    if (!promiseById.has(promiseId)) continue;
    for (const file of files) {
      if (!universeSet.has(file)) continue;
      anchorFiles.add(file);
      const ids = promiseIdsByFile.get(file) ?? /* @__PURE__ */ new Set();
      ids.add(promiseId);
      promiseIdsByFile.set(file, ids);
    }
  }
  const anchorsKnown = anchorFiles.size > 0;
  const blockedReason = anchorsKnown ? null : input.promises.length === 0 ? "no_promises_discovered" : "no_delivering_code_resolved";
  const { used, orphans, reachedFrom } = solveReachability({
    edges: input.edges,
    anchors: [...anchorFiles],
    universe
  });
  const changedSet = mode === "light" ? new Set(input.changedFiles ?? []) : null;
  const inOrphanScope = (file) => changedSet === null ? true : changedSet.has(file);
  const backward = [];
  let deliversCount = 0;
  let sharedCount = 0;
  let orphanCount = 0;
  const orphanSet = new Set(orphans);
  for (const file of universe) {
    const promiseIds = uniqueSorted(promiseIdsByFile.get(file) ?? []);
    const isAnchor = anchorFiles.has(file);
    const isUsed = used.has(file);
    let role;
    if (isAnchor) {
      role = "delivers-promise";
      deliversCount++;
    } else if (isUsed) {
      role = "shared-groundwork";
      sharedCount++;
    } else {
      role = "orphan";
    }
    backward.push({
      file,
      promise_ids: promiseIds,
      used_by_promise: isUsed && !isAnchor,
      reached_from: reachedFrom.get(file) ?? [],
      role
    });
    if (role === "orphan" && anchorsKnown && orphanSet.has(file) && inOrphanScope(file)) {
      orphanCount++;
      findings.push({
        code: "TR-CODE-ORPHAN",
        promise_id: null,
        paths: [file],
        detail: `Code "${file}" answers to no promise and nothing-with-a-promise uses it \u2014 exists, nothing asked for it, nothing uses it.`
      });
    }
  }
  return {
    schema_version: TRACEABILITY_MAP_SCHEMA_VERSION,
    generated_at: input.now(),
    lane: input.lane,
    mode,
    anchors_known: anchorsKnown,
    blocked_reason: blockedReason,
    forward,
    backward,
    findings,
    counts: {
      promises: input.promises.length,
      untested_promises: findings.filter((f) => f.code === "TR-UNTESTED-PROMISE").length,
      delivers_promise: deliversCount,
      shared_groundwork: sharedCount,
      orphan_code: orphanCount
    }
  };
}

// src/traceability/writer.ts
init_esm_shims();
import { randomBytes } from "crypto";
import { existsSync as existsSync3 } from "fs";
import { mkdir as mkdir2, readFile as readFile2, rename as rename2, rm, writeFile as writeFile2 } from "fs/promises";
import { dirname as dirname3, join as join5 } from "path";
function traceabilityMapPath(projectRoot) {
  return join5(projectRoot, PATHS.TRACEABILITY_MAP);
}
async function writeTraceabilityMap(projectRoot, map) {
  const target = traceabilityMapPath(projectRoot);
  await mkdir2(dirname3(target), { recursive: true });
  const tmp = `${target}.tmp-${process.pid}-${randomBytes(6).toString("hex")}`;
  try {
    await writeFile2(tmp, JSON.stringify(map, null, 2) + "\n", "utf8");
    await rename2(tmp, target);
  } catch (error) {
    await rm(tmp, { force: true });
    throw error;
  }
  return target;
}
async function readTraceabilityMap(projectRoot) {
  const target = traceabilityMapPath(projectRoot);
  if (!existsSync3(target)) return null;
  try {
    return JSON.parse(await readFile2(target, "utf8"));
  } catch {
    return null;
  }
}

// src/traceability/change-map.ts
var SCANNABLE_TEST_FILE = /\.(?:[cm]?[jt]sx?|py|rb|php|go|java|kt|kts|cs|rs|swift|ex|exs)$/;
var MAX_TEST_FILE_BYTES = 2 * 1024 * 1024;
var TEST_CALL = /(?<![\w$.])(?:it|test|describe|suite|context)((?:\.[A-Za-z]+)*)\s*\(/g;
var OBLIGATION_TAG = /@obligation\b([^\n]*)/g;
function buildChangeTraceabilityMap(options) {
  if (!options.dirName) return null;
  const spec = readFeatureSpecification(options.projectRoot, options.dirName);
  if (!spec || !spec.frozen) return null;
  const criteria = Array.isArray(spec.acceptance_criteria) ? spec.acceptance_criteria : [];
  const automated = criteria.filter((c) => c.proof_type === "automated");
  const automatedIds = automated.map((c) => c.criterion_id);
  const failing = collectFailingAcIds(automatedIds, options.failingAcIds, options.testResults);
  const proofsByAc = /* @__PURE__ */ new Map();
  for (const file of changedTestFiles(options.changedFiles)) {
    const texts = readTitlesAndTags(options.projectRoot, file);
    if (texts.length === 0) continue;
    for (const id of automatedIds) {
      if (failing.has(id)) continue;
      if (!texts.some((text) => namesCriterion(text, id))) continue;
      const bucket = proofsByAc.get(id) ?? /* @__PURE__ */ new Set();
      bucket.add(file);
      proofsByAc.set(id, bucket);
    }
  }
  const acIdSet = new Set(automatedIds);
  const promises = automated.map((c) => ({
    promise_id: c.criterion_id,
    description: describeCriterion(c),
    source: "acceptance-criterion"
  }));
  const proofs = [...proofsByAc].map(([promise_id, files]) => ({
    promise_id,
    checks: [...files].sort()
  }));
  const obligations = readObligationPromises(options.projectRoot);
  promises.push(...obligations.promises.filter((p) => !acIdSet.has(p.promise_id)));
  proofs.push(...obligations.proofs.filter((p) => !acIdSet.has(p.promise_id)));
  const map = buildTraceabilityMap({
    lane: options.lane,
    now: options.now ?? (() => (/* @__PURE__ */ new Date()).toISOString()),
    promises,
    delivery: [],
    proofs,
    edges: [],
    codeUniverse: [],
    changedFiles: [...options.changedFiles],
    markers: []
  });
  return {
    map: { ...map, scope: "change", change: options.dirName },
    automated: automatedIds,
    visual: criteria.filter((c) => c.proof_type === "visual").map((c) => c.criterion_id),
    manual: criteria.filter((c) => c.proof_type === "manual").map((c) => c.criterion_id)
  };
}
async function buildAndWriteChangeTraceabilityMap(options, onError) {
  let result;
  try {
    result = buildChangeTraceabilityMap(options);
  } catch (error) {
    const message = `could not build the acceptance-criteria map (${describeError(error)})`;
    onError(message);
    return { result: null, error: message };
  }
  if (result) {
    try {
      await writeTraceabilityMap(options.projectRoot, result.map);
    } catch (error) {
      onError(`could not write the acceptance-criteria map (${describeError(error)})`);
    }
  }
  return { result, error: null };
}
function namesCriterion(text, id) {
  if (!id) return false;
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![A-Za-z0-9_.-])${escaped}(?![A-Za-z0-9_]|[-.][A-Za-z0-9])`).test(text);
}
function extractTitlesAndTags(source) {
  const texts = [];
  TEST_CALL.lastIndex = 0;
  let match;
  while ((match = TEST_CALL.exec(source)) !== null) {
    let index = match.index + match[0].length;
    if (/\.(?:each|for)\b/.test(match[1])) {
      const close = skipBalanced(source, index);
      if (close === -1) continue;
      index = skipSpace(source, close + 1);
      if (source[index] !== "(") continue;
      index += 1;
    }
    const title = readStringLiteral(source, skipSpace(source, index));
    if (title !== null) texts.push(title);
  }
  OBLIGATION_TAG.lastIndex = 0;
  while ((match = OBLIGATION_TAG.exec(source)) !== null) {
    const rest = match[1].split("*/")[0].trim();
    if (rest.length > 0) texts.push(rest);
  }
  return texts;
}
function changedTestFiles(changedFiles) {
  const files = /* @__PURE__ */ new Set();
  for (const raw of changedFiles) {
    const file = toPosixPath(raw);
    if (isTestFile(file) && SCANNABLE_TEST_FILE.test(file)) files.add(file);
  }
  return [...files].sort();
}
function readTitlesAndTags(projectRoot, file) {
  const abs = join6(projectRoot, file);
  let fd;
  try {
    fd = openSync(abs, "r");
  } catch {
    return [];
  }
  try {
    if (fstatSync(fd).size > MAX_TEST_FILE_BYTES) return [];
    return extractTitlesAndTags(readFileSync3(fd, "utf8"));
  } catch {
    return [];
  } finally {
    closeSync(fd);
  }
}
function collectFailingAcIds(automatedIds, explicit, results) {
  const failing = new Set(explicit ?? []);
  for (const result of results ?? []) {
    for (const issue of [...result.failures ?? [], ...result.errors ?? []]) {
      const extracted = extractAcIdFromIssue(issue);
      if (extracted) failing.add(extracted);
      const texts = [issue.test_id, issue.suite ?? ""].filter((text) => text.length > 0);
      for (const id of automatedIds) {
        if (texts.some((text) => namesCriterion(text, id))) failing.add(id);
      }
    }
  }
  return failing;
}
function describeCriterion(criterion) {
  const parts = [
    criterion.given ? `Given ${criterion.given}` : "",
    criterion.when ? `when ${criterion.when}` : "",
    criterion.then ? `then ${criterion.then}` : ""
  ].filter((part) => part.length > 0);
  return parts.length > 0 ? parts.join(", ") : criterion.criterion_id;
}
function skipSpace(source, index) {
  let i = index;
  while (i < source.length && /\s/.test(source[i])) i += 1;
  return i;
}
function skipBalanced(source, index) {
  let depth = 1;
  const limit = Math.min(source.length, index + 2e5);
  for (let i = index; i < limit; i += 1) {
    const ch = source[i];
    if (ch === "'" || ch === '"' || ch === "`") {
      const end = stringEnd(source, i);
      if (end === -1) return -1;
      i = end;
      continue;
    }
    if (ch === "(" || ch === "[" || ch === "{") depth += 1;
    else if (ch === ")" || ch === "]" || ch === "}") {
      depth -= 1;
      if (depth === 0) return ch === ")" ? i : -1;
    }
  }
  return -1;
}
function stringEnd(source, index) {
  const quote = source[index];
  for (let i = index + 1; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === "\\") {
      i += 1;
      continue;
    }
    if (ch === quote) return i;
    if (ch === "\n" && quote !== "`") return -1;
  }
  return -1;
}
function readStringLiteral(source, index) {
  const ch = source[index];
  if (ch !== "'" && ch !== '"' && ch !== "`") return null;
  const end = stringEnd(source, index);
  return end === -1 ? null : source.slice(index + 1, end);
}
function describeError(error) {
  return error instanceof Error ? error.message : String(error);
}

// src/stage-isolation/isolation-summary.ts
init_esm_shims();
var LEGACY_CONTEXT_EFFICIENCY_FILE = "context-efficiency.jsonl";
function isIsolatedStageRow(row) {
  return STAGE_AGENT_STAGES.includes(String(row.stage));
}
function readStageAgentRows(projectRoot, dirName) {
  return readFeatureStageUnit(projectRoot, dirName).filter(
    (row) => row.kind === STAGE_AGENT_KIND && isIsolatedStageRow(row)
  );
}
function legacyRows(projectRoot, dirName) {
  return readUnitFile(
    projectRoot,
    `${featureDir(dirName)}/${LEGACY_CONTEXT_EFFICIENCY_FILE}`
  ).filter(isIsolatedStageRow);
}
function count(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}
function hasStageAgentEvidence(projectRoot, dirName) {
  return readStageAgentRows(projectRoot, dirName).length > 0 || legacyRows(projectRoot, dirName).length > 0;
}
function summarizeStageIsolation(projectRoot, dirName) {
  const rows = readStageAgentRows(projectRoot, dirName);
  const legacy = legacyRows(projectRoot, dirName);
  if (rows.length === 0 && legacy.length === 0) {
    return null;
  }
  return {
    stages: new Set([...rows, ...legacy].map((row) => String(row.stage))).size,
    tokensNotRecarried: rows.reduce((sum, row) => sum + count(row.tokens_not_recarried), 0) + legacy.reduce((sum, row) => sum + count(row.carried_history_avoided_estimate), 0),
    estimate: legacy.length > 0 || rows.some((row) => row.estimate !== false)
  };
}
function formatStageIsolationLine(summary) {
  const plural = summary.stages === 1 ? "stage" : "stages";
  const provenance = summary.estimate ? "estimate" : "exact";
  return `context: ${summary.stages} ${plural} isolated, ~${summary.tokensNotRecarried} tokens not re-carried (${provenance})`;
}

// src/verification/repository/bundle-completeness-config.ts
init_esm_shims();
import { readFileSync as readFileSync4 } from "fs";
import { join as join7 } from "path";

// src/core/enterprise-policy.ts
init_esm_shims();
var ALL_OFF = {
  enabled: false,
  evidence_ledger: false,
  ai_bom: false,
  compliance_citations: false
};
function resolveEnterprisePolicy(profile) {
  const block = profile?.enterprise;
  if (block?.enabled !== true) {
    return { ...ALL_OFF };
  }
  return {
    enabled: true,
    evidence_ledger: block.evidence_ledger === true,
    ai_bom: block.ai_bom === true,
    compliance_citations: block.compliance_citations === true
  };
}
function writesLedger(policy) {
  return policy.evidence_ledger || policy.ai_bom;
}

// src/duplication/config.ts
init_esm_shims();
var DUPLICATION_MODES = ["off", "warn", "strict"];
var DEFAULT_DUPLICATION_MODE = "warn";
var DEFAULT_SIMILARITY_THRESHOLD = 0.9;
var HEURISTIC_BAND_FLOOR = 0.8;
var DEFAULT_MIN_LINES = 8;
function resolveDuplicationConfig(projectRoot, env = process.env) {
  return {
    mode: resolveDuplicationMode(projectRoot, env),
    similarityThreshold: resolveNumericConfig(
      projectRoot,
      env,
      "duplication_similarity_threshold",
      DEFAULT_SIMILARITY_THRESHOLD,
      (value) => value > 0 && value <= 1
    ),
    minLines: resolveNumericConfig(
      projectRoot,
      env,
      "duplication_min_lines",
      DEFAULT_MIN_LINES,
      (value) => Number.isInteger(value) && value >= 1
    )
  };
}
function resolveDuplicationMode(projectRoot, env = process.env) {
  return resolveFlooredMode(
    {
      team: readConfigsDir(projectRoot).merged.get("duplication_mode"),
      local: readDotConfig(projectRoot).get("duplication_mode"),
      env: env.PAQAD_DUPLICATION_MODE
    },
    DUPLICATION_MODES,
    DEFAULT_DUPLICATION_MODE
  );
}

// src/verification/repository/bundle-completeness-config.ts
function stageIsolationStatus(projectRoot, sessionId, dirName) {
  if (!sessionId || !dirName) return "not-applicable";
  return isolationStatusFrom(readChangeConstantsSafe(projectRoot, dirName));
}
function readChangeConstantsSafe(projectRoot, dirName) {
  if (!dirName) return null;
  try {
    return readChangeConstants(projectRoot, dirName);
  } catch {
    return null;
  }
}
function isolationStatusFrom(constants) {
  if (!constants) return "not-applicable";
  const { lane, adapter } = constants;
  if (!isSubagentCapableAdapter(adapter, STAGE_AGENT_HOSTS)) return "not-applicable";
  if (lane === "graduated" || lane === "full") return "expected";
  return lane === null ? "unresolved" : "not-applicable";
}
function isolationFlags(status) {
  return {
    stageIsolationExpected: status === "expected",
    stageIsolationUnresolved: status === "unresolved"
  };
}
function buildBundleCompletenessConfig(projectRoot, sessionId, dirName) {
  const frameworkConfig = resolveFrameworkConfig(projectRoot);
  const policy = resolveEnterprisePolicy(readProjectProfile(projectRoot));
  const pipelineFlags = readSpecPipelineFlags(projectRoot);
  const constants = readChangeConstantsSafe(projectRoot, dirName);
  return {
    lane: constants?.lane ?? null,
    ruleComplianceOn: resolveRuleComplianceMode(projectRoot) !== "off",
    metricsEnabled: frameworkConfig.features.metrics_enabled,
    duplicationOn: resolveDuplicationMode(projectRoot) !== "off",
    featureReport: frameworkConfig.features.feature_report,
    ragEnabled: frameworkConfig.intelligence.rag_enabled,
    enterprise: policy.enabled,
    evidenceLedger: policy.evidence_ledger,
    aiBom: policy.ai_bom,
    specPipelineStrict: pipelineFlags.strict,
    specPipelineEnabled: pipelineFlags.enabled,
    expertsEnabled: pipelineFlags.experts,
    specFrozenBeforePipeline: specFrozenBeforePipeline(projectRoot, dirName),
    ...isolationFlags(sessionId ? isolationStatusFrom(constants) : "not-applicable")
  };
}
function specFrozenBeforePipeline(projectRoot, dirName) {
  if (!dirName) return false;
  try {
    const text = readFileSync4(join7(projectRoot, featureFilePath(dirName, "specification")), "utf8");
    return isSpecFrozenBeforePipeline(JSON.parse(text));
  } catch {
    return false;
  }
}
function readSpecPipelineFlags(projectRoot, env = process.env) {
  const switches = resolveSpecPipelineSwitches(layeredConfigMap(projectRoot, env));
  return {
    enabled: switches.enabled,
    strict: switches.enabled && switches.adoption === "strict",
    experts: switches.experts_enabled
  };
}

// src/verification/gate-runner.ts
init_esm_shims();

// src/verification/delta.ts
init_esm_shims();

// src/token-efficiency/index.ts
init_esm_shims();

// src/token-efficiency/service.ts
init_esm_shims();
import { readFileSync as readFileSync5 } from "fs";

// src/core/types/token-efficiency.ts
init_esm_shims();
var TOKEN_ARTIFACT_CLASSES = [
  "test-output",
  "coverage-output",
  "json-report",
  "xml-report",
  "log-output",
  "grep-results",
  "route-dump",
  "inventory-scan-output"
];
var ESCALATION_REASONS = [
  "structured-parse-failed-or-degraded",
  "summary-confidence-low",
  "compact-signals-contradict",
  "diagnosis-unresolved-after-compact-pass"
];
var DISCLOSURE_LEVELS = ["summary", "compact", "excerpt", "raw"];
var DISCLOSURE_ESCALATION_REASONS = [
  "ambiguity-unresolved",
  "previous-layer-insufficient",
  "high-risk-or-cross-cutting"
];
var TASK_COMPLEXITIES = [
  "trivial",
  "single-file",
  "single-module",
  "cross-cutting"
];
var RETRIEVAL_PATHS = ["direct", "lexical", "rag-shallow", "rag-deep"];
var RETRIEVAL_ESCALATION_SIGNALS = [
  "insufficient-chunks",
  "conflicting-evidence",
  "unresolved-target-file-ambiguity"
];
var ROUTING_MECHANISMS = [
  "deterministic-rule",
  "metadata-lookup",
  "cheap-model",
  "reasoning-model"
];

// src/token-efficiency/service.ts
var DEFAULT_EXCERPTS = 3;
var DEFAULT_MIN_CHUNK_THRESHOLD = 3;
var DETERMINISTIC_TASK_TYPES = ["lint", "format", "typecheck", "build", "test-run", "ci"];
var DEFAULT_ACTIONS = {
  "test-output": ["Fix failing tests and re-run the targeted suite."],
  "coverage-output": ["Increase tests for files below the target threshold."],
  "json-report": ["Inspect highest-severity report entries first."],
  "xml-report": ["Inspect failure and error nodes first."],
  "log-output": ["Investigate recurring ERROR/FATAL signatures first."],
  "grep-results": ["Narrow search scope to reduce broad match noise."],
  "route-dump": ["Review unexpected route additions and auth exposure."],
  "inventory-scan-output": ["Patch critical/high findings before broader cleanup."]
};
function buildCompactArtifact(input) {
  const normalizedRaw = normalizeLineEndings(input.raw_content);
  const raw = normalizedRaw.trim();
  const originalSize = Buffer.byteLength(normalizedRaw, "utf8");
  const artifactSummary = summarizeByClass(
    input.artifact_class,
    raw,
    input.max_excerpts ?? DEFAULT_EXCERPTS
  );
  const minimized = minimizeCompactRepresentation(
    artifactSummary,
    input.artifact_class,
    originalSize,
    input.max_excerpts ?? DEFAULT_EXCERPTS
  );
  const compactJson = JSON.stringify({
    summary: minimized.summary,
    excerpts: minimized.excerpts,
    confidence: minimized.confidence
  });
  const compactSize = Buffer.byteLength(compactJson, "utf8");
  const metadata = {
    original_size: originalSize,
    compact_size: compactSize,
    reduction_ratio: calculateReductionRatio(originalSize, compactSize),
    delta_mode_used: false,
    escalation_occurred: false
  };
  return {
    artifact_class: input.artifact_class,
    summary: minimized.summary,
    targeted_excerpts: minimized.excerpts,
    confidence: minimized.confidence,
    raw_artifact_path: input.raw_artifact_path ?? null,
    metadata
  };
}
function evaluateEscalation(input) {
  const confidenceThreshold = input.confidence_threshold ?? 0.6;
  const reason2 = resolveEscalationReason(input, confidenceThreshold);
  if (reason2 === null) {
    return {
      should_escalate: false,
      reason: null,
      raw_slice: null,
      metadata: {
        ...input.compact.metadata,
        escalation_occurred: false
      }
    };
  }
  const rawSlice = extractRawSlice(
    input.compact,
    input.max_raw_slice_chars ?? 1200,
    input.slice_hint ?? input.compact.summary.top_failures_or_errors[0] ?? ""
  );
  return {
    should_escalate: true,
    reason: reason2,
    raw_slice: rawSlice,
    metadata: {
      ...input.compact.metadata,
      escalation_occurred: true
    }
  };
}
function buildReasoningInputPayload(compact, escalation) {
  return {
    compact_summary: compact.summary,
    targeted_excerpts: compact.targeted_excerpts,
    raw_slice: escalation.should_escalate ? escalation.raw_slice : null,
    escalation_reason: escalation.reason,
    metadata: escalation.metadata
  };
}
function applyDisclosurePolicy(input) {
  const level = resolveDisclosureLevel(input);
  const payload = buildDisclosurePayload(level, input.compact, input.escalation);
  const escalationReason = input.escalation_reason ?? null;
  const skippedIntermediate = input.requested_level === "raw" && input.escalation?.raw_slice == null && !input.escalation_reason;
  const audit = {
    selected_level: level,
    escalation_occurred: escalationReason !== null,
    escalation_reason: escalationReason,
    skipped_intermediate: skippedIntermediate
  };
  return {
    level,
    payload,
    escalation_reason: escalationReason,
    skipped_intermediate: skippedIntermediate,
    audit
  };
}
function evaluateRetrievalGate(input) {
  const result = resolveRetrievalPath(
    input.task_complexity,
    input.ambiguity_detected ?? false,
    input.chunk_count ?? 0,
    input.min_chunk_threshold ?? DEFAULT_MIN_CHUNK_THRESHOLD,
    input.conflicting_evidence ?? false
  );
  const audit = {
    retrieval_depth: result.path,
    rag_skipped: result.rag_skipped,
    escalation_signal: result.escalation_signal
  };
  return {
    preferred_path: result.path,
    rag_skipped: result.rag_skipped,
    escalation_signal: result.escalation_signal,
    audit
  };
}
function runRoutingDecision(input) {
  const resolved = resolveRoutingMechanism(input.task_type, input.metadata);
  const audit = {
    routing_mechanism: resolved.mechanism,
    resolved_before_reasoning: resolved.resolved
  };
  return {
    needs_reasoning: !resolved.resolved,
    mechanism_used: resolved.mechanism,
    resolved_task_type: resolved.resolved_task_type,
    audit
  };
}
function buildControlLayerAudit(disclosure, retrieval, routing) {
  return {
    disclosure,
    retrieval,
    routing
  };
}
function createTestDelta(baseline, current, options = {}) {
  const baselineMap = new Map(baseline.map((item) => [item.test_id, item]));
  const currentMap = new Map(current.map((item) => [item.test_id, item]));
  const newlyFailing = [];
  const newlyPassing = [];
  const newlyErrored = [];
  const changedMessages = [];
  for (const [testId, now] of currentMap) {
    const before = baselineMap.get(testId);
    if (before === void 0) {
      if (now.status === "failed") newlyFailing.push(testId);
      if (now.status === "errored") newlyErrored.push(testId);
      continue;
    }
    if (before.status !== "failed" && now.status === "failed") {
      newlyFailing.push(testId);
    }
    if (before.status !== "passed" && now.status === "passed") {
      newlyPassing.push(testId);
    }
    if (before.status !== "errored" && now.status === "errored") {
      newlyErrored.push(testId);
    }
    const beforeMessage = normalizedIssueMessage(before);
    const afterMessage = normalizedIssueMessage(now);
    if (before.status === "failed" && now.status === "failed" && beforeMessage !== afterMessage) {
      changedMessages.push({ test_id: testId, before: beforeMessage, after: afterMessage });
    }
  }
  if (options.treat_missing_as_passing === true) {
    for (const [testId, before] of baselineMap) {
      if (currentMap.has(testId)) continue;
      if (before.status !== "passed") {
        newlyPassing.push(testId);
      }
    }
  }
  const delta = {
    newly_failing_tests: sortUnique(newlyFailing),
    newly_passing_tests: sortUnique(newlyPassing),
    newly_errored_tests: sortUnique(newlyErrored),
    changed_failure_messages: changedMessages.sort((a, b) => a.test_id.localeCompare(b.test_id))
  };
  return {
    delta,
    metadata: createDeltaMetadata(current, delta)
  };
}
function createVerificationDelta(baseline, current) {
  const baselineMap = new Map(baseline.map((item) => [item.gate, item]));
  const currentMap = new Map(current.map((item) => [item.gate, item]));
  const changedGateOutcomes = [];
  const changedEvidence = [];
  const changedActions = [];
  for (const [gate, now] of currentMap) {
    const before = baselineMap.get(gate);
    if (before === void 0) {
      changedGateOutcomes.push({ gate, before_passed: !now.passed, after_passed: now.passed });
      changedEvidence.push({ gate, before_detail: "", after_detail: now.detail });
      if ((now.remediation ?? "").trim().length > 0) {
        changedActions.push({ gate, before: "", after: now.remediation.trim() });
      }
      continue;
    }
    if (before.passed !== now.passed) {
      changedGateOutcomes.push({ gate, before_passed: before.passed, after_passed: now.passed });
    }
    if (before.detail !== now.detail) {
      changedEvidence.push({ gate, before_detail: before.detail, after_detail: now.detail });
    }
    const beforeRemediation = (before.remediation ?? "").trim();
    const afterRemediation = (now.remediation ?? "").trim();
    if (beforeRemediation !== afterRemediation) {
      changedActions.push({ gate, before: beforeRemediation, after: afterRemediation });
    }
  }
  const delta = {
    changed_gate_outcomes: changedGateOutcomes.sort((a, b) => a.gate.localeCompare(b.gate)),
    changed_evidence: changedEvidence.sort((a, b) => a.gate.localeCompare(b.gate)),
    changed_recommended_actions: changedActions.sort((a, b) => a.gate.localeCompare(b.gate))
  };
  return {
    delta,
    metadata: createDeltaMetadata(current, delta)
  };
}
function createDriftDelta(baseline, current) {
  const baselineMap = new Map(baseline.map((item) => [item.file, item]));
  const currentMap = new Map(current.map((item) => [item.file, item]));
  const changedFiles = /* @__PURE__ */ new Set();
  const changedStatuses = [];
  const changedConclusions = [];
  for (const [file, now] of currentMap) {
    const before = baselineMap.get(file);
    if (before === void 0) {
      changedFiles.add(file);
      changedStatuses.push({ file, before: "", after: now.status });
      changedConclusions.push({ file, before: "", after: now.conclusion });
      continue;
    }
    if (before.status !== now.status) {
      changedFiles.add(file);
      changedStatuses.push({ file, before: before.status, after: now.status });
    }
    if (before.conclusion !== now.conclusion) {
      changedFiles.add(file);
      changedConclusions.push({ file, before: before.conclusion, after: now.conclusion });
    }
  }
  for (const [file, before] of baselineMap) {
    if (!currentMap.has(file)) {
      changedFiles.add(file);
      changedStatuses.push({ file, before: before.status, after: "" });
      changedConclusions.push({ file, before: before.conclusion, after: "" });
    }
  }
  const delta = {
    changed_files: [...changedFiles].sort((a, b) => a.localeCompare(b)),
    changed_statuses: changedStatuses.sort((a, b) => a.file.localeCompare(b.file)),
    changed_conclusions: changedConclusions.sort((a, b) => a.file.localeCompare(b.file))
  };
  return {
    delta,
    metadata: createDeltaMetadata(current, delta)
  };
}
function buildTestDeltaReasoningPayload(baseline, current, options = {}, escalationInput = {}) {
  const result = createTestDelta(baseline, current, options);
  return buildDeltaReasoningPayload(result.delta, result.metadata, escalationInput);
}
function buildVerificationDeltaReasoningPayload(baseline, current, escalationInput = {}) {
  const result = createVerificationDelta(baseline, current);
  return buildDeltaReasoningPayload(result.delta, result.metadata, escalationInput);
}
function buildDriftDeltaReasoningPayload(baseline, current, escalationInput = {}) {
  const result = createDriftDelta(baseline, current);
  return buildDeltaReasoningPayload(result.delta, result.metadata, escalationInput);
}
function resolveEscalationReason(input, confidenceThreshold) {
  if (input.reason) return input.reason;
  if (input.unresolved_after_compact === true) return "diagnosis-unresolved-after-compact-pass";
  if (input.contradiction_detected === true) return "compact-signals-contradict";
  if (input.compact.confidence < confidenceThreshold) return "summary-confidence-low";
  return null;
}
function extractRawSlice(compact, maxChars, hint) {
  const normalizedHint = hint.trim().toLowerCase();
  const excerpt = compact.targeted_excerpts.find(
    (line) => line.toLowerCase().includes(normalizedHint)
  );
  if (excerpt) return excerpt.slice(0, maxChars);
  if (compact.raw_artifact_path === null) {
    return compact.targeted_excerpts[0]?.slice(0, maxChars) ?? null;
  }
  try {
    const raw = normalizeLineEndings(readFileSync5(compact.raw_artifact_path, "utf8"));
    const lines = raw.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
    if (lines.length === 0) return null;
    if (normalizedHint.length > 0) {
      const hit = lines.findIndex((line) => line.toLowerCase().includes(normalizedHint));
      if (hit >= 0) {
        const start = Math.max(hit - 1, 0);
        const end = Math.min(hit + 2, lines.length);
        return lines.slice(start, end).join("\n").slice(0, maxChars);
      }
    }
    return lines[0].slice(0, maxChars);
  } catch {
    return compact.targeted_excerpts[0]?.slice(0, maxChars) ?? null;
  }
}
function summarizeByClass(artifactClass, raw, maxExcerpts) {
  switch (artifactClass) {
    case "test-output":
      return summarizeTestOutput(raw, maxExcerpts);
    case "coverage-output":
      return summarizeCoverageOutput(raw, maxExcerpts);
    case "json-report":
      return summarizeJsonReport(raw, maxExcerpts);
    case "xml-report":
      return summarizeXmlReport(raw, maxExcerpts);
    case "log-output":
      return summarizeLogOutput(raw, maxExcerpts);
    case "grep-results":
      return summarizeGrepResults(raw, maxExcerpts);
    case "route-dump":
      return summarizeRouteDump(raw, maxExcerpts);
    case "inventory-scan-output":
      return summarizeInventoryScan(raw, maxExcerpts);
  }
}
function summarizeTestOutput(raw, maxExcerpts) {
  const lines = tokenizeLines(raw);
  const failures = lines.filter((line) => /(^|\s)(fail|failed|not ok|error)\b/i.test(line));
  const passed = lines.filter((line) => /(^|\s)(pass|passed|ok)\b/i.test(line));
  const files = extractFileLikeSegments(lines);
  return {
    summary: {
      summary_counts: {
        lines: lines.length,
        failing_signals: failures.length,
        passing_signals: passed.length
      },
      top_failures_or_errors: failures.slice(0, 5),
      affected_files: files,
      severity_or_status: failures.length > 0 ? "failing" : "passing",
      next_recommended_actions: DEFAULT_ACTIONS["test-output"]
    },
    excerpts: failures.slice(0, maxExcerpts),
    confidence: lines.length > 0 ? 0.9 : 0.4
  };
}
function summarizeCoverageOutput(raw, maxExcerpts) {
  const lines = tokenizeLines(raw);
  const percentages = lines.map((line) => /([0-9]{1,3}(?:\.[0-9]+)?)%/.exec(line)?.[1]).filter((value) => value !== void 0).map((value) => Number(value));
  const below80 = lines.filter((line) => {
    const hit = /([0-9]{1,3}(?:\.[0-9]+)?)%/.exec(line);
    return hit ? Number(hit[1]) < 80 : false;
  });
  return {
    summary: {
      summary_counts: {
        lines: lines.length,
        percentage_markers: percentages.length,
        below_target_entries: below80.length
      },
      top_failures_or_errors: below80.slice(0, 5),
      affected_files: extractFileLikeSegments(below80),
      severity_or_status: below80.length > 0 ? "below-target" : "meets-target",
      next_recommended_actions: DEFAULT_ACTIONS["coverage-output"]
    },
    excerpts: below80.slice(0, maxExcerpts),
    confidence: percentages.length > 0 ? 0.88 : 0.55
  };
}
function summarizeJsonReport(raw, maxExcerpts) {
  try {
    const parsed = JSON.parse(raw);
    const flattened = flattenJson(parsed);
    const errorLike = flattened.filter((line) => /(error|fail|critical|high|warn)/i.test(line));
    const files = extractFileLikeSegments(flattened);
    return {
      summary: {
        summary_counts: {
          flattened_fields: flattened.length,
          error_like_entries: errorLike.length
        },
        top_failures_or_errors: errorLike.slice(0, 5),
        affected_files: files,
        severity_or_status: errorLike.length > 0 ? "attention-needed" : "clean",
        next_recommended_actions: DEFAULT_ACTIONS["json-report"]
      },
      excerpts: errorLike.slice(0, maxExcerpts),
      confidence: 0.95
    };
  } catch {
    return degradedSummary("json-report", raw, maxExcerpts, 0.35);
  }
}
function summarizeXmlReport(raw, maxExcerpts) {
  const nodes = raw.match(/<([a-zA-Z0-9:_-]+)\b[^>]*>/g) ?? [];
  const failures = raw.match(/<(failure|error)\b[^>]*>([\s\S]*?)<\/\1>/gi) ?? [];
  const files = extractFileLikeSegments(tokenizeLines(raw));
  return {
    summary: {
      summary_counts: {
        tags: nodes.length,
        failure_or_error_nodes: failures.length
      },
      top_failures_or_errors: failures.map((value) => collapseWhitespace(value)).slice(0, 5),
      affected_files: files,
      severity_or_status: failures.length > 0 ? "failing" : "passing",
      next_recommended_actions: DEFAULT_ACTIONS["xml-report"]
    },
    excerpts: failures.map((value) => collapseWhitespace(value)).slice(0, maxExcerpts),
    confidence: nodes.length > 0 ? 0.85 : 0.5
  };
}
function summarizeLogOutput(raw, maxExcerpts) {
  const lines = tokenizeLines(raw);
  const errors = lines.filter((line) => /(error|fatal|panic|exception)/i.test(line));
  const warnings = lines.filter((line) => /\bwarn(?:ing)?\b/i.test(line));
  return {
    summary: {
      summary_counts: {
        lines: lines.length,
        errors: errors.length,
        warnings: warnings.length
      },
      top_failures_or_errors: errors.slice(0, 5),
      affected_files: extractFileLikeSegments(errors.length > 0 ? errors : warnings),
      severity_or_status: errors.length > 0 ? "error" : warnings.length > 0 ? "warning" : "ok",
      next_recommended_actions: DEFAULT_ACTIONS["log-output"]
    },
    excerpts: (errors.length > 0 ? errors : warnings).slice(0, maxExcerpts),
    confidence: lines.length > 0 ? 0.8 : 0.45
  };
}
function summarizeGrepResults(raw, maxExcerpts) {
  const lines = tokenizeLines(raw);
  const matches = lines.filter((line) => /:\d+[:-]/.test(line) || line.includes(":"));
  const files = extractFileLikeSegments(lines);
  return {
    summary: {
      summary_counts: {
        lines: lines.length,
        matches: matches.length,
        files: files.length
      },
      top_failures_or_errors: matches.slice(0, 5),
      affected_files: files,
      severity_or_status: matches.length > 0 ? "matches-found" : "no-matches",
      next_recommended_actions: DEFAULT_ACTIONS["grep-results"]
    },
    excerpts: matches.slice(0, maxExcerpts),
    confidence: lines.length > 0 ? 0.9 : 0.6
  };
}
function summarizeRouteDump(raw, maxExcerpts) {
  const lines = tokenizeLines(raw);
  const routeLines = lines.filter(
    (line) => /\b(GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)\b/.test(line)
  );
  const authSensitive = routeLines.filter((line) => /(admin|auth|login|token|session)/i.test(line));
  return {
    summary: {
      summary_counts: {
        lines: lines.length,
        routes: routeLines.length,
        auth_sensitive_routes: authSensitive.length
      },
      top_failures_or_errors: authSensitive.slice(0, 5),
      affected_files: extractFileLikeSegments(routeLines),
      severity_or_status: authSensitive.length > 0 ? "review-required" : "normal",
      next_recommended_actions: DEFAULT_ACTIONS["route-dump"]
    },
    excerpts: (authSensitive.length > 0 ? authSensitive : routeLines).slice(0, maxExcerpts),
    confidence: routeLines.length > 0 ? 0.9 : 0.5
  };
}
function summarizeInventoryScan(raw, maxExcerpts) {
  const lines = tokenizeLines(raw);
  const critical = lines.filter((line) => /\bcritical\b/i.test(line));
  const high = lines.filter((line) => /\bhigh\b/i.test(line));
  const medium = lines.filter((line) => /\bmedium\b/i.test(line));
  const low = lines.filter((line) => /\blow\b/i.test(line));
  const issues = [...critical, ...high, ...medium, ...low];
  const severity = critical.length > 0 ? "critical" : high.length > 0 ? "high" : medium.length > 0 ? "medium" : low.length > 0 ? "low" : "none";
  return {
    summary: {
      summary_counts: {
        lines: lines.length,
        critical: critical.length,
        high: high.length,
        medium: medium.length,
        low: low.length
      },
      top_failures_or_errors: issues.slice(0, 5),
      affected_files: extractFileLikeSegments(issues),
      severity_or_status: severity,
      next_recommended_actions: DEFAULT_ACTIONS["inventory-scan-output"]
    },
    excerpts: issues.slice(0, maxExcerpts),
    confidence: lines.length > 0 ? 0.85 : 0.5
  };
}
function degradedSummary(artifactClass, raw, maxExcerpts, confidence) {
  const lines = tokenizeLines(raw);
  return {
    summary: {
      summary_counts: { lines: lines.length },
      top_failures_or_errors: lines.slice(0, 5),
      affected_files: extractFileLikeSegments(lines),
      severity_or_status: lines.length > 0 ? "unknown" : "empty",
      next_recommended_actions: DEFAULT_ACTIONS[artifactClass]
    },
    excerpts: lines.slice(0, maxExcerpts),
    confidence
  };
}
function minimizeCompactRepresentation(summaryResult, artifactClass, originalSize, maxExcerpts) {
  if (originalSize <= 0) {
    return summaryResult;
  }
  const fullSize = measureCompactRepresentation(
    summaryResult.summary,
    summaryResult.excerpts,
    summaryResult.confidence
  );
  if (fullSize < originalSize) {
    return summaryResult;
  }
  const shrunkSummary = {
    summary_counts: summaryResult.summary.summary_counts,
    top_failures_or_errors: summaryResult.summary.top_failures_or_errors.slice(0, 1),
    affected_files: summaryResult.summary.affected_files.slice(0, 3),
    severity_or_status: summaryResult.summary.severity_or_status,
    next_recommended_actions: summaryResult.summary.next_recommended_actions.slice(0, 1)
  };
  const shrunkExcerpts = summaryResult.excerpts.slice(0, 1).map((line) => line.slice(0, 240));
  const shrunkSize = measureCompactRepresentation(
    shrunkSummary,
    shrunkExcerpts,
    summaryResult.confidence
  );
  if (shrunkSize < originalSize) {
    return {
      summary: shrunkSummary,
      excerpts: shrunkExcerpts,
      confidence: summaryResult.confidence
    };
  }
  if (originalSize < 256) {
    return summaryResult;
  }
  const fallback = degradedSummary(
    artifactClass,
    "",
    Math.min(maxExcerpts, 1),
    summaryResult.confidence
  );
  return fallback;
}
function measureCompactRepresentation(summary, excerpts, confidence) {
  return Buffer.byteLength(
    JSON.stringify({
      summary,
      excerpts,
      confidence
    }),
    "utf8"
  );
}
function createDeltaMetadata(fullState, delta) {
  const fullStateRaw = JSON.stringify(fullState) ?? "";
  const deltaRaw = JSON.stringify(delta) ?? "";
  const originalSize = Buffer.byteLength(fullStateRaw, "utf8");
  const compactSize = Buffer.byteLength(deltaRaw, "utf8");
  return {
    original_size: originalSize,
    compact_size: compactSize,
    reduction_ratio: calculateReductionRatio(originalSize, compactSize),
    delta_mode_used: true,
    escalation_occurred: false
  };
}
function buildDeltaReasoningPayload(delta, deltaMetadata, escalationInput) {
  const compact = buildCompactArtifact({
    artifact_class: "json-report",
    raw_content: JSON.stringify(delta)
  });
  const escalation = evaluateEscalation({
    ...escalationInput,
    compact: {
      ...compact,
      metadata: {
        ...deltaMetadata,
        escalation_occurred: false
      }
    }
  });
  return {
    delta,
    payload: buildReasoningInputPayload(compact, escalation)
  };
}
function resolveDisclosureLevel(input) {
  const requestedLevel = input.requested_level ?? "summary";
  if (input.escalation_reason === "high-risk-or-cross-cutting") {
    return "excerpt";
  }
  if (input.escalation_reason) {
    if (requestedLevel === "summary") {
      return "compact";
    }
    return requestedLevel;
  }
  if (requestedLevel === "raw" && input.escalation?.raw_slice == null) {
    return "excerpt";
  }
  return DISCLOSURE_LEVELS.includes(requestedLevel) ? requestedLevel : "summary";
}
function buildDisclosurePayload(level, compact, escalation) {
  switch (level) {
    case "summary":
      return `${compact.summary.severity_or_status}: ${compact.summary.top_failures_or_errors[0] ?? "none"}`;
    case "compact":
      return JSON.stringify(compact.summary);
    case "excerpt":
      return compact.targeted_excerpts.join("\n");
    case "raw":
      return escalation?.raw_slice ?? compact.targeted_excerpts.join("\n");
  }
}
function resolveRetrievalPath(taskComplexity, ambiguityDetected, chunkCount, threshold, conflictingEvidence) {
  let path;
  let ragSkipped;
  let escalationSignal = null;
  if (taskComplexity === "cross-cutting") {
    path = "rag-deep";
    ragSkipped = false;
  } else if (taskComplexity === "single-module") {
    if (ambiguityDetected) {
      path = "rag-shallow";
      ragSkipped = false;
      escalationSignal = "unresolved-target-file-ambiguity";
    } else if (chunkCount < threshold) {
      path = "rag-shallow";
      ragSkipped = false;
      escalationSignal = "insufficient-chunks";
    } else {
      path = "lexical";
      ragSkipped = true;
    }
  } else if (taskComplexity === "trivial" || taskComplexity === "single-file") {
    if (ambiguityDetected) {
      path = "lexical";
      ragSkipped = false;
      escalationSignal = "unresolved-target-file-ambiguity";
    } else {
      path = "direct";
      ragSkipped = true;
    }
  } else {
    path = "rag-deep";
    ragSkipped = false;
  }
  if (conflictingEvidence) {
    escalationSignal = "conflicting-evidence";
  }
  return {
    path,
    rag_skipped: ragSkipped,
    escalation_signal: escalationSignal
  };
}
function resolveRoutingMechanism(taskType, metadata) {
  if (DETERMINISTIC_TASK_TYPES.some(
    (candidate) => taskType === candidate || taskType.startsWith(`${candidate}:`)
  )) {
    return {
      mechanism: ROUTING_MECHANISMS[0],
      resolved: true,
      resolved_task_type: taskType
    };
  }
  const workflowId = metadata?.workflow_id;
  if (typeof workflowId === "string" && workflowId.trim().length > 0) {
    return {
      mechanism: ROUTING_MECHANISMS[1],
      resolved: true,
      resolved_task_type: workflowId
    };
  }
  return {
    mechanism: ROUTING_MECHANISMS[3],
    resolved: false,
    resolved_task_type: null
  };
}
function calculateReductionRatio(originalSize, compactSize) {
  if (originalSize <= 0) return 0;
  return Math.max(0, Math.min(1, 1 - compactSize / originalSize));
}
function extractFileLikeSegments(lines) {
  const matches = [];
  for (const line of lines) {
    for (const run of line.match(PATH_CHAR_RUN) ?? []) {
      matches.push(...findPathSegmentsInRun(run));
    }
  }
  return sortUnique(matches).slice(0, 10);
}
var PATH_CHAR_RUN = /[\w@./-]+/g;
function isPathTailChar(char) {
  return char !== void 0 && char !== "/" && char !== "@";
}
function nextSegmentEnd(run, from) {
  let nameStart = from;
  if (run[from] === "/") {
    nameStart = from + 1;
    if (nameStart >= run.length || run[nameStart] === "/") return -1;
  }
  const slash = run.indexOf("/", nameStart);
  return slash === -1 ? -1 : slash + 1;
}
function findPathSegmentsInRun(run) {
  const hits = [];
  let start = 0;
  while (start < run.length) {
    let tailStart = -1;
    let position = start;
    for (let next = nextSegmentEnd(run, position); next !== -1; next = nextSegmentEnd(run, position)) {
      position = next;
      if (isPathTailChar(run[position])) tailStart = position;
    }
    if (tailStart === -1) {
      if (position !== start) start = position + 1;
      else if (run[start] === "/") start += 1;
      else break;
      continue;
    }
    let end = tailStart;
    while (isPathTailChar(run[end])) end += 1;
    hits.push(run.slice(start, end));
    start = end;
  }
  return hits;
}
function flattenJson(value, prefix = "") {
  if (value === null || typeof value !== "object") {
    return [`${prefix}${String(value)}`];
  }
  if (Array.isArray(value)) {
    return value.flatMap((entry, index) => flattenJson(entry, `${prefix}[${index}].`));
  }
  return Object.entries(value).flatMap(
    ([key, nested]) => flattenJson(nested, `${prefix}${key}.`)
  );
}
function normalizedIssueMessage(item) {
  return collapseWhitespace(item.message.trim());
}
function tokenizeLines(raw) {
  return raw.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
}
function normalizeLineEndings(raw) {
  return raw.replace(/\r/g, "");
}
function collapseWhitespace(input) {
  return input.replace(/\s+/g, " ").trim();
}
function sortUnique(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}
var __tokenEfficiencyInternals = {
  summarizeByClass,
  summarizeTestOutput,
  summarizeCoverageOutput,
  summarizeJsonReport,
  summarizeXmlReport,
  summarizeLogOutput,
  summarizeGrepResults,
  summarizeRouteDump,
  summarizeInventoryScan,
  degradedSummary,
  minimizeCompactRepresentation,
  measureCompactRepresentation,
  resolveEscalationReason,
  extractRawSlice,
  createDeltaMetadata,
  buildDeltaReasoningPayload,
  resolveDisclosureLevel,
  buildDisclosurePayload,
  resolveRetrievalPath,
  resolveRoutingMechanism,
  extractFileLikeSegments,
  flattenJson,
  normalizedIssueMessage,
  tokenizeLines,
  normalizeLineEndings,
  collapseWhitespace,
  sortUnique,
  calculateReductionRatio
};

// src/verification/delta.ts
function toVerificationSnapshots(results) {
  return results.map((result) => ({
    gate: result.gate,
    passed: result.passed,
    detail: result.detail,
    remediation: result.remediation
  }));
}
function buildVerificationGateDeltaPayload(baselineResults, currentResults, escalationInput = {}) {
  return buildVerificationDeltaReasoningPayload(
    toVerificationSnapshots(baselineResults),
    toVerificationSnapshots(currentResults),
    escalationInput
  );
}
function buildDocumentationDriftDeltaPayload(baseline, current, escalationInput = {}) {
  return buildDriftDeltaReasoningPayload(baseline, current, escalationInput);
}

// src/verification/gates/architecture-compliance.ts
init_esm_shims();
var ArchitectureComplianceGate = class {
  gate = "architecture-compliance";
  async check(context) {
    return checkBooleanGate(
      this.gate,
      context.architecture_compliant,
      "Architecture compliance checks passed",
      "Architecture compliance checks failed",
      "Align the implementation with the architectural constraints."
    );
  }
};

// src/verification/gates/behavioral-correctness.ts
init_esm_shims();

// src/verification/test-evidence.ts
init_esm_shims();
function assessTestEvidence(input) {
  const changedPreview = previewChangedFiles(input.changed_files);
  const structuredResults = input.structured_test_results ?? [];
  const matchedResults = structuredResults.filter((result) => matchesAffectedScope(result, input));
  if (matchedResults.length > 0) {
    return {
      strength: "strong",
      detail: `Strong test evidence recorded for changed code (${changedPreview}) via ${listRunnerIds(matchedResults)}.`,
      matched_runner_ids: matchedResults.map((result) => result.summary.runner_id)
    };
  }
  if (structuredResults.length > 0) {
    return {
      strength: "weak",
      detail: `Only weak test evidence recorded for changed code (${changedPreview}). Structured test results exist, but they are not mapped to the affected files or modules.`,
      matched_runner_ids: []
    };
  }
  if (input.test_files_changed) {
    return {
      strength: "weak",
      detail: `Only weak test evidence recorded for changed code (${changedPreview}). Test files changed, but no structured verification evidence was recorded for the affected scope.`,
      matched_runner_ids: []
    };
  }
  return {
    strength: "none",
    detail: `No test evidence recorded for changed code (${changedPreview})`,
    matched_runner_ids: []
  };
}
function matchesAffectedScope(result, input) {
  const relatedPaths = result.evidence_scope?.related_paths?.map(normalizePath) ?? [];
  const relatedModules = result.evidence_scope?.related_modules?.map(normalizeModule) ?? [];
  if (relatedPaths.length === 0 && relatedModules.length === 0) {
    return false;
  }
  const changedFiles = new Set(input.changed_files.map(normalizePath));
  if (relatedPaths.some((path) => changedFiles.has(path))) {
    return true;
  }
  const modules = new Set(input.modules.map(normalizeModule));
  return relatedModules.some((moduleId) => modules.has(moduleId));
}
function normalizePath(value) {
  return value.replaceAll("\\", "/").toLowerCase();
}
function normalizeModule(value) {
  return value.trim().toLowerCase();
}
function previewChangedFiles(changedFiles) {
  return changedFiles.slice(0, 5).join(", ") || "unknown files";
}
function listRunnerIds(results) {
  return [...new Set(results.map((result) => result.summary.runner_id))].join(", ");
}

// src/verification/gates/behavioral-correctness.ts
var BehavioralCorrectnessGate = class {
  gate = "behavioral-correctness";
  async check(context) {
    const evidence = assessTestEvidence({
      changed_files: context.changed_files,
      modules: context.modules,
      test_files_changed: context.test_files_changed,
      structured_test_results: context.structured_test_results
    });
    const degradedResult = context.structured_test_results?.find(
      (result) => result.parse_metadata.parse_strategy === "degraded"
    );
    if (degradedResult) {
      return createInconclusive(
        this.gate,
        `Test results for "${degradedResult.summary.runner_id}" could not be fully parsed`,
        "Check the test runner output and re-run."
      );
    }
    const structuredFailure = context.structured_test_results?.find(
      (result) => result.summary.failed > 0 || result.summary.errored > 0
    );
    if (structuredFailure) {
      return createFail(
        this.gate,
        `Behavioral tests failed under ${structuredFailure.summary.runner_id}`,
        "Validate the implementation against the specified behavior."
      );
    }
    if (context.code_changed && evidence.strength !== "strong") {
      return createInconclusive(
        this.gate,
        evidence.detail,
        "Re-run behavior verification with structured test evidence mapped to the affected scope."
      );
    }
    if (context.structured_test_results && context.structured_test_results.length > 0) {
      return createPass(this.gate, "Structured behavioral test results report no failures");
    }
    return checkBooleanGate(
      this.gate,
      context.behavioral_correctness_passed,
      "Behavioral correctness checks passed",
      "Behavioral correctness checks failed",
      "Validate the implementation against the specified behavior."
    );
  }
};

// src/verification/gates/change-completeness.ts
init_esm_shims();

// src/verification/repository/scope-drift.ts
init_esm_shims();
function normalizePath2(value) {
  const slashed = value.replace(/\\/g, "/").trim();
  let start = 0;
  if (slashed.startsWith("./")) {
    start = 2;
  } else if (slashed.startsWith("/")) {
    start = 1;
  }
  let end = slashed.length;
  while (end > start && slashed[end - 1] === "/") {
    end -= 1;
  }
  return slashed.slice(start, end);
}
function isWithinBoundary(file, boundary) {
  return boundary.some((entry) => file === entry || file.startsWith(`${entry}/`));
}
function collectScopeDriftPaths(changedFiles, specBoundary) {
  const boundary = specBoundary.map(normalizePath2).filter((entry) => entry.length > 0);
  if (boundary.length === 0) {
    return [];
  }
  const drift = changedFiles.map((file) => normalizePath2(file)).filter((file) => file.length > 0 && !isWithinBoundary(file, boundary));
  return [...new Set(drift)].sort();
}

// src/verification/gates/documentation-checks.ts
init_esm_shims();
import { existsSync as existsSync4 } from "fs";
import { readFile as readFile3 } from "fs/promises";
import { join as join8 } from "path";

// src/validators/index.ts
init_esm_shims();

// src/validators/markdown-validators/api-doc.ts
init_esm_shims();

// src/validators/markdown-validators/shared.ts
init_esm_shims();
function validateRequiredHeadings(markdown, headings) {
  const errors = headings.filter((heading) => !markdown.includes(heading)).map((heading) => `Missing required heading: ${heading}`);
  return {
    valid: errors.length === 0,
    errors
  };
}
function validateAcStatements(markdown) {
  const hasGwt = containsInOrder(markdown, ["Given", "When", "Then"]);
  const hasShall = /\bshall\b/i.test(markdown);
  if (hasGwt || hasShall) {
    return { valid: true, errors: [] };
  }
  return {
    valid: false,
    errors: ["Acceptance criteria must use Given/When/Then or shall statements"]
  };
}
function containsInOrder(text, words) {
  let from = 0;
  for (const word of words) {
    const at = text.indexOf(word, from);
    if (at === -1) return false;
    from = at + word.length;
  }
  return true;
}

// src/validators/markdown-validators/api-doc.ts
var ENDPOINT_HEADING = /^###\s+(GET|POST|PUT|PATCH|DELETE)\s+\/\S+/m;
var REQUIRED_FIELDS = [
  "**Method**",
  "**Route**",
  "**Auth**",
  "**Description**",
  "**Request Schema**",
  "**Response Schema**"
];
function validateApiDoc(markdown) {
  const required = validateRequiredHeadings(markdown, ["## Endpoints"]);
  const errors = [...required.errors];
  if (!ENDPOINT_HEADING.test(markdown)) {
    errors.push("Missing endpoint heading in the format: ### {METHOD} {Route}");
  }
  for (const field of REQUIRED_FIELDS) {
    if (!markdown.includes(field)) {
      errors.push(`Missing required API doc field: ${field}`);
    }
  }
  return {
    valid: errors.length === 0,
    errors
  };
}

// src/validators/markdown-validators/error-catalog-md.ts
init_esm_shims();
var ERROR_HEADING = /^###\s+[A-Z]{2,5}-[0-9]{3}:\s+\S/m;
var REQUIRED_FIELDS2 = [
  "**Code**",
  "**User-Facing Message**",
  "**Trigger**",
  "**Recovery Path**"
];
function validateErrorCatalogMarkdown(markdown) {
  const required = validateRequiredHeadings(markdown, ["## Error Code Format", "## Errors"]);
  const errors = [...required.errors];
  if (!ERROR_HEADING.test(markdown)) {
    errors.push("Missing error heading in the format: ### {CODE}: {Description}");
  }
  for (const field of REQUIRED_FIELDS2) {
    if (!markdown.includes(field)) {
      errors.push(`Missing required error catalog field: ${field}`);
    }
  }
  return {
    valid: errors.length === 0,
    errors
  };
}

// src/validators/markdown-validators/spec-document.ts
init_esm_shims();
function validateSpecDocument(markdown) {
  const required = validateRequiredHeadings(markdown, [
    "## User Story",
    "## Acceptance Criteria",
    "## Test Plan"
  ]);
  const ac = validateAcStatements(markdown);
  return {
    valid: required.valid && ac.valid,
    errors: [...required.errors, ...ac.errors]
  };
}

// src/validators/markdown-validators/user-flow.ts
init_esm_shims();
function validateUserFlow(markdown) {
  return validateRequiredHeadings(markdown, ["## Actors", "## Preconditions", "## Main Flow"]);
}

// src/verification/gates/documentation-checks.ts
var STALENESS_WINDOW_MS = 1e3 * 60 * 60 * 24 * 7;
async function collectUnresolvedDocTargets(projectRoot, changedFiles, staleDocTargets) {
  const unresolvedTargets = await Promise.all(
    staleDocTargets.map(async (target) => {
      if (!changedFiles.includes(target.target_path)) {
        if (!existsSync4(join8(projectRoot, target.target_path))) {
          return null;
        }
        return target;
      }
      const validationFailure = await validateCanonicalDocTarget(projectRoot, target.target_path);
      if (validationFailure === null) {
        return null;
      }
      return {
        ...target,
        reason: `${target.reason} Direct edit still unresolved: ${validationFailure}`
      };
    })
  );
  return unresolvedTargets.filter((target) => target !== null);
}
function formatCanonicalDocTarget(target) {
  const ownership = target.ownership_kind === "direct-doc-edit" ? "direct doc edit" : "implementation drift";
  const owners = target.owners.length > 0 ? `owners: ${target.owners.join(", ")}` : "owners: none";
  return `${target.target_path} [${ownership}; ${owners}; reason: ${target.reason}]`;
}
async function collectCanonicalDocumentationFailures(projectRoot, expectedUiModules, expectedApiModules, expectedIntegrationModules, expectedErrorCatalogModules) {
  return [
    ...collectMissingDocs(projectRoot, expectedUiModules, ["ui", "screens.md"]),
    ...await collectApiDocFailures(projectRoot, expectedApiModules),
    ...await collectIntegrationDocFailures(projectRoot, expectedIntegrationModules),
    ...await collectErrorCatalogFailures(projectRoot, expectedErrorCatalogModules)
  ];
}
function areRegistriesStale(registryRefreshedAt) {
  if (!registryRefreshedAt) {
    return true;
  }
  const parsed = Date.parse(registryRefreshedAt);
  return Number.isNaN(parsed) || Date.now() - parsed > STALENESS_WINDOW_MS;
}
async function collectApiDocFailures(projectRoot, modules) {
  const failures = [];
  for (const moduleName of modules) {
    const modulePath = join8(projectRoot, "docs", "modules", moduleName);
    const result = await checkApiDocs(modulePath);
    if (!result.passed) {
      failures.push(result.detail);
    }
  }
  return failures;
}
async function collectIntegrationDocFailures(projectRoot, modules) {
  const failures = [];
  for (const moduleName of modules) {
    const modulePath = join8(projectRoot, "docs", "modules", moduleName);
    const result = await checkIntegrationDocs(modulePath);
    if (!result.passed) {
      failures.push(result.detail);
    }
  }
  return failures;
}
async function collectErrorCatalogFailures(projectRoot, modules) {
  const failures = [];
  for (const moduleName of modules) {
    const modulePath = join8(projectRoot, "docs", "modules", moduleName);
    const result = await checkErrorCatalog(modulePath);
    if (!result.passed) {
      failures.push(result.detail);
    }
  }
  return failures;
}
async function checkApiDocs(modulePath) {
  const endpointsPath = join8(modulePath, "api", "endpoints.md");
  const endpointsExists = existsSync4(endpointsPath);
  const schemasExists = existsSync4(join8(modulePath, "api", "schemas.md"));
  const errorCodesExists = existsSync4(join8(modulePath, "api", "error-codes.md"));
  if (!endpointsExists || !schemasExists || !errorCodesExists) {
    return {
      passed: false,
      detail: `Missing API docs in ${modulePath}: ${[
        !endpointsExists && "endpoints.md",
        !schemasExists && "schemas.md",
        !errorCodesExists && "error-codes.md"
      ].filter(Boolean).join(", ")}`
    };
  }
  const endpointsValidation = validateApiDoc(await readFile3(endpointsPath, "utf8"));
  if (!endpointsValidation.valid) {
    return {
      passed: false,
      detail: `Invalid API docs in ${modulePath}: ${endpointsValidation.errors.join("; ")}`
    };
  }
  return { passed: true, detail: "API docs present" };
}
async function checkIntegrationDocs(modulePath) {
  const eventsExists = existsSync4(join8(modulePath, "integration", "events.md"));
  const contractsExists = existsSync4(join8(modulePath, "integration", "contracts.md"));
  if (!eventsExists || !contractsExists) {
    return {
      passed: false,
      detail: `Missing integration docs in ${modulePath}: ${[
        !eventsExists && "events.md",
        !contractsExists && "contracts.md"
      ].filter(Boolean).join(", ")}`
    };
  }
  return { passed: true, detail: "Integration docs present" };
}
async function checkErrorCatalog(modulePath) {
  const catalogPath = join8(modulePath, "error-catalog.md");
  const catalogExists = existsSync4(catalogPath);
  if (!catalogExists) {
    return {
      passed: false,
      detail: `Missing error-catalog.md in ${modulePath}`
    };
  }
  const validation = validateErrorCatalogMarkdown(await readFile3(catalogPath, "utf8"));
  if (!validation.valid) {
    return {
      passed: false,
      detail: `Invalid error catalog in ${modulePath}: ${validation.errors.join("; ")}`
    };
  }
  return { passed: true, detail: "Error catalog present" };
}
function collectMissingDocs(projectRoot, modules, segments) {
  return modules.map((moduleName) => ({
    moduleName,
    path: join8(projectRoot, "docs", "modules", moduleName, ...segments)
  })).filter((entry) => !existsSync4(entry.path)).map((entry) => `${entry.moduleName}:${segments.join("/")}`);
}
async function validateCanonicalDocTarget(projectRoot, targetPath) {
  const absolutePath = join8(projectRoot, targetPath);
  if (!existsSync4(absolutePath)) {
    return "file does not exist";
  }
  if (!targetPath.endsWith(".md")) {
    return null;
  }
  const markdown = await readFile3(absolutePath, "utf8");
  if (markdown.trim().length === 0) {
    return "markdown file is empty";
  }
  if (targetPath.endsWith("/api/endpoints.md")) {
    const validation = validateApiDoc(markdown);
    return validation.valid ? null : validation.errors.join("; ");
  }
  if (targetPath.endsWith("/error-catalog.md")) {
    const validation = validateErrorCatalogMarkdown(markdown);
    return validation.valid ? null : validation.errors.join("; ");
  }
  if (!/^#{1,6}\s+\S+/m.test(markdown)) {
    return "markdown file is missing a heading";
  }
  return null;
}

// src/verification/gates/change-completeness.ts
var ChangeCompletenessGate = class {
  gate = "change-completeness";
  async check(context) {
    const blockerReasons = await collectBlockerReasons(context);
    if (!context.code_changed && blockerReasons.length === 0) {
      return createNotRequired(
        this.gate,
        "Not required: no code changed, so no implementation work was left to complete."
      );
    }
    const incompleteReasons = await collectIncompleteReasons(context);
    if (blockerReasons.length === 0 && incompleteReasons.length === 0) {
      return createPass(
        this.gate,
        "Change completeness: complete. Code changed, test evidence exists, canonical docs are current, and no blockers remain."
      );
    }
    return createFail(
      this.gate,
      buildFailureDetail(blockerReasons, incompleteReasons),
      blockerReasons.length > 0 ? "Resolve the blocking verification issues and finish the remaining change work before closing the task." : "Finish the remaining implementation, test, and documentation work before closing the task."
    );
  }
};
async function collectIncompleteReasons(context) {
  const reasons = [];
  const testEvidence = assessTestEvidence({
    changed_files: context.changed_files,
    modules: context.modules,
    test_files_changed: context.test_files_changed,
    structured_test_results: context.structured_test_results
  });
  const backstopCannotProve = isBackstopVerificationOrigin(context.verification_origin) && (context.structured_test_results?.length ?? 0) === 0;
  if (context.code_changed && testEvidence.strength !== "strong" && !backstopCannotProve) {
    reasons.push(testEvidence.detail);
  }
  const unresolvedDocTargets = await collectUnresolvedDocTargets(
    context.project_root,
    context.changed_files,
    context.stale_doc_targets
  );
  if (context.code_changed && unresolvedDocTargets.length > 0) {
    reasons.push(
      `Canonical docs not updated for changed code: ${unresolvedDocTargets.map(formatCanonicalDocTarget).join("; ")}`
    );
  }
  return reasons;
}
async function collectBlockerReasons(context) {
  const reasons = [];
  if (!context.requirements_complete) {
    reasons.push("Requirements are incomplete");
  }
  if (!context.story_quality_passed) {
    reasons.push("Story quality checks failed");
  }
  if (!context.ac_test_mapping_passed) {
    reasons.push("Acceptance criteria are not mapped to tests");
  }
  if (!context.spec_review_passed) {
    reasons.push("Spec review failed");
  }
  if (!context.architecture_compliant) {
    reasons.push("Architecture compliance failed");
  }
  if (context.spec_boundary && context.spec_boundary.length > 0) {
    const driftPaths = collectScopeDriftPaths(context.changed_files, context.spec_boundary);
    if (driftPaths.length > 0) {
      reasons.push(`Out-of-scope changes outside the spec boundary: ${driftPaths.join(", ")}`);
    }
  }
  const structuredTestIssue = getStructuredTestIssue(context.structured_test_results);
  if (structuredTestIssue) {
    reasons.push(structuredTestIssue);
  } else if (!context.code_tests_lint_passed) {
    reasons.push("Code, tests, or lint checks failed");
  }
  if (!context.implementation_review_passed) {
    reasons.push("Implementation review failed");
  }
  if (!structuredTestIssue && !context.behavioral_correctness_passed) {
    reasons.push("Behavioral correctness checks failed");
  }
  if (!context.database_quality_passed) {
    reasons.push("Database quality checks failed");
  }
  const documentationFailures = await collectCanonicalDocumentationFailures(
    context.project_root,
    context.expected_ui_modules,
    context.expected_api_modules,
    context.expected_integration_modules,
    context.expected_error_catalog_modules
  );
  if (documentationFailures.length > 0) {
    reasons.push(
      `Canonical documentation is missing or invalid: ${documentationFailures.join(", ")}`
    );
  }
  if (areRegistriesStale(context.registry_refreshed_at)) {
    reasons.push("Registries are stale");
  }
  if (!context.glossary_updated) {
    reasons.push("Glossary is out of date");
  }
  return reasons;
}
function getStructuredTestIssue(structuredTestResults) {
  const degradedResult = structuredTestResults?.find(
    (result) => result.parse_metadata.parse_strategy === "degraded"
  );
  if (degradedResult) {
    return `Test results for "${degradedResult.summary.runner_id}" could not be fully parsed`;
  }
  const failingResult = structuredTestResults?.find(
    (result) => result.summary.failed > 0 || result.summary.errored > 0
  );
  if (failingResult) {
    return `Structured test results report failures for ${failingResult.summary.runner_id}`;
  }
  return null;
}
function buildFailureDetail(blockerReasons, incompleteReasons) {
  if (blockerReasons.length > 0 && incompleteReasons.length > 0) {
    return `Change completeness: blocked. Blockers: ${blockerReasons.join("; ")}. Remaining work: ${incompleteReasons.join("; ")}.`;
  }
  if (blockerReasons.length > 0) {
    return `Change completeness: blocked. Blockers: ${blockerReasons.join("; ")}.`;
  }
  return `Change completeness: incomplete. Remaining work: ${incompleteReasons.join("; ")}.`;
}

// src/verification/gates/code-tests-lint.ts
init_esm_shims();
var CodeTestsLintGate = class {
  gate = "code-tests-lint";
  async check(context) {
    const evidence = assessTestEvidence({
      changed_files: context.changed_files,
      modules: context.modules,
      test_files_changed: context.test_files_changed,
      structured_test_results: context.structured_test_results
    });
    if (context.code_changed && evidence.strength === "none") {
      return createFail(
        this.gate,
        evidence.detail,
        "Add verification evidence that explicitly covers the changed code before closing the work."
      );
    }
    if (context.code_changed && evidence.strength === "weak") {
      return createFail(
        this.gate,
        evidence.detail,
        "Record structured verification evidence mapped to the affected files or modules."
      );
    }
    const degradedResult = context.structured_test_results?.find(
      (result) => result.parse_metadata.parse_strategy === "degraded"
    );
    if (degradedResult) {
      return createInconclusive(
        this.gate,
        `Test results for "${degradedResult.summary.runner_id}" could not be fully parsed`,
        "Check the test runner output and re-run."
      );
    }
    const structuredFailure = context.structured_test_results?.find(
      (result) => result.summary.failed > 0 || result.summary.errored > 0
    );
    if (structuredFailure) {
      return createFail(
        this.gate,
        `Structured test results report failures for ${structuredFailure.summary.runner_id}`,
        "Fix the failing build, test, or lint signal."
      );
    }
    if (context.structured_test_results && context.structured_test_results.length > 0) {
      const totals = context.structured_test_results.reduce(
        (aggregate, result) => {
          aggregate.total += result.summary.total;
          aggregate.passed += result.summary.passed;
          return aggregate;
        },
        { total: 0, passed: 0 }
      );
      return createPass(
        this.gate,
        `Structured test results show ${totals.passed}/${totals.total} passing checks`
      );
    }
    return checkBooleanGate(
      this.gate,
      context.code_tests_lint_passed,
      "Code, tests, and lint checks passed",
      "Code, tests, or lint checks failed",
      "Fix the failing build, test, or lint signal."
    );
  }
};

// src/verification/gates/database-quality.ts
init_esm_shims();
var DatabaseQualityGate = class {
  gate = "database-quality";
  async check(context) {
    return checkBooleanGate(
      this.gate,
      context.database_quality_passed,
      "Database quality checks passed",
      "Database quality checks failed",
      "Address schema, migration, or query quality issues."
    );
  }
};

// src/verification/gates/documentation-freshness.ts
init_esm_shims();
var DocumentationFreshnessGate = class {
  gate = "documentation-freshness";
  async check(context) {
    const unresolvedDocTargets = await collectUnresolvedDocTargets(
      context.project_root,
      context.changed_files,
      context.stale_doc_targets
    );
    if (context.code_changed && unresolvedDocTargets.length > 0) {
      return createFail(
        this.gate,
        `Canonical docs not updated for changed code: ${unresolvedDocTargets.map(formatCanonicalDocTarget).join("; ")}`,
        "Update the stale canonical docs before treating the implementation as complete."
      );
    }
    const missingDocs = await collectCanonicalDocumentationFailures(
      context.project_root,
      context.expected_ui_modules,
      context.expected_api_modules,
      context.expected_integration_modules,
      context.expected_error_catalog_modules
    );
    if (missingDocs.length > 0) {
      return createFail(
        this.gate,
        `Missing canonical docs: ${missingDocs.join(", ")}`,
        "Create or update the missing canonical documentation files."
      );
    }
    if (areRegistriesStale(context.registry_refreshed_at)) {
      return createFail(
        this.gate,
        "Registries are stale",
        "Run the registry refresh and update the registry refresh timestamp."
      );
    }
    if (!context.glossary_updated) {
      return createFail(
        this.gate,
        "Glossary is out of date",
        "Update the glossary with new terms introduced by the change."
      );
    }
    return createPass(this.gate, "Canonical documentation is current");
  }
};

// src/verification/gates/extension-surface.ts
init_esm_shims();
import { existsSync as existsSync5 } from "fs";
import { join as join9 } from "path";
var SURFACE_DOC_PATH = "docs/extension-surface.md";
var PUBLIC_BARRELS = ["src/index.ts", "src/cli/index.ts", "src/rule-scripts/index.ts"];
var REMEDIATION = `Amend ${SURFACE_DOC_PATH} in the same change when adding, removing, or renaming a public export.`;
var ExtensionSurfaceGate = class {
  gate = "extension-surface";
  async check(context) {
    const docAbsolutePath = join9(context.project_root, ...SURFACE_DOC_PATH.split("/"));
    if (!existsSync5(docAbsolutePath)) {
      return createNotRequired(
        this.gate,
        `Not required: this project has no extension surface document (${SURFACE_DOC_PATH}).`
      );
    }
    const changedFiles = context.changed_files.map(normalizePath3);
    const changedBarrel = changedFiles.find(
      (filePath) => PUBLIC_BARRELS.includes(filePath)
    );
    if (!changedBarrel) {
      return createNotRequired(this.gate, "Not required: no public export barrel changed.");
    }
    const documentAmended = changedFiles.includes(SURFACE_DOC_PATH);
    if (!documentAmended) {
      return createFail(
        this.gate,
        `Public export barrel ${changedBarrel} changed without amending ${SURFACE_DOC_PATH}`,
        REMEDIATION
      );
    }
    return createPass(
      this.gate,
      `Public export barrel ${changedBarrel} changed and ${SURFACE_DOC_PATH} amended in the same change.`
    );
  }
};
function normalizePath3(filePath) {
  return filePath.replaceAll("\\", "/").replace(/^\.?\//, "");
}

// src/verification/gates/implementation-review.ts
init_esm_shims();

// src/review-digest/index.ts
init_esm_shims();

// src/review-digest/digest.ts
init_esm_shims();

// src/review-digest/sources.ts
init_esm_shims();

// src/checks/report-target.ts
init_esm_shims();

// src/checks/report-store.ts
init_esm_shims();
import { existsSync as existsSync6, mkdirSync as mkdirSync2, readFileSync as readFileSync6, writeFileSync as writeFileSync2 } from "fs";
import { dirname as dirname4, join as join10 } from "path";
var CHECKS_REPORT_SCHEMA_VERSION = 2;
var CHECKS_BUNDLE_SCHEMA_VERSION = 3;
var CHECKS_DOC_TYPE = "paqad.checks";
var REPORT_HEADER_KEYS = /* @__PURE__ */ new Set([...ENVELOPE_HEADER_KEYS, "generated_at"]);
function checksReportPath(projectRoot) {
  return join10(projectRoot, PATHS.CHECKS_REPORT);
}
function featureChecksPath(projectRoot, dirName) {
  return join10(projectRoot, featureFilePath(dirName, "checks"));
}
function atomicWriteReport(target, report) {
  mkdirSync2(dirname4(target), { recursive: true });
  const tmp = `${target}.tmp`;
  writeFileSync2(tmp, JSON.stringify(report, null, 2) + "\n", "utf8");
  renameWithRetrySync(tmp, target);
  return target;
}
function readReportAt(target) {
  if (!existsSync6(target)) return null;
  try {
    const parsed = JSON.parse(readFileSync6(target, "utf8"));
    if (typeof parsed?.passed !== "boolean" || !Array.isArray(parsed?.results)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
function writeChecksReport(projectRoot, report) {
  return atomicWriteReport(checksReportPath(projectRoot), report);
}
function writeFeatureChecks(projectRoot, dirName, report, sessionId) {
  const body = Object.fromEntries(
    Object.entries(report).filter(([key]) => !REPORT_HEADER_KEYS.has(key))
  );
  const recordedAt = report.generated_at ?? report.recorded_at;
  const stamped = stampFeatureDocument({
    projectRoot,
    dirName,
    docType: CHECKS_DOC_TYPE,
    schemaVersion: CHECKS_BUNDLE_SCHEMA_VERSION,
    sessionId,
    now: recordedAt === void 0 ? void 0 : () => new Date(recordedAt),
    body
  });
  return atomicWriteReport(featureChecksPath(projectRoot, dirName), stamped);
}
function readChecksReport(projectRoot) {
  return readReportAt(checksReportPath(projectRoot));
}
function readFeatureChecks(projectRoot, dirName) {
  return readReportAt(featureChecksPath(projectRoot, dirName));
}

// src/checks/report-target.ts
function activeFeatureDirOrNull(projectRoot) {
  try {
    return currentFeature(projectRoot, checksSessionId(projectRoot));
  } catch {
    return null;
  }
}
function checksSessionId(projectRoot) {
  return resolveSessionId(projectRoot, explicitSessionHint());
}
function explicitSessionHint() {
  for (const candidate of [process.env.SE_SESSION, process.env.CLAUDE_SESSION_ID]) {
    const cleaned = candidate?.trim();
    if (cleaned) return cleaned;
  }
  return null;
}
function readChecksReportForFeature(projectRoot, dirName) {
  if (dirName) {
    const fromBundle = readFeatureChecks(projectRoot, dirName);
    if (fromBundle) return fromBundle;
  }
  return readChecksReport(projectRoot);
}
function writeChecksReportForFeature(projectRoot, dirName, report) {
  return dirName ? writeFeatureChecks(projectRoot, dirName, report, checksSessionId(projectRoot)) : writeChecksReport(projectRoot, report);
}

// src/duplication/report.ts
init_esm_shims();
import { existsSync as existsSync7, mkdirSync as mkdirSync3, readFileSync as readFileSync7, writeFileSync as writeFileSync3 } from "fs";
import { dirname as dirname5, join as join11 } from "path";
var DUPLICATION_REPORT_SCHEMA_VERSION = 1;
function summarizeFindings(findings, mode) {
  const deterministic = findings.filter((f) => f.kind === "deterministic").length;
  const heuristic = findings.filter((f) => f.kind === "heuristic").length;
  return {
    counts: { deterministic, heuristic },
    blocking: mode === "strict" && deterministic > 0
  };
}
function buildDuplicationReport(input) {
  const { counts, blocking } = summarizeFindings(input.findings, input.config.mode);
  return {
    schema_version: DUPLICATION_REPORT_SCHEMA_VERSION,
    generated_at: input.now,
    mode: input.config.mode,
    similarity_threshold: input.config.similarityThreshold,
    min_lines: input.config.minLines,
    elapsed_ms: input.elapsedMs,
    findings: input.findings,
    counts,
    blocking,
    ...input.resolvedDecisions && input.resolvedDecisions.length > 0 ? { resolved_decisions: input.resolvedDecisions } : {}
  };
}
function reportPath(projectRoot) {
  return join11(projectRoot, PATHS.DUPLICATION_REPORT);
}
function writeDuplicationReport(projectRoot, report) {
  const path = reportPath(projectRoot);
  mkdirSync3(dirname5(path), { recursive: true });
  writeFileSync3(path, `${JSON.stringify(report, null, 2)}
`, "utf8");
}
function readDuplicationReport(projectRoot) {
  const path = reportPath(projectRoot);
  if (!existsSync7(path)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync7(path, "utf8"));
  } catch {
    return null;
  }
}

// src/duplication/types.ts
init_esm_shims();
function formatRange(range) {
  return range.start === range.end ? `${range.start}` : `${range.start}-${range.end}`;
}
function duplicationMessage(input) {
  const percent = Math.round(input.similarity * 100);
  const matchedName = input.matchedSymbol ?? input.matchedFile;
  return `New code in ${input.file}:${formatRange(input.lineRange)} is ${percent}% similar to existing ${matchedName} (${input.matchedFile}:${formatRange(input.matchedLineRange)}), already used by ${input.matchedCallers} call sites. Prefer reusing or extending it \u2014 or record why a new copy is needed.`;
}

// src/verification/evidence-markdown.ts
init_esm_shims();
import { existsSync as existsSync9, readFileSync as readFileSync9 } from "fs";
import { join as join13 } from "path";

// src/evidence/receipt/project.ts
init_esm_shims();
import { appendFileSync, existsSync as existsSync8, mkdirSync as mkdirSync4, readFileSync as readFileSync8 } from "fs";
import { mkdir as mkdir3, rename as rename3, writeFile as writeFile3 } from "fs/promises";
import { dirname as dirname6, join as join12 } from "path";
function latestReceiptAuthorship(projectRoot) {
  const latest = latestFeatureReceipt(projectRoot);
  if (latest === null) return null;
  const statement = decodeReceiptStatement(latest);
  return statement?.predicate.change_authorship ?? null;
}
function latestReceiptTrustExtras(projectRoot) {
  const latest = latestFeatureReceipt(projectRoot);
  if (latest === null) return { compliance: [], reproducibility: null };
  const statement = decodeReceiptStatement(latest);
  return {
    compliance: statement?.predicate.compliance_citations ?? [],
    reproducibility: statement?.predicate.reproducibility ?? null
  };
}

// src/verification/verdict-kind.ts
init_esm_shims();
function verdictKindFor(gates, unrecordedMandatoryStages = []) {
  if (gates.some((gate) => gate.status === "fail")) return "fail";
  if (gates.some((gate) => gate.status === "inconclusive")) return "inconclusive";
  if (unrecordedMandatoryStages.length > 0) return "inconclusive";
  return "pass";
}

// src/verification/evidence-markdown.ts
var GATE_GLYPHS = {
  pass: PAQAD_STATUS_GLYPH.good,
  fail: PAQAD_STATUS_GLYPH.failed,
  inconclusive: PAQAD_STATUS_GLYPH.needsLook,
  skipped: PAQAD_STATUS_GLYPH.skipped
};
var VERDICT_GLYPHS = {
  pass: PAQAD_STATUS_GLYPH.good,
  fail: PAQAD_STATUS_GLYPH.failed,
  inconclusive: PAQAD_STATUS_GLYPH.needsLook
};
function commentVerdict(evidence) {
  if (evidence.overall_status === "error") return "inconclusive";
  return verdictKindFor(evidence.gates, evidence.unrecorded_mandatory_stages ?? []);
}
var GATE_LABELS = {
  "code-tests-lint": "Tests",
  "mutation-testing": "Mutation",
  "quality-ratchet": "Quality ratchet",
  "ac-test-mapping": "Traceability",
  "behavioral-correctness": "Behavioural correctness",
  "architecture-compliance": "Architecture"
};
var TRUST_GATES = ["code-tests-lint", "mutation-testing", "quality-ratchet"];
function gateLabel(name) {
  return GATE_LABELS[name] ?? name.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function readVerificationEvidence(projectRoot) {
  const path = join13(projectRoot, VERIFICATION_EVIDENCE_RELATIVE_PATH);
  if (!existsSync9(path)) return null;
  try {
    const evidence = JSON.parse(readFileSync9(path, "utf8"));
    if (!Array.isArray(evidence.gates)) return null;
    return evidence;
  } catch {
    return null;
  }
}
function buildEvidenceComment(projectRoot, sha) {
  const evidence = readVerificationEvidence(projectRoot);
  if (evidence === null) return null;
  const authorship = latestReceiptAuthorship(projectRoot) ?? void 0;
  const extras = latestReceiptTrustExtras(projectRoot);
  return renderEvidenceMarkdown(evidence, {
    ...sha ? { sha } : {},
    ...authorship ? { authorship } : {},
    ...extras.compliance.length > 0 ? { compliance: extras.compliance } : {},
    ...extras.reproducibility ? { reproducibility: extras.reproducibility } : {}
  });
}
function shortSha(sha) {
  if (!sha) return null;
  const trimmed = sha.trim();
  if (trimmed.length === 0) return null;
  return /^[0-9a-f]{8,40}$/i.test(trimmed) ? trimmed.slice(0, 7) : trimmed;
}
function renderFailure(failure) {
  const location = failure.file !== null && failure.line !== null ? `${failure.file}:${failure.line}` : failure.file ?? failure.test_id ?? failure.suite ?? null;
  return location ? `  - ${location} \u2014 ${failure.message}` : `  - ${failure.message}`;
}
function isDidNotRun(gate) {
  return gate.status === "skipped" && gate.skip_kind === "did-not-run";
}
function didNotRunLine(gate) {
  const label = gateLabel(gate.name);
  return gate.skip_reason !== void 0 ? `- ${GATE_GLYPHS.skipped} ${label} did not run: ${gate.skip_reason}` : `- ${GATE_GLYPHS.skipped} ${label}: ${gate.detail}`;
}
function gateSummaryLine(gate) {
  const confidence = gate.name === "mutation-testing" && gate.confidence === "lower" ? " _(confidence: lower \u2014 do not over-trust)_" : "";
  return `- ${GATE_GLYPHS[gate.status]} ${gateLabel(gate.name)} \u2014 ${gate.detail}${confidence}`;
}
function renderComplianceLines(citations) {
  if (citations.length === 0) return null;
  const byClause = /* @__PURE__ */ new Map();
  for (const citation of citations) {
    byClause.set(`${citation.framework_id}|${citation.clause_id}`, citation);
  }
  const clauses = [...byClause.values()].map(
    (c) => `${c.framework_title} ${c.clause_id} (${c.evidence_strength})`
  );
  const disclaimer = citations[0]?.disclaimer.trim().replace(/\s+/g, " ") ?? "";
  const lines = [`> Compliance evidence toward: ${clauses.join(", ")}.`];
  if (disclaimer.length > 0) lines.push(`> _${disclaimer}_`);
  return lines;
}
function renderReproducibilityLine(stamp) {
  return `> Replayable from frozen context: \`${stamp.context_hash.slice(0, 12)}\` (${stamp.determinism}, algo v${stamp.algo_version}).`;
}
function renderAuthorshipLine(authorship) {
  const parts = [];
  if (authorship.agent !== void 0) parts.push(`written by \`${authorship.agent}\``);
  const modelLabel = authorship.model_id ?? authorship.model;
  if (modelLabel !== void 0) {
    const qualifier = authorship.provenance === "declared" ? " (declared)" : "";
    parts.push(`model \`${modelLabel}\`${qualifier}`);
  }
  if (authorship.accepting_human?.name !== void 0) {
    parts.push(`accepted by ${authorship.accepting_human.name}`);
  }
  if (parts.length === 0) return null;
  return `> Authorship: ${parts.join(" \xB7 ")}. paqad attests this on its gates, so the proof holds whichever tool wrote it.`;
}
function renderEvidenceMarkdown(evidence, options = {}) {
  const lines = [];
  const sha = shortSha(options.sha);
  const verdict = commentVerdict(evidence);
  const headerSuffix = sha ? ` \u2014 ${sha}` : "";
  lines.push(
    `## paqad evidence${headerSuffix}  ${VERDICT_GLYPHS[verdict]} ${PAQAD_VERDICT[verdict]}`
  );
  lines.push("");
  const counts = { pass: 0, fail: 0, inconclusive: 0, notRequired: 0, didNotRun: 0 };
  for (const gate of evidence.gates) {
    if (gate.status !== "skipped") counts[gate.status] += 1;
    else if (isDidNotRun(gate)) counts.didNotRun += 1;
    else counts.notRequired += 1;
  }
  lines.push(
    `Gates: ${counts.pass} passed, ${counts.fail} failed, ${counts.inconclusive} inconclusive, ${counts.notRequired} not required, ${counts.didNotRun} did not run.`
  );
  lines.push("");
  const byName = new Map(evidence.gates.map((gate) => [gate.name, gate]));
  const trustLines = TRUST_GATES.map((name) => byName.get(name)).filter(
    (gate) => gate !== void 0 && (gate.status !== "skipped" || isDidNotRun(gate))
  ).map((gate) => gate.status === "skipped" ? didNotRunLine(gate) : gateSummaryLine(gate));
  if (trustLines.length > 0) {
    lines.push(...trustLines);
    lines.push("");
  }
  const blocking = evidence.gates.filter(
    (gate) => gate.status === "fail" || gate.status === "inconclusive"
  );
  if (blocking.length > 0) {
    lines.push("### Blocking");
    lines.push("");
    for (const gate of blocking) {
      lines.push(gateSummaryLine(gate));
      for (const failure of gate.failures) {
        lines.push(renderFailure(failure));
      }
      if (gate.remediation) {
        lines.push(`  - _Fix:_ ${gate.remediation}`);
      }
    }
    lines.push("");
  }
  lines.push(
    verdict === "pass" ? "> Attests paqad\u2019s gates passed for this run \u2014 not that the change is correct." : "> paqad\u2019s gates did not all pass. Resolve the blocking items above before merge."
  );
  const authorshipLine = options.authorship ? renderAuthorshipLine(options.authorship) : null;
  if (authorshipLine !== null) {
    lines.push("");
    lines.push(authorshipLine);
  }
  const complianceLines = options.compliance ? renderComplianceLines(options.compliance) : null;
  if (complianceLines !== null) {
    lines.push("");
    lines.push(...complianceLines);
  }
  if (options.reproducibility) {
    lines.push("");
    lines.push(renderReproducibilityLine(options.reproducibility));
  }
  return lines.join("\n");
}

// src/review-digest/sources.ts
var HIGH_BAND = ["critical", "blocker", "high"];
function oneLine(message, max = 200) {
  const collapsed = message.replace(/\s+/g, " ").trim();
  return collapsed.length > max ? `${collapsed.slice(0, max - 1)}\u2026` : collapsed;
}
function findingAnchor(finding) {
  if (finding.file === null) return null;
  return finding.line === null ? finding.file : `${finding.file}:${finding.line}`;
}
function ruleScriptRows(projectRoot) {
  const report = readReport(projectRoot);
  if (!report) return [];
  const rows = [];
  for (const result of report.results) {
    for (const finding of result.findings) {
      rows.push({
        source: `rule:${result.rule_id}`,
        severity: finding.severity,
        tier: result.kind,
        file: finding.file,
        line: finding.line === void 0 ? null : String(finding.line),
        message: oneLine(finding.message)
      });
    }
  }
  return rows;
}
function duplicationRows(projectRoot) {
  const report = readDuplicationReport(projectRoot);
  if (!report) return [];
  return report.findings.map((finding) => ({
    source: "duplication",
    severity: finding.kind === "deterministic" ? "high" : "medium",
    tier: finding.kind,
    file: finding.file,
    line: formatRange(finding.line_range),
    message: oneLine(finding.message)
  }));
}
function checksRows(projectRoot) {
  const report = readChecksReportForFeature(projectRoot, activeFeatureDirOrNull(projectRoot));
  if (!report) return [];
  const rows = [];
  for (const result of report.results) {
    const runner = result.summary.runner_id;
    const failed = result.summary.failed + result.summary.errored;
    rows.push({
      source: "checks",
      severity: failed > 0 ? "high" : "info",
      tier: "deterministic",
      file: null,
      line: null,
      message: oneLine(
        failed > 0 ? `${runner}: ${failed} failing of ${result.summary.total}` : `${runner}: ${result.summary.passed} passing of ${result.summary.total}`
      )
    });
    for (const failure of result.failures) {
      rows.push({
        source: `checks:${runner}`,
        severity: "high",
        tier: "deterministic",
        file: failure.file_path,
        line: failure.line_number === null ? null : String(failure.line_number),
        message: oneLine(`${failure.test_id}: ${failure.message}`)
      });
    }
  }
  return rows;
}
function gateRows(projectRoot) {
  const evidence = readVerificationEvidence(projectRoot);
  if (!evidence) return [];
  const rows = [];
  for (const gate of evidence.gates) {
    if (gate.status !== "fail" && gate.status !== "inconclusive") continue;
    const severity = gate.status === "fail" ? "high" : "medium";
    if (gate.failures.length === 0) {
      rows.push({
        source: `gate:${gate.name}`,
        severity,
        tier: "deterministic",
        file: null,
        line: null,
        message: oneLine(gate.detail)
      });
      continue;
    }
    for (const failure of gate.failures) {
      rows.push({
        source: `gate:${gate.name}`,
        severity,
        tier: "deterministic",
        file: failure.file,
        line: failure.line === null ? null : String(failure.line),
        message: oneLine(failure.ac_id ? `${failure.ac_id}: ${failure.message}` : failure.message)
      });
    }
  }
  return rows;
}
function collectMachineFindings(projectRoot) {
  return [
    ...ruleScriptRows(projectRoot),
    ...duplicationRows(projectRoot),
    ...checksRows(projectRoot),
    ...gateRows(projectRoot)
  ];
}
function anchoringFindings(findings) {
  return findings.filter(
    (finding) => finding.tier === "deterministic" && HIGH_BAND.includes(finding.severity) && findingAnchor(finding) !== null
  );
}
function unanchoredMachineFindings(findings, reviewText) {
  return anchoringFindings(findings).filter((finding) => {
    const anchor = findingAnchor(finding);
    return anchor !== null && !reviewText.includes(anchor);
  });
}

// src/review-digest/digest.ts
var DIGEST_LINE_CAP = 150;
var CHANGED_FILE_LIMIT = 12;
var BLIND_SPOTS = [
  "Semantic duplication \u2014 logic re-implemented in different words. The detector matches tokens, not meaning.",
  "Architectural fit \u2014 whether this belongs in this module at all.",
  "Naming and API shape \u2014 nothing grades whether a name will read well in six months.",
  "Whether the tests assert the RIGHT behaviour; coverage proves they ran, not that they are correct.",
  "Rollback and data-migration risk, and anything only reproducible against real data."
];
function section(title, rows, emptyLine) {
  return [`## ${title}`, "", ...rows.length > 0 ? rows : [emptyLine], ""];
}
function criterionLine(criterion) {
  const gwt = [
    criterion.given ? `given ${criterion.given}` : "",
    criterion.when ? `when ${criterion.when}` : "",
    criterion.then ? `then ${criterion.then}` : ""
  ].filter(Boolean).join(", ");
  const proof = criterion.proof_type ? ` [${criterion.proof_type}]` : "";
  return `- ${criterion.criterion_id}${proof} \u2014 ${gwt || "no given/when/then recorded"}`;
}
function findingLine(finding) {
  const anchor = findingAnchor(finding) ?? "-";
  return `${finding.source} | ${finding.severity} | ${finding.tier} | ${anchor} | ${finding.message}`;
}
function capLines(lines) {
  if (lines.length <= DIGEST_LINE_CAP) return lines;
  const kept = lines.slice(0, DIGEST_LINE_CAP - 1);
  return [
    ...kept,
    `> \u2026truncated: ${lines.length - kept.length} more lines (cap ${DIGEST_LINE_CAP}).`
  ];
}
function buildReviewDigest(input) {
  const lines = [
    "# Review digest",
    "",
    `> Machine-built ${input.generated_at} from cached evidence \u2014 no model wrote a word of it.`,
    "> Confirm or contest every deterministic row below. An unaddressed deterministic finding is itself a review finding.",
    "",
    "## Change",
    "",
    `- Feature: ${input.feature ?? "none active"}`
  ];
  if (input.changed_files.length === 0) {
    lines.push("- Changed files: none recorded");
  } else {
    const shown = input.changed_files.slice(0, CHANGED_FILE_LIMIT);
    lines.push(`- Changed files (${input.changed_files.length}):`);
    lines.push(...shown.map((file) => `  - ${file}`));
    if (input.changed_files.length > shown.length) {
      lines.push(`  - \u2026and ${input.changed_files.length - shown.length} more`);
    }
  }
  lines.push(
    input.stages.length === 0 ? "- Stages: none recorded" : `- Stages: ${input.stages.map((stage) => `${stage.stage}=${stage.state}`).join(" \xB7 ")}`
  );
  lines.push("");
  lines.push(
    ...section(
      "Spec",
      input.criteria.map(criterionLine),
      "No frozen acceptance criteria on record (`paqad-ai spec freeze` writes them)."
    )
  );
  const findingRows = input.findings.length === 0 ? [] : [
    "source | severity | tier | file:line | message",
    "--- | --- | --- | --- | ---",
    ...input.findings.map(findingLine)
  ];
  lines.push(
    ...section(
      "Machine findings",
      findingRows,
      'No machine findings recorded. Nothing ran, or everything it ran came back clean \u2014 check the stage states above before reading this as "clean".'
    )
  );
  lines.push(
    ...section(
      "Blind spots",
      BLIND_SPOTS.map((spot) => `- ${spot}`),
      "none recorded"
    )
  );
  return `${capLines(lines).join("\n").trimEnd()}
`;
}

// src/review-digest/write.ts
init_esm_shims();
import { mkdirSync as mkdirSync5, writeFileSync as writeFileSync4 } from "fs";
import { dirname as dirname7, join as join14 } from "path";
function readStages(projectRoot, sessionId, feature) {
  if (feature === null) return [];
  try {
    return foldFeature(projectRoot, sessionId, feature).stages.map((stage) => ({
      stage: stage.stage,
      state: stage.state
    }));
  } catch {
    return [];
  }
}
function readCriteria(projectRoot, feature) {
  if (feature === null) return [];
  const spec = readFeatureSpecification(projectRoot, feature);
  if (!spec || !Array.isArray(spec.acceptance_criteria)) return [];
  return spec.acceptance_criteria.map((criterion) => ({
    criterion_id: criterion.criterion_id,
    given: criterion.given,
    when: criterion.when,
    then: criterion.then,
    proof_type: criterion.proof_type
  }));
}
async function writeReviewDigest(projectRoot, sessionId, now = () => /* @__PURE__ */ new Date()) {
  let feature;
  try {
    feature = currentFeature(projectRoot, sessionId);
  } catch {
    feature = null;
  }
  const findings = collectMachineFindings(projectRoot);
  const { files: changedFiles } = await loadChangeEvidence(projectRoot);
  const markdown = buildReviewDigest({
    feature,
    generated_at: now().toISOString(),
    changed_files: changedFiles,
    stages: readStages(projectRoot, sessionId, feature),
    criteria: readCriteria(projectRoot, feature),
    findings
  });
  const target = join14(projectRoot, PATHS.REVIEW_DIGEST);
  mkdirSync5(dirname7(target), { recursive: true });
  writeFileSync4(target, markdown, "utf8");
  return { path: PATHS.REVIEW_DIGEST, feature, findings: findings.length, markdown };
}

// src/verification/gates/implementation-review.ts
function activeReviewText(projectRoot) {
  try {
    const sessionId = resolveSessionId(projectRoot, process.env.CLAUDE_SESSION_ID ?? null);
    const dirName = currentFeature(projectRoot, sessionId);
    if (!dirName) return "";
    const review = readFeatureReview(projectRoot, dirName);
    if (!review) return "";
    return [
      review.summary,
      review.rollback,
      ...review.checked ?? [],
      ...(review.findings ?? []).flatMap((finding) => [finding.description, finding.file ?? ""])
    ].join("\n");
  } catch {
    return "";
  }
}
var ImplementationReviewGate = class {
  gate = "implementation-review";
  async check(context) {
    const findings = context.implementation_review_findings ?? [];
    const blocking = findings.filter((finding) => finding.severity === "error");
    if (blocking.length > 0) {
      return createFail(
        this.gate,
        `Implementation review found blocking defects: ${blocking.map((finding) => finding.detail).join("; ")}`,
        "Resolve implementation review findings before continuing."
      );
    }
    const unaddressed = unanchoredMachineFindings(
      collectMachineFindings(context.project_root),
      activeReviewText(context.project_root)
    );
    if (unaddressed.length > 0) {
      return createFail(
        this.gate,
        `Review does not address ${unaddressed.length} deterministic machine finding(s): ${unaddressed.map((finding) => `${findingAnchor(finding)} (${finding.source})`).join("; ")}`,
        "Run `paqad-ai review digest`, then confirm or contest each finding in the review (cite its file:line)."
      );
    }
    const warnings = findings.filter((finding) => finding.severity === "warning");
    if (warnings.length > 0) {
      return createPass(
        this.gate,
        `Implementation review passed with warnings: ${warnings.map((finding) => finding.detail).join("; ")}`
      );
    }
    return checkBooleanGate(
      this.gate,
      context.implementation_review_passed,
      "Implementation review passed",
      "Implementation review failed",
      "Resolve implementation review findings before continuing."
    );
  }
};

// src/verification/gates/instructions-docs-structure.ts
init_esm_shims();
var import_yaml2 = __toESM(require_dist(), 1);
import { existsSync as existsSync10 } from "fs";
import { readFile as readFile4 } from "fs/promises";
import { extname as extname2, join as join15 } from "path";

// src/workflows/template-validator.ts
init_esm_shims();
var WorkflowTemplateValidator = class {
  validate(template, availableSkills) {
    const errors = [];
    if (!template.name) errors.push("Template must have a name");
    if (!template.steps || template.steps.length === 0)
      errors.push("Template must have at least one step");
    for (let i = 0; i < (template.steps ?? []).length; i++) {
      const step = template.steps[i];
      if (this.isParallelGroup(step)) {
        for (const subStep of step.parallel) {
          if (!availableSkills.has(subStep.skill)) {
            errors.push(`Step ${i}: unknown skill "${subStep.skill}" in parallel group`);
          }
          if (subStep.on_failure && !["skip", "abort", "retry"].includes(subStep.on_failure)) {
            errors.push(`Step ${i}: invalid on_failure value "${subStep.on_failure}"`);
          }
        }
      } else {
        if (!availableSkills.has(step.skill)) {
          errors.push(`Step ${i}: unknown skill "${step.skill}"`);
        }
        if (step.on_failure && !["skip", "abort", "retry"].includes(step.on_failure)) {
          errors.push(`Step ${i}: invalid on_failure value "${step.on_failure}"`);
        }
      }
    }
    return { valid: errors.length === 0, errors };
  }
  isParallelGroup(step) {
    return "parallel" in step;
  }
};

// src/verification/gates/instructions-docs-structure.ts
var REMEDIATION2 = "Move instruction documentation under an approved docs/instructions/{rules,stack,architecture,design-system,registries,workflows,tools,benchmarks,tech-debt,site-map}/ path.";
var NON_CANONICAL_ROOTS = [
  "docs/instruction/",
  "docs/instruction-docs/",
  "docs/instructions-docs/"
];
var ALLOWED_TOP_LEVEL_AREAS = /* @__PURE__ */ new Set([
  "rules",
  "stack",
  "architecture",
  "design-system",
  "registries",
  "workflows",
  "tools",
  "benchmarks",
  "tech-debt"
]);
var InstructionsDocsStructureGate = class {
  gate = "instructions-docs-structure";
  async check(context) {
    const changedFiles = context.changed_files.map(normalizePath4);
    if (!isProviderCompletionCheck(context)) {
      const touched = changedFiles.some(
        (filePath) => ["docs/instructions/", ...NON_CANONICAL_ROOTS].some((root) => isUnderPath(filePath, root))
      );
      return touched ? createDidNotRun(
        this.gate,
        "Did not run: instruction doc structure is checked only at the in-session completion check."
      ) : createNotRequired(this.gate, "Not required: no instruction doc changed.");
    }
    const nonCanonicalPath = changedFiles.find(
      (filePath) => NON_CANONICAL_ROOTS.some((root) => isUnderPath(filePath, root))
    );
    if (nonCanonicalPath) {
      return createFail(
        this.gate,
        `Invalid instruction documentation path ${nonCanonicalPath}`,
        REMEDIATION2
      );
    }
    const instructionPaths = changedFiles.filter(
      (filePath) => isUnderPath(filePath, "docs/instructions/")
    );
    if (instructionPaths.length === 0) {
      return createNotRequired(this.gate, "Not required: no instruction doc changed.");
    }
    for (const filePath of instructionPaths) {
      const structuralError = validateInstructionPath(filePath);
      if (structuralError) {
        return createFail(this.gate, structuralError, REMEDIATION2);
      }
      const absolutePath = join15(context.project_root, ...filePath.split("/"));
      if (!existsSync10(absolutePath)) {
        return createFail(
          this.gate,
          `Instruction documentation file ${filePath} does not exist`,
          "Restore the touched instruction documentation file before completing the provider request."
        );
      }
      const contentError = await validateFileContent(absolutePath, filePath);
      if (contentError) {
        return createFail(this.gate, contentError.detail, contentError.remediation);
      }
    }
    return createPass(this.gate, "Instruction documentation structure is valid");
  }
};
function validateInstructionPath(filePath) {
  if (hasHiddenOrSystemSegment(filePath)) {
    return `Invalid instruction documentation path ${filePath}`;
  }
  const segments = filePath.split("/");
  if (segments.length < 4 || segments[0] !== "docs" || segments[1] !== "instructions") {
    return `Invalid instruction documentation path ${filePath}`;
  }
  const area = segments[2];
  if (!ALLOWED_TOP_LEVEL_AREAS.has(area)) {
    return `Invalid instruction documentation path ${filePath}`;
  }
  switch (area) {
    case "rules":
      return validateRulesPath(filePath, segments);
    case "stack":
      return validateFlatExtensionPath(filePath, segments, [".md"]);
    case "architecture":
      return validateFlatExtensionPath(filePath, segments, [".md", ".json"]);
    case "design-system":
      return validateFlatExtensionPath(filePath, segments, [".md", ".json", ".css"]);
    case "registries":
      return validateFlatExtensionPath(filePath, segments, [".md"]);
    case "workflows":
      return validateFlatExtensionPath(filePath, segments, [".yaml", ".yml"]);
    case "tools":
      return validateToolsPath(filePath, segments);
    case "benchmarks":
    case "tech-debt":
      return validateFlatExtensionPath(filePath, segments, [".md"]);
    /* v8 ignore start -- ALLOWED_TOP_LEVEL_AREAS is exhaustive with the switch cases above */
    default:
      return `Invalid instruction documentation path ${filePath}`;
  }
}
function validateRulesPath(filePath, segments) {
  if (segments.length === 4) {
    const filename = segments[3];
    if (filename === "writing-style.md" || filename === "module-map.yml" || filename === "module-map.yaml") {
      return null;
    }
    return `Invalid instruction documentation path ${filePath}`;
  }
  if (segments.length === 5 && extname2(filePath) === ".md" && segments[3].length > 0) {
    return null;
  }
  return `Invalid instruction documentation path ${filePath}`;
}
function validateToolsPath(filePath, segments) {
  if (segments.length === 5 && segments[3].length > 0 && extname2(filePath) === ".md") {
    return null;
  }
  return `Invalid instruction documentation path ${filePath}`;
}
function validateFlatExtensionPath(filePath, segments, allowedExtensions) {
  if (segments.length !== 4 || !allowedExtensions.includes(extname2(filePath))) {
    return `Invalid instruction documentation path ${filePath}`;
  }
  return null;
}
async function validateFileContent(absolutePath, relativePath) {
  const content = await readFile4(absolutePath, "utf8");
  const extension = extname2(relativePath);
  if (extension === ".md") {
    if (content.trim().length === 0) {
      return {
        detail: `Instruction markdown file ${relativePath} is empty`,
        remediation: "Add non-empty markdown content before completing the provider request."
      };
    }
    if (!hasMarkdownHeading(content)) {
      return {
        detail: `Instruction markdown file ${relativePath} does not contain a heading`,
        remediation: "Add at least one markdown heading before completing the provider request."
      };
    }
    return null;
  }
  if (extension === ".yaml" || extension === ".yml") {
    let parsed;
    try {
      parsed = (0, import_yaml2.parse)(content);
    } catch {
      return {
        detail: `Instruction YAML file ${relativePath} does not parse`,
        remediation: "Fix the YAML syntax before completing the provider request."
      };
    }
    if (isModuleMap(relativePath) && !hasTopLevelModulesArray(parsed)) {
      return {
        detail: `Instruction module map ${relativePath} must contain a top-level modules array`,
        remediation: "Add a top-level modules array to the instruction rule module map before completing the provider request."
      };
    }
    if (isModuleMap(relativePath)) {
      return validateModuleMap(parsed, relativePath);
    }
    return validateWorkflowYaml(parsed, relativePath);
  }
  if (extension === ".json") {
    try {
      JSON.parse(content);
      return null;
    } catch {
      return {
        detail: `Instruction JSON file ${relativePath} does not parse`,
        remediation: "Fix the JSON syntax before completing the provider request."
      };
    }
  }
  if (content.trim().length === 0) {
    return {
      detail: `Instruction CSS file ${relativePath} is empty`,
      remediation: "Add non-empty CSS content before completing the provider request."
    };
  }
  return null;
}
function normalizePath4(filePath) {
  return filePath.replaceAll("\\", "/").replace(/^\.?\//, "");
}
function isUnderPath(filePath, prefix) {
  return filePath === prefix.slice(0, -1) || filePath.startsWith(prefix);
}
function isProviderCompletionCheck(context) {
  return context.verification_origin === "provider-workflow" && context.verification_stage === "provider-completion";
}
function hasHiddenOrSystemSegment(filePath) {
  return filePath.split("/").some((segment) => segment.startsWith("."));
}
function hasMarkdownHeading(markdown) {
  return markdown.split(/\r?\n/u).some((line) => /^#{1,6}\s+\S/u.test(line.trim()));
}
function isModuleMap(relativePath) {
  return relativePath === "docs/instructions/rules/module-map.yml" || relativePath === "docs/instructions/rules/module-map.yaml";
}
function hasTopLevelModulesArray(value) {
  return typeof value === "object" && value !== null && "modules" in value && Array.isArray(value.modules);
}
function validateModuleMap(value, relativePath) {
  if (!isPlainObject(value)) {
    return moduleMapError(relativePath, "must be a YAML mapping");
  }
  const requiredRootFields = ["version", "last_updated_at", "domain_glossary", "modules"];
  for (const field of requiredRootFields) {
    if (!(field in value)) {
      return moduleMapError(relativePath, `is missing required field ${field}`);
    }
  }
  if (typeof value["version"] !== "number") {
    return moduleMapError(relativePath, "field version must be a number");
  }
  if (typeof value["last_updated_at"] !== "string" || value["last_updated_at"].trim() === "") {
    return moduleMapError(relativePath, "field last_updated_at must be a non-empty string");
  }
  if (!isDomainGlossary(value["domain_glossary"])) {
    return moduleMapError(
      relativePath,
      "field domain_glossary must include preferred_terms, synonyms, and notes"
    );
  }
  if (!Array.isArray(value["modules"])) {
    return moduleMapError(relativePath, "field modules must be an array");
  }
  for (const [index, moduleEntry] of value["modules"].entries()) {
    const error = validateModuleMapEntry(moduleEntry, `modules[${index}]`);
    if (error) {
      return moduleMapError(relativePath, error);
    }
  }
  return null;
}
function validateModuleMapEntry(value, path) {
  if (!isPlainObject(value)) {
    return `${path} must be a mapping`;
  }
  const requiredFields = [
    "name",
    "slug",
    "auto_update_module_name",
    "derivation",
    "confidence",
    "source_paths",
    "evidence",
    "features"
  ];
  for (const field of requiredFields) {
    if (!(field in value)) {
      return `${path} is missing required field ${field}`;
    }
  }
  const scalarError = validateSharedMapFields(value, path, "auto_update_module_name");
  if (scalarError) {
    return scalarError;
  }
  if (!isEvidenceMap(value["evidence"])) {
    return `${path}.evidence must be a mapping with routes, tables, and/or symbols arrays`;
  }
  if (!Array.isArray(value["features"])) {
    return `${path}.features must be an array`;
  }
  for (const [index, feature] of value["features"].entries()) {
    const featureError = validateModuleFeatureEntry(feature, `${path}.features[${index}]`);
    if (featureError) {
      return featureError;
    }
  }
  return null;
}
function validateModuleFeatureEntry(value, path) {
  if (!isPlainObject(value)) {
    return `${path} must be a mapping`;
  }
  const requiredFields = [
    "name",
    "slug",
    "auto_update_feature_name",
    "derivation",
    "confidence",
    "source_paths"
  ];
  for (const field of requiredFields) {
    if (!(field in value)) {
      return `${path} is missing required field ${field}`;
    }
  }
  return validateSharedMapFields(value, path, "auto_update_feature_name");
}
function validateSharedMapFields(value, path, autoUpdateField) {
  if (typeof value["name"] !== "string" || value["name"].trim() === "") {
    return `${path}.name must be a non-empty string`;
  }
  if (typeof value["slug"] !== "string" || value["slug"].trim() === "") {
    return `${path}.slug must be a non-empty string`;
  }
  if (typeof value[autoUpdateField] !== "boolean") {
    return `${path}.${autoUpdateField} must be a boolean`;
  }
  if (!["user", "locked_manifest", "codebase_native", "inferred", "llm"].includes(
    String(value["derivation"])
  )) {
    return `${path}.derivation must be a valid derivation value`;
  }
  if (!["high", "medium", "low"].includes(String(value["confidence"]))) {
    return `${path}.confidence must be high, medium, or low`;
  }
  if (!isStringArray(value["source_paths"])) {
    return `${path}.source_paths must be an array of strings`;
  }
  return null;
}
function validateWorkflowYaml(value, relativePath) {
  const filename = relativePath.split("/").at(-1) ?? relativePath;
  if (isReservedWorkflowPolicyFile(filename)) {
    const validation2 = new SchemaValidator().validate("feature-development-policy", value);
    if (!validation2.valid) {
      return {
        detail: `Instruction workflow policy ${relativePath} is invalid`,
        remediation: "Fix the feature-development policy schema before completing the provider request."
      };
    }
    return null;
  }
  const template = value;
  const availableSkills = collectReferencedTemplateSkills(template);
  let validation;
  try {
    validation = new WorkflowTemplateValidator().validate(template, availableSkills);
  } catch {
    validation = { valid: false, errors: ["Template structure is invalid"] };
  }
  if (!validation.valid) {
    return {
      detail: `Instruction workflow template ${relativePath} is invalid`,
      remediation: "Fix the custom workflow template name, steps, skills, and failure directives before completing the provider request."
    };
  }
  return null;
}
function collectReferencedTemplateSkills(template) {
  const skills = /* @__PURE__ */ new Set();
  const steps = Array.isArray(template?.steps) ? template.steps : [];
  for (const step of steps) {
    if (isPlainObject(step) && Array.isArray(step["parallel"])) {
      for (const parallelStep of step["parallel"]) {
        if (isPlainObject(parallelStep) && typeof parallelStep["skill"] === "string") {
          skills.add(parallelStep["skill"]);
        }
      }
    } else if (isWorkflowStep(step) && typeof step.skill === "string") {
      skills.add(step.skill);
    }
  }
  return skills;
}
function isWorkflowStep(value) {
  return isPlainObject(value) && "skill" in value;
}
function moduleMapError(relativePath, reason2) {
  return {
    detail: `Instruction module map ${relativePath} ${reason2}`,
    remediation: "Fix the instruction rule module map contract before completing the provider request."
  };
}
function isDomainGlossary(value) {
  return isPlainObject(value) && isStringArray(value["preferred_terms"]) && isPlainObject(value["synonyms"]) && Object.values(value["synonyms"]).every((entry) => typeof entry === "string") && typeof value["notes"] === "string";
}
function isEvidenceMap(value) {
  if (!isPlainObject(value)) {
    return false;
  }
  return ["routes", "tables", "symbols"].every(
    (field) => value[field] === void 0 || isStringArray(value[field])
  );
}
function isStringArray(value) {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// src/verification/gates/module-docs-structure.ts
init_esm_shims();
import { existsSync as existsSync11, readdirSync as readdirSync2 } from "fs";
import { readFile as readFile5 } from "fs/promises";
import { join as join16 } from "path";
var REQUIRED_FEATURE_DOCS = ["business.md", "technical.md", "api.md"];
var ModuleDocsStructureGate = class {
  gate = "module-docs-structure";
  async check(context) {
    const changedFiles = context.changed_files.map(normalizePath5);
    const legacyPath = changedFiles.find((filePath) => isUnderPath2(filePath, "docs/module/"));
    if (legacyPath) {
      return createFail(
        this.gate,
        `Invalid module documentation path ${legacyPath}; use docs/modules/`,
        "Move feature documentation under docs/modules/{module}/features/{feature}/ before completing the provider request."
      );
    }
    const moduleDocPaths = changedFiles.filter(
      (filePath) => isUnderPath2(filePath, "docs/modules/")
    );
    if (moduleDocPaths.length === 0) {
      return createNotRequired(this.gate, "Not required: no module doc changed.");
    }
    const scopedPaths = hasPreexistingFlatFeatureDocs(context.project_root, new Set(changedFiles)) ? moduleDocPaths.filter((filePath) => !isFlatFeatureDoc(filePath)) : moduleDocPaths;
    const invalidFeatureDoc = scopedPaths.find((filePath) => isInvalidFeatureDocPath(filePath));
    if (invalidFeatureDoc) {
      return createFail(
        this.gate,
        `Feature documentation path ${invalidFeatureDoc} is outside docs/modules/{module}/features/{feature}/`,
        "Place feature documentation under docs/modules/{module}/features/{feature}/ with business.md, technical.md, and api.md."
      );
    }
    const scopes = collectTouchedFeatureScopes(scopedPaths);
    if (scopes.length === 0) {
      return createNotRequired(
        this.gate,
        "Not required: no module feature doc changed (only other module docs)."
      );
    }
    for (const scope of scopes) {
      for (const filename of REQUIRED_FEATURE_DOCS) {
        const relativePath = `docs/modules/${scope.module}/features/${scope.feature}/${filename}`;
        const absolutePath = join16(context.project_root, ...relativePath.split("/"));
        if (!existsSync11(absolutePath)) {
          return createFail(
            this.gate,
            `Missing ${relativePath}`,
            `Create the missing feature-level ${formatDocKind(filename)} documentation file before completing the provider request.`
          );
        }
        const markdown = await readFile5(absolutePath, "utf8");
        if (markdown.trim().length === 0) {
          return createFail(
            this.gate,
            `Required documentation file ${relativePath} is empty`,
            "Add non-empty markdown content before completing the provider request."
          );
        }
        if (!hasMarkdownHeading2(markdown)) {
          return createFail(
            this.gate,
            `Required documentation file ${relativePath} does not contain a heading`,
            "Add at least one markdown heading before completing the provider request."
          );
        }
      }
    }
    return createPass(this.gate, "Module feature documentation structure is valid");
  }
};
function normalizePath5(filePath) {
  return filePath.replaceAll("\\", "/").replace(/^\.?\//, "");
}
function isUnderPath2(filePath, prefix) {
  return filePath === prefix.slice(0, -1) || filePath.startsWith(prefix);
}
function isFlatFeatureDoc(filePath) {
  const segments = filePath.split("/");
  return segments.length === 5 && segments[0] === "docs" && segments[1] === "modules" && segments[2].length > 0 && segments[3] === "features" && segments[4].length > ".md".length && segments[4].endsWith(".md");
}
function hasPreexistingFlatFeatureDocs(projectRoot, changedSet) {
  const modulesRoot = join16(projectRoot, "docs", "modules");
  if (!existsSync11(modulesRoot)) {
    return false;
  }
  let moduleEntries;
  try {
    moduleEntries = readdirSync2(modulesRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch {
    return false;
  }
  for (const moduleName of moduleEntries) {
    const featuresDir = join16(modulesRoot, moduleName, "features");
    let featureEntries;
    try {
      featureEntries = readdirSync2(featuresDir, { withFileTypes: true }).filter((entry) => entry.isFile() && entry.name.endsWith(".md")).map((entry) => entry.name);
    } catch {
      continue;
    }
    for (const filename of featureEntries) {
      const relativePath = `docs/modules/${moduleName}/features/${filename}`;
      if (!changedSet.has(relativePath)) {
        return true;
      }
    }
  }
  return false;
}
function isInvalidFeatureDocPath(filePath) {
  if (!filePath.endsWith(".md")) {
    return false;
  }
  const segments = filePath.split("/");
  const featuresIndex = segments.indexOf("features");
  if (featuresIndex === -1) {
    return false;
  }
  return segments.length !== 6 || segments[0] !== "docs" || segments[1] !== "modules" || segments[3] !== "features" || segments[2].length === 0 || segments[4].length === 0 || !REQUIRED_FEATURE_DOCS.includes(segments[5]);
}
function collectTouchedFeatureScopes(filePaths) {
  const scopeKeys = /* @__PURE__ */ new Set();
  const scopes = [];
  for (const filePath of filePaths) {
    const segments = filePath.split("/");
    if (segments.length === 6 && segments[0] === "docs" && segments[1] === "modules" && segments[3] === "features" && REQUIRED_FEATURE_DOCS.includes(segments[5])) {
      const scope = { module: segments[2], feature: segments[4] };
      const key = `${scope.module}/${scope.feature}`;
      if (!scopeKeys.has(key)) {
        scopeKeys.add(key);
        scopes.push(scope);
      }
    }
  }
  return scopes;
}
function hasMarkdownHeading2(markdown) {
  return markdown.split(/\r?\n/u).some((line) => /^#{1,6}\s+\S/u.test(line.trim()));
}
function formatDocKind(filename) {
  return filename.replace(".md", "");
}

// src/verification/gates/mutation-testing.ts
init_esm_shims();
var MUTATION_OFF_DETAIL = "Mutation testing is off (mutation_mode is off).";
var SKIP_READING = {
  "fast-lane": {
    kind: "not-required",
    words: "Mutation testing is not required on the fast lane."
  },
  "no-changed-code": {
    kind: "not-required",
    words: "Mutation testing is not required: no code changed."
  },
  "tests-not-green": {
    kind: "did-not-run",
    words: "Mutation testing did not run: the test command was not green to begin with.",
    remediation: "Make the test command pass, then run verification again."
  },
  "no-test-command": {
    kind: "did-not-run",
    words: "Mutation testing did not run: no test command is configured, so nothing proved the suite green first.",
    remediation: "Set commands.test in .paqad/project-profile.yaml to the project test command, or set mutation_mode=off."
  },
  "tool-not-configured": {
    kind: "did-not-run",
    words: "Mutation testing did not run: no mutation tool is configured for this stack.",
    remediation: "Install the mutation tool for this stack in the project, or set mutation_mode=off."
  },
  "run-failed": {
    kind: "did-not-run",
    words: "Mutation testing did not run: the mutation tool failed before it produced a result.",
    remediation: "Check the mutation tool output, fix what stopped it, and run verification again."
  }
};
function summarizeSurvivors(result) {
  const shown = result.surviving_mutants.slice(0, 5).map((mutant) => `${mutant.file}:${mutant.line} (${mutant.operator})`).join(", ");
  const extra = result.surviving_mutants.length > 5 ? `, +${result.surviving_mutants.length - 5} more` : "";
  return `${shown}${extra}`;
}
var MutationTestingGate = class {
  gate = "mutation-testing";
  async check(context) {
    const result = context.mutation_result;
    if (!result) {
      return createNotRequired(this.gate, context.mutation_note ?? MUTATION_OFF_DETAIL);
    }
    if (result.status === "skipped") {
      const reading = result.skipped_reason ? SKIP_READING[result.skipped_reason] : void 0;
      if (!reading) {
        return createDidNotRun(
          this.gate,
          `Mutation testing did not run (${result.skipped_reason ?? "no reason recorded"}).`
        );
      }
      return reading.kind === "not-required" ? createNotRequired(this.gate, reading.words) : createDidNotRun(this.gate, reading.words, reading.remediation);
    }
    if (result.status === "unsafe-tree") {
      return createFail(
        this.gate,
        `Working tree was not clean after the mutation run (${result.tool ?? "mutation tool"}); a mutant may have been left behind.`,
        "Restore the tree to a clean state and re-run; mutation must always be fully reverted."
      );
    }
    const killRate = result.kill_rate === null ? "n/a" : `${result.kill_rate}%`;
    const counts = `killed ${result.killed}, survived ${result.survived}, set-aside ${result.equivalent_set_aside}`;
    if (result.status === "lower-confidence") {
      return createInconclusive(
        this.gate,
        `Mutation result is lower-confidence (${result.tool ?? result.language ?? "best-available tool"}); kill rate ${killRate} (${counts}).`,
        "Treat this score as indicative only; a mature mutation tool is not available for this language."
      );
    }
    if (result.status === "survivors") {
      const detail = `${result.survived} behaviour-changing mutant(s) survived (kill rate ${killRate}): ${summarizeSurvivors(result)}.`;
      const remediation = "Strengthen the tests so each surviving mutant is caught, or confirm any genuinely equivalent.";
      return context.mutation_strict ? createFail(this.gate, detail, remediation) : createInconclusive(this.gate, detail, remediation);
    }
    return createPass(
      this.gate,
      `Every behaviour-changing mutant was killed (kill rate ${killRate}; ${counts}).`
    );
  }
};

// src/verification/gates/quality-ratchet.ts
init_esm_shims();
function summarizeRegressions(result) {
  const shown = result.blocking_regressions.slice(0, 5).map((r) => `${r.measure}@${r.module} ${r.baseline_value ?? "n/a"}\u2192${r.current_value ?? "n/a"}`).join(", ");
  const extra = result.blocking_regressions.length > 5 ? `, +${result.blocking_regressions.length - 5} more` : "";
  return `${shown}${extra}`;
}
function measureWords(measure) {
  return measure.replace(/_/g, " ");
}
function ratchetMeasureScope(result) {
  const taken = /* @__PURE__ */ new Set();
  const blocked = /* @__PURE__ */ new Set();
  for (const verdict of result.verdicts) {
    const words = measureWords(verdict.measure);
    if (verdict.outcome === "blocked" || verdict.current_value === null) blocked.add(words);
    else taken.add(words);
  }
  return { taken: [...taken], blocked: [...blocked] };
}
function scopeNote(result, scope) {
  const blocked = scope.blocked.length > 0 ? `; blocked: ${scope.blocked.join(", ")}` : "";
  if (result.lane === "fast") return ` (fast lane, strictness only${blocked})`;
  return ` (measured: ${scope.taken.join(", ")}${blocked})`;
}
var QualityRatchetGate = class {
  gate = "quality-ratchet";
  async check(context) {
    const result = context.quality_ratchet_result;
    if (!result) {
      return createDidNotRun(
        this.gate,
        "Quality ratchet did not run, so no quality measure was compared."
      );
    }
    if (result.status === "skipped") {
      return createDidNotRun(
        this.gate,
        `Quality ratchet did not run (${result.skipped_reason ?? "no measures to evaluate"}).`
      );
    }
    if (result.status === "regressed") {
      const excepted2 = result.excepted_regressions.length > 0 ? ` (${result.excepted_regressions.length} approved exception(s) allowed)` : "";
      return createFail(
        this.gate,
        `${result.blocking_regressions.length} quality measure(s) worsened against the baseline${excepted2}: ${summarizeRegressions(result)}.`,
        "Bring each measure back to at least its recorded level, or open a quality.ratchet_exception pause to approve a legitimate regression."
      );
    }
    const scope = ratchetMeasureScope(result);
    if (scope.taken.length === 0) {
      const blocked = scope.blocked.length > 0 ? ` (blocked: ${scope.blocked.join(", ")})` : "";
      return createDidNotRun(
        this.gate,
        `Quality ratchet did not run: no quality measure could be taken${blocked}.`,
        "Wire the tool each blocked measure reads (for example a tsconfig for strictness) so the ratchet can compare it."
      );
    }
    if (result.status === "captured") {
      return createPass(
        this.gate,
        `Quality baseline captured at today's level${scopeNote(result, scope)}; nothing to compare yet.`
      );
    }
    const tightened = result.tightened.length > 0 ? `; ${result.tightened.length} measure(s) tightened` : "";
    const excepted = result.excepted_regressions.length > 0 ? `; ${result.excepted_regressions.length} approved exception(s)` : "";
    return createPass(
      this.gate,
      `Every quality measure held equal or better${scopeNote(result, scope)}${tightened}${excepted}.`
    );
  }
};

// src/verification/gates/requirement-completeness.ts
init_esm_shims();
var RequirementCompletenessGate = class {
  gate = "requirement-completeness";
  async check(context) {
    return checkBooleanGate(
      this.gate,
      context.requirements_complete,
      "Requirements are complete",
      "Requirements are incomplete",
      "Complete the missing requirements before proceeding."
    );
  }
};

// src/verification/gates/site-map-freshness.ts
init_esm_shims();

// src/site-map/freshness.ts
init_esm_shims();

// src/site-map/verification.ts
init_esm_shims();
var NAVIGATIONAL_KINDS = /* @__PURE__ */ new Set([
  "page",
  "screen",
  "modal",
  "router",
  "prompt-entry",
  "llm-workflow",
  "step",
  "subflow"
]);
function normalizeEvidence(ref) {
  if (ref === void 0) return [];
  return Array.isArray(ref) ? ref : [ref];
}
function buildStatusOf(resolutions) {
  const status = /* @__PURE__ */ new Map();
  for (const resolution of resolutions) {
    status.set(evidenceKey({ file: resolution.file, line: resolution.line }), resolution.status);
  }
  return (pointer) => status.get(evidenceKey(pointer)) ?? "resolved";
}
function asList(ref) {
  if (ref === void 0) return [];
  return Array.isArray(ref) ? ref : [ref];
}
function evidenceKey(pointer) {
  return `${pointer.file}\0${pointer.line ?? ""}`;
}
function locate(pointer) {
  return pointer.line === void 0 ? pointer.file : `${pointer.file}:${pointer.line}`;
}
function collectMapEvidence(map) {
  if (map === null) return [];
  const byKey = /* @__PURE__ */ new Map();
  const add = (ref) => {
    for (const pointer of normalizeEvidence(ref)) {
      const key = evidenceKey(pointer);
      if (!byKey.has(key)) byKey.set(key, pointer);
    }
  };
  for (const surface of map.surfaces) {
    add(surface.evidence);
    for (const transition of surface.transitions ?? []) add(transition.evidence);
  }
  for (const guard of map.guards ?? []) add(guard.evidence);
  return [...byKey.values()];
}
function isBackstage(surface, areaById) {
  if (surface.visibility !== void 0) return surface.visibility === "backstage";
  const area = surface.area === void 0 ? void 0 : areaById.get(surface.area);
  return area?.visibility === "backstage";
}
function isGuarded(surface, areaById) {
  if (asList(surface.guard).length > 0) return true;
  const area = surface.area === void 0 ? void 0 : areaById.get(surface.area);
  return asList(area?.guard).length > 0;
}
function hasTerminalMarker(surface) {
  const ends = surface.ends;
  if (ends === void 0) return false;
  return Boolean(ends.success) || Boolean(ends.failure) || Boolean(ends.abandoned);
}
function detectEvidenceFindings(map, resolutions) {
  const statusOf = buildStatusOf(resolutions);
  const candidates = [];
  for (const surface of map.surfaces) {
    const pointers = normalizeEvidence(surface.evidence);
    if (pointers.length === 0) continue;
    const broken = pointers.filter((pointer) => statusOf(pointer) !== "resolved");
    if (broken.length === 0) continue;
    const files = [...new Set(broken.map((pointer) => pointer.file))].sort();
    if (broken.length === pointers.length && broken.every((p) => statusOf(p) === "file-missing")) {
      candidates.push({
        title: `Removed surface: ${surface.label}`,
        description: `The ${surface.kind} "${surface.label}" is on the map, but every file it cites is gone from the tree, so the map describes code that no longer exists.`,
        category: "SM-REMOVE",
        severity: "high",
        tier: "deterministic",
        confidence: 1,
        evidence: broken.map(
          (pointer) => `app-map.yaml surface "${surface.id}" cites ${pointer.file} \u2014 file not found`
        ),
        resolution: `Remove surface "${surface.id}" from ${PATHS.SITE_MAP_CANONICAL_APP_MAP}, or point its evidence at the code that replaced it.`,
        affected_surfaces: [surface.id],
        affected_files: files,
        baseline_status: "unknown",
        status: "open"
      });
      continue;
    }
    candidates.push(
      evidenceDefect(
        `surface "${surface.id}"`,
        `surface "${surface.label}"`,
        surface.id,
        broken,
        (pointer) => `app-map.yaml surface "${surface.id}" cites ${locate(pointer)} \u2014 ${reason(statusOf(pointer))}`
      )
    );
  }
  for (const guard of map.guards ?? []) {
    const broken = normalizeEvidence(guard.evidence).filter((p) => statusOf(p) !== "resolved");
    if (broken.length === 0) continue;
    candidates.push(
      evidenceDefect(
        `guard "${guard.id}"`,
        `guard "${guard.label}"`,
        void 0,
        broken,
        (pointer) => `app-map.yaml guard "${guard.id}" cites ${locate(pointer)} \u2014 ${reason(statusOf(pointer))}`
      )
    );
  }
  for (const surface of map.surfaces) {
    for (const transition of surface.transitions ?? []) {
      const broken = normalizeEvidence(transition.evidence).filter(
        (p) => statusOf(p) !== "resolved"
      );
      if (broken.length === 0) continue;
      candidates.push(
        evidenceDefect(
          `transition ${surface.id} \u2192 ${transition.to}`,
          `the transition from "${surface.id}" to "${transition.to}"`,
          surface.id,
          broken,
          (pointer) => `app-map.yaml transition ${surface.id} \u2192 ${transition.to} cites ${locate(pointer)} \u2014 ${reason(statusOf(pointer))}`
        )
      );
    }
  }
  return candidates;
}
function reason(status) {
  return status === "file-missing" ? "file not found" : "line out of range";
}
function evidenceDefect(ownerId, ownerPhrase, affectedSurface, broken, proof) {
  const files = [...new Set(broken.map((pointer) => pointer.file))].sort();
  return {
    title: `Stale evidence on ${ownerId}`,
    description: `The evidence for ${ownerPhrase} no longer resolves in the tree, so the map cites code that has moved or been deleted and can no longer be trusted as proof.`,
    category: "SM-EVIDENCE",
    severity: "medium",
    tier: "deterministic",
    confidence: 1,
    evidence: broken.map(proof),
    resolution: `Re-anchor the evidence for ${ownerPhrase} to its current file:line, or remove the stale pointer, in ${PATHS.SITE_MAP_CANONICAL_APP_MAP}.`,
    affected_surfaces: affectedSurface === void 0 ? [] : [affectedSurface],
    affected_files: files,
    baseline_status: "unknown",
    status: "open"
  };
}
function detectDanglingReferences(map) {
  const surfaceIds = new Set(map.surfaces.map((surface) => surface.id));
  const guardIds = new Set((map.guards ?? []).map((guard) => guard.id));
  const candidates = [];
  const guardRef = (refs, ownerId, ownerPhrase, affectedSurface) => {
    for (const id of refs.flatMap(asList)) {
      if (guardIds.has(id)) continue;
      candidates.push({
        title: `Undefined guard "${id}" referenced by ${ownerId}`,
        description: `${ownerPhrase} requires guard "${id}", but no guard with that id is defined, so the map claims a protection that does not exist.`,
        category: "SM-XREF",
        severity: "high",
        tier: "deterministic",
        confidence: 1,
        evidence: [`app-map.yaml \u2014 ${ownerId} references guard "${id}" (not in guards)`],
        resolution: `Define a guard with id "${id}" in ${PATHS.SITE_MAP_CANONICAL_APP_MAP}, or correct the reference on ${ownerId}.`,
        affected_surfaces: affectedSurface === void 0 ? [] : [affectedSurface],
        affected_files: [],
        baseline_status: "unknown",
        status: "open"
      });
    }
  };
  for (const surface of map.surfaces) {
    guardRef(
      [surface.guard, surface.guard_not],
      `surface "${surface.id}"`,
      `Surface "${surface.label}"`,
      surface.id
    );
    for (const transition of surface.transitions ?? []) {
      if (!surfaceIds.has(transition.to)) {
        candidates.push({
          title: `Dangling transition: ${surface.id} \u2192 ${transition.to}`,
          description: `Surface "${surface.id}" has a "${transition.trigger}" transition to "${transition.to}", but no surface with that id exists, so the path leads nowhere.`,
          category: "SM-XREF",
          severity: "high",
          tier: "deterministic",
          confidence: 1,
          evidence: [
            `app-map.yaml \u2014 transition ${surface.id} \u2192 ${transition.to} (no such surface)`
          ],
          resolution: `Add a surface with id "${transition.to}" to ${PATHS.SITE_MAP_CANONICAL_APP_MAP}, or repoint the "${transition.trigger}" transition on "${surface.id}" at an existing surface.`,
          affected_surfaces: [surface.id],
          affected_files: [],
          baseline_status: "unknown",
          status: "open"
        });
      }
      guardRef(
        [transition.guard, transition.guard_not],
        `transition ${surface.id} \u2192 ${transition.to}`,
        `The transition from "${surface.id}" to "${transition.to}"`,
        surface.id
      );
    }
  }
  for (const area of map.areas ?? []) {
    guardRef([area.guard], `area "${area.id}"`, `Area "${area.label}"`, void 0);
  }
  for (const actor of map.actors ?? []) {
    guardRef([actor.satisfies], `actor "${actor.id}"`, `Actor "${actor.label}"`, void 0);
  }
  return candidates;
}
function reachableFrom(roots, surfaces) {
  const surfaceIds = new Set(surfaces.map((surface) => surface.id));
  const outgoing = /* @__PURE__ */ new Map();
  for (const surface of surfaces) {
    outgoing.set(
      surface.id,
      (surface.transitions ?? []).map((transition) => transition.to).filter((to) => surfaceIds.has(to))
    );
  }
  const reached = /* @__PURE__ */ new Set();
  const queue = [...roots];
  while (queue.length > 0) {
    const id = queue.shift();
    if (reached.has(id)) continue;
    reached.add(id);
    for (const next of outgoing.get(id)) queue.push(next);
  }
  return reached;
}
function detectGraphInvariants(map) {
  const candidates = [];
  const blocked = [];
  const areaById = new Map((map.areas ?? []).map((area) => [area.id, area]));
  const hasGraph = map.surfaces.some((surface) => (surface.transitions?.length ?? 0) > 0);
  if (hasGraph) {
    const roots = map.surfaces.filter((surface) => surface.entry !== void 0).map((s) => s.id);
    if (roots.length === 0) {
      blocked.push({
        check: "reachability",
        reason: "the map models transitions but marks no entry surface, so the graph has no root",
        install_hint: `Mark at least one surface with an \`entry:\` block in ${PATHS.SITE_MAP_CANONICAL_APP_MAP} so reachability can be computed.`
      });
    } else {
      const reached = reachableFrom(roots, map.surfaces);
      for (const surface of map.surfaces) {
        if (reached.has(surface.id)) continue;
        candidates.push({
          title: `Orphan surface: ${surface.label}`,
          description: `The ${surface.kind} "${surface.label}" cannot be reached from any entry surface, so no user path leads to it \u2014 it is either dead code or an unmapped transition.`,
          category: "SM-ORPHAN",
          severity: "medium",
          tier: "deterministic",
          confidence: 1,
          evidence: [`app-map.yaml \u2014 surface "${surface.id}" is unreachable from every entry`],
          resolution: `Add a transition that reaches "${surface.id}", give it its own \`entry:\`, or remove it from ${PATHS.SITE_MAP_CANONICAL_APP_MAP}.`,
          affected_surfaces: [surface.id],
          affected_files: [],
          baseline_status: "unknown",
          status: "open"
        });
      }
    }
    for (const surface of map.surfaces) {
      if (!NAVIGATIONAL_KINDS.has(surface.kind)) continue;
      if (hasTerminalMarker(surface)) continue;
      if ((surface.transitions?.length ?? 0) > 0) continue;
      candidates.push({
        title: `Dead-end surface: ${surface.label}`,
        description: `The ${surface.kind} "${surface.label}" has no outgoing transition and is not marked terminal, so a user who reaches it has no modelled way to leave.`,
        category: "SM-DEADEND",
        severity: "low",
        tier: "deterministic",
        confidence: 1,
        evidence: [
          `app-map.yaml \u2014 surface "${surface.id}" has no outgoing transition and no \`ends\``
        ],
        resolution: `Add an outgoing transition to "${surface.id}", or mark it terminal with an \`ends:\` block, in ${PATHS.SITE_MAP_CANONICAL_APP_MAP}.`,
        affected_surfaces: [surface.id],
        affected_files: [],
        baseline_status: "unknown",
        status: "open"
      });
    }
  } else {
    blocked.push({
      check: "reachability",
      reason: "the map records no navigation between screens, so reachability and dead ends cannot be checked",
      install_hint: `Record transitions between surfaces in ${PATHS.SITE_MAP_CANONICAL_APP_MAP} so reachability and dead ends can be checked.`
    });
  }
  for (const surface of map.surfaces) {
    if (!isBackstage(surface, areaById)) continue;
    if (isGuarded(surface, areaById)) continue;
    candidates.push({
      title: `Unguarded sensitive surface: ${surface.label}`,
      description: `The backstage ${surface.kind} "${surface.label}" carries no guard, so the map shows a sensitive surface with nothing gating access to it.`,
      category: "SM-GUARDLESS",
      severity: "high",
      tier: "deterministic",
      confidence: 1,
      evidence: [`app-map.yaml \u2014 backstage surface "${surface.id}" has no guard`],
      resolution: `Add a \`guard:\` to surface "${surface.id}" (or to its area) in ${PATHS.SITE_MAP_CANONICAL_APP_MAP}, or reclassify it as frontstage if it is not sensitive.`,
      affected_surfaces: [surface.id],
      affected_files: [],
      baseline_status: "unknown",
      status: "open"
    });
  }
  return { candidates, blocked };
}
function collectVerificationFindings(map, resolutions) {
  if (map === null) {
    return {
      candidates: [],
      blockedChecks: [
        {
          check: "map-present",
          reason: `no site map has been authored at ${PATHS.SITE_MAP_CANONICAL_APP_MAP} yet, so there is nothing to check the code against`,
          install_hint: `Author the site map at ${PATHS.SITE_MAP_CANONICAL_APP_MAP} (one surface entry per page, screen, or command), then run the site-map workflow to verify it.`
        }
      ]
    };
  }
  const graph = detectGraphInvariants(map);
  return {
    candidates: [
      ...detectEvidenceFindings(map, resolutions),
      ...detectDanglingReferences(map),
      ...graph.candidates
    ],
    blockedChecks: graph.blocked
  };
}

// src/site-map/freshness.ts
function deriveMapFreshness(map, resolutions) {
  const anchors = collectMapEvidence(map);
  const statusOf = buildStatusOf(resolutions);
  const anchors_total = anchors.length;
  const anchors_broken = anchors.filter((anchor) => statusOf(anchor) !== "resolved").length;
  return {
    anchors_total,
    anchors_resolved: anchors_total - anchors_broken,
    anchors_broken
  };
}
function sameFreshness(a, b) {
  return a !== void 0 && a.anchors_total === b.anchors_total && a.anchors_resolved === b.anchors_resolved && a.anchors_broken === b.anchors_broken;
}
function stampMapFreshness(map, freshness) {
  if (sameFreshness(map.app.freshness, freshness)) return { map, changed: false };
  return { map: { ...map, app: { ...map.app, freshness } }, changed: true };
}
function isStale(freshness) {
  return freshness.anchors_broken > 0;
}

// src/verification/gates/site-map-freshness.ts
var REFRESH_REMEDIATION = "Hit Run on the Site map area of `paqad-ai dashboard` to refresh the map before treating the change as complete.";
var SiteMapFreshnessGate = class {
  gate = "site-map-freshness";
  async check(context) {
    if (!resolveFrameworkConfig(context.project_root).features.site_map) {
      return createPass(this.gate, "Site map capability is off");
    }
    if (!context.code_changed) {
      return createPass(this.gate, "No code change to drift the site map");
    }
    const storedMap = readCanonicalSiteMap(context.project_root);
    const freshness = storedMap?.app.freshness;
    if (freshness !== void 0 && isStale(freshness)) {
      return createFail(
        this.gate,
        `Site map has drifted from code: ${freshness.anchors_broken} of ${freshness.anchors_total} cited anchors no longer resolve`,
        REFRESH_REMEDIATION
      );
    }
    return createPass(this.gate, "Site map is current");
  }
};

// src/verification/gates/spec-review.ts
init_esm_shims();
var SpecReviewGate = class {
  gate = "spec-review";
  async check(context) {
    return checkBooleanGate(
      this.gate,
      context.spec_review_passed,
      "Spec review passed",
      "Spec review failed",
      "Resolve outstanding specification review findings."
    );
  }
};

// src/verification/gates/story-quality.ts
init_esm_shims();
var StoryQualityGate = class {
  gate = "story-quality";
  async check(context) {
    return checkBooleanGate(
      this.gate,
      context.story_quality_passed,
      "Stories meet quality requirements",
      "Story quality checks failed",
      "Refine the story breakdown and acceptance criteria."
    );
  }
};

// src/verification/gate-runner.ts
var DEFAULT_GATE_CODES = [
  "change-completeness",
  "requirement-completeness",
  "story-quality",
  "ac-test-mapping",
  "spec-review",
  "architecture-compliance",
  "code-tests-lint",
  "implementation-review",
  "behavioral-correctness",
  "mutation-testing",
  "quality-ratchet",
  "database-quality",
  "module-docs-structure",
  "instructions-docs-structure",
  "documentation-freshness",
  "site-map-freshness",
  "extension-surface"
];
var VerificationGateRunner = class {
  constructor(gates = defaultGates()) {
    this.gates = gates;
  }
  gates;
  async run(context) {
    const results = [];
    let firstFailure = null;
    for (const gate of this.gates) {
      if (firstFailure && !shouldRunAfterFailure(gate, context)) {
        continue;
      }
      const result = await gate.check(context);
      results.push(result);
      if (!result.passed && firstFailure === null) {
        firstFailure = result;
      }
    }
    return results;
  }
  async runWithDelta(context, baselineResults, escalationInput = {}) {
    const results = await this.run(context);
    return {
      results,
      delta_payload: buildVerificationGateDeltaPayload(baselineResults, results, escalationInput)
    };
  }
};
function shouldRunAfterFailure(gate, context) {
  if (gate.gate === "module-docs-structure") {
    return context.changed_files.some((filePath) => {
      const normalized = normalizePath6(filePath);
      return normalized.startsWith("docs/modules/") || normalized.startsWith("docs/module/");
    });
  }
  if (gate.gate === "instructions-docs-structure") {
    return context.changed_files.some((filePath) => {
      const normalized = normalizePath6(filePath);
      return normalized.startsWith("docs/instructions/") || normalized.startsWith("docs/instruction/") || normalized.startsWith("docs/instruction-docs/") || normalized.startsWith("docs/instructions-docs/");
    });
  }
  if (gate.gate === "site-map-freshness") {
    return context.changed_files.some(
      (filePath) => normalizePath6(filePath).startsWith("docs/site-map/")
    );
  }
  return false;
}
function normalizePath6(filePath) {
  return filePath.replaceAll("\\", "/").replace(/^\.?\//, "");
}
function defaultGates() {
  return [
    new ChangeCompletenessGate(),
    new RequirementCompletenessGate(),
    new StoryQualityGate(),
    new AcTestMappingGate(),
    new SpecReviewGate(),
    new ArchitectureComplianceGate(),
    new CodeTestsLintGate(),
    new ImplementationReviewGate(),
    new BehavioralCorrectnessGate(),
    new MutationTestingGate(),
    new QualityRatchetGate(),
    new DatabaseQualityGate(),
    new ModuleDocsStructureGate(),
    new InstructionsDocsStructureGate(),
    new DocumentationFreshnessGate(),
    new SiteMapFreshnessGate(),
    new ExtensionSurfaceGate()
  ];
}

// src/hud/change-scope.ts
init_esm_shims();
var GATE_JUDGED_AFTER = {
  "spec-review": "specification",
  "requirement-completeness": "specification",
  "story-quality": "specification",
  "change-completeness": "development",
  "architecture-compliance": "development",
  "database-quality": "development",
  duplication: "development",
  "extension-surface": "development",
  "fix-proof": "development",
  "implementation-review": "review",
  "code-tests-lint": "checks",
  "behavioral-correctness": "checks",
  "mutation-testing": "checks",
  "quality-ratchet": "checks",
  "ac-test-mapping": "checks",
  "documentation-freshness": "documentation_sync",
  "module-docs-structure": "documentation_sync",
  "instructions-docs-structure": "documentation_sync",
  "site-map-freshness": "documentation_sync"
};
var UNKNOWN_GATE_STAGE = "checks";
var EDIT_STAGES = /* @__PURE__ */ new Set(["development", "checks", "documentation_sync"]);
var STAGE_ROW_KINDS = /* @__PURE__ */ new Set(["stage_start", "stage_end"]);
var COMPLETE_END_STATUSES = /* @__PURE__ */ new Set(["completed", "inferred"]);
function qualifyHudChange(projectRoot, sessionId, now = () => /* @__PURE__ */ new Date()) {
  const workflow = readWorkflowState(projectRoot, sessionId);
  if (workflow.active?.workflow !== "feature-development") {
    return { dir: null, reason: "not-feature-route" };
  }
  const dir = currentFeature(projectRoot, sessionId, now);
  if (!dir || !isBundleMaterialized(projectRoot, dir)) {
    return { dir: null, reason: "no-active-change" };
  }
  const status = readFeatureRecord(projectRoot, dir)?.status;
  if (isBundleClosed(projectRoot, dir) || isFeatureFinished(status)) {
    return { dir: null, reason: "closed" };
  }
  const head = readHeadRef(projectRoot);
  const recorded = featureBranch(projectRoot, dir);
  if (head.detached || recorded !== null && recorded !== head.branch) {
    return { dir: null, reason: "other-branch" };
  }
  const start = episodeStart(readRouteTurns(projectRoot, sessionId), "feature-development") ?? workflow.turn_started_at ?? null;
  if (!sessionWroteInEpisode(projectRoot, sessionId, dir, start)) {
    return { dir: null, reason: "no-row-this-episode" };
  }
  return { dir, reason: "qualified" };
}
function rowTime(row) {
  return Date.parse(rowRecordedAt(row) ?? "");
}
function carriesEdit(row) {
  if (!STAGE_ROW_KINDS.has(String(row.kind)) || typeof row.stage !== "string") return false;
  if (EDIT_STAGES.has(row.stage)) return true;
  return row.stage === "specification" && typeof row.subject_digest === "string";
}
function latestEditAt(projectRoot, dirName) {
  let latest = null;
  for (const row of readFeatureStageUnit(projectRoot, dirName)) {
    if (!carriesEdit(row)) continue;
    const at = rowTime(row);
    if (!Number.isNaN(at) && (latest === null || at > latest)) latest = at;
  }
  return latest;
}
function stageEndTimes(projectRoot, dirName) {
  const ends = /* @__PURE__ */ new Map();
  for (const row of readFeatureStageUnit(projectRoot, dirName)) {
    if (row.kind !== "stage_end" || typeof row.stage !== "string") continue;
    if (!COMPLETE_END_STATUSES.has(String(row.event_status))) continue;
    const at = rowTime(row);
    if (!Number.isNaN(at)) ends.set(row.stage, Math.max(ends.get(row.stage) ?? at, at));
  }
  return ends;
}
function gateIsJudged(code, recordedAt, stageEnds) {
  const owner = GATE_JUDGED_AFTER[code] ?? UNKNOWN_GATE_STAGE;
  const endedAt = stageEnds.get(owner);
  if (endedAt === void 0) return false;
  const at = Date.parse(recordedAt ?? "");
  return !Number.isNaN(at) && at >= endedAt;
}

// src/hud/changed-files.ts
init_esm_shims();
import { execFileSync } from "child_process";
var GIT_READ_TIMEOUT_MS = 2e3;
var COMMIT_TIMES_LIMIT = 200;
var GIT_READ_MAX_BYTES = 16 * 1024 * 1024;
function gitRead(projectRoot, args) {
  return execFileSync("git", args, {
    cwd: projectRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
    timeout: GIT_READ_TIMEOUT_MS,
    maxBuffer: GIT_READ_MAX_BYTES
  }).split("\0").filter((entry) => entry.length > 0);
}
function readChangeGit(projectRoot, baseBranch, onError) {
  const base = readGitState(projectRoot, baseBranch ? { baseBranch } : {}).base_commit;
  if (!base) return null;
  try {
    const files = /* @__PURE__ */ new Set();
    for (const path of [
      ...gitRead(projectRoot, ["diff", "--name-only", "--relative", "-z", base]),
      ...gitRead(projectRoot, ["ls-files", "--others", "--exclude-standard", "-z"])
    ]) {
      if (!isPaqadArtifactPath(path)) files.add(path);
    }
    const commitTimes = /* @__PURE__ */ new Map();
    for (const entry of gitRead(projectRoot, [
      "log",
      "-z",
      `--max-count=${COMMIT_TIMES_LIMIT}`,
      "--format=%H %cI",
      `${base}..HEAD`
    ])) {
      const [sha, at] = entry.trim().split(" ");
      if (sha && at) commitTimes.set(sha, at);
    }
    return { files: [...files].sort(), commitTimes };
  } catch (error) {
    onError(error);
    return null;
  }
}

// src/hud/cost-view.ts
init_esm_shims();
function hudCostOf(record, live = false) {
  return {
    computed_at: record.computed_at,
    window: record.window,
    scope: record.scope ?? "whole-session",
    price_table_date: record.price_table_date,
    price_source: record.price_source,
    basis: record.basis,
    label: record.label,
    plan_note: record.plan_note,
    tokens: record.tokens,
    usd: record.usd,
    unpriced_models: record.unpriced_models,
    by_stage: record.by_stage,
    by_expert: record.by_expert,
    chief: record.chief,
    not_counted: record.not_counted,
    live
  };
}
function countFromCache(projectRoot, dirName, options) {
  try {
    const counted = computeChangeCost(projectRoot, dirName, { now: options.now });
    return counted && counted.sources > 0 && counted.tokens.total > 0 ? counted : null;
  } catch (error) {
    options.onError?.(error);
    return null;
  }
}
function buildHudCost(projectRoot, dirName, options = {}) {
  const running = options.turnRunning === true;
  const record = readChangeCost(projectRoot, dirName);
  if (record) return hudCostOf(record, running && !record.window.sealed);
  if (!running) return null;
  const counted = countFromCache(projectRoot, dirName, options);
  return counted ? hudCostOf(counted, true) : null;
}

// src/hud/high-table-view.ts
init_esm_shims();
import { readFileSync as readFileSync10 } from "fs";
import { join as join17 } from "path";
function readJsonFile(path) {
  try {
    return JSON.parse(readFileSync10(path, "utf8"));
  } catch {
    return null;
  }
}
function asRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : null;
}
function records(value) {
  return Array.isArray(value) ? value.map(asRecord).filter((entry) => entry !== null) : [];
}
function str2(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}
function num(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
function after(at, frozenAt) {
  if (at === null || frozenAt === null) return false;
  const time = Date.parse(at);
  return !Number.isNaN(time) && time > frozenAt;
}
function frozenAtOf(specJson) {
  const at = str2(asRecord(asRecord(specJson)?.frozen)?.frozen_at);
  if (at === null) return null;
  const time = Date.parse(at);
  return Number.isNaN(time) ? null : time;
}
function seatFrom(role, entry, folded, recordedFindings, frozenAt) {
  const tokensUsed = num(entry?.tokens_used);
  const fallbackState = tokensUsed !== null || (recordedFindings ?? 0) > 0 ? "done" : "seated";
  const exact = folded?.tokens ?? null;
  return {
    role,
    reason: folded?.reason ?? str2(entry?.reason),
    origin: folded?.origin ?? str2(entry?.origin),
    state: folded?.state ?? fallbackState,
    seated_at: folded?.seated_at ?? null,
    started_at: folded?.started_at ?? null,
    done_at: folded?.done_at ?? null,
    budget_tokens: folded?.budget_tokens ?? num(entry?.budget_tokens),
    clamped: folded?.clamped ?? null,
    tokens_estimate: folded?.tokens_estimate ?? tokensUsed,
    tokens: exact ? {
      input: exact.input,
      output: exact.output,
      cache_read: exact.cache_read,
      cache_write: exact.cache_write,
      total: exact.total
    } : null,
    tokens_exact: exact !== null,
    findings: folded?.findings ?? recordedFindings,
    late: after(folded?.done_at ?? null, frozenAt),
    track_record: null
  };
}
function rulingsFrom(synthesis) {
  return {
    accepted: Array.isArray(synthesis.accepted) ? synthesis.accepted.filter((id) => typeof id === "string") : [],
    declined: records(synthesis.declined).map((entry) => ({
      id: str2(entry.id) ?? "",
      reason: str2(entry.reason) ?? ""
    })),
    conflicts: records(synthesis.conflicts).map((entry) => ({
      target: str2(entry.target) ?? "",
      recommendation: str2(entry.recommendation) ?? "",
      rationale: str2(entry.rationale) ?? ""
    })),
    renames: records(synthesis.renames).map((entry) => ({
      id: str2(entry.id) ?? "",
      target: str2(entry.target) ?? ""
    })),
    settled: records(synthesis.auto_resolved).map((entry) => ({
      target: str2(entry.target) ?? "",
      chosen: str2(entry.chosen) ?? "",
      source: str2(entry.source) ?? ""
    }))
  };
}
function chiefFrom(folded, synthesis, frozenAt) {
  if (!folded && !synthesis) return null;
  const seat = seatFrom(CHIEF_ROLE, null, folded, null, frozenAt);
  return {
    ...seat,
    state: synthesis ? "done" : seat.state,
    tokens_estimate: seat.tokens_estimate ?? num(synthesis?.tokens),
    findings: null,
    verdict: str2(synthesis?.verdict)
  };
}
function gapsFrom(synthesis) {
  return records(synthesis?.gaps).map((gap) => ({
    area: str2(gap.area) ?? "",
    why_it_matters: str2(gap.why_it_matters) ?? "",
    question: str2(asRecord(gap.question)?.business_text)
  }));
}
function questionsFrom(projectRoot, dirName) {
  const clarification = asRecord(
    readJsonFile(join17(projectRoot, featureFilePath(dirName, "clarification")))
  );
  const questions = asRecord(clarification?.questions);
  if (!questions) return null;
  const counts = asRecord(questions.counts);
  return {
    asked: num(counts?.asked) ?? (Array.isArray(questions.asked) ? questions.asked.length : 0),
    auto_answered: records(questions.auto_answered).map((entry) => ({
      question: str2(entry.question) ?? "",
      source: str2(entry.source) ?? ""
    }))
  };
}
var EXPERT_SOURCE = /^EX-(.+)-\d+$/;
function creditsFrom(specJson) {
  const trace = asRecord(asRecord(specJson)?.trace);
  if (!trace) return [];
  const credits = [];
  for (const [line, source] of Object.entries(trace)) {
    const roles = (typeof source === "string" ? source.split(/[,\s]+/) : []).map((part) => EXPERT_SOURCE.exec(part)?.[1]).filter((role) => typeof role === "string");
    if (roles.length > 0) credits.push({ line, roles: [...new Set(roles)] });
  }
  return credits;
}
function buildHighTableView(projectRoot, dirName, specJson, lane) {
  if (lane === "fast") return null;
  const adoption = readSpecAdoption(specJson);
  if (adoption?.fast_lane) return null;
  const skipped = adoption !== null && !adoption.produced;
  const experts = asRecord(readJsonFile(join17(projectRoot, featureFilePath(dirName, "experts"))));
  const roster = Array.isArray(experts?.roster) ? records(experts.roster) : null;
  const rows = readHighTable(projectRoot, dirName);
  const synthesis = asRecord(experts?.synthesis);
  if (!roster && rows.length === 0) {
    return skipped ? {
      skipped,
      met_after_freeze: false,
      seats: [],
      chief: null,
      rulings: null,
      gaps: [],
      questions: null,
      credits: []
    } : null;
  }
  const frozenAt = frozenAtOf(specJson);
  const folded = foldHighTable(rows);
  const findingCounts = /* @__PURE__ */ new Map();
  const recordedFindings = Array.isArray(experts?.findings) ? records(experts.findings) : null;
  for (const finding of recordedFindings ?? []) {
    const role = str2(finding.role);
    if (role) findingCounts.set(role, (findingCounts.get(role) ?? 0) + 1);
  }
  const findingsFor = (role) => recordedFindings === null ? null : findingCounts.get(role) ?? 0;
  const roles = [
    ...(roster ?? []).map((entry) => str2(entry.role) ?? "unknown"),
    ...[...folded.keys()].filter((role) => role !== CHIEF_ROLE)
  ];
  const seats = [...new Set(roles)].map(
    (role) => seatFrom(
      role,
      (roster ?? []).find((entry) => entry.role === role) ?? null,
      folded.get(role),
      findingsFor(role),
      frozenAt
    )
  );
  const metAfterFreeze = highTableDoneTimes(rows).some((at) => after(at, frozenAt));
  return {
    skipped,
    met_after_freeze: metAfterFreeze,
    seats,
    chief: chiefFrom(folded.get(CHIEF_ROLE), synthesis, frozenAt),
    rulings: synthesis ? rulingsFrom(synthesis) : null,
    gaps: gapsFrom(synthesis),
    questions: questionsFrom(projectRoot, dirName),
    credits: metAfterFreeze ? [] : creditsFrom(specJson)
  };
}

// src/hud/snapshot.ts
var HUD_SNAPSHOT_SCHEMA = "paqad.hud/3";
var TIMELINE_ROWS = 20;
var TIMELINE_COMMITS = 10;
var TIMELINE_KINDS = /* @__PURE__ */ new Set(["open", "close", "stage_start", "stage_end"]);
function isTime(value) {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}
function spanMs(from, to) {
  if (!isTime(from) || !isTime(to)) return null;
  const ms = Date.parse(to) - Date.parse(from);
  return ms >= 0 ? ms : null;
}
function inOrder(times) {
  return times.filter(isTime).sort((a, b) => Date.parse(a) - Date.parse(b));
}
function stageEndDuration(rows, index, stage) {
  const start = rows.slice(0, index).reverse().find((row) => row.kind === "stage_start" && str3(row.stage) === stage);
  return start ? spanMs(rowRecordedAt(start), rowRecordedAt(rows[index])) : null;
}
function startedInOwnAgent(agent, stage) {
  return agent !== null && stage !== null && stageForAgentName(stripPluginAgentNamespace(agent)) === stage;
}
function buildTimeline(projectRoot, dirName, change = null) {
  const rows = readFeatureStageUnit(projectRoot, dirName);
  const entries = [];
  rows.forEach((row, index) => {
    const kind = String(row.kind);
    const at = rowRecordedAt(row);
    if (!TIMELINE_KINDS.has(kind) || !at) return;
    const stage = str3(row.stage);
    const entry = { at, kind, stage, note: str3(row.note) };
    if (kind === "open" && entry.note === null && change) Object.assign(entry, change);
    if (kind === "stage_start") {
      entry.agent = str3(row.agent);
      entry.own_agent = startedInOwnAgent(entry.agent, stage);
    }
    if (kind === "stage_end") entry.duration_ms = stageEndDuration(rows, index, stage);
    entries.push(entry);
  });
  return entries.slice(-TIMELINE_ROWS);
}
function event(at, kind, fields = {}) {
  return { at, kind, stage: null, note: null, ...fields };
}
function tableEvents(table) {
  if (!table || table.skipped) return [];
  const events = [];
  const seatedAt = inOrder(table.seats.map((seat) => seat.seated_at))[0];
  if (seatedAt) {
    const standing = table.seats.filter((seat) => seat.origin === "standing").length;
    events.push(
      event(seatedAt, "table_seated", { picked: table.seats.length - standing, standing })
    );
  }
  const landed = table.seats.length > 0 && table.seats.every((seat) => seat.state === "done");
  const landedAt = landed ? inOrder(table.seats.map((seat) => seat.done_at)).at(-1) : void 0;
  if (landedAt) {
    events.push(
      event(landedAt, "notes_landed", {
        count: table.seats.length,
        findings: table.seats.reduce((sum, seat) => sum + (seat.findings ?? 0), 0)
      })
    );
  }
  const chief = table.chief;
  if (chief && isTime(chief.done_at)) {
    events.push(
      event(chief.done_at, "chief_ruled", {
        duration_ms: spanMs(chief.started_at, chief.done_at),
        verdict: chief.verdict
      })
    );
  }
  return events;
}
function minuteGroups(times) {
  const groups = /* @__PURE__ */ new Map();
  for (const at of inOrder(times)) {
    const key = new Date(at).toISOString().slice(0, 16);
    const group = groups.get(key);
    if (group) group.count += 1;
    else groups.set(key, { at, count: 1 });
  }
  return [...groups.values()];
}
function decisionEvents(decisions) {
  const raw = decisions.map(
    ({ packet, status }) => [packet, status]
  );
  const opened = raw.map(([packet]) => str3(packet.created_at)).filter(isTime);
  const answered = raw.filter(([, status]) => status === "resolved").map(([packet]) => str3(packet.resolved_at)).filter(isTime);
  return [
    ...minuteGroups(opened).map(({ at, count: count2 }) => event(at, "decisions_opened", { count: count2 })),
    ...minuteGroups(answered).map(({ at, count: count2 }) => event(at, "decisions_answered", { count: count2 }))
  ];
}
function specEvents(specJson) {
  const spec = asRecord2(specJson);
  const at = str3(asRecord2(spec?.frozen)?.frozen_at);
  if (!spec || !isTime(at)) return [];
  const count2 = (value) => Array.isArray(value) ? value.length : 0;
  return [
    event(at, "spec_frozen", {
      requirements: count2(spec.behaviour),
      criteria: count2(spec.acceptance_criteria)
    })
  ];
}
function deliveryEvents(delivery, ship, commitTimes) {
  const own = delivery.commit_split?.own_shas ? new Set(delivery.commit_split.own_shas) : null;
  const events = delivery.commits.filter((commit) => own === null || own.has(commit.sha)).flatMap((commit) => {
    const at = commitTimes.get(commit.sha);
    return at ? [event(at, "commit", { sha: commit.sha.slice(0, 7), subject: commit.subject })] : [];
  }).slice(-TIMELINE_COMMITS);
  if (ship.push) {
    events.push(event(ship.push.at, "push", { state: ship.push.state, count: ship.commits }));
  }
  if (ship.pr && typeof ship.pr.number === "number") {
    events.push(event(ship.pr.first_at ?? ship.pr.at, "pr_opened", { number: ship.pr.number }));
  }
  const ci = ship.ci;
  if (ci && (ci.state === "pass" || ci.state === "fail")) {
    const jobs = ci.jobs ?? [];
    events.push(
      event(inOrder(jobs.map((job) => job.completed_at)).at(-1) ?? ci.at, "ci", {
        state: ci.state,
        count: ci.total ?? jobs.length
      })
    );
  }
  return events;
}
function buildRecordEvents(sources) {
  const rulesAt = sources.rulesLoaded?.recorded_at;
  return [
    ...isTime(rulesAt) ? [
      event(rulesAt, "rules_loaded", {
        count: sources.rulesLoaded?.applicable_rules?.length ?? 0
      })
    ] : [],
    ...tableEvents(sources.table),
    ...decisionEvents(sources.decisions),
    ...specEvents(sources.specJson),
    ...deliveryEvents(sources.delivery, sources.ship, sources.commitTimes)
  ].filter((entry) => isTime(entry.at));
}
function recordEventsSafe(projectRoot, sources) {
  try {
    return buildRecordEvents(sources);
  } catch (error) {
    logHudWriteError(projectRoot, "record events", error);
    return [];
  }
}
function mergeTimeline(stages, events) {
  return [...stages, ...events].sort((a, b) => Date.parse(a.at) - Date.parse(b.at));
}
function computeDeliveryPlan(input) {
  const commit = !input.commitDeclined;
  const push = input.enabled && commit;
  const ci = push && input.ciGate !== "off" && input.hasCi;
  const reason2 = !commit ? "Edit only \xB7 no commit" : !push ? "No push for this change" : !ci ? "No CI" : null;
  return { commit, push, pr: push, ci, merge: push, reason: reason2 };
}
function repoHasCi(projectRoot) {
  try {
    return readdirSync3(join18(projectRoot, ".github", "workflows")).some(
      (name) => /\.ya?ml$/.test(name)
    );
  } catch {
    return false;
  }
}
function readPolicy(projectRoot) {
  try {
    return loadDeliveryPolicy(projectRoot).policy;
  } catch (error) {
    logHudWriteError(projectRoot, "delivery policy", error);
    return null;
  }
}
function buildDeliveryPlan(projectRoot, policy, delivery) {
  if (!policy) return null;
  return computeDeliveryPlan({
    enabled: policy.enabled,
    commitDeclined: delivery?.commit_decision?.answer === "decline",
    ciGate: policy.process.ci.gate,
    hasCi: repoHasCi(projectRoot)
  });
}
function planFile(path) {
  return toPosixPath(path).replace(/^\.\//, "");
}
function buildPlanProgress(projectRoot, dirName, changedFiles) {
  const steps = readFeaturePlan(projectRoot, dirName)?.steps;
  if (!Array.isArray(steps) || steps.length === 0 || changedFiles === null) return null;
  const changed = new Set(changedFiles.map(planFile));
  const done = steps.filter(
    (step) => Array.isArray(step?.files) && step.files.some((file) => typeof file === "string" && changed.has(planFile(file)))
  ).length;
  return { steps: steps.length, done };
}
function readJsonFile2(path) {
  try {
    return JSON.parse(readFileSync11(path, "utf8"));
  } catch {
    return null;
  }
}
function asRecord2(value) {
  return typeof value === "object" && value !== null ? value : null;
}
function str3(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}
function num2(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
var TRACK_RECORD_BUNDLES = 50;
function buildTrackRecords(projectRoot, activeDir, roles) {
  const records2 = /* @__PURE__ */ new Map();
  if (roles.length === 0) return records2;
  try {
    const others = listFeatureDirs(projectRoot).filter((dir) => dir !== activeDir).sort(
      (a, b) => (parseFeatureDirName(b)?.ulid ?? "").localeCompare(parseFeatureDirName(a)?.ulid ?? "")
    ).slice(0, TRACK_RECORD_BUNDLES);
    if (others.length === 0) return records2;
    const metrics = aggregateSpecPipelineMetrics(projectRoot, others);
    for (const role of roles) {
      const key = role;
      const rate = metrics.changed_spec_rate[key];
      if (!rate || rate.fired === 0) continue;
      records2.set(role, {
        changes: rate.fired,
        changed_spec: rate.changed,
        empty: metrics.empty_by_role[key]?.empty ?? 0,
        avg_tokens: Math.round((metrics.tokens_by_role[key] ?? 0) / rate.fired)
      });
    }
  } catch (error) {
    logHudWriteError(projectRoot, "track record", error);
    records2.clear();
  }
  return records2;
}
function withTrackRecords(projectRoot, dirName, table) {
  if (!table || table.seats.length === 0) return table;
  const records2 = buildTrackRecords(
    projectRoot,
    dirName,
    table.seats.map((seat) => seat.role)
  );
  return {
    ...table,
    seats: table.seats.map((seat) => ({ ...seat, track_record: records2.get(seat.role) ?? null }))
  };
}
function buildStages(projectRoot, dirName, fold) {
  const rows = readFeatureStageUnit(projectRoot, dirName);
  return fold.stages.map((stage) => {
    const own = rows.filter((row) => row.stage === stage.stage);
    const last = own.at(-1);
    const end = [...own].reverse().find((row) => row.kind === "stage_end");
    const artifacts = end?.artifact_paths;
    return {
      stage: stage.stage,
      state: stage.state,
      mandatory: isLaneStage(fold.lane, stage.stage),
      started_at: stage.started_at,
      ended_at: stage.ended_at,
      duration_ms: stage.duration_ms,
      duration_unreliable: stage.duration_unreliable,
      agent: str3(last?.agent),
      proof_file: Array.isArray(artifacts) ? str3(artifacts[0]) ?? null : null
    };
  });
}
function criterionThens(specJson) {
  const criteria = asRecord2(specJson)?.acceptance_criteria;
  const thens = /* @__PURE__ */ new Map();
  for (const entry of Array.isArray(criteria) ? criteria : []) {
    const criterion = asRecord2(entry);
    const id = str3(criterion?.criterion_id);
    const then = str3(criterion?.then);
    if (id && then) thens.set(id, then);
  }
  return thens;
}
function buildAcceptanceClaims(projectRoot, dirName, lane, changedFiles, specJson) {
  if (changedFiles === null) return [];
  try {
    const result = buildChangeTraceabilityMap({
      projectRoot,
      dirName,
      changedFiles,
      lane: LANES.find((known) => known === lane) ?? "graduated"
    });
    if (!result) return [];
    const thens = criterionThens(specJson);
    const links = new Map(result.map.forward.map((link) => [link.promise_id, link]));
    return result.automated.map((id) => {
      const testId = links.get(id)?.proving_checks[0] ?? null;
      return {
        kind: "acceptance",
        id,
        label: thens.get(id) ?? id,
        test_id: testId,
        verdict: testId ? "pass" : "missing"
      };
    });
  } catch (error) {
    logHudWriteError(projectRoot, "claims", error);
    return [];
  }
}
function buildClaims(kind, projectRoot, dirName) {
  if (kind !== "fix") return [];
  const rows = readFixProofRows(projectRoot, dirName);
  const proof = foldFixProofState(rows);
  return [
    {
      kind: "fix-proof",
      proof,
      label: FIX_PROOF_STATE_LABEL[proof],
      verdict: proof === "red-green" ? "pass" : "inconclusive",
      test_id: rows.at(-1)?.test_id ?? null
    }
  ];
}
function readGateVerdict(row) {
  const raw = String(row.verdict ?? "").toLowerCase();
  if (raw === "pass" || raw === "fail" || raw === "inconclusive") return raw;
  if (raw === "skipped") return row.skip_kind === "did-not-run" ? "did-not-run" : "not-required";
  return "pending";
}
function buildGates(projectRoot, dirName) {
  const latest = /* @__PURE__ */ new Map();
  for (const row of readFeatureEvidence(projectRoot, dirName)) {
    if (row.engine !== "verification-gate") continue;
    latest.set(row.code, row);
  }
  const stageEnds = stageEndTimes(projectRoot, dirName);
  return [...latest.entries()].map(([code, row]) => {
    const verdict = gateIsJudged(code, rowRecordedAt(row), stageEnds) ? readGateVerdict(row) : "not-judged";
    const tier = GATE_STRENGTH_TIER[code] ?? LATE_GATE_STRENGTH_TIER[code];
    const strength = tier ?? (row.strength_class === "deterministic" || row.strength_class === "llm-judged" ? row.strength_class : null);
    return { name: code, required: verdict !== "not-required", strength, verdict };
  });
}
function ownPr(delivery, ownShas, inheritedShas) {
  const pr = delivery.pr ?? null;
  if (!pr) return null;
  const head = pr.head_sha ?? null;
  if (head === null) return (pr.state ?? null) === null ? pr : null;
  if (ownShas !== null && ownShas.has(head)) return pr;
  const recordedHere = delivery.commits.some((commit) => commit.sha === head) && !inheritedShas.includes(head);
  return pr.state === "merged" && recordedHere ? pr : null;
}
function readingIsCurrent(ci, pr, push) {
  if (pr?.head_sha && ci.sha !== pr.head_sha) return false;
  if (push?.sha && ci.sha !== push.sha && Date.parse(ci.at) < Date.parse(push.at)) return false;
  return true;
}
function buildShip(delivery, filesChanged = null) {
  const split = delivery.commit_split ?? null;
  const ownShas = split?.own_shas ? new Set(split.own_shas) : null;
  const inheritedShas = split?.inherited_shas ?? [];
  const commitList = delivery.commits.map((commit) => ({
    sha: commit.sha.slice(0, 7),
    subject: commit.subject,
    own: ownShas === null ? null : ownShas.has(commit.sha)
  }));
  const pr = ownPr(delivery, ownShas, inheritedShas);
  const prState = pr?.state ?? null;
  const rawCi = delivery.ci ?? null;
  const ci = rawCi && rawCi.state === "pass" && !readingIsCurrent(rawCi, pr, delivery.push ?? null) ? { ...rawCi, state: "pending" } : rawCi;
  return {
    commits: ownShas === null ? split?.own?.count ?? 0 : delivery.commits.filter((commit) => ownShas.has(commit.sha)).length,
    commit_list: commitList,
    commit_decision: delivery.commit_decision?.answer ?? null,
    merge_commit: delivery.merge_commit,
    push: delivery.push ?? null,
    pr,
    pr_state: prState,
    pr_title: pr?.title ?? null,
    pr_files: pr?.changed_files ?? null,
    pr_additions: pr?.additions ?? null,
    pr_deletions: pr?.deletions ?? null,
    ci,
    ci_read_at: rawCi?.at ?? null,
    all_green: ci?.state === "pass" && prState === "open",
    merged: prState === "merged",
    own: split?.own ?? null,
    inherited: split?.inherited ?? null,
    inherited_count: inheritedShas.length,
    files_changed: filesChanged
  };
}
function buildWorkflow(projectRoot, sessionId, state) {
  const name = state.active?.workflow ?? null;
  if (name === null || name === "feature-development" || name === "no-workflow") return null;
  const startedAt = episodeStart(readRouteTurns(projectRoot, sessionId), name) ?? state.turn_started_at ?? null;
  const cost = startedAt === null ? { tokens: null, usd: null, unpriced: [] } : workflowCostSince(projectRoot, sessionId, startedAt);
  return { name, started_at: startedAt, ...cost };
}
function buildQuestions(projectRoot, dirName) {
  const clarification = asRecord2(
    readJsonFile2(join18(projectRoot, featureFilePath(dirName, "clarification")))
  );
  const counts = asRecord2(asRecord2(clarification?.questions)?.counts);
  if (!counts) return null;
  return {
    asked: num2(counts.asked) ?? 0,
    answered: num2(counts.answered) ?? 0,
    auto_answered: num2(counts.auto_answered) ?? 0,
    deferred: num2(counts.deferred) ?? 0
  };
}
function changeDecisions(projectRoot, dirName) {
  if (dirName === null) return [];
  const changeKey = featureChangeKey(dirName);
  return readContractDecisions(projectRoot).filter(({ packet }) => {
    const change = packet.change;
    return change === changeKey || change === void 0 || change === null;
  });
}
function buildDecisions(rows) {
  const pending = [];
  let resolved = 0;
  for (const { packet, status } of rows) {
    if (status === "resolved") {
      resolved += 1;
      continue;
    }
    const rich = readAnyDecisionPacket(packet);
    const raw = packet;
    pending.push({
      id: rich?.decision_id ?? str3(raw.id) ?? str3(raw.decision_id) ?? "unknown",
      category: rich?.category ?? str3(raw.category) ?? "unknown",
      question: rich?.question ?? str3(raw.title) ?? str3(raw.question) ?? ""
    });
  }
  return { pending, resolved };
}
function buildEvidenceExpected(projectRoot, sessionId, dirName) {
  const config = buildBundleCompletenessConfig(projectRoot, sessionId, dirName);
  return BUNDLE_MANIFEST.map((entry) => ({
    file: entry.file,
    expectation: entry.required === "always" ? "always" : entry.required === "optional" ? "if present" : isBundleFileRequired(entry, config) ? "on here" : "off here",
    present: existsSync12(join18(projectRoot, featureDir(dirName), entry.file))
  }));
}
function findingsScan(row) {
  if (!row) {
    return {
      status: "did not run",
      total: null,
      counts: null,
      blocking: false,
      from_cache: false,
      items: null,
      overflow: 0,
      recorded_at: null
    };
  }
  const counts = asRecord2(row.counts);
  const total = (num2(counts?.deterministic) ?? 0) + (num2(counts?.heuristic) ?? 0);
  return {
    status: total > 0 ? "open" : "clean",
    total,
    counts,
    blocking: row.blocking === true,
    from_cache: row.from_cache === true,
    items: Array.isArray(row.findings) ? row.findings : null,
    overflow: num2(row.findings_overflow) ?? 0,
    recorded_at: rowRecordedAt(row)
  };
}
function buildFindings(projectRoot, dirName) {
  const ruleRow = readRuleRun(projectRoot, dirName).filter((row) => row.kind === "findings").at(-1);
  const dupRow = readDuplication(projectRoot, dirName).at(-1);
  if (!ruleRow && !dupRow) return null;
  return {
    rules: findingsScan(ruleRow),
    near_copies: findingsScan(dupRow)
  };
}
function readVerdictRecord(projectRoot, sessionId) {
  const record = asRecord2(readJsonFile2(hudVerdictPath(projectRoot, sessionId)));
  return record?.schema === "paqad.hud-verdict/1" ? record : null;
}
function freshVerdict(projectRoot, sessionId, dirName) {
  const verdict = readVerdictRecord(projectRoot, sessionId);
  if (!verdict || typeof verdict.change !== "string" || verdict.change !== dirName) return null;
  const writtenAt = Date.parse(verdict.written_at);
  if (Number.isNaN(writtenAt)) return null;
  const editedAt = latestEditAt(projectRoot, dirName);
  return editedAt === null || writtenAt >= editedAt ? verdict : null;
}
var STAGE_WORDS = {
  ticket_intake: "Intake",
  planning: "Planning",
  specification: "Spec",
  development: "Build",
  review: "Review",
  checks: "Checks",
  documentation_sync: "Docs",
  delivery: "Deliver"
};
function stageWord(stage) {
  return STAGE_WORDS[stage] ?? stage;
}
function computeHudFlags(input) {
  const flags = [];
  const touchedCode = input.stages.some(
    (stage) => stage.stage === "development" && stage.state !== "missing"
  );
  if (touchedCode && !input.rulesRecorded) {
    flags.push({ id: "rules-not-loaded", text: "The rules for this change were never loaded." });
  }
  for (const gate of input.gates) {
    if (gate.verdict === "inconclusive") {
      flags.push({ id: `gate:${gate.name}`, text: `${gate.name} could not reach a result.` });
    }
  }
  if (input.tableSkipped) {
    flags.push({
      id: "high-table-skipped",
      text: "The spec was written by hand, so the High Table never sat."
    });
  }
  if (input.tableLate) {
    flags.push({
      id: "high-table-late",
      text: "The High Table met after the spec was frozen, so it shaped no spec line."
    });
  }
  if (input.isolationStatus === "expected" && input.isolatedStages === 0) {
    flags.push({ id: "isolation-missing", text: "No stage ran in its own agent on this lane." });
  }
  if (input.isolationStatus === "unresolved") {
    flags.push({
      id: "lane-unresolved",
      text: "The lane was never set, so isolation is unproven."
    });
  }
  const ruleFindings = input.findings?.rules.blocking ? input.findings.rules.total ?? 0 : 0;
  if (ruleFindings > 0) {
    flags.push({
      id: "rule-findings",
      text: ruleFindings === 1 ? "1 rule finding is open." : `${ruleFindings} rule findings are open.`
    });
  }
  const nearCopies = input.findings?.near_copies.total ?? 0;
  if (nearCopies > 0) {
    flags.push({
      id: "near-copies",
      text: nearCopies === 1 ? "1 near-copy of existing code is open." : `${nearCopies} near-copies of existing code are open.`
    });
  }
  if (branchCarriesOtherWork(input.commitSplit) && input.commitSplit?.inherited) {
    flags.push({
      id: "branch:shared",
      text: `This branch also carries ${describeInherited(input.commitSplit.inherited)}.`
    });
  }
  return flags;
}
function computeHudHeadline(input) {
  if (input.pendingDecisions > 0) {
    const n = input.pendingDecisions;
    return { text: `Needs you: ${n} decision${n === 1 ? "" : "s"} waiting.`, tone: "needs-you" };
  }
  if (!input.active) {
    if (input.paused > 0) {
      return { text: 'A change is paused. Say "continue" to pick it up.', tone: "neutral" };
    }
    if (input.route && input.route !== "no-workflow") {
      return { text: `Working on ${input.route.replace(/-/g, " ")}.`, tone: "working" };
    }
    return { text: "Ready. No change in progress.", tone: "neutral" };
  }
  const running = input.stages.find((stage) => stage.state === "running");
  if (running) {
    const next2 = input.stages.find(
      (stage) => stage.mandatory && stage.state === "missing" && input.stages.indexOf(stage) > input.stages.indexOf(running)
    );
    return {
      text: `${stageWord(running.stage)} in progress.${next2 ? ` Next: ${stageWord(next2.stage)}.` : ""}`,
      tone: "working"
    };
  }
  if (input.verdict) {
    const flagged = input.flags.length;
    const tone = input.verdict.kind === "fail" ? "bad" : input.verdict.kind === "inconclusive" || flagged > 0 ? "warn" : "good";
    const suffix = flagged > 0 ? ` ${flagged} flag${flagged === 1 ? "" : "s"} open.` : "";
    return { text: `${input.verdict.word}.${suffix}`, tone };
  }
  const next = input.stages.find((stage) => stage.mandatory && stage.state === "missing");
  const done = [...input.stages].reverse().find((stage) => stage.state === "complete");
  if (next) {
    return {
      text: `${done ? `${stageWord(done.stage)} done. ` : ""}Next: ${stageWord(next.stage)}.`,
      tone: "working"
    };
  }
  return { text: "Every stage is recorded. Waiting for the verdict.", tone: "working" };
}
var TURN_END_SOURCES = /* @__PURE__ */ new Set([
  "hook:verification-completion",
  "hook:capability-gate-completion"
]);
function buildHudSnapshot(projectRoot, sessionHint, options = {}) {
  const now = options.now ?? (() => /* @__PURE__ */ new Date());
  const sessionId = sessionHint?.trim() || readLedgerSessionId(projectRoot) || resolveSessionId(projectRoot, null);
  const workflow = readWorkflowState(projectRoot, sessionId);
  const route = workflow.active?.workflow ?? null;
  const paused = workflow.paused.map((entry) => ({
    workflow: entry.workflow,
    lane: entry.lane ?? null
  }));
  const scope = qualifyHudChange(projectRoot, sessionId, now);
  const dirName = scope.dir;
  const decisionRows = changeDecisions(projectRoot, dirName);
  const decisions = buildDecisions(decisionRows);
  const lastBlock = readRuleStopRecord(projectRoot, sessionId);
  if (!dirName) {
    return {
      schema: HUD_SNAPSHOT_SCHEMA,
      session_id: sessionId,
      generated_at: now().toISOString(),
      scope: { qualified: false, reason: scope.reason },
      workflow: buildWorkflow(projectRoot, sessionId, workflow),
      active: false,
      route,
      lane: workflow.active?.lane ?? null,
      lane_reason: workflow.active?.reason ?? null,
      headline: computeHudHeadline({
        route,
        active: false,
        stages: [],
        pendingDecisions: decisions.pending.length,
        verdict: null,
        flags: [],
        paused: paused.length
      }),
      change: null,
      paused,
      stages: [],
      timeline: [],
      table: null,
      claims: [],
      gates: [],
      gates_expected: [...DEFAULT_GATE_CODES],
      flags: [],
      rules: { recorded: false, applicable: null, loaded_at: null },
      findings: null,
      decisions,
      questions: null,
      last_block: lastBlock,
      delivery_plan: buildDeliveryPlan(projectRoot, readPolicy(projectRoot), null),
      plan: null,
      ship: null,
      verdict: null,
      receipt: null,
      evidence_expected: [],
      isolation: null,
      cost: null,
      tech_debt: null,
      rule_overrides: null
    };
  }
  const verdict = freshVerdict(projectRoot, sessionId, dirName);
  const receiptPath = hudReceiptPath(projectRoot, sessionId);
  const receipt = verdict && existsSync12(receiptPath) ? { path: receiptPath } : null;
  const record = readFeatureRecord(projectRoot, dirName);
  const fold = foldFeature(projectRoot, sessionId, dirName);
  const stages = buildStages(projectRoot, dirName, fold);
  const gates = buildGates(projectRoot, dirName);
  const specJson = readJsonFile2(join18(projectRoot, featureFilePath(dirName, "specification")));
  const lane = fold.lane ?? record?.lane ?? workflow.active?.lane ?? null;
  const table = withTrackRecords(
    projectRoot,
    dirName,
    buildHighTableView(projectRoot, dirName, specJson, lane)
  );
  const rulesLoaded = readRulesLoaded(projectRoot, dirName);
  const delivery = readFeatureDelivery(projectRoot, dirName);
  const policy = readPolicy(projectRoot);
  const changeGit = readChangeGit(
    projectRoot,
    policy?.process.pr.base ?? null,
    (error) => logHudWriteError(projectRoot, "changed files", error)
  );
  const changedFiles = changeGit?.files ?? null;
  const ship = buildShip(delivery, changedFiles ? changedFiles.length : null);
  const isolationStatus = stageIsolationStatus(projectRoot, sessionId, dirName);
  const isolationSummary = summarizeStageIsolation(projectRoot, dirName);
  const findings = buildFindings(projectRoot, dirName);
  const flags = computeHudFlags({
    stages,
    gates,
    rulesRecorded: rulesLoaded !== null,
    tableSkipped: table?.skipped ?? false,
    tableLate: table?.met_after_freeze ?? false,
    isolationStatus,
    isolatedStages: isolationSummary?.stages ?? 0,
    findings,
    commitSplit: delivery.commit_split ?? null
  });
  return {
    schema: HUD_SNAPSHOT_SCHEMA,
    session_id: sessionId,
    generated_at: now().toISOString(),
    scope: { qualified: true, reason: scope.reason },
    workflow: null,
    active: true,
    route,
    lane,
    lane_stages: laneStages(fold.lane),
    lane_reason: workflow.active?.reason ?? null,
    headline: computeHudHeadline({
      route,
      active: true,
      stages,
      pendingDecisions: decisions.pending.length,
      verdict,
      flags,
      paused: paused.length
    }),
    change: {
      dir: dirName,
      id: record?.change ?? null,
      issue: record?.issue ?? null,
      title: record?.title ?? null,
      branch: record?.branch ?? null,
      status: record?.status ?? null
    },
    paused,
    stages,
    timeline: mergeTimeline(
      buildTimeline(projectRoot, dirName, {
        title: record?.title ?? null,
        issue: record?.issue ?? null,
        lane
      }),
      recordEventsSafe(projectRoot, {
        rulesLoaded,
        table,
        decisions: decisionRows,
        specJson,
        delivery,
        ship,
        commitTimes: changeGit?.commitTimes ?? /* @__PURE__ */ new Map()
      })
    ),
    table,
    claims: [
      ...buildClaims(record?.kind, projectRoot, dirName),
      ...buildAcceptanceClaims(projectRoot, dirName, lane, changedFiles, specJson)
    ],
    gates,
    gates_expected: [...DEFAULT_GATE_CODES],
    flags,
    rules: {
      recorded: rulesLoaded !== null,
      applicable: rulesLoaded ? rulesLoaded.applicable_rules.length : null,
      loaded_at: rulesLoaded?.recorded_at ?? null
    },
    findings,
    decisions,
    questions: buildQuestions(projectRoot, dirName),
    last_block: lastBlock,
    delivery_plan: buildDeliveryPlan(projectRoot, policy, delivery),
    plan: buildPlanProgress(projectRoot, dirName, changedFiles),
    ship,
    verdict,
    receipt,
    evidence_expected: buildEvidenceExpected(projectRoot, sessionId, dirName),
    isolation: {
      status: isolationStatus,
      stages: isolationSummary?.stages ?? 0,
      tokens_not_recarried: isolationSummary?.tokensNotRecarried ?? 0
    },
    cost: buildHudCost(projectRoot, dirName, {
      turnRunning: options.turnRunning === true,
      now,
      onError: (error) => logHudWriteError(projectRoot, "cost", error)
    }),
    tech_debt: { raised: readFeatureTechDebtIndex(projectRoot, dirName) ?? [] },
    rule_overrides: readRuleOverrides(projectRoot, dirName).map(({ rule, file, by, at }) => ({
      rule,
      file,
      by,
      at
    }))
  };
}
function writeHudSnapshot(projectRoot, sessionHint, options = {}) {
  const snapshot = buildHudSnapshot(projectRoot, sessionHint, options);
  const path = hudSnapshotPath(projectRoot, snapshot.session_id);
  writeFileAtomic(path, `${JSON.stringify(snapshot, null, 2)}
`);
  return { path, snapshot };
}
function writeHudSnapshotSafe(projectRoot, sessionHint, source) {
  try {
    return writeHudSnapshot(projectRoot, sessionHint, {
      turnRunning: !TURN_END_SOURCES.has(source)
    }).path;
  } catch (error) {
    logHudWriteError(projectRoot, source, error);
    return null;
  }
}
function logHudWriteError(projectRoot, source, error) {
  const message = error instanceof Error ? error.message : String(error);
  appendHooksLog(projectRoot, `hud-snapshot (${source}): not written: ${message}`);
  try {
    const logs = join18(projectRoot, ".paqad", "logs");
    mkdirSync6(logs, { recursive: true });
    appendFileSync2(
      join18(logs, "hook-failures.log"),
      `[${(/* @__PURE__ */ new Date()).toISOString()}] ERROR hud-snapshot (${source}): ${message}
`
    );
  } catch {
  }
}

// src/hud/refresh.ts
var HUD_REFRESH_VERBS = [
  "decision create",
  "decision resolve",
  "rules load",
  "rules override",
  "fix prove",
  "lane set",
  "route set",
  "stage",
  "plan compile",
  "spec pipeline experts",
  "spec freeze",
  "review record",
  "checks run",
  "delivery-link",
  "deliver",
  "debt add",
  "debt promote",
  "debt close"
];
function isHudRefreshVerb(commandPath) {
  return HUD_REFRESH_VERBS.some(
    (verb) => commandPath === verb || commandPath.startsWith(`${verb} `)
  );
}
function refreshHudSnapshot(projectRoot, sessionHint, source, env = process.env) {
  try {
    if (!existsSync13(join19(projectRoot, PATHS.FRAMEWORK_PATH))) return null;
    if (!isFrameworkEnabledForRoot(projectRoot, env)) return null;
  } catch {
    return null;
  }
  return writeHudSnapshotSafe(projectRoot, sessionHint, source);
}

export {
  TOKEN_ARTIFACT_CLASSES,
  ESCALATION_REASONS,
  DISCLOSURE_LEVELS,
  DISCLOSURE_ESCALATION_REASONS,
  TASK_COMPLEXITIES,
  RETRIEVAL_PATHS,
  RETRIEVAL_ESCALATION_SIGNALS,
  ROUTING_MECHANISMS,
  VERIFICATION_GATES,
  BACKSTOP_VERIFICATION_ORIGINS,
  isBackstopVerificationOrigin,
  VERIFICATION_EVIDENCE_SCHEMA_VERSION,
  EVIDENCE_GATE_STATUSES,
  EVIDENCE_OVERALL_STATUSES,
  EVIDENCE_FAILURE_CATEGORIES,
  buildCompactArtifact,
  evaluateEscalation,
  buildReasoningInputPayload,
  applyDisclosurePolicy,
  evaluateRetrievalGate,
  runRoutingDecision,
  buildControlLayerAudit,
  createTestDelta,
  createVerificationDelta,
  createDriftDelta,
  buildTestDeltaReasoningPayload,
  buildVerificationDeltaReasoningPayload,
  buildDriftDeltaReasoningPayload,
  findPathSegmentsInRun,
  __tokenEfficiencyInternals,
  verdictKindFor,
  gradeGateResult,
  readFixProofRows,
  appendFixProofRow,
  countedRedRow,
  FIX_PROOF_STATE_LABEL,
  foldFixProofState,
  appendRuleOverride,
  readRuleOverrides,
  DEBT_STATUSES,
  techDebtDir,
  readDebtItems,
  addDebtItem,
  promoteDebtItem,
  closeDebtItem,
  listDebtItems,
  newestFirst,
  readFeatureTechDebtIndex,
  writeFeatureTechDebtIndex,
  createPass,
  createFail,
  createNotRequired,
  AC_ID_PATTERN,
  extractAcIdFromIssue,
  collectObservedAcIds,
  AcTestMappingGate,
  extractImportSpecifiers,
  scanImports,
  discoverSourceRoots,
  discoverModuleHealth,
  VERIFICATION_EVIDENCE_RELATIVE_PATH,
  VERIFICATION_EVIDENCE_STDERR_BUDGET_BYTES,
  buildVerificationEvidence,
  writeVerificationEvidence,
  readTraceabilityMap,
  buildAndWriteChangeTraceabilityMap,
  hasStageAgentEvidence,
  summarizeStageIsolation,
  formatStageIsolationLine,
  resolveEnterprisePolicy,
  writesLedger,
  HEURISTIC_BAND_FLOOR,
  resolveDuplicationConfig,
  resolveDuplicationMode,
  buildBundleCompletenessConfig,
  toVerificationSnapshots,
  buildVerificationGateDeltaPayload,
  buildDocumentationDriftDeltaPayload,
  ArchitectureComplianceGate,
  BehavioralCorrectnessGate,
  collectScopeDriftPaths,
  validateApiDoc,
  validateErrorCatalogMarkdown,
  validateSpecDocument,
  validateUserFlow,
  ChangeCompletenessGate,
  CodeTestsLintGate,
  DatabaseQualityGate,
  DocumentationFreshnessGate,
  SURFACE_DOC_PATH,
  ExtensionSurfaceGate,
  CHECKS_REPORT_SCHEMA_VERSION,
  activeFeatureDirOrNull,
  checksSessionId,
  readChecksReportForFeature,
  writeChecksReportForFeature,
  buildDuplicationReport,
  writeDuplicationReport,
  readDuplicationReport,
  duplicationMessage,
  readVerificationEvidence,
  buildEvidenceComment,
  renderEvidenceMarkdown,
  writeReviewDigest,
  ImplementationReviewGate,
  WorkflowTemplateValidator,
  InstructionsDocsStructureGate,
  ModuleDocsStructureGate,
  MutationTestingGate,
  QualityRatchetGate,
  RequirementCompletenessGate,
  normalizeEvidence,
  buildStatusOf,
  locate,
  collectMapEvidence,
  collectVerificationFindings,
  deriveMapFreshness,
  stampMapFreshness,
  isStale,
  SiteMapFreshnessGate,
  SpecReviewGate,
  StoryQualityGate,
  DEFAULT_GATE_CODES,
  VerificationGateRunner,
  HUD_SNAPSHOT_SCHEMA,
  TIMELINE_ROWS,
  TIMELINE_COMMITS,
  buildTimeline,
  buildRecordEvents,
  computeDeliveryPlan,
  TRACK_RECORD_BUNDLES,
  buildTrackRecords,
  buildShip,
  computeHudFlags,
  computeHudHeadline,
  TURN_END_SOURCES,
  buildHudSnapshot,
  writeHudSnapshot,
  writeHudSnapshotSafe,
  HUD_REFRESH_VERBS,
  isHudRefreshVerb,
  refreshHudSnapshot
};
