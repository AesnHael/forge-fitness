import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { plans } from '../data';
import { Reveal } from './ui/Reveal';
import { SectionTag } from './ui/SectionTag';
import { VoltButton } from './ui/VoltButton';

export function Pricing() {
  const [quarterly, setQuarterly] = useState(false);
  const price = (m: number) => (quarterly ? Math.round(m * 0.85) : m);

  return (
    <section id="pricing" className="relative overflow-hidden bg-coal py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-40 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-volt/10 blur-[140px]" aria-hidden="true" />
      <div className="container-x relative">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <SectionTag n="04">Pricing</SectionTag>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display text-[clamp(3rem,7vw,6.5rem)]">
                Invest in <span className="text-volt">you.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div role="radiogroup" aria-label="Billing period" className="inline-flex border border-line p-1">
              {[
                { label: 'Monthly', value: false },
                { label: 'Quarterly −15%', value: true },
              ].map((o) => (
                <button
                  key={o.label}
                  type="button"
                  role="radio"
                  aria-checked={quarterly === o.value}
                  onClick={() => setQuarterly(o.value)}
                  className={`relative px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition-colors ${quarterly === o.value ? 'text-coal' : 'text-smoke hover:text-chalk'}`}
                >
                  {quarterly === o.value && <motion.span layoutId="billing" className="absolute inset-0 bg-volt" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  <span className="relative">{o.label}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col p-8 sm:p-10 ${p.popular ? 'glow bg-steel lg:-translate-y-4' : 'border border-line bg-iron'}`}
            >
              {p.popular && <span className="tag absolute -top-3 left-8 bg-volt px-3 py-1.5 text-coal">Most popular</span>}
              <h3 className="display text-4xl">{p.name}</h3>
              <p className="mt-2 text-sm text-smoke">{p.blurb}</p>
              <div className="mt-8 flex items-end gap-2">
                <span className="display text-3xl text-smoke">$</span>
                <span className="relative h-[4.5rem] overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={price(p.monthly)}
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      exit={{ y: '-100%', opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                      className={`display block text-[4.5rem] ${p.popular ? 'text-volt' : ''}`}
                    >
                      {price(p.monthly)}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="mb-2 text-sm text-smoke">/ month</span>
              </div>
              <p className="h-5 text-xs text-smoke">{quarterly ? `Billed $${price(p.monthly) * 3} every 3 months` : 'Cancel anytime'}</p>
              <ul className="mt-8 space-y-3 border-t border-line pt-8 text-[0.95rem]">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-volt" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <VoltButton href="#book" variant={p.popular ? 'volt' : 'ghost'} className="w-full justify-between">
                  Start {p.name}
                </VoltButton>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
