import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  CAPABILITY_IMPLS,
  clearRuleStopRecord,
  frontendTriggerOrFault,
  isManagedEnv,
  takeAllowedOnce,
  visualEvidenceFlagOn,
  writeRuleStopRecord
} from "../chunk-3AKVAXRJ.js";
import "../chunk-E4ZQOAV4.js";
import "../chunk-KXN6TRQP.js";
import "../chunk-Z4GLUCC5.js";
import "../chunk-LGAFOBYN.js";
import "../chunk-WRHJCBRI.js";
import "../chunk-73AIVIC6.js";
import "../chunk-IKAOR4NY.js";
import "../chunk-GCMANDHS.js";
import "../chunk-BKNKG26S.js";
import "../chunk-7Q65STES.js";
import "../chunk-K4E6ACLH.js";
import "../chunk-4ZAWKFXT.js";
import "../chunk-CECHOUNN.js";
import {
  appendHooksLog
} from "../chunk-4S3XFJAH.js";
import "../chunk-HNYZUZ7D.js";
import "../chunk-AK3HYELM.js";
import "../chunk-6XDDIYNJ.js";
import "../chunk-THDANA7U.js";
import "../chunk-I2G54BH7.js";
import {
  capabilitiesForSeam
} from "../chunk-SS625UO5.js";
import {
  hudLastBlockPath
} from "../chunk-3UV6TK6X.js";
import "../chunk-LBNBI3D6.js";
import "../chunk-5ETIY5I3.js";
import "../chunk-UUBQQJVE.js";
import "../chunk-EQYAXXZO.js";
import "../chunk-MDXUST3Z.js";
import "../chunk-22I2D24D.js";
import "../chunk-OAEANL22.js";
import "../chunk-S3UQUJV2.js";
import "../chunk-VOJO7HJ6.js";
import "../chunk-7D5MLTG3.js";
import "../chunk-Y3O45QYV.js";
import "../chunk-P4RPU2KB.js";
import "../chunk-LYNDVGNE.js";
import {
  currentFeature
} from "../chunk-5M55PDWL.js";
import "../chunk-TINPSX3N.js";
import "../chunk-BTDDEK7C.js";
import "../chunk-7TBVBCDH.js";
import "../chunk-RJMJYPHL.js";
import "../chunk-NCYDV2N5.js";
import "../chunk-D6VEUSB6.js";
import "../chunk-BOEVU2BD.js";
import "../chunk-NJE7NS7E.js";
import "../chunk-ACJQW7SB.js";
import "../chunk-YA6SCYMC.js";
import "../chunk-Z3NGWHFX.js";
import "../chunk-YWAORJG6.js";
import "../chunk-Q353EDKY.js";
import {
  resolveSessionId
} from "../chunk-SG6LXLDH.js";
import "../chunk-FMQ5YRSP.js";
import {
  featureFilePath
} from "../chunk-AZLA53A6.js";
import {
  PATHS
} from "../chunk-IHMBVS6H.js";
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
