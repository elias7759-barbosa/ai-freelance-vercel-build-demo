import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Deployment Diagnostics Demo',
  description: 'A small Next.js application for reproducible build and deployment diagnostics.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
      <a className="skip-link" href="#main">Skip to content</a>
      <header>
      <Link className="brand" href="/">Deployment Lab<span>DEMO / 03</span>
      </Link>
      <nav aria-label="Main navigation">
      <Link href="/">Overview</Link>
      <Link href="/deployment-info">Deployment info</Link>
      </nav>
      </header>{children}<footer>
      <span>Demonstration project</span>
      <span>No accounts. No database. No secrets required.</span>
      </footer>
      </body>
      </html>
  );
}
