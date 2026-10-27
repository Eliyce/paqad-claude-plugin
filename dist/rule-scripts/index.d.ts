import { R as RuleRunFinding } from '../bundle-ledgers-3AJbkb_G.js';

declare const RULE_SCRIPT_MAP_SCHEMA_VERSION: 1;
type VerifiabilityKind = 'deterministic' | 'heuristic' | 'unverifiable';
type ScriptScope = 'changed-files' | 'whole-tree' | 'git-diff' | 'git-history';
interface Verifiability {
    kind: VerifiabilityKind;
    reason?: string;
}
interface ScriptEntry {
    path: string;
    kind: Exclude<VerifiabilityKind, 'unverifiable'>;
    runtime: 'node';
    scope: ScriptScope;
    last_validated_at: string;
    fixtures_passed: boolean;
}
interface RuleEntry {
    id: string;
    source: string;
    text: string;
    text_hash: string;
    verifiability: Verifiability;
    enforced_by: string[];
    scripts: ScriptEntry[];
}
interface RuleScriptMap {
    schema_version: typeof RULE_SCRIPT_MAP_SCHEMA_VERSION;
    generated_at: string;
    rule_files_hash: string;
    rules: RuleEntry[];
    archived?: RuleEntry[];
}

declare function sha256(input: string): string;
declare function ruleTextHash(text: string): string;
declare function parseRuleMarker(line: string): string | null;
declare function stripRuleMarker(line: string): {
    text: string;
    id: string | null;
};
declare function embedRuleMarker(line: string, id: string): string;
declare function mintRuleId(source: string, text: string, takenIds: ReadonlySet<string>): string;
declare function isRuleId(value: string): boolean;

interface ParsedRule {
    line: number;
    indent: string;
    text: string;
    text_hash: string;
    id: string | null;
}
declare function parseRuleFile(content: string): ParsedRule[];
interface EmbedResult {
    content: string;
    rules: {
        id: string;
        text: string;
        text_hash: string;
        isNew: boolean;
    }[];
}
declare function embedRuleIds(source: string, content: string, takenIds: Set<string>): EmbedResult;

declare function ruleScriptMapPath(projectRoot: string): string;
declare function emptyRuleScriptMap(now?: Date): RuleScriptMap;
declare function loadRuleScriptMap(projectRoot: string): RuleScriptMap | null;
declare function serializeRuleScriptMap(map: RuleScriptMap): string;

interface RuleScriptMapEvent {
    ts: string;
    via: string;
    action: 'analyze' | 'generate' | 'edit' | 'remove' | 'downgrade' | 'reconcile';
    rule_ids: string[];
    note?: string;
}
interface ApplyRuleScriptMapOptions {
    projectRoot: string;
    map: RuleScriptMap;
    via: string;
    event: Omit<RuleScriptMapEvent, 'ts' | 'via'>;
}
interface ApplyRuleScriptMapResult {
    snapshot_path: string;
    applied_at: string;
}
declare function snapshotRuleScriptMap(projectRoot: string, via: string, now?: Date): string;
declare function atomicWriteRuleScriptMap(projectRoot: string, yaml: string): void;
declare function applyRuleScriptMap(opts: ApplyRuleScriptMapOptions): ApplyRuleScriptMapResult;

interface RuleInventoryItem {
    id: string;
    source: string;
    text: string;
    text_hash: string;
    isNew: boolean;
}
interface ScanResult {
    inventory: RuleInventoryItem[];
    files: string[];
    rule_files_hash: string;
    changed_files: string[];
}
declare function collectRuleFiles(projectRoot: string): string[];
declare function computeRuleFilesHash(projectRoot: string, files: string[]): string;
declare function scanAndEmbedIds(projectRoot: string): ScanResult;
interface RuleClassification {
    id: string;
    verifiability: RuleEntry['verifiability'];
    enforced_by: string[];
}
declare function assembleMap(inventory: RuleInventoryItem[], classifications: Map<string, RuleClassification>, rule_files_hash: string, priorMap: RuleScriptMap | null, now?: Date): RuleScriptMap;

declare function isRuleScriptMapStale(projectRoot: string): boolean;
interface CompileRuleScriptsResult {
    map: RuleScriptMap;
    ruleCount: number;
    scriptedCount: number;
    changedFiles: string[];
    snapshotPath: string;
    appliedAt: string;
}
declare function compileRuleScripts(projectRoot: string): CompileRuleScriptsResult;

interface ValidationResult {
    valid: boolean;
    errors: string[];
}
declare function validateScriptHeader(header: unknown): ValidationResult;
declare function validateFindings(report: unknown): ValidationResult;

