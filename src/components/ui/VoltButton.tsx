import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { MouseEvent, ReactNode } from 'react';
import { scrollToTarget } from '../../lib/scroll';

interface VoltButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'volt' | 'ghost';
  className?: string;
}

/** Sharp-edged CTA: leans to the pointer, the arrow shoots through on hover. */
export function VoltButton({ href, children, variant = 'volt', className = '' }: VoltButtonProps) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.2);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      scrollToTarget(href);
    }
  };

  const styles =
    variant === 'volt'
      ? 'bg-volt text-coal hover:shadow-[0_0_40px_-4px_rgba(212,255,58,0.7)]'
      : 'border border-chalk/25 text-chalk hover:border-volt hover:text-volt';

  return (
    <motion.a
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`group relative inline-flex items-center gap-3 overflow-hidden px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] transition-[box-shadow,color,border-color] duration-300 [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)] ${styles} ${className}`}
    >
      <span>{children}</span>
      <span className="relative block h-4 w-4 overflow-hidden">
        <ArrowRight aria-hidden="true" className="absolute inset-0 h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-6" />
        <ArrowRight aria-hidden="true" className="absolute inset-0 h-4 w-4 -translate-x-6 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0" />
      </span>
    </motion.a>
  );
}
