import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  CAPABILITY_IMPLS,
  clearRuleStopRecord,
  frontendTriggerOrFault,
  isManagedEnv,
  takeAllowedOnce,
  visualEvidenceFlagOn,
  writeRuleStopRecord
} from "../chunk-MNDIAGVL.js";
import "../chunk-YT7KYIQP.js";
import "../chunk-NWKNIJBO.js";
import "../chunk-HH727BKB.js";
import "../chunk-QZYGLSRK.js";
import "../chunk-NJCFQXHN.js";
import "../chunk-FQVAS2WV.js";
import "../chunk-XT45N7K2.js";
import "../chunk-C3FH5AYD.js";
import "../chunk-QIHQFCHB.js";
import "../chunk-DKFOHIMU.js";
import "../chunk-TBR64PVU.js";
import "../chunk-BDNBTMZL.js";
import "../chunk-FBUUUOJ6.js";
import {
  appendHooksLog
} from "../chunk-IVPPGREZ.js";
import "../chunk-BCVUX5PS.js";
import "../chunk-DO526IFP.js";
import "../chunk-DBSQ7PHD.js";
import "../chunk-K6MOAHMA.js";
import "../chunk-HZXK65J2.js";
import "../chunk-VAHAQVOV.js";
import "../chunk-Y4BY35LG.js";
import {
  capabilitiesForSeam
} from "../chunk-TFX4MDFC.js";
import "../chunk-HULYX26E.js";
import "../chunk-7GJRFLQ5.js";
import "../chunk-2GKPBFKP.js";
import "../chunk-HEJGITDA.js";
import "../chunk-XD6J4ZQJ.js";
import "../chunk-F6LIB6DF.js";
import "../chunk-VLT7T3KD.js";
import "../chunk-73HRB4RX.js";
import "../chunk-OXEBFC57.js";
import "../chunk-THNFPAD7.js";
import "../chunk-PWOOSANH.js";
import "../chunk-ANTLLTOX.js";
import "../chunk-CJ4B24JG.js";
import "../chunk-3K27FBMG.js";
import "../chunk-Y7R46KRJ.js";
import {
  hudLastBlockPath
} from "../chunk-RLWC6XFR.js";
import "../chunk-DE72RWA7.js";
import "../chunk-5KDVEW3I.js";
import {
  currentFeature
} from "../chunk-I4T6ZSTJ.js";
import "../chunk-DPRQWAIN.js";
import "../chunk-IYZNK7Q2.js";
import "../chunk-WEFEQHGZ.js";
import "../chunk-LDKFDN3R.js";
import "../chunk-H3JU5RBI.js";
import "../chunk-YPOHZLD5.js";
import "../chunk-YI7GGGDM.js";
import "../chunk-XK65VKUF.js";
import "../chunk-TZCIQC7B.js";
import "../chunk-DZSC6KCZ.js";
import "../chunk-NCABIBTI.js";
import "../chunk-2XQX5CIB.js";
import {
  resolveSessionId
} from "../chunk-F6BUWMKO.js";
import {
  featureFilePath
} from "../chunk-4UM6CK6G.js";
import {
  PATHS
} from "../chunk-UMPIHMXN.js";
import {
  init_esm_shims
} from "../chunk-G5ZPBAMA.js";

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
