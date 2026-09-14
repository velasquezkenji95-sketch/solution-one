import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
const browser = await chromium.launch();
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, hasTouch: width < 768, isMobile: width < 768 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${process.env.SITE_URL || 'http://127.0.0.1:5173'}/products/`);
    const section = page.locator('[data-product-features]');
    await section.waitFor();
    const bounds = await section.evaluate(el => ({ top: el.getBoundingClientRect().top + scrollY, range: el.clientHeight - innerHeight }));
    const canvas = section.locator('canvas');
    const frames = [];
    for (const p of [0.1, 0.35, 0.8]) {
      await page.evaluate(({ top, range, p }) => window.scrollTo(0, top + range * p), { ...bounds, p });
      await page.waitForTimeout(650);
      frames.push(await canvas.screenshot());
      assert(Math.abs((await section.locator(':scope > div').boundingBox()).y) < 2, 'Section stays pinned');
    }
    assert(!frames[0].equals(frames[1]) && !frames[1].equals(frames[2]), 'Scroll changes rendered card');
    const colors = await page.evaluate(async encoded => {
      const img = new Image(); img.src = `data:image/png;base64,${encoded}`; await img.decode();
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0, 64, 64);
      return new Set(ctx.getImageData(0, 0, 64, 64).data).size;
    }, frames[2].toString('base64'));
    assert(colors > 50, 'Card canvas is not blank');
    for (const button of await section.locator('button').all()) {
      if (width < 768) await button.tap();
      else await button.click();
      await page.waitForTimeout(320);
      assert.equal(await button.getAttribute('aria-expanded'), 'true');
    }
    await page.screenshot({ path: join(tmpdir(), `product-scroll-${width}.png`) });
    assert.equal(await section.locator('article').first().evaluate(el => getComputedStyle(el).opacity), '1');
    await page.evaluate(({ top, range }) => window.scrollTo(0, top + range * 0.1), bounds);
    await page.waitForTimeout(500);
    assert((await canvas.screenshot()).equals(frames[0]), 'Reverse scroll restores the same card pose');
    assert.deepEqual(errors, []);
    console.log(`${width}: pinned section, card pixels, rotation, reverse scroll, descriptions passed`);
    await page.close();
  }
} finally { await browser.close(); }
