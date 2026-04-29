// ===== TYPING ANIMATION =====
const typingEl = document.getElementById('typingText');
const words = ['Student', 'Developer', 'Problem Solver', 'DSA Enthusiast'];
let wi = 0, ci = 0, deleting = false;
function type() {
  const word = words[wi];
  typingEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1200); return; }
  if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(type, 400); return; }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ===== READING PROGRESS BAR =====
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / docHeight * 100) + '%';
});

const html = document.documentElement;

// ===== THEME =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeIcon.className = savedTheme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeIcon.className = next === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
});

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
document.addEventListener('mouseup',   () => cursor.classList.remove('clicking'));

document.querySelectorAll('a, button, .skill-card, .project-card, .contact-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

// ===== PARTICLE BACKGROUND =====
const canvas = document.getElementById('bgCanvas');
const ctx    = canvas.getContext('2d');
let particles = [];
const COUNT    = 80;
const MAX_DIST = 140;
const mouse    = { x: null, y: null };

document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener('mouseleave',  () => { mouse.x = null; mouse.y = null; });

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', () => { resize(); init(); });

function getColors() {
  const dark = html.getAttribute('data-theme') === 'dark';
  return {
    particle: dark ? 'rgba(139,92,246,' : 'rgba(109,40,217,',
    line:     dark ? 'rgba(139,92,246,' : 'rgba(139,92,246,'
  };
}

function init() {
  particles = Array.from({ length: COUNT }, () => ({
    x:  Math.random() * canvas.width,
    y:  Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r:  Math.random() * 2 + 1
  }));
}
init();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const c = getColors();

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    if (mouse.x !== null) {
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 100 && d > 0) {
        const f = (100 - d) / 100;
        p.x += (dx / d) * f * 3;
        p.y += (dy / d) * f * 3;
      }
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = c.particle + '0.8)';
    ctx.fill();
  });

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < MAX_DIST) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = c.line + (1 - d / MAX_DIST) * 0.4 + ')';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  if (mouse.x !== null) {
    particles.forEach(p => {
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 160) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = c.line + (1 - d / 160) * 0.5 + ')';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    });
  }

  requestAnimationFrame(draw);
}
draw();

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== NAV PILL =====
const pill     = document.getElementById('navPill');
const navItems = navLinks.querySelectorAll('.nav-item');

function movePillTo(link) {
  const lr = link.getBoundingClientRect();
  const nr = navLinks.getBoundingClientRect();
  pill.style.opacity = '1';
  pill.style.left    = (lr.left - nr.left - 10) + 'px';
  pill.style.top     = (lr.top  - nr.top  - 7)  + 'px';
  pill.style.width   = (lr.width  + 20) + 'px';
  pill.style.height  = (lr.height + 14) + 'px';
}

// Show pill on active tab always
const initialActive = navLinks.querySelector('.nav-item.active');
if (initialActive) movePillTo(initialActive);

navItems.forEach(link => {
  link.addEventListener('mouseenter', () => movePillTo(link));
});

navLinks.addEventListener('mouseleave', () => {
  const active = navLinks.querySelector('.nav-item.active');
  if (active) movePillTo(active);
  else pill.style.opacity = '0';
});

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('show', window.scrollY > 300);
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
const sections = document.querySelectorAll('section[id]');

sections.forEach(s => {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
            movePillTo(link);
          }
        });
      }
    });
  }, { threshold: 0.4 }).observe(s);
});
