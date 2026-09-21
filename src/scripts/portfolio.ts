import { animate, createTimeline, createScope, svg, stagger } from 'animejs';
import type { JSAnimation, Scope, Timeline } from 'animejs';

export function initPortfolio() {
  const root = document.documentElement;
  const toggle = document.querySelector<HTMLButtonElement>('#motion-toggle');
  const label = document.querySelector<HTMLElement>('#motion-label');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const roomy = matchMedia('(min-width: 1024px) and (min-height: 700px)');
  const chapters = Array.from(document.querySelectorAll<HTMLElement>('.pipeline-chapter'));
  const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.site-header nav a'));
  const disclosures = Array.from(document.querySelectorAll<HTMLDetailsElement>('.project-detail'));
  const stageLabels = ['01 / DATA', '02 / PREPARATION', '03 / MODELLING', '04 / EVALUATION'];
  const captions = ['63,851 RECORDS · THREE DATASETS', '19 SNOMED CT CLASSES', 'THREE COMPLEMENTARY MODELS', '9,578 HELD-OUT RECORDS'];
  let userDisabled = root.dataset.motion === 'off';
  let enabled = false;
  let scope: Scope | undefined;
  let pipelineTimeline: Timeline | undefined;
  let bridgeTimeline: Timeline | undefined;
  let projectAnimation: JSAnimation | undefined;
  let intro: Timeline | undefined;
  let frame = 0;
  let currentProject = 'xray';
  let chapterPositions: number[] = [];
  let navPositions: number[] = [];
  let bridgeTop = 0;
  let pageHeight = 1;
  let lastStep = -1;
  let destroyed = false;
  const controller = new AbortController();
  const listener = { signal: controller.signal };
  const query = <T extends Element = HTMLElement>(selector: string) => document.querySelector<T>(selector);

  function measure() {
    chapterPositions = chapters.map(el => el.getBoundingClientRect().top + scrollY);
    navPositions = navLinks.map(a => query(a.hash)?.getBoundingClientRect().top ?? 0).map(top => top + scrollY);
    bridgeTop = (query('.signal-bridge')?.getBoundingClientRect().top ?? 0) + scrollY;
    pageHeight = Math.max(1, root.scrollHeight - innerHeight);
    requestFrame();
  }

  function renderScroll() {
    frame = 0;
    if (destroyed || document.hidden) return;
    const focusLine = scrollY + Math.min(innerHeight * .42, 350);
    let step = 0;
    for (let i = 0; i < chapterPositions.length; i++) if (focusLine >= chapterPositions[i]) step = i;
    if (step !== lastStep) {
      lastStep = step;
      const stageLabel = query('#stage-label');
      const stageCaption = query('#stage-caption');
      if (stageLabel) stageLabel.textContent = stageLabels[step];
      if (stageCaption) stageCaption.textContent = captions[step];
      document.querySelectorAll<HTMLAnchorElement>('[data-step-link]').forEach((link, i) => {
        if (i === step) link.setAttribute('aria-current', 'step'); else link.removeAttribute('aria-current');
      });
    }
    if (pipelineTimeline) {
      const index = Math.min(step, 2);
      const nextDistance = Math.max(1, chapterPositions[index + 1] - chapterPositions[index]);
      const progress = Math.max(0, Math.min(3, index + (focusLine - chapterPositions[index]) / nextDistance));
      pipelineTimeline.seek(progress * 1000);
    }
    if (bridgeTimeline) bridgeTimeline.seek(Math.max(0, Math.min(1, (scrollY + innerHeight - bridgeTop) / (innerHeight * .8))) * 1000);
    const progress = query('.reading-progress');
    if (progress) progress.style.transform = `scaleX(${Math.min(1, scrollY / pageHeight)})`;
    let activeNav = -1;
    navPositions.forEach((position, i) => { if (focusLine >= position) activeNav = i; });
    navLinks.forEach((link, i) => {
      if (i === activeNav) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  }

  function requestFrame() { if (!frame && !destroyed) frame = requestAnimationFrame(renderScroll); }

  function alignHashTarget() {
    if (!location.hash) return;
    const target = query(location.hash);
    if (!target) return;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    scrollTo(0, Math.max(0, target.getBoundingClientRect().top + scrollY - 100));
    root.style.scrollBehavior = previousBehavior;
    measure();
  }

  function showProject(id: string, shouldAnimate = true) {
    currentProject = id;
    projectAnimation?.revert();
    projectAnimation = undefined;
    const art = query('.explorer-art');
    const xray = query<SVGGElement>('.xray-art');
    const tb = query<SVGGElement>('.tb-art');
    if (!art || !xray || !tb) return;
    art.dataset.project = id;
    xray.style.opacity = id === 'xray' ? '1' : '0';
    tb.style.opacity = id === 'tb' ? '1' : '0';
    const number = query('#explorer-number');
    const caption = query('#explorer-caption');
    if (number) number.textContent = id === 'xray' ? '02' : '03';
    if (caption) caption.textContent = id === 'xray' ? 'CLASSIFY / LOCALISE / EXPLAIN' : 'LEARN / COMBINE / DELIVER';
    if (enabled && shouldAnimate) {
      projectAnimation = animate(id === 'xray' ? xray : tb, { opacity: [0, 1], translateY: [12, 0], duration: 400, ease: 'out(3)' });
    }
  }

  function setupMotion(playIntro: boolean) {
    scope?.revert();
    projectAnimation?.revert();
    pipelineTimeline = undefined;
    bridgeTimeline = undefined;
    intro = undefined;
    enabled = !userDisabled && !preference.matches;
    root.dataset.motion = enabled ? 'on' : 'off';
    if (toggle && label) {
      toggle.hidden = false;
      toggle.disabled = preference.matches;
      toggle.setAttribute('aria-pressed', String(enabled));
      label.textContent = preference.matches ? 'Reduced motion' : enabled ? 'Animations on' : 'Animations off';
      toggle.title = preference.matches ? 'Your system preference reduces animation.' : 'Toggle decorative animations';
    }
    if (!enabled) { showProject(currentProject, false); measure(); return; }
    try {
      scope = createScope({ root: document.body });
      scope.add(() => {
        if (playIntro && scrollY < 100) {
          intro = createTimeline({ defaults: { ease: 'out(3)' } })
            .add('.hero .eyebrow', { translateY: [8, 0], opacity: [.5, 1], duration: 500 }, 0)
            .add('.hero h1', { translateY: [16, 0], duration: 800 }, 70)
            .add('.hero .signal-wave', { strokeDashoffset: [1200, 0], strokeDasharray: [1200, 1200], duration: 1100 }, 0)
            .add('.hero .signal-nodes circle', { scale: [.4, 1], opacity: [.3, 1], delay: stagger(55), duration: 450 }, 100);
        }
        if (roomy.matches) {
          pipelineTimeline = createTimeline({ autoplay: false, defaults: { ease: 'inOut(2)' } })
            .add('.pipeline .wave-layer', { opacity: [1, 0], duration: 700 }, 300)
            .add('.prepare-layer', { opacity: [0, 1], duration: 700 }, 300)
            .add('.prepare-layer', { opacity: [1, 0], duration: 700 }, 1300)
            .add('.ensemble-layer', { opacity: [0, 1], duration: 700 }, 1300)
            .add('.ensemble-layer', { opacity: [1, 0], duration: 700 }, 2300)
            .add('.evaluation-layer', { opacity: [0, 1], duration: 700 }, 2300)
            .add('.pipeline .orbit-field', { rotate: [0, 24], opacity: [.26, .1], duration: 3000, ease: 'linear' }, 0);
        }
        const bridge = query<SVGPathElement>('.bridge-path');
        if (bridge) bridgeTimeline = createTimeline({ autoplay: false }).add(svg.createDrawable(bridge), { draw: ['0 0', '0 1'], duration: 1000, ease: 'linear' });
      });
      root.dataset.enhanced = 'true';
    } catch (error) {
      scope?.revert();
      enabled = false;
      root.dataset.motion = 'off';
      delete root.dataset.enhanced;
      if (toggle) toggle.hidden = true;
      console.warn('Decorative animation unavailable; readable portfolio retained.', error);
    }
    showProject(currentProject, false);
    measure();
  }

  toggle?.addEventListener('click', () => {
    userDisabled = !userDisabled;
    try { localStorage.setItem('portfolio-motion', userDisabled ? 'off' : 'on'); } catch { /* Optional persistence. */ }
    setupMotion(false);
  }, listener);
  disclosures.forEach(detail => detail.addEventListener('toggle', () => {
    if (detail.open) showProject(detail.dataset.projectId ?? 'xray');
    measure();
  }, listener));
  preference.addEventListener('change', () => setupMotion(false), listener);
  roomy.addEventListener('change', () => setupMotion(false), listener);
  addEventListener('scroll', requestFrame, { passive: true, signal: controller.signal });
  addEventListener('resize', measure, { passive: true, signal: controller.signal });
  addEventListener('hashchange', alignHashTarget, listener);
  addEventListener('pageshow', () => requestAnimationFrame(alignHashTarget), listener);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { intro?.complete(); projectAnimation?.complete(); }
    else measure();
  }, listener);

  let printStates: boolean[] = [];
  addEventListener('beforeprint', () => { printStates = disclosures.map(detail => detail.open); disclosures.forEach(detail => { detail.open = true; }); }, listener);
  addEventListener('afterprint', () => { disclosures.forEach((detail, i) => { detail.open = printStates[i] ?? detail.open; }); measure(); }, listener);
  const resizeObserver = new ResizeObserver(measure);
  resizeObserver.observe(document.body);
  setupMotion(true);
  requestAnimationFrame(alignHashTarget);
  document.fonts.ready.then(() => { if (!destroyed) { alignHashTarget(); measure(); } });

  addEventListener('pagehide', (event: PageTransitionEvent) => {
    if (event.persisted) return;
    destroyed = true;
    controller.abort();
    resizeObserver.disconnect();
    cancelAnimationFrame(frame);
    projectAnimation?.revert();
    scope?.revert();
  }, { once: true });
}
