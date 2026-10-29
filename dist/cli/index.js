#!/usr/bin/env node
import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  buildStageBrief,
  candidatesNeedingDecision,
  extractCandidates,
  resolveBriefSession
} from "../chunk-PXEIQWFO.js";
import {
  stageSettingsReport,
  writeStageSettings
} from "../chunk-7JJXJSRA.js";
import {
  holdRefreshContextLock
} from "../chunk-O6QPPPMO.js";
import {
  DISABLED_SESSION_DOC_TYPE
} from "../chunk-5NR4GDHB.js";
import {
  ADAPTER_TYPES,
  AdapterFactory,
  CODE_KNOWLEDGE_SCHEMA_VERSION,
  Command,
  DEFAULT_GROUNDING_BUDGET_MS,
  DESIGN_TOKENS_PLACEHOLDER_NOTE,
  DesignTokenService,
  DesignTokensMissingError,
  DesignTokensPlaceholderError,
  Detector,
  DifferentialRefresh,
  FrameworkUpdater,
  HealthChecker,
  InvalidArgumentError,
  McpConfigManager,
  OnboardingOrchestrator,
  PatternCli,
  Resolver,
  SOURCE_GLOBS,
  StackIntrospector,
  TEST_OUTPUT_SCHEMA_VERSION,
  UNKNOWN_TEST_OUTPUT_TIMESTAMP,
  VERSION,
  activeFeatureDirOrNull,
  addActiveCapability,
  affectsBehaviour,
  appendAuditLog,
  appendAuditLogFailure,
  assertActiveCapability,
  behaviourChangeOf,
  bootstrapFramework,
  bootstrapFrameworkHome,
  buildBoundaryReport,
  buildCodeKnowledgeIndex,
  buildEdges,
  buildEvidenceComment,
  buildExpertBriefs,
  buildPatternAdvisories,
  buildStatusOf,
  builtinSecretScan,
  checkSchemaCompatibility,
  checkSpecCompliance,
  checkSpecShape,
  checksSessionId,
  claudeConfigDir,
  cleanupLegacyMcpFiles,
  collectMapEvidence,
  collectQualityMeasures,
  collectVerificationFindings,
  compareConfigurations,
  computeDependencyUsage,
  computeReachability,
  createBaseline,
  createConfigCommand,
  createDeliveryShell,
  createRagProgressReporter,
  createTestDelta,
  defaultManagedSettingsPaths,
  deriveMapFreshness,
  deriveTestingForProfile,
  dist_default,
  dist_default2,
  dist_default3,
  doctorBoundaryReport,
  doctorObligationIndex,
  doctorSpecReview,
  expertsActive,
  exportFeatureBundle,
  extractSymbols,
  featureReportEnabled,
  formatEvidenceMigration,
  gateRetrieval,
  gatherStaleDocCandidates,
  generateBoundaryTests,
  generateProjectRules,
  generateVitestSkeletons,
  hashSourceFiles,
  installGitHooks,
  isNpmAvailable,
  isStale,
  jvmParser,
  listAvailableActiveCapabilities,
  loadBoundaryReport,
  loadModuleMap,
  loadModuleSlugResolver,
  loadObligationIndex,
  loadSpecReviewReport,
  locate,
  lockfileHash,
  maybeMigrateToPlugin,
  migrateFeatureEvidence,
  migrationSessionId,
  normalizeEvidence,
  parseCommandChain,
  parseGitleaksJson,
  parseJscpdJson,
  parseNpmAuditJson,
  parseOsvScannerJson,
  parseTestOutput,
  pluginSettingsKeys,
  pruneFeatureBundles,
  queryOsv,
  readChangeDiff,
  readChecksReportForFeature,
  readPipelineConfig,
  readQualityBaseline,
  readSchemaMarkerSync,
  readSourceFiles,
  readVerificationEvidence,
  recordMigrationSession,
  removeActiveCapability,
  removeObsoleteContractDocs,
  renderEvidenceMarkdown,
  renderExpertBrief,
  replaceMarkerBlock,
  resolveChecksFlakyMode,
  resolveEntryPoints,
  resolvePackageEcosystem,
  resolveReportFeatureRef,
  rollbackPlugin,
  rollupModuleHealth,
  rosterEntryFor,
  runClaudeInstallWith,
  runClaudePluginUninstall,
  runCommandChain,
  runDeliveryDetection,
  runDuplicationScan,
  saveBoundaryReport,
  saveObligationIndex,
  saveSpecReviewReport,
  scanBoundaries,
  selectTestRunner,
  sessionChecksTarget,
  slugify,
  source_default,
  stampMapFreshness,
  symbolKey,
  tokenizeCommand,
  upsertStackDocCommandRow,
  writeChecksReportForFeature,
  writeFeatureDecisionsIndex,
  writeFeatureReport,
  writeGeneratedFiles,
  writeGitignore,
  writeQualityBaseline,
  writeReviewDigest,
  writeStackArtifacts,
  writeWorktreeInclude
} from "../chunk-AJEQRBVH.js";
import {
  CHECKS_REPORT_SCHEMA_VERSION,
  DEBT_STATUSES,
  addDebtItem,
  appendFixProofRow,
  appendRuleOverride,
  appendRuleOverrideOutcome,
  buildAndWriteChangeTraceabilityMap,
  buildHudSnapshot,
  closeDebtItem,
  countedRedRow,
  discoverModuleHealth,
  discoverSourceRoots,
  isEditOutcome,
  isHudRefreshVerb,
  listDebtItems,
  newestFirst,
  overrideAwaitsOutcome,
  promoteDebtItem,
  readDebtItems,
  readFeatureTechDebtIndex,
  readFixProofRows,
  refreshHudSnapshot,
  scanImports,
  techDebtDir,
  writeFeatureTechDebtIndex
} from "../chunk-P3W4PZEW.js";
import {
  decodeReceiptStatement,
  latestFeatureReceipt,
  moneyText,
  projectAiBomFromFeatures,
  readAllFeatureReceiptEntries,
  readAllFeatureReceipts,
  readCostCache,
  readReceiptEvidenceRows,
  verifyEvidenceSeal,
  verifyReceiptSeal
} from "../chunk-X26V3OWU.js";
import {
  CHIEF_ROLE,
  recordDoneRow,
  recordSeatedRows,
  recordWritingRow,
  scanTranscriptLines
} from "../chunk-UIXGQSDY.js";
import "../chunk-WULKDLB5.js";
import {
  PAQAD_LIVE_HOOKS,
  PAQAD_MUTATING_TOOL_MATCHER
} from "../chunk-PWJ37K7H.js";
import "../chunk-RYQ3S2NO.js";
import "../chunk-F4TESBBJ.js";
import {
  createEvidence,
  persistEvidence,
  prunePatterns,
  queryPatterns,
  syncModuleHealth
} from "../chunk-PTPZHHJG.js";
import {
  EmbeddingProviderError,
  FileVectorIndex,
  PatternStore,
  REMOVED_EMBEDDING_PROVIDER_MESSAGE,
  RagService,
  appendRagAudit,
  assertEmbeddingProviderAvailable,
  buildModuleRoleResolver,
  cosineSimilarity,
  enableEmbeddingProviderCache,
  findRemovedEmbeddingProvider,
  openRagConversation,
  recordRagEvidence,
  resolveRemovedEmbeddingProvider
} from "../chunk-CSFZMKLX.js";
import {
  PAQAD_STATUS_GLYPH
} from "../chunk-5QVCE2TS.js";
import {
  clearChecksRunningMarker,
  writeChecksRunningMarker
} from "../chunk-DKE32SFK.js";
import "../chunk-FEFDOY2L.js";
import "../chunk-Y7QRVDRT.js";
import {
  compileRuleScripts,
  readDrift
} from "../chunk-OMFGVII3.js";
import {
  DEFAULT_OBLIGATION_INDEX_PATH,
  DELIVERY_EVIDENCE_DOC_TYPE,
  DELIVERY_POLICY_FILE,
  NoActiveFeatureError,
  PACK_REGISTRY_FAULT_REMEDIATION,
  PackRegistryEmptyError,
  ReuseDeclarationError,
  SCHEMA_VERSION_UPDATE_HINT,
  SchemaVersionError,
  SiteMapSchemaError,
  StackSnapshotCache,
  aggregateSpecPipelineMetrics,
  appendSpecStepRow,
  assembleExpertRun,
  browserStatus,
  buildFeatureSpec,
  buildProvenance,
  buildRunMetrics,
  canonicalAppMapPath,
  carryForwardIds,
  clearClarificationSection,
  clearExpertSynthesis,
  clearFrozenRun,
  clearStaged,
  decideFinish,
  deriveCaption,
  dynamicRecord,
  editedDevelopmentThisTurn,
  evaluateFrontendTrigger,
  evaluateSpecFreeze,
  execaCommandRunner,
  extractObligationIndex,
  freezeSpec,
  hashRuleSources,
  isFrameworkDisabledForRoot,
  laneMayRise,
  laneRunsSpecPipeline,
  listRunDirs,
  loadCaptureScripts,
  loadDeliveryPolicy,
  markRuleStopAllowedOnce,
  mergeExpertNotes,
  mergedKind,
  packRegistryFaultDetail,
  parseTraceArtifact,
  planFiles,
  projectRelative,
  provisionBrowser,
  queryCodeKnowledge,
  queryFrameworkApi,
  raiseLaneIfGrown,
  readAllFeatureChangeMetrics,
  readAllFeatureEvidence,
  readAllFeatureRag,
  readAllFeatureRuleRuns,
  readAllFeatureStageRows,
  readAllJourneys,
  readCanonicalSiteMap,
  readCodeKnowledgeIndex,
  readExistingOnboardingManifest,
  readExpertNeed,
  readExpertNotes,
  readExpertSynthesis,
  readExperts,
  readFeatureChangeMetricsWindow,
  readFeaturePlan,
  readFeatureSpecification,
  readFrameworkApiIndex,
  readFreezeSections,
  readGrounding,
  readJourney,
  readLabel,
  readLatestDeliveryEvidence,
  readQuestions,
  readRequest,
  readRuleStopRecord,
  readStackSnapshotSync,
  readStagedExpertQuestions,
  readStagedJson,
  readStagedText,
  readTrace,
  readYaml,
  refreshDelivery,
  refreshRuleContext,
  rememberInput,
  removeJourney,
  renderDefaultDeliveryPolicyYaml,
  resolvePlaywrightModulePath,
  resolveRuleApplicabilityForChange,
  resolveVeRuntimeDir,
  reviewSpecification,
  seatExpertsForLane,
  sensitivePaths,
  setFrameworkEnabled,
  specIndexPath,
  specReportPath,
  strongestSeverity,
  validateCodeKnowledgeIndex,
  validateCraftTrace,
  validateExpertNeed,
  validateExpertNotes,
  validateFrameworkApiIndex,
  validateQuestion,
  validateSiteMapAnswers,
  veBrowsersPath,
  visualAcRequiredFiles,
  visualEvidenceFlagOn,
  writeCanonicalSiteMap,
  writeCodeKnowledgeIndex,
  writeDetectionReport,
  writeExpertFindings,
  writeExpertNotes,
  writeExpertRoster,
  writeExpertSynthesis,
  writeFeaturePlan,
  writeFeatureReview,
  writeFeatureSpecification,
  writeFrameworkApiIndex,
  writeFrameworkVersionPreservingTimestamp,
  writeJourney,
  writeLabel,
  writeQuestions,
  writeRequest,
  writeRuleContext,
  writeRulesLoaded,
  writeStagedText,
  writeTrace,
  writeYamlAtomic
} from "../chunk-MVJCZDYV.js";
import "../chunk-XJRPY4JS.js";
import "../chunk-NRKCUFAE.js";
import {
  releaseLock,
  tryAcquireLock
} from "../chunk-NUSNYHWM.js";
import {
  FRAMEWORK_PACKAGE_MAP,
  compileRules,
  getLegacyCapabilities,
  getPrimaryStack,
  writeCompiledRules
} from "../chunk-WWF56VBL.js";
import {
  StackPackLoader,
  atomicWriteFile,
  createPack,
  installPack,
  listPacks,
  removePack,
  resolvePackManagerRoots,
  validatePackAt
} from "../chunk-AERVUFLE.js";
import {
  DECISION_CATEGORIES,
  DECISION_EVIDENCE_DOC_TYPE,
  DecisionPacketCorruptError,
  DecisionStore,
  addWriteInOption,
  computeDecisionFingerprint,
  createPendingDecision,
  findDecisionPrecedents,
  listContractDecisions,
  readContractDecisions,
  readDecisionEvidence,
  resolvePendingDecision
} from "../chunk-6WG455KS.js";
import {
  ACTIVE_CAPABILITIES,
  FrameworkError,
  STACKS,
  engineLog,
  getProfileDomain,
  getProjectSecret,
  migrateProjectProfile,
  readProjectProfile,
  syncProjectProfile,
  writeProjectProfile
} from "../chunk-6C4M3H2R.js";
import {
  readTextIfExistsSync
} from "../chunk-TLKXJ74I.js";
import {
  appendHooksLog
} from "../chunk-BW7VURA4.js";
import {
  getRuntimeRoot
} from "../chunk-VVRAO2BK.js";
import "../chunk-BYYV5KPL.js";
import "../chunk-TUQRHR24.js";
import {
  isOnPath,
  loadRuleScriptMap,
  missingBinaries,
  runPool,
  scanWorkingTree
} from "../chunk-ISYYKMP3.js";
import {
  hudCostCachePath
} from "../chunk-D4CEREBZ.js";
import {
  CHANGE_METRICS_RUN_DOC_TYPE,
  RULE_RUN_DOC_TYPE
} from "../chunk-A4TFR7XI.js";
import "../chunk-KKFSSPUD.js";
import {
  loadChangeEvidence,
  readGitChangedFiles
} from "../chunk-FWUTQ2BL.js";
import {
  execa,
  parseCommandString
} from "../chunk-O77JBFWW.js";
import {
  markerNarrationLine
} from "../chunk-JTDDPPRS.js";
import {
  bundleArtifactFile,
  checkBundleArtifacts,
  classifyBundlePath,
  normalizeArtifactPath
} from "../chunk-GURIOBYT.js";
import {
  compositionForRoute,
  readSessionRoute,
  writeSessionRoute
} from "../chunk-TY4F2MU6.js";
import {
  ROUTED_WORKFLOWS,
  isFeatureDevelopmentRoute,
  readWorkflowState,
  writeWorkflowState
} from "../chunk-BESVAPGH.js";
import {
  clearPendingLane,
  recordMarkedStage
} from "../chunk-XSSY5EO5.js";
import {
  appendModuleMapEvent,
  canTransition,
  driftReportHasFindings,
  expireStaleDecisions,
  isExpired,
  listDecisions,
  listDecisionsByState,
  matchesAnyGlob,
  readDecision,
  readDriftReport,
  readModuleMapEvents,
  readModuleMapEventsForSlug,
  readModuleMapEventsSince,
  readRawModuleMap,
  reconcileModuleMap,
  writeDecision
} from "../chunk-D2ZCEVQX.js";
import {
  require_out
} from "../chunk-DNG6DDRS.js";
import {
  stripTrailingChars,
  toPosixPath,
  toProjectRelativePath
} from "../chunk-4K4CM3QN.js";
import {
  activeChangeKey,
  currentFeature,
  foldFeature,
  readChangeStartPoint,
  readFeatureDelivery,
  readFeatureStageUnit,
  reconcileDeliveryFromGit,
  recordChangeConstants,
  recordCommitForBranch,
  recordLinkAttempt,
  recordShip,
  recordedLaneOrFull,
  refreshCommitSplit,
  resolveActiveChange,
  resolveDeliveryFeatureByBranch,
  resolveFeatureRef,
  resumeFeatureByRef,
  setCommitDecision,
  stampFeatureDocument,
  stampMergeCommit
} from "../chunk-YGMDODB6.js";
import {
  describeEarlierWork
} from "../chunk-QUDDQGFY.js";
import {
  AGENT_ATTACHED_JOURNEY,
  ORCHESTRATOR_AGENT,
  STAGE_EVIDENCE_DOC_TYPE,
  VISUAL_EVIDENCE_DOC_TYPE,
  VISUAL_EVIDENCE_SCHEMA_VERSION,
  buildDocumentEnvelope,
  buildTextHeader,
  laneRank,
  listFeatureDirs,
  liveStageAgents,
  readChangeConstants,
  readFeatureRecord,
  renameWithRetry,
  renderHeaderScript,
  resolveAgentIdentity,
  rowRecordedAt,
  sha256Hex,
  stampBundleRow,
  validateVisualEvidenceRecord
} from "../chunk-J5CSZPQ6.js";
import {
  readGitState
} from "../chunk-AINYJ3Q2.js";
import {
  CHIEF_ARCHITECT_AGENT_NAME,
  DEFAULT_EXISTING_SURFACE_TOKENS,
  DEFAULT_LOCAL_EMBEDDING_MODEL,
  EMBEDDING_PROVIDERS,
  EXPERT_AGENT_NAME,
  LOCAL_EMBEDDING_MODELS,
  STAGE_AGENT_STAGES,
  STAGE_ORDER,
  SchemaValidator,
  delivery_policy_schema_default,
  design_tokens_schema_default,
  getDefaultEmbeddingModel,
  loadFeatureDevelopmentPolicy,
  normalizeIntelligenceConfig,
  project_profile_schema_default,
  require_dist,
  resolveFeatureDevelopmentCheckCommands,
  resolveFrameworkConfig,
  stageForAgentName,
  stripPluginAgentNamespace,
  syncFrameworkConfig
} from "../chunk-QUAQHWSU.js";
import {
  appendStampedRowToUnit,
  foldByOrdinal,
  openSessionDoc,
  readAllSessionRows,
  readUnitFile,
  sessionLedgerDir,
  stampSessionRow
} from "../chunk-QINSFA6R.js";
import {
  detectTicketRefs
} from "../chunk-SU7RODZI.js";
import {
  keepingLedgerSessionCache,
  readLedgerSessionId,
  resolveSessionId
} from "../chunk-HV6ESCNW.js";
import {
  ULID_BODY,
  chatRagPath,
  deriveSlug,
  featureChangeKey,
  featureDir,
  featureFilePath,
  featureScreenshotsDir,
  isSlugSafe,
  parseFeatureDirName,
  ulid
} from "../chunk-DDJC5PRW.js";
import {
  join
} from "../chunk-3STC3IVL.js";
import {
  PATHS
} from "../chunk-LW3OCT4Y.js";
import {
  __toESM,
  init_esm_shims
} from "../chunk-EMKBJVIL.js";

// src/cli/index.ts
init_esm_shims();
import { realpathSync as realpathSync2 } from "fs";
import { pathToFileURL as pathToFileURL4 } from "url";

// src/cli/program.ts
init_esm_shims();

// src/cli/commands/audit.ts
init_esm_shims();
import { mkdirSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";

// src/audit/index.ts
init_esm_shims();

// src/audit/types.ts
init_esm_shims();
var SIEM_FORMATS = ["ocsf", "ecs", "cef", "jsonl"];

// src/audit/aggregate.ts
init_esm_shims();

// src/codebase-health/ledger.ts
init_esm_shims();
var HEALTH_RUN_DOC_TYPE = "codebase-health-run";
var HEALTH_RUN_SCHEMA_VERSION = 1;
function recordHealthRun(projectRoot, summary, ctx = {}) {
  try {
    const sessionId = resolveSessionId(projectRoot, ctx.sessionId);
    return openSessionDoc(
      projectRoot,
      HEALTH_RUN_DOC_TYPE,
      sessionId,
      {
        kind: "run",
        report_id: summary.report_id,
        workflow: summary.workflow,
        offline: summary.offline,
        finding_count: summary.finding_count,
        blocked_count: summary.blocked_count,
        new_since_baseline: summary.new_since_baseline,
        pre_existing: summary.pre_existing,
        event_status: summary.finding_count > 0 ? "findings" : "clean"
      },
      { schemaVersion: HEALTH_RUN_SCHEMA_VERSION, now: ctx.now }
    );
  } catch {
    return null;
  }
}

// src/site-map/ledger.ts
init_esm_shims();
var SITE_MAP_RUN_DOC_TYPE = "site-map-run";
var SITE_MAP_RUN_SCHEMA_VERSION = 1;
function recordSiteMapRun(projectRoot, summary, ctx = {}) {
  try {
    const sessionId = resolveSessionId(projectRoot, ctx.sessionId);
    return openSessionDoc(
      projectRoot,
      SITE_MAP_RUN_DOC_TYPE,
      sessionId,
      {
        kind: "run",
        report_id: summary.report_id,
        workflow: summary.workflow,
        surface_count: summary.surface_count,
        journey_count: summary.journey_count,
        finding_count: summary.finding_count,
        blocked_count: summary.blocked_count,
        new_since_baseline: summary.new_since_baseline,
        pre_existing: summary.pre_existing,
        event_status: summary.finding_count > 0 ? "findings" : "clean"
      },
      { schemaVersion: SITE_MAP_RUN_SCHEMA_VERSION, now: ctx.now }
    );
  } catch {
    return null;
  }
}
var SITE_MAP_JOURNEY_CURATION_DOC_TYPE = "site-map-journey-curation";
function recordJourneyCuration(projectRoot, summary, ctx = {}) {
  try {
    const sessionId = resolveSessionId(projectRoot, ctx.sessionId);
    return openSessionDoc(
      projectRoot,
      SITE_MAP_JOURNEY_CURATION_DOC_TYPE,
      sessionId,
      {
        kind: "curation",
        journey_id: summary.journey_id,
        action: summary.action,
        status: summary.status,
        event_status: summary.action === "confirm" ? "confirmed" : "rejected"
      },
      { schemaVersion: SITE_MAP_RUN_SCHEMA_VERSION, now: ctx.now }
    );
  } catch {
    return null;
  }
}

// src/audit/aggregate.ts
function mapAuthorship(authorship) {
  const human = authorship.accepting_human;
  return {
    ...authorship.agent !== void 0 ? { agent: authorship.agent } : {},
    ...authorship.model !== void 0 ? { model: authorship.model } : {},
    ...authorship.provider !== void 0 ? { provider: authorship.provider } : {},
    ...authorship.model_id !== void 0 ? { model_id: authorship.model_id } : {},
    ...human !== void 0 ? {
      accepting_human: {
        ...human.name !== void 0 ? { name: human.name } : {},
        ...human.email !== void 0 ? { email: human.email } : {}
      }
    } : {},
    provenance: authorship.provenance
  };
}
function evidenceEvents(projectRoot) {
  return readAllFeatureEvidence(projectRoot).map((row) => ({
    kind: "evidence",
    ts: row.ts,
    engine: row.engine,
    code: row.code,
    verdict: row.verdict,
    subject_digest: row.subject_digest,
    strength_class: row.strength_class,
    content_hash: row.content_hash,
    ...row.detail !== void 0 ? { detail: row.detail } : {}
  }));
}
function attestationEvents(projectRoot) {
  return readAllFeatureReceipts(projectRoot).map((envelope, index) => {
    const statement = decodeReceiptStatement(envelope);
    const predicate = statement?.predicate ?? null;
    const sealed = verifyReceiptSeal(envelope);
    return {
      kind: "attestation",
      ts: predicate?.time_verified ?? "",
      code: "receipt",
      verdict: predicate?.verification_result ?? "unknown",
      content_hash: envelope.paqad.receipt_hash,
      receipt_index: index,
      receipt_hash: envelope.paqad.receipt_hash,
      prev_receipt_hash: envelope.paqad.prev_receipt_hash,
      signing_mode: envelope.paqad.signing_mode,
      sealed,
      subjects: (statement?.subject ?? []).map((subject) => ({
        name: subject.name,
        sha256: subject.digest.sha256
      })),
      ...predicate?.change_authorship !== void 0 ? { authorship: mapAuthorship(predicate.change_authorship) } : {},
      ...predicate !== null ? { detail: summarizeReceipt(predicate.verification_result, sealed) } : {}
    };
  });
}
function summarizeReceipt(result, sealed) {
  return `verification ${result}; chain ${sealed ? "sealed" : "BROKEN"}`;
}
var SESSION_LEDGER_DOC_TYPES = [
  DECISION_EVIDENCE_DOC_TYPE,
  DELIVERY_EVIDENCE_DOC_TYPE,
  DISABLED_SESSION_DOC_TYPE,
  HEALTH_RUN_DOC_TYPE,
  SITE_MAP_RUN_DOC_TYPE
];
function sessionVerdict(row) {
  if (row.doc_type === DISABLED_SESSION_DOC_TYPE) return "disabled";
  if (row.blocking === true || row.blocked === true) return "blocked";
  if (row.event_status === "failed") return "fail";
  if (row.event_status === "completed") return "pass";
  if (typeof row.event_status === "string") return row.event_status;
  return typeof row.kind === "string" ? row.kind : "recorded";
}
function sessionDetail(row) {
  const kind = typeof row.kind === "string" ? row.kind : "record";
  switch (row.doc_type) {
    case DECISION_EVIDENCE_DOC_TYPE:
      return typeof row.decision_id === "string" ? `${kind} ${row.decision_id}` : kind;
    case DELIVERY_EVIDENCE_DOC_TYPE: {
      const host = row.detected?.host?.value;
      return host !== void 0 ? `detected host=${host}` : kind;
    }
    case RULE_RUN_DOC_TYPE:
      if (kind === "drift") return `drift ${row.blocked === true ? "blocked" : "clean"}`;
      if (kind === "findings") return `findings ${row.blocking === true ? "blocking" : "clean"}`;
      return kind;
    case STAGE_EVIDENCE_DOC_TYPE:
      return typeof row.stage === "string" ? `${kind} stage=${row.stage}` : kind;
    case DISABLED_SESSION_DOC_TYPE:
      return typeof row.reason === "string" ? `disabled (${row.reason})` : "disabled";
    case HEALTH_RUN_DOC_TYPE: {
      const count = typeof row.finding_count === "number" ? row.finding_count : 0;
      return `health run ${typeof row.report_id === "string" ? row.report_id : ""} \xB7 ${count} finding(s)`.trim();
    }
    case SITE_MAP_RUN_DOC_TYPE: {
      const count = typeof row.finding_count === "number" ? row.finding_count : 0;
      const surfaces = typeof row.surface_count === "number" ? row.surface_count : 0;
      return `site-map run ${typeof row.report_id === "string" ? row.report_id : ""} \xB7 ${surfaces} surface(s) \xB7 ${count} finding(s)`.trim();
    }
    case CHANGE_METRICS_RUN_DOC_TYPE: {
      if (typeof row.meaningful_changed_lines !== "number") {
        return kind;
      }
      const dup = typeof row.dup_new_pct === "number" ? `${row.dup_new_pct}%` : "n/a";
      const reuse = typeof row.reuse_rate === "number" ? row.reuse_rate.toFixed(1) : "n/a";
      const lines = typeof row.meaningful_changed_lines === "number" ? row.meaningful_changed_lines : 0;
      return `change shape \xB7 ${dup} dup, ${reuse} reuse/100 (${lines} lines)`;
    }
    default:
      return kind;
  }
}
function sessionEvent(row) {
  return {
    kind: "session",
    ts: rowRecordedAt(row) ?? "",
    code: row.doc_type,
    doc_type: row.doc_type,
    session_id: row.session_id,
    verdict: sessionVerdict(row),
    content_hash: row.content_hash,
    detail: sessionDetail(row)
  };
}
function sessionLedgerEvents(projectRoot) {
  const fromLedger = SESSION_LEDGER_DOC_TYPES.flatMap(
    (docType) => readAllSessionRows(projectRoot, docType).map(sessionEvent)
  );
  const fromFeatures = [
    ...readAllFeatureStageRows(projectRoot),
    ...readAllFeatureRuleRuns(projectRoot),
    ...readAllFeatureChangeMetrics(projectRoot)
  ].map(sessionEvent);
  return [...fromLedger, ...fromFeatures];
}
function aggregateSiemEvents(projectRoot) {
  const events = [
    ...evidenceEvents(projectRoot),
    ...attestationEvents(projectRoot),
    ...sessionLedgerEvents(projectRoot)
  ];
  return events.sort((a, b) => a.ts.localeCompare(b.ts));
}

// src/audit/redact.ts
init_esm_shims();
var REDACTED = "[REDACTED]";
function redactEvent(event) {
  const redacted = { ...event };
  if (redacted.detail !== void 0) {
    redacted.detail = REDACTED;
  }
  const human = redacted.authorship?.accepting_human;
  if (human !== void 0) {
    redacted.authorship = {
      ...redacted.authorship,
      accepting_human: {
        ...human.name !== void 0 ? { name: REDACTED } : {},
        ...human.email !== void 0 ? { email: REDACTED } : {}
      }
    };
  }
  return redacted;
}

// src/audit/export.ts
init_esm_shims();

// src/audit/formats/cef.ts
init_esm_shims();

// src/audit/severity.ts
init_esm_shims();
function ocsfSeverityId(verdict) {
  switch (verdict) {
    case "fail":
    case "FAILED":
      return 4;
    case "blocked":
    case "inconclusive":
      return 3;
    case "pass":
    case "PASSED":
    case "skipped":
      return 1;
    default:
      return 0;
  }
}
function ocsfStatusId(verdict) {
  switch (verdict) {
    case "pass":
    case "PASSED":
      return 1;
    case "fail":
    case "FAILED":
      return 2;
    default:
      return 0;
  }
}
function ecsOutcome(verdict) {
  switch (verdict) {
    case "pass":
    case "PASSED":
      return "success";
    case "fail":
    case "FAILED":
      return "failure";
    default:
      return "unknown";
  }
}
function cefSeverity(verdict) {
  switch (verdict) {
    case "fail":
    case "FAILED":
      return 8;
    case "blocked":
    case "inconclusive":
      return 5;
    case "pass":
    case "PASSED":
      return 2;
    case "skipped":
      return 1;
    default:
      return 0;
  }
}
function epochMs(ts) {
  const parsed = Date.parse(ts);
  return Number.isNaN(parsed) ? 0 : parsed;
}
function eventMessage(event) {
  if (event.kind === "attestation") {
    const seal = event.sealed ? "sealed" : "BROKEN-chain";
    return `receipt ${event.verdict} (${seal}, ${event.signing_mode ?? "unsigned"})`;
  }
  if (event.kind === "session") {
    const source = event.doc_type ?? event.code;
    return event.detail !== void 0 ? `${source}: ${event.detail}` : `${source}: ${event.verdict}`;
  }
  const engine = event.engine ? `${event.engine} ` : "";
  const grade = event.strength_class ? ` [${event.strength_class}]` : "";
  return `${engine}${event.code}: ${event.verdict}${grade}`;
}

// src/audit/formats/cef.ts
var CEF_VERSION = "CEF:0";
var VENDOR = "Paqad";
var PRODUCT = "paqad-ai";
function escapeCefHeader(value) {
  return value.replace(/\\/g, "\\\\").replace(/\|/g, "\\|");
}
function escapeCefExtension(value) {
  return value.replace(/\\/g, "\\\\").replace(/=/g, "\\=").replace(/\r?\n/g, " ");
}
function pushPair(parts, key, value) {
  if (value !== void 0 && value !== "") {
    parts.push(`${key}=${escapeCefExtension(value)}`);
  }
}
function toCef(event, productVersion) {
  const name = `${event.kind} ${event.engine ?? event.code} ${event.verdict}`.trim();
  const header = [
    CEF_VERSION,
    escapeCefHeader(VENDOR),
    escapeCefHeader(PRODUCT),
    escapeCefHeader(productVersion),
    escapeCefHeader(event.code),
    escapeCefHeader(name),
    String(cefSeverity(event.verdict))
  ].join("|");
  const ext = [];
  pushPair(ext, "rt", String(epochMs(event.ts)));
  pushPair(ext, "outcome", event.verdict);
  pushPair(ext, "cs1Label", "subjectDigest");
  pushPair(ext, "cs1", event.subject_digest);
  pushPair(ext, "cs2Label", "strengthClass");
  pushPair(ext, "cs2", event.strength_class);
  pushPair(ext, "cs3Label", "contentHash");
  pushPair(ext, "cs3", event.content_hash);
  pushPair(ext, "cs4Label", "engine");
  pushPair(ext, "cs4", event.engine);
  pushPair(ext, "cs5Label", "signingMode");
  pushPair(ext, "cs5", event.signing_mode);
  pushPair(ext, "cs6Label", "sealed");
  pushPair(ext, "cs6", event.sealed === void 0 ? void 0 : String(event.sealed));
  const subjects = event.subjects ?? [];
  if (subjects.length > 0) {
    pushPair(ext, "fileHash", subjects[0].sha256);
    pushPair(ext, "fname", subjects[0].name);
    if (subjects.length > 1) {
      pushPair(ext, "cn1Label", "changedFiles");
      pushPair(ext, "cn1", String(subjects.length));
    }
  }
  pushPair(ext, "sourceServiceName", event.doc_type);
  pushPair(ext, "externalId", event.session_id);
  const human = event.authorship?.accepting_human;
  pushPair(ext, "suser", human?.email ?? human?.name);
  pushPair(ext, "msg", event.detail);
  return `${header}|${ext.join(" ")}`;
}

// src/audit/formats/ecs.ts
init_esm_shims();
var ECS_VERSION = "8.11.0";
function labels(event) {
  return {
    paqad_kind: event.kind,
    ...event.doc_type !== void 0 ? { paqad_doc_type: event.doc_type } : {},
    ...event.session_id !== void 0 ? { paqad_session_id: event.session_id } : {},
    ...event.engine !== void 0 ? { paqad_engine: event.engine } : {},
    paqad_verdict: event.verdict,
    ...event.strength_class !== void 0 ? { paqad_strength_class: event.strength_class } : {},
    ...event.subject_digest !== void 0 ? { paqad_subject_digest: event.subject_digest } : {},
    ...event.signing_mode !== void 0 ? { paqad_signing_mode: event.signing_mode } : {},
    ...event.sealed !== void 0 ? { paqad_sealed: String(event.sealed) } : {},
    ...event.receipt_hash !== void 0 ? { paqad_receipt_hash: event.receipt_hash } : {}
  };
}
function toEcsRecord(event, productVersion) {
  const record = {
    "@timestamp": event.ts,
    ecs: { version: ECS_VERSION },
    event: {
      kind: "event",
      category: ["configuration"],
      type: ["info"],
      action: event.code,
      outcome: ecsOutcome(event.verdict),
      module: "paqad",
      dataset: "paqad.evidence",
      provider: "paqad-ai",
      severity: ocsfSeverityId(event.verdict),
      ...event.content_hash !== void 0 ? { id: event.content_hash } : {},
      ...event.detail !== void 0 ? { reason: event.detail } : {}
    },
    observer: { product: "paqad-ai", vendor: "Paqad", version: productVersion },
    message: eventMessage(event),
    tags: ["paqad", event.kind],
    labels: labels(event)
  };
  const subjects = event.subjects ?? [];
  if (subjects.length > 0) {
    record.related = { hash: subjects.map((subject) => subject.sha256) };
    if (subjects.length === 1) {
      record.file = {
        name: subjects[0].name,
        hash: { sha256: subjects[0].sha256 }
      };
    }
  }
  const human = event.authorship?.accepting_human;
  if (human !== void 0 && (human.name !== void 0 || human.email !== void 0)) {
    record.user = {
      ...human.name !== void 0 ? { name: human.name } : {},
      ...human.email !== void 0 ? { email: human.email } : {}
    };
  }
  return record;
}
function toEcs(event, productVersion) {
  return JSON.stringify(toEcsRecord(event, productVersion));
}

// src/audit/formats/ocsf.ts
init_esm_shims();
var OCSF_SCHEMA_VERSION = "1.3.0";
var CLASS_UID = 6003;
var CATEGORY_UID = 6;
var ACTIVITY_ID = 0;
function statusLabel(statusId) {
  if (statusId === 1) return "Success";
  if (statusId === 2) return "Failure";
  return "Unknown";
}
function activityName(kind) {
  switch (kind) {
    case "attestation":
      return "Attestation";
    case "session":
      return "Session";
    default:
      return "Evidence";
  }
}
function toOcsfRecord(event, productVersion) {
  const statusId = ocsfStatusId(event.verdict);
  const paqad = {
    kind: event.kind,
    code: event.code,
    verdict: event.verdict,
    ...event.doc_type !== void 0 ? { doc_type: event.doc_type } : {},
    ...event.session_id !== void 0 ? { session_id: event.session_id } : {},
    ...event.detail !== void 0 ? { detail: event.detail } : {},
    ...event.engine !== void 0 ? { engine: event.engine } : {},
    ...event.subject_digest !== void 0 ? { subject_digest: event.subject_digest } : {},
    ...event.strength_class !== void 0 ? { strength_class: event.strength_class } : {},
    ...event.content_hash !== void 0 ? { content_hash: event.content_hash } : {},
    ...event.sealed !== void 0 ? { sealed: event.sealed } : {},
    ...event.signing_mode !== void 0 ? { signing_mode: event.signing_mode } : {},
    ...event.receipt_hash !== void 0 ? { receipt_hash: event.receipt_hash } : {},
    ...event.prev_receipt_hash !== void 0 ? { prev_receipt_hash: event.prev_receipt_hash } : {},
    ...event.authorship !== void 0 ? { authorship: event.authorship } : {}
  };
  const record = {
    activity_id: ACTIVITY_ID,
    activity_name: activityName(event.kind),
    category_uid: CATEGORY_UID,
    category_name: "Application Activity",
    class_uid: CLASS_UID,
    class_name: "Application Activity",
    type_uid: CLASS_UID * 100 + ACTIVITY_ID,
    time: epochMs(event.ts),
    severity_id: ocsfSeverityId(event.verdict),
    status_id: statusId,
    status: statusLabel(statusId),
    message: eventMessage(event),
    metadata: {
      version: OCSF_SCHEMA_VERSION,
      product: { name: "paqad-ai", vendor_name: "Paqad", version: productVersion },
      log_name: "evidence-ledger",
      log_provider: "paqad-ai",
      ...event.content_hash !== void 0 ? { uid: event.content_hash } : {}
    },
    unmapped: { paqad }
  };
  if (event.authorship !== void 0) {
    const human = event.authorship.accepting_human;
    record.actor = {
      ...event.authorship.agent !== void 0 ? { app_name: event.authorship.agent } : {},
      ...human !== void 0 ? {
        user: {
          ...human.name !== void 0 ? { name: human.name } : {},
          ...human.email !== void 0 ? { email_addr: human.email } : {}
        }
      } : {}
    };
  }
  if (event.subjects !== void 0 && event.subjects.length > 0) {
    record.observables = event.subjects.map((subject) => ({
      name: subject.name,
      type: "File Hash",
      value: subject.sha256
    }));
  }
  return record;
}
function toOcsf(event, productVersion) {
  return JSON.stringify(toOcsfRecord(event, productVersion));
}

// src/audit/export.ts
function formatLine(event, format, productVersion) {
  switch (format) {
    case "ocsf":
      return toOcsf(event, productVersion);
    case "ecs":
      return toEcs(event, productVersion);
    case "cef":
      return toCef(event, productVersion);
    case "jsonl":
      return JSON.stringify(event);
  }
}
function filterSince(events, since) {
  const cutoff = Date.parse(since);
  return events.filter((event) => {
    const t = Date.parse(event.ts);
    return !Number.isNaN(t) && t >= cutoff;
  });
}
function exportAuditEvents(projectRoot, options) {
  let events = aggregateSiemEvents(projectRoot);
  if (options.since !== void 0) {
    events = filterSince(events, options.since);
  }
  if (options.redact === true) {
    events = events.map(redactEvent);
  }
  const lines = events.map((event) => formatLine(event, options.format, options.productVersion));
  return { format: options.format, count: events.length, output: lines.join("\n") };
}

// src/cli/commands/audit.ts
function isSiemFormat(value) {
  return SIEM_FORMATS.includes(value);
}
function createAuditCommand() {
  const command = new Command("audit").description(
    "Export the evidence ledger to your own SIEM (read-only, local-first)"
  );
  command.command("export").description(
    "Project the evidence ledger + receipts into OCSF / ECS / CEF / JSONL for your own SIEM"
  ).option("--format <fmt>", "Output schema: ocsf | ecs | cef | jsonl", "ocsf").option("--since <iso>", "Only export events at or after this ISO-8601 timestamp").option("--out <file>", "Write to a file instead of stdout (for your collector to ship)").option("--redact", "Redact free-text detail and human identities", false).option("--project-root <path>", "Project root", process.cwd()).action((options) => {
    const format = options.format.toLowerCase();
    if (!isSiemFormat(format)) {
      process.stderr.write(
        `error: invalid --format value '${options.format}' (expected ${SIEM_FORMATS.join(" | ")})
`
      );
      process.exitCode = 2;
      return;
    }
    if (options.since !== void 0 && Number.isNaN(Date.parse(options.since))) {
      process.stderr.write(
        `error: invalid --since value '${options.since}' (expected an ISO-8601 timestamp)
`
      );
      process.exitCode = 2;
      return;
    }
    const result = exportAuditEvents(resolve(options.projectRoot), {
      format,
      since: options.since,
      redact: options.redact,
      productVersion: VERSION
    });
    const payload = result.count > 0 ? `${result.output}
` : "";
    if (options.out !== void 0) {
      const target = resolve(options.out);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, payload, "utf8");
      process.stderr.write(
        `audit export: wrote ${result.count} ${format} event(s) to ${target}
`
      );
    } else {
      process.stdout.write(payload);
    }
    process.exitCode = 0;
  });
  return command;
}

// src/cli/commands/capabilities.ts
init_esm_shims();
function createCapabilitiesCommand() {
  const command = new Command("capabilities").description("Manage active project capabilities");
  command.command("list").option("--project-root <path>", "Project root", process.cwd()).action((options) => {
    const profile = requireProfile(options.projectRoot);
    process.stdout.write(`${profile.active_capabilities.join("\n")}
`);
  });
  command.command("available").action(() => {
    process.stdout.write(`${listAvailableActiveCapabilities().join("\n")}
`);
  });
  command.command("add <name>").option("--project-root <path>", "Project root", process.cwd()).action((name, options) => {
    const profile = requireProfile(options.projectRoot);
    const next = addActiveCapability(profile, assertActiveCapability(name));
    writeProjectProfile(options.projectRoot, next);
  });
  command.command("remove <name>").option("--project-root <path>", "Project root", process.cwd()).action((name, options) => {
    const profile = requireProfile(options.projectRoot);
    const next = removeActiveCapability(profile, assertActiveCapability(name));
    writeProjectProfile(options.projectRoot, next);
  });
  return command;
}
function requireProfile(projectRoot) {
  const profile = readProjectProfile(projectRoot);
  if (profile === null) {
    throw new Error("Project profile not found");
  }
  return profile;
}

// src/cli/commands/checks.ts
init_esm_shims();
import { readFileSync as readFileSync2 } from "fs";
import { availableParallelism, totalmem } from "os";

// src/checks/run-checks.ts
init_esm_shims();
var import_fast_glob = __toESM(require_out(), 1);
import { availableParallelism as osAvailableParallelism, totalmem as osTotalmem } from "os";
import { rmSync } from "fs";

// src/checks/scheduler.ts
init_esm_shims();
async function runStages(commands, shell, opts) {
  const nowMs = opts.nowMs ?? (() => Date.now());
  const nowIso = opts.nowIso ?? (() => (/* @__PURE__ */ new Date()).toISOString());
  const runOne = async (cmd) => {
    const started_at = nowIso();
    const startMs = nowMs();
    const finish = (partial) => {
      const ended_at = nowIso();
      return {
        logical_command: cmd.logical_command,
        command: cmd.command,
        stage: cmd.stage,
        exit_code: partial.exit_code,
        passed: partial.exit_code === 0,
        started_at,
        ended_at,
        duration_ms: Math.max(0, nowMs() - startMs),
        stdout: partial.stdout,
        stderr: partial.stderr,
        ...partial.invalid ? { invalid: partial.invalid } : {}
      };
    };
    const parsed = parseCommandChain(cmd.command);
    if (!parsed.ok) {
      return finish({
        exit_code: 1,
        stdout: "",
        stderr: "",
        invalid: `Unsupported shell syntax in mapped command: ${parsed.invalidToken}`
      });
    }
    const result = await runCommandChain(shell, parsed.steps, opts.cwd);
    return finish({ exit_code: result.exitCode, stdout: result.stdout, stderr: result.stderr });
  };
  if (!opts.parallel) {
    const out = [];
    for (const cmd of commands) out.push(await runOne(cmd));
    return out;
  }
  const stage1 = commands.filter((cmd) => cmd.stage === 1);
  const stage2 = commands.filter((cmd) => cmd.stage === 2);
  const stage3 = commands.filter((cmd) => cmd.stage === 3);
  const results = [];
  for (const cmd of stage1) results.push(await runOne(cmd));
  results.push(
    ...await runPool(stage2, Math.min(stage2.length, opts.availableParallelism), runOne)
  );
  for (const cmd of stage3) results.push(await runOne(cmd));
  return results;
}

// src/checks/parallel-plan.ts
init_esm_shims();

// src/checks/constants.ts
init_esm_shims();
var MIN_CORES_FOR_PARALLEL_TESTS = 4;
var MIN_PROCESSES = 2;
var MAX_PROCESSES = 16;
var LOW_MEMORY_BYTES = 8 * 1024 ** 3;
var LOW_MEMORY_PROCESS_CAP = 4;
var CONTAINER_PROCESS_CAP = 8;
var CONTAINER_WRAPPERS = [
  "vendor/bin/sail",
  "sail",
  "docker compose",
  "docker-compose"
];
var RERUN_MAX_FAILURES = 10;
var RERUN_MAX_FAILURE_RATIO = 0.05;
var OUTPUT_TAIL_LINES = 100;

// src/checks/parallel-plan.ts
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function runsInContainer(command) {
  return CONTAINER_WRAPPERS.some((wrapper) => command.includes(wrapper));
}
function computeProcessCount(os, isContainer, maxOverride) {
  let count = clamp(os.availableParallelism - 1, MIN_PROCESSES, MAX_PROCESSES);
  if (os.totalmem < LOW_MEMORY_BYTES) count = Math.min(count, LOW_MEMORY_PROCESS_CAP);
  if (isContainer) count = Math.min(count, CONTAINER_PROCESS_CAP);
  if (maxOverride > 0) count = Math.min(count, maxOverride);
  return Math.max(count, MIN_PROCESSES);
}
function resolveTestPlan(profile, os, knobs) {
  const sequential = profile.commands.test;
  if (!knobs.checksParallel) {
    return { command: sequential, mode: "sequential", processes: null, reason: "disabled" };
  }
  const testing = profile.testing;
  if (!testing || testing.parallel === "unavailable" || testing.parallel === "unknown") {
    return {
      command: sequential,
      mode: "sequential",
      processes: null,
      reason: testing?.reason ?? "unknown"
    };
  }
  if (testing.parallel === "native") {
    return { command: sequential, mode: "native", processes: null, reason: null };
  }
  if (os.availableParallelism < MIN_CORES_FOR_PARALLEL_TESTS) {
    return { command: sequential, mode: "sequential", processes: null, reason: "too-few-cores" };
  }
  const parallelCommand = profile.commands.test_parallel;
  if (!parallelCommand) {
    return {
      command: sequential,
      mode: "sequential",
      processes: null,
      reason: "no-parallel-command"
    };
  }
  const processes = computeProcessCount(
    os,
    runsInContainer(parallelCommand),
    knobs.checksMaxProcesses
  );
  return {
    command: parallelCommand.replace(/<processes>/g, String(processes)),
    mode: "parallel",
    processes,
    reason: null
  };
}

// src/checks/isolation-rerun.ts
init_esm_shims();
import { existsSync, readFileSync } from "fs";
import { extname, isAbsolute, resolve as resolve2 } from "path";

// src/flaky/attribution.ts
init_esm_shims();

// src/flaky/registry.ts
init_esm_shims();
import { mkdir, readFile, rename, writeFile } from "fs/promises";
import { dirname as dirname2, join as join2 } from "path";

// src/core/types/flaky.ts
init_esm_shims();
var FLAKY_REGISTRY_SCHEMA_VERSION = "1.0.0";
var DEFAULT_STABILITY_RERUNS = 3;
var MIN_STABILITY_RERUNS = 2;
var MAX_STABILITY_RERUNS = 10;

// src/flaky/registry.ts
function registryPath(projectRoot) {
  return join2(projectRoot, PATHS.FLAKY_REGISTRY);
}
function emptyRegistry(now) {
  return {
    schema_version: FLAKY_REGISTRY_SCHEMA_VERSION,
    updated_at: now,
    entries: []
  };
}
function entryKey(testId, suite) {
  return `${suite ?? ""}::${testId}`;
}
async function readFlakyRegistry(projectRoot, now = (/* @__PURE__ */ new Date()).toISOString()) {
  let raw;
  try {
    raw = await readFile(registryPath(projectRoot), "utf8");
  } catch (error) {
    if (error.code === "ENOENT") {
      return emptyRegistry(now);
    }
    throw error;
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.entries)) {
      return emptyRegistry(now);
    }
    return parsed;
  } catch {
    return emptyRegistry(now);
  }
}
async function writeFlakyRegistry(projectRoot, registry) {
  const targetPath = registryPath(projectRoot);
  await mkdir(dirname2(targetPath), { recursive: true });
  const tempPath = `${targetPath}.tmp-${process.pid}-${Date.now()}`;
  const payload = `${JSON.stringify(registry, null, 2)}
`;
  await writeFile(tempPath, payload, "utf8");
  await rename(tempPath, targetPath);
  return targetPath;
}
function upsertQuarantine(registry, input) {
  const key = entryKey(input.test_id, input.suite);
  const existing = registry.entries.find((e) => entryKey(e.test_id, e.suite) === key);
  const entry = {
    test_id: input.test_id,
    suite: input.suite,
    status: "quarantined",
    first_seen: existing?.first_seen ?? input.now,
    updated_at: input.now,
    evidence: {
      reruns: input.reruns,
      passes: input.passes,
      failures: input.failures
    },
    suspected_causes: input.suspected_causes,
    modules: input.modules
  };
  const entries = existing ? registry.entries.map((e) => entryKey(e.test_id, e.suite) === key ? entry : e) : [...registry.entries, entry];
  return { ...registry, updated_at: input.now, entries };
}

// src/flaky/attribution.ts
function modulesForFile(projectRoot, filePath) {
  if (!filePath) {
    return [];
  }
  const map = readRawModuleMap(projectRoot);
  if (!map) {
    return [];
  }
  const normalised = toPosixPath(filePath);
  const slugs = [];
  for (const mod of map.modules) {
    if (matchesAnyGlob(normalised, mod.sources)) {
      slugs.push(mod.slug);
    }
  }
  return slugs;
}
function modulesForFiles(projectRoot, files) {
  const map = readRawModuleMap(projectRoot);
  if (!map) {
    return [];
  }
  const touched = /* @__PURE__ */ new Set();
  for (const file of files) {
    const normalised = toPosixPath(file);
    for (const mod of map.modules) {
      if (matchesAnyGlob(normalised, mod.sources)) {
        touched.add(mod.slug);
      }
    }
  }
  return [...touched].sort();
}

// src/flaky/smells.ts
init_esm_shims();
var SMELL_RULES = [
  { smell: "timing", signal: "Date.now", pattern: /\bDate\.now\s*\(/ },
  { smell: "timing", signal: "new Date()", pattern: /\bnew\s+Date\s*\(\s*\)/ },
  { smell: "timing", signal: "performance.now", pattern: /\bperformance\.now\s*\(/ },
  { smell: "timing", signal: "setTimeout", pattern: /\bsetTimeout\s*\(/ },
  { smell: "timing", signal: "setInterval", pattern: /\bsetInterval\s*\(/ },
  { smell: "timing", signal: "sleep", pattern: /\b(sleep|delay)\s*\(/ },
  { smell: "randomness", signal: "Math.random", pattern: /\bMath\.random\s*\(/ },
  { smell: "randomness", signal: "crypto.randomUUID", pattern: /\b(randomUUID|randomBytes)\s*\(/ },
  {
    smell: "order-dependence",
    signal: "test.only / describe.only",
    pattern: /\b(test|it|describe)\.only\b/
  },
  { smell: "order-dependence", signal: "beforeAll mutation", pattern: /\bbeforeAll\s*\(/ },
  { smell: "shared-state", signal: "process.env mutation", pattern: /\bprocess\.env\.\w+\s*=/ },
  { smell: "shared-state", signal: "global assignment", pattern: /\b(globalThis|global)\.\w+\s*=/ },
  { smell: "shared-state", signal: "static mutable", pattern: /\b(let|var)\s+\w+\s*=.*\[\]/ },
  { smell: "network-io", signal: "fetch", pattern: /\bfetch\s*\(/ },
  { smell: "network-io", signal: "http(s) request", pattern: /\bhttps?\.(get|request)\s*\(/ },
  { smell: "network-io", signal: "axios", pattern: /\baxios\b/ },
  { smell: "network-io", signal: "fs read/write", pattern: /\b(readFileSync|writeFileSync|fs\.)/ }
];
function detectFlakinessSmells(source) {
  if (!source) {
    return [];
  }
  const seen = /* @__PURE__ */ new Set();
  const hits = [];
  for (const rule of SMELL_RULES) {
    if (!rule.pattern.test(source)) {
      continue;
    }
    const key = `${rule.smell}:${rule.signal}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    hits.push({ smell: rule.smell, signal: rule.signal });
  }
  return hits;
}
function smellCategories(hits) {
  const order = [
    "timing",
    "order-dependence",
    "shared-state",
    "network-io",
    "randomness"
  ];
  const present = new Set(hits.map((hit) => hit.smell));
  return order.filter((smell) => present.has(smell));
}

// src/flaky/stability.ts
init_esm_shims();
function resolveRerunCount(projectRoot) {
  const configured = readProjectProfile(projectRoot)?.custom?.flaky?.rerun_count;
  return clampRerunCount(configured ?? DEFAULT_STABILITY_RERUNS);
}
function clampRerunCount(value) {
  if (!Number.isFinite(value)) {
    return DEFAULT_STABILITY_RERUNS;
  }
  const rounded = Math.round(value);
  return Math.min(MAX_STABILITY_RERUNS, Math.max(MIN_STABILITY_RERUNS, rounded));
}
function judgeStability(input) {
  const total = clampRerunCount(input.reruns);
  let passes = 0;
  let failures = 0;
  for (let attempt = 0; attempt < total; attempt += 1) {
    if (input.rerun(attempt).passed) {
      passes += 1;
    } else {
      failures += 1;
    }
  }
  const verdict = classifyStability(passes, failures);
  return {
    test_id: input.test_id,
    verdict,
    reruns: total,
    passes,
    failures
  };
}
function classifyStability(passes, failures) {
  if (passes > 0 && failures > 0) {
    return "flaky";
  }
  if (failures > 0) {
    return "real";
  }
  return "recovered";
}

// src/checks/isolation-rerun.ts
function collectFailing(result) {
  return [
    ...result.failures.map((issue) => ({ issue, bucket: "failures" })),
    ...result.errors.map((issue) => ({ issue, bucket: "errors" }))
  ];
}
function buildSelector(issue, selector) {
  if (selector === "file") return issue.file_path ?? "";
  const id = issue.test_id ?? "";
  return id.includes("::") ? id.split("::").pop() ?? "" : id;
}
function buildRerunCommand(template, selector, outputPathPattern, index) {
  let command = template.split("<pattern>").join(selector).split("<path_or_file>").join(selector);
  const redirected = rerunOutputPath(outputPathPattern, index);
  if (outputPathPattern && redirected && command.includes(outputPathPattern)) {
    command = command.split(outputPathPattern).join(redirected);
  }
  return command;
}
function rerunOutputPath(outputPathPattern, index) {
  if (!outputPathPattern) return void 0;
  const ext = extname(outputPathPattern).replace(/^\./, "") || "out";
  return `.paqad/test-results/rerun-${index}.${ext}`;
}
function readSource(projectRoot, filePath, read) {
  if (!filePath) return "";
  const abs = isAbsolute(filePath) ? filePath : resolve2(projectRoot, filePath);
  if (!abs.startsWith(resolve2(projectRoot))) return "";
  return read(abs) ?? "";
}
function defaultReadTestFile(absPath) {
  try {
    return existsSync(absPath) ? readFileSync(absPath, "utf8") : null;
  } catch {
    return null;
  }
}
async function confirmFailures(input) {
  const result = structuredClone(input.result);
  const failing = collectFailing(result);
  const readTestFile = input.readTestFile ?? defaultReadTestFile;
  const base = {
    isolation_reruns: {
      performed: false,
      skipped_reason: null,
      rerun_count: input.rerunCount,
      entries: []
    },
    flaky_under_parallel: [],
    meaningful_green: true
  };
  if (failing.length === 0) {
    return { result, ...base };
  }
  const overRatio = failing.length > RERUN_MAX_FAILURE_RATIO * result.summary.total;
  if (failing.length > RERUN_MAX_FAILURES || overRatio) {
    return {
      result,
      ...base,
      isolation_reruns: { ...base.isolation_reruns, skipped_reason: "too-many-failures" }
    };
  }
  const entries = [];
  const flaky = [];
  const recoveredKeys = /* @__PURE__ */ new Set();
  let registry = await readFlakyRegistry(input.projectRoot);
  let registryChanged = false;
  for (const [index, { issue, bucket: bucket2 }] of failing.entries()) {
    const selector = buildSelector(issue, input.singleSelector);
    if (selector.trim().length === 0) {
      entries.push(rerunEntry(issue, null, 0, 0, "real", true, "no-selector"));
      continue;
    }
    const command = buildRerunCommand(
      input.singleCommandTemplate,
      selector,
      input.outputPathPattern,
      index
    );
    const rerunOutput = rerunOutputPath(input.outputPathPattern, index);
    const outcomes = [];
    let allMatchedNothing = true;
    for (let attempt = 0; attempt < input.rerunCount; attempt += 1) {
      const outcome = await input.runSingle(command, rerunOutput);
      const summary = outcome.result.summary;
      const matchedNothing = summary.total === 0;
      if (!matchedNothing) allMatchedNothing = false;
      const passed = outcome.exitCode === 0 && summary.failed + summary.errored === 0 && summary.total >= 1;
      outcomes.push(passed);
    }
    const judgement = judgeStability({
      test_id: issue.test_id,
      reruns: input.rerunCount,
      rerun: (attempt) => ({ passed: outcomes[attempt] ?? false })
    });
    const passes = outcomes.filter(Boolean).length;
    const recovered = judgement.verdict === "recovered";
    const blocking = recovered ? input.flakyMode === "fail" : true;
    const reason2 = allMatchedNothing && !recovered ? "selector-matched-nothing" : void 0;
    entries.push(
      rerunEntry(issue, selector, input.rerunCount, passes, judgement.verdict, blocking, reason2)
    );
    if (!recovered) continue;
    const source = readSource(input.projectRoot, issue.file_path, readTestFile);
    const suspected = smellCategories(detectFlakinessSmells(source));
    registry = upsertQuarantine(registry, {
      test_id: issue.test_id,
      suite: issue.suite,
      reruns: input.rerunCount,
      passes,
      failures: input.rerunCount - passes,
      suspected_causes: suspected,
      modules: modulesForFile(input.projectRoot, issue.file_path),
      now: input.now()
    });
    registryChanged = true;
    flaky.push({
      test_id: issue.test_id,
      file_path: issue.file_path,
      line_number: issue.line_number,
      suspected_causes: suspected
    });
    recoveredKeys.add(`${bucket2}:${issue.test_id}:${issue.file_path ?? ""}`);
    if (input.flakyMode !== "fail") {
      result.warnings.push({
        type: "flaky-under-parallel",
        message: `Test "${issue.test_id}" failed under parallel but passed every isolated re-run \u2014 recorded, not blocking.`,
        source_test_id: issue.test_id
      });
    }
  }
  if (input.flakyMode !== "fail" && recoveredKeys.size > 0) {
    result.failures = result.failures.filter(
      (issue) => !recoveredKeys.has(`failures:${issue.test_id}:${issue.file_path ?? ""}`)
    );
    result.errors = result.errors.filter(
      (issue) => !recoveredKeys.has(`errors:${issue.test_id}:${issue.file_path ?? ""}`)
    );
    result.summary.failed = result.failures.length;
    result.summary.errored = result.errors.length;
  }
  if (registryChanged) {
    await writeFlakyRegistry(input.projectRoot, registry);
  }
  return {
    result,
    isolation_reruns: {
      performed: true,
      skipped_reason: null,
      rerun_count: input.rerunCount,
      entries
    },
    flaky_under_parallel: flaky,
    meaningful_green: flaky.length === 0
  };
}
function rerunEntry(issue, selector, attempts, passes, verdict, blocking, reason2) {
  return {
    test_id: issue.test_id,
    file_path: issue.file_path,
    line_number: issue.line_number,
    selector,
    attempts,
    passes,
    verdict,
    blocking,
    ...reason2 ? { reason: reason2 } : {}
  };
}

// src/checks/run-checks.ts
var EMPTY_ISOLATION = {
  performed: false,
  skipped_reason: null,
  rerun_count: 0,
  entries: []
};
async function runChecks(options) {
  const projectRoot = options.projectRoot;
  const nowIso = options.now ?? (() => (/* @__PURE__ */ new Date()).toISOString());
  const nowMs = options.nowMs ?? (() => Date.now());
  const shell = options.shell ?? createDeliveryShell(projectRoot);
  const changedFiles = [...options.changedFiles ?? []];
  const osFacts = options.osFacts ?? {
    availableParallelism: osAvailableParallelism(),
    totalmem: osTotalmem()
  };
  let profile = readProjectProfile(projectRoot);
  const { policy } = loadFeatureDevelopmentPolicy(projectRoot, profile);
  const { commands: resolvedCommands, warnings } = resolveFeatureDevelopmentCheckCommands(
    policy.stages.checks.checks,
    profile
  );
  const config = resolveFrameworkConfig(projectRoot);
  const checksParallel = options.checksParallel ?? config.features.checks_parallel;
  const checksMaxProcesses = options.checksMaxProcesses ?? config.features.checks_max_processes;
  const flakyMode = options.flakyMode ?? resolveChecksFlakyMode(projectRoot);
  let testingRecorded = false;
  if (profile) {
    const refreshed = refreshTestingRecord(profile, projectRoot, nowIso());
    profile = refreshed.profile;
    testingRecorded = refreshed.recorded;
  }
  const plan = profile ? resolveTestPlan(profile, osFacts, { checksParallel, checksMaxProcesses }) : (
    /* v8 ignore next -- no profile ⇒ no mapped commands ⇒ emptyResult below; the plan is unused */
    { command: "", mode: "sequential", processes: null, reason: "no-profile" }
  );
  const runner = profile?.stack_profile ? selectTestRunner(profile.stack_profile, profile.commands.test, projectRoot) : null;
  const scheduled = [];
  let hasTest = false;
  for (const resolved of resolvedCommands) {
    if (resolved.command.trim().length === 0) continue;
    if (resolved.logical_command === "format" || resolved.logical_command === "lint") {
      scheduled.push({
        logical_command: resolved.logical_command,
        command: resolved.command,
        stage: 1
      });
    } else if (resolved.logical_command === "test") {
      hasTest = true;
      scheduled.push({ logical_command: "test", command: plan.command, stage: 3 });
    } else {
      scheduled.push({
        logical_command: resolved.logical_command,
        command: resolved.command,
        stage: 2
      });
    }
  }
  if (scheduled.length === 0) return emptyResult(warnings, checksParallel, testingRecorded);
  if (runner) deleteRunnerOutput(projectRoot, runner);
  const runResults = await runStages(scheduled, shell, {
    cwd: projectRoot,
    parallel: checksParallel,
    availableParallelism: osFacts.availableParallelism,
    nowMs,
    nowIso
  });
  const reportCommands = [];
  const results = [];
  let testMode = plan.mode;
  let fallbackReason = null;
  let isolation = { ...EMPTY_ISOLATION };
  let flaky = [];
  let meaningfulGreen = true;
  let recovered = 0;
  let testResult = null;
  let testRun = null;
  for (const runResult of runResults) {
    reportCommands.push(toReportCommand(runResult));
    if (runResult.logical_command !== "test") {
      results.push(exitCodeResult(runResult, changedFiles, nowIso()));
      continue;
    }
    testRun = runResult;
    let parsed = await parseTestCommandOutputAsync(runner, runResult, projectRoot, changedFiles);
    if (plan.mode === "parallel" && runResult.exit_code !== 0 && (parsed.summary.total === 0 || parsed.parse_metadata.parse_strategy === "degraded")) {
      const seq = await runOneCommand(shell, profile.commands.test, projectRoot, nowMs, nowIso);
      reportCommands.push(toReportCommand(seq));
      testRun = seq;
      parsed = await parseTestCommandOutputAsync(runner, seq, projectRoot, changedFiles);
      testMode = "sequential";
      fallbackReason = `harness-failure:${firstLine(runResult.stderr).slice(0, 200)}`;
      if (profile) profile = persistHarnessFallback(profile, projectRoot, nowIso());
    }
    if (profile && runner && parsed.summary.failed + parsed.summary.errored > 0) {
      const confirmed = await confirmFailures({
        result: parsed,
        projectRoot,
        singleCommandTemplate: profile.commands.test_single,
        singleSelector: runner.single_test_selector ?? "test_id",
        outputPathPattern: runner.output_path_pattern,
        flakyMode,
        rerunCount: resolveRerunCount(projectRoot),
        now: nowIso,
        runSingle: async (command, outputOverride) => {
          const outcome = await runOneCommand(shell, command, projectRoot, nowMs, nowIso);
          const rerunRunner = outputOverride && runner.output_source === "file" ? { ...runner, output_path_pattern: outputOverride } : (
            /* v8 ignore next -- stdout runners parse from captured output, no redirect override */
            runner
          );
          return {
            exitCode: outcome.exit_code,
            result: await parseTestCommandOutputAsync(
              rerunRunner,
              outcome,
              projectRoot,
              changedFiles
            )
          };
        }
      });
      parsed = confirmed.result;
      isolation = confirmed.isolation_reruns;
      flaky = confirmed.flaky_under_parallel;
      meaningfulGreen = confirmed.meaningful_green;
      recovered = flaky.length;
    }
    testResult = parsed;
    results.push(parsed);
  }
  if (testRun !== null && unreadable(testRun, testResult)) {
    markInconclusive(reportCommands);
    meaningfulGreen = false;
  }
  const nonTestPassed = runResults.filter((r) => r.logical_command !== "test").every((r) => r.passed);
  const blocking = testResult ? testResult.summary.failed + testResult.summary.errored : 0;
  const passed = nonTestPassed && blocking === 0;
  const sequentialReason = hasTest && testMode === "sequential" ? fallbackReason ?? (plan.reason && plan.reason !== "disabled" ? plan.reason : null) : null;
  const parallelFailures = isolation.performed ? isolation.entries.length : blocking;
  const durationTotal = reportCommands.reduce((acc, command) => acc + command.duration_ms, 0);
  const criticalPath = reportCommands.reduce(
    (max, command) => command.duration_ms > max.duration_ms ? { logical_command: command.logical_command, duration_ms: command.duration_ms } : max,
    { logical_command: null, duration_ms: 0 }
  );
  return {
    ran: true,
    passed,
    results,
    warnings,
    mode: {
      parallel_commands: checksParallel,
      test_mode: hasTest ? testMode : "sequential",
      processes: testMode === "parallel" ? plan.processes : null,
      fallback_reason: fallbackReason
    },
    commands: reportCommands,
    isolation_reruns: isolation,
    flaky_under_parallel: flaky,
    meaningful_green: meaningfulGreen,
    critical_path: criticalPath,
    recovered,
    duration_ms: durationTotal,
    sequential_reason: sequentialReason,
    test_total: testResult?.summary.total ?? 0,
    parallel_failures: parallelFailures,
    test_result: testResult,
    testing_recorded: testingRecorded
  };
}
function unreadable(run, result) {
  return run.exit_code === 0 && result.summary.total === 0 && result.parse_metadata.parse_strategy !== "plain-text-fallback";
}
function markInconclusive(commands) {
  const index = commands.map((command) => command.logical_command).lastIndexOf("test");
  commands[index] = { ...commands[index], outcome: "inconclusive" };
}
function toReportCommand(result) {
  const tail2 = !result.passed && (result.stdout || result.stderr || result.invalid) ? [result.invalid ?? "", result.stdout, result.stderr].filter(Boolean).join("\n").split("\n").slice(-OUTPUT_TAIL_LINES) : void 0;
  return {
    logical_command: result.logical_command,
    command: result.command,
    exit_code: result.exit_code,
    passed: result.passed,
    stage: result.stage,
    started_at: result.started_at,
    ended_at: result.ended_at,
    duration_ms: result.duration_ms,
    ...tail2 && tail2.length > 0 ? { output_tail: tail2 } : {}
  };
}
async function runOneCommand(shell, command, cwd, nowMs, nowIso) {
  const started_at = nowIso();
  const startMs = nowMs();
  const parsed = parseCommandChain(command);
  const finish = (exit, stdout, stderr, invalid) => ({
    logical_command: "test",
    command,
    stage: 3,
    exit_code: exit,
    passed: exit === 0,
    started_at,
    ended_at: nowIso(),
    duration_ms: Math.max(0, nowMs() - startMs),
    stdout,
    stderr,
    ...invalid ? { invalid } : {}
  });
  if (!parsed.ok) {
    return finish(1, "", "", `Unsupported shell syntax in mapped command: ${parsed.invalidToken}`);
  }
  const res = await runCommandChain(shell, parsed.steps, cwd);
  return finish(res.exitCode, res.stdout, res.stderr);
}
async function parseTestCommandOutputAsync(runner, result, projectRoot, changedFiles) {
  if (!runner || runner.structured_format === "none") {
    return plainTextResult(result, changedFiles);
  }
  const parsed = await parseTestOutput({
    runner,
    cwd: projectRoot,
    stdout: result.stdout,
    stderr: result.stderr
  });
  const timestamp = parsed.summary.timestamp === UNKNOWN_TEST_OUTPUT_TIMESTAMP ? result.ended_at : parsed.summary.timestamp;
  return withEvidence({ ...parsed, summary: { ...parsed.summary, timestamp } }, changedFiles);
}
function plainTextResult(result, changedFiles) {
  return withEvidence(
    baseResult("test", result.passed, firstLine(result.stderr), "plain-text-fallback", {
      raw_byte_size: result.stdout.length + result.stderr.length | 0,
      timestamp: result.ended_at
    }),
    changedFiles
  );
}
function exitCodeResult(result, changedFiles, timestamp) {
  const runnerId = result.logical_command ?? result.command;
  const message = result.invalid ?? (firstLine(result.stderr) || `Command "${runnerId}" exited non-zero`);
  return withEvidence(
    baseResult(runnerId, result.passed, message, "structured", {
      raw_byte_size: 0,
      duration_ms: result.duration_ms,
      timestamp
    }),
    changedFiles
  );
}
function baseResult(runnerId, passed, message, strategy, extra) {
  const failure2 = passed ? [] : [
    {
      test_id: runnerId,
      suite: null,
      message,
      stack_trace: null,
      file_path: null,
      line_number: null,
      category: "error",
      duration_ms: null
    }
  ];
  return {
    schema_version: TEST_OUTPUT_SCHEMA_VERSION,
    summary: {
      total: 1,
      passed: passed ? 1 : 0,
      failed: passed ? 0 : 1,
      skipped: 0,
      errored: 0,
      duration_ms: extra.duration_ms ?? 0,
      timestamp: extra.timestamp,
      runner_id: runnerId
    },
    failures: failure2,
    warnings: [],
    parse_metadata: {
      raw_byte_size: extra.raw_byte_size,
      structured_byte_size: 0,
      compression_ratio: 1,
      original_size: 0,
      compact_size: 0,
      reduction_ratio: 0,
      delta_mode_used: false,
      escalation_occurred: false,
      escalation_reason: null,
      delta_summary: null,
      parse_strategy: strategy,
      parse_warnings: []
    },
    errors: [],
    evidence_scope: {}
  };
}
function withEvidence(result, changedFiles) {
  return changedFiles.length > 0 ? { ...result, evidence_scope: { related_paths: changedFiles } } : result;
}
function refreshTestingRecord(profile, projectRoot, now) {
  const unchanged = { profile, recorded: false };
  if (!profile.stack_profile) return unchanged;
  const ecosystem = resolvePackageEcosystem(profile.stack_profile.frameworks, projectRoot);
  const currentHash = lockfileHash(projectRoot, ecosystem);
  const recorded = profile.testing;
  const stale = !recorded || currentHash !== void 0 && recorded.lockfile_hash !== currentHash;
  if (!stale) return unchanged;
  const derived = deriveTestingForProfile({
    stackProfile: profile.stack_profile,
    commands: profile.commands,
    projectRoot,
    now
  });
  if (!derived.testing) return unchanged;
  const next = { ...profile, commands: derived.commands, testing: derived.testing };
  const write = syncProjectProfile(projectRoot, next, "checks: recorded test runner parallel mode");
  return { profile: next, recorded: write.written };
}
function persistHarnessFallback(profile, projectRoot, now) {
  const ecosystem = profile.stack_profile ? resolvePackageEcosystem(profile.stack_profile.frameworks, projectRoot) : (
    /* v8 ignore next -- a harness fallback only happens on a parallel run, which requires a stack_profile */
    null
  );
  const hash = lockfileHash(projectRoot, ecosystem);
  const next = {
    ...profile,
    testing: {
      /* v8 ignore next -- a parallel run recorded a runner_id, so the `?? 'unknown'` never fires */
      runner_id: profile.testing?.runner_id ?? "unknown",
      parallel: "unavailable",
      reason: "harness-failure",
      detected_by: "script",
      /* v8 ignore next -- a parallel run implies a resolvable lockfile, so `hash` is present here */
      ...hash ? { lockfile_hash: hash } : {},
      recorded_at: now
    }
  };
  writeProjectProfile(projectRoot, next, "checks: parallel harness failure \u2014 pinned sequential");
  return next;
}
function deleteRunnerOutput(projectRoot, runner) {
  if (runner.output_source !== "file" || !runner.output_path_pattern) return;
  try {
    for (const match of import_fast_glob.default.sync(runner.output_path_pattern, { cwd: projectRoot, absolute: true })) {
      rmSync(match, { force: true });
    }
  } catch {
  }
}
function emptyResult(warnings, checksParallel, testingRecorded) {
  return {
    ran: false,
    passed: true,
    results: [],
    warnings,
    mode: {
      parallel_commands: checksParallel,
      test_mode: "sequential",
      processes: null,
      fallback_reason: null
    },
    commands: [],
    isolation_reruns: { ...EMPTY_ISOLATION },
    flaky_under_parallel: [],
    meaningful_green: true,
    critical_path: { logical_command: null, duration_ms: 0 },
    recovered: 0,
    duration_ms: 0,
    sequential_reason: null,
    test_total: 0,
    parallel_failures: 0,
    test_result: null,
    testing_recorded: testingRecorded
  };
}
function firstLine(text) {
  return text.split("\n")[0]?.trim() ?? "";
}

// src/checks/record-runner.ts
init_esm_shims();
import { existsSync as existsSync2 } from "fs";
import { isAbsolute as isAbsolute2, resolve as resolve3 } from "path";
var PARALLEL_TOKEN_ALLOWLIST = /* @__PURE__ */ new Set([
  "--parallel",
  "--processes=<processes>",
  "-n",
  "<processes>",
  "--dist",
  "--dist=load",
  "--dist=loadfile",
  "--dist=loadscope",
  "--workers=<processes>",
  "--maxWorkers=<processes>",
  "--concurrency=<processes>",
  "-j",
  "--jobs=<processes>",
  "--runner",
  "WrapperRunner",
  "--runner=WrapperRunner",
  "--max-parallel-test-modules",
  "--test-threads=<processes>",
  "-p",
  "&&",
  "--"
]);
var METACHARACTERS = /[;|`$()<>]/;
var REQUIRED_KEYS = [
  "schema_version",
  "runner_id",
  "parallel",
  "reason",
  "test_parallel",
  "single_test_selector",
  "evidence"
];
function sharedPrefix(a, b) {
  const out = [];
  for (let i = 0; i < Math.min(a.length, b.length); i += 1) {
    if (a[i] === b[i]) out.push(a[i]);
    else break;
  }
  return out;
}
function validateRecordRunner(raw, profile, projectRoot, now, lockfileHashValue) {
  if (typeof raw !== "object" || raw === null) {
    return { ok: false, error: "discovery file is not a JSON object" };
  }
  const obj = raw;
  const keys = Object.keys(obj).sort();
  if (keys.join(",") !== [...REQUIRED_KEYS].sort().join(",")) {
    return {
      ok: false,
      error: `discovery file must carry exactly: ${REQUIRED_KEYS.join(", ")}`
    };
  }
  if (typeof obj.runner_id !== "string" || obj.runner_id.length === 0) {
    return { ok: false, error: "runner_id must be a non-empty string" };
  }
  if (obj.parallel !== "available" && obj.parallel !== "unavailable" && obj.parallel !== "native") {
    return { ok: false, error: "parallel must be available | unavailable | native" };
  }
  if (obj.single_test_selector !== "test_id" && obj.single_test_selector !== "file") {
    return { ok: false, error: "single_test_selector must be test_id | file" };
  }
  if (!Array.isArray(obj.evidence) || obj.evidence.length === 0) {
    return { ok: false, error: "evidence must be a non-empty array of paths" };
  }
  for (const path2 of obj.evidence) {
    if (typeof path2 !== "string") return { ok: false, error: "evidence paths must be strings" };
    const abs = isAbsolute2(path2) ? path2 : resolve3(projectRoot, path2);
    if (!abs.startsWith(resolve3(projectRoot)) || !existsSync2(abs)) {
      return { ok: false, error: `evidence path does not exist under the project: ${path2}` };
    }
  }
  const discovery = obj;
  if (discovery.parallel === "available") {
    if (typeof discovery.test_parallel !== "string" || discovery.test_parallel.length === 0) {
      return { ok: false, error: "test_parallel is required when parallel is available" };
    }
    const check = validateParallelCommand(profile.commands.test, discovery.test_parallel);
    if (!check.ok) return check;
  }
  const testing = {
    runner_id: discovery.runner_id,
    parallel: discovery.parallel,
    ...discovery.reason ? { reason: discovery.reason } : {},
    detected_by: "agent",
    ...lockfileHashValue ? { lockfile_hash: lockfileHashValue } : {},
    recorded_at: now
  };
  return {
    ok: true,
    testing,
    testParallel: discovery.parallel === "available" ? discovery.test_parallel : null
  };
}
function validateParallelCommand(sequential, parallel) {
  const seqTokens = tokenizeCommand(sequential);
  const parTokens = tokenizeCommand(parallel);
  const prefix = sharedPrefix(seqTokens, parTokens);
  const hasExecutable = prefix.some((token) => !token.startsWith("-"));
  if (!hasExecutable) {
    return {
      ok: false,
      error: `test_parallel must start with the project's own runner invocation (got "${parTokens[0] ?? ""}")`
    };
  }
  for (const token of parTokens.slice(prefix.length)) {
    if (PARALLEL_TOKEN_ALLOWLIST.has(token)) continue;
    if (METACHARACTERS.test(token)) {
      return { ok: false, error: `test_parallel rejected: shell metacharacter in "${token}"` };
    }
    return {
      ok: false,
      error: `test_parallel rejected: token "${token}" is not an allowed parallel flag`
    };
  }
  const processesCount = (parallel.match(/<processes>/g) ?? []).length;
  if (processesCount !== 1) {
    return { ok: false, error: "test_parallel must contain <processes> exactly once" };
  }
  return { ok: true };
}

// src/cli/commands/checks.ts
var TESTING_RECORDED_NOTE = "recorded the test runner in .paqad/project-profile.yaml (once per lockfile change)";
function createChecksCommand() {
  const command = new Command("checks").description(
    "Run the project format/test/build checks deterministically and record the result"
  );
  command.command("run").description("Run the mapped checks, persist the structured report, and block on failure").option("--project-root <path>", "Project root", process.cwd()).option("--silent", "Suppress the machine-readable summary line", false).action(async (options) => {
    const sessionId = checksSessionId(options.projectRoot);
    const startedOn = activeFeatureDirOrNull(options.projectRoot);
    try {
      writeChecksRunningMarker(options.projectRoot, {
        pid: process.pid,
        session_id: sessionId,
        change: startedOn,
        started_at: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch {
    }
    try {
      await runAndRecordChecks(options, sessionId, startedOn);
    } finally {
      clearChecksRunningMarker(options.projectRoot, sessionId, process.pid);
    }
  });
  command.command("plan").description("Print the resolved checks plan (stages, test mode, processes) without running").option("--project-root <path>", "Project root", process.cwd()).option("--json", "Emit the plan as JSON", false).action((options) => {
    const profile = readProjectProfile(options.projectRoot);
    const { policy } = loadFeatureDevelopmentPolicy(options.projectRoot, profile);
    const { commands } = resolveFeatureDevelopmentCheckCommands(
      policy.stages.checks.checks,
      profile
    );
    const config = resolveFrameworkConfig(options.projectRoot);
    const planProfile = profile && !profile.testing && profile.stack_profile ? {
      ...profile,
      ...deriveTestingForProfile({
        stackProfile: profile.stack_profile,
        commands: profile.commands,
        projectRoot: options.projectRoot,
        now: (/* @__PURE__ */ new Date()).toISOString(),
        mirrorDoc: false
      })
    } : profile;
    const plan = planProfile ? resolveTestPlan(
      planProfile,
      { availableParallelism: availableParallelism(), totalmem: totalmem() },
      {
        checksParallel: config.features.checks_parallel,
        checksMaxProcesses: config.features.checks_max_processes
      }
    ) : { command: "", mode: "sequential", processes: null, reason: "no-profile" };
    const stage1 = commands.filter((c) => c.logical_command === "format" || c.logical_command === "lint").map((c) => c.command);
    const stage2 = commands.filter(
      (c) => c.logical_command !== "format" && c.logical_command !== "lint" && c.logical_command !== "test"
    ).map((c) => c.command);
    if (options.json) {
      console.log(
        JSON.stringify({
          stage_1: stage1,
          stage_2: stage2,
          test_command: plan.command,
          test_mode: plan.mode,
          processes: plan.processes,
          reason: plan.reason
        })
      );
      return;
    }
    console.log("**\u25B8 paqad** \xB7 checks plan");
    console.log(`> stage 1 (serial): ${stage1.join(", ") || "\u2014"}`);
    console.log(`> stage 2 (concurrent): ${stage2.join(", ") || "\u2014"}`);
    console.log(`> test: ${describeTestMode(plan.mode, plan.processes, plan.reason)}`);
  });
  command.command("record-runner").description("Record an agent-discovered test-runner parallel mode (validated, never trusted)").argument("<file>", "Path to the discovery JSON the test-runner-discovery skill produced").option("--project-root <path>", "Project root", process.cwd()).action((file, options) => {
    const profile = readProjectProfile(options.projectRoot);
    if (!profile) {
      console.error("no project profile \u2014 run onboarding first");
      process.exitCode = 2;
      return;
    }
    let raw;
    try {
      raw = JSON.parse(readFileSync2(file, "utf8"));
    } catch {
      console.error(`could not read or parse discovery file "${file}"`);
      process.exitCode = 2;
      return;
    }
    const ecosystem = profile.stack_profile ? resolvePackageEcosystem(profile.stack_profile.frameworks, options.projectRoot) : null;
    const result = validateRecordRunner(
      raw,
      profile,
      options.projectRoot,
      (/* @__PURE__ */ new Date()).toISOString(),
      lockfileHash(options.projectRoot, ecosystem)
    );
    if (!result.ok) {
      console.error(result.error);
      process.exitCode = 2;
      return;
    }
    const next = {
      ...profile,
      commands: result.testParallel ? { ...profile.commands, test_parallel: result.testParallel } : profile.commands,
      testing: result.testing
    };
    writeProjectProfile(options.projectRoot, next, "checks: recorded agent-discovered runner");
    if (result.testParallel) {
      upsertStackDocCommandRow(options.projectRoot, "Test (parallel)", result.testParallel);
    }
    console.log(
      `recorded testing.parallel=${result.testing.parallel} for ${result.testing.runner_id}`
    );
  });
  return command;
}
async function runAndRecordChecks(options, sessionId, startedOn) {
  const changedFiles = (await loadChangeEvidence(options.projectRoot)).files;
  const result = await runChecks({ projectRoot: options.projectRoot, changedFiles });
  const dirName = sessionChecksTarget(options.projectRoot, sessionId, startedOn);
  writeChecksReportForFeature(options.projectRoot, dirName, {
    schema_version: CHECKS_REPORT_SCHEMA_VERSION,
    generated_at: (/* @__PURE__ */ new Date()).toISOString(),
    passed: result.passed,
    ran: result.ran,
    results: result.results,
    mode: result.mode,
    commands: result.commands,
    isolation_reruns: result.isolation_reruns,
    flaky_under_parallel: result.flaky_under_parallel,
    meaningful_green: result.meaningful_green,
    critical_path: result.critical_path
  });
  await buildAndWriteChangeTraceabilityMap(
    {
      projectRoot: options.projectRoot,
      dirName,
      changedFiles,
      testResults: result.results,
      lane: recordedLaneOrFull(options.projectRoot, sessionId, dirName)
    },
    (message) => console.error(`\u26A0\uFE0F  ${message}`)
  );
  for (const warning of result.warnings) console.error(`\u26A0\uFE0F  ${warning}`);
  if (result.testing_recorded) console.error(TESTING_RECORDED_NOTE);
  if (!result.ran) {
    console.log("**\u25B8 paqad** \xB7 no checks mapped: Inconclusive");
    console.log("> \u26AA No format/test/build command is mapped in the project profile.");
    if (!options.silent) console.log(JSON.stringify({ ran: false, passed: null }));
    return;
  }
  const flakyMode = resolveChecksFlakyMode(options.projectRoot);
  for (const line of renderReceipt(result, flakyMode)) console.log(line);
  if (!result.passed) process.exitCode = 1;
  if (!options.silent) {
    console.log(
      JSON.stringify({
        ran: true,
        passed: result.passed,
        test_mode: result.mode.test_mode,
        processes: result.mode.processes,
        recovered: result.recovered,
        duration_ms: result.duration_ms
      })
    );
  }
}
function describeTestMode(mode, processes, reason2) {
  if (mode === "parallel") return `parallel \xD7${processes}`;
  if (mode === "native") return "native";
  return `sequential (${reason2 ?? "unknown"})`;
}
function fmtSecs(ms) {
  const total = Math.round(ms / 1e3);
  if (total < 60) return `${total} s`;
  const min = Math.floor(total / 60);
  const sec = total % 60;
  return `${min} m ${String(sec).padStart(2, "0")} s`;
}
function commandName(logical, command) {
  return logical ?? command;
}
function renderReceipt(result, flakyMode) {
  const lines = [];
  const header = !result.passed ? `**\u25B8 paqad** \xB7 checks failed: Needs your attention (${fmtSecs(result.duration_ms)})` : testUnreadable(result) ? `**\u25B8 paqad** \xB7 checks ran, but no test results could be read: Inconclusive (${fmtSecs(result.duration_ms)})` : `**\u25B8 paqad** \xB7 checks green (${fmtSecs(result.duration_ms)})`;
  lines.push(header);
  for (const command of result.commands) {
    if (command.logical_command === "test") {
      lines.push(...renderTestLines(result, command.duration_ms));
      continue;
    }
    const glyph = command.passed ? "\u{1F7E2}" : "\u{1F534}";
    const suffix = command.passed ? "passed" : `failed (exit ${command.exit_code})`;
    lines.push(
      `> - ${glyph} ${commandName(command.logical_command, command.command)} ${suffix} (${fmtSecs(command.duration_ms)})`
    );
  }
  if (result.recovered > 0) {
    if (flakyMode === "fail") {
      lines.push(
        `> - \u{1F534} ${result.recovered} tests pass alone but fail in the suite (checks_flaky_under_parallel=fail)`
      );
    } else if (flakyMode === "warn") {
      lines.push(
        `> - \u{1F7E1} ${result.recovered} tests failed under parallel and passed alone; recorded, not blocking`
      );
    }
  }
  if (result.sequential_reason) {
    lines.push(`> - \u{1F7E1} test ran sequentially: ${humanReason(result.sequential_reason)}`);
  }
  lines.push(
    `> - Critical path: ${result.critical_path.logical_command ?? "\u2014"} (${fmtSecs(result.critical_path.duration_ms)} of ${fmtSecs(result.duration_ms)} total work)`
  );
  return lines;
}
function renderTestLines(result, durationMs) {
  const test = result.test_result;
  const blocking = test ? test.summary.failed + test.summary.errored : 0;
  const modeSuffix = result.mode.test_mode === "parallel" ? `parallel \xD7${result.mode.processes}` : result.mode.test_mode === "native" ? "native parallel" : "";
  if (testUnreadable(result)) {
    return [`> - \u{1F7E1} test ran, but no test results could be read (${fmtSecs(durationMs)})`];
  }
  if (blocking === 0) {
    const suffix = modeSuffix ? `, ${modeSuffix}` : "";
    const count = result.test_total > 0 && test?.parse_metadata.parse_strategy !== "plain-text-fallback" ? `: ${result.test_total} tests` : ", count unavailable";
    return [`> - \u{1F7E2} test passed${count}${suffix} (${fmtSecs(durationMs)})`];
  }
  const lines = [
    `> - \u{1F534} test failed: ${blocking} tests fail alone (${result.parallel_failures} failed in the parallel run)`
  ];
  if (test) {
    for (const issue of [...test.failures, ...test.errors]) {
      const loc = issue.file_path ? `${issue.file_path}${issue.line_number !== null ? `:${issue.line_number}` : ""}` : "(unknown location)";
      const name = issue.test_id.includes("::") ? issue.test_id.split("::").pop() : issue.test_id;
      lines.push(`>     ${loc} \u203A ${name}`);
    }
  }
  return lines;
}
function testUnreadable(result) {
  return result.commands.some(
    (command) => command.logical_command === "test" && command.outcome === "inconclusive"
  );
}
function humanReason(reason2) {
  if (reason2.endsWith("-missing")) {
    const pkg = reason2.replace(/-missing$/, "");
    const short = pkg.split("/").pop() ?? pkg;
    return `${short} missing (${pkg})`;
  }
  if (reason2 === "too-few-cores") return "fewer than 4 cores";
  if (reason2.startsWith("harness-failure")) return "the parallel harness failed";
  if (reason2 === "unknown")
    return "parallel mode unknown; run the test-runner-discovery skill, then paqad-ai checks record-runner <file>";
  return reason2;
}

// src/cli/commands/compliance.ts
init_esm_shims();
import { readFile as readFile2, stat } from "fs/promises";
import path from "path";
function resolveIndexPath(explicitPath, spec) {
  if (explicitPath) return explicitPath;
  if (spec) return specIndexPath(spec);
  return DEFAULT_OBLIGATION_INDEX_PATH;
}
function formatSpecReviewSummary(report2) {
  const activeDefects = report2.defects.filter((defect) => defect.status !== "resolved");
  const lines = [
    `Spec Review \u2014 ${report2.metadata.spec_file}`,
    `Reviewed: ${report2.metadata.reviewed_at}`,
    "",
    `Open defects: ${activeDefects.length}`
  ];
  if (activeDefects.length > 0) {
    lines.push("");
    lines.push("Findings:");
    for (const defect of activeDefects) {
      const location = defect.locations[0];
      lines.push(
        `  [${defect.severity}] ${defect.category} at ${location?.section ?? "Spec"}:${location?.line_range[0] ?? 0} \u2014 ${defect.description}`
      );
    }
  }
  const resolved = report2.defects.filter((defect) => defect.status === "resolved");
  if (resolved.length > 0) {
    lines.push("");
    lines.push(`Resolved findings carried forward: ${resolved.length}`);
  }
  return lines.join("\n");
}
function createComplianceCommand() {
  const command = new Command("compliance").description("Spec compliance verification tools");
  command.command("extract").description("Extract obligations from a spec and persist an obligation index").requiredOption("--spec <path>", "Markdown spec file path (relative to project root)").option("--project-root <path>", "Project root", process.cwd()).option(
    "--index-path <path>",
    "Index output path (default: .paqad/compliance/{spec-slug}/obligations.json)"
  ).action(async (options) => {
    const indexPath = resolveIndexPath(options.indexPath, options.spec);
    const specPath = path.resolve(options.projectRoot, options.spec);
    const relativeSpec = path.relative(options.projectRoot, specPath);
    const specMarkdown = await readFile2(specPath, "utf8");
    const review = await loadSpecReviewReport({
      project_root: options.projectRoot,
      spec_file: relativeSpec
    });
    const index = extractObligationIndex({
      spec_file: relativeSpec,
      spec_markdown: specMarkdown,
      spec_review: review
    });
    await saveObligationIndex({
      project_root: options.projectRoot,
      index_path: indexPath,
      index
    });
    console.log(JSON.stringify(index, null, 2));
    process.exitCode = 0;
  });
  command.command("review <specFile>").description("Run deterministic spec-quality review and persist the review report").option("--project-root <path>", "Project root", process.cwd()).option("--json", "Print JSON instead of a human-readable summary").action(async (specFile, options) => {
    let relativeSpec;
    try {
      relativeSpec = normalizeArtifactPath(options.projectRoot, specFile);
    } catch {
      console.error(
        `**\u25B8 paqad** \xB7 a spec has to live inside the project for its review to be portable, and ${specFile} resolves outside it.`
      );
      process.exitCode = 1;
      return;
    }
    const specPath = path.resolve(options.projectRoot, relativeSpec);
    const specMarkdown = await readFile2(specPath, "utf8");
    const previousReport = await loadSpecReviewReport({
      project_root: options.projectRoot,
      spec_file: relativeSpec
    });
    const report2 = reviewSpecification({
      spec_file: relativeSpec,
      spec_markdown: specMarkdown,
      previous_report: previousReport
    });
    report2.pattern_advisories = await buildPatternAdvisories({
      min_frequency: 1,
      max_age_days: 365,
      storeRoot: resolvePatternStoreRoot(options.projectRoot)
    });
    await saveSpecReviewReport({
      project_root: options.projectRoot,
      spec_file: relativeSpec,
      report: report2
    });
    console.log(options.json ? JSON.stringify(report2, null, 2) : formatSpecReviewSummary(report2));
    process.exitCode = 0;
  });
  command.command("check").description("Check project tests for obligation coverage").option("--project-root <path>", "Project root", process.cwd()).option("--spec <path>", "Spec file \u2014 used to auto-derive index and report paths").option("--index-path <path>", "Explicit index path (overrides --spec derivation)").option("--gate", "Apply compliance gate thresholds and exit non-zero if not met").option("--min-ratio <n>", "Minimum compliance ratio required (with --gate)", "0.9").option(
    "--max-uncovered-critical <n>",
    "Maximum uncovered acceptance/edge-case obligations (with --gate)",
    "0"
  ).action(
    async (options) => {
      const indexPath = resolveIndexPath(options.indexPath, options.spec);
      const relativeSpec = resolveRelativeSpec(options.projectRoot, options.spec);
      const reportPath = relativeSpec ? specReportPath(relativeSpec) : void 0;
      const review = relativeSpec === void 0 ? null : await loadSpecReviewReport({
        project_root: options.projectRoot,
        spec_file: relativeSpec
      });
      const index = await loadObligationIndex({
        project_root: options.projectRoot,
        index_path: indexPath
      });
      const doctor = doctorObligationIndex(index);
      if (!doctor.ok || !index) {
        console.log(JSON.stringify(doctor, null, 2));
        process.exitCode = 1;
        return;
      }
      const report2 = await checkSpecCompliance({
        project_root: options.projectRoot,
        index,
        report_path: reportPath,
        spec_review: review
      });
      if (options.gate) {
        const minRatio = parseFloat(options.minRatio);
        const maxUncoveredCritical = parseInt(options.maxUncoveredCritical, 10);
        const criticalCategories = /* @__PURE__ */ new Set(["acceptance", "edge-case"]);
        const uncoveredCriticalCount = report2.obligations.filter(
          (obligation) => obligation.state === "uncovered" && criticalCategories.has(obligation.category)
        ).length;
        const failed = report2.summary.compliance_ratio < minRatio || uncoveredCriticalCount > maxUncoveredCritical;
        console.log(
          JSON.stringify(
            {
              gate_result: failed ? "fail" : "pass",
              compliance_ratio: report2.summary.compliance_ratio,
              uncovered_count: report2.summary.uncovered,
              uncovered_critical_count: uncoveredCriticalCount,
              uncovered_ids: report2.uncovered_obligations,
              min_ratio_threshold: minRatio,
              max_uncovered_critical_threshold: maxUncoveredCritical,
              spec_defect_count: report2.spec_review?.defect_count ?? 0,
              spec_defect_warning: report2.spec_review?.warning ?? null
            },
            null,
            2
          )
        );
        process.exitCode = failed ? 1 : 0;
        return;
      }
      console.log(JSON.stringify(report2, null, 2));
      process.exitCode = report2.summary.uncovered > 0 ? 1 : 0;
    }
  );
  command.command("skeleton").description(
    "Generate failing test skeletons for uncovered and partial obligations (Vitest). Runs a compliance check first and skips already-covered obligations unless --all is set."
  ).option("--project-root <path>", "Project root", process.cwd()).option("--spec <path>", "Spec file \u2014 used to auto-derive index path").option("--index-path <path>", "Explicit index path (overrides --spec derivation)").option("--out <path>", "Output directory", "tests/compliance-skeletons").option("--all", "Generate stubs for all obligations, not just uncovered and partial").action(
    async (options) => {
      const indexPath = resolveIndexPath(options.indexPath, options.spec);
      const relativeSpec = resolveRelativeSpec(options.projectRoot, options.spec);
      const index = await loadObligationIndex({
        project_root: options.projectRoot,
        index_path: indexPath
      });
      const doctor = doctorObligationIndex(index);
      if (!doctor.ok || !index) {
        console.log(JSON.stringify(doctor, null, 2));
        process.exitCode = 1;
        return;
      }
      const review = relativeSpec === void 0 ? null : await loadSpecReviewReport({
        project_root: options.projectRoot,
        spec_file: relativeSpec
      });
      let obligations = index.obligations;
      if (!options.all) {
        const report2 = await checkSpecCompliance({
          project_root: options.projectRoot,
          index,
          spec_review: review
        });
        const skeletonStates = /* @__PURE__ */ new Set(["uncovered", "partial"]);
        const activeIds = new Set(
          report2.obligations.filter((obligation) => skeletonStates.has(obligation.state)).map((obligation) => obligation.obligation_id)
        );
        obligations = index.obligations.filter(
          (obligation) => activeIds.has(obligation.obligation_id)
        );
      }
      const written = await generateVitestSkeletons({
        project_root: options.projectRoot,
        obligations,
        output_dir: options.out
      });
      console.log(JSON.stringify({ written }, null, 2));
      process.exitCode = 0;
    }
  );
  command.command("report").description("Print a human-readable compliance report").option("--project-root <path>", "Project root", process.cwd()).option("--spec <path>", "Spec file \u2014 used to auto-derive index path").option("--index-path <path>", "Explicit index path (overrides --spec derivation)").action(async (options) => {
    const indexPath = resolveIndexPath(options.indexPath, options.spec);
    const relativeSpec = resolveRelativeSpec(options.projectRoot, options.spec);
    const index = await loadObligationIndex({
      project_root: options.projectRoot,
      index_path: indexPath
    });
    const doctor = doctorObligationIndex(index);
    if (!doctor.ok || !index) {
      console.log(JSON.stringify(doctor, null, 2));
      process.exitCode = 1;
      return;
    }
    const review = relativeSpec === void 0 ? null : await loadSpecReviewReport({
      project_root: options.projectRoot,
      spec_file: relativeSpec
    });
    const report2 = await checkSpecCompliance({
      project_root: options.projectRoot,
      index,
      spec_review: review
    });
    const lines = [];
    lines.push(`Compliance Report \u2014 ${report2.metadata.spec_file}`);
    lines.push(`Generated: ${report2.metadata.generated_at}`);
    lines.push("");
    lines.push("Summary");
    lines.push(`  Total obligations:   ${report2.summary.total}`);
    lines.push(`  Covered:             ${report2.summary.covered}`);
    lines.push(`  Partial:             ${report2.summary.partial}`);
    lines.push(`  Uncovered:           ${report2.summary.uncovered}`);
    lines.push(`  Indeterminate:       ${report2.summary.indeterminate}`);
    lines.push(`  Compliance ratio:    ${(report2.summary.compliance_ratio * 100).toFixed(1)}%`);
    if (report2.spec_review) {
      lines.push(`  Spec defects:        ${report2.spec_review.defect_count}`);
      if (report2.spec_review.warning) {
        lines.push(`  Warning:             ${report2.spec_review.warning}`);
      }
    }
    const uncovered = report2.obligations.filter((obligation) => obligation.state === "uncovered");
    if (uncovered.length > 0) {
      lines.push("");
      lines.push("Uncovered obligations:");
      for (const obligation of uncovered) {
        lines.push(`  [${obligation.obligation_id}] ${obligation.description}`);
        if (obligation.pass_criteria)
          lines.push(`    Pass criteria: ${obligation.pass_criteria}`);
      }
    }
    const partial = report2.obligations.filter((obligation) => obligation.state === "partial");
    if (partial.length > 0) {
      lines.push("");
      lines.push("Partial obligations:");
      for (const obligation of partial) {
        lines.push(`  [${obligation.obligation_id}] ${obligation.description}`);
      }
    }
    console.log(lines.join("\n"));
    process.exitCode = report2.summary.uncovered > 0 ? 1 : 0;
  });
  command.command("doctor").description("Validate obligation index health").option("--project-root <path>", "Project root", process.cwd()).option("--spec <path>", "Spec file \u2014 used to auto-derive index path").option("--index-path <path>", "Explicit index path (overrides --spec derivation)").action(async (options) => {
    const indexPath = resolveIndexPath(options.indexPath, options.spec);
    const relativeSpec = resolveRelativeSpec(options.projectRoot, options.spec);
    const index = await loadObligationIndex({
      project_root: options.projectRoot,
      index_path: indexPath
    });
    const obligationDoctor = doctorObligationIndex(index);
    const review = relativeSpec === void 0 ? null : await loadSpecReviewReport({
      project_root: options.projectRoot,
      spec_file: relativeSpec
    });
    const reviewDoctor = doctorSpecReview(review, {
      spec_is_newer: await isSpecReviewStale(
        options.projectRoot,
        relativeSpec,
        review?.metadata.reviewed_at
      )
    });
    const boundaryReport = await loadBoundaryReport(options.projectRoot);
    const boundaryIssues = doctorBoundaryReport(boundaryReport);
    const result = {
      ok: obligationDoctor.ok && reviewDoctor.ok && boundaryIssues.ok,
      issues: [...obligationDoctor.issues, ...reviewDoctor.issues, ...boundaryIssues.issues]
    };
    console.log(JSON.stringify(result, null, 2));
    process.exitCode = result.ok ? 0 : 1;
  });
  command.command("boundary").description("Detect shared-type boundaries across specs and report unhandled variants").option("--project-root <path>", "Project root", process.cwd()).option("--generate", "Generate test stubs for unhandled variants").option("--json", "Print JSON instead of human-readable output").action(async (options) => {
    const results = await scanBoundaries({ project_root: options.projectRoot });
    const report2 = buildBoundaryReport(results);
    await saveBoundaryReport(report2, options.projectRoot);
    if (options.generate) {
      for (const result of results) {
        const allUnhandled = [...result.unhandled_by_consumer.values()].flat();
        await generateBoundaryTests({
          project_root: options.projectRoot,
          boundary: result.boundary,
          unhandled: allUnhandled
        });
      }
    }
    if (options.json) {
      console.log(JSON.stringify(report2, null, 2));
    } else {
      console.log(formatBoundaryReport(report2));
    }
    process.exitCode = 0;
  });
  command.command("patterns").description("List, prune, or export defect patterns from the pattern store").option("--project-root <path>", "Project root", process.cwd()).option("--prune [days]", "Remove patterns older than N days (default 365)").option("--export <path>", "Export patterns to a file").option("--format <fmt>", "Export format: json | markdown (default json)", "json").option("--min-frequency <n>", "Minimum frequency to include (default 1)", "1").action(
    async (options) => {
      const storeRoot = resolvePatternStoreRoot(options.projectRoot);
      if (options.prune !== void 0) {
        const days = typeof options.prune === "string" ? parseInt(options.prune, 10) : 365;
        const removed = await prunePatterns(days, storeRoot);
        console.log(JSON.stringify({ pruned: removed }, null, 2));
        process.exitCode = 0;
        return;
      }
      const patterns = await queryPatterns(
        {
          min_frequency: parseInt(options.minFrequency, 10),
          max_age_days: 36500
        },
        storeRoot
      );
      if (options.export) {
        const content = options.format === "markdown" ? formatPatternsAsMarkdown(patterns) : JSON.stringify(patterns, null, 2);
        const { writeFile: wf } = await import("fs/promises");
        await wf(options.export, content + "\n", "utf8");
        console.log(
          JSON.stringify({ exported: options.export, count: patterns.length }, null, 2)
        );
      } else {
        console.log(JSON.stringify(patterns, null, 2));
      }
      process.exitCode = 0;
    }
  );
  return command;
}
function formatBoundaryReport(report2) {
  const lines = [
    `Boundary Report`,
    `Generated: ${report2.metadata.generated_at}`,
    "",
    `Total interfaces:  ${report2.total_interfaces}`,
    `Total states:      ${report2.total_states}`,
    `Handled:           ${report2.handled_count}`,
    `Unhandled:         ${report2.unhandled_count}`,
    `Gate result:       ${report2.gate_result.toUpperCase()}`
  ];
  for (const iface of report2.interfaces) {
    if (iface.unhandled_variants.length > 0) {
      lines.push("");
      lines.push(`  ${iface.type_name} (${iface.file})`);
      for (const v of iface.unhandled_variants) {
        lines.push(
          `    [unhandled] state "${v.state}" not referenced by consumer ${v.consumer_spec}`
        );
      }
    }
  }
  return lines.join("\n");
}
function formatPatternsAsMarkdown(patterns) {
  if (patterns.length === 0) return "# Defect Patterns\n\nNo patterns recorded.\n";
  const lines = ["# Defect Patterns", ""];
  for (const p of patterns) {
    lines.push(`## ${p.subcategory}`);
    lines.push(`**Frequency:** ${p.frequency}  **Last seen:** ${p.last_seen}`);
    lines.push("");
    lines.push(p.description);
    lines.push("");
  }
  return lines.join("\n");
}
async function isSpecReviewStale(projectRoot, spec, reviewedAt) {
  if (!spec || !reviewedAt) return false;
  try {
    const specPath = path.resolve(projectRoot, spec);
    const stats = await stat(specPath);
    return stats.mtimeMs > new Date(reviewedAt).getTime();
  } catch {
    return false;
  }
}
function resolvePatternStoreRoot(projectRoot) {
  return path.resolve(projectRoot, ".paqad", "defect-patterns");
}
function resolveRelativeSpec(projectRoot, spec) {
  if (!spec) return void 0;
  const specPath = path.resolve(projectRoot, spec);
  return path.relative(projectRoot, specPath);
}

// src/cli/commands/duplication.ts
init_esm_shims();
function createDuplicationCommand() {
  const command = new Command("duplication").description(
    "Flag new code that near-copies existing helpers (new-code-only, deterministic)"
  );
  command.command("scan").description("Scan the changed files for near-duplication of existing code and record a report").option("--project-root <path>", "Project root", process.cwd()).option("--json", "Emit the machine-readable report instead of the human summary", false).option("--no-corroborate", "Skip the optional jscpd corroboration pass").action(async (options) => {
    const changedFiles = (await loadChangeEvidence(options.projectRoot)).files;
    const report2 = await runDuplicationScan({
      projectRoot: options.projectRoot,
      changedFiles,
      corroborate: options.corroborate
    });
    if (options.json) {
      console.log(JSON.stringify(report2, null, 2));
    } else {
      printSummary(report2.findings, report2.blocking);
    }
    if (report2.blocking) {
      process.exitCode = 1;
    }
  });
  return command;
}
function printSummary(findings, blocking) {
  if (findings.length === 0) {
    console.log("**\u25B8 paqad** \xB7 duplication: \u{1F7E2} no new near-copies of existing code");
    return;
  }
  const verb = blocking ? "Needs your attention" : "Heads up";
  const glyph = blocking ? "\u{1F534}" : "\u{1F7E1}";
  console.log(`**\u25B8 paqad** \xB7 ${verb}`);
  console.log(
    blocking ? "> I caught new code that near-copies existing helpers before it could ship:" : "> New code near-copies existing helpers (not blocking):"
  );
  for (const finding of findings.slice(0, 20)) {
    console.log(`> - ${glyph} ${finding.message}`);
  }
  if (findings.length > 20) {
    console.log(`> - \u2026and ${findings.length - 20} more`);
  }
}

// src/cli/commands/dashboard.ts
init_esm_shims();
import { existsSync as existsSync34 } from "fs";
import { isAbsolute as isAbsolute4, join as join40, resolve as resolve7 } from "path";

// src/dashboard/server.ts
init_esm_shims();
import { createReadStream, existsSync as existsSync32, statSync as statSync4 } from "fs";
import { createServer } from "http";
import { extname as extname3, join as join39, normalize, resolve as resolve6 } from "path";
import { createGzip, gzipSync as gzipSync2 } from "zlib";

// src/graph/routes.ts
init_esm_shims();
import { gzipSync } from "zlib";

// src/graph/detail.ts
init_esm_shims();
var CHUNK_PREVIEW_CLIP = 500;
function buildNeighbourIndex(graph) {
  const parent = /* @__PURE__ */ new Map();
  const children = /* @__PURE__ */ new Map();
  const edgesByNode = /* @__PURE__ */ new Map();
  const nodeById = /* @__PURE__ */ new Map();
  for (const n of graph.nodes) {
    nodeById.set(n.id, n);
    parent.set(n.id, n.parent_id);
    if (n.parent_id) {
      const arr = children.get(n.parent_id) ?? [];
      arr.push(n.id);
      children.set(n.parent_id, arr);
    }
  }
  for (const e of graph.edges) {
    const sourceList = edgesByNode.get(e.source) ?? [];
    sourceList.push({ other: e.target, type: e.type, isOut: true });
    edgesByNode.set(e.source, sourceList);
    const targetList = edgesByNode.get(e.target) ?? [];
    targetList.push({ other: e.source, type: e.type, isOut: false });
    edgesByNode.set(e.target, targetList);
  }
  return { parent, children, edgesByNode, nodeById };
}
function buildNodeDetail(graph, nodeId, options) {
  const index = options?.index ?? buildNeighbourIndex(graph);
  const node = index.nodeById.get(nodeId);
  if (!node) return null;
  const parentNode = node.parent_id ? index.nodeById.get(node.parent_id) ?? null : null;
  const childIds = index.children.get(nodeId) ?? [];
  const children = childIds.map((id) => index.nodeById.get(id)).filter((n) => Boolean(n));
  const edges = index.edgesByNode.get(nodeId) ?? [];
  const neighbourIdSet = /* @__PURE__ */ new Set();
  for (const e of edges) neighbourIdSet.add(e.other);
  const neighbours = Array.from(neighbourIdSet).map((id) => index.nodeById.get(id)).filter((n) => Boolean(n));
  const detail = {
    node,
    parent: parentNode,
    children,
    neighbours
  };
  if (node.type === "file") {
    const out = [];
    const inc = [];
    for (const e of edges) {
      if (e.type !== "imports") continue;
      const other = index.nodeById.get(e.other);
      if (!other) continue;
      const record = { file_id: other.id, module_id: other.parent_id };
      if (e.isOut) out.push(record);
      else inc.push(record);
    }
    detail.imports_out = out;
    detail.imports_in = inc;
  }
  if (node.type === "chunk") {
    const record = options?.chunkContents?.get(nodeId);
    if (record) {
      const truncated = record.content.length > CHUNK_PREVIEW_CLIP;
      detail.chunk_content_preview = truncated ? record.content.slice(0, CHUNK_PREVIEW_CLIP) : record.content;
      detail.chunk_truncated = truncated;
    } else {
      detail.chunk_content_preview = "";
      detail.chunk_truncated = false;
    }
  }
  if (node.type === "module") {
    detail.health_history = [];
    detail.defect_samples = [];
    detail.complexity_correction_history = [];
  }
  return detail;
}

// src/graph/extractor.ts
init_esm_shims();
import { existsSync as existsSync3 } from "fs";
import { readFile as readFile3, readdir, stat as stat2 } from "fs/promises";
import { extname as extname2, join as join3, relative, sep } from "path";
var KNOWN_TIERS = /* @__PURE__ */ new Set(["green", "amber", "red", "unknown"]);
function normaliseTier(value) {
  return typeof value === "string" && KNOWN_TIERS.has(value) ? value : "unknown";
}
function languageFromExtension(filePath) {
  const ext = extname2(filePath).toLowerCase();
  if (!ext) return null;
  const map = {
    ".ts": "typescript",
    ".tsx": "typescript",
    ".js": "javascript",
    ".jsx": "javascript",
    ".mjs": "javascript",
    ".cjs": "javascript",
    ".py": "python",
    ".rb": "ruby",
    ".go": "go",
    ".rs": "rust",
    ".java": "java",
    ".kt": "kotlin",
    ".swift": "swift",
    ".cs": "csharp",
    ".cpp": "cpp",
    ".c": "c",
    ".h": "c",
    ".json": "json",
    ".yaml": "yaml",
    ".yml": "yaml",
    ".md": "markdown",
    ".html": "html",
    ".css": "css",
    ".sh": "shell"
  };
  return map[ext] ?? null;
}
function toProjectRelative(projectRoot, absolutePath) {
  const rel = relative(projectRoot, absolutePath);
  return rel === "" ? "." : rel.split(sep).join("/");
}
function moduleNameForFile(relativePath, knownModules) {
  const parts = relativePath.split("/");
  if (parts.length < 2) return null;
  if (parts[0] !== "src") return null;
  const candidate = parts[1];
  return knownModules.has(candidate) ? candidate : null;
}
async function readJson(path2) {
  try {
    const raw = await readFile3(path2, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
async function loadModuleHealth(projectRoot) {
  const dir = join3(projectRoot, PATHS.PLANNING_MODULE_HEALTH_DIR);
  if (!existsSync3(dir)) {
    return { entries: [], available: false };
  }
  let files;
  try {
    files = (await readdir(dir)).filter((f) => f.endsWith(".json"));
  } catch {
    return { entries: [], available: false };
  }
  const entries = [];
  for (const f of files) {
    const data = await readJson(join3(dir, f));
    if (data && typeof data.module === "string") {
      entries.push(data);
    }
  }
  return { entries, available: files.length > 0 };
}
async function loadDefectCounts(projectRoot) {
  const dir = join3(projectRoot, ".paqad/defect-patterns/entries");
  const counts = /* @__PURE__ */ new Map();
  if (!existsSync3(dir)) {
    return { counts, available: false };
  }
  let files;
  try {
    files = (await readdir(dir)).filter((f) => f.endsWith(".json"));
  } catch {
    return { counts, available: false };
  }
  for (const f of files) {
    const data = await readJson(join3(dir, f));
    if (!data) continue;
    const mods = /* @__PURE__ */ new Set();
    if (data.module) mods.add(data.module);
    for (const m of data.modules ?? []) mods.add(m);
    for (const m of data.affected_modules ?? []) mods.add(m);
    for (const m of mods) counts.set(m, (counts.get(m) ?? 0) + 1);
  }
  return { counts, available: true };
}
async function extractGraphWithSidecar(options) {
  const projectRoot = options.projectRoot;
  const degradedReasons = [];
  const manifestPath = join3(projectRoot, PATHS.ONBOARDING_MANIFEST);
  const manifest = await readJson(manifestPath);
  if (!manifest) {
    throw new Error(
      `Missing or unreadable onboarding manifest at ${manifestPath}. Run \`paqad-ai onboard\` first.`
    );
  }
  if (manifest.framework_version && manifest.framework_version !== VERSION) {
    const manifestMajor = majorVersion(manifest.framework_version);
    const runtimeMajor = majorVersion(VERSION);
    if (manifestMajor !== runtimeMajor) {
      degradedReasons.push(
        `paqad-ai version mismatch: artefacts were written by ${manifest.framework_version}, runtime is ${VERSION}. Re-run \`paqad-ai onboard\` to refresh.`
      );
    }
  }
  const chunkIndexPath = join3(projectRoot, PATHS.CHUNK_INDEX);
  const chunkIndex = await readJson(chunkIndexPath);
  if (!chunkIndex) {
    degradedReasons.push("chunk-index missing \u2014 file and chunk nodes unavailable");
  }
  const { entries: healthEntries, available: healthAvailable } = await loadModuleHealth(projectRoot);
  if (!healthAvailable) {
    degradedReasons.push("module health ledger missing \u2014 health overlay disabled");
  }
  const { counts: defectCounts, available: defectsAvailable } = await loadDefectCounts(projectRoot);
  if (!defectsAvailable) {
    degradedReasons.push("defect pattern store missing \u2014 defect overlay disabled");
  }
  const vectorMetaPath = join3(projectRoot, PATHS.VECTOR_META);
  const vectorMetaPresent = existsSync3(vectorMetaPath);
  if (!vectorMetaPresent) {
    degradedReasons.push("vector store missing \u2014 similarity edges disabled");
  }
  const nodes = [];
  const edges = [];
  const moduleIds = /* @__PURE__ */ new Set();
  const moduleNames = new Set(healthEntries.map((e) => e.module));
  for (const entry of healthEntries) {
    const id = `module:${entry.module}`;
    moduleIds.add(id);
    nodes.push({
      id,
      type: "module",
      label: entry.module,
      parent_id: null,
      attributes: {
        health_tier: normaliseTier(entry.tier),
        defect_count: defectCounts.get(entry.module) ?? (defectsAvailable ? 0 : null),
        risk_floor: entry.risk_floor ?? null,
        complexity_correction: entry.complexity_correction ?? null
      }
    });
  }
  const fileIds = /* @__PURE__ */ new Map();
  const chunkContents = /* @__PURE__ */ new Map();
  const vectorIdToNodeId = /* @__PURE__ */ new Map();
  let chunkCounter = 0;
  let symbolCount = 0;
  if (chunkIndex) {
    for (const fileEntry of chunkIndex.entries) {
      const relPath = toProjectRelative(projectRoot, fileEntry.source_file);
      const fileId = `file:${relPath}`;
      const moduleName = moduleNameForFile(relPath, moduleNames);
      const moduleId = moduleName ? `module:${moduleName}` : null;
      const exportedCount = countExportedSymbols(fileEntry);
      let sizeBytes;
      try {
        const s = await stat2(fileEntry.source_file);
        sizeBytes = s.size;
      } catch {
        sizeBytes = null;
      }
      nodes.push({
        id: fileId,
        type: "file",
        label: relPath,
        parent_id: moduleId,
        attributes: {
          language: languageFromExtension(relPath),
          symbol_count: exportedCount,
          size_bytes: sizeBytes
        }
      });
      fileIds.set(relPath, fileId);
      if (moduleId) {
        edges.push({
          id: `e:contains:${moduleId}->${fileId}`,
          type: "contains",
          source: moduleId,
          target: fileId,
          weight: null,
          attributes: { depth: null }
        });
      }
      const fileSymbols = /* @__PURE__ */ new Set();
      for (let i = 0; i < fileEntry.chunks.length; i++) {
        const chunk = fileEntry.chunks[i];
        const chunkId = `chunk:${relPath}#${i}`;
        nodes.push({
          id: chunkId,
          type: "chunk",
          label: `${relPath}#${i}`,
          parent_id: fileId,
          attributes: {
            chunk_index: i,
            start_line: null,
            end_line: null,
            content_hash: chunk.content_hash,
            ast_node_type: chunk.ast_node_type
          }
        });
        edges.push({
          id: `e:contains:${fileId}->${chunkId}`,
          type: "contains",
          source: fileId,
          target: chunkId,
          weight: null,
          attributes: { depth: null }
        });
        chunkContents.set(chunkId, {
          chunkId,
          fileRelPath: relPath,
          fileId,
          chunkIndex: i,
          content: chunk.content ?? ""
        });
        if (chunk.id) vectorIdToNodeId.set(chunk.id, chunkId);
        for (const sym of chunk.exported_symbols ?? []) {
          if (!sym || fileSymbols.has(sym)) continue;
          fileSymbols.add(sym);
        }
        chunkCounter += 1;
      }
      for (const sym of fileSymbols) {
        const symbolId = `symbol:${relPath}#${sym}`;
        nodes.push({
          id: symbolId,
          type: "symbol",
          label: sym,
          parent_id: fileId,
          attributes: { exported: true }
        });
        edges.push({
          id: `e:defines:${fileId}->${symbolId}`,
          type: "defines",
          source: fileId,
          target: symbolId,
          weight: null,
          attributes: { depth: null }
        });
        symbolCount += 1;
      }
    }
  }
  const sourceFiles = Array.from(fileIds.keys()).filter(
    (f) => /\.(ts|tsx|js|jsx|mjs|cjs)$/i.test(f)
  );
  let importCount = 0;
  if (sourceFiles.length > 0) {
    const importEdges = await scanImports({
      projectRoot,
      files: sourceFiles,
      aliases: { "@/": "src/" }
    });
    for (const e of importEdges) {
      const sourceId = fileIds.get(e.from);
      const targetId = fileIds.get(e.to);
      if (!sourceId || !targetId || sourceId === targetId) continue;
      edges.push({
        id: `e:imports:${sourceId}->${targetId}`,
        type: "imports",
        source: sourceId,
        target: targetId,
        weight: null,
        attributes: { depth: null }
      });
      importCount += 1;
    }
  }
  const overlays = {
    health: healthAvailable,
    defects: defectsAvailable,
    risk_floor: healthEntries.some((e) => e.risk_floor != null),
    complexity_correction: healthEntries.some((e) => e.complexity_correction != null)
  };
  const fileCount = fileIds.size;
  const graph = {
    meta: {
      project_root: projectRoot,
      extracted_at: (/* @__PURE__ */ new Date()).toISOString(),
      paqad_version: VERSION,
      counts: {
        modules: moduleIds.size,
        files: fileCount,
        chunks: chunkCounter,
        symbols: symbolCount,
        imports: importCount
      },
      similarity_edges_available: vectorMetaPresent,
      overlays_available: overlays,
      degraded_reasons: degradedReasons
    },
    nodes,
    edges
  };
  return { graph, chunkContents, vectorIdToNodeId };
}
function majorVersion(v) {
  const m = /^(\d+)/.exec(v.trim());
  return m ? m[1] : v;
}
function countExportedSymbols(entry) {
  let count = 0;
  for (const c of entry.chunks) {
    count += c.exported_symbols?.length ?? 0;
  }
  return count;
}

// src/graph/similarity.ts
init_esm_shims();
import { existsSync as existsSync4, statSync } from "fs";
import { readFile as readFile4 } from "fs/promises";
import { join as join4 } from "path";
function descendantChunks(rootId, nodes, children) {
  const out = /* @__PURE__ */ new Set();
  const stack = [rootId];
  while (stack.length > 0) {
    const id = stack.pop();
    const node = nodes.get(id);
    if (!node) continue;
    if (node.type === "chunk") {
      out.add(id);
      continue;
    }
    const kids = children.get(id);
    if (kids) for (const k of kids) stack.push(k);
  }
  return out;
}
function resolveScope(scope, nodes, children) {
  if (scope.type === "all" || !scope.id) {
    return { candidates: null, echo: { type: scope.type, id: scope.id ?? null } };
  }
  if (scope.type === "chunk") {
    return { candidates: /* @__PURE__ */ new Set([scope.id]), echo: scope };
  }
  return { candidates: descendantChunks(scope.id, nodes, children), echo: scope };
}
var SimilarityResolver = class {
  vectorPath;
  vectorItems = null;
  loadedAtMtimeMs = -1;
  nodeIdByVectorId;
  cache = /* @__PURE__ */ new Map();
  cacheSize;
  defaultMaxEdges;
  nodes;
  children;
  constructor(options) {
    this.vectorPath = join4(options.projectRoot, PATHS.VECTOR_INDEX);
    this.nodeIdByVectorId = options.vectorIdToNodeId;
    this.cacheSize = options.cacheSize ?? 16;
    this.defaultMaxEdges = options.defaultMaxEdges ?? 1e4;
    this.nodes = options.nodesById;
    this.children = options.childrenIndex;
  }
  isAvailable() {
    return existsSync4(this.vectorPath);
  }
  currentMtimeMs() {
    try {
      return statSync(this.vectorPath).mtimeMs;
    } catch {
      return null;
    }
  }
  invalidate() {
    this.cache.clear();
    this.vectorItems = null;
    this.loadedAtMtimeMs = -1;
  }
  async loadIfNeeded() {
    const mtime = this.currentMtimeMs();
    if (mtime === null) {
      this.vectorItems = [];
      this.loadedAtMtimeMs = -1;
      return;
    }
    if (this.vectorItems && mtime === this.loadedAtMtimeMs) return;
    const raw = await readFile4(this.vectorPath, "utf8");
    const parsed = JSON.parse(raw);
    this.vectorItems = parsed.items ?? [];
    this.loadedAtMtimeMs = mtime;
    this.cache.clear();
  }
  async resolve(request) {
    if (!this.isAvailable()) {
      return { threshold: request.threshold, scope: request.scope, edges: [], capped: false };
    }
    const threshold = clamp2(request.threshold, 0, 1);
    const maxEdges = request.max_edges ?? this.defaultMaxEdges;
    await this.loadIfNeeded();
    const mtime = this.loadedAtMtimeMs;
    const cacheKey = cacheKeyFor(request.scope, threshold, maxEdges, mtime);
    const cached = this.cache.get(cacheKey);
    if (cached) {
      this.cache.delete(cacheKey);
      this.cache.set(cacheKey, cached);
      return cached.response;
    }
    const { candidates } = resolveScope(request.scope, this.nodes, this.children);
    const items = this.vectorItems ?? [];
    const projected = [];
    for (const item of items) {
      const nodeId = this.nodeIdByVectorId.get(item.id);
      if (!nodeId) continue;
      projected.push({ nodeId, vec: item.vector });
    }
    const edges = [];
    const seenPairs = /* @__PURE__ */ new Set();
    let capped = false;
    if (candidates && candidates.size === 1 && request.scope.type === "chunk") {
      const anchorId = request.scope.id;
      const anchor = projected.find((p) => p.nodeId === anchorId);
      if (anchor) {
        for (const other of projected) {
          if (other.nodeId === anchor.nodeId) continue;
          const score = cosineSimilarity(anchor.vec, other.vec);
          if (score < threshold) continue;
          const pairKey = pairKeyOf(anchor.nodeId, other.nodeId);
          if (seenPairs.has(pairKey)) continue;
          seenPairs.add(pairKey);
          edges.push(makeEdge(anchor.nodeId, other.nodeId, score));
          if (edges.length >= maxEdges) {
            capped = true;
            break;
          }
        }
      }
    } else {
      const scoped = candidates ? projected.filter((p) => candidates.has(p.nodeId)) : projected;
      outer: for (let i = 0; i < scoped.length; i++) {
        const a = scoped[i];
        for (let j = i + 1; j < scoped.length; j++) {
          const b = scoped[j];
          const score = cosineSimilarity(a.vec, b.vec);
          if (score < threshold) continue;
          const pairKey = pairKeyOf(a.nodeId, b.nodeId);
          if (seenPairs.has(pairKey)) continue;
          seenPairs.add(pairKey);
          edges.push(makeEdge(a.nodeId, b.nodeId, score));
          if (edges.length >= maxEdges) {
            capped = true;
            break outer;
          }
        }
      }
    }
    const response = {
      threshold,
      scope: request.scope,
      edges,
      capped
    };
    if (this.cache.size >= this.cacheSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }
    this.cache.set(cacheKey, { response });
    return response;
  }
};
function clamp2(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}
var PAIR_SEPARATOR = String.fromCharCode(1);
function pairKeyOf(a, b) {
  return a < b ? `${a}${PAIR_SEPARATOR}${b}` : `${b}${PAIR_SEPARATOR}${a}`;
}
function makeEdge(a, b, score) {
  const [s, t] = a < b ? [a, b] : [b, a];
  return {
    id: `e:similar:${s}->${t}`,
    type: "similar",
    source: s,
    target: t,
    weight: score,
    attributes: { depth: null }
  };
}
function cacheKeyFor(scope, threshold, maxEdges, mtime) {
  return `${scope.type}|${scope.id ?? ""}|${threshold.toFixed(4)}|${maxEdges}|${mtime}`;
}

// src/graph/routes.ts
function clientAcceptsGzip(req) {
  const header = req.headers["accept-encoding"];
  if (!header) return false;
  const value = Array.isArray(header) ? header.join(",") : header;
  return value.toLowerCase().includes("gzip");
}
function writeJson(res, req, body, status = 200) {
  const json = JSON.stringify(body);
  const headers = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  };
  if (clientAcceptsGzip(req)) {
    const gz = gzipSync(json);
    headers["content-encoding"] = "gzip";
    headers["content-length"] = String(gz.byteLength);
    res.writeHead(status, headers);
    res.end(gz);
    return;
  }
  headers["content-length"] = String(Buffer.byteLength(json));
  res.writeHead(status, headers);
  res.end(json);
}
async function readJsonBody(req) {
  return new Promise((resolveBody) => {
    let raw = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1048576) {
        raw = "";
      }
    });
    req.on("end", () => {
      if (!raw) return resolveBody(null);
      try {
        resolveBody(JSON.parse(raw));
      } catch {
        resolveBody(null);
      }
    });
    req.on("error", () => resolveBody(null));
  });
}
function createGraphRoutes(projectRoot) {
  let cachedGraph = null;
  let cachedChunkContents = /* @__PURE__ */ new Map();
  let cachedIndex = null;
  let similarityResolver = null;
  async function refreshGraph() {
    const result = await extractGraphWithSidecar({ projectRoot });
    cachedGraph = result.graph;
    cachedChunkContents = result.chunkContents;
    cachedIndex = buildNeighbourIndex(result.graph);
    const nodesById = new Map(
      result.graph.nodes.map((n) => [n.id, { id: n.id, type: n.type, parent_id: n.parent_id }])
    );
    const childrenIndex = /* @__PURE__ */ new Map();
    for (const n of result.graph.nodes) {
      if (!n.parent_id) continue;
      const arr = childrenIndex.get(n.parent_id) ?? [];
      arr.push(n.id);
      childrenIndex.set(n.parent_id, arr);
    }
    similarityResolver = new SimilarityResolver({
      projectRoot,
      vectorIdToNodeId: result.vectorIdToNodeId,
      nodesById,
      childrenIndex
    });
  }
  async function getGraph() {
    if (!cachedGraph) await refreshGraph();
    return cachedGraph;
  }
  async function handle(req, res, url) {
    const pathname = url.pathname;
    if (pathname === "/api/graph" && req.method === "GET") {
      writeJson(res, req, await getGraph());
      return true;
    }
    if (pathname.startsWith("/api/node/") && req.method === "GET") {
      const nodeId = decodeURIComponent(pathname.slice("/api/node/".length));
      const graph = await getGraph();
      const detail = buildNodeDetail(graph, nodeId, {
        chunkContents: cachedChunkContents,
        index: cachedIndex ?? void 0
      });
      if (!detail) {
        writeJson(res, req, { error: `Unknown node: ${nodeId}` }, 404);
        return true;
      }
      writeJson(res, req, detail);
      return true;
    }
    if (pathname.startsWith("/api/chunk/") && pathname.endsWith("/content") && req.method === "GET") {
      const inner = pathname.slice("/api/chunk/".length, -"/content".length);
      const chunkId = decodeURIComponent(inner);
      await getGraph();
      const record = cachedChunkContents.get(chunkId);
      if (!record) {
        writeJson(res, req, { error: `Unknown chunk: ${chunkId}` }, 404);
        return true;
      }
      writeJson(res, req, {
        chunk_id: record.chunkId,
        file: record.fileRelPath,
        chunk_index: record.chunkIndex,
        content: record.content
      });
      return true;
    }
    if (pathname === "/api/similar" && req.method === "POST") {
      const body = await readJsonBody(req);
      const request = body;
      if (!request || typeof request.threshold !== "number" || !request.scope || typeof request.scope.type !== "string") {
        writeJson(res, req, { error: "Invalid similarity request body" }, 400);
        return true;
      }
      await getGraph();
      if (!similarityResolver) {
        writeJson(res, req, { error: "Similarity resolver not initialised" }, 500);
        return true;
      }
      const response = await similarityResolver.resolve({
        threshold: request.threshold,
        scope: request.scope,
        max_edges: request.max_edges
      });
      writeJson(res, req, response);
      return true;
    }
    return false;
  }
  return {
    handle,
    invalidate() {
      cachedGraph = null;
      cachedChunkContents = /* @__PURE__ */ new Map();
      cachedIndex = null;
      similarityResolver = null;
    }
  };
}

// src/graph/watcher.ts
init_esm_shims();
import { existsSync as existsSync5, watch } from "fs";
import { join as join5 } from "path";
var IGNORED_APPEND_ONLY = ["audit.log", "logs"];
function isAppendOnlyLog(filename) {
  if (!filename) return false;
  const posix = String(filename).replace(/\\/g, "/");
  return IGNORED_APPEND_ONLY.some((entry) => posix === entry || posix.startsWith(`${entry}/`));
}
function startPaqadWatcher(options) {
  const debounceMs = options.debounceMs ?? 500;
  const watchPath = join5(options.projectRoot, PATHS.AGENCY_DIR);
  if (!existsSync5(watchPath)) {
    return { close: () => void 0 };
  }
  let timer = null;
  let closed = false;
  const fire = () => {
    if (closed) return;
    void Promise.resolve(options.onChange()).catch(() => {
    });
  };
  const onAny = () => {
    if (closed) return;
    if (timer) clearTimeout(timer);
    timer = setTimeout(fire, debounceMs);
  };
  let watcher = null;
  try {
    watcher = watch(watchPath, { recursive: true }, (_event, filename) => {
      if (isAppendOnlyLog(filename)) return;
      onAny();
    });
    watcher.on("error", () => {
    });
  } catch {
    return { close: () => void 0 };
  }
  return {
    close: () => {
      closed = true;
      if (timer) clearTimeout(timer);
      watcher?.close();
    }
  };
}

// src/site-map/journey-curation.ts
init_esm_shims();
function confirmJourney(journey) {
  if (journey.status !== "proposed") {
    return {
      ok: false,
      reason: `journey "${journey.id}" is ${journey.status}, not proposed \u2014 only a proposed journey can be confirmed`
    };
  }
  return {
    ok: true,
    journey: { ...journey, status: "confirmed", derivation: "human" },
    removed: false
  };
}
function rejectJourney(journey) {
  if (journey.status !== "proposed") {
    return {
      ok: false,
      reason: `journey "${journey.id}" is ${journey.status}, not proposed \u2014 a confirmed or locked journey is not rejectable`
    };
  }
  return { ok: true, journey: null, removed: true };
}
function curateJourney(journey, action) {
  return action === "confirm" ? confirmJourney(journey) : rejectJourney(journey);
}
function runJourneyCuration(options) {
  const { projectRoot, id, action } = options;
  const journey = readJourney(projectRoot, id);
  if (!journey) {
    return {
      ok: false,
      reason: `no journey "${id}" found under docs/site-map/journeys/`
    };
  }
  const result = curateJourney(journey, action);
  if (!result.ok) {
    return { ok: false, reason: result.reason };
  }
  const status = result.removed ? "removed" : "confirmed";
  if (result.removed) {
    removeJourney(projectRoot, id);
  } else {
    writeJourney(projectRoot, result.journey);
  }
  recordJourneyCuration(
    projectRoot,
    { journey_id: id, action, status },
    { sessionId: options.sessionId, now: options.now }
  );
  return { ok: true, id, action, status };
}

// src/site-map/dashboard-view.ts
init_esm_shims();

// src/site-map/prerequisites.ts
init_esm_shims();

// src/dashboard/collectors/module-docs.ts
init_esm_shims();
var import_yaml = __toESM(require_dist(), 1);
import { existsSync as existsSync6, readFileSync as readFileSync3 } from "fs";
import { join as join7 } from "path";

// src/dashboard/scoring/index.ts
init_esm_shims();

// src/dashboard/scoring/freshness.ts
init_esm_shims();
var DEFAULT_FRESH_WINDOW_DAYS = 30;
var DEFAULT_STALE_CLIFF_DAYS = 180;
var MS_PER_DAY = 864e5;
function scoreFreshness(mtimeMs, options = {}) {
  if (mtimeMs === null || mtimeMs === void 0 || !Number.isFinite(mtimeMs)) {
    return 0;
  }
  const freshWindowDays = options.freshWindowDays ?? DEFAULT_FRESH_WINDOW_DAYS;
  const staleCliffDays = options.staleCliffDays ?? DEFAULT_STALE_CLIFF_DAYS;
  const now = options.now ?? Date.now();
  const ageDays = Math.max(0, (now - mtimeMs) / MS_PER_DAY);
  if (ageDays <= freshWindowDays) return 100;
  if (ageDays >= staleCliffDays) return 0;
  const range = staleCliffDays - freshWindowDays;
  const remaining = staleCliffDays - ageDays;
  return Math.max(0, Math.min(100, Math.round(remaining / range * 100)));
}
function scoreFreshnessAverage(mtimes, options = {}) {
  if (mtimes.length === 0) return 0;
  const total = mtimes.reduce((sum2, m) => sum2 + scoreFreshness(m, options), 0);
  return Math.round(total / mtimes.length);
}
function ageInDays(mtimeMs, now = Date.now()) {
  if (mtimeMs === null || mtimeMs === void 0 || !Number.isFinite(mtimeMs)) return null;
  return Math.max(0, Math.floor((now - mtimeMs) / MS_PER_DAY));
}

// src/dashboard/scoring/presence.ts
init_esm_shims();
function scorePresence(counts, options = {}) {
  const presenceWeight = options.presenceWeight ?? 0.7;
  const freshnessWeight = options.freshnessWeight ?? 0.3;
  const { expected, present, stale } = counts;
  if (expected <= 0) return 0;
  const presenceRatio = Math.min(1, Math.max(0, present / expected));
  if (stale === void 0) {
    return Math.round(presenceRatio * 100);
  }
  const freshPresent = Math.max(0, present - Math.max(0, stale));
  const freshnessRatio = present > 0 ? freshPresent / present : 0;
  const total = presenceRatio * presenceWeight + freshnessRatio * freshnessWeight;
  const normalised = total / (presenceWeight + freshnessWeight);
  return Math.round(Math.max(0, Math.min(1, normalised)) * 100);
}

// src/dashboard/scoring/band.ts
init_esm_shims();
var SCORE_BAND_THRESHOLDS = {
  green: 80,
  amber: 50
};
function bandForScore(score) {
  if (score === null || !Number.isFinite(score)) return "unknown";
  if (score >= SCORE_BAND_THRESHOLDS.green) return "green";
  if (score >= SCORE_BAND_THRESHOLDS.amber) return "amber";
  return "red";
}

// src/dashboard/collectors/fs-helpers.ts
init_esm_shims();
import { readdirSync, statSync as statSync2 } from "fs";
import { join as join6 } from "path";
function scanDirectory(root, options = {}) {
  const out = [];
  const maxDepth = options.maxDepth ?? Infinity;
  const fileFilter = options.fileFilter ?? (() => true);
  const walk = (dir, depth, rel) => {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const entryRel = rel === "" ? entry.name : `${rel}/${entry.name}`;
      const entryAbs = join6(dir, entry.name);
      if (entry.isDirectory()) {
        if (depth < maxDepth) walk(entryAbs, depth + 1, entryRel);
        continue;
      }
      if (!entry.isFile()) continue;
      if (!fileFilter(entry.name)) continue;
      try {
        const st = statSync2(entryAbs);
        out.push({
          relPath: entryRel,
          absPath: entryAbs,
          mtimeMs: st.mtimeMs,
          sizeBytes: st.size
        });
      } catch {
      }
    }
  };
  walk(root, 0, "");
  return out;
}
function fileMtime(path2) {
  try {
    return statSync2(path2).mtimeMs;
  } catch {
    return null;
  }
}

// src/dashboard/collectors/module-docs.ts
var HELPER = {
  what: "docs/modules/<slug>/index/summary.md is the canonical per-module documentation generated by `create module documentation` (Stage 2 of the docs workflow).",
  goodLooksLike: "Every module in module-map.yml has an index/summary.md, all fresh within the last 30 days."
};
function readModuleSlugs(projectRoot) {
  const path2 = join7(projectRoot, PATHS.MODULE_MAP);
  if (!existsSync6(path2)) return [];
  try {
    const map = import_yaml.default.parse(readFileSync3(path2, "utf8"));
    const modules = Array.isArray(map?.modules) ? map.modules : [];
    return modules.map((m) => typeof m.slug === "string" ? m.slug : null).filter((s) => s !== null);
  } catch {
    return [];
  }
}
function collectModuleDocs(projectRoot, now = Date.now()) {
  const slugs = readModuleSlugs(projectRoot);
  if (slugs.length === 0) {
    return {
      id: "module-docs",
      title: "Module docs",
      band: "unknown",
      score: null,
      summary: "No module-map.yml \u2014 run `create documentation`.",
      metrics: [],
      helper: HELPER
    };
  }
  let present = 0;
  let staleCount = 0;
  let oldestAgeDays = null;
  for (const slug of slugs) {
    const summaryPath = join7(projectRoot, PATHS.MODULES_DIR, slug, "index", "summary.md");
    const mtime = fileMtime(summaryPath);
    if (mtime === null) continue;
    present += 1;
    const freshness = scoreFreshness(mtime, { now });
    if (freshness < 100) staleCount += 1;
    const age = ageInDays(mtime, now);
    if (age !== null && (oldestAgeDays === null || age > oldestAgeDays)) {
      oldestAgeDays = age;
    }
  }
  const presenceRatio = present / slugs.length;
  const freshRatio = present > 0 ? (present - staleCount) / present : 0;
  const score = Math.round(presenceRatio * 60 + freshRatio * 40);
  const missing = slugs.length - present;
  const summary = missing === 0 ? `${slugs.length} module(s) \xB7 ${staleCount} stale` : `${missing} of ${slugs.length} module(s) missing docs`;
  return {
    id: "module-docs",
    title: "Module docs",
    band: bandForScore(score),
    score,
    summary,
    metrics: [
      { label: "modules", value: `${present}/${slugs.length}` },
      { label: "stale", value: String(staleCount) },
      { label: "oldest", value: oldestAgeDays !== null ? `${oldestAgeDays}d` : "\u2014" }
    ],
    helper: HELPER,
    details: {
      moduleCount: slugs.length,
      present,
      missing: slugs.filter(
        (s) => !existsSync6(join7(projectRoot, PATHS.MODULES_DIR, s, "index", "summary.md"))
      )
    }
  };
}

// src/site-map/prerequisites.ts
var FOUNDATION_MISSING = {
  workflow: "create documentation",
  reason: "The map uses the business terms and module structure from your project's documentation, so it needs the documentation foundation first."
};
var MODULE_DOCS_MISSING = {
  workflow: "create module documentation",
  reason: "The map groups screens by module and labels them from the module docs, so it needs your modules documented first."
};
function detectSiteMapPrerequisites(projectRoot) {
  const map = readRawModuleMap(projectRoot);
  if (map === null) {
    return {
      satisfied: false,
      missing: [FOUNDATION_MISSING],
      status: { foundation_present: false, module_count: 0, documented_module_count: 0 }
    };
  }
  const moduleCount = map.modules.length;
  const documentedModuleCount = countDocumentedModules(projectRoot);
  if (moduleCount > 0 && documentedModuleCount === 0) {
    return {
      satisfied: false,
      missing: [MODULE_DOCS_MISSING],
      status: { foundation_present: true, module_count: moduleCount, documented_module_count: 0 }
    };
  }
  return {
    satisfied: true,
    missing: [],
    status: {
      foundation_present: true,
      module_count: moduleCount,
      documented_module_count: documentedModuleCount
    }
  };
}
function countDocumentedModules(projectRoot) {
  const present = collectModuleDocs(projectRoot).details?.["present"];
  return typeof present === "number" ? present : 0;
}

// src/site-map/layout-store.ts
init_esm_shims();
var import_yaml2 = __toESM(require_dist(), 1);
import { existsSync as existsSync7, mkdirSync as mkdirSync2, readFileSync as readFileSync4, renameSync, rmSync as rmSync2, writeFileSync as writeFileSync2 } from "fs";
import { dirname as dirname3, join as join8 } from "path";
var LAYOUT_VERSION = 1;
var SiteMapLayoutError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "SiteMapLayoutError";
  }
};
function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}
function cleanPlacement(areaId, raw) {
  if (typeof raw !== "object" || raw === null) {
    throw new SiteMapLayoutError(`district "${areaId}" must be an object with x, y, w, h`);
  }
  const entry = raw;
  if (!isFiniteNumber(entry.x) || !isFiniteNumber(entry.y) || !isFiniteNumber(entry.w) || !isFiniteNumber(entry.h)) {
    throw new SiteMapLayoutError(`district "${areaId}" needs finite numeric x, y, w, h`);
  }
  const placement = { x: entry.x, y: entry.y, w: entry.w, h: entry.h };
  if (typeof entry.color === "string") placement.color = entry.color;
  if (typeof entry.label === "string") placement.label = entry.label;
  return placement;
}
var AREA_ID_RE = /^[a-z0-9][a-z0-9_-]*$/i;
var UNSAFE_KEYS = /* @__PURE__ */ new Set(["__proto__", "prototype", "constructor"]);
function validateLayout(raw) {
  if (typeof raw !== "object" || raw === null) {
    throw new SiteMapLayoutError("layout must be a map of area id to placement");
  }
  const entries = [];
  for (const [areaId, value] of Object.entries(raw)) {
    if (!AREA_ID_RE.test(areaId) || UNSAFE_KEYS.has(areaId)) {
      throw new SiteMapLayoutError(`district id "${areaId}" is not allowed`);
    }
    entries.push([areaId, cleanPlacement(areaId, value)]);
  }
  return Object.assign(
    /* @__PURE__ */ Object.create(null),
    Object.fromEntries(entries)
  );
}
function readSiteMapLayout(projectRoot) {
  const file = join8(projectRoot, PATHS.SITE_MAP_CANONICAL_LAYOUT);
  if (!existsSync7(file)) return null;
  try {
    const parsed = import_yaml2.default.parse(readFileSync4(file, "utf8"));
    if (parsed === null || typeof parsed !== "object") return null;
    return validateLayout(parsed.districts ?? {});
  } catch {
    return null;
  }
}
function writeSiteMapLayout(projectRoot, raw) {
  const layout = validateLayout(raw);
  const file = join8(projectRoot, PATHS.SITE_MAP_CANONICAL_LAYOUT);
  mkdirSync2(dirname3(file), { recursive: true });
  const body = import_yaml2.default.stringify({ version: LAYOUT_VERSION, districts: layout });
  const temp = `${file}.tmp`;
  writeFileSync2(temp, body, "utf8");
  renameSync(temp, file);
  return layout;
}
function deleteSiteMapLayout(projectRoot) {
  const file = join8(projectRoot, PATHS.SITE_MAP_CANONICAL_LAYOUT);
  rmSync2(file, { force: true });
}

// src/site-map/dashboard-view.ts
function freshnessOf(map) {
  const stamped = map.app.freshness;
  return {
    generated_from: map.app.generated_from ?? null,
    anchors_total: stamped?.anchors_total ?? null,
    anchors_resolved: stamped?.anchors_resolved ?? null,
    anchors_broken: stamped?.anchors_broken ?? null,
    stale: stamped === void 0 ? false : isStale(stamped)
  };
}
function buildSiteMapView(projectRoot, env = process.env, options = {}) {
  if (!resolveFrameworkConfig(projectRoot, env).features.site_map) {
    return { status: "disabled" };
  }
  const map = readCanonicalSiteMap(projectRoot);
  if (map === null) {
    const prerequisites = detectSiteMapPrerequisites(projectRoot);
    if (!prerequisites.satisfied) {
      return { status: "blocked", missing: prerequisites.missing, prerequisites };
    }
    return { status: "empty" };
  }
  return {
    status: "ready",
    map,
    journeys: readAllJourneys(projectRoot),
    freshness: freshnessOf(map),
    layout: readSiteMapLayout(projectRoot),
    readOnly: options.readOnly === true
  };
}

// src/site-map/progress-store.ts
init_esm_shims();
import { readFile as readFile5, rm } from "fs/promises";
import { join as join9 } from "path";

// src/site-map/shared.ts
init_esm_shims();
import { createHash } from "crypto";
import { mkdir as mkdir2, writeFile as writeFile2 } from "fs/promises";
import { dirname as dirname4 } from "path";
function toSiteMapTimestamp(date) {
  const pad3 = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad3(date.getMonth() + 1)}-${pad3(date.getDate())}-${pad3(date.getHours())}-${pad3(date.getMinutes())}-${pad3(date.getSeconds())}`;
}
function toSiteMapReportId(prefix, date) {
  return `${prefix}-${toSiteMapTimestamp(date)}`;
}
async function writeJsonFile(target, data) {
  await mkdir2(dirname4(target), { recursive: true });
  await writeFile2(target, `${JSON.stringify(data, null, 2)}
`);
}
function findingFingerprint(finding) {
  const payload = JSON.stringify({
    title: finding.title,
    category: finding.category,
    tier: finding.tier,
    severity: finding.severity,
    affected_surfaces: [...finding.affected_surfaces].sort(),
    affected_files: [...finding.affected_files].sort(),
    evidence: finding.evidence,
    resolution: finding.resolution
  });
  return createHash("sha256").update(payload).digest("hex").slice(0, 8).toUpperCase();
}
function assignSiteMapFindingIds(findings) {
  const seen = /* @__PURE__ */ new Map();
  return findings.map((finding) => {
    const fingerprint = findingFingerprint(finding);
    const occurrence = (seen.get(fingerprint) ?? 0) + 1;
    seen.set(fingerprint, occurrence);
    const id = occurrence === 1 ? `SM-${fingerprint}` : `SM-${fingerprint}-${String(occurrence).padStart(2, "0")}`;
    return { ...finding, id };
  });
}
var SEVERITY_RANK = {
  high: 0,
  medium: 1,
  low: 2
};
function sortFindings(findings) {
  return [...findings].sort((a, b) => {
    const bySeverity = SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity];
    if (bySeverity !== 0) return bySeverity;
    return a.id.localeCompare(b.id);
  });
}

// src/site-map/progress-store.ts
var VALIDATOR = new SchemaValidator();
var tmpSeq = 0;
function progressPath(projectRoot) {
  return join9(projectRoot, PATHS.SITE_MAP_PROGRESS);
}
function createEmptyProgress(inventory, now) {
  const iso = now.toISOString();
  return {
    schema_version: "1",
    generated_by: "paqad-ai",
    framework_version: VERSION,
    created_at: iso,
    updated_at: iso,
    inventory: { screens: inventory.screens, groups: [...inventory.groups] },
    units: {}
  };
}
function createUnit(input) {
  return {
    id: input.id,
    kind: input.kind,
    label: input.label,
    state: "not_started",
    started_at: null,
    completed_at: null,
    artifact: input.artifact,
    source_files: [...input.source_files],
    source_hash: null,
    error: null
  };
}
function startUnit(unit, now) {
  unit.state = "writing";
  unit.started_at = now.toISOString();
  unit.error = null;
}
function completeUnit(unit, sourceHash, now) {
  unit.state = "done";
  unit.completed_at = now.toISOString();
  unit.source_hash = sourceHash;
  unit.error = null;
}
async function readProgress(projectRoot) {
  let raw;
  try {
    raw = await readFile5(progressPath(projectRoot), "utf8");
  } catch {
    return null;
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!VALIDATOR.validate("site-map-progress", parsed).valid) {
    return null;
  }
  return parsed;
}
async function saveProgress(projectRoot, progress, updatedAt) {
  progress.updated_at = updatedAt.toISOString();
  const target = progressPath(projectRoot);
  tmpSeq += 1;
  const tmp = `${target}.${process.pid}.${tmpSeq}.tmp`;
  await writeJsonFile(tmp, progress);
  await renameWithRetry(tmp, target);
}
async function recoverInFlight(projectRoot, progress) {
  const reset = [];
  for (const unit of Object.values(progress.units)) {
    if (unit.state !== "writing") {
      continue;
    }
    if (unit.artifact !== null) {
      await rm(join9(projectRoot, unit.artifact), { force: true });
    }
    unit.state = "not_started";
    unit.started_at = null;
    unit.error = null;
    reset.push(unit.id);
  }
  return reset;
}
function summarizeProgress(progress) {
  const units = Object.values(progress.units);
  let done = 0;
  let writing = 0;
  let failed = 0;
  let remaining = 0;
  let next = null;
  for (const unit of units) {
    switch (unit.state) {
      case "done":
        done += 1;
        break;
      case "writing":
        writing += 1;
        break;
      case "failed":
        failed += 1;
        break;
      case "not_started":
        remaining += 1;
        if (next === null) {
          next = { id: unit.id, label: unit.label };
        }
        break;
    }
  }
  return { total: units.length, done, writing, failed, remaining, next };
}
var KIND_LABEL = {
  group: "Group",
  journey: "Journey",
  stage: "Stage"
};
function describeCompletedUnits(progress) {
  const units = Object.values(progress.units);
  const totals = { group: 0, journey: 0, stage: 0 };
  for (const unit of units) totals[unit.kind] += 1;
  const seen = { group: 0, journey: 0, stage: 0 };
  const lines = [];
  for (const unit of units) {
    seen[unit.kind] += 1;
    if (unit.state !== "done") continue;
    lines.push(
      `${KIND_LABEL[unit.kind]} ${seen[unit.kind]} of ${totals[unit.kind]}: ${unit.label}`
    );
  }
  return lines;
}
async function reconcileDoneUnits(projectRoot, progress) {
  const skipped = [];
  const reset = [];
  for (const unit of Object.values(progress.units)) {
    if (unit.state !== "done") {
      continue;
    }
    const current = await hashSourceFiles(projectRoot, unit.source_files);
    if (current === unit.source_hash) {
      skipped.push(unit.id);
    } else {
      unit.state = "not_started";
      unit.started_at = null;
      unit.completed_at = null;
      unit.source_hash = null;
      unit.error = null;
      reset.push(unit.id);
    }
  }
  return { skipped, reset };
}

// src/dashboard/approvals.ts
init_esm_shims();
import { appendFileSync, mkdirSync as mkdirSync3 } from "fs";
import { dirname as dirname5, join as join10 } from "path";
var DASHBOARD_ACTOR = "dashboard";
var ApprovalNotFoundError = class extends Error {
  constructor(id) {
    super(`No pending approval found for ${id}.`);
    this.name = "ApprovalNotFoundError";
  }
};
var ApprovalConflictError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "ApprovalConflictError";
  }
};
function pauseItem(packet) {
  return {
    kind: "pause",
    id: packet.decision_id,
    category: packet.category,
    question: packet.question,
    context: packet.context,
    options: packet.options.map((option) => ({
      option_key: option.option_key,
      label: option.label,
      one_line_preview: option.one_line_preview,
      trade_off: option.trade_off
    })),
    recommendation: packet.recommendation ?? null,
    recommendation_reason: packet.recommendation_reason ?? null,
    requested_by: packet.requested_by,
    created_at: packet.created_at,
    ttl_until: packet.ttl_until
  };
}
function proposalItem(decision) {
  return {
    kind: "module-proposal",
    id: decision.id,
    proposed_slug: decision.proposed_slug,
    proposed_name: decision.proposed_name,
    reasoning: decision.reasoning,
    confidence: decision.confidence,
    prompt_excerpt: decision.source_of_decision.prompt_excerpt,
    created_at: decision.created_at,
    expires_at: decision.expires_at
  };
}
function buildApprovalsFeed(projectRoot) {
  const store = new DecisionStore(projectRoot);
  const pauses = [];
  for (const id of store.listPendingDecisionIds()) {
    const result = store.readPendingResult(id);
    if (result.packet) pauses.push(pauseItem(result.packet));
  }
  const now = /* @__PURE__ */ new Date();
  const proposals = listDecisionsByState(projectRoot, "proposed").filter((decision) => !isExpired(decision, now)).map(proposalItem);
  const byNewest = (a, b) => b.created_at.localeCompare(a.created_at);
  pauses.sort(byNewest);
  proposals.sort(byNewest);
  return {
    generatedAt: now.toISOString(),
    pauses,
    proposals,
    pendingCount: pauses.length + proposals.length
  };
}
function appendDashboardAudit(projectRoot, action, fields) {
  const path2 = join10(projectRoot, PATHS.AUDIT_LOG);
  mkdirSync3(dirname5(path2), { recursive: true });
  const pairs = Object.entries({ actor: DASHBOARD_ACTOR, ...fields }).map(([key, value]) => `${key}="${value.replace(/"/g, "'")}"`).join(" ");
  appendFileSync(path2, `[${(/* @__PURE__ */ new Date()).toISOString()}] INFO ${action} ${pairs}
`);
}
function resolvePauseDecision(projectRoot, input) {
  const store = new DecisionStore(projectRoot);
  const result = store.readPendingResult(input.decisionId);
  if (!result.packet) {
    if (result.error) {
      throw new ApprovalConflictError(
        `Decision ${input.decisionId} cannot be resolved: ${result.error}`
      );
    }
    throw new ApprovalNotFoundError(input.decisionId);
  }
  const packet = result.packet;
  const validKeys = packet.options.map((option) => option.option_key);
  if (!validKeys.includes(input.chosenOptionKey)) {
    throw new ApprovalConflictError(
      `Option '${input.chosenOptionKey}' is not one of ${input.decisionId}'s options (${validKeys.join(", ")}).`
    );
  }
  store.resolve({
    decisionId: input.decisionId,
    humanResponse: {
      chosen_option_key: input.chosenOptionKey,
      intent: "explicit",
      explanation_rounds_used: 0,
      responded_at: (/* @__PURE__ */ new Date()).toISOString(),
      responded_by: DASHBOARD_ACTOR,
      carry_over_scope: "session",
      ...input.note ? { note: input.note } : {}
    },
    respondedByProvider: DASHBOARD_ACTOR
  });
  appendDashboardAudit(projectRoot, "dashboard-decision-resolved", {
    decision_id: input.decisionId,
    chosen_option_key: input.chosenOptionKey
  });
  return { id: input.decisionId, status: "resolved", chosen_option_key: input.chosenOptionKey };
}
function transitionModuleProposal(projectRoot, id, target) {
  const decision = readDecision(projectRoot, id);
  if (decision === null) {
    throw new ApprovalNotFoundError(id);
  }
  if (!canTransition(decision.state, target)) {
    throw new ApprovalConflictError(
      `Module decision ${id} is '${decision.state}' and cannot become '${target}'.`
    );
  }
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const updated = {
    ...decision,
    state: target,
    updated_at: now,
    approved_by: target === "accepted" ? DASHBOARD_ACTOR : decision.approved_by
  };
  writeDecision(projectRoot, updated);
  appendModuleMapEvent(projectRoot, {
    ts: now,
    type: target === "accepted" ? "module.declared" : "module.decision.rejected",
    slug: decision.proposed_slug,
    via: id,
    approved_by: DASHBOARD_ACTOR
  });
  appendDashboardAudit(projectRoot, `dashboard-module-proposal-${target}`, {
    decision_id: id,
    slug: decision.proposed_slug
  });
  return { id, state: target, proposed_slug: decision.proposed_slug };
}
function acceptModuleProposal(projectRoot, id) {
  return transitionModuleProposal(projectRoot, id, "accepted");
}
function rejectModuleProposal(projectRoot, id) {
  return transitionModuleProposal(projectRoot, id, "rejected");
}

// src/dashboard/audit-feed.ts
init_esm_shims();
import { existsSync as existsSync8, readFileSync as readFileSync5 } from "fs";
import { join as join11 } from "path";
var DEFAULT_LIMIT = 200;
var MAX_LIMIT = 1e3;
var LINE_PATTERN = /^\[([^\]]+)\]\s+(\S+)\s+(\S+)(?:\s+(.*))?$/;
var ACTOR_PATTERN = /(?:^|\s)actor="([^"]*)"/;
function parseLine(raw) {
  const match = LINE_PATTERN.exec(raw);
  if (match === null) {
    return { ts: null, level: null, action: null, actor: null, raw };
  }
  const actor = ACTOR_PATTERN.exec(match[4] ?? "");
  return {
    ts: match[1],
    level: match[2],
    action: match[3],
    actor: actor === null ? null : actor[1],
    raw
  };
}
function clampLimit(limit) {
  if (limit === void 0 || !Number.isFinite(limit)) {
    return DEFAULT_LIMIT;
  }
  return Math.min(Math.max(Math.floor(limit), 1), MAX_LIMIT);
}
function clampCursor(cursor) {
  if (cursor === void 0 || !Number.isFinite(cursor) || cursor < 0) {
    return 0;
  }
  return Math.floor(cursor);
}
function readAuditFeed(projectRoot, options = {}) {
  const path2 = join11(projectRoot, PATHS.AUDIT_LOG);
  if (!existsSync8(path2)) {
    return { entries: [], nextCursor: null, total: 0 };
  }
  const lines = readFileSync5(path2, "utf8").split(/\r?\n/).filter((line) => line.trim().length > 0);
  const newestFirst2 = lines.reverse();
  const limit = clampLimit(options.limit);
  const cursor = clampCursor(options.cursor);
  const entries = newestFirst2.slice(cursor, cursor + limit).map(parseLine);
  const consumed = cursor + entries.length;
  return {
    entries,
    nextCursor: consumed < newestFirst2.length ? consumed : null,
    total: newestFirst2.length
  };
}

// src/dashboard/config-delivery-policy.ts
init_esm_shims();
var import_yaml3 = __toESM(require_dist(), 1);

// src/dashboard/write-pipeline.ts
init_esm_shims();
import { createHash as createHash2 } from "crypto";
import {
  existsSync as existsSync9,
  lstatSync,
  mkdirSync as mkdirSync4,
  readFileSync as readFileSync6,
  realpathSync,
  renameSync as renameSync2,
  writeFileSync as writeFileSync3
} from "fs";
import { dirname as dirname6, join as join12, resolve as resolve4, sep as sep2 } from "path";
var WriteConflictError = class extends Error {
  currentContent;
  currentHash;
  constructor(relativePath, currentContent, currentHash) {
    super(
      `This file changed since you opened it, likely by an agent. Review the diff of ${relativePath}.`
    );
    this.name = "WriteConflictError";
    this.currentContent = currentContent;
    this.currentHash = currentHash;
  }
};
var PathNotAllowedError = class extends Error {
  constructor(relativePath, reason2) {
    super(`Path is not editable from the dashboard: ${relativePath} (${reason2}).`);
    this.name = "PathNotAllowedError";
  }
};
var ALLOWED_FILES = [PATHS.PROJECT_PROFILE, PATHS.RAG_IGNORE_CONFIG];
var ALLOWED_EXTENSIONS = [".md", ".yml", ".yaml", ".json"];
var MAX_MANAGED_FILE_BYTES = 1024 * 1024;
function contentHash(content) {
  return `sha256:${createHash2("sha256").update(content, "utf8").digest("hex")}`;
}
function resolveManagedPath(projectRoot, relativePath) {
  const posix = toPosixPath(relativePath).replace(/^\/+/, "");
  if (posix.length === 0) {
    throw new PathNotAllowedError(relativePath, "empty path");
  }
  const segments = posix.split("/");
  if (segments.some((segment) => segment === ".." || segment === ".")) {
    throw new PathNotAllowedError(relativePath, "path traversal");
  }
  const named = ALLOWED_FILES.includes(posix);
  if (!named) {
    if (segments.some((segment) => segment.startsWith("."))) {
      throw new PathNotAllowedError(relativePath, "dotfiles are not editable");
    }
    if (!posix.startsWith(`${PATHS.INSTRUCTIONS_DIR}/`)) {
      throw new PathNotAllowedError(
        relativePath,
        "outside docs/instructions and the named config files"
      );
    }
  }
  if (!ALLOWED_EXTENSIONS.some((extension) => posix.endsWith(extension))) {
    throw new PathNotAllowedError(relativePath, "extension is not editable");
  }
  const realRoot = existsSync9(projectRoot) ? realpathSync(resolve4(projectRoot)) : resolve4(projectRoot);
  const absolute = resolve4(realRoot, posix);
  const rootPrefix = `${realRoot}${sep2}`;
  if (!absolute.startsWith(rootPrefix)) {
    throw new PathNotAllowedError(relativePath, "outside the project root");
  }
  let probe = absolute;
  while (probe.startsWith(rootPrefix)) {
    if (existsSync9(probe)) {
      if (lstatSync(probe).isSymbolicLink()) {
        throw new PathNotAllowedError(relativePath, "symlinks are not editable");
      }
      const real = realpathSync(probe);
      if (real !== probe && !real.startsWith(rootPrefix)) {
        throw new PathNotAllowedError(relativePath, "resolves outside the project root");
      }
      break;
    }
    probe = dirname6(probe);
  }
  return absolute;
}
function readManagedFile(projectRoot, relativePath) {
  const absolute = resolveManagedPath(projectRoot, relativePath);
  const posix = toPosixPath(relativePath).replace(/^\/+/, "");
  if (!existsSync9(absolute)) {
    return { path: posix, exists: false, content: null, hash: null };
  }
  const content = readFileSync6(absolute, "utf8");
  return { path: posix, exists: true, content, hash: contentHash(content) };
}
function writeManagedFile(projectRoot, input) {
  const absolute = resolveManagedPath(projectRoot, input.relativePath);
  const posix = toPosixPath(input.relativePath).replace(/^\/+/, "");
  if (Buffer.byteLength(input.content, "utf8") > MAX_MANAGED_FILE_BYTES) {
    throw new Error(`File exceeds the ${MAX_MANAGED_FILE_BYTES / 1024} KB dashboard write limit.`);
  }
  const current = existsSync9(absolute) ? readFileSync6(absolute, "utf8") : null;
  const currentHash = current === null ? null : contentHash(current);
  if (currentHash !== input.baseHash) {
    throw new WriteConflictError(posix, current, currentHash);
  }
  mkdirSync4(dirname6(absolute), { recursive: true });
  const temp = join12(dirname6(absolute), `.paqad-dashboard-write-${process.pid}.tmp`);
  writeFileSync3(temp, input.content);
  renameSync2(temp, absolute);
  const hash = contentHash(input.content);
  appendDashboardAudit(projectRoot, input.action, { path: posix, contentHash: hash });
  return { path: posix, hash };
}

// src/dashboard/config-delivery-policy.ts
var RELATIVE_PATH = `${PATHS.WORKFLOWS_DIR}/${DELIVERY_POLICY_FILE}`;
var DeliveryPolicyValidationError = class extends Error {
  issues;
  constructor(message, issues) {
    super(message);
    this.name = "DeliveryPolicyValidationError";
    this.issues = issues;
  }
};
function getDeliveryPolicyConfig(projectRoot) {
  const { policy, warnings } = loadDeliveryPolicy(projectRoot);
  return {
    resolved: policy,
    warnings,
    file: readManagedFile(projectRoot, RELATIVE_PATH),
    defaultsYaml: renderDefaultDeliveryPolicyYaml(),
    schema: delivery_policy_schema_default
  };
}
function putDeliveryPolicy(projectRoot, input) {
  let parsed;
  try {
    parsed = import_yaml3.default.parse(input.content);
  } catch (err) {
    throw new DeliveryPolicyValidationError("The file is not valid YAML.", [
      {
        path: "/",
        message: err instanceof Error ? err.message : "YAML parse failed"
      }
    ]);
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new DeliveryPolicyValidationError("The policy must be a YAML mapping.", [
      { path: "/", message: "Expected a mapping at the top level." }
    ]);
  }
  const validation = new SchemaValidator().validate("delivery-policy", parsed);
  if (!validation.valid) {
    throw new DeliveryPolicyValidationError(
      "The policy does not match the delivery-policy schema.",
      validation.errors
    );
  }
  const written = writeManagedFile(projectRoot, {
    relativePath: RELATIVE_PATH,
    content: input.content,
    baseHash: input.baseHash,
    action: "dashboard.config.delivery-policy.write"
  });
  return {
    path: written.path,
    hash: written.hash,
    resolved: loadDeliveryPolicy(projectRoot).policy
  };
}

// src/dashboard/config-design-tokens.ts
init_esm_shims();
var DesignTokensValidationError = class extends Error {
  issues;
  constructor(message, issues) {
    super(message);
    this.name = "DesignTokensValidationError";
    this.issues = issues;
  }
};
function getDesignTokensConfig(projectRoot) {
  const file = readManagedFile(projectRoot, PATHS.DESIGN_TOKENS_FILE);
  let tokens = null;
  if (file.content !== null) {
    try {
      const parsed = JSON.parse(file.content);
      if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
        tokens = parsed;
      }
    } catch {
      tokens = null;
    }
  }
  return {
    file,
    tokens,
    placeholder: tokens?.["$comment"] === DESIGN_TOKENS_PLACEHOLDER_NOTE,
    schema: design_tokens_schema_default
  };
}
async function putDesignTokens(projectRoot, input) {
  let parsed;
  try {
    parsed = JSON.parse(input.content);
  } catch (err) {
    throw new DesignTokensValidationError("The file is not valid JSON.", [
      {
        path: "/",
        message: err instanceof Error ? err.message : "JSON parse failed"
      }
    ]);
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new DesignTokensValidationError("The tokens document must be a JSON object.", [
      { path: "/", message: "Expected an object at the top level." }
    ]);
  }
  const validation = new SchemaValidator().validate("design-tokens", parsed);
  if (!validation.valid) {
    throw new DesignTokensValidationError(
      "The tokens do not match the design-tokens schema.",
      validation.errors
    );
  }
  const written = writeManagedFile(projectRoot, {
    relativePath: PATHS.DESIGN_TOKENS_FILE,
    content: input.content,
    baseHash: input.baseHash,
    action: "dashboard.config.design-tokens.write"
  });
  const regenerated = [];
  let regenerationError;
  try {
    const service = new DesignTokenService();
    regenerated.push(...await service.writeDocs(projectRoot));
    regenerated.push(...await service.writeThemeExports(projectRoot, null));
  } catch (err) {
    regenerationError = err instanceof Error ? err.message : String(err);
  }
  const result = {
    path: written.path,
    hash: written.hash,
    regenerated
  };
  if (regenerationError !== void 0) {
    result.regenerationError = regenerationError;
  }
  return result;
}

// src/dashboard/config-module-map.ts
init_esm_shims();
var import_yaml4 = __toESM(require_dist(), 1);
var ModuleMapValidationError = class extends Error {
  issues;
  constructor(message, issues) {
    super(message);
    this.name = "ModuleMapValidationError";
    this.issues = issues;
  }
};
function getModuleMapConfig(projectRoot) {
  return {
    file: readManagedFile(projectRoot, PATHS.MODULE_MAP),
    modules: readRawModuleMap(projectRoot)?.modules ?? [],
    drift: readDriftReport(projectRoot)
  };
}
function putModuleMap(projectRoot, input) {
  let parsed;
  try {
    parsed = import_yaml4.default.parse(input.content);
  } catch (err) {
    throw new ModuleMapValidationError("The file is not valid YAML.", [
      {
        path: "/",
        message: err instanceof Error ? err.message : "YAML parse failed"
      }
    ]);
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new ModuleMapValidationError("The module map must be a YAML mapping.", [
      { path: "/", message: "Expected a mapping at the top level." }
    ]);
  }
  const issues = collectModuleIssues(parsed["modules"]);
  if (issues.length > 0) {
    throw new ModuleMapValidationError("The module map has invalid module entries.", issues);
  }
  const written = writeManagedFile(projectRoot, {
    relativePath: PATHS.MODULE_MAP,
    content: input.content,
    baseHash: input.baseHash,
    action: "dashboard.config.module-map.write"
  });
  return {
    path: written.path,
    hash: written.hash,
    modules: readRawModuleMap(projectRoot)?.modules ?? []
  };
}
function collectModuleIssues(modules) {
  if (modules === void 0 || modules === null) {
    return [];
  }
  if (!Array.isArray(modules)) {
    return [{ path: "/modules", message: "Expected an array of modules." }];
  }
  const issues = [];
  modules.forEach((entry, index) => {
    if (entry === null || typeof entry !== "object" || Array.isArray(entry)) {
      issues.push({ path: `/modules/${index}`, message: "Expected a module mapping." });
      return;
    }
    const record = entry;
    const hasSlug = typeof record["slug"] === "string" && record["slug"].length > 0;
    const hasName = typeof record["name"] === "string" && record["name"].length > 0;
    if (!hasSlug && !hasName) {
      issues.push({
        path: `/modules/${index}/slug`,
        message: "Each module needs a string slug (or name)."
      });
    }
  });
  return issues;
}

// src/dashboard/config-profile.ts
init_esm_shims();
var ProfileValidationError = class extends Error {
  issues;
  constructor(message, issues) {
    super(message);
    this.name = "ProfileValidationError";
    this.issues = issues;
  }
};
function getProfileConfig(projectRoot) {
  const profile = readProjectProfile(projectRoot);
  return {
    profile,
    schema: project_profile_schema_default,
    capabilities: {
      available: ACTIVE_CAPABILITIES,
      active: profile?.active_capabilities ?? []
    }
  };
}
function putProfile(projectRoot, candidate) {
  if (candidate === null || typeof candidate !== "object" || Array.isArray(candidate)) {
    throw new ProfileValidationError("The profile must be an object.", [
      { path: "/", message: "Expected the parsed profile object." }
    ]);
  }
  const migrated = migrateProjectProfile(candidate);
  const validation = new SchemaValidator().validate("project-profile", migrated.profile);
  if (!validation.valid) {
    throw new ProfileValidationError(
      "The profile does not match the project-profile schema.",
      validation.errors
    );
  }
  const path2 = writeProjectProfile(projectRoot, migrated.profile);
  syncFrameworkConfig(projectRoot, migrated.profile);
  appendDashboardAudit(projectRoot, "dashboard.config.profile.write", {
    path: ".paqad/project-profile.yaml"
  });
  return { path: path2, profile: migrated.profile };
}
function setCapability(projectRoot, name, enabled) {
  if (!ACTIVE_CAPABILITIES.includes(name)) {
    throw new ProfileValidationError(`Unknown capability: ${name}.`, [
      { path: "/name", message: `Must be one of: ${ACTIVE_CAPABILITIES.join(", ")}.` }
    ]);
  }
  const profile = readProjectProfile(projectRoot);
  if (profile === null) {
    throw new ProfileValidationError("No project profile found. Run `paqad-ai onboard` first.", [
      { path: "/", message: "project-profile.yaml is missing." }
    ]);
  }
  const current = new Set(profile.active_capabilities);
  if (enabled) {
    current.add(name);
  } else {
    current.delete(name);
  }
  const updated = {
    ...profile,
    active_capabilities: Array.from(current)
  };
  writeProjectProfile(projectRoot, updated);
  appendDashboardAudit(projectRoot, "dashboard.capabilities.set", {
    capability: name,
    enabled: String(enabled)
  });
  const persisted = readProjectProfile(projectRoot);
  return { active: persisted?.active_capabilities ?? [] };
}

// src/dashboard/config-rag.ts
init_esm_shims();
import { existsSync as existsSync10 } from "fs";
import { join as join13 } from "path";
var RagValidationError = class extends Error {
  issues;
  constructor(message, issues) {
    super(message);
    this.name = "RagValidationError";
    this.issues = issues;
  }
};
function getRagConfig(projectRoot) {
  const profile = readProjectProfile(projectRoot);
  const intelligence = profile?.intelligence ?? null;
  const vectorMeta = join13(projectRoot, PATHS.VECTOR_META);
  const vectorIndex = join13(projectRoot, PATHS.VECTOR_INDEX);
  const indexPresent = existsSync10(vectorMeta) || existsSync10(vectorIndex);
  const indexMtime = fileMtime(vectorMeta) ?? fileMtime(vectorIndex);
  return {
    intelligence,
    status: {
      enabled: intelligence?.rag_enabled === true,
      provider: intelligence?.embedding_provider ?? null,
      model: intelligence?.embedding_model ?? null,
      indexPresent,
      indexAgeDays: ageInDays(indexMtime)
    }
  };
}
var FIELD_CHECKS = {
  rag_enabled: (value) => typeof value === "boolean" ? null : "Expected a boolean.",
  embedding_provider: (value) => {
    if (typeof value !== "string") {
      return "Expected a string.";
    }
    return findRemovedEmbeddingProvider(value) ? REMOVED_EMBEDDING_PROVIDER_MESSAGE : null;
  },
  embedding_model: (value) => typeof value === "string" ? null : "Expected a string.",
  rag_similarity_threshold: (value) => typeof value === "number" && value >= 0 && value <= 1 ? null : "Expected a number between 0 and 1.",
  rag_top_n: (value) => typeof value === "number" && Number.isInteger(value) && value > 0 ? null : "Expected a positive integer.",
  rag_max_file_size: (value) => typeof value === "number" && Number.isInteger(value) && value > 0 ? null : "Expected a positive integer.",
  rag_base_branch: (value) => typeof value === "string" ? null : "Expected a string.",
  existing_surface_tokens: (value) => typeof value === "number" && Number.isInteger(value) && value > 0 ? null : "Expected a positive integer."
};
function putRagConfig(projectRoot, candidate) {
  if (candidate === null || typeof candidate !== "object" || Array.isArray(candidate)) {
    throw new RagValidationError("The RAG settings must be an object.", [
      { path: "/", message: "Expected the partial intelligence object." }
    ]);
  }
  const issues = [];
  const patch = {};
  const candidateRecord = candidate;
  const allowedKeys = Object.keys(FIELD_CHECKS);
  for (const key of Object.keys(candidateRecord)) {
    if (candidateRecord[key] !== void 0 && !allowedKeys.includes(key)) {
      issues.push({
        path: `/${key}`,
        message: `Unknown setting. Allowed: ${allowedKeys.join(", ")}.`
      });
    }
  }
  for (const key of allowedKeys) {
    const value = candidateRecord[key];
    if (value === void 0) {
      continue;
    }
    const problem = FIELD_CHECKS[key](value);
    if (problem !== null) {
      issues.push({ path: `/${key}`, message: problem });
      continue;
    }
    patch[key] = value;
  }
  if (issues.length > 0) {
    throw new RagValidationError("The RAG settings are invalid.", issues);
  }
  const profile = readProjectProfile(projectRoot);
  if (profile === null) {
    throw new RagValidationError("No project profile found. Run `paqad-ai onboard` first.", [
      { path: "/", message: "project-profile.yaml is missing." }
    ]);
  }
  const intelligence = normalizeIntelligenceConfig({
    ...profile.intelligence,
    ...patch
  });
  const updated = { ...profile, intelligence };
  const validation = new SchemaValidator().validate("project-profile", updated);
  if (!validation.valid) {
    throw new RagValidationError(
      "The resulting profile does not match the project-profile schema.",
      validation.errors
    );
  }
  const path2 = writeProjectProfile(projectRoot, updated);
  syncFrameworkConfig(projectRoot, { intelligence });
  appendDashboardAudit(projectRoot, "dashboard.config.rag.write", {
    path: PATHS.PROJECT_CONFIG
  });
  return { path: path2, intelligence };
}

// src/dashboard/export-packet.ts
init_esm_shims();

// src/dashboard/trust.ts
init_esm_shims();
var DEFAULT_EVIDENCE_LIMIT = 200;
var MAX_EVIDENCE_LIMIT = 1e3;
function buildEvidenceFeed(projectRoot, query = {}) {
  const all = readAllFeatureEvidence(projectRoot);
  const limit = Math.min(
    Math.max(1, Math.trunc(query.limit ?? DEFAULT_EVIDENCE_LIMIT)),
    MAX_EVIDENCE_LIMIT
  );
  const rows = all.slice().reverse().filter((row) => query.gate ? row.code === query.gate : true).filter((row) => query.verdict ? row.verdict === query.verdict : true).slice(0, limit);
  return { generatedAt: (/* @__PURE__ */ new Date()).toISOString(), total: all.length, rows };
}
function buildReceiptFeed(projectRoot) {
  const decoded = readAllFeatureReceiptEntries(projectRoot).map(({ dirName, envelope }) => ({
    dirName,
    envelope,
    statement: decodeReceiptStatement(envelope)
  }));
  decoded.sort(
    (a, b) => (b.statement?.predicate.time_verified ?? "").localeCompare(
      a.statement?.predicate.time_verified ?? ""
    )
  );
  let brokenAt = null;
  const receipts = decoded.map(({ dirName, envelope, statement }, index) => {
    const predicate = statement?.predicate ?? null;
    const sealed = verifyReceiptSeal(envelope) && (statement === null || verifyEvidenceSeal(projectRoot, dirName, statement) !== false);
    const rows = statement === null ? { sealed: [], unsealed: [] } : readReceiptEvidenceRows(projectRoot, dirName, statement);
    if (!sealed && brokenAt === null) {
      brokenAt = index;
    }
    return {
      index,
      receipt_hash: envelope.paqad.receipt_hash,
      prev_receipt_hash: envelope.paqad.prev_receipt_hash,
      signing_mode: envelope.paqad.signing_mode,
      sealed,
      time_verified: predicate?.time_verified ?? null,
      verification_result: predicate?.verification_result ?? null,
      authorship: predicate?.change_authorship ?? null,
      compliance: predicate?.compliance_citations ?? [],
      reproducibility: predicate?.reproducibility ?? null,
      checks: [
        ...rows.sealed.map((row) => ({ row, sealed: true })),
        ...rows.unsealed.map((row) => ({ row, sealed: false }))
      ].map(({ row, sealed: sealed2 }) => ({
        code: row.code,
        engine: row.engine,
        verdict: row.verdict,
        strength_class: row.strength_class,
        sealed: sealed2
      })),
      subjects: (statement?.subject ?? []).map((subject) => ({
        name: subject.name,
        digest: subject.digest.sha256
      }))
    };
  });
  return { generatedAt: (/* @__PURE__ */ new Date()).toISOString(), brokenAt, receipts };
}
function readAiBomDocument(projectRoot) {
  const latest = latestFeatureReceipt(projectRoot);
  if (latest === null) return null;
  const predicate = decodeReceiptStatement(latest)?.predicate ?? null;
  return projectAiBomFromFeatures(
    projectRoot,
    predicate?.verifier.version ?? "0.0.0-dev",
    predicate?.time_verified ?? ""
  );
}
function buildPrCommentMarkdown(projectRoot, sha) {
  return buildEvidenceComment(projectRoot, sha);
}

// src/dashboard/export-packet.ts
function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
var VERDICT_COLORS = {
  pass: "#16a34a",
  fail: "#dc2626",
  skipped: "#64748b"
};
function verdictDot(verdict) {
  const color = VERDICT_COLORS[verdict] ?? "#d97706";
  return `<span style="display:inline-block;width:8px;height:8px;border-radius:4px;background:${color};margin-right:6px"></span>`;
}
function buildEvidencePacket(projectRoot, options = {}) {
  const evidence = buildEvidenceFeed(projectRoot, { limit: 500 });
  const receipts = buildReceiptFeed(projectRoot);
  const aiBom = readAiBomDocument(projectRoot);
  const generatedAt = (/* @__PURE__ */ new Date()).toISOString();
  const projectName = options.projectName ?? null;
  const title = projectName ? `Verification evidence, ${projectName}` : "Verification evidence";
  const modelCount = Array.isArray(aiBom?.components) ? aiBom.components.length : 0;
  const markdownLines = [
    `# ${title}`,
    "",
    `Generated ${generatedAt}. ${evidence.total} ledger entries, ${receipts.receipts.length} sealed receipts.`,
    "",
    "## Receipts",
    ""
  ];
  if (receipts.receipts.length === 0) {
    markdownLines.push("No receipts yet. The first one appears after the first verified change.");
  } else {
    for (const receipt of receipts.receipts) {
      const author = receipt.authorship?.agent ?? "unknown agent";
      const model = receipt.authorship?.model_id ?? null;
      markdownLines.push(
        `- ${receipt.sealed ? "Sealed" : "Broken link"} \`${receipt.receipt_hash.slice(0, 16)}\` by ${author}${model ? ` (${model})` : ""}: ${receipt.checks.length} checks, result ${receipt.verification_result ?? "n/a"}.`
      );
    }
  }
  markdownLines.push("", "## Evidence timeline", "");
  if (evidence.rows.length === 0) {
    markdownLines.push("No gate runs recorded yet.");
  } else {
    for (const row of evidence.rows.slice(0, 100)) {
      const glyph = row.verdict === "skipped" ? "\u26AA " : "";
      markdownLines.push(`- ${glyph}${row.verdict.toUpperCase()} ${row.code} (${row.engine})`);
    }
  }
  markdownLines.push("", "## AI bill of materials", "");
  markdownLines.push(
    aiBom === null ? "No AI-BOM projected yet." : `${modelCount} model${modelCount === 1 ? "" : "s"} recorded (CycloneDX).`
  );
  const markdown = `${markdownLines.join("\n")}
`;
  const receiptRows = receipts.receipts.map((receipt) => {
    const author = escapeHtml(receipt.authorship?.agent ?? "unknown agent");
    const voucher = receipt.authorship?.model_id ? ` (${escapeHtml(receipt.authorship.model_id)})` : "";
    const seal = receipt.sealed ? '<span style="color:#16a34a">sealed</span>' : '<span style="color:#dc2626">broken link</span>';
    return `<li style="margin:6px 0">${seal} <code>${escapeHtml(receipt.receipt_hash.slice(0, 16))}</code> by ${author}${voucher}. ${receipt.checks.length} checks, result ${escapeHtml(receipt.verification_result ?? "n/a")}.</li>`;
  }).join("");
  const evidenceRows = evidence.rows.slice(0, 200).map(
    (row) => `<li style="margin:4px 0">${verdictDot(row.verdict)}${escapeHtml(row.code)} <span style="color:#64748b">(${escapeHtml(row.engine)}, ${escapeHtml(row.verdict)})</span></li>`
  ).join("");
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
</head>
<body style="font-family:-apple-system,Segoe UI,Inter,sans-serif;color:#0f172a;background:#fafafa;margin:0;padding:32px">
<main style="max-width:720px;margin:0 auto">
<h1 style="font-size:22px;font-weight:600;margin:0 0 4px">${escapeHtml(title)}</h1>
<p style="font-size:13px;color:#64748b;margin:0 0 24px">Generated ${escapeHtml(generatedAt)}. ${evidence.total} ledger entries, ${receipts.receipts.length} receipts. Proof you can show anyone: what was checked, who wrote it, who vouched.</p>
<section style="background:#fff;border-radius:10px;padding:16px 20px;margin-bottom:16px">
<h2 style="font-size:17px;font-weight:600;margin:0 0 8px">Receipts</h2>
<ul style="list-style:none;padding:0;margin:0;font-size:15px">${receiptRows || '<li style="color:#64748b">No receipts yet. The first one appears after the first verified change.</li>'}</ul>
</section>
<section style="background:#fff;border-radius:10px;padding:16px 20px;margin-bottom:16px">
<h2 style="font-size:17px;font-weight:600;margin:0 0 8px">Evidence timeline</h2>
<ul style="list-style:none;padding:0;margin:0;font-size:13px">${evidenceRows || '<li style="color:#64748b">No gate runs recorded yet.</li>'}</ul>
</section>
<section style="background:#fff;border-radius:10px;padding:16px 20px">
<h2 style="font-size:17px;font-weight:600;margin:0 0 8px">AI bill of materials</h2>
<p style="font-size:15px;margin:0">${aiBom === null ? "No AI-BOM projected yet." : `${modelCount} model${modelCount === 1 ? "" : "s"} recorded (CycloneDX).`}</p>
</section>
</main>
</body>
</html>
`;
  return {
    generatedAt,
    projectName,
    json: { evidence, receipts, aiBom },
    markdown,
    html
  };
}

// src/dashboard/instructions-files.ts
init_esm_shims();
var import_yaml5 = __toESM(require_dist(), 1);
import { existsSync as existsSync11, readdirSync as readdirSync2 } from "fs";
import { join as join14 } from "path";
var EDITABLE_EXTENSIONS = [".md", ".yml", ".yaml", ".json"];
function buildNode(absolute, relative2, name) {
  const entries = readdirSync2(absolute, { withFileTypes: true });
  const children = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name.startsWith(".")) continue;
    const childRelative = relative2 === "" ? entry.name : `${relative2}/${entry.name}`;
    if (entry.isDirectory()) {
      const child = buildNode(join14(absolute, entry.name), childRelative, entry.name);
      if (child) children.push(child);
    } else if (EDITABLE_EXTENSIONS.some((extension) => entry.name.endsWith(extension))) {
      children.push({ path: childRelative, name: entry.name, type: "file" });
    }
  }
  return { path: relative2, name, type: "directory", children };
}
function listInstructionsTree(projectRoot) {
  const root = join14(projectRoot, PATHS.INSTRUCTIONS_DIR);
  if (!existsSync11(root)) {
    return { root: PATHS.INSTRUCTIONS_DIR, exists: false, tree: null };
  }
  return {
    root: PATHS.INSTRUCTIONS_DIR,
    exists: true,
    tree: buildNode(root, "", "instructions")
  };
}
function splitFrontmatter(content) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(content);
  if (!match) {
    return { frontmatter: {}, body: content };
  }
  try {
    const parsed = import_yaml5.default.parse(match[1]);
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { frontmatter: {}, body: content };
    }
    return {
      frontmatter: parsed,
      body: content.slice(match[0].length)
    };
  } catch {
    return { frontmatter: {}, body: content };
  }
}
function readInstructionsFile(projectRoot, treePath) {
  const posix = toPosixPath(treePath).replace(/^\/+/, "");
  const file = readManagedFile(projectRoot, `${PATHS.INSTRUCTIONS_DIR}/${posix}`);
  if (!file.exists || file.content === null || !file.path.endsWith(".md")) {
    return { ...file, frontmatter: {}, body: file.content };
  }
  const { frontmatter, body } = splitFrontmatter(file.content);
  return { ...file, frontmatter, body };
}

// src/dashboard/inventory.ts
init_esm_shims();
var import_yaml6 = __toESM(require_dist(), 1);
import { existsSync as existsSync12, readdirSync as readdirSync3, readFileSync as readFileSync7 } from "fs";
import { homedir } from "os";
import { join as join15 } from "path";
function countFilesRecursive(dir, extensions) {
  if (!existsSync12(dir)) return 0;
  let total = 0;
  const stack = [dir];
  while (stack.length > 0) {
    const current = stack.pop();
    let entries;
    try {
      entries = readdirSync3(current, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (entry.name.startsWith(".")) continue;
      const full = join15(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
        total += 1;
      }
    }
  }
  return total;
}
function countEntries(dir, suffix) {
  if (!existsSync12(dir)) return 0;
  try {
    const entries = readdirSync3(dir);
    return suffix === void 0 ? entries.filter((name) => !name.startsWith(".")).length : entries.filter((name) => name.endsWith(suffix)).length;
  } catch {
    return 0;
  }
}
function countFeatureSpecs(projectRoot) {
  let count = 0;
  for (const dirName of listFeatureDirs(projectRoot)) {
    if (existsSync12(join15(projectRoot, featureFilePath(dirName, "specification")))) count += 1;
  }
  return count;
}
function countLines(file) {
  if (!existsSync12(file)) return 0;
  try {
    const content = readFileSync7(file, "utf8");
    return content.split("\n").filter((line) => line.trim().length > 0).length;
  } catch {
    return 0;
  }
}
function parseYamlFile(file) {
  if (!existsSync12(file)) return null;
  try {
    const parsed = import_yaml6.default.parse(readFileSync7(file, "utf8"));
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}
function presence(exists, presentDetail, missingDetail) {
  return { exists, detail: exists ? presentDetail : missingDetail };
}
function counted(count, singular, plural, zero) {
  if (count === 0) return { exists: false, detail: zero, count };
  return {
    exists: true,
    detail: `${count} ${count === 1 ? singular : plural}`,
    count
  };
}
function buildInventory(projectRoot, options = {}) {
  const paqadHome = options.paqadHome ?? join15(homedir(), ".paqad-ai");
  const paqadShared = options.paqadSharedHome ?? join15(homedir(), ".paqad");
  const at2 = (relative2) => join15(projectRoot, relative2);
  const profile = parseYamlFile(at2(PATHS.PROJECT_PROFILE));
  const activeCapabilities = Array.isArray(profile?.active_capabilities) ? profile.active_capabilities : [];
  const intelligence = profile?.intelligence ?? null;
  const moduleMap = parseYamlFile(at2(PATHS.MODULE_MAP));
  const moduleCount = Array.isArray(moduleMap?.modules) ? moduleMap.modules.length : 0;
  const pendingPauses = countEntries(at2(PATHS.DECISIONS_PENDING_DIR), ".json");
  const moduleProposals = countEntries(at2(PATHS.PROSPECTIVE_DECISIONS_DIR), ".json");
  const providerEntries = [
    PATHS.CLAUDE_MD,
    PATHS.AGENTS_MD,
    PATHS.ANTIGRAVITY_MD,
    PATHS.GEMINI_MD
  ].filter((entry) => existsSync12(at2(entry)));
  const packCount = (countEntries(join15(paqadShared, "packs")) || countEntries(join15(paqadHome, "packs"))) + countEntries(at2(join15(".paqad", "packs")));
  const patternCount = countFilesRecursive(join15(paqadShared, "patterns"), [".json", ".md", ".yaml"]) || countFilesRecursive(join15(paqadHome, "patterns"), [".json", ".md", ".yaml"]);
  const driftReport = (() => {
    if (!existsSync12(at2(PATHS.MODULE_MAP_DRIFT))) return null;
    try {
      return JSON.parse(readFileSync7(at2(PATHS.MODULE_MAP_DRIFT), "utf8"));
    } catch {
      return null;
    }
  })();
  const items = [
    {
      key: "instructions",
      name: "Canonical instructions",
      why: "One source of truth every agent reads first.",
      class: "web",
      managedBy: "you",
      area: "knowledge",
      route: "#/knowledge",
      source: PATHS.INSTRUCTIONS_DIR,
      state: counted(
        countFilesRecursive(at2(PATHS.INSTRUCTIONS_DIR), [".md", ".yml", ".yaml"]),
        "file",
        "files",
        "No instruction files yet"
      )
    },
    {
      key: "workflows",
      name: "Workflow definitions",
      why: "Each prompt like create documentation routes to a guided process.",
      class: "web",
      managedBy: "you",
      area: "automation",
      route: "#/automation",
      source: PATHS.WORKFLOWS_DIR,
      state: counted(
        countEntries(at2(PATHS.WORKFLOWS_DIR), ".yaml") + countEntries(at2(PATHS.WORKFLOWS_DIR), ".yml"),
        "workflow file",
        "workflow files",
        "No workflow files yet"
      )
    },
    {
      key: "delivery-policy",
      name: "Delivery policy",
      why: "What ships on its own, what waits for you.",
      class: "web",
      managedBy: "you",
      area: "automation",
      route: "#/automation",
      source: `${PATHS.WORKFLOWS_DIR}/delivery-policy.yaml`,
      state: presence(
        existsSync12(at2(join15(PATHS.WORKFLOWS_DIR, "delivery-policy.yaml"))),
        "Policy file present",
        "Using framework defaults"
      )
    },
    {
      key: "module-map",
      name: "Module map",
      why: "What exists in your codebase, kept truthful automatically.",
      class: "web",
      managedBy: "shared",
      area: "build",
      route: "#/build",
      source: PATHS.MODULE_MAP,
      state: counted(moduleCount, "module", "modules", "No module map yet")
    },
    {
      key: "profile",
      name: "Project profile",
      why: "The central configuration every workflow reads.",
      class: "web",
      managedBy: "you",
      area: "setup",
      route: "#/setup",
      source: PATHS.PROJECT_PROFILE,
      state: presence(profile !== null, "Profile present", "No profile yet")
    },
    {
      key: "capabilities",
      name: "Capabilities",
      why: "Switch feature areas on and off.",
      class: "web",
      managedBy: "you",
      area: "setup",
      route: "#/setup",
      source: PATHS.PROJECT_PROFILE,
      state: counted(
        activeCapabilities.length,
        "capability active",
        "capabilities active",
        "None active"
      )
    },
    {
      key: "packs",
      name: "Stack packs",
      why: "Stack-specific rules and patterns for your frameworks.",
      class: "web",
      managedBy: "you",
      area: "setup",
      route: "#/setup",
      source: "~/.paqad/packs",
      state: counted(packCount, "pack installed", "packs installed", "No packs installed")
    },
    {
      key: "providers",
      name: "Provider adapters",
      why: "The same governance for every AI tool you use.",
      class: "web",
      managedBy: "you",
      area: "setup",
      route: "#/setup",
      source: PATHS.CLAUDE_MD,
      state: counted(
        providerEntries.length,
        "entry file present",
        "entry files present",
        "No entry files yet"
      )
    },
    {
      key: "rag",
      name: "RAG configuration",
      why: "Your AI finds the right code by meaning, not filename.",
      class: "web",
      managedBy: "shared",
      area: "knowledge",
      route: "#/knowledge",
      source: PATHS.VECTORS_DIR,
      state: presence(
        intelligence?.rag_enabled === true && existsSync12(at2(PATHS.VECTORS_DIR)),
        "Enabled with an index",
        intelligence?.rag_enabled === true ? "Enabled, index not built" : "Disabled"
      )
    },
    {
      key: "design-tokens",
      name: "Design tokens",
      why: "The AI builds UI that matches your brand.",
      class: "web",
      managedBy: "shared",
      area: "knowledge",
      route: "#/knowledge",
      source: PATHS.DESIGN_TOKENS_FILE,
      state: presence(
        existsSync12(at2(PATHS.DESIGN_TOKENS_FILE)),
        "Token source present",
        "Not seeded yet"
      )
    },
    {
      key: "patterns",
      name: "Defect pattern library",
      why: "Mistakes from past projects, remembered so they never repeat.",
      class: "web",
      managedBy: "shared",
      area: "build",
      route: "#/build",
      source: "~/.paqad/patterns",
      state: counted(patternCount, "pattern stored", "patterns stored", "No patterns yet")
    },
    {
      key: "approvals",
      name: "Decisions and approvals",
      why: "Nothing risky proceeds without you.",
      class: "web",
      managedBy: "shared",
      area: "approvals",
      route: "#/approvals",
      source: PATHS.DECISIONS_DIR,
      state: counted(
        pendingPauses + moduleProposals,
        "item waiting on you",
        "items waiting on you",
        "Nothing needs you"
      )
    },
    {
      key: "workflow-runs",
      name: "Workflow execution",
      why: "The actual work happens in the conversation.",
      class: "prompt",
      managedBy: "paqad",
      area: "automation",
      route: "#/automation",
      source: PATHS.WORKFLOW_RUNS_DIR,
      state: counted(
        countEntries(at2(PATHS.WORKFLOW_RUNS_DIR)),
        "run recorded",
        "runs recorded",
        "No runs yet"
      )
    },
    {
      key: "specs",
      name: "Spec authoring",
      why: "Specs drive obligations and plans.",
      class: "prompt",
      managedBy: "paqad",
      area: "automation",
      route: "#/automation",
      source: PATHS.FEATURE_EVIDENCE_DIR,
      state: counted(countFeatureSpecs(projectRoot), "spec", "specs", "No specs yet")
    },
    {
      key: "module-proposals",
      name: "Module decision extraction",
      why: "New modules proposed from prompts land in your inbox.",
      class: "prompt",
      managedBy: "paqad",
      area: "approvals",
      route: "#/approvals",
      source: PATHS.PROSPECTIVE_DECISIONS_DIR,
      state: counted(
        moduleProposals,
        "proposal recorded",
        "proposals recorded",
        "No proposals yet"
      )
    },
    {
      key: "session",
      name: "Session handoff and context budget",
      why: "Work continues across sessions.",
      class: "prompt",
      managedBy: "paqad",
      area: "automation",
      route: "#/automation",
      source: PATHS.HANDOFF,
      state: presence(existsSync12(at2(PATHS.HANDOFF)), "Handoff recorded", "No handoff yet")
    },
    {
      key: "evidence-ledger",
      name: "Evidence ledger",
      why: "A permanent record no one can quietly rewrite.",
      class: "evidence",
      managedBy: "paqad",
      area: "trust",
      route: "#/trust",
      source: PATHS.FEATURE_EVIDENCE_DIR,
      state: counted(
        readAllFeatureEvidence(projectRoot).length,
        "entry",
        "entries",
        "No entries yet"
      )
    },
    {
      key: "receipts",
      name: "Receipts",
      why: "Who wrote it, who vouched for it, sealed.",
      class: "evidence",
      managedBy: "paqad",
      area: "trust",
      route: "#/trust",
      source: PATHS.FEATURE_EVIDENCE_DIR,
      state: counted(
        readAllFeatureReceipts(projectRoot).length,
        "receipt",
        "receipts",
        "No receipts yet"
      )
    },
    {
      key: "ai-bom",
      name: "AI bill of materials",
      why: "Exactly which AI models touched your code.",
      class: "evidence",
      managedBy: "paqad",
      area: "trust",
      route: "#/trust",
      source: PATHS.FEATURE_EVIDENCE_DIR,
      state: presence(
        projectAiBomFromFeatures(projectRoot, "0.0.0", "") !== null,
        "Document present",
        "No document yet"
      )
    },
    {
      key: "audit-log",
      name: "Audit log",
      why: "Every framework update and every web edit, recorded.",
      class: "evidence",
      managedBy: "paqad",
      area: "trust",
      route: "#/trust",
      source: PATHS.AUDIT_LOG,
      state: counted(countLines(at2(PATHS.AUDIT_LOG)), "entry", "entries", "No entries yet")
    },
    {
      key: "module-events",
      name: "Module events",
      why: "Who changed which module, when.",
      class: "evidence",
      managedBy: "paqad",
      area: "build",
      route: "#/build",
      source: PATHS.MODULE_MAP_EVENTS_LOG,
      state: counted(
        countLines(at2(PATHS.MODULE_MAP_EVENTS_LOG)),
        "event",
        "events",
        "No events yet"
      )
    },
    {
      key: "module-map-drift",
      name: "Module map drift report",
      why: "Where docs and reality diverge.",
      class: "evidence",
      managedBy: "paqad",
      area: "build",
      route: "#/build",
      source: PATHS.MODULE_MAP_DRIFT,
      state: driftReport === null ? { exists: false, detail: "No reconcile run yet" } : counted(
        Array.isArray(driftReport.findings) ? driftReport.findings.length : 0,
        "finding",
        "findings",
        "No drift found"
      )
    },
    {
      key: "module-health",
      name: "Module health",
      why: "Test status and coverage per module.",
      class: "evidence",
      managedBy: "paqad",
      area: "build",
      route: "#/build",
      source: PATHS.PLANNING_MODULE_HEALTH_DIR,
      state: counted(
        countEntries(at2(PATHS.PLANNING_MODULE_HEALTH_DIR)),
        "module tracked",
        "modules tracked",
        "No health data yet"
      )
    },
    {
      key: "stack-snapshot",
      name: "Stack snapshot and drift",
      why: "Your real stack, and when it shifts.",
      class: "evidence",
      managedBy: "paqad",
      area: "build",
      route: "#/build",
      source: PATHS.STACK_SNAPSHOT,
      state: presence(existsSync12(at2(PATHS.STACK_SNAPSHOT)), "Snapshot present", "No snapshot yet")
    },
    {
      key: "compliance",
      name: "Compliance reports",
      why: "Spec obligations covered by tests.",
      class: "evidence",
      managedBy: "paqad",
      area: "build",
      route: "#/build",
      source: PATHS.TRACEABILITY_MAP,
      state: presence(
        existsSync12(at2(PATHS.TRACEABILITY_MAP)),
        "Map present",
        "No compliance run yet"
      )
    },
    {
      key: "quality-baseline",
      name: "Quality baseline",
      why: "Quality can improve, never silently slip.",
      class: "evidence",
      managedBy: "paqad",
      area: "build",
      route: "#/build",
      source: PATHS.QUALITY_BASELINE,
      state: presence(
        existsSync12(at2(PATHS.QUALITY_BASELINE)),
        "Baseline recorded",
        "No baseline yet"
      )
    },
    {
      key: "pentest",
      name: "Pentest findings and retests",
      why: "Security posture over time.",
      class: "evidence",
      managedBy: "paqad",
      area: "build",
      route: "#/build",
      source: PATHS.PENTEST_RUNS_DIR,
      state: counted(
        countEntries(at2(PATHS.PENTEST_RUNS_DIR)),
        "run",
        "runs",
        "No pentest runs yet"
      )
    },
    {
      key: "rule-compliance",
      name: "Rule compliance results",
      why: "Project rules enforced on changes.",
      class: "evidence",
      managedBy: "paqad",
      area: "build",
      route: "#/build",
      source: PATHS.RULE_SCRIPTS_REPORT,
      state: presence(existsSync12(at2(PATHS.RULE_SCRIPTS_REPORT)), "Report present", "No report yet")
    },
    {
      key: "operations",
      name: "Safe operations",
      why: "One-click maintenance through the same code paths as the CLI.",
      class: "operation",
      managedBy: "shared",
      area: "setup",
      route: "#/setup",
      source: ".paqad",
      state: {
        exists: true,
        detail: "Reconcile, refresh, rebuild, doctor and update run as audited jobs",
        count: 10
      }
    }
  ];
  return {
    schemaVersion: 1,
    generatedAt: new Date(options.now ?? Date.now()).toISOString(),
    items
  };
}

// src/dashboard/markdown.ts
init_esm_shims();
var BAND_GLYPHS = {
  green: PAQAD_STATUS_GLYPH.good,
  amber: PAQAD_STATUS_GLYPH.needsLook,
  red: PAQAD_STATUS_GLYPH.failed,
  unknown: PAQAD_STATUS_GLYPH.skipped
};
function scoreText(section2) {
  if (section2.score === null) return "\u2014";
  return `${section2.score}%`;
}
function renderMarkdown(report2) {
  const lines = [];
  const name = report2.projectName ?? "(unnamed project)";
  lines.push(`# paqad-ai status \u2014 ${name}`);
  lines.push("");
  lines.push(`- Generated: ${report2.generatedAt}`);
  lines.push(`- Project root: ${report2.projectRoot}`);
  if (report2.frameworkVersion !== null) {
    lines.push(`- Framework version: ${report2.frameworkVersion}`);
  }
  if (report2.notOnboarded) {
    lines.push("");
    lines.push("> Project is not onboarded. Run `paqad-ai onboard` first.");
    return lines.join("\n");
  }
  lines.push(
    `- Overall: ${BAND_GLYPHS[report2.overallBand]} ${report2.overallScore !== null ? `${report2.overallScore}%` : "\u2014"} (${report2.overallBand})`
  );
  lines.push("");
  if (report2.attention.length > 0) {
    lines.push("## Needs your attention");
    lines.push("");
    for (const item of report2.attention) {
      const tag = item.severity === "critical" ? "**critical**" : item.severity;
      lines.push(`- [${tag}] ${item.message} (${item.sectionId})`);
    }
    lines.push("");
  }
  lines.push("## Sections");
  lines.push("");
  lines.push("| Section | Score | Band | Summary |");
  lines.push("| --- | ---: | --- | --- |");
  for (const section2 of report2.sections) {
    const score = scoreText(section2);
    lines.push(
      `| ${section2.title} | ${score} | ${BAND_GLYPHS[section2.band]} ${section2.band} | ${section2.summary} |`
    );
  }
  for (const section2 of report2.sections) {
    if (section2.metrics.length === 0) continue;
    lines.push("");
    lines.push(`### ${section2.title}`);
    lines.push("");
    for (const m of section2.metrics) {
      lines.push(`- ${m.label}: ${m.value}`);
    }
  }
  return lines.join("\n");
}

// src/dashboard/onboarding-checklist.ts
init_esm_shims();
import { existsSync as existsSync13, readdirSync as readdirSync4, readFileSync as readFileSync8 } from "fs";
import { join as join16 } from "path";
function dirHasEntries(path2) {
  try {
    return existsSync13(path2) && readdirSync4(path2).some((name) => !name.startsWith("."));
  } catch {
    return false;
  }
}
function buildOnboardingChecklist(projectRoot) {
  const at2 = (relative2) => join16(projectRoot, relative2);
  const agentConnected = [PATHS.CLAUDE_MD, PATHS.AGENTS_MD, PATHS.ANTIGRAVITY_MD, PATHS.GEMINI_MD].some(
    (entry) => existsSync13(at2(entry))
  ) && existsSync13(at2(PATHS.ONBOARDING_MANIFEST));
  const firstGatePassed = readAllFeatureEvidence(projectRoot).some((row) => row.verdict === "pass");
  const firstDecisionResolved = dirHasEntries(at2(PATHS.DECISIONS_RESOLVED_DIR));
  const receiptAvailable = readAllFeatureReceipts(projectRoot).length > 0;
  let instructionEdited = false;
  const audit = at2(PATHS.AUDIT_LOG);
  if (existsSync13(audit)) {
    try {
      instructionEdited = readFileSync8(audit, "utf8").includes("dashboard.instructions.write");
    } catch {
      instructionEdited = false;
    }
  }
  const steps = [
    {
      key: "connect-agent",
      label: "Connect your agent",
      route: "#/setup",
      done: agentConnected,
      detail: agentConnected ? "Your agent reads the entry file on every session." : "Run paqad-ai onboard so your agent loads the project contract."
    },
    {
      key: "first-gate",
      label: "Watch your first gate pass",
      route: "#/trust",
      done: firstGatePassed,
      detail: firstGatePassed ? "A verification gate has passed and is on the ledger." : "Ship one verified change and the gate lands here."
    },
    {
      key: "first-decision",
      label: "Approve your first decision",
      route: "#/approvals",
      done: firstDecisionResolved,
      detail: firstDecisionResolved ? "You have resolved a decision. The agent picked it up." : "When the agent pauses, the question arrives in Approvals."
    },
    {
      key: "first-receipt",
      label: "Open your first receipt",
      route: "#/trust",
      done: false,
      detail: receiptAvailable ? "A sealed receipt is waiting in Trust." : "Receipts appear after your first verified change."
    },
    {
      key: "edit-instruction",
      label: "Edit one instruction file",
      route: "#/knowledge",
      done: instructionEdited,
      detail: instructionEdited ? "Saved. Agents reload this automatically on their next session." : "Change one rule here and every agent learns it."
    }
  ];
  return {
    steps,
    complete: steps.filter((step) => step.key !== "first-receipt").every((step) => step.done),
    receiptAvailable
  };
}

// src/dashboard/ops-jobs.ts
init_esm_shims();

// src/onboarding/rules-refresh.ts
init_esm_shims();
var import_fast_glob2 = __toESM(require_out(), 1);
import { rmSync as rmSync3 } from "fs";
import { join as join17 } from "path";
var PRESERVED_RULE_FILES = ["module-map.yml", "rule-script-map.yml"];
async function refreshProjectRules(projectRoot, profile, options) {
  const runtimeRoot = options.runtimeRoot ?? getRuntimeRoot();
  const routing = {
    active_capabilities: profile.active_capabilities,
    stack_profile: profile.stack_profile
  };
  const resolved = await new Resolver({ runtimeRoot }).resolve(routing);
  const ruleFiles = await generateProjectRules(resolved.rules);
  const rulesDirAbs = join17(projectRoot, PATHS.RULES_DIR);
  const existing = await (0, import_fast_glob2.default)("**/*", { cwd: rulesDirAbs, onlyFiles: true, dot: false });
  const preserved = existing.filter((rel) => PRESERVED_RULE_FILES.includes(rel));
  const deletable = existing.filter((rel) => !PRESERVED_RULE_FILES.includes(rel));
  const report2 = {
    dryRun: !options.force,
    deleted: deletable.map((rel) => toPosixPath(join17(PATHS.RULES_DIR, rel))).sort(),
    written: ruleFiles.map((file) => toPosixPath(file.path)).sort(),
    preserved: preserved.map((rel) => toPosixPath(join17(PATHS.RULES_DIR, rel))).sort()
  };
  if (!options.force) {
    return report2;
  }
  for (const rel of deletable) {
    rmSync3(join17(rulesDirAbs, rel), { force: true });
  }
  writeGeneratedFiles(projectRoot, ruleFiles);
  return report2;
}

// src/site-map/gatherer.ts
init_esm_shims();
import { readFileSync as readFileSync9 } from "fs";
import { basename, join as join18 } from "path";
var import_fast_glob3 = __toESM(require_out(), 1);

// src/site-map/extraction.ts
init_esm_shims();
import { createHash as createHash3 } from "crypto";
var SITE_MAP_EXTRACTION_SCHEMA_VERSION = 1;
var NODE_CLI_SOURCE = "node-cli";
var GENERIC_SOURCE = "generic";
var REACT_ROUTES_SOURCE = "react-routes";
var LARAVEL_ROUTES_SOURCE = "laravel-routes";
var LARAVEL_ARTISAN_SOURCE = "laravel-artisan-routes";
var LARAVEL_CONSOLE_SOURCE = "laravel-console";
var LARAVEL_SCHEDULE_SOURCE = "laravel-schedule";
var LARAVEL_JOBS_SOURCE = "laravel-jobs";
var LARAVEL_MAIL_SOURCE = "laravel-mail";
var UNRESOLVED_LIST_CAP = 10;
function toEvidence(file, line) {
  return line === void 0 ? { file } : { file, line };
}
function toRawId(source, identifier) {
  const slug = slugify(identifier);
  return slug.length > 0 ? `${source}-${slug}` : source;
}
function extractNodeCliSurfaces(records) {
  const surfaces = [];
  for (const record of records) {
    if (record.hidden) continue;
    const description = record.description?.trim();
    surfaces.push({
      raw_id: toRawId(NODE_CLI_SOURCE, record.name),
      kind: "cli-command",
      label: description && description.length > 0 ? description : record.name,
      evidence: [toEvidence(record.file, record.line)],
      entry: { kind: "bin", value: record.name },
      derivation: "static",
      confidence: "high",
      source: NODE_CLI_SOURCE
    });
  }
  return surfaces;
}
function extractGenericSurfaces(records) {
  return records.map((record) => {
    const label = record.label?.trim();
    return {
      raw_id: toRawId(GENERIC_SOURCE, record.identifier),
      kind: record.kind,
      label: label && label.length > 0 ? label : record.identifier,
      evidence: [toEvidence(record.file, record.line)],
      ...record.entry ? { entry: record.entry } : {},
      derivation: "static",
      confidence: "medium",
      source: GENERIC_SOURCE
    };
  });
}
function extractReactRouteSurfaces(records) {
  return records.map((record) => {
    const component = record.component?.trim();
    return {
      raw_id: toRawId(REACT_ROUTES_SOURCE, record.path),
      kind: "page",
      label: component && component.length > 0 ? component : record.path,
      evidence: [toEvidence(record.file, record.line)],
      entry: { kind: "url", value: record.path },
      derivation: "static",
      confidence: "high",
      source: REACT_ROUTES_SOURCE
    };
  });
}
function extractLaravelRouteSurfaces(records) {
  return records.map((record) => {
    const uri = record.uri.replace(/^\/+/, "");
    const isApi = uri === "api" || uri.startsWith("api/");
    const action = record.action?.trim();
    return {
      raw_id: toRawId(LARAVEL_ROUTES_SOURCE, `${record.method} ${uri}`),
      kind: isApi ? "api" : "page",
      label: action && action.length > 0 ? action : `${record.method} /${uri}`,
      evidence: [toEvidence(record.file, record.line)],
      entry: { kind: "url", value: `/${uri}` },
      derivation: "static",
      confidence: "high",
      source: LARAVEL_ROUTES_SOURCE
    };
  });
}
var ANSI_RE = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, "g");
var CRON_LINE_RE = /^(@\w+|(?:[\d*,/-]+\s+){4,5}[\d*,/-]+)\s+(.+)$/;
var MODULE_NS_RE = /(?:^|\\)Modules\\([^\\]+)\\/;
function normalizeUri(uri) {
  return uri.replace(/^\/+/, "");
}
function moduleFromAction(action) {
  if (action === void 0) return void 0;
  const match = MODULE_NS_RE.exec(action);
  return match ? match[1] : void 0;
}
function normalizeMiddleware(raw) {
  const tokens = Array.isArray(raw) ? raw : typeof raw === "string" ? raw.split(/[\n,]/) : [];
  return tokens.map((token) => typeof token === "string" ? token.trim() : "").filter((token) => token.length > 0);
}
function parseArtisanRouteList(stdout) {
  let parsed;
  try {
    parsed = JSON.parse(stdout);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  const records = [];
  for (const entry of parsed) {
    if (typeof entry !== "object" || entry === null) continue;
    const row = entry;
    const method = typeof row.method === "string" ? row.method : "";
    const uri = typeof row.uri === "string" ? row.uri : "";
    if (method.length === 0 || uri.length === 0) continue;
    const middleware = normalizeMiddleware(row.middleware);
    records.push({
      method,
      uri,
      ...typeof row.name === "string" && row.name.length > 0 ? { name: row.name } : {},
      ...typeof row.action === "string" && row.action.length > 0 ? { action: row.action } : {},
      ...middleware.length > 0 ? { middleware } : {},
      ...typeof row.domain === "string" && row.domain.length > 0 ? { domain: row.domain } : {}
    });
  }
  return records;
}
function parseArtisanCommandList(stdout) {
  let parsed;
  try {
    parsed = JSON.parse(stdout);
  } catch {
    return [];
  }
  const list2 = Array.isArray(parsed) ? parsed : typeof parsed === "object" && parsed !== null && Array.isArray(parsed.commands) ? parsed.commands : [];
  const records = [];
  for (const entry of list2) {
    if (typeof entry !== "object" || entry === null) continue;
    const row = entry;
    const name = typeof row.name === "string" ? row.name.trim() : "";
    if (name.length === 0) continue;
    records.push({
      name,
      ...typeof row.description === "string" && row.description.length > 0 ? { description: row.description } : {},
      ...row.hidden === true ? { hidden: true } : {}
    });
  }
  return records;
}
function parseArtisanScheduleList(stdout) {
  const records = [];
  for (const rawLine of stdout.split("\n")) {
    const line = rawLine.replace(ANSI_RE, "").trim();
    const match = CRON_LINE_RE.exec(line);
    if (!match) continue;
    const expression = match[1].trim();
    const command = match[2].replace(/\s+\.{2,}.*$/, "").replace(/\s+Next Due:.*$/, "").trim();
    records.push({ expression, command });
  }
  return records;
}
function pointersToEvidence(pointers, note) {
  return pointers.map((pointer) => ({ ...pointer, note }));
}
function extractLaravelArtisanRoutes(records, resolve18) {
  const surfaces = [];
  const unresolved = [];
  for (const record of records) {
    const uri = normalizeUri(record.uri);
    const isApi = uri === "api" || uri.startsWith("api/");
    const primaryMethod = record.method.split(/[|,]/)[0].trim() || record.method;
    const route = `${primaryMethod} /${uri}`;
    const pointers = resolve18(record);
    if (pointers.length === 0) {
      unresolved.push(route);
      continue;
    }
    const action = record.action?.trim();
    const module = moduleFromAction(record.action);
    surfaces.push({
      raw_id: toRawId(LARAVEL_ARTISAN_SOURCE, `${primaryMethod} ${uri}`),
      kind: isApi ? "api" : "page",
      label: action && action.length > 0 && action !== "Closure" ? action : route,
      evidence: pointersToEvidence(pointers, `php artisan route:list (${route})`),
      entry: { kind: "url", value: `/${uri}` },
      derivation: "static",
      confidence: "high",
      source: LARAVEL_ARTISAN_SOURCE,
      ...record.middleware && record.middleware.length > 0 ? { guards: record.middleware } : {},
      ...module ? { module } : {}
    });
  }
  return { surfaces, unresolved };
}
function extractLaravelConsoleCommands(records, locate2) {
  const surfaces = [];
  for (const record of records) {
    if (record.hidden) continue;
    const pointer = locate2(record.name);
    if (!pointer) continue;
    const description = record.description?.trim();
    surfaces.push({
      raw_id: toRawId(LARAVEL_CONSOLE_SOURCE, record.name),
      kind: "cli-command",
      label: description && description.length > 0 ? description : record.name,
      evidence: pointersToEvidence([pointer], `php artisan list (${record.name})`),
      entry: { kind: "artisan", value: record.name },
      derivation: "static",
      confidence: "high",
      source: LARAVEL_CONSOLE_SOURCE
    });
  }
  return surfaces;
}
function extractLaravelScheduledJobs(records, locate2) {
  const surfaces = [];
  const unresolved = [];
  for (const record of records) {
    const pointer = locate2(record.command);
    if (!pointer) {
      unresolved.push(`${record.expression} ${record.command}`);
      continue;
    }
    surfaces.push({
      raw_id: toRawId(LARAVEL_SCHEDULE_SOURCE, `${record.expression} ${record.command}`),
      kind: "job",
      label: record.command,
      evidence: pointersToEvidence([pointer], `php artisan schedule:list (${record.expression})`),
      entry: { kind: "schedule", value: record.expression },
      derivation: "static",
      confidence: "high",
      source: LARAVEL_SCHEDULE_SOURCE
    });
  }
  return { surfaces, unresolved };
}
function unresolvedBlockedCheck(extractor, noun, items, cause = "") {
  if (items.length === 0) return null;
  const shown = items.slice(0, UNRESOLVED_LIST_CAP).join(", ");
  const more = items.length > UNRESOLVED_LIST_CAP ? `, and ${items.length - UNRESOLVED_LIST_CAP} more` : "";
  return {
    check: `${extractor} source tracing`,
    reason: `${items.length} ${noun} could not be traced to a source file${cause}: ${shown}${more}`,
    install_hint: "Point each one at a class in your project (a closure has no file to cite), or add it to docs/site-map/app-map.yaml by hand with the file that defines it."
  };
}
function extractLaravelClassSurfaces(records, kind, source) {
  return records.map((record) => ({
    raw_id: toRawId(source, record.className),
    kind,
    label: record.className,
    evidence: [toEvidence(record.file, record.line)],
    derivation: "static",
    confidence: "high",
    source,
    ...record.module ? { module: record.module } : {}
  }));
}
function extractLaravelJobs(records) {
  return extractLaravelClassSurfaces(records, "job", LARAVEL_JOBS_SOURCE);
}
function extractLaravelMailables(records) {
  return extractLaravelClassSurfaces(records, "email", LARAVEL_MAIL_SOURCE);
}
function mergeEvidence(a, b) {
  const seen = /* @__PURE__ */ new Set();
  const merged = [];
  for (const evidence of [...a, ...b]) {
    const key = `${evidence.file}:${evidence.line ?? ""}:${evidence.note ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(evidence);
  }
  return merged;
}
function dedupeSurfaces(surfaces) {
  const byId = /* @__PURE__ */ new Map();
  for (const surface of surfaces) {
    const existing = byId.get(surface.raw_id);
    if (!existing) {
      byId.set(surface.raw_id, { ...surface, evidence: [...surface.evidence] });
      continue;
    }
    existing.evidence = mergeEvidence(existing.evidence, surface.evidence);
  }
  return [...byId.values()];
}
function sortExtractedSurfaces(surfaces) {
  return [...surfaces].sort((a, b) => a.raw_id.localeCompare(b.raw_id));
}
function extractionFingerprint(surfaces) {
  const payload = JSON.stringify(
    [...surfaces].map((surface) => ({
      raw_id: surface.raw_id,
      kind: surface.kind,
      evidence: surface.evidence
    })).sort((a, b) => a.raw_id.localeCompare(b.raw_id))
  );
  return createHash3("sha256").update(payload).digest("hex").slice(0, 12);
}
function blockedExtractor(extractor, reason2, installHint) {
  return {
    extractor,
    available: false,
    surfaces: [],
    blocked: { check: `${extractor} surface extraction`, reason: reason2, install_hint: installHint }
  };
}
function assembleExtraction(outputs, appKind) {
  const surfaces = sortExtractedSurfaces(
    dedupeSurfaces(
      outputs.filter((output) => output.available).flatMap((output) => output.surfaces)
    )
  );
  const blockedChecks = outputs.flatMap((output) => output.blocked ? [output.blocked] : []);
  const extractorsRan = outputs.filter((output) => output.available).length;
  return {
    schema_version: SITE_MAP_EXTRACTION_SCHEMA_VERSION,
    app_kind: appKind,
    surfaces,
    blocked_checks: blockedChecks,
    fingerprint: extractionFingerprint(surfaces),
    extractors_ran: extractorsRan,
    low_confidence_fallback: extractorsRan === 0
  };
}

// src/site-map/laravel-sources.ts
init_esm_shims();
function lineAt(content, index) {
  return content.slice(0, index).split("\n").length;
}
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function normalizeDir(dir) {
  const posix = dir.replace(/\\/g, "/").replace(/^\.\//, "").replace(/^\/+/, "");
  if (posix === "" || posix === ".") return "";
  return posix.endsWith("/") ? posix : `${posix}/`;
}
function normalizePrefix(prefix) {
  const trimmed = prefix.replace(/^\\+/, "").replace(/\\+$/, "");
  return trimmed.length === 0 ? "" : `${trimmed}\\`;
}
function psr4EntriesFrom(section2) {
  if (typeof section2 !== "object" || section2 === null || Array.isArray(section2)) return [];
  const entries = [];
  for (const [prefix, value] of Object.entries(section2)) {
    const dirs = (Array.isArray(value) ? value : [value]).filter((dir) => typeof dir === "string").map(normalizeDir);
    if (dirs.length > 0) entries.push({ prefix: normalizePrefix(prefix), dirs });
  }
  return entries;
}
function parseComposerPsr4(json) {
  let parsed;
  try {
    parsed = JSON.parse(json);
  } catch {
    return [];
  }
  if (typeof parsed !== "object" || parsed === null) return [];
  const composer = parsed;
  return [
    ...psr4EntriesFrom(composer.autoload?.["psr-4"]),
    ...psr4EntriesFrom(composer["autoload-dev"]?.["psr-4"])
  ];
}
var VENDOR_PSR4_ENTRY_RE = /'((?:[^'\\]|\\.)*)'\s*=>\s*array\s*\(([^)]*)\)/g;
var VENDOR_PSR4_DIR_RE = /\$(vendorDir|baseDir)\s*\.\s*'([^']*)'/g;
function parseVendorPsr4(php) {
  const entries = [];
  VENDOR_PSR4_ENTRY_RE.lastIndex = 0;
  let match;
  while ((match = VENDOR_PSR4_ENTRY_RE.exec(php)) !== null) {
    const prefix = normalizePrefix(match[1].replace(/\\\\/g, "\\"));
    const dirs = [];
    VENDOR_PSR4_DIR_RE.lastIndex = 0;
    let dir;
    while ((dir = VENDOR_PSR4_DIR_RE.exec(match[2])) !== null) {
      dirs.push(normalizeDir(dir[1] === "vendorDir" ? `vendor${dir[2]}` : dir[2]));
    }
    if (dirs.length > 0) entries.push({ prefix, dirs });
  }
  return entries;
}
function classToCandidatePaths(fqcn, entries) {
  const className = fqcn.replace(/^\\+/, "");
  const candidates = [];
  const matching = entries.filter((entry) => className.startsWith(entry.prefix)).sort((a, b) => b.prefix.length - a.prefix.length);
  for (const entry of matching) {
    const relative2 = `${className.slice(entry.prefix.length).replace(/\\/g, "/")}.php`;
    for (const dir of entry.dirs) {
      const candidate = `${dir}${relative2}`;
      if (!candidates.includes(candidate)) candidates.push(candidate);
    }
  }
  return candidates;
}
function parseRouteAction(action) {
  const trimmed = action?.trim() ?? "";
  if (trimmed.length === 0 || trimmed === "Closure") return null;
  const at2 = trimmed.lastIndexOf("@");
  if (at2 === -1) return { className: trimmed, method: "__invoke" };
  const className = trimmed.slice(0, at2);
  const method = trimmed.slice(at2 + 1);
  if (className.length === 0) return null;
  return { className, method: method.length > 0 ? method : "__invoke" };
}
function findPhpMethodLine(content, method) {
  const match = new RegExp(`\\bfunction\\s+&?${escapeRegExp(method)}\\s*\\(`).exec(content);
  return match ? lineAt(content, match.index) : void 0;
}
var CONSOLE_DECLARATION_RES = [
  /\$signature\s*=\s*(['"])([\s\S]*?)\1/g,
  /protected\s+\$name\s*=\s*(['"])([\s\S]*?)\1/g,
  /#\[AsCommand\(\s*(?:name\s*:\s*)?(['"])([\s\S]*?)\1/g,
  /Artisan::command\(\s*(['"])([\s\S]*?)\1/g
];
function extractConsoleCommandNames(content) {
  const declarations = [];
  for (const re of CONSOLE_DECLARATION_RES) {
    re.lastIndex = 0;
    let match;
    while ((match = re.exec(content)) !== null) {
      const name = match[2].trim().split(/\s+/)[0];
      if (name.length === 0) continue;
      declarations.push({ name, line: lineAt(content, match.index) });
    }
  }
  return declarations.sort((a, b) => a.line - b.line);
}
function isArtisanToken(token) {
  return token === "artisan" || token.endsWith("/artisan");
}
function scheduleToken(command) {
  const tokens = command.trim().split(/\s+/).map((token2) => token2.replace(/^['"]|['"]$/g, ""));
  const artisan = tokens.findIndex(isArtisanToken);
  const token = artisan >= 0 && artisan + 1 < tokens.length ? tokens[artisan + 1] : tokens[0];
  return token.split("\\").pop();
}
function scheduledCommandName(command) {
  return scheduleToken(command);
}
var SCHEDULE_CALL_RE = /Schedule::|\$schedule\s*->|->\s*(?:command|job|call|exec)\s*\(/;
function findScheduleLine(content, command, commandClass) {
  const token = scheduleToken(command);
  if (token.length === 0) return void 0;
  const escaped = escapeRegExp(token);
  const alternatives = [`(['"])${escaped}(?=[\\s'"])`, `\\b${escaped}::class\\b`];
  if (commandClass) alternatives.push(`\\b${escapeRegExp(commandClass)}::class\\b`);
  const lines = content.split("\n");
  let first;
  for (const match of content.matchAll(new RegExp(alternatives.join("|"), "g"))) {
    const line = lineAt(content, match.index);
    if (SCHEDULE_CALL_RE.test(lines[line - 1])) return line;
    first ??= line;
  }
  return first;
}
var PLACEHOLDER_RE = /<[^>]+>/;
var ENV_ASSIGNMENT_RE = /^[A-Za-z_][A-Za-z0-9_]*=/;
var SHELL_OPERATOR_RE = /&&|\|\||;|\|/;
function resolveArtisanInvocation(commands) {
  for (const key of ["migrate", "test", "dev"]) {
    const command = commands?.[key];
    if (typeof command !== "string") continue;
    const tokens = command.trim().split(/\s+/);
    const artisan = tokens.findIndex(isArtisanToken);
    if (artisan === -1) continue;
    let prefix = tokens.slice(0, artisan + 1);
    while (prefix.length > 1 && ENV_ASSIGNMENT_RE.test(prefix[0])) prefix = prefix.slice(1);
    if (prefix.some((token) => PLACEHOLDER_RE.test(token))) {
      return {
        blocked: `your project's ${key} command still holds a placeholder: "${command}". Put the real service name in commands.${key} in .paqad/project-profile.yaml, then run the map again.`
      };
    }
    if (prefix.some((token) => SHELL_OPERATOR_RE.test(token))) {
      return {
        blocked: `your project's ${key} command chains shell commands before artisan: "${command}". paqad runs artisan without a shell, so set commands.${key} in .paqad/project-profile.yaml to a single command that ends in artisan (for example "vendor/bin/sail artisan migrate"), then run the map again.`
      };
    }
    if (prefix[0] === "sail") prefix = ["vendor/bin/sail", ...prefix.slice(1)];
    return { argv: withComposeNoTty(prefix) };
  }
  return { argv: ["php", "artisan"] };
}
function withComposeNoTty(argv) {
  const composeAt = argv[0] === "docker-compose" ? 0 : argv[0] === "docker" && argv[1] === "compose" ? 1 : -1;
  if (composeAt === -1 || argv.includes("-T")) return argv;
  const sub = argv.findIndex(
    (token, index) => index > composeAt && (token === "exec" || token === "run")
  );
  if (sub === -1) return argv;
  return [...argv.slice(0, sub + 1), "-T", ...argv.slice(sub + 1)];
}
function artisanRunner(argv) {
  const first = argv[0] ?? "";
  if (first.endsWith("sail")) return "sail";
  if (first === "docker" || first === "docker-compose") return "docker";
  return "php";
}
function routeKey(uri) {
  return uri.replace(/^\/+/, "").replace(/\/+$/, "");
}
function methodMatches(staticMethod, artisanMethods) {
  return staticMethod === "ANY" || staticMethod === "MATCH" || artisanMethods.includes(staticMethod);
}
var PRIMARY_ROUTE_FILES = /* @__PURE__ */ new Set(["routes/web.php", "routes/api.php"]);
function uniqueDeclaration(matches) {
  if (matches.length === 1) return matches[0];
  const primary = matches.filter((route) => PRIMARY_ROUTE_FILES.has(route.file));
  return primary.length === 1 ? primary[0] : void 0;
}
function createArtisanRouteResolver(input) {
  const fileCache = /* @__PURE__ */ new Map();
  const read = (path2) => {
    if (!fileCache.has(path2)) fileCache.set(path2, input.readFile(path2));
    return fileCache.get(path2);
  };
  return (record) => {
    const pointers = [];
    const methods = record.method.toUpperCase().split(/[|,]/);
    const key = routeKey(record.uri);
    const declared = uniqueDeclaration(
      input.staticRoutes.filter(
        (route) => routeKey(route.uri) === key && methodMatches(route.method, methods)
      )
    );
    if (declared) {
      pointers.push(
        declared.line === void 0 ? { file: declared.file } : { file: declared.file, line: declared.line }
      );
    }
    const action = parseRouteAction(record.action);
    if (action) {
      for (const candidate of classToCandidatePaths(action.className, input.psr4)) {
        const content = read(candidate);
        if (content === null) continue;
        const line = findPhpMethodLine(content, action.method);
        pointers.push(line === void 0 ? { file: candidate } : { file: candidate, line });
        break;
      }
    }
    return pointers;
  };
}

// src/site-map/transitions.ts
init_esm_shims();
function lineOf(content, index) {
  return content.slice(0, index).split("\n").length;
}
function collect(records, pattern, trigger, confidence) {
  const transitions = [];
  for (const record of records) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(record.content)) !== null) {
      transitions.push({
        from_raw_id: record.from_raw_id,
        to_target: match[1],
        trigger,
        evidence: [{ file: record.file, line: lineOf(record.content, match.index) }],
        confidence
      });
    }
  }
  return transitions;
}
var REDIRECT_ROUTE_RE = /\bredirect\(\s*\)\s*->\s*route\(\s*['"]([^'"]+)['"]/g;
var TO_ROUTE_RE = /\bto_route\(\s*['"]([^'"]+)['"]/g;
var REDIRECT_PATH_RE = /\bredirect\(\s*['"]([^'"]+)['"]/g;
var INERTIA_RENDER_RE = /\bInertia::render\(\s*['"]([^'"]+)['"]/g;
var VIEW_RE = /\bview\(\s*['"]([^'"]+)['"]/g;
function detectLaravelTransitions(records) {
  return [
    ...collect(records, REDIRECT_ROUTE_RE, "redirect", "high"),
    ...collect(records, TO_ROUTE_RE, "redirect", "high"),
    ...collect(records, REDIRECT_PATH_RE, "redirect", "high"),
    ...collect(records, INERTIA_RENDER_RE, "render", "high"),
    ...collect(records, VIEW_RE, "render", "low")
  ];
}
var NAVIGATE_RE = /\bnavigate\(\s*['"]([^'"]+)['"]/g;
var LINK_TO_RE = /<Link\b[^>]*?\bto=\s*['"]([^'"]+)['"]/g;
var NAVIGATE_JSX_RE = /<Navigate\b[^>]*?\bto=\s*['"]([^'"]+)['"]/g;
function detectReactRouterTransitions(records) {
  return [
    ...collect(records, NAVIGATE_RE, "navigate", "high"),
    ...collect(records, LINK_TO_RE, "link", "high"),
    ...collect(records, NAVIGATE_JSX_RE, "redirect", "high")
  ];
}
var CLI_DISPATCH_RE = /\b(?:runCommand|invokeCommand|dispatchCommand)\(\s*['"]([^'"]+)['"]/g;
function detectNodeCliTransitions(records) {
  return collect(records, CLI_DISPATCH_RE, "invoke", "low");
}
function resolveTransitions(transitions, surfaces) {
  const byEntryValue = /* @__PURE__ */ new Map();
  for (const surface of surfaces) {
    const value = surface.entry?.value;
    if (value !== void 0 && !byEntryValue.has(value)) byEntryValue.set(value, surface.id);
  }
  const resolved = [];
  let dropped = 0;
  for (const transition of transitions) {
    const to = byEntryValue.get(transition.to_target);
    if (to === void 0) {
      dropped += 1;
      continue;
    }
    resolved.push({
      from_id: transition.from_raw_id,
      transition: {
        to,
        trigger: transition.trigger,
        evidence: transition.evidence,
        confidence: transition.confidence
      }
    });
  }
  return { resolved, dropped };
}
function edgeKey(resolved) {
  const anchor = resolved.transition.evidence;
  const first = Array.isArray(anchor) ? anchor[0] : anchor;
  const file = first?.file ?? "";
  const line = first?.line ?? "";
  return `${resolved.from_id}\0${resolved.transition.to}\0${resolved.transition.trigger}\0${file}:${line}`;
}
function attachResolvedTransitions(surfaces, resolved) {
  const byFrom = /* @__PURE__ */ new Map();
  const seen = /* @__PURE__ */ new Set();
  for (const edge of resolved) {
    const key = edgeKey(edge);
    if (seen.has(key)) continue;
    seen.add(key);
    const list2 = byFrom.get(edge.from_id) ?? [];
    list2.push(edge.transition);
    byFrom.set(edge.from_id, list2);
  }
  return surfaces.map((surface) => {
    const edges = byFrom.get(surface.id);
    if (edges === void 0) return surface;
    return { ...surface, transitions: [...surface.transitions ?? [], ...edges] };
  });
}
function buildUnresolvedLinksCheck(dropped) {
  if (dropped <= 0) return null;
  const noun = dropped === 1 ? "link" : "links";
  const verb = dropped === 1 ? "was" : "were";
  return {
    check: "transition-resolution",
    reason: `${dropped} navigation ${noun} in the code could not be matched to a mapped surface, so ${verb} dropped rather than guessed.`,
    install_hint: "Add the missing target surface(s) to docs/site-map/app-map.yaml (with the route name, URL path, or command name the code navigates to as its entry), then re-run `sitemap draft`."
  };
}

// src/site-map/gatherer.ts
var FRAMEWORK_SIGNALS = [
  { dep: "electron", kind: "desktop" },
  { dep: "react-native", kind: "mobile" },
  { dep: "expo", kind: "mobile" },
  { dep: "next", kind: "web" },
  { dep: "gatsby", kind: "web" },
  { dep: "astro", kind: "web" },
  { dep: "@remix-run/react", kind: "web" },
  { dep: "@sveltejs/kit", kind: "web" },
  { dep: "vue", kind: "web" },
  { dep: "svelte", kind: "web" },
  { dep: "@nestjs/core", kind: "api" },
  { dep: "express", kind: "api" },
  { dep: "fastify", kind: "api" },
  { dep: "koa", kind: "api" },
  { dep: "hono", kind: "api" },
  { dep: "commander", kind: "cli" },
  { dep: "yargs", kind: "cli" },
  { dep: "oclif", kind: "cli" }
];
var SOURCE_GLOBS2 = ["**/*.{ts,tsx,js,jsx,mjs,cjs}"];
var SOURCE_IGNORE = [
  "**/node_modules/**",
  "**/dist/**",
  "**/build/**",
  "**/out/**",
  "**/coverage/**",
  "**/*.d.ts",
  "**/*.test.*",
  "**/*.spec.*",
  "**/tests/**",
  "**/__tests__/**"
];
var MAX_SCANNED_FILES = 4e3;
function readManifest(projectRoot) {
  try {
    return JSON.parse(readFileSync9(join18(projectRoot, "package.json"), "utf8"));
  } catch {
    return {};
  }
}
function dependencyNames(manifest) {
  return /* @__PURE__ */ new Set([
    ...Object.keys(manifest.dependencies ?? {}),
    ...Object.keys(manifest.devDependencies ?? {}),
    ...Object.keys(manifest.peerDependencies ?? {})
  ]);
}
function detectAppKind(manifest, deps) {
  for (const signal of FRAMEWORK_SIGNALS) {
    if (deps.has(signal.dep)) return signal.kind;
  }
  if (manifest.bin !== void 0) return "cli";
  return "service";
}
function detectFrameworks(deps) {
  const seen = /* @__PURE__ */ new Set();
  const frameworks = [];
  for (const signal of FRAMEWORK_SIGNALS) {
    if (deps.has(signal.dep) && !seen.has(signal.dep)) {
      seen.add(signal.dep);
      frameworks.push(signal.dep);
    }
  }
  return frameworks;
}
function lineOf2(content, index) {
  let line = 1;
  for (let i = 0; i < index && i < content.length; i += 1) {
    if (content[i] === "\n") line += 1;
  }
  return line;
}
var COMMAND_RE = /(?:new Command\(|\.command\()\s*(['"`])([^'"`]+)\1/g;
var DESCRIBE_RE = /\.description\(\s*(['"`])([^'"`]*)\1/;
function scanFileForCommands(relFile, content) {
  const records = [];
  COMMAND_RE.lastIndex = 0;
  let match;
  while ((match = COMMAND_RE.exec(content)) !== null) {
    const name = match[2].trim();
    if (name.length === 0) continue;
    const tail2 = content.slice(match.index + match[0].length, match.index + match[0].length + 400);
    const describe = DESCRIBE_RE.exec(tail2);
    records.push({
      name,
      ...describe && describe[2].length > 0 ? { description: describe[2] } : {},
      file: relFile,
      line: lineOf2(content, match.index)
    });
  }
  return records;
}
async function scanCliCommands(projectRoot) {
  const files = (await (0, import_fast_glob3.default)(SOURCE_GLOBS2, { cwd: projectRoot, ignore: SOURCE_IGNORE, dot: false })).slice(0, MAX_SCANNED_FILES);
  const byName = /* @__PURE__ */ new Map();
  for (const file of files) {
    let content;
    try {
      content = readFileSync9(join18(projectRoot, file), "utf8");
    } catch {
      continue;
    }
    if (!content.includes("Command(")) continue;
    for (const record of scanFileForCommands(toPosixPath(file), content)) {
      if (!byName.has(record.name)) byName.set(record.name, record);
    }
  }
  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));
}
var ROUTE_CONVENTIONS = [
  "**/app/**/page.{tsx,jsx,ts,js}",
  "**/pages/**/*.{tsx,jsx}",
  "**/src/routes/**/+page.{svelte,ts,js}"
];
var ROUTE_EXCLUDE = /* @__PURE__ */ new Set(["_app", "_document", "_error"]);
var REACT_JSX_ROUTE_RE = /<Route\b[^>]*\bpath=(['"])([^'"]+)\1[^>]*?(?:element=\{<\s*([A-Za-z0-9_]+))?/g;
var REACT_OBJECT_ROUTE_RE = /\bpath:\s*(['"])([^'"]+)\1\s*,\s*(?:element:\s*<\s*([A-Za-z0-9_]+))?/g;
function scanFileForReactRoutes(relFile, content) {
  const records = [];
  for (const re of [REACT_JSX_ROUTE_RE, REACT_OBJECT_ROUTE_RE]) {
    re.lastIndex = 0;
    let match;
    while ((match = re.exec(content)) !== null) {
      const path2 = match[2].trim();
      if (path2.length === 0) continue;
      records.push({
        path: path2,
        ...match[3] ? { component: match[3] } : {},
        file: relFile,
        line: lineOf2(content, match.index)
      });
    }
  }
  return records;
}
async function scanReactRoutes(projectRoot) {
  const files = (await (0, import_fast_glob3.default)(["**/*.{tsx,jsx,ts,js}"], { cwd: projectRoot, ignore: SOURCE_IGNORE, dot: false })).slice(0, MAX_SCANNED_FILES);
  const byPath = /* @__PURE__ */ new Map();
  for (const file of files) {
    let content;
    try {
      content = readFileSync9(join18(projectRoot, file), "utf8");
    } catch {
      continue;
    }
    if (!content.includes("path")) continue;
    for (const record of scanFileForReactRoutes(toPosixPath(file), content)) {
      if (!byPath.has(record.path)) byPath.set(record.path, record);
    }
  }
  return [...byPath.values()].sort((a, b) => a.path.localeCompare(b.path));
}
var LARAVEL_ROUTE_RE = /Route::(get|post|put|patch|delete|options|any|match)\s*\(\s*(?:\[[^\]]*\]\s*,\s*)?(['"])([^'"]+)\2/g;
function scanFileForLaravelRoutes(relFile, content) {
  const records = [];
  LARAVEL_ROUTE_RE.lastIndex = 0;
  let match;
  while ((match = LARAVEL_ROUTE_RE.exec(content)) !== null) {
    const uri = match[3].trim();
    if (uri.length === 0) continue;
    records.push({
      method: match[1].toUpperCase(),
      uri,
      file: relFile,
      line: lineOf2(content, match.index)
    });
  }
  return records;
}
var LARAVEL_ROUTE_GLOBS = [
  "routes/**/*.php",
  "Modules/*/Routes/**/*.php",
  "Modules/*/routes/**/*.php",
  "Modules/*/app/routes/**/*.php",
  "app/Modules/*/Routes/**/*.php",
  "app/Modules/*/routes/**/*.php"
];
async function scanLaravelRoutes(projectRoot) {
  const files = await (0, import_fast_glob3.default)(LARAVEL_ROUTE_GLOBS, {
    cwd: projectRoot,
    ignore: ["**/vendor/**"],
    dot: false
  });
  const records = [];
  for (const file of files) {
    let content;
    try {
      content = readFileSync9(join18(projectRoot, file), "utf8");
    } catch {
      continue;
    }
    records.push(...scanFileForLaravelRoutes(toPosixPath(file), content));
  }
  return records;
}
var ARTISAN_TIMEOUT_MS = 2e4;
async function runArtisan(projectRoot, invocation, args) {
  try {
    const [bin, ...prefix] = invocation;
    const result = await execa(bin, [...prefix, ...args], {
      cwd: projectRoot,
      reject: false,
      timeout: ARTISAN_TIMEOUT_MS
    });
    const exitCode = typeof result.exitCode === "number" ? result.exitCode : 1;
    return { ok: exitCode === 0, stdout: result.stdout ?? "" };
  } catch {
    return { ok: false, stdout: "" };
  }
}
var LARAVEL_JOB_GLOBS = [
  "app/Jobs/**/*.php",
  "Modules/*/Jobs/**/*.php",
  "Modules/*/app/Jobs/**/*.php",
  "app/Modules/*/Jobs/**/*.php"
];
var LARAVEL_MAIL_GLOBS = [
  "app/Mail/**/*.php",
  "app/Notifications/**/*.php",
  "Modules/*/Mail/**/*.php",
  "Modules/*/app/Mail/**/*.php",
  "Modules/*/Notifications/**/*.php",
  "app/Modules/*/Mail/**/*.php"
];
var JOB_MARKER_RE = /\bimplements\b[^{]*\bShouldQueue\b/;
var MAIL_MARKER_RE = /\bextends\s+(?:Mailable|Notification)\b/;
var PHP_CLASS_RE = /\bclass\s+([A-Za-z0-9_]+)/;
var MODULE_PATH_RE = /(?:^|\/)(?:app\/)?Modules\/([^/]+)\//;
function moduleFromPath(relFile) {
  const match = MODULE_PATH_RE.exec(relFile);
  return match ? match[1] : void 0;
}
async function scanLaravelClasses(projectRoot, globs, marker) {
  const files = await (0, import_fast_glob3.default)(globs, { cwd: projectRoot, ignore: ["**/vendor/**"], dot: false });
  const records = [];
  for (const file of files) {
    let content;
    try {
      content = readFileSync9(join18(projectRoot, file), "utf8");
    } catch {
      continue;
    }
    if (!marker.test(content)) continue;
    const classMatch = PHP_CLASS_RE.exec(content);
    if (!classMatch) continue;
    const rel = toPosixPath(file);
    const module = moduleFromPath(rel);
    records.push({
      className: classMatch[1],
      file: rel,
      line: lineOf2(content, classMatch.index),
      ...module ? { module } : {}
    });
  }
  return records;
}
function projectFileReader(projectRoot) {
  return (path2) => {
    try {
      return readFileSync9(join18(projectRoot, path2), "utf8");
    } catch {
      return null;
    }
  };
}
var LARAVEL_CONSOLE_GLOBS = [
  "app/Console/Commands/**/*.php",
  "Modules/*/Console/**/*.php",
  "Modules/*/app/Console/**/*.php",
  "routes/console.php"
];
var LARAVEL_SCHEDULE_FILES = [
  "routes/console.php",
  "bootstrap/app.php",
  "app/Console/Kernel.php"
];
async function scanConsoleDeclarations(projectRoot, read) {
  const files = await (0, import_fast_glob3.default)(LARAVEL_CONSOLE_GLOBS, {
    cwd: projectRoot,
    ignore: ["**/vendor/**"],
    dot: false
  });
  const byName = /* @__PURE__ */ new Map();
  for (const file of files.map(toPosixPath).sort()) {
    const content = read(file);
    if (content === null) continue;
    for (const declaration of extractConsoleCommandNames(content)) {
      if (!byName.has(declaration.name)) {
        byName.set(declaration.name, { file, line: declaration.line });
      }
    }
  }
  return byName;
}
function readPsr4(read) {
  return [
    ...parseComposerPsr4(read("composer.json") ?? ""),
    ...parseVendorPsr4(read("vendor/composer/autoload_psr4.php") ?? "")
  ];
}
async function laravelExtractors(projectRoot) {
  const outputs = [];
  const read = projectFileReader(projectRoot);
  const profile = readProjectProfile(projectRoot, { persistMigration: false });
  const invocation = resolveArtisanInvocation(profile?.commands);
  const staticRoutes = await scanLaravelRoutes(projectRoot);
  const pushStaticRoutes = () => {
    if (staticRoutes.length > 0) {
      outputs.push({
        extractor: "laravel-routes",
        available: true,
        surfaces: extractLaravelRouteSurfaces(staticRoutes)
      });
    }
  };
  if ("blocked" in invocation) {
    pushStaticRoutes();
    outputs.push(
      blockedExtractor(
        "laravel-artisan-routes",
        `artisan was not run because ${invocation.blocked}`,
        "Fix the command named above so routes, console commands and schedules are read from the real app; the static route scan ran as a fallback."
      )
    );
  } else {
    const artisan = invocation.argv;
    let declarations;
    const consoleDeclarations = () => declarations ??= scanConsoleDeclarations(projectRoot, read);
    const routeRun = await runArtisan(projectRoot, artisan, ["route:list", "--json"]);
    if (routeRun.ok) {
      const routes = parseArtisanRouteList(routeRun.stdout);
      const traced = extractLaravelArtisanRoutes(
        routes,
        createArtisanRouteResolver({ psr4: readPsr4(read), staticRoutes, readFile: read })
      );
      const blocked = unresolvedBlockedCheck(
        "laravel-artisan-routes",
        "routes",
        traced.unresolved,
        " (closures or package routes)"
      );
      if (traced.surfaces.length > 0 || blocked) {
        outputs.push({
          extractor: "laravel-artisan-routes",
          available: true,
          surfaces: traced.surfaces,
          blocked
        });
      }
    } else {
      pushStaticRoutes();
      outputs.push(
        blockedExtractor(
          "laravel-artisan-routes",
          `${artisan.join(" ")} route:list --json did not run (PHP or the container is not available, or the app failed to boot)`,
          `Make sure \`${artisan.join(" ")} route:list --json\` runs in this project so modular routes and middleware are mapped; the static route scan ran as a fallback.`
        )
      );
    }
    const listRun = await runArtisan(projectRoot, artisan, ["list", "--format=json"]);
    if (listRun.ok) {
      const declared = await consoleDeclarations();
      const surfaces = extractLaravelConsoleCommands(
        parseArtisanCommandList(listRun.stdout),
        (name) => declared.get(name)
      );
      if (surfaces.length > 0) {
        outputs.push({ extractor: "laravel-console", available: true, surfaces });
      }
    }
    const scheduleRun = await runArtisan(projectRoot, artisan, ["schedule:list"]);
    if (scheduleRun.ok) {
      const scheduleSources = LARAVEL_SCHEDULE_FILES.flatMap((file) => {
        const content = read(file);
        return content === null ? [] : [{ file, content }];
      });
      const declared = await consoleDeclarations();
      const traced = extractLaravelScheduledJobs(
        parseArtisanScheduleList(scheduleRun.stdout),
        (command) => {
          const declaration = declared.get(scheduledCommandName(command));
          const commandClass = declaration ? basename(declaration.file, ".php") : void 0;
          for (const source of scheduleSources) {
            const line = findScheduleLine(source.content, command, commandClass);
            if (line !== void 0) return { file: source.file, line };
          }
          return void 0;
        }
      );
      const blocked = unresolvedBlockedCheck(
        "laravel-schedule",
        "scheduled tasks",
        traced.unresolved
      );
      if (traced.surfaces.length > 0 || blocked) {
        outputs.push({
          extractor: "laravel-schedule",
          available: true,
          surfaces: traced.surfaces,
          blocked
        });
      }
    }
  }
  const jobs = await scanLaravelClasses(projectRoot, LARAVEL_JOB_GLOBS, JOB_MARKER_RE);
  if (jobs.length > 0) {
    outputs.push({
      extractor: "laravel-jobs",
      available: true,
      surfaces: extractLaravelJobs(jobs)
    });
  }
  const mailables = await scanLaravelClasses(projectRoot, LARAVEL_MAIL_GLOBS, MAIL_MARKER_RE);
  if (mailables.length > 0) {
    outputs.push({
      extractor: "laravel-mail",
      available: true,
      surfaces: extractLaravelMailables(mailables)
    });
  }
  return outputs;
}
function isLaravelProject(projectRoot) {
  try {
    const composer = JSON.parse(readFileSync9(join18(projectRoot, "composer.json"), "utf8"));
    return composer.require?.["laravel/framework"] !== void 0;
  } catch {
    return false;
  }
}
async function scanGenericSurfaces(projectRoot) {
  const files = (await (0, import_fast_glob3.default)(ROUTE_CONVENTIONS, { cwd: projectRoot, ignore: SOURCE_IGNORE, dot: false })).slice(0, MAX_SCANNED_FILES);
  const records = [];
  for (const file of files) {
    const rel = toPosixPath(file);
    if (ROUTE_EXCLUDE.has(basename(rel).replace(/\.[^.]+$/, ""))) continue;
    records.push({ kind: "page", identifier: rel, file: rel });
  }
  return records;
}
function resolvePointer(projectRoot, pointer) {
  let content;
  try {
    content = readFileSync9(join18(projectRoot, pointer.file), "utf8");
  } catch {
    return { file: pointer.file, line: pointer.line, status: "file-missing" };
  }
  if (pointer.line === void 0) {
    return { file: pointer.file, status: "resolved" };
  }
  const lineCount2 = content.split("\n").length;
  const inRange = pointer.line >= 1 && pointer.line <= lineCount2;
  return { file: pointer.file, line: pointer.line, status: inRange ? "resolved" : "line-missing" };
}
function gatherSiteMapTransitions(projectRoot, surfaces) {
  const fileCache = /* @__PURE__ */ new Map();
  const readSource2 = (file) => {
    const cached = fileCache.get(file);
    if (cached !== void 0) return cached;
    let content;
    try {
      content = readFileSync9(join18(projectRoot, file), "utf8");
    } catch {
      content = null;
    }
    fileCache.set(file, content);
    return content;
  };
  const records = [];
  const seen = /* @__PURE__ */ new Set();
  for (const surface of surfaces) {
    for (const evidence of surface.evidence) {
      const key = `${surface.raw_id}\0${evidence.file}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const content = readSource2(evidence.file);
      if (content === null) continue;
      records.push({ from_raw_id: surface.raw_id, file: evidence.file, content });
    }
  }
  return [
    ...detectLaravelTransitions(records),
    ...detectReactRouterTransitions(records),
    ...detectNodeCliTransitions(records)
  ];
}
function createSiteMapGatherer(projectRoot) {
  const manifest = readManifest(projectRoot);
  const deps = dependencyNames(manifest);
  const appKind = detectAppKind(manifest, deps);
  const frameworks = detectFrameworks(deps);
  const name = manifest.name ?? basename(projectRoot);
  const isNodeCli = appKind === "cli" || deps.has("commander");
  const isReactRouter = deps.has("react-router-dom") || deps.has("react-router");
  const isLaravel = isLaravelProject(projectRoot);
  return {
    appKind: () => appKind,
    appSummary: () => ({ name, kind: appKind, frameworks }),
    loadAppMap: () => readCanonicalSiteMap(projectRoot),
    journeyCount: () => readAllJourneys(projectRoot).length,
    resolveEvidence: (pointers) => pointers.map((pointer) => resolvePointer(projectRoot, pointer)),
    gatherTransitions: (surfaces) => gatherSiteMapTransitions(projectRoot, surfaces),
    async extractors() {
      const outputs = [];
      if (isNodeCli) {
        outputs.push({
          extractor: "node-cli",
          available: true,
          surfaces: extractNodeCliSurfaces(await scanCliCommands(projectRoot))
        });
      }
      if (isReactRouter) {
        const routes = await scanReactRoutes(projectRoot);
        if (routes.length > 0) {
          outputs.push({
            extractor: "react-routes",
            available: true,
            surfaces: extractReactRouteSurfaces(routes)
          });
        }
      }
      if (isLaravel) {
        outputs.push(...await laravelExtractors(projectRoot));
      }
      const generic = await scanGenericSurfaces(projectRoot);
      if (generic.length > 0) {
        outputs.push({
          extractor: "generic",
          available: true,
          surfaces: extractGenericSurfaces(generic)
        });
      }
      if (outputs.length === 0 && appKind !== "service") {
        outputs.push(
          blockedExtractor(
            `${appKind}-surfaces`,
            `no deterministic ${appKind} surface extractor ships in this release`,
            "Author an app-map.yaml by hand, or wait for the dedicated extractor."
          )
        );
      }
      return outputs;
    }
  };
}

// src/site-map/run.ts
init_esm_shims();
import { join as join21 } from "path";

// src/site-map/assemble.ts
init_esm_shims();
import { join as join20 } from "path";

// src/site-map/baseline.ts
init_esm_shims();
import { existsSync as existsSync14, readFileSync as readFileSync10 } from "fs";
import { join as join19 } from "path";
function baselinePath(projectRoot) {
  return join19(projectRoot, PATHS.SITE_MAP_BASELINE);
}
function readBaseline(projectRoot) {
  const target = baselinePath(projectRoot);
  if (!existsSync14(target)) return null;
  try {
    const parsed = JSON.parse(readFileSync10(target, "utf8"));
    if (!Array.isArray(parsed.finding_ids)) return null;
    return parsed;
  } catch {
    return null;
  }
}
async function writeBaseline(projectRoot, findingIds, now) {
  const baseline = {
    schema_version: "1",
    generated_by: "paqad-ai",
    framework_version: VERSION,
    created_at: now.toISOString(),
    finding_ids: [...findingIds].sort()
  };
  await writeJsonFile(baselinePath(projectRoot), baseline);
  return baseline;
}
function applyBaselineStatus(findings, baseline) {
  if (baseline === null) {
    return findings.map((finding) => ({ ...finding, baseline_status: "unknown" }));
  }
  const known = new Set(baseline.finding_ids);
  return findings.map((finding) => ({
    ...finding,
    baseline_status: known.has(finding.id) ? "pre-existing" : "new-since-baseline"
  }));
}

// src/site-map/trust.ts
init_esm_shims();

// src/core/types/site-map.ts
init_esm_shims();
var SITE_MAP_SCHEMA_VERSION = 1;
var TRUST_TIERS = [
  "unverified",
  "inferred",
  "proven-in-code",
  "proven-by-test",
  "human-confirmed"
];

// src/site-map/trust.ts
var APP_MAP_PATH = "docs/site-map/app-map.yaml";
var UNVERIFIED = "unverified";
var INFERRED = "inferred";
var PROVEN_IN_CODE = "proven-in-code";
function rank(tier) {
  return TRUST_TIERS.indexOf(tier);
}
var strongest = (a, b) => rank(a) >= rank(b) ? a : b;
var weakest = (a, b) => rank(a) <= rank(b) ? a : b;
function anchorState(pointers, statusOf) {
  if (pointers.length === 0) return "none";
  return pointers.every((pointer) => statusOf(pointer) === "resolved") ? "resolves" : "broken";
}
function honestTrustTier(authored, state) {
  const claim = authored ?? UNVERIFIED;
  if (state === "broken") return UNVERIFIED;
  if (state === "resolves") return strongest(claim, PROVEN_IN_CODE);
  return weakest(claim, INFERRED);
}
function overstatement(ownerId, ownerPhrase, affectedSurface, authored, earned, state) {
  const because = state === "broken" ? "its cited evidence no longer resolves in the tree" : "it cites no evidence to prove that claim";
  return {
    title: `Overstated trust on ${ownerId}: claims "${authored}"`,
    description: `${ownerPhrase} is marked "${authored}", but ${because}, so the map shows it as more certain than the evidence earns (at most "${earned}").`,
    category: "SM-TRUST",
    severity: "medium",
    tier: "deterministic",
    confidence: 1,
    evidence: [
      `${APP_MAP_PATH} \u2014 ${ownerId} declares trust "${authored}" but earns at most "${earned}" (${because})`
    ],
    resolution: `Lower the trust on ${ownerId} to "${earned}" (or below) in ${APP_MAP_PATH}, or re-anchor its evidence to code that resolves so the claimed tier is earned.`,
    affected_surfaces: affectedSurface === void 0 ? [] : [affectedSurface],
    affected_files: [],
    baseline_status: "unknown",
    status: "open"
  };
}
function judge(authored, pointers, statusOf, build) {
  if (authored === void 0) return void 0;
  const state = anchorState(pointers, statusOf);
  const earned = honestTrustTier(authored, state);
  if (rank(earned) >= rank(authored)) return void 0;
  return build(authored, earned, state);
}
function deriveTrustFindings(map, resolutions) {
  if (map === null) return [];
  const statusOf = buildStatusOf(resolutions);
  const candidates = [];
  for (const surface of map.surfaces) {
    const surfaceFinding = judge(
      surface.trust,
      normalizeEvidence(surface.evidence),
      statusOf,
      (authored, earned, state) => overstatement(
        `surface "${surface.id}"`,
        `Surface "${surface.label}"`,
        surface.id,
        authored,
        earned,
        state
      )
    );
    if (surfaceFinding !== void 0) candidates.push(surfaceFinding);
    for (const transition of surface.transitions ?? []) {
      const edgeFinding = judge(
        transition.trust,
        normalizeEvidence(transition.evidence),
        statusOf,
        (authored, earned, state) => overstatement(
          `transition ${surface.id} \u2192 ${transition.to}`,
          `The transition from "${surface.id}" to "${transition.to}"`,
          surface.id,
          authored,
          earned,
          state
        )
      );
      if (edgeFinding !== void 0) candidates.push(edgeFinding);
    }
  }
  for (const guard of map.guards ?? []) {
    const guardFinding = judge(
      guard.trust,
      normalizeEvidence(guard.evidence),
      statusOf,
      (authored, earned, state) => overstatement(
        `guard "${guard.id}"`,
        `Guard "${guard.label}"`,
        void 0,
        authored,
        earned,
        state
      )
    );
    if (guardFinding !== void 0) candidates.push(guardFinding);
  }
  return candidates;
}
function stampOne(element, statusOf) {
  const state = anchorState(normalizeEvidence(element.evidence), statusOf);
  const earned = honestTrustTier(element.trust, state);
  const next = earned === UNVERIFIED ? void 0 : earned;
  if (element.trust === next) return { element, changed: false };
  const stamped = { ...element };
  if (next === void 0) delete stamped.trust;
  else stamped.trust = next;
  return { element: stamped, changed: true };
}
function stampHonestTrustTiers(map, resolutions) {
  const statusOf = buildStatusOf(resolutions);
  let changed = false;
  const surfaces = map.surfaces.map((surface) => {
    const stampedSurface = stampOne(surface, statusOf);
    if (stampedSurface.changed) changed = true;
    if (surface.transitions === void 0) return stampedSurface.element;
    let edgeChanged = false;
    const transitions = surface.transitions.map((transition) => {
      const stampedEdge = stampOne(transition, statusOf);
      if (stampedEdge.changed) {
        changed = true;
        edgeChanged = true;
      }
      return stampedEdge.element;
    });
    return edgeChanged ? { ...stampedSurface.element, transitions } : stampedSurface.element;
  });
  const guards = map.guards?.map((guard) => {
    const stampedGuard = stampOne(guard, statusOf);
    if (stampedGuard.changed) changed = true;
    return stampedGuard.element;
  });
  const stampedMap = guards === void 0 ? { ...map, surfaces } : { ...map, surfaces, guards };
  return { map: stampedMap, changed };
}

// src/site-map/assemble.ts
function normalizeEvidence2(ref) {
  if (ref === void 0) return [];
  return Array.isArray(ref) ? ref : [ref];
}
function evidenceMatch(a, b) {
  if (a.file !== b.file) return false;
  if (a.line === void 0 || b.line === void 0) return true;
  return a.line === b.line;
}
function detectUnmappedSurfaces(map, extraction) {
  const mappedEvidence = (map?.surfaces ?? []).flatMap(
    (surface) => normalizeEvidence2(surface.evidence)
  );
  const candidates = [];
  for (const surface of extraction.surfaces) {
    const isMapped = surface.evidence.some(
      (extracted) => mappedEvidence.some((mapped) => evidenceMatch(extracted, mapped))
    );
    if (isMapped) continue;
    const files = [...new Set(surface.evidence.map((evidence) => evidence.file))].sort();
    candidates.push({
      title: `Unmapped ${surface.kind}: ${surface.label}`,
      description: `The ${surface.kind} "${surface.label}" exists in code but is absent from the site map, so the map under-describes the product.`,
      category: "SM-ADD",
      severity: surface.confidence === "high" ? "medium" : "low",
      tier: "deterministic",
      confidence: 1,
      evidence: surface.evidence.map(
        (evidence) => `${surface.source} extractor \u2014 ${evidence.file}` + (evidence.line === void 0 ? "" : `:${evidence.line}`)
      ),
      resolution: `Add a surface for "${surface.label}" (raw id ${surface.raw_id}) to docs/site-map/app-map.yaml, or exclude it with a documented reason.`,
      affected_surfaces: [surface.raw_id],
      affected_files: files,
      baseline_status: "unknown",
      status: "open"
    });
  }
  return candidates;
}
function detectMissingEdges(map, resolved) {
  const recorded = /* @__PURE__ */ new Map();
  for (const surface of map.surfaces) {
    recorded.set(
      surface.id,
      new Set((surface.transitions ?? []).map((transition) => transition.to))
    );
  }
  const seen = /* @__PURE__ */ new Set();
  const candidates = [];
  for (const edge of resolved) {
    const from = edge.from_id;
    const to = edge.transition.to;
    const recordedFrom = recorded.get(from);
    if (recordedFrom === void 0) continue;
    const key = `${from} -> ${to}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (recordedFrom.has(to)) continue;
    const pointers = normalizeEvidence2(edge.transition.evidence);
    const files = [...new Set(pointers.map((pointer) => pointer.file))].sort();
    candidates.push({
      title: `Unmapped link: ${from} \u2192 ${to}`,
      description: `The code navigates from "${from}" to "${to}" (${edge.transition.trigger}), but the site map records no such transition, so the map under-describes how users move through the product.`,
      category: "SM-EDGE-MISSING",
      severity: edge.transition.confidence === "high" ? "medium" : "low",
      tier: "deterministic",
      confidence: 1,
      evidence: pointers.map(
        (pointer) => `code \u2014 ${pointer.file}${pointer.line === void 0 ? "" : `:${pointer.line}`} navigates ${from} \u2192 ${to}`
      ),
      resolution: `Add a "${edge.transition.trigger}" transition from "${from}" to "${to}" in ${PATHS.SITE_MAP_CANONICAL_APP_MAP} (or re-run \`sitemap draft\` to record it), or exclude it with a documented reason.`,
      affected_surfaces: [from, to],
      affected_files: files,
      baseline_status: "unknown",
      status: "open"
    });
  }
  return candidates;
}
function reconcileEdges(map, codeTransitions) {
  const resolution = resolveTransitions(codeTransitions, map.surfaces);
  const unresolved = buildUnresolvedLinksCheck(resolution.dropped);
  return {
    candidates: detectMissingEdges(map, resolution.resolved),
    blockedChecks: unresolved === null ? [] : [unresolved]
  };
}
function collectCandidates(input) {
  const verification = collectVerificationFindings(input.map, input.evidenceResolutions);
  const edges = input.map === null ? { candidates: [], blockedChecks: [] } : reconcileEdges(input.map, input.codeTransitions);
  return {
    candidates: [
      ...detectUnmappedSurfaces(input.map, input.extraction),
      ...verification.candidates,
      ...edges.candidates,
      ...deriveTrustFindings(input.map, input.evidenceResolutions)
    ],
    blockedChecks: [...verification.blockedChecks, ...edges.blockedChecks]
  };
}
function assembleSiteMapReport(input) {
  const { candidates, blockedChecks: verificationBlocked } = collectCandidates(input);
  const withIds = assignSiteMapFindingIds(candidates);
  const findings = sortFindings(applyBaselineStatus(withIds, input.baseline));
  const reportId = toSiteMapReportId("SITEMAP", input.now);
  const bundleDir = toPosixPath(join20(PATHS.SITE_MAP_RUNS_DIR, reportId));
  const newSinceBaseline = findings.filter(
    (finding) => finding.baseline_status === "new-since-baseline"
  ).length;
  const preExisting = findings.filter(
    (finding) => finding.baseline_status === "pre-existing"
  ).length;
  const report2 = {
    schema_version: "1",
    generated_by: "paqad-ai",
    framework_version: VERSION,
    report_id: reportId,
    workflow: input.workflow,
    generated_at: input.now.toISOString(),
    bundle_dir: bundleDir,
    app: input.app,
    surface_count: input.map?.surfaces.length ?? 0,
    journey_count: input.journeyCount,
    extraction: {
      extractors_ran: input.extraction.extractors_ran,
      extracted_surfaces: input.extraction.surfaces.length,
      low_confidence_fallback: input.extraction.low_confidence_fallback,
      fingerprint: input.extraction.fingerprint
    },
    findings,
    blocked_checks: [...input.blockedChecks, ...verificationBlocked],
    baseline: {
      existed: input.baseline !== null,
      new_since_baseline: newSinceBaseline,
      pre_existing: preExisting
    },
    sources_used: [...new Set(input.sources)].sort()
  };
  return { report: report2, findings, findingIds: findings.map((finding) => finding.id) };
}

// src/site-map/canonical-trust.ts
init_esm_shims();
function restampCanonicalTrust(projectRoot, resolveEvidence) {
  const map = readCanonicalSiteMap(projectRoot);
  if (map === null) return { status: "no-map" };
  const resolutions = resolveEvidence(collectMapEvidence(map));
  const { map: trustStamped, changed: trustChanged } = stampHonestTrustTiers(map, resolutions);
  const { map: stamped, changed: freshnessChanged } = stampMapFreshness(
    trustStamped,
    deriveMapFreshness(map, resolutions)
  );
  if (!trustChanged && !freshnessChanged) return { status: "unchanged" };
  const path2 = writeCanonicalSiteMap(projectRoot, stamped);
  return { status: "stamped", path: path2 };
}

// src/site-map/run.ts
function deriveSiteMapInventory(extraction) {
  const groups = /* @__PURE__ */ new Set();
  const guards = /* @__PURE__ */ new Set();
  for (const surface of extraction.surfaces) {
    if (surface.module !== void 0) groups.add(surface.module);
    for (const guard of surface.guards ?? []) guards.add(guard);
  }
  return {
    screens: extraction.surfaces.length,
    groups: [...groups].sort((a, b) => a.localeCompare(b)),
    guards: guards.size
  };
}
function describeSiteMapInventory(inventory) {
  return `Found ${inventory.screens} screens across ${inventory.groups.length} groups.`;
}
function countMapTransitions(map) {
  if (map === null) return 0;
  return map.surfaces.reduce((total, surface) => total + (surface.transitions?.length ?? 0), 0);
}
function deriveSiteMapVerdict(input) {
  if (input.findingCount > 0) return "attention";
  if (!input.hasStoredMap || !input.hasTransitions || input.blockedChecks.length > 0) {
    return "inconclusive";
  }
  return "safe";
}
async function gatherSiteMapReport(options) {
  const { projectRoot, gatherer } = options;
  const map = gatherer.loadAppMap();
  const journeyCount = gatherer.journeyCount();
  const appSummary = gatherer.appSummary();
  const evidenceResolutions = gatherer.resolveEvidence(collectMapEvidence(map));
  const outputs = await gatherer.extractors();
  const extraction = assembleExtraction(outputs, gatherer.appKind());
  const codeTransitions = gatherer.gatherTransitions(extraction.surfaces);
  const sources = outputs.filter((output) => output.available).map((output) => output.extractor);
  if (map !== null) sources.push("app-map.yaml");
  if (journeyCount > 0) sources.push("journeys");
  const baseline = readBaseline(projectRoot);
  const { report: report2, findingIds } = assembleSiteMapReport({
    workflow: options.workflow,
    now: options.now,
    app: appSummary,
    map,
    extraction,
    evidenceResolutions,
    codeTransitions,
    journeyCount,
    blockedChecks: extraction.blocked_checks,
    baseline,
    sources
  });
  return { report: report2, findingIds, extraction, map, journeyCount, baseline };
}
async function runSiteMapAudit(options) {
  const { projectRoot, gatherer } = options;
  const workflow = options.workflow ?? "site-map";
  const now = options.now ?? (() => /* @__PURE__ */ new Date());
  const runNow = now();
  const { report: report2, findingIds, extraction, baseline, map } = await gatherSiteMapReport({
    projectRoot,
    gatherer,
    workflow,
    now: runNow
  });
  const inventory = deriveSiteMapInventory(extraction);
  options.onInventory?.(inventory);
  await writeJsonFile(join21(projectRoot, report2.bundle_dir, "finding-index.json"), {
    report_id: report2.report_id,
    findings: report2.findings
  });
  await writeJsonFile(join21(projectRoot, report2.bundle_dir, "extraction.json"), extraction);
  let baselineCreated = false;
  if (baseline === null) {
    await writeBaseline(projectRoot, findingIds, runNow);
    baselineCreated = true;
  }
  const trustRestamp = restampCanonicalTrust(
    projectRoot,
    (pointers) => gatherer.resolveEvidence(pointers)
  );
  recordSiteMapRun(
    projectRoot,
    {
      report_id: report2.report_id,
      workflow: report2.workflow,
      surface_count: report2.surface_count,
      journey_count: report2.journey_count,
      finding_count: report2.findings.length,
      blocked_count: report2.blocked_checks.length,
      new_since_baseline: report2.baseline.new_since_baseline,
      pre_existing: report2.baseline.pre_existing
    },
    { sessionId: options.sessionId, now }
  );
  const transitionCount = countMapTransitions(map);
  const verdict = deriveSiteMapVerdict({
    findingCount: report2.findings.length,
    hasStoredMap: map !== null,
    hasTransitions: transitionCount > 0,
    blockedChecks: report2.blocked_checks
  });
  return {
    report_id: report2.report_id,
    bundle_dir: report2.bundle_dir,
    finding_count: report2.findings.length,
    blocked_checks: report2.blocked_checks,
    baseline_created: baselineCreated,
    trust_restamp: trustRestamp,
    verdict,
    inventory,
    transition_count: transitionCount,
    exit_code: report2.findings.length > 0 ? 1 : 0
  };
}

// src/dashboard/ops-jobs.ts
var OPS_ACTIONS = [
  "reconcile",
  "refresh-rules",
  "refresh-context",
  "rag-rebuild",
  "rag-clear",
  "regenerate-docs",
  "compliance-check",
  "doctor",
  "site-map"
];
function isOpsAction(value) {
  return typeof value === "string" && OPS_ACTIONS.includes(value);
}
var OpsConflictError = class extends Error {
  action;
  constructor(action) {
    super(`A '${action}' job is already running. Wait for it to finish before starting another.`);
    this.name = "OpsConflictError";
    this.action = action;
  }
};
var MAX_FINISHED_JOBS = 50;
var DEFAULT_EXECUTORS = {
  reconcile: async (_job, { projectRoot, progress }) => {
    const discovered = discoverSourceRoots(projectRoot);
    progress(
      discovered.source_roots === null ? "No stack pack declares module_health.source_roots \u2014 the reconciler reports blocked." : `Reconciling module-map.yml against: ${discovered.source_roots.join(", ")}.`
    );
    const report2 = await reconcileModuleMap({
      projectRoot,
      sourceRoots: discovered.source_roots
    });
    return { blocked: report2.blocked, findings: report2.findings.length, counts: report2.counts };
  },
  "refresh-rules": async (_job, { projectRoot, progress }) => {
    const profile = readProjectProfile(projectRoot);
    if (profile === null) {
      throw new Error("No project profile found. Run `paqad-ai onboard` before refreshing rules.");
    }
    progress("Regenerating docs/instructions/rules from the framework rule packs.");
    const report2 = await refreshProjectRules(projectRoot, profile, { force: true });
    return {
      deleted: report2.deleted.length,
      written: report2.written.length,
      preserved: report2.preserved
    };
  },
  "refresh-context": async (_job, { projectRoot, progress }) => {
    progress("Syncing chunk and vector context indexes.");
    const sync = await new RagService(projectRoot).refreshContext();
    return {
      changed_files: sync.changed_files.length,
      added_files: sync.added_files.length,
      deleted_files: sync.deleted_files.length,
      updated: sync.updated
    };
  },
  "rag-rebuild": async (_job, { projectRoot, progress }) => {
    const service = new RagService(projectRoot);
    await service.rebuild({ onProgress: (update) => progress(update.message) });
    return await service.getStatus();
  },
  "rag-clear": async (_job, { projectRoot, progress }) => {
    progress("Clearing the vector index and disabling RAG.");
    await new RagService(projectRoot).clear();
    return { cleared: true };
  },
  "regenerate-docs": async (_job, { projectRoot, progress }) => {
    const service = new DesignTokenService();
    try {
      progress("Regenerating design-system docs from design-tokens.json.");
      const docs = await service.writeDocs(projectRoot);
      const stack = getPrimaryStack(readProjectProfile(projectRoot) ?? void 0);
      const theme = await service.writeThemeExports(projectRoot, stack);
      return { docs, theme };
    } catch (error) {
      if (error instanceof DesignTokensMissingError || error instanceof DesignTokensPlaceholderError) {
        progress(error.message);
        return { skipped: true, note: error.message };
      }
      throw error;
    }
  },
  "compliance-check": async (_job, { projectRoot, progress }) => {
    const index = await loadObligationIndex({ project_root: projectRoot });
    if (index === null) {
      progress("No obligation index found \u2014 nothing to check.");
      return { checked: false, note: "No specs to check. Extract an obligation index first." };
    }
    const doctor = doctorObligationIndex(index);
    if (!doctor.ok) {
      throw new Error(
        `Obligation index is unusable: ${doctor.issues.map((issue) => issue.message).join("; ")}`
      );
    }
    progress(`Checking ${index.obligations.length} obligation(s) against the test suite.`);
    const report2 = await checkSpecCompliance({ project_root: projectRoot, index });
    return { checked: true, summary: report2.summary, uncovered: report2.uncovered_obligations };
  },
  doctor: async (_job, { projectRoot, progress }) => {
    progress("Running framework health checks.");
    const report2 = await new HealthChecker().run(projectRoot);
    progress(`Overall status: ${report2.overall_status}.`);
    return report2.checks;
  },
  "site-map": async (_job, { projectRoot, progress }) => {
    const result = await runSiteMapAudit({
      projectRoot,
      gatherer: createSiteMapGatherer(projectRoot),
      onInventory: (inventory) => progress(describeSiteMapInventory(inventory))
    });
    const progressFile = await readProgress(projectRoot);
    if (progressFile !== null) {
      for (const line of describeCompletedUnits(progressFile)) progress(line);
    }
    progress(`Mapped the app: ${result.finding_count} finding(s) worth a look.`);
    return {
      report_id: result.report_id,
      findings: result.finding_count,
      blocked_checks: result.blocked_checks.length,
      baseline_created: result.baseline_created
    };
  }
};
var OpsJobRunner = class {
  constructor(options) {
    this.options = options;
  }
  options;
  jobs = [];
  counter = 0;
  start(action) {
    const running = this.jobs.find((job2) => job2.action === action && job2.status === "running");
    if (running !== void 0) {
      throw new OpsConflictError(action);
    }
    this.counter += 1;
    const job = {
      id: `op-${action}-${this.counter}`,
      action,
      status: "running",
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      finishedAt: null,
      progress: [],
      result: null,
      error: null
    };
    this.jobs.push(job);
    void this.execute(job);
    return job;
  }
  get(jobId) {
    return this.jobs.find((job) => job.id === jobId) ?? null;
  }
  list() {
    return [...this.jobs].reverse();
  }
  emit(job, message) {
    job.progress.push(message);
    this.options.onEvent?.({ jobId: job.id, action: job.action, status: job.status, message });
  }
  async execute(job) {
    const executor = this.options.executors?.[job.action] ?? DEFAULT_EXECUTORS[job.action];
    const helpers = {
      projectRoot: this.options.projectRoot,
      progress: (message) => this.emit(job, message)
    };
    try {
      job.result = await executor(job, helpers);
      job.status = "done";
      job.finishedAt = (/* @__PURE__ */ new Date()).toISOString();
      this.emit(job, `Finished ${job.action}.`);
    } catch (error) {
      job.status = "failed";
      job.finishedAt = (/* @__PURE__ */ new Date()).toISOString();
      job.error = error instanceof Error ? error.message.split("\n")[0] ?? "The operation failed." : "The operation failed.";
      this.emit(job, `Failed ${job.action}: ${job.error}`);
    }
    appendDashboardAudit(this.options.projectRoot, `dashboard.ops.${job.action}`, {
      job: job.id,
      status: job.status
    });
    this.pruneFinished();
  }
  pruneFinished() {
    const finished = this.jobs.filter((job) => job.status !== "running");
    const excess = finished.length - MAX_FINISHED_JOBS;
    if (excess <= 0) {
      return;
    }
    const drop = new Set(finished.slice(0, excess).map((job) => job.id));
    this.jobs = this.jobs.filter((job) => !drop.has(job.id));
  }
};

// src/dashboard/packs-config.ts
init_esm_shims();
import { existsSync as existsSync15, readdirSync as readdirSync5 } from "fs";
import { join as join22 } from "path";
var SOURCE_ORDER = ["built-in", "global", "project"];
var PACK_NAME_PATTERN = /^[a-z0-9][a-z0-9-]*$/;
var PackNameError = class extends Error {
  constructor(name) {
    super(
      `Pack name '${name}' is not valid: names are lowercase letters, digits, and dashes only.`
    );
    this.name = "PackNameError";
  }
};
function sourceRootFor(source, roots) {
  if (source === "built-in") {
    return join22(roots.runtimeRoot, "capabilities", "coding", "stacks");
  }
  return source === "global" ? roots.globalPacksRoot : roots.projectPacksRoot;
}
function listPacks2(projectRoot, overrides = {}) {
  const roots = resolvePackManagerRoots(projectRoot, overrides);
  const loader = new StackPackLoader();
  const byName = /* @__PURE__ */ new Map();
  for (const source of SOURCE_ORDER) {
    const sourceRoot = sourceRootFor(source, roots);
    if (!existsSync15(sourceRoot)) {
      continue;
    }
    const packDirs = readdirSync5(sourceRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory()).filter((entry) => !entry.name.startsWith("_") && !entry.name.startsWith("."));
    for (const entry of packDirs) {
      const pack = loader.validatePack(join22(sourceRoot, entry.name), source);
      byName.set(pack.manifest.name, {
        name: pack.manifest.name,
        source,
        version: pack.manifest.version,
        valid: pack.validation.valid
      });
    }
  }
  return [...byName.values()].sort((left, right) => left.name.localeCompare(right.name));
}
async function installPack2(projectRoot, input) {
  const scope = input.scope ?? "global";
  const pack = await installPack(input.source, {
    projectRoot,
    scope,
    roots: input.roots
  });
  appendDashboardAudit(projectRoot, "dashboard.packs.install", {
    pack: pack.manifest.name,
    scope,
    source: input.source
  });
  return {
    name: pack.manifest.name,
    version: pack.manifest.version,
    scope,
    root: pack.root
  };
}
function removePack2(projectRoot, input) {
  if (!PACK_NAME_PATTERN.test(input.name)) {
    throw new PackNameError(input.name);
  }
  const scope = input.scope ?? "global";
  removePack(input.name, projectRoot, scope, input.roots);
  appendDashboardAudit(projectRoot, "dashboard.packs.remove", {
    pack: input.name,
    scope
  });
  return { name: input.name, scope, removed: true };
}

// src/dashboard/report.ts
init_esm_shims();
import { existsSync as existsSync29 } from "fs";
import { join as join36, resolve as resolve5 } from "path";

// src/dashboard/collectors/architecture.ts
init_esm_shims();
import { existsSync as existsSync16, statSync as statSync3 } from "fs";
import { join as join23 } from "path";
var HELPER2 = {
  what: "The architecture/graph section is powered by .paqad/context/chunk-index.json \u2014 the AST-aware chunk index `paqad-ai graph` renders into a WebGL map.",
  goodLooksLike: "chunk-index.json present, non-empty, and refreshed in the last 30 days."
};
function collectArchitecture(projectRoot, now = Date.now()) {
  const indexPath = join23(projectRoot, PATHS.CHUNK_INDEX);
  if (!existsSync16(indexPath)) {
    return {
      id: "architecture",
      title: "Architecture",
      band: "unknown",
      score: null,
      summary: "No chunk index \u2014 run `paqad-ai graph` to build it.",
      metrics: [],
      helper: HELPER2
    };
  }
  let mtimeMs;
  let sizeBytes;
  try {
    const st = statSync3(indexPath);
    mtimeMs = st.mtimeMs;
    sizeBytes = st.size;
  } catch {
    return {
      id: "architecture",
      title: "Architecture",
      band: "unknown",
      score: null,
      summary: "Chunk index disappeared between checks.",
      metrics: [],
      helper: HELPER2
    };
  }
  if (sizeBytes < 50) {
    return {
      id: "architecture",
      title: "Architecture",
      band: "red",
      score: 0,
      summary: "Chunk index is empty \u2014 re-run `paqad-ai graph`.",
      metrics: [{ label: "size", value: "0" }],
      helper: HELPER2
    };
  }
  const freshness = scoreFreshness(mtimeMs, { now });
  const age = ageInDays(mtimeMs, now);
  const score = Math.round(50 + freshness / 100 * 50);
  return {
    id: "architecture",
    title: "Architecture",
    band: bandForScore(score),
    score,
    summary: `Chunk index ready \xB7 ${age !== null ? `${age}d old` : "recent"} \xB7 ${Math.round(sizeBytes / 1024)} KB`,
    metrics: [
      { label: "size", value: `${Math.round(sizeBytes / 1024)} KB` },
      { label: "age", value: age !== null ? `${age}d` : "\u2014" }
    ],
    helper: HELPER2,
    details: {
      indexPath: PATHS.CHUNK_INDEX,
      mtimeMs,
      sizeBytes
    }
  };
}

// src/dashboard/collectors/attestation.ts
init_esm_shims();
var HELPER3 = {
  what: "Append-only, tamper-evident chain of signed per-change receipts (.paqad/ledger/receipts.jsonl). Each receipt is gate-derived: it attests that paqad\u2019s verification gates passed for a change, and records which adapter/model wrote it and which human accepted it.",
  goodLooksLike: "A growing chain whose latest receipt shows PASSED with an attributed author. Because the trust is gate-derived, the receipt vouches for the change whichever AI tool produced it."
};
function authorLabel(authorship) {
  if (authorship === null) return "unattributed";
  const parts = [];
  if (authorship.agent !== void 0) parts.push(authorship.agent);
  const model = authorship.model_id ?? authorship.model;
  if (model !== void 0) parts.push(model);
  return parts.length > 0 ? parts.join(" / ") : "unattributed";
}
function collectAttestation(projectRoot) {
  const receipts = readAllFeatureReceipts(projectRoot);
  if (receipts.length === 0) {
    return {
      section: {
        id: "attestation",
        title: "Attestation",
        band: "unknown",
        score: null,
        summary: "No attestation receipts yet.",
        metrics: [],
        helper: HELPER3
      }
    };
  }
  const latest = latestFeatureReceipt(projectRoot);
  const statement = latest ? decodeReceiptStatement(latest) : null;
  const authorship = statement?.predicate.change_authorship ?? null;
  const result = statement?.predicate.verification_result ?? "FAILED";
  const acceptedBy = authorship?.accepting_human?.name;
  const metrics = [
    { label: "Latest result", value: result },
    { label: "Written by", value: authorLabel(authorship) },
    { label: "Accepted by", value: acceptedBy ?? "\u2014" }
  ];
  return {
    section: {
      id: "attestation",
      title: "Attestation",
      band: "green",
      score: 100,
      summary: `${receipts.length} receipt(s) \xB7 latest ${result} \xB7 ${authorLabel(authorship)}`,
      metrics,
      helper: HELPER3,
      details: {
        total: receipts.length,
        latest_result: result,
        latest_authorship: authorship
      }
    }
  };
}

// src/dashboard/collectors/decisions.ts
init_esm_shims();
import { existsSync as existsSync17 } from "fs";
import { join as join24 } from "path";
var HELPER4 = {
  what: "The Decision Pause Contract surfaces every flagged scope/security/architecture choice as a packet in .paqad/decisions/pending/. Agents must wait for resolution before continuing.",
  goodLooksLike: "Zero pending packets, or pending packets resolved within a couple of days."
};
function scorePending(pending) {
  if (pending.length === 0) return 100;
  let penalty = 0;
  for (const p of pending) {
    if (p.ageDays <= 1) penalty += 10;
    else if (p.ageDays <= 3) penalty += 20;
    else if (p.ageDays <= 7) penalty += 35;
    else penalty += 50;
  }
  return Math.max(0, 100 - penalty);
}
function collectDecisions(projectRoot, now = Date.now()) {
  const dir = join24(projectRoot, PATHS.DECISIONS_DIR);
  if (!existsSync17(dir)) {
    return {
      section: {
        id: "decisions",
        title: "Decisions",
        band: "unknown",
        score: null,
        summary: "No decisions directory \u2014 not using the Decision Pause Contract.",
        metrics: [],
        helper: HELPER4
      },
      attention: []
    };
  }
  const evidence = readDecisionEvidence(projectRoot);
  const pending = evidence.pending.map((p) => {
    const createdAt = p.createdAt !== null ? Date.parse(p.createdAt) : NaN;
    return {
      id: p.id,
      title: p.title,
      ageDays: ageInDays(Number.isFinite(createdAt) ? createdAt : now, now) ?? 0
    };
  }).sort((a, b) => b.ageDays - a.ageDays);
  const resolved = evidence.resolvedCount;
  const expired = evidence.expiredCount;
  const score = scorePending(pending);
  const oldest = pending[0] ?? null;
  const summary = pending.length === 0 ? `Clear \xB7 ${resolved} resolved \xB7 ${expired} expired` : `${pending.length} pending${oldest ? ` \xB7 oldest ${oldest.ageDays}d` : ""}`;
  const attention = pending.filter((p) => p.ageDays >= 1).slice(0, 3).map((p) => ({
    sectionId: "decisions",
    message: `Decision ${p.id} pending ${p.ageDays}d \u2014 ${p.title}`,
    severity: p.ageDays >= 7 ? "critical" : p.ageDays >= 3 ? "warn" : "info"
  }));
  return {
    section: {
      id: "decisions",
      title: "Decisions",
      band: bandForScore(score),
      score,
      summary,
      metrics: [
        { label: "pending", value: String(pending.length) },
        { label: "resolved", value: String(resolved) },
        { label: "expired", value: String(expired) }
      ],
      helper: HELPER4,
      details: {
        pending: pending.map((p) => ({ id: p.id, title: p.title, ageDays: p.ageDays }))
      }
    },
    attention
  };
}

// src/dashboard/collectors/delivery.ts
init_esm_shims();

// src/providers/registry.ts
init_esm_shims();
function resolveTicketProvider(servers, ticket) {
  const enabled = servers.filter((s) => s.enabled);
  if (ticket.server) {
    const named = enabled.find((s) => s.name === ticket.server);
    return {
      kind: ticket.provider,
      server: named ? named.name : null,
      connected: named !== void 0
    };
  }
  const byKind = enabled.find((s) => s.kind === ticket.provider);
  return {
    kind: ticket.provider,
    server: byKind ? byKind.name : null,
    connected: byKind !== void 0
  };
}

// src/dashboard/collectors/delivery.ts
var HELPER5 = {
  what: "docs/instructions/workflows/delivery-policy.yaml configures the ticket_intake \u2192 delivery loop: branch/commit/PR conventions, CI gate, and tracker transitions.",
  goodLooksLike: "Enabled, conventions detected from your repo, and both the host (GitHub) and tracker (Jira) MCP connected so PR + ticket automation is active."
};
function collectDelivery(projectRoot) {
  const { policy } = loadDeliveryPolicy(projectRoot);
  const profile = readProjectProfile(projectRoot);
  const detection = readLatestDeliveryEvidence(projectRoot);
  if (!policy.enabled) {
    return {
      section: {
        id: "delivery",
        title: "Delivery Workflow",
        band: "unknown",
        score: null,
        summary: "Disabled in delivery-policy.yaml",
        metrics: [{ label: "Enabled", value: "no" }],
        helper: HELPER5,
        details: { enabled: false }
      },
      attention: []
    };
  }
  const ticketRes = resolveTicketProvider(profile?.mcp?.servers ?? [], policy.process.ticket);
  const hostDetected = detection?.host?.value !== void 0 && detection.host.value === policy.process.host.provider;
  const connected = [ticketRes.connected, hostDetected].filter(Boolean).length;
  const score = connected === 2 ? 100 : connected === 1 ? 70 : 40;
  const manualSections = Object.entries(policy.process).filter(([, section2]) => section2.maintained === "manual").map(([name]) => name);
  const attention = [];
  if (!ticketRes.connected) {
    attention.push({
      sectionId: "delivery",
      message: `Connect a ${policy.process.ticket.provider} MCP to activate ticket status + decision comments.`,
      severity: "info"
    });
  }
  if (!hostDetected) {
    attention.push({
      sectionId: "delivery",
      message: `Connect ${policy.process.host.provider} (host) to activate PR + CI automation.`,
      severity: "info"
    });
  }
  return {
    section: {
      id: "delivery",
      title: "Delivery Workflow",
      band: bandForScore(score),
      score,
      summary: connected === 2 ? "Configured \xB7 GitHub \u2713 \xB7 Jira \u2713" : `Configured \xB7 ${policy.process.host.provider} ${hostDetected ? "\u2713" : "\u2717"} \xB7 ${policy.process.ticket.provider} ${ticketRes.connected ? "\u2713" : "\u2717 (dormant)"}`,
      metrics: [
        { label: "Host", value: `${policy.process.host.provider} ${hostDetected ? "\u2713" : "\u2717"}` },
        {
          label: "Tracker",
          value: `${policy.process.ticket.provider} ${ticketRes.connected ? "\u2713" : "\u2717"}`
        },
        {
          label: "Maintained",
          value: manualSections.length === 0 ? "all auto" : `${manualSections.length} manual`
        }
      ],
      helper: HELPER5,
      details: {
        enabled: policy.enabled,
        host: { provider: policy.process.host.provider, detected: hostDetected },
        ticket: {
          provider: policy.process.ticket.provider,
          server: ticketRes.server,
          connected: ticketRes.connected
        },
        ci_gate: policy.process.ci.gate,
        manual_sections: manualSections,
        detection
      }
    },
    attention
  };
}

// src/dashboard/collectors/framework-version.ts
init_esm_shims();
import { existsSync as existsSync18, readFileSync as readFileSync11 } from "fs";
import { join as join25 } from "path";

// src/core/constants/version.ts
init_esm_shims();
var FRAMEWORK_VERSION = VERSION;

// src/dashboard/collectors/framework-version.ts
function parseVersionFile(raw) {
  const result = { version: null, updatedAt: null };
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed === "" || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (key === "version") {
      result.version = value;
    } else if (key === "updated_at") {
      const ts = Date.parse(value);
      if (!Number.isNaN(ts)) result.updatedAt = ts;
    }
  }
  return result;
}
var HELPER6 = {
  what: "Pins the paqad-ai framework version the project was last updated to. Written by `paqad-ai update`.",
  goodLooksLike: "Matches the installed package version and was refreshed in the last 30 days."
};
function collectFrameworkVersion(projectRoot, now = Date.now()) {
  const path2 = join25(projectRoot, PATHS.FRAMEWORK_VERSION);
  if (!existsSync18(path2)) {
    return {
      section: {
        id: "framework-version",
        title: "Framework version",
        band: "unknown",
        score: null,
        summary: "No framework-version.txt \u2014 run `paqad-ai onboard` or `update`.",
        metrics: [],
        helper: HELPER6
      },
      frameworkVersion: null
    };
  }
  let parsed;
  try {
    parsed = parseVersionFile(readFileSync11(path2, "utf8"));
  } catch {
    parsed = { version: null, updatedAt: null };
  }
  const fileMtimeMs = fileMtime(path2);
  const refTimestamp = parsed.updatedAt ?? fileMtimeMs;
  const installed = FRAMEWORK_VERSION;
  const recorded = parsed.version;
  const matches = recorded !== null && recorded === installed;
  const freshness = scoreFreshness(refTimestamp, { now });
  const score = matches ? freshness : Math.min(60, freshness);
  const age = ageInDays(refTimestamp, now);
  const summary = matches ? `On v${installed}${age !== null ? ` \xB7 updated ${age}d ago` : ""}` : recorded === null ? `Installed v${installed} \xB7 version not recorded` : `Drift: project on v${recorded}, package v${installed}`;
  return {
    section: {
      id: "framework-version",
      title: "Framework version",
      band: bandForScore(score),
      score,
      summary,
      metrics: [
        { label: "recorded", value: recorded ?? "\u2014" },
        { label: "installed", value: installed },
        { label: "age", value: age !== null ? `${age}d` : "\u2014" }
      ],
      helper: HELPER6,
      details: {
        recordedVersion: recorded,
        installedVersion: installed,
        updatedAt: parsed.updatedAt,
        mtimeMs: fileMtimeMs
      }
    },
    frameworkVersion: recorded
  };
}

// src/dashboard/collectors/instructions-areas.ts
init_esm_shims();

// src/dashboard/collectors/docs-area.ts
init_esm_shims();
import { existsSync as existsSync19 } from "fs";
import { join as join26 } from "path";
var DEFAULT_FILTER = (n) => n.endsWith(".md") || n.endsWith(".yaml") || n.endsWith(".yml") || n.endsWith(".json");
function collectDocsArea(projectRoot, spec, now = Date.now()) {
  const absPath = join26(projectRoot, spec.relPath);
  const missingCommand = spec.missingCommand ?? "`create documentation`";
  if (!existsSync19(absPath)) {
    return {
      id: spec.id,
      title: spec.title,
      band: "unknown",
      score: null,
      summary: `Not configured \u2014 run ${missingCommand}.`,
      metrics: [],
      helper: spec.helper
    };
  }
  const fileFilter = spec.fileFilter ?? DEFAULT_FILTER;
  const entries = scanDirectory(absPath, { fileFilter });
  const expectedMin = Math.max(1, spec.expectedMin ?? 1);
  if (entries.length === 0) {
    return {
      id: spec.id,
      title: spec.title,
      band: "red",
      score: 0,
      summary: `Empty \u2014 run ${missingCommand}.`,
      metrics: [{ label: "files", value: "0" }],
      helper: spec.helper
    };
  }
  const presenceRatio = Math.min(1, entries.length / expectedMin);
  const freshness = scoreFreshnessAverage(
    entries.map((e) => e.mtimeMs),
    { now }
  );
  const score = Math.round(presenceRatio * 60 + freshness / 100 * 40);
  const newestMs = Math.max(...entries.map((e) => e.mtimeMs));
  const newestAge = ageInDays(newestMs, now);
  const staleCount = entries.filter((e) => scoreFreshness(e.mtimeMs, { now }) < 100).length;
  return {
    id: spec.id,
    title: spec.title,
    band: bandForScore(score),
    score,
    summary: staleCount === 0 ? `${entries.length} file(s) \xB7 all fresh` : `${entries.length} file(s) \xB7 ${staleCount} stale`,
    metrics: [
      { label: "files", value: String(entries.length) },
      { label: "stale", value: String(staleCount) },
      { label: "newest", value: newestAge !== null ? `${newestAge}d` : "\u2014" }
    ],
    helper: spec.helper,
    details: {
      entries: entries.slice(0, 50).map((e) => ({ path: e.relPath, mtimeMs: e.mtimeMs }))
    }
  };
}

// src/dashboard/collectors/instructions-areas.ts
var REGISTRIES_DIR = "docs/instructions/registries";
var TECH_DEBT_DIR = "docs/instructions/tech-debt";
var AREA_SPECS = [
  {
    id: "design-system",
    title: "Design system",
    relPath: PATHS.DESIGN_SYSTEM_DIR,
    expectedMin: 1,
    helper: {
      what: "docs/instructions/design-system/ holds tokens, components, and patterns. Every UI change is checked against these.",
      goodLooksLike: "tokens.md, components.md, and patterns.md present and kept in sync with the codebase."
    }
  },
  {
    id: "stack",
    title: "Stack",
    relPath: PATHS.FRAMEWORK_STACK_DIR,
    expectedMin: 2,
    helper: {
      what: "docs/instructions/stack/ documents the resolved framework, traits, and version bands the project runs on.",
      goodLooksLike: "overview.md and versions.md present, regenerated after every dependency change."
    },
    missingCommand: "`create documentation`"
  },
  {
    id: "registries",
    title: "Registries",
    relPath: REGISTRIES_DIR,
    expectedMin: 2,
    helper: {
      what: "docs/instructions/registries/ holds the canonical lookup pages (commands.md, modules.md) other docs reference.",
      goodLooksLike: "commands.md and modules.md generated by the docs workflow and refreshed when the project changes."
    },
    missingCommand: "`create documentation`"
  },
  {
    id: "tools",
    title: "Tools",
    relPath: PATHS.TOOLS_DIR,
    expectedMin: 1,
    helper: {
      what: "docs/instructions/tools/ lists per-stack tool integrations (e.g. React docs, MCP entries).",
      goodLooksLike: "At least one tool reference for each active stack."
    },
    missingCommand: "`paqad-ai refresh`"
  },
  {
    id: "tech-debt",
    title: "Tech debt",
    relPath: TECH_DEBT_DIR,
    expectedMin: 1,
    helper: {
      what: "docs/instructions/tech-debt/ tracks known shortcuts, TODOs, and deferred work the framework is aware of.",
      goodLooksLike: "A tech-debt overview present and refreshed as items are added or closed out."
    },
    missingCommand: "`create documentation`"
  }
];
function collectInstructionsAreas(projectRoot, now = Date.now()) {
  return AREA_SPECS.map(
    (spec) => collectDocsArea(
      projectRoot,
      {
        id: spec.id,
        title: spec.title,
        relPath: spec.relPath,
        expectedMin: spec.expectedMin,
        helper: spec.helper,
        missingCommand: spec.missingCommand
      },
      now
    )
  );
}
var INSTRUCTIONS_AREA_IDS = AREA_SPECS.map((s) => s.id);

// src/dashboard/collectors/module-decisions.ts
init_esm_shims();
var HELPER7 = {
  what: "Prospective MD-XXXX decisions written by the Attribution Gate during planning. Pending decisions are awaiting user approval; expired decisions outlived their TTL without being accepted.",
  goodLooksLike: "No pending or expired decisions. Run `paqad-ai module-decisions expire-stale` to sweep expired entries; accept or reject pending ones via the planning flow."
};
function bucket(decisions, now) {
  const buckets = {
    proposed: [],
    expired: [],
    accepted: [],
    rejected: [],
    superseded: [],
    draft: []
  };
  for (const d of decisions) {
    if (d.state === "proposed" && isExpired(d, now)) {
      buckets.expired.push(d);
      continue;
    }
    buckets[d.state].push(d);
  }
  return buckets;
}
function collectModuleDecisions(projectRoot, nowMs = Date.now()) {
  const now = new Date(nowMs);
  const all = listDecisions(projectRoot);
  if (all.length === 0) {
    return {
      section: {
        id: "module-decisions",
        title: "Module decisions",
        band: "unknown",
        score: null,
        summary: "No MD-XXXX decisions on disk.",
        metrics: [],
        helper: HELPER7
      },
      attention: [],
      expiredIds: []
    };
  }
  const b = bucket(all, now);
  const total = all.length;
  const score = Math.max(0, 100 - b.expired.length * 12 - b.proposed.length * 4);
  const summaryParts = [];
  if (b.proposed.length > 0) summaryParts.push(`${b.proposed.length} pending`);
  if (b.expired.length > 0) summaryParts.push(`${b.expired.length} expired`);
  if (b.accepted.length > 0) summaryParts.push(`${b.accepted.length} accepted`);
  const summary = summaryParts.length === 0 ? `${total} decision(s) \u2014 none pending or expired` : summaryParts.join(" \xB7 ");
  const attention = [];
  for (const d of b.expired.slice(0, 3)) {
    attention.push({
      sectionId: "module-decisions",
      message: `${d.id} (${d.proposed_slug}) expired \u2014 run \`paqad-ai module-decisions expire-stale\` or re-propose.`,
      severity: "warn"
    });
  }
  if (b.expired.length > 3) {
    attention.push({
      sectionId: "module-decisions",
      message: `${b.expired.length - 3} more expired decision(s).`,
      severity: "warn"
    });
  }
  if (b.proposed.length > 0) {
    attention.push({
      sectionId: "module-decisions",
      message: `${b.proposed.length} pending decision(s) awaiting acceptance.`,
      severity: "info"
    });
  }
  return {
    section: {
      id: "module-decisions",
      title: "Module decisions",
      band: bandForScore(score),
      score,
      summary,
      metrics: [
        { label: "pending", value: String(b.proposed.length) },
        { label: "expired", value: String(b.expired.length) },
        { label: "accepted", value: String(b.accepted.length) }
      ],
      helper: HELPER7,
      details: {
        counts: {
          draft: b.draft.length,
          proposed: b.proposed.length,
          expired: b.expired.length,
          accepted: b.accepted.length,
          rejected: b.rejected.length,
          superseded: b.superseded.length
        },
        pending: b.proposed.map((d) => ({
          id: d.id,
          slug: d.proposed_slug,
          expires_at: d.expires_at
        })),
        expired: b.expired.map((d) => ({
          id: d.id,
          slug: d.proposed_slug,
          expires_at: d.expires_at
        }))
      }
    },
    attention,
    expiredIds: b.expired.map((d) => d.id)
  };
}

// src/dashboard/collectors/module-events.ts
init_esm_shims();
var HELPER8 = {
  what: "Append-only audit log of every accepted module decision, reconciliation, and health rollup. Written to .paqad/module-map/events.jsonl by `paqad-ai module-decisions`, `paqad-ai module-map reconcile`, and `paqad-ai module-health rollup`.",
  goodLooksLike: "Recent entries from each of: module.declared, module.reconciled, module.health.rolled-up. Investigate quiet streams (no rollups in the last week could mean the checks stage stopped firing)."
};
var RECENT_LIMIT = 10;
function groupByType(events) {
  const out = {};
  for (const e of events) {
    out[e.type] = (out[e.type] ?? 0) + 1;
  }
  return out;
}
function lastEventByType(events) {
  const out = {};
  for (let i = events.length - 1; i >= 0; i--) {
    const e = events[i];
    if (e === void 0) continue;
    if (out[e.type] === void 0) out[e.type] = e.ts;
  }
  return out;
}
function collectModuleEvents(projectRoot) {
  const events = readModuleMapEvents(projectRoot);
  if (events.length === 0) {
    return {
      section: {
        id: "module-events",
        title: "Module events",
        band: "unknown",
        score: null,
        summary: "No module events recorded yet.",
        metrics: [],
        helper: HELPER8
      },
      attention: []
    };
  }
  const counts = groupByType(events);
  const lastByType = lastEventByType(events);
  const recent = events.slice(-RECENT_LIMIT).reverse();
  const summary = `${events.length} event(s) \xB7 ${Object.keys(counts).length} type(s)`;
  const topTypes = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);
  return {
    section: {
      id: "module-events",
      title: "Module events",
      band: "green",
      score: 100,
      summary,
      metrics: topTypes.map(([type, count]) => ({
        label: type,
        value: String(count)
      })),
      helper: HELPER8,
      details: {
        total: events.length,
        counts,
        last_by_type: lastByType,
        recent
      }
    },
    attention: []
  };
}

// src/dashboard/collectors/codebase-health.ts
init_esm_shims();
import { existsSync as existsSync21, readdirSync as readdirSync7 } from "fs";
import { join as join28 } from "path";

// src/codebase-health/store.ts
init_esm_shims();
import { existsSync as existsSync20, readFileSync as readFileSync12, readdirSync as readdirSync6 } from "fs";
import { join as join27 } from "path";
function readHealthSidecar(path2) {
  if (!existsSync20(path2)) return null;
  try {
    const parsed = JSON.parse(readFileSync12(path2, "utf8"));
    if (!Array.isArray(parsed.findings)) return null;
    return parsed;
  } catch {
    return null;
  }
}
function findLatestSidecar(projectRoot) {
  const dir = join27(projectRoot, PATHS.HEALTH_DIR);
  if (!existsSync20(dir)) return null;
  const candidates = readdirSync6(dir).filter((name) => name.endsWith(".json") && !name.includes("-retest-")).sort();
  const latest = candidates.at(-1);
  return latest ? join27(dir, latest) : null;
}

// src/dashboard/collectors/codebase-health.ts
var HELPER9 = {
  what: "Each `paqad-ai health run` writes a report + sidecar under docs/health/ with findings, blocked checks, and the baseline ratchet.",
  goodLooksLike: "A recent run with no open findings, or a retest closing prior findings; blocked checks resolved by installing the named tool."
};
function listSidecars(projectRoot) {
  const dir = join28(projectRoot, PATHS.HEALTH_DIR);
  if (!existsSync21(dir)) return [];
  try {
    return readdirSync7(dir).filter((name) => name.endsWith(".json") && !name.includes("-retest-")).sort().map((name) => join28(dir, name));
  } catch {
    return [];
  }
}
function emptySection(summary) {
  return {
    section: {
      id: "codebase-health",
      title: "Codebase health",
      band: "unknown",
      score: null,
      summary,
      metrics: [],
      helper: HELPER9
    },
    attention: []
  };
}
function collectCodebaseHealth(projectRoot, now = Date.now()) {
  const sidecars = listSidecars(projectRoot);
  if (sidecars.length === 0) {
    return emptySection("No health runs yet \u2014 run `paqad-ai health run` when you need one.");
  }
  const latestPath = sidecars.at(-1);
  const report2 = readHealthSidecar(latestPath);
  if (!report2) {
    return emptySection("Health reports present but the latest sidecar is unreadable.");
  }
  const updatedMs = Date.parse(report2.generated_at);
  const findingCount = report2.findings.length;
  const openFindings = report2.findings.filter((finding) => finding.status === "open").length;
  const freshness = scoreFreshness(Number.isFinite(updatedMs) ? updatedMs : null, { now });
  const findingsScore = findingCount === 0 ? 100 : Math.max(0, 100 - findingCount * 10);
  let score = Math.round(freshness * 0.5 + findingsScore * 0.5);
  if (report2.blocked_checks.length > 0) {
    score = Math.min(score, 80);
  }
  const age = ageInDays(Number.isFinite(updatedMs) ? updatedMs : null, now);
  const summary = `${sidecars.length} run(s) \xB7 ${findingCount} finding(s) \xB7 ${report2.blocked_checks.length} blocked${age !== null ? ` \xB7 ${age}d ago` : ""}`;
  const attention = openFindings > 0 ? [
    {
      sectionId: "codebase-health",
      message: `${openFindings} open codebase-health finding(s) in ${report2.report_id}`,
      severity: openFindings >= 5 ? "critical" : "warn"
    }
  ] : [];
  return {
    section: {
      id: "codebase-health",
      title: "Codebase health",
      band: bandForScore(score),
      score,
      summary,
      metrics: [
        { label: "runs", value: String(sidecars.length) },
        { label: "open findings", value: String(openFindings) },
        { label: "blocked", value: String(report2.blocked_checks.length) },
        { label: "latest", value: age !== null ? `${age}d` : "\u2014" }
      ],
      helper: HELPER9,
      details: {
        latestReport: report2.report_id,
        findings: findingCount,
        blockedChecks: report2.blocked_checks
      }
    },
    attention
  };
}

// src/dashboard/collectors/site-map.ts
init_esm_shims();
var HELPER10 = {
  what: "The stored map at docs/site-map/ is the single source of truth. Each Run on the Site map area checks every cited file:line against the code and stamps the earned trust and freshness back into the map.",
  goodLooksLike: "A map whose cited anchors all still resolve against the code, with journeys confirmed through the audited surface."
};
function emptySection2(summary) {
  return {
    section: {
      id: "site-map",
      title: "Site map",
      band: "unknown",
      score: null,
      summary,
      metrics: [],
      helper: HELPER10
    },
    attention: []
  };
}
function collectSiteMap(projectRoot) {
  const map = readCanonicalSiteMap(projectRoot);
  if (map === null) {
    return emptySection2("No site map yet \u2014 create one from the Site map area when you need it.");
  }
  const surfaceCount = map.surfaces.length;
  const journeyCount = readAllJourneys(projectRoot).length;
  const freshness = map.app.freshness;
  if (freshness === void 0) {
    return {
      section: {
        id: "site-map",
        title: "Site map",
        band: "unknown",
        score: null,
        summary: `${surfaceCount} surface(s) \xB7 ${journeyCount} journey(s) \xB7 not yet checked against code`,
        metrics: [
          { label: "surfaces", value: String(surfaceCount) },
          { label: "journeys", value: String(journeyCount) },
          { label: "anchors checked", value: "\u2014" }
        ],
        helper: HELPER10,
        details: { surfaces: surfaceCount, journeys: journeyCount, freshness: null }
      },
      attention: []
    };
  }
  const score = freshness.anchors_total === 0 ? 100 : Math.round(100 * freshness.anchors_resolved / freshness.anchors_total);
  const stale = isStale(freshness);
  const attention = stale ? [
    {
      sectionId: "site-map",
      message: `Site map has drifted from code: ${freshness.anchors_broken} of ${freshness.anchors_total} cited anchors no longer resolve`,
      severity: freshness.anchors_broken >= 5 ? "critical" : "warn"
    }
  ] : [];
  return {
    section: {
      id: "site-map",
      title: "Site map",
      band: bandForScore(score),
      score,
      summary: `${surfaceCount} surface(s) \xB7 ${journeyCount} journey(s) \xB7 ${freshness.anchors_resolved} of ${freshness.anchors_total} anchors resolve`,
      metrics: [
        { label: "surfaces", value: String(surfaceCount) },
        { label: "journeys", value: String(journeyCount) },
        {
          label: "anchors resolving",
          value: `${freshness.anchors_resolved}/${freshness.anchors_total}`
        },
        { label: "broken anchors", value: String(freshness.anchors_broken) }
      ],
      helper: HELPER10,
      details: {
        surfaces: surfaceCount,
        journeys: journeyCount,
        freshness,
        stale
      }
    },
    attention
  };
}

// src/dashboard/collectors/module-health.ts
init_esm_shims();
import { execFileSync } from "child_process";
import { existsSync as existsSync22, readFileSync as readFileSync13 } from "fs";
import { join as join29 } from "path";
var STALE_FLAG_WINDOW_DAYS = 14;
function lastCommitTouchingSources(projectRoot, sources, windowDays) {
  if (sources.length === 0) return null;
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", `--since=${windowDays}.days.ago`, "--", ...sources],
      {
        cwd: projectRoot,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"]
      }
    ).trim();
    return out.length > 0 ? out : null;
  } catch {
    return null;
  }
}
var HELPER11 = {
  what: "Per-module health, defect density, risk floor, and complexity scores stored under .paqad/module-health/. Drives the graph intelligence overlays.",
  goodLooksLike: "Every module classified, no fragile modules, and all entries refreshed in the last 30 days."
};
var TIER_WEIGHTS = {
  stable: 100,
  moderate: 70,
  fragile: 25,
  unknown: 0
};
function collectModuleHealth(projectRoot, now = Date.now()) {
  const dir = join29(projectRoot, PATHS.PLANNING_MODULE_HEALTH_DIR);
  if (!existsSync22(dir)) {
    return {
      section: {
        id: "module-health",
        title: "Module health",
        band: "unknown",
        score: null,
        summary: "No module-health entries \u2014 run `paqad-ai module-health sync`.",
        metrics: [],
        helper: HELPER11
      },
      attention: [],
      staleModules: []
    };
  }
  const entries = [];
  for (const entry of scanDirectory(dir, { maxDepth: 1, fileFilter: (n) => n.endsWith(".json") })) {
    let parsed;
    try {
      parsed = JSON.parse(readFileSync13(entry.absPath, "utf8"));
    } catch {
      continue;
    }
    const tier = parsed.tier === "stable" || parsed.tier === "moderate" || parsed.tier === "fragile" || parsed.tier === "unknown" ? parsed.tier : "unknown";
    const refMs = parsed.updated_at !== void 0 ? Date.parse(parsed.updated_at) : NaN;
    const ts = Number.isFinite(refMs) ? refMs : entry.mtimeMs;
    entries.push({
      tier,
      module: parsed.module ?? entry.relPath.replace(/\.json$/, ""),
      ageDays: ageInDays(ts, now) ?? 0,
      updatedAtIso: parsed.updated_at ?? null
    });
  }
  if (entries.length === 0) {
    return {
      section: {
        id: "module-health",
        title: "Module health",
        band: "unknown",
        score: null,
        summary: "module-health directory is empty.",
        metrics: [],
        helper: HELPER11
      },
      attention: [],
      staleModules: []
    };
  }
  const map = readRawModuleMap(projectRoot);
  const sourcesBySlug = /* @__PURE__ */ new Map();
  for (const mod of map?.modules ?? []) {
    sourcesBySlug.set(mod.slug, mod.sources);
  }
  const staleModules = [];
  for (const e of entries) {
    const sources = sourcesBySlug.get(e.module);
    if (sources === void 0 || sources.length === 0) continue;
    const lastCommitIso = lastCommitTouchingSources(projectRoot, sources, STALE_FLAG_WINDOW_DAYS);
    if (lastCommitIso === null) continue;
    const updatedMs = e.updatedAtIso !== null ? Date.parse(e.updatedAtIso) : NaN;
    const commitMs = Date.parse(lastCommitIso);
    if (!Number.isFinite(commitMs)) continue;
    if (!Number.isFinite(updatedMs) || updatedMs < commitMs) {
      staleModules.push(e.module);
    }
  }
  const distribution = {
    stable: 0,
    moderate: 0,
    fragile: 0,
    unknown: 0
  };
  for (const e of entries) distribution[e.tier] += 1;
  const tierScore = entries.reduce((sum2, e) => sum2 + TIER_WEIGHTS[e.tier], 0) / entries.length;
  const oldest = [...entries].sort((a, b) => b.ageDays - a.ageDays)[0];
  const stalenessPenalty = oldest && oldest.ageDays > 30 ? Math.min(20, oldest.ageDays - 30) : 0;
  const stalePenalty = Math.min(30, staleModules.length * 5);
  const score = Math.max(0, Math.min(100, Math.round(tierScore - stalenessPenalty - stalePenalty)));
  const fragile = entries.filter((e) => e.tier === "fragile");
  const summary = fragile.length > 0 ? `${distribution.stable} stable \xB7 ${distribution.moderate} moderate \xB7 ${fragile.length} fragile` : `${distribution.stable} stable \xB7 ${distribution.moderate} moderate \xB7 ${distribution.unknown} unknown`;
  const attention = fragile.slice(0, 3).map((e) => ({
    sectionId: "module-health",
    message: `Module \`${e.module}\` is fragile`,
    severity: "critical"
  }));
  for (const slug of staleModules.slice(0, 3)) {
    attention.push({
      sectionId: "module-health",
      message: `Module \`${slug}\` health predates recent source commits \u2014 run \`paqad-ai module-health rollup\`.`,
      severity: "warn"
    });
  }
  if (staleModules.length > 3) {
    attention.push({
      sectionId: "module-health",
      message: `${staleModules.length - 3} more module(s) have stale health.`,
      severity: "warn"
    });
  }
  return {
    section: {
      id: "module-health",
      title: "Module health",
      band: bandForScore(score),
      score,
      summary,
      metrics: [
        { label: "stable", value: String(distribution.stable) },
        { label: "moderate/fragile", value: `${distribution.moderate}/${distribution.fragile}` },
        { label: "oldest", value: oldest ? `${oldest.ageDays}d` : "\u2014" }
      ],
      helper: HELPER11,
      details: {
        distribution,
        entries: entries.map((e) => ({ module: e.module, tier: e.tier, ageDays: e.ageDays })),
        stale_modules: staleModules
      }
    },
    attention,
    staleModules
  };
}

// src/dashboard/collectors/module-map-drift.ts
init_esm_shims();
import { existsSync as existsSync23, readFileSync as readFileSync14 } from "fs";
import { join as join30 } from "path";
var HELPER12 = {
  what: "Module-map drift compares the source tree under source_roots to module-map.yml + docs/modules/. Findings are written to .paqad/module-map/drift.json by `paqad-ai module-map reconcile` or by `paqad-ai refresh`.",
  goodLooksLike: "No MM-* findings; `blocked: null`. Re-run `paqad-ai refresh --reconcile-module-map` after restructuring code."
};
function readReport(projectRoot) {
  const path2 = join30(projectRoot, PATHS.MODULE_MAP_DRIFT);
  if (!existsSync23(path2)) return null;
  try {
    return JSON.parse(readFileSync14(path2, "utf8"));
  } catch {
    return null;
  }
}
function aggregatePerModule(report2) {
  const out = {};
  for (const f of report2.findings) {
    const key = f.module_slug ?? "<undeclared>";
    out[key] = (out[key] ?? 0) + 1;
  }
  return out;
}
function collectModuleMapDrift(projectRoot) {
  const report2 = readReport(projectRoot);
  if (report2 === null) {
    return {
      section: {
        id: "module-map-drift",
        title: "Module map drift",
        band: "unknown",
        score: null,
        summary: "No drift.json \u2014 run `paqad-ai module-map reconcile` or `paqad-ai refresh`.",
        metrics: [],
        helper: HELPER12
      },
      attention: []
    };
  }
  if (report2.blocked !== null) {
    return {
      section: {
        id: "module-map-drift",
        title: "Module map drift",
        band: "unknown",
        score: null,
        summary: `Reconciler blocked: ${report2.blocked}. Add module_health.source_roots to the active stack pack.`,
        metrics: [{ label: "blocked", value: report2.blocked }],
        helper: HELPER12
      },
      attention: [
        {
          sectionId: "module-map-drift",
          message: "Reconciler cannot run \u2014 missing module_health.source_roots.",
          severity: "warn"
        }
      ]
    };
  }
  const total = report2.findings.length;
  const score = Math.max(0, 100 - total * 8);
  const perModule = aggregatePerModule(report2);
  const topModules = Object.entries(perModule).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const summary = total === 0 ? `No drift \xB7 ${report2.source_roots.join(", ")}` : `${total} finding(s) across ${Object.keys(perModule).length} module(s)`;
  const attention = [];
  const docMissing = report2.findings.filter((f) => f.code === "MM-DOC-MISSING");
  if (docMissing.length > 0) {
    attention.push({
      sectionId: "module-map-drift",
      message: `${docMissing.length} module(s) missing docs/modules/ directory.`,
      severity: "warn"
    });
  }
  const undeclared = report2.findings.filter((f) => f.code === "MM-ADD" || f.code === "MM-MISMATCH");
  if (undeclared.length > 0) {
    attention.push({
      sectionId: "module-map-drift",
      message: `${undeclared.length} undeclared / mismatched module path(s).`,
      severity: undeclared.length >= 3 ? "critical" : "warn"
    });
  }
  const codeBreakdown = [];
  for (const [code, count] of Object.entries(report2.counts)) {
    if (count > 0) codeBreakdown.push({ label: code, value: String(count) });
  }
  return {
    section: {
      id: "module-map-drift",
      title: "Module map drift",
      band: bandForScore(score),
      score,
      summary,
      metrics: [
        { label: "findings", value: String(total) },
        { label: "source_roots", value: report2.source_roots.join(", ") || "\u2014" },
        ...codeBreakdown
      ],
      helper: HELPER12,
      details: {
        generated_at: report2.generated_at,
        per_module: perModule,
        top_modules: topModules,
        sample_findings: report2.findings.slice(0, 10)
      }
    },
    attention
  };
}

// src/dashboard/collectors/pentest.ts
init_esm_shims();
import { existsSync as existsSync24, readFileSync as readFileSync15, readdirSync as readdirSync8 } from "fs";
import { join as join31 } from "path";
var HELPER13 = {
  what: "Each run of the pentest workflow leaves a progress.json + findings under .paqad/pentest/runs/<run_id>/.",
  goodLooksLike: "A recent completed run with no open findings, or an incremental retest closing prior findings."
};
function listRuns(projectRoot) {
  const dir = join31(projectRoot, PATHS.PENTEST_RUNS_DIR);
  if (!existsSync24(dir)) return [];
  try {
    return readdirSync8(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
  } catch {
    return [];
  }
}
function readRun(projectRoot, runId) {
  const progressPath2 = join31(projectRoot, PATHS.PENTEST_RUNS_DIR, runId, "progress.json");
  if (!existsSync24(progressPath2)) return null;
  let progress;
  try {
    progress = JSON.parse(readFileSync15(progressPath2, "utf8"));
  } catch {
    return null;
  }
  const updatedRaw = progress.updated_at ?? progress.started_at;
  const updatedParsed = typeof updatedRaw === "string" ? Date.parse(updatedRaw) : NaN;
  const updatedMs = Number.isFinite(updatedParsed) ? updatedParsed : fileMtime(progressPath2);
  return {
    runId,
    status: progress.status === "running" || progress.status === "completed" || progress.status === "blocked" || progress.status === "failed" ? progress.status : "unknown",
    updatedMs,
    findingCount: Array.isArray(progress.current_finding_ids) ? progress.current_finding_ids.length : 0
  };
}
function collectPentest(projectRoot, now = Date.now()) {
  const runs = listRuns(projectRoot);
  if (runs.length === 0) {
    return {
      section: {
        id: "pentest",
        title: "Pentest",
        band: "unknown",
        score: null,
        summary: "No pentest runs yet \u2014 run the pentest workflow when you need one.",
        metrics: [],
        helper: HELPER13
      },
      attention: []
    };
  }
  const summaries = runs.map((r) => readRun(projectRoot, r)).filter((r) => r !== null).sort((a, b) => (b.updatedMs ?? 0) - (a.updatedMs ?? 0));
  if (summaries.length === 0) {
    return {
      section: {
        id: "pentest",
        title: "Pentest",
        band: "unknown",
        score: null,
        summary: "Pentest runs present but no readable progress.json files.",
        metrics: [],
        helper: HELPER13
      },
      attention: []
    };
  }
  const latest = summaries[0];
  const freshness = scoreFreshness(latest.updatedMs, { now });
  const findingsScore = latest.findingCount === 0 ? 100 : Math.max(0, 100 - latest.findingCount * 20);
  let score = Math.round(freshness * 0.5 + findingsScore * 0.5);
  if (latest.status === "blocked" || latest.status === "failed") {
    score = Math.min(score, 40);
  }
  const age = ageInDays(latest.updatedMs, now);
  const summary = `${summaries.length} run(s) \xB7 latest ${latest.status} \xB7 ${latest.findingCount} finding(s)${age !== null ? ` \xB7 ${age}d ago` : ""}`;
  const attention = latest.findingCount > 0 ? [
    {
      sectionId: "pentest",
      message: `${latest.findingCount} open pentest finding(s) in run ${latest.runId}`,
      severity: latest.findingCount >= 3 ? "critical" : "warn"
    }
  ] : [];
  return {
    section: {
      id: "pentest",
      title: "Pentest",
      band: bandForScore(score),
      score,
      summary,
      metrics: [
        { label: "runs", value: String(summaries.length) },
        { label: "open findings", value: String(latest.findingCount) },
        { label: "latest", value: age !== null ? `${age}d` : "\u2014" }
      ],
      helper: HELPER13,
      details: {
        latestRun: latest,
        runs: summaries.slice(0, 10)
      }
    },
    attention
  };
}

// src/dashboard/collectors/project-profile.ts
init_esm_shims();
var import_yaml7 = __toESM(require_dist(), 1);
import { existsSync as existsSync25, readFileSync as readFileSync16 } from "fs";
import { join as join32 } from "path";
var REQUIRED_FIELDS = [
  {
    label: "project.name",
    check: (p) => typeof p.project?.name === "string" && p.project.name.trim().length > 0
  },
  {
    label: "project.id",
    check: (p) => typeof p.project?.id === "string" && p.project.id.trim().length > 0
  },
  {
    label: "commands.install",
    check: (p) => typeof p.commands?.install === "string"
  },
  {
    label: "commands.test",
    check: (p) => typeof p.commands?.test === "string"
  },
  {
    label: "commands.build",
    check: (p) => typeof p.commands?.build === "string"
  },
  {
    label: "routing.domain",
    check: (p) => typeof p.routing?.domain === "string"
  }
];
var HELPER14 = {
  what: "The project-profile.yaml file is the framework's declaration of your project: name, ID, commands, RAG, and MCP servers.",
  goodLooksLike: "All required fields filled in by onboarding, commands updated to match the real toolchain, and RAG configured if you want vector retrieval."
};
function collectProjectProfile(projectRoot) {
  const profilePath = join32(projectRoot, PATHS.PROJECT_PROFILE);
  if (!existsSync25(profilePath)) {
    return {
      section: {
        id: "project-profile",
        title: "Project profile",
        band: "unknown",
        score: null,
        summary: "Run `paqad-ai onboard` to create project-profile.yaml.",
        metrics: [],
        helper: HELPER14
      },
      projectName: null
    };
  }
  let profile = null;
  try {
    profile = import_yaml7.default.parse(readFileSync16(profilePath, "utf8")) ?? {};
  } catch {
    profile = null;
  }
  if (profile === null) {
    return {
      section: {
        id: "project-profile",
        title: "Project profile",
        band: "red",
        score: 0,
        summary: "project-profile.yaml is present but failed to parse.",
        metrics: [{ label: "parse", value: "failed" }],
        helper: HELPER14
      },
      projectName: null
    };
  }
  const presentFields = REQUIRED_FIELDS.filter((f) => f.check(profile)).length;
  const score = scorePresence({ expected: REQUIRED_FIELDS.length, present: presentFields });
  const ragEnabled = profile.intelligence?.rag_enabled === true;
  const mcpServers = Array.isArray(profile.mcp?.servers) ? profile.mcp.servers.length : 0;
  const mtime = fileMtime(profilePath);
  const name = typeof profile.project?.name === "string" ? profile.project.name : null;
  const summary = presentFields === REQUIRED_FIELDS.length ? `Profile complete \xB7 RAG ${ragEnabled ? "on" : "off"} \xB7 ${mcpServers} MCP server(s) recommended` : `Missing ${REQUIRED_FIELDS.length - presentFields} required field(s)`;
  return {
    section: {
      id: "project-profile",
      title: "Project profile",
      band: bandForScore(score),
      score,
      summary,
      metrics: [
        { label: "required fields", value: `${presentFields}/${REQUIRED_FIELDS.length}` },
        { label: "rag", value: ragEnabled ? "on" : "off" },
        { label: "mcp servers recommended", value: String(mcpServers) }
      ],
      helper: HELPER14,
      details: {
        mtimeMs: mtime,
        missingFields: REQUIRED_FIELDS.filter((f) => !f.check(profile)).map((f) => f.label)
      }
    },
    projectName: name
  };
}

// src/dashboard/collectors/rag-status.ts
init_esm_shims();
var import_yaml8 = __toESM(require_dist(), 1);
import { existsSync as existsSync26, readFileSync as readFileSync17 } from "fs";
import { join as join33 } from "path";
var HELPER15 = {
  what: "Hybrid RAG combines vector embeddings with keyword/symbol/path scoring to retrieve relevant context. Configured via project-profile.yaml and indexed under .paqad/vectors/.",
  goodLooksLike: "rag_enabled: true, an embedding_provider set, and a vector index refreshed in the last 30 days."
};
function collectRagStatus(projectRoot, now = Date.now()) {
  const profilePath = join33(projectRoot, PATHS.PROJECT_PROFILE);
  let profile = null;
  if (existsSync26(profilePath)) {
    try {
      profile = import_yaml8.default.parse(readFileSync17(profilePath, "utf8")) ?? {};
    } catch {
      profile = null;
    }
  }
  if (profile === null) {
    return {
      id: "rag-status",
      title: "RAG status",
      band: "unknown",
      score: null,
      summary: "No project-profile.yaml \u2014 RAG status unknown.",
      metrics: [],
      helper: HELPER15
    };
  }
  const enabled = profile.intelligence?.rag_enabled === true;
  if (!enabled) {
    return {
      id: "rag-status",
      title: "RAG status",
      band: "unknown",
      score: null,
      summary: "RAG disabled in project-profile.yaml.",
      metrics: [{ label: "rag", value: "disabled" }],
      helper: HELPER15
    };
  }
  const provider = typeof profile.intelligence?.embedding_provider === "string" ? profile.intelligence.embedding_provider : null;
  const vectorMeta = join33(projectRoot, PATHS.VECTOR_META);
  const vectorIndex = join33(projectRoot, PATHS.VECTOR_INDEX);
  const vectorPresent = existsSync26(vectorMeta) || existsSync26(vectorIndex);
  const indexMtime = fileMtime(vectorMeta) ?? fileMtime(vectorIndex);
  const indexFreshness = scoreFreshness(indexMtime, { now });
  let score = 0;
  if (provider !== null) score += 30;
  if (vectorPresent) score += 30;
  score += Math.round(indexFreshness * 40 / 100);
  const age = ageInDays(indexMtime, now);
  const summary = !vectorPresent ? `Enabled but no index \u2014 run \`paqad-ai rag rebuild\`.` : provider === null ? "Enabled but no embedding provider configured." : `${provider} \xB7 index ${age !== null ? `${age}d old` : "present"}`;
  return {
    id: "rag-status",
    title: "RAG status",
    band: bandForScore(score),
    score,
    summary,
    metrics: [
      { label: "provider", value: provider ?? "\u2014" },
      { label: "index", value: vectorPresent ? "present" : "missing" },
      { label: "age", value: age !== null ? `${age}d` : "\u2014" }
    ],
    helper: HELPER15,
    details: {
      enabled,
      provider,
      vectorMtimeMs: indexMtime
    }
  };
}

// src/dashboard/collectors/rule-compliance.ts
init_esm_shims();
var HELPER16 = {
  what: "Rules-as-scripts turns each rule under docs/instructions/rules/** into a deterministic verification script enforced during feature-development.checks.",
  goodLooksLike: "Every verifiable rule covered by a passing script, no drift, findings report fresh."
};
function latestFindingsRow(rows) {
  const findings = rows.filter((row) => row.kind === "findings");
  if (findings.length === 0) {
    return null;
  }
  const at2 = (row) => rowRecordedAt(row) ?? "";
  const latest = findings.reduce((best, row) => at2(row) >= at2(best) ? row : best);
  const counts = latest.counts;
  return { deterministic: counts?.deterministic ?? 0 };
}
function collectRuleCompliance(projectRoot) {
  const map = loadRuleScriptMap(projectRoot);
  const attention = [];
  if (!map || map.rules.length === 0) {
    attention.push({
      sectionId: "rule-compliance",
      message: "Rules not yet scripted \u2014 type `analyze rules` to classify them.",
      severity: "info"
    });
    return {
      section: {
        id: "rule-compliance",
        title: "Rule Compliance",
        band: "unknown",
        score: null,
        summary: "No rule-script map \u2014 run `analyze rules`",
        metrics: [{ label: "rules", value: "\u2014" }],
        helper: HELPER16
      },
      attention
    };
  }
  const total = map.rules.length;
  const unverifiable = map.rules.filter((r) => r.verifiability.kind === "unverifiable").length;
  const enforcedElsewhere = map.rules.filter((r) => r.enforced_by.length > 0).length;
  const verifiable = map.rules.filter(
    (r) => r.verifiability.kind !== "unverifiable" && r.enforced_by.length === 0
  );
  const covered = verifiable.filter((r) => r.scripts.length > 0).length;
  const uncovered = verifiable.length - covered;
  const drift = readDrift(projectRoot);
  const findings = latestFindingsRow(readAllFeatureRuleRuns(projectRoot));
  const driftBlocking = drift?.blocked ?? false;
  const deterministicFindings = findings?.deterministic ?? 0;
  let band;
  let score;
  if (driftBlocking || deterministicFindings > 0) {
    band = "red";
    score = 40;
  } else if (uncovered > 0) {
    band = "amber";
    score = 70;
  } else {
    band = "green";
    score = 100;
  }
  if (drift && driftBlocking) {
    const stale = drift.counts["RS-SCRIPT-STALE"] + drift.counts["RS-RULE-EDITED"];
    if (stale > 0) {
      attention.push({
        sectionId: "rule-compliance",
        message: "Rules edited but scripts not regenerated \u2014 type `generate rule scripts`.",
        severity: "warn"
      });
    }
    if (drift.counts["RS-FIXTURE-FAIL"] > 0) {
      attention.push({
        sectionId: "rule-compliance",
        message: `${drift.counts["RS-FIXTURE-FAIL"]} script(s) failing fixtures \u2014 type \`regenerate scripts for rule RL-\u2026\`.`,
        severity: "critical"
      });
    }
    if (drift.counts["RS-RULE-ADDED"] > 0) {
      attention.push({
        sectionId: "rule-compliance",
        message: "Unscripted rules added \u2014 type `analyze rules` then `generate rule scripts`.",
        severity: "warn"
      });
    }
  }
  if (uncovered > 0) {
    attention.push({
      sectionId: "rule-compliance",
      message: `${uncovered} verifiable rule(s) without scripts \u2014 type \`generate rule scripts\`.`,
      severity: "info"
    });
  }
  if (unverifiable > 0) {
    attention.push({
      sectionId: "rule-compliance",
      message: `${unverifiable} rule(s) marked unverifiable \u2014 consider rewording (see rule-script-map.yml).`,
      severity: "info"
    });
  }
  const driftNote = driftBlocking ? " \u2022 drift" : "";
  const summary = `${covered}/${verifiable.length} verifiable covered \u2022 ${unverifiable} unverifiable${driftNote}`;
  return {
    section: {
      id: "rule-compliance",
      title: "Rule Compliance",
      band,
      score,
      summary: summary.slice(0, 60),
      metrics: [
        { label: "covered", value: `${covered}/${verifiable.length}` },
        { label: "enforced elsewhere", value: String(enforcedElsewhere) },
        { label: "findings", value: String(deterministicFindings) }
      ],
      helper: HELPER16,
      details: {
        total,
        covered,
        uncovered,
        unverifiable,
        enforced_elsewhere: enforcedElsewhere,
        drift_blocking: driftBlocking,
        deterministic_findings: deterministicFindings
      }
    },
    attention
  };
}

// src/dashboard/collectors/change-metrics.ts
init_esm_shims();
var WINDOW = 20;
var HELPER17 = {
  what: "Change shape tracks two deterministic, zero-token numbers per change: the % of new code that near-duplicates existing code, and cross-file reuse calls per 100 changed lines.",
  goodLooksLike: "Duplication trending toward 0% and reuse holding or rising over time."
};
function numberOrNull(value) {
  return typeof value === "number" ? value : null;
}
function bandForDuplication(latestDup) {
  if (latestDup === null) {
    return { band: "unknown", score: null };
  }
  if (latestDup <= 3) {
    return { band: "green", score: 95 };
  }
  if (latestDup <= 10) {
    return { band: "amber", score: 65 };
  }
  return { band: "red", score: 30 };
}
function collectChangeMetrics(projectRoot) {
  const rows = readFeatureChangeMetricsWindow(projectRoot, WINDOW);
  if (rows.length === 0) {
    return {
      section: {
        id: "change-metrics",
        title: "Change Shape",
        band: "unknown",
        score: null,
        summary: "No changes measured yet",
        metrics: [{ label: "changes", value: "\u2014" }],
        helper: HELPER17
      },
      attention: []
    };
  }
  const dupSeries = rows.map((row) => numberOrNull(row.dup_new_pct));
  const reuseSeries = rows.map((row) => numberOrNull(row.reuse_rate));
  const latestDup = [...dupSeries].reverse().find((value) => value !== null) ?? null;
  const latestReuse = [...reuseSeries].reverse().find((value) => value !== null) ?? null;
  const { band, score } = bandForDuplication(latestDup);
  const dupText = latestDup === null ? "n/a" : `${latestDup}%`;
  const reuseText = latestReuse === null ? "n/a" : latestReuse.toFixed(1);
  const summary = `dup ${dupText} \xB7 reuse ${reuseText}/100 \xB7 ${rows.length} changes`;
  const attention = [];
  if (band === "red") {
    attention.push({
      sectionId: "change-metrics",
      message: `New code is duplicating existing code (${dupText}) \u2014 prefer reusing or extending helpers.`,
      severity: "warn"
    });
  }
  return {
    section: {
      id: "change-metrics",
      title: "Change Shape",
      band,
      score,
      summary: summary.slice(0, 60),
      metrics: [
        { label: "duplication", value: dupText },
        { label: "reuse /100", value: reuseText },
        { label: "changes", value: String(rows.length) }
      ],
      helper: HELPER17,
      details: {
        window: WINDOW,
        samples: rows.length,
        dup_series: dupSeries,
        reuse_series: reuseSeries,
        latest_dup_new_pct: latestDup,
        latest_reuse_rate: latestReuse
      }
    },
    attention
  };
}

// src/dashboard/collectors/rules.ts
init_esm_shims();
var HELPER18 = {
  what: "docs/instructions/rules/** holds the canonical rules loaded by every agent invocation: constitution, security, performance, testing, etc.",
  goodLooksLike: "All rule files in place for the project's stack, regenerated when capabilities change, refreshed in the last 30 days."
};
var EXPECTED_MIN = 5;
function collectRules(projectRoot, now = Date.now()) {
  return collectDocsArea(
    projectRoot,
    {
      id: "rules",
      title: "Rules",
      relPath: PATHS.RULES_DIR,
      expectedMin: EXPECTED_MIN,
      helper: HELPER18,
      missingCommand: "`paqad-ai refresh`"
    },
    now
  );
}

// src/dashboard/collectors/session.ts
init_esm_shims();
import { existsSync as existsSync27 } from "fs";
import { join as join34 } from "path";
var HELPER19 = {
  what: ".paqad/session/handoff.{md,json} captures the structured v2 handoff (active task, decisions, blockers) written when an agent finishes a session.",
  goodLooksLike: "A handoff file written in the last 7 days, ready for the next session to pick up from."
};
function collectSession(projectRoot, now = Date.now()) {
  const handoffMd = join34(projectRoot, PATHS.HANDOFF);
  const handoffJson = join34(projectRoot, PATHS.HANDOFF_JSON);
  const mdMtime = fileMtime(handoffMd);
  const jsonMtime = fileMtime(handoffJson);
  if (mdMtime === null && jsonMtime === null) {
    const sessionDir = join34(projectRoot, PATHS.AGENCY_SESSION_DIR);
    return {
      id: "session",
      title: "Session continuity",
      band: "unknown",
      score: null,
      summary: existsSync27(sessionDir) ? "No handoff written yet." : "No session artifacts \u2014 not using session continuity.",
      metrics: [],
      helper: HELPER19
    };
  }
  const newest = Math.max(mdMtime ?? 0, jsonMtime ?? 0);
  const freshness = scoreFreshness(newest, { now, freshWindowDays: 7, staleCliffDays: 60 });
  const age = ageInDays(newest, now);
  return {
    id: "session",
    title: "Session continuity",
    band: bandForScore(freshness),
    score: freshness,
    summary: `Handoff ${age !== null ? `${age}d old` : "present"}${mdMtime !== null && jsonMtime !== null ? " \xB7 md + json" : ""}`,
    metrics: [
      { label: "handoff.md", value: mdMtime !== null ? "\u2713" : "\u2014" },
      { label: "handoff.json", value: jsonMtime !== null ? "\u2713" : "\u2014" },
      { label: "age", value: age !== null ? `${age}d` : "\u2014" }
    ],
    helper: HELPER19,
    details: {
      handoffMdMtimeMs: mdMtime,
      handoffJsonMtimeMs: jsonMtime
    }
  };
}

// src/dashboard/collectors/stack-drift.ts
init_esm_shims();
import { existsSync as existsSync28, readFileSync as readFileSync18 } from "fs";
import { join as join35 } from "path";
var HELPER20 = {
  what: "Stack drift compares the locked stack-snapshot.json to the live lockfiles. Material changes (added/removed frameworks, version-band shifts) get listed here.",
  goodLooksLike: "status: no-drift, regenerated after every dependency change with `paqad-ai refresh`."
};
function readDrift2(path2) {
  if (!existsSync28(path2)) return null;
  try {
    return JSON.parse(readFileSync18(path2, "utf8"));
  } catch {
    return null;
  }
}
function collectStackDrift(projectRoot, now = Date.now()) {
  const driftPath = join35(projectRoot, PATHS.STACK_DRIFT);
  const snapshotPath = join35(projectRoot, PATHS.STACK_SNAPSHOT);
  const drift = readDrift2(driftPath);
  const snapshotPresent = existsSync28(snapshotPath);
  if (drift === null) {
    return {
      section: {
        id: "stack-drift",
        title: "Stack drift",
        band: "unknown",
        score: null,
        summary: snapshotPresent ? "No stack-drift.json \u2014 run `paqad-ai refresh`." : "No stack snapshot \u2014 run `paqad-ai onboard` or `refresh`.",
        metrics: [],
        helper: HELPER20
      },
      attention: []
    };
  }
  const generatedMs = Date.parse(drift.generated_at);
  const refMs = Number.isFinite(generatedMs) ? generatedMs : fileMtime(driftPath);
  const age = ageInDays(refMs, now);
  const changes = drift.material_changes ?? [];
  const changeCount = changes.length;
  let score;
  if (drift.status === "no-drift") {
    score = 100;
  } else {
    let s = 100 - changeCount * 15;
    if (age !== null && age > 90) s -= 20;
    score = Math.max(0, s);
  }
  const summary = drift.status === "no-drift" ? `No drift \xB7 checked ${age !== null ? `${age}d ago` : "recently"}` : `${changeCount} change(s) detected \xB7 ${age !== null ? `${age}d ago` : "recently"}`;
  const attention = drift.status === "drift-detected" && changeCount > 0 ? [
    {
      sectionId: "stack-drift",
      message: `Stack drifted (${changeCount} change${changeCount === 1 ? "" : "s"})`,
      severity: changeCount >= 3 ? "critical" : "warn"
    }
  ] : [];
  return {
    section: {
      id: "stack-drift",
      title: "Stack drift",
      band: bandForScore(score),
      score,
      summary,
      metrics: [
        { label: "status", value: drift.status },
        { label: "changes", value: String(changeCount) },
        { label: "age", value: age !== null ? `${age}d` : "\u2014" }
      ],
      helper: HELPER20,
      details: {
        status: drift.status,
        changes: changes.slice(0, 10),
        newly_active_rule_bands: drift.newly_active_rule_bands ?? []
      }
    },
    attention
  };
}

// src/dashboard/collectors/workflows.ts
init_esm_shims();
var HELPER21 = {
  what: "docs/instructions/workflows/** holds the YAML workflow definitions the workflow engine runs (feature-development, pentest, RCA, \u2026).",
  goodLooksLike: "At least one workflow per active capability, regenerated when packs change, recently edited."
};
var EXPECTED_MIN2 = 1;
function collectWorkflows(projectRoot, now = Date.now()) {
  return collectDocsArea(
    projectRoot,
    {
      id: "workflows",
      title: "Workflows",
      relPath: PATHS.WORKFLOWS_DIR,
      expectedMin: EXPECTED_MIN2,
      fileFilter: (n) => n.endsWith(".yaml") || n.endsWith(".yml"),
      helper: HELPER21,
      missingCommand: "`paqad-ai refresh`"
    },
    now
  );
}

// src/dashboard/report.ts
var SEVERITY_RANK2 = {
  critical: 0,
  warn: 1,
  info: 2
};
var MAX_ATTENTION_ITEMS = 5;
function computeOverall(sections) {
  const applicable = sections.filter((s) => s.score !== null);
  if (applicable.length === 0) return { score: null, band: "unknown" };
  const avg2 = Math.round(applicable.reduce((sum2, s) => sum2 + s.score, 0) / applicable.length);
  return { score: avg2, band: bandForScore(avg2) };
}
function buildReport(projectRoot, options = {}) {
  const now = options.now ?? Date.now();
  const root = resolve5(projectRoot);
  const generatedAt = new Date(now).toISOString();
  const paqadDir = join36(root, PATHS.AGENCY_DIR);
  const manifestPath = join36(root, PATHS.ONBOARDING_MANIFEST);
  if (!existsSync29(paqadDir) || !existsSync29(manifestPath)) {
    return {
      schemaVersion: 1,
      generatedAt,
      projectRoot: root,
      projectName: null,
      frameworkVersion: null,
      notOnboarded: true,
      overallScore: null,
      overallBand: "unknown",
      attention: [],
      sections: []
    };
  }
  const { section: projectProfileSection, projectName } = collectProjectProfile(root);
  const { section: frameworkVersionSection, frameworkVersion } = collectFrameworkVersion(root, now);
  const ragSection = collectRagStatus(root, now);
  const { section: decisionsSection, attention: decisionsAttention } = collectDecisions(root, now);
  const { section: moduleHealthSection, attention: moduleHealthAttention } = collectModuleHealth(
    root,
    now
  );
  const { section: stackDriftSection, attention: stackDriftAttention } = collectStackDrift(
    root,
    now
  );
  const { section: moduleMapDriftSection, attention: moduleMapDriftAttention } = collectModuleMapDrift(root);
  const { section: moduleDecisionsSection, attention: moduleDecisionsAttention } = collectModuleDecisions(root, now);
  const { section: moduleEventsSection, attention: moduleEventsAttention } = collectModuleEvents(root);
  const rulesSection = collectRules(root, now);
  const workflowsSection = collectWorkflows(root, now);
  const { section: deliverySection, attention: deliveryAttention } = collectDelivery(root);
  const moduleDocsSection = collectModuleDocs(root, now);
  const areaSections = collectInstructionsAreas(root, now);
  const architectureSection = collectArchitecture(root, now);
  const { section: pentestSection, attention: pentestAttention } = collectPentest(root, now);
  const { section: codebaseHealthSection, attention: codebaseHealthAttention } = collectCodebaseHealth(root, now);
  const { section: siteMapSection, attention: siteMapAttention } = collectSiteMap(root);
  const { section: ruleComplianceSection, attention: ruleComplianceAttention } = collectRuleCompliance(root);
  const { section: changeMetricsSection, attention: changeMetricsAttention } = collectChangeMetrics(root);
  const { section: attestationSection } = collectAttestation(root);
  const sessionSection = collectSession(root, now);
  const sections = [
    projectProfileSection,
    rulesSection,
    workflowsSection,
    deliverySection,
    decisionsSection,
    moduleHealthSection,
    moduleDocsSection,
    moduleMapDriftSection,
    moduleDecisionsSection,
    moduleEventsSection,
    architectureSection,
    ...areaSections,
    stackDriftSection,
    frameworkVersionSection,
    ragSection,
    pentestSection,
    codebaseHealthSection,
    siteMapSection,
    ruleComplianceSection,
    changeMetricsSection,
    attestationSection,
    sessionSection
  ];
  const allAttention = [
    ...decisionsAttention,
    ...moduleHealthAttention,
    ...moduleMapDriftAttention,
    ...moduleDecisionsAttention,
    ...moduleEventsAttention,
    ...stackDriftAttention,
    ...pentestAttention,
    ...codebaseHealthAttention,
    ...siteMapAttention,
    ...ruleComplianceAttention,
    ...changeMetricsAttention,
    ...deliveryAttention
  ].sort((a, b) => SEVERITY_RANK2[a.severity] - SEVERITY_RANK2[b.severity]);
  const { score: overallScore, band: overallBand } = computeOverall(sections);
  return {
    schemaVersion: 1,
    generatedAt,
    projectRoot: root,
    projectName,
    frameworkVersion,
    notOnboarded: false,
    overallScore,
    overallBand,
    attention: allAttention.slice(0, MAX_ATTENTION_ITEMS),
    sections
  };
}

// src/dashboard/saved-views.ts
init_esm_shims();
import { existsSync as existsSync30, mkdirSync as mkdirSync5, readFileSync as readFileSync19, renameSync as renameSync3, writeFileSync as writeFileSync4 } from "fs";
import { dirname as dirname7, join as join37 } from "path";
var SAVED_VIEWS_RELATIVE = ".paqad/dashboard/saved-views.json";
var SAVED_VIEW_AREAS = ["graph", "trust", "export"];
var SavedViewNotFoundError = class extends Error {
  constructor(id) {
    super(`No saved view with id ${id}.`);
    this.name = "SavedViewNotFoundError";
  }
};
function savedViewsPath(projectRoot) {
  return join37(projectRoot, SAVED_VIEWS_RELATIVE);
}
function isSavedView(value) {
  if (typeof value !== "object" || value === null) return false;
  const v = value;
  return typeof v.id === "string" && typeof v.name === "string" && typeof v.area === "string" && SAVED_VIEW_AREAS.includes(v.area) && typeof v.scope === "object" && v.scope !== null && typeof v.createdAt === "string";
}
function listSavedViews(projectRoot) {
  const path2 = savedViewsPath(projectRoot);
  if (!existsSync30(path2)) return [];
  try {
    const parsed = JSON.parse(readFileSync19(path2, "utf8"));
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSavedView);
  } catch {
    return [];
  }
}
function writeSavedViews(projectRoot, views) {
  const path2 = savedViewsPath(projectRoot);
  mkdirSync5(dirname7(path2), { recursive: true });
  const temp = join37(dirname7(path2), `.saved-views-${process.pid}.tmp`);
  writeFileSync4(temp, `${JSON.stringify(views, null, 2)}
`);
  renameSync3(temp, path2);
}
function putSavedView(projectRoot, input) {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(input.id)) {
    throw new Error("Saved view id must be 1-64 chars of letters, digits, dash, or underscore.");
  }
  if (typeof input.name !== "string" || input.name.trim().length === 0) {
    throw new Error("Body must include a non-empty `name` string.");
  }
  if (typeof input.area !== "string" || !SAVED_VIEW_AREAS.includes(input.area)) {
    throw new Error(`Body must include an \`area\` of ${SAVED_VIEW_AREAS.join(" | ")}.`);
  }
  if (typeof input.scope !== "object" || input.scope === null || Array.isArray(input.scope)) {
    throw new Error("Body must include a `scope` object.");
  }
  const views = listSavedViews(projectRoot);
  const existing = views.find((view2) => view2.id === input.id);
  const view = {
    id: input.id,
    name: input.name.trim().slice(0, 80),
    area: input.area,
    scope: input.scope,
    createdAt: existing?.createdAt ?? (/* @__PURE__ */ new Date()).toISOString()
  };
  const next = existing ? views.map((v) => v.id === input.id ? view : v) : [...views, view];
  writeSavedViews(projectRoot, next);
  appendDashboardAudit(projectRoot, "dashboard.saved-views.write", {
    id: view.id,
    area: view.area
  });
  return view;
}
function deleteSavedView(projectRoot, id) {
  const views = listSavedViews(projectRoot);
  if (!views.some((view) => view.id === id)) {
    throw new SavedViewNotFoundError(id);
  }
  writeSavedViews(
    projectRoot,
    views.filter((view) => view.id !== id)
  );
  appendDashboardAudit(projectRoot, "dashboard.saved-views.delete", { id });
  return { id, removed: true };
}

// src/dashboard/snapshot.ts
init_esm_shims();
import { existsSync as existsSync31, readFileSync as readFileSync20 } from "fs";
import { join as join38 } from "path";
function escapeHtml2(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
function page(title, generatedAt, body) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml2(title)}</title>
</head>
<body style="font-family:-apple-system,Segoe UI,Inter,sans-serif;color:#0f172a;background:#fafafa;margin:0;padding:32px">
<main style="max-width:640px;margin:0 auto">
${body}
<p style="font-size:12px;color:#94a3b8;margin:24px 0 0">Snapshot generated ${escapeHtml2(generatedAt)}. Static copy, no live data.</p>
</main>
</body>
</html>
`;
}
function buildReceiptSnapshot(projectRoot, hash) {
  const feed = buildReceiptFeed(projectRoot);
  const receipt = feed.receipts.find((r) => r.receipt_hash === hash) ?? feed.receipts.find((r) => r.receipt_hash.startsWith(hash));
  if (!receipt) return null;
  const generatedAt = (/* @__PURE__ */ new Date()).toISOString();
  const seal = receipt.sealed ? '<span style="color:#16a34a">sealed</span>' : '<span style="color:#dc2626">chain broken</span>';
  const author = escapeHtml2(
    receipt.authorship?.model_id ?? receipt.authorship?.agent ?? "unknown agent"
  );
  const human = receipt.authorship?.accepting_human?.name;
  const checks = receipt.checks.map(
    (c) => `<li style="margin:3px 0"><code>${escapeHtml2(c.code)}</code> <span style="color:#64748b">(${escapeHtml2(c.verdict)}, ${escapeHtml2(c.strength_class)})</span></li>`
  ).join("");
  const subjects = receipt.subjects.map((s) => `<li style="margin:3px 0">${escapeHtml2(s.name)}</li>`).join("");
  const body = `<h1 style="font-size:20px;font-weight:600;margin:0 0 4px">Receipt ${escapeHtml2(receipt.receipt_hash.slice(0, 16))}</h1>
<p style="font-size:13px;color:#64748b;margin:0 0 16px">${seal} \xB7 ${escapeHtml2(receipt.signing_mode)}${receipt.verification_result ? ` \xB7 verification ${escapeHtml2(receipt.verification_result.toLowerCase())}` : ""}</p>
<section style="background:#fff;border-radius:10px;padding:16px 20px;margin-bottom:16px">
<p style="font-size:14px;margin:0 0 8px">Written by ${author}${human ? `, accepted by ${escapeHtml2(human)}` : ""} (${escapeHtml2(receipt.authorship?.provenance ?? "unknown")}).</p>
<h2 style="font-size:15px;font-weight:600;margin:12px 0 4px">Checks</h2>
<ul style="list-style:none;padding:0;margin:0;font-size:13px">${checks || '<li style="color:#64748b">No checks recorded.</li>'}</ul>
<h2 style="font-size:15px;font-weight:600;margin:12px 0 4px">Covers ${receipt.subjects.length} ${receipt.subjects.length === 1 ? "file" : "files"}</h2>
<ul style="list-style:none;padding:0;margin:0;font-size:13px">${subjects || '<li style="color:#64748b">No files recorded.</li>'}</ul>
</section>`;
  return page(`Receipt ${receipt.receipt_hash.slice(0, 16)}`, generatedAt, body);
}
function buildModuleSnapshot(projectRoot, id) {
  const slug = id.replace(/^module:/, "");
  if (!/^[A-Za-z0-9._-]+$/.test(slug)) return null;
  const path2 = join38(projectRoot, PATHS.PLANNING_MODULE_HEALTH_DIR, `${slug}.json`);
  if (!existsSync31(path2)) return null;
  let health;
  try {
    health = JSON.parse(readFileSync20(path2, "utf8"));
  } catch {
    return null;
  }
  const generatedAt = (/* @__PURE__ */ new Date()).toISOString();
  const tierColor = health.tier === "green" ? "#16a34a" : health.tier === "red" ? "#dc2626" : "#d97706";
  const metricRows = Object.entries(health.metrics ?? {}).map(
    ([key, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#64748b">${escapeHtml2(key)}</td><td style="padding:4px 0;text-align:right">${value === null || value === void 0 ? "\u2014" : escapeHtml2(String(value))}</td></tr>`
  ).join("");
  const body = `<h1 style="font-size:20px;font-weight:600;margin:0 0 4px">Module ${escapeHtml2(slug)}</h1>
<p style="font-size:13px;margin:0 0 16px"><span style="display:inline-block;width:8px;height:8px;border-radius:4px;background:${tierColor};margin-right:6px"></span>health tier: ${escapeHtml2(health.tier)}${health.updated_at ? ` \xB7 updated ${escapeHtml2(health.updated_at)}` : ""}</p>
<section style="background:#fff;border-radius:10px;padding:16px 20px;margin-bottom:16px">
<h2 style="font-size:15px;font-weight:600;margin:0 0 8px">Metrics</h2>
<table style="font-size:13px;border-collapse:collapse;width:100%">${metricRows || '<tr><td style="color:#64748b">No metrics recorded.</td></tr>'}</table>
</section>`;
  return page(`Module ${slug}`, generatedAt, body);
}

// src/dashboard/server.ts
var MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".map": "application/json; charset=utf-8"
};
var SIEM_DOWNLOAD = {
  ocsf: { contentType: "application/x-ndjson; charset=utf-8", ext: "ndjson" },
  ecs: { contentType: "application/x-ndjson; charset=utf-8", ext: "ndjson" },
  cef: { contentType: "text/plain; charset=utf-8", ext: "cef" },
  jsonl: { contentType: "application/json; charset=utf-8", ext: "jsonl" }
};
function clientAcceptsGzip2(req) {
  const header = req.headers["accept-encoding"];
  if (!header) return false;
  const value = Array.isArray(header) ? header.join(",") : header;
  return value.toLowerCase().includes("gzip");
}
function writeJson2(res, req, body, status = 200) {
  const json = JSON.stringify(body);
  const headers = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  };
  if (clientAcceptsGzip2(req)) {
    const gz = gzipSync2(json);
    headers["content-encoding"] = "gzip";
    headers["content-length"] = String(gz.byteLength);
    res.writeHead(status, headers);
    res.end(gz);
    return;
  }
  headers["content-length"] = String(Buffer.byteLength(json));
  res.writeHead(status, headers);
  res.end(json);
}
function writeText(res, body, status = 200, contentType = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "content-type": contentType,
    "content-length": String(Buffer.byteLength(body))
  });
  res.end(body);
}
function serveStatic(req, res, staticDir, urlPath) {
  const safePath = normalize(urlPath).replace(/^[/\\]+/, "");
  let filePath = join39(staticDir, safePath);
  const resolved = resolve6(filePath);
  if (!resolved.startsWith(resolve6(staticDir))) {
    writeText(res, "Forbidden", 403);
    return;
  }
  if (!existsSync32(filePath)) {
    filePath = join39(staticDir, "index.html");
    if (!existsSync32(filePath)) {
      writeText(res, "Not Found", 404);
      return;
    }
  }
  let st;
  try {
    st = statSync4(filePath);
  } catch {
    writeText(res, "Not Found", 404);
    return;
  }
  if (st.isDirectory()) {
    filePath = join39(filePath, "index.html");
    if (!existsSync32(filePath)) {
      writeText(res, "Not Found", 404);
      return;
    }
  }
  const ext = extname3(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] ?? "application/octet-stream";
  const headers = {
    "content-type": contentType,
    "cache-control": "no-cache"
  };
  const shouldGzip = clientAcceptsGzip2(req) && /^(application\/javascript|text\/|application\/json|image\/svg)/.test(contentType);
  if (shouldGzip) {
    headers["content-encoding"] = "gzip";
    res.writeHead(200, headers);
    createReadStream(filePath).pipe(createGzip()).pipe(res);
  } else {
    headers["content-length"] = String(st.size);
    res.writeHead(200, headers);
    createReadStream(filePath).pipe(res);
  }
}
var MAX_BODY_BYTES = 64 * 1024;
function readJsonBody2(req) {
  return new Promise((resolveBody, rejectBody) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.byteLength;
      if (size > MAX_BODY_BYTES) {
        rejectBody(new Error(`Request body exceeds ${MAX_BODY_BYTES} bytes.`));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      if (chunks.length === 0) {
        resolveBody({});
        return;
      }
      try {
        resolveBody(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        rejectBody(new Error("Request body is not valid JSON."));
      }
    });
    req.on("error", rejectBody);
  });
}
function isLoopbackHost(hostHeader) {
  if (!hostHeader) return false;
  const name = hostHeader.replace(/:\d+$/, "").toLowerCase();
  return name === "localhost" || name === "127.0.0.1" || name === "[::1]";
}
function isSameOrigin(req) {
  const origin = req.headers.origin;
  if (origin === void 0) return true;
  try {
    return new URL(origin).host === req.headers.host;
  } catch {
    return false;
  }
}
async function tryListen(server, host, startPort) {
  let port = startPort;
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      await new Promise((resolveListen, rejectListen) => {
        const onError = (err) => {
          server.off("listening", onListening);
          rejectListen(err);
        };
        const onListening = () => {
          server.off("error", onError);
          resolveListen();
        };
        server.once("error", onError);
        server.once("listening", onListening);
        server.listen(port, host);
      });
      const addr = server.address();
      return addr?.port ?? port;
    } catch (err) {
      const e = err;
      if (e.code === "EADDRINUSE") {
        port += 1;
        continue;
      }
      throw err;
    }
  }
  throw new Error(`Could not bind to any port starting at ${startPort}`);
}
async function startDashboardServer(options) {
  let cachedReport = buildReport(options.projectRoot);
  const sseClients = /* @__PURE__ */ new Set();
  let watcher = null;
  const graphRoutes = createGraphRoutes(options.projectRoot);
  function refreshReport() {
    cachedReport = buildReport(options.projectRoot);
  }
  function broadcastSse(event, data) {
    const payload = `event: ${event}
data: ${JSON.stringify(data)}

`;
    for (const res of sseClients) {
      try {
        res.write(payload);
      } catch {
      }
    }
  }
  function onArtefactChange() {
    graphRoutes.invalidate();
    broadcastSse("graph-updated", { extracted_at: (/* @__PURE__ */ new Date()).toISOString() });
    try {
      refreshReport();
      broadcastSse("dashboard-updated", { generatedAt: cachedReport.generatedAt });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      broadcastSse("dashboard-error", { message });
    }
  }
  if (options.watch !== false) {
    watcher = startPaqadWatcher({
      projectRoot: options.projectRoot,
      debounceMs: options.watchDebounceMs,
      onChange: onArtefactChange
    });
  }
  const opsRunner = new OpsJobRunner({
    projectRoot: options.projectRoot,
    onEvent: (event) => {
      broadcastSse("ops-progress", event);
      if (event.status !== "running") {
        onArtefactChange();
      }
    }
  });
  const server = createServer((req, res) => {
    handleRequest(req, res).catch((err) => {
      engineLog("error", "Unhandled dashboard server error", {
        error: err instanceof Error ? err.message : String(err)
      });
      writeJson2(res, req, { error: "Internal server error" }, 500);
    });
  });
  function guardMutation(req, res) {
    if (options.readOnly === true) {
      writeJson2(
        res,
        req,
        { error: "This dashboard is running in read-only mode. Mutations are disabled." },
        403
      );
      return 403;
    }
    if (!existsSync32(join39(options.projectRoot, PATHS.ONBOARDING_MANIFEST))) {
      writeJson2(
        res,
        req,
        { error: "Project is not onboarded. Run `paqad-ai onboard` first." },
        409
      );
      return 409;
    }
    if (!isLoopbackHost(req.headers.host) || !isSameOrigin(req)) {
      writeJson2(res, req, { error: "Mutations are accepted from this machine only." }, 403);
      return 403;
    }
    const marker = readSchemaMarkerSync(options.projectRoot);
    if (marker && checkSchemaCompatibility(marker) === "future") {
      writeJson2(res, req, { error: SCHEMA_VERSION_UPDATE_HINT }, 409);
      return 409;
    }
    return null;
  }
  function writeMutationError(req, res, err) {
    if (err instanceof ApprovalNotFoundError || err instanceof SavedViewNotFoundError) {
      writeJson2(res, req, { error: err.message }, 404);
      return;
    }
    if (err instanceof WriteConflictError) {
      writeJson2(
        res,
        req,
        { error: err.message, conflict: { content: err.currentContent, hash: err.currentHash } },
        409
      );
      return;
    }
    if (err instanceof ApprovalConflictError || err instanceof DecisionPacketCorruptError) {
      writeJson2(res, req, { error: err.message }, 409);
      return;
    }
    if (err instanceof SchemaVersionError) {
      writeJson2(res, req, { error: SCHEMA_VERSION_UPDATE_HINT }, 409);
      return;
    }
    if (err instanceof PathNotAllowedError) {
      writeJson2(res, req, { error: err.message }, 403);
      return;
    }
    if (err instanceof OpsConflictError) {
      writeJson2(res, req, { error: err.message }, 409);
      return;
    }
    if (err instanceof DeliveryPolicyValidationError || err instanceof Error && Array.isArray(err.issues)) {
      writeJson2(
        res,
        req,
        { error: err.message, issues: err.issues },
        422
      );
      return;
    }
    const message = err instanceof Error ? err.message.split("\n")[0] ?? "The request could not be processed." : "The request could not be processed.";
    writeJson2(res, req, { error: message }, 400);
  }
  async function handleMutation(req, res, mutate) {
    if (guardMutation(req, res) !== null) return;
    try {
      const result = await mutate();
      onArtefactChange();
      writeJson2(res, req, { ok: true, result });
    } catch (err) {
      writeMutationError(req, res, err);
    }
  }
  async function handleRequest(req, res) {
    const url2 = new URL(req.url ?? "/", `http://${options.host}:${options.port}`);
    const pathname = url2.pathname;
    if (pathname === "/api/health") {
      writeJson2(res, req, { ok: true });
      return;
    }
    if (pathname === "/api/decisions" && req.method === "GET") {
      writeJson2(res, req, buildApprovalsFeed(options.projectRoot));
      return;
    }
    if (pathname === "/api/site-map/map" && req.method === "GET") {
      writeJson2(
        res,
        req,
        buildSiteMapView(options.projectRoot, process.env, {
          readOnly: options.readOnly === true
        })
      );
      return;
    }
    if (pathname === "/api/site-map/progress" && req.method === "GET") {
      writeJson2(res, req, await readProgress(options.projectRoot));
      return;
    }
    if (pathname === "/api/site-map/layout" && req.method === "POST") {
      await handleMutation(req, res, async () => {
        const body = await readJsonBody2(req);
        return { layout: writeSiteMapLayout(options.projectRoot, body.districts ?? {}) };
      });
      return;
    }
    if (pathname === "/api/site-map/layout/reset" && req.method === "POST") {
      await handleMutation(req, res, async () => {
        deleteSiteMapLayout(options.projectRoot);
        return { reset: true };
      });
      return;
    }
    if (pathname === "/api/site-map/journeys" && req.method === "GET") {
      const journeys = readAllJourneys(options.projectRoot).map((journey) => ({
        id: journey.id,
        label: journey.label,
        status: journey.status
      }));
      writeJson2(res, req, { journeys });
      return;
    }
    if (pathname === "/api/site-map/journeys/curate" && req.method === "POST") {
      await handleMutation(req, res, async () => {
        const body = await readJsonBody2(req);
        if (typeof body.id !== "string" || body.id.length === 0) {
          throw new Error("Body must include a non-empty `id` string.");
        }
        if (body.action !== "confirm" && body.action !== "reject") {
          throw new Error("Body `action` must be 'confirm' or 'reject'.");
        }
        const result = runJourneyCuration({
          projectRoot: options.projectRoot,
          id: body.id,
          action: body.action
        });
        if (!result.ok) {
          throw new Error(result.reason);
        }
        return result;
      });
      return;
    }
    const resolveMatch = /^\/api\/decisions\/(D-(?:\d+|[0-9A-HJKMNP-TV-Z]{26}))\/resolve$/.exec(
      pathname
    );
    if (resolveMatch && req.method === "POST") {
      const decisionId = resolveMatch[1];
      await handleMutation(req, res, async () => {
        const body = await readJsonBody2(req);
        if (typeof body.chosen_option_key !== "string" || body.chosen_option_key.length === 0) {
          throw new Error("Body must include a non-empty `chosen_option_key` string.");
        }
        return resolvePauseDecision(options.projectRoot, {
          decisionId,
          chosenOptionKey: body.chosen_option_key,
          ...typeof body.note === "string" && body.note.length > 0 ? { note: body.note } : {}
        });
      });
      return;
    }
    const proposalMatch = /^\/api\/module-decisions\/(MD-\d{4,})\/(accept|reject)$/.exec(pathname);
    if (proposalMatch && req.method === "POST") {
      const [, proposalId, action] = proposalMatch;
      await handleMutation(
        req,
        res,
        () => action === "accept" ? acceptModuleProposal(options.projectRoot, proposalId) : rejectModuleProposal(options.projectRoot, proposalId)
      );
      return;
    }
    if (pathname === "/api/ledger/evidence") {
      const limitRaw = url2.searchParams.get("limit");
      const limit = limitRaw === null ? void 0 : Number.parseInt(limitRaw, 10);
      writeJson2(
        res,
        req,
        buildEvidenceFeed(options.projectRoot, {
          gate: url2.searchParams.get("gate") ?? void 0,
          verdict: url2.searchParams.get("verdict") ?? void 0,
          ...limit !== void 0 && Number.isFinite(limit) ? { limit } : {}
        })
      );
      return;
    }
    if (pathname === "/api/ledger/receipts") {
      writeJson2(res, req, buildReceiptFeed(options.projectRoot));
      return;
    }
    if (pathname === "/api/ledger/ai-bom") {
      writeJson2(res, req, {
        generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        document: readAiBomDocument(options.projectRoot)
      });
      return;
    }
    if (pathname === "/api/ledger/pr-comment") {
      const markdown = buildPrCommentMarkdown(
        options.projectRoot,
        url2.searchParams.get("sha") ?? void 0
      );
      if (markdown === null) {
        writeJson2(
          res,
          req,
          { error: "No verification evidence yet. The comment appears after the first gate run." },
          404
        );
        return;
      }
      writeText(res, markdown, 200, "text/markdown; charset=utf-8");
      return;
    }
    if (pathname === "/api/inventory" && req.method === "GET") {
      writeJson2(res, req, buildInventory(options.projectRoot));
      return;
    }
    if (pathname === "/api/saved-views" && req.method === "GET") {
      writeJson2(res, req, { views: listSavedViews(options.projectRoot) });
      return;
    }
    const savedViewMatch = /^\/api\/saved-views\/([^/]+)$/.exec(pathname);
    if (savedViewMatch && req.method === "PUT") {
      const id = decodeURIComponent(savedViewMatch[1]);
      await handleMutation(req, res, async () => {
        const body = await readJsonBody2(req);
        return putSavedView(options.projectRoot, {
          id,
          name: body.name,
          area: body.area,
          scope: body.scope
        });
      });
      return;
    }
    if (savedViewMatch && req.method === "DELETE") {
      const id = decodeURIComponent(savedViewMatch[1]);
      await handleMutation(req, res, () => deleteSavedView(options.projectRoot, id));
      return;
    }
    const receiptSnapshotMatch = /^\/api\/snapshot\/receipt\/(.+)$/.exec(pathname);
    if (receiptSnapshotMatch && req.method === "GET") {
      const html = buildReceiptSnapshot(
        options.projectRoot,
        decodeURIComponent(receiptSnapshotMatch[1])
      );
      if (html === null) {
        writeJson2(res, req, { error: "No receipt with that hash." }, 404);
        return;
      }
      writeText(res, html, 200, "text/html; charset=utf-8");
      return;
    }
    const moduleSnapshotMatch = /^\/api\/snapshot\/module\/(.+)$/.exec(pathname);
    if (moduleSnapshotMatch && req.method === "GET") {
      const html = buildModuleSnapshot(
        options.projectRoot,
        decodeURIComponent(moduleSnapshotMatch[1])
      );
      if (html === null) {
        writeJson2(res, req, { error: "No module-health card with that id." }, 404);
        return;
      }
      writeText(res, html, 200, "text/html; charset=utf-8");
      return;
    }
    if (pathname === "/api/config/delivery-policy" && req.method === "GET") {
      writeJson2(res, req, getDeliveryPolicyConfig(options.projectRoot));
      return;
    }
    if (pathname === "/api/config/delivery-policy" && req.method === "PUT") {
      await handleMutation(req, res, async () => {
        const body = await readJsonBody2(req);
        if (typeof body.content !== "string") {
          throw new Error("Body must include the policy `content` as a string.");
        }
        return putDeliveryPolicy(options.projectRoot, {
          content: body.content,
          baseHash: typeof body.baseHash === "string" ? body.baseHash : null
        });
      });
      return;
    }
    if (pathname === "/api/files/instructions" && req.method === "GET") {
      writeJson2(res, req, listInstructionsTree(options.projectRoot));
      return;
    }
    const instructionsFileMatch = /^\/api\/files\/instructions\/(.+)$/.exec(pathname);
    if (instructionsFileMatch && req.method === "GET") {
      try {
        writeJson2(
          res,
          req,
          readInstructionsFile(options.projectRoot, decodeURIComponent(instructionsFileMatch[1]))
        );
      } catch (err) {
        writeMutationError(req, res, err);
      }
      return;
    }
    if (instructionsFileMatch && req.method === "PUT") {
      const relative2 = decodeURIComponent(instructionsFileMatch[1]);
      await handleMutation(req, res, async () => {
        const body = await readJsonBody2(req);
        if (typeof body.content !== "string") {
          throw new Error("Body must include the file `content` as a string.");
        }
        return writeManagedFile(options.projectRoot, {
          relativePath: `${PATHS.INSTRUCTIONS_DIR}/${relative2}`,
          content: body.content,
          baseHash: typeof body.baseHash === "string" ? body.baseHash : null,
          action: "dashboard.instructions.write"
        });
      });
      return;
    }
    if (pathname === "/api/config/profile" && req.method === "GET") {
      writeJson2(res, req, getProfileConfig(options.projectRoot));
      return;
    }
    if (pathname === "/api/config/profile" && req.method === "PUT") {
      await handleMutation(req, res, async () => {
        const body = await readJsonBody2(req);
        return putProfile(options.projectRoot, body.profile);
      });
      return;
    }
    const capabilityMatch = /^\/api\/capabilities\/([a-z-]+)$/.exec(pathname);
    if (capabilityMatch && req.method === "POST") {
      await handleMutation(req, res, async () => {
        const body = await readJsonBody2(req);
        if (typeof body.enabled !== "boolean") {
          throw new Error("Body must include `enabled` as a boolean.");
        }
        return setCapability(options.projectRoot, capabilityMatch[1], body.enabled);
      });
      return;
    }
    if (pathname === "/api/config/module-map" && req.method === "GET") {
      writeJson2(res, req, getModuleMapConfig(options.projectRoot));
      return;
    }
    if (pathname === "/api/config/module-map" && req.method === "PUT") {
      await handleMutation(req, res, async () => {
        const body = await readJsonBody2(req);
        if (typeof body.content !== "string") {
          throw new Error("Body must include the module map `content` as a string.");
        }
        return putModuleMap(options.projectRoot, {
          content: body.content,
          baseHash: typeof body.baseHash === "string" ? body.baseHash : null
        });
      });
      return;
    }
    if (pathname === "/api/config/rag" && req.method === "GET") {
      writeJson2(res, req, getRagConfig(options.projectRoot));
      return;
    }
    if (pathname === "/api/config/rag" && req.method === "PUT") {
      await handleMutation(req, res, async () => {
        const body = await readJsonBody2(req);
        return putRagConfig(options.projectRoot, body.intelligence);
      });
      return;
    }
    if (pathname === "/api/config/design-tokens" && req.method === "GET") {
      writeJson2(res, req, getDesignTokensConfig(options.projectRoot));
      return;
    }
    if (pathname === "/api/config/design-tokens" && req.method === "PUT") {
      await handleMutation(req, res, async () => {
        const body = await readJsonBody2(req);
        if (typeof body.content !== "string") {
          throw new Error("Body must include the tokens `content` as a string.");
        }
        return putDesignTokens(options.projectRoot, {
          content: body.content,
          baseHash: typeof body.baseHash === "string" ? body.baseHash : null
        });
      });
      return;
    }
    if (pathname === "/api/packs" && req.method === "GET") {
      writeJson2(res, req, listPacks2(options.projectRoot));
      return;
    }
    if (pathname === "/api/packs/install" && req.method === "POST") {
      await handleMutation(req, res, async () => {
        const body = await readJsonBody2(req);
        if (typeof body.source !== "string" || body.source.length === 0) {
          throw new Error("Body must include the pack `source` as a string.");
        }
        return installPack2(options.projectRoot, {
          source: body.source,
          scope: body.scope === "global" ? "global" : "project"
        });
      });
      return;
    }
    if (pathname === "/api/packs/remove" && req.method === "POST") {
      await handleMutation(req, res, async () => {
        const body = await readJsonBody2(req);
        if (typeof body.name !== "string" || body.name.length === 0) {
          throw new Error("Body must include the pack `name` as a string.");
        }
        return removePack2(options.projectRoot, {
          name: body.name,
          scope: body.scope === "global" ? "global" : "project"
        });
      });
      return;
    }
    const opsActionMatch = /^\/api\/ops\/([a-z-]+)$/.exec(pathname);
    if (opsActionMatch && req.method === "POST") {
      const action = opsActionMatch[1];
      if (!isOpsAction(action)) {
        writeJson2(res, req, { error: `Unknown operation: ${action}` }, 404);
        return;
      }
      await handleMutation(req, res, () => opsRunner.start(action));
      return;
    }
    const opsJobMatch = /^\/api\/ops\/(op-[a-z-]+-\d+)$/.exec(pathname);
    if (opsJobMatch && req.method === "GET") {
      const job = opsRunner.get(opsJobMatch[1]);
      if (job === null) {
        writeJson2(res, req, { error: `Unknown job: ${opsJobMatch[1]}` }, 404);
        return;
      }
      writeJson2(res, req, job);
      return;
    }
    if (pathname === "/api/ops" && req.method === "GET") {
      writeJson2(res, req, { jobs: opsRunner.list() });
      return;
    }
    if (pathname === "/api/audit" && req.method === "GET") {
      const limitRaw = url2.searchParams.get("limit");
      const cursorRaw = url2.searchParams.get("cursor");
      writeJson2(
        res,
        req,
        readAuditFeed(options.projectRoot, {
          ...limitRaw !== null ? { limit: Number.parseInt(limitRaw, 10) } : {},
          ...cursorRaw !== null ? { cursor: Number.parseInt(cursorRaw, 10) } : {}
        })
      );
      return;
    }
    if (pathname === "/api/onboarding-checklist" && req.method === "GET") {
      writeJson2(res, req, buildOnboardingChecklist(options.projectRoot));
      return;
    }
    if (pathname === "/api/export/evidence-packet" && req.method === "GET") {
      const packet = buildEvidencePacket(options.projectRoot, {
        projectName: cachedReport.projectName
      });
      const format = url2.searchParams.get("format");
      if (format === "html") {
        writeText(res, packet.html, 200, "text/html; charset=utf-8");
        return;
      }
      if (format === "markdown") {
        writeText(res, packet.markdown, 200, "text/markdown; charset=utf-8");
        return;
      }
      writeJson2(res, req, packet);
      return;
    }
    if (pathname === "/api/export/siem" && req.method === "GET") {
      const format = (url2.searchParams.get("format") ?? "ocsf").toLowerCase();
      if (!SIEM_FORMATS.includes(format)) {
        writeJson2(
          res,
          req,
          { error: `Invalid format '${format}' (expected ${SIEM_FORMATS.join(" | ")}).` },
          400
        );
        return;
      }
      const since = url2.searchParams.get("since") ?? void 0;
      if (since !== void 0 && Number.isNaN(Date.parse(since))) {
        writeJson2(
          res,
          req,
          { error: `Invalid since '${since}' (expected an ISO-8601 timestamp).` },
          400
        );
        return;
      }
      const result = exportAuditEvents(options.projectRoot, {
        format,
        ...since !== void 0 ? { since } : {},
        redact: url2.searchParams.get("redact") === "true",
        productVersion: VERSION
      });
      const payload = result.count > 0 ? `${result.output}
` : "";
      const meta = SIEM_DOWNLOAD[format];
      const stamp = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10).replace(/-/g, "");
      res.writeHead(200, {
        "content-type": meta.contentType,
        "content-disposition": `attachment; filename="paqad-siem-${format}-${stamp}.${meta.ext}"`,
        "content-length": String(Buffer.byteLength(payload)),
        "cache-control": "no-store",
        "x-paqad-event-count": String(result.count)
      });
      res.end(payload);
      return;
    }
    if (pathname === "/api/dashboard") {
      refreshReport();
      writeJson2(res, req, cachedReport);
      return;
    }
    if (pathname === "/api/dashboard/markdown") {
      refreshReport();
      writeText(res, renderMarkdown(cachedReport), 200, "text/markdown; charset=utf-8");
      return;
    }
    if (pathname === "/api/events") {
      res.writeHead(200, {
        "content-type": "text/event-stream",
        "cache-control": "no-cache, no-transform",
        connection: "keep-alive",
        "x-accel-buffering": "no"
      });
      res.write("retry: 5000\n\n");
      sseClients.add(res);
      const heartbeat = setInterval(() => {
        try {
          res.write(": ping\n\n");
        } catch {
        }
      }, 2e4);
      const cleanup = () => {
        clearInterval(heartbeat);
        sseClients.delete(res);
      };
      req.on("close", cleanup);
      req.on("error", cleanup);
      return;
    }
    if (await graphRoutes.handle(req, res, url2)) {
      return;
    }
    if (pathname.startsWith("/api/")) {
      writeJson2(res, req, { error: `Unknown endpoint: ${pathname}` }, 404);
      return;
    }
    serveStatic(req, res, options.staticDir, pathname === "/" ? "/index.html" : pathname);
  }
  const boundPort = await tryListen(server, options.host, options.port);
  const url = `http://${options.host}:${boundPort}`;
  return {
    url,
    host: options.host,
    port: boundPort,
    close: () => new Promise((resolveClose, rejectClose) => {
      watcher?.close();
      watcher = null;
      for (const res of sseClients) {
        try {
          res.end();
        } catch {
        }
      }
      sseClients.clear();
      server.close((err) => err ? rejectClose(err) : resolveClose());
    })
  };
}

// src/graph/opener.ts
init_esm_shims();
import { spawn } from "child_process";
import { existsSync as existsSync33 } from "fs";
import { platform } from "os";
import { isAbsolute as isAbsolute3 } from "path";
function shouldSkipBrowser(env = process.env) {
  if (env.SSH_TTY || env.SSH_CONNECTION) {
    return "SSH session detected";
  }
  if (platform() === "linux" && !env.DISPLAY && !env.WAYLAND_DISPLAY) {
    return "no graphical display detected";
  }
  return null;
}
function isOpenableTarget(target) {
  if (target.trim().length === 0 || target.startsWith("-")) return false;
  if (URL.canParse(target)) {
    const { protocol } = new URL(target);
    if (protocol === "http:" || protocol === "https:") return true;
  }
  return isAbsolute3(target) && existsSync33(target);
}
function openBrowser(options) {
  if (options.skip) {
    return { opened: false, reason: "browser open suppressed" };
  }
  const skipReason = shouldSkipBrowser();
  if (skipReason) {
    return { opened: false, reason: skipReason };
  }
  const url = options.url;
  if (!isOpenableTarget(url)) {
    return { opened: false, reason: "not an http(s) URL or an existing file path" };
  }
  const os = platform();
  const command = os === "darwin" ? "open" : os === "win32" ? "explorer.exe" : "xdg-open";
  try {
    const child = spawn(command, [url], { detached: true, stdio: "ignore", shell: false });
    child.on("error", () => {
    });
    child.unref();
    return { opened: true };
  } catch (err) {
    return { opened: false, reason: err instanceof Error ? err.message : String(err) };
  }
}

// src/cli/commands/dashboard.ts
var DEFAULT_PORT = 5372;
function resolveStaticDir(override) {
  if (override) {
    return isAbsolute4(override) ? override : resolve7(process.cwd(), override);
  }
  return join40(getRuntimeRoot(), "graph-ui");
}
function createDashboardCommand() {
  return new Command("dashboard").description("Open the paqad-ai project dashboard in a local web view").option("--port <n>", "Server port (auto-increments if occupied)", String(DEFAULT_PORT)).option("--host <host>", "Bind address", "127.0.0.1").option("--no-open", "Do not open the browser automatically").option("--no-watch", "Disable live reload on .paqad/ changes").option("--quiet", "Suppress non-essential stdout", false).option("--read-only", "Disable every mutation endpoint (for shared or CI usage)", false).option("--project-root <path>", "Project root", process.cwd()).option("--static-dir <path>", "Override the bundled frontend directory").option(
    "--print-url",
    "Print exactly one line with the dashboard URL once the server is listening"
  ).option("--open-url <url>", "Open this URL in the browser instead of the dashboard URL").action(async (options) => {
    const projectRoot = resolve7(options.projectRoot);
    const paqadDir = join40(projectRoot, PATHS.AGENCY_DIR);
    if (!existsSync34(paqadDir)) {
      process.stderr.write(
        `error: no .paqad/ directory found at ${projectRoot}. Run \`paqad-ai onboard\` first.
`
      );
      process.exitCode = 2;
      return;
    }
    const manifestPath = join40(projectRoot, PATHS.ONBOARDING_MANIFEST);
    if (!existsSync34(manifestPath)) {
      process.stderr.write(
        `error: onboarding manifest missing at ${manifestPath}. Run \`paqad-ai onboard\` first.
`
      );
      process.exitCode = 2;
      return;
    }
    if (isFrameworkDisabledForRoot(projectRoot)) {
      process.stdout.write(
        "paqad is disabled (vanilla mode); the dashboard will not start. Run `paqad-ai enable` (or unset PAQAD_DISABLED) to use it.\n"
      );
      return;
    }
    const port = Number.parseInt(options.port, 10);
    if (!Number.isFinite(port) || port <= 0 || port > 65535) {
      process.stderr.write(`error: invalid --port value '${options.port}'
`);
      process.exitCode = 2;
      return;
    }
    const staticDir = resolveStaticDir(options.staticDir);
    const server = await startDashboardServer({
      projectRoot,
      host: options.host,
      port,
      staticDir,
      watch: options.watch,
      readOnly: options.readOnly
    });
    const dashboardUrl = `${server.url}/#/dashboard`;
    if (options.printUrl) {
      process.stdout.write(`paqad dashboard: ${server.url}/
`);
    } else if (!options.quiet) {
      process.stdout.write(`paqad-ai dashboard listening at ${dashboardUrl}
`);
    } else {
      process.stdout.write(`${dashboardUrl}
`);
    }
    const opened = openBrowser({ url: options.openUrl ?? dashboardUrl, skip: !options.open });
    if (!opened.opened && !options.quiet && opened.reason) {
      process.stdout.write(`(browser not opened: ${opened.reason})
`);
    }
    const shutdown = async (signal) => {
      if (!options.quiet) {
        process.stdout.write(`
Received ${signal}, shutting down\u2026
`);
      }
      try {
        await server.close();
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        process.stderr.write(`error during shutdown: ${message}
`);
        process.exitCode = 1;
        return;
      }
      process.exit(0);
    };
    process.on("SIGINT", () => void shutdown("SIGINT"));
    process.on("SIGTERM", () => void shutdown("SIGTERM"));
  });
}

// src/cli/commands/delivery.ts
init_esm_shims();
import { existsSync as existsSync35, readFileSync as readFileSync21, readdirSync as readdirSync9 } from "fs";
import { join as join41, resolve as resolve8 } from "path";

// src/delivery/ci-gate.ts
init_esm_shims();
function countChecks(status) {
  return {
    done: status.checks.filter((check) => check.state === "green" || check.state === "red").length,
    total: status.checks.length
  };
}
var CI_REFRESH_INTERVAL_MS = 6e4;
function waitFor(ms) {
  return new Promise((resolve18) => setTimeout(resolve18, ms));
}
function pollBudget(timeoutMinutes, pollIntervalMs) {
  return Math.ceil(timeoutMinutes * 6e4 / Math.max(1, pollIntervalMs)) + 1;
}
async function postEvidence(host, branch, body) {
  if (!body) return false;
  try {
    const result = await host.comment(branch, body);
    return result.ok;
  } catch {
    return false;
  }
}
async function runCiGate(host, branch, ci, options = {}) {
  const transitionOnGreen = ci.transition_on_green ? ci.transition_on_green : null;
  if (ci.gate === "off") {
    return { action: "skipped", state: "unknown", transitionTo: null, message: "CI gate is off." };
  }
  if (ci.gate === "warn_only") {
    const status = await host.getChecksStatus(branch);
    return {
      action: "warned",
      state: status.state,
      transitionTo: status.state === "green" ? transitionOnGreen : null,
      message: `CI is ${status.state} (warn-only \u2014 not blocking).`,
      checks: countChecks(status)
    };
  }
  const now = options.now ?? Date.now;
  const sleep2 = options.sleep ?? waitFor;
  const pollIntervalMs = options.pollIntervalMs ?? CI_REFRESH_INTERVAL_MS;
  const maxPolls = Math.max(1, options.maxPolls ?? pollBudget(ci.timeout_minutes, pollIntervalMs));
  const deadline = now() + ci.timeout_minutes * 6e4;
  let last = { state: "unknown", checks: [] };
  for (let poll = 0; poll < maxPolls; poll += 1) {
    const status = await host.getChecksStatus(branch);
    last = status;
    options.onPoll?.(status);
    if (status.state === "green") {
      const evidenceCommentPosted = await postEvidence(host, branch, options.evidenceComment);
      return {
        action: "passed",
        state: "green",
        transitionTo: transitionOnGreen,
        message: "CI is green.",
        evidenceCommentPosted,
        checks: countChecks(status)
      };
    }
    if (status.state === "red") {
      const commentAndStop = ci.on_red === "comment_and_stop";
      const action = commentAndStop ? "failed_comment_and_stop" : "failed_stop";
      const evidenceCommentPosted = commentAndStop ? await postEvidence(host, branch, options.evidenceComment) : false;
      return {
        action,
        state: "red",
        transitionTo: null,
        message: `CI failed (${status.checks.filter((c) => c.state === "red").map((c) => c.name).join(", ") || "unknown check"}). Stopping per on_red=${ci.on_red}.`,
        evidenceCommentPosted,
        checks: countChecks(status)
      };
    }
    if (now() >= deadline) {
      return {
        action: "timed_out",
        state: status.state,
        transitionTo: null,
        message: `CI did not go green within ${ci.timeout_minutes} minute(s). Stopping.`,
        checks: countChecks(status)
      };
    }
    if (poll + 1 < maxPolls) await sleep2(pollIntervalMs);
  }
  return {
    action: "timed_out",
    state: last.state,
    transitionTo: null,
    message: `CI gate read the checks ${maxPolls} time(s) without a verdict. Stopping.`,
    checks: countChecks(last)
  };
}

// src/delivery/runner.ts
init_esm_shims();
async function runDelivery(shell, inputs, openPr) {
  const steps = [];
  const branchResult = await shell.run("git", ["checkout", "-b", inputs.rendered.branch]);
  steps.push({
    step: "branch",
    ok: branchResult.exitCode === 0,
    output: branchResult.stderr || branchResult.stdout,
    remediation: branchResult.exitCode === 0 ? void 0 : `Failed to create branch ${inputs.rendered.branch}. Resolve the conflicting state and re-run delivery.`
  });
  if (branchResult.exitCode !== 0) {
    return { steps, ok: false };
  }
  const commitResult = await shell.run("git", ["commit", "-m", inputs.rendered.commit]);
  steps.push({
    step: "commit",
    ok: commitResult.exitCode === 0,
    output: commitResult.stderr || commitResult.stdout,
    remediation: commitResult.exitCode === 0 ? void 0 : "git commit failed. Stage changes (git add) and re-run delivery; do not skip pre-commit hooks."
  });
  if (commitResult.exitCode !== 0) {
    return { steps, ok: false };
  }
  if (inputs.open_pr === "no") {
    return { steps, ok: true };
  }
  const pushResult = await shell.run("git", [
    "push",
    "--set-upstream",
    "origin",
    inputs.rendered.branch
  ]);
  steps.push({
    step: "push",
    ok: pushResult.exitCode === 0,
    output: pushResult.stderr || pushResult.stdout,
    remediation: pushResult.exitCode === 0 ? void 0 : `git push failed. Check remote auth and branch protection before retrying.`
  });
  if (pushResult.exitCode !== 0) {
    return { steps, ok: false };
  }
  if (openPr) {
    const opened = await openPr({
      title: inputs.rendered.pr_title,
      body: inputs.rendered.pr_body,
      base: inputs.base,
      head: inputs.rendered.branch,
      draft: inputs.open_pr === "draft",
      reviewers: inputs.reviewers,
      labels: inputs.labels
    });
    steps.push({
      step: "pr",
      ok: opened.ok,
      output: opened.output,
      remediation: opened.ok ? void 0 : opened.remediation,
      pr: opened.pr
    });
    return { steps, ok: opened.ok };
  }
  const prArgs = [
    "pr",
    "create",
    "--base",
    inputs.base,
    "--head",
    inputs.rendered.branch,
    "--title",
    inputs.rendered.pr_title,
    "--body",
    inputs.rendered.pr_body
  ];
  if (inputs.open_pr === "draft") {
    prArgs.push("--draft");
  }
  for (const reviewer of inputs.reviewers) {
    prArgs.push("--reviewer", reviewer);
  }
  for (const label of inputs.labels) {
    prArgs.push("--label", label);
  }
  const prResult = await shell.run("gh", prArgs);
  steps.push({
    step: "pr",
    ok: prResult.exitCode === 0,
    output: prResult.stderr || prResult.stdout,
    remediation: prResult.exitCode === 0 ? void 0 : "gh pr create failed. Ensure `gh auth status` is OK and the branch was pushed cleanly, then re-run delivery."
  });
  return { steps, ok: prResult.exitCode === 0 };
}

// src/delivery/templates.ts
init_esm_shims();
function slugify2(value, maxLength) {
  const slug = value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (slug.length <= maxLength) {
    return slug;
  }
  return slug.slice(0, maxLength).replace(/-+$/, "");
}
function resolveConventionalType(ticketType, typeMap) {
  if (ticketType && typeMap[ticketType]) {
    return typeMap[ticketType];
  }
  return typeMap.default ?? "feat";
}
function renderTemplate(template, vars) {
  return template.replace(
    /\{([a-z_]+)\}/g,
    (match, key) => Object.prototype.hasOwnProperty.call(vars, key) ? vars[key] : match
  );
}
function withTechDebt(template, body, section2) {
  if (section2 === "" || template.includes("{tech_debt}")) {
    return body;
  }
  const trimmed = stripTrailingChars(body, " 	\r\n");
  return trimmed === "" ? `${section2}
` : `${trimmed}

${section2}
`;
}
function renderDelivery(process2, inputs, prBodyTemplate) {
  const type = resolveConventionalType(inputs.ticket_type, process2.branch.type_map);
  const title_slug = slugify2(inputs.title, process2.branch.slug_max_length);
  const ticket = inputs.ticket || "";
  const scope = inputs.scope ?? type;
  const vars = {
    type,
    ticket,
    title: inputs.title,
    title_slug,
    summary: inputs.summary,
    scope,
    tech_debt: inputs.tech_debt ?? ""
  };
  return {
    branch: renderTemplate(process2.branch.template, vars),
    commit: renderTemplate(process2.commit.template, vars),
    pr_title: renderTemplate(process2.pr.title_template, vars),
    pr_body: withTechDebt(prBodyTemplate, renderTemplate(prBodyTemplate, vars), vars.tech_debt)
  };
}

// src/providers/github-host-provider.ts
init_esm_shims();
var GithubHostProvider = class {
  constructor(shell) {
    this.shell = shell;
  }
  shell;
  kind = "github";
  async ensureBranch(name, base) {
    const result = await this.shell.run("git", ["checkout", "-b", name, base]);
    return {
      ok: result.exitCode === 0,
      output: result.stderr || result.stdout,
      remediation: result.exitCode === 0 ? void 0 : `Failed to create branch ${name} from ${base}. Resolve the conflicting state and re-run delivery.`
    };
  }
  async commit(message) {
    const result = await this.shell.run("git", ["commit", "-m", message]);
    return {
      ok: result.exitCode === 0,
      output: result.stderr || result.stdout,
      remediation: result.exitCode === 0 ? void 0 : "git commit failed. Stage changes (git add) and re-run delivery; do not skip pre-commit hooks."
    };
  }
  async push(branch) {
    const result = await this.shell.run("git", ["push", "--set-upstream", "origin", branch]);
    return {
      ok: result.exitCode === 0,
      output: result.stderr || result.stdout,
      remediation: result.exitCode === 0 ? void 0 : "git push failed. Check remote auth and branch protection before retrying."
    };
  }
  async openPR(input) {
    const args = [
      "pr",
      "create",
      "--base",
      input.base,
      "--head",
      input.head,
      "--title",
      input.title,
      "--body",
      input.body
    ];
    if (input.draft) {
      args.push("--draft");
    }
    for (const reviewer of input.reviewers) {
      args.push("--reviewer", reviewer);
    }
    for (const label of input.labels) {
      args.push("--label", label);
    }
    const result = await this.shell.run("gh", args);
    if (result.exitCode !== 0) {
      return {
        ok: false,
        output: result.stderr || result.stdout,
        remediation: "gh pr create failed. Ensure `gh auth status` is OK and the branch was pushed cleanly, then re-run delivery."
      };
    }
    return {
      ok: true,
      output: result.stdout,
      pr: parsePrUrl(result.stdout)
    };
  }
  async comment(prOrBranch, body) {
    const result = await this.shell.run("gh", ["pr", "comment", prOrBranch, "--body", body]);
    return {
      ok: result.exitCode === 0,
      output: result.stderr || result.stdout,
      remediation: result.exitCode === 0 ? void 0 : "gh pr comment failed. Ensure `gh auth status` is OK and the PR exists for this branch, then re-run delivery."
    };
  }
  async getChecksStatus(prOrBranch) {
    const result = await this.shell.run("gh", ["pr", "checks", prOrBranch, "--json", "name,state"]);
    const checks = parseChecks(result.stdout);
    if (checks === null) {
      return { state: "unknown", checks: [] };
    }
    return { state: aggregate(checks.map((c) => c.state)), checks };
  }
};
function parsePrUrl(stdout) {
  const url = stdout.trim().split(/\s+/).find((token) => /^https?:\/\//.test(token)) ?? stdout.trim();
  const match = /\/pull\/(\d+)/.exec(url);
  return { number: match ? Number(match[1]) : null, url };
}
function normalizeCheckState(raw) {
  const s = raw.toUpperCase();
  if (["SUCCESS", "NEUTRAL", "SKIPPED"].includes(s)) {
    return "green";
  }
  if (["FAILURE", "FAIL", "ERROR", "CANCELLED", "TIMED_OUT", "ACTION_REQUIRED"].includes(s)) {
    return "red";
  }
  if (["PENDING", "QUEUED", "IN_PROGRESS", "EXPECTED", "REQUESTED", "WAITING"].includes(s)) {
    return "pending";
  }
  return "unknown";
}
function parseChecks(stdout) {
  const trimmed = stdout.trim();
  if (!trimmed) {
    return null;
  }
  try {
    const rows = JSON.parse(trimmed);
    if (!Array.isArray(rows)) {
      return null;
    }
    return rows.map((r) => ({
      name: r.name ?? "unknown",
      state: normalizeCheckState(r.state ?? "")
    }));
  } catch {
    return null;
  }
}
function aggregate(states) {
  if (states.length === 0) {
    return "unknown";
  }
  if (states.includes("red")) {
    return "red";
  }
  if (states.includes("pending")) {
    return "pending";
  }
  if (states.every((s) => s === "green")) {
    return "green";
  }
  return "unknown";
}

// src/tech-debt/context.ts
init_esm_shims();
function resolveDebtContext(projectRoot, sessionHint2) {
  const session2 = resolveSessionId(projectRoot, sessionHint2);
  const dirName = currentFeature(projectRoot, session2);
  if (dirName === null) {
    return { session: session2, dirName, foundIn: { change: null, issue: null, stage: null } };
  }
  const running = foldFeature(projectRoot, session2, dirName).stages.filter(
    (stage) => stage.state === "running"
  );
  return {
    session: session2,
    dirName,
    foundIn: {
      change: featureChangeKey(dirName),
      issue: readFeatureRecord(projectRoot, dirName)?.issue ?? null,
      stage: running.at(-1)?.stage ?? null
    }
  };
}
function raisedTechDebt(projectRoot, sessionHint2) {
  const dirName = currentFeature(projectRoot, resolveSessionId(projectRoot, sessionHint2));
  return dirName === null ? [] : readFeatureTechDebtIndex(projectRoot, dirName) ?? [];
}

// src/tech-debt/pr-section.ts
init_esm_shims();
var TECH_DEBT_PR_HEADING = "## Tech debt found in this change";
function renderTechDebtPrSection(items) {
  if (items.length === 0) {
    return "";
  }
  const lines = items.map(
    (item) => `- ${item.id} (${item.kind}, ${item.severity}): ${item.title.replace(/\s+/g, " ").trim()}. ${PATHS.TECH_DEBT_DIR}/${item.id}.md`
  );
  return [TECH_DEBT_PR_HEADING, "", ...lines].join("\n");
}

// src/cli/commands/delivery.ts
async function runDeliver(deps) {
  const { policy } = loadDeliveryPolicy(deps.projectRoot);
  const process2 = policy.process;
  const templatePath = join41(deps.projectRoot, process2.pr.body_template_path);
  const prBody = existsSync35(templatePath) ? readFileSync21(templatePath, "utf8") : "";
  const rendered = renderDelivery(process2, deps.inputs, prBody);
  if (deps.dryRun) {
    return {
      exitCode: 0,
      output: [
        `**\u25B8 paqad** \xB7 delivery dry run \u2014 nothing pushed`,
        `> branch:  ${rendered.branch}`,
        `> commit:  ${rendered.commit}`,
        `> PR title: ${rendered.pr_title}`,
        ``,
        rendered.pr_body
      ].join("\n")
    };
  }
  const decision = deps.resolveOpenPr();
  if (decision.status === "paused") {
    return { exitCode: 2, output: decision.message };
  }
  const run = await runDelivery(
    deps.shell,
    {
      rendered,
      base: deps.base,
      draft: deps.draft,
      reviewers: deps.reviewers,
      labels: deps.labels,
      open_pr: decision.choice
    },
    (input) => deps.host.openPR(input)
  );
  followDeliveredBranch(deps, run, rendered.branch);
  saveShip(deps, shipFromRun(run, rendered.branch, decision.choice === "draft", headSha(deps)));
  const stepLines = run.steps.map(
    (s) => `> - ${s.ok ? "\u{1F7E2}" : "\u{1F534}"} ${s.step}${s.ok ? "" : ` \u2014 ${s.remediation ?? "failed"}`}`
  );
  if (!run.ok) {
    return {
      exitCode: 1,
      output: [`**\u25B8 paqad** \xB7 delivery stopped`, ...stepLines].join("\n")
    };
  }
  if (decision.choice === "no") {
    return {
      exitCode: 0,
      output: [`**\u25B8 paqad** \xB7 committed (no PR requested)`, ...stepLines].join("\n")
    };
  }
  const sha = headSha(deps);
  const gate = await runCiGate(deps.host, rendered.branch, process2.ci, {
    ...deps.ci,
    evidenceComment: deps.evidenceBody,
    onPoll: (status) => saveShip(deps, shipFromStatus(status, sha))
  });
  saveShip(deps, shipFromGate(gate, sha));
  const green = gate.action === "passed" || gate.action === "warned" || gate.action === "skipped";
  const glyph = green ? "\u{1F7E2}" : "\u{1F534}";
  const verdict = green ? "Safe to merge" : "Needs your attention";
  const evidenceLine = gate.evidenceCommentPosted === true ? "\n> - \u{1F7E2} posted the verification evidence to the PR" : "";
  return {
    exitCode: green ? 0 : 1,
    output: [`**\u25B8 paqad** \xB7 delivery \u2014 ${verdict}`, ...stepLines, `> - ${glyph} ${gate.message}`].join(
      "\n"
    ) + evidenceLine
  };
}
var CI_STATE = {
  green: "pass",
  red: "fail",
  pending: "pending",
  unknown: "unknown"
};
function followDeliveredBranch(deps, run, branch) {
  if (!deps.dirName) return;
  if (!run.steps.some((step) => step.step === "branch" && step.ok)) return;
  recordChangeConstants(deps.projectRoot, deps.dirName, { branch }, deps.now);
}
function headSha(deps) {
  return deps.dirName ? readGitState(deps.projectRoot).head_commit ?? null : null;
}
function shipFromRun(run, branch, draft, sha) {
  const patch = {};
  const push = run.steps.find((step) => step.step === "push");
  if (push) patch.push = { state: push.ok ? "pushed" : "failed", branch, sha };
  const pr = run.steps.find((step) => step.step === "pr")?.pr;
  if (pr) patch.pr = { number: pr.number, url: pr.url, draft, state: "open", head_sha: sha };
  return patch;
}
function shipFromStatus(status, sha) {
  const checks = countChecks(status);
  return {
    ci: {
      sha,
      state: CI_STATE[status.state],
      done: checks.done,
      total: checks.total,
      reason: null,
      source: "ci-gate",
      jobs: status.checks.map((check) => ({
        status: check.state === "green" || check.state === "red" ? "COMPLETED" : "IN_PROGRESS",
        conclusion: check.state === "green" ? "SUCCESS" : check.state === "red" ? "FAILURE" : null,
        started_at: null,
        completed_at: null
      }))
    }
  };
}
function shipFromGate(gate, sha) {
  if (gate.action === "skipped") return {};
  const state = CI_STATE[gate.state];
  return {
    ci: {
      sha,
      state,
      done: gate.checks?.done ?? null,
      total: gate.checks?.total ?? null,
      reason: state === "unknown" ? gate.message : null,
      source: "ci-gate"
    }
  };
}
function saveShip(deps, patch) {
  if (!deps.dirName || Object.keys(patch).length === 0) return;
  try {
    recordShip(
      deps.projectRoot,
      deps.dirName,
      patch,
      (deps.now ?? (() => /* @__PURE__ */ new Date()))().toISOString()
    );
  } catch (error) {
    appendHooksLog(
      deps.projectRoot,
      `deliver: delivery.json not updated: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
function shipsWith(projectRoot, dirName) {
  const none = { context: "", evidence: void 0 };
  if (!dirName) return none;
  try {
    const split = refreshCommitSplit(
      projectRoot,
      dirName,
      readFeatureDelivery(projectRoot, dirName)
    ).commit_split;
    if (split?.state !== "known" || !split.own || !split.inherited) return none;
    const own = `${split.own.count} own commit${split.own.count === 1 ? "" : "s"}`;
    const riding = describeEarlierWork(split.inherited);
    const note = split.inherited.count > 0 ? " The commits from earlier work ship in this PR too unless you split the branch yourself; paqad never moves, cherry-picks or rebases commits." : "";
    return {
      context: ` This PR carries ${own} and ${riding}.${note}`,
      evidence: { findings: [own, riding] }
    };
  } catch {
    return none;
  }
}
function resolveOpenPrDecision(projectRoot, defaultChoice, dirName) {
  const resolvedDir = join41(projectRoot, PATHS.DECISIONS_RESOLVED_DIR);
  const pendingDir = join41(projectRoot, PATHS.DECISIONS_PENDING_DIR);
  const resolved = findDeliveryPacket(resolvedDir);
  if (resolved && typeof resolved.chosen === "string") {
    const choice = normalizeChoice(resolved.chosen);
    if (choice) return { status: "resolved", choice };
  }
  if (findDeliveryPacket(pendingDir)) {
    return { status: "paused", message: pauseMessage() };
  }
  try {
    const ships = shipsWith(projectRoot, dirName);
    const withEvidence2 = ships.evidence ? { evidence: ships.evidence } : {};
    createPendingDecision(projectRoot, {
      category: "delivery.open_pr",
      title: "Open a pull request for this change?",
      context: "Delivery is ready. Opening a PR pushes the branch to the remote \u2014 an outward-facing, hard-to-reverse action \u2014 so paqad is asking before it does." + ships.context,
      options: [
        { option_key: "yes", label: "Open a PR now", ...withEvidence2 },
        { option_key: "draft", label: "Open a draft PR", ...withEvidence2 },
        { option_key: "no", label: "Commit only, no PR" }
      ],
      recommendation: normalizeChoice(defaultChoice) ? defaultChoice : "yes",
      change: dirName ? featureChangeKey(dirName) : null
    });
  } catch {
  }
  return { status: "paused", message: pauseMessage() };
}
function pauseMessage() {
  return `**\u25B8 paqad** \xB7 I hit a real choice that's yours to make, so I stopped to ask
> Opening a PR pushes your branch to the remote. I wrote a \`delivery.open_pr\` decision packet \u2014 answer it (yes / draft / no), then re-run \`paqad-ai deliver\`.`;
}
function normalizeChoice(raw) {
  const value = raw.trim().toLowerCase();
  return value === "yes" || value === "draft" || value === "no" ? value : null;
}
function findDeliveryPacket(dir) {
  let entries;
  try {
    entries = readdirSync9(dir).filter((name) => name.endsWith(".json")).sort();
  } catch {
    return null;
  }
  for (let i = entries.length - 1; i >= 0; i -= 1) {
    try {
      const packet = JSON.parse(readFileSync21(join41(dir, entries[i]), "utf8"));
      if (packet.category === "delivery.open_pr") return packet;
    } catch {
    }
  }
  return null;
}
function loadEvidenceBody(projectRoot) {
  try {
    const evidence = readVerificationEvidence(projectRoot);
    return evidence ? renderEvidenceMarkdown(evidence, {}) : null;
  } catch {
    return null;
  }
}
function createDeliveryCommand() {
  return new Command("deliver").description("Run the delivery chain: PR (after asking) \u2192 wait for CI \u2192 evidence on green").option("--project-root <path>", "Project root", process.cwd()).option("--dry-run", "Render branch/commit/PR text without pushing", false).option("--base <branch>", "Base branch for the PR", "main").option("--draft", "Open the PR as a draft", false).option("--title <title>", "Change title (branch slug + PR title)", "").option("--summary <summary>", "One-line summary for the commit/PR body", "").option("--ticket <ref>", "Linked ticket ref (e.g. #<number> or PQD-<number>)").option("--ticket-type <type>", "Ticket type (Story/Bug/Task) \u2192 conventional commit type").option("--scope <scope>", "Conventional-commit scope (usually the module)").option("--open-pr <mode>", "Recommended open_pr choice for the pause (yes|draft|no)", "yes").option("--reviewer <handle>", "PR reviewer (repeatable)", collect2, []).option("--label <label>", "PR label (repeatable)", collect2, []).option("--session <id>", "Session id (defaults to SE_SESSION / CLAUDE_SESSION_ID)").action(async (options) => {
    const projectRoot = resolve8(options.projectRoot);
    const shell = createDeliveryShell(projectRoot);
    const host = new GithubHostProvider(shell);
    const dirName = activeChange(projectRoot, options.session);
    const result = await runDeliver({
      projectRoot,
      dryRun: options.dryRun,
      inputs: {
        ticket: options.ticket ?? "",
        ticket_type: options.ticketType,
        title: options.title,
        summary: options.summary,
        scope: options.scope,
        tech_debt: renderTechDebtPrSection(
          raisedTechDebt(
            projectRoot,
            options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
          )
        )
      },
      base: options.base,
      draft: options.draft,
      reviewers: options.reviewer ?? [],
      labels: options.label ?? [],
      shell,
      host,
      resolveOpenPr: () => resolveOpenPrDecision(projectRoot, options.openPr, dirName),
      evidenceBody: loadEvidenceBody(projectRoot),
      dirName
    });
    if (result.exitCode === 0) {
      console.log(result.output);
    } else {
      console.error(result.output);
      process.exitCode = result.exitCode;
    }
  });
}
function activeChange(projectRoot, session2) {
  try {
    return currentFeature(
      projectRoot,
      resolveSessionId(
        projectRoot,
        session2 ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
      )
    );
  } catch {
    return null;
  }
}
function collect2(value, previous = []) {
  return [...previous, value];
}

// src/cli/commands/delivery-link.ts
init_esm_shims();
import { execFileSync as execFileSync2 } from "child_process";
function git(projectRoot, args) {
  try {
    return execFileSync2("git", args, {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch {
    return void 0;
  }
}
function resolveSession(options) {
  return resolveSessionId(
    options.projectRoot,
    options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
  );
}
var COMMIT_DECISIONS = [
  "commit",
  "decline",
  "ignored",
  "user-requested"
];
function isCommitDecision(value) {
  return COMMIT_DECISIONS.includes(value);
}
function targetChange(options) {
  const active = currentFeature(options.projectRoot, resolveSession(options));
  const branch = git(options.projectRoot, ["branch", "--show-current"]);
  return active ?? (branch ? resolveDeliveryFeatureByBranch(options.projectRoot, branch) : null);
}
function regenerateReportSafe(projectRoot, dirName) {
  if (!dirName) return;
  try {
    if (featureReportEnabled(projectRoot)) {
      writeFeatureReport(projectRoot, dirName);
    }
  } catch {
  }
}
function secondsOption(value) {
  const seconds = Number(value);
  if (!Number.isInteger(seconds) || seconds < 0) {
    throw new InvalidArgumentError("expected a whole number of seconds");
  }
  return seconds;
}
function createDeliveryLinkCommand(deps = {}) {
  const command = new Command("delivery-link").description(
    "Link git commits/merges to the active feature bundle (post-commit / post-merge hooks)"
  );
  const withCommon = (c) => c.option("--project-root <path>", "Project root", process.cwd()).option("--session <id>", "Session id (defaults to SE_SESSION / CLAUDE_SESSION_ID)");
  withCommon(
    command.command("commit").description("Record HEAD as a commit on the branch-matched (or active) feature")
  ).action((options) => {
    const sha = git(options.projectRoot, ["rev-parse", "HEAD"]);
    const subject = git(options.projectRoot, ["log", "-1", "--format=%s"]) ?? "";
    if (!sha) {
      console.log(JSON.stringify({ linked: false, reason: "no HEAD commit" }));
      return;
    }
    const at2 = (/* @__PURE__ */ new Date()).toISOString();
    const active = currentFeature(options.projectRoot, resolveSession(options));
    const dir = recordCommitForBranch(options.projectRoot, active, { sha, subject }, at2);
    if (!dir) {
      const branch = git(options.projectRoot, ["branch", "--show-current"]);
      const fallback = branch ? resolveDeliveryFeatureByBranch(options.projectRoot, branch) : null;
      if (fallback) {
        recordLinkAttempt(options.projectRoot, fallback, `commit ${sha} not linked`, at2);
      }
    }
    regenerateReportSafe(options.projectRoot, dir ?? null);
    console.log(JSON.stringify({ linked: Boolean(dir), feature: dir ?? null, sha }));
  });
  withCommon(
    command.command("merge").description("Stamp the pulled merge commit on the branch-matched feature only")
  ).action((options) => {
    const sha = git(options.projectRoot, ["rev-parse", "HEAD"]);
    const branch = git(options.projectRoot, ["branch", "--show-current"]);
    const active = currentFeature(options.projectRoot, resolveSession(options));
    const dir = branch ? resolveDeliveryFeatureByBranch(options.projectRoot, branch, active) : null;
    if (!sha || !dir) {
      console.log(JSON.stringify({ linked: false, reason: "no merge target" }));
      return;
    }
    stampMergeCommit(options.projectRoot, dir, sha, (/* @__PURE__ */ new Date()).toISOString());
    regenerateReportSafe(options.projectRoot, dir);
    console.log(JSON.stringify({ linked: true, feature: dir, merge_commit: sha }));
  });
  withCommon(
    command.command("reconcile").description("Backfill the active feature delivery.json from local git (clone/CI path)")
  ).action((options) => {
    const dir = targetChange(options);
    if (!dir) {
      console.log(JSON.stringify({ reconciled: false, reason: "no feature to reconcile" }));
      return;
    }
    const record = reconcileDeliveryFromGit(options.projectRoot, dir, (/* @__PURE__ */ new Date()).toISOString());
    console.log(JSON.stringify({ reconciled: true, feature: dir, commits: record.commits.length }));
  });
  withCommon(
    command.command("commit-decision <answer>").description(
      `Record the answer to the commit question on the change (${COMMIT_DECISIONS.join("|")})`
    )
  ).action((answer, options) => {
    if (!isCommitDecision(answer)) {
      console.error(
        `unknown commit decision "${answer}"; expected one of ${COMMIT_DECISIONS.join(", ")}`
      );
      process.exitCode = 1;
      return;
    }
    const dir = targetChange(options);
    if (!dir) {
      console.log(JSON.stringify({ recorded: false, reason: "no feature to record on" }));
      return;
    }
    const record = setCommitDecision(options.projectRoot, dir, answer, (/* @__PURE__ */ new Date()).toISOString());
    console.log(
      JSON.stringify({ recorded: true, feature: dir, commit_decision: record.commit_decision })
    );
  });
  withCommon(
    command.command("refresh").description(
      "Read the push, PR and CI of the branch change from git and gh (read-only toward the repo)"
    ).option(
      "--min-age-seconds <n>",
      "Skip gh when the stored reading is younger than this",
      secondsOption
    )
  ).action(async (options) => {
    const outcome = await refreshDelivery({
      projectRoot: options.projectRoot,
      run: deps.run ?? execaCommandRunner,
      now: deps.now,
      minAgeSeconds: options.minAgeSeconds ?? null
    });
    console.log(JSON.stringify(outcome));
  });
  command.command("install").description("Install (chain) the post-commit / post-merge git hooks for this clone").option("--project-root <path>", "Project root", process.cwd()).option("--session <id>", "Ignored (accepted for a uniform hook-caller interface)").action((options) => {
    const result = installGitHooks(options.projectRoot);
    if (result.notAGitRepo) {
      console.log(JSON.stringify({ installed: [], reason: "not a git repository" }));
      return;
    }
    console.log(
      `**\u25B8 paqad** \xB7 git linkage hooks ready (${result.installed.join(", ") || "up to date"})`
    );
    console.log(JSON.stringify({ installed: result.installed, skipped: result.skipped }));
  });
  return command;
}

// src/cli/commands/discovery.ts
init_esm_shims();
import { readFileSync as readFileSync25 } from "fs";

// src/discovery/boundary.ts
init_esm_shims();

// src/discovery/run-store.ts
init_esm_shims();
import { mkdirSync as mkdirSync6, readFileSync as readFileSync22, readdirSync as readdirSync10, renameSync as renameSync4, writeFileSync as writeFileSync5 } from "fs";
import { dirname as dirname8, join as join42 } from "path";

// src/discovery/mint.ts
init_esm_shims();

// src/discovery/paths.ts
init_esm_shims();
var DISCOVERY_RUN_FILES = {
  run: "run.json",
  brief: "brief.json",
  sources: "sources.jsonl",
  contributions: "contributions.jsonl",
  synthesis: "synthesis.json",
  decisions: "decisions.json",
  readiness: "readiness.json",
  handoff: "handoff.json",
  stageEvidence: "stage-evidence.jsonl",
  contextReceipts: "context-receipts.jsonl",
  blockers: "blockers.jsonl"
};
var JIRA_ISSUE = "[A-Z][A-Z0-9]*-\\d+";
var GITHUB_ISSUE = "\\d+";
var DIR_NAME_RE = new RegExp(
  `^(?:(${JIRA_ISSUE}|${GITHUB_ISSUE})-)?([a-z0-9]+(?:-[a-z0-9]+)*)-(${ULID_BODY})$`
);
var ISSUE_RE = new RegExp(`^(?:${JIRA_ISSUE}|${GITHUB_ISSUE})$`);
function discoveryDir() {
  return PATHS.DISCOVERY_DIR;
}
function discoveryRunDir(dirName) {
  return join(PATHS.DISCOVERY_DIR, dirName);
}
function discoveryRunFilePath(dirName, file) {
  return join(discoveryRunDir(dirName), DISCOVERY_RUN_FILES[file]);
}
function discoveryReportPath(dirName) {
  return join(discoveryRunDir(dirName), "report.html");
}
function discoveryRunChangeKey(dirName) {
  return parseDiscoveryRunDirName(dirName)?.ulid ?? dirName;
}
function formatDiscoveryRunDirName(parts) {
  if (!isSlugSafe(parts.slug)) {
    throw new Error(`Unsafe Discovery run slug: ${JSON.stringify(parts.slug)}`);
  }
  if (!new RegExp(`^${ULID_BODY}$`).test(parts.ulid)) {
    throw new Error(`Malformed Discovery run ULID: ${JSON.stringify(parts.ulid)}`);
  }
  if (parts.issue !== null && !ISSUE_RE.test(parts.issue)) {
    throw new Error(`Malformed Discovery run issue ref: ${JSON.stringify(parts.issue)}`);
  }
  const prefix = parts.issue ? `${parts.issue}-` : "";
  return `${prefix}${parts.slug}-${parts.ulid}`;
}
function parseDiscoveryRunDirName(dirName) {
  const match = DIR_NAME_RE.exec(dirName);
  if (!match) {
    return null;
  }
  return { issue: match[1] ?? null, slug: match[2], ulid: match[3] };
}

// src/discovery/mint.ts
var UNTITLED_DISCOVERY_TITLE = "discovery";
function mintDiscoveryRunDirName(input) {
  const issue = resolveIssue(input);
  const slug = deriveSlug(input.title.trim().length > 0 ? input.title : UNTITLED_DISCOVERY_TITLE);
  const ulid2 = input.ulid ?? ulid(input.ulidSeed);
  const dirName = formatDiscoveryRunDirName({ issue, slug, ulid: ulid2 });
  return { dirName, issue, slug, ulid: ulid2 };
}
function resolveIssue(input) {
  if (input.issue !== void 0) {
    return normalizeIssue(input.issue);
  }
  const refs = detectTicketRefs(input.title, input.trackerKind ?? "generic");
  return normalizeIssue(refs[0] ?? null);
}
function normalizeIssue(issue) {
  if (issue === null) {
    return null;
  }
  const stripped = issue.replace(/^#/, "").trim();
  return stripped.length > 0 ? stripped : null;
}

// src/discovery/types.ts
init_esm_shims();
var DISCOVERY_EVIDENCE_DOC_TYPE = "paqad.discovery-evidence";
var DISCOVERY_DOC_TYPES = {
  run: "paqad.discovery.run",
  brief: "paqad.discovery.brief",
  source: "paqad.discovery.source",
  contribution: "paqad.discovery.contribution",
  synthesis: "paqad.discovery.synthesis",
  decisions: "paqad.discovery.decisions",
  readiness: "paqad.discovery.readiness",
  handoff: "paqad.discovery.handoff",
  contextReceipt: "paqad.discovery.context-receipt",
  blocker: "paqad.discovery.blocker",
  report: "paqad.discovery.report"
};
var DISCOVERY_SCHEMA_VERSION = 1;
var DISCOVERY_RUN_STATUSES = [
  "active",
  "waiting_input",
  "paused",
  "blocked",
  "completed",
  "cancelled"
];
var DISCOVERY_OUTCOMES = [
  "development",
  "experiment",
  "existing_product",
  "process_change",
  "deferred",
  "stopped"
];
function isDiscoveryRunStatus(value) {
  return typeof value === "string" && DISCOVERY_RUN_STATUSES.includes(value);
}
function isDiscoveryOutcome(value) {
  return typeof value === "string" && DISCOVERY_OUTCOMES.includes(value);
}

// src/discovery/run-store.ts
function atomicWriteJson(absPath, value) {
  mkdirSync6(dirname8(absPath), { recursive: true });
  const tmp = `${absPath}.tmp`;
  writeFileSync5(tmp, `${JSON.stringify(value, null, 2)}
`, "utf8");
  renameSync4(tmp, absPath);
}
function buildRunRecord(change, sessionId, body, stampAt) {
  return buildDocumentEnvelope({
    docType: DISCOVERY_DOC_TYPES.run,
    change,
    sessionId,
    schemaVersion: DISCOVERY_SCHEMA_VERSION,
    now: () => new Date(stampAt),
    body: { ...body }
  });
}
function openDiscoveryRun(projectRoot, input) {
  const minted = mintDiscoveryRunDirName({
    title: input.title,
    issue: input.issue,
    ulid: input.ulid,
    ulidSeed: input.ulidSeed
  });
  const openedAt = (input.now ?? (() => /* @__PURE__ */ new Date()))().toISOString();
  const body = {
    workflow: "discovery",
    title: input.title,
    slug: minted.slug,
    issue: minted.issue,
    revision: 1,
    status: "active",
    outcome: null,
    adapter: input.adapter,
    opened_at: openedAt,
    updated_at: openedAt
  };
  const record = buildRunRecord(minted.ulid, input.sessionId, body, openedAt);
  atomicWriteJson(join42(projectRoot, discoveryRunFilePath(minted.dirName, "run")), record);
  return { dirName: minted.dirName, record };
}
function readDiscoveryRun(projectRoot, dirName) {
  try {
    const parsed = JSON.parse(
      readFileSync22(join42(projectRoot, discoveryRunFilePath(dirName, "run")), "utf8")
    );
    if (isRunRecord(parsed)) {
      return parsed;
    }
  } catch {
  }
  return null;
}
function isRunRecord(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const record = value;
  return record.doc_type === DISCOVERY_DOC_TYPES.run && record.workflow === "discovery" && typeof record.session_id === "string" && typeof record.change === "string";
}
function updateDiscoveryRun(projectRoot, dirName, patch) {
  const current = readDiscoveryRun(projectRoot, dirName);
  if (current === null) {
    return null;
  }
  const updatedAt = (patch.now ?? (() => /* @__PURE__ */ new Date()))().toISOString();
  const body = {
    workflow: "discovery",
    title: current.title,
    slug: current.slug,
    issue: current.issue,
    revision: current.revision + (patch.bumpRevision ? 1 : 0),
    status: patch.status ?? current.status,
    outcome: patch.outcome === void 0 ? current.outcome : patch.outcome,
    adapter: current.adapter,
    opened_at: current.opened_at,
    updated_at: updatedAt
  };
  const record = buildRunRecord(current.change, current.session_id, body, updatedAt);
  atomicWriteJson(join42(projectRoot, discoveryRunFilePath(dirName, "run")), record);
  return record;
}
function listDiscoveryRuns(projectRoot) {
  try {
    return readdirSync10(join42(projectRoot, discoveryDir()), { withFileTypes: true }).filter((entry) => entry.isDirectory() && parseDiscoveryRunDirName(entry.name) !== null).map((entry) => entry.name).sort();
  } catch {
    return [];
  }
}
function resolveDiscoveryRunDir(projectRoot, ref) {
  const trimmed = ref.trim();
  if (trimmed.length === 0) {
    return null;
  }
  const runs = listDiscoveryRuns(projectRoot);
  if (runs.includes(trimmed)) {
    return trimmed;
  }
  const byUlid = runs.filter((dir) => discoveryRunChangeKey(dir) === trimmed);
  if (byUlid.length > 0) {
    return byUlid[byUlid.length - 1];
  }
  const bySlug = runs.filter((dir) => {
    if (parseDiscoveryRunDirName(dir)?.slug === trimmed) {
      return true;
    }
    return readDiscoveryRun(projectRoot, dir)?.slug === trimmed;
  });
  return bySlug.length > 0 ? bySlug[bySlug.length - 1] : null;
}

// src/discovery/stages.ts
init_esm_shims();
var DISCOVERY_STAGE_ORDER = [
  "understand",
  "investigate",
  "refine",
  "decide",
  "check_readiness",
  "hand_off"
];
var MANDATORY_DISCOVERY_STAGES = [...DISCOVERY_STAGE_ORDER];
var STAGE_ARTIFACT = {
  understand: DISCOVERY_DOC_TYPES.brief,
  investigate: DISCOVERY_DOC_TYPES.source,
  refine: DISCOVERY_DOC_TYPES.synthesis,
  decide: DISCOVERY_DOC_TYPES.decisions,
  check_readiness: DISCOVERY_DOC_TYPES.readiness,
  hand_off: DISCOVERY_DOC_TYPES.handoff
};
function isKnownDiscoveryStage(stage) {
  return DISCOVERY_STAGE_ORDER.includes(stage);
}
function discoveryStageIndex(stage) {
  return DISCOVERY_STAGE_ORDER.indexOf(stage);
}
var STAGE_ARTIFACT_FILE = {
  understand: "brief",
  investigate: "sources",
  refine: "synthesis",
  decide: "decisions",
  check_readiness: "readiness",
  hand_off: "handoff"
};
function discoveryStageArtifactFile(stage) {
  return isKnownDiscoveryStage(stage) ? STAGE_ARTIFACT_FILE[stage] : null;
}

// src/discovery/boundary.ts
function activeDiscoveryRunForSession(projectRoot, sessionId) {
  const state = readWorkflowState(projectRoot, sessionId);
  if (state.active?.workflow !== "discovery") {
    return null;
  }
  return state.active.discoveryRunId ?? null;
}

// src/discovery/fold.ts
init_esm_shims();
function rowTime(row) {
  const ts = row.ts ?? row.recorded_at;
  return typeof ts === "string" ? ts : null;
}
function minTime(a, b) {
  if (a === null) return b;
  if (b === null) return a;
  return a < b ? a : b;
}
function maxTime(a, b) {
  if (a === null) return b;
  if (b === null) return a;
  return a > b ? a : b;
}
function foldDiscoveryRun(rows) {
  const acc = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const stage = row.stage;
    if (typeof stage !== "string" || !isKnownDiscoveryStage(stage)) {
      continue;
    }
    const entry = acc.get(stage) ?? {
      started: false,
      ended: false,
      artifactDigest: null,
      startedAt: null,
      endedAt: null
    };
    const at2 = rowTime(row);
    if (row.kind === "stage_start") {
      entry.started = true;
      entry.startedAt = minTime(entry.startedAt, at2);
    } else if (row.kind === "stage_end") {
      entry.ended = true;
      entry.endedAt = maxTime(entry.endedAt, at2);
      const digest = row.artifact_digest;
      if (typeof digest === "string" && digest.length > 0) {
        entry.artifactDigest = digest;
      }
    }
    acc.set(stage, entry);
  }
  const stages = DISCOVERY_STAGE_ORDER.map((stage) => {
    const entry = acc.get(stage);
    const started = entry?.started ?? false;
    const ended = entry?.ended ?? false;
    const artifactDigest = entry?.artifactDigest ?? null;
    return {
      stage,
      started,
      ended,
      artifactDigest,
      startedAt: entry?.startedAt ?? null,
      endedAt: entry?.endedAt ?? null,
      complete: started && ended && artifactDigest !== null
    };
  });
  const byStage = new Map(stages.map((s) => [s.stage, s]));
  const missing = MANDATORY_DISCOVERY_STAGES.filter((stage) => !byStage.get(stage).complete);
  const orderingViolations = [];
  for (const later of stages) {
    if (later.startedAt === null) continue;
    for (const earlier of stages) {
      if (discoveryStageIndex(earlier.stage) >= discoveryStageIndex(later.stage)) continue;
      if (earlier.endedAt !== null && later.startedAt < earlier.endedAt) {
        orderingViolations.push({ earlier: earlier.stage, later: later.stage });
      }
    }
  }
  const verdict = missing.length === 0 && orderingViolations.length === 0 ? "complete" : rows.length === 0 ? "cannot-verify" : "incomplete";
  return { stages, missing, orderingViolations, verdict };
}

// src/discovery/recorder.ts
init_esm_shims();
import { createHash as createHash4 } from "crypto";
import { readFileSync as readFileSync23 } from "fs";
import { join as join43 } from "path";
function hashArtifact(projectRoot, relPath) {
  try {
    const bytes = readFileSync23(join43(projectRoot, relPath));
    if (bytes.length === 0) {
      return null;
    }
    return createHash4("sha256").update(bytes).digest("hex");
  } catch {
    return null;
  }
}
function recordDiscoveryStage(projectRoot, dirName, input) {
  if (!isKnownDiscoveryStage(input.stage)) {
    return null;
  }
  const stage = input.stage;
  const artifactDigest = input.phase === "end" && input.artifactPath ? hashArtifact(projectRoot, input.artifactPath) : null;
  const row = {
    kind: input.phase === "start" ? "stage_start" : "stage_end",
    conversation_ordinal: 1,
    change: discoveryRunChangeKey(dirName),
    stage,
    revision: input.revision,
    ...input.phase === "end" ? { artifact_path: input.artifactPath ?? null, artifact_digest: artifactDigest } : {},
    ...input.agent ? { agent: input.agent } : {}
  };
  const stamped = stampSessionRow(DISCOVERY_EVIDENCE_DOC_TYPE, input.sessionId, row, {
    schemaVersion: DISCOVERY_SCHEMA_VERSION,
    now: input.now
  });
  appendStampedRowToUnit(projectRoot, discoveryRunFilePath(dirName, "stageEvidence"), stamped);
  return stamped;
}
function readDiscoveryStageRows(projectRoot, dirName) {
  return readUnitFile(projectRoot, discoveryRunFilePath(dirName, "stageEvidence"));
}

// src/discovery/report.ts
init_esm_shims();
import { mkdirSync as mkdirSync7, readFileSync as readFileSync24, renameSync as renameSync5, writeFileSync as writeFileSync6 } from "fs";
import { dirname as dirname9, join as join44 } from "path";
function escapeHtml3(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function readJson2(projectRoot, relPath) {
  try {
    const parsed = JSON.parse(readFileSync24(join44(projectRoot, relPath), "utf8"));
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
function list(values) {
  if (!Array.isArray(values) || values.length === 0) {
    return '<p class="empty">none recorded</p>';
  }
  return `<ul>${values.map((v) => `<li>${escapeHtml3(v)}</li>`).join("")}</ul>`;
}
function section(title, inner) {
  return `<section><h2>${escapeHtml3(title)}</h2>${inner}</section>`;
}
function renderDiscoveryReport(projectRoot, dirName) {
  const run = readDiscoveryRun(projectRoot, dirName);
  const brief = readJson2(projectRoot, discoveryRunFilePath(dirName, "brief"));
  const synthesis = readJson2(projectRoot, discoveryRunFilePath(dirName, "synthesis"));
  const readiness = readJson2(projectRoot, discoveryRunFilePath(dirName, "readiness"));
  const handoff = readJson2(projectRoot, discoveryRunFilePath(dirName, "handoff"));
  const folded = foldDiscoveryRun(readDiscoveryStageRows(projectRoot, dirName));
  const title = run ? escapeHtml3(run.title) : escapeHtml3(dirName);
  const stageRows = folded.stages.map(
    (s) => `<tr><td>${escapeHtml3(s.stage)}</td><td>${s.complete ? "\u{1F7E2} done" : s.started ? "\u{1F7E1} in progress" : "\u26AA not started"}</td></tr>`
  ).join("");
  const body = [
    `<h1>Discovery \u2014 ${title}</h1>`,
    `<p class="meta">status <strong>${escapeHtml3(run?.status ?? "unknown")}</strong> \xB7 outcome <strong>${escapeHtml3(run?.outcome ?? "not decided")}</strong> \xB7 revision ${escapeHtml3(run?.revision ?? "?")} \xB7 verdict <strong>${escapeHtml3(folded.verdict)}</strong></p>`,
    `<p class="note">This is a read-only projection of the canonical records. It cannot set completion state.</p>`,
    section(
      "Stages",
      `<table><thead><tr><th>stage</th><th>state</th></tr></thead><tbody>${stageRows}</tbody></table>`
    ),
    section(
      "Intended outcome",
      brief ? `<p>${escapeHtml3(brief.intent)}</p>` : '<p class="empty">no brief yet</p>'
    ),
    section("Success", list(brief?.success)),
    section(
      "Recommendation",
      synthesis ? `<p>${escapeHtml3(synthesis.recommendation)}</p>` : '<p class="empty">no synthesis yet</p>'
    ),
    section("Readiness blockers", list(readiness?.blockers)),
    section(
      "Hand-off next action",
      handoff ? `<p>${escapeHtml3(handoff.next_action)}</p><p class="meta">authorization: ${escapeHtml3(handoff.authorization)}</p>` : '<p class="empty">not handed off yet</p>'
    )
  ].join("\n");
  const header = buildTextHeader({
    docType: DISCOVERY_DOC_TYPES.report,
    change: discoveryRunChangeKey(dirName),
    sessionId: run?.session_id ?? "unknown",
    schemaVersion: DISCOVERY_SCHEMA_VERSION,
    body
  });
  return [
    "<!doctype html>",
    '<html lang="en"><head><meta charset="utf-8">',
    `<meta name="viewport" content="width=device-width, initial-scale=1">`,
    `<title>Discovery \u2014 ${title}</title>`,
    renderHeaderScript(header),
    "<style>body{font:16px/1.5 system-ui,sans-serif;max-width:760px;margin:2rem auto;padding:0 16px;color:#1a1a1a}h1{font-size:1.5rem}h2{font-size:1.05rem;margin-top:1.5rem}.meta{color:#555}.note{color:#888;font-style:italic}.empty{color:#999}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ddd;padding:4px 8px;text-align:left}</style>",
    "</head><body>",
    body,
    "</body></html>",
    ""
  ].join("\n");
}
function writeDiscoveryReport(projectRoot, dirName) {
  const html = renderDiscoveryReport(projectRoot, dirName);
  const rel = discoveryReportPath(dirName);
  const abs = join44(projectRoot, rel);
  mkdirSync7(dirname9(abs), { recursive: true });
  const tmp = `${abs}.tmp`;
  writeFileSync6(tmp, html, "utf8");
  renameSync5(tmp, abs);
  return rel;
}

// src/discovery/context-receipts.ts
init_esm_shims();

// src/discovery/writers.ts
init_esm_shims();
import { appendFileSync as appendFileSync2, mkdirSync as mkdirSync8, renameSync as renameSync6, writeFileSync as writeFileSync7 } from "fs";
import { dirname as dirname10, join as join45 } from "path";
function atomicWriteJson2(absPath, value) {
  mkdirSync8(dirname10(absPath), { recursive: true });
  const tmp = `${absPath}.tmp`;
  writeFileSync7(tmp, `${JSON.stringify(value, null, 2)}
`, "utf8");
  renameSync6(tmp, absPath);
}
function writeDoc(ctx, file, docType, body) {
  const record = buildDocumentEnvelope({
    docType,
    change: discoveryRunChangeKey(ctx.dirName),
    sessionId: ctx.sessionId,
    schemaVersion: DISCOVERY_SCHEMA_VERSION,
    now: ctx.now,
    body
  });
  atomicWriteJson2(join45(ctx.projectRoot, discoveryRunFilePath(ctx.dirName, file)), record);
  return record;
}
function appendRow(ctx, file, docType, row) {
  const stamped = stampBundleRow({
    docType,
    change: discoveryRunChangeKey(ctx.dirName),
    sessionId: ctx.sessionId,
    schemaVersion: DISCOVERY_SCHEMA_VERSION,
    now: ctx.now,
    row
  });
  const abs = join45(ctx.projectRoot, discoveryRunFilePath(ctx.dirName, file));
  mkdirSync8(dirname10(abs), { recursive: true });
  appendFileSync2(abs, `${JSON.stringify(stamped)}
`, "utf8");
}
function writeBrief(ctx, body) {
  return writeDoc(ctx, "brief", DISCOVERY_DOC_TYPES.brief, { ...body });
}
function writeSynthesis(ctx, body) {
  return writeDoc(ctx, "synthesis", DISCOVERY_DOC_TYPES.synthesis, {
    ...body
  });
}
function writeDecisions(ctx, body) {
  return writeDoc(ctx, "decisions", DISCOVERY_DOC_TYPES.decisions, {
    ...body
  });
}
function writeReadiness(ctx, body) {
  return writeDoc(ctx, "readiness", DISCOVERY_DOC_TYPES.readiness, {
    ...body
  });
}
function writeHandoff(ctx, body) {
  return writeDoc(ctx, "handoff", DISCOVERY_DOC_TYPES.handoff, {
    ...body
  });
}
function appendSource(ctx, row) {
  appendRow(ctx, "sources", DISCOVERY_DOC_TYPES.source, { ...row });
}
function appendContribution(ctx, row) {
  appendRow(ctx, "contributions", DISCOVERY_DOC_TYPES.contribution, { ...row });
}
function appendContextReceipt(ctx, row) {
  appendRow(ctx, "contextReceipts", DISCOVERY_DOC_TYPES.contextReceipt, { ...row });
}
function appendBlocker(ctx, row) {
  appendRow(ctx, "blockers", DISCOVERY_DOC_TYPES.blocker, { ...row });
}

// src/discovery/context-contract.ts
init_esm_shims();
var CONTEXT_MODES = ["available", "read", "acknowledged"];
function isContextMode(value) {
  return CONTEXT_MODES.includes(value);
}
var DISCOVERY_STAGE_CONTEXT = {
  understand: [
    "current-request",
    "prior-answers",
    "project-purpose",
    "module-summaries",
    "established-constraints"
  ],
  investigate: [
    "assigned-question",
    "module-source-pointers",
    "current-official-documentation",
    "selected-expert-instructions",
    "targeted-arch-security-operating-constraints"
  ],
  refine: [
    "current-brief",
    "contributions",
    "alternatives",
    "conflicts",
    "design-evaluation-rules"
  ],
  decide: [
    "the-choice",
    "evidence",
    "recommendation",
    "consequences",
    "decision-authority-records"
  ],
  check_readiness: [
    "current-requirements",
    "decisions",
    "scenarios",
    "unresolved-risks",
    "readiness-handoff-policy"
  ],
  hand_off: [
    "validated-outcome",
    "accepted-scope-constraints",
    "readiness-result",
    "destination-entry-contract"
  ]
};
function stageContextContract(stage) {
  return DISCOVERY_STAGE_CONTEXT[stage] ?? [];
}
function extraContextItems(stage, loaded) {
  const bounded = new Set(stageContextContract(stage));
  return loaded.filter((item) => !bounded.has(item));
}

// src/discovery/context-receipts.ts
function recordContextReceipt(ctx, input) {
  if (!isContextMode(input.mode)) {
    return {
      ok: false,
      extra: [],
      error: `mode "${input.mode}" is not one of available|read|acknowledged`
    };
  }
  const extra = extraContextItems(input.stage, input.items);
  const reason2 = input.reason?.trim() ?? "";
  if (extra.length > 0 && reason2.length === 0) {
    return {
      ok: false,
      extra,
      error: `loading context beyond the stage default (${extra.join(", ")}) needs a recorded reason`
    };
  }
  appendContextReceipt(ctx, {
    stage: input.stage,
    items: input.items,
    mode: input.mode,
    reason: extra.length > 0 ? reason2 : null
  });
  return { ok: true, extra };
}

// src/cli/commands/discovery.ts
function session(root, opts) {
  return resolveSessionId(
    root,
    opts.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
  );
}
function loadTemplate(file) {
  try {
    const parsed = JSON.parse(readFileSync25(file, "utf8"));
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
function resolveRun(root, sessionId, runOpt) {
  if (runOpt !== void 0 && runOpt.trim().length > 0) {
    return resolveDiscoveryRunDir(root, runOpt);
  }
  return activeDiscoveryRunForSession(root, sessionId);
}
function normalizeSlashes(path2) {
  return path2.replace(/\\/g, "/");
}
function ownsRunForWrite(root, sessionId, dirName) {
  return readDiscoveryRun(root, dirName)?.session_id === sessionId;
}
function foreignRunMessage(root, dirName) {
  const owner = readDiscoveryRun(root, dirName)?.session_id ?? null;
  return owner === null ? `run ${dirName} has no readable owner (run.json missing) \u2014 cannot write to it` : `run ${dirName} is owned by another session (${owner}); only its owner may write to it`;
}
function fail(message) {
  console.error(`**\u25B8 paqad** \xB7 ${message}`);
  process.exitCode = 1;
}
function activateDiscoveryRun(root, sessionId, dirName) {
  const state = readWorkflowState(root, sessionId);
  const active = state.active;
  const alreadyActive = active?.workflow === "discovery" && active.discoveryRunId === dirName;
  const paused = state.paused.filter(
    (entry) => !(entry.workflow === "discovery" && entry.discoveryRunId === dirName)
  );
  const nextPaused = active && !alreadyActive ? [...paused, active] : paused;
  const next = {
    active: { workflow: "discovery", discoveryRunId: dirName },
    paused: nextPaused
  };
  if (state.turn_started_at !== void 0) {
    next.turn_started_at = state.turn_started_at;
  }
  writeWorkflowState(root, sessionId, next);
}
function writeCtx(root, dirName, sessionId) {
  return { projectRoot: root, dirName, sessionId };
}
function projectRootOption(command) {
  return command.option("--project-root <path>", "Project root", process.cwd()).option("--session <id>", "Session id (defaults to SE_SESSION / CLAUDE_SESSION_ID)");
}
function createDiscoveryCommand() {
  const discovery = new Command("discovery").description(
    "Drive a standalone Discovery run (understand \u2192 investigate \u2192 refine \u2192 decide \u2192 check readiness \u2192 hand off)"
  );
  projectRootOption(
    discovery.command("start").description("Open a new Discovery run and make it the session\u2019s active workflow").requiredOption("--title <title>", "A short title for the run").option("--issue <ref>", "Ticket/issue ref (e.g. 597, PQD-12)").option("--adapter <name>", "Host adapter", "claude-code")
  ).action((opts) => {
    const root = opts.projectRoot;
    const sessionId = session(root, opts);
    const { dirName, record } = openDiscoveryRun(root, {
      sessionId,
      title: opts.title,
      issue: opts.issue ?? void 0,
      adapter: opts.adapter
    });
    activateDiscoveryRun(root, sessionId, dirName);
    console.log(`**\u25B8 paqad** \xB7 opened Discovery run ${dirName} (status ${record.status})`);
    console.log(JSON.stringify({ started: true, run: dirName }));
  });
  projectRootOption(
    discovery.command("stage").description("Record a Discovery stage boundary in the run\u2019s evidence ledger").argument("<phase>", "'start' or 'end'").argument(
      "<stage>",
      "understand | investigate | refine | decide | check_readiness | hand_off"
    ).option("--run <ref>", "The run (dir name, ULID, or slug); defaults to the active run").option(
      "--artifact <path>",
      "Artifact the stage produced (an end only); its bytes are hashed"
    )
  ).action(
    (phase, stage, opts) => {
      const root = opts.projectRoot;
      const sessionId = session(root, opts);
      if (phase !== "start" && phase !== "end") {
        return fail(`unknown phase "${phase}" \u2014 use 'start' or 'end'`);
      }
      if (!isKnownDiscoveryStage(stage)) {
        return fail(`"${stage}" is not one of the six Discovery stages`);
      }
      const dirName = resolveRun(root, sessionId, opts.run);
      if (dirName === null) {
        return fail("no Discovery run \u2014 pass --run or start one first");
      }
      if (!ownsRunForWrite(root, sessionId, dirName)) {
        return fail(foreignRunMessage(root, dirName));
      }
      let artifactPath;
      if (phase === "end") {
        const canonical = discoveryRunFilePath(dirName, discoveryStageArtifactFile(stage));
        if (opts.artifact !== void 0 && normalizeSlashes(opts.artifact) !== canonical) {
          return fail(
            `${stage} proves itself with ${canonical}, not ${opts.artifact}; omit --artifact to use the canonical file`
          );
        }
        artifactPath = canonical;
      }
      const revision = readDiscoveryRun(root, dirName)?.revision ?? 1;
      recordDiscoveryStage(root, dirName, { sessionId, stage, phase, revision, artifactPath });
      console.log(JSON.stringify({ recorded: true, stage, phase, run: dirName }));
    }
  );
  addRecordSubcommand(discovery);
  projectRootOption(
    discovery.command("status").description("Show the active run\u2019s stages and completion verdict").option("--run <ref>", "The run; defaults to the active run")
  ).action((opts) => {
    const root = opts.projectRoot;
    const sessionId = session(root, opts);
    const dirName = resolveRun(root, sessionId, opts.run);
    if (dirName === null) {
      return fail("no Discovery run to report");
    }
    const run = readDiscoveryRun(root, dirName);
    const folded = foldDiscoveryRun(readDiscoveryStageRows(root, dirName));
    console.log(
      `**\u25B8 paqad** \xB7 Discovery run ${dirName} \u2014 status ${run?.status ?? "?"}, verdict ${folded.verdict}`
    );
    console.log(
      JSON.stringify({
        run: dirName,
        status: run?.status ?? null,
        outcome: run?.outcome ?? null,
        verdict: folded.verdict,
        missing: folded.missing
      })
    );
  });
  projectRootOption(
    discovery.command("resume").description("Resume a run and make it the session\u2019s active workflow").argument("<ref>", "The run (dir name, ULID, or slug)")
  ).action((ref, opts) => {
    const root = opts.projectRoot;
    const sessionId = session(root, opts);
    const dirName = resolveDiscoveryRunDir(root, ref);
    if (dirName === null) {
      return fail(`no Discovery run matches "${ref}"`);
    }
    activateDiscoveryRun(root, sessionId, dirName);
    console.log(`**\u25B8 paqad** \xB7 resumed Discovery run ${dirName}`);
    console.log(JSON.stringify({ resumed: true, run: dirName }));
  });
  projectRootOption(
    discovery.command("set-status").description("Update the run\u2019s execution status (and optionally its hand-off outcome)").argument("<status>", DISCOVERY_RUN_STATUSES.join(" | ")).option("--run <ref>", "The run; defaults to the active run").option("--outcome <outcome>", DISCOVERY_OUTCOMES.join(" | ")).option("--bump-revision", "Bump the revision (a material change)", false)
  ).action(
    (status, opts) => {
      const root = opts.projectRoot;
      const sessionId = session(root, opts);
      if (!isDiscoveryRunStatus(status)) {
        return fail(`"${status}" is not a valid run status`);
      }
      if (opts.outcome !== void 0 && !isDiscoveryOutcome(opts.outcome)) {
        return fail(`"${opts.outcome}" is not a valid outcome`);
      }
      const dirName = resolveRun(root, sessionId, opts.run);
      if (dirName === null) {
        return fail("no Discovery run to update");
      }
      if (!ownsRunForWrite(root, sessionId, dirName)) {
        return fail(foreignRunMessage(root, dirName));
      }
      if (status === "completed") {
        const verdict = foldDiscoveryRun(readDiscoveryStageRows(root, dirName)).verdict;
        if (verdict !== "complete") {
          return fail(
            `cannot mark this run completed \u2014 its stage evidence is ${verdict}. Finish the missing stages first (see \`discovery status\`).`
          );
        }
      }
      const updated = updateDiscoveryRun(root, dirName, {
        status,
        outcome: opts.outcome,
        bumpRevision: opts.bumpRevision
      });
      console.log(JSON.stringify({ updated: updated !== null, run: dirName, status }));
    }
  );
  projectRootOption(
    discovery.command("report").description("Generate the run\u2019s read-only report.html from its canonical records").option("--run <ref>", "The run; defaults to the active run")
  ).action((opts) => {
    const root = opts.projectRoot;
    const sessionId = session(root, opts);
    const dirName = resolveRun(root, sessionId, opts.run);
    if (dirName === null) {
      return fail("no Discovery run to report");
    }
    const path2 = writeDiscoveryReport(root, dirName);
    console.log(`**\u25B8 paqad** \xB7 wrote ${path2}`);
    console.log(JSON.stringify({ report: path2 }));
  });
  return discovery;
}
function addRecordSubcommand(discovery) {
  const record = (name, help) => projectRootOption(
    discovery.command(name).description(help).argument("<template>", "Path to the filled JSON template").option("--run <ref>", "The run; defaults to the active run")
  );
  const withRun = (opts, templateFile, apply) => {
    const root = opts.projectRoot;
    const sessionId = session(root, opts);
    const dirName = resolveRun(root, sessionId, opts.run);
    if (dirName === null) {
      return fail("no Discovery run \u2014 pass --run or start one first");
    }
    if (!ownsRunForWrite(root, sessionId, dirName)) {
      return fail(foreignRunMessage(root, dirName));
    }
    const body = loadTemplate(templateFile);
    if (body === null) {
      return fail(`template ${templateFile} is not a readable JSON object`);
    }
    apply(writeCtx(root, dirName, sessionId), body);
    console.log(JSON.stringify({ recorded: true, run: dirName }));
  };
  record("brief", "Record the Understand-stage brief (brief.json)").action(
    (template, opts) => withRun(opts, template, (ctx, body) => writeBrief(ctx, body))
  );
  record("synthesis", "Record the chief synthesis (synthesis.json)").action(
    (template, opts) => withRun(opts, template, (ctx, body) => writeSynthesis(ctx, body))
  );
  record("decisions", "Record the Decide-stage decision index (decisions.json)").action(
    (template, opts) => withRun(opts, template, (ctx, body) => writeDecisions(ctx, body))
  );
  record("readiness", "Record the readiness verdict (readiness.json)").action(
    (template, opts) => withRun(opts, template, (ctx, body) => writeReadiness(ctx, body))
  );
  record("handoff", "Record the hand-off (handoff.json)").action(
    (template, opts) => withRun(opts, template, (ctx, body) => writeHandoff(ctx, body))
  );
  record("source", "Append one research source (sources.jsonl)").action(
    (template, opts) => withRun(opts, template, (ctx, body) => appendSource(ctx, body))
  );
  record("contribution", "Append one expert contribution (contributions.jsonl)").action(
    (template, opts) => withRun(opts, template, (ctx, body) => appendContribution(ctx, body))
  );
  record("blocker", "Append one blocker (blockers.jsonl)").action(
    (template, opts) => withRun(opts, template, (ctx, body) => appendBlocker(ctx, body))
  );
  record("context", "Record a stage-local context receipt (context-receipts.jsonl)").action(
    (template, opts) => {
      const root = opts.projectRoot;
      const sessionId = session(root, opts);
      const dirName = resolveRun(root, sessionId, opts.run);
      if (dirName === null) {
        return fail("no Discovery run \u2014 pass --run or start one first");
      }
      if (!ownsRunForWrite(root, sessionId, dirName)) {
        return fail(foreignRunMessage(root, dirName));
      }
      const body = loadTemplate(template);
      if (body === null) {
        return fail(`template ${template} is not a readable JSON object`);
      }
      const result = recordContextReceipt(writeCtx(root, dirName, sessionId), {
        stage: String(body.stage ?? ""),
        items: Array.isArray(body.items) ? body.items : [],
        mode: body.mode,
        reason: typeof body.reason === "string" ? body.reason : null
      });
      if (!result.ok) {
        return fail(result.error ?? "context receipt refused");
      }
      console.log(JSON.stringify({ recorded: true, run: dirName }));
    }
  );
}

// src/cli/commands/disable.ts
init_esm_shims();
function createDisableCommand() {
  return new Command("disable").description(
    "Disable paqad for this project (vanilla mode) \u2014 gates, hooks, and the verification backstop become a no-op until re-enabled"
  ).option("--project-root <path>", "Project root", process.cwd()).action((options) => {
    try {
      const result = setFrameworkEnabled(options.projectRoot, false);
      console.log(
        JSON.stringify(
          {
            ...result,
            message: "paqad disabled (vanilla mode). Re-enable with `paqad-ai enable`. Tip: set PAQAD_DISABLED=1 for a per-run override without editing tracked files."
          },
          null,
          2
        )
      );
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
      process.exitCode = 1;
    }
  });
}

// src/cli/commands/doctor.ts
init_esm_shims();
function createDoctorCommand() {
  return new Command("doctor").description("Check framework health and suggest fixes").option("--project-root <path>", "Project root", process.cwd()).action(async (options) => {
    const report2 = await new HealthChecker().run(options.projectRoot);
    console.log(JSON.stringify(report2, null, 2));
    process.exitCode = report2.overall_status === "fail" ? 1 : 0;
  });
}

// src/cli/commands/plugin.ts
init_esm_shims();
function createPluginCommand() {
  const command = new Command("plugin").description("Manage the Claude Code plugin migration");
  command.command("rollback").description("Move this machine back to the npm setup in Claude Code and stop re-migrating").option("--project-root <path>", "Project root", process.cwd()).action((options) => {
    const message = rollbackPlugin(options.projectRoot, {
      runClaudeUninstall: runClaudePluginUninstall
    });
    console.log(message);
  });
  command.command("tick", { hidden: true }).description("Record one Claude Code session against the plugin migration (used by hooks)").requiredOption("--source <source>", "Which copy ran the session: npm or plugin").option("--session <id>", "The Claude Code session id").action(async (options) => {
    if (options.source !== "npm" && options.source !== "plugin") return;
    await recordMigrationSession(
      { source: options.source, sessionId: options.session },
      { runClaudeUninstall: runClaudePluginUninstall }
    );
  });
  return command;
}

// src/cli/commands/enable.ts
init_esm_shims();
function createEnableCommand() {
  return new Command("enable").description(
    "Re-enable paqad for this project \u2014 restores full framework behavior with no re-onboarding"
  ).option("--project-root <path>", "Project root", process.cwd()).action((options) => {
    try {
      const result = setFrameworkEnabled(options.projectRoot, true);
      console.log(
        JSON.stringify(
          {
            ...result,
            message: "paqad enabled. Note: a PAQAD_DISABLED=1 environment override, if set, still forces vanilla mode for that run."
          },
          null,
          2
        )
      );
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
      process.exitCode = 1;
    }
  });
}

// src/cli/commands/evidence.ts
init_esm_shims();
import { mkdirSync as mkdirSync9, writeFileSync as writeFileSync8 } from "fs";
import { dirname as dirname11, resolve as resolve9 } from "path";
function createEvidenceCommand() {
  const command = new Command("evidence").description("Render verification evidence as a scannable PR comment (Markdown or JSON)").argument("[sha]", "Commit SHA or label shown in the headline").option("--format <fmt>", "Output format: markdown | json", "markdown").option("--project-root <path>", "Project root", process.cwd()).option("--output <path>", "Write to a file instead of stdout (for gh pr comment --body-file)").option("--fail-on-red", "Exit non-zero when the overall status is fail", false).action((sha, options) => {
    const projectRoot = resolve9(options.projectRoot);
    const fmt = options.format.toLowerCase();
    if (fmt !== "markdown" && fmt !== "json") {
      process.stderr.write(
        `error: invalid --format value '${options.format}' (expected markdown or json)
`
      );
      process.exitCode = 2;
      return;
    }
    const evidence = readVerificationEvidence(projectRoot);
    if (evidence === null) {
      process.stderr.write(
        `evidence: no verification evidence found at ${projectRoot} \u2014 run verification first
`
      );
      process.exitCode = 4;
      return;
    }
    const output = fmt === "json" ? JSON.stringify(evidence, null, 2) : renderEvidenceMarkdown(evidence, sha ? { sha } : {});
    if (options.output) {
      const target = resolve9(options.output);
      mkdirSync9(dirname11(target), { recursive: true });
      writeFileSync8(target, `${output}
`, "utf8");
    } else {
      process.stdout.write(`${output}
`);
    }
    if (options.failOnRed && evidence.overall_status === "fail") {
      process.stderr.write("evidence: --fail-on-red tripped \u2014 overall status is fail\n");
      process.exitCode = 3;
    }
  });
  command.addCommand(createEvidenceMigrateCommand());
  return command;
}
function createEvidenceMigrateCommand() {
  return new Command("migrate").description("Move old spec-pipeline runs into their change bundles (runs once on update)").option("--dry-run", "Print what would change and write nothing", false).option(
    "--session <id>",
    "Your session id, so a change you have open is not treated as held by another session"
  ).action((options, command) => {
    const { projectRoot } = command.optsWithGlobals();
    const result = migrateFeatureEvidence(resolve9(projectRoot), {
      dryRun: options.dryRun,
      sessionId: options.session ?? migrationSessionId()
    });
    process.stdout.write(`${formatEvidenceMigration(result)}
`);
    if (result.actions.some((action) => action.kind === "failed")) {
      process.exitCode = 1;
    }
  });
}

// src/cli/commands/feature.ts
init_esm_shims();
import { writeFileSync as writeFileSync9 } from "fs";
import { pathToFileURL } from "url";
function createFeatureCommand() {
  const command = new Command("feature").description(
    "Export or prune per-feature evidence bundles"
  );
  command.command("export").description("Export one feature bundle as a self-contained JSON document").argument("<ref>", "Feature ref (ULID, issue, slug, or dir name)").option("--project-root <path>", "Project root", process.cwd()).option("--session <id>", "Session whose features the ref resolves against").option("--out <file>", "Write the export to a file instead of stdout").action((ref, options) => {
    const sessionId = resolveSessionId(
      options.projectRoot,
      options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
    );
    const dirName = resolveFeatureRef(options.projectRoot, sessionId, ref);
    if (!dirName) {
      console.error(`could not resolve feature "${ref}"`);
      process.exitCode = 1;
      return;
    }
    const bundle = exportFeatureBundle(options.projectRoot, dirName, (/* @__PURE__ */ new Date()).toISOString());
    if (bundle.strays.length > 0) {
      const one = bundle.strays.length === 1;
      console.error(
        `**\u25B8 paqad** \xB7 \u{1F7E1} this bundle carries ${bundle.strays.length} ${one ? "file that does" : "files that do"} not belong in it: ${bundle.strays.join(", ")}`
      );
    }
    const json = `${JSON.stringify(bundle, null, 2)}
`;
    if (options.out) {
      writeFileSync9(options.out, json, "utf8");
      console.log(JSON.stringify({ exported: true, feature: dirName, out: options.out }));
    } else {
      console.log(json);
    }
  });
  command.command("report").description("Render a self-contained HTML evidence report for a feature bundle").argument(
    "[ref]",
    "Feature ref (ULID, issue, slug, or dir name); defaults to the active/most-recent feature"
  ).option("--project-root <path>", "Project root", process.cwd()).option("--session <id>", "Session whose active feature is used when no ref is given").option("--out <file>", "Write the report to this path instead of the bundle dir report.html").option("--quiet", "Do not print the report path line", false).action(
    (ref, options) => {
      const sessionId = resolveSessionId(
        options.projectRoot,
        options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
      );
      const active = currentFeature(options.projectRoot, sessionId);
      const dirName = resolveReportFeatureRef(options.projectRoot, sessionId, ref, active);
      if (!dirName) {
        console.error(
          ref ? `could not resolve feature "${ref}"` : "no feature bundle found to report on"
        );
        process.exitCode = 1;
        return;
      }
      let result;
      try {
        result = writeFeatureReport(options.projectRoot, dirName, {
          sessionId,
          outPath: options.out
        });
      } catch (error) {
        console.error(`could not render report: ${error.message}`);
        process.exitCode = 1;
        return;
      }
      if (!options.quiet) {
        const url = pathToFileURL(result.path).href;
        const ESC = String.fromCharCode(27);
        const link = `${ESC}]8;;${url}${ESC}\\report.html${ESC}]8;;${ESC}\\`;
        console.log(`**\u25B8 paqad** \xB7 report: ${link}`);
        console.log(result.path);
      }
      console.log(JSON.stringify({ rendered: true, feature: dirName, path: result.path }));
    }
  );
  command.command("prune").description("Retention: keep the N most-recent bundles, remove older non-live ones").option("--project-root <path>", "Project root", process.cwd()).option("--session <id>", "Ignored (accepted for a uniform CLI interface)").option("--keep <n>", "How many non-live bundles to keep", "50").action((options) => {
    const keep = Number.parseInt(options.keep, 10);
    if (!Number.isInteger(keep) || keep < 0) {
      console.error(`--keep must be a non-negative integer (got "${options.keep}")`);
      process.exitCode = 1;
      return;
    }
    const result = pruneFeatureBundles(options.projectRoot, keep);
    console.log(
      `**\u25B8 paqad** \xB7 pruned ${result.removed.length} old feature bundle${result.removed.length === 1 ? "" : "s"}`
    );
    console.log(JSON.stringify({ removed: result.removed.length, kept: result.kept.length }));
  });
  return command;
}

// src/cli/commands/fix.ts
init_esm_shims();

// src/fix-protocol/fix-prove.ts
init_esm_shims();
import { execFileSync as execFileSync3 } from "child_process";
import { resolve as resolve10 } from "path";

// src/fix-protocol/fix-protocol.ts
init_esm_shims();

// src/core/types/fix-protocol.ts
init_esm_shims();
var REGRESSION_GUARD_SCHEMA_VERSION = "1.0.0";
var DEFECT_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;

// src/fix-protocol/baseline.ts
init_esm_shims();
function detectRegression(baseline, afterFix) {
  const { delta } = createTestDelta(baseline, afterFix, {
    treat_missing_as_passing: true
  });
  return {
    regressed: delta.newly_failing_tests.length > 0 || delta.newly_errored_tests.length > 0,
    newly_failing: delta.newly_failing_tests,
    newly_errored: delta.newly_errored_tests
  };
}

// src/fix-protocol/proof.ts
init_esm_shims();
function assessProofGenuineness(proof, unfixedRun) {
  if (unfixedRun.passed) {
    return {
      genuine: false,
      reason: `Proof "${proof.test_id}" passed on the unfixed tree; it does not reproduce the defect.`
    };
  }
  const signal = proof.expected_failure_signal;
  if (signal !== void 0 && signal.length > 0 && !unfixedRun.output.includes(signal)) {
    return {
      genuine: false,
      reason: `Proof "${proof.test_id}" failed, but not for the reported defect (signal "${signal}" absent).`
    };
  }
  return {
    genuine: true,
    reason: `Proof "${proof.test_id}" fails on the unfixed tree, reproducing the defect.`
  };
}
function proofPassesAfterFix(proof, fixedRun) {
  if (fixedRun.passed) {
    return {
      passes: true,
      reason: `Proof "${proof.test_id}" now passes after the fix.`
    };
  }
  return {
    passes: false,
    reason: `Proof "${proof.test_id}" still fails after the fix; the defect is not resolved.`
  };
}

// src/fix-protocol/regression-guard.ts
init_esm_shims();
import { mkdir as mkdir3, readdir as readdir2, readFile as readFile6, rename as rename2, writeFile as writeFile3 } from "fs/promises";
import { join as join46 } from "path";
function assertSafeDefectId(defectId) {
  if (!DEFECT_ID_PATTERN.test(defectId)) {
    throw new Error(
      `Invalid defect_id "${defectId}": must be a filename-safe slug (letters, digits, ., _, -).`
    );
  }
}
function guardDir(projectRoot) {
  return join46(projectRoot, PATHS.REGRESSION_GUARDS_DIR);
}
function guardPath(projectRoot, defectId) {
  return join46(guardDir(projectRoot), `${defectId}.json`);
}
async function writeRegressionGuard(projectRoot, guard) {
  assertSafeDefectId(guard.defect_id);
  const targetPath = guardPath(projectRoot, guard.defect_id);
  await mkdir3(guardDir(projectRoot), { recursive: true });
  const tempPath = `${targetPath}.tmp-${process.pid}-${Date.now()}`;
  const payload = `${JSON.stringify(guard, null, 2)}
`;
  await writeFile3(tempPath, payload, "utf8");
  await rename2(tempPath, targetPath);
  return targetPath;
}

// src/fix-protocol/fix-protocol.ts
async function runFixProtocol(input) {
  const affects = affectsBehaviour(input.change);
  if (!affects.affects) {
    await input.applyFix();
    return {
      status: "skipped-no-behaviour-change",
      reason: affects.reason,
      affects_behaviour: affects
    };
  }
  const unfixedRun = await input.runProofOnUnfixedTree(input.proof);
  const genuine = assessProofGenuineness(input.proof, unfixedRun);
  if (!genuine.genuine) {
    return {
      status: "rejected-proof-not-genuine",
      reason: genuine.reason,
      affects_behaviour: affects,
      proof_genuine: genuine
    };
  }
  await input.applyFix();
  const fixedRun = await input.runProofOnFixedTree(input.proof);
  const passesNow = proofPassesAfterFix(input.proof, fixedRun);
  if (!passesNow.passes) {
    return {
      status: "rejected-proof-still-failing",
      reason: passesNow.reason,
      affects_behaviour: affects,
      proof_genuine: genuine
    };
  }
  const afterFix = await input.runFullSuiteAfterFix();
  const regression = detectRegression(input.baseline.issues, afterFix);
  if (regression.regressed) {
    return {
      status: "rejected-regression",
      reason: `Fix rejected: ${regression.newly_failing.length + regression.newly_errored.length} previously-passing check(s) now fail.`,
      affects_behaviour: affects,
      proof_genuine: genuine,
      regression
    };
  }
  const guard = {
    schema_version: REGRESSION_GUARD_SCHEMA_VERSION,
    defect_id: input.defect_id,
    created_at: input.now,
    proof: {
      test_id: input.proof.test_id,
      test_file: input.proof.test_file,
      command: input.proof.command
    },
    failing_evidence: input.failing_evidence,
    linked_ac_id: input.linked_ac_id ?? null
  };
  const guardPath2 = await writeRegressionGuard(input.project_root, guard);
  return {
    status: "fixed",
    reason: `Defect ${input.defect_id} fixed: proof failed before and passes after, with no regression.`,
    affects_behaviour: affects,
    proof_genuine: genuine,
    regression,
    guard_path: guardPath2
  };
}

// src/fix-protocol/fix-prove.ts
var DEFAULT_PROOF_TIMEOUT_MS = 10 * 60 * 1e3;
var OUTPUT_TAIL_LINES2 = 40;
var COMMAND_NOT_RUNNABLE_CODES = /* @__PURE__ */ new Set([126, 127]);
function commandPath(bin, cwd) {
  return bin.includes("/") || bin.includes("\\") ? resolve10(cwd, bin) : bin;
}
var runProofCommand = async (command, cwd, timeoutMs2) => {
  const started = Date.now();
  const parsed = parseCommandChain(command);
  if (!parsed.ok || parsed.steps.length === 0) {
    return {
      exit_code: null,
      timed_out: false,
      spawn_failed: false,
      invalid: parsed.ok ? "empty command" : `unsupported shell syntax: ${parsed.invalidToken}`,
      output: "",
      duration_ms: 0
    };
  }
  const flags = { timedOut: false, spawnFailed: false };
  const deadline = started + timeoutMs2;
  const shell = {
    async run(bin, args) {
      const remaining = Math.max(1, deadline - Date.now());
      const result = await execa(bin, args, { cwd, reject: false, timeout: remaining });
      if (result.timedOut) flags.timedOut = true;
      const missing = result.code === "ENOENT" || result.exitCode !== 0 && !result.timedOut && !isOnPath(commandPath(bin, cwd));
      const exitCode = missing ? 127 : typeof result.exitCode === "number" ? result.exitCode : 1;
      if (missing) flags.spawnFailed = true;
      return { stdout: result.stdout, stderr: result.stderr, exitCode };
    }
  };
  const outcome = await runCommandChain(shell, parsed.steps, cwd);
  return {
    exit_code: outcome.exitCode,
    timed_out: flags.timedOut,
    spawn_failed: flags.spawnFailed,
    invalid: null,
    output: [outcome.stdout, outcome.stderr].filter((part) => part.length > 0).join("\n"),
    duration_ms: Date.now() - started
  };
};
function treeDirty(projectRoot) {
  try {
    const status = execFileSync3("git", ["status", "--porcelain"], {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
    return status.trim().length > 0;
  } catch {
    return null;
  }
}
function tail(output) {
  const lines = output.split("\n").filter((line) => line.trim().length > 0);
  return lines.slice(-OUTPUT_TAIL_LINES2);
}
function commandError(result) {
  if (result.invalid !== null) return `The proof command was not run: ${result.invalid}.`;
  if (result.timed_out) return "The proof command timed out, so it proves nothing.";
  if (result.exit_code === null)
    return "The proof command gave no exit code, so it proves nothing.";
  if (result.spawn_failed || COMMAND_NOT_RUNNABLE_CODES.has(result.exit_code)) {
    return `The proof command could not run (exit ${result.exit_code}); check the command.`;
  }
  return null;
}
function failingIssues(projectRoot, dirName) {
  const report2 = readChecksReportForFeature(projectRoot, dirName);
  if (!report2) return [];
  return report2.results.flatMap((result) => [
    ...result.failures.map((issue) => ({
      test_id: issue.test_id,
      message: issue.message,
      status: "failed"
    })),
    ...result.errors.map((issue) => ({
      test_id: issue.test_id,
      message: issue.message,
      status: "errored"
    }))
  ]);
}
function defectIdFor(dirName) {
  return `fix-${featureChangeKey(dirName)}`;
}
async function proveFix(input) {
  const now = input.now ?? (() => /* @__PURE__ */ new Date());
  const runCommand = input.runCommand ?? runProofCommand;
  const proof = {
    test_file: input.testFile,
    test_id: input.testId,
    command: input.command
  };
  const git2 = readGitState(input.projectRoot);
  const base = {
    phase: input.phase,
    test_file: input.testFile,
    test_id: input.testId,
    command: input.command,
    commit: git2.head_commit ?? null,
    tree_dirty: treeDirty(input.projectRoot)
  };
  let lastRun = null;
  const runOnce = async () => {
    lastRun = await runCommand(
      input.command,
      input.projectRoot,
      input.timeoutMs ?? DEFAULT_PROOF_TIMEOUT_MS
    );
    return lastRun;
  };
  const rowFrom = (run, fields) => ({
    ...base,
    exit_code: run.exit_code,
    timed_out: run.timed_out,
    duration_ms: run.duration_ms,
    at: now().toISOString(),
    output_tail: tail(run.output),
    ...fields
  });
  let row;
  if (input.phase === "red") {
    const run = await runOnce();
    const error = commandError(run);
    if (error !== null) {
      row = rowFrom(run, { outcome: "error", reason: error });
    } else if (run.exit_code === 0) {
      row = rowFrom(run, {
        outcome: "not-reproduced",
        reason: `Proof "${input.testId}" passed before the fix, so it does not reproduce the problem.`
      });
    } else if (!run.output.includes(input.testId)) {
      row = rowFrom(run, {
        outcome: "error",
        reason: `The command failed without naming "${input.testId}", so it is not counted as the test failing.`
      });
    } else {
      row = rowFrom(run, {
        outcome: "red",
        reason: `Proof "${input.testId}" fails before the fix.`,
        baseline_failing: failingIssues(input.projectRoot, input.dirName).map(
          (issue) => issue.test_id
        )
      });
    }
  } else {
    row = await proveGreen(input, proof, runOnce, rowFrom, () => lastRun, now);
  }
  appendFixProofRow(input.projectRoot, input.dirName, row, {
    sessionId: input.sessionId,
    now
  });
  return row;
}
async function proveGreen(input, proof, runOnce, rowFrom, lastRun, now) {
  const red = countedRedRow(readFixProofRows(input.projectRoot, input.dirName));
  if (red === null) {
    const run2 = await runOnce();
    const error2 = commandError(run2);
    if (error2 !== null) return rowFrom(run2, { outcome: "error", reason: error2 });
    return run2.exit_code === 0 ? rowFrom(run2, {
      outcome: "green",
      reason: `Proof "${input.testId}" passes, but no red run was recorded before the fix.`
    }) : rowFrom(run2, {
      outcome: "still-failing",
      reason: `Proof "${input.testId}" still fails.`
    });
  }
  const recordedRed = { passed: false, output: red.output_tail.join("\n") };
  const baseline = (red.baseline_failing ?? []).map((testId) => ({
    test_id: testId,
    message: "",
    status: "failed"
  }));
  const result = await runFixProtocol({
    project_root: input.projectRoot,
    defect_id: defectIdFor(input.dirName),
    change: behaviourChangeOf(readChangeDiff(input.projectRoot) ?? { files: [] }),
    proof,
    baseline: { captured_at: red.at, source: "reused-evidence", issues: baseline },
    failing_evidence: {
      category: "test-failure",
      file: red.test_file,
      line: null,
      test_id: red.test_id,
      suite: null,
      ac_id: null,
      message: red.reason,
      stderr_excerpt: red.output_tail.slice(-5).join("\n") || null
    },
    now: now().toISOString(),
    runProofOnUnfixedTree: async () => recordedRed,
    applyFix: async () => {
    },
    runProofOnFixedTree: async () => {
      const run2 = await runOnce();
      return { passed: run2.exit_code === 0 && commandError(run2) === null, output: run2.output };
    },
    runFullSuiteAfterFix: async () => failingIssues(input.projectRoot, input.dirName)
  });
  const run = lastRun() ?? await runOnce();
  const error = commandError(run);
  if (error !== null) {
    return rowFrom(run, { outcome: "error", reason: error, protocol_status: result.status });
  }
  switch (result.status) {
    case "fixed":
      return rowFrom(run, {
        outcome: "green",
        reason: result.reason,
        protocol_status: result.status,
        guard_path: result.guard_path
      });
    case "skipped-no-behaviour-change":
      return rowFrom(run, {
        outcome: run.exit_code === 0 ? "green" : "still-failing",
        reason: result.reason,
        protocol_status: result.status
      });
    case "rejected-proof-still-failing":
      return rowFrom(run, {
        outcome: "still-failing",
        reason: result.reason,
        protocol_status: result.status
      });
    default:
      return rowFrom(run, {
        outcome: "held",
        reason: result.reason,
        protocol_status: result.status
      });
  }
}

// src/cli/commands/fix.ts
var PHASES = ["red", "green"];
var OUTCOME_LINE = {
  red: "\u{1F534} red recorded: the proof fails before the fix",
  "not-reproduced": "\u{1F7E1} not reproduced: the proof passed before the fix",
  green: "\u{1F7E2} green recorded: the proof passes after the fix",
  "still-failing": "\u{1F534} still failing: the proof does not pass yet",
  held: "\u{1F7E1} held: the fix broke a check that passed before",
  error: "\u26AA not counted: the proof command did not give a usable result"
};
function timeoutMs(raw) {
  if (raw === void 0) return DEFAULT_PROOF_TIMEOUT_MS;
  const seconds = Number(raw);
  return Number.isFinite(seconds) && seconds > 0 ? Math.round(seconds * 1e3) : null;
}
function createFixCommand() {
  const command = new Command("fix").description(
    "Prove a fix: record the failing test before the fix and the passing test after it"
  );
  command.command("prove").description(
    "Run the proof test and record the result in fix-proof.json; red runs before the fix lands, green after it"
  ).argument("<phase>", `one of: ${PHASES.join(", ")}`).requiredOption("--test-file <path>", "Test file holding the proof test").requiredOption("--test-id <id>", "Name of the proof test, as the runner prints it").requiredOption("--command <cmd>", "Command that runs the proof test").option("--timeout <seconds>", "Stop the proof command after this many seconds (600)").option("--project-root <path>", "Project root", process.cwd()).option("--session <id>", "Session id (defaults to SE_SESSION / CLAUDE_SESSION_ID)").option("--silent", "Suppress the machine-readable summary line", false).action(async (phase, options) => {
    if (!PHASES.includes(phase)) {
      console.error(`unknown phase "${phase}" \u2014 one of: ${PHASES.join(", ")}`);
      process.exitCode = 1;
      return;
    }
    const limit = timeoutMs(options.timeout);
    if (limit === null) {
      console.error(`--timeout must be a positive number of seconds, got "${options.timeout}"`);
      process.exitCode = 1;
      return;
    }
    const root = options.projectRoot;
    const sessionId = resolveSessionId(
      root,
      options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
    );
    const dirName = currentFeature(root, sessionId);
    if (!dirName) {
      console.error("no active feature \u2014 run `paqad-ai stage start planning` first");
      process.exitCode = 1;
      return;
    }
    const row = await proveFix({
      projectRoot: root,
      dirName,
      sessionId,
      phase,
      testFile: options.testFile,
      testId: options.testId,
      command: options.command,
      timeoutMs: limit
    });
    console.log(`**\u25B8 paqad** \xB7 fix proof ${phase}`);
    console.log(`> ${OUTCOME_LINE[row.outcome]}`);
    console.log(`> ${row.reason}`);
    if (row.outcome === "error") process.exitCode = 1;
    if (!options.silent) {
      console.log(
        JSON.stringify({
          recorded: true,
          phase: row.phase,
          outcome: row.outcome,
          exit_code: row.exit_code,
          duration_ms: row.duration_ms
        })
      );
    }
  });
  return command;
}

// src/cli/commands/graph.ts
init_esm_shims();
import { existsSync as existsSync36 } from "fs";
import { join as join47, resolve as resolve11 } from "path";
var DEFAULT_PORT2 = 5372;
var DEPRECATION_LINE = "paqad-ai graph has moved into the dashboard. Opening the dashboard on the Graph view. Run paqad-ai dashboard next time.";
function createGraphCommand() {
  return new Command("graph").description("Deprecated: opens the dashboard on the Graph view").option("--port <n>", "Server port (auto-increments if occupied)", String(DEFAULT_PORT2)).option("--host <host>", "Bind address", "127.0.0.1").option("--no-open", "Do not open the browser automatically").option("--no-watch", "Disable live reload on .paqad/ changes").option("--quiet", "Suppress non-essential stdout", false).option("--project-root <path>", "Project root", process.cwd()).option("--static-dir <path>", "Override the bundled frontend directory").action(async (options) => {
    const projectRoot = resolve11(options.projectRoot);
    const paqadDir = join47(projectRoot, PATHS.AGENCY_DIR);
    if (!existsSync36(paqadDir)) {
      process.stderr.write(
        `error: no .paqad/ directory found at ${projectRoot}. Run \`paqad-ai onboard\` first.
`
      );
      process.exitCode = 2;
      return;
    }
    const manifestPath = join47(projectRoot, PATHS.ONBOARDING_MANIFEST);
    if (!existsSync36(manifestPath)) {
      process.stderr.write(
        `error: onboarding manifest missing at ${manifestPath}. Run \`paqad-ai onboard\` first.
`
      );
      process.exitCode = 2;
      return;
    }
    if (isFrameworkDisabledForRoot(projectRoot)) {
      process.stdout.write(
        "paqad is disabled (vanilla mode); the dashboard will not start. Run `paqad-ai enable` (or unset PAQAD_DISABLED) to use it.\n"
      );
      return;
    }
    const port = Number.parseInt(options.port, 10);
    if (!Number.isFinite(port) || port <= 0 || port > 65535) {
      process.stderr.write(`error: invalid --port value '${options.port}'
`);
      process.exitCode = 2;
      return;
    }
    process.stderr.write(`${DEPRECATION_LINE}
`);
    const staticDir = resolveStaticDir(options.staticDir);
    const server = await startDashboardServer({
      projectRoot,
      host: options.host,
      port,
      staticDir,
      watch: options.watch
    });
    const graphUrl = `${server.url}/#/graph`;
    if (!options.quiet) {
      process.stdout.write(`paqad-ai dashboard listening at ${graphUrl}
`);
    } else {
      process.stdout.write(`${graphUrl}
`);
    }
    const opened = openBrowser({ url: graphUrl, skip: !options.open });
    if (!opened.opened && !options.quiet && opened.reason) {
      process.stdout.write(`(browser not opened: ${opened.reason})
`);
    }
    const shutdown = async (signal) => {
      if (!options.quiet) {
        process.stdout.write(`
Received ${signal}, shutting down\u2026
`);
      }
      try {
        await server.close();
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        process.stderr.write(`error during shutdown: ${message}
`);
        process.exitCode = 1;
        return;
      }
      process.exit(0);
    };
    process.on("SIGINT", () => void shutdown("SIGINT"));
    process.on("SIGTERM", () => void shutdown("SIGTERM"));
  });
}

// src/cli/commands/health.ts
init_esm_shims();

// src/codebase-health/run.ts
init_esm_shims();
import { mkdir as mkdir5, writeFile as writeFile5 } from "fs/promises";
import { dirname as dirname13, join as join51 } from "path";

// src/codebase-health/assemble.ts
init_esm_shims();
import { join as join49 } from "path";

// src/codebase-health/baseline.ts
init_esm_shims();
import { existsSync as existsSync37, readFileSync as readFileSync26 } from "fs";
import { join as join48 } from "path";

// src/codebase-health/shared.ts
init_esm_shims();
import { createHash as createHash5 } from "crypto";
import { mkdir as mkdir4, writeFile as writeFile4 } from "fs/promises";
import { dirname as dirname12 } from "path";
function toHealthTimestamp(date) {
  const pad3 = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad3(date.getMonth() + 1)}-${pad3(date.getDate())}-${pad3(date.getHours())}-${pad3(date.getMinutes())}-${pad3(date.getSeconds())}`;
}
function toHealthReportId(prefix, date) {
  return `${prefix}-${toHealthTimestamp(date)}`;
}
async function writeJsonFile2(target, data) {
  await mkdir4(dirname12(target), { recursive: true });
  await writeFile4(target, `${JSON.stringify(data, null, 2)}
`);
}
function findingFingerprint2(finding) {
  const payload = JSON.stringify({
    title: finding.title,
    category: finding.category,
    tier: finding.tier,
    severity: finding.severity,
    affected_files: [...finding.affected_files].sort(),
    affected_packages: [...finding.affected_packages].sort(),
    evidence: finding.evidence,
    suggestion: finding.suggestion
  });
  return createHash5("sha256").update(payload).digest("hex").slice(0, 8).toUpperCase();
}
function assignHealthFindingIds(findings) {
  const seen = /* @__PURE__ */ new Map();
  return findings.map((finding) => {
    const fingerprint = findingFingerprint2(finding);
    const occurrence = (seen.get(fingerprint) ?? 0) + 1;
    seen.set(fingerprint, occurrence);
    const id = occurrence === 1 ? `HL-${fingerprint}` : `HL-${fingerprint}-${String(occurrence).padStart(2, "0")}`;
    return { ...finding, id };
  });
}
var SEVERITY_RANK3 = {
  high: 0,
  medium: 1,
  low: 2
};
function sortFindings2(findings) {
  return [...findings].sort((a, b) => {
    const bySeverity = SEVERITY_RANK3[a.severity] - SEVERITY_RANK3[b.severity];
    if (bySeverity !== 0) return bySeverity;
    return a.id.localeCompare(b.id);
  });
}

// src/codebase-health/baseline.ts
function baselinePath2(projectRoot) {
  return join48(projectRoot, PATHS.HEALTH_BASELINE);
}
function readBaseline2(projectRoot) {
  const target = baselinePath2(projectRoot);
  if (!existsSync37(target)) return null;
  try {
    const parsed = JSON.parse(readFileSync26(target, "utf8"));
    if (!Array.isArray(parsed.finding_ids)) return null;
    return parsed;
  } catch {
    return null;
  }
}
async function writeBaseline2(projectRoot, findingIds, now) {
  const baseline = {
    schema_version: "1",
    generated_by: "paqad-ai",
    framework_version: VERSION,
    created_at: now.toISOString(),
    finding_ids: [...findingIds].sort()
  };
  await writeJsonFile2(baselinePath2(projectRoot), baseline);
  return baseline;
}
function applyBaselineStatus2(findings, baseline) {
  if (baseline === null) {
    return findings.map((finding) => ({ ...finding, baseline_status: "unknown" }));
  }
  const known = new Set(baseline.finding_ids);
  return findings.map((finding) => ({
    ...finding,
    baseline_status: known.has(finding.id) ? "pre-existing" : "new-since-baseline"
  }));
}

// src/codebase-health/detectors.ts
init_esm_shims();

// src/codebase-health/copy.ts
init_esm_shims();
var HEALTH_REPORT_HEADER = "**Codebase health** \u2014 I scanned this project for code and packages that no longer earn their place. Every finding below carries proof; nothing here is a guess. Findings marked 'needs judgment' are candidates I couldn't prove mechanically \u2014 you decide.";
var HEALTH_WHY_IT_MATTERS = {
  "dead-code": "Unused code still costs you: it confuses readers, slows builds, and can fire by accident \u2014 a US trading firm lost $460M in 45 minutes to code nobody had used since 2003.",
  "unused-dependency": "A package you declare but never import is pure liability: it grows your install, your attack surface, and your audit noise for zero benefit.",
  "vulnerable-dependency": "A dependency with a known advisory is a door left open \u2014 and 78% of the vulnerabilities you carry live in packages you never chose directly.",
  "deprecated-dependency": "A deprecated or end-of-life package stops getting security fixes: today it works, and one day it quietly becomes the weakest link (event-stream, colors, xz-utils all started here).",
  "secret-leak": "A committed secret is compromised the moment it lands in git history \u2014 rotate it, because deleting the line does not un-leak it.",
  duplication: "Copy-paste blocks drift apart over time: you fix the bug in one copy and ship the other, and duplicated code has jumped 81% since AI assistants arrived.",
  "stale-doc": "Docs that no longer match the code mislead the next reader \u2014 93% of developers hit outdated docs and 60% never fix them, so the rot compounds.",
  "ai-slop": "Redundant, low-value AI-generated code passes review more easily than it should, quietly inflating the surface everyone has to maintain."
};

// src/codebase-health/detectors.ts
function reason(category) {
  return HEALTH_WHY_IT_MATTERS[category];
}
function detectUnusedDependencies(index, corroboration = {}) {
  return index.dependencies.filter((dependency) => !dependency.imported).map((dependency) => {
    const corroborated = corroboration.unusedDependencies?.has(dependency.name) ?? false;
    return {
      title: `Unused dependency: ${dependency.name}`,
      description: reason("unused-dependency"),
      category: "unused-dependency",
      severity: "low",
      tier: "deterministic",
      confidence: corroborated ? 0.95 : 0.85,
      evidence: [
        `code-knowledge index: ${dependency.name} (${dependency.ecosystem}) is declared but never imported.`,
        corroborated ? `Corroborated by knip.` : `Source: .paqad/indexes/code-knowledge.json (dependencies[].imported === false).`,
        `Reproduce: paqad-ai index build && paqad-ai index query ${dependency.name}`
      ],
      suggestion: {
        action: "remove",
        detail: `Remove ${dependency.name} from the manifest if nothing imports it, or add an import if it is a runtime-only dependency.`
      },
      affected_files: [],
      affected_packages: [dependency.name],
      requires_network: false,
      baseline_status: "unknown",
      status: "open"
    };
  });
}
function detectDeadCode(index) {
  const findings = [];
  for (const file of index.files) {
    if (!file.orphan) continue;
    findings.push({
      title: `Dead file: ${file.path}`,
      description: reason("dead-code"),
      category: "dead-code",
      severity: "medium",
      tier: "deterministic",
      confidence: 0.85,
      evidence: [
        `code-knowledge index: ${file.path} is imported by 0 files and is not an entry point.`,
        `Source: .paqad/indexes/code-knowledge.json (files[].orphan === true).`,
        `Reproduce: paqad-ai index query ${file.path}`
      ],
      suggestion: {
        action: "remove",
        detail: `Delete ${file.path} if it is truly unreachable, or wire it to an entry point if it should be used.`
      },
      affected_files: [file.path],
      affected_packages: [],
      requires_network: false,
      baseline_status: "unknown",
      status: "open"
    });
  }
  for (const symbol of index.symbols) {
    if (!symbol.exported || symbol.caller_count !== 0 || symbol.orphan === false) continue;
    if (index.files.some((file) => file.path === symbol.file && file.orphan)) continue;
    findings.push({
      title: `Unused export: ${symbol.name} (${symbol.file})`,
      description: reason("dead-code"),
      category: "dead-code",
      severity: "low",
      tier: "deterministic",
      confidence: 0.8,
      evidence: [
        `code-knowledge index: exported ${symbol.kind} ${symbol.name} at ${symbol.file}:${symbol.line} has 0 callers in production code.`,
        `Source: .paqad/indexes/code-knowledge.json (symbols[].caller_count === 0).`,
        `Reproduce: paqad-ai index query ${symbol.name}`
      ],
      suggestion: {
        action: "remove",
        detail: `Remove ${symbol.name} or stop exporting it if it is only used internally.`
      },
      affected_files: [symbol.file],
      affected_packages: [],
      requires_network: false,
      baseline_status: "unknown",
      status: "open"
    });
  }
  return findings;
}
function detectVulnerableDependencies(records) {
  const seen = /* @__PURE__ */ new Set();
  const findings = [];
  for (const record of records) {
    const key = `${record.package_name}@${record.version}:${record.advisory_id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    findings.push({
      title: `Vulnerable dependency: ${record.package_name}@${record.version} (${record.advisory_id})`,
      description: reason("vulnerable-dependency"),
      category: "vulnerable-dependency",
      severity: "high",
      tier: "deterministic",
      confidence: 0.9,
      evidence: [
        `${record.advisory_id}: ${record.summary || record.details}`.trim(),
        `Source: ${record.ecosystem} advisory for ${record.package_name}@${record.version}.`,
        `Reproduce: osv-scanner --lockfile <your-lockfile> (or the native audit for ${record.ecosystem}).`
      ],
      suggestion: {
        action: "update",
        detail: `Upgrade ${record.package_name} past the affected range, or apply the advisory's remediation.`
      },
      affected_files: [],
      affected_packages: [record.package_name],
      requires_network: false,
      baseline_status: "unknown",
      status: "open"
    });
  }
  return findings;
}
function detectDeprecatedDependencies(records) {
  return records.map((record) => ({
    title: `${record.kind === "eol" ? "End-of-life" : "Deprecated"} package: ${record.package}@${record.version}`,
    description: reason("deprecated-dependency"),
    category: "deprecated-dependency",
    severity: "medium",
    tier: "deterministic",
    confidence: 0.9,
    evidence: [
      `${record.ecosystem} registry marks ${record.package}@${record.version} as ${record.kind}: ${record.message}`,
      `Source: package registry metadata (network).`,
      `Reproduce: npm view ${record.package}@${record.version} deprecated`
    ],
    suggestion: {
      action: "update",
      detail: `Migrate off ${record.package} to a maintained alternative, or pin and plan a replacement.`
    },
    affected_files: [],
    affected_packages: [record.package],
    requires_network: true,
    baseline_status: "unknown",
    status: "open"
  }));
}
function detectSecrets(matches) {
  return matches.map((match) => ({
    title: `Possible secret: ${match.rule} at ${match.file}:${match.line}`,
    description: reason("secret-leak"),
    category: "secret-leak",
    severity: "high",
    tier: "deterministic",
    confidence: match.source === "gitleaks" ? 0.85 : 0.6,
    evidence: [
      `${match.source === "gitleaks" ? "gitleaks" : "built-in regex (lower confidence)"}: ${match.rule} matched at ${match.file}:${match.line}.`,
      `Fingerprint: ${match.fingerprint} (the secret value is intentionally not recorded).`,
      `Reproduce: gitleaks detect --source . --report-format json (or inspect ${match.file}:${match.line}).`
    ],
    suggestion: {
      action: "rotate",
      detail: `Rotate the credential now \u2014 deleting the line does not un-leak it \u2014 then remove it from history and load it from an environment variable.`
    },
    affected_files: [match.file],
    affected_packages: [],
    requires_network: false,
    baseline_status: "unknown",
    status: "open"
  }));
}
function detectDuplication(clusters) {
  return clusters.map((cluster) => {
    const locations = cluster.blocks.map((block) => `${block.file}:${block.start_line}-${block.end_line}`).join(", ");
    return {
      title: `Duplicated block (${cluster.lines} lines) across ${cluster.blocks.length} locations`,
      description: reason("duplication"),
      category: "duplication",
      severity: "low",
      tier: "deterministic",
      confidence: cluster.source === "jscpd" ? 0.9 : 0.6,
      evidence: [
        `${cluster.source === "jscpd" ? "jscpd" : "chunk-similarity (lower confidence)"}: ${cluster.lines} duplicated lines at ${locations}.`,
        `Source: ${cluster.source === "jscpd" ? "jscpd JSON report" : ".paqad/vectors/index.json cosine near-duplicates"}.`,
        `Reproduce: npx jscpd ${cluster.blocks.map((block) => block.file).join(" ")}`
      ],
      suggestion: {
        action: "rewrite",
        detail: `Extract the shared logic into one function the duplicates call, so a fix lands once.`
      },
      affected_files: cluster.blocks.map((block) => block.file),
      affected_packages: [],
      requires_network: false,
      baseline_status: "unknown",
      status: "open"
    };
  });
}
function detectStaleDocs(candidates) {
  return candidates.map((candidate) => ({
    title: `Possibly stale doc: ${candidate.doc}`,
    description: reason("stale-doc"),
    category: "stale-doc",
    severity: "low",
    tier: "ai-judged",
    confidence: 0.5,
    evidence: [
      `${candidate.reason}`,
      `References: ${candidate.referenced_sources.join(", ") || "(none detected)"}.`,
      `Reproduce: git log -1 --format=%cI ${candidate.doc}`
    ],
    suggestion: {
      action: "rewrite",
      detail: `Re-read ${candidate.doc} against the current code and update or delete the parts that no longer match.`
    },
    affected_files: [candidate.doc],
    affected_packages: [],
    requires_network: false,
    baseline_status: "unknown",
    status: "open"
  }));
}
function detectAiSlop(clusters, index) {
  const findings = [];
  for (const cluster of clusters) {
    findings.push({
      title: `Slop candidate: repeated block across ${cluster.blocks.length} files`,
      description: reason("ai-slop"),
      category: "ai-slop",
      severity: "low",
      tier: "ai-judged",
      confidence: 0.45,
      evidence: [
        `Duplication cluster of ${cluster.lines} lines is a common shape of low-value generated code.`,
        `Locations: ${cluster.blocks.map((block) => `${block.file}:${block.start_line}`).join(", ")}.`,
        `Reproduce: review the blocks and judge whether they add value or just bulk.`
      ],
      suggestion: {
        action: "rewrite",
        detail: `If these blocks are boilerplate with no real variation, collapse them; otherwise keep and mark reviewed.`
      },
      affected_files: cluster.blocks.map((block) => block.file),
      affected_packages: [],
      requires_network: false,
      baseline_status: "unknown",
      status: "open"
    });
  }
  if (index) {
    for (const symbol of index.symbols) {
      if (!symbol.exported || symbol.caller_count !== 1) continue;
      findings.push({
        title: `Slop candidate: one-caller wrapper ${symbol.name}`,
        description: reason("ai-slop"),
        category: "ai-slop",
        severity: "low",
        tier: "ai-judged",
        confidence: 0.4,
        evidence: [
          `Exported ${symbol.kind} ${symbol.name} at ${symbol.file}:${symbol.line} has exactly one caller \u2014 often a needless indirection.`,
          `Source: .paqad/indexes/code-knowledge.json (symbols[].caller_count === 1).`,
          `Reproduce: paqad-ai index query ${symbol.name}`
        ],
        suggestion: {
          action: "rewrite",
          detail: `If ${symbol.name} only forwards to its single caller, inline it; otherwise keep it.`
        },
        affected_files: [symbol.file],
        affected_packages: [],
        requires_network: false,
        baseline_status: "unknown",
        status: "open"
      });
    }
  }
  return findings;
}

// src/codebase-health/report-builder.ts
init_esm_shims();
var SEVERITY_RANK4 = { high: 0, medium: 1, low: 2 };
function isRetest(finding) {
  return "retest_status" in finding;
}
function nextRemediationPriorities(findings) {
  const ordered = [...findings].sort(
    (a, b) => SEVERITY_RANK4[a.severity] - SEVERITY_RANK4[b.severity]
  );
  if (ordered.length === 0) return ["No findings recorded."];
  return ordered.slice(0, 5).map((finding) => `${finding.id}: ${finding.title}`);
}
function renderFinding(finding) {
  const lines = [`### ${finding.id} \u2014 ${finding.title}`, ""];
  lines.push(`- Severity: ${finding.severity}`);
  lines.push(`- Category: ${finding.category}`);
  lines.push(`- Suggested action: ${finding.suggestion.action} \u2014 ${finding.suggestion.detail}`);
  if (finding.baseline_status !== "unknown") {
    lines.push(`- Baseline: ${finding.baseline_status}`);
  }
  if (finding.tier === "ai-judged") {
    lines.push(`- Confidence: ${finding.confidence.toFixed(2)} (needs your judgment)`);
  }
  if (isRetest(finding)) {
    lines.push(`- Retest: ${finding.retest_status}`);
  }
  lines.push("");
  lines.push(`Why it matters: ${finding.description}`);
  lines.push("");
  lines.push("Proof:");
  for (const item of finding.evidence) {
    lines.push(`- ${item}`);
  }
  lines.push("");
  return lines;
}
function renderSection(title, findings) {
  const lines = [`## ${title}`, ""];
  if (findings.length === 0) {
    lines.push("_None._", "");
    return lines;
  }
  for (const finding of sortFindings2(findings)) {
    lines.push(...renderFinding(finding));
  }
  return lines;
}
function buildHealthMarkdown(report2) {
  const proven = report2.findings.filter((finding) => finding.tier === "deterministic");
  const judged = report2.findings.filter((finding) => finding.tier === "ai-judged");
  const lines = [
    `# ${report2.report_id}`,
    "",
    HEALTH_REPORT_HEADER,
    "",
    `- Workflow: ${report2.workflow}`,
    `- Generated: ${report2.generated_at}`,
    `- Stack: ${report2.stack.primary}`,
    `- Mode: ${report2.offline ? "offline" : "online"}`,
    report2.source_report_id ? `- Retest of: ${report2.source_report_id}` : "",
    "",
    "## Summary",
    "",
    `- Proven findings: ${proven.length}`,
    `- Needs judgment: ${judged.length}`,
    `- New since baseline: ${report2.baseline.new_since_baseline}`,
    `- Pre-existing: ${report2.baseline.pre_existing}`,
    "",
    ...renderSection("Proven", proven),
    ...renderSection("Needs judgment", judged),
    "## Blocked checks",
    ""
  ];
  if (report2.blocked_checks.length === 0) {
    lines.push("_Every check ran._", "");
  } else {
    for (const blocked of report2.blocked_checks) {
      lines.push(`- ${blocked.check}: ${blocked.reason} \u2014 ${blocked.install_hint}`);
    }
    lines.push("");
  }
  lines.push("## Next remediation priorities", "");
  for (const priority of report2.next_remediation_priorities) {
    lines.push(`- ${priority}`);
  }
  lines.push("");
  return `${lines.filter((line) => line !== null).join("\n")}
`;
}

// src/codebase-health/assemble.ts
function collectCandidates2(input) {
  const candidates = [];
  if (input.index) {
    candidates.push(...detectUnusedDependencies(input.index));
    candidates.push(...detectDeadCode(input.index));
  }
  candidates.push(...detectVulnerableDependencies(input.vulnRecords));
  candidates.push(...detectDeprecatedDependencies(input.deprecationRecords));
  candidates.push(...detectSecrets(input.secretMatches));
  candidates.push(...detectDuplication(input.duplicationClusters));
  candidates.push(...detectStaleDocs(input.staleDocCandidates));
  candidates.push(...detectAiSlop(input.duplicationClusters, input.index));
  return candidates;
}
function assembleHealthReport(input) {
  const withIds = assignHealthFindingIds(collectCandidates2(input));
  const findings = sortFindings2(applyBaselineStatus2(withIds, input.baseline));
  const timestamp = toHealthTimestamp(input.now);
  const isRetest2 = input.workflow === "health-retest";
  const base = isRetest2 && input.sourceReportId ? `${stripReportPrefix(input.sourceReportId)}-retest-${timestamp}` : timestamp;
  const reportPath = toPosixPath(join49(PATHS.HEALTH_DIR, `${base}.md`));
  const sidecarPath = toPosixPath(join49(PATHS.HEALTH_DIR, `${base}.json`));
  const newSinceBaseline = findings.filter(
    (finding) => finding.baseline_status === "new-since-baseline"
  ).length;
  const preExisting = findings.filter(
    (finding) => finding.baseline_status === "pre-existing"
  ).length;
  const report2 = {
    schema_version: "1",
    generated_by: "paqad-ai",
    framework_version: VERSION,
    report_id: toHealthReportId(isRetest2 ? "RETEST" : "HEALTH", input.now),
    workflow: input.workflow,
    generated_at: input.now.toISOString(),
    report_path: reportPath,
    sidecar_path: sidecarPath,
    source_report_path: input.sourceReportPath ?? null,
    source_report_id: input.sourceReportId ?? null,
    offline: input.offline,
    stack: input.stack,
    tool_availability: input.availability,
    findings,
    blocked_checks: input.blockedChecks,
    baseline: {
      existed: input.baseline !== null,
      new_since_baseline: newSinceBaseline,
      pre_existing: preExisting
    },
    sources_used: input.sourcesUsed ?? deriveSourcesUsed(input),
    next_remediation_priorities: nextRemediationPriorities(findings),
    raw_evidence_paths: []
  };
  return { report: report2, findings, findingIds: findings.map((finding) => finding.id) };
}
function stripReportPrefix(reportId) {
  return reportId.replace(/^(?:HEALTH|RETEST)-/, "");
}
function deriveSourcesUsed(input) {
  const sources = /* @__PURE__ */ new Set();
  if (input.index) sources.add("code-knowledge index");
  for (const tool of input.availability) {
    if (tool.available) sources.add(tool.tool);
  }
  if (input.secretMatches.some((match) => match.source === "builtin-regex")) {
    sources.add("built-in regex secret scan");
  }
  return [...sources].sort();
}

// src/codebase-health/gatherer.ts
init_esm_shims();
var import_fast_glob4 = __toESM(require_out(), 1);
import { readFileSync as readFileSync27 } from "fs";
import { join as join50 } from "path";

// src/codebase-health/tools.ts
init_esm_shims();
var HEALTH_TOOLS = [
  {
    tool: "osv-scanner",
    used_for: ["vulnerable-dependency"],
    requires_network: false,
    install_hint: "Install osv-scanner (https://github.com/google/osv-scanner) for offline vuln matching."
  },
  {
    tool: "gitleaks",
    used_for: ["secret-leak"],
    requires_network: false,
    install_hint: "Install gitleaks (https://github.com/gitleaks/gitleaks) to scan git history for secrets."
  },
  {
    tool: "jscpd",
    used_for: ["duplication"],
    requires_network: false,
    install_hint: "Install jscpd (`npm i -g jscpd`) for cross-language copy-paste detection."
  },
  {
    tool: "knip",
    used_for: ["dead-code", "unused-dependency"],
    requires_network: false,
    install_hint: "Install knip (`npm i -g knip`) to corroborate dead code and unused deps in JS/TS."
  }
];
function healthToolSpec(tool) {
  return HEALTH_TOOLS.find((spec) => spec.tool === tool);
}
function resolveToolAvailability(tools = HEALTH_TOOLS) {
  const absent = new Set(missingBinaries(tools.map((spec) => spec.tool)));
  return tools.map((spec) => ({
    tool: spec.tool,
    available: !absent.has(spec.tool),
    used_for: spec.used_for
  }));
}
function isToolAvailable(availability, tool) {
  return availability.some((status) => status.tool === tool && status.available);
}

// src/codebase-health/gatherer.ts
function createHealthGatherer(projectRoot, shell = createDeliveryShell(projectRoot)) {
  const availability = resolveToolAvailability();
  let packagesCache = null;
  async function packages() {
    if (packagesCache) return packagesCache;
    const snapshot = await new StackIntrospector().snapshot(projectRoot, { persist: false });
    packagesCache = snapshot.packages;
    return packagesCache;
  }
  return {
    availability: () => availability,
    async stack() {
      const snapshot = await new StackIntrospector().snapshot(projectRoot, { persist: false });
      packagesCache = snapshot.packages;
      return {
        primary: snapshot.profile.frameworks[0] ?? snapshot.profile.toolchains[0]?.ecosystem ?? "unknown",
        traits: snapshot.profile.traits,
        toolchains: snapshot.toolchains.map((toolchain) => toolchain.ecosystem)
      };
    },
    loadIndex: () => readCodeKnowledgeIndex(projectRoot),
    async vulnerabilities(offline) {
      if (isToolAvailable(availability, "osv-scanner")) {
        const result = await shell.run("osv-scanner", ["--format", "json", "--recursive", "."]);
        return { records: parseOsvScannerJson(result.stdout), blocked: [] };
      }
      if (offline) {
        return {
          records: [],
          blocked: [
            blockedFor(
              "vulnerable-dependency",
              "osv-scanner is not on PATH and the run is offline"
            )
          ]
        };
      }
      const audit = await shell.run("npm", ["audit", "--json"]);
      const nativeRecords = parseNpmAuditJson(audit.stdout);
      if (nativeRecords.length > 0) return { records: nativeRecords, blocked: [] };
      return { records: await queryOsv(await packages()), blocked: [] };
    },
    async secrets() {
      if (isToolAvailable(availability, "gitleaks")) {
        const result = await shell.run("gitleaks", [
          "detect",
          "--no-banner",
          "--report-format",
          "json",
          "--report-path",
          "/dev/stdout"
        ]);
        return { matches: parseGitleaksJson(result.stdout) };
      }
      return { matches: builtinSecretScan(await trackedFileContents(projectRoot, shell)) };
    },
    async duplication() {
      if (!isToolAvailable(availability, "jscpd")) {
        return { clusters: [], blocked: [blockedFor("duplication", "jscpd is not on PATH")] };
      }
      const outDir = join50(PATHS.HEALTH_RUNS_DIR, "jscpd");
      await shell.run("jscpd", ["--silent", "--reporters", "json", "--output", outDir, "."]);
      const clusters = readJscpdReport(join50(projectRoot, outDir, "jscpd-report.json"));
      return { clusters, blocked: [] };
    },
    async deprecations(offline) {
      if (offline) {
        return {
          records: [],
          blocked: [
            blockedFor(
              "deprecated-dependency",
              "deprecation checks need the network; the run is offline"
            )
          ]
        };
      }
      return {
        records: [],
        blocked: [blockedFor("deprecated-dependency", "no deprecation source configured")]
      };
    },
    async staleDocs() {
      return gatherStaleDocCandidates(await docTimestampInputs(projectRoot, shell));
    }
  };
}
function blockedFor(category, reason2) {
  const spec = HEALTH_TOOLS.find((tool) => tool.used_for.includes(category));
  const hint = category === "deprecated-dependency" ? "Run online (drop --offline) to check the registry for deprecations." : spec?.install_hint ?? healthToolSpec(category)?.install_hint ?? "No fallback available.";
  return { check: category, reason: reason2, install_hint: hint };
}
function readJscpdReport(path2) {
  try {
    return parseJscpdJson(readFileSync27(path2, "utf8"));
  } catch {
    return [];
  }
}
async function trackedFileContents(projectRoot, shell) {
  const listed = await shell.run("git", ["ls-files"]);
  const files = listed.stdout.split("\n").filter(Boolean).slice(0, 5e3);
  const out = [];
  for (const file of files) {
    try {
      out.push({ path: toPosixPath(file), content: readFileSync27(join50(projectRoot, file), "utf8") });
    } catch {
    }
  }
  return out;
}
async function docTimestampInputs(projectRoot, shell) {
  const docs = await (0, import_fast_glob4.default)("docs/**/*.md", { cwd: projectRoot, dot: false });
  const inputs = [];
  for (const doc of docs) {
    const docCommittedAt = await lastCommitEpoch(shell, doc);
    if (docCommittedAt === null) continue;
    const content = safeRead(join50(projectRoot, doc));
    const references = extractReferencedSources(content, projectRoot);
    const withTimes = await Promise.all(
      references.map(async (source) => ({
        source,
        committed_at: await lastCommitEpoch(shell, source)
      }))
    );
    inputs.push({ doc: toPosixPath(doc), doc_committed_at: docCommittedAt, references: withTimes });
  }
  return inputs;
}
function extractReferencedSources(content, projectRoot) {
  const found = /* @__PURE__ */ new Set();
  const pattern = /(?:src|runtime|scripts)\/[A-Za-z0-9_./-]+\.[a-z]{2,4}/g;
  let match;
  while ((match = pattern.exec(content)) !== null) {
    const rel = match[0];
    try {
      readFileSync27(join50(projectRoot, rel), "utf8");
      found.add(rel);
    } catch {
    }
  }
  return [...found].slice(0, 20);
}
async function lastCommitEpoch(shell, path2) {
  const result = await shell.run("git", ["log", "-1", "--format=%ct", "--", path2]);
  const epoch = Number.parseInt(result.stdout.trim(), 10);
  return Number.isFinite(epoch) && epoch > 0 ? epoch : null;
}
function safeRead(path2) {
  try {
    return readFileSync27(path2, "utf8");
  } catch {
    return "";
  }
}

// src/codebase-health/run.ts
async function runHealthAudit(options) {
  const { projectRoot } = options;
  const offline = options.offline ?? false;
  const workflow = options.workflow ?? "codebase-health";
  const now = options.now ?? (() => /* @__PURE__ */ new Date());
  const gatherer = options.gatherer ?? createHealthGatherer(projectRoot);
  const index = gatherer.loadIndex();
  const blockedChecks = [];
  if (!index) {
    blockedChecks.push({
      check: "dead-code, unused-dependency",
      reason: "the code-knowledge index has not been built",
      install_hint: "Run `paqad-ai index build` first."
    });
  }
  const [stack, vulns, secrets, duplication, deprecations, staleDocCandidates] = await Promise.all([
    gatherer.stack(),
    gatherer.vulnerabilities(offline),
    gatherer.secrets(),
    gatherer.duplication(),
    gatherer.deprecations(offline),
    gatherer.staleDocs()
  ]);
  blockedChecks.push(...vulns.blocked, ...duplication.blocked, ...deprecations.blocked);
  const baseline = readBaseline2(projectRoot);
  const { report: report2, findingIds } = assembleHealthReport({
    workflow,
    now: now(),
    offline,
    stack,
    availability: gatherer.availability(),
    index,
    vulnRecords: vulns.records,
    secretMatches: secrets.matches,
    duplicationClusters: duplication.clusters,
    deprecationRecords: deprecations.records,
    staleDocCandidates,
    blockedChecks,
    baseline,
    sourceReportPath: options.sourceReportPath ?? null,
    sourceReportId: options.sourceReportId ?? null
  });
  await writeJsonFile2(join51(projectRoot, report2.sidecar_path), report2);
  await writeMarkdown(join51(projectRoot, report2.report_path), buildHealthMarkdown(report2));
  await writeJsonFile2(
    join51(projectRoot, PATHS.HEALTH_RUNS_DIR, report2.report_id, "finding-index.json"),
    { report_id: report2.report_id, findings: report2.findings }
  );
  let baselineCreated = false;
  if (baseline === null) {
    await writeBaseline2(projectRoot, findingIds, now());
    baselineCreated = true;
  }
  recordHealthRun(projectRoot, {
    report_id: report2.report_id,
    workflow: report2.workflow,
    offline,
    finding_count: report2.findings.length,
    blocked_count: report2.blocked_checks.length,
    new_since_baseline: report2.baseline.new_since_baseline,
    pre_existing: report2.baseline.pre_existing
  });
  return {
    report_id: report2.report_id,
    report_path: report2.report_path,
    sidecar_path: report2.sidecar_path,
    finding_count: report2.findings.length,
    blocked_checks: report2.blocked_checks,
    baseline_created: baselineCreated,
    exit_code: report2.findings.length > 0 ? 1 : 0
  };
}
async function writeMarkdown(target, markdown) {
  await mkdir5(dirname13(target), { recursive: true });
  await writeFile5(target, markdown);
}

// src/codebase-health/retest-run.ts
init_esm_shims();
import { join as join53 } from "path";
import { mkdir as mkdir6, writeFile as writeFile6 } from "fs/promises";
import { dirname as dirname14 } from "path";

// src/codebase-health/retest.ts
init_esm_shims();
import { join as join52 } from "path";
function buildHealthRetestFindings(sourceFindings, currentFindings, offline) {
  const currentIds = new Set(currentFindings.map((finding) => finding.id));
  return sourceFindings.map((finding) => {
    const retestStatus = evaluateRetestStatus(finding, currentIds, offline);
    return {
      ...finding,
      status: retestStatus,
      retest_status: retestStatus
    };
  });
}
function evaluateRetestStatus(finding, currentIds, offline) {
  if (finding.requires_network && offline) {
    return "needs-manual-verification";
  }
  return currentIds.has(finding.id) ? "still-open" : "fixed";
}
function buildRetestReportIndex(input) {
  const timestamp = toHealthTimestamp(input.now);
  const origTimestamp = input.source.report_id.replace(/^(?:HEALTH|RETEST)-/, "");
  const base = `${origTimestamp}-retest-${timestamp}`;
  const findings = sortFindings2(input.retestFindings);
  return {
    schema_version: "1",
    generated_by: "paqad-ai",
    framework_version: VERSION,
    report_id: toHealthReportId("RETEST", input.now),
    workflow: "health-retest",
    generated_at: input.now.toISOString(),
    report_path: toPosixPath(join52(PATHS.HEALTH_DIR, `${base}.md`)),
    sidecar_path: toPosixPath(join52(PATHS.HEALTH_DIR, `${base}.json`)),
    source_report_path: input.source.sidecar_path,
    source_report_id: input.source.report_id,
    offline: input.offline,
    stack: input.source.stack,
    tool_availability: input.source.tool_availability,
    findings,
    blocked_checks: input.source.blocked_checks,
    baseline: input.source.baseline,
    sources_used: input.source.sources_used,
    next_remediation_priorities: nextRemediationPriorities(findings),
    raw_evidence_paths: []
  };
}

// src/codebase-health/retest-run.ts
async function runHealthRetest(options) {
  const { projectRoot } = options;
  const offline = options.offline ?? false;
  const now = options.now ?? (() => /* @__PURE__ */ new Date());
  const gatherer = options.gatherer ?? createHealthGatherer(projectRoot);
  const sidecarPath = options.sidecar ? join53(projectRoot, options.sidecar) : findLatestSidecar(projectRoot);
  if (!sidecarPath) {
    return { ok: false, reason: "no prior health report found \u2014 run `paqad-ai health run` first" };
  }
  const source = readHealthSidecar(sidecarPath);
  if (!source) {
    return { ok: false, reason: `could not read a valid health sidecar at ${sidecarPath}` };
  }
  const current = await gatherCurrentFindings(projectRoot, gatherer, offline, now);
  const retestFindings = buildHealthRetestFindings(source.findings, current.findings, offline);
  const report2 = buildRetestReportIndex({ now: now(), offline, source, retestFindings });
  await writeJsonFile2(join53(projectRoot, report2.sidecar_path), report2);
  await writeMarkdown2(join53(projectRoot, report2.report_path), buildHealthMarkdown(report2));
  const count = (status) => retestFindings.filter((finding) => finding.retest_status === status).length;
  return {
    ok: true,
    report_id: report2.report_id,
    report_path: report2.report_path,
    sidecar_path: report2.sidecar_path,
    fixed: count("fixed"),
    still_open: count("still-open"),
    needs_manual_verification: count("needs-manual-verification"),
    exit_code: count("still-open") > 0 ? 1 : 0
  };
}
async function gatherCurrentFindings(projectRoot, gatherer, offline, now) {
  const [stack, vulns, secrets, duplication, deprecations, staleDocs] = await Promise.all([
    gatherer.stack(),
    gatherer.vulnerabilities(offline),
    gatherer.secrets(),
    gatherer.duplication(),
    gatherer.deprecations(offline),
    gatherer.staleDocs()
  ]);
  const { report: report2 } = assembleHealthReport({
    workflow: "codebase-health",
    now: now(),
    offline,
    stack,
    availability: gatherer.availability(),
    index: gatherer.loadIndex(),
    vulnRecords: vulns.records,
    secretMatches: secrets.matches,
    duplicationClusters: duplication.clusters,
    deprecationRecords: deprecations.records,
    staleDocCandidates: staleDocs,
    blockedChecks: [],
    baseline: readBaseline2(projectRoot)
  });
  return { findings: report2.findings };
}
async function writeMarkdown2(target, markdown) {
  await mkdir6(dirname14(target), { recursive: true });
  await writeFile6(target, markdown);
}

// src/cli/commands/health.ts
function createHealthCommand() {
  const command = new Command("health").description(
    "Audit the project for dead code, unused/risky packages, secrets, stale docs, and AI slop"
  );
  command.command("run").description("Scan the project and write a health report with proof per finding").option("--project-root <path>", "Project root", process.cwd()).option("--offline", "Skip checks that need the network and say so in the report", false).option("--quiet", "Suppress the machine-readable summary line", false).action(async (options) => {
    try {
      const result = await runHealthAudit({
        projectRoot: options.projectRoot,
        offline: options.offline
      });
      if (result.finding_count === 0) {
        console.log("**\u25B8 paqad** \xB7 codebase health \u2014 nothing to clean up. Safe to merge.");
      } else {
        console.log(
          `**\u25B8 paqad** \xB7 codebase health \u2014 found ${result.finding_count} thing(s) worth a look. Needs your attention.`
        );
      }
      console.log(`> Report: ${result.report_path}`);
      for (const blocked of result.blocked_checks) {
        console.log(`> \u26AA ${blocked.check} skipped \u2014 ${blocked.reason}`);
      }
      if (result.baseline_created) {
        console.log("> Baseline recorded \u2014 future runs will flag only what is new.");
      }
      process.exitCode = result.exit_code;
      if (!options.quiet) {
        console.log(
          JSON.stringify({
            report_id: result.report_id,
            report_path: result.report_path,
            sidecar_path: result.sidecar_path,
            findings: result.finding_count,
            blocked_checks: result.blocked_checks.length,
            baseline_created: result.baseline_created
          })
        );
      }
    } catch (error) {
      console.error(`**\u25B8 paqad** \xB7 health run failed: ${error.message}`);
      process.exitCode = 2;
    }
  });
  command.command("retest").description("Re-run the evidence and reclassify each prior finding by its stable id").option("--project-root <path>", "Project root", process.cwd()).option("--offline", "Skip checks that need the network", false).option("--sidecar <path>", "A specific source sidecar (defaults to the newest report)").option("--quiet", "Suppress the machine-readable summary line", false).action(async (options) => {
    try {
      const result = await runHealthRetest({
        projectRoot: options.projectRoot,
        offline: options.offline,
        sidecar: options.sidecar ?? null
      });
      if (!result.ok) {
        console.error(`**\u25B8 paqad** \xB7 ${result.reason}`);
        process.exitCode = 2;
        return;
      }
      console.log(
        `**\u25B8 paqad** \xB7 health retest \u2014 ${result.fixed} fixed, ${result.still_open} still open, ${result.needs_manual_verification} need a manual check.`
      );
      console.log(`> Report: ${result.report_path}`);
      process.exitCode = result.exit_code;
      if (!options.quiet) {
        console.log(
          JSON.stringify({
            report_id: result.report_id,
            report_path: result.report_path,
            sidecar_path: result.sidecar_path,
            fixed: result.fixed,
            still_open: result.still_open,
            needs_manual_verification: result.needs_manual_verification
          })
        );
      }
    } catch (error) {
      console.error(`**\u25B8 paqad** \xB7 health retest failed: ${error.message}`);
      process.exitCode = 2;
    }
  });
  return command;
}

// src/cli/commands/hook.ts
init_esm_shims();
import { spawnSync } from "child_process";
import { existsSync as existsSync38 } from "fs";
import { join as join54 } from "path";
import { pathToFileURL as pathToFileURL2 } from "url";
var MANAGED_HOOK_NAMES = ["capability-gate", "decision-pause-gate"];
var MANAGED_INSTALL_FIX = "paqad-ai must be installed globally on this machine; ask IT to install it.";
var DEFAULT_TIMEOUT_MS = 25e3;
var BLOCK_EXIT = 2;
function failure(message) {
  return {
    exitCode: BLOCK_EXIT,
    stdout: Buffer.alloc(0),
    stderr: Buffer.from(`${message}
`),
    spawned: false
  };
}
function packagedHookScript(name, runtimeRoot) {
  if (!MANAGED_HOOK_NAMES.includes(name)) return null;
  const spec = PAQAD_LIVE_HOOKS.find((entry) => entry.hookFile === `${name}.mjs`);
  return spec ? join54(runtimeRoot, "hooks", spec.hookFile) : null;
}
async function loadRuntimeHookLib(runtimeRoot) {
  const libPath = join54(runtimeRoot, "hooks", "lib", "paqad-disabled.mjs");
  return await import(pathToFileURL2(libPath).href);
}
function errorText(error) {
  if (error && typeof error === "object" && "code" in error && typeof error.code === "string") {
    return error.code;
  }
  return error instanceof Error ? error.message : String(error);
}
async function runPaqadHook(request) {
  const { name, args, input } = request;
  const env = request.env ?? process.env;
  if (!MANAGED_HOOK_NAMES.includes(name)) {
    return failure(`unknown paqad hook ${name}`);
  }
  let runtimeRoot;
  let lib;
  try {
    runtimeRoot = request.runtimeRoot ?? getRuntimeRoot();
    lib = await loadRuntimeHookLib(runtimeRoot);
  } catch (error) {
    return failure(
      `[paqad] hook ${name} could not load the paqad runtime (${errorText(error)}). ${MANAGED_INSTALL_FIX}`
    );
  }
  const payload = lib.parseHookPayload(input);
  if (!payload) {
    return failure(
      `[paqad] hook ${name} received an unreadable hook payload, so the edit is held.`
    );
  }
  const cwd = typeof payload.cwd === "string" ? payload.cwd.trim() : "";
  if (cwd === "") {
    return failure(
      `[paqad] hook ${name} received a hook payload with no cwd, so the edit is held.`
    );
  }
  if (lib.findProjectRootFromCwd(cwd) === void 0) {
    return { exitCode: 0, stdout: Buffer.alloc(0), stderr: Buffer.alloc(0), spawned: false };
  }
  const script = packagedHookScript(name, runtimeRoot);
  if (!script || !existsSync38(script)) {
    return failure(
      `[paqad] hook ${name} is missing from this paqad install. ${MANAGED_INSTALL_FIX}`
    );
  }
  const childEnv = request.managed ? { ...env, PAQAD_MANAGED: "1" } : { ...env };
  const result = spawnSync(process.execPath, [script, ...args], {
    input,
    env: childEnv,
    timeout: request.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    maxBuffer: 64 * 1024 * 1024
  });
  if (result.error || result.status === null) {
    const kind = result.error ? errorText(result.error) : `signal ${String(result.signal)}`;
    return failure(`[paqad] hook ${name} did not finish (${kind}). ${MANAGED_INSTALL_FIX}`);
  }
  return { exitCode: result.status, stdout: result.stdout, stderr: result.stderr, spawned: true };
}
async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}
function createHookCommand() {
  return new Command("hook").description(
    "Run a packaged paqad edit gate (capability-gate, decision-pause-gate) for managed settings"
  ).argument("<name>", `one of: ${MANAGED_HOOK_NAMES.join(", ")}`).argument("[args...]", "arguments passed to the hook script").option("--managed", "run as an organization-managed gate (sets PAQAD_MANAGED=1)").action(async (name, args, options) => {
    const input = MANAGED_HOOK_NAMES.includes(name) ? await readStdin() : "";
    const result = await runPaqadHook({ name, args, managed: options.managed === true, input });
    if (result.stdout.length > 0) process.stdout.write(result.stdout);
    if (result.stderr.length > 0) process.stderr.write(result.stderr);
    process.exitCode = result.exitCode;
  });
}

// src/cli/commands/index-cmd.ts
init_esm_shims();

// src/code-knowledge/module-map-evidence.ts
init_esm_shims();
var import_yaml9 = __toESM(require_dist(), 1);
import { readFileSync as readFileSync28, writeFileSync as writeFileSync10 } from "fs";
import { join as join55 } from "path";
var NOT_WRITTEN = { written: false, modulesUpdated: 0 };
function symbolNamesBySlug(index) {
  const bySlug = /* @__PURE__ */ new Map();
  for (const symbol of index.symbols) {
    if (symbol.module_slug === null) continue;
    const set = bySlug.get(symbol.module_slug) ?? /* @__PURE__ */ new Set();
    set.add(symbol.name);
    bySlug.set(symbol.module_slug, set);
  }
  const sorted = /* @__PURE__ */ new Map();
  for (const [slug, names] of bySlug) {
    sorted.set(slug, [...names].sort());
  }
  return sorted;
}
function writeModuleMapEvidence(projectRoot, index) {
  const mapPath = join55(projectRoot, PATHS.MODULE_MAP);
  let doc;
  try {
    doc = import_yaml9.default.parseDocument(readFileSync28(mapPath, "utf8"));
  } catch {
    return NOT_WRITTEN;
  }
  const modules = doc.get("modules");
  if (!import_yaml9.default.isSeq(modules)) return NOT_WRITTEN;
  const bySlug = symbolNamesBySlug(index);
  let modulesUpdated = 0;
  for (const item of modules.items) {
    if (!import_yaml9.default.isMap(item)) continue;
    const slug = item.get("slug");
    if (typeof slug !== "string") continue;
    const names = bySlug.get(slug);
    if (names === void 0 || names.length === 0) continue;
    const symbolsNode = doc.createNode(names);
    const evidence = item.get("evidence");
    if (import_yaml9.default.isMap(evidence)) {
      evidence.set("symbols", symbolsNode);
    } else {
      item.set("evidence", doc.createNode({ symbols: names }));
    }
    modulesUpdated += 1;
  }
  if (modulesUpdated === 0) return NOT_WRITTEN;
  writeFileSync10(mapPath, doc.toString({ flowCollectionPadding: false, lineWidth: 0 }), "utf8");
  return { written: true, modulesUpdated };
}

// src/code-knowledge/reuse-catalog.ts
init_esm_shims();
import { mkdirSync as mkdirSync10, writeFileSync as writeFileSync11 } from "fs";
import { dirname as dirname15, join as join56 } from "path";
var REUSE_CATALOG_TOP_N = 15;
var GENERATED_HEADER = "<!-- Generated by `paqad-ai index build`. Do not edit by hand. -->";
function cell(text) {
  return text.replace(/\|/g, "/").replace(/\s+/g, " ").trim();
}
function moduleHeading(slug) {
  return slug ?? "(unattributed)";
}
function tableFor(symbols) {
  const rows = symbols.slice().sort((a, b) => b.caller_count - a.caller_count || a.name.localeCompare(b.name)).slice(0, REUSE_CATALOG_TOP_N).map(
    (symbol) => `| ${cell(symbol.name)} | \`${cell(symbol.signature)}\` | ${cell(symbol.file)} | ${symbol.caller_count} |`
  );
  return ["| Symbol | Signature | File | Callers |", "| --- | --- | --- | --- |", ...rows].join(
    "\n"
  );
}
function generateReuseCatalog(index) {
  const bySlug = /* @__PURE__ */ new Map();
  for (const symbol of index.symbols) {
    const key = moduleHeading(symbol.module_slug);
    const list2 = bySlug.get(key) ?? [];
    list2.push(symbol);
    bySlug.set(key, list2);
  }
  const sections = [...bySlug.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([slug, symbols]) => `## ${slug}

${tableFor(symbols)}`);
  const intro = "Exported symbols across the codebase, most-reused first per module. Consult this before adding a new helper \u2014 the surface you need may already exist.";
  return [GENERATED_HEADER, "", "# Reuse Catalog", "", intro, "", ...sections, ""].join("\n");
}
function writeReuseCatalog(projectRoot, index) {
  const target = join56(projectRoot, PATHS.REGISTRIES_DIR, "reuse-catalog.md");
  mkdirSync10(dirname15(target), { recursive: true });
  writeFileSync11(target, generateReuseCatalog(index), "utf8");
  return target;
}

// src/framework-api/builder.ts
init_esm_shims();
import { join as join62 } from "path";

// src/framework-api/adapters/registry.ts
init_esm_shims();

// src/framework-api/adapters/jvm.ts
init_esm_shims();
import { createHash as createHash6 } from "crypto";
import { existsSync as existsSync39, readFileSync as readFileSync29, readdirSync as readdirSync11, statSync as statSync5 } from "fs";
import { homedir as homedir2 } from "os";
import { join as join57 } from "path";

// src/framework-api/adapters/class-file.ts
init_esm_shims();
var CLASS_FILE_MAGIC = 3405691582;
var DEPRECATED_ANNOTATION = "Ljava/lang/Deprecated;";
var FIXED_WIDTH_TAGS = {
  3: 4,
  4: 4,
  5: 8,
  6: 8,
  7: 2,
  8: 2,
  9: 4,
  10: 4,
  11: 4,
  12: 4,
  15: 3,
  16: 2,
  17: 4,
  18: 4,
  19: 2,
  20: 2
};
function u1(cursor) {
  const value = cursor.buffer.readUInt8(cursor.at);
  cursor.at += 1;
  return value;
}
function u2(cursor) {
  const value = cursor.buffer.readUInt16BE(cursor.at);
  cursor.at += 2;
  return value;
}
function u4(cursor) {
  const value = cursor.buffer.readUInt32BE(cursor.at);
  cursor.at += 4;
  return value;
}
function readConstantPool(cursor) {
  const count = u2(cursor);
  const pool = [{ kind: "other" }];
  for (let index = 1; index < count; index += 1) {
    const tag = u1(cursor);
    if (tag === 1) {
      const length = u2(cursor);
      pool.push({
        kind: "utf8",
        value: cursor.buffer.toString("utf8", cursor.at, cursor.at + length)
      });
      cursor.at += length;
      continue;
    }
    const width = FIXED_WIDTH_TAGS[tag];
    if (width === void 0) {
      return null;
    }
    if (tag === 3) {
      pool.push({ kind: "integer", value: cursor.buffer.readInt32BE(cursor.at) });
    } else if (tag === 7 || tag === 8) {
      pool.push({ kind: "index", value: cursor.buffer.readUInt16BE(cursor.at) });
    } else {
      pool.push({ kind: "other" });
    }
    cursor.at += width;
    if (tag === 5 || tag === 6) {
      pool.push({ kind: "other" });
      index += 1;
    }
  }
  return pool;
}
function utf8(pool, index) {
  const entry = pool[index];
  return entry !== void 0 && entry.kind === "utf8" ? entry.value : null;
}
function skipElementValue(cursor) {
  const tag = String.fromCharCode(u1(cursor));
  if (tag === "[") {
    const count = u2(cursor);
    for (let i = 0; i < count; i += 1) {
      skipElementValue(cursor);
    }
    return;
  }
  if (tag === "@") {
    skipAnnotation(cursor);
    return;
  }
  cursor.at += tag === "e" ? 4 : 2;
}
function skipAnnotation(cursor) {
  cursor.at += 2;
  const pairs = u2(cursor);
  for (let i = 0; i < pairs; i += 1) {
    cursor.at += 2;
    skipElementValue(cursor);
  }
}
function readDeprecatedAnnotation(buffer, start, length, pool) {
  const cursor = { buffer, at: start };
  const end = start + length;
  const count = u2(cursor);
  for (let i = 0; i < count && cursor.at < end; i += 1) {
    const typeIndex = u2(cursor);
    const pairs = u2(cursor);
    const isDeprecated = utf8(pool, typeIndex) === DEPRECATED_ANNOTATION;
    let since = null;
    let forRemoval = false;
    for (let pair = 0; pair < pairs; pair += 1) {
      const nameIndex = u2(cursor);
      const name = utf8(pool, nameIndex);
      const valueStart = cursor.at;
      skipElementValue(cursor);
      if (!isDeprecated) {
        continue;
      }
      const tag = String.fromCharCode(buffer.readUInt8(valueStart));
      const constant = pool[buffer.readUInt16BE(valueStart + 1)];
      if (name === "since" && tag === "s" && constant?.kind === "utf8") {
        since = constant.value;
      }
      if (name === "forRemoval" && tag === "Z" && constant?.kind === "integer") {
        forRemoval = constant.value !== 0;
      }
    }
    if (isDeprecated) {
      return { since, for_removal: forRemoval };
    }
  }
  return null;
}
function readAttributes(cursor, pool) {
  const count = u2(cursor);
  let verdict = { deprecated: false, since: null, for_removal: false };
  for (let i = 0; i < count; i += 1) {
    const name = utf8(pool, u2(cursor));
    const length = u4(cursor);
    const start = cursor.at;
    if (name === "Deprecated") {
      verdict = { ...verdict, deprecated: true };
    } else if (name === "RuntimeVisibleAnnotations") {
      const annotation = readDeprecatedAnnotation(cursor.buffer, start, length, pool);
      if (annotation !== null) {
        verdict = {
          deprecated: true,
          since: annotation.since,
          for_removal: annotation.for_removal
        };
      }
    }
    cursor.at = start + length;
  }
  return verdict;
}
function readMembers(cursor, pool) {
  const count = u2(cursor);
  const members = [];
  for (let i = 0; i < count; i += 1) {
    cursor.at += 2;
    const name = utf8(pool, u2(cursor));
    cursor.at += 2;
    const deprecation = readAttributes(cursor, pool);
    if (name !== null) {
      members.push({ name, ...deprecation });
    }
  }
  return members;
}
function parseClassFile(buffer) {
  try {
    const cursor = { buffer, at: 0 };
    if (u4(cursor) !== CLASS_FILE_MAGIC) {
      return null;
    }
    cursor.at += 4;
    const pool = readConstantPool(cursor);
    if (pool === null) {
      return null;
    }
    cursor.at += 2;
    const thisClass = pool[u2(cursor)];
    cursor.at += 2;
    const interfaces = u2(cursor);
    cursor.at += 2 * interfaces;
    const name = thisClass?.kind === "index" ? utf8(pool, thisClass.value) : null;
    if (name === null) {
      return null;
    }
    const fields = readMembers(cursor, pool);
    const methods = readMembers(cursor, pool);
    const classDeprecation = readAttributes(cursor, pool);
    return { name, ...classDeprecation, members: [...fields, ...methods] };
  } catch {
    return null;
  }
}

// src/framework-api/adapters/jar.ts
init_esm_shims();
import { inflateRawSync } from "zlib";
var END_OF_CENTRAL_DIRECTORY = 101010256;
var ZIP64_END_OF_CENTRAL_DIRECTORY_LOCATOR = 117853008;
var CENTRAL_FILE_HEADER = 33639248;
var LOCAL_FILE_HEADER = 67324752;
var STORED = 0;
var DEFLATED = 8;
function readZipDirectory(buffer) {
  const start = findEndRecord(buffer);
  if (start === null) {
    return null;
  }
  if (start >= 20 && buffer.readUInt32LE(start - 20) === ZIP64_END_OF_CENTRAL_DIRECTORY_LOCATOR) {
    return null;
  }
  const count = buffer.readUInt16LE(start + 10);
  let offset = buffer.readUInt32LE(start + 16);
  const entries = [];
  for (let i = 0; i < count; i += 1) {
    if (offset + 46 > buffer.length || buffer.readUInt32LE(offset) !== CENTRAL_FILE_HEADER) {
      return null;
    }
    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    entries.push({
      name: buffer.toString("utf8", offset + 46, offset + 46 + nameLength),
      compressionMethod: buffer.readUInt16LE(offset + 10),
      compressedSize: buffer.readUInt32LE(offset + 20),
      uncompressedSize: buffer.readUInt32LE(offset + 24),
      localHeaderOffset: buffer.readUInt32LE(offset + 42)
    });
    offset += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}
function findEndRecord(buffer) {
  const earliest = Math.max(0, buffer.length - 65535 - 22);
  for (let i = buffer.length - 22; i >= earliest; i -= 1) {
    if (buffer.readUInt32LE(i) === END_OF_CENTRAL_DIRECTORY) {
      return i;
    }
  }
  return null;
}
function readZipEntry(buffer, entry) {
  const header = entry.localHeaderOffset;
  if (header + 30 > buffer.length || buffer.readUInt32LE(header) !== LOCAL_FILE_HEADER) {
    return null;
  }
  const nameLength = buffer.readUInt16LE(header + 26);
  const extraLength = buffer.readUInt16LE(header + 28);
  const dataStart = header + 30 + nameLength + extraLength;
  const data = buffer.subarray(dataStart, dataStart + entry.compressedSize);
  if (entry.compressionMethod === STORED) {
    return Buffer.from(data);
  }
  if (entry.compressionMethod !== DEFLATED) {
    return null;
  }
  try {
    return inflateRawSync(data);
  } catch {
    return null;
  }
}

// src/framework-api/adapters/jvm.ts
var POM_VERSION_PATTERN = /^version=(.+)$/m;
var MAX_CLASSES = 4e3;
function parseCoordinate(coordinate) {
  const parts = coordinate.split(":");
  if (parts.length < 2 || parts[0] === "" || parts[1] === "") {
    return null;
  }
  return { group: parts[0], artifact: parts[1] };
}
function jarCandidates(coordinate, home) {
  const found = [];
  const mavenDir = join57(
    home,
    ".m2",
    "repository",
    ...coordinate.group.split("."),
    coordinate.artifact
  );
  for (const version of listDirs(mavenDir)) {
    const jar = join57(mavenDir, version, `${coordinate.artifact}-${version}.jar`);
    if (existsSync39(jar)) {
      found.push(jar);
    }
  }
  const gradleDir = join57(
    home,
    ".gradle",
    "caches",
    "modules-2",
    "files-2.1",
    coordinate.group,
    coordinate.artifact
  );
  for (const version of listDirs(gradleDir)) {
    const versionDir = join57(gradleDir, version);
    for (const hashDir of listDirs(versionDir)) {
      const jar = join57(versionDir, hashDir, `${coordinate.artifact}-${version}.jar`);
      if (existsSync39(jar)) {
        found.push(jar);
      }
    }
  }
  return found.sort();
}
function listDirs(dir) {
  try {
    return readdirSync11(dir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  } catch {
    return [];
  }
}
function versionFromJar(buffer) {
  const directory = readZipDirectory(buffer);
  if (directory === null) {
    return null;
  }
  const entry = directory.find(
    (candidate) => candidate.name.startsWith("META-INF/maven/") && candidate.name.endsWith("/pom.properties")
  );
  if (entry === void 0) {
    return null;
  }
  const bytes = readZipEntry(buffer, entry);
  if (bytes === null) {
    return null;
  }
  return POM_VERSION_PATTERN.exec(bytes.toString("utf8"))?.[1]?.trim() ?? null;
}
function readJar(path2) {
  try {
    return readFileSync29(path2);
  } catch {
    return null;
  }
}
function resolveJar(coordinate) {
  for (const candidate of [...jarCandidates(coordinate, homedir2())].reverse()) {
    const buffer = readJar(candidate);
    if (buffer === null) {
      continue;
    }
    const version = versionFromJar(buffer);
    if (version !== null) {
      return { path: candidate, version };
    }
  }
  return null;
}
function aggregatedCoordinates(pomXml) {
  return jvmParser.parseManifest(pomXml, "pom.xml").packages.filter((entry) => !entry.isDev).map((entry) => entry.name);
}
function siblingPom(jarPath) {
  try {
    return readFileSync29(jarPath.replace(/\.jar$/, ".pom"), "utf8");
  } catch {
    return null;
  }
}
function classRecords(className, parsed) {
  const records = [
    {
      name: className,
      kind: "class",
      exists: true,
      deprecated: parsed.deprecated,
      message: parsed.deprecated ? "marked @Deprecated in the installed artifact" : null,
      since: parsed.since,
      for_removal: parsed.for_removal,
      provenance: "asserted"
    }
  ];
  for (const member of parsed.members) {
    if (!member.deprecated) {
      continue;
    }
    records.push({
      name: `${className}.${member.name}`,
      kind: "member",
      exists: true,
      deprecated: true,
      message: "marked @Deprecated in the installed artifact",
      since: member.since,
      for_removal: member.for_removal,
      provenance: "asserted"
    });
  }
  records.push(dynamicRecord(className));
  return records;
}
var jvmFrameworkApiAdapter = {
  ecosystem: "jvm",
  resolveInstalled(searchRoot, packageName) {
    const coordinate = parseCoordinate(packageName);
    if (coordinate === null) {
      return null;
    }
    try {
      if (!statSync5(searchRoot).isDirectory()) {
        return null;
      }
    } catch {
      return null;
    }
    const jar = resolveJar(coordinate);
    return jar === null ? null : { dir: jar.path, version: jar.version };
  },
  contentHash(input) {
    const hash = createHash6("sha256").update(`${input.package}@${input.version}`);
    try {
      const stats = statSync5(input.packageDir);
      hash.update(`${stats.size}:${stats.mtimeMs}`);
    } catch {
      hash.update("unstat");
    }
    return `sha256:${hash.digest("hex")}`;
  },
  index(input) {
    const own = indexJar(input.packageDir);
    if (own === null) {
      return {
        indexed: false,
        reason: "parser-unavailable",
        detail: `${input.package}@${input.version} is not a jar this reader understands (zip64, unreadable, or a non-zip artifact)`
      };
    }
    if (own.classes > 0) {
      return { indexed: true, sources: [cachePath(input.packageDir)], symbols: own.symbols };
    }
    const pom = siblingPom(input.packageDir);
    if (pom === null) {
      return {
        indexed: false,
        reason: "no-types",
        detail: `${input.package}@${input.version} contains no classes and ships no POM to resolve what it aggregates`
      };
    }
    const symbols = [];
    const sources = [cachePath(input.packageDir)];
    for (const dependency of aggregatedCoordinates(pom).slice(0, MAX_AGGREGATED)) {
      const coordinate = parseCoordinate(dependency);
      if (coordinate === null) {
        continue;
      }
      const jar = resolveJar(coordinate);
      if (jar === null) {
        continue;
      }
      const aggregated = indexJar(jar.path);
      if (aggregated === null || aggregated.classes === 0) {
        continue;
      }
      sources.push(cachePath(jar.path));
      symbols.push(...aggregated.symbols);
    }
    if (symbols.length === 0) {
      return {
        indexed: false,
        reason: "not-installed",
        detail: `${input.package}@${input.version} aggregates other modules, none of which are in the local Maven or Gradle cache \u2014 run your build once so they resolve`
      };
    }
    return { indexed: true, sources, symbols };
  }
};
var MAX_AGGREGATED = 12;
function indexJar(jarPath) {
  const buffer = readJar(jarPath);
  if (buffer === null) {
    return null;
  }
  const directory = readZipDirectory(buffer);
  if (directory === null) {
    return null;
  }
  const symbols = [];
  let classes = 0;
  for (const entry of directory) {
    if (!entry.name.endsWith(".class") || entry.name.includes("$")) {
      continue;
    }
    if (classes >= MAX_CLASSES) {
      break;
    }
    const bytes = readZipEntry(buffer, entry);
    if (bytes === null) {
      continue;
    }
    const parsed = parseClassFile(bytes);
    if (parsed === null) {
      continue;
    }
    classes += 1;
    symbols.push(...classRecords(parsed.name.replace(/\//g, "."), parsed));
  }
  return { symbols, classes };
}
function cachePath(jarPath) {
  const home = homedir2();
  return toPosixPath(jarPath.startsWith(home) ? `~${jarPath.slice(home.length)}` : jarPath);
}

// src/framework-api/adapters/node.ts
init_esm_shims();
import { createHash as createHash7 } from "crypto";
import { readFileSync as readFileSync31 } from "fs";

// src/framework-api/deprecation.ts
init_esm_shims();
var REMOVAL_PATTERN = /\b(will be removed|removed in|will stop working|slated for removal|scheduled for removal)\b/i;
var SINCE_PATTERN = /\bsince\s+v?(\d+(?:\.\d+)*(?:[-.][0-9A-Za-z.]+)?)/i;
var LEADING_VERSION_PATTERN = /^v?(\d+(?:\.\d+)+)\b/;
function tagText(tag) {
  const parts = tag.text ?? [];
  const out = [];
  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    if (part === void 0 || part.kind === "link") {
      continue;
    }
    if (part.kind === "linkName") {
      const label = parts[i + 1];
      if (label?.kind === "linkText" && label.text.trim().length > 0) {
        out.push(label.text.trim());
        i += 1;
        continue;
      }
      out.push(part.text.trim());
      continue;
    }
    out.push(part.text);
  }
  return out.join("").replace(/\s+/g, " ").trim();
}
function terminated(message) {
  return /[.!?]$/.test(message) ? message : `${message}.`;
}
function readDeprecation(tags) {
  const deprecatedTag = tags.find((tag) => tag.name === "deprecated");
  if (!deprecatedTag) {
    return { deprecated: false, message: null, since: null, for_removal: false };
  }
  const message = tagText(deprecatedTag).trim();
  const sinceTag = tags.find((tag) => tag.name === "since");
  const explicitSince = sinceTag ? tagText(sinceTag).trim() : "";
  const inlineSince = SINCE_PATTERN.exec(message)?.[1] ?? LEADING_VERSION_PATTERN.exec(message)?.[1] ?? null;
  return {
    deprecated: true,
    message: message.length > 0 ? terminated(message) : null,
    since: explicitSince.length > 0 ? explicitSince : inlineSince,
    for_removal: REMOVAL_PATTERN.test(message)
  };
}

// src/framework-api/resolve-version.ts
init_esm_shims();
import { readFileSync as readFileSync30 } from "fs";
import { isAbsolute as isAbsolute5, join as join58, resolve as resolve12 } from "path";
function readManifest2(packageDir) {
  try {
    return JSON.parse(readFileSync30(join58(packageDir, "package.json"), "utf8"));
  } catch {
    return null;
  }
}
function resolveInstalledVersion(searchRoot, packageName) {
  const dir = join58(searchRoot, "node_modules", packageName);
  const manifest = readManifest2(dir);
  if (!manifest || typeof manifest.version !== "string" || manifest.version.length === 0) {
    return null;
  }
  return { dir, version: manifest.version };
}
function typesPackageName(packageName) {
  if (packageName.startsWith("@")) {
    return `@types/${packageName.slice(1).replace("/", "__")}`;
  }
  return `@types/${packageName}`;
}
function typesFromExports(exportsField) {
  if (typeof exportsField === "string") {
    return exportsField.endsWith(".d.ts") ? exportsField : null;
  }
  if (typeof exportsField !== "object" || exportsField === null || Array.isArray(exportsField)) {
    return null;
  }
  const entry = exportsField;
  if (entry["."] !== void 0) {
    const root = typesFromExports(entry["."]);
    if (root !== null) {
      return root;
    }
  }
  if (typeof entry.types === "string") {
    return entry.types;
  }
  if (entry.types !== void 0) {
    const nested = typesFromExports(entry.types);
    if (nested !== null) {
      return nested;
    }
  }
  if (typeof entry.default === "string" && entry.default.endsWith(".d.ts")) {
    return entry.default;
  }
  return null;
}
function resolveTypesEntry(searchRoot, packageName, packageDir) {
  const manifest = readManifest2(packageDir);
  const declared = manifest?.types ?? manifest?.typings;
  const own = firstExisting(packageDir, [declared, typesFromExports(manifest?.exports), "./index.d.ts"]) ?? null;
  if (own !== null) {
    return own;
  }
  const typesDir = join58(searchRoot, "node_modules", typesPackageName(packageName));
  const typesManifest = readManifest2(typesDir);
  if (!typesManifest) {
    return null;
  }
  return firstExisting(typesDir, [
    typesManifest.types ?? typesManifest.typings,
    typesFromExports(typesManifest.exports),
    "./index.d.ts"
  ]);
}
function firstExisting(baseDir, candidates) {
  for (const candidate of candidates) {
    if (typeof candidate !== "string" || candidate.length === 0) {
      continue;
    }
    const absolute = isAbsolute5(candidate) ? candidate : resolve12(baseDir, candidate);
    try {
      readFileSync30(absolute, "utf8");
      return absolute;
    } catch {
      continue;
    }
  }
  return null;
}

// src/framework-api/typescript-loader.ts
init_esm_shims();
import { createRequire } from "module";
import { join as join59 } from "path";
var cache = /* @__PURE__ */ new Map();
function loadTypeScript(projectRoot) {
  const cached = cache.get(projectRoot);
  if (cached !== void 0) {
    return cached;
  }
  const resolved = resolveFromProject(projectRoot) ?? resolveFromPaqad();
  cache.set(projectRoot, resolved);
  return resolved;
}
function resolveFromProject(projectRoot) {
  try {
    const projectRequire = createRequire(join59(projectRoot, "package.json"));
    return projectRequire("typescript");
  } catch {
    return null;
  }
}
function resolveFromPaqad() {
  try {
    const selfRequire = createRequire(import.meta.url);
    return selfRequire("typescript");
  } catch {
    return null;
  }
}

// src/framework-api/adapters/node.ts
var MAX_DRILLED_CONTAINERS = 200;
function symbolKind(ts, flags) {
  const f = ts.SymbolFlags;
  if (flags & (f.Function | f.Method)) return "function";
  if (flags & f.Class) return "class";
  if (flags & f.Interface) return "interface";
  if (flags & (f.TypeAlias | f.TypeParameter)) return "type";
  if (flags & (f.Enum | f.EnumMember)) return "enum";
  if (flags & (f.Module | f.NamespaceModule | f.ValueModule)) return "namespace";
  if (flags & (f.Variable | f.BlockScopedVariable | f.Property)) return "variable";
  return "unknown";
}
function toRecord(ts, checker, symbol, name, kindOverride) {
  const deprecation = readDeprecation(symbol.getJsDocTags(checker));
  return {
    name,
    kind: kindOverride ?? symbolKind(ts, symbol.flags),
    exists: true,
    deprecated: deprecation.deprecated,
    message: deprecation.message,
    since: deprecation.since,
    for_removal: deprecation.for_removal,
    provenance: "asserted"
  };
}
var nodeFrameworkApiAdapter = {
  ecosystem: "node",
  resolveInstalled(searchRoot, packageName) {
    return resolveInstalledVersion(searchRoot, packageName);
  },
  contentHash(input) {
    const entry = resolveTypesEntry(input.searchRoot, input.package, input.packageDir);
    const hash = createHash7("sha256").update(`${input.package}@${input.version}`);
    if (entry !== null) {
      hash.update(entry);
      try {
        hash.update(readFileSync31(entry));
      } catch {
      }
    }
    return `sha256:${hash.digest("hex")}`;
  },
  /* v8 ignore stop */
  index(input) {
    const ts = loadTypeScript(input.projectRoot);
    if (ts === null) {
      return {
        indexed: false,
        reason: "parser-unavailable",
        detail: "the TypeScript compiler could not be resolved from this project or from paqad-ai \u2014 install typescript to verify framework reuse claims"
      };
    }
    const entry = resolveTypesEntry(input.searchRoot, input.package, input.packageDir);
    if (entry === null) {
      return {
        indexed: false,
        reason: "no-types",
        detail: `${input.package}@${input.version} ships no .d.ts declarations and has no @types companion installed`
      };
    }
    const program = ts.createProgram([entry], {
      skipLibCheck: true,
      target: ts.ScriptTarget.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      noEmit: true
    });
    const checker = program.getTypeChecker();
    const sourceFile = program.getSourceFile(entry);
    const moduleSymbol = sourceFile ? checker.getSymbolAtLocation(sourceFile) : void 0;
    if (!moduleSymbol) {
      return {
        indexed: false,
        reason: "no-types",
        detail: `${input.package}@${input.version} declares no module surface at ${projectRelative(input.projectRoot, entry)}`
      };
    }
    const symbols = [];
    const exported = checker.getExportsOfModule(moduleSymbol);
    let drilled = 0;
    for (const symbol of exported) {
      const name = symbol.getName();
      symbols.push(toRecord(ts, checker, symbol, name));
      const isContainer = Boolean(symbol.flags & (ts.SymbolFlags.Class | ts.SymbolFlags.Interface));
      if (!isContainer) {
        continue;
      }
      if (drilled >= MAX_DRILLED_CONTAINERS) {
        symbols.push(dynamicRecord(name));
        continue;
      }
      drilled += 1;
      symbols.push(...drillMembers(ts, checker, symbol, name));
    }
    return {
      indexed: true,
      sources: [projectRelative(input.projectRoot, entry)],
      symbols
    };
  }
};
function drillMembers(ts, checker, container, containerName) {
  let type;
  try {
    type = checker.getDeclaredTypeOfSymbol(container);
  } catch {
    return [dynamicRecord(containerName)];
  }
  const properties = type?.getProperties?.() ?? [];
  const records = properties.map(
    (property) => toRecord(ts, checker, property, `${containerName}.${property.getName()}`, "member")
  ).filter((record) => record.deprecated);
  records.push(dynamicRecord(containerName));
  return records;
}

// src/framework-api/adapters/php.ts
init_esm_shims();
import { createHash as createHash8 } from "crypto";
import { readFileSync as readFileSync32, readdirSync as readdirSync12, statSync as statSync6 } from "fs";
import { join as join60, resolve as resolve13 } from "path";

// src/framework-api/adapters/php-scan.ts
init_esm_shims();
var NAMESPACE_PATTERN = /^[ \t]*namespace[ \t]+([A-Za-z_\\][\w\\]*)[ \t]*[;{]/m;
var DOC_BLOCK = String.raw`\/\*\*(?:(?!\*\/)[\s\S])*\*\/`;
var CLASS_PATTERN = new RegExp(
  `(?:(${DOC_BLOCK})[ \\t\\r\\n]*)?((?:#\\[[^\\n]*\\][ \\t\\r\\n]*)*)(?:final[ \\t]+|abstract[ \\t]+|readonly[ \\t]+)*\\b(class|interface|trait|enum)[ \\t]+(\\w+)`,
  "g"
);
var METHOD_PATTERN = new RegExp(
  `(?:(${DOC_BLOCK})[ \\t\\r\\n]*)?((?:#\\[[^\\n]*\\][ \\t\\r\\n]*)*)(?:(?:public|protected|private|static|final|abstract)[ \\t]+)*function[ \\t]+&?(\\w+)[ \\t]*\\(`,
  "g"
);
var DOCUMENTED_METHOD_PATTERN = /@method[ \t]+(?:static[ \t]+)?(?:[^\s(]+[ \t]+)?(\w+)[ \t]*\(/g;
var DYNAMIC_PATTERN = /\b(?:__call|__callStatic|__get)\b|\bMacroable\b|\bextends[ \t]+Facade\b/;
var KIND_BY_KEYWORD = {
  class: "class",
  interface: "interface",
  trait: "type",
  enum: "enum"
};
function stripDocComment(doc) {
  return doc.replace(/^\/\*\*+/, "").replace(/\*+\/$/, "").split("\n").map((line) => line.replace(/^[ \t]*\*[ \t]?/, "").trimEnd()).join("\n").trim();
}
function documentedMethods(doc) {
  if (doc === null) {
    return [];
  }
  const names = /* @__PURE__ */ new Set();
  for (const match of doc.matchAll(DOCUMENTED_METHOD_PATTERN)) {
    if (match[1] !== void 0) {
      names.add(match[1]);
    }
  }
  return [...names];
}
function bodyAfter(source, from) {
  const open = source.indexOf("{", from);
  const semicolon = source.indexOf(";", from);
  if (open === -1 || semicolon !== -1 && semicolon < open) {
    return "";
  }
  let depth = 0;
  for (let i = open; i < source.length; i += 1) {
    const char = source[i];
    if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return source.slice(open, i + 1);
      }
    }
  }
  return source.slice(open);
}
function scanPhpFile(source) {
  const namespace = NAMESPACE_PATTERN.exec(source)?.[1] ?? null;
  const classes = [];
  for (const match of source.matchAll(CLASS_PATTERN)) {
    const keyword = match[3];
    const name = match[4];
    if (keyword === void 0 || name === void 0 || match.index === void 0) {
      continue;
    }
    const doc = match[1] === void 0 ? null : stripDocComment(match[1]);
    const attributes = match[2] ?? "";
    const declarationEnd = match.index + match[0].length;
    const bodyStart = source.indexOf("{", declarationEnd);
    const header = bodyStart === -1 ? "" : source.slice(declarationEnd, bodyStart);
    classes.push({
      at: declarationEnd,
      value: {
        name,
        /* v8 ignore next -- the pattern only matches the four keywords the map holds; the fallback keeps the type total. */
        kind: KIND_BY_KEYWORD[keyword] ?? "class",
        doc,
        attributes,
        methods: [],
        dynamic: DYNAMIC_PATTERN.test(header) || DYNAMIC_PATTERN.test(bodyAfter(source, declarationEnd)),
        documentedMethods: documentedMethods(doc)
      }
    });
  }
  for (const match of source.matchAll(METHOD_PATTERN)) {
    const name = match[3];
    if (name === void 0 || match.index === void 0) {
      continue;
    }
    const owner = ownerOf(classes, match.index);
    if (owner === null) {
      continue;
    }
    owner.methods.push({
      name,
      doc: match[1] === void 0 ? null : stripDocComment(match[1]),
      /* v8 ignore next -- as above: the attribute group is always present. */
      attributes: match[2] ?? "",
      body: bodyAfter(source, match.index + match[0].length)
    });
  }
  return { namespace, classes: classes.map((entry) => entry.value) };
}
var DOC_TAG_PATTERN = /@(deprecated|since)\b[ \t]*([^\n]*)/g;
var DEPRECATED_ATTRIBUTE_PATTERN = /#\[\s*\\?Deprecated\s*(?:\(([\s\S]*?)\))?\s*\]/;
var ATTRIBUTE_MESSAGE_PATTERN = /(?:message\s*:\s*)?['"]([^'"]*)['"]/;
var ATTRIBUTE_SINCE_PATTERN = /since\s*:\s*['"]([^'"]*)['"]/;
var TRIGGER_ERROR_PATTERN = /trigger_error\s*\(\s*['"]([^'"]*)['"][\s\S]{0,80}?E_USER_DEPRECATED/;
function phpDeprecationTags(declaration) {
  const attribute = DEPRECATED_ATTRIBUTE_PATTERN.exec(declaration.attributes);
  if (attribute !== null) {
    const args = attribute[1] ?? "";
    const message = ATTRIBUTE_MESSAGE_PATTERN.exec(args)?.[1] ?? "";
    const since = ATTRIBUTE_SINCE_PATTERN.exec(args)?.[1];
    const tags = [
      { name: "deprecated", text: [{ text: message }] }
    ];
    if (since !== void 0) {
      tags.push({ name: "since", text: [{ text: since }] });
    }
    return tags;
  }
  if (declaration.doc !== null) {
    const tags = [];
    for (const match of declaration.doc.matchAll(DOC_TAG_PATTERN)) {
      const name = match[1];
      if (name !== void 0) {
        tags.push({ name, text: [{ text: (match[2] ?? "").trim() }] });
      }
    }
    if (tags.some((tag) => tag.name === "deprecated")) {
      return tags;
    }
  }
  const triggered = TRIGGER_ERROR_PATTERN.exec(declaration.body ?? "");
  if (triggered !== null) {
    return [{ name: "deprecated", text: [{ text: triggered[1] ?? "" }] }];
  }
  return [];
}
function ownerOf(classes, offset) {
  let owner = null;
  for (const entry of classes) {
    if (entry.at <= offset) {
      owner = entry.value;
      continue;
    }
    break;
  }
  return owner;
}

// src/framework-api/adapters/php.ts
var MAX_FILES = 6e3;
var SKIPPED_DIRS = /* @__PURE__ */ new Set(["tests", "test", "node_modules", "vendor", ".git", "stubs"]);
function normalizeComposerVersion(version) {
  return version.startsWith("v") ? version.slice(1) : version;
}
function readJson3(path2) {
  try {
    return JSON.parse(readFileSync32(path2, "utf8"));
  } catch {
    return null;
  }
}
function findInstalledEntry(searchRoot, packageName) {
  const composerDir = join60(searchRoot, "vendor", "composer");
  const installed = readJson3(
    join60(composerDir, "installed.json")
  );
  const entries = Array.isArray(installed) ? installed : installed?.packages ?? [];
  const entry = entries.find((candidate) => candidate.name === packageName);
  if (entry?.version !== void 0) {
    const installPath = entry["install-path"];
    return {
      entry,
      dir: installPath === void 0 ? join60(searchRoot, "vendor", packageName) : resolve13(composerDir, installPath)
    };
  }
  const lock = readJson3(join60(searchRoot, "composer.lock"));
  const locked = (lock?.packages ?? []).find((candidate) => candidate.name === packageName);
  if (locked?.version === void 0) {
    return null;
  }
  return { entry: locked, dir: join60(searchRoot, "vendor", packageName) };
}
function phpFiles(dir) {
  const found = [];
  const queue = [dir];
  while (queue.length > 0 && found.length < MAX_FILES) {
    const current = queue.shift();
    let entries;
    try {
      entries = readdirSync12(current, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!SKIPPED_DIRS.has(entry.name)) {
          queue.push(join60(current, entry.name));
        }
        continue;
      }
      if (entry.name.endsWith(".php") && found.length < MAX_FILES) {
        found.push(join60(current, entry.name));
      }
    }
  }
  return found.sort();
}
function assertedRecord(name, kind, tags) {
  const deprecation = readDeprecation(tags);
  return {
    name,
    kind,
    exists: true,
    deprecated: deprecation.deprecated,
    message: deprecation.message,
    since: deprecation.since,
    for_removal: deprecation.for_removal,
    provenance: "asserted"
  };
}
function classRecords2(namespace, declared) {
  const qualified = namespace === null ? declared.name : `${namespace}\\${declared.name}`;
  const records = [
    assertedRecord(qualified, declared.kind, phpDeprecationTags(declared))
  ];
  for (const method of declared.methods) {
    const record = assertedRecord(
      `${qualified}::${method.name}`,
      "member",
      phpDeprecationTags(method)
    );
    if (record.deprecated) {
      records.push(record);
    }
  }
  for (const promised of declared.documentedMethods) {
    records.push(assertedRecord(`${qualified}::${promised}`, "member", []));
  }
  records.push(dynamicRecord(qualified));
  return records;
}
var phpFrameworkApiAdapter = {
  ecosystem: "php",
  resolveInstalled(searchRoot, packageName) {
    const found = findInstalledEntry(searchRoot, packageName);
    if (found === null) {
      return null;
    }
    try {
      if (!statSync6(found.dir).isDirectory()) {
        return null;
      }
    } catch {
      return null;
    }
    return { dir: found.dir, version: normalizeComposerVersion(found.entry.version) };
  },
  contentHash(input) {
    const found = findInstalledEntry(input.searchRoot, input.package);
    const hash = createHash8("sha256").update(`${input.package}@${input.version}`);
    hash.update(found?.entry.dist?.reference ?? "");
    return `sha256:${hash.digest("hex")}`;
  },
  index(input) {
    const files = phpFiles(input.packageDir);
    if (files.length === 0) {
      return {
        indexed: false,
        reason: "no-types",
        detail: `${input.package}@${input.version} has no readable PHP sources under ${projectRelative(input.projectRoot, input.packageDir)}`
      };
    }
    const symbols = [];
    for (const file of files) {
      let source;
      try {
        source = readFileSync32(file, "utf8");
      } catch {
        continue;
      }
      const scan = scanPhpFile(source);
      for (const declared of scan.classes) {
        symbols.push(...classRecords2(scan.namespace, declared));
      }
    }
    return {
      indexed: true,
      sources: [projectRelative(input.projectRoot, input.packageDir)],
      symbols
    };
  }
};

// src/framework-api/adapters/python.ts
init_esm_shims();
import { createHash as createHash9 } from "crypto";
import { existsSync as existsSync40, readFileSync as readFileSync33, readdirSync as readdirSync13, statSync as statSync7 } from "fs";
import { join as join61 } from "path";
var SITE_PACKAGES_ROOTS = [[".venv", "lib"], ["venv", "lib"], ["env", "lib"], ["site-packages"]];
var METADATA_VERSION_PATTERN = /^Version:[ \t]*(.+)$/m;
var DUNDER_ALL_PATTERN = /^__all__\s*(?::[^=]+)?=\s*[[(]([\s\S]*?)[\])]/m;
var QUOTED_NAME_PATTERN = /['"]([A-Za-z_]\w*)['"]/g;
var DECLARATION_PATTERN = /^((?:@[^\n]*\n)*)(?:async[ \t]+)?(def|class)[ \t]+(\w+)/gm;
var PEP702_PATTERN = /@(?:[\w.]+\.)?deprecated\s*\(\s*(?:['"]([^'"]*)['"])?/;
var DEPRECATION_WARNING_PATTERN = /warn\s*\(\s*(?:f?['"]([^'"]*)['"])?[\s\S]{0,160}?DeprecationWarning/;
function readText(path2) {
  try {
    return readFileSync33(path2, "utf8");
  } catch {
    return null;
  }
}
function normalizeDistName(name) {
  return name.toLowerCase().replace(/[-_.]+/g, "_");
}
function sitePackagesDirs(searchRoot) {
  const roots = [];
  for (const segments of SITE_PACKAGES_ROOTS) {
    const base = join61(searchRoot, ...segments);
    if (!existsSync40(base)) {
      continue;
    }
    if (segments[segments.length - 1] === "site-packages") {
      roots.push(base);
      continue;
    }
    let versionDirs;
    try {
      versionDirs = readdirSync13(base);
    } catch {
      continue;
    }
    for (const versionDir of versionDirs) {
      const candidate = join61(base, versionDir, "site-packages");
      if (existsSync40(candidate)) {
        roots.push(candidate);
      }
    }
  }
  return roots;
}
function findDistInfo(searchRoot, packageName) {
  const wanted = normalizeDistName(packageName);
  for (const siteDir of sitePackagesDirs(searchRoot)) {
    let entries;
    try {
      entries = readdirSync13(siteDir);
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (!entry.endsWith(".dist-info")) {
        continue;
      }
      const base = entry.slice(0, -".dist-info".length);
      const dash = base.lastIndexOf("-");
      if (dash === -1 || normalizeDistName(base.slice(0, dash)) !== wanted) {
        continue;
      }
      const distInfo = join61(siteDir, entry);
      const metadata = readText(join61(distInfo, "METADATA"));
      const version = metadata === null ? null : METADATA_VERSION_PATTERN.exec(metadata)?.[1] ?? null;
      if (version !== null) {
        return { siteDir, distInfo, version: version.trim() };
      }
    }
  }
  return null;
}
function importPackageDir(siteDir, packageName) {
  const candidates = [packageName, packageName.replace(/-/g, "_"), normalizeDistName(packageName)];
  for (const candidate of candidates) {
    const dir = join61(siteDir, candidate);
    try {
      if (statSync7(dir).isDirectory()) {
        return dir;
      }
    } catch {
      continue;
    }
  }
  return null;
}
function readDunderAll(source) {
  const block = DUNDER_ALL_PATTERN.exec(source)?.[1];
  if (block === void 0) {
    return [];
  }
  return [...block.matchAll(QUOTED_NAME_PATTERN)].map((match) => match[1]);
}
function pythonDeprecationTags(decorators, body) {
  const pep702 = PEP702_PATTERN.exec(decorators);
  if (pep702 !== null) {
    return [{ name: "deprecated", text: [{ text: pep702[1] ?? "" }] }];
  }
  const warned = DEPRECATION_WARNING_PATTERN.exec(body);
  if (warned !== null) {
    return [{ name: "deprecated", text: [{ text: warned[1] ?? "" }] }];
  }
  return [];
}
function bodyFrom(source, start) {
  const next = source.slice(start).search(/^(?:@|async[ \t]+def|def|class)\b/m);
  return next === -1 ? source.slice(start) : source.slice(start, start + next);
}
function moduleRecords(moduleName, source) {
  const exported = new Set(readDunderAll(source));
  const records = [];
  const seen = /* @__PURE__ */ new Set();
  for (const match of source.matchAll(DECLARATION_PATTERN)) {
    const name = match[3];
    if (name === void 0 || match.index === void 0 || name.startsWith("_")) {
      continue;
    }
    if (exported.size > 0 && !exported.has(name)) {
      continue;
    }
    if (seen.has(name)) {
      continue;
    }
    seen.add(name);
    const deprecation = readDeprecation(
      /* v8 ignore next -- the decorator group is always present, empty when there are none. */
      pythonDeprecationTags(match[1] ?? "", bodyFrom(source, match.index + match[0].length))
    );
    records.push({
      name: `${moduleName}.${name}`,
      kind: match[2] === "class" ? "class" : "function",
      exists: true,
      deprecated: deprecation.deprecated,
      message: deprecation.message,
      since: deprecation.since,
      for_removal: deprecation.for_removal,
      provenance: "asserted"
    });
  }
  for (const name of exported) {
    if (!seen.has(name)) {
      records.push({
        name: `${moduleName}.${name}`,
        kind: "unknown",
        exists: true,
        deprecated: false,
        message: null,
        since: null,
        for_removal: false,
        provenance: "asserted"
      });
    }
  }
  records.push(dynamicRecord(moduleName));
  return records;
}
var pythonFrameworkApiAdapter = {
  ecosystem: "python",
  resolveInstalled(searchRoot, packageName) {
    const dist = findDistInfo(searchRoot, packageName);
    if (dist === null) {
      return null;
    }
    const dir = importPackageDir(dist.siteDir, packageName) ?? dist.siteDir;
    return { dir, version: dist.version };
  },
  contentHash(input) {
    const hash = createHash9("sha256").update(`${input.package}@${input.version}`);
    for (const entry of ["__init__.pyi", "__init__.py"]) {
      const source = readText(join61(input.packageDir, entry));
      if (source !== null) {
        hash.update(source);
        break;
      }
    }
    return `sha256:${hash.digest("hex")}`;
  },
  index(input) {
    const entries = [];
    for (const name of ["__init__.pyi", "__init__.py"]) {
      const source = readText(join61(input.packageDir, name));
      if (source !== null) {
        entries.push({ file: join61(input.packageDir, name), source });
        break;
      }
    }
    if (entries.length === 0) {
      return {
        indexed: false,
        reason: "no-types",
        detail: `${input.package}@${input.version} ships no importable module at ${projectRelative(input.projectRoot, input.packageDir)}`
      };
    }
    const moduleName = input.package.replace(/-/g, "_");
    const symbols = [];
    for (const entry of entries) {
      symbols.push(...moduleRecords(moduleName, entry.source));
    }
    return {
      indexed: true,
      sources: entries.map((entry) => projectRelative(input.projectRoot, entry.file)),
      symbols
    };
  }
};

// src/framework-api/adapters/registry.ts
var FrameworkApiAdapterRegistry = class {
  adapters = /* @__PURE__ */ new Map();
  constructor(adapters = []) {
    for (const adapter of adapters) {
      this.register(adapter);
    }
  }
  register(adapter) {
    this.adapters.set(adapter.ecosystem, adapter);
  }
  get(ecosystem) {
    return this.adapters.get(ecosystem) ?? null;
  }
  list() {
    return [...this.adapters.values()];
  }
};
function createDefaultFrameworkApiAdapterRegistry() {
  return new FrameworkApiAdapterRegistry([
    nodeFrameworkApiAdapter,
    phpFrameworkApiAdapter,
    pythonFrameworkApiAdapter,
    jvmFrameworkApiAdapter
  ]);
}

// src/framework-api/types.ts
init_esm_shims();
var FRAMEWORK_API_SCHEMA_VERSION = 1;

// src/framework-api/builder.ts
function buildFrameworkApiIndex(projectRoot, options = {}) {
  const snapshot = options.snapshot !== void 0 ? options.snapshot : readStackSnapshotSync(projectRoot);
  const registry = options.registry ?? createDefaultFrameworkApiAdapterRegistry();
  const now = options.now ?? (() => /* @__PURE__ */ new Date());
  const previous = options.force === true ? null : readFrameworkApiIndex(projectRoot);
  const packages = [];
  const blocked = [];
  let cacheHits = 0;
  const seen = /* @__PURE__ */ new Set();
  for (const dependency of snapshot?.packages ?? []) {
    if (FRAMEWORK_PACKAGE_MAP[dependency.name] === void 0) {
      continue;
    }
    const root = dependency.root ?? ".";
    const pairKey = `${dependency.name}@@${root}`;
    if (seen.has(pairKey)) {
      continue;
    }
    seen.add(pairKey);
    const adapter = registry.get(dependency.ecosystem);
    if (adapter === null) {
      blocked.push({
        package: dependency.name,
        ecosystem: dependency.ecosystem,
        reason: "no-adapter",
        detail: `no framework-API adapter for the ${dependency.ecosystem} ecosystem yet`
      });
      continue;
    }
    const searchRoot = join62(projectRoot, root);
    const installed = adapter.resolveInstalled(searchRoot, dependency.name);
    if (installed === null) {
      blocked.push({
        package: dependency.name,
        ecosystem: dependency.ecosystem,
        reason: "not-installed",
        detail: `${dependency.name} is declared in ${root} but not present in its install tree \u2014 run your package manager's install`
      });
      continue;
    }
    const input = {
      projectRoot,
      searchRoot,
      package: dependency.name,
      version: installed.version,
      packageDir: installed.dir
    };
    const contentHash2 = adapter.contentHash(input);
    const stored = previous?.packages.find(
      (entry) => entry.package === dependency.name && entry.root === root && entry.content_hash === contentHash2
    );
    if (stored) {
      packages.push(stored);
      cacheHits += 1;
      continue;
    }
    const result = adapter.index(input);
    if (!result.indexed) {
      blocked.push({
        package: dependency.name,
        ecosystem: dependency.ecosystem,
        reason: result.reason,
        detail: result.detail
      });
      continue;
    }
    packages.push({
      package: dependency.name,
      version: installed.version,
      ecosystem: dependency.ecosystem,
      root,
      content_hash: contentHash2,
      sources: result.sources,
      symbols: result.symbols
    });
  }
  return {
    index: {
      schema_version: FRAMEWORK_API_SCHEMA_VERSION,
      header: {
        generated_at: now().toISOString(),
        schema_version: FRAMEWORK_API_SCHEMA_VERSION
      },
      packages: packages.sort((left, right) => left.package.localeCompare(right.package)),
      blocked: blocked.sort((left, right) => left.package.localeCompare(right.package))
    },
    cacheHits
  };
}

// src/framework-api/laravel-upgrade-guide.ts
init_esm_shims();
import { mkdirSync as mkdirSync11, readFileSync as readFileSync34, renameSync as renameSync7, writeFileSync as writeFileSync12 } from "fs";
import { dirname as dirname16, join as join63 } from "path";
var LARAVEL_UPGRADE_GUIDE_URL = "https://raw.githubusercontent.com/laravel/docs/{major}.x/upgrade.md";
var UPGRADE_GUIDE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1e3;
var FETCH_TIMEOUT_MS = 5e3;
var SYMBOL_PATTERN = /`?([A-Za-z_][\w\\]*)::(\w+)\(\)?`?/g;
var DEPRECATION_HEADING = /^#{2,6}\s+.*\b(deprecat|remov)\w*/i;
var DEPRECATION_SENTENCE = /\b(is|are|has been|have been|was|were)\s+(deprecated|removed)\b|\bdeprecated\s+(alias|aliases|in favou?r)\b/i;
var REMOVAL_PHRASE = /\bremov\w*/i;
var CACHE_PARSER_VERSION = 1;
var CACHEABLE_SYMBOL = /^[A-Za-z_][A-Za-z0-9_\\]*::[A-Za-z0-9_]+$/;
function upgradeGuideCachePath(projectRoot, major) {
  return join63(projectRoot, PATHS.INDEXES_DIR, "cache", `laravel-upgrade-${major}.json`);
}
function majorOf(version) {
  return /^v?(\d{1,4})(?:\D|$)/.exec(version.trim())?.[1] ?? null;
}
function cacheable(records, major) {
  const safe = [];
  for (const record of records) {
    if (!CACHEABLE_SYMBOL.test(record.name)) {
      continue;
    }
    safe.push({
      name: record.name,
      kind: "member",
      exists: true,
      deprecated: true,
      message: `The Laravel ${major}.x upgrade guide lists this as ${record.for_removal ? "removed" : "deprecated"}.`,
      since: major,
      for_removal: record.for_removal,
      provenance: "doc-derived"
    });
  }
  return safe;
}
function readCache(path2, maxAgeMs, now) {
  try {
    const cached = JSON.parse(readFileSync34(path2, "utf8"));
    if (!Array.isArray(cached.records) || typeof cached.fetched_at !== "number" || cached.parser_version !== CACHE_PARSER_VERSION) {
      return null;
    }
    return now - cached.fetched_at <= maxAgeMs ? cached.records : null;
  } catch {
    return null;
  }
}
function writeCache(path2, records, now) {
  try {
    mkdirSync11(dirname16(path2), { recursive: true });
    const tmp = `${path2}.tmp`;
    const payload = {
      fetched_at: now,
      parser_version: CACHE_PARSER_VERSION,
      records
    };
    writeFileSync12(tmp, JSON.stringify(payload), "utf8");
    renameSync7(tmp, path2);
  } catch {
  }
}
async function loadLaravelDeprecations(projectRoot, version, options = {}) {
  const major = majorOf(version);
  if (major === null) {
    return null;
  }
  const path2 = upgradeGuideCachePath(projectRoot, major);
  const now = (options.now ?? (() => Date.now()))();
  const maxAge = options.maxAgeMs ?? UPGRADE_GUIDE_MAX_AGE_MS;
  const cached = readCache(path2, maxAge, now);
  if (cached !== null) {
    return cached;
  }
  if (options.offline === true) {
    return readCache(path2, Number.POSITIVE_INFINITY, now);
  }
  const request = options.fetchImpl ?? globalThis.fetch;
  try {
    const response = await request(LARAVEL_UPGRADE_GUIDE_URL.replace("{major}", major), {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
    });
    if (!response.ok) {
      return readCache(path2, Number.POSITIVE_INFINITY, now);
    }
    const records = cacheable(parseUpgradeGuide(await response.text(), major), major);
    writeCache(path2, records, now);
    return records;
  } catch {
    return readCache(path2, Number.POSITIVE_INFINITY, now);
  }
}
function parseUpgradeGuide(markdown, version) {
  const records = /* @__PURE__ */ new Map();
  const major = majorOf(version) ?? version;
  let heading = "deprecations";
  let headingIsDeprecation = false;
  let sectionRemoval = false;
  const collect4 = (text, source, removal) => {
    for (const match of text.matchAll(SYMBOL_PATTERN)) {
      const name = `${match[1]}::${match[2]}`;
      const existing = records.get(name);
      if (existing !== void 0) {
        existing.for_removal = existing.for_removal || removal;
        continue;
      }
      records.set(name, {
        name,
        kind: "member",
        exists: true,
        deprecated: true,
        message: `The Laravel ${major}.x upgrade guide lists this under "${source}".`,
        since: major,
        for_removal: removal,
        provenance: "doc-derived"
      });
    }
  };
  for (const line of markdown.split("\n")) {
    if (line.startsWith("#")) {
      heading = line.replace(/^#+\s*/, "").trim();
      headingIsDeprecation = DEPRECATION_HEADING.test(line);
      sectionRemoval = REMOVAL_PHRASE.test(heading);
      if (headingIsDeprecation) {
        collect4(heading, heading, sectionRemoval);
      }
      continue;
    }
    if (headingIsDeprecation) {
      sectionRemoval = sectionRemoval || REMOVAL_PHRASE.test(line);
      collect4(line, heading, sectionRemoval);
      continue;
    }
    if (DEPRECATION_SENTENCE.test(line)) {
      collect4(line, heading, REMOVAL_PHRASE.test(line));
    }
  }
  return [...records.values()];
}
function mergeDocDerived(asserted, docDerived) {
  const merged = asserted.map((record) => ({ ...record }));
  for (const record of docDerived) {
    const wanted = record.name.toLowerCase();
    const matches = merged.filter((candidate) => {
      const name = candidate.name.toLowerCase();
      return name === wanted || name.endsWith(`\\${wanted}`) || name.endsWith(`::${wanted}`);
    });
    if (matches.length === 0) {
      merged.push(record);
      continue;
    }
    for (const match of matches) {
      if (match.deprecated || match.provenance === "unknown-dynamic") {
        continue;
      }
      match.deprecated = true;
      match.message = record.message;
      match.since = record.since;
      match.for_removal = record.for_removal;
      match.provenance = "doc-derived";
    }
  }
  return merged;
}
async function applyLaravelBackstop(projectRoot, index, options = {}) {
  const entry = index.packages.find((candidate) => candidate.package === "laravel/framework");
  if (entry === void 0) {
    return { applied: false, deprecations: 0 };
  }
  const docDerived = await loadLaravelDeprecations(projectRoot, entry.version, options);
  if (docDerived === null) {
    return { applied: false, deprecations: 0 };
  }
  const before = entry.symbols.filter((record) => record.deprecated).length;
  entry.symbols = mergeDocDerived(entry.symbols, docDerived);
  const after = entry.symbols.filter((record) => record.deprecated).length;
  return { applied: true, deprecations: after - before };
}

// src/cli/commands/index-cmd.ts
function createIndexCommand() {
  const command = new Command("index").description(
    "Build and query the code-knowledge index (exported symbols + import reachability)"
  );
  command.command("build").description("Build the code-knowledge index at .paqad/indexes/code-knowledge.json").option("--project-root <path>", "Project root", process.cwd()).option("--quiet", "Suppress the machine-readable summary line", false).action(async (options) => {
    const index = await buildCodeKnowledgeIndex(options.projectRoot);
    const validation = validateCodeKnowledgeIndex(index);
    if (!validation.valid) {
      console.error(
        "**\u25B8 paqad** \xB7 the code-knowledge index failed schema validation \u2014 not written"
      );
      for (const error of validation.errors.slice(0, 10)) {
        console.error(`  - ${error}`);
      }
      process.exitCode = 1;
      return;
    }
    const path2 = writeCodeKnowledgeIndex(options.projectRoot, index);
    const catalogPath = writeReuseCatalog(options.projectRoot, index);
    const evidence = writeModuleMapEvidence(options.projectRoot, index);
    const orphans = index.files.filter((file) => file.orphan).length;
    const unusedDeps = index.dependencies.filter((dependency) => !dependency.imported).length;
    console.log(
      `**\u25B8 paqad** \xB7 built the code-knowledge index for you \u2014 ${index.symbols.length} symbols across ${index.files.length} files (${orphans} with no callers, ${unusedDeps} unused deps). Reuse catalog + module-map evidence refreshed.`
    );
    if (!options.quiet) {
      process.stdout.write(
        `${JSON.stringify({
          built: true,
          path: path2,
          reuse_catalog: catalogPath,
          module_map_modules_updated: evidence.modulesUpdated,
          symbols: index.symbols.length,
          files: index.files.length,
          orphan_files: orphans,
          unused_dependencies: unusedDeps
        })}
`
      );
    }
  });
  command.command("query").description("Look up a symbol name or a project-relative file path in the index").argument("<term>", "A symbol name or a project-relative file path").option("--project-root <path>", "Project root", process.cwd()).option("--quiet", "Suppress the machine-readable summary line", false).action((term, options) => {
    const index = readCodeKnowledgeIndex(options.projectRoot);
    if (index === null) {
      console.error(
        "**\u25B8 paqad** \xB7 no code-knowledge index yet \u2014 run `paqad-ai index build` first"
      );
      process.exitCode = 2;
      return;
    }
    const result = queryCodeKnowledge(index, term);
    if (result.matches.length === 0) {
      console.log(`**\u25B8 paqad** \xB7 nothing named "${term}" in the code-knowledge index.`);
      process.exitCode = 1;
    } else {
      for (const card of result.matches) {
        console.log(formatCard(card));
      }
    }
    if (!options.quiet) {
      process.stdout.write(`${JSON.stringify(result)}
`);
    }
  });
  command.addCommand(createFrameworkApiCommand());
  return command;
}
function createFrameworkApiCommand() {
  const command = new Command("framework-api").description(
    "Build and query the installed framework-API index (does a framework symbol exist, and is it deprecated?)"
  );
  command.command("build").description("Build the framework-API index at .paqad/indexes/framework-api.json").option("--project-root <path>", "Project root", process.cwd()).option("--force", "Re-walk every package instead of reusing unchanged entries", false).option("--offline", "Skip the Laravel Upgrade Guide fetch and use only what is cached", false).option("--quiet", "Suppress the machine-readable summary line", false).action(async (options) => {
    const { index, cacheHits } = buildFrameworkApiIndex(options.projectRoot, {
      force: options.force
    });
    const backstop = await applyLaravelBackstop(options.projectRoot, index, {
      offline: options.offline
    });
    const validation = validateFrameworkApiIndex(index);
    if (!validation.valid) {
      console.error(
        "**\u25B8 paqad** \xB7 the framework-API index failed schema validation \u2014 not written"
      );
      for (const error of validation.errors.slice(0, 10)) {
        console.error(`  - ${error}`);
      }
      process.exitCode = 1;
      return;
    }
    const path2 = writeFrameworkApiIndex(options.projectRoot, index);
    const symbols = index.packages.reduce((total, entry) => total + entry.symbols.length, 0);
    const deprecated = index.packages.reduce(
      (total, entry) => total + entry.symbols.filter((symbol) => symbol.deprecated).length,
      0
    );
    console.log(
      `**\u25B8 paqad** \xB7 checked your installed frameworks for you \u2014 ${symbols} symbols across ${index.packages.length} package(s), ${deprecated} marked deprecated (${cacheHits} reused from cache).` + (index.blocked.length > 0 ? ` \u26AA ${index.blocked.length} package(s) skipped.` : "")
    );
    if (backstop.applied) {
      console.log(
        `> \u{1F7E1} ${backstop.deprecations} more deprecation(s) from the Laravel upgrade guide \u2014 recorded as doc-derived, not read from the code.`
      );
    }
    for (const blocked of index.blocked) {
      console.log(`> \u26AA ${blocked.package} \u2014 ${blocked.detail}`);
    }
    if (!options.quiet) {
      process.stdout.write(
        `${JSON.stringify({
          built: true,
          path: path2,
          packages: index.packages.length,
          symbols,
          deprecated_symbols: deprecated,
          cache_hits: cacheHits,
          blocked: index.blocked.length
        })}
`
      );
    }
  });
  command.command("query").description("Look one framework symbol up at the version actually installed").argument("<package>", "The installed package name, e.g. react").argument("<symbol>", "The exported symbol, e.g. useId or Component.componentWillMount").option("--project-root <path>", "Project root", process.cwd()).option("--quiet", "Suppress the machine-readable summary line", false).action((packageName, symbol, options) => {
    const index = readFrameworkApiIndex(options.projectRoot);
    if (index === null) {
      console.error(
        "**\u25B8 paqad** \xB7 no framework-API index yet \u2014 run `paqad-ai index framework-api build` first"
      );
      process.exitCode = 2;
      return;
    }
    const result = queryFrameworkApi(index, packageName, symbol);
    console.log(formatFrameworkCard(result));
    if (result.verdict === "absent" || result.verdict === "deprecated") {
      process.exitCode = 1;
    }
    if (!options.quiet) {
      process.stdout.write(`${JSON.stringify(result)}
`);
    }
  });
  return command;
}
function formatFrameworkCard(result) {
  const at2 = result.version === null ? result.package : `${result.package}@${result.version}`;
  switch (result.verdict) {
    case "live":
      return `**\u25B8 paqad** \xB7 \u{1F7E2} ${result.symbol} exists in ${at2} and carries no deprecation marker.`;
    case "deprecated": {
      const since = result.record?.since === null ? "" : ` since ${result.record?.since}`;
      const removal = result.record?.for_removal === true ? " It is slated for removal." : "";
      return [
        `**\u25B8 paqad** \xB7 \u{1F534} ${result.symbol} is deprecated in ${at2}${since}.`,
        `> ${result.record?.message ?? "no reason given"}${removal}`
      ].join("\n");
    }
    case "absent":
      return [
        `**\u25B8 paqad** \xB7 \u{1F534} ${result.symbol} does not exist in ${at2}.`,
        result.nearest === null ? "> No close match \u2014 check the name against the package docs." : `> Did you mean "${result.nearest}"?`
      ].join("\n");
    case "unknown-dynamic":
      return [
        `**\u25B8 paqad** \xB7 \u{1F7E1} ${result.symbol} is provided dynamically by ${at2}.`,
        "> I could not verify it statically, so I am not claiming it is missing."
      ].join("\n");
    default:
      return [
        `**\u25B8 paqad** \xB7 \u{1F7E1} ${result.package} is not in the framework-API index.`,
        "> Run `paqad-ai index framework-api build`, or check the index's blocked list for why it was skipped."
      ].join("\n");
  }
}
function formatCard(card) {
  if (card.kind === "symbol") {
    const callers = card.top_callers.length > 0 ? card.top_callers.join(", ") : "(none in production code)";
    return [
      `**\u25B8 paqad** \xB7 ${card.name} \u2014 \`${card.signature}\``,
      `> ${card.file}:${card.line}${card.module_slug ? ` \xB7 module ${card.module_slug}` : ""}`,
      `> called by ${card.caller_count} file(s)${card.orphan ? " \xB7 \u{1F7E1} no callers (possible dead code)" : ""}`,
      `> top callers: ${callers}`
    ].join("\n");
  }
  const importers = card.importers.length > 0 ? card.importers.join(", ") : "(none)";
  return [
    `**\u25B8 paqad** \xB7 ${card.path}${card.entry_point ? " \xB7 entry point" : ""}`,
    `> imported by ${card.caller_count} file(s)${card.orphan ? " \xB7 \u{1F7E1} no importers (possible dead code)" : ""}`,
    `> importers: ${importers}`,
    `> defines: ${card.symbols.map((symbol) => symbol.name).join(", ") || "(no exported symbols)"}`
  ].join("\n");
}

// src/cli/commands/install.ts
init_esm_shims();
function createInstallCommand() {
  return new Command("install").description("Bootstrap the framework into the current project").option("--project-root <path>", "Project root", process.cwd()).action((options) => {
    const result = bootstrapFramework(options.projectRoot);
    console.log(JSON.stringify(result, null, 2));
  });
}

// src/cli/commands/intake.ts
init_esm_shims();

// src/providers/github-issues-ticket-provider.ts
init_esm_shims();

// src/providers/jira-ticket-provider.ts
init_esm_shims();
function asString(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}
function extractAcceptanceCriteria(description) {
  const text = asString(description);
  if (!text) {
    return [];
  }
  return text.split("\n").map((line) => line.trim()).filter((line) => /^[-*]\s+/.test(line)).map((line) => line.replace(/^[-*]\s+/, ""));
}

// src/providers/github-issues-ticket-provider.ts
var GITHUB_ISSUE_JSON_FIELDS = ["number", "title", "body", "labels", "state", "url"];
var GithubIssuesTicketProvider = class {
  constructor(invoke) {
    this.invoke = invoke;
  }
  invoke;
  kind = "github-issues";
  async fetchTicket(ref) {
    const number = normalizeIssueNumber(ref);
    const stdout = await this.invoke([
      "issue",
      "view",
      number,
      "--json",
      GITHUB_ISSUE_JSON_FIELDS.join(",")
    ]);
    return normalizeGithubIssue(parseJson(stdout), ref);
  }
  listTransitions() {
    return Promise.resolve([]);
  }
  transition() {
    return Promise.reject(new Error("GithubIssuesTicketProvider is read-only (intake only)."));
  }
  addComment() {
    return Promise.reject(new Error("GithubIssuesTicketProvider is read-only (intake only)."));
  }
  updateFields() {
    return Promise.reject(new Error("GithubIssuesTicketProvider is read-only (intake only)."));
  }
};
function normalizeIssueNumber(ref) {
  return ref.trim().replace(/^#/, "").replace(/^gh-/i, "");
}
function parseJson(stdout) {
  try {
    return JSON.parse(stdout);
  } catch {
    return {};
  }
}
function asRecord(value) {
  return value && typeof value === "object" ? value : {};
}
function asString2(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}
function normalizeGithubIssue(raw, ref) {
  const issue = asRecord(raw);
  const number = typeof issue.number === "number" ? issue.number : normalizeIssueNumber(ref);
  const labels2 = Array.isArray(issue.labels) ? issue.labels.map((label) => asString2(asRecord(label).name)).filter((name) => name !== "") : [];
  return {
    id: `#${number}`,
    type: labels2.find((name) => /^(type|kind):/i.test(name))?.replace(/^[^:]+:/, "").trim() || "Issue",
    title: asString2(issue.title),
    description: asString2(issue.body),
    acceptance_criteria: extractAcceptanceCriteria(issue.body),
    status: asString2(issue.state, "OPEN"),
    url: asString2(issue.url)
  };
}

// src/cli/commands/intake.ts
function classifyRef(ref) {
  const trimmed = ref.trim();
  if (/^#?\d+$/.test(trimmed) || /^gh-\d+$/i.test(trimmed)) return "github-issues";
  if (/^[A-Z][A-Z0-9]+-\d+$/.test(trimmed)) return "jira";
  return "unknown";
}
function renderTicket(ticket) {
  const ac = ticket.acceptance_criteria.length > 0 ? "\n" + ticket.acceptance_criteria.map((c) => `  - ${c}`).join("\n") : " (none detected)";
  return [
    `**\u25B8 paqad** \xB7 fetched ${ticket.id} \u2014 building what it actually says`,
    `> **${ticket.title}** [${ticket.status}] (${ticket.type})`,
    `> ${ticket.url}`,
    ``,
    `Acceptance criteria:${ac}`,
    ``,
    ticket.description || "(no description)"
  ].join("\n");
}
async function runIntakeFetch(ref, deps) {
  const kind = classifyRef(ref);
  if (kind === "jira") {
    return {
      exitCode: 0,
      output: `**\u25B8 paqad** \xB7 ${ref} looks like a Jira ticket
> Jira intake runs through the Atlassian MCP in your session \u2014 fetch ${ref} via the MCP and ground the spec in it. (The CLI drives GitHub issues directly; Jira is MCP-only.)`
    };
  }
  if (kind === "unknown") {
    return {
      exitCode: 1,
      output: `**\u25B8 paqad** \xB7 could not recognise "${ref}" as a ticket reference
> Use a GitHub issue (\`#<number>\`) or a Jira key (\`PROJ-<number>\`).`
    };
  }
  let ticket;
  try {
    ticket = await new GithubIssuesTicketProvider(deps.ghInvoke).fetchTicket(ref);
  } catch (error) {
    return {
      exitCode: 1,
      output: `**\u25B8 paqad** \xB7 couldn't fetch ${ref} from GitHub
> ${error instanceof Error ? error.message : String(error)}
> Is \`gh\` installed and authenticated (\`gh auth status\`)?`
    };
  }
  deps.recordStage?.("ticket_intake", "start");
  deps.recordStage?.("ticket_intake", "end");
  return { exitCode: 0, output: renderTicket(ticket) };
}
function createIntakeCommand() {
  const intake = new Command("intake").description(
    "Deterministic ticket intake \u2014 fetch the real ticket a request references"
  );
  intake.command("fetch").description(
    "Fetch a ticket by ref (GitHub `#<number>` via gh; Jira `PROJ-<number>` via MCP in-session)"
  ).argument("<ref>", "Ticket reference, e.g. #<number> or PQD-<number>").option("--project-root <path>", "Project root", process.cwd()).option("--session <id>", "Session id for the optional ticket_intake stage row").action(async (ref, options) => {
    const projectRoot = options.projectRoot;
    const sessionId = resolveSessionId(
      projectRoot,
      options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
    );
    const ghInvoke = async (args) => {
      const result2 = await execa("gh", args, { cwd: projectRoot, reject: false });
      if (result2.exitCode !== 0) {
        throw new Error(result2.stderr || `gh exited ${result2.exitCode}`);
      }
      return result2.stdout ?? "";
    };
    const result = await runIntakeFetch(ref, {
      ghInvoke,
      projectRoot,
      sessionId,
      recordStage: (stage, phase) => {
        try {
          recordMarkedStage(projectRoot, { sessionId, stage, phase });
        } catch {
        }
      }
    });
    if (result.exitCode === 0) {
      console.log(result.output);
    } else {
      console.error(result.output);
      process.exitCode = result.exitCode;
    }
  });
  return intake;
}

// src/cli/commands/join.ts
init_esm_shims();
import { execFileSync as execFileSync5 } from "child_process";
import { existsSync as existsSync41, mkdirSync as mkdirSync13 } from "fs";
import { join as join69 } from "path";

// src/cli/commands/rag.ts
init_esm_shims();
import { readFileSync as readFileSync38 } from "fs";
import { isAbsolute as isAbsolute6, join as join68 } from "path";

// src/code-knowledge/refresh.ts
init_esm_shims();
var SOURCE_EXTENSION_RE = /\.(?:tsx?|jsx?|mjs|cjs|php|dart)$/;
function gitChanged(git2, header) {
  return (git2.branch ?? null) !== header.branch || (git2.head_commit ?? null) !== header.head_commit;
}
async function refreshCodeKnowledgeIndex(projectRoot, options = {}) {
  const existing = readCodeKnowledgeIndex(projectRoot);
  if (existing === null) {
    return { refreshed: false, reason: "no-index", reparsed: [] };
  }
  const now = options.now ?? (() => (/* @__PURE__ */ new Date()).toISOString());
  const git2 = options.gitState ?? readGitState(projectRoot);
  if (gitChanged(git2, existing.header)) {
    const rebuilt = await buildCodeKnowledgeIndex(projectRoot, { now, gitState: git2 });
    const path3 = writeCodeKnowledgeIndex(projectRoot, rebuilt);
    return {
      refreshed: true,
      reason: "full-rebuild",
      reparsed: rebuilt.files.map((file) => file.path),
      path: path3
    };
  }
  const requested = options.changedFiles ?? (await loadChangeEvidence(projectRoot)).files;
  const changed = requested.filter((file) => SOURCE_EXTENSION_RE.test(file));
  if (changed.length === 0) {
    return { refreshed: false, reason: "up-to-date", reparsed: [] };
  }
  const merged = await incrementalIndex(projectRoot, existing, changed, now, git2);
  const path2 = writeCodeKnowledgeIndex(projectRoot, merged);
  return { refreshed: true, reason: "incremental", reparsed: changed, path: path2 };
}
async function incrementalIndex(projectRoot, existing, changed, now, git2) {
  const changedSet = new Set(changed);
  const currentFiles = new Set(scanWorkingTree(projectRoot, SOURCE_GLOBS));
  const entryPoints = resolveEntryPoints(projectRoot);
  const resolver = loadModuleSlugResolver(projectRoot);
  const exportsByFile = /* @__PURE__ */ new Map();
  for (const symbol of existing.symbols) {
    if (changedSet.has(symbol.file)) continue;
    const set = exportsByFile.get(symbol.file) ?? /* @__PURE__ */ new Set();
    set.add(symbol.name);
    exportsByFile.set(symbol.file, set);
  }
  const contentByFile = await readSourceFiles(
    projectRoot,
    changed.filter((file) => currentFiles.has(file))
  );
  const newSymbols = [];
  for (const [file, content] of contentByFile) {
    const names = /* @__PURE__ */ new Set();
    const extracted = extractSymbols(file, content);
    for (const symbol of extracted) {
      names.add(symbol.name);
      newSymbols.push({
        name: symbol.name,
        kind: symbol.kind,
        file,
        line: symbol.line,
        signature: symbol.signature,
        exported: symbol.exported,
        module_slug: resolver.slugForFile(file),
        extraction_tier: symbol.extraction_tier,
        caller_count: 0,
        orphan: false
      });
    }
    if (names.size > 0) exportsByFile.set(file, names);
  }
  const fresh = await buildEdges(
    projectRoot,
    [...contentByFile.keys()],
    contentByFile,
    exportsByFile
  );
  const keepImport = existing.import_edges.filter(
    (edge) => !changedSet.has(edge.from) && currentFiles.has(edge.from) && currentFiles.has(edge.to)
  );
  const keepReference = existing.reference_edges.filter(
    (edge) => !changedSet.has(edge.from) && currentFiles.has(edge.from) && currentFiles.has(edge.to)
  );
  const importEdges = [...keepImport, ...fresh.importEdges.filter((e) => currentFiles.has(e.to))];
  const referenceEdges = [
    ...keepReference,
    ...fresh.referenceEdges.filter((e) => currentFiles.has(e.to))
  ];
  const keptSymbols = existing.symbols.filter(
    (symbol) => !changedSet.has(symbol.file) && currentFiles.has(symbol.file)
  );
  const symbolsMinusCounts = [...keptSymbols, ...newSymbols];
  const reach = computeReachability({
    files: [...currentFiles],
    importEdges,
    referenceEdges,
    entryFiles: entryPoints.files
  });
  const symbols = symbolsMinusCounts.map((symbol) => {
    const callerCount = reach.symbolCallerCount.get(symbolKey(symbol.file, symbol.name)) ?? 0;
    return {
      ...symbol,
      caller_count: callerCount,
      orphan: callerCount === 0 && !entryPoints.files.has(symbol.file)
    };
  });
  const dependencies = existing.dependencies.length > 0 ? existing.dependencies : await computeDependencyUsage(projectRoot, [...currentFiles], contentByFile);
  return {
    schema_version: CODE_KNOWLEDGE_SCHEMA_VERSION,
    header: {
      generated_at: now(),
      branch: git2.branch ?? null,
      head_commit: git2.head_commit ?? null,
      schema_version: CODE_KNOWLEDGE_SCHEMA_VERSION,
      entry_point_globs: entryPoints.globs
    },
    symbols,
    files: reach.files,
    import_edges: importEdges,
    reference_edges: referenceEdges,
    dependencies
  };
}

// src/context/codebase-memory.ts
init_esm_shims();
import { readFileSync as readFileSync35 } from "fs";
import { join as join64 } from "path";
var MEMORY_KINDS = [
  "repo-fact",
  "decision",
  "recurring-failure",
  "style"
];
var KIND_HEADINGS = {
  "repo-fact": "Repo facts",
  decision: "Decisions",
  "recurring-failure": "Recurring failures to avoid",
  style: "House style"
};
function emptyMemoryStore() {
  return { version: 1, entries: [] };
}
var MEMORY_SECTION_CHAR_BUDGET = 2e3;
var MAX_MEMORY_ENTRIES = 20;
function memoryStorePath(projectRoot) {
  return join64(projectRoot, PATHS.CODEBASE_MEMORY);
}
function loadCodebaseMemory(projectRoot) {
  let raw;
  try {
    raw = readFileSync35(memoryStorePath(projectRoot), "utf8");
  } catch {
    return emptyMemoryStore();
  }
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || !Array.isArray(parsed.entries)) {
      return emptyMemoryStore();
    }
    const entries = parsed.entries.filter(isMemoryEntry);
    return { version: 1, entries };
  } catch {
    return emptyMemoryStore();
  }
}
function isMemoryEntry(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const entry = value;
  return typeof entry.kind === "string" && MEMORY_KINDS.includes(entry.kind) && typeof entry.key === "string" && entry.key.length > 0 && typeof entry.text === "string" && typeof entry.updated_at === "string";
}
function byRecency(a, b) {
  if (a.updated_at !== b.updated_at) {
    return a.updated_at < b.updated_at ? 1 : -1;
  }
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}
function formatEntryLine(entry) {
  const source = entry.sources && entry.sources.length > 0 ? ` (${entry.sources.join(", ")})` : "";
  return `- ${entry.text}${source}`;
}
function composeMemorySection(entries, options = {}) {
  const charBudget = options.charBudget ?? MEMORY_SECTION_CHAR_BUDGET;
  const maxEntries = options.maxEntries ?? MAX_MEMORY_ENTRIES;
  if (entries.length === 0 || maxEntries <= 0 || charBudget <= 0) {
    return "";
  }
  const ranked = [...entries].sort(byRecency).slice(0, maxEntries);
  const selected = [];
  let used = 0;
  for (const entry of ranked) {
    const lineLen = formatEntryLine(entry).length + 1;
    if (selected.length > 0 && used + lineLen > charBudget) {
      break;
    }
    selected.push(entry);
    used += lineLen;
  }
  if (selected.length === 0) {
    return "";
  }
  const groups = [];
  for (const kind of MEMORY_KINDS) {
    const ofKind = selected.filter((entry) => entry.kind === kind);
    if (ofKind.length === 0) {
      continue;
    }
    const lines = ofKind.map(formatEntryLine).join("\n");
    groups.push(`### ${KIND_HEADINGS[kind]}
${lines}`);
  }
  const noun = selected.length === 1 ? "fact" : "facts";
  return `## Codebase memory \u2014 ${selected.length} remembered ${noun}
> Durable facts learned in past sessions. Advisory, not ground truth \u2014 re-verify against the live code.

${groups.join("\n\n")}
`;
}
function gatherCodebaseMemory(projectRoot, options = {}) {
  try {
    return composeMemorySection(loadCodebaseMemory(projectRoot).entries, options);
  } catch {
    return "";
  }
}

// src/context/context-pack.ts
init_esm_shims();
var MAX_CONTEXT_PACK_ENTRIES = 12;
var MAX_HINT_CHARS = 100;
function firstMeaningfulLine(content) {
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.length > 0) {
      return trimmed.length > MAX_HINT_CHARS ? `${trimmed.slice(0, MAX_HINT_CHARS)}\u2026` : trimmed;
    }
  }
  return "";
}
function locateLineRange(fileContent, chunkContent) {
  const fileLines = fileContent.split("\n");
  const chunkLines = chunkContent.split("\n").map((line) => line.trimEnd());
  const anchorIndex = chunkLines.findIndex((line) => line.trim().length > 0);
  if (anchorIndex === -1) {
    return void 0;
  }
  const anchor = chunkLines[anchorIndex].trim();
  for (let i = 0; i < fileLines.length; i++) {
    if (fileLines[i].trim() !== anchor) {
      continue;
    }
    const start = i - anchorIndex;
    if (start < 0) {
      continue;
    }
    let matched = 0;
    for (let j = 0; j < chunkLines.length; j++) {
      const fileLine = fileLines[start + j];
      if (fileLine === void 0) {
        break;
      }
      if (fileLine.trimEnd() === chunkLines[j]) {
        matched = j + 1;
      }
    }
    if (matched >= 1) {
      return { start: start + 1, end: start + matched };
    }
  }
  return void 0;
}
function distillSlices(slices, options = {}) {
  const maxEntries = options.maxEntries ?? MAX_CONTEXT_PACK_ENTRIES;
  const seen = /* @__PURE__ */ new Set();
  const pack = [];
  for (const slice of slices) {
    if (pack.length >= maxEntries) {
      break;
    }
    let range;
    if (options.readFile) {
      let fileText;
      try {
        fileText = options.readFile(slice.source_file);
      } catch {
        fileText = void 0;
      }
      if (fileText) {
        range = locateLineRange(fileText, slice.content);
      }
    }
    const hint = firstMeaningfulLine(slice.content);
    const key = range ? `${slice.source_file}:${range.start}-${range.end}` : `${slice.source_file}:${hint}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    pack.push({
      source_file: slice.source_file,
      start_line: range?.start,
      end_line: range?.end,
      score: slice.score,
      hint
    });
  }
  return pack;
}
function formatPointer(entry) {
  const range = entry.start_line !== void 0 && entry.end_line !== void 0 ? `:L${entry.start_line}-${entry.end_line}` : "";
  const match = typeof entry.score === "number" ? ` \xB7 match ${Math.round(entry.score * 100)}%` : "";
  const hint = entry.hint ? ` \u2014 ${entry.hint}` : "";
  return `- \`${entry.source_file}${range}\`${match}${hint}`;
}
function composeContextPack(entries) {
  if (entries.length === 0) {
    return "";
  }
  const noun = entries.length === 1 ? "pointer" : "pointers";
  const lines = entries.map(formatPointer).join("\n");
  return `## Retrieved context \u2014 ${entries.length} ${noun} (read the live file at each)
> Where to look, not the code itself. Open the file at the pointer when you need the body; the match % is the index's confidence, not correctness.

${lines}
`;
}

// src/context/existing-surface.ts
init_esm_shims();
import { readFileSync as readFileSync36 } from "fs";
import { join as join65 } from "path";

// src/rag/repo-map.ts
init_esm_shims();
var PAGERANK_DAMPING = 0.85;
function pageRank(seedNodes, edges, options = {}) {
  const damping = options.damping ?? PAGERANK_DAMPING;
  const iterations = options.iterations ?? 50;
  const tolerance = options.tolerance ?? 1e-6;
  const nodes = new Set(seedNodes);
  for (const edge of edges) {
    nodes.add(edge.from);
    nodes.add(edge.to);
  }
  const nodeList = [...nodes];
  const n = nodeList.length;
  if (n === 0) {
    return /* @__PURE__ */ new Map();
  }
  const outLinks = /* @__PURE__ */ new Map();
  for (const edge of edges) {
    if (edge.from === edge.to) {
      continue;
    }
    const list2 = outLinks.get(edge.from) ?? [];
    list2.push(edge.to);
    outLinks.set(edge.from, list2);
  }
  let rank2 = new Map(nodeList.map((node) => [node, 1 / n]));
  const base = (1 - damping) / n;
  for (let iteration = 0; iteration < iterations; iteration++) {
    const next = new Map(nodeList.map((node) => [node, base]));
    let danglingMass = 0;
    for (const node of nodeList) {
      const links = outLinks.get(node);
      if (!links || links.length === 0) {
        danglingMass += rank2.get(node) ?? 0;
      }
    }
    const danglingShare = damping * danglingMass / n;
    for (const node of nodeList) {
      if (danglingShare > 0) {
        next.set(node, (next.get(node) ?? 0) + danglingShare);
      }
      const links = outLinks.get(node);
      if (!links || links.length === 0) {
        continue;
      }
      const contribution = damping * (rank2.get(node) ?? 0) / links.length;
      for (const target of links) {
        next.set(target, (next.get(target) ?? 0) + contribution);
      }
    }
    let delta = 0;
    for (const node of nodeList) {
      delta += Math.abs((next.get(node) ?? 0) - (rank2.get(node) ?? 0));
    }
    rank2 = next;
    if (delta < tolerance) {
      break;
    }
  }
  return rank2;
}
var DEFAULT_REPO_MAP_TOKEN_BUDGET = 1500;
var MAX_SYMBOLS_PER_FILE = 6;
function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}
function formatEntryLine2(entry) {
  const parts = [`- \`${entry.path}\``];
  if (entry.module) {
    parts.push(`\xB7 ${entry.module}`);
  }
  if (entry.symbols.length > 0) {
    parts.push(`\xB7 ${entry.symbols.slice(0, MAX_SYMBOLS_PER_FILE).join(", ")}`);
  }
  return parts.join(" ");
}
function buildRepoMap(files, edges, options = {}) {
  const tokenBudget = options.tokenBudget ?? DEFAULT_REPO_MAP_TOKEN_BUDGET;
  const ranks = pageRank(
    files.map((file) => file.path),
    edges
  );
  const entries = files.map((file) => ({
    path: file.path,
    module: file.module,
    symbols: file.symbols ?? [],
    rank: ranks.get(file.path) ?? 0
  })).sort((left, right) => {
    if (right.rank !== left.rank) {
      return right.rank - left.rank;
    }
    return left.path < right.path ? -1 : left.path > right.path ? 1 : 0;
  });
  if (entries.length === 0) {
    return { entries, skeleton: "", truncated: false };
  }
  const header = `## Repo map \u2014 ${entries.length} files ranked by structural importance
> Embedding-free orientation. Use it to decide where to read or grep; verify against the live files.
`;
  let tokens = estimateTokens(header);
  const lines = [];
  let truncated = false;
  for (const entry of entries) {
    const line = formatEntryLine2(entry);
    const lineTokens = estimateTokens(line) + 1;
    if (lines.length > 0 && tokens + lineTokens > tokenBudget) {
      truncated = true;
      break;
    }
    lines.push(line);
    tokens += lineTokens;
  }
  const body = truncated ? `${lines.join("\n")}
\u2026[repo map truncated to fit the token budget]` : lines.join("\n");
  return { entries, skeleton: `${header}
${body}
`, truncated };
}
async function buildProjectRepoMap(projectRoot, options) {
  const edges = await scanImports({
    projectRoot,
    files: options.files,
    aliases: options.aliases ?? { "@/": "src/" }
  });
  const files = options.files.map((path2) => ({
    path: path2,
    module: options.moduleOf?.(path2),
    symbols: options.symbolsOf?.(path2)
  }));
  return buildRepoMap(files, edges, { tokenBudget: options.tokenBudget });
}

// src/context/existing-surface.ts
var EXISTING_SURFACE_HEADING = "## Existing surface";
var EXISTING_SURFACE_FRAMING = "> Before writing new helpers, check this surface \u2014 these already exist in this project.";
function estimateTokens2(text) {
  return Math.ceil(text.length / 4);
}
function formatCardLine(card) {
  const head = card.signature?.trim() ? card.signature.trim() : card.name;
  const location = card.line ? `${card.file}:${card.line}` : card.file;
  const parts = [`- \`${head}\` \u2014 ${location}`];
  if (typeof card.callerCount === "number") {
    parts.push(`\xB7 called from ${card.callerCount} ${card.callerCount === 1 ? "place" : "places"}`);
  }
  if (card.module) {
    parts.push(`\xB7 ${card.module}`);
  }
  return parts.join(" ");
}
function headerFor(shown) {
  return `${EXISTING_SURFACE_HEADING} \u2014 ${shown} existing symbol${shown === 1 ? "" : "s"} for the files in play`;
}
function composeExistingSurfaceSection(cards, options = {}) {
  if (cards.length === 0) {
    return "";
  }
  const tokenBudget = options.tokenBudget ?? DEFAULT_EXISTING_SURFACE_TOKENS;
  let tokens = estimateTokens2(EXISTING_SURFACE_FRAMING) + estimateTokens2(headerFor(cards.length));
  const lines = [];
  let truncated = false;
  for (const card of cards) {
    const line = formatCardLine(card);
    const lineTokens = estimateTokens2(line) + 1;
    if (lines.length > 0 && tokens + lineTokens > tokenBudget) {
      truncated = true;
      break;
    }
    lines.push(line);
    tokens += lineTokens;
  }
  const remaining = cards.length - lines.length;
  const trailer = truncated && remaining > 0 ? `
\u2026and ${remaining} more exported symbol${remaining === 1 ? "" : "s"} \u2014 run \`paqad-ai index query <name>\` to look one up.` : "";
  return `${headerFor(lines.length)}
${EXISTING_SURFACE_FRAMING}

${lines.join("\n")}${trailer}
`;
}
var SOURCE_EXT_RE = /\.(?:ts|tsx|js|jsx|mjs|cjs|php|dart)$/;
function toPosix(path2) {
  return path2.replace(/\\/g, "/").replace(/^\.\//, "");
}
function modulePrefix(path2) {
  return path2.split("/").slice(0, 2).join("/");
}
function basenameNoExt(path2) {
  const base = path2.slice(path2.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? base : base.slice(0, dot);
}
function selectCandidateFiles(allFiles, workingSet, query, index) {
  const working = new Set(workingSet);
  const workingModules = new Set([...working].map(modulePrefix));
  if (working.size === 0 && query.trim().length === 0) {
    return [];
  }
  const queryLower = query.toLowerCase();
  const wanted = /* @__PURE__ */ new Set();
  for (const file of allFiles) {
    if (working.has(file) || workingModules.size > 0 && workingModules.has(modulePrefix(file))) {
      wanted.add(file);
      continue;
    }
    const base = basenameNoExt(file).toLowerCase();
    if (base.length >= 4 && queryLower.includes(base)) {
      wanted.add(file);
    }
  }
  if (index && queryLower.length > 0) {
    for (const symbol of index.symbols) {
      if (symbol.name.length >= 5 && queryLower.includes(symbol.name.toLowerCase())) {
        wanted.add(symbol.file);
      }
    }
  }
  const universe = new Set(allFiles);
  return [...wanted].filter((file) => universe.has(file));
}
async function gatherExistingSurface(projectRoot, options = {}) {
  try {
    const tokenBudget = options.tokenBudget ?? DEFAULT_EXISTING_SURFACE_TOKENS;
    const query = options.query ?? "";
    const index = readCodeKnowledgeIndex(projectRoot);
    const workingSet = (options.changedPaths ?? []).map(toPosix).filter((path2) => SOURCE_EXT_RE.test(path2));
    const allFiles = index ? index.files.map((file) => file.path) : scanWorkingTree(projectRoot, SOURCE_GLOBS).map(toPosix);
    const candidates = selectCandidateFiles(allFiles, workingSet, query, index);
    if (candidates.length === 0) {
      return "";
    }
    const symbolsByFile = /* @__PURE__ */ new Map();
    if (index) {
      for (const symbol of index.symbols) {
        const list2 = symbolsByFile.get(symbol.file) ?? [];
        list2.push(symbol);
        symbolsByFile.set(symbol.file, list2);
      }
    }
    const moduleResolver = buildModuleRoleResolver(projectRoot);
    const repoMap = await buildProjectRepoMap(projectRoot, {
      files: candidates,
      moduleOf: (path2) => moduleResolver(path2),
      symbolsOf: index ? (path2) => (symbolsByFile.get(path2) ?? []).map((symbol) => symbol.name) : (path2) => extractNames(projectRoot, path2)
    });
    const cards = [];
    for (const entry of repoMap.entries) {
      if (index) {
        const symbols = (symbolsByFile.get(entry.path) ?? []).slice().sort((a, b) => b.caller_count - a.caller_count || a.name.localeCompare(b.name));
        for (const symbol of symbols) {
          cards.push({
            name: symbol.name,
            signature: symbol.signature,
            file: symbol.file,
            line: symbol.line,
            callerCount: symbol.caller_count,
            module: symbol.module_slug ?? entry.module ?? void 0
          });
        }
      } else {
        for (const name of entry.symbols) {
          cards.push({ name, file: entry.path, module: entry.module });
        }
      }
    }
    return composeExistingSurfaceSection(cards, { tokenBudget });
  } catch {
    return "";
  }
}
function extractNames(projectRoot, relPath) {
  try {
    const content = readFileSync36(join65(projectRoot, relPath), "utf8");
    return extractSymbols(relPath, content).map((symbol) => symbol.name);
  } catch {
    return [];
  }
}

// src/context/retrieval-context.ts
init_esm_shims();
import { basename as basename2 } from "path";
var MAX_RETRIEVAL_SLICES = 5;
var DOC_SCOPE_PREFIXES = ["docs/instructions/", "docs/modules/"];
function isDocScopedPath(path2) {
  const normalized = path2.replace(/\\/g, "/").replace(/^\.\//, "");
  return DOC_SCOPE_PREFIXES.some((prefix) => normalized.startsWith(prefix)) || normalized.endsWith("module-map.yml");
}
var CODE_WORKFLOWS = /* @__PURE__ */ new Set([
  "feature-development",
  "bug-fix",
  "refactor",
  "migration",
  "test-improvement",
  "architecture-change",
  "schema-change",
  "query-optimization",
  "root-cause-analysis",
  "cleanup",
  "investigation",
  "pentest",
  "pentest-retest"
]);
function scopeForWorkflow(workflow) {
  return workflow && CODE_WORKFLOWS.has(workflow) ? "all" : "docs";
}
function filterToScope(slices, scope) {
  if (scope === "all") {
    return [...slices];
  }
  const wantDoc = scope === "docs";
  return slices.filter((slice) => isDocScopedPath(slice.source_file) === wantDoc);
}
var MAX_SLICE_CHARS = 1200;
function truncateSlice(content) {
  const body = content.trim();
  if (body.length <= MAX_SLICE_CHARS) {
    return body;
  }
  return `${body.slice(0, MAX_SLICE_CHARS)}
\u2026[slice truncated at ${MAX_SLICE_CHARS} chars]`;
}
function formatScore(score) {
  if (typeof score !== "number") {
    return "";
  }
  return ` \xB7 match ${Math.round(score * 100)}%`;
}
function dedupeSlices(slices) {
  const seen = /* @__PURE__ */ new Set();
  const unique = [];
  for (const slice of slices) {
    const key = `${slice.source_file}\0${slice.content}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(slice);
  }
  return unique;
}
function composeRetrievalSection(slices, opts = {}) {
  if (slices.length === 0) {
    if (typeof opts.bestScore === "number") {
      return `## Retrieved context \u2014 none above the confidence floor (best match ${Math.round(
        opts.bestScore * 100
      )}%)
> The index had no slice confident enough to inject for the files in play; read the live files directly.
`;
    }
    return "";
  }
  const capped = dedupeSlices(slices).slice(0, MAX_RETRIEVAL_SLICES);
  const lowConfidence = capped.some((slice) => slice.lowConfidence);
  const blocks = capped.map(
    (slice) => `### ${slice.source_file}${formatScore(slice.score)}
\`\`\`
${truncateSlice(
      slice.content
    )}
\`\`\``
  ).join("\n\n");
  const noun = capped.length === 1 ? "slice" : "slices";
  const heading = lowConfidence ? `## Retrieved context \u2014 ${capped.length} low-confidence ${noun} (nothing cleared the confidence floor)` : `## Retrieved context \u2014 ${capped.length} ${noun} relevant to the files in play`;
  const guidance = lowConfidence ? `> Weak matches, below the confidence floor \u2014 treat as loose leads only and verify against the live files before relying on them.` : `> Advisory hints retrieved from the index, not ground truth. Re-read the live files before relying on them; the match % is the index's confidence, not correctness.`;
  return `${heading}
${guidance}

${blocks}
`;
}
function deriveScopeFromWorkingSet(paths) {
  if (paths.length <= 1) {
    return "single-file";
  }
  const modules = new Set(
    paths.map((path2) => path2.replace(/\\/g, "/").split("/").slice(0, 2).join("/"))
  );
  if (modules.size <= 1) {
    return "single-module";
  }
  if (modules.size <= 3) {
    return "multi-module";
  }
  return "system-wide";
}
function buildWorkingSetQuery(changedPaths) {
  return {
    taskDescription: `Context for work in progress on: ${changedPaths.join(", ")}`,
    keywords: changedPaths.map((path2) => basename2(path2))
  };
}
async function gatherWorkingSetSlices(projectRoot, options = {}) {
  const changedPaths = options.changedPaths ?? (await loadChangeEvidence(projectRoot)).files;
  const promptQuery = options.query?.trim();
  if (changedPaths.length === 0 && !promptQuery) {
    return { slices: [], bestScore: null };
  }
  const intelligence = normalizeIntelligenceConfig(readProjectProfile(projectRoot)?.intelligence);
  let effectiveTopN = options.topN;
  if (effectiveTopN === void 0) {
    const routing = options.routing ?? { scope: deriveScopeFromWorkingSet(changedPaths) };
    const gate = gateRetrieval({ ...routing, baseTopN: intelligence.rag_top_n });
    if (gate.skip) {
      return { slices: [], bestScore: null };
    }
    effectiveTopN = gate.topN;
  }
  const retrievalInput = promptQuery ? { taskDescription: promptQuery, keywords: changedPaths.map((path2) => basename2(path2)) } : buildWorkingSetQuery(changedPaths);
  const service = options.service ?? new RagService(projectRoot);
  let result;
  try {
    result = await service.retrieveForEval(retrievalInput, effectiveTopN, {
      skipSync: options.skipSync === true
    });
  } catch {
    return { slices: [], bestScore: null };
  }
  const slices = result.retrieved_chunks.map((chunk) => ({
    source_file: chunk.source_file,
    content: chunk.content,
    score: result.vector_scores.get(chunk.id),
    lowConfidence: result.low_confidence === true
  }));
  const bestScore = typeof result.best_score === "number" ? result.best_score : null;
  const scope = options.scope ?? scopeForWorkflow(options.routing?.workflow);
  if (options.recordEvidence) {
    recordRagEvidence(
      projectRoot,
      "called",
      {
        query_scope: scope === "all" ? "all" : scope === "code" ? "code" : "docs",
        top_n: effectiveTopN,
        candidates: result.retrieved_chunks.length
      },
      {
        ragEnabled: true,
        adapter: options.recordEvidence.adapter ?? "engine",
        sessionId: options.recordEvidence.sessionId
      }
    );
  }
  return { slices: filterToScope(slices, scope), bestScore };
}

// src/rag/background-sync.ts
init_esm_shims();
import { join as join66 } from "path";
var STALE_LOCK_MS = 10 * 60 * 1e3;
async function backgroundIndexSync(projectRoot, providerFactory) {
  const lockDir = join66(projectRoot, PATHS.LOCKS_DIR, "rag-sync.lock");
  const lock = tryAcquireLock(lockDir, { staleLockMs: STALE_LOCK_MS });
  if (!lock.acquired) {
    return { synced: false, reason: "in-flight" };
  }
  try {
    const service = new RagService(projectRoot, providerFactory);
    const status = await service.getStatus();
    if (!status.enabled) {
      return { synced: false, reason: "disabled" };
    }
    if (!status.index_present || !status.valid) {
      return { synced: false, reason: "no-index" };
    }
    await service.refreshContext();
    return { synced: true };
  } catch {
    return { synced: false, reason: "error" };
  } finally {
    releaseLock(lockDir);
  }
}

// src/rag/base-drift.ts
init_esm_shims();
import { execFileSync as execFileSync4 } from "child_process";
import { readFileSync as readFileSync37 } from "fs";
import { join as join67 } from "path";

// src/background/debounce-marker.ts
init_esm_shims();
import { mkdirSync as mkdirSync12, statSync as statSync8, utimesSync, writeFileSync as writeFileSync13 } from "fs";
import { dirname as dirname17 } from "path";
function shouldDebounce(markerPath, debounceMs, now = Date.now) {
  if (debounceMs <= 0) {
    return false;
  }
  let mtimeMs;
  try {
    mtimeMs = statSync8(markerPath).mtimeMs;
  } catch {
    return false;
  }
  return now() - mtimeMs < debounceMs;
}
function touchMarker(markerPath, now = Date.now) {
  try {
    mkdirSync12(dirname17(markerPath), { recursive: true });
  } catch {
  }
  const seconds = now() / 1e3;
  try {
    utimesSync(markerPath, seconds, seconds);
  } catch {
    writeFileSync13(markerPath, "");
    try {
      utimesSync(markerPath, seconds, seconds);
    } catch {
    }
  }
}

// src/rag/base-drift.ts
var DEFAULT_BASE_DRIFT_INTERVAL_MS = 10 * 60 * 1e3;
var STALE_LOCK_MS2 = 10 * 60 * 1e3;
function defaultGit(projectRoot) {
  return (args) => {
    try {
      return execFileSync4("git", args, {
        cwd: projectRoot,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"]
      }).trim();
    } catch {
      return void 0;
    }
  };
}
function computeBaseDrift(projectRoot, options = {}) {
  const git2 = options.git ?? defaultGit(projectRoot);
  const remote = options.remote ?? "origin";
  const state = readGitState(projectRoot, { baseBranch: options.baseBranch });
  if (!state.base_branch || !state.base_commit) {
    return null;
  }
  const remoteRef = `${remote}/${state.base_branch}`;
  if (git2(["rev-parse", "--verify", "--quiet", `${remoteRef}^{commit}`]) === void 0) {
    return null;
  }
  const aheadRaw = git2(["rev-list", "--count", `${state.base_commit}..${remoteRef}`]);
  const ahead = aheadRaw !== void 0 && /^\d+$/.test(aheadRaw) ? Number(aheadRaw) : 0;
  return {
    base_branch: state.base_branch,
    remote_ref: remoteRef,
    ahead,
    checked_at: (/* @__PURE__ */ new Date()).toISOString()
  };
}
async function refreshBaseDrift(projectRoot, options = {}) {
  const now = options.now ?? Date.now;
  const minIntervalMs = options.minIntervalMs ?? DEFAULT_BASE_DRIFT_INTERVAL_MS;
  const markerPath = join67(projectRoot, PATHS.BASE_DRIFT_MARKER);
  if (shouldDebounce(markerPath, minIntervalMs, now)) {
    return { refreshed: false, reason: "debounced" };
  }
  const lockDir = join67(projectRoot, PATHS.BASE_DRIFT_LOCK);
  const lock = tryAcquireLock(lockDir, { staleLockMs: STALE_LOCK_MS2 });
  if (!lock.acquired) {
    return { refreshed: false, reason: "in-flight" };
  }
  touchMarker(markerPath, now);
  try {
    const git2 = options.git ?? defaultGit(projectRoot);
    const remote = options.remote ?? "origin";
    const state = readGitState(projectRoot, { baseBranch: options.baseBranch });
    if (!state.base_branch) {
      return { refreshed: false, reason: "no-base" };
    }
    const base = state.base_branch;
    const remoteRef = `${remote}/${base}`;
    const lsRemote = git2(["ls-remote", remote, base]);
    const remoteTip = lsRemote ? lsRemote.split(/\s+/)[0] : void 0;
    const localRemoteTip = git2(["rev-parse", "--verify", "--quiet", remoteRef]);
    if (remoteTip && remoteTip !== localRemoteTip) {
      git2(["fetch", "--quiet", remote, base]);
    }
    const snapshot = computeBaseDrift(projectRoot, options);
    if (snapshot) {
      await atomicWriteFile(
        join67(projectRoot, PATHS.BASE_DRIFT_STATE),
        `${JSON.stringify(snapshot, null, 2)}
`
      );
    }
    return { refreshed: true };
  } catch {
    return { refreshed: false, reason: "error" };
  } finally {
    releaseLock(lockDir);
  }
}
function loadBaseDrift(projectRoot) {
  try {
    const parsed = JSON.parse(
      readFileSync37(join67(projectRoot, PATHS.BASE_DRIFT_STATE), "utf8")
    );
    if (typeof parsed === "object" && parsed !== null && typeof parsed.base_branch === "string" && typeof parsed.ahead === "number") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}
function composeBaseDriftSection(snapshot) {
  if (!snapshot || snapshot.ahead <= 0) {
    return "";
  }
  const commits = snapshot.ahead === 1 ? "1 commit" : `${snapshot.ahead} commits`;
  return `## Base drift
> Heads up: \`${snapshot.remote_ref}\` is ${commits} ahead of where this branch started. Pull or rebase before relying on the base being current.
`;
}

// src/rag/eval-dataset.ts
init_esm_shims();
var EVAL_DATASET = [
  {
    id: "sl-1",
    query_class: "simple-lexical",
    task_description: "authorization check failing in the gate",
    keywords: ["authorization"],
    expected_file: "src/security/auth-gates.ts"
  },
  {
    id: "sl-2",
    query_class: "simple-lexical",
    task_description: "coupon redemption error in billing",
    keywords: ["coupon"],
    expected_file: "src/billing/coupon-ledger.ts"
  },
  {
    id: "vm-1",
    query_class: "vocabulary-mismatch",
    task_description: "access control problem for admin users",
    keywords: ["access", "admin"],
    expected_file: "src/security/auth-gates.ts"
  },
  {
    id: "vm-2",
    query_class: "vocabulary-mismatch",
    task_description: "email sending failing for registered users",
    keywords: ["email", "sending"],
    expected_file: "src/notifications/mailer.ts"
  },
  {
    id: "am-1",
    query_class: "ambiguous",
    task_description: "fix the bug in the service layer",
    keywords: ["bug", "service"]
  },
  {
    id: "am-2",
    query_class: "ambiguous",
    task_description: "improve the overall performance",
    keywords: ["performance"]
  },
  {
    id: "mp-1",
    query_class: "multi-part",
    task_description: "fix authorization bug and update the mailer template",
    keywords: ["authorization", "notification"]
  },
  {
    id: "mp-2",
    query_class: "multi-part",
    task_description: "refactor coupon logic and add background retry worker",
    keywords: ["coupon", "retry"]
  },
  {
    id: "wt-1",
    query_class: "workflow-triggering",
    task_description: "run a security audit on the authorization module",
    keywords: ["security", "audit", "authorization"],
    workflow_trigger: "pentest"
  },
  {
    id: "wt-2",
    query_class: "workflow-triggering",
    task_description: "investigate the root cause of the payment failure",
    keywords: ["root-cause", "payment"],
    workflow_trigger: "root-cause-analysis"
  },
  {
    id: "ng-1",
    query_class: "negative",
    task_description: "rename variable x to itemCount",
    keywords: ["rename"],
    should_skip_retrieval: true
  },
  {
    id: "ng-2",
    query_class: "negative",
    task_description: "add a comment to explain this line",
    keywords: ["comment"],
    should_skip_retrieval: true
  }
];

// src/rag/eval-runner.ts
init_esm_shims();
function computeHitAtK(dataset, traces, k) {
  const eligible = dataset.filter((item) => item.expected_file && !item.should_skip_retrieval);
  if (eligible.length === 0) return 0;
  const hits = eligible.filter((item) => {
    const trace = traces.find((t) => t.item_id === item.id);
    if (!trace) return false;
    const topK = trace.first_stage_chunk_ids.slice(0, k);
    const expected = item.expected_file.replace(/\\/g, "/");
    return topK.some((id) => id.replace(/\\/g, "/").endsWith(expected));
  });
  return hits.length / eligible.length;
}
function computeTaskSuccessRate(dataset, traces) {
  if (dataset.length === 0) return 0;
  let successes = 0;
  for (const item of dataset) {
    const trace = traces.find((candidate) => candidate.item_id === item.id);
    if (!trace) {
      continue;
    }
    if (item.should_skip_retrieval) {
      if ((trace.retrieval_depth ?? "standard") === "none" && trace.first_stage_chunk_ids.length === 0) {
        successes += 1;
      }
      continue;
    }
    if (item.workflow_trigger) {
      if (trace.routed_workflow_id === item.workflow_trigger) {
        successes += 1;
      }
      continue;
    }
    if (item.expected_file) {
      const expected = item.expected_file.replace(/\\/g, "/");
      if (trace.packed_chunk_ids.some((id) => id.replace(/\\/g, "/").endsWith(expected))) {
        successes += 1;
      }
      continue;
    }
    if (trace.packed_chunk_ids.length > 0) {
      successes += 1;
    }
  }
  return successes / dataset.length;
}
function computeCorrectionTurns(dataset, traces) {
  if (dataset.length === 0) return 0;
  return 1 - computeTaskSuccessRate(dataset, traces);
}
function computePromptTokensSent(traces) {
  return traces.reduce((sum2, trace) => sum2 + (trace.packed_token_count ?? 0), 0);
}
function snapshotFromTraces(dataset, traces) {
  return {
    hit_at_5: computeHitAtK(dataset, traces, 5),
    task_success_rate: computeTaskSuccessRate(dataset, traces),
    correction_turns: computeCorrectionTurns(dataset, traces),
    prompt_tokens_sent: computePromptTokensSent(traces),
    task_count: dataset.length
  };
}
function buildFeatureOffTraces(dataset) {
  return dataset.map((item) => ({
    item_id: item.id,
    retrieval_depth: "none",
    first_stage_chunk_ids: [],
    packed_chunk_ids: [],
    packed_token_count: 0
  }));
}
function runFeatureOffVsOnGate(dataset, onTraces, gates) {
  const off = snapshotFromTraces(dataset, buildFeatureOffTraces(dataset));
  const on = snapshotFromTraces(dataset, onTraces);
  const comparison = compareConfigurations(off, on, "feature-off-vs-on", gates);
  return { off, on, comparison };
}
var EvalRunner = class {
  constructor(grader) {
    this.grader = grader;
  }
  grader;
  run(dataset, mode, traces) {
    const resolvedTraces = traces ?? dataset.map((item) => ({
      item_id: item.id,
      first_stage_chunk_ids: [],
      packed_chunk_ids: []
    }));
    return {
      mode,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      dataset_size: dataset.length,
      traces: resolvedTraces
    };
  }
  async runModelGraded(dataset, traces) {
    if (!this.grader || dataset.length === 0) {
      return {
        retrieval_relevance: 0,
        answer_faithfulness: 0,
        action_recommendation_usefulness: 0,
        routing_correctness: 0
      };
    }
    let totalRelevance = 0;
    let totalFaithfulness = 0;
    let totalActionUsefulness = 0;
    let totalRoutingCorrectness = 0;
    for (const item of dataset) {
      const trace = traces.find((t) => t.item_id === item.id);
      const chunkIds = trace?.packed_chunk_ids ?? [];
      const answer = trace?.final_answer_or_recommendation ?? "";
      const routedWorkflow = trace?.routed_workflow_id;
      totalRelevance += await this.grader.gradeRetrievalRelevance(item.task_description, chunkIds);
      totalFaithfulness += await this.grader.gradeAnswerFaithfulness(
        item.task_description,
        answer,
        chunkIds
      );
      totalActionUsefulness += await this.grader.gradeActionUsefulness(
        item.task_description,
        answer
      );
      totalRoutingCorrectness += await this.grader.gradeRoutingCorrectness(
        item.task_description,
        routedWorkflow,
        item.workflow_trigger
      );
    }
    const count = dataset.length;
    return {
      retrieval_relevance: totalRelevance / count,
      answer_faithfulness: totalFaithfulness / count,
      action_recommendation_usefulness: totalActionUsefulness / count,
      routing_correctness: totalRoutingCorrectness / count
    };
  }
};

// src/cli/commands/rag.ts
function isInteractive() {
  return Boolean(process.stdout.isTTY && process.stdin.isTTY);
}
function printProgress(message) {
  process.stderr.write(`${message}
`);
}
var progressPrinter = createRagProgressReporter(printProgress);
async function resolveProvider(explicit, current) {
  if (explicit && EMBEDDING_PROVIDERS.includes(explicit)) {
    return explicit;
  }
  if (!isInteractive()) {
    return current ?? "local";
  }
  return dist_default3({
    message: "How should paqad-ai build your RAG index?",
    default: current ?? "local",
    choices: [
      {
        value: "local",
        name: "On my machine (FREE \u2014 no account needed)",
        description: "Runs a local embedding model with shared cache under ~/.paqad/models"
      },
      {
        value: "openai",
        name: "Using my OpenAI key",
        description: "Uses text-embedding-3-small for remote embeddings"
      }
    ]
  });
}
async function resolveLocalModel(current) {
  const fallback = current ?? DEFAULT_LOCAL_EMBEDDING_MODEL;
  if (!isInteractive()) {
    return fallback;
  }
  return dist_default3({
    message: "Which local embedding model?",
    default: fallback,
    choices: LOCAL_EMBEDDING_MODELS.map((model) => ({
      value: model.id,
      name: model.label,
      description: model.description
    }))
  });
}
async function maybePromptApiKey(service, provider, force = false) {
  if (provider === "local" || !force && service.hasApiKey(provider)) {
    return;
  }
  if (!isInteractive()) {
    throw new Error("Missing OPENAI_API_KEY");
  }
  const key = await dist_default2({
    message: "Enter your OpenAI API key",
    validate: (value) => value.trim().length > 0 ? true : "API key is required"
  });
  service.storeApiKey(provider, key.trim());
}
function formatProviderFailure(error) {
  if (error instanceof EmbeddingProviderError) {
    switch (error.code) {
      case "missing_api_key":
      case "invalid_api_key":
        return error.message;
      case "rate_limited":
        return `${error.message}. The CLI will let you retry or switch providers.`;
      case "download_failed":
        return `${error.message}. Retry to download and cache the model again.`;
      default:
        return error.message;
    }
  }
  return error instanceof Error ? error.message : String(error);
}
async function buildWithRecovery(service, current, options) {
  let provider = await resolveProvider(options.provider, current.configured_provider);
  let explicitModel = options.model;
  for (; ; ) {
    await maybePromptApiKey(service, provider);
    const carriedModel = explicitModel ?? (current.configured_provider === provider ? current.configured_model : void 0);
    const model = carriedModel ?? (provider === "local" ? await resolveLocalModel(DEFAULT_LOCAL_EMBEDDING_MODEL) : getDefaultEmbeddingModel(provider));
    try {
      const buildArgs = [
        {
          rag_enabled: true,
          embedding_provider: provider,
          embedding_model: model
        },
        progressPrinter
      ];
      return options.buildOnly ? await service.buildIndexOnly(...buildArgs) : await service.configureAndBuild(...buildArgs);
    } catch (error) {
      if (!isInteractive()) {
        throw error;
      }
      printProgress(formatProviderFailure(error));
      if (!(error instanceof EmbeddingProviderError)) {
        throw error;
      }
      if (provider === "local") {
        const retryLocal = await dist_default({
          message: "Retry downloading and building the local RAG index?",
          default: true
        });
        if (!retryLocal) {
          throw error;
        }
        continue;
      }
      const action = await dist_default3({
        message: "RAG setup failed. What would you like to do?",
        choices: [
          { value: "retry-key", name: "Retry with a new API key" },
          { value: "switch-provider", name: "Switch embedding provider" },
          { value: "cancel", name: "Cancel setup" }
        ]
      });
      if (action === "cancel") {
        throw error;
      }
      if (action === "switch-provider") {
        const nextProvider = await resolveProvider(void 0, provider);
        if (nextProvider !== provider) {
          explicitModel = void 0;
        }
        provider = nextProvider;
        continue;
      }
      await maybePromptApiKey(service, provider, true);
    }
  }
}
async function initializeRagIndex(projectRoot, options = {}) {
  assertEmbeddingProviderAvailable(projectRoot, options.provider);
  const service = new RagService(projectRoot);
  const current = options.current ?? await service.getStatus();
  return buildWithRecovery(service, current, {
    provider: options.provider,
    model: options.model,
    buildOnly: options.buildOnly
  });
}
async function runRefreshContext(options) {
  try {
    await refreshCodeKnowledgeIndex(options.projectRoot);
  } catch {
  }
  const route = readSessionRoute(options.projectRoot, options.session);
  const { loadRules, retrieves } = compositionForRoute(route);
  const intelligence = resolveFrameworkConfig(options.projectRoot).intelligence;
  const existingSurfaceSection = loadRules ? await gatherExistingSurface(options.projectRoot, {
    changedPaths: (await loadChangeEvidence(options.projectRoot)).files,
    query: route?.query,
    tokenBudget: intelligence.existing_surface_tokens
  }) : "";
  const ragEnabled = intelligence.rag_enabled;
  if (!ragEnabled) {
    const target2 = await refreshRuleContext(options.projectRoot, {
      existingSurfaceSection,
      loadRules
    });
    if (!options.quiet) {
      process.stdout.write(
        `${target2 ? `wrote ${target2}` : "nothing to compose"}; rule-only (rag off)
`
      );
    }
    return;
  }
  const removedProvider = resolveRemovedEmbeddingProvider(options.projectRoot);
  if (removedProvider) {
    appendRagAudit(options.projectRoot, "WARN", "rag-provider-removed", {
      provider: removedProvider
    });
    const target2 = await refreshRuleContext(options.projectRoot, {
      existingSurfaceSection,
      retrievalSection: `## Retrieved context \u2014 none
> Warning: ${REMOVED_EMBEDDING_PROVIDER_MESSAGE}
`,
      loadRules
    });
    process.stderr.write(`Warning: ${REMOVED_EMBEDDING_PROVIDER_MESSAGE}
`);
    if (!options.quiet) {
      process.stdout.write(
        `${target2 ? `wrote ${target2}` : "nothing to compose"}; rule-only (embedding provider removed)
`
      );
    }
    return;
  }
  const sync = await backgroundIndexSync(options.projectRoot);
  const { slices, bestScore } = retrieves ? await gatherWorkingSetSlices(options.projectRoot, {
    recordEvidence: { adapter: "engine" },
    query: route?.query,
    skipSync: true
  }) : { slices: [], bestScore: null };
  const usesContextPack = slices.length > MAX_RETRIEVAL_SLICES;
  const packEntries = usesContextPack ? distillSlices(slices, {
    readFile: (path2) => {
      try {
        return readFileSync38(isAbsolute6(path2) ? path2 : join68(options.projectRoot, path2), "utf8");
      } catch {
        return void 0;
      }
    }
  }) : [];
  const retrievalSection = usesContextPack ? composeContextPack(packEntries) : composeRetrievalSection(slices, { bestScore });
  const memorySection = retrieves ? gatherCodebaseMemory(options.projectRoot) : "";
  let driftSection = "";
  if (retrieves) {
    await refreshBaseDrift(options.projectRoot);
    driftSection = composeBaseDriftSection(loadBaseDrift(options.projectRoot));
  }
  const target = await refreshRuleContext(options.projectRoot, {
    existingSurfaceSection,
    memorySection,
    retrievalSection,
    driftSection,
    loadRules
  });
  if (retrieves) {
    const sliceCount = usesContextPack ? 0 : slices.length;
    const pointerCount = usesContextPack ? packEntries.length : 0;
    const injectedSections = [];
    if (loadRules) injectedSections.push("rules");
    if (sliceCount > 0 || pointerCount > 0) injectedSections.push("retrieval");
    if (memorySection) injectedSections.push("memory");
    if (driftSection) injectedSections.push("drift");
    recordRagEvidence(
      options.projectRoot,
      "used",
      {
        injected: sliceCount > 0 || pointerCount > 0 || Boolean(memorySection) || Boolean(driftSection),
        injected_sections: injectedSections,
        slice_count: sliceCount,
        pointer_count: pointerCount,
        score_top: bestScore,
        bytes_injected: Buffer.byteLength(
          `${retrievalSection}${memorySection}${driftSection}`,
          "utf8"
        )
      },
      { ragEnabled: true, adapter: "engine" }
    );
  }
  if (!options.quiet) {
    process.stdout.write(
      `${target ? `wrote ${target}` : "nothing to compose"}; index sync: ${sync.synced ? "done" : sync.reason}; slices: ${slices.length}
`
    );
  }
}
function createRagCommand() {
  const command = new Command("rag").description("Manage optional hybrid RAG context retrieval");
  command.command("init").description("Enable RAG for the current project and build the vector index").option("--project-root <path>", "Project root", process.cwd()).option("--provider <provider>", "Embedding provider: local, openai").option("--model <model>", "Override the default embedding model").option("--yes", "Accept rebuild prompts automatically").action(
    async (options) => {
      assertEmbeddingProviderAvailable(options.projectRoot, options.provider);
      const service = new RagService(options.projectRoot);
      const current = await service.getStatus();
      if (current.index_present && current.valid && !options.yes) {
        if (!isInteractive()) {
          process.stdout.write(`${JSON.stringify(current, null, 2)}
`);
          return;
        }
        const shouldRebuild = await dist_default({
          message: "A valid RAG index already exists. Rebuild it now?",
          default: false
        });
        if (!shouldRebuild) {
          process.stdout.write(`${JSON.stringify(current, null, 2)}
`);
          return;
        }
      }
      const status = await initializeRagIndex(options.projectRoot, {
        current,
        provider: options.provider,
        model: options.model
      });
      writeGitignore(options.projectRoot);
      process.stdout.write(`${JSON.stringify(status, null, 2)}
`);
    }
  );
  command.command("rebuild").description("Force a full vector-index rebuild").option("--project-root <path>", "Project root", process.cwd()).action(async (options) => {
    const service = new RagService(options.projectRoot);
    await service.rebuild({
      onProgress: progressPrinter
    });
    process.stdout.write(`${JSON.stringify(await service.getStatus(), null, 2)}
`);
  });
  command.command("clear").description("Delete the vector index and disable RAG").option("--project-root <path>", "Project root", process.cwd()).option("--yes", "Skip confirmation prompt").action(async (options) => {
    if (!options.yes) {
      if (!isInteractive()) {
        throw new Error("Refusing to clear RAG index without --yes in non-interactive mode");
      }
      const accepted = await dist_default({
        message: "Delete the vector index and disable RAG for this project?",
        default: false
      });
      if (!accepted) {
        return;
      }
    }
    const service = new RagService(options.projectRoot);
    await service.clear();
    process.stdout.write(`${JSON.stringify(await service.getStatus(), null, 2)}
`);
  });
  command.command("status").description("Show the current RAG configuration and index state").option("--project-root <path>", "Project root", process.cwd()).action(async (options) => {
    const service = new RagService(options.projectRoot);
    process.stdout.write(`${JSON.stringify(await service.getStatus(), null, 2)}
`);
  });
  command.command("probe <query>").description(
    "Print the top pre-floor retrieval scores for a query (diagnostic; no floor filter)"
  ).option("--project-root <path>", "Project root", process.cwd()).option("--top-n <n>", "How many candidates to show", "10").action(async (query, options) => {
    assertEmbeddingProviderAvailable(options.projectRoot);
    const service = new RagService(options.projectRoot);
    const { intelligence } = resolveFrameworkConfig(options.projectRoot);
    const floor = intelligence.rag_similarity_threshold;
    const reliefFloor = intelligence.rag_relief_floor;
    const topN = Number.parseInt(options.topN, 10);
    const candidates = await service.probe(
      { taskDescription: query, keywords: [] },
      Number.isFinite(topN) && topN > 0 ? topN : 10
    );
    const rows = candidates.map((candidate, index) => ({
      rank: index + 1,
      source_file: candidate.source_file,
      score: Number(candidate.score.toFixed(4)),
      above_floor: candidate.score >= floor,
      above_relief: candidate.score >= reliefFloor,
      gap_to_floor: Number((floor - candidate.score).toFixed(4))
    }));
    process.stdout.write(
      `${JSON.stringify(
        {
          query,
          similarity_threshold: floor,
          relief_floor: reliefFloor,
          candidates: rows.length,
          best_score: rows[0]?.score ?? null,
          rows
        },
        null,
        2
      )}
`
    );
  });
  command.command("refresh-context").description(
    "Sync the index, retrieve slices, and recompose session context (background worker)"
  ).option("--project-root <path>", "Project root", process.cwd()).option("--quiet", "Suppress output (used by the background trigger)").option("--session <id>", "Host session the refresh was started for (reads its route)").action(async (options) => {
    const hold = holdRefreshContextLock(options.projectRoot);
    if (!hold) {
      if (!options.quiet) {
        process.stdout.write("another refresh-context is running; skipped\n");
      }
      return;
    }
    try {
      await runRefreshContext(options);
    } finally {
      hold.release();
    }
  });
  command.command("eval").description("Run deterministic RAG evals against the project index and compare configurations").option("--project-root <path>", "Project root", process.cwd()).option(
    "--mode <mode>",
    "Comparison mode: lexical-vs-rag | rag-vs-candidate | feature-off-vs-on",
    "rag-vs-candidate"
  ).option("--baseline <path>", "Path to a stored RagBenchmarkSnapshot JSON for comparison").option("--model-graded", "Run the optional model-graded lane").action(
    async (options) => {
      assertEmbeddingProviderAvailable(options.projectRoot);
      const service = new RagService(options.projectRoot);
      const runner = new EvalRunner();
      const sync = await service.refreshContext();
      const mode = options.mode;
      const traces = [];
      for (const item of EVAL_DATASET) {
        if (item.should_skip_retrieval) {
          traces.push({
            item_id: item.id,
            retrieval_depth: "none",
            first_stage_chunk_ids: [],
            packed_chunk_ids: []
          });
          continue;
        }
        const ragResult = await service.retrieve(sync, {
          taskDescription: item.task_description,
          keywords: item.keywords
        });
        const packedChunks = ragResult.retrieved_chunks.slice(0, 5);
        traces.push({
          item_id: item.id,
          retrieval_depth: ragResult.chunks_retrieved > 0 ? "standard" : "none",
          first_stage_chunk_ids: ragResult.retrieved_source_files,
          packed_chunk_ids: packedChunks.map((chunk) => chunk.source_file),
          packed_token_count: packedChunks.reduce(
            (sum2, chunk) => sum2 + Math.ceil(chunk.content.length / 4),
            0
          ),
          final_answer_or_recommendation: packedChunks[0]?.source_file
        });
      }
      const result = runner.run(EVAL_DATASET, mode, traces);
      if (options.modelGraded) {
        result.model_graded = await runner.runModelGraded(EVAL_DATASET, traces);
      }
      const candidateSnapshot = snapshotFromTraces(EVAL_DATASET, traces);
      let comparison;
      if (mode === "feature-off-vs-on") {
        const ab = runFeatureOffVsOnGate(EVAL_DATASET, traces);
        comparison = ab.comparison;
        if (!comparison.evaluation.passed) {
          process.exitCode = 1;
        }
        process.stdout.write(
          `${JSON.stringify(
            {
              eval_run: result,
              feature_off_snapshot: ab.off,
              feature_on_snapshot: ab.on,
              comparison,
              gate_passed: comparison.evaluation.passed
            },
            null,
            2
          )}
`
        );
        return;
      }
      if (options.baseline) {
        const baselineSnapshot = JSON.parse(
          readFileSync38(options.baseline, "utf8")
        );
        comparison = compareConfigurations(baselineSnapshot, candidateSnapshot, mode);
      }
      process.stdout.write(
        `${JSON.stringify({ eval_run: result, candidate_snapshot: candidateSnapshot, comparison }, null, 2)}
`
      );
    }
  );
  return command;
}

// src/cli/commands/join.ts
var JOIN_NOT_ONBOARDED_MESSAGE = "This project has not been onboarded yet. Ask the project lead to run `paqad-ai onboard`, or run it yourself if you are the lead.";
var JOIN_RAG_OFF_MESSAGE = "RAG is off for this project, nothing to build.";
var JOIN_RAG_PRESENT_MESSAGE = "RAG index is already present and valid, nothing to build.";
var JOIN_RAG_BUILDING_MESSAGE = "Building your local RAG index (this stays on your machine and is not committed)...";
var JOIN_READY_MESSAGE = "Ready. Your machine is set up for this project. No tracked files changed.";
var FRAMEWORK_VERSION_EPOCH_SEED = "1970-01-01T00:00:00Z";
function createJoinCommand() {
  return new Command("join").description("Set up an already-onboarded project on your machine (no re-onboarding)").option("--project-root <path>", "Project root", process.cwd()).option("--interactive", "Opt in to prompts").option("--no-rag", "Skip the RAG step").option("--yes", "Accept the RAG build without confirming").option(
    "--non-interactive",
    "Never prompt; build the RAG index without confirming (exit 2 with missing --yes if --interactive is set with no TTY and no --yes)"
  ).action(async (options) => joinProject(options));
}
async function joinProject(options) {
  const { projectRoot } = options;
  const manifestPath = join69(projectRoot, PATHS.ONBOARDING_MANIFEST);
  const profilePath = join69(projectRoot, PATHS.PROJECT_PROFILE);
  if (!existsSync41(manifestPath) || !existsSync41(profilePath)) {
    throw new Error(JOIN_NOT_ONBOARDED_MESSAGE);
  }
  const manifest = readExistingOnboardingManifest(projectRoot);
  const profile = readProjectProfile(projectRoot, { persistMigration: false });
  if (!manifest || !profile) {
    throw new Error(JOIN_NOT_ONBOARDED_MESSAGE);
  }
  try {
    bootstrapFrameworkHome();
  } catch {
  }
  const providers = deriveRecordedProviders(manifest);
  await recreateLocalArtifacts(projectRoot, profile, providers);
  await regenerateMachineArtifacts(projectRoot);
  writeWorktreeInclude(projectRoot);
  if (options.rag !== false) {
    const shouldContinue = await joinRag(projectRoot, options);
    if (!shouldContinue) {
      return;
    }
  }
  process.stdout.write(`${JOIN_READY_MESSAGE}
`);
}
function deriveRecordedProviders(manifest) {
  const artifactPaths = new Set(
    manifest.generated_artifacts.map((artifact) => artifact.path.replaceAll("\\", "/"))
  );
  const recorded = ADAPTER_TYPES.filter((type) => {
    const configPath = AdapterFactory.create(type).getConfigPath().replaceAll("\\", "/");
    return artifactPaths.has(configPath);
  });
  return [manifest.adapter, ...recorded.filter((type) => type !== manifest.adapter)];
}
async function recreateLocalArtifacts(projectRoot, profile, providers) {
  const resolver = new Resolver({ runtimeRoot: getRuntimeRoot() });
  const resolved = await resolver.resolve({
    domain: getProfileDomain(profile),
    active_capabilities: profile.active_capabilities,
    stack_profile: profile.stack_profile,
    stack: getPrimaryStack(profile),
    capabilities: getLegacyCapabilities(profile)
  });
  const candidates = [];
  let recommendMcp = false;
  for (const provider of providers) {
    const adapter = AdapterFactory.create(provider);
    candidates.push(
      ...await adapter.generateConfig({
        frameworkPath: PATHS.FRAMEWORK_PATH,
        rulesPath: PATHS.RULES_DIR,
        projectRoot
      })
    );
    if (adapter.capabilities.hooks) {
      candidates.push(...await adapter.installHooks(resolved.hooks));
    }
    recommendMcp ||= adapter.capabilities.mcp;
    if (adapter.capabilities.caching) {
      candidates.push(...await adapter.configureCaching(profile));
    }
    if (adapter.capabilities.memory) {
      candidates.push(...await adapter.configureMemory(profile));
    }
  }
  if (recommendMcp) {
    candidates.push({ ...new McpConfigManager().generate(profile), autoUpdate: true });
  }
  writeGeneratedFiles(
    projectRoot,
    candidates.filter((candidate) => isGitIgnored(projectRoot, candidate.path))
  );
  cleanupLegacyMcpFiles(projectRoot, { canDelete: (path2) => isGitIgnored(projectRoot, path2) });
  if (isGitIgnored(projectRoot, PATHS.COMPILED_RULES)) {
    const compiled = await compileRules(projectRoot);
    await writeCompiledRules(projectRoot, compiled);
  }
  if (isGitIgnored(projectRoot, PATHS.CONTEXT_SESSION_ARTIFACT)) {
    await writeRuleContext(projectRoot);
  }
  if (isGitIgnored(projectRoot, PATHS.VECTORS_DIR)) {
    mkdirSync13(join69(projectRoot, PATHS.VECTORS_DIR), { recursive: true });
  }
  for (const dir of [
    PATHS.DECISIONS_PENDING_DIR,
    PATHS.DECISIONS_RESOLVED_DIR,
    PATHS.DECISIONS_EXPIRED_DIR
  ]) {
    if (isGitIgnored(projectRoot, dir)) {
      mkdirSync13(join69(projectRoot, dir), { recursive: true });
    }
  }
  const hookResult = installGitHooks(projectRoot);
  if (hookResult.trackedHooksDir && hookResult.snippet) {
    process.stdout.write(
      `Your git hooks directory is tracked, so paqad did not modify it. Add this yourself:
${hookResult.snippet}
`
    );
  }
  if (isGitIgnored(projectRoot, PATHS.FRAMEWORK_VERSION)) {
    writeFrameworkVersionPreservingTimestamp(
      join69(projectRoot, PATHS.FRAMEWORK_VERSION),
      VERSION,
      FRAMEWORK_VERSION_EPOCH_SEED
    );
  }
}
async function regenerateMachineArtifacts(projectRoot) {
  try {
    writeDetectionReport(projectRoot, await new Detector().detect(projectRoot));
  } catch {
  }
  try {
    const previous = await new StackSnapshotCache().read(projectRoot);
    const snapshot = await new StackIntrospector().snapshot(projectRoot);
    await writeStackArtifacts(projectRoot, snapshot, previous);
  } catch {
  }
  try {
    const index = await buildCodeKnowledgeIndex(projectRoot);
    if (validateCodeKnowledgeIndex(index).valid) {
      writeCodeKnowledgeIndex(projectRoot, index);
    }
  } catch {
  }
  try {
    await runDeliveryDetection(projectRoot, createDeliveryShell(projectRoot));
  } catch {
  }
  try {
    if (await readQualityBaseline(projectRoot) === null) {
      const current = await collectQualityMeasures({
        projectRoot,
        changedFiles: [],
        lane: "full",
        stackProfile: null,
        deadCodeFiles: null
      });
      await writeQualityBaseline(projectRoot, createBaseline(current, (/* @__PURE__ */ new Date()).toISOString()));
    }
  } catch {
  }
}
async function joinRag(projectRoot, options) {
  const intelligence = resolveFrameworkConfig(projectRoot).intelligence;
  if (!intelligence.rag_enabled) {
    process.stdout.write(`${JOIN_RAG_OFF_MESSAGE}
`);
    return true;
  }
  assertEmbeddingProviderAvailable(projectRoot, intelligence.embedding_provider);
  const service = new RagService(projectRoot);
  const status = await service.getStatus();
  if (status.index_present && status.valid) {
    process.stdout.write(`${JOIN_RAG_PRESENT_MESSAGE}
`);
    return true;
  }
  if (options.interactive && !options.yes && !options.nonInteractive) {
    const accepted = await dist_default({
      message: "Build the local RAG index now?",
      default: true
    });
    if (!accepted) {
      return false;
    }
  }
  process.stdout.write(`${JOIN_RAG_BUILDING_MESSAGE}
`);
  const provider = intelligence.embedding_provider ?? "local";
  await initializeRagIndex(projectRoot, {
    current: status,
    provider,
    model: intelligence.embedding_model ?? getDefaultEmbeddingModel(provider),
    buildOnly: true
  });
  return true;
}
function isGitTracked(projectRoot, path2) {
  try {
    execFileSync5("git", ["ls-files", "--error-unmatch", "--", path2], {
      cwd: projectRoot,
      stdio: "ignore"
    });
    return true;
  } catch {
    return false;
  }
}
function isGitIgnored(projectRoot, path2) {
  if (isGitTracked(projectRoot, path2)) {
    return false;
  }
  try {
    execFileSync5("git", ["check-ignore", "--quiet", "--no-index", "--", path2], {
      cwd: projectRoot,
      stdio: "ignore"
    });
    return true;
  } catch {
    return false;
  }
}

// src/cli/commands/lane.ts
init_esm_shims();
var SETTABLE_LANES = ["fast", "graduated", "full"];
function createLaneCommand() {
  const command = new Command("lane").description(
    "Set or show the lane for the active feature-development change"
  );
  command.command("set").description("Set (raise) the lane the end-of-change isolation check reads for this change").argument("<lane>", `one of: ${SETTABLE_LANES.join(", ")}`).option("--project-root <path>", "Project root", process.cwd()).option(
    "--session <id>",
    "Session id (defaults to SE_SESSION / CLAUDE_SESSION_ID, then the shared ledger-session cache)"
  ).action((lane, options) => {
    if (!SETTABLE_LANES.includes(lane)) {
      console.error(`unknown lane "${lane}" \u2014 one of: ${SETTABLE_LANES.join(", ")}`);
      process.exitCode = 1;
      return;
    }
    const requested = lane;
    const root = options.projectRoot;
    const sessionHint2 = options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null;
    const sessionId = resolveSessionId(root, sessionHint2);
    const dirName = currentFeature(root, sessionId);
    if (!dirName) {
      console.error("no active feature \u2014 run `paqad-ai stage start planning` first");
      process.exitCode = 1;
      return;
    }
    const before = readChangeConstants(root, dirName).lane;
    recordChangeConstants(root, dirName, { lane: requested, laneSource: "manual" });
    const after = readChangeConstants(root, dirName).lane;
    const changed = after !== before;
    const refusedDowngrade = !changed && laneRank(requested) < laneRank(before);
    if (changed) {
      console.log(`**\u25B8 paqad** \xB7 lane raised to ${after} \u2014 the isolation check reads this now.`);
    } else if (refusedDowngrade) {
      console.log(
        `**\u25B8 paqad** \xB7 kept the lane at ${before} \u2014 a change's lane only ever rises, so it won't be downgraded to ${requested}.`
      );
    } else {
      console.log(`**\u25B8 paqad** \xB7 lane already ${after} \u2014 nothing to change.`);
    }
    console.log(
      JSON.stringify({
        set: true,
        lane: after,
        requested,
        changed,
        refused_downgrade: refusedDowngrade
      })
    );
  });
  command.command("show").description("Show the lane recorded for the active change").option("--project-root <path>", "Project root", process.cwd()).option("--session <id>", "Session id (defaults to SE_SESSION / CLAUDE_SESSION_ID)").action((options) => {
    const root = options.projectRoot;
    const sessionHint2 = options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null;
    const sessionId = resolveSessionId(root, sessionHint2);
    const dirName = currentFeature(root, sessionId);
    if (!dirName) {
      console.error("no active feature \u2014 run `paqad-ai stage start planning` first");
      process.exitCode = 1;
      return;
    }
    const lane = readChangeConstants(root, dirName).lane;
    console.log(JSON.stringify({ lane }));
  });
  return command;
}

// src/cli/commands/managed-settings.ts
init_esm_shims();
import { mkdirSync as mkdirSync14, writeFileSync as writeFileSync14 } from "fs";
import { join as join70 } from "path";
var MANAGED_SETTINGS_FILE = "paqad.json";
var MANAGED_SETTINGS_REFUSAL = "managed-settings is part of paqad for teams; set enterprise.enabled=true";
var MANAGED_HOOK_TIMEOUT_SEC = 30;
var MANAGED_HOOK_COMMANDS = [
  "paqad-ai hook --managed capability-gate pre-mutation",
  "paqad-ai hook --managed decision-pause-gate"
];
function buildManagedSettings(options) {
  const settings = {
    hooks: {
      PreToolUse: [
        {
          matcher: PAQAD_MUTATING_TOOL_MATCHER,
          hooks: MANAGED_HOOK_COMMANDS.map((command) => ({
            type: "command",
            command,
            onFailure: "block",
            timeout: MANAGED_HOOK_TIMEOUT_SEC
          }))
        }
      ]
    }
  };
  return options.plugin ? { ...settings, ...pluginSettingsKeys() } : settings;
}
function createManagedSettingsCommand() {
  return new Command("managed-settings").description("Print or write the Claude Code managed settings that enforce paqad org-wide").option("--project-root <path>", "Project root", process.cwd()).option("--write <dir>", "write <dir>/paqad.json instead of printing").option("--no-plugin", "leave out the paqad plugin marketplace and enablement keys").action((options) => {
    if (!resolveFrameworkConfig(options.projectRoot).enterprise.enabled) {
      console.error(MANAGED_SETTINGS_REFUSAL);
      process.exitCode = 1;
      return;
    }
    const body = `${JSON.stringify(buildManagedSettings({ plugin: options.plugin }), null, 2)}
`;
    if (options.write === void 0) {
      process.stdout.write(body);
      return;
    }
    const target = join70(options.write, MANAGED_SETTINGS_FILE);
    try {
      mkdirSync14(options.write, { recursive: true });
      writeFileSync14(target, body);
    } catch (error) {
      console.error(
        `could not write ${target}: ${error instanceof Error ? error.message : String(error)}`
      );
      process.exitCode = 1;
      return;
    }
    console.log(`**\u25B8 paqad** \xB7 wrote the managed settings to ${target}`);
  });
}

// src/cli/commands/metrics.ts
init_esm_shims();
function createMetricsCommand() {
  const command = new Command("metrics").description(
    "Report the per-change shape metrics (duplication on new code + cross-file reuse rate)"
  );
  command.command("report").description("Print the last N changes\u2019 duplication + reuse metrics and their trend").option("--project-root <path>", "Project root", process.cwd()).option("--limit <n>", "How many recent changes to include", "20").option("--json", "Emit the machine-readable window instead of the human summary", false).action((options) => {
    if (isFrameworkDisabledForRoot(options.projectRoot)) {
      console.error("paqad is disabled (vanilla mode); no change metrics are recorded.\n");
      return;
    }
    const limit = Math.max(1, Number.parseInt(options.limit, 10) || 20);
    const rows = readFeatureChangeMetricsWindow(options.projectRoot, limit);
    if (options.json) {
      console.log(JSON.stringify({ count: rows.length, rows }, null, 2));
      return;
    }
    printReport(rows);
  });
  return command;
}
function numberOrNull2(value) {
  return typeof value === "number" ? value : null;
}
function mean(values) {
  const nums = values.filter((value) => value !== null);
  if (nums.length === 0) {
    return null;
  }
  return nums.reduce((sum2, value) => sum2 + value, 0) / nums.length;
}
function trendOf(values) {
  const nums = values.filter((value) => value !== null);
  if (nums.length < 2) {
    return "flat";
  }
  const mid = Math.floor(nums.length / 2);
  const first = mean(nums.slice(0, mid));
  const second = mean(nums.slice(mid));
  if (first === null || second === null || first === second) {
    return "flat";
  }
  return second > first ? "rising" : "falling";
}
function printReport(rows) {
  if (rows.length === 0) {
    console.log("**\u25B8 paqad** \xB7 change shape: no changes measured yet.");
    return;
  }
  const dupSeries = rows.map((row) => numberOrNull2(row.dup_new_pct));
  const reuseSeries = rows.map((row) => numberOrNull2(row.reuse_rate));
  const avgDup = mean(dupSeries);
  const avgReuse = mean(reuseSeries);
  const dupText = avgDup === null ? "n/a" : `${Math.round(avgDup)}%`;
  const reuseText = avgReuse === null ? "n/a" : avgReuse.toFixed(1);
  console.log(`**\u25B8 paqad** \xB7 change shape (last ${rows.length} changes)`);
  console.log(
    `> Over your last ${rows.length} changes, ${dupText} of new code duplicated existing code (industry drift: rising; your trend: ${trendOf(dupSeries)}).`
  );
  console.log(
    `> Reuse held at ${reuseText} cross-file calls /100 lines (your trend: ${trendOf(reuseSeries)}).`
  );
  console.log(">");
  console.log("> | change | duplication | reuse /100 | meaningful lines |");
  console.log("> | --- | --- | --- | --- |");
  rows.forEach((row, index) => {
    const dup = numberOrNull2(row.dup_new_pct);
    const reuse = numberOrNull2(row.reuse_rate);
    const lines = numberOrNull2(row.meaningful_changed_lines) ?? 0;
    console.log(
      `> | ${index + 1} | ${dup === null ? "n/a" : `${dup}%`} | ${reuse === null ? "n/a" : reuse.toFixed(1)} | ${lines} |`
    );
  });
}

// src/cli/commands/module-decisions.ts
init_esm_shims();
import { readFileSync as readFileSync39 } from "fs";

// src/module-decisions/inferencer.ts
init_esm_shims();
var STOP_WORDS = /* @__PURE__ */ new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "has",
  "have",
  "i",
  "in",
  "is",
  "it",
  "of",
  "on",
  "or",
  "so",
  "than",
  "that",
  "the",
  "this",
  "to",
  "we",
  "with",
  "will",
  "should",
  "add",
  "fix",
  "update",
  "change",
  "make",
  "new",
  "use",
  "using",
  "need",
  "needs",
  "want",
  "when",
  "if",
  "but",
  "not",
  "no",
  "do",
  "does",
  "can",
  "must",
  "may",
  "just",
  "into",
  "onto",
  "over",
  "under",
  "about",
  "please",
  "feature",
  "module",
  "modules",
  "support"
]);
function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s/_-]+/g, " ").split(/[\s/_-]+/).filter((t) => t.length >= 3 && !STOP_WORDS.has(t));
}
function uniq(xs) {
  return Array.from(new Set(xs));
}
function moduleSignalTokens(mod) {
  const tokens = [];
  tokens.push(...tokenize(mod.name));
  tokens.push(...tokenize(mod.slug));
  for (const feat of mod.features) {
    tokens.push(...tokenize(feat.name));
    tokens.push(...tokenize(feat.slug));
  }
  for (const path2 of mod.source_paths) {
    const cleaned = path2.replace(/\*+/g, " ").replace(/\.[a-z0-9]+$/i, " ");
    tokens.push(...tokenize(cleaned));
  }
  for (const sym of mod.evidence?.symbols ?? []) {
    tokens.push(...tokenize(sym));
  }
  for (const route of mod.evidence?.routes ?? []) {
    tokens.push(...tokenize(route));
  }
  for (const tbl of mod.evidence?.tables ?? []) {
    tokens.push(...tokenize(tbl));
  }
  return uniq(tokens);
}
function scoreModule(promptTokens, mod) {
  const sigTokens = moduleSignalTokens(mod);
  if (sigTokens.length === 0) return { score: 0, matched: [] };
  const matched = [];
  const nameTokens = /* @__PURE__ */ new Set([...tokenize(mod.name), ...tokenize(mod.slug)]);
  let weighted = 0;
  for (const t of sigTokens) {
    if (!promptTokens.has(t)) continue;
    matched.push(t);
    weighted += nameTokens.has(t) ? 2 : 1;
  }
  const denom = Math.max(1, promptTokens.size);
  const score = Math.min(1, weighted / denom);
  return { score, matched: uniq(matched) };
}
function inferAttribution(opts) {
  const maxChoices = opts.maxChoices ?? 3;
  const scoreFloor = opts.scoreFloor ?? 0.5;
  const promptTokens = uniq(tokenize(opts.prompt));
  const promptSet = new Set(promptTokens);
  const ranked = [];
  if (opts.moduleMap !== null) {
    for (const mod of opts.moduleMap.modules) {
      const { score, matched } = scoreModule(promptSet, mod);
      if (score <= 0) continue;
      ranked.push({
        slug: mod.slug,
        name: mod.name,
        kind: "extend-existing",
        score,
        matched_tokens: matched,
        reasoning: matched.length === 0 ? `Weak signal from existing module "${mod.name}".` : `Prompt shares ${matched.length} token(s) with "${mod.name}": ${matched.slice(0, 6).join(", ")}.`
      });
    }
  }
  ranked.sort((a, b) => b.score - a.score);
  const top = ranked.slice(0, maxChoices);
  const confident = top.some((c) => c.score >= scoreFloor);
  top.push({
    slug: null,
    name: null,
    kind: "new-module-fallback",
    score: 0,
    matched_tokens: [],
    reasoning: "None of the above \u2014 introduce a new module (the agent will collect a name from the user)."
  });
  top.push({
    slug: null,
    name: null,
    kind: "no-attribution",
    score: 0,
    matched_tokens: [],
    reasoning: "Skip attribution for this prompt (no module mutation)."
  });
  return { choices: top, prompt_tokens: promptTokens, confident };
}

// src/cli/commands/module-decisions.ts
function readPromptArg(opts) {
  if (typeof opts.promptFile === "string" && opts.promptFile.length > 0) {
    return readFileSync39(opts.promptFile, "utf8");
  }
  if (typeof opts.prompt === "string") return opts.prompt;
  throw new Error("Must provide --prompt <text> or --prompt-file <path>");
}
function createModuleDecisionsCommand() {
  const command = new Command("module-decisions").description(
    "Inspect MD-XXXX prospective module decisions"
  );
  command.command("list").description("List all MD-XXXX decisions on disk").option("--project-root <path>", "Project root", process.cwd()).option(
    "--state <state>",
    "Filter by state (proposed | accepted | rejected | expired | superseded | draft)"
  ).option("--json", "Emit JSON instead of human-readable output", false).action((options) => {
    const all = listDecisions(options.projectRoot);
    const filtered = options.state !== void 0 ? all.filter((d) => d.state === options.state) : all;
    if (options.json) {
      console.log(JSON.stringify(filtered, null, 2));
      return;
    }
    if (filtered.length === 0) {
      console.log("No module decisions.");
      return;
    }
    for (const d of filtered) {
      console.log(
        `${d.id}  [${d.state}]  ${d.proposed_slug}  \u2192  ${d.proposed_name}  (confidence: ${d.confidence})`
      );
    }
  });
  command.command("show <id>").description("Show a single MD-XXXX decision in full").option("--project-root <path>", "Project root", process.cwd()).action((id, options) => {
    const decision = readDecision(options.projectRoot, id);
    if (decision === null) {
      console.error(`Decision ${id} not found.`);
      process.exitCode = 1;
      return;
    }
    console.log(JSON.stringify(decision, null, 2));
  });
  command.command("expire-stale").description('Transition past-TTL proposed decisions to "expired"').option("--project-root <path>", "Project root", process.cwd()).option("--json", "Emit JSON instead of human-readable output", false).action((options) => {
    const moved = expireStaleDecisions(options.projectRoot);
    if (options.json) {
      console.log(JSON.stringify({ expired: moved }));
      return;
    }
    if (moved.length === 0) {
      console.log("No decisions to expire.");
      return;
    }
    console.log(`Expired ${moved.length} decision(s):`);
    for (const id of moved) console.log(`  ${id}`);
  });
  command.command("extract").description("Run the module-attribution extractor against a prompt; emit JSON candidates").option("--project-root <path>", "Project root", process.cwd()).option("--prompt <text>", "Prompt text to analyse").option("--prompt-file <path>", "Read prompt text from a file").action(async (options) => {
    const prompt = readPromptArg(options);
    const map = await loadModuleMap(options.projectRoot);
    const existingSlugs = map?.modules.map((m) => m.slug) ?? [];
    const candidates = extractCandidates({ prompt, existingSlugs });
    const needsDecision = candidatesNeedingDecision(candidates);
    console.log(
      JSON.stringify(
        {
          prompt_length: prompt.length,
          existing_slugs: existingSlugs,
          candidates,
          needs_decision: needsDecision
        },
        null,
        2
      )
    );
  });
  command.command("infer").description(
    "Run the module-attribution inferencer against a prompt (use when extractor is empty); emit JSON hypotheses"
  ).option("--project-root <path>", "Project root", process.cwd()).option("--prompt <text>", "Prompt text to analyse").option("--prompt-file <path>", "Read prompt text from a file").option("--max-choices <n>", "Cap on existing-module choices", "3").action(
    async (options) => {
      const prompt = readPromptArg(options);
      const moduleMap = await loadModuleMap(options.projectRoot);
      const result = inferAttribution({
        prompt,
        moduleMap,
        maxChoices: Number.parseInt(options.maxChoices, 10)
      });
      console.log(JSON.stringify(result, null, 2));
    }
  );
  return command;
}

// src/cli/commands/module-events.ts
init_esm_shims();
function formatEvent(e) {
  const slug = e.slug ? ` ${e.slug}` : "";
  const via = e.via ? ` via=${e.via}` : "";
  return `${e.ts}  ${e.type}${slug}${via}`;
}
function emit(events, json) {
  if (json) {
    console.log(JSON.stringify(events, null, 2));
    return;
  }
  if (events.length === 0) {
    console.log("No events.");
    return;
  }
  for (const e of events) console.log(formatEvent(e));
}
function createModuleEventsCommand() {
  const command = new Command("module-events").description(
    "Inspect the module-map events.jsonl audit trail"
  );
  command.command("list").description("List recent events from .paqad/module-map/events.jsonl").option("--project-root <path>", "Project root", process.cwd()).option("--limit <n>", "Show only the most recent N entries", (v) => Number(v)).option("--json", "Emit JSON instead of human-readable output", false).action((options) => {
    const all = readModuleMapEvents(options.projectRoot);
    const limit = typeof options.limit === "number" && Number.isFinite(options.limit) && options.limit > 0 ? Math.floor(options.limit) : null;
    const slice = limit === null ? all : all.slice(-limit);
    emit(slice, options.json);
  });
  command.command("since <iso>").description("List events at or after the given ISO timestamp").option("--project-root <path>", "Project root", process.cwd()).option("--json", "Emit JSON instead of human-readable output", false).action((iso, options) => {
    if (!Number.isFinite(Date.parse(iso))) {
      process.stderr.write(`error: invalid ISO timestamp '${iso}'
`);
      process.exitCode = 2;
      return;
    }
    emit(readModuleMapEventsSince(options.projectRoot, iso), options.json);
  });
  command.command("for-module <slug>").description("List events for a specific module slug").option("--project-root <path>", "Project root", process.cwd()).option("--json", "Emit JSON instead of human-readable output", false).action((slug, options) => {
    emit(readModuleMapEventsForSlug(options.projectRoot, slug), options.json);
  });
  return command;
}

// src/cli/commands/module-health.ts
init_esm_shims();
function createModuleHealthCommand() {
  const command = new Command("module-health").description("Maintain module health ledgers");
  command.command("sync").description("Sync pending module health evidence into profiles").option("--project-root <path>", "Project root", process.cwd()).option("--provider <provider>", "Provider adapter identifier").option("--session-id <id>", "Provider session identifier").option("--source <source>", "Evidence source", "provider-hook").option("--silent", "Suppress normal output", false).option("--preflight", "Run as a bounded classification preflight", false).option(
    "--from-report <path>",
    "Run the test-driven rollup using <path> as the coverage report instead of replaying evidence."
  ).option(
    "--from-test-report <path>",
    "Run the test-driven rollup using <path> as the test report (junit-xml / go-json / vitest-json)."
  ).action(
    async (options) => {
      if (options.fromReport || options.fromTestReport) {
        const discovered = discoverModuleHealth(options.projectRoot);
        const report2 = await rollupModuleHealth({
          projectRoot: options.projectRoot,
          moduleHealth: discovered.module_health,
          coverageReportPath: options.fromReport,
          testReportPath: options.fromTestReport
        });
        if (!options.silent) {
          console.log(JSON.stringify(report2, null, 2));
        }
        process.exitCode = report2.blocked === null ? 0 : 1;
        return;
      }
      const result = await syncModuleHealth({
        projectRoot: options.projectRoot,
        provider: options.provider,
        sessionId: options.sessionId,
        source: options.source,
        silent: options.silent,
        preflight: options.preflight
      });
      if (!options.silent) {
        console.log(JSON.stringify(result, null, 2));
      }
      process.exitCode = 0;
    }
  );
  command.command("rollup").description(
    "Run the test-driven module-health rollup using the active pack's module_health block"
  ).option("--project-root <path>", "Project root", process.cwd()).option("--from-report <path>", "Override coverage report path").option("--from-test-report <path>", "Override test report path").option("--silent", "Suppress normal output", false).action(
    async (options) => {
      const discovered = discoverModuleHealth(options.projectRoot);
      const report2 = await rollupModuleHealth({
        projectRoot: options.projectRoot,
        moduleHealth: discovered.module_health,
        coverageReportPath: options.fromReport,
        testReportPath: options.fromTestReport
      });
      if (!options.silent) {
        console.log(JSON.stringify(report2, null, 2));
      }
      process.exitCode = report2.blocked === null ? 0 : 1;
    }
  );
  command.command("record").description("Record normalized module health evidence").option("--project-root <path>", "Project root", process.cwd()).option("--provider <provider>", "Provider adapter identifier").option("--session-id <id>", "Provider session identifier").option("--source <source>", "Evidence source", "provider-hook").option("--file <path...>", "Affected file path").option("--module <module...>", "Affected module name").option("--verification-status <status>", "Verification status").option("--coverage <pct>", "Coverage percentage").option("--failed-tests <count>", "Failed test count").option("--silent", "Suppress normal output", false).action(
    async (options) => {
      const failed = parseOptionalInteger(options.failedTests);
      const coverage = parseOptionalNumber(options.coverage);
      const event = createEvidence({
        source: options.source,
        provider: options.provider,
        sessionId: options.sessionId,
        affectedFiles: options.file ?? [],
        affectedModules: options.module ?? [],
        signals: {
          tests: coverage !== void 0 || failed !== void 0 ? {
            status: failed && failed > 0 ? "fail" : options.verificationStatus,
            ...coverage !== void 0 ? { coverage_pct: coverage } : {},
            ...failed !== void 0 ? { failed } : {}
          } : void 0,
          verification: options.verificationStatus ? {
            status: options.verificationStatus,
            gates_failed: options.verificationStatus === "fail" ? ["manual-record"] : [],
            gates_passed: options.verificationStatus === "pass" ? ["manual-record"] : []
          } : void 0
        }
      });
      await persistEvidence(options.projectRoot, event);
      if (!options.silent) {
        console.log(JSON.stringify(event, null, 2));
      }
    }
  );
  return command;
}
function parseOptionalNumber(value) {
  if (value === void 0) {
    return void 0;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : void 0;
}
function parseOptionalInteger(value) {
  const parsed = parseOptionalNumber(value);
  return parsed === void 0 ? void 0 : Math.trunc(parsed);
}

// src/cli/commands/module-map.ts
init_esm_shims();
function createModuleMapCommand() {
  const command = new Command("module-map").description(
    "Reconcile module-map.yml against the source tree"
  );
  command.command("reconcile").description(
    "Scan source_roots, compare to module-map.yml and docs/modules/, write .paqad/module-map/drift.json"
  ).option("--project-root <path>", "Project root", process.cwd()).option(
    "--source-roots <roots>",
    "Comma-separated source roots (overrides stack-pack discovery; required when none provided)"
  ).option(
    "--file-extensions <exts>",
    'Comma-separated file extensions to include (e.g. ".ts,.tsx"). Defaults to all files.'
  ).option("--no-write", "Skip writing .paqad/module-map/drift.json").option("--fail-on-drift", "Exit non-zero when findings are present", false).option("--json", "Emit JSON (default human-readable summary)", false).action(
    async (options) => {
      const sourceRoots = options.sourceRoots !== void 0 ? options.sourceRoots.split(",").map((s) => s.trim()).filter((s) => s.length > 0) : null;
      const fileExtensions = options.fileExtensions !== void 0 ? options.fileExtensions.split(",").map((s) => s.trim()).filter((s) => s.length > 0) : void 0;
      const report2 = await reconcileModuleMap({
        projectRoot: options.projectRoot,
        sourceRoots,
        fileExtensions,
        writeReport: options.write
      });
      if (options.json) {
        console.log(JSON.stringify(report2, null, 2));
      } else if (report2.blocked !== null) {
        console.error(`Reconciler blocked: ${report2.blocked}.`);
        console.error("Add module_health.source_roots to the active stack pack and retry.");
      } else if (report2.findings.length === 0) {
        console.log("No module-map drift detected.");
      } else {
        console.log(`Found ${report2.findings.length} drift finding(s):`);
        for (const [code, n] of Object.entries(report2.counts)) {
          if (n > 0) console.log(`  ${code}: ${n}`);
        }
      }
      if (options.failOnDrift && driftReportHasFindings(report2)) {
        process.exitCode = 1;
      }
    }
  );
  return command;
}

// src/cli/commands/new-project.ts
init_esm_shims();

// src/onboarding/create-project.ts
init_esm_shims();
import { existsSync as existsSync42, mkdirSync as mkdirSync15, readdirSync as readdirSync14 } from "fs";
import { join as join71 } from "path";
var UNDECIDED_STACK = "undecided";
var EMPTY_STACK_PROFILE = {
  frameworks: [],
  traits: [],
  toolchains: [],
  version_bands: [],
  sources: []
};
var UNDECIDED_COMMANDS = {
  install: undecidedPlaceholder(),
  dev: undecidedPlaceholder(),
  test: undecidedPlaceholder(),
  test_single: undecidedPlaceholder(),
  lint: undecidedPlaceholder(),
  format: undecidedPlaceholder(),
  migrate: undecidedPlaceholder(),
  build: undecidedPlaceholder()
};
function undecidedPlaceholder() {
  return 'echo "choose an application stack first (paqad discovery / onboard)"';
}
var UNDECIDED_COMMAND_PREFIX = 'echo "choose an application stack';
function isUndecidedCommand(command) {
  return typeof command === "string" && command.trim().startsWith(UNDECIDED_COMMAND_PREFIX);
}
function isUndecidedCommands(commands) {
  if (!commands) {
    return false;
  }
  return [commands.dev, commands.build, commands.test].some(
    (command) => isUndecidedCommand(command)
  );
}
async function createProjectWorkspace(options) {
  const parentDir = options.parentDir ?? process.cwd();
  const projectRoot = join71(parentDir, options.name);
  const providers = options.providers && options.providers.length > 0 ? options.providers : ["claude-code"];
  const preExisted = existsSync42(projectRoot);
  const existingEntries = preExisted ? readdirSync14(projectRoot) : [];
  const isNonEmpty = existingEntries.length > 0;
  const hasPaqad = preExisted && existsSync42(join71(projectRoot, ".paqad"));
  if (isNonEmpty && !hasPaqad && !options.force) {
    throw new FrameworkError(
      `Refusing to create a workspace in a non-empty directory: ${projectRoot}. Preserve your work \u2014 pass --force to overwrite it, or choose an empty directory.`,
      { code: "PROJECT_DIR_NOT_EMPTY", details: { projectRoot: toPosixPath(projectRoot) } }
    );
  }
  mkdirSync15(projectRoot, { recursive: true });
  let gitInitialized = false;
  let recovery;
  if (!await isInsideGitWorkTree(projectRoot)) {
    try {
      await execa("git", ["init"], { cwd: projectRoot });
      gitInitialized = true;
    } catch (error) {
      recovery = `git init failed (${errorMessage(error)}); initialize version control yourself.`;
    }
  }
  const output = await new OnboardingOrchestrator().run({
    projectRoot,
    selections: {
      stack_profile: EMPTY_STACK_PROFILE,
      domain: "coding",
      providers,
      rag: options.rag
    },
    profileOverrides: {
      project: {
        name: options.name,
        id: slugify3(options.name),
        description: "Created by paqad-ai new project"
      },
      commands: UNDECIDED_COMMANDS,
      stack_profile: EMPTY_STACK_PROFILE
    }
  });
  return {
    projectRoot,
    created: !preExisted,
    gitInitialized,
    stack: UNDECIDED_STACK,
    generatedFiles: output.generated_files,
    preserved: existingEntries,
    ...recovery ? { recovery } : {}
  };
}
async function isInsideGitWorkTree(projectRoot) {
  try {
    const result = await execa("git", ["rev-parse", "--is-inside-work-tree"], {
      cwd: projectRoot,
      reject: false
    });
    return result.exitCode === 0 && result.stdout.trim() === "true";
  } catch {
    return false;
  }
}
function slugify3(value) {
  const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return slug || "paqad-project";
}
function errorMessage(error) {
  return error instanceof Error ? error.message : "unknown error";
}

// src/cli/ui/banner.ts
init_esm_shims();
var ASCII = `
 \u2588\u2588\u2588\u2588\u2588\u2588\u2557   \u2588\u2588\u2588\u2588\u2588\u2557   \u2588\u2588\u2588\u2588\u2588\u2588\u2557   \u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557       \u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2557
 \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557     \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2551
 \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551 \u2588\u2588\u2551\u2584\u2584 \u2588\u2588\u2551 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551 \u2588\u2588\u2551  \u2588\u2588\u2551     \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551 \u2588\u2588\u2551
 \u2588\u2588\u2554\u2550\u2550\u2550\u255D  \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551 \u2588\u2588\u2551\u2580\u2580 \u2588\u2588\u2551 \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551 \u2588\u2588\u2551  \u2588\u2588\u2551     \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551 \u2588\u2588\u2551
 \u2588\u2588\u2551      \u2588\u2588\u2551  \u2588\u2588\u2551 \u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D \u2588\u2588\u2551  \u2588\u2588\u2551 \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D     \u2588\u2588\u2551  \u2588\u2588\u2551 \u2588\u2588\u2551
 \u255A\u2550\u255D      \u255A\u2550\u255D  \u255A\u2550\u255D  \u255A\u2550\u2550\u2580\u2580\u2550\u255D  \u255A\u2550\u255D  \u255A\u2550\u255D \u255A\u2550\u2550\u2550\u2550\u2550\u255D      \u255A\u2550\u255D  \u255A\u2550\u255D \u255A\u2550\u255D
`.trimEnd();
var SLOGAN = "AI Framework \xB7 Structured. Auditable. Scalable.\nDocumentation-first AI workflows for every stack.";
var PANEL_WIDTH = 68;
function borderLine(left, fill, right) {
  return `${left}${fill.repeat(PANEL_WIDTH)}${right}`;
}
function pad(text = "") {
  return ` ${text}`.padEnd(PANEL_WIDTH, " ");
}
function claudeAccent(text) {
  return source_default.hex("#D97757").bold(text);
}
function claudeSurface(text) {
  return source_default.hex("#F5E6DA")(text);
}
function claudeMuted(text) {
  return source_default.hex("#9A6B55")(text);
}
function printBanner() {
  console.log(claudeAccent(ASCII));
  console.log(claudeMuted(`  ${SLOGAN}`));
  console.log();
}
function printNextSteps() {
  console.log();
  console.log(claudeAccent(borderLine("\u2554", "\u2550", "\u2557")));
  console.log(claudeAccent("\u2551") + claudeSurface(pad("  ONBOARDING COMPLETE")) + claudeAccent("\u2551"));
  console.log(claudeAccent(borderLine("\u2560", "\u2550", "\u2563")));
  console.log(claudeAccent("\u2551") + claudeSurface(pad()) + claudeAccent("\u2551"));
  console.log(
    claudeAccent("\u2551") + claudeSurface(pad("  NEXT STEP: prompt your AI agent with:")) + claudeAccent("\u2551")
  );
  console.log(claudeAccent("\u2551") + claudeSurface(pad()) + claudeAccent("\u2551"));
  console.log(
    claudeAccent("\u2551") + source_default.hex("#B45309").bold(pad("    create documentation")) + claudeAccent("\u2551")
  );
  console.log(claudeAccent("\u2551") + claudeSurface(pad()) + claudeAccent("\u2551"));
  console.log(
    claudeAccent("\u2551") + claudeMuted(pad("  Generates docs/instructions/** and a reviewable module map.")) + claudeAccent("\u2551")
  );
  console.log(
    claudeAccent("\u2551") + claudeMuted(pad("  Review the map, then prompt: create module documentation")) + claudeAccent("\u2551")
  );
  console.log(claudeAccent("\u2551") + claudeSurface(pad()) + claudeAccent("\u2551"));
  console.log(
    claudeAccent("\u2551") + claudeMuted(pad('  Optional: prompt "analyze rules" then "generate rule scripts"')) + claudeAccent("\u2551")
  );
  console.log(
    claudeAccent("\u2551") + claudeMuted(pad("  to enforce docs/instructions/rules/** as real checks.")) + claudeAccent("\u2551")
  );
  console.log(claudeAccent(borderLine("\u255A", "\u2550", "\u255D")));
  console.log();
}
function printNewProjectNextSteps(options) {
  const location = options.projectRoot + (options.gitInitialized ? " (git initialized)" : "");
  const locationLine = `  ${location}`;
  const fitsInFrame = pad(locationLine).length <= PANEL_WIDTH;
  const row = (text = "", color = claudeSurface) => {
    console.log(claudeAccent("\u2551") + color(pad(text)) + claudeAccent("\u2551"));
  };
  console.log();
  console.log(claudeAccent(borderLine("\u2554", "\u2550", "\u2557")));
  row("  WORKSPACE CREATED");
  console.log(claudeAccent(borderLine("\u2560", "\u2550", "\u2563")));
  row();
  row(fitsInFrame ? locationLine : "  Location: printed below this panel", claudeMuted);
  row("  Application stack: UNDECIDED", claudeMuted);
  row();
  row("  NEXT STEP: choose your application stack");
  row();
  row("  Run discovery to shape it, or run `paqad-ai onboard`", claudeMuted);
  row("  once the stack exists.", claudeMuted);
  console.log(claudeAccent(borderLine("\u255A", "\u2550", "\u255D")));
  if (!fitsInFrame) {
    console.log(location);
  }
  console.log();
}
function codexTrustHint(adapters) {
  if (!adapters?.includes("codex-cli")) {
    return null;
  }
  return "Codex: open Codex in this project, run /hooks, and approve paqad\u2019s hooks so the feature-development gates fire (project hooks load only when the .codex/ layer is trusted).";
}

// src/cli/commands/new-project.ts
function createNewProjectCommand() {
  const newCommand = new Command("new").description("Create something new with paqad-ai");
  newCommand.command("project <name>").description("Create a new development workspace (application stack left undecided)").option(
    "--provider <provider...>",
    "Select one or more providers (codex-cli, antigravity, claude-code, gemini-cli, junie, cursor, github-copilot, windsurf, continue, aider, aiassistant)"
  ).option("--parent-dir <path>", "Directory to create the workspace in", process.cwd()).option("--rag", "Enable RAG during onboarding (off unless set)").option("--force", "Overwrite a non-empty directory instead of refusing").action(
    async (name, options) => {
      printBanner();
      try {
        const result = await createProjectWorkspace({
          name,
          parentDir: options.parentDir,
          providers: options.provider,
          rag: options.rag === void 0 ? void 0 : { enabled: options.rag },
          force: options.force
        });
        printNewProjectNextSteps({
          projectRoot: result.projectRoot,
          gitInitialized: result.gitInitialized
        });
        if (result.recovery) {
          console.warn(`
\u26A0 ${result.recovery}`);
        }
        const codexHint = codexTrustHint(options.provider);
        if (codexHint) {
          console.log(`
${codexHint}`);
        }
      } catch (error) {
        if (error instanceof FrameworkError && error.code === "PROJECT_DIR_NOT_EMPTY") {
          console.error(`
\u2716 ${error.message}`);
          process.exitCode = 1;
          return;
        }
        throw error;
      }
    }
  );
  return newCommand;
}

// src/cli/commands/onboard.ts
init_esm_shims();
function firstMissingNonInteractiveFlag(options, npmAvailable) {
  if (npmAvailable && (!options.providers || options.providers.length === 0)) return "--providers";
  if (!options.stack) return "--stack";
  if (!options.capability || options.capability.length === 0) return "--capability";
  return null;
}
function printOnboardingNotices(result) {
  const kept = new Set(result?.kept_files ?? []).size;
  const drift = [...new Set(result?.drift_review_targets ?? [])];
  const warnings = [...new Set(result?.warnings ?? [])];
  if (kept === 0 && drift.length === 0 && warnings.length === 0) return;
  const tty = Boolean(process.stdout.isTTY);
  process.stdout.write("\n");
  if (kept > 0) {
    process.stdout.write(`Kept ${kept} existing ${kept === 1 ? "file" : "files"} unchanged.
`);
  }
  if (drift.length > 0) {
    process.stdout.write("Review these for drift:\n");
    for (const target of drift) process.stdout.write(`  ${target}
`);
  }
  for (const warning of warnings) {
    const line = `\u26A0 ${warning}`;
    process.stdout.write(`${tty ? source_default.yellow(line) : line}
`);
  }
}
function createOnboardCommand() {
  return new Command("onboard").description("Full project onboarding").option("--project-root <path>", "Project root", process.cwd()).option("--stack <stack>", "Force the target stack").option("--capability <capability...>", "Add one or more capabilities").option(
    "--providers <provider...>",
    "Select one or more providers (codex-cli, antigravity, claude-code, gemini-cli, junie, cursor, github-copilot, windsurf, continue, aider, aiassistant)"
  ).option("--rag <on|off>", "Force RAG on or off, skipping the interactive RAG prompt").option("--detect", "Detect the stack and suggested capabilities without writing anything").option("--json", "With --detect, print the detection as JSON").option(
    "--non-interactive",
    "Never prompt; requires the selection flags (exit 2 with `missing --<flag>` when one is absent and stdin is not a TTY)"
  ).action(async (options) => {
    if (options.detect) {
      const detection = await new Detector().detect(options.projectRoot);
      const report2 = {
        detected_domain: detection.detected_domain,
        detected_stack: detection.detected_stack,
        detected_capabilities: detection.detected_capabilities,
        recommended_capabilities: detection.recommended_capabilities ?? [],
        confidence: detection.confidence
      };
      if (options.json) {
        process.stdout.write(`${JSON.stringify(report2, null, 2)}
`);
      } else {
        printBanner();
        process.stdout.write(
          `Detected: ${report2.detected_domain ?? "unknown"} / ${report2.detected_stack ?? "none"} (${report2.confidence} confidence)
`
        );
        process.stdout.write(
          `Suggested capabilities: ${report2.detected_capabilities.join(", ") || "none"}
`
        );
      }
      return;
    }
    if (options.stack && !STACKS.includes(options.stack)) {
      process.stderr.write(
        `unknown stack "${options.stack}". Valid stacks: ${STACKS.join(", ")}
`
      );
      process.exitCode = 2;
      return;
    }
    const npmAvailable = isNpmAvailable();
    if (options.nonInteractive) {
      const missing = firstMissingNonInteractiveFlag(options, npmAvailable);
      if (missing && !process.stdin.isTTY) {
        process.stderr.write(`missing ${missing}
`);
        process.exitCode = 2;
        return;
      }
    }
    let providers = options.providers;
    if (!npmAvailable) {
      if (providers && providers.some((p) => p !== "claude-code")) {
        process.stderr.write(
          "npm is not available, so only `--providers claude-code` can be wired without it.\n"
        );
        process.exitCode = 2;
        return;
      }
      providers = ["claude-code"];
    }
    printBanner();
    const rag = options.rag === "on" ? { enabled: true } : options.rag === "off" ? { enabled: false } : options.nonInteractive ? { enabled: false } : void 0;
    const hasSelections = Boolean(
      options.stack || options.capability || providers || rag !== void 0
    );
    const orchestrator = new OnboardingOrchestrator();
    const result = await orchestrator.run({
      projectRoot: options.projectRoot,
      selections: hasSelections ? {
        stack: options.stack,
        capabilities: options.capability,
        providers,
        rag
      } : void 0,
      onPhase1Complete: () => {
        printNextSteps();
      }
    });
    const reverted = result?.reverted_framework_values ?? [];
    if (reverted.length > 0) {
      console.warn(
        `
\u26A0 Framework settings now live in the .config layer. These non-default values in project-profile.yaml were not migrated and now use code defaults until you set them in .paqad/configs/.config.* or .paqad/.config:
    ${reverted.join("\n    ")}
  See the .paqad/configs/ files (every option is listed there, commented out).`
      );
    }
    const codexHint = codexTrustHint(result?.decision_pause_supported_adapters);
    if (codexHint) {
      console.log(`
${codexHint}`);
    }
    printOnboardingNotices(result);
  });
}

// src/cli/commands/patterns.ts
init_esm_shims();
function createPatternsCommand() {
  const cmd = new Command("patterns").description("Manage the cross-project pattern library");
  cmd.command("list").description("List saved patterns").option("--domain <domain>", "Filter by domain").option("--category <category>", "Filter by category").option("--frameworks <frameworks>", "Comma-separated list of frameworks to filter by").option("--keywords <keywords>", "Comma-separated keywords to search in problem preview").action(
    async (options) => {
      const store = new PatternStore();
      const cli = new PatternCli(store);
      await cli.list({
        domain: options.domain,
        category: options.category,
        frameworks: options.frameworks?.split(",").map((f) => f.trim()),
        keywords: options.keywords?.split(",").map((k) => k.trim())
      });
    }
  );
  cmd.command("prune").description("Remove stale patterns older than a threshold").option("--older-than <days>", "Age threshold in days (default: 180)", "180").action(async (options) => {
    const store = new PatternStore();
    const cli = new PatternCli(store);
    await cli.prune(Number(options.olderThan));
  });
  cmd.command("export <output>").description("Export patterns to a file").option("--format <format>", "Output format: json or markdown (default: json)", "json").action(async (output, options) => {
    const store = new PatternStore();
    const cli = new PatternCli(store);
    const format = options.format === "markdown" ? "markdown" : "json";
    await cli.exportPatterns(output, format);
  });
  return cmd;
}

// src/cli/commands/packs.ts
init_esm_shims();
function createPacksCommand() {
  const command = new Command("packs").description(
    "Manage stack pack installation and scaffolding"
  );
  command.command("list").description("List effective packs and their active sources").option("--project-root <path>", "Project root", process.cwd()).option("--json", "Print machine-readable output").action((options) => {
    const packs = listPacks(options.projectRoot);
    if (options.json) {
      process.stdout.write(`${JSON.stringify(packs, null, 2)}
`);
      return;
    }
    for (const pack of packs) {
      process.stdout.write(
        `[${pack.effective_source}] ${pack.name} (${pack.tier}) \u2014 ${pack.display_name}	override=${pack.override_active}	matched=${pack.matched_in_project}
`
      );
    }
  });
  command.command("install <source>").description("Install a pack from a local path, git URL, or configured registry name").option("--project-root <path>", "Project root", process.cwd()).option("--scope <scope>", "Installation scope (global or project)", "global").action(
    async (source, options) => {
      const pack = await installPack(source, {
        projectRoot: options.projectRoot,
        scope: options.scope
      });
      process.stdout.write(
        `${JSON.stringify(
          {
            name: pack.manifest.name,
            source: pack.source,
            root: pack.root
          },
          null,
          2
        )}
`
      );
    }
  );
  command.command("remove <name>").description("Remove a project or global pack override").option("--project-root <path>", "Project root", process.cwd()).option("--scope <scope>", "Removal scope (global or project)", "global").action((name, options) => {
    removePack(name, options.projectRoot, options.scope);
  });
  command.command("validate <path>").description("Validate a pack manifest and referenced files").action((path2) => {
    const pack = validatePackAt(path2);
    process.stdout.write(
      `${JSON.stringify(
        {
          name: pack.manifest.name,
          valid: true,
          issues: pack.validation.issues
        },
        null,
        2
      )}
`
    );
  });
  command.command("create <name>").description("Scaffold a minimal valid pack").option("--destination <path>", "Destination root", process.cwd()).option("--ecosystem <ecosystem>", "Ecosystem identifier", "node").option("--tier <tier>", "Pack tier (framework or archetype)", "framework").action(
    (name, options) => {
      const created = createPack(name, {
        destinationRoot: options.destination,
        ecosystem: options.ecosystem,
        tier: options.tier
      });
      process.stdout.write(`${created}
`);
    }
  );
  return command;
}

// src/cli/commands/plan.ts
init_esm_shims();
import { readFileSync as readFileSync40, rmSync as rmSync4 } from "fs";

// src/fix-protocol/fix-proof-method-decision.ts
init_esm_shims();
var CATEGORY = "fix.proof_method";
var QUESTION = "How should we confirm this problem is fixed?";
var QA_ROLE = "qa-engineer";
var FAILING_TEST_OPTION_KEY = "failing-test";
var MANUAL_METHOD_OPTIONS = [
  {
    option_key: "human-verification-step",
    label: "Use a manual check",
    one_line_preview: "If you pick this, a person runs a set check to confirm the fix.",
    trade_off: "You give up: a fully automated check.",
    evidence: {}
  },
  {
    option_key: "recorded-baseline-snapshot",
    label: "Keep an approved snapshot",
    one_line_preview: "If you pick this, we save an approved snapshot and compare later runs to it.",
    trade_off: "You give up: free changes without re-approving the snapshot.",
    evidence: {}
  },
  {
    option_key: "measured-threshold",
    label: "Use a measured limit",
    one_line_preview: "If you pick this, we check a measured value against a set limit.",
    trade_off: "You give up: cases the chosen value does not catch.",
    evidence: {}
  }
];
function buildFixProofMethodOptions(qaFindings) {
  return [
    {
      option_key: FAILING_TEST_OPTION_KEY,
      label: "Write a test that fails before the fix",
      one_line_preview: "If you pick this, a test fails on the old code and passes after the fix, recorded with `paqad-ai fix prove`.",
      trade_off: "You give up: nothing for code a test can reach; it needs a runnable test.",
      evidence: qaFindings.length > 0 ? { findings: [...qaFindings] } : {}
    },
    ...MANUAL_METHOD_OPTIONS.map((option) => ({
      option_key: option.option_key,
      label: option.label,
      one_line_preview: option.one_line_preview,
      trade_off: option.trade_off
    }))
  ];
}
function qaEngineerFindings(projectRoot, dirName) {
  const findings = readExperts(projectRoot, dirName)?.findings ?? [];
  return findings.filter((finding) => finding.role === QA_ROLE).map((finding) => `${finding.id}: ${finding.claim}`);
}
function raiseFixProofMethodDecision(projectRoot, dirName) {
  if (readFeatureRecord(projectRoot, dirName)?.kind !== "fix") return null;
  const change = featureChangeKey(dirName);
  const existing = readContractDecisions(projectRoot).find(
    ({ packet }) => packet.category === CATEGORY && packet.change === change
  );
  if (existing) return { id: existing.packet.id, raised: false };
  const { id } = createPendingDecision(projectRoot, {
    category: CATEGORY,
    title: QUESTION,
    context: "This change is a fix that changes behaviour, so paqad wants proof the problem is gone. A test that fails before the fix and passes after it is the strongest proof; pick another method only when no test can reach the problem.",
    options: buildFixProofMethodOptions(qaEngineerFindings(projectRoot, dirName)),
    recommendation: FAILING_TEST_OPTION_KEY,
    origin: "fix-proof",
    change
  });
  return { id, raised: true };
}
function fixProofMethodLine(id, options = {}) {
  if (options.deferred) {
    return `**\u25B8 paqad** \xB7 This is a fix, so I need to know how to prove it. I raised ${id} and will ask it with the rest of this change's questions at the spec questions step. Nothing to answer yet.`;
  }
  return `**\u25B8 paqad** \xB7 This is a fix, so I need to know how to prove it. Answer ${id} (\`paqad-ai decision resolve ${id} failing-test\` is my pick), then I'll continue.`;
}

// src/spec-pipeline/round.ts
init_esm_shims();
var ROUND_BATCH_SIZE = 4;
function questionRoundAhead(projectRoot, dirName) {
  if (readChangeConstants(projectRoot, dirName).lane === "fast") return false;
  return readPipelineConfig(projectRoot).enabled;
}
function roundOpener(merged) {
  if (merged.length === 0) return null;
  const points = merged.length === 1 ? "point" : "points";
  return [
    `The experts agreed on ${merged.length} ${points} after merging overlaps`,
    "",
    "<details>",
    "<summary>What they agreed on</summary>",
    "",
    ...merged.map((entry) => `- ${entry.target}: ${entry.merged_claim}`),
    "",
    "</details>"
  ].join("\n");
}
function mergedClaims(projectRoot, dirName) {
  const conflicts = readExperts(projectRoot, dirName)?.synthesis?.conflicts ?? [];
  return conflicts.filter((conflict) => conflict.ruling === "compatible" && conflict.merged_claim).map((conflict) => ({ target: conflict.target, merged_claim: conflict.merged_claim }));
}
function pendingRoundPackets(projectRoot, dirName) {
  const change = featureChangeKey(dirName);
  return readContractDecisions(projectRoot).filter(({ packet, status }) => status === "pending" && packet.change === change).map(({ packet }) => ({
    id: packet.id,
    category: packet.category,
    title: packet.title,
    recommendation: packet.recommendation
  })).sort((a, b) => a.id.localeCompare(b.id));
}
function buildQuestionRound(projectRoot, dirName) {
  const merged = mergedClaims(projectRoot, dirName);
  const packets = pendingRoundPackets(projectRoot, dirName);
  const batches = [];
  for (let index = 0; index < packets.length; index += ROUND_BATCH_SIZE) {
    batches.push(packets.slice(index, index + ROUND_BATCH_SIZE).map((packet) => packet.id));
  }
  return {
    change: featureChangeKey(dirName),
    opener: roundOpener(merged),
    merged,
    packets,
    batches
  };
}

// src/cli/commands/plan.ts
function fastLaneFixProofMethod(root, sessionId) {
  const dirName = currentFeature(root, sessionId);
  if (!dirName || readChangeConstants(root, dirName).lane !== "fast") return null;
  return raiseFixProofMethodDecision(root, dirName);
}
function readinessLine(id, deferred) {
  if (deferred) {
    return `**\u25B8 paqad** \xB7 Visual evidence is on, but I can't capture screenshots here yet. I raised ${id} and will ask it with the rest of this change's questions at the spec questions step. Keep going.`;
  }
  return `**\u25B8 paqad** \xB7 Visual evidence is on, but I can't capture screenshots here yet. Answer ${id} (\`paqad-ai decision resolve ${id} setup|attach|waive\`), then I'll continue.`;
}
function laneResizedLine(move) {
  return `**\u25B8 paqad** \xB7 lane set to ${move.to} from ${move.from}: ${move.reason}`;
}
function laneRaisedLine(move) {
  return `**\u25B8 paqad** \xB7 lane raised to ${move.to} from ${move.from}: ${move.reason}`;
}
function createPlanCommand() {
  const command = new Command("plan").description(
    "Work with the per-feature plan (compile the plan.json from a template)"
  );
  command.command("compile").description("Compile the active feature plan.json from a filled JSON template").argument("<input-file>", "Path to the filled plan template (JSON)").option("--project-root <path>", "Project root", process.cwd()).option(
    "--session <id>",
    "Session id (defaults to SE_SESSION / CLAUDE_SESSION_ID, then the shared ledger-session cache)"
  ).option("--keep-input", "Keep the transient input file instead of deleting it", false).action(async (inputFile, options) => {
    let template;
    try {
      template = JSON.parse(readFileSync40(inputFile, "utf8"));
    } catch {
      console.error(`could not read/parse plan template "${inputFile}" (expected JSON)`);
      process.exitCode = 1;
      return;
    }
    if (typeof template.summary !== "string" || template.summary.length === 0) {
      console.error('plan template needs a non-empty "summary"');
      process.exitCode = 1;
      return;
    }
    const root = options.projectRoot;
    const sessionId = resolveSessionId(
      root,
      options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
    );
    const activeDir = currentFeature(root, sessionId);
    const changedFiles = (await loadChangeEvidence(root, {
      since: activeDir ? readChangeStartPoint(root, activeDir) : null
    })).files;
    let result;
    try {
      result = writeFeaturePlan(root, sessionId, template, {
        changedFiles,
        gitReadable: readGitState(root).head_commit !== void 0
      });
    } catch (error) {
      if (error instanceof ReuseDeclarationError) {
        for (const line of error.errors) {
          console.error(line);
        }
      } else {
        console.error(
          error instanceof NoActiveFeatureError ? error.message : `could not compile plan: ${error.message}`
        );
      }
      process.exitCode = 1;
      return;
    }
    for (const warning of result.warnings ?? []) {
      console.warn(`**\u25B8 paqad** \xB7 ${warning}`);
    }
    for (const decisionId of result.armedDecisions ?? []) {
      console.warn(
        `**\u25B8 paqad** \xB7 I hit a reuse-or-create choice that's yours to make \u2014 answer ${decisionId} (\`paqad-ai decision resolve ${decisionId} <option>\`), then I'll continue.`
      );
    }
    const proofMethod = fastLaneFixProofMethod(root, sessionId);
    if (proofMethod?.raised) {
      console.warn(fixProofMethodLine(proofMethod.id));
    }
    if (result.readinessDecision) {
      console.warn(
        readinessLine(result.readinessDecision, questionRoundAhead(root, result.dirName))
      );
    }
    if (!options.keepInput) {
      try {
        rmSync4(inputFile, { force: true });
      } catch {
      }
    }
    if (result.laneResized) {
      console.log(laneResizedLine(result.laneResized));
    }
    if (result.laneRaised) {
      console.log(laneRaisedLine(result.laneRaised));
    }
    console.log(`**\u25B8 paqad** \xB7 compiled ${result.path}`);
    console.log(
      JSON.stringify({
        compiled: true,
        path: result.path,
        ...result.armedDecisions?.length ? { armed_decisions: result.armedDecisions } : {},
        ...result.readinessDecision ? { readiness_decision: result.readinessDecision } : {},
        ...proofMethod ? { fix_proof_method: proofMethod.id } : {},
        ...result.laneResized ? { lane_resized: result.laneResized } : {},
        ...result.laneRaised ? { lane_raised: result.laneRaised } : {}
      })
    );
  });
  return command;
}

// src/cli/commands/preflight.ts
init_esm_shims();

// src/workflow-preflight/run.ts
init_esm_shims();

// src/workflow-preflight/registry.ts
init_esm_shims();

// src/site-map/preflight-requirements.ts
init_esm_shims();
import { existsSync as existsSync43, readFileSync as readFileSync41 } from "fs";
import { join as join72 } from "path";
var VERSION_CHECK_TIMEOUT_MS = 1e4;
function composerRequiresLaravel(projectRoot) {
  try {
    const composer = JSON.parse(readFileSync41(join72(projectRoot, "composer.json"), "utf8"));
    return composer.require?.["laravel/framework"] !== void 0;
  } catch {
    return false;
  }
}
function nodeCliDiscoverable(projectRoot) {
  try {
    const pkg = JSON.parse(readFileSync41(join72(projectRoot, "package.json"), "utf8"));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    if (deps["commander"] !== void 0 || deps["yargs"] !== void 0 || deps["oclif"] !== void 0) {
      return true;
    }
    return pkg.bin !== void 0;
  } catch {
    return false;
  }
}
async function versionOk(bin, projectRoot) {
  try {
    const result = await execa(bin, ["--version"], {
      cwd: projectRoot,
      reject: false,
      timeout: VERSION_CHECK_TIMEOUT_MS
    });
    return (typeof result.exitCode === "number" ? result.exitCode : 1) === 0;
  } catch {
    return false;
  }
}
async function artisanRunnerPresent(projectRoot) {
  const invocation = resolveArtisanInvocation(
    readProjectProfile(projectRoot, { persistMigration: false })?.commands
  );
  if ("blocked" in invocation) return false;
  switch (artisanRunner(invocation.argv)) {
    case "sail":
      return existsSync43(join72(projectRoot, invocation.argv[0]));
    case "docker":
      return versionOk("docker", projectRoot);
    default:
      return versionOk("php", projectRoot);
  }
}
var siteMapPreflightRequirements = [
  {
    id: "documentation-foundation",
    label: "Documentation foundation",
    kind: "workflow",
    why: "The map is grouped and labelled from your project documentation, so it needs the documentation foundation first.",
    probe: async (projectRoot) => detectSiteMapPrerequisites(projectRoot).missing.some(
      (m) => m.workflow === "create documentation"
    ) ? "unavailable" : "ok",
    options: [
      { id: "create-documentation", label: 'Run "create documentation" first', recommended: true }
    ]
  },
  {
    id: "module-docs",
    label: "Module documentation",
    kind: "workflow",
    why: "The map groups screens by module and labels them from the module docs, so it needs your modules documented first.",
    probe: async (projectRoot) => detectSiteMapPrerequisites(projectRoot).missing.some(
      (m) => m.workflow === "create module documentation"
    ) ? "unavailable" : "ok",
    options: [
      {
        id: "create-module-documentation",
        label: 'Run "create module documentation" first',
        recommended: true
      }
    ]
  },
  {
    id: "node-cli-program",
    label: "Node CLI program",
    kind: "command",
    why: "Without a discoverable command program the map cannot list your CLI commands as surfaces.",
    probe: async (projectRoot) => nodeCliDiscoverable(projectRoot) ? "ok" : "unavailable",
    options: [{ id: "skip-cli", label: "Skip CLI mapping for this run", recommended: true }]
  },
  {
    id: "laravel-route-list",
    label: "Laravel route list",
    kind: "command",
    why: "The real router resolves modular routes, middleware, and controllers that a static file scan cannot see.",
    applies: composerRequiresLaravel,
    probe: async (projectRoot) => {
      const artisanPresent = existsSync43(join72(projectRoot, "artisan"));
      const runnerPresent = await artisanRunnerPresent(projectRoot);
      return artisanPresent && runnerPresent ? "needs-decision" : "unavailable";
    },
    options: [
      { id: "run", label: "Let paqad run the read-only route list itself", recommended: true },
      { id: "print", label: "Print the command and paste the output back" },
      {
        id: "static",
        label: "Fall back to the static route-file scan (loses module attribution and middleware the real router resolves)"
      }
    ]
  }
];

// src/workflow-preflight/registry.ts
var REGISTRY = {
  "site-map": siteMapPreflightRequirements
};
function requirementsFor(workflow) {
  return REGISTRY[workflow] ?? [];
}

// src/workflow-preflight/run.ts
async function evaluateRequirements(requirements, projectRoot) {
  const results = [];
  for (const requirement of requirements) {
    if (requirement.applies && !requirement.applies(projectRoot)) continue;
    const outcome = await requirement.probe(projectRoot);
    results.push({
      id: requirement.id,
      label: requirement.label,
      kind: requirement.kind,
      why: requirement.why,
      outcome,
      options: requirement.options
    });
  }
  return results;
}
function toQuestion(result) {
  return {
    id: result.id,
    label: result.label,
    why: result.why,
    outcome: result.outcome,
    options: result.options
  };
}
async function runPreflight(projectRoot, workflow) {
  const requirements = await evaluateRequirements(requirementsFor(workflow), projectRoot);
  const questions = requirements.filter((result) => result.outcome !== "ok").map(toQuestion);
  return { ok: questions.length === 0, requirements, questions };
}

// src/cli/commands/preflight.ts
function createPreflightCommand() {
  const command = new Command("preflight").description("Check what a workflow needs before it runs, and list any questions in one place").argument("<workflow>", "The workflow to check (for example: site-map)").option("--project-root <path>", "Project root", process.cwd()).option("--quiet", "Suppress the machine-readable summary line", false).action(async (workflow, options) => {
    try {
      const result = await runPreflight(options.projectRoot, workflow);
      if (result.ok) {
        console.log(
          `**\u25B8 paqad** \xB7 preflight \u2014 everything ${workflow} needs is ready. Nothing to ask.`
        );
      } else {
        console.log(
          `**\u25B8 paqad** \xB7 preflight \u2014 ${result.questions.length} thing(s) to settle before ${workflow} can run:`
        );
        for (const question of result.questions) {
          const glyph = question.outcome === "unavailable" ? "\u{1F534}" : "\u{1F7E1}";
          console.log(`> ${glyph} ${question.label} \u2014 ${question.why}`);
        }
      }
      if (!options.quiet) {
        console.log(
          JSON.stringify({
            workflow,
            ok: result.ok,
            questions: result.questions,
            requirements: result.requirements.map((requirement) => ({
              id: requirement.id,
              outcome: requirement.outcome
            }))
          })
        );
      }
      process.exitCode = result.ok ? 0 : 1;
    } catch (error) {
      console.error(`**\u25B8 paqad** \xB7 preflight failed: ${error.message}`);
      process.exitCode = 2;
    }
  });
  return command;
}

// src/cli/commands/report.ts
init_esm_shims();

// src/speed-report/report.ts
init_esm_shims();

// src/speed-report/classify.ts
init_esm_shims();
var MINUTE_MS = 6e4;
var TOOL_INTERVAL_MAX_MS = 60 * MINUTE_MS;
var THINKING_MAX_MS = 15 * MINUTE_MS;
var AWAY_AFTER_MS = 30 * MINUTE_MS;
var WINDOW_PAD_MS = 5 * MINUTE_MS;
var BUCKET_MS = 1e4;
var INJECTED_SCAN_CHARS = 400;
var INJECTED_MARKERS = [
  "<task-notification",
  "Another Claude session sent",
  "Stop hook feedback",
  "<ci-monitor-event",
  "<system-reminder",
  "<side-sessions",
  "Request interrupted"
];
var CATEGORY2 = {
  edit: "edit (including the pre-edit gate)",
  blockedTimeout: "blocked: gate timeout",
  blockedEntry: "blocked: entry gate",
  blockedOther: "blocked: other gate",
  frameworkReread: "framework re-read",
  checksRun: "paqad checks run",
  paqadCli: "paqad CLI",
  tests: "tests",
  lint: "lint, type, format, build",
  git: "git",
  waiting: "waiting and polling",
  other: "read, search, other",
  thinking: "model thinking"
};
var OWNER_CATEGORY = {
  away: "away",
  reading: "reading and replying",
  answering: "answering questions"
};
var AGENT_ORDER = [
  "development",
  "checks",
  "review",
  "documentation_sync",
  "specification",
  "expert",
  "chief-architect",
  "planning",
  "Explore",
  "other",
  "main"
];
var CEREMONY_ROLES = /* @__PURE__ */ new Set([
  "checks",
  "review",
  "documentation_sync",
  "specification",
  "expert",
  "chief-architect",
  "planning"
]);
var AGENT_TOOL = "Agent";
var ASK_USER_TOOL = "AskUserQuestion";
var READ_TOOL = "Read";
var BASH_TOOL = "Bash";
var EDIT_TOOLS = /* @__PURE__ */ new Set(["Edit", "Write", "NotebookEdit"]);
var SIZE_TOOLS = /* @__PURE__ */ new Set(["Edit", "Write"]);
var FRAMEWORK_READ_MARKERS = [
  "AGENT-BOOTSTRAP",
  "AGENT-ROUTER",
  "CLAUDE.md",
  "framework-path",
  "session-context"
];
var FRAMEWORK_READ_DIRS = /(^|\/)docs\/instructions\/(stack|design-system|workflows)(\/|$)/;
var PAQAD_CLI_VERBS = /* @__PURE__ */ new Set([
  "stage",
  "plan",
  "spec",
  "review",
  "rules",
  "decision",
  "lane",
  "route",
  "debt",
  "index",
  "visual-evidence"
]);
var TEST_BINARIES = /* @__PURE__ */ new Set(["vitest", "pest", "phpunit"]);
var LINT_BINARIES = /* @__PURE__ */ new Set([
  "tsc",
  "typecheck",
  "eslint",
  "prettier",
  "tsup"
]);
var LINT_SCRIPTS = /* @__PURE__ */ new Set(["lint", "format", "build", "typecheck"]);
var PACKAGE_RUNNERS = /* @__PURE__ */ new Set(["pnpm", "npm", "yarn"]);
var EXEC_WRAPPERS = /* @__PURE__ */ new Set(["npx", "bunx"]);
var RUNNER_SUBCOMMANDS = /* @__PURE__ */ new Set(["exec", "dlx", "run", "x"]);
var CHAINED_PREFIX = /^(cd|export)\s/;
var ASSIGNMENT_PREFIX = /^[A-Za-z_][A-Za-z0-9_]*=(?:"[^"]*"|'[^']*'|[^\s&;|"']*)\s+/;
var WAITING_COMMAND = /^(sleep|until|while)\b/;
function isInjectedText(text) {
  return INJECTED_MARKERS.some((marker) => {
    const at2 = text.indexOf(marker);
    return at2 !== -1 && at2 < INJECTED_SCAN_CHARS;
  });
}
function classifyUserRecord(hasToolResult, text) {
  if (hasToolResult) return "tool-result";
  return isInjectedText(text) ? "injected" : "human";
}
function ownerGapCategory(gapMs) {
  return gapMs > AWAY_AFTER_MS ? OWNER_CATEGORY.away : OWNER_CATEGORY.reading;
}
function isThinkingGap(gapMs) {
  return gapMs >= 0 && gapMs < THINKING_MAX_MS;
}
function keepsToolInterval(durationMs) {
  return durationMs >= 0 && durationMs <= TOOL_INTERVAL_MAX_MS;
}
function isEditTool(name) {
  return EDIT_TOOLS.has(name);
}
function countsTowardSize(name) {
  return SIZE_TOOLS.has(name);
}
function refusalLabel(isError, resultText) {
  if (!isError || !resultText.includes("hook error")) return null;
  if (resultText.includes("timed out")) return CATEGORY2.blockedTimeout;
  if (resultText.includes("agent-entry")) return CATEGORY2.blockedEntry;
  return CATEGORY2.blockedOther;
}
function isFrameworkReread(filePath) {
  const normalized = filePath.replace(/\\/g, "/");
  return FRAMEWORK_READ_MARKERS.some((marker) => normalized.includes(marker)) || FRAMEWORK_READ_DIRS.test(normalized);
}
function firstAndAnd(text) {
  let quote = null;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (quote !== null) {
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") quote = ch;
    else if (ch === "\n" || ch === ";" || ch === "|" && text[i + 1] !== "|") return -1;
    else if (ch === "&" && text[i + 1] === "&") return i;
  }
  return -1;
}
function stripOnePrefix(text) {
  if (CHAINED_PREFIX.test(text)) {
    const at2 = firstAndAnd(text);
    return at2 === -1 ? text : text.slice(at2 + 2).trimStart();
  }
  const assignment = ASSIGNMENT_PREFIX.exec(text);
  return assignment ? text.slice(assignment[0].length) : text;
}
function stripCommandPrefixes(command) {
  let rest = command.trimStart();
  for (; ; ) {
    const next = stripOnePrefix(rest);
    if (next === rest) return rest.trim();
    rest = next;
  }
}
function commandWords(stripped) {
  const words2 = [];
  let current = "";
  let quote = null;
  let started = false;
  for (const ch of stripped) {
    if (quote !== null) {
      if (ch === quote) quote = null;
      else current += ch;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      started = true;
      continue;
    }
    if (ch === "&" || ch === "|" || ch === ";" || ch === "\n") break;
    if (/\s/.test(ch)) {
      if (started) words2.push(current);
      current = "";
      started = false;
      continue;
    }
    current += ch;
    started = true;
  }
  if (started) words2.push(current);
  return words2;
}
function baseName(word) {
  const slash = Math.max(word.lastIndexOf("/"), word.lastIndexOf("\\"));
  return slash === -1 ? word : word.slice(slash + 1);
}
function commandHead(words2) {
  const rest = words2.length > 0 && EXEC_WRAPPERS.has(baseName(words2[0])) ? words2.slice(1) : words2;
  if (rest.length === 0) return null;
  const binary = baseName(rest[0]);
  if (!PACKAGE_RUNNERS.has(binary)) return { binary, script: null, args: rest.slice(1) };
  const index = rest[1] !== void 0 && RUNNER_SUBCOMMANDS.has(rest[1]) ? 2 : 1;
  return { binary, script: rest[index] ?? null, args: rest.slice(index + 1) };
}
function headOf(command) {
  return commandHead(commandWords(stripCommandPrefixes(command)));
}
function paqadCategory(args) {
  if (args[0] === "checks" && args[1] === "run") return CATEGORY2.checksRun;
  if (args[0] !== void 0 && PAQAD_CLI_VERBS.has(args[0])) return CATEGORY2.paqadCli;
  return CATEGORY2.other;
}
function isTestHead(head) {
  if (head.script === null) {
    if (TEST_BINARIES.has(head.binary)) return true;
    if (head.binary === "php") return head.args[0] === "artisan" && head.args[1] === "test";
    return head.binary === "sail" && head.args[0] === "test";
  }
  if (head.script.startsWith("test")) return true;
  if (head.binary === "pnpm" && head.script === "ci") return true;
  return TEST_BINARIES.has(head.script);
}
function isLintHead(head) {
  if (head.script === null) return LINT_BINARIES.has(head.binary);
  return LINT_SCRIPTS.has(head.script.split(":")[0]) || LINT_BINARIES.has(head.script);
}
function isPaqadHead(head) {
  return head.binary === "paqad-ai" || head.script === "paqad-ai";
}
function classifyBashCommand(command) {
  const stripped = stripCommandPrefixes(command);
  if (WAITING_COMMAND.test(stripped)) return CATEGORY2.waiting;
  const head = commandHead(commandWords(stripped));
  if (head === null) return CATEGORY2.other;
  if (isPaqadHead(head)) return paqadCategory(head.args);
  if (isTestHead(head)) return CATEGORY2.tests;
  if (isLintHead(head)) return CATEGORY2.lint;
  if (head.binary === "git" || head.binary === "gh") return CATEGORY2.git;
  return CATEGORY2.other;
}
function namesTarget(arg) {
  if (arg === "-t" || arg.startsWith("-t=") || arg.startsWith("--testNamePattern")) return true;
  if (arg.startsWith("-")) return false;
  return arg.includes("tests/") || arg.includes(".test.") || arg.includes("/");
}
function testRunKind(command) {
  const category = classifyBashCommand(command);
  if (category === CATEGORY2.checksRun) return "whole-suite";
  if (category !== CATEGORY2.tests) return null;
  const head = headOf(command);
  if (head === null) return null;
  if (head.binary === "pnpm" && head.script === "ci") return "whole-suite";
  return head.args.some(namesTarget) ? "targeted" : "whole-suite";
}
function toolCategory(name, input) {
  if (isEditTool(name)) return CATEGORY2.edit;
  if (name === READ_TOOL && typeof input.file_path === "string") {
    return isFrameworkReread(input.file_path) ? CATEGORY2.frameworkReread : CATEGORY2.other;
  }
  if (name === BASH_TOOL && typeof input.command === "string") {
    return classifyBashCommand(input.command);
  }
  return CATEGORY2.other;
}
function roleForAgentType(agentType) {
  const identity = resolveAgentIdentity({ agentType });
  if (identity === ORCHESTRATOR_AGENT) return "main";
  const name = stripPluginAgentNamespace(identity);
  const stage = stageForAgentName(name);
  if (stage !== null && AGENT_ORDER.includes(stage)) {
    return stage;
  }
  if (name === EXPERT_AGENT_NAME) return "expert";
  if (name === CHIEF_ARCHITECT_AGENT_NAME) return "chief-architect";
  if (name === "Explore") return "Explore";
  return "other";
}
function ownerColumn(role) {
  if (role === "development") return "development";
  if (CEREMONY_ROLES.has(role)) return "ceremony";
  if (role === "main") return "orchestrator";
  return "other";
}
function lineCount(text) {
  if (text.length === 0) return 0;
  const body = text.endsWith("\n") ? text.slice(0, -1) : text;
  return body.split("\n").length;
}
function isOutsidePaqadDir(filePath) {
  return !/(^|[\\/])\.paqad([\\/]|$)/.test(filePath);
}

// src/speed-report/transcripts.ts
init_esm_shims();
import { existsSync as existsSync44, readdirSync as readdirSync15, readFileSync as readFileSync42 } from "fs";
import { homedir as homedir3 } from "os";
import { join as join73, resolve as resolve14, sep as sep3 } from "path";
var HOUSEKEEPING_SESSION = "paqad-housekeeping";
var SAFE_ID = /^[A-Za-z0-9_-]+$/;
function isSafeId(value) {
  return SAFE_ID.test(value);
}
function resolveTranscriptsRoot(options = {}) {
  if (options.transcriptsRoot) return resolve14(options.transcriptsRoot);
  const configDir = claudeConfigDir(options.home ?? homedir3(), options.env ?? process.env);
  return resolve14(configDir, "projects");
}
function projectTranscriptSlug(projectRoot) {
  return resolve14(projectRoot).replace(/[\\/:._ ]/g, "-");
}
function readLedgerChange(projectRoot, dirName) {
  const record = readFeatureRecord(projectRoot, dirName);
  const parts = parseFeatureDirName(dirName);
  const stamps = [];
  const sessions = /* @__PURE__ */ new Set();
  for (const row of readFeatureStageUnit(projectRoot, dirName)) {
    const recordedAt = rowRecordedAt(row);
    const at2 = recordedAt === null ? Number.NaN : Date.parse(recordedAt);
    if (Number.isNaN(at2)) continue;
    stamps.push(at2);
    if (row.session_id !== HOUSEKEEPING_SESSION) sessions.add(row.session_id);
  }
  const window = stamps.length === 0 ? null : {
    start: Math.min(...stamps) - WINDOW_PAD_MS,
    end: Math.max(...stamps) + WINDOW_PAD_MS
  };
  return {
    dirName,
    change: record?.change ?? parts?.ulid ?? dirName,
    title: record?.title ?? parts?.slug ?? dirName,
    lane: record?.lane ?? "unknown",
    window,
    sessions: [...sessions].sort()
  };
}
function readLedgerChanges(projectRoot, dirNames) {
  const names = dirNames ?? listFeatureDirs(projectRoot);
  return names.filter(isSafeId).map((dirName) => readLedgerChange(projectRoot, dirName));
}
function resolveChangeDir(projectRoot, ref) {
  const needle = ref.trim().replace(/^#/, "");
  if (!isSafeId(needle)) return null;
  return resolveFeatureRef(projectRoot, "", needle);
}
function isInside(root, path2) {
  const resolved = resolve14(path2);
  return resolved.startsWith(root.endsWith(sep3) ? root : root + sep3);
}
function readAgentType(metaPath) {
  try {
    const parsed = JSON.parse(readFileSync42(metaPath, "utf8"));
    return typeof parsed.agentType === "string" ? parsed.agentType : null;
  } catch {
    return null;
  }
}
function recordedSources(projectRoot, sessionId, root) {
  const cache2 = readCostCache(hudCostCachePath(projectRoot, sessionId), sessionId);
  return Object.entries(cache2.sources).filter(([path2]) => isInside(root, path2) && existsSync44(path2)).map(([path2, source]) => ({
    path: resolve14(path2),
    agentType: source.kind === "main" ? null : source.agent_type
  }));
}
function derivedSources(sessionDir, sessionId) {
  const sources = [];
  const main = join73(sessionDir, `${sessionId}.jsonl`);
  if (existsSync44(main)) sources.push({ path: main, agentType: null });
  const subagents = join73(sessionDir, sessionId, "subagents");
  if (!existsSync44(subagents)) return sources;
  for (const name of readdirSync15(subagents).sort()) {
    if (!name.startsWith("agent-") || !name.endsWith(".jsonl")) continue;
    const meta = join73(subagents, `${name.slice(0, -".jsonl".length)}.meta.json`);
    sources.push({ path: join73(subagents, name), agentType: readAgentType(meta) });
  }
  return sources;
}
function sessionTranscripts(projectRoot, sessionId, transcriptsRoot) {
  if (!isSafeId(sessionId)) return [];
  const root = resolve14(transcriptsRoot);
  const sessionDir = join73(root, projectTranscriptSlug(projectRoot));
  const byPath = /* @__PURE__ */ new Map();
  for (const source of recordedSources(projectRoot, sessionId, root)) {
    byPath.set(source.path, source);
  }
  for (const source of derivedSources(sessionDir, sessionId)) {
    if (!byPath.has(source.path)) byPath.set(source.path, source);
  }
  return [...byPath.values()];
}
function asRecord2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : null;
}
function blocksOf(content) {
  return Array.isArray(content) ? content.filter((block) => asRecord2(block) !== null) : [];
}
function textOf(content) {
  if (typeof content === "string") return content;
  return blocksOf(content).map((block) => typeof block.text === "string" ? block.text : "").join("\n");
}
function writtenText(name, input) {
  const value = name === "Write" ? input.content : input.new_string;
  return typeof value === "string" ? value : "";
}
function pendingTool(start, name, input) {
  const filePath = typeof input.file_path === "string" ? input.file_path : null;
  const sized = countsTowardSize(name) && filePath !== null && isOutsidePaqadDir(filePath);
  return {
    start,
    name,
    category: toolCategory(name, input),
    sizedPath: sized ? filePath : null,
    lines: sized ? lineCount(writtenText(name, input)) : 0
  };
}
var TimelineBuilder = class {
  timeline;
  pending = /* @__PURE__ */ new Map();
  turnEnd = null;
  anchor = null;
  constructor(role) {
    this.timeline = { role, busy: [], owner: [], edits: [], testRuns: [], badLines: 0 };
  }
  fold(event) {
    const record = asRecord2(event);
    if (!record || record.type !== "assistant" && record.type !== "user") return;
    const at2 = typeof record.timestamp === "string" ? Date.parse(record.timestamp) : Number.NaN;
    if (Number.isNaN(at2)) return;
    const content = asRecord2(record.message)?.content;
    if (record.type === "assistant") this.assistant(at2, content);
    else this.user(at2, content);
    this.turnEnd = record.type === "assistant" ? at2 : null;
  }
  assistant(at2, content) {
    if (this.anchor !== null && isThinkingGap(at2 - this.anchor)) {
      this.timeline.busy.push({ start: this.anchor, end: at2, category: CATEGORY2.thinking });
    }
    this.anchor = null;
    for (const block of blocksOf(content)) {
      if (block.type !== "tool_use" || typeof block.id !== "string") continue;
      if (typeof block.name !== "string") continue;
      const input = asRecord2(block.input) ?? {};
      this.pending.set(block.id, pendingTool(at2, block.name, input));
      const kind = block.name === "Bash" ? bashTestRun(input) : null;
      if (kind !== null) this.timeline.testRuns.push({ at: at2, kind });
    }
  }
  user(at2, content) {
    const results = blocksOf(content).filter((block) => block.type === "tool_result");
    const kind = classifyUserRecord(results.length > 0, textOf(content));
    if (kind === "tool-result") {
      for (const block of results) this.close(at2, block);
    } else if (kind === "human" && this.turnEnd !== null && at2 > this.turnEnd) {
      this.timeline.owner.push({
        start: this.turnEnd,
        end: at2,
        category: ownerGapCategory(at2 - this.turnEnd)
      });
    }
    this.anchor = at2;
  }
  close(at2, block) {
    if (typeof block.tool_use_id !== "string") return;
    const tool = this.pending.get(block.tool_use_id);
    if (!tool) return;
    this.pending.delete(block.tool_use_id);
    if (tool.name === AGENT_TOOL || at2 < tool.start) return;
    if (tool.name === ASK_USER_TOOL) {
      this.timeline.owner.push({ start: tool.start, end: at2, category: OWNER_CATEGORY.answering });
      return;
    }
    if (!keepsToolInterval(at2 - tool.start)) return;
    if (!isEditTool(tool.name)) {
      this.timeline.busy.push({ start: tool.start, end: at2, category: tool.category });
      return;
    }
    const isError = block.is_error === true;
    const refused = refusalLabel(isError, isError ? textOf(block.content) : "");
    this.timeline.busy.push({ start: tool.start, end: at2, category: refused ?? tool.category });
    this.timeline.edits.push({
      start: tool.start,
      end: at2,
      refused,
      filePath: isError ? null : tool.sizedPath,
      lines: isError ? 0 : tool.lines
    });
  }
};
function bashTestRun(input) {
  return typeof input.command === "string" ? testRunKind(input.command) : null;
}
function readTranscriptTimeline(source) {
  const builder = new TimelineBuilder(roleForAgentType(source.agentType));
  try {
    const scan = scanTranscriptLines(source.path, (event) => builder.fold(event));
    builder.timeline.badLines = scan.badLines;
  } catch {
    return null;
  }
  return builder.timeline;
}

// src/speed-report/report.ts
var SPEED_REPORT_SCHEMA = "paqad.speed-report/1";
var NO_TRANSCRIPT = "no transcript";
var MEASURED = "measured";
var TOP_CATEGORY_COUNT = 5;
var REFUSAL_LABELS = [
  CATEGORY2.blockedTimeout,
  CATEGORY2.blockedEntry,
  CATEGORY2.blockedOther
];
var SpeedReportInputError = class extends Error {
};
function clip(span, window) {
  const start = Math.max(span.start, window.start);
  const end = Math.min(span.end, window.end);
  return end > start ? { start, end } : null;
}
function mergeSpans(spans) {
  const sorted = [...spans].sort((a, b) => a.start - b.start || a.end - b.end);
  const merged = [];
  for (const span of sorted) {
    const last = merged[merged.length - 1];
    if (last && span.start <= last.end) last.end = Math.max(last.end, span.end);
    else merged.push({ ...span });
  }
  return merged;
}
function totalLength(spans) {
  return spans.reduce((sum2, span) => sum2 + (span.end - span.start), 0);
}
var SpanCursor = class {
  constructor(spans) {
    this.spans = spans;
  }
  spans;
  index = 0;
  overlap(start, end) {
    while (this.index < this.spans.length && this.spans[this.index].end <= start) this.index += 1;
    let sum2 = 0;
    for (let i = this.index; i < this.spans.length && this.spans[i].start < end; i += 1) {
      const span = this.spans[i];
      sum2 += Math.max(0, Math.min(span.end, end) - Math.max(span.start, start));
    }
    return sum2;
  }
};
function splitOwnership(busy, byRole, window) {
  const owned = { development: 0, ceremony: 0, orchestrator: 0, other: 0 };
  const union = new SpanCursor(mergeSpans(busy));
  const roles = AGENT_ORDER.filter((role) => byRole.has(role)).map((role) => ({
    role,
    cursor: new SpanCursor(mergeSpans(byRole.get(role)))
  }));
  const first = Math.floor(window.start / BUCKET_MS) * BUCKET_MS;
  for (let bucket2 = first; bucket2 < window.end; bucket2 += BUCKET_MS) {
    const start = Math.max(bucket2, window.start);
    const end = Math.min(bucket2 + BUCKET_MS, window.end);
    const busyMs = union.overlap(start, end);
    if (busyMs <= 0) continue;
    const owner = roles.find((entry) => entry.cursor.overlap(start, end) > 0);
    if (owner) owned[ownerColumn(owner.role)] += busyMs;
  }
  return owned;
}
function percentile(sorted, fraction) {
  if (sorted.length === 0) return 0;
  const rank2 = Math.max(1, Math.ceil(fraction * sorted.length));
  return sorted[rank2 - 1];
}
function median(sorted) {
  if (sorted.length === 0) return 0;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
function emptyRefusals() {
  return Object.fromEntries(REFUSAL_LABELS.map((label) => [label, 0]));
}
function editGateStats(latencies, refusals) {
  const sorted = [...latencies].sort((a, b) => a - b);
  const refused = emptyRefusals();
  for (const label of refusals) refused[label] += 1;
  return {
    edits: sorted.length,
    median_ms: Math.round(median(sorted)),
    p90_ms: Math.round(percentile(sorted, 0.9)),
    refused
  };
}
function inWindow(at2, window) {
  return at2 >= window.start && at2 <= window.end;
}
function measureChange(ledger, window, timelines) {
  const busy = [];
  const byRole = /* @__PURE__ */ new Map();
  const categories = /* @__PURE__ */ new Map();
  const owner = [];
  const ownerBy = {
    [OWNER_CATEGORY.away]: 0,
    [OWNER_CATEGORY.reading]: 0,
    [OWNER_CATEGORY.answering]: 0
  };
  const files = /* @__PURE__ */ new Set();
  const samples = { latencies: [], refusals: [] };
  const testRuns = { whole_suite: 0, targeted: 0 };
  let lines = 0;
  let badLines = 0;
  for (const timeline of timelines) {
    badLines += timeline.badLines;
    const roleSpans = byRole.get(timeline.role) ?? [];
    for (const span of timeline.busy) {
      const clipped = clip(span, window);
      if (!clipped) continue;
      busy.push(clipped);
      roleSpans.push(clipped);
      const length = clipped.end - clipped.start;
      categories.set(span.category, (categories.get(span.category) ?? 0) + length);
    }
    if (roleSpans.length > 0) byRole.set(timeline.role, roleSpans);
    for (const span of timeline.owner) {
      const clipped = clip(span, window);
      if (!clipped) continue;
      owner.push(clipped);
      ownerBy[span.category] += clipped.end - clipped.start;
    }
    for (const edit of timeline.edits) {
      if (!inWindow(edit.start, window)) continue;
      samples.latencies.push(edit.end - edit.start);
      if (edit.refused !== null) samples.refusals.push(edit.refused);
      if (edit.filePath !== null) {
        files.add(edit.filePath);
        lines += edit.lines;
      }
    }
    for (const run of timeline.testRuns) {
      if (!inWindow(run.at, window)) continue;
      if (run.kind === "whole-suite") testRuns.whole_suite += 1;
      else testRuns.targeted += 1;
    }
  }
  const ownership = splitOwnership(busy, byRole, window);
  const row = {
    change: ledger.change,
    title: ledger.title,
    lane: ledger.lane,
    status: MEASURED,
    window_start_ms: window.start,
    window_end_ms: window.end,
    size: { files: files.size, lines },
    busy_ms: totalLength(mergeSpans(busy)),
    development_ms: ownership.development,
    ceremony_ms: ownership.ceremony,
    orchestrator_ms: ownership.orchestrator,
    other_agents_ms: ownership.other,
    owner_wait_ms: totalLength(mergeSpans(owner)),
    owner_wait: ownerBy,
    edit_gate: editGateStats(samples.latencies, samples.refusals),
    test_runs: testRuns,
    categories: Object.fromEntries(
      [...categories.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    ),
    bad_lines: badLines
  };
  return { row, samples };
}
function unmeasured(ledger) {
  return { change: ledger.change, title: ledger.title, lane: ledger.lane, status: NO_TRANSCRIPT };
}
function parseSinceDate(value) {
  const trimmed = value.trim();
  let iso = trimmed;
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) iso = `${trimmed}T00:00:00Z`;
  else if (/^\d{4}-\d{2}-\d{2}T[\d:.]+$/.test(trimmed)) iso = `${trimmed}Z`;
  const at2 = /^\d{4}-\d{2}-\d{2}/.test(iso) ? Date.parse(iso) : Number.NaN;
  if (Number.isNaN(at2)) {
    throw new SpeedReportInputError(`paqad: --since is not a readable date: ${value}`);
  }
  return at2;
}
function selectChanges(options) {
  if (options.change === void 0) return readLedgerChanges(options.projectRoot);
  const dirName = resolveChangeDir(options.projectRoot, options.change);
  if (dirName === null) {
    throw new SpeedReportInputError(`paqad: no change matches --change ${options.change}`);
  }
  return readLedgerChanges(options.projectRoot, [dirName]);
}
function laneTotals(lane, measurements) {
  const rows = measurements.map((entry) => entry.row);
  const latencies = measurements.flatMap((entry) => entry.samples.latencies);
  const refusals = measurements.flatMap((entry) => entry.samples.refusals);
  const sum2 = (pick) => rows.reduce((total, row) => total + pick(row), 0);
  return {
    lane,
    changes: rows.length,
    busy_ms: sum2((row) => row.busy_ms),
    development_ms: sum2((row) => row.development_ms),
    ceremony_ms: sum2((row) => row.ceremony_ms),
    orchestrator_ms: sum2((row) => row.orchestrator_ms),
    other_agents_ms: sum2((row) => row.other_agents_ms),
    owner_wait_ms: sum2((row) => row.owner_wait_ms),
    edit_gate: editGateStats(latencies, refusals),
    test_runs: {
      whole_suite: sum2((row) => row.test_runs.whole_suite),
      targeted: sum2((row) => row.test_runs.targeted)
    }
  };
}
function topCategories(rows) {
  const totals = /* @__PURE__ */ new Map();
  for (const row of rows) {
    for (const [category, ms] of Object.entries(row.categories)) {
      totals.set(category, (totals.get(category) ?? 0) + ms);
    }
  }
  return [...totals.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, TOP_CATEGORY_COUNT).map(([category, ms]) => ({ category, ms }));
}
function buildSpeedReport(options) {
  const since = options.since === void 0 ? null : parseSinceDate(options.since);
  const root = resolveTranscriptsRoot(options);
  const cache2 = /* @__PURE__ */ new Map();
  const rows = [];
  const measurements = [];
  for (const ledger of selectChanges(options)) {
    if (since !== null && (ledger.window === null || ledger.window.start < since)) continue;
    const timelines = [];
    for (const session2 of ledger.sessions.filter(isSafeId)) {
      for (const source of sessionTranscripts(options.projectRoot, session2, root)) {
        if (!cache2.has(source.path)) cache2.set(source.path, readTranscriptTimeline(source));
        const timeline = cache2.get(source.path);
        if (timeline) timelines.push(timeline);
      }
    }
    if (ledger.window === null || timelines.length === 0) {
      rows.push(unmeasured(ledger));
      continue;
    }
    const measurement = measureChange(ledger, ledger.window, timelines);
    measurements.push(measurement);
    rows.push(measurement.row);
  }
  const lanes = [...new Set(measurements.map((entry) => entry.row.lane))].sort();
  return {
    schema: SPEED_REPORT_SCHEMA,
    changes: rows,
    totals: lanes.map(
      (lane) => laneTotals(
        lane,
        measurements.filter((entry) => entry.row.lane === lane)
      )
    ),
    top_categories: topCategories(measurements.map((entry) => entry.row))
  };
}
function formatSpan(ms) {
  if (ms < 6e4) {
    const seconds = ms / 1e3;
    return `${seconds < 10 ? seconds.toFixed(1) : Math.round(seconds)}s`;
  }
  const minutes = ms / 6e4;
  if (minutes < 180) return `${Math.round(minutes)}m`;
  return `${(minutes / 60).toFixed(1)}h`;
}
function percent(part, whole) {
  return whole > 0 ? `${Math.round(part / whole * 100)}%` : "0%";
}
function fit(text, width) {
  const flat = text.replace(/\s+/g, " ").trim();
  const cut = flat.length > width ? `${flat.slice(0, width - 1)}\u2026` : flat;
  return cut.padEnd(width);
}
var TITLE_WIDTH = 32;
var COLUMNS = [
  ["change", TITLE_WIDTH],
  ["lane", 10],
  ["size", 14],
  ["busy", 7],
  ["dev", 7],
  ["ceremony", 9],
  ["orch", 7],
  ["owner-wait", 11],
  ["edit p50/p90", 14],
  ["refused t/e/o", 14],
  ["tests w/t", 9]
];
function tableLine(cells) {
  return cells.map((cell2, index) => fit(cell2, COLUMNS[index][1])).join(" ").trimEnd();
}
function refusedCell(refused) {
  return REFUSAL_LABELS.map((label) => refused[label]).join("/");
}
function rowLine(row) {
  if (row.status === NO_TRANSCRIPT) return tableLine([row.title, row.lane, NO_TRANSCRIPT]);
  return tableLine([
    row.title,
    row.lane,
    `${row.size.files}f ${row.size.lines}l`,
    formatSpan(row.busy_ms),
    formatSpan(row.development_ms),
    formatSpan(row.ceremony_ms),
    formatSpan(row.orchestrator_ms),
    formatSpan(row.owner_wait_ms),
    `${formatSpan(row.edit_gate.median_ms)}/${formatSpan(row.edit_gate.p90_ms)}`,
    refusedCell(row.edit_gate.refused),
    `${row.test_runs.whole_suite}/${row.test_runs.targeted}`
  ]);
}
function totalsLines(totals) {
  const other = totals.other_agents_ms > 0 ? `, other agents ${percent(totals.other_agents_ms, totals.busy_ms)}` : "";
  const refused = totals.edit_gate.refused;
  return [
    `Totals (${totals.lane}): ${totals.changes} change(s), busy ${formatSpan(totals.busy_ms)}, development ${percent(totals.development_ms, totals.busy_ms)}, ceremony ${percent(totals.ceremony_ms, totals.busy_ms)}, orchestrator ${percent(totals.orchestrator_ms, totals.busy_ms)}${other}, owner wait ${formatSpan(totals.owner_wait_ms)}`,
    `Edit gate (${totals.lane}): median ${formatSpan(totals.edit_gate.median_ms)}, p90 ${formatSpan(totals.edit_gate.p90_ms)}, ${refused[CATEGORY2.blockedTimeout]} refused on timeout, ${refused[CATEGORY2.blockedEntry]} refused by the entry gate, ${refused[CATEGORY2.blockedOther]} refused by another gate`,
    `Test runs (${totals.lane}): ${totals.test_runs.whole_suite} whole-suite, ${totals.test_runs.targeted} targeted`
  ];
}
function renderSpeedReport(report2) {
  const measured = report2.changes.filter((row) => row.status === MEASURED).length;
  const missing = report2.changes.length - measured;
  const lines = [
    `paqad speed report  (${measured} change(s) with transcripts, ${missing} without)`,
    "",
    tableLine(COLUMNS.map(([name]) => name)),
    ...report2.changes.map(rowLine)
  ];
  if (report2.totals.length > 0) lines.push("");
  for (const totals of report2.totals) lines.push(...totalsLines(totals));
  if (report2.top_categories.length > 0) {
    lines.push(
      `Top busy categories: ${report2.top_categories.map((entry) => `${entry.category} ${formatSpan(entry.ms)}`).join(", ")}`
    );
  }
  return `${lines.join("\n")}
`;
}

// src/cli/commands/report.ts
function createReportCommand() {
  const command = new Command("report").description(
    "Read-only reports built from the change ledger and the session transcripts"
  );
  command.command("speed").description("Show where each change\u2019s time went: busy, stage owners, owner wait, edit gate").option("--project-root <path>", "Project root", process.cwd()).option("--change <id>", "Report one change (ULID, issue number or bundle name)").option("--since <date>", "Only changes whose window starts on or after this UTC date").option("--json", "Emit the machine-readable report", false).option(
    "--transcripts-root <dir>",
    "Claude Code transcripts folder (default: <CLAUDE_CONFIG_DIR or ~/.claude>/projects)"
  ).action((options) => {
    if (isFrameworkDisabledForRoot(options.projectRoot)) {
      console.error("paqad is disabled (vanilla mode); no speed report is built.\n");
      return;
    }
    try {
      const report2 = buildSpeedReport({
        projectRoot: options.projectRoot,
        change: options.change,
        since: options.since,
        transcriptsRoot: options.transcriptsRoot
      });
      if (options.json) console.log(JSON.stringify(report2, null, 2));
      else console.log(renderSpeedReport(report2).trimEnd());
    } catch (error) {
      if (!(error instanceof SpeedReportInputError)) throw error;
      console.error(error.message);
      process.exitCode = 1;
    }
  });
  return command;
}

// src/cli/commands/review.ts
init_esm_shims();
import { readFileSync as readFileSync43, rmSync as rmSync5 } from "fs";
var VERDICTS = ["safe-to-merge", "needs-attention", "inconclusive"];
function createReviewCommand() {
  const command = new Command("review").description(
    "Work with the per-feature review (build the evidence digest, record the review.json)"
  );
  command.command("digest").description("Compose the machine-built review evidence digest the review stage reads").option("--project-root <path>", "Project root", process.cwd()).option(
    "--session <id>",
    "Session id (defaults to SE_SESSION / CLAUDE_SESSION_ID, then the shared ledger-session cache)"
  ).action(async (options) => {
    const sessionId = resolveSessionId(
      options.projectRoot,
      options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
    );
    let result;
    try {
      result = await writeReviewDigest(options.projectRoot, sessionId);
    } catch (error) {
      console.error(`could not write the review digest: ${error.message}`);
      process.exitCode = 1;
      return;
    }
    console.log(
      `**\u25B8 paqad** \xB7 ${result.path} \u2014 ${result.findings} machine finding(s) for the review to confirm or contest`
    );
    console.log(JSON.stringify({ written: true, path: result.path, findings: result.findings }));
  });
  command.command("record").description("Record the active feature review.json from a filled JSON template").argument("<input-file>", "Path to the filled review template (JSON)").option("--project-root <path>", "Project root", process.cwd()).option(
    "--session <id>",
    "Session id (defaults to SE_SESSION / CLAUDE_SESSION_ID, then the shared ledger-session cache)"
  ).option("--keep-input", "Keep the transient input file instead of deleting it", false).action((inputFile, options) => {
    let template;
    try {
      template = JSON.parse(readFileSync43(inputFile, "utf8"));
    } catch {
      console.error(`could not read/parse review template "${inputFile}" (expected JSON)`);
      process.exitCode = 1;
      return;
    }
    if (typeof template.summary !== "string" || template.summary.length === 0) {
      console.error('review template needs a non-empty "summary"');
      process.exitCode = 1;
      return;
    }
    if (!VERDICTS.includes(template.verdict)) {
      console.error(`review template needs a "verdict" of: ${VERDICTS.join(", ")}`);
      process.exitCode = 1;
      return;
    }
    if (typeof template.rollback !== "string" || template.rollback.length === 0) {
      console.error('review template needs a non-empty "rollback" (how to undo the change)');
      process.exitCode = 1;
      return;
    }
    const root = options.projectRoot;
    const sessionId = resolveSessionId(
      root,
      options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
    );
    let result;
    try {
      result = writeFeatureReview(root, sessionId, template);
    } catch (error) {
      console.error(
        error instanceof NoActiveFeatureError ? error.message : `could not record review: ${error.message}`
      );
      process.exitCode = 1;
      return;
    }
    if (!options.keepInput) {
      try {
        rmSync5(inputFile, { force: true });
      } catch {
      }
    }
    console.log(`**\u25B8 paqad** \xB7 recorded ${result.path}`);
    console.log(JSON.stringify({ recorded: true, path: result.path }));
  });
  return command;
}

// src/cli/commands/debt.ts
init_esm_shims();
import { readFileSync as readFileSync44 } from "fs";
import { resolve as resolve15 } from "path";

// src/tech-debt/index.ts
init_esm_shims();

// src/tech-debt/overview-block.ts
init_esm_shims();
import { existsSync as existsSync45, mkdirSync as mkdirSync16, writeFileSync as writeFileSync15 } from "fs";
import { join as join74 } from "path";
var TECH_DEBT_BLOCK_BEGIN = "<!-- paqad:tech-debt:start -->";
var TECH_DEBT_BLOCK_END = "<!-- paqad:tech-debt:end -->";
var OVERVIEW_NAMES = ["overview.md", "index.md"];
function techDebtOverviewPath(projectRoot) {
  const dir = techDebtDir(projectRoot);
  const found = OVERVIEW_NAMES.map((name) => join74(dir, name)).find((path2) => existsSync45(path2));
  return found ?? join74(dir, OVERVIEW_NAMES[0]);
}
function escapeInline(value) {
  return value.replace(/\s+/g, " ").trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function renderDebtLine(item) {
  return `- [${item.id}](${item.id}.md) (${item.kind}, ${item.severity}): ${escapeInline(item.title)}`;
}
function renderTechDebtBlock(items, eol = "\n") {
  const lines = items.filter((item) => item.status === "open").sort(newestFirst).map(renderDebtLine);
  return [TECH_DEBT_BLOCK_BEGIN, ...lines, TECH_DEBT_BLOCK_END].join(eol);
}
function upsertTechDebtBlock(existing, items) {
  const eol = existing.includes("\r\n") ? "\r\n" : "\n";
  const block = renderTechDebtBlock(items, eol);
  const replaced = replaceMarkerBlock(existing, TECH_DEBT_BLOCK_BEGIN, TECH_DEBT_BLOCK_END, block);
  if (replaced !== null) {
    return replaced;
  }
  if (existing.length === 0) {
    return `${block}${eol}`;
  }
  const separator = existing.endsWith("\n") ? eol : `${eol}${eol}`;
  return `${existing}${separator}${block}${eol}`;
}
function reconcileTechDebtOverview(projectRoot, items) {
  const path2 = techDebtOverviewPath(projectRoot);
  const existing = readTextIfExistsSync(path2) ?? "";
  const next = upsertTechDebtBlock(existing, items);
  if (next === existing) {
    return { path: path2, written: false };
  }
  mkdirSync16(techDebtDir(projectRoot), { recursive: true });
  writeFileSync15(path2, next);
  return { path: path2, written: true };
}

// src/tech-debt/index.ts
function refreshTechDebtOverview(projectRoot) {
  return reconcileTechDebtOverview(projectRoot, readDebtItems(projectRoot));
}
function refreshAll(projectRoot, bundle) {
  refreshTechDebtOverview(projectRoot);
  if (bundle?.dirName) {
    writeFeatureTechDebtIndex(projectRoot, bundle.dirName, { sessionId: bundle.sessionId });
  }
}
function raiseTechDebt(projectRoot, input, now = /* @__PURE__ */ new Date(), bundle) {
  const result = addDebtItem(projectRoot, input, now);
  if (result.outcome !== "existing") {
    refreshAll(projectRoot, bundle);
  }
  return result;
}
function promoteTechDebt(projectRoot, id, issue, bundle) {
  const item = promoteDebtItem(projectRoot, id, issue);
  refreshAll(projectRoot, bundle);
  return item;
}
function closeTechDebt(projectRoot, id, reason2, bundle) {
  const item = closeDebtItem(projectRoot, id, reason2);
  refreshAll(projectRoot, bundle);
  return item;
}

// src/cli/commands/debt.ts
var LIST_STATUSES = [...DEBT_STATUSES, "all"];
var LIST_FORMATS = ["text", "json"];
function sessionHint(options) {
  return options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null;
}
function activeBundle(options) {
  const context = resolveDebtContext(options.projectRoot, sessionHint(options));
  return { dirName: context.dirName, sessionId: context.session };
}
function fail2(message) {
  console.error(message);
  process.exitCode = 1;
}
function guarded(run) {
  try {
    run();
  } catch (error) {
    fail2(error.message);
  }
}
function collect3(value, previous) {
  return [...previous, value];
}
function itemPath(item) {
  return `${PATHS.TECH_DEBT_DIR}/${item.id}.md`;
}
function withProjectRoot(command) {
  return command.option("--project-root <path>", "Project root", process.cwd()).option("--session <id>", "Session id (defaults to SE_SESSION / CLAUDE_SESSION_ID)");
}
function createDebtCommand() {
  const command = new Command("debt").description(
    "Record findings this change will not fix as tracked tech-debt items"
  );
  withProjectRoot(
    command.command("add").description("Record one out-of-scope finding as a TD-<ULID> item").requiredOption("--title <text>", "one-line title").requiredOption("--kind <kind>", "bug, debt, gap or follow-up").requiredOption("--severity <level>", "low, medium or high").option("--file <path>", "a file the finding is about (repeatable)", collect3, []).option("--body-file <md>", "markdown file holding the details").option("--agent <name>", "who found it (default orchestrator)")
  ).action((options) => {
    guarded(() => {
      const root = options.projectRoot;
      const body = options.bodyFile === void 0 ? "" : readFileSync44(resolve15(root, options.bodyFile), "utf8");
      const context = resolveDebtContext(root, sessionHint(options));
      const result = raiseTechDebt(
        root,
        {
          title: options.title,
          kind: options.kind,
          severity: options.severity,
          files: options.file,
          body,
          foundBy: options.agent,
          foundIn: context.foundIn,
          session: context.session
        },
        /* @__PURE__ */ new Date(),
        { dirName: context.dirName, sessionId: context.session }
      );
      const said = {
        created: `recorded ${result.id} as tech debt`,
        existing: `${result.id} already records this finding; nothing written`,
        reopened: `reopened ${result.id}; the same finding came back`
      }[result.outcome];
      console.log(`**\u25B8 paqad** \xB7 ${said}.`);
      console.log(
        JSON.stringify({ id: result.id, outcome: result.outcome, path: itemPath(result.item) })
      );
    });
  });
  withProjectRoot(
    command.command("list").description("List tech-debt items").option("--status <status>", `one of ${LIST_STATUSES.join(", ")}`, "open").option("--change <ref>", "current, or a change ULID").option("--format <format>", "text or json", "text")
  ).action((options) => {
    guarded(() => {
      if (!LIST_STATUSES.includes(options.status)) {
        fail2(`--status must be one of ${LIST_STATUSES.join(", ")}; got "${options.status}".`);
        return;
      }
      if (!LIST_FORMATS.includes(options.format)) {
        fail2(`--format must be one of ${LIST_FORMATS.join(", ")}; got "${options.format}".`);
        return;
      }
      let change = options.change;
      if (change === "current") {
        change = resolveDebtContext(options.projectRoot, sessionHint(options)).foundIn.change;
        if (change === null) {
          fail2("no active change; pass a change ULID or leave --change off");
          return;
        }
      }
      const items = listDebtItems(options.projectRoot, {
        status: options.status,
        change
      });
      if (options.format === "json") {
        console.log(JSON.stringify(items, null, 2));
        return;
      }
      if (items.length === 0) {
        console.log("No tech-debt items match.");
        return;
      }
      for (const item of items) {
        console.log(
          `${item.id}  ${item.status}  (${item.kind}, ${item.severity})  ${item.title.replace(/\s+/g, " ")}`
        );
      }
    });
  });
  withProjectRoot(
    command.command("promote").description("Record that an item became an issue").argument("<id>", "the TD-<ULID> id").requiredOption("--issue <ref>", "the issue it became")
  ).action((id, options) => {
    guarded(() => {
      const item = promoteTechDebt(options.projectRoot, id, options.issue, activeBundle(options));
      console.log(`**\u25B8 paqad** \xB7 ${item.id} promoted to ${item.issue}.`);
      console.log(JSON.stringify({ id: item.id, status: item.status, issue: item.issue }));
    });
  });
  withProjectRoot(
    command.command("close").description("Close an item with the reason").argument("<id>", "the TD-<ULID> id").requiredOption("--reason <why>", "why it is closed")
  ).action((id, options) => {
    guarded(() => {
      const item = closeTechDebt(options.projectRoot, id, options.reason, activeBundle(options));
      console.log(`**\u25B8 paqad** \xB7 ${item.id} closed.`);
      console.log(
        JSON.stringify({ id: item.id, status: item.status, closed_reason: item.closed_reason })
      );
    });
  });
  return command;
}

// src/cli/commands/decision.ts
init_esm_shims();
function collectOption(value, previous = []) {
  const eq = value.indexOf("=");
  if (eq === -1) {
    throw new Error(`--option must be <key>=<label>, got "${value}"`);
  }
  return [...previous, { option_key: value.slice(0, eq), label: value.slice(eq + 1) }];
}
function editDistance(a, b) {
  const rows = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) rows[i][0] = i;
  for (let j = 0; j <= b.length; j++) rows[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      rows[i][j] = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + cost);
    }
  }
  return rows[a.length][b.length];
}
function nearestCategory(input) {
  let best = DECISION_CATEGORIES[0];
  let bestDist = Infinity;
  for (const category of DECISION_CATEGORIES) {
    const dist = editDistance(input, category);
    if (dist < bestDist) {
      bestDist = dist;
      best = category;
    }
  }
  return best;
}
function fail3(message) {
  console.error(message);
  process.exitCode = 1;
}
function createDecisionCommand() {
  const command = new Command("decision").description(
    "Create, resolve, or list Decision Pause packets (the install-resolved verb the Decision Pause Contract names \u2014 works in any onboarded project)"
  );
  command.command("create").description("Open a decision packet (mints a D-<ULID> id; validates the category)").requiredOption("--category <category>", "one of the Decision Pause categories").requiredOption("--title <title>", "short title").requiredOption("--context <context>", "why this decision is needed").option("--option <key=label>", "an option (repeatable, at least 2)", collectOption).option("--recommendation <key>", "option_key you recommend").option("--session <id>", "Session whose active change the packet belongs to").option("--project-root <path>", "Project root", process.cwd()).action((options) => {
    if (!DECISION_CATEGORIES.includes(options.category)) {
      fail3(
        `Unknown category "${options.category}". Did you mean "${nearestCategory(options.category)}"? Valid categories: ${DECISION_CATEGORIES.join(", ")}.`
      );
      return;
    }
    try {
      const result = createPendingDecision(options.projectRoot, {
        category: options.category,
        title: options.title,
        context: options.context,
        options: options.option ?? [],
        recommendation: options.recommendation ?? null,
        change: activeChangeKey(options.projectRoot, options.session)
      });
      console.log(JSON.stringify(result, null, 2));
    } catch (error) {
      fail3(error instanceof Error ? error.message : String(error));
    }
  });
  command.command("resolve").description("Resolve a pending packet (moves it to resolved/); --other adds a write-in").argument("<id>", "the D-<ULID> id").argument("<chosen>", "the chosen option_key (ignored when --other is given)").argument("[rationale...]", "optional free-text rationale").option("--other <text>", "resolve to a minted write-in option with this label").option("--session <id>", "Session whose active change the decision belongs to").option("--project-root <path>", "Project root", process.cwd()).action((id, chosen, rationale, options) => {
    try {
      const chosenKey = options.other ? addWriteInOption(options.projectRoot, id, options.other) : chosen;
      const active = resolveActiveChange(options.projectRoot, options.session);
      const { path: path2 } = resolvePendingDecision(
        options.projectRoot,
        id,
        chosenKey,
        rationale.join(" "),
        { change: active ? active.key : null }
      );
      if (active) {
        writeFeatureDecisionsIndex(options.projectRoot, active.dirName, {
          sessionId: active.sessionId
        });
      }
      console.log(JSON.stringify({ path: path2, chosen: chosenKey }, null, 2));
    } catch (error) {
      fail3(error instanceof Error ? error.message : String(error));
    }
  });
  command.command("list").description("List pending and resolved decision packets").option("--project-root <path>", "Project root", process.cwd()).option("--json", "emit machine-readable JSON").action((options) => {
    const rows = listContractDecisions(options.projectRoot);
    if (options.json) {
      console.log(JSON.stringify(rows, null, 2));
      return;
    }
    if (rows.length === 0) {
      console.log("No decision packets found.");
      return;
    }
    for (const row of rows) {
      console.log(`${row.status.padEnd(8)} ${row.id}  [${row.category}]  ${row.title}`);
    }
  });
  return command;
}

// src/cli/commands/rag-evidence.ts
init_esm_shims();
import { resolve as resolve16 } from "path";

// src/rag-ledger/fold.ts
init_esm_shims();
function avg(values) {
  if (values.length === 0) {
    return null;
  }
  return values.reduce((sum2, v) => sum2 + v, 0) / values.length;
}
function foldConversation(ordinal, rows) {
  const refresh = rows.filter((r) => r.kind === "refreshed");
  const called = rows.filter((r) => r.kind === "called");
  const used = rows.filter((r) => r.kind === "used" && r.injected);
  const fallback = rows.filter((r) => r.kind === "fallback");
  const latencies = rows.map((r) => r.latency_ms).filter((v) => typeof v === "number");
  const scores = used.map((r) => r.score_top).filter((v) => typeof v === "number");
  const sections = /* @__PURE__ */ new Set();
  for (const row of used) {
    for (const section2 of row.injected_sections ?? []) {
      sections.add(section2);
    }
  }
  const decided = used.length + fallback.length;
  return {
    conversation_ordinal: ordinal,
    refresh_count: refresh.length,
    called_count: called.length,
    used_count: used.length,
    fallback_count: fallback.length,
    used_rate: decided === 0 ? null : used.length / decided,
    avg_latency_ms: avg(latencies),
    score_top: scores.length === 0 ? null : Math.max(...scores),
    sections_used: [...sections]
  };
}
function foldRagEvidenceRows(sessionId, rows) {
  const byOrdinal = foldByOrdinal(rows);
  const conversations = [];
  for (const [ordinal, ordinalRows] of byOrdinal) {
    conversations.push(foldConversation(ordinal, ordinalRows));
  }
  const totals = {
    refresh_count: sum(conversations, (c) => c.refresh_count),
    called_count: sum(conversations, (c) => c.called_count),
    used_count: sum(conversations, (c) => c.used_count),
    fallback_count: sum(conversations, (c) => c.fallback_count)
  };
  const fallbackReasons = {};
  for (const row of rows) {
    if (row.kind === "fallback" && row.fallback_reason) {
      fallbackReasons[row.fallback_reason] = (fallbackReasons[row.fallback_reason] ?? 0) + 1;
    }
  }
  const promptsWithRag = conversations.filter((c) => c.used_count > 0).length;
  const promptsFallback = conversations.filter(
    (c) => c.used_count === 0 && c.fallback_count > 0
  ).length;
  return {
    session_id: sessionId,
    conversations,
    totals,
    coverage: {
      prompts_total: conversations.length,
      prompts_with_rag: promptsWithRag,
      prompts_fallback: promptsFallback,
      fallback_reasons: fallbackReasons
    }
  };
}
function foldRagEvidenceSession(projectRoot, sessionId) {
  const chatRows = readUnitFile(projectRoot, chatRagPath(sessionId));
  const featureRows = readAllFeatureRag(projectRoot).filter((row) => row.session_id === sessionId);
  return foldRagEvidenceRows(sessionId, [...chatRows, ...featureRows]);
}
function sum(items, pick) {
  return items.reduce((acc, item) => acc + pick(item), 0);
}

// src/cli/commands/rag-evidence.ts
var RECORD_KINDS = [
  "open",
  "refreshed",
  "called",
  "used",
  "fallback",
  "close"
];
function renderSummary(fold) {
  const { totals, coverage } = fold;
  const usedRate = coverage.prompts_total === 0 ? "n/a" : `${Math.round(coverage.prompts_with_rag / coverage.prompts_total * 100)}%`;
  const reasons = Object.entries(coverage.fallback_reasons).map(([reason2, count]) => `${reason2}\xD7${count}`).join(", ");
  const lines = [
    `**\u25B8 paqad** \xB7 RAG evidence for session ${fold.session_id}`,
    `> What the RAG layer actually did this session (recorded by script, not claimed by the model).`,
    `> - prompts: ${coverage.prompts_total} (${coverage.prompts_with_rag} used RAG, ${coverage.prompts_fallback} fell back to grep) \u2014 use rate ${usedRate}`,
    `> - refreshes: ${totals.refresh_count} \xB7 retrieval calls: ${totals.called_count} \xB7 injected: ${totals.used_count} \xB7 fallbacks: ${totals.fallback_count}`
  ];
  if (reasons) {
    lines.push(`> - fallback reasons: ${reasons}`);
  }
  lines.push(
    `> Proof of occurrence, not of benefit: this records that slices were injected, not that the model used them.`
  );
  return `${lines.join("\n")}
`;
}
function createRagEvidenceCommand() {
  const command = new Command("rag-evidence").description(
    "Read or record the script-written RAG-evidence ledger (refresh / call / use / fallback)"
  );
  command.command("show").description("Fold a session into a use-rate / fallback rollup (paqad-voice or JSON)").requiredOption("--session <id>", "Session id to fold").option("--format <fmt>", "Output format: summary | json", "summary").option("--project-root <path>", "Project root", process.cwd()).action((options) => {
    const fmt = options.format.toLowerCase();
    if (fmt !== "summary" && fmt !== "json") {
      process.stderr.write(`error: invalid --format '${options.format}' (summary|json)
`);
      process.exitCode = 2;
      return;
    }
    const fold = foldRagEvidenceSession(resolve16(options.projectRoot), options.session);
    process.stdout.write(
      fmt === "json" ? `${JSON.stringify(fold, null, 2)}
` : renderSummary(fold)
    );
  });
  command.command("record").description("Record one event (script-only; used by the runtime seams, not hand-authored)").argument("<kind>", `Event kind: ${RECORD_KINDS.join(" | ")}`).option("--session <id>", "Session id (host hint; minted/cached when absent)").option("--adapter <name>", "Provider adapter", "claude-code").option("--rag-enabled", "Mark the master switch as on at event time", false).option("--ordinal <n>", "Conversation ordinal (resolved from the .open pointer when absent)").option("--open", "Open a new conversation and record against it", false).option("--json <fields>", "Kind-specific fields as a JSON object").option("--project-root <path>", "Project root", process.cwd()).action((kind, options) => {
    if (!RECORD_KINDS.includes(kind)) {
      process.stderr.write(`error: invalid kind '${kind}' (${RECORD_KINDS.join("|")})
`);
      process.exitCode = 2;
      return;
    }
    const projectRoot = resolve16(options.projectRoot);
    const sessionId = resolveSessionId(projectRoot, options.session);
    let fields = {};
    if (options.json) {
      try {
        fields = JSON.parse(options.json);
      } catch {
        process.stderr.write("error: --json is not valid JSON\n");
        process.exitCode = 2;
        return;
      }
    }
    const ctx = {
      sessionId,
      adapter: options.adapter,
      ragEnabled: Boolean(options.ragEnabled),
      ...options.ordinal ? { ordinal: Number(options.ordinal) } : {}
    };
    if (options.open) {
      openRagConversation(projectRoot, ctx);
    }
    recordRagEvidence(projectRoot, kind, fields, ctx);
  });
  return command;
}

// src/cli/commands/refresh.ts
init_esm_shims();
import { existsSync as existsSync46, readFileSync as readFileSync45, writeFileSync as writeFileSync16 } from "fs";
import { join as join75 } from "path";
function createRefreshCommand() {
  return new Command("refresh").description("Refresh derived framework artifacts").option("--project-root <path>", "Project root", process.cwd()).option("--stack", "Refresh the cached stack snapshot").option("--context", "Refresh chunk and vector context indexes").option(
    "--providers",
    "Re-render provider entry files and the canonical Decision Pause Contract doc"
  ).option("--reconcile-module-map", "Run the module-map reconciler and exit non-zero on drift").option(
    "--rules",
    "Regenerate docs/instructions/rules from the framework rule packs for the saved stack"
  ).option(
    "--force",
    "With --rules, delete the existing generated rules and rewrite them (otherwise report the plan only)"
  ).action(
    async (options) => {
      const hasExplicitTarget = options.stack === true || options.context === true || options.providers === true || options.reconcileModuleMap === true || options.rules === true;
      if (!hasExplicitTarget) {
        console.error(
          'paqad-ai refresh: nothing to refresh \u2014 every target is opt-in. Choose one or more:\n  --stack                 refresh the cached stack snapshot and docs/instructions/stack/*\n  --context               refresh chunk and vector context indexes\n  --providers             re-render provider entry files and the Decision Pause Contract doc\n  --rules                 regenerate docs/instructions/rules from the framework rule packs\n  --reconcile-module-map  reconcile module-map.yml and fail on drift\nThe design system (docs/instructions/design-system/*) is owned by the documentation workflow ("create documentation"), not refresh.'
        );
        return;
      }
      const shouldRefreshStack = options.stack === true;
      const shouldRefreshContext = options.context === true;
      const shouldRefreshProviders = options.providers === true;
      const shouldReconcileModuleMap = options.reconcileModuleMap === true;
      const shouldRefreshRules = options.rules === true;
      const profile = readProjectProfile(options.projectRoot);
      if (shouldRefreshRules) {
        if (profile === null) {
          console.error(
            "paqad-ai refresh --rules: no project profile found. Run `paqad-ai onboard` first."
          );
          process.exitCode = 1;
        } else {
          const report2 = await refreshProjectRules(options.projectRoot, profile, {
            force: options.force === true
          });
          printRulesReport(report2);
        }
      }
      if (shouldRefreshProviders) {
        await refreshProviderEntries(options.projectRoot);
      }
      if (shouldRefreshStack) {
        const previous = await new StackSnapshotCache().read(options.projectRoot);
        const detection = await new Detector().detect(options.projectRoot);
        const snapshot = await new StackIntrospector().snapshot(options.projectRoot);
        const drift = await writeStackArtifacts(options.projectRoot, snapshot, previous, {
          writeHumanDocs: true
        });
        if (profile !== null) {
          const nextCapabilities = detection.recommended_capabilities ?? ["content"];
          const nextProfile = {
            ...profile,
            active_capabilities: nextCapabilities,
            stack_profile: nextCapabilities.includes("coding") ? snapshot.profile : void 0
          };
          writeProjectProfile(options.projectRoot, nextProfile);
          writeRefreshDrift(options.projectRoot, {
            previous_capabilities: profile.active_capabilities,
            current_capabilities: nextCapabilities,
            previous_packs: profile.stack_profile?.frameworks ?? [],
            current_packs: detection.matched_packs ?? [],
            stack_drift: drift
          });
        }
      }
      let contextChangedFiles = [];
      if (shouldRefreshContext) {
        const syncResult = await new RagService(options.projectRoot).refreshContext();
        contextChangedFiles = [
          ...syncResult.changed_files,
          ...syncResult.added_files,
          ...syncResult.deleted_files
        ];
      }
      if (shouldReconcileModuleMap) {
        const discovered = discoverSourceRoots(options.projectRoot);
        if (discovered.source_roots === null) {
          console.error(
            "paqad-ai refresh: skipping module-map reconciliation \u2014 no stack pack declares module_health.source_roots."
          );
        } else {
          const report2 = await reconcileModuleMap({
            projectRoot: options.projectRoot,
            sourceRoots: discovered.source_roots
          });
          if (report2.findings.length > 0) {
            console.error(
              `paqad-ai refresh: module-map drift detected (${report2.findings.length} finding(s) \u2014 see .paqad/module-map/drift.json).`
            );
            process.exitCode = 1;
          }
        }
      }
      if (profile?.efficiency.differential_refresh) {
        const changedFiles = await resolveChangedFiles(options.projectRoot, contextChangedFiles);
        const differential = await new DifferentialRefresh().refresh(changedFiles);
        writeRefreshDrift(options.projectRoot, {
          differential_refresh: {
            changed_files: changedFiles,
            ...differential
          }
        });
      }
    }
  );
}
function printRulesReport(report2) {
  const preservedNote = report2.preserved.length > 0 ? ` Preserved (project-owned): ${report2.preserved.join(", ")}.` : "";
  if (report2.dryRun) {
    console.error(
      `paqad-ai refresh --rules (dry run): ${report2.deleted.length} rule file(s) would be deleted, ${report2.written.length} would be written. Re-run with --force to apply.${preservedNote}`
    );
    return;
  }
  console.error(
    `paqad-ai refresh --rules: deleted ${report2.deleted.length}, wrote ${report2.written.length} rule file(s).${preservedNote}`
  );
}
async function refreshProviderEntries(projectRoot) {
  removeObsoleteContractDocs(projectRoot);
  for (const type of ADAPTER_TYPES) {
    const adapter = AdapterFactory.create(type);
    const configPath = join75(projectRoot, adapter.getConfigPath());
    if (!existsSync46(configPath)) {
      continue;
    }
    const files = await adapter.generateConfig({
      frameworkPath: PATHS.FRAMEWORK_PATH,
      rulesPath: "docs/instructions/rules",
      projectRoot
    });
    writeGeneratedFiles(projectRoot, files);
  }
}
function writeRefreshDrift(projectRoot, refreshDrift) {
  const path2 = join75(projectRoot, PATHS.STACK_DRIFT);
  const current = readExistingJson(path2);
  writeFileSync16(path2, `${JSON.stringify({ ...current ?? {}, ...refreshDrift }, null, 2)}
`);
}
function readExistingJson(path2) {
  try {
    return JSON.parse(readFileSync45(path2, "utf8"));
  } catch {
    return null;
  }
}
async function resolveChangedFiles(projectRoot, contextChangedFiles) {
  if (contextChangedFiles.length > 0) {
    return [...new Set(contextChangedFiles)].sort();
  }
  return readGitChangedFiles(projectRoot);
}

// src/cli/commands/resume.ts
init_esm_shims();
function createResumeCommand() {
  return new Command("resume").description("Reactivate a paused feature-development change by ref (ULID / issue / slug)").requiredOption(
    "--feature <ref>",
    "The paused feature to resume (ULID, issue, slug, or dir name)"
  ).option("--project-root <path>", "Project root", process.cwd()).option(
    "--session <id>",
    "Session id to resume under (defaults to SE_SESSION / CLAUDE_SESSION_ID, then the shared ledger-session cache)"
  ).action((options) => {
    const root = options.projectRoot;
    const sessionId = resolveSessionId(
      root,
      options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
    );
    const resumed = resumeFeatureByRef(root, sessionId, options.feature);
    if (!resumed) {
      console.error(
        `could not resume "${options.feature}" \u2014 no recorded change matches that ref.`
      );
      process.exitCode = 1;
      return;
    }
    console.log(`**\u25B8 paqad** \xB7 resumed ${resumed}`);
    console.log(JSON.stringify({ resumed: true, feature: resumed }));
  });
}

// src/cli/commands/route.ts
init_esm_shims();

// src/pipeline/route-override-log.ts
init_esm_shims();
import { appendFileSync as appendFileSync3, mkdirSync as mkdirSync17, readFileSync as readFileSync46 } from "fs";
import { join as join76 } from "path";
var ROUTE_OVERRIDE_FILE = ".route-overrides.jsonl";
function overrideLogPath(projectRoot, sessionId) {
  return join76(
    projectRoot,
    sessionLedgerDir(STAGE_EVIDENCE_DOC_TYPE, sessionId),
    ROUTE_OVERRIDE_FILE
  );
}
function appendRouteOverride(projectRoot, sessionId, input) {
  const row = {
    source: "agent-override",
    ts: (input.now ?? (() => /* @__PURE__ */ new Date()))().toISOString(),
    hook_label: input.hookLabel,
    agent_label: input.agentLabel,
    ...input.reason === void 0 ? {} : { reason: input.reason }
  };
  mkdirSync17(join76(projectRoot, sessionLedgerDir(STAGE_EVIDENCE_DOC_TYPE, sessionId)), {
    recursive: true
  });
  appendFileSync3(overrideLogPath(projectRoot, sessionId), `${JSON.stringify(row)}
`, "utf8");
  return row;
}

// src/cli/commands/route.ts
function isRoutedWorkflow(value) {
  return ROUTED_WORKFLOWS.includes(value);
}
var UNRESOLVED_SESSION_REASON = "session could not be resolved (no --session, SE_SESSION or CLAUDE_SESSION_ID), so the edited-this-turn check was skipped";
function explicitSessionHint(option) {
  for (const candidate of [option, process.env.SE_SESSION, process.env.CLAUDE_SESSION_ID]) {
    const cleaned = candidate?.trim();
    if (cleaned) {
      return cleaned;
    }
  }
  return null;
}
function correctedState(state, target) {
  const pausedIndex = state.paused.map((entry) => entry.workflow).lastIndexOf(target);
  if (pausedIndex === -1) {
    return { ...state, active: { workflow: target } };
  }
  return {
    ...state,
    active: state.paused[pausedIndex],
    paused: state.paused.filter((_, index) => index !== pausedIndex)
  };
}
function createRouteCommand() {
  const command = new Command("route").description(
    "Correct the route the prompt hook picked (agent's intent wins)"
  );
  command.command("set").description("Set the active route for this session to <workflow>").argument("<workflow>", `Target route (one of: ${ROUTED_WORKFLOWS.join(", ")})`).option("--project-root <path>", "Project root", process.cwd()).option(
    "--session <id>",
    "Session id (defaults to SE_SESSION / CLAUDE_SESSION_ID, then the shared ledger-session cache)"
  ).option("--reason <text>", "Why the hook label was wrong (recorded in the audit row)").action((workflow, options) => {
    if (!isRoutedWorkflow(workflow)) {
      console.error(
        `unknown workflow "${workflow}" \u2014 expected one of: ${ROUTED_WORKFLOWS.join(", ")}`
      );
      process.exitCode = 1;
      return;
    }
    const target = workflow;
    const root = options.projectRoot;
    const hint = explicitSessionHint(options.session);
    const sessionId = resolveSessionId(root, hint);
    const state = readWorkflowState(root, sessionId);
    const current = state.active?.workflow ?? null;
    const hookLabel = current ?? readSessionRoute(root, sessionId)?.workflow ?? null;
    if (hint !== null && current === "feature-development" && !isFeatureDevelopmentRoute(target) && editedDevelopmentThisTurn(root, sessionId)) {
      console.error(
        `cannot leave feature-development: source files were edited this turn. Finish or revert the change first.`
      );
      process.exitCode = 1;
      return;
    }
    writeWorkflowState(root, sessionId, correctedState(state, target));
    const priorRoute = readSessionRoute(root, sessionId);
    writeSessionRoute(
      root,
      {
        workflow: target,
        query: priorRoute?.query ?? "",
        ...priorRoute?.adapter === void 0 ? {} : { adapter: priorRoute.adapter }
      },
      sessionId
    );
    if (!isFeatureDevelopmentRoute(target)) {
      clearPendingLane(root, sessionId);
    }
    const reasons = [
      options.reason,
      hint === null ? UNRESOLVED_SESSION_REASON : void 0
    ].filter((part) => part !== void 0);
    appendRouteOverride(root, sessionId, {
      hookLabel,
      agentLabel: target,
      ...reasons.length === 0 ? {} : { reason: reasons.join("; ") }
    });
    console.log(`**\u25B8 paqad** \xB7 route set to ${target}`);
    console.log(JSON.stringify({ routed: target, was: hookLabel, source: "agent-override" }));
  });
  return command;
}

// src/cli/commands/rules.ts
init_esm_shims();

// src/rule-scripts/override.ts
init_esm_shims();
import { timingSafeEqual } from "crypto";
import { readFileSync as readFileSync47 } from "fs";
var MANAGED_HOOK_MARKER = "paqad-ai hook --managed";
function hookCommands(value) {
  const hooks = value && typeof value === "object" ? value.hooks : null;
  if (!hooks || typeof hooks !== "object") return [];
  return Object.values(hooks).flatMap(
    (entries) => (Array.isArray(entries) ? entries : []).flatMap((entry) => {
      const inner = entry && typeof entry === "object" ? entry.hooks : null;
      return (Array.isArray(inner) ? inner : []).flatMap((hook) => {
        const command = hook && typeof hook === "object" ? hook.command : null;
        return typeof command === "string" ? [command] : [];
      });
    })
  );
}
function managedSettingsEnforcePaqad(paths) {
  return paths.some((path2) => {
    let parsed;
    try {
      parsed = JSON.parse(readFileSync47(path2, "utf8"));
    } catch {
      return false;
    }
    return hookCommands(parsed).some((command) => command.includes(MANAGED_HOOK_MARKER));
  });
}
function sameToken(expected, given) {
  const a = Buffer.from(expected);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}
function applyRuleOverride(request) {
  const { projectRoot } = request;
  const hint = request.sessionHint?.trim() ?? "";
  if (hint === "") {
    return { ok: false, reason: "no session id, so there is no rule stop to answer" };
  }
  const file = toProjectRelativePath(projectRoot, request.file);
  if (file === null) {
    return { ok: false, reason: `${request.file} is outside this project` };
  }
  const record = readRuleStopRecord(projectRoot, hint);
  if (!record) {
    return { ok: false, reason: "no rule stop is recorded for this session" };
  }
  if (record.managed || managedSettingsEnforcePaqad(request.managedSettingsPaths ?? defaultManagedSettingsPaths())) {
    return { ok: false, reason: "this rule is enforced by your organization's settings" };
  }
  if (!record.sole) {
    return {
      ok: false,
      reason: "another paqad gate also stopped this edit, so it cannot be allowed once"
    };
  }
  const recordFile = toProjectRelativePath(projectRoot, record.file);
  if (record.rule !== request.rule || recordFile !== file) {
    return { ok: false, reason: "the last rule stop was for a different rule or file" };
  }
  if (request.toolUseId !== void 0 && record.tool_use_id !== request.toolUseId) {
    return { ok: false, reason: "the last rule stop was for a different tool call" };
  }
  if (record.used || !sameToken(record.token, request.token)) {
    return { ok: false, reason: "the override token is missing, wrong or already used" };
  }
  const dirName = currentFeature(projectRoot, resolveSessionId(projectRoot, hint));
  if (!dirName) {
    return { ok: false, reason: "no active change to record the override in" };
  }
  markRuleStopAllowedOnce(projectRoot, record);
  const row = appendRuleOverride(projectRoot, dirName, {
    rule: record.rule,
    file,
    toolUseId: record.tool_use_id,
    reason: request.reason?.trim() || void 0,
    sessionId: hint,
    now: request.now
  });
  return { ok: true, row, dirName };
}
function recordEditOutcome(request) {
  const { projectRoot, outcome } = request;
  const hint = request.sessionHint?.trim() ?? "";
  if (hint === "") return { ok: false, reason: "no session id, so there is no override to follow" };
  if (!isEditOutcome(outcome)) {
    return { ok: false, reason: `${outcome} is not landed, refused or still-blocked` };
  }
  const toolUseId = request.toolUseId?.trim() ?? "";
  if (toolUseId === "") return { ok: false, reason: "an outcome needs the tool call it follows" };
  const file = toProjectRelativePath(projectRoot, request.file);
  if (file === null) return { ok: false, reason: `${request.file} is outside this project` };
  const dirName = currentFeature(projectRoot, resolveSessionId(projectRoot, hint));
  if (!dirName) return { ok: false, reason: "no active change to record the outcome in" };
  if (!overrideAwaitsOutcome(projectRoot, dirName, { rule: request.rule, file, toolUseId })) {
    return {
      ok: false,
      reason: "no override for this tool call is waiting for its outcome"
    };
  }
  const row = appendRuleOverrideOutcome(projectRoot, dirName, {
    rule: request.rule,
    file,
    toolUseId,
    outcome,
    sessionId: hint,
    now: request.now
  });
  return { ok: true, row, dirName };
}

// src/cli/commands/rules.ts
function createRulesCommand() {
  const command = new Command("rules").description("Manage the rules-as-scripts enforcement map");
  command.command("compile").description("Generate or refresh rule-script-map.yml from the rule tree (arms the gate)").option("--project-root <path>", "Project root", process.cwd()).option("--silent", "Suppress the machine-readable summary line", false).action((options) => {
    const result = compileRuleScripts(options.projectRoot);
    console.log(
      `**\u25B8 paqad** \xB7 compiled the rule-script map \u2014 ${result.ruleCount} rule${result.ruleCount === 1 ? "" : "s"} listed, ${result.scriptedCount} script-enforced. The deterministic gate is armed.`
    );
    if (!options.silent) {
      console.log(
        JSON.stringify({
          compiled: true,
          rules: result.ruleCount,
          scripted: result.scriptedCount
        })
      );
    }
  });
  command.command("load").description(
    "Load the rules that apply to this change and record it: prints the applicable full rule text and writes rules-loaded.json into the active feature bundle"
  ).option("--project-root <path>", "Project root", process.cwd()).option(
    "--session <id>",
    "Session id (defaults to SE_SESSION / CLAUDE_SESSION_ID, then the shared ledger-session cache)"
  ).option("--silent", "Suppress the machine-readable summary line", false).action(async (options) => {
    const sessionId = resolveSessionId(
      options.projectRoot,
      options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
    );
    const applicability = await resolveRuleApplicabilityForChange(
      options.projectRoot,
      sessionId,
      {
        dirName: currentFeature(options.projectRoot, sessionId)
      }
    );
    if (!applicability.hasStore) {
      console.log(
        "**\u25B8 paqad** \xB7 no compiled rules for this project \u2014 nothing to load. Run `paqad-ai rules compile` if you expected rules here."
      );
      if (!options.silent) {
        console.log(JSON.stringify({ loaded: false, reason: "no-compiled-rules" }));
      }
      return;
    }
    console.log(
      `## Rules loaded for this change \u2014 ${applicability.applicable.length} apply

${applicability.loadedRuleText}
`
    );
    const record = writeRulesLoaded(options.projectRoot, sessionId, {
      applicable: applicability.applicable,
      ruleTextHash: applicability.ruleTextHash,
      ruleSourceHashes: hashRuleSources(options.projectRoot, applicability.ruleSourcePaths),
      changedPaths: applicability.changedPaths
    });
    if (!record) {
      console.log(
        "**\u25B8 paqad** \xB7 loaded the applicable rules, but no feature is active so nothing was recorded \u2014 run `paqad-ai stage start planning` to open the change first."
      );
      if (!options.silent) {
        console.log(
          JSON.stringify({ loaded: true, recorded: false, reason: "no-active-feature" })
        );
      }
      return;
    }
    const dirName = currentFeature(options.projectRoot, sessionId);
    console.log(
      `**\u25B8 paqad** \xB7 loaded and recorded ${record.applicable_rules.length} applicable rule${record.applicable_rules.length === 1 ? "" : "s"} for this change.`
    );
    if (!options.silent) {
      console.log(
        JSON.stringify({
          loaded: true,
          recorded: true,
          rules: record.applicable_rules.length,
          rule_text_hash: record.rule_text_hash,
          bundle: dirName
        })
      );
    }
  });
  command.command("override").description(
    "Record a person allowing one edit past a rule-script stop, using the one-time token from that stop (refused for a stop enforced by managed settings). With --outcome, record once what happened to that allowed-once edit"
  ).requiredOption("--rule <id>", "Rule id from the stop").requiredOption("--file <path>", "File named by the stop").option("--token <token>", "One-time token from the stop (required unless --outcome)").option("--tool-use-id <id>", "Tool call the stop was for").option("--reason <text>", "Why the person allowed it").option(
    "--outcome <landed|refused|still-blocked>",
    "Record what happened to the allowed-once edit, once, after its override line"
  ).option("--project-root <path>", "Project root", process.cwd()).option("--session <id>", "Session id (defaults to SE_SESSION / CLAUDE_SESSION_ID)").action((options) => {
    const sessionHint2 = options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? readLedgerSessionId(options.projectRoot);
    if (options.outcome !== void 0) {
      const recorded = recordEditOutcome({
        projectRoot: options.projectRoot,
        sessionHint: sessionHint2,
        rule: options.rule,
        file: options.file,
        toolUseId: options.toolUseId,
        outcome: options.outcome
      });
      if (!recorded.ok) {
        console.error(`**\u25B8 paqad** \xB7 outcome not recorded: ${recorded.reason}.`);
        process.exitCode = 1;
        return;
      }
      console.log(
        `**\u25B8 paqad** \xB7 recorded that the allowed-once edit of ${recorded.row.file} ${OUTCOME_WORDS[recorded.row.outcome]}.`
      );
      console.log(
        JSON.stringify({ outcome_recorded: true, ...recorded.row, bundle: recorded.dirName })
      );
      return;
    }
    const outcome = applyRuleOverride({
      projectRoot: options.projectRoot,
      sessionHint: sessionHint2,
      rule: options.rule,
      file: options.file,
      token: options.token ?? "",
      toolUseId: options.toolUseId,
      reason: options.reason
    });
    if (!outcome.ok) {
      console.error(`**\u25B8 paqad** \xB7 override refused: ${outcome.reason}.`);
      process.exitCode = 1;
      return;
    }
    console.log(
      `**\u25B8 paqad** \xB7 recorded a one-time override of ${outcome.row.rule} on ${outcome.row.file} by a person. It shows on the receipt.`
    );
    console.log(JSON.stringify({ overridden: true, ...outcome.row, bundle: outcome.dirName }));
  });
  return command;
}
var OUTCOME_WORDS = {
  landed: "landed",
  refused: "was refused",
  "still-blocked": "stayed blocked"
};

// src/cli/commands/setup.ts
init_esm_shims();
import { readFileSync as readFileSync49 } from "fs";

// src/onboarding/onboard-installed-stack.ts
init_esm_shims();

// src/onboarding/readiness.ts
init_esm_shims();
import { existsSync as existsSync47, readdirSync as readdirSync16 } from "fs";
import { join as join77 } from "path";
function verifyReadinessToDevelop(projectRoot) {
  const blockers = [];
  const profile = readProjectProfile(projectRoot, { persistMigration: false });
  let commandsConfigured = false;
  if (!profile) {
    blockers.push(`no project profile found at ${PATHS.PROJECT_PROFILE}`);
  } else {
    const commands = profile.commands;
    const relevant = [commands.dev, commands.build, commands.test];
    const stillUndecided = relevant.some((command) => isUndecidedCommand(command));
    commandsConfigured = !stillUndecided;
    if (stillUndecided) {
      blockers.push("application stack still undecided");
    }
  }
  const moduleDocsPresent = hasModuleDocs(projectRoot);
  if (!moduleDocsPresent) {
    blockers.push(`module documentation missing (${PATHS.MODULES_DIR}/ is absent or empty)`);
  }
  const ready = commandsConfigured && moduleDocsPresent;
  return {
    ready,
    checks: { commandsConfigured, moduleDocsPresent },
    blockers
  };
}
function hasModuleDocs(projectRoot) {
  const modulesDir = join77(projectRoot, PATHS.MODULES_DIR);
  if (!existsSync47(modulesDir)) {
    return false;
  }
  try {
    return readdirSync16(modulesDir).length > 0;
  } catch {
    return false;
  }
}

// src/onboarding/onboard-installed-stack.ts
async function onboardInstalledStack(options = {}) {
  const projectRoot = options.projectRoot ?? process.cwd();
  const existingProfile = readProjectProfile(projectRoot, { persistMigration: false });
  if (!existingProfile) {
    throw new FrameworkError(
      `No paqad workspace at ${projectRoot}. Create one first with \`paqad-ai new project <name>\` (or onboard an existing project with \`paqad-ai onboard\`).`,
      { code: "WORKSPACE_NOT_FOUND", details: { projectRoot } }
    );
  }
  const detected = await new StackIntrospector().snapshot(projectRoot, { persist: false });
  const detectedFrameworks = detected.profile.frameworks;
  const providers = resolveProviders(projectRoot, options.providers);
  const readinessBefore = verifyReadinessToDevelop(projectRoot);
  if (detectedFrameworks.length === 0) {
    return {
      projectRoot,
      onboarded: false,
      detectedFrameworks: [],
      providers,
      commandsRederived: false,
      readiness: readinessBefore,
      recovery: "No application framework detected yet. Install your stack with the official installers the setup plan records (`paqad-ai setup plan show`), then re-run `paqad-ai setup onboard`."
    };
  }
  const commandsRederived = isUndecidedCommands(existingProfile.commands);
  await new OnboardingOrchestrator().run({
    projectRoot,
    adapters: providers,
    selections: {
      providers,
      stack_profile: detected.profile,
      domain: "coding"
    },
    ...commandsRederived ? { profileOverrides: { commands: void 0 } } : {}
  });
  return {
    projectRoot,
    onboarded: true,
    detectedFrameworks,
    providers,
    commandsRederived,
    readiness: verifyReadinessToDevelop(projectRoot)
  };
}
function resolveProviders(projectRoot, explicit) {
  if (explicit && explicit.length > 0) {
    return explicit;
  }
  const manifest = readExistingOnboardingManifest(projectRoot);
  return manifest ? [manifest.adapter] : ["claude-code"];
}

// src/onboarding/setup-plan.ts
init_esm_shims();
import { existsSync as existsSync48, mkdirSync as mkdirSync18, readFileSync as readFileSync48, renameSync as renameSync8, writeFileSync as writeFileSync17 } from "fs";
import { dirname as dirname18, join as join78 } from "path";
var SETUP_STEP_STATES = [
  "pending",
  "in_progress",
  "blocked",
  "completed"
];
function validateSetupPlan(plan) {
  const errors = [];
  if (typeof plan !== "object" || plan === null || Array.isArray(plan)) {
    return { ok: false, errors: ["setup plan must be a JSON object"] };
  }
  const steps = plan.steps;
  if (!Array.isArray(steps) || steps.length === 0) {
    return { ok: false, errors: ['setup plan must have a non-empty "steps" array'] };
  }
  const seenIds = /* @__PURE__ */ new Set();
  steps.forEach((raw, index) => {
    const label = `step ${index + 1}`;
    if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
      errors.push(`${label}: must be an object`);
      return;
    }
    const step = raw;
    for (const field of ["id", "description", "command", "verify", "recovery"]) {
      const value = step[field];
      if (typeof value !== "string" || value.trim().length === 0) {
        errors.push(`${label}: "${field}" must be a non-empty string`);
      }
    }
    const id = step.id;
    if (typeof id === "string" && id.trim().length > 0) {
      if (seenIds.has(id)) {
        errors.push(`${label}: duplicate step id "${id}"`);
      }
    }
    const prerequisite = step.prerequisite;
    if (prerequisite !== void 0) {
      if (typeof prerequisite !== "string" || !seenIds.has(prerequisite)) {
        errors.push(
          `${label}: prerequisite "${String(prerequisite)}" must reference an earlier step's id`
        );
      }
    }
    const state = step.state;
    if (!SETUP_STEP_STATES.includes(state)) {
      errors.push(
        `${label}: "state" must be one of ${SETUP_STEP_STATES.join(", ")} (got "${String(state)}")`
      );
    }
    if (typeof id === "string" && id.trim().length > 0) {
      seenIds.add(id);
    }
  });
  return { ok: errors.length === 0, errors };
}
function setupPlanPath(projectRoot) {
  return join78(projectRoot, ".paqad", "setup-plan.json");
}
function readSetupPlan(projectRoot) {
  const absPath = setupPlanPath(projectRoot);
  if (!existsSync48(absPath)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync48(absPath, "utf8"));
  } catch {
    return null;
  }
}

// src/cli/commands/setup.ts
function createSetupCommand() {
  const setup = new Command("setup").description(
    "Inspect the setup-plan record and verify readiness to develop (Slice 3)"
  );
  const plan = new Command("plan").description("Work with the setup-plan record");
  plan.command("validate").description("Validate a setup-plan JSON file").argument("<file>", "Path to the setup-plan JSON file").action((file) => {
    let parsed;
    try {
      parsed = JSON.parse(readFileSync49(file, "utf8"));
    } catch (error) {
      console.error(`\u2716 could not read JSON from ${file}: ${errorMessage2(error)}`);
      process.exitCode = 1;
      return;
    }
    const result = validateSetupPlan(parsed);
    if (result.ok) {
      console.log(`\u{1F7E2} setup plan is valid: ${file}`);
      return;
    }
    console.error(`\u{1F534} setup plan is invalid: ${file}`);
    for (const line of result.errors) {
      console.error(`  - ${line}`);
    }
    process.exitCode = 1;
  });
  plan.command("show").description("Show the recorded setup plan and each step state").option("--project-root <path>", "Project root", process.cwd()).action((options) => {
    const record = readSetupPlan(options.projectRoot);
    if (!record) {
      console.log("No setup plan recorded yet (.paqad/setup-plan.json is absent).");
      return;
    }
    console.log(`Setup plan \u2014 scope: ${record.slice}`);
    record.steps.forEach((step, index) => {
      const version = step.version ? ` (v${step.version})` : "";
      const prerequisite = step.prerequisite ? ` [after ${step.prerequisite}]` : "";
      console.log(`  ${index + 1}. [${step.state}] ${step.id}${version}${prerequisite}`);
      console.log(`     ${step.description}`);
      console.log(`     run: ${step.command}`);
    });
  });
  setup.addCommand(plan);
  setup.command("onboard").description("Onboard the actual installed stack of a created workspace (SET-03)").option("--project-root <path>", "Project root", process.cwd()).option(
    "--providers <provider...>",
    "Providers to onboard (defaults to the workspace\u2019s recorded provider)"
  ).action(async (options) => {
    let result;
    try {
      result = await onboardInstalledStack({
        projectRoot: options.projectRoot,
        providers: options.providers
      });
    } catch (error) {
      console.error(`\u2716 ${errorMessage2(error)}`);
      process.exitCode = 1;
      return;
    }
    if (!result.onboarded) {
      console.error("\u{1F534} no application stack detected \u2014 nothing onboarded.");
      if (result.recovery) {
        console.error(`  \u2192 ${result.recovery}`);
      }
      process.exitCode = 1;
      return;
    }
    console.log(`\u{1F7E2} onboarded the installed stack: ${result.detectedFrameworks.join(", ")}`);
    console.log(
      result.commandsRederived ? "  \u2192 re-derived real commands from the detected stack (was undecided)." : "  \u2192 kept the existing commands (already decided); refreshed generated surfaces."
    );
    if (result.readiness.ready) {
      console.log("  \u{1F7E2} ready to develop.");
    } else {
      console.log("  \u{1F7E1} not yet ready to develop:");
      for (const blocker of result.readiness.blockers) {
        console.log(`     - ${blocker}`);
      }
      console.log("     run `paqad-ai setup verify` after addressing these.");
    }
  });
  setup.command("verify").description("Verify the project is ready to develop (FR-7)").option("--project-root <path>", "Project root", process.cwd()).action((options) => {
    const result = verifyReadinessToDevelop(options.projectRoot);
    if (result.ready) {
      console.log("\u{1F7E2} ready to develop \u2014 commands configured and module documentation present.");
      return;
    }
    console.error("\u{1F534} not ready to develop:");
    for (const blocker of result.blockers) {
      console.error(`  - ${blocker}`);
    }
    process.exitCode = 1;
  });
  return setup;
}
function errorMessage2(error) {
  return error instanceof Error ? error.message : "unknown error";
}

// src/cli/commands/sitemap.ts
init_esm_shims();
import { existsSync as existsSync49, readFileSync as readFileSync50 } from "fs";

// src/site-map/creation-flow.ts
init_esm_shims();

// src/core/types/site-map-answers.ts
init_esm_shims();
var SITE_MAP_ANSWERS_SCHEMA_VERSION = 1;
var SITE_MAP_ANSWER_CATEGORIES = [
  "app-kind",
  "actors-roles",
  "sensitive-surface",
  "journey-priority",
  "labels-language",
  "grouping",
  "tool-access",
  "journey-scope"
];

// src/site-map/creation-answers.ts
init_esm_shims();
import { join as join79 } from "path";
function canonicalAnswersPath(projectRoot) {
  return join79(projectRoot, PATHS.SITE_MAP_CANONICAL_ANSWERS);
}
function readCreationAnswers(projectRoot) {
  const parsed = readYaml(canonicalAnswersPath(projectRoot));
  if (parsed === null) return null;
  return validateSiteMapAnswers(parsed).valid ? parsed : null;
}
function writeCreationAnswers(projectRoot, file) {
  const result = validateSiteMapAnswers(file);
  if (!result.valid) {
    throw new SiteMapSchemaError("creation answers failed schema validation", result.errors);
  }
  return writeYamlAtomic(canonicalAnswersPath(projectRoot), file);
}
function normalizeAnchors(anchors) {
  return [...anchors].sort();
}
function anchorsEqual(a, b) {
  if (a.length !== b.length) return false;
  const left = normalizeAnchors(a);
  const right = normalizeAnchors(b);
  return left.every((value, index) => value === right[index]);
}
function reconcileQuestions(candidates, persisted) {
  const byId = /* @__PURE__ */ new Map();
  for (const answer of persisted?.answers ?? []) {
    byId.set(answer.question_id, answer);
  }
  const to_ask = [];
  const reused = [];
  const reopened = [];
  for (const candidate of candidates) {
    const prior = byId.get(candidate.question_id);
    if (prior !== void 0 && prior.decided_by === "human") {
      if (anchorsEqual(prior.anchors, candidate.anchors)) {
        reused.push(prior);
      } else {
        to_ask.push(candidate);
        reopened.push(candidate.question_id);
      }
    } else {
      to_ask.push(candidate);
    }
  }
  return { to_ask, reused, reopened };
}
function recordAnswers(persisted, decided) {
  const byId = /* @__PURE__ */ new Map();
  for (const answer of persisted?.answers ?? []) {
    byId.set(answer.question_id, { ...answer, anchors: normalizeAnchors(answer.anchors) });
  }
  for (const answer of decided) {
    byId.set(answer.question_id, { ...answer, anchors: normalizeAnchors(answer.anchors) });
  }
  const answers = [...byId.values()].sort((a, b) => a.question_id.localeCompare(b.question_id));
  return { schema_version: SITE_MAP_ANSWERS_SCHEMA_VERSION, generated_by: "paqad-ai", answers };
}
function provenanceOf(answer) {
  return answer.decided_by === "human" ? { derivation: "human", confidence: "high" } : { derivation: "agent", confidence: "low" };
}
function collectAnchors(refs) {
  const anchors = /* @__PURE__ */ new Set();
  for (const ref of refs) {
    for (const pointer of normalizeEvidence(ref)) anchors.add(locate(pointer));
  }
  return [...anchors].sort();
}
function buildCandidateQuestions(map) {
  const candidates = [];
  const ungrouped = map.surfaces.filter((surface) => surface.area === void 0);
  if (ungrouped.length > 0) {
    candidates.push({
      question_id: "grouping:ungrouped-surfaces",
      category: "grouping",
      question: `${ungrouped.length} surface(s) are not assigned to an area, so the map has no district for them. How should they be grouped?`,
      anchors: collectAnchors(ungrouped.map((surface) => surface.evidence)),
      recommended_default: {
        answer: "group-by-module",
        reason: "Group each ungrouped surface under the module it already belongs to."
      }
    });
  }
  const guards = map.guards ?? [];
  const actors = map.actors ?? [];
  if (guards.length > 0 && actors.length === 0) {
    candidates.push({
      question_id: "actors-roles:no-actors",
      category: "actors-roles",
      question: `The map defines ${guards.length} guard(s) but names no actors. Who uses the app, and which guards does each satisfy?`,
      anchors: collectAnchors(guards.map((guard) => guard.evidence)),
      recommended_default: {
        answer: "single-authenticated-user",
        reason: "Assume one signed-in user who satisfies every guard until distinct roles are named."
      }
    });
  }
  const proposed = (map.journeys ?? []).filter((journey) => journey.status === "proposed");
  if (proposed.length > 0) {
    candidates.push({
      question_id: "journey-priority:proposed",
      category: "journey-priority",
      question: `${proposed.length} journey(s) are still proposed. Which are real, and which matter most?`,
      anchors: [],
      recommended_default: {
        answer: "keep-all-proposed",
        reason: "Keep every proposed journey until a person deprioritizes one."
      }
    });
  }
  const keyed = map.surfaces.filter(
    (surface) => surface.label_key !== void 0 && (surface.labels === void 0 || surface.label === surface.label_key)
  );
  if (keyed.length > 0) {
    candidates.push({
      question_id: "labels-language:keyed-labels",
      category: "labels-language",
      question: `${keyed.length} surface(s) show a translation key instead of a human label. Which label should the map display?`,
      anchors: collectAnchors(keyed.map((surface) => surface.evidence)),
      recommended_default: {
        answer: "default-locale-label",
        reason: "Resolve each key against the app's default locale catalog."
      }
    });
  }
  return candidates;
}
function buildPreflightQuestions(preflight) {
  const commandIds = new Set(
    preflight.requirements.filter((requirement) => requirement.kind === "command").map((r) => r.id)
  );
  return preflight.questions.filter((question) => commandIds.has(question.id)).map((question) => {
    const recommended = question.options.find((option) => option.recommended) ?? question.options[0];
    return {
      question_id: `tool-access:${question.id}:${question.outcome}`,
      category: "tool-access",
      question: `${question.label}: ${question.why}`,
      anchors: [],
      recommended_default: { answer: recommended.id, reason: recommended.label }
    };
  });
}
var DERIVATION_AUTHORITY = {
  agent: 0,
  convention: 1,
  static: 2,
  human: 3
};
var CONFIDENCE_RANK = { low: 0, medium: 1, high: 2 };
function provenanceRank(p) {
  return [
    p.derivation === void 0 ? -1 : DERIVATION_AUTHORITY[p.derivation],
    p.confidence === void 0 ? -1 : CONFIDENCE_RANK[p.confidence]
  ];
}
function isStronger(a, b) {
  const [ad, ac] = provenanceRank(a);
  const [bd, bc] = provenanceRank(b);
  return ad > bd || ad === bd && ac > bc;
}
var SURFACE_CATEGORIES = /* @__PURE__ */ new Set([
  "grouping",
  "labels-language",
  "sensitive-surface"
]);
function motivatingProvenance(anchors, answers, categories) {
  if (anchors.length === 0) return null;
  let best = null;
  for (const answer of answers) {
    if (!categories.has(answer.category) || answer.anchors.length === 0) continue;
    const cover = new Set(answer.anchors);
    if (!anchors.every((anchor) => cover.has(anchor))) continue;
    const provenance = provenanceOf(answer);
    if (best === null || isStronger(provenance, best)) best = provenance;
  }
  return best;
}
function stampAnswerProvenance(map, answers) {
  let changed = false;
  const surfaces = map.surfaces.map((surface) => {
    const anchors = collectAnchors([surface.evidence]);
    const provenance = motivatingProvenance(anchors, answers, SURFACE_CATEGORIES);
    if (provenance === null || !isStronger(provenance, surface)) return surface;
    changed = true;
    return { ...surface, derivation: provenance.derivation, confidence: provenance.confidence };
  });
  if (!changed) return { map, changed: false };
  return { map: { ...map, surfaces }, changed: true };
}

// src/site-map/creation-flow.ts
function deriveCreationQuestions(projectRoot) {
  const map = readCanonicalSiteMap(projectRoot);
  if (map === null) return { status: "no-map" };
  const reconciliation = reconcileQuestions(
    buildCandidateQuestions(map),
    readCreationAnswers(projectRoot)
  );
  return { status: "ready", reconciliation };
}
function recordCreationAnswers(projectRoot, decisions, preflight) {
  const map = readCanonicalSiteMap(projectRoot);
  if (map === null && preflight === void 0) return { status: "no-map" };
  const candidates = /* @__PURE__ */ new Map();
  if (map !== null) {
    for (const candidate of buildCandidateQuestions(map))
      candidates.set(candidate.question_id, candidate);
  }
  if (preflight !== void 0) {
    for (const candidate of buildPreflightQuestions(preflight)) {
      candidates.set(candidate.question_id, candidate);
    }
  }
  const decided = [];
  const unknown = [];
  for (const decision of decisions) {
    const candidate = candidates.get(decision.question_id);
    if (candidate === void 0) {
      unknown.push(decision.question_id);
      continue;
    }
    decided.push({
      question_id: candidate.question_id,
      category: candidate.category,
      question: candidate.question,
      answer: decision.answer,
      decided_by: decision.decided_by,
      anchors: candidate.anchors
    });
  }
  if (decided.length === 0) {
    return {
      status: "recorded",
      recorded: 0,
      unknown,
      answers_path: null,
      stamped: false,
      map_path: null
    };
  }
  const file = recordAnswers(readCreationAnswers(projectRoot), decided);
  const answers_path = writeCreationAnswers(projectRoot, file);
  if (map === null) {
    return {
      status: "recorded",
      recorded: decided.length,
      unknown,
      answers_path,
      stamped: false,
      map_path: null
    };
  }
  const { map: stampedMap, changed } = stampAnswerProvenance(map, file.answers);
  const map_path = changed ? writeCanonicalSiteMap(projectRoot, stampedMap) : null;
  return {
    status: "recorded",
    recorded: decided.length,
    unknown,
    answers_path,
    stamped: changed,
    map_path
  };
}
var VALID_DECIDED_BY = /* @__PURE__ */ new Set(["human", "default"]);
var VALID_CATEGORY = new Set(SITE_MAP_ANSWER_CATEGORIES);
function parseCreationDecisions(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("decisions input is not valid JSON");
  }
  if (!Array.isArray(parsed)) {
    throw new Error("decisions input must be a JSON array of { question_id, answer, decided_by }");
  }
  return parsed.map((entry, index) => {
    if (typeof entry !== "object" || entry === null) {
      throw new Error(`decision ${index} must be an object`);
    }
    const record = entry;
    const { question_id, answer, decided_by, category } = record;
    if (typeof question_id !== "string" || question_id.length === 0) {
      throw new Error(`decision ${index} needs a non-empty "question_id"`);
    }
    if (typeof answer !== "string" || answer.length === 0) {
      throw new Error(`decision ${index} needs a non-empty "answer"`);
    }
    if (typeof decided_by !== "string" || !VALID_DECIDED_BY.has(decided_by)) {
      throw new Error(`decision ${index} "decided_by" must be "human" or "default"`);
    }
    if (category !== void 0 && (typeof category !== "string" || !VALID_CATEGORY.has(category))) {
      throw new Error(`decision ${index} has an unknown "category"`);
    }
    return { question_id, answer, decided_by };
  });
}

// src/site-map/draft.ts
init_esm_shims();
function areaIdFor(module) {
  const slug = slugify(module);
  return slug.length > 0 ? slug : module;
}
function buildSiteMapDraft(extraction, app) {
  const groups = deriveSiteMapInventory(extraction).groups;
  const areasById = /* @__PURE__ */ new Map();
  for (const module of groups) {
    const id = areaIdFor(module);
    if (!areasById.has(id)) areasById.set(id, { id, label: module });
  }
  const areas = [...areasById.values()];
  const surfaces = extraction.surfaces.map((surface) => {
    const entry = {
      id: surface.raw_id,
      kind: surface.kind,
      label: surface.label,
      evidence: surface.evidence
    };
    if (surface.entry !== void 0) entry.entry = surface.entry;
    if (surface.module !== void 0) {
      entry.module = surface.module;
      entry.area = areaIdFor(surface.module);
    }
    if (surface.guards !== void 0 && surface.guards.length > 0) {
      entry.guard = surface.guards;
    }
    return entry;
  });
  const map = {
    schema_version: SITE_MAP_SCHEMA_VERSION,
    app: {
      name: app.name,
      kind: app.kind,
      frameworks: app.frameworks
    },
    ...areas.length > 0 ? { areas } : {},
    surfaces
  };
  return map;
}
var UNGROUPED_UNIT_ID = "group:ungrouped";
var UNGROUPED_UNIT_LABEL = "Ungrouped surfaces";
function deriveDraftUnits(extraction) {
  const byId = /* @__PURE__ */ new Map();
  for (const module of deriveSiteMapInventory(extraction).groups) {
    const id = `group:${areaIdFor(module)}`;
    if (!byId.has(id)) {
      byId.set(id, { id, label: module, surface_ids: [], source_files: [] });
    }
  }
  const files = /* @__PURE__ */ new Map();
  for (const surface of extraction.surfaces) {
    let id;
    if (surface.module !== void 0) {
      id = `group:${areaIdFor(surface.module)}`;
    } else {
      id = UNGROUPED_UNIT_ID;
      if (!byId.has(id)) {
        byId.set(id, { id, label: UNGROUPED_UNIT_LABEL, surface_ids: [], source_files: [] });
      }
    }
    const unit = byId.get(id);
    unit.surface_ids.push(surface.raw_id);
    const seen = files.get(id) ?? /* @__PURE__ */ new Set();
    for (const evidence of surface.evidence) seen.add(evidence.file);
    files.set(id, seen);
  }
  const units = [...byId.values()];
  for (const unit of units) {
    unit.source_files = [...files.get(unit.id)].sort((a, b) => a.localeCompare(b));
  }
  return units;
}
function mergeSiteMapDraft(existing, draft, surfaceIds) {
  const picked = draft.surfaces.filter((surface) => surfaceIds.has(surface.id));
  if (existing === null) {
    const areas = (draft.areas ?? []).filter(
      (area) => picked.some((surface) => surface.area === area.id)
    );
    return {
      schema_version: draft.schema_version,
      app: draft.app,
      ...areas.length > 0 ? { areas } : {},
      surfaces: picked
    };
  }
  const existingSurfaceIds = new Set(existing.surfaces.map((surface) => surface.id));
  const appended = picked.filter((surface) => !existingSurfaceIds.has(surface.id));
  const existingAreaIds = new Set((existing.areas ?? []).map((area) => area.id));
  const newAreas = (draft.areas ?? []).filter(
    (area) => !existingAreaIds.has(area.id) && appended.some((surface) => surface.area === area.id)
  );
  const merged = { ...existing, surfaces: [...existing.surfaces, ...appended] };
  if (newAreas.length > 0) {
    merged.areas = [...existing.areas ?? [], ...newAreas];
  }
  return merged;
}

// src/cli/commands/sitemap.ts
function createSitemapCommand() {
  const command = new Command("sitemap").description(
    "Map the application \u2014 surfaces, transitions, guards, and curated journeys"
  );
  command.command("run").description("Check the stored map against the code and re-earn its trust and freshness").option("--project-root <path>", "Project root", process.cwd()).option("--quiet", "Suppress the machine-readable summary line", false).action(async (options) => {
    try {
      const result = await runSiteMapAudit({
        projectRoot: options.projectRoot,
        gatherer: createSiteMapGatherer(options.projectRoot)
      });
      const verdictLine = {
        safe: "**\u25B8 paqad** \xB7 site map \u2014 the map matches the code. Safe to merge.",
        attention: `**\u25B8 paqad** \xB7 site map \u2014 found ${result.finding_count} thing(s) worth a look. Needs your attention.`,
        inconclusive: "**\u25B8 paqad** \xB7 site map \u2014 could not confirm the map against the code. Inconclusive."
      };
      console.log(verdictLine[result.verdict]);
      const linkNoun = result.transition_count === 1 ? "link" : "links";
      console.log(`> ${result.transition_count} navigation ${linkNoun} recorded in the map.`);
      for (const blocked of result.blocked_checks) {
        console.log(`> \u26AA ${blocked.check} skipped \u2014 ${blocked.reason}`);
      }
      if (result.trust_restamp.status === "stamped") {
        console.log(`> Stamped earned trust and freshness into ${result.trust_restamp.path}`);
      }
      if (result.baseline_created) {
        console.log("> Baseline recorded \u2014 future runs will flag only what is new.");
      }
      process.exitCode = result.exit_code;
      if (!options.quiet) {
        console.log(
          JSON.stringify({
            report_id: result.report_id,
            verdict: result.verdict,
            findings: result.finding_count,
            transitions: result.transition_count,
            blocked_checks: result.blocked_checks.length,
            baseline_created: result.baseline_created
          })
        );
      }
    } catch (error) {
      console.error(`**\u25B8 paqad** \xB7 sitemap run failed: ${error.message}`);
      process.exitCode = 2;
    }
  });
  command.command("draft").description("Write the map's starting skeleton from the code so you only fill in the meaning").option("--project-root <path>", "Project root", process.cwd()).action(async (options) => {
    try {
      const root = options.projectRoot;
      const existing = readCanonicalSiteMap(root);
      if (existing === null && existsSync49(canonicalAppMapPath(root))) {
        console.error(
          "**\u25B8 paqad** \xB7 sitemap draft refused: docs/site-map/app-map.yaml exists but is not a readable, schema-valid map, and drafting over it would destroy authored content. Fix or remove the file, then re-run."
        );
        process.exitCode = 2;
        return;
      }
      const gathered = await gatherSiteMapReport({
        projectRoot: root,
        gatherer: createSiteMapGatherer(root),
        workflow: "site-map",
        now: /* @__PURE__ */ new Date()
      });
      const inventory = deriveSiteMapInventory(gathered.extraction);
      const unitDefs = deriveDraftUnits(gathered.extraction);
      let progress = await readProgress(root);
      if (progress === null) {
        progress = createEmptyProgress(inventory, /* @__PURE__ */ new Date());
      } else {
        progress.inventory = { screens: inventory.screens, groups: [...inventory.groups] };
      }
      await recoverInFlight(root, progress);
      for (const def of unitDefs) {
        const unit = progress.units[def.id];
        if (unit === void 0) {
          progress.units[def.id] = createUnit({
            id: def.id,
            kind: "group",
            label: def.label,
            artifact: null,
            source_files: def.source_files
          });
        } else {
          unit.source_files = [...def.source_files];
        }
      }
      const { skipped } = await reconcileDoneUnits(root, progress);
      await saveProgress(root, progress, /* @__PURE__ */ new Date());
      const skeleton = buildSiteMapDraft(gathered.extraction, gathered.report.app);
      const transitions = gatherSiteMapTransitions(root, gathered.extraction.surfaces);
      const resolution = resolveTransitions(transitions, skeleton.surfaces);
      const draft = {
        ...skeleton,
        surfaces: attachResolvedTransitions(skeleton.surfaces, resolution.resolved)
      };
      const defsById = new Map(unitDefs.map((def) => [def.id, def]));
      let map = existing;
      let mapPath = null;
      let appended = 0;
      for (const unit of Object.values(progress.units)) {
        if (unit.state === "done") continue;
        const surfaceIds = new Set(defsById.get(unit.id)?.surface_ids ?? []);
        startUnit(unit, /* @__PURE__ */ new Date());
        await saveProgress(root, progress, /* @__PURE__ */ new Date());
        const before = map === null ? 0 : map.surfaces.length;
        map = mergeSiteMapDraft(map, draft, surfaceIds);
        mapPath = writeCanonicalSiteMap(root, map);
        appended += map.surfaces.length - before;
        completeUnit(unit, await hashSourceFiles(root, unit.source_files), /* @__PURE__ */ new Date());
        await saveProgress(root, progress, /* @__PURE__ */ new Date());
      }
      if (map === null) {
        map = draft;
        mapPath = writeCanonicalSiteMap(root, map);
        appended = draft.surfaces.length;
      }
      const kept = existing === null ? 0 : existing.surfaces.length;
      if (mapPath === null) {
        console.log(
          `**\u25B8 paqad** \xB7 site map \u2014 nothing to redraw: ${skipped.length} unchanged group(s), the map at ${canonicalAppMapPath(root)} is already up to date (kept ${kept} existing surface(s)).`
        );
      } else {
        console.log(
          `**\u25B8 paqad** \xB7 site map \u2014 drafted ${appended} new surface(s) into ${mapPath} (kept ${kept} existing, skipped ${skipped.length} unchanged group(s)). Add the meaning the code does not carry, then run \`sitemap run\` to prove it.`
        );
      }
      const unresolved = buildUnresolvedLinksCheck(resolution.dropped);
      if (unresolved !== null) {
        console.log(`**\u25B8 paqad** \xB7 site map \u2014 ${unresolved.reason} ${unresolved.install_hint}`);
      }
      process.exitCode = 0;
    } catch (error) {
      console.error(`**\u25B8 paqad** \xB7 sitemap draft failed: ${error.message}`);
      process.exitCode = 2;
    }
  });
  command.command("inventory").description(
    "Report how many screens, groups and guards the code has without changing anything"
  ).option("--project-root <path>", "Project root", process.cwd()).option("--quiet", "Suppress the machine-readable summary line", false).action(async (options) => {
    try {
      const gathered = await gatherSiteMapReport({
        projectRoot: options.projectRoot,
        gatherer: createSiteMapGatherer(options.projectRoot),
        workflow: "site-map",
        now: /* @__PURE__ */ new Date()
      });
      const inventory = deriveSiteMapInventory(gathered.extraction);
      console.log(`**\u25B8 paqad** \xB7 site map \u2014 ${describeSiteMapInventory(inventory)}`);
      process.exitCode = 0;
      if (!options.quiet) {
        console.log(JSON.stringify(inventory));
      }
    } catch (error) {
      console.error(`**\u25B8 paqad** \xB7 sitemap inventory failed: ${error.message}`);
      process.exitCode = 2;
    }
  });
  command.command("status").description("Show how far the last mapping run got and what a resumed run would do next").option("--project-root <path>", "Project root", process.cwd()).action(async (options) => {
    const progress = await readProgress(options.projectRoot);
    if (progress === null) {
      console.log(
        "**\u25B8 paqad** \xB7 site map \u2014 no progress recorded yet, so a run would start from the beginning."
      );
      console.log(JSON.stringify({ status: "none" }));
      process.exitCode = 0;
      return;
    }
    const summary = summarizeProgress(progress);
    const nextLine = summary.next === null ? "Nothing left to do." : `Next up: ${summary.next.id} (${summary.next.label}).`;
    console.log(
      `**\u25B8 paqad** \xB7 site map \u2014 ${summary.done} of ${summary.total} done, ${summary.writing} writing, ${summary.failed} failed, ${summary.remaining} to go. ${nextLine}`
    );
    console.log(JSON.stringify({ status: "ready", ...summary }));
    process.exitCode = 0;
  });
  command.command("questions").description("List the questions the map still needs you to answer").option("--project-root <path>", "Project root", process.cwd()).action((options) => {
    try {
      const result = deriveCreationQuestions(options.projectRoot);
      if (result.status === "no-map") {
        console.log(
          "**\u25B8 paqad** \xB7 site map \u2014 no authored map yet, so there is nothing to ask. Write docs/site-map/app-map.yaml first."
        );
        console.log(JSON.stringify({ status: "no-map", to_ask: [] }));
        return;
      }
      const { to_ask, reused, reopened } = result.reconciliation;
      if (to_ask.length === 0) {
        console.log("**\u25B8 paqad** \xB7 site map \u2014 the map is fully decided. Nothing left to ask.");
      } else {
        console.log(
          `**\u25B8 paqad** \xB7 site map \u2014 ${to_ask.length} question(s) need your call before the map is settled.`
        );
      }
      console.log(
        JSON.stringify({ status: "ready", to_ask, reused_count: reused.length, reopened })
      );
    } catch (error) {
      console.error(`**\u25B8 paqad** \xB7 sitemap questions failed: ${error.message}`);
      process.exitCode = 2;
    }
  });
  command.command("answer").description("Record your answers to those questions and note who decided each").requiredOption("--input <path>", "JSON file of [{ question_id, answer, decided_by }]").option("--project-root <path>", "Project root", process.cwd()).action((options) => {
    try {
      const raw = readFileSync50(options.input, "utf8");
      const decisions = parseCreationDecisions(raw);
      const result = recordCreationAnswers(options.projectRoot, decisions);
      if (result.status === "no-map") {
        console.error(
          "**\u25B8 paqad** \xB7 site map \u2014 no authored map to record answers against. Write docs/site-map/app-map.yaml first."
        );
        process.exitCode = 1;
        return;
      }
      console.log(
        `**\u25B8 paqad** \xB7 site map \u2014 recorded ${result.recorded} answer(s) to the map's creation questions.`
      );
      if (result.unknown.length > 0) {
        console.log(
          `> \u26AA Skipped ${result.unknown.length} answer(s) with no current question: ${result.unknown.join(", ")}`
        );
      }
      if (result.stamped && result.map_path !== null) {
        console.log(`> Stamped who-decided provenance onto ${result.map_path}`);
      }
      process.exitCode = 0;
    } catch (error) {
      console.error(`**\u25B8 paqad** \xB7 sitemap answer failed: ${error.message}`);
      process.exitCode = 2;
    }
  });
  const journey = command.command("journey").description("Confirm or remove the journeys the map has proposed");
  for (const action of ["confirm", "reject"]) {
    journey.command(action).description(
      action === "confirm" ? "Confirm a proposed journey (proposed \u2192 confirmed)" : "Reject a proposed journey (removes it from the map)"
    ).argument("<id>", "Journey id under docs/site-map/journeys/").option("--project-root <path>", "Project root", process.cwd()).action((id, options) => {
      try {
        const result = runJourneyCuration({ projectRoot: options.projectRoot, id, action });
        if (!result.ok) {
          console.error(`**\u25B8 paqad** \xB7 sitemap journey ${action}: ${result.reason}`);
          process.exitCode = 1;
          return;
        }
        console.log(
          result.status === "confirmed" ? `**\u25B8 paqad** \xB7 journey "${id}" confirmed \u2014 it is now part of the map.` : `**\u25B8 paqad** \xB7 journey "${id}" rejected \u2014 removed from the map.`
        );
        process.exitCode = 0;
      } catch (error) {
        console.error(
          `**\u25B8 paqad** \xB7 sitemap journey ${action} failed: ${error.message}`
        );
        process.exitCode = 2;
      }
    });
  }
  return command;
}

// src/cli/commands/spec.ts
init_esm_shims();
import { readFileSync as readFileSync53, rmSync as rmSync6 } from "fs";
import { basename as basename3 } from "path";

// src/cli/commands/spec-pipeline.ts
init_esm_shims();
import { readFileSync as readFileSync52 } from "fs";

// src/providers/index.ts
init_esm_shims();

// src/spec-pipeline/auto-answer.ts
init_esm_shims();

// src/planning/intake-prior-resolver.ts
init_esm_shims();
function findIntakePriorMatch(projectRoot, input) {
  const fingerprint = computeDecisionFingerprint({
    category: input.category,
    question: input.question,
    option_keys: input.options.map((option) => option.option_key),
    repo_state: input.repoState
  });
  const store = new DecisionStore(projectRoot);
  const priorDecisionId = store.findReusableDecision({
    fingerprint,
    category: input.category,
    options: input.options
  });
  if (priorDecisionId === null) {
    return null;
  }
  const prior = store.readResolved(priorDecisionId);
  const chosen = prior?.human_response?.chosen_option_key ?? null;
  if (chosen === null) {
    return null;
  }
  return {
    priorDecisionId,
    chosenOptionKey: chosen,
    rationale: `Auto-resolved from prior decision ${priorDecisionId}.`
  };
}
function buildRepoStateForIntake(active_capabilities, stack, packs) {
  return {
    active_capabilities: active_capabilities ?? [],
    stack: stack ?? null,
    packs: packs ?? []
  };
}

// src/spec-pipeline/auto-answer.ts
var PRECEDENT_ACCEPT_FLOOR = 0.7;
function optionKey(option) {
  return option.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function synthesizeOptions(question) {
  return question.options.map((option) => ({
    option_key: optionKey(option),
    label: option,
    one_line_preview: option,
    trade_off: "",
    evidence: {}
  }));
}
function repoStateFor(projectRoot) {
  const profile = readProjectProfile(projectRoot);
  const stack = profile?.stack_profile?.frameworks?.join("+") || null;
  return buildRepoStateForIntake(
    profile?.active_capabilities ?? [],
    stack,
    void 0
  );
}
function answerFromReuse(projectRoot, question, options, store) {
  const match = findIntakePriorMatch(projectRoot, {
    category: "intake.requirement",
    question: question.business_text,
    options,
    repoState: repoStateFor(projectRoot)
  });
  if (!match) {
    return null;
  }
  const prior = store.readResolved(match.priorDecisionId);
  const answer = prior?.options.find((option) => option.option_key === match.chosenOptionKey)?.label ?? /* v8 ignore next -- findIntakePriorMatch only returns a valid chosen key on a readable prior */
  match.chosenOptionKey;
  return { question: question.business_text, answer, source: match.priorDecisionId };
}
function answerFromPrecedent(projectRoot, question) {
  const context = [question.why_it_matters, ...question.options].join(" ");
  const precedents = findDecisionPrecedents(
    projectRoot,
    { category: "intake.requirement", question: question.business_text, context },
    { floor: PRECEDENT_ACCEPT_FLOOR, limit: 1 }
  );
  const top = precedents[0];
  if (!top) {
    return null;
  }
  if (top.chosen === null) {
    return null;
  }
  return { question: question.business_text, answer: top.chosen, source: top.decision_id };
}
function autoAnswerQuestions(projectRoot, questions) {
  const store = new DecisionStore(projectRoot);
  const answered = [];
  const remaining = [];
  for (const question of questions) {
    const options = synthesizeOptions(question);
    const hit = answerFromReuse(projectRoot, question, options, store) ?? answerFromPrecedent(projectRoot, question);
    if (hit) {
      answered.push(hit);
    } else {
      remaining.push(question);
    }
  }
  return { answered, remaining };
}

// src/spec-pipeline/experts/conflicts.ts
init_esm_shims();
import { createHash as createHash10 } from "crypto";

// src/spec-pipeline/experts/synthesis.ts
init_esm_shims();
var VERDICTS2 = ["ready", "needs-answers", "not-ready"];
var RULINGS = ["pick", "compatible"];
function fail4(error) {
  return { ok: false, error };
}
function normalize2(text) {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}
function validateExpertSynthesis(raw, merged, sources) {
  const parsed = typeof raw === "string" ? parseJson2(raw) : raw;
  if (parsed === void 0) return fail4("expert-synthesis artifact is not valid JSON");
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return fail4("expert-synthesis artifact must be an object");
  }
  const obj = parsed;
  if (typeof obj.verdict !== "string" || !VERDICTS2.includes(obj.verdict)) {
    return fail4(`synthesis verdict must be one of ${VERDICTS2.join(" | ")}`);
  }
  if (!Array.isArray(obj.accepted) || !obj.accepted.every((id) => typeof id === "string")) {
    return fail4("synthesis needs an accepted[] of finding ids");
  }
  if (!Array.isArray(obj.declined)) {
    return fail4("synthesis needs a declined[] array");
  }
  const knownIds = new Set(merged.findings.map((finding) => finding.id ?? ""));
  const seen = /* @__PURE__ */ new Set();
  const accepted = [];
  for (const id of obj.accepted) {
    if (!knownIds.has(id)) {
      return fail4("the chief architect may accept, decline or flag a gap; it may not add findings");
    }
    if (seen.has(id)) return fail4(`finding ${id} appears twice in accept/decline`);
    seen.add(id);
    accepted.push(id);
  }
  const declined = [];
  for (const [index, entry] of obj.declined.entries()) {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
      return fail4(`declined[${index}] must be an object with id and reason`);
    }
    const { id, reason: reason2 } = entry;
    if (typeof id !== "string" || !knownIds.has(id)) {
      return fail4("the chief architect may accept, decline or flag a gap; it may not add findings");
    }
    if (typeof reason2 !== "string" || reason2.trim().length === 0) {
      return fail4(`declined[${index}] ("${id}") needs a non-empty reason`);
    }
    if (seen.has(id)) return fail4(`finding ${id} appears twice in accept/decline`);
    seen.add(id);
    declined.push({ id, reason: reason2.trim() });
  }
  for (const id of knownIds) {
    if (!seen.has(id)) {
      return fail4(`finding ${id} is neither accepted nor declined \u2014 every merged finding must be`);
    }
  }
  const conflictResult = validateConflicts(obj.conflicts, merged);
  if (!conflictResult.ok) return fail4(conflictResult.error);
  const gapResult = validateGaps(obj.gaps, sources);
  if (!gapResult.ok) return fail4(gapResult.error);
  const questions = [];
  if (obj.questions !== void 0) {
    if (!Array.isArray(obj.questions)) return fail4("synthesis questions must be an array");
    for (const [qi, question] of obj.questions.entries()) {
      const validated = validateQuestion(question, `synthesis.questions[${qi}]`, sources);
      if (!validated.ok) return fail4(validated.error);
      questions.push(validated.question);
    }
  }
  const tokens = typeof obj.tokens === "number" && obj.tokens >= 0 ? obj.tokens : 0;
  const renameResult = validateRenames(obj.renames, knownIds);
  if (!renameResult.ok) return fail4(renameResult.error);
  return {
    ok: true,
    artifact: {
      verdict: obj.verdict,
      accepted,
      declined,
      conflicts: conflictResult.conflicts,
      gaps: gapResult.gaps,
      questions,
      tokens,
      ...renameResult.renames.length > 0 ? { renames: renameResult.renames } : {}
    }
  };
}
function validateRenames(raw, knownIds) {
  const renames = [];
  if (raw === void 0) return { ok: true, renames };
  if (!Array.isArray(raw))
    return { ok: false, error: "synthesis renames must be an array", renames };
  for (const [index, entry] of raw.entries()) {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
      return {
        ok: false,
        error: `renames[${index}] must be an object with id and target`,
        renames
      };
    }
    const { id, target } = entry;
    if (typeof id !== "string" || !knownIds.has(id)) {
      return {
        ok: false,
        error: `renames names "${String(id)}", which the merge does not know`,
        renames
      };
    }
    if (typeof target !== "string" || target.trim().length === 0) {
      return { ok: false, error: `renames[${index}] ("${id}") needs a non-empty target`, renames };
    }
    renames.push({ id, target: target.trim() });
  }
  return { ok: true, renames };
}
function applyRenames(findings, renames = []) {
  if (renames.length === 0) return [...findings];
  const byId = new Map(renames.map((rename3) => [rename3.id, rename3.target]));
  return findings.map((finding) => {
    const target = finding.id !== void 0 ? byId.get(finding.id) : void 0;
    if (target === void 0 || target === finding.target) return finding;
    return { ...finding, target, renamed_from: finding.target };
  });
}
function validateConflicts(raw, merged) {
  const conflicts = [];
  if (raw === void 0) {
    return merged.conflicts.length === 0 ? { ok: true, conflicts } : { ok: false, error: "synthesis must resolve every merge conflict exactly once", conflicts };
  }
  if (!Array.isArray(raw)) {
    return { ok: false, error: "synthesis conflicts must be an array", conflicts };
  }
  if (raw.length !== merged.conflicts.length) {
    return {
      ok: false,
      error: `synthesis has ${raw.length} conflict rows but the merge found ${merged.conflicts.length}; resolve each exactly once`,
      conflicts
    };
  }
  const conflictByTarget = new Map(
    merged.conflicts.map((conflict) => [normalize2(conflict.target), conflict])
  );
  const claimsByTarget = new Map(
    merged.conflicts.map((conflict) => [
      normalize2(conflict.target),
      conflict.claims.map(normalize2)
    ])
  );
  const seenTargets = /* @__PURE__ */ new Set();
  for (const [index, entry] of raw.entries()) {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
      return { ok: false, error: `conflicts[${index}] must be an object`, conflicts };
    }
    const { target, ruling, recommendation, merged_claim, rationale } = entry;
    if (typeof target !== "string" || !claimsByTarget.has(normalize2(target))) {
      return {
        ok: false,
        error: `conflicts[${index}] target "${String(target)}" is not a merge conflict`,
        conflicts
      };
    }
    const key = normalize2(target);
    if (seenTargets.has(key)) {
      return { ok: false, error: `conflicts names "${target}" twice`, conflicts };
    }
    seenTargets.add(key);
    if (ruling !== void 0 && !RULINGS.includes(ruling)) {
      return {
        ok: false,
        error: `conflicts[${index}] ruling must be one of ${RULINGS.join(" | ")}`,
        conflicts
      };
    }
    if (typeof rationale !== "string" || rationale.trim().length === 0) {
      return { ok: false, error: `conflicts[${index}] needs a non-empty rationale`, conflicts };
    }
    if (ruling === "compatible") {
      const conflict = conflictByTarget.get(key);
      if (typeof merged_claim !== "string" || merged_claim.trim().length === 0) {
        return {
          ok: false,
          error: `conflicts[${index}] is ruled compatible and needs a non-empty merged_claim`,
          conflicts
        };
      }
      if (hasMustSecurityFinding(conflict)) {
        return {
          ok: false,
          error: `conflicts[${index}] includes a must-level security-auditor finding; rule it pick so the owner decides`,
          conflicts
        };
      }
      conflicts.push({
        target,
        ruling: "compatible",
        merged_claim: merged_claim.trim(),
        rationale: rationale.trim(),
        claims: [...conflict.claims],
        finding_ids: [...conflict.finding_ids]
      });
      continue;
    }
    if (typeof recommendation !== "string" || !claimsByTarget.get(key).includes(normalize2(recommendation))) {
      return {
        ok: false,
        error: `conflicts[${index}] recommendation must be one of the conflicting claims verbatim`,
        conflicts
      };
    }
    conflicts.push({ target, ruling: "pick", recommendation, rationale: rationale.trim() });
  }
  return { ok: true, conflicts };
}
function hasMustSecurityFinding(conflict) {
  return conflict.roles.some(
    (role, index) => role === "security-auditor" && conflict.severities?.[index] === "must"
  );
}
function isCompatibleRuling(conflict) {
  return conflict.ruling === "compatible";
}
function applyCompatibleRulings(findings, conflicts, accepted) {
  let next = [...findings];
  const acceptedIds = [...accepted];
  let mergedCount = 0;
  for (const conflict of conflicts) {
    if (!isCompatibleRuling(conflict)) continue;
    const ids = (conflict.finding_ids ?? []).filter((id) => id.length > 0);
    const sources = ids.map((id) => next.find((finding) => finding.id === id)).filter((finding) => finding !== void 0);
    const first = sources[0];
    if (!first) continue;
    const severity = strongestSeverity(sources);
    const kind = mergedKind(sources);
    const mergedFinding = {
      ...first,
      claim: conflict.merged_claim,
      merged_from: ids,
      ...severity ? { severity } : {},
      ...kind ? { kind } : {}
    };
    next = next.map((finding) => finding.id === first.id ? mergedFinding : finding);
    if (!acceptedIds.includes(first.id)) acceptedIds.push(first.id);
    mergedCount += 1;
  }
  return { findings: next, accepted: acceptedIds, merged: mergedCount };
}
function validateGaps(raw, sources) {
  const gaps = [];
  if (raw === void 0) return { ok: true, gaps };
  if (!Array.isArray(raw)) return { ok: false, error: "synthesis gaps must be an array", gaps };
  for (const [index, entry] of raw.entries()) {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
      return { ok: false, error: `gaps[${index}] must be an object`, gaps };
    }
    const { area, why_it_matters, question } = entry;
    if (typeof area !== "string" || area.trim().length === 0) {
      return { ok: false, error: `gaps[${index}] needs a non-empty area`, gaps };
    }
    if (typeof why_it_matters !== "string" || why_it_matters.trim().length === 0) {
      return { ok: false, error: `gaps[${index}] needs a non-empty why_it_matters`, gaps };
    }
    const gap = { area, why_it_matters };
    if (question !== void 0) {
      const validated = validateQuestion(question, `gaps[${index}].question`, sources);
      if (!validated.ok) return { ok: false, error: validated.error, gaps };
      gap.question = validated.question;
    }
    gaps.push(gap);
  }
  return { ok: true, gaps };
}
function parseJson2(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return void 0;
  }
}

// src/spec-pipeline/experts/conflicts.ts
var CATEGORY3 = "spec.expert_conflict";
function normalize3(text) {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}
function forkKey(target, claims) {
  const claimSet = [...new Set(claims.map(normalize3))].sort();
  return `${normalize3(target)}::${claimSet.join("|")}`;
}
function forkToken(target, claims) {
  const hash = createHash10("sha256").update(forkKey(target, claims)).digest("hex").slice(0, 16);
  return `[expert-conflict-fork:${hash}]`;
}
function optionKeyFor(claim, used) {
  const base = normalize3(claim).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "claim";
  let key = base;
  let suffix = 2;
  while (used.has(key)) key = `${base}-${suffix++}`;
  used.add(key);
  return key;
}
function hasPendingExpertConflict(projectRoot, dirName) {
  const change = featureChangeKey(dirName);
  return readContractDecisions(projectRoot).some(({ packet, status }) => {
    if (status !== "pending" || packet.category !== CATEGORY3) return false;
    return !packet.change || packet.change === change;
  });
}
function mintExpertConflictDecisions(projectRoot, merged, synthesisConflicts, dirName = null) {
  const knownForks = collectKnownForks(projectRoot);
  const recommendationByTarget = new Map(
    synthesisConflicts.map((conflict) => [normalize3(conflict.target), conflict])
  );
  const minted = [];
  const autoResolved = [];
  for (const conflict of merged.conflicts) {
    const chief = recommendationByTarget.get(normalize3(conflict.target));
    if (chief && isCompatibleRuling(chief)) continue;
    const token = forkToken(conflict.target, conflict.claims);
    const prior = knownForks.get(token);
    if (prior?.status === "pending") continue;
    if (prior) {
      autoResolved.push({ target: conflict.target, chosen: prior.chosen, source: prior.id });
      continue;
    }
    const { options, recommendation } = buildOptions(conflict, chief?.recommendation);
    const context = buildContext(conflict, chief?.rationale, token);
    const { id } = createPendingDecision(projectRoot, {
      category: CATEGORY3,
      title: `Experts disagree on ${conflict.target}`,
      context,
      options,
      recommendation,
      origin: "expert-conflict",
      ...dirName ? { change: featureChangeKey(dirName) } : {}
    });
    minted.push({ id, target: conflict.target });
  }
  return { minted, autoResolved };
}
function collectKnownForks(projectRoot) {
  const forks = /* @__PURE__ */ new Map();
  for (const { packet, status } of readContractDecisions(projectRoot)) {
    if (packet.category !== CATEGORY3) continue;
    const match = /\[expert-conflict-fork:[0-9a-f]{16}\]/.exec(packet.context);
    if (!match) continue;
    if (status === "pending") {
      if (!forks.has(match[0])) forks.set(match[0], { status: "pending", id: packet.id });
      continue;
    }
    if (status !== "resolved") continue;
    const resolved = packet;
    if (typeof resolved.chosen !== "string") continue;
    const chosenOption = packet.options.find((option) => option.option_key === resolved.chosen);
    if (!chosenOption) continue;
    if (forks.get(match[0])?.status !== "resolved") {
      forks.set(match[0], { status: "resolved", id: packet.id, chosen: chosenOption.label });
    }
  }
  return forks;
}
function buildOptions(conflict, recommendedClaim) {
  const used = /* @__PURE__ */ new Set();
  const options = [];
  let recommendation = null;
  conflict.claims.forEach((claim, index) => {
    const role = conflict.roles[index] ?? "unknown";
    const key = optionKeyFor(claim, used);
    options.push({ option_key: key, label: `${claim} \u2014 ${role}` });
    if (recommendedClaim !== void 0 && normalize3(recommendedClaim) === normalize3(claim)) {
      recommendation = key;
    }
  });
  return { options, recommendation };
}
function buildContext(conflict, rationale, token) {
  const lines = [];
  if (rationale) lines.push(`Chief architect: ${rationale}`, "");
  lines.push(`Target: ${conflict.target}`);
  conflict.claims.forEach((claim, index) => {
    lines.push(`- ${conflict.roles[index] ?? "unknown"}: ${claim}`);
  });
  lines.push("", token);
  return lines.join("\n");
}

// src/spec-pipeline/experts/voice.ts
init_esm_shims();
import { existsSync as existsSync50 } from "fs";
import { join as join80 } from "path";
var MAX_VOICE_TERMS = 40;
var PACK_GUIDE_FILES = [
  "rules/foundation/guide.md",
  "rules/modules.md",
  "rules/conventions/guide.md",
  "rules/api.md"
];
var KIND_ORDER = {
  glossary: 0,
  role: 1,
  flow: 2,
  rule: 3,
  technical: 4
};
function orderVoiceTerms(vocabulary) {
  return [...vocabulary].map((entry, index) => ({ entry, index })).sort((a, b) => KIND_ORDER[a.entry.kind] - KIND_ORDER[b.entry.kind] || a.index - b.index).map((wrapped) => wrapped.entry).slice(0, MAX_VOICE_TERMS);
}
function renderProjectVoice(input) {
  const lines = ["## Project voice", "", input.stackLine];
  if (input.guidePointers.length > 0) {
    lines.push(
      `Read the stack guides before you write: ${input.guidePointers.map((p) => `\`${p}\``).join(", ")}`
    );
  } else if (input.noGuidesShipped) {
    lines.push("No stack guides shipped for this pack; use the architecture and stack pages.");
  }
  if (input.architecturePage) lines.push(`Architecture page: \`${input.architecturePage}\``);
  if (input.stackPage) lines.push(`Stack page: \`${input.stackPage}\``);
  if (input.technicalPages.length > 0) {
    lines.push(
      `Technical pages for the touched modules: ${input.technicalPages.map((p) => `\`${p}\``).join(", ")}`
    );
  }
  lines.push("", "Business words this project uses (say these, not a synonym):");
  const ordered = orderVoiceTerms(input.vocabulary);
  if (ordered.length === 0) {
    lines.push(
      `- (none documented yet; use the request's own words and flag new terms with "new")`
    );
  } else {
    for (const entry of ordered) {
      const gloss = entry.definition ? `: ${entry.definition}` : "";
      lines.push(`- ${entry.term}${gloss} (${entry.kind}, ${entry.source})`);
    }
  }
  lines.push(
    "",
    "Rule: name what people see in the business words above, and where it lives by its real name in this codebase (a table, a route, a class, a config key). A word from neither is flagged for the chief."
  );
  return lines.join("\n");
}
function buildStackLine(profile, packs) {
  const frameworks = profile?.frameworks ?? [];
  if (frameworks.length === 0) {
    return "Stack: unknown (no framework detected); node / pnpm.";
  }
  const displayFor = (framework) => {
    const pack = packs ? [...packs.packs.values()].find((p) => p.manifest.name === framework) : void 0;
    const name = pack?.manifest.display_name ?? framework;
    const band = (profile?.version_bands ?? []).find(
      (b) => b.name === framework || b.package_name === framework
    );
    return band ? `${name} (${band.range})` : name;
  };
  const names = frameworks.map(displayFor);
  const head = names[0];
  const rest = names.slice(1);
  const frameworkPart = rest.length > 0 ? `${head} with ${rest.join(", ")}` : head;
  const toolchain = profile?.toolchains?.[0];
  const toolPart = toolchain ? `${toolchain.ecosystem} / ${toolchain.package_manager}` : "node / pnpm";
  return `Stack: ${frameworkPart}; ${toolPart}.`;
}
function resolveGuidePointers(runtimeRoot, profile, packs) {
  const frameworks = profile?.frameworks ?? [];
  if (!packs || frameworks.length === 0) return { guidePointers: [], noGuidesShipped: false };
  const activePacks = [...packs.packs.values()].filter((p) => frameworks.includes(p.manifest.name));
  if (activePacks.length === 0) return { guidePointers: [], noGuidesShipped: false };
  const guidePointers = [];
  for (const pack of activePacks) {
    for (const guide of PACK_GUIDE_FILES) {
      if (existsSync50(join80(pack.root, guide))) {
        guidePointers.push(runtimeRelative(runtimeRoot, join80(pack.root, guide)));
      }
    }
  }
  return { guidePointers, noGuidesShipped: guidePointers.length === 0 };
}
function runtimeRelative(runtimeRoot, abs) {
  const posixAbs = abs.replace(/\\/g, "/");
  const posixRoot = runtimeRoot.replace(/\\/g, "/").replace(/\/$/, "");
  if (posixAbs.startsWith(`${posixRoot}/`)) {
    return `runtime/${posixAbs.slice(posixRoot.length + 1)}`;
  }
  return posixAbs;
}
function resolveDocPages(projectRoot) {
  const arch = "docs/instructions/architecture/overview.md";
  const stack = "docs/instructions/stack/overview.md";
  return {
    ...existsSync50(join80(projectRoot, arch)) ? { architecturePage: arch } : {},
    ...existsSync50(join80(projectRoot, stack)) ? { stackPage: stack } : {}
  };
}
function resolveProjectVoiceForRun(projectRoot, dirName) {
  const grounding = readGrounding(projectRoot, dirName);
  const profile = readProjectProfile(projectRoot)?.stack_profile ?? null;
  let packs = null;
  try {
    packs = new StackPackLoader().load({ runtimeRoot: getRuntimeRoot(), projectRoot });
  } catch {
  }
  const { guidePointers, noGuidesShipped } = resolveGuidePointers(getRuntimeRoot(), profile, packs);
  const pages = resolveDocPages(projectRoot);
  const technicalPages = (grounding?.references ?? []).map((ref) => ref.ref).filter((ref) => ref.replace(/\\/g, "/").endsWith("technical.md"));
  return renderProjectVoice({
    stackLine: buildStackLine(profile, packs),
    guidePointers,
    noGuidesShipped,
    ...pages,
    technicalPages,
    vocabulary: grounding?.vocabulary ?? []
  });
}

// src/spec-pipeline/experts/questions.ts
init_esm_shims();

// src/spec-pipeline/experts/types.ts
init_esm_shims();
var MAX_EXPERT_QUESTIONS = 5;

// src/spec-pipeline/experts/questions.ts
function normalize4(question) {
  return question.business_text.trim().toLowerCase().replace(/\s+/g, " ");
}
function collectExpertQuestions(need, notes, synthesis) {
  const out = [];
  if (synthesis) {
    for (const gap of synthesis.gaps) {
      if (gap.question) out.push(gap.question);
    }
    for (const question of synthesis.questions) out.push(question);
  }
  if (need && notes) {
    for (const expert of need.experts) {
      const note = notes.notes.find((entry) => entry.role === expert.role);
      for (const question of note?.questions ?? []) out.push(question);
    }
  }
  return out;
}
function mergeQuestionBatch(enrichment, expertChief, questionBudget) {
  const seen = /* @__PURE__ */ new Set();
  const questions = [];
  for (const question of enrichment.slice(0, Math.max(0, questionBudget))) {
    const key = normalize4(question);
    if (!seen.has(key)) {
      seen.add(key);
      questions.push(question);
    }
  }
  const deferred = [];
  let taken = 0;
  for (const question of expertChief) {
    const key = normalize4(question);
    if (seen.has(key)) continue;
    if (taken >= MAX_EXPERT_QUESTIONS) {
      deferred.push(question);
      continue;
    }
    seen.add(key);
    questions.push(question);
    taken += 1;
  }
  return { questions, deferred_from_experts: deferred };
}

// src/spec-pipeline/grounding.ts
init_esm_shims();
var import_fast_glob5 = __toESM(require_out(), 1);
import { createHash as createHash11 } from "crypto";
import { existsSync as existsSync51, readFileSync as readFileSync51 } from "fs";
import { join as join81 } from "path";
var GROUNDING_FALLBACK_REASONS = {
  ragDisabled: "rag-disabled",
  missingKey: "missing-embedding-key",
  coldIndex: "cold-index",
  budget: "budget-exceeded",
  noResults: "no-retrieval-results"
};
function requestDigest(request) {
  return `sha256:${createHash11("sha256").update(request).digest("hex")}`;
}
var DEFAULT_MAX_FILES = 40;
var DEFAULT_SPARSE_FLOOR = 3;
var SCAFFOLD_HEADINGS = new Set(
  [
    "Overview",
    "Purpose",
    "Summary",
    "Features",
    "Boundaries",
    "Authority",
    "Related",
    "Sources",
    "Source Footprint",
    "How to Update These Docs",
    "User Roles",
    "User Flows",
    "Business Rules",
    "Triggers and Side Effects",
    "Triggers & Side Effects",
    "Error States",
    "Glossary",
    "Module Boundaries",
    "Database Schema",
    "API Endpoints",
    "Models and Relationships",
    "State Management",
    "Error Codes",
    "Dependencies",
    "Configuration",
    "Testing Entry Points"
  ].map((h) => h.toLowerCase())
);
var GLOSSARY_SCAFFOLD_LINE = "define terms a stakeholder might not know";
function isSaneBold(term) {
  return !term.includes("\n") && term.trim().length >= 3 && term.trim().length <= 60;
}
function termsFromMarkdown(markdown) {
  const terms = [];
  for (const line of markdown.split(/\r?\n/)) {
    const heading = /^#{1,6}\s+(.*\S)\s*$/.exec(line);
    if (heading) {
      const text = heading[1].trim();
      if (!SCAFFOLD_HEADINGS.has(text.toLowerCase())) terms.push(text);
    }
  }
  for (const m of markdown.matchAll(/\*\*([^*]+)\*\*/g)) {
    const term = m[1].trim();
    if (isSaneBold(term)) terms.push(term);
  }
  return terms;
}
function sectionHeading(line) {
  const m = /^#{2,6}\s+(.*\S)\s*$/.exec(line);
  return m ? m[1].trim().toLowerCase() : null;
}
function parseGlossaryBullet(line) {
  const bold = /^\s*[-*]\s+\*\*([^*\n]+)\*\*\s*(?::|[-—])\s*(.+?)\s*$/.exec(line);
  if (bold) return { term: bold[1].trim(), definition: bold[2].trim() };
  const plain = /^\s*[-*]\s+([^*:]+?):\s+(.+?)\s*$/.exec(line);
  if (plain) return { term: plain[1].trim(), definition: plain[2].trim() };
  return null;
}
function boldLead(line) {
  const m = /^\s*(?:[-*]\s+)?\*\*([^*\n]+)\*\*/.exec(line);
  if (!m) return null;
  const term = m[1].trim();
  return isSaneBold(term) ? term : null;
}
function backtickedNames(line) {
  const names = [];
  for (const m of line.matchAll(/`([^`]+)`/g)) {
    const name = m[1].trim();
    if (name.length >= 2 && name.length <= 60) names.push(name);
  }
  return names;
}
var BUSINESS_SECTION_KINDS = {
  "user roles": "role",
  "user flows": "flow",
  "business rules": "rule"
};
var TECHNICAL_SECTIONS = /* @__PURE__ */ new Set([
  "database schema",
  "api endpoints",
  "models and relationships",
  "configuration",
  "module boundaries"
]);
function extractBusinessVocabulary(source, content) {
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  let section2 = "";
  const push = (term, kind, definition) => {
    const key = `${kind}:${term.toLowerCase()}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push(definition ? { term, definition, kind, source } : { term, kind, source });
  };
  for (const line of content.split(/\r?\n/)) {
    const heading = sectionHeading(line);
    if (heading !== null) {
      section2 = heading;
      continue;
    }
    if (section2 === "glossary") {
      const g = parseGlossaryBullet(line);
      if (g && g.term.toLowerCase() !== GLOSSARY_SCAFFOLD_LINE && isSaneBold(g.term)) {
        push(g.term, "glossary", g.definition);
      }
      continue;
    }
    const businessKind = BUSINESS_SECTION_KINDS[section2];
    if (businessKind) {
      const lead = boldLead(line);
      if (lead) push(lead, businessKind);
    }
  }
  return out;
}
function extractTechnicalVocabulary(source, content) {
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  let section2 = "";
  const push = (term) => {
    const key = term.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ term, kind: "technical", source });
  };
  for (const line of content.split(/\r?\n/)) {
    const heading = sectionHeading(line);
    if (heading !== null) {
      section2 = heading;
      continue;
    }
    if (!TECHNICAL_SECTIONS.has(section2)) continue;
    for (const name of backtickedNames(line)) push(name);
    const lead = boldLead(line);
    if (lead) push(lead);
  }
  return out;
}
function extractVocabulary(source, content) {
  const posix = source.replace(/\\/g, "/");
  if (posix.endsWith("/business.md") || posix === "business.md") {
    return extractBusinessVocabulary(source, content);
  }
  if (posix.endsWith("/technical.md") || posix === "technical.md") {
    return extractTechnicalVocabulary(source, content);
  }
  return [];
}
function readGlossaryFile(projectRoot) {
  const rel = PATHS.GLOSSARY;
  let content;
  try {
    if (!existsSync51(join81(projectRoot, rel))) return null;
    content = readFileSync51(join81(projectRoot, rel), "utf8");
  } catch {
    return null;
  }
  const vocabulary = [];
  const seen = /* @__PURE__ */ new Set();
  for (const m of content.matchAll(/\*\*([^*\n]+)\*\*/g)) {
    const term = m[1].trim();
    if (!isSaneBold(term)) continue;
    const key = term.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    vocabulary.push({ term, kind: "glossary", source: rel });
  }
  return { reference: { kind: "glossary", ref: rel }, vocabulary };
}
function dedupeVocabulary(entries) {
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const entry of entries) {
    const key = `${entry.kind}:${entry.term.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(entry);
  }
  return out;
}
function groundArea(projectRoot, options = {}) {
  const maxFiles = options.maxFiles ?? DEFAULT_MAX_FILES;
  const sparseFloor = options.sparseFloor ?? DEFAULT_SPARSE_FLOOR;
  const patterns = options.modules && options.modules.length > 0 ? options.modules.map((m) => `docs/modules/${m}/**/*.md`) : ["docs/modules/**/*.md"];
  let files;
  try {
    files = import_fast_glob5.default.sync(patterns, { cwd: projectRoot, onlyFiles: true, dot: false }).sort().slice(0, maxFiles);
  } catch {
    files = [];
  }
  const references = [];
  const termSet = /* @__PURE__ */ new Set();
  const vocabulary = [];
  for (const rel of files) {
    let content;
    try {
      content = readFileSync51(join81(projectRoot, rel), "utf8");
    } catch {
      continue;
    }
    references.push({ kind: "doc", ref: rel });
    for (const term of termsFromMarkdown(content)) {
      if (term.length > 0) termSet.add(term);
    }
    vocabulary.push(...extractVocabulary(rel, content));
  }
  const glossary = readGlossaryFile(projectRoot);
  if (glossary) {
    references.push(glossary.reference);
    vocabulary.push(...glossary.vocabulary);
  }
  const terms = [...termSet].sort();
  const sparse = terms.length < sparseFloor;
  return {
    references,
    terms,
    sparse,
    path: "docs-fallback",
    vocabulary: dedupeVocabulary(vocabulary)
  };
}
function referenceKindFor(sourceFile) {
  return /(^|\/)rules?\//.test(sourceFile.replace(/\\/g, "/")) ? "rule" : "doc";
}
function lexicalFallback(projectRoot, options, reason2) {
  return { ...groundArea(projectRoot, options), mode: "lexical-fallback", fallback_reason: reason2 };
}
async function indexIsWarm(projectRoot) {
  if (!existsSync51(join81(projectRoot, PATHS.CHUNK_INDEX))) return false;
  try {
    const status = await new FileVectorIndex().status(projectRoot);
    return status.present && !status.corrupt && (status.meta?.chunk_count ?? 0) > 0;
  } catch {
    return false;
  }
}
async function projectIndexBlocker(projectRoot) {
  const intelligence = normalizeIntelligenceConfig(readProjectProfile(projectRoot)?.intelligence);
  if (intelligence.embedding_provider === "openai" && !getProjectSecret(projectRoot, "OPENAI_API_KEY")) {
    return GROUNDING_FALLBACK_REASONS.missingKey;
  }
  return await indexIsWarm(projectRoot) ? null : GROUNDING_FALLBACK_REASONS.coldIndex;
}
var BUDGET_SPENT = /* @__PURE__ */ Symbol("budget-spent");
async function withinBudget(work, budgetMs) {
  let timer;
  const spent = new Promise((resolve18) => {
    timer = setTimeout(() => resolve18(BUDGET_SPENT), budgetMs);
  });
  work.catch(() => void 0);
  try {
    return await Promise.race([work, spent]);
  } finally {
    clearTimeout(timer);
  }
}
async function groundAreaAsync(projectRoot, options = {}) {
  const ragEnabled = options.ragEnabled ?? normalizeIntelligenceConfig(readProjectProfile(projectRoot)?.intelligence).rag_enabled;
  if (!ragEnabled) {
    return lexicalFallback(projectRoot, options, GROUNDING_FALLBACK_REASONS.ragDisabled);
  }
  const blocker = options.service ? null : await projectIndexBlocker(projectRoot);
  if (blocker) return lexicalFallback(projectRoot, options, blocker);
  const rag = await withinBudget(
    groundViaRetrieval(projectRoot, options),
    options.budgetMs ?? DEFAULT_GROUNDING_BUDGET_MS
  );
  if (rag === BUDGET_SPENT) {
    return lexicalFallback(projectRoot, options, GROUNDING_FALLBACK_REASONS.budget);
  }
  if (rag && rag.terms.length > 0) return { ...rag, mode: "retrieval" };
  return lexicalFallback(projectRoot, options, GROUNDING_FALLBACK_REASONS.noResults);
}
async function groundViaRetrieval(projectRoot, options) {
  const maxFiles = options.maxFiles ?? DEFAULT_MAX_FILES;
  const sparseFloor = options.sparseFloor ?? DEFAULT_SPARSE_FLOOR;
  const modules = options.modules ?? [];
  const query = options.query ?? (modules.length > 0 ? `Business vocabulary and rules for: ${modules.join(", ")}` : void 0);
  let slices;
  try {
    ({ slices } = await gatherWorkingSetSlices(projectRoot, {
      scope: "docs",
      topN: maxFiles,
      skipSync: true,
      ...query ? { query } : {},
      ...options.changedPaths ? { changedPaths: options.changedPaths } : {},
      ...options.service ? { service: options.service } : {}
    }));
  } catch {
    return null;
  }
  if (slices.length === 0) return null;
  const references = [];
  const seenRefs = /* @__PURE__ */ new Set();
  const termSet = /* @__PURE__ */ new Set();
  const vocabulary = [];
  for (const slice of slices) {
    if (!seenRefs.has(slice.source_file)) {
      seenRefs.add(slice.source_file);
      references.push({ kind: referenceKindFor(slice.source_file), ref: slice.source_file });
    }
    for (const term of termsFromMarkdown(slice.content)) {
      if (term.length > 0) termSet.add(term);
    }
    vocabulary.push(...extractVocabulary(slice.source_file, slice.content));
  }
  const glossary = readGlossaryFile(projectRoot);
  if (glossary) {
    references.push(glossary.reference);
    vocabulary.push(...glossary.vocabulary);
  }
  const terms = [...termSet].sort();
  const sparse = terms.length < sparseFloor;
  return { references, terms, sparse, path: "rag", vocabulary: dedupeVocabulary(vocabulary) };
}

// src/spec-pipeline/labeling.ts
init_esm_shims();
var VAGUE_WORDS = [
  "cleaner",
  "clean",
  "better",
  "nicer",
  "nice",
  "improve",
  "improved",
  "robust",
  "simple",
  "simpler",
  "modern",
  "good",
  "proper",
  "reasonable",
  "appropriate",
  "flexible",
  "scalable",
  "seamless",
  "smooth",
  "stuff",
  "things"
];
var OUTCOME_VERBS = [
  "return",
  "returns",
  "show",
  "shows",
  "display",
  "save",
  "saves",
  "store",
  "reject",
  "rejects",
  "create",
  "creates",
  "delete",
  "deletes",
  "remove",
  "export",
  "exports",
  "import",
  "validate",
  "validates",
  "block",
  "blocks",
  "allow",
  "allows",
  "send",
  "sends",
  "add",
  "adds",
  "render",
  "renders",
  "write",
  "writes",
  "record",
  "records",
  "freeze",
  "compute"
];
var UNCERTAINTY_MARKERS = [
  "maybe",
  "not sure",
  "something like",
  "i think",
  "probably",
  "or something",
  "kind of",
  "sort of"
];
var DEFAULT_LABEL_THRESHOLDS = {
  shortFloor: 4,
  longCeiling: 120,
  okayBudget: 3,
  vagueBudget: 6
};
function words(prompt) {
  return prompt.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 0);
}
function resolvedByGrounding(word, terms) {
  const w = word.toLowerCase();
  const stem = w.replace(/(er|est|ed|s)$/, "");
  return terms.some((t) => {
    const lt2 = t.toLowerCase();
    return lt2.includes(w) || stem.length >= 3 && lt2.includes(stem);
  });
}
function labelPrompt(prompt, grounding, thresholds = DEFAULT_LABEL_THRESHOLDS) {
  const signals = [];
  const promptWords = words(prompt);
  const lower = prompt.toLowerCase();
  for (const vague of VAGUE_WORDS) {
    if (promptWords.includes(vague) && !resolvedByGrounding(vague, grounding.terms)) {
      signals.push({ kind: "unresolved-vague-word", span: vague });
    }
  }
  const hasOutcomeVerb = OUTCOME_VERBS.some((v) => promptWords.includes(v));
  const hasNumber = /\d/.test(prompt);
  if (!hasOutcomeVerb && !hasNumber) {
    signals.push({ kind: "no-measurable-outcome", span: prompt.slice(0, 60) });
  }
  const mapsToProject = grounding.terms.some((t) => lower.includes(t.toLowerCase()));
  if (!mapsToProject && grounding.terms.length > 0) {
    signals.push({ kind: "nothing-concrete", span: prompt.slice(0, 60) });
  } else if (grounding.terms.length === 0 && grounding.sparse) {
    signals.push({ kind: "nothing-concrete", span: "(no project vocabulary grounded)" });
  }
  if (promptWords.length < thresholds.shortFloor) {
    signals.push({ kind: "too-short", span: `${promptWords.length} words` });
  } else if (promptWords.length > thresholds.longCeiling) {
    signals.push({ kind: "too-long", span: `${promptWords.length} words` });
  }
  for (const marker of UNCERTAINTY_MARKERS) {
    if (lower.includes(marker)) {
      signals.push({ kind: "uncertainty-marker", span: marker });
    }
  }
  const label = labelFromSignalCount(signals.length);
  const question_budget = label === "clear" ? 0 : label === "okay" ? thresholds.okayBudget : thresholds.vagueBudget;
  return { label, signals, question_budget };
}
function labelFromSignalCount(count) {
  if (count === 0) return "clear";
  if (count <= 2) return "okay";
  return "vague";
}

// src/spec-pipeline/orchestrator.ts
init_esm_shims();

// src/spec-pipeline/types.ts
init_esm_shims();
var PIPELINE_STEPS = [
  "ground",
  "label",
  "experts",
  "questions",
  "task",
  "craft",
  "finish"
];

// src/spec-pipeline/orchestrator.ts
var PIPELINE_ARTIFACT_FILES = {
  ground: "grounding.json",
  label: "clarification.json",
  experts: "experts.json",
  questions: "clarification.json",
  task: "task.json",
  craft: "spec.md",
  finish: "finish.json"
};
var STAGED_STEPS = {
  ground: "grounding",
  task: "task",
  craft: "craft",
  finish: "finish"
};
function readStepArtifact(projectRoot, dirName, step) {
  const staged = STAGED_STEPS[step];
  if (staged) return readStagedText(projectRoot, dirName, staged);
  const section2 = step === "label" ? readLabel(projectRoot, dirName) : step === "questions" ? readQuestions(projectRoot, dirName) : readExpertSynthesis(projectRoot, dirName);
  return section2 === null ? null : JSON.stringify(section2);
}
function parseJson3(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return void 0;
  }
}
function isStringArray(v) {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}
function validateStepArtifact(step, raw) {
  if (raw === null) {
    return { ok: false, error: `${PIPELINE_ARTIFACT_FILES[step]} is missing` };
  }
  if (step === "craft") {
    const shape = checkSpecShape(raw);
    return shape.ok ? { ok: true } : { ok: false, error: shape.problems.join("; ") };
  }
  const data = parseJson3(raw);
  if (data === void 0 || typeof data !== "object" || data === null) {
    return { ok: false, error: `${PIPELINE_ARTIFACT_FILES[step]} is not valid JSON` };
  }
  const obj = data;
  switch (step) {
    case "ground":
      if (!Array.isArray(obj.references) || !isStringArray(obj.terms) || typeof obj.sparse !== "boolean") {
        return { ok: false, error: "grounding.json needs references[], terms[], sparse" };
      }
      return { ok: true };
    case "label":
      if (obj.label !== "vague" && obj.label !== "okay" && obj.label !== "clear" || !Array.isArray(obj.signals) || typeof obj.question_budget !== "number") {
        return { ok: false, error: "the label needs label, signals[], question_budget" };
      }
      return { ok: true };
    case "experts":
      if (typeof obj.verdict !== "string" || !Array.isArray(obj.accepted) || !Array.isArray(obj.declined) || !Array.isArray(obj.conflicts) || !Array.isArray(obj.gaps)) {
        return {
          ok: false,
          error: "the expert synthesis needs verdict, accepted[], declined[], conflicts[], gaps[]"
        };
      }
      return { ok: true };
    case "questions": {
      if (!Array.isArray(obj.questions)) {
        return { ok: false, error: "the question batch needs a questions[] array" };
      }
      if (obj.auto_answered !== void 0 && !Array.isArray(obj.auto_answered)) {
        return { ok: false, error: "the question batch auto_answered must be an array" };
      }
      for (const count of ["asked", "answered", "deferred"]) {
        if (obj[count] !== void 0 && typeof obj[count] !== "number") {
          return { ok: false, error: `the question batch ${count} must be a number` };
        }
      }
      return { ok: true };
    }
    case "task":
      if (typeof obj.intent !== "string" || obj.intent.length === 0) {
        return { ok: false, error: "the task needs a non-empty intent" };
      }
      return { ok: true };
    case "finish":
      if (typeof obj.outcome !== "string") {
        return { ok: false, error: "the finish result needs an outcome" };
      }
      return { ok: true };
    /* v8 ignore start -- exhaustive; craft handled above */
    default:
      return { ok: true };
  }
}
function stepArtifactValid(projectRoot, dirName, step) {
  return validateStepArtifact(step, readStepArtifact(projectRoot, dirName, step)).ok;
}
function labelIsClear(projectRoot, dirName) {
  return readLabel(projectRoot, dirName)?.label === "clear";
}
function readQuestionsArtifact(projectRoot, dirName) {
  return readQuestions(projectRoot, dirName);
}
function hasExpertOrChiefQuestions(projectRoot, dirName) {
  if (readStagedExpertQuestions(projectRoot, dirName).some((note) => note.questions.length > 0)) {
    return true;
  }
  const synthesis = readExpertSynthesis(projectRoot, dirName);
  if (synthesis === null) return false;
  return synthesis.questions.length > 0 || synthesis.gaps.some((gap) => gap.question !== void 0);
}
function stepComplete(projectRoot, dirName, step) {
  if (step === "experts") {
    if (!expertsActive(readPipelineConfig(projectRoot))) return true;
    if (readExperts(projectRoot, dirName)?.roster.length === 0) return true;
    return stepArtifactValid(projectRoot, dirName, step);
  }
  if (step === "questions" && labelIsClear(projectRoot, dirName) && !hasExpertOrChiefQuestions(projectRoot, dirName)) {
    return true;
  }
  return stepArtifactValid(projectRoot, dirName, step);
}
function nextStep(projectRoot, dirName) {
  for (const step of PIPELINE_STEPS) {
    if (!stepComplete(projectRoot, dirName, step)) {
      return step;
    }
  }
  return null;
}
function assertCanRunStep(projectRoot, dirName, step, options = {}) {
  for (const earlier of PIPELINE_STEPS) {
    if (earlier === step) break;
    if (!stepComplete(projectRoot, dirName, earlier)) {
      return {
        allowed: false,
        missing: earlier,
        message: `cannot run "${step}": earlier step "${earlier}" is not complete (${PIPELINE_ARTIFACT_FILES[earlier]} missing or invalid)`
      };
    }
  }
  if (step === "questions" && options.hasPendingExpertConflict) {
    return {
      allowed: false,
      missing: "experts",
      message: 'cannot run "questions": an expert conflict is still pending a decision \u2014 resolve it first (FR-6.4)'
    };
  }
  return { allowed: true };
}
function writeStepArtifact(projectRoot, dirName, step, content, options = {}) {
  const staged = STAGED_STEPS[step];
  if (staged) {
    writeStagedText(projectRoot, dirName, staged, content);
  } else if (step === "label") {
    writeLabel(projectRoot, dirName, JSON.parse(content), options);
  } else if (step === "questions") {
    writeQuestions(projectRoot, dirName, JSON.parse(content), options);
  } else {
    writeExpertSynthesis(projectRoot, dirName, JSON.parse(content), options);
  }
}
function clearStepArtifact(projectRoot, dirName, step, options) {
  const prior = readStepArtifact(projectRoot, dirName, step);
  if (prior === null) return null;
  const staged = STAGED_STEPS[step];
  if (staged) {
    clearStaged(projectRoot, dirName, staged);
  } else if (step === "experts") {
    clearExpertSynthesis(projectRoot, dirName, options);
  } else {
    clearClarificationSection(projectRoot, dirName, step, options);
  }
  return prior;
}
function recordStep(projectRoot, dirName, step, outcome, options = {}) {
  const raw = readStepArtifact(projectRoot, dirName, step);
  const tokens = typeof options.tokens === "number" && Number.isInteger(options.tokens) && options.tokens >= 0 ? options.tokens : void 0;
  return appendSpecStepRow(
    projectRoot,
    dirName,
    { step, outcome, artifactHash: raw === null ? "" : sha256Hex(raw), tokens },
    options
  );
}
function redoStep(projectRoot, dirName, step, options = {}) {
  const invalidated = [];
  for (const s of PIPELINE_STEPS.slice(PIPELINE_STEPS.indexOf(step))) {
    const prior = clearStepArtifact(projectRoot, dirName, s, options);
    if (prior === null) continue;
    invalidated.push(s);
    appendSpecStepRow(
      projectRoot,
      dirName,
      { step: s, outcome: "redone", artifactHash: sha256Hex(prior) },
      options
    );
  }
  return invalidated;
}

// src/spec-pipeline/spec-code-check.ts
init_esm_shims();
function specCodeCheckLive(projectRoot) {
  return readCodeKnowledgeIndex(projectRoot) !== null;
}

// src/cli/commands/spec-pipeline.ts
function resolveDir(options) {
  const sessionId = resolveSessionId(
    options.projectRoot,
    options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
  );
  const dirName = currentFeature(options.projectRoot, sessionId);
  if (!dirName) {
    console.error("no active feature \u2014 run `paqad-ai stage start planning` first");
    process.exitCode = 1;
    return null;
  }
  return { dirName, store: { sessionId } };
}
function sameModules(left, right) {
  const a = [...left ?? []].sort();
  const b = [...right].sort();
  return a.length === b.length && a.every((value, index) => value === b[index]);
}
function cachedGrounding(projectRoot, dirName, digest, modules) {
  const cached = readStagedJson(projectRoot, dirName, "grounding");
  if (!cached || typeof cached !== "object" || !Array.isArray(cached.references)) return null;
  if (cached.request_digest !== digest || !sameModules(cached.modules, modules)) return null;
  return cached;
}
function isReusable(cached) {
  return cached !== null && (cached.mode === "retrieval" || cached.mode === "lexical-fallback" && cached.fallback_retried === true);
}
async function groundRequest(projectRoot, dirName, request, modules) {
  const digest = requestDigest(request);
  const cached = cachedGrounding(projectRoot, dirName, digest, modules);
  if (cached !== null && isReusable(cached)) return { grounding: cached, reused: true };
  const fresh = await groundAreaAsync(projectRoot, {
    ...modules.length > 0 ? { modules: [...modules] } : {},
    query: request,
    budgetMs: readPipelineConfig(projectRoot).grounding_budget_ms
  });
  const retried = cached?.mode === "lexical-fallback" && fresh.mode === "lexical-fallback";
  return {
    grounding: {
      ...fresh,
      request_digest: digest,
      modules: [...modules],
      ...retried ? { fallback_retried: true } : {}
    },
    reused: false
  };
}
function exitIfRetrievalAbandoned(grounding) {
  if (grounding.fallback_reason !== GROUNDING_FALLBACK_REASONS.budget) return;
  process.stdout.write("", () => process.exit(Number(process.exitCode ?? 0)));
}
function groundingOutcome(grounding, reused) {
  if (reused) return { grounding: "reused" };
  return {
    grounding: grounding.mode ?? "retrieval",
    ...grounding.fallback_reason ? { grounding_reason: grounding.fallback_reason } : {}
  };
}
function plainLanguageSources(projectRoot, dirName) {
  const grounding = readStagedJson(projectRoot, dirName, "grounding");
  return {
    terms: grounding?.terms ?? [],
    prompt: readRequest(projectRoot, dirName),
    vocabulary: (grounding?.vocabulary ?? []).map((entry) => entry.term)
  };
}
function findingVoiceSources(projectRoot, dirName) {
  const grounding = readStagedJson(projectRoot, dirName, "grounding");
  return {
    vocabulary: grounding?.vocabulary ?? [],
    requestText: readRequest(projectRoot, dirName),
    projectRoot,
    indexPresent: readCodeKnowledgeIndex(projectRoot) !== null
  };
}
function resolveProjectVoice(projectRoot, dirName) {
  return resolveProjectVoiceForRun(projectRoot, dirName);
}
function reportedTokens(content) {
  return JSON.parse(content).tokens;
}
async function resolveRequestText(options) {
  if (options.requestFile) {
    try {
      const text = readFileSync52(options.requestFile, "utf8");
      rememberInput(options.projectRoot, options.dirName, options.requestFile);
      return text;
    } catch {
      console.error(`could not read request file "${options.requestFile}"`);
      process.exitCode = 1;
      return null;
    }
  }
  if (options.ticket) {
    const kind = classifyRef(options.ticket);
    if (kind !== "github-issues") {
      console.error(
        kind === "jira" ? `Jira tickets are fetched through the Atlassian MCP in your session \u2014 paste the request with --request-file instead` : `"${options.ticket}" is not a GitHub issue ref \u2014 use --request-file, or a GitHub #<number>`
      );
      process.exitCode = 1;
      return null;
    }
    const ghInvoke = async (args) => {
      const result = await execa("gh", args, { cwd: options.projectRoot, reject: false });
      if (result.exitCode !== 0) throw new Error(result.stderr || "gh failed");
      return result.stdout;
    };
    try {
      const ticket = await new GithubIssuesTicketProvider(ghInvoke).fetchTicket(options.ticket);
      const criteria = ticket.acceptance_criteria.map((c) => `- ${c}`).join("\n");
      return `${ticket.title}

${ticket.description}${criteria ? `

${criteria}` : ""}`;
    } catch (error) {
      console.error(
        `could not fetch ${options.ticket}: ${error instanceof Error ? error.message : String(error)}`
      );
      process.exitCode = 1;
      return null;
    }
  }
  console.error("start needs --request-file <path> or --ticket <ref>");
  process.exitCode = 1;
  return null;
}
var projectRootOpt = ["--project-root <path>", "Project root", process.cwd()];
var sessionOpt = [
  "--session <id>",
  "Session id (defaults to SE_SESSION / CLAUDE_SESSION_ID)"
];
function createSpecPipelineCommand() {
  const command = new Command("pipeline").description(
    "Grounded prompt->spec pipeline: ground, label, questions, task, craft, finish"
  );
  command.command("start").description("S0 + S1 in one go: ground and label the request (from a file or a ticket)").option("--request-file <path>", "Path to the request text to spec").option("--ticket <ref>", "A ticket ref to fetch instead (GitHub #<number> via gh)").option("--modules <list>", "Comma-separated module slugs to scope grounding to").option(...projectRootOpt).option(...sessionOpt).action(
    async (options) => {
      const resolved = resolveDir(options);
      if (!resolved) return;
      const request = await resolveRequestText({ ...options, dirName: resolved.dirName });
      if (request === null) return;
      const modules = options.modules ? options.modules.split(",").map((m) => m.trim()).filter((m) => m.length > 0) : void 0;
      const { grounding, reused } = await groundRequest(
        options.projectRoot,
        resolved.dirName,
        request,
        modules ?? []
      );
      if (!reused) {
        writeStepArtifact(
          options.projectRoot,
          resolved.dirName,
          "ground",
          JSON.stringify(grounding, null, 2)
        );
      }
      recordStep(options.projectRoot, resolved.dirName, "ground", "complete", resolved.store);
      writeRequest(options.projectRoot, resolved.dirName, request, resolved.store);
      const label = labelPrompt(request, grounding);
      writeLabel(options.projectRoot, resolved.dirName, label, resolved.store);
      recordStep(options.projectRoot, resolved.dirName, "label", "complete", resolved.store);
      const config = readPipelineConfig(options.projectRoot);
      if (reused) console.log("grounding reused");
      console.log(
        JSON.stringify({
          next_step: nextStep(options.projectRoot, resolved.dirName),
          label: label.label,
          sparse: grounding.sparse,
          experts: expertsActive(config) ? "on" : "off",
          ...groundingOutcome(grounding, reused)
        })
      );
      exitIfRetrievalAbandoned(grounding);
    }
  );
  command.command("status").description("Show the next step and the enforcement config in effect").option(...projectRootOpt).option(...sessionOpt).action((options) => {
    const resolved = resolveDir(options);
    if (!resolved) return;
    const config = readPipelineConfig(options.projectRoot);
    const next = nextStep(options.projectRoot, resolved.dirName);
    console.log(
      JSON.stringify({ enabled: config.enabled, next_step: next, enforcement: config })
    );
  });
  command.command("round").description(
    "List this change's pending questions to ask the owner in one round, with the opening line"
  ).option(...projectRootOpt).option(...sessionOpt).action((options) => {
    const resolved = resolveDir(options);
    if (!resolved) return;
    console.log(JSON.stringify(buildQuestionRound(options.projectRoot, resolved.dirName)));
  });
  command.command("ground").description("S0 \u2014 assemble grounding from the docs (zero model tokens)").option("--modules <list>", "Comma-separated module slugs to scope grounding to").option(...projectRootOpt).option(...sessionOpt).action(async (options) => {
    const resolved = resolveDir(options);
    if (!resolved) return;
    const modules = options.modules ? options.modules.split(",").map((m) => m.trim()).filter((m) => m.length > 0) : void 0;
    const grounding = await groundAreaAsync(options.projectRoot, {
      ...modules ? { modules } : {},
      budgetMs: readPipelineConfig(options.projectRoot).grounding_budget_ms
    });
    writeStepArtifact(
      options.projectRoot,
      resolved.dirName,
      "ground",
      JSON.stringify(grounding, null, 2)
    );
    recordStep(options.projectRoot, resolved.dirName, "ground", "complete", resolved.store);
    console.log(
      JSON.stringify({
        step: "ground",
        references: grounding.references.length,
        terms: grounding.terms.length,
        sparse: grounding.sparse,
        path: grounding.path,
        ...groundingOutcome(grounding, false)
      })
    );
    exitIfRetrievalAbandoned(grounding);
  });
  command.command("label").description("S1 \u2014 rate clarity against the grounding (zero model tokens)").argument("<prompt>", "The request prompt to label").option(...projectRootOpt).option(...sessionOpt).action((prompt, options) => {
    const resolved = resolveDir(options);
    if (!resolved) return;
    const gate = assertCanRunStep(options.projectRoot, resolved.dirName, "label");
    if (!gate.allowed) {
      console.error(gate.message);
      process.exitCode = 1;
      return;
    }
    const grounding = readStagedJson(
      options.projectRoot,
      resolved.dirName,
      "grounding"
    );
    writeRequest(options.projectRoot, resolved.dirName, prompt, resolved.store);
    const label = labelPrompt(prompt, grounding);
    writeLabel(options.projectRoot, resolved.dirName, label, resolved.store);
    recordStep(options.projectRoot, resolved.dirName, "label", "complete", resolved.store);
    console.log(
      JSON.stringify({
        step: "label",
        label: label.label,
        question_budget: label.question_budget
      })
    );
  });
  command.command("record").description("Hand an agent-produced step artifact back to the pipeline (validated + advanced)").argument("<step>", "One of: questions, task, craft").argument("<file>", "Path to the artifact the agent produced").option("--trace <path>", "For craft: the trace.json tying every spec line to a source").option(...projectRootOpt).option(...sessionOpt).action((step, file, options) => {
    const resolved = resolveDir(options);
    if (!resolved) return;
    if (step !== "questions" && step !== "task" && step !== "craft") {
      console.error(
        `record accepts only the agent steps: questions, task, craft (got "${step}")`
      );
      process.exitCode = 1;
      return;
    }
    const pipelineStep = step;
    const gate = assertCanRunStep(options.projectRoot, resolved.dirName, pipelineStep, {
      hasPendingExpertConflict: pipelineStep === "questions" && hasPendingExpertConflict(options.projectRoot, resolved.dirName)
    });
    if (!gate.allowed) {
      console.error(gate.message);
      process.exitCode = 1;
      return;
    }
    let content;
    try {
      content = readFileSync52(file, "utf8");
    } catch {
      console.error(`could not read artifact "${file}"`);
      process.exitCode = 1;
      return;
    }
    rememberInput(options.projectRoot, resolved.dirName, file);
    const check = validateStepArtifact(pipelineStep, content);
    if (!check.ok) {
      console.error(`artifact for "${step}" is invalid: ${check.error}`);
      process.exitCode = 1;
      return;
    }
    if (pipelineStep === "questions") {
      const parsed = JSON.parse(content);
      const enrichment = parsed.questions ?? [];
      const config = readPipelineConfig(options.projectRoot);
      let batch = enrichment;
      let deferredFromExperts = [];
      if (expertsActive(config)) {
        const expertChief = collectExpertQuestions(
          readExpertNeed(options.projectRoot, resolved.dirName),
          readExpertNotes(options.projectRoot, resolved.dirName),
          readExpertSynthesis(options.projectRoot, resolved.dirName)
        );
        const merged = mergeQuestionBatch(
          enrichment,
          expertChief,
          readLabel(options.projectRoot, resolved.dirName).question_budget
        );
        batch = merged.questions;
        deferredFromExperts = merged.deferred_from_experts;
      }
      const { answered, remaining } = autoAnswerQuestions(options.projectRoot, batch);
      const enriched = {
        questions: remaining,
        auto_answered: answered,
        asked: remaining.length,
        answered: typeof parsed.answered === "number" ? parsed.answered : 0,
        deferred: typeof parsed.deferred === "number" ? parsed.deferred : 0,
        ...deferredFromExperts.length > 0 ? { deferred_from_experts: deferredFromExperts } : {}
      };
      writeStepArtifact(
        options.projectRoot,
        resolved.dirName,
        pipelineStep,
        JSON.stringify(enriched),
        resolved.store
      );
      recordStep(options.projectRoot, resolved.dirName, pipelineStep, "complete", {
        ...resolved.store,
        tokens: parsed.tokens
      });
      console.log(
        JSON.stringify({
          step,
          recorded: true,
          asked: enriched.asked,
          auto_answered: answered.length
        })
      );
      return;
    }
    if (pipelineStep === "craft") {
      const config = readPipelineConfig(options.projectRoot);
      if (config.enabled) {
        if (!options.trace) {
          console.error(
            "craft needs --trace <trace.json> while the spec pipeline is on (FR-8.3)"
          );
          process.exitCode = 1;
          return;
        }
        let traceRaw;
        try {
          traceRaw = JSON.parse(readFileSync52(options.trace, "utf8"));
        } catch {
          console.error(`could not read or parse trace "${options.trace}"`);
          process.exitCode = 1;
          return;
        }
        rememberInput(options.projectRoot, resolved.dirName, options.trace);
        const agentTrace = parseTraceArtifact(traceRaw);
        if (!agentTrace) {
          console.error(
            "trace.json is malformed \u2014 each entry needs an id (FR/NFR/AC/INV) and a source"
          );
          process.exitCode = 1;
          return;
        }
        const accepted = expertsActive(config) ? readExpertSynthesis(options.projectRoot, resolved.dirName)?.accepted ?? [] : [];
        const gate2 = validateCraftTrace(content, agentTrace, accepted);
        if (!gate2.ok) {
          console.error(gate2.errors.join("; "));
          process.exitCode = 1;
          return;
        }
        const stable = carryForwardIds(
          agentTrace.entries.map((entry) => ({ kind: entry.kind, source: entry.source })),
          readTrace(options.projectRoot, resolved.dirName)
        );
        writeTrace(options.projectRoot, resolved.dirName, stable);
      }
      writeStepArtifact(options.projectRoot, resolved.dirName, pipelineStep, content);
      recordStep(options.projectRoot, resolved.dirName, pipelineStep, "complete", resolved.store);
      console.log(JSON.stringify({ step, recorded: true, traced: config.enabled }));
      return;
    }
    writeStepArtifact(options.projectRoot, resolved.dirName, pipelineStep, content);
    recordStep(options.projectRoot, resolved.dirName, pipelineStep, "complete", {
      ...resolved.store,
      tokens: reportedTokens(content)
    });
    console.log(JSON.stringify({ step, recorded: true }));
  });
  command.addCommand(createExpertsCommand());
  command.command("finish").description("S5 \u2014 decide freeze vs non-blocking review (A5-gated) and record provenance").option(...projectRootOpt).option(...sessionOpt).action((options) => {
    const resolved = resolveDir(options);
    if (!resolved) return;
    const gate = assertCanRunStep(options.projectRoot, resolved.dirName, "finish");
    if (!gate.allowed) {
      console.error(gate.message);
      process.exitCode = 1;
      return;
    }
    const config = readPipelineConfig(options.projectRoot);
    const a5Live = specCodeCheckLive(options.projectRoot);
    const decision = decideFinish(config, a5Live);
    const questions = readQuestionsArtifact(options.projectRoot, resolved.dirName);
    const answerRefs = questions?.auto_answered.map((entry) => entry.source) ?? [];
    const expertRun = expertsActive(config) ? assembleExpertRun(options.projectRoot, resolved.dirName, config.token_ceiling) : null;
    const metrics = buildRunMetrics(
      options.projectRoot,
      resolved.dirName,
      config,
      a5Live,
      a5Live ? "live" : "absent"
    );
    const provenance = buildProvenance(
      config,
      a5Live,
      answerRefs,
      {
        asked: questions?.asked ?? 0,
        answered: questions?.answered ?? 0,
        auto_answered: questions?.auto_answered.length ?? 0,
        deferred: questions?.deferred ?? 0
      },
      expertRun ? { accounting: expertRun.accounting, conflicts: expertRun.conflicts } : void 0,
      metrics
    );
    writeStepArtifact(
      options.projectRoot,
      resolved.dirName,
      "finish",
      JSON.stringify({ outcome: decision.outcome, reason: decision.reason, provenance }, null, 2)
    );
    recordStep(options.projectRoot, resolved.dirName, "finish", "complete", resolved.store);
    console.log(
      JSON.stringify({
        step: "finish",
        outcome: decision.outcome,
        a5_live: a5Live,
        ...expertRun ? { experts: expertRun.accounting.experts.length } : {}
      })
    );
  });
  command.command("redo").description("Clear a step and everything downstream so the run re-derives them").argument("<step>", "The step to redo").option(...projectRootOpt).option(...sessionOpt).action((step, options) => {
    const resolved = resolveDir(options);
    if (!resolved) return;
    const valid = [
      "ground",
      "label",
      "experts",
      "questions",
      "task",
      "craft",
      "finish"
    ];
    if (!valid.includes(step)) {
      console.error(`unknown step "${step}" \u2014 one of: ${valid.join(", ")}`);
      process.exitCode = 1;
      return;
    }
    const invalidated = redoStep(
      options.projectRoot,
      resolved.dirName,
      step,
      resolved.store
    );
    console.log(JSON.stringify({ redo: step, invalidated }));
  });
  command.command("metrics").description("Report what the pipeline runs cost and changed").option("--all", "Aggregate across every feature bundle, not just the active feature").option(...projectRootOpt).option(...sessionOpt).action((options) => {
    const dirNames = options.all ? listRunDirs(options.projectRoot) : [];
    if (!options.all) {
      const resolved = resolveDir(options);
      if (!resolved) return;
      dirNames.push(resolved.dirName);
    }
    const report2 = aggregateSpecPipelineMetrics(options.projectRoot, dirNames);
    console.log(JSON.stringify(report2, null, 2));
    const roles = Object.keys(report2.changed_spec_rate).sort();
    if (roles.length > 0) {
      console.log(
        "\nrole                    tier      fired  changed  empty rate  voice warnings  tokens"
      );
      for (const role of roles) {
        const key = role;
        const rate = report2.changed_spec_rate[key];
        const tokens = report2.tokens_by_role[key] ?? 0;
        const tier = report2.tier_by_role[key] ?? "on-call";
        const empty = report2.empty_by_role[key];
        const emptyRate = empty && empty.fired > 0 ? `${Math.round(empty.empty / empty.fired * 100)}%` : "\u2014";
        const warnings = report2.voice_warnings_by_role[key] ?? 0;
        console.log(
          `${role.padEnd(22)}  ${tier.padEnd(8)}  ${String(rate.fired).padStart(5)}  ${String(rate.changed).padStart(7)}  ${emptyRate.padStart(10)}  ${String(warnings).padStart(14)}  ${String(tokens).padStart(6)}`
        );
      }
      console.log(
        "\nA standing expert with a changed_spec rate under 30% over 20 runs is a demotion candidate; change spec_pipeline_standing_experts to demote. Nothing is demoted automatically."
      );
    }
  });
  return command;
}
function createExpertsCommand() {
  const experts = new Command("experts").description(
    "Expert roster: record the model-decided expert need and their notes"
  );
  const refuseWhenOff = (options) => {
    if (!expertsActive(readPipelineConfig(options.projectRoot))) {
      console.error(
        "the expert roster is off \u2014 enable spec_pipeline_enabled and spec_pipeline_experts_enabled first"
      );
      process.exitCode = 1;
      return true;
    }
    return false;
  };
  const gateExperts = (options, dirName) => {
    if (refuseWhenOff(options)) return true;
    const gate = assertCanRunStep(options.projectRoot, dirName, "experts");
    if (!gate.allowed) {
      console.error(gate.message);
      process.exitCode = 1;
      return true;
    }
    return false;
  };
  const recordHighTable = (what, write) => {
    try {
      write();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`could not record the High Table ${what} row: ${message}`);
    }
  };
  const readHandedFile = (options, dirName, file, what) => {
    try {
      const content = readFileSync52(file, "utf8");
      rememberInput(options.projectRoot, dirName, file);
      return content;
    } catch {
      console.error(`could not read ${what} artifact "${file}"`);
      process.exitCode = 1;
      return null;
    }
  };
  experts.command("record").description("Store the model-decided expert need as the experts.json roster").argument("<file>", "Path to the need artifact the expert-need-detector produced").option(...projectRootOpt).option(...sessionOpt).action((file, options) => {
    const resolved = resolveDir(options);
    if (!resolved) return;
    if (gateExperts(options, resolved.dirName)) return;
    const content = readHandedFile(options, resolved.dirName, file, "need");
    if (content === null) return;
    const check = validateExpertNeed(content);
    if (!check.ok || !check.artifact) {
      console.error(`expert-need artifact is invalid: ${check.error}`);
      process.exitCode = 1;
      return;
    }
    const config = readPipelineConfig(options.projectRoot);
    const lane = readChangeConstants(options.projectRoot, resolved.dirName).lane ?? "full";
    const standingSits = config.experts_lanes.includes(lane);
    const needs = seatExpertsForLane({
      detectorNeeds: check.artifact.experts,
      standing: config.standing_experts,
      standingSits,
      sensitivePath: standingSits ? null : sensitivePaths(
        options.projectRoot,
        planFiles(readFeaturePlan(options.projectRoot, resolved.dirName)?.steps)
      )[0] ?? null
    });
    const projectVoice = resolveProjectVoice(options.projectRoot, resolved.dirName);
    const { briefs } = buildExpertBriefs({
      needs,
      request: readRequest(options.projectRoot, resolved.dirName),
      grounding: readGrounding(options.projectRoot, resolved.dirName),
      label: readLabel(options.projectRoot, resolved.dirName),
      ceiling: config.token_ceiling,
      projectVoice
    });
    const roster = briefs.map((brief, index) => rosterEntryFor(needs[index], brief));
    writeExpertRoster(options.projectRoot, resolved.dirName, roster, resolved.store);
    recordHighTable(
      "seated",
      () => recordSeatedRows(
        options.projectRoot,
        resolved.dirName,
        roster.map((entry, index) => ({
          role: entry.role,
          reason: entry.reason,
          origin: entry.origin ?? null,
          budget_tokens: entry.budget_tokens,
          clamped: briefs[index].clamped
        })),
        resolved.store
      )
    );
    if (roster.length === 0) {
      recordStep(options.projectRoot, resolved.dirName, "experts", "skipped", resolved.store);
      if (!standingSits) {
        console.log(
          `**\u25B8 paqad** \xB7 skipped the High Table: no on-call expert is needed on the ${lane} lane`
        );
      }
    }
    const standingCount = needs.filter((need) => need.origin === "standing").length;
    console.log(
      JSON.stringify({
        recorded: "expert-need",
        experts: roster.length,
        standing: standingCount,
        on_call: roster.length - standingCount,
        briefs: roster.map((entry) => entry.role)
      })
    );
  });
  experts.command("brief").description("Print one expert's brief (rebuilt from the run; never stored as a file)").argument("<role>", "The expert role on the recorded roster").option(...projectRootOpt).option(...sessionOpt).action((role, options) => {
    const resolved = resolveDir(options);
    if (!resolved) return;
    if (refuseWhenOff(options)) return;
    const entry = readExperts(options.projectRoot, resolved.dirName)?.roster.find(
      (candidate) => candidate.role === role
    );
    if (!entry) {
      console.error(`"${role}" is not on the recorded roster \u2014 run \`experts record\` first`);
      process.exitCode = 1;
      return;
    }
    const grounding = readGrounding(options.projectRoot, resolved.dirName);
    const label = readLabel(options.projectRoot, resolved.dirName);
    if (!grounding || !label) {
      console.error("the run has no grounding or label recorded \u2014 run the pipeline start first");
      process.exitCode = 1;
      return;
    }
    const brief = renderExpertBrief({
      need: { role: entry.role, reason: entry.reason },
      request: readRequest(options.projectRoot, resolved.dirName),
      grounding,
      label,
      granted: entry.budget_tokens,
      projectVoice: resolveProjectVoice(options.projectRoot, resolved.dirName)
    });
    if (brief.hash !== entry.brief_hash) {
      console.error(
        `the brief for "${role}" no longer matches the recorded one (the request, grounding or label changed) \u2014 run \`experts record\` again`
      );
      process.exitCode = 1;
      return;
    }
    console.log(brief.content);
    recordHighTable(
      "writing",
      () => recordWritingRow(options.projectRoot, resolved.dirName, entry.role, resolved.store)
    );
  });
  experts.command("context").description("Print what the need detector and the chief architect read, as JSON").option(...projectRootOpt).option(...sessionOpt).action((options) => {
    const resolved = resolveDir(options);
    if (!resolved) return;
    if (refuseWhenOff(options)) return;
    const notes = readExpertNotes(options.projectRoot, resolved.dirName);
    const seated = (readExperts(options.projectRoot, resolved.dirName)?.roster.length ?? 0) > 0;
    console.log(
      JSON.stringify(
        {
          request: readRequest(options.projectRoot, resolved.dirName),
          grounding: readGrounding(options.projectRoot, resolved.dirName),
          label: readLabel(options.projectRoot, resolved.dirName),
          roster: readExperts(options.projectRoot, resolved.dirName)?.roster ?? [],
          notes: notes?.notes ?? null,
          voice_warnings: readExperts(options.projectRoot, resolved.dirName)?.voice_warnings ?? [],
          merge: notes ? mergeExpertNotes(
            notes.notes,
            readExperts(options.projectRoot, resolved.dirName)?.voice_warnings
          ) : null
        },
        null,
        2
      )
    );
    if (seated && notes !== null) {
      recordHighTable(
        "writing",
        () => recordWritingRow(options.projectRoot, resolved.dirName, CHIEF_ROLE, resolved.store)
      );
    }
  });
  experts.command("notes").description("Store the experts' findings + token actuals into experts.json").argument("<file>", "Path to the notes artifact the experts produced").option(...projectRootOpt).option(...sessionOpt).action((file, options) => {
    const resolved = resolveDir(options);
    if (!resolved) return;
    if (gateExperts(options, resolved.dirName)) return;
    const content = readHandedFile(options, resolved.dirName, file, "notes");
    if (content === null) return;
    const check = validateExpertNotes(
      content,
      plainLanguageSources(options.projectRoot, resolved.dirName),
      findingVoiceSources(options.projectRoot, resolved.dirName)
    );
    if (!check.ok || !check.artifact) {
      console.error(`expert-notes artifact is invalid: ${check.error}`);
      process.exitCode = 1;
      return;
    }
    writeExpertNotes(options.projectRoot, resolved.dirName, check.artifact, resolved.store);
    for (const note of check.artifact.notes) {
      recordHighTable(
        "done",
        () => recordDoneRow(
          options.projectRoot,
          resolved.dirName,
          {
            role: note.role,
            findings: note.findings.length,
            tokens_estimate: check.artifact.tokens[note.role] ?? null
          },
          resolved.store
        )
      );
    }
    const merged = mergeExpertNotes(check.artifact.notes, check.artifact.voice_warnings);
    console.log(
      JSON.stringify({
        recorded: "expert-notes",
        notes: check.artifact.notes.length,
        findings: merged.findings.length,
        conflicts: merged.conflicts.length,
        voice_warnings: check.artifact.voice_warnings?.length ?? 0
      })
    );
  });
  experts.command("synthesis").description("Store the chief architect synthesis; each conflict becomes a decision packet").argument("<file>", "Path to the synthesis artifact the expert-synthesis skill produced").option(...projectRootOpt).option(...sessionOpt).action((file, options) => {
    const resolved = resolveDir(options);
    if (!resolved) return;
    if (gateExperts(options, resolved.dirName)) return;
    const notes = readExpertNotes(options.projectRoot, resolved.dirName);
    if (!notes) {
      console.error("no expert notes \u2014 run `paqad-ai spec pipeline experts notes` first");
      process.exitCode = 1;
      return;
    }
    const experts2 = readExperts(options.projectRoot, resolved.dirName);
    const merged = mergeExpertNotes(notes.notes, experts2?.voice_warnings);
    const content = readHandedFile(options, resolved.dirName, file, "synthesis");
    if (content === null) return;
    const check = validateExpertSynthesis(
      content,
      merged,
      plainLanguageSources(options.projectRoot, resolved.dirName)
    );
    if (!check.ok || !check.artifact) {
      console.error(`expert-synthesis artifact is invalid: ${check.error}`);
      process.exitCode = 1;
      return;
    }
    const { minted, autoResolved } = mintExpertConflictDecisions(
      options.projectRoot,
      merged,
      check.artifact.conflicts,
      resolved.dirName
    );
    const compatible = applyCompatibleRulings(
      experts2?.findings ?? [],
      check.artifact.conflicts,
      check.artifact.accepted
    );
    const synthesis = {
      ...check.artifact,
      accepted: compatible.accepted,
      ...autoResolved.length > 0 ? { auto_resolved: autoResolved } : {}
    };
    let renamed = 0;
    let findings = compatible.findings;
    if (synthesis.renames && synthesis.renames.length > 0 && experts2?.findings) {
      const updated = applyRenames(findings, synthesis.renames);
      renamed = updated.filter(
        (finding, index) => finding.target !== findings[index].target
      ).length;
      findings = updated;
    }
    if (experts2?.findings && (renamed > 0 || compatible.merged > 0)) {
      writeExpertFindings(options.projectRoot, resolved.dirName, findings, resolved.store);
    }
    writeExpertSynthesis(options.projectRoot, resolved.dirName, synthesis, resolved.store);
    recordHighTable(
      "done",
      () => recordDoneRow(
        options.projectRoot,
        resolved.dirName,
        { role: CHIEF_ROLE, findings: null, tokens_estimate: synthesis.tokens },
        resolved.store
      )
    );
    recordStep(options.projectRoot, resolved.dirName, "experts", "complete", resolved.store);
    const proofMethod = raiseFixProofMethodDecision(options.projectRoot, resolved.dirName);
    if (proofMethod?.raised) {
      console.warn(fixProofMethodLine(proofMethod.id, { deferred: true }));
    }
    console.log(
      JSON.stringify({
        recorded: "expert-synthesis",
        verdict: synthesis.verdict,
        accepted: synthesis.accepted.length,
        declined: synthesis.declined.length,
        conflicts_pending: minted.length,
        compatible: compatible.merged,
        auto_resolved: autoResolved.length,
        gaps: synthesis.gaps.length,
        renamed,
        ...proofMethod ? { fix_proof_method: proofMethod.id } : {}
      })
    );
  });
  return experts;
}

// src/cli/commands/spec.ts
function createSpecCommand() {
  const command = new Command("spec").description(
    "Work with feature specifications (freeze the spec before code)"
  );
  command.command("freeze").description("Freeze and sign off a feature spec, writing the frozen sidecar").argument("<spec-file>", "Path to the human-readable spec markdown").option("--project-root <path>", "Project root", process.cwd()).option(
    "--signed-off-by <name>",
    "Who is signing off the freeze (recorded in the frozen sidecar)",
    "unattributed"
  ).option(
    "--spec-id <id>",
    "Spec id for the sidecar filename (defaults to the spec file basename without extension)"
  ).option(
    "--confirm-invariants",
    "Confirm every invariant as part of this sign-off (the human freeze act)",
    false
  ).option("--session <id>", "Session id whose active feature receives specification.json").option("--keep-input", "Keep the transient spec markdown instead of deleting it", false).option(
    "--from-pipeline",
    "Freeze a spec the spec pipeline crafted, merging its run into the record",
    false
  ).option("--manual", "Freeze a hand-written spec under strict adoption (needs --reason)", false).option("--reason <why>", "Why the spec was frozen without the pipeline (recorded)").action(
    async (specFile, options) => {
      let relSpec;
      try {
        relSpec = normalizeArtifactPath(options.projectRoot, specFile);
      } catch {
        console.error(
          `**\u25B8 paqad** \xB7 a spec has to live inside the project so its record stays portable, and ${specFile} resolves outside it. Author it in the repo and freeze it from there.`
        );
        process.exitCode = 1;
        return;
      }
      if (classifyBundlePath(relSpec) !== null) {
        console.error(
          `**\u25B8 paqad** \xB7 a feature bundle holds only its rigid artifacts, so a spec can't live at ${relSpec}. Author it outside \`.paqad/ledger/feature-evidence/\` \u2014 the freeze writes specification.json into the bundle for you.`
        );
        process.exitCode = 1;
        return;
      }
      let markdown;
      try {
        markdown = readFileSync53(specFile, "utf8");
      } catch {
        console.error(`could not read spec file "${specFile}"`);
        process.exitCode = 1;
        return;
      }
      const specId = options.specId ?? basename3(specFile).replace(/\.[^.]+$/, "");
      const built = buildFeatureSpec({
        spec_id: specId,
        spec_file: relSpec,
        spec_markdown: markdown
      });
      const spec = options.confirmInvariants ? { ...built, invariants: built.invariants.map((inv) => ({ ...inv, confirmed: true })) } : built;
      const freezeSession = resolveSessionId(
        options.projectRoot,
        options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
      );
      const freezeFeature = currentFeature(options.projectRoot, freezeSession);
      const pipelineConfig = readPipelineConfig(options.projectRoot);
      const freezeLaneRunsPipeline = laneRunsSpecPipeline(
        freezeFeature ? readChangeConstants(options.projectRoot, freezeFeature).lane : null
      );
      let sections;
      let frozenWithoutPipeline = false;
      if (pipelineConfig.enabled && !freezeLaneRunsPipeline) {
        sections = { pipeline: { produced: false, skipped: "fast-lane" } };
      } else if (pipelineConfig.enabled) {
        if (options.fromPipeline) {
          const dirName = freezeFeature;
          if (!dirName) {
            console.error("no active feature \u2014 run `paqad-ai stage start planning` first");
            process.exitCode = 1;
            return;
          }
          const runSections = readFreezeSections(options.projectRoot, dirName);
          if (!runSections) {
            console.error("run `paqad-ai spec pipeline finish` first");
            process.exitCode = 1;
            return;
          }
          const runSpec = readStagedText(options.projectRoot, dirName, "craft");
          if (runSpec === null || sha256Hex(runSpec) !== built.spec_hash) {
            console.error("the spec you are freezing is not the one the pipeline crafted");
            process.exitCode = 1;
            return;
          }
          sections = runSections;
        } else if (options.manual) {
          if (!options.reason) {
            console.error('--manual needs --reason "<why>" (recorded on the frozen spec)');
            process.exitCode = 1;
            return;
          }
          sections = { pipeline: { produced: false, manual_reason: options.reason } };
        } else if (pipelineConfig.adoption === "strict") {
          console.error(
            'this project requires the spec pipeline (spec_pipeline_adoption=strict); run it, or freeze with --manual --reason "<why>"'
          );
          process.exitCode = 1;
          return;
        } else {
          sections = { pipeline: { produced: false } };
          frozenWithoutPipeline = true;
        }
      }
      const specReview = reviewSpecification({
        spec_file: relSpec,
        spec_markdown: markdown
      });
      const planFiles2 = freezeFeature ? (readFeaturePlan(options.projectRoot, freezeFeature)?.steps ?? []).flatMap(
        (step) => step.files ?? []
      ) : [];
      const visualFiles = visualAcRequiredFiles(options.projectRoot, [
        ...planFiles2,
        ...(await loadChangeEvidence(options.projectRoot)).files
      ]);
      const evaluation = evaluateSpecFreeze(
        spec,
        specReview,
        visualFiles.length > 0 ? { requireVisualAc: { files: visualFiles } } : {}
      );
      if (!evaluation.can_freeze) {
        console.error(
          `**\u25B8 paqad** \xB7 can't freeze this spec yet \u2014 ${evaluation.blockers.length} blocker${evaluation.blockers.length === 1 ? "" : "s"} to resolve:`
        );
        for (const blocker of evaluation.blockers) {
          console.error(`  \u{1F534} ${blocker}`);
        }
        process.exitCode = 1;
        return;
      }
      const frozen = freezeSpec(spec, {
        signed_off_by: options.signedOffBy,
        frozen_at: (/* @__PURE__ */ new Date()).toISOString(),
        spec_review: specReview,
        ...sections ? { sections } : {}
      });
      if (frozenWithoutPipeline) {
        console.log("**\u25B8 paqad** \xB7 frozen without the pipeline; the record says so");
      }
      let bundlePath = null;
      let bundleDir = null;
      try {
        const sessionId = resolveSessionId(
          options.projectRoot,
          options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
        );
        const written = writeFeatureSpecification(
          options.projectRoot,
          sessionId,
          frozen,
          markdown
        );
        bundlePath = written.path;
        bundleDir = written.dirName;
      } catch (error) {
        if (!(error instanceof NoActiveFeatureError)) {
          throw error;
        }
      }
      if (!options.keepInput && bundlePath !== null) {
        try {
          rmSync6(specFile, { force: true });
        } catch {
        }
      }
      if (bundleDir !== null) {
        clearFrozenRun(options.projectRoot, bundleDir, options.keepInput ? [relSpec] : []);
      }
      console.log(`**\u25B8 paqad** \xB7 spec ${specId} frozen and signed off \u2014 sign-off recorded`);
      console.log(
        JSON.stringify({
          frozen: true,
          spec_id: specId,
          spec_hash: frozen.spec_hash,
          specification: bundlePath
        })
      );
    }
  );
  command.addCommand(createSpecPipelineCommand());
  return command;
}

// src/cli/commands/stage.ts
init_esm_shims();
function collectArtifact(value, previous = []) {
  return [...previous, value];
}
function runStageSettings(options) {
  const root = options.projectRoot;
  const sessionHint2 = options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null;
  const sessionId = sessionHint2?.trim() ? sessionHint2.trim() : resolveSessionId(root, null);
  try {
    const settings = writeStageSettings(root, sessionId);
    console.log(JSON.stringify(stageSettingsReport(settings), null, 2));
  } catch (error) {
    console.error(`could not write the stage settings: ${error.message}`);
    process.exitCode = 1;
  }
}
async function raiseLaneOnStageStart(root, sessionId) {
  const dirName = currentFeature(root, sessionId);
  if (dirName === null || !laneMayRise(root, dirName)) return null;
  const { files } = await loadChangeEvidence(root, { since: readChangeStartPoint(root, dirName) });
  return raiseLaneIfGrown({
    projectRoot: root,
    dirName,
    plannedFiles: planFiles(readFeaturePlan(root, dirName)?.steps),
    changedFiles: files
  });
}
function openStageAgentId(root, sessionId, dirName) {
  const open = liveStageAgents(readFeatureStageUnit(root, dirName)).filter(
    (agent) => agent.agentId !== null && agent.sessionId === sessionId
  );
  return open.at(-1)?.agentId ?? null;
}
function runStageBrief(stage, options) {
  if (!stage || !STAGE_AGENT_STAGES.includes(stage)) {
    console.error(
      `name the stage to brief: one of ${STAGE_AGENT_STAGES.join(", ")}${stage ? ` (got "${stage}")` : ""}`
    );
    process.exitCode = 1;
    return;
  }
  const root = options.projectRoot;
  let brief;
  try {
    brief = keepingLedgerSessionCache(root, () => {
      const sessionId = resolveBriefSession(root, { session_id: options.session }, process.env);
      const dirName = currentFeature(root, sessionId);
      if (dirName === null) {
        throw new Error(`no active change for session ${sessionId}`);
      }
      const agentId = options.agentId ?? process.env.SE_AGENT_ID ?? openStageAgentId(root, sessionId, dirName);
      return buildStageBrief(stage, root, sessionId, { agentId, resumed: true });
    });
  } catch (error) {
    console.error(`could not build the ${stage} stage brief: ${error.message}`);
    process.exitCode = 1;
    return;
  }
  console.log(brief);
}
function createStageCommand() {
  return new Command("stage").description(
    "Mark a feature-development stage boundary in the stage-evidence ledger (clears the pre-code block for planning/specification)"
  ).argument(
    "<phase>",
    "'start' or 'end', 'settings' to print and record this project's per-stage effort and model, or 'brief' to print a stage's brief for a resumed stage agent"
  ).argument("[stage]", `one of: ${STAGE_ORDER.join(", ")}`).option("--project-root <path>", "Project root", process.cwd()).option(
    "--session <id>",
    "Session id to record under (defaults to SE_SESSION / CLAUDE_SESSION_ID, then the shared ledger-session cache)"
  ).option(
    "--artifact <path>",
    "Artifact the stage produced (repeatable); its real on-disk bytes are hashed so a thinking stage (planning/specification/review) proves work, not just a claim",
    collectArtifact
  ).option(
    "--title <title>",
    'On a `start`, open a NEW named feature for this change (the "new work" signal); pauses any active feature and mints a distinct evidence bundle'
  ).option("--issue <ref>", "Ticket/issue ref for a titled feature (e.g. <number>, PQD-123)").option(
    "--agent <name>",
    "The agent recording this boundary, e.g. paqad-planning. A dispatched stage agent passes its own name so the row is attributable; omitted means the orchestrator marked it inline. Defaults to PAQAD_STAGE_AGENT when set."
  ).option(
    "--agent-id <id>",
    "On a `brief`, the host agent id to print on the command lines (defaults to SE_AGENT_ID, then the session's open stage-agent row)"
  ).action(async (phase, stage, options) => {
    if (phase === "settings") {
      runStageSettings(options);
      return;
    }
    if (phase === "brief") {
      runStageBrief(stage, options);
      return;
    }
    if (phase !== "start" && phase !== "end") {
      console.error(`unknown phase "${phase}" \u2014 use 'start', 'end', 'settings' or 'brief'`);
      process.exitCode = 1;
      return;
    }
    if (!stage) {
      console.error(`name the stage to ${phase}: one of ${STAGE_ORDER.join(", ")}`);
      process.exitCode = 1;
      return;
    }
    const root = options.projectRoot;
    const sessionHint2 = options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null;
    const sessionId = resolveSessionId(root, sessionHint2);
    const sessionSource = sessionHint2?.trim() ? "env" : "cache";
    let artifactPaths;
    if (phase === "end" && options.artifact) {
      let normalized;
      try {
        normalized = options.artifact.map((raw) => normalizeArtifactPath(root, raw));
      } catch (error) {
        console.error(`could not record "${stage} ${phase}" \u2014 ${error.message}`);
        process.exitCode = 1;
        return;
      }
      const check = checkBundleArtifacts(root, sessionId, stage, normalized);
      if (check.rigid && check.accepted.length === 0 && check.rejected.length > 0) {
        const target = check.expected ?? `the bundle's ${bundleArtifactFile(stage)}.json`;
        console.error(
          `**\u25B8 paqad** \xB7 that file isn't ${stage}'s bundle artifact \u2014 run \`npx ${check.verb} \u2026\` first, then end ${stage} against ${target}. Recording ${stage} as inconclusive.`
        );
      } else if (!check.rigid && check.rejected.length > 0) {
        console.error(
          `**\u25B8 paqad** \xB7 a feature bundle holds only its rigid artifacts, so ${check.rejected.join(", ")} can't prove ${stage} \u2014 keep the artifact outside \`.paqad/ledger/feature-evidence/\` and end ${stage} against that path.`
        );
      }
      artifactPaths = check.accepted.length > 0 ? check.accepted : void 0;
    }
    const raised = phase === "start" && !options.title && STAGE_ORDER.includes(stage) ? await raiseLaneOnStageStart(root, sessionId) : null;
    const recorded = recordMarkedStage(root, {
      sessionId,
      sessionSource,
      stage,
      phase,
      artifactPaths,
      title: phase === "start" ? options.title : void 0,
      issue: options.issue,
      agent: options.agent ?? process.env.PAQAD_STAGE_AGENT ?? void 0,
      agentId: phase === "start" ? process.env.SE_AGENT_ID : void 0
    });
    if (!recorded) {
      console.error(
        `could not record "${stage} ${phase}" \u2014 unknown stage "${stage}". Stages, in order: ${STAGE_ORDER.join(", ")}`
      );
      process.exitCode = 1;
      return;
    }
    if (raised) console.log(laneRaisedLine(raised));
    const line = markerNarrationLine(stage, phase);
    if (line) console.log(line);
    console.log(
      JSON.stringify({
        recorded: true,
        stage,
        phase,
        ...raised ? { lane_raised: raised } : {}
      })
    );
  });
}

// src/cli/commands/status.ts
init_esm_shims();
import { resolve as resolve17 } from "path";
function renderHudText(snapshot) {
  const lines = [`paqad \xB7 ${snapshot.headline.text}`];
  if (snapshot.change) {
    const lane = snapshot.lane ? ` \xB7 ${snapshot.lane} lane` : "";
    lines.push(`change: ${snapshot.change.title ?? snapshot.change.dir}${lane}`);
  }
  for (const stage of snapshot.stages) {
    lines.push(`- ${stage.stage}: ${stage.state}`);
  }
  for (const flag of snapshot.flags) lines.push(`flag: ${flag.text}`);
  if (snapshot.cost) lines.push(`cost: ${hudCostText(snapshot.cost)}`);
  if (snapshot.decisions.pending.length > 0) {
    lines.push(`decisions waiting: ${snapshot.decisions.pending.length}`);
  }
  return lines.join("\n");
}
function hudCostText(cost) {
  const tokens = `${cost.tokens.total.toLocaleString("en-US")} tokens`;
  const money = cost.usd === null ? null : moneyText(cost.usd, cost.price_table_date);
  const unpriced = cost.unpriced_models.length > 0 ? `no price for ${cost.unpriced_models.join(", ")}` : null;
  return [tokens, money, unpriced].filter(Boolean).join("; ");
}
function collectDriftSignals(projectRoot) {
  const drift = readDriftReport(projectRoot);
  const docMissing = drift?.findings.filter((f) => f.code === "MM-DOC-MISSING").length ?? 0;
  const mmFindings = driftReportHasFindings(drift) ? drift?.findings.length ?? 0 : 0;
  const { staleModules } = collectModuleHealth(projectRoot);
  const { expiredIds } = collectModuleDecisions(projectRoot);
  return {
    mmFindings,
    staleModules,
    expiredDecisions: expiredIds,
    mmDocMissing: docMissing,
    blocked: drift?.blocked ?? null
  };
}
function driftSignalsTrip(signals) {
  return signals.mmFindings > 0 || signals.staleModules.length > 0 || signals.expiredDecisions.length > 0 || signals.mmDocMissing > 0 || signals.blocked !== null;
}
function createStatusCommand() {
  return new Command("status").description("Print a one-shot dashboard report (Markdown or JSON)").option("--format <fmt>", "Output format: markdown | json", "markdown").option("--project-root <path>", "Project root", process.cwd()).option(
    "--hud",
    "Print the paqad HUD snapshot for this session instead of the dashboard report",
    false
  ).option(
    "--session <id>",
    "Session id for --hud (defaults to SE_SESSION / CLAUDE_SESSION_ID, then the shared ledger-session cache)"
  ).option(
    "--fail-on-drift",
    "Exit non-zero when module-map drift, stale module-health, expired MD-XXXX decisions, or MM-DOC-MISSING findings are present",
    false
  ).action((options) => {
    const projectRoot = resolve17(options.projectRoot);
    const fmt = options.format.toLowerCase();
    if (fmt !== "markdown" && fmt !== "json") {
      process.stderr.write(
        `error: invalid --format value '${options.format}' (expected markdown or json)
`
      );
      process.exitCode = 2;
      return;
    }
    if (options.hud) {
      const snapshot = buildHudSnapshot(
        projectRoot,
        options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
      );
      const out = fmt === "json" ? JSON.stringify(snapshot, null, 2) : renderHudText(snapshot);
      process.stdout.write(`${out}
`);
      return;
    }
    const report2 = buildReport(projectRoot);
    const output = fmt === "json" ? JSON.stringify(report2, null, 2) : renderMarkdown(report2);
    process.stdout.write(`${output}
`);
    if (options.failOnDrift) {
      const signals = collectDriftSignals(projectRoot);
      if (driftSignalsTrip(signals)) {
        const reasons = [];
        if (signals.blocked !== null) reasons.push(`reconciler blocked: ${signals.blocked}`);
        if (signals.mmFindings > 0) reasons.push(`${signals.mmFindings} MM-* finding(s)`);
        if (signals.mmDocMissing > 0) reasons.push(`${signals.mmDocMissing} MM-DOC-MISSING`);
        if (signals.staleModules.length > 0) {
          reasons.push(`${signals.staleModules.length} stale module(s)`);
        }
        if (signals.expiredDecisions.length > 0) {
          reasons.push(`${signals.expiredDecisions.length} expired decision(s)`);
        }
        process.stderr.write(`status: --fail-on-drift tripped \u2014 ${reasons.join("; ")}
`);
        process.exitCode = 3;
      }
    }
  });
}

// src/cli/commands/visual-evidence.ts
init_esm_shims();

// src/visual-evidence/attach.ts
init_esm_shims();
import { createHash as createHash12 } from "crypto";
import { mkdirSync as mkdirSync20, readFileSync as readFileSync55, writeFileSync as writeFileSync19 } from "fs";
import { basename as basename5, extname as extname4, join as join83 } from "path";

// src/visual-evidence/manifest.ts
init_esm_shims();
import { cpSync, mkdirSync as mkdirSync19, readFileSync as readFileSync54, renameSync as renameSync9, writeFileSync as writeFileSync18 } from "fs";
import { basename as basename4, join as join82 } from "path";
function slugifyCaption(caption) {
  const slug = caption.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40).replace(/^-+|-+$/g, "");
  return slug.length > 0 ? slug : "step";
}
function pad2(n) {
  return String(Math.min(n, 99)).padStart(2, "0");
}
function uniqueSlug(slug, used) {
  if (!used.has(slug)) {
    used.add(slug);
    return slug;
  }
  let n = 2;
  while (used.has(`${slug}-${n}`)) n += 1;
  const out = `${slug}-${n}`;
  used.add(out);
  return out;
}
function stepDirSlug(dir) {
  return basename4(dir).replace(/^\d+-/, "");
}
function isAttachedStep(step) {
  return step.journey_id === AGENT_ATTACHED_JOURNEY;
}
function manifestSource(steps) {
  if (!steps.some(isAttachedStep)) return void 0;
  return steps.some((step) => !isAttachedStep(step)) ? "mixed" : "agent-attached";
}
function writeVisualEvidenceManifest(projectRoot, dirName, input) {
  const source = manifestSource(input.steps);
  const recordedAt = input.now();
  const manifest = stampFeatureDocument({
    projectRoot,
    dirName,
    docType: VISUAL_EVIDENCE_DOC_TYPE,
    schemaVersion: VISUAL_EVIDENCE_SCHEMA_VERSION,
    sessionId: input.sessionId,
    now: () => new Date(recordedAt),
    body: {
      trigger: input.trigger,
      plan: input.plan,
      steps: input.steps,
      gif: input.gif,
      skips: input.skips,
      result: input.result,
      ...source ? { source } : {}
    }
  });
  const errors = validateVisualEvidenceRecord(manifest);
  if (errors.length > 0) {
    throw new Error(
      `internal: visual-evidence manifest failed its own schema: ${errors.join("; ")}`
    );
  }
  const target = join82(projectRoot, featureFilePath(dirName, "visualEvidence"));
  mkdirSync19(join82(projectRoot, featureDir(dirName)), { recursive: true });
  const tmp = `${target}.tmp-${process.pid}`;
  writeFileSync18(tmp, `${JSON.stringify(manifest, null, 2)}
`, "utf8");
  renameSync9(tmp, target);
  return { wrote: true, manifest, result: input.result, skips: input.skips };
}
function normalizeStep(step) {
  if (step.recorded_at !== void 0 || step.captured_at === void 0) return step;
  const { captured_at: recordedAt, ...rest } = step;
  return { ...rest, recorded_at: recordedAt };
}
function readVisualEvidenceManifest(projectRoot, dirName) {
  try {
    const raw = readFileSync54(join82(projectRoot, featureFilePath(dirName, "visualEvidence")), "utf8");
    const manifest = JSON.parse(raw);
    return Array.isArray(manifest.steps) ? { ...manifest, steps: manifest.steps.map(normalizeStep) } : manifest;
  } catch {
    return null;
  }
}
function readAttachedSteps(projectRoot, dirName) {
  return (readVisualEvidenceManifest(projectRoot, dirName)?.steps ?? []).filter(isAttachedStep);
}
function mergedVisualEvidenceResult(steps) {
  if (steps.some((step) => step.status === "failed")) return "partial";
  return steps.some((step) => step.status === "captured") ? "captured" : "skipped";
}
function mergeAttachedSteps(attached, input) {
  if (attached.length === 0) return input;
  const steps = [...attached, ...input.steps];
  return { ...input, steps, result: mergedVisualEvidenceResult(steps) };
}
function copyAttachedStepDirs(projectRoot, dirName, attached, tmpAbs) {
  const bundleAbs = join82(projectRoot, featureDir(dirName));
  for (const step of attached) {
    cpSync(join82(bundleAbs, step.dir), join82(tmpAbs, basename4(step.dir)), { recursive: true });
  }
}

// src/visual-evidence/attach.ts
var PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
var VisualEvidenceAttachError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "VisualEvidenceAttachError";
  }
};
function checkAcceptanceCriterion(projectRoot, dirName, ac) {
  const spec = readFeatureSpecification(projectRoot, dirName);
  if (!spec?.frozen) {
    return `no frozen spec in this bundle, so ${ac} was not checked against its acceptance criteria.`;
  }
  const ids = (spec.acceptance_criteria ?? []).map((criterion) => criterion.criterion_id);
  if (!ids.includes(ac)) {
    const valid = ids.length > 0 ? ids.join(", ") : "none (the frozen spec has no criteria)";
    throw new VisualEvidenceAttachError(
      `${ac} is not an acceptance criterion of the frozen spec. Valid ids: ${valid}.`
    );
  }
  return void 0;
}
function readPng(file) {
  let bytes;
  try {
    bytes = readFileSync55(file);
  } catch {
    throw new VisualEvidenceAttachError(`cannot read ${file}: the file does not exist.`);
  }
  const isPng = extname4(file).toLowerCase() === ".png" && bytes.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE);
  if (!isPng) {
    throw new VisualEvidenceAttachError(
      `${file} is not a PNG image. Attach .png screenshots only.`
    );
  }
  return bytes;
}
function attachVisualEvidence(input) {
  const { projectRoot, dirName } = input;
  const now = input.now ?? (() => (/* @__PURE__ */ new Date()).toISOString());
  if (input.files.length === 0) {
    throw new VisualEvidenceAttachError("name at least one .png screenshot to attach.");
  }
  const images = input.files.map((file) => ({ file, bytes: readPng(file) }));
  const acWarning = input.ac ? checkAcceptanceCriterion(projectRoot, dirName, input.ac) : void 0;
  const existing = readVisualEvidenceManifest(projectRoot, dirName);
  const steps = [...existing?.steps ?? []];
  const used = new Set(steps.map((step) => stepDirSlug(step.dir)));
  let index = Math.max(0, ...steps.map((step) => step.index));
  let attachedCount = steps.filter(isAttachedStep).length;
  const bundleAbs = join83(projectRoot, featureDir(dirName));
  for (const { file, bytes } of images) {
    index += 1;
    attachedCount += 1;
    const caption = input.label ?? basename5(file, extname4(file));
    const dir = `screenshots/${pad2(index)}-${uniqueSlug(slugifyCaption(caption), used)}`;
    const dirAbs = join83(bundleAbs, dir);
    mkdirSync20(dirAbs, { recursive: true });
    writeFileSync19(join83(dirAbs, "image.png"), bytes);
    writeFileSync19(join83(dirAbs, "caption.txt"), `${caption}
`, "utf8");
    steps.push({
      index,
      journey_id: AGENT_ATTACHED_JOURNEY,
      journey_step: attachedCount,
      caption,
      dir,
      recorded_at: now(),
      image_sha256: createHash12("sha256").update(bytes).digest("hex"),
      image_bytes: bytes.length,
      status: "captured",
      ...input.ac ? { ac: input.ac } : {}
    });
  }
  const written = writeVisualEvidenceManifest(projectRoot, dirName, {
    trigger: existing?.trigger ?? { changed_files: [], matched_globs: [], packs: [] },
    plan: existing?.plan ?? [],
    steps,
    gif: existing?.gif ?? null,
    skips: existing?.skips ?? [],
    result: mergedVisualEvidenceResult(steps),
    now,
    sessionId: input.sessionId
  });
  return acWarning ? { ...written, acWarning } : written;
}

// src/visual-evidence/resolve-plan.ts
init_esm_shims();
function toPosix2(file) {
  return file.replace(/\\/g, "/");
}
function evidenceList(ref) {
  if (!ref) return [];
  return Array.isArray(ref) ? ref : [ref];
}
function anchorMatches(evidenceFile, changedFile) {
  const a = toPosix2(evidenceFile);
  const b = changedFile;
  if (a === b) return true;
  if (b.startsWith(`${a}/`)) return true;
  if (a.startsWith(`${b}/`)) return true;
  return false;
}
function surfaceMatches(surface, changedFiles, changeModules, projectRoot) {
  const anchors = evidenceList(surface.evidence);
  const surfaceModule = surface.module ?? "";
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  for (const file of changedFiles) {
    let matched = false;
    if (anchors.some((anchor) => anchorMatches(anchor.file, file))) {
      matched = true;
    }
    if (!matched && surfaceModule && changeModules.has(surfaceModule)) {
      matched = true;
    }
    if (!matched) continue;
    const fileModule = surfaceModule || modulesForFile(projectRoot, file)[0] || "";
    const key = `${file}\0${surface.id}\0${fileModule}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push({ file, surface: surface.id, module: fileModule });
    }
  }
  return out;
}
function journeySurfaces(entry, stepSurfaces) {
  return new Set([entry, ...stepSurfaces].filter(Boolean));
}
function resolveVisualEvidencePlan(projectRoot, changedFiles) {
  const files = changedFiles.map(toPosix2);
  const skips = [];
  const appMap = readCanonicalSiteMap(projectRoot);
  const surfaces = appMap?.surfaces ?? [];
  const changeModules = new Set(modulesForFiles(projectRoot, files));
  const surfaceMatchedBy = /* @__PURE__ */ new Map();
  for (const surface of surfaces) {
    const matched = surfaceMatches(surface, files, changeModules, projectRoot);
    if (matched.length > 0) {
      surfaceMatchedBy.set(surface.id, matched);
    }
  }
  const { scripts, errors } = loadCaptureScripts(projectRoot);
  for (const error of errors) {
    skips.push({
      reason: "capture-script-invalid",
      detail: `${error.file}: ${error.errors.join("; ")}`
    });
  }
  const scriptByJourney = /* @__PURE__ */ new Map();
  for (const script of scripts) {
    scriptByJourney.set(script.journey.id, script);
  }
  const entries = [];
  let anyJourneyMatched = false;
  const journeys = readAllJourneys(projectRoot).filter((journey) => journey.status === "confirmed").sort((a, b) => a.id.localeCompare(b.id));
  for (const journey of journeys) {
    const referenced = journeySurfaces(
      journey.entry,
      journey.steps.map((step) => step.surface)
    );
    const matchedSurfaces = [...referenced].filter((id) => surfaceMatchedBy.has(id));
    if (matchedSurfaces.length === 0) {
      continue;
    }
    anyJourneyMatched = true;
    const matched_by = [];
    const seen = /* @__PURE__ */ new Set();
    for (const surfaceId of matchedSurfaces) {
      for (const row of surfaceMatchedBy.get(surfaceId) ?? []) {
        const key = `${row.file}\0${row.surface}\0${row.module}`;
        if (!seen.has(key)) {
          seen.add(key);
          matched_by.push(row);
        }
      }
    }
    const loaded = scriptByJourney.get(journey.id);
    if (!loaded) {
      skips.push({
        reason: "no-capture-script",
        detail: `journey "${journey.id}" matched the change but has no ${journey.id}.capture.yaml`
      });
      continue;
    }
    entries.push({
      journey_id: journey.id,
      capture_script: loaded.file,
      loaded,
      matched_by
    });
  }
  if (!anyJourneyMatched) {
    skips.push({
      reason: "no-documented-flow",
      detail: "no confirmed journey references a surface this change touches"
    });
  }
  return { entries, skips };
}

// src/visual-evidence/runner.ts
init_esm_shims();
import { createHash as createHash13 } from "crypto";
import { existsSync as existsSync52, mkdirSync as mkdirSync21, renameSync as renameSync10, rmSync as rmSync7, writeFileSync as writeFileSync20 } from "fs";
import { join as join84 } from "path";
import { pathToFileURL as pathToFileURL3 } from "url";

// src/visual-evidence/boot.ts
init_esm_shims();
async function isReachable(url, timeoutMs2) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs2);
  try {
    const response = await fetch(url, { signal: controller.signal });
    return response.status < 500;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
async function sleep(ms) {
  await new Promise((resolve18) => setTimeout(resolve18, ms));
}
async function stopChild(child) {
  try {
    if (child.pid !== void 0) {
      process.kill(-child.pid, "SIGTERM");
    }
  } catch {
    try {
      child.kill("SIGTERM");
    } catch {
    }
  }
}
async function bootApp(projectRoot, profile) {
  const preview = profile?.app_preview;
  if (!preview || !preview.url) {
    return {
      ok: false,
      reason: "app-preview-not-configured",
      detail: "no app_preview block in project-profile.yaml \u2014 add app_preview.url (and optionally command/wait_ms) so visual evidence can reach the app"
    };
  }
  const { url } = preview;
  if (await isReachable(url, 2e3)) {
    return { ok: true, url, stop: async () => void 0 };
  }
  const commandString = preview.command && preview.command.trim().length > 0 ? preview.command : profile?.commands?.dev ?? "";
  if (commandString.trim().length === 0) {
    return {
      ok: false,
      reason: "app-not-reachable",
      detail: `app_preview.url ${url} did not respond and no boot command is configured (app_preview.command / commands.dev)`
    };
  }
  const [bin, ...args] = parseCommandString(commandString.trim());
  const child = execa(bin, args, {
    cwd: projectRoot,
    detached: true,
    stdio: "ignore",
    windowsHide: true
  });
  child.nodeChildProcess.unref();
  child.catch(() => {
  });
  const waitMs = preview.wait_ms ?? 3e4;
  const deadline = Date.now() + waitMs;
  while (Date.now() < deadline) {
    if (await isReachable(url, 2e3)) {
      return { ok: true, url, stop: () => stopChild(child) };
    }
    await sleep(1e3);
  }
  await stopChild(child);
  return {
    ok: false,
    reason: "app-not-reachable",
    detail: `app_preview.url ${url} did not respond within ${waitMs}ms after starting "${commandString}"`
  };
}

// src/visual-evidence/gif.ts
init_esm_shims();
import { readFileSync as readFileSync56 } from "fs";

// node_modules/.pnpm/gifenc@1.0.3/node_modules/gifenc/dist/gifenc.esm.js
init_esm_shims();
var X = { signature: "GIF", version: "89a", trailer: 59, extensionIntroducer: 33, applicationExtensionLabel: 255, graphicControlExtensionLabel: 249, imageSeparator: 44, signatureSize: 3, versionSize: 3, globalColorTableFlagMask: 128, colorResolutionMask: 112, sortFlagMask: 8, globalColorTableSizeMask: 7, applicationIdentifierSize: 8, applicationAuthCodeSize: 3, disposalMethodMask: 28, userInputFlagMask: 2, transparentColorFlagMask: 1, localColorTableFlagMask: 128, interlaceFlagMask: 64, idSortFlagMask: 32, localColorTableSizeMask: 7 };
function F(t = 256) {
  let e = 0, s = new Uint8Array(t);
  return { get buffer() {
    return s.buffer;
  }, reset() {
    e = 0;
  }, bytesView() {
    return s.subarray(0, e);
  }, bytes() {
    return s.slice(0, e);
  }, writeByte(r) {
    n(e + 1), s[e] = r, e++;
  }, writeBytes(r, o = 0, i = r.length) {
    n(e + i);
    for (let c = 0; c < i; c++) s[e++] = r[c + o];
  }, writeBytesView(r, o = 0, i = r.byteLength) {
    n(e + i), s.set(r.subarray(o, o + i), e), e += i;
  } };
  function n(r) {
    var o = s.length;
    if (o >= r) return;
    var i = 1024 * 1024;
    r = Math.max(r, o * (o < i ? 2 : 1.125) >>> 0), o != 0 && (r = Math.max(r, 256));
    let c = s;
    s = new Uint8Array(r), e > 0 && s.set(c.subarray(0, e), 0);
  }
}
var O = 12;
var J = 5003;
var lt = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535];
function at(t, e, s, n, r = F(512), o = new Uint8Array(256), i = new Int32Array(J), c = new Int32Array(J)) {
  let x = i.length, a = Math.max(2, n);
  o.fill(0), c.fill(0), i.fill(-1);
  let l = 0, f = 0, g = a + 1, h = g, b = false, w = h, _ = (1 << w) - 1, u = 1 << g - 1, k = u + 1, B = u + 2, p = 0, A = s[0], z = 0;
  for (let y = x; y < 65536; y *= 2) ++z;
  z = 8 - z, r.writeByte(a), I(u);
  let d = s.length;
  for (let y = 1; y < d; y++) {
    t: {
      let m = s[y], v = (m << O) + A, M = m << z ^ A;
      if (i[M] === v) {
        A = c[M];
        break t;
      }
      let V = M === 0 ? 1 : x - M;
      for (; i[M] >= 0; ) if (M -= V, M < 0 && (M += x), i[M] === v) {
        A = c[M];
        break t;
      }
      I(A), A = m, B < 1 << O ? (c[M] = B++, i[M] = v) : (i.fill(-1), B = u + 2, b = true, I(u));
    }
  }
  return I(A), I(k), r.writeByte(0), r.bytesView();
  function I(y) {
    for (l &= lt[f], f > 0 ? l |= y << f : l = y, f += w; f >= 8; ) o[p++] = l & 255, p >= 254 && (r.writeByte(p), r.writeBytesView(o, 0, p), p = 0), l >>= 8, f -= 8;
    if ((B > _ || b) && (b ? (w = h, _ = (1 << w) - 1, b = false) : (++w, _ = w === O ? 1 << w : (1 << w) - 1)), y == k) {
      for (; f > 0; ) o[p++] = l & 255, p >= 254 && (r.writeByte(p), r.writeBytesView(o, 0, p), p = 0), l >>= 8, f -= 8;
      p > 0 && (r.writeByte(p), r.writeBytesView(o, 0, p), p = 0);
    }
  }
}
var $ = at;
function ct(t = {}) {
  let { initialCapacity: e = 4096, auto: s = true } = t, n = F(e), r = 5003, o = new Uint8Array(256), i = new Int32Array(r), c = new Int32Array(r), x = false;
  return { reset() {
    n.reset(), x = false;
  }, finish() {
    n.writeByte(X.trailer);
  }, bytes() {
    return n.bytes();
  }, bytesView() {
    return n.bytesView();
  }, get buffer() {
    return n.buffer;
  }, get stream() {
    return n;
  }, writeHeader: a, writeFrame(l, f, g, h = {}) {
    let { transparent: b = false, transparentIndex: w = 0, delay: _ = 0, palette: u = null, repeat: k = 0, colorDepth: B = 8, dispose: p = -1 } = h, A = false;
    if (s ? x || (A = true, a(), x = true) : A = Boolean(h.first), f = Math.max(0, Math.floor(f)), g = Math.max(0, Math.floor(g)), A) {
      if (!u) throw new Error("First frame must include a { palette } option");
      pt(n, f, g, u, B), it(n, u), k >= 0 && dt(n, k);
    }
    let z = Math.round(_ / 10);
    wt(n, p, z, b, w);
    let d = Boolean(u) && !A;
    ht(n, f, g, d ? u : null), d && it(n, u), yt(n, l, f, g, B, o, i, c);
  } };
  function a() {
    ft(n, "GIF89a");
  }
}
function wt(t, e, s, n, r) {
  t.writeByte(33), t.writeByte(249), t.writeByte(4), r < 0 && (r = 0, n = false);
  var o, i;
  n ? (o = 1, i = 2) : (o = 0, i = 0), e >= 0 && (i = e & 7), i <<= 2;
  let c = 0;
  t.writeByte(0 | i | c | o), S(t, s), t.writeByte(r || 0), t.writeByte(0);
}
function pt(t, e, s, n, r = 8) {
  let o = 1, i = 0, c = Z(n.length) - 1, x = o << 7 | r - 1 << 4 | i << 3 | c, a = 0, l = 0;
  S(t, e), S(t, s), t.writeBytes([x, a, l]);
}
function dt(t, e) {
  t.writeByte(33), t.writeByte(255), t.writeByte(11), ft(t, "NETSCAPE2.0"), t.writeByte(3), t.writeByte(1), S(t, e), t.writeByte(0);
}
function it(t, e) {
  let s = 1 << Z(e.length);
  for (let n = 0; n < s; n++) {
    let r = [0, 0, 0];
    n < e.length && (r = e[n]), t.writeByte(r[0]), t.writeByte(r[1]), t.writeByte(r[2]);
  }
}
function ht(t, e, s, n) {
  if (t.writeByte(44), S(t, 0), S(t, 0), S(t, e), S(t, s), n) {
    let r = 0, o = 0, i = Z(n.length) - 1;
    t.writeByte(128 | r | o | 0 | i);
  } else t.writeByte(0);
}
function yt(t, e, s, n, r = 8, o, i, c) {
  $(s, n, e, r, t, o, i, c);
}
function S(t, e) {
  t.writeByte(e & 255), t.writeByte(e >> 8 & 255);
}
function ft(t, e) {
  for (var s = 0; s < e.length; s++) t.writeByte(e.charCodeAt(s));
}
function Z(t) {
  return Math.max(Math.ceil(Math.log2(t)), 1);
}
var Bt = ct;

// src/visual-evidence/gif.ts
var { GIFEncoder, applyPalette, quantize } = Bt;
var CAPTION_BAR = {
  minHeight: 56,
  padding: 16,
  fontPx: 16,
  background: "#ffffff",
  color: "#333333"
};
function toDataUrl(imageAbsPath) {
  const bytes = readFileSync56(imageAbsPath);
  return `data:image/png;base64,${bytes.toString("base64")}`;
}
async function renderFrame(page2, input, frameWidth, frameHeight) {
  const raw = await page2.evaluate(
    (payloadUnknown) => {
      const payload = payloadUnknown;
      return new Promise((resolve18, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = payload.frameWidth;
          canvas.height = payload.frameHeight;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("no 2d context"));
            return;
          }
          ctx.fillStyle = payload.bar.background;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = payload.bar.color;
          ctx.font = `${payload.bar.fontPx}px system-ui, -apple-system, sans-serif`;
          ctx.textBaseline = "middle";
          const barHeight = payload.bar.minHeight;
          ctx.fillText(
            payload.caption,
            payload.bar.padding,
            barHeight / 2,
            canvas.width - payload.bar.padding * 2
          );
          const scale = Math.min(1, payload.frameWidth / img.naturalWidth);
          const drawW = Math.round(img.naturalWidth * scale);
          const drawH = Math.round(img.naturalHeight * scale);
          ctx.drawImage(img, 0, barHeight, drawW, drawH);
          const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
          resolve18({ data: Array.from(pixels.data), width: canvas.width, height: canvas.height });
        };
        img.onerror = () => reject(new Error("image failed to load"));
        img.src = payload.dataUrl;
      });
    },
    {
      dataUrl: toDataUrl(input.imageAbsPath),
      caption: input.caption,
      frameWidth,
      frameHeight,
      bar: CAPTION_BAR
    }
  );
  return { data: Uint8Array.from(raw.data), width: raw.width, height: raw.height };
}
async function naturalSize(page2, imageAbsPath) {
  return page2.evaluate(
    (dataUrlUnknown) => new Promise((resolve18, reject) => {
      const img = new Image();
      img.onload = () => resolve18({ w: img.naturalWidth, h: img.naturalHeight });
      img.onerror = () => reject(new Error("image failed to load"));
      img.src = dataUrlUnknown;
    }),
    toDataUrl(imageAbsPath)
  );
}
async function assembleOverviewGif(page2, frames, options = {}) {
  const frameMs = options.frameMs ?? 2e3;
  const maxFrames = options.maxFrames ?? 12;
  const maxWidth = options.maxWidth ?? 1280;
  const selected = frames.slice(0, maxFrames);
  if (selected.length === 0) {
    return null;
  }
  const sizes = [];
  for (const frame of selected) {
    sizes.push(await naturalSize(page2, frame.imageAbsPath));
  }
  const frameWidth = Math.min(maxWidth, Math.max(...sizes.map((s) => s.w)));
  const maxScaledHeight = Math.max(
    ...sizes.map((s) => Math.round(s.h * Math.min(1, frameWidth / s.w)))
  );
  const frameHeight = CAPTION_BAR.minHeight + maxScaledHeight;
  await page2.setViewportSize({ width: frameWidth, height: frameHeight });
  const encoder = GIFEncoder();
  for (const frame of selected) {
    const { data, width, height } = await renderFrame(page2, frame, frameWidth, frameHeight);
    const palette = quantize(data, 256);
    const index = applyPalette(data, palette);
    encoder.writeFrame(index, width, height, { palette, delay: frameMs });
  }
  encoder.finish();
  return Buffer.from(encoder.bytes());
}

// src/visual-evidence/runner.ts
function writeManifest(projectRoot, dirName, attached, input) {
  return writeVisualEvidenceManifest(projectRoot, dirName, mergeAttachedSteps(attached, input));
}
function resolveValue(value, env) {
  if (value === void 0) return void 0;
  const match = /^\$(\w+)$/.exec(value);
  if (!match) return value;
  return env[match[1]];
}
async function runAction(page2, action, env) {
  const value = resolveValue(action.value, env);
  switch (action.do) {
    case "click":
      await page2.click(action.selector);
      return;
    case "fill":
      await page2.fill(action.selector, value ?? "");
      return;
    case "select":
      await page2.selectOption(action.selector, value ?? "");
      return;
    case "press":
      await page2.press(action.selector, value ?? "");
      return;
    case "wait_for":
      await page2.waitForSelector(action.selector, {
        state: value === "hidden" ? "hidden" : "visible"
      });
      return;
  }
}
function missingEnvVar(action, env) {
  if (action.value === void 0) return false;
  const match = /^\$(\w+)$/.exec(action.value);
  return match !== null && env[match[1]] === void 0;
}
function resolveUrl(base, path2) {
  if (!path2) return base;
  return new URL(path2, base.endsWith("/") ? base : `${base}/`).toString();
}
async function loadChromium() {
  process.env.PLAYWRIGHT_BROWSERS_PATH = veBrowsersPath();
  const modulePath = resolvePlaywrightModulePath(resolveVeRuntimeDir());
  const mod = await import(pathToFileURL3(modulePath).href);
  const chromium = mod.chromium ?? mod.default?.chromium;
  if (!chromium) throw new Error("playwright chromium entry not found");
  return chromium;
}
function sha256(bytes) {
  return createHash13("sha256").update(bytes).digest("hex");
}
async function runVisualEvidence(input) {
  const { projectRoot, dirName, profile, trigger, changedFiles } = input;
  const now = input.now ?? (() => (/* @__PURE__ */ new Date()).toISOString());
  const env = process.env;
  const plan = resolveVisualEvidencePlan(projectRoot, changedFiles);
  const skips = [...plan.skips];
  const attached = readAttachedSteps(projectRoot, dirName);
  if (plan.entries.length === 0) {
    return writeManifest(projectRoot, dirName, attached, {
      trigger,
      plan: [],
      steps: [],
      gif: null,
      skips,
      result: "skipped",
      now
    });
  }
  if (browserStatus() !== "provisioned") {
    try {
      await provisionBrowser();
    } catch {
      skips.push({
        reason: "playwright-not-provisioned",
        detail: "Playwright/Chromium is not provisioned and provisioning failed (offline?)"
      });
      return writeManifest(projectRoot, dirName, attached, {
        trigger,
        plan: planEntries(plan.entries),
        steps: [],
        gif: null,
        skips,
        result: "skipped",
        now
      });
    }
  }
  const boot = await bootApp(projectRoot, profile);
  if (!boot.ok) {
    skips.push({ reason: boot.reason, detail: boot.detail });
    return writeManifest(projectRoot, dirName, attached, {
      trigger,
      plan: planEntries(plan.entries),
      steps: [],
      gif: null,
      skips,
      result: "skipped",
      now
    });
  }
  const tmpDir = `${featureScreenshotsDir(dirName)}.tmp-${process.pid}`;
  const tmpAbs = join84(projectRoot, tmpDir);
  rmSync7(tmpAbs, { recursive: true, force: true });
  mkdirSync21(tmpAbs, { recursive: true });
  copyAttachedStepDirs(projectRoot, dirName, attached, tmpAbs);
  const chromium = await loadChromium();
  const browser = await chromium.launch({ headless: true });
  const steps = [];
  const gifFrames = [];
  const usedSlugs = new Set(attached.map((step) => stepDirSlug(step.dir)));
  let index = Math.max(0, ...attached.map((step) => step.index));
  try {
    const page2 = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    for (const entry of plan.entries) {
      const captured = await captureFlow(page2, entry, boot.url, env, {
        tmpAbs,
        startIndex: index,
        usedSlugs,
        now
      });
      steps.push(...captured.steps);
      gifFrames.push(...captured.frames);
      skips.push(...captured.skips);
      index += captured.steps.length;
    }
    let gif = null;
    if (gifFrames.length > 0) {
      const gifBytes = await assembleOverviewGif(page2, gifFrames);
      if (gifBytes) {
        writeFileSync20(join84(tmpAbs, "overview.gif"), gifBytes);
        gif = {
          file: "screenshots/overview.gif",
          frames: Math.min(gifFrames.length, 12),
          frame_ms: 2e3,
          sha256: sha256(gifBytes),
          bytes: gifBytes.length
        };
      }
    }
    await browser.close();
    const liveAbs = join84(projectRoot, featureScreenshotsDir(dirName));
    rmSync7(liveAbs, { recursive: true, force: true });
    renameSync10(tmpAbs, liveAbs);
    const anyCaptured = steps.some((step) => step.status === "captured");
    const anyFailed = steps.some((step) => step.status === "failed");
    const result = anyCaptured ? anyFailed ? "partial" : "captured" : "skipped";
    return writeManifest(projectRoot, dirName, attached, {
      trigger,
      plan: planEntries(plan.entries),
      steps,
      gif,
      skips,
      result,
      now
    });
  } catch (error) {
    await browser.close().catch(() => void 0);
    rmSync7(tmpAbs, { recursive: true, force: true });
    throw error;
  } finally {
    await boot.stop();
  }
}
async function captureFlow(page2, entry, baseUrl, env, ctx) {
  const steps = [];
  const frames = [];
  const skips = [];
  const { script, journey } = entry.loaded;
  try {
    for (const setup of script.setup ?? []) {
      if (setup.goto) await page2.goto(resolveUrl(baseUrl, setup.goto));
      for (const action of setup.actions ?? []) {
        if (missingEnvVar(action, env)) {
          skips.push({
            reason: "env-var-missing",
            detail: `${entry.journey_id}: ${action.value} is not set`
          });
          return { steps, frames, skips };
        }
        await runAction(page2, action, env);
      }
    }
  } catch {
    skips.push({
      reason: "selector-not-found",
      detail: `${entry.journey_id}: setup selector failed`
    });
    return { steps, frames, skips };
  }
  let position = ctx.startIndex;
  for (const step of script.steps) {
    const caption = deriveCaption(journey, step.journey_step);
    position += 1;
    try {
      const outcome = await captureStep(page2, step, caption, baseUrl, env, position, ctx);
      steps.push(outcome.step);
      if (outcome.frame) frames.push(outcome.frame);
    } catch {
      steps.push({
        index: position,
        journey_id: entry.journey_id,
        journey_step: step.journey_step,
        caption,
        dir: "",
        recorded_at: ctx.now(),
        status: "failed",
        failure: `selector-not-found while running journey_step ${step.journey_step}`
      });
      skips.push({
        reason: "selector-not-found",
        detail: `${entry.journey_id} step ${step.journey_step}`
      });
      break;
    }
  }
  for (const step of steps) {
    if (!step.journey_id) step.journey_id = entry.journey_id;
  }
  return { steps, frames, skips };
}
async function captureStep(page2, step, caption, baseUrl, env, position, ctx) {
  const route = step.goto;
  if (route) await page2.goto(resolveUrl(baseUrl, route));
  for (const action of step.actions ?? []) {
    await runAction(page2, action, env);
  }
  const capturedAt = ctx.now();
  const base = {
    index: position,
    journey_id: "",
    journey_step: step.journey_step,
    caption,
    dir: "",
    route,
    recorded_at: capturedAt,
    status: step.screenshot === false ? "skipped" : "captured"
  };
  if (step.screenshot === false) {
    return { step: base, frame: null };
  }
  const slug = uniqueSlug(slugifyCaption(caption), ctx.usedSlugs);
  const dir = `${pad2(position)}-${slug}`;
  const dirAbs = join84(ctx.tmpAbs, dir);
  mkdirSync21(dirAbs, { recursive: true });
  const png = await page2.screenshot({ fullPage: true });
  const imageAbs = join84(dirAbs, "image.png");
  writeFileSync20(imageAbs, png);
  writeFileSync20(join84(dirAbs, "caption.txt"), `${caption}
`, "utf8");
  return {
    step: {
      ...base,
      dir: `screenshots/${dir}`,
      image_sha256: sha256(png),
      image_bytes: png.length
    },
    frame: { imageAbsPath: imageAbs, caption }
  };
}
function planEntries(entries) {
  return entries.map((entry) => ({
    journey_id: entry.journey_id,
    capture_script: entry.capture_script,
    matched_by: entry.matched_by
  }));
}

// src/cli/commands/visual-evidence.ts
function createVisualEvidenceCommand() {
  const command = new Command("visual-evidence").description(
    "Capture screenshots of documented flows for frontend changes as feature-bundle evidence"
  );
  command.command("run").description(
    "Resolve the plan, boot the app, capture the flows, and write the bundle artifacts"
  ).option("--project-root <path>", "Project root", process.cwd()).option("--json", "Emit a machine-readable summary line", false).action(async (options) => {
    const { projectRoot } = options;
    const profile = readProjectProfile(projectRoot);
    const flag = resolveFrameworkConfig(projectRoot).features.visual_evidence;
    const coding = profile?.active_capabilities?.includes("coding") ?? false;
    if (!flag || !coding) {
      report(
        options.json,
        "skipped",
        "visual evidence is off (flag off or coding capability absent)."
      );
      return;
    }
    const dirName = activeFeatureDirOrNull(projectRoot);
    if (!dirName) {
      report(options.json, "skipped", "no active feature bundle \u2014 nothing to write into.");
      return;
    }
    const trigger = await triggerOrInstallFault(projectRoot, options.json);
    if (!trigger) return;
    if (!trigger.triggered) {
      report(
        options.json,
        "skipped",
        "not-frontend \u2014 no changed file matched a frontend surface."
      );
      return;
    }
    const result = await runVisualEvidence({
      projectRoot,
      dirName,
      profile,
      trigger: {
        changed_files: trigger.changed_files,
        matched_globs: trigger.matched_globs,
        packs: trigger.packs
      },
      changedFiles: trigger.matched_files
    });
    const captured = result.manifest?.steps.filter((s) => s.status === "captured").length ?? 0;
    const glyph = result.result === "captured" ? "\u{1F7E2}" : result.result === "partial" ? "\u{1F7E1}" : "\u26AA";
    console.log(`**\u25B8 paqad** \xB7 visual evidence ${result.result}`);
    console.log(`> ${glyph} ${captured} step(s) captured; ${result.skips.length} skip(s).`);
    for (const skip of result.skips) {
      console.log(`> \u26AA ${skip.reason}: ${skip.detail}`);
    }
    if (options.json) {
      console.log(
        JSON.stringify({ result: result.result, captured, skips: result.skips.length })
      );
    }
  });
  command.command("plan").description(
    "Print the resolved capture plan (journeys, matched files, scripts, skips) \u2014 no browser"
  ).option("--project-root <path>", "Project root", process.cwd()).option("--json", "Emit JSON", false).action(async (options) => {
    const { projectRoot } = options;
    const trigger = await triggerOrInstallFault(projectRoot, options.json);
    if (!trigger) return;
    const plan = resolveVisualEvidencePlan(projectRoot, trigger.matched_files);
    if (options.json) {
      console.log(
        JSON.stringify({
          triggered: trigger.triggered,
          matched_files: trigger.matched_files,
          entries: plan.entries.map((e) => ({
            journey_id: e.journey_id,
            capture_script: e.capture_script,
            matched_by: e.matched_by
          })),
          skips: plan.skips
        })
      );
      return;
    }
    console.log("**\u25B8 paqad** \xB7 visual-evidence plan");
    console.log(`> ${trigger.triggered ? "\u{1F7E2}" : "\u26AA"} frontend-triggering: ${trigger.triggered}`);
    for (const entry of plan.entries) {
      console.log(
        `> \u{1F7E2} ${entry.journey_id} \u2190 ${entry.capture_script} (${entry.matched_by.length} anchor(s))`
      );
    }
    for (const skip of plan.skips) {
      console.log(`> \u26AA ${skip.reason}: ${skip.detail}`);
    }
  });
  command.command("attach").description(
    "Attach your own PNG screenshots to the active feature bundle as agent-attached visual evidence"
  ).argument("<png...>", "One or more .png screenshots, in order").option("--ac <id>", "The acceptance criterion these screenshots prove (e.g. AC-3)").option("--label <text>", "Caption for the screenshots (defaults to each file name)").option("--project-root <path>", "Project root", process.cwd()).option(
    "--session <id>",
    "Session id (defaults to SE_SESSION / CLAUDE_SESSION_ID, then the shared ledger-session cache)"
  ).action(
    (files, options) => {
      const { projectRoot } = options;
      const refuse = (reason2) => {
        console.error(`**\u25B8 paqad** \xB7 visual evidence attach refused: ${reason2}`);
        process.exitCode = 1;
      };
      if (!visualEvidenceFlagOn(projectRoot)) {
        refuse("visual evidence is off (flag off or coding capability absent).");
        return;
      }
      const sessionId = resolveSessionId(
        projectRoot,
        options.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
      );
      const dirName = currentFeature(projectRoot, sessionId);
      if (!dirName) {
        refuse("no active feature bundle to attach into. Start the change first.");
        return;
      }
      try {
        const result = attachVisualEvidence({
          projectRoot,
          dirName,
          files,
          sessionId,
          ...options.ac ? { ac: options.ac } : {},
          ...options.label ? { label: options.label } : {}
        });
        if (result.acWarning) {
          console.error(`**\u25B8 paqad** \xB7 visual evidence attach: ${result.acWarning}`);
        }
        const attached = result.manifest?.steps.filter((step) => step.journey_id === AGENT_ATTACHED_JOURNEY).length ?? 0;
        console.log(
          `**\u25B8 paqad** \xB7 visual evidence: attached ${files.length} screenshot(s); ${attached} agent-attached step(s) in the bundle (source: ${result.manifest?.source ?? "agent-attached"}).`
        );
      } catch (error) {
        if (!(error instanceof VisualEvidenceAttachError)) throw error;
        refuse(error.message);
      }
    }
  );
  command.command("setup").description(
    "Provision the Playwright + Chromium runtime under ~/.paqad-ai/ve-runtime (idempotent)"
  ).option("--json", "Emit JSON", false).action(async (options) => {
    const veRuntime = resolveVeRuntimeDir();
    let status = browserStatus(veRuntime);
    if (status === "provisioned") {
      report(options.json, "provisioned", `browser already provisioned at ${veRuntime}.`);
      return;
    }
    console.error("Provisioning Playwright + Chromium (this may take a minute)\u2026");
    try {
      await provisionBrowser(veRuntime);
      status = browserStatus(veRuntime);
      report(options.json, status, `browser ${status} at ${veRuntime}.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      report(options.json, "failed", `provisioning failed: ${message}`);
      process.exitCode = 1;
    }
  });
  return command;
}
async function triggerOrInstallFault(projectRoot, json) {
  try {
    return await evaluateFrontendTrigger(projectRoot);
  } catch (error) {
    if (!(error instanceof PackRegistryEmptyError)) throw error;
    report(
      json,
      "install-fault",
      `${packRegistryFaultDetail(error.runtimeRoot)} Next: ${PACK_REGISTRY_FAULT_REMEDIATION}`
    );
    process.exitCode = 1;
    return null;
  }
}
function report(json, status, message) {
  console.log(`**\u25B8 paqad** \xB7 visual evidence: ${message}`);
  if (json) {
    console.log(JSON.stringify({ status }));
  }
}

// src/cli/commands/update.ts
init_esm_shims();
function createUpdateCommand() {
  return new Command("update").description("Update framework-managed artifacts").option("--project-root <path>", "Project root", process.cwd()).option("--silent", "Suppress output; write results to audit log only").action(async (options) => {
    try {
      const report2 = await new FrameworkUpdater().run(options.projectRoot);
      if (!options.silent) {
        console.log(JSON.stringify(report2, null, 2));
      }
      appendAuditLog(options.projectRoot, report2.previous_version, report2.target_version);
      if (options.silent) {
        try {
          maybeMigrateToPlugin(options.projectRoot, {
            runClaudeInstall: runClaudeInstallWith
          });
        } catch {
        }
      }
    } catch (err) {
      if (!options.silent) {
        throw err;
      }
      appendAuditLogFailure(
        options.projectRoot,
        null,
        VERSION,
        err instanceof Error ? err.message : String(err)
      );
      process.exit(1);
    }
  });
}

// src/cli/program.ts
function createProgram() {
  const program = new Command();
  program.name("paqad-ai").description("AI Agency Framework for software agencies").version(VERSION).showSuggestionAfterError(true);
  program.addCommand(createInstallCommand());
  program.addCommand(createCapabilitiesCommand());
  program.addCommand(createChecksCommand());
  program.addCommand(createDuplicationCommand());
  program.addCommand(createMetricsCommand());
  program.addCommand(createReportCommand());
  program.addCommand(createIndexCommand());
  program.addCommand(createHealthCommand());
  program.addCommand(createSitemapCommand());
  program.addCommand(createPacksCommand());
  program.addCommand(createComplianceCommand());
  program.addCommand(createDashboardCommand());
  program.addCommand(createDoctorCommand());
  program.addCommand(createPluginCommand());
  program.addCommand(createEvidenceCommand());
  program.addCommand(createFeatureCommand());
  program.addCommand(createAuditCommand());
  program.addCommand(createGraphCommand(), { hidden: true });
  program.addCommand(createModuleDecisionsCommand());
  program.addCommand(createModuleEventsCommand());
  program.addCommand(createModuleHealthCommand());
  program.addCommand(createModuleMapCommand());
  program.addCommand(createOnboardCommand());
  program.addCommand(createNewProjectCommand());
  program.addCommand(createSetupCommand());
  program.addCommand(createJoinCommand());
  program.addCommand(createEnableCommand());
  program.addCommand(createDisableCommand());
  program.addCommand(createRefreshCommand());
  program.addCommand(createRulesCommand());
  program.addCommand(createRagCommand());
  program.addCommand(createRagEvidenceCommand());
  program.addCommand(createUpdateCommand());
  program.addCommand(createPatternsCommand());
  program.addCommand(createPlanCommand());
  program.addCommand(createPreflightCommand());
  program.addCommand(createSpecCommand());
  program.addCommand(createReviewCommand());
  program.addCommand(createStageCommand());
  program.addCommand(createLaneCommand());
  program.addCommand(createVisualEvidenceCommand());
  program.addCommand(createResumeCommand());
  program.addCommand(createRouteCommand());
  program.addCommand(createDecisionCommand());
  program.addCommand(createConfigCommand());
  program.addCommand(createIntakeCommand());
  program.addCommand(createDeliveryCommand());
  program.addCommand(createDeliveryLinkCommand());
  program.addCommand(createDiscoveryCommand());
  program.addCommand(createStatusCommand());
  program.addCommand(createDebtCommand());
  program.addCommand(createHookCommand());
  program.addCommand(createManagedSettingsCommand());
  program.addCommand(createFixCommand());
  program.hook("postAction", (_program, actionCommand) => {
    const commandPath2 = commandPathOf(actionCommand);
    if (!isHudRefreshVerb(commandPath2)) return;
    const opts = actionCommand.opts();
    refreshHudSnapshot(
      opts.projectRoot ?? process.cwd(),
      opts.session ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null,
      `cli:${commandPath2}`
    );
  });
  return program;
}
function commandPathOf(command) {
  const names = [];
  for (let current = command; current?.parent; current = current.parent) {
    names.unshift(current.name());
  }
  return names.join(" ");
}
var COMPAT_OPTION_ALIASES = {
  onboard: {
    "--provider": "--providers"
  }
};
function normalizeCliArgv(program, argv) {
  if (argv.length <= 2) {
    return { argv, notices: [] };
  }
  const normalized = argv.slice(0, 2);
  const notices = [];
  const tokens = argv.slice(2);
  let current = program;
  let positionalCount = 0;
  let pendingValueOption;
  let passthrough = false;
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (passthrough) {
      normalized.push(token);
      continue;
    }
    if (pendingValueOption) {
      if (looksLikeOption(token)) {
        pendingValueOption = void 0;
      } else {
        normalized.push(token);
        if (!pendingValueOption.variadic) {
          pendingValueOption = void 0;
        }
        continue;
      }
    }
    if (token === "--") {
      normalized.push(token);
      passthrough = true;
      pendingValueOption = void 0;
      continue;
    }
    const subcommand = findSubcommand(current, token);
    if (subcommand) {
      normalized.push(token);
      current = subcommand;
      positionalCount = 0;
      pendingValueOption = void 0;
      continue;
    }
    if (looksLikeOption(token)) {
      const resolved = resolveKnownOption(current, token);
      if (resolved) {
        normalized.push(resolved.token);
        if (resolved.notice) {
          notices.push(resolved.notice);
        }
        if (resolved.option.required || resolved.option.optional) {
          const inlineValue = extractInlineOptionValue(resolved.token);
          if (inlineValue === void 0) {
            pendingValueOption = { variadic: resolved.option.variadic };
          }
        }
        continue;
      }
      notices.push(
        `warning: ignoring unsupported option '${extractOptionName(token)}' for command '${getCommandPath(current)}'`
      );
      if (shouldDiscardNextTokenAsUnknownValue(current, positionalCount, tokens[index + 1])) {
        index += 1;
      }
      continue;
    }
    normalized.push(token);
    positionalCount += 1;
  }
  return { argv: normalized, notices };
}
function resolveKnownOption(command, token) {
  const originalName = extractOptionName(token);
  if (originalName === "--help" || originalName === "-h") {
    return {
      option: {
        long: "--help",
        short: "-h",
        required: false,
        optional: false,
        variadic: false
      },
      token
    };
  }
  const path2 = getCommandPath(command);
  const alias = COMPAT_OPTION_ALIASES[path2]?.[originalName];
  const resolvedToken = alias ? replaceOptionName(token, alias) : token;
  const resolvedName = extractOptionName(resolvedToken);
  const option = command.options.find((candidate) => {
    return candidate.long === resolvedName || candidate.short === resolvedName;
  });
  if (!option) {
    return void 0;
  }
  return {
    option,
    token: resolvedToken,
    notice: alias ? `warning: treating '${originalName}' as '${resolvedName}' for command '${path2}'` : void 0
  };
}
function getCommandPath(command) {
  const path2 = [];
  let current = command;
  while (current) {
    if (current.parent) {
      path2.unshift(current.name());
    }
    current = current.parent ?? null;
  }
  return path2.join(" ");
}
function findSubcommand(command, token) {
  return command.commands.find((candidate) => {
    return candidate.name() === token || candidate.aliases().includes(token);
  });
}
function looksLikeOption(token) {
  return token.startsWith("-") && token !== "-";
}
function extractOptionName(token) {
  const separatorIndex = token.indexOf("=");
  return separatorIndex === -1 ? token : token.slice(0, separatorIndex);
}
function extractInlineOptionValue(token) {
  const separatorIndex = token.indexOf("=");
  return separatorIndex === -1 ? void 0 : token.slice(separatorIndex + 1);
}
function replaceOptionName(token, nextName) {
  const inlineValue = extractInlineOptionValue(token);
  return inlineValue === void 0 ? nextName : `${nextName}=${inlineValue}`;
}
function shouldDiscardNextTokenAsUnknownValue(command, positionalCount, nextToken) {
  if (nextToken === void 0 || looksLikeOption(nextToken) || findSubcommand(command, nextToken)) {
    return false;
  }
  return !commandExpectsMoreArguments(command, positionalCount);
}
function commandExpectsMoreArguments(command, positionalCount) {
  const registeredArguments = command.registeredArguments;
  if (registeredArguments.length === 0) {
    return false;
  }
  return registeredArguments.some((argument, index) => {
    return argument.variadic || index >= positionalCount;
  });
}

// src/cli/index.ts
function getCliBanner() {
  return "paqad-ai";
}
async function runCli(argv = process.argv) {
  const program = createProgram();
  const normalized = normalizeCliArgv(program, argv);
  for (const notice of normalized.notices) {
    process.stderr.write(`${notice}
`);
  }
  await program.parseAsync(normalized.argv);
}
function shouldRunFromCommandLine(importMetaUrl, argvEntry) {
  const entrypoint = argvToEntrypoint(argvEntry);
  return entrypoint !== void 0 && importMetaUrl === entrypoint;
}
if (shouldRunFromCommandLine(import.meta.url, process.argv[1])) {
  enableEmbeddingProviderCache();
  await runCli();
}
function argvToEntrypoint(value) {
  if (value === void 0) {
    return void 0;
  }
  try {
    return pathToFileURL4(realpathSync2(value)).href;
  } catch {
    return pathToFileURL4(value).href;
  }
}
export {
  argvToEntrypoint,
  getCliBanner,
  getRuntimeRoot,
  runCli,
  shouldRunFromCommandLine
};
