#!/usr/bin/env node
/**
 * node scripts/savyre-cli.mjs next|start|status|answer|stop|turn …
 * Forwards to shared savyre-guard.mjs (Cursor/Claude host).
 */
import { spawnSync } from 'node:child_process';
import { resolveGuardPath } from './resolveGuard.mjs';

const args = process.argv.slice(2);
const guard = resolveGuardPath();
if (!guard) {
  process.stderr.write(
    'Savyre guard not found. Install savyre-cursor-plugin as a sibling, or set SAVYRE_GUARD_PATH to savyre-guard.mjs.\n'
  );
  process.exit(1);
}

const result = spawnSync(process.execPath, [guard, ...args], {
  cwd: process.cwd(),
  env: process.env,
  encoding: 'utf8',
  stdio: ['inherit', 'pipe', 'pipe']
});

if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);
process.exit(result.status == null ? 1 : result.status);
