import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  CHIEF_ROLE,
  addTokenUsage,
  emptyTokenUsage,
  foldHighTable,
  maxTokenUsage,
  readHighTable,
  readTranscriptUsage,
  roleFromSubagentTranscript
} from "./chunk-4ZIBQHJ5.js";
import {
  readRouteTurns,
  turnRouteAt
} from "./chunk-NEBNXGEA.js";
import {
  FileLockTimeoutError,
  withFileLockSync
} from "./chunk-BWAUL7O5.js";
import {
  appendHooksLog
} from "./chunk-BW7VURA4.js";
import {
  HUD_COST_CACHE_SUFFIX,
  hudCostCachePath,
  writeFileAtomic
} from "./chunk-IN2AVDIO.js";
import {
  EVIDENCE_LEDGER_SCHEMA_VERSION,
  IN_TOTO_STATEMENT_TYPE,
  PAQAD_VSA_PREDICATE_TYPE,
  parseEvidenceRows
} from "./chunk-KKFSSPUD.js";
import {
  STAGE_EVIDENCE_STAGES,
  documentSessionId,
  readFeatureStageUnit,
  stampFeatureDocument
} from "./chunk-QR66SJS4.js";
import {
  CHIEF_ARCHITECT_AGENT_NAME,
  isHighTableAgent,
  stageForAgentName,
  stripPluginAgentNamespace
} from "./chunk-H2GJD26E.js";
import {
  buildEnvelopeHeader,
  computeContentHash,
  listFeatureDirs,
  rowRecordedAt,
  sha256Hex,
  toAiBomProperties,
  withReceiptHeader
} from "./chunk-KFLIUVMP.js";
import {
  featureChangeKey,
  featureFilePath
} from "./chunk-DDJC5PRW.js";
import {
  PATHS
} from "./chunk-LW3OCT4Y.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/cost/change-cost.ts
init_esm_shims();
import { existsSync, readdirSync, readFileSync as readFileSync2, statSync } from "fs";
import { join as join3 } from "path";

// src/evidence/receipt/envelope.ts
init_esm_shims();
function decodeReceiptStatement(envelope) {
  try {
    return JSON.parse(Buffer.from(envelope.payload, "base64").toString("utf8"));
  } catch {
    return null;
  }
}

// src/feature-evidence/receipt.ts
init_esm_shims();
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "fs";
import { dirname, join as join2 } from "path";

// src/evidence/digests.ts
init_esm_shims();
import { createHash } from "crypto";
import { readFile } from "fs/promises";
import { join } from "path";
function sha256Hex2(input) {
  return createHash("sha256").update(input).digest("hex");
}
var ZERO_DIGEST = "0".repeat(64);
async function computeFileDigests(projectRoot, changedFiles) {
  const digests = await Promise.all(
    changedFiles.map(async (name) => {
      try {
        const bytes = await readFile(join(projectRoot, name));
        return { name, sha256: sha256Hex2(bytes) };
      } catch {
        return { name, sha256: sha256Hex2(name) };
      }
    })
  );
  return digests.sort((a, b) => a.name.localeCompare(b.name));
}
function computeChangeSubjectDigest(fileDigests) {
  if (fileDigests.length === 0) return ZERO_DIGEST;
  const canonical = [...fileDigests].sort((a, b) => a.name.localeCompare(b.name)).map((d) => `${d.name}:${d.sha256}`).join("\n");
  return sha256Hex2(canonical);
}

