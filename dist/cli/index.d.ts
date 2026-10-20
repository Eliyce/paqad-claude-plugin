#!/usr/bin/env node
export { g as getRuntimeRoot } from '../runtime-paths-TW0qys7p.js';

declare function getCliBanner(): string;
declare function runCli(argv?: string[]): Promise<void>;
declare function shouldRunFromCommandLine(importMetaUrl: string, argvEntry: string | undefined): boolean;
declare function argvToEntrypoint(value: string | undefined): string | undefined;

export { argvToEntrypoint, getCliBanner, runCli, shouldRunFromCommandLine };
