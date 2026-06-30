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
    project.addEventListener('click', function () {
        this.classList.toggle('project-expanded');
        const toggle = this.querySelector('.project-toggle');
        if (this.classList.contains('project-expanded')) {
            toggle.textContent = '- Collapse';
        } else {
            toggle.textContent = '+ Learn More';
        }
    });

    // Prevent click on toggle from propagating
    project.querySelector('.project-toggle').addEventListener('click', function (e) {
        e.stopPropagation();
    });
});

/* ========================================
   PROJECT THUMBNAIL HOVER EFFECTS
   ======================================== */

document.querySelectorAll('.project-thumbnail').forEach(thumbnail => {
    const video = thumbnail.querySelector('.project-video');
    
    thumbnail.addEventListener('mouseenter', function () {
        if (video) {
            video.play().catch(() => {});
        }
    });

    thumbnail.addEventListener('mouseleave', function () {
        if (video) {
            video.pause();
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

function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.glass-nav a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 220;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

window.addEventListener('scroll', setActiveNavLink);

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

    setActiveNavLink();

    // Auto-pause hero video on mobile for better performance
    const heroVideo = document.querySelector('.hero-video');
    if (window.innerWidth < 768 && heroVideo) {
        heroVideo.setAttribute('autoplay', false);
    }
});

/* ========================================
   RESPONSIVE NAVIGATION TOGGLE (Mobile)
   ======================================== */

// Close navigation if viewport becomes small
window.addEventListener('resize', () => {
    const glassNav = document.querySelector('.glass-nav');
    
    if (window.innerWidth < 768) {
        glassNav.style.gap = '1rem';
        glassNav.style.padding = '0.7rem 1rem';
    } else {
        glassNav.style.gap = '2rem';
        glassNav.style.padding = '1rem 2rem';
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

// Media fallback: replace broken images/videos with graceful placeholders
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

    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('error', () => {
            const container = video.closest('.hero-section, .project-thumbnail');
            if (container) {
                container.classList.add('video-fallback');
            }
            video.style.display = 'none';
        });
    });

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
