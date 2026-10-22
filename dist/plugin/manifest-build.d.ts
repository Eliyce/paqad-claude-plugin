declare function renderClaudePluginStageAgents(): {
    name: string;
    content: string;
}[];

declare const PLUGIN_MOD_MODULES: readonly ["./mod/register.tsx"];
declare const PLUGIN_MOD_TYPES = "./runtime/claude-plugin/mod/types/index.d.ts";
declare const PLUGIN_ICON = "./assets/icon.png";
declare function buildPluginHooksConfig(): Record<string, unknown>;
declare function serializePluginHooksJson(): string;
declare function pluginAgentPaths(): string[];
declare function buildPluginManifest(packageVersion: string): Record<string, unknown>;
declare function serializePluginManifest(packageVersion: string): string;

export { PLUGIN_ICON, PLUGIN_MOD_MODULES, PLUGIN_MOD_TYPES, buildPluginHooksConfig, buildPluginManifest, pluginAgentPaths, renderClaudePluginStageAgents, serializePluginHooksJson, serializePluginManifest };
