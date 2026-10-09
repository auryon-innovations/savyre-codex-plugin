---
name: savyre-s04-build
description: >-
  Savyre stage 4 in Codex. Implement one approved backlog item on disk, including
  its test when required. If a done check fails because an earlier item is not
  done, switch to that earlier item and edit the files the error names.
---

# S04 Build and Review

Work one approved backlog item at a time. Write the code and tests in the project. A plan in chat is not implementation.

1. Pick the first item whose dependencies are done. Say its id. If `tddApplicability` is `required`, write the failing test first, run it, then make the smallest production change that makes it pass.
2. Update `stages/s04_build_review/change_report.md` for that item only: files changed, test result, and done check.
3. When a done check needs a running app, you may run the project's existing start script (`npm start`, `npm run dev`, or `npm run start`, including changing into that package) and one request to localhost or 127.0.0.1. Do not install packages, deploy, change git, or edit secret files such as an env file.
4. If that check fails because a dependency item is not actually done, stop the current item. The rest of this turn implements the unmet dependency. Edit the files the error names. Record the switch in the change report, then rerun the check.
5. After the item is done, review the diff and add findings, or say there are none, in `stages/s04_build_review/code_review.md`. Then stop and name the next item. Do not start it until they say to continue.
6. When every item is done, set `stage` to `s05`.

Match the existing UI theme when the repo has one. Do not browse the web to copy another product's screens.
