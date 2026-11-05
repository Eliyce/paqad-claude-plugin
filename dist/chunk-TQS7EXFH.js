import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  PATHS
} from "./chunk-I7RXYXFH.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/shared/pathe.M-eThtNZ.mjs
init_esm_shims();
var _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
var _UNC_REGEX = /^[/\\]{2}/;
var _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
var _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
var _ROOT_FOLDER_RE = /^\/([A-Za-z]:)?$/;
var _EXTNAME_RE = /.(\.[^./]+|\.)$/;
var normalize = function(path) {
  if (path.length === 0) {
    return ".";
  }
  path = normalizeWindowsPath(path);
  const isUNCPath = path.match(_UNC_REGEX);
  const isPathAbsolute = isAbsolute(path);
  const trailingSeparator = path[path.length - 1] === "/";
  path = normalizeString(path, !isPathAbsolute);
  if (path.length === 0) {
    if (isPathAbsolute) {
      return "/";
    }
    return trailingSeparator ? "./" : ".";
  }
  if (trailingSeparator) {
    path += "/";
  }
  if (_DRIVE_LETTER_RE.test(path)) {
    path += "/";
  }
  if (isUNCPath) {
    if (!isPathAbsolute) {
      return `//./${path}`;
    }
    return `//${path}`;
  }
  return isPathAbsolute && !isAbsolute(path) ? `/${path}` : path;
};
var join = function(...segments) {
  let path = "";
  for (const seg of segments) {
    if (!seg) {
      continue;
    }
    if (path.length > 0) {
      const pathTrailing = path[path.length - 1] === "/";
      const segLeading = seg[0] === "/";
      const both = pathTrailing && segLeading;
      if (both) {
        path += seg.slice(1);
      } else {
        path += pathTrailing || segLeading ? seg : `/${seg}`;
      }
    } else {
      path += seg;
    }
  }
  return normalize(path);
};
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
var resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ;
      else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
var isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
var extname = function(p) {
  if (p === "..") return "";
  const match = _EXTNAME_RE.exec(normalizeWindowsPath(p));
  return match && match[1] || "";
};
var relative = function(from, to) {
  const _from = resolve(from).replace(_ROOT_FOLDER_RE, "$1").split("/");
  const _to = resolve(to).replace(_ROOT_FOLDER_RE, "$1").split("/");
  if (_to[0][1] === ":" && _from[0][1] === ":" && _from[0] !== _to[0]) {
    return _to.join("/");
  }
  const _fromCopy = [..._from];
  for (const segment of _fromCopy) {
    if (_to[0] !== segment) {
      break;
    }
    _from.shift();
    _to.shift();
  }
  return [..._from.map(() => ".."), ..._to].join("/");
};
var dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};
var basename = function(p, extension) {
  const segments = normalizeWindowsPath(p).split("/");
  let lastSegment = "";
  for (let i = segments.length - 1; i >= 0; i--) {
    const val = segments[i];
    if (val) {
      lastSegment = val;
      break;
    }
  }
  return extension && lastSegment.endsWith(extension) ? lastSegment.slice(0, -extension.length) : lastSegment;
};

// node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/index.mjs
init_esm_shims();

// src/core/ids/ulid.ts
init_esm_shims();
import { randomBytes } from "crypto";
var ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
var ENCODING_LEN = ENCODING.length;
var TIME_LEN = 10;
var RANDOM_LEN = 16;
var ULID_BODY = `[0-9A-HJKMNP-TV-Z]{${TIME_LEN + RANDOM_LEN}}`;
var lastTime = -1;
var lastRandom = [];
function encodeTime(time) {
  let remainder = time;
  let out = "";
  for (let i = TIME_LEN - 1; i >= 0; i--) {
    const mod = remainder % ENCODING_LEN;
    out = ENCODING[mod] + out;
    remainder = (remainder - mod) / ENCODING_LEN;
  }
  return out;
}
function randomIndices() {
  const bytes = randomBytes(RANDOM_LEN);
  return Array.from(bytes, (byte) => byte % ENCODING_LEN);
}
function incrementIndices(indices) {
  const next = [...indices];
  for (let i = next.length - 1; i >= 0; i--) {
    if (next[i] < ENCODING_LEN - 1) {
      next[i] = next[i] + 1;
      return next;
    }
    next[i] = 0;
  }
  return randomIndices();
}
function ulid(seedTime = Date.now()) {
  if (seedTime <= lastTime) {
    lastRandom = incrementIndices(lastRandom);
  } else {
    lastTime = seedTime;
    lastRandom = randomIndices();
  }
  return encodeTime(seedTime) + lastRandom.map((index) => ENCODING[index]).join("");
}

