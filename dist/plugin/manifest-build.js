import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  mergeNativeHooks
} from "../chunk-WULKDLB5.js";
import {
  buildPluginHookChain
} from "../chunk-PWJ37K7H.js";
import {
  renderClaudePluginStageAgents
} from "../chunk-LJN6UHGD.js";
import "../chunk-VVRAO2BK.js";
import "../chunk-4K4CM3QN.js";
import "../chunk-H2GJD26E.js";
import "../chunk-WGEG5J6L.js";
import "../chunk-3STC3IVL.js";
import "../chunk-LW3OCT4Y.js";
import {
  init_esm_shims
} from "../chunk-EMKBJVIL.js";

// src/plugin/manifest-build.ts
init_esm_shims();
var PLUGIN_MOD_MODULES = ["./mod/register.tsx"];
var PLUGIN_MOD_TYPES = "./runtime/claude-plugin/mod/types/index.d.ts";
var PLUGIN_ICON = "./assets/icon.png";
function buildPluginHooksConfig() {
  return { ...mergeNativeHooks({}, buildPluginHookChain()), modules: [...PLUGIN_MOD_MODULES] };
}
function serializePluginHooksJson() {
  return `${JSON.stringify(buildPluginHooksConfig(), null, 2)}
`;
}
function pluginAgentPaths() {
  return renderClaudePluginStageAgents().map(
    (agent) => `./runtime/claude-plugin/agents/${agent.name}`
  );
}
function buildPluginManifest(packageVersion) {
  return {
    name: "paqad",
    displayName: "paqad",
    description: "Your team's rules, enforced at edit time, with evidence for every change.",
    version: packageVersion,
    author: { name: "Eliyce", email: "hello@eliyce.com", url: "https://eliyce.com" },
    homepage: "https://paqad.ai",
    repository: "https://github.com/Eliyce/paqad-claude-plugin",
    license: "MIT",
    keywords: ["governance", "code-review", "evidence", "rules", "quality-gates", "compliance"],
    icon: PLUGIN_ICON,
    documentationUrl: "https://paqad.ai/docs/",
    supportUrl: "https://paqad.ai/support/",
    privacyPolicyUrl: "https://paqad.ai/privacy/",
    termsOfServiceUrl: "https://paqad.ai/terms/",
    hooks: "./runtime/claude-plugin/hooks.json",
    agents: pluginAgentPaths(),
    skills: "./runtime/claude-plugin/skills",
    types: PLUGIN_MOD_TYPES,
    userConfig: {
      openai_api_key: {
        type: "string",
        title: "OpenAI API key",
        description: "Only needed if you set rag_embedding_provider=openai. Stored in your system credential store.",
        sensitive: true,
        required: false
      },
      cohere_api_key: {
        type: "string",
        title: "Cohere API key",
        description: "Only needed if you turn on reranking with the cohere backend. Stored in your system credential store.",
        sensitive: true,
        required: false
      }
    }
  };
}
function serializePluginManifest(packageVersion) {
  return `${JSON.stringify(buildPluginManifest(packageVersion), null, 2)}
`;
}
export {
  PLUGIN_ICON,
  PLUGIN_MOD_MODULES,
  PLUGIN_MOD_TYPES,
  buildPluginHooksConfig,
  buildPluginManifest,
  pluginAgentPaths,
  renderClaudePluginStageAgents,
  serializePluginHooksJson,
  serializePluginManifest
};
