// Mobile menu toggle
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('primary-menu');

if (toggle && menu && nav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    const next = !expanded;
    toggle.setAttribute('aria-expanded', String(next));
    menu.setAttribute('aria-expanded', String(next));
    nav.classList.toggle('open', next);
  });
}

// Close menu on link click (mobile)
menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 900) {
      toggle?.setAttribute('aria-expanded', 'false');
      menu?.setAttribute('aria-expanded', 'false');
      nav?.classList.remove('open');
    }
  });
});

// Simple testimonial slider
const slider = document.querySelector('[data-slider]');
const slidesContainer = document.querySelector('[data-slides]');
const prevBtn = document.querySelector('[data-prev]');
const nextBtn = document.querySelector('[data-next]');

if (slider && slidesContainer) {
  const slides = Array.from(slidesContainer.querySelectorAll('.slide'));
  let index = slides.findIndex((s) => s.classList.contains('current'));
  if (index < 0) index = 0;

  const setSlide = (i) => {
    slides[index].classList.remove('current');
    index = (i + slides.length) % slides.length;
    slides[index].classList.add('current');
  };

  prevBtn?.addEventListener('click', () => setSlide(index - 1));
  nextBtn?.addEventListener('click', () => setSlide(index + 1));

  let auto = setInterval(() => setSlide(index + 1), 5000);
  slider.addEventListener('mouseenter', () => clearInterval(auto));
  slider.addEventListener('mouseleave', () => (auto = setInterval(() => setSlide(index + 1), 5000)));
}

// Reveal on scroll
const observer = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 }) : null;

document.querySelectorAll('.reveal, section .card, .profile, .plan, .slide').forEach((el) => {
  el.classList.add('reveal');
  observer?.observe(el);
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

