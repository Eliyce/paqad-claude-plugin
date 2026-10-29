import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  readContractDecisions
} from "./chunk-4GJVTR5P.js";
import {
  stageIsOpen,
  stagesWithKind
} from "./chunk-UFA47PK6.js";
import {
  appendFeatureStageRow,
  currentFeature,
  foldFeature,
  readFeatureStageUnit
} from "./chunk-WTYH7MZ3.js";
import {
  COMPLETION_DEFERRED_KIND,
  RECORD_REPAIR_KIND,
  STAGE_AGENT_SESSION_RELEASE,
  heldInFlightOnBranch,
  isBundleClosed,
  liveStageAgents,
  rowRecordedAt
} from "./chunk-VV76C43H.js";
import {
  stripPluginAgentNamespace
} from "./chunk-TVWMFQYX.js";
import {
  resolveSessionId
} from "./chunk-HV6ESCNW.js";
import {
  featureChangeKey
} from "./chunk-DDJC5PRW.js";
import {
  PATHS
} from "./chunk-LW3OCT4Y.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/stage-evidence/completion-deferred.ts
init_esm_shims();

// src/checks/running-marker.ts
init_esm_shims();
import { execFileSync } from "child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { dirname, join } from "path";
var CHECKS_RUNNING_CEILING_MS = 30 * 60 * 1e3;
var CHECKS_RUN_COMMAND = /\bchecks\s+run\b/;
function safeSessionId(sessionId) {
  return sessionId.replace(/[^A-Za-z0-9._-]/g, "_").replace(/^\.+/, "_") || "unknown";
}
function checksRunningMarkerPath(projectRoot, sessionId) {
  return join(projectRoot, PATHS.CHECKS_DIR, "running", `${safeSessionId(sessionId)}.json`);
}
function writeChecksRunningMarker(projectRoot, marker) {
  const path = checksRunningMarkerPath(projectRoot, marker.session_id);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(marker, null, 2)}
`, "utf8");
  return path;
}
function readChecksRunningMarker(projectRoot, sessionId) {
  try {
    const parsed = JSON.parse(
      readFileSync(checksRunningMarkerPath(projectRoot, sessionId), "utf8")
    );
    return isMarker(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
function clearChecksRunningMarker(projectRoot, sessionId, pid) {
  if (readChecksRunningMarker(projectRoot, sessionId)?.pid !== pid) {
    return;
  }
  rmSync(checksRunningMarkerPath(projectRoot, sessionId), { force: true });
}
function liveChecksRunningMarker(projectRoot, sessionId, probe = {}) {
  const marker = readChecksRunningMarker(projectRoot, sessionId);
  if (!marker || marker.session_id !== sessionId) {
    return null;
  }
  const age = (probe.now ?? (() => /* @__PURE__ */ new Date()))().getTime() - Date.parse(marker.started_at);
  if (Number.isNaN(age) || age < 0 || age >= CHECKS_RUNNING_CEILING_MS) {
    return null;
  }
  if (!(probe.isAlive ?? processIsAlive)(marker.pid)) {
    return null;
  }
  const command = (probe.commandOf ?? processCommand)(marker.pid);
  return command !== null && CHECKS_RUN_COMMAND.test(command) ? marker : null;
}
function processIsAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error.code === "EPERM";
  }
}
function processCommand(pid) {
  if (process.platform === "win32") {
    return null;
  }
  try {
    return execFileSync("ps", ["-o", "command=", "-p", String(pid)], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch {
    return null;
  }
}
function isMarker(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const m = value;
  return Number.isInteger(m.pid) && m.pid > 0 && typeof m.session_id === "string" && (m.change === null || typeof m.change === "string") && typeof m.started_at === "string";
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
  if (tasks.length === 0 && !checksRunning && ledgerAgents === 0 && !betweenStages) {
    return { deferred: false };
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
  } else if (betweenStages) {
    reason = "between stages";
    count = tasks.length;
  } else if (!tasksCarryAgentType(tasks) && dirName !== null && hasOpenUnendedStage(rows)) {
    reason = "background task running while a stage is open";
    count = tasks.length;
  } else {
    return { deferred: false };
  }
  const clockFree = reason === "between stages" || stageAgents === 0 && ledgerAgents > 0;
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

export {
  writeChecksRunningMarker,
  clearChecksRunningMarker,
  liveChecksRunningMarker,
  stageAgentTaskCount,
  tasksCarryAgentType,
  hostProcessAlive,
  releaseStageAgentsAtSessionStart,
  hasOpenUnendedStage,
  isBetweenStages,
  deferCompletionForBackgroundStage
};
