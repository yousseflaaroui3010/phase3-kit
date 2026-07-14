# INTAKE REPORT — Phase 3 Step 0

Date: 2026-07-14. Auditor: orchestrator. Pack: docs/phase2/ (2 files:
PRD.md, Architecture.md). Ledger discipline: F = fact (pack/tool), I =
inference, G = gap.

## 1. Artifact map

| Expected artifact | Status | Where |
|---|---|---|
| Engagement brief (D1 open/close) | FOUND | PRD.md §1 (D1-A1), §17 (D1-C1) |
| Market briefs (D2) | FOUND | PRD.md §2–7 (D2-A1..A6), verdict GO WITH CHANGES |
| PRD (D3) | FOUND | PRD.md §8–12 (D3-A1..A5): 15 entities, 3 roles + entitlements, 21 screens, 29 features, perf targets, AC-01..18, failure table, R1–R3 |
| UX briefs (D4) | FOUND | PRD.md §13–16 (D4-A1..A4): journeys, 4 safety patterns, screen specs incl. 3 RTL-hard, usability instrument |
| ADRs (S1) | FOUND | Architecture.md S1-A4: ADR-01..08 |
| Mermaid C4 (S1) | FOUND | Architecture.md S1-A2 §2 (L1), §3 (L2) |
| Tech-stack record (S2) | FOUND | Architecture.md S2-A1..A4: Drizzle + drizzle-kit SQL migrations, pnpm + Turborepo + dependency-cruiser, Vitest 4.1 + Playwright 1.58, Better Auth, next-intl, React Aria Components, AI SDK 6 (low-level) behind ModelPort, Brave behind SearchPort, native SSE, Zod 4 |
| API contracts (S2) | PARTIAL | Port contracts (ModelPort/SearchPort, S2-A4), reference DDL (S1-A3), cost-config contract (S1-A5), dependency law lint rules (S1-A2 §4). No route-level HTTP contract inventory exists anywhere in the pack. |
| Coding standards (S2) | PARTIAL | Distributed: dependency law (S1-A2 §4), Claude Code operating rules (S1-A1 §7), standing rules (S1-A6 §6), CLAUDE.md. No standalone standards doc. |
| Infra + CI/CD, environments (S3) | FOUND | S3-A1 (Hetzner EU VPS + Coolify), S3-A2 (two pipelines, 5 gates, two environments), S3-A3 (pgBackRest, ingest, RLS-bypass custody), S3-A4 (secrets, observability), S3-A5 (runbook, cost sheet) |
| Test strategy + acceptance criteria (S4) | FOUND | S4-A1..A5 (taxonomy, synthetic profiles, gate-1 leak fixtures, gate-3 privacy suite, gate-2 pipeline suite, gate-4 load/failure suite); ACs in D3-A5; traceability S4-A1 §4 |
| Sign-off sheet | PARTIAL | No separate sheet. Document Provenance block (Architecture.md, end) declares all S1–S4 signed, dated 2026-07-07. PRD.md header claims "All 24 Signed Artifacts". |

## 2. Contradictions / integrity flags

| # | Item | Detail | Class |
|---|---|---|---|
| C1 | Prisma vs Drizzle | D1-C1 week-one checklist item 3 says "Prisma schema"; S2-A1 pins Drizzle + SQL-only migrations. I: chain order (D1-C1 predates S2) resolves to Drizzle; CLAUDE.md agrees. Needs human ratification. | contradictory |
| C2 | Artifact counts | PRD.md title says 24 artifacts, contains 17. Provenance says "15 signed artifacts", Architecture.md contains 20 (S1:6, S2:4, S3:5, S4:5). F: counts do not reconcile under any split tried. | contradictory (likely cosmetic) |
| C3 | Authoritative record absent | RESOLVED 2026-07-14 (human ruling: accept as signed). Packet content verified present in consolidated form: locked_decisions (Arch:1771), cross_stage_exports (Arch:1796), verification_log (Arch:1841 + per-artifact), open_risks (Arch:1894). Only change_requests has no log; I: empty by construction (provenance says no assumption was corrected). S4 hand-off content inline in S4-A2..A5. | resolved |

## 3. Silent requirements sweep

| Item | Status | Detail |
|---|---|---|
| Roles and permissions | FOUND | D3-A2: Guest/User/User-agent-inherits-tier/Admin reason-gated; entitlements as data, tiers as bundles |
| Day-one empty state | SILENT | No spec for first-run empty plans library (S9), empty medications (S7), zero-history chat beyond "suggested prompts". Load-bearing for b3 tasks; four-states rule exists in kit law but content/copy is unspecified. |
| Existing-data migration | N/A + FOUND | Greenfield, no legacy users. Reference-data ingest IS specified (ANSM snapshot P0, MA bridge table human-fed, ADR-08 scheduled ingest). |
| Scale targets | FOUND | 200 concurrent (prov.), 99.5% monthly, 20 req/min burst, cost guardrail ≤$0.20/free user/mo; all provisional flags carried |
| Languages / locales | FOUND | EN/FR/AR UI + full RTL, 6 research languages, Western digits in Arabic, bidi isolation rules, MSA register with Moroccan terms |
| Payment provider | SILENT + MISSING | S14 Billing (MVP), AC-18 two-tap cancel, grace-period failure row all assume a payment rail. No vendor pinned anywhere in the pack; not even listed in Open Risks. Stripe has no Morocco merchant support; CMI/local rails unevaluated. Load-bearing for the billing epic. |
| Emergency care routes per market | DECLARED-OPEN | D4-A2 P3: numbers "sourced at Delivery from official sources" — human item, needed before S-interstitial copy hardens |
| Counsel / CNDP gates | DECLARED-OPEN | Gate 5 blocks real health data; attachments (S19) counsel-gated FF; residency principle pending counsel. Human clock, tracked in pack. |
| WTP data | DECLARED-OPEN | n=0; tier caps provisional; entitlements-as-data design already absorbs this. |

## 4. Verdict

Pack is substantively complete for build planning: PRD, ADRs, C4, stack,
infra, CI gates, test suites, and 18 ACs all present and internally
traceable. Blocking items before BUILD-PLAN approval:

1. Q1 — payment rail: RESOLVED 2026-07-14. PaymentPort adapter + stub;
   closed beta runs free tier + BYO-key; vendor vetting (scout) is a P3
   task. Morocco-capable candidates: merchant-of-record or CMI rail.
2. Q2 — ORM: RESOLVED 2026-07-14. Drizzle stands (S2-D1); D1-C1's
   "Prisma" is a pre-S2 placeholder; work items carry over unchanged.
3. Q3 — pack integrity: RESOLVED 2026-07-14. Consolidated docs accepted
   as the signed pack (see C3).
4. Q4 — empty states: RESOLVED 2026-07-14. Standing rule: every UI task
   card carries its screen's four states with empty-state copy per
   D4-A2 plain-words formula; reviewer blocks screens missing a
   designed empty state.

Intake gate: PASSED 2026-07-14. All blocking items resolved by human
ruling; proceed to Step 2 (BUILD-PLAN).

No route-level API contract exists; BUILD-PLAN will derive routes from
screens + pipeline and record them as contracts-before-UI tasks (kit law
already requires this ordering).