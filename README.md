# Forge Fitness — Personal Trainer Website

A dark, neon-accented one-page website for a (fictional) personal trainer.
Live: https://forge-fitness-coach.netlify.app

**Stack:** Vite, React 19, TypeScript, Tailwind CSS 4, Framer Motion, GSAP ScrollTrigger, Lenis.

## Features

- Split-panel preloader, animated hero headline, live "next free slot" badge, scroll progress bar
- Programs section that pins and scrolls sideways on desktop (GSAP ScrollTrigger), grid on mobile
- Coach section with clip-path reveal and an infinite training-photo strip
- Draggable before/after slider (mouse, touch and keyboard, with an intro "peek" animation)
- Pricing with a monthly / quarterly toggle and animated price change
- Two-row reviews marquee, FAQ accordion
- Interactive booking: goal chips, next 7 days, time slots (some shown as booked), live summary card, validation and Netlify Forms submission
- Fully responsive, respects `prefers-reduced-motion`, semantic HTML and ARIA

## Run locally

```bash
npm install
npm run dev
```

## Editing content

- **Texts, programs, prices, reviews, FAQ:** `src/data.ts`
- **Time slots and opening days:** top of `src/components/Booking.tsx`
- **Photos:** add an Unsplash ID in `scripts/fetch-images.mjs`, run `npm run images`
- **Colours and fonts:** `src/index.css` (`@theme`) and `index.html`

Photo credits: see [CREDITS.md](CREDITS.md).
