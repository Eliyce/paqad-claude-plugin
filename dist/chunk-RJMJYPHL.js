import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  detectTicketRefs
} from "./chunk-NJE7NS7E.js";
import {
  computeSessionRowHash
} from "./chunk-Q353EDKY.js";
import {
  FEATURE_DOC_SCHEMA_VERSION,
  FEATURE_DOC_TYPE,
  PLAN_DOC_TYPE,
  REVIEW_DOC_TYPE,
  deriveSlug,
  formatFeatureDirName,
  ulid
} from "./chunk-AZLA53A6.js";
import {
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/compliance/markdown.ts
init_esm_shims();
import { createHash } from "crypto";
function sha256Hex(input) {
  return createHash("sha256").update(input).digest("hex");
}
function splitLines(source) {
  return source.replace(/\r\n/g, "\n").split("\n");
}
function parseHeadings(lines) {
  const headings = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const match = /^(#{1,6})\s+(.*\S)\s*$/.exec(line);
    if (!match) continue;
    headings.push({
      level: match[1].length,
      text: match[2],
      line: index + 1
    });
  }
  return headings;
}
function buildHeadingPath(headings, line) {
  const stack = [];
  for (const heading of headings) {
    if (heading.line > line) break;
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }
    stack.push(heading);
  }
  return stack.map((heading) => heading.text).join(" > ");
}
function classifySection(sectionPath) {
  const normalized = sectionPath.toLowerCase();
  if (/(?:^|> )(?:\d+(?:\.\d+)*\.?\s*)?(?:acceptance criteria\b|definition of done\b|ac\b)/.test(
    normalized
  )) {
    return { path: sectionPath, category: "acceptance" };
  }
  if (/(?:^|> )(?:\d+(?:\.\d+)*\.?\s*)?edge cases?\b|\bec-/.test(normalized)) {
    return { path: sectionPath, category: "edge-case" };
  }
  if (/(?:^|> )(?:\d+(?:\.\d+)*\.?\s*)?non-functional(?: requirements?)?\b|\bnfr\b/.test(normalized)) {
    return { path: sectionPath, category: "non-functional" };
  }
  if (/(?:^|> )(?:\d+(?:\.\d+)*\.?\s*)?functional requirements\b|\bfr-/.test(normalized)) {
    return { path: sectionPath, category: "functional" };
  }
  return { path: sectionPath, category: "unclassified" };
}
function makeDeterministicGeneratedId(sectionPath, index) {
  const digest = sha256Hex(`${sectionPath}::${index}`);
  return `GEN-${digest.slice(0, 12).toUpperCase()}`;
}
function normalizeCell(value) {
  return value.trim().replace(/\s+/g, " ");
}

// src/feature-evidence/mint.ts
init_esm_shims();
import { createHash as createHash2 } from "crypto";

