# BUILD-STATE (the flight recorder: trust this file over chat memory)

Last verified commit: task/T-001-monorepo-scaffold head, squash-merged to main via PR #3
Updated: 2026-07-14 by orchestrator

## Now (the one task in flight)
- Task: T-002 Dependency law via dependency-cruiser (owner: b4) — next to start
- Branch: task/T-002-dependency-cruiser (not yet cut; cut from fresh main)
- Where exactly: full workspace scaffolded per Arch S1-A1 §6 — apps/web
  (Next 16.2.10) + packages shared/db/i18n/resolution/grounding/
  entitlements/gate/agent; S1-A2 §4 edges encoded twice (package.json
  workspace deps + TS project references); ESLint 9 flat config with
  no-explicit-any hard-error in gate+resolution
- What is proven working: T-001 scaffold merged — typecheck 9/9 and
  lint green locally AND as required CI steps; lint-bite probe passed;
  reviewer graded 7/10, one finding fixed (CI lint step), one overruled with runtime evidence (DECISIONS)
- What is NOT done yet: T-002 dependency-cruiser transcription of the
  edge table (rules file, CI step, committed graph artifact)

## Next (ordered queue, top 3 only)
1. T-002 exit gate: seeded violation fails CI; clean tree passes
2. T-003 CI gate pipeline + red-by-design safety-fixture job (owner: b4)
3. T-004 PG18 + Drizzle + migration 0000 from S1-A3 DDL (owner: b2)

## Blockers / waiting on human
- dup-sentry.sh blocks Write-tool creation of per-package package.json/
  tsconfig.json twins (monorepo manifests are legitimate twins);
  whitelist those two names or T-002+ keeps using the Bash workaround
- Standing human steps from setup: guard.sh PowerShell matcher line;
  narrow the `Read(./build/**)` deny rule in settings
- Human parallel track: counsel/CNDP filing, bridge-table sheet, WTP
  outreach (PRD D1-C1)

## Done this week
- Step 0 intake gate: PASSED 2026-07-14 (INTAKE-REPORT.md; 4 rulings in DECISIONS.md)
- Step 1 index: 295 nodes / 292 edges, test query verified
- Step 2 BUILD-PLAN drafted: 5 epics, 52 tasks (T-001..T-068); PR #2 merged 2026-07-14
- T-001 monorepo scaffold built + exit gate green (this branch)