// src/evidence/receipt/ai-bom.ts
init_esm_shims();
import { createHash as createHash2 } from "crypto";
function buildAiBom(input) {
  const { predicate } = input.statement;
  const graded = predicate.graded_results;
  const components = input.statement.subject.map((subject) => ({
    type: "file",
    name: subject.name,
    hashes: [{ alg: "SHA-256", content: subject.digest.sha256 }]
  }));
  const evidenceProps = [
    { name: "paqad:verification:result", value: predicate.verification_result },
    { name: "paqad:evidence:deterministic:pass", value: String(graded.deterministic.pass) },
    { name: "paqad:evidence:deterministic:fail", value: String(graded.deterministic.fail) },
    { name: "paqad:evidence:llm-judged:pass", value: String(graded.llm_judged.pass) },
    { name: "paqad:evidence:llm-judged:fail", value: String(graded.llm_judged.fail) },
    { name: "paqad:evidence:blocked", value: String(graded.blocked) },
    { name: "paqad:evidence:inconclusive", value: String(graded.inconclusive) },
    { name: "paqad:predicateType", value: input.statement.predicateType },
    ...authorshipProps(predicate.change_authorship)
  ];
  const serialSeed = JSON.stringify({
    subject: input.statement.subject,
    result: predicate.verification_result,
    graded,
    time: predicate.time_verified
  });
  const serialNumber = `urn:uuid:${formatUuid(createHash2("sha256").update(serialSeed).digest("hex"))}`;
  return {
    bomFormat: "CycloneDX",
    specVersion: "1.6",
    serialNumber,
    version: 1,
    metadata: {
      timestamp: predicate.time_verified,
      tools: [{ vendor: "paqad", name: "paqad-ai", version: input.toolVersion }],
      properties: evidenceProps
    },
    components,
    properties: evidenceProps
  };
}
function authorshipProps(authorship) {
  if (authorship === void 0) return [];
  const props = [
    { name: "paqad:authorship:provenance", value: authorship.provenance }
  ];
  if (authorship.agent !== void 0)
    props.push({ name: "paqad:authorship:agent", value: authorship.agent });
  if (authorship.model !== void 0)
    props.push({ name: "paqad:authorship:model", value: authorship.model });
  if (authorship.provider !== void 0)
    props.push({ name: "paqad:authorship:provider", value: authorship.provider });
  if (authorship.model_id !== void 0)
    props.push({ name: "paqad:authorship:model_id", value: authorship.model_id });
  if (authorship.accepting_human?.name !== void 0)
    props.push({
      name: "paqad:authorship:accepting_human:name",
      value: authorship.accepting_human.name
    });
  if (authorship.accepting_human?.email !== void 0)
    props.push({
      name: "paqad:authorship:accepting_human:email",
      value: authorship.accepting_human.email
    });
  return props;
}
function formatUuid(hex) {
  const h = hex.slice(0, 32);
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`;
}

// src/evidence/receipt/dsse.ts
init_esm_shims();
import { createHash as createHash3 } from "crypto";
var DSSE_PAYLOAD_TYPE = "application/vnd.in-toto+json";
function pae(payloadType, payload) {
  const typeBytes = Buffer.from(payloadType, "utf8");
  return Buffer.concat([
    Buffer.from(`DSSEv1 ${typeBytes.length} `, "utf8"),
    typeBytes,
    Buffer.from(` ${payload.length} `, "utf8"),
    payload
  ]);
}
function statementPayload(statement) {
  return Buffer.from(JSON.stringify(statement), "utf8");
}
function signReceipt(input) {
  const payload = statementPayload(input.statement);
  const encoded = pae(DSSE_PAYLOAD_TYPE, payload);
  const prev = input.prevReceiptHash ?? ZERO_DIGEST;
  const receiptHash = createHash3("sha256").update(encoded).update(prev).digest("hex");
  const signingMode = "hash-chained";
  return {
    payloadType: DSSE_PAYLOAD_TYPE,
    payload: payload.toString("base64"),
    signatures: [{ keyid: "paqad-hash-chain", sig: receiptHash }],
    paqad: {
      signing_mode: signingMode,
      prev_receipt_hash: prev,
      receipt_hash: receiptHash
    }
  };
}
function verifyReceiptSeal(envelope) {
  const payload = Buffer.from(envelope.payload, "base64");
  const encoded = pae(envelope.payloadType, payload);
  const expected = createHash3("sha256").update(encoded).update(envelope.paqad.prev_receipt_hash).digest("hex");
  return envelope.paqad.receipt_hash === expected;
}

// src/evidence/receipt/statement.ts
init_esm_shims();
function summarizeGradedEvidence(rows) {
  const summary = {
    deterministic: { pass: 0, fail: 0 },
    llm_judged: { pass: 0, fail: 0 },
    blocked: 0,
    inconclusive: 0
  };
  for (const row of rows) {
    if (row.verdict === "inconclusive") {
      summary.inconclusive += 1;
      continue;
    }
    if (row.verdict === "skipped") continue;
    if (row.verdict === "blocked" || row.strength_class === "blocked") {
      summary.blocked += 1;
      continue;
    }
    const bucket = row.strength_class === "llm-judged" ? summary.llm_judged : summary.deterministic;
    if (row.verdict === "pass") bucket.pass += 1;
    else if (row.verdict === "fail") bucket.fail += 1;
  }
  return summary;
}
function countByEngine(rows) {
  const counts = {};
  for (const row of rows) {
    counts[row.engine] = (counts[row.engine] ?? 0) + 1;
  }
  return counts;
}
function deriveVerificationResult(summary) {
  if (summary.deterministic.fail > 0 || summary.llm_judged.fail > 0) {
    return "FAILED";
  }
  if (summary.inconclusive > 0) {
    return "INCONCLUSIVE";
  }
  return "PASSED";
}
function buildInTotoStatement(input) {
  const subject = input.fileDigests.map((digest) => ({
    name: digest.name,
    digest: { sha256: digest.sha256 }
  }));
  const summary = summarizeGradedEvidence(input.rows);
  const predicate = {
    verifier: { id: "https://paqad.ai", version: input.verifierVersion },
    time_verified: input.timeVerified,
    policy: {
      predicate_type: PAQAD_VSA_PREDICATE_TYPE,
      schema_version: EVIDENCE_LEDGER_SCHEMA_VERSION
    },
    verification_result: deriveVerificationResult(summary),
    graded_results: summary,
    evidence_by_engine: countByEngine(input.rows),
    ...input.authorship !== void 0 ? { change_authorship: input.authorship } : {},
    ...input.complianceCitations !== void 0 && input.complianceCitations.length > 0 ? { compliance_citations: [...input.complianceCitations] } : {},
    ...input.reproducibility !== void 0 ? { reproducibility: input.reproducibility } : {},
    ...input.metrics !== void 0 ? { metrics: input.metrics } : {},
    ...input.evidenceSeal !== void 0 ? {
      evidence_sha256: input.evidenceSeal.sha256,
      evidence_line_count: input.evidenceSeal.line_count
    } : { rows: [...input.rows] }
  };
  return {
    _type: IN_TOTO_STATEMENT_TYPE,
    subject,
    predicateType: PAQAD_VSA_PREDICATE_TYPE,
    predicate
  };
}

// src/feature-evidence/receipt.ts
var RECEIPT_DOC_TYPE = "paqad.receipt";
var RECEIPT_SCHEMA_VERSION = 2;
var AI_BOM_DOC_TYPE = "paqad.ai-bom";
var AI_BOM_SCHEMA_VERSION = 2;
function withFeatureReceiptHeader(envelope, identity) {
  const header = buildEnvelopeHeader({
    docType: RECEIPT_DOC_TYPE,
    change: featureChangeKey(identity.dirName),
    sessionId: documentSessionId(identity.projectRoot, identity.dirName, identity.sessionId),
    schemaVersion: RECEIPT_SCHEMA_VERSION,
    contentHash: envelope.paqad.receipt_hash,
    now: () => new Date(identity.recordedAt)
  });
  return { ...envelope, paqad: withReceiptHeader(header, envelope.paqad) };
}
function withFeatureAiBomHeader(aiBom, identity) {
  const header = buildEnvelopeHeader({
    docType: AI_BOM_DOC_TYPE,
    change: featureChangeKey(identity.dirName),
    sessionId: documentSessionId(identity.projectRoot, identity.dirName, identity.sessionId),
    schemaVersion: AI_BOM_SCHEMA_VERSION,
    contentHash: computeContentHash(aiBom),
    now: () => new Date(identity.recordedAt)
  });
  return {
    ...aiBom,
    metadata: {
      ...aiBom.metadata,
      properties: [...toAiBomProperties(header), ...aiBom.metadata.properties]
    }
  };
}
function atomicWriteJson(absPath, value) {
  mkdirSync(dirname(absPath), { recursive: true });
  const tmp = `${absPath}.tmp-${process.pid}`;
  writeFileSync(tmp, `${JSON.stringify(value, null, 2)}
`, "utf8");
  renameSync(tmp, absPath);
}
function readJson(absPath) {
  try {
    return JSON.parse(readFileSync(absPath, "utf8"));
  } catch {
    return null;
  }
}
function readFeatureReceipt(projectRoot, dirName) {
  return readJson(join2(projectRoot, featureFilePath(dirName, "receipt")));
}
function readAllFeatureReceipts(projectRoot) {
  return readAllFeatureReceiptEntries(projectRoot).map((entry) => entry.envelope);
}
function readAllFeatureReceiptEntries(projectRoot) {
  const entries = [];
  for (const dirName of listFeatureDirs(projectRoot)) {
    const envelope = readFeatureReceipt(projectRoot, dirName);
    if (envelope) {
      entries.push({ dirName, envelope });
    }
  }
  return entries;
}
function readText(absPath) {
  try {
    return readFileSync(absPath, "utf8");
  } catch {
    return "";
  }
}
function sealedPrefix(raw, lineCount) {
  let end = 0;
  for (let line = 0; line < lineCount; line += 1) {
    const newline = raw.indexOf("\n", end);
    if (newline === -1) return null;
    end = newline + 1;
  }
  return raw.slice(0, end);
}
function sealFeatureEvidence(projectRoot, dirName) {
  const raw = readText(join2(projectRoot, featureFilePath(dirName, "evidence")));
  const complete = raw.slice(0, raw.lastIndexOf("\n") + 1);
  const lineCount = complete.length === 0 ? 0 : complete.split("\n").length - 1;
  return { sha256: sha256Hex(complete), line_count: lineCount };
}
function verifyEvidenceSeal(projectRoot, dirName, statement) {
  const { evidence_sha256: sha256, evidence_line_count: lineCount } = statement.predicate;
  if (sha256 === void 0 || lineCount === void 0) return null;
  const raw = readText(join2(projectRoot, featureFilePath(dirName, "evidence")));
  const prefix = sealedPrefix(raw, lineCount);
  return prefix !== null && sha256Hex(prefix) === sha256;
}
function splitReceiptEvidenceRows(statement, evidenceRows, sealedRowCount = statement.predicate.evidence_line_count ?? 0) {
  const carried = statement.predicate.rows;
  if (Array.isArray(carried)) return { sealed: [...carried], unsealed: [] };
  const time = statement.predicate.time_verified;
  const ofRun = (row) => rowRecordedAt(row) === time;
  return {
    sealed: evidenceRows.slice(0, sealedRowCount).filter(ofRun),
    unsealed: evidenceRows.slice(sealedRowCount).filter(ofRun)
  };
}
function readReceiptEvidenceRows(projectRoot, dirName, statement) {
  const raw = readText(join2(projectRoot, featureFilePath(dirName, "evidence")));
  const lineCount = statement.predicate.evidence_line_count ?? 0;
  const prefix = sealedPrefix(raw, lineCount);
  return splitReceiptEvidenceRows(
    statement,
    parseEvidenceRows(raw),
    prefix === null ? 0 : parseEvidenceRows(prefix).length
  );
}
function latestFeatureReceipt(projectRoot) {
  let latest = null;
  let latestTime = "";
  for (const receipt of readAllFeatureReceipts(projectRoot)) {
    const time = decodeReceiptStatement(receipt)?.predicate.time_verified ?? "";
    if (latest === null || time >= latestTime) {
      latest = receipt;
      latestTime = time;
    }
  }
  return latest;
}
function projectFeatureReceipt(projectRoot, dirName, input) {
  const statement = buildInTotoStatement({
    fileDigests: input.fileDigests,
    rows: input.rows,
    verifierVersion: input.verifierVersion,
    timeVerified: input.timeVerified,
    ...input.metrics !== void 0 ? { metrics: input.metrics } : {},
    ...input.authorship !== void 0 ? { authorship: input.authorship } : {},
    ...input.complianceCitations !== void 0 ? { complianceCitations: input.complianceCitations } : {},
    ...input.reproducibility !== void 0 ? { reproducibility: input.reproducibility } : {},
    evidenceSeal: sealFeatureEvidence(projectRoot, dirName)
  });
  const prior = readFeatureReceipt(projectRoot, dirName);
  const identity = {
    projectRoot,
    dirName,
    sessionId: input.sessionId,
    recordedAt: input.timeVerified
  };
  const envelope = withFeatureReceiptHeader(
    signReceipt({
      statement,
      prevReceiptHash: prior?.paqad?.receipt_hash ?? ZERO_DIGEST,
      mode: "hash-chained"
    }),
    identity
  );
  const aiBom = withFeatureAiBomHeader(
    buildAiBom({ statement, toolVersion: input.verifierVersion }),
    identity
  );
  const receiptRel = featureFilePath(dirName, "receipt");
  const aiBomRel = featureFilePath(dirName, "aiBom");
  if (input.write?.receipt ?? true) {
    atomicWriteJson(join2(projectRoot, receiptRel), envelope);
  }
  if (input.write?.aiBom ?? true) {
    atomicWriteJson(join2(projectRoot, aiBomRel), aiBom);
  }
  return { envelope, aiBom, receiptPath: receiptRel, aiBomPath: aiBomRel };
}
function projectAiBomFromFeatures(projectRoot, verifierVersion, timeVerified) {
  const fileDigests = [];
  const rows = [];
  const seenSubjects = /* @__PURE__ */ new Set();
  const seenRows = /* @__PURE__ */ new Set();
  let any = false;
  for (const dirName of listFeatureDirs(projectRoot)) {
    const receipt = readFeatureReceipt(projectRoot, dirName);
    if (!receipt) continue;
    const statement2 = decodeReceiptStatement(receipt);
    if (!statement2) continue;
    any = true;
    for (const subject of statement2.subject) {
      const key = `${subject.name}\0${subject.digest.sha256}`;
      if (seenSubjects.has(key)) continue;
      seenSubjects.add(key);
      fileDigests.push({ name: subject.name, sha256: subject.digest.sha256 });
    }
    for (const row of readReceiptEvidenceRows(projectRoot, dirName, statement2).sealed) {
      if (seenRows.has(row.content_hash)) continue;
      seenRows.add(row.content_hash);
      rows.push(row);
    }
  }
  if (!any) return null;
  const statement = buildInTotoStatement({ fileDigests, rows, verifierVersion, timeVerified });
  return buildAiBom({ statement, toolVersion: verifierVersion });
}

// src/cost/prices.ts
init_esm_shims();
var PRICE_TABLE_DATE = "2026-10-19";
var PRICE_TABLE_SOURCE = "https://platform.claude.com/docs/en/about-claude/pricing";
var COST_BASIS = "API-equivalent estimate";
var COST_LABEL = "estimate at API prices (API-equivalent on a Pro or Max plan)";
var COST_PLAN_NOTE = "On a Pro or Max plan you pay a flat fee, not these prices. The figure is what the same tokens would cost on the API.";
var NOT_COUNTED = [
  "The fast mode premium",
  "The 1.1 times multiplier for US-only inference",
  "Batch discounts",
  "Tool fees charged on their own, such as web search",
  "Subagents that are not paqad agents, since paqad never sees their transcripts",
  "Tokens spent before the change's first record or after its seal"
];
function price(input, cacheWrite5m, cacheWrite1h, cacheRead, output) {
  return {
    input,
    cache_write_5m: cacheWrite5m,
    cache_write_1h: cacheWrite1h,
    cache_read: cacheRead,
    output
  };
}
var FABLE_5_1 = price(10, 12.5, 20, 0.25, 50);
var FABLE_5 = price(10, 12.5, 20, 1, 50);
var OPUS_4_5_TO_5 = price(5, 6.25, 10, 0.5, 25);
var OPUS_4_AND_4_1 = price(15, 18.75, 30, 1.5, 75);
var SONNET_4_TO_4_6 = price(3, 3.75, 6, 0.3, 15);
var PRICE_TABLE = [
  { model: "claude-fable-5-1", prices: FABLE_5_1 },
  { model: "claude-fable-5", prices: FABLE_5 },
  { model: "claude-mythos-5-1", prices: FABLE_5_1 },
  { model: "claude-mythos-5", prices: FABLE_5 },
  { model: "claude-opus-5-5", prices: price(4, 5, 8, 0.2, 20) },
  { model: "claude-opus-5", prices: OPUS_4_5_TO_5 },
  { model: "claude-opus-4-8", prices: OPUS_4_5_TO_5 },
  { model: "claude-opus-4-7", prices: OPUS_4_5_TO_5 },
  { model: "claude-opus-4-6", prices: OPUS_4_5_TO_5 },
  { model: "claude-opus-4-5", prices: OPUS_4_5_TO_5 },
  { model: "claude-opus-4-1", prices: OPUS_4_AND_4_1 },
  { model: "claude-opus-4", prices: OPUS_4_AND_4_1 },
  { model: "claude-sonnet-5-5", prices: price(2, 2.5, 4, 0.1, 10) },
  { model: "claude-sonnet-5", prices: price(2, 2.5, 4, 0.2, 10) },
  { model: "claude-sonnet-4-6", prices: SONNET_4_TO_4_6 },
  { model: "claude-sonnet-4-5", prices: SONNET_4_TO_4_6 },
  { model: "claude-sonnet-4", prices: SONNET_4_TO_4_6 },
  {
    model: "claude-haiku-5-5",
    prices: price(0.1, 0.125, 0.2, 0.01, 0.5),
    above: { tokens: 1e5, prices: price(0.5, 0.625, 1, 0.05, 2.5) }
  },
  { model: "claude-haiku-4-5", prices: price(1, 1.25, 2, 0.1, 5) },
  { model: "claude-haiku-3-5", prices: price(0.8, 1, 1.6, 0.08, 4) }
];
var ALIASES = {
  "claude-3-5-haiku": "claude-haiku-3-5",
  "claude-sonnet-4-0": "claude-sonnet-4",
  "claude-opus-4-0": "claude-opus-4"
};
var BY_MODEL = new Map(
  PRICE_TABLE.map((entry) => [entry.model, entry])
);
function normalizeModelId(model) {
  let id = model.trim().toLowerCase();
  const at = id.indexOf("claude-");
  if (at > 0) id = id.slice(at);
  id = id.replace(/\[[^\]]*\]$/, "");
  id = id.replace(/-v\d+(?::\d+)?$/, "");
  id = id.replace(/(?:-|@)\d{8}$/, "");
  id = id.replace(/-latest$/, "");
  return ALIASES[id] ?? id;
}
function priceFor(model) {
  if (typeof model !== "string" || model.trim() === "") return null;
  return BY_MODEL.get(normalizeModelId(model)) ?? null;
}
function messageUsd(usage, model) {
  const entry = priceFor(model);
  if (!entry) return null;
  const prompt = usage.input + usage.cache_read + usage.cache_write;
  const prices = entry.above && prompt > entry.above.tokens ? entry.above.prices : entry.prices;
  const write1h = usage.cache_write_1h;
  const write5m = Math.max(0, usage.cache_write - write1h);
  const dollars = usage.input * prices.input + write5m * prices.cache_write_5m + write1h * prices.cache_write_1h + usage.cache_read * prices.cache_read + usage.output * prices.output;
  return dollars / 1e6;
}
function roundUsd(usd) {
  return Math.round(usd * 1e4) / 1e4;
}
function formatUsd(usd) {
  if (usd > 0 && usd < 5e-3) return "under $0.01";
  return `$${usd.toFixed(2)}`;
}
function moneyText(usd, priceDate = PRICE_TABLE_DATE) {
  return `~${formatUsd(usd)}, ${COST_LABEL}, prices of ${priceDate}`;
}

// src/cost/change-cost.ts
var COST_DOC_TYPE = "paqad.cost";
var COST_SCHEMA_VERSION = 1;
var COST_SCHEMA = "paqad.cost/1";
var COST_CACHE_SCHEMA = "paqad.cost-cache/1";
var ORCHESTRATOR_STAGE = "orchestrator";
var HIGH_TABLE_STAGE = "specification";
function asRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : null;
}
function str(value) {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}
function emptyCache(sessionId) {
  return { schema: COST_CACHE_SCHEMA, session_id: sessionId, sources: {} };
}
function readCostCache(path, sessionId) {
  try {
    const raw = asRecord(JSON.parse(readFileSync2(path, "utf8")));
    if (raw?.schema !== COST_CACHE_SCHEMA || !asRecord(raw.sources)) return emptyCache(sessionId);
    return raw;
  } catch {
    return emptyCache(sessionId);
  }
}
function readAllCostCaches(projectRoot) {
  const dir = join3(projectRoot, PATHS.HUD_DIR);
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((name) => name.endsWith(HUD_COST_CACHE_SUFFIX)).map((name) => readCostCache(join3(dir, name), name.slice(0, -HUD_COST_CACHE_SUFFIX.length)));
}
function earlier(a, b) {
  if (a === null || b === null) return null;
  return Date.parse(b) < Date.parse(a) ? b : a;
}
function registerSource(cache, path, identity, dirName, floor) {
  const existing = cache.sources[path];
  if (!existing) {
    cache.sources[path] = {
      ...identity,
      changes: [dirName],
      floor,
      offset: 0,
      messages: {}
    };
    return;
  }
  if (!existing.changes.includes(dirName)) existing.changes.push(dirName);
  const lowered = earlier(existing.floor, floor);
  if (lowered !== existing.floor) {
    existing.floor = lowered;
    existing.offset = 0;
    existing.messages = {};
  }
}
function agentIdentity(agentType, agentId, path) {
  const name = stripPluginAgentNamespace(agentType.trim());
  let role = null;
  if (isHighTableAgent(agentType)) {
    role = name === CHIEF_ARCHITECT_AGENT_NAME ? CHIEF_ROLE : roleFromSubagentTranscript(path);
  }
  return {
    kind: "agent",
    agent_type: agentType,
    agent_id: agentId,
    stage: stageForAgentName(name),
    role
  };
}
function recordCostSources(cache, payload, dirName, floor) {
  const main = str(payload.transcript_path);
  if (main) {
    registerSource(
      cache,
      main,
      { kind: "main", agent_type: null, agent_id: null, stage: null, role: null },
      dirName,
      floor
    );
  }
  const agentPath = str(payload.agent_transcript_path);
  const agentType = str(payload.agent_type);
  if (agentPath && agentType && agentPath !== main) {
    const known = cache.sources[agentPath];
    const identity = known ?? agentIdentity(agentType, str(payload.agent_id), agentPath);
    registerSource(cache, agentPath, identity, dirName, floor);
  }
}
function fileSize(path) {
  try {
    return statSync(path).size;
  } catch {
    return null;
  }
}
function refreshSource(path, source, chunkBytes) {
  const size = fileSize(path);
  if (size === null) return;
  if (size < source.offset) {
    source.offset = 0;
    source.messages = {};
  }
  if (size === source.offset) return;
  const usage = readTranscriptUsage(path, { fromOffset: source.offset, chunkBytes });
  const floor = source.floor === null ? Number.NaN : Date.parse(source.floor);
  for (const message of usage.messages) {
    const at = message.timestamp === null ? Number.NaN : Date.parse(message.timestamp);
    if (Number.isNaN(at) || at < floor) continue;
    const kept = source.messages[message.id];
    const merged = kept ? maxTokenUsage(usageOf(kept), message.usage) : message.usage;
    source.messages[message.id] = [
      kept?.[0] ?? message.model,
      kept?.[1] ?? message.timestamp,
      merged.input,
      merged.output,
      merged.cache_read,
      merged.cache_write,
      merged.cache_write_5m,
      merged.cache_write_1h
    ];
  }
  source.offset = usage.end_offset;
}
function cachedMessageUsage(message) {
  return usageOf(message);
}
function usageOf(message) {
  const [, , input, output, cacheRead, cacheWrite, write5m, write1h] = message;
  return {
    input,
    output,
    cache_read: cacheRead,
    cache_write: cacheWrite,
    cache_write_5m: write5m,
    cache_write_1h: write1h,
    total: input + output + cacheRead + cacheWrite
  };
}
function updateCostCache(input) {
  const path = hudCostCachePath(input.projectRoot, input.sessionId);
  try {
    return withFileLockSync(
      `${path}.lock`,
      () => {
        const cache = readCostCache(path, input.sessionId);
        recordCostSources(cache, input.payload, input.dirName, input.floor);
        for (const [source, entry] of Object.entries(cache.sources)) {
          if (entry.changes.includes(input.dirName)) refreshSource(source, entry, input.chunkBytes);
        }
        writeFileAtomic(path, `${JSON.stringify(cache)}
`);
        return cache;
      },
      { timeoutMs: 5e3, ...input.lock }
    );
  } catch (error) {
    if (!(error instanceof FileLockTimeoutError)) throw error;
    appendHooksLog(input.projectRoot, `cost: cache not updated: ${error.message}`);
    return readCostCache(path, input.sessionId);
  }
}
function updateSessionCostCache(input) {
  const main = str(input.payload.transcript_path);
  if (!main) return null;
  const path = hudCostCachePath(input.projectRoot, input.sessionId);
  try {
    return withFileLockSync(
      `${path}.lock`,
      () => {
        const cache = readCostCache(path, input.sessionId);
        const existing = cache.sources[main];
        if (!existing) {
          cache.sources[main] = {
            kind: "main",
            agent_type: null,
            agent_id: null,
            stage: null,
            role: null,
            changes: [],
            floor: input.floor,
            offset: 0,
            messages: {}
          };
        } else if (earlier(existing.floor, input.floor) !== existing.floor) {
          existing.floor = input.floor;
          existing.offset = 0;
          existing.messages = {};
        }
        refreshSource(main, cache.sources[main], input.chunkBytes);
        writeFileAtomic(path, `${JSON.stringify(cache)}
`);
        return cache;
      },
      { timeoutMs: 5e3, ...input.lock }
    );
  } catch (error) {
    if (!(error instanceof FileLockTimeoutError)) throw error;
    appendHooksLog(input.projectRoot, `cost: session cache not updated: ${error.message}`);
    return null;
  }
}
function receiptTime(projectRoot, dirName) {
  const envelope = readFeatureReceipt(projectRoot, dirName);
  if (!envelope) return null;
  return str(decodeReceiptStatement(envelope)?.predicate?.time_verified);
}
function closeTime(rows) {
  let closed = null;
  for (const row of rows) {
    if (row.kind === "open") closed = null;
    else if (row.kind === "close") closed = rowRecordedAt(row);
  }
  return closed;
}
function stageRowAfter(rows, at) {
  const sealedAt = Date.parse(at);
  if (Number.isNaN(sealedAt)) return false;
  return rows.some((row) => {
    if (row.kind !== "stage_start" && row.kind !== "stage_end") return false;
    const rowAt = Date.parse(rowRecordedAt(row) ?? "");
    return !Number.isNaN(rowAt) && rowAt > sealedAt;
  });
}
function changeCostWindow(projectRoot, dirName, now = () => /* @__PURE__ */ new Date(), rows = readFeatureStageUnit(projectRoot, dirName)) {
  const open = rows.find((row) => row.kind === "open");
  const from = open ? rowRecordedAt(open) : null;
  if (from === null) return null;
  const receipt = receiptTime(projectRoot, dirName);
  if (receipt && !stageRowAfter(rows, receipt)) {
    return { from, to: receipt, sealed: true, sealed_by: "receipt" };
  }
  const close = closeTime(rows);
  if (close) return { from, to: close, sealed: true, sealed_by: "close" };
  return { from, to: now().toISOString(), sealed: false, sealed_by: null };
}
function stageSpans(rows) {
  const spans = [];
  rows.forEach((row, index) => {
    const stage = str(row.stage);
    const at = rowRecordedAt(row);
    if (row.kind !== "stage_start" || stage === null || at === null) return;
    const end = rows.slice(index + 1).find((later) => later.kind === "stage_end" && later.stage === stage);
    const endAt = end ? rowRecordedAt(end) : null;
    spans.push({
      stage,
      start: Date.parse(at),
      end: endAt === null ? Number.POSITIVE_INFINITY : Date.parse(endAt)
    });
  });
  return spans;
}
function stageAt(spans, at) {
  let best = null;
  for (const span of spans) {
    if (at < span.start || at > span.end) continue;
    if (best === null || span.start >= best.start) best = span;
  }
  return best?.stage ?? ORCHESTRATOR_STAGE;
}
function emptyBucket() {
  return { usage: emptyTokenUsage(), usd: 0, priced: false };
}
function addToBucket(bucket, usage, usd) {
  bucket.usage = addTokenUsage(bucket.usage, usage);
  if (usd !== null) {
    bucket.usd += usd;
    bucket.priced = true;
  }
}
function tokensOf(usage) {
  return {
    input: usage.input,
    output: usage.output,
    cache_read: usage.cache_read,
    cache_write: usage.cache_write,
    total: usage.total
  };
}
function lineOf(bucket) {
  return { tokens: tokensOf(bucket.usage), usd: bucket.priced ? roundUsd(bucket.usd) : null };
}
function collectMessages(caches, dirName) {
  const entries = caches.flatMap(
    (cache) => Object.values(cache.sources).filter((source) => source.changes.includes(dirName)).map((source) => ({ source, session: cache.session_id }))
  );
  entries.sort(
    (a, b) => a.source.kind === b.source.kind ? 0 : a.source.kind === "agent" ? -1 : 1
  );
  const messages = /* @__PURE__ */ new Map();
  for (const { source, session } of entries) {
    for (const [id, kept] of Object.entries(source.messages)) {
      const usage = usageOf(kept);
      const existing = messages.get(id);
      if (existing) {
        existing.usage = maxTokenUsage(existing.usage, usage);
        continue;
      }
      messages.set(id, {
        model: kept[0],
        at: kept[1] === null ? Number.NaN : Date.parse(kept[1]),
        usage,
        stage: source.role !== null ? HIGH_TABLE_STAGE : source.stage,
        role: source.role,
        kind: source.kind,
        session
      });
    }
  }
  return { messages, sources: entries.length };
}
function orderStages(buckets) {
  const rank = (stage) => {
    const index = STAGE_EVIDENCE_STAGES.indexOf(stage);
    return index === -1 ? STAGE_EVIDENCE_STAGES.length : index;
  };
  return [...buckets.entries()].sort(([a], [b]) => rank(a) - rank(b) || a.localeCompare(b)).map(([stage, bucket]) => ({ stage, ...lineOf(bucket) }));
}
function seatLines(projectRoot, dirName, transcriptLines) {
  const lines = new Map(transcriptLines);
  for (const seat of foldHighTable(readHighTable(projectRoot, dirName)).values()) {
    if (seat.tokens !== null) {
      const tokens = tokensOf(seat.tokens);
      const fromTranscript = lines.get(seat.role);
      lines.set(seat.role, {
        role: seat.role,
        tokens,
        usd: fromTranscript?.tokens.total === tokens.total ? fromTranscript.usd : null,
        exact: true
      });
      continue;
    }
    if (lines.has(seat.role) || seat.tokens_estimate === null) continue;
    lines.set(seat.role, {
      role: seat.role,
      tokens: {
        input: 0,
        output: 0,
        cache_read: 0,
        cache_write: 0,
        total: seat.tokens_estimate
      },
      usd: null,
      exact: false
    });
  }
  return [...lines.values()];
}
function mainMessageRoute(message, turnsOf) {
  return turnRouteAt(turnsOf(message.session), new Date(message.at).toISOString());
}
function computeChangeCost(projectRoot, dirName, options = {}) {
  const now = options.now ?? (() => /* @__PURE__ */ new Date());
  const rows = readFeatureStageUnit(projectRoot, dirName);
  const window = changeCostWindow(projectRoot, dirName, now, rows);
  if (window === null) return null;
  const from = Date.parse(window.from);
  const to = Date.parse(window.to);
  const spans = stageSpans(rows);
  const { messages, sources } = collectMessages(
    options.caches ?? readAllCostCaches(projectRoot),
    dirName
  );
  const turnCache = /* @__PURE__ */ new Map();
  const turnsOf = (sessionId) => {
    let turns = turnCache.get(sessionId);
    if (turns === void 0) {
      turns = options.routeTurns?.(sessionId) ?? readRouteTurns(projectRoot, sessionId);
      turnCache.set(sessionId, turns);
    }
    return turns;
  };
  const inWindow = [...messages.values()].filter(
    (message) => !Number.isNaN(message.at) && message.at >= from && message.at <= to && message.usage.total > 0
  );
  const scope = inWindow.some(
    (message) => message.kind === "main" && mainMessageRoute(message, turnsOf) === null
  ) ? "whole-session" : "change";
  const total = emptyBucket();
  const byModel = /* @__PURE__ */ new Map();
  const byStage = /* @__PURE__ */ new Map();
  const byRole = /* @__PURE__ */ new Map();
  const unpriced = /* @__PURE__ */ new Set();
  for (const message of inWindow) {
    if (scope === "change" && message.kind === "main" && mainMessageRoute(message, turnsOf) !== "feature-development") {
      continue;
    }
    const usd = messageUsd(message.usage, message.model);
    const model = message.model ?? "unknown";
    if (usd === null) unpriced.add(model);
    addToBucket(total, message.usage, usd);
    const modelBucket = byModel.get(model) ?? emptyBucket();
    addToBucket(modelBucket, message.usage, usd);
    byModel.set(model, modelBucket);
    const stage = message.stage ?? stageAt(spans, message.at);
    const stageBucket = byStage.get(stage) ?? emptyBucket();
    addToBucket(stageBucket, message.usage, usd);
    byStage.set(stage, stageBucket);
    if (message.role !== null) {
      const roleBucket = byRole.get(message.role) ?? emptyBucket();
      addToBucket(roleBucket, message.usage, usd);
      byRole.set(message.role, roleBucket);
    }
  }
  const fromTranscripts = new Map(
    [...byRole.entries()].map(([role, bucket]) => [role, { role, ...lineOf(bucket), exact: true }])
  );
  const seats = seatLines(projectRoot, dirName, fromTranscripts);
  const chiefLine = seats.find((line) => line.role === CHIEF_ROLE);
  return {
    schema: COST_SCHEMA,
    computed_at: now().toISOString(),
    window,
    scope,
    price_table_date: PRICE_TABLE_DATE,
    price_source: PRICE_TABLE_SOURCE,
    basis: COST_BASIS,
    label: COST_LABEL,
    plan_note: COST_PLAN_NOTE,
    tokens: tokensOf(total.usage),
    usd: total.priced ? roundUsd(total.usd) : null,
    unpriced_models: [...unpriced].sort(),
    by_model: [...byModel.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([model, bucket]) => ({ model, ...lineOf(bucket) })),
    by_stage: orderStages(byStage),
    by_expert: seats.filter((line) => line.role !== CHIEF_ROLE),
    chief: chiefLine ? { tokens: chiefLine.tokens, usd: chiefLine.usd, exact: chiefLine.exact } : null,
    not_counted: [...NOT_COUNTED],
    sources
  };
}
function writeChangeCost(projectRoot, dirName, record, sessionId) {
  const document = stampFeatureDocument({
    projectRoot,
    dirName,
    docType: COST_DOC_TYPE,
    schemaVersion: COST_SCHEMA_VERSION,
    sessionId,
    body: record
  });
  const path = join3(projectRoot, featureFilePath(dirName, "cost"));
  writeFileAtomic(path, `${JSON.stringify(document, null, 2)}
`);
  return path;
}
function readChangeCost(projectRoot, dirName) {
  try {
    const raw = asRecord(
      JSON.parse(readFileSync2(join3(projectRoot, featureFilePath(dirName, "cost")), "utf8"))
    );
    return raw?.schema === COST_SCHEMA ? raw : null;
  } catch {
    return null;
  }
}

export {
  decodeReceiptStatement,
  ZERO_DIGEST,
  computeFileDigests,
  computeChangeSubjectDigest,
  DSSE_PAYLOAD_TYPE,
  pae,
  verifyReceiptSeal,
  readAllFeatureReceipts,
  readAllFeatureReceiptEntries,
  verifyEvidenceSeal,
  splitReceiptEvidenceRows,
  readReceiptEvidenceRows,
  latestFeatureReceipt,
  projectFeatureReceipt,
  projectAiBomFromFeatures,
  messageUsd,
  roundUsd,
  moneyText,
  readCostCache,
  cachedMessageUsage,
  updateCostCache,
  updateSessionCostCache,
  changeCostWindow,
  computeChangeCost,
  writeChangeCost,
  readChangeCost
};
