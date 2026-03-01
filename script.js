/* =====================================================
   ALÉM DO CÓDIGO — JavaScript
   Particles · Scroll effects · Nav · Form · Counters
   ===================================================== */

// ---- Nav scroll ----
const nav = document.getElementById('nav');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
function closeMobileNav() {
  navMobile.classList.remove('open');
  navMobile.hidden = true;
  navToggle.setAttribute('aria-expanded', 'false');
}
function openMobileNav() {
  navMobile.hidden = false;
  navMobile.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
}
if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    if (expanded) closeMobileNav();
    else openMobileNav();
  });

  navMobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMobileNav);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileNav();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMobileNav();
  }, { passive: true });
}

// ---- Particle canvas ----
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  if (prefersReducedMotion) {
    canvas.style.display = 'none';
    return;
  }

  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  if (coarsePointer && window.innerWidth < 768) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  let W, H, particles, mouse = { x: -999, y: -999 };
  const PARTICLE_COUNT = window.innerWidth < 480 ? 22 : window.innerWidth < 768 ? 36 : 72;
  const CONNECT_DIST = window.innerWidth < 768 ? 90 : 120;
  const COLORS = ['rgba(0,212,255,', 'rgba(124,58,237,', 'rgba(16,185,129,'];
  let animationFrameId = null;
  let isRunning = true;

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createParticles() {
    particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.2
    }));
  }

  function draw() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Move
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      // Mouse repel
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > 0 && d < 100) {
        p.x += dx / d * 1.5;
        p.y += dy / d * 1.5;
      }

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();

      // Connect nearby
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const ex = p.x - q.x;
        const ey = p.y - q.y;
        const dist = Math.sqrt(ex * ex + ey * ey);
        if (dist < CONNECT_DIST) {
          const a = (1 - dist / CONNECT_DIST) * 0.15;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = 'rgba(0,212,255,' + a + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    animationFrameId = requestAnimationFrame(draw);
  }

  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  window.addEventListener('resize', () => { resize(); createParticles(); }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      return;
    }

    if (!isRunning) {
      isRunning = true;
      draw();
    }
  });

  resize();
  createParticles();
  if (isRunning) draw();
})();

// ---- Scroll reveal ----
(function initReveal() {
  const els = document.querySelectorAll(
    '.service-card, .process-step, .about-content, .about-visual, .contact-info, .contact-form-wrap, .section-header, .trusted'
  );
  els.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 4 === 1) el.classList.add('reveal-delay-1');
    if (i % 4 === 2) el.classList.add('reveal-delay-2');
    if (i % 4 === 3) el.classList.add('reveal-delay-3');
  });

  if (prefersReducedMotion) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
})();

// ---- Counter animation ----
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;

  function animate() {
    if (animated) return;
    const hero = document.getElementById('hero');
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      animated = true;
      counters.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const duration = 1800;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current);
          if (current >= target) clearInterval(timer);
        }, 16);
      });
    }
  }
  window.addEventListener('scroll', animate, { passive: true });
  setTimeout(animate, 500);
})();

// ---- Active nav link on scroll ----
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      const isActive = a.getAttribute('href') === '#' + current;
      a.classList.toggle('is-active', isActive);
      if (isActive) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }, { passive: true });
})();

