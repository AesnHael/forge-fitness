export function SectionTag({ n, children }: { n: string; children: string }) {
  return (
    <p className="tag mb-6 flex items-center gap-3 text-volt">
      <span className="inline-block h-2 w-2 bg-volt" aria-hidden="true" />
      <span className="text-smoke">{n}</span> {children}
    </p>
  );
}
