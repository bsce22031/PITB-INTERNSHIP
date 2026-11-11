/**
 * Govt. Rabia Basri Graduate College - Walton Road, Lahore
 * Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Sticky Navbar Transition
  const mainNavbar = document.querySelector('.main-navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      mainNavbar.classList.add('scrolled');
    } else {
      mainNavbar.classList.remove('scrolled');
    }
  });

  // 2. Program Tabs Switching (BS Admissions vs Intermediate)
  const tabBs = document.getElementById('tab-bs');
  const tabInter = document.getElementById('tab-inter');
  const gridBs = document.getElementById('programs-bs-grid');
  const gridInter = document.getElementById('programs-inter-grid');

  if (tabBs && tabInter && gridBs && gridInter) {
    tabBs.addEventListener('click', function () {
      tabBs.classList.add('active');
      tabInter.classList.remove('active');
      gridBs.classList.remove('d-none');
      gridInter.classList.add('d-none');
    });

    tabInter.addEventListener('click', function () {
      tabInter.classList.add('active');
      tabBs.classList.remove('active');
      gridInter.classList.remove('d-none');
      gridBs.classList.add('d-none');
    });
  }

  // 3. Animated Stats Counters with Intersection Observer
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const countUp = (element, target) => {
    let current = 0;
    const duration = 1800;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString() + ' +';
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString() + ' +';
      }
    }, stepTime);
  };

  const observerOptions = {
    threshold: 0.3
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          if (!isNaN(target)) {
            countUp(stat, target);
          }
        });
        observer.disconnect();
      }
    });
  }, observerOptions);

  const statsSection = document.querySelector('.section-stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // 4. Principal Message Read More Toggle
  const readMoreBtn = document.getElementById('btn-principal-readmore');
  const moreText = document.getElementById('principal-more-text');
  if (readMoreBtn && moreText) {
    readMoreBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (moreText.classList.contains('d-none')) {
        moreText.classList.remove('d-none');
        readMoreBtn.innerHTML = 'Show Less <i class="bi bi-chevron-up ms-1"></i>';
      } else {
        moreText.classList.add('d-none');
        readMoreBtn.innerHTML = 'Read More <i class="bi bi-arrow-right ms-1"></i>';
      }
    });
  }

  // 5. Interactive Lightbox Modal for Gallery
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxModal = document.getElementById('galleryModal');
  const lightboxImg = document.getElementById('galleryModalImg');
  const lightboxTitle = document.getElementById('galleryModalTitle');

  if (lightboxModal && lightboxImg && lightboxTitle) {
    const modalInstance = new bootstrap.Modal(lightboxModal);
    galleryCards.forEach(card => {
      card.addEventListener('click', function () {
        const img = card.querySelector('img');
        const title = card.querySelector('.gallery-title');
        if (img) lightboxImg.src = img.src;
        if (title) lightboxTitle.textContent = title.textContent;
        modalInstance.show();
      });
    });
  }

  // 6. Admission Inquiry Form Submission (Interactive Simulation)
  const inquiryForm = document.getElementById('admissionInquiryForm');
  const inquiryAlert = document.getElementById('inquiryAlert');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (inquiryAlert) {
        inquiryAlert.classList.remove('d-none');
        inquiryAlert.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> Thank you! Your admission inquiry has been received. Our admissions counselor will contact you shortly.';
        inquiryForm.reset();
      }
    });
  }

  // 7. Close Mobile Navbar Collapse on Nav Link Click
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('mainNav');
  if (navbarCollapse) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          new bootstrap.Collapse(navbarCollapse).hide();
        }
      });
    });
  }

});
