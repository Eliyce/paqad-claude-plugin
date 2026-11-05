import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/rag/lexical-bm25.ts
init_esm_shims();
var K1 = 1.5;
var B = 0.75;
function tokenize(text) {
  return text.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2").toLowerCase().split(/[^a-z0-9]+/).filter((token) => token.length > 0);
}
var Bm25Index = class {
  docTokens = /* @__PURE__ */ new Map();
  docFreq = /* @__PURE__ */ new Map();
  docLength = /* @__PURE__ */ new Map();
  avgDocLength;
  docCount;
  constructor(documents) {
    this.docCount = documents.length;
    let totalLength = 0;
    for (const doc of documents) {
      const tokens = tokenize(doc.content);
      this.docTokens.set(doc.id, tokens);
      this.docLength.set(doc.id, tokens.length);
      totalLength += tokens.length;
      for (const term of new Set(tokens)) {
        this.docFreq.set(term, (this.docFreq.get(term) ?? 0) + 1);
      }
    }
    this.avgDocLength = this.docCount === 0 ? 0 : totalLength / this.docCount;
  }
  idf(term) {
    const n = this.docFreq.get(term) ?? 0;
    return Math.log(1 + (this.docCount - n + 0.5) / (n + 0.5));
  }
  search(query, topK) {
    const queryTerms = new Set(tokenize(query));
    if (queryTerms.size === 0 || this.docCount === 0) {
      return [];
    }
    const hits = [];
    for (const [id, tokens] of this.docTokens) {
      const length = this.docLength.get(id) ?? 0;
      let score = 0;
      for (const term of queryTerms) {
        const tf = countOccurrences(tokens, term);
        if (tf === 0) {
          continue;
        }
        const denom = tf + K1 * (1 - B + B * length / (this.avgDocLength || 1));
        score += this.idf(term) * (tf * (K1 + 1) / denom);
      }
      if (score > 0) {
        hits.push({ id, score });
      }
    }
    hits.sort((left, right) => right.score - left.score);
    return topK === void 0 ? hits : hits.slice(0, topK);
  }
};
function countOccurrences(tokens, term) {
  let count = 0;
  for (const token of tokens) {
    if (token === term) {
      count += 1;
    }
  }
  return count;
}

export {
  tokenize,
  Bm25Index
};
