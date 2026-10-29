import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  loadOptionalPackage
} from "./chunk-Y7QRVDRT.js";
import {
  CancelledError,
  atomicWriteFile,
  getPacksForFrameworks,
  isCancelledError
} from "./chunk-OHAI622W.js";
import {
  Bm25Index,
  FrameworkError,
  engineLog,
  getProjectSecret,
  pluginOptionOrEnv,
  readProjectProfile,
  redactSecrets,
  writeProjectProfile,
  writeProjectSecret
} from "./chunk-U7W2Y6WH.js";
import {
  allocateChatOrdinal,
  currentChatOrdinal,
  mirrorRagRow
} from "./chunk-GUPY77J4.js";
import {
  appendRunCancelledEvent,
  readRawModuleMap
} from "./chunk-ARGC3ANJ.js";
import {
  require_out
} from "./chunk-DNG6DDRS.js";
import {
  toPosixPath
} from "./chunk-4K4CM3QN.js";
import {
  getDefaultEmbeddingModel,
  layeredConfigMap,
  normalizeIntelligenceConfig,
  require_dist,
  setConfigValue,
  syncFrameworkConfig
} from "./chunk-VD7SJHT4.js";
import {
  readGitState
} from "./chunk-AINYJ3Q2.js";
import {
  require_ajv
} from "./chunk-WGEG5J6L.js";
import {
  stampSessionRow
} from "./chunk-QINSFA6R.js";
import {
  resolveSessionId
} from "./chunk-HV6ESCNW.js";
import {
  slugifyAscii
} from "./chunk-DDJC5PRW.js";
import {
  PATHS
} from "./chunk-LW3OCT4Y.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/rag/service.ts
init_esm_shims();
import { createHash as createHash6, randomUUID } from "crypto";
import { existsSync as existsSync6, statSync } from "fs";
import { mkdir as mkdir4, readdir, rename as rename2, rm as rm3 } from "fs/promises";
import { extname, join as join11, resolve, sep as sep2 } from "path";

