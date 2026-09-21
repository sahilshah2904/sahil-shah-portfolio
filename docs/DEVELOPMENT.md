# Development and validation

## Current stage

There is no application manifest, lockfile, source tree or test configuration yet. Everything below describing application files or npm scripts is the implementation target, not an instruction to run against this documentation-only revision.

The next implementation change should add the application to the existing repository while preserving the original resume and documentation. It should install the selected [package inventory](../WEBSITE_PLAN.md#package-inventory), commit a resolved `package-lock.json`, and update this guide with the actual commands and outcomes.

## Architecture and intended structure

Astro generates static HTML for the resume. Tailwind supplies styles, and Anime.js coordinates browser animation scenes. Resume text remains available without JavaScript. Contact uses ordinary links. There is no planned server, database or API credential requirement.

Follow the [experience specification](ANIMATION_DESIGN.md) for scene state, preferences, interruption and cleanup contracts. The [delivery plan](DELIVERY_PLAN.md) defines prototype gates, performance budgets and the complete verification matrix. Build the connected hero-to-ECG slice first; a generic set of section reveals does not satisfy the requested experience.

```text
src/
  data/resume.ts          # Structured resume facts
  layouts/               # Page shell and metadata
  pages/index.astro      # Main portfolio page
  components/            # Sections and reusable UI
  styles/                # Theme, responsive and print styles
  scripts/               # Animation and navigation behaviour
public/
  Sahil_Shah_Resume.pdf   # Downloadable copy of the source PDF
tests/                   # Browser checks
astro.config.mjs
tsconfig.json
package.json
package-lock.json
playwright.config.ts
.github/workflows/deploy.yml
```

These paths are proposed and must be reconciled with the final implementation. Hosting uses the project path `/sahil-shah-portfolio/`; asset links and PDF downloads must respect it.

## Reproduce an installed application later

Once a manifest, lockfile and scripts have been committed, run from the repository root:

```powershell
npm ci
npm run dev
```

Open the URL printed by the development server and stop it with Ctrl+C. `npm ci` reproduces the lockfile dependency tree and reports a mismatch between the manifest and lockfile rather than updating it. [npm ci documentation](https://docs.npmjs.com/cli/v11/commands/npm-ci/).

The implementation should define these scripts:

| Planned command | Intended action |
| --- | --- |
| `npm run dev` | `astro dev` |
| `npm run check` | `astro check` |
| `npm run build` | `astro build` |
| `npm run preview` | `astro preview` |
| `npm run test:e2e` | `playwright test` |

Install Chromium with `npx playwright install chromium` for the prototype once browser tests are configured. For the release matrix, install Chromium, Firefox and WebKit using `npx playwright install chromium firefox webkit`. On a fresh Linux CI runner, include `--with-deps` to install required system dependencies. The test configuration should define how its web server starts and include the site's base path. Record physical mobile checks separately from browser emulation.

## Validation by change type

For documentation edits: check facts against the repository, follow relative links, inspect Markdown rendering, review `git diff` and run `git diff --check`. Review newly created files as well because unstaged untracked files do not appear in `git diff`.

For application changes, once implemented:

```powershell
npm run check
npm run build
npm run test:e2e
npm run preview
```

Inspect the built preview at the printed address including the project base path. Verify navigation, mobile menu, contact links, PDF download and print layout. Check small mobile, tablet and desktop widths; keyboard focus; reduced-motion preferences; and readability without JavaScript. Scan with axe and supplement it with manual accessibility review. Record which browsers and checks actually ran.

The [website plan](../WEBSITE_PLAN.md#implementation-sequence-and-deliverables) defines acceptance targets. Lighthouse scores are targets until measured on a real build.

## Dependency changes

Use npm consistently. Pin intentional direct dependency updates and commit both the manifest and lockfile. Run the relevant build/browser checks and inspect `npm audit` findings before calling an upgrade validated. Do not apply automated breaking upgrades without reviewing their effects.

The researched baseline uses TypeScript 6 because the selected Astro checker does not declare support for TypeScript 7. Recheck this constraint when upgrading; the original version research is dated, not a permanent compatibility guarantee.

## Keep the handoff current

Every implementation milestone should update the README's status, any changed paths or commands here, and the [project log](PROJECT_LOG.md). Add setup requirements when they are introduced. A future reader should not have to infer missing configuration from the conversation.
