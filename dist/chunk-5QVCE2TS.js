import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/core/constants/paqad-voice.ts
init_esm_shims();
var PAQAD_STATUS_GLYPH = {
  good: "\u{1F7E2}",
  failed: "\u{1F534}",
  needsLook: "\u{1F7E1}",
  skipped: "\u26AA"
};
var PAQAD_STATUS_LABEL = {
  good: "good",
  failed: "failed",
  needsLook: "needs a look",
  skipped: "skipped"
};
var PAQAD_VERDICT = {
  pass: "Safe to merge",
  fail: "Needs your attention",
  inconclusive: "Inconclusive"
};
var PAQAD_FRAME_LEAD = "**\u25B8 paqad**";
var PAQAD_FRAME_SEP = "\xB7";
function paqadFrameLead(label) {
  return `${PAQAD_FRAME_LEAD} ${PAQAD_FRAME_SEP} ${label}`;
}
function paqadGlyphLegend() {
  return Object.keys(PAQAD_STATUS_GLYPH).map((kind) => `${PAQAD_STATUS_GLYPH[kind]} ${PAQAD_STATUS_LABEL[kind]}`).join(` ${PAQAD_FRAME_SEP} `);
}
var PAQAD_TERM_TRANSLATIONS = [
  {
    term: "classification",
    plain: "I read your request and judged how risky it is."
  },
  {
    term: "lane / routing",
    plain: "I picked the path: a quick path for small changes, the full path (spec \u2192 build \u2192 verify) for risky ones."
  },
  {
    term: "requirement derivation",
    plain: "I worked out what this actually needs to do before building it."
  },
  {
    term: "verification gates",
    plain: "I ran the safety checks for you before calling this done."
  },
  {
    term: "mutation testing",
    plain: "I double-checked your tests actually catch bugs, not just run."
  },
  {
    term: "quality ratchet",
    plain: "I made sure nothing slipped below the quality bar you'd already set."
  },
  {
    term: "traceability",
    plain: "I tied each requirement to the test that proves it."
  },
  {
    term: "decision pause",
    plain: "I hit a real choice that's yours to make, so I stopped to ask."
  }
];

export {
  PAQAD_STATUS_GLYPH,
  PAQAD_STATUS_LABEL,
  PAQAD_VERDICT,
  paqadFrameLead,
  paqadGlyphLegend,
  PAQAD_TERM_TRANSLATIONS
};