// src/context/ast-chunker.ts
init_esm_shims();
import { createHash } from "crypto";
var CHUNKER_VERSION = "cast-blurb-v1";
var AstChunker = class {
  constructor(maxChunkChars = 2e3, merge = true) {
    this.maxChunkChars = maxChunkChars;
    this.merge = merge;
  }
  maxChunkChars;
  merge;
  chunk(filePath, content) {
    const raw = this.chunkRaw(filePath, content);
    return this.merge ? castMerge(raw, this.maxChunkChars) : raw;
  }
  chunkRaw(filePath, content) {
    const lang = this.detectLanguage(filePath);
    try {
      switch (lang) {
        case "typescript":
          return this.parseTypeScript(filePath, content);
        case "php":
          return this.parsePhp(filePath, content);
        case "dart":
          return this.parseDart(filePath, content);
        default:
          return this.fallbackSplit(filePath, content);
      }
    } catch {
      return this.fallbackSplit(filePath, content);
    }
  }
  detectLanguage(filePath) {
    if (filePath.endsWith(".ts") || filePath.endsWith(".tsx") || filePath.endsWith(".js") || filePath.endsWith(".jsx")) {
      return "typescript";
    }
    if (filePath.endsWith(".php")) return "php";
    if (filePath.endsWith(".dart")) return "dart";
    return "unknown";
  }
  parseTypeScript(filePath, content) {
    const chunks = [];
    const blockPattern = /^(export\s+)?((?:async\s+)?function[\s*]+\w+|class\s+\w+|const\s+\w+\s*=\s*(?:async\s+)?\(|export\s+(?:default\s+)?(?:async\s+)?function|export\s+class\s+\w+)/gm;
    const boundaries = [];
    let match2;
    while ((match2 = blockPattern.exec(content)) !== null) {
      boundaries.push(match2.index);
    }
    boundaries.push(content.length);
    for (let i = 0; i < boundaries.length - 1; i++) {
      const start = boundaries[i];
      const end = boundaries[i + 1];
      const segment = content.slice(start, end);
      if (segment.trim().length === 0) continue;
      const nonWhitespaceCount = segment.replace(/\s/g, "").length;
      if (nonWhitespaceCount > this.maxChunkChars) {
        const subChunks = this.splitLargeSegment(filePath, segment);
        chunks.push(...subChunks);
      } else {
        const nameMatch = /(?:function|class|const)\s+(\w+)/.exec(segment);
        chunks.push(this.makeChunk(filePath, segment, "function", nameMatch?.[1] ?? `block_${i}`));
      }
    }
    if (chunks.length === 0) return this.fallbackSplit(filePath, content);
    return chunks;
  }
  parsePhp(filePath, content) {
    const chunks = [];
    const pattern = /^\s*(?:(?:public|protected|private|static|abstract|final)\s+)?(?:function|class|interface|trait)\s+\w+/gm;
    const boundaries = [];
    let match2;
    while ((match2 = pattern.exec(content)) !== null) {
      boundaries.push(match2.index);
    }
    boundaries.push(content.length);
    for (let i = 0; i < boundaries.length - 1; i++) {
      const segment = content.slice(boundaries[i], boundaries[i + 1]);
      if (segment.trim().length === 0) continue;
      const nameMatch = /(?:function|class|interface|trait)\s+(\w+)/.exec(segment);
      chunks.push(this.makeChunk(filePath, segment, "function", nameMatch?.[1] ?? `block_${i}`));
    }
    if (chunks.length === 0) return this.fallbackSplit(filePath, content);
    return chunks;
  }
  parseDart(filePath, content) {
    const chunks = [];
    const pattern = /^(\s*(?:abstract\s+)?class\s+\w+|^\s*\w[\w<>?]*\s+\w+\s*\()/gm;
    const boundaries = [];
    let match2;
    while ((match2 = pattern.exec(content)) !== null) {
      boundaries.push(match2.index);
    }
    boundaries.push(content.length);
    for (let i = 0; i < boundaries.length - 1; i++) {
      const segment = content.slice(boundaries[i], boundaries[i + 1]);
      if (segment.trim().length === 0) continue;
      const nameMatch = /(?:class|\w+)\s+(\w+)/.exec(segment);
      chunks.push(this.makeChunk(filePath, segment, "class", nameMatch?.[1] ?? `block_${i}`));
    }
    if (chunks.length === 0) return this.fallbackSplit(filePath, content);
    return chunks;
  }
  splitLargeSegment(filePath, segment) {
    const methodPattern = /(?:async\s+)?(?:public|private|protected|static)?\s*(?:async\s+)?\w+\s*\([^)]*\)\s*(?::\s*\w+)?\s*\{/g;
    const boundaries = [0];
    let match2;
    while ((match2 = methodPattern.exec(segment)) !== null) {
      if (match2.index > 0) boundaries.push(match2.index);
    }
    boundaries.push(segment.length);
    const chunks = [];
    for (let i = 0; i < boundaries.length - 1; i++) {
      const sub = segment.slice(boundaries[i], boundaries[i + 1]);
      if (sub.trim().length > 0) {
        chunks.push(this.makeChunk(filePath, sub, "method", `method_${i}`));
      }
    }
    return chunks.length > 0 ? chunks : this.fallbackSplit(filePath, segment);
  }
  fallbackSplit(filePath, content) {
    const paragraphs = content.split(/\n\s*\n/);
    const chunks = [];
    let buffer = "";
    for (const para of paragraphs) {
      const combined = buffer ? buffer + "\n\n" + para : para;
      const nonWS = combined.replace(/\s/g, "").length;
      if (nonWS > this.maxChunkChars && buffer) {
        chunks.push(this.makeChunk(filePath, buffer, "fallback", `para_${chunks.length}`));
        buffer = para;
      } else {
        buffer = combined;
      }
    }
    if (buffer.trim()) {
      chunks.push(this.makeChunk(filePath, buffer, "fallback", `para_${chunks.length}`));
    }
    return chunks.length > 0 ? chunks : [this.makeChunk(filePath, content, "fallback", "full")];
  }
  makeChunk(filePath, content, nodeType, name) {
    const nonWS = content.replace(/\s/g, "");
    return {
      id: createHash("sha256").update(`${filePath}:${name}:${content}`).digest("hex"),
      source_file: filePath,
      ast_node_type: nodeType,
      ast_node_path: name,
      exported_symbols: this.extractExportedSymbols(content),
      content: content.trim(),
      char_count: nonWS.length,
      content_hash: createHash("sha256").update(content).digest("hex")
    };
  }
  extractExportedSymbols(content) {
    const symbols = [];
    const pattern = /export\s+(?:default\s+)?(?:function|class|const|interface|type|enum)\s+(\w+)/g;
    let match2;
    while ((match2 = pattern.exec(content)) !== null) {
      symbols.push(match2[1]);
    }
    return symbols;
  }
};
function castMerge(chunks, targetChars) {
  const result = [];
  let buffer = [];
  let bufferChars = 0;
  const flush = () => {
    if (buffer.length === 0) {
      return;
    }
    result.push(buffer.length === 1 ? buffer[0] : mergeChunks(buffer));
    buffer = [];
    bufferChars = 0;
  };
  for (const chunk of chunks) {
    const breaksRun = buffer.length > 0 && (chunk.source_file !== buffer[0].source_file || bufferChars + chunk.char_count > targetChars);
    if (breaksRun) {
      flush();
    }
    buffer.push(chunk);
    bufferChars += chunk.char_count;
  }
  flush();
  return result;
}
function mergeChunks(chunks) {
  const source_file = chunks[0].source_file;
  const content = chunks.map((c) => c.content).join("\n\n");
  const ast_node_path = chunks.map((c) => c.ast_node_path).join("+");
  const exported_symbols = [...new Set(chunks.flatMap((c) => c.exported_symbols))];
  const char_count = chunks.reduce((sum, c) => sum + c.char_count, 0);
  const modified_at_ms = chunks.reduce(
    (max, c) => c.modified_at_ms === void 0 ? max : Math.max(max ?? 0, c.modified_at_ms),
    void 0
  );
  return {
    id: createHash("sha256").update(`${source_file}:${ast_node_path}:${content}`).digest("hex"),
    source_file,
    ast_node_type: chunks[0].ast_node_type,
    ast_node_path,
    exported_symbols,
    content,
    char_count,
    content_hash: createHash("sha256").update(content).digest("hex"),
    ...modified_at_ms === void 0 ? {} : { modified_at_ms }
  };
}

// src/rag/contextual-blurb.ts
init_esm_shims();
function buildContextualBlurb(chunk, ctx = {}) {
  const parts = [chunk.source_file];
  const signature = chunk.ast_node_path?.trim();
  if (signature && signature !== "full") {
    parts.push(`\u203A ${signature}`);
  }
  if (chunk.exported_symbols && chunk.exported_symbols.length > 0) {
    parts.push(`exports ${chunk.exported_symbols.join(", ")}`);
  }
  if (ctx.moduleRole) {
    parts.push(`module: ${ctx.moduleRole}`);
  }
  return `[${parts.join(" \xB7 ")}]`;
}
function contextualizeChunkText(chunk, ctx = {}) {
  return `${buildContextualBlurb(chunk, ctx)}
${chunk.content}`;
}
function buildModuleRoleResolver(projectRoot) {
  let map;
  try {
    map = readRawModuleMap(projectRoot);
  } catch {
    return () => void 0;
  }
  if (!map) {
    return () => void 0;
  }
  const entries = [];
  for (const mod of map.modules) {
    if (!mod.name) {
      continue;
    }
    for (const source of mod.sources) {
      const prefix = source.replace(/\\/g, "/").replace(/[*?[].*$/, "").replace(/\/+$/, "");
      if (prefix) {
        entries.push({ prefix, name: mod.name });
      }
    }
  }
  entries.sort((a, b) => b.prefix.length - a.prefix.length);
  return (file) => {
    const normalized = file.replace(/\\/g, "/").replace(/^\.\//, "");
    const match2 = entries.find(
      (entry) => normalized === entry.prefix || normalized.startsWith(`${entry.prefix}/`)
    );
    return match2?.name;
  };
}

// src/context/chunk-index.ts
init_esm_shims();
import { readFile, writeFile, mkdir, stat } from "fs/promises";
import { join, dirname } from "path";
import { createHash as createHash2 } from "crypto";
var ChunkIndexManager = class {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
  }
  projectRoot;
  get indexPath() {
    return join(this.projectRoot, ".paqad", "context", "chunk-index.json");
  }
  async load() {
    try {
      const raw = await readFile(this.indexPath, "utf8");
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  async save(index) {
    await mkdir(dirname(this.indexPath), { recursive: true });
    await writeFile(this.indexPath, JSON.stringify(index, null, 2), "utf8");
  }
  async rebuild(files, chunker) {
    const entries = [];
    for (const filePath of files) {
      try {
        const content = await readFile(filePath, "utf8");
        const fileHash = this.computeFileHash(content);
        const fileStat = await stat(filePath);
        const chunks = chunker.chunk(filePath, content);
        entries.push({
          source_file: filePath,
          source_file_hash: fileHash,
          modified_at: fileStat.mtime.toISOString(),
          chunks
        });
      } catch {
      }
    }
    const index = {
      version: 1,
      generated_at: (/* @__PURE__ */ new Date()).toISOString(),
      entries
    };
    await this.save(index);
    return index;
  }
  async incrementalUpdate(changedFiles, index, chunker) {
    const changedSet = new Set(changedFiles);
    const updatedEntries = index.entries.filter((e) => !changedSet.has(e.source_file));
    for (const filePath of changedFiles) {
      try {
        const content = await readFile(filePath, "utf8");
        const fileHash = this.computeFileHash(content);
        const fileStat = await stat(filePath);
        const chunks = chunker.chunk(filePath, content);
        updatedEntries.push({
          source_file: filePath,
          source_file_hash: fileHash,
          modified_at: fileStat.mtime.toISOString(),
          chunks
        });
      } catch {
      }
    }
    const updated = {
      ...index,
      generated_at: (/* @__PURE__ */ new Date()).toISOString(),
      entries: updatedEntries
    };
    await this.save(updated);
    return updated;
  }
  async isStale(index) {
    const changedFiles = [];
    for (const entry of index.entries) {
      try {
        const content = await readFile(entry.source_file, "utf8");
        const currentHash = this.computeFileHash(content);
        if (currentHash !== entry.source_file_hash) {
          changedFiles.push(entry.source_file);
        }
      } catch {
        changedFiles.push(entry.source_file);
      }
    }
    return { stale: changedFiles.length > 0, changedFiles };
  }
  async sync(files, chunker) {
    const normalizedFiles = [...new Set(files)].sort();
    const index = await this.load();
    if (!index) {
      return {
        index: await this.rebuild(normalizedFiles, chunker),
        changed_files: [],
        added_files: [...normalizedFiles],
        deleted_files: [],
        updated: true
      };
    }
    const fileSet = new Set(normalizedFiles);
    const indexedFiles = new Set(index.entries.map((entry) => entry.source_file));
    const addedFiles = normalizedFiles.filter((filePath) => !indexedFiles.has(filePath));
    const deletedFiles = index.entries.map((entry) => entry.source_file).filter((filePath) => !fileSet.has(filePath));
    const changedFiles = [];
    for (const entry of index.entries) {
      if (!fileSet.has(entry.source_file)) {
        continue;
      }
      try {
        const content = await readFile(entry.source_file, "utf8");
        const currentHash = this.computeFileHash(content);
        if (currentHash !== entry.source_file_hash) {
          changedFiles.push(entry.source_file);
        }
      } catch {
        deletedFiles.push(entry.source_file);
      }
    }
    const changedSet = /* @__PURE__ */ new Set([...addedFiles, ...changedFiles]);
    const deletedSet = new Set(deletedFiles);
    if (changedSet.size === 0 && deletedSet.size === 0) {
      return {
        index,
        changed_files: changedFiles,
        added_files: addedFiles,
        deleted_files: deletedFiles,
        updated: false
      };
    }
    const updatedEntries = index.entries.filter(
      (entry) => !changedSet.has(entry.source_file) && !deletedSet.has(entry.source_file)
    );
    for (const filePath of changedSet) {
      try {
        const content = await readFile(filePath, "utf8");
        const fileHash = this.computeFileHash(content);
        const fileStat = await stat(filePath);
        const chunks = chunker.chunk(filePath, content);
        updatedEntries.push({
          source_file: filePath,
          source_file_hash: fileHash,
          modified_at: fileStat.mtime.toISOString(),
          chunks
        });
      } catch {
      }
    }
    const updated = {
      ...index,
      generated_at: (/* @__PURE__ */ new Date()).toISOString(),
      entries: updatedEntries.sort(
        (left, right) => left.source_file.localeCompare(right.source_file)
      )
    };
    await this.save(updated);
    return {
      index: updated,
      changed_files: changedFiles,
      added_files: addedFiles,
      deleted_files: deletedFiles,
      updated: true
    };
  }
  computeFileHash(content) {
    return createHash2("sha256").update(content).digest("hex");
  }
};

// src/context/reranker.ts
init_esm_shims();
var PassthroughReranker = class {
  backend = "passthrough";
  model = "none";
  async rerank(_query, chunks, candidatePoolSize = 50) {
    const pool = chunks.slice(0, candidatePoolSize);
    const ids = pool.map((c) => c.id);
    return {
      chunks: pool,
      pre_rerank_ids: ids,
      post_rerank_ids: ids,
      latency_ms: 0
    };
  }
};
var LocalReranker = class {
  backend = "local";
  model;
  pipelinePromise;
  constructor(model = "Xenova/ms-marco-MiniLM-L-6-v2") {
    this.model = model;
  }
  getPipeline() {
    if (!this.pipelinePromise) {
      this.pipelinePromise = this.loadPipeline();
    }
    return this.pipelinePromise;
  }
  async loadPipeline() {
    const { pipeline } = await loadOptionalPackage("@huggingface/transformers");
    return pipeline("text-classification", this.model, { dtype: "q8" });
  }
  async rerank(query, chunks, candidatePoolSize = 50) {
    const pool = chunks.slice(0, candidatePoolSize);
    const preIds = pool.map((c) => c.id);
    const start = Date.now();
    const classifier = await this.getPipeline();
    const scored = await Promise.all(
      pool.map(async (chunk) => {
        const result = await classifier({ text: query, text_pair: chunk.content });
        const item = Array.isArray(result) ? result[0] : result;
        return { chunk, score: item?.score ?? 0 };
      })
    );
    scored.sort((a, b) => b.score - a.score);
    const reranked = scored.map((s) => s.chunk);
    return {
      chunks: reranked,
      pre_rerank_ids: preIds,
      post_rerank_ids: reranked.map((c) => c.id),
      latency_ms: Date.now() - start
    };
  }
};
var CohereReranker = class {
  backend = "cohere";
  model;
  apiKey;
  constructor(model = "rerank-english-v3.0", apiKey = "") {
    this.model = model;
    this.apiKey = apiKey;
  }
  async rerank(query, chunks, candidatePoolSize = 50) {
    const pool = chunks.slice(0, candidatePoolSize);
    const preIds = pool.map((c) => c.id);
    const start = Date.now();
    const response = await fetch("https://api.cohere.com/v1/rerank", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: this.model,
        query,
        documents: pool.map((c) => c.content)
      })
    });
    if (!response.ok) {
      throw new Error(`Cohere rerank failed: ${response.status} ${await response.text()}`);
    }
    const data = await response.json();
    const reranked = data.results.map((r) => pool[r.index]);
    return {
      chunks: reranked,
      pre_rerank_ids: preIds,
      post_rerank_ids: reranked.map((c) => c.id),
      latency_ms: Date.now() - start
    };
  }
};
function createReranker(config) {
  if (!config?.enabled) {
    return new PassthroughReranker();
  }
  switch (config.backend) {
    case "local":
      return new LocalReranker(config.model);
    case "cohere":
      return new CohereReranker(
        config.model,
        pluginOptionOrEnv("COHERE_API_KEY") || config.api_key || ""
      );
    default:
      return new PassthroughReranker();
  }
}

// src/patterns/pattern-rag.ts
init_esm_shims();
import { createHash as createHash4 } from "crypto";
import { homedir as homedir3 } from "os";

// src/core/math/cosine.ts
init_esm_shims();
function cosineSimilarity(left, right) {
  if (left.length !== right.length || left.length === 0) {
    return 0;
  }
  let dot = 0;
  let leftNorm = 0;
  let rightNorm = 0;
  for (let index = 0; index < left.length; index++) {
    dot += left[index] * right[index];
    leftNorm += left[index] * left[index];
    rightNorm += right[index] * right[index];
  }
  if (leftNorm === 0 || rightNorm === 0) {
    return 0;
  }
  return dot / (Math.sqrt(leftNorm) * Math.sqrt(rightNorm));
}

// src/rag/providers.ts
init_esm_shims();
import { existsSync as existsSync2 } from "fs";
import { rm } from "fs/promises";
import { homedir } from "os";
import { join as join3 } from "path";

// src/rag/removed-provider.ts
init_esm_shims();
var import_yaml = __toESM(require_dist(), 1);
import { existsSync, readFileSync } from "fs";
import { join as join2 } from "path";
var REMOVED_EMBEDDING_PROVIDERS = ["voyageai"];
var REMOVED_EMBEDDING_PROVIDER_MESSAGE = "The Voyage embedding provider was removed from paqad-ai. Choose local or openai instead: set rag_embedding_provider (or PAQAD_RAG_EMBEDDING_PROVIDER) to local or openai, or run `paqad-ai rag init --provider local`.";
var RemovedEmbeddingProviderError = class extends Error {
  constructor(provider) {
    super(REMOVED_EMBEDDING_PROVIDER_MESSAGE);
    this.provider = provider;
    this.name = "RemovedEmbeddingProviderError";
  }
  provider;
};
function findRemovedEmbeddingProvider(value) {
  if (typeof value !== "string") {
    return void 0;
  }
  const normalized = value.trim().toLowerCase();
  return REMOVED_EMBEDDING_PROVIDERS.find((name) => name === normalized);
}
function profileEmbeddingProvider(projectRoot) {
  const path2 = join2(projectRoot, PATHS.PROJECT_PROFILE);
  if (!existsSync(path2)) {
    return void 0;
  }
  try {
    const parsed = import_yaml.default.parse(readFileSync(path2, "utf8"));
    return parsed?.intelligence?.embedding_provider;
  } catch {
    return void 0;
  }
}
function resolveRemovedEmbeddingProvider(projectRoot, env = process.env) {
  const configured = layeredConfigMap(projectRoot, env).get("rag_embedding_provider")?.trim();
  return findRemovedEmbeddingProvider(
    configured ? configured : profileEmbeddingProvider(projectRoot)
  );
}
function assertEmbeddingProviderAvailable(projectRoot, explicit, env = process.env) {
  const removed = explicit !== void 0 && explicit.trim() !== "" ? findRemovedEmbeddingProvider(explicit) : resolveRemovedEmbeddingProvider(projectRoot, env);
  if (removed) {
    throw new RemovedEmbeddingProviderError(removed);
  }
}

// src/rag/types.ts
init_esm_shims();
var EmbeddingProviderError = class extends Error {
  constructor(provider, code, message, cause) {
    super(message);
    this.provider = provider;
    this.code = code;
    this.cause = cause;
    this.name = "EmbeddingProviderError";
  }
  provider;
  code;
  cause;
};
function isEmbeddingProviderError(error) {
  return error instanceof EmbeddingProviderError;
}
var SUPPORTED_EXTRACTION_KINDS = [
  "ocr",
  "caption"
];
var SUPPORTED_VISION_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".tiff",
  ".bmp",
  ".avif",
  ".heic"
];
var RagIngestError = class extends FrameworkError {
  constructor(code, message, details) {
    super(message, { code, details });
    this.name = "RagIngestError";
  }
};
function isRagIngestError(error) {
  return error instanceof RagIngestError;
}
function toCrsCollectionId(id) {
  if (id.trim().length === 0) {
    throw new Error("CRS collection id must be a non-empty string");
  }
  return id;
}
var EmbeddingBacklogOverflow = class extends Error {
  constructor(dropped_count, message) {
    super(message ?? `Embedding backlog overflow: dropped ${dropped_count} pending chunk(s)`);
    this.dropped_count = dropped_count;
    this.name = "EmbeddingBacklogOverflow";
  }
  dropped_count;
};
function isEmbeddingBacklogOverflow(error) {
  return error instanceof EmbeddingBacklogOverflow;
}

// src/rag/providers.ts
var REMOTE_RETRY_DELAYS_MS = [250, 500, 1e3];
var LOCAL_EMBEDDING_DTYPE = "q8";
function localModelsRoot() {
  return join3(homedir(), ".paqad", "models");
}
function localModelDir(model) {
  return join3(localModelsRoot(), model);
}
function providerError(provider, code, message, cause) {
  return new EmbeddingProviderError(provider, code, message, cause);
}
function classifyRemoteError(provider, error) {
  if (error instanceof EmbeddingProviderError) {
    return error;
  }
  const status = typeof error === "object" && error !== null && "status" in error ? Number(error.status) : typeof error === "object" && error !== null && "response" in error && typeof error.response?.status === "number" ? Number(error.response?.status) : void 0;
  const message = error instanceof Error ? error.message : String(error);
  if (status === 401 || status === 403) {
    return providerError(provider, "invalid_api_key", "Invalid OPENAI_API_KEY", error);
  }
  if (status === 429 || /rate.?limit/i.test(message)) {
    return providerError(
      provider,
      "rate_limited",
      `${provider} embedding rate limit reached`,
      error
    );
  }
  return providerError(provider, "provider_error", message, error);
}
function sleep(ms) {
  return new Promise((resolve2) => setTimeout(resolve2, ms));
}
async function withRemoteRetry(provider, operation, onProgress) {
  for (let attempt = 0; attempt <= REMOTE_RETRY_DELAYS_MS.length; attempt++) {
    try {
      return await operation();
    } catch (error) {
      const classified = classifyRemoteError(provider, error);
      if (classified.code !== "rate_limited" || attempt === REMOTE_RETRY_DELAYS_MS.length) {
        throw classified;
      }
      const delayMs = REMOTE_RETRY_DELAYS_MS[attempt];
      onProgress?.({
        phase: "build",
        message: `${classified.message}; retrying in ${delayMs}ms`
      });
      await sleep(delayMs);
    }
  }
  throw providerError(provider, "provider_error", `Unexpected ${provider} retry failure`);
}
var LocalEmbeddingProvider = class {
  constructor(intelligence, onProgress, onLoadFailed) {
    this.onProgress = onProgress;
    this.onLoadFailed = onLoadFailed;
    this.model = intelligence.embedding_model ?? getDefaultEmbeddingModel("local");
  }
  onProgress;
  onLoadFailed;
  name = "local";
  model;
  extractorPromise;
  async validate() {
    await this.getExtractor();
  }
  async embed(input) {
    const extractor = await this.getExtractor();
    const batch = Array.isArray(input) ? input : [input];
    const output = await extractor(batch, { pooling: "mean", normalize: true });
    const rawValues = typeof output === "object" && output !== null && "tolist" in output && typeof output.tolist === "function" ? output.tolist() : output;
    return Array.isArray(rawValues[0]) ? rawValues : [rawValues];
  }
  async getExtractor() {
    if (!this.extractorPromise) {
      const loading = this.loadExtractor();
      this.extractorPromise = loading;
      loading.catch(() => {
        if (this.extractorPromise === loading) this.extractorPromise = void 0;
        this.onLoadFailed?.();
      });
    }
    return this.extractorPromise;
  }
  async loadExtractor() {
    const modelPath = localModelDir(this.model);
    const cached = existsSync2(modelPath);
    this.onProgress?.({
      phase: "load",
      message: cached ? `Loading cached local embedding model ${this.model}` : `Preparing local embedding model ${this.model}. This shared download only happens once.`
    });
    try {
      const { pipeline, env } = await loadOptionalPackage("@huggingface/transformers");
      const modelsDir = toPosixPath(localModelsRoot());
      env.cacheDir = modelsDir;
      env.localModelPath = modelsDir;
      env.allowLocalModels = true;
      env.allowRemoteModels = !cached;
      return pipeline("feature-extraction", this.model, {
        dtype: LOCAL_EMBEDDING_DTYPE,
        progress_callback: (progress) => {
          const loaded = progress.loaded ?? 0;
          const total = progress.total ?? 0;
          const percent = total > 0 ? Math.round(loaded / total * 100) : void 0;
          this.onProgress?.({
            phase: "download",
            message: progress.status ?? `Downloading local model ${this.model}. This shared download only happens once.`,
            loaded,
            total,
            percent
          });
        }
      });
    } catch (error) {
      await rm(modelPath, { recursive: true, force: true }).catch(() => void 0);
      throw providerError(
        "local",
        "download_failed",
        `Failed to load local model ${this.model}`,
        error
      );
    }
  }
};
var OpenAiEmbeddingProvider = class {
  constructor(projectRoot, intelligence, onProgress) {
    this.projectRoot = projectRoot;
    this.onProgress = onProgress;
    this.model = intelligence.embedding_model ?? getDefaultEmbeddingModel("openai");
  }
  projectRoot;
  onProgress;
  name = "openai";
  model;
  clientPromise;
  async validate() {
    await this.embed("validation");
  }
  async embed(input) {
    const client = await this.getClient();
    const response = await withRemoteRetry(
      "openai",
      () => client.embeddings.create({
        model: this.model,
        input
      }),
      this.onProgress
    );
    return response.data.map((entry) => entry.embedding);
  }
  async getClient() {
    if (!this.clientPromise) {
      this.clientPromise = this.createClient();
    }
    return this.clientPromise;
  }
  async createClient() {
    const apiKey = getProjectSecret(this.projectRoot, "OPENAI_API_KEY");
    if (!apiKey) {
      throw providerError("openai", "missing_api_key", "Missing OPENAI_API_KEY");
    }
    const { OpenAI } = await loadOptionalPackage("openai");
    return new OpenAI({ apiKey });
  }
};
var localProviderCache = /* @__PURE__ */ new Map();
var providerCacheEnabled = false;
function enableEmbeddingProviderCache() {
  providerCacheEnabled = true;
}
function resetEmbeddingProviderCache() {
  localProviderCache.clear();
  providerCacheEnabled = false;
}
function localProviderKey(intelligence) {
  const model = intelligence.embedding_model ?? getDefaultEmbeddingModel("local");
  return ["local", model, LOCAL_EMBEDDING_DTYPE, localModelsRoot()].join("|");
}
function cachedLocalProvider(intelligence) {
  const key = localProviderKey(intelligence);
  const cached = localProviderCache.get(key);
  if (cached) {
    return cached;
  }
  const provider = new LocalEmbeddingProvider(
    intelligence,
    void 0,
    () => {
      if (localProviderCache.get(key) === provider) localProviderCache.delete(key);
    }
  );
  localProviderCache.set(key, provider);
  return provider;
}
async function createEmbeddingProvider(projectRoot, intelligence, onProgress) {
  assertEmbeddingProviderAvailable(projectRoot, intelligence.embedding_provider);
  switch (intelligence.embedding_provider) {
    case "openai":
      return new OpenAiEmbeddingProvider(projectRoot, intelligence, onProgress);
    case "local":
    default:
      if (providerCacheEnabled && onProgress === void 0) {
        return cachedLocalProvider(intelligence);
      }
      return new LocalEmbeddingProvider(intelligence, onProgress);
  }
}

// src/rag/vector-index.ts
init_esm_shims();
import { mkdir as mkdir2, readFile as readFile2, rename, rm as rm2, stat as stat2, writeFile as writeFile2 } from "fs/promises";
import { existsSync as existsSync3 } from "fs";
import { join as join5 } from "path";
import { dirname as dirname2 } from "path";

// src/rag/crs-paths.ts
init_esm_shims();
import { createHash as createHash3 } from "crypto";
import { join as join4 } from "path";
var SAFE_ID = /[^A-Za-z0-9._-]/g;
function escapeCollectionId(id) {
  const raw = String(id);
  if (raw.trim().length === 0) {
    throw new Error("CRS collection id must be a non-empty string");
  }
  const safe = raw.replace(SAFE_ID, "_").replace(/\.{2,}/g, "_");
  if (safe === ".") {
    throw new Error(`CRS collection id escapes to an unusable directory name: ${raw}`);
  }
  if (safe === raw) {
    return safe;
  }
  const hash = createHash3("sha256").update(raw).digest("hex").slice(0, 8);
  return `${safe}-${hash}`;
}
function crsCollectionDir(projectRoot, collectionId) {
  return join4(projectRoot, PATHS.CRS_DIR, escapeCollectionId(collectionId));
}
function crsCollectionPaths(collectionId) {
  const dir = join4(PATHS.CRS_DIR, escapeCollectionId(collectionId));
  return { indexPath: join4(dir, "index.json"), metaPath: join4(dir, "meta.json") };
}
function crsCollectionLayout(projectRoot, collectionId) {
  const escaped = escapeCollectionId(collectionId);
  const relDir = join4(PATHS.CRS_DIR, escaped);
  return {
    escaped,
    crsRootAbs: join4(projectRoot, PATHS.CRS_DIR),
    relDir,
    absDir: join4(projectRoot, relDir),
    indexPath: join4(relDir, "index.json"),
    metaPath: join4(relDir, "meta.json")
  };
}

// src/rag/vector-index.ts
var CorruptVectorIndexError = class extends Error {
  constructor(kind, filePath, cause) {
    super(`Corrupt vector ${kind} file at ${filePath}`);
    this.kind = kind;
    this.filePath = filePath;
    this.cause = cause;
    this.name = "CorruptVectorIndexError";
  }
  kind;
  filePath;
  cause;
};
async function atomicWrite(path2, content) {
  await mkdir2(dirname2(path2), { recursive: true });
  const tmp = `${path2}.tmp`;
  await writeFile2(tmp, content, "utf8");
  await rename(tmp, path2);
}
var COLLECTION_LOCK_RETRIES = 50;
var COLLECTION_LOCK_DELAY_MS = 10;
var delay = (ms) => new Promise((resolve2) => setTimeout(resolve2, ms));
async function withCollectionLock(dir, fn) {
  const lockPath = join5(dir, ".lock");
  await mkdir2(dir, { recursive: true });
  let acquired = false;
  for (let attempt = 0; attempt < COLLECTION_LOCK_RETRIES; attempt++) {
    try {
      await mkdir2(lockPath);
      acquired = true;
      break;
    } catch {
      await delay(COLLECTION_LOCK_DELAY_MS);
    }
  }
  try {
    return await fn();
  } finally {
    if (acquired) {
      await rm2(lockPath, { recursive: true, force: true });
    }
  }
}
var FileVectorIndex = class _FileVectorIndex {
  constructor(indexPath = PATHS.VECTOR_INDEX, metaPath = PATHS.VECTOR_META) {
    this.indexPath = indexPath;
    this.metaPath = metaPath;
  }
  indexPath;
  metaPath;
  async load(projectRoot) {
    const path2 = this.resolveExistingIndexPath(projectRoot);
    if (!existsSync3(path2)) {
      return null;
    }
    try {
      const raw = await readFile2(path2, "utf8");
      return JSON.parse(raw);
    } catch (error) {
      throw new CorruptVectorIndexError("index", path2, error);
    }
  }
  async loadMeta(projectRoot) {
    const path2 = this.resolve(projectRoot, this.metaPath);
    if (!existsSync3(path2)) {
      return null;
    }
    try {
      const raw = await readFile2(path2, "utf8");
      return JSON.parse(raw);
    } catch (error) {
      throw new CorruptVectorIndexError("meta", path2, error);
    }
  }
  async save(projectRoot, payload, meta) {
    const target = this.resolve(projectRoot, this.indexPath);
    await atomicWrite(target, JSON.stringify(payload, null, 2));
    await atomicWrite(this.resolve(projectRoot, this.metaPath), JSON.stringify(meta, null, 2));
    const legacyPath = this.resolveLegacyIndexPath(projectRoot);
    if (legacyPath !== target && existsSync3(legacyPath)) {
      await rm2(legacyPath, { force: true });
    }
  }
  async clear(projectRoot) {
    await rm2(dirname2(this.resolve(projectRoot, this.indexPath)), { recursive: true, force: true });
  }
  async query(projectRoot, vector, topN) {
    const payload = await this.load(projectRoot);
    if (!payload) {
      return [];
    }
    return payload.items.map((item) => ({ item, score: cosineSimilarity(vector, item.vector) })).sort((left, right) => right.score - left.score).slice(0, topN);
  }
  async status(projectRoot) {
    const indexPath = this.resolveExistingIndexPath(projectRoot);
    if (!existsSync3(indexPath)) {
      return { present: false, sizeBytes: 0, meta: null, corrupt: false };
    }
    const info = await stat2(indexPath);
    let meta;
    try {
      meta = await this.loadMeta(projectRoot);
    } catch (error) {
      if (error instanceof CorruptVectorIndexError) {
        return {
          present: true,
          sizeBytes: info.size,
          meta: null,
          corrupt: true,
          reason: error.kind === "meta" ? "vector metadata is unreadable" : "vector index payload is unreadable"
        };
      }
      throw error;
    }
    try {
      await this.load(projectRoot);
    } catch (error) {
      if (error instanceof CorruptVectorIndexError) {
        return {
          present: true,
          sizeBytes: info.size,
          meta,
          corrupt: true,
          reason: error.kind === "meta" ? "vector metadata is unreadable" : "vector index payload is unreadable"
        };
      }
      throw error;
    }
    return {
      present: true,
      sizeBytes: info.size,
      meta,
      corrupt: meta === null,
      reason: meta === null ? "vector metadata is missing" : void 0
    };
  }
  async replaceAll(projectRoot, items, metaInput, baseBranch) {
    const dimensions = items[0]?.vector.length ?? 0;
    const meta = {
      version: 1,
      provider: metaInput.provider,
      model: metaInput.model,
      built_at: (/* @__PURE__ */ new Date()).toISOString(),
      chunk_count: items.length,
      embedding_dimensions: dimensions,
      ...metaInput.chunker_version ? { chunker_version: metaInput.chunker_version } : {},
      ...readGitState(projectRoot, baseBranch ? { baseBranch } : {})
    };
    const payload = { version: 1, dimensions, items };
    await this.save(projectRoot, payload, meta);
    return meta;
  }
  static async create(projectRoot, collectionId) {
    const dir = crsCollectionDir(projectRoot, collectionId);
    await mkdir2(dir, { recursive: true });
    const { indexPath, metaPath } = crsCollectionPaths(collectionId);
    const absIndex = join5(projectRoot, indexPath);
    const absMeta = join5(projectRoot, metaPath);
    if (existsSync3(absIndex) || existsSync3(absMeta)) {
      return;
    }
    const payload = { version: 1, dimensions: 0, items: [] };
    const meta = {
      version: 1,
      provider: "local",
      model: "",
      built_at: (/* @__PURE__ */ new Date()).toISOString(),
      chunk_count: 0,
      embedding_dimensions: 0
    };
    await atomicWrite(absIndex, JSON.stringify(payload, null, 2));
    await atomicWrite(absMeta, JSON.stringify(meta, null, 2));
  }
  static async destroy(projectRoot, collectionId, options) {
    const dir = crsCollectionDir(projectRoot, collectionId);
    if (!existsSync3(dir)) {
      return 0;
    }
    const { indexPath, metaPath } = crsCollectionPaths(collectionId);
    const index = new _FileVectorIndex(indexPath, metaPath);
    if (options?.sourceSessionId !== void 0) {
      const sessionId = options.sourceSessionId;
      return withCollectionLock(dir, async () => {
        const payload = await index.load(projectRoot);
        if (!payload) {
          return 0;
        }
        const kept = payload.items.filter((item) => item.source_session_id !== sessionId);
        const removed = payload.items.length - kept.length;
        if (removed > 0) {
          const meta = await index.loadMeta(projectRoot);
          await index.replaceAll(projectRoot, kept, {
            provider: meta?.provider ?? "local",
            model: meta?.model ?? ""
          });
        }
        return removed;
      });
    }
    return withCollectionLock(dir, async () => {
      let count = 0;
      try {
        const payload = await index.load(projectRoot);
        count = payload?.items.length ?? 0;
      } catch {
      }
      await rm2(dir, { recursive: true, force: true });
      return count;
    });
  }
  resolve(projectRoot, relativePath) {
    return join5(projectRoot, relativePath);
  }
  resolveExistingIndexPath(projectRoot) {
    const current = this.resolve(projectRoot, this.indexPath);
    if (existsSync3(current)) {
      return current;
    }
    return this.resolveLegacyIndexPath(projectRoot);
  }
  resolveLegacyIndexPath(projectRoot) {
    if (!this.indexPath.endsWith(".json")) {
      return this.resolve(projectRoot, this.indexPath);
    }
    return this.resolve(projectRoot, this.indexPath.replace(/\.json$/, ".bin"));
  }
};

// src/patterns/pattern-store.ts
init_esm_shims();
import { readFile as readFile3, writeFile as writeFile3, mkdir as mkdir3, unlink } from "fs/promises";
import { join as join6, dirname as dirname3 } from "path";
import { homedir as homedir2 } from "os";
var GLOBAL_PATTERNS_DIR = join6(homedir2(), ".paqad", "patterns");
var PatternStore = class {
  get indexPath() {
    return join6(GLOBAL_PATTERNS_DIR, "index.json");
  }
  get entriesDir() {
    return join6(GLOBAL_PATTERNS_DIR, "entries");
  }
  async save(pattern) {
    await mkdir3(this.entriesDir, { recursive: true });
    const entryPath = join6(this.entriesDir, `${pattern.id}.json`);
    await writeFile3(entryPath, JSON.stringify(pattern, null, 2), "utf8");
    await this.updateIndex(pattern);
  }
  async load(id) {
    try {
      const raw = await readFile3(join6(this.entriesDir, `${id}.json`), "utf8");
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  async loadIndex() {
    try {
      const raw = await readFile3(this.indexPath, "utf8");
      return JSON.parse(raw);
    } catch {
      return { version: 1, entries: [] };
    }
  }
  async updateIndex(pattern) {
    const index = await this.loadIndex();
    const existingIdx = index.entries.findIndex((e) => e.id === pattern.id);
    const entry = {
      id: pattern.id,
      category: pattern.category,
      stack_filter: pattern.stack_filter,
      tags: pattern.tags,
      created_at: pattern.created_at,
      problem_preview: pattern.problem.slice(0, 100)
    };
    if (existingIdx >= 0) {
      index.entries[existingIdx] = entry;
    } else {
      index.entries.push(entry);
    }
    await mkdir3(dirname3(this.indexPath), { recursive: true });
    await writeFile3(this.indexPath, JSON.stringify(index, null, 2), "utf8");
  }
  async delete(id) {
    try {
      await unlink(join6(this.entriesDir, `${id}.json`));
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
    const index = await this.loadIndex();
    index.entries = index.entries.filter((e) => e.id !== id);
    await writeFile3(this.indexPath, JSON.stringify(index, null, 2), "utf8");
  }
  async list(filter2) {
    const index = await this.loadIndex();
    let entries = index.entries;
    if (filter2?.domain) {
      entries = entries.filter((e) => e.stack_filter.domain === filter2.domain);
    }
    if (filter2?.frameworks && filter2.frameworks.length > 0) {
      entries = entries.filter(
        (e) => filter2.frameworks.some((f) => e.stack_filter.frameworks.includes(f))
      );
    }
    if (filter2?.category) {
      entries = entries.filter((e) => e.category === filter2.category);
    }
    if (filter2?.keywords && filter2.keywords.length > 0) {
      entries = entries.filter(
        (e) => filter2.keywords.some(
          (kw) => e.problem_preview.toLowerCase().includes(kw.toLowerCase()) || e.tags.some((t) => t.toLowerCase().includes(kw.toLowerCase()))
        )
      );
    }
    const patterns = [];
    for (const entry of entries) {
      const pattern = await this.load(entry.id);
      if (pattern) patterns.push(pattern);
    }
    return patterns;
  }
};

// src/patterns/pattern-suggester.ts
init_esm_shims();
var STALENESS_THRESHOLD_DAYS = 180;
var STALE_SCORE_PENALTY = 0.15;
var PatternSuggester = class {
  constructor(store, relevanceThreshold = 0.3, semanticScorer) {
    this.store = store;
    this.relevanceThreshold = relevanceThreshold;
    this.semanticScorer = semanticScorer;
  }
  store;
  relevanceThreshold;
  semanticScorer;
  async suggest(keywords, domain, frameworks, limit = 3) {
    const filter2 = { domain, frameworks };
    const patterns = await this.store.list(filter2);
    const semanticScores = await Promise.all(
      patterns.map(async (pattern) => ({
        id: pattern.id,
        score: this.semanticScorer ? await this.semanticScorer(pattern, keywords) : 0
      }))
    );
    const semanticScoreMap = new Map(semanticScores.map((entry) => [entry.id, entry.score]));
    const scored = patterns.map((p) => ({
      pattern: p,
      is_stale: this.isStale(p),
      score: this.score(
        p,
        keywords,
        frameworks,
        semanticScoreMap.get(p.id) ?? 0,
        this.isStale(p)
      )
    })).filter(({ score }) => score >= this.relevanceThreshold).sort((a, b) => b.score - a.score).slice(0, limit);
    return scored;
  }
  score(pattern, keywords, frameworks, semanticScore, isStale) {
    let score = 0;
    const frameworkMatch = frameworks.filter(
      (f) => pattern.stack_filter.frameworks.includes(f)
    ).length;
    if (frameworks.length > 0) {
      score += frameworkMatch / frameworks.length * 0.25;
    }
    if (keywords.length > 0) {
      const text = `${pattern.problem} ${pattern.tags.join(" ")}`.toLowerCase();
      const matches = keywords.filter((kw) => text.includes(kw.toLowerCase())).length;
      score += matches / keywords.length * 0.35;
    }
    return score + semanticScore * 0.4 - (isStale ? STALE_SCORE_PENALTY : 0);
  }
  isStale(pattern) {
    const ageMs = Date.now() - new Date(pattern.created_at).getTime();
    const ageDays = ageMs / (1e3 * 60 * 60 * 24);
    return ageDays > STALENESS_THRESHOLD_DAYS;
  }
};

// src/patterns/pattern-rag.ts
function patternText(pattern) {
  return [
    pattern.problem,
    pattern.solution,
    ...pattern.tags,
    ...pattern.files_involved,
    ...pattern.stack_filter.frameworks,
    ...pattern.stack_filter.traits
  ].join("\n");
}
function fingerprint(pattern) {
  return createHash4("sha1").update(patternText(pattern)).digest("hex");
}
function sanitizeNamespaceSegment(value) {
  const normalized = slugifyAscii(value.trim());
  return normalized.length > 0 ? normalized : createHash4("sha1").update(value).digest("hex").slice(0, 12);
}
function getGlobalPatternVectorPaths(provider, model) {
  if (!provider || !model) {
    return {
      index: PATHS.GLOBAL_PATTERN_VECTOR_INDEX,
      meta: PATHS.GLOBAL_PATTERN_VECTOR_META
    };
  }
  const namespace = `${sanitizeNamespaceSegment(provider)}/${sanitizeNamespaceSegment(model)}`;
  return {
    index: `${PATHS.GLOBAL_PATTERN_VECTORS_DIR}/${namespace}/index.json`,
    meta: `${PATHS.GLOBAL_PATTERN_VECTORS_DIR}/${namespace}/meta.json`
  };
}
var PatternVectorService = class {
  constructor(store = new PatternStore(), providerFactory = createEmbeddingProvider) {
    this.store = store;
    this.providerFactory = providerFactory;
  }
  store;
  providerFactory;
  getIndex(projectRoot) {
    const profile = readProjectProfile(projectRoot);
    const intelligence = normalizeIntelligenceConfig(profile?.intelligence);
    const paths = getGlobalPatternVectorPaths(
      intelligence.embedding_provider,
      intelligence.embedding_provider ? intelligence.embedding_model ?? getDefaultEmbeddingModel(intelligence.embedding_provider) : void 0
    );
    return new FileVectorIndex(paths.index, paths.meta);
  }
  async getStatus(projectRoot) {
    const profile = readProjectProfile(projectRoot);
    const intelligence = normalizeIntelligenceConfig(profile?.intelligence);
    const index = this.getIndex(projectRoot);
    const status = await index.status(homedir3());
    const expectedModel = intelligence.embedding_provider ? intelligence.embedding_model ?? getDefaultEmbeddingModel(intelligence.embedding_provider) : void 0;
    const valid = Boolean(status.meta) && !status.corrupt && (!intelligence.rag_enabled || status.meta?.provider === intelligence.embedding_provider && status.meta?.model === expectedModel);
    return {
      present: status.present,
      valid,
      chunk_count: status.meta?.chunk_count ?? 0,
      reason: status.present && !valid ? status.reason ?? "pattern vector index metadata does not match the current provider or model" : void 0
    };
  }
  async rebuild(projectRoot, onProgress) {
    const profile = readProjectProfile(projectRoot);
    const intelligence = normalizeIntelligenceConfig(profile?.intelligence);
    if (!intelligence.rag_enabled || !intelligence.embedding_provider) {
      return;
    }
    const provider = await this.providerFactory(projectRoot, intelligence);
    await provider.validate();
    const patterns = await this.store.list();
    const items = await this.embedPatterns(patterns, provider, onProgress);
    await this.getIndex(projectRoot).replaceAll(homedir3(), items, {
      provider: provider.name,
      model: provider.model
    });
  }
  async refresh(projectRoot, onProgress) {
    const profile = readProjectProfile(projectRoot);
    const intelligence = normalizeIntelligenceConfig(profile?.intelligence);
    if (!intelligence.rag_enabled || !intelligence.embedding_provider) {
      return;
    }
    const status = await this.getStatus(projectRoot);
    if (!status.present || !status.valid) {
      await this.rebuild(projectRoot, onProgress);
      return;
    }
    const provider = await this.providerFactory(projectRoot, intelligence);
    await provider.validate();
    const index = this.getIndex(projectRoot);
    const current = await index.load(homedir3());
    if (!current) {
      await this.rebuild(projectRoot, onProgress);
      return;
    }
    const patterns = await this.store.list();
    const nextById = new Map(
      patterns.map((pattern) => [
        pattern.id,
        {
          pattern,
          fingerprint: fingerprint(pattern)
        }
      ])
    );
    const changedPatterns = patterns.filter((pattern) => {
      const currentItem = current.items.find((item) => item.id === pattern.id);
      return !currentItem || currentItem.fingerprint !== fingerprint(pattern);
    });
    const removedIds = current.items.map((item) => item.id).filter((id) => !nextById.has(id));
    if (changedPatterns.length === 0 && removedIds.length === 0) {
      return;
    }
    onProgress?.(
      `Refreshing pattern vectors (${changedPatterns.length} changed, ${removedIds.length} removed)`
    );
    const unchanged = current.items.filter(
      (item) => !removedIds.includes(item.id) && !changedPatterns.some((pattern) => pattern.id === item.id)
    );
    const embedded = await this.embedPatterns(changedPatterns, provider, onProgress);
    await index.replaceAll(homedir3(), [...unchanged, ...embedded], {
      provider: provider.name,
      model: provider.model
    });
  }
  async createSemanticScorer(projectRoot, onProgress) {
    const profile = readProjectProfile(projectRoot);
    const intelligence = normalizeIntelligenceConfig(profile?.intelligence);
    if (!intelligence.rag_enabled || !intelligence.embedding_provider) {
      return void 0;
    }
    await this.refresh(projectRoot, onProgress);
    const status = await this.getStatus(projectRoot);
    if (!status.present || !status.valid) {
      return void 0;
    }
    const provider = await this.providerFactory(projectRoot, intelligence);
    const current = await this.getIndex(projectRoot).load(homedir3());
    if (!current) {
      return void 0;
    }
    const scoreCache = /* @__PURE__ */ new Map();
    return async (pattern, keywords) => {
      if (keywords.length === 0) {
        return 0;
      }
      const query = keywords.join("\n");
      let scores = scoreCache.get(query);
      if (!scores) {
        const [queryVector] = await provider.embed(query);
        scores = new Map(
          current.items.map((item) => [item.id, cosineSimilarity(queryVector, item.vector)])
        );
        scoreCache.set(query, scores);
      }
      return scores.get(pattern.id) ?? 0;
    };
  }
  async createSuggester(projectRoot, relevanceThreshold = 0.3) {
    const scorer = await this.createSemanticScorer(projectRoot);
    return new PatternSuggester(this.store, relevanceThreshold, scorer);
  }
  async embedPatterns(patterns, provider, onProgress) {
    if (patterns.length === 0) {
      return [];
    }
    onProgress?.(`Embedding ${patterns.length} global patterns with ${provider.model}`);
    const vectors = await provider.embed(patterns.map((pattern) => patternText(pattern)));
    return patterns.map((pattern, index) => ({
      id: pattern.id,
      vector: vectors[index],
      fingerprint: fingerprint(pattern),
      category: pattern.category,
      tags: pattern.tags,
      problem_preview: pattern.problem.slice(0, 100)
    }));
  }
};
async function suggestPatternsForProject(projectRoot, keywords, domain, frameworks, limit = 3) {
  const suggester = await new PatternVectorService().createSuggester(projectRoot);
  return suggester.suggest(keywords, domain, frameworks, limit);
}

// src/session/resume-validator.ts
init_esm_shims();

// src/session/handoff-parser.ts
init_esm_shims();
import { readFile as readFile4 } from "fs/promises";
import { join as join7 } from "path";
var UnsupportedStructuredHandoffVersionError = class extends Error {
  constructor(handoff) {
    super(`Unsupported structured handoff version: ${handoff.version}`);
    this.handoff = handoff;
    this.name = "UnsupportedStructuredHandoffVersionError";
  }
  handoff;
};
function isStructuredHandoff(data) {
  return typeof data === "object" && data !== null && data.version === 2;
}
var HandoffParser = class {
  async parse(projectRoot) {
    try {
      const jsonPath = join7(projectRoot, ".paqad", "session", "handoff.json");
      const raw = await readFile4(jsonPath, "utf8");
      const data = JSON.parse(raw);
      if (isStructuredHandoff(data)) {
        return { version: 2, data };
      }
      throw new UnsupportedStructuredHandoffVersionError({
        version: data.version,
        data
      });
    } catch (error) {
      if (error instanceof UnsupportedStructuredHandoffVersionError) {
        throw error;
      }
    }
    try {
      const mdPath = join7(projectRoot, ".paqad", "session", "handoff.md");
      const raw = await readFile4(mdPath, "utf8");
      return { version: 1, data: raw };
    } catch {
      return null;
    }
  }
  isStructured(handoff) {
    return handoff.version === 2;
  }
};

// src/session/resume-validator.ts
var SessionResumeValidator = class {
  constructor(parser = new HandoffParser(), serviceFactory = async (projectRoot) => {
    const { RagService: RagService2 } = await import("./service-5N2BH5CR.js");
    return new RagService2(projectRoot);
  }) {
    this.parser = parser;
    this.serviceFactory = serviceFactory;
  }
  parser;
  serviceFactory;
  async validate(projectRoot) {
    const parsed = await this.parser.parse(projectRoot);
    if (!parsed || !this.parser.isStructured(parsed) || !parsed.data.retrieval.rag_enabled) {
      return {
        rag_enabled: false,
        embedding_provider: void 0,
        index_valid: true,
        rebuild_required: false
      };
    }
    const status = await (await this.serviceFactory(projectRoot)).getStatus();
    if (status.index_present && status.valid) {
      return {
        rag_enabled: true,
        embedding_provider: parsed.data.retrieval.embedding_provider,
        index_valid: true,
        rebuild_required: false
      };
    }
    return {
      rag_enabled: true,
      embedding_provider: parsed.data.retrieval.embedding_provider,
      index_valid: false,
      rebuild_required: true,
      warning: `RAG index is unavailable or stale (${status.reason ?? "missing index"}). Run \`paqad-ai rag rebuild\` before resuming semantic retrieval.`
    };
  }
};

// src/rag/audit.ts
init_esm_shims();
import { appendFileSync, mkdirSync } from "fs";
import { dirname as dirname4, join as join8 } from "path";

// src/rag-ledger/audit-bridge.ts
init_esm_shims();

// src/rag-ledger/recorder.ts
init_esm_shims();

// src/rag-ledger/schema.ts
init_esm_shims();
var import_ajv = __toESM(require_ajv(), 1);

// src/rag-ledger/types.ts
init_esm_shims();
var RAG_EVIDENCE_DOC_TYPE = "paqad.rag-evidence";
var RAG_EVIDENCE_SCHEMA_VERSION = 1;

// src/rag-ledger/schema.ts
var nullableInt = { type: ["integer", "null"] };
var nullableString = { type: ["string", "null"] };
var RAG_EVIDENCE_SCHEMA = {
  $id: "paqad://schemas/rag-evidence.json",
  type: "object",
  additionalProperties: false,
  required: [
    "schema_version",
    "doc_type",
    "kind",
    "session_id",
    "conversation_ordinal",
    "ts",
    "rag_enabled",
    "adapter",
    "content_hash"
  ],
  properties: {
    schema_version: { type: "integer", const: 1 },
    doc_type: { const: RAG_EVIDENCE_DOC_TYPE },
    kind: { enum: ["open", "refreshed", "called", "used", "fallback", "close"] },
    session_id: { type: "string", minLength: 1 },
    conversation_ordinal: { type: "integer", minimum: 1 },
    ts: { type: "string", minLength: 1 },
    rag_enabled: { type: "boolean" },
    adapter: { type: "string", minLength: 1 },
    refresh_kind: {
      type: ["string", "null"],
      enum: ["rebuild", "incremental-sync", "rule-context", "vision", "crs", "attachment", null]
    },
    changed_files: nullableInt,
    chunks_embedded: nullableInt,
    chunks_cached: nullableInt,
    query_scope: { type: ["string", "null"], enum: ["docs", "code", "all", null] },
    top_n: nullableInt,
    candidates: nullableInt,
    injected: { type: ["boolean", "null"] },
    injected_sections: {
      type: ["array", "null"],
      items: { enum: ["rules", "memory", "retrieval", "drift"] }
    },
    slice_count: nullableInt,
    pointer_count: nullableInt,
    score_top: { type: ["number", "null"] },
    bytes_injected: nullableInt,
    fallback_reason: {
      type: ["string", "null"],
      enum: [
        "rag-disabled",
        "no-index",
        "cold",
        "below-floor",
        "provider-mismatch",
        "chunker-mismatch",
        "error",
        null
      ]
    },
    chunker_version: nullableString,
    index_branch: nullableString,
    latency_ms: nullableInt,
    note: nullableString,
    content_hash: { type: "string", minLength: 1 }
  }
};
var ajv = new import_ajv.default({ allErrors: true, allowUnionTypes: true });
var compiled;
function validator() {
  if (!compiled) {
    compiled = ajv.compile(RAG_EVIDENCE_SCHEMA);
  }
  return compiled;
}
function validateRagEvidenceRow(row) {
  const validate = validator();
  if (validate(row)) {
    return [];
  }
  return (validate.errors ?? []).map(
    (error) => `${error.instancePath || "(root)"} ${error.message ?? "invalid"}`
  );
}

// src/rag-ledger/recorder.ts
var APPEND_OPTS = (now) => ({
  schemaVersion: RAG_EVIDENCE_SCHEMA_VERSION,
  validate: (row) => validateRagEvidenceRow(row),
  now
});
function openRagConversation(projectRoot, ctx) {
  try {
    const sessionId = resolveSessionId(projectRoot, ctx.sessionId);
    const ordinal = openChatConversation(projectRoot, sessionId, ctx);
    return { sessionId, ordinal };
  } catch {
    return null;
  }
}
function openChatConversation(projectRoot, sessionId, ctx) {
  const ordinal = allocateChatOrdinal(projectRoot, sessionId);
  const openRow = stampSessionRow(
    RAG_EVIDENCE_DOC_TYPE,
    sessionId,
    {
      kind: "open",
      conversation_ordinal: ordinal,
      rag_enabled: ctx.ragEnabled,
      adapter: ctx.adapter
    },
    APPEND_OPTS(ctx.now)
  );
  mirrorRagRow(projectRoot, sessionId, openRow);
  return ordinal;
}
function recordRagEvidence(projectRoot, kind, fields, ctx) {
  try {
    const sessionId = resolveSessionId(projectRoot, ctx.sessionId);
    const ordinal = resolveOrdinal(projectRoot, sessionId, ctx);
    const note = typeof fields.note === "string" ? redactSecrets(fields.note, projectRoot) : fields.note ?? null;
    const row = {
      kind,
      conversation_ordinal: ordinal,
      rag_enabled: ctx.ragEnabled,
      adapter: ctx.adapter,
      ...fields,
      note
    };
    const stamped = stampSessionRow(RAG_EVIDENCE_DOC_TYPE, sessionId, row, APPEND_OPTS(ctx.now));
    mirrorRagRow(projectRoot, sessionId, stamped);
    return stamped;
  } catch {
    return null;
  }
}
function resolveOrdinal(projectRoot, sessionId, ctx) {
  if (ctx.ordinal && ctx.ordinal > 0) {
    return ctx.ordinal;
  }
  const current = currentChatOrdinal(projectRoot, sessionId);
  if (current > 0) {
    return current;
  }
  return openChatConversation(projectRoot, sessionId, ctx);
}

// src/rag-ledger/audit-bridge.ts
function toInt(value) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : null;
}
function mapFallbackReason(reason) {
  const text = String(reason ?? "").toLowerCase();
  if (text.includes("disabled")) return "rag-disabled";
  if (text.includes("provider") || text.includes("model")) return "provider-mismatch";
  if (text.includes("chunker")) return "chunker-mismatch";
  if (text.includes("below") || text.includes("floor")) return "below-floor";
  if (text.includes("cold")) return "cold";
  if (text.includes("missing-index") || text.includes("no-index") || text.includes("missing index"))
    return "no-index";
  return "error";
}
function mapAuditEventToEvidence(event, fields) {
  switch (event) {
    case "rag-build-completed":
      return {
        kind: "refreshed",
        ragEnabled: true,
        fields: { refresh_kind: "rebuild", chunks_embedded: toInt(fields.chunks) }
      };
    case "rag-build-failed":
    case "rag-build-cancelled":
      return {
        kind: "fallback",
        ragEnabled: true,
        fields: { fallback_reason: "error", note: event }
      };
    case "rag-incremental-update":
      return {
        kind: "refreshed",
        ragEnabled: true,
        fields: {
          refresh_kind: "incremental-sync",
          changed_files: toInt(fields.changed_files),
          chunks_embedded: toInt(fields.chunks)
        }
      };
    case "rag-vision-ingested":
      return { kind: "refreshed", ragEnabled: true, fields: { refresh_kind: "vision" } };
    case "crs-reindexed":
      return { kind: "refreshed", ragEnabled: true, fields: { refresh_kind: "crs" } };
    case "rag-fallback": {
      const reason = mapFallbackReason(fields.reason);
      return {
        kind: "fallback",
        ragEnabled: reason !== "rag-disabled",
        fields: { fallback_reason: reason }
      };
    }
    case "rag-provider-mismatch":
      return {
        kind: "fallback",
        ragEnabled: true,
        fields: { fallback_reason: "provider-mismatch" }
      };
    case "rag-rerank-fallback":
      return {
        kind: "fallback",
        ragEnabled: true,
        fields: { fallback_reason: "error", note: "rerank" }
      };
    case "rag-resume-warning":
      return {
        kind: "fallback",
        ragEnabled: true,
        fields: { fallback_reason: "error", note: "resume-warning" }
      };
    case "rag-api-key-validation-failed":
      return {
        kind: "fallback",
        ragEnabled: true,
        fields: { fallback_reason: "error", note: "api-key" }
      };
    case "rag-enabled":
      return { kind: "open", ragEnabled: true, fields: {} };
    case "rag-cleared":
      return { kind: "close", ragEnabled: false, fields: {} };
    default:
      if (event.startsWith("rag-attachment-index")) {
        return { kind: "refreshed", ragEnabled: true, fields: { refresh_kind: "attachment" } };
      }
      return null;
  }
}
function recordRagEvidenceFromAudit(projectRoot, event, fields) {
  const mapped = mapAuditEventToEvidence(event, fields);
  if (!mapped) {
    return;
  }
  recordRagEvidence(projectRoot, mapped.kind, mapped.fields, {
    ragEnabled: mapped.ragEnabled,
    adapter: "engine"
  });
}

// src/rag/audit.ts
function sanitize(value) {
  return String(value).replace(/[\r\n"]/g, (match2) => {
    if (match2 === '"') return "'";
    return " ";
  });
}
function appendRagAudit(projectRoot, level, event, fields = {}) {
  const path2 = join8(projectRoot, PATHS.AUDIT_LOG);
  mkdirSync(dirname4(path2), { recursive: true });
  const ts = (/* @__PURE__ */ new Date()).toISOString();
  const suffix = Object.entries(fields).map(([key, value]) => {
    const redacted = redactSecrets(String(value), projectRoot);
    return `${key}="${sanitize(redacted)}"`;
  }).join(" ");
  appendFileSync(path2, `[${ts}] ${level} ${event}${suffix ? ` ${suffix}` : ""}
`);
  recordRagEvidenceFromAudit(projectRoot, event, fields);
}

// src/rag/crs-backlog.ts
init_esm_shims();
var DEFAULT_CRS_BACKLOG_CAP = 1e3;
var CrsBacklogQueue = class {
  constructor(cap = DEFAULT_CRS_BACKLOG_CAP) {
    this.cap = cap;
  }
  cap;
  entries = [];
  get size() {
    return this.entries.length;
  }
  enqueue(chunks, collectionId) {
    for (const chunk of chunks) {
      this.entries.push({ collectionId, chunk });
    }
    let dropped = 0;
    while (this.entries.length > this.cap) {
      this.entries.shift();
      dropped++;
    }
    if (dropped > 0) {
      throw new EmbeddingBacklogOverflow(dropped);
    }
  }
  async drain(persist) {
    while (this.entries.length > 0) {
      const collectionId = this.entries[0].collectionId;
      const batch = [];
      let count = 0;
      for (const entry of this.entries) {
        if (entry.collectionId !== collectionId) {
          break;
        }
        batch.push(entry.chunk);
        count++;
      }
      await persist(collectionId, batch);
      this.entries.splice(0, count);
    }
  }
};

// src/rag/embedding-cache.ts
init_esm_shims();
import { createHash as createHash5 } from "crypto";
import { existsSync as existsSync4, readFileSync as readFileSync2 } from "fs";
import { join as join9 } from "path";
var EMBEDDING_CACHE_RELPATH = ".paqad/vectors/embedding-cache.json";
var CACHE_VERSION = 1;
function chunkHash(text) {
  return createHash5("sha256").update(text).digest("hex");
}
var EmbeddingCache = class _EmbeddingCache {
  constructor(path2, model) {
    this.path = path2;
    this.model = model;
  }
  path;
  model;
  entries = /* @__PURE__ */ new Map();
  dirty = false;
  static load(projectRoot, model) {
    const path2 = join9(projectRoot, EMBEDDING_CACHE_RELPATH);
    const cache = new _EmbeddingCache(path2, model);
    if (!existsSync4(path2)) return cache;
    try {
      const parsed = JSON.parse(readFileSync2(path2, "utf8"));
      if (parsed.version === CACHE_VERSION && parsed.model === model && parsed.entries) {
        for (const [hash, vector] of Object.entries(parsed.entries)) {
          cache.entries.set(hash, vector);
        }
      }
    } catch {
    }
    return cache;
  }
  get(text) {
    return this.entries.get(chunkHash(text));
  }
  has(text) {
    return this.entries.has(chunkHash(text));
  }
  set(text, vector) {
    this.entries.set(chunkHash(text), vector);
    this.dirty = true;
  }
  get size() {
    return this.entries.size;
  }
  async flush() {
    if (!this.dirty) return;
    const file = {
      version: CACHE_VERSION,
      model: this.model,
      entries: Object.fromEntries(this.entries)
    };
    await atomicWriteFile(this.path, JSON.stringify(file));
    this.dirty = false;
  }
};

// src/rag/rerank-order.ts
init_esm_shims();
function reorderByRankedIds(items, idOf, rankedIds) {
  const byId = new Map(items.map((item) => [idOf(item), item]));
  const seen = /* @__PURE__ */ new Set();
  const ordered = [];
  for (const id of rankedIds) {
    const item = byId.get(id);
    if (item && !seen.has(id)) {
      ordered.push(item);
      seen.add(id);
    }
  }
  for (const item of items) {
    if (!seen.has(idOf(item))) {
      ordered.push(item);
    }
  }
  return ordered;
}

// src/rag/rrf-fusion.ts
init_esm_shims();
var RRF_K = 60;
function reciprocalRankFusion(rankings, k = RRF_K) {
  const scores = /* @__PURE__ */ new Map();
  const firstSeen = /* @__PURE__ */ new Map();
  let order = 0;
  for (const ranking of rankings) {
    for (let rank = 0; rank < ranking.length; rank++) {
      const id = ranking[rank];
      scores.set(id, (scores.get(id) ?? 0) + 1 / (k + rank + 1));
      if (!firstSeen.has(id)) {
        firstSeen.set(id, order++);
      }
    }
  }
  return [...scores.entries()].map(([id, score]) => ({ id, score })).sort((left, right) => {
    if (right.score !== left.score) {
      return right.score - left.score;
    }
    return (firstSeen.get(left.id) ?? 0) - (firstSeen.get(right.id) ?? 0);
  });
}

// src/rag/file-filter.ts
init_esm_shims();
import { existsSync as existsSync5, readFileSync as readFileSync3 } from "fs";
import { lstat, open } from "fs/promises";
import { homedir as homedir4 } from "os";
import { isAbsolute, join as join10, relative } from "path";
var import_ajv2 = __toESM(require_ajv(), 1);
var import_fast_glob = __toESM(require_out(), 1);

// node_modules/.pnpm/minimatch@10.2.6/node_modules/minimatch/dist/esm/index.js
init_esm_shims();

// node_modules/.pnpm/brace-expansion@5.0.12/node_modules/brace-expansion/dist/esm/index.js
init_esm_shims();

// node_modules/.pnpm/balanced-match@4.0.4/node_modules/balanced-match/dist/esm/index.js
init_esm_shims();
var balanced = (a, b, str) => {
  const ma = a instanceof RegExp ? maybeMatch(a, str) : a;
  const mb = b instanceof RegExp ? maybeMatch(b, str) : b;
  const r = ma !== null && mb != null && range(ma, mb, str);
  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + ma.length, r[1]),
    post: str.slice(r[1] + mb.length)
  };
};
var maybeMatch = (reg, str) => {
  const m = str.match(reg);
  return m ? m[0] : null;
};
var range = (a, b, str) => {
  let begs, beg, left, right = void 0, result;
  let ai = str.indexOf(a);
  let bi = str.indexOf(b, ai + 1);
  let i = ai;
  if (ai >= 0 && bi > 0) {
    if (a === b) {
      return [ai, bi];
    }
    begs = [];
    left = str.length;
    while (i >= 0 && !result) {
      if (i === ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length === 1) {
        const r = begs.pop();
        if (r !== void 0)
          result = [r, bi];
      } else {
        beg = begs.pop();
        if (beg !== void 0 && beg < left) {
          left = beg;
          right = bi;
        }
        bi = str.indexOf(b, i + 1);
      }
      i = ai < bi && ai >= 0 ? ai : bi;
    }
    if (begs.length && right !== void 0) {
      result = [left, right];
    }
  }
  return result;
};

// node_modules/.pnpm/brace-expansion@5.0.12/node_modules/brace-expansion/dist/esm/index.js
var escSlash = "\0SLASH" + Math.random() + "\0";
var escOpen = "\0OPEN" + Math.random() + "\0";
var escClose = "\0CLOSE" + Math.random() + "\0";
var escComma = "\0COMMA" + Math.random() + "\0";
var escPeriod = "\0PERIOD" + Math.random() + "\0";
var escSlashPattern = new RegExp(escSlash, "g");
var escOpenPattern = new RegExp(escOpen, "g");
var escClosePattern = new RegExp(escClose, "g");
var escCommaPattern = new RegExp(escComma, "g");
var escPeriodPattern = new RegExp(escPeriod, "g");
var slashPattern = /\\\\/g;
var openPattern = /\\{/g;
var closePattern = /\\}/g;
var commaPattern = /\\,/g;
var periodPattern = /\\\./g;
var EXPANSION_MAX = 1e5;
var EXPANSION_MAX_LENGTH = 4e6;
var EXPANSION_MAX_DEPTH = 1e3;
var EXPANSION_MAX_REWRITES = 1e3;
function numeric(str) {
  return !isNaN(str) ? parseInt(str, 10) : str.charCodeAt(0);
}
function escapeBraces(str) {
  return str.replace(slashPattern, escSlash).replace(openPattern, escOpen).replace(closePattern, escClose).replace(commaPattern, escComma).replace(periodPattern, escPeriod);
}
function unescapeBraces(str) {
  return str.replace(escSlashPattern, "\\").replace(escOpenPattern, "{").replace(escClosePattern, "}").replace(escCommaPattern, ",").replace(escPeriodPattern, ".");
}
function pushAll(target, items) {
  for (let i = 0; i < items.length; i++) {
    target.push(items[i]);
  }
}
function parseCommaParts(str) {
  const parts = [];
  let carry = "";
  for (; ; ) {
    const m = balanced("{", "}", str);
    if (!m) {
      const tail = str.split(",");
      tail[0] = carry + tail[0];
      pushAll(parts, tail);
      return parts;
    }
    const { pre, body, post } = m;
    const p = pre.split(",");
    p[0] = carry + p[0];
    p[p.length - 1] += "{" + body + "}";
    if (!post.length) {
      pushAll(parts, p);
      return parts;
    }
    carry = p.pop();
    pushAll(parts, p);
    str = post;
  }
}
function expand(str, options = {}) {
  if (!str) {
    return [];
  }
  const { max = EXPANSION_MAX, maxLength = EXPANSION_MAX_LENGTH, maxDepth = EXPANSION_MAX_DEPTH, maxRewrites = EXPANSION_MAX_REWRITES } = options;
  if (str.slice(0, 2) === "{}") {
    str = "\\{\\}" + str.slice(2);
  }
  return expand_(escapeBraces(str), max, maxLength, maxDepth, 0, maxRewrites, true).map(unescapeBraces);
}
function embrace(str) {
  return "{" + str + "}";
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}
function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}
function combine(acc, pre, values, max, maxLength, dropEmpties) {
  const out = [];
  let length = 0;
  for (let a = 0; a < acc.length; a++) {
    for (let v = 0; v < values.length; v++) {
      if (out.length >= max)
        return out;
      const expansion = acc[a] + pre + values[v];
      if (dropEmpties && !expansion)
        continue;
      if (length + expansion.length > maxLength)
        return out;
      out.push(expansion);
      length += expansion.length;
    }
  }
  return out;
}
function expandSequence(body, isAlphaSequence, max, maxLength) {
  const n = body.split(/\.\./);
  const N = [];
  if (n[0] === void 0 || n[1] === void 0) {
    return N;
  }
  const x = numeric(n[0]);
  const y = numeric(n[1]);
  const width = Math.max(n[0].length, n[1].length);
  let incr = n.length === 3 && n[2] !== void 0 ? Math.max(Math.abs(numeric(n[2])), 1) : 1;
  let test = lte;
  const reverse = y < x;
  if (reverse) {
    incr *= -1;
    test = gte;
  }
  const pad = n.some(isPadded);
  let length = 0;
  for (let i = x; test(i, y) && N.length < max; i += incr) {
    let c;
    if (isAlphaSequence) {
      c = String.fromCharCode(i);
      if (c === "\\") {
        c = "";
      }
    } else {
      c = String(i);
      if (pad) {
        const need = width - c.length;
        if (need > 0) {
          const z = new Array(need + 1).join("0");
          if (i < 0) {
            c = "-" + z + c.slice(1);
          } else {
            c = z + c;
          }
        }
      }
    }
    if (length + c.length > maxLength)
      break;
    N.push(c);
    length += c.length;
  }
  return N;
}
function expand_(str, max, maxLength, maxDepth, depth, maxRewrites, isTop) {
  if (depth > maxDepth) {
    return [str];
  }
  let acc = [""];
  let rewrites = 0;
  let dropEmpties = false;
  let firstGroup = true;
  for (; ; ) {
    const m = balanced("{", "}", str);
    if (!m) {
      return combine(acc, str, [""], max, maxLength, dropEmpties);
    }
    const pre = m.pre;
    if (/\$$/.test(pre)) {
      acc = combine(acc, pre + "{" + m.body + "}", [""], max, maxLength, dropEmpties && !m.post.length);
      firstGroup = false;
      if (!m.post.length)
        break;
      str = m.post;
      continue;
    }
    const isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
    const isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
    const isSequence = isNumericSequence || isAlphaSequence;
    const isOptions = m.body.indexOf(",") >= 0;
    if (!isSequence && !isOptions) {
      if (rewrites < maxRewrites && m.post.match(/,(?!,).*\}/)) {
        rewrites++;
        str = m.pre + "{" + m.body + escClose + m.post;
        isTop = true;
        continue;
      }
      return combine(acc, pre + "{" + m.body + "}" + m.post, [""], max, maxLength, dropEmpties);
    }
    if (firstGroup) {
      dropEmpties = isTop && !isSequence;
      firstGroup = false;
    }
    let values;
    if (isSequence) {
      values = expandSequence(m.body, isAlphaSequence, max, maxLength);
    } else {
      let n = parseCommaParts(m.body);
      if (n.length === 1 && n[0] !== void 0) {
        n = expand_(n[0], max, maxLength, maxDepth, depth + 1, maxRewrites, false).map(embrace);
        if (n.length === 1) {
          acc = combine(acc, pre + n[0], [""], max, maxLength, dropEmpties && !m.post.length);
          if (!m.post.length)
            break;
          str = m.post;
          continue;
        }
      }
      let dropsEmpties = dropEmpties && !m.post.length && !pre;
      for (let d = 0; dropsEmpties && d < acc.length; d++) {
        if (acc[d]) {
          dropsEmpties = false;
        }
      }
      values = [];
      let valuesLength = 0;
      outer: for (let j = 0; j < n.length; j++) {
        const expanded = expand_(n[j], max, maxLength, maxDepth, depth + 1, maxRewrites, false);
        for (let k = 0; k < expanded.length; k++) {
          const v = expanded[k];
          if (dropsEmpties && !v)
            continue;
          if (values.length >= max || valuesLength + v.length > maxLength) {
            break outer;
          }
          values.push(v);
          valuesLength += v.length;
        }
      }
    }
    acc = combine(acc, pre, values, max, maxLength, dropEmpties && !m.post.length);
    if (!m.post.length)
      break;
    str = m.post;
  }
  return acc;
}

