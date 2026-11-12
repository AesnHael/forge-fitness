import { Star } from 'lucide-react';
import { testimonials } from '../data';
import { Reveal } from './ui/Reveal';
import { SectionTag } from './ui/SectionTag';

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="w-[300px] shrink-0 border border-line bg-iron p-6 transition-colors duration-300 hover:border-volt/50 sm:w-[380px] sm:p-7">
      <div className="flex gap-1 text-volt" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="mt-5 text-[1.05rem] leading-relaxed text-chalk/90">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="display grid h-10 w-10 place-items-center bg-steel text-lg text-volt">{t.name[0]}</span>
        <span>
          <span className="block font-semibold">{t.name}</span>
          <span className="block text-xs uppercase tracking-[0.14em] text-smoke">{t.meta}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const a = testimonials.slice(0, 3);
  const b = testimonials.slice(3);
  return (
    <section className="overflow-hidden bg-coal py-24 sm:py-32">
      <div className="container-x mb-14">
        <Reveal>
          <SectionTag n="05">Client reviews</SectionTag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display text-[clamp(3rem,7vw,6.5rem)]">
            Don’t take <span className="outline-text">my</span> word.
          </h2>
        </Reveal>
      </div>
      <div className="space-y-5">
        {[a, b].map((row, r) => (
          <div key={r} className="relative">
            <div className={`marquee-track flex w-max gap-5 [--marquee-duration:55s] ${r ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
              {[...row, ...row, ...row, ...row].map((t, i) => (
                <Card key={`${r}-${i}`} t={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
