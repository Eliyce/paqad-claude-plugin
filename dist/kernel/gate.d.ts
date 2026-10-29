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
    startedAt?: number;
    now?: () => number;
}
declare const ALLOW_ONCE_REASON = "You allowed this edit once in the paqad HUD, and paqad recorded the override. Approve to run it.";
interface CapabilityGateResult {
    block: boolean;
    ask?: string;
    summary: string;
    narration: string;
    context: string;
}
declare function runCapabilityGate(input: CapabilityGateInput): Promise<CapabilityGateResult>;

export { ALLOW_ONCE_REASON, runCapabilityGate };
export type { CapabilityGateInput, CapabilityGateResult };