// src/feature-evidence/envelope.ts
init_esm_shims();
var ENVELOPE_HEADER_KEYS = [
  "schema_version",
  "doc_type",
  "change",
  "session_id",
  "recorded_at",
  "content_hash"
];
var HEADER_KEY_SET = new Set(ENVELOPE_HEADER_KEYS);
function assertNoHeaderKeys(body, what) {
  const clash = Object.keys(body).filter((key) => HEADER_KEY_SET.has(key));
  if (clash.length > 0) {
    throw new Error(`${what} body carries envelope header keys: ${clash.join(", ")}`);
  }
}
function stampTime(now) {
  return (now ?? (() => /* @__PURE__ */ new Date()))().toISOString();
}
function buildEnvelopeHeader(identity) {
  return {
    schema_version: identity.schemaVersion,
    doc_type: identity.docType,
    change: identity.change,
    session_id: identity.sessionId,
    recorded_at: stampTime(identity.now),
    content_hash: identity.contentHash
  };
}
function buildDocumentEnvelope(input) {
  assertNoHeaderKeys(input.body, input.docType);
  const identity = {
    schema_version: input.schemaVersion,
    doc_type: input.docType,
    change: input.change,
    session_id: input.sessionId,
    ...input.body
  };
  const header = buildEnvelopeHeader({ ...input, contentHash: computeContentHash(identity) });
  return { ...header, ...input.body };
}
function stampBundleRow(input) {
  assertNoHeaderKeys(input.row, input.docType);
  const identity = {
    schema_version: input.schemaVersion,
    doc_type: input.docType,
    change: input.change,
    session_id: input.sessionId,
    ...input.row
  };
  const header = buildEnvelopeHeader({ ...input, contentHash: computeSessionRowHash(identity) });
  const stamped = { ...header, ...input.row };
  const errors = input.validate?.(stamped) ?? [];
  if (errors.length > 0) {
    throw new Error(`Invalid ${input.docType} row: ${errors.join("; ")}`);
  }
  return stamped;
}
function stringField(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}
function rowRecordedAt(row) {
  return stringField(row.recorded_at) ?? stringField(row.ts);
}
function carriesEnvelopeHeader(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const doc = value;
  return typeof doc.doc_type === "string" && typeof doc.change === "string" && typeof doc.recorded_at === "string" && typeof doc.content_hash === "string";
}
function documentHashMatches(doc) {
  if (!carriesEnvelopeHeader(doc)) return null;
  return computeContentHash(doc) === doc.content_hash;
}
function rowHashMatches(row) {
  if (!carriesEnvelopeHeader(row)) return null;
  return computeSessionRowHash(row) === row.content_hash;
}
function buildTextHeader(input) {
  return buildEnvelopeHeader({ ...input, contentHash: sha256Hex(input.body) });
}
var FRONT_MATTER_FENCE = "---";
function renderFrontMatter(header, body) {
  const lines = ENVELOPE_HEADER_KEYS.map((key) => `${key}: ${JSON.stringify(header[key])}`);
  return `${FRONT_MATTER_FENCE}
${lines.join("\n")}
${FRONT_MATTER_FENCE}
${body}`;
}
function parseFrontMatterValue(raw) {
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === "string" || typeof parsed === "number") {
      return parsed;
    }
  } catch {
  }
  return raw;
}
var FRONT_MATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
function splitFrontMatter(text) {
  const match = FRONT_MATTER_PATTERN.exec(text);
  if (!match) {
    return { header: null, body: text };
  }
  const header = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon <= 0) continue;
    header[line.slice(0, colon).trim()] = parseFrontMatterValue(line.slice(colon + 1).trim());
  }
  return { header, body: text.slice(match[0].length) };
}
function textHashMatches(text) {
  const { header, body } = splitFrontMatter(text);
  if (header?.change === void 0 || typeof header.content_hash !== "string") return null;
  return sha256Hex(body) === header.content_hash;
}
var REPORT_HEADER_SCRIPT_ID = "paqad-header";
function renderHeaderScript(header) {
  const ordered = Object.fromEntries(ENVELOPE_HEADER_KEYS.map((key) => [key, header[key]]));
  const json = JSON.stringify(ordered).replace(/</g, "\\u003c");
  return `<script type="application/json" id="${REPORT_HEADER_SCRIPT_ID}">${json}</script>`;
}
var HEADER_SCRIPT_PATTERN = new RegExp(
  `<script type="application/json" id="${REPORT_HEADER_SCRIPT_ID}">([\\s\\S]*?)</script>`
);
var AI_BOM_HEADER_PREFIX = "paqad:";
function toAiBomProperties(header) {
  return ENVELOPE_HEADER_KEYS.map((key) => ({
    name: `${AI_BOM_HEADER_PREFIX}${key}`,
    value: String(header[key])
  }));
}
function withReceiptHeader(header, block) {
  assertNoHeaderKeys(block, header.doc_type);
  return { ...header, ...block };
}

