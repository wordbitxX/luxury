import fs from 'node:fs/promises';
import sharp from 'sharp';

const base = process.argv[2];
if (!base || !/^https?:\/\//.test(base)) {
  console.error('Usage: node scripts/check-deployed-images.mjs https://your-domain.example');
  process.exit(1);
}
const pages = ['/', '/menu', '/order', '/story', '/chef', '/experience', '/private-dining', '/journal', '/case-study'];
const tests = new Map();
const failures = [];
const results = [];
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'");

for (const pathname of pages) {
  try {
    const response = await fetch(new URL(pathname, base), { signal: AbortSignal.timeout(45000) });
    if (!response.ok) throw new Error(`Page returned ${response.status}`);
    const html = await response.text();
    const tags = html.match(/<img\b[^>]*>/gi) ?? [];
    if (!tags.length) throw new Error('No image elements in rendered page');
    for (const tag of tags) {
      const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
      if (!src || src.startsWith('data:')) continue;
      const image = new URL(decode(src), base);
      const original = image.searchParams.get('url') || image.toString();
      // Validate one responsive rendition per source, not a 3840px fallback
      // which a normal mobile/desktop browser would usually never request.
      if (image.pathname === '/_next/image') image.searchParams.set('w', '640');
      tests.set(original, { url: image.toString(), source: original, page: pathname });
    }
    console.log(`Page OK: ${pathname} (${tags.length} images)`);
  } catch (error) {
    failures.push({ page: pathname, error: error.message });
  }
}

const manifest = await fs.readFile(new URL('../src/lib/image-sources.ts', import.meta.url), 'utf8');
for (const match of manifest.matchAll(/"(\/images\/[^"\n]+\.webp)":\s*(\d+)/g)) {
  tests.set(`legacy:${match[1]}`, { url: new URL(match[1], base).toString(), source: match[1], page: 'legacy asset compatibility' });
}

const entries = [...tests.values()];
let cursor = 0;
await Promise.all(Array.from({ length: 3 }, async () => {
  while (cursor < entries.length) {
    const entry = entries[cursor++];
    try {
      const response = await fetch(entry.url, { signal: AbortSignal.timeout(45000) });
      const type = response.headers.get('content-type') ?? '';
      const buffer = Buffer.from(await response.arrayBuffer());
      if (!response.ok || !type.startsWith('image/')) {
        throw new Error(`HTTP ${response.status} ${type}: ${buffer.toString().slice(0, 100)}`);
      }
      const metadata = await sharp(buffer).metadata();
      if (!metadata.width || !metadata.height) throw new Error('Image has no decodable dimensions');
      results.push({ ...entry, status: response.status, type, bytes: buffer.length, width: metadata.width, height: metadata.height });
    } catch (error) {
      failures.push({ ...entry, error: error.message });
      console.error('IMAGE FAILED:', entry.source, error.message);
    }
  }
}));
await fs.mkdir('artifacts', { recursive: true });
await fs.writeFile('artifacts/image-http-report.json', JSON.stringify({ base, passed: results.length, failures, images: results }, null, 2));
console.log(`\n${results.length} images decoded successfully; ${failures.length} failures.`);
if (failures.length) process.exitCode = 1;
