
# The Nutritionist — Complete Discovery and Architecture Package
## All 24 Signed Artifacts

**Chain: D1 (open) → D2 → D3 → D4 → D1 (close) → S1 → IMPL**

---

## D1 Engagement Lead (open) — 1 artifact

### 1. D1-A1 — Engagement Brief (v1.2)

Converts the client's raw idea into scoped discovery input; eight client rulings locked; prior-art docs treated as reference only; international expansion phase recorded.

**The ask, converted:**

| Raw ask | Converted to |
|---|---|
| "3 languages" | Full product i18n in EN / FR / AR, AR includes RTL layout throughout. Search grounding additionally spans RU / ZH / JA sources. UI languages: 3. Research languages: 6. |
| "avoid overwhelming the user" | Progressive profiling: mandatory safety layer (meds, conditions, allergies, pregnancy, age) collected before any personal advice; optional layers gathered over later sessions. |
| "convince the users… current life and future one" | Aspirational onboarding, constrained: no numeric or clinical outcome claims, lifestyle and sample-plan framing only. |
| "help with meal plans… depending on location, preferences, profile" | Plans localized to market food culture (Moroccan sample is the reference tone), personalized off the profile, filtered through the safety gate. |
| "choose the LLM they want" | User-selectable model within their tier, plus bring-your-own-key on any tier. |
| "like Inbox Zero somehow" | Three behaviors wanted: a chat-first home with suggested prompts, a sidebar with Tools (calendar, attachments), and a settings area. Email/inbox domain explicitly out. |

**Locked decisions:**

- **L-01** — Personal lifestyle guidance with in-app safety brakes + disclaimers; never diagnosis; emergencies routed to real care.
- **L-02** — Agent acts with consent (reads labs, writes calendar, updates profile). Confirms before every change.
- **L-03** — No guessing; ground in live EN/FR/AR/RU/ZH/JA search incl. ancestral medicine, ranked by evidence.
- **L-04** — Hybrid billing: capped free tier + bring-your-own-key on all tiers + paid tiers for stronger models.
- **L-05** — Plans combine wise-elder voice + food-database numbers + curated templates; numbers off by default, per-user toggle.
- **L-06** — Educational + lifestyle/dietary only; never diagnoses, doses, or comments on a specific prescribed drug; always refers to clinician.
- **L-07** — Users identify medicines by brand (Doliprane), not active ingredient; brands are Moroccan (e.g. Laprophan) or French.
- **L-08** — Morocco brand handling: manual vetted bridge table for diabetes/hypertension/pain classes, withhold-mode for all others, France fully live.
- **L-09** — Medication explanation rule: app explains what a drug does, why, and its risks; delivers the lifestyle plan; routes number-changes to the prescriber. Never suggests, implies, or celebrates a dose reduction. Diabetes-type distinction checked before content ships (type 1 unknown = higher-risk posture).
- **L-10** — Pregnant/postpartum: meal plans only at MVP; hard-exclude supplement, herb, and fasting advice, routing to clinician. Fast-follow adds full safety layer.
- **L-11** — Calendar write ships in MVP. Lab and prescription attachments fast-follow, pending France legal ruling.
- **L-12** — Market sequence: Morocco lead, francophone EU second, international third (Android-first native).
- **L-13** — Bootstrap, zero funding. Free sources first, upgrades on written demand triggers. Founder owns data workstreams.
- **L-14** — R1 launches Morocco only; EU activates on written trigger (confirmed by D1-C1 sign-off).

**Audience segments:**

1. Managed-condition adults in Morocco (type 2 diabetes, hypertension) plus the family member who cooks for them (core).
2. Health-curious professionals in both markets who want culturally real food advice in their own language.
3. Caregivers of older parents, managing meds and meals.
4. Pregnant and postpartum women (high value, highest safety sensitivity; MVP serves meal plans only).

**Scope fences, in:**
Chat agent and its safety gate, progressive profile, plan generation (all three L-05 modes), onboarding, auth and account, data rights (view, update, delete, export), attachments (labs, prescriptions), calendar write-out, tiered billing with BYO-key, settings, dark/light themes, 3-language UI with RTL.

**Scope fences, out (non-goals unless a stage re-opens them):**
Diagnosis or medical prediction of any kind, telling a user to change prescribed medication, native mobile apps at MVP, autonomous background agent behavior, the email/inbox domain from the reference product, crypto payments.

**Deferred, explicitly not cut:**
Messaging-channel nudges, family/organization accounts, international expansion (post-EU).

---

## D2 Market Researcher — 6 artifacts

### 2. D2-A1 — Regulatory Line

**Wellness-vs-medical line, drawn:**

The controlling question is intended purpose. EU guidance (MDCG 2019-11, revised June 2025) separates wellness apps from medical devices: apps providing information on lifestyle, fitness, or well-being are not medical devices, while software with a medical purpose (treatment or diagnosis of a disease) qualifies as medical device software. The app qualifies as wellness software while its stated purpose is healthy eating that fits your culture and your body's constraints. The moment the stated purpose becomes managing or treating type 2 diabetes, it crosses into MDR territory.

Intended purpose is read from marketing copy, store listings, and onboarding screens, not just from code.

**France-specific finding:**
The public-health code defines the dietitian profession as any person who habitually dispenses nutritional advice, and only holders of the state diploma may exercise it. Illegal exercise carries one year imprisonment and a €15,000 fine. Building a meal plan to treat a pathology (diabetes, obesity, eating disorders) is reserved; crossing it is illegal practice. Lab-file reading sits in a gray zone: extracting values without clinical interpretation may stay clear, but the line is not settled in public guidance.

**Morocco data:**
Law 09-08 (articles 12, 21) requires prior CNDP authorization to process health data and restricts sending it abroad. Transfers need either authorization or express consent. Telemedicine acts (Law 131-13) must be performed by registered practitioners. The app stays legal as long as it never performs a care act (no diagnosis, prescription, consultation).

**The line, drawn:**

| Zone | Both markets |
|---|---|
| Green | Nutrition education, mechanism explanation, culturally fitted healthy-eating plans framed as lifestyle, the safety gate as a consumer-protection feature, referral to clinicians, AI disclosure, data rights. |
| Red | Diagnosis, dose calculation, "treat/manage/reverse/cure" a named disease in marketing or copy, commenting on a specific prescription, numeric health-outcome forecasts. |
| Gray | Lab-file reading in France (extraction vs interpretation); medication-aware gate's medical purpose under MDR; plans personalized to a disclosed condition; any local MA regulation of nutrition advice. |

