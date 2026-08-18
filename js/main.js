/* ==========================================================================
   TOMA FC RABINDRA NAGAR EAST — INTERACTIVE SCRIPTS & WHATSAPP INTEGRATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initWhatsAppActions();
  initEnquiryForm();
  initGallery();
  initScrollAnimations();
});

/* NAVBAR TRANSFORMATION & MOBILE DRAWER */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking a nav link
    const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Highlight Active Page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* WHATSAPP ACTION HELPER */
const WHATSAPP_NUMBER = '919123709602';

function openWhatsApp(customText) {
  const encodedText = encodeURIComponent(customText);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
  window.open(waUrl, '_blank');
}

function initWhatsAppActions() {
  const joinBtns = document.querySelectorAll('[data-wa-action="join"]');
  const trainingBtns = document.querySelectorAll('[data-wa-action="training"]');
  const contactBtns = document.querySelectorAll('[data-wa-action="contact"]');
  const defaultBtns = document.querySelectorAll('[data-wa-action="default"]');

  joinBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openWhatsApp("Hello Toma FC Rabindra Nagar East! 👋\n\nI came across your academy website and I'm interested in joining Toma FC.\n\nI would like to know more about the academy, training and admission process.\n\nThank you!");
    });
  });

  trainingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openWhatsApp("Hello Toma FC Rabindra Nagar East! 👋 I’m interested in your football training programs and would like to know more.");
    });
  });

  contactBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openWhatsApp("Hello Toma FC Rabindra Nagar East! 👋 I would like to join TOMA FC and would like more information about the next steps.");
    });
  });

  defaultBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openWhatsApp("Hello Toma FC Rabindra Nagar East! 👋 I’m interested in joining the academy. I’d like to know more about the training and admission process.");
    });
  });
}

/* ENQUIRY FORM -> WHATSAPP REDIRECT */
function initEnquiryForm() {
  const form = document.getElementById('academy-enquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const parentName = document.getElementById('parentName')?.value.trim() || 'N/A';
    const playerName = document.getElementById('playerName')?.value.trim() || 'N/A';
    const age = document.getElementById('playerAge')?.value.trim() || 'N/A';
    const phone = document.getElementById('userPhone')?.value.trim() || 'N/A';
    const message = document.getElementById('userMessage')?.value.trim() || 'N/A';

    const formattedMsg = `Hello Toma FC Rabindra Nagar East! 👋\n\nI would like to enquire about joining the academy.\n\nParent/Guardian: ${parentName}\nPlayer: ${playerName}\nAge: ${age}\nPhone: ${phone}\n\nMessage:\n${message}\n\nThank you!`;

    openWhatsApp(formattedMsg);
  });
}

/* GALLERY FILTERING & LIGHTBOX */
function initGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  if (galleryItems.length > 0 && lightbox) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-title')?.textContent || '';
        
        if (img && lightboxImg) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          if (lightboxCaption) lightboxCaption.textContent = title + ' (Illustrative Brand Imagery)';
          lightbox.classList.add('active');
        }
      });
    });

    lightboxClose?.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }
}

/* SCROLL REVEAL ANIMATIONS */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.focus-card, .stat-item, .mv-card, .timeline-step, .gallery-item').forEach(el => {
    observer.observe(el);
  });
}
