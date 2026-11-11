import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  isMissingFileError
} from "./chunk-IUKM7KYA.js";
import {
  PATHS
} from "./chunk-IHMBVS6H.js";
import {
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/rag/secrets.ts
init_esm_shims();
import {
  chmodSync,
  closeSync,
  existsSync,
  ftruncateSync,
  mkdirSync,
  openSync,
  readFileSync,
  statSync,
  writeFileSync,
  writeSync
} from "fs";
import { dirname, join } from "path";
function parseEnv(content) {
  const result = {};
  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    const value = line.slice(eq + 1).trim().replace(/^['"]|['"]$/g, "");
    if (key) {
      result[key] = value;
    }
  }
  return result;
}
function serializeEnv(values) {
  const lines = ["# Local project secrets for paqad-ai RAG"];
  for (const key of Object.keys(values).sort()) {
    lines.push(`${key}=${values[key]}`);
  }
  lines.push("");
  return lines.join("\n");
}
function readProjectSecrets(projectRoot) {
  const path = join(projectRoot, PATHS.SECRETS_ENV);
  if (!existsSync(path)) {
    return {};
  }
  try {
    return parseEnv(readFileSync(path, "utf8"));
  } catch {
    return {};
  }
}
function pluginOptionOrEnv(key) {
  return process.env[`CLAUDE_PLUGIN_OPTION_${key}`] || process.env[key] || void 0;
}
function getProjectSecret(projectRoot, key) {
  return pluginOptionOrEnv(key) || readProjectSecrets(projectRoot)[key];
}
function writeProjectSecret(projectRoot, key, value) {
  const path = join(projectRoot, PATHS.SECRETS_ENV);
  const current = readProjectSecrets(projectRoot);
  current[key] = value;
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, serializeEnv(current), "utf8");
  try {
    chmodSync(path, 384);
  } catch {
  }
  return path;
}
function removeProjectSecrets(projectRoot) {
  const path = join(projectRoot, PATHS.SECRETS_ENV);
  let fd;
  try {
    fd = openSync(path, "r+");
  } catch (error) {
    if (isMissingFileError(error)) return;
    throw error;
  }
  try {
    ftruncateSync(fd, 0);
    writeSync(fd, "# Local project secrets for paqad-ai RAG\n", 0, "utf8");
  } finally {
    closeSync(fd);
  }
}
function getSecretPermissionWarning(projectRoot) {
  const path = join(projectRoot, PATHS.SECRETS_ENV);
  if (!existsSync(path)) {
    return null;
  }
  try {
    const mode = statSync(path).mode & 511;
    return mode & 63 ? `Secrets file is too permissive (${mode.toString(8)})` : null;
  } catch {
    return null;
  }
}
function redactSecrets(input, projectRoot) {
  const secrets = [
    process.env.OPENAI_API_KEY,
    process.env.CLAUDE_PLUGIN_OPTION_OPENAI_API_KEY,
    process.env.CLAUDE_PLUGIN_OPTION_COHERE_API_KEY,
    process.env.COHERE_API_KEY,
    ...Object.values(readProjectSecrets(projectRoot))
  ].filter((value) => Boolean(value));
  let result = input;
  for (const secret of secrets) {
    result = result.split(secret).join("[REDACTED]");
  }
  return result;
}

// src/core/errors/redact.ts
init_esm_shims();
function redactPayload(payload, projectRoot) {
  if (!projectRoot) {
    return { redacted: { ...payload }, redacted_fields: [] };
  }
  const redacted = {};
  const redacted_fields = [];
  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === "string") {
      const cleaned = redactSecrets(value, projectRoot);
      redacted[key] = cleaned;
      if (cleaned !== value) {
        redacted_fields.push(key);
      }
    } else {
      redacted[key] = value;
    }
  }
  return { redacted, redacted_fields };
}

// src/core/errors/framework-error.ts
init_esm_shims();
var FrameworkError = class extends Error {
  code;
  details;
  retryable;
  constructor(message, options) {
    super(message, { cause: options.cause });
    this.name = "FrameworkError";
    this.code = options.code;
    this.retryable = options.retryable ?? false;
    if (options.details && options.projectRoot) {
      const { redacted, redacted_fields } = redactPayload(options.details, options.projectRoot);
      this.details = redacted_fields.length > 0 ? { ...redacted, redacted_fields } : redacted;
    } else {
      this.details = options.details;
    }
  }
};

