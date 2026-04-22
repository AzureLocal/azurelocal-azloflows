/**
 * Playwright script to record a ~30-second demo video of AzLoFlows
 * showing the Public Path scenario with Proxy + Arc gateway,
 * enabling Hosts → ARB → AKS → VM without proxy, then cycling
 * through traffic types.
 *
 * Output: 1920×1080 WebM (LinkedIn-compatible).
 *
 * Usage:
 *   1. Start dev server: npm run dev
 *   2. Run: node scripts/record-demo.mjs
 */

import { chromium } from '@playwright/test';

const BASE = 'http://localhost:8125/AzLoFlows/';
const VIDEO_DIR = './docs/demo-video';
// 1080p — LinkedIn recommended resolution (supports 256×144 to 4096×2304)
const VIEWPORT = { width: 1920, height: 1080 };

const pause = (ms = 800) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,               // HiDPI — sharper text & icons
    recordVideo: { dir: VIDEO_DIR, size: VIEWPORT },
  });
  const page = await context.newPage();

  // ── 1. Open the app — empty canvas ──────────────────────
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await pause(1500);

  // ── 2. Load "Azure Local Public Path" predefined scenario ──
  const publicPathBtn = page.locator('.predefined-scenario-btn', {
    hasText: 'Azure Local Public Path',
  });
  await publicPathBtn.click();
  await pause(2000); // let the diagram render and fit to screen

  // ── 2b. Zoom in so labels are readable ──────────────────
  const zoomInBtn = page.locator('button[aria-label="Zoom in"]');
  for (let i = 0; i < 6; i++) {
    await zoomInBtn.click();
    await pause(150);
  }
  await pause(800);

  // ── 3. Select "Proxy + Arc" scenario ────────────────────
  const proxyArcPill = page.locator('.scenario-pill', { hasText: 'Proxy + Arc' });
  await proxyArcPill.click();
  await pause(1200);

  // ── 4. Enable traffic sources one by one ────────────────
  // Hosts (required dependency for ARB & AKS in Proxy + Arc)
  await page.locator('.source-picker .flow-pill', { hasText: 'Hosts' }).click();
  await pause(1200);

  // ARB (now unlocked)
  await page.locator('.source-picker .flow-pill', { hasText: 'ARB' }).click();
  await pause(1200);

  // AKS
  await page.locator('.source-picker .flow-pill', { hasText: 'AKS' }).click();
  await pause(1200);

  // VM without proxy (mutual-exclusion group — selects this VM variant)
  await page.locator('.source-picker .flow-pill', { hasText: 'VM without proxy' }).click();
  await pause(1500);

  // ── 5. Cycle through traffic types ──────────────────────
  const typeButtons = page.locator('.type-picker .flow-pill');
  const typeCount = await typeButtons.count();

  // Turn off all active types one by one (reverse order, fast)
  for (let i = typeCount - 1; i >= 0; i--) {
    const btn = typeButtons.nth(i);
    const isActive = await btn.evaluate((el) => el.classList.contains('is-active'));
    if (isActive) {
      await btn.click({ force: true });
      await pause(400);
    }
  }
  await pause(600);

  // Turn them back on one by one (slower, so viewer sees each layer)
  for (let i = 0; i < typeCount; i++) {
    await typeButtons.nth(i).click({ force: true });
    await pause(700);
  }
  await pause(1000);

  // ── 6. Switch scenario to "No Proxy, No Arc" for contrast ──
  await page.locator('.scenario-pill', { hasText: 'No Proxy, No Arc' }).click();
  await pause(1500);

  // Switch to "Proxy, No Arc"
  await page.locator('.scenario-pill').filter({ hasText: /^Proxy, No Arc$/ }).click();
  await pause(1500);

  // Back to "Proxy + Arc" for the finale
  await proxyArcPill.click();
  await pause(2000);

  // ── Done — close to flush the video file ────────────────
  await context.close();
  await browser.close();

  console.log(`\n✅ Demo video saved to: ${VIDEO_DIR}/`);
  console.log('The .webm file can be uploaded directly to LinkedIn.');
  console.log('To convert to .mp4:  ffmpeg -i <file>.webm -c:v libx264 -crf 23 azloflows-demo.mp4');
})();
