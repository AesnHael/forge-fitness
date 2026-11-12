import sizes from '../assets/images/sizes.json';

const files = import.meta.glob<string>('../assets/images/*.webp', { eager: true, import: 'default' });

export interface Photo {
  src: string;
  sm: string;
  w: number;
  h: number;
}

const byName = new Map<string, string>();
for (const [p, url] of Object.entries(files)) {
  byName.set(p.split('/').pop()!.replace('.webp', ''), url);
}

const dims = sizes as Record<string, { w: number; h: number }>;

/** Returns the full and 800px versions of a downloaded photo plus its aspect. */
export function photo(name: string): Photo {
  const src = byName.get(name);
  const sm = byName.get(`${name}-sm`);
  if (!src || !sm) throw new Error(`Missing image: ${name}`);
  const d = dims[name] ?? { w: 3, h: 2 };
  return { src, sm, w: d.w, h: d.h };
}
