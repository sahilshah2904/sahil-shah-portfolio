# Sahil Shah — resume website plan

Prepared: 21 September 2026.

Status: planning and package research complete; packages have not been installed and the website has not been built or published.

## Goal and direction

Create a polished, responsive personal website using `Sahil_Shah_Resume.pdf` as the source for biographical content, qualifications, employment, project claims and metrics. Make it easy for a recruiter to understand Sahil's AI work, inspect his experience, download his resume and contact him.

Recommended architecture: Astro static pages, TypeScript, Tailwind CSS and Motion's vanilla JavaScript API, deployed to GitHub Pages through GitHub Actions. Static HTML will contain all resume content before animation scripts run.

Proposed visual direction, pending preference: dark charcoal, warm white text, teal highlights, generous spacing and an understated ECG-inspired hero illustration. Use original SVG/CSS graphics, a typographic name treatment and clear project cards. A portrait is optional. This direction connects the design to the strongest project in the resume.

## Package inventory

Versions below were checked using `npm view` on the preparation date. They are a proposed compatible baseline, not a tested installation. Record the resolved dependency tree in `package-lock.json` during implementation and use `npm ci` in automation.

| Package | Selected version | Purpose |
| --- | --- | --- |
| `astro` | `7.3.3` | Generate static pages and provide local development/build tooling. |
| `tailwindcss` | `4.3.3` | Responsive styles, spacing, typography and colour tokens. |
| `@tailwindcss/vite` | `4.3.3` | Connect Tailwind to Astro's underlying Vite build. |
| `motion` | `13.4.0` | Entrance sequences, viewport reveals, SVG and scroll-linked animation. |
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
- Motion's React peer dependencies are optional. Use imports from `motion`; this design does not require React.
- Actual package resolution, build compatibility and dependency advisories must be checked when installing.

Planned installation commands, after scaffolding the project:

```powershell
npm install --save-exact astro@7.3.3 tailwindcss@4.3.3 @tailwindcss/vite@4.3.3 motion@13.4.0 @lucide/astro@1.47.0 @astrojs/sitemap@3.7.4
npm install --save-dev --save-exact typescript@6.0.3 @astrojs/check@0.9.10 @playwright/test@1.63.0 @axe-core/playwright@4.13.0
npx playwright install chromium
```

Use system fonts initially; bundle licensed WOFF2 files if a custom typeface is selected. Native HTML anchors, CSS scrolling, SVG graphics and print styles need no additional packages. GitHub Actions handles deployment, so a `gh-pages` npm dependency is unnecessary. Additional animation engines, 3D libraries and UI frameworks are outside the initial package set.

