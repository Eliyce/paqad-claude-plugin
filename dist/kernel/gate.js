import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  CAPABILITY_IMPLS,
  clearRuleStopRecord,
  frontendTriggerOrFault,
  isManagedEnv,
  visualEvidenceFlagOn,
  writeRuleStopRecord
} from "../chunk-ZRV7U2RZ.js";
import {
  hudLastBlockPath
} from "../chunk-N3SETY4S.js";
import "../chunk-NRKCUFAE.js";
import "../chunk-NN7SEPJI.js";
import "../chunk-NG4XO34O.js";
import {
  appendHooksLog
} from "../chunk-CJ6GEKKF.js";
import "../chunk-I5IGTXAN.js";
import "../chunk-5V3LFHQQ.js";
import "../chunk-VVRAO2BK.js";
import "../chunk-T4VPFXR3.js";
import {
  capabilitiesForSeam
} from "../chunk-RZSUJA4B.js";
import "../chunk-LERWRDMM.js";
import "../chunk-KKFSSPUD.js";
import "../chunk-HMQATZMT.js";
import "../chunk-O77JBFWW.js";
import "../chunk-XATPFUNO.js";
import "../chunk-N5SWPFGH.js";
import "../chunk-HPICFP2U.js";
import "../chunk-3DRN3NCI.js";
import "../chunk-6W2UX3OC.js";
import "../chunk-OQ77VKVU.js";
import "../chunk-DNG6DDRS.js";
import "../chunk-4K4CM3QN.js";
import {
  currentFeature
} from "../chunk-VUYWNYTS.js";
import "../chunk-W2K6YXWC.js";
import "../chunk-CTIDCPJ5.js";
import "../chunk-5BQ2AB2Y.js";
import "../chunk-AINYJ3Q2.js";
import "../chunk-WGEG5J6L.js";
import "../chunk-3CUGDX3J.js";
import "../chunk-SU7RODZI.js";
import {
  resolveSessionId
} from "../chunk-MG36YCW4.js";
import {
  featureFilePath
} from "../chunk-KF7HHHJR.js";
import "../chunk-EGDL57MD.js";
import {
  PATHS
} from "../chunk-UCSN7SVD.js";
import {
  init_esm_shims
} from "../chunk-EMKBJVIL.js";

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
async function runCapabilityGate(input) {
  const { projectRoot, seam, env = process.env, payload, entryLoaded } = input;
  const outcomes = [];
  const narrations = [];
  for (const descriptor of capabilitiesForSeam(seam)) {
    const capability = CAPABILITY_IMPLS.get(descriptor.id);
    if (!capability) {
      continue;
    }
    const outcome = await capability.evaluate({ projectRoot, seam, env, payload });
    if (outcome.narration) {
      narrations.push(outcome.narration);
    }
    if (outcome.ran && outcome.summary) {
      outcomes.push(outcome);
    }
  }
  const narration = narrations.join("\n");
  const context = seam === "pre-mutation" ? reminderContext(projectRoot, env, payload) : "";
  const blocking = outcomes.filter((outcome) => outcome.blocking);
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
  runCapabilityGate
};
