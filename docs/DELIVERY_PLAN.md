# Delivery plan, risks and release criteria

Updated 21 September 2026. This is the execution plan for the proposed Anime.js portfolio, not a statement that implementation or testing is complete. Read the [experience specification](ANIMATION_DESIGN.md) for the design contract.

## Product outcomes and scope

Primary outcome: a recruiter can identify Sahil's focus, inspect the ECG project evidence, locate experience and download the resume without waiting for a presentation. Design outcome: an original, connected animated journey that demonstrates care and technical ability.

| Priority | Included work |
| --- | --- |
| Required for v1 | All sourced resume content; connected hero/ECG narrative; interactive secondary-project explorer; complete skills and dated experience/education; immediate contact/PDF access; mobile, keyboard, reduced-motion and script-failure baselines; GitHub Pages deployment; reproducible documentation. |
| Refine after the core passes | Additional skill-map highlights, finer SVG transitions, optional custom fonts, and subtle decorative polish within the same budgets. |
| Deferred | WebGL/3D scenes, live ML inference, CMS/blog, contact-form service, analytics, custom domain, multilingual content and complex page routing. |

Do not add the deferred features as incidental dependencies. Additional requests need an impact note covering time, assets, maintenance and performance, then an explicit scope decision. This controls growth without weakening the required animation experience.

## Responsibilities and assumptions

- Owner: Sahil supplies/corrects factual content, confirms profile/project destinations, reviews the prototype's visual direction and manages GitHub account settings where access is required.
- Implementer: prepares the architecture, assets, animation, validation evidence, workflow and documentation. Reports failed checks and tradeoffs early.
- Reviewer: checks content fidelity and the experience against acceptance criteria. This can be the owner; no additional personnel are assumed.

Assumptions: English-only static website, original SVG/CSS artwork, no mandatory portrait, no backend or form service, existing repository retained. Charcoal/teal is provisional. The reference is Anime.js's animation vocabulary; a specific alternative reference URL would refine the storyboard without automatically changing scope.

## Milestones and review gates

Estimates are planning ranges for one developer, excluding review waiting time and unexpected access problems. Re-estimate after the prototype. They are not a fixed delivery commitment.

| Milestone | Dependency | Deliverable and exit gate | Effort |
| --- | --- | --- | --- |
| M1 — Story and content | Existing plan/PDF | Scene storyboard, factual content map, original illustration sketches and list of unresolved links. Each resume section has a destination. | 0.5–1 day |
| M2 — Foundation and vertical slice | M1 | Astro shell, pinned lockfile, source content, hero-to-ECG prototype. Build/check pass; desktop, mobile, disabled-motion and failed-script views work. Owner can review an actual prototype. | 1.5–2.5 days |
| M3 — Full narrative | M2 technical gate; apply design feedback before broad polish | Remaining scenes, project explorer, navigation, preference control and print layout. Three distinct connected interactions demonstrated with complete content. | 2–3 days |
| M4 — Quality and hardening | M3 | Browser/interaction matrix, accessibility review, measured budgets, corrected defects and documented limitations. All release blockers resolved. | 1–2 days |
| M5 — Release and handoff | M4 plus repository access | Pages workflow, production-path verification, first deployment evidence, fresh-clone reproduction and current documentation. | 0.5–1 day |

Baseline total: approximately 5.5–9.5 developer days, plus 20–30% contingency until the prototype resolves motion complexity. The critical path runs through M2: failure there must trigger redesign or simplification of the expensive effect before repeating it across the site.

Each milestone ends with a short recorded update: completed output, checks and evidence, blockers/decisions, next work. Maintain entries in [PROJECT_LOG.md](PROJECT_LOG.md); add commit IDs and deployment links when available. Changes to agreed scope or a budget require an explanation and an updated plan.

## Technical decisions and boundaries

1. **Astro static output:** semantic resume HTML is delivered immediately; browser JavaScript enhances it. No server-only feature can become necessary for contact, navigation or content.
2. **Anime.js replaces Motion:** a single engine coordinates timeline and SVG work. CSS retains layout ownership. The animation controller has explicit cleanup and fallback contracts.
3. **Progressive enhancement:** meaningful content and links never depend on a completed animation. Sticky staging applies only when space and motion preferences permit it.
4. **One source for facts:** typed resume data derives from the source PDF. Artwork is illustrative; verified results are text, with their original metric labels.
5. **Project-path deployment:** `/sahil-shah-portfolio/` is part of the runtime environment. Test that path locally and in the deployed artifact, including the PDF and canonical metadata.
6. **Reproducible releases:** lock dependencies, record runtime/action versions, run checks before deployment and retain commit/run identifiers. Pin third-party actions to reviewed commit SHAs when implementing the workflow, with version comments for maintainability.

## Proposed performance budgets

These are project targets to test, not measured results or guarantees from Anime.js:

| Measure | Initial target | Evidence |
| --- | --- | --- |
| Initial JavaScript | At most 120 KiB gzip, first-party application and animation code combined. | Production bundle/network measurement; include chunks requested during initial load. |
| Initial page assets | At most 600 KiB transferred, excluding a user-triggered PDF download and genuinely deferred scenes. | Cold-cache network capture; record compression and test conditions. |
| Layout stability | CLS at most 0.1 in the chosen lab scenario. | Lighthouse/DevTools on the production build. |
| Largest content render | LCP at most 2.5 seconds in the documented mobile lab profile. | Median of three comparable cold-load runs; retain individual results. |
| Input response | Visible feedback begins within 200 ms in tested interactions. | Interaction traces for navigation, project selection and motion toggle. |
| Animation work | No animation-attributable main-thread task over 50 ms in the reference interaction trace; near-60 fps target on the nominated reference device. | Trace through the ECG scene and rapid selection; record device/browser. |
| General audit | Aim for 90+ mobile Lighthouse scores across performance, accessibility, best practices and SEO. | Recorded reports; supplement scores with manual testing. |

