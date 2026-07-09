---
paths:
  - "src/server/**"
  - "src/api/**"
  - "migrations/**"
  - "db/**"
  - "**/*.sql"
---
# Backend rules

- Contract first: routes must match the Phase 2 API contract in
  `docs/phase2/`. After any route or schema change, regenerate shared types
  (e.g. Orval) so the frontend compiles against the new contract.
- Migrations: always additive when possible, always dry-run before apply,
  never lock hot tables. Destructive migrations need explicit human approval.
- All queries go through the data layer. No inline SQL in route handlers.
- Every endpoint: input validation, standard error shape, auth check.
- No secrets in code or logs. Config comes from environment only.
