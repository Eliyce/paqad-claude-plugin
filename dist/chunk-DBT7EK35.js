import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  ENVELOPE_HEADER_KEYS,
  UNTITLED_FEATURE_TITLE,
  buildFeatureRecord,
  rowRecordedAt
} from "./chunk-6NWB7L6Y.js";
import {
  readGitState,
  readHeadRef
} from "./chunk-AINYJ3Q2.js";
import {
  STAGE_ORDER,
  stageForAgentName,
  stripPluginAgentNamespace
} from "./chunk-2C2NPUNI.js";
import {
  LANES,
  require_ajv
} from "./chunk-Z6XFBT4B.js";
import {
  renameWithRetrySync
} from "./chunk-ER3R2ZPY.js";
import {
  readUnitFile
} from "./chunk-6JQRLS2K.js";
import {
  readSessionControl,
  writeSessionControl
} from "./chunk-F5SGKBUG.js";
import {
  FEATURE_DOC_SCHEMA_VERSION,
  FEATURE_DOC_TYPE,
  PLAN_DOC_TYPE,
  REVIEW_DOC_TYPE,
  ULID_BODY,
  featureFilePath,
  isFeatureDirName,
  parseFeatureDirName
} from "./chunk-TQS7EXFH.js";
import {
  PATHS
} from "./chunk-I7RXYXFH.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/feature-evidence/adoption.ts
init_esm_shims();
import { readFileSync as readFileSync2 } from "fs";
import { join as join3 } from "path";

// src/stage-evidence/stage-agent-holds.ts
init_esm_shims();

// src/stage-evidence/agent-identity.ts
init_esm_shims();
var ORCHESTRATOR_AGENT = "orchestrator";
var BACKSTOP_WRITER = "backstop";
function agentForWriter(adapter) {
  return adapter === BACKSTOP_WRITER ? BACKSTOP_WRITER : void 0;
}
function nonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}
function resolveAgentIdentity(input = {}) {
  return nonEmpty(input.agentType) ?? nonEmpty(input.agentId) ?? ORCHESTRATOR_AGENT;
}
function isStageAgent(agent) {
  return typeof agent === "string" && agent.startsWith("paqad-") && stageForAgentName(agent) !== null;
}

// src/stage-evidence/fold.ts
init_esm_shims();

// src/stage-evidence/report-repair.ts
init_esm_shims();

// src/stage-evidence/types.ts
init_esm_shims();
var STAGE_EVIDENCE_DOC_TYPE = "paqad.stage-evidence";
var STAGE_EVIDENCE_SCHEMA_VERSION = 3;
var STAGE_EVIDENCE_SCHEMA_V2 = 2;
var STAGE_AGENT_KIND = "stage-agent";
var SPEC_STEP_KIND = "spec-step";
var SPEC_CORRECTION_KIND = "spec-correction";
var COMPLETION_DEFERRED_KIND = "completion-deferred";
var RECORD_REPAIR_KIND = "record-repair";
var STAGE_HANDBACK_KIND = "stage-handback";
var RECIPE_INJECTED_KIND = "recipe-injected";
var SKILL_USED_KIND = "skill-used";
var REPORT_SOURCES = ["handback", "text", "rollout", "none"];
var SPEC_STEP_OUTCOMES = ["complete", "skipped", "redone"];
var STAGE_FAMILY_KIND_LIST = [
  "open",
  "stage_start",
  "stage_end",
  "verify",
  "close"
];
var STAGE_FAMILY_KINDS = new Set(STAGE_FAMILY_KIND_LIST);

// src/stage-evidence/report-repair.ts
var REPORT_REPAIR_REASON = "report read from handback after the parser fix";
var ENTRY = /^(\S+) ([a-z_+]+): (DONE_WITH_CONCERNS|DONE|NEEDS_CONTEXT|BLOCKED) \((handback|text)\)$/u;
function isReportRepairRow(row) {
  return row.kind === RECORD_REPAIR_KIND && row.reason === REPORT_REPAIR_REASON;
}
function readRepairedReports(rows) {
  const byAgent = /* @__PURE__ */ new Map();
  for (const row of rows) {
    if (!isReportRepairRow(row) || typeof row.note !== "string") continue;
    for (const part of row.note.split("; ")) {
      const match = ENTRY.exec(part.trim());
      if (match === null) continue;
      byAgent.set(match[1], {
        agent_id: match[1],
        stages: match[2].split("+"),
        report_status: match[3],
        source: match[4]
      });
    }
  }
  return [...byAgent.values()];
}

// src/stage-evidence/stages.ts
init_esm_shims();
var STAGE_EVIDENCE_STAGES = [...STAGE_ORDER];
var MANDATORY_STAGES = [
  "planning",
  "specification",
  "development",
  "review",
  "checks",
  "documentation_sync"
];
var PRE_CODE_STAGES = MANDATORY_STAGES.slice(
  0,
  MANDATORY_STAGES.indexOf("development")
);
var EDIT_STAGES = ["development", "checks", "documentation_sync"];
function isEditStage(stage) {
  return EDIT_STAGES.includes(stage);
}
var FAST_LANE_STAGES = ["planning", "development", "checks"];
function laneStages(lane2) {
  return lane2 === "fast" ? [...FAST_LANE_STAGES] : [...MANDATORY_STAGES];
}
function isLaneStage(lane2, stage) {
  return laneStages(lane2).includes(stage);
}
function requiredPreCodeStages(lane2) {
  return laneStages(lane2).filter((stage) => PRE_CODE_STAGES.includes(stage));
}
var COMPLETION_ANCHORED_STAGES = ["review"];
var ARTIFACT_BEARING_STAGES = ["planning", "specification", "review"];
function isKnownStage(stage) {
  return STAGE_EVIDENCE_STAGES.includes(stage);
}
function isArtifactBearingStage(stage) {
  return ARTIFACT_BEARING_STAGES.includes(stage);
}
function isCompletionAnchoredStage(stage) {
  return COMPLETION_ANCHORED_STAGES.includes(stage);
}
function isMandatoryStage(stage) {
  return MANDATORY_STAGES.includes(stage);
}
function stageIndex(stage) {
  return STAGE_EVIDENCE_STAGES.indexOf(stage);
}

