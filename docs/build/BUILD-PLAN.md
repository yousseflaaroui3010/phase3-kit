# BUILD PLAN — The Nutritionist, Phase 3

Source: docs/phase2/PRD.md (D1–D4) + docs/phase2/Architecture.md (S1–S4).
Intake: docs/build/INTAKE-REPORT.md (passed 2026-07-14).
Law: one task = one branch `task/T-xxx-slug`, one focused change, <1h,
independently testable. Contracts and data layer land before the UI that
consumes them. Exit gates cite D3-A5 ACs and S4 fixtures. Every UI task
card specs its screen's four states (intake Q4 ruling).

Owners: b1 lead/integration, b2 backend, b3 frontend, b4 delivery/QA.
Refs are section anchors in the two pack files. `Arch:` = Architecture.md.

## Epic E0 — Foundation (pack phase P0)

| ID | Title | Owner | Refs | Deps | Exit gate |
|---|---|---|---|---|---|
| T-001 | Monorepo scaffold: pnpm + Turborepo, packages per module map (web, agent, gate, grounding, resolution, data, shared), TS strict project refs | b1 | Arch S1-A1 §4/§6, S1-A2 §3 | — | `pnpm typecheck` + `pnpm lint` green across empty packages |
| T-002 | Dependency law as dependency-cruiser rules (gate↛agent/grounding, web↛gate/grounding/providers, only agent→provider SDKs) | b4 | Arch S1-A2 §4, S2-D2 | T-001 | seeded violation fails CI; clean tree passes |
| T-003 | CI gate pipeline: typecheck, lint, test, jscpd, gitleaks, license sweep; safety-fixture job red-by-design | b4 | Arch S3-A2 §2/§4, S1-A6 §3 | T-001 | all checks required on PR; fixture job exists and is red |
| T-004 | PG18 local env + Drizzle wiring; migration 0000 = S1-A3 reference DDL (ref/app/health/audit schemas + RLS) | b2 | Arch S1-A3 §3, S2-A1, S2-D1 | T-001 | `migrate deploy` clean; four schemas + tables live |
| T-005 | Health-tag registry generator (pg_tables enumeration) + delete-coverage test | b2 | Arch ADR-07, S1-A3 §4-5, S4-A3 §2 | T-004 | generated enum ≡ health-schema membership; coverage test green |
| T-006 | cost-config.json + Zod schema, config→DB sync, both blocking CI computations | b2 | Arch S1-A5 §2-5, PRD D2-A3 | T-004 | cost-guardrail + cap-construction checks run and block |
| T-007 | BDPM/ANSM snapshot ingest into ref tables, atomic + staleness-visible | b2 | Arch ADR-08, S3-A3 §4; PRD D1-C1 item 6 | T-004 | ingest idempotent; snapshot age queryable; parse-failure alarm path |
| T-008 | ANSM interaction-thesaurus parse spike → normalized rule sample | b2 | PRD D1-C1 item 7, D2-A2 | T-007 | current file parses to normalized rules; effort logged in DECISIONS |
| T-009 | prompts/ registry wiring + single AI-client choke module skeleton (one input choke, one output choke, JSON logs with request ids) | b2 | Kickoff Phase-4 readiness; Arch ADR-05 | T-001 | no-inline-prompts check active; example prompt + golden seed row |

## Epic E1 — Safety spine (pack phase P1)

