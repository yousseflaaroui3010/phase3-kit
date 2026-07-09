# Project Manifest (Phase 3 Build)

<!-- TODO: one line describing this product -->
Product: TODO_PRODUCT_ONE_LINER

## Commands
- Dev server: `TODO_DEV_CMD`
- Typecheck: `TODO_TYPECHECK_CMD`
- Tests: `TODO_TEST_CMD`
- Lint: `TODO_LINT_CMD`

## Where things live
- Phase 2 signed specs: `docs/phase2/` (read-only, source of truth)
- Build plan and task list: `docs/build/BUILD-PLAN.md`
- Current state (always read first): `docs/build/BUILD-STATE.md`
- Decision log: `docs/build/DECISIONS.md`
- Change log: `docs/build/CHANGELOG-AI.md`
- Prompts used by the product itself: `prompts/` (never inline in code)

## Iron rules (hooks also enforce these)
1. Start every task by reading `docs/build/BUILD-STATE.md`.
2. Before writing any new function or class, query the codebase-memory graph
   (search_graph, trace_path, impact). Reuse what exists. Duplication fails CI.
3. Never work on `main`. One task = one branch `task/T-xxx-slug`.
4. Never pass `--no-verify`, never force-push, never edit `.claude/hooks/` or
   `.claude/settings.json`. The guard hook blocks these.
5. After each task: update BUILD-STATE.md, append one line to CHANGELOG-AI.md,
   log any real choice in DECISIONS.md, then commit.
6. Commit format: `type(scope): summary [AI]` with body lines
   `INTENT: ...` and `VERIFY: <command that passed>`.

## Delegation (subagents in .claude/agents/)
- b1-lead-dev: repo structure, merges, review, squash, duplication.
- b2-backend-dev: APIs, business logic, DB schemas, migrations.
- b3-frontend-dev: UI components, states, a11y, RTL.
- b4-delivery-eng: sandboxes, CI, e2e tests, failure traces.
- o1..o4 (Phase 4): observability, evals, guardrails, prompt/cost lifecycle.

## Escalate to the human when
Contract in `docs/phase2/` is ambiguous, a migration is destructive,
a new dependency is needed, or an exit gate cannot be met.
Ask with numbered options, one question at a time.
