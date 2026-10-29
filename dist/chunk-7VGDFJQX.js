import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  isSafeSessionId,
  stageFromAgentType
} from "./chunk-ANJMWYLC.js";
import {
  PAQAD_STAGE_HELPER_MATCHER
} from "./chunk-PWJ37K7H.js";
import {
  readTextIfExistsSync
} from "./chunk-TLKXJ74I.js";
import {
  isValidSlug,
  levenshtein,
  normaliseSlug
} from "./chunk-CMJNNYY5.js";
import {
  currentFeature,
  recordedLaneOrFull
} from "./chunk-WRWFKZHV.js";
import {
  readFeatureRecord,
  splitFrontMatter
} from "./chunk-PQR2FVDS.js";
import {
  MANDATORY_STAGE_AGENTS,
  STAGE_AGENT_HARD_RULES,
  loadFeatureDevelopmentPolicy,
  stageNoteLines
} from "./chunk-AP7OEXCZ.js";
import {
  keepingLedgerSessionCache,
  resolveHookSession
} from "./chunk-HV6ESCNW.js";
import {
  featureFilePath
} from "./chunk-DDJC5PRW.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/stage-isolation/stage-brief.ts
init_esm_shims();
import { existsSync, readdirSync } from "fs";
import { join } from "path";

// src/module-decisions/extractor.ts
init_esm_shims();
var PATTERNS = [
  {
    label: "ticket-header-module",
    re: /(?:^|\n)\s*Module:\s*([A-Za-z0-9][A-Za-z0-9 _-]{0,40})\s*(?:\n|$)/g
  },
  {
    label: "ticket-header-component",
    re: /(?:^|\n)\s*Component:\s*([A-Za-z0-9][A-Za-z0-9 _-]{0,40})\s*(?:\n|$)/g
  },
  {
    label: "ticket-header-area",
    re: /(?:^|\n)\s*Area:\s*([A-Za-z0-9][A-Za-z0-9 _-]{0,40})\s*(?:\n|$)/g
  },
  {
    label: "ticket-header-subsystem",
    re: /(?:^|\n)\s*Subsystem:\s*([A-Za-z0-9][A-Za-z0-9 _-]{0,40})\s*(?:\n|$)/g
  },
  { label: "inline-module-slug", re: /\bmodule:\s*([a-z0-9][a-z0-9-]{0,40})\b/g },
  {
    label: "new-module-name",
    re: /\bnew module\s+([A-Z][A-Za-z0-9_-]*(?:\s+[A-Z][A-Za-z0-9_-]*){0,4})\b/g
  },
  { label: "in-the-module", re: /\bin the\s+([A-Za-z0-9][A-Za-z0-9 _-]{0,30}?)\s+module\b/g }
];
function deriveDisplayName(slug, raw) {
  const cleaned = raw.trim();
  if (cleaned.length > 0 && cleaned.length <= 60) {
    return cleaned;
  }
  return slug.split("-").map((p) => p.length === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
}
function findNearCollision(slug, existing, bound) {
  let bestSlug = null;
  let bestDist = bound + 1;
  for (const cand of existing) {
    if (cand === slug) continue;
    const d = levenshtein(slug, cand, bound);
    if (d <= bound && d < bestDist) {
      bestDist = d;
      bestSlug = cand;
    }
  }
  return bestSlug;
}
function classify(slug, existing, bound) {
  if (existing.has(slug)) {
    return { kind: "exact-match", collision_with: slug };
  }
  const near = findNearCollision(slug, Array.from(existing), bound);
  if (near !== null) {
    return { kind: "near-collision", collision_with: near };
  }
  return { kind: "unknown", collision_with: null };
}
function extractCandidates(opts) {
  const { prompt, existingSlugs } = opts;
  const bound = opts.nearCollisionDistance ?? 2;
  const existing = new Set(existingSlugs);
  const seenSlugs = /* @__PURE__ */ new Set();
  const out = [];
  for (const { label, re } of PATTERNS) {
    re.lastIndex = 0;
    let match;
    while ((match = re.exec(prompt)) !== null) {
      const raw = match[1];
      if (raw === void 0) continue;
      const slug = normaliseSlug(raw);
      if (slug === null || !isValidSlug(slug)) continue;
      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);
      const { kind, collision_with } = classify(slug, existing, bound);
      out.push({
        slug,
        display_name: deriveDisplayName(slug, raw),
        kind,
        collision_with,
        pattern: label,
        excerpt: match[0].trim().slice(0, 200)
      });
    }
  }
  return out;
}
function candidatesNeedingDecision(candidates) {
  return candidates.filter((c) => c.kind !== "exact-match");
}

