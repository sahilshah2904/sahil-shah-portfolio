# First-release implementation

## Architecture

Astro generates one static HTML page at `/sahil-shah-portfolio/`. The layout, metadata and semantic sections are in `src/pages/index.astro`; structured resume facts are in `src/data/resume.ts`. `Signal.astro` supplies original SVG artwork, and `global.css` contains the responsive/print design. Tailwind is connected through its Vite plugin, with custom CSS defining the visual language.

The build copies the original PDF to `public/` before generating `dist/`. The source and public PDF are both committed so the download works in development and production. No server, credential, database, external font request or analytics service is required by the website.

## Implemented experience

- A signal-led hero with an Anime.js entrance timeline and a finite waveform drawing.
- A drawn connecting signal leading into the featured ECG project.
- Four semantic chapters beside an SVG stage. On a sufficiently large viewport with motion enabled, the stage stays visible and transitions through a waveform, 19-class grid, three-model ensemble and labelled evaluation result.
- A contrasting light project explorer. Native disclosures work with keyboard input and without JavaScript; opening a project changes the conceptual illustration through an interruptible Anime.js transition.
- A connected skills composition, dated work/education journey, awards and direct email/GitHub/resume links.
- An animation preference control respecting OS reduced motion. Persistence is optional; unavailable storage does not break the page.

The first release uses a single `src/scripts/portfolio.ts` controller with an Anime.js scope and explicit cleanup. Scroll measurements are shared and updates coalesced with `requestAnimationFrame`; paused timelines are sought from current position. This avoids separate scroll engines measuring the same page. Resizing recalculates positions, and smaller viewports retain normal flow. Controller setup never hides essential text.

## Design decisions relative to the plan

The owner authorised the full build and push, so implementation continued through the prototype into a first release. Visual review can now take place on the delivered site. Colour and type choices remain refinable.

The optional interactive capability map is represented as an immediately readable connected skill flow. The journey uses a static connecting line; extra decorative path animation is deferred. These choices keep the three core interactions (hero handoff, ECG progression, project explorer) as the main focus.

Navigation stays visible on narrow screens rather than adding a mobile menu. Section text is never gated by timeline completion. The original stage has a static waveform fallback; its four chapter descriptions retain all evaluation facts in every mode.

LinkedIn and project-demo buttons are omitted pending verified URLs. Healthcare drawings are explicitly conceptual and include no patient data or invented screenshots. The source resume's “Present” wording is retained.

## Assets and maintenance

Original SVGs: `Signal.astro`, inline project artwork, `public/favicon.svg` and `public/social-preview.svg`. The PNG social preview is rendered from the SVG by `node scripts/capture.mjs`; Playwright Chromium must be installed first. With a running local preview, `node scripts/capture.mjs --site` also creates desktop/mobile screenshots in ignored `test-results/`.

System font stacks are used. Lucide supplies interface icons through the pinned package; retain dependency licence notices. No licence for reuse of personal resume content is introduced by this implementation.

## Release behaviour

The workflow validates PRs without deploying. On `main`, checks, documentation validation, the production build, bundle budget and browser tests must succeed before a Pages artifact deploys. Actions are pinned to commit SHAs, and Node is selected from `.nvmrc`. See the [deployment guide](DEPLOYMENT.md).
