import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  loadOptionalPackage
} from "./chunk-Y7QRVDRT.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/context/tokenizer-cache.ts
init_esm_shims();
var HEURISTIC_TOKENIZER_VERSION = "heuristic";
var cache = /* @__PURE__ */ new Map();
function heuristicCount(text) {
  return Math.ceil(text.length / 4);
}
function heuristicTokenizer() {
  return {
    tokenizer_version: HEURISTIC_TOKENIZER_VERSION,
    countTokens: heuristicCount
  };
}
async function loadTokenizer(version) {
  try {
    const { AutoTokenizer } = await loadOptionalPackage(
      "@huggingface/transformers"
    );
    const native = await AutoTokenizer.from_pretrained(version);
    return {
      tokenizer_version: version,
      countTokens: (text) => native.encode(text).length
    };
  } catch {
    return heuristicTokenizer();
  }
}
function getOrLoad(version) {
  const cached = cache.get(version);
  if (cached) {
    return cached;
  }
  const loading = loadTokenizer(version);
  cache.set(version, loading);
  return loading;
}
function clearTokenizerCache() {
  cache.clear();
}

export {
  HEURISTIC_TOKENIZER_VERSION,
  getOrLoad,
  clearTokenizerCache
};
