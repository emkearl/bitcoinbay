/* ═══════════════════════════════════════
   BITCOIN BAY — script.js (final)
═══════════════════════════════════════ */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  initHeader();
  initHamburger();
  initCountUpStats();
  initReveal();
  initSmoothScroll();
  initModals();
  initFAQ();
  initForms();
  initCardTilt();
});

/* ── Footer year ──────────────────────────────────── */
function setFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Sticky header ────────────────────────────────── */
function initHeader() {
  const hdr = document.getElementById('site-header');
  if (!hdr) return;
  const onScroll = () => hdr.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Hamburger ────────────────────────────────────── */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    nav.classList.toggle('open', open);
    nav.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  nav.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => {
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      nav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && btn.classList.contains('open')) {
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      nav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
}

/* ── Count-up stat numbers ────────────────────────── */
function initCountUpStats() {
  const targets = document.querySelectorAll('[data-target]');
  if (!targets.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const end = +el.dataset.target;
      const dur = 1600;
      const start = performance.now();
      const tick = now => {
        const pct = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - pct, 3);
        el.textContent = Math.round(ease * end);
        if (pct < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: .5 });
  targets.forEach(t => obs.observe(t));
}

/* ── Scroll reveal ────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .12 });
  els.forEach(el => obs.observe(el));
}

/* ── Smooth scroll (offset for fixed header) ──────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const hdrH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 68;
      const top = target.getBoundingClientRect().top + window.scrollY - hdrH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ── Modals ───────────────────────────────────────── */
function initModals() {
  const loginModal  = document.getElementById('loginModal');
  const signupModal = document.getElementById('signupModal');
  if (!loginModal || !signupModal) return;

  // All triggers
  const loginTriggers  = ['openLoginBtn','mobileLoginBtn','accessLoginBtn','footerLoginBtn','heroLoginBtn'];
  const signupTriggers = ['openSignupBtn','mobileSignupBtn','accessSignupBtn','footerSignupBtn','heroSignupBtn','referralSignupBtn','teamBreakSignup'];

  loginTriggers.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', () => openModal(loginModal));
  });
  signupTriggers.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', () => openModal(signupModal));
  });

  // Close buttons
  ['closeLoginModal','closeLgBtn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', () => closeModal(loginModal));
  });
  ['closeSignupModal','closeSgBtn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', () => closeModal(signupModal));
  });

  // Overlay click
  [loginModal, signupModal].forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) closeModal(m); });
  });

  // Switch
  const switchToSignup = document.getElementById('switchToSignup');
  const switchToLogin  = document.getElementById('switchToLogin');
  if (switchToSignup) switchToSignup.addEventListener('click', () => { closeModal(loginModal); setTimeout(() => openModal(signupModal), 200); });
  if (switchToLogin)  switchToLogin.addEventListener('click',  () => { closeModal(signupModal); setTimeout(() => openModal(loginModal), 200); });

  // Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (loginModal.classList.contains('open'))  closeModal(loginModal);
      if (signupModal.classList.contains('open')) closeModal(signupModal);
    }
  });
}

function openModal(modal) {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const first = modal.querySelector('input, button:not(.modal-close-btn)');
  if (first) setTimeout(() => first.focus(), 100);
}
function closeModal(modal) {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ── FAQ Accordion ────────────────────────────────── */
function initFAQ() {
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      // Close all
      document.querySelectorAll('.faq-btn').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const ans = b.nextElementSibling;
        if (ans) ans.hidden = true;
      });
      // Open clicked (if was closed)
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        const ans = btn.nextElementSibling;
        if (ans) ans.hidden = false;
      }
    });
  });
}

/* ── Forms ────────────────────────────────────────── */
function initForms() {
  loginForm();
  signupForm();
}

function loginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('loginId');
    const pw = document.getElementById('loginPw');
    let ok = true;

    if (!id.value.trim()) { showErr('loginIdErr'); id.classList.add('invalid'); ok = false; }
    else { hideErr('loginIdErr'); id.classList.remove('invalid'); }

    if (!pw.value) { showErr('loginPwErr'); pw.classList.add('invalid'); ok = false; }
    else { hideErr('loginPwErr'); pw.classList.remove('invalid'); }

    if (ok) window.location.href = 'https://www.bitcoinbay.ag/';
  });
}

function signupForm() {
  const form = document.getElementById('signupForm');
  if (!form) return;

  // Inline validation on blur
  const inlineValidate = (id, test, errId, okId) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', () => {
      if (test(el)) {
        el.classList.remove('invalid'); el.classList.add('valid');
        hideErr(errId); if (okId) showOk(okId);
      } else {
        el.classList.remove('valid'); el.classList.add('invalid');
        showErr(errId); if (okId) hideOk(okId);
      }
    });
  };

  inlineValidate('sfn', el => el.value.trim().length >= 1, 'sfnErr', 'sfnOk');
  inlineValidate('sln', el => el.value.trim().length >= 1, 'slnErr', 'slnOk');
  inlineValidate('sem', el => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value), 'semErr', null);
  inlineValidate('spw', el => /^[a-zA-Z0-9]{4,10}$/.test(el.value), 'spwErr', null);
  inlineValidate('sph', el => el.value.trim().length >= 7, 'sphErr', null);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fn   = document.getElementById('sfn');
    const ln   = document.getElementById('sln');
    const em   = document.getElementById('sem');
    const cem  = document.getElementById('scem');
    const pw   = document.getElementById('spw');
    const cpw  = document.getElementById('scpw');
    const ph   = document.getElementById('sph');
    const trm  = document.getElementById('sTerms');
    let ok = true;

    const pwRx = /^[a-zA-Z0-9]{4,10}$/;
    const emRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fn.value.trim()) { showErr('sfnErr'); fn.classList.add('invalid'); ok = false; }
    if (!ln.value.trim()) { showErr('slnErr'); ln.classList.add('invalid'); ok = false; }
    if (!emRx.test(em.value)) { showErr('semErr'); em.classList.add('invalid'); ok = false; }
    if (cem.value !== em.value) { showErr('scemErr'); cem.classList.add('invalid'); ok = false; }
    if (!pwRx.test(pw.value)) { showErr('spwErr'); pw.classList.add('invalid'); ok = false; }
    if (cpw.value !== pw.value) { showErr('scpwErr'); cpw.classList.add('invalid'); ok = false; }
    if (!ph.value.trim() || ph.value.trim().length < 7) { showErr('sphErr'); ph.classList.add('invalid'); ok = false; }
    if (!trm.checked) { showErr('sTermsErr'); ok = false; }

    if (ok) window.location.href = 'https://www.bitcoinbay.ag/';
  });
}

function showErr(id) { const el = document.getElementById(id); if (el) el.style.display = 'block'; }
function hideErr(id) { const el = document.getElementById(id); if (el) el.style.display = 'none'; }
function showOk(id)  { const el = document.getElementById(id); if (el) el.style.display = 'block'; }
function hideOk(id)  { const el = document.getElementById(id); if (el) el.style.display = 'none'; }

/* ── Card tilt (desktop hover) ────────────────────── */
function initCardTilt() {
  if (!window.matchMedia('(pointer:fine)').matches) return;
  document.querySelectorAll('.feature-card, .engage-card, .step-body').forEach(card => {
    card.addEventListener('mousemove', e => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - .5;
      const y = (e.clientY - top)  / height - .5;
      card.style.transform = `translateY(-5px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
