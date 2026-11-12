import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  bundleLedgerEra
} from "./chunk-WKGFBXSZ.js";
import {
  transcriptToolUses
} from "./chunk-74MYOMJB.js";
import {
  extractAssistantText
} from "./chunk-MRKKVJI5.js";
import {
  appendFeatureStageRow,
  currentFeature,
  readFeatureStageUnit
} from "./chunk-AFASV43S.js";
import {
  REPORT_REPAIR_REASON,
  STAGE_AGENT_KIND,
  STAGE_HANDBACK_KIND,
  readRepairedReports
} from "./chunk-DAC2ETKH.js";
import {
  sha256Hex
} from "./chunk-RJMJYPHL.js";
import {
  STAGE_ORDER,
  agentNameForStage,
  readStageReportStatus,
  stageForAgentName,
  stripPluginAgentNamespace
} from "./chunk-EGVDRAXB.js";
import {
  resolveHookSession
} from "./chunk-SG6LXLDH.js";
import {
  featureFilePath
} from "./chunk-AZLA53A6.js";
import {
  PATHS
} from "./chunk-IHMBVS6H.js";
import {
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/stage-isolation/stage-handback.ts
init_esm_shims();
import { randomUUID } from "crypto";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

// src/onboarding/narration-contract-writer.ts
init_esm_shims();
var RESUME_HANDOVER_TOKENS = 15e4;
var PLANNING_TO_SPECIFICATION_RESUME = "Planning is done. Continue as the specification stage for the same change. Run `paqad-ai stage brief specification` and follow it.";
var HIGH_TABLE_RULED_RESUME = "The High Table has ruled. Continue the specification stage from the questions step.";
var RESUME_PROTOCOL_PARAGRAPH = `**The resume protocol.** On Claude Code resume a stage agent with \`SendMessage\` and its agent id; on Codex use \`send_input\`. A resumed agent keeps its whole conversation, so it does not re-read what it already read, and it gets no new stage brief: when it moves to another stage, the resume message tells it to run \`paqad-ai stage brief <stage>\`. Dispatch a fresh agent instead only when the host cannot resume, refuses the resume or reports the agent gone, or when that agent's latest completion row (its newest \`stage-agent\` row with \`event_status: completed\` for that \`agent_id\`, never a sum of its rows) shows \`tokens_not_recarried\` above ${RESUME_HANDOVER_TOKENS}. A fresh dispatch hands over in its prompt the files changed so far, the decisions made and what is left. Hosts with no resume (Cursor, Gemini CLI, Copilot, Windsurf, Junie and the rest) keep the fresh-dispatch flow: every stage in a new agent, and a stage that paused dispatched again after \`paqad-ai decision resolve\`.`;
var PLANNING_TO_SPECIFICATION_PARAGRAPH = `**Planning and specification in one agent (full lane).** When \`paqad-planning\` returns \`completed\`, do not dispatch \`paqad-specification\`. Resume the same agent with: "${PLANNING_TO_SPECIFICATION_RESUME}" When it returns after \`experts record\`, dispatch the expert seats and the chief in parallel as below, then resume the same agent again with: "${HIGH_TABLE_RULED_RESUME}" Follow the resume protocol below; its fresh-dispatch exit applies here the same way.`;

// src/stage-isolation/stage-handback.ts
var REFUSAL_CEILING = 3;
var RIGID_ARTIFACT = {
  planning: "plan.json",
  specification: "specification.json",
  review: "review.json",
  checks: "checks.json"
};
function lastIndexWhere(rows, match) {
  for (let index = rows.length - 1; index >= 0; index -= 1) {
    if (match(rows[index])) return index;
  }
  return -1;
}
function stringField(value) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}
function stageEndCommand(stage) {
  const agent = `--agent ${agentNameForStage(stage)}`;
  const artifact = RIGID_ARTIFACT[stage];
  return artifact ? `paqad-ai stage end ${stage} ${agent} --artifact <the ${artifact} path>` : `paqad-ai stage end ${stage} ${agent}`;
}
function missingRequirementReason(stage) {
  const what = RIGID_ARTIFACT[stage] ? "its artifact" : "its stage end row";
  return `${stage} ended without ${what}; run \`${stageEndCommand(stage)}\` first`;
}
function currentStageOfAgent(rows, agentId, agentType) {
  const started = agentId ? rows.filter((row) => row.kind === "stage_start" && row.agent_id === agentId).at(-1) : void 0;
  const fromStart = started ? stringField(started.stage) : null;
  if (fromStart) return fromStart;
  return agentType ? stageForAgentName(stripPluginAgentNamespace(agentType.trim())) : null;
}
function requirementAnchor(rows, stage, agentId) {
  const findLast = (match) => lastIndexWhere(rows, match);
  const own = agentId ? findLast(
    (row) => row.kind === "stage_start" && row.stage === stage && row.agent_id === agentId
  ) : -1;
  if (own !== -1) return own;
  return findLast((row) => row.kind === "stage_start" && row.stage === stage);
}
function endRowProvesStage(row, stage) {
  if (row.kind !== "stage_end" || row.stage !== stage) return false;
  const artifact = RIGID_ARTIFACT[stage];
  if (!artifact) return true;
  const paths = Array.isArray(row.artifact_paths) ? row.artifact_paths : [];
  const named = paths.some((path) => typeof path === "string" && path.endsWith(artifact));
  return stringField(row.artifact_digest) !== null && named;
}
function stageRequirementMet(rows, stage, agentId) {
  const anchor = requirementAnchor(rows, stage, agentId);
  return rows.slice(anchor + 1).some((row) => endRowProvesStage(row, stage));
}
function refusalId(row) {
  return stringField(row.tool_use_id) ?? stringField(row.refusal_id) ?? row.content_hash;
}
function isOwnNonDenied(row, agentId, stage) {
  if (row.agent_id !== agentId || row.stage !== stage) return false;
  if (row.kind === STAGE_AGENT_KIND) return true;
  return row.kind === STAGE_HANDBACK_KIND && row.event_status !== "denied";
}
function refusalsSinceLastPass(rows, agentId, stage) {
  if (agentId === null) return [];
  const anchor = lastIndexWhere(rows, (row) => isOwnNonDenied(row, agentId, stage));
  const denied = rows.slice(anchor + 1).filter(
    (row) => row.kind === STAGE_HANDBACK_KIND && row.event_status === "denied" && row.agent_id === agentId && row.stage === stage
  );
  const seen = /* @__PURE__ */ new Set();
  return denied.filter((row) => {
    const id = refusalId(row);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}
function judgeStageReport(input) {
  const { reading, stage, agentId, rows } = input;
  const settled = {
    report_status: reading.status,
    report_stated: reading.stated,
    decision: reading.decision
  };
  if (!reading.stated || reading.decision !== null || !reading.advance) {
    return { outcome: "pass", ...settled, advance: false };
  }
  if (stageRequirementMet(rows, stage, agentId)) {
    const clean = input.checksRed !== true && (input.violations?.length ?? 0) === 0;
    return { outcome: "pass", ...settled, advance: clean };
  }
  const reason = missingRequirementReason(stage);
  if (refusalsSinceLastPass(rows, agentId, stage).length >= REFUSAL_CEILING) {
    return {
      outcome: "ceiling",
      report_status: "BLOCKED",
      report_stated: true,
      advance: false,
      decision: null,
      stated_status: reading.status,
      reason: `refused ${REFUSAL_CEILING} times: ${reason}`
    };
  }
  return {
    outcome: "refuse",
    ...settled,
    advance: false,
    stated_status: reading.status,
    reason
  };
}
var PASS_WITHOUT_ROW = { exit: 0, wrote: false };
function agentKnownToLedger(rows, agentId) {
  return rows.some(
    (row) => row.agent_id === agentId && (row.kind === STAGE_AGENT_KIND || row.kind === "stage_start")
  );
}
function decideHandback(input) {
  const { payload, projectRoot, now } = input;
  const agentType = stringField(payload.agent_type);
  const agentId = stringField(payload.agent_id);
  if (!agentType || !agentId) return PASS_WITHOUT_ROW;
  if (!stageForAgentName(stripPluginAgentNamespace(agentType))) return PASS_WITHOUT_ROW;
  const sessionId = resolveHookSession(projectRoot, payload);
  const dirName = currentFeature(projectRoot, sessionId);
  if (!dirName) return PASS_WITHOUT_ROW;
  const rows = readFeatureStageUnit(projectRoot, dirName);
  if (!agentKnownToLedger(rows, agentId)) return PASS_WITHOUT_ROW;
  const stage = currentStageOfAgent(rows, agentId, agentType);
  if (!stage) return PASS_WITHOUT_ROW;
  const message = typeof payload.tool_input?.message === "string" ? payload.tool_input.message : "";
  const reading = readStageReportStatus(message);
  const judged = judgeStageReport({
    stage,
    agentId,
    reading,
    rows,
    checksRed: isChecksRed(projectRoot, dirName, stage)
  });
  const toolUseId = stringField(payload.tool_use_id);
  appendFeatureStageRow(
    projectRoot,
    sessionId,
    dirName,
    {
      kind: STAGE_HANDBACK_KIND,
      stage,
      agent: agentNameForStage(stage),
      agent_id: agentId,
      event_status: judged.outcome === "refuse" ? "denied" : "completed",
      report_status: judged.report_status,
      report_stated: judged.report_stated,
      advance: judged.advance,
      decision: judged.decision,
      report_source: "handback",
      report_hash: sha256Hex(message),
      ...toolUseId ? { tool_use_id: toolUseId } : { refusal_id: randomUUID() },
      ...judged.stated_status ? { stated_status: judged.stated_status } : {},
      ...judged.reason ? { reason: judged.reason } : {}
    },
    now
  );
  return judged.outcome === "refuse" ? { exit: 2, reason: judged.reason, wrote: true } : { exit: 0, wrote: true };
}
function isChecksRed(projectRoot, dirName, stage) {
  if (stage !== "checks") return false;
  try {
    const report = JSON.parse(
      readFileSync(join(projectRoot, featureFilePath(dirName, "checks")), "utf8")
    );
    return report.passed === false;
  } catch {
    return false;
  }
}
function resumeAdvice(tokens) {
  return tokens !== null && tokens > RESUME_HANDOVER_TOKENS ? "dispatch-fresh" : "resume";
}
function stageReportOptions(projectRoot, dirName) {
  return {
    checksRed: (stage) => isChecksRed(projectRoot, dirName, stage),
    decisionAnswered: (decision) => existsSync(join(projectRoot, PATHS.DECISIONS_RESOLVED_DIR, `${decision}.json`))
  };
}
function nextAction(report, options) {
  if (report.decision) {
    return options.decisionAnswered?.(report.decision) ? `resume the agent with the answer to ${report.decision}` : `present the decision ${report.decision} to the developer`;
  }
  if (report.report_source === "legacy") return "read the stage's end row in stage-evidence.jsonl";
  if (report.advance === true) {
    return report.report_status === "DONE_WITH_CONCERNS" ? "continue, and carry the concerns to the receipt" : "continue to the next stage";
  }
  if (report.report_status === "NEEDS_CONTEXT") return "resume the agent with what it names";
  if (report.report_source === "none") {
    return "resume the agent once, naming what is left; if it returns the same way, stop and tell the developer";
  }
  return report.reason ? "stop and tell the developer the reason" : "stop and tell the developer which stage stopped";
}
function withAction(report, options = {}) {
  return { ...report, next_action: nextAction(report, options) };
}
function endRowHold(stage, rows, options) {
  const breaches = rows.flatMap((row) => Array.isArray(row?.must_not) ? row.must_not : []);
  if (breaches.length > 0) {
    return {
      reason: `no Status line, and the agent breached a must-not: ${[...new Set(breaches)].join(", ")}`,
      action: "stop and tell the developer the reason"
    };
  }
  return options.checksRed?.(stage) === true ? {
    reason: "no Status line, and the checks are red",
    action: "resume the development agent to fix the failures, then run checks again"
  } : null;
}
function numberField(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
function buildStageReport(rows, agentId, options = {}) {
  const own = rows.filter((row) => row.agent_id === agentId);
  const reported = own.filter(
    (row) => row.kind === STAGE_HANDBACK_KIND || row.kind === STAGE_AGENT_KIND && row.event_status === "completed"
  );
  const newest = reported.at(-1);
  const completion = own.filter((row) => row.kind === STAGE_AGENT_KIND && row.event_status === "completed").at(-1);
  const tokens = numberField(completion?.tokens_not_recarried);
  const base = {
    agent_id: agentId,
    tokens_not_recarried: tokens,
    resume_advice: resumeAdvice(tokens)
  };
  if (!newest) {
    if (own.length === 0) return null;
    return {
      ...withAction({
        ...base,
        stage: stringField(own.at(-1).stage),
        report_status: "UNKNOWN",
        advance: false,
        decision: null,
        report_source: "none",
        reason: "the agent is still running and has given no report"
      }),
      next_action: "wait for the agent to return; if it has already returned, resume it once"
    };
  }
  const stage = stringField(newest.stage);
  const reason = stringField(newest.reason);
  const source = stringField(newest.report_source);
  const noClaim = source === "none" || newest.report_stated !== true;
  const requirementMet = stage !== null && stageRequirementMet(rows, stage, agentId);
  const hold = stage === null ? null : endRowHold(stage, [newest, completion], options);
  const silentReturns = own.filter(
    (row) => row.kind === STAGE_AGENT_KIND && row.event_status === "completed" && row.report_stated !== true
  ).length;
  const twiceSilent = `stop and tell the developer the ${stage ?? "current"} stage returned twice with no report`;
  const held = (report2) => hold === null ? report2 : { ...report2, next_action: silentReturns >= 2 ? twiceSilent : hold.action };
  const repaired = noClaim ? readRepairedReports(rows).find((entry) => entry.agent_id === agentId) : void 0;
  if (repaired !== void 0) {
    const finished = repaired.report_status.startsWith("DONE");
    return held(
      withAction(
        {
          ...base,
          stage,
          report_status: repaired.report_status,
          advance: finished && requirementMet && hold === null,
          decision: null,
          report_source: repaired.source,
          reason: hold?.reason ?? REPORT_REPAIR_REASON
        },
        options
      )
    );
  }
  if (source === null && newest.report_stated !== true) {
    return withAction({
      ...base,
      stage,
      report_status: "UNKNOWN",
      advance: null,
      decision: null,
      report_source: "legacy",
      reason
    });
  }
  if (noClaim && requirementMet) {
    return held(
      withAction(
        {
          ...base,
          stage,
          report_status: hold === null ? "DONE" : "DONE_WITH_CONCERNS",
          advance: hold === null,
          decision: null,
          report_source: source ?? "none",
          reason: hold?.reason ?? "no Status line, and the stage's end row and result exist"
        },
        options
      )
    );
  }
  const report = withAction(
    {
      ...base,
      stage,
      report_status: noClaim ? "BLOCKED" : String(newest.report_status),
      advance: newest.advance === true,
      decision: stringField(newest.decision),
      report_source: source ?? "text",
      reason: reason ?? (noClaim ? "the agent returned no report" : null)
    },
    options
  );
  if (noClaim && silentReturns >= 2) return { ...report, next_action: twiceSilent };
  return newest.kind === STAGE_HANDBACK_KIND && newest.event_status === "denied" ? {
    ...report,
    next_action: "wait for the agent: its handback was sent back and it can retry; if it has already returned, resume it once"
  } : report;
}
function unknownAgentReport(agentId, reason) {
  return withAction({
    agent_id: agentId,
    stage: null,
    report_status: "UNKNOWN",
    advance: false,
    decision: null,
    report_source: "none",
    reason,
    tokens_not_recarried: null,
    resume_advice: "resume"
  });
}
function reportedStage(rows, index) {
  const row = rows[index];
  const agentId = stringField(row.agent_id);
  if (agentId !== null) {
    const started = lastIndexWhere(
      rows.slice(0, index),
      (candidate) => candidate.kind === "stage_start" && candidate.agent_id === agentId
    );
    const stage = started === -1 ? null : stringField(rows[started].stage);
    if (stage !== null) return stage;
  }
  return stringField(row.stage);
}
function isStatedReport(row) {
  const reporting = row.kind === STAGE_HANDBACK_KIND ? row.event_status === "completed" : row.kind === STAGE_AGENT_KIND && row.event_status === "completed";
  return reporting && row.report_stated === true && stringField(row.report_source) !== null && row.report_source !== "none";
}
function newestReportIndex(rows, stage) {
  for (let index = rows.length - 1; index >= 0; index -= 1) {
    if (isStatedReport(rows[index]) && reportedStage(rows, index) === stage) return index;
  }
  return -1;
}
function isUnfinishedReport(row) {
  return row.report_status === "BLOCKED" || row.report_status === "NEEDS_CONTEXT" || stringField(row.decision) !== null;
}
function refusalMessage(stage, blocked, rows, row, options) {
  const agentId = stringField(row.agent_id);
  const report = agentId ? buildStageReport(rows, agentId, options) : null;
  const status = stringField(row.decision) ?? String(row.report_status);
  const reason = stringField(row.reason);
  const next = report?.next_action ?? "resume the stage agent";
  return `${stage} cannot start: ${blocked} is unfinished (${status})${reason ? `: ${reason}` : ""}. Next: ${next}.`;
}
function stageStartRefusal(rows, stage, lane, options = {}) {
  if (lane === "fast" || lane === "graduated") return null;
  if (bundleLedgerEra(rows) !== "v3") return null;
  const position = STAGE_ORDER.indexOf(stage);
  if (position === -1) return null;
  for (const earlier of STAGE_ORDER.slice(0, position)) {
    if (stage === "documentation_sync" && earlier === "review") continue;
    const index = newestReportIndex(rows, earlier);
    if (index === -1) continue;
    const row = rows[index];
    if (!isUnfinishedReport(row)) continue;
    if (rows.slice(index + 1).some((later) => endRowProvesStage(later, earlier))) continue;
    return { stage: earlier, message: refusalMessage(stage, earlier, rows, row, options) };
  }
  return null;
}
var SUBAGENT_HANDBACK_TOOL = "SubagentHandback";
var NO_REPORT = {
  status: "BLOCKED",
  advance: false,
  decision: null,
  stated: false
};
function isCompletedRowOf(row, agentId) {
  return row.kind === STAGE_AGENT_KIND && row.event_status === "completed" && row.agent_id === agentId;
}
function freshHandbackRow(rows, agentId) {
  const previous = lastIndexWhere(rows, (row) => isCompletedRowOf(row, agentId));
  const newer = rows.slice(previous + 1);
  const index = lastIndexWhere(
    newer,
    (candidate) => candidate.kind === STAGE_HANDBACK_KIND && candidate.event_status === "completed" && candidate.agent_id === agentId
  );
  return index === -1 ? null : newer[index];
}
function transcriptHandbackMessage(rows, agentId, transcript) {
  const known = new Set(
    rows.filter((row) => row.kind === STAGE_HANDBACK_KIND && row.agent_id === agentId).map((row) => stringField(row.tool_use_id)).filter((id) => id !== null)
  );
  const finished = new Set(
    rows.filter((row) => isCompletedRowOf(row, agentId)).map((row) => stringField(row.report_hash)).filter((hash) => hash !== null)
  );
  const use = transcriptToolUses(transcript).filter((entry) => entry.name === SUBAGENT_HANDBACK_TOOL).at(-1);
  if (!use || use.id !== void 0 && known.has(use.id)) return null;
  const message = use.input.message;
  if (typeof message !== "string" || finished.has(sha256Hex(message))) return null;
  return message;
}
function readTranscript(path) {
  if (typeof path !== "string" || path.trim() === "") return "";
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
function resolved(source, message, gateChecked = true) {
  const reading = readStageReportStatus(message);
  return reading.stated ? { source, reading, message, handbackRow: null, gateChecked } : { source: "none", reading, message, handbackRow: null, gateChecked };
}
function resolveStageReport(input) {
  const { rows, agentId, payload, adapter } = input;
  const row = agentId ? freshHandbackRow(rows, agentId) : null;
  if (row) {
    const reading = {
      status: row.report_status,
      advance: row.advance === true,
      decision: stringField(row.decision),
      stated: row.report_stated === true
    };
    return { source: "handback", reading, message: null, handbackRow: row, gateChecked: true };
  }
  const transcript = readTranscript(payload.agent_transcript_path);
  const handed = agentId ? transcriptHandbackMessage(rows, agentId, transcript) : null;
  if (handed !== null) return resolved("handback", handed, false);
  const finalText = payload.last_assistant_message;
  if (typeof finalText === "string" && finalText.trim() !== "") return resolved("text", finalText);
  const codex = adapter === "codex-cli";
  const raw = transcript !== "" ? transcript : codex ? input.fallbackTranscript ?? "" : "";
  if (raw === "") {
    return {
      source: "none",
      reading: NO_REPORT,
      message: null,
      handbackRow: null,
      gateChecked: true
    };
  }
  return resolved(codex ? "rollout" : "text", extractAssistantText(raw));
}
var LET_STOP = { block: false };
function decideStageStop(input) {
  const { payload, projectRoot, adapter, now } = input;
  if (adapter === "codex-cli") return LET_STOP;
  const agentType = stringField(payload.agent_type);
  const agentId = stringField(payload.agent_id);
  if (!agentType || !agentId) return LET_STOP;
  if (!stageForAgentName(stripPluginAgentNamespace(agentType))) return LET_STOP;
  const sessionId = resolveHookSession(projectRoot, payload);
  const dirName = currentFeature(projectRoot, sessionId);
  if (!dirName) return LET_STOP;
  const rows = readFeatureStageUnit(projectRoot, dirName);
  if (!agentKnownToLedger(rows, agentId)) return LET_STOP;
  const stage = currentStageOfAgent(rows, agentId, agentType);
  if (!stage) return LET_STOP;
  const report = resolveStageReport({
    rows,
    agentId,
    payload,
    adapter,
    fallbackTranscript: input.transcriptText
  });
  if (report.handbackRow) return LET_STOP;
  const judged = judgeStageReport({ stage, agentId, reading: report.reading, rows });
  if (judged.outcome !== "refuse") return LET_STOP;
  appendFeatureStageRow(
    projectRoot,
    sessionId,
    dirName,
    {
      kind: STAGE_HANDBACK_KIND,
      stage,
      agent: agentNameForStage(stage),
      agent_id: agentId,
      event_status: "denied",
      report_status: judged.report_status,
      report_stated: judged.report_stated,
      advance: false,
      decision: judged.decision,
      report_source: report.source,
      report_hash: sha256Hex(report.message),
      refusal_id: randomUUID(),
      stated_status: judged.stated_status,
      reason: judged.reason
    },
    now
  );
  return { block: true, reason: judged.reason };
}

export {
  REFUSAL_CEILING,
  stageEndCommand,
  missingRequirementReason,
  currentStageOfAgent,
  stageRequirementMet,
  refusalsSinceLastPass,
  judgeStageReport,
  decideHandback,
  isChecksRed,
  stageReportOptions,
  buildStageReport,
  unknownAgentReport,
  stageStartRefusal,
  SUBAGENT_HANDBACK_TOOL,
  resolveStageReport,
  decideStageStop
};
