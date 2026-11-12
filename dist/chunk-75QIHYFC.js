import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  collectRuleFiles
} from "./chunk-OLRYZY65.js";
import {
  loadRuleScriptMap
} from "./chunk-DBTSAX5P.js";
import {
  embedRuleMarker,
  mintRuleId,
  parseRuleMarker,
  ruleTextHash,
  stripRuleMarker
} from "./chunk-44YHEBNF.js";
import {
  renameWithRetrySync
} from "./chunk-Z3NGWHFX.js";
import {
  PATHS
} from "./chunk-IHMBVS6H.js";
import {
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/rule-scripts/editor.ts
init_esm_shims();
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
function writeRuleFile(abs, text) {
  mkdirSync(dirname(abs), { recursive: true });
  const tmp = `${abs}.${process.pid}.tmp`;
  writeFileSync(tmp, text, "utf8");
  renameWithRetrySync(tmp, abs);
}
function takenIds(projectRoot) {
  const taken = /* @__PURE__ */ new Set();
  for (const r of loadRuleScriptMap(projectRoot)?.rules ?? []) {
    taken.add(r.id);
  }
  for (const r of loadRuleScriptMap(projectRoot)?.archived ?? []) {
    taken.add(r.id);
  }
  for (const rel of collectRuleFiles(projectRoot)) {
    for (const line of readFileSync(join(projectRoot, rel), "utf8").split("\n")) {
      const id = parseRuleMarker(line);
      if (id) {
        taken.add(id);
      }
    }
  }
  return taken;
}
function cleanRuleText(input) {
  return input.trim().replace(/^[-*]\s+/, "");
}
function assertRuleSource(sourceRel) {
  const normalized = sourceRel.split("\\").join("/");
  if (!normalized.startsWith(`${PATHS.RULES_DIR}/`) || !normalized.endsWith(".md")) {
    throw new Error(
      `addRule: source must be a .md file under ${PATHS.RULES_DIR}/ (got "${sourceRel}")`
    );
  }
}
function addRule(projectRoot, sourceRel, text, options = {}) {
  assertRuleSource(sourceRel);
  const abs = join(projectRoot, sourceRel);
  const clean = cleanRuleText(text);
  const id = mintRuleId(sourceRel, clean, takenIds(projectRoot));
  const bullet = embedRuleMarker(`- ${clean}`, id, options.discovered);
  let existing = "";
  try {
    existing = readFileSync(abs, "utf8");
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }
  const sep = existing.length > 0 && !existing.endsWith("\n") ? "\n" : "";
  writeRuleFile(abs, `${existing}${sep}${bullet}
`);
  return { id, source: sourceRel, text: clean, text_hash: ruleTextHash(clean) };
}
function locateRule(projectRoot, ruleId) {
  for (const rel of collectRuleFiles(projectRoot)) {
    const lines = readFileSync(join(projectRoot, rel), "utf8").split("\n");
    const line = lines.findIndex((l) => parseRuleMarker(l) === ruleId);
    if (line >= 0) {
      return { source: rel, line, lines };
    }
  }
  return null;
}
function editRuleText(projectRoot, ruleId, newText, options = {}) {
  const located = locateRule(projectRoot, ruleId);
  if (!located) {
    return null;
  }
  const original = located.lines[located.line];
  const indent = /^(\s*)/.exec(original)?.[1] ?? "";
  const marker = /^[-*]/.exec(stripRuleMarker(original).text.trim())?.[0] ?? "-";
  const clean = cleanRuleText(newText);
  located.lines[located.line] = embedRuleMarker(
    `${indent}${marker} ${clean}`,
    ruleId,
    options.discovered
  );
  writeRuleFile(join(projectRoot, located.source), located.lines.join("\n"));
  return { source: located.source };
}
function removeRuleBullet(projectRoot, ruleId) {
  const located = locateRule(projectRoot, ruleId);
  if (!located) {
    return null;
  }
  located.lines.splice(located.line, 1);
  writeRuleFile(join(projectRoot, located.source), located.lines.join("\n"));
  return { source: located.source };
}

export {
  cleanRuleText,
  addRule,
  editRuleText,
  removeRuleBullet
};
