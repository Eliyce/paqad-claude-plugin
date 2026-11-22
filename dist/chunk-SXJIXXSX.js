import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  CHECKS_RUNNING_CEILING_MS,
  liveChecksRunningMarker
} from "./chunk-YKXOZFAY.js";
import {
  deadSlices,
  developmentEnded,
  droppedSlices,
  readContractDecisions,
  runningSlices,
  stageIsOpen,
  stagesWithKind
} from "./chunk-B4ITQDI4.js";
import {
  STAGE_IDS,
  appendEvent,
  readEvents,
  readRun
} from "./chunk-ZI6NAYWY.js";
import {
  appendFeatureStageRow,
  currentFeature,
  foldFeature,
  readFeatureStageUnit
} from "./chunk-TIGPOU33.js";
import {
  COMPLETION_DEFERRED_KIND,
  RECORD_REPAIR_KIND,
  STAGE_AGENT_SESSION_RELEASE,
  heldInFlightOnBranch,
  isBundleClosed,
  liveStageAgents
} from "./chunk-T7KPBKCY.js";
import {
  rowRecordedAt
} from "./chunk-5G2EOBB5.js";
import {
  stripPluginAgentNamespace
} from "./chunk-OJJKELCB.js";
import {
  resolveSessionId
} from "./chunk-L7TVJSIU.js";
import {
  featureChangeKey
} from "./chunk-Q65EMUNY.js";
import {
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/stage-evidence/completion-deferred.ts
init_esm_shims();

// src/onboarding/journey/fold.ts
init_esm_shims();

// src/onboarding/journey/stages.ts
init_esm_shims();
var ONBOARDING_STAGES = [
  {
    id: "detect",
    index: 1,
    name: "Read your project",
    label: "Read",
    running: "Reading your project",
    workflow: "detect",
    runs_in: "cli",
    agent: null,
    unit: null,
    allowed_degraded: ["stack_mismatch_noted"]
  },
  {
    id: "setup",
    index: 2,
    name: "Set up paqad",
    label: "Set up",
    running: "Setting up paqad",
    workflow: "onboard setup",
    runs_in: "cli",
    agent: null,
    unit: null,
    allowed_degraded: ["git_workflow_kept"]
  },
  {
    id: "project_docs",
    index: 3,
    name: "Write the project docs",
    label: "Docs",
    running: "Writing the project docs",
    workflow: "documentation-update",
    runs_in: "agent",
    agent: "paqad-onboarding-docs",
    unit: { one: "doc area", many: "doc areas" },
    allowed_degraded: []
  },
  {
    id: "module_docs",
    index: 4,
    name: "Write the module docs",
    label: "Modules",
    running: "Writing the module docs",
    workflow: "module-documentation",
    runs_in: "agent",
    agent: "paqad-onboarding-modules",
    unit: { one: "module", many: "modules" },
    allowed_degraded: []
  },
  {
    id: "rules_discovery",
    index: 5,
    name: "Research rules for your stack",
    label: "Research",
    running: "Researching rules for your stack",
    workflow: "rules-discovery",
    runs_in: "agent",
    agent: "paqad-onboarding-rules",
    unit: { one: "package", many: "packages" },
    allowed_degraded: ["research_offline", "research_stopped"]
  },
  {
    id: "rules_analyze",
    index: 6,
    name: "Check which rules can be automated",
    label: "Triage",
    running: "Checking which rules can be automated",
    workflow: "rules-analyze",
    runs_in: "agent",
    agent: "paqad-onboarding-analyze",
    unit: { one: "rule batch", many: "rule batches" },
    allowed_degraded: []
  },
  {
    id: "rule_scripts",
    index: 7,
    name: "Write the rule checks",
    label: "Checks",
    running: "Writing the rule checks",
    workflow: "rules-generate",
    runs_in: "agent",
    agent: "paqad-onboarding-scripts",
    unit: { one: "rule batch", many: "rule batches" },
    allowed_degraded: []
  },
  {
    id: "finish",
    index: 8,
    name: "Wrap up",
    label: "Wrap up",
    running: "Wrapping up",
    workflow: "search index, report, commit question",
    runs_in: "cli",
    agent: null,
    unit: null,
    allowed_degraded: ["rag_off"]
  }
];
var STAGE_COUNT = ONBOARDING_STAGES.length;
var PROJECT_DOC_AREAS = [
  "stack",
  "architecture",
  "design-system",
  "registries",
  "benchmarks",
  "tech-debt",
  "module-map"
];
var MODULE_REGISTRIES_UNIT = "registries";
function isStageId(value) {
  return STAGE_IDS.includes(value);
}
function stageDefinition(id) {
  const found = ONBOARDING_STAGES.find((stage) => stage.id === id);
  if (!found) throw new Error(`Unknown onboarding stage: ${id}`);
  return found;
}
function stagesBefore(id) {
  const index = stageDefinition(id).index;
  return ONBOARDING_STAGES.filter((stage) => stage.index < index);
}
function statusLine(id, detail) {
  const stage = stageDefinition(id);
  const parts = [`Step ${stage.index} of ${STAGE_COUNT}`, stage.running];
  if (detail) parts.push(detail);
  return `**\u25B8 paqad** \xB7 ${parts.join(" \xB7 ")}`;
}

// src/onboarding/journey/fold.ts
var INTERRUPTED_AFTER_MS = 20 * 60 * 1e3;
function unitRowsForStage(run, events, stage) {
  const startedAt = run.stages[stage].started_at;
  if (!startedAt) return [];
  return events.filter(
    (event) => event.run_id === run.run_id && event.stage === stage && (event.kind === "unit" || event.kind === "unit_kept") && typeof event.unit === "string" && event.ts >= startedAt
  );
}
function countsAsDone(event, hashes) {
  if (!hashes || event.source_hash === void 0 || event.unit === void 0) return true;
  const current = hashes[event.unit];
  return current === void 0 || current === event.source_hash;
}
function latestProgress(run, events, stage) {
  const startedAt = run.stages[stage].started_at;
  if (!startedAt) return null;
  let latest = null;
  for (const event of events) {
    if (event.run_id !== run.run_id || event.stage !== stage || event.kind !== "progress") continue;
    if (event.ts < startedAt) continue;
    if (!latest || event.ts >= latest.ts) latest = event;
  }
  return latest;
}
function foldStage(run, events, stage, options = {}) {
  const record = run.stages[stage];
  const hashes = stage === "module_docs" ? options.currentSourceHashes : void 0;
  const done = [];
  let lastUnit = null;
  for (const event of unitRowsForStage(run, events, stage)) {
    if (!countsAsDone(event, hashes)) continue;
    const unit = event.unit;
    lastUnit = unit;
    if (!done.includes(unit)) done.push(unit);
  }
  const plan = record.plan ?? [];
  const todo = plan.filter((unit) => !done.includes(unit));
  const progress = latestProgress(run, events, stage);
  let total = plan.length > 0 ? plan.length : record.planned ?? null;
  let doneCount = plan.length > 0 ? plan.length - todo.length : done.length;
  if (progress && typeof progress.done === "number" && typeof progress.total === "number") {
    doneCount = Math.max(doneCount, progress.done);
    total = progress.total;
  }
  return {
    id: stage,
    status: record.status,
    units_done: done,
    units_todo: todo,
    done: doneCount,
    total,
    last_unit: lastUnit
  };
}
function openAgents(run, events) {
  const open = /* @__PURE__ */ new Map();
  for (const event of events) {
    if (event.run_id !== run.run_id || !event.agent) continue;
    if (event.kind === "agent_start") open.set(event.agent, (open.get(event.agent) ?? 0) + 1);
    if (event.kind === "agent_stop")
      open.set(event.agent, Math.max(0, (open.get(event.agent) ?? 0) - 1));
  }
  return [...open.entries()].filter(([, count]) => count > 0).map(([agent]) => agent);
}
function lastHeartbeat(run, events) {
  let latest = run.updated_at;
  for (const event of events) {
    if (event.run_id === run.run_id && event.ts > latest) latest = event.ts;
  }
  return latest;
}
function currentStage(run) {
  for (const stage of ONBOARDING_STAGES) {
    const status = run.stages[stage.id].status;
    if (status === "running" || status === "failed") return stage.id;
  }
  for (const stage of ONBOARDING_STAGES) {
    if (run.stages[stage.id].status === "not_started") return stage.id;
  }
  return null;
}
function foldJourney(run, events, options = {}) {
  const now = options.now ?? (() => /* @__PURE__ */ new Date());
  const stages = Object.fromEntries(
    ONBOARDING_STAGES.map((stage) => [stage.id, foldStage(run, events, stage.id, options)])
  );
  const current = currentStage(run);
  const heartbeat = lastHeartbeat(run, events);
  const agents = openAgents(run, events);
  const running = current !== null && run.stages[current].status === "running";
  const silentFor = now().getTime() - new Date(heartbeat).getTime();
  const interrupted = run.status === "running" && running && agents.length === 0 && silentFor > INTERRUPTED_AFTER_MS;
  return { stages, current, interrupted, last_heartbeat: heartbeat, open_agents: agents };
}

// src/stage-evidence/completion-deferred.ts
var AGENT_TYPE_FIELDS = ["agent_type", "agentType", "subagent_type", "subagentType"];
var TASK_KINDS = /* @__PURE__ */ new Set([
  "subagent",
  "agent",
  "task",
  "local_agent",
  "remote_agent",
  "bash",
  "local_bash",
  "shell"
]);
var FINISHED_TASK_STATUSES = /* @__PURE__ */ new Set([
  "completed",
  "failed",
  "killed",
  "stopped",
  "cancelled",
  "canceled"
]);
function agentTypeOf(task) {
  if (!task || typeof task !== "object") {
    return void 0;
  }
  const record = task;
  for (const field of AGENT_TYPE_FIELDS) {
    const value = record[field];
    if (typeof value === "string" && value.trim() !== "") {
      return stripPluginAgentNamespace(value.trim());
    }
  }
  const kind = record.type;
  if (typeof kind === "string" && kind.trim() !== "" && !TASK_KINDS.has(kind.trim())) {
    return stripPluginAgentNamespace(kind.trim());
  }
  return void 0;
}
function taskIsFinished(task) {
  if (!task || typeof task !== "object") {
    return false;
  }
  const status = task.status;
  return typeof status === "string" && FINISHED_TASK_STATUSES.has(status.trim().toLowerCase());
}
function runningTasks(tasks) {
  return tasks.filter((task) => !taskIsFinished(task));
}
function stageAgentTaskCount(tasks) {
  return runningTasks(tasks).filter((task) => agentTypeOf(task)?.startsWith("paqad-")).length;
}
function tasksCarryAgentType(tasks) {
  return runningTasks(tasks).some((task) => agentTypeOf(task) !== void 0);
}
var NEW_HOST_SESSION_SOURCES = /* @__PURE__ */ new Set(["startup", "resume"]);
function hostProcessAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error.code === "EPERM";
  }
}
function releaseStageAgentsAtSessionStart(projectRoot, sessionId, source, now, isAlive = hostProcessAlive) {
  if (typeof source !== "string" || !NEW_HOST_SESSION_SOURCES.has(source)) return false;
  const current = currentFeature(projectRoot, sessionId, now);
  const dirNames = current !== null ? [current] : heldInFlightOnBranch(projectRoot, sessionId, now).map((held) => held.dirName);
  let released = false;
  for (const dirName of dirNames) {
    const releases = liveStageAgents(readFeatureStageUnit(projectRoot, dirName)).filter(
      (agent) => agent.sessionId === sessionId || agent.hostPid === null || !isAlive(agent.hostPid)
    ).map((agent) => agent.rowHash);
    if (releases.length === 0) continue;
    appendFeatureStageRow(
      projectRoot,
      sessionId,
      dirName,
      { kind: RECORD_REPAIR_KIND, reason: STAGE_AGENT_SESSION_RELEASE, releases },
      now
    );
    released = true;
  }
  return released;
}
function hasOpenUnendedStage(rows) {
  for (const stage of stagesWithKind(rows, "stage_start")) {
    if (stageIsOpen(rows, stage)) {
      return true;
    }
  }
  return false;
}
var CLEANLY_ENDED = /* @__PURE__ */ new Set(["complete", "redone"]);
var NOT_REACHED = /* @__PURE__ */ new Set(["missing", "not-applicable", "skipped"]);
function isBetweenStages(projectRoot, sessionId, dirName) {
  if (isBundleClosed(projectRoot, dirName)) return false;
  const fold = foldFeature(projectRoot, sessionId, dirName);
  if (fold.lane === null || fold.completeness.missing_stages.length === 0) return false;
  const reached = fold.stages.filter((stage) => !NOT_REACHED.has(stage.state));
  return reached.length > 0 && reached.every((stage) => CLEANLY_ENDED.has(stage.state));
}
var SLICES_RUNNING_REASON = "slices running";
function sliceHold(projectRoot, dirName, rows, nowMs) {
  if (dirName === null || developmentEnded(rows)) return { running: 0, stopped: [] };
  const dropped = droppedSlices(projectRoot, dirName, rows);
  return {
    running: runningSlices(rows, nowMs, dropped).length,
    stopped: deadSlices(rows, nowMs, dropped).map((slice) => slice.id)
  };
}
function stoppedSlicesNote(ids) {
  return `paqad: slice ${ids.join(", ")} stopped before slice done. Dispatch it again, or answer a packet to drop it, before stage end development.`;
}
function pendingDecisionOf(projectRoot, dirName) {
  const key = featureChangeKey(dirName);
  return readContractDecisions(projectRoot).some(
    ({ packet, status }) => status !== "resolved" && packet.change === key
  );
}
function deferCompletionForBackgroundStage(input) {
  const tasks = runningTasks(Array.isArray(input.backgroundTasks) ? input.backgroundTasks : []);
  const now = input.now ?? (() => /* @__PURE__ */ new Date());
  const sessionId = resolveSessionId(input.projectRoot, input.sessionId ?? null);
  const checksRunning = liveChecksRunningMarker(input.projectRoot, sessionId, { ...input.probe, now }) !== null;
  const dirName = currentFeature(input.projectRoot, sessionId);
  const rows = dirName !== null ? readFeatureStageUnit(input.projectRoot, dirName) : [];
  const payloadNamesAgents = tasks.length > 0 && tasksCarryAgentType(tasks);
  const ledgerAgents = payloadNamesAgents ? 0 : liveStageAgents(rows).length;
  const betweenStages = dirName !== null && !hasOpenUnendedStage(rows) && isBetweenStages(input.projectRoot, sessionId, dirName);
  const slices = sliceHold(input.projectRoot, dirName, rows, now().getTime());
  const stopped = slices.stopped.length > 0 ? { stoppedSlices: slices.stopped, stoppedSlicesNote: stoppedSlicesNote(slices.stopped) } : {};
  if (tasks.length === 0 && !checksRunning && ledgerAgents === 0 && !betweenStages && slices.running === 0) {
    return { deferred: false, ...stopped };
  }
  let reason;
  let count;
  const stageAgents = stageAgentTaskCount(tasks);
  if (checksRunning) {
    reason = "checks run still running";
    count = tasks.length;
  } else if (stageAgents > 0) {
    reason = "stage agent running in background";
    count = stageAgents;
  } else if (ledgerAgents > 0) {
    reason = "stage agent running in background";
    count = ledgerAgents;
  } else if (slices.running > 0) {
    reason = SLICES_RUNNING_REASON;
    count = slices.running;
  } else if (betweenStages) {
    reason = "between stages";
    count = tasks.length;
  } else if (!tasksCarryAgentType(tasks) && dirName !== null && hasOpenUnendedStage(rows)) {
    reason = "background task running while a stage is open";
    count = tasks.length;
  } else {
    return { deferred: false, ...stopped };
  }
  const clockFree = reason === "between stages" || reason === SLICES_RUNNING_REASON || stageAgents === 0 && ledgerAgents > 0;
  if (!clockFree && deferralCeilingReached(rows, now)) {
    return { deferred: false };
  }
  if (dirName !== null && input.record !== false) {
    appendFeatureStageRow(
      input.projectRoot,
      sessionId,
      dirName,
      { kind: COMPLETION_DEFERRED_KIND, reason, tasks: count },
      input.now
    );
  }
  const next = reason === "between stages" && dirName !== null && !pendingDecisionOf(input.projectRoot, dirName) ? foldFeature(input.projectRoot, sessionId, dirName).completeness.missing_stages[0] : void 0;
  return { deferred: true, reason, tasks: count, ...next ? { nextStage: next } : {} };
}
function deferralCeilingReached(rows, now) {
  let firstDeferredAt = Number.POSITIVE_INFINITY;
  for (const row of rows) {
    if (row.kind === "verify") {
      firstDeferredAt = Number.POSITIVE_INFINITY;
      continue;
    }
    if (row.kind !== COMPLETION_DEFERRED_KIND) continue;
    const at = Date.parse(rowRecordedAt(row));
    if (Number.isNaN(at)) continue;
    firstDeferredAt = Math.min(firstDeferredAt, at);
  }
  return now().getTime() - firstDeferredAt >= CHECKS_RUNNING_CEILING_MS;
}
function onboardingStopNudge(projectRoot, stopSessionId, now = () => /* @__PURE__ */ new Date()) {
  const run = readRun(projectRoot);
  if (run === null || run.status !== "running" || stopSessionId !== run.owner_session) return null;
  const current = currentStage(run);
  if (current === null || run.stages[current].status !== "not_started") return null;
  const nudged = readEvents(projectRoot, run.run_id).some(
    (event) => event.kind === "heartbeat" && event.note === `nudge:${current}`
  );
  if (nudged) return null;
  appendEvent(projectRoot, {
    ts: now().toISOString(),
    run_id: run.run_id,
    kind: "heartbeat",
    note: `nudge:${current}`
  });
  return `paqad: onboarding is between steps and ${statusLine(current)} has not started. Run \`paqad-ai onboarding next\` and carry on, or \`paqad-ai onboarding abandon\` to pause.`;
}

export {
  ONBOARDING_STAGES,
  STAGE_COUNT,
  PROJECT_DOC_AREAS,
  MODULE_REGISTRIES_UNIT,
  isStageId,
  stageDefinition,
  stagesBefore,
  statusLine,
  unitRowsForStage,
  foldStage,
  currentStage,
  foldJourney,
  stageAgentTaskCount,
  tasksCarryAgentType,
  hostProcessAlive,
  releaseStageAgentsAtSessionStart,
  hasOpenUnendedStage,
  isBetweenStages,
  SLICES_RUNNING_REASON,
  stoppedSlicesNote,
  deferCompletionForBackgroundStage,
  onboardingStopNudge
};
