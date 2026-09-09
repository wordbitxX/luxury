import 'dotenv/config';
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base = process.argv[2] || 'http://127.0.0.1:3000';
const email = `qa-${Date.now()}@wordbitx-test.example`;
await fs.mkdir('artifacts', { recursive: true });
await fs.writeFile('artifacts/qa-records.json', JSON.stringify({ email }));
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const errors = [];
const results = [];
const test = (name, pass = true) => { assert.ok(pass, name); results.push(name); console.log('PASS:', name); };
const observe = page => page.on('pageerror', error => errors.push(error.message));
async function settleImages(page) {
  await page.evaluate(async () => {
    document.querySelectorAll('img').forEach(i => i.loading = 'eager');
    await Promise.race([Promise.all([...document.images].map(i => i.decode().catch(() => {}))), new Promise(r => setTimeout(r, 16000))]);
    await document.fonts.ready;
  });
}
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 980 } });
  const page = await context.newPage(); observe(page);
  const response = await page.goto(base, { waitUntil: 'networkidle' });
  test('Homepage responds successfully', response.status() === 200);
  test('Food gallery with filters present', await page.locator('#gallery').count() === 1 && (await page.locator('body').innerText()).includes('From the Fire'));
  test('WordbitX showcase and footer credits visible', await page.locator('#built-by-wordbitx').count() === 1 && await page.locator('footer a[href="https://www.wordbitxtech.com/"]').count() > 0);
  test('Primary navigation is focused', await page.getByRole('navigation', { name: 'Primary', exact: true }).getByRole('link').allTextContents().then(t => JSON.stringify(t) === JSON.stringify(['Menu', 'Experience', 'Private Dining', 'Order Online', 'Find Us'])));
  test('Secondary editorial pages remain linked', await page.locator('footer a[href="/story"], footer a[href="/chef"], footer a[href="/journal"]').count() === 3);
  await page.getByRole('button', { name: 'Next signature dish', exact: true }).click();
  test('Signature selector updates the dish', (await page.locator('#signature h3').innerText()).includes('Wild mushroom'));
  await page.getByRole('button', { name: 'Previous signature dish', exact: true }).click();
  await settleImages(page);
  await page.locator('#signature').screenshot({ path: 'artifacts/signature-desktop.png' });
  await page.locator('#built-by-wordbitx').screenshot({ path: 'artifacts/wordbitx-desktop.png' });
  await page.locator('footer').screenshot({ path: 'artifacts/footer-desktop.png' });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: 'artifacts/home-desktop.png', fullPage: true });

  await page.locator('#signature').getByRole('button', { name: 'Discover this dish', exact: true }).click();
  let detail = page.getByRole('dialog', { name: /Charred Lamb Rack/ });
  await detail.waitFor({ state: 'visible' });
  await detail.getByRole('button', { name: 'Increase quantity', exact: true }).click();
  await detail.getByRole('textbox', { name: 'Special instructions', exact: true }).fill('QA demo only');
  await detail.getByRole('button', { name: 'Add to order', exact: true }).click();
  const cart = page.getByRole('dialog', { name: 'Your order', exact: true });
  await cart.waitFor({ state: 'visible' });
  test('Signature dish opens the order bag', (await cart.innerText()).includes('Charred Lamb Rack'));
  await cart.getByRole('button', { name: 'Continue to checkout' }).click();
  await cart.getByRole('radio', { name: /Pickup/i }).click();
  await cart.getByRole('button', { name: 'Continue', exact: true }).click();
  await cart.getByRole('textbox', { name: 'Full name', exact: true }).fill('WordbitX QA');
  await cart.getByRole('textbox', { name: 'Phone', exact: true }).fill('+923001234567');
  await cart.getByRole('textbox', { name: 'Email', exact: true }).fill(email);
  await cart.getByRole('button', { name: 'Review order', exact: true }).click();
  const orderResponse = page.waitForResponse(r => r.url().endsWith('/api/order') && r.request().method() === 'POST');
  await cart.getByRole('button', { name: 'Confirm order', exact: true }).click();
  const order = await (await orderResponse).json();
  test('Order persists through the API', order.ok && order.ref);
  await cart.getByText('Thank you.', { exact: true }).waitFor();
  await page.waitForTimeout(400);
  test('Order success state is not reset after clearing bag', await cart.getByText('Thank you.', { exact: true }).isVisible());
  await cart.getByRole('button', { name: 'Close bag', exact: true }).click();

  await page.goto(base + '/menu', { waitUntil: 'networkidle' });
  test('Default collection contains exactly 40 distinct dishes', await page.locator('[data-dish-id]').count() === 40);
  test('40 menu IDs are unique', await page.locator('[data-dish-id]').evaluateAll(items => new Set(items.map(i => i.dataset.dishId)).size === 40));
  await page.getByRole('button', { name: 'Vegetarian', exact: true }).click();
  test('Dietary filter narrows menu', await page.locator('[data-dish-id]').count() > 0 && await page.locator('[data-dish-id]').count() < 40);
  await page.getByRole('button', { name: 'All preferences', exact: true }).click();
  await page.getByRole('searchbox', { name: 'Search the menu', exact: true }).fill('pavlova');
  test('Menu search finds matching dish', await page.locator('[data-dish-id]').count() === 1);
  await page.getByRole('button', { name: 'Clear search', exact: true }).click();
  await page.getByRole('navigation', { name: 'Menu categories', exact: true }).getByRole('button', { name: /Seafood/ }).click();
  test('Category filtering works', await page.locator('[data-dish-id]').count() === 4);
  await page.getByRole('navigation', { name: 'Menu categories', exact: true }).getByRole('button', { name: /seasonal forty/ }).click();

  await page.goto(base + '/reserve', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.locator('button:not([disabled])').filter({ hasText: /^\d{2}:\d{2}$/ }).first().click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('textbox', { name: 'Full name', exact: true }).fill('WordbitX QA');
  await page.getByRole('textbox', { name: 'Phone', exact: true }).fill('+923001234567');
  await page.getByRole('textbox', { name: 'Email', exact: true }).fill(email);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  const reservationResponse = page.waitForResponse(r => r.url().endsWith('/api/reserve') && r.request().method() === 'POST');
  await page.getByRole('button', { name: 'Confirm reservation', exact: true }).click();
  const reservation = await (await reservationResponse).json();
  test('Reservation persists through the API', reservation.ok && reservation.ref);
  await page.getByText('Reservation Request Received', { exact: true }).waitFor();

  await page.goto(base + '/private-dining#plan-your-evening', { waitUntil: 'networkidle' });
  const enquiry = page.locator('form').filter({ has: page.getByRole('button', { name: 'Send enquiry' }) });
  await enquiry.getByRole('textbox', { name: 'Name', exact: true }).fill('WordbitX QA');
  await enquiry.getByRole('textbox', { name: 'Email', exact: true }).fill(email);
  await enquiry.getByRole('textbox', { name: 'Phone', exact: true }).fill('+923001234567');
  const enquiryResponse = page.waitForResponse(r => r.url().endsWith('/api/enquiry') && r.request().method() === 'POST');
  await enquiry.getByRole('button', { name: 'Send enquiry' }).click();
  test('Private dining enquiry persists', (await (await enquiryResponse).json()).ok);

  await page.goto(base + '/admin/login', { waitUntil: 'networkidle' });
  await page.getByRole('textbox', { name: 'Password', exact: true }).count().catch(() => 0);
  await page.getByLabel('Password', { exact: true }).fill('not-the-password');
  await page.getByRole('button', { name: 'Enter the dashboard' }).click();
  await page.getByText('Incorrect password.', { exact: true }).waitFor();
  await page.getByLabel('Password', { exact: true }).fill(process.env.ADMIN_PASSWORD || 'admin');
  await page.getByRole('button', { name: 'Enter the dashboard' }).click();
  await page.waitForURL('**/admin');
  await page.getByRole('heading', { name: 'Good evening, Chef.' }).waitFor();
  test('Admin login works without redirect loop', new URL(page.url()).pathname === '/admin');
  test('Dashboard contains the submitted reservation and order', await page.getByText(reservation.ref, { exact: true }).count() > 0 && await page.getByText(order.ref, { exact: true }).count() > 0);
  await context.close();

  for (const width of [1024, 768, 390, 360]) {
    const ctx = await browser.newContext({ viewport: { width, height: width < 600 ? 844 : 960 }, isMobile: width < 600, hasTouch: width < 600 });
    const p = await ctx.newPage(); observe(p);
    await p.goto(base, { waitUntil: 'networkidle' });
    test(`No horizontal overflow on home at ${width}px`, await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));
    if (width === 390) {
      await settleImages(p);
      await p.locator('#signature').screenshot({ path: 'artifacts/signature-mobile.png' });
      await p.locator('#built-by-wordbitx').screenshot({ path: 'artifacts/wordbitx-mobile.png' });
      await p.screenshot({ path: 'artifacts/home-mobile.png', fullPage: true });
      await p.getByRole('button', { name: 'Open navigation', exact: true }).click();
      const mobile = p.getByRole('dialog', { name: 'Site navigation', exact: true });
      await mobile.waitFor();
      test('Mobile menu is usable', await mobile.getByRole('link', { name: 'Order Online', exact: true }).isVisible());
      await mobile.getByRole('button', { name: 'Close navigation', exact: true }).click();
    }
    await p.goto(base + '/menu', { waitUntil: 'networkidle' });
    test(`40 dishes on menu at ${width}px`, await p.locator('[data-dish-id]').count() === 40);
    test(`No menu overflow at ${width}px`, await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));
    if (width === 390) {
      await p.locator('[data-dish-id="m2"]').getByRole('button').click();
      const d = p.getByRole('dialog', { name: /Charred Lamb Rack/ }); await d.waitFor();
      test('Mobile dish drawer remains within viewport', await d.evaluate(e => e.getBoundingClientRect().width <= window.innerWidth));
      await p.screenshot({ path: 'artifacts/dish-mobile.png' });
      await p.keyboard.press('Escape');
    }
    await ctx.close();
  }
  test('No uncaught browser errors', errors.length === 0);
  await fs.writeFile('artifacts/qa-result.json', JSON.stringify({ pass: true, assertions: results, errors }, null, 2));
  console.log(`Verified ${results.length} checks.`);
} catch (error) {
  await fs.writeFile('artifacts/qa-result.json', JSON.stringify({ pass: false, assertions: results, errors, failure: error.message }, null, 2));
  throw error;
} finally {
  await browser.close();
}
