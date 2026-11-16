import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  CAPABILITY_IMPLS,
  clearRuleStopRecord,
  frontendTriggerOrFault,
  isManagedEnv,
  takeAllowedOnce,
  visualEvidenceFlagOn,
  writeRuleStopRecord
} from "../chunk-2L6Y5IUE.js";
import "../chunk-BTURFF4H.js";
import "../chunk-QVDTWXAE.js";
import "../chunk-LBGRKXEW.js";
import "../chunk-PVG47MG3.js";
import "../chunk-CXOGCOSW.js";
import "../chunk-G2BSGAGD.js";
import "../chunk-IKAOR4NY.js";
import "../chunk-BKNKG26S.js";
import "../chunk-SJKHVGZ5.js";
import "../chunk-QUJPMFQ4.js";
import "../chunk-P7EZBA7Y.js";
import "../chunk-CYAFQOZ5.js";
import "../chunk-2L4DHZJ6.js";
import "../chunk-CECHOUNN.js";
import {
  appendHooksLog
} from "../chunk-EGJD2UEP.js";
import "../chunk-6K7RTPCM.js";
import "../chunk-IV3YOX6V.js";
import "../chunk-HX3IC62P.js";
import "../chunk-G5I52VOH.js";
import "../chunk-3P4W22QI.js";
import "../chunk-CK4KV2B2.js";
import {
  capabilitiesForSeam
} from "../chunk-T5MY2FWT.js";
import "../chunk-LBNBI3D6.js";
import "../chunk-MVHA2RWU.js";
import "../chunk-UUBQQJVE.js";
import "../chunk-6MMKZ2NI.js";
import "../chunk-MDXUST3Z.js";
import {
  hudLastBlockPath
} from "../chunk-BHLWN7MT.js";
import "../chunk-DXEUJIJD.js";
import "../chunk-GTEHETTM.js";
import "../chunk-UDY3MMWJ.js";
import "../chunk-7KRQ7TSA.js";
import "../chunk-WLFUMAJW.js";
import "../chunk-MN67TZD6.js";
import "../chunk-P4RPU2KB.js";
import "../chunk-Y2ZLYYTT.js";
import {
  currentFeature
} from "../chunk-3RMUOOZL.js";
import "../chunk-TINPSX3N.js";
import "../chunk-BTDDEK7C.js";
import "../chunk-6BQ3LK3W.js";
import "../chunk-6KTWDVJB.js";
import "../chunk-ABZDAL5H.js";
import "../chunk-4UZQY3YQ.js";
import "../chunk-BOEVU2BD.js";
import "../chunk-NJE7NS7E.js";
import "../chunk-X25GN7Q4.js";
import "../chunk-YA6SCYMC.js";
import "../chunk-Z3NGWHFX.js";
import "../chunk-YWAORJG6.js";
import "../chunk-FNORANTL.js";
import {
  resolveSessionId
} from "../chunk-WPHHUTLG.js";
import "../chunk-OFCFJ7RN.js";
import {
  featureFilePath
} from "../chunk-6ZK23QLX.js";
import {
  PATHS
} from "../chunk-UIFRWT3J.js";
import {
  init_esm_shims
} from "../chunk-IDFRWBMN.js";

// src/kernel/gate.ts
init_esm_shims();

// src/visual-evidence/reminder.ts
init_esm_shims();
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { isAbsolute, join, relative } from "path";
var VISUAL_EVIDENCE_REMINDER = "This is a frontend change and visual evidence is on. Before review, run `paqad-ai visual-evidence run` or attach screenshots with `paqad-ai visual-evidence attach`.";
var REMINDER_MARKER_DIR = join(PATHS.AGENCY_SESSION_DIR, "visual-evidence-reminded");
function visualEvidenceReminder(input) {
  const { projectRoot } = input;
  if (!visualEvidenceFlagOn(projectRoot)) return null;
  const targets = input.targetPaths.map(
    (target) => isAbsolute(target) ? relative(projectRoot, target) : target
  );
  if (!frontendTriggerOrFault(projectRoot, targets).triggered) return null;
  const dirName = currentFeature(projectRoot, resolveSessionId(projectRoot, input.sessionId));
  if (!dirName) return null;
  if (existsSync(join(projectRoot, featureFilePath(dirName, "visualEvidence")))) return null;
  const marker = join(projectRoot, REMINDER_MARKER_DIR, dirName);
  try {
    mkdirSync(join(projectRoot, REMINDER_MARKER_DIR), { recursive: true });
    writeFileSync(marker, `${(/* @__PURE__ */ new Date()).toISOString()}
`, { encoding: "utf8", flag: "wx" });
  } catch {
    return null;
  }
  return VISUAL_EVIDENCE_REMINDER;
}

