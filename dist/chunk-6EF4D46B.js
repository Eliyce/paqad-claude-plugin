import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  ROUTED_WORKFLOWS
} from "./chunk-7DBEJ2JY.js";
import {
  STAGE_EVIDENCE_DOC_TYPE
} from "./chunk-V2GOPPZK.js";
import {
  sessionLedgerDir
} from "./chunk-QINSFA6R.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/pipeline/route-turns.ts
init_esm_shims();
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
var ROUTE_TURNS_FILE = ".route-turns.jsonl";
var ROUTE_TURNS_CAP = 2e3;
var VALID_WORKFLOWS = new Set(ROUTED_WORKFLOWS);
function routeTurnsPath(projectRoot, sessionId) {
  return join(projectRoot, sessionLedgerDir(STAGE_EVIDENCE_DOC_TYPE, sessionId), ROUTE_TURNS_FILE);
}
function toTurn(line) {
  try {
    const parsed = JSON.parse(line);
    if (typeof parsed.at === "string" && Number.isFinite(Date.parse(parsed.at)) && typeof parsed.workflow === "string" && VALID_WORKFLOWS.has(parsed.workflow)) {
      return { at: parsed.at, workflow: parsed.workflow };
    }
  } catch {
    return null;
  }
  return null;
}
function readRouteTurns(projectRoot, sessionId) {
  let raw;
  try {
    raw = readFileSync(routeTurnsPath(projectRoot, sessionId), "utf8");
  } catch {
    return [];
  }
  return raw.split("\n").filter((line) => line.trim().length > 0).map(toTurn).filter((turn) => turn !== null);
}
function appendRouteTurn(projectRoot, sessionId, turn, cap = ROUTE_TURNS_CAP) {
  const path = routeTurnsPath(projectRoot, sessionId);
  mkdirSync(join(projectRoot, sessionLedgerDir(STAGE_EVIDENCE_DOC_TYPE, sessionId)), {
    recursive: true
  });
  appendFileSync(path, `${JSON.stringify({ at: turn.at, workflow: turn.workflow })}
`, "utf8");
  const lines = readFileSync(path, "utf8").split("\n").filter((line) => line.trim().length > 0);
  if (lines.length > cap) {
    writeFileSync(path, `${lines.slice(lines.length - cap).join("\n")}
`, "utf8");
  }
}
function episodeStart(turns, workflow) {
  let start = null;
  for (let index = turns.length - 1; index >= 0; index -= 1) {
    const turn = turns[index];
    if (turn.workflow !== workflow) {
      break;
    }
    start = turn.at;
  }
  return start;
}
function turnRouteAt(turns, at) {
  const atMs = Date.parse(at);
  if (!Number.isFinite(atMs)) {
    return null;
  }
  let route = null;
  for (const turn of turns) {
    if (Date.parse(turn.at) > atMs) {
      break;
    }
    route = turn.workflow;
  }
  return route;
}

export {
  readRouteTurns,
  appendRouteTurn,
  episodeStart,
  turnRouteAt
};
