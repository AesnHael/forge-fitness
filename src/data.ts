import { photo } from './lib/images';

export const navLinks = [
  { label: 'Programs', href: '#programs' },
  { label: 'Coach', href: '#coach' },
  { label: 'Results', href: '#results' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Book', href: '#book' },
];

export const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'TikTok', href: '#' },
];

export const images = {
  hero: photo('hero'),
  coach: photo('coach'),
  before: photo('before'),
  after: photo('after'),
  studio: photo('studio'),
};

export const heroStats = [
  { value: 320, suffix: '+', label: 'Clients coached' },
  { value: 12, suffix: ' yrs', label: 'Experience' },
  { value: 4.9, decimals: 1, suffix: '★', label: 'Average rating' },
];

export interface Program {
  id: string;
  title: string;
  tagline: string;
  level: string;
  weeks: number;
  perWeek: string;
  points: string[];
  image: ReturnType<typeof photo>;
}

export const programs: Program[] = [
  {
    id: 'strength',
    title: 'Strength Foundations',
    tagline: 'Squat, bench and deadlift with perfect form. Get strong, safely.',
    level: 'Beginner – Intermediate',
    weeks: 12,
    perWeek: '3× / week',
    points: ['Technique video reviews', 'Progressive overload plan', 'Mobility warm-ups'],
    image: photo('p-strength'),
  },
  {
    id: 'lean',
    title: 'Lean & Conditioned',
    tagline: 'Lose fat, keep muscle. Training plus simple, flexible nutrition.',
    level: 'All levels',
    weeks: 10,
    perWeek: '4× / week',
    points: ['Macro targets & meal ideas', 'Weekly check-ins', 'Step & sleep tracking'],
    image: photo('p-lean'),
  },
  {
    id: 'fight',
    title: 'Fight Fit',
    tagline: 'Boxing-based conditioning that builds speed, power and a huge engine.',
    level: 'Intermediate',
    weeks: 8,
    perWeek: '3× / week',
    points: ['Pad work & bag rounds', 'Footwork drills', 'Core & shoulder strength'],
    image: photo('p-fight'),
  },
  {
    id: 'coaching',
    title: '1:1 Personal Coaching',
    tagline: 'In-person sessions built entirely around you, your body and your schedule.',
    level: 'Any level',
    weeks: 0,
    perWeek: 'Flexible',
    points: ['Full assessment', 'Custom program', 'Direct chat with your coach'],
    image: photo('p-coaching'),
  },
];

export const gallery = ['g-cable', 'g-punch', 'g-squat', 'g-focus', 'g-pads', 'g-plates', 'g-deadlift', 'g-ropes', 'g-curl', 'g-kettlebell'].map((n) =>
  photo(n),
);

export const certifications = ['NASM Certified Personal Trainer', 'Precision Nutrition Level 1', 'Olympic Weightlifting Coach', 'First Aid & CPR'];

export const resultStats = [
  { value: 14, suffix: ' kg', label: 'Fat lost', prefix: '−' },
  { value: 40, suffix: '%', label: 'Strength gained', prefix: '+' },
  { value: 16, suffix: ' wks', label: 'Program length', prefix: '' },
];

export interface Plan {
  name: string;
  monthly: number;
  blurb: string;
  features: string[];
  popular?: boolean;
}

export const plans: Plan[] = [
  {
    name: 'Online',
    monthly: 149,
    blurb: 'A coach in your pocket, wherever you train.',
    features: ['Custom training program', 'App with video demos', 'Weekly check-in', 'Nutrition guidelines'],
  },
  {
    name: 'Hybrid',
    monthly: 299,
    blurb: 'The best of both: online plan + in-person sessions.',
    features: ['Everything in Online', '4 in-person sessions / month', 'Form review videos', 'Priority chat support'],
    popular: true,
  },
  {
    name: 'Elite 1:1',
    monthly: 549,
    blurb: 'Fully coached, every session, every rep.',
    features: ['Everything in Hybrid', '12 in-person sessions / month', 'Body composition scans', 'Personal meal plan'],
  },
];

export const testimonials = [
  { quote: 'Down 11 kg and my deadlift went from 60 to 130 kg. I actually look forward to Mondays now.', name: 'Ryan M.', meta: 'Strength Foundations' },
  { quote: 'The check-ins kept me honest. First program I didn’t quit after three weeks.', name: 'Chloe D.', meta: 'Lean & Conditioned' },
  { quote: 'Fight Fit is brutal in the best way. My cardio has never been this good.', name: 'Marcus T.', meta: 'Fight Fit' },
  { quote: 'Mia fixed my squat in one session. Two years of knee pain, gone.', name: 'Aisha K.', meta: '1:1 Coaching' },
  { quote: 'Clear plan, no fluff, real results. Worth every penny.', name: 'Tom W.', meta: 'Hybrid plan' },
  { quote: 'She adapts everything around my shifts. Training finally fits my life.', name: 'Sofia R.', meta: 'Online plan' },
];

export const goals = ['Build strength', 'Lose fat', 'Boxing fitness', 'Get back in shape', 'Something else'];

export const faqs = [
  { q: 'I’m a complete beginner. Is that okay?', a: 'Absolutely. Most clients start with zero experience. We begin with technique and build up at your pace.' },
  { q: 'Where do in-person sessions happen?', a: 'At the Forge studio in East London. Online clients can train at any gym or at home with basic equipment.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Plans are month-to-month. Quarterly plans are paid upfront and save you 15%.' },
  { q: 'What happens in the free session?', a: 'A 45-minute assessment: goals, movement screen, a short workout and a clear plan for your first month.' },
];