// src/stage-isolation/stage-brief.ts
var STAGE_BRIEF_MAX_CHARS = 9e3;
var STAGE_BRIEF_ENTRY_LINE = "paqad records your entry check when you start; if an edit is blocked, create the marker it names.";
var STAGE_BRIEF_NO_CHANGE_LINE = "No active change was found; ask nothing, use the change ref the orchestrator gave you.";
var STAGE_BRIEF_MORE_LINE = "More instructions for this stage are in docs/instructions/workflows/feature-development.yaml.";
var PREVIOUS_PILLARS = {
  planning: [],
  specification: ["plan"],
  development: ["plan", "specification"],
  review: ["specification"],
  checks: ["review"],
  documentation_sync: ["review", "checks"]
};
var CODE_EDITING_STAGES = /* @__PURE__ */ new Set(["development"]);
var STAGE_HELPER_PATTERN = new RegExp(PAQAD_STAGE_HELPER_MATCHER);
function stageHelperStage(agentType) {
  if (typeof agentType !== "string" || !STAGE_HELPER_PATTERN.test(agentType)) {
    return null;
  }
  return stageFromAgentType(agentType);
}
function stageDef(stage) {
  const def = MANDATORY_STAGE_AGENTS.find((candidate) => candidate.ledgerStage === stage);
  if (!def) {
    throw new Error(`unknown stage "${stage}"`);
  }
  return def;
}
function existingPillars(projectRoot, dirName, stage) {
  return PREVIOUS_PILLARS[stage].map((file) => featureFilePath(dirName, file)).filter(
    (path) => existsSync(join(projectRoot, path))
  );
}
function changeSection(projectRoot, sessionId, stage) {
  const dirName = currentFeature(projectRoot, sessionId);
  if (!dirName) {
    return ["## Your change", "", STAGE_BRIEF_NO_CHANGE_LINE, ""];
  }
  const pillars = existingPillars(projectRoot, dirName, stage);
  return [
    "## Your change",
    "",
    `- Change: \`${dirName}\``,
    `- Lane: ${recordedLaneOrFull(projectRoot, sessionId, dirName)}`,
    pillars.length === 0 ? "- Previous pillar files: none" : "- Previous pillar files:",
    ...pillars.map((path) => `  - \`${path}\``),
    ""
  ];
}
function documentedModules(projectRoot) {
  try {
    return readdirSync(join(projectRoot, "docs/modules"), { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch {
    return [];
  }
}
function changeRequestText(projectRoot, dirName) {
  const title = (readFeatureRecord(projectRoot, dirName)?.title ?? "").replace(/-/g, " ");
  const request = readTextIfExistsSync(join(projectRoot, featureFilePath(dirName, "request")));
  return [title, request === null ? "" : splitFrontMatter(request).body].join("\n");
}
function attributedModuleReads(projectRoot, sessionId) {
  const dirName = currentFeature(projectRoot, sessionId);
  if (!dirName) return [];
  const slugs = documentedModules(projectRoot);
  if (slugs.length === 0) return [];
  return extractCandidates({
    prompt: changeRequestText(projectRoot, dirName),
    existingSlugs: slugs
  }).filter((candidate) => candidate.kind === "exact-match").map((candidate) => `docs/modules/${candidate.slug}/**`);
}
function stageReads(stage, projectRoot, sessionId, read) {
  if (stage !== "planning") return [...read];
  return [.../* @__PURE__ */ new Set([...read, ...attributedModuleReads(projectRoot, sessionId)])];
}
function bulletList(items, empty) {
  return items.length === 0 ? [empty] : items.map((item) => `- ${item}`);
}
function safeAgentId(agentId) {
  if (typeof agentId !== "string") return null;
  const trimmed = agentId.trim();
  return isSafeSessionId(trimmed) ? trimmed : null;
}
function commandsSection(stage, sessionId, agentId) {
  const prefix = agentId === null ? `SE_SESSION=${sessionId} paqad-ai` : `SE_SESSION=${sessionId} SE_AGENT_ID=${agentId} paqad-ai`;
  const rulesLoad = CODE_EDITING_STAGES.has(stage) ? [`- \`${prefix} rules load\` before your first source edit.`] : [];
  return [
    "## Commands",
    "",
    `- \`${prefix} stage start ${stage}\``,
    ...rulesLoad,
    "- Do the stage work, then write its rigid artifact with the stage verb, or make the edits",
    "  for a mutation stage.",
    `- \`${prefix} stage end ${stage} --artifact <the-rigid-file>\` (mutation stages need no artifact).`
  ];
}
function render(parts, truncated) {
  return [
    ...parts.head,
    "## Read first",
    "",
    ...bulletList(parts.read, "Nothing extra to read for this stage."),
    "",
    "## Stage instructions",
    "",
    ...bulletList(parts.instructions, "No extra instructions for this stage."),
    ...truncated ? ["", STAGE_BRIEF_MORE_LINE] : [],
    "",
    ...parts.tail
  ].join("\n");
}
function fitToBudget(parts) {
  let read = [...parts.read];
  let instructions = [...parts.instructions];
  let truncated = false;
  let text = render(parts, truncated);
  while (text.length > STAGE_BRIEF_MAX_CHARS && (instructions.length > 0 || read.length > 0)) {
    if (instructions.length > 0) {
      instructions = instructions.slice(0, -1);
    } else {
      read = read.slice(0, -1);
    }
    truncated = true;
    text = render({ ...parts, read, instructions }, truncated);
  }
  return text;
}
function introLines(stage, role, resumed) {
  if (resumed) {
    return [
      `You are the paqad **${stage}** stage agent, resumed for the same feature-development change.`,
      `Your job: ${role}.`,
      "",
      `This is the ${stage} stage brief, so you do not need to load AGENT-BOOTSTRAP.md or`,
      `AGENT-ROUTER.md. ${STAGE_BRIEF_ENTRY_LINE}`
    ];
  }
  return [
    `You are the paqad **${stage}** stage agent. You run one stage of one feature-development`,
    `change in your own isolated context and then return. Your job: ${role}.`,
    "",
    "paqad added this stage brief to your context when you started, so you do not need to load",
    `AGENT-BOOTSTRAP.md or AGENT-ROUTER.md. ${STAGE_BRIEF_ENTRY_LINE}`
  ];
}
function exportLines(sessionId, agentId) {
  const session = [
    `- **Export \`SE_SESSION=${sessionId}\`** for every \`paqad-ai\` command you run, so every row`,
    "  and artifact you write is recorded under the one change."
  ];
  if (agentId === null) return session;
  return [
    ...session,
    `- **Export \`SE_AGENT_ID=${agentId}\`** with it, so a stage you start for this change is`,
    "  recorded as yours."
  ];
}
function buildStageBrief(stage, projectRoot, sessionId, options = {}) {
  const def = stageDef(stage);
  if (!isSafeSessionId(sessionId)) {
    throw new Error("unsafe session id");
  }
  const agentId = safeAgentId(options.agentId);
  const policy = loadFeatureDevelopmentPolicy(projectRoot).policy.stages[stage];
  const notes = stageNoteLines(stage);
  const head = [
    ...introLines(stage, def.role, options.resumed === true),
    "",
    ...notes.length === 0 ? [] : [...notes, ""],
    ...changeSection(projectRoot, sessionId, stage)
  ];
  const tail = [
    "## Hard rules",
    "",
    ...STAGE_AGENT_HARD_RULES,
    ...exportLines(sessionId, agentId),
    "",
    ...commandsSection(stage, sessionId, agentId)
  ];
  return fitToBudget({
    head,
    read: stageReads(stage, projectRoot, sessionId, policy.read),
    instructions: policy.instructions,
    tail
  });
}
function stageBriefHookOutput(brief) {
  return JSON.stringify({
    hookSpecificOutput: { hookEventName: "SubagentStart", additionalContext: brief }
  });
}
function resolveBriefSession(projectRoot, payload, env = process.env) {
  for (const raw of [payload.session_id, env.SE_SESSION, env.CLAUDE_SESSION_ID]) {
    if (typeof raw === "string" && raw.trim() !== "" && !isSafeSessionId(raw.trim())) {
      throw new Error("unsafe session id");
    }
  }
  return resolveHookSession(projectRoot, payload, env);
}
function seedStageAgent(stage, projectRoot, payload, env = process.env) {
  return keepingLedgerSessionCache(
    projectRoot,
    () => stageBriefHookOutput(
      buildStageBrief(stage, projectRoot, resolveBriefSession(projectRoot, payload, env), {
        agentId: payload.agent_id
      })
    )
  );
}

export {
  extractCandidates,
  candidatesNeedingDecision,
  STAGE_BRIEF_MAX_CHARS,
  STAGE_BRIEF_ENTRY_LINE,
  STAGE_BRIEF_NO_CHANGE_LINE,
  STAGE_BRIEF_MORE_LINE,
  stageHelperStage,
  attributedModuleReads,
  safeAgentId,
  buildStageBrief,
  stageBriefHookOutput,
  resolveBriefSession,
  seedStageAgent
};
