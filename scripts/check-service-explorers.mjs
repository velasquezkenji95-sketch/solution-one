import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = (process.env.SITE_URL || 'http://127.0.0.1:5173').replace(/\/$/, '');
const browser = await chromium.launch();
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    for (const route of ['technology', 'operations']) {
      await page.goto(`${base}/${route}/`);
      const explorer = page.locator('[data-service-explorer]');
      await explorer.waitFor({ state: 'visible' });
      const selectors = explorer.locator('[aria-pressed]');
      for (let index = 0; index < await selectors.count(); index++) {
        await selectors.nth(index).click();
        await page.waitForFunction(index => document.querySelectorAll('[data-service-explorer] [aria-pressed]')[index]?.getAttribute('aria-pressed') === 'true', index);
        assert.equal(await selectors.nth(index).getAttribute('aria-pressed'), 'true');
        const title = (await selectors.nth(index).innerText()).replace(/^0\d\s*/, '').trim();
        assert.equal(await explorer.locator('h3').innerText(), title);
      }
      await explorer.getByTitle('Next service').scrollIntoViewIfNeeded();
      await explorer.getByTitle('Next service').focus();
      await page.keyboard.press('Enter');
      await page.waitForFunction(() => document.querySelector('[data-service-explorer] [aria-pressed]')?.getAttribute('aria-pressed') === 'true');
      assert.equal(await selectors.first().getAttribute('aria-pressed'), 'true');
      const video = explorer.locator('video');
      await video.scrollIntoViewIfNeeded();
      await page.waitForFunction(() => document.querySelector('[data-service-explorer] video')?.currentTime > 0);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForFunction(() => document.querySelector('[data-service-explorer] video')?.paused);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      if (route === 'operations') {
        await page.getByRole('button', { name: 'Creative & Growth', exact: true }).click();
        await page.waitForFunction(() => document.querySelectorAll('[aria-label="Talent roles"] li').length === 5);
        const roles = page.getByRole('list', { name: 'Talent roles' }).locator('li');
        assert.equal(await roles.count(), 5);
        await page.getByRole('searchbox').fill('video');
        await page.waitForFunction(() => document.querySelectorAll('[aria-label="Talent roles"] li').length === 1);
        assert.equal(await roles.count(), 1);
        await page.getByRole('searchbox').fill('no-match');
        await page.waitForFunction(() => document.querySelectorAll('[aria-label="Talent roles"] li').length === 0);
        assert.equal(await roles.count(), 0);
        await page.getByRole('button', { name: 'Clear filters' }).click();
        await page.waitForFunction(() => document.querySelectorAll('[aria-label="Talent roles"] li').length === 14);
        assert.equal(await roles.count(), 14);
      }
      console.log(`${route} at ${width}px passed`);
    }
    await page.close();
  }
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  await page.goto(`${base}/operations/`);
  await page.locator('[data-service-explorer] video').scrollIntoViewIfNeeded();
  assert.ok(await page.locator('[data-service-explorer] video').evaluate(video => video.paused));
  console.log('Reduced-motion preview passed');
} finally {
  await browser.close();
}
