// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const menu = document.getElementById('menu');

if (mobileToggle && menu) {
  mobileToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when clicking a link (mobile)
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Testimonials slider
(function initSlider() {
  const slider = document.querySelector('[data-slider]');
  const slidesContainer = slider?.querySelector('[data-slides]');
  if (!slider || !slidesContainer) return;

  const slides = Array.from(slidesContainer.children);
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');
  const dotsContainer = slider.querySelector('[data-dots]');

  let index = 0;
  let timer = null;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((s, si) => s.classList.toggle('is-active', si === index));
    if (dotsContainer) {
      dotsContainer.querySelectorAll('button').forEach((d, di) => d.setAttribute('aria-current', di === index ? 'true' : 'false'));
    }
  }

  function start() {
    stop();
    timer = setInterval(() => goTo(index + 1), 5000);
  }
  function stop() { if (timer) clearInterval(timer); }

  // Build dots
  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => { goTo(i); start(); });
      dotsContainer.appendChild(dot);
    });
  }

  // Bind arrows
  prevBtn?.addEventListener('click', () => { goTo(index - 1); start(); });
  nextBtn?.addEventListener('click', () => { goTo(index + 1); start(); });

  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);

  // Init
  goTo(0);
  start();
})();

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