// src/planning/slug-utils.ts
init_esm_shims();

// src/core/text/trim-char.ts
init_esm_shims();
function trimLeadingChar(value, char) {
  let start = 0;
  while (start < value.length && value[start] === char) start += 1;
  return start === 0 ? value : value.slice(start);
}
function trimTrailingChar(value, char) {
  let end = value.length;
  while (end > 0 && value[end - 1] === char) end -= 1;
  return end === value.length ? value : value.slice(0, end);
}
function trimChar(value, char) {
  return trimTrailingChar(trimLeadingChar(value, char), char);
}
function slugifyAscii(value) {
  return trimChar(value.toLowerCase().replace(/[^a-z0-9]+/g, "-"), "-");
}

// src/planning/slug-utils.ts
var MAX_SLUG_LENGTH = 80;
function deriveSlug(featureId, requestText) {
  const source = [featureId, requestText].filter(Boolean).join(" ");
  const normalized = slugifyAscii(source);
  if (!normalized) {
    return "planning-manifest";
  }
  return trimTrailingChar(normalized.slice(0, MAX_SLUG_LENGTH), "-") || "planning-manifest";
}
function isSlugSafe(slug) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

// src/feature-evidence/paths.ts
init_esm_shims();
var FEATURE_BUNDLE_FILES = {
  feature: "feature.json",
  plan: "plan.json",
  specification: "specification.json",
  review: "review.json",
  stageEvidence: "stage-evidence.jsonl",
  ruleRun: "rule-run.jsonl",
  rulesLoaded: "rules-loaded.json",
  delivery: "delivery.json",
  receipt: "receipt.json",
  aiBom: "ai-bom.json",
  rag: "rag.jsonl",
  checks: "checks.json",
  duplication: "duplication.jsonl",
  changeMetrics: "change-metrics.jsonl",
  evidence: "evidence.jsonl",
  visualEvidence: "visual-evidence.json",
  specMd: "spec.md",
  request: "request.md",
  clarification: "clarification.json",
  experts: "experts.json",
  highTable: "high-table.jsonl",
  cost: "cost.json",
  decisions: "decisions.json",
  techDebt: "tech-debt.json",
  ruleOverrides: "rule-overrides.jsonl",
  fixProof: "fix-proof.json"
};
var LEGACY_BUNDLE_FILES = {
  specificationMd: "specification.md",
  contextEfficiency: "context-efficiency.jsonl"
};
var SCREENSHOTS_DIR = "screenshots";
var JIRA_ISSUE = "[A-Z][A-Z0-9]*-\\d+";
var GITHUB_ISSUE = "\\d+";
var DIR_NAME_RE = new RegExp(
  `^(?:(${JIRA_ISSUE}|${GITHUB_ISSUE})-)?([a-z0-9]+(?:-[a-z0-9]+)*)-(${ULID_BODY})$`
);
var ISSUE_RE = new RegExp(`^(?:${JIRA_ISSUE}|${GITHUB_ISSUE})$`);
function featureDir(dirName) {
  return join(PATHS.FEATURE_EVIDENCE_DIR, dirName);
}
function featureChangeKey(dirName) {
  return parseFeatureDirName(dirName)?.ulid ?? dirName;
}
function featureFilePath(dirName, file) {
  return join(featureDir(dirName), FEATURE_BUNDLE_FILES[file]);
}
function featureReportPath(dirName) {
  return join(featureDir(dirName), "report.html");
}
function featureScreenshotsDir(dirName) {
  return join(featureDir(dirName), SCREENSHOTS_DIR);
}
function featureLegacySpecMarkdownPath(dirName) {
  return join(featureDir(dirName), LEGACY_BUNDLE_FILES.specificationMd);
}
function featureSessionControlPath(sessionId) {
  return join(PATHS.FEATURE_EVIDENCE_SESSION_DIR, `${sessionId}.json`);
}
function chatDir(sessionId) {
  return join(PATHS.CHAT_LEDGER_DIR, sessionId);
}
function chatRagPath(sessionId) {
  return join(chatDir(sessionId), FEATURE_BUNDLE_FILES.rag);
}
function formatFeatureDirName(parts) {
  if (!isSlugSafe(parts.slug)) {
    throw new Error(`Unsafe feature slug: ${JSON.stringify(parts.slug)}`);
  }
  if (!new RegExp(`^${ULID_BODY}$`).test(parts.ulid)) {
    throw new Error(`Malformed feature ULID: ${JSON.stringify(parts.ulid)}`);
  }
  if (parts.issue !== null && !ISSUE_RE.test(parts.issue)) {
    throw new Error(`Malformed feature issue ref: ${JSON.stringify(parts.issue)}`);
  }
  const prefix = parts.issue ? `${parts.issue}-` : "";
  return `${prefix}${parts.slug}-${parts.ulid}`;
}
function parseFeatureDirName(dirName) {
  const match = DIR_NAME_RE.exec(dirName);
  if (!match) {
    return null;
  }
  return { issue: match[1] ?? null, slug: match[2], ulid: match[3] };
}
function isFeatureDirName(dirName) {
  return parseFeatureDirName(dirName) !== null;
}

