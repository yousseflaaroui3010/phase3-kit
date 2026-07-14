# BUILD-STATE (the flight recorder: trust this file over chat memory)

Last verified commit: task/T-002-dependency-cruiser head (not yet merged), branched from main @ fd26907
Updated: 2026-07-14 by b4

## Now (the one task in flight)
- Task: T-002 Dependency law via dependency-cruiser (owner: b4) — built, exit gate proven locally, PR open
- Branch: task/T-002-dependency-cruiser, cut from fresh main @ fd26907
- Where exactly: `.dependency-cruiser.cjs` at repo root transcribes S1-A2
  §4's edge table line for line (one forbidden rule per package + a
  provider-SDK-only-in-agent rule); `pnpm run depcruise` / `pnpm run
  graph:deps` scripts added; CI step "Dependency law (dependency-cruiser)"
  wired into .github/workflows/gate.yml verify job, gated on
  steps.scaffold.outputs.present; mermaid graph committed at
  docs/build/dependency-graph.mmd; eslint.config.mjs got a CJS-globals
  override for root *.cjs config files (was failing lint on `module`)
- What is proven working: exit gate both halves, locally in this
  worktree — seeded relative-import violation (packages/gate/src/index.ts
  -> packages/agent/src/index.ts, bypassing package.json) failed with
  "error gate-boundary", reverted (git diff clean after), clean tree
  re-run passed ("no dependency violations found"); typecheck 9/9, lint,
  and jscpd (0% dup) all green after the change
- What is NOT done yet: CI run of the new step on GitHub itself (only
  proven locally); reviewer pass; B1 merge

## Next (ordered queue, top 3 only)
1. Reviewer grades T-002 branch; B1 squash-merges via PR
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
