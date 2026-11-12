import { Check } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';
import { programs, type Program } from '../data';
import { gsap, prefersReducedMotion, ScrollTrigger } from '../lib/scroll';
import { Reveal } from './ui/Reveal';
import { SectionTag } from './ui/SectionTag';

function Card({ p, i }: { p: Program; i: number }) {
  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden border border-line bg-iron transition-colors duration-500 hover:border-volt/60 lg:w-[min(440px,34vw)] lg:shrink-0">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={p.image.sm}
          alt={p.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-iron via-iron/10 to-transparent" />
        <span className="display absolute left-5 top-4 text-6xl text-chalk/90">0{i + 1}</span>
        <span className="tag absolute right-4 top-5 bg-coal/80 px-3 py-1.5 text-volt backdrop-blur">{p.level}</span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="display text-[2.2rem] leading-[0.95]">{p.title}</h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-smoke">{p.tagline}</p>
        <ul className="mt-6 space-y-2.5 text-sm">
          {p.points.map((pt) => (
            <li key={pt} className="flex items-center gap-3">
              <Check className="h-4 w-4 shrink-0 text-volt" aria-hidden="true" />
              {pt}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between border-t border-line pt-5 text-xs font-semibold uppercase tracking-[0.16em] text-smoke">
          <span>{p.weeks ? `${p.weeks} weeks` : 'Ongoing'}</span>
          <span className="text-chalk">{p.perWeek}</span>
        </div>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-volt transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
    </article>
  );
}

export function Programs() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  // Desktop: pin the section and scroll the cards sideways.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const el = track.current!;
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 64);
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      return () => tween.kill();
    });
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(t);
      mm.revert();
    };
  }, []);

  return (
    <section id="programs" ref={section} className="relative overflow-hidden bg-coal py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
      <div className="container-x mb-12 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Reveal>
            <SectionTag n="01">Programs</SectionTag>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-[clamp(3rem,7vw,6.5rem)]">
              Pick your <span className="text-volt">path.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-smoke">Every program comes with an app, video demos and a real coach checking your progress every week.</p>
        </Reveal>
      </div>
      <div ref={track} className="container-x grid gap-5 sm:grid-cols-2 lg:flex lg:w-max lg:max-w-none lg:gap-6">
        {programs.map((p, i) => (
          <Card key={p.id} p={p} i={i} />
        ))}
        <div className="hidden w-[min(440px,34vw)] shrink-0 flex-col justify-center border border-dashed border-line p-10 lg:flex">
          <p className="display text-5xl leading-[0.95]">
            Not sure <span className="outline-text">which?</span>
          </p>
          <p className="mt-4 text-smoke">Book a free session — we’ll pick the right plan together.</p>
          <a href="#book" className="tag mt-8 text-volt underline underline-offset-8">
            Free assessment →
          </a>
        </div>
      </div>
    </section>
  );
}