declare const HEADER_MARKER = "@paqad-rule-script";
interface ScriptHeader {
    rule_id: string;
    source: string;
    kind: 'deterministic' | 'heuristic';
    scope: 'changed-files' | 'whole-tree' | 'git-diff' | 'git-history';
    runtime: 'node';
    requires?: {
        node?: string;
        binaries?: string[];
    };
    per_file?: boolean;
    last_validated_at?: string;
    false_positive_surface?: string;
}
declare function extractHeaderFields(content: string): Record<string, string> | null;
interface ParsedHeader {
    ok: boolean;
    header?: ScriptHeader;
    errors: string[];
}
declare function parseScriptHeader(content: string): ParsedHeader;

interface ExecutePayload {
    projectRoot: string;
    files: string[];
}
interface Finding {
    file: string;
    line?: number;
    message: string;
    severity: 'critical' | 'blocker' | 'high' | 'medium' | 'low' | 'nit' | 'info';
}
interface FindingsReport {
    rule_id: string;
    kind: 'deterministic' | 'heuristic';
    findings: Finding[];
}
interface ExecuteResult {
    ok: boolean;
    report?: FindingsReport;
    error?: string;
    warning?: string;
}
declare const SCRIPT_ABORTED_ERROR = "script stopped: the rule gate ran out of time";
declare function executeRuleScript(scriptPath: string, payload: ExecutePayload, timeoutMs?: number): ExecuteResult;
interface ExecuteAsyncOptions {
    timeoutMs?: number;
    signal?: AbortSignal;
}
declare function executeRuleScriptAsync(scriptPath: string, payload: ExecutePayload, options?: ExecuteAsyncOptions): Promise<ExecuteResult>;
declare function isOnPath(bin: string): boolean;
declare function missingBinaries(binaries: string[] | undefined): string[];

interface FixtureFailure {
    fixture: string;
    expected: 'zero-findings' | 'at-least-one-finding';
    actual: number;
    detail?: string;
}
interface FixtureResult {
    passed: boolean;
    pass_fixtures: number;
    fail_fixtures: number;
    failures: FixtureFailure[];
    missing_fixtures: boolean;
    missing_binaries?: string[];
}
declare function fixturesRoot(scriptPath: string): string;
declare function runFixtures(scriptPath: string): FixtureResult;

declare const OVER_FLAG_THRESHOLDS: Record<'deterministic' | 'heuristic', number>;
interface OverFlagResult {
    files_checked: number;
    files_flagged: number;
    rate: number;
    threshold: number;
    exceeded: boolean;
}
declare function checkOverFlag(scriptPath: string, kind: Exclude<VerifiabilityKind, 'unverifiable'>, projectRoot: string, files: string[], threshold?: number): OverFlagResult;

declare function upsertScriptEntry(map: RuleScriptMap, ruleId: string, entry: ScriptEntry): RuleScriptMap;
declare function addRuleEntry(map: RuleScriptMap, entry: {
    id: string;
    source: string;
    text: string;
    text_hash: string;
}): RuleScriptMap;
declare function setRuleText(map: RuleScriptMap, ruleId: string, text: string, textHash: string): RuleScriptMap;
declare function clearRuleScripts(map: RuleScriptMap, ruleId: string): RuleScriptMap;
declare function setVerifiability(map: RuleScriptMap, ruleId: string, verifiability: Verifiability): RuleScriptMap;
declare function archiveRule(map: RuleScriptMap, ruleId: string): RuleScriptMap;

type RuleComplianceMode = 'off' | 'warn' | 'strict';
interface ScriptRunResult {
    rule_id: string;
    script: string;
    kind: 'deterministic' | 'heuristic';
    findings: Finding[];
    skipped?: string;
    warning?: string;
}
interface RunFilter {
    kinds?: RuleScriptKind[];
    scopes?: RuleScriptScope[];
}
interface RunReport {
    generated_at: string;
    mode: RuleComplianceMode;
    rule_files_hash: string;
    script_files_hash: string;
    target_files_hash: string;
    filter?: RunFilter;
    results: ScriptRunResult[];
    counts: {
        deterministic: number;
        heuristic: number;
        skipped: number;
    };
    blocking: boolean;
    from_cache?: boolean;
    aborted?: boolean;
}
type RuleScriptKind = 'deterministic' | 'heuristic';
type RuleScriptScope = 'changed-files' | 'whole-tree';
interface RunOptions {
    projectRoot: string;
    mode: RuleComplianceMode;
    changedFiles?: string[];
    wholeTreeGlobs?: string[];
    kinds?: RuleScriptKind[];
    scopes?: RuleScriptScope[];
}
interface RunAsyncOptions extends RunOptions {
    concurrency?: number;
    signal?: AbortSignal;
    useFileCache?: boolean;
    scriptTimeoutMs?: number;
}
declare function scriptFilesHash(projectRoot: string, map: RuleScriptMap): string;
declare function runRuleScripts(opts: RunOptions): RunReport;
declare function runRuleScriptsAsync(opts: RunAsyncOptions): Promise<RunReport>;
declare function ruleRunFindings(report: RunReport): RuleRunFinding[] | undefined;
declare function readReport(projectRoot: string): RunReport | null;