// ---- Contact form ----
(function initForm() {
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID';

  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('formStatus');
  const language = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt';
  const formText = {
    pt: {
      missingName: 'Indique o seu nome.',
      shortName: 'O nome deve ter pelo menos 2 caracteres.',
      missingEmail: 'Indique o seu e-mail.',
      invalidEmail: 'Indique um e-mail válido.',
      missingMessage: 'Descreva o seu desafio.',
      shortMessage: 'A mensagem deve ter pelo menos 20 caracteres.',
      fixErrors: 'Verifique os campos assinalados antes de enviar.',
      sendingButton: 'A enviar...',
      sendingStatus: 'A enviar mensagem...',
      successButton: 'Mensagem enviada ✓',
      successStatus: 'Mensagem enviada com sucesso! Respondemos em menos de 24 horas.',
      errorStatus: 'Erro ao enviar. Por favor tente novamente ou contacte-nos diretamente por email.'
    },
    en: {
      missingName: 'Please enter your name.',
      shortName: 'Name must have at least 2 characters.',
      missingEmail: 'Please enter your email.',
      invalidEmail: 'Please enter a valid email.',
      missingMessage: 'Please describe your challenge.',
      shortMessage: 'Message must have at least 20 characters.',
      fixErrors: 'Please review the highlighted fields before sending.',
      sendingButton: 'Sending...',
      sendingStatus: 'Sending your message...',
      successButton: 'Message sent ✓',
      successStatus: 'Message sent successfully! We\'ll reply within 24 hours.',
      errorStatus: 'Failed to send. Please try again or contact us directly by email.'
    }
  };
  const t = formText[language];

  const btn = form.querySelector('button[type="submit"]');
  const span = btn.querySelector('span');
  const original = span.textContent;
  const requiredFields = {
    nome: document.getElementById('nome'),
    email: document.getElementById('email'),
    mensagem: document.getElementById('mensagem')
  };
  const errorElements = {
    nome: document.getElementById('erro-nome'),
    email: document.getElementById('erro-email'),
    mensagem: document.getElementById('erro-mensagem')
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function clearStatus() {
    if (!status) return;
    status.textContent = '';
    status.className = 'form-status';
  }

  function setFieldError(name, message) {
    const field = requiredFields[name];
    const errorEl = errorElements[name];
    if (!field || !errorEl) return;
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    errorEl.textContent = message;
  }

  function validateField(name) {
    const field = requiredFields[name];
    if (!field) return '';
    const value = field.value.trim();
    let message = '';

    if (name === 'nome') {
      if (!value) message = t.missingName;
      else if (value.length < 2) message = t.shortName;
    }
    if (name === 'email') {
      if (!value) message = t.missingEmail;
      else if (!emailRegex.test(value)) message = t.invalidEmail;
    }
    if (name === 'mensagem') {
      if (!value) message = t.missingMessage;
      else if (value.length < 20) message = t.shortMessage;
    }

    setFieldError(name, message);
    return message;
  }

  Object.keys(requiredFields).forEach(name => {
    const field = requiredFields[name];
    field.addEventListener('blur', () => validateField(name));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(name);
      clearStatus();
    });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const errors = Object.keys(requiredFields).map(validateField).filter(Boolean);
    if (errors.length) {
      if (status) {
        status.textContent = t.fixErrors;
        status.className = 'form-status error';
      }
      const firstInvalid = Object.values(requiredFields).find(field => field.getAttribute('aria-invalid') === 'true');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    btn.disabled = true;
    form.setAttribute('aria-busy', 'true');
    span.textContent = t.sendingButton;
    if (status) {
      status.textContent = t.sendingStatus;
      status.className = 'form-status';
    }

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const empresa = document.getElementById('empresa').value.trim();
    const servico = document.getElementById('servico').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, empresa, servico, mensagem })
      });

      if (res.ok) {
        span.textContent = t.successButton;
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        if (status) {
          status.textContent = t.successStatus;
          status.className = 'form-status success';
        }
        setTimeout(() => {
          span.textContent = original;
          btn.disabled = false;
          btn.style.background = '';
          form.removeAttribute('aria-busy');
          form.reset();
          Object.keys(requiredFields).forEach(name => setFieldError(name, ''));
          clearStatus();
        }, 4000);
      } else {
        throw new Error('Server error');
      }
    } catch {
      span.textContent = original;
      btn.disabled = false;
      form.removeAttribute('aria-busy');
      if (status) {
        status.textContent = t.errorStatus;
        status.className = 'form-status error';
      }
    }
  });
})();

// ---- Cookie banner ----
(function initCookieBanner() {
  if (localStorage.getItem('cookie-consent')) return;
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;

  setTimeout(() => banner.classList.add('visible'), 700);

  function dismiss(value) {
    banner.classList.remove('visible');
    localStorage.setItem('cookie-consent', value);
    setTimeout(() => banner.remove(), 500);
  }

  document.getElementById('cookieAccept').addEventListener('click', () => dismiss('accepted'));
  document.getElementById('cookieReject').addEventListener('click', () => dismiss('rejected'));
})();

// ---- Smooth anchor scroll (Safari compat) ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  });
});
