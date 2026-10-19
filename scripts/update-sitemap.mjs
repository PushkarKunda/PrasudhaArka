/**
 * Keeps public/sitemap.xml <lastmod> fresh: runs automatically via the npm
 * "prebuild" hook, so every deploy publishes an accurate lastmod date.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';

const file = path.resolve('public/sitemap.xml');
const today = new Date().toISOString().slice(0, 10);

const xml = await fs.readFile(file, 'utf8');
const updated = xml.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${today}</lastmod>`);

if (updated !== xml) {
  await fs.writeFile(file, updated, 'utf8');
  console.log(`sitemap.xml lastmod -> ${today}`);
}
