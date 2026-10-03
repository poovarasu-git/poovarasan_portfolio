/**
 * Poovarasan D - AI & ML Engineering Portfolio
 * Adaptive System Theme, Project Modals, & Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. System Default Theme Management
  // ------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  function getSystemTheme() {
    return prefersDarkScheme.matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'system') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('portfolio-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('portfolio-theme', theme);
    }
  }

  // Initial Theme load: stored preference or system default
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    applyTheme(savedTheme);
  } else {
    // Follows system default
    applyTheme('system');
  }

  // React to OS system theme changes automatically
  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio-theme')) {
      // No manual lock, automatically adapt to system change
      document.documentElement.removeAttribute('data-theme');
    }
  });

  // Toggle button click: toggle between Light and Dark
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentActiveTheme = document.documentElement.getAttribute('data-theme') || getSystemTheme();
      const nextTheme = currentActiveTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // ------------------------------------------------------------------------
  // 2. Mobile Menu Drawer Navigation
  // ------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu on clicking any navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // ------------------------------------------------------------------------
  // 3. Header Scroll Effect & Active Section Highlighting
  // ------------------------------------------------------------------------
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');

  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const currentNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (currentNavLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          currentNavLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ------------------------------------------------------------------------
  // 4. Scroll Reveal Animations (IntersectionObserver)
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ------------------------------------------------------------------------
  // 5. Project Modal Interactivity & Data Setup
  // ------------------------------------------------------------------------
  const projectsData = {
    'credit-score': {
      title: 'Credit Score Model Prediction',
      category: 'Machine Learning',
      problem: 'Financial institutions require accurate and automated risk evaluation models to categorize customer creditworthiness based on personal and financial parameters.',
      approach: 'Leveraged customer dataset preprocessing, extensive exploratory data analysis (EDA), feature engineering, and model training using algorithms such as Logistic Regression and Random Forest classifier.',
      keyFeatures: [
        'Data cleaning and missing value imputation',
        'Feature scaling and categorical encoding',
        'Model training & hyperparameter tuning',
        'Comprehensive evaluation via precision, recall, and ROC-AUC metrics'
      ],
      technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Machine Learning'],
      github: 'https://github.com/poovarasu-git'
    },
    'superstore-sales': {
      title: 'Superstore Sales Data Analytics',
      category: 'Data Analytics',
      problem: 'Retail management needs comprehensive visibility into multi-region sales performance, profitability bottlenecks, and customer purchasing patterns to optimize inventory and sales strategies.',
      approach: 'Cleaned and structured raw transactional sales data in Excel, modeled relations, created DAX calculations, and constructed an interactive Power BI dashboard with dynamic drill-downs.',
      keyFeatures: [
        'Data transformation and cleaning workflow',
        'Regional performance & profitability breakdown',
        'Product category sales distribution analysis',
        'Interactive Power BI KPI dashboard visuals'
      ],
      technologies: ['Microsoft Excel', 'Power BI', 'Data Analytics', 'Data Visualization'],
      github: 'https://github.com/poovarasu-git'
    },
    'handwritten-recognizer': {
      title: 'Handwritten Character Recognizer',
      category: 'AI / Machine Learning',
      problem: 'Recognizing user handwritten text requires robust computer vision models capable of handling handwriting variations, stroke thickness, and noise.',
      approach: 'Built a deep learning neural network pipeline in Python utilizing OpenCV for image preprocessing, feature extraction, and convolutional neural layers for character classification.',
      keyFeatures: [
        'Image binarization and contour detection',
        'Convolutional neural network / ML architecture',
        'Real-time digit and character classification',
        'High validation accuracy on benchmark datasets'
      ],
      technologies: ['Python', 'Machine Learning', 'Neural Networks', 'Computer Vision'],
      github: 'https://github.com/poovarasu-git'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalClose');

  window.openProjectModal = function(projectId) {
    const data = projectsData[projectId];
    if (!data || !projectModal) return;

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalProblem').textContent = data.problem;
    document.getElementById('modalApproach').textContent = data.approach;

    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    data.keyFeatures.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      featuresList.appendChild(li);
    });

    const techContainer = document.getElementById('modalTech');
    techContainer.innerHTML = '';
    data.technologies.forEach(tech => {
      const tag = document.createElement('span');
      tag.className = 'tech-tag';
      tag.textContent = tech;
      techContainer.appendChild(tag);
    });

    const githubBtn = document.getElementById('modalGithubBtn');
    if (githubBtn) {
      githubBtn.href = data.github;
    }

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // ------------------------------------------------------------------------
  // 6. Copy Email to Clipboard Feature
  // ------------------------------------------------------------------------
  const copyEmailBtns = document.querySelectorAll('.js-copy-email');
  const toast = document.getElementById('toast');

  function showToast(message) {
    if (!toast) return;
    toast.querySelector('.toast-msg').textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'dpoo.aiml2024@rmd.ac.in';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied!');
      }).catch(() => {
        showToast('Copied: ' + email);
      });
    });
  });

  // ------------------------------------------------------------------------
  // 7. Contact Form Email Composition Handler
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value;
      const email = document.getElementById('formEmail').value;
      const subject = document.getElementById('formSubject').value;
      const message = document.getElementById('formMessage').value;

      const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${subject || 'Inquiry'}`);
      const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

      window.location.href = `mailto:dpoo.aiml2024@rmd.ac.in?subject=${mailtoSubject}&body=${mailtoBody}`;

      showToast('Opening default email application...');
      contactForm.reset();
    });
  }

  // ------------------------------------------------------------------------
  // 8. Back-to-Top Button Observer
  // ------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
