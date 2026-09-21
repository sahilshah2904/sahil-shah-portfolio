# Sahil Shah — resume website plan

Prepared: 21 September 2026.

Status: planning and package research complete; packages have not been installed and the website has not been built or published.

Repository setup is now complete: `sahilshah2904/sahil-shah-portfolio`, branch `main`. The target is a GitHub Pages project site at `https://sahilshah2904.github.io/sahil-shah-portfolio/`. See the [README](README.md) for the documentation index and [project log](docs/PROJECT_LOG.md) for verified progress.

## Goal and direction

Create a polished, responsive personal website using `Sahil_Shah_Resume.pdf` as the source for biographical content, qualifications, employment, project claims and metrics. Make it easy for a recruiter to understand Sahil's AI work, inspect his experience, download his resume and contact him.

Selected architecture: Astro static pages, TypeScript, Tailwind CSS and Anime.js, deployed to GitHub Pages through GitHub Actions. Anime.js replaces the previously proposed Motion dependency. Static HTML will contain all resume content before animation scripts run.

The owner requests an Anime.js-inspired flow with connected visual storytelling beyond scrolling through information blocks. Working reference: the animation vocabulary of [animejs.com](https://animejs.com/), interpreted through an original portfolio design. The [experience specification](docs/ANIMATION_DESIGN.md) defines the storyboard, controls, responsive behaviour and animation lifecycle. The [delivery plan](docs/DELIVERY_PLAN.md) defines scope, dependencies, risks, release gates and measurable acceptance criteria.

Proposed visual treatment: dark charcoal, warm white text, teal highlights, generous spacing and an ECG-inspired signal connecting scenes. Typography, original SVG illustrations and continuous transitions carry the composition. A portrait is optional. Colour choices remain provisional; the connected animation direction is now a requirement. No library choice alone guarantees this experience: it must pass the prototype review before full production.

## Package inventory

Versions below were checked using `npm view` on the preparation date. They are a proposed compatible baseline, not a tested installation. Record the resolved dependency tree in `package-lock.json` during implementation and use `npm ci` in automation.

| Package | Selected version | Purpose |
| --- | --- | --- |
| `astro` | `7.3.3` | Generate static pages and provide local development/build tooling. |
| `tailwindcss` | `4.3.3` | Responsive styles, spacing, typography and colour tokens. |
| `@tailwindcss/vite` | `4.3.3` | Connect Tailwind to Astro's underlying Vite build. |
| `animejs` | `4.5.0` | Coordinated timelines, SVG drawing/morphing, scroll-linked storytelling and responsive animation scopes. |
| `@lucide/astro` | `1.47.0` | Inline SVG interface icons. |
| `@astrojs/sitemap` | `3.7.4` | Generate a sitemap using the final website URL. |
| `typescript` | `6.0.3` | Typed content and script checking; development dependency. |
| `@astrojs/check` | `0.9.10` | Validate Astro templates and types; development dependency. |
| `@playwright/test` | `1.63.0` | Browser checks for navigation, downloads and responsive behaviour; development dependency. |
| `@axe-core/playwright` | `4.13.0` | Automated accessibility checks within browser tests; development dependency. |

Compatibility findings:

- Installed tools: Node.js `24.13.0`, npm `11.6.2`, and Git. GitHub CLI was not found on PATH; it is optional because the GitHub website can handle repository and Pages setup.
- Astro `7.3.3` declares Node.js `>=22.12.0` and npm `>=9.6.5`; the installed versions meet these requirements.
- Astro declares Vite `^8.0.13`, which is within the Tailwind plugin's supported Vite range.
- `@lucide/astro` explicitly supports Astro 7.
- `@astrojs/check` currently accepts TypeScript 5 or 6. Use `6.0.3`, even though npm's latest TypeScript is `7.0.2`.
- Anime.js `4.5.0` was checked on 21 September 2026 using npm metadata; it provides ESM exports and TypeScript declarations. Use the documented v4 API and validate the selected imports in the initial prototype. This design does not require React or a second animation engine.
- Actual package resolution, build compatibility and dependency advisories must be checked when installing.

Planned installation commands, after scaffolding the project:

```powershell
npm install --save-exact astro@7.3.3 tailwindcss@4.3.3 @tailwindcss/vite@4.3.3 animejs@4.5.0 @lucide/astro@1.47.0 @astrojs/sitemap@3.7.4
npm install --save-dev --save-exact typescript@6.0.3 @astrojs/check@0.9.10 @playwright/test@1.63.0 @axe-core/playwright@4.13.0
npx playwright install chromium
```

Use system fonts initially; bundle licensed WOFF2 files if a custom typeface is selected. Native HTML anchors, CSS scrolling, SVG graphics and print styles need no additional packages. GitHub Actions handles deployment, so a `gh-pages` npm dependency is unnecessary. Additional animation engines, 3D libraries and UI frameworks are outside the initial package set.

Official references: [Astro deployment](https://docs.astro.build/en/guides/deploy/github/), [Tailwind with Astro](https://tailwindcss.com/docs/installation/framework-guides/astro), [Anime.js documentation](https://animejs.com/documentation/), [Lucide for Astro](https://lucide.dev/guide/astro), [Astro sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/), [Playwright](https://playwright.dev/docs/intro), [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing). Exact versions and peer requirements came from npm registry metadata.

## Page and content plan

Build one complete page with anchor navigation and a continuous narrative composition. The table below inventories content, not a template for identical stacked cards. On wide screens, scene transitions connect the material visually; narrow screens retain the story through compact drawings and readable layouts. Recruiters can jump directly to any section or download the resume without completing the sequence.

| Section | Resume content and presentation |
| --- | --- |
| Hero | Sahil Shah; proposed descriptor: “AI & Machine Learning · Python · SAP ABAP”; concise introduction identifying him as a Curtin Master of Computing graduate with professional Accenture experience. Buttons: View Projects, Download Resume and Contact. |
| About | Summarise the professional profile and incorporate dependable, adaptable and collaborative working attributes without repeating a separate soft-skills essay. |
| Featured projects | Interactive ECG data-to-model scene, followed by an editorial project explorer for chest X-ray and tuberculosis work. Show dates, methods and supported results. |
| Skills | Connected capability map grounded in the projects, with an equivalent readable list. Group programming, AI, data evaluation, cloud/database foundations and professional skills without implying equal proficiency. |
| Experience | Feature Accenture as relevant technical experience and retain Woolworths and Optus in a clearly dated additional-experience group. |
| Education | Curtin University Master of Computing, AI major, 2024–2026, Distinction, CWA 82.6%; L.D. College of Engineering BE, Electronics and Communication, 2018–2022, Distinction, CGPA 9.11. Do not invent a CGPA denominator. |
| Achievements | Two Dean's Letters of Commendation, Semester 2 2024 and Semester 1 2025; first place at Kaizen 2022 for the final-year project. |
| Contact/footer | Email, verified LinkedIn, optional telephone link and GitHub profile `https://github.com/sahilshah2904`; repeat the resume download. Include a clean print layout. |

Project details to preserve:

1. **Explainable AI for Cardiovascular Disease — August 2025 to May 2026.** Preprocessing for 63,851 ECG records across three datasets; 19 SNOMED CT classes; train/validation/test splits with leakage checks; seven model families benchmarked; weighted Ribeiro CNN, CE-SSL and HuBERT-ECG ensemble; macro AUROC 0.964 and macro AUPRC 0.710 on 9,578 held-out records; FastAPI inference package with validation-selected thresholds, input checks and versioned model artefacts for CardioMobile integration.
2. **AI-Powered Chest X-ray Disease Detection System — March to May 2025.** CNN classification and object detection, DICOM processing, Grad-CAM, bounding boxes and structured report generation to support clinical review.
3. **Tuberculosis Detection Using Machine Learning — January to April 2022.** Random Forest, SVM and Logistic Regression, voting and weighted averaging, plus a Flask web application.

Employment dates and scope:

- Accenture Solutions Pvt Ltd, SAP ABAP Developer / Packaged App Development Associate, December 2022–July 2024: SAP development and testing, ABAP reports, function modules, OData services, and production archiving/purging.
- Optus, Retail Sales Associate, part-time, October 2024–June 2025: transactions and account services, sales support and complaint resolution.
- Woolworths, Store Team Member, Online Department, part-time, November 2025–Present as stated in the resume: online orders, teamwork and customer assistance.

Content rules:

- Keep AUROC and AUPRC labels attached to their values; do not relabel them as accuracy.
- Present healthcare projects with the scope and outcomes actually stated in the resume.
- Use qualitative skill groups; numerical skill ratings have no source in the resume.
- Do not invent project repository URLs, live demos, testimonials, certifications, portraits or screenshots.
- The PDF prints `linkdin.com/in/sahil-shah-4094a7216`. Proposed correction: `https://www.linkedin.com/in/sahil-shah-4094a7216/`; verify the intended destination before launch.
- Email in the resume: `sahilshah2904@gmail.com`. The supplied PDF also includes a phone number; downloading the original PDF exposes the same contact details as the source.

## Animation design

Core concept: **From signal to insight**. A visual signal becomes an ECG waveform, connects preprocessing and model evaluation, branches into practical capabilities, then resolves into experience and a contact invitation. All graphics are illustrative; medical project results stay clearly labelled.

| Scene | Signature behaviour | Visitor control |
| --- | --- | --- |
| Introduction | Short typographic entrance with a signal tracing into the hero composition. | Resume, projects and contact links immediately available. |
| ECG case study | A shared SVG stage changes from records to preprocessing, model ensemble and evaluation; concise annotations follow the active step. | Native scroll plus direct chapter anchors; no mandatory playback. |
| Other projects | A project explorer changes its illustration and emphasis as visitors choose the X-ray or tuberculosis story. | Native disclosure controls enhanced with animation; tap and keyboard support. |
| Skills | Connections highlight how methods relate to documented projects, with static skill labels. | Optional focus/tap highlights; complete list always readable. |
| Journey and contact | The signal becomes a dated career/education path and settles into the final contact composition. | Direct experience/contact links and standard page navigation. |

Anime.js provides `createTimeline`, `createScope`, `onScroll` and SVG utilities suitable for this proposal. Use scene-local timelines and semantic HTML; CSS owns sticky positioning and basic focus/hover styles. Verify those mechanisms in the first prototype. References: [timelines](https://animejs.com/documentation/timeline), [scopes](https://animejs.com/documentation/scope), [events](https://animejs.com/documentation/events), [SVG](https://animejs.com/documentation/svg).

The detailed [animation specification](docs/ANIMATION_DESIGN.md) is the implementation contract. It covers reverse/fast scrolling, interruptions, breakpoint changes, no-JavaScript rendering, keyboard navigation, reduced motion, and short/mobile viewports. The [delivery plan](docs/DELIVERY_PLAN.md) sets prototype gates and performance budgets. Basic fades remain supporting effects; they do not satisfy the connected-flow requirement by themselves.

## GitHub hosting plan

Selected repository: `sahilshah2904/sahil-shah-portfolio`, giving the project-site URL `https://sahilshah2904.github.io/sahil-shah-portfolio/`. This replaces the initial suggestion of a dedicated user-site repository. GitHub Pages supports static sites and is available for public repositories on GitHub Free. [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

1. Repository connection completed: GitHub username `sahilshah2904`, repository `sahil-shah-portfolio`, branch `main`.
2. Keep the original resume files intact. During implementation, copy the PDF into `public/Sahil_Shah_Resume.pdf` so it is included in the generated site.
3. Set Astro's `site` to `https://sahilshah2904.github.io` and `base` to `/sahil-shah-portfolio`. Use base-aware asset/download links and static output. See the [deployment guide](docs/DEPLOYMENT.md).
4. Prepare `.github/workflows/deploy.yml` using Astro's official GitHub Pages workflow. Run checks and build before deployment, and publish the generated site on successful pushes to `main`.
5. Configure repository Settings → Pages → Source as GitHub Actions. Use the workflow's Pages permissions and deployment environment.
6. Verify the published URL, HTTPS, navigation, asset paths and PDF download. Add the URL to the GitHub profile website field; optionally link it from a profile README.

Deployment reference: [Astro's GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/). No backend is required for this plan. Contact uses an email link; any future form that sends messages needs a separate service. A custom domain can be added later.

## Implementation sequence and deliverables

Follow the milestone sequence in the [delivery plan](docs/DELIVERY_PLAN.md#milestones-and-review-gates). The critical path is: content/storyboard → foundation and one working scene → responsive motion validation → remaining scenes → full QA → deployment and handoff. Build the hero-to-ECG transition early to expose design, performance and accessibility problems before investing in the whole site.

Use the dated project log for evidence and decisions. Milestone completion requires the stated outputs and checks; installing Anime.js or showing a desktop demo alone does not complete the animation milestone.

Acceptance criteria:

- All resume sections are represented, with project metrics and dates faithfully retained.
- Layout works from 320 px mobile widths through desktop without horizontal overflow.
- Navigation and controls work with keyboard input and have visible focus states.
- Content remains readable with JavaScript disabled and with reduced motion enabled.
- Production checks/build pass; asset and resume URLs work under the selected hosting path.
- No critical/serious automated accessibility findings remain; manual keyboard and contrast review passes.
- Aim for mobile Lighthouse scores of 90+ in performance, accessibility, best practices and SEO; measure the finished build rather than guaranteeing scores in advance.
- Resume content can be updated from one data file; repeat deployment is documented.
- At least three distinct, connected storytelling interactions satisfy the scene specification: hero-to-ECG handoff, ECG pipeline progression and project explorer. A sequence of repeated fade-in sections is insufficient.
- The enhanced experience handles direct links, fast/reverse scrolling, resize, reduced-motion changes and animation initialisation failure without losing content or focus.
- Performance budgets, browser coverage and release blockers in the delivery plan have recorded results or explicitly recorded unresolved limitations.

## Inputs still to resolve

- Colour/type preference remains open. Use charcoal/teal provisionally; the Anime.js-driven narrative direction is selected.
- Intended LinkedIn destination and any project repository/demo links. Hide unavailable project actions.
- Confirm employment marked “Present” still reflects the intended public resume at launch.

These inputs do not prevent planning or local implementation. GitHub account access is needed only when configuring and publishing to that account.