// src/stage-evidence/fold.ts
function foldRowsWithKey(rows, identity) {
  const { sessionId, changeKey: change_key, promptOrdinal: ordinal } = identity;
  const stageRows2 = rows.filter((row) => STAGE_FAMILY_KINDS.has(String(row.kind)));
  const lane2 = identity.lane !== void 0 ? identity.lane : readRecordedLane(stageRows2);
  const stages = STAGE_EVIDENCE_STAGES.map((stage) => foldStage(stage, stageRows2, lane2));
  const orderingViolations = computeOrderingViolations(stages);
  const required = stages.filter((stage) => isLaneStage(lane2, stage.stage));
  const isDone = (stage) => stage.state === "complete" || stage.state === "redone";
  const passed = required.filter(isDone);
  const missing = required.filter((stage) => !isDone(stage) && stage.state !== "not-applicable").map((stage) => stage.stage);
  const hadRedo = stages.some((stage) => stage.state === "redone");
  const verdict = computeVerdict(stageRows2, missing, orderingViolations.length > 0, hadRedo);
  const repaired = readRepairedReports(rows);
  return {
    session_id: sessionId,
    change_key,
    prompt_ordinal: ordinal,
    stages,
    lane: lane2,
    completeness: {
      verdict,
      missing_stages: missing,
      required_passed: passed.length,
      required_total: required.length,
      ordering_violations: orderingViolations
    },
    ...repaired.length > 0 ? { repaired_reports: repaired } : {}
  };
}
function foldStage(stage, rows, lane2) {
  const events = rows.filter((row) => row.stage === stage);
  const start = lastOf(events, "stage_start");
  const lastEnd = lastOf(events, "stage_end");
  const end = lastEnd && startedAfterLastEnd(events) ? void 0 : lastEnd;
  const startedAt = start ? rowRecordedAt(start) : null;
  const endedAt = end ? rowRecordedAt(end) : null;
  let durationMs = null;
  let unreliable = false;
  if (startedAt && endedAt) {
    durationMs = Date.parse(endedAt) - Date.parse(startedAt);
    if (!Number.isFinite(durationMs) || durationMs < 0) {
      durationMs = 0;
      unreliable = true;
    }
  }
  return {
    stage,
    state: events.length === 0 && isMandatoryStage(stage) && !isLaneStage(lane2, stage) ? "not-applicable" : deriveState(stage, events, start, end),
    started_at: startedAt,
    ended_at: endedAt,
    duration_ms: durationMs,
    duration_unreliable: unreliable,
    evidence_source: coerceEvidenceSource((end ?? start)?.evidence_source),
    artifact_digest: typeof end?.artifact_digest === "string" ? end.artifact_digest : null
  };
}
function startedAfterLastEnd(events) {
  let lastStart = -1;
  let lastEnd = -1;
  events.forEach((row, index) => {
    if (row.kind === "stage_start") lastStart = index;
    if (row.kind === "stage_end") lastEnd = index;
  });
  return lastStart > lastEnd;
}
function readRecordedLane(rows) {
  const openRow = rows.find((row) => row.kind === "open");
  const value = openRow?.lane;
  return value === "fast" || value === "graduated" || value === "full" ? value : null;
}
function coerceEvidenceSource(value) {
  return value === "live-mark" || value === "inferred-artifact" || value === "inferred-git" || value === "redo" ? value : null;
}
function deriveState(stage, events, start, end) {
  const status = (end ?? start)?.event_status;
  if (status === "skipped") return "skipped";
  if (status === "failed") return "failed";
  if (events.some((event) => event.event_status === "redone")) return "redone";
  if (end) {
    if (!start && end.evidence_source !== "inferred-git") return "inconclusive";
    if (isArtifactBearingStage(stage) && typeof end.artifact_digest !== "string") {
      return "inconclusive";
    }
    return "complete";
  }
  if (start) return "running";
  return "missing";
}
function computeOrderingViolations(stages) {
  const violations = [];
  const ran = stages.filter((stage) => stage.started_at);
  for (const stage of ran) {
    if (stage.duration_unreliable) {
      violations.push({ before: stage.stage, after: stage.stage });
    }
  }
  for (const a of ran) {
    for (const b of ran) {
      if (isCompletionAnchoredStage(a.stage) || isCompletionAnchoredStage(b.stage)) {
        continue;
      }
      if (isEditStage(a.stage) && isEditStage(b.stage)) {
        continue;
      }
      if (stageIndex(a.stage) < stageIndex(b.stage) && a.ended_at && b.started_at) {
        if (Date.parse(b.started_at) < Date.parse(a.ended_at)) {
          violations.push({ before: a.stage, after: b.stage });
        }
      }
    }
  }
  return violations;
}
function computeVerdict(rows, missing, hasOrderingViolation, hadRedo) {
  if (rows.length === 0) {
    return "cannot-verify";
  }
  if (missing.length > 0) {
    return "incomplete";
  }
  if (hasOrderingViolation) {
    return "incomplete";
  }
  return hadRedo ? "recovered" : "complete";
}
var RIGID_STAGE_FILE = [
  { stage: "planning", key: "plan" },
  { stage: "specification", key: "specification" }
];
function augmentWithBundleArtifacts(fold, presence) {
  const missing = [...fold.completeness.missing_stages];
  for (const { stage, key } of RIGID_STAGE_FILE) {
    if (!presence[key] && isLaneStage(fold.lane, stage) && !missing.includes(stage)) {
      missing.push(stage);
    }
  }
  if (missing.length === fold.completeness.missing_stages.length) {
    return fold;
  }
  const verdict = fold.completeness.verdict === "complete" || fold.completeness.verdict === "recovered" ? "incomplete" : fold.completeness.verdict;
  return {
    ...fold,
    completeness: { ...fold.completeness, verdict, missing_stages: missing }
  };
}
function lastOf(events, kind) {
  let found;
  for (const event of events) {
    if (event.kind === kind) {
      found = event;
    }
  }
  return found;
}

