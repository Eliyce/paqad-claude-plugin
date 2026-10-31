import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  ROLE_TOKEN_BUDGETS,
  isExpertRole
} from "./chunk-NRKCUFAE.js";
import {
  currentFeature
} from "./chunk-KYIBVLVQ.js";
import {
  stampBundleRow
} from "./chunk-YQEI2YMU.js";
import {
  CHIEF_ARCHITECT_AGENT_NAME,
  isHighTableAgent,
  stripPluginAgentNamespace
} from "./chunk-4EM3UUW7.js";
import {
  appendStampedRowToUnit,
  readUnitFile
} from "./chunk-KAL2KZVN.js";
import {
  resolveHookSession,
  resolveSessionId
} from "./chunk-DNOGJOTT.js";
import {
  featureChangeKey,
  featureFilePath
} from "./chunk-XYQUJYH4.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/cost/transcript-usage.ts
init_esm_shims();
import { closeSync, openSync, readSync } from "fs";
var DEFAULT_CHUNK_BYTES = 1024 * 1024;
var NEWLINE = 10;
var UNKNOWN_MODEL = "unknown";
function emptyTokenUsage() {
  return {
    input: 0,
    output: 0,
    cache_read: 0,
    cache_write: 0,
    cache_write_5m: 0,
    cache_write_1h: 0,
    total: 0
  };
}
function count(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}
function asRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : null;
}
function withTotal(usage) {
  return {
    ...usage,
    total: usage.input + usage.output + usage.cache_read + usage.cache_write
  };
}
function usageFrom(raw) {
  const breakdown = asRecord(raw.cache_creation);
  return withTotal({
    input: count(raw.input_tokens),
    output: count(raw.output_tokens),
    cache_read: count(raw.cache_read_input_tokens),
    cache_write: count(raw.cache_creation_input_tokens),
    cache_write_5m: count(breakdown?.ephemeral_5m_input_tokens),
    cache_write_1h: count(breakdown?.ephemeral_1h_input_tokens),
    total: 0
  });
}
function maxTokenUsage(a, b) {
  return withTotal({
    input: Math.max(a.input, b.input),
    output: Math.max(a.output, b.output),
    cache_read: Math.max(a.cache_read, b.cache_read),
    cache_write: Math.max(a.cache_write, b.cache_write),
    cache_write_5m: Math.max(a.cache_write_5m, b.cache_write_5m),
    cache_write_1h: Math.max(a.cache_write_1h, b.cache_write_1h),
    total: 0
  });
}
function addTokenUsage(a, b) {
  return withTotal({
    input: a.input + b.input,
    output: a.output + b.output,
    cache_read: a.cache_read + b.cache_read,
    cache_write: a.cache_write + b.cache_write,
    cache_write_5m: a.cache_write_5m + b.cache_write_5m,
    cache_write_1h: a.cache_write_1h + b.cache_write_1h,
    total: 0
  });
}
function parseLine(text) {
  try {
    return JSON.parse(text);
  } catch {
    return void 0;
  }
}
function foldEvent(parsed, byId) {
  const event = asRecord(parsed);
  const message = asRecord(event?.message);
  const rawUsage = asRecord(message?.usage);
  const id = typeof message?.id === "string" && message.id.length > 0 ? message.id : null;
  if (event?.type !== "assistant" || !rawUsage || !id) return;
  const usage = usageFrom(rawUsage);
  const existing = byId.get(id);
  if (existing) {
    existing.usage = maxTokenUsage(existing.usage, usage);
    return;
  }
  byId.set(id, {
    id,
    model: typeof message?.model === "string" && message.model.length > 0 ? message.model : null,
    timestamp: typeof event.timestamp === "string" ? event.timestamp : null,
    usage
  });
}
function parseBound(value) {
  if (value === void 0) return void 0;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? void 0 : parsed;
}
function inWindow(message, since, until) {
  if (since === void 0 && until === void 0) return true;
  const at = message.timestamp === null ? Number.NaN : Date.parse(message.timestamp);
  if (Number.isNaN(at)) return false;
  if (since !== void 0 && at < since) return false;
  return until === void 0 || at <= until;
}
function scanTranscriptLines(path, onEvent, options = {}) {
  const start = Math.max(0, Math.floor(options.fromOffset ?? 0));
  const chunkBytes = Math.max(1, Math.floor(options.chunkBytes ?? DEFAULT_CHUNK_BYTES));
  const result = { endOffset: start, badLines: 0 };
  const fd = openSync(path, "r");
  try {
    const buffer = Buffer.alloc(chunkBytes);
    let position = start;
    let pending = Buffer.alloc(0);
    for (; ; ) {
      const read = readSync(fd, buffer, 0, chunkBytes, position);
      if (read === 0) break;
      position += read;
      const data = Buffer.concat([pending, buffer.subarray(0, read)]);
      let lineStart = 0;
      let newline = data.indexOf(NEWLINE, lineStart);
      while (newline !== -1) {
        const text = data.subarray(lineStart, newline).toString("utf8").trim();
        if (text.length > 0) {
          const parsed2 = parseLine(text);
          if (parsed2 === void 0) result.badLines += 1;
          else onEvent(parsed2);
        }
        lineStart = newline + 1;
        newline = data.indexOf(NEWLINE, lineStart);
      }
      result.endOffset = position - (data.length - lineStart);
      pending = Buffer.from(data.subarray(lineStart));
    }
    const tail = pending.toString("utf8").trim();
    const parsed = tail.length > 0 ? parseLine(tail) : void 0;
    if (parsed !== void 0) {
      onEvent(parsed);
      result.endOffset += pending.length;
    }
  } finally {
    closeSync(fd);
  }
  return result;
}
function readTranscriptUsage(path, options = {}) {
  const byId = /* @__PURE__ */ new Map();
  let scan = {
    endOffset: Math.max(0, Math.floor(options.fromOffset ?? 0)),
    badLines: 0
  };
  try {
    scan = scanTranscriptLines(path, (event) => foldEvent(event, byId), options);
  } catch {
  }
  const since = parseBound(options.since);
  const until = parseBound(options.until);
  const messages = [...byId.values()].filter((message) => inWindow(message, since, until));
  let totals = emptyTokenUsage();
  const byModel = {};
  for (const message of messages) {
    totals = addTokenUsage(totals, message.usage);
    const model = message.model ?? UNKNOWN_MODEL;
    byModel[model] = addTokenUsage(byModel[model] ?? emptyTokenUsage(), message.usage);
  }
  return {
    totals,
    by_model: byModel,
    messages,
    end_offset: scan.endOffset,
    bad_lines: scan.badLines
  };
}