---

### 3. D2-A2 — Structured Interaction Data and Brand Resolution

**France solves cleanly:**
The ANSM medicines database ships as a free REST API covering over 15,800 medicines with full composition detail (active substances, dosages), commercial packaging, pricing, refreshing twice daily. The ANSM Thesaurus of drug interactions (updated roughly twice yearly, most recent June 2024) indexes by international non-proprietary name with plain-language risk notes and four severity levels.

**Morocco doesn't:**
The regulator AMMPS runs a live public search tool that works, but the only bulk, machine-readable export on the open data portal is an Excel file from CNOPS dated 2014 (a decade stale). Morocco's Ministry of Health only began building its first generic medicines repertoire in October 2025, still in draft circulation, not yet adopted. No Moroccan equivalent to the ANSM Thesaurus exists.

Private aggregators fill some gaps: one site indexes over 5,400 medicines with prices and indications; another shows brand-level active-ingredient detail to the milligram. Neither is a vetted source; licensing for commercial use is unconfirmed.

The brand-naming problem: Laprophan alone sells between 260 and 400 distinct pharmaceutical specialties across nearly every therapeutic class. One of roughly 40 domestic manufacturers. A brand-resolution table for Morocco is a market-wide data project, not a small lookup.

**The five named vendors, checked:**

| Source | Brand resolution | Interaction checking |
|---|---|---|
| RxNorm | U.S.-centric; few non-U.S. drugs | Not applicable if brand never resolves |
| DrugBank | Under 15,000 drug entries, not a brand directory | Strong for known ingredients once resolved |
| Drugs.com International | 40,000+ names, 185 countries; licensing unconfirmed | Not an interaction engine |
| IMGateway | Not a brand resolver | Herb/supplement interactions, no Maghrebi remedies confirmed |
| Micromedex/Lexicomp | Coverage unconfirmed for Morocco | Strong, but priced on request only |

**What this means for the gate:**

The same pipeline runs for both markets. Brand→ingredient happens first (France's step is solved; Morocco's needs a founder-built bridge table). The resolved ingredient then runs through the gate (ANSM Thesaurus + IMGateway, never guessed).

---

### 4. D2-A3 — Cost-per-Plan Formula

**Two costs, not one:**
Model calls (input + output tokens) and search calls. The hard safety check runs against free structured sources; search cost only shows up on the narrative half (root-cause explanations, cultural framing). A routine chat turn (profile update, follow-up question) carries neither the search cost nor most of the output cost of a full plan.

**Current model pricing (per million tokens, standard rate):**

| Tier | Model | Input | Output |
|---|---|---|---|
| Lean | Haiku 4.5 | $1.00 | $5.00 |
| Balanced | Sonnet 4.6 | $3.00 | $15.00 |
| Full-depth | Opus 4.8 | $5.00 | $25.00 |

Output runs 5x input. Batch processing cuts all three roughly in half but is asynchronous (up to 24 hours), ruling it out. Prompt caching cuts repeated input by 90%.

**Current search pricing:**
Raw link-and-snippet APIs: ~$0.001 per call. Vendors that also fetch and clean full pages: $0.008 to $0.016. Anthropic's own web search tool: $0.01 per call plus the token cost of returned content.

Two findings: Google filed suit against SerpAPI (December 2025), creating spillover risk for other providers. Tavily was acquired by Nebius (February 2026). Keep the search layer swappable.

**What one plan costs (estimate, unverified):**
Input: 6,000–8,000 tokens (system rules, profile, search results). Output: 2,500–3,500 tokens (the plan itself, safety-gate summary, citations). Search calls: 5–15 per plan. Light chat turns: ~800 input, 250 output, no search.

**Worked numbers, three scenarios (ten search calls each):**

| Scenario | Model | Search option | LLM cost | Search cost | Total per plan |
|---|---|---|---|---|---|
| Lean | Haiku 4.5 | Cheap link search, $0.001/call | $0.022 | $0.010 | $0.032 |
| Balanced | Sonnet 4.6 | Claude-native search, $0.01/call | $0.066 | $0.100 | $0.166 |
| Full-depth | Opus 4.8 | Extraction search, $0.016/call | $0.110 | $0.160 | $0.270 |

**Monthly per active user (four plans + six light turns):**

| Scenario | Plans (4x) | Light turns (6x) | Total per month |
|---|---|---|---|
| Lean | $0.128 | $0.012 | ~$0.14 |
| Balanced | $0.664 | $0.037 | ~$0.70 |
| Full-depth | $1.080 | $0.062 | ~$1.14 |

A free tier on the lean setup costs ~14 cents per active user per month. On Sonnet-class quality, ~70 cents. Full-depth would exceed a dollar, only viable if BYO-key absorbs most of that traffic.

The other lever: search-call count is a design choice. Ten calls per plan is a middle estimate. A free-tier plan grounding in the user's language plus one cross-check cuts the search line by more than half.

---

### 5. D2-A4 — Competitor and Landscape Teardown

**Nizam Tayyibat (Al-Tayebaat diet):**
Diaa El-Din Al-Awadi, Egyptian doctor (born 1979), built a following promoting "Al-Tayebaat" (the Wholesome Foods system), which sorts foods into "good" (eat freely) and "evil, toxic" (eliminate) categories.

Egypt's medical syndicate stripped his membership (February 2026) over multiple professional violations. The syndicate specifically found that his claims about diabetes, kidney transplants, and cancer were stated in absolute terms without clinical grounding or credible evidence, and warned that spreading the system risked patients stopping life-saving medication, delaying tumor treatment, suffering kidney graft failure, or triggering acute glucose crises.

He died April 19, 2026, at age 47, during a trip to the UAE (the Egyptian Foreign Ministry confirmed the death was natural, with no criminal suspicion).

After his death, Egypt's Supreme Council for Media Regulation banned publishing or circulating any content about him or his diet. In Menoufia governorate, a young man named Mohamed Abdelwahab, who had managed diabetes with insulin for over a decade, stopped his medication to follow the Tayebaat system and died in May 2026.

