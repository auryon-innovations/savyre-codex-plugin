---
name: savyre-s01-task
description: >-
  Savyre stage 1 in Codex. Capture the task, confirm it, inspect only the code
  that task touches, draw a mermaid diagram, ask only if a missing fact would
  change the build, then draft acceptance criteria for approval.
---

# S01 Task Definition

Do this in order. Write files in the open project.

1. Restate the task in 2 to 4 sentences in `stages/s01_task_definition/stage_input.md`. Set session `waiting` to `task-wording`. Stop until they confirm. Do not write the brief yet.
2. After they confirm, set `waiting` to `none`. Read only the path that task touches: the screen or command, the API, the data, and one similar feature. Do not audit the repository. No application code means write **No existing flow**.
3. Write `stages/s01_task_definition/task_brief.md` with the confirmed task, that discovery, and a current-path mermaid diagram. Every node comes from a file or flow you just found.
4. Pause before acceptance criteria. Ask at most three questions only when a missing fact would change the workflow, scope, or feasibility. Offer Guide me, Recommend defaults, or Decide for me. "You choose" means Decide for me. Wait. If the task and the code already decide it, write **No open questions identified** and do not ask.
5. Draft `AC-###` only after the diagram or the no-existing-flow note. Each criterion has an id, an observable action, and a checkable result. When code exists, state today's behavior and the requested change.
6. Write `stages/s01_task_definition/challenge_findings.json` with `schemaVersion` `1.0` and a `findings` array. Empty is allowed. Name the AC ids and ask them to approve that set. Set `waiting` to `acceptance-criteria`.
7. After they approve, set `stage` to `s02`.

## Mermaid

Use camelCase node ids. Put every label in double quotes. Do not use underscores, parentheses, or colons in the diagram. Write `env file` instead of an env filename, and `MONGO URI` instead of a name that contains an underscore. Edge labels are short words with no colon, such as `-->|connected|`.

## Questions

Ask only for a real undecided product decision. Give three choices for this app. Do not invent a generic menu about minimum functionality, create/edit/delete core items, sharing, or offline sync.
