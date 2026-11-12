import { images, resultStats } from '../data';
import { BeforeAfter } from './BeforeAfter';
import { Counter } from './ui/Counter';
import { Reveal } from './ui/Reveal';
import { SectionTag } from './ui/SectionTag';

export function Results() {
  return (
    <section id="results" className="grid-bg relative border-y border-line bg-iron py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-24">
        <div>
          <Reveal>
            <SectionTag n="03">Results</SectionTag>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-[clamp(3rem,7vw,6.5rem)]">
              Real work.
              <br />
              <span className="outline-text">Real</span> <span className="text-volt">change.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-chalk/75">
              Daniel came in wanting to “just get a bit fitter”. Sixteen weeks of Strength Foundations and simple nutrition habits later,
              he’d rebuilt his body — and his confidence.
            </p>
          </Reveal>

          <dl className="mt-12 grid grid-cols-3 gap-px bg-line">
            {resultStats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i} className="bg-iron py-5 pr-4">
                <dd className="display text-[clamp(2.4rem,5vw,4rem)] text-volt">
                  {s.prefix}
                  <Counter to={s.value} suffix={s.suffix} />
                </dd>
                <dt className="tag mt-2 text-smoke">{s.label}</dt>
              </Reveal>
            ))}
          </dl>
          <p className="mt-6 text-xs text-smoke/70">Illustrative example. Individual results vary with consistency, sleep and nutrition.</p>
        </div>

        <Reveal className="mx-auto w-full max-w-[460px]">
          <BeforeAfter before={images.before} after={images.after} beforeLabel="Week 1" afterLabel="Week 16" />
          <p className="tag mt-4 text-center text-smoke">← Drag to compare →</p>
        </Reveal>
      </div>
    </section>
  );
}