// src/core/errors/cancelled-error.ts
init_esm_shims();
var CancelledError = class extends FrameworkError {
  constructor(message = "Cancelled by consumer", details) {
    super(message, { code: "CANCELLED_BY_CONSUMER", details });
    this.name = "CancelledError";
  }
};
function isCancelledError(error) {
  return error instanceof CancelledError;
}

// src/core/logger-registry.ts
init_esm_shims();
var MAX_PAYLOAD_BYTES = 8192;
var TRUNCATED_SUMMARY_CHARS = 256;
var _logger = null;
var _faultedOnce = false;
function setEngineLogger(logger) {
  _logger = logger;
  _faultedOnce = false;
}
function clearEngineLogger() {
  _logger = null;
  _faultedOnce = false;
}
function getConsumerLogger() {
  return _logger;
}
function clampPayload(payload) {
  if (payload === void 0) {
    return void 0;
  }
  let serialised;
  try {
    serialised = JSON.stringify(payload);
  } catch {
    return { __truncated: true, summary: String(payload).slice(0, TRUNCATED_SUMMARY_CHARS) };
  }
  if (serialised.length <= MAX_PAYLOAD_BYTES) {
    return payload;
  }
  return { __truncated: true, summary: serialised.slice(0, TRUNCATED_SUMMARY_CHARS) };
}
function writeDefault(level, message, payload) {
  if (level !== "warn" && level !== "error") {
    return;
  }
  const suffix = payload === void 0 ? "" : ` ${JSON.stringify(payload)}`;
  process.stderr.write(`paqad [${level}] ${message}${suffix}
`);
}
function markFaulted() {
  if (_faultedOnce) {
    return;
  }
  _faultedOnce = true;
  process.stderr.write("paqad: consumer logger faulted, reverting to stderr default\n");
}
function engineLog(level, message, payload) {
  const safePayload = clampPayload(payload);
  const logger = _logger;
  if (logger === null || _faultedOnce) {
    writeDefault(level, message, safePayload);
    return;
  }
  const entry = {
    level,
    message,
    ...safePayload !== void 0 ? { payload: safePayload } : {}
  };
  try {
    const result = logger.log(entry);
    if (result !== void 0 && typeof result.then === "function") {
      void result.then(void 0, () => {
        markFaulted();
        writeDefault(level, message, safePayload);
      });
    }
  } catch {
    markFaulted();
    writeDefault(level, message, safePayload);
  }
}

