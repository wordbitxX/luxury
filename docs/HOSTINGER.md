# Maison Noor — Hostinger image deployment fix

## What failed on the reported deployment

The Node.js application was serving pages correctly. On the reported Hostinger domain:

- `/images/maison-noor-evening-room.webp` returned **404 HTML**, not image bytes.
- `/images/signature-lamb-rack.webp` also returned **404**.
- `/_next/image?url=%2Fimages%2Fmaison-noor-evening-room.webp&w=1200&q=75` returned **400**, with `The requested resource isn't a valid image.`
- Optimisation of an external Pexels photograph returned **200 with image bytes**.

This is a missing `public/images` deployment asset issue, not evidence that Hostinger cannot serve WebP or run Next.js image optimisation. The audit found five broken local image sources in the homepage's 39 unique sources.

## Implemented repair

1. `src/lib/image-sources.ts` records the original sources of all ten previously local photographs in version-controlled TypeScript.
2. The shared `px()` helper now returns the same original photographs as HTTPS image URLs. The page no longer depends on sandbox-generated binary files being included in the deployment.
3. `RestaurantImage` keeps `next/image` responsive output and lazy loading. If the image optimiser fails, it retries the same original once directly in the browser. It does not silently replace a dish with an unrelated picture.
4. `next.config.ts` provides allowlisted `afterFiles` rewrites for the ten old `/images/*.webp` paths. A local file is still served if it exists; otherwise its original source is proxied. Old image links remain usable after redeployment.
5. No database, restaurant layout, prices, typography or animation changes are required.

## Apply this to your Hostinger Node.js app

The sandbox/preview changes do not automatically update your Hostinger account.

1. Export/upload the updated project, or push it to the Git repository linked in hPanel. Deploy all changed source files together, not only `next.config.ts`.
2. Retain the app's existing environment variables, including `DATABASE_URL` and any admin secrets. Never commit `.env` or credentials to a public repository.
3. Use the project root (the folder containing `package.json`) as the app root.
4. Use a supported Node.js runtime (22 LTS is suitable), `npm ci` to install, and `npm run build` to build. Keep the application as a Node.js Next.js app; do not switch it to a static HTML export, because bookings and admin use server routes.
5. Start with the Hostinger-generated Next.js start configuration, normally `npm run start -- -p $PORT`.
6. After the deployment is complete, purge the Hostinger CDN/cache if enabled and hard-refresh the browser. A cached HTML document can still contain old asset references.

### If you prefer to deploy the local asset files too

Include the complete **root** `public/` directory alongside `src/` and `package.json`. Do not put it inside `src/` or upload it as `/public/images/...` URLs: Next.js serves a root `public/images/photo.webp` at `/images/photo.webp`.

For a manually packaged **standalone** build, Next.js does not automatically copy `public` and `.next/static` into the standalone output. Include `public` at `.next/standalone/public` and `.next/static` at `.next/standalone/.next/static`. This project does not require standalone mode.

## Verification

Run:

`node scripts/check-deployed-images.mjs https://your-domain.example`

The check fetches the real image responses, validates content types and decodes image bytes; a page returning 200 alone is not sufficient. It checks homepage/menu/order images and the ten legacy local paths. Exit code 1 identifies a failing asset.

For the browser fallback and responsive image test:

`node scripts/qa-images.mjs https://your-domain.example`

The browser check needs Playwright's Chromium and its OS libraries installed. It verifies rendered photographs at desktop/mobile widths and deliberately rejects `/_next/image` requests in a separate context to test direct-source recovery. It never submits reservations or orders and does not follow WhatsApp links.

## Diagnosis notes

- A 404 on `/images/name.webp`: local file was not shipped, app root is wrong, or an old filename is cached.
- A 400 on `/_next/image` with a 404 source: fix the source first; disabling optimisation alone cannot restore a missing file.
- A valid source but a failing optimiser: inspect Node.js logs and upstream fetch permissions; the browser recovery now supplies a bounded fallback.
- The repair is not live on Hostinger until you deploy the updated code there.
