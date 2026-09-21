# Sahil Shah Portfolio

A personal resume and project portfolio for Sahil Shah, with an emphasis on artificial intelligence, healthcare machine learning and SAP ABAP experience.

## Current status

The first portfolio implementation is complete: an Astro static site with Anime.js scenes, responsive layouts, a downloadable resume, browser tests and a GitHub Pages workflow. See the [validation report](docs/VALIDATION.md) for measured checks and limitations, and the [deployment guide](docs/DEPLOYMENT.md) for publishing status and instructions.

- Repository: [sahilshah2904/sahil-shah-portfolio](https://github.com/sahilshah2904/sahil-shah-portfolio)
- Default branch: `main`
- Website address: [sahilshah2904.github.io/sahil-shah-portfolio](https://sahilshah2904.github.io/sahil-shah-portfolio/)
- Content source: [Sahil_Shah_Resume.pdf](Sahil_Shah_Resume.pdf)

## Start here

```powershell
git clone https://github.com/sahilshah2904/sahil-shah-portfolio.git
cd sahil-shah-portfolio
npm ci
npm run dev
```

Use Node.js 24.13.0 (recorded in `.nvmrc`) and open the address printed in the terminal, including `/sahil-shah-portfolio/`. If you already have this repository locally, use that checkout instead of cloning inside it. Read the [setup guide](docs/SETUP.md) for Windows troubleshooting.

## The website

A connected animated portfolio following a “From signal to insight” narrative: an introduction flows into an ECG project walkthrough, a project explorer, capabilities, experience and contact. Native navigation and an immediate resume download accompany the story, with mobile, keyboard and reduced-motion support.

Built with Astro, TypeScript, Tailwind CSS, Anime.js and Lucide, with Playwright and axe for validation. Direct dependencies are pinned in `package.json`; `package-lock.json` records the resolved installation. Original artwork is SVG, and the site uses system fonts without third-party font requests.

## Commands

```powershell
npm run check
npm run check:docs
npm run build
npm run check:bundle
npx playwright install chromium firefox webkit
npm run test:e2e
npm run preview
```

The build copies the source resume into the public download automatically. Changes pushed to `main` run validation before the GitHub Actions workflow deploys them; pull requests validate without publishing.

## Documentation

| Document | What it covers |
| --- | --- |
| [Setup](docs/SETUP.md) | Prerequisites, cloning, initial Git setup and troubleshooting. |
| [Development](docs/DEVELOPMENT.md) | Proposed structure, local commands, validation and dependency updates. |
| [Experience and animation](docs/ANIMATION_DESIGN.md) | Connected storyboard, scene controls, responsive modes and animation lifecycle. |
| [Delivery plan](docs/DELIVERY_PLAN.md) | Scope, milestones, responsibilities, budgets, risks and release gates. |
| [Implementation](docs/IMPLEMENTATION.md) | Actual architecture, interactions, assets and design tradeoffs. |
| [Validation](docs/VALIDATION.md) | Recorded results, browser coverage and remaining limitations. |
| [Content maintenance](docs/CONTENT.md) | Resume sources, factual accuracy and updating the download. |
| [Deployment](docs/DEPLOYMENT.md) | GitHub Pages configuration, release checks and recovery. |
| [Project log](docs/PROJECT_LOG.md) | Completed work, decisions, evidence and outstanding steps. |
| [Contributing](CONTRIBUTING.md) | Branches, commits, review, push and documentation expectations. |
| [Website plan](WEBSITE_PLAN.md) | Content mapping, visual design, animations and package research. |

## Repository contents

```text
.gitignore
README.md
CONTRIBUTING.md
WEBSITE_PLAN.md
Sahil_Shah_Resume.pdf
docs/
  SETUP.md
  DEVELOPMENT.md
  ANIMATION_DESIGN.md
  DELIVERY_PLAN.md
  CONTENT.md
  DEPLOYMENT.md
  PROJECT_LOG.md
  IMPLEMENTATION.md
  VALIDATION.md
src/
  components/Signal.astro
  data/resume.ts
  pages/index.astro
  scripts/portfolio.ts
  styles/global.css
public/
scripts/
tests/
.github/workflows/deploy.yml
astro.config.mjs
package.json
package-lock.json
playwright.config.ts
```

The original author's workspace also contains an untracked Word resume. It is not included in a clone and is not required to follow this project.

## Maintaining the portfolio

Update structured facts in `src/data/resume.ts`, editorial copy in `src/pages/index.astro`, and the source PDF together. Follow the [content guide](docs/CONTENT.md) and [contribution workflow](CONTRIBUTING.md). Keep the project log and validation evidence current. A new animation or content change should retain keyboard access, reduced-motion support and a readable no-JavaScript baseline.
