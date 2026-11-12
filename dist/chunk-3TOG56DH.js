import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  require_out
} from "./chunk-P4RPU2KB.js";
import {
  resolveFrameworkConfig
} from "./chunk-44YHEBNF.js";
import {
  PATHS
} from "./chunk-IHMBVS6H.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/planning/rule-compiler.ts
init_esm_shims();
var import_fast_glob = __toESM(require_out(), 1);
import { mkdir, readFile, writeFile } from "fs/promises";
import { createHash } from "crypto";
import { join } from "path";
var RULE_SCHEMA_VERSION = 1;
async function compileRules(root) {
  const files = await (0, import_fast_glob.default)("**/*.md", {
    cwd: join(root, PATHS.RULES_DIR),
    onlyFiles: true
  });
  const gateFlags = resolveGateFlags(root);
  const kept = [];
  for (const file of files.sort()) {
    const raw = await readFile(join(root, PATHS.RULES_DIR, file), "utf8");
    const gate = extractGate(raw);
    if (gate !== void 0 && gateFlags[gate] !== true) {
      continue;
    }
    kept.push({ file, raw });
  }
  const rules = kept.map(({ file, raw }, index) => compileRuleContent(file, raw, index + 1));
  return {
    schema_version: RULE_SCHEMA_VERSION,
    generated_at: (/* @__PURE__ */ new Date()).toISOString(),
    source_hash: await computeSourceHash(root),
    rules
  };
}
function resolveGateFlags(root) {
  try {
    return resolveFrameworkConfig(root).features;
  } catch {
    return {};
  }
}
function extractGate(raw) {
  return raw.match(/<!--\s*gate:\s*([a-z0-9_]+)\s*-->/i)?.[1];
}
async function writeCompiledRules(root, store) {
  const outputPath = join(root, PATHS.COMPILED_RULES);
  await mkdir(join(root, ".paqad"), { recursive: true });
  await writeFile(outputPath, JSON.stringify(store, null, 2) + "\n", "utf8");
  return outputPath;
}
async function readCompiledRules(root) {
  try {
    const raw = await readFile(join(root, PATHS.COMPILED_RULES), "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
async function isCompiledRulesStale(root) {
  const store = await readCompiledRules(root);
  if (!store) {
    return true;
  }
  return store.source_hash !== await computeSourceHash(root);
}
async function computeSourceHash(root) {
  const files = await (0, import_fast_glob.default)("**/*.md", {
    cwd: join(root, PATHS.RULES_DIR),
    onlyFiles: true
  });
  const hash = createHash("sha256");
  for (const file of files.sort()) {
    const content = await readFile(join(root, PATHS.RULES_DIR, file), "utf8");
    hash.update(file);
    hash.update("\0");
    hash.update(content);
    hash.update("\0");
  }
  return `sha256:${hash.digest("hex")}`;
}
function compileRuleContent(file, raw, ordinal) {
  const headingMatch = raw.match(/^#\s+(.+)$/m);
  const title = headingMatch?.[1]?.trim() || join(PATHS.RULES_DIR, file);
  const summary = raw.split("\n").map((line) => line.trim()).find((line) => line && !line.startsWith("#") && !line.startsWith("```"));
  const triggerPatterns = extractTriggerPatterns(raw);
  if (summary === void 0) {
    return {
      rule_id: `RULE-${ordinal}`,
      title,
      source_path: join(PATHS.RULES_DIR, file),
      trigger_patterns: ["**"],
      severity: "must",
      summary: "Unparseable rule content; preserve raw text for planning context.",
      raw_text: raw
    };
  }
  return {
    rule_id: `RULE-${ordinal}`,
    title,
    source_path: join(PATHS.RULES_DIR, file),
    trigger_patterns: triggerPatterns.length > 0 ? triggerPatterns : ["**"],
    severity: inferSeverity(raw),
    summary,
    raw_text: raw
  };
}
function looksLikeTriggerPattern(candidate) {
  if (!candidate || candidate.length > 120) return false;
  if (/\s/.test(candidate)) return false;
  if (!/^[A-Za-z0-9_./*?@{}[\]-]+$/.test(candidate)) return false;
  return candidate.includes("/") || /[*?]/.test(candidate) || /\.[A-Za-z0-9]+$/.test(candidate);
}
function extractTriggerPatterns(raw) {
  const explicitDirective = raw.match(/<!--\s*trigger:\s*([^>]+)\s*-->/i)?.[1];
  if (explicitDirective) {
    return [
      ...new Set(
        explicitDirective.split(",").map((value) => value.trim()).filter(Boolean)
      )
    ];
  }
  const withoutFences = raw.replace(/```[\s\S]*?```/g, "");
  const candidates = Array.from(withoutFences.matchAll(/`([^`]+)`/g), (match) => match[1].trim());
  return [...new Set(candidates.filter(looksLikeTriggerPattern))];
}
function inferSeverity(raw) {
  const normalized = raw.toLowerCase();
  if (/\bmust\b|\brequired\b|\bnever\b/.test(normalized)) {
    return "must";
  }
  if (/\bshould\b|\brecommended\b/.test(normalized)) {
    return "should";
  }
  return "could";
}

// src/planning/decision-detector.ts
init_esm_shims();
var SIGNALS = [
  {
    category: "create-vs-reuse",
    signal: "reuse-vs-create",
    patterns: [
      /\b(reuse|existing)\b.{0,40}\b(create|build|make new|new)\b/i,
      /\b(create|build|make new|new)\b.{0,40}\b(reuse|existing)\b/i
    ]
  },
  {
    category: "component-reuse",
    signal: "component-choice",
    patterns: [
      /\b(button|card|modal|drawer|tile|iconbutton|input|form)\b.{0,15}\bor\b.{0,15}\b(button|card|modal|drawer|tile|iconbutton|input|form)\b/i
    ]
  },
  {
    category: "architecture-path",
    signal: "explicit-path-fork",
    patterns: [
      /((?:[\w-]+\/)+[\w.-]+\.\w+)\s*(?:,\s*)?\b(?:or|vs\.?|versus)\b\s*((?:[\w-]+\/)+[\w.-]+\.\w+)/i
    ],
    validate: (match) => match[1].toLowerCase() !== match[2].toLowerCase()
  },
  {
    category: "architecture-path",
    signal: "alternative-path",
    patterns: [/\b(or|either|alternatively|we could)\b/i]
  },
  {
    category: "architecture-path",
    signal: "multiple-file-paths",
    patterns: [
      /(?:[\w-]+\/)+[\w.-]+\.\w+.{0,40}\bor\b.{0,40}(?:[\w-]+\/)+[\w.-]+\.\w+/i,
      /(?:[\w-]+\/)+[\w.-]+\.\w+.{0,40}(?:[\w-]+\/)+[\w.-]+\.\w+/i
    ]
  }
];
function detectDecisionForks(request) {
  const forks = [];
  for (const candidate of SIGNALS) {
    for (const pattern of candidate.patterns) {
      const match = request.match(pattern);
      if (match && (!candidate.validate || candidate.validate(match))) {
        forks.push({
          category: candidate.category,
          confidence: confidenceFor(candidate.signal),
          signal: candidate.signal,
          matched_text: match[0]
        });
        break;
      }
    }
  }
  return forks;
}
function confidenceFor(signal) {
  switch (signal) {
    case "reuse-vs-create":
      return 0.92;
    case "explicit-path-fork":
      return 0.9;
    case "component-choice":
      return 0.84;
    default:
      return 0.64;
  }
}

// src/pipeline/rule-trigger-matcher.ts
init_esm_shims();
async function matchRuleTriggers(root, modulePaths) {
  const compiled = await readCompiledRules(root);
  if (!compiled || modulePaths.length === 0) {
    return [];
  }
  return compiled.rules.filter((rule) => ruleTriggersMatch(rule, modulePaths)).map((r) => r.rule_id);
}
function isAlwaysLoadRule(rule) {
  return rule.trigger_patterns.length === 0 || rule.trigger_patterns.includes("**");
}
function ruleTriggersMatch(rule, paths) {
  return rule.trigger_patterns.some(
    (pattern) => paths.some((path) => matchesGlobish(path, pattern))
  );
}
function matchesGlobish(value, pattern) {
  const normalizedValue = value.replace(/\\/g, "/");
  const normalizedPattern = pattern.replace(/\\/g, "/");
  if (normalizedPattern === "**") {
    return true;
  }
  const escaped = normalizedPattern.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    `^${escaped.replace(/\*\*/g, ".*").replace(/\*/g, "[^/]*").replace(/\?/g, ".")}$`
  );
  return regex.test(normalizedValue) || normalizedValue.includes(normalizedPattern.replace(/\*/g, ""));
}

export {
  compileRules,
  writeCompiledRules,
  readCompiledRules,
  isCompiledRulesStale,
  computeSourceHash,
  looksLikeTriggerPattern,
  detectDecisionForks,
  matchRuleTriggers,
  isAlwaysLoadRule,
  ruleTriggersMatch,
  matchesGlobish
};
