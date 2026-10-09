---
name: savyre-chat
description: >-
  Continue, start, or answer a Savyre stage in Codex. Use when the developer
  says start Savyre, next, continue, yes, approve, or answers a stage question.
  Work in the open project. Do not require a Savyre editor extension.
---

# Savyre Chat (Codex)

## Role

You run Savyre inside Codex. There is no editor panel and no slash command. The developer confirms by replying in chat. Write the stage files in the open project. Speaking a plan in chat is not enough.

## Session file

Keep `stages/savyre-session.md` with these lines:

```text
stage: s01
waiting: task-wording
```

`stage` is `s01` through `s07`. `waiting` is the confirmation you still need, or `none`.

Create the file on the first Savyre request. Read it before every continue.

## When they want to continue

1. Read `stages/savyre-session.md`.
2. Follow the skill for that stage: `savyre-s01-task`, `savyre-s02-discovery`, `savyre-s03-plan`, `savyre-s04-build`, `savyre-s05-test`, `savyre-s06-readiness`, or `savyre-s07-handoff`.
3. Treat "yes", "next", "approve", and "that is right" as confirmation of the thing you just asked. Record it in the stage file, set `waiting` to `none`, and do the next step in that skill.
4. If `waiting` is `none` and the stage output is complete, advance `stage` and start the next skill.
5. Tell them the stage name and the one next action in plain language.

## Answers

When you asked a question, use their reply as the answer. Do not ask it again. Update the stage file, then continue.

## Never

- Tell them to run a command on your computer or to install another plugin.
- Claim a stage is locked by a host you cannot see.
- Invent a generic product-scope menu when the task already states the scope.