// src/kernel/gate.ts
var ALLOW_ONCE_REASON = "You allowed this edit once in the paqad HUD, and paqad recorded the override. Approve to run it.";
function reminderContext(projectRoot, env, payload) {
  try {
    return visualEvidenceReminder({
      projectRoot,
      targetPaths: payload?.targetPaths ?? (payload?.targetPath ? [payload.targetPath] : []),
      sessionId: payload?.sessionId ?? env.CLAUDE_SESSION_ID ?? null
    }) ?? "";
  } catch {
    return "";
  }
}
function errorKind(error) {
  if (error && typeof error === "object" && "code" in error && typeof error.code === "string") {
    return error.code;
  }
  return error instanceof Error ? error.name : "unknown";
}
function callerLoadedFramework(entryLoaded) {
  try {
    return entryLoaded?.() === true;
  } catch {
    return false;
  }
}
function syncRuleStopRecord(projectRoot, env, payload, blocking, entryLoaded) {
  const sessionId = payload?.sessionId ?? env.CLAUDE_SESSION_ID;
  if (!sessionId) return;
  const violation = blocking.flatMap((outcome) => outcome.violations ?? [])[0];
  const sole = blocking.length === 1 && (blocking[0]?.violations?.length ?? 0) > 0 && callerLoadedFramework(entryLoaded);
  try {
    if (!violation) {
      if (blocking.length === 0) clearRuleStopRecord(projectRoot, sessionId);
      return;
    }
    writeRuleStopRecord({
      projectRoot,
      sessionId,
      rule: violation.rule_id,
      title: violation.title ?? null,
      file: violation.file,
      toolUseId: payload?.toolUseId ?? null,
      managed: isManagedEnv(env),
      sole,
      toolInput: payload?.toolInput
    });
  } catch (error) {
    appendHooksLog(
      projectRoot,
      `capability-gate rule-stop record not written: ${errorKind(error)} ${hudLastBlockPath(projectRoot, sessionId)}`
    );
  }
}
function allowedOnce(projectRoot, env, payload, blocking) {
  try {
    const sessionId = payload?.sessionId ?? env.CLAUDE_SESSION_ID;
    if (!sessionId || isManagedEnv(env)) return false;
    if (payload?.adapter !== void 0 && payload.adapter !== "claude-code") return false;
    const violations = blocking.length === 1 ? blocking[0]?.violations ?? [] : [];
    const violation = violations.length === 1 ? violations[0] : void 0;
    if (!violation) return false;
    const taken = takeAllowedOnce(projectRoot, sessionId, {
      toolUseId: payload?.toolUseId,
      rule: violation.rule_id,
      file: violation.file
    });
    if (taken) {
      appendHooksLog(
        projectRoot,
        `capability-gate allowed once: asked for ${violation.rule_id} on ${violation.file} (tool_use_id ${payload?.toolUseId})`
      );
    }
    return taken;
  } catch (error) {
    appendHooksLog(projectRoot, `capability-gate allowed-once check failed: ${errorKind(error)}`);
    return false;
  }
}
async function runCapabilityGate(input) {
  const { projectRoot, seam, env = process.env, payload, entryLoaded, startedAt, now } = input;
  const outcomes = [];
  const narrations = [];
  const contexts = [];
  for (const descriptor of capabilitiesForSeam(seam)) {
    const capability = CAPABILITY_IMPLS.get(descriptor.id);
    if (!capability) {
      continue;
    }
    const outcome = await capability.evaluate({
      projectRoot,
      seam,
      env,
      payload,
      ...startedAt === void 0 ? {} : { startedAt },
      ...now ? { now } : {}
    });
    if (outcome.narration) {
      narrations.push(outcome.narration);
    }
    if (outcome.context) {
      contexts.push(outcome.context);
    }
    if (outcome.ran && outcome.summary) {
      outcomes.push(outcome);
    }
  }
  const narration = narrations.join("\n");
  const context = seam === "pre-mutation" ? [...contexts, reminderContext(projectRoot, env, payload)].filter(Boolean).join("\n") : "";
  const blocking = outcomes.filter((outcome) => outcome.blocking);
  if (seam === "pre-mutation" && allowedOnce(projectRoot, env, payload, blocking)) {
    return { block: false, ask: ALLOW_ONCE_REASON, summary: "", narration, context };
  }
  if (seam === "pre-mutation") {
    syncRuleStopRecord(projectRoot, env, payload, blocking, entryLoaded);
  }
  if (blocking.length > 0) {
    return {
      block: true,
      summary: blocking.map((outcome) => outcome.summary).join("\n"),
      narration,
      context
    };
  }
  return {
    block: false,
    summary: outcomes.map((outcome) => outcome.summary).join("\n"),
    narration,
    context
  };
}
export {
  ALLOW_ONCE_REASON,
  runCapabilityGate
};
