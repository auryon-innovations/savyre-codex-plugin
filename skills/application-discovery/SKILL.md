---
name: application-discovery
description: >-
  Inspect only the code a confirmed Savyre task touches, draw that path, and
  leave acceptance criteria until after the diagram. Use during Savyre stage 1
  for a new app or a large feature. Skip the long pass for a clear bug fix.
---

# Application Discovery

Stage 1 owns the task. This skill fills the brief after the developer confirms the wording and before acceptance criteria.

Write `stages/s01_task_definition/task_brief.md` in this order:

1. Confirmed task.
2. Task-related discovery. Read the screen or command, the API, the data, and one similar feature. Record the stack and current behavior. Do not audit the whole repository.
3. Current-path mermaid, or **No existing flow** when there is no application code. Use camelCase ids, quoted labels, and no underscores, parentheses, or colons.
4. Acceptance criteria only after that section. Each `AC-###` states the requested change and, when code exists, today's behavior.

A clear bug fix gets a short look, a small diagram, and criteria for that fix.

Ask at most three questions, and only when a missing fact would change the build. Offer Guide me, Recommend defaults, or Decide for me. If the task and the code already answer it, do not ask.
