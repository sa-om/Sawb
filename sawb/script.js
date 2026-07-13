// =========================
// SAWB | PREMIUM RUSSIA TOURS JS
// =========================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const siteHeader = document.getElementById("siteHeader");
const bearingProgress = document.getElementById("bearingProgress");
const heroShade = document.querySelector(".hero-shade");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const whatsappNumber = "000000000000"; // REPLACE WITH YOUR NUMBER


// 0. Image fallback: if an external photo fails, replace it with a working Moscow image.
const fallbackImage = "https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=1400&q=80";
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    if (img.dataset.fallbackUsed === "true") return;
    img.dataset.fallbackUsed = "true";
    img.src = fallbackImage;
  });
});

// 1. Mobile Menu
if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    if (navMenu.classList.contains("active")) {
      menuBtn.textContent = "×";
      menuBtn.setAttribute("aria-label", "Close menu");
    } else {
      menuBtn.textContent = "☰";
      menuBtn.setAttribute("aria-label", "Open menu");
    }
  });
}
document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu) navMenu.classList.remove("active");
    if (menuBtn) {
      menuBtn.textContent = "☰";
      menuBtn.setAttribute("aria-label", "Open menu");
    }
  });
});

// 2. Preloader & Initial Reveal
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      setTimeout(() => {
        document.querySelectorAll('#home .reveal').forEach((el) => {
          el.classList.add('show');
        });
      }, 200);
    }, 1200);
  }
});

// 3. Advanced Scroll Reveals (IntersectionObserver)
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target); 
    }
  });
}, observerOptions);
document.querySelectorAll('.reveal').forEach(el => {
  if(!el.closest('#home')) {
    observer.observe(el);
  }
});

// 4. Cinematic Parallax Hero Background & Header Shadow
const parallaxBg = document.querySelector('.parallax-bg');
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  if (parallaxBg && !prefersReducedMotion) {
    parallaxBg.style.transform = `translateY(${scrollPosition * 0.4}px) scale(1.1)`;
  }
  // Secondary parallax layer for cinematic depth (moves slower than the background)
  if (heroShade && !prefersReducedMotion && scrollPosition < window.innerHeight * 1.2) {
    heroShade.style.transform = `translateY(${scrollPosition * 0.15}px)`;
  }
  if (siteHeader) {
    if (window.scrollY > 30) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  }
  // Bearing progress: a thin gold line tracking scroll position, top of viewport
  if (bearingProgress) {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollableHeight > 0 ? (scrollPosition / scrollableHeight) * 100 : 0;
    bearingProgress.style.width = pct + '%';
  }
});

// 5. FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  if (!question) return;
  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    faqItems.forEach((faq) => faq.classList.remove("active"));
    if (!isActive) {
      item.classList.add("active");
    }
  });
});

// 6. Magnetic Buttons Interaction
const magneticElements = document.querySelectorAll('.magnetic');
magneticElements.forEach((elem) => {
  elem.addEventListener('mousemove', (e) => {
    const rect = elem.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  elem.addEventListener('mouseleave', () => {
    elem.style.transform = 'translate(0px, 0px)';
  });
});

// 7. Full WhatsApp Form Handler (Smart Language Detection)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name')?.value || 'Guest';
    const email = document.getElementById('email')?.value || 'Not provided';
    const city = document.getElementById('city')?.value || 'Not specified';
    const dates = document.getElementById('dates')?.value || 'Not specified';
    const messageText = document.getElementById('message')?.value || '';
    
    const isArabic = document.documentElement.lang === 'ar';
    let message = "";
    
    if (isArabic) {
        message = `مرحباً فريق صوب! 🌟\n\nأنا مهتم بحجز رحلة.\n\n👤 الاسم: ${name}\n✉️ الإيميل: ${email}\n📅 التواريخ: ${dates}\n📍 المدينة: ${city}\n\n📝 تفاصيل إضافية:\n${messageText ? messageText : "لا توجد تفاصيل إضافية."}`;
    } else {
        message = `Hello Sawb Team! 🌟\n\nI am interested in booking a trip.\n\n👤 Name: ${name}\n✉️ Email: ${email}\n📅 Dates: ${dates}\n📍 City: ${city}\n\n📝 Additional Details:\n${messageText ? messageText : "No additional details."}`;
    }
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  });
}

// 8. Trust Stat Count-Up (animates numeric stats into view once)
const countTargets = document.querySelectorAll('[data-count]');
if (countTargets.length) {
  const countObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      obs.unobserve(el);

      if (prefersReducedMotion || isNaN(target)) {
        el.textContent = isNaN(target) ? el.textContent : target;
        return;
      }

      const duration = 900;
      const startTime = performance.now();
      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  countTargets.forEach((el) => countObserver.observe(el));
}

// 9. Gallery Lightbox (click any gallery photo to view it larger)
const galleryItems = document.querySelectorAll('.gallery-item');
if (galleryItems.length) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox-overlay';
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <img src="" alt="" />
  `;
  document.body.appendChild(lightbox);
  const lightboxImg = lightbox.querySelector('img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  const openLightbox = (img) => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.classList.add('active');
  };
  const closeLightbox = () => {
    lightbox.classList.remove('active');
  };

  galleryItems.forEach((item) => {
    const img = item.querySelector('img');
    if (!img) return;
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', img.alt ? `View larger: ${img.alt}` : 'View larger image');

    item.addEventListener('click', () => openLightbox(img));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(img);
      }
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}