import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  DEFAULT_TRACKER_PATTERNS
} from "./chunk-N7PDT64R.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/planning/ticket-ref-detect.ts
init_esm_shims();
var JIRA_REF = /\b[A-Z][A-Z0-9]+-\d+\b/g;
var GITHUB_REF = /(?<![\w/])#(\d+)\b/g;
function patternsFor(kind) {
  switch (kind) {
    case "github-issues":
      return [GITHUB_REF];
    case "jira":
    case "linear":
      return [JIRA_REF];
    default:
      return [JIRA_REF, GITHUB_REF];
  }
}
function detectTicketRefs(prompt, kind) {
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const pattern of patternsFor(kind)) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(prompt)) !== null) {
      const ref = match[0];
      if (!seen.has(ref)) {
        seen.add(ref);
        out.push(ref);
      }
    }
  }
  return out;
}
var JIRA_KEY = "[A-Z][A-Z0-9]+-\\d+";
var SERVICENOW_KEY = new RegExp(`\\b${DEFAULT_TRACKER_PATTERNS.servicenow}\\b`);
var SERVICENOW_KEYS = new RegExp(SERVICENOW_KEY.source, "g");
var URL = /https?:\/\/[^\s<>()"'`]+/g;
var LINK_RULES = [
  {
    tracker: "github-issues",
    pattern: /^https?:\/\/(github\.com)\/([\w.-]+)\/([\w.-]+)\/issues\/(\d+)/,
    ref: (match) => `${match[2]}/${match[3]}#${match[4]}`
  },
  {
    tracker: "linear",
    pattern: new RegExp(`^https?:\\/\\/(linear\\.app)\\/[\\w.-]+\\/issue\\/(${JIRA_KEY})`, "i"),
    ref: (match) => match[2].toUpperCase()
  },
  {
    tracker: "jira",
    pattern: new RegExp(`^https?:\\/\\/([\\w.-]+)\\/browse\\/(${JIRA_KEY})\\b`),
    ref: (match) => match[2]
  },
  {
    tracker: "jira",
    pattern: new RegExp(`^https?:\\/\\/([\\w-]+\\.atlassian\\.net)\\/\\S*?\\b(${JIRA_KEY})\\b`),
    ref: (match) => match[2]
  },
  {
    tracker: "servicenow",
    pattern: new RegExp(
      `^https?:\\/\\/([\\w-]+\\.service-now\\.com)\\/\\S*?(${DEFAULT_TRACKER_PATTERNS.servicenow})`
    ),
    ref: (match) => match[2]
  }
];
function detectTicketLinks(text) {
  const out = [];
  for (const [url] of text.matchAll(URL)) {
    for (const rule of LINK_RULES) {
      const match = rule.pattern.exec(url);
      if (match) {
        out.push({ tracker: rule.tracker, server: match[1].toLowerCase(), ref: rule.ref(match) });
        break;
      }
    }
  }
  if (out.length > 0) return out;
  for (const [ref] of text.matchAll(SERVICENOW_KEYS)) {
    out.push({ tracker: "servicenow", server: "", ref });
  }
  return out;
}
var BRANCH_NUMBERS = /^(\d+(?:-\d+)*)(?=-|$)/;
function parseBranchTickets(branch) {
  if (!branch) return [];
  const leaf = branch.split("/").filter(Boolean).at(-1) ?? "";
  const out = detectTicketRefs(leaf, "jira");
  const numbers = BRANCH_NUMBERS.exec(leaf);
  if (numbers) {
    for (const n of numbers[1].split("-")) {
      const ref = `#${Number(n)}`;
      if (!out.includes(ref)) out.push(ref);
    }
  }
  return out;
}
function armIntakeNarration(refs) {
  if (refs.length === 0) return "";
  const first = refs[0];
  const list = refs.join(", ");
  return `**\u25B8 paqad** \xB7 detected a ticket reference (${list})
> Ground the work in the real ticket: run \`paqad-ai intake fetch ${first}\` so I build what it actually says, not a guess from the id.`;
}

export {
  detectTicketRefs,
  detectTicketLinks,
  parseBranchTickets,
  armIntakeNarration
};
