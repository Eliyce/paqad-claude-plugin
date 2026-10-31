import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/core/constants/budgets.ts
init_esm_shims();
var DEFAULT_CONTEXT_BUDGET = {
  config_tokens: 1500,
  skills_per_session: 3e3,
  main_agent_max: 3e4,
  compaction_trigger_pct: 0.8
};
var FAST_MODEL_PATTERN = /\b(mini|small|nano|flash|haiku|instant|lite|turbo|8b|3\.5)\b/i;
var REASONING_MODEL_PATTERN = /\b(reasoning|o1|o3|o4|deep|think|pro|max)\b/i;
function resolveContextBudgetForModel(modelName, baseBudget = DEFAULT_CONTEXT_BUDGET) {
  if (FAST_MODEL_PATTERN.test(modelName)) {
    return {
      ...baseBudget,
      main_agent_max: 18e3,
      skills_per_session: 2e3,
      compaction_trigger_pct: 0.7
    };
  }
  if (REASONING_MODEL_PATTERN.test(modelName)) {
    return {
      ...baseBudget,
      main_agent_max: 45e3,
      skills_per_session: 4e3,
      compaction_trigger_pct: 0.85
    };
  }
  return { ...baseBudget };
}
function resolveContextBudgetForModelTier(models, tier, baseBudget = DEFAULT_CONTEXT_BUDGET) {
  return resolveContextBudgetForModel(models[tier], baseBudget);
}
var CONTEXT_LEVEL_BUDGETS = {
  0: 1500,
  1: 4e3,
  2: 8e3,
  3: 16e3,
  4: 3e4
};
var ROLE_TOKEN_BUDGETS = {
  "context-curator": 6e3,
  "solution-architect": 8e3,
  "db-expert": 6e3,
  "ux-ui-analyst": 5e3,
  "product-owner": 5e3,
  "market-researcher": 5e3,
  implementer: 12e3,
  reviewer: 1e4,
  verifier: 4e3,
  "security-auditor": 8e3,
  "test-planner": 6e3,
  "gap-detector": 7e3,
  "requirement-analyst": 6e3,
  "devops-engineer": 5e3,
  "doc-maintainer": 4e3,
  "performance-analyst": 6e3,
  "data-modeler": 6e3,
  "integration-architect": 8e3,
  "qa-engineer": 6e3,
  "user-flow-writer": 5e3,
  "chief-architect": 1e4,
  "application-architect": 8e3,
  "skill-orchestrator": 8e3
};

// src/core/types/agent.ts
init_esm_shims();
var AGENT_ROLES = [
  "context-curator",
  "solution-architect",
  "db-expert",
  "ux-ui-analyst",
  "product-owner",
  "market-researcher",
  "implementer",
  "reviewer",
  "verifier",
  "security-auditor",
  "test-planner",
  "gap-detector",
  "requirement-analyst",
  "devops-engineer",
  "doc-maintainer",
  "performance-analyst",
  "data-modeler",
  "integration-architect",
  "qa-engineer",
  "user-flow-writer",
  "chief-architect",
  "application-architect",
  "skill-orchestrator"
];

// src/spec-pipeline/experts/roster.ts
init_esm_shims();
var EXPERT_ROLE_SET = /* @__PURE__ */ new Set([
  "db-expert",
  "security-auditor",
  "ux-ui-analyst",
  "performance-analyst",
  "data-modeler",
  "integration-architect",
  "solution-architect",
  "devops-engineer",
  "market-researcher",
  "qa-engineer",
  "user-flow-writer",
  "product-owner",
  "application-architect",
  "skill-orchestrator"
]);
var EXPERT_ROLES = AGENT_ROLES.filter(
  (role) => EXPERT_ROLE_SET.has(role)
);
function isExpertRole(value) {
  return EXPERT_ROLE_SET.has(value);
}
var DEFAULT_STANDING_EXPERTS = [
  "product-owner",
  "application-architect",
  "user-flow-writer",
  "qa-engineer"
];
function expertBudget(role) {
  if (!isExpertRole(role)) {
    throw new Error(`not an expert role: ${role}`);
  }
  return ROLE_TOKEN_BUDGETS[role];
}

export {
  DEFAULT_CONTEXT_BUDGET,
  resolveContextBudgetForModel,
  resolveContextBudgetForModelTier,
  CONTEXT_LEVEL_BUDGETS,
  ROLE_TOKEN_BUDGETS,
  AGENT_ROLES,
  EXPERT_ROLES,
  isExpertRole,
  DEFAULT_STANDING_EXPERTS,
  expertBudget
};
