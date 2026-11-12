import { motion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

interface SplitWordsProps {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: (word: string, index: number) => string | undefined;
  delay?: number;
  stagger?: number;
  /** When provided, animation is controlled externally instead of on viewport entry. */
  play?: boolean;
  children?: ReactNode;
}

const word: Variants = {
  hidden: { y: '115%', rotate: 4 },
  show: { y: '0%', rotate: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
};

/** Reveals text word by word from behind a mask. */
export function SplitWords({
  text,
  as: Tag = 'span',
  className,
  wordClassName,
  delay = 0,
  stagger = 0.07,
  play,
}: SplitWordsProps) {
  const words = text.split(' ');
  const controlled = play !== undefined;
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        className="inline"
        variants={container}
        initial="hidden"
        {...(controlled
          ? { animate: play ? 'show' : 'hidden' }
          : { whileInView: 'show', viewport: { once: true, amount: 0.4 } })}
      >
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span variants={word} className={`inline-block will-change-transform ${wordClassName?.(w, i) ?? ''}`}>
              {w}
            </motion.span>
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
