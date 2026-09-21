# First-release validation

Date: 21 September 2026. Environment: Windows, Node.js 24.13.0, npm 11.6.2. This report records observed results; targets in the delivery plan are not assumed to have passed.

## Check results

The release checks passed locally before the first application push:

- `npm run check`: 12 files, 0 errors, warnings or hints.
- `npm run check:docs`: 12 Markdown files and 53 relative links, 0 errors.
- `npm run build`: static production build completed and generated the sitemap.
- `npm run check:bundle`: 17.14 KiB JavaScript gzip and 31.11 KiB HTML/CSS/JS/font gzip, within the 120 KiB and 600 KiB budgets.
- `npm audit --omit=dev`: 0 vulnerabilities.
- `npm run test:e2e`: 24 tests passed across Chromium, Firefox and WebKit.
- The source and public resume PDFs have matching SHA-256 hashes.

The first browser run exposed an insufficient decorative-number contrast and inconsistent hash restoration after reload. Both were corrected before the passing release run.

## Reproduction

```powershell
npm ci
npm run check
npm run check:docs
npm run build
npm run check:bundle
npx playwright install chromium firefox webkit
npm run test:e2e
```

Browser tests use the production preview at the actual project base path. The test server starts automatically unless a compatible preview is already running. Reports and traces are written to ignored `playwright-report/` and `test-results/` directories.

## Coverage and limits

Automated coverage includes resume content, PDF and metadata assets, keyboard project disclosure, persistent and system motion preferences, script-free use, blocked storage/scripts, deep links, reverse scrolling, resize, narrow layouts and serious/critical axe findings. Physical iOS/Android hardware and a human screen-reader session are not available in this environment; browser engines and emulated viewports do not establish those results.

Full field performance and subjective owner design approval cannot be established by automated checks. Any locally measured bundle/audit values are lab evidence, not traffic-derived Core Web Vitals.
