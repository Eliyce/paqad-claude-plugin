import { S as SessionLedgerRow } from '../ledger-DjtUKw_R.js';
import { R as ReportSource } from '../types-DQzxB-wr.js';

declare const STAGE_REPORT_STATUSES: readonly ["DONE", "DONE_WITH_CONCERNS", "NEEDS_CONTEXT", "BLOCKED"];
type StageReportStatus = (typeof STAGE_REPORT_STATUSES)[number];
interface StageReportReading {
    status: StageReportStatus;
    advance: boolean;
    decision: string | null;
    stated: boolean;
}

declare const REFUSAL_CEILING = 3;
type Row = SessionLedgerRow;
declare function stageEndCommand(stage: string): string;
declare function missingRequirementReason(stage: string): string;
declare function currentStageOfAgent(rows: readonly Row[], agentId: string | null, agentType: string | null): string | null;
declare function stageRequirementMet(rows: readonly Row[], stage: string, agentId: string | null): boolean;
declare function refusalsSinceLastPass(rows: readonly Row[], agentId: string | null, stage: string): Row[];
type ReportOutcome = 'pass' | 'refuse' | 'ceiling';
interface ReportJudgement {
    outcome: ReportOutcome;
    report_status: StageReportStatus;
    report_stated: boolean;
    advance: boolean;
    decision: string | null;
    stated_status?: StageReportStatus;
    reason?: string;
}
interface JudgeReportInput {
    stage: string;
    agentId: string | null;
    reading: StageReportReading;
    rows: readonly Row[];
    checksRed?: boolean;
    violations?: readonly string[];
}
declare function judgeStageReport(input: JudgeReportInput): ReportJudgement;
interface HandbackPayload {
    agent_id?: unknown;
    agent_type?: unknown;
    session_id?: unknown;
    tool_use_id?: unknown;
    tool_input?: {
        message?: unknown;
    } | null;
}
interface HandbackDecision {
    exit: 0 | 2;
    reason?: string;
    wrote: boolean;
}
interface DecideHandbackInput {
    projectRoot: string;
    payload: HandbackPayload;
    now?: () => Date;
}
declare function decideHandback(input: DecideHandbackInput): HandbackDecision;
declare function isChecksRed(projectRoot: string, dirName: string, stage: string): boolean;
interface StageReportJson {
    agent_id: string;
    stage: string | null;
    report_status: string;
    advance: boolean | null;
    decision: string | null;
    report_source: string;
    reason: string | null;
    tokens_not_recarried: number | null;
    resume_advice: 'resume' | 'dispatch-fresh';
    next_action: string;
}
interface StageReportOptions {
    checksRed?: (stage: string) => boolean;
    decisionAnswered?: (decision: string) => boolean;
}
declare function stageReportOptions(projectRoot: string, dirName: string): StageReportOptions;
declare function buildStageReport(rows: readonly Row[], agentId: string, options?: StageReportOptions): StageReportJson | null;
declare function unknownAgentReport(agentId: string, reason: string): StageReportJson;
interface StageRefusal {
    stage: string;
    message: string;
}
declare function stageStartRefusal(rows: readonly Row[], stage: string, lane: string | null, options?: StageReportOptions): StageRefusal | null;
declare const SUBAGENT_HANDBACK_TOOL = "SubagentHandback";
interface StopPayload extends HandbackPayload {
    agent_transcript_path?: unknown;
    last_assistant_message?: unknown;
}
interface ResolvedReport {
    source: ReportSource;
    reading: StageReportReading;
    message: string | null;
    handbackRow: Row | null;
    gateChecked: boolean;
}
interface ResolveReportInput {
    rows: readonly Row[];
    agentId: string | null;
    payload: StopPayload;
    adapter: string;
    fallbackTranscript?: string;
}
declare function resolveStageReport(input: ResolveReportInput): ResolvedReport;
interface StopDecision {
    block: boolean;
    reason?: string;
}
interface StageStopInput {
    projectRoot: string;
    payload: StopPayload;
    adapter: string;
    transcriptText?: string;
    now?: () => Date;
}
declare function decideStageStop(input: StageStopInput): StopDecision;

export { REFUSAL_CEILING, SUBAGENT_HANDBACK_TOOL, buildStageReport, currentStageOfAgent, decideHandback, decideStageStop, isChecksRed, judgeStageReport, missingRequirementReason, refusalsSinceLastPass, resolveStageReport, stageEndCommand, stageReportOptions, stageRequirementMet, stageStartRefusal, unknownAgentReport };
export type { DecideHandbackInput, HandbackDecision, HandbackPayload, JudgeReportInput, ReportJudgement, ReportOutcome, ResolveReportInput, ResolvedReport, StageRefusal, StageReportJson, StageReportOptions, StageStopInput, StopDecision, StopPayload };
