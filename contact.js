/* ═══════════════════════════════════════════════════
   SPECTRA GROUP — CONTACT.JS
   Shared chrome (nav) + Page hero slideshow,
   project builder wizard
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

/* ── PROJECT BUILDER ── */
(function initBuilder() {
  const state = {
    goal:     null,
    timeline: null,
    budget:   null,
    name:     '',
    email:    '',
    phone:    '',
    brand:    '',
    extra:    ''
  };

  const totalSteps   = 4;
  const progressFill = document.getElementById('pbProgressFill');
  const stepLabel    = document.getElementById('pbStepLabel');

  // Goal labels for summary
  const goalLabels = {
    brand:    'Build my brand',
    content:  'Capture content / media',
    digital:  'Build a website or digital product',
    event:    'Plan or produce an event',
    talent:   'Manage my talent or career',
    grow:     'Grow my business strategically',
    multiple: 'Full-spectrum solution'
  };

  // Recommended teams per goal
  const teamMap = {
    brand:    ['team-media', 'team-business'],
    content:  ['team-media'],
    digital:  ['team-web'],
    event:    ['team-events'],
    talent:   ['team-business'],
    grow:     ['team-business'],
    multiple: ['team-media', 'team-web', 'team-events', 'team-business']
  };
  const teamNames = {
    'team-media':    'Creative Media',
    'team-web':      'Web, App & AI',
    'team-events':   'Spectra Experience',
    'team-business': 'Business & Talent'
  };

  const timelineLabels = {
    'immediately': 'Immediately (this week)',
    '2-4weeks':    '2–4 Weeks',
    '1-3months':   '1–3 Months',
    'exploring':   'Just exploring for now'
  };
  const budgetLabels = {
    'under500k': 'Under ₦500,000',
    '500k-2m':   '₦500k – ₦2M',
    '2m-5m':     '₦2M – ₦5M',
    'above5m':   'Above ₦5M',
    'discuss':   'Prefer to discuss'
  };

  function setStep(n) {
    document.querySelectorAll('.pb-step').forEach(s => s.classList.remove('active'));
    const next = document.getElementById('step' + n);
    if (next) next.classList.add('active');

    const pct = (n / totalSteps) * 100;
    if (progressFill) progressFill.style.width = pct + '%';
    if (stepLabel) {
      stepLabel.textContent = n <= totalSteps ? `Step ${n} of ${totalSteps}` : 'Complete';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ── STEP 1: Goal Selection ── */
  document.querySelectorAll('#step1 .pb-option').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#step1 .pb-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.goal = btn.dataset.value;
      setTimeout(() => setStep(2), 240);
    });
  });

  /* ── STEP 2: Timeline + Budget ── */
  document.querySelectorAll('[data-field="timeline"]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-field="timeline"]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.timeline = btn.dataset.value;
    });
  });
  document.querySelectorAll('[data-field="budget"]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-field="budget"]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.budget = btn.dataset.value;
    });
  });

  /* ── STEP 2 NAV ── */
  const step2Next = document.querySelector('#step2 .pb-next-btn');
  if (step2Next) {
    step2Next.addEventListener('click', () => {
      if (!state.timeline) {
        showError(step2Next, 'Please select a timeline first.');
        return;
      }
      setStep(3);
    });
  }
  const step2Back = document.querySelector('#step2 .pb-back-btn');
  if (step2Back) step2Back.addEventListener('click', () => setStep(1));

  /* ── STEP 3: Contact Details ── */
  const buildSummaryBtn = document.getElementById('buildSummaryBtn');
  if (buildSummaryBtn) {
    buildSummaryBtn.addEventListener('click', () => {
      const name  = document.getElementById('pb-name').value.trim();
      const email = document.getElementById('pb-email').value.trim();
      const phone = document.getElementById('pb-phone').value.trim();

      if (!name || !email || !phone) {
        showError(buildSummaryBtn, 'Please fill in name, email, and phone.');
        return;
      }
      if (!isValidEmail(email)) {
        showError(buildSummaryBtn, 'Please enter a valid email address.');
        return;
      }

      state.name  = name;
      state.email = email;
      state.phone = phone;
      state.brand = document.getElementById('pb-brand').value.trim();
      state.extra = document.getElementById('pb-extra').value.trim();

      buildSummary();
      setStep(4);
    });
  }
  const step3Back = document.querySelector('#step3 .pb-back-btn');
  if (step3Back) step3Back.addEventListener('click', () => setStep(2));

  /* ── BUILD SUMMARY ── */
  function buildSummary() {
    const container = document.getElementById('pbSummary');
    if (!container) return;

    const teams  = teamMap[state.goal] || ['team-business'];
    const teamHTML = teams.map(t =>
      `<span class="${t}">${teamNames[t]}</span>`
    ).join('');

    container.innerHTML = `
      <div class="pb-summary-row">
        <h5>Your Goal</h5>
        <p>${goalLabels[state.goal] || state.goal}</p>
      </div>
      <div class="pb-summary-row">
        <h5>Timeline</h5>
        <p>${timelineLabels[state.timeline] || state.timeline}</p>
      </div>
      ${state.budget ? `<div class="pb-summary-row">
        <h5>Budget Range</h5>
        <p>${budgetLabels[state.budget] || state.budget}</p>
      </div>` : ''}
      <div class="pb-summary-row">
        <h5>Contact</h5>
        <p>${state.name} · ${state.email} · ${state.phone}</p>
      </div>
      ${state.brand ? `<div class="pb-summary-row"><h5>Brand / Company</h5><p>${state.brand}</p></div>` : ''}
      ${state.extra ? `<div class="pb-summary-row"><h5>Additional Notes</h5><p>${state.extra}</p></div>` : ''}
      <div class="pb-summary-row">
        <h5>Recommended Team</h5>
        <div class="pb-summary-team">${teamHTML}</div>
      </div>
      <div class="pb-summary-row" style="border:none; padding:0; background: rgba(255,255,255,0.02); border-radius:8px; padding:1rem;">
        <p style="font-size:0.8rem; color:var(--gray-light); line-height:1.7;">
          We'll review your inquiry and reach out within <strong style="color:var(--white)">24 hours</strong>, prepared with relevant portfolio examples and initial ideas.
        </p>
      </div>
    `;
  }

  /* ── STEP 4 BACK ── */
  const step4Back = document.querySelector('#step4 .pb-back-btn');
  if (step4Back) step4Back.addEventListener('click', () => setStep(3));

  /* ── SUBMIT ── */
  const submitBtn = document.getElementById('pbSubmitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Simulate submission (replace with real endpoint)
      setTimeout(() => {
        setStep(5);
        if (progressFill) progressFill.style.width = '100%';
        if (stepLabel) stepLabel.textContent = 'Complete ✦';
      }, 1200);
    });
  }

  /* ── HELPERS ── */
  function isValidEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  function showError(btn, msg) {
    const existing = btn.parentElement.querySelector('.pb-error');
    if (existing) existing.remove();
    const err = document.createElement('p');
    err.className = 'pb-error';
    err.textContent = msg;
    err.style.cssText = 'color:#ef4444;font-size:0.8rem;font-family:var(--font-ui);margin:0;';
    btn.parentElement.insertBefore(err, btn);
    setTimeout(() => err.remove(), 3500);
  }
})();
