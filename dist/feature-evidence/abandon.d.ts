declare const ABANDON_QUIET_MS: number;
declare const ABANDON_SESSION_ID = "paqad-housekeeping";
declare const MERGE_SUBJECT_MAX_COUNT = 20;
declare const MERGE_SUBJECT_SKEW_MS: number;
type GitRunner = (projectRoot: string, args: string[]) => string | undefined;
interface CloseAbandonedOptions {
    now?: () => Date;
    git?: GitRunner;
}
interface AbandonedBundle {
    dir: string;
    branch: string;
    reason: 'branch gone' | 'branch merged' | 'pull request merged';
}
declare function closeAbandonedBundles(projectRoot: string, options?: CloseAbandonedOptions): AbandonedBundle[];

export { ABANDON_QUIET_MS, ABANDON_SESSION_ID, MERGE_SUBJECT_MAX_COUNT, MERGE_SUBJECT_SKEW_MS, closeAbandonedBundles };
export type { AbandonedBundle, CloseAbandonedOptions, GitRunner };
