
(function() {
  "use strict";

  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    const header = document.querySelector('#header');
    const toggle = document.querySelector('.header-toggle');
    header.classList.toggle('header-show');
    toggle.classList.toggle('active');
    
    if (!header.classList.contains('header-show')) {
      document.querySelectorAll('#navmenu ul li').forEach(li => {
        li.style.transitionDelay = '0s';
      });
    } else {
      document.querySelectorAll('#navmenu ul li').forEach((li, i) => {
        li.style.transitionDelay = `${(i + 1) * 0.06}s`;
      });
    }
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      const header = document.querySelector('#header');
      const toggle = document.querySelector('.header-toggle');
      if (header.classList.contains('header-show')) {
        header.classList.remove('header-show');
        toggle.classList.remove('active');
        document.querySelectorAll('#navmenu ul li').forEach(li => {
          li.style.transitionDelay = '0s';
        });
      }
    });
  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  new PureCounter();

  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  const glightbox = GLightbox({ selector: '.glightbox' });

  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({ filter: this.getAttribute('data-filter') });
        if (typeof aosInit === 'function') { aosInit(); }
      }, false);
    });
  });

  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());
      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }
  window.addEventListener("load", initSwiper);

  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  let navmenulinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const themeIcon = themeToggle?.querySelector('i');

  function setThemeIcon(isDark) {
    if (!themeIcon) return;
    themeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  }

  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark-theme');
    setThemeIcon(true);
  }

  themeToggle?.addEventListener('click', () => {
    html.classList.toggle('dark-theme');
    const isDark = html.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setThemeIcon(isDark);
  });

  const langToggle = document.getElementById('lang-toggle');
  const langLabel = langToggle?.querySelector('span');
  let currentLang = localStorage.getItem('lang') || 'en';

  function applyLanguage(lang) {
    document.querySelectorAll('[data-en][data-es]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else if (text.includes('<')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });
    html.lang = lang;
    if (langLabel) langLabel.textContent = lang === 'en' ? 'ES' : 'EN';
    currentLang = lang;
  }

  applyLanguage(currentLang);

  langToggle?.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'es' : 'en';
    localStorage.setItem('lang', newLang);
    applyLanguage(newLang);
  });

  /*================================================================
    APPLE-STYLE INTERACTIVE ANIMATIONS
  ================================================================*/

  /* Scroll Progress Bar */
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = progress + '%';
    }, { passive: true });
  }

  /* Floating Background Orbs */
  function createFloatingOrbs() {
    const container = document.getElementById('floating-particles');
    if (!container) return;
    
    for (let i = 0; i < 5; i++) {
      const orb = document.createElement('div');
      orb.className = 'floating-orb';
      const size = Math.random() * 300 + 100;
      orb.style.width = size + 'px';
      orb.style.height = size + 'px';
      orb.style.left = Math.random() * 100 + '%';
      orb.style.top = Math.random() * 100 + '%';
      orb.style.animationDelay = (i * 3) + 's';
      orb.style.animationDuration = (Math.random() * 15 + 15) + 's';
      container.appendChild(orb);
    }
  }
  createFloatingOrbs();

  /* Click Burst Effect */
  function createClickBurst(x, y) {
    const colors = ['#149ddd', '#00d4ff', '#a855f7', '#f472b6', '#fbbf24'];
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'burst-particle';
      const angle = (Math.PI * 2 * i) / 8;
      const distance = Math.random() * 60 + 40;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const size = Math.random() * 8 + 4;
      
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.setProperty('--tx', tx + 'px');
      particle.style.setProperty('--ty', ty + 'px');
      
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 800);
    }
  }

  document.addEventListener('click', (e) => {
    createClickBurst(e.clientX, e.clientY);
  });

  /* Text Reveal Animation */
  const revealSections = document.querySelectorAll('.section-title[data-text-reveal]');
  if (revealSections.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    revealSections.forEach(section => revealObserver.observe(section));
  }

  /* Skills Orbit Animation */
  const orbitSkills = document.querySelectorAll('.orbit-skill');
  if (orbitSkills.length > 0) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stagger = parseInt(entry.target.getAttribute('data-stagger')) || 0;
          setTimeout(() => {
            entry.target.classList.add('animate');
          }, stagger * 80);
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    orbitSkills.forEach(item => skillsObserver.observe(item));
  }

  /* Tech Explosion on Click */
  const techColors = {
    'java': '#f89820', 'spring': '#6db33f', 'angular': '#dd0031',
    'mysql': '#4479a1', 'git': '#f05032', 'jenkins': '#d24939',
    'oracle': '#f80000', 'html': '#e34f26', 'css': '#1572b6',
    'docker': '#2496ed', 'sourcetree': '#0052cc', 'hibernate': '#59666c'
  };

  document.querySelectorAll('.orbit-card').forEach(card => {
    card.addEventListener('click', function(e) {
      const skillEl = this.closest('.orbit-skill');
      const tech = skillEl.getAttribute('data-tech');
      const rect = this.getBoundingClientRect();
      const color = techColors[tech] || 'var(--accent-color)';

      skillEl.classList.add('exploding');

      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'tech-burst-particle';
        const angle = (Math.PI * 2 * i) / 12;
        const distance = Math.random() * 80 + 50;
        const bx = Math.cos(angle) * distance;
        const by = Math.sin(angle) * distance;
        const size = Math.random() * 10 + 4;

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.setProperty('--bx', bx + 'px');
        particle.style.setProperty('--by', by + 'px');
        particle.style.left = (rect.left + rect.width / 2) + 'px';
        particle.style.top = (rect.top + rect.height / 2) + 'px';
        particle.style.position = 'fixed';

        const burstContainer = document.createElement('div');
        burstContainer.className = 'tech-burst';
        burstContainer.appendChild(particle);
        document.body.appendChild(burstContainer);

        setTimeout(() => burstContainer.remove(), 600);
      }

      setTimeout(() => {
        skillEl.classList.remove('exploding');
        skillEl.classList.add('reforming');
        setTimeout(() => {
          skillEl.classList.remove('reforming');
          skillEl.classList.add('animate');
        }, 600);
      }, 800);
    });
  });

  /* 3D Tilt on Apple Cards */
  document.querySelectorAll('.apple-card, .apple-card-3d').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });

  /* Floating Stats Bubbles */
  const statBubbles = document.querySelectorAll('.stat-bubble');
  if (statBubbles.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const numberEl = entry.target.querySelector('.stat-number');
          const target = parseInt(numberEl.getAttribute('data-target'));
          animateCounter(numberEl, target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statBubbles.forEach(bubble => statsObserver.observe(bubble));

    statBubbles.forEach(bubble => {
      bubble.addEventListener('click', function() {
        this.style.animation = 'none';
        this.offsetHeight;
        const icon = this.querySelector('.stat-icon');
        icon.style.animation = 'none';
        icon.offsetHeight;
        icon.style.animation = 'icon-bounce 0.5s ease';
      });
    });
  }

  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString();
    }, 25);
  }

  /* Parallax on Scroll for Floating Stats */
  if (statBubbles.length > 0 && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      statBubbles.forEach(bubble => {
        const speed = parseFloat(bubble.getAttribute('data-speed')) || 0.3;
        bubble.style.transform = `translateY(${scrollY * speed * -0.1}px)`;
      });
    }, { passive: true });
  }

  /* Magnetic Effect for Targets */
  if (window.innerWidth > 768) {
    document.querySelectorAll('.magnetic-target').forEach(target => {
      target.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      target.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
      });
    });
  }

  /* Ripple Effect on Cards */
  document.querySelectorAll('.ripple-container').forEach(container => {
    container.addEventListener('touchstart', function(e) {
      const touch = e.touches[0];
      const rect = this.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  /* Hero Letter Interactive */
  const heroLetter = document.querySelector('[data-letter]');
  if (heroLetter && window.innerWidth > 768) {
    document.addEventListener('mousemove', function(e) {
      if (window.scrollY > 200) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroLetter.style.transform = `translate(calc(-50% + ${x}px), ${y}px)`;
    });
  }

  /* CTA Button Glow Pulse */
  const ctaBtn = document.querySelector('.btn-cta');
  if (ctaBtn) {
    ctaBtn.addEventListener('mouseenter', function() {
      this.style.animation = 'none';
      this.offsetHeight;
    });
  }

  /* Smooth Scroll for Internal Links */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


})();