Saudi Arabia's Ministry of Health issued a public warning against the diet's therapeutic claims. A Moroccan physician criticized the diet's rigid food split as incompatible with the basic nutritional principle that diet needs vary by person.

**This is not a rival app to out-feature. It's the precise failure mode the safety gate prevents.**

**Global diet apps:**
Yazio holds a 4-star Trustpilot rating, mostly weight-loss testimonials. Complaints center on automatic renewal and slow customer service. Its food database is global and generic, with nothing for Darija or Moroccan dishes.

Noom faced a US federal court's final approval (March 2026) of a $62 million class-action settlement over claims that Noom auto-enrolled users in multi-month plans and made trial cancellation difficult. A former senior engineer quoted in the lawsuit described the cancellation flow as "difficult by design." Complaints about billing and unresponsive support continue into 2026.

Neither app is built for Arabic-speaking or Moroccan users.

**The supply gap:**
Morocco has roughly 7.3 physicians per 10,000 people, against 34 in France. That gap drives phone-first health guidance. What fills the gap ranges from generic global trackers (Yazio, Noom) to content that has now caused documented, named harm (Tayebaat). Nothing found combines cultural and linguistic fit with a working safety gate.

---

### 6. D2-A5 — Willingness-to-Pay Instrument

**Purpose:** Measure real price sensitivity for the app, per market and per segment, using unanchored questions so the numbers reflect what people actually value rather than a price planted in their heads.

**Target segments:** Core (managed-condition adults plus the family member who cooks for them), health-curious professionals, caregivers of older parents, pregnant/postpartum women.

**Sample size:** Minimum 12 per segment per market (48–96 total).

**Format:** Van Westendorp price sensitivity, unanchored. Describe the paid tier in one plain sentence first, then ask. Let the respondent name their own numbers in their own currency (MAD or EUR); never offer a number first.

**Four questions, in order:**
1. At what monthly price would this feel so cheap you'd doubt it's any good?
2. At what monthly price would it feel like a real bargain, clearly worth it?
3. At what monthly price would it start feeling expensive, but you'd still consider it?
4. At what monthly price would it be so expensive you'd never sign up?

The gap between answers to 2 and 3, aggregated across a segment, brackets the acceptable range.

**Supporting questions:**
5. What do you use today for food or health guidance, and what do you pay for it?
6. Have you ever paid for a health or diet app? What happened?
7. Would you rather pay monthly, yearly, or per plan? Why?
8. For Morocco only: how would you expect to pay? (CMI card, cash-based voucher, mobile, other.)

**Compliance:** Verbal consent at the start ("anonymous, notes only, used only to improve the app's wording, stop anytime"). Collect no real medication names, conditions, or identity details. Run on paper or private note, not a free AI tool.

**Return format (one row per respondent):**

| Field | Content |
|---|---|
| respondent_id | Code (P01, P02…) |
| segment | 1, 2, 3, or 4 |
| market | Morocco or EU |
| currency | MAD or EUR |
| q1_too_cheap | number |
| q2_bargain | number |
| q3_getting_expensive | number |
| q4_too_expensive | number |
| pays_today | short text |
| prior_app_experience | short text |
| billing_preference | monthly / yearly / per-plan |
| ma_payment_method | (Morocco rows only) |
| collection_date | ISO date |

---

### 7. D2-A6 — Viability Verdict

**Verdict: GO WITH CHANGES**

The demand gap is real and cited. The cost to serve is small and known. The revenue side is entirely unproven, and two data gaps sit under the product's core safety promise. Neither kills the project; all of them have to be closed before or during build.

**Why not a clean GO:**
Willingness to pay has zero returned data. Every revenue number is a hypothesis. The Moroccan half of the drug-safety data doesn't exist in any single vetted source (D2-A2), so the safety gate can't be fully built for the lead market on day one. France counsel rulings on lab-reading and medication-aware gates are still open.

**Why not a NO-GO:**
The gap is documented, not assumed. People skip the doctor for real structural reasons (7.3 vs 34 physicians per 10,000 in MA vs FR). What fills that gap today is either culturally blind (Yazio, Noom) or actively dangerous (Tayebaat, now with documented death and a government media ban). Nothing found combines cultural fit with a working safety gate. The cost to serve is small enough that economics aren't the risk. The risk is execution on safety and proof of willingness to pay.

**The three changes that condition the GO:**

1. Close the Moroccan brand-resolution gap, or scope the MVP to launch where the gate works. France resolves cleanly and free. Morocco needs a data-assembly project with an owner, or the MVP launches with the safety gate fully live only where data supports it, clearly degraded elsewhere.
2. Get the regulatory rulings before the affected features are built. The lab-file-reading feature (L-02) and the medication-aware gate both sit in D2-A1's gray zone for France. Counsel rules first.
3. Run the WTP instrument before pricing gets locked. Until rows come back, L-04's tiers are guesses.

**Market sizing (visible calculation):**
Morocco population: ~37 million. Smartphone penetration: high. Diabetes/hypertension prevalence in MA: *not established in this chain (gap)*. Paying-conversion base rate for freemium health apps: *not established (gap)*.

What this means: the shape is large addressable population, device access not the constraint, core segment sized by a prevalence number not yet on hand. I cannot honestly compute a SAM or SOM without two inputs I don't have.

**Evidence strength, stated plainly:**

| Claim | Strength |
|---|---|
| Supply gap (physician ratio) | Confirmed, dated, primary-adjacent |
| Competitor failure modes (Tayebaat harm, Noom settlement) | Confirmed, multi-source |
| Cost to serve per plan | Confirmed inputs, estimated usage volumes |
| France safety-data availability | Confirmed, primary government sources |
| Morocco safety-data gap | Confirmed as a gap |
| Willingness to pay | Not evidenced. Instrument issued, n=0 |
| Market size (SAM/SOM) | Cannot compute; two inputs missing |

---

## D3 Product Manager — 5 artifacts (the PRD v1.0)

### 8. D3-A1 — Data Entities and Classification

Every store the app needs is named and tagged health/sensitive-other/non-health. The tag drives delete, export, foreign-transfer consent, and retention.

