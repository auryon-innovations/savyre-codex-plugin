---
name: savyre-s03-plan
description: >-
  Savyre stage 3 in Codex. Write a technical plan and backlog from the approved
  task and discovery. Do not add product requirements or edit application source.
---

# S03 Implementation Plan

Use the approved stage 1 criteria and the stage 2 report. Do not invent new product outcomes. A new outcome goes back to stage 1.

1. Write `stages/s03_implementation_plan/implementation_plan.md` with small backlog items. Each item has a stable id, the AC it covers, the files it may touch, dependencies, a done check, and `tddApplicability` of `required` or `exempt`.
2. Map every active AC to at least one item. Default checkable behavior to `required`. An exemption needs the developer's approval and another way to verify.
3. Do not write application source or test files in this stage.
4. Ask them to approve this exact backlog. Set `waiting` to `plan`.
5. After they approve, set `stage` to `s04` and name the first item that has no unfinished dependency.
