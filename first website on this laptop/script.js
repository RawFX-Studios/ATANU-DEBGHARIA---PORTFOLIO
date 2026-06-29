/* ========================================
   SMOOTH SCROLLING & NAVIGATION
   ======================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ========================================
   INTERACTIVE PROJECT CARDS
   ======================================== */

document.querySelectorAll('.project').forEach(project => {
    const toggle = project.querySelector('.project-toggle');

    function updateProjectState() {
        project.classList.toggle('project-expanded');
        if (project.classList.contains('project-expanded')) {
            toggle.textContent = '- Collapse';
        } else {
            toggle.textContent = '+ Learn More';
        }
    }

    project.addEventListener('click', function () {
        updateProjectState();
    });

    if (toggle) {
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            updateProjectState();
        });
    }
});

/* ========================================
   RESPONSIVE NAVIGATION TOGGLE
   ======================================== */

const navToggle = document.querySelector('.nav-toggle');
const glassNav = document.querySelector('.glass-nav');
const navLinks = document.querySelectorAll('.nav-links a');

if (navToggle && glassNav) {
    navToggle.addEventListener('click', function () {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', String(!expanded));
        glassNav.classList.toggle('open');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (glassNav.classList.contains('open')) {
            glassNav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

window.addEventListener('click', (e) => {
    if (glassNav && !glassNav.contains(e.target) && glassNav.classList.contains('open')) {
        glassNav.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    }
});

/* ========================================
   PROJECT THUMBNAIL HOVER EFFECTS
   ======================================== */

document.querySelectorAll('.project-thumbnail').forEach(thumbnail => {
    const video = thumbnail.querySelector('.project-video');
    
    thumbnail.addEventListener('mouseenter', function () {
        if (video) {
            video.play();
        }
    });
});

/* ========================================
   SKILL CARDS INTERACTION
   ======================================== */

document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', function () {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });

    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-12px) scale(1.05)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

/* ========================================
   FORM VALIDATION & SUBMISSION
   ======================================== */

const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !message) {
            showAlert('Please fill in all fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email address.');
            return;
        }

        // Message length validation
        if (message.length < 10) {
            showAlert('Message should be at least 10 characters long.');
            return;
        }

        // Show success message
        successMessage.classList.add('show');

        // Reset form
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);

        // Log for demo purposes (In production, send to backend)
        console.log('Form submitted:', { name, email, message });
    });
}

function showAlert(message) {
    alert(message);
}

/* ========================================
   SCROLL ANIMATIONS & INTERSECTION OBSERVER
   ======================================== */

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.project, .skill-card, section').forEach(el => {
    observer.observe(el);
});

/* ========================================
   ACTIVE NAVIGATION LINK HIGHLIGHTING
   ======================================== */

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.glass-nav a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = 'var(--text-primary)';
        
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#7C3AED';
            link.style.fontWeight = '700';
        } else {
            link.style.fontWeight = '600';
        }
    });
});

/* ========================================
   PARALLAX EFFECT ON HERO VIDEO
   ======================================== */

window.addEventListener('scroll', () => {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo && window.pageYOffset < window.innerHeight) {
        heroVideo.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
    }
});

/* ========================================
   INITIAL ANIMATIONS ON PAGE LOAD
   ======================================== */

window.addEventListener('load', () => {
    // Fade in all sections with staggered timing
    document.querySelectorAll('section').forEach((el, index) => {
        el.style.animation = `fadeInUp 0.8s ease-out ${index * 0.15}s both`;
    });

    // Auto-pause hero video on mobile for better performance
    const heroVideo = document.querySelector('.hero-video');
    if (window.innerWidth < 768 && heroVideo) {
        heroVideo.removeAttribute('autoplay');
    }
});

window.addEventListener('resize', () => {
    const heroVideo = document.querySelector('.hero-video');
    if (window.innerWidth < 768 && heroVideo) {
        heroVideo.removeAttribute('autoplay');
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (glassNav && glassNav.classList.contains('open')) {
            glassNav.classList.remove('open');
            if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
    }
});

/* ========================================
   PREVENT VIDEO AUTOPLAY ON MOBILE
   ======================================== */

function disableVideoAutoplayOnMobile() {
    if (window.innerWidth < 768) {
        document.querySelectorAll('video').forEach(video => {
            video.removeAttribute('autoplay');
        });
    }
}

// Run on load and resize
window.addEventListener('load', disableVideoAutoplayOnMobile);
window.addEventListener('resize', disableVideoAutoplayOnMobile);

/* ========================================
   PERFORMANCE: LAZY LOAD VIDEOS
   ======================================== */

document.querySelectorAll('.project-video').forEach(video => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const source = entry.target.querySelector('source');
                if (source && !source.src.startsWith('blob:')) {
                    // Video is already set, just play it
                    entry.target.play().catch(err => {
                        console.log('Video play failed:', err);
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(video);
});

/* ========================================
   KEYBOARD NAVIGATION
   ======================================== */

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Collapse all expanded projects
        document.querySelectorAll('.project.project-expanded').forEach(project => {
            project.classList.remove('project-expanded');
            const toggle = project.querySelector('.project-toggle');
            toggle.textContent = '+ Learn More';
        });
    }
});

/* ========================================
   PRELOAD ANIMATIONS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Ensure hero section is visible before animations
    const heroHeader = document.querySelector('.hero-header');
    if (heroHeader) {
        heroHeader.style.opacity = '1';
    }

    // Preload critical images/videos
    const criticalVideos = document.querySelectorAll('video[preload="auto"]');
    console.log('Portfolio loaded with', document.querySelectorAll('.project').length, 'projects');
});

// Profile image fallback: replace with initials if image fails to load
document.addEventListener('DOMContentLoaded', () => {
    const img = document.getElementById('profilePic');
    if (!img) return;

    function showFallback() {
        const dpBox = img.closest('.dp-box');
        if (!dpBox) return;
        // Remove broken image if still present
        if (img.parentNode) img.parentNode.removeChild(img);
        // Create fallback initials element
        const fallback = document.createElement('div');
        fallback.className = 'dp-fallback';
        fallback.textContent = 'AD';
        dpBox.appendChild(fallback);
    }

    // If image errors, show fallback
    img.addEventListener('error', showFallback);

    // If image is not yet loaded (cached miss), check naturalWidth
    if (img.complete && img.naturalWidth === 0) {
        showFallback();
    }

    // Dynamic footer year update
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

/* ========================================
   ACCESSIBILITY: FOCUS VISIBLE STYLES
   ======================================== */

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add CSS for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-nav a:focus,
    .keyboard-nav button:focus,
    .keyboard-nav input:focus,
    .keyboard-nav textarea:focus {
        outline: 2px solid #7C3AED;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);
