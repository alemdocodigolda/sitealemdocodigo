// ===========================
// NAV - scroll effect & mobile
// ===========================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle?.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

navMobile?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navMobile.classList.remove('open'));
});

// ===========================
// NEURAL NETWORK CANVAS
// ===========================
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const hero = canvas.parentElement;

  // Pure cyan only — clean, focused, no distractions
  const CYAN = { r: 0, g: 212, b: 255 };
  const MAX_DIST    = 190;
  const MOUSE_R     = 130;

  let nodes   = [];
  let packets = [];
  let mouse   = { x: -9999, y: -9999 };

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createNode() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 2 + 1.5,
      color: CYAN,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.018 + Math.random() * 0.022,
    };
  }

  function initNodes() {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 13000), 80);
    nodes   = Array.from({ length: count }, createNode);
    packets = [];
  }

  function update() {
    for (const n of nodes) {
      // Mouse attraction
      const dx = mouse.x - n.x;
      const dy = mouse.y - n.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < MOUSE_R && d > 0) {
        const f = (MOUSE_R - d) / MOUSE_R;
        n.vx += (dx / d) * f * 0.6;
        n.vy += (dy / d) * f * 0.6;
      }

      // Dampen + tiny random drift
      n.vx = n.vx * 0.94 + (Math.random() - 0.5) * 0.025;
      n.vy = n.vy * 0.94 + (Math.random() - 0.5) * 0.025;

      // Speed cap
      const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
      if (spd > 1.4) { n.vx = (n.vx / spd) * 1.4; n.vy = (n.vy / spd) * 1.4; }

      n.x += n.vx;
      n.y += n.vy;

      // Bounce off walls
      if (n.x < 0)             { n.x = 0;             n.vx *= -1; }
      if (n.x > canvas.width)  { n.x = canvas.width;  n.vx *= -1; }
      if (n.y < 0)             { n.y = 0;              n.vy *= -1; }
      if (n.y > canvas.height) { n.y = canvas.height;  n.vy *= -1; }

      n.pulse += n.pulseSpeed;
    }

    // Spawn data packet along a random edge
    if (Math.random() < 0.035 && nodes.length > 1) {
      const a = nodes[Math.floor(Math.random() * nodes.length)];
      const neighbors = nodes.filter(b => {
        if (b === a) return false;
        const dx = b.x - a.x, dy = b.y - a.y;
        return dx * dx + dy * dy < MAX_DIST * MAX_DIST;
      });
      if (neighbors.length) {
        const b = neighbors[Math.floor(Math.random() * neighbors.length)];
        packets.push({ from: a, to: b, t: 0, speed: 0.014 + Math.random() * 0.012, color: a.color });
      }
    }

    packets = packets.filter(p => { p.t += p.speed; return p.t < 1; });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
    }

    // Data packets (glowing dots travelling along edges)
    for (const p of packets) {
      const x = p.from.x + (p.to.x - p.from.x) * p.t;
      const y = p.from.y + (p.to.y - p.from.y) * p.t;
      const { r, g, b } = p.color;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, 5);
      grd.addColorStop(0, `rgba(${r},${g},${b},0.5)`);
      grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},0.7)`;
      ctx.fill();
    }

    // Nodes
    for (const n of nodes) {
      const pulse = Math.sin(n.pulse) * 0.5 + 0.5;
      const { r, g, b } = n.color;
      const glowR = n.r * (2 + pulse * 1.2);
      const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
      grd.addColorStop(0, `rgba(${r},${g},${b},${0.08 + pulse * 0.05})`);
      grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.beginPath();
      ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + pulse * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${0.28 + pulse * 0.15})`;
      ctx.fill();
    }
  }

  function loop() { update(); draw(); requestAnimationFrame(loop); }

  // Mouse tracking on the hero section (canvas is pointer-events:none)
  hero.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  hero.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  resize();
  initNodes();
  loop();

  window.addEventListener('resize', () => { resize(); initNodes(); });
}

// ===========================
// NAV SCROLLSPY
// ===========================
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"], .nav-mobile a[href^="#"]');
const sections   = document.querySelectorAll('section[id]');

function updateActiveNav() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('nav-active', a.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// ===========================
// COUNTER ANIMATION
// ===========================
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const counters = document.querySelectorAll('.stat-number');
if (counters.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// ===========================
// SCROLL REVEAL
// ===========================
const revealEls = document.querySelectorAll(
  '.about-content, .about-visual, .projeto-card, .contact-panel, .contact-form-panel, .conn-node'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 90);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach(el => revealObserver.observe(el));

// ===========================
// STICKY CTA — hide when contact section is visible
// ===========================
const stickyCta = document.getElementById('stickyCta');
const contactSection = document.getElementById('contacto');

if (stickyCta && contactSection) {
  // Scroll to the form panel, centered on screen
  stickyCta.addEventListener('click', () => {
    const formPanel = contactSection.querySelector('.contact-form-panel');
    const target = formPanel || contactSection;
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      stickyCta.classList.toggle('hidden', e.isIntersecting);
    });
  }, { threshold: 0.15 });
  ctaObserver.observe(contactSection);
}

