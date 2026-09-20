import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const browser = await chromium.launch();
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(process.env.SITE_URL || 'http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded' });
    const section = page.locator('#products');
    const bounds = await section.evaluate(el => ({ top: el.offsetTop, range: el.offsetHeight - innerHeight }));
    assert(bounds.range <= 900, 'Reveal sequence should need no more than one viewport of scrolling');
    const scroll = async progress => {
      await page.evaluate(({ top, range, progress }) => scrollTo({ top: top + range * progress, behavior: 'instant' }), { ...bounds, progress });
      await page.waitForTimeout(700);
    };
    await scroll(0.3);
    const session = await page.context().newCDPSession(page);
    await session.send('Performance.enable');
    const before = (await session.send('Performance.getMetrics')).metrics;
    await scroll(0.37);
    const after = (await session.send('Performance.getMetrics')).metrics;
    const layouts = after.find(m => m.name === 'LayoutCount').value - before.find(m => m.name === 'LayoutCount').value;
    console.log(`${width}: category transition layouts = ${layouts}`);
    // A reveal should lay out once, not once per height-animation frame.
    assert(layouts < 12, 'Category transition must not continuously reflow');
    assert.equal(await section.locator('button[aria-expanded="true"]').count(), 1);
    assert.match(await section.locator('button[aria-expanded="true"]').innerText(), /TECHNOLOGY/);
    await section.locator('.home-feature-trigger').first().hover();
    await page.waitForTimeout(350);
    assert.match(await section.locator('button[aria-expanded="true"]').innerText(), /TECHNOLOGY/, 'Hover must not fight scroll selection');
    await section.locator('.home-feature-trigger').first().click();
    assert.match(await section.locator('button[aria-expanded="true"]').innerText(), /GLOBAL PAYMENTS/);
    await scroll(0.8);
    assert.equal(await section.locator('.home-feature-trigger').count(), 3);
    assert.match(await section.locator('button[aria-expanded="true"]').innerText(), /CUSTOMER OPERATIONS/);
    assert.equal(await section.locator('.home-feature-services li').count(), 6);
    await page.screenshot({ path: join(tmpdir(), `feature-reveal-fixed-${width}.png`) });
    await scroll(0.05);
    assert.equal(await section.locator('.home-feature-trigger').count(), 1);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    assert.equal(await section.locator('.home-feature-trigger').count(), 3);
    await section.locator('.home-feature-trigger').last().focus();
    assert.match(await section.locator('button[aria-expanded="true"]').innerText(), /CUSTOMER OPERATIONS/);
    await page.close();
  }
} finally {
  await browser.close();
}
