import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>This page is missing<span className="dot">.</span>
      </h1>
      <p className="intro">The address does not match a page in this demo.</p>
      <Link className="button" href="/">Return to overview</Link>
      </main>
  );
}