| Entity | What it holds | Data class |
|---|---|---|
| Account | Login identity, auth method, account state | Non-health |
| Profile — safety layer | Medications, diagnosed conditions, allergies, pregnancy/breastfeeding, age | **Health** |
| Profile — context layer | Sex, weight/height, diet and habits | **Health** |
| Profile — social layer | Profession, marital status, sexual-activity status | Sensitive-other |
| Medication record | Brand name, resolved ingredient, resolution status, dosage, frequency | **Health** |
| Meal plan | Generated plan, profile snapshot, numbers layer, grounding status | **Health** |
| Conversation history | Chat turns between user and agent | **Health** |
| Safety-gate event | Gate decision, check type, reason, result | **Health** |
| Attachment | Lab results, prescriptions, doctor statements | **Health** |
| Calendar link | Reference to calendar events written | **Health** |
| Consent record | What user consented to, when, terms version | Non-health |
| Audit log | System actions, approvals, data-rights requests | Non-health |
| Entitlement/subscription | Tier, caps, features on, billing state | Sensitive-other |
| BYO-key credential | User's own model-provider key | Sensitive-other |
| Session | Active logins, device info | Non-health |

**How they relate:**
An Account owns exactly one Profile (split into three layers, allowing the safety layer to gate the rest). A Profile holds many Medication records; each carries its own resolution status (resolved brand → ingredient, or withheld unresolved). An Account has many Meal plans and Conversations. Each generates Safety-gate events. Attachments attach to the Account. Entitlements, Consent records, and the Audit log attach to the Account. BYO-key credential attaches to the Account and is referenced (never copied into) any model call.

**What the classification drives:**

Delete request: everything tagged health is destroyed on request, immediately. Profile (health and context layers), all Medication records, every Meal plan, all Conversations, Safety-gate events, Attachments, Calendar links. Consent records and Audit log survive a delete (stripped of health content, kept as legal proof).

Export request: the same health set plus non-health personal data gets bundled. BYO-key credentials never export in plaintext.

Foreign-transfer consent: every health-tagged store is data that leaves Morocco when it hits a model or search provider abroad. That transfer needs the user's express consent recorded in the Consent record, or CNDP authorization, before it happens.

Retention: health stores follow the shortest windows (deleted on request, purged from backups on the stated rotation). Consent and audit records follow the legal-minimum window (number per counsel, provisional).

---

### 9. D3-A2 — Users, Roles and Entitlements

**The governing principle:** A tier like "Free" or "Plus" is a marketing label. Permission checks read entitlements, not plan names. An entitlement is a single named capability (can this account write to a calendar, how many plans per month, which models can it reach). A tier is a named bundle of entitlements. Changing what "Plus" includes becomes editing a bundle (data), not shipping new code.

**The three roles:**

| Role | Who they are | What they can touch |
|---|---|---|
| Guest | Visitor, not signed up | Onboarding, aspirational screen, sample plan. No profile, no personalized plan, nothing stored. |
| User | Signed-up person | Their own account: profile, plans, conversations, medication records, data-rights actions. Access to features governed by their entitlement bundle. |
| Admin | Internal operator/support | System operation and support. Health-data access is restricted by default, gated behind explicit reason (support ticket), logged per access. |

**The entitlements:**
plans_per_month, messages_per_day, allowed_models, calendar_enabled, attachments_enabled, numbers_layer_available, byo_key_allowed, priority_queue, search_languages.

**The three tiers as bundles (structure settled, numbers provisional pending WTP):**

| Entitlement | Free | Plus | Max |
|---|---|---|---|
| plans_per_month | low (start ~4) *(prov.)* | higher (start ~30) *(prov.)* | fair-use |
| messages_per_day | low *(prov.)* | higher *(prov.)* | highest, fair-use *(prov.)* |
| allowed_models | cheapest/free model | stronger model | top model |
| search_languages | user's language + 1 | broader set | full six |
| calendar_enabled | yes | yes | yes |
| attachments_enabled | no | yes (fast-follow) | yes (fast-follow) |
| numbers_layer_available | yes | yes | yes |
| byo_key_allowed | **yes** | yes | yes |
| priority_queue | no | no | yes |

Calendar on Free is a retention lever (cheap, daily-touch feature); whether to gate it is a business call. Numbers layer is available on every tier (a display toggle, not a cost driver).

**Two rules that aren't optional:**

The agent inherits the acting user's tier and nothing beyond it. A Free user's agent cannot quietly reach a Max-only model, cannot exceed the Free plan cap, cannot write to a calendar if their bundle says no.

Bring-your-own-key is allowed on every tier, including Free. A user's own key lowers your bill (their model calls run on their account). A capped Free user who pastes their own key lifts their own limit at no cost to you. The BYO-key credential is a secret: never logged, never returned in an export in plaintext.

---

### 10. D3-A3 — Screens and Pages Inventory

**Global rules:** Dark and light themes, three UI languages (EN/FR/AR) with full RTL mirroring, WCAG 2.2 AA floor. Three screens carry the hardest RTL work: chat home (mixed-direction text in one thread), meal plan (numbers mixes Latin digits with Arabic prose), calendar confirm (date formats flip).

**Three global states (bind every screen):**
- Safety-withhold: the gate blocked or hedged something; the message says so plainly, routes to a pharmacist or doctor, never buried.
- Emergency interstitial: red-flag symptoms trigger a full takeover; this needs real medical care now, no dismiss-into-more-advice.
- Confirm-before-act card: any agent action on the user's stuff renders as a proposal with explicit approve/decline.

**The 21-screen inventory (19 MVP, 1 fast-follow, 1 placeholder):**

