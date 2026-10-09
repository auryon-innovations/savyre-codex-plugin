#!/usr/bin/env node
/**
 * Minimal stdio MCP server for Codex:
 *   tools: savyre_next, savyre_answer, savyre_start, savyre_status, savyre_stop
 * Runs the shared guard with cwd = SAVYRE_WORKSPACE or process.cwd().
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveGuardPath } from './resolveGuard.mjs';

const SERVER_NAME = 'savyre';
const SERVER_VERSION = '0.1.0';

function workspaceCwd() {
  const w = String(process.env.SAVYRE_WORKSPACE || '').trim();
  return w || process.cwd();
}

function runGuard(argv) {
  const guard = resolveGuardPath();
  if (!guard) {
    return {
      ok: false,
      error:
        'Savyre guard not found. Set SAVYRE_GUARD_PATH or install savyre-cursor-plugin next to savyre-codex-plugin.'
    };
  }
  const result = spawnSync(process.execPath, [guard, ...argv], {
    cwd: workspaceCwd(),
    env: process.env,
    encoding: 'utf8',
    maxBuffer: 8 * 1024 * 1024
  });
  const stdout = String(result.stdout || '').trim();
  const stderr = String(result.stderr || '').trim();
  let json = null;
  try {
    json = stdout ? JSON.parse(stdout) : null;
  } catch {
    json = null;
  }
  return {
    ok: result.status === 0,
    exitCode: result.status,
    json,
    stdout,
    stderr,
    userMessage: json?.userMessage || null,
    message: json?.message || null
  };
}

const TOOLS = [
  {
    name: 'savyre_next',
    description:
      'Continue the active Savyre stage (confirm → lock → validate → rebind). Same as Cursor /savyre-next. Does not unlock by itself.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false }
  },
  {
    name: 'savyre_start',
    description: 'Bind Codex/Chat to the current Savyre panel stage (same as /savyre-start).',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false }
  },
  {
    name: 'savyre_status',
    description: 'Show Savyre Chat checkpoint / turn status for the bound stage.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false }
  },
  {
    name: 'savyre_stop',
    description: 'Turn the Savyre stage lock off (does not accept the stage).',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false }
  },
  {
    name: 'savyre_answer',
    description:
      'Record an open-question or design-checkpoint answer. Pass choice 1/2/3 and optional OQ id.',
    inputSchema: {
      type: 'object',
      properties: {
        answer: { type: 'string', description: 'Answer text or choice id (1, 2, or 3)' },
        questionId: {
          type: 'string',
          description: 'Optional OQ id such as OQ-001'
        }
      },
      required: ['answer'],
      additionalProperties: false
    }
  }
];

function toolResult(payload) {
  const text = JSON.stringify(payload, null, 2);
  return {
    content: [{ type: 'text', text }],
    structuredContent: payload
  };
}

function callTool(name, args) {
  const a = args && typeof args === 'object' ? args : {};
  if (name === 'savyre_next') return toolResult(runGuard(['next']));
  if (name === 'savyre_start') return toolResult(runGuard(['start']));
  if (name === 'savyre_status') return toolResult(runGuard(['status']));
  if (name === 'savyre_stop') return toolResult(runGuard(['stop']));
  if (name === 'savyre_answer') {
    const answer = String(a.answer || '').trim();
    const qid = String(a.questionId || '').trim();
    if (!answer) return toolResult({ ok: false, error: 'answer is required' });
    const argv = qid ? ['answer', qid, answer] : ['answer', answer];
    return toolResult(runGuard(argv));
  }
  return toolResult({ ok: false, error: `Unknown tool ${name}` });
}

let buffer = '';

function writeMessage(msg) {
  const body = JSON.stringify(msg);
  process.stdout.write(`Content-Length: ${Buffer.byteLength(body, 'utf8')}\r\n\r\n${body}`);
}

function handleMessage(msg) {
  const id = msg.id;
  const method = msg.method;
  if (method === 'initialize') {
    writeMessage({
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: { name: SERVER_NAME, version: SERVER_VERSION }
      }
    });
    return;
  }
  if (method === 'notifications/initialized' || method === 'initialized') {
    return;
  }
  if (method === 'tools/list') {
    writeMessage({ jsonrpc: '2.0', id, result: { tools: TOOLS } });
    return;
  }
  if (method === 'tools/call') {
    const name = String(msg.params?.name || '');
    const args = msg.params?.arguments || {};
    try {
      const result = callTool(name, args);
      writeMessage({ jsonrpc: '2.0', id, result });
    } catch (e) {
      writeMessage({
        jsonrpc: '2.0',
        id,
        error: { code: -32000, message: String(e?.message || e) }
      });
    }
    return;
  }
  if (method === 'ping') {
    writeMessage({ jsonrpc: '2.0', id, result: {} });
    return;
  }
  if (id !== undefined) {
    writeMessage({
      jsonrpc: '2.0',
      id,
      error: { code: -32601, message: `Method not found: ${method}` }
    });
  }
}

process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  buffer += chunk;
  while (true) {
    const headerEnd = buffer.indexOf('\r\n\r\n');
    if (headerEnd < 0) break;
    const header = buffer.slice(0, headerEnd);
    const match = /Content-Length:\s*(\d+)/i.exec(header);
    if (!match) {
      buffer = buffer.slice(headerEnd + 4);
      continue;
    }
    const len = Number(match[1]);
    const start = headerEnd + 4;
    const end = start + len;
    if (buffer.length < end) break;
    const raw = buffer.slice(start, end);
    buffer = buffer.slice(end);
    try {
      handleMessage(JSON.parse(raw));
    } catch {
      /* ignore bad frame */
    }
  }
});

// Keep alive
process.stdin.on('end', () => process.exit(0));

// Help when run by hand
if (process.argv.includes('--help')) {
  process.stderr.write(
    `Savyre MCP (${path.basename(fileURLToPath(import.meta.url))})\nTools: ${TOOLS.map((t) => t.name).join(', ')}\n`
  );
  process.exit(0);
}
