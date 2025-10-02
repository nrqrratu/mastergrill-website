// ===== Mobile Navigation Toggle =====
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// ===== Smooth Scrolling for Nav Links =====
document.querySelectorAll('.nav-link, .submenu-link, .btn').forEach(link => {
  const href = link.getAttribute('href');
  if (href === '#menu') return; // skip scrolling for this link

  link.addEventListener('click', e => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ===== Dropdown Menu Toggle =====
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', e => {
    e.preventDefault(); // prevent any default scrolling
    const parent = toggle.parentElement;
    parent.classList.toggle('active'); // toggle dropdown visibility
  });
});

/// Mobile & Desktop Dropdown Fix
document.querySelectorAll('.dropdown-toggle, .submenu-toggle').forEach(toggle => {
  toggle.addEventListener('click', e => {
    e.preventDefault(); // prevent default link action

    const parent = toggle.parentElement;

    // close other open submenus
    document.querySelectorAll('.dropdown, .submenu').forEach(item => {
      if (item !== parent) item.classList.remove('active');
    });

    // toggle current submenu
    parent.classList.toggle('active');
  });
});

// Submenu links (PDF/anchor) behave normally
document.querySelectorAll('.submenu-menu a').forEach(link => {
  link.addEventListener('click', e => {
    // no preventDefault here, link works normally
  });
});



// ===== Gallery Slider =====
document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.querySelector(".image-row");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  if (!galleryContainer || !leftArrow || !rightArrow) return;

  let currentIndex = 0;

  function getImagesPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 4;
  }

  function updateSlider() {
    const imageWidth = galleryContainer.children[0].getBoundingClientRect().width;
    galleryContainer.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
  }

  leftArrow.addEventListener("click", () => {
    const imagesPerView = getImagesPerView();
    currentIndex -= imagesPerView;
    if (currentIndex < 0) currentIndex = 0;
    updateSlider();
  });

  rightArrow.addEventListener("click", () => {
    const imagesPerView = getImagesPerView();
    const totalImages = galleryContainer.children.length;
    currentIndex += imagesPerView;
    if (currentIndex > totalImages - imagesPerView) currentIndex = totalImages - imagesPerView;
    if (currentIndex < 0) currentIndex = 0; // safety
    updateSlider();
  });

  window.addEventListener("resize", () => {
    updateSlider();
  });
  updateSlider();
});

// ===== Contact Form Submission (Demo) =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
    e.target.reset();
  });
}

// ===== Review Slider =====
document.addEventListener("DOMContentLoaded", () => {
  const reviewContainer = document.querySelector('.review-container');
  const reviews = document.querySelectorAll('.review');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.querySelector('.dots-container');

  if (!reviewContainer || reviews.length === 0 || !prevBtn || !nextBtn || !dotsContainer) return;

  let currentReview = 0;
  const totalReviews = reviews.length;

  // Create dots
  for (let i = 0; i < totalReviews; i++) {
    const dot = document.createElement('button');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to review ${i + 1}`);
    dot.addEventListener('click', () => goToReview(i));
    dotsContainer.appendChild(dot);
  }
  const dots = dotsContainer.querySelectorAll('button');

  function updateReviewSlider() {
    reviewContainer.style.transform = `translateX(-${currentReview * 100}%)`;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === currentReview);
      d.setAttribute('aria-selected', i === currentReview);
    });
  }

  function goToReview(index) {
    currentReview = index;
    updateReviewSlider();
  }

  prevBtn.addEventListener('click', () => {
    currentReview = (currentReview - 1 + totalReviews) % totalReviews;
    updateReviewSlider();
  });

  nextBtn.addEventListener('click', () => {
    currentReview = (currentReview + 1) % totalReviews;
    updateReviewSlider();
  });

  updateReviewSlider();
});

// ===== FAQ Accordion =====
document.querySelectorAll(".faq-item").forEach(item => {
  const question = item.querySelector(".faq-question");
  const icon = item.querySelector(".faq-icon");

  question.addEventListener("click", () => {
    item.classList.toggle("active");
    icon.textContent = item.classList.contains("active") ? "–" : "+";
  });
});

// ===== Generic Accordion =====
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    header.classList.toggle('active');
    const body = header.nextElementSibling;
    body.classList.toggle('open');
    body.style.maxHeight = body.classList.contains('open') ? body.scrollHeight + "px" : null;
  });
});
