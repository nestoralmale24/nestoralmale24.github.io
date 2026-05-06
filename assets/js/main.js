

(function() {
  'use strict';

  /* ===== Typed.js ===== */
  const typedEl = document.querySelector('.typed');
  if (typedEl) {
    const strings = typedEl.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings: strings.map(s => s.trim()),
      loop: true,
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 2000
    });
  }

  /* ===== Scroll Reveal ===== */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.getAttribute('data-reveal-delay') || 0);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  /* ===== Counter Animation ===== */
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current).toLocaleString();
        }, 30);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  /* ===== Scroll Top Button ===== */
  const scrollTopBtn = document.querySelector('.scroll-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  /* ===== Mobile Nav ===== */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
  }

  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle?.classList.remove('active');
      navLinks?.classList.remove('open');
    });
  });

  /* ===== Theme Toggle ===== */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle?.querySelector('i');

  function setThemeIcon(isDark) {
    if (!themeIcon) return;
    themeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  }

  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark-theme');
    setThemeIcon(true);
  }

  themeToggle?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-theme');
    const isDark = document.documentElement.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setThemeIcon(isDark);
  });

  /* ===== Language Toggle ===== */
  const langToggle = document.getElementById('lang-toggle');
  const langLabel = langToggle?.querySelector('span');
  let currentLang = localStorage.getItem('lang') || 'en';

  function applyLanguage(lang) {
    document.querySelectorAll('[data-en][data-es]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (!text) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else if (text.includes('<')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });
    document.documentElement.lang = lang;
    if (langLabel) langLabel.textContent = lang === 'en' ? 'ES' : 'EN';
    currentLang = lang;
  }

  applyLanguage(currentLang);

  langToggle?.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'es' : 'en';
    localStorage.setItem('lang', newLang);
    applyLanguage(newLang);
  });

  /* ===== Smooth Scroll for anchor links ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
