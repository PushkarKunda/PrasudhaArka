/**
 * Generate modern-format image variants for ResponsivePicture usage.
 * Run: node scripts/optimize-images.mjs
 * (Requires sharp: npm i --no-save sharp)
 *
 * Output naming convention consumed by src/components/common/ResponsivePicture:
 *   public/assets/<name>-<width>.avif / .webp
 */
import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ASSETS = path.resolve('public/assets');

const JOBS = [
  { file: 'hero_solar.jpg', widths: [768, 1376] },   // desktop-only hero bg (>=769px)
  { file: 'logo_te.jpg', widths: [400] },            // nav/footer logo (displayed 38-80px)
  { file: 'logo_en.jpg', widths: [400] },
  { file: 'pra_te_v5.png', widths: [800] },          // h1 inline logo (~30-46px tall)
  { file: 'pra_en_v5.png', widths: [800] },
  { file: 'aquapzone_logo.jpg', widths: [400] },     // badges (28-36px tall)
];

const FORMATS = [
  ['avif', { quality: 55, effort: 4 }],
  ['webp', { quality: 72 }],
];

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

let totalOut = 0;
for (const { file, widths } of JOBS) {
  const src = path.join(ASSETS, file);
  try {
    await fs.access(src);
  } catch {
    console.warn(`skip (missing): ${file}`);
    continue;
  }
  for (const width of widths) {
    const stem = file.replace(/\.(png|jpe?g)$/i, '');
    for (const [format, options] of FORMATS) {
      const out = path.join(ASSETS, `${stem}-${width}.${format}`);
      await sharp(src)
        .resize({ width, withoutEnlargement: true })
        .toFormat(format, options)
        .toFile(out);
      const size = (await fs.stat(out)).size;
      totalOut += size;
      console.log(`${path.basename(out).padEnd(28)} ${kb(size)}`);
    }
  }
}
console.log(`\nTotal generated: ${kb(totalOut)}`);
