import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Award } from 'lucide-react';
import { useRef } from 'react';
import { certifications, gallery, images } from '../data';
import { Reveal } from './ui/Reveal';
import { SectionTag } from './ui/SectionTag';

export function Coach() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const reveal = useTransform(scrollYProgress, [0.05, 0.4], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);

  return (
    <section id="coach" className="relative bg-coal py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div ref={ref} className="relative">
          <motion.div style={reduce ? undefined : { clipPath: reveal }} className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
            <motion.img
              src={images.coach.src}
              srcSet={`${images.coach.sm} 800w, ${images.coach.src} 1600w`}
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt="Coach Mia Torres doing barbell curls"
              loading="lazy"
              style={reduce ? undefined : { y, scale: 1.2 }}
              className="h-full w-full object-cover object-[65%_center]"
            />
          </motion.div>
          <div className="glow absolute -bottom-6 left-6 bg-coal px-5 py-4 sm:left-auto sm:right-6">
            <p className="display text-4xl text-volt">12 yrs</p>
            <p className="tag mt-1 text-smoke">Coaching experience</p>
          </div>
        </div>

        <div>
          <Reveal>
            <SectionTag n="02">Your coach</SectionTag>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-[clamp(3rem,6.5vw,6rem)]">
              Hi, I’m <span className="text-volt">Mia.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-chalk/75">
            <p>
              Former national-level weightlifter turned coach. I’ve spent twelve years helping busy people get strong, lose fat and feel
              unstoppable — without living in the gym.
            </p>
            <p className="text-smoke">
              My approach is simple: master the basics, track what matters and show up consistently. I’ll handle the planning. You
              handle the reps.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {certifications.map((c) => (
                <li key={c} className="flex items-center gap-3 border border-line bg-iron px-4 py-3 text-sm">
                  <Award className="h-4 w-4 shrink-0 text-volt" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Training gallery strip */}
      <div className="mt-24 overflow-hidden" aria-label="Training moments">
        <div className="marquee-track flex w-max animate-marquee gap-4 [--marquee-duration:60s]">
          {[...gallery, ...gallery].map((g, i) => (
            <div key={i} className="h-56 w-80 shrink-0 overflow-hidden sm:h-64 sm:w-96">
              <img src={g.sm} alt="" loading="lazy" className="h-full w-full object-cover grayscale transition-all duration-500 hover:scale-105 hover:grayscale-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
