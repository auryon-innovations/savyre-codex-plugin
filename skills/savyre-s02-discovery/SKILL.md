---
name: savyre-s02-discovery
description: >-
  Savyre stage 2 in Codex. Map the code the approved task touches and record
  impact. Do not rewrite acceptance criteria or change application source.
---

# S02 Code Discovery

Read the approved task, diagram, and acceptance criteria from stage 1. Those are the search target. Do not draft criteria again.

1. If the project has no application source, write a short skipped report in `stages/s02_code_discovery/codebase_impact_report.md` that says no application code was found, set `stage` to `s03`, and say stage 2 is skipped.
2. Otherwise read the files that can change for this task. Record paths, what you observed, and what you inferred. Do not invent a stack.
3. Write the report with: scope and limits, relevant files, reuse versus new work, affected surfaces, and risks that need a check. Separate observation from inference.
4. A mermaid diagram is optional and must follow the stage 1 diagram rules: camelCase ids, quoted labels, no underscores, parentheses, or colons.
5. Do not edit application source. When the report is on disk, set `stage` to `s03` and say discovery is ready for the plan.
