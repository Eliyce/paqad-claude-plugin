type CapabilitySeam = 'pre-mutation' | 'completion';
interface CapabilityPayload {
    toolName?: string;
    targetPath?: string;
    transcriptPath?: string;
    sessionId?: string;
    targetPaths?: string[];
    adapter?: string;
    toolUseId?: string;
    toolInput?: unknown;
}

interface CapabilityGateInput {
    projectRoot: string;
    seam: CapabilitySeam;
    env?: NodeJS.ProcessEnv;
    payload?: CapabilityPayload;
    entryLoaded?: () => boolean;
}
interface CapabilityGateResult {
    block: boolean;
    summary: string;
    narration: string;
    context: string;
}
declare function runCapabilityGate(input: CapabilityGateInput): Promise<CapabilityGateResult>;

export { runCapabilityGate };
export type { CapabilityGateInput, CapabilityGateResult };