| # | Screen | Purpose | Release |
|---|---|---|---|
| 1 | Landing | Value pitch, lifestyle framing only, no outcome claims | MVP |
| 2 | Onboarding story | Experience framing + sample plan, show-don't-forecast | MVP |
| 3 | Sign up/Log in | Google or email auth | MVP |
| 4 | Consent step | Health-data consent, foreign-transfer express consent, terms | MVP |
| 5 | Chat home | Greeting, suggested prompts, input; the product's center | MVP |
| 6 | Profile intake | Progressive layers, safety layer first, mandatory vs optional | MVP |
| 7 | Medications | View/add meds; shows resolution status per drug | MVP |
| 8 | Meal plan view | Day-by-day plan, wise-elder notes, numbers toggle off by default | MVP |
| 9 | Plans library | Past plans, regenerate entry | MVP |
| 10 | Calendar confirm sheet | Exact events to be written, approve/decline | MVP |
| 11 | Settings home | Hub | MVP |
| 12 | Profile & data | View/edit all profile layers | MVP |
| 13 | AI model & key | Pick model within tier; paste own key | MVP |
| 14 | Billing & plan | Tier, live usage vs caps, upgrade, two-tap cancel | MVP |
| 15 | Data rights | Export (download bundle), delete account | MVP |
| 16 | Preferences | Language, theme, numbers-layer default | MVP |
| 17 | Help center | Guidance, safety FAQ, contact | MVP |
| 18 | Feature requests | Lightweight submit/vote | MVP |
| 19 | Attachments | Upload labs/prescriptions (counsel-gated) | FF |
| 20 | Admin ops | System health, gate-event counters, no user-content browsing | MVP |
| 21 | Admin support case | Per-incident access to one account, reason-gated, audit-logged | MVP |

---

### 11. D3-A4 — Features, Priorities, Non-Goals, Performance Targets

**Environment and project type:**
Responsive web application (desktop and mobile browser), consumer-facing, agentic chat at the center with tool actions under confirm-before-act. Two launch markets (Morocco lead, francophone EU second), three UI languages (EN/FR/AR) with full RTL, six research languages for grounding.

**Features inventory, 29 total on the 5-level scale:**

| Priority | Count | Examples |
|---|---|---|
| Highest | 14 | Safety gate, brand resolution, medication explanation tiers, emergency interstitial, progressive profile, grounded plan generation, meal-plan voice+numbers+templates, teach/personal mode split, confirm-before-act, consent flow, data rights, i18n, entitlements engine, auth |
| High | 9 | Calendar write, BYO-key, billing and plan management, onboarding story, settings cluster, admin ops, curated template seeding, attachments (FF), pregnancy safety layer (FF) |
| Medium | 4 | Local-dish nutrition gap-fill, plans library, dark/light themes, help center |
| Low | 1 | Model choice within tier |
| Lowest | 0 | — |

**Non-goals (hard fence):**
No diagnosis, no dose math, never suggest/imply/celebrate reducing medication, no "treat/manage/reverse/cure" disease claims, never comment on a specific user's specific prescription beyond explanation tiers, no numeric health forecasts, no supplement/herb/fasting advice for pregnant/breastfeeding users at MVP, no autonomous background agent, no native mobile at MVP, no crypto payments (illegal for a Moroccan merchant), no tier weakens the safety gate, no email/inbox functionality.

**Performance targets:**

| Target | Number | Source/replacement trigger |
|---|---|---|
| Full plan generation, p95 | ≤ 60 s end-to-end, named-step progress shown | Revisit at first real telemetry *(prov.)* |
| Search step inside a plan | ≤ 25 s sub-budget; on overrun, plan shipped flagged "search-degraded" | Derived from 60 s envelope *(prov.)* |
| Safety-gate decision | ≤ 3 s p95; on timeout the gate **fails closed** (withhold + pharmacist line) | Design rule; latency *(prov.)* |
| Brand resolution lookup | ≤ 2 s p95 (local data path) | *(prov.)*, first telemetry |
| Light chat turn | first tokens ≤ 5 s, complete ≤ 15 s p95 | *(prov.)*, first telemetry |
| Page load | LCP < 2.5 s on mid-range mobile | Web vitals standard |
| Availability | 99.5% monthly, MVP | Prior-art bar, sane for MVP |
| Abuse rate limit | 20 requests/min burst per account | *(prov.)*, tune at launch |
| Concurrency sizing | 200 concurrent sessions at launch | *(prov.)*, replaced by marketing plan + WTP |
| Backups | Daily; deletion propagates within 30-day rotation | 30 days *(prov.)*, counsel confirms |
| Cost guardrail | Free-tier cost ≤ $0.20/user/month on lean config | D2-A3 formula; recompute on real telemetry |
| Accessibility | WCAG 2.2 AA, every screen, both directions | Chain constant |

---

### 12. D3-A5 — Acceptance Criteria, Failure Planning, Release Plan

**Acceptance criteria, Given-When-Then (18 safety/compliance spine):**

**AC-01 — Clash check catches a known interaction.**
Given a user whose medication list holds a resolved anticoagulant of the vitamin-K-sensitive class, When the agent drafts a plan that would spike leafy-green intake, Then the gate adjusts the plan to steady intake, explains why in plain words, and writes a safety-gate event.

**AC-02 — Unresolved brand withholds, never guesses.**
Given a Moroccan user adds a brand outside the bridge table, When they request a plan, Then medication-specific checks are withheld, the app says plainly it could not verify that medicine, the plan carries that limitation visibly, and no ingredient is inferred.

**AC-03 — Gate fails closed.**
Given the interaction data source is unreachable or times out, When a personalized suggestion would need a clash check, Then the suggestion is withheld with the pharmacist/doctor line, teach-mode content stays available, and the event is logged.

**AC-04 — Unknown diabetes type gets the higher-risk posture.**
Given a user on insulin whose type 1 vs type 2 status is not established, When diabetes-related content is generated, Then the content follows type 1 rules (no fasting/low-carb framing), and the safety layer prompts for the missing answer.

**AC-05 — Dose-reduction requests route to the prescriber.**
Given a user on insulin or a sulfonylurea reports improved readings and asks to take less, When the agent responds, Then it explains that dose changes are the prescriber's call, offers to prepare a summary for that visit, and contains no sentence stating or implying a reduced dose or readiness to reduce.

**AC-06 — Emergency takeover.**
Given a message describing a red-flag symptom (blood in stool/vomit, severe chest pain, fainting, severe hypo signs, sudden severe pain), When the message is processed, Then the emergency interstitial renders before any other content, no lifestyle content continues until the user acknowledges, and the event is logged without storing more detail than routing needs.

**AC-07 — Ancestral content never overrides a clinical block.**
Given retrieved traditional-medicine content proposes a remedy that conflicts with the user's medication or condition, When the plan is composed, Then the clinical block wins, the remedy is excluded, and cultural framing may remain only without the blocked remedy.

**AC-08 — Consent declined means teach-mode only.**
Given a new user declines health-data consent, When they use the app, Then no health-tagged entity is written, personalization stays locked, general education remains available, and no health data crosses to any external provider.

