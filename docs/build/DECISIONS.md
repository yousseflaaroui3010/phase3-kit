# DECISIONS (ADR-lite: one row per real choice)

| Date | Task | Decision | Options considered | Why | Owner |
|------|------|----------|--------------------|-----|-------|
| 2026-07-14 | intake | MVP billing = PaymentPort adapter + stub; vendor vetted by scout at P3 | pin vendor now / cut billing from R1 / port + stub | closed beta (gate 5 pending) needs no real payments; Stripe absent in Morocco; matches ADR-05 port pattern, zero rework on vendor pick | human |
| 2026-07-14 | intake | Drizzle stands; D1-C1 "Prisma schema" read as pre-S2 placeholder | Prisma / Drizzle | S2-D1 is the later dedicated toolchain ruling with verification log; CLAUDE.md agrees; work items (schema, registry generator, delete-coverage test) carry over unchanged | human |
| 2026-07-14 | intake | PRD.md + Architecture.md accepted as the signed pack | fetch packet YAMLs first / accept / accept-with-P1-blocker | packet content verified inline (locked decisions, exports, verification log, open risks); only change_requests log absent, empty by construction | human |
| 2026-07-14 | intake | Empty states: standing rule — every UI task card specs its four states + empty copy per D4-A2 formula; reviewer enforces | upfront EMPTY-STATES.md / human-drafted copy / task-card rule | avoids front-loading copy for screens weeks out; enforcement point already exists (reviewer) | human |
