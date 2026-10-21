interface CommitGroup {
    count: number;
    tickets: string[];
    merges: number;
    untagged: number;
}
interface CommitSplit {
    state: 'known' | 'unknown';
    reason: string | null;
    base_commit: string | null;
    own: CommitGroup | null;
    inherited: CommitGroup | null;
    own_shas?: string[];
    inherited_shas?: string[];
}
interface CommitSplitInput {
    baseBranch?: string;
    startCommit?: string | null;
    ownTickets?: readonly string[];
}
declare function changeOwnTickets(issue: string | null | undefined, branch: string | null): string[];
declare function computeCommitSplit(projectRoot: string, input?: CommitSplitInput): CommitSplit;
declare function branchCarriesOtherWork(split: CommitSplit | null | undefined): boolean;
declare function describeInherited(group: CommitGroup): string;
declare function sharedBranchLine(split: CommitSplit, branch: string | null): string | null;
declare function intakeBranchLine(projectRoot: string, ticketRefs: readonly string[]): string | null;

export { branchCarriesOtherWork, changeOwnTickets, computeCommitSplit, describeInherited, intakeBranchLine, sharedBranchLine };
export type { CommitGroup, CommitSplit, CommitSplitInput };
