import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  writeFileAtomic
} from "./chunk-4UDYC65U.js";
import {
  releaseLock,
  tryAcquireLock
} from "./chunk-2XQIUIDS.js";
import {
  sleepSync
} from "./chunk-Z3NGWHFX.js";
import {
  PATHS
} from "./chunk-BNIV2KZF.js";
import {
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/onboarding/journey/events.ts
init_esm_shims();
import { appendFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";

// src/onboarding/journey/io.ts
init_esm_shims();
import { readFileSync } from "fs";
function readTextOrNull(path) {
  try {
    return readFileSync(path, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}
function readJsonLines(path, accept) {
  const text = readTextOrNull(path);
  if (text === null) return [];
  const rows = [];
  for (const line of text.split("\n")) {
    if (line.trim() === "") continue;
    try {
      const value = JSON.parse(line);
      if (accept(value)) rows.push(value);
    } catch {
      continue;
    }
  }
  return rows;
}

// src/onboarding/journey/events.ts
function eventsPath(projectRoot) {
  return join(projectRoot, PATHS.ONBOARDING_EVENTS);
}
function appendEvent(projectRoot, event) {
  const path = eventsPath(projectRoot);
  mkdirSync(dirname(path), { recursive: true });
  appendFileSync(path, `${JSON.stringify(event)}
`, { encoding: "utf8", flag: "a" });
}
function readEvents(projectRoot, runId) {
  return readJsonLines(
    eventsPath(projectRoot),
    (row) => typeof row.ts === "string" && typeof row.kind === "string" && (runId === void 0 || row.run_id === runId)
  );
}

// src/onboarding/journey/run-store.ts
init_esm_shims();
import { join as join2 } from "path";

// src/onboarding/journey/types.ts
init_esm_shims();
var STAGE_IDS = [
  "detect",
  "setup",
  "project_docs",
  "module_docs",
  "rules_discovery",
  "rules_analyze",
  "rule_scripts",
  "finish"
];
var DEGRADED_CODES = [
  "stack_mismatch_noted",
  "git_workflow_kept",
  "research_offline",
  "research_stopped",
  "rag_off"
];

// src/onboarding/journey/run-store.ts
var JOURNEY_STALE_LOCK_MS = 3e4;
var LOCK_ATTEMPTS = 200;
var LOCK_WAIT_MS = 10;
var JourneyLockBusyError = class extends Error {
  constructor() {
    super("Another onboarding command is updating the journey. Try again in a moment.");
    this.name = "JourneyLockBusyError";
  }
};
var JourneyRevisionConflictError = class extends Error {
  constructor(expected, found) {
    super(
      `The journey changed while this command ran (expected revision ${expected}, found ${found}). Run it again.`
    );
    this.name = "JourneyRevisionConflictError";
  }
};
var JourneyMissingError = class extends Error {
  constructor() {
    super("No onboarding journey has started here. Run `paqad-ai onboarding start` first.");
    this.name = "JourneyMissingError";
  }
};
function journeyPath(projectRoot) {
  return join2(projectRoot, PATHS.ONBOARDING_JOURNEY);
}
function journeyLockPath(projectRoot) {
  return join2(projectRoot, PATHS.ONBOARDING_JOURNEY_LOCK);
}
function readRun(projectRoot) {
  const text = readTextOrNull(journeyPath(projectRoot));
  return text === null ? null : JSON.parse(text);
}
function requireRun(projectRoot) {
  const run = readRun(projectRoot);
  if (!run) throw new JourneyMissingError();
  return run;
}
function emptyStages() {
  return Object.fromEntries(STAGE_IDS.map((id) => [id, { status: "not_started" }]));
}
function withJourneyLock(projectRoot, work, now) {
  const lockDir = journeyLockPath(projectRoot);
  for (let attempt = 0; attempt < LOCK_ATTEMPTS; attempt += 1) {
    const outcome = tryAcquireLock(lockDir, { staleLockMs: JOURNEY_STALE_LOCK_MS, now });
    if (outcome.acquired) {
      try {
        return work();
      } finally {
        releaseLock(lockDir);
      }
    }
    sleepSync(LOCK_WAIT_MS);
  }
  throw new JourneyLockBusyError();
}
function writeRun(projectRoot, run) {
  writeFileAtomic(journeyPath(projectRoot), `${JSON.stringify(run, null, 2)}
`);
}
function createRun(projectRoot, run) {
  return withJourneyLock(projectRoot, () => {
    const created = { ...run, revision: 1 };
    writeRun(projectRoot, created);
    return created;
  });
}
function updateRun(projectRoot, mutate, options = {}) {
  const now = options.now ?? (() => /* @__PURE__ */ new Date());
  return withJourneyLock(projectRoot, () => {
    const current = requireRun(projectRoot);
    if (options.expectedRevision !== void 0 && options.expectedRevision !== current.revision) {
      throw new JourneyRevisionConflictError(options.expectedRevision, current.revision);
    }
    const draft = structuredClone(current);
    const next = mutate(draft) ?? draft;
    const saved = {
      ...next,
      revision: current.revision + 1,
      updated_at: now().toISOString()
    };
    writeRun(projectRoot, saved);
    return saved;
  });
}

export {
  readTextOrNull,
  readJsonLines,
  appendEvent,
  readEvents,
  STAGE_IDS,
  DEGRADED_CODES,
  readRun,
  requireRun,
  emptyStages,
  withJourneyLock,
  createRun,
  updateRun
};