// src/spec-pipeline/high-table.ts
init_esm_shims();
var HIGH_TABLE_DOC_TYPE = "paqad.high-table";
var HIGH_TABLE_SCHEMA_VERSION = 1;
var CHIEF_ROLE = "chief-architect";
var CHIEF_BUDGET_TOKENS = ROLE_TOKEN_BUDGETS[CHIEF_ROLE];
function appendHighTableRow(projectRoot, dirName, row, options) {
  const stamped = stampBundleRow({
    docType: HIGH_TABLE_DOC_TYPE,
    change: featureChangeKey(dirName),
    sessionId: options.sessionId ?? resolveSessionId(projectRoot, null),
    schemaVersion: HIGH_TABLE_SCHEMA_VERSION,
    row,
    now: options.now
  });
  appendStampedRowToUnit(projectRoot, featureFilePath(dirName, "highTable"), stamped);
  return stamped;
}
function readHighTable(projectRoot, dirName) {
  return readUnitFile(projectRoot, featureFilePath(dirName, "highTable"));
}
function recordSeatedRows(projectRoot, dirName, seats, options) {
  if (seats.length === 0) return;
  for (const seat of seats) {
    appendHighTableRow(projectRoot, dirName, { event: "seated", ...seat }, options);
  }
  appendHighTableRow(
    projectRoot,
    dirName,
    {
      event: "seated",
      role: CHIEF_ROLE,
      reason: null,
      origin: null,
      budget_tokens: CHIEF_BUDGET_TOKENS,
      clamped: false
    },
    options
  );
}
function recordWritingRow(projectRoot, dirName, role, options) {
  appendHighTableRow(projectRoot, dirName, { event: "writing", role }, options);
}
function recordDoneRow(projectRoot, dirName, done, options) {
  appendHighTableRow(
    projectRoot,
    dirName,
    { event: "done", ...done, tokens_label: "estimate" },
    options
  );
}
var BRIEF_COMMAND = /\bexperts\s+brief\s+([a-z][a-z0-9-]*)/;
function asRecord2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : null;
}
function toolCommands(event) {
  const message = asRecord2(asRecord2(event)?.message);
  const content = Array.isArray(message?.content) ? message.content : [];
  const commands = [];
  for (const block of content) {
    const record = asRecord2(block);
    const command = asRecord2(record?.input)?.command;
    if (record?.type === "tool_use" && typeof command === "string") commands.push(command);
  }
  return commands;
}
function roleFromSubagentTranscript(path) {
  let role = null;
  try {
    scanTranscriptLines(path, (event) => {
      if (role !== null) return;
      for (const command of toolCommands(event)) {
        const match = BRIEF_COMMAND.exec(command);
        if (match) {
          role = match[1];
          return;
        }
      }
    });
  } catch {
    return null;
  }
  return role !== null && isExpertRole(role) ? role : null;
}
function recordHighTableUsage(input) {
  const agentType = typeof input.payload.agent_type === "string" ? input.payload.agent_type : null;
  if (agentType === null || !isHighTableAgent(agentType)) return "not-high-table";
  const path = input.payload.agent_transcript_path;
  if (typeof path !== "string" || path.trim() === "") return "no-transcript";
  const usage = readTranscriptUsage(path);
  if (usage.messages.length === 0) return "no-usage";
  const isChief = stripPluginAgentNamespace(agentType.trim()) === CHIEF_ARCHITECT_AGENT_NAME;
  const role = isChief ? CHIEF_ROLE : roleFromSubagentTranscript(path);
  if (role === null) return "no-role";
  const sessionId = resolveHookSession(input.projectRoot, input.payload);
  const dirName = currentFeature(input.projectRoot, sessionId);
  if (!dirName) return "no-feature";
  appendHighTableRow(
    input.projectRoot,
    dirName,
    {
      event: "usage",
      role,
      agent_id: typeof input.payload.agent_id === "string" ? input.payload.agent_id : null,
      agent_type: agentType,
      tokens: usage.totals,
      by_model: usage.by_model,
      messages: usage.messages.length,
      tokens_label: "exact"
    },
    { sessionId, now: input.now }
  );
  return "recorded";
}
function str(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}
function num(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
function tokenUsageOf(value) {
  const record = asRecord2(value);
  if (!record) return null;
  const field = (key) => num(record[key]) ?? 0;
  return {
    input: field("input"),
    output: field("output"),
    cache_read: field("cache_read"),
    cache_write: field("cache_write"),
    cache_write_5m: field("cache_write_5m"),
    cache_write_1h: field("cache_write_1h"),
    total: field("total")
  };
}
function sumUsage(a, b) {
  if (a === null) return b;
  return {
    input: a.input + b.input,
    output: a.output + b.output,
    cache_read: a.cache_read + b.cache_read,
    cache_write: a.cache_write + b.cache_write,
    cache_write_5m: a.cache_write_5m + b.cache_write_5m,
    cache_write_1h: a.cache_write_1h + b.cache_write_1h,
    total: a.total + b.total
  };
}
function emptySeat(role) {
  return {
    role,
    reason: null,
    origin: null,
    state: null,
    seated_at: null,
    started_at: null,
    done_at: null,
    budget_tokens: null,
    clamped: null,
    findings: null,
    tokens_estimate: null,
    tokens: null
  };
}
function applyRow(seat, row, at) {
  switch (row.event) {
    case "seated":
      return {
        ...emptySeat(seat.role),
        reason: str(row.reason),
        origin: str(row.origin),
        state: "seated",
        seated_at: at,
        budget_tokens: num(row.budget_tokens),
        clamped: typeof row.clamped === "boolean" ? row.clamped : null
      };
    case "writing":
      return { ...seat, state: "writing", started_at: at, done_at: null };
    case "done":
      return {
        ...seat,
        state: "done",
        done_at: at,
        findings: num(row.findings),
        tokens_estimate: num(row.tokens_estimate)
      };
    case "usage": {
      const tokens = tokenUsageOf(row.tokens);
      return tokens === null ? seat : { ...seat, tokens: sumUsage(seat.tokens, tokens) };
    }
    default:
      return seat;
  }
}
function foldHighTable(rows) {
  const seats = /* @__PURE__ */ new Map();
  const usageAgents = /* @__PURE__ */ new Set();
  for (const row of rows) {
    const role = str(row.role);
    if (role === null) continue;
    if (row.event === "usage") {
      const agent = str(row.agent_id);
      if (agent !== null && usageAgents.has(agent)) continue;
      if (agent !== null) usageAgents.add(agent);
    }
    const at = str(row.recorded_at) ?? str(row.ts);
    seats.set(role, applyRow(seats.get(role) ?? emptySeat(role), row, at));
  }
  return seats;
}
function highTableDoneTimes(rows) {
  return rows.filter((row) => row.event === "done").map((row) => str(row.recorded_at) ?? str(row.ts)).filter((at) => at !== null);
}

export {
  emptyTokenUsage,
  maxTokenUsage,
  addTokenUsage,
  scanTranscriptLines,
  readTranscriptUsage,
  CHIEF_ROLE,
  readHighTable,
  recordSeatedRows,
  recordWritingRow,
  recordDoneRow,
  roleFromSubagentTranscript,
  recordHighTableUsage,
  foldHighTable,
  highTableDoneTimes
};
