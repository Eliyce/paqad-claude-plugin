import { HookSessionPayload } from '../rag-ledger/session.js';

declare const SAFE_SESSION_ID: RegExp;
declare function isSafeSessionId(sessionId: string): boolean;

declare const STAGE_BRIEF_MAX_CHARS = 9000;
declare const STAGE_BRIEF_ENTRY_LINE = "paqad records your entry check when you start; if an edit is blocked, create the marker it names.";
declare const STAGE_BRIEF_NO_CHANGE_LINE = "No active change was found; ask nothing, use the change ref the orchestrator gave you.";
declare const STAGE_BRIEF_MORE_LINE = "More instructions for this stage are in docs/instructions/workflows/feature-development.yaml.";
declare function stageHelperStage(agentType: unknown): string | null;
declare function attributedModuleReads(projectRoot: string, sessionId: string): string[];
interface StageBriefOptions {
    agentId?: unknown;
    resumed?: boolean;
}
declare function safeAgentId(agentId: unknown): string | null;
declare function buildStageBrief(stage: string, projectRoot: string, sessionId: string, options?: StageBriefOptions): string;
declare function stageBriefHookOutput(brief: string): string;
declare function resolveBriefSession(projectRoot: string, payload: HookSessionPayload, env?: NodeJS.ProcessEnv): string;
declare function seedStageAgent(stage: string, projectRoot: string, payload: HookSessionPayload & {
    agent_id?: unknown;
}, env?: NodeJS.ProcessEnv): string;

export { SAFE_SESSION_ID, STAGE_BRIEF_ENTRY_LINE, STAGE_BRIEF_MAX_CHARS, STAGE_BRIEF_MORE_LINE, STAGE_BRIEF_NO_CHANGE_LINE, attributedModuleReads, buildStageBrief, isSafeSessionId, resolveBriefSession, safeAgentId, seedStageAgent, stageBriefHookOutput, stageHelperStage };
export type { StageBriefOptions };