// src/stage-evidence/stage-agent-holds.ts
function rowTime(row) {
  return Date.parse(rowRecordedAt(row) ?? "");
}
function stringOrNull(value) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}
var STAGE_AGENT_SESSION_RELEASE = "a new session began, so stage agents left from the last session no longer hold the turn-end judgement";
function stageAgentIdentity(agent, agentId) {
  const name = stringOrNull(agent);
  return {
    agent: name === null ? null : stripPluginAgentNamespace(name),
    agentId: stringOrNull(agentId)
  };
}
function identityOf(row) {
  return stageAgentIdentity(row.agent, row.agent_id);
}
function startedByAnotherAgent(starter, holder) {
  if (starter.agentId !== null) return starter.agentId !== holder.agentId;
  return isStageAgent(starter.agent) && starter.agent !== holder.agent;
}
function releasesStartedAgent(later, stage, holder, startedHash) {
  const laterStage = stringOrNull(later.stage);
  const laterId = stringOrNull(later.agent_id);
  const agentId = holder.agentId;
  if (later.kind === STAGE_AGENT_KIND && later.event_status === "started") {
    return laterStage === stage && (agentId === null || laterId !== agentId);
  }
  if (later.kind === STAGE_AGENT_KIND) {
    return agentId !== null && laterId !== null ? laterId === agentId : laterStage === stage;
  }
  if (later.kind === "stage_end") return laterStage === stage;
  if (later.kind === "stage_start") {
    return laterStage !== null && laterStage !== stage && laterId === null && !startedByAnotherAgent(identityOf(later), holder);
  }
  if (later.kind !== RECORD_REPAIR_KIND || later.reason !== STAGE_AGENT_SESSION_RELEASE) {
    return false;
  }
  return !Array.isArray(later.releases) || later.releases.includes(startedHash);
}
function liveStageAgents(rows) {
  const live = [];
  rows.forEach((row, index) => {
    if (row.kind !== STAGE_AGENT_KIND || row.event_status !== "started") return;
    const stage = stringOrNull(row.stage);
    if (stage === null) return;
    if (Number.isNaN(rowTime(row))) return;
    const holder = identityOf(row);
    const released = rows.slice(index + 1).some((later) => releasesStartedAgent(later, stage, holder, row.content_hash));
    if (released) return;
    live.push({
      stage,
      agent: holder.agent,
      agentId: holder.agentId,
      startedAt: rowRecordedAt(row),
      sessionId: row.session_id,
      hostPid: typeof row.host_pid === "number" ? row.host_pid : null,
      rowHash: row.content_hash
    });
  });
  return live;
}
var RUNNING_STAGE_RECENT_MS = 30 * 60 * 1e3;
function newestRowTimes(rows) {
  const newest = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const at = rowTime(row);
    if (Number.isNaN(at)) continue;
    if (at > (newest.get(row.session_id) ?? Number.NEGATIVE_INFINITY)) {
      newest.set(row.session_id, at);
    }
  }
  return newest;
}
function openStageStarts(rows) {
  const byStage = /* @__PURE__ */ new Map();
  for (const row of rows) {
    if (row.kind !== "stage_start" && row.kind !== "stage_end") continue;
    const stage = stringOrNull(row.stage);
    if (stage === null) continue;
    byStage.set(stage, [...byStage.get(stage) ?? [], row]);
  }
  const open = [];
  for (const events of byStage.values()) {
    if (!startedAfterLastEnd(events)) continue;
    open.push(events.filter((row) => row.kind === "stage_start").at(-1));
  }
  return open.sort((a, b) => rows.indexOf(a) - rows.indexOf(b));
}
function runningStageOfOtherSession(rows, askingSessionId, nowMs) {
  const agent = liveStageAgents(rows).find((live) => live.sessionId !== askingSessionId);
  if (agent) return agent.stage;
  const newest = newestRowTimes(rows);
  const running = openStageStarts(rows).filter((started) => {
    if (started.session_id === askingSessionId) return false;
    const last = newest.get(started.session_id);
    return last !== void 0 && nowMs - last < RUNNING_STAGE_RECENT_MS;
  });
  return running.length === 0 ? null : stringOrNull(running.at(-1).stage);
}

// src/feature-evidence/enumerate.ts
init_esm_shims();
import { readdirSync } from "fs";
import { join } from "path";
function listFeatureDirs(projectRoot) {
  try {
    return readdirSync(join(projectRoot, PATHS.FEATURE_EVIDENCE_DIR), { withFileTypes: true }).filter((entry) => entry.isDirectory() && isFeatureDirName(entry.name)).map((entry) => entry.name).sort();
  } catch {
    return [];
  }
}

// src/feature-evidence/feature-record.ts
init_esm_shims();
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join as join2 } from "path";

// src/feature-evidence/lane-rank.ts
init_esm_shims();
function laneRank(lane2) {
  return lane2 === null ? -1 : LANES.indexOf(lane2);
}
function higherLane(current, incoming) {
  return laneRank(incoming) > laneRank(current) ? incoming : current;
}

// src/feature-evidence/schema.ts
init_esm_shims();
var import_ajv = __toESM(require_ajv(), 1);

// src/visual-evidence/types.ts
init_esm_shims();
var VISUAL_EVIDENCE_DOC_TYPE = "paqad.visual-evidence";
var VISUAL_EVIDENCE_SCHEMA_VERSION = 2;
var VE_SKIP_REASONS = [
  "not-frontend",
  "flag-off",
  "no-documented-flow",
  "no-capture-script",
  "capture-script-invalid",
  "playwright-not-provisioned",
  "app-preview-not-configured",
  "app-not-reachable",
  "env-var-missing",
  "selector-not-found"
];
var VE_STEP_STATUSES = ["captured", "failed", "skipped"];
var VE_RESULTS = ["captured", "partial", "skipped"];
var VE_SOURCES = ["agent-attached", "mixed"];
var AGENT_ATTACHED_JOURNEY = "agent-attached";

