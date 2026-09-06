// Splash screen con contador animado
const splash = document.getElementById('splash');
const counter = document.getElementById('counter');
let count = 0;
const targetCount = 100;
const duration = 2000;
const startTime = performance.now();

function animateCounter(currentTime) {
  const elapsed = currentTime - startTime;
  const progress = Math.min(elapsed / duration, 1);
  const easedProgress = 1 - Math.pow(1 - progress, 3);
  count = Math.floor(easedProgress * targetCount);
  counter.textContent = count;
  
  if (progress < 1) {
    requestAnimationFrame(animateCounter);
  } else {
    setTimeout(() => {
      splash.classList.add('hidden');
    }, 300);
  }
}

requestAnimationFrame(animateCounter);

// Menú móvil
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuBackdrop = document.querySelector('.menu-backdrop');

hamburger.addEventListener('click', () => {
  const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !isExpanded);
  mobileMenu.setAttribute('aria-hidden', isExpanded);
});

menuBackdrop.addEventListener('click', () => {
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.menu-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

// Animación de revelación al hacer scroll
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Servicios interactivos
const services = document.querySelectorAll('.service');
services.forEach(service => {
  service.addEventListener('click', () => {
    services.forEach(s => s.classList.remove('service-active'));
    service.classList.add('service-active');
  });
});

// Botones de información en overlays
document.querySelectorAll('.overlay button').forEach(btn => {
  btn.addEventListener('click', () => {
    const overlay = btn.closest('.overlay');
    const title = overlay.querySelector('h4').textContent;
    alert(`Más información sobre: ${title}`);
  });
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});