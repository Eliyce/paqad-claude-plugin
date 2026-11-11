import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  sanitizeStackSnapshotRepository
} from "./chunk-WNOJLLGD.js";
import {
  PATHS
} from "./chunk-IHMBVS6H.js";
import {
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/introspection/cache.ts
init_esm_shims();
import { createHash } from "crypto";
import { readFileSync } from "fs";
import { mkdir, readFile, stat, writeFile } from "fs/promises";
import { dirname, join } from "path";
function readStackSnapshotSync(projectRoot) {
  try {
    return JSON.parse(
      readFileSync(join(projectRoot, PATHS.STACK_SNAPSHOT), "utf8")
    );
  } catch {
    return null;
  }
}
var StackSnapshotCache = class {
  async read(projectRoot) {
    try {
      const raw = await readFile(join(projectRoot, PATHS.STACK_SNAPSHOT), "utf8");
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  async write(projectRoot, snapshot) {
    const target = join(projectRoot, PATHS.STACK_SNAPSHOT);
    await mkdir(dirname(target), { recursive: true });
    const sanitized = sanitizeStackSnapshotRepository(projectRoot, snapshot);
    await writeFile(target, `${JSON.stringify(sanitized, null, 2)}
`);
  }
  async hashFiles(projectRoot, relativePaths) {
    const hashes = {};
    for (const relativePath of relativePaths) {
      try {
        const content = await readFile(join(projectRoot, relativePath), "utf8");
        hashes[relativePath] = `sha256:${createHash("sha256").update(content).digest("hex")}`;
      } catch {
        try {
          const pathStat = await stat(join(projectRoot, relativePath));
          hashes[relativePath] = pathStat.isDirectory() ? "exists:directory" : "exists:file";
        } catch {
          continue;
        }
      }
    }
    return hashes;
  }
};

export {
  readStackSnapshotSync,
  StackSnapshotCache
};
