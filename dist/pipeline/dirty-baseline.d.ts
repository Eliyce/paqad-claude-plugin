interface DirtyBaseline {
    captured_at: string;
    files: Record<string, string>;
}
declare function digestFile(projectRoot: string, relativePath: string): string | null;
declare function captureSessionDirtyBaseline(projectRoot: string, sessionHint: string | null): Promise<void>;
declare function readSessionDirtyBaseline(projectRoot: string, sessionHint: string | null): DirtyBaseline | null;
declare function subtractUnchangedBaselineFiles(projectRoot: string, sessionHint: string | null, files: readonly string[]): string[];

export { captureSessionDirtyBaseline, digestFile, readSessionDirtyBaseline, subtractUnchangedBaselineFiles };
export type { DirtyBaseline };
