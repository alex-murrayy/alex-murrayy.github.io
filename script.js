/* ═══════════════════════════════════════════════
   CINEMATIC PROFILE — script.js
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Typing Effect ──────────────────────────────
  const subtitleEl = document.getElementById('heroSubtitle');
  const phrases = [
    'Building the future, one line at a time.',
    'Computer Vision Enthusiast.',
    'Aspiring Software Engineer.',
    'Always learning, always shipping.'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const current = phrases[phraseIndex];
    if (!isDeleting) {
      subtitleEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeLoop, 2000);
        return;
      }
      setTimeout(typeLoop, 60);
    } else {
      subtitleEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeLoop, 400);
        return;
      }
      setTimeout(typeLoop, 30);
    }
  }

  typeLoop();

  // ── Intersection Observer (Reveal Animations) ──
  const revealItems = document.querySelectorAll('.reveal-item');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  // ── Active Nav Updater ─────────────────────────
  const scenes = document.querySelectorAll('.scene[data-scene]');
  const navDots = document.querySelectorAll('.nav-dot');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-scene');
          navDots.forEach((dot) => {
            dot.classList.toggle('active', dot.dataset.section === id);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  scenes.forEach((scene) => navObserver.observe(scene));

  // ── Smooth Scroll Nav ──────────────────────────
  navDots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = dot.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Cursor Glow ────────────────────────────────
  const cursorGlow = document.getElementById('cursorGlow');
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }

  animateGlow();

  // ── Parallax Hero Background ───────────────────
  const heroBgImg = document.querySelector('.hero-bg-img');

  window.addEventListener('scroll', () => {
    if (!heroBgImg) return;
    const scrollY = window.scrollY;
    const speed = 0.3;
    heroBgImg.style.transform = 'scale(1.1) translateY(' + scrollY * speed + 'px)';
  }, { passive: true });

  // ── Hero Particles ─────────────────────────────
  const particlesContainer = document.getElementById('heroParticles');

  function createParticles() {
    if (!particlesContainer) return;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 6 + 's';
      p.style.animationDuration = (4 + Math.random() * 4) + 's';
      p.style.width = (2 + Math.random() * 3) + 'px';
      p.style.height = p.style.width;
      particlesContainer.appendChild(p);
    }
  }

  createParticles();

  // ── Project Carousel ───────────────────────────
  const carousel = document.getElementById('projectsCarousel');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const progressBar = document.getElementById('carouselProgress');

  function updateProgress() {
    if (!carousel || !progressBar) return;
    const scrollLeft = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const pct = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    progressBar.style.width = Math.max(14, pct) + '%';
  }

  if (carousel) {
    carousel.addEventListener('scroll', updateProgress, { passive: true });
  }

  if (prevBtn && carousel) {
    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -360, behavior: 'smooth' });
    });
  }

  if (nextBtn && carousel) {
    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: 360, behavior: 'smooth' });
    });
  }

  // ── Social Card Stagger on Reveal ──────────────
  const connectSection = document.querySelector('.connect-section');
  if (connectSection) {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.social-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, i * 80);
            });
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    cardObserver.observe(connectSection);

    // Initial hidden state
    const socialCards = connectSection.querySelectorAll('.social-card');
    socialCards.forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    });
  }

})();