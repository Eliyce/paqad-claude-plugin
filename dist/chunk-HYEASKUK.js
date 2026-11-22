import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  loadRuleScriptMap,
  scriptFilesHash,
  serializeRuleScriptMap
} from "./chunk-LWALU6JC.js";
import {
  PATHS
} from "./chunk-BNIV2KZF.js";
import {
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/rule-scripts/integrity.ts
init_esm_shims();
import { createHash } from "crypto";
function computeRuleScriptsDigest(projectRoot) {
  const map = loadRuleScriptMap(projectRoot);
  if (!map) {
    return null;
  }
  const hash = createHash("sha256");
  hash.update(serializeRuleScriptMap(map));
  hash.update("\0");
  hash.update(scriptFilesHash(projectRoot, map));
  return hash.digest("hex");
}

// src/kernel/registry.ts
init_esm_shims();
var CAPABILITY_REGISTRY = Object.freeze([
  {
    id: "stages",
    title: "Feature-development stages",
    modeKey: "stages_mode",
    enforcementFloor: "block",
    seam: ["pre-mutation", "completion"],
    ledgerDocType: "stage-evidence",
    policySchemaVersion: 1,
    recordSchemaVersion: 1
  },
  {
    id: "rule-scripts",
    title: "Scripted-rule enforcement",
    modeKey: "rule_compliance",
    enforcementFloor: "block",
    seam: ["pre-mutation", "completion"],
    ledgerDocType: null,
    policySchemaVersion: 1,
    recordSchemaVersion: 1
  },
  {
    id: "rules-loaded",
    title: "Rule loading",
    modeKey: null,
    enforcementFloor: "block",
    seam: ["pre-mutation"],
    ledgerDocType: null,
    policySchemaVersion: 1,
    recordSchemaVersion: 1
  },
  {
    id: "decision-pause",
    title: "Decision Pause Contract",
    modeKey: null,
    enforcementFloor: "block",
    seam: ["pre-mutation", "completion"],
    ledgerDocType: "decision-evidence",
    policySchemaVersion: 1,
    recordSchemaVersion: 1
  },
  {
    id: "narration",
    title: "Narration contract",
    modeKey: null,
    enforcementFloor: "unbindable",
    seam: [],
    ledgerDocType: null,
    policySchemaVersion: 1,
    recordSchemaVersion: 1
  },
  {
    id: "delivery",
    title: "Delivery policy",
    modeKey: null,
    enforcementFloor: "warn",
    seam: ["completion"],
    ledgerDocType: "delivery-evidence",
    policySchemaVersion: 1,
    recordSchemaVersion: 1
  }
]);
function getCapability(id) {
  const found = CAPABILITY_REGISTRY.find((capability) => capability.id === id);
  if (!found) {
    throw new Error(`Unknown capability id: ${id}`);
  }
  return found;
}
function capabilitiesForSeam(seam) {
  return CAPABILITY_REGISTRY.filter((capability) => capability.seam.includes(seam));
}

// src/kernel/capability-lock.ts
init_esm_shims();
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
var CAPABILITY_LOCK_SCHEMA_VERSION = 1;
function capabilityLockPath(projectRoot) {
  return join(projectRoot, PATHS.CAPABILITY_LOCK);
}
function readCapabilityLock(projectRoot) {
  const path = capabilityLockPath(projectRoot);
  if (!existsSync(path)) {
    return null;
  }
  try {
    const parsed = JSON.parse(readFileSync(path, "utf8"));
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}
function readCapabilityDigest(projectRoot, capabilityId) {
  const lock = readCapabilityLock(projectRoot);
  const entry = lock?.capabilities?.[capabilityId];
  return entry && typeof entry.digest === "string" ? entry.digest : null;
}
function readCapabilityVersions(projectRoot, capabilityId) {
  const entry = readCapabilityLock(projectRoot)?.capabilities?.[capabilityId];
  if (!entry || typeof entry.policy_version !== "number" || typeof entry.record_version !== "number") {
    return null;
  }
  return { policy: entry.policy_version, record: entry.record_version };
}
function writeCapabilityDigest(projectRoot, capabilityId, digest, now = /* @__PURE__ */ new Date()) {
  const existing = readCapabilityLock(projectRoot);
  const descriptor = CAPABILITY_REGISTRY.find((capability) => capability.id === capabilityId);
  const versions = descriptor ? {
    policy_version: descriptor.policySchemaVersion,
    record_version: descriptor.recordSchemaVersion
  } : {};
  const lock = {
    schema_version: CAPABILITY_LOCK_SCHEMA_VERSION,
    generated_at: now.toISOString(),
    capabilities: {
      ...existing?.capabilities ?? {},
      [capabilityId]: { ...existing?.capabilities?.[capabilityId] ?? {}, digest, ...versions }
    }
  };
  const path = capabilityLockPath(projectRoot);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(lock, null, 2)}
`, "utf8");
}

export {
  computeRuleScriptsDigest,
  getCapability,
  capabilitiesForSeam,
  readCapabilityDigest,
  readCapabilityVersions,
  writeCapabilityDigest
};
