# Sahil Shah Portfolio

A personal resume and project portfolio for Sahil Shah, with an emphasis on artificial intelligence, healthcare machine learning and SAP ABAP experience.

## Current status

This repository is in the **planning and documentation stage**. The resume, website plan and Git setup are present. Application code, installed dependencies, automated tests and deployment workflows have not been created yet. There is no runnable website in this revision.

- Repository: [sahilshah2904/sahil-shah-portfolio](https://github.com/sahilshah2904/sahil-shah-portfolio)
- Default branch: `main`
- Planned website address: `https://sahilshah2904.github.io/sahil-shah-portfolio/` (deployment pending)
- Content source: [Sahil_Shah_Resume.pdf](Sahil_Shah_Resume.pdf)

## Start here

```powershell
git clone https://github.com/sahilshah2904/sahil-shah-portfolio.git
cd sahil-shah-portfolio
git status
```

Read the [setup guide](docs/SETUP.md) and [website plan](WEBSITE_PLAN.md) next. If you already have this repository locally, use that checkout instead of cloning inside it. There is no `package.json` or lockfile yet, so npm installation and development commands become available only after scaffolding.

## Planned website

A connected animated portfolio following a “From signal to insight” narrative: an introduction flows into an ECG project walkthrough, a project explorer, capabilities, experience and contact. Native navigation and an immediate resume download accompany the story, with mobile, keyboard and reduced-motion support.

The proposed stack is Astro, TypeScript, Tailwind CSS, Anime.js and Lucide icons, with Playwright and axe for validation. Anime.js replaces the original Motion proposal. The [package inventory](WEBSITE_PLAN.md#package-inventory) records selected versions and compatibility findings. These selections have not yet been validated by an installed build.

## Documentation

| Document | What it covers |
| --- | --- |
| [Setup](docs/SETUP.md) | Prerequisites, cloning, initial Git setup and troubleshooting. |
| [Development](docs/DEVELOPMENT.md) | Proposed structure, local commands, validation and dependency updates. |
| [Experience and animation](docs/ANIMATION_DESIGN.md) | Connected storyboard, scene controls, responsive modes and animation lifecycle. |
| [Delivery plan](docs/DELIVERY_PLAN.md) | Scope, milestones, responsibilities, budgets, risks and release gates. |
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
```

The original author's workspace also contains an untracked Word resume. It is not included in a clone and is not required to follow this project.

## Next milestone

Scaffold Astro and build a hero-to-ECG prototype with Anime.js, including mobile and reduced-motion behaviour. Validate the connected-flow direction before extending it across the full portfolio. Follow the delivery plan and update documentation alongside each milestone.
