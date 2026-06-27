/* ═══════════════════════════════════════════════════
   SPECTRA GROUP — MAIN.JS (Homepage)
   Preloader, Hero Slideshow, Nav, Prism Progress,
   Scroll Reveals, Counters, Ecosystem Interactions
═══════════════════════════════════════════════════ */

'use strict';

/* ── PRELOADER ──
   Lock scrolling only while the preloader is actually shown,
   and ALWAYS release it again, even if #preloader isn't present
   or something goes wrong. (Previously: overflow was hidden
   unconditionally but only released inside an `if (preloader)`
   block, so pages without a #preloader element never scrolled.) */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return; // nothing to do, body stays scrollable

  document.body.style.overflow = 'hidden';

  function release() {
    preloader.classList.add('hidden');
    document.body.style.overflow = '';
  }

  window.addEventListener('load', () => {
    setTimeout(release, 1800);
  });

  // Safety net: never leave the page stuck if `load` is slow/misses.
  setTimeout(release, 4000);
})();

/* ── HERO SLIDESHOW ── */
(function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-slide-dots .dot');
  if (!slides.length) return;

  let current  = 0;
  let timer    = null;
  const DELAY  = 5000;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function next() { goTo(current + 1); }

  function start() { timer = setInterval(next, DELAY); }
  function stop()  { clearInterval(timer); }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stop();
      goTo(parseInt(dot.dataset.index, 10));
      start();
    });
  });

  start();
})();

/* ── NAVBAR SCROLL EFFECT ── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── HAMBURGER MENU ── */
(function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });

  // Close when a link is clicked
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
    });
  });
})();

/* ── SMOOTH ANCHOR SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── PRISM PROGRESS INDICATOR ── */
(function initPrismProgress() {
  const pp      = document.getElementById('prismProgress');
  const ppLines  = document.querySelectorAll('.pp-line');
  const ppLabels = document.querySelectorAll('.pp-labels span');
  if (!pp) return;

  const divisionSections = {
    media:    document.querySelectorAll('[data-div="media"]'),
    web:      document.querySelectorAll('[data-div="web"]'),
    events:   document.querySelectorAll('[data-div="events"]'),
    business: document.querySelectorAll('[data-div="business"]'),
  };

  function getActiveDivision() {
    const mid = window.scrollY + window.innerHeight / 2;
    for (const [div, sections] of Object.entries(divisionSections)) {
      for (const sec of sections) {
        const rect = sec.getBoundingClientRect();
        const top  = rect.top + window.scrollY;
        const bot  = top + rect.height;
        if (mid >= top && mid <= bot) return div;
      }
    }
    return null;
  }

  function update() {
    const scrolled = window.scrollY > 300;
    pp.classList.toggle('visible', scrolled);

    const active = getActiveDivision();

    ppLines.forEach(line => {
      line.classList.toggle('active', line.dataset.div === active);
    });
    ppLabels.forEach(label => {
      label.classList.toggle('active', label.dataset.div === active);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── SCROLL REVEAL ── */
(function initReveal() {
  const sections = document.querySelectorAll('.reveal-section');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* ── COUNTER ANIMATION ── */
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.round(easeOut(progress) * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ── PROCESS LINE ANIMATION ── */
(function initProcessLine() {
  const processSection = document.querySelector('.process');
  if (!processSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        processSection.classList.add('counted');
        observer.unobserve(processSection);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(processSection);
})();

/* ── ECOSYSTEM TILE TOUCH SUPPORT ── */
(function initEcoTiles() {
  const tiles = document.querySelectorAll('.eco-tile');
  if (!tiles.length) return;

  // On touch devices, first tap reveals CTA, second tap follows link
  tiles.forEach(tile => {
    let revealed = false;
    tile.addEventListener('click', (e) => {
      if (window.matchMedia('(hover: none)').matches) {
        if (!revealed) {
          e.preventDefault();
          revealed = true;
          // Hide other tiles
          tiles.forEach(t => { if (t !== tile) { t._revealed = false; } });
        }
      }
    });
  });
})();

/* ── PARALLAX — Vision section ── */
(function initParallax() {
  const visionBg = document.querySelector('.vision-bg');
  if (!visionBg) return;

  function onScroll() {
    const rect = visionBg.parentElement.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const progress = -rect.top / (rect.height + window.innerHeight);
    visionBg.style.transform = `scale(1.08) translateY(${progress * 30}px)`;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ── ACTIVE NAV LINK HIGHLIGHT ── */
(function initActiveNav() {
  const links    = document.querySelectorAll('.nav-links a');
  const current  = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === current || (current === '' && href === 'index.html'));
  });
})();
