import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  writeProjectProfile
} from "./chunk-7PAZZ5LP.js";
import {
  toPosixPath
} from "./chunk-LYNDVGNE.js";
import {
  FrameworkError
} from "./chunk-SCQTSYE4.js";
import {
  PATHS
} from "./chunk-IHMBVS6H.js";
import {
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/onboarding/manifest-writer.ts
init_esm_shims();
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { homedir } from "os";
import { dirname, join, relative, sep } from "path";
function writeProjectProfile2(projectRoot, profile) {
  return writeProjectProfile(projectRoot, profile);
}
function writeDetectionReport(projectRoot, report) {
  const path = join(projectRoot, PATHS.DETECTION_REPORT);
  mkdirSync(dirname(path), { recursive: true });
  const sanitized = sanitizeDetectionReport(projectRoot, report);
  writeJsonPreservingTimestamp(path, sanitized, "timestamp");
  return path;
}
function writeFrameworkMetadata(projectRoot, version) {
  mkdirSync(dirname(join(projectRoot, PATHS.FRAMEWORK_VERSION)), {
    recursive: true
  });
  writeFrameworkVersionPreservingTimestamp(
    join(projectRoot, PATHS.FRAMEWORK_VERSION),
    version,
    (/* @__PURE__ */ new Date()).toISOString()
  );
  writeFileSync(join(projectRoot, PATHS.FRAMEWORK_PATH), `${resolveFrameworkInstallReference()}
`);
}
function readExistingOnboardingManifest(projectRoot) {
  const path = join(projectRoot, PATHS.ONBOARDING_MANIFEST);
  if (!existsSync(path)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    throw new FrameworkError(
      "Project registry corrupted \u2014 the onboarding manifest is not valid JSON. Contact support.",
      {
        code: "REGISTRY_CORRUPTED",
        cause: error,
        details: { manifest_path: PATHS.ONBOARDING_MANIFEST }
      }
    );
  }
}
function writeOnboardingManifest(projectRoot, manifest) {
  const path = join(projectRoot, PATHS.ONBOARDING_MANIFEST);
  mkdirSync(dirname(path), { recursive: true });
  const previous = readPreviousJson(path);
  const removedAgents = previous?.removed_stage_agents;
  const sanitized = sanitizeOnboardingManifest(projectRoot, {
    ...manifest,
    ...manifest.removed_stage_agents === void 0 && Array.isArray(removedAgents) ? { removed_stage_agents: removedAgents } : {}
  });
  writeJsonPreservingTimestamp(path, sanitized, ["generated_at", "detected.timestamp"]);
  return path;
}
function writeJsonPreservingTimestamp(path, value, timestampFields) {
  const fields = typeof timestampFields === "string" ? [timestampFields] : timestampFields;
  const previous = readPreviousJson(path);
  if (previous !== null) {
    const candidate = JSON.parse(JSON.stringify(value));
    for (const field of fields) {
      const previousTimestamp = readNestedString(previous, field);
      if (previousTimestamp !== null) {
        writeNestedString(candidate, field, previousTimestamp);
      }
    }
    const candidateJson = `${JSON.stringify(candidate, null, 2)}
`;
    const existing = readFileSync(path, "utf8");
    if (candidateJson === existing) {
      return;
    }
  }
  writeFileSync(path, `${JSON.stringify(value, null, 2)}
`);
}
function writeFrameworkVersionPreservingTimestamp(path, version, now) {
  const previous = readPreviousFrameworkVersion(path);
  const timestamp = previous && previous.version === version ? previous.updatedAt : now;
  writeFileSync(path, `version=${version}
updated_at=${timestamp}
`);
}
function readPreviousJson(path) {
  if (!existsSync(path)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}
function readNestedString(value, path) {
  let current = value;
  for (const segment of path.split(".")) {
    if (!isSafePropertySegment(segment) || !current || typeof current !== "object" || Array.isArray(current) || !Object.hasOwn(current, segment)) {
      return null;
    }
    current = current[segment];
  }
  return typeof current === "string" ? current : null;
}
function writeNestedString(value, path, next) {
  const segments = path.split(".");
  let current = value;
  for (const segment of segments.slice(0, -1)) {
    if (!isSafePropertySegment(segment) || !Object.hasOwn(current, segment)) {
      return;
    }
    const child = current[segment];
    if (!child || typeof child !== "object" || Array.isArray(child)) {
      return;
    }
    current = child;
  }
  const leaf = segments.at(-1);
  if (leaf && isSafePropertySegment(leaf)) {
    Object.defineProperty(current, leaf, {
      value: next,
      enumerable: true,
      configurable: true,
      writable: true
    });
  }
}
function isSafePropertySegment(segment) {
  return segment !== "__proto__" && segment !== "prototype" && segment !== "constructor";
}
function readFrameworkVersion(path) {
  return readPreviousFrameworkVersion(path)?.version ?? null;
}
function readPreviousFrameworkVersion(path) {
  if (!existsSync(path)) {
    return null;
  }
  try {
    const content = readFileSync(path, "utf8");
    const versionMatch = content.match(/^version=(.*)$/m);
    const updatedMatch = content.match(/^updated_at=(.*)$/m);
    if (!versionMatch || !updatedMatch) {
      return null;
    }
    return { version: versionMatch[1].trim(), updatedAt: updatedMatch[1].trim() };
  } catch {
    return null;
  }
}
function resolveFrameworkInstallPath() {
  return process.env.PAQAD_FRAMEWORK_HOME ?? toPosixPath(join(homedir(), ".paqad-ai/current"));
}
function resolveFrameworkInstallReference() {
  return process.env.PAQAD_FRAMEWORK_HOME ? "$PAQAD_FRAMEWORK_HOME" : "~/.paqad-ai/current";
}
function sanitizeDetectionReport(projectRoot, report) {
  return {
    ...report,
    signals: (report.signals ?? []).map((signal) => ({
      ...signal,
      file: sanitizePersistedPath(projectRoot, signal.file)
    })),
    repository: report.repository ? sanitizeRepositoryContext(projectRoot, report.repository) : void 0
  };
}
function sanitizeOnboardingManifest(projectRoot, manifest) {
  return {
    ...manifest,
    project_root: typeof manifest.project_root === "string" ? sanitizePersistedPath(projectRoot, manifest.project_root) : manifest.project_root,
    detected: manifest.detected ? sanitizeDetectionReport(projectRoot, manifest.detected) : null,
    repository: manifest.repository ? sanitizeRepositoryContext(projectRoot, manifest.repository) : void 0,
    generated_artifacts: [...manifest.generated_artifacts ?? []].map((artifact) => ({
      ...artifact,
      path: sanitizePersistedPath(projectRoot, artifact.path)
    })).sort((left, right) => comparePaths(left.path, right.path)),
    planning_artifacts: manifest.planning_artifacts ? {
      ...manifest.planning_artifacts,
      compiled_rules_path: sanitizePersistedPath(
        projectRoot,
        manifest.planning_artifacts.compiled_rules_path
      )
    } : manifest.planning_artifacts
  };
}
function sanitizeStackSnapshotRepository(projectRoot, snapshot) {
  if (!snapshot.repository) return snapshot;
  return { ...snapshot, repository: sanitizeRepositoryContext(projectRoot, snapshot.repository) };
}
function sanitizeRepositoryContext(projectRoot, repository) {
  return {
    ...repository,
    selected_root: sanitizePersistedPath(projectRoot, repository.selected_root),
    ignored_paths: repository.ignored_paths.map((path) => sanitizePersistedPath(projectRoot, path)).filter((path) => !isDeveloperLocalNoise(path)).sort(comparePaths),
    projects: repository.projects.map((project) => sanitizeRepositoryProject(projectRoot, project)),
    applications: repository.applications.map(
      (application) => sanitizeRepositoryApplication(projectRoot, application)
    ),
    primary_project_root: repository.primary_project_root === null ? null : sanitizePersistedPath(projectRoot, repository.primary_project_root)
  };
}
var DEVELOPER_LOCAL_PATH_SEGMENTS = /* @__PURE__ */ new Set([".DS_Store", ".idea", ".vscode"]);
function isDeveloperLocalNoise(path) {
  return toPosixPath(path).split("/").some((segment) => DEVELOPER_LOCAL_PATH_SEGMENTS.has(segment));
}
function comparePaths(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}
function sanitizeRepositoryProject(projectRoot, project) {
  return {
    ...project,
    root: sanitizePersistedPath(projectRoot, project.root),
    parent_root: project.parent_root === null ? null : sanitizePersistedPath(projectRoot, project.parent_root)
  };
}
function sanitizeRepositoryApplication(projectRoot, application) {
  return {
    ...application,
    root: sanitizePersistedPath(projectRoot, application.root),
    component_roots: application.component_roots.map(
      (root) => sanitizePersistedPath(projectRoot, root)
    )
  };
}
function sanitizePersistedPath(projectRoot, value) {
  if (value === ".") {
    return value;
  }
  const normalizedValue = toPosixPath(value);
  const normalizedRoot = toPosixPath(projectRoot);
  if (normalizedValue === normalizedRoot) {
    return ".";
  }
  const prefix = normalizedRoot.endsWith("/") ? normalizedRoot : `${normalizedRoot}/`;
  if (normalizedValue.startsWith(prefix)) {
    return normalizedValue.slice(prefix.length);
  }
  const isAbsoluteWindows = /^[a-zA-Z]:\//.test(normalizedValue);
  const isAbsolutePosix = normalizedValue.startsWith("/");
  if (!isAbsoluteWindows && !isAbsolutePosix) {
    return normalizedValue;
  }
  const relativePath = relative(projectRoot, value);
  if (relativePath === "") {
    return ".";
  }
  if (relativePath !== ".." && !relativePath.startsWith(`..${sep}`)) {
    return toPosixPath(relativePath);
  }
  return normalizedValue;
}

export {
  writeProjectProfile2 as writeProjectProfile,
  writeDetectionReport,
  writeFrameworkMetadata,
  readExistingOnboardingManifest,
  writeOnboardingManifest,
  writeJsonPreservingTimestamp,
  writeFrameworkVersionPreservingTimestamp,
  readFrameworkVersion,
  resolveFrameworkInstallPath,
  sanitizeStackSnapshotRepository
};
