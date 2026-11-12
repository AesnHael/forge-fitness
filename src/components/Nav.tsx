import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState, type MouseEvent } from 'react';
import { navLinks, socials } from '../data';
import { lockScroll, scrollToTarget } from '../lib/scroll';
import { LogoMark, Wordmark } from './ui/Logo';

export function Nav({ ready }: { ready: boolean }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 700 && y > prev && !open);
  });

  useEffect(() => {
    lockScroll(open);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const els = navLinks.map((l) => document.querySelector(l.href)).filter((el): el is Element => !!el);
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)), {
      rootMargin: '-45% 0px -50% 0px',
    });
    els.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [ready]);

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    window.setTimeout(() => scrollToTarget(href), wasOpen ? 450 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={ready ? { y: hidden ? -100 : 0 } : { y: -100 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: ready && !scrolled ? 0.8 : 0 }}
        className={`fixed inset-x-0 top-0 z-[58] transition-colors duration-500 ${scrolled ? 'border-b border-line bg-coal/80 backdrop-blur-xl' : 'border-b border-transparent'}`}
      >
        <nav aria-label="Primary" className="container-x flex h-[72px] items-center justify-between">
          <a href="#top" onClick={(e) => go(e, '#top')} aria-label="Forge Fitness — back to top" className="relative z-[70] flex items-center gap-2.5">
            <LogoMark className="h-9 w-9 text-chalk" />
            <Wordmark />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  aria-current={active === l.href ? 'true' : undefined}
                  className={`relative block px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
                    active === l.href ? 'text-volt' : 'text-chalk/70 hover:text-chalk'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#book"
              onClick={(e) => go(e, '#book')}
              className="hidden items-center gap-2 bg-volt px-5 py-2.5 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-coal transition-shadow hover:shadow-[0_0_30px_-4px_rgba(212,255,58,0.7)] sm:inline-flex"
            >
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-coal" aria-hidden="true" />
              Free session
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative z-[70] grid h-11 w-11 place-items-center border border-line lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <motion.span className="absolute left-0 top-0 h-[2px] w-5 bg-chalk" animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} />
                <motion.span className="absolute bottom-0 left-0 h-[2px] bg-volt" animate={open ? { rotate: -45, y: -5, width: 20 } : { rotate: 0, y: 0, width: 12 }} />
              </span>
            </button>
          </div>
        </nav>
        <motion.div style={{ scaleX: scrollYProgress }} className="absolute bottom-[-1px] left-0 h-[2px] w-full origin-left bg-volt" aria-hidden="true" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="grid-bg fixed inset-0 z-[55] flex flex-col bg-coal lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container-x flex flex-1 flex-col justify-between pb-10 pt-28">
              <ul>
                {navLinks.map((l, i) => (
                  <li key={l.href} className="overflow-hidden border-b border-line">
                    <motion.a
                      href={l.href}
                      onClick={(e) => go(e, l.href)}
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '110%', transition: { duration: 0.3 } }}
                      transition={{ duration: 0.7, delay: 0.2 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      className="display flex items-baseline justify-between py-3 text-[3.2rem] text-chalk"
                    >
                      {l.label}
                      <span className="font-sans text-xs tabular-nums text-volt">0{i + 1}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-smoke">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} className="uppercase tracking-[0.16em] hover:text-volt">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
