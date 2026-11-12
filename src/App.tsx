import { AnimatePresence, MotionConfig } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { Booking } from './components/Booking';
import { Coach } from './components/Coach';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { Preloader } from './components/Preloader';
import { Pricing } from './components/Pricing';
import { Programs } from './components/Programs';
import { Results } from './components/Results';
import { Testimonials } from './components/Testimonials';
import { Ticker } from './components/Ticker';
import { initSmoothScroll, lockScroll, ScrollTrigger } from './lib/scroll';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    return initSmoothScroll();
  }, []);

  useEffect(() => {
    lockScroll(loading);
  }, [loading]);

  const handleDone = useCallback(() => setLoading(false), []);

  useEffect(() => {
    if (loading) return;
    const t = window.setTimeout(() => setReady(true), 100);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    return () => window.clearTimeout(t);
  }, [loading]);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="fixed left-4 top-4 z-[95] -translate-y-24 bg-volt px-5 py-3 text-sm font-bold text-coal transition-transform focus:translate-y-0">
        Skip to content
      </a>
      <AnimatePresence>{loading && <Preloader key="preloader" onDone={handleDone} />}</AnimatePresence>
      <Nav ready={ready} />
      <main id="main">
        <Hero ready={ready} />
        <Ticker />
        <Programs />
        <Coach />
        <Results />
        <Pricing />
        <Testimonials />
        <Booking />
        <Faq />
      </main>
      <Footer />
      <div className="noise" aria-hidden="true" />
    </MotionConfig>
  );
}
