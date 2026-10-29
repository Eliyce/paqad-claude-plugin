import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  cachedMessageUsage,
  computeChangeCost,
  messageUsd,
  readChangeCost,
  readCostCache,
  roundUsd
} from "./chunk-MLXEYD6T.js";
import {
  CHIEF_ROLE,
  addTokenUsage,
  emptyTokenUsage,
  foldHighTable,
  highTableDoneTimes,
  maxTokenUsage,
  readHighTable
} from "./chunk-5BABRV7V.js";
import {
  STAGE_AGENT_HOSTS
} from "./chunk-OA3YQGXX.js";
import {
  PAQAD_VERDICT
} from "./chunk-5QVCE2TS.js";
import {
  hasOpenUnendedStage
} from "./chunk-TWVJTMUJ.js";
import {
  episodeStart,
  readRouteTurns
} from "./chunk-B4LV77TI.js";
import {
  BUNDLE_MANIFEST,
  aggregateSpecPipelineMetrics,
  isBundleFileRequired,
  isFrameworkEnabledForRoot,
  isSpecFrozenBeforePipeline,
  loadDeliveryPolicy,
  readFeaturePlan,
  readFeatureReview,
  readFeatureSpecification,
  readRuleStopRecord,
  readRulesLoaded,
  readSpecAdoption,
  resolveFlooredMode,
  resolveRuleComplianceMode,
  sessionWroteInEpisode
} from "./chunk-3ISWPQSH.js";
import {
  StackPackLoader
} from "./chunk-C6QX6BQY.js";
import {
  readAnyDecisionPacket,
  readContractDecisions
} from "./chunk-4GJVTR5P.js";
import {
  readProjectProfile
} from "./chunk-IDHHKJOF.js";
import {
  appendHooksLog
} from "./chunk-BW7VURA4.js";
import {
  getRuntimeRoot
} from "./chunk-VVRAO2BK.js";
import {
  hudCostCachePath,
  hudReceiptPath,
  hudSnapshotPath,
  hudVerdictPath,
  writeFileAtomic
} from "./chunk-RQMBP7NZ.js";
import {
  readDuplication,
  readFeatureEvidence,
  readRuleRun
} from "./chunk-EJNH2EWV.js";
import {
  isTestFile
} from "./chunk-IIFF75TG.js";
import {
  readWorkflowState
} from "./chunk-KPSH47JZ.js";
import {
  require_out
} from "./chunk-DNG6DDRS.js";
import {
  stripTrailingChars,
  toPosixPath,
  toProjectRelativePath
} from "./chunk-4K4CM3QN.js";
import {
  changedFilesSince,
  currentFeature,
  foldFeature,
  isPaqadArtifactPath,
  readChangeStartPoint,
  readFeatureDelivery,
  readFeatureIndexEntries,
  readFeatureStageUnit,
  stampFeatureDocument,
  writeFeatureIndexDocument
} from "./chunk-WTYH7MZ3.js";
import {
  ENVELOPE_HEADER_KEYS,
  LANES,
  RECORD_REPAIR_KIND,
  STAGE_AGENT_KIND,
  featureBranch,
  isBundleClosed,
  isBundleMaterialized,
  isFeatureFinished,
  isLaneStage,
  laneStages,
  listFeatureDirs,
  liveStageAgents,
  readChangeConstants,
  readFeatureRecord,
  renameWithRetrySync,
  rowRecordedAt,
  sessionReattachableFeature,
  stampBundleRow
} from "./chunk-VV76C43H.js";
import {
  readGitState,
  readHeadRef
} from "./chunk-AINYJ3Q2.js";
import {
  STAGE_AGENT_STAGES,
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
} from "./chunk-TVWMFQYX.js";
import {
  appendStampedRowToUnit,
  readUnitFile
} from "./chunk-QINSFA6R.js";
import {
  readLedgerSessionId,
  resolveSessionId
} from "./chunk-HV6ESCNW.js";
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
} from "./chunk-DDJC5PRW.js";
import {
  PATHS
} from "./chunk-LW3OCT4Y.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/hud/refresh.ts
init_esm_shims();
import { existsSync as existsSync7 } from "fs";
import { join as join12 } from "path";

// src/hud/snapshot.ts
init_esm_shims();
import { appendFileSync, existsSync as existsSync6, mkdirSync as mkdirSync3, readFileSync as readFileSync8, readdirSync as readdirSync2 } from "fs";
import { join as join11 } from "path";

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

// src/checks/report-store.ts
init_esm_shims();
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
var CHECKS_REPORT_SCHEMA_VERSION = 2;
var CHECKS_BUNDLE_SCHEMA_VERSION = 3;
var CHECKS_DOC_TYPE = "paqad.checks";
var REPORT_HEADER_KEYS = /* @__PURE__ */ new Set([...ENVELOPE_HEADER_KEYS, "generated_at"]);
function checksReportPath(projectRoot) {
  return join(projectRoot, PATHS.CHECKS_REPORT);
}
function featureChecksPath(projectRoot, dirName) {
  return join(projectRoot, featureFilePath(dirName, "checks"));
}
function atomicWriteReport(target, report) {
  mkdirSync(dirname(target), { recursive: true });
  const tmp = `${target}.tmp`;
  writeFileSync(tmp, JSON.stringify(report, null, 2) + "\n", "utf8");
  renameWithRetrySync(tmp, target);
  return target;
}
function readReportAt(target) {
  if (!existsSync(target)) return null;
  try {
    const parsed = JSON.parse(readFileSync(target, "utf8"));
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
    const reason = str(row.reason);
    return [
      {
        kind: "rule-override",
        rule,
        file,
        tool_use_id: str(row.tool_use_id),
        by: "human",
        ...reason ? { reason } : {},
        at,
        session
      }
    ];
  });
}
var EDIT_OUTCOMES = ["landed", "refused", "still-blocked"];
function isEditOutcome(value) {
  return EDIT_OUTCOMES.some((outcome) => outcome === value);
}
function overrideAwaitsOutcome(projectRoot, dirName, call) {
  const rows = readUnitFile(projectRoot, featureFilePath(dirName, "ruleOverrides")).map(
    (raw) => raw
  );
  const sameCall = (row) => row.tool_use_id === call.toolUseId;
  return rows.some(
    (row) => row.kind === "rule-override" && sameCall(row) && row.rule === call.rule && row.file === call.file
  ) && !rows.some((row) => row.kind === "rule-override-outcome" && sameCall(row));
}
function appendRuleOverrideOutcome(projectRoot, dirName, input) {
  const at = (input.now ?? (() => /* @__PURE__ */ new Date()))().toISOString();
  const row = {
    kind: "rule-override-outcome",
    rule: input.rule,
    file: input.file,
    tool_use_id: input.toolUseId,
    outcome: input.outcome,
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

// src/feature-evidence/tech-debt-index.ts
init_esm_shims();

// src/tech-debt/items.ts
init_esm_shims();
var import_yaml = __toESM(require_dist(), 1);
import { mkdirSync as mkdirSync2, readdirSync, readFileSync as readFileSync2, writeFileSync as writeFileSync2 } from "fs";
import { join as join2 } from "path";
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
  return join2(projectRoot, PATHS.TECH_DEBT_DIR);
}
function techDebtItemPath(projectRoot, id) {
  assertTechDebtId(id);
  return join2(techDebtDir(projectRoot), `${id}.md`);
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
  for (const name of names.filter((entry2) => /^TD-.+\.md$/.test(entry2)).sort()) {
    const item = parseDebtItem(readFileSync2(join2(techDebtDir(projectRoot), name), "utf8"));
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
    text = readFileSync2(path, "utf8");
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
  mkdirSync2(techDebtDir(projectRoot), { recursive: true });
  writeFileSync2(path, serializeDebtItem(item));
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
function closeDebtItem(projectRoot, id, reason) {
  const why = reason.trim();
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
import { closeSync, fstatSync, openSync, readFileSync as readFileSync4 } from "fs";
import { join as join7 } from "path";

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
function checkJudgedGate(gate, value, passDetail, failDetail, remediation, absentDetail) {
  return value === void 0 ? createDidNotRun(gate, absentDetail) : checkBooleanGate(gate, value, passDetail, failDetail, remediation);
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
import { existsSync as existsSync3, readFileSync as readFileSync3 } from "fs";
import { join as join5 } from "path";

// src/graph/import-scanner.ts
init_esm_shims();
import { existsSync as existsSync2 } from "fs";
import { readFile } from "fs/promises";
import {
  dirname as dirname2,
  extname,
  isAbsolute,
  join as join3,
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
  if (existsSync2(absCandidate)) {
    const ext = extname(absCandidate).toLowerCase();
    if (SOURCE_EXTENSIONS.has(ext)) return absCandidate;
  }
  for (const ext of RESOLUTION_EXTENSIONS) {
    const withExt = absCandidate + ext;
    if (existsSync2(withExt)) return withExt;
  }
  for (const ext of RESOLUTION_EXTENSIONS) {
    const indexFile = join3(absCandidate, "index" + ext);
    if (existsSync2(indexFile)) return indexFile;
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
      const aliasedAbs = join3(projectRoot, target, remainder);
      const resolved = resolveWithExtensions(stripExplicitExtension(aliasedAbs));
      return resolved ? toProjectRelative(projectRoot, resolved) : null;
    }
  }
  if (spec.startsWith(".") || isAbsolute(spec)) {
    const base = isAbsolute(spec) ? spec : resolve(dirname2(fromAbsFile), spec);
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
    const absFile = join3(projectRoot, relPath);
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
import { dirname as dirname3, join as join4 } from "path";

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
var LATE_GATES = [
  "stage-evidence",
  "bundle-completeness",
  "evidence-existence",
  "visual-evidence",
  "rules-loaded",
  "fix-proof",
  "unrecorded-mandatory-stages"
];
var EVERY_LANE = ["fast", "graduated", "full"];
var STAGED_LANES = ["graduated", "full"];
function entry(stage, strength, backstop, label, defaultRunner = backstop !== "late") {
  const lanes = stage === "specification" || stage === "review" || stage === "documentation_sync" ? STAGED_LANES : EVERY_LANE;
  return { stage, lanes, strength, backstop, default_runner: defaultRunner, label };
}
var GATE_ENTRIES = {
  "change-completeness": entry("development", "deterministic", "runner", "Nothing left half done"),
  "requirement-completeness": entry(
    "specification",
    "llm-judged",
    "none",
    "Every requirement is complete"
  ),
  "story-quality": entry("specification", "llm-judged", "none", "The stories are well formed"),
  "ac-test-mapping": entry("checks", "deterministic", "runner", "Every criterion has a test"),
  "spec-review": entry("specification", "llm-judged", "runner", "The spec was reviewed"),
  "architecture-compliance": entry(
    "development",
    "deterministic",
    "none",
    "The architecture rules hold"
  ),
  "code-tests-lint": entry(
    "checks",
    "deterministic",
    "checks-report",
    "Tests, types and lint pass"
  ),
  "implementation-review": entry("review", "llm-judged", "runner", "The code was reviewed"),
  "behavioral-correctness": entry(
    "checks",
    "deterministic",
    "none",
    "The behaviour matches the spec"
  ),
  "mutation-testing": entry("checks", "deterministic", "runner", "Tests catch real mutations"),
  "quality-ratchet": entry("checks", "deterministic", "runner", "Quality did not drop"),
  "database-quality": entry("development", "deterministic", "none", "Database changes are safe"),
  "module-docs-structure": entry(
    "documentation_sync",
    "deterministic",
    "runner",
    "Module docs keep their shape"
  ),
  "instructions-docs-structure": entry(
    "documentation_sync",
    "deterministic",
    "runner",
    "Instruction docs keep their shape"
  ),
  "documentation-freshness": entry(
    "documentation_sync",
    "deterministic",
    "runner",
    "Docs match the code"
  ),
  "site-map-freshness": entry(
    "documentation_sync",
    "deterministic",
    "none",
    "The site map matches the app"
  ),
  "extension-surface": entry(
    "development",
    "deterministic",
    "runner",
    "Public surface stays stable"
  ),
  duplication: entry("development", "deterministic", "runner", "No near-copies added", false),
  "stage-evidence": entry("checks", "deterministic", "late", "Every stage was recorded"),
  "bundle-completeness": entry(
    "checks",
    "deterministic",
    "late",
    "The evidence bundle is complete"
  ),
  "evidence-existence": entry("checks", "deterministic", "late", "The evidence files exist"),
  "visual-evidence": entry("checks", "deterministic", "late", "The screens were captured"),
  "rules-loaded": entry("checks", "deterministic", "late", "The rules were loaded"),
  "fix-proof": entry("development", "deterministic", "late", "The fix is proven by a test"),
  "unrecorded-mandatory-stages": entry(
    "checks",
    "deterministic",
    "late",
    "Every mandatory stage has evidence"
  )
};
var PAQAD_RECORDS = {
  "stage-evidence": "every stage of this change",
  "bundle-completeness": "the full evidence bundle",
  "unrecorded-mandatory-stages": "evidence for every mandatory stage",
  "rules-loaded": "that the rules were loaded",
  "evidence-existence": "every evidence file",
  "fix-proof": "the proof for this fix"
};
var GATE_CATALOG = Object.fromEntries(
  Object.entries(GATE_ENTRIES).map(([code, base]) => {
    const records2 = PAQAD_RECORDS[code];
    const owned = records2 ? { ...base, owner: "paqad-record", records: records2 } : { ...base, owner: "work" };
    return [code, owned];
  })
);
function gateOwner(code) {
  return gateCatalogEntry(code)?.owner ?? "work";
}
function recordGapText(code) {
  return `paqad could not record ${gateCatalogEntry(code)?.records ?? code}`;
}
function gateCatalogEntry(code) {
  return Object.hasOwn(GATE_CATALOG, code) ? GATE_CATALOG[code] : null;
}
function gateExpectedOnLane(code, lane) {
  const found = gateCatalogEntry(code);
  if (!found || !lane || !EVERY_LANE.includes(lane)) return true;
  return found.lanes.includes(lane);
}
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

// src/evidence/grading.ts
init_esm_shims();
var GATE_STRENGTH_TIER = Object.fromEntries(
  VERIFICATION_GATES.map((gate) => [gate, GATE_CATALOG[gate].strength])
);
var LATE_GATE_STRENGTH_TIER = Object.fromEntries(
  LATE_GATES.map((gate) => [gate, GATE_CATALOG[gate].strength])
);
var GATE_STATE_LABEL = {
  pass: "Pass",
  fail: "Fail",
  inconclusive: "Could not prove",
  "did-not-run": "Did not run",
  "not-required": "Not required"
};
function gateStateOf(result) {
  if (!result) return "did-not-run";
  if (result.outcome) return result.outcome;
  if (result.inconclusive) return "inconclusive";
  return result.passed ? "pass" : "fail";
}
function gradeGateResult(result) {
  const state = gateStateOf(result);
  if (state === "did-not-run" || state === "not-required") {
    return { verdict: "skipped", strength_class: "deterministic", skip_kind: state };
  }
  if (state === "inconclusive") {
    return { verdict: "inconclusive", strength_class: "blocked" };
  }
  return {
    verdict: state,
    strength_class: gateCatalogEntry(result.gate)?.strength ?? "deterministic"
  };
}

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
    const unproven = status === "pass" && gradeGateResult(result).verdict === "inconclusive";
    const failures = gate === "code-tests-lint" ? testFailures : gate === "mutation-testing" ? collectMutationFailures(mutationResult) : [];
    return {
      name: gate,
      status,
      detail: result.detail,
      remediation: result.remediation ?? null,
      failures,
      ...result.outcome ? { skip_kind: result.outcome } : {},
      ...unproven ? { could_not_prove: true } : {},
      ...result.outcome && result.skip_reason ? { skip_reason: result.skip_reason } : {},
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
  const targetPath = join4(options.project_root, VERIFICATION_EVIDENCE_RELATIVE_PATH);
  await mkdir(dirname3(targetPath), { recursive: true });
  const tempPath = `${targetPath}.tmp-${process.pid}-${Date.now()}`;
  const payload = `${JSON.stringify(evidence, null, 2)}
`;
  await writeFile(tempPath, payload, "utf8");
  await rename(tempPath, targetPath);
  return targetPath;
}
function mapGateStatus(result) {
  const { verdict } = gradeGateResult(result);
  if (verdict === "skipped" || verdict === "fail") {
    return verdict;
  }
  return verdict === "inconclusive" && !result.passed ? "inconclusive" : "pass";
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
  const dir = join5(projectRoot, ".paqad", "compliance");
  if (!existsSync3(dir)) return [];
  const files = import_fast_glob.default.sync("**/report.json", { cwd: dir, absolute: true });
  const reports = [];
  for (const file of files) {
    try {
      const report = JSON.parse(readFileSync3(file, "utf8"));
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
  for (const entry2 of input.delivery) {
    const bucket = ensurePromise(entry2.promise_id);
    for (const file of entry2.files) bucket.add(file);
  }
  for (const marker of input.markers ?? []) {
    for (const id of marker.promise_ids) ensurePromise(id).add(marker.file);
  }
  const proofsByPromise = /* @__PURE__ */ new Map();
  for (const entry2 of input.proofs) {
    const bucket = proofsByPromise.get(entry2.promise_id) ?? /* @__PURE__ */ new Set();
    for (const check of entry2.checks) bucket.add(check);
    proofsByPromise.set(entry2.promise_id, bucket);
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
import { existsSync as existsSync4 } from "fs";
import { mkdir as mkdir2, readFile as readFile2, rename as rename2, rm, writeFile as writeFile2 } from "fs/promises";
import { dirname as dirname4, join as join6 } from "path";
function traceabilityMapPath(projectRoot) {
  return join6(projectRoot, PATHS.TRACEABILITY_MAP);
}
async function writeTraceabilityMap(projectRoot, map) {
  const target = traceabilityMapPath(projectRoot);
  await mkdir2(dirname4(target), { recursive: true });
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
  if (!existsSync4(target)) return null;
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
  const abs = join7(projectRoot, file);
  let fd;
  try {
    fd = openSync(abs, "r");
  } catch {
    return [];
  }
  try {
    if (fstatSync(fd).size > MAX_TEST_FILE_BYTES) return [];
    return extractTitlesAndTags(readFileSync4(fd, "utf8"));
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
function stagesOfRow(row) {
  const listed = Array.isArray(row.stages) ? row.stages.map(String) : [];
  return [String(row.stage), ...listed].filter((stage) => STAGE_AGENT_STAGES.includes(stage));
}
function isIsolatedStageRow(row) {
  return stagesOfRow(row).length > 0;
}
function readStageAgentRows(projectRoot, dirName) {
  return readFeatureStageUnit(projectRoot, dirName).filter(
    (row) => row.kind === STAGE_AGENT_KIND && row.event_status !== "started" && isIsolatedStageRow(row)
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
function agentKey(row) {
  return typeof row.agent_id === "string" && row.agent_id.trim() !== "" ? row.agent_id.trim() : null;
}
function tokensNotRecarried(rows) {
  const latestByAgent = /* @__PURE__ */ new Map();
  let unkeyed = 0;
  for (const row of rows) {
    const tokens = count(row.tokens_not_recarried);
    const key = agentKey(row);
    if (key === null) {
      unkeyed += tokens;
    } else {
      latestByAgent.set(key, Math.max(latestByAgent.get(key) ?? 0, tokens));
    }
  }
  return [...latestByAgent.values()].reduce((sum, tokens) => sum + tokens, unkeyed);
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
    stages: new Set([...rows, ...legacy].flatMap(stagesOfRow)).size,
    tokensNotRecarried: tokensNotRecarried(rows) + legacy.reduce((sum, row) => sum + count(row.carried_history_avoided_estimate), 0),
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
import { readFileSync as readFileSync5 } from "fs";
import { join as join8 } from "path";

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
    const text = readFileSync5(join8(projectRoot, featureFilePath(dirName, "specification")), "utf8");
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

// src/verification/verdict-kind.ts
init_esm_shims();
function verdictKindFor(gates, unrecordedMandatoryStages = []) {
  if (gates.some((gate) => gate.status === "fail")) return "fail";
  if (gates.some((gate) => gate.status === "inconclusive")) return "inconclusive";
  if (unrecordedMandatoryStages.length > 0) return "inconclusive";
  return "pass";
}
var LANE_RECORD_GAP = {
  code: "lane",
  text: "paqad could not record the lane for this change",
  detail: null
};
var UNPROVEN_STATUSES = /* @__PURE__ */ new Set(["fail", "inconclusive"]);
var STAGE_WORDS = {
  ticket_intake: "Intake",
  planning: "Plan",
  specification: "Spec",
  development: "Build",
  review: "Review",
  checks: "Checks",
  documentation_sync: "Docs",
  delivery: "Deliver"
};
function unrecordedStagesGap(stages) {
  return {
    code: "unrecorded-mandatory-stages",
    text: `No record yet for: ${stages.map((stage) => STAGE_WORDS[stage] ?? stage).join(", ")}`,
    detail: null
  };
}
function verdictParts(gates, unrecordedMandatoryStages = []) {
  const work = gates.filter((gate) => gateOwner(gate.gate) === "work");
  const workReasons = work.filter((gate) => UNPROVEN_STATUSES.has(gate.status)).sort((a, b) => a.status === b.status ? 0 : a.status === "fail" ? -1 : 1).map((gate) => `${gate.gate}: ${gate.detail}`);
  const gaps = gates.filter((gate) => gateOwner(gate.gate) === "paqad-record").filter((gate) => UNPROVEN_STATUSES.has(gate.status)).map((gate) => ({ code: gate.gate, text: recordGapText(gate.gate), detail: gate.detail }));
  if (unrecordedMandatoryStages.length > 0) {
    gaps.push(unrecordedStagesGap(unrecordedMandatoryStages));
  }
  return { work_kind: verdictKindFor(work), work_reasons: workReasons, record_gaps: gaps };
}

// src/hud/change-scope.ts
init_esm_shims();
var GATE_JUDGED_AFTER = Object.fromEntries(
  Object.entries(GATE_CATALOG).map(([code, entry2]) => [code, entry2.stage])
);
var UNKNOWN_GATE_STAGE = "checks";
var EDIT_STAGES = /* @__PURE__ */ new Set(["development", "documentation_sync"]);
var STAGE_ROW_KINDS = /* @__PURE__ */ new Set(["stage_start", "stage_end"]);
var COMPLETE_END_STATUSES = /* @__PURE__ */ new Set(["completed", "inferred"]);
function qualifyHudChange(projectRoot, sessionId, now = () => /* @__PURE__ */ new Date()) {
  const workflow = readWorkflowState(projectRoot, sessionId);
  if (workflow.active?.workflow !== "feature-development") {
    return { dir: null, reason: "not-feature-route" };
  }
  const dir = currentFeature(projectRoot, sessionId, now);
  if (!dir || !isBundleMaterialized(projectRoot, dir)) {
    return finishedChange(projectRoot, sessionId, workflow.turn_started_at ?? null);
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
  if (!sessionWroteInEpisode(projectRoot, sessionId, dir, start) && !stageStillRunning(projectRoot, dir)) {
    return { dir: null, reason: "no-row-this-episode" };
  }
  return { dir, reason: "qualified" };
}
function stageStillRunning(projectRoot, dirName) {
  const rows = readFeatureStageUnit(projectRoot, dirName);
  return hasOpenUnendedStage(rows) || liveStageAgents(rows).length > 0;
}
function finishedChange(projectRoot, sessionId, turnStartedAt) {
  const none = { dir: null, reason: "no-active-change" };
  const head = readHeadRef(projectRoot);
  if (head.detached) return none;
  const dir = sessionReattachableFeature(projectRoot, sessionId, head.branch);
  if (!dir) return none;
  const start = episodeStart(readRouteTurns(projectRoot, sessionId), "feature-development") ?? turnStartedAt;
  if (!sessionWroteInEpisode(projectRoot, sessionId, dir, start) && !stageStillRunning(projectRoot, dir)) {
    return none;
  }
  return { dir, reason: "finished" };
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
var RECHECK_STAGES = /* @__PURE__ */ new Set(["checks"]);
function movesRunOn(row) {
  if (row.kind === "completion-deferred") return true;
  return STAGE_ROW_KINDS.has(String(row.kind)) && !RECHECK_STAGES.has(String(row.stage));
}
function latestStageMoveAt(projectRoot, dirName) {
  let latest = null;
  for (const row of readFeatureStageUnit(projectRoot, dirName)) {
    if (!movesRunOn(row)) continue;
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
  }).split("\0").filter((entry2) => entry2.length > 0);
}
function readChangeGit(projectRoot, baseBranch, onError, start) {
  const base = start === void 0 ? readGitState(projectRoot, baseBranch ? { baseBranch } : {}).base_commit : start?.commit ?? void 0;
  if (!base) return null;
  try {
    const files = /* @__PURE__ */ new Set();
    if (start) {
      const since = changedFilesSince(projectRoot, start);
      if (since === null) throw new Error("git could not list the changed files");
      for (const path of since) files.add(path);
    } else {
      for (const path of [
        ...gitRead(projectRoot, ["diff", "--name-only", "--relative", "-z", base]),
        ...gitRead(projectRoot, ["ls-files", "--others", "--exclude-standard", "-z"])
      ]) {
        if (!isPaqadArtifactPath(path)) files.add(path);
      }
    }
    const commitTimes = /* @__PURE__ */ new Map();
    for (const entry2 of gitRead(projectRoot, [
      "log",
      "-z",
      `--max-count=${COMMIT_TIMES_LIMIT}`,
      "--format=%H %cI",
      `${base}..HEAD`
    ])) {
      const [sha, at] = entry2.trim().split(" ");
      if (sha && at) commitTimes.set(sha, at);
    }
    return { files: [...files].sort(), commitTimes };
  } catch (error) {
    onError(error);
    return null;
  }
}
function readWorkingTreeDirty(projectRoot) {
  try {
    const paths = [
      ...gitRead(projectRoot, ["diff", "--name-only", "--relative", "-z", "HEAD"]),
      ...gitRead(projectRoot, ["ls-files", "--others", "--exclude-standard", "-z"])
    ];
    return paths.some((path) => !isPaqadArtifactPath(path));
  } catch {
    return null;
  }
}

// src/hud/done-ladder.ts
init_esm_shims();
var KNOWN_CI = /* @__PURE__ */ new Set(["pass", "fail", "pending"]);
function readCi(ci) {
  return ci !== null && KNOWN_CI.has(ci) ? ci : "unknown";
}
function computeDoneLadder(input) {
  const uncommitted = input.uncommitted === true;
  const none = { rung: null, ci: null, ci_failed: false, uncommitted };
  const earned = input.workKind === "pass" || input.workDone === true;
  if (!earned || input.checks !== "green") return none;
  if (input.prState === "open") {
    const ci = readCi(input.ci);
    if (ci === "fail") return { ...none, rung: "committed", ci, ci_failed: true };
    return { ...none, rung: "pr-open", ci };
  }
  if (input.commits > 0 && input.uncommitted === false) return { ...none, rung: "committed" };
  return { ...none, rung: "done" };
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
import { readFileSync as readFileSync6 } from "fs";
import { join as join9 } from "path";
function readJsonFile(path) {
  try {
    return JSON.parse(readFileSync6(path, "utf8"));
  } catch {
    return null;
  }
}
function asRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : null;
}
function records(value) {
  return Array.isArray(value) ? value.map(asRecord).filter((entry2) => entry2 !== null) : [];
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
function seatFrom(role, entry2, folded, recordedFindings, frozenAt) {
  const tokensUsed = num(entry2?.tokens_used);
  const fallbackState = tokensUsed !== null || (recordedFindings ?? 0) > 0 ? "done" : "seated";
  const exact = folded?.tokens ?? null;
  return {
    role,
    reason: folded?.reason ?? str2(entry2?.reason),
    origin: folded?.origin ?? str2(entry2?.origin),
    state: folded?.state ?? fallbackState,
    seated_at: folded?.seated_at ?? null,
    started_at: folded?.started_at ?? null,
    done_at: folded?.done_at ?? null,
    budget_tokens: folded?.budget_tokens ?? num(entry2?.budget_tokens),
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
    declined: records(synthesis.declined).map((entry2) => ({
      id: str2(entry2.id) ?? "",
      reason: str2(entry2.reason) ?? ""
    })),
    conflicts: records(synthesis.conflicts).filter((entry2) => entry2.ruling !== "compatible").map((entry2) => ({
      target: str2(entry2.target) ?? "",
      recommendation: str2(entry2.recommendation) ?? "",
      rationale: str2(entry2.rationale) ?? ""
    })),
    merged: records(synthesis.conflicts).filter((entry2) => entry2.ruling === "compatible").map((entry2) => ({
      target: str2(entry2.target) ?? "",
      merged_claim: str2(entry2.merged_claim) ?? "",
      rationale: str2(entry2.rationale) ?? ""
    })),
    renames: records(synthesis.renames).map((entry2) => ({
      id: str2(entry2.id) ?? "",
      target: str2(entry2.target) ?? ""
    })),
    settled: records(synthesis.auto_resolved).map((entry2) => ({
      target: str2(entry2.target) ?? "",
      chosen: str2(entry2.chosen) ?? "",
      source: str2(entry2.source) ?? ""
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
    readJsonFile(join9(projectRoot, featureFilePath(dirName, "clarification")))
  );
  const questions = asRecord(clarification?.questions);
  if (!questions) return null;
  const counts = asRecord(questions.counts);
  return {
    asked: num(counts?.asked) ?? (Array.isArray(questions.asked) ? questions.asked.length : 0),
    auto_answered: records(questions.auto_answered).map((entry2) => ({
      question: str2(entry2.question) ?? "",
      source: str2(entry2.source) ?? ""
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
  const experts = asRecord(readJsonFile(join9(projectRoot, featureFilePath(dirName, "experts"))));
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
    ...(roster ?? []).map((entry2) => str2(entry2.role) ?? "unknown"),
    ...[...folded.keys()].filter((role) => role !== CHIEF_ROLE)
  ];
  const seats = [...new Set(roles)].map(
    (role) => seatFrom(
      role,
      (roster ?? []).find((entry2) => entry2.role === role) ?? null,
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

// src/hud/stage-proof.ts
init_esm_shims();
import { existsSync as existsSync5, readFileSync as readFileSync7 } from "fs";
import { join as join10 } from "path";
var PROOF_GATE_WORDS = {
  ...GATE_STATE_LABEL,
  "not-judged": "Not judged yet"
};
var PROOF_STAGE_WORDS = {
  planning: "Plan",
  specification: "Spec",
  development: "Build",
  review: "Review",
  checks: "Checks",
  documentation_sync: "Docs"
};
var JUDGED_STATES = new Set(Object.keys(GATE_STATE_LABEL));
var FINISHED_STAGES = /* @__PURE__ */ new Set(["complete", "redone"]);
function count2(value, one, many) {
  return `${value} ${value === 1 ? one : many}`;
}
function step(id, words, detail, state) {
  return { id, words, detail, state };
}
function stageFinished(input, stage) {
  const found = input.stages.find((entry2) => entry2.stage === stage);
  return found !== void 0 && FINISHED_STAGES.has(found.state);
}
function stageStarted(input, stage) {
  const found = input.stages.find((entry2) => entry2.stage === stage);
  return found !== void 0 && found.state !== "missing";
}
function planSteps(input) {
  const plan = input.plan;
  const reuse = plan?.reuse ?? null;
  return [
    plan ? step("plan", "Plan compiled", count2(plan.steps, "step", "steps"), "done") : step("plan", "Plan compiled", null, "not-yet"),
    reuse !== null && reuse > 0 ? step(
      "reuse",
      "Reuse checked",
      count2(reuse, "source consulted", "sources consulted"),
      "done"
    ) : step("reuse", "Reuse checked", null, "not-yet")
  ];
}
function questionsStep(input) {
  const questions = input.questions;
  if (!questions) return step("questions", "Questions answered", null, "not-yet");
  if (questions.asked === 0) return step("questions", "Questions answered", "none asked", "done");
  const answered = questions.answered + questions.auto_answered;
  return step(
    "questions",
    "Questions answered",
    `${answered} of ${questions.asked}`,
    answered >= questions.asked ? "done" : "not-yet"
  );
}
function specSteps(input) {
  const spec = input.spec;
  const grounded = spec?.grounded ?? null;
  const frozen = spec?.frozen === true || stageFinished(input, "specification");
  return [
    grounded !== null && grounded > 0 ? step("grounded", "Grounded in the code", count2(grounded, "reference", "references"), "done") : step("grounded", "Grounded in the code", null, "not-yet"),
    input.experts !== null && input.experts > 0 ? step("experts", "Experts seated", count2(input.experts, "expert", "experts"), "done") : step("experts", "Experts seated", null, "not-yet"),
    questionsStep(input),
    step(
      "frozen",
      "Spec frozen",
      spec ? count2(spec.criteria, "criterion", "criteria") : null,
      frozen ? "done" : "not-yet"
    )
  ];
}
function buildSteps(input) {
  const files = stageStarted(input, "development") ? input.changedFiles ?? [] : [];
  const progress = input.planProgress;
  return [
    input.rules !== null ? step("rules", "Rules loaded", count2(input.rules, "rule applies", "rules apply"), "done") : step("rules", "Rules loaded", null, "not-yet"),
    files.length > 0 ? step("edits", "Edits made", count2(files.length, "file changed", "files changed"), "done") : step("edits", "Edits made", null, "not-yet"),
    ...progress ? [
      step(
        "built",
        "Plan steps built",
        `${progress.done} of ${progress.steps}`,
        progress.done >= progress.steps ? "done" : "not-yet"
      )
    ] : []
  ];
}
function reviewSteps(input) {
  const review = input.review;
  return [
    review ? step("review", "Review recorded", count2(review.findings, "finding", "findings"), "done") : step("review", "Review recorded", null, "not-yet")
  ];
}
function checksSteps(input) {
  const checks = input.checks;
  if (!checks) return [step("checks", "Checks run", null, "not-yet")];
  if (checks.passed) {
    return [
      step("checks", "Checks passed", `${checks.commands} of ${checks.commands} commands`, "done")
    ];
  }
  return [
    step(
      "checks",
      "Checks failed",
      `${checks.failed} of ${checks.commands} commands failed`,
      "failed"
    )
  ];
}
function docsSteps(input) {
  const files = stageStarted(input, "documentation_sync") ? input.changedFiles ?? [] : [];
  const docs = files.filter(
    (file) => toPosixPath(file).replace(/^\.\//, "").startsWith("docs/")
  ).length;
  if (docs > 0) {
    return [step("docs", "Docs updated", count2(docs, "file changed", "files changed"), "done")];
  }
  if (stageFinished(input, "documentation_sync")) {
    return [step("docs", "Docs checked", "no doc needed a change", "done")];
  }
  return [step("docs", "Docs updated", null, "not-yet")];
}
var STEPS = {
  planning: planSteps,
  specification: specSteps,
  development: buildSteps,
  review: reviewSteps,
  checks: checksSteps,
  documentation_sync: docsSteps
};
function gateRuns(code, input, recorded) {
  const entry2 = GATE_CATALOG[code];
  if (entry2.owner !== "work") return false;
  if (code === "site-map-freshness") return input.siteMap;
  if (entry2.backstop === "late") return recorded;
  return entry2.backstop !== "none";
}
function gateOnLane(code, lane) {
  const lanes = GATE_CATALOG[code].lanes;
  return lane === null || !["fast", "graduated", "full"].includes(lane) || lanes.includes(lane);
}
function gateState(row, judged) {
  if (!row) return judged ? "did-not-run" : "not-judged";
  return JUDGED_STATES.has(row.verdict) ? row.verdict : "not-judged";
}
function stageGates(stage, input) {
  const rows = new Map(input.gates.map((row) => [row.name, row]));
  return Object.keys(GATE_CATALOG).filter(
    (code) => GATE_CATALOG[code].stage === stage && gateOnLane(code, input.lane) && gateRuns(code, input, rows.has(code))
  ).map((code) => ({
    code,
    words: GATE_CATALOG[code].label,
    state: gateState(rows.get(code), input.judged)
  }));
}
function knownLane(lane) {
  return lane === "fast" || lane === "graduated" || lane === "full" ? lane : null;
}
function buildStageProof(input) {
  return laneStages(knownLane(input.lane)).map((stage) => ({
    stage,
    words: PROOF_STAGE_WORDS[stage] ?? stage,
    state: input.stages.find((entry2) => entry2.stage === stage)?.state ?? "missing",
    steps: STEPS[stage]?.(input) ?? [],
    gates: stageGates(stage, input)
  }));
}
function readRecord(path) {
  if (!existsSync5(path)) return null;
  try {
    const value = JSON.parse(readFileSync7(path, "utf8"));
    return typeof value === "object" && value !== null && !Array.isArray(value) ? value : null;
  } catch {
    return null;
  }
}
function listLength(value) {
  return Array.isArray(value) ? value.length : null;
}
function siteMapOn(projectRoot) {
  try {
    return resolveFrameworkConfig(projectRoot).features.site_map === true;
  } catch {
    return false;
  }
}
function readStageProofEvidence(projectRoot, dirName) {
  const plan = readFeaturePlan(projectRoot, dirName);
  const spec = readFeatureSpecification(projectRoot, dirName);
  const review = readFeatureReview(projectRoot, dirName);
  const report = readFeatureChecks(projectRoot, dirName);
  const experts = readRecord(join10(projectRoot, featureFilePath(dirName, "experts")));
  const commands = Array.isArray(report?.commands) ? report.commands : [];
  return {
    plan: plan ? {
      steps: listLength(plan.steps) ?? 0,
      reuse: listLength(plan.reuse?.consulted)
    } : null,
    spec: spec ? {
      grounded: listLength(spec.grounding?.references),
      criteria: listLength(spec.acceptance_criteria) ?? 0,
      frozen: spec.frozen !== null && spec.frozen !== void 0
    } : null,
    experts: listLength(experts?.roster),
    review: review ? { findings: listLength(review.findings) ?? 0 } : null,
    checks: report && report.ran ? {
      passed: report.passed,
      commands: commands.length,
      failed: commands.filter((command) => !command.passed).length
    } : null,
    siteMap: siteMapOn(projectRoot)
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
    const entry2 = { at, kind, stage, note: str3(row.note) };
    if (kind === "open" && entry2.note === null && change) Object.assign(entry2, change);
    if (kind === "stage_start") {
      entry2.agent = str3(row.agent);
      entry2.own_agent = startedInOwnAgent(entry2.agent, stage);
    }
    if (kind === "stage_end") entry2.duration_ms = stageEndDuration(rows, index, stage);
    entries.push(entry2);
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
var DECISION_QUESTION_CHARS = 80;
function shortQuestion(packet) {
  const text = str3(packet.question) ?? str3(packet.title);
  if (!text) return null;
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > DECISION_QUESTION_CHARS ? `${flat.slice(0, DECISION_QUESTION_CHARS - 1).trimEnd()}\u2026` : flat;
}
function decisionEvents(decisions) {
  const events = [];
  for (const { packet, status } of decisions) {
    const raw = packet;
    const decision = str3(raw.decision_id) ?? str3(raw.id);
    const named = decision ? { decision } : {};
    const createdAt = str3(raw.created_at);
    if (isTime(createdAt)) {
      const subject = shortQuestion(raw);
      events.push(
        event(createdAt, "decision_opened", { ...named, ...subject ? { subject } : {} })
      );
    }
    const resolvedAt = str3(raw.resolved_at);
    if (status === "resolved" && isTime(resolvedAt)) {
      events.push(event(resolvedAt, "decision_answered", named));
    }
  }
  return events;
}
function specEvents(specJson) {
  const spec = asRecord2(specJson);
  const at = str3(asRecord2(spec?.frozen)?.frozen_at);
  if (!spec || !isTime(at)) return [];
  const count3 = (value) => Array.isArray(value) ? value.length : 0;
  return [
    event(at, "spec_frozen", {
      requirements: count3(spec.behaviour),
      criteria: count3(spec.acceptance_criteria)
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
  ].filter((entry2) => isTime(entry2.at));
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
  const timeOf = (entry2) => {
    const at = Date.parse(entry2.at);
    return Number.isNaN(at) ? Number.POSITIVE_INFINITY : at;
  };
  return [...stages, ...events].map((entry2, index) => ({ entry: entry2, index, at: timeOf(entry2) })).sort((a, b) => a.at === b.at ? a.index - b.index : a.at < b.at ? -1 : 1).map(({ entry: entry2 }) => entry2);
}
function computeDeliveryPlan(input) {
  const commit = !input.commitDeclined;
  const push = input.enabled && commit;
  const ci = push && input.ciGate !== "off" && input.hasCi;
  const reason = !commit ? "Edit only \xB7 no commit" : !push ? "No push for this change" : !ci ? "No CI" : null;
  return { commit, push, pr: push, ci, merge: push, reason };
}
function repoHasCi(projectRoot) {
  try {
    return readdirSync2(join11(projectRoot, ".github", "workflows")).some(
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
function stageHasStarted(stages, stage) {
  const found = stages.find((entry2) => entry2.stage === stage);
  return found !== void 0 && found.state !== "missing";
}
function buildPlanProgress(projectRoot, dirName, changedFiles, buildStarted) {
  const steps = readFeaturePlan(projectRoot, dirName)?.steps;
  if (!buildStarted) return null;
  if (!Array.isArray(steps) || steps.length === 0 || changedFiles === null) return null;
  const changed = new Set(changedFiles.map(planFile));
  const done = steps.filter(
    (step2) => Array.isArray(step2?.files) && step2.files.some((file) => typeof file === "string" && changed.has(planFile(file)))
  ).length;
  return { steps: steps.length, done };
}
function readJsonFile2(path) {
  try {
    return JSON.parse(readFileSync8(path, "utf8"));
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
  for (const entry2 of Array.isArray(criteria) ? criteria : []) {
    const criterion = asRecord2(entry2);
    const id = str3(criterion?.criterion_id);
    const then = str3(criterion?.then);
    if (id && then) thens.set(id, then);
  }
  return thens;
}
function checksPassedSince(projectRoot, dirName, since) {
  const startedAt = Date.parse(since ?? "");
  if (Number.isNaN(startedAt)) return false;
  const report = readFeatureChecks(projectRoot, dirName);
  const reportAt = Date.parse(report?.generated_at ?? report?.recorded_at ?? "");
  return report !== null && report.ran && report.passed && reportAt >= startedAt;
}
function buildAcceptanceClaims(projectRoot, dirName, lane, changedFiles, specJson, buildStartedAt) {
  if (changedFiles === null) return [];
  const checked = checksPassedSince(projectRoot, dirName, buildStartedAt);
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
        verdict: testId ? checked ? "pass" : "mapped" : "missing"
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
    const owner = gateCatalogEntry(code)?.owner;
    return {
      name: code,
      required: verdict !== "not-required",
      strength: gateStrengthFromRun(code, row, verdict),
      verdict,
      ...owner ? { owner } : {}
    };
  });
}
function gateStrengthFromRun(code, row, verdict) {
  if (verdict === "did-not-run" || verdict === "not-required") return null;
  const tier = gateCatalogEntry(code)?.strength;
  if (tier) return tier;
  return row.strength_class === "deterministic" || row.strength_class === "llm-judged" ? row.strength_class : null;
}
function expectedGateCodes(lane) {
  return VERIFICATION_GATES.filter((code) => gateExpectedOnLane(code, lane));
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
function readingIsCurrent(ci, pr, push, head) {
  if (pr?.head_sha && ci.sha !== pr.head_sha) return false;
  if (!pr?.head_sha && head && ci.sha && ci.sha !== head) return false;
  if (push?.sha && ci.sha !== push.sha && Date.parse(ci.at) < Date.parse(push.at)) return false;
  return true;
}
function pushIsCurrent(delivery) {
  const push = delivery.push ?? null;
  if (push === null) return false;
  if (push.sha === null || delivery.head_sha === null) return true;
  return push.sha === delivery.head_sha;
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
  const settled = rawCi?.state === "pass" || rawCi?.state === "fail";
  const ci = rawCi && settled && !readingIsCurrent(rawCi, pr, delivery.push ?? null, delivery.head_sha) ? { ...rawCi, state: "pending" } : rawCi;
  return {
    commits: ownShas === null ? split?.own?.count ?? 0 : delivery.commits.filter((commit) => ownShas.has(commit.sha)).length,
    commit_list: commitList,
    commit_decision: delivery.commit_decision?.answer ?? null,
    merge_commit: delivery.merge_commit,
    push: delivery.push ?? null,
    push_current: pushIsCurrent(delivery),
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
    readJsonFile2(join11(projectRoot, featureFilePath(dirName, "clarification")))
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
  return readContractDecisions(projectRoot).filter(
    ({ packet }) => packet.change === changeKey
  );
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
  return BUNDLE_MANIFEST.map((entry2) => ({
    file: entry2.file,
    expectation: entry2.required === "always" ? "always" : entry2.required === "optional" ? "if present" : isBundleFileRequired(entry2, config) ? "on here" : "off here",
    present: existsSync6(join11(projectRoot, featureDir(dirName), entry2.file))
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
var UNJUDGED_CHANGE_GAP = "paqad could not record which change this verdict judged";
var VERDICT_KINDS = /* @__PURE__ */ new Set(["pass", "fail", "inconclusive"]);
function couldNotProve(verdict, gap) {
  const gaps = Array.isArray(verdict.record_gaps) ? verdict.record_gaps : [];
  return {
    ...verdict,
    kind: "inconclusive",
    passed: false,
    word: PAQAD_VERDICT.inconclusive,
    reasons: Array.isArray(verdict.reasons) ? verdict.reasons : [],
    ...gap ? { record_gaps: [...gaps, gap] } : {}
  };
}
function freshVerdict(projectRoot, sessionId, dirName, open) {
  const none = { verdict: null, stale: false };
  const verdict = readVerdictRecord(projectRoot, sessionId);
  if (!verdict) return none;
  const unjudged = verdict.change === null || verdict.change === void 0;
  if (!unjudged && verdict.change !== dirName) return none;
  const writtenAt = Date.parse(verdict.written_at);
  if (Number.isNaN(writtenAt)) return none;
  const editedAt = latestEditAt(projectRoot, dirName);
  if (editedAt !== null && writtenAt < editedAt) return { verdict: null, stale: true };
  const movedAt = open ? latestStageMoveAt(projectRoot, dirName) : null;
  if (movedAt !== null && writtenAt < movedAt) return { verdict: null, stale: true };
  if (unjudged) return { verdict: couldNotProve(verdict, UNJUDGED_CHANGE_GAP), stale: false };
  return {
    verdict: VERDICT_KINDS.has(verdict.kind) ? verdict : couldNotProve(verdict, null),
    stale: false
  };
}
function ladderChecks(projectRoot, dirName, verdict) {
  const report = readFeatureChecks(projectRoot, dirName);
  const reportAt = Date.parse(report?.generated_at ?? report?.recorded_at ?? "");
  const verdictAt = Date.parse(verdict?.written_at ?? "");
  if (report && Number.isFinite(reportAt) && Number.isFinite(verdictAt) && reportAt > verdictAt) {
    return report.ran && report.passed ? "green" : "red";
  }
  const row = readFeatureEvidence(projectRoot, dirName).filter((entry2) => entry2.engine === "verification-gate" && entry2.code === "code-tests-lint").at(-1);
  const gate = row ? readGateVerdict(row) : null;
  if (gate === "pass") return "green";
  if (gate === "fail") return "red";
  return "unknown";
}
function workKindOf(verdict) {
  if (!verdict) return null;
  return verdict.work_kind ?? verdict.kind;
}
function lowerFirst(text) {
  return text.length > 0 ? `${text[0].toLowerCase()}${text.slice(1)}` : text;
}
function unprovenLines(gates, verdict) {
  const named = new Set(
    (verdict?.work_reasons ?? []).map((reason) => reason.slice(0, reason.indexOf(":")))
  );
  return gates.filter(
    (gate) => gate.verdict === "inconclusive" && gate.owner !== "paqad-record" && !named.has(gate.name)
  ).map(
    (gate) => `paqad could not prove ${lowerFirst(gateCatalogEntry(gate.name)?.label ?? gate.name)}`
  );
}
function verdictFromEarlierTurn(verdict, workflow, turnRunning) {
  if (!verdict || !turnRunning) return false;
  const turnAt = Date.parse(workflow.turn_started_at ?? "");
  const writtenAt = Date.parse(verdict.written_at);
  return Number.isFinite(turnAt) && Number.isFinite(writtenAt) && writtenAt < turnAt;
}
function recordGaps(verdict, laneRecorded) {
  const gaps = new Set(Array.isArray(verdict?.record_gaps) ? verdict.record_gaps : []);
  if (!laneRecorded) gaps.add(LANE_RECORD_GAP.text);
  return [...gaps];
}
function buildRepairs(projectRoot, dirName) {
  return readFeatureStageUnit(projectRoot, dirName).filter((row) => row.kind === RECORD_REPAIR_KIND && typeof row.reason === "string").map((row) => ({ what: String(row.reason), at: rowRecordedAt(row) }));
}
var STAGE_WORDS2 = {
  ticket_intake: "Intake",
  planning: "Plan",
  specification: "Spec",
  development: "Build",
  review: "Review",
  checks: "Checks",
  documentation_sync: "Docs",
  delivery: "Deliver"
};
function stageWord(stage) {
  return STAGE_WORDS2[stage] ?? stage;
}
var FAILURE_PHRASES = {
  "code-tests-lint": "Tests, types or lint failed",
  "spec-review": "The spec review found a blocking defect",
  "implementation-review": "The code review found a blocking issue",
  "quality-ratchet": "Quality dropped below the baseline",
  duplication: "A near-copy of existing code was added",
  "documentation-freshness": "The docs no longer match the code",
  "ac-test-mapping": "A criterion has no test",
  "change-completeness": "Something is left half done",
  "mutation-testing": "The tests missed real mutations",
  "module-docs-structure": "A module doc lost its shape",
  "instructions-docs-structure": "An instruction doc lost its shape",
  "extension-surface": "The public surface changed",
  "architecture-compliance": "An architecture rule is broken",
  "database-quality": "A database change is unsafe",
  "behavioral-correctness": "The behaviour does not match the spec",
  "requirement-completeness": "A requirement is incomplete",
  "story-quality": "A story is not well formed",
  "site-map-freshness": "The site map no longer matches the app"
};
function failurePhrase(code) {
  return FAILURE_PHRASES[code] ?? `${code} failed`;
}
var RUNG_WORDS = {
  done: "Done",
  committed: "Committed",
  "pr-open": "PR open"
};
var BUILD_ENDED_STATES = /* @__PURE__ */ new Set(["complete", "redone"]);
var LANE_STAGE_ENDED_STATES = /* @__PURE__ */ new Set([
  "complete",
  "redone",
  "inconclusive",
  "failed"
]);
function computeHudFlags(input) {
  const flags = [];
  const buildEnded = input.stages.some(
    (stage) => stage.stage === "development" && BUILD_ENDED_STATES.has(stage.state) && stage.started_at !== null
  );
  if (buildEnded && !input.rulesRecorded) {
    flags.push({ id: "rules-not-loaded", text: "The rules for this change were never loaded." });
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
  const laneStageEnded = input.stages.some(
    (stage) => stage.mandatory && LANE_STAGE_ENDED_STATES.has(stage.state)
  );
  if (input.isolationStatus === "expected" && input.isolatedStages === 0 && (input.stageAgentsSeen ?? 0) === 0 && laneStageEnded) {
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
  return flags;
}
var WAITING_FOR_ANSWER = "Waiting for your answer";
function prName(ship) {
  const number = ship?.pr?.number;
  return typeof number === "number" ? `PR #${number}` : "The PR";
}
function runningWords(input, stage) {
  switch (stage) {
    case "ticket_intake":
      return "Reading the ticket";
    case "planning":
      return "Planning the change";
    case "specification": {
      const table = input.table;
      if (table?.seats.some((seat) => seat.state === "writing")) {
        return "The High Table is writing its notes";
      }
      if (table?.chief?.state === "writing") return "The chief architect is ruling";
      return "Writing the spec";
    }
    case "development":
      return input.plan ? `${input.plan.done} of ${input.plan.steps} plan steps built` : "Building";
    case "review":
      return "Reviewing the change";
    case "checks":
      return "Running the checks";
    case "documentation_sync":
      return "Syncing the docs";
    case "delivery":
      return "Delivering";
    default:
      return `${stageWord(stage)} is running`;
  }
}
function workFailure(input) {
  const expected = input.gatesExpected ?? [];
  const rank = (name) => {
    const index = expected.indexOf(name);
    return index === -1 ? expected.length : index;
  };
  const [first, ...rest] = (input.gates ?? []).filter((gate) => gate.required && gate.verdict === "fail" && gate.owner !== "paqad-record").map((gate) => gate.name).sort((a, b) => rank(a) - rank(b));
  if (!first) return null;
  return rest.length > 0 ? `${failurePhrase(first)} and ${rest.length} more` : failurePhrase(first);
}
function inconclusiveHeadline(verdict, gap) {
  const reason = (verdict.work_reasons ?? verdict.reasons ?? [])[0];
  return headlineRow(
    13,
    "warn",
    reason ? `Inconclusive: ${reason}` : "Inconclusive",
    "Inconclusive",
    gap
  );
}
function gapLine(gaps) {
  const [first] = gaps;
  if (!first) return {};
  return { gap: gaps.length > 1 ? `${first} and ${gaps.length - 1} more` : first };
}
function headlineRow(row, tone, text, word, extra = {}) {
  return { text, tone, row, word, ...extra };
}
function settledHeadline(stages) {
  const next = stages.find((stage) => stage.mandatory && stage.state === "missing");
  const done = [...stages].reverse().find((stage) => stage.state === "complete" || stage.state === "redone");
  if (done && next) {
    return headlineRow(
      18,
      "neutral",
      `${stageWord(done.stage)} done. Next: ${stageWord(next.stage)}`,
      "Working"
    );
  }
  if (!done) {
    return headlineRow(19, "neutral", `Next: ${next ? stageWord(next.stage) : "Plan"}`, "Working");
  }
  return headlineRow(20, "neutral", "Every stage is recorded. Waiting for the verdict.", "Working");
}
function idleHeadline(input) {
  if (input.paused > 0) {
    return { text: 'A change is paused. Say "continue" to pick it up.', tone: "neutral" };
  }
  if (input.route && input.route !== "no-workflow") {
    return { text: `Working on ${input.route.replace(/-/g, " ")}.`, tone: "working" };
  }
  return { text: "Ready. No change in progress.", tone: "neutral" };
}
function workIsDone(input) {
  if (!input.verdict || input.checks !== "green") return false;
  if (input.stages.some((stage) => stage.state === "running")) return false;
  const ended = input.stages.filter((stage) => stage.mandatory).every((stage) => BUILD_ENDED_STATES.has(stage.state));
  return ended && workFailure({ gates: input.gates }) === null;
}
function notProvenLines(verdict) {
  if (workKindOf(verdict) === "pass") return [];
  return (verdict.work_reasons ?? verdict.reasons ?? []).map(
    (reason) => reason.startsWith("paqad ") ? reason : `paqad could not prove ${reason}`
  );
}
var WATCHING_CI = "Coding Done: Watching CI";
function doneHeadline(input, ladder, gaps) {
  const rung = ladder?.rung ?? "done";
  const declined = input.ship?.commit_decision === "decline";
  const note = rung === "done" && ladder?.uncommitted ? declined ? "left uncommitted, as you asked" : "not committed" : null;
  return headlineRow(16, "good", RUNG_WORDS.done, RUNG_WORDS.done, {
    rung,
    ...note ? { note } : {},
    ...gapLine(gaps)
  });
}
function computeHudHeadline(input) {
  if (input.pendingDecisions > 0) {
    return headlineRow(6, "needs-you", WAITING_FOR_ANSWER, WAITING_FOR_ANSWER);
  }
  if (!input.active) return idleHeadline(input);
  const ship = input.ship ?? null;
  const ladder = input.ladder ?? null;
  const pr = prName(ship);
  const gaps = [...input.recordGaps ?? [], ...input.unproven ?? []];
  const gap = gapLine(gaps);
  if (ship?.pr_state === "closed") return headlineRow(9, "warn", `${pr} was closed`, "PR closed");
  if (ship?.pr_state === "open" && ship.ci?.state === "fail") {
    return headlineRow(10, "bad", `CI failed on ${pr}`, "CI failed", {
      ...ladder?.rung ? { rung: ladder.rung } : {}
    });
  }
  if (ship?.push?.state === "failed")
    return headlineRow(11, "bad", "The push failed", "Push failed");
  const running = input.stages.find((stage) => stage.state === "running");
  const held = running && (input.verdictEarlier || input.stageAgentLive);
  const verdict = held ? null : input.verdict;
  const work = workKindOf(verdict);
  const failure = verdict && work === "fail" ? workFailure(input) : null;
  if (failure) return headlineRow(12, "bad", failure, "Needs your attention", gap);
  if (work === "pass" && input.checks === "red") {
    return headlineRow(12, "bad", failurePhrase("code-tests-lint"), "Needs your attention", gap);
  }
  if (verdict && workIsDone({ ...input, verdict })) {
    const done = doneHeadline(input, ladder, [...gaps, ...notProvenLines(verdict)]);
    if (ship?.pr_state === "open" && ship.ci?.state === "pending") {
      return headlineRow(14, "good", WATCHING_CI, RUNG_WORDS.done, {
        ...done.rung ? { rung: done.rung } : {},
        ...done.gap ? { gap: done.gap } : {}
      });
    }
    return done;
  }
  if (verdict && (work === "inconclusive" || work === "fail")) {
    return inconclusiveHeadline(verdict, gap);
  }
  if (running) {
    return headlineRow(15, "working", runningWords(input, running.stage), "Working", {
      ...running.started_at ? { clock_from: running.started_at } : {}
    });
  }
  if (work === "pass" && input.checks !== "green") {
    return headlineRow(
      13,
      "warn",
      "Inconclusive: no checks result for this change",
      "Inconclusive",
      gap
    );
  }
  const missing = input.stages.some((stage) => stage.mandatory && stage.state === "missing");
  if (verdict && !missing) return inconclusiveHeadline(verdict, gap);
  return settledHeadline(input.stages);
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
  const paused = workflow.paused.map((entry2) => ({
    workflow: entry2.workflow,
    lane: entry2.lane ?? null
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
        paused: paused.length,
        decisions: decisions.pending
      }),
      change: null,
      paused,
      stages: [],
      timeline: [],
      table: null,
      claims: [],
      gates: [],
      gates_expected: expectedGateCodes(workflow.active?.lane ?? null),
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
  const reading = freshVerdict(projectRoot, sessionId, dirName, scope.reason === "qualified");
  const verdict = reading.verdict;
  const receiptPath = hudReceiptPath(projectRoot, sessionId);
  const receipt = verdict && existsSync6(receiptPath) ? { path: receiptPath } : null;
  const record = readFeatureRecord(projectRoot, dirName);
  const fold = foldFeature(projectRoot, sessionId, dirName);
  const stages = buildStages(projectRoot, dirName, fold);
  const gates = buildGates(projectRoot, dirName);
  const specJson = readJsonFile2(join11(projectRoot, featureFilePath(dirName, "specification")));
  const lane = fold.lane ?? record?.lane ?? workflow.active?.lane ?? null;
  const table = withTrackRecords(
    projectRoot,
    dirName,
    buildHighTableView(projectRoot, dirName, specJson, lane)
  );
  const rulesLoaded = readRulesLoaded(projectRoot, dirName);
  const delivery = readFeatureDelivery(projectRoot, dirName);
  const policy = readPolicy(projectRoot);
  const startPoint = readChangeStartPoint(projectRoot, dirName, policy?.process.pr.base ?? null);
  const changeGit = readChangeGit(
    projectRoot,
    policy?.process.pr.base ?? null,
    (error) => logHudWriteError(projectRoot, "changed files", error),
    startPoint
  );
  const changedFiles = changeGit?.files ?? null;
  const ship = buildShip(delivery, changedFiles ? changedFiles.length : null);
  const isolationStatus = stageIsolationStatus(projectRoot, sessionId, dirName);
  const isolationSummary = summarizeStageIsolation(projectRoot, dirName);
  const findings = buildFindings(projectRoot, dirName);
  const checks = ladderChecks(projectRoot, dirName, verdict);
  const ladder = computeDoneLadder({
    workKind: workKindOf(verdict),
    checks,
    uncommitted: readWorkingTreeDirty(projectRoot),
    commits: Math.max(ship.commits, changeGit?.commitTimes.size ?? 0),
    prState: ship.pr_state,
    ci: ship.ci?.state ?? null,
    workDone: workIsDone({ stages, checks, verdict, gates })
  });
  const buildStage = stages.find((entry2) => entry2.stage === "development");
  const plan = buildPlanProgress(
    projectRoot,
    dirName,
    changedFiles,
    stageHasStarted(stages, "development")
  );
  const gatesExpected = expectedGateCodes(lane);
  const gaps = recordGaps(verdict, (fold.lane ?? record?.lane ?? null) !== null);
  const questions = buildQuestions(projectRoot, dirName);
  const proof = buildStageProof({
    ...readStageProofEvidence(projectRoot, dirName),
    lane,
    stages,
    gates,
    judged: verdict !== null,
    planProgress: plan,
    questions,
    rules: rulesLoaded ? rulesLoaded.applicable_rules.length : null,
    changedFiles
  });
  const flags = computeHudFlags({
    stages,
    gates,
    rulesRecorded: rulesLoaded !== null,
    tableSkipped: table?.skipped ?? false,
    tableLate: table?.met_after_freeze ?? false,
    isolationStatus,
    isolatedStages: isolationSummary?.stages ?? 0,
    stageAgentsSeen: readFeatureStageUnit(projectRoot, dirName).filter(
      (row) => row.kind === STAGE_AGENT_KIND
    ).length,
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
      paused: paused.length,
      ladder,
      checks,
      decisions: decisions.pending,
      table,
      ship,
      gates,
      gatesExpected,
      plan,
      recordGaps: stages.some((stage) => stage.state === "running") ? [] : gaps,
      unproven: unprovenLines(gates, verdict),
      verdictEarlier: verdictFromEarlierTurn(verdict, workflow, options.turnRunning === true),
      stageAgentLive: liveStageAgents(readFeatureStageUnit(projectRoot, dirName)).length > 0
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
      ...buildAcceptanceClaims(
        projectRoot,
        dirName,
        lane,
        changedFiles,
        specJson,
        buildStage?.started_at ?? null
      )
    ],
    gates,
    gates_expected: gatesExpected,
    flags,
    rules: {
      recorded: rulesLoaded !== null,
      applicable: rulesLoaded ? rulesLoaded.applicable_rules.length : null,
      loaded_at: rulesLoaded?.recorded_at ?? null
    },
    findings,
    decisions,
    questions,
    last_block: lastBlock,
    delivery_plan: buildDeliveryPlan(projectRoot, policy, delivery),
    plan,
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
    })),
    ...optionalList("record_gaps", gaps),
    ...optionalList("repairs", buildRepairs(projectRoot, dirName)),
    ...ladder.rung ? { rung: ladder.rung } : {},
    ...reading.stale ? { verdict_stale: true } : {},
    start_point: startPoint ? {
      source: startPoint.source,
      base: startPoint.base,
      files_known: startPoint.worktree !== null
    } : null,
    proof
  };
}
function optionalList(key, list) {
  return list.length > 0 ? { [key]: list } : {};
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
    const logs = join11(projectRoot, ".paqad", "logs");
    mkdirSync3(logs, { recursive: true });
    appendFileSync(
      join11(logs, "hook-failures.log"),
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
    if (!existsSync7(join12(projectRoot, PATHS.FRAMEWORK_PATH))) return null;
    if (!isFrameworkEnabledForRoot(projectRoot, env)) return null;
  } catch {
    return null;
  }
  return writeHudSnapshotSafe(projectRoot, sessionHint, source);
}

export {
  VERIFICATION_GATES,
  LATE_GATES,
  GATE_CATALOG,
  gateOwner,
  recordGapText,
  gateCatalogEntry,
  gateExpectedOnLane,
  BACKSTOP_VERIFICATION_ORIGINS,
  isBackstopVerificationOrigin,
  VERIFICATION_EVIDENCE_SCHEMA_VERSION,
  EVIDENCE_GATE_STATUSES,
  EVIDENCE_OVERALL_STATUSES,
  EVIDENCE_FAILURE_CATEGORIES,
  verdictKindFor,
  LANE_RECORD_GAP,
  unrecordedStagesGap,
  verdictParts,
  readFixProofRows,
  appendFixProofRow,
  countedRedRow,
  FIX_PROOF_STATE_LABEL,
  foldFixProofState,
  CHECKS_REPORT_SCHEMA_VERSION,
  writeChecksReport,
  writeFeatureChecks,
  readChecksReport,
  readFeatureChecks,
  appendRuleOverride,
  readRuleOverrides,
  isEditOutcome,
  overrideAwaitsOutcome,
  appendRuleOverrideOutcome,
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
  checkBooleanGate,
  checkJudgedGate,
  createPass,
  createFail,
  createInconclusive,
  createNotRequired,
  createDidNotRun,
  AC_ID_PATTERN,
  extractAcIdFromIssue,
  collectObservedAcIds,
  AcTestMappingGate,
  extractImportSpecifiers,
  scanImports,
  discoverSourceRoots,
  discoverModuleHealth,
  GATE_STATE_LABEL,
  gradeGateResult,
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
  HUD_SNAPSHOT_SCHEMA,
  TIMELINE_ROWS,
  TIMELINE_COMMITS,
  buildTimeline,
  buildRecordEvents,
  computeDeliveryPlan,
  TRACK_RECORD_BUNDLES,
  buildTrackRecords,
  expectedGateCodes,
  buildShip,
  workKindOf,
  FAILURE_PHRASES,
  failurePhrase,
  RUNG_WORDS,
  computeHudFlags,
  WAITING_FOR_ANSWER,
  workIsDone,
  WATCHING_CI,
  computeHudHeadline,
  TURN_END_SOURCES,
  buildHudSnapshot,
  writeHudSnapshot,
  writeHudSnapshotSafe,
  HUD_REFRESH_VERBS,
  isHudRefreshVerb,
  refreshHudSnapshot
};