// src/feature-evidence/mint.ts
var UNTITLED_FEATURE_TITLE = "change";
var HASH_EXCLUDED_KEYS = /* @__PURE__ */ new Set(["content_hash", "created_at", "updated_at", "recorded_at"]);
function computeContentHash(record) {
  const identity = {};
  for (const key of Object.keys(record).sort()) {
    if (!HASH_EXCLUDED_KEYS.has(key)) {
      identity[key] = record[key];
    }
  }
  return createHash2("sha256").update(JSON.stringify(identity)).digest("hex");
}
function mintFeatureDirName(input) {
  const issue = resolveIssue(input);
  const slug = deriveSlug(titleWithoutRef(input.title, issue));
  const ulid2 = input.ulid ?? ulid(input.ulidSeed);
  const dirName = formatFeatureDirName({ issue, slug, ulid: ulid2 });
  return { dirName, issue, slug, ulid: ulid2 };
}
function resolveIssue(input) {
  if (input.issue !== void 0) {
    return normalizeIssue(input.issue);
  }
  const refs = detectTicketRefs(input.title, input.trackerKind ?? "generic");
  return normalizeIssue(refs[0] ?? null);
}
function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function titleWithoutRef(title, issue) {
  if (issue === null) {
    return title;
  }
  const ref = escapeRegExp(issue);
  const tail = "(?![A-Za-z0-9])[:\\-\\s]*";
  const pattern = /^\d+$/.test(issue) ? new RegExp(`(?:(?<![\\w/])#${ref}|^\\s*${ref})${tail}`, "gi") : new RegExp(`(?<![A-Za-z0-9])#?${ref}${tail}`, "gi");
  const stripped = title.replace(pattern, " ").trim();
  return /[a-z0-9]/i.test(stripped) ? stripped : title;
}
function normalizeIssue(issue) {
  if (issue === null) {
    return null;
  }
  const stripped = issue.replace(/^#/, "").trim();
  return stripped.length > 0 ? stripped : null;
}
function buildFeatureRecord(input) {
  const now = input.now ?? (() => /* @__PURE__ */ new Date());
  const updatedAt = now().toISOString();
  const openedAt = input.recorded_at;
  return buildDocumentEnvelope({
    docType: FEATURE_DOC_TYPE,
    change: input.change,
    sessionId: input.session_id,
    schemaVersion: FEATURE_DOC_SCHEMA_VERSION,
    now: openedAt === void 0 ? () => new Date(updatedAt) : () => new Date(openedAt),
    body: {
      issue: input.issue,
      title: input.title,
      slug: input.slug,
      lane: input.lane ?? null,
      status: input.status ?? "active",
      spec_id: input.spec_id ?? null,
      adapter: input.adapter,
      branch: input.branch ?? null,
      base_branch: input.base_branch ?? null,
      updated_at: updatedAt,
      ...input.kind !== void 0 ? { kind: input.kind } : {},
      ...input.lane_source !== void 0 ? { lane_source: input.lane_source } : {},
      ...input.lane_resized !== void 0 ? { lane_resized: input.lane_resized } : {},
      ...input.lane_raised !== void 0 ? { lane_raised: input.lane_raised } : {},
      ...input.lane_raised_for_authoring !== void 0 ? { lane_raised_for_authoring: input.lane_raised_for_authoring } : {}
    }
  });
}
function buildReviewRecord(input) {
  return buildDocumentEnvelope({
    docType: REVIEW_DOC_TYPE,
    change: input.change,
    sessionId: input.session_id,
    schemaVersion: FEATURE_DOC_SCHEMA_VERSION,
    now: input.now,
    body: {
      summary: input.summary,
      verdict: input.verdict,
      findings: input.findings ?? [],
      checked: input.checked ?? [],
      rollback: input.rollback
    }
  });
}
function buildPlanRecord(input) {
  return buildDocumentEnvelope({
    docType: PLAN_DOC_TYPE,
    change: input.change,
    sessionId: input.session_id,
    schemaVersion: FEATURE_DOC_SCHEMA_VERSION,
    now: input.now,
    body: {
      summary: input.summary,
      steps: input.steps ?? [],
      modules_touched: input.modules_touched ?? [],
      decisions: input.decisions ?? [],
      risks: input.risks ?? [],
      ...input.reuse === void 0 ? {} : { reuse: input.reuse }
    }
  });
}

export {
  sha256Hex,
  splitLines,
  parseHeadings,
  buildHeadingPath,
  classifySection,
  makeDeterministicGeneratedId,
  normalizeCell,
  UNTITLED_FEATURE_TITLE,
  computeContentHash,
  mintFeatureDirName,
  buildFeatureRecord,
  buildReviewRecord,
  buildPlanRecord,
  ENVELOPE_HEADER_KEYS,
  buildEnvelopeHeader,
  buildDocumentEnvelope,
  stampBundleRow,
  rowRecordedAt,
  documentHashMatches,
  rowHashMatches,
  buildTextHeader,
  renderFrontMatter,
  splitFrontMatter,
  textHashMatches,
  renderHeaderScript,
  toAiBomProperties,
  withReceiptHeader
};
