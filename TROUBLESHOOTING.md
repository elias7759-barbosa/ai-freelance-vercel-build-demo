# Vercel Build / Deployment Troubleshooting

## Context

Demonstration Project. A small Next.js App Router application provides two static routes, `/` and `/deployment-info`, with no database, authentication, or required environment variables. The exercise distinguishes application compilation from deployment configuration validation.

## Working Baseline

Baseline commit: `644b35c`.

The application passed nine unit/integration tests, five production-browser scenarios, TypeScript checks, ESLint, and the Next.js production build. Both routes also returned HTTP 200 from the development server.

The real Vercel CLI 59.14.0 local build completed with exit code 0. This was a local pipeline execution, not a cloud deployment.

## Regression

Broken commit: `b44f559`.

A single deployment configuration change set `outputDirectory` in `vercel.json` to `dist`. The application still used Next.js's default `.next` output directory.

The local Next.js build continued to succeed. The Vercel build failed while validating the configured output directory.

## Reproduction

Use Node.js 24.x and a fresh checkout. Install the locked dependencies:

```sh
npm ci
```

Use separate fresh checkouts for each revision. If reusing a checkout, remove only generated `.next/` and `.vercel/output/` artifacts before each Vercel run so stale output cannot mask the result. Do not delete source files or unrelated directories.

Run the application build and deployment verifier separately:

```sh
npm run build
npm run verify:vercel
```

At the baseline commit, both commands succeeded. At the broken commit, the first command returned exit code 0 and the second returned exit code 1.

The Vercel failure included:

```text
The Next.js output directory "dist" was not found
```

The deployment verifier invokes the real local Vercel CLI pipeline. It does not substitute a mock build for deployment validation.

## Root Cause

Two tools consume different configuration. `next build` compiles the application using the Next.js configuration and produces `.next`. The Vercel pipeline also consumes `vercel.json` and expects the explicitly configured output directory to exist.

Setting that directory to `dist` creates a mismatch without breaking the source code, TypeScript compilation, or local production build. A successful local build therefore cannot establish that the deployment configuration is compatible with the generated output.

## Evidence

| Version | Local Build | Vercel Build |
| --- | --- | --- |
| Baseline (`644b35c`) | PASS — exit 0 | PASS — exit 0 |
| Broken (`b44f559`) | PASS — exit 0 | FAIL — exit 1; configured `dist` directory missing |
| Fixed (`3f0a5a5`) | PASS — exit 0 | PASS — exit 0, clean generated output |

These entries describe actual local command executions. No cloud preview or production deployment is represented by the table.

## Fix

Fixed commit: `3f0a5a5cf9690d12db634d00fd61325426aed2b9`.

The correction removes only the erroneous `outputDirectory` property from `vercel.json`, restoring framework-default output detection. The complete tracked-file diff between baseline and fixed is empty. No application source, dependency, test, or verifier change was needed.

Both the local production build and the real Vercel CLI local build passed after the correction. Independent final audit approved the fix; it was merged after approval.

## Regression Protection

Retain the same primary deployment verifier across baseline, broken, and fixed revisions. Record its SHA-256 digest at each revision and verify that the digests are identical.

Run both `npm run verify` and `npm run verify:vercel`: the first checks the application, while the second covers deployment-specific configuration. Production-browser tests provide separate navigation and layout coverage.

The primary deployment verifier has the same SHA-256 digest in all three revisions:

```text
bb3ed4140c0ad2ecbf3a2497065dcf9c3342139dbbbf783ce7574e41c9a2957b
```

The unchanged verifier passed at baseline, failed at broken, and passed at fixed. Neither tests nor the verifier were weakened to obtain the fixed result.

## Validation

Verified baseline results:

- Unit/integration tests: 9/9 passed.
- Production-browser scenarios: 5/5 passed.
- Development server: both application routes returned HTTP 200.
- TypeScript and ESLint: passed.
- Next.js production build: passed.
- Vercel CLI local build: passed.

Verified broken results:

- Next.js production build: passed, exit 0.
- Vercel CLI local build: failed, exit 1, with the output-directory error above.

Verified fixed results:

- Unit/integration tests: 9/9 passed.
- Production-browser scenarios: 5/5 passed.
- TypeScript and ESLint: passed.
- Next.js production build: passed, exit 0.
- Real Vercel CLI local build with clean generated output: passed, exit 0.

Independent diagnosis converged on the same configuration mismatch. A separate machine running Node.js 24.21 reproduced the baseline and broken behavior. Independent final audit approved the fix; it was merged after approval. No unperformed checks are counted as passing.

## Limitations

VERCEL CLOUD PREVIEW: NOT USED — NO SAFE FREE SCOPE AVAILABLE.

Validation mode is LOCAL ONLY. A successful Vercel CLI local build is evidence for the local deployment pipeline; it does not prove cloud hosting, DNS, production routing, or a live deployment.

The recorded dependency audit found zero production dependency advisories and 27 remaining development-toolchain advisories. A targeted `tar` override addressed the known critical archive-package advisory; the remaining toolchain findings are a documented limitation, not a claim of a completely clean audit.

## Security

The application requires no secrets, accounts, database, payments, or personal data. Local Vercel metadata is ignored by Git. Cloud project IDs, organization IDs, authentication tokens, and personal filesystem paths must not be included in public evidence.

Dependency-toolchain findings concern build/development packages; this distinction does not make them irrelevant to the environment that runs those tools.

## References

- [Next.js build CLI documentation](https://nextjs.org/docs/app/api-reference/cli/next)
- [Vercel project configuration](https://vercel.com/docs/project-configuration)
- [Vercel build command](https://vercel.com/docs/cli/build)
- Baseline revision: `644b35c`.
- Broken revision: `b44f559`.
- Fixed revision: `3f0a5a5cf9690d12db634d00fd61325426aed2b9`.

Official references explain the configuration contract; the recorded command executions establish the results.
