import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/authoring/tokens.ts
init_esm_shims();
var CHARS_PER_TOKEN = 4;
function estimateTokens(text) {
  if (!text) return 0;
  return Math.ceil(text.length / CHARS_PER_TOKEN);
}

export {
  estimateTokens
};
