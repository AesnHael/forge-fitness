import { animate, motionValue, useInView, useReducedMotion } from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import type { Photo } from '../lib/images';

interface Props {
  before: Photo;
  after: Photo;
  beforeLabel?: string;
  afterLabel?: string;
}

/** Drag (or use arrow keys) to compare two photos. */
export function BeforeAfter({ before, after, beforeLabel = 'Before', afterLabel = 'After' }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const inView = useInView(box, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  // A little "peek" so visitors understand it's interactive.
  useEffect(() => {
    if (!inView || reduce) return;
    const mv = motionValue(50);
    const unsub = mv.on('change', setPos);
    const seq = animate(mv, [50, 72, 28, 50], { duration: 2.4, ease: 'easeInOut', delay: 0.3 });
    return () => {
      seq.stop();
      unsub();
    };
  }, [inView, reduce]);

  const setFromX = useCallback((clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromX(e.clientX);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => dragging.current && setFromX(e.clientX);
  const onUp = () => (dragging.current = false);
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5));
    if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5));
    if (e.key === 'Home') setPos(0);
    if (e.key === 'End') setPos(100);
  };

  return (
    <div
      ref={box}
      className="relative aspect-[3/4] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden bg-iron"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <img src={before.sm} srcSet={`${before.sm} 800w, ${before.src} 1400w`} sizes="(min-width:1024px) 40vw, 90vw" alt={`${beforeLabel} photo`} className="absolute inset-0 h-full w-full object-cover grayscale" draggable={false} />
      <img
        src={after.sm}
        srcSet={`${after.sm} 800w, ${after.src} 1400w`}
        sizes="(min-width:1024px) 40vw, 90vw"
        alt={`${afterLabel} photo`}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        draggable={false}
      />
      <span className="tag absolute left-4 top-4 bg-coal/80 px-3 py-1.5 text-chalk backdrop-blur">{beforeLabel}</span>
      <span className="tag absolute right-4 top-4 bg-volt px-3 py-1.5 text-coal">{afterLabel}</span>

      <div className="pointer-events-none absolute inset-y-0 w-[2px] -translate-x-1/2 bg-volt shadow-[0_0_20px_rgba(212,255,58,0.8)]" style={{ left: `${pos}%` }}>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKey}
          className="pointer-events-auto absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-volt text-coal shadow-[0_0_30px_rgba(212,255,58,0.6)]"
        >
          <ChevronsLeftRight className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