// src/feature-evidence/schema.ts
var nullableString = { type: ["string", "null"] };
var ENVELOPE_HEADER_PROPERTIES = {
  schema_version: { type: "integer", minimum: 1 },
  doc_type: { type: "string", pattern: "^paqad\\.[a-z0-9-]+$" },
  change: { type: "string", pattern: `^${ULID_BODY}$` },
  session_id: { type: "string", minLength: 1 },
  recorded_at: { type: "string", minLength: 1 },
  content_hash: { type: "string", pattern: "^[0-9a-f]{64}$" }
};
var ENVELOPE_SCHEMA_FRAGMENT = {
  type: "object",
  required: [...ENVELOPE_HEADER_KEYS],
  properties: ENVELOPE_HEADER_PROPERTIES
};
function envelopedDocumentSchema(docType, schemaVersion, required, properties) {
  return {
    allOf: [
      ENVELOPE_SCHEMA_FRAGMENT,
      {
        type: "object",
        additionalProperties: false,
        required: [...required],
        properties: {
          ...ENVELOPE_HEADER_PROPERTIES,
          schema_version: { type: "integer", const: schemaVersion },
          doc_type: { const: docType },
          ...properties
        }
      }
    ]
  };
}
function versionedSchema(id, legacy, current) {
  return {
    $id: id,
    if: {
      type: "object",
      required: ["schema_version"],
      properties: { schema_version: { const: 1 } }
    },
    then: legacy,
    else: current
  };
}
var lane = { type: ["string", "null"], enum: ["fast", "graduated", "full", null] };
var laneMove = {
  type: "object",
  additionalProperties: false,
  required: ["from", "to", "reason", "files", "at"],
  properties: {
    from: { enum: ["fast", "graduated", "full"] },
    to: { enum: ["fast", "graduated", "full"] },
    reason: { type: "string", minLength: 1 },
    files: { type: "integer", minimum: 0 },
    at: { type: "string", minLength: 1 }
  }
};
var authoringLaneRaise = {
  type: "object",
  additionalProperties: false,
  required: ["from", "to", "reason", "path", "at"],
  properties: {
    from: { enum: ["fast", "graduated", "full"] },
    to: { enum: ["fast", "graduated", "full"] },
    reason: { type: "string", minLength: 1 },
    path: { type: "string", minLength: 1 },
    paths: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["kind", "path"],
        properties: {
          kind: { enum: ["skill", "agent"] },
          path: { type: "string", minLength: 1 }
        }
      }
    },
    at: { type: "string", minLength: 1 }
  }
};
var FEATURE_SCHEMA_V1 = {
  type: "object",
  additionalProperties: false,
  required: [
    "schema_version",
    "doc_type",
    "issue",
    "title",
    "slug",
    "ulid",
    "created_at",
    "updated_at",
    "lane",
    "status",
    "spec_id",
    "session_first_seen",
    "adapter",
    "content_hash"
  ],
  properties: {
    schema_version: { type: "integer", const: 1 },
    doc_type: { const: FEATURE_DOC_TYPE },
    issue: nullableString,
    title: { type: "string", minLength: 1 },
    slug: { type: "string", minLength: 1 },
    ulid: { type: "string", minLength: 1 },
    created_at: { type: "string", minLength: 1 },
    updated_at: { type: "string", minLength: 1 },
    lane,
    status: { enum: ["active", "paused", "done", "spec-only", "abandoned"] },
    spec_id: nullableString,
    session_first_seen: { type: "string", minLength: 1 },
    adapter: { type: "string", minLength: 1 },
    branch: nullableString,
    base_branch: nullableString,
    content_hash: { type: "string", minLength: 1 }
  }
};
var FEATURE_SCHEMA = versionedSchema(
  "paqad://schemas/feature.json",
  FEATURE_SCHEMA_V1,
  envelopedDocumentSchema(
    FEATURE_DOC_TYPE,
    FEATURE_DOC_SCHEMA_VERSION,
    [
      ...ENVELOPE_HEADER_KEYS,
      "issue",
      "title",
      "slug",
      "lane",
      "status",
      "spec_id",
      "adapter",
      "branch",
      "base_branch",
      "updated_at"
    ],
    {
      issue: nullableString,
      title: { type: "string", minLength: 1 },
      slug: { type: "string", minLength: 1 },
      lane,
      status: { enum: ["active", "paused", "done", "spec-only", "abandoned"] },
      spec_id: nullableString,
      adapter: { type: "string", minLength: 1 },
      branch: nullableString,
      base_branch: nullableString,
      updated_at: { type: "string", minLength: 1 },
      kind: { enum: ["fix", "other"] },
      lane_source: { enum: ["classifier", "manual", "plan"] },
      lane_resized: laneMove,
      lane_raised: laneMove,
      lane_raised_for_authoring: authoringLaneRaise
    }
  )
);
var PLAN_BODY_PROPERTIES = {
  summary: { type: "string" },
  steps: {
    type: "array",
    items: {
      type: "object",
      additionalProperties: false,
      required: ["id", "description"],
      properties: {
        id: { type: "string", minLength: 1 },
        description: { type: "string", minLength: 1 },
        module: { type: "string", minLength: 1 },
        classification: {
          enum: ["ac-satisfying", "necessary-setup", "scaffolding", "over-build"]
        },
        files: { type: "array", items: { type: "string", minLength: 1 } }
      }
    }
  },
  modules_touched: { type: "array", items: { type: "string", minLength: 1 } },
  decisions: { type: "array", items: { type: "string", minLength: 1 } },
  risks: {
    type: "array",
    items: {
      type: "object",
      additionalProperties: false,
      required: ["description", "mitigation"],
      properties: {
        description: { type: "string", minLength: 1 },
        mitigation: { type: "string", minLength: 1 }
      }
    }
  },
  reuse: {
    type: "object",
    additionalProperties: false,
    required: ["consulted", "reusing", "new_constructs"],
    properties: {
      consulted: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["source", "query", "hits"],
          properties: {
            source: {
              enum: [
                "existing-surface",
                "index-query",
                "reuse-catalog",
                "module-doc",
                "grep",
                "framework-api",
                "framework-docs"
              ]
            },
            query: { type: "string", minLength: 1 },
            target: { type: "string", minLength: 1 },
            hits: { type: "integer", minimum: 0 }
          }
        }
      },
      reusing: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["symbol", "how"],
          properties: {
            symbol: { type: "string", minLength: 1 },
            file: { type: "string", minLength: 1 },
            how: { type: "string", minLength: 1 },
            package: { type: "string", minLength: 1 },
            version: { type: "string", minLength: 1 },
            provenance: { enum: ["asserted", "unknown-dynamic", "doc-derived"] }
          }
        }
      },
      new_constructs: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["name", "justification"],
          properties: {
            name: { type: "string", minLength: 1 },
            justification: { type: "string", minLength: 1 },
            framework_checked: {
              type: "object",
              additionalProperties: false,
              required: ["package", "nearest", "verdict"],
              properties: {
                package: { type: "string", minLength: 1 },
                nearest: { type: "string", minLength: 1 },
                verdict: { enum: ["reuse", "extend", "insufficient", "absent"] }
              }
            }
          }
        }
      }
    }
  }
};
var PLAN_SCHEMA_V1 = {
  type: "object",
  additionalProperties: false,
  required: [
    "schema_version",
    "doc_type",
    "issue",
    "title",
    "slug",
    "ulid",
    "summary",
    "steps",
    "modules_touched",
    "decisions",
    "risks",
    "created_at",
    "updated_at",
    "content_hash"
  ],
  properties: {
    schema_version: { type: "integer", const: 1 },
    doc_type: { const: PLAN_DOC_TYPE },
    issue: nullableString,
    title: { type: "string", minLength: 1 },
    slug: { type: "string", minLength: 1 },
    ulid: { type: "string", minLength: 1 },
    ...PLAN_BODY_PROPERTIES,
    created_at: { type: "string", minLength: 1 },
    updated_at: { type: "string", minLength: 1 },
    content_hash: { type: "string", minLength: 1 }
  }
};
var PLAN_SCHEMA = versionedSchema(
  "paqad://schemas/plan.json",
  PLAN_SCHEMA_V1,
  envelopedDocumentSchema(
    PLAN_DOC_TYPE,
    FEATURE_DOC_SCHEMA_VERSION,
    [...ENVELOPE_HEADER_KEYS, "summary", "steps", "modules_touched", "decisions", "risks"],
    PLAN_BODY_PROPERTIES
  )
);
var REVIEW_BODY_PROPERTIES = {
  summary: { type: "string", minLength: 1 },
  verdict: { enum: ["safe-to-merge", "needs-attention", "inconclusive"] },
  findings: {
    type: "array",
    items: {
      type: "object",
      additionalProperties: false,
      required: ["severity", "description"],
      properties: {
        severity: { enum: ["blocker", "major", "minor"] },
        description: { type: "string", minLength: 1 },
        file: { type: "string", minLength: 1 },
        deferred_to: { type: "string", pattern: `^TD-${ULID_BODY}$` }
      }
    }
  },
  checked: { type: "array", items: { type: "string", minLength: 1 } },
  rollback: { type: "string", minLength: 1 }
};
var REVIEW_SCHEMA_V1 = {
  type: "object",
  additionalProperties: false,
  required: [
    "schema_version",
    "doc_type",
    "issue",
    "title",
    "slug",
    "ulid",
    "summary",
    "verdict",
    "findings",
    "checked",
    "rollback",
    "created_at",
    "updated_at",
    "content_hash"
  ],
  properties: {
    schema_version: { type: "integer", const: 1 },
    doc_type: { const: REVIEW_DOC_TYPE },
    issue: nullableString,
    title: { type: "string", minLength: 1 },
    slug: { type: "string", minLength: 1 },
    ulid: { type: "string", minLength: 1 },
    ...REVIEW_BODY_PROPERTIES,
    created_at: { type: "string", minLength: 1 },
    updated_at: { type: "string", minLength: 1 },
    content_hash: { type: "string", minLength: 1 }
  }
};
var REVIEW_SCHEMA = versionedSchema(
  "paqad://schemas/review.json",
  REVIEW_SCHEMA_V1,
  envelopedDocumentSchema(
    REVIEW_DOC_TYPE,
    FEATURE_DOC_SCHEMA_VERSION,
    [...ENVELOPE_HEADER_KEYS, "summary", "verdict", "findings", "checked", "rollback"],
    REVIEW_BODY_PROPERTIES
  )
);
function visualEvidenceStepsSchema(timeKey) {
  return {
    type: "array",
    items: {
      type: "object",
      additionalProperties: false,
      required: ["index", "journey_id", "journey_step", "caption", "dir", timeKey, "status"],
      properties: {
        index: { type: "integer", minimum: 1 },
        journey_id: { type: "string", minLength: 1 },
        journey_step: { type: "integer", minimum: 1 },
        caption: { type: "string" },
        dir: { type: "string", minLength: 1 },
        route: { type: "string" },
        [timeKey]: { type: "string", minLength: 1 },
        image_sha256: { type: "string" },
        image_bytes: { type: "integer", minimum: 0 },
        status: { enum: [...VE_STEP_STATUSES] },
        failure: { type: "string" },
        ac: { type: "string", minLength: 1 }
      }
    }
  };
}
var VISUAL_EVIDENCE_BODY_PROPERTIES = {
  trigger: {
    type: "object",
    additionalProperties: false,
    required: ["changed_files", "matched_globs", "packs"],
    properties: {
      changed_files: { type: "array", items: { type: "string" } },
      matched_globs: { type: "array", items: { type: "string" } },
      packs: { type: "array", items: { type: "string" } }
    }
  },
  plan: {
    type: "array",
    items: {
      type: "object",
      additionalProperties: false,
      required: ["journey_id", "capture_script", "matched_by"],
      properties: {
        journey_id: { type: "string", minLength: 1 },
        capture_script: { type: "string", minLength: 1 },
        matched_by: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["file", "surface", "module"],
            properties: {
              file: { type: "string" },
              surface: { type: "string" },
              module: { type: "string" }
            }
          }
        }
      }
    }
  },
  gif: {
    oneOf: [
      { type: "null" },
      {
        type: "object",
        additionalProperties: false,
        required: ["file", "frames", "frame_ms", "sha256", "bytes"],
        properties: {
          file: { type: "string", minLength: 1 },
          frames: { type: "integer", minimum: 0 },
          frame_ms: { type: "integer", minimum: 1 },
          sha256: { type: "string", minLength: 1 },
          bytes: { type: "integer", minimum: 0 }
        }
      }
    ]
  },
  skips: {
    type: "array",
    items: {
      type: "object",
      additionalProperties: false,
      required: ["reason", "detail"],
      properties: {
        reason: { enum: [...VE_SKIP_REASONS] },
        detail: { type: "string" }
      }
    }
  },
  result: { enum: [...VE_RESULTS] },
  source: { enum: [...VE_SOURCES] }
};
var VISUAL_EVIDENCE_SCHEMA_V1 = {
  type: "object",
  additionalProperties: false,
  required: [
    "schema_version",
    "doc_type",
    "generated_at",
    "content_hash",
    "trigger",
    "plan",
    "steps",
    "gif",
    "skips",
    "result"
  ],
  properties: {
    schema_version: { type: "integer", const: 1 },
    doc_type: { const: VISUAL_EVIDENCE_DOC_TYPE },
    generated_at: { type: "string", minLength: 1 },
    content_hash: { type: "string", minLength: 1 },
    ...VISUAL_EVIDENCE_BODY_PROPERTIES,
    steps: visualEvidenceStepsSchema("captured_at")
  }
};
var VISUAL_EVIDENCE_SCHEMA = versionedSchema(
  "paqad://schemas/visual-evidence.json",
  VISUAL_EVIDENCE_SCHEMA_V1,
  envelopedDocumentSchema(
    VISUAL_EVIDENCE_DOC_TYPE,
    VISUAL_EVIDENCE_SCHEMA_VERSION,
    [...ENVELOPE_HEADER_KEYS, "trigger", "plan", "steps", "gif", "skips", "result"],
    { ...VISUAL_EVIDENCE_BODY_PROPERTIES, steps: visualEvidenceStepsSchema("recorded_at") }
  )
);
var ajv = new import_ajv.default({ allErrors: true, allowUnionTypes: true });
var compiledFeature;
var compiledPlan;
var compiledReview;
var compiledVisualEvidence;
function formatValidationError(error) {
  return `${error.instancePath || "(root)"} ${error.message ?? "invalid"}`;
}
function runValidator(validate, row) {
  if (validate(row)) {
    return [];
  }
  const errors = validate.errors;
  return errors.map(formatValidationError);
}
function validateFeatureRecord(row) {
  if (!compiledFeature) {
    compiledFeature = ajv.compile(FEATURE_SCHEMA);
  }
  return runValidator(compiledFeature, row);
}
function validatePlanRecord(row) {
  if (!compiledPlan) {
    compiledPlan = ajv.compile(PLAN_SCHEMA);
  }
  return runValidator(compiledPlan, row);
}
function validateReviewRecord(row) {
  if (!compiledReview) {
    compiledReview = ajv.compile(REVIEW_SCHEMA);
  }
  return runValidator(compiledReview, row);
}
function validateVisualEvidenceRecord(row) {
  if (!compiledVisualEvidence) {
    compiledVisualEvidence = ajv.compile(VISUAL_EVIDENCE_SCHEMA);
  }
  return runValidator(compiledVisualEvidence, row);
}

