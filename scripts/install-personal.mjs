#!/usr/bin/env node
/**
 * Install this plugin into the personal Codex/ChatGPT marketplace layout.
 * Does not modify Cursor or Claude plugins.
 */
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PLUGIN_ROOT = path.resolve(HERE, '..');
const home = os.homedir();
const agentsPlugins = path.join(home, '.agents', 'plugins');
const destPlugin = path.join(agentsPlugins, 'plugins', 'savyre-codex');
const marketplacePath = path.join(agentsPlugins, 'marketplace.json');

const SKIP = new Set(['.git', 'node_modules', 'marketplace']);

function copyPlugin(src, dest) {
  if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
  mkdirSync(path.dirname(dest), { recursive: true });
  cpSync(src, dest, {
    recursive: true,
    filter: (p) => {
      const base = path.basename(p);
      return !SKIP.has(base);
    }
  });
}

copyPlugin(PLUGIN_ROOT, destPlugin);

const entry = {
  name: 'savyre-codex',
  source: { source: 'local', path: './plugins/savyre-codex' },
  policy: { installation: 'AVAILABLE', authentication: 'ON_INSTALL' },
  category: 'Productivity'
};

let marketplace = {
  name: 'savyre-codex-marketplace',
  interface: { displayName: 'Savyre Codex' },
  plugins: []
};

if (existsSync(marketplacePath)) {
  try {
    marketplace = JSON.parse(readFileSync(marketplacePath, 'utf8'));
    if (!Array.isArray(marketplace.plugins)) marketplace.plugins = [];
  } catch {
    /* replace */
  }
}

marketplace.name = marketplace.name || 'savyre-codex-marketplace';
marketplace.interface = marketplace.interface || { displayName: 'Savyre Codex' };
marketplace.plugins = marketplace.plugins.filter((p) => p?.name !== 'savyre-codex');
marketplace.plugins.push(entry);

mkdirSync(agentsPlugins, { recursive: true });
writeFileSync(marketplacePath, `${JSON.stringify(marketplace, null, 2)}\n`, 'utf8');

console.log(
  JSON.stringify(
    {
      ok: true,
      plugin: destPlugin,
      marketplace: marketplacePath,
      next: [
        'Restart ChatGPT desktop (Codex) or open Codex CLI',
        'CLI: codex → /plugins → install savyre-codex',
        'IDE Codex tab: also run install-project.mjs on your Savyre project for .agents/skills'
      ]
    },
    null,
    2
  )
);
