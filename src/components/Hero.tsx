import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { heroStats, images } from '../data';
import { Counter } from './ui/Counter';
import { VoltButton } from './ui/VoltButton';

const line = {
  hidden: { y: '105%' },
  show: (i: number) => ({ y: '0%', transition: { duration: 1, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const } }),
};

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const lines = [
    { text: 'Stronger', cls: '' },
    { text: 'every', cls: 'outline-text' },
    { text: 'week.', cls: 'text-volt text-glow' },
  ];

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-coal">
      <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { scale }}>
        <motion.img
          src={images.hero.src}
          srcSet={`${images.hero.sm} 800w, ${images.hero.src} 2400w`}
          sizes="100vw"
          alt="Athlete training with cables in a dark gym under a single spotlight"
          className="h-full w-full object-cover object-[60%_center]"
          initial={{ opacity: 0, filter: 'brightness(0.3)' }}
          animate={ready ? { opacity: 1, filter: 'brightness(1)' } : {}}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-coal/95 via-coal/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-coal/50" />
      </motion.div>

      <motion.div style={reduce ? undefined : { y, opacity: fade }} className="container-x w-full pb-10 pt-28 sm:pb-14">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={ready ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="tag mb-6 flex items-center gap-3 text-smoke"
        >
          <span className="h-[2px] w-10 bg-volt" />
          Personal trainer — East London &amp; online
        </motion.p>

        <h1 className="display text-[clamp(4rem,10.5vw,9.5rem)]" aria-label="Stronger every week.">
          {lines.map((l, i) => (
            <span key={l.text} className="block overflow-hidden pb-[0.04em]" aria-hidden="true">
              <motion.span className={`block ${l.cls}`} custom={i} variants={line} initial="hidden" animate={ready ? 'show' : 'hidden'}>
                {l.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <div className="max-w-lg">
            <p className="text-lg leading-relaxed text-chalk/75">
              Science-based training and coaching that fits real life. No fads, no guesswork — just a clear plan and a coach who keeps
              you on it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <VoltButton href="#book">Book a free session</VoltButton>
              <VoltButton href="#programs" variant="ghost">
                See programs
              </VoltButton>
            </div>
          </div>

          <dl className="grid grid-cols-3 gap-px bg-line">
            {heroStats.map((s) => (
              <div key={s.label} className="bg-coal/80 px-4 py-4 backdrop-blur sm:px-7">
                <dd className="display whitespace-nowrap text-[1.9rem] text-chalk sm:text-5xl">
                  <Counter to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
                </dd>
                <dt className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-smoke">{s.label}</dt>
              </div>
            ))}
          </dl>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={ready ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="glow absolute right-[4vw] top-28 hidden items-center gap-3 bg-coal/70 px-4 py-3 backdrop-blur md:flex"
      >
        <span className="pulse-dot h-2 w-2 rounded-full bg-volt" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-chalk/80">
          Next free slot: <span className="text-volt">Tomorrow 7:00</span>
        </span>
      </motion.div>
    </section>
  );
}