// src/feature-evidence/feature-record.ts
var FINISHED_FEATURE_STATUSES = /* @__PURE__ */ new Set(["done", "abandoned"]);
function isFeatureFinished(status) {
  return status !== null && status !== void 0 && FINISHED_FEATURE_STATUSES.has(status);
}
function atomicWriteJson(absPath, value) {
  mkdirSync(dirname(absPath), { recursive: true });
  const tmp = `${absPath}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(value, null, 2)}
`, "utf8");
  renameWithRetrySync(tmp, absPath);
}
function fromLegacyFeatureRecord(legacy) {
  return {
    schema_version: legacy.schema_version,
    doc_type: legacy.doc_type,
    change: legacy.ulid,
    session_id: legacy.session_first_seen,
    recorded_at: legacy.created_at,
    content_hash: legacy.content_hash,
    issue: legacy.issue,
    title: legacy.title,
    slug: legacy.slug,
    lane: legacy.lane,
    status: legacy.status,
    spec_id: legacy.spec_id,
    adapter: legacy.adapter,
    branch: legacy.branch ?? null,
    base_branch: legacy.base_branch ?? null,
    updated_at: legacy.updated_at
  };
}
function readFeatureRecord(projectRoot, dirName) {
  try {
    const parsed = JSON.parse(
      readFileSync(join2(projectRoot, featureFilePath(dirName, "feature")), "utf8")
    );
    if (validateFeatureRecord(parsed).length === 0) {
      const record = parsed;
      return record.schema_version === 1 ? fromLegacyFeatureRecord(record) : record;
    }
  } catch {
  }
  return null;
}
function writeFeatureRecord(projectRoot, dirName, record) {
  const errors = validateFeatureRecord(record);
  if (errors.length > 0) {
    throw new Error(`Invalid feature.json: ${errors.join("; ")}`);
  }
  atomicWriteJson(join2(projectRoot, featureFilePath(dirName, "feature")), record);
}
function seedFeatureRecord(projectRoot, dirName, input) {
  const existing = readFeatureRecord(projectRoot, dirName);
  if (existing) {
    return existing;
  }
  const parts = parseFeatureDirName(dirName);
  if (!parts) {
    return null;
  }
  const record = buildFeatureRecord({
    issue: parts.issue,
    title: parts.slug,
    slug: parts.slug,
    change: parts.ulid,
    lane: input.lane ?? null,
    status: input.status ?? "active",
    session_id: input.sessionId,
    adapter: input.adapter,
    branch: input.branch ?? null,
    base_branch: input.baseBranch ?? null,
    kind: input.kind,
    lane_source: input.lane ? "classifier" : void 0,
    now: input.now
  });
  try {
    writeFeatureRecord(projectRoot, dirName, record);
    return record;
  } catch {
    return null;
  }
}
function higherKind(current, next) {
  return current === "fix" ? "fix" : next;
}
function updateFeatureRecord(projectRoot, dirName, patch, now = () => /* @__PURE__ */ new Date()) {
  const parts = parseFeatureDirName(dirName);
  if (!parts) {
    return null;
  }
  const current = readFeatureRecord(projectRoot, dirName) ?? buildFeatureRecord({
    issue: parts.issue,
    title: parts.slug,
    slug: parts.slug,
    change: parts.ulid,
    status: "active",
    session_id: "unknown",
    adapter: "unknown",
    now
  });
  const laneState = nextLaneState(projectRoot, dirName, current, patch);
  const next = buildFeatureRecord({
    change: current.change,
    session_id: current.session_id,
    recorded_at: current.recorded_at,
    issue: patch.issue !== void 0 ? patch.issue : current.issue,
    title: patch.title ?? current.title,
    slug: patch.slug ?? current.slug,
    lane: laneState.lane,
    status: patch.status ?? current.status,
    spec_id: patch.spec_id !== void 0 ? patch.spec_id : current.spec_id,
    adapter: patch.adapter ?? current.adapter,
    branch: patch.branch !== void 0 ? patch.branch : current.branch ?? null,
    base_branch: patch.base_branch !== void 0 ? patch.base_branch : current.base_branch ?? null,
    kind: patch.kind !== void 0 ? higherKind(current.kind, patch.kind) : current.kind,
    lane_source: laneState.lane_source,
    lane_resized: laneState.lane_resized,
    lane_raised: laneState.lane_raised,
    lane_raised_for_authoring: laneState.lane_raised_for_authoring,
    now: () => new Date(current.updated_at)
  });
  if (next.content_hash === current.content_hash) {
    return current;
  }
  next.updated_at = now().toISOString();
  try {
    writeFeatureRecord(projectRoot, dirName, next);
    return next;
  } catch {
    return null;
  }
}
var PRE_SPEC_ONLY_STAGES = /* @__PURE__ */ new Set([
  "specification",
  "development",
  "checks",
  "documentation_sync"
]);
function hasStartedPastPlanning(projectRoot, dirName) {
  return readUnitFile(projectRoot, featureFilePath(dirName, "stageEvidence")).some(
    (row) => row.kind === "stage_start" && PRE_SPEC_ONLY_STAGES.has(String(row.stage))
  );
}
function canLowerFromPlan(projectRoot, dirName, current) {
  return current.lane === "full" && current.lane_source === "classifier" && current.lane_resized === void 0 && !hasStartedPastPlanning(projectRoot, dirName);
}
function canRaiseAfterResize(current) {
  const resizedByPlan = current.lane_source === "plan" && current.lane_resized !== void 0;
  return current.lane === "graduated" && (resizedByPlan || current.lane_raised_for_authoring !== void 0) && current.lane_raised === void 0;
}
function canRaiseForAuthoring(current) {
  return current.lane === "fast" && current.lane_raised_for_authoring === void 0;
}
function nextLaneState(projectRoot, dirName, current, patch) {
  const kept = {
    lane: current.lane,
    lane_source: current.lane_source,
    lane_resized: current.lane_resized,
    lane_raised: current.lane_raised,
    lane_raised_for_authoring: current.lane_raised_for_authoring
  };
  const authoring = patch.raiseLaneForAuthoring;
  if (authoring !== void 0) {
    if (!canRaiseForAuthoring(current)) return kept;
    return {
      ...kept,
      lane: "graduated",
      lane_raised_for_authoring: { from: "fast", to: "graduated", ...authoring }
    };
  }
  const raise = patch.raiseLaneFromChange;
  if (raise !== void 0) {
    if (!canRaiseAfterResize(current)) return kept;
    return { ...kept, lane: "full", lane_raised: { from: "graduated", to: "full", ...raise } };
  }
  const resize = patch.resizeLaneFromPlan;
  if (resize !== void 0) {
    if (!canLowerFromPlan(projectRoot, dirName, current)) return kept;
    return {
      lane: "graduated",
      lane_source: "plan",
      lane_resized: { from: "full", to: "graduated", ...resize }
    };
  }
  if (patch.lane === void 0) return kept;
  const source = patch.laneSource ?? "classifier";
  if (current.lane_source === "plan" && source !== "manual") return kept;
  const lane2 = higherLane(current.lane, patch.lane);
  if (source === "manual" && laneRank(patch.lane) >= laneRank(current.lane)) {
    return { ...kept, lane: lane2, lane_source: "manual" };
  }
  return lane2 === current.lane ? kept : { ...kept, lane: lane2, lane_source: source };
}
function featureRecordIsUntitled(record) {
  return record.title === UNTITLED_FEATURE_TITLE && record.issue === null;
}
var UNKNOWN_ADAPTER = "unknown";
function knownString(value) {
  return typeof value === "string" && value.length > 0 && value !== UNKNOWN_ADAPTER ? value : null;
}
function knownLane(value) {
  return value === "fast" || value === "graduated" || value === "full" ? value : null;
}
function readChangeConstants(projectRoot, dirName, rows) {
  const record = readFeatureRecord(projectRoot, dirName);
  const fromRecord = {
    adapter: knownString(record?.adapter),
    branch: knownString(record?.branch),
    base_branch: knownString(record?.base_branch),
    lane: knownLane(record?.lane)
  };
  if (fromRecord.adapter !== null && fromRecord.branch !== null && fromRecord.base_branch !== null && fromRecord.lane !== null) {
    return fromRecord;
  }
  const openRow = (rows ?? readUnitFile(projectRoot, featureFilePath(dirName, "stageEvidence"))).find((row) => row.kind === "open");
  return {
    adapter: fromRecord.adapter ?? knownString(openRow?.adapter),
    branch: fromRecord.branch ?? knownString(openRow?.branch),
    base_branch: fromRecord.base_branch ?? knownString(openRow?.base_branch),
    lane: fromRecord.lane ?? knownLane(openRow?.lane)
  };
}

