'use strict';

/**
 * The dependency law, CI-blocking (T-002).
 *
 * Line-for-line transcription of the allowed-import edge table in
 * docs/phase2/Architecture.md, S1-A2 §4 (do not edit that file; it is
 * signed-pack reference). Pick recorded in docs/phase2/Architecture.md
 * S2-A1 §2: dependency-cruiser is the boundary enforcement of record.
 *
 *   apps/web      -> agent, entitlements, db, i18n, shared
 *   agent         -> grounding, gate, resolution, entitlements, db, shared
 *   gate          -> resolution, db, shared
 *   grounding     -> db, shared (+ cache client, an npm dep, not a workspace edge)
 *   resolution    -> db, shared
 *   entitlements  -> db, shared
 *   db            -> shared
 *   shared        -> nothing
 *   i18n          -> shared (no row in the signed table; T-001 ruling in
 *                     DECISIONS.md, matches its package.json dep + TS ref)
 *
 * Everything else forbidden. Only `agent` may import provider SDKs
 * (model/search vendor packages) -- see the providerSdkPattern note
 * below and DECISIONS.md for how that constraint is expressed here.
 */

// Provider SDK packages: model + search vendor SDKs. `agent` is the only
// package allowed to import these (realizes the model-router / search-port
// exports named in S1-A2 §4-5). This list is a best-effort transcription
// of "provider SDK" pending S2/S3's concrete vendor picks -- update it
// when a vendor is chosen (see DECISIONS.md).
const providerSdkPattern =
  'node_modules/(openai|@anthropic-ai/|@google/generative-ai|@google-cloud/|cohere-ai|@mistralai/|groq-sdk|replicate|@azure/openai|exa-js|@exa-labs/|firecrawl-js|@mendable/firecrawl-js|serpapi|@tavily/)';

module.exports = {
  forbidden: [
    {
      name: 'web-boundary',
      severity: 'error',
      comment:
        'apps/web may only import agent, entitlements, db, i18n, shared (S1-A2 §4).',
      from: { path: '^apps/web/' },
      to: {
        path: '^packages/',
        pathNot: '^packages/(agent|entitlements|db|i18n|shared)/',
      },
    },
    {
      name: 'agent-boundary',
      severity: 'error',
      comment:
        'agent may only import grounding, gate, resolution, entitlements, db, shared (S1-A2 §4).',
      from: { path: '^packages/agent/' },
      to: {
        path: '^packages/',
        pathNot:
          '^packages/(agent|grounding|gate|resolution|entitlements|db|shared)/',
      },
    },
    {
      name: 'gate-boundary',
      severity: 'error',
      comment: 'gate may only import resolution, db, shared (S1-A2 §4).',
      from: { path: '^packages/gate/' },
      to: {
        path: '^packages/',
        pathNot: '^packages/(gate|resolution|db|shared)/',
      },
    },
    {
      name: 'grounding-boundary',
      severity: 'error',
      comment: 'grounding may only import db, shared (S1-A2 §4).',
      from: { path: '^packages/grounding/' },
      to: {
        path: '^packages/',
        pathNot: '^packages/(grounding|db|shared)/',
      },
    },
    {
      name: 'resolution-boundary',
      severity: 'error',
      comment: 'resolution may only import db, shared (S1-A2 §4).',
      from: { path: '^packages/resolution/' },
      to: {
        path: '^packages/',
        pathNot: '^packages/(resolution|db|shared)/',
      },
    },
    {
      name: 'entitlements-boundary',
      severity: 'error',
      comment: 'entitlements may only import db, shared (S1-A2 §4).',
      from: { path: '^packages/entitlements/' },
      to: {
        path: '^packages/',
        pathNot: '^packages/(entitlements|db|shared)/',
      },
    },
    {
      name: 'db-boundary',
      severity: 'error',
      comment: 'db may only import shared (S1-A2 §4).',
      from: { path: '^packages/db/' },
      to: {
        path: '^packages/',
        pathNot: '^packages/(db|shared)/',
      },
    },
    {
      name: 'shared-boundary',
      severity: 'error',
      comment: 'shared may import nothing else in the workspace (S1-A2 §4).',
      from: { path: '^packages/shared/' },
      to: {
        path: '^packages/',
        pathNot: '^packages/shared/',
      },
    },
    {
      name: 'i18n-boundary',
      severity: 'error',
      comment:
        'i18n has no row in the S1-A2 §4 edge table; T-001 (DECISIONS.md) ruled it may import shared only, matching its package.json dep and TS project reference.',
      from: { path: '^packages/i18n/' },
      to: {
        path: '^packages/',
        pathNot: '^packages/(i18n|shared)/',
      },
    },
    {
      name: 'no-package-imports-app',
      severity: 'error',
      comment:
        'apps/web is a leaf consumer; no workspace package may import it back (S1-A2 §4).',
      from: { path: '^packages/' },
      to: { path: '^apps/' },
    },
    {
      name: 'provider-sdk-only-in-agent',
      severity: 'error',
      comment:
        'Only agent may import provider SDKs (model/search vendor packages); realizes the model-router / search-port exports (S1-A2 §4-5).',
      from: {
        path: '^(apps/web|packages/(db|entitlements|gate|grounding|i18n|resolution|shared))/',
      },
      to: { path: providerSdkPattern },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    exclude: { path: '(^|/)(dist|\\.turbo|\\.next)(/|$)' },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: 'tsconfig.json' },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default', 'types'],
    },
  },
};
