declare const HUD_REFRESH_VERBS: readonly string[];
declare function isHudRefreshVerb(commandPath: string): boolean;
declare function refreshHudSnapshot(projectRoot: string, sessionHint: string | null, source: string, env?: NodeJS.ProcessEnv): string | null;

export { HUD_REFRESH_VERBS, isHudRefreshVerb, refreshHudSnapshot };