Official references: [Astro deployment](https://docs.astro.build/en/guides/deploy/github/), [Tailwind with Astro](https://tailwindcss.com/docs/installation/framework-guides/astro), [Motion JavaScript](https://motion.dev/docs/quick-start), [Lucide for Astro](https://lucide.dev/guide/astro), [Astro sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/), [Playwright](https://playwright.dev/docs/intro), [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing). Exact versions and peer requirements came from npm registry metadata.

## Page and content plan

Build one complete page with anchor navigation. This keeps the resume easy to scan and supports direct links to projects or experience.

| Section | Resume content and presentation |
| --- | --- |
| Hero | Sahil Shah; proposed descriptor: “AI & Machine Learning · Python · SAP ABAP”; concise introduction identifying him as a Curtin Master of Computing graduate with professional Accenture experience. Buttons: View Projects, Download Resume and Contact. |
| About | Summarise the professional profile and incorporate dependable, adaptable and collaborative working attributes without repeating a separate soft-skills essay. |
| Featured projects | Large ECG project card, followed by chest X-ray disease detection and tuberculosis detection cards. Show dates, methods and supported results. |
| Skills | Group programming; AI and machine learning; data preparation and evaluation; cloud/database foundations; professional skills. Preserve the resume's distinction between foundational knowledge and practical experience. |
| Experience | Feature Accenture as relevant technical experience and retain Woolworths and Optus in a clearly dated additional-experience group. |
| Education | Curtin University Master of Computing, AI major, 2024–2026, Distinction, CWA 82.6%; L.D. College of Engineering BE, Electronics and Communication, 2018–2022, Distinction, CGPA 9.11. Do not invent a CGPA denominator. |
| Achievements | Two Dean's Letters of Commendation, Semester 2 2024 and Semester 1 2025; first place at Kaizen 2022 for the final-year project. |
| Contact/footer | Email, LinkedIn, optional telephone link and GitHub once supplied; repeat the resume download. Include a clean print layout. |

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

Use a small, consistent motion vocabulary throughout the page:

| Element | Planned behaviour |
| --- | --- |
| Hero introduction | Heading, summary and buttons enter in a short stagger, approximately 450–700 ms overall. |
| ECG illustration | Decorative SVG path draws once on entry, then settles. Label it as decorative for assistive technology. |
| Section reveals | Small upward movement and fade, 350–500 ms; play once as the section enters the viewport. |
| Project cards | Gentle elevation and border/accent transition on hover; equivalent visible keyboard focus. |
| Experience timeline | Draw the decorative timeline as its section comes into view; preserve readable static text. |
| Navigation | Active-section indicator and a subtle scroll progress line. |
| Buttons and mobile menu | Brief 150–220 ms feedback; maintain predictable keyboard operation. |

Implementation constraints: favour transform and opacity animation, keep native scrolling, minimise large blur effects, and ensure everything is readable if JavaScript fails. Honour `prefers-reduced-motion` in both CSS and JavaScript, including changes while the page is open. Reduced-motion mode removes the ECG drawing, movement and animated scrolling. Decorative effects must not delay access to content or run indefinitely. Simplify effects on small screens.

Use Motion's vanilla `animate`, `inView`, `stagger` and `scroll` APIs where appropriate; CSS handles straightforward hover/focus transitions. [Motion API overview](https://motion.dev/docs/quick-start) and [scroll API](https://motion.dev/docs/scroll).

## GitHub hosting plan

Recommended public repository: `<username>.github.io`, giving `https://<username>.github.io/`. GitHub Pages supports static sites and is available for public repositories on GitHub Free. A project repository is an alternative, with a URL under `/<repository>/`. [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

1. Obtain the GitHub username and check whether the account already has a user-site repository.
2. Keep the original resume files intact. During implementation, copy the PDF into `public/Sahil_Shah_Resume.pdf` so it is included in the generated site.
3. Set Astro's `site` to the real public URL. For a project site, also set `base` to the repository path and use base-aware asset/download links. Use static output.
4. Prepare `.github/workflows/deploy.yml` using Astro's official GitHub Pages workflow. Run checks and build before deployment, and publish the generated site on successful pushes to `main`.
5. Configure repository Settings → Pages → Source as GitHub Actions. Use the workflow's Pages permissions and deployment environment.
6. Verify the published URL, HTTPS, navigation, asset paths and PDF download. Add the URL to the GitHub profile website field; optionally link it from a profile README.

Deployment reference: [Astro's GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/). No backend is required for this plan. Contact uses an email link; any future form that sends messages needs a separate service. A custom domain can be added later.

## Implementation sequence and deliverables

1. **Foundation:** scaffold Astro in the workspace while preserving the source documents; install the selected packages; create the lockfile, scripts, strict type configuration and ignore rules.
2. **Content:** store typed resume data in `src/data/resume.ts`; implement semantic sections; add the PDF download and contact links. Check each factual claim against the PDF.
3. **Visual design:** define colours, typography, spacing and responsive layouts; build the hero illustration, project cards, experience timeline and print styles.
4. **Motion:** implement the animation specification with shared timings, reduced-motion support and readable no-JavaScript fallbacks.
5. **Validation:** run type checks and production build; inspect mobile, tablet and desktop; check keyboard navigation, menu behaviour, contact links and PDF download. Use Playwright for meaningful interaction checks and axe for automated accessibility findings, supplemented by manual review.
6. **Release preparation:** add title/description, canonical URL, social preview metadata, favicon, sitemap and robots.txt; prepare the deployment workflow and update instructions.
7. **Publish and verify:** connect the actual GitHub repository, deploy, verify the public site and link it from the profile. Account access and the repository choice are required for this phase.

Acceptance criteria:

- All resume sections are represented, with project metrics and dates faithfully retained.
- Layout works from 320 px mobile widths through desktop without horizontal overflow.
- Navigation and controls work with keyboard input and have visible focus states.
- Content remains readable with JavaScript disabled and with reduced motion enabled.
- Production checks/build pass; asset and resume URLs work under the selected hosting path.
- No critical/serious automated accessibility findings remain; manual keyboard and contrast review passes.
- Aim for mobile Lighthouse scores of 90+ in performance, accessibility, best practices and SEO; measure the finished build rather than guaranteeing scores in advance.
- Resume content can be updated from one data file; repeat deployment is documented.

## Inputs still to resolve

- GitHub username and intended repository; these are absent from the resume.
- Visual preference. Use the proposed charcoal/teal direction unless another preference is supplied.
- Intended LinkedIn destination and any project repository/demo links. Hide unavailable project actions.
- Confirm employment marked “Present” still reflects the intended public resume at launch.

These inputs do not prevent planning or local implementation. GitHub account access is needed only when configuring and publishing to that account.
