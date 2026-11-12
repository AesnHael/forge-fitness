import { AnimatePresence, motion } from 'framer-motion';
import { CalendarCheck, Check, Clock, Loader2, Target } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import { goals, images } from '../data';
import { Reveal } from './ui/Reveal';
import { SectionTag } from './ui/SectionTag';

const TIMES = ['07:00', '08:00', '09:30', '12:00', '17:30', '18:30', '19:30'];

function nextDays(n: number) {
  const out: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) out.push(new Date(d)); // closed on Sundays
  }
  return out;
}

// Pseudo-random but stable "already booked" slots so the calendar looks alive.
const isBooked = (day: Date, i: number) => (day.getDate() * 7 + i * 3) % 5 === 0;

const encode = (data: Record<string, string>) =>
  Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

export function Booking() {
  const days = useMemo(() => nextDays(7), []);
  const [goal, setGoal] = useState('');
  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const dayLabel = day !== null ? days[day].toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }) : '';

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!goal) er.goal = 'Pick your main goal.';
    if (day === null || !time) er.slot = 'Choose a day and a time.';
    if (name.trim().length < 2) er.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) er.email = 'Please enter a valid email.';
    setErrors(er);
    if (Object.keys(er).length) return;
    const bot = (e.currentTarget.elements.namedItem('bot-field') as HTMLInputElement | null)?.value ?? '';
    setStatus('sending');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'free-session', 'bot-field': bot, goal, date: dayLabel, time, name, email, phone }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const chip = (on: boolean) =>
    `border px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${on ? 'border-volt bg-volt text-coal' : 'border-line text-chalk/80 hover:border-chalk/50'}`;
  const field = 'w-full border border-line bg-coal px-4 py-3.5 text-chalk placeholder:text-smoke/70 outline-none transition-colors focus:border-volt';

  return (
    <section id="book" className="relative overflow-hidden bg-coal py-24 sm:py-32">
      <img src={images.studio.sm} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-15" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-coal via-coal/80 to-coal" aria-hidden="true" />

      <div className="container-x relative">
        <Reveal>
          <SectionTag n="06">Free session</SectionTag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display max-w-4xl text-[clamp(3rem,7vw,6.5rem)]">
            Your first session is <span className="text-volt text-glow">on me.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glow flex min-h-[460px] flex-col items-start justify-center bg-iron p-8 sm:p-12"
                role="status"
              >
                <motion.span initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }} className="grid h-16 w-16 place-items-center bg-volt text-coal">
                  <Check className="h-8 w-8" aria-hidden="true" />
                </motion.span>
                <p className="display mt-8 text-6xl">You’re in.</p>
                <p className="mt-4 max-w-md text-chalk/75">
                  See you {dayLabel} at {time}. A confirmation and a short pre-session questionnaire are on their way to {email}.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                name="free-session"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                noValidate
                onSubmit={submit}
                exit={{ opacity: 0 }}
                className="space-y-10 border border-line bg-iron/90 p-6 backdrop-blur sm:p-10"
              >
                <input type="hidden" name="form-name" value="free-session" />
                <p className="hidden">
                  <label>
                    Leave empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <fieldset>
                  <legend className="tag mb-4 flex items-center gap-2 text-smoke">
                    <span className="text-volt">01</span> Main goal
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {goals.map((g) => (
                      <button key={g} type="button" aria-pressed={goal === g} onClick={() => setGoal(g)} className={chip(goal === g)}>
                        {g}
                      </button>
                    ))}
                  </div>
                  {errors.goal && !goal && <p className="mt-2 text-sm text-volt">{errors.goal}</p>}
                </fieldset>

                <fieldset>
                  <legend className="tag mb-4 flex items-center gap-2 text-smoke">
                    <span className="text-volt">02</span> Pick a day
                  </legend>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                    {days.map((d, i) => (
                      <button
                        key={d.toISOString()}
                        type="button"
                        aria-pressed={day === i}
                        onClick={() => {
                          setDay(i);
                          setTime('');
                        }}
                        className={`flex flex-col items-center border py-3 transition-all ${day === i ? 'border-volt bg-volt text-coal' : 'border-line hover:border-chalk/50'}`}
                      >
                        <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] opacity-70">{d.toLocaleDateString('en-GB', { weekday: 'short' })}</span>
                        <span className="display mt-1 text-3xl">{d.getDate()}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset disabled={day === null}>
                  <legend className="tag mb-4 flex items-center gap-2 text-smoke">
                    <span className="text-volt">03</span> Pick a time
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {TIMES.map((t, i) => {
                      const booked = day !== null && isBooked(days[day], i);
                      return (
                        <button
                          key={t}
                          type="button"
                          disabled={day === null || booked}
                          aria-pressed={time === t}
                          onClick={() => setTime(t)}
                          className={`${chip(time === t)} tabular-nums disabled:cursor-not-allowed disabled:border-line disabled:text-smoke/40 ${booked ? 'line-through' : ''}`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                  {day === null && <p className="mt-3 text-sm text-smoke">Choose a day first.</p>}
                  {errors.slot && (day === null || !time) && <p className="mt-2 text-sm text-volt">{errors.slot}</p>}
                </fieldset>

                <fieldset className="grid gap-3 sm:grid-cols-3">
                  <legend className="tag mb-4 flex items-center gap-2 text-smoke">
                    <span className="text-volt">04</span> Your details
                  </legend>
                  <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input id="name" name="name" placeholder="Name *" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} className={field} />
                    {errors.name && name.trim().length < 2 && <p className="mt-2 text-sm text-volt">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input id="email" name="email" type="email" placeholder="Email *" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} className={field} />
                    {errors.email && <p className="mt-2 text-sm text-volt">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">Phone (optional)</label>
                    <input id="phone" name="phone" type="tel" placeholder="Phone (optional)" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={field} />
                  </div>
                </fieldset>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-smoke">No payment needed. Cancel or reschedule anytime.</p>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center justify-center gap-3 bg-volt px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-coal transition-shadow [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)] hover:shadow-[0_0_40px_-4px_rgba(212,255,58,0.7)] disabled:opacity-60"
                  >
                    {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                    {status === 'sending' ? 'Booking…' : 'Book free session'}
                  </button>
                </div>
                {status === 'error' && (
                  <p role="alert" className="text-sm text-volt">
                    Something went wrong. Please try again in a moment.
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>

          {/* Live summary */}
          <aside className="h-fit border border-line bg-coal/80 p-6 backdrop-blur sm:p-8 lg:sticky lg:top-28" aria-live="polite">
            <p className="tag text-smoke">Your session</p>
            <p className="display mt-3 text-4xl">Free assessment</p>
            <p className="mt-1 text-sm text-smoke">45 min · Forge Studio, East London</p>
            <ul className="mt-8 space-y-4 border-t border-line pt-6 text-sm">
              <li className="flex items-center gap-3">
                <Target className="h-4 w-4 text-volt" aria-hidden="true" />
                <span className={goal ? '' : 'text-smoke'}>{goal || 'Goal not selected'}</span>
              </li>
              <li className="flex items-center gap-3">
                <CalendarCheck className="h-4 w-4 text-volt" aria-hidden="true" />
                <span className={day !== null ? '' : 'text-smoke'}>{dayLabel || 'Day not selected'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-volt" aria-hidden="true" />
                <span className={time ? '' : 'text-smoke'}>{time || 'Time not selected'}</span>
              </li>
            </ul>
            <div className="mt-8 flex items-baseline justify-between border-t border-line pt-6">
              <span className="text-sm text-smoke">Total</span>
              <span className="display text-4xl text-volt">$0</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
