const words = ['Strength', 'Conditioning', 'Boxing', 'Mobility', 'Nutrition', 'Accountability'];

function Row({ reverse = false, outline = false }: { reverse?: boolean; outline?: boolean }) {
  const items = [...words, ...words];
  return (
    <div className={`marquee-track flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
      {[0, 1].map((k) => (
        <div key={k} className="flex items-center">
          {items.map((w, i) => (
            <span key={`${k}-${i}`} className={`display flex items-center px-6 text-[clamp(2.2rem,5vw,4rem)] ${outline ? 'outline-text' : 'text-coal'}`}>
              {w}
              <svg viewBox="0 0 24 24" className={`ml-12 h-6 w-6 ${outline ? 'text-volt' : 'text-coal'}`} fill="currentColor" aria-hidden="true">
                <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
              </svg>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <div className="relative overflow-hidden py-10" aria-hidden="true">
      <div className="-rotate-2 bg-volt py-4">
        <Row />
      </div>
      <div className="mt-[-1.5rem] rotate-1 border-y border-line bg-iron py-4">
        <Row reverse outline />
      </div>
    </div>
  );
}