interface RuleViolation {
    rule_id: string;
    title?: string;
    script: string;
    file: string;
    line?: number;
    message: string;
    severity: Finding['severity'];
}
interface EnforcementResult {
    ran: boolean;
    mode: RuleComplianceMode;
    blocking: boolean;
    violations: RuleViolation[];
    armed: number;
    summary: string;
    aborted?: boolean;
}
type EnforceScope = 'changed-files' | 'whole-tree';
interface EnforceOptions {
    projectRoot: string;
    mode: RuleComplianceMode;
    changedFiles?: string[];
    scope?: EnforceScope;
    kinds?: RuleScriptKind[];
    scopes?: RuleScriptScope[];
    concurrency?: number;
    signal?: AbortSignal;
    useFileCache?: boolean;
    editTargets?: string[];
}
declare function enforceRuleScripts(options: EnforceOptions): Promise<EnforcementResult>;
declare function formatEnforcementSummary(result: {
    mode: RuleComplianceMode;
    blocking: boolean;
    violations: RuleViolation[];
}): string;

type RuleScriptFindingCode = 'RS-RULE-ADDED' | 'RS-RULE-EDITED' | 'RS-RULE-REMOVED' | 'RS-SCRIPT-STALE' | 'RS-FIXTURE-FAIL' | 'RS-CONFLICT' | 'RS-CACHE-INVALID';
interface RuleScriptDriftFinding {
    code: RuleScriptFindingCode;
    rule_id?: string;
    source?: string;
    message: string;
}
interface RuleScriptDriftReport {
    generated_at: string;
    findings: RuleScriptDriftFinding[];
    counts: Record<RuleScriptFindingCode, number>;
    blocked: boolean;
}
declare function reconcileRuleScripts(projectRoot: string): RuleScriptDriftReport;
declare function readDrift(projectRoot: string): RuleScriptDriftReport | null;
interface RuleConflict {
    rule_ids: string[];
    message: string;
}
declare function recordConflictFindings(projectRoot: string, conflicts: RuleConflict[]): RuleScriptDriftReport;

declare function cleanRuleText(input: string): string;
interface AddedRule {
    id: string;
    source: string;
    text: string;
    text_hash: string;
}
declare function addRule(projectRoot: string, sourceRel: string, text: string): AddedRule;
declare function editRuleText(projectRoot: string, ruleId: string, newText: string): {
    source: string;
} | null;
declare function removeRuleBullet(projectRoot: string, ruleId: string): {
    source: string;
} | null;

declare function pruneOrphanScripts(projectRoot: string, map: RuleScriptMap): string[];

export { HEADER_MARKER, OVER_FLAG_THRESHOLDS, RULE_SCRIPT_MAP_SCHEMA_VERSION, SCRIPT_ABORTED_ERROR, addRule, addRuleEntry, applyRuleScriptMap, archiveRule, assembleMap, atomicWriteRuleScriptMap, checkOverFlag, cleanRuleText, clearRuleScripts, collectRuleFiles, compileRuleScripts, computeRuleFilesHash, editRuleText, embedRuleIds, embedRuleMarker, emptyRuleScriptMap, enforceRuleScripts, executeRuleScript, executeRuleScriptAsync, extractHeaderFields, fixturesRoot, formatEnforcementSummary, isOnPath, isRuleId, isRuleScriptMapStale, loadRuleScriptMap, mintRuleId, missingBinaries, parseRuleFile, parseRuleMarker, parseScriptHeader, pruneOrphanScripts, readDrift, readReport, reconcileRuleScripts, recordConflictFindings, removeRuleBullet, ruleRunFindings, ruleScriptMapPath, ruleTextHash, runFixtures, runRuleScripts, runRuleScriptsAsync, scanAndEmbedIds, scriptFilesHash, serializeRuleScriptMap, setRuleText, setVerifiability, sha256, snapshotRuleScriptMap, stripRuleMarker, upsertScriptEntry, validateFindings, validateScriptHeader };
export type { AddedRule, ApplyRuleScriptMapOptions, ApplyRuleScriptMapResult, CompileRuleScriptsResult, EmbedResult, EnforceOptions, EnforceScope, EnforcementResult, ExecuteAsyncOptions, ExecutePayload, ExecuteResult, Finding, FindingsReport, FixtureFailure, FixtureResult, OverFlagResult, ParsedHeader, ParsedRule, RuleClassification, RuleComplianceMode, RuleConflict, RuleEntry, RuleInventoryItem, RuleScriptDriftFinding, RuleScriptDriftReport, RuleScriptFindingCode, RuleScriptKind, RuleScriptMap, RuleScriptMapEvent, RuleScriptScope, RuleViolation, RunAsyncOptions, RunFilter, RunOptions, RunReport, ScanResult, ScriptEntry, ScriptHeader, ScriptRunResult, ScriptScope, ValidationResult, Verifiability, VerifiabilityKind };
