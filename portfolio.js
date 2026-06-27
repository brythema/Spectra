/* ═══════════════════════════════════════════════════
   SPECTRA GROUP — PORTFOLIO.JS
   Shared chrome (nav) + Page hero slideshow,
   filter system, lightbox
═══════════════════════════════════════════════════ */

'use strict';

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

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
    });
  });
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

/* ── SMOOTH ANCHOR SCROLL (in-page links, e.g. footer) ── */
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

/* ── PAGE HERO SLIDESHOW ── */
(function initPageHeroSlideshow() {
  const slides = document.querySelectorAll('.page-hero-slide');
  if (!slides.length) return;
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
  }, 5000);
})();

/* ── FILTER SYSTEM ── */
(function initFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  if (!btns.length) return;

  // Check URL param for pre-filter (coming from homepage)
  const urlParams = new URLSearchParams(window.location.search);
  const preFilter = urlParams.get('filter');
  if (preFilter) applyFilter(preFilter);

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      applyFilter(btn.dataset.filter);
    });
  });

  function applyFilter(filter) {
    // Update buttons
    btns.forEach(b => b.classList.toggle('active', b.dataset.filter === filter));

    // Show/hide items
    items.forEach(item => {
      const match = filter === 'all' || item.dataset.filter === filter;
      item.classList.toggle('hidden', !match);
    });
  }
})();

/* ── LIGHTBOX ── */
(function initLightbox() {
  const lightbox   = document.getElementById('lightbox');
  const backdrop   = document.getElementById('lightboxBackdrop');
  const closeBtn   = document.getElementById('lightboxClose');
  const items      = document.querySelectorAll('.gallery-item');
  if (!lightbox) return;

  const tagClasses = { media: 'media-tag', web: 'web-tag', events: 'events-tag', business: 'business-tag' };

  function openLightbox(item) {
    const imgSrc   = item.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
    const title    = item.dataset.title    || '';
    const client   = item.dataset.client   || '';
    const division = item.dataset.division || '';
    const stat     = item.dataset.stat     || '';
    const filter   = item.dataset.filter   || '';
    const challenge = item.dataset.challenge || '';
    const approach  = item.dataset.approach  || '';
    const outcome   = item.dataset.outcome   || '';

    document.getElementById('lbImage').src     = imgSrc;
    document.getElementById('lbImage').alt     = title;
    document.getElementById('lbTitle').textContent    = title;
    document.getElementById('lbClient').textContent   = client;
    document.getElementById('lbStatBadge').textContent = stat;
    document.getElementById('lbChallenge').textContent = challenge;
    document.getElementById('lbApproach').textContent  = approach;
    document.getElementById('lbOutcome').textContent   = outcome;

    const tag = document.getElementById('lbTag');
    tag.textContent = division;
    tag.className   = 'lb-division-tag ' + (tagClasses[filter] || '');

    lightbox.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  items.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(item); }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
})();
