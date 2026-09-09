import Link from 'next/link';

const details = [
  ['Application', 'Deployment Diagnostics Demo'],
  ['Framework', 'Next.js · App Router'],
  ['Language', 'TypeScript'],
  ['Target runtime', 'Node.js 24.x'],
  ['Rendering', 'Static pages'],
  ['Required environment variables', 'None'],
];

export default function DeploymentInfo() {
  return (
    <main id="main">
      <p className="eyebrow">APPLICATION CONTRACT</p>
      <h1>Deployment info<span className="dot">.</span>
      </h1>
      <p className="intro">Public, non-sensitive application details. This is a configuration reference, not a live infrastructure monitor.</p>
      <dl className="details">{details.map(([label, value]) => <div key={label}>
      <dt>{label}</dt>
      <dd>{value}</dd>
      </div>)}</dl>
      <aside className="note">
      <strong>Build status is verified separately.</strong> Run <code>npm run verify</code> to check tests, types, lint, and the local production build. Consult the repository for deployment-specific verification.</aside>
      <Link className="back-link" href="/">← Back to overview</Link>
      </main>
  );
}
