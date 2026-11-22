import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  PATHS
} from "./chunk-BNIV2KZF.js";
import {
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/checks/running-marker.ts
init_esm_shims();
import { execFileSync } from "child_process";
import { createHash } from "crypto";
import {
  chmodSync,
  closeSync,
  constants,
  fstatSync,
  lstatSync,
  mkdirSync,
  openSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
  writeSync
} from "fs";
import { homedir } from "os";
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
var AGENT_RUN_GRACE_MS = 3e3;
var AGENT_RUN_RECORDS_RELATIVE = join(".paqad-ai", "runs");
function noFollow() {
  return constants.O_NOFOLLOW ?? 0;
}
function agentRunRecordDir(projectRoot, home = homedir()) {
  const project = createHash("sha256").update(projectRoot).digest("hex").slice(0, 16);
  return join(home, AGENT_RUN_RECORDS_RELATIVE, project);
}
function ownerOnly(mode, uid) {
  const me = typeof process.getuid === "function" ? process.getuid() : uid;
  return uid === me && (mode & 63) === 0;
}
function ensurePrivateDir(dir) {
  mkdirSync(dir, { recursive: true, mode: 448 });
  for (const path of [dirname(dir), dir]) {
    const stat = lstatSync(path);
    if (stat.isSymbolicLink() || !stat.isDirectory()) throw new Error(`${path} is not a directory`);
    if (process.platform !== "win32" && (stat.mode & 63) !== 0) chmodSync(path, 448);
  }
}
function readPrivateFile(path) {
  let fd;
  try {
    fd = openSync(path, constants.O_RDONLY | noFollow());
  } catch {
    return null;
  }
  try {
    const stat = fstatSync(fd);
    if (!stat.isFile() || !ownerOnly(stat.mode, stat.uid)) return null;
    return readFileSync(fd, "utf8");
  } finally {
    closeSync(fd);
  }
}
function processGroupOf(pid) {
  if (process.platform === "win32") return null;
  try {
    const out = execFileSync("ps", ["-o", "pgid=", "-p", String(pid)], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
    const pgid = Number.parseInt(out, 10);
    return Number.isInteger(pgid) && pgid > 0 ? pgid : null;
  } catch {
    return null;
  }
}
function writeAgentRunRecord(projectRoot, record, home) {
  const dir = agentRunRecordDir(projectRoot, home);
  ensurePrivateDir(dir);
  const path = join(dir, `${record.pid}.json`);
  rmSync(path, { force: true });
  const fd = openSync(
    path,
    constants.O_CREAT | constants.O_EXCL | constants.O_WRONLY | noFollow(),
    384
  );
  try {
    writeSync(fd, `${JSON.stringify({ ...record, project: projectRoot }, null, 2)}
`);
  } finally {
    closeSync(fd);
  }
  return path;
}
function clearAgentRunRecord(projectRoot, pid, home) {
  rmSync(join(agentRunRecordDir(projectRoot, home), `${pid}.json`), { force: true });
}
function readAgentRunRecords(projectRoot, home) {
  if (process.platform === "win32") return [];
  const dir = agentRunRecordDir(projectRoot, home);
  let names;
  try {
    const stat = lstatSync(dir);
    if (!stat.isDirectory() || !ownerOnly(stat.mode, stat.uid)) return [];
    names = readdirSync(dir);
  } catch {
    return [];
  }
  const records = [];
  for (const name of names) {
    if (!/^\d+\.json$/.test(name)) continue;
    try {
      const text = readPrivateFile(join(dir, name));
      if (text === null) continue;
      const value = JSON.parse(text);
      if (Number.isInteger(value.pid) && Number.isInteger(value.pgid) && typeof value.start_time === "string" && typeof value.agent_id === "string" && value.project === projectRoot && `${String(value.pid)}.json` === name) {
        records.push(value);
      }
    } catch {
      continue;
    }
  }
  return records;
}
function defaultSignal(target, signal) {
  try {
    process.kill(target, signal);
    return true;
  } catch {
    return false;
  }
}
function ownGroups(probe) {
  const groups = new Set(probe.protectedGroups ?? []);
  for (const pid of [process.pid, process.ppid]) {
    const pgid = (probe.pgidOf ?? processGroupOf)(pid);
    if (pgid !== null) groups.add(pgid);
  }
  return groups;
}
async function endAgentRuns(projectRoot, agentId, probe = {}) {
  if (process.platform === "win32") return [];
  const startTimeOf = probe.startTimeOf ?? processStartTime;
  const signal = probe.signal ?? defaultSignal;
  const sleep = probe.sleep ?? ((ms) => new Promise((r) => setTimeout(r, ms)));
  const pgidOf = probe.pgidOf ?? processGroupOf;
  const protectedGroups = ownGroups(probe);
  const ended = [];
  for (const record of readAgentRunRecords(projectRoot, probe.home)) {
    if (record.agent_id !== agentId) continue;
    if (startTimeOf(record.pid) !== record.start_time) {
      clearAgentRunRecord(projectRoot, record.pid, probe.home);
      continue;
    }
    if (record.pgid <= 1 || pgidOf(record.pid) !== record.pgid) continue;
    if (protectedGroups.has(record.pgid)) continue;
    signal(-record.pgid, "SIGTERM");
    for (let waited = 0; waited < AGENT_RUN_GRACE_MS; waited += 100) {
      if (!signal(-record.pgid, 0)) break;
      await sleep(100);
    }
    if (signal(-record.pgid, 0)) signal(-record.pgid, "SIGKILL");
    clearAgentRunRecord(projectRoot, record.pid, probe.home);
    ended.push(record);
  }
  return ended;
}
function processStartTime(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return null;
  if (process.platform === "win32") return processIsAlive(pid) ? "unknown" : null;
  try {
    const out = execFileSync("ps", ["-o", "lstart=", "-p", String(pid)], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
    return out.length > 0 ? out : null;
  } catch {
    return null;
  }
}

export {
  CHECKS_RUNNING_CEILING_MS,
  writeChecksRunningMarker,
  clearChecksRunningMarker,
  liveChecksRunningMarker,
  processGroupOf,
  writeAgentRunRecord,
  clearAgentRunRecord,
  endAgentRuns,
  processStartTime
};
