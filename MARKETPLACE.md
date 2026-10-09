# Marketplace / distribution (Codex)

This repo is the **Savyre Codex plugin** (skills + optional MCP wiring).

> **Important:** Codex **IDE extension** does not install plugins the way Cursor/Claude Code do. Install for **Codex CLI** and **ChatGPT desktop Codex**. For IDE Chat, use project skills (`.agents/skills`) + the **Savyre extension** host.

## Personal marketplace (ChatGPT desktop / Codex CLI)

```powershell
node scripts/install-personal.mjs
```

That copies this plugin to `%USERPROFILE%\.codex\plugins\savyre-codex` and writes/updates `%USERPROFILE%\.agents\plugins\marketplace.json`.

Then:

```text
codex plugin marketplace add %USERPROFILE%/.agents/plugins
# or open Plugins in ChatGPT desktop → Personal → install savyre-codex
```

In Codex CLI: `/plugins` → install **savyre-codex**.

## Project skills (works in more places, including IDE skill discovery)

```powershell
node scripts/install-project.mjs "C:\path\to\your-savyre-project"
```

Copies `skills/*` into `<project>/.agents/skills/`.

## Org candidate bundle

Seven-stage skills are authored in `savyre-ai-eng-org` and published outward:

```powershell
cd ..\savyre-ai-eng-org\packages\savyre-run-config
npm run publish:bundle
```

Do **not** copy `bundles/` from this plugin back into org.

## Public directory

Follow OpenAI’s plugin submit flow when ready:  
https://developers.openai.com/codex/plugins

Cursor `/savyre-next` parity requires **Savyre extension** MCP/commands — not this marketplace pack alone.