// src/feature-evidence/types.ts
init_esm_shims();
var FEATURE_DOC_TYPE = "paqad.feature";
var PLAN_DOC_TYPE = "paqad.plan";
var REVIEW_DOC_TYPE = "paqad.review";
var SPECIFICATION_DOC_TYPE = "paqad.specification";
var SPEC_SOURCE_DOC_TYPE = "paqad.spec";
var REQUEST_DOC_TYPE = "paqad.request";
var CLARIFICATION_DOC_TYPE = "paqad.clarification";
var EXPERTS_DOC_TYPE = "paqad.experts";
var DECISIONS_DOC_TYPE = "paqad.decisions";
var TECH_DEBT_DOC_TYPE = "paqad.tech-debt";
var RULE_OVERRIDE_DOC_TYPE = "paqad.rule-override";
var FIX_PROOF_DOC_TYPE = "paqad.fix-proof";
var FEATURE_SESSION_DOC_TYPE = "paqad.feature-session";
var FEATURE_EVIDENCE_SCHEMA_VERSION = 1;
var FEATURE_DOC_SCHEMA_VERSION = 2;

export {
  normalize,
  join,
  resolve,
  isAbsolute,
  extname,
  relative,
  dirname,
  basename,
  ULID_BODY,
  ulid,
  trimTrailingChar,
  trimChar,
  slugifyAscii,
  deriveSlug,
  isSlugSafe,
  FEATURE_BUNDLE_FILES,
  LEGACY_BUNDLE_FILES,
  SCREENSHOTS_DIR,
  featureDir,
  featureChangeKey,
  featureFilePath,
  featureReportPath,
  featureScreenshotsDir,
  featureLegacySpecMarkdownPath,
  featureSessionControlPath,
  chatRagPath,
  formatFeatureDirName,
  parseFeatureDirName,
  isFeatureDirName,
  FEATURE_DOC_TYPE,
  PLAN_DOC_TYPE,
  REVIEW_DOC_TYPE,
  SPECIFICATION_DOC_TYPE,
  SPEC_SOURCE_DOC_TYPE,
  REQUEST_DOC_TYPE,
  CLARIFICATION_DOC_TYPE,
  EXPERTS_DOC_TYPE,
  DECISIONS_DOC_TYPE,
  TECH_DEBT_DOC_TYPE,
  RULE_OVERRIDE_DOC_TYPE,
  FIX_PROOF_DOC_TYPE,
  FEATURE_SESSION_DOC_TYPE,
  FEATURE_EVIDENCE_SCHEMA_VERSION,
  FEATURE_DOC_SCHEMA_VERSION
};