**AC-09 — Foreign-transfer consent precedes the first transfer.**
Given a consenting user in Morocco, When their first request would send profile-derived content to a provider abroad, Then the recorded consent covering that transfer exists before the call fires, and the consent record stores what was agreed.

**AC-10 — Delete destroys the health set.**
Given a user confirms deletion, When the delete runs, Then every health-tagged entity is destroyed in the live system immediately, consent and audit records survive stripped, the user sees exactly what was kept and why, and backup purge follows the stated rotation.

**AC-11 — Export is complete and safe.**
Given a user requests their data, When the bundle is produced, Then it contains all health-tagged and personal data, excludes the BYO-key in plaintext, and the request is audit-logged.

**AC-12 — Confirm-before-act, with rollback.**
Given an approved meal plan, When the agent proposes calendar events, Then a confirm card lists the exact events, nothing writes before approval, partial write rolls back fully, and both proposal and outcome land in the audit log.

**AC-13 — Agent cannot exceed its user's tier.**
Given a Free-tier user, When the agent selects a model or invokes any entitlement-gated capability, Then only that user's bundle is reachable, and a blocked attempt logs as a policy event.

**AC-14 — Cap-reached is honest.**
Given a Free user at their monthly plan cap, When they request another plan, Then the app refuses with the cap shown, offers upgrade and BYO-key, and generates no degraded plan as a fallback.

**AC-15 — Pregnancy scope holds.**
Given a user whose safety layer says pregnant/breastfeeding, When they ask for a supplement, herb, or fasting plan, Then the app declines that category with the reason, routes to their clinician, and still offers whole-food meal planning.

**AC-16 — Admin access is reason-gated.**
Given an admin without an open support case, When they attempt to view a user's health content, Then access is denied and the attempt is logged; with an open case, access is scoped to that case and every view is logged.

**AC-17 — Search-degraded plans say so.**
Given the narrative grounding step fails or times out, When the plan ships, Then it is built from the curated template base plus the completed gate check only, is visibly flagged, and contains no fresh claims presented as grounded.

**AC-18 — Two-tap cancel.**
Given a paying user, When they cancel, Then cancellation completes in two taps from the billing screen with no retention detour, and the confirmation states the exact end date.

**Planning for failure (per subsystem):**

| Subsystem | On failure | Never |
|---|---|---|
| Model provider | Chat shows outage message; plan requests offer retry; queued work resumes | Canned plan that skipped grounding or gate |
| Search provider | Teach mode continues; plans follow AC-17 (template + gate, flagged) | Fresh claims presented as grounded |
| Interaction data source | Gate fails closed per AC-03 | Unchecked personalized suggestion |
| Brand resolution source | Medication marked unverifiable; AC-02 behavior | Guessing ingredient from name |
| Calendar provider | Full rollback of partial writes; plan stays in-app; retry offered | Half week silently scheduled |
| Payment provider | Grace period on renewal failure; honest error on upgrade | Mid-cycle lockout |
| Export/delete jobs | Retry with status visible; support path; audit-logged | Delete reported done that left health data live |
| Abuse and injection | Retrieved/uploaded content treated as data, never instructions; tools allow-listed; confirm-before-act as human backstop | Following an instruction in content |
| Load spikes | Rate limits plus priority queue for Max; honest queue messaging | Silently dropping safety-gate steps |

**Release plan:**

**R1 — MVP.** 19 screens, both markets with L-08 split (France fully live, Morocco bridge-table classes + withhold-mode elsewhere). Blocking gates: zero safety leaks on fixtures, every plan turn shows a completed gate check, privacy pass (AC-08 through AC-11), performance targets, counsel items closed.

**R2 — fast-follow.** Attachments (counsel-gated), pregnancy full safety layer. Same gates plus their own fixtures.

**R3 — later.** Reminder channel (awaiting your call), family/caregiver accounts, tier-cap tuning on WTP data.

---

## D4 UX Researcher — 4 artifacts

### 13. D4-A1 — User Journeys and Screen Flows

The core-persona journey (emotional lows at consent + first withhold) plus 8 Mermaid flows: first-run/consent, medication resolution, plan+calendar, dose-reduction conversation, emergency takeover, data rights, FF attachments stub; every node traces to a D3-A3 screen or D3-A5 AC.

**Core journey, first week of the core persona:**

The persona: a daughter in Casablanca cooking for her mother, who has type 2 diabetes and takes two medications she knows only by brand name. Emotional journey shows low points at the consent ask and the first withhold.

**Eight signed flows:**

1. First-run flow: landing → onboarding → signup → consent decision → safety layer intake → first plan request
2. Medication resolution flow: brand entry → lookup → resolution status → withhold treatment
3. Plan generation and calendar write: plan request → capability check → grounding → gate check → plan view → calendar confirm
4. Dose-reduction conversation: user asks about reducing insulin → agent affirms progress → explains prescriber route → offers summary → boundaries maintained through multiple turns
5. Emergency takeover: red-flag symptom detected → interstitial renders → routes to care → thread resumes without advice on that symptom
6. Data rights flow: export and delete paths with consequence lists shown before action
7. Fast-follow stub: attachments upload → extraction → per-value confirm cards
8. Accompany flows on consent-declined (teach-mode only) and unresolved-brand (withhold treatment) showing the two safety branches

---

### 14. D4-A2 — Reusable Safety Patterns

Four UI patterns (confirm-before-act card, safety-withhold, emergency interstitial, degraded-grounding notice) with anatomy, never-rules, the 4-part plain-words copy formula, fail-closed rendering, and a11y+RTL. Each enforces named ACs at the interface layer.

**Pattern 1: Confirm-before-act card**

Anatomy: header (action name + agent-proposal marker) | scope statement (exact, countable change) | detail expander (collapsed list, expandable) | reversibility line (one sentence on undo) | decision row (Decline and Approve, same weight).

Behavior: nothing executes before Approve. No optimistic writes. Decline is final for that proposal. The card persists in history as a record. Both proposal and outcome write to audit log.

States: Proposed (decision live) → Executing (progress, not dismissible) → Done (outcome summary) or Rolled back (partial failure) or Declined.

Accessibility: focus to card header; tab order runs header → scope → details → Decline → Approve. Buttons 44px. Screen reader: "Proposal from your assistant: [action]. Review before approving."

