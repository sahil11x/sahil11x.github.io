const toggle = document.getElementById('themeToggle');
const icon = document.getElementById('themeIcon');
const html = document.documentElement;

// Load saved theme or default to dark
const saved = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', saved);
icon.className = saved === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';

toggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  icon.className = next === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
});

// Navbar pill effect
const navLinks = document.getElementById('navLinks');
const pill = document.getElementById('navPill');
const links = navLinks.querySelectorAll('a');

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    const rect = link.getBoundingClientRect();
    const navRect = navLinks.getBoundingClientRect();
    pill.style.opacity = '1';
    pill.style.left = (rect.left - navRect.left - 10) + 'px';
    pill.style.top = (rect.top - navRect.top - 6) + 'px';
    pill.style.width = (rect.width + 20) + 'px';
    pill.style.height = (rect.height + 12) + 'px';
  });
});

navLinks.addEventListener('mouseleave', () => {
  pill.style.opacity = '0';
});