// src/core/errors/taxonomy.ts
init_esm_shims();
var ENGINE_ERROR_CODES = {
  MISSING_POLICY_CONTEXT: "MISSING_POLICY_CONTEXT",
  DUPLICATE_SKILL_IDENTIFIER: "DUPLICATE_SKILL_IDENTIFIER",
  DECISION_PACKET_CORRUPT: "DECISION_PACKET_CORRUPT",
  UNSUPPORTED_FILE_TYPE: "UNSUPPORTED_FILE_TYPE",
  VERSION_INCOMPATIBLE: "VERSION_INCOMPATIBLE",
  MANIFEST_PRODUCTION_TIMEOUT: "MANIFEST_PRODUCTION_TIMEOUT",
  WORKFLOW_ALREADY_RUNNING: "WORKFLOW_ALREADY_RUNNING",
  VECTOR_INDEX_STORAGE_ERROR: "VECTOR_INDEX_STORAGE_ERROR",
  CANCELLED_BY_CONSUMER: "CANCELLED_BY_CONSUMER",
  LOGGER_SINK_FAILED: "LOGGER_SINK_FAILED",
  UNKNOWN_ENGINE_ERROR: "UNKNOWN_ENGINE_ERROR"
};
var TAXONOMY = {
  MISSING_POLICY_CONTEXT: {
    code: "MISSING_POLICY_CONTEXT",
    description: "A policy lookup was required but no policy context was available.",
    retryable: false,
    payload_shape: { policy: "string" }
  },
  DUPLICATE_SKILL_IDENTIFIER: {
    code: "DUPLICATE_SKILL_IDENTIFIER",
    description: "A skill was registered under an identifier that is already in use.",
    retryable: false,
    payload_shape: { skill_id: "string" }
  },
  DECISION_PACKET_CORRUPT: {
    code: "DECISION_PACKET_CORRUPT",
    description: "A decision packet on disk could not be parsed or failed validation.",
    retryable: false,
    payload_shape: { decision_id: "string", reason: "string", packet_path: "string?" }
  },
  UNSUPPORTED_FILE_TYPE: {
    code: "UNSUPPORTED_FILE_TYPE",
    description: "A file was supplied whose type the engine does not support.",
    retryable: false,
    payload_shape: { path: "string", extension: "string" }
  },
  VERSION_INCOMPATIBLE: {
    code: "VERSION_INCOMPATIBLE",
    description: "The engine and consumer (or schema) versions are not compatible.",
    retryable: false,
    payload_shape: { found: "string", required: "string", kind: "string" }
  },
  MANIFEST_PRODUCTION_TIMEOUT: {
    code: "MANIFEST_PRODUCTION_TIMEOUT",
    description: "Producing the planning manifest exceeded its configured timeout.",
    retryable: true,
    payload_shape: { timeout_ms: "number" }
  },
  WORKFLOW_ALREADY_RUNNING: {
    code: "WORKFLOW_ALREADY_RUNNING",
    description: "A workflow run was requested while another holds the run lock.",
    retryable: false,
    payload_shape: { workflow: "string", run_id: "string?" }
  },
  VECTOR_INDEX_STORAGE_ERROR: {
    code: "VECTOR_INDEX_STORAGE_ERROR",
    description: "Persisting a vector index to disk failed.",
    retryable: true,
    payload_shape: { index: "string", reason: "string" }
  },
  CANCELLED_BY_CONSUMER: {
    code: "CANCELLED_BY_CONSUMER",
    description: "A long-running call was cancelled by the consumer via an AbortSignal.",
    retryable: false,
    payload_shape: { checkpoint_path: "string?" }
  },
  LOGGER_SINK_FAILED: {
    code: "LOGGER_SINK_FAILED",
    description: "A log sink failed to accept a log entry.",
    retryable: true,
    payload_shape: { sink: "string", reason: "string" }
  },
  UNKNOWN_ENGINE_ERROR: {
    code: "UNKNOWN_ENGINE_ERROR",
    description: "An undocumented failure the taxonomy does not yet name.",
    retryable: false,
    payload_shape: { message: "string?" }
  }
};
function listErrorTaxonomy() {
  return Object.values(TAXONOMY);
}
function getTaxonomyEntry(code) {
  return TAXONOMY[code];
}

// src/core/errors/engine-errors.ts
init_esm_shims();
var MissingPolicyContextError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.MISSING_POLICY_CONTEXT,
      details,
      retryable: false,
      projectRoot
    });
    this.name = "MissingPolicyContextError";
  }
};
var DuplicateSkillIdentifierError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.DUPLICATE_SKILL_IDENTIFIER,
      details,
      retryable: false,
      projectRoot
    });
    this.name = "DuplicateSkillIdentifierError";
  }
};
var DecisionPacketCorruptError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.DECISION_PACKET_CORRUPT,
      details,
      retryable: false,
      projectRoot
    });
    this.name = "DecisionPacketCorruptError";
  }
};
var UnsupportedFileTypeError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.UNSUPPORTED_FILE_TYPE,
      details,
      retryable: false,
      projectRoot
    });
    this.name = "UnsupportedFileTypeError";
  }
};
var VersionIncompatibleError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.VERSION_INCOMPATIBLE,
      details,
      retryable: false,
      projectRoot
    });
    this.name = "VersionIncompatibleError";
  }
};
var ManifestProductionTimeoutError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.MANIFEST_PRODUCTION_TIMEOUT,
      details,
      retryable: true,
      projectRoot
    });
    this.name = "ManifestProductionTimeoutError";
  }
};
var WorkflowAlreadyRunningError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.WORKFLOW_ALREADY_RUNNING,
      details,
      retryable: false,
      projectRoot
    });
    this.name = "WorkflowAlreadyRunningError";
  }
};
var VectorIndexStorageError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.VECTOR_INDEX_STORAGE_ERROR,
      details,
      retryable: true,
      projectRoot
    });
    this.name = "VectorIndexStorageError";
  }
};
var LoggerSinkFailedError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.LOGGER_SINK_FAILED,
      details,
      retryable: true,
      projectRoot
    });
    this.name = "LoggerSinkFailedError";
  }
};
var UnknownEngineError = class extends FrameworkError {
  constructor(message, details, projectRoot) {
    super(message, {
      code: ENGINE_ERROR_CODES.UNKNOWN_ENGINE_ERROR,
      details,
      retryable: false,
      projectRoot
    });
    this.name = "UnknownEngineError";
  }
};
function toEngineError(error) {
  if (error instanceof FrameworkError) {
    if (getTaxonomyEntry(error.code)) {
      return error;
    }
    engineLog("error", "Engine error code is not in the taxonomy; surfacing UNKNOWN_ENGINE_ERROR", {
      missing_code: error.code
    });
    return new UnknownEngineError(error.message, { message: error.message }, void 0);
  }
  const message = error instanceof Error ? error.message : String(error);
  return new UnknownEngineError(message, { message });
}
function isEngineErrorCode(code) {
  return getTaxonomyEntry(code) !== void 0;
}

// src/core/errors/resolution-error.ts
init_esm_shims();
var ResolutionError = class extends FrameworkError {
  constructor(message, details) {
    super(message, {
      code: "RESOLUTION_ERROR",
      details
    });
    this.name = "ResolutionError";
  }
};

// src/core/errors/schema-version-error.ts
init_esm_shims();
var SCHEMA_VERSION_UPDATE_HINT = "This project was set up by a newer paqad. Update paqad to open it: inside Claude Code run `claude plugin update paqad@eliyce`, otherwise `npm i -g paqad-ai@latest`.";
var SchemaVersionError = class extends FrameworkError {
  constructor(message, options = {}) {
    super(message, {
      code: options.code ?? "SCHEMA_VERSION_INCOMPATIBLE",
      cause: options.cause,
      details: options.details
    });
    this.name = "SchemaVersionError";
  }
};

// src/core/errors/skill-registration-error.ts
init_esm_shims();
var CODE_BY_KIND = {
  malformed: "SKILL_MALFORMED",
  duplicate: "SKILL_DUPLICATE",
  "not-found": "SKILL_NOT_FOUND",
  "built-in-protected": "SKILL_BUILTIN_PROTECTED"
};
var SkillRegistrationError = class extends FrameworkError {
  kind;
  builtInId;
  runtimeId;
  constructor(message, options) {
    super(message, {
      code: CODE_BY_KIND[options.kind],
      cause: options.cause,
      details: { kind: options.kind, builtInId: options.builtInId, runtimeId: options.runtimeId }
    });
    this.name = "SkillRegistrationError";
    this.kind = options.kind;
    this.builtInId = options.builtInId;
    this.runtimeId = options.runtimeId;
  }
};

// src/core/errors/validation-error.ts
init_esm_shims();
var ValidationError = class extends FrameworkError {
  subCode;
  constructor(message, details, subCode) {
    super(message, {
      code: "VALIDATION_ERROR",
      details
    });
    this.name = "ValidationError";
    this.subCode = subCode;
  }
};

// src/core/errors/index.ts
init_esm_shims();

export {
  readProjectSecrets,
  pluginOptionOrEnv,
  getProjectSecret,
  writeProjectSecret,
  removeProjectSecrets,
  getSecretPermissionWarning,
  redactSecrets,
  redactPayload,
  FrameworkError,
  CancelledError,
  isCancelledError,
  setEngineLogger,
  clearEngineLogger,
  getConsumerLogger,
  engineLog,
  ENGINE_ERROR_CODES,
  listErrorTaxonomy,
  getTaxonomyEntry,
  MissingPolicyContextError,
  DuplicateSkillIdentifierError,
  DecisionPacketCorruptError,
  UnsupportedFileTypeError,
  VersionIncompatibleError,
  ManifestProductionTimeoutError,
  WorkflowAlreadyRunningError,
  VectorIndexStorageError,
  LoggerSinkFailedError,
  UnknownEngineError,
  toEngineError,
  isEngineErrorCode,
  ResolutionError,
  SCHEMA_VERSION_UPDATE_HINT,
  SchemaVersionError,
  SkillRegistrationError,
  ValidationError
};
