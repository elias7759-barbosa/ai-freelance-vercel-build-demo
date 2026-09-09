import Link from 'next/link';
import { DiagnosticCard } from '@/components/diagnostic-card';

export default function Home() {
  return (
    <main id="main">
      <p className="eyebrow">BUILD · VERIFY · DEPLOY</p>
      <h1>Deployment <br/>Diagnostics Demo<span className="dot">.</span>
      </h1>
      <p className="intro">A small application with a clear purpose: make build and deployment behavior reproducible, inspectable, and easy to verify.</p>
      <Link className="button" href="/deployment-info">Explore deployment info <span aria-hidden="true">↗</span>
      </Link>
      <section className="cards" aria-label="Diagnostic principles">
      <DiagnosticCard number="01" title="Local application">Two simple routes provide a stable baseline for navigation and production checks.</DiagnosticCard>
      <DiagnosticCard number="02" title="Production build">A successful Next.js build validates the application’s production compilation.</DiagnosticCard>
      <DiagnosticCard number="03" title="Deployment pipeline">The deployment pipeline needs its own verification. A local build alone is not deployment evidence.</DiagnosticCard>
      </section>
      <aside className="note">
      <strong>Evidence, not assumptions.</strong> This page describes the application. Actual build results are recorded by the verification commands.</aside>
      </main>
  );
}
