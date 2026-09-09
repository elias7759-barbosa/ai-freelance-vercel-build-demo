import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

// Local settings fixture, not a cloud project link. No account IDs or credentials.
// The actual Vercel CLI resolves vercel.json and runs the framework builder.
const settingsPath = new URL('../.vercel/project.json', import.meta.url);
try {
  const existing = JSON.parse(await readFile(settingsPath, 'utf8'));
  if (existing.projectId || existing.orgId) {
    throw new Error('This local-only verifier refuses cloud-linked settings. Use a clean checkout.');
  }
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
await mkdir(new URL('../.vercel/', import.meta.url), { recursive: true });
await writeFile(settingsPath, JSON.stringify({ settings: {
  framework: 'nextjs', nodeVersion: '24.x', rootDirectory: null,
  buildCommand: null, installCommand: 'npm ci', outputDirectory: null,
} }, null, 2) + '\n');
console.log('LOCAL VERCEL CLI BUILD — no cloud deployment or linked account');
const result = spawnSync('vercel', ['build', '--non-interactive'], {
  stdio: 'inherit',
  env: { ...process.env, VERCEL_TELEMETRY_DISABLED: '1', NEXT_TELEMETRY_DISABLED: '1' },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
