# Experience and animation specification

Status: design contract, revised 21 September 2026 from the owner's request for Anime.js-style flow. The first implementation is built; see [implementation notes](IMPLEMENTATION.md) for delivered scope and tradeoffs, and [validation results](VALIDATION.md) for test evidence. Read with the [website plan](../WEBSITE_PLAN.md) and [delivery plan](DELIVERY_PLAN.md).

## Experience intent

The visitor should experience an authored story: **From signal to insight**. The introduction establishes Sahil's identity; an ECG signal leads into how he prepared data, compared models and evaluated results; related projects and capabilities follow; experience, education and achievements establish context; contact is the final destination.

Working interpretation of the reference is [Anime.js's website](https://animejs.com/): coordinated typography, responsive geometry, timelines and SVG motion. Create an original composition based on Sahil's work. The palette is provisional. Use a changing visual stage, editorial layouts and connected transitions; repeated reveal-on-scroll blocks alone do not fulfil the brief.

The recruiter also has an immediate task: assess experience, find evidence and obtain the resume. Keep section anchors, Download Resume and Contact accessible from the start. No splash screen, loading percentage or forced sequence precedes those actions.

## Storyboard

| Scene | Composition and content | Motion and interaction | Stable fallback |
| --- | --- | --- | --- |
| 1. Identity | Large name and concise AI/SAP introduction alongside an original signal drawing. | A short entrance assembles the visual, then the signal continues toward the ECG scene. Intro finishes within 1.2 seconds; links are never disabled. | Full heading, summary and links plus a static waveform. |
| 2. Signal to insight | On roomy screens, an SVG stage sits beside four readable chapters: records, preparation, modelling, evaluation. | The stage changes with native scroll progress: record marks converge, processing connections draw, ensemble branches join, then results settle. | All four chapters and one labelled pipeline illustration in normal flow. |
| 3. Project explorer | A contrasting editorial composition presents chest X-ray and tuberculosis projects, each with dates, methods and outcomes. | Native disclosure controls reveal details and transition an illustrative graphic. Rapid selections settle on the latest choice. | Native disclosures work without JavaScript; print styles expand them. |
| 4. Capabilities | A compact method-to-project map accompanied by grouped skills. | Focus/tap highlights a documented relationship; a shared line connects the scene to the previous one. | A readable skills list and textual project associations. |
| 5. Journey | Career and education follow separate, clearly dated tracks; awards are attached to the relevant context. Preserve overlap between work and study. | A connecting line draws toward the active milestone; labels stay readable. On mobile use a compact vertical path. | A dated list in sensible reading order. |
| 6. Contact | Signal resolves into a quiet composition with email, resume and verified profile links. | Brief settling movement; everything stops when interaction stops. | Ordinary links and print-friendly contact text. |

The ECG result view must explicitly show 0.964 macro AUROC and 0.710 macro AUPRC on 9,578 held-out records. Dataset scale, 63,851 records, belongs to the preparation context. Do not animate metric values through misleading intermediate values or call AUROC accuracy. Draw a small representative set of record marks; do not create one DOM node per ECG record.

Illustrations are conceptual SVGs, not patient data, diagnostic examples or fabricated application screenshots. No new medical performance claim is implied by a transition.

## Navigation and motion modes

- Use a single semantic document with stable section IDs. Navigation uses real anchors. The active-section indicator follows reading position without moving keyboard focus or rewriting the URL on every scroll tick.
- A deep link must land on visible content even before animation loads. Account for the sticky header using scroll margin. Test refresh and browser Back/Forward restoration.
- Provide an “Animations” control with enabled/disabled state exposed to assistive technology. Respect the operating system's reduced-motion preference; the site control may further disable motion but must not override an OS request to reduce it.
- Persist the site preference locally when storage is available; blocked storage must not break navigation or rendering. Apply the preference before starting any motion. No-JavaScript visitors see the readable baseline.
- Ordinary wheel, touch, trackpad, Page Down and keyboard scrolling remain native. No scroll locking, forced snapping or drag-only navigation.

## Responsive composition

Initial eligibility for the sticky ECG stage: viewport at least 1024 px wide and 700 px tall, with motion enabled. These are prototype starting points, to be validated against content fit. The stage is contained within its own section, whose total height should not exceed three viewport heights. Narrative text determines the final height; avoid empty scrolling to prolong an effect.

On smaller or shorter screens, use normal document flow and brief local drawings. Native project disclosures and all content remain available. No persistent pinned stage on mobile. Use stable viewport units where appropriate and check mobile browser toolbar expansion, orientation changes and browser zoom. If the sticky composition cannot fit at 200% zoom, it must fall back to normal flow.

Decorative layers use `pointer-events: none` and cannot cover links or focus outlines. Touch users receive controls equivalent to hover features. Start with 44 by 44 CSS-pixel interactive targets and adequate spacing. Do not require horizontal scrolling to read text.

## Animation architecture

Use `animejs@4.5.0` as the sole orchestration dependency. Its documented tools include [timelines](https://animejs.com/documentation/timeline), [scopes](https://animejs.com/documentation/scope), [scroll events](https://animejs.com/documentation/events) and [SVG utilities](https://animejs.com/documentation/svg). Verify the v4 imports and behaviour against the installed package before implementation; avoid copying v3 snippets.

Proposed modules under `src/scripts/animation/`:

| Module | Responsibility |
| --- | --- |
| `preferences.ts` | Resolve OS/site preferences and notify controllers on changes. |
| `controller.ts` | Initialise scenes once, manage modes, register cleanup and handle failure. |
| `tokens.ts` | Shared durations, easing and distance limits. |
| `scenes/hero.ts` | Finite introduction and signal handoff. |
| `scenes/ecg.ts` | Stage progress, SVG timeline and chapter correspondence. |
| `scenes/projects.ts` | Disclosure enhancement and interruptible illustration changes. |
| `scenes/journey.ts` | Career/education path enhancement. |

DOM content exists before controllers initialise. Each scene exposes setup and teardown; use a scene-local scope for Anime.js objects and explicit cleanup for independently registered listeners/observers. CSS and Anime.js must not simultaneously own the same transform; use nested wrappers if both need separate transforms.

Use `createTimeline` to coordinate scene changes and `createScope` to contain targets and responsive settings. Prototype `onScroll` for progress and SVG drawing/morphing utilities where appropriate. Morph only compatible, deliberately authored paths; a brief crossfade between two original drawings is the fallback if geometry changes prove expensive or unreadable. The documented APIs support the approach, but compatibility and performance remain prototype results to establish.

## State and lifecycle contract

| Event | Required behaviour |
| --- | --- |
| First load | Render readable baseline; enhance only after required elements and preferences are available. A failed module leaves content usable. |
| Enter active scene | Initialise once, then derive stage state from current position; do not assume the visitor started at the top. |
| Reverse or fast scroll | Seek to clamped progress from 0 to 1; identical positions produce identical visual state. Text is not gated by callback order. |
| Repeated click/tap | Cancel or retarget the previous transition; the most recent intent wins. Avoid accumulating timelines. |
| Resize, font load or rotation | Coalesce measurements, recompute bounds, preserve reading position and discard obsolete transforms. |
| Reduced motion/site toggle | Tear down moving effects and sticky mode, restore stable layout and keep focus on the initiating control. |
| Hidden browser tab | Pause time-driven decorative work. On return, recompute state rather than replaying missed motion. |
| Navigation/reinitialisation | Revert animation scopes and disconnect listeners/observers. No duplicate handlers after Back/Forward restoration. |
| Partial setup failure | Revert partial effects, remove enhancement-only styles and expose all content. Other navigation remains functional. |

Do not hide entire resume sections using CSS that depends on JavaScript completing. Animate decorative elements and optional wrappers while retaining stable semantic text. Moving decorative duplicates are hidden from assistive technology and contain no focusable controls. Native disclosures own their expanded state; animation only enhances their presentation.

## Timing and resource policy

Starting tokens: feedback 120–180 ms; local transitions 250–450 ms; narrative transitions 500–900 ms. Scroll-linked sequences are tied to position rather than elapsed delays. Limit layout-changing and filter effects; prefer transform and opacity for large elements. SVG path work belongs in small, bounded drawings. Avoid endless marquees, animated backgrounds and autoplay loops.

Only nearby scenes initialise expensive animation work. Share measurements and avoid layout reads interleaved with writes on every frame. The page should settle when idle. Validate actual traces rather than treating the library's advertised bundle size as the application's size.

## Prototype acceptance

The first playable slice must include the hero-to-ECG handoff, all four ECG visual states, usable chapter anchors, and mobile/reduced-motion baselines. Record a desktop and mobile demonstration plus trace notes. The owner reviews whether the connected-flow direction matches the brief; development can continue on independent content while that review is pending.

Technical pass requires predictable reverse/fast scroll, refresh at a deep link, rapid resize, motion-toggle changes, no trapped keyboard focus, and content available when the animation module is blocked. Broader test and release criteria are in the [delivery plan](DELIVERY_PLAN.md#verification-matrix).
