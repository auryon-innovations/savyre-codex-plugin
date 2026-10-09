# Savyre + Codex

You are assisting inside a **Savyre** AI coding workflow when this project uses the Savyre extension.

## Hard rules

- Do **not** invent stage progress, ACCEPTED, or unlocks.
- Do **not** pretend Cursor `/savyre-next` exists in Codex IDE Chat.
- When the developer wants to continue / next / lock / answer an open question:
  1. Prefer the **Savyre panel** Next action, or
  2. VS Code/Cursor Command Palette: **Savyre: Next** / **Savyre: Answer** (when available), or
  3. Call a **Savyre MCP** tool for next/answer if configured in this workspace.
- Follow the active stage. Do not skip stages.
- Markdown stages: write stage output only where the stage contract allows.
- Implementation / Build & Review: edit application files on disk when that stage is active; do not only print code.
- Never invent canned minimum-functionality / generic CRUD open questions when the assigned task already locks UI-only / no auth / no backend.

## Skills

Use `$savyre-chat` for continue/next guidance and `$savyre-run-stage` to pick the stage role skill. Candidate seven-stage skills may also be installed under `.agents/skills/` or this plugin’s `skills/` / `bundles/`.
