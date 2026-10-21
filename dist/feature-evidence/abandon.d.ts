declare const ABANDON_QUIET_MS: number;
declare const ABANDON_SESSION_ID = "paqad-housekeeping";
type GitRunner = (projectRoot: string, args: string[]) => string | undefined;
interface CloseAbandonedOptions {
    now?: () => Date;
    git?: GitRunner;
}
interface AbandonedBundle {
    dir: string;
    branch: string;
    reason: 'branch gone' | 'branch merged';
}
declare function closeAbandonedBundles(projectRoot: string, options?: CloseAbandonedOptions): AbandonedBundle[];

export { ABANDON_QUIET_MS, ABANDON_SESSION_ID, closeAbandonedBundles };
export type { AbandonedBundle, CloseAbandonedOptions, GitRunner };
