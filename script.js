// =========================
// SAWB | PREMIUM RUSSIA TOURS JS
// Fully Scoped & Performance Optimized
// =========================

(function() {
  'use strict';

  // State & Elements
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");
  const siteHeader = document.getElementById("siteHeader");
  const bearingProgress = document.getElementById("bearingProgress");
  const heroShade = document.querySelector(".hero-shade");
  const parallaxBg = document.querySelector('.parallax-bg');
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const whatsappNumber = "79962282525";

  // Performance Helper: Throttle for scroll events
  const throttle = (fn, wait) => {
    let time = Date.now();
    return () => {
      if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    };
  };

  
  // 0. Image fallback mechanism
  const fallbackImage = "https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=1400&q=80";
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      if (img.dataset.fallbackUsed === "true") return;
      img.dataset.fallbackUsed = "true";
      img.src = fallbackImage;
    });
  });

  // 1. Mobile Menu Toggle with Accessibility
  if (menuBtn && navMenu) {
    const toggleMenu = () => {
      const isActive = navMenu.classList.toggle("active");
      menuBtn.textContent = isActive ? "×" : "☰";
      menuBtn.setAttribute("aria-expanded", isActive);
      menuBtn.setAttribute("aria-label", isActive ? "Close menu" : "Open menu");
    };
    
    menuBtn.addEventListener("click", toggleMenu);

    document.querySelectorAll(".nav a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) toggleMenu();
      });
    });
  }

  // 2. Preloader & Initial Reveal sequence
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
      }, 800); // Slightly faster default load perceived
    }
  });

  // 3. Advanced Scroll Reveals (IntersectionObserver)
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
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
  
  document.querySelectorAll('.reveal:not(#home .reveal)').forEach(el => {
    observer.observe(el);
  });

  // 4. Cinematic Parallax & Header Scroll Logic (Throttled)
  const handleScroll = throttle(() => {
    const scrollPosition = window.scrollY;

    if (parallaxBg && !prefersReducedMotion) {
      parallaxBg.style.transform = `translateY(${scrollPosition * 0.4}px) scale(1.1)`;
    }
    if (heroShade && !prefersReducedMotion && scrollPosition < window.innerHeight * 1.2) {
      heroShade.style.transform = `translateY(${scrollPosition * 0.15}px)`;
    }
    if (siteHeader) {
      if (scrollPosition > 30) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    }
    
    if (bearingProgress) {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollableHeight > 0 ? (scrollPosition / scrollableHeight) * 100 : 0;
      bearingProgress.style.width = pct + '%';
    }
  }, 20); // Fire every ~20ms

  window.addEventListener('scroll', handleScroll, { passive: true });

  // 5. FAQ Accordion (Accessible handling)
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;
    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      
      faqItems.forEach((faq) => {
        faq.classList.remove("active");
        faq.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });
      
      if (!isActive) {
        item.classList.add("active");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  // 6. Magnetic Buttons Interaction (Safe Guarded)
  if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
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
  }

  // 7. Full WhatsApp Form Handler (Smart Language Detection & Bulletproof Emojis)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name')?.value || 'Guest';
    const city = document.getElementById('city')?.value || 'Not specified';
    const dateFromRaw = document.getElementById('date-from')?.value || '';
    const dateToRaw = document.getElementById('date-to')?.value || '';
    const messageText = document.getElementById('message')?.value.trim() || '';
    
    // Helper function to auto-format the date from YYYY-MM-DD to DD/MM/YYYY
    const formatDate = (dateStr) => {
        if (dateStr && dateStr.includes('-')) {
            const parts = dateStr.split('-');
            if (parts.length === 3) {
                return `${parts[2]}/${parts[1]}/${parts[0]}`;
            }
        }
        return dateStr;
    };

    const isArabic = document.documentElement.lang === 'ar';
    
    // Format the combined dates string based on the language
    let travelDates = '';
    if (isArabic) {
        const fromAr = formatDate(dateFromRaw) || 'غير محدد';
        const toAr = formatDate(dateToRaw) || 'غير محدد';
        travelDates = `من ${fromAr} إلى ${toAr}`;
    } else {
        const fromEn = formatDate(dateFromRaw) || 'Not specified';
        const toEn = formatDate(dateToRaw) || 'Not specified';
        travelDates = `From ${fromEn} to ${toEn}`;
    }
    
   let message = "";

if (isArabic) {
    message = `مرحباً فريق صوب!

أنا مهتم بحجز رحلة.

الاسم: ${name}
فترة السفر: ${travelDates}
المدينة: ${city}`;

    if (messageText) {
        message += `

تفاصيل إضافية:
${messageText}`;
    }

} else {
    message = `Hello Sawb Team!

I am interested in booking a trip.

Name: ${name}
Travel Period: ${travelDates}
City: ${city}`;

    if (messageText) {
        message += `

Additional Details:
${messageText}`;
    }
}
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  });
}

  // 8. Trust Stat Count-Up
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

        const duration = 1200;
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

  // 9. Refactored Gallery Lightbox (Better Accessibility)
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image Lightbox');
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close Lightbox">&times;</button>
      <img src="" alt="" />
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    const openLightbox = (imgSrc, imgAlt) => {
      lightboxImg.src = imgSrc;
      lightboxImg.alt = imgAlt || '';
      lightbox.classList.add('active');
      lightboxClose.focus();
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

      item.addEventListener('click', () => openLightbox(img.src, img.alt));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(img.src, img.alt);
        }
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
  }

})();