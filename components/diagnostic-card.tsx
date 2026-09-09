export function DiagnosticCard({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <article className="card">
      <span className="card-number" aria-hidden="true">{number}</span>
      <h2>{title}</h2>
      <p>{children}</p>
      </article>
  );
}
