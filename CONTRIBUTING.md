# Contributing

Patterns in, code out: PRs are graded on whether they strengthen the
structures below, not on line count.

## The dependency law (Arch S1-A2 §4)

Allowed import edges; everything else is forbidden and CI-failing
(dependency-cruiser lands in T-002 — until then, `package.json`
workspace deps + TS project references are the enforcement):

| Package | May import |
|---|---|
| `apps/web` | `agent`, `entitlements`, `db`, `i18n`, `shared` |
| `agent` | `grounding`, `gate`, `resolution`, `entitlements`, `db`, `shared` |
| `gate` | `resolution`, `db`, `shared` |
| `grounding` | `db`, `shared` (+ cache client) |
| `resolution` | `db`, `shared` |
| `entitlements` | `db`, `shared` |
| `db` | `shared` |
| `shared` | nothing |

`gate` never reaches `agent`/`grounding` (deterministic by
construction). `web` never reaches `gate`/`grounding`/provider SDKs.
Only `agent` touches provider SDKs.

## Standing rules (Arch S1-A1 §7)

- No `any` in `packages/gate` or `packages/resolution` (lint-enforced).
- Every change to `gate` behavior requires a fixture in the same PR.
- Destructive migrations carry the `REQUIRES-HUMAN-AUTHORIZATION`
  marker and wait for a human.
- `drizzle-kit push` is banned outside a local scratch database;
  migrations are reviewable SQL files.

## Workflow

Branch per task (`task/T-xxx-slug`), commit subject
`type(scope): summary [AI]`, body with `INTENT:` and `VERIFY:` lines.
See `.claude/rules/git-discipline.md`.
