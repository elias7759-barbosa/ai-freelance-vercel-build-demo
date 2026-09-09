# Evidence provenance

## Working baseline

Validated on macOS arm64 with Node.js 24.14.1 and Vercel CLI 59.14.0.

| Check | Observed result |
| --- | --- |
| Development HTTP routes `/` and `/deployment-info` | 200 / 200 |
| `npm test` | 9/9 integration tests pass |
| `npm run typecheck` | Exit 0 |
| `npm run lint` | Exit 0 |
| `npm run build` | Exit 0; both application routes prerendered |
| `npm run test:e2e` | 5/5 production Chromium scenarios pass |
| `npm run verify:vercel` | Exit 0; actual CLI generated `.vercel/output` |
| `npm audit --omit=dev` | Zero advisories |
| Cloud preview | NOT USED — NO SAFE FREE SCOPE AVAILABLE |

`01-application.png` is a real Chromium capture of the local production home page at a 1440 px viewport. It is not a cloud screenshot. Mobile was also inspected at 375 px and tested for horizontal overflow.

Primary deployment verifier: `scripts/verify-vercel.mjs`.
SHA-256 at baseline: `bb3ed4140c0ad2ecbf3a2497065dcf9c3342139dbbbf783ce7574e41c9a2957b`.

No broken or fixed results are claimed yet. The Vercel local settings fixture does not establish cloud equivalence. Remaining development toolchain audit advisories are a known limitation: 27 total (1 low, 12 moderate, 14 high), zero critical after the targeted tar override.
