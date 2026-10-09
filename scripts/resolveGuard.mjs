/**
 * Resolve shared savyre-guard.mjs (same host as Cursor / Claude).
 */
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PLUGIN_ROOT = path.resolve(HERE, '..');

export function resolveGuardPath() {
  const env = String(process.env.SAVYRE_GUARD_PATH || '').trim();
  if (env && existsSync(env)) return env;

  const sibling = path.join(PLUGIN_ROOT, '..', 'savyre-cursor-plugin', 'hooks', 'savyre-guard.mjs');
  if (existsSync(sibling)) return sibling;

  const localCursor = path.join(
    os.homedir(),
    '.cursor',
    'plugins',
    'local',
    'savyre-cursor-plugin',
    'hooks',
    'savyre-guard.mjs'
  );
  if (existsSync(localCursor)) return localCursor;

  return null;
}

export function pluginRoot() {
  return PLUGIN_ROOT;
}
