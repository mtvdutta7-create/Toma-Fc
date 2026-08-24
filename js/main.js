/* ==========================================================================
   TOMA FC RABINDRA NAGAR EAST — INTERACTIVE SCRIPTS (UPDATED)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initActionButtons();
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

/* ACTION BUTTON HANDLER (CLICKABLE WITHOUT EXTERNAL WHATSAPP REDIRECT) */
function initActionButtons() {
  const actionBtns = document.querySelectorAll('[data-action="join"], [data-wa-action], .btn-join-action');

  actionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // If contact form exists on page, scroll smoothly to it
      const contactForm = document.getElementById('academy-enquiry-form');
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
        contactForm.querySelector('input')?.focus();
      } else {
        // Redirect to contact page
        window.location.href = 'contact.html';
      }
    });
  });
}

/* ENQUIRY FORM SUBMISSION */
function initEnquiryForm() {
  const form = document.getElementById('academy-enquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const parentName = document.getElementById('parentName')?.value.trim() || 'Parent/Guardian';
    const playerName = document.getElementById('playerName')?.value.trim() || 'Player';

    // Show elegant success notification
    let alertBox = document.getElementById('form-success-alert');
    if (!alertBox) {
      alertBox = document.createElement('div');
      alertBox.id = 'form-success-alert';
      alertBox.style.cssText = `
        background-color: #061A12;
        color: #C5A880;
        border: 1px solid #C5A880;
        padding: 1.2rem 1.5rem;
        margin-top: 1.5rem;
        font-family: var(--font-body);
        font-size: 0.95rem;
        text-align: center;
        border-radius: 4px;
        animation: fadeIn 0.4s ease;
      `;
      form.appendChild(alertBox);
    }

    alertBox.innerHTML = `<strong>Thank You, ${parentName}!</strong><br>Your enquiry for <strong>${playerName}</strong> has been submitted successfully to TOMA FC Rabindra Nagar East. Our team will reach out to you soon.`;

    form.reset();

    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 8000);
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
