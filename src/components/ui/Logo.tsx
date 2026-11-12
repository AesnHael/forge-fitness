/** Hexagon "bolt" mark. */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M20 2 36 11v18L20 38 4 29V11z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M22.5 9 13 22h6l-1.5 9L27 18h-6z" fill="var(--color-volt)" />
    </svg>
  );
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`display text-[1.5rem] leading-none tracking-wide ${className}`}>
      Forge<span className="text-volt">.</span>
    </span>
  );
}
