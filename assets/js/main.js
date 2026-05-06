

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    const header = document.querySelector('#header');
    const toggle = document.querySelector('.header-toggle');
    header.classList.toggle('header-show');
    toggle.classList.toggle('active');
    
    if (!header.classList.contains('header-show')) {
      document.querySelectorAll('#navmenu ul li').forEach((li, i) => {
        li.style.transitionDelay = '0s';
      });
    } else {
      document.querySelectorAll('#navmenu ul li').forEach((li, i) => {
        li.style.transitionDelay = `${(i + 1) * 0.05}s`;
      });
    }
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
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

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
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

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
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

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
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
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
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

  /**
   * Navmenu Scrollspy
   */
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
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
  
  /**
   * Dark / Light theme toggle
   */
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

  /**
   * Language toggle (EN / ES)
   */
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


  /**
   * Scroll Progress Bar
   */
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = progress + '%';
    });
  }

  /**
   * Text Reveal Animation
   */
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

  /**
   * Skills Stagger Entrance Animation
   */
  const skillItems = document.querySelectorAll('.skill-item');
  if (skillItems.length > 0) {
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

    skillItems.forEach(item => skillsObserver.observe(item));
  }

  /**
   * 3D Tilt Effect on Skill Cards
   */
  const tiltCards = document.querySelectorAll('.tilt-card');
  if (tiltCards.length > 0 && window.innerWidth > 768) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      });
    });
  }

  /**
   * Floating Animation for Skills
   */
  const floatingSkills = document.querySelectorAll('.tilt-card');
  if (floatingSkills.length > 0) {
    const floatObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('floating');
        } else {
          entry.target.classList.remove('floating');
        }
      });
    }, { threshold: 0.5 });

    floatingSkills.forEach(skill => floatObserver.observe(skill));
  }

  /**
   * Glow Effect on Skill Hover
   */
  const techColors = {
    'Java': '#f89820',
    'Spring': '#6db33f',
    'Angular': '#dd0031',
    'MySQL': '#4479a1',
    'Git': '#f05032',
    'Jenkins': '#d24939',
    'Oracle': '#f80000',
    'HTML': '#e34f26',
    'CSS': '#1572b6',
    'Microservices': '#2496ed',
    'Sourcetree': '#0052cc',
    'Hibernate': '#59666c'
  };

  if (tiltCards.length > 0) {
    tiltCards.forEach(card => {
      const glow = document.createElement('div');
      glow.className = 'skill-glow';
      card.appendChild(glow);

      const skillName = card.querySelector('b')?.textContent;
      const color = techColors[skillName] || 'var(--accent-color)';
      glow.style.background = color;

      card.addEventListener('mouseenter', () => {
        glow.style.background = color;
      });
    });
  }

  /**
   * Ripple Effect on Touch
   */
  const rippleContainers = document.querySelectorAll('.ripple-container');
  if (rippleContainers.length > 0) {
    rippleContainers.forEach(container => {
      container.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        container.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }



})();