| ID | Title | Owner | Refs | Deps | Exit gate |
|---|---|---|---|---|---|
| T-010 | `resolution` FR path: brand→ingredient against ref tables, unresolved status when absent | b2 | PRD D2-A2, AC-02; Arch S1-A2 | T-007 | known FR brand resolves ≤2s p95 local; unknown → unresolved, never inferred |
| T-011 | MA bridge-table loader (`ref.brand_mapping`) + withhold-mode statuses for off-table brands | b2 | PRD L-08, AC-02; Arch exports | T-010 | bridge classes resolve; all else withheld (fixture) |
| T-012 | `gate` core: deterministic interaction-rules engine, zero network, 3s p95 fail-closed | b2 | Arch ADR-02, S4-A2; AC-01, AC-03 | T-005, T-008 | clash + timeout→withhold fixtures green |
| T-013 | `gate.release()` sole-egress + poisoned-draft fixture + egress lint | b2 | Arch ADR-02/04, S4-A4 §2 | T-012 | poisoned draft never reaches output; egress rule lint-enforced |
| T-014 | Emergency classifier: red-flag pattern lists EN/FR/AR, server-side, category+timestamp-only logging | b2 | AC-06; PRD D4-A2 P3; Arch S4-A2 | T-001 | red-flag corpus fixtures green; data-minimization test green |
| T-015 | Delete job: health enumeration destroy + tombstone + audit (REQUIRES-HUMAN-AUTHORIZATION marker) | b2 | AC-10; Arch S1-A3 §4, exports | T-005 | canary-delete fixture green live-side |
| T-016 | Export job: same enumeration, BYO-key plaintext excluded, audit-logged | b2 | AC-11; Arch exports | T-005 | export-bundle fixture green |
| T-017 | Synthetic profile set SP-01..SP-13 + AC traceability table | b4 | Arch S4-A1 §3, S3-D4 | T-004 | profiles load; every AC-01..18 maps to ≥1 profile |
| T-018 | Gate-1 safety fixture suite wired into CI (red-by-design job goes live) | b4 | Arch S4-A2, S3-A2 §4 | T-012..T-014, T-017 | suite is a required check; leak ledger empty |

## Epic E2 — Auth, consent, agent core, first screens (pack phase P2)

| ID | Title | Owner | Refs | Deps | Exit gate |
|---|---|---|---|---|---|
| T-020 | Better Auth 1.6 core (email + Google), DB sessions in app schema, trustedProxies per host | b2 | Arch S2-A2, S2-D3 | T-004 | signup/login integration test green |
| T-021 | Envelope-encryption helper (AES-256-GCM, versioned KEK); decrypt sites lint-guarded | b2 | Arch S2-D4 | T-001 | round-trip + rotation test; lint blocks third decrypt site |
| T-022 | Consent model + foreign-transfer guard in route handlers (never middleware-only) | b2 | AC-08, AC-09; Arch ADR-04; PRD D3-A1 | T-020 | guard-direct fixtures green; no health write pre-consent |
| T-023 | App shell: next-intl + React Aria, server-side dir, EN/FR/AR catalogs, digit/bidi rules, key-parity CI | b3 | Arch S2-A3, S2-D5; PRD D4-A3 shell | T-001 | shell renders in 3 locales both directions; parity check blocks |
| T-024 | Theme system (dark/light), reduced-motion, focus/contrast/44px baseline | b3 | PRD D4-A3 a11y baseline, D3-A3 | T-023 | axe pass on shell in both themes |
| T-025 | Route contracts: Zod schemas + contract doc for auth/consent/profile/medications/chat endpoints (contracts before UI) | b2 | Arch S2-A4 §4, S1-A2 §4 | T-020, T-022 | contract tests green; types exported to web |
| T-026 | S3 Sign up / Log in screen, four states | b3 | PRD D3-A3 #3, D4-A1 flow 1 | T-023, T-025 | e2e signup/login; four states present |
| T-027 | S4 Consent step, review-locked strings, declined→teach-mode branch | b3 | AC-08/09; Arch S2-D5; PRD D4-A4 card 1 | T-026 | consent + declined-path e2e green in 3 locales |
| T-028 | ModelPort + lean adapter (AI SDK 6 low-level); tier inheritance checked at the port | b2 | Arch ADR-05, S2-A4 §1; AC-13 | T-009, T-021 | mocked-provider port tests; tier-violation logs policy event |
| T-029 | SearchPort + Brave adapter + injection wrapper + cache; second-adapter swap test | b2 | Arch S2-A4 §2, ADR-05 | T-009 | swap test green; retrieved content treated as data (fixture) |
| T-030 | Assemble step: prompt assembly from prompts/ registry + profile snapshot | b2 | Arch ADR-03, S1-A2 §5 | T-009, T-028 | assembled prompt snapshot test; zero inline prompts |
| T-031 | Teach/personal mode split; read-only tools in Compose | b2 | Arch ADR-03; PRD D3-A4 | T-030 | teach mode works with consent declined (AC-08 path) |
| T-032 | S5 Chat home (RTL-hard): per-bubble bidi, composer direction detect, suggested prompts, empty state | b3 | PRD D4-A3 S5; AC test case "واش Doliprane مزيان ليا؟" | T-023, T-025 | bidi test case renders correctly; four states |
| T-033 | S6 Profile intake: progressive layers, safety layer mandatory-first | b3 | PRD D3-A3 #6, D4-A1; AC-04 prompt path | T-025 | safety-layer-first enforced; four states |
| T-034 | S7 Medications + withhold badge (Pattern 2, 4-part copy), resolution status per drug | b3 | PRD D4-A2 P2; AC-02 | T-011, T-025 | withhold treatment renders per pattern; four states |
| T-035 | Emergency interstitial component (Pattern 3): takeover, focus trap, LTR digit runs, fail-closed render | b3 | AC-06; PRD D4-A2 P3 | T-023, T-014 | interstitial-first e2e; a11y trap test; no dismiss without acknowledge |