// src/feature-evidence/adoption.ts
function stageRows(projectRoot, dirName) {
  return readUnitFile(projectRoot, featureFilePath(dirName, "stageEvidence"));
}
function isBundleMaterialized(projectRoot, dirName) {
  return stageRows(projectRoot, dirName).length > 0;
}
function isBundleClosed(projectRoot, dirName) {
  let closed = false;
  for (const row of stageRows(projectRoot, dirName)) {
    if (row.kind === "open") {
      closed = false;
    } else if (row.kind === "close") {
      closed = true;
    }
  }
  return closed;
}
function featureBranch(projectRoot, dirName, rows = stageRows(projectRoot, dirName)) {
  return readChangeConstants(projectRoot, dirName, rows).branch ?? deliveryBranch(projectRoot, dirName);
}
function deliveryBranch(projectRoot, dirName) {
  try {
    const raw = JSON.parse(
      readFileSync2(join3(projectRoot, featureFilePath(dirName, "delivery")), "utf8")
    );
    const branch = raw.branch;
    return typeof branch === "string" && branch.length > 0 ? branch : null;
  } catch {
    return null;
  }
}
function listAdoptableFeatures(projectRoot, branch) {
  return listFeatureDirs(projectRoot).filter((dirName) => {
    const rows = stageRows(projectRoot, dirName);
    if (rows.length === 0 || rows.some((row) => row.kind === "close")) {
      return false;
    }
    return branch === null || featureBranch(projectRoot, dirName, rows) === branch;
  });
}
function listInFlightFeatures(projectRoot) {
  return listAdoptableFeatures(projectRoot, null);
}
function sessionClosedAnyFeature(projectRoot, sessionId) {
  return listFeatureDirs(projectRoot).some(
    (dirName) => stageRows(projectRoot, dirName).some(
      (row) => row.kind === "close" && row.session_id === sessionId
    )
  );
}
function sessionReattachableFeature(projectRoot, sessionId, branch) {
  if (branch === null) {
    return null;
  }
  let picked = null;
  let pickedAt = "";
  for (const dirName of listFeatureDirs(projectRoot)) {
    const rows = stageRows(projectRoot, dirName);
    if (!rows.some((row) => row.kind === "open" && row.session_id === sessionId)) continue;
    if (!isBundleClosed(projectRoot, dirName)) continue;
    if (featureBranch(projectRoot, dirName, rows) !== branch) continue;
    if (readFeatureRecord(projectRoot, dirName)?.status === "abandoned") continue;
    const lastAt = rows.reduce((newest, row) => {
      const at = rowRecordedAt(row) ?? "";
      return at > newest ? at : newest;
    }, "");
    if (picked === null || lastAt > pickedAt) {
      picked = dirName;
      pickedAt = lastAt;
    }
  }
  return picked;
}
function anotherSessionRunningStage(projectRoot, sessionId, dirName, now = () => /* @__PURE__ */ new Date()) {
  const rows = stageRows(projectRoot, dirName);
  const wroteWork = rows.some(
    (row) => row.session_id === sessionId && row.kind !== RECORD_REPAIR_KIND
  );
  if (wroteWork) return null;
  return runningStageOfOtherSession(rows, sessionId, now().getTime());
}
function onAnotherBranch(projectRoot, dirName) {
  const head = readHeadRef(projectRoot);
  if (head.branch === null) return false;
  const recorded = featureBranch(projectRoot, dirName);
  return recorded !== null && recorded !== head.branch;
}
function reconcileSessionControl(projectRoot, sessionId, now) {
  let control = readSessionControl(projectRoot, sessionId, now);
  const activeClosed = control.active !== null && isBundleMaterialized(projectRoot, control.active) && isBundleClosed(projectRoot, control.active);
  if (control.active !== null && isBundleMaterialized(projectRoot, control.active) && !activeClosed) {
    const keep = !onAnotherBranch(projectRoot, control.active) && anotherSessionRunningStage(projectRoot, sessionId, control.active, now) === null;
    if (keep) return control.active;
    control = writeSessionControl(projectRoot, { ...control, active: null }, now, "reconcile");
  }
  const candidates = adoptableInFlightOnBranch(projectRoot, sessionId, now);
  const fallback = activeClosed ? null : control.active;
  if (candidates.length !== 1) {
    if (activeClosed) {
      writeSessionControl(projectRoot, { ...control, active: null }, now, "reconcile");
    }
    return fallback;
  }
  const adopted = candidates[0];
  writeSessionControl(projectRoot, { ...control, active: adopted }, now, "reconcile");
  return adopted;
}
function adoptableInFlightOnBranch(projectRoot, sessionId, now) {
  return inFlightOnBranch(projectRoot, sessionId, now).filter(
    (name) => anotherSessionRunningStage(projectRoot, sessionId, name, now) === null
  );
}
function heldInFlightOnBranch(projectRoot, sessionId, now) {
  return inFlightOnBranch(projectRoot, sessionId, now).flatMap((dirName) => {
    const stage = anotherSessionRunningStage(projectRoot, sessionId, dirName, now);
    return stage === null ? [] : [{ dirName, stage }];
  });
}
function inFlightOnBranch(projectRoot, sessionId, now) {
  const control = readSessionControl(projectRoot, sessionId, now);
  const branch = readGitState(projectRoot).branch ?? null;
  return listAdoptableFeatures(projectRoot, branch).filter(
    (name) => !control.paused.includes(name)
  );
}

