---
name: savyre-run-stage
description: >-
  Start or resume the active Savyre stage in Codex. Use when a Savyre stage
  should run now. Route to the matching stage skill and write files in the
  open project. Do not invent a different workflow.
---

# Run Stage (Codex)

## Role

Pick the stage skill and follow it. You do not approve a stage yourself. The developer does, in chat.

## Stages

| stage | Skill | Main file |
| --- | --- | --- |
| s01 | savyre-s01-task | stages/s01_task_definition/task_brief.md |
| s02 | savyre-s02-discovery | stages/s02_code_discovery/codebase_impact_report.md |
| s03 | savyre-s03-plan | stages/s03_implementation_plan/implementation_plan.md |
| s04 | savyre-s04-build | stages/s04_build_review/change_report.md |
| s05 | savyre-s05-test | stages/s05_test_resolve/verification_report.md |
| s06 | savyre-s06-readiness | stages/s06_delivery_readiness/delivery_readiness_report.md |
| s07 | savyre-s07-handoff | stages/s07_handoff/delivery_summary.md |

## Procedure

1. Read `stages/savyre-session.md`. If it is missing, create it with `stage: s01` and `waiting: task-wording`, then follow `savyre-s01-task`.
2. Follow only the skill for the current `stage`.
3. After that skill's confirmation, move to the next stage and say so.
4. Name the active stage in the reply.

Do not skip a stage. Do not edit application source before s04.
