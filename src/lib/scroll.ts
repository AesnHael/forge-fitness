import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Boots Lenis smooth scrolling and wires it into GSAP's ticker. Returns a cleanup fn. */
export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => undefined;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToTarget(target: string | number) {
  const offset = typeof target === 'string' && target !== '#top' ? -16 : 0;
  if (lenis) {
    lenis.scrollTo(target === '#top' ? 0 : target, { offset, duration: 1.4 });
    return;
  }
  if (typeof target === 'number' || target === '#top') {
    window.scrollTo({ top: typeof target === 'number' ? target : 0 });
    return;
  }
  document.querySelector(target)?.scrollIntoView();
}

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

export { gsap, ScrollTrigger };
