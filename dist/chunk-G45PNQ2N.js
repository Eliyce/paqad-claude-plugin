import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  hudLastBlockPath,
  withFileLockSync,
  writeFileAtomic
} from "./chunk-M5JAFUJN.js";
import {
  expertBudget,
  isExpertRole
} from "./chunk-NRKCUFAE.js";
import {
  readLatestProjectEvent,
  readProjectEvents,
  recordProjectEvent
} from "./chunk-T4VPFXR3.js";
import {
  detectDecisionForks,
  getPrimaryStack,
  readCompiledRules
} from "./chunk-MLMSXXJW.js";
import {
  appendHooksLog
} from "./chunk-CJ6GEKKF.js";
import {
  FrameworkError,
  engineLog,
  getPacksForFrameworks,
  readProjectProfile,
  tokenize,
  writeProjectProfile
} from "./chunk-BXFRPACZ.js";
import {
  getRuntimeRoot
} from "./chunk-VVRAO2BK.js";
import {
  computeRuleScriptsDigest,
  enforceRuleScripts,
  getCapability,
  isOnPath,
  readCapabilityDigest,
  readCapabilityVersions
} from "./chunk-7V2MKESP.js";
import {
  readFeatureEvidence
} from "./chunk-3WBMHHZR.js";
import {
  loadChangeEvidence
} from "./chunk-PMSUN52C.js";
import {
  execa
} from "./chunk-O77JBFWW.js";
import {
  markerBatchNarration
} from "./chunk-LPFFTROL.js";
import {
  classifyBundlePath,
  normalizeArtifactPath,
  parseAndRecordMarkers
} from "./chunk-PMMQGP5O.js";
import {
  isFeatureDevelopmentRoute,
  readWorkflowState
} from "./chunk-FNOZ5GEC.js";
import {
  resolveEffectiveLane
} from "./chunk-MBPRN7FO.js";
import {
  levenshtein
} from "./chunk-Z6A2RYOU.js";
import {
  toPosixPath
} from "./chunk-4K4CM3QN.js";
import {
  PRE_CODE_STAGES,
  appendFeatureStageRow,
  currentFeature,
  documentSessionId,
  foldFeature,
  isArtifactBearingStage,
  isLaneStage,
  isStageAgent,
  readFeatureStageUnit,
  recordShip,
  requiredPreCodeStages,
  resolveDeliveryFeatureByBranch,
  stampFeatureDocument
} from "./chunk-7UCGEMJB.js";
import {
  SchemaValidator,
  configSaysPaqadDisabled,
  readConfigsDir,
  readDotConfig,
  readProjectRuleComplianceModeOverride,
  require_dist,
  resolveFrameworkConfig,
  resolveNumericConfig,
  setConfigValue
} from "./chunk-IUTPBUW2.js";
import {
  ENVELOPE_HEADER_KEYS,
  UNTITLED_FEATURE_TITLE,
  buildDocumentEnvelope,
  buildHeadingPath,
  buildPlanRecord,
  buildReviewRecord,
  buildTextHeader,
  classifySection,
  listFeatureDirs,
  listInFlightFeatures,
  makeDeterministicGeneratedId,
  mintFeatureDirName,
  normalizeCell,
  parseHeadings,
  renameWithRetrySync,
  renderFrontMatter,
  rowRecordedAt,
  sha256Hex,
  splitFrontMatter,
  splitLines,
  updateFeatureRecord,
  validatePlanRecord,
  validateReviewRecord
} from "./chunk-F256LZXA.js";
import {
  require_ajv
} from "./chunk-WGEG5J6L.js";
import {
  SPEC_CORRECTION_KIND,
  SPEC_STEP_KIND,
  STAGE_AGENT_KIND
} from "./chunk-DIAYPPCX.js";
import {
  appendSessionEvent,
  computeSessionRowHash,
  currentOrdinal,
  openSessionDoc,
  readUnitFile
} from "./chunk-3CUGDX3J.js";
import {
  resolveSessionId
} from "./chunk-MG36YCW4.js";
import {
  CLARIFICATION_DOC_TYPE,
  EXPERTS_DOC_TYPE,
  FEATURE_BUNDLE_FILES,
  FEATURE_DOC_SCHEMA_VERSION,
  REQUEST_DOC_TYPE,
  SCREENSHOTS_DIR,
  SPECIFICATION_DOC_TYPE,
  SPEC_SOURCE_DOC_TYPE,
  ULID_BODY,
  featureChangeKey,
  featureDir,
  featureFilePath,
  parseFeatureDirName,
  readSessionControl,
  slugifyAscii,
  ulid,
  writeSessionControl
} from "./chunk-KF7HHHJR.js";
import {
  dirname,
  isAbsolute,
  join,
  relative,
  resolve
} from "./chunk-EGDL57MD.js";
import {
  PATHS
} from "./chunk-UCSN7SVD.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/compliance/constants.ts
init_esm_shims();
var COMPLIANCE_SCHEMA_VERSION = 1;
var SPEC_REVIEW_SCHEMA_VERSION = 1;
var DEFAULT_OBLIGATION_INDEX_PATH = ".paqad/compliance/obligation-index.json";
function slugifySpec(specFile) {
  const segments = specFile.replace(/\.[^.]+$/, "").split(/[\\/]/);
  const base = segments[segments.length - 1];
  return slugifyAscii(base);
}
function specIndexPath(specFile) {
  return `.paqad/compliance/${slugifySpec(specFile)}/obligations.json`;
}
function specReportPath(specFile) {
  return `.paqad/compliance/${slugifySpec(specFile)}/report.json`;
}
function specReviewPath(specFile) {
  return `.paqad/compliance/${slugifySpec(specFile)}/spec-review.json`;
}

// src/compliance/spec-review.ts
init_esm_shims();

// src/compliance/spec-review-detectors/registry.ts
init_esm_shims();

// src/compliance/spec-review-detectors/boundary-detector.ts
init_esm_shims();

// src/compliance/spec-review-detectors/shared.ts
init_esm_shims();
function normalizeText(value) {
  return value.toLowerCase().replace(/[`*_]/g, "").replace(/\s+/g, " ").trim();
}
function makeLocation(line) {
  return {
    section: line.section,
    line_range: [line.line, line.line],
    text_excerpt: line.text.trim()
  };
}

// src/compliance/spec-review-detectors/boundary-detector.ts
var boundaryDetector = {
  name: "boundary_gap",
  detect(context) {
    const defects = [];
    for (const line of context.review_lines) {
      const normalized = normalizeText(line.text);
      const limitMatch = /\b(?:maximum|max(?:imum)?|minimum|min|threshold|limit)\b.*?(\d[\d,]*)/.exec(normalized);
      if (!limitMatch) continue;
      if (/exactly|equal to|at the boundary|inclusive/.test(normalized)) continue;
      const value = limitMatch[1].replace(/,/g, "");
      const relatedLines = context.review_lines.filter((candidate) => {
        const text = normalizeText(candidate.text);
        return text.includes(value) || /\btruncate|truncation|append truncation marker|clamp|reject\b/.test(text);
      });
      const hasBoundaryRule = relatedLines.some(
        (candidate) => /exactly|equal to|at the boundary|inclusive/.test(normalizeText(candidate.text))
      );
      const hasTransitionBehavior = relatedLines.some(
        (candidate) => /\btruncate|truncation|append truncation marker|clamp|reject\b/.test(
          normalizeText(candidate.text)
        )
      );
      if (hasTransitionBehavior && !hasBoundaryRule) {
        defects.push({
          category: "boundary_gap",
          severity: "major",
          description: `The spec defines a ${value}-value limit but never states the exact boundary behavior.`,
          locations: [makeLocation(line)],
          suggested_resolution: `State what happens at exactly ${value}.`
        });
      }
    }
    return defects;
  }
};

// src/compliance/spec-review-detectors/contradiction-detector.ts
init_esm_shims();
var contradictionDetector = {
  name: "contradiction",
  detect(context) {
    const defects = [];
    const exclusionLine = context.review_lines.find(
      (line) => /exclude(?:d)? .*denominator|excluded from the denominator/.test(normalizeText(line.text))
    );
    const formulaLine = context.review_lines.find(
      (line) => /(?:compliance_)?ratio\s*=.*\/\s*total\b|covered\s*\/\s*total\b/.test(
        normalizeText(line.text)
      )
    );
    if (exclusionLine && formulaLine) {
      defects.push({
        category: "contradiction",
        severity: "critical",
        description: "The denominator rule excludes obligations, but the stated formula still divides by total.",
        locations: [makeLocation(exclusionLine), makeLocation(formulaLine)].sort(
          (a, b) => a.line_range[0] - b.line_range[0]
        ),
        suggested_resolution: "Clarify one denominator rule and align the formula with that rule."
      });
    }
    const alwaysLines = context.review_lines.filter(
      (line) => /\balways\b/.test(normalizeText(line.text))
    );
    const neverLines = context.review_lines.filter(
      (line) => /\bnever\b/.test(normalizeText(line.text))
    );
    for (const left of alwaysLines) {
      const leftText = normalizeText(left.text);
      const quotedSubject = extractQuotedSubject(left.text);
      for (const right of neverLines) {
        const rightText = normalizeText(right.text);
        const subject = quotedSubject ?? extractQuotedSubject(right.text) ?? inferSharedSubject(leftText, rightText);
        if (!subject) continue;
        if (left.line === right.line) continue;
        if (!leftText.includes(subject) || !rightText.includes(subject)) continue;
        defects.push({
          category: "contradiction",
          severity: "major",
          description: `The spec gives both "always" and "never" guidance for ${subject}.`,
          locations: [makeLocation(left), makeLocation(right)].sort(
            (a, b) => a.line_range[0] - b.line_range[0]
          ),
          suggested_resolution: `Choose one rule for ${subject} or define when each rule applies.`
        });
        break;
      }
    }
    return defects;
  }
};
function extractQuotedSubject(text) {
  const match = /[`'"]([^`'"]+)[`'"]/.exec(text);
  return match ? normalizeText(match[1]) : null;
}
function inferSharedSubject(left, right) {
  const stopWords = /* @__PURE__ */ new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "to",
    "for",
    "of",
    "in",
    "on",
    "with",
    "must",
    "should",
    "always",
    "never",
    "be",
    "is",
    "are",
    "when",
    "if",
    "then"
  ]);
  const leftTokens = tokenize2(left).filter((token) => !stopWords.has(token));
  const rightTokens = new Set(tokenize2(right).filter((token) => !stopWords.has(token)));
  const overlap = leftTokens.filter((token) => rightTokens.has(token));
  if (overlap.length === 0) return null;
  return overlap.sort((a, b) => b.length - a.length)[0];
}
function tokenize2(text) {
  return text.split(/[^a-z0-9_]+/g).map((token) => token.trim()).filter((token) => token.length >= 3);
}

// src/compliance/spec-review-detectors/formula-detector.ts
init_esm_shims();
var DIVISION_PATTERN = /\b([a-z_]\w*)\s*\/\s*(?:\(([^)]+)\)|([a-z_]\w*))/;
var ZERO_CASE_PATTERN = /all\s+\w+(?:\s+\w+)*\s+(?:may|can|could)\s+be\s+(?:indeterminate|zero|empty|null|absent)|all\s+\w+(?:\s+\w+)*\s+are\s+(?:indeterminate|zero|empty|absent)|(?:may|can|could)\s+have\s+(?:zero|no)\s+\w+|\bno\s+\w+\s+(?:exist|remain|are\s+present)/;
var formulaDetector = {
  name: "formula_inconsistency",
  detect(context) {
    const defects = [];
    const canonicalFormulaLine = context.review_lines.find(
      (line) => /\/\s*\(\s*total\s*-\s*indeterminate\s*\)/.test(normalizeText(line.text))
    );
    const canonicalZeroCaseLine = context.review_lines.find(
      (line) => /all obligations .* indeterminate|all .* may be indeterminate/.test(normalizeText(line.text))
    );
    if (canonicalFormulaLine && canonicalZeroCaseLine) {
      defects.push({
        category: "formula_inconsistency",
        severity: "critical",
        description: "The formula can divide by zero when the spec allows every obligation to be indeterminate.",
        locations: [makeLocation(canonicalFormulaLine), makeLocation(canonicalZeroCaseLine)].sort(
          (a, b) => a.line_range[0] - b.line_range[0]
        ),
        suggested_resolution: "Define the zero-denominator behavior or revise the formula so that this input remains valid."
      });
    }
    for (const line of context.review_lines) {
      const normalized = normalizeText(line.text);
      const divMatch = DIVISION_PATTERN.exec(normalized);
      if (!divMatch) continue;
      const denomExpr = (divMatch[2] ?? divMatch[3]).trim();
      const denomWord = /\b([a-z_]\w*)\b/.exec(denomExpr)?.[1];
      if (!denomWord || denomWord.length < 3) continue;
      if (/http|url|path|file|true|false/.test(denomWord)) continue;
      const zeroCaseLine = context.review_lines.find((candidate) => {
        if (candidate.line === line.line) return false;
        const candidateText = normalizeText(candidate.text);
        return candidateText.includes(denomWord) && ZERO_CASE_PATTERN.test(candidateText);
      });
      if (zeroCaseLine) {
        defects.push({
          category: "formula_inconsistency",
          severity: "critical",
          description: `The formula divides by an expression containing "${denomWord}", but the spec allows a state where that value reaches zero.`,
          locations: [makeLocation(line), makeLocation(zeroCaseLine)].sort(
            (a, b) => a.line_range[0] - b.line_range[0]
          ),
          suggested_resolution: `Guard the formula against a zero "${denomWord}" value, or define behavior for that edge case.`
        });
      }
    }
    return dedupe(defects);
  }
};
function dedupe(items) {
  const seen = /* @__PURE__ */ new Set();
  return items.filter((item) => {
    const key = item.locations.map((l) => l.line_range[0]).join(":");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// src/compliance/spec-review-detectors/goal-conflict-detector.ts
init_esm_shims();
var CONFLICT_RULES = [
  {
    description: "A lossless extraction goal conflicts with a rule that ignores partially matching tables.",
    preservePattern: /\blossless\b|must preserve all data/,
    discardPattern: /\bignore\b.*\btable\b|non-matching tables .* ignored/,
    suggested_resolution: "Define which rule wins when a structure is partially recognized."
  },
  {
    description: 'A "must preserve all" completeness requirement conflicts with a rule that excludes or skips items.',
    preservePattern: /\bmust preserve all\b|\bno data (?:may be )?lost\b|\bcompleteness (?:is )?required\b|\bnothing (?:should|must) be (?:lost|dropped|discarded)\b/,
    discardPattern: /(?:\b(?:exclud\w*|skip\w*|filter(?:\s+out)?|discard\w*|omit\w*)\b.*\b(?:items?|entries?|records?|rows?|fields?)\b|\b(?:items?|entries?|records?|rows?|fields?)\b.*\b(?:exclud\w*|skip\w*|filter(?:\s+out)?|discard\w*|omit\w*)\b)/,
    suggested_resolution: "Specify what takes priority: completeness or the exclusion rule, and define behavior for items caught by both."
  },
  {
    description: 'An all-or-nothing "must succeed for all items" requirement conflicts with language that allows partial or incomplete processing.',
    preservePattern: /\bmust (?:succeed|complete|process)\s+(?:for\s+)?all\b|\ball\s+\w+\s+must\s+be\s+(?:processed|handled|covered)\b/,
    discardPattern: /\bpartial(?:ly)?\b|\bmay\s+(?:fail|be\s+skipped|be\s+incomplete)\b|\bnot\s+all\s+\w+\s+(?:will|may|might)\b/,
    suggested_resolution: "Reconcile the all-or-nothing requirement with the partial-processing allowance."
  }
];
var goalConflictDetector = {
  name: "goal_conflict",
  detect(context) {
    const defects = [];
    for (const rule of CONFLICT_RULES) {
      const preserveLine = context.review_lines.find(
        (line) => rule.preservePattern.test(normalizeText(line.text))
      );
      const discardLine = context.review_lines.find(
        (line) => rule.discardPattern.test(normalizeText(line.text))
      );
      if (preserveLine && discardLine) {
        defects.push({
          category: "goal_conflict",
          severity: "major",
          description: rule.description,
          locations: [makeLocation(preserveLine), makeLocation(discardLine)].sort(
            (a, b) => a.line_range[0] - b.line_range[0]
          ),
          suggested_resolution: rule.suggested_resolution
        });
      }
    }
    return defects;
  }
};

// src/compliance/spec-review-detectors/missing-negative-detector.ts
init_esm_shims();
var POSITIVE_PATH_PATTERN = /when[\s\S]*(100%|below threshold)/;
var INDETERMINATE_ALL_PATTERN = /all obligations[\s\S]*indeterminate[\s\S]*(return|warn|skip|pass|fail|must)/;
var NEGATIVE_PATH_PATTERN = /when not |otherwise|else|if not/;
var missingNegativeDetector = {
  name: "missing_negative_case",
  detect(context) {
    const defects = [];
    const positiveLine = context.review_lines.find((line) => {
      const text = normalizeText(line.text);
      return POSITIVE_PATH_PATTERN.test(text);
    });
    const negativeLine = context.review_lines.find(
      (line) => hasNegativePath(normalizeText(line.text))
    );
    if (positiveLine && !negativeLine) {
      defects.push({
        category: "missing_negative_case",
        severity: "major",
        description: "The spec defines conditional success or failure behavior but leaves the negative path undefined.",
        locations: [makeLocation(positiveLine)],
        suggested_resolution: "Define what happens when the stated condition does not hold, especially for indeterminate or empty inputs."
      });
    }
    return defects;
  }
};
function hasNegativePath(text) {
  return INDETERMINATE_ALL_PATTERN.test(text) || NEGATIVE_PATH_PATTERN.test(text);
}

// src/compliance/spec-review-detectors/reference-detector.ts
init_esm_shims();
var ID_PATTERN = /\b(?:FR|EC|AC|NFR|OQ)-[A-Z0-9][A-Z0-9.-]*\b/g;
var referenceDetector = {
  name: "references",
  detect(context) {
    const defects = [];
    const definedIds = collectDefinedIds(context.lines);
    for (const line of context.review_lines) {
      const normalized = normalizeText(line.text);
      if (/\bsee\b .*?\bspec\b/.test(normalized) && ![...line.text.matchAll(ID_PATTERN)].length) {
        defects.push({
          category: "unresolvable_reference",
          severity: "minor",
          description: "The spec references an external document that cannot be validated locally.",
          locations: [makeLocation(line)],
          suggested_resolution: "Inline the required contract details or replace the external note with a local reference."
        });
      }
      const references = [...line.text.matchAll(ID_PATTERN)].map((match) => match[0]);
      for (const reference of references) {
        if (definedIds.has(reference)) continue;
        defects.push({
          category: "dangling_reference",
          severity: "major",
          description: `The spec references ${reference}, but that identifier is not defined.`,
          locations: [makeLocation(line)],
          suggested_resolution: `Define ${reference} or update the reference to the correct identifier.`
        });
      }
    }
    return dedupeByLineAndCategory(defects);
  }
};
function collectDefinedIds(lines) {
  const defined = /* @__PURE__ */ new Set();
  for (const text of lines) {
    const trimmed = text.trim();
    const leadingMatches = [
      /^(?:#{1,6}\s+)?((?:FR|EC|AC|NFR|OQ)-[A-Z0-9][A-Z0-9.-]*)\b/,
      /^\*\*((?:FR|EC|AC|NFR|OQ)-[A-Z0-9][A-Z0-9.-]*)\*\*/,
      /^\|\s*((?:FR|EC|AC|NFR|OQ)-[A-Z0-9][A-Z0-9.-]*)\s*\|/
    ];
    for (const pattern of leadingMatches) {
      const match = pattern.exec(trimmed);
      if (match) {
        defined.add(match[1]);
      }
    }
  }
  return defined;
}
function dedupeByLineAndCategory(defects) {
  const seen = /* @__PURE__ */ new Set();
  return defects.filter((defect) => {
    const key = `${defect.category}:${defect.locations[0]?.line_range[0] ?? 0}:${defect.description ?? ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// src/compliance/spec-review-detectors/registry.ts
var SPEC_REVIEW_DETECTORS = [
  contradictionDetector,
  formulaDetector,
  boundaryDetector,
  goalConflictDetector,
  referenceDetector,
  missingNegativeDetector
];

// src/compliance/spec-review.ts
var SEVERITY_ORDER = {
  critical: 0,
  major: 1,
  minor: 2
};
function reviewSpecification(options) {
  const reviewedAt = options.reviewed_at ?? (/* @__PURE__ */ new Date()).toISOString();
  const context = buildReviewContext(options.spec_file, options.spec_markdown);
  const rawDefects = SPEC_REVIEW_DETECTORS.flatMap((detector) => detector.detect(context));
  const nextDefects = rawDefects.map((defect) => hydrateDefect(defect));
  const previousById = new Map(
    (options.previous_report?.defects ?? []).map((defect) => [defect.defect_id, defect])
  );
  const defects = nextDefects.map((defect) => ({
    ...defect,
    status: previousById.has(defect.defect_id) ? "existing" : "new"
  }));
  for (const previous of options.previous_report?.defects ?? []) {
    if (defects.some((defect) => defect.defect_id === previous.defect_id)) continue;
    defects.push({
      ...previous,
      status: "resolved",
      affected_obligation_ids: previous.affected_obligation_ids ?? []
    });
  }
  defects.sort(compareDefects);
  return {
    metadata: {
      spec_file: options.spec_file,
      spec_hash: sha256Hex(options.spec_markdown),
      reviewed_at: reviewedAt,
      defect_count: defects.filter((defect) => defect.status !== "resolved").length,
      schema_version: SPEC_REVIEW_SCHEMA_VERSION
    },
    defects,
    pattern_advisories: []
  };
}
function attachSpecDefectsToObligations(review, obligations) {
  const defects = review.defects.map((defect) => {
    if (defect.status === "resolved") {
      return { ...defect, affected_obligation_ids: defect.affected_obligation_ids ?? [] };
    }
    const affected = obligations.filter(
      (obligation) => defect.locations.some((location) => {
        const [start, end] = location.line_range;
        return obligation.source_line !== null && obligation.source_line >= start && obligation.source_line <= end;
      })
    ).map((obligation) => obligation.obligation_id).sort((a, b) => a.localeCompare(b));
    return {
      ...defect,
      affected_obligation_ids: affected
    };
  });
  return {
    ...review,
    defects
  };
}
function buildReviewContext(specFile, markdown) {
  const lines = splitLines(markdown);
  const headings = parseHeadings(lines);
  const openQuestionRanges = findOpenQuestionRanges(headings, lines.length);
  const reviewLines = lines.map((text, index) => ({
    line: index + 1,
    text,
    section: buildHeadingPath(headings, index + 1) || "Spec"
  })).filter((line) => isReviewableLine(line, openQuestionRanges));
  return {
    spec_file: specFile,
    spec_markdown: markdown,
    lines,
    review_lines: reviewLines
  };
}
function findOpenQuestionRanges(headings, lineCount) {
  const ranges = [];
  for (let index = 0; index < headings.length; index += 1) {
    const heading = headings[index];
    if (!/open questions/i.test(heading.text)) continue;
    let endLine = lineCount;
    for (let cursor = index + 1; cursor < headings.length; cursor += 1) {
      const candidate = headings[cursor];
      if (candidate.level <= heading.level) {
        endLine = candidate.line - 1;
        break;
      }
    }
    ranges.push([heading.line, endLine]);
  }
  return ranges;
}
function isReviewableLine(line, openQuestionRanges) {
  const trimmed = line.text.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("#")) return false;
  if (trimmed.startsWith("|---")) return false;
  if (openQuestionRanges.some(([start, end]) => line.line >= start && line.line <= end))
    return false;
  if (/\bTBD\b|to be determined/i.test(trimmed)) return false;
  return true;
}
function hydrateDefect(defect) {
  const defectId = sha256Hex(fingerprint(defect)).slice(0, 12).toUpperCase();
  return {
    defect_id: `SQ-${defectId}`,
    category: defect.category,
    severity: defect.severity,
    description: defect.description,
    locations: defect.locations.slice().sort((left, right) => left.line_range[0] - right.line_range[0]),
    suggested_resolution: defect.suggested_resolution,
    affected_obligation_ids: null,
    status: "new"
  };
}
function fingerprint(defect) {
  return JSON.stringify({
    category: defect.category,
    severity: defect.severity,
    description: defect.description,
    locations: defect.locations.map((location) => ({
      section: location.section,
      line_range: location.line_range,
      text_excerpt: location.text_excerpt
    })),
    suggested_resolution: defect.suggested_resolution
  });
}
function compareDefects(left, right) {
  const severityDelta = SEVERITY_ORDER[left.severity] - SEVERITY_ORDER[right.severity];
  if (severityDelta !== 0) return severityDelta;
  const lineDelta = (left.locations[0]?.line_range[0] ?? 0) - (right.locations[0]?.line_range[0] ?? 0);
  if (lineDelta !== 0) return lineDelta;
  return left.defect_id.localeCompare(right.defect_id);
}

// src/compliance/obligation-extractor.ts
init_esm_shims();
function extractObligationIndex(options) {
  const extractedAt = options.extracted_at ?? (/* @__PURE__ */ new Date()).toISOString();
  const warnings = [];
  const lines = splitLines(options.spec_markdown);
  const headings = parseHeadings(lines);
  const obligations = [];
  const seenIds = /* @__PURE__ */ new Set();
  const tables = extractRecognizedTables(lines);
  for (const row of tables.rows) {
    const sectionPath = buildHeadingPath(headings, row.line);
    const { category } = classifySection(sectionPath);
    const obligation = obligationFromTableRow(row, options.spec_file, sectionPath, category);
    if (!obligation) continue;
    if (seenIds.has(obligation.obligation_id)) {
      warnings.push(
        `Duplicate obligation_id "${obligation.obligation_id}" (table row at line ${row.line})`
      );
      continue;
    }
    seenIds.add(obligation.obligation_id);
    obligations.push(obligation);
  }
  const sectionItemCount = /* @__PURE__ */ new Map();
  for (const item of extractNumberedListItems(lines)) {
    const sectionPath = buildHeadingPath(headings, item.line);
    const { category } = classifySection(sectionPath);
    if (category !== "acceptance" || !isAcceptanceListSection(sectionPath)) {
      continue;
    }
    const count = (sectionItemCount.get(sectionPath) ?? 0) + 1;
    sectionItemCount.set(sectionPath, count);
    const generatedId = makeDeterministicGeneratedId(sectionPath, count);
    if (seenIds.has(generatedId)) {
      continue;
    }
    obligations.push({
      obligation_id: generatedId,
      category,
      description: normalizeCell(item.text),
      pass_criteria: null,
      source_section: sectionPath,
      source_line: item.line,
      spec_file: options.spec_file,
      affected_by_spec_defects: []
    });
    seenIds.add(generatedId);
  }
  for (const match of extractExplicitIds(lines, tables.table_lines)) {
    if (seenIds.has(match.id)) continue;
    const sectionPath = buildHeadingPath(headings, match.line);
    const { category } = classifySection(sectionPath);
    obligations.push({
      obligation_id: match.id,
      category,
      description: normalizeCell(match.text),
      pass_criteria: null,
      source_section: sectionPath,
      source_line: match.line,
      spec_file: options.spec_file,
      affected_by_spec_defects: []
    });
    seenIds.add(match.id);
  }
  if (obligations.length === 0) {
    warnings.push("No recognizable structured obligations found in spec.");
  }
  obligations.sort((left, right) => left.obligation_id.localeCompare(right.obligation_id));
  const linkedReview = options.spec_review ? attachSpecDefectsToObligations(options.spec_review, obligations) : null;
  const obligationsWithDefects = obligations.map((obligation) => ({
    ...obligation,
    affected_by_spec_defects: linkedReview === null ? [] : linkedReview.defects.filter((defect) => defect.affected_obligation_ids.includes(obligation.obligation_id)).map((defect) => defect.defect_id).sort((a, b) => a.localeCompare(b))
  }));
  return {
    metadata: {
      spec_file: options.spec_file,
      spec_hash: sha256Hex(options.spec_markdown),
      extracted_at: extractedAt,
      obligation_count: obligations.length,
      schema_version: COMPLIANCE_SCHEMA_VERSION,
      warnings
    },
    obligations: obligationsWithDefects
  };
}
function obligationFromTableRow(row, specFile, sectionPath, category) {
  if (row.cells.length < 2) return null;
  const normalizedCells = row.cells.map(normalizeCell);
  const headerCells = row.header_cells.map((cell) => cell.toLowerCase().trim());
  const [first, second, third, fourth] = normalizedCells;
  const obligationId = first || null;
  if (!obligationId) return null;
  const descriptionColumn = selectDescriptionColumn(headerCells, normalizedCells);
  const passCriteriaColumn = selectPassCriteriaColumn(headerCells, normalizedCells);
  const description = firstNonEmpty(descriptionColumn, second, third) ?? "";
  const passCriteria = firstNonEmpty(passCriteriaColumn, fourth);
  return {
    obligation_id: obligationId,
    category,
    description,
    pass_criteria: passCriteria,
    source_section: sectionPath,
    source_line: row.line,
    spec_file: specFile,
    affected_by_spec_defects: []
  };
}
function extractRecognizedTables(lines) {
  const rows = [];
  const tableLines = /* @__PURE__ */ new Set();
  for (let index = 0; index < lines.length; index += 1) {
    const headerLine = lines[index];
    if (!isTableRow(headerLine)) continue;
    const headerCells = parseTableRow(headerLine);
    const isRecognized = headerLooksLikeObligationTable(headerCells);
    if (!isRecognized) continue;
    const separatorLine = lines[index + 1];
    if (!separatorLine || !looksLikeTableSeparator(separatorLine)) continue;
    tableLines.add(index + 1);
    tableLines.add(index + 2);
    index += 2;
    while (index < lines.length) {
      const line = lines[index];
      if (!isTableRow(line)) break;
      const cells = parseTableRow(line);
      if (cells.every((cell) => cell.trim().length === 0)) {
        index += 1;
        continue;
      }
      rows.push({ cells, line: index + 1, header_cells: headerCells });
      tableLines.add(index + 1);
      index += 1;
    }
    index -= 1;
  }
  return { rows, table_lines: tableLines };
}
function headerLooksLikeObligationTable(cells) {
  const normalized = cells.map((cell) => cell.toLowerCase().trim());
  const joined = normalized.join(" | ");
  const hasId = /test id|obligation|id|#/.test(joined);
  const hasConditionOrCriterion = /condition|scenario|criterion|requirement|case|description|method/.test(joined);
  const hasPass = /pass criteria|expected|assert|measurement|result|outcome/.test(joined);
  return hasId && hasConditionOrCriterion && hasPass;
}
function isTableRow(line) {
  const trimmed = line.trim();
  return trimmed.startsWith("|") && trimmed.endsWith("|");
}
function looksLikeTableSeparator(line) {
  const trimmed = line.trim();
  return isTableRow(trimmed) && /^\|(?:\s*:?-+:?\s*\|)+$/.test(trimmed);
}
function parseTableRow(line) {
  const inner = line.trim().slice(1, -1);
  return inner.split("|").map((cell) => cell.trim());
}
function extractNumberedListItems(lines) {
  const items = [];
  let currentIndex = 0;
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];
    const match = /^\s*(\d+)\.\s+(.*\S)\s*$/.exec(line);
    if (!match) continue;
    currentIndex += 1;
    items.push({ index: currentIndex, line: lineIndex + 1, text: match[2] });
  }
  return items;
}
function extractExplicitIds(lines, excludedLines) {
  const matches = [];
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    if (excludedLines.has(lineIndex + 1)) continue;
    const line = lines[lineIndex];
    const id = extractLeadingExplicitId(line);
    if (!id) continue;
    matches.push({ id, line: lineIndex + 1, text: line });
  }
  return matches;
}
function isAcceptanceListSection(sectionPath) {
  return /(?:^|> )(?:\d+(?:\.\d+)*\.?\s*)?(acceptance criteria|definition of done|ac)\b/i.test(
    sectionPath
  );
}
function selectDescriptionColumn(headerCells, rowCells) {
  const descriptionIndex = headerCells.findIndex(
    (cell) => /condition|scenario|criterion|requirement|case|description|method/.test(cell)
  );
  if (descriptionIndex > 0) {
    return rowCells[descriptionIndex] || null;
  }
  return rowCells[1] || rowCells[2] || null;
}
function selectPassCriteriaColumn(headerCells, rowCells) {
  const passIndex = headerCells.findIndex(
    (cell) => /pass criteria|expected|assert|measurement|result|outcome/.test(cell)
  );
  if (passIndex > 0) {
    return rowCells[passIndex] || null;
  }
  return rowCells[2] || rowCells[3] || null;
}
function extractLeadingExplicitId(line) {
  const match = /^\s*(?:#{1,6}\s+|[-*+]\s+)?(?:\*\*)?(?<id>(?:FR|NFR)-\d+(?:\.\d+)?(?:-T\d+)?|AC-(?:TRACK-[A-Za-z0-9-]+|\d+)|EC-\d+(?:-T\d+)?)(?:\*\*)?(?=\b|:|\s)/.exec(
    line
  );
  if (match?.groups?.id) {
    return match.groups.id;
  }
  if (line.trim().startsWith("|")) {
    const rowMatch = /^\|\s*(?<id>(?:FR|NFR)-\d+(?:\.\d+)?(?:-T\d+)?|AC-\d+|EC-\d+(?:-T\d+)?)\s*\|/.exec(line);
    if (rowMatch?.groups?.id) {
      return rowMatch.groups.id;
    }
  }
  return null;
}
function firstNonEmpty(...values) {
  for (const value of values) {
    if (value && value.trim().length > 0) {
      return value;
    }
  }
  return null;
}

// src/core/errors/taxonomy.ts
init_esm_shims();
var ENGINE_ERROR_CODES = {
  MISSING_POLICY_CONTEXT: "MISSING_POLICY_CONTEXT",
  DUPLICATE_SKILL_IDENTIFIER: "DUPLICATE_SKILL_IDENTIFIER",
  DECISION_PACKET_CORRUPT: "DECISION_PACKET_CORRUPT",
  UNSUPPORTED_FILE_TYPE: "UNSUPPORTED_FILE_TYPE",
  VERSION_INCOMPATIBLE: "VERSION_INCOMPATIBLE",
  MANIFEST_PRODUCTION_TIMEOUT: "MANIFEST_PRODUCTION_TIMEOUT",
  WORKFLOW_ALREADY_RUNNING: "WORKFLOW_ALREADY_RUNNING",
  VECTOR_INDEX_STORAGE_ERROR: "VECTOR_INDEX_STORAGE_ERROR",
  CANCELLED_BY_CONSUMER: "CANCELLED_BY_CONSUMER",
  LOGGER_SINK_FAILED: "LOGGER_SINK_FAILED",
  UNKNOWN_ENGINE_ERROR: "UNKNOWN_ENGINE_ERROR"
};
var TAXONOMY = {
  MISSING_POLICY_CONTEXT: {
    code: "MISSING_POLICY_CONTEXT",
    description: "A policy lookup was required but no policy context was available.",
    retryable: false,
    payload_shape: { policy: "string" }
  },
  DUPLICATE_SKILL_IDENTIFIER: {
    code: "DUPLICATE_SKILL_IDENTIFIER",
    description: "A skill was registered under an identifier that is already in use.",
    retryable: false,
    payload_shape: { skill_id: "string" }
  },
  DECISION_PACKET_CORRUPT: {
    code: "DECISION_PACKET_CORRUPT",
    description: "A decision packet on disk could not be parsed or failed validation.",
    retryable: false,
    payload_shape: { decision_id: "string", reason: "string", packet_path: "string?" }
  },
  UNSUPPORTED_FILE_TYPE: {
    code: "UNSUPPORTED_FILE_TYPE",
    description: "A file was supplied whose type the engine does not support.",
    retryable: false,
    payload_shape: { path: "string", extension: "string" }
  },
  VERSION_INCOMPATIBLE: {
    code: "VERSION_INCOMPATIBLE",
    description: "The engine and consumer (or schema) versions are not compatible.",
    retryable: false,
    payload_shape: { found: "string", required: "string", kind: "string" }
  },
  MANIFEST_PRODUCTION_TIMEOUT: {
    code: "MANIFEST_PRODUCTION_TIMEOUT",
    description: "Producing the planning manifest exceeded its configured timeout.",
    retryable: true,
    payload_shape: { timeout_ms: "number" }
  },
  WORKFLOW_ALREADY_RUNNING: {
    code: "WORKFLOW_ALREADY_RUNNING",
    description: "A workflow run was requested while another holds the run lock.",
    retryable: false,
    payload_shape: { workflow: "string", run_id: "string?" }
  },
  VECTOR_INDEX_STORAGE_ERROR: {
    code: "VECTOR_INDEX_STORAGE_ERROR",
    description: "Persisting a vector index to disk failed.",
    retryable: true,
    payload_shape: { index: "string", reason: "string" }
  },
  CANCELLED_BY_CONSUMER: {
    code: "CANCELLED_BY_CONSUMER",
    description: "A long-running call was cancelled by the consumer via an AbortSignal.",
    retryable: false,
    payload_shape: { checkpoint_path: "string?" }
  },
  LOGGER_SINK_FAILED: {
    code: "LOGGER_SINK_FAILED",
    description: "A log sink failed to accept a log entry.",
    retryable: true,
    payload_shape: { sink: "string", reason: "string" }
  },
  UNKNOWN_ENGINE_ERROR: {
    code: "UNKNOWN_ENGINE_ERROR",
    description: "An undocumented failure the taxonomy does not yet name.",
    retryable: false,
    payload_shape: { message: "string?" }
  }
};
function listErrorTaxonomy() {
  return Object.values(TAXONOMY);
}
function getTaxonomyEntry(code) {
  return TAXONOMY[code];
}

// src/core/errors/engine-errors.ts
init_esm_shims();
var MissingPolicyContextError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.MISSING_POLICY_CONTEXT,
      details,
      retryable: false,
      projectRoot
    });
    this.name = "MissingPolicyContextError";
  }
};
var DuplicateSkillIdentifierError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.DUPLICATE_SKILL_IDENTIFIER,
      details,
      retryable: false,
      projectRoot
    });
    this.name = "DuplicateSkillIdentifierError";
  }
};
var DecisionPacketCorruptError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.DECISION_PACKET_CORRUPT,
      details,
      retryable: false,
      projectRoot
    });
    this.name = "DecisionPacketCorruptError";
  }
};
var UnsupportedFileTypeError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.UNSUPPORTED_FILE_TYPE,
      details,
      retryable: false,
      projectRoot
    });
    this.name = "UnsupportedFileTypeError";
  }
};
var VersionIncompatibleError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.VERSION_INCOMPATIBLE,
      details,
      retryable: false,
      projectRoot
    });
    this.name = "VersionIncompatibleError";
  }
};
var ManifestProductionTimeoutError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.MANIFEST_PRODUCTION_TIMEOUT,
      details,
      retryable: true,
      projectRoot
    });
    this.name = "ManifestProductionTimeoutError";
  }
};
var WorkflowAlreadyRunningError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.WORKFLOW_ALREADY_RUNNING,
      details,
      retryable: false,
      projectRoot
    });
    this.name = "WorkflowAlreadyRunningError";
  }
};
var VectorIndexStorageError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.VECTOR_INDEX_STORAGE_ERROR,
      details,
      retryable: true,
      projectRoot
    });
    this.name = "VectorIndexStorageError";
  }
};
var LoggerSinkFailedError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.LOGGER_SINK_FAILED,
      details,
      retryable: true,
      projectRoot
    });
    this.name = "LoggerSinkFailedError";
  }
};
var UnknownEngineError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.UNKNOWN_ENGINE_ERROR,
      details,
      retryable: false,
      projectRoot
    });
    this.name = "UnknownEngineError";
  }
};
function toEngineError(error) {
  if (error instanceof FrameworkError) {
    if (getTaxonomyEntry(error.code)) {
      return error;
    }
    engineLog("error", "Engine error code is not in the taxonomy; surfacing UNKNOWN_ENGINE_ERROR", {
      missing_code: error.code
    });
    return new UnknownEngineError(error.message, { message: error.message }, void 0);
  }
  const message = error instanceof Error ? error.message : String(error);
  return new UnknownEngineError(message, { message });
}
function isEngineErrorCode(code) {
  return getTaxonomyEntry(code) !== void 0;
}

// src/core/errors/resolution-error.ts
init_esm_shims();
var ResolutionError = class extends FrameworkError {
  constructor(message, details) {
    super(message, {
      code: "RESOLUTION_ERROR",
      details
    });
    this.name = "ResolutionError";
  }
};

// src/core/errors/schema-version-error.ts
init_esm_shims();
var SCHEMA_VERSION_UPDATE_HINT = "This project was set up by a newer paqad. Update paqad to open it: inside Claude Code run `claude plugin update paqad@eliyce`, otherwise `npm i -g paqad-ai@latest`.";
var SchemaVersionError = class extends FrameworkError {
  constructor(message, options = {}) {
    super(message, {
      code: options.code ?? "SCHEMA_VERSION_INCOMPATIBLE",
      cause: options.cause,
      details: options.details
    });
    this.name = "SchemaVersionError";
  }
};

// src/core/errors/skill-registration-error.ts
init_esm_shims();
var CODE_BY_KIND = {
  malformed: "SKILL_MALFORMED",
  duplicate: "SKILL_DUPLICATE",
  "not-found": "SKILL_NOT_FOUND",
  "built-in-protected": "SKILL_BUILTIN_PROTECTED"
};
var SkillRegistrationError = class extends FrameworkError {
  kind;
  builtInId;
  runtimeId;
  constructor(message, options) {
    super(message, {
      code: CODE_BY_KIND[options.kind],
      cause: options.cause,
      details: { kind: options.kind, builtInId: options.builtInId, runtimeId: options.runtimeId }
    });
    this.name = "SkillRegistrationError";
    this.kind = options.kind;
    this.builtInId = options.builtInId;
    this.runtimeId = options.runtimeId;
  }
};

// src/core/errors/validation-error.ts
init_esm_shims();
var ValidationError = class extends FrameworkError {
  subCode;
  constructor(message, details, subCode) {
    super(message, {
      code: "VALIDATION_ERROR",
      details
    });
    this.name = "ValidationError";
    this.subCode = subCode;
  }
};

// src/planning/decision-packet.ts
init_esm_shims();
var DECISION_CATEGORIES = [
  "component-reuse",
  "create-vs-reuse",
  "shared-abstraction",
  "ux-pattern",
  "architecture-path",
  "workflow-or-tool",
  "intake.requirement",
  "intake.confirm_auto_resolution",
  "intake.write_back",
  "delivery.open_pr",
  "delivery.ci_red",
  "spec.change",
  "spec.contradiction",
  "spec.expert_conflict",
  "fix.proof_method",
  "test.flaky_judgement",
  "finding.triage",
  "quality.ratchet_exception",
  "analytics.provider_version_mismatch",
  "analytics.taxonomy_violation",
  "analytics.pii_consent",
  "analytics.no_provider_flag",
  "analytics.architecture_conflict",
  "analytics.new_event"
];
var DECISION_STATUSES = [
  "pending",
  "resolved",
  "delegated",
  "expired",
  "superseded"
];
var STRICT_DECISION_ID = new RegExp(`^D-${ULID_BODY}$`, "u");
function isStrictDecisionId(id) {
  return STRICT_DECISION_ID.test(id);
}
var DECISION_INTENTS = [
  "explicit",
  "delegated",
  "safer-default",
  "safer-default-by-cap",
  "created-new"
];
var DECISION_CARRY_OVER_SCOPES = ["session", "task", "none"];
var DECISION_CATEGORY_DEFAULTS = {
  "component-reuse": { create_new: true, reversibility: "easy", ttl_days: 30 },
  "create-vs-reuse": { create_new: true, reversibility: "easy", ttl_days: 30 },
  "shared-abstraction": { create_new: true, reversibility: "moderate", ttl_days: 60 },
  "ux-pattern": { create_new: false, reversibility: "easy", ttl_days: 30 },
  "architecture-path": { create_new: false, reversibility: "hard", ttl_days: 90 },
  "workflow-or-tool": { create_new: false, reversibility: "easy", ttl_days: 7 },
  "intake.requirement": { create_new: true, reversibility: "easy", ttl_days: 14 },
  "intake.confirm_auto_resolution": { create_new: false, reversibility: "easy", ttl_days: 7 },
  "intake.write_back": { create_new: false, reversibility: "easy", ttl_days: 1 },
  "delivery.open_pr": { create_new: false, reversibility: "easy", ttl_days: 1 },
  "delivery.ci_red": { create_new: false, reversibility: "easy", ttl_days: 1 },
  "spec.change": { create_new: false, reversibility: "moderate", ttl_days: 30 },
  "spec.contradiction": { create_new: false, reversibility: "hard", ttl_days: 7 },
  "spec.expert_conflict": { create_new: false, reversibility: "moderate", ttl_days: 30 },
  "fix.proof_method": { create_new: false, reversibility: "moderate", ttl_days: 30 },
  "test.flaky_judgement": { create_new: false, reversibility: "moderate", ttl_days: 30 },
  "finding.triage": { create_new: false, reversibility: "moderate", ttl_days: 30 },
  "quality.ratchet_exception": { create_new: false, reversibility: "moderate", ttl_days: 30 },
  "analytics.provider_version_mismatch": {
    create_new: false,
    reversibility: "moderate",
    ttl_days: 30
  },
  "analytics.taxonomy_violation": { create_new: false, reversibility: "hard", ttl_days: 14 },
  "analytics.pii_consent": { create_new: false, reversibility: "hard", ttl_days: 7 },
  "analytics.no_provider_flag": { create_new: false, reversibility: "easy", ttl_days: 7 },
  "analytics.architecture_conflict": { create_new: false, reversibility: "moderate", ttl_days: 30 },
  "analytics.new_event": { create_new: true, reversibility: "hard", ttl_days: 14 }
};
function isDecisionPacket(value) {
  return validateDecisionPacket(value).length === 0;
}
function validateDecisionPacket(value) {
  if (typeof value !== "object" || value === null) {
    return ["packet must be an object"];
  }
  const packet = value;
  const errors = [];
  if (!/^D-(?:\d+|[0-9A-HJKMNP-TV-Z]{26})$/.test(packet.decision_id ?? "")) {
    errors.push("decision_id must match D-{id}");
  }
  if (typeof packet.fingerprint !== "string" || !packet.fingerprint.startsWith("sha256:")) {
    errors.push("fingerprint must be a sha256 string");
  }
  if (!DECISION_CATEGORIES.includes(packet.category)) {
    errors.push("category is invalid");
  }
  if (typeof packet.question !== "string" || packet.question.trim().length === 0) {
    errors.push("question is required");
  }
  if (typeof packet.context !== "string" || packet.context.trim().length === 0) {
    errors.push("context is required");
  }
  if (!Array.isArray(packet.options) || packet.options.length < 2 || packet.options.length > 5) {
    errors.push("options must contain 2 to 5 entries");
  } else {
    for (const [index, option] of packet.options.entries()) {
      errors.push(...validateDecisionOption(option, index));
    }
  }
  if (typeof packet.confidence !== "number" || packet.confidence < 0 || packet.confidence > 1) {
    errors.push("confidence must be between 0 and 1");
  }
  if (typeof packet.requested_by !== "string" || packet.requested_by.trim().length === 0) {
    errors.push("requested_by is required");
  }
  if (typeof packet.task_session_id !== "string" || packet.task_session_id.trim().length === 0) {
    errors.push("task_session_id is required");
  }
  if (!isIsoDate(packet.created_at)) {
    errors.push("created_at must be an ISO date");
  }
  if (!DECISION_STATUSES.includes(packet.status)) {
    errors.push("status is invalid");
  }
  if (!isIsoDate(packet.ttl_until)) {
    errors.push("ttl_until must be an ISO date");
  }
  if (!Array.isArray(packet.invalidation_watch) || packet.invalidation_watch.some((path) => typeof path !== "string")) {
    errors.push("invalidation_watch must be a string array");
  }
  if (packet.recommendation !== void 0 && packet.recommendation !== null) {
    if (typeof packet.recommendation !== "string" || !packet.options?.some((option) => option.option_key === packet.recommendation)) {
      errors.push("recommendation must reference an option_key");
    }
    if (packet.recommendation && (typeof packet.recommendation_reason !== "string" || packet.recommendation_reason.trim().length === 0)) {
      errors.push("recommendation_reason is required when recommendation is present");
    }
  }
  if (packet.human_response !== void 0) {
    errors.push(...validateHumanResponse(packet.human_response, packet.options ?? []));
  }
  return errors;
}
function toDecisionRecord(packet) {
  if (packet.status === "pending" || !packet.human_response || packet.human_response.chosen_option_key === null) {
    return null;
  }
  const chosenOption = packet.options.find(
    (option) => option.option_key === packet.human_response?.chosen_option_key
  );
  if (!chosenOption) {
    return null;
  }
  return {
    decision_id: packet.decision_id,
    choice: chosenOption.label,
    reason: packet.human_response.note?.trim() || chosenOption.trade_off,
    alternatives_rejected: packet.options.filter((option) => option.option_key !== chosenOption.option_key).map((option) => ({
      alternative: option.label,
      rejection_reason: option.trade_off
    })),
    /* v8 ignore start -- linked_requirements is always set in practice; ?? [] is a safety net */
    linked_requirements: packet.linked_requirements ?? [],
    /* v8 ignore stop */
    reversibility: DECISION_CATEGORY_DEFAULTS[packet.category].reversibility
  };
}
function validateDecisionOption(value, index) {
  if (typeof value !== "object" || value === null) {
    return [`options[${index}] must be an object`];
  }
  const option = value;
  const errors = [];
  if (typeof option.option_key !== "string" || option.option_key.trim().length === 0) {
    errors.push(`options[${index}].option_key is required`);
  }
  if (typeof option.label !== "string" || option.label.trim().length === 0) {
    errors.push(`options[${index}].label is required`);
  }
  if (typeof option.one_line_preview !== "string" || option.one_line_preview.trim().length === 0) {
    errors.push(`options[${index}].one_line_preview is required`);
  }
  if (typeof option.trade_off !== "string" || option.trade_off.trim().length === 0) {
    errors.push(`options[${index}].trade_off is required`);
  }
  errors.push(...validateDecisionEvidence(option.evidence, index));
  if (option.technical_detail !== void 0 && typeof option.technical_detail !== "string") {
    errors.push(`options[${index}].technical_detail must be a string`);
  }
  return errors;
}
function validateDecisionEvidence(value, index) {
  if (typeof value !== "object" || value === null) {
    return [`options[${index}].evidence must be an object`];
  }
  const evidence = value;
  const errors = [];
  if (evidence.file !== void 0 && typeof evidence.file !== "string") {
    errors.push(`options[${index}].evidence.file must be a string`);
  }
  if (evidence.last_modified !== void 0 && !isIsoDate(evidence.last_modified)) {
    errors.push(`options[${index}].evidence.last_modified must be an ISO date`);
  }
  if (evidence.callers !== void 0 && typeof evidence.callers !== "number") {
    errors.push(`options[${index}].evidence.callers must be a number`);
  }
  if (evidence.similarity !== void 0 && (typeof evidence.similarity !== "number" || evidence.similarity < 0 || evidence.similarity > 1)) {
    errors.push(`options[${index}].evidence.similarity must be between 0 and 1`);
  }
  if (evidence.rule_match !== void 0 && typeof evidence.rule_match !== "string") {
    errors.push(`options[${index}].evidence.rule_match must be a string`);
  }
  if (evidence.evidence_partial !== void 0 && typeof evidence.evidence_partial !== "boolean") {
    errors.push(`options[${index}].evidence.evidence_partial must be a boolean`);
  }
  if (evidence.findings !== void 0 && (!Array.isArray(evidence.findings) || evidence.findings.some((finding) => typeof finding !== "string"))) {
    errors.push(`options[${index}].evidence.findings must be a string array`);
  }
  return errors;
}
function validateHumanResponse(value, options) {
  if (typeof value !== "object" || value === null) {
    return ["human_response must be an object"];
  }
  const response = value;
  const errors = [];
  if (response.chosen_option_key !== null && response.chosen_option_key !== void 0 && (typeof response.chosen_option_key !== "string" || !options.some((option) => option.option_key === response.chosen_option_key))) {
    errors.push("human_response.chosen_option_key must reference an option_key");
  }
  if (!DECISION_INTENTS.includes(response.intent)) {
    errors.push("human_response.intent is invalid");
  }
  if (typeof response.explanation_rounds_used !== "number" || response.explanation_rounds_used < 0 || response.explanation_rounds_used > 3) {
    errors.push("human_response.explanation_rounds_used must be between 0 and 3");
  }
  if (!isIsoDate(response.responded_at)) {
    errors.push("human_response.responded_at must be an ISO date");
  }
  if (typeof response.responded_by !== "string" || response.responded_by.trim().length === 0) {
    errors.push("human_response.responded_by is required");
  }
  if (!DECISION_CARRY_OVER_SCOPES.includes(response.carry_over_scope)) {
    errors.push("human_response.carry_over_scope is invalid");
  }
  if (response.note !== void 0 && typeof response.note !== "string") {
    errors.push("human_response.note must be a string");
  }
  return errors;
}
function isIsoDate(value) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

// src/planning/decision-audit.ts
init_esm_shims();
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname as dirname2, join as join2 } from "path";
var DECISION_AUDIT_EVENTS = [
  "decision-pending-written",
  "decision-resolved-by-human",
  "decision-resolved-by-rule",
  "decision-resolved-by-memoization",
  "decision-resolved-by-rag-confident",
  "decision-reused",
  "decision-expired",
  "decision-superseded",
  "decision-delegated",
  "undeclared-decision-flagged",
  "decision-discarded"
];
function appendDecisionAuditEvent(projectRoot, event) {
  const path = join2(projectRoot, PATHS.DECISIONS_AUDIT_LOG);
  mkdirSync(dirname2(path), { recursive: true });
  appendFileSync(path, `${JSON.stringify(event)}
`);
  return path;
}
function ensureDecisionAuditLog(projectRoot) {
  const path = join2(projectRoot, PATHS.DECISIONS_AUDIT_LOG);
  mkdirSync(dirname2(path), { recursive: true });
  writeFileSync(path, "", { flag: "a" });
  return path;
}
function readDecisionAuditEvents(projectRoot) {
  const path = join2(projectRoot, PATHS.DECISIONS_AUDIT_LOG);
  if (!existsSync(path)) {
    return [];
  }
  return readFileSync(path, "utf8").split("\n").map((line) => line.trim()).filter(Boolean).map((line) => JSON.parse(line));
}

// src/planning/decision-events.ts
init_esm_shims();
var DECISION_PAUSE_EVENT_TYPES = [
  "decision-paused",
  "decision-resolved",
  "decision-packet-corrupt",
  "decision-cap-exceeded",
  "decision-discarded"
];
function isoNow() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
function toEventOption(option) {
  return {
    option_key: option.option_key,
    label: option.label,
    one_line_preview: option.one_line_preview,
    trade_off: option.trade_off,
    ...option.technical_detail !== void 0 ? { technical_detail: option.technical_detail } : {}
  };
}
function decisionPausedEvent(packet, packetPath2) {
  return {
    kind: "decision-paused",
    at: isoNow(),
    decisionId: packet.decision_id,
    category: packet.category,
    prompt: packet.question,
    question: packet.question,
    options: packet.options.map(toEventOption),
    recommendation: packet.recommendation ?? null,
    ...packet.recommendation_reason !== void 0 ? { recommendationReason: packet.recommendation_reason } : {},
    packetPath: packetPath2,
    ...packet.linked_slice_id !== void 0 ? { linkedSliceId: packet.linked_slice_id } : {}
  };
}
function decisionResolvedEvent(packet, resolver) {
  return {
    kind: "decision-resolved",
    at: isoNow(),
    decisionId: packet.decision_id,
    resolution: packet.status,
    chosenOptionKey: packet.human_response?.chosen_option_key ?? null,
    resolver,
    ...packet.human_response?.intent !== void 0 ? { intent: packet.human_response.intent } : {}
  };
}
function decisionPacketCorruptEvent(decisionId, reason) {
  return { kind: "decision-packet-corrupt", at: isoNow(), decisionId, reason };
}
function decisionCapExceededEvent(pendingCount, cap) {
  return { kind: "decision-cap-exceeded", at: isoNow(), pendingCount, cap };
}
function decisionDiscardedEvent(decisionId, reason) {
  return { kind: "decision-discarded", at: isoNow(), decisionId, reason };
}

// src/planning/decision-fingerprint.ts
init_esm_shims();
import { createHash } from "crypto";
var STOP_WORDS = /* @__PURE__ */ new Set([
  "a",
  "an",
  "and",
  "are",
  "for",
  "i",
  "is",
  "it",
  "of",
  "or",
  "should",
  "the",
  "this",
  "to",
  "we",
  "which",
  "you"
]);
var TOKEN_EQUIVALENTS = {
  choose: "choose",
  pick: "choose",
  use: "choose"
};
function computeDecisionFingerprint(input) {
  const payload = [
    input.category,
    normalizeDecisionQuestion(input.question),
    [...input.option_keys].sort().join("|"),
    buildRepoStateSignature(input.repo_state)
  ].join("::");
  return `sha256:${createHash("sha256").update(payload).digest("hex")}`;
}
function normalizeDecisionQuestion(value) {
  return tokenize3(value).map((token) => TOKEN_EQUIVALENTS[token] ?? token).filter((token) => !STOP_WORDS.has(token)).sort().join(" ");
}
function buildRepoStateSignature(input) {
  return JSON.stringify({
    active_capabilities: [...input.active_capabilities ?? []].sort(),
    packs: [...input.packs ?? []].sort(),
    stack: input.stack ?? null
  });
}
function scoreDecisionOptionOverlap(left, right) {
  const leftSet = new Set(left);
  const rightSet = new Set(right);
  const union = /* @__PURE__ */ new Set([...leftSet, ...rightSet]);
  if (union.size === 0) {
    return 1;
  }
  let intersection = 0;
  for (const value of leftSet) {
    if (rightSet.has(value)) {
      intersection += 1;
    }
  }
  return intersection / union.size;
}
function tokenize3(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/).filter(Boolean);
}

// src/planning/decision-copy.ts
init_esm_shims();
var BANNED_WORDS = [
  "abstraction",
  "polymorphic",
  "dry",
  "solid",
  "coupling",
  "cohesion",
  "encapsulation",
  "idiomatic",
  "refactor",
  "hoist",
  "monomorphic",
  "deterministic",
  "idempotent",
  "cardinality",
  "invariant",
  "predicate",
  "instantiation"
];
function lintDecisionCopy(packet) {
  const issues = [];
  if (wordCount(packet.question) > 15) {
    issues.push({ field: "question", message: "Question must be 15 words or fewer." });
  }
  if (!isGrade8Friendly(packet.question)) {
    issues.push({ field: "question", message: "Question must stay at grade-8 readability." });
  }
  checkBanned("question", packet.question, issues);
  if (packet.recommendation_reason) {
    checkBanned("recommendation_reason", packet.recommendation_reason, issues);
    if (!isGrade8Friendly(packet.recommendation_reason)) {
      issues.push({
        field: "recommendation_reason",
        message: "Recommendation reason must stay at grade-8 readability."
      });
    }
  }
  for (const [index, option] of packet.options.entries()) {
    const prefix = `options[${index}]`;
    const labelWords = wordCount(option.label);
    if (labelWords < 2 || labelWords > 5) {
      issues.push({ field: `${prefix}.label`, message: "Option label must be 2 to 5 words." });
    }
    if (!startsWithVerb(option.label)) {
      issues.push({ field: `${prefix}.label`, message: "Option label must start with a verb." });
    }
    if (!/^if you pick this,/i.test(option.one_line_preview)) {
      issues.push({
        field: `${prefix}.one_line_preview`,
        message: 'One-line preview must start with "If you pick this,".'
      });
    }
    if (!/^You give up:\s/i.test(option.trade_off)) {
      issues.push({
        field: `${prefix}.trade_off`,
        message: 'Trade-off must start with "You give up:".'
      });
    }
    checkBanned(`${prefix}.label`, option.label, issues);
    checkBanned(`${prefix}.one_line_preview`, option.one_line_preview, issues);
    checkBanned(`${prefix}.trade_off`, option.trade_off, issues);
    if (!isGrade8Friendly(option.label)) {
      issues.push({
        field: `${prefix}.label`,
        message: "Option label must stay at grade-8 readability."
      });
    }
  }
  return issues;
}
function checkBanned(field, value, issues) {
  const normalized = value.toLowerCase();
  for (const banned of BANNED_WORDS) {
    if (normalized.includes(banned)) {
      issues.push({ field, message: `Banned word "${banned}" is not allowed here.` });
    }
  }
}
function wordCount(value) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}
function isGrade8Friendly(value) {
  return value.split(/\s+/).filter(Boolean).every((word) => word.replace(/[^a-z]/gi, "").length <= 12);
}
function startsWithVerb(value) {
  return /^(Reuse|Make|Keep|Extract|Take|Use|Switch|Stay|Skip|Pick)\b/i.test(value.trim());
}

// src/planning/decision-store.ts
init_esm_shims();
import {
  existsSync as existsSync2,
  mkdirSync as mkdirSync2,
  readFileSync as readFileSync3,
  readdirSync as readdirSync2,
  renameSync,
  statSync,
  unlinkSync,
  writeFileSync as writeFileSync2
} from "fs";
import { basename, dirname as dirname3, join as join4, relative as relative2 } from "path";

// src/decision-reuse/index.ts
init_esm_shims();

// src/decision-reuse/types.ts
init_esm_shims();
var DECISION_REUSE_DOC_TYPE = "paqad.decision-reuse";
var DECISION_REUSE_SCHEMA_VERSION = 1;

// src/decision-reuse/schema.ts
init_esm_shims();
var import_ajv = __toESM(require_ajv(), 1);
var nullableString = { type: ["string", "null"] };
var DECISION_REUSE_SCHEMA = {
  $id: "paqad://schemas/decision-reuse.json",
  type: "object",
  additionalProperties: false,
  required: [
    "schema_version",
    "doc_type",
    "kind",
    "session_id",
    "conversation_ordinal",
    "ts",
    "adapter",
    "content_hash"
  ],
  properties: {
    schema_version: { type: "integer", const: 1 },
    doc_type: { const: DECISION_REUSE_DOC_TYPE },
    kind: { enum: ["open", "reuse"] },
    session_id: { type: "string", minLength: 1 },
    conversation_ordinal: { type: "integer", minimum: 1 },
    ts: { type: "string", minLength: 1 },
    adapter: { type: "string", minLength: 1 },
    decision_id: nullableString,
    category: nullableString,
    chosen_option_key: nullableString,
    match_kind: { type: ["string", "null"], enum: ["exact", "fingerprint", null] },
    source_path: nullableString,
    note: nullableString,
    content_hash: { type: "string", minLength: 1 }
  }
};
var ajv = new import_ajv.default({ allErrors: true, allowUnionTypes: true });
var compiled;
function validator() {
  if (!compiled) {
    compiled = ajv.compile(DECISION_REUSE_SCHEMA);
  }
  return compiled;
}
function validateDecisionReuseRow(row) {
  const validate = validator();
  if (validate(row)) {
    return [];
  }
  return (validate.errors ?? []).map(
    (error) => `${error.instancePath || "(root)"} ${error.message ?? "invalid"}`
  );
}

// src/decision-reuse/recorder.ts
init_esm_shims();
var APPEND_OPTS = (now) => ({
  schemaVersion: DECISION_REUSE_SCHEMA_VERSION,
  validate: (row) => validateDecisionReuseRow(row),
  now
});
function recordDecisionReuse(projectRoot, fields, ctx = {}) {
  try {
    const sessionId = resolveSessionId(projectRoot, ctx.sessionId);
    const adapter = ctx.adapter ?? "unknown";
    const ordinal = ensureUnit(projectRoot, sessionId, adapter, ctx.now);
    return appendSessionEvent(
      projectRoot,
      DECISION_REUSE_DOC_TYPE,
      sessionId,
      ordinal,
      {
        kind: "reuse",
        conversation_ordinal: ordinal,
        adapter,
        decision_id: fields.decisionId,
        category: fields.category ?? null,
        chosen_option_key: fields.chosenOptionKey ?? null,
        match_kind: fields.matchKind,
        source_path: fields.sourcePath ?? null,
        note: fields.note ?? null
      },
      APPEND_OPTS(ctx.now)
    );
  } catch {
    return null;
  }
}
function ensureUnit(projectRoot, sessionId, adapter, now) {
  const current = currentOrdinal(projectRoot, DECISION_REUSE_DOC_TYPE, sessionId);
  if (current > 0) {
    return current;
  }
  return openSessionDoc(
    projectRoot,
    DECISION_REUSE_DOC_TYPE,
    sessionId,
    { adapter },
    APPEND_OPTS(now)
  ).ordinal;
}

// src/planning/decision-ledger.ts
init_esm_shims();
var DECISION_EVIDENCE_DOC_TYPE = "decision-evidence";
var DECISION_EVIDENCE_SCHEMA_VERSION = 1;
function recordDecisionOpened(projectRoot, fields) {
  recordProjectEvent(
    projectRoot,
    DECISION_EVIDENCE_DOC_TYPE,
    {
      kind: "opened",
      decision_id: fields.decisionId,
      category: fields.category,
      title: fields.title,
      created_at: fields.createdAt
    },
    DECISION_EVIDENCE_SCHEMA_VERSION
  );
}
function recordDecisionResolved(projectRoot, decisionId, status, resolver) {
  recordProjectEvent(
    projectRoot,
    DECISION_EVIDENCE_DOC_TYPE,
    { kind: "resolved", decision_id: decisionId, status, resolver },
    DECISION_EVIDENCE_SCHEMA_VERSION
  );
}
function recordDecisionSuperseded(projectRoot, decisionId) {
  recordProjectEvent(
    projectRoot,
    DECISION_EVIDENCE_DOC_TYPE,
    { kind: "superseded", decision_id: decisionId },
    DECISION_EVIDENCE_SCHEMA_VERSION
  );
}
function recordDecisionDiscarded(projectRoot, decisionId, reason) {
  recordProjectEvent(
    projectRoot,
    DECISION_EVIDENCE_DOC_TYPE,
    { kind: "discarded", decision_id: decisionId, reason },
    DECISION_EVIDENCE_SCHEMA_VERSION
  );
}
function recordDecisionExpired(projectRoot, decisionId) {
  recordProjectEvent(
    projectRoot,
    DECISION_EVIDENCE_DOC_TYPE,
    { kind: "expired", decision_id: decisionId },
    DECISION_EVIDENCE_SCHEMA_VERSION
  );
}
function readDecisionEvidence(projectRoot) {
  const latest = /* @__PURE__ */ new Map();
  for (const row of readProjectEvents(projectRoot, DECISION_EVIDENCE_DOC_TYPE)) {
    const id = row.decision_id;
    const kind = row.kind;
    if (typeof id === "string" && typeof kind === "string") {
      latest.set(id, { kind, row });
    }
  }
  const pending = [];
  let resolvedCount = 0;
  let expiredCount = 0;
  for (const [id, { kind, row }] of latest) {
    if (kind === "opened") {
      const title = typeof row.title === "string" && row.title.length > 0 ? row.title : id;
      const createdAt = typeof row.created_at === "string" && row.created_at.length > 0 ? row.created_at : null;
      pending.push({ id, title, createdAt });
    } else if (kind === "resolved" || kind === "superseded") {
      resolvedCount += 1;
    } else if (kind === "expired") {
      expiredCount += 1;
    }
  }
  return { pending, resolvedCount, expiredCount };
}

// src/planning/decision-precedents.ts
init_esm_shims();
import { readdirSync, readFileSync as readFileSync2 } from "fs";
import { join as join3 } from "path";

// src/decisions/packet-shape.ts
init_esm_shims();
var DAY_MS = 24 * 60 * 60 * 1e3;
var REQUESTED_BY = "paqad-decision-cli";
function isDecisionCategory(value) {
  return DECISION_CATEGORIES.includes(value);
}
function richFieldsFor(packet) {
  if (!isDecisionCategory(packet.category)) return null;
  if (!Array.isArray(packet.options) || packet.options.length < 2 || packet.options.length > 5) {
    return null;
  }
  const createdMs = Date.parse(packet.created_at);
  const ttlDays = DECISION_CATEGORY_DEFAULTS[packet.category].ttl_days;
  const options = packet.options.map((option) => ({
    ...option,
    one_line_preview: option.one_line_preview ?? option.label,
    trade_off: option.trade_off ?? "Not stated when the decision was opened.",
    evidence: option.evidence ?? {}
  }));
  const fields = {
    decision_id: packet.id,
    fingerprint: computeDecisionFingerprint({
      category: packet.category,
      question: packet.title,
      option_keys: packet.options.map((option) => option.option_key),
      repo_state: {}
    }),
    question: packet.title,
    options,
    ...packet.recommendation ? { recommendation_reason: "Recommended by the agent that opened this decision." } : {},
    confidence: 1,
    requested_by: packet.origin ? `paqad-${packet.origin}` : REQUESTED_BY,
    task_session_id: packet.change ?? "no-active-change",
    status: packet.status,
    ttl_until: new Date((Number.isNaN(createdMs) ? 0 : createdMs) + ttlDays * DAY_MS).toISOString(),
    invalidation_watch: []
  };
  if (packet.status === "resolved" && typeof packet.chosen === "string") {
    fields.human_response = humanResponseFor(packet.chosen, packet.rationale, packet.resolved_at);
  }
  return fields;
}
function humanResponseFor(chosen, rationale, resolvedAt) {
  return {
    chosen_option_key: chosen,
    intent: "explicit",
    explanation_rounds_used: 0,
    responded_at: resolvedAt ?? (/* @__PURE__ */ new Date(0)).toISOString(),
    responded_by: "human",
    carry_over_scope: "task",
    ...rationale ? { note: rationale } : {}
  };
}
function readAnyDecisionPacket(value) {
  if (isDecisionPacket(value)) return value;
  if (typeof value !== "object" || value === null) return null;
  const candidate = value;
  if (typeof candidate.id !== "string" || typeof candidate.title !== "string" || typeof candidate.context !== "string" || typeof candidate.created_at !== "string" || candidate.status !== "pending" && candidate.status !== "resolved") {
    return null;
  }
  const rich = richFieldsFor(candidate);
  if (rich === null) return null;
  const upgraded = {
    ...candidate,
    ...rich,
    recommendation: candidate.recommendation ?? null
  };
  return isDecisionPacket(upgraded) ? upgraded : null;
}

// src/planning/decision-precedents.ts
var DEFAULT_PRECEDENT_LIMIT = 3;
var PRECEDENT_SCORE_FLOOR = 0.1;
var CATEGORY_WEIGHT = 0.5;
function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) {
    return 0;
  }
  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) {
      intersection++;
    }
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}
function scorePrecedent(query, packet) {
  const sameCategory = query.category === packet.category ? CATEGORY_WEIGHT : 0;
  const queryTokens = new Set(tokenize(`${query.question} ${query.context ?? ""}`));
  const packetTokens = new Set(tokenize(`${packet.question} ${packet.context}`));
  return sameCategory + (1 - CATEGORY_WEIGHT) * jaccard(queryTokens, packetTokens);
}
function chosenLabel(packet) {
  const key = packet.human_response?.chosen_option_key;
  if (!key) {
    return null;
  }
  return packet.options.find((option) => option.option_key === key)?.label ?? key;
}
function readResolvedPackets(projectRoot) {
  const dir = join3(projectRoot, PATHS.DECISIONS_RESOLVED_DIR);
  let files;
  try {
    files = readdirSync(dir);
  } catch {
    return [];
  }
  const packets = [];
  for (const file of files) {
    if (!file.endsWith(".json")) {
      continue;
    }
    try {
      const packet = readAnyDecisionPacket(
        JSON.parse(readFileSync2(join3(dir, file), "utf8"))
      );
      if (packet) {
        packets.push(packet);
      }
    } catch {
    }
  }
  return packets;
}
function findDecisionPrecedents(projectRoot, query, options = {}) {
  const limit = options.limit ?? DEFAULT_PRECEDENT_LIMIT;
  const floor = options.floor ?? PRECEDENT_SCORE_FLOOR;
  const candidates = readResolvedPackets(projectRoot).filter(
    (packet) => packet.decision_id !== query.decision_id && (!query.fingerprint || packet.fingerprint !== query.fingerprint) && (packet.status === "resolved" || packet.status === "delegated") && Boolean(packet.human_response?.chosen_option_key)
  );
  return candidates.map((packet) => ({ packet, score: scorePrecedent(query, packet) })).filter((entry) => entry.score >= floor).sort(
    (a, b) => b.score !== a.score ? b.score - a.score : a.packet.decision_id < b.packet.decision_id ? -1 : 1
  ).slice(0, limit).map(({ packet, score }) => ({
    decision_id: packet.decision_id,
    category: packet.category,
    question: packet.question,
    chosen: chosenLabel(packet),
    rationale: packet.human_response?.note?.trim() || void 0,
    resolved_at: packet.human_response?.responded_at,
    score
  }));
}
var PRECEDENT_BLOCK_HEADING = "Similar past decisions you already resolved:";
function formatDecisionPrecedents(precedents) {
  if (precedents.length === 0) {
    return "";
  }
  const lines = precedents.map((precedent) => {
    const choice = precedent.chosen ?? "no choice recorded";
    const why = precedent.rationale ? ` \u2014 ${precedent.rationale}` : "";
    return `- [${precedent.category}] "${precedent.question}" \u2192 ${choice}${why}`;
  });
  return `${PRECEDENT_BLOCK_HEADING}
${lines.join("\n")}`;
}

// src/planning/decision-store.ts
var MAX_PENDING_DECISIONS = 20;
var DecisionCapExceededError = class extends Error {
  constructor(pendingCount, cap) {
    super(`Pending decision cap reached (${pendingCount}/${cap}).`);
    this.pendingCount = pendingCount;
    this.cap = cap;
    this.name = "DecisionCapExceededError";
  }
  pendingCount;
  cap;
};
var DecisionStore = class {
  constructor(projectRoot, options = {}) {
    this.projectRoot = projectRoot;
    this.onEvent = options.onEvent;
  }
  projectRoot;
  onEvent;
  initialize() {
    for (const relativePath of [
      PATHS.DECISIONS_PENDING_DIR,
      PATHS.DECISIONS_RESOLVED_DIR,
      PATHS.DECISIONS_EXPIRED_DIR
    ]) {
      const dir = join4(this.projectRoot, relativePath);
      mkdirSync2(dir, { recursive: true });
      writeFileSync2(join4(dir, ".gitkeep"), "", { flag: "a" });
    }
    ensureDecisionAuditLog(this.projectRoot);
    if (!existsSync2(this.indexPath())) {
      this.writeIndex({ fingerprints: {}, decisions: {} });
    }
  }
  nextDecisionId() {
    return `D-${ulid()}`;
  }
  writePending(packet) {
    this.initialize();
    const existingTaskPending = this.findPendingDecisionForTask(packet.task_session_id);
    if (existingTaskPending && existingTaskPending !== packet.decision_id) {
      throw new Error(
        `Task ${packet.task_session_id} already has a pending decision (${existingTaskPending}).`
      );
    }
    this.enforcePendingCap(packet.decision_id);
    this.assertWritablePacket(packet);
    const enriched = this.enrichWithPrecedents(packet);
    const path = this.packetPath(PATHS.DECISIONS_PENDING_DIR, enriched.decision_id);
    atomicWriteJson(path, enriched);
    this.appendAudit("decision-pending-written", enriched);
    recordDecisionOpened(this.projectRoot, {
      decisionId: enriched.decision_id,
      category: enriched.category,
      title: enriched.question,
      createdAt: enriched.created_at
    });
    this.emit(decisionPausedEvent(enriched, this.relativePendingPath(enriched.decision_id)));
    return path;
  }
  enrichWithPrecedents(packet) {
    if (packet.context.includes(PRECEDENT_BLOCK_HEADING)) {
      return packet;
    }
    try {
      const precedents = findDecisionPrecedents(this.projectRoot, {
        decision_id: packet.decision_id,
        fingerprint: packet.fingerprint,
        category: packet.category,
        question: packet.question,
        context: packet.context
      });
      const block = formatDecisionPrecedents(precedents);
      return block ? { ...packet, context: `${packet.context}

${block}` } : packet;
    } catch {
      return packet;
    }
  }
  enforcePendingCap(decisionId) {
    const cap = this.maxPendingDecisions();
    const pendingCount = this.listPendingDecisionIds().filter((id) => id !== decisionId).length;
    if (pendingCount >= cap) {
      this.emit(decisionCapExceededEvent(pendingCount, cap));
      throw new DecisionCapExceededError(pendingCount, cap);
    }
  }
  maxPendingDecisions() {
    const configured = readProjectProfile(this.projectRoot)?.custom?.decisions?.max_pending;
    return typeof configured === "number" && configured > 0 ? configured : MAX_PENDING_DECISIONS;
  }
  discard(input) {
    this.initialize();
    const result = this.readPendingResult(input.decisionId);
    if (!result.packet) {
      throw new Error(
        `Cannot discard decision ${input.decisionId}: no valid pending packet${result.error ? ` (${result.error})` : ""}.`
      );
    }
    const packet = result.packet;
    this.deletePending(input.decisionId);
    this.appendAudit("decision-discarded", packet);
    recordDecisionDiscarded(this.projectRoot, packet.decision_id, input.reason);
    this.emit(decisionDiscardedEvent(packet.decision_id, input.reason));
    return packet;
  }
  emit(event) {
    this.onEvent?.(event);
  }
  relativePendingPath(decisionId) {
    return `${PATHS.DECISIONS_PENDING_DIR}/${decisionId}.json`;
  }
  resolve(input) {
    const pending = this.readPending(input.decisionId);
    if (!pending) {
      throw new Error(`Pending decision ${input.decisionId} not found.`);
    }
    const resolved = this.writeResolvedPacket({
      packet: pending,
      humanResponse: input.humanResponse,
      event: input.humanResponse.intent === "delegated" ? "decision-delegated" : "decision-resolved-by-human",
      respondedByProvider: input.respondedByProvider
    });
    unlinkSync(this.packetPath(PATHS.DECISIONS_PENDING_DIR, input.decisionId));
    return this.packetPath(PATHS.DECISIONS_RESOLVED_DIR, resolved.decision_id);
  }
  resolveExisting(input) {
    const resolved = this.writeResolvedPacket(input);
    return this.packetPath(PATHS.DECISIONS_RESOLVED_DIR, resolved.decision_id);
  }
  deferUndeclaredDecision(input) {
    const path = this.writePending(input.packet);
    this.appendAudit("undeclared-decision-flagged", input.packet, input.provider);
    return path;
  }
  findReusableDecision(packet) {
    const index = this.readIndex();
    const exactDecisionId = index.fingerprints[packet.fingerprint];
    if (exactDecisionId) {
      const exactMatch = this.readReusableDecision(exactDecisionId);
      if (exactMatch) {
        this.appendAudit("decision-reused", exactMatch);
        this.recordReuseToLedger(exactMatch, "exact");
        return exactDecisionId;
      }
      delete index.fingerprints[packet.fingerprint];
      this.writeIndex(index);
    }
    const packetOptionKeys = packet.options.map((option) => option.option_key);
    let bestMatch = null;
    for (const entry of Object.values(index.decisions)) {
      if (entry.category !== packet.category || entry.chosen_option_key === null) {
        continue;
      }
      if (!packetOptionKeys.includes(entry.chosen_option_key)) {
        continue;
      }
      const resolved = this.readReusableDecision(entry.decision_id);
      if (!resolved) {
        continue;
      }
      const score = scoreDecisionOptionOverlap(packetOptionKeys, entry.option_keys);
      if (score >= 0.8 && (bestMatch === null || score > bestMatch.score)) {
        bestMatch = { id: entry.decision_id, score };
      }
    }
    if (bestMatch) {
      const resolved = this.readResolved(bestMatch.id);
      if (resolved) {
        this.appendAudit("decision-reused", resolved);
        this.recordReuseToLedger(resolved, "fingerprint");
      }
    }
    return bestMatch?.id ?? null;
  }
  recordReuseToLedger(packet, matchKind) {
    recordDecisionReuse(
      this.projectRoot,
      {
        decisionId: packet.decision_id,
        category: packet.category,
        chosenOptionKey: packet.human_response?.chosen_option_key ?? null,
        matchKind,
        sourcePath: join4(PATHS.DECISIONS_RESOLVED_DIR, `${packet.decision_id}.json`)
      },
      {}
    );
  }
  readPending(decisionId) {
    return this.readPacket(this.packetPath(PATHS.DECISIONS_PENDING_DIR, decisionId));
  }
  readPendingResult(decisionId) {
    const path = this.packetPath(PATHS.DECISIONS_PENDING_DIR, decisionId);
    if (!existsSync2(path)) {
      return { packet: null };
    }
    try {
      return { packet: this.readPacket(path) };
    } catch (error) {
      return {
        packet: null,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
  readResolved(decisionId) {
    return this.readPacket(this.packetPath(PATHS.DECISIONS_RESOLVED_DIR, decisionId));
  }
  deletePending(decisionId) {
    const path = this.packetPath(PATHS.DECISIONS_PENDING_DIR, decisionId);
    if (existsSync2(path)) {
      unlinkSync(path);
    }
  }
  listPendingDecisionIds() {
    return this.listDirectoryIds(PATHS.DECISIONS_PENDING_DIR).sort(
      (left, right) => left.localeCompare(right, void 0, { numeric: true })
    );
  }
  findPendingDecisionForTask(taskSessionId) {
    for (const decisionId of this.listPendingDecisionIds()) {
      const result = this.readPendingResult(decisionId);
      if (result.packet?.task_session_id === taskSessionId) {
        return decisionId;
      }
    }
    return null;
  }
  expireResolvedDecision(decisionId) {
    const source = this.packetPath(PATHS.DECISIONS_RESOLVED_DIR, decisionId);
    const target = this.packetPath(PATHS.DECISIONS_EXPIRED_DIR, decisionId);
    const packet = this.readResolved(decisionId);
    if (!packet) {
      throw new Error(`Resolved decision ${decisionId} not found.`);
    }
    const expired = { ...packet, status: "expired" };
    atomicWriteJson(target, expired);
    unlinkSync(source);
    const index = this.readIndex();
    if (index.fingerprints[packet.fingerprint] === decisionId) {
      delete index.fingerprints[packet.fingerprint];
    }
    if (index.decisions[decisionId]) {
      index.decisions[decisionId] = { ...index.decisions[decisionId], status: "expired" };
    }
    this.writeIndex(index);
    this.appendAudit("decision-expired", expired);
    recordDecisionExpired(this.projectRoot, expired.decision_id);
    return target;
  }
  hasInvalidation(packet) {
    if (!packet.human_response?.responded_at) {
      return false;
    }
    const respondedAt = new Date(packet.human_response.responded_at).getTime();
    return packet.invalidation_watch.some((path) => {
      const absolute = join4(this.projectRoot, path);
      return existsSync2(absolute) && statSync(absolute).mtimeMs > respondedAt;
    });
  }
  readPacket(path) {
    if (!existsSync2(path)) {
      return null;
    }
    const parsed = JSON.parse(readFileSync3(path, "utf8"));
    const packet = readAnyDecisionPacket(parsed);
    if (packet === null) {
      const reasons = validateDecisionPacket(parsed).join("; ");
      const decisionId = typeof parsed?.decision_id === "string" ? parsed.decision_id : basename(path).replace(/\.json$/, "");
      throw new DecisionPacketCorruptError(`Decision packet at ${path} is invalid. ${reasons}`, {
        decision_id: decisionId,
        reason: reasons,
        packet_path: relative2(this.projectRoot, path)
      });
    }
    return packet;
  }
  readReusableDecision(decisionId) {
    const packet = this.readResolved(decisionId);
    if (!packet) {
      return null;
    }
    if (packet.status !== "resolved" && packet.status !== "delegated") {
      return null;
    }
    if (packet.human_response?.chosen_option_key === null) {
      return null;
    }
    if (isExpired(packet)) {
      this.expireResolvedDecision(decisionId);
      return null;
    }
    if (this.hasInvalidation(packet)) {
      this.expireResolvedDecision(decisionId);
      return null;
    }
    return packet;
  }
  assertWritablePacket(packet) {
    const validationErrors = validateDecisionPacket(packet);
    if (validationErrors.length > 0) {
      throw new Error(
        `Decision packet ${packet.decision_id} is invalid: ${validationErrors.join("; ")}`
      );
    }
    if (!isStrictDecisionId(packet.decision_id)) {
      throw new Error(
        `Decision id "${packet.decision_id}" must be the collision-free D-<ULID> form on creation (mint it via DecisionStore.nextDecisionId / the decision skill; never hand-write a sequential D-{N}).`
      );
    }
    const copyIssues = lintDecisionCopy(packet);
    if (copyIssues.length > 0) {
      throw new Error(
        `Decision packet ${packet.decision_id} failed copy lint: ${copyIssues.map((issue) => `${issue.field} ${issue.message}`).join("; ")}`
      );
    }
  }
  appendAudit(event, packet, provider = packet.requested_by) {
    appendDecisionAuditEvent(this.projectRoot, {
      event,
      decision_id: packet.decision_id,
      fingerprint: packet.fingerprint,
      task_session_id: packet.task_session_id,
      provider,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      category: packet.category,
      responded_by: packet.human_response?.responded_by,
      chosen_option_key: packet.human_response?.chosen_option_key ?? null,
      intent: packet.human_response?.intent
    });
  }
  readIndex() {
    this.initialize();
    return JSON.parse(readFileSync3(this.indexPath(), "utf8"));
  }
  writeIndex(index) {
    atomicWriteJson(this.indexPath(), index);
  }
  indexPath() {
    return join4(this.projectRoot, PATHS.DECISIONS_INDEX);
  }
  packetPath(root, decisionId) {
    return join4(this.projectRoot, root, `${decisionId}.json`);
  }
  listDirectoryIds(relativeDir) {
    const absoluteDir = join4(this.projectRoot, relativeDir);
    if (!existsSync2(absoluteDir)) {
      return [];
    }
    return readdirSync2(absoluteDir).filter((file) => /^D-(?:\d+|[0-9A-HJKMNP-TV-Z]{26})\.json$/.test(file)).map((file) => file.replace(/\.json$/, ""));
  }
  writeResolvedPacket(input) {
    const resolved = {
      ...input.packet,
      status: input.humanResponse.intent === "delegated" ? "delegated" : "resolved",
      human_response: input.humanResponse
    };
    const resolvedPath = this.packetPath(PATHS.DECISIONS_RESOLVED_DIR, resolved.decision_id);
    this.supersedeConflictingDecision(resolved);
    atomicWriteJson(resolvedPath, resolved);
    const index = this.readIndex();
    index.fingerprints[resolved.fingerprint] = resolved.decision_id;
    index.decisions[resolved.decision_id] = {
      decision_id: resolved.decision_id,
      fingerprint: resolved.fingerprint,
      category: resolved.category,
      chosen_option_key: resolved.human_response?.chosen_option_key ?? null,
      responded_at: resolved.human_response?.responded_at ?? resolved.created_at,
      status: resolved.status,
      option_keys: resolved.options.map((option) => option.option_key).sort()
    };
    this.writeIndex(index);
    this.appendAudit(input.event, resolved, input.respondedByProvider);
    recordDecisionResolved(
      this.projectRoot,
      resolved.decision_id,
      resolved.status,
      resolverFromAuditEvent(input.event)
    );
    this.emit(decisionResolvedEvent(resolved, resolverFromAuditEvent(input.event)));
    return resolved;
  }
  supersedeConflictingDecision(packet) {
    const index = this.readIndex();
    const existingDecisionId = index.fingerprints[packet.fingerprint];
    if (!existingDecisionId || existingDecisionId === packet.decision_id) {
      return;
    }
    const existing = this.readResolved(existingDecisionId);
    if (!existing) {
      return;
    }
    if (existing.human_response?.chosen_option_key === packet.human_response?.chosen_option_key) {
      return;
    }
    const superseded = { ...existing, status: "superseded" };
    atomicWriteJson(this.packetPath(PATHS.DECISIONS_RESOLVED_DIR, existingDecisionId), superseded);
    index.decisions[existingDecisionId] = {
      ...index.decisions[existingDecisionId],
      status: "superseded"
    };
    this.writeIndex(index);
    this.appendAudit("decision-superseded", superseded);
    recordDecisionSuperseded(this.projectRoot, existingDecisionId);
  }
};
function atomicWriteJson(path, value) {
  mkdirSync2(dirname3(path), { recursive: true });
  const tempPath = `${path}.tmp`;
  writeFileSync2(tempPath, JSON.stringify(value, null, 2) + "\n");
  renameSync(tempPath, path);
}
function isExpired(packet) {
  return Date.parse(packet.ttl_until) <= Date.now();
}
function resolverFromAuditEvent(event) {
  switch (event) {
    case "decision-resolved-by-human":
    case "decision-delegated":
      return "human";
    case "decision-resolved-by-rule":
      return "rule";
    case "decision-resolved-by-rag-confident":
      return "rag-confident";
    case "decision-resolved-by-memoization":
      return "memoization";
    default:
      return event;
  }
}

// src/decisions/authoring.ts
init_esm_shims();
import {
  existsSync as existsSync3,
  mkdirSync as mkdirSync3,
  readFileSync as readFileSync4,
  readdirSync as readdirSync3,
  unlinkSync as unlinkSync2,
  writeFileSync as writeFileSync3
} from "fs";
import { dirname as dirname4, join as join5 } from "path";
function mintDecisionId() {
  return `D-${ulid()}`;
}
function isContractDecisionId(id) {
  return isStrictDecisionId(id);
}
function assertContractDecisionId(id) {
  if (!isContractDecisionId(id)) {
    throw new Error(
      `Decision id "${id}" must be the collision-free D-<ULID> form. Mint one with mintDecisionId() (never hand-write a sequential D-{N}).`
    );
  }
}
function validateCreateInput(input) {
  const errors = [];
  if (input.category.trim().length === 0) {
    errors.push("category is required");
  }
  if (input.title.trim().length === 0) {
    errors.push("title is required");
  }
  if (input.context.trim().length === 0) {
    errors.push("context is required");
  }
  if (!Array.isArray(input.options) || input.options.length < 2) {
    errors.push("at least 2 options are required");
  } else {
    const seen = /* @__PURE__ */ new Set();
    for (const [index, option] of input.options.entries()) {
      if (typeof option?.option_key !== "string" || option.option_key.trim().length === 0) {
        errors.push(`options[${index}].option_key is required`);
        continue;
      }
      if (typeof option.label !== "string" || option.label.trim().length === 0) {
        errors.push(`options[${index}].label is required`);
      }
      if (seen.has(option.option_key)) {
        errors.push(`options[${index}].option_key "${option.option_key}" is duplicated`);
      }
      seen.add(option.option_key);
    }
  }
  if (input.recommendation !== void 0 && input.recommendation !== null && !input.options?.some((option) => option.option_key === input.recommendation)) {
    errors.push("recommendation must reference an option_key");
  }
  return errors;
}
function createPendingDecision(projectRoot, input) {
  const errors = validateCreateInput(input);
  if (errors.length > 0) {
    throw new Error(`Cannot create decision packet: ${errors.join("; ")}`);
  }
  const id = mintDecisionId();
  const packet = {
    id,
    category: input.category,
    title: input.title,
    context: input.context,
    options: input.options.map(contractOption),
    recommendation: input.recommendation ?? null,
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    status: "pending",
    ...input.origin !== void 0 ? { origin: input.origin } : {},
    ...input.change ? { change: input.change } : {}
  };
  const path = packetPath(projectRoot, PATHS.DECISIONS_PENDING_DIR, id);
  atomicWriteJson2(path, withRichFields(packet));
  return { id, path };
}
function resolvePendingDecision(projectRoot, id, chosen, rationale = "", options = {}) {
  assertContractDecisionId(id);
  const pendingPath = packetPath(projectRoot, PATHS.DECISIONS_PENDING_DIR, id);
  if (!existsSync3(pendingPath)) {
    throw new Error(`Pending decision ${id} not found at ${pendingPath}.`);
  }
  const stored = JSON.parse(readFileSync4(pendingPath, "utf8"));
  if (stored.id === void 0 && stored.decision_id !== void 0) {
    return resolveStorePacket(projectRoot, id, stored, chosen, rationale);
  }
  const pending = stored;
  if (!pending.options?.some((option) => option.option_key === chosen)) {
    const keys = pending.options?.map((option) => option.option_key).join(", ") ?? "";
    throw new Error(`Chosen option "${chosen}" is not one of the packet's options (${keys}).`);
  }
  const resolved = {
    ...pending,
    ...pending.change === void 0 && options.change ? { change: options.change } : {},
    status: "resolved",
    chosen,
    rationale,
    resolved_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  const resolvedPath = packetPath(projectRoot, PATHS.DECISIONS_RESOLVED_DIR, id);
  atomicWriteJson2(resolvedPath, withRichFields(resolved));
  unlinkSync2(pendingPath);
  return { path: resolvedPath, packet: resolved };
}
function resolveStorePacket(projectRoot, id, stored, chosen, rationale) {
  if (!stored.options?.some((option) => option.option_key === chosen)) {
    const keys = stored.options?.map((option) => option.option_key).join(", ") ?? "";
    throw new Error(`Chosen option "${chosen}" is not one of the packet's options (${keys}).`);
  }
  const resolvedAt = (/* @__PURE__ */ new Date()).toISOString();
  const path = new DecisionStore(projectRoot).resolve({
    decisionId: id,
    humanResponse: {
      chosen_option_key: chosen,
      intent: "explicit",
      explanation_rounds_used: 0,
      responded_at: resolvedAt,
      responded_by: "paqad-decision-cli",
      carry_over_scope: "session",
      ...rationale ? { note: rationale } : {}
    }
  });
  return {
    path,
    packet: {
      id,
      category: stored.category ?? "",
      title: stored.question ?? "",
      context: stored.context ?? "",
      options: stored.options,
      recommendation: stored.recommendation ?? null,
      created_at: stored.created_at ?? resolvedAt,
      status: "resolved",
      chosen,
      rationale,
      resolved_at: resolvedAt
    }
  };
}
function withRichFields(packet) {
  const contractOnly = { ...packet, options: packet.options.map(contractOption) };
  for (const key of RICH_ONLY_KEYS) delete contractOnly[key];
  const rich = richFieldsFor(contractOnly);
  return rich === null ? contractOnly : { ...contractOnly, ...rich };
}
var RICH_ONLY_KEYS = [
  "decision_id",
  "fingerprint",
  "question",
  "recommendation_reason",
  "confidence",
  "requested_by",
  "task_session_id",
  "ttl_until",
  "invalidation_watch",
  "human_response"
];
function contractOption(option) {
  return {
    option_key: option.option_key,
    label: option.label,
    ...option.one_line_preview ? { one_line_preview: option.one_line_preview } : {},
    ...option.trade_off ? { trade_off: option.trade_off } : {},
    ...option.evidence !== void 0 ? { evidence: option.evidence } : {}
  };
}
function readContractDecisions(projectRoot) {
  const rows = [];
  const sources = [
    [PATHS.DECISIONS_PENDING_DIR, "pending"],
    [PATHS.DECISIONS_RESOLVED_DIR, "resolved"]
  ];
  for (const [relativeDir, status] of sources) {
    const abs = join5(projectRoot, relativeDir);
    let files;
    try {
      files = readdirSync3(abs);
    } catch {
      continue;
    }
    for (const file of files.filter((name) => name.endsWith(".json")).sort()) {
      try {
        const packet = JSON.parse(readFileSync4(join5(abs, file), "utf8"));
        rows.push({ packet, status });
      } catch {
      }
    }
  }
  return rows;
}
function listContractDecisions(projectRoot) {
  return readContractDecisions(projectRoot).map(({ packet, status }) => ({
    id: packet.id,
    category: packet.category,
    title: packet.title,
    status
  }));
}
function addWriteInOption(projectRoot, id, label) {
  assertContractDecisionId(id);
  if (label.trim().length === 0) {
    throw new Error("A write-in option needs a non-empty label.");
  }
  const pendingPath = packetPath(projectRoot, PATHS.DECISIONS_PENDING_DIR, id);
  if (!existsSync3(pendingPath)) {
    throw new Error(`Pending decision ${id} not found at ${pendingPath}.`);
  }
  const pending = JSON.parse(readFileSync4(pendingPath, "utf8"));
  const existing = new Set(pending.options.map((option) => option.option_key));
  let key = "other";
  let suffix = 2;
  while (existing.has(key)) {
    key = `other-${suffix++}`;
  }
  pending.options = [...pending.options, { option_key: key, label }];
  atomicWriteJson2(pendingPath, withRichFields(pending));
  return key;
}
function packetPath(projectRoot, relativeDir, id) {
  return join5(projectRoot, relativeDir, `${id}.json`);
}
function atomicWriteJson2(path, value) {
  mkdirSync3(dirname4(path), { recursive: true });
  const tempPath = `${path}.tmp`;
  writeFileSync3(tempPath, `${JSON.stringify(value, null, 2)}
`);
  renameWithRetrySync(tempPath, path);
}

// src/onboarding/manifest-writer.ts
init_esm_shims();
import { existsSync as existsSync4, mkdirSync as mkdirSync4, readFileSync as readFileSync5, writeFileSync as writeFileSync4 } from "fs";
import { homedir } from "os";
import { dirname as dirname5, join as join6, relative as relative3, sep } from "path";

// src/core/errors/index.ts
init_esm_shims();

// src/onboarding/manifest-writer.ts
function writeProjectProfile2(projectRoot, profile) {
  return writeProjectProfile(projectRoot, profile);
}
function writeDetectionReport(projectRoot, report) {
  const path = join6(projectRoot, PATHS.DETECTION_REPORT);
  mkdirSync4(dirname5(path), { recursive: true });
  const sanitized = sanitizeDetectionReport(projectRoot, report);
  writeJsonPreservingTimestamp(path, sanitized, "timestamp");
  return path;
}
function writeFrameworkMetadata(projectRoot, version) {
  mkdirSync4(dirname5(join6(projectRoot, PATHS.FRAMEWORK_VERSION)), {
    recursive: true
  });
  writeFrameworkVersionPreservingTimestamp(
    join6(projectRoot, PATHS.FRAMEWORK_VERSION),
    version,
    (/* @__PURE__ */ new Date()).toISOString()
  );
  writeFileSync4(join6(projectRoot, PATHS.FRAMEWORK_PATH), `${resolveFrameworkInstallReference()}
`);
}
function readExistingOnboardingManifest(projectRoot) {
  const path = join6(projectRoot, PATHS.ONBOARDING_MANIFEST);
  if (!existsSync4(path)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync5(path, "utf8"));
  } catch (error) {
    throw new FrameworkError(
      "Project registry corrupted \u2014 the onboarding manifest is not valid JSON. Contact support.",
      {
        code: "REGISTRY_CORRUPTED",
        cause: error,
        details: { manifest_path: PATHS.ONBOARDING_MANIFEST }
      }
    );
  }
}
function writeOnboardingManifest(projectRoot, manifest) {
  const path = join6(projectRoot, PATHS.ONBOARDING_MANIFEST);
  mkdirSync4(dirname5(path), { recursive: true });
  const sanitized = sanitizeOnboardingManifest(projectRoot, manifest);
  writeJsonPreservingTimestamp(path, sanitized, ["generated_at", "detected.timestamp"]);
  return path;
}
function writeJsonPreservingTimestamp(path, value, timestampFields) {
  const fields = typeof timestampFields === "string" ? [timestampFields] : timestampFields;
  const previous = readPreviousJson(path);
  if (previous !== null) {
    const candidate = JSON.parse(JSON.stringify(value));
    for (const field of fields) {
      const previousTimestamp = readNestedString(previous, field);
      if (previousTimestamp !== null) {
        writeNestedString(candidate, field, previousTimestamp);
      }
    }
    const candidateJson = `${JSON.stringify(candidate, null, 2)}
`;
    const existing = readFileSync5(path, "utf8");
    if (candidateJson === existing) {
      return;
    }
  }
  writeFileSync4(path, `${JSON.stringify(value, null, 2)}
`);
}
function writeFrameworkVersionPreservingTimestamp(path, version, now) {
  const previous = readPreviousFrameworkVersion(path);
  const timestamp = previous && previous.version === version ? previous.updatedAt : now;
  writeFileSync4(path, `version=${version}
updated_at=${timestamp}
`);
}
function readPreviousJson(path) {
  if (!existsSync4(path)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync5(path, "utf8"));
  } catch {
    return null;
  }
}
function readNestedString(value, path) {
  let current = value;
  for (const segment of path.split(".")) {
    if (!isSafePropertySegment(segment) || !current || typeof current !== "object" || Array.isArray(current) || !Object.hasOwn(current, segment)) {
      return null;
    }
    current = current[segment];
  }
  return typeof current === "string" ? current : null;
}
function writeNestedString(value, path, next) {
  const segments = path.split(".");
  let current = value;
  for (const segment of segments.slice(0, -1)) {
    if (!isSafePropertySegment(segment) || !Object.hasOwn(current, segment)) {
      return;
    }
    const child = current[segment];
    if (!child || typeof child !== "object" || Array.isArray(child)) {
      return;
    }
    current = child;
  }
  const leaf = segments.at(-1);
  if (leaf && isSafePropertySegment(leaf)) {
    Object.defineProperty(current, leaf, {
      value: next,
      enumerable: true,
      configurable: true,
      writable: true
    });
  }
}
function isSafePropertySegment(segment) {
  return segment !== "__proto__" && segment !== "prototype" && segment !== "constructor";
}
function readPreviousFrameworkVersion(path) {
  if (!existsSync4(path)) {
    return null;
  }
  try {
    const content = readFileSync5(path, "utf8");
    const versionMatch = content.match(/^version=(.*)$/m);
    const updatedMatch = content.match(/^updated_at=(.*)$/m);
    if (!versionMatch || !updatedMatch) {
      return null;
    }
    return { version: versionMatch[1].trim(), updatedAt: updatedMatch[1].trim() };
  } catch {
    return null;
  }
}
function resolveFrameworkInstallPath() {
  return process.env.PAQAD_FRAMEWORK_HOME ?? toPosixPath(join6(homedir(), ".paqad-ai/current"));
}
function resolveFrameworkInstallReference() {
  return process.env.PAQAD_FRAMEWORK_HOME ? "$PAQAD_FRAMEWORK_HOME" : "~/.paqad-ai/current";
}
function sanitizeDetectionReport(projectRoot, report) {
  return {
    ...report,
    signals: (report.signals ?? []).map((signal) => ({
      ...signal,
      file: sanitizePersistedPath(projectRoot, signal.file)
    })),
    repository: report.repository ? sanitizeRepositoryContext(projectRoot, report.repository) : void 0
  };
}
function sanitizeOnboardingManifest(projectRoot, manifest) {
  return {
    ...manifest,
    project_root: typeof manifest.project_root === "string" ? sanitizePersistedPath(projectRoot, manifest.project_root) : manifest.project_root,
    detected: manifest.detected ? sanitizeDetectionReport(projectRoot, manifest.detected) : null,
    repository: manifest.repository ? sanitizeRepositoryContext(projectRoot, manifest.repository) : void 0,
    generated_artifacts: [...manifest.generated_artifacts ?? []].map((artifact) => ({
      ...artifact,
      path: sanitizePersistedPath(projectRoot, artifact.path)
    })).sort((left, right) => comparePaths(left.path, right.path)),
    planning_artifacts: manifest.planning_artifacts ? {
      ...manifest.planning_artifacts,
      compiled_rules_path: sanitizePersistedPath(
        projectRoot,
        manifest.planning_artifacts.compiled_rules_path
      )
    } : manifest.planning_artifacts
  };
}
function sanitizeStackSnapshotRepository(projectRoot, snapshot) {
  if (!snapshot.repository) return snapshot;
  return { ...snapshot, repository: sanitizeRepositoryContext(projectRoot, snapshot.repository) };
}
function sanitizeRepositoryContext(projectRoot, repository) {
  return {
    ...repository,
    selected_root: sanitizePersistedPath(projectRoot, repository.selected_root),
    ignored_paths: repository.ignored_paths.map((path) => sanitizePersistedPath(projectRoot, path)).filter((path) => !isDeveloperLocalNoise(path)).sort(comparePaths),
    projects: repository.projects.map((project) => sanitizeRepositoryProject(projectRoot, project)),
    applications: repository.applications.map(
      (application) => sanitizeRepositoryApplication(projectRoot, application)
    ),
    primary_project_root: repository.primary_project_root === null ? null : sanitizePersistedPath(projectRoot, repository.primary_project_root)
  };
}
var DEVELOPER_LOCAL_PATH_SEGMENTS = /* @__PURE__ */ new Set([".DS_Store", ".idea", ".vscode"]);
function isDeveloperLocalNoise(path) {
  return toPosixPath(path).split("/").some((segment) => DEVELOPER_LOCAL_PATH_SEGMENTS.has(segment));
}
function comparePaths(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}
function sanitizeRepositoryProject(projectRoot, project) {
  return {
    ...project,
    root: sanitizePersistedPath(projectRoot, project.root),
    parent_root: project.parent_root === null ? null : sanitizePersistedPath(projectRoot, project.parent_root)
  };
}
function sanitizeRepositoryApplication(projectRoot, application) {
  return {
    ...application,
    root: sanitizePersistedPath(projectRoot, application.root),
    component_roots: application.component_roots.map(
      (root) => sanitizePersistedPath(projectRoot, root)
    )
  };
}
function sanitizePersistedPath(projectRoot, value) {
  if (value === ".") {
    return value;
  }
  const normalizedValue = toPosixPath(value);
  const normalizedRoot = toPosixPath(projectRoot);
  if (normalizedValue === normalizedRoot) {
    return ".";
  }
  const prefix = normalizedRoot.endsWith("/") ? normalizedRoot : `${normalizedRoot}/`;
  if (normalizedValue.startsWith(prefix)) {
    return normalizedValue.slice(prefix.length);
  }
  const isAbsoluteWindows = /^[a-zA-Z]:\//.test(normalizedValue);
  const isAbsolutePosix = normalizedValue.startsWith("/");
  if (!isAbsoluteWindows && !isAbsolutePosix) {
    return normalizedValue;
  }
  const relativePath = relative3(projectRoot, value);
  if (relativePath === "") {
    return ".";
  }
  if (relativePath !== ".." && !relativePath.startsWith(`..${sep}`)) {
    return toPosixPath(relativePath);
  }
  return normalizedValue;
}

// src/introspection/cache.ts
init_esm_shims();
import { createHash as createHash2 } from "crypto";
import { readFileSync as readFileSync6 } from "fs";
import { mkdir, readFile, stat, writeFile } from "fs/promises";
import { dirname as dirname6, join as join7 } from "path";
function readStackSnapshotSync(projectRoot) {
  try {
    return JSON.parse(
      readFileSync6(join7(projectRoot, PATHS.STACK_SNAPSHOT), "utf8")
    );
  } catch {
    return null;
  }
}
var StackSnapshotCache = class {
  async read(projectRoot) {
    try {
      const raw = await readFile(join7(projectRoot, PATHS.STACK_SNAPSHOT), "utf8");
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  async write(projectRoot, snapshot) {
    const target = join7(projectRoot, PATHS.STACK_SNAPSHOT);
    await mkdir(dirname6(target), { recursive: true });
    const sanitized = sanitizeStackSnapshotRepository(projectRoot, snapshot);
    await writeFile(target, `${JSON.stringify(sanitized, null, 2)}
`);
  }
  async hashFiles(projectRoot, relativePaths) {
    const hashes = {};
    for (const relativePath of relativePaths) {
      try {
        const content = await readFile(join7(projectRoot, relativePath), "utf8");
        hashes[relativePath] = `sha256:${createHash2("sha256").update(content).digest("hex")}`;
      } catch {
        try {
          const pathStat = await stat(join7(projectRoot, relativePath));
          hashes[relativePath] = pathStat.isDirectory() ? "exists:directory" : "exists:file";
        } catch {
          continue;
        }
      }
    }
    return hashes;
  }
};

// src/core/framework-enabled.ts
init_esm_shims();
import { existsSync as existsSync5 } from "fs";
import { join as join8 } from "path";
var ENV_TRUTHY = /* @__PURE__ */ new Set(["1", "true", "yes", "on"]);
function isEnvDisabled(env = process.env) {
  const raw = env.PAQAD_DISABLED;
  return typeof raw === "string" && ENV_TRUTHY.has(raw.trim().toLowerCase());
}
function isManagedEnv(env = process.env) {
  const raw = env.PAQAD_MANAGED;
  return typeof raw === "string" && ENV_TRUTHY.has(raw.trim().toLowerCase());
}
function isFrameworkEnabled(profile, env = process.env) {
  if (isEnvDisabled(env)) {
    return false;
  }
  return profile?.paqad?.enabled !== false;
}
function isFrameworkEnabledForRoot(projectRoot, env = process.env) {
  if (isEnvDisabled(env)) {
    return false;
  }
  return !configSaysPaqadDisabled(projectRoot, env);
}
function isFrameworkDisabledForRoot(projectRoot, env = process.env) {
  return !isFrameworkEnabledForRoot(projectRoot, env);
}
function setFrameworkEnabled(projectRoot, enabled) {
  if (!existsSync5(join8(projectRoot, PATHS.PROJECT_PROFILE))) {
    throw new Error(
      "paqad is not onboarded in this project (no .paqad/project-profile.yaml). Run `paqad-ai onboard` first."
    );
  }
  const config_path = setConfigValue(projectRoot, "paqad_enable", enabled ? "true" : "false");
  return { enabled, config_path };
}

// src/planning/decision-evidence.ts
init_esm_shims();
import { existsSync as existsSync7, readFileSync as readFileSync9, readdirSync as readdirSync5, statSync as statSync3 } from "fs";
import { join as join12, relative as relative4 } from "path";

// src/code-knowledge/store.ts
init_esm_shims();
import { mkdirSync as mkdirSync5, readFileSync as readFileSync7, renameSync as renameSync2, writeFileSync as writeFileSync5 } from "fs";
import { dirname as dirname7, join as join9 } from "path";

// src/code-knowledge/schema.ts
init_esm_shims();
var import_ajv2 = __toESM(require_ajv(), 1);

// src/validators/schemas/code-knowledge.schema.json
var code_knowledge_schema_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "paqad://schemas/code-knowledge.json",
  title: "Code-knowledge index (issue #353)",
  type: "object",
  additionalProperties: false,
  required: [
    "schema_version",
    "header",
    "symbols",
    "files",
    "import_edges",
    "reference_edges",
    "dependencies"
  ],
  properties: {
    schema_version: { type: "integer", const: 1 },
    header: {
      type: "object",
      additionalProperties: false,
      required: ["generated_at", "branch", "head_commit", "schema_version", "entry_point_globs"],
      properties: {
        generated_at: { type: "string", minLength: 1 },
        branch: { type: ["string", "null"] },
        head_commit: { type: ["string", "null"] },
        schema_version: { type: "integer", const: 1 },
        entry_point_globs: { type: "array", items: { type: "string" } }
      }
    },
    symbols: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "name",
          "kind",
          "file",
          "line",
          "signature",
          "exported",
          "module_slug",
          "extraction_tier",
          "caller_count",
          "orphan"
        ],
        properties: {
          name: { type: "string", minLength: 1 },
          kind: { enum: ["function", "class", "component", "const", "type"] },
          file: { type: "string", minLength: 1 },
          line: { type: "integer", minimum: 1 },
          signature: { type: "string" },
          exported: { type: "boolean" },
          module_slug: { type: ["string", "null"] },
          extraction_tier: { enum: ["regex", "ast"] },
          caller_count: { type: "integer", minimum: 0 },
          orphan: { type: "boolean" }
        }
      }
    },
    files: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["path", "caller_count", "orphan", "entry_point"],
        properties: {
          path: { type: "string", minLength: 1 },
          caller_count: { type: "integer", minimum: 0 },
          orphan: { type: "boolean" },
          entry_point: { type: "boolean" }
        }
      }
    },
    import_edges: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["from", "to"],
        properties: {
          from: { type: "string", minLength: 1 },
          to: { type: "string", minLength: 1 }
        }
      }
    },
    reference_edges: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["from", "to", "symbol"],
        properties: {
          from: { type: "string", minLength: 1 },
          to: { type: "string", minLength: 1 },
          symbol: { type: "string", minLength: 1 }
        }
      }
    },
    dependencies: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "ecosystem", "imported"],
        properties: {
          name: { type: "string", minLength: 1 },
          ecosystem: { type: "string", minLength: 1 },
          imported: { type: "boolean" }
        }
      }
    }
  }
};

// src/code-knowledge/schema.ts
var ajv2 = new import_ajv2.default({ allErrors: true, allowUnionTypes: true });
var compiled2;
function validator2() {
  if (!compiled2) {
    compiled2 = ajv2.compile(code_knowledge_schema_default);
  }
  return compiled2;
}
function validateCodeKnowledgeIndex(data) {
  const validate = validator2();
  if (validate(data)) {
    return { valid: true, errors: [] };
  }
  const rawErrors = validate.errors ?? [];
  const errors = rawErrors.map((error) => {
    const path = error.instancePath.length > 0 ? error.instancePath : "/";
    const message = error.message ?? "invalid";
    return `${path} ${message}`.trim();
  });
  return { valid: false, errors };
}

// src/code-knowledge/store.ts
function codeKnowledgeIndexPath(projectRoot) {
  return join9(projectRoot, PATHS.CODE_KNOWLEDGE_INDEX);
}
function writeCodeKnowledgeIndex(projectRoot, index) {
  const target = codeKnowledgeIndexPath(projectRoot);
  mkdirSync5(dirname7(target), { recursive: true });
  const tmp = `${target}.tmp`;
  writeFileSync5(tmp, JSON.stringify(index, null, 2) + "\n", "utf8");
  renameSync2(tmp, target);
  return target;
}
function readCodeKnowledgeIndex(projectRoot) {
  const target = codeKnowledgeIndexPath(projectRoot);
  try {
    const parsed = JSON.parse(readFileSync7(target, "utf8"));
    return validateCodeKnowledgeIndex(parsed).valid ? parsed : null;
  } catch {
    return null;
  }
}

// src/planning/decision-evidence-arm.ts
init_esm_shims();
import { statSync as statSync2 } from "fs";
import { join as join11 } from "path";

// src/duplication/decisions.ts
init_esm_shims();
import { existsSync as existsSync6, readFileSync as readFileSync8, readdirSync as readdirSync4 } from "fs";
import { join as join10 } from "path";
var DUPLICATION_DECISION_CATEGORY = "create-vs-reuse";
function findingKey(finding) {
  return `${finding.file}:${finding.line_range.start}:${finding.matched_file}`;
}
function findingToken(key) {
  return `[paqad-duplication ${key}]`;
}
function buildDuplicationDecisionContext(finding) {
  const percent = Math.round(finding.similarity * 100);
  return `Duplication finding accepted as a new copy.
- file: ${finding.file}:${finding.line_range.start}-${finding.line_range.end}
- similarity: ${percent}% of ${finding.matched_file}
- callers of the existing code: ${finding.matched_callers}
${findingToken(findingKey(finding))}`;
}
function applyResolvedDecisions(projectRoot, findings) {
  if (findings.length === 0) {
    return [];
  }
  const keys = findings.map(findingKey);
  const resolvedDir = join10(projectRoot, PATHS.DECISIONS_RESOLVED_DIR);
  if (!existsSync6(resolvedDir)) {
    return [];
  }
  const results = [];
  let files;
  try {
    files = readdirSync4(resolvedDir).filter((name) => name.endsWith(".json"));
  } catch {
    return [];
  }
  for (const file of files.sort()) {
    const packet = readPacket(join10(resolvedDir, file));
    if (!packet || packet.category !== DUPLICATION_DECISION_CATEGORY) {
      continue;
    }
    const covered = keys.filter((key) => packet.context.includes(findingToken(key)));
    if (covered.length > 0) {
      results.push({ decisionId: packet.id, coveredFindingKeys: covered });
    }
  }
  return results;
}
function readPacket(path) {
  try {
    return JSON.parse(readFileSync8(path, "utf8"));
  } catch {
    return null;
  }
}

// src/planning/decision-arm-config.ts
init_esm_shims();

// src/core/floored-mode.ts
init_esm_shims();
function resolveFlooredMode(layers, order, def) {
  const norm = (raw) => {
    if (raw === void 0) return void 0;
    const value = raw.trim().toLowerCase();
    return order.includes(value) ? value : void 0;
  };
  const floor = norm(layers.team) ?? def;
  let rank = order.indexOf(floor);
  for (const raising of [norm(layers.local), norm(layers.env)]) {
    if (raising !== void 0) {
      rank = Math.max(rank, order.indexOf(raising));
    }
  }
  return order[rank];
}

// src/planning/decision-arm-config.ts
var DECISION_ARM_MODES = ["off", "warn", "strict"];
var DEFAULT_DECISION_ARM_MODE = "warn";
var DEFAULT_PLAN_THRESHOLD = 0.85;
var DEFAULT_MAX_PER_CHANGE = 1;
function resolveDecisionArmConfig(projectRoot, env = process.env) {
  return {
    mode: resolveDecisionArmMode(projectRoot, env),
    planThreshold: resolveNumericConfig(
      projectRoot,
      env,
      "decision_arm_plan_threshold",
      DEFAULT_PLAN_THRESHOLD,
      (value) => value > 0 && value <= 1
    ),
    maxPerChange: resolveNumericConfig(
      projectRoot,
      env,
      "decision_arm_max_per_change",
      DEFAULT_MAX_PER_CHANGE,
      (value) => Number.isInteger(value) && value >= 0
    )
  };
}
function resolveDecisionArmMode(projectRoot, env = process.env) {
  return resolveFlooredMode(
    {
      team: readConfigsDir(projectRoot).merged.get("decision_arm_mode"),
      local: readDotConfig(projectRoot).get("decision_arm_mode"),
      env: env.PAQAD_DECISION_ARM_MODE
    },
    DECISION_ARM_MODES,
    DEFAULT_DECISION_ARM_MODE
  );
}

// src/planning/symbol-similarity.ts
init_esm_shims();
var HEAD_BONUS = 0.1;
var TAIL_BONUS = 0.1;
var MODULE_BONUS = 0.05;
function tokenizeSymbolName(name) {
  return name.replace(/([a-z0-9])([A-Z])/gu, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/gu, "$1 $2").split(/[^A-Za-z0-9]+/u).filter((token) => token.length > 0).map((token) => token.toLowerCase());
}
function tokenDice(left, right) {
  if (left.length === 0 || right.length === 0) {
    return 0;
  }
  const rightSet = new Set(right);
  const shared = new Set(left.filter((token) => rightSet.has(token))).size;
  return 2 * shared / (new Set(left).size + new Set(right).size);
}
function editSimilarity(left, right) {
  const longest = Math.max(left.length, right.length);
  if (longest === 0) {
    return 0;
  }
  return 1 - levenshtein(left, right, longest) / longest;
}
function symbolNameSimilarity(left, right, options = {}) {
  if (left === right) {
    return 1;
  }
  const leftTokens = tokenizeSymbolName(left);
  const rightTokens = tokenizeSymbolName(right);
  let tokenScore = tokenDice(leftTokens, rightTokens);
  if (tokenScore > 0) {
    if (leftTokens[0] === rightTokens[0]) {
      tokenScore += HEAD_BONUS;
    }
    if (leftTokens[leftTokens.length - 1] === rightTokens[rightTokens.length - 1]) {
      tokenScore += TAIL_BONUS;
    }
  }
  const base = Math.max(tokenScore, editSimilarity(left, right));
  const withModule = base + (options.sameModule === true ? MODULE_BONUS : 0);
  return Number(Math.min(1, Math.max(0, withModule)).toFixed(2));
}

// src/planning/decision-evidence-arm.ts
var RECOMMEND_REUSE_MIN_CALLERS = 3;
var CREATE_NEW_OPTION_KEY = "create-new";
function reuseOptionKey(symbol) {
  return `reuse:${symbol}`;
}
function forkToken(forkKey) {
  return `[paqad-arm ${forkKey}]`;
}
function changeToken(changeKey) {
  return `[paqad-arm-change ${changeKey}]`;
}
function planForkKey(newName, existingSymbol) {
  return `plan:${newName}~${existingSymbol}`;
}
function duplicationForkKey(finding) {
  return `dup:${findingKey(finding)}`;
}
function buildReuseForkEvidence(input) {
  const evidence = {
    file: input.file,
    callers: input.callers,
    similarity: Number(Math.min(1, Math.max(0, input.similarity)).toFixed(2))
  };
  try {
    evidence.last_modified = statSync2(join11(input.projectRoot, input.file)).mtime.toISOString();
  } catch {
    evidence.evidence_partial = true;
  }
  return evidence;
}
function findPlanTimeReuseForks(input) {
  const index = input.index !== void 0 ? input.index : readCodeKnowledgeIndex(input.projectRoot);
  if (!index || input.constructs.length === 0) {
    return [];
  }
  const forks = [];
  for (const planned of input.constructs) {
    const best = closestSymbol(index.symbols, planned);
    if (best === null || best.similarity < input.threshold) {
      continue;
    }
    forks.push({
      forkKey: planForkKey(planned.name, best.symbol.name),
      newName: planned.name,
      justification: planned.justification ?? "",
      existing: best.symbol,
      similarity: best.similarity
    });
  }
  return forks.sort((a, b) => b.similarity - a.similarity);
}
function closestSymbol(symbols, planned) {
  let best = null;
  for (const symbol of symbols) {
    if (symbol.name === planned.name) {
      continue;
    }
    const similarity = symbolNameSimilarity(planned.name, symbol.name, {
      sameModule: planned.module !== void 0 && planned.module !== null && planned.module === symbol.module_slug
    });
    if (best === null || similarity > best.similarity) {
      best = { symbol, similarity };
    }
  }
  return best;
}
var EMPTY_RESULT = { minted: [], warnings: [], reusedDecisions: [] };
function armDecisionFromPlan(input) {
  return safely(() => {
    const config = input.config ?? resolveDecisionArmConfig(input.projectRoot, input.env);
    if (config.mode === "off") {
      return EMPTY_RESULT;
    }
    const forks = findPlanTimeReuseForks({
      projectRoot: input.projectRoot,
      constructs: input.constructs,
      threshold: config.planThreshold
    });
    return mintForks(
      input,
      config,
      forks.map((fork) => toMintable(input.projectRoot, fork))
    );
  });
}
function armDecisionFromDuplicationFinding(input) {
  return safely(() => {
    const config = input.config ?? resolveDecisionArmConfig(input.projectRoot, input.env);
    if (config.mode === "off") {
      return EMPTY_RESULT;
    }
    return mintForks(input, config, [toMintableFinding(input.projectRoot, input.finding)]);
  });
}
function toMintable(projectRoot, fork) {
  const evidence = buildReuseForkEvidence({
    projectRoot,
    file: fork.existing.file,
    callers: fork.existing.caller_count,
    similarity: fork.similarity
  });
  const percent = Math.round(fork.similarity * 100);
  return {
    forkKey: fork.forkKey,
    title: `Reuse ${fork.existing.name}, or build ${fork.newName}?`,
    context: `The plan introduces ${fork.newName}, which is ${percent}% similar to existing ${fork.existing.name}.
- file: ${fork.existing.file}:${fork.existing.line}
- callers of the existing code: ${fork.existing.caller_count}
- the plan's justification: ${fork.justification || "(none given)"}`,
    options: [
      {
        option_key: reuseOptionKey(fork.existing.name),
        label: `Reuse ${fork.existing.name} (${fork.existing.file})`,
        evidence
      },
      {
        option_key: CREATE_NEW_OPTION_KEY,
        label: `Build ${fork.newName} anyway \u2014 ${fork.justification || "no justification given"}`
      }
    ],
    recommendation: fork.existing.caller_count >= RECOMMEND_REUSE_MIN_CALLERS ? reuseOptionKey(fork.existing.name) : null,
    score: fork.similarity,
    warning: `${fork.newName} is ${percent}% similar to existing ${fork.existing.name} (${fork.existing.file}, ${fork.existing.caller_count} callers) \u2014 reuse it, or say why not`
  };
}
function toMintableFinding(projectRoot, finding) {
  const matchedName = finding.matched_symbol ?? finding.matched_file;
  const evidence = buildReuseForkEvidence({
    projectRoot,
    file: finding.matched_file,
    callers: finding.matched_callers,
    similarity: finding.similarity
  });
  return {
    forkKey: duplicationForkKey(finding),
    title: `Reuse ${matchedName}, or keep the new copy in ${finding.file}?`,
    context: buildDuplicationDecisionContext(finding),
    options: [
      {
        option_key: reuseOptionKey(matchedName),
        label: `Reuse ${matchedName} (${finding.matched_file})`,
        evidence
      },
      {
        option_key: CREATE_NEW_OPTION_KEY,
        label: `Keep the new copy in ${finding.file}`
      }
    ],
    recommendation: finding.matched_callers >= RECOMMEND_REUSE_MIN_CALLERS ? reuseOptionKey(matchedName) : null,
    score: finding.similarity,
    warning: finding.message
  };
}
function mintForks(input, config, forks) {
  if (forks.length === 0) {
    return EMPTY_RESULT;
  }
  const stored = readContractDecisions(input.projectRoot);
  const result = { minted: [], warnings: [], reusedDecisions: [] };
  let openedForChange = stored.filter(
    (row) => row.packet.context.includes(changeToken(input.changeKey))
  ).length;
  const ranked = [...forks].sort((a, b) => b.score - a.score);
  for (const fork of ranked) {
    const token = forkToken(fork.forkKey);
    const prior = stored.find((row) => row.packet.context.includes(token));
    if (prior !== void 0) {
      if (prior.status === "resolved") {
        recordDecisionReuse(
          input.projectRoot,
          {
            decisionId: prior.packet.id,
            category: prior.packet.category,
            matchKind: "exact",
            note: `evidence-armed fork ${fork.forkKey}`
          },
          { sessionId: input.sessionId ?? null }
        );
        result.reusedDecisions.push(`reused_decision:${prior.packet.id}`);
      }
      continue;
    }
    if (config.mode !== "strict" || openedForChange >= config.maxPerChange) {
      result.warnings.push(fork.warning);
      continue;
    }
    const created = createPendingDecision(input.projectRoot, {
      category: DUPLICATION_DECISION_CATEGORY,
      title: fork.title,
      context: `${fork.context}
${token}
${changeToken(input.changeKey)}`,
      options: fork.options,
      recommendation: fork.recommendation,
      origin: "evidence-armed",
      change: featureChangeKey(input.changeKey)
    });
    result.minted.push(created.id);
    openedForChange += 1;
  }
  return result;
}
function safely(run) {
  try {
    return run();
  } catch {
    return EMPTY_RESULT;
  }
}

// src/planning/decision-evidence.ts
var MIN_SIMILARITY = 0.01;
var MAX_SIMILARITY = 0.99;
function assembleDecisionEvidence(input) {
  const absolutePath = join12(input.projectRoot, input.file);
  const fileExists = existsSync7(absolutePath);
  const indexedCallers = indexedCallerCount(input.projectRoot, input.file);
  if (indexedCallers !== null) {
    const evidence2 = buildReuseForkEvidence({
      projectRoot: input.projectRoot,
      file: input.file,
      callers: indexedCallers,
      similarity: clampSimilarity(
        input.similarity ?? defaultSimilarityFor(input.category, fileExists, indexedCallers)
      )
    });
    const ruleMatch2 = findSupportingRule(input.projectRoot, input.file);
    if (ruleMatch2) {
      evidence2.rule_match = ruleMatch2;
    }
    return evidence2;
  }
  const callers = fileExists ? countFileReferences(input.projectRoot, input.file) : 0;
  const similarity = clampSimilarity(
    input.similarity ?? defaultSimilarityFor(input.category, fileExists, callers)
  );
  const ruleMatch = findSupportingRule(input.projectRoot, input.file);
  const evidence = {
    file: input.file,
    callers,
    similarity
  };
  if (ruleMatch) {
    evidence.rule_match = ruleMatch;
  }
  if (fileExists) {
    evidence.last_modified = statSync3(absolutePath).mtime.toISOString();
  } else {
    evidence.evidence_partial = true;
  }
  return evidence;
}
function countFileReferences(projectRoot, file) {
  const absoluteTarget = join12(projectRoot, file);
  if (!existsSync7(absoluteTarget)) {
    return 0;
  }
  const relativePath = normalizePath(relative4(projectRoot, absoluteTarget));
  const baseName = relativePath.split("/").pop() ?? relativePath;
  const stem = baseName.replace(/\.[^.]+$/, "");
  const matcher = new RegExp(`\\b${escapeRegExp(stem)}\\b|${escapeRegExp(relativePath)}`, "g");
  let count = 0;
  for (const candidate of walkTextFiles(projectRoot)) {
    if (normalizePath(candidate) === relativePath) {
      count += 1;
      continue;
    }
    const content = safeReadFile(join12(projectRoot, candidate));
    if (matcher.test(content)) {
      count += 1;
    }
  }
  return count;
}
function defaultSimilarityFor(category, fileExists, callers) {
  if (!fileExists) {
    return category === "workflow-or-tool" ? 0.44 : 0.38;
  }
  const callerBoost = callers >= 3 ? 0.06 : callers > 0 ? 0.03 : 0;
  switch (category) {
    case "component-reuse":
    case "create-vs-reuse":
      return Number((0.86 + callerBoost).toFixed(2));
    /* v8 ignore start -- individual category branches are exercised by integration; unit tests only hit the top two */
    case "shared-abstraction":
      return Number((0.78 + callerBoost).toFixed(2));
    case "ux-pattern":
      return Number((0.82 + callerBoost).toFixed(2));
    case "architecture-path":
      return Number((0.74 + callerBoost).toFixed(2));
    case "workflow-or-tool":
      return Number((0.7 + callerBoost).toFixed(2));
    /* v8 ignore stop */
    case "intake.requirement":
    case "intake.confirm_auto_resolution":
    case "intake.write_back":
    case "delivery.open_pr":
    case "delivery.ci_red":
    case "spec.change":
    case "spec.contradiction":
    case "spec.expert_conflict":
    case "fix.proof_method":
    case "test.flaky_judgement":
    case "finding.triage":
    case "quality.ratchet_exception":
    case "analytics.provider_version_mismatch":
    case "analytics.taxonomy_violation":
    case "analytics.pii_consent":
    case "analytics.no_provider_flag":
    case "analytics.architecture_conflict":
    case "analytics.new_event":
      return 0.5;
  }
}
function indexedCallerCount(projectRoot, file) {
  const index = readCodeKnowledgeIndex(projectRoot);
  if (!index) {
    return null;
  }
  const normalized = normalizePath(file);
  return index.files.find((entry) => entry.path === normalized)?.caller_count ?? null;
}
function findSupportingRule(projectRoot, file) {
  const compiledRules = readCompiledRulesSync(projectRoot);
  if (!compiledRules) {
    return void 0;
  }
  return compiledRules.rules.find(
    (rule) => rule.trigger_patterns.some((pattern) => matchesGlobish(file, pattern))
  )?.rule_id;
}
function readCompiledRulesSync(projectRoot) {
  try {
    return JSON.parse(readFileSync9(join12(projectRoot, PATHS.COMPILED_RULES), "utf8"));
  } catch {
    return null;
  }
}
function walkTextFiles(projectRoot, currentDir = "") {
  const absoluteDir = join12(projectRoot, currentDir);
  let entries;
  try {
    entries = readdirSync5(absoluteDir);
  } catch {
    return [];
  }
  const files = [];
  for (const entry of entries) {
    if (entry === "node_modules" || entry === ".git" || entry === ".paqad") {
      continue;
    }
    const relativeEntry = currentDir ? `${currentDir}/${entry}` : entry;
    const absoluteEntry = join12(projectRoot, relativeEntry);
    try {
      const stat2 = statSync3(absoluteEntry);
      if (stat2.isDirectory()) {
        files.push(...walkTextFiles(projectRoot, relativeEntry));
      } else if (/\.(ts|tsx|js|jsx|md|json|yaml|yml|txt|mdc)$/.test(entry)) {
        files.push(normalizePath(relativeEntry));
      }
    } catch {
      continue;
    }
  }
  return files;
}
function safeReadFile(path) {
  try {
    return readFileSync9(path, "utf8");
  } catch {
    return "";
  }
}
function clampSimilarity(value) {
  return Math.min(MAX_SIMILARITY, Math.max(MIN_SIMILARITY, Number(value.toFixed(2))));
}
function normalizePath(value) {
  return value.replace(/\\/g, "/");
}
function matchesGlobish(value, pattern) {
  const normalizedValue = normalizePath(value);
  const normalizedPattern = normalizePath(pattern);
  if (normalizedPattern === "**") {
    return true;
  }
  const escaped = normalizedPattern.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    `^${escaped.replace(/\*\*/g, ".*").replace(/\*/g, "[^/]*").replace(/\?/g, ".")}$`
  );
  return regex.test(normalizedValue) || normalizedValue.includes(normalizedPattern.replace(/\*/g, ""));
}
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// src/planning/decision-packet-builder.ts
init_esm_shims();
function buildDecisionPacket(input) {
  const primaryTouch = input.context.current_slice.touches[0] ?? "src/unknown.ts";
  const optionSet = decisionOptionsForCategory(input.projectRoot, input.category, primaryTouch);
  const now = /* @__PURE__ */ new Date();
  const linkedRequirements = input.context.current_slice.covers.filter(
    (cover) => input.manifest.requirement_graph.some((requirement) => requirement.id === cover)
  );
  const recommendation = chooseRecommendation(optionSet.options);
  const ttlDays = ttlDaysFor(input.projectRoot, input.category);
  return {
    decision_id: input.decisionId,
    fingerprint: computeDecisionFingerprint({
      category: input.category,
      question: decisionQuestionForCategory(input.category),
      option_keys: optionSet.options.map((option) => option.option_key),
      repo_state: {
        active_capabilities: ["coding"],
        stack: input.context.manifest_header.classification.stack,
        packs: input.context.manifest_header.classification.affected_modules
      }
    }),
    category: input.category,
    question: decisionQuestionForCategory(input.category),
    context: `${input.context.current_slice.goal} This fork affects ${primaryTouch}. Choose the path before implementation continues.`,
    options: optionSet.options,
    recommendation,
    recommendation_reason: recommendationReasonFor(recommendation, optionSet.options),
    confidence: computePacketConfidence(
      optionSet.options,
      recommendation,
      input.detectorConfidence
    ),
    requested_by: input.requestedBy,
    task_session_id: input.taskSessionId,
    linked_requirements: linkedRequirements,
    linked_slice_id: input.context.current_slice.slice_id,
    created_at: now.toISOString(),
    status: "pending",
    ttl_until: new Date(now.getTime() + ttlDays * 24 * 60 * 60 * 1e3).toISOString(),
    invalidation_watch: invalidationWatchFor(
      input.category,
      primaryTouch,
      input.context.current_slice.touches,
      optionSet.options
    )
  };
}
function computePacketConfidence(options, recommendation, detectorConfidence) {
  const recommendedOption = options.find((option) => option.option_key === recommendation) ?? options[0];
  const similarity = recommendedOption?.evidence.similarity ?? detectorConfidence;
  const callerBonus = (recommendedOption?.evidence.callers ?? 0) > 0 ? 0.05 : 0;
  const ruleBonus = recommendedOption?.evidence.rule_match ? 0.05 : 0;
  const score = similarity * 0.75 + detectorConfidence * 0.15 + callerBonus + ruleBonus;
  return Number(Math.min(0.99, Math.max(0, score)).toFixed(2));
}
function decisionQuestionForCategory(category) {
  switch (category) {
    case "component-reuse":
      return "Reuse the component or make new?";
    case "create-vs-reuse":
      return "Use what exists or make new?";
    case "shared-abstraction":
      return "Keep this local or share it?";
    case "ux-pattern":
      return "Stay with this pattern?";
    case "architecture-path":
      return "Which path should we take?";
    case "workflow-or-tool":
      return "Which workflow fits best?";
    case "intake.requirement":
      return "How should we pin this open question from the refined ticket?";
    case "intake.confirm_auto_resolution":
      return "We resolved these decisions from priors and rules \u2014 accept or override?";
    case "intake.write_back":
      return "Update the source ticket with the refined description and acceptance criteria?";
    case "delivery.open_pr":
      return "Open a pull request now (yes / draft / no)?";
    case "delivery.ci_red":
      return "CI is red \u2014 retry the gate, override and continue, or abandon delivery?";
    case "spec.change":
      return "The goal changed mid-build \u2014 update the frozen spec and re-freeze?";
    case "spec.contradiction":
      return "Work conflicts with the frozen spec \u2014 fix the code or change the spec?";
    case "spec.expert_conflict":
      return "Two experts disagree about the same target \u2014 which claim should the spec take?";
    case "fix.proof_method":
      return "This problem cannot be auto-checked \u2014 how should we confirm it is fixed?";
    case "test.flaky_judgement":
      return "Is this a flaky test or a rare real fault?";
    case "finding.triage":
      return "Which pile does this finding belong in?";
    case "quality.ratchet_exception":
      return "A quality measure would worsen \u2014 approve a legitimate exception or hold the line?";
    case "analytics.provider_version_mismatch":
      return "I'm not sure which analytics tool (or version) this project uses \u2014 which is right?";
    case "analytics.taxonomy_violation":
      return "This event name breaks your naming convention \u2014 keep mine or rename?";
    case "analytics.pii_consent":
      return "This property looks like personal data \u2014 I won't auto-track it. Track it anyway?";
    case "analytics.no_provider_flag":
      return "Analytics is on but no provider is wired up \u2014 set one up, or stay dormant?";
    case "analytics.architecture_conflict":
      return "Your module docs say tracking belongs elsewhere than this change \u2014 where should it go?";
    case "analytics.new_event":
      return "This adds a new tracked event \u2014 approve the name, rename it, or skip tracking?";
  }
}
function decisionOptionsForCategory(projectRoot, category, targetFile) {
  const targetDir = targetFile.replace(/\/[^/]+$/, "");
  const extension = targetFile.includes(".") ? targetFile.slice(targetFile.lastIndexOf(".")) : ".ts";
  const newFile = `${targetDir}/new-${targetFile.split("/").pop() ?? `option${extension}`}`;
  const sharedFile = `${targetDir}/shared-${targetFile.split("/").pop() ?? `option${extension}`}`;
  switch (category) {
    case "shared-abstraction":
      return {
        options: [
          buildOption(projectRoot, category, {
            option_key: "keep-local",
            label: "Keep it local",
            one_line_preview: `If you pick this, we will keep the work in ${targetFile}.`,
            trade_off: "You give up: one shared place for later reuse.",
            technical_detail: `The first implementation stays in ${targetFile} and avoids new shared surface area.`,
            file: targetFile,
            similarity: 0.79
          }),
          buildOption(projectRoot, category, {
            option_key: "extract-shared",
            label: "Extract shared helper",
            one_line_preview: `If you pick this, we will create ${sharedFile}.`,
            trade_off: "You give up: the quickest path for this slice.",
            technical_detail: `A shared helper in ${sharedFile} makes later reuse easier but broadens the change now.`,
            file: sharedFile,
            similarity: 0.41
          })
        ]
      };
    case "architecture-path":
      return {
        options: [
          buildOption(projectRoot, category, {
            option_key: "keep-current-path",
            label: "Keep current path",
            one_line_preview: `If you pick this, we will update ${targetFile}.`,
            trade_off: "You give up: a broader cleanup right now.",
            technical_detail: "This path keeps implementation close to the current slice boundary.",
            file: targetFile,
            similarity: 0.74
          }),
          buildOption(projectRoot, category, {
            option_key: "take-new-path",
            label: "Take new path",
            one_line_preview: `If you pick this, we will create ${newFile}.`,
            trade_off: "You give up: the smallest possible diff.",
            technical_detail: "This path opens a new implementation route and needs more follow-up.",
            file: newFile,
            similarity: 0.46
          })
        ]
      };
    case "workflow-or-tool":
      return {
        options: [
          buildOption(projectRoot, category, {
            option_key: "use-current-workflow",
            label: "Use current workflow",
            one_line_preview: `If you pick this, we will keep the work inside ${targetFile}.`,
            trade_off: "You give up: trying a brand new tool path.",
            technical_detail: "This keeps the change aligned with the current workflow in the repo.",
            file: targetFile,
            similarity: 0.71
          }),
          buildOption(projectRoot, category, {
            option_key: "switch-workflow",
            label: "Switch workflow now",
            one_line_preview: `If you pick this, we will introduce ${newFile}.`,
            trade_off: "You give up: the simpler path for this task.",
            technical_detail: "This introduces a new workflow artifact and changes future execution.",
            file: newFile,
            similarity: 0.44
          })
        ]
      };
    case "ux-pattern":
      return {
        options: [
          buildOption(projectRoot, category, {
            option_key: "reuse-current-pattern",
            label: "Reuse current pattern",
            one_line_preview: `If you pick this, we will update ${targetFile}.`,
            trade_off: "You give up: a fresh interaction pattern.",
            technical_detail: "The current pattern already appears near this change.",
            file: targetFile,
            similarity: 0.83
          }),
          buildOption(projectRoot, category, {
            option_key: "make-new-pattern",
            label: "Make new pattern",
            one_line_preview: `If you pick this, we will create ${newFile}.`,
            trade_off: "You give up: the safest path for consistency.",
            technical_detail: "A new pattern gives flexibility now but increases UX drift risk.",
            file: newFile,
            similarity: 0.47
          })
        ]
      };
    case "component-reuse":
    case "create-vs-reuse":
      return {
        options: [
          buildOption(projectRoot, category, {
            option_key: "reuse-existing",
            label: "Reuse what exists",
            one_line_preview: `If you pick this, we will update ${targetFile}.`,
            trade_off: "You give up: a blank-slate implementation.",
            technical_detail: `Reusing ${targetFile} keeps behavior aligned with the existing project structure.`,
            file: targetFile,
            similarity: 0.91
          }),
          buildOption(projectRoot, category, {
            option_key: "make-new",
            label: "Make a new one",
            one_line_preview: `If you pick this, we will create ${newFile}.`,
            trade_off: "You give up: the shared path that already exists.",
            technical_detail: `Creating ${newFile} gives isolation but increases maintenance and consistency risk.`,
            file: newFile,
            similarity: 0.42
          })
        ]
      };
    case "intake.requirement":
    case "intake.confirm_auto_resolution":
    case "intake.write_back":
    case "delivery.open_pr":
    case "delivery.ci_red":
    case "spec.change":
    case "spec.contradiction":
    case "spec.expert_conflict":
    case "fix.proof_method":
    case "test.flaky_judgement":
    case "finding.triage":
    case "quality.ratchet_exception":
    case "analytics.provider_version_mismatch":
    case "analytics.taxonomy_violation":
    case "analytics.pii_consent":
    case "analytics.no_provider_flag":
    case "analytics.architecture_conflict":
    case "analytics.new_event":
      return { options: [] };
  }
}
function selectViableDecisionOptions(projectRoot, options) {
  const floor = readProjectProfile(projectRoot)?.custom?.decisions?.ask_threshold === "permissive" ? 0.4 : 0.55;
  const viable = options.filter(
    (option) => option.evidence.similarity === void 0 || option.evidence.similarity >= floor
  );
  return viable.length > 0 ? viable : options;
}
function buildOption(projectRoot, category, input) {
  return {
    option_key: input.option_key,
    label: input.label,
    one_line_preview: input.one_line_preview,
    trade_off: input.trade_off,
    technical_detail: input.technical_detail,
    evidence: assembleDecisionEvidence({
      projectRoot,
      file: input.file,
      category,
      similarity: input.similarity
    })
  };
}
function chooseRecommendation(options) {
  const ranked = [...options].sort((left, right) => scoreOption(right) - scoreOption(left));
  return ranked[0]?.option_key ?? null;
}
function recommendationReasonFor(recommendation, options) {
  const option = options.find((entry) => entry.option_key === recommendation);
  if (!option) {
    return void 0;
  }
  return option.evidence.rule_match ? "A project rule already points to this path." : (option.evidence.callers ?? 0) > 0 ? "This path already matches the way the repo works today." : (
    /* v8 ignore stop */
    "This is the safer and cheaper path for the first change."
  );
}
function scoreOption(option) {
  return (option.evidence.similarity ?? 0) + ((option.evidence.callers ?? 0) > 0 ? 0.05 : 0) + (option.evidence.rule_match ? 0.1 : 0);
}
function invalidationWatchFor(category, primaryTouch, touches, options) {
  const watch = /* @__PURE__ */ new Set([primaryTouch]);
  switch (category) {
    case "component-reuse":
      for (const option of options) {
        if (option.evidence.file) {
          watch.add(option.evidence.file);
        }
      }
      watch.add(PATHS.DESIGN_SYSTEM_DIR);
      break;
    case "create-vs-reuse":
      for (const option of options) {
        if (option.evidence.file) {
          watch.add(option.evidence.file);
        }
      }
      watch.add(PATHS.DESIGN_SYSTEM_DIR);
      break;
    case "architecture-path":
      for (const touch of touches) {
        watch.add(touch);
      }
      break;
    case "shared-abstraction":
      for (const option of options) {
        if (option.evidence.file) {
          watch.add(option.evidence.file);
        }
      }
      watch.add(PATHS.DESIGN_SYSTEM_DIR);
      break;
    case "ux-pattern":
      watch.add(PATHS.DESIGN_SYSTEM_DIR);
      break;
    default:
      break;
  }
  return [...watch];
}
function ttlDaysFor(projectRoot, category) {
  const override = readProjectProfile(projectRoot)?.custom?.decisions?.ttl_overrides_days?.[category];
  return override ?? DECISION_CATEGORY_DEFAULTS[category].ttl_days;
}

// src/kernel/capability.ts
init_esm_shims();
import { readFileSync as readFileSync21 } from "fs";

// src/pipeline/session-ownership.ts
init_esm_shims();
var AGENT_AUTHORED_SOURCES = /* @__PURE__ */ new Set(["live-mark", "redo"]);
function sessionOwnedRows(projectRoot, sessionId) {
  let dirNames;
  try {
    dirNames = listInFlightFeatures(projectRoot);
  } catch {
    return [];
  }
  const ownBundle = readSessionControl(projectRoot, sessionId).active;
  const lastPrompt = lastPromptAt(projectRoot, sessionId);
  return dirNames.flatMap(
    (dirName) => readFeatureStageUnit(projectRoot, dirName).filter(
      (row) => row.session_id === sessionId && typeof row.evidence_source === "string" && AGENT_AUTHORED_SOURCES.has(row.evidence_source) || dirName === ownBundle && isStageAgentRow(row) && stageAgentRowIsOwn(row, sessionId, lastPrompt)
    )
  );
}
function sessionWroteInEpisode(projectRoot, sessionId, dirName, episodeStartAt) {
  const rows = readFeatureStageUnit(projectRoot, dirName);
  const since = episodeStartAt === null ? NaN : Date.parse(episodeStartAt);
  const wroteSince = rows.some((row) => {
    if (row.session_id !== sessionId) return false;
    if (Number.isNaN(since)) return true;
    const at = Date.parse(rowRecordedAt(row) ?? "");
    return !Number.isNaN(at) && at >= since;
  });
  return wroteSince || rows.some((row, index) => isOwnRunningStageStart(rows, row, index, sessionId));
}
function isOwnRunningStageStart(rows, row, index, sessionId) {
  if (row.kind !== "stage_start" || row.session_id !== sessionId) return false;
  return !rows.slice(index + 1).some((later) => later.kind === "stage_end" && later.stage === row.stage);
}
function lastPromptAt(projectRoot, sessionId) {
  const stamp = readWorkflowState(projectRoot, sessionId).turn_started_at;
  return stamp === void 0 ? NaN : Date.parse(stamp);
}
function stageAgentRowIsOwn(row, sessionId, lastPrompt) {
  if (Number.isNaN(lastPrompt)) {
    return true;
  }
  if (row.session_id !== sessionId) {
    return false;
  }
  const at = Date.parse(rowRecordedAt(row) ?? "");
  return !Number.isNaN(at) && at >= lastPrompt;
}
function isStageAgentRow(row) {
  return row.kind === STAGE_AGENT_KIND || isStageAgent(row.agent);
}
function editedThisTurn(owned, state) {
  const turnStart = state.turn_started_at === void 0 ? NaN : Date.parse(state.turn_started_at);
  if (Number.isNaN(turnStart)) {
    return owned.length > 0;
  }
  return owned.some((row) => {
    if (row.session_source === "cache") {
      return false;
    }
    const at = Date.parse(rowRecordedAt(row) ?? "");
    return !Number.isNaN(at) && at >= turnStart;
  });
}
function editedDevelopmentThisTurn(projectRoot, sessionId) {
  const development = sessionOwnedRows(projectRoot, sessionId).filter(
    (row) => row.stage === "development"
  );
  if (development.length === 0) {
    return false;
  }
  return editedThisTurn(development, readWorkflowState(projectRoot, sessionId));
}
function classifyCompletionEnforcement(projectRoot, sessionId) {
  let resolved;
  try {
    resolved = resolveSessionId(projectRoot, sessionId ?? null);
  } catch {
    return { enforce: false, reason: "not-owner", activeWorkflow: null };
  }
  const state = readWorkflowState(projectRoot, resolved);
  const activeWorkflow = state.active?.workflow ?? null;
  const owned = sessionOwnedRows(projectRoot, resolved);
  if (owned.length === 0) {
    return { enforce: false, reason: "not-owner", activeWorkflow };
  }
  if (editedThisTurn(owned, state)) {
    return { enforce: true, reason: "edited-this-turn", activeWorkflow };
  }
  if (activeWorkflow === null) {
    return { enforce: true, reason: "owner-unknown-route", activeWorkflow };
  }
  if (isFeatureDevelopmentRoute(activeWorkflow)) {
    return { enforce: true, reason: "owner-feature-dev", activeWorkflow };
  }
  return { enforce: false, reason: "detour", activeWorkflow };
}

// src/delivery/delivery-check.ts
init_esm_shims();

// src/pipeline/delivery-policy.ts
init_esm_shims();
var import_yaml = __toESM(require_dist(), 1);
import { existsSync as existsSync9, readFileSync as readFileSync11 } from "fs";
import { join as join14 } from "path";

// src/delivery/detection.ts
init_esm_shims();

// src/delivery/host.ts
init_esm_shims();
function detectDeliveryHost(remoteUrl) {
  if (!remoteUrl) {
    return "unknown";
  }
  const host = extractHost(remoteUrl);
  if (host === null) {
    return "unknown";
  }
  if (host === "github.com" || host.endsWith(".github.com")) {
    return "github";
  }
  if (host === "gitlab.com" || host.startsWith("gitlab.")) {
    return "gitlab";
  }
  if (host === "bitbucket.org" || host.startsWith("bitbucket.")) {
    return "bitbucket";
  }
  return "unknown";
}
function extractHost(remoteUrl) {
  const trimmed = remoteUrl.trim();
  const ssh = /^[^@]+@([^:]+):/.exec(trimmed);
  if (ssh) {
    return ssh[1].toLowerCase();
  }
  try {
    return new URL(trimmed).hostname.toLowerCase();
  } catch {
    return null;
  }
}

// src/delivery/detection.ts
var FREEFORM_COMMIT_TEMPLATE = "{summary}\n\nRefs: {ticket}";
var BASE_BRANCH_NAMES = /* @__PURE__ */ new Set(["main", "master", "develop", "development", "trunk"]);
var TYPED_PREFIX = /^(feat|feature|fix|bugfix|hotfix|chore|docs|refactor|test|perf|build|ci)\//i;
var TICKET_FIRST = /^[A-Z]{2,}-\d+[-/]/;
var CONVENTIONAL_COMMIT = /^(\w+)(\([^)]+\))?!?:\s/;
function normalizeBranch(name) {
  let n = name.trim();
  n = n.replace(/^refs\/heads\//, "").replace(/^refs\/remotes\//, "");
  n = n.replace(/^(origin|upstream)\//i, "");
  return n;
}
function detectHost(remoteUrl) {
  const host = detectDeliveryHost(remoteUrl);
  if (host === "unknown") {
    return null;
  }
  return {
    value: host,
    confidence: 1,
    evidence: `git remote resolves to ${host}`
  };
}
function detectBase(snapshot) {
  if (snapshot.defaultBranch) {
    const base = normalizeBranch(snapshot.defaultBranch);
    return { value: base, confidence: 1, evidence: `remote default branch is ${base}` };
  }
  const known = snapshot.branchNames.map(normalizeBranch).find((b) => BASE_BRANCH_NAMES.has(b));
  if (known) {
    return { value: known, confidence: 0.6, evidence: `found a ${known} branch` };
  }
  return null;
}
function detectBranchTemplate(snapshot) {
  const feature = snapshot.branchNames.map(normalizeBranch).filter((b) => b !== "" && !BASE_BRANCH_NAMES.has(b) && !/^(HEAD)$/.test(b));
  if (feature.length === 0) {
    return null;
  }
  let typed = 0;
  let ticketFirst = 0;
  for (const b of feature) {
    if (TICKET_FIRST.test(b)) {
      ticketFirst += 1;
    } else if (TYPED_PREFIX.test(b)) {
      typed += 1;
    }
  }
  if (typed >= ticketFirst && typed > 0) {
    return {
      value: "{type}/{ticket}-{title_slug}",
      confidence: typed / feature.length,
      evidence: `typed branch prefix (${typed}/${feature.length} branches)`
    };
  }
  if (ticketFirst > 0) {
    return {
      value: "{ticket}-{title_slug}",
      confidence: ticketFirst / feature.length,
      evidence: `ticket-first branches (${ticketFirst}/${feature.length})`
    };
  }
  return null;
}
function detectCommitConvention(snapshot) {
  const subjects = snapshot.recentCommitSubjects.filter((s) => s.trim() !== "");
  if (subjects.length === 0) {
    return null;
  }
  const conventional = subjects.filter((s) => CONVENTIONAL_COMMIT.test(s)).length;
  const ratio = conventional / subjects.length;
  if (ratio >= 0.5) {
    return {
      value: true,
      confidence: ratio,
      evidence: `conventional commits (${conventional}/${subjects.length})`
    };
  }
  return {
    value: false,
    confidence: 1 - ratio,
    evidence: `free-form commit subjects (${subjects.length - conventional}/${subjects.length})`
  };
}
function detectDelivery(snapshot) {
  return {
    host: detectHost(snapshot.remoteUrl),
    base: detectBase(snapshot),
    branch_template: detectBranchTemplate(snapshot),
    commit_conventional: detectCommitConvention(snapshot)
  };
}
function hasDetection(detected) {
  return Boolean(
    detected.host || detected.base || detected.branch_template || detected.commit_conventional
  );
}
function overlayDetection(process2, detected, isAuto) {
  const next = {
    ticket: { ...process2.ticket },
    host: { ...process2.host },
    branch: { ...process2.branch },
    commit: { ...process2.commit },
    pr: { ...process2.pr },
    ci: { ...process2.ci },
    intake_decisions: { ...process2.intake_decisions }
  };
  if (detected.host && isAuto("host")) {
    next.host.provider = detected.host.value;
  }
  if (detected.base && isAuto("branch")) {
    next.branch.base = detected.base.value;
  }
  if (detected.base && isAuto("pr")) {
    next.pr.base = detected.base.value;
  }
  if (detected.branch_template && isAuto("branch")) {
    next.branch.template = detected.branch_template.value;
  }
  if (detected.commit_conventional && isAuto("commit")) {
    next.commit.template = detected.commit_conventional.value ? process2.commit.template : FREEFORM_COMMIT_TEMPLATE;
  }
  return next;
}
function summarizeDetection(detected) {
  const lines = [];
  if (detected.host) {
    lines.push(`host ${detected.host.value} (${detected.host.evidence})`);
  }
  if (detected.branch_template) {
    lines.push(
      `branch \`${detected.branch_template.value}\` (${detected.branch_template.evidence})`
    );
  }
  if (detected.commit_conventional) {
    lines.push(
      detected.commit_conventional.value ? `commits: ${detected.commit_conventional.evidence}` : `commits: free-form (${detected.commit_conventional.evidence})`
    );
  }
  if (detected.base) {
    lines.push(`base \`${detected.base.value}\` (${detected.base.evidence})`);
  }
  return lines;
}

// src/delivery/detection-store.ts
init_esm_shims();
import { existsSync as existsSync8, mkdirSync as mkdirSync6, readFileSync as readFileSync10, writeFileSync as writeFileSync6 } from "fs";
import { dirname as dirname8, join as join13 } from "path";

// src/delivery/delivery-ledger.ts
init_esm_shims();
var DELIVERY_EVIDENCE_DOC_TYPE = "delivery-evidence";
var DELIVERY_EVIDENCE_SCHEMA_VERSION = 1;
function recordDeliveryEvidence(projectRoot, detected) {
  recordProjectEvent(
    projectRoot,
    DELIVERY_EVIDENCE_DOC_TYPE,
    { kind: "detected", detected },
    DELIVERY_EVIDENCE_SCHEMA_VERSION
  );
}
function readLatestDeliveryEvidence(projectRoot) {
  const row = readLatestProjectEvent(
    projectRoot,
    DELIVERY_EVIDENCE_DOC_TYPE,
    (r) => r.kind === "detected" && Boolean(r.detected)
  );
  return row ? row.detected : null;
}

// src/delivery/detection-store.ts
function detectionPath(projectRoot) {
  return join13(projectRoot, PATHS.DELIVERY_DETECTION);
}
function readDetection(projectRoot) {
  const path = detectionPath(projectRoot);
  if (!existsSync8(path)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync10(path, "utf8"));
  } catch {
    return null;
  }
}
function writeDetection(projectRoot, detected) {
  const path = detectionPath(projectRoot);
  mkdirSync6(dirname8(path), { recursive: true });
  writeFileSync6(path, `${JSON.stringify(detected, null, 2)}
`, "utf8");
  recordDeliveryEvidence(projectRoot, detected);
}

// src/pipeline/delivery-policy.ts
var DELIVERY_POLICY_FILE = "delivery-policy.yaml";
function deliveryPolicyPath(projectRoot) {
  return toPosixPath(join14(projectRoot, PATHS.WORKFLOWS_DIR, DELIVERY_POLICY_FILE));
}
function defaultDeliveryProcess() {
  return {
    ticket: {
      maintained: "auto",
      provider: "jira",
      server: "",
      require_ticket: false,
      write_back_refined: "ask",
      comment_decisions: true
    },
    host: {
      maintained: "auto",
      provider: "github",
      server: ""
    },
    branch: {
      maintained: "auto",
      template: "{type}/{ticket}-{title_slug}",
      type_map: { Story: "feat", Bug: "fix", Task: "chore", default: "feat" },
      slug_max_length: 50,
      base: "main"
    },
    commit: {
      maintained: "auto",
      template: "{type}({scope}): {summary}\n\nRefs: {ticket}",
      sign_off: false,
      ask_when_unspecified: true
    },
    pr: {
      maintained: "auto",
      title_template: "{type}({scope}): {summary} [{ticket}]",
      body_template_path: ".paqad/templates/pr-body.md",
      base: "main",
      draft: false,
      reviewers: [],
      labels: [],
      link_ticket: true,
      transition_on_open: "In Review"
    },
    ci: {
      maintained: "auto",
      gate: "wait_for_green",
      timeout_minutes: 30,
      on_red: "stop",
      transition_on_green: "Done"
    },
    intake_decisions: {
      maintained: "auto",
      auto_resolve_from_priors: true,
      auto_resolve_from_rules: true,
      confirm_auto_resolutions: "batched",
      max_options_per_packet: 4,
      fingerprint_scope: ["ticket_type", "module", "category"]
    }
  };
}
function defaultDeliveryPolicy() {
  return {
    enabled: true,
    process: defaultDeliveryProcess()
  };
}
function loadDeliveryPolicy(projectRoot) {
  const defaults = defaultDeliveryPolicy();
  const path = deliveryPolicyPath(projectRoot);
  let parsed = {};
  if (existsSync9(path)) {
    try {
      parsed = import_yaml.default.parse(readFileSync11(path, "utf8")) ?? {};
    } catch (error) {
      return {
        policy: withDetection(projectRoot, defaults),
        warnings: [
          `Delivery policy at ${PATHS.WORKFLOWS_DIR}/${DELIVERY_POLICY_FILE} could not be parsed. Using framework defaults.`,
          error instanceof Error ? error.message : "YAML parse failed"
        ]
      };
    }
    const validator4 = new SchemaValidator();
    const validation = validator4.validate("delivery-policy", parsed);
    if (!validation.valid) {
      return {
        policy: withDetection(projectRoot, defaults),
        warnings: [
          `Delivery policy at ${PATHS.WORKFLOWS_DIR}/${DELIVERY_POLICY_FILE} is invalid. Using framework defaults.`,
          ...validation.errors.map((error) => `${error.path} ${error.message}`)
        ]
      };
    }
  }
  const overlaid = withDetection(projectRoot, defaults, parsed);
  return { policy: mergeDeliveryPolicy(overlaid, parsed), warnings: [] };
}
function sectionIsAuto(raw, section) {
  return (raw.process?.[section]?.maintained ?? "auto") === "auto";
}
function withDetection(projectRoot, base, raw = {}) {
  const detected = readDetection(projectRoot);
  if (!detected) {
    return base;
  }
  return {
    enabled: base.enabled,
    process: overlayDetection(base.process, detected, (section) => sectionIsAuto(raw, section))
  };
}
function mergeDeliveryPolicy(defaults, raw) {
  const d = defaults.process;
  const p = raw.process ?? {};
  const process2 = {
    ticket: { ...d.ticket, ...p.ticket ?? {} },
    host: { ...d.host, ...p.host ?? {} },
    branch: {
      ...d.branch,
      ...p.branch ?? {},
      type_map: { ...d.branch.type_map, ...p.branch?.type_map ?? {} }
    },
    commit: { ...d.commit, ...p.commit ?? {} },
    pr: {
      ...d.pr,
      ...p.pr ?? {},
      reviewers: appendUnique(d.pr.reviewers, p.pr?.reviewers),
      labels: appendUnique(d.pr.labels, p.pr?.labels)
    },
    ci: { ...d.ci, ...p.ci ?? {} },
    intake_decisions: {
      ...d.intake_decisions,
      ...p.intake_decisions ?? {},
      fingerprint_scope: appendUnique(
        d.intake_decisions.fingerprint_scope,
        p.intake_decisions?.fingerprint_scope
      )
    }
  };
  return {
    enabled: raw.enabled ?? defaults.enabled,
    process: process2
  };
}
function appendUnique(base, additions) {
  return Array.from(/* @__PURE__ */ new Set([...base, ...additions ?? []]));
}
function renderDefaultDeliveryPolicyYaml() {
  return `# Delivery Workflow Policy
# Authored exactly like feature-development.yaml: same location, same schema
# validation, same merge_mode: append precedence \u2014 project edits win.
#
# enabled: on by default. Git-only parts (branch/commit naming) are active
# immediately; ticket/PR/CI parts stay dormant until the matching MCP is
# connected, then light up with no re-enable step.
#
# Every section carries  maintained: auto | manual
#   auto   \u2014 the framework keeps it in sync with your repo; detection fills it
#            during \`create documentation\`.
#   manual \u2014 you own it; detection never touches it.
schema_version: "1"
merge_mode: append
enabled: true

process:
  ticket:
    maintained: auto
    provider: jira              # kind; future: linear | github-issues | generic
    server: ""                  # explicit MCP server name; "" = first enabled of that kind
    require_ticket: false       # teams that gate on tickets set true
    write_back_refined: ask     # never | ask | always
    comment_decisions: true     # post every resolved decision to the ticket

  host:
    maintained: auto
    provider: github            # kind; future: gitlab | bitbucket
    server: ""

  branch:
    maintained: auto
    template: "{type}/{ticket}-{title_slug}"
    type_map: { Story: feat, Bug: fix, Task: chore, default: feat }
    slug_max_length: 50
    base: main

  commit:
    maintained: auto
    template: "{type}({scope}): {summary}\\n\\nRefs: {ticket}"
    sign_off: false
    ask_when_unspecified: true   # ask + record commit_decision when unspecified

  pr:
    maintained: auto
    title_template: "{type}({scope}): {summary} [{ticket}]"
    body_template_path: .paqad/templates/pr-body.md
    base: main
    draft: false
    reviewers: []
    labels: []
    link_ticket: true
    transition_on_open: "In Review"   # "" = no transition

  ci:
    maintained: auto
    gate: wait_for_green        # wait_for_green | warn_only | off
    timeout_minutes: 30
    on_red: stop                # stop | comment_and_stop
    transition_on_green: "Done" # "" = no transition

  intake_decisions:
    maintained: auto
    auto_resolve_from_priors: true
    auto_resolve_from_rules: true
    confirm_auto_resolutions: batched   # always | batched | never
    max_options_per_packet: 4
    fingerprint_scope: [ticket_type, module, category]
`;
}

// src/delivery/ai-attribution.ts
init_esm_shims();
var AI_ATTRIBUTION_MARKERS = [
  {
    id: "claude-code",
    vendor: "Claude Code",
    pattern: /(?:co-authored-by:\s*claude\b|generated with \[?claude code)/i,
    configuredByPaqad: true,
    remediation: 'paqad writes `attribution: { commit: "", pr: "", sessionUrl: false }` into `.claude/settings.json` at onboarding. If the trailer is still appearing, that file was edited or a higher-precedence settings file overrides it (`.claude/settings.local.json`, then the command line, then managed settings).'
  },
  {
    id: "codex-cli",
    vendor: "Codex CLI",
    pattern: /co-authored-by:\s*codex\b/i,
    configuredByPaqad: false,
    remediation: 'Codex only exposes this in your home directory, which paqad will not write. Set `commit_attribution = ""` in `~/.codex/config.toml`.'
  },
  {
    id: "cursor",
    vendor: "Cursor",
    pattern: /(?:co-authored-by:\s*cursor\b|made[- ]with:?\s*cursor\b)/i,
    configuredByPaqad: false,
    remediation: "Cursor only exposes this in your home directory, which paqad will not write. Set `attribution.attributeCommitsToAgent` to false in `~/.cursor/cli-config.json`, or turn it off for everyone from the Cursor admin dashboard."
  },
  {
    id: "aider",
    vendor: "Aider",
    pattern: /co-authored-by:\s*aider\b/i,
    configuredByPaqad: true,
    remediation: "paqad writes `attribute-author`, `attribute-committer` and `attribute-co-authored-by` as false into `.aider.conf.yml` at onboarding. If the trailer is still appearing, that file was edited or aider was run with an explicit `--attribute-\u2026` flag."
  },
  {
    id: "github-copilot",
    vendor: "GitHub Copilot",
    pattern: /co-authored-by:\s*(?:copilot\b|copilot-swe-agent\b)/i,
    configuredByPaqad: false,
    remediation: "The Copilot coding agent commits under its own GitHub identity; there is no project file to set. Control it from your organisation\u2019s Copilot policy settings on GitHub."
  },
  {
    id: "gemini-cli",
    vendor: "Gemini CLI",
    pattern: /(?:co-authored-by:\s*gemini\b|generated with gemini\b)/i,
    configuredByPaqad: false,
    remediation: "Gemini CLI adds no attribution by default, so this was added by hand or by a local commit template. Remove it from whatever added it."
  }
];
function detectAiAttribution(text) {
  if (!text) {
    return [];
  }
  const matches = [];
  for (const marker of AI_ATTRIBUTION_MARKERS) {
    const found = marker.pattern.exec(text);
    if (found) {
      matches.push({ marker, matched: found[0] });
    }
  }
  return matches;
}

// src/delivery/attribution-config.ts
init_esm_shims();
var AI_ATTRIBUTION_MODES = ["keep", "strip"];
var DEFAULT_AI_ATTRIBUTION_MODE = "strip";
function resolveAiAttributionMode(projectRoot, env = process.env) {
  return resolveFlooredMode(
    {
      team: readConfigsDir(projectRoot).merged.get("ai_attribution"),
      local: readDotConfig(projectRoot).get("ai_attribution"),
      env: env.PAQAD_AI_ATTRIBUTION
    },
    AI_ATTRIBUTION_MODES,
    DEFAULT_AI_ATTRIBUTION_MODE
  );
}
function shouldStripAiAttribution(projectRoot, env = process.env) {
  return resolveAiAttributionMode(projectRoot, env) === "strip";
}

// src/delivery/delivery-check.ts
var GH_TIMEOUT_MS = 1e4;
var NO_CHECK = {
  ran: false,
  branch: null,
  commit: null,
  ghAvailable: false,
  findings: []
};
var NO_OP = { ran: false, blocking: false, summary: "" };
function allowedBranchTypes(policy) {
  return Array.from(new Set(Object.values(policy.process.branch.type_map))).filter(Boolean);
}
async function readLine(run, command, args) {
  const result = await run(command, args);
  if (result.exitCode !== 0) {
    return null;
  }
  const line = result.stdout.trim();
  return line.length > 0 ? line : null;
}
async function readBranchCommitMessages(run, projectRoot, branch, base) {
  const range = branch === base ? ["-1"] : [`${base}..HEAD`];
  const result = await run("git", ["-C", projectRoot, "log", ...range, "--format=%B"]);
  return result.exitCode === 0 ? result.stdout : "";
}
function attributionFindings(commitMessages, prBody) {
  const inCommits = new Map(
    detectAiAttribution(commitMessages).map((match) => [match.marker.id, match.marker])
  );
  const inPrBody = new Map(
    detectAiAttribution(prBody).map((match) => [match.marker.id, match.marker])
  );
  const findings = [];
  for (const marker of AI_ATTRIBUTION_MARKERS) {
    const commits = inCommits.has(marker.id);
    const body = inPrBody.has(marker.id);
    if (!commits && !body) {
      continue;
    }
    const where = commits && body ? "your commits and the PR body" : commits ? "your commits" : "the PR body";
    findings.push({
      code: "ai-attribution",
      message: `${marker.vendor} attribution is on ${where}. That trailer is what makes the repo list an AI vendor as a contributor. ${marker.remediation}`
    });
  }
  return findings;
}
var FAILING = /* @__PURE__ */ new Set(["FAILURE", "ERROR", "TIMED_OUT", "CANCELLED", "ACTION_REQUIRED"]);
function rollupHasFailure(rollup) {
  if (!Array.isArray(rollup)) {
    return false;
  }
  return rollup.some((entry) => {
    const check = entry;
    const conclusion = typeof check.conclusion === "string" ? check.conclusion.toUpperCase() : "";
    const state = typeof check.state === "string" ? check.state.toUpperCase() : "";
    return FAILING.has(conclusion) || FAILING.has(state);
  });
}
var PASSING = /* @__PURE__ */ new Set(["SUCCESS", "NEUTRAL", "SKIPPED"]);
function upper(value) {
  return typeof value === "string" ? value.toUpperCase() : "";
}
function textOrNull(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}
function countOrNull(value) {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : null;
}
function rollupJobs(rollup) {
  const entries = Array.isArray(rollup) ? rollup : [];
  return entries.map((entry) => ({
    name: textOrNull(entry.name) ?? textOrNull(entry.context) ?? "check",
    status: textOrNull(entry.status) ?? textOrNull(entry.state),
    conclusion: textOrNull(entry.conclusion),
    started_at: textOrNull(entry.startedAt),
    completed_at: textOrNull(entry.completedAt)
  }));
}
var PR_STATES = {
  OPEN: "open",
  MERGED: "merged",
  CLOSED: "closed"
};
function readPrState(value) {
  return PR_STATES[upper(value)] ?? null;
}
function readRollup(rollup) {
  const entries = Array.isArray(rollup) ? rollup : [];
  if (entries.length === 0) {
    return { state: "unknown", done: 0, total: 0, reason: "no checks reported", jobs: [] };
  }
  let done = 0;
  let failed = false;
  for (const entry of entries) {
    const outcome = upper(entry.conclusion) || upper(entry.state);
    if (FAILING.has(outcome)) failed = true;
    if (FAILING.has(outcome) || PASSING.has(outcome)) done += 1;
  }
  const total = entries.length;
  const state = failed ? "fail" : done === total ? "pass" : "pending";
  return { state, done, total, reason: null, jobs: rollupJobs(entries) };
}
function ghFailureReason(result) {
  const text = `${result.stderr ?? ""}
${result.stdout}`.toLowerCase();
  if (result.timedOut) return `gh timed out after ${GH_TIMEOUT_MS / 1e3} s`;
  if (result.missing) return "gh is not installed";
  if (text.includes("rate limit")) return "gh is rate-limited";
  if (text.includes("auth login") || text.includes("not logged in")) return "gh is signed out";
  if (text.includes("no pull requests found")) return "no pull request for this branch";
  return "gh could not read the pull request";
}
async function evaluateDelivery(input) {
  const { projectRoot, policy, run } = input;
  if (!policy.enabled) {
    return NO_CHECK;
  }
  const branch = await readLine(run, "git", [
    "-C",
    projectRoot,
    "rev-parse",
    "--abbrev-ref",
    "HEAD"
  ]);
  if (!branch || branch === "HEAD") {
    return NO_CHECK;
  }
  const commit = await readLine(run, "git", ["-C", projectRoot, "rev-parse", "HEAD"]);
  const findings = [];
  const base = policy.process.branch.base;
  if (branch === base) {
    findings.push({
      code: "on-base-branch",
      message: `you're committing on \`${base}\` \u2014 the workflow expects a \`{type}/\u2026\` branch you open a PR from.`
    });
  } else {
    const types = allowedBranchTypes(policy);
    const shaped = types.some((type) => branch.startsWith(`${type}/`));
    if (!shaped && types.length > 0) {
      findings.push({
        code: "branch-shape",
        message: `branch \`${branch}\` doesn't match the \`{type}/\u2026\` convention (expected one of: ${types.map((type) => `${type}/`).join(", ")}).`
      });
    }
  }
  let ghAvailable = false;
  let prBody = "";
  let prReading = null;
  let ciReading;
  const prView = await run("gh", [
    "pr",
    "view",
    branch,
    "--json",
    "number,url,state,headRefOid,statusCheckRollup,body,isDraft,title,changedFiles,additions,deletions"
  ]);
  if (prView.exitCode === 0) {
    ghAvailable = true;
    try {
      const pr = JSON.parse(prView.stdout);
      prBody = typeof pr.body === "string" ? pr.body : "";
      prReading = {
        number: typeof pr.number === "number" ? pr.number : null,
        url: typeof pr.url === "string" ? pr.url : null,
        draft: typeof pr.isDraft === "boolean" ? pr.isDraft : null,
        state: readPrState(pr.state),
        head_sha: textOrNull(pr.headRefOid),
        title: textOrNull(pr.title),
        changed_files: countOrNull(pr.changedFiles),
        additions: countOrNull(pr.additions),
        deletions: countOrNull(pr.deletions)
      };
      ciReading = readRollup(pr.statusCheckRollup);
      if (policy.process.ci.gate === "wait_for_green" && rollupHasFailure(pr.statusCheckRollup)) {
        const label = typeof pr.number === "number" ? ` for PR #${pr.number}` : "";
        findings.push({
          code: "ci-red",
          message: `CI is red${label} \u2014 the delivery policy gates merge on green (\`wait_for_green\`).`
        });
      }
    } catch {
      ghAvailable = false;
      prReading = null;
      ciReading = {
        state: "unknown",
        done: null,
        total: null,
        reason: "gh returned unreadable output"
      };
    }
  } else {
    ciReading = { state: "unknown", done: null, total: null, reason: ghFailureReason(prView) };
  }
  if (shouldStripAiAttribution(projectRoot)) {
    const commitMessages = await readBranchCommitMessages(run, projectRoot, branch, base);
    findings.push(...attributionFindings(commitMessages, prBody));
  }
  return { ran: true, branch, commit, ghAvailable, findings, pr: prReading, ci: ciReading };
}
function saveDeliveryReading(projectRoot, result, now = () => /* @__PURE__ */ new Date()) {
  if (!result.ran || !result.branch) return;
  try {
    const dirName = resolveDeliveryFeatureByBranch(projectRoot, result.branch);
    if (!dirName) return;
    const patch = {};
    if (result.pr) patch.pr = result.pr;
    if (result.ci) patch.ci = { sha: result.commit, ...result.ci, source: "stop-check" };
    if (Object.keys(patch).length > 0) recordShip(projectRoot, dirName, patch, now().toISOString());
  } catch (error) {
    appendHooksLog(
      projectRoot,
      `delivery-check: delivery.json not updated: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
function formatDeliverySummary(result) {
  if (result.findings.length === 0) {
    return "";
  }
  const lines = result.findings.map((finding) => `> - \u{1F7E1} ${finding.message}`);
  return `**\u25B8 paqad** \xB7 checked how this change would ship
> Heads up \u2014 a delivery convention to tidy before you push (not blocking):
` + lines.join("\n");
}
async function runDeliveryCapability(projectRoot, seam, run) {
  if (seam !== "completion") {
    return NO_OP;
  }
  const { policy } = loadDeliveryPolicy(projectRoot);
  const result = await evaluateDelivery({ projectRoot, policy, run });
  if (!result.ran) {
    return NO_OP;
  }
  saveDeliveryReading(projectRoot, result);
  recordProjectEvent(
    projectRoot,
    DELIVERY_EVIDENCE_DOC_TYPE,
    {
      kind: "delivery-check",
      branch: result.branch,
      commit: result.commit,
      gh_available: result.ghAvailable,
      findings: result.findings
    },
    DELIVERY_EVIDENCE_SCHEMA_VERSION
  );
  const summary = formatDeliverySummary(result);
  return summary ? { ran: true, blocking: false, summary } : NO_OP;
}
var execaCommandRunner = async (command, args) => {
  const result = await execa(command, args, { reject: false, timeout: GH_TIMEOUT_MS });
  const missing = result.code === "ENOENT" || result.exitCode !== 0 && !result.timedOut && !isOnPath(command);
  return {
    stdout: result.stdout,
    stderr: result.stderr,
    exitCode: result.exitCode ?? 1,
    timedOut: result.timedOut,
    missing
  };
};

// src/planning/decision-selfarm.ts
init_esm_shims();
import { readFileSync as readFileSync12 } from "fs";
var ARMED_CATEGORIES = [
  { category: "create-vs-reuse", minConfidence: 0.92 },
  { category: "architecture-path", minConfidence: 0.9 }
];
var TTL_DAYS = 30;
var NO_OP2 = { ran: false, blocking: false, summary: "" };
function isTruthy(value) {
  return value !== void 0 && ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}
function isSelfArmEnabled(projectRoot, env, opts = {}) {
  const envValue = env.PAQAD_DECISION_SELFARM;
  if (envValue !== void 0 && envValue !== "") {
    return isTruthy(envValue);
  }
  const configValue = readDotConfig(projectRoot).get("decision_selfarm");
  if (configValue !== void 0 && configValue !== "") {
    return isTruthy(configValue);
  }
  return opts.featureDevelopment === true;
}
function sessionOnFeatureDevelopment(projectRoot, sessionId) {
  if (!sessionId) return false;
  const state = readWorkflowState(projectRoot, resolveSessionId(projectRoot, sessionId));
  if (state.active && isFeatureDevelopmentRoute(state.active.workflow)) return true;
  return state.paused.some((entry) => isFeatureDevelopmentRoute(entry.workflow));
}
function lastUserPromptFromTranscript(transcriptText) {
  const lines = transcriptText.split("\n");
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i].trim();
    if (!line) continue;
    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      continue;
    }
    const record = entry;
    const role = record.message?.role ?? record.role ?? record.type;
    if (role === "user") {
      const text = extractText(
        record.message?.content ?? record.content
      );
      if (text) return text;
    }
  }
  return "";
}
function extractText(content) {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((part) => {
      const block = part;
      return block.type === "text" && typeof block.text === "string" ? block.text : "";
    }).join(" ").trim();
  }
  return "";
}
function selfArmDecision(input) {
  const armedFork = detectDecisionForks(input.promptText).find(
    (fork) => ARMED_CATEGORIES.some(
      (armed) => armed.category === fork.category && fork.confidence >= armed.minConfidence
    )
  );
  if (!armedFork) {
    return { minted: null, reason: "no-fork", category: null };
  }
  if (!input.sessionId) {
    return { minted: null, reason: "no-session", category: null };
  }
  const category = armedFork.category;
  const store = input.store ?? new DecisionStore(input.projectRoot);
  store.initialize();
  if (store.listPendingDecisionIds().length > 0) {
    return { minted: null, reason: "pending-exists", category };
  }
  const targetFile = input.targetPath || "src/unknown.ts";
  const options = decisionOptionsForCategory(input.projectRoot, category, targetFile).options;
  const question = decisionQuestionForCategory(category);
  const fingerprint2 = computeDecisionFingerprint({
    category,
    question,
    option_keys: options.map((option) => option.option_key),
    repo_state: { active_capabilities: ["coding"] }
  });
  if (store.findReusableDecision({ fingerprint: fingerprint2, category, options })) {
    return { minted: null, reason: "already-decided", category };
  }
  const now = input.now?.() ?? /* @__PURE__ */ new Date();
  const packet = {
    decision_id: store.nextDecisionId(),
    fingerprint: fingerprint2,
    category,
    question,
    context: contextForCategory(category, targetFile),
    options,
    confidence: armedFork.confidence,
    requested_by: "paqad",
    task_session_id: input.sessionId,
    created_at: now.toISOString(),
    status: "pending",
    ttl_until: new Date(now.getTime() + TTL_DAYS * 24 * 60 * 60 * 1e3).toISOString(),
    invalidation_watch: [targetFile]
  };
  try {
    store.writePending(packet);
    return { minted: packet.decision_id, reason: "minted", category };
  } catch {
    return { minted: null, reason: "write-failed", category };
  }
}
function contextForCategory(category, targetFile) {
  return category === "architecture-path" ? `This looks like a which-path choice that affects ${targetFile}. Pick the path before more is built on it.` : `This looks like a reuse-or-create choice that affects ${targetFile}. Pick the path before more is built on it.`;
}
function mintedSummary(category) {
  const headline = category === "architecture-path" ? `I hit a which-path choice that's yours to make` : `I hit a reuse-or-create choice that's yours to make`;
  return `**\u25B8 paqad** \xB7 ${headline}
> I paused and wrote it up so you can pick the path \u2014 answer the decision, then I'll continue.`;
}
function runDecisionSelfArm(input) {
  if (input.seam !== "pre-mutation") return NO_OP2;
  const featureDevelopment = sessionOnFeatureDevelopment(
    input.projectRoot,
    input.payload?.sessionId ?? input.env.CLAUDE_SESSION_ID ?? null
  );
  if (!isSelfArmEnabled(input.projectRoot, input.env, { featureDevelopment })) return NO_OP2;
  const transcriptPath = input.payload?.transcriptPath;
  const sessionId = input.payload?.sessionId ?? null;
  if (!transcriptPath || !sessionId) return NO_OP2;
  let promptText;
  try {
    const read = input.readTranscript ?? ((path) => readFileSync12(path, "utf8"));
    promptText = lastUserPromptFromTranscript(read(transcriptPath));
  } catch {
    return NO_OP2;
  }
  if (!promptText) return NO_OP2;
  const result = selfArmDecision({
    projectRoot: input.projectRoot,
    promptText,
    sessionId,
    targetPath: input.payload?.targetPath ?? null
  });
  return result.minted && result.category ? { ran: true, blocking: false, summary: mintedSummary(result.category) } : (
    /* v8 ignore stop */
    NO_OP2
  );
}

// src/spec/spec-change-guard.ts
init_esm_shims();
import { readFileSync as readFileSync19 } from "fs";
import { join as join21 } from "path";

// src/feature-evidence/projections.ts
init_esm_shims();

// src/feature-evidence/artifacts.ts
init_esm_shims();
import { mkdirSync as mkdirSync10, readFileSync as readFileSync17, renameSync as renameSync6, writeFileSync as writeFileSync11 } from "fs";
import { dirname as dirname11, join as join19 } from "path";

// src/visual-evidence/readiness.ts
init_esm_shims();

// src/site-map/store.ts
init_esm_shims();
var import_yaml2 = __toESM(require_dist(), 1);
import {
  existsSync as existsSync10,
  mkdirSync as mkdirSync7,
  readFileSync as readFileSync13,
  readdirSync as readdirSync6,
  renameSync as renameSync3,
  rmSync,
  writeFileSync as writeFileSync7
} from "fs";
import { dirname as dirname9, join as join15 } from "path";

// src/site-map/schema.ts
init_esm_shims();
var import_ajv3 = __toESM(require_ajv(), 1);

// src/validators/schemas/app-map.schema.json
var app_map_schema_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "paqad://schemas/app-map.json",
  title: "Site map \u2014 application behavioural map (app-map.yaml)",
  type: "object",
  additionalProperties: false,
  required: ["schema_version", "app", "surfaces"],
  properties: {
    schema_version: { type: "integer", const: 1 },
    app: { $ref: "#/$defs/app" },
    actors: { type: "array", items: { $ref: "#/$defs/actor" } },
    guards: { type: "array", items: { $ref: "#/$defs/guard" } },
    areas: { type: "array", items: { $ref: "#/$defs/area" } },
    surfaces: { type: "array", items: { $ref: "#/$defs/surface" } },
    journeys: { type: "array", items: { $ref: "#/$defs/journeyIndexEntry" } }
  },
  $defs: {
    appKind: {
      type: "string",
      enum: ["web", "api", "cli", "mobile", "desktop", "service", "llm-workflows"]
    },
    visibility: { type: "string", enum: ["frontstage", "backstage"] },
    derivation: { type: "string", enum: ["static", "convention", "agent", "human"] },
    confidence: { type: "string", enum: ["high", "medium", "low"] },
    trustTier: {
      type: "string",
      enum: ["unverified", "inferred", "proven-in-code", "proven-by-test", "human-confirmed"]
    },
    guardKind: {
      type: "string",
      enum: [
        "permission",
        "role",
        "feature-flag",
        "auth-state",
        "data-state",
        "capability",
        "environment"
      ]
    },
    guardRef: {
      oneOf: [
        { type: "string", minLength: 1 },
        { type: "array", items: { type: "string", minLength: 1 } }
      ]
    },
    evidenceItem: {
      type: "object",
      additionalProperties: false,
      required: ["file"],
      properties: {
        file: { type: "string", minLength: 1 },
        line: { type: "integer", minimum: 1 },
        note: { type: "string" }
      }
    },
    evidenceRef: {
      oneOf: [
        { $ref: "#/$defs/evidenceItem" },
        { type: "array", items: { $ref: "#/$defs/evidenceItem" } }
      ]
    },
    endsValue: { type: ["boolean", "string"] },
    ends: {
      type: "object",
      additionalProperties: false,
      properties: {
        success: { $ref: "#/$defs/endsValue" },
        failure: { $ref: "#/$defs/endsValue" },
        abandoned: { $ref: "#/$defs/endsValue" }
      }
    },
    app: {
      type: "object",
      additionalProperties: false,
      required: ["name", "kind"],
      properties: {
        name: { type: "string", minLength: 1 },
        kind: {
          oneOf: [
            { $ref: "#/$defs/appKind" },
            { type: "array", items: { $ref: "#/$defs/appKind" }, minItems: 1 }
          ]
        },
        frameworks: { type: "array", items: { type: "string" } },
        generated_from: { type: "string" },
        freshness: {
          type: "object",
          additionalProperties: false,
          required: ["anchors_total", "anchors_resolved", "anchors_broken"],
          properties: {
            anchors_total: { type: "integer", minimum: 0 },
            anchors_resolved: { type: "integer", minimum: 0 },
            anchors_broken: { type: "integer", minimum: 0 }
          }
        },
        language: {
          oneOf: [
            { type: "string", minLength: 1 },
            {
              type: "object",
              additionalProperties: false,
              required: ["default_locale"],
              properties: {
                default_locale: { type: "string", minLength: 1 },
                locales: { type: "array", items: { type: "string" } },
                catalogs: { type: "array", items: { type: "string" } },
                label_policy: { type: "string" }
              }
            }
          ]
        }
      }
    },
    actor: {
      type: "object",
      additionalProperties: false,
      required: ["id", "label"],
      properties: {
        id: { type: "string", minLength: 1 },
        label: { type: "string", minLength: 1 },
        satisfies: { type: "array", items: { type: "string" } },
        note: { type: "string" }
      }
    },
    guard: {
      type: "object",
      additionalProperties: false,
      required: ["id", "kind", "label"],
      properties: {
        id: { type: "string", minLength: 1 },
        kind: { $ref: "#/$defs/guardKind" },
        label: { type: "string", minLength: 1 },
        requires: { type: "string" },
        satisfy_via: { type: "string" },
        evidence: { $ref: "#/$defs/evidenceRef" },
        flag_key: { type: "string" },
        required_variant: { type: "string" },
        provider: { type: "string" },
        owner: { type: "string" },
        lifecycle: {
          type: "string",
          enum: ["new", "active", "launched", "inactive", "stale"]
        },
        introduced: { type: "string" },
        note: { type: "string" },
        trust: { $ref: "#/$defs/trustTier" }
      }
    },
    area: {
      type: "object",
      additionalProperties: false,
      required: ["id", "label"],
      properties: {
        id: { type: "string", minLength: 1 },
        label: { type: "string", minLength: 1 },
        visibility: { $ref: "#/$defs/visibility" },
        guard: { $ref: "#/$defs/guardRef" }
      }
    },
    surfaceEntry: {
      type: "object",
      additionalProperties: false,
      required: ["kind"],
      properties: {
        kind: { type: "string", minLength: 1 },
        value: { type: "string" },
        deep_link: { type: "boolean" }
      }
    },
    surfaceVariant: {
      type: "object",
      additionalProperties: false,
      required: ["flag", "variant"],
      properties: {
        flag: { type: "string", minLength: 1 },
        variant: { type: "string", minLength: 1 },
        adds: { type: "string" },
        changes: { type: "string" }
      }
    },
    handOff: {
      type: "object",
      additionalProperties: false,
      properties: {
        carries: { type: "string" },
        returns: { type: "boolean" }
      }
    },
    flowStep: {
      type: "object",
      additionalProperties: false,
      required: ["id"],
      properties: {
        id: { type: "string", minLength: 1 },
        label: { type: "string" },
        type: { type: "string" },
        visibility: { $ref: "#/$defs/visibility" },
        visible: { type: "string" },
        artifact: { type: "string" },
        presents: { type: "string" },
        decisions: { type: "array", items: { type: "string" } },
        resumable: { type: "boolean" },
        inputs: { type: "array", items: { type: "string" } },
        outputs: { type: "array", items: { type: "string" } }
      }
    },
    transition: {
      type: "object",
      additionalProperties: false,
      required: ["to", "trigger"],
      properties: {
        to: { type: "string", minLength: 1 },
        trigger: { type: "string", minLength: 1 },
        guard: { $ref: "#/$defs/guardRef" },
        guard_not: { type: "string" },
        note: { type: "string" },
        via: { type: "string" },
        carries: { type: "string" },
        visibility: { $ref: "#/$defs/visibility" },
        evidence: { $ref: "#/$defs/evidenceRef" },
        confidence: { $ref: "#/$defs/confidence" },
        trust: { $ref: "#/$defs/trustTier" },
        mode: { type: "string", enum: ["link", "call"] },
        guard_text: { type: "string" },
        guard_mode: { type: "string", enum: ["deterministic", "llm-judged"] },
        utterances: { type: "array", items: { type: "string" } },
        fallback: { type: "boolean" },
        routing_description: { type: "string" }
      }
    },
    surface: {
      type: "object",
      additionalProperties: false,
      required: ["id", "kind", "label"],
      properties: {
        id: { type: "string", minLength: 1 },
        kind: {
          type: "string",
          enum: [
            "page",
            "screen",
            "modal",
            "action",
            "api",
            "cli-command",
            "job",
            "webhook",
            "email",
            "external-system",
            "prompt-entry",
            "router",
            "llm-workflow",
            "step",
            "decision-pause",
            "handoff",
            "subflow",
            "terminal"
          ]
        },
        label: { type: "string", minLength: 1 },
        label_key: { type: "string" },
        label_source: { type: "string" },
        labels: { type: "object", additionalProperties: { type: "string" } },
        area: { type: "string" },
        entry: { $ref: "#/$defs/surfaceEntry" },
        page_type: { type: "string" },
        module: { type: "string" },
        guard: { $ref: "#/$defs/guardRef" },
        guard_not: { type: "string" },
        evidence: { $ref: "#/$defs/evidenceRef" },
        derivation: { $ref: "#/$defs/derivation" },
        confidence: { $ref: "#/$defs/confidence" },
        trust: { $ref: "#/$defs/trustTier" },
        visibility: { $ref: "#/$defs/visibility" },
        variants: { type: "array", items: { $ref: "#/$defs/surfaceVariant" } },
        variant_group: { type: "string" },
        variant_of: { type: "string" },
        status: { type: "string" },
        oracle: { type: "object", additionalProperties: { type: "string" } },
        hand_off: { $ref: "#/$defs/handOff" },
        ends: { $ref: "#/$defs/ends" },
        note: { type: "string" },
        actor: { type: "string" },
        intent: { type: "string" },
        routing_description: { type: "string" },
        utterances: { type: "array", items: { type: "string" } },
        steps: { type: "array", items: { $ref: "#/$defs/flowStep" } },
        transitions: { type: "array", items: { $ref: "#/$defs/transition" } }
      }
    },
    journeyIndexEntry: {
      type: "object",
      additionalProperties: false,
      required: ["id", "label"],
      properties: {
        id: { type: "string", minLength: 1 },
        label: { type: "string", minLength: 1 },
        actor: { type: "string" },
        priority: { type: "string" },
        status: { type: "string", enum: ["proposed", "confirmed", "locked"] },
        trust: { $ref: "#/$defs/trustTier" }
      }
    }
  }
};

// src/validators/schemas/journey.schema.json
var journey_schema_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "paqad://schemas/journey.json",
  title: "Site map \u2014 curated journey (journeys/<id>.journey.yaml)",
  type: "object",
  additionalProperties: false,
  required: ["schema_version", "id", "label", "actor", "goal", "entry", "steps", "status"],
  properties: {
    schema_version: { type: "integer", const: 1 },
    id: { type: "string", minLength: 1 },
    label: { type: "string", minLength: 1 },
    actor: { type: "string", minLength: 1 },
    on_behalf_of: { type: "string" },
    goal: { type: "string", minLength: 1 },
    entry: { type: "string", minLength: 1 },
    uses: { type: "array", items: { type: "string" } },
    steps: { type: "array", items: { $ref: "#/$defs/journeyStep" } },
    branches: { type: "array", items: { type: "object" } },
    ends: { $ref: "#/$defs/journeyEnds" },
    next_journeys: { type: "array", items: { type: "string" } },
    tests: {
      type: "array",
      items: {
        oneOf: [
          { type: "string" },
          { type: "null" },
          {
            type: "object",
            additionalProperties: false,
            properties: {
              spec: { type: ["string", "null"] },
              variant: { type: "string" }
            }
          }
        ]
      }
    },
    priority: { type: "string" },
    status: { type: "string", enum: ["proposed", "confirmed", "locked"] },
    derivation: { type: "string", enum: ["static", "convention", "agent", "human"] },
    evidence: {
      oneOf: [
        { $ref: "#/$defs/evidenceItem" },
        { type: "array", items: { $ref: "#/$defs/evidenceItem" } }
      ]
    }
  },
  $defs: {
    evidenceItem: {
      type: "object",
      additionalProperties: false,
      required: ["file"],
      properties: {
        file: { type: "string", minLength: 1 },
        line: { type: "integer", minimum: 1 },
        note: { type: "string" }
      }
    },
    journeyStep: {
      type: "object",
      additionalProperties: false,
      required: ["surface"],
      properties: {
        surface: { type: "string", minLength: 1 },
        action: { type: "string" },
        expect: { type: "string" },
        step: { type: "string" },
        type: { type: "string" },
        variant: {
          type: "object",
          additionalProperties: false,
          properties: {
            group: { type: "string" },
            when: { type: "string" }
          }
        }
      }
    },
    journeyEnds: {
      type: "object",
      additionalProperties: false,
      properties: {
        success: {},
        failure: {},
        abandoned: {}
      }
    }
  }
};

// src/validators/schemas/journey-capture.schema.json
var journey_capture_schema_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "paqad://schemas/journey-capture.json",
  title: "Site map \u2014 journey capture script (journeys/<id>.capture.yaml)",
  type: "object",
  additionalProperties: false,
  required: ["schema_version", "journey", "steps"],
  properties: {
    schema_version: { type: "integer", const: 1 },
    journey: { type: "string", minLength: 1 },
    setup: {
      type: "array",
      items: { $ref: "#/$defs/setupStep" }
    },
    steps: {
      type: "array",
      minItems: 1,
      items: { $ref: "#/$defs/captureStep" }
    }
  },
  $defs: {
    captureAction: {
      type: "object",
      additionalProperties: false,
      required: ["selector", "do"],
      properties: {
        selector: { type: "string", minLength: 1 },
        do: { type: "string", enum: ["click", "fill", "select", "press", "wait_for"] },
        value: { type: "string" }
      }
    },
    setupStep: {
      type: "object",
      additionalProperties: false,
      properties: {
        goto: { type: "string" },
        actions: { type: "array", items: { $ref: "#/$defs/captureAction" } }
      }
    },
    captureStep: {
      type: "object",
      additionalProperties: false,
      required: ["journey_step"],
      properties: {
        journey_step: { type: "integer", minimum: 1 },
        goto: { type: "string" },
        actions: { type: "array", items: { $ref: "#/$defs/captureAction" } },
        screenshot: { type: "boolean" }
      }
    }
  }
};

// src/validators/schemas/site-map-answers.schema.json
var site_map_answers_schema_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "paqad://schemas/site-map-answers.json",
  title: "Site-map creation answers (issue #466, Part A)",
  type: "object",
  additionalProperties: false,
  required: ["schema_version", "generated_by", "answers"],
  properties: {
    schema_version: { type: "integer", const: 1 },
    generated_by: { type: "string", const: "paqad-ai" },
    answers: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["question_id", "category", "question", "answer", "decided_by", "anchors"],
        properties: {
          question_id: { type: "string", minLength: 1 },
          category: {
            type: "string",
            enum: [
              "app-kind",
              "actors-roles",
              "sensitive-surface",
              "journey-priority",
              "labels-language",
              "grouping",
              "tool-access",
              "journey-scope"
            ]
          },
          question: { type: "string", minLength: 1 },
          answer: { type: "string" },
          decided_by: { type: "string", enum: ["human", "default"] },
          anchors: { type: "array", items: { type: "string" } }
        }
      }
    }
  }
};

// src/site-map/schema.ts
var ajv3 = new import_ajv3.default({ allErrors: true, allowUnionTypes: true });
var compiledAppMap;
var compiledJourney;
var compiledJourneyCapture;
var compiledAnswers;
function appMapValidator() {
  if (!compiledAppMap) {
    compiledAppMap = ajv3.compile(app_map_schema_default);
  }
  return compiledAppMap;
}
function journeyValidator() {
  if (!compiledJourney) {
    compiledJourney = ajv3.compile(journey_schema_default);
  }
  return compiledJourney;
}
function journeyCaptureValidator() {
  if (!compiledJourneyCapture) {
    compiledJourneyCapture = ajv3.compile(journey_capture_schema_default);
  }
  return compiledJourneyCapture;
}
function answersValidator() {
  if (!compiledAnswers) {
    compiledAnswers = ajv3.compile(site_map_answers_schema_default);
  }
  return compiledAnswers;
}
function toValidation(validate, data) {
  if (validate(data)) {
    return { valid: true, errors: [] };
  }
  const rawErrors = validate.errors ?? [];
  const errors = rawErrors.map((error) => {
    const path = error.instancePath.length > 0 ? error.instancePath : "/";
    const message = error.message ?? "invalid";
    return `${path} ${message}`.trim();
  });
  return { valid: false, errors };
}
function validateAppMap(data) {
  return toValidation(appMapValidator(), data);
}
function validateJourney(data) {
  return toValidation(journeyValidator(), data);
}
function validateJourneyCapture(data) {
  return toValidation(journeyCaptureValidator(), data);
}
function validateSiteMapAnswers(data) {
  return toValidation(answersValidator(), data);
}

// src/site-map/store.ts
var SiteMapSchemaError = class extends Error {
  constructor(message, errors) {
    super(message);
    this.errors = errors;
    this.name = "SiteMapSchemaError";
  }
  errors;
};
var JOURNEY_SUFFIX = ".journey.yaml";
function canonicalAppMapPath(projectRoot) {
  return join15(projectRoot, PATHS.SITE_MAP_CANONICAL_APP_MAP);
}
function journeysDir(projectRoot) {
  return join15(projectRoot, PATHS.SITE_MAP_CANONICAL_JOURNEYS_DIR);
}
function journeyPath(projectRoot, id) {
  return join15(journeysDir(projectRoot), `${id}${JOURNEY_SUFFIX}`);
}
function writeYamlAtomic(target, data) {
  mkdirSync7(dirname9(target), { recursive: true });
  const tmp = `${target}.tmp`;
  writeFileSync7(tmp, import_yaml2.default.stringify(data), "utf8");
  renameSync3(tmp, target);
  return target;
}
function readYaml(target) {
  try {
    return import_yaml2.default.parse(readFileSync13(target, "utf8"));
  } catch {
    return null;
  }
}
function writeCanonicalSiteMap(projectRoot, map) {
  const result = validateAppMap(map);
  if (!result.valid) {
    throw new SiteMapSchemaError("canonical app-map failed schema validation", result.errors);
  }
  return writeYamlAtomic(canonicalAppMapPath(projectRoot), map);
}
function readCanonicalSiteMap(projectRoot) {
  const parsed = readYaml(canonicalAppMapPath(projectRoot));
  if (parsed === null) return null;
  return validateAppMap(parsed).valid ? parsed : null;
}
function writeJourney(projectRoot, journey) {
  const result = validateJourney(journey);
  if (!result.valid) {
    throw new SiteMapSchemaError(`journey "${journey.id}" failed schema validation`, result.errors);
  }
  return writeYamlAtomic(journeyPath(projectRoot, journey.id), journey);
}
function removeJourney(projectRoot, id) {
  const target = journeyPath(projectRoot, id);
  if (!existsSync10(target)) return false;
  rmSync(target, { force: true });
  return true;
}
function readJourneyAt(path) {
  const parsed = readYaml(path);
  if (parsed === null) return null;
  return validateJourney(parsed).valid ? parsed : null;
}
function listJourneyIdsIn(dir) {
  let names;
  try {
    names = readdirSync6(dir);
  } catch {
    return [];
  }
  return names.filter((name) => name.endsWith(JOURNEY_SUFFIX)).map((name) => name.slice(0, -JOURNEY_SUFFIX.length)).sort();
}
function readAllJourneysIn(dir) {
  const journeys = [];
  for (const id of listJourneyIdsIn(dir)) {
    const journey = readJourneyAt(join15(dir, `${id}${JOURNEY_SUFFIX}`));
    if (journey !== null) {
      journeys.push(journey);
    }
  }
  return journeys;
}
function readJourney(projectRoot, id) {
  return readJourneyAt(journeyPath(projectRoot, id));
}
function readAllJourneys(projectRoot) {
  return readAllJourneysIn(journeysDir(projectRoot));
}

// src/visual-evidence/capture-script.ts
init_esm_shims();
import { existsSync as existsSync11, readdirSync as readdirSync7 } from "fs";
var CAPTURE_SUFFIX = ".capture.yaml";
function hasValue(value) {
  return typeof value === "string" && value.length > 0;
}
function actionProblems(action, where) {
  const problems = [];
  const { do: verb, value } = action;
  if ((verb === "fill" || verb === "select" || verb === "press") && !hasValue(value)) {
    problems.push(`${where}: \`${verb}\` requires a value`);
  }
  if (verb === "wait_for" && value !== "visible" && value !== "hidden") {
    problems.push(`${where}: \`wait_for\` requires a value of "visible" or "hidden"`);
  }
  return problems;
}
function crossCheck(script, basename2, journey) {
  const problems = [];
  if (basename2 !== script.journey) {
    problems.push(
      `journey "${script.journey}" must equal the sibling file id "${basename2}" (${basename2}${CAPTURE_SUFFIX})`
    );
  }
  if (!journey) {
    problems.push(`journey "${script.journey}" does not resolve to an existing journey`);
    return problems;
  }
  if (journey.status !== "confirmed") {
    problems.push(
      `journey "${script.journey}" is ${journey.status}, not confirmed \u2014 only confirmed journeys produce evidence`
    );
  }
  const stepCount = journey.steps.length;
  let previous = 0;
  for (const step of script.steps) {
    if (step.journey_step < 1 || step.journey_step > stepCount) {
      problems.push(
        `journey_step ${step.journey_step} does not exist in journey "${script.journey}" (${stepCount} steps)`
      );
    }
    if (step.journey_step < previous) {
      problems.push(
        `steps must be ordered ascending by journey_step (saw ${step.journey_step} after ${previous})`
      );
    }
    previous = step.journey_step;
    for (const [i, action] of (step.actions ?? []).entries()) {
      problems.push(...actionProblems(action, `step ${step.journey_step} action ${i + 1}`));
    }
  }
  for (const [i, setup] of (script.setup ?? []).entries()) {
    for (const [j, action] of (setup.actions ?? []).entries()) {
      problems.push(...actionProblems(action, `setup ${i + 1} action ${j + 1}`));
    }
  }
  return problems;
}
function listCaptureScriptIds(projectRoot) {
  const dir = journeysDir(projectRoot);
  if (!existsSync11(dir)) return [];
  return readdirSync7(dir).filter((name) => name.endsWith(CAPTURE_SUFFIX)).map((name) => name.slice(0, -CAPTURE_SUFFIX.length)).sort();
}
function loadCaptureScripts(projectRoot) {
  const scripts = [];
  const errors = [];
  const dir = journeysDir(projectRoot);
  for (const basename2 of listCaptureScriptIds(projectRoot)) {
    const file = `docs/site-map/journeys/${basename2}${CAPTURE_SUFFIX}`;
    const parsed = readYaml(join(dir, `${basename2}${CAPTURE_SUFFIX}`));
    if (parsed === null) {
      errors.push({ file, errors: ["file is missing or not valid YAML"] });
      continue;
    }
    const shape = validateJourneyCapture(parsed);
    if (!shape.valid) {
      errors.push({ file, errors: shape.errors });
      continue;
    }
    const script = parsed;
    const journey = readJourney(projectRoot, script.journey);
    const problems = crossCheck(script, basename2, journey);
    if (problems.length > 0) {
      errors.push({ file, errors: problems });
      continue;
    }
    scripts.push({ file, script, journey });
  }
  return { scripts, errors };
}
function deriveCaption(journey, journeyStep) {
  const step = journey.steps[journeyStep - 1];
  const action = step?.action ?? "";
  const expect = step?.expect;
  return expect ? `${action}. ${expect}` : action;
}

// src/visual-evidence/provision.ts
init_esm_shims();
import { createRequire } from "module";
import { existsSync as existsSync12, mkdirSync as mkdirSync8, readFileSync as readFileSync14, writeFileSync as writeFileSync8 } from "fs";
import { homedir as homedir2 } from "os";
import { join as join16 } from "path";
function resolveVeRuntimeDir() {
  return join16(homedir2(), ".paqad-ai", "ve-runtime");
}
function provisionRecordPath(veRuntime) {
  return join16(veRuntime, "provision.json");
}
function browsersPath(veRuntime) {
  return join16(veRuntime, "browsers");
}
function resolvePlaywrightModulePath(veRuntime) {
  const req = createRequire(join16(veRuntime, "package.json"));
  return req.resolve("playwright");
}
function browserStatus(veRuntime = resolveVeRuntimeDir()) {
  let raw;
  try {
    raw = readFileSync14(provisionRecordPath(veRuntime), "utf8");
  } catch {
    return existsSync12(veRuntime) ? "broken" : "missing";
  }
  try {
    JSON.parse(raw);
    resolvePlaywrightModulePath(veRuntime);
    return "provisioned";
  } catch {
    return "broken";
  }
}
async function provisionBrowser(veRuntime = resolveVeRuntimeDir(), now = () => (/* @__PURE__ */ new Date()).toISOString()) {
  mkdirSync8(veRuntime, { recursive: true });
  const pkgPath = join16(veRuntime, "package.json");
  writeFileSync8(pkgPath, `${JSON.stringify({ private: true }, null, 2)}
`, "utf8");
  const env = { ...process.env, PLAYWRIGHT_BROWSERS_PATH: browsersPath(veRuntime) };
  await execa("npm", ["install", "playwright@^1", "--no-audit", "--no-fund"], {
    cwd: veRuntime,
    env
  });
  await execa("npx", ["playwright", "install", "chromium"], { cwd: veRuntime, env });
  const playwrightVersion = readInstalledPlaywrightVersion(veRuntime);
  const record = {
    schema_version: 1,
    playwright_version: playwrightVersion,
    provisioned_at: now()
  };
  writeFileSync8(provisionRecordPath(veRuntime), `${JSON.stringify(record, null, 2)}
`, "utf8");
  return record;
}
function readInstalledPlaywrightVersion(veRuntime) {
  const req = createRequire(join16(veRuntime, "package.json"));
  const pkg = JSON.parse(readFileSync14(req.resolve("playwright/package.json"), "utf8"));
  return pkg.version;
}
function veBrowsersPath(veRuntime = resolveVeRuntimeDir()) {
  return browsersPath(veRuntime);
}

// src/visual-evidence/trigger.ts
init_esm_shims();
function frontendGlobToRegExp(glob) {
  let out = "";
  let braceDepth = 0;
  for (let i = 0; i < glob.length; i += 1) {
    const ch = glob[i];
    const next = glob[i + 1];
    if (ch === "*" && next === "*") {
      if (glob[i + 2] === "/") {
        out += "(?:.*/)?";
        i += 2;
      } else {
        out += ".*";
        i += 1;
      }
      continue;
    }
    switch (ch) {
      case "*":
        out += "[^/]*";
        break;
      case "?":
        out += "[^/]";
        break;
      case "{":
        out += "(?:";
        braceDepth += 1;
        break;
      case "}":
        if (braceDepth > 0) {
          out += ")";
          braceDepth -= 1;
        } else {
          out += "\\}";
        }
        break;
      case ",":
        out += braceDepth > 0 ? "|" : "\\,";
        break;
      case ".":
      case "+":
      case "^":
      case "$":
      case "(":
      case ")":
      case "[":
      case "]":
      case "|":
      case "\\":
        out += `\\${ch}`;
        break;
      default:
        out += ch;
    }
  }
  return new RegExp(`^${out}$`);
}
function matchesFrontendGlob(file, glob) {
  return frontendGlobToRegExp(glob).test(file);
}
function toPosix(file) {
  return file.replace(/\\/g, "/");
}
function activeFrameworks(projectRoot) {
  const profile = readProjectProfile(projectRoot);
  if (!profile) return [];
  const frameworks = profile.stack_profile?.frameworks ?? [];
  const primary = getPrimaryStack({ stack_profile: profile.stack_profile });
  return [...new Set([...frameworks, primary].filter((name) => Boolean(name)))];
}
var PackRegistryEmptyError = class extends Error {
  runtimeRoot;
  frameworks;
  constructor(runtimeRoot, frameworks) {
    super(
      `paqad could not load its built-in stack packs (looked in ${runtimeRoot}) for ${frameworks.join(", ")}.`
    );
    this.name = "PackRegistryEmptyError";
    this.runtimeRoot = runtimeRoot;
    this.frameworks = frameworks;
  }
};
function packRegistryFaultDetail(runtimeRoot) {
  return `paqad could not load its built-in stack packs (looked in ${runtimeRoot}). This is an install fault, not a clean change.`;
}
var PACK_REGISTRY_FAULT_REMEDIATION = "run `paqad-ai doctor` and reinstall paqad-ai.";
function activeFrontendGlobs(projectRoot) {
  const frameworks = activeFrameworks(projectRoot);
  const packs = getPacksForFrameworks(frameworks, projectRoot);
  if (frameworks.length > 0 && packs.length === 0) {
    throw new PackRegistryEmptyError(getRuntimeRoot(), frameworks);
  }
  const out = [];
  for (const pack of packs) {
    for (const glob of pack.manifest.visual_evidence?.frontend_globs ?? []) {
      out.push({ pack: pack.manifest.name, glob });
    }
  }
  return out;
}
function frontendFilesOf(projectRoot, changedFiles) {
  const globs = activeFrontendGlobs(projectRoot);
  const matched = changedFiles.map(toPosix).filter((file) => globs.some(({ glob }) => matchesFrontendGlob(file, glob)));
  return [...new Set(matched)].sort();
}
function frontendTriggerOrFault(projectRoot, changedFiles) {
  try {
    const files = frontendFilesOf(projectRoot, changedFiles);
    return { triggered: files.length > 0, files, fault: null };
  } catch (error) {
    if (error instanceof PackRegistryEmptyError) {
      return { triggered: false, files: [], fault: { runtimeRoot: error.runtimeRoot } };
    }
    throw error;
  }
}
async function evaluateFrontendTrigger(projectRoot) {
  const change = await loadChangeEvidence(projectRoot);
  const changed = change.files.map(toPosix);
  const globs = activeFrontendGlobs(projectRoot);
  const matchedFiles = /* @__PURE__ */ new Set();
  const matchedGlobs = /* @__PURE__ */ new Set();
  const packs = /* @__PURE__ */ new Set();
  if (change.source !== "none") {
    for (const file of changed) {
      for (const { pack, glob } of globs) {
        if (matchesFrontendGlob(file, glob)) {
          matchedFiles.add(file);
          matchedGlobs.add(glob);
          packs.add(pack);
        }
      }
    }
  }
  return {
    triggered: matchedFiles.size > 0,
    matched_files: [...matchedFiles].sort(),
    matched_globs: [...matchedGlobs].sort(),
    packs: [...packs].sort(),
    changed_files: changed,
    source: change.source
  };
}

// src/visual-evidence/readiness.ts
function visualEvidenceReadiness(projectRoot) {
  const problems = [];
  if (!resolveFrameworkConfig(projectRoot).features.site_map) {
    problems.push({
      code: "site-map-off",
      detail: "visual_evidence is on but site_map is off \u2014 capture scripts derive from confirmed site-map journeys, so nothing can be captured.",
      remediation: "Turn on site_map (env PAQAD_SITE_MAP) and author a confirmed journey + capture script."
    });
  }
  if (!readAllJourneys(projectRoot).some((journey) => journey.status === "confirmed")) {
    problems.push({
      code: "no-confirmed-journey",
      detail: "visual_evidence is on but no confirmed journey exists under docs/site-map/journeys/ \u2014 only confirmed journeys produce evidence.",
      remediation: "Confirm a journey (paqad-ai sitemap journey confirm) so it can back a capture script."
    });
  }
  if (listCaptureScriptIds(projectRoot).length === 0) {
    problems.push({
      code: "no-capture-script",
      detail: "visual_evidence is on but no *.capture.yaml exists under docs/site-map/journeys/ \u2014 there is nothing to capture.",
      remediation: "Author a docs/site-map/journeys/<id>.capture.yaml for a confirmed journey (see docs/modules/visual-evidence)."
    });
  }
  if (browserStatus() !== "provisioned") {
    problems.push({
      code: "browser-not-provisioned",
      detail: "visual_evidence is on but the capture browser is not provisioned \u2014 a capture run would record playwright-not-provisioned.",
      remediation: "Run `paqad-ai visual-evidence setup` to provision Playwright + Chromium under ~/.paqad-ai/ve-runtime."
    });
  }
  return problems;
}
var READINESS_DECISION_TITLE = "Visual evidence is on, but I can't capture screenshots here yet";
var READINESS_WAIVE_OPTION = "waive";
function readinessToken(dirName) {
  return `[paqad-ve-readiness ${dirName}]`;
}
function visualEvidenceFlagOn(projectRoot) {
  if (!resolveFrameworkConfig(projectRoot).features.visual_evidence) return false;
  return readProjectProfile(projectRoot)?.active_capabilities?.includes("coding") ?? false;
}
function openVisualEvidenceReadinessPause(input) {
  const { projectRoot, dirName } = input;
  if (!visualEvidenceFlagOn(projectRoot)) return null;
  if (!frontendTriggerOrFault(projectRoot, [...input.files]).triggered) return null;
  const problems = visualEvidenceReadiness(projectRoot);
  if (problems.length === 0) return null;
  const token = readinessToken(dirName);
  if (readContractDecisions(projectRoot).some(({ packet }) => packet.context.includes(token))) {
    return null;
  }
  const reasons = problems.map((problem) => `- ${problem.detail}`).join("\n");
  const { id } = createPendingDecision(projectRoot, {
    category: "workflow-or-tool",
    title: READINESS_DECISION_TITLE,
    context: `This change touches frontend files and visual evidence is on, but a capture run cannot work here yet:
${reasons}
Pick how this change gets its visual evidence. ${token}`,
    options: [
      { option_key: "setup", label: "Set it up now (site map journey, capture script, browser)" },
      {
        option_key: "attach",
        label: "Attach my own screenshots with paqad-ai visual-evidence attach"
      },
      { option_key: READINESS_WAIVE_OPTION, label: "Record a waiver for this change" }
    ],
    recommendation: "setup",
    change: featureChangeKey(dirName)
  });
  return id;
}
function visualAcRequiredFiles(projectRoot, files) {
  if (!visualEvidenceFlagOn(projectRoot)) return [];
  return frontendTriggerOrFault(projectRoot, [...new Set(files)]).files;
}
function findVisualEvidenceWaiver(projectRoot, dirName) {
  const token = readinessToken(dirName);
  for (const { packet, status } of readContractDecisions(projectRoot)) {
    if (status !== "resolved" || !packet.context.includes(token)) continue;
    if (packet.chosen === READINESS_WAIVE_OPTION) return packet.id;
  }
  return null;
}
function visualEvidenceWaiverHint(projectRoot, dirName) {
  const token = readinessToken(dirName);
  const pending = readContractDecisions(projectRoot).find(
    ({ packet, status }) => status === "pending" && packet.context.includes(token)
  );
  if (pending) {
    return `resolve the pending readiness decision with \`paqad-ai decision resolve ${pending.packet.id} ${READINESS_WAIVE_OPTION}\``;
  }
  return `create one with \`paqad-ai decision create --category workflow-or-tool --title "Visual evidence waiver" --context "<why no screenshots> ${token}" --option ${READINESS_WAIVE_OPTION}="Waive visual evidence" --option attach="Attach screenshots"\` and resolve it with \`paqad-ai decision resolve <D-id> ${READINESS_WAIVE_OPTION}\``;
}

// src/feature-evidence/rename.ts
init_esm_shims();
import { existsSync as existsSync13, readFileSync as readFileSync15, readdirSync as readdirSync8, renameSync as renameSync4, writeFileSync as writeFileSync9 } from "fs";
import { join as join17 } from "path";
function backfillFeatureSlug(projectRoot, dirName, title, now) {
  const unchanged = { dirName, renamed: false };
  const parts = parseFeatureDirName(dirName);
  if (!parts || parts.slug !== UNTITLED_FEATURE_TITLE || parts.issue !== null || title.trim().length === 0) {
    return unchanged;
  }
  const minted = mintFeatureDirName({ title, ulid: parts.ulid });
  if (minted.slug === UNTITLED_FEATURE_TITLE || minted.dirName === dirName) {
    return unchanged;
  }
  const absOld = join17(projectRoot, featureDir(dirName));
  const absNew = join17(projectRoot, featureDir(minted.dirName));
  if (existsSync13(absNew)) {
    return unchanged;
  }
  try {
    renameSync4(absOld, absNew);
  } catch (error) {
    if (error.code !== "ENOENT") {
      return unchanged;
    }
  }
  repointSessionControls(projectRoot, dirName, minted.dirName, now);
  rewriteArtifactPaths(projectRoot, dirName, minted.dirName);
  updateFeatureRecord(
    projectRoot,
    minted.dirName,
    { title, slug: minted.slug, issue: minted.issue },
    now
  );
  return { dirName: minted.dirName, renamed: true };
}
function repointSessionControls(projectRoot, oldName, newName, now) {
  let files;
  try {
    files = readdirSync8(join17(projectRoot, PATHS.FEATURE_EVIDENCE_SESSION_DIR));
  } catch {
    return;
  }
  for (const file of files) {
    if (!file.endsWith(".json")) {
      continue;
    }
    const sessionId = file.slice(0, -".json".length);
    try {
      const control = readSessionControl(projectRoot, sessionId, now);
      if (control.active !== oldName && !control.paused.includes(oldName)) {
        continue;
      }
      writeSessionControl(
        projectRoot,
        {
          ...control,
          active: control.active === oldName ? newName : control.active,
          paused: control.paused.map((name) => name === oldName ? newName : name)
        },
        now,
        "rename"
      );
    } catch {
    }
  }
}
function rewriteArtifactPaths(projectRoot, oldName, newName) {
  const absLedger = join17(projectRoot, featureFilePath(newName, "stageEvidence"));
  let raw;
  try {
    raw = readFileSync15(absLedger, "utf8");
  } catch {
    return;
  }
  const oldPrefix = `${featureDir(oldName)}/`;
  const newPrefix = `${featureDir(newName)}/`;
  let changed = false;
  const lines = raw.split("\n").map((line) => {
    if (!line.includes(oldPrefix)) {
      return line;
    }
    try {
      const row = JSON.parse(line);
      if (!Array.isArray(row.artifact_paths)) {
        return line;
      }
      row.artifact_paths = row.artifact_paths.map(
        (path) => typeof path === "string" && path.startsWith(oldPrefix) ? `${newPrefix}${path.slice(oldPrefix.length)}` : path
      );
      row.content_hash = computeSessionRowHash(row);
      changed = true;
      return JSON.stringify(row);
    } catch {
      return line;
    }
  });
  if (changed) {
    try {
      writeFileSync9(absLedger, lines.join("\n"), "utf8");
    } catch {
    }
  }
}

// src/feature-evidence/reuse.ts
init_esm_shims();

// src/framework-api/query.ts
init_esm_shims();

// src/framework-api/adapters/shared.ts
init_esm_shims();
import { relative as relative5 } from "path";
var DYNAMIC_MEMBER_SUFFIX = ".*";
function projectRelative(projectRoot, target) {
  return toPosixPath(relative5(projectRoot, target));
}
function dynamicRecord(container) {
  return {
    name: `${container}${DYNAMIC_MEMBER_SUFFIX}`,
    kind: "member",
    exists: true,
    deprecated: false,
    message: null,
    since: null,
    for_removal: false,
    provenance: "unknown-dynamic"
  };
}
var NAME_SEPARATORS = ["::", ".", "\\"];
function lastSeparator(name) {
  let at = -1;
  let width = 0;
  for (const separator of NAME_SEPARATORS) {
    const index = name.lastIndexOf(separator);
    if (index > at) {
      at = index;
      width = separator.length;
    }
  }
  return { at, width };
}
function lastNameSegment(name) {
  const { at, width } = lastSeparator(name);
  return at === -1 ? name : name.slice(at + width);
}
function containerOf(name) {
  const { at } = lastSeparator(name);
  return at === -1 ? null : name.slice(0, at);
}

// src/framework-api/query.ts
function findRecord(entry, symbol) {
  const exact = entry.symbols.find((record) => record.name === symbol);
  if (exact) {
    return exact;
  }
  const wanted = lastNameSegment(symbol);
  return entry.symbols.find(
    (record) => !record.name.endsWith(DYNAMIC_MEMBER_SUFFIX) && lastNameSegment(record.name) === wanted
  ) ?? null;
}
function coveredByDynamicContainer(entry, symbol) {
  const container = containerOf(symbol);
  if (container === null) {
    return false;
  }
  const wanted = lastNameSegment(container);
  return entry.symbols.some((record) => {
    if (!record.name.endsWith(DYNAMIC_MEMBER_SUFFIX)) {
      return false;
    }
    const recorded = record.name.slice(0, -DYNAMIC_MEMBER_SUFFIX.length);
    return recorded === container || lastNameSegment(recorded) === wanted;
  });
}
function nearestFrameworkSymbol(symbol, known) {
  const wanted = lastNameSegment(symbol);
  const bound = Math.max(2, Math.floor(wanted.length / 4));
  let best = null;
  let bestDistance = bound + 1;
  for (const candidate of known) {
    const distance = levenshtein(wanted, lastNameSegment(candidate), bound);
    if (distance < bestDistance) {
      best = candidate;
      bestDistance = distance;
    }
  }
  return best;
}
function queryFrameworkApi(index, packageName, symbol, version) {
  const forPackage = index.packages.filter((candidate) => candidate.package === packageName);
  const entry = (version === void 0 ? forPackage[0] : forPackage.find((candidate) => candidate.version === version) ?? forPackage[0]) ?? null;
  if (!entry) {
    return {
      package: packageName,
      symbol,
      verdict: "package-not-indexed",
      version: null,
      record: null,
      nearest: null
    };
  }
  const record = findRecord(entry, symbol);
  if (record) {
    return {
      package: packageName,
      symbol,
      verdict: record.provenance === "asserted" ? record.deprecated ? "deprecated" : "live" : "unknown-dynamic",
      version: entry.version,
      record,
      nearest: null
    };
  }
  if (coveredByDynamicContainer(entry, symbol)) {
    return {
      package: packageName,
      symbol,
      verdict: "unknown-dynamic",
      version: entry.version,
      record: null,
      nearest: null
    };
  }
  const known = entry.symbols.filter((candidate) => !candidate.name.endsWith(DYNAMIC_MEMBER_SUFFIX)).map((candidate) => candidate.name);
  return {
    package: packageName,
    symbol,
    verdict: "absent",
    version: entry.version,
    record: null,
    nearest: nearestFrameworkSymbol(symbol, known)
  };
}

// src/framework-api/store.ts
init_esm_shims();
import { mkdirSync as mkdirSync9, readFileSync as readFileSync16, renameSync as renameSync5, writeFileSync as writeFileSync10 } from "fs";
import { dirname as dirname10, join as join18 } from "path";

// src/framework-api/schema.ts
init_esm_shims();
var import_ajv4 = __toESM(require_ajv(), 1);

// src/validators/schemas/framework-api.schema.json
var framework_api_schema_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "paqad://schemas/framework-api.json",
  title: "Installed framework-API index (issue #397)",
  type: "object",
  additionalProperties: false,
  required: ["schema_version", "header", "packages", "blocked"],
  properties: {
    schema_version: { type: "integer", const: 1 },
    header: {
      type: "object",
      additionalProperties: false,
      required: ["generated_at", "schema_version"],
      properties: {
        generated_at: { type: "string", minLength: 1 },
        schema_version: { type: "integer", const: 1 }
      }
    },
    packages: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "package",
          "version",
          "ecosystem",
          "root",
          "content_hash",
          "sources",
          "symbols"
        ],
        properties: {
          package: { type: "string", minLength: 1 },
          version: { type: "string", minLength: 1 },
          ecosystem: { type: "string", minLength: 1 },
          root: { type: "string", minLength: 1 },
          content_hash: { type: "string", minLength: 1 },
          sources: { type: "array", items: { type: "string" } },
          symbols: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: [
                "name",
                "kind",
                "exists",
                "deprecated",
                "message",
                "since",
                "for_removal",
                "provenance"
              ],
              properties: {
                name: { type: "string", minLength: 1 },
                kind: {
                  type: "string",
                  enum: [
                    "function",
                    "class",
                    "interface",
                    "type",
                    "variable",
                    "enum",
                    "namespace",
                    "member",
                    "unknown"
                  ]
                },
                exists: { type: "boolean" },
                deprecated: { type: "boolean" },
                message: { type: ["string", "null"] },
                since: { type: ["string", "null"] },
                for_removal: { type: "boolean" },
                provenance: {
                  type: "string",
                  enum: ["asserted", "unknown-dynamic", "doc-derived"]
                }
              }
            }
          }
        }
      }
    },
    blocked: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["package", "ecosystem", "reason", "detail"],
        properties: {
          package: { type: "string", minLength: 1 },
          ecosystem: { type: "string", minLength: 1 },
          reason: {
            type: "string",
            enum: ["no-adapter", "not-installed", "no-types", "parser-unavailable"]
          },
          detail: { type: "string" }
        }
      }
    }
  }
};

// src/framework-api/schema.ts
var ajv4 = new import_ajv4.default({ allErrors: true, allowUnionTypes: true });
var compiled3;
function validator3() {
  if (!compiled3) {
    compiled3 = ajv4.compile(framework_api_schema_default);
  }
  return compiled3;
}
function validateFrameworkApiIndex(data) {
  const validate = validator3();
  if (validate(data)) {
    return { valid: true, errors: [] };
  }
  const rawErrors = validate.errors ?? [];
  const errors = rawErrors.map((error) => {
    const path = error.instancePath.length > 0 ? error.instancePath : "/";
    const message = error.message ?? "invalid";
    return `${path} ${message}`.trim();
  });
  return { valid: false, errors };
}

// src/framework-api/store.ts
function frameworkApiIndexPath(projectRoot) {
  return join18(projectRoot, PATHS.FRAMEWORK_API_INDEX);
}
function writeFrameworkApiIndex(projectRoot, index) {
  const target = frameworkApiIndexPath(projectRoot);
  mkdirSync9(dirname10(target), { recursive: true });
  const tmp = `${target}.tmp`;
  writeFileSync10(tmp, JSON.stringify(index, null, 2) + "\n", "utf8");
  renameSync5(tmp, target);
  return target;
}
function readFrameworkApiIndex(projectRoot) {
  try {
    const parsed = JSON.parse(readFileSync16(frameworkApiIndexPath(projectRoot), "utf8"));
    return validateFrameworkApiIndex(parsed).valid ? parsed : null;
  } catch {
    return null;
  }
}

// src/feature-evidence/reuse.ts
var CREATE_KEYWORDS = [
  "add helper",
  "add a helper",
  "add util",
  "add a util",
  "add component",
  "add a component",
  "create helper",
  "create a helper",
  "create util",
  "create a util",
  "create utility",
  "create component",
  "create a component",
  "new helper",
  "new util",
  "new component"
];
var EXPECTED_SHAPE = `"reuse": {
  "consulted": [{ "source": "index-query", "query": "date formatting", "hits": 2 }],
  "reusing": [{ "symbol": "formatIsoDate", "file": "src/utils/dates.ts", "how": "call as-is" }],
  "new_constructs": [{ "name": "formatRelativeDate", "justification": "no existing helper handles the relative form" }]
}`;
var INDEX_ABSENT_WARNING = "reuse claims unverified: index not built";
var SNAPSHOT_ABSENT_WARNING = "framework reuse claims unverified: stack snapshot not built";
var FRAMEWORK_API_INDEX_ABSENT_WARNING = "framework reuse claims unverified: framework-api index not built";
function validateReuseSection(input) {
  const shape = validateShape(input.reuse);
  if (shape.errors.length > 0) {
    return shape;
  }
  const reuse = input.reuse;
  const errors = [];
  const warnings = [];
  const provenance = {};
  checkDeclaredConstructs(reuse, input.steps, errors);
  checkFirstPartySymbols(input.projectRoot, reuse, errors, warnings);
  checkFrameworkClaims(input.projectRoot, reuse, errors, warnings);
  verifyFrameworkSymbols(input.projectRoot, reuse, errors, warnings, provenance);
  return { errors, warnings, provenance };
}
function frameworkClaimKey(packageName, symbol) {
  return `${packageName}::${symbol}`;
}
function verifyFrameworkSymbols(projectRoot, reuse, errors, warnings, provenance) {
  const claims = (reuse.reusing ?? []).filter(
    (claim) => claim.package !== void 0
  );
  if (claims.length === 0) {
    return;
  }
  const index = readFrameworkApiIndex(projectRoot);
  if (!index) {
    warnings.push(FRAMEWORK_API_INDEX_ABSENT_WARNING);
    return;
  }
  for (const claim of claims) {
    const result = queryFrameworkApi(index, claim.package, claim.symbol, claim.version);
    const key = frameworkClaimKey(claim.package, claim.symbol);
    switch (result.verdict) {
      case "live":
        provenance[key] = "asserted";
        break;
      case "deprecated":
        provenance[key] = "asserted";
        errors.push(deprecatedMessage(claim, result));
        break;
      case "absent":
        provenance[key] = "asserted";
        errors.push(
          `reuse.reusing "${claim.symbol}" does not exist in ${claim.package}@${result.version}` + (result.nearest === null ? "" : ` \u2014 did you mean "${result.nearest}"?`)
        );
        break;
      case "unknown-dynamic":
        provenance[key] = "unknown-dynamic";
        warnings.push(
          `reuse.reusing "${claim.symbol}" is provided dynamically by ${claim.package}@${result.version} \u2014 paqad could not verify it statically`
        );
        break;
      default:
        warnings.push(
          `reuse.reusing "${claim.symbol}" unverified: ${claim.package} is not in the framework-api index`
        );
    }
  }
}
function deprecatedMessage(claim, result) {
  const detail = result.record?.message ?? "no reason given";
  const since = result.record?.since === null ? "" : ` (deprecated since ${result.record?.since})`;
  const removal = result.record?.for_removal === true ? " It is slated for removal." : "";
  return `reuse.reusing "${claim.symbol}" is deprecated in ${claim.package}@${result.version}${since}: ${detail}${removal}`;
}
function validateShape(reuse) {
  if (reuse === void 0 || reuse === null) {
    return {
      errors: [
        `plan template is missing the required "reuse" section \u2014 record what you checked before building.
Expected shape:
${EXPECTED_SHAPE}`
      ],
      warnings: [],
      provenance: {}
    };
  }
  if (typeof reuse !== "object" || Array.isArray(reuse)) {
    return {
      errors: ['plan template "reuse" must be an object'],
      warnings: [],
      provenance: {}
    };
  }
  const candidate = reuse;
  const errors = [];
  if (!Array.isArray(candidate.consulted) || candidate.consulted.length === 0) {
    errors.push(
      'plan template "reuse.consulted" must list at least one thing you checked (run `paqad-ai index query <name>` or read the Existing surface section)'
    );
  }
  if (candidate.reusing !== void 0 && !Array.isArray(candidate.reusing)) {
    errors.push('plan template "reuse.reusing" must be an array');
  }
  if (candidate.new_constructs !== void 0 && !Array.isArray(candidate.new_constructs)) {
    errors.push('plan template "reuse.new_constructs" must be an array');
  }
  return { errors, warnings: [], provenance: {} };
}
function matchedCreateKeyword(description) {
  const haystack = description.toLowerCase();
  return CREATE_KEYWORDS.find((keyword) => haystack.includes(keyword)) ?? null;
}
function checkDeclaredConstructs(reuse, steps, errors) {
  if ((reuse.new_constructs ?? []).length > 0) {
    return;
  }
  for (const step of steps) {
    const keyword = matchedCreateKeyword(step.description ?? "");
    if (keyword !== null) {
      errors.push(
        `plan step says "${keyword}" but "reuse.new_constructs" is empty \u2014 declare the new construct and justify it, or reword the step if nothing new is introduced`
      );
      return;
    }
  }
}
function checkFirstPartySymbols(projectRoot, reuse, errors, warnings) {
  const firstParty = (reuse.reusing ?? []).filter((claim) => claim.package === void 0);
  if (firstParty.length === 0) {
    return;
  }
  const index = readCodeKnowledgeIndex(projectRoot);
  if (!index) {
    warnings.push(INDEX_ABSENT_WARNING);
    return;
  }
  const known = index.symbols.map((symbol) => symbol.name);
  const knownSet = new Set(known);
  for (const claim of firstParty) {
    if (knownSet.has(claim.symbol)) {
      continue;
    }
    const nearest = nearestSymbol(claim.symbol, known);
    errors.push(
      nearest === null ? `reuse.reusing names "${claim.symbol}", which is not in the code-knowledge index \u2014 check the name, or declare it under new_constructs if you are creating it` : `reuse.reusing names "${claim.symbol}", which is not in the code-knowledge index \u2014 did you mean "${nearest}"?`
    );
  }
}
function nearestSymbol(symbol, known) {
  const bound = Math.max(2, Math.floor(symbol.length / 4));
  let best = null;
  let bestDistance = bound + 1;
  for (const candidate of known) {
    const distance = levenshtein(symbol, candidate, bound);
    if (distance < bestDistance) {
      best = candidate;
      bestDistance = distance;
    }
  }
  return best;
}
function checkFrameworkClaims(projectRoot, reuse, errors, warnings) {
  const frameworkClaims = (reuse.reusing ?? []).filter((claim) => claim.package !== void 0);
  if (frameworkClaims.length > 0) {
    checkFrameworkVersions(projectRoot, frameworkClaims, errors, warnings);
  }
  const frameworks = detectedFrameworks(projectRoot);
  if (frameworks.length === 0) {
    return;
  }
  for (const construct of reuse.new_constructs ?? []) {
    if (construct.framework_checked !== void 0) {
      continue;
    }
    if (justificationNamesFramework(construct.justification, frameworks)) {
      continue;
    }
    errors.push(
      `reuse.new_constructs "${construct.name}" must record the framework check \u2014 this project uses ${frameworks.join(", ")}. Add "framework_checked", or justify why no ${frameworks[0]} equivalent fits.`
    );
  }
}
function checkFrameworkVersions(projectRoot, claims, errors, warnings) {
  for (const claim of claims) {
    if (!claim.version) {
      errors.push(
        `reuse.reusing "${claim.symbol}" names package "${claim.package}" but sets no "version" \u2014 a framework claim must say which installed version it is made against`
      );
    }
  }
  const versioned = claims.filter((claim) => Boolean(claim.version));
  if (versioned.length === 0) {
    return;
  }
  const snapshot = readStackSnapshotSync(projectRoot);
  if (!snapshot) {
    warnings.push(SNAPSHOT_ABSENT_WARNING);
    return;
  }
  for (const claim of versioned) {
    const installed = snapshot.packages.find((pkg) => pkg.name === claim.package);
    if (!installed) {
      errors.push(
        `reuse.reusing "${claim.symbol}" names package "${claim.package}", which is not in the stack snapshot \u2014 check the package name`
      );
      continue;
    }
    if (installed.locked_version !== claim.version) {
      errors.push(
        `reuse.reusing "${claim.symbol}" claims ${claim.package}@${claim.version}; stack has ${installed.locked_version}`
      );
    }
  }
}
function detectedFrameworks(projectRoot) {
  const profile = readProjectProfile(projectRoot);
  const frameworks = profile?.stack_profile?.frameworks;
  return Array.isArray(frameworks) ? frameworks : [];
}
function justificationNamesFramework(justification, frameworks) {
  const haystack = justification.toLowerCase();
  return frameworks.some((framework) => haystack.includes(framework.toLowerCase()));
}
function reuseCounts(plan) {
  const reuse = plan?.reuse;
  if (!reuse) {
    return null;
  }
  return {
    reused: (reuse.reusing ?? []).length,
    newJustified: (reuse.new_constructs ?? []).length
  };
}

// src/feature-evidence/artifacts.ts
var ReuseDeclarationError = class extends Error {
  errors;
  constructor(errors) {
    super(errors.join("\n"));
    this.name = "ReuseDeclarationError";
    this.errors = errors;
  }
};
var NoActiveFeatureError = class extends Error {
  constructor() {
    super("No active feature \u2014 run `paqad-ai stage start planning` first.");
    this.name = "NoActiveFeatureError";
  }
};
function atomicWriteJson3(absPath, value) {
  mkdirSync10(dirname11(absPath), { recursive: true });
  const tmp = `${absPath}.tmp`;
  writeFileSync11(tmp, `${JSON.stringify(value, null, 2)}
`, "utf8");
  renameSync6(tmp, absPath);
}
function atomicWriteText(absPath, text) {
  mkdirSync10(dirname11(absPath), { recursive: true });
  const tmp = `${absPath}.tmp`;
  writeFileSync11(tmp, text, "utf8");
  renameSync6(tmp, absPath);
}
function readJson(absPath) {
  try {
    return JSON.parse(readFileSync17(absPath, "utf8"));
  } catch {
    return null;
  }
}
function activeFeatureParts(projectRoot, sessionId) {
  const dirName = currentFeature(projectRoot, sessionId);
  if (!dirName) {
    throw new NoActiveFeatureError();
  }
  const parts = parseFeatureDirName(dirName);
  if (!parts) {
    throw new Error(`Active feature dir name is not parseable: ${JSON.stringify(dirName)}`);
  }
  return { dirName, parts };
}
function writeFeaturePlan(projectRoot, sessionId, input, options = {}) {
  const reuseCheck = validateReuseSection({
    projectRoot,
    reuse: input.reuse,
    steps: input.steps ?? []
  });
  if (reuseCheck.errors.length > 0) {
    throw new ReuseDeclarationError(reuseCheck.errors);
  }
  const reuse = applyComputedProvenance(input.reuse, reuseCheck.provenance);
  let { dirName, parts } = activeFeatureParts(projectRoot, sessionId);
  if (input.title !== void 0 && input.title.length > 0) {
    const backfilled = backfillFeatureSlug(projectRoot, dirName, input.title, input.now);
    if (backfilled.renamed) {
      dirName = backfilled.dirName;
      const renamedParts = parseFeatureDirName(dirName);
      if (renamedParts) {
        parts = renamedParts;
      }
    }
  }
  const record = buildPlanRecord({
    change: parts.ulid,
    session_id: sessionId,
    summary: input.summary,
    steps: input.steps,
    modules_touched: input.modules_touched,
    decisions: input.decisions,
    risks: input.risks,
    reuse,
    now: input.now
  });
  const errors = validatePlanRecord(record);
  if (errors.length > 0) {
    throw new Error(`Invalid plan.json: ${errors.join("; ")}`);
  }
  const rel = featureFilePath(dirName, "plan");
  atomicWriteJson3(join19(projectRoot, rel), record);
  updateFeatureRecord(
    projectRoot,
    dirName,
    { title: input.title ?? parts.slug, slug: parts.slug, issue: parts.issue },
    input.now
  );
  const armed = armDecisionFromPlan({
    projectRoot,
    changeKey: dirName,
    sessionId,
    constructs: (input.reuse?.new_constructs ?? []).map((construct) => ({
      name: construct.name,
      justification: construct.justification
    }))
  });
  const readinessDecision = openVisualEvidenceReadinessPause({
    projectRoot,
    dirName,
    files: [
      .../* @__PURE__ */ new Set([
        ...(input.steps ?? []).flatMap((step) => step.files ?? []),
        ...options.changedFiles ?? []
      ])
    ]
  });
  return {
    dirName,
    path: rel,
    record,
    warnings: [...reuseCheck.warnings, ...armed.warnings],
    armedDecisions: armed.minted,
    readinessDecision
  };
}
function applyComputedProvenance(reuse, computed) {
  if (reuse === void 0 || Object.keys(computed).length === 0) {
    return reuse;
  }
  return {
    ...reuse,
    reusing: (reuse.reusing ?? []).map((claim) => {
      if (claim.package === void 0) {
        return claim;
      }
      const verdict = computed[frameworkClaimKey(claim.package, claim.symbol)];
      return verdict === void 0 ? claim : { ...claim, provenance: verdict };
    })
  };
}
function readFeaturePlan(projectRoot, dirName) {
  return readJson(join19(projectRoot, featureFilePath(dirName, "plan")));
}
function writeFeatureSpecification(projectRoot, sessionId, spec, markdown) {
  const dirName = currentFeature(projectRoot, sessionId);
  if (!dirName) {
    throw new NoActiveFeatureError();
  }
  if (spec.frozen === null || spec.frozen === void 0) {
    throw new Error(`Refusing to persist unfrozen spec ${spec.spec_id}: freeze it first.`);
  }
  if (sha256Hex(markdown) !== spec.spec_hash) {
    throw new Error(
      `Refusing to persist spec ${spec.spec_id}: the source does not hash to its spec_hash.`
    );
  }
  const sessionForDocs = documentSessionId(projectRoot, dirName, sessionId);
  const header = buildTextHeader({
    docType: SPEC_SOURCE_DOC_TYPE,
    change: featureChangeKey(dirName),
    sessionId: sessionForDocs,
    schemaVersion: FEATURE_DOC_SCHEMA_VERSION,
    body: markdown
  });
  atomicWriteText(
    join19(projectRoot, featureFilePath(dirName, "specMd")),
    renderFrontMatter(header, markdown)
  );
  const body = { ...spec, spec_file: FEATURE_BUNDLE_FILES.specMd };
  delete body.schema_version;
  const record = stampFeatureDocument({
    projectRoot,
    dirName,
    docType: SPECIFICATION_DOC_TYPE,
    schemaVersion: FEATURE_DOC_SCHEMA_VERSION,
    sessionId: sessionForDocs,
    body
  });
  const rel = featureFilePath(dirName, "specification");
  atomicWriteJson3(join19(projectRoot, rel), record);
  updateFeatureRecord(projectRoot, dirName, { spec_id: spec.spec_id });
  return { dirName, path: rel, record };
}
function readFeatureSpecification(projectRoot, dirName) {
  return readJson(join19(projectRoot, featureFilePath(dirName, "specification")));
}
function writeFeatureReview(projectRoot, sessionId, input) {
  const { dirName, parts } = activeFeatureParts(projectRoot, sessionId);
  const record = buildReviewRecord({
    change: parts.ulid,
    session_id: sessionId,
    summary: input.summary,
    verdict: input.verdict,
    findings: input.findings,
    checked: input.checked,
    rollback: input.rollback,
    now: input.now
  });
  const errors = validateReviewRecord(record);
  if (errors.length > 0) {
    throw new Error(`Invalid review.json: ${errors.join("; ")}`);
  }
  const rel = featureFilePath(dirName, "review");
  atomicWriteJson3(join19(projectRoot, rel), record);
  return { dirName, path: rel, record };
}
function readFeatureReview(projectRoot, dirName) {
  return readJson(join19(projectRoot, featureFilePath(dirName, "review")));
}

// src/feature-evidence/projections.ts
function readAllFeatureStageRows(projectRoot) {
  return listFeatureDirs(projectRoot).flatMap(
    (dirName) => readUnitFile(projectRoot, featureFilePath(dirName, "stageEvidence"))
  );
}
function readAllFeatureRuleRuns(projectRoot) {
  return listFeatureDirs(projectRoot).flatMap(
    (dirName) => readUnitFile(projectRoot, featureFilePath(dirName, "ruleRun"))
  );
}
function readAllFeatureChangeMetrics(projectRoot) {
  return listFeatureDirs(projectRoot).flatMap(
    (dirName) => readUnitFile(projectRoot, featureFilePath(dirName, "changeMetrics"))
  );
}
function readAllFeatureRag(projectRoot) {
  return listFeatureDirs(projectRoot).flatMap(
    (dirName) => readUnitFile(projectRoot, featureFilePath(dirName, "rag"))
  );
}
function readFeatureChangeMetricsWindow(projectRoot, limit) {
  const rows = readAllFeatureChangeMetrics(projectRoot).slice().sort((a, b) => (rowRecordedAt(a) ?? "").localeCompare(rowRecordedAt(b) ?? ""));
  return limit >= rows.length ? rows : rows.slice(rows.length - limit);
}
function readAllFeatureEvidence(projectRoot) {
  return listFeatureDirs(projectRoot).flatMap(
    (dirName) => readFeatureEvidence(projectRoot, dirName)
  );
}
function readAllFeatureSpecificationEntries(projectRoot) {
  const entries = [];
  for (const dirName of listFeatureDirs(projectRoot)) {
    const spec = readFeatureSpecification(projectRoot, dirName);
    if (spec && spec.frozen !== null && spec.frozen !== void 0) {
      entries.push({ dirName, spec });
    }
  }
  return entries;
}

// src/spec-pipeline/metrics.ts
init_esm_shims();

// src/spec/feature-spec-builder.ts
init_esm_shims();
var FEATURE_SPEC_SCHEMA_VERSION = "1";
function buildFeatureSpec(options) {
  const index = extractObligationIndex({
    spec_file: options.spec_file,
    spec_markdown: options.spec_markdown,
    spec_review: options.spec_review ?? null,
    extracted_at: options.extracted_at
  });
  const behaviour = [];
  const criteria = [];
  let criterionSeq = 0;
  for (const obligation of index.obligations) {
    const description = stripLeadingId(obligation.description);
    if (obligation.category === "functional" || obligation.category === "non-functional") {
      behaviour.push(`${obligation.obligation_id}: ${description}`);
    } else if (obligation.category === "acceptance") {
      criterionSeq += 1;
      criteria.push(criterionFromObligation(obligation.obligation_id, description, criterionSeq));
    }
  }
  return {
    schema_version: FEATURE_SPEC_SCHEMA_VERSION,
    spec_id: options.spec_id,
    spec_file: options.spec_file,
    spec_hash: sha256Hex(options.spec_markdown),
    behaviour,
    acceptance_criteria: criteria,
    invariants: collectInvariants(options.spec_markdown, options.suggested_invariants ?? []),
    open_questions: extractOpenQuestions(options.spec_markdown),
    frozen: null,
    ...(() => {
      const nonGoals = extractNonGoals(options.spec_markdown);
      return nonGoals.length > 0 ? { non_goals: nonGoals } : {};
    })()
  };
}
function criterionFromObligation(obligationId, description, sequence) {
  const criterionId = /^AC-(?:TRACK-[A-Za-z0-9-]+|\d+)$/.test(obligationId) ? obligationId : `AC-${sequence}`;
  const { given, when, then } = parseGivenWhenThen(description);
  return {
    criterion_id: criterionId,
    given,
    when,
    then,
    proof_type: detectProofType(description),
    status: "uncovered",
    source: "planned",
    linked_requirement_ids: []
  };
}
function stripLeadingId(text) {
  return text.replace(/^(?:(?:FR|NFR|EC)-\d+(?:\.\d+)?|AC-(?:TRACK-[A-Za-z0-9-]+|\d+))\s*[:.)-]\s*/i, "").trim();
}
function parseGivenWhenThen(text) {
  const match = /given\s+(.*?),?\s+when\s+(.*?),?\s+then\s+(.*?)\.?$/i.exec(text.trim());
  if (match) {
    return { given: match[1].trim(), when: match[2].trim(), then: match[3].trim() };
  }
  return { given: "", when: "", then: text.trim() };
}
function detectProofType(text) {
  const match = /\(proof:\s*(automated|manual|visual)\)/i.exec(text);
  if (match) {
    return match[1].toLowerCase();
  }
  return "automated";
}
function collectInvariants(markdown, suggested) {
  const invariants = [];
  const seenStatements = /* @__PURE__ */ new Set();
  let sequence = 0;
  for (const authored of extractAuthoredInvariants(markdown)) {
    sequence += 1;
    seenStatements.add(authored.toLowerCase());
    invariants.push({
      invariant_id: `INV-${sequence}`,
      statement: authored,
      source: "authored",
      confirmed: false
    });
  }
  for (const suggestion of suggested) {
    const normalized = suggestion.statement.trim();
    if (normalized.length === 0 || seenStatements.has(normalized.toLowerCase())) {
      continue;
    }
    sequence += 1;
    seenStatements.add(normalized.toLowerCase());
    invariants.push({
      invariant_id: `INV-${sequence}`,
      statement: normalized,
      source: suggestion.source,
      ...suggestion.rule_id === void 0 ? {} : { rule_id: suggestion.rule_id },
      confirmed: false
    });
  }
  return invariants;
}
function extractAuthoredInvariants(markdown) {
  const statements = [];
  for (const line of splitLines(markdown)) {
    const match = /^\s*(?:[-*+]\s+)?(?:\*\*)?INV-\d+(?:\*\*)?\s*[:.)-]\s*(.+\S)\s*$/.exec(line);
    if (match) {
      statements.push(match[1].trim());
    }
  }
  return statements;
}
function extractOpenQuestions(markdown) {
  const questions = [];
  for (const line of splitLines(markdown)) {
    const match = /^\s*(?:[-*+]\s+)?(Q\d+)\s*[:.)-]\s*(.+\S)\s*$/.exec(line);
    if (match) {
      questions.push(`${match[1]}: ${match[2].trim()}`);
    }
  }
  return questions;
}
function extractNonGoals(markdown) {
  const nonGoals = [];
  let inSection = false;
  for (const line of splitLines(markdown)) {
    const heading = /^(#{1,6})\s+(.*\S)\s*$/.exec(line);
    if (heading) {
      inSection = /^non-?goals?$/i.test(heading[2].trim());
      continue;
    }
    if (!inSection) {
      continue;
    }
    const bullet = /^\s*[-*+]\s+(.+\S)\s*$/.exec(line);
    if (bullet) {
      nonGoals.push(bullet[1].trim());
    }
  }
  return nonGoals;
}

// src/spec/spec-freeze.ts
init_esm_shims();
function evaluateSpecFreeze(spec, specReview, options = {}) {
  const blockers = [];
  if (spec.behaviour.length === 0) {
    blockers.push("Spec has no behaviour statements.");
  }
  if (spec.acceptance_criteria.length === 0) {
    blockers.push("Spec has no acceptance criteria.");
  }
  if (spec.invariants.length === 0) {
    blockers.push("Spec has no invariants.");
  }
  for (const criterion of spec.acceptance_criteria) {
    if (!criterion.proof_type) {
      blockers.push(`Acceptance criterion ${criterion.criterion_id} has no proof_type.`);
    }
  }
  for (const invariant of spec.invariants) {
    if (!invariant.confirmed) {
      blockers.push(`Invariant ${invariant.invariant_id} is not human-confirmed.`);
    }
  }
  for (const question of spec.open_questions) {
    blockers.push(`Open question unresolved: ${question}`);
  }
  const visual = options.requireVisualAc;
  if (visual && !spec.acceptance_criteria.some((criterion) => criterion.proof_type === "visual")) {
    blockers.push(
      `Visual evidence is on and this change touches frontend files (${visual.files.join(", ")}), so at least one acceptance criterion needs (proof: visual).`
    );
  }
  if (specReview) {
    for (const defect of specReview.defects) {
      if (defect.severity === "critical" && defect.status !== "resolved") {
        blockers.push(`Critical spec-review defect open: ${defect.defect_id}`);
      }
    }
  }
  return { can_freeze: blockers.length === 0, blockers };
}
function freezeSpec(spec, input) {
  const evaluation = evaluateSpecFreeze(spec, input.spec_review);
  if (!evaluation.can_freeze) {
    throw new Error(`Cannot freeze spec ${spec.spec_id}: ${evaluation.blockers.join("; ")}`);
  }
  const frozen = {
    frozen_at: input.frozen_at,
    spec_hash: spec.spec_hash,
    signed_off_by: input.signed_off_by
  };
  const specReview = input.spec_review ? summarizeSpecReview(input.spec_review) : void 0;
  return {
    ...spec,
    frozen,
    ...specReview === void 0 ? {} : { spec_review: specReview },
    ...input.sections?.task === void 0 ? {} : { task: input.sections.task },
    ...input.sections?.grounding === void 0 ? {} : { grounding: input.sections.grounding },
    ...input.sections?.pipeline === void 0 ? {} : { pipeline: input.sections.pipeline },
    ...input.sections?.trace === void 0 ? {} : { trace: input.sections.trace }
  };
}
function summarizeSpecReview(report) {
  const open = report.defects.filter((defect) => defect.status !== "resolved");
  return {
    reviewed_at: report.metadata.reviewed_at,
    defect_count: open.length,
    by_severity: {
      critical: open.filter((defect) => defect.severity === "critical").length,
      major: open.filter((defect) => defect.severity === "major").length,
      minor: open.filter((defect) => defect.severity === "minor").length
    }
  };
}
function isFrozenSpecStale(spec, currentSpecHash) {
  return spec.frozen !== null && spec.frozen.spec_hash !== currentSpecHash;
}

// src/spec-pipeline/experts/assemble.ts
init_esm_shims();

// src/spec-pipeline/run-store.ts
init_esm_shims();
import { mkdirSync as mkdirSync11, readFileSync as readFileSync18, realpathSync, rmdirSync, rmSync as rmSync2, writeFileSync as writeFileSync12 } from "fs";

// src/spec-pipeline/finish.ts
init_esm_shims();
function decideFinish(config, a5Live) {
  if (config.final_review === "strict") {
    return {
      outcome: "await-human-approval",
      reason: "final-review is required \u2014 a human must approve before freeze"
    };
  }
  if (!a5Live) {
    return {
      outcome: "non-blocking-review",
      reason: "the spec-vs-code check (A5) is not live \u2014 showing a non-blocking readable review instead of freezing silently"
    };
  }
  return {
    outcome: "freeze",
    reason: config.final_review === "warn" ? "A5 is live; final-review is advisory \u2014 showing the readable spec, then freezing" : "A5 is live \u2014 freezing automatically"
  };
}
function buildProvenance(config, a5Live, answerRefs, questions, experts, metrics) {
  return {
    pipeline_produced: true,
    answer_refs: answerRefs,
    questions,
    enforcement: config,
    a5_live: a5Live,
    outcome: decideFinish(config, a5Live).outcome,
    ...experts ? { experts } : {},
    ...metrics ? { metrics } : {}
  };
}
function frozenPipelineSection(finish) {
  const { provenance } = finish;
  const outcome = finish.outcome ?? provenance.outcome;
  const config = provenance.enforcement;
  return {
    produced: true,
    ...outcome === void 0 ? {} : { outcome },
    ...finish.reason === void 0 ? {} : { reason: finish.reason },
    ...provenance.a5_live === void 0 ? {} : { a5_live: provenance.a5_live },
    ...config === void 0 ? {} : {
      enforcement: {
        clarification: config.clarification,
        final_review: config.final_review,
        token_ceiling: config.token_ceiling,
        experts_enabled: config.experts_enabled,
        adoption: config.adoption,
        standing_experts: config.standing_experts,
        standing_experts_dropped: config.standing_experts_dropped
      }
    }
  };
}

// src/spec-pipeline/run-store.ts
var SPEC_PIPELINE_STAGING_DIR = ".paqad/tmp/spec-pipeline";
var STAGED_FILES = {
  grounding: "grounding.json",
  task: "task.json",
  trace: "trace.json",
  craft: "spec.md",
  finish: "finish.json",
  expertQuestions: "expert-questions.json",
  inputs: "inputs.json"
};
function stagingDir(dirName) {
  return join(SPEC_PIPELINE_STAGING_DIR, featureChangeKey(dirName));
}
function stagedFilePath(dirName, file) {
  return join(stagingDir(dirName), STAGED_FILES[file]);
}
function readText(abs) {
  try {
    return readFileSync18(abs, "utf8");
  } catch {
    return null;
  }
}
function parseJson(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return void 0;
  }
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function atomicWrite(abs, text) {
  mkdirSync11(dirname(abs), { recursive: true });
  const tmp = `${abs}.tmp-${process.pid}`;
  writeFileSync12(tmp, text, "utf8");
  renameWithRetrySync(tmp, abs);
}
function readStagedText(projectRoot, dirName, file) {
  return readText(join(projectRoot, stagedFilePath(dirName, file)));
}
function writeStagedText(projectRoot, dirName, file, text) {
  atomicWrite(join(projectRoot, stagedFilePath(dirName, file)), text);
}
function readStagedJson(projectRoot, dirName, file) {
  const raw = readStagedText(projectRoot, dirName, file);
  const parsed = raw === null ? void 0 : parseJson(raw);
  return parsed === void 0 ? null : parsed;
}
function writeStagedJson(projectRoot, dirName, file, value) {
  writeStagedText(projectRoot, dirName, file, `${JSON.stringify(value, null, 2)}
`);
}
function clearStaged(projectRoot, dirName, file) {
  rmSync2(join(projectRoot, stagedFilePath(dirName, file)), { force: true });
}
function readBundleBody(projectRoot, dirName, file) {
  const raw = readText(join(projectRoot, featureFilePath(dirName, file)));
  const parsed = raw === null ? void 0 : parseJson(raw);
  if (!isRecord(parsed)) return null;
  const body = { ...parsed };
  for (const key of ENVELOPE_HEADER_KEYS) delete body[key];
  return body;
}
function writeBundleBody(projectRoot, dirName, file, docType, body, options) {
  const doc = stampFeatureDocument({
    projectRoot,
    dirName,
    docType,
    schemaVersion: FEATURE_DOC_SCHEMA_VERSION,
    sessionId: options.sessionId,
    body,
    now: options.now
  });
  atomicWrite(
    join(projectRoot, featureFilePath(dirName, file)),
    `${JSON.stringify(doc, null, 2)}
`
  );
}
function writeRequest(projectRoot, dirName, text, options = {}) {
  const header = buildTextHeader({
    docType: REQUEST_DOC_TYPE,
    change: featureChangeKey(dirName),
    sessionId: documentSessionId(projectRoot, dirName, options.sessionId),
    schemaVersion: FEATURE_DOC_SCHEMA_VERSION,
    body: text,
    now: options.now
  });
  atomicWrite(
    join(projectRoot, featureFilePath(dirName, "request")),
    renderFrontMatter(header, text)
  );
}
function readRequest(projectRoot, dirName) {
  const raw = readText(join(projectRoot, featureFilePath(dirName, "request")));
  return raw === null ? "" : splitFrontMatter(raw).body;
}
function readClarification(projectRoot, dirName) {
  const body = readBundleBody(projectRoot, dirName, "clarification");
  if (body === null) return null;
  return {
    label: isRecord(body.label) ? body.label : null,
    questions: isRecord(body.questions) ? body.questions : null
  };
}
function writeClarification(projectRoot, dirName, patch, options) {
  const current = readClarification(projectRoot, dirName) ?? { label: null, questions: null };
  writeBundleBody(
    projectRoot,
    dirName,
    "clarification",
    CLARIFICATION_DOC_TYPE,
    { ...current, ...patch },
    options
  );
}
function writeLabel(projectRoot, dirName, label, options = {}) {
  writeClarification(
    projectRoot,
    dirName,
    {
      label: {
        value: label.label,
        signals: label.signals,
        question_budget: label.question_budget
      }
    },
    options
  );
}
function readLabel(projectRoot, dirName) {
  const section = readClarification(projectRoot, dirName)?.label;
  if (!section) return null;
  return {
    label: section.value,
    signals: section.signals,
    question_budget: section.question_budget
  };
}
function writeQuestions(projectRoot, dirName, questions, options = {}) {
  writeClarification(
    projectRoot,
    dirName,
    {
      questions: {
        asked: questions.questions,
        auto_answered: questions.auto_answered,
        deferred: questions.deferred_from_experts ?? [],
        counts: {
          asked: questions.asked,
          answered: questions.answered,
          auto_answered: questions.auto_answered.length,
          deferred: questions.deferred
        }
      }
    },
    options
  );
}
function readQuestions(projectRoot, dirName) {
  const section = readClarification(projectRoot, dirName)?.questions;
  if (!section) return null;
  return {
    questions: section.asked,
    auto_answered: section.auto_answered,
    asked: section.counts.asked,
    answered: section.counts.answered,
    deferred: section.counts.deferred,
    ...section.deferred.length > 0 ? { deferred_from_experts: section.deferred } : {}
  };
}
function clearClarificationSection(projectRoot, dirName, section, options = {}) {
  writeClarification(projectRoot, dirName, { [section]: null }, options);
}
function readExperts(projectRoot, dirName) {
  const body = readBundleBody(projectRoot, dirName, "experts");
  if (body === null || !Array.isArray(body.roster)) return null;
  return {
    roster: body.roster,
    findings: Array.isArray(body.findings) ? body.findings : null,
    synthesis: isRecord(body.synthesis) ? body.synthesis : null,
    ...Array.isArray(body.voice_warnings) ? { voice_warnings: body.voice_warnings } : {}
  };
}
function writeExperts(projectRoot, dirName, patch, options) {
  const current = readExperts(projectRoot, dirName) ?? {
    roster: [],
    findings: null,
    synthesis: null
  };
  writeBundleBody(
    projectRoot,
    dirName,
    "experts",
    EXPERTS_DOC_TYPE,
    { ...current, ...patch },
    options
  );
}
function writeExpertRoster(projectRoot, dirName, roster, options = {}) {
  writeExperts(projectRoot, dirName, { roster }, options);
}
function readExpertNeed(projectRoot, dirName) {
  const experts = readExperts(projectRoot, dirName);
  if (experts === null) return null;
  return {
    experts: experts.roster.map(({ role, reason, origin }) => ({
      role,
      reason,
      ...origin === void 0 ? {} : { origin }
    }))
  };
}
function expertNotesLockDir(projectRoot, dirName) {
  return join(projectRoot, PATHS.LOCKS_DIR, `experts-${featureChangeKey(dirName)}.lock`);
}
function warningBelongsTo(warning, role) {
  const prefix = `EX-${role}-`;
  return warning.id.startsWith(prefix) && /^\d+$/.test(warning.id.slice(prefix.length));
}
function inRosterOrder(findings, roster) {
  const seat = new Map(roster.map((entry, index) => [entry.role, index]));
  const rank = (role) => seat.get(role) ?? roster.length;
  return findings.map((finding, index) => ({ finding, index })).sort((a, b) => rank(a.finding.role) - rank(b.finding.role) || a.index - b.index).map(({ finding }) => finding);
}
function writeExpertNotes(projectRoot, dirName, artifact, options = {}) {
  withFileLockSync(
    expertNotesLockDir(projectRoot, dirName),
    () => mergeExpertNotesLocked(projectRoot, dirName, artifact, options)
  );
}
function mergeExpertNotesLocked(projectRoot, dirName, artifact, options) {
  const current = readExperts(projectRoot, dirName);
  const noteRoles = new Set(artifact.notes.map((note) => note.role));
  const tokenRoles = new Set(Object.keys(artifact.tokens));
  const roles = /* @__PURE__ */ new Set([...noteRoles, ...tokenRoles]);
  const kept = (current?.findings ?? []).filter((finding) => !roles.has(finding.role));
  const incoming = artifact.notes.flatMap(
    (note) => note.findings.map(({ id, ...finding }) => ({ id, role: note.role, ...finding }))
  );
  const roster = (current?.roster ?? []).map(
    (entry) => roles.has(entry.role) ? { ...entry, tokens_used: artifact.tokens[entry.role] ?? null } : entry
  );
  const touched = [...roles];
  const keptWarnings = (current?.voice_warnings ?? []).filter(
    (warning) => !touched.some((role) => warningBelongsTo(warning, role))
  );
  const voiceWarnings = artifact.voice_warnings === void 0 && current?.voice_warnings === void 0 ? void 0 : [...keptWarnings, ...artifact.voice_warnings ?? []];
  writeExperts(
    projectRoot,
    dirName,
    {
      roster,
      findings: inRosterOrder([...kept, ...incoming], roster),
      ...voiceWarnings === void 0 ? {} : { voice_warnings: voiceWarnings }
    },
    options
  );
  const questions = [
    ...readStagedExpertQuestions(projectRoot, dirName).filter((note) => !roles.has(note.role)),
    ...artifact.notes.filter((note) => (note.questions ?? []).length > 0).map((note) => ({ role: note.role, questions: note.questions }))
  ];
  if (questions.length > 0) {
    writeStagedJson(projectRoot, dirName, "expertQuestions", { notes: questions });
  } else {
    clearStaged(projectRoot, dirName, "expertQuestions");
  }
}
function readStagedExpertQuestions(projectRoot, dirName) {
  return readStagedJson(projectRoot, dirName, "expertQuestions")?.notes ?? [];
}
function readExpertNotes(projectRoot, dirName) {
  const experts = readExperts(projectRoot, dirName);
  if (experts === null || experts.findings === null) return null;
  const byRole = /* @__PURE__ */ new Map();
  const noteFor = (role) => {
    const existing = byRole.get(role);
    if (existing) return existing;
    const created = { role, findings: [] };
    byRole.set(role, created);
    return created;
  };
  for (const { role, ...finding } of experts.findings) noteFor(role).findings.push(finding);
  for (const { role, questions } of readStagedExpertQuestions(projectRoot, dirName)) {
    noteFor(role).questions = questions;
  }
  const tokens = {};
  for (const entry of experts.roster) {
    if (entry.tokens_used !== null) tokens[entry.role] = entry.tokens_used;
  }
  return { notes: [...byRole.values()], tokens };
}
function writeExpertSynthesis(projectRoot, dirName, synthesis, options = {}) {
  writeExperts(projectRoot, dirName, { synthesis }, options);
}
function writeExpertFindings(projectRoot, dirName, findings, options = {}) {
  writeExperts(projectRoot, dirName, { findings }, options);
}
function readExpertSynthesis(projectRoot, dirName) {
  return readExperts(projectRoot, dirName)?.synthesis ?? null;
}
function clearExpertSynthesis(projectRoot, dirName, options = {}) {
  writeExperts(projectRoot, dirName, { synthesis: null }, options);
}
function readGrounding(projectRoot, dirName) {
  const staged = readStagedJson(projectRoot, dirName, "grounding");
  if (staged) return staged;
  const frozen = readBundleBody(projectRoot, dirName, "specification")?.grounding;
  if (!isRecord(frozen) || !Array.isArray(frozen.references)) return null;
  return { terms: [], ...frozen };
}
function readFrozenSpecificationBody(projectRoot, dirName) {
  return readBundleBody(projectRoot, dirName, "specification");
}
function readFreezeSections(projectRoot, dirName) {
  const finish = readStagedJson(projectRoot, dirName, "finish");
  if (!isRecord(finish) || !isRecord(finish.provenance)) return null;
  const task = readStagedJson(projectRoot, dirName, "task");
  const grounding = readStagedJson(projectRoot, dirName, "grounding");
  const trace = readStagedJson(projectRoot, dirName, "trace");
  return {
    ...isRecord(task) && typeof task.intent === "string" ? { task: { intent: task.intent, scope: isRecord(task.scope) ? task.scope : {} } } : {},
    ...isRecord(grounding) ? {
      grounding: {
        path: grounding.path,
        sparse: grounding.sparse,
        references: grounding.references,
        ...Array.isArray(grounding.vocabulary) ? { vocabulary: grounding.vocabulary } : {}
      }
    } : {},
    pipeline: withExpertFreezeSummary(frozenPipelineSection(finish), projectRoot, dirName),
    ...isRecord(trace) && Array.isArray(trace.entries) ? {
      trace: Object.fromEntries(
        trace.entries.map((entry) => [
          entry.id,
          entry.source
        ])
      )
    } : {}
  };
}
function withExpertFreezeSummary(pipeline, projectRoot, dirName) {
  const experts = readExperts(projectRoot, dirName);
  if (!experts || !experts.synthesis) return pipeline;
  const syn = experts.synthesis;
  const acceptedIds = new Set(syn.accepted);
  const findings = (experts.findings ?? []).filter((finding) => acceptedIds.has(finding.id)).map((finding) => ({
    id: finding.id,
    role: finding.role,
    kind: finding.kind ?? "requirement",
    severity: finding.severity ?? "should",
    target: finding.target,
    claim: finding.claim
  }));
  const renamed = (experts.findings ?? []).filter(
    (finding) => finding.renamed_from !== void 0
  ).length;
  return {
    ...pipeline,
    experts: {
      roles: experts.roster.map((entry) => entry.role),
      accepted: syn.accepted.length,
      declined: syn.declined.length,
      conflicts: syn.conflicts.length,
      auto_resolved: syn.auto_resolved?.length ?? 0,
      standing: experts.roster.filter((entry) => entry.origin === "standing").length,
      on_call: experts.roster.filter((entry) => entry.origin !== "standing").map((entry) => entry.role),
      renamed
    },
    ...findings.length > 0 ? { findings } : {}
  };
}
function isTmpPath(rel) {
  return rel.startsWith(".paqad/tmp/") && !rel.split("/").includes("..");
}
function clearFrozenRun(projectRoot, dirName, keep = []) {
  for (const rel of readRememberedInputs(projectRoot, dirName)) {
    if (isTmpPath(rel) && !keep.includes(rel)) rmSync2(join(projectRoot, rel), { force: true });
  }
  rmSync2(join(projectRoot, stagingDir(dirName)), { recursive: true, force: true });
  try {
    rmdirSync(join(projectRoot, SPEC_PIPELINE_STAGING_DIR));
  } catch {
  }
}
function rootForms(projectRoot) {
  const given = resolve(projectRoot);
  let real = given;
  try {
    real = resolve(realpathSync(projectRoot));
  } catch {
  }
  return [.../* @__PURE__ */ new Set([given, real])];
}
function tmpInputPath(projectRoot, file) {
  const abs = resolve(file);
  for (const base of rootForms(projectRoot)) {
    const rel = relative(base, abs);
    if (rel.startsWith(".paqad/tmp/")) return rel;
  }
  return null;
}
function rememberInput(projectRoot, dirName, file) {
  const rel = tmpInputPath(projectRoot, file);
  if (rel === null) return;
  const inputs = readRememberedInputs(projectRoot, dirName);
  if (inputs.includes(rel)) return;
  writeStagedJson(projectRoot, dirName, "inputs", { inputs: [...inputs, rel] });
}
function readRememberedInputs(projectRoot, dirName) {
  return readStagedJson(projectRoot, dirName, "inputs")?.inputs ?? [];
}
function appendSpecStepRow(projectRoot, dirName, input, options = {}) {
  return appendFeatureStageRow(
    projectRoot,
    documentSessionId(projectRoot, dirName, options.sessionId),
    dirName,
    {
      kind: SPEC_STEP_KIND,
      step: input.step,
      outcome: input.outcome,
      artifact_hash: input.artifactHash,
      ...input.tokens !== void 0 ? { tokens: input.tokens } : {}
    },
    options.now
  );
}
function readSpecStepRows(projectRoot, dirName) {
  return readFeatureStageUnit(projectRoot, dirName).filter((row) => row.kind === SPEC_STEP_KIND);
}
function appendSpecCorrectionRow(projectRoot, dirName, correction, options = {}) {
  return appendFeatureStageRow(
    projectRoot,
    documentSessionId(projectRoot, dirName, options.sessionId),
    dirName,
    {
      kind: SPEC_CORRECTION_KIND,
      spec_id: correction.spec_id,
      changed_sections: correction.changed_sections
    },
    options.now
  );
}
function readSpecCorrectionRows(projectRoot, dirName) {
  return readFeatureStageUnit(projectRoot, dirName).filter(
    (row) => row.kind === SPEC_CORRECTION_KIND
  );
}

// src/spec-pipeline/trace.ts
init_esm_shims();
var KINDS = ["FR", "NFR", "AC", "INV"];
function idNumber(id) {
  const m = /-(\d+)$/.exec(id);
  return m ? Number(m[1]) : 0;
}
function carryForwardIds(current, previous) {
  const priorBySource = /* @__PURE__ */ new Map();
  const maxByKind = /* @__PURE__ */ new Map();
  for (const kind of KINDS) maxByKind.set(kind, 0);
  for (const entry of previous?.entries ?? []) {
    priorBySource.set(`${entry.kind}\0${entry.source}`, entry.id);
    const n = idNumber(entry.id);
    if (n > (maxByKind.get(entry.kind) ?? 0)) {
      maxByKind.set(entry.kind, n);
    }
  }
  const entries = [];
  for (const req of current) {
    const key = `${req.kind}\0${req.source}`;
    const inherited = priorBySource.get(key);
    if (inherited !== void 0) {
      entries.push({ id: inherited, kind: req.kind, source: req.source });
      continue;
    }
    const next = (maxByKind.get(req.kind) ?? 0) + 1;
    maxByKind.set(req.kind, next);
    entries.push({ id: `${req.kind}-${next}`, kind: req.kind, source: req.source });
  }
  return { entries };
}
function validateTrace(trace) {
  const unsourced = trace.entries.filter((e) => typeof e.source !== "string" || e.source.trim().length === 0).map((e) => e.id);
  return { ok: unsourced.length === 0, unsourced };
}
function extractRequirementIds(markdown) {
  const ids = /* @__PURE__ */ new Set();
  const re = /\b((?:FR|NFR|AC|INV)-\d+)\b/g;
  let m;
  while ((m = re.exec(markdown)) !== null) ids.add(m[1]);
  return [...ids];
}
function validateCraftTrace(specMarkdown, trace, acceptedFindingIds = []) {
  const errors = [];
  const unsourced = validateTrace(trace);
  for (const id of unsourced.unsourced) {
    errors.push(
      `line "${id}" has no source; every requirement must trace to the task, an answer, or an expert finding`
    );
  }
  const tracedIds = new Set(trace.entries.map((entry) => entry.id));
  for (const id of extractRequirementIds(specMarkdown)) {
    if (!tracedIds.has(id)) {
      errors.push(
        `line "${id}" has no source; every requirement must trace to the task, an answer, or an expert finding`
      );
    }
  }
  const tracedSources = new Set(trace.entries.map((entry) => entry.source));
  const unreflected = acceptedFindingIds.filter((id) => !tracedSources.has(id));
  if (unreflected.length > 0) {
    errors.push(`accepted expert findings not reflected in the spec: ${unreflected.join(", ")}`);
  }
  return { ok: errors.length === 0, errors };
}
function writeTrace(projectRoot, dirName, trace) {
  writeStagedJson(projectRoot, dirName, "trace", trace);
}
function readTrace(projectRoot, dirName) {
  const parsed = readStagedJson(projectRoot, dirName, "trace");
  if (parsed !== null && Array.isArray(parsed.entries)) return parsed;
  const frozen = readFrozenSpecificationBody(projectRoot, dirName);
  const map = frozen?.trace;
  if (typeof map === "object" && map !== null && !Array.isArray(map)) {
    return traceFromMap(map);
  }
  const legacy = frozen?.provenance?.trace;
  return legacy !== void 0 && Array.isArray(legacy.entries) ? legacy : null;
}
function traceFromMap(map) {
  const entries = [];
  for (const [id, source] of Object.entries(map)) {
    const kind = kindOf(id);
    if (kind !== null && typeof source === "string") entries.push({ id, kind, source });
  }
  return { entries };
}
function kindOf(id) {
  const prefix = id.split("-")[0];
  return KINDS.includes(prefix) ? prefix : null;
}
function parseTraceArtifact(raw) {
  if (typeof raw !== "object" || raw === null) return null;
  const entries = raw.entries;
  if (!Array.isArray(entries)) return null;
  const out = [];
  for (const entry of entries) {
    if (typeof entry !== "object" || entry === null) return null;
    const { id, source } = entry;
    if (typeof id !== "string" || typeof source !== "string") return null;
    const kind = kindOf(id);
    if (kind === null) return null;
    out.push({ id, kind, source });
  }
  return { entries: out };
}

// src/spec-pipeline/experts/accounting.ts
init_esm_shims();
function buildExpertAccounting(input) {
  const notesByRole = /* @__PURE__ */ new Map();
  for (const note of input.notes) {
    notesByRole.set(note.role, note);
  }
  const experts = input.needs.map((need) => {
    const note = notesByRole.get(need.role);
    const findings = note?.findings ?? [];
    const changed = findings.some(
      (finding) => finding.id !== void 0 && input.tracedFindingIds.has(finding.id)
    );
    const empty = findings.length === 0 || findings.length === 1 && findings[0].kind === "non-goal";
    return {
      role: need.role,
      reason: need.reason,
      tokens: input.tokens[need.role] ?? 0,
      changed_spec: changed,
      ...need.origin === void 0 ? {} : { origin: need.origin },
      empty
    };
  });
  return {
    experts,
    total_tokens: experts.reduce((total, entry) => total + entry.tokens, 0),
    warnings: [...input.warnings ?? []]
  };
}

// src/spec-pipeline/experts/merge.ts
init_esm_shims();
function mergeExpertNotes(notes, voiceWarnings = []) {
  const byTarget = /* @__PURE__ */ new Map();
  const order = [];
  for (const note of notes) {
    for (const finding of note.findings) {
      const key = normalize(finding.target);
      if (!byTarget.has(key)) {
        byTarget.set(key, []);
        order.push(key);
      }
      byTarget.get(key).push({ role: note.role, finding });
    }
  }
  const findings = [];
  const conflicts = [];
  for (const key of order) {
    const group = byTarget.get(key);
    const distinctClaims = [...new Set(group.map((entry) => normalize(entry.finding.claim)))];
    if (distinctClaims.length <= 1) {
      findings.push(group[0].finding);
      continue;
    }
    conflicts.push({
      target: group[0].finding.target,
      roles: group.map((entry) => entry.role),
      claims: group.map((entry) => entry.finding.claim),
      finding_ids: group.map((entry) => entry.finding.id ?? "")
    });
  }
  return {
    findings,
    conflicts,
    ...voiceWarnings.length > 0 ? { voice_warnings: [...voiceWarnings] } : {}
  };
}
function normalize(text) {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

// src/spec-pipeline/experts/need.ts
init_esm_shims();
function seatStandingExperts(detectorNeeds, standing) {
  const named = new Set(detectorNeeds.map((need) => need.role));
  const seated = detectorNeeds.map((need) => ({ ...need, origin: "detector" }));
  for (const role of standing) {
    if (named.has(role)) continue;
    named.add(role);
    seated.push({ role, reason: "standing expert (always at the table)", origin: "standing" });
  }
  return seated;
}
function fail(error) {
  return { ok: false, error };
}
function validateExpertNeed(raw) {
  const parsed = typeof raw === "string" ? parseJson2(raw) : raw;
  if (parsed === void 0) {
    return fail("expert-need artifact is not valid JSON");
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return fail("expert-need artifact must be an object with an experts[] array");
  }
  const experts = parsed.experts;
  if (!Array.isArray(experts)) {
    return fail("expert-need artifact needs an experts[] array");
  }
  const seen = /* @__PURE__ */ new Set();
  const normalized = [];
  for (const [index, entry] of experts.entries()) {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
      return fail(`experts[${index}] must be an object with role and reason`);
    }
    const { role, reason, origin } = entry;
    if (role === "chief-architect") {
      return fail('"chief-architect" is never picked: it runs automatically when any expert fires');
    }
    if (typeof role !== "string" || !isExpertRole(role)) {
      return fail(
        `experts[${index}].role "${String(role)}" is not an expert in the roster \u2014 the detector may not invent an expert (AC-8)`
      );
    }
    if (typeof reason !== "string" || reason.trim().length === 0) {
      return fail(`experts[${index}] ("${role}") needs a non-empty reason it fired (FR-7)`);
    }
    if (seen.has(role)) {
      return fail(`experts names "${role}" twice \u2014 one decision per expert`);
    }
    seen.add(role);
    normalized.push({
      role,
      reason: reason.trim(),
      origin: origin === "standing" ? "standing" : "detector"
    });
  }
  return { ok: true, artifact: { experts: normalized } };
}
function parseJson2(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return void 0;
  }
}

// src/spec-pipeline/experts/notes.ts
init_esm_shims();
import { existsSync as existsSync14 } from "fs";
import { join as join20 } from "path";

// src/code-knowledge/query.ts
init_esm_shims();
var TOP_CALLERS_LIMIT = 10;
function distinctSorted(values) {
  return [...new Set(values)].sort();
}
function symbolCard(index, symbol) {
  const callers = index.reference_edges.filter((edge) => edge.to === symbol.file && edge.symbol === symbol.name).map((edge) => edge.from);
  return {
    kind: "symbol",
    name: symbol.name,
    file: symbol.file,
    line: symbol.line,
    signature: symbol.signature,
    module_slug: symbol.module_slug,
    extraction_tier: symbol.extraction_tier,
    caller_count: symbol.caller_count,
    orphan: symbol.orphan,
    top_callers: distinctSorted(callers).slice(0, TOP_CALLERS_LIMIT)
  };
}
function fileCard(index, file) {
  const importers = index.import_edges.filter((edge) => edge.to === file.path).map((edge) => edge.from);
  const symbols = index.symbols.filter((symbol) => symbol.file === file.path).map((symbol) => ({ name: symbol.name, caller_count: symbol.caller_count }));
  return {
    kind: "file",
    path: file.path,
    caller_count: file.caller_count,
    orphan: file.orphan,
    entry_point: file.entry_point,
    importers: distinctSorted(importers).slice(0, TOP_CALLERS_LIMIT),
    symbols
  };
}
function queryCodeKnowledge(index, term) {
  const symbolMatches = index.symbols.filter((symbol) => symbol.name === term).map((symbol) => symbolCard(index, symbol));
  if (symbolMatches.length > 0) {
    return { term, matches: symbolMatches };
  }
  const fileMatch = index.files.find((file) => file.path === term);
  if (fileMatch) {
    return { term, matches: [fileCard(index, fileMatch)] };
  }
  return { term, matches: [] };
}

// src/spec-pipeline/plain-language.ts
init_esm_shims();
var JARGON_TERMS = /* @__PURE__ */ new Set([
  "endpoint",
  "backoff",
  "idempotent",
  "idempotency",
  "webhook",
  "mutex",
  "semaphore",
  "cron",
  "regex",
  "middleware",
  "polling",
  "debounce",
  "throttle",
  "websocket",
  "oauth",
  "jwt",
  "csrf",
  "cors",
  "orm",
  "sdk",
  "api",
  "sql",
  "nosql",
  "cache",
  "enum",
  "boolean",
  "null",
  "async",
  "thread",
  "kubernetes",
  "docker",
  "redis",
  "kafka"
]);
var JARGON_PHRASES = ["circuit breaker", "exponential backoff", "fail fast", "race condition"];
var HTTP_VERBS = /* @__PURE__ */ new Set(["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"]);
function looksTechnical(token) {
  if (/[a-z][A-Z]/.test(token)) return true;
  if (/_/.test(token)) return true;
  if (/[/\\]/.test(token)) return true;
  if (/\.[A-Za-z]{1,4}\b/.test(token)) return true;
  if (/\w\(/.test(token)) return true;
  if (/\d/.test(token) && /[A-Za-z]/.test(token)) return true;
  if (HTTP_VERBS.has(token)) return true;
  if (/^[1-5]\d\d$/.test(token)) return true;
  if (JARGON_TERMS.has(token.toLowerCase())) return true;
  return false;
}
function wordBag(text) {
  const bag = /* @__PURE__ */ new Set();
  for (const w of text.toLowerCase().split(/[^a-z0-9_]+/)) {
    if (w.length > 0) bag.add(w);
  }
  return bag;
}
function checkPlainLanguage(question, sources) {
  const haystack = [sources.prompt, ...sources.terms, ...sources.vocabulary ?? []].join(" ");
  const allowed = wordBag(haystack);
  const allowedLower = haystack.toLowerCase();
  const flagged = /* @__PURE__ */ new Set();
  const surfaces = [question.business_text, ...question.options];
  const combined = surfaces.join(" ");
  const combinedLower = combined.toLowerCase();
  for (const phrase of JARGON_PHRASES) {
    if (combinedLower.includes(phrase) && !allowedLower.includes(phrase)) {
      flagged.add(phrase);
    }
  }
  for (const surface of surfaces) {
    for (const rawToken of surface.split(/\s+/)) {
      const token = rawToken.replace(/^[^A-Za-z0-9_/\\.()]+|[^A-Za-z0-9_/\\.()]+$/g, "");
      if (token.length === 0) continue;
      if (!looksTechnical(token)) continue;
      if (allowed.has(token.toLowerCase())) continue;
      flagged.add(token);
    }
  }
  const flaggedList = [...flagged];
  return { ok: flaggedList.length === 0, flagged: flaggedList };
}

// src/spec-pipeline/experts/notes.ts
var FINDING_KINDS = [
  "requirement",
  "invariant",
  "acceptance",
  "risk",
  "non-goal"
];
var FINDING_SEVERITIES = ["must", "should", "could"];
function normalizeTarget(text) {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}
function closestWord(target, entries) {
  for (const entry of entries) {
    const term = normalizeTarget(entry.term);
    if (term.length < 3) continue;
    if (target.includes(term) || term.includes(target)) return entry;
  }
  for (const entry of entries) {
    const shared = normalizeTarget(entry.term).split(/[^a-z0-9]+/).filter((token) => token.length >= 3);
    if (shared.some((token) => target.includes(token))) return entry;
  }
  return null;
}
function checkFindingVoice(finding, sources) {
  const target = normalizeTarget(finding.target);
  if (target.startsWith("new ") || target === "this request") return { ok: true };
  const inVocabulary = sources.vocabulary.some((entry) => normalizeTarget(entry.term) === target);
  if (inVocabulary) return { ok: true };
  if (normalizeTarget(sources.requestText).includes(target)) return { ok: true };
  const stripped = finding.target.replace(/`/g, "").trim();
  if (stripped.length > 0 && existsSync14(join20(sources.projectRoot, stripped))) return { ok: true };
  if (sources.indexPresent) {
    const index = readCodeKnowledgeIndex(sources.projectRoot);
    if (index && queryCodeKnowledge(index, stripped).matches.length > 0) return { ok: true };
  }
  const business = closestWord(
    target,
    sources.vocabulary.filter((entry) => entry.kind !== "technical")
  );
  const technical = closestWord(
    target,
    sources.vocabulary.filter((entry) => entry.kind === "technical")
  );
  const parts = [];
  if (business) parts.push(`the docs say "${business.term}" (${business.kind})`);
  if (technical) parts.push(`the schema page names "${technical.term}"`);
  const closeness = parts.length > 0 ? parts.join(" and ") : "no close match";
  return {
    ok: false,
    hint: `target "${finding.target}" is not a name this project uses; ${closeness}`
  };
}
function fail2(error) {
  return { ok: false, error };
}
function validateExpertNotes(raw, sources, voiceSources) {
  const parsed = typeof raw === "string" ? parseJson3(raw) : raw;
  if (parsed === void 0) return fail2("expert-notes artifact is not valid JSON");
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return fail2("expert-notes artifact must be an object with a notes[] array");
  }
  const obj = parsed;
  if (!Array.isArray(obj.notes)) return fail2("expert-notes artifact needs a notes[] array");
  const notes = [];
  const idCounters = /* @__PURE__ */ new Map();
  for (const [index, entry] of obj.notes.entries()) {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
      return fail2(`notes[${index}] must be an object with role and findings`);
    }
    const { role, findings, questions } = entry;
    if (typeof role !== "string" || !isExpertRole(role)) {
      return fail2(`notes[${index}].role "${String(role)}" is not an expert in the roster`);
    }
    if (!Array.isArray(findings)) {
      return fail2(`notes[${index}] ("${role}") needs a findings[] array`);
    }
    const parsedFindings = [];
    for (const [fi, finding] of findings.entries()) {
      if (typeof finding !== "object" || finding === null || Array.isArray(finding)) {
        return fail2(`notes[${index}].findings[${fi}] must be an object with target and claim`);
      }
      const { target, claim, kind, severity, evidence } = finding;
      if (typeof target !== "string" || target.trim().length === 0) {
        return fail2(`notes[${index}].findings[${fi}] needs a non-empty target`);
      }
      if (typeof claim !== "string" || claim.trim().length === 0) {
        return fail2(`notes[${index}].findings[${fi}] needs a non-empty claim`);
      }
      if (kind !== void 0 && !FINDING_KINDS.includes(kind)) {
        return fail2(
          `notes[${index}].findings[${fi}] has an unknown kind "${String(kind)}" (want ${FINDING_KINDS.join(" | ")})`
        );
      }
      if (severity !== void 0 && !FINDING_SEVERITIES.includes(severity)) {
        return fail2(
          `notes[${index}].findings[${fi}] has an unknown severity "${String(severity)}" (want ${FINDING_SEVERITIES.join(" | ")})`
        );
      }
      if (evidence !== void 0 && typeof evidence !== "string") {
        return fail2(`notes[${index}].findings[${fi}] evidence must be a string when present`);
      }
      const seq = (idCounters.get(role) ?? 0) + 1;
      idCounters.set(role, seq);
      parsedFindings.push({
        id: `EX-${role}-${seq}`,
        target,
        claim,
        kind: kind ?? "requirement",
        severity: severity ?? "should",
        ...typeof evidence === "string" ? { evidence } : {}
      });
    }
    const parsedQuestions = [];
    if (questions !== void 0) {
      if (!Array.isArray(questions)) {
        return fail2(`notes[${index}] ("${role}") questions must be an array when present`);
      }
      for (const [qi, question] of questions.entries()) {
        const validated = validateQuestion(question, `notes[${index}].questions[${qi}]`, sources);
        if (!validated.ok) return fail2(validated.error);
        parsedQuestions.push(validated.question);
      }
    }
    notes.push({
      role,
      findings: parsedFindings,
      ...parsedQuestions.length > 0 ? { questions: parsedQuestions } : {}
    });
  }
  const tokens = {};
  if (obj.tokens !== void 0) {
    if (typeof obj.tokens !== "object" || obj.tokens === null || Array.isArray(obj.tokens)) {
      return fail2('expert-notes "tokens" must be an object of role -> number');
    }
    for (const [role, value] of Object.entries(obj.tokens)) {
      if (!isExpertRole(role)) return fail2(`tokens names "${role}", which is not an expert role`);
      if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
        return fail2(`tokens["${role}"] must be a non-negative number`);
      }
      tokens[role] = value;
    }
  }
  let voice_warnings;
  if (voiceSources) {
    const warnings = [];
    for (const note of notes) {
      for (const finding of note.findings) {
        const result = checkFindingVoice(finding, voiceSources);
        if (!result.ok) {
          warnings.push({ id: finding.id, target: finding.target, hint: result.hint });
        }
      }
    }
    voice_warnings = warnings;
  }
  return {
    ok: true,
    artifact: { notes, tokens, ...voice_warnings === void 0 ? {} : { voice_warnings } }
  };
}
function validateQuestion(raw, path, sources) {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return { ok: false, error: `${path} must be a question object` };
  }
  const q = raw;
  if (typeof q.business_text !== "string" || q.business_text.trim().length === 0) {
    return { ok: false, error: `${path} needs a non-empty business_text` };
  }
  if (typeof q.why_it_matters !== "string" || q.why_it_matters.trim().length === 0) {
    return { ok: false, error: `${path} needs a non-empty why_it_matters` };
  }
  if (!Array.isArray(q.options) || q.options.length === 0 || !q.options.every((o) => typeof o === "string" && o.trim().length > 0)) {
    return { ok: false, error: `${path} needs a non-empty options[] of strings` };
  }
  if (q.grounded_in !== null && typeof q.grounded_in !== "string") {
    return { ok: false, error: `${path} grounded_in must be a string or null` };
  }
  const question = {
    business_text: q.business_text,
    why_it_matters: q.why_it_matters,
    options: q.options,
    grounded_in: q.grounded_in ?? null,
    ...typeof q.technical_note === "string" ? { technical_note: q.technical_note } : {}
  };
  if (sources) {
    const plain = checkPlainLanguage(question, sources);
    if (!plain.ok) {
      return {
        ok: false,
        error: `${path} is not plain language \u2014 flagged: ${plain.flagged.join(", ")}`
      };
    }
  }
  return { ok: true, question };
}
function parseJson3(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return void 0;
  }
}

// src/spec-pipeline/experts/slice.ts
init_esm_shims();
function ceilingWarning(sum, ceiling, count) {
  return `expert slices need ${sum} tokens but the run ceiling is ${ceiling}; scaled ${count} expert${count === 1 ? "" : "s"} to fit \u2014 none dropped`;
}
function planExpertSlices(roles, ceiling) {
  if (roles.length === 0) {
    return { slices: [], warnings: [] };
  }
  const budgets = roles.map((role) => ({ role, budget: expertBudget(role) }));
  const sum = budgets.reduce((total, entry) => total + entry.budget, 0);
  if (sum <= ceiling) {
    return {
      slices: budgets.map(({ role, budget }) => ({
        role,
        budget,
        granted: budget,
        clamped: false
      })),
      warnings: []
    };
  }
  const slices = budgets.map(({ role, budget }) => {
    const granted = Math.max(1, Math.floor(budget / sum * ceiling));
    return { role, budget, granted, clamped: granted < budget };
  });
  return { slices, warnings: [ceilingWarning(sum, ceiling, roles.length)] };
}

// src/spec-pipeline/experts/assemble.ts
function assembleExpertRun(projectRoot, dirName, ceiling) {
  const rawNeed = readExpertNeed(projectRoot, dirName);
  if (rawNeed === null) return null;
  const need = validateExpertNeed(rawNeed);
  if (!need.ok || !need.artifact) return null;
  const roles = need.artifact.experts.map((expert) => expert.role);
  const slicePlan = planExpertSlices(roles, ceiling);
  const rawNotes = readExpertNotes(projectRoot, dirName);
  const notes = rawNotes === null ? { ok: true, artifact: { notes: [], tokens: {} } } : validateExpertNotes(rawNotes);
  const notesArtifact = notes.ok && notes.artifact ? notes.artifact : { notes: [], tokens: {} };
  const merged = mergeExpertNotes(notesArtifact.notes);
  const trace = readTrace(projectRoot, dirName);
  const tracedFindingIds = new Set((trace?.entries ?? []).map((entry) => entry.source));
  const accounting = buildExpertAccounting({
    needs: need.artifact.experts,
    notes: notesArtifact.notes,
    tokens: notesArtifact.tokens,
    tracedFindingIds,
    warnings: slicePlan.warnings
  });
  return { accounting, conflicts: merged.conflicts };
}

// src/spec-pipeline/metrics.ts
function numberField(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
function buildRunMetrics(projectRoot, dirName, config, a5Live, a5Verdict) {
  const grounding = readStagedJson(
    projectRoot,
    dirName,
    "grounding"
  );
  const label = readLabel(projectRoot, dirName);
  const questionsArtifact = readQuestions(projectRoot, dirName);
  const task = readStagedJson(projectRoot, dirName, "task");
  const trace = readStagedJson(projectRoot, dirName, "trace");
  const spec = readSpec(projectRoot, dirName);
  const questions = {
    asked: questionsArtifact?.asked ?? 0,
    answered: questionsArtifact?.answered ?? 0,
    auto_answered: questionsArtifact?.auto_answered?.length ?? 0,
    deferred: questionsArtifact?.deferred ?? 0
  };
  const tokensByStep = {};
  const setStep = (step, value) => {
    if (value !== void 0) tokensByStep[step] = value;
  };
  const questionsRow = readSpecStepRows(projectRoot, dirName).filter((row) => row.step === "questions" && row.outcome === "complete").at(-1);
  setStep("questions", numberField(questionsRow?.tokens));
  setStep("task", numberField(task?.tokens));
  setStep("craft", numberField(trace?.tokens));
  const tiersByStep = {};
  const need = readNeed(projectRoot, dirName);
  const expertCount = need?.experts.length ?? 0;
  const ceilingWarnings = need ? planExpertSlices(
    need.experts.map((expert) => expert.role),
    config.token_ceiling
  ).warnings : [];
  if (need) {
    const notes = readExpertNotes(projectRoot, dirName);
    for (const [role, value] of Object.entries(notes?.tokens ?? {})) {
      const n = numberField(value);
      if (n !== void 0) tokensByStep[role] = n;
    }
    const synthesis = readExpertSynthesis(projectRoot, dirName);
    if (synthesis) {
      setStep("experts", numberField(synthesis.tokens));
      tiersByStep.experts = "reasoning";
    }
  }
  const freezeChecksFired = spec ? evaluateSpecFreeze(spec.spec).blockers : [];
  return {
    grounding_sparse: grounding?.sparse ?? false,
    grounding_path: grounding?.path === "rag" ? "rag" : "docs-fallback",
    label: label?.label ?? "clear",
    signal_count: label?.signals.length ?? 0,
    questions,
    expert_count: expertCount,
    spec_words: spec ? spec.words : 0,
    tokens_by_step: tokensByStep,
    tiers_by_step: tiersByStep,
    ceiling_warnings: ceilingWarnings,
    a5_live: a5Live,
    a5_verdict: a5Verdict,
    freeze_checks_fired: freezeChecksFired
  };
}
function readNeed(projectRoot, dirName) {
  const raw = readExpertNeed(projectRoot, dirName);
  if (raw === null) return null;
  const validated = validateExpertNeed(raw);
  return validated.ok && validated.artifact ? validated.artifact : null;
}
function readSpec(projectRoot, dirName) {
  const markdown = readStagedText(projectRoot, dirName, "craft");
  if (markdown === null) return null;
  const words = markdown.split(/\s+/).filter((token) => token.length > 0).length;
  try {
    return {
      spec: buildFeatureSpec({ spec_id: "metrics", spec_file: "spec.md", spec_markdown: markdown }),
      words
    };
  } catch {
    return null;
  }
}
function recordSpecCorrection(projectRoot, dirName, correction) {
  appendSpecCorrectionRow(
    projectRoot,
    dirName,
    { spec_id: correction.spec_id, changed_sections: correction.changed_sections },
    { now: () => new Date(correction.at) }
  );
}
function readSpecCorrections(projectRoot, dirName) {
  return readSpecCorrectionRows(projectRoot, dirName).map((row) => ({
    spec_id: String(row.spec_id),
    changed_sections: row.changed_sections,
    at: String(row.recorded_at)
  }));
}
function pipelineRun(projectRoot, dirName) {
  if (readStagedJson(projectRoot, dirName, "finish")?.provenance) {
    return { legacy: null };
  }
  const frozen = readFrozenSpecificationBody(projectRoot, dirName);
  if (frozen?.pipeline?.produced === true) {
    return { legacy: null };
  }
  const legacy = frozen?.provenance;
  return legacy?.pipeline_produced === true ? { legacy } : null;
}
function stepTokens(projectRoot, dirName) {
  const tokens = /* @__PURE__ */ new Map();
  for (const row of readSpecStepRows(projectRoot, dirName)) {
    const n = numberField(row.tokens);
    if (row.outcome === "redone") tokens.delete(String(row.step));
    else if (row.outcome === "complete" && n !== void 0) tokens.set(String(row.step), n);
  }
  return tokens;
}
function aggregateSpecPipelineMetrics(projectRoot, dirNames) {
  const aggregate = {
    runs: 0,
    experts_fired: {},
    changed_spec_rate: {},
    tokens_by_role: {},
    tokens_by_step: {},
    conflicts: 0,
    auto_resolved: 0,
    corrections_by_section: {},
    label_distribution: {},
    grounding_sparse_runs: 0,
    tier_by_role: {},
    empty_by_role: {},
    voice_warnings_by_role: {},
    renames: 0
  };
  for (const dirName of dirNames) {
    for (const correction of readSpecCorrections(projectRoot, dirName)) {
      for (const section of correction.changed_sections) {
        aggregate.corrections_by_section[section] = (aggregate.corrections_by_section[section] ?? 0) + 1;
      }
    }
    const run = pipelineRun(projectRoot, dirName);
    if (run === null) continue;
    aggregate.runs += 1;
    const experts = assembleExpertRun(projectRoot, dirName, Number.MAX_SAFE_INTEGER);
    const fired = (role) => {
      aggregate.experts_fired[role] = (aggregate.experts_fired[role] ?? 0) + 1;
      const rate = aggregate.changed_spec_rate[role] ??= { fired: 0, changed: 0 };
      rate.fired += 1;
      return rate;
    };
    if (experts) {
      for (const expert of experts.accounting.experts) {
        const rate = fired(expert.role);
        if (expert.changed_spec) rate.changed += 1;
        aggregate.tokens_by_role[expert.role] = (aggregate.tokens_by_role[expert.role] ?? 0) + expert.tokens;
        if (expert.origin === "standing") aggregate.tier_by_role[expert.role] = "standing";
        else if (aggregate.tier_by_role[expert.role] === void 0)
          aggregate.tier_by_role[expert.role] = "on-call";
        const emptyRate = aggregate.empty_by_role[expert.role] ??= { fired: 0, empty: 0 };
        emptyRate.fired += 1;
        if (expert.empty) emptyRate.empty += 1;
      }
      aggregate.conflicts += experts.conflicts.length;
      for (const warning of readExperts(projectRoot, dirName)?.voice_warnings ?? []) {
        const role = roleOfFindingId(warning.id);
        if (role) {
          aggregate.voice_warnings_by_role[role] = (aggregate.voice_warnings_by_role[role] ?? 0) + 1;
        }
      }
    } else if (run.legacy?.experts) {
      for (const role of run.legacy.experts.roles) fired(role);
      aggregate.conflicts += run.legacy.experts.conflicts;
    }
    const label = readLabel(projectRoot, dirName)?.label ?? run.legacy?.label;
    if (label !== void 0) {
      aggregate.label_distribution[label] = (aggregate.label_distribution[label] ?? 0) + 1;
    }
    const sparse = readGrounding(projectRoot, dirName)?.sparse ?? run.legacy?.grounding?.sparse;
    if (sparse === true) aggregate.grounding_sparse_runs += 1;
    const synthesis = readExpertSynthesis(projectRoot, dirName);
    const tokens = stepTokens(projectRoot, dirName);
    const synthesisTokens = numberField(synthesis?.tokens);
    if (!tokens.has("experts") && synthesisTokens !== void 0) {
      tokens.set("experts", synthesisTokens);
    }
    for (const [step, value] of tokens) {
      aggregate.tokens_by_step[step] = (aggregate.tokens_by_step[step] ?? 0) + value;
    }
    aggregate.auto_resolved += synthesis?.auto_resolved?.length ?? 0;
    aggregate.renames += synthesis?.renames?.length ?? 0;
  }
  return aggregate;
}
function roleOfFindingId(id) {
  const match = /^EX-(.+)-\d+$/.exec(id);
  return match ? match[1] : null;
}
function listRunDirs(projectRoot) {
  return listFeatureDirs(projectRoot);
}

// src/spec/spec-decisions.ts
init_esm_shims();
var DEFAULT_REQUESTED_BY = "spec-stage";
function buildSpecChangePacket(input) {
  return buildPacket("spec.change", input, {
    question: "The goal changed mid-build. Update the frozen spec and re-freeze, or keep it as-is?",
    options: [
      {
        option_key: "update-and-refreeze",
        label: "Take the new goal",
        one_line_preview: `If you pick this, we will update ${input.spec_file} to the new goal and re-freeze it.`,
        trade_off: "You give up: the first frozen goal, so the new one becomes the bar."
      },
      {
        option_key: "keep-current-spec",
        label: "Keep the current spec",
        one_line_preview: "If you pick this, we will keep building to the spec already frozen.",
        trade_off: "You give up: capturing the new goal, so the change waits."
      }
    ],
    recommendation: "update-and-refreeze",
    recommendation_reason: "A real goal change must update the spec and re-freeze before work continues."
  });
}
function buildPacket(category, input, shape) {
  const ttlDays = DECISION_CATEGORY_DEFAULTS[category].ttl_days;
  const ttlUntil = new Date(
    new Date(input.created_at).getTime() + ttlDays * 24 * 60 * 60 * 1e3
  ).toISOString();
  const fingerprint2 = `sha256:${sha256Hex(`${category}:${input.spec_id}:${input.detail}`)}`;
  const packet = {
    decision_id: input.decision_id,
    fingerprint: fingerprint2,
    category,
    question: shape.question,
    context: `Spec ${input.spec_id} (${input.spec_file}). ${input.detail}`,
    options: shape.options.map((option) => ({ ...option, evidence: {} })),
    confidence: 0.5,
    requested_by: input.requested_by ?? DEFAULT_REQUESTED_BY,
    task_session_id: input.task_session_id,
    linked_requirements: [],
    created_at: input.created_at,
    status: "pending",
    ttl_until: ttlUntil,
    invalidation_watch: [input.spec_file]
  };
  if (shape.recommendation !== null) {
    packet.recommendation = shape.recommendation;
    packet.recommendation_reason = shape.recommendation_reason;
  }
  return packet;
}

// src/spec/spec-change-guard.ts
function diffSpecSections(frozen, current) {
  const changed = [];
  const differs = (a, b) => JSON.stringify(a) !== JSON.stringify(b);
  if (differs(frozen.behaviour, current.behaviour)) changed.push("behaviour");
  if (differs(frozen.acceptance_criteria, current.acceptance_criteria)) {
    changed.push("acceptance_criteria");
  }
  if (differs(frozen.invariants, current.invariants)) changed.push("invariants");
  if (differs(frozen.non_goals ?? [], current.non_goals ?? [])) changed.push("non_goals");
  return changed;
}
function pipelineProduced(spec) {
  return spec.pipeline?.produced === true || spec.provenance?.pipeline_produced === true;
}
var NO_OP3 = { ran: false, blocking: false, summary: "" };
function watchedSpec(dirName, spec) {
  return spec.spec_file === FEATURE_BUNDLE_FILES.specMd ? { spec, dirName, source: featureFilePath(dirName, "specMd"), bundled: true } : { spec, dirName, source: spec.spec_file, bundled: false };
}
var STALE_DETAIL = "The frozen spec source changed since it was frozen \u2014 the goal may have moved. Confirm the new goal before more is built on the old one.";
function mintedSummary2(specId) {
  return `**\u25B8 paqad** \xB7 the frozen spec ${specId} changed mid-build \u2014 that's a goal call that's yours
> I paused and wrote it up so you can update-and-refreeze or hold the line \u2014 answer it, then I'll continue.`;
}
function runSpecChangeGuard(input) {
  if (input.seam !== void 0 && input.seam !== "pre-mutation") return NO_OP3;
  if (!input.sessionId) return NO_OP3;
  const specs = input.frozenSpecs ? input.frozenSpecs.map((spec) => ({
    spec,
    dirName: null,
    source: spec.spec_file,
    bundled: false
  })) : readAllFeatureSpecificationEntries(input.projectRoot).map(
    (entry) => watchedSpec(entry.dirName, entry.spec)
  );
  if (specs.length === 0) return NO_OP3;
  const store = input.store ?? new DecisionStore(input.projectRoot);
  store.initialize();
  if (store.listPendingDecisionIds().length > 0) return NO_OP3;
  const readMarkdown = input.readMarkdown ?? ((specFile) => readFileSync19(join21(input.projectRoot, specFile), "utf8"));
  const now = input.now?.() ?? /* @__PURE__ */ new Date();
  for (const { spec, dirName, source, bundled } of specs) {
    let currentMarkdown;
    try {
      const text = readMarkdown(source);
      currentMarkdown = bundled ? splitFrontMatter(text).body : text;
    } catch {
      continue;
    }
    if (!isFrozenSpecStale(spec, sha256Hex(currentMarkdown))) continue;
    const changedSections = diffSpecSections(
      spec,
      buildFeatureSpec({
        spec_id: spec.spec_id,
        spec_file: spec.spec_file,
        spec_markdown: currentMarkdown
      })
    );
    if (dirName !== null && pipelineProduced(spec)) {
      recordSpecCorrection(input.projectRoot, dirName, {
        spec_id: spec.spec_id,
        changed_sections: changedSections,
        at: now.toISOString()
      });
    }
    const packet = buildSpecChangePacket({
      decision_id: store.nextDecisionId(),
      spec_id: spec.spec_id,
      spec_file: source,
      detail: changedSections.length > 0 ? `${STALE_DETAIL} Changed sections: ${changedSections.join(", ")}.` : STALE_DETAIL,
      task_session_id: input.sessionId,
      created_at: now.toISOString()
    });
    if (store.findReusableDecision(packet)) continue;
    try {
      store.writePending(packet);
      return { ran: true, blocking: false, summary: mintedSummary2(spec.spec_id) };
    } catch {
      return NO_OP3;
    }
  }
  return NO_OP3;
}

// src/feature-evidence/manifest.ts
init_esm_shims();
function laneRunsSpecPipeline(lane) {
  return lane !== "fast";
}
function laneHasStage(stage) {
  return (config) => isLaneStage(config.lane, stage);
}
function specPipelineApplies(config) {
  return config.specPipelineEnabled && laneRunsSpecPipeline(config.lane) && !config.specFrozenBeforePipeline;
}
function specPipelineStrictApplies(config) {
  return config.specPipelineStrict && laneRunsSpecPipeline(config.lane) && !config.specFrozenBeforePipeline;
}
var BUNDLE_MANIFEST = [
  {
    key: "feature",
    file: FEATURE_BUNDLE_FILES.feature,
    required: "always",
    writer: "feature mint (paqad-ai stage start / plan compile)",
    validate: "json"
  },
  {
    key: "plan",
    file: FEATURE_BUNDLE_FILES.plan,
    required: "always",
    writer: "paqad-ai plan compile",
    validate: "json"
  },
  {
    key: "specification",
    file: FEATURE_BUNDLE_FILES.specification,
    required: laneHasStage("specification"),
    writer: "paqad-ai spec freeze",
    validate: "json"
  },
  {
    key: "specMd",
    file: FEATURE_BUNDLE_FILES.specMd,
    required: laneHasStage("specification"),
    writer: "paqad-ai spec freeze",
    validate: "nonempty"
  },
  {
    key: "request",
    file: FEATURE_BUNDLE_FILES.request,
    required: specPipelineApplies,
    writer: "paqad-ai spec pipeline start",
    validate: "nonempty"
  },
  {
    key: "clarification",
    file: FEATURE_BUNDLE_FILES.clarification,
    required: specPipelineApplies,
    writer: "paqad-ai spec pipeline (label + questions)",
    validate: "json"
  },
  {
    key: "experts",
    file: FEATURE_BUNDLE_FILES.experts,
    required: (config) => specPipelineApplies(config) && config.expertsEnabled,
    writer: "paqad-ai spec pipeline experts",
    validate: "json"
  },
  {
    key: "highTable",
    file: FEATURE_BUNDLE_FILES.highTable,
    required: "optional",
    writer: "paqad-ai spec pipeline experts (record, brief, context, notes, synthesis) + SubagentStop hook",
    validate: "jsonl>=1"
  },
  {
    key: "cost",
    file: FEATURE_BUNDLE_FILES.cost,
    required: "optional",
    writer: "Stop and SubagentStop hooks (record-only)",
    validate: "json"
  },
  {
    key: "decisions",
    file: FEATURE_BUNDLE_FILES.decisions,
    required: "optional",
    writer: "paqad-ai decision resolve (decisions index)",
    validate: "json"
  },
  {
    key: "techDebt",
    file: FEATURE_BUNDLE_FILES.techDebt,
    required: "optional",
    writer: "paqad-ai debt add (tech-debt index)",
    validate: "json"
  },
  {
    key: "ruleOverrides",
    file: FEATURE_BUNDLE_FILES.ruleOverrides,
    required: "optional",
    writer: "paqad-ai rules override",
    validate: "jsonl>=1"
  },
  {
    key: "fixProof",
    file: FEATURE_BUNDLE_FILES.fixProof,
    required: "optional",
    writer: "paqad-ai fix prove",
    validate: "json"
  },
  {
    key: "review",
    file: FEATURE_BUNDLE_FILES.review,
    required: laneHasStage("review"),
    writer: "paqad-ai review record",
    validate: "json"
  },
  {
    key: "stageEvidence",
    file: FEATURE_BUNDLE_FILES.stageEvidence,
    required: "always",
    writer: "stage recorder",
    validate: "jsonl>=1"
  },
  {
    key: "ruleRun",
    file: FEATURE_BUNDLE_FILES.ruleRun,
    required: (config) => config.ruleComplianceOn,
    writer: "rule-scripts runner",
    validate: "jsonl>=1"
  },
  {
    key: "rulesLoaded",
    file: FEATURE_BUNDLE_FILES.rulesLoaded,
    required: "optional",
    writer: "paqad-ai rules load",
    validate: "json"
  },
  {
    key: "delivery",
    file: FEATURE_BUNDLE_FILES.delivery,
    required: "always",
    writer: "feature open + paqad-ai delivery-link + paqad-ai deliver + the Stop delivery check",
    validate: "json"
  },
  {
    key: "checks",
    file: FEATURE_BUNDLE_FILES.checks,
    required: "optional",
    writer: "paqad-ai checks run",
    validate: "json"
  },
  {
    key: "changeMetrics",
    file: FEATURE_BUNDLE_FILES.changeMetrics,
    required: (config) => config.metricsEnabled,
    writer: "change-metrics collector",
    validate: "jsonl>=1"
  },
  {
    key: "duplication",
    file: FEATURE_BUNDLE_FILES.duplication,
    required: (config) => config.duplicationOn,
    writer: "duplication scan",
    validate: "jsonl>=1"
  },
  {
    key: "report",
    file: "report.html",
    required: (config) => config.featureReport,
    writer: "feature report renderer (writeFeatureReport)",
    validate: "nonempty"
  },
  {
    key: "rag",
    file: FEATURE_BUNDLE_FILES.rag,
    required: (config) => config.ragEnabled,
    writer: "RAG recorder",
    validate: "jsonl>=1",
    unrecoverable: true
  },
  {
    key: "receipt",
    file: FEATURE_BUNDLE_FILES.receipt,
    required: (config) => config.enterprise && config.evidenceLedger,
    writer: "projectFeatureReceipt",
    validate: "json"
  },
  {
    key: "evidence",
    file: FEATURE_BUNDLE_FILES.evidence,
    required: "always",
    writer: "appendFeatureEvidenceRows",
    validate: "jsonl>=1"
  },
  {
    key: "aiBom",
    file: FEATURE_BUNDLE_FILES.aiBom,
    required: (config) => config.enterprise && config.aiBom,
    writer: "projectFeatureReceipt (AI-BOM)",
    validate: "json"
  },
  {
    key: "visualEvidence",
    file: FEATURE_BUNDLE_FILES.visualEvidence,
    required: "optional",
    writer: "paqad-ai visual-evidence run",
    validate: "json"
  }
];
function readSpecAdoption(spec) {
  if (typeof spec !== "object" || spec === null) return null;
  const record = spec;
  const section = record.pipeline ?? record.provenance;
  if (typeof section !== "object" || section === null) return null;
  const produced = record.pipeline ? record.pipeline.produced : section.pipeline_produced;
  return {
    produced: produced === true,
    ...typeof section.manual_reason === "string" ? { manual_reason: section.manual_reason } : {},
    ...record.pipeline?.skipped === "fast-lane" ? { fast_lane: true } : {}
  };
}
function isSpecFrozenBeforePipeline(spec) {
  return typeof spec === "object" && spec !== null && readSpecAdoption(spec) === null;
}
function isSpecFrozenOnFastLane(spec) {
  return readSpecAdoption(spec)?.fast_lane === true;
}
var FAST_LANE_REFREEZE_HINT = "the lane was raised after a fast-lane freeze: re-freeze the spec through the spec pipeline (paqad-ai spec pipeline start, then spec freeze --from-pipeline)";
function validateSpecificationAdoption(content) {
  const failure = {
    ok: false,
    error: "specification.json was not produced by the spec pipeline and records no manual reason (spec_pipeline_adoption=strict); re-freeze with --from-pipeline or --manual --reason"
  };
  if (content === null) return failure;
  let adoption;
  try {
    adoption = readSpecAdoption(JSON.parse(content));
  } catch {
    return failure;
  }
  if (!adoption) return failure;
  if (adoption.produced) return { ok: true };
  if (adoption.fast_lane) {
    return {
      ok: false,
      error: `specification.json was frozen on the fast lane; ${FAST_LANE_REFREEZE_HINT}`
    };
  }
  if (adoption.manual_reason !== void 0 && adoption.manual_reason.trim().length > 0) {
    return { ok: true };
  }
  return failure;
}
function isBundleFileRequired(entry, config) {
  if (entry.required === "always") return true;
  if (entry.required === "optional") return false;
  return entry.required(config);
}
function validateBundleFileContent(validate, content) {
  if (content === null) {
    return false;
  }
  switch (validate) {
    case "json":
      try {
        JSON.parse(content);
        return true;
      } catch {
        return false;
      }
    case "jsonl>=1":
      return content.split("\n").some((line) => line.trim().length > 0);
    case "nonempty":
      return content.trim().length > 0;
  }
}

// src/feature-evidence/rules-loaded.ts
init_esm_shims();
import { mkdirSync as mkdirSync12, readFileSync as readFileSync20, writeFileSync as writeFileSync13 } from "fs";
import { dirname as dirname12, join as join22 } from "path";
var RULES_LOADED_DOC_TYPE = "paqad.rules-loaded";
var RULES_LOADED_SCHEMA_VERSION = 2;
function atomicWriteJson4(absPath, value) {
  mkdirSync12(dirname12(absPath), { recursive: true });
  const tmp = `${absPath}.tmp`;
  writeFileSync13(tmp, `${JSON.stringify(value, null, 2)}
`, "utf8");
  renameWithRetrySync(tmp, absPath);
}
function buildRulesLoadedRecord(dirName, sessionId, input) {
  return buildDocumentEnvelope({
    docType: RULES_LOADED_DOC_TYPE,
    change: featureChangeKey(dirName),
    sessionId,
    schemaVersion: RULES_LOADED_SCHEMA_VERSION,
    now: input.now,
    body: {
      changed_files: [...input.changedPaths],
      applicable_rules: input.applicable,
      rule_text_hash: input.ruleTextHash,
      artifact: PATHS.CONTEXT_SESSION_ARTIFACT
    }
  });
}
function writeRulesLoaded(projectRoot, sessionId, input) {
  const dirName = currentFeature(projectRoot, sessionId);
  if (!dirName) {
    return null;
  }
  const record = buildRulesLoadedRecord(dirName, sessionId, input);
  atomicWriteJson4(join22(projectRoot, featureFilePath(dirName, "rulesLoaded")), record);
  return record;
}
function readRulesLoaded(projectRoot, dirName) {
  try {
    return JSON.parse(
      readFileSync20(join22(projectRoot, featureFilePath(dirName, "rulesLoaded")), "utf8")
    );
  } catch {
    return null;
  }
}
function coverageGaps(record, currentApplicableIds) {
  const recorded = new Set((record?.applicable_rules ?? []).map((rule) => rule.rule_id));
  return currentApplicableIds.filter((id) => !recorded.has(id));
}

// src/stage-evidence/mode.ts
init_esm_shims();
var STAGES_MODES = ["off", "warn", "strict"];
var DEFAULT_STAGES_MODE = "strict";
function resolveStagesMode(projectRoot, env = process.env) {
  return resolveFlooredMode(
    {
      team: readConfigsDir(projectRoot).merged.get("stages_mode"),
      local: readDotConfig(projectRoot).get("stages_mode"),
      env: env.PAQAD_STAGES_MODE
    },
    STAGES_MODES,
    DEFAULT_STAGES_MODE
  );
}

// src/stage-evidence/scope.ts
init_esm_shims();
function toRelativePosix(targetPath, projectRoot) {
  const rel = projectRoot && isAbsolute(targetPath) ? relative(projectRoot, targetPath) : targetPath;
  return rel.replace(/\\/g, "/").replace(/^\.\//, "");
}
function isFrameworkInternalPath(targetPath, projectRoot) {
  const p = toRelativePosix(targetPath, projectRoot);
  return p === "" || p === ".paqad" || p.startsWith(".paqad/") || p.startsWith("../");
}
function isDocumentationPath(targetPath, projectRoot) {
  const p = toRelativePosix(targetPath, projectRoot);
  if (p === "docs" || p.startsWith("docs/")) return true;
  if (/\.(md|mdx|markdown|mdown|rst|adoc)$/i.test(p)) return true;
  if (/^(readme|changelog|contributing|license|licence|notice|authors)(\.|$)/i.test(p)) return true;
  return false;
}
var HOST_AGENT_CONFIG_DIRS = [
  ".claude",
  ".codex",
  ".gemini",
  ".junie",
  ".cursor",
  ".windsurf",
  ".continue",
  ".aider",
  ".aiassistant",
  ".ai"
];
var HOST_AGENT_CONFIG_FILES = [".windsurfrules"];
function isHostAgentConfigPath(targetPath, projectRoot) {
  const p = toRelativePosix(targetPath, projectRoot);
  if (HOST_AGENT_CONFIG_FILES.includes(p)) {
    return true;
  }
  return HOST_AGENT_CONFIG_DIRS.some((dir) => p === dir || p.startsWith(`${dir}/`));
}
function isFeatureDevEdit(targetPath, projectRoot) {
  if (!targetPath) return true;
  if (isFrameworkInternalPath(targetPath, projectRoot)) return false;
  if (isHostAgentConfigPath(targetPath, projectRoot)) return false;
  if (isDocumentationPath(targetPath, projectRoot)) return false;
  return true;
}
function changeIsFeatureDev(files, projectRoot) {
  return files.some((file) => isFeatureDevEdit(file, projectRoot));
}

// src/kernel/compat.ts
init_esm_shims();
function evaluateCapabilityCompat(projectRoot, descriptor) {
  const blessed = readCapabilityVersions(projectRoot, descriptor.id);
  if (blessed === null) {
    return "unversioned";
  }
  if (blessed.policy > descriptor.policySchemaVersion || blessed.record > descriptor.recordSchemaVersion) {
    return "project-ahead";
  }
  if (blessed.policy < descriptor.policySchemaVersion || blessed.record < descriptor.recordSchemaVersion) {
    return "project-behind";
  }
  return "current";
}
function isRefusedByCompat(compat) {
  return compat === "project-ahead";
}

// src/kernel/capability.ts
var NO_OP4 = { ran: false, blocking: false, summary: "" };
var RULE_COMPLIANCE_MODES = ["off", "warn", "strict"];
var DEFAULT_RULE_COMPLIANCE = "warn";
function resolveRuleComplianceMode(projectRoot, env = process.env) {
  return resolveFlooredMode(
    {
      team: stricterTeamFloor(
        readConfigsDir(projectRoot).merged.get("rule_compliance"),
        readProjectRuleComplianceModeOverride(projectRoot)
      ),
      local: readDotConfig(projectRoot).get("rule_compliance"),
      env: env.PAQAD_RULE_COMPLIANCE
    },
    RULE_COMPLIANCE_MODES,
    DEFAULT_RULE_COMPLIANCE
  );
}
function stricterTeamFloor(a, b) {
  const rank = (raw) => raw === void 0 ? -1 : RULE_COMPLIANCE_MODES.indexOf(raw.trim().toLowerCase());
  const rankA = rank(a);
  const rankB = rank(b);
  const winner = Math.max(rankA, rankB);
  return winner < 0 ? void 0 : RULE_COMPLIANCE_MODES[winner];
}
function verifyRuleScriptsIntegrity(projectRoot) {
  const digest = computeRuleScriptsDigest(projectRoot);
  if (digest === null) {
    return "ok";
  }
  const locked = readCapabilityDigest(projectRoot, "rule-scripts");
  if (locked === null) {
    return "unverified";
  }
  return locked === digest ? "ok" : "tampered";
}
function formatTamperSummary(mode) {
  const blocking = mode === "strict";
  const verb = blocking ? "Needs your attention" : "Heads up";
  const glyph = blocking ? "\u{1F534}" : "\u{1F7E1}";
  const tail = blocking ? "" : " (warn mode, not blocking)";
  return `**\u25B8 paqad** \xB7 scripted-rule bindings changed outside the engine
> ${glyph} ${verb} \u2014 your rule-script bindings were edited outside paqad, so I can't trust this check; a binding may have been weakened. Re-bless them with \`analyze rules\` / \`generate rule scripts\`, then commit the updated lock.${tail}`;
}
function formatNoneArmedSummary() {
  return `**\u25B8 paqad** \xB7 scripted rules: \u26AA none armed
> No rule-scripts are registered for this repo, so I ran no scripted enforcement. Your checks passed on the toolchain (format/tests/build), not on the team's rule-scripts \u2014 arm them with \`generate rule scripts\` to enforce the rules deterministically.`;
}
function formatUnverifiedSummary() {
  return `**\u25B8 paqad** \xB7 scripted-rule bindings not yet attested
> \u{1F7E1} Heads up \u2014 your rule-script bindings have no integrity lock yet, so I can't attest they are unchanged. Re-run \`generate rule scripts\` to bless them. (advisory, not blocking)`;
}
function formatCompatRefusalSummary() {
  return `**\u25B8 paqad** \xB7 scripted-rule enforcement paused \u2014 framework update pending
> \u{1F7E1} Heads up \u2014 this project's rule-script bindings were blessed by a newer paqad than the one installed here, so I'm holding off enforcing them rather than risk misreading a newer format. The framework self-heals on update, then I'll resume. (advisory, not blocking)`;
}
function payloadFeatureDev(payload, projectRoot) {
  if (payload?.targetPaths && payload.targetPaths.length > 0) {
    return changeIsFeatureDev(payload.targetPaths, projectRoot);
  }
  return isFeatureDevEdit(payload?.targetPath, projectRoot);
}
var ruleScriptsCapability = {
  id: "rule-scripts",
  async evaluate({ projectRoot, seam, env, payload }) {
    if (seam === "pre-mutation" && !payloadFeatureDev(payload, projectRoot)) {
      return NO_OP4;
    }
    if (seam === "completion" && !classifyCompletionEnforcement(
      projectRoot,
      payload?.sessionId ?? env.CLAUDE_SESSION_ID ?? null
    ).enforce) {
      return NO_OP4;
    }
    const mode = resolveRuleComplianceMode(projectRoot, env);
    if (mode === "off") {
      return NO_OP4;
    }
    if (isRefusedByCompat(evaluateCapabilityCompat(projectRoot, getCapability("rule-scripts")))) {
      return { ran: true, blocking: false, summary: formatCompatRefusalSummary() };
    }
    const integrity = verifyRuleScriptsIntegrity(projectRoot);
    if (integrity === "tampered") {
      return { ran: true, blocking: mode === "strict", summary: formatTamperSummary(mode) };
    }
    const result = await enforceRuleScripts({
      projectRoot,
      mode,
      scope: seam === "completion" ? "changed-files" : "whole-tree"
    });
    if (!result.ran) {
      if (seam === "completion" && result.armed === 0) {
        return { ran: true, blocking: false, summary: formatNoneArmedSummary() };
      }
      return NO_OP4;
    }
    if (result.violations.length === 0) {
      return integrity === "unverified" ? { ran: true, blocking: false, summary: formatUnverifiedSummary() } : NO_OP4;
    }
    return {
      ran: true,
      blocking: result.blocking,
      summary: result.summary,
      violations: result.violations
    };
  }
};
function formatMissingStageSummary(stage, mode) {
  const blocking = mode === "strict";
  const verb = blocking ? "Needs your attention" : "Heads up";
  const glyph = blocking ? "\u{1F534}" : "\u{1F7E1}";
  const tail = blocking ? "" : " (warn mode, not blocking)";
  const endMarker = isArtifactBearingStage(stage) ? `\`paqad:stage ${stage} end -- <artifact-path>\` (a real, non-empty file \u2014 e.g. a plan/spec/findings file)` : `\`paqad:stage ${stage} end\``;
  const endCli = isArtifactBearingStage(stage) ? `\`paqad-ai stage end ${stage} --artifact <artifact-path>\`` : `\`paqad-ai stage end ${stage}\``;
  return `**\u25B8 paqad** \xB7 run ${stage} before you change code
> ${glyph} ${verb} \u2014 the feature-development workflow needs the **${stage}** stage recorded before this edit. Mark it: emit \`paqad:stage ${stage} start\` and ${endMarker} each on its own line (parsed before the next edit, so they clear this block in the same turn), or run \`paqad-ai stage start ${stage}\` then ${endCli}. Set stages_mode=warn/off in .paqad/configs/.config.policy to adopt the workflow before enforcing.${tail}`;
}
function sweepSameTurnMarkers(projectRoot, transcriptPath, sessionId, adapter) {
  if (!transcriptPath) return "";
  let transcriptText;
  try {
    transcriptText = readFileSync21(transcriptPath, "utf8");
  } catch {
    return "";
  }
  const recorded = parseAndRecordMarkers({ projectRoot, transcriptText, sessionId, adapter });
  return markerBatchNarration(recorded);
}
function bundleFileWriter(filename) {
  if (filename === SCREENSHOTS_DIR || filename.startsWith(`${SCREENSHOTS_DIR}/`)) {
    return "paqad-ai visual-evidence run (or visual-evidence attach)";
  }
  return BUNDLE_MANIFEST.find((entry) => entry.file === filename)?.writer ?? null;
}
function formatBundleWriteSummary(relPath, writer) {
  const remedy = writer ? `This file is written by \`${writer}\`. Run that verb and hand it your content instead.` : `No verb writes this file, so it does not belong in the bundle. Keep your notes outside \`.paqad/ledger/feature-evidence/\`.`;
  return `**\u25B8 paqad** \xB7 bundle files are written by paqad, not by hand
> \u{1F534} Needs your attention \u2014 \`${relPath}\` sits inside a feature evidence bundle, and every file there is created by a paqad verb so the record can be trusted. ${remedy}`;
}
function firstBundleTarget(payload, projectRoot) {
  const targets = payload?.targetPaths && payload.targetPaths.length > 0 ? payload.targetPaths : payload?.targetPath ? [payload.targetPath] : [];
  for (const target of targets) {
    let rel;
    try {
      rel = normalizeArtifactPath(projectRoot, target);
    } catch {
      continue;
    }
    const classified = classifyBundlePath(rel);
    if (classified) return { rel, filename: classified.filename };
  }
  return null;
}
var stagesCapability = {
  id: "stages",
  async evaluate({ projectRoot, seam, env, payload }) {
    if (seam !== "pre-mutation") return NO_OP4;
    const bundleTarget = firstBundleTarget(payload, projectRoot);
    if (bundleTarget) {
      return {
        ran: true,
        blocking: true,
        summary: formatBundleWriteSummary(
          bundleTarget.rel,
          bundleFileWriter(bundleTarget.filename)
        )
      };
    }
    const mode = resolveStagesMode(projectRoot, env);
    if (mode === "off") return NO_OP4;
    if (!payloadFeatureDev(payload, projectRoot)) return NO_OP4;
    const blocking = mode === "strict";
    const sessionId = resolveSessionId(
      projectRoot,
      payload?.sessionId ?? env.CLAUDE_SESSION_ID ?? null
    );
    const narration = sweepSameTurnMarkers(
      projectRoot,
      payload?.transcriptPath,
      sessionId,
      payload?.adapter
    );
    const dirName = currentFeature(projectRoot, sessionId);
    const prefix = PRE_CODE_STAGES;
    if (!dirName) {
      const firstRequired = prefix[0] ?? "planning";
      return {
        ran: true,
        blocking,
        summary: formatMissingStageSummary(firstRequired, mode),
        narration
      };
    }
    const fold = foldFeature(projectRoot, sessionId, dirName);
    const byStage = new Map(fold.stages.map((stage) => [stage.stage, stage]));
    const effectiveLane = resolveEffectiveLane(projectRoot, payload?.targetPath, fold.lane);
    const requiredStages = requiredPreCodeStages(effectiveLane);
    for (const stage of requiredStages) {
      const folded = byStage.get(stage);
      const hasPair = Boolean(folded?.started_at && folded?.ended_at);
      const hasArtifact = !isArtifactBearingStage(stage) || Boolean(folded?.artifact_digest);
      if (!hasPair || !hasArtifact) {
        return { ran: true, blocking, summary: formatMissingStageSummary(stage, mode), narration };
      }
    }
    return { ran: true, blocking: false, summary: "", narration };
  }
};
function formatRulesNotLoadedSummary() {
  return `**\u25B8 paqad** \xB7 rules not loaded for this change
> \u{1F534} Needs your attention \u2014 you are editing code but I have no record that the applicable project rules were loaded. Read them and record it: run \`paqad-ai rules load\` (it prints the rules that apply to your changed files and writes the evidence), then re-try the edit.`;
}
var rulesLoadedCapability = {
  id: "rules-loaded",
  async evaluate({ projectRoot, seam, env, payload }) {
    if (seam !== "pre-mutation") return NO_OP4;
    if (!payloadFeatureDev(payload, projectRoot)) return NO_OP4;
    const store = await readCompiledRules(projectRoot);
    if (!store || (store.rules?.length ?? 0) === 0) return NO_OP4;
    const sessionId = resolveSessionId(
      projectRoot,
      payload?.sessionId ?? env.CLAUDE_SESSION_ID ?? null
    );
    const dirName = currentFeature(projectRoot, sessionId);
    if (!dirName) return NO_OP4;
    if (readRulesLoaded(projectRoot, dirName)) {
      return NO_OP4;
    }
    return { ran: true, blocking: true, summary: formatRulesNotLoadedSummary() };
  }
};
var deliveryCapability = {
  id: "delivery",
  evaluate({ projectRoot, seam }) {
    return runDeliveryCapability(projectRoot, seam, execaCommandRunner);
  }
};
var decisionPauseSelfArmCapability = {
  id: "decision-pause",
  async evaluate({ projectRoot, seam, env, payload }) {
    const selfArm = runDecisionSelfArm({ projectRoot, seam, env, payload });
    if (selfArm.ran) return selfArm;
    return runSpecChangeGuard({ projectRoot, seam, sessionId: payload?.sessionId ?? null });
  }
};
var CAPABILITY_IMPLS = /* @__PURE__ */ new Map([
  [ruleScriptsCapability.id, ruleScriptsCapability],
  [stagesCapability.id, stagesCapability],
  [rulesLoadedCapability.id, rulesLoadedCapability],
  [deliveryCapability.id, deliveryCapability],
  [decisionPauseSelfArmCapability.id, decisionPauseSelfArmCapability]
]);

// src/hud/last-block.ts
init_esm_shims();
import { randomBytes } from "crypto";
import { readFileSync as readFileSync22, rmSync as rmSync3 } from "fs";
var LAST_BLOCK_DIFF_MAX_BYTES = 2048;
function asRecord(value) {
  return typeof value === "object" && value !== null ? value : null;
}
function prefixed(text, mark) {
  return typeof text === "string" && text !== "" ? text.split(/\r?\n/).map((line) => `${mark} ${line}`) : [];
}
function editLines(edit) {
  if (!edit) return [];
  return [...prefixed(edit.old_string, "-"), ...prefixed(edit.new_string, "+")];
}
function truncateUtf8(text, maxBytes) {
  if (Buffer.byteLength(text, "utf8") <= maxBytes) return text;
  let out = "";
  let used = 0;
  for (const char of text) {
    const size = Buffer.byteLength(char, "utf8");
    if (used + size > maxBytes) break;
    out += char;
    used += size;
  }
  return out;
}
function shortDiff(toolInput, maxBytes = LAST_BLOCK_DIFF_MAX_BYTES) {
  const input = asRecord(toolInput);
  if (!input) return "";
  const edits = Array.isArray(input.edits) ? input.edits.map(asRecord) : [input];
  const lines = [
    ...edits.flatMap(editLines),
    ...prefixed(input.content, "+"),
    ...prefixed(input.new_source, "+")
  ];
  return truncateUtf8(lines.join("\n"), maxBytes);
}
function writeRuleStopRecord(input) {
  const record = {
    rule: input.rule,
    title: input.title ?? null,
    file: input.file,
    tool_use_id: input.toolUseId ?? null,
    managed: input.managed,
    sole: input.sole === true,
    at: (input.now ?? (() => /* @__PURE__ */ new Date()))().toISOString(),
    diff: shortDiff(input.toolInput),
    token: input.token ?? randomBytes(16).toString("hex"),
    used: false,
    session: input.sessionId
  };
  writeFileAtomic(
    hudLastBlockPath(input.projectRoot, input.sessionId),
    `${JSON.stringify(record, null, 2)}
`
  );
  return record;
}
function str(value) {
  return typeof value === "string" && value !== "" ? value : null;
}
function parseRuleStopRecord(value) {
  const raw = asRecord(value);
  const rule = str(raw?.rule);
  const file = str(raw?.file);
  const at = str(raw?.at);
  const token = str(raw?.token);
  const session = str(raw?.session);
  if (!raw || !rule || !file || !at || !token || !session) return null;
  return {
    rule,
    title: str(raw.title),
    file,
    tool_use_id: str(raw.tool_use_id),
    managed: raw.managed === true,
    sole: raw.sole === true,
    at,
    diff: typeof raw.diff === "string" ? raw.diff : "",
    token,
    used: raw.used === true,
    session
  };
}
function readRuleStopRecord(projectRoot, sessionId) {
  let parsed;
  try {
    parsed = JSON.parse(readFileSync22(hudLastBlockPath(projectRoot, sessionId), "utf8"));
  } catch {
    return null;
  }
  const record = parseRuleStopRecord(parsed);
  return record && record.session === sessionId ? record : null;
}
function markRuleStopTokenUsed(projectRoot, record) {
  writeFileAtomic(
    hudLastBlockPath(projectRoot, record.session),
    `${JSON.stringify({ ...record, used: true }, null, 2)}
`
  );
}
function clearRuleStopRecord(projectRoot, sessionId) {
  rmSync3(hudLastBlockPath(projectRoot, sessionId), { force: true });
}

export {
  resolveFlooredMode,
  shouldStripAiAttribution,
  COMPLIANCE_SCHEMA_VERSION,
  SPEC_REVIEW_SCHEMA_VERSION,
  DEFAULT_OBLIGATION_INDEX_PATH,
  slugifySpec,
  specIndexPath,
  specReportPath,
  specReviewPath,
  reviewSpecification,
  attachSpecDefectsToObligations,
  compareDefects,
  extractObligationIndex,
  ENGINE_ERROR_CODES,
  listErrorTaxonomy,
  getTaxonomyEntry,
  MissingPolicyContextError,
  DuplicateSkillIdentifierError,
  DecisionPacketCorruptError,
  UnsupportedFileTypeError,
  VersionIncompatibleError,
  ManifestProductionTimeoutError,
  WorkflowAlreadyRunningError,
  VectorIndexStorageError,
  LoggerSinkFailedError,
  UnknownEngineError,
  toEngineError,
  isEngineErrorCode,
  ResolutionError,
  SCHEMA_VERSION_UPDATE_HINT,
  SchemaVersionError,
  SkillRegistrationError,
  ValidationError,
  planExpertSlices,
  decideFinish,
  buildProvenance,
  SPEC_PIPELINE_STAGING_DIR,
  readStagedText,
  writeStagedText,
  readStagedJson,
  clearStaged,
  writeRequest,
  readRequest,
  writeLabel,
  readLabel,
  writeQuestions,
  readQuestions,
  clearClarificationSection,
  readExperts,
  writeExpertRoster,
  readExpertNeed,
  writeExpertNotes,
  readStagedExpertQuestions,
  readExpertNotes,
  writeExpertSynthesis,
  writeExpertFindings,
  readExpertSynthesis,
  clearExpertSynthesis,
  readGrounding,
  readFreezeSections,
  clearFrozenRun,
  rememberInput,
  appendSpecStepRow,
  appendSpecCorrectionRow,
  DECISION_CATEGORIES,
  DECISION_STATUSES,
  isStrictDecisionId,
  DECISION_INTENTS,
  DECISION_CARRY_OVER_SCOPES,
  DECISION_CATEGORY_DEFAULTS,
  isDecisionPacket,
  validateDecisionPacket,
  toDecisionRecord,
  DECISION_EVIDENCE_DOC_TYPE,
  readDecisionEvidence,
  DECISION_AUDIT_EVENTS,
  appendDecisionAuditEvent,
  ensureDecisionAuditLog,
  readDecisionAuditEvents,
  DECISION_PAUSE_EVENT_TYPES,
  decisionPausedEvent,
  decisionResolvedEvent,
  decisionPacketCorruptEvent,
  decisionCapExceededEvent,
  decisionDiscardedEvent,
  computeDecisionFingerprint,
  normalizeDecisionQuestion,
  buildRepoStateSignature,
  scoreDecisionOptionOverlap,
  readAnyDecisionPacket,
  findDecisionPrecedents,
  lintDecisionCopy,
  MAX_PENDING_DECISIONS,
  DecisionCapExceededError,
  DecisionStore,
  mintDecisionId,
  isContractDecisionId,
  assertContractDecisionId,
  createPendingDecision,
  resolvePendingDecision,
  readContractDecisions,
  listContractDecisions,
  addWriteInOption,
  writeProjectProfile2 as writeProjectProfile,
  writeDetectionReport,
  writeFrameworkMetadata,
  readExistingOnboardingManifest,
  writeOnboardingManifest,
  writeJsonPreservingTimestamp,
  writeFrameworkVersionPreservingTimestamp,
  resolveFrameworkInstallPath,
  sanitizeStackSnapshotRepository,
  readStackSnapshotSync,
  StackSnapshotCache,
  validateSiteMapAnswers,
  SiteMapSchemaError,
  canonicalAppMapPath,
  writeYamlAtomic,
  readYaml,
  writeCanonicalSiteMap,
  readCanonicalSiteMap,
  writeJourney,
  removeJourney,
  readJourney,
  readAllJourneys,
  loadCaptureScripts,
  deriveCaption,
  resolveVeRuntimeDir,
  resolvePlaywrightModulePath,
  browserStatus,
  provisionBrowser,
  veBrowsersPath,
  PackRegistryEmptyError,
  packRegistryFaultDetail,
  PACK_REGISTRY_FAULT_REMEDIATION,
  frontendTriggerOrFault,
  evaluateFrontendTrigger,
  visualEvidenceReadiness,
  visualEvidenceFlagOn,
  visualAcRequiredFiles,
  findVisualEvidenceWaiver,
  visualEvidenceWaiverHint,
  isManagedEnv,
  isFrameworkEnabled,
  isFrameworkEnabledForRoot,
  isFrameworkDisabledForRoot,
  setFrameworkEnabled,
  buildFeatureSpec,
  sessionWroteInEpisode,
  editedDevelopmentThisTurn,
  classifyCompletionEnforcement,
  detectDelivery,
  hasDetection,
  summarizeDetection,
  DELIVERY_EVIDENCE_DOC_TYPE,
  readLatestDeliveryEvidence,
  writeDetection,
  DELIVERY_POLICY_FILE,
  loadDeliveryPolicy,
  renderDefaultDeliveryPolicyYaml,
  validateCodeKnowledgeIndex,
  writeCodeKnowledgeIndex,
  readCodeKnowledgeIndex,
  applyResolvedDecisions,
  armDecisionFromDuplicationFinding,
  assembleDecisionEvidence,
  countFileReferences,
  defaultSimilarityFor,
  buildDecisionPacket,
  computePacketConfidence,
  decisionQuestionForCategory,
  decisionOptionsForCategory,
  selectViableDecisionOptions,
  projectRelative,
  dynamicRecord,
  queryFrameworkApi,
  validateFrameworkApiIndex,
  writeFrameworkApiIndex,
  readFrameworkApiIndex,
  reuseCounts,
  ReuseDeclarationError,
  NoActiveFeatureError,
  writeFeaturePlan,
  readFeaturePlan,
  writeFeatureSpecification,
  readFeatureSpecification,
  writeFeatureReview,
  readFeatureReview,
  readAllFeatureStageRows,
  readAllFeatureRuleRuns,
  readAllFeatureChangeMetrics,
  readAllFeatureRag,
  readFeatureChangeMetricsWindow,
  readAllFeatureEvidence,
  evaluateSpecFreeze,
  freezeSpec,
  carryForwardIds,
  validateCraftTrace,
  writeTrace,
  readTrace,
  parseTraceArtifact,
  mergeExpertNotes,
  seatStandingExperts,
  validateExpertNeed,
  queryCodeKnowledge,
  validateExpertNotes,
  validateQuestion,
  assembleExpertRun,
  buildRunMetrics,
  aggregateSpecPipelineMetrics,
  listRunDirs,
  laneRunsSpecPipeline,
  specPipelineStrictApplies,
  BUNDLE_MANIFEST,
  readSpecAdoption,
  isSpecFrozenBeforePipeline,
  isSpecFrozenOnFastLane,
  FAST_LANE_REFREEZE_HINT,
  validateSpecificationAdoption,
  isBundleFileRequired,
  validateBundleFileContent,
  writeRulesLoaded,
  readRulesLoaded,
  coverageGaps,
  resolveStagesMode,
  changeIsFeatureDev,
  resolveRuleComplianceMode,
  CAPABILITY_IMPLS,
  writeRuleStopRecord,
  readRuleStopRecord,
  markRuleStopTokenUsed,
  clearRuleStopRecord
};
