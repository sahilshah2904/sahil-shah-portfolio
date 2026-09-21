import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const home = '/sahil-shah-portfolio/';

test('resume content, navigation, PDF and assets are available', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(home);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Turning signals');
  await expect(page.locator('#evaluate')).toContainText('0.710 macro AUPRC');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Journey' }).click();
  await expect(page).toHaveURL(/#journey$/);
  await expect(page.locator('#journey')).toContainText('Accenture');
  const pdf = await request.get(`${home}Sahil_Shah_Resume.pdf`);
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 4).toString()).toBe('%PDF');
  for (const asset of ['favicon.svg', 'social-preview.png', 'sitemap-index.xml']) expect((await request.get(home + asset)).status()).toBe(200);
  expect(errors).toEqual([]);
});

test('project explorer responds to keyboard and rapid selections', async ({ page }) => {
  await page.goto(home + '#projects');
  const tb = page.locator('[data-project-id="tb"] summary');
  await tb.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-project-id="tb"]')).toHaveAttribute('open', '');
  await expect(page.locator('#explorer-number')).toHaveText('03');
  await expect(page.locator('.tb-art')).toHaveCSS('opacity', '1');
  await page.locator('[data-project-id="xray"] summary').click();
  await page.locator('[data-project-id="xray"] summary').click();
  await expect(page.locator('#explorer-number')).toHaveText('02');
  await expect(page.locator('.xray-art')).toHaveCSS('opacity', '1');
});

test('motion preference persists and respects system reduction', async ({ page }) => {
  await page.goto(home);
  const toggle = page.locator('#motion-toggle');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await page.reload();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await toggle.click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(toggle).toBeDisabled();
  await expect(page.locator('.pipeline-stage')).toHaveCSS('position', 'static');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
});

test('content and native disclosures work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321' + home);
  await expect(page.locator('#hero-title')).toBeVisible();
  await page.locator('[data-project-id="tb"] summary').click();
  await expect(page.locator('[data-project-id="tb"] .project-detail-body')).toBeVisible();
  await expect(page.locator('#motion-toggle')).toBeHidden();
  await expect(page.locator('.pipeline-stage')).toHaveCSS('position', 'static');
  await context.close();
});

test('blocked animation and storage preserve essential functionality', async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked'); } }); });
  await page.route('**/*.js', route => route.abort());
  await page.goto(home + '#contact');
  await expect(page.getByRole('link', { name: 'sahilshah2904@gmail.com' })).toBeVisible();
  await expect(page.locator('#hero-title')).toContainText('Turning signals');
});

test('animation state follows reverse scroll, deep links and viewport changes', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(home + '#evaluate');
  await expect(page.locator('#stage-label')).toHaveText('04 / EVALUATION');
  await page.locator('#records').scrollIntoViewIfNeeded();
  await expect(page.locator('#stage-label')).toHaveText('01 / DATA');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.pipeline-stage')).toHaveCSS('position', 'static');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.locator('.pipeline-stage')).toHaveCSS('position', 'sticky');
  await page.goto(home + '#evaluate');
  await page.reload();
  await expect(page.locator('#stage-label')).toHaveText('04 / EVALUATION');
});

test('responsive layouts have no horizontal overflow', async ({ page }) => {
  await page.goto(home);
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
    expect(overflow, `Overflow at ${width}px`).toBe(false);
  }
});

test('page has no serious or critical automated accessibility issues', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(home);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(v => ['serious', 'critical'].includes(v.impact ?? ''))).toEqual([]);
});
