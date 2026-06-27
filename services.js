/* ═══════════════════════════════════════════════════
   SPECTRA GROUP — SERVICES.JS
   Shared chrome (nav) + Studio slideshows, sticky nav,
   service overlay system, WhatsApp funneling
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
  let current = 0;
  function next() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }
  setInterval(next, 5000);
})();

/* ── STUDIO SLIDESHOWS ── */
(function initStudioSlideshows() {
  document.querySelectorAll('.studio-hero-band').forEach((band, idx) => {
    const slides = band.querySelectorAll('.studio-slide');
    if (slides.length < 2) return;
    let cur = 0;
    setTimeout(() => {
      setInterval(() => {
        slides[cur].classList.remove('active');
        cur = (cur + 1) % slides.length;
        slides[cur].classList.add('active');
      }, 6000);
    }, idx * 1200);
  });
})();

/* ── STICKY STUDIO NAV ── */
(function initServicesSticky() {
  const nav     = document.getElementById('stickyStudioNav');
  const items   = document.querySelectorAll('.ssn-item');
  const studios = document.querySelectorAll('.studio-section[data-div]');
  if (!nav || !studios.length) return;

  function getActive() {
    const mid = window.scrollY + window.innerHeight * 0.4;
    let active = null;
    studios.forEach(s => {
      const top = s.getBoundingClientRect().top + window.scrollY;
      if (mid >= top) active = s.id;
    });
    return active;
  }

  function update() {
    const scrolled = window.scrollY > window.innerHeight * 0.6;
    nav.classList.toggle('visible', scrolled);
    const active = getActive();
    items.forEach(item => item.classList.toggle('active', item.dataset.target === active));
  }

  window.addEventListener('scroll', update, { passive: true });
  update();

  items.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(item.dataset.target);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ── HASH SCROLL (from homepage links, e.g. index.html#web → services.html#web) ── */
(function handleServicesHash() {
  const hash = window.location.hash;
  if (!hash) return;
  setTimeout(() => {
    const el = document.querySelector(hash);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
  }, 600);
})();

/* ══════════════════════════════════════════════════
   SERVICE OVERLAY SYSTEM + WHATSAPP FUNNELING
══════════════════════════════════════════════════ */

const WA = '2347042776167';

function waLink(msg) {
  return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
}

function waMsg(service, extra) {
  return `Hi Spectra 👋\n\nI'm interested in: ${service}.\n\nBusiness/Project: \nTimeline: \nBudget: \n\n${extra || 'Can we set up a quick call to discuss?'}`;
}

/* ── OVERLAY DATA ── */
const overlayData = {

  /* ════ MEDIA ════ */
  'media-photo': {
    tag: 'Creative Media', tagClass: 'media-tag',
    title: 'Brand Photography & Videography',
    desc: 'Every image is a decision your audience makes about you before you speak. We make sure that decision goes your way — with cinematic, strategic visuals built for the platforms that matter.',
    bentoClass: 'bento-media', waClass: 'bento-wa-media',
    items: [
      { label: 'Brand Photography Session', desc: 'Full shoot for business identity — portraits, workspace, product, lifestyle. Delivered edited and ready for every platform.', wa: waMsg('Brand Photography Session') },
      { label: 'Product Photography', desc: 'Clean, craveable product images that make buyers feel certain before they click purchase.', wa: waMsg('Product Photography') },
      { label: 'Corporate Headshots & Portraits', desc: 'Executive and team portraits that communicate professionalism and personality.', wa: waMsg('Corporate Headshots & Portraits') },
      { label: 'Event Coverage & Documentation', desc: 'Full-day photography at your event — candid, editorial, and delivered fast.', wa: waMsg('Event Coverage & Documentation') },
      { label: 'Music Video Production', desc: 'Concept-to-delivery music video production at cinematic standards, on a timeline that works for you.', wa: waMsg('Music Video Production') },
      { label: 'Real Estate Photography', desc: 'Interior and exterior photography and video that makes properties irresistible.', wa: waMsg('Real Estate Photography') },
      { label: 'Food & Restaurant Photography', desc: 'Cinematic food visuals that make people hungry before they even read the menu.', wa: waMsg('Food & Restaurant Photography') },
      { label: 'Behind-the-Scenes Content', desc: 'Document your process, your team, your story — the content that builds the deepest trust.', wa: waMsg('Behind-the-Scenes Content') },
    ]
  },

  'media-graphics': {
    tag: 'Creative Media', tagClass: 'media-tag',
    title: 'Graphics & Visual Identity',
    desc: 'Your brand\'s visual identity is working or failing every second it\'s in front of someone. We build design systems that are instantly recognisable, deeply consistent, and made to last.',
    bentoClass: 'bento-media', waClass: 'bento-wa-media',
    items: [
      { label: 'Logo & Brand Identity Design', desc: 'Primary logo, variations, colour system, typography, and brand guidelines — everything in one package.', wa: waMsg('Logo & Brand Identity Design') },
      { label: 'Social Media Template Pack', desc: '10–20 custom, editable templates built for your brand — posts, stories, reels covers, and highlights.', wa: waMsg('Social Media Template Pack') },
      { label: 'Pitch Deck Design', desc: 'Investment-grade slide design that makes your idea impossible to dismiss.', wa: waMsg('Pitch Deck Design') },
      { label: 'Flyer & Print Design', desc: 'Event flyers, banners, brochures, and print materials that look as premium in person as they do on screen.', wa: waMsg('Flyer & Print Design') },
      { label: 'Brand Style Guide', desc: 'A complete document your team and vendors use to keep your brand consistent across every touchpoint.', wa: waMsg('Brand Style Guide') },
      { label: 'YouTube / Podcast Visual Kit', desc: 'Channel art, thumbnail templates, episode covers — a full visual system for your content.', wa: waMsg('YouTube / Podcast Visual Kit') },
      { label: 'Merchandise & Apparel Graphics', desc: 'Print-ready graphics for branded merch, clothing, and packaging.', wa: waMsg('Merchandise & Apparel Graphics') },
    ]
  },

  'media-content': {
    tag: 'Creative Media', tagClass: 'media-tag',
    title: 'Content Creation & Livestream',
    desc: 'The brands that win online show up consistently and look good every time. We build content systems — not one-off posts — so your brand stays visible, relevant, and professional week after week.',
    bentoClass: 'bento-media', waClass: 'bento-wa-media',
    items: [
      { label: 'Monthly Social Media Content Package', desc: 'Photography, graphics, captions, and a content calendar — produced monthly so you never have to think about what to post.', wa: waMsg('Monthly Social Media Content Package') },
      { label: 'Instagram & TikTok Reels Production', desc: 'Short-form vertical video that performs — scripted, shot, edited, and delivered ready to upload.', wa: waMsg('Instagram & TikTok Reels Production') },
      { label: 'YouTube Video Production', desc: 'Long-form video content produced at broadcast quality — shot, edited, thumbnails, and SEO-optimised.', wa: waMsg('YouTube Video Production') },
      { label: 'Podcast Production (Audio + Video)', desc: 'Full audio and video podcast production — recording, editing, branding, and distribution setup.', wa: waMsg('Podcast Production') },
      { label: 'Livestream Production', desc: 'Multi-camera livestream for events, launches, services, and live sessions — broadcast to any platform.', wa: waMsg('Livestream Production') },
      { label: 'Content Strategy & Calendar', desc: 'A 3-month content roadmap built around your goals, your audience, and the platforms that matter most.', wa: waMsg('Content Strategy & Calendar') },
    ]
  },

  /* ════ WEB ════ */
  'web-websites': {
    tag: 'Web, App & AI', tagClass: 'web-tag',
    title: 'Website Development',
    desc: 'Every website Spectra builds has one job: move the right visitor closer to becoming a paying client. Choose the type that fits your business — we handle everything from design to launch.',
    bentoClass: 'bento-web', waClass: 'bento-wa-web',
    items: [
      { label: 'Static Website', desc: 'Fast, elegant, and professional. Perfect for service businesses, agencies, and personal brands that need a strong online presence without complex functionality.', wa: waMsg('Static Website') },
      { label: 'Dynamic Website', desc: 'Content that updates automatically. Ideal for businesses with listings, news, events, or data that changes regularly.', wa: waMsg('Dynamic Website') },
      { label: 'Landing Page', desc: 'One page. One goal. Maximum conversion. Built for ad campaigns, product launches, lead generation, and promotions.', wa: waMsg('Landing Page') },
      { label: 'E-Commerce Store', desc: 'Sell online 24/7. Full product catalogue, secure payment integration, order management, and mobile-first shopping experience.', wa: waMsg('E-Commerce Store') },
      { label: 'Brand Portfolio', desc: 'Showcase your work beautifully. Designed for creatives, agencies, studios, and photographers who need their work to do the selling.', wa: waMsg('Brand Portfolio Website') },
      { label: 'Business Web Application', desc: 'Custom tools, client portals, booking systems, dashboards — built exactly to how your business operates.', wa: waMsg('Business Web Application') },
    ]
  },

  'web-apps': {
    tag: 'Web, App & AI', tagClass: 'web-tag',
    title: 'Mobile & Web App Development',
    desc: 'An app keeps your brand in your customer\'s pocket every single day. We build applications that are fast, intuitive, and designed to grow — from the first user to the hundred thousandth.',
    bentoClass: 'bento-web', waClass: 'bento-wa-web',
    items: [
      { label: 'Android Application', desc: 'Native Android apps built for performance, designed for your audience, and deployed on Google Play.', wa: waMsg('Android Application') },
      { label: 'iOS Application', desc: 'Native iOS apps crafted to Apple\'s standards — fast, polished, and deployed on the App Store.', wa: waMsg('iOS Application') },
      { label: 'Cross-Platform App (Android + iOS)', desc: 'One codebase, both platforms. Maximum reach at a fraction of the cost of two separate native builds.', wa: waMsg('Cross-Platform Mobile App') },
      { label: 'Progressive Web App (PWA)', desc: 'Runs in a browser but feels like a native app — installable, offline-capable, and no app store required.', wa: waMsg('Progressive Web App (PWA)') },
      { label: 'Custom Web Application', desc: 'Bespoke web-based tools, SaaS platforms, internal systems, and portals built to solve your specific business problem.', wa: waMsg('Custom Web Application') },
      { label: 'Client Portal / Dashboard', desc: 'A branded, secure space where your clients access their projects, reports, invoices, and communication.', wa: waMsg('Client Portal / Dashboard') },
    ]
  },

  'web-ai': {
    tag: 'Web, App & AI', tagClass: 'web-tag',
    title: 'AI Integration & Automation',
    desc: 'AI is not a buzzword. It is a business advantage — but only when it is implemented around your actual workflow. We identify where AI creates the most value for your operation, then we build it in cleanly.',
    bentoClass: 'bento-web', waClass: 'bento-wa-web',
    items: [
      { label: 'WhatsApp Business Automation', desc: 'Automated responses, lead qualification, booking confirmations, order updates — all through WhatsApp. Your best salesperson never sleeps.', wa: waMsg('WhatsApp Business Automation') },
      { label: 'Meta (Instagram & Facebook) Automation', desc: 'Auto-reply to DMs, comment responses, story interactions — keep your audience engaged without lifting a finger.', wa: waMsg('Meta Automation (Instagram & Facebook)') },
      { label: 'n8n Workflow Automation', desc: 'Connect all your tools — CRM, email, spreadsheets, Slack, databases — and automate the repetitive workflows that drain your team\'s time.', wa: waMsg('n8n Workflow Automation') },
      { label: 'OpenAI / Claude AI Integration', desc: 'Embed world-class AI models into your website, app, or internal tools — for content generation, customer support, data analysis, and more.', wa: waMsg('OpenAI / Claude AI Integration') },
      { label: 'Agentic AI Systems', desc: 'AI agents that don\'t just respond — they act. Research, write, analyse, decide, and execute tasks autonomously on your behalf.', wa: waMsg('Agentic AI Systems') },
      { label: 'Custom Chatbot Development', desc: 'Intelligent chatbots for your website or app that handle customer queries, qualify leads, book appointments, and escalate complex cases.', wa: waMsg('Custom Chatbot Development') },
      { label: 'Smart Lead Capture & Follow-up', desc: 'AI-powered lead funnels that capture enquiries, qualify automatically, and follow up without manual intervention.', wa: waMsg('Smart Lead Capture & Follow-up Automation') },
      { label: 'AI-Powered Analytics Dashboard', desc: 'Live dashboards that surface the insights your business actually needs — not just raw data, but actionable intelligence.', wa: waMsg('AI-Powered Analytics Dashboard') },
    ]
  },

  'web-uiux': {
    tag: 'Web, App & AI', tagClass: 'web-tag',
    title: 'UI/UX Design',
    desc: 'The best product in the world loses to a better-designed one. We design interfaces that are intuitive before users even think — reducing drop-off, increasing trust, and making every interaction feel effortless.',
    bentoClass: 'bento-web', waClass: 'bento-wa-web',
    items: [
      { label: 'Product UX Audit', desc: 'We analyse your existing product, identify friction points, and deliver a prioritised list of improvements with measurable impact.', wa: waMsg('UX Audit') },
      { label: 'End-to-End UI/UX Design', desc: 'Full interface design from wireframe to pixel-perfect mockup — for web apps, mobile apps, or SaaS platforms.', wa: waMsg('End-to-End UI/UX Design') },
      { label: 'User Research & Personas', desc: 'We study your users — their behaviour, motivations, and pain points — and design around what actually matters to them.', wa: waMsg('User Research & Persona Development') },
      { label: 'Interaction Design & Prototyping', desc: 'Clickable prototypes that let you experience the product before a single line of code is written.', wa: waMsg('Interaction Design & Prototyping') },
      { label: 'Design System Creation', desc: 'A full component library and design system your development team uses to build consistently and fast.', wa: waMsg('Design System Creation') },
    ]
  },

  /* ════ EVENTS ════ */
  'events-planning': {
    tag: 'Spectra Experience', tagClass: 'events-tag',
    title: 'Event Planning & Management',
    desc: 'A well-planned event feels effortless. That\'s not an accident — it\'s what professional planning looks like from the inside. We manage every detail so you can be fully present at your own event.',
    bentoClass: 'bento-events', waClass: 'bento-wa-events',
    items: [
      { label: 'Corporate Conference', desc: 'Multi-session conferences with full logistics management, speaker coordination, registration, and production.', wa: waMsg('Corporate Conference Planning') },
      { label: 'Product Launch Event', desc: 'Launch events built to generate press, excitement, and immediate sales momentum for your product or service.', wa: waMsg('Product Launch Event') },
      { label: 'Gala & Award Night', desc: 'Black-tie galas and award ceremonies produced with elegance, precision, and complete attention to the guest experience.', wa: waMsg('Gala & Award Night') },
      { label: 'Concert & Live Performance', desc: 'Full concert production — venue, staging, ticketing, talent coordination, and day-of management.', wa: waMsg('Concert & Live Performance Event') },
      { label: 'Private Celebration (Birthday, Wedding)', desc: 'Intimate and high-impact private events designed around your vision, your people, and your most important moments.', wa: waMsg('Private Celebration (Birthday/Wedding)') },
      { label: 'Brand Activation', desc: 'Experiential marketing events that put your brand in front of your exact audience in a way they remember.', wa: waMsg('Brand Activation Event') },
      { label: 'Religious / Community Event', desc: 'Church programmes, community gatherings, and faith-based events managed with care and precision.', wa: waMsg('Religious / Community Event') },
    ]
  },

  'events-production': {
    tag: 'Spectra Experience', tagClass: 'events-tag',
    title: 'Event Production & Technical',
    desc: 'The difference between a good event and a great one is almost always technical production. The right lighting, sound, and staging doesn\'t just support your event — it transforms the entire atmosphere.',
    bentoClass: 'bento-events', waClass: 'bento-wa-events',
    items: [
      { label: 'Stage Design & Build', desc: 'Custom stage concepts designed to match your brand, your venue, and the experience you want your audience to have.', wa: waMsg('Stage Design & Build') },
      { label: 'Lighting Design & Operation', desc: 'Dramatic, architectural, or atmospheric lighting — designed, rigged, and operated by our technical team.', wa: waMsg('Lighting Design & Operation') },
      { label: 'Sound Engineering', desc: 'Crystal-clear audio for speeches, live music, and presentations — no feedback, no dead zones, no surprises.', wa: waMsg('Sound Engineering') },
      { label: 'LED Screen & Visual Production', desc: 'Large-format LED displays, projection mapping, and motion graphics that make your event visually unforgettable.', wa: waMsg('LED Screen & Visual Production') },
      { label: 'Technical Direction', desc: 'A dedicated Technical Director managing all production elements across your entire event — one person, full accountability.', wa: waMsg('Technical Direction') },
      { label: 'Live Event Streaming', desc: 'Multi-camera livestream to YouTube, Instagram, Facebook, or a private link — expanding your event far beyond the room.', wa: waMsg('Live Event Streaming') },
    ]
  },

  'events-talent': {
    tag: 'Spectra Experience', tagClass: 'events-tag',
    title: 'Entertainment & Talent Booking',
    desc: 'Entertainment is what people talk about when they describe your event to someone who wasn\'t there. We book, vet, coordinate, and manage talent so the entertainment experience matches the rest of your production.',
    bentoClass: 'bento-events', waClass: 'bento-wa-events',
    items: [
      { label: 'Artist Booking', desc: 'Nigerian and international artists sourced, booked, and managed — from emerging acts to headline names.', wa: waMsg('Artist Booking') },
      { label: 'MC / Host Booking', desc: 'Professional MCs and hosts who keep your event flowing, your audience engaged, and your programme on time.', wa: waMsg('MC / Host Booking') },
      { label: 'DJ Booking', desc: 'DJs who read the room and move it — for events that need energy from opening to last call.', wa: waMsg('DJ Booking') },
      { label: 'Dancers & Performers', desc: 'Dance acts, cultural performers, acrobats, and specialty entertainment for high-impact moments.', wa: waMsg('Dancers & Performers Booking') },
      { label: 'Speaker Booking', desc: 'Inspirational, keynote, and industry speakers sourced for conferences, brand events, and corporate programmes.', wa: waMsg('Speaker Booking') },
      { label: 'Full Entertainment Package', desc: 'We curate the entire entertainment lineup for your event — multiple acts, sequenced perfectly, managed start to finish.', wa: waMsg('Full Entertainment Package') },
    ]
  },

  /* ════ BUSINESS ════ */
  'biz-brand': {
    tag: 'Business & Talent', tagClass: 'business-tag',
    title: 'Brand Strategy & Identity',
    desc: 'Most businesses look like what they are. The best brands look like what they aspire to be. We build the strategy and visual identity that puts your business in the second category — permanently.',
    bentoClass: 'bento-business', waClass: 'bento-wa-business',
    items: [
      { label: 'Brand Positioning', desc: 'Define exactly where your brand sits in the market, why that position is defensible, and how to own it clearly.', wa: waMsg('Brand Positioning Strategy') },
      { label: 'Logo & Visual Identity', desc: 'A complete visual identity system — logo, colours, typography, and graphic language — built for longevity.', wa: waMsg('Logo & Visual Identity Design') },
      { label: 'Brand Voice & Messaging', desc: 'The words your brand uses, the tone it speaks in, and the narrative that makes your audience feel understood.', wa: waMsg('Brand Voice & Messaging Development') },
      { label: 'Brand Style Guide', desc: 'A full reference document that keeps your brand consistent whether it\'s your team, an agency, or a vendor using it.', wa: waMsg('Brand Style Guide Creation') },
      { label: 'Competitor & Market Analysis', desc: 'An honest audit of where you stand, where your competitors are weak, and where your biggest opportunity lies.', wa: waMsg('Competitor & Market Analysis') },
      { label: 'Rebranding', desc: 'Complete brand transformation for businesses that have outgrown their identity — strategic, not just cosmetic.', wa: waMsg('Rebranding Project') },
    ]
  },

  'biz-marketing': {
    tag: 'Business & Talent', tagClass: 'business-tag',
    title: 'Marketing & Public Relations',
    desc: 'Marketing that doesn\'t generate revenue is decoration. PR that doesn\'t change perception is noise. We build campaigns and systems that do both — measurably.',
    bentoClass: 'bento-business', waClass: 'bento-wa-business',
    items: [
      { label: 'Marketing Strategy', desc: 'A full go-to-market system — channels, messaging, budget allocation, and success metrics built around your actual goals.', wa: waMsg('Marketing Strategy') },
      { label: 'Social Media Management', desc: 'Monthly management of your social platforms — content, community, and growth managed by our team.', wa: waMsg('Social Media Management') },
      { label: 'Paid Advertising (Meta & Google)', desc: 'Performance ad campaigns on Instagram, Facebook, and Google — built to return more than they cost.', wa: waMsg('Paid Advertising (Meta & Google)') },
      { label: 'Public Relations & Media', desc: 'Press releases, media pitching, journalist relationships, and earned media coverage that builds lasting credibility.', wa: waMsg('Public Relations & Media Coverage') },
      { label: 'Influencer Marketing', desc: 'Influencer partnerships matched to your brand — vetted, briefed, and managed so results are real, not just reach.', wa: waMsg('Influencer Marketing') },
      { label: 'Crisis Management', desc: 'Rapid, strategic response to reputation threats — protecting your brand when it matters most.', wa: waMsg('Crisis & Reputation Management') },
    ]
  },

  'biz-consulting': {
    tag: 'Business & Talent', tagClass: 'business-tag',
    title: 'Business Consulting & Growth',
    desc: 'The biggest risk most businesses take is growing without a plan. We provide the structure, strategy, and clarity that turns ambition into a system — and a system into results.',
    bentoClass: 'bento-business', waClass: 'bento-wa-business',
    items: [
      { label: 'Growth Strategy Session', desc: 'A focused 90-minute session where we diagnose where your business is losing momentum and build a clear path forward.', wa: waMsg('Growth Strategy Session') },
      { label: 'Business Plan Development', desc: 'Investor-ready business plans that communicate your vision, your market, and your numbers with confidence.', wa: waMsg('Business Plan Development') },
      { label: 'Revenue Model Review', desc: 'We audit how your business makes money, identify revenue leaks, and find growth opportunities you may be missing.', wa: waMsg('Revenue Model Review') },
      { label: 'Operational Systems', desc: 'Documented processes, team structures, and tools that let your business run consistently without everything depending on you.', wa: waMsg('Operational Systems Design') },
      { label: 'Investor Readiness', desc: 'Financial modelling, pitch preparation, and due diligence support for businesses preparing to raise capital.', wa: waMsg('Investor Readiness Preparation') },
    ]
  },

  'talent-rep': {
    tag: 'Talent Management', tagClass: 'business-tag',
    title: 'Talent Representation',
    desc: 'Most talented people are underpaid, underexposed, or both. Representation changes that. We advocate, negotiate, and manage on your behalf — so you can focus entirely on what you do best.',
    bentoClass: 'bento-talent', waClass: 'bento-wa-talent',
    items: [
      { label: 'Full Talent Management', desc: 'End-to-end representation — career strategy, deal negotiation, schedule management, and brand oversight.', wa: waMsg('Full Talent Management & Representation') },
      { label: 'Deal Negotiation', desc: 'We negotiate every deal — performance fees, contracts, endorsements, and appearances — to get you what you\'re worth.', wa: waMsg('Deal Negotiation Services') },
      { label: 'Career Development Plan', desc: 'A strategic 12-month roadmap that moves you from where you are to where your ability deserves to take you.', wa: waMsg('Career Development Planning') },
      { label: 'Image & Perception Management', desc: 'Your public image — what people see, read, and feel about you — managed proactively across every channel.', wa: waMsg('Image & Perception Management') },
      { label: 'Crisis & Reputation Management', desc: 'When negative attention hits, we respond fast, strategically, and effectively — protecting what took years to build.', wa: waMsg('Talent Crisis & Reputation Management') },
    ]
  },

  'talent-deals': {
    tag: 'Talent Management', tagClass: 'business-tag',
    title: 'Brand Deals & Partnerships',
    desc: 'The right brand deal elevates you. The wrong one diminishes you. We source, negotiate, and manage brand partnerships that align with who you are, where you\'re going, and what your audience believes in.',
    bentoClass: 'bento-talent', waClass: 'bento-wa-talent',
    items: [
      { label: 'Brand Partnership Sourcing', desc: 'We identify brands aligned to your identity, reach out on your behalf, and pitch you professionally.', wa: waMsg('Brand Partnership Sourcing') },
      { label: 'Endorsement Deal Negotiation', desc: 'Contract review, rate negotiation, and deal structuring — so you get your true market value, not what you\'re offered.', wa: waMsg('Endorsement Deal Negotiation') },
      { label: 'Sponsored Content Management', desc: 'We brief, manage, and review all sponsored content — ensuring it performs and stays authentic to your voice.', wa: waMsg('Sponsored Content Management') },
      { label: 'Event Appearance Booking', desc: 'Paid appearances, panels, brand events, and activations — sourced, negotiated, and managed by our team.', wa: waMsg('Event Appearance Booking') },
      { label: 'Long-term Ambassador Deals', desc: 'Multi-month or annual brand ambassador agreements structured to maximise both income and brand alignment.', wa: waMsg('Long-term Brand Ambassador Deal') },
    ]
  },

  /* ════ MOTION ════ */
  'motion-brand': {
    tag: 'Motion & Animation', tagClass: 'motion-tag',
    title: 'Logo & Brand Animation',
    desc: 'A static logo is a mark. An animated logo is a moment. Every time your brand appears in motion — on video, on screen, in an intro — it should feel intentional, premium, and unmistakably yours.',
    bentoClass: 'bento-motion', waClass: 'bento-wa-motion',
    items: [
      { label: 'Logo Animation', desc: 'A cinematic logo reveal sequence for use across all your video content — multiple formats and lengths delivered.', wa: waMsg('Logo Animation') },
      { label: 'Animated Brand Intro', desc: 'A 5–15 second animated intro for your YouTube channel, reels, or any video content — instantly recognisable.', wa: waMsg('Animated Brand Intro') },
      { label: 'Outro & End Screen Animation', desc: 'Animated end screens with call-to-action elements that keep viewers engaged and subscribed.', wa: waMsg('Video Outro & End Screen Animation') },
      { label: 'Animated Brand Identity System', desc: 'A full set of motion assets — logo, lower thirds, transitions, backgrounds — that give your entire video output a unified look.', wa: waMsg('Animated Brand Identity System') },
      { label: 'Stinger & Transition Pack', desc: 'Short animated transitions for live streams, video editing, and broadcast production.', wa: waMsg('Stinger & Transition Pack') },
    ]
  },

  'motion-content': {
    tag: 'Motion & Animation', tagClass: 'motion-tag',
    title: 'Motion Graphics & Social Content',
    desc: 'Motion stops the scroll. It holds attention longer than static images, performs better in ads, and communicates more in less time. Every brand with a social presence should be using it.',
    bentoClass: 'bento-motion', waClass: 'bento-wa-motion',
    items: [
      { label: 'Animated Social Media Posts', desc: 'Looping animated graphics for Instagram, Twitter/X, and LinkedIn — eye-catching, on-brand, and built for every format.', wa: waMsg('Animated Social Media Posts') },
      { label: 'Promotional Video Animation', desc: 'Short-form animated promo videos for product launches, sales, events, and campaigns — 15 to 60 seconds.', wa: waMsg('Promotional Video Animation') },
      { label: 'Animated Ads (Meta & Google)', desc: 'Motion creative for paid ads on Instagram, Facebook, and Google Display — optimised for the formats that convert.', wa: waMsg('Animated Ads for Meta & Google') },
      { label: 'Kinetic Typography Videos', desc: 'Text-driven animated videos that communicate your key message with rhythm, pace, and visual impact.', wa: waMsg('Kinetic Typography Video') },
      { label: 'Infographic Animation', desc: 'Turn complex data, statistics, or processes into engaging animated infographics your audience actually watches.', wa: waMsg('Infographic Animation') },
      { label: 'Monthly Motion Content Pack', desc: 'A set of animated posts, stories, and reels covers produced monthly — keeping your feed moving and professional.', wa: waMsg('Monthly Motion Content Pack') },
    ]
  },

  'motion-explainer': {
    tag: 'Motion & Animation', tagClass: 'motion-tag',
    title: 'Explainer & Promo Videos',
    desc: 'If you can explain what you do in 60 seconds and make someone want it, you\'ve already closed half the sale. Explainer videos do exactly that — on your website, your ads, and your social media, 24 hours a day.',
    bentoClass: 'bento-motion', waClass: 'bento-wa-motion',
    items: [
      { label: '2D Animated Explainer Video', desc: 'A 60–90 second animated explainer that breaks down your product, service, or process simply and compellingly.', wa: waMsg('2D Animated Explainer Video') },
      { label: 'Product Demo Animation', desc: 'Animated walkthrough of how your product or app works — perfect for landing pages, pitch decks, and sales.', wa: waMsg('Product Demo Animation') },
      { label: 'Process Explainer Video', desc: 'Show your audience exactly how working with you works — removing friction, building confidence, accelerating decisions.', wa: waMsg('Process Explainer Video') },
      { label: 'Investment / Pitch Video', desc: 'Animated pitch videos that communicate your business vision clearly to investors, partners, and stakeholders.', wa: waMsg('Investment & Pitch Animated Video') },
      { label: 'App Walkthrough Animation', desc: 'An animated showcase of your mobile or web app — UI motion, feature highlights, and value proposition in one video.', wa: waMsg('App Walkthrough Animation') },
      { label: 'UI Micro-Animation Package', desc: 'A set of subtle, purposeful motion effects for your website or app interface — hover states, loading sequences, transitions.', wa: waMsg('UI Micro-Animation Package') },
    ]
  }
};

/* ── BUILD OVERLAY HTML ── */
function buildOverlay(key) {
  const d = overlayData[key];
  if (!d) return '';

  const tagColorMap = {
    'media-tag':    { color: 'var(--media)',    border: 'rgba(37,99,235,0.4)',   bg: 'rgba(37,99,235,0.08)' },
    'web-tag':      { color: 'var(--web)',      border: 'rgba(6,182,212,0.4)',   bg: 'rgba(6,182,212,0.08)' },
    'events-tag':   { color: 'var(--events)',   border: 'rgba(217,119,6,0.4)',   bg: 'rgba(217,119,6,0.08)' },
    'business-tag': { color: 'var(--business)', border: 'rgba(124,58,237,0.4)',  bg: 'rgba(124,58,237,0.08)' },
    'motion-tag':   { color: 'var(--motion)',   border: 'rgba(16,185,129,0.4)',  bg: 'rgba(16,185,129,0.08)' },
  };
  const tc = tagColorMap[d.tagClass] || tagColorMap['media-tag'];

  const waIcon = `<svg viewBox="0 0 24 24" fill="currentColor" style="width:12px;height:12px;flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

  const cols = d.items.length <= 4 ? 'co-bento-2' : d.items.length >= 8 ? '' : '';

  const bentoItems = d.items.map(item => `
    <div class="bento-item ${d.bentoClass}">
      <div class="bento-item-label">${item.label}</div>
      <div class="bento-item-desc">${item.desc}</div>
      <a href="${waLink(item.wa)}" class="bento-wa-btn ${d.waClass}" target="_blank" rel="noopener">
        ${waIcon} Get Started
      </a>
    </div>
  `).join('');

  const notSureWa = waLink(waMsg(`${d.title} (not sure which option fits)`));

  return `
    <div class="co-header">
      <span class="co-tag" style="color:${tc.color};border-color:${tc.border};background:${tc.bg}">${d.tag}</span>
      <h2>${d.title}</h2>
      <p>${d.desc}</p>
    </div>
    <div class="co-bento ${cols}">${bentoItems}</div>
    <div class="co-not-sure">
      <p>Not sure which option fits your business? Tell us what you're trying to achieve and we'll recommend the right starting point.</p>
      <a href="${notSureWa}" target="_blank" rel="noopener">
        ${waIcon} Chat with us
      </a>
    </div>
  `;
}

/* ── OVERLAY OPEN / CLOSE ── */
(function initOverlay() {
  const overlay   = document.getElementById('cardOverlay');
  const backdrop  = document.getElementById('cardOverlayBackdrop');
  const closeBtn  = document.getElementById('cardOverlayClose');
  const content   = document.getElementById('cardOverlayContent');
  const panel     = document.getElementById('cardOverlayPanel');
  if (!overlay) return;

  function open(key) {
    const html = buildOverlay(key);
    if (!html) return;
    content.innerHTML = html;
    overlay.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    panel.scrollTop = 0;
    closeBtn.focus();
  }

  function close() {
    overlay.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  // All expand buttons and conv cards trigger overlay
  document.addEventListener('click', e => {
    const btn  = e.target.closest('[data-overlay]');
    const xBtn = e.target.closest('#cardOverlayClose');
    if (btn && !e.target.closest('#cardOverlay')) { open(btn.dataset.overlay); return; }
    if (xBtn) { close(); return; }
  });

  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
