---
name: savyre-s06-readiness
description: >-
  Savyre stage 6 in Codex. Compare the finished work with the acceptance
  criteria and record blockers. Do not deploy, merge, or stamp acceptance yourself.
---

# S06 Delivery Readiness

1. Write `stages/s06_delivery_readiness/delivery_readiness_report.md`. Map every AC to the current code and the stage 5 result: verified, failed, unverified, or not applicable, with a reason.
2. Note real security, privacy, and regression gaps you can see in the change. Do not invent a vulnerability or call the app certified.
3. One failed or unverified required check means the recommendation is not ready.
4. Ask the developer to accept or to name what is still open. Set `waiting` to `acceptance`. Do not accept it yourself.
5. After they accept, or after they accept the listed gaps, set `stage` to `s07`.
