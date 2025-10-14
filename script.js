// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const storedTheme = localStorage.getItem('theme');

if (storedTheme) {
  root.setAttribute('data-theme', storedTheme);
  if (storedTheme === 'dark') themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.innerHTML = next === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Mobile menu
const menuBtn = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuBtn?.addEventListener('click', () => {
  navLinks?.classList.toggle('active');
});

// Close menu on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks?.classList.remove('active'));
});

// Intersection Observer animations
const revealOnScroll = (selector) => {
  const els = document.querySelectorAll(selector);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => io.observe(el));
};

revealOnScroll('section, .about-content, .skill-card, .project-card, .contact-content, h2, .about-stats');

// Background mouse-follow gradient
const bgGrad = document.querySelector('.background-gradient');
window.addEventListener('mousemove', (e) => {
  if (!bgGrad) return;
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  bgGrad.style.setProperty('--mouse-x', x + '%');
  bgGrad.style.setProperty('--mouse-y', y + '%');
  bgGrad.classList.add('visible');
});
window.addEventListener('mouseleave', () => bgGrad?.classList.remove('visible'));

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