// node_modules/.pnpm/minimatch@10.2.6/node_modules/minimatch/dist/esm/assert-valid-pattern.js
init_esm_shims();
var MAX_PATTERN_LENGTH = 1024 * 64;
var assertValidPattern = (pattern) => {
  if (typeof pattern !== "string") {
    throw new TypeError("invalid pattern");
  }
  if (pattern.length > MAX_PATTERN_LENGTH) {
    throw new TypeError("pattern is too long");
  }
};

// node_modules/.pnpm/minimatch@10.2.6/node_modules/minimatch/dist/esm/ast.js
init_esm_shims();

// node_modules/.pnpm/minimatch@10.2.6/node_modules/minimatch/dist/esm/brace-expressions.js
init_esm_shims();
var posixClasses = {
  "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", true],
  "[:alpha:]": ["\\p{L}\\p{Nl}", true],
  "[:ascii:]": ["\\x00-\\x7f", false],
  "[:blank:]": ["\\p{Zs}\\t", true],
  "[:cntrl:]": ["\\p{Cc}", true],
  "[:digit:]": ["\\p{Nd}", true],
  "[:graph:]": ["\\p{Z}\\p{C}", true, true],
  "[:lower:]": ["\\p{Ll}", true],
  "[:print:]": ["\\p{C}", true],
  "[:punct:]": ["\\p{P}", true],
  "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", true],
  "[:upper:]": ["\\p{Lu}", true],
  "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", true],
  "[:xdigit:]": ["A-Fa-f0-9", false]
};
var braceEscape = (s) => s.replace(/[[\]\\-]/g, "\\$&");
var regexpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var rangesToString = (ranges) => ranges.join("");
var parseClass = (glob, position) => {
  const pos = position;
  if (glob.charAt(pos) !== "[") {
    throw new Error("not in a brace expression");
  }
  const ranges = [];
  const negs = [];
  let i = pos + 1;
  let sawStart = false;
  let uflag = false;
  let escaping = false;
  let negate = false;
  let endPos = pos;
  let rangeStart = "";
  WHILE: while (i < glob.length) {
    const c = glob.charAt(i);
    if ((c === "!" || c === "^") && i === pos + 1) {
      negate = true;
      i++;
      continue;
    }
    if (c === "]" && sawStart && !escaping) {
      endPos = i + 1;
      break;
    }
    sawStart = true;
    if (c === "\\") {
      if (!escaping) {
        escaping = true;
        i++;
        continue;
      }
    }
    if (c === "[" && !escaping) {
      for (const [cls, [unip, u, neg]] of Object.entries(posixClasses)) {
        if (glob.startsWith(cls, i)) {
          if (rangeStart) {
            return ["$.", false, glob.length - pos, true];
          }
          i += cls.length;
          if (neg)
            negs.push(unip);
          else
            ranges.push(unip);
          uflag = uflag || u;
          continue WHILE;
        }
      }
    }
    escaping = false;
    if (rangeStart) {
      if (c > rangeStart) {
        ranges.push(braceEscape(rangeStart) + "-" + braceEscape(c));
      } else if (c === rangeStart) {
        ranges.push(braceEscape(c));
      }
      rangeStart = "";
      i++;
      continue;
    }
    if (glob.startsWith("-]", i + 1)) {
      ranges.push(braceEscape(c + "-"));
      i += 2;
      continue;
    }
    if (glob.startsWith("-", i + 1)) {
      rangeStart = c;
      i += 2;
      continue;
    }
    ranges.push(braceEscape(c));
    i++;
  }
  if (endPos < i) {
    return ["", false, 0, false];
  }
  if (!ranges.length && !negs.length) {
    return ["$.", false, glob.length - pos, true];
  }
  if (negs.length === 0 && ranges.length === 1 && /^\\?.$/.test(ranges[0]) && !negate) {
    const r = ranges[0].length === 2 ? ranges[0].slice(-1) : ranges[0];
    return [regexpEscape(r), false, endPos - pos, false];
  }
  const sranges = "[" + (negate ? "^" : "") + rangesToString(ranges) + "]";
  const snegs = "[" + (negate ? "" : "^") + rangesToString(negs) + "]";
  const comb = ranges.length && negs.length ? "(" + sranges + "|" + snegs + ")" : ranges.length ? sranges : snegs;
  return [comb, uflag, endPos - pos, true];
};

