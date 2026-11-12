import { animate, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LogoMark } from './ui/Logo';

/** Loading bar fills like a rep counter, then the panels split open. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduce) {
      const t = window.setTimeout(onDone, 150);
      return () => window.clearTimeout(t);
    }
    const c = animate(0, 100, {
      duration: 1.4,
      ease: [0.7, 0, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => window.setTimeout(onDone, 200),
    });
    return () => c.stop();
  }, [onDone, reduce]);

  return (
    <motion.div className="fixed inset-0 z-[100] flex" aria-hidden="true" exit={{ pointerEvents: 'none' }}>
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="h-full w-1/2 bg-iron"
          exit={{ y: i === 0 ? '-100%' : '100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: i * 0.05 } }}
        />
      ))}
      <motion.div exit={{ opacity: 0, transition: { duration: 0.25 } }} className="absolute inset-0 flex flex-col items-center justify-center gap-8">
        <LogoMark className="h-16 w-16 text-chalk" />
        <div className="w-56">
          <div className="h-[3px] w-full bg-line">
            <div className="h-full bg-volt" style={{ width: `${n}%` }} />
          </div>
          <div className="mt-3 flex justify-between text-[0.7rem] font-bold uppercase tracking-[0.25em] text-smoke">
            <span>Warming up</span>
            <span className="tabular-nums text-volt">{n}%</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
