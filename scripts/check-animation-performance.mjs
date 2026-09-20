import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const base = process.env.SITE_URL || 'http://127.0.0.1:5173';
const browser = await chromium.launch();
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 2 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);
    const section = page.locator('#products');
    const bounds = await section.evaluate(el => ({ top: el.offsetTop, range: el.clientHeight - innerHeight }));
    for (const progress of [0.05, 0.25, 0.45, 0.65, 0.85]) {
      await page.evaluate(({ top, range, progress }) => scrollTo({ top: top + range * progress, behavior: 'instant' }), { ...bounds, progress });
      await page.waitForTimeout(550);
    }
    assert.equal(await section.locator('button').count(), 3);
    await page.screenshot({ path: join(tmpdir(), `home-features-performance-${width}.png`) });
    const timings = await page.evaluate(({ top, range }) => new Promise(resolve => {
      const frames = []; let previous = performance.now();
      function tick(now) {
        frames.push(now - previous); previous = now;
        scrollTo({ top: top + range * (0.05 + frames.length / 90 * 0.8), behavior: 'instant' });
        if (frames.length < 90) requestAnimationFrame(tick);
        else resolve({ averageMs: frames.reduce((a, b) => a + b) / frames.length, over50ms: frames.filter(t => t > 50).length });
      }
      requestAnimationFrame(tick);
    }), bounds);
    console.log(`Home ${width}: three feature categories present; frame sample`, timings);
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForFunction(() => document.querySelector('[data-home-feature-artwork]')?.dataset.animationPlaying === 'false');
    assert.equal(await page.locator('[data-home-feature-artwork]').getAttribute('data-animation-playing'), 'false');
    for (const route of ['products', 'solutions', 'why-us']) {
      await page.goto(`${base}/${route}/`);
      const video = page.locator('video').first();
      await video.waitFor();
      await page.waitForFunction(() => { const v = document.querySelector('video'); return v && !v.paused && v.currentTime > 0; });
      await page.evaluate(() => scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
      await page.waitForFunction(() => [...document.querySelectorAll('video')].every(v => {
        const r = v.getBoundingClientRect(); return (r.bottom > 0 && r.top < innerHeight) || v.paused;
      }));
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForFunction(() => !document.querySelector('video').paused);
    }
    await page.goto(`${base}/about/`);
    const globe = page.locator('[data-globe-playing]');
    await globe.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('[data-globe-playing]')?.dataset.globePlaying === 'true');
    await page.waitForTimeout(2500);
    const canvas = globe.locator('canvas');
    const first = await canvas.screenshot();
    await page.waitForTimeout(600);
    const second = await canvas.screenshot();
    assert(!first.equals(second), 'Visible globe animates');
    const colors = await page.evaluate(async png => {
      const image = new Image(); image.src = `data:image/png;base64,${png}`; await image.decode();
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const ctx = c.getContext('2d'); ctx.drawImage(image, 0, 0, 64, 64);
      return new Set(ctx.getImageData(0, 0, 64, 64).data).size;
    }, second.toString('base64'));
    assert(colors > 50, 'Globe is not blank');
    assert(await canvas.evaluate(c => c.width / c.clientWidth <= 1.51), 'Globe resolution is capped');
    await page.screenshot({ path: join(tmpdir(), `globe-performance-${width}.png`) });
    await page.evaluate(() => scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
    await page.waitForFunction(() => document.querySelector('[data-globe-playing]')?.dataset.globePlaying === 'false');
    assert.equal(await page.locator('[data-scene-playback]').getAttribute('data-scene-playback'), 'paused');
    await globe.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('[data-globe-playing]')?.dataset.globePlaying === 'true');
    assert.deepEqual(errors, []);
    console.log(`${width}: media pause/resume, globe pixels/motion, no runtime errors passed`);
    await page.close();
  }
} finally { await browser.close(); }