RTL: decision row mirrors; mirrored buttons on the visual left in Arabic.

**Pattern 2: Safety-withhold treatment**

Anatomy: Shield icon + short label ("Couldn't verify") as a badge (medication row), inline note block (plan item), or message block (chat, gate timeout).

Body: Four parts, always (what/why/do now/still works). What: "We couldn't match this medicine's name to its ingredient." Why: "It isn't in the verified registries we check." Do now: "Show the box to your pharmacist and ask for the ingredient name; you can add it here after." Still works: "Your plans stay available; they'll note this limit until it's verified."

Behavior: the annotation ships inside the same content payload as the item it governs; render-race fail-closed. Never guesses. Copy never names internal mechanics. A withheld state never blocks teach-mode content about the topic in general.

States: the withhold IS a result state. Resolution state: when the user adds a verifiable ingredient, the badge flips to Resolved with a confirmation, and the next plan generation picks it up.

Accessibility: never color-only; shield + text at 4.5:1 contrast. Screen reader: "Not verified. Action available: add ingredient name."

RTL: badge position mirrors; shield icon does not mirror (universal symbol).

**Pattern 3: Emergency interstitial**

Anatomy: heading ("This needs real medical care now." plain, large, first focus) | reason line (one sentence naming the symptom category in the user's words, no diagnosis) | care routes (localized emergency contact line and nearest-care guidance, sourced at Delivery from official sources) | acknowledge (single button: "I understand." no secondary actions).

Behavior: renders as the first block of the response stream, server-composed. Full-screen takeover with focus trap: keyboard and screen-reader users land on heading, tab cycles inside, Escape does not dismiss; only Acknowledge does. After Acknowledge, thread resumes but the route-to-care line persists, and the agent gives no further advice on that symptom in that thread; it can help with logistics.

Storage: event logs the category and timestamp, not the full symptom text beyond what routing needs (data minimization).

Tone: serious and steady, not alarmist. No sirens, no flashing, no countdowns; animation-free by rule.

States: exactly one. No loading, no error variant; if symptom classification fails, the system errs toward showing the interstitial (fail closed).

RTL: full mirror; acknowledge button spans full width in both directions; emergency numbers render as LTR digit runs.

**Pattern 4: Degraded-grounding notice (compact)**

Anatomy: info marker (not shield, not error) + two-sentence body: "This plan was built from our vetted meal library and your safety checks, without today's fresh research. The food guidance stands; the deeper why-explanations will be richer when research is back." + one action: "Regenerate with research" (respects the plan cap honestly).

Behavior: safety-gate check is never degraded; this banner only describes the narrative layer. Distinct visual family from pattern 2: quality notices and safety notices must never look alike.

---

### 15. D4-A3 — Screen Specifications

**App shell (binds every screen):**

Regions, desktop: left sidebar (brand, primary nav: Chat/Plans/Medications; secondary nav: Settings; profile popup trigger at bottom) | content area | global-state layer above everything.

Regions, mobile: top bar (menu trigger, title, profile trigger) | content area | bottom-anchored action zone | drawer navigation.

Shared components: profile popup (Settings, Help, Feature Requests, Sign out), language switcher, theme toggle, toast rail.

**Accessibility baseline, stated once:** visible focus ring on every interactive element; 4.5:1 text contrast in both themes; 44px touch targets (24px floor); skip-to-content link; landmarks; reduced-motion preference; every icon pairs with accessible name; forms announce errors inline and in summary; focus never lost on state change.

**RTL baseline, stated once:** Arabic mirrors the full layout (sidebar right, reading right-to-left, chevrons flip). Icons that do not mirror: shield, play/media, clock faces. Digit policy: Western digits everywhere in Arabic. Latin runs inside Arabic get bidirectional isolation. Dates localize day and month names; times render as LTR digit runs.

**Deep specs: the three RTL-hard screens:**

**S5 — Chat home (RTL-hard)**

Each bubble takes its direction from its own content, so an Arabic question and a French answer coexist in one thread without either breaking. Latin drug names inside Arabic sentences sit in isolated runs. The test case is "واش Doliprane مزيان ليا؟" rendering with the brand intact and the question mark on the correct side. The composer auto-detects direction from the first strong character and re-evaluates on clear.

**S8 — Meal plan view (RTL-hard)**

Day tabs flow right-to-left with Monday rightmost in Arabic. The numbers panel mixes Arabic labels with Western-digit values and Latin units; each value-unit pair ("45 g") is one isolated left-to-right run. Portion prose stays pure Arabic with no embedded digits when the layer is off.

**S10 — Calendar confirm sheet (RTL-hard)**

Event rows mirror column order (day name rightmost in Arabic). Day names localize; times stay LTR digit runs. Date format follows locale.

---

### 16. D4-A4 — Usability Instrument (consent/withhold/confirm)

**Purpose:** Measure whether the two emotional low points of the journey (consent step, first withhold) actually communicate what they must: does the person understand what they're agreeing to, and does "couldn't verify" read as protection or as breakage.

**Target participants:** 6 per language (AR/FR), 12 total; at least half matching the core segment (manage T2D/hypertension or cook for someone who does); ages 25–65; exclude anyone in visible health distress.

Run Darija-spoken conversations against MSA written stimuli (that's the real product's situation, so it's part of what's being tested).

**Sample size:** 6 per language minimum. Anything under 5 in a language cell gets labeled anecdotal.

**Run time:** 20–25 minutes, one moderator, notes only.

**Materials: stimulus cards (exact wording):**

**Card 1 (consent summary):**
"Before we start: to give advice that's safe for your body, we ask about your health, your medicines, your allergies. This is health information. It's protected: you can see it, download it, or delete it whenever you want. To work, the app sends parts of it to trusted services that power it, including services outside Morocco. Nothing is used without your yes. [ ] I agree to the app using my health information. [ ] I agree to it being sent to the services that power the app, including abroad."

AR version (MSA register with Moroccan terms): «قبل أن نبدأ: لكي ننصحك بما يناسب جسمك دون خطر، نسألك عن صحتك وأدويتك وحساسيتك. هذه معلومات صحية. وهي محمية: يمكنك رؤيتها أو تحميلها أو حذفها متى شئت. ولكي يعمل التطبيق، يرسل جزءًا منها إلى خدمات موثوقة تشغّله، بعضها خارج المغرب. لا شيء يُستعمل بدون موافقتك.»

FR version: « Avant de commencer : pour vous conseiller sans risque pour votre corps, nous vous demandons votre santé, vos médicaments, vos allergies. Ce sont des informations de santé. Elles sont protégées : vous pouvez les voir, les télécharger ou les supprimer quand vous voulez. Pour fonctionner, l'application en envoie une partie aux services de confiance qui la font tourner, y compris hors du Maroc. Rien n'est utilisé sans votre oui. »

**Card 2 (withhold message):**
"Couldn't verify this medicine. 'Ridal 40' isn't in the verified registries we check, so we can't confirm what's inside it. Show the box to your pharmacist and ask for the ingredient name; you can add it here after. Your meal plans still work; they'll just note this limit until it's verified."

(Same structure in FR and AR, translating "Ridal 40" as a fictional brand.)

**Card 3 (confirm card):**
"Your assistant proposes: add this plan to your calendar. 21 events, Monday to Sunday, lunch and dinner, in your Google Calendar. You can remove them at any time from Settings or your calendar. [Decline] [Approve]"

(FR: « Refuser » / « Approuver »; AR: «رفض» / «موافقة»)

**Session script (read aloud):** "Imagine: you help your mother with her meals. She has diabetes and takes a medicine called Ridal 40. You've just installed an app that builds weekly meal plans around her health. Everything I show you comes from that app. There are no wrong answers; I'm testing the app's words, not you."

**Pass/fail comprehension checks (fixed pre-data):**

Consent: C1 states health information is collected; C2 states it can be deleted or downloaded by them; C3 states some of it goes to outside services, including abroad; C4 states nothing happens without their agreement.

Withhold: W1 states the app could not verify or find the medicine (any wording); W2 states the app is not broken; W3 names the pharmacist step unprompted or when asked what next; W4 states plans still work.

Confirm: A1 states nothing is in the calendar yet; A2 states Approve writes the 21 events; A3 states removal is possible afterward.

**Thresholds, per language:** a check passes if at least 5 of 6 participants pass it. Any check at 3 of 6 or below fails hard: that line's copy (or its translation) revises and that module retests. W2 is the load-bearing check; if W2 fails in any language, the withhold visual and copy treatment reopen before build.

**Return format (one row per respondent):**

| Field | Content |
|---|---|
| respondent_id | P01, P02… (no names) |
| language | AR / FR / EN |
| segment_match | yes / no |
| age_band | 25-40 / 41-55 / 56-65 |
| digital_comfort | self-rated 1-5 |
| C1…C4, W1…W4, A1…A3 | pass / fail (each) |
| verbatim_withhold | their exact words for "what just happened" (anonymized) |
| least_clear | card number + one line why |
| moderator_note | anything odd, one line |
| collection_date | ISO date |

**Compliance:** Verbal consent line at start ("anonymous, notes only, used only to improve the app's wording, stop anytime"). Collect no real medication names, conditions, or identity details. Run on paper or private note, not a free AI tool.

---

## D1 Engagement Lead (close) — 1 artifact

### 17. D1-C1 — Closing Brief, Chain Audit and Bootstrap Work Plan

**Every client ask, traced:**
Every deliverable from the brief lives in a signed D3 artifact or a recorded deferral. Onboarding, profile fields, auth, data rights, meal plans, calendar, attachments, LLM choice, settings, themes, all locked. Reminders and family accounts are deferred (R3), not cut. International expansion and Android-native ship in L-12 as a roadmap phase.

**The bootstrap work plan:**

Two clocks run from day one. The build clock (yours, dependency-ordered phases, safety spine first) and the external clock (counsel's, CNDP authorization). The plan's shape is those two in parallel, meeting at launch. Real user health data cannot be processed until gate 5 closes.

**Week one checklist (agent items only):**
1. Scaffold the monorepo per S1-A1 §4.
2. Wire CI: the fixture job exists and is red, branch protection requires it.
3. Prisma schema, registry generator, delete-coverage test.
4. License sweep, hosting terms check; record dated results.
5. Pin the price config from current provider rates.
6. Ingest a snapshot of the French medicines registry into reference tables.
7. Spike the ANSM thesaurus format (one afternoon: measure the effort).
8. **You:** contact Moroccan health-law counsel, start CNDP filing.
9. **You:** open the bridge-table sheet and log the first Moroccan brands from L-08's three classes.
10. **You:** book usability sessions for phase 2, start WTP outreach.

**Four build phases (exit criteria tied to release gates):**

| Phase | Builds | Exit criteria | Rough size |
|---|---|---|---|
| P0 | Week one above | CI wired, schema+registry green, four checklist items dated | ~1 week |
| P1 | `resolution` (FR ingest + MA bridge loader), `gate` with interaction rules, pattern lists EN/FR/AR, delete+export jobs | Pipeline and pattern blockers green on mocked provider incl. poisoned drafts; delete-coverage green; gate 1 holds | ~3–4 weeks |
| P2 | Prompt assembly, read-only tools, lean-model integration, emergency classifier, grounding+cache, screens S3–S7 | Nightly full sweep green; AC-08/09 green end-to-end; teach and personal modes live on synthetic profiles; **usability results folded into copy before it hardens**; Darija passes landed | ~3–4 weeks |
| P3 | Plan pipeline end-to-end (S8, S9), entitlements+caps+cost log, calendar confirm+write (S10), data-rights UI (S15), settings, i18n/RTL, themes | Gates 2 and 3 demonstrably true in full test pass; cost-guardrail CI green against real telemetry | ~4–6 weeks |
| P4 | Performance pass, red-team hour, launch checklist, deploy | Gates 1–5 all green, counsel confirms CNDP complete, closed beta opens in Morocco | ~2–3 weeks |

**Your parallel track (phase by phase):**
P0–P1: counsel started, bridge table growing weekly, template library seeding. P2: Darija passes, run usability sessions, WTP interviews. P3: local-dish nutrition fills, emergency numbers sourced. P4: red-team hour, WTP rows pasted.

**The cut line:**
If time crushes, cut in this order and no further: admin dashboards (logs-only), feature requests, plans-library polish, light theme. What never moves: any Highest-tier feature, any fixture, any gate, consent path, data-rights jobs.