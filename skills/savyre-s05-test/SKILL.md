---
name: savyre-s05-test
description: >-
  Savyre stage 5 in Codex. Run the checks for every acceptance criterion and
  record pass, fail, or unverified. Do not edit application source or tests here.
---

# S05 Test and Resolve

1. List the tests that already exist and the command that runs them.
2. Write `stages/s05_test_resolve/verification_report.md` with every active AC and a status of passed, failed, blocked, or unverified. A missing check is unverified, not passed.
3. Run the project's existing test command when it is safe and local. Record the command, exit, and which AC it covers. Do not claim a pass you did not run.
4. Do not create or edit tests or application source in this stage. If a check is missing or failed, name a stage 4 rework item and set `stage` back to `s04` for that item only. After that item is done, return here and rerun.
5. When every required AC is passed or explicitly not applicable, set `stage` to `s06`.
