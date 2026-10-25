#!/usr/bin/env node
/* Render the editable SVG brand assets using the same browser tooling as visual QA.
   Generated PNGs are checked in; normal site builds remain dependency-free. */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const result = spawnSync('python3', [fileURLToPath(new URL('./scripts/render-brand.py', import.meta.url))], { stdio: 'inherit' });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