export {
  STAGE_EVIDENCE_DOC_TYPE,
  STAGE_EVIDENCE_SCHEMA_VERSION,
  STAGE_EVIDENCE_SCHEMA_V2,
  STAGE_AGENT_KIND,
  SPEC_STEP_KIND,
  SPEC_CORRECTION_KIND,
  COMPLETION_DEFERRED_KIND,
  RECORD_REPAIR_KIND,
  STAGE_HANDBACK_KIND,
  RECIPE_INJECTED_KIND,
  SKILL_USED_KIND,
  REPORT_SOURCES,
  SPEC_STEP_OUTCOMES,
  STAGE_FAMILY_KIND_LIST,
  REPORT_REPAIR_REASON,
  readRepairedReports,
  STAGE_EVIDENCE_STAGES,
  PRE_CODE_STAGES,
  isEditStage,
  laneStages,
  isLaneStage,
  requiredPreCodeStages,
  isKnownStage,
  isArtifactBearingStage,
  isMandatoryStage,
  foldRowsWithKey,
  startedAfterLastEnd,
  augmentWithBundleArtifacts,
  ORCHESTRATOR_AGENT,
  BACKSTOP_WRITER,
  agentForWriter,
  resolveAgentIdentity,
  isStageAgent,
  STAGE_AGENT_SESSION_RELEASE,
  stageAgentIdentity,
  startedByAnotherAgent,
  liveStageAgents,
  runningStageOfOtherSession,
  listFeatureDirs,
  laneRank,
  VISUAL_EVIDENCE_DOC_TYPE,
  VISUAL_EVIDENCE_SCHEMA_VERSION,
  AGENT_ATTACHED_JOURNEY,
  ENVELOPE_HEADER_PROPERTIES,
  validatePlanRecord,
  validateReviewRecord,
  validateVisualEvidenceRecord,
  isFeatureFinished,
  readFeatureRecord,
  seedFeatureRecord,
  updateFeatureRecord,
  featureRecordIsUntitled,
  readChangeConstants,
  isBundleMaterialized,
  isBundleClosed,
  featureBranch,
  listAdoptableFeatures,
  listInFlightFeatures,
  sessionClosedAnyFeature,
  sessionReattachableFeature,
  anotherSessionRunningStage,
  reconcileSessionControl,
  adoptableInFlightOnBranch,
  heldInFlightOnBranch
};
