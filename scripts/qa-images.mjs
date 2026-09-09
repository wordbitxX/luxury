import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base = process.argv[2] || 'http://127.0.0.1:3000';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const checks = [];
const pageErrors = [];
await fs.mkdir('artifacts', { recursive: true });

async function waitForPhotos(page) {
  await page.evaluate(() => document.querySelectorAll('img').forEach(img => img.loading = 'eager'));
  await page.waitForFunction(() => [...document.images].every(img => img.complete && img.naturalWidth > 0), undefined, { timeout: 90000 });
  return page.locator('img').count();
}
async function check(name, predicate) {
  assert.ok(predicate, name);
  checks.push(name);
  console.log('PASS:', name);
}

try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 960 }, isMobile: width === 390, hasTouch: width === 390 });
    const page = await context.newPage();
    page.on('pageerror', error => pageErrors.push(error.message));
    for (const pathname of ['/', '/menu', '/order']) {
      const response = await page.goto(new URL(pathname, base).toString(), { waitUntil: 'domcontentloaded' });
      await check(`${pathname} returns 200 at ${width}px`, response.status() === 200);
      const count = await waitForPhotos(page);
      await check(`${count} images rendered at ${width}px on ${pathname}`, count > 0);
      await check(`No image-related horizontal overflow on ${pathname} at ${width}px`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      if (pathname === '/') {
        await page.locator('#top').screenshot({ path: `artifacts/hostinger-hero-${width}.png` });
        for (let i = 0; i < 3; i++) {
          await waitForPhotos(page);
          await check(`Signature photo ${i + 1} loaded at ${width}px`, await page.locator('#signature img').first().evaluate(img => img.naturalWidth > 0));
          if (i < 2) await page.getByRole('button', { name: 'Next signature dish', exact: true }).click();
        }
        await page.locator('#signature').screenshot({ path: `artifacts/hostinger-signature-${width}.png` });
        await page.locator('#gallery').getByRole('button', { name: /View larger:/ }).first().click();
        const viewer = page.getByRole('dialog', { name: /^Photograph:/ });
        await viewer.waitFor();
        await waitForPhotos(page);
        await check(`Gallery lightbox photo loaded at ${width}px`, await viewer.locator('img').evaluate(img => img.naturalWidth > 0));
        await page.getByRole('button', { name: 'Close viewer', exact: true }).click();
      }
      if (pathname === '/menu') {
        await page.locator('[data-dish-id]').first().getByRole('button').click();
        const detail = page.getByRole('dialog', { name: /details$/ });
        await detail.waitFor();
        await waitForPhotos(page);
        await check(`Dish detail photo loaded at ${width}px`, await detail.locator('img').evaluate(img => img.naturalWidth > 0));
        await detail.getByRole('button', { name: 'Add to order', exact: true }).click();
        const cart = page.getByRole('dialog', { name: 'Your order', exact: true });
        await cart.waitFor();
        await waitForPhotos(page);
        await check(`Order bag photo loaded at ${width}px`, await cart.locator('img').first().evaluate(img => img.naturalWidth > 0));
        await cart.getByRole('button', { name: 'Close bag', exact: true }).click();
      }
    }
    await context.close();
  }

  // Reproduce an optimiser outage without modifying the live server. Image
  // requests fail locally in this test context; direct originals must recover.
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await context.route('**/_next/image?**', route => route.fulfill({ status: 503, contentType: 'text/plain', body: 'Simulated image optimiser outage' }));
  await context.route('**/images/*.webp', route => route.fulfill({ status: 404, contentType: 'text/plain', body: 'Simulated missing local assets' }));
  const page = await context.newPage();
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  const count = await waitForPhotos(page);
  const recovered = await page.locator('img[data-image-recovery="direct"]').count();
  await check('Photos remain visible during an image optimiser outage', recovered === count && count > 0);
  await check('Recovery uses the original trusted photo sources', await page.locator('img').evaluateAll(images => images.every(img => new URL(img.currentSrc).hostname === 'images.pexels.com')));
  await page.locator('#top').screenshot({ path: 'artifacts/hostinger-fallback-hero.png' });
  await context.close();
  await check('No uncaught browser JavaScript errors', pageErrors.length === 0);
  await fs.writeFile('artifacts/image-browser-report.json', JSON.stringify({ base, passed: checks.length, checks, pageErrors }, null, 2));
  console.log(`Verified ${checks.length} image and layout assertions.`);
} catch (error) {
  await fs.writeFile('artifacts/image-browser-report.json', JSON.stringify({ base, checks, pageErrors, error: error.message }, null, 2));
  throw error;
} finally {
  await browser.close();
}
