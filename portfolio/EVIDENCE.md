# Evidence provenance

Demonstration Project. Executed locally on macOS arm64, Node.js 24.14.1, Next.js 16.3.4, pinned Vercel CLI 59.14.0. Independent review repeated baseline/broken/fixed execution on another machine with Node.js 24.21.0 and approved the source/config fix before merge.

## Results

| Version | Direct Next build | Real local Vercel build |
| --- | --- | --- |
| baseline-working · 644b35c | PASS, exit 0 | PASS, exit 0 |
| bug-broken · b44f559 | PASS, exit 0 | FAIL, exit 1; missing dist |
| bug-fixed · 3f0a5a5 | PASS, exit 0 | PASS, exit 0 |

Post-merge main was revalidated: `merged-verify.log`, `merged-e2e.log` and `merged-vercel.log`, all exit 0. Portfolio additions after that validation change only documentation, logs and images.

Baseline and fixed: unit/integration 9/9, production Chromium E2E 5/5, typecheck and lint PASS. Development smoke: both routes HTTP 200. Clean-output Vercel executions remove only generated `.next` and `.vercel/output` beforehand. Generated fixed output uses Build Output API v3 and contains `functions/index.prerender-fallback.html` and `functions/deployment-info.prerender-fallback.html` with expected content.

## Images and original commands

| Image | Provenance | Source execution log |
| --- | --- | --- |
| 01-application.png | Real Chromium browser capture, local production home at 1440px; UI identical in baseline and fixed | Production browser session; E2E in baseline-final-e2e.log |
| 02-local-build-pass.png | Labeled visual summary of actual broken-revision command, not a terminal screenshot | broken-local.log — npm run build |
| 03-vercel-build-fail.png | Labeled visual summary of actual broken-revision failure | broken-vercel.log — npm run verify:vercel |
| 04-vercel-build-fixed.png | Labeled visual summary of actual fixed-revision success | fixed-vercel.log — npm run verify:vercel |
| 05-validation.png | Labeled visual summary of actual fixed-revision checks | fixed-verify.log, fixed-e2e.log, fixed-vercel.log |

Logs are included in [logs/](logs/). Personal checkout paths are replaced with `<checkout>` and terminal color escapes are removed. Exit codes were captured by the command runner; npm/CLI text is retained, including the failed build and toolchain audit warnings. Images do not substitute for executable verification.

## Verifier integrity

Primary file: `scripts/verify-vercel.mjs`.

| Version | SHA-256 |
| --- | --- |
| baseline-working | bb3ed4140c0ad2ecbf3a2497065dcf9c3342139dbbbf783ce7574e41c9a2957b |
| bug-broken | bb3ed4140c0ad2ecbf3a2497065dcf9c3342139dbbbf783ce7574e41c9a2957b |
| bug-fixed | bb3ed4140c0ad2ecbf3a2497065dcf9c3342139dbbbf783ce7574e41c9a2957b |

Computed directly from Git blobs. Tests, package scripts, lockfile and runtime pin are also unchanged. Only the outputDirectory property is added in broken and removed in fixed. Fixed tracked tree equals baseline before portfolio documentation additions.

## Limits

VERCEL CLOUD PREVIEW: NOT USED — NO SAFE FREE SCOPE AVAILABLE.

The CLI runs against an ID-free, ignored settings fixture. This is real local builder/adapter execution, not verification of remote project settings, Linux cloud builds or a hosted preview. No paid resources were created. No deployment output is versioned.

`npm audit --omit=dev`: zero advisories. Development tooling: 27 advisories (1 low, 12 moderate, 14 high), zero critical after targeted tar override. This is not a clean dependency-security audit.
