declare function persistLedgerSessionId(projectRoot: string, sessionId?: string | null): boolean;
declare function resolveSessionId(projectRoot: string, hint?: string | null): string;
declare function readLedgerSessionId(projectRoot: string): string | null;
interface HookSessionPayload {
    session_id?: unknown;
}
declare function hookSessionCandidates(projectRoot: string, payload: HookSessionPayload | null | undefined, env?: NodeJS.ProcessEnv): string[];
declare function resolveHookSession(projectRoot: string, payload: HookSessionPayload | null | undefined, env?: NodeJS.ProcessEnv): string;
declare function keepingLedgerSessionCache<T>(projectRoot: string, run: () => T): T;

export { hookSessionCandidates, keepingLedgerSessionCache, persistLedgerSessionId, readLedgerSessionId, resolveHookSession, resolveSessionId };
export type { HookSessionPayload };