## Epic E3 — Plan pipeline, entitlements, remaining UI (pack phase P3)

| ID | Title | Owner | Refs | Deps | Exit gate |
|---|---|---|---|---|---|
| T-040 | Six-step pipeline orchestration, fixed order (Assemble→Ground→Compose→Gate→Annotate→Stream) | b2 | Arch ADR-03, S1-A2 §5-6 | T-028..T-031, T-013 | order fixture green; no step skippable |
| T-041 | SSE streaming route: interstitial-first block, named-step progress, 60s envelope | b2 | Arch ADR-06, S3-D2; PRD D3-A4 | T-040, T-014 | stream-order fixture at source; progress events named |
| T-042 | Degraded-grounding path: template+gate fallback, visible flag (Pattern 4) | b2 | AC-17; PRD D4-A2 P4 | T-040 | degraded fixture green; gate never degraded |
| T-043 | Entitlements engine: bundles as data, caps, honest cap-refusal, policy events | b2 | PRD D3-A2; AC-13, AC-14 | T-006 | cap fixtures green; agent cannot exceed user tier |
| T-044 | usage_event cost log + monthly reconciliation query | b2 | Arch S1-A5 §3, exports | T-043 | per-call rows written; reconciliation query returns gap % |
| T-045 | PaymentPort + stub adapter wired to entitlements (intake Q1 ruling) | b2 | PRD D3-A2; AC-18; DECISIONS 2026-07-14 | T-043 | tier change via stub flows to entitlements; no vendor code |
| T-046 | BYO-key: envelope-encrypted storage, adapter path, never logged/exported | b2 | PRD L-04, D3-A2; Arch S2-D4 | T-021, T-028 | BYO call path test; export-exclusion fixture (ties AC-11) |
| T-047 | Calendar adapter: confirm-gated write, full rollback on partial failure | b2 | AC-12; Arch ADR-03 post-stream writes | T-040 | rollback fixture green; audit rows for proposal + outcome |
| T-048 | S8 Meal plan view (RTL-hard): day tabs RTL, numbers toggle default-off, isolated value-unit runs | b3 | PRD D4-A3 S8, D3-A3 #8, L-05 | T-040, T-023 | RTL digit/bidi checks; four states |
| T-049 | S9 Plans library + regenerate entry, empty state per Q4 rule | b3 | PRD D3-A3 #9 | T-048 | four states incl. day-one empty |
| T-050 | S10 Calendar confirm sheet (Pattern 1, RTL-hard): exact events, approve/decline equal weight | b3 | AC-12; PRD D4-A2 P1, D4-A3 S10, D4-A4 card 3 | T-047, T-023 | confirm-card e2e: nothing writes pre-approve; states Proposed→Done/Rolled back/Declined |
| T-051 | S13 AI model & key screen: model within tier, BYO-key paste | b3 | PRD D3-A3 #13 | T-046, T-025 | tier-filtered model list; key never rendered back; four states |
| T-052 | S14 Billing & plan: tier, live usage vs caps, upgrade, two-tap cancel | b3 | AC-18; PRD D3-A3 #14 | T-045, T-044 | Playwright: 2 taps to cancel, no retention detour, exact end date |
| T-053 | S15 Data rights: export bundle + delete with consequence list | b3 | AC-10, AC-11; PRD D4-A1 flow 6 | T-015, T-016, T-025 | e2e export + delete; kept-and-why disclosure shown |
| T-054 | S11 Settings home + S16 Preferences (language, theme, numbers default) | b3 | PRD D3-A3 #11/#16 | T-023, T-024 | four states; locale/theme persistence |
| T-055 | Gate-2 pipeline suite + gate-3 privacy suite wired into CI | b4 | Arch S4-A4, S4-A3, S3-D3 | T-040..T-047, T-015/T-016 | both suites required checks; universal-gate fixture green |