// node_modules/.pnpm/minimatch@10.2.6/node_modules/minimatch/dist/esm/unescape.js
init_esm_shims();
var unescape = (s, { windowsPathsNoEscape = false, magicalBraces = true } = {}) => {
  if (magicalBraces) {
    return windowsPathsNoEscape ? s.replace(/\[([^/\\])\]/g, "$1") : s.replace(/((?!\\).|^)\[([^/\\])\]/g, "$1$2").replace(/\\([^/])/g, "$1");
  }
  return windowsPathsNoEscape ? s.replace(/\[([^/\\{}])\]/g, "$1") : s.replace(/((?!\\).|^)\[([^/\\{}])\]/g, "$1$2").replace(/\\([^/{}])/g, "$1");
};

// node_modules/.pnpm/minimatch@10.2.6/node_modules/minimatch/dist/esm/ast.js
var _a;
var types = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]);
var isExtglobType = (c) => types.has(c);
var isExtglobAST = (c) => isExtglobType(c.type);
var adoptionMap = /* @__PURE__ */ new Map([
  ["!", ["@"]],
  ["?", ["?", "@"]],
  ["@", ["@"]],
  ["*", ["*", "+", "?", "@"]],
  ["+", ["+", "@"]]
]);
var adoptionWithSpaceMap = /* @__PURE__ */ new Map([
  ["!", ["?"]],
  ["@", ["?"]],
  ["+", ["?", "*"]]
]);
var adoptionAnyMap = /* @__PURE__ */ new Map([
  ["!", ["?", "@"]],
  ["?", ["?", "@"]],
  ["@", ["?", "@"]],
  ["*", ["*", "+", "?", "@"]],
  ["+", ["+", "@", "?", "*"]]
]);
var usurpMap = /* @__PURE__ */ new Map([
  ["!", /* @__PURE__ */ new Map([["!", "@"]])],
  [
    "?",
    /* @__PURE__ */ new Map([
      ["*", "*"],
      ["+", "*"]
    ])
  ],
  [
    "@",
    /* @__PURE__ */ new Map([
      ["!", "!"],
      ["?", "?"],
      ["@", "@"],
      ["*", "*"],
      ["+", "+"]
    ])
  ],
  [
    "+",
    /* @__PURE__ */ new Map([
      ["?", "*"],
      ["*", "*"]
    ])
  ]
]);
var startNoTraversal = "(?!(?:^|/)\\.\\.?(?:$|/))";
var startNoDot = "(?!\\.)";
var addPatternStart = /* @__PURE__ */ new Set(["[", "."]);
var justDots = /* @__PURE__ */ new Set(["..", "."]);
var reSpecials = new Set("().*{}+?[]^$\\!");
var regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var qmark = "[^/]";
var star = qmark + "*?";
var starNoEmpty = qmark + "+?";
var ID = 0;
var AST = class {
  type;
  #root;
  #hasMagic;
  #uflag = false;
  #parts = [];
  #parent;
  #parentIndex;
  #negs;
  #filledNegs = false;
  #options;
  #toString;
  // set to true if it's an extglob with no children
  // (which really means one child of '')
  #emptyExt = false;
  id = ++ID;
  get depth() {
    return (this.#parent?.depth ?? -1) + 1;
  }
  [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      "@@type": "AST",
      id: this.id,
      type: this.type,
      root: this.#root.id,
      parent: this.#parent?.id,
      depth: this.depth,
      partsLength: this.#parts.length,
      parts: this.#parts
    };
  }
  constructor(type, parent, options = {}) {
    this.type = type;
    if (type)
      this.#hasMagic = true;
    this.#parent = parent;
    this.#root = this.#parent ? this.#parent.#root : this;
    this.#options = this.#root === this ? options : this.#root.#options;
    this.#negs = this.#root === this ? [] : this.#root.#negs;
    if (type === "!" && !this.#root.#filledNegs)
      this.#negs.push(this);
    this.#parentIndex = this.#parent ? this.#parent.#parts.length : 0;
  }
  get hasMagic() {
    if (this.#hasMagic !== void 0)
      return this.#hasMagic;
    for (const p of this.#parts) {
      if (typeof p === "string")
        continue;
      if (p.type || p.hasMagic)
        return this.#hasMagic = true;
    }
    return this.#hasMagic;
  }
  // reconstructs the pattern
  toString() {
    return this.#toString !== void 0 ? this.#toString : !this.type ? this.#toString = this.#parts.map((p) => String(p)).join("") : this.#toString = this.type + "(" + this.#parts.map((p) => String(p)).join("|") + ")";
  }
  #fillNegs() {
    if (this !== this.#root)
      throw new Error("should only call on root");
    if (this.#filledNegs)
      return this;
    this.toString();
    this.#filledNegs = true;
    let n;
    while (n = this.#negs.pop()) {
      if (n.type !== "!")
        continue;
      let p = n;
      let pp = p.#parent;
      while (pp) {
        for (let i = p.#parentIndex + 1; !pp.type && i < pp.#parts.length; i++) {
          for (const part of n.#parts) {
            if (typeof part === "string") {
              throw new Error("string part in extglob AST??");
            }
            part.copyIn(pp.#parts[i]);
          }
        }
        p = pp;
        pp = p.#parent;
      }
    }
    return this;
  }
  push(...parts) {
    for (const p of parts) {
      if (p === "")
        continue;
      if (typeof p !== "string" && !(p instanceof _a && p.#parent === this)) {
        throw new Error("invalid part: " + p);
      }
      this.#parts.push(p);
    }
  }
  toJSON() {
    const ret = this.type === null ? this.#parts.slice().map((p) => typeof p === "string" ? p : p.toJSON()) : [this.type, ...this.#parts.map((p) => p.toJSON())];
    if (this.isStart() && !this.type)
      ret.unshift([]);
    if (this.isEnd() && (this === this.#root || this.#root.#filledNegs && this.#parent?.type === "!")) {
      ret.push({});
    }
    return ret;
  }
  isStart() {
    if (this.#root === this)
      return true;
    if (!this.#parent?.isStart())
      return false;
    if (this.#parentIndex === 0)
      return true;
    const p = this.#parent;
    for (let i = 0; i < this.#parentIndex; i++) {
      const pp = p.#parts[i];
      if (!(pp instanceof _a && pp.type === "!")) {
        return false;
      }
    }
    return true;
  }
  isEnd() {
    if (this.#root === this)
      return true;
    if (this.#parent?.type === "!")
      return true;
    if (!this.#parent?.isEnd())
      return false;
    if (!this.type)
      return this.#parent?.isEnd();
    const pl = this.#parent ? this.#parent.#parts.length : 0;
    return this.#parentIndex === pl - 1;
  }
  copyIn(part) {
    if (typeof part === "string")
      this.push(part);
    else
      this.push(part.clone(this));
  }
  clone(parent) {
    const c = new _a(this.type, parent);
    for (const p of this.#parts) {
      c.copyIn(p);
    }
    return c;
  }
  static #parseAST(str, ast, pos, opt, extDepth) {
    const maxDepth = opt.maxExtglobRecursion ?? 2;
    let escaping = false;
    let inBrace = false;
    let braceStart = -1;
    let braceNeg = false;
    if (ast.type === null) {
      let i2 = pos;
      let acc2 = "";
      while (i2 < str.length) {
        const c = str.charAt(i2++);
        if (escaping || c === "\\") {
          escaping = !escaping;
          acc2 += c;
          continue;
        }
        if (inBrace) {
          if (i2 === braceStart + 1) {
            if (c === "^" || c === "!") {
              braceNeg = true;
            }
          } else if (c === "]" && !(i2 === braceStart + 2 && braceNeg)) {
            inBrace = false;
          }
          acc2 += c;
          continue;
        } else if (c === "[") {
          inBrace = true;
          braceStart = i2;
          braceNeg = false;
          acc2 += c;
          continue;
        }
        const doRecurse = !opt.noext && isExtglobType(c) && str.charAt(i2) === "(" && extDepth <= maxDepth;
        if (doRecurse) {
          ast.push(acc2);
          acc2 = "";
          const ext2 = new _a(c, ast);
          i2 = _a.#parseAST(str, ext2, i2, opt, extDepth + 1);
          ast.push(ext2);
          continue;
        }
        acc2 += c;
      }
      ast.push(acc2);
      return i2;
    }
    let i = pos + 1;
    let part = new _a(null, ast);
    const parts = [];
    let acc = "";
    while (i < str.length) {
      const c = str.charAt(i++);
      if (escaping || c === "\\") {
        escaping = !escaping;
        acc += c;
        continue;
      }
      if (inBrace) {
        if (i === braceStart + 1) {
          if (c === "^" || c === "!") {
            braceNeg = true;
          }
        } else if (c === "]" && !(i === braceStart + 2 && braceNeg)) {
          inBrace = false;
        }
        acc += c;
        continue;
      } else if (c === "[") {
        inBrace = true;
        braceStart = i;
        braceNeg = false;
        acc += c;
        continue;
      }
      const doRecurse = !opt.noext && isExtglobType(c) && str.charAt(i) === "(" && /* c8 ignore start - the maxDepth is sufficient here */
      (extDepth <= maxDepth || ast && ast.#canAdoptType(c));
      if (doRecurse) {
        const depthAdd = ast && ast.#canAdoptType(c) ? 0 : 1;
        part.push(acc);
        acc = "";
        const ext2 = new _a(c, part);
        part.push(ext2);
        i = _a.#parseAST(str, ext2, i, opt, extDepth + depthAdd);
        continue;
      }
      if (c === "|") {
        part.push(acc);
        acc = "";
        parts.push(part);
        part = new _a(null, ast);
        continue;
      }
      if (c === ")") {
        if (acc === "" && ast.#parts.length === 0) {
          ast.#emptyExt = true;
        }
        part.push(acc);
        acc = "";
        ast.push(...parts, part);
        return i;
      }
      acc += c;
    }
    ast.type = null;
    ast.#hasMagic = void 0;
    ast.#parts = [str.substring(pos - 1)];
    return i;
  }
  #canAdoptWithSpace(child) {
    return this.#canAdopt(child, adoptionWithSpaceMap);
  }
  #canAdopt(child, map = adoptionMap) {
    if (!child || typeof child !== "object" || child.type !== null || child.#parts.length !== 1 || this.type === null) {
      return false;
    }
    const gc = child.#parts[0];
    if (!gc || typeof gc !== "object" || gc.type === null) {
      return false;
    }
    return this.#canAdoptType(gc.type, map);
  }
  #canAdoptType(c, map = adoptionAnyMap) {
    return !!map.get(this.type)?.includes(c);
  }
  #adoptWithSpace(child, index) {
    const gc = child.#parts[0];
    const blank = new _a(null, gc, this.options);
    blank.#parts.push("");
    gc.push(blank);
    this.#adopt(child, index);
  }
  #adopt(child, index) {
    const gc = child.#parts[0];
    this.#parts.splice(index, 1, ...gc.#parts);
    for (const p of gc.#parts) {
      if (typeof p === "object")
        p.#parent = this;
    }
    this.#toString = void 0;
  }
  #canUsurpType(c) {
    const m = usurpMap.get(this.type);
    return !!m?.has(c);
  }
  #canUsurp(child) {
    if (!child || typeof child !== "object" || child.type !== null || child.#parts.length !== 1 || this.type === null || this.#parts.length !== 1) {
      return false;
    }
    const gc = child.#parts[0];
    if (!gc || typeof gc !== "object" || gc.type === null) {
      return false;
    }
    return this.#canUsurpType(gc.type);
  }
  #usurp(child) {
    const m = usurpMap.get(this.type);
    const gc = child.#parts[0];
    const nt = m?.get(gc.type);
    if (!nt)
      return false;
    this.#parts = gc.#parts;
    for (const p of this.#parts) {
      if (typeof p === "object") {
        p.#parent = this;
      }
    }
    this.type = nt;
    this.#toString = void 0;
    this.#emptyExt = false;
  }
  static fromGlob(pattern, options = {}) {
    const ast = new _a(null, void 0, options);
    _a.#parseAST(pattern, ast, 0, options, 0);
    return ast;
  }
  // returns the regular expression if there's magic, or the unescaped
  // string if not.
  toMMPattern() {
    if (this !== this.#root)
      return this.#root.toMMPattern();
    const glob = this.toString();
    const [re, body, hasMagic, uflag] = this.toRegExpSource();
    const anyMagic = hasMagic || this.#hasMagic || this.#options.nocase && !this.#options.nocaseMagicOnly && glob.toUpperCase() !== glob.toLowerCase();
    if (!anyMagic) {
      return body;
    }
    const flags = (this.#options.nocase ? "i" : "") + (uflag ? "u" : "");
    return Object.assign(new RegExp(`^${re}$`, flags), {
      _src: re,
      _glob: glob
    });
  }
  get options() {
    return this.#options;
  }
  // returns the string match, the regexp source, whether there's magic
  // in the regexp (so a regular expression is required) and whether or
  // not the uflag is needed for the regular expression (for posix classes)
  // TODO: instead of injecting the start/end at this point, just return
  // the BODY of the regexp, along with the start/end portions suitable
  // for binding the start/end in either a joined full-path makeRe context
  // (where we bind to (^|/), or a standalone matchPart context (where
  // we bind to ^, and not /).  Otherwise slashes get duped!
  //
  // In part-matching mode, the start is:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: ^(?!\.\.?$)
  // - if dots allowed or not possible: ^
  // - if dots possible and not allowed: ^(?!\.)
  // end is:
  // - if not isEnd(): nothing
  // - else: $
  //
  // In full-path matching mode, we put the slash at the START of the
  // pattern, so start is:
  // - if first pattern: same as part-matching mode
  // - if not isStart(): nothing
  // - if traversal possible, but not allowed: /(?!\.\.?(?:$|/))
  // - if dots allowed or not possible: /
  // - if dots possible and not allowed: /(?!\.)
  // end is:
  // - if last pattern, same as part-matching mode
  // - else nothing
  //
  // Always put the (?:$|/) on negated tails, though, because that has to be
  // there to bind the end of the negated pattern portion, and it's easier to
  // just stick it in now rather than try to inject it later in the middle of
  // the pattern.
  //
  // We can just always return the same end, and leave it up to the caller
  // to know whether it's going to be used joined or in parts.
  // And, if the start is adjusted slightly, can do the same there:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: (?:/|^)(?!\.\.?$)
  // - if dots allowed or not possible: (?:/|^)
  // - if dots possible and not allowed: (?:/|^)(?!\.)
  //
  // But it's better to have a simpler binding without a conditional, for
  // performance, so probably better to return both start options.
  //
  // Then the caller just ignores the end if it's not the first pattern,
  // and the start always gets applied.
  //
  // But that's always going to be $ if it's the ending pattern, or nothing,
  // so the caller can just attach $ at the end of the pattern when building.
  //
  // So the todo is:
  // - better detect what kind of start is needed
  // - return both flavors of starting pattern
  // - attach $ at the end of the pattern when creating the actual RegExp
  //
  // Ah, but wait, no, that all only applies to the root when the first pattern
  // is not an extglob. If the first pattern IS an extglob, then we need all
  // that dot prevention biz to live in the extglob portions, because eg
  // +(*|.x*) can match .xy but not .yx.
  //
  // So, return the two flavors if it's #root and the first child is not an
  // AST, otherwise leave it to the child AST to handle it, and there,
  // use the (?:^|/) style of start binding.
  //
  // Even simplified further:
  // - Since the start for a join is eg /(?!\.) and the start for a part
  // is ^(?!\.), we can just prepend (?!\.) to the pattern (either root
  // or start or whatever) and prepend ^ or / at the Regexp construction.
  toRegExpSource(allowDot) {
    const dot = allowDot ?? !!this.#options.dot;
    if (this.#root === this) {
      this.#flatten();
      this.#fillNegs();
    }
    if (!isExtglobAST(this)) {
      const noEmpty = this.isStart() && this.isEnd() && !this.#parts.some((s) => typeof s !== "string");
      const src = this.#parts.map((p) => {
        const [re, _, hasMagic, uflag] = typeof p === "string" ? _a.#parseGlob(p, this.#hasMagic, noEmpty) : p.toRegExpSource(allowDot);
        this.#hasMagic = this.#hasMagic || hasMagic;
        this.#uflag = this.#uflag || uflag;
        return re;
      }).join("");
      let start2 = "";
      if (this.isStart()) {
        if (typeof this.#parts[0] === "string") {
          const dotTravAllowed = this.#parts.length === 1 && justDots.has(this.#parts[0]);
          if (!dotTravAllowed) {
            const aps = addPatternStart;
            const needNoTrav = (
              // dots are allowed, and the pattern starts with [ or .
              dot && aps.has(src.charAt(0)) || // the pattern starts with \., and then [ or .
              src.startsWith("\\.") && aps.has(src.charAt(2)) || // the pattern starts with \.\., and then [ or .
              src.startsWith("\\.\\.") && aps.has(src.charAt(4))
            );
            const needNoDot = !dot && !allowDot && aps.has(src.charAt(0));
            start2 = needNoTrav ? startNoTraversal : needNoDot ? startNoDot : "";
          }
        }
      }
      let end = "";
      if (this.isEnd() && this.#root.#filledNegs && this.#parent?.type === "!") {
        end = "(?:$|\\/)";
      }
      const final2 = start2 + src + end;
      return [
        final2,
        unescape(src),
        this.#hasMagic = !!this.#hasMagic,
        this.#uflag
      ];
    }
    const repeated = this.type === "*" || this.type === "+";
    const start = this.type === "!" ? "(?:(?!(?:" : "(?:";
    let body = this.#partsToRegExp(dot);
    if (this.isStart() && this.isEnd() && !body && this.type !== "!") {
      const s = this.toString();
      const me = this;
      me.#parts = [s];
      me.type = null;
      me.#hasMagic = void 0;
      return [s, unescape(this.toString()), false, false];
    }
    let bodyDotAllowed = !repeated || allowDot || dot || !startNoDot ? "" : this.#partsToRegExp(true);
    if (bodyDotAllowed === body) {
      bodyDotAllowed = "";
    }
    if (bodyDotAllowed) {
      body = `(?:${body})(?:${bodyDotAllowed})*?`;
    }
    let final = "";
    if (this.type === "!" && this.#emptyExt) {
      final = (this.isStart() && !dot ? startNoDot : "") + starNoEmpty;
    } else {
      const close = this.type === "!" ? (
        // !() must match something,but !(x) can match ''
        "))" + (this.isStart() && !dot && !allowDot ? startNoDot : "") + star + ")"
      ) : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && bodyDotAllowed ? ")" : this.type === "*" && bodyDotAllowed ? `)?` : `)${this.type}`;
      final = start + body + close;
    }
    return [
      final,
      unescape(body),
      this.#hasMagic = !!this.#hasMagic,
      this.#uflag
    ];
  }
  #flatten() {
    if (!isExtglobAST(this)) {
      for (const p of this.#parts) {
        if (typeof p === "object") {
          p.#flatten();
        }
      }
    } else {
      let iterations = 0;
      let done = false;
      do {
        done = true;
        for (let i = 0; i < this.#parts.length; i++) {
          const c = this.#parts[i];
          if (typeof c === "object") {
            c.#flatten();
            if (this.#canAdopt(c)) {
              done = false;
              this.#adopt(c, i);
            } else if (this.#canAdoptWithSpace(c)) {
              done = false;
              this.#adoptWithSpace(c, i);
            } else if (this.#canUsurp(c)) {
              done = false;
              this.#usurp(c);
            }
          }
        }
      } while (!done && ++iterations < 10);
    }
    this.#toString = void 0;
  }
  #partsToRegExp(dot) {
    return this.#parts.map((p) => {
      if (typeof p === "string") {
        throw new Error("string type in extglob ast??");
      }
      const [re, _, _hasMagic, uflag] = p.toRegExpSource(dot);
      this.#uflag = this.#uflag || uflag;
      return re;
    }).filter((p) => !(this.isStart() && this.isEnd()) || !!p).join("|");
  }
  static #parseGlob(glob, hasMagic, noEmpty = false) {
    let escaping = false;
    let re = "";
    let uflag = false;
    let inStar = false;
    for (let i = 0; i < glob.length; i++) {
      const c = glob.charAt(i);
      if (escaping) {
        escaping = false;
        re += (reSpecials.has(c) ? "\\" : "") + c;
        continue;
      }
      if (c === "*") {
        if (inStar)
          continue;
        inStar = true;
        re += noEmpty && /^[*]+$/.test(glob) ? starNoEmpty : star;
        hasMagic = true;
        continue;
      } else {
        inStar = false;
      }
      if (c === "\\") {
        if (i === glob.length - 1) {
          re += "\\\\";
        } else {
          escaping = true;
        }
        continue;
      }
      if (c === "[") {
        const [src, needUflag, consumed, magic] = parseClass(glob, i);
        if (consumed) {
          re += src;
          uflag = uflag || needUflag;
          i += consumed - 1;
          hasMagic = hasMagic || magic;
          continue;
        }
      }
      if (c === "?") {
        re += qmark;
        hasMagic = true;
        continue;
      }
      re += regExpEscape(c);
    }
    return [re, unescape(glob), !!hasMagic, uflag];
  }
};
_a = AST;

