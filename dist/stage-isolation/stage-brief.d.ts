import { HookSessionPayload } from '../rag-ledger/session.js';

declare const SAFE_SESSION_ID: RegExp;
declare function isSafeSessionId(sessionId: string): boolean;

declare const STAGE_BRIEF_MAX_CHARS = 9000;
declare const STAGE_BRIEF_ENTRY_LINE = "paqad records your entry check when you start; if an edit is blocked, create the marker it names.";
declare const STAGE_BRIEF_NO_CHANGE_LINE = "No active change was found; ask nothing, use the change ref the orchestrator gave you.";
declare function stageBriefMoreLine(stage: string): string;
declare function stageHelperStage(agentType: unknown): string | null;
declare function attributedModuleReads(projectRoot: string, sessionId: string): string[];
interface StageBriefOptions {
    agentId?: unknown;
    resumed?: boolean;
    full?: boolean;
}
declare function safeAgentId(agentId: unknown): string | null;
declare function stageCommandLines(stage: string, sessionId: string, agentId: string | null): string[];
declare function buildStageBrief(stage: string, projectRoot: string, sessionId: string, options?: StageBriefOptions): string;
declare function stageBriefHookOutput(brief: string): string;
declare function resolveBriefSession(projectRoot: string, payload: HookSessionPayload, env?: NodeJS.ProcessEnv): string;
interface InjectedRecipe {
    recipe: string;
    recipe_hash: string;
    recipe_root: string;
    truncated: boolean;
}
interface SeededStageAgent {
    output: string;
    injected: InjectedRecipe | null;
    notes: string[];
}
declare function seedStageAgentDetailed(stage: string, projectRoot: string, payload: HookSessionPayload & {
    agent_id?: unknown;
}, env?: NodeJS.ProcessEnv): SeededStageAgent;
declare function seedStageAgent(stage: string, projectRoot: string, payload: HookSessionPayload & {
    agent_id?: unknown;
}, env?: NodeJS.ProcessEnv): string;
declare function recordRecipeInjected(projectRoot: string, stage: string, payload: HookSessionPayload & {
    agent_id?: unknown;
    agent_type?: unknown;
}, injected: InjectedRecipe, env?: NodeJS.ProcessEnv): boolean;

export { SAFE_SESSION_ID, STAGE_BRIEF_ENTRY_LINE, STAGE_BRIEF_MAX_CHARS, STAGE_BRIEF_NO_CHANGE_LINE, attributedModuleReads, buildStageBrief, isSafeSessionId, recordRecipeInjected, resolveBriefSession, safeAgentId, seedStageAgent, seedStageAgentDetailed, stageBriefHookOutput, stageBriefMoreLine, stageCommandLines, stageHelperStage };
export type { InjectedRecipe, SeededStageAgent, StageBriefOptions };
