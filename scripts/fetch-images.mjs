// Downloads the curated Unsplash photos, resizes them and converts to .webp.
// Usage: node scripts/fetch-images.mjs [rawDownloadDir]
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'src', 'assets', 'images');
const publicDir = path.join(root, 'public');
const rawDir = path.resolve(process.argv[2] ?? path.join(os.tmpdir(), 'forge-raw'));

// name -> [unsplash image id, full width]. Every image also gets an 800px "-sm" version.
const photos = {
  hero: ['1554344728-77cf90d9ed26', 2400],
  'hero-mobile': ['1605296867724-fa87a8ef53fd', 1400],
  coach: ['1574680088814-c9e8a10d8a4d', 1600],
  'p-strength': ['1541534741688-6078c6bfb5c5', 1400],
  'p-lean': ['1532384748853-8f54a8f476e2', 1400],
  'p-fight': ['1591504771094-a1ca4de142d7', 1400],
  'p-coaching': ['1758875569256-f37c438cac65', 1400],
  before: ['1754476241031-3a7c7675f95b', 1400],
  after: ['1754475172820-6053bbed3b25', 1400],
  'g-cable': ['1507398941214-572c25f4b1dc', 1400],
  'g-punch': ['1645458314292-af7e370a9b52', 1400],
  'g-squat': ['1574680178050-55c6a6a96e0a', 1400],
  'g-focus': ['1550345332-09e3ac987658', 1400],
  'g-pads': ['1517438322307-e67111335449', 1400],
  'g-plates': ['1672344048213-76b6e77304bd', 1400],
  'g-deadlift': ['1648542036561-e1d66a5ae2b1', 1400],
  'g-ropes': ['1548690312-e3b507d8c110', 1400],
  'g-curl': ['1641337221253-fdc7237f6b61', 1400],
  'g-kettlebell': ['1765302907822-33032f78eb2c', 1400],
  studio: ['1778828494354-9b717d36dc99', 2000],
};

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(rawDir, { recursive: true });
fs.mkdirSync(publicDir, { recursive: true });

async function download(id, file) {
  if (fs.existsSync(file)) return;
  const res = await fetch(`https://images.unsplash.com/photo-${id}?w=2600&q=90&fm=jpg`);
  if (!res.ok) throw new Error(`${id}: HTTP ${res.status}`);
  fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
}

const meta = {};
for (const [name, [id, width]] of Object.entries(photos)) {
  const raw = path.join(rawDir, `${name}.jpg`);
  await download(id, raw);
  const m = await sharp(raw).metadata();
  const out = path.join(outDir, `${name}.webp`);
  await sharp(raw).resize({ width, withoutEnlargement: true }).webp({ quality: 72, effort: 6 }).toFile(out);
  await sharp(raw).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 68, effort: 6 }).toFile(path.join(outDir, `${name}-sm.webp`));
  if (name === 'hero') {
    await sharp(raw).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(publicDir, 'og-image.jpg'));
  }
  meta[name] = { w: m.width, h: m.height };
  console.log(`${name.padEnd(13)} ${m.width}x${m.height} -> ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
}
fs.writeFileSync(path.join(outDir, 'sizes.json'), JSON.stringify(meta, null, 1));
console.log('Done. Raw files in', rawDir);
