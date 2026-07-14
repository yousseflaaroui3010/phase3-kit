# VARIABLES (fill these per project, ~5 minutes)

In markdown files ({{DOUBLE_CURLY}}):
- {{PROJECT_NAME}}, {{PROJECT_ONE_LINER}}, {{PRIMARY_STACK}} — DONE
  (The Nutritionist, safety-gated nutrition guidance, TS/Next.js 16/
  Node 24/PG 18 + Drizzle/pnpm + Turborepo/Vitest + Playwright)
- {{DEV_CMD}} {{TYPECHECK_CMD}} {{TEST_CMD}} {{LINT_CMD}} {{E2E_CMD}} — DONE
  (pnpm dev / pnpm typecheck / pnpm test / pnpm lint / pnpm test:e2e;
  normative: the P0 scaffold must create these exact scripts)
- {{PROTECTED_BRANCH}} (usually main) — DONE (main)
- Phase 4, when it starts: {{TRACING_PLATFORM}} {{EVAL_FRAMEWORK}}
  {{GUARDRAIL_FRAMEWORK}} {{GATEWAY_PROXY}} {{PROMPT_REGISTRY}}
  {{DEFAULT_SMALL_MODEL}} — untouched, filled when Phase 4 starts

In real config (must be working commands, no curly braces):
- .claude/hooks/config.sh: TYPECHECK_CMD, TEST_CMD, PROTECTED_BRANCHES — DONE
  (guarded with `test ! -f package.json ||` so they self-activate at scaffold)
- .github/workflows/gate.yml: the two command lines marked TODO — DONE
  (plus pnpm/Node 24 setup so those commands can run)
- .claude/rules/backend.md + frontend.md: the paths: globs, to match
  this project's real folder names — DONE (apps/web + packages/* per S1-A1 §6)

Files that consume these: CLAUDE.md, PHASE3-KICKOFF-PROMPT.md, agent
files in .claude/agents/ (o1-o4 use the Phase 4 set).
