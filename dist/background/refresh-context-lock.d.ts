type LockOutcome = {
    acquired: true;
    reclaimedStale: boolean;
} | {
    acquired: false;
};

declare const REFRESH_CONTEXT_LOCK_STALE_MS: number;
declare const REFRESH_CONTEXT_LOCK_RENEW_MS: number;
declare const REFRESH_CONTEXT_LOCK_HELD_ENV = "PAQAD_REFRESH_CONTEXT_LOCK_HELD";
declare function refreshContextLockDir(projectRoot: string): string;
declare function takeRefreshContextLock(projectRoot: string, now?: () => number): LockOutcome;
declare function releaseRefreshContextLock(projectRoot: string): void;
declare function renewRefreshContextLock(projectRoot: string, now?: () => number): boolean;
interface RefreshContextLockHold {
    release(): void;
}
interface HoldRefreshContextLockOptions {
    env?: NodeJS.ProcessEnv;
    renewMs?: number;
}
declare function holdRefreshContextLock(projectRoot: string, options?: HoldRefreshContextLockOptions): RefreshContextLockHold | null;

export { REFRESH_CONTEXT_LOCK_HELD_ENV, REFRESH_CONTEXT_LOCK_RENEW_MS, REFRESH_CONTEXT_LOCK_STALE_MS, holdRefreshContextLock, refreshContextLockDir, releaseRefreshContextLock, renewRefreshContextLock, takeRefreshContextLock };
export type { HoldRefreshContextLockOptions, RefreshContextLockHold };