## Epic E4 — Hardening and launch (pack phase P4)

| ID | Title | Owner | Refs | Deps | Exit gate |
|---|---|---|---|---|---|
| T-060 | S1 Landing + S2 Onboarding story: lifestyle framing, zero outcome claims | b3 | PRD D3-A3 #1-2, L-01/D2-A1 red zone | T-023 | copy passes red-zone wordlist check; four states |
| T-061 | S17 Help center + S18 Feature requests | b3 | PRD D3-A3 #17-18 | T-023 | four states; cut-line note: first to descope |
| T-062 | S20/S21 Admin: ops counters + reason-gated support case, per-view audit | b2+b3 | AC-16; PRD D3-A3 #20-21 | T-020, T-025 | denied-without-case fixture; every view audit-logged |
| T-063 | Observability: structured JSON logs w/ request ids, GlitchTip + health scrubber, Beszel, off-box uptime | b4 | Arch S3-A4, S3-D6 | T-041 | outbound-scrub fixture green; alerts fire on injected conditions |
| T-064 | pgBackRest to Hetzner Object Storage + restore-proof harness (canary in pre-delete, absent post-window) | b4 | Arch S3-A3, S3-D5 | T-015 | actual restore-and-query proof, not backup-succeeded signal |
| T-065 | Gate-4 load/perf suite: 200 concurrent, p95 envelopes, gate-present-under-load, fault injection per failure table | b4 | Arch S4-A5; PRD D3-A4 | T-055 | envelope assertions green on same-spec box; no dropped gate under load |
| T-066 | A11y manual AT pass + full RTL pass on safety surfaces | b3 | PRD D4-A3 baseline; Arch S4 open-risk 10 | all UI | WCAG 2.2 AA on all screens, both directions |
| T-067 | Deploy: Coolify + Caddy, image pipeline, staging/prod split, ALLOW_REAL_HEALTH_DATA env protection | b4 | Arch S3-A1, S3-A2 §5, S3-D4 | T-003 | staging deploy green; gate-5 env protection proven |
| T-068 | Red-team hour + launch checklist + gates 1–4 full pass on main | b4+human | Arch S4-A2 §5, S3-A2 §7 | all | all gates green; counsel items tracked; beta-open decision to human |

## Standing notes
- Human parallel track (not tasks here): CNDP/counsel filing, bridge-table
  rows, WTP interviews, usability sessions, emergency numbers sourcing,
  price re-pins. From PRD D1-C1; surfaced in BUILD-STATE blockers when
  they gate a task.
- Cut line (PRD D1-C1): admin dashboards → feature requests → plans-library
  polish → light theme. Never: Highest-tier features, fixtures, gates,
  consent, data-rights jobs.
- Task cards may split any row that stops fitting "3 sentences".