// node_modules/.pnpm/minimatch@10.2.6/node_modules/minimatch/dist/esm/escape.js
init_esm_shims();
var escape = (s, { windowsPathsNoEscape = false, magicalBraces = false } = {}) => {
  if (magicalBraces) {
    return windowsPathsNoEscape ? s.replace(/[?*()[\]{}]/g, "[$&]") : s.replace(/[?*()[\]\\{}]/g, "\\$&");
  }
  return windowsPathsNoEscape ? s.replace(/[?*()[\]]/g, "[$&]") : s.replace(/[?*()[\]\\]/g, "\\$&");
};

// node_modules/.pnpm/minimatch@10.2.6/node_modules/minimatch/dist/esm/index.js
var minimatch = (p, pattern, options = {}) => {
  assertValidPattern(pattern);
  if (!options.nocomment && pattern.charAt(0) === "#") {
    return false;
  }
  return new Minimatch(pattern, options).match(p);
};
var starDotExtRE = /^\*+([^+@!?*[(]*)$/;
var starDotExtTest = (ext2) => (f) => !f.startsWith(".") && f.endsWith(ext2);
var starDotExtTestDot = (ext2) => (f) => f.endsWith(ext2);
var starDotExtTestNocase = (ext2) => {
  ext2 = ext2.toLowerCase();
  return (f) => !f.startsWith(".") && f.toLowerCase().endsWith(ext2);
};
var starDotExtTestNocaseDot = (ext2) => {
  ext2 = ext2.toLowerCase();
  return (f) => f.toLowerCase().endsWith(ext2);
};
var starDotStarRE = /^\*+\.\*+$/;
var starDotStarTest = (f) => !f.startsWith(".") && f.includes(".");
var starDotStarTestDot = (f) => f !== "." && f !== ".." && f.includes(".");
var dotStarRE = /^\.\*+$/;
var dotStarTest = (f) => f !== "." && f !== ".." && f.startsWith(".");
var starRE = /^\*+$/;
var starTest = (f) => f.length !== 0 && !f.startsWith(".");
var starTestDot = (f) => f.length !== 0 && f !== "." && f !== "..";
var qmarksRE = /^\?+([^+@!?*[(]*)?$/;
var qmarksTestNocase = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExt([$0]);
  if (!ext2)
    return noext;
  ext2 = ext2.toLowerCase();
  return (f) => noext(f) && f.toLowerCase().endsWith(ext2);
};
var qmarksTestNocaseDot = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExtDot([$0]);
  if (!ext2)
    return noext;
  ext2 = ext2.toLowerCase();
  return (f) => noext(f) && f.toLowerCase().endsWith(ext2);
};
var qmarksTestDot = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExtDot([$0]);
  return !ext2 ? noext : (f) => noext(f) && f.endsWith(ext2);
};
var qmarksTest = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExt([$0]);
  return !ext2 ? noext : (f) => noext(f) && f.endsWith(ext2);
};
var qmarksTestNoExt = ([$0]) => {
  const len = $0.length;
  return (f) => f.length === len && !f.startsWith(".");
};
var qmarksTestNoExtDot = ([$0]) => {
  const len = $0.length;
  return (f) => f.length === len && f !== "." && f !== "..";
};
var defaultPlatform = typeof process === "object" && process ? typeof process.env === "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix";
var path = {
  win32: { sep: "\\" },
  posix: { sep: "/" }
};
var sep = defaultPlatform === "win32" ? path.win32.sep : path.posix.sep;
minimatch.sep = sep;
var GLOBSTAR = /* @__PURE__ */ Symbol("globstar **");
minimatch.GLOBSTAR = GLOBSTAR;
var qmark2 = "[^/]";
var star2 = qmark2 + "*?";
var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
var filter = (pattern, options = {}) => (p) => minimatch(p, pattern, options);
minimatch.filter = filter;
var ext = (a, b = {}) => Object.assign({}, a, b);
var defaults = (def) => {
  if (!def || typeof def !== "object" || !Object.keys(def).length) {
    return minimatch;
  }
  const orig = minimatch;
  const m = (p, pattern, options = {}) => orig(p, pattern, ext(def, options));
  return Object.assign(m, {
    Minimatch: class Minimatch extends orig.Minimatch {
      constructor(pattern, options = {}) {
        super(pattern, ext(def, options));
      }
      static defaults(options) {
        return orig.defaults(ext(def, options)).Minimatch;
      }
    },
    AST: class AST extends orig.AST {
      /* c8 ignore start */
      constructor(type, parent, options = {}) {
        super(type, parent, ext(def, options));
      }
      /* c8 ignore stop */
      static fromGlob(pattern, options = {}) {
        return orig.AST.fromGlob(pattern, ext(def, options));
      }
    },
    unescape: (s, options = {}) => orig.unescape(s, ext(def, options)),
    escape: (s, options = {}) => orig.escape(s, ext(def, options)),
    filter: (pattern, options = {}) => orig.filter(pattern, ext(def, options)),
    defaults: (options) => orig.defaults(ext(def, options)),
    makeRe: (pattern, options = {}) => orig.makeRe(pattern, ext(def, options)),
    braceExpand: (pattern, options = {}) => orig.braceExpand(pattern, ext(def, options)),
    match: (list, pattern, options = {}) => orig.match(list, pattern, ext(def, options)),
    sep: orig.sep,
    GLOBSTAR
  });
};
minimatch.defaults = defaults;
var braceExpand = (pattern, options = {}) => {
  assertValidPattern(pattern);
  if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
    return [pattern];
  }
  return expand(pattern, { max: options.braceExpandMax });
};
minimatch.braceExpand = braceExpand;
var makeRe = (pattern, options = {}) => new Minimatch(pattern, options).makeRe();
minimatch.makeRe = makeRe;
var match = (list, pattern, options = {}) => {
  const mm = new Minimatch(pattern, options);
  list = list.filter((f) => mm.match(f));
  if (mm.options.nonull && !list.length) {
    list.push(pattern);
  }
  return list;
};
minimatch.match = match;
var globMagic = /[?*]|[+@!]\(.*?\)|\[|\]/;
var regExpEscape2 = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var Minimatch = class {
  options;
  set;
  pattern;
  windowsPathsNoEscape;
  nonegate;
  negate;
  comment;
  empty;
  preserveMultipleSlashes;
  partial;
  globSet;
  globParts;
  nocase;
  isWindows;
  platform;
  windowsNoMagicRoot;
  maxGlobstarRecursion;
  regexp;
  constructor(pattern, options = {}) {
    assertValidPattern(pattern);
    options = options || {};
    this.options = options;
    this.maxGlobstarRecursion = options.maxGlobstarRecursion ?? 200;
    this.pattern = pattern;
    this.platform = options.platform || defaultPlatform;
    this.isWindows = this.platform === "win32";
    const awe = "allowWindowsEscape";
    this.windowsPathsNoEscape = !!options.windowsPathsNoEscape || options[awe] === false;
    if (this.windowsPathsNoEscape) {
      this.pattern = this.pattern.replace(/\\/g, "/");
    }
    this.preserveMultipleSlashes = !!options.preserveMultipleSlashes;
    this.regexp = null;
    this.negate = false;
    this.nonegate = !!options.nonegate;
    this.comment = false;
    this.empty = false;
    this.partial = !!options.partial;
    this.nocase = !!this.options.nocase;
    this.windowsNoMagicRoot = options.windowsNoMagicRoot !== void 0 ? options.windowsNoMagicRoot : !!(this.isWindows && this.nocase);
    this.globSet = [];
    this.globParts = [];
    this.set = [];
    this.make();
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1) {
      return true;
    }
    for (const pattern of this.set) {
      for (const part of pattern) {
        if (typeof part !== "string")
          return true;
      }
    }
    return false;
  }
  debug(..._) {
  }
  make() {
    const pattern = this.pattern;
    const options = this.options;
    if (!options.nocomment && pattern.charAt(0) === "#") {
      this.comment = true;
      return;
    }
    if (!pattern) {
      this.empty = true;
      return;
    }
    this.parseNegate();
    this.globSet = [...new Set(this.braceExpand())];
    if (options.debug) {
      this.debug = (...args) => console.error(...args);
    }
    this.debug(this.pattern, this.globSet);
    const rawGlobParts = this.globSet.map((s) => this.slashSplit(s));
    this.globParts = this.preprocess(rawGlobParts);
    this.debug(this.pattern, this.globParts);
    let set = this.globParts.map((s, _, __) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        const isUNC = s[0] === "" && s[1] === "" && (s[2] === "?" || !globMagic.test(s[2])) && !globMagic.test(s[3]);
        const isDrive = /^[a-z]:/i.test(s[0]);
        if (isUNC) {
          return [
            ...s.slice(0, 4),
            ...s.slice(4).map((ss) => this.parse(ss))
          ];
        } else if (isDrive) {
          return [s[0], ...s.slice(1).map((ss) => this.parse(ss))];
        }
      }
      return s.map((ss) => this.parse(ss));
    });
    this.debug(this.pattern, set);
    this.set = set.filter((s) => s.indexOf(false) === -1);
    if (this.isWindows) {
      for (let i = 0; i < this.set.length; i++) {
        const p = this.set[i];
        if (p[0] === "" && p[1] === "" && this.globParts[i][2] === "?" && typeof p[3] === "string" && /^[a-z]:$/i.test(p[3])) {
          p[2] = "?";
        }
      }
    }
    this.debug(this.pattern, this.set);
  }
  // various transforms to equivalent pattern sets that are
  // faster to process in a filesystem walk.  The goal is to
  // eliminate what we can, and push all ** patterns as far
  // to the right as possible, even if it increases the number
  // of patterns that we have to process.
  preprocess(globParts) {
    if (this.options.noglobstar) {
      for (const partset of globParts) {
        for (let j = 0; j < partset.length; j++) {
          if (partset[j] === "**") {
            partset[j] = "*";
          }
        }
      }
    }
    const { optimizationLevel = 1 } = this.options;
    if (optimizationLevel >= 2) {
      globParts = this.firstPhasePreProcess(globParts);
      globParts = this.secondPhasePreProcess(globParts);
    } else if (optimizationLevel >= 1) {
      globParts = this.levelOneOptimize(globParts);
    } else {
      globParts = this.adjascentGlobstarOptimize(globParts);
    }
    return globParts;
  }
  // just get rid of adjascent ** portions
  adjascentGlobstarOptimize(globParts) {
    return globParts.map((parts) => {
      let gs = -1;
      while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
        let i = gs;
        while (parts[i + 1] === "**") {
          i++;
        }
        if (i !== gs) {
          parts.splice(gs, i - gs);
        }
      }
      return parts;
    });
  }
  // get rid of adjascent ** and resolve .. portions
  levelOneOptimize(globParts) {
    return globParts.map((parts) => {
      parts = parts.reduce((set, part) => {
        const prev = set[set.length - 1];
        if (part === "**" && prev === "**") {
          return set;
        }
        if (part === "..") {
          if (prev && prev !== ".." && prev !== "." && prev !== "**") {
            set.pop();
            return set;
          }
        }
        set.push(part);
        return set;
      }, []);
      return parts.length === 0 ? [""] : parts;
    });
  }
  levelTwoFileOptimize(parts) {
    if (!Array.isArray(parts)) {
      parts = this.slashSplit(parts);
    }
    let didSomething = false;
    do {
      didSomething = false;
      if (!this.preserveMultipleSlashes) {
        for (let i = 1; i < parts.length - 1; i++) {
          const p = parts[i];
          if (i === 1 && p === "" && parts[0] === "")
            continue;
          if (p === "." || p === "") {
            didSomething = true;
            parts.splice(i, 1);
            i--;
          }
        }
        if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
          didSomething = true;
          parts.pop();
        }
      }
      let dd = 0;
      while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
        const p = parts[dd - 1];
        if (p && p !== "." && p !== ".." && p !== "**" && !(this.isWindows && /^[a-z]:$/i.test(p))) {
          didSomething = true;
          parts.splice(dd - 1, 2);
          dd -= 2;
        }
      }
    } while (didSomething);
    return parts.length === 0 ? [""] : parts;
  }
  // First phase: single-pattern processing
  // <pre> is 1 or more portions
  // <rest> is 1 or more portions
  // <p> is any portion other than ., .., '', or **
  // <e> is . or ''
  //
  // **/.. is *brutal* for filesystem walking performance, because
  // it effectively resets the recursive walk each time it occurs,
  // and ** cannot be reduced out by a .. pattern part like a regexp
  // or most strings (other than .., ., and '') can be.
  //
  // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
  // <pre>/<e>/<rest> -> <pre>/<rest>
  // <pre>/<p>/../<rest> -> <pre>/<rest>
  // **/**/<rest> -> **/<rest>
  //
  // **/*/<rest> -> */**/<rest> <== not valid because ** doesn't follow
  // this WOULD be allowed if ** did follow symlinks, or * didn't
  firstPhasePreProcess(globParts) {
    let didSomething = false;
    do {
      didSomething = false;
      for (let parts of globParts) {
        let gs = -1;
        while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
          let gss = gs;
          while (parts[gss + 1] === "**") {
            gss++;
          }
          if (gss > gs) {
            parts.splice(gs + 1, gss - gs);
          }
          let next = parts[gs + 1];
          const p = parts[gs + 2];
          const p2 = parts[gs + 3];
          if (next !== "..")
            continue;
          if (!p || p === "." || p === ".." || !p2 || p2 === "." || p2 === "..") {
            continue;
          }
          didSomething = true;
          parts.splice(gs, 1);
          const other = parts.slice(0);
          other[gs] = "**";
          globParts.push(other);
          gs--;
        }
        if (!this.preserveMultipleSlashes) {
          for (let i = 1; i < parts.length - 1; i++) {
            const p = parts[i];
            if (i === 1 && p === "" && parts[0] === "")
              continue;
            if (p === "." || p === "") {
              didSomething = true;
              parts.splice(i, 1);
              i--;
            }
          }
          if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
            didSomething = true;
            parts.pop();
          }
        }
        let dd = 0;
        while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
          const p = parts[dd - 1];
          if (p && p !== "." && p !== ".." && p !== "**") {
            didSomething = true;
            const needDot = dd === 1 && parts[dd + 1] === "**";
            const splin = needDot ? ["."] : [];
            parts.splice(dd - 1, 2, ...splin);
            if (parts.length === 0)
              parts.push("");
            dd -= 2;
          }
        }
      }
    } while (didSomething);
    return globParts;
  }
  // second phase: multi-pattern dedupes
  // {<pre>/*/<rest>,<pre>/<p>/<rest>} -> <pre>/*/<rest>
  // {<pre>/<rest>,<pre>/<rest>} -> <pre>/<rest>
  // {<pre>/**/<rest>,<pre>/<rest>} -> <pre>/**/<rest>
  //
  // {<pre>/**/<rest>,<pre>/**/<p>/<rest>} -> <pre>/**/<rest>
  // ^-- not valid because ** doens't follow symlinks
  secondPhasePreProcess(globParts) {
    for (let i = 0; i < globParts.length - 1; i++) {
      for (let j = i + 1; j < globParts.length; j++) {
        const matched = this.partsMatch(globParts[i], globParts[j], !this.preserveMultipleSlashes);
        if (matched) {
          globParts[i] = [];
          globParts[j] = matched;
          break;
        }
      }
    }
    return globParts.filter((gs) => gs.length);
  }
  partsMatch(a, b, emptyGSMatch = false) {
    let ai = 0;
    let bi = 0;
    let result = [];
    let which = "";
    while (ai < a.length && bi < b.length) {
      if (a[ai] === b[bi]) {
        result.push(which === "b" ? b[bi] : a[ai]);
        ai++;
        bi++;
      } else if (emptyGSMatch && a[ai] === "**" && b[bi] === a[ai + 1]) {
        result.push(a[ai]);
        ai++;
      } else if (emptyGSMatch && b[bi] === "**" && a[ai] === b[bi + 1]) {
        result.push(b[bi]);
        bi++;
      } else if (a[ai] === "*" && b[bi] && (this.options.dot || !b[bi].startsWith(".")) && b[bi] !== "**") {
        if (which === "b")
          return false;
        which = "a";
        result.push(a[ai]);
        ai++;
        bi++;
      } else if (b[bi] === "*" && a[ai] && (this.options.dot || !a[ai].startsWith(".")) && a[ai] !== "**") {
        if (which === "a")
          return false;
        which = "b";
        result.push(b[bi]);
        ai++;
        bi++;
      } else {
        return false;
      }
    }
    return a.length === b.length && result;
  }
  parseNegate() {
    if (this.nonegate)
      return;
    const pattern = this.pattern;
    let negate = false;
    let negateOffset = 0;
    for (let i = 0; i < pattern.length && pattern.charAt(i) === "!"; i++) {
      negate = !negate;
      negateOffset++;
    }
    if (negateOffset)
      this.pattern = pattern.slice(negateOffset);
    this.negate = negate;
  }
  // set partial to true to test if, for example,
  // "/a/b" matches the start of "/*/b/*/d"
  // Partial means, if you run out of file before you run
  // out of pattern, then that's fine, as long as all
  // the parts match.
  matchOne(file, pattern, partial = false) {
    let fileStartIndex = 0;
    let patternStartIndex = 0;
    if (this.isWindows) {
      const fileDrive = typeof file[0] === "string" && /^[a-z]:$/i.test(file[0]);
      const fileUNC = !fileDrive && file[0] === "" && file[1] === "" && file[2] === "?" && /^[a-z]:$/i.test(file[3]);
      const patternDrive = typeof pattern[0] === "string" && /^[a-z]:$/i.test(pattern[0]);
      const patternUNC = !patternDrive && pattern[0] === "" && pattern[1] === "" && pattern[2] === "?" && typeof pattern[3] === "string" && /^[a-z]:$/i.test(pattern[3]);
      const fdi = fileUNC ? 3 : fileDrive ? 0 : void 0;
      const pdi = patternUNC ? 3 : patternDrive ? 0 : void 0;
      if (typeof fdi === "number" && typeof pdi === "number") {
        const [fd, pd] = [
          file[fdi],
          pattern[pdi]
        ];
        if (fd.toLowerCase() === pd.toLowerCase()) {
          pattern[pdi] = fd;
          patternStartIndex = pdi;
          fileStartIndex = fdi;
        }
      }
    }
    const { optimizationLevel = 1 } = this.options;
    if (optimizationLevel >= 2) {
      file = this.levelTwoFileOptimize(file);
    }
    if (pattern.includes(GLOBSTAR)) {
      return this.#matchGlobstar(file, pattern, partial, fileStartIndex, patternStartIndex);
    }
    return this.#matchOne(file, pattern, partial, fileStartIndex, patternStartIndex);
  }
  #matchGlobstar(file, pattern, partial, fileIndex, patternIndex) {
    const firstgs = pattern.indexOf(GLOBSTAR, patternIndex);
    const lastgs = pattern.lastIndexOf(GLOBSTAR);
    const [head, body, tail] = partial ? [
      pattern.slice(patternIndex, firstgs),
      pattern.slice(firstgs + 1),
      []
    ] : [
      pattern.slice(patternIndex, firstgs),
      pattern.slice(firstgs + 1, lastgs),
      pattern.slice(lastgs + 1)
    ];
    if (head.length) {
      const fileHead = file.slice(fileIndex, fileIndex + head.length);
      if (!this.#matchOne(fileHead, head, partial, 0, 0)) {
        return false;
      }
      fileIndex += head.length;
      patternIndex += head.length;
    }
    let fileTailMatch = 0;
    if (tail.length) {
      if (tail.length + fileIndex > file.length)
        return false;
      let tailStart = file.length - tail.length;
      if (this.#matchOne(file, tail, partial, tailStart, 0)) {
        fileTailMatch = tail.length;
      } else {
        if (file[file.length - 1] !== "" || fileIndex + tail.length === file.length) {
          return false;
        }
        tailStart--;
        if (!this.#matchOne(file, tail, partial, tailStart, 0)) {
          return false;
        }
        fileTailMatch = tail.length + 1;
      }
    }
    if (!body.length) {
      let sawSome = !!fileTailMatch;
      for (let i2 = fileIndex; i2 < file.length - fileTailMatch; i2++) {
        const f = String(file[i2]);
        sawSome = true;
        if (f === "." || f === ".." || !this.options.dot && f.startsWith(".")) {
          return false;
        }
      }
      return partial || sawSome;
    }
    const bodySegments = [[[], 0]];
    let currentBody = bodySegments[0];
    let nonGsParts = 0;
    const nonGsPartsSums = [0];
    for (const b of body) {
      if (b === GLOBSTAR) {
        nonGsPartsSums.push(nonGsParts);
        currentBody = [[], 0];
        bodySegments.push(currentBody);
      } else {
        currentBody[0].push(b);
        nonGsParts++;
      }
    }
    let i = bodySegments.length - 1;
    const fileLength = file.length - fileTailMatch;
    for (const b of bodySegments) {
      b[1] = fileLength - (nonGsPartsSums[i--] + b[0].length);
    }
    return !!this.#matchGlobStarBodySections(file, bodySegments, fileIndex, 0, partial, 0, !!fileTailMatch);
  }
  // return false for "nope, not matching"
  // return null for "not matching, cannot keep trying"
  #matchGlobStarBodySections(file, bodySegments, fileIndex, bodyIndex, partial, globStarDepth, sawTail) {
    const bs = bodySegments[bodyIndex];
    if (!bs) {
      for (let i = fileIndex; i < file.length; i++) {
        sawTail = true;
        const f = file[i];
        if (f === "." || f === ".." || !this.options.dot && f.startsWith(".")) {
          return false;
        }
      }
      return sawTail;
    }
    const [body, after] = bs;
    while (fileIndex <= after) {
      const m = this.#matchOne(file.slice(0, fileIndex + body.length), body, partial, fileIndex, 0);
      if (m && globStarDepth < this.maxGlobstarRecursion) {
        const sub = this.#matchGlobStarBodySections(file, bodySegments, fileIndex + body.length, bodyIndex + 1, partial, globStarDepth + 1, sawTail);
        if (sub !== false) {
          return sub;
        }
      }
      const f = file[fileIndex];
      if (f === "." || f === ".." || !this.options.dot && f.startsWith(".")) {
        return false;
      }
      fileIndex++;
    }
    return partial || null;
  }
  #matchOne(file, pattern, partial, fileIndex, patternIndex) {
    let fi;
    let pi;
    let pl;
    let fl;
    for (fi = fileIndex, pi = patternIndex, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
      this.debug("matchOne loop");
      let p = pattern[pi];
      let f = file[fi];
      this.debug(pattern, p, f);
      if (p === false || p === GLOBSTAR) {
        return false;
      }
      let hit;
      if (typeof p === "string") {
        hit = f === p;
        this.debug("string match", p, f, hit);
      } else {
        hit = p.test(f);
        this.debug("pattern match", p, f, hit);
      }
      if (!hit)
        return false;
    }
    if (fi === fl && pi === pl) {
      return true;
    } else if (fi === fl) {
      return partial;
    } else if (pi === pl) {
      return fi === fl - 1 && file[fi] === "";
    } else {
      throw new Error("wtf?");
    }
  }
  braceExpand() {
    return braceExpand(this.pattern, this.options);
  }
  parse(pattern) {
    assertValidPattern(pattern);
    const options = this.options;
    if (pattern === "**")
      return GLOBSTAR;
    if (pattern === "")
      return "";
    let m;
    let fastTest = null;
    if (m = pattern.match(starRE)) {
      fastTest = options.dot ? starTestDot : starTest;
    } else if (m = pattern.match(starDotExtRE)) {
      fastTest = (options.nocase ? options.dot ? starDotExtTestNocaseDot : starDotExtTestNocase : options.dot ? starDotExtTestDot : starDotExtTest)(m[1]);
    } else if (m = pattern.match(qmarksRE)) {
      fastTest = (options.nocase ? options.dot ? qmarksTestNocaseDot : qmarksTestNocase : options.dot ? qmarksTestDot : qmarksTest)(m);
    } else if (m = pattern.match(starDotStarRE)) {
      fastTest = options.dot ? starDotStarTestDot : starDotStarTest;
    } else if (m = pattern.match(dotStarRE)) {
      fastTest = dotStarTest;
    }
    const re = AST.fromGlob(pattern, this.options).toMMPattern();
    if (fastTest && typeof re === "object") {
      Reflect.defineProperty(re, "test", { value: fastTest });
    }
    return re;
  }
  makeRe() {
    if (this.regexp || this.regexp === false)
      return this.regexp;
    const set = this.set;
    if (!set.length) {
      this.regexp = false;
      return this.regexp;
    }
    const options = this.options;
    const twoStar = options.noglobstar ? star2 : options.dot ? twoStarDot : twoStarNoDot;
    const flags = new Set(options.nocase ? ["i"] : []);
    let re = set.map((pattern) => {
      const pp = pattern.map((p) => {
        if (p instanceof RegExp) {
          for (const f of p.flags.split(""))
            flags.add(f);
        }
        return typeof p === "string" ? regExpEscape2(p) : p === GLOBSTAR ? GLOBSTAR : p._src;
      });
      pp.forEach((p, i) => {
        const next = pp[i + 1];
        const prev = pp[i - 1];
        if (p !== GLOBSTAR || prev === GLOBSTAR) {
          return;
        }
        if (prev === void 0) {
          if (next !== void 0 && next !== GLOBSTAR) {
            pp[i + 1] = "(?:\\/|" + twoStar + "\\/)?" + next;
          } else {
            pp[i] = twoStar;
          }
        } else if (next === void 0) {
          pp[i - 1] = prev + "(?:\\/|\\/" + twoStar + ")?";
        } else if (next !== GLOBSTAR) {
          pp[i - 1] = prev + "(?:\\/|\\/" + twoStar + "\\/)" + next;
          pp[i + 1] = GLOBSTAR;
        }
      });
      const filtered = pp.filter((p) => p !== GLOBSTAR);
      if (this.partial && filtered.length >= 1) {
        const prefixes = [];
        for (let i = 1; i <= filtered.length; i++) {
          prefixes.push(filtered.slice(0, i).join("/"));
        }
        return "(?:" + prefixes.join("|") + ")";
      }
      return filtered.join("/");
    }).join("|");
    const [open2, close] = set.length > 1 ? ["(?:", ")"] : ["", ""];
    re = "^" + open2 + re + close + "$";
    if (this.partial) {
      re = "^(?:\\/|" + open2 + re.slice(1, -1) + close + ")$";
    }
    if (this.negate)
      re = "^(?!" + re + ").+$";
    try {
      this.regexp = new RegExp(re, [...flags].join(""));
    } catch {
      this.regexp = false;
    }
    return this.regexp;
  }
  slashSplit(p) {
    if (this.preserveMultipleSlashes) {
      return p.split("/");
    } else if (this.isWindows && /^\/\/[^/]+/.test(p)) {
      return ["", ...p.split(/\/+/)];
    } else {
      return p.split(/\/+/);
    }
  }
  match(f, partial = this.partial) {
    this.debug("match", f, this.pattern);
    if (this.comment) {
      return false;
    }
    if (this.empty) {
      return f === "";
    }
    if (f === "/" && partial) {
      return true;
    }
    const options = this.options;
    if (this.isWindows) {
      f = f.split("\\").join("/");
    }
    const ff = this.slashSplit(f);
    this.debug(this.pattern, "split", ff);
    const set = this.set;
    this.debug(this.pattern, "set", set);
    let filename = ff[ff.length - 1];
    if (!filename) {
      for (let i = ff.length - 2; !filename && i >= 0; i--) {
        filename = ff[i];
      }
    }
    for (const pattern of set) {
      let file = ff;
      if (options.matchBase && pattern.length === 1) {
        file = [filename];
      }
      const hit = this.matchOne(file, pattern, partial);
      if (hit) {
        if (options.flipNegate) {
          return true;
        }
        return !this.negate;
      }
    }
    if (options.flipNegate) {
      return false;
    }
    return this.negate;
  }
  static defaults(def) {
    return minimatch.defaults(def).Minimatch;
  }
};
minimatch.AST = AST;
minimatch.Minimatch = Minimatch;
minimatch.escape = escape;
minimatch.unescape = unescape;

// src/rag/file-filter.ts
var import_yaml2 = __toESM(require_dist(), 1);
var BASE_EXTENSIONS = /* @__PURE__ */ new Set([".md", ".mdx", ".yaml", ".yml", ".json"]);
var BASE_BASENAME_INCLUDES = /* @__PURE__ */ new Set([
  "Dockerfile",
  "Makefile",
  "Gemfile",
  "Rakefile",
  "Procfile",
  "Vagrantfile",
  "Brewfile",
  "Justfile",
  ".dockerignore",
  ".editorconfig",
  ".npmrc",
  ".nvmrc",
  ".prettierrc",
  ".eslintignore",
  ".gitattributes"
]);
var HARD_LOCKFILE_EXCLUSIONS = /* @__PURE__ */ new Set([
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "composer.lock",
  "Gemfile.lock",
  "bun.lockb",
  "poetry.lock",
  "uv.lock",
  "gradle.lockfile",
  "Cargo.lock",
  "go.sum",
  "Pipfile.lock"
]);
var AI_TOOL_DIRS = /* @__PURE__ */ new Set([
  ".claude",
  ".codex",
  ".cursor",
  ".junie",
  ".roo",
  ".cline",
  ".windsurf"
]);
var FALLBACK_ADAPTER_FILES = /* @__PURE__ */ new Set(["CLAUDE.md", "AGENTS.md", "GEMINI.md"]);
var FRAMEWORK_DEFAULT_EXCLUDE_DIRECTORIES = [
  "node_modules",
  "vendor",
  ".venv",
  "venv",
  "env",
  "__pycache__",
  ".dart_tool",
  "Pods",
  ".gradle",
  ".m2",
  "target",
  "pkg",
  "_vendor",
  "dist",
  "build",
  "out",
  ".next",
  ".nuxt",
  ".svelte-kit",
  ".output",
  ".turbo",
  ".vercel",
  ".netlify",
  "bin",
  "obj",
  "DerivedData",
  ".pnpm-store",
  ".yarn",
  ".yarn-cache",
  ".npm",
  ".cache",
  ".sass-cache",
  ".parcel-cache",
  ".eslintcache",
  ".stylelintcache",
  ".rpt2_cache",
  ".git",
  ".svn",
  ".hg",
  ".bzr",
  "coverage",
  ".nyc_output",
  "htmlcov",
  ".pytest_cache",
  ".mypy_cache",
  ".tox",
  "__snapshots__",
  "_site",
  "storybook-static",
  ".docusaurus",
  "site",
  ".terraform",
  ".vagrant",
  ".idea",
  ".eclipse"
];
var DEFAULT_RAG_IGNORE_CONFIG = {
  version: 1,
  exclude: [],
  include: [],
  additional_extensions: [],
  additional_basename_includes: [],
  additional_named_file_exclusions: [],
  use_project_ignore_files: true,
  use_global_gitignore: false
};
var RAG_IGNORE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["version"],
  properties: {
    version: { type: "integer", const: 1 },
    exclude: { type: "array", items: { type: "string" } },
    include: { type: "array", items: { type: "string" } },
    additional_extensions: { type: "array", items: { type: "string" } },
    additional_basename_includes: { type: "array", items: { type: "string" } },
    additional_named_file_exclusions: { type: "array", items: { type: "string" } },
    use_project_ignore_files: { type: "boolean" },
    use_global_gitignore: { type: "boolean" }
  }
};
var ajv2 = new import_ajv2.default({ allErrors: true });
var validateRagIgnoreConfig = ajv2.compile(RAG_IGNORE_SCHEMA);
var RagFileFilter = class {
  constructor(options) {
    this.options = options;
    this.ragConfig = readRagIgnoreConfig(options.projectRoot);
    this.includeGlobs = compileConfigGlobs(this.ragConfig.include);
    this.excludeGlobs = compileConfigGlobs(this.ragConfig.exclude);
    this.extensionAllowlist = sortExtensionsDescending(
      /* @__PURE__ */ new Set([
        ...BASE_EXTENSIONS,
        ...options.packs.flatMap((pack) => pack.manifest.ast?.file_extensions ?? []),
        ...this.ragConfig.additional_extensions
      ])
    );
    this.namedBasenameIncludes = /* @__PURE__ */ new Set([
      ...BASE_BASENAME_INCLUDES,
      ...options.packs.flatMap((pack) => pack.manifest.rag?.basename_includes ?? []),
      ...this.ragConfig.additional_basename_includes
    ]);
    this.directoryExclusionSet = /* @__PURE__ */ new Set([
      ...FRAMEWORK_DEFAULT_EXCLUDE_DIRECTORIES,
      ...options.packs.flatMap((pack) => pack.manifest.rag?.exclude_directories ?? [])
    ]);
    this.adapterFileExclusionSet = readAdapterFileExclusions(options.projectRoot);
    this.hardNamedFileExclusionSet = /* @__PURE__ */ new Set([
      ...HARD_LOCKFILE_EXCLUSIONS,
      ...this.ragConfig.additional_named_file_exclusions,
      ...this.adapterFileExclusionSet
    ]);
    this.diagnosticsSnapshot = {
      extensionAllowlist: [...this.extensionAllowlist],
      namedBasenameIncludes: [...this.namedBasenameIncludes].sort(),
      directoryExclusionSet: [...this.directoryExclusionSet].sort(),
      hardNamedFileExclusionSet: [...this.hardNamedFileExclusionSet].sort()
    };
  }
  options;
  ragConfig;
  extensionAllowlist;
  namedBasenameIncludes;
  directoryExclusionSet;
  hardNamedFileExclusionSet;
  adapterFileExclusionSet;
  diagnosticsSnapshot;
  includeGlobs;
  excludeGlobs;
  _layer3RulesCache = null;
  async discoverFiles(onProgress) {
    onProgress?.({
      phase: "build",
      message: "Discovering repository files for RAG eligibility"
    });
    const discovered = await (0, import_fast_glob.default)("**/*", {
      cwd: this.options.projectRoot,
      absolute: true,
      dot: true,
      onlyFiles: true,
      followSymbolicLinks: false
    });
    const sorted = [...discovered].sort();
    const layer3IgnoreRules = await readIgnoreRules(this.options.projectRoot, this.ragConfig);
    const files = [];
    const stats = {
      total_discovered: sorted.length,
      excluded_layer1: 0,
      excluded_layer2: 0,
      excluded_layer3: 0,
      excluded_layer4: 0,
      passed: 0
    };
    onProgress?.({
      phase: "build",
      message: `Filtering ${sorted.length} discovered files with RAG rules`,
      loaded: 0,
      total: sorted.length,
      percent: 0
    });
    const progressInterval = Math.max(Math.min(Math.floor(sorted.length / 20), 2500), 500);
    for (const [index, absolutePath] of sorted.entries()) {
      const probe = await this.evaluateFile(absolutePath, layer3IgnoreRules);
      if (probe.excluded) {
        if (probe.layer === 1) stats.excluded_layer1 += 1;
        if (probe.layer === 2) stats.excluded_layer2 += 1;
        if (probe.layer === 3) stats.excluded_layer3 += 1;
        if (probe.layer === 4) stats.excluded_layer4 += 1;
      } else {
        stats.passed += 1;
        files.push(toPosixPath(absolutePath));
      }
      const processed = index + 1;
      if (processed % progressInterval === 0 || processed === sorted.length) {
        onProgress?.({
          phase: "build",
          message: `Filtered ${processed}/${sorted.length} files; ${stats.passed} remain eligible`,
          loaded: processed,
          total: sorted.length,
          percent: Math.round(processed / sorted.length * 100)
        });
      }
    }
    onProgress?.({
      phase: "build",
      message: `RAG file filtering kept ${stats.passed} eligible files`,
      loaded: sorted.length,
      total: sorted.length,
      percent: 100
    });
    return files;
  }
  filterDiagnostics() {
    return this.diagnosticsSnapshot;
  }
  async probeFile(absolutePath) {
    const normalizedPath = normalizeAbsolutePath(absolutePath);
    if (!existsSync5(normalizedPath)) {
      return {
        path: normalizedPath,
        excluded: true,
        layer: 4,
        rule: "not-found"
      };
    }
    const layer3IgnoreRules = await this.getLayer3Rules();
    return this.evaluateFile(normalizedPath, layer3IgnoreRules);
  }
  getLayer3Rules() {
    if (!this._layer3RulesCache) {
      this._layer3RulesCache = readIgnoreRules(this.options.projectRoot, this.ragConfig);
    }
    return this._layer3RulesCache;
  }
  previewIndex() {
    return this.discoverFiles();
  }
  async evaluateFile(absolutePath, layer3IgnoreRules) {
    const basename = basenameOf(absolutePath);
    const relativePath = toProjectRelativePath(this.options.projectRoot, absolutePath);
    if (!isEligibleByLayer1(basename, this.extensionAllowlist, this.namedBasenameIncludes)) {
      return {
        path: absolutePath,
        excluded: true,
        layer: 1,
        rule: "ineligible-extension-or-basename"
      };
    }
    const layer2 = isExcludedByLayer2(
      absolutePath,
      basename,
      this.options.projectRoot,
      this.hardNamedFileExclusionSet,
      this.adapterFileExclusionSet
    );
    if (layer2) {
      return {
        path: absolutePath,
        excluded: true,
        layer: 2,
        rule: layer2
      };
    }
    const layer3 = this.evaluateLayer3(relativePath, basename, layer3IgnoreRules);
    if (layer3) {
      return {
        path: absolutePath,
        excluded: true,
        layer: 3,
        rule: layer3
      };
    }
    const layer4 = await this.evaluateLayer4(absolutePath);
    if (layer4) {
      return {
        path: absolutePath,
        excluded: true,
        layer: 4,
        rule: layer4
      };
    }
    return {
      path: absolutePath,
      excluded: false
    };
  }
  evaluateLayer3(relativePath, basename, ignoreRules) {
    const includedByConfig = this.includeGlobs.some((glob) => glob.matches(relativePath));
    const ignoreMatch = ignoreRules.find((rule) => rule.matches(relativePath));
    if (ignoreMatch && !includedByConfig) {
      return `project-ignore:${ignoreMatch.source}`;
    }
    const defaultDir = findMatchingDirectory(relativePath, FRAMEWORK_DEFAULT_EXCLUDE_DIRECTORIES);
    if (defaultDir && !includedByConfig) {
      return `framework-directory:${defaultDir}`;
    }
    const packDir = findMatchingDirectory(
      relativePath,
      this.options.packs.flatMap((pack) => pack.manifest.rag?.exclude_directories ?? [])
    );
    if (packDir && !includedByConfig) {
      return `pack-directory:${packDir}`;
    }
    const configExclude = this.excludeGlobs.find((glob) => glob.matches(relativePath));
    if (configExclude && !includedByConfig) {
      return `config-exclude:${configExclude.pattern}`;
    }
    if (isSoftEnvExcluded(basename) && !includedByConfig) {
      return "soft-env-exclusion";
    }
    return void 0;
  }
  async evaluateLayer4(absolutePath) {
    let handle;
    try {
      handle = await open(absolutePath, "r");
    } catch {
      return await isSymlink(absolutePath) ? "symlink" : this.unreadable(absolutePath);
    }
    try {
      if (await isSymlink(absolutePath)) {
        return "symlink";
      }
      const fileStat = await handle.stat();
      const maxFileSize = this.options.intelligence?.rag_max_file_size ?? 153600;
      if (fileStat.size > maxFileSize) {
        return "size-cap";
      }
      if (fileStat.size === 0) {
        return "empty-file";
      }
      const preview = await handle.readFile();
      const prefix = preview.subarray(0, Math.min(8192, preview.length));
      if (prefix.includes(0)) {
        return "binary-nul-byte";
      }
      const utf8 = preview.toString("utf8");
      if (utf8.includes("\uFFFD")) {
        engineLog("warn", `Skipping non-UTF-8 file: ${absolutePath}`);
        return "invalid-utf8";
      }
      const nonWhitespaceChars = utf8.replace(/\s/g, "").length;
      if (nonWhitespaceChars < 50) {
        return "below-minimum-content-threshold";
      }
      return void 0;
    } catch {
      return this.unreadable(absolutePath);
    } finally {
      await handle.close();
    }
  }
  unreadable(absolutePath) {
    engineLog("warn", `Skipping unreadable file: ${absolutePath}`);
    return "unreadable";
  }
};
async function isSymlink(absolutePath) {
  try {
    return (await lstat(absolutePath)).isSymbolicLink();
  } catch {
    return false;
  }
}
function readRagIgnoreConfig(projectRoot) {
  const configPath = join10(projectRoot, PATHS.RAG_IGNORE_CONFIG);
  if (!existsSync5(configPath)) {
    return { ...DEFAULT_RAG_IGNORE_CONFIG };
  }
  try {
    const parsed = import_yaml2.default.parse(readFileSync3(configPath, "utf8"));
    if (!validateRagIgnoreConfig(parsed)) {
      engineLog("warn", `Invalid RAG ignore config at ${configPath}; using defaults`);
      return { ...DEFAULT_RAG_IGNORE_CONFIG };
    }
    return {
      version: 1,
      exclude: [...parsed.exclude ?? []],
      include: [...parsed.include ?? []],
      additional_extensions: [...parsed.additional_extensions ?? []],
      additional_basename_includes: [
        ...parsed.additional_basename_includes ?? []
      ],
      additional_named_file_exclusions: [
        ...parsed.additional_named_file_exclusions ?? []
      ],
      use_project_ignore_files: parsed.use_project_ignore_files ?? DEFAULT_RAG_IGNORE_CONFIG.use_project_ignore_files,
      use_global_gitignore: parsed.use_global_gitignore ?? DEFAULT_RAG_IGNORE_CONFIG.use_global_gitignore
    };
  } catch {
    engineLog("warn", `Failed to parse RAG ignore config at ${configPath}; using defaults`);
    return { ...DEFAULT_RAG_IGNORE_CONFIG };
  }
}
function readAdapterFileExclusions(projectRoot) {
  const manifestPath = join10(projectRoot, PATHS.ONBOARDING_MANIFEST);
  if (!existsSync5(manifestPath)) {
    return new Set(FALLBACK_ADAPTER_FILES);
  }
  try {
    const manifest = JSON.parse(readFileSync3(manifestPath, "utf8"));
    const basenames = manifest.generated_artifacts.map((artifact) => basenameOf(artifact.path));
    return /* @__PURE__ */ new Set([...basenames, ...FALLBACK_ADAPTER_FILES]);
  } catch {
    return new Set(FALLBACK_ADAPTER_FILES);
  }
}
async function readIgnoreRules(projectRoot, config) {
  if (!config.use_project_ignore_files) {
    return [];
  }
  const projectIgnoreFiles = await (0, import_fast_glob.default)("**/.gitignore", {
    cwd: projectRoot,
    absolute: true,
    dot: true,
    onlyFiles: true,
    followSymbolicLinks: false
  });
  const extraRootFiles = [".ignore", ".fdignore", ".rgignore"].map((name) => join10(projectRoot, name)).filter((path2) => existsSync5(path2));
  const globalFiles = config.use_global_gitignore ? [join10(homedir4(), ".gitignore_global"), join10(homedir4(), ".config/git/ignore")].filter(
    (path2) => existsSync5(path2)
  ) : [];
  const rules = [];
  for (const file of [...projectIgnoreFiles.sort(), ...extraRootFiles, ...globalFiles]) {
    const fileRelativeDir = file.startsWith(projectRoot) ? toPosixPath(relative(projectRoot, file)).split("/").slice(0, -1).join("/") : "";
    const baseDir = file.startsWith(projectRoot) ? fileRelativeDir : "";
    const sourceName = file.startsWith(projectRoot) ? toPosixPath(relative(projectRoot, file)) : file;
    const lines = readFileSync3(file, "utf8").split(/\r?\n/);
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) {
        continue;
      }
      if (line.startsWith("!")) {
        continue;
      }
      rules.push(
        ...resolveIgnorePattern(baseDir, line).map((glob) => ({
          glob,
          source: sourceName,
          matches: compileProjectGlob(glob)
        }))
      );
    }
  }
  return rules;
}
function isEligibleByLayer1(basename, extAllowlist, basenameIncludes) {
  const lowerBasename = basename.toLowerCase();
  for (const extension of extAllowlist) {
    if (lowerBasename.endsWith(extension.toLowerCase())) {
      return true;
    }
  }
  if (basenameIncludes.has(basename)) {
    return true;
  }
  const stem = basename.split(".")[0];
  return stem.length > 0 && basenameIncludes.has(stem);
}
function isExcludedByLayer2(absolutePath, basename, projectRoot, hardExclusions, adapterFiles) {
  const relativePath = toProjectRelativePath(projectRoot, absolutePath);
  const segments = splitSegments(relativePath);
  if (relativePath.startsWith(".paqad/") || segments.includes(".paqad")) {
    return "framework-output:.paqad";
  }
  const aiToolDir = segments.find((segment) => AI_TOOL_DIRS.has(segment));
  if (aiToolDir) {
    return `ai-tool-directory:${aiToolDir}`;
  }
  if (hardExclusions.has(basename)) {
    return adapterFiles.has(basename) ? `adapter-file:${basename}` : `hard-file:${basename}`;
  }
  return void 0;
}
function findMatchingDirectory(relativePath, directories) {
  const segments = splitSegments(relativePath);
  return directories.find((directory) => {
    const normalized = trimSlashes(toPosixPath(directory));
    if (!normalized) {
      return false;
    }
    const dirSegments = normalized.split("/");
    if (dirSegments.length === 1) {
      return segments.includes(dirSegments[0]);
    }
    const relativeDir = dirnameSegments(relativePath);
    return relativeDir === normalized || relativeDir.startsWith(`${normalized}/`) || relativeDir.includes(`/${normalized}/`) || relativeDir.endsWith(`/${normalized}`);
  });
}
function isSoftEnvExcluded(basename) {
  return basename === ".env" || basename.startsWith(".env.");
}
function resolveIgnorePattern(baseDir, pattern) {
  const normalizedBase = trimSlashes(toPosixPath(baseDir));
  const normalizedPattern = trimSlashes(toPosixPath(pattern.replace(/^\.\//, "")));
  if (!normalizedPattern) {
    return [];
  }
  const basePrefix = normalizedBase ? `${normalizedBase}/` : "";
  const directoryPattern = pattern.endsWith("/");
  const candidate = normalizedPattern.replace(/^\/+/, "");
  if (!candidate.includes("/")) {
    if (directoryPattern) {
      return [`${basePrefix}**/${candidate}/**`, `${basePrefix}${candidate}/**`];
    }
    return [`${basePrefix}**/${candidate}`, `${basePrefix}${candidate}`];
  }
  if (directoryPattern) {
    return [`${basePrefix}${candidate}/**`];
  }
  return [`${basePrefix}${candidate}`];
}
var PATH_MATCHES_GLOB_OPTIONS = {
  nocase: process.platform === "darwin" || process.platform === "win32",
  windowsPathsNoEscape: true,
  nonegate: true,
  nocomment: true,
  optimizationLevel: 2,
  platform: process.platform,
  nocaseMagicOnly: true
};
function compileConfigGlobs(patterns) {
  return patterns.map((pattern) => ({ pattern, matches: compileProjectGlob(pattern) }));
}
function compileProjectGlob(pattern) {
  const rawPattern = toPosixPath(pattern);
  const directoryPattern = rawPattern.endsWith("/");
  const normalizedPattern = trimSlashes(rawPattern);
  if (!normalizedPattern) {
    return () => false;
  }
  const candidates = /* @__PURE__ */ new Set([normalizedPattern]);
  if (!normalizedPattern.startsWith("**/")) {
    candidates.add(`**/${normalizedPattern}`);
  }
  if (directoryPattern) {
    candidates.add(`${normalizedPattern}/**`);
    candidates.add(`**/${normalizedPattern}/**`);
  }
  const matchers = [...candidates].map(
    (candidate) => new Minimatch(candidate, PATH_MATCHES_GLOB_OPTIONS)
  );
  return (relativePath) => {
    const normalizedPath = toPosixPath(relativePath);
    return matchers.some((matcher) => matcher.match(normalizedPath));
  };
}
function basenameOf(path2) {
  const normalized = toPosixPath(path2);
  const segments = normalized.split("/");
  return segments[segments.length - 1];
}
function dirnameSegments(path2) {
  const segments = splitSegments(path2);
  return segments.slice(0, -1).join("/");
}
function splitSegments(path2) {
  return toPosixPath(path2).split("/").filter(Boolean);
}
function toProjectRelativePath(projectRoot, absolutePath) {
  return toPosixPath(relative(projectRoot, absolutePath));
}
function normalizeAbsolutePath(path2) {
  return isAbsolute(path2) ? path2 : join10(process.cwd(), path2);
}
function trimSlashes(value) {
  let start = 0;
  let end = value.length;
  while (start < end && value[start] === "/") start += 1;
  while (end > start && value[end - 1] === "/") end -= 1;
  return value.slice(start, end);
}
function sortExtensionsDescending(extensions) {
  return [...extensions].sort(
    (left, right) => right.length - left.length || left.localeCompare(right)
  );
}

// src/rag/service.ts
var VISION_MAX_CHUNK_CHARS = 2e3;
var CRS_EMBED_BATCH_SIZE = 32;
var HYBRID_FUSION_POOL_MULTIPLIER = 4;
var RELIEF_SLICE_CAP = 2;
var REMOTE_API_KEY_NAMES = { openai: "OPENAI_API_KEY" };
function toRetrievalResult(candidates, extra) {
  return {
    vector_scores: new Map(candidates.map((candidate) => [candidate.id, candidate.score])),
    chunks_retrieved: candidates.length,
    retrieved_chunk_ids: candidates.map((candidate) => candidate.id),
    retrieved_source_files: candidates.map((candidate) => candidate.source_file),
    retrieved_chunks: candidates.map((candidate) => ({
      id: candidate.id,
      source_file: candidate.source_file,
      content: candidate.content
    })),
    best_score: extra.bestScore,
    low_confidence: extra.lowConfidence
  };
}
var CRS_REVERT_RETENTION_MS = 24 * 60 * 60 * 1e3;
var PARTIAL_VECTOR_INDEX = PATHS.VECTOR_INDEX.replace(/\.json$/, ".partial.json");
var PARTIAL_VECTOR_META = PATHS.VECTOR_META.replace(/\.json$/, ".partial.json");
function queryTextFromTask(taskDescription, keywords = [], targetFilePath, symbols = []) {
  const parts = [taskDescription, ...keywords, targetFilePath, ...symbols].filter(Boolean);
  return parts.join("\n");
}
function estimateEtaSeconds(startMs, loaded, total) {
  if (loaded <= 0 || total <= loaded) {
    return 0;
  }
  const elapsedMs = Math.max(Date.now() - startMs, 1);
  const rate = loaded / elapsedMs;
  return Math.max(Math.round((total - loaded) / rate / 1e3), 0);
}
var RagService = class {
  constructor(projectRoot, providerFactory = createEmbeddingProvider, crsBacklog = new CrsBacklogQueue()) {
    this.projectRoot = projectRoot;
    this.providerFactory = providerFactory;
    this.crsBacklog = crsBacklog;
    this.indexManager = new ChunkIndexManager(projectRoot);
    this.patternVectors = new PatternVectorService(void 0, providerFactory);
    this.resumeValidator = new SessionResumeValidator(void 0, async () => this);
  }
  projectRoot;
  providerFactory;
  crsBacklog;
  vectorIndex = new FileVectorIndex();
  visionVectorIndex = new FileVectorIndex(
    PATHS.VISION_VECTOR_INDEX,
    PATHS.VISION_VECTOR_META
  );
  chunker = new AstChunker();
  indexManager;
  patternVectors;
  resumeValidator;
  resumeValidationPromise;
  async getStatus() {
    const profile = readProjectProfile(this.projectRoot);
    const intelligence = normalizeIntelligenceConfig(profile?.intelligence);
    const status = await this.vectorIndex.status(this.projectRoot);
    const meta = status.meta;
    const expectedModel = intelligence.embedding_provider ? intelligence.embedding_model : void 0;
    const providerModelMatch = meta?.provider === intelligence.embedding_provider && meta?.model === expectedModel;
    const chunkerMatch = meta?.chunker_version === CHUNKER_VERSION;
    const staleMetadata = Boolean(meta) && !providerModelMatch;
    const valid = Boolean(meta) && !status.corrupt && (!intelligence.rag_enabled || providerModelMatch && chunkerMatch);
    let reason = status.reason;
    if (!reason && status.present && meta && !providerModelMatch) {
      reason = "configured provider/model does not match stored vector metadata";
    } else if (!reason && status.present && meta && !chunkerMatch && intelligence.rag_enabled) {
      reason = "stored index was built with a different chunker; a full rebuild is needed";
    }
    let visionChunkCount;
    try {
      visionChunkCount = (await this.visionVectorIndex.loadMeta(this.projectRoot))?.chunk_count;
    } catch {
      visionChunkCount = void 0;
    }
    return {
      enabled: intelligence.rag_enabled,
      configured_provider: intelligence.embedding_provider,
      configured_model: intelligence.embedding_model,
      index_present: status.present,
      valid,
      stale_metadata: staleMetadata || void 0,
      built_at: meta?.built_at,
      chunk_count: meta?.chunk_count ?? 0,
      size_bytes: status.sizeBytes,
      reason: status.present && (!valid || staleMetadata) ? reason : void 0,
      vision_chunk_count: visionChunkCount
    };
  }
  async configureAndBuild(partial, onProgress) {
    const { profile, intelligence } = await this.buildIndexCore(partial, onProgress);
    profile.intelligence = intelligence;
    writeProjectProfile(this.projectRoot, profile);
    syncFrameworkConfig(this.projectRoot, { intelligence });
    return this.getStatus();
  }
  async buildIndexOnly(partial, onProgress) {
    await this.buildIndexCore(partial, onProgress);
    return this.getStatus();
  }
  async buildIndexCore(partial, onProgress) {
    const profile = readProjectProfile(this.projectRoot);
    if (!profile) {
      throw new Error("Project profile not found");
    }
    const intelligence = normalizeIntelligenceConfig({
      ...profile.intelligence,
      ...partial,
      rag_enabled: true
    });
    assertEmbeddingProviderAvailable(this.projectRoot, intelligence.embedding_provider);
    if (intelligence.embedding_provider === void 0) {
      throw new Error("Embedding provider is required when enabling RAG");
    }
    await this.rebuild({ intelligence, onProgress });
    await this.patternVectors.refresh(
      this.projectRoot,
      (message) => onProgress?.({ phase: "build", message })
    );
    appendRagAudit(this.projectRoot, "INFO", "rag-enabled", {
      provider: intelligence.embedding_provider,
      model: intelligence.embedding_model
    });
    return { profile, intelligence };
  }
  async rebuild(options) {
    const profile = readProjectProfile(this.projectRoot);
    const intelligence = normalizeIntelligenceConfig(
      options?.intelligence ?? profile?.intelligence
    );
    assertEmbeddingProviderAvailable(this.projectRoot, intelligence.embedding_provider);
    if (!intelligence.rag_enabled || !intelligence.embedding_provider) {
      throw new Error("RAG must be enabled and configured before rebuilding");
    }
    const start = Date.now();
    const signal = options?.signal;
    const runId = randomUUID();
    let provider;
    try {
      this.throwIfAborted(signal);
      provider = await this.providerFactory(this.projectRoot, intelligence, options?.onProgress);
      try {
        await provider.validate();
      } catch (error) {
        if (isEmbeddingProviderError(error) && error.code === "invalid_api_key") {
          appendRagAudit(this.projectRoot, "WARN", "rag-api-key-validation-failed", {
            provider: provider.name,
            reason: error.message
          });
        }
        throw error;
      }
      appendRagAudit(this.projectRoot, "INFO", "rag-build-started", {
        provider: provider.name,
        model: provider.model
      });
      const sourceFiles = await this.discoverSourceFiles(options?.onProgress);
      options?.onProgress?.({
        phase: "build",
        message: `Chunking ${sourceFiles.length} source files`,
        loaded: 0,
        total: sourceFiles.length,
        percent: 0
      });
      const chunkIndex = await this.indexManager.rebuild(sourceFiles, this.chunker);
      options?.onProgress?.({
        phase: "build",
        message: `Chunked ${chunkIndex.entries.length}/${sourceFiles.length} files`,
        loaded: chunkIndex.entries.length,
        total: sourceFiles.length,
        percent: sourceFiles.length === 0 ? 100 : Math.round(chunkIndex.entries.length / sourceFiles.length * 100)
      });
      const items = await this.embedChunks(provider, flattenChunks(chunkIndex), {
        onProgress: options?.onProgress,
        signal,
        embedTextOf: this.buildEmbedContextualizer()
      });
      if (signal?.aborted) {
        throw new CancelledError("RAG rebuild cancelled by consumer", {
          partialChunks: items
        });
      }
      await this.vectorIndex.replaceAll(
        this.projectRoot,
        items,
        {
          provider: provider.name,
          model: provider.model,
          chunker_version: CHUNKER_VERSION
        },
        intelligence.rag_base_branch
      );
      await this.patternVectors.refresh(
        this.projectRoot,
        (message) => options?.onProgress?.({ phase: "build", message })
      );
      appendRagAudit(this.projectRoot, "INFO", "rag-build-completed", {
        provider: provider.name,
        model: provider.model,
        chunks: items.length,
        duration_ms: Date.now() - start
      });
    } catch (error) {
      if (isCancelledError(error)) {
        const checkpointPath = await this.writePartialIndex(error, provider);
        appendRagAudit(this.projectRoot, "WARN", "rag-build-cancelled", {
          checkpoint_path: checkpointPath,
          duration_ms: Date.now() - start
        });
        appendRunCancelledEvent(this.projectRoot, runId, {
          reason: "rag-rebuild-cancelled",
          checkpoint_path: checkpointPath
        });
        throw new CancelledError("RAG rebuild cancelled by consumer", {
          checkpoint_path: checkpointPath
        });
      }
      appendRagAudit(this.projectRoot, "WARN", "rag-build-failed", {
        reason: error instanceof Error ? error.message : "unknown-error",
        duration_ms: Date.now() - start
      });
      throw error;
    }
  }
  async writePartialIndex(error, provider) {
    const partial = error.details?.partialChunks ?? [];
    if (partial.length === 0 || !provider) {
      return void 0;
    }
    const partialIndex = new FileVectorIndex(
      PARTIAL_VECTOR_INDEX,
      PARTIAL_VECTOR_META
    );
    await partialIndex.replaceAll(this.projectRoot, partial, {
      provider: provider.name,
      model: provider.model
    });
    return PARTIAL_VECTOR_INDEX;
  }
  async clear() {
    const profile = readProjectProfile(this.projectRoot);
    if (profile) {
      profile.intelligence = {
        ...profile.intelligence,
        rag_enabled: false
      };
      writeProjectProfile(this.projectRoot, profile);
      setConfigValue(this.projectRoot, "rag_enabled", "false");
    }
    await this.vectorIndex.clear(this.projectRoot);
    appendRagAudit(this.projectRoot, "INFO", "rag-cleared");
  }
  async refreshContext() {
    const profile = readProjectProfile(this.projectRoot);
    const intelligence = normalizeIntelligenceConfig(profile?.intelligence);
    this.refuseRemovedProvider(intelligence);
    const sourceFiles = await this.discoverSourceFiles();
    const syncResult = await this.indexManager.sync(sourceFiles, this.chunker);
    if (!intelligence.rag_enabled) {
      return syncResult;
    }
    const status = await this.getStatus();
    if (!status.index_present || !status.valid || !intelligence.embedding_provider) {
      if (!status.index_present) {
        appendRagAudit(this.projectRoot, "WARN", "rag-fallback", {
          reason: "missing-index-during-refresh"
        });
      } else if (!status.valid && status.reason?.includes("provider/model")) {
        appendRagAudit(this.projectRoot, "WARN", "rag-provider-mismatch", {
          reason: status.reason
        });
      } else if (!status.valid) {
        appendRagAudit(this.projectRoot, "WARN", "rag-fallback", {
          reason: status.reason ?? "invalid-index-during-refresh"
        });
      }
      return syncResult;
    }
    await this.syncVectorIndex(syncResult, intelligence);
    await this.patternVectors.refresh(this.projectRoot);
    return syncResult;
  }
  async retrieve(syncResult, input, topN) {
    return this.retrieveWithSyncPolicy(syncResult, input, topN, false);
  }
  async retrieveWithSyncPolicy(syncResult, input, topN, skipSync) {
    const profile = readProjectProfile(this.projectRoot);
    const intelligence = normalizeIntelligenceConfig(profile?.intelligence);
    this.refuseRemovedProvider(intelligence);
    if (!intelligence.rag_enabled || !intelligence.embedding_provider) {
      return {
        vector_scores: /* @__PURE__ */ new Map(),
        chunks_retrieved: 0,
        retrieved_chunk_ids: [],
        retrieved_source_files: [],
        retrieved_chunks: []
      };
    }
    if (topN === 0) {
      return {
        vector_scores: /* @__PURE__ */ new Map(),
        chunks_retrieved: 0,
        retrieved_chunk_ids: [],
        retrieved_source_files: [],
        retrieved_chunks: []
      };
    }
    await this.validateResumeState();
    const status = await this.getStatus();
    if (!status.index_present) {
      appendRagAudit(this.projectRoot, "WARN", "rag-fallback", { reason: "missing-index" });
      return {
        vector_scores: /* @__PURE__ */ new Map(),
        chunks_retrieved: 0,
        retrieved_chunk_ids: [],
        retrieved_source_files: [],
        retrieved_chunks: [],
        fallback_reason: "missing-index"
      };
    }
    if (!status.valid) {
      if (status.reason?.includes("provider/model")) {
        appendRagAudit(this.projectRoot, "WARN", "rag-provider-mismatch", {
          reason: status.reason
        });
      }
      appendRagAudit(this.projectRoot, "WARN", "rag-fallback", {
        reason: status.reason ?? "stale-or-mismatched-index"
      });
      return {
        vector_scores: /* @__PURE__ */ new Map(),
        chunks_retrieved: 0,
        retrieved_chunk_ids: [],
        retrieved_source_files: [],
        retrieved_chunks: [],
        fallback_reason: status.reason ?? "stale-or-mismatched-index"
      };
    }
    try {
      if (!skipSync && syncResult !== null) {
        await this.syncVectorIndex(syncResult, intelligence);
      }
      const limit = topN ?? intelligence.rag_top_n;
      const scored = await this.scoreCandidates(input, limit, intelligence);
      const bestScore = scored.length > 0 ? scored[0].score : void 0;
      const aboveFloor = scored.filter(
        (candidate) => candidate.score >= intelligence.rag_similarity_threshold
      );
      if (aboveFloor.length > 0) {
        return toRetrievalResult(aboveFloor, { bestScore, lowConfidence: false });
      }
      const relief = scored.filter((candidate) => candidate.score >= intelligence.rag_relief_floor).slice(0, RELIEF_SLICE_CAP);
      if (relief.length > 0) {
        return toRetrievalResult(relief, { bestScore, lowConfidence: true });
      }
      appendRagAudit(this.projectRoot, "WARN", "rag-fallback", {
        reason: "below-similarity-threshold"
      });
      return {
        vector_scores: /* @__PURE__ */ new Map(),
        chunks_retrieved: 0,
        retrieved_chunk_ids: [],
        retrieved_source_files: [],
        retrieved_chunks: [],
        fallback_reason: "below-similarity-threshold",
        best_score: bestScore
      };
    } catch (error) {
      appendRagAudit(this.projectRoot, "WARN", "rag-fallback", {
        reason: error instanceof Error ? error.message : "unknown-error"
      });
      return {
        vector_scores: /* @__PURE__ */ new Map(),
        chunks_retrieved: 0,
        retrieved_chunk_ids: [],
        retrieved_source_files: [],
        retrieved_chunks: [],
        fallback_reason: error instanceof Error ? error.message : "unknown-error"
      };
    }
  }
  async retrieveForEval(input, topN, options = {}) {
    const syncResult = options.skipSync === true ? null : await this.refreshContext();
    return this.retrieveWithSyncPolicy(syncResult, input, topN, true);
  }
  async scoreCandidates(input, limit, intelligence) {
    const provider = await this.providerFactory(this.projectRoot, intelligence);
    const queryText = queryTextFromTask(
      input.taskDescription,
      input.keywords,
      input.targetFilePath,
      input.symbolReferences ?? []
    );
    const [queryVector] = await provider.embed(queryText);
    const pool = limit * HYBRID_FUSION_POOL_MULTIPLIER;
    const [fileResults, visionResults] = await Promise.all([
      this.vectorIndex.query(this.projectRoot, queryVector, pool),
      this.visionVectorIndex.query(this.projectRoot, queryVector, pool)
    ]);
    const dense = [...fileResults, ...visionResults].sort(
      (left, right) => right.score - left.score
    );
    const fused = fuseHybridRanking(dense, queryText);
    const reranked = await this.applyReranking(queryText, fused, intelligence.reranking);
    return reranked.slice(0, limit).map((result) => ({
      id: result.item.id,
      source_file: result.item.source_file,
      content: result.item.content,
      score: result.score
    }));
  }
  async probe(input, topN) {
    const intelligence = normalizeIntelligenceConfig(
      readProjectProfile(this.projectRoot)?.intelligence
    );
    this.refuseRemovedProvider(intelligence);
    if (!intelligence.rag_enabled || !intelligence.embedding_provider) {
      return [];
    }
    await this.refreshContext();
    const status = await this.getStatus();
    if (!status.index_present || !status.valid) {
      return [];
    }
    return this.scoreCandidates(input, topN ?? intelligence.rag_top_n, intelligence);
  }
  async ingestExtractedText(input) {
    if (!SUPPORTED_EXTRACTION_KINDS.includes(input.extractionKind)) {
      throw new RagIngestError(
        "unknown_extraction_kind",
        `Unknown extraction kind: ${String(input.extractionKind)}`,
        { extraction_kind: input.extractionKind }
      );
    }
    if (typeof input.text !== "string" || input.text.trim().length === 0) {
      throw new RagIngestError("empty_extracted_text", "Extracted text is empty");
    }
    if (input.text.includes("\uFFFD")) {
      throw new RagIngestError("text_not_utf8", "Extracted text is not valid UTF-8");
    }
    const extension = extname(input.sourcePath).toLowerCase();
    if (!SUPPORTED_VISION_EXTENSIONS.includes(extension)) {
      throw new RagIngestError(
        "unsupported_file_type",
        `Unsupported file type for vision ingest: ${extension || "(none)"}`,
        { source_path: input.sourcePath }
      );
    }
    const resolvedRoot = resolve(this.projectRoot);
    const resolvedPath = resolve(this.projectRoot, input.sourcePath);
    if (!resolvedPath.startsWith(resolvedRoot + sep2)) {
      throw new RagIngestError(
        "path_outside_project",
        `Source path resolves outside the project root: ${input.sourcePath}`,
        { source_path: input.sourcePath }
      );
    }
    const profile = readProjectProfile(this.projectRoot);
    const intelligence = normalizeIntelligenceConfig(profile?.intelligence);
    this.refuseRemovedProvider(intelligence);
    if (!intelligence.rag_enabled || !intelligence.embedding_provider) {
      throw new Error("RAG must be enabled and configured before ingesting extracted text");
    }
    const sourceMissing = !existsSync6(resolvedPath);
    const chunkTexts = this.splitTextIntoChunks(input.text, VISION_MAX_CHUNK_CHARS);
    const chunks = chunkTexts.map((raw, index) => {
      const content = raw.trim();
      return {
        id: createHash6("sha256").update(`${input.sourcePath}:${input.extractionKind}:${index}`).digest("hex"),
        source_file: input.sourcePath,
        ast_node_type: "fallback",
        ast_node_path: "vision-extracted",
        exported_symbols: [],
        content,
        char_count: content.replace(/\s/g, "").length,
        content_hash: createHash6("sha256").update(content).digest("hex")
      };
    });
    const provider = await this.providerFactory(this.projectRoot, intelligence);
    const vectors = await provider.embed(chunks.map((chunk) => chunk.content));
    const embedded = chunks.map((chunk, index) => ({
      ...chunk,
      extraction_kind: input.extractionKind,
      source_missing: sourceMissing,
      vector: vectors[index]
    }));
    const current = await this.visionVectorIndex.load(this.projectRoot);
    const retained = (current?.items ?? []).filter((item) => item.source_file !== input.sourcePath);
    await this.visionVectorIndex.replaceAll(this.projectRoot, [...retained, ...embedded], {
      provider: provider.name,
      model: provider.model
    });
    appendRagAudit(this.projectRoot, "INFO", "rag-vision-ingested", {
      source_path: input.sourcePath,
      extraction_kind: input.extractionKind,
      chunk_count: embedded.length,
      source_missing: sourceMissing
    });
    return {
      chunkCount: embedded.length,
      sourcePath: input.sourcePath,
      extractionKind: input.extractionKind
    };
  }
  resolveApiKeyName(provider) {
    return REMOTE_API_KEY_NAMES[provider];
  }
  storeApiKey(provider, value) {
    return writeProjectSecret(this.projectRoot, this.resolveApiKeyName(provider), value);
  }
  hasApiKey(provider) {
    return Boolean(getProjectSecret(this.projectRoot, this.resolveApiKeyName(provider)));
  }
  refuseRemovedProvider(intelligence) {
    if (intelligence.rag_enabled) {
      assertEmbeddingProviderAvailable(this.projectRoot, intelligence.embedding_provider);
    }
  }
  localModelPath() {
    return localModelsRoot();
  }
  localModelCached(model) {
    try {
      const path2 = model ? localModelDir(model) : this.localModelPath();
      return statSync(path2).isDirectory();
    } catch {
      return false;
    }
  }
  async writeChunks(chunks, collectionId) {
    await FileVectorIndex.create(this.projectRoot, collectionId);
    const intelligence = normalizeIntelligenceConfig(
      readProjectProfile(this.projectRoot)?.intelligence
    );
    const provider = await this.providerFactory(this.projectRoot, intelligence);
    if (this.crsBacklog.size > 0) {
      await this.crsBacklog.drain(
        (id, queued) => this.persistCrsChunks(provider, id, queued).then(() => void 0)
      );
    }
    try {
      return await this.persistCrsChunks(provider, collectionId, chunks);
    } catch (error) {
      this.crsBacklog.enqueue(chunks, collectionId);
      throw error;
    }
  }
  async retrieveCrs(query, collectionId, topK, confidenceThreshold = 0.5) {
    const intelligence = normalizeIntelligenceConfig(
      readProjectProfile(this.projectRoot)?.intelligence
    );
    const provider = await this.providerFactory(this.projectRoot, intelligence);
    const [queryVector] = await provider.embed(query);
    const { indexPath, metaPath } = crsCollectionPaths(collectionId);
    const index = new FileVectorIndex(indexPath, metaPath);
    const results = await index.query(this.projectRoot, queryVector, topK);
    return results.filter((result) => result.score >= confidenceThreshold).map((result) => ({
      chunk: result.item,
      sourceSessionId: result.item.source_session_id,
      sourceWorkspaceId: result.item.source_workspace_id,
      score: result.score
    }));
  }
  async reindex(provider, model, collectionId, onProgress) {
    const layout = crsCollectionLayout(this.projectRoot, collectionId);
    await this.sweepExpiredCrsReverts(collectionId);
    const live = new FileVectorIndex(layout.indexPath, layout.metaPath);
    const existing = await live.load(this.projectRoot);
    const items = existing?.items ?? [];
    const relRebuildDir = join11(PATHS.CRS_DIR, `${layout.escaped}.rebuilding`);
    const absRebuildDir = join11(this.projectRoot, relRebuildDir);
    await rm3(absRebuildDir, { recursive: true, force: true });
    await mkdir4(absRebuildDir, { recursive: true });
    const intelligence = normalizeIntelligenceConfig({
      embedding_provider: provider,
      embedding_model: model,
      rag_enabled: true
    });
    const newProvider = await this.providerFactory(this.projectRoot, intelligence);
    const rebuilt = await this.embedCrsForReindex(newProvider, items, collectionId, onProgress);
    const rebuildIndex = new FileVectorIndex(
      join11(relRebuildDir, "index.json"),
      join11(relRebuildDir, "meta.json")
    );
    await rebuildIndex.replaceAll(this.projectRoot, rebuilt, {
      provider: newProvider.name,
      model: newProvider.model
    });
    if (existsSync6(layout.absDir)) {
      const revertDir = join11(layout.crsRootAbs, `${layout.escaped}.revert.${Date.now()}`);
      await rename2(layout.absDir, revertDir);
    }
    await rename2(absRebuildDir, layout.absDir);
    appendRagAudit(this.projectRoot, "INFO", "crs-reindexed", {
      collection_id: String(collectionId),
      provider: newProvider.name,
      model: newProvider.model,
      chunks: rebuilt.length
    });
  }
  async persistCrsChunks(provider, collectionId, chunks) {
    const { indexPath, metaPath } = crsCollectionPaths(collectionId);
    const index = new FileVectorIndex(indexPath, metaPath);
    const embedded = await this.embedCrsChunks(provider, chunks);
    const existing = await index.load(this.projectRoot);
    const merged = [...existing?.items ?? [], ...embedded];
    await index.replaceAll(this.projectRoot, merged, {
      provider: provider.name,
      model: provider.model
    });
    const event = {
      session_id: chunks[0]?.source_session_id ?? "",
      project_id: chunks[0]?.project_id ?? "",
      chunk_count: embedded.length
    };
    appendRagAudit(this.projectRoot, "INFO", "crs.indexed_session", {
      session_id: event.session_id,
      project_id: event.project_id,
      chunk_count: event.chunk_count
    });
    return event;
  }
  async embedCrsChunks(provider, chunks) {
    if (chunks.length === 0) {
      return [];
    }
    const out = [];
    for (let offset = 0; offset < chunks.length; offset += CRS_EMBED_BATCH_SIZE) {
      const batch = chunks.slice(offset, offset + CRS_EMBED_BATCH_SIZE);
      const vectors = await provider.embed(batch.map((chunk) => chunk.content));
      const stampedAt = (/* @__PURE__ */ new Date()).toISOString();
      for (let index = 0; index < batch.length; index++) {
        const chunk = batch[index];
        out.push({
          id: chunk.id,
          vector: vectors[index],
          content: chunk.content,
          source_session_id: chunk.source_session_id,
          source_workspace_id: chunk.source_workspace_id,
          created_at: chunk.created_at,
          project_id: chunk.project_id,
          vector_timestamp: stampedAt
        });
      }
    }
    return out;
  }
  async embedCrsForReindex(provider, items, collectionId, onProgress) {
    const total = items.length;
    const currentCollection = String(collectionId);
    if (total === 0) {
      onProgress?.({ status_percent: 100, current_collection: currentCollection, est_time: 0 });
      return [];
    }
    const out = [];
    const start = Date.now();
    for (let offset = 0; offset < total; offset += CRS_EMBED_BATCH_SIZE) {
      const batch = items.slice(offset, offset + CRS_EMBED_BATCH_SIZE);
      const vectors = await provider.embed(batch.map((item) => item.content));
      const stampedAt = (/* @__PURE__ */ new Date()).toISOString();
      for (let index = 0; index < batch.length; index++) {
        out.push({ ...batch[index], vector: vectors[index], vector_timestamp: stampedAt });
      }
      const done = Math.min(offset + batch.length, total);
      onProgress?.({
        status_percent: Math.round(done / total * 100),
        current_collection: currentCollection,
        est_time: estimateEtaSeconds(start, done, total)
      });
    }
    return out;
  }
  async sweepExpiredCrsReverts(collectionId) {
    const { escaped, crsRootAbs } = crsCollectionLayout(this.projectRoot, collectionId);
    let entries;
    try {
      entries = await readdir(crsRootAbs);
    } catch {
      return;
    }
    const prefix = `${escaped}.revert.`;
    const now = Date.now();
    for (const entry of entries) {
      if (!entry.startsWith(prefix)) {
        continue;
      }
      const stampedAt = Number(entry.slice(prefix.length));
      if (!Number.isFinite(stampedAt)) {
        continue;
      }
      if (now - stampedAt > CRS_REVERT_RETENTION_MS) {
        await rm3(join11(crsRootAbs, entry), { recursive: true, force: true });
      }
    }
  }
  async applyReranking(query, hits, config) {
    if (!config?.enabled || hits.length <= 1) {
      return [...hits];
    }
    try {
      const reranker = createReranker(config);
      const { post_rerank_ids } = await reranker.rerank(
        query,
        hits.map((hit) => hit.item),
        config.candidate_pool_size
      );
      return reorderByRankedIds(hits, (hit) => hit.item.id, post_rerank_ids);
    } catch (error) {
      appendRagAudit(this.projectRoot, "WARN", "rag-rerank-fallback", {
        reason: error instanceof Error ? error.message : "unknown-error"
      });
      return [...hits];
    }
  }
  async syncVectorIndex(syncResult, intelligence = normalizeIntelligenceConfig(readProjectProfile(this.projectRoot)?.intelligence)) {
    const hasChanges = syncResult.changed_files.length > 0 || syncResult.added_files.length > 0 || syncResult.deleted_files.length > 0;
    if (!hasChanges || !intelligence.embedding_provider) {
      return;
    }
    const current = await this.vectorIndex.load(this.projectRoot);
    const meta = await this.vectorIndex.loadMeta(this.projectRoot);
    if (!current || !meta) {
      return;
    }
    const provider = await this.providerFactory(this.projectRoot, intelligence);
    const changedSources = /* @__PURE__ */ new Set([...syncResult.changed_files, ...syncResult.added_files]);
    const unchanged = current.items.filter(
      (item) => !changedSources.has(item.source_file) && !syncResult.deleted_files.includes(item.source_file)
    );
    const changedChunks = syncResult.index.entries.filter((entry) => changedSources.has(entry.source_file)).flatMap((entry) => entry.chunks);
    const embedded = await this.embedChunks(provider, changedChunks, {
      embedTextOf: this.buildEmbedContextualizer()
    });
    await this.vectorIndex.replaceAll(
      this.projectRoot,
      [...unchanged, ...embedded],
      {
        provider: provider.name,
        model: provider.model,
        chunker_version: CHUNKER_VERSION
      },
      intelligence.rag_base_branch
    );
    appendRagAudit(this.projectRoot, "INFO", "rag-incremental-update", {
      changed_files: [...changedSources].length,
      deleted_files: syncResult.deleted_files.length,
      chunks: unchanged.length + embedded.length
    });
  }
  splitTextIntoChunks(text, maxChunkChars) {
    const paragraphs = text.split(/\n\s*\n/);
    const chunks = [];
    let buffer = "";
    for (const para of paragraphs) {
      const combined = buffer ? `${buffer}

${para}` : para;
      const nonWhitespace = combined.replace(/\s/g, "").length;
      if (nonWhitespace > maxChunkChars && buffer) {
        chunks.push(buffer);
        buffer = para;
      } else {
        buffer = combined;
      }
    }
    if (buffer.trim()) {
      chunks.push(buffer);
    }
    return chunks.length > 0 ? chunks : [text];
  }
  throwIfAborted(signal) {
    if (signal?.aborted) {
      throw new CancelledError("RAG rebuild cancelled by consumer");
    }
  }
  buildEmbedContextualizer() {
    const roleOf = buildModuleRoleResolver(this.projectRoot);
    return (chunk) => contextualizeChunkText(chunk, { moduleRole: roleOf(chunk.source_file) });
  }
  async embedChunks(provider, chunks, options) {
    if (chunks.length === 0) {
      return [];
    }
    const onProgress = options.onProgress;
    const signal = options.signal;
    const embedTextOf = options.embedTextOf;
    const cache = EmbeddingCache.load(this.projectRoot, provider.model);
    const missIndices = [];
    for (let index = 0; index < chunks.length; index++) {
      if (!cache.has(embedTextOf(chunks[index]))) {
        missIndices.push(index);
      }
    }
    const assemble = () => chunks.map((chunk) => {
      const vector = cache.get(embedTextOf(chunk));
      return vector ? { ...chunk, vector } : null;
    }).filter((item) => item !== null);
    const cachedCount = chunks.length - missIndices.length;
    const batchSize = 32;
    const start = Date.now();
    for (let offset = 0; offset < missIndices.length; offset += batchSize) {
      if (signal?.aborted) {
        await cache.flush();
        throw new CancelledError("RAG rebuild cancelled by consumer", {
          partialChunks: assemble()
        });
      }
      const batchIndices = missIndices.slice(offset, offset + batchSize);
      const vectors = await provider.embed(batchIndices.map((index) => embedTextOf(chunks[index])));
      for (let position = 0; position < batchIndices.length; position++) {
        cache.set(embedTextOf(chunks[batchIndices[position]]), vectors[position]);
      }
      const embeddedMisses = Math.min(offset + batchIndices.length, missIndices.length);
      const loaded = cachedCount + embeddedMisses;
      onProgress?.({
        phase: "build",
        message: `Embedded ${loaded}/${chunks.length} chunks with ${provider.model} (${cachedCount} cached, ETA ${estimateEtaSeconds(
          start,
          embeddedMisses,
          missIndices.length
        )}s)`,
        loaded,
        total: chunks.length,
        percent: Math.round(loaded / chunks.length * 100)
      });
    }
    if (missIndices.length === 0) {
      onProgress?.({
        phase: "build",
        message: `Embedded ${chunks.length}/${chunks.length} chunks with ${provider.model} (all cached)`,
        loaded: chunks.length,
        total: chunks.length,
        percent: 100
      });
    }
    await cache.flush();
    return assemble();
  }
  async discoverSourceFiles(onProgress) {
    const profile = readProjectProfile(this.projectRoot);
    const frameworks = profile?.stack_profile?.frameworks ?? [];
    const packs = getPacksForFrameworks(frameworks, this.projectRoot);
    const intelligence = normalizeIntelligenceConfig(profile?.intelligence);
    const filter2 = new RagFileFilter({
      projectRoot: this.projectRoot,
      packs,
      intelligence
    });
    return filter2.discoverFiles(onProgress);
  }
  async validateResumeState() {
    if (this.resumeValidationPromise) {
      return this.resumeValidationPromise;
    }
    this.resumeValidationPromise = (async () => {
      try {
        const validation = await this.resumeValidator.validate(this.projectRoot);
        if (!validation.warning) {
          return;
        }
        appendRagAudit(this.projectRoot, "WARN", "rag-resume-warning", {
          provider: validation.embedding_provider ?? "unknown",
          reason: validation.warning
        });
        engineLog("warn", validation.warning);
      } catch {
      }
    })();
    return this.resumeValidationPromise;
  }
};
function flattenChunks(index) {
  return index.entries.flatMap((entry) => entry.chunks);
}
function lexicalDocumentText(item) {
  if (!item.source_file) {
    return item.content;
  }
  return contextualizeChunkText({
    source_file: item.source_file,
    ast_node_path: item.ast_node_path ?? "",
    exported_symbols: item.exported_symbols ?? [],
    content: item.content
  });
}
function fuseHybridRanking(dense, queryText) {
  if (dense.length <= 1) {
    return [...dense];
  }
  const lexical = new Bm25Index(
    dense.map((hit) => ({
      id: hit.item.id,
      content: lexicalDocumentText(hit.item)
    }))
  ).search(queryText).map((hit) => hit.id);
  if (lexical.length === 0) {
    return [...dense];
  }
  const denseOrder = dense.map((hit) => hit.item.id);
  const byId = new Map(dense.map((hit) => [hit.item.id, hit]));
  const fused = reciprocalRankFusion([denseOrder, lexical]);
  return fused.map((entry) => byId.get(entry.id)).filter((hit) => hit !== void 0);
}

export {
  CHUNKER_VERSION,
  AstChunker,
  castMerge,
  ChunkIndexManager,
  buildModuleRoleResolver,
  createReranker,
  cosineSimilarity,
  REMOVED_EMBEDDING_PROVIDER_MESSAGE,
  findRemovedEmbeddingProvider,
  resolveRemovedEmbeddingProvider,
  assertEmbeddingProviderAvailable,
  EmbeddingProviderError,
  isEmbeddingProviderError,
  SUPPORTED_EXTRACTION_KINDS,
  SUPPORTED_VISION_EXTENSIONS,
  RagIngestError,
  isRagIngestError,
  toCrsCollectionId,
  EmbeddingBacklogOverflow,
  isEmbeddingBacklogOverflow,
  localModelsRoot,
  localModelDir,
  LocalEmbeddingProvider,
  OpenAiEmbeddingProvider,
  enableEmbeddingProviderCache,
  resetEmbeddingProviderCache,
  createEmbeddingProvider,
  escapeCollectionId,
  crsCollectionDir,
  crsCollectionPaths,
  crsCollectionLayout,
  CorruptVectorIndexError,
  FileVectorIndex,
  PatternStore,
  PatternSuggester,
  getGlobalPatternVectorPaths,
  PatternVectorService,
  suggestPatternsForProject,
  openRagConversation,
  recordRagEvidence,
  appendRagAudit,
  DEFAULT_CRS_BACKLOG_CAP,
  CrsBacklogQueue,
  RagFileFilter,
  compileProjectGlob,
  RagService,
  lexicalDocumentText
};
