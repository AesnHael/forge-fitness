import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { faqs } from '../data';
import { Reveal } from './ui/Reveal';
import { SectionTag } from './ui/SectionTag';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-t border-line bg-coal py-24 sm:py-32">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <Reveal>
          <SectionTag n="07">FAQ</SectionTag>
          <h2 className="display text-[clamp(3rem,6vw,5.5rem)]">
            Got <span className="text-volt">questions?</span>
          </h2>
        </Reveal>
        <ul className="border-t border-line">
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <li key={f.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(on ? null : i)}
                    aria-expanded={on}
                    aria-controls={`faq-${i}`}
                    className={`flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold transition-colors sm:text-xl ${on ? 'text-volt' : 'hover:text-volt'}`}
                  >
                    {f.q}
                    <motion.span animate={{ rotate: on ? 135 : 0 }} transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }} className={`grid h-10 w-10 shrink-0 place-items-center border ${on ? 'border-volt bg-volt text-coal' : 'border-line'}`}>
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 leading-relaxed text-smoke">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
