#!/usr/bin/env node
/**
 * Copy Codex skills into a Savyre project's .agents/skills and wire MCP.
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PLUGIN_ROOT = path.resolve(HERE, '..');
const skillsSrc = path.join(PLUGIN_ROOT, 'skills');
const projectRoot = path.resolve(process.argv[2] || process.cwd());
const mcpScript = path.join(PLUGIN_ROOT, 'scripts', 'savyre-mcp.mjs');

if (!existsSync(path.join(PLUGIN_ROOT, 'plugin.json'))) {
  console.error('Not a savyre-codex-plugin root');
  process.exit(1);
}

const destRoot = path.join(projectRoot, '.agents', 'skills');
mkdirSync(destRoot, { recursive: true });

const names = readdirSync(skillsSrc, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const name of names) {
  const from = path.join(skillsSrc, name);
  const to = path.join(destRoot, name);
  if (existsSync(to)) rmSync(to, { recursive: true, force: true });
  cpSync(from, to, { recursive: true });
}

const agentsMdSrc = path.join(PLUGIN_ROOT, 'AGENTS.md');
const agentsMdDest = path.join(projectRoot, 'AGENTS.md');
if (existsSync(agentsMdSrc) && !existsSync(agentsMdDest)) {
  cpSync(agentsMdSrc, agentsMdDest);
}

writeFileSync(
  path.join(projectRoot, '.agents', 'SAVYRE_CODEX.md'),
  [
    '# Savyre Codex skills',
    '',
    `Installed from savyre-codex-plugin.`,
    `Skills: ${names.join(', ')}`,
    '',
    'Continue/next options:',
    '1. Command Palette → **Savyre: Next** (requires savyre-extension ≥ 0.3.89)',
    '2. MCP tools `savyre_next` / `savyre_answer` (see project `.mcp.json`)',
    '3. CLI: `node …/savyre-codex-plugin/scripts/savyre-cli.mjs next`',
    '',
    'Do not use Cursor `/savyre-next` inside the Codex IDE tab.',
    ''
  ].join('\n'),
  'utf8'
);

const mcpPath = path.join(projectRoot, '.mcp.json');
let mcp = { mcpServers: {} };
if (existsSync(mcpPath)) {
  try {
    mcp = JSON.parse(readFileSync(mcpPath, 'utf8'));
  } catch {
    mcp = { mcpServers: {} };
  }
}
if (!mcp.mcpServers || typeof mcp.mcpServers !== 'object') mcp.mcpServers = {};
mcp.mcpServers.savyre = {
  command: 'node',
  args: [mcpScript.replace(/\\/g, '/')],
  env: {
    SAVYRE_WORKSPACE: projectRoot.replace(/\\/g, '/')
  }
};
writeFileSync(mcpPath, `${JSON.stringify(mcp, null, 2)}\n`, 'utf8');

console.log(
  JSON.stringify(
    {
      ok: true,
      projectRoot,
      skills: names.map((n) => path.join('.agents', 'skills', n)),
      mcp: '.mcp.json → savyre',
      note: 'Reload Codex / enable MCP. Use $savyre-chat or call savyre_next.'
    },
    null,
    2
  )
);
