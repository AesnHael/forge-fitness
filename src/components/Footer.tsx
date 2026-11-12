import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useRef, type MouseEvent } from 'react';
import { navLinks, socials } from '../data';
import { scrollToTarget } from '../lib/scroll';
import { LogoMark } from './ui/Logo';
import { VoltButton } from './ui/VoltButton';

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['12%', '0%']);
  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToTarget(href);
  };

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line bg-iron pt-20 sm:pt-28">
      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="display max-w-3xl text-[clamp(2.8rem,6vw,5.5rem)]">
            Ready when <span className="text-volt">you are.</span>
          </p>
          <VoltButton href="#book">Book a free session</VoltButton>
        </div>

        <div className="mt-20 grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <LogoMark className="h-10 w-10 text-chalk" />
            <p className="mt-5 max-w-xs text-sm text-smoke">Personal training and online coaching for people who want results that last.</p>
          </div>
          <nav aria-label="Footer">
            <p className="tag mb-5 text-smoke">Explore</p>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => go(e, l.href)} className="text-chalk/80 hover:text-volt">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="tag mb-5 text-smoke">Studio</p>
            <p className="text-chalk/80">Forge Studio, East London</p>
            <p className="mt-1 text-chalk/80">Mon–Sat · 6:30–21:00</p>
          </div>
          <div>
            <p className="tag mb-5 text-smoke">Follow</p>
            <ul className="space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="text-chalk/80 hover:text-volt">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <motion.p style={{ x }} aria-hidden="true" className="display outline-text mt-16 select-none whitespace-nowrap text-[26vw] leading-[0.8] opacity-40">
        Forge Fitness
      </motion.p>

      <div className="container-x flex flex-col gap-4 border-t border-line py-6 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Forge Fitness. A fictional brand — portfolio demo. Photos via Unsplash.</p>
        <a href="#top" onClick={(e) => go(e, '#top')} className="inline-flex items-center gap-2 uppercase tracking-[0.16em] hover:text-volt">
          Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
