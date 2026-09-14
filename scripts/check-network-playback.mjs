import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  await page.goto('http://127.0.0.1:5173/');
  const section = page.locator('#unify > section').first();
  await section.scrollIntoViewIfNeeded();
  const svg = section.locator('svg');
  await svg.waitFor();
  await page.waitForTimeout(400);
  const first = await svg.innerHTML();
  await page.waitForTimeout(800);
  assert.notEqual(await svg.innerHTML(), first, 'Visible network must advance');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const paused = await svg.innerHTML();
  await page.waitForTimeout(800);
  assert((await svg.innerHTML()) === paused, 'Offscreen network must pause');
  console.log('Network animation advances in view and pauses offscreen.');
} finally {
  await browser.close();
}
