import { chromium } from '@playwright/test';
import { mkdir, readFile } from 'node:fs/promises';

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const svg = await readFile(new URL('../public/social-preview.svg', import.meta.url), 'utf8');
  await page.setContent(`<html><body style="margin:0">${svg}</body></html>`);
  await page.screenshot({ path: 'public/social-preview.png' });
  if (process.argv.includes('--site')) {
    await mkdir('test-results', { recursive: true });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('http://127.0.0.1:4321/sahil-shah-portfolio/');
    await page.waitForTimeout(1300);
    await page.screenshot({ path: 'test-results/desktop-hero.png' });
    await page.screenshot({ path: 'test-results/desktop.png', fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: 'test-results/mobile.png', fullPage: true });
  }
} finally { await browser.close(); }