Nominate the reference laptop and available physical mobile device in M2. Test Chromium with a documented throttling profile and confirm touch behaviour on a real device when available. Lab results are not field Core Web Vitals claims. Budget misses trigger profiling and a simplified decorative effect; do not remove essential content or silently raise a target. Record any proposed exception and its consequence before release.

## Verification matrix

| Area | Required scenarios and observable pass condition |
| --- | --- |
| Content | Compare all sections against the PDF. Dates, qualifications and ECG metric labels remain accurate; no invented repository/demo links. |
| Journey | Demonstrate hero-to-ECG handoff, four pipeline states and project selection. Visuals connect the narrative; all essential facts remain accessible immediately. |
| Navigation | Open every anchor directly; refresh halfway down; use Back/Forward, Home/End, Page Down and rapid reverse scroll. Correct content is visible without forced focus changes. |
| Interaction | Repeat project selections, open/close menu and toggle animations mid-transition. Latest intent wins; focus and expanded states stay correct. |
| Layout | Inspect 320, 390, 768, 1024 and 1440 px widths, a short landscape viewport and 200% zoom. No clipped content or unintended horizontal overflow. |
| Browser | Automated Chromium, Firefox and WebKit checks on the production preview. Manually inspect current Safari/iOS and Chrome/Android when hardware is available; emulation is not a substitute for a physical-device claim. |
| Preferences | OS reduced motion before load and during use; site toggle; storage blocked. No unwanted motion or lost content; controls accurately expose state. |
| Failure | Disable JavaScript, block the animation module, delay fonts/assets and force a partial controller error. Readable content, navigation and download survive. |
| Accessibility | Keyboard-only route through every control, visible focus, skip link, sensible headings and screen-reader reading order. No decorative duplicate announcements or offscreen focus traps. Review contrast manually and resolve serious/critical axe findings. |
| Lifecycle | Repeat scene entry/exit, resize and Back/Forward restoration. No accumulating listeners/timelines, runaway animation, console exceptions or continuing offscreen loops. |
| Publication | Base-aware links, PDF contents, metadata, sitemap and HTTPS verified on the actual Pages URL. Print layout contains complete resume content. |

Use deterministic end states with animations disabled for layout screenshots; exercise enabled transitions separately. Browser checks should assert user-visible behaviour, not internal Anime.js implementation details. Performance traces and design review remain necessary alongside automated tests. Record unavailable environments explicitly.

## Risk register

| Risk | Severity | Prevention and response | Responsible role / checkpoint |
| --- | --- | --- | --- |
| Animation becomes decorative noise or repeated cards | High | Build the connected vertical slice first; review against the three required interactions before scene-wide polish. | Owner + implementer / M2 |
| Recruiters cannot reach facts quickly | High | Persistent direct links, readable text, no forced intro; test resume/contact access before any sequence finishes. | Reviewer / M2, M4 |
| SVG morphing or sticky staging performs poorly | High | Profile a bounded scene; simplify path geometry or crossfade drawings; disable sticky composition when it cannot fit. | Implementer / M2 |
| Reduced motion, touch or keyboard experience breaks | High | Design stable baselines first; test preferences and focus during interruptions. | Implementer / M2, M4 |
| Backward scroll, resize or re-entry corrupts state | High | Position-derived timeline state, explicit teardown and idempotent setup. | Implementer / M2, M4 |
| Stale content or overstated results | High | PDF traceability and owner review; metrics include names and evaluation context. | Owner + reviewer / M1, M4 |
| Broken project-path assets after deployment | High | Test the configured base path and production URLs, including filenames with case sensitivity. | Implementer / M4, M5 |
| Package/API mismatch | Medium | Validate Anime.js v4 imports and Astro checker compatibility with the installed lockfile; pin versions. | Implementer / M2 |
| Missing assets or profile links stall delivery | Medium | Original SVG art, typographic identity and omission of unverified actions; track unresolved factual links. | Owner + implementer / M1 |
| Unsupported physical-device claim | Medium | Record what was actually tested; obtain device review or explicitly accept the remaining coverage limitation. | Reviewer / M4 |
| Scope expands into services or 3D | Medium | Keep v1 scope visible; assess new dependencies, effort and maintenance before adding them. | Owner / every milestone |
| Deployment fails or publishes a regression | High | Gate deployment on checks; record successful commit; use reviewed revert and redeploy. | Implementer / M5 |

This register addresses known failure modes. New findings belong in the log and plan; completeness must be earned through implementation and testing rather than claimed in advance.

## Release gate and handoff

Block release for broken essential navigation/downloads, missing or incorrect core facts, inaccessible controls, loss of content in fallback modes, unresolved animation crashes, failed build/checks or broken production asset paths. Material budget misses require correction or a documented scope decision. Minor decorative inconsistencies can be recorded for later refinement when they do not affect use.

Before release, a clean checkout must reproduce installation, checks, build and preview from the written instructions. Update the README's status, actual source tree, commands, content-edit procedure and deployment guide. Preserve original SVG assets and record any external font/asset licences used. If recommending code reuse, the owner must choose an appropriate repository licence; do not assume a public repository grants permission to reuse personal resume content or artwork.

Record the released commit, workflow run, final URL, validation reports, browser/device coverage and known limitations. Verify PDF and contact links after deployment, then follow the [deployment recovery guide](DEPLOYMENT.md) for any regression. Future content or dependency changes repeat the checks relevant to their impact.
