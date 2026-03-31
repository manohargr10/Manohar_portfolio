/* ========================================
   PORTFOLIO JAVASCRIPT
   Handles interactivity, animations, and effects
   ======================================== */

// ========================================
// CURSOR GLOW EFFECT
// ========================================

const cursorGlow = document.querySelector('.cursor-glow');
let cursorX = 0;
let cursorY = 0;

/**
 * Follow mouse position for cursor glow effect
 */
document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;

    cursorGlow.style.left = (cursorX - 200) + 'px';
    cursorGlow.style.top = (cursorY - 200) + 'px';
});

// ========================================
// SMOOTH SCROLLING & ACTIVE NAV LINK
// ========================================

/**
 * Smooth scroll to section with offset for fixed navbar
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
        });
    });
});

/**
 * Update active nav link based on current scroll position
 */
window.addEventListener('scroll', () => {
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const navHeight = document.querySelector('.navbar').offsetHeight;

    let current = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.style.color = 'var(--text-primary)';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--primary-color)';
        }
    });
}

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

/**
 * Intersection Observer for scroll reveal animations
 * Adds 'active' class when element enters viewport
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach((element) => {
    observer.observe(element);
});

// ========================================
// HAMBURGER MENU FUNCTIONALITY
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

/**
 * Toggle mobile menu visibility
 */
hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

/**
 * Close mobile menu when a link is clicked
 */
document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
        hamburger.classList.remove('active');
    });
});

// ========================================
// BUTTON RIPPLE EFFECT (OPTIONAL)
// ========================================

/**
 * Add ripple effect to buttons on click
 */
document.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ========================================
// PARALLAX EFFECT FOR HERO SECTION
// ========================================

/**
 * Simple parallax effect on scroll
 */
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.floating-shape');

    parallaxElements.forEach((element, index) => {
        const scrollPosition = window.scrollY;
        const speed = (index + 1) * 0.5;

        element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

// ========================================
// TYPEWRITER EFFECT (OPTIONAL FOR TITLES)
// ========================================

/**
 * Add typewriter effect to hero title (optional implementation)
 */
function typewriterEffect(element, text, speed = 50) {
    let index = 0;
    element.innerHTML = '';

    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typewriter on page load for hero title
window.addEventListener('load', () => {
    // Uncomment below line to enable typewriter effect
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     typewriterEffect(heroTitle, heroTitle.textContent);
    // }
});

// ========================================
// SKILL ANIMATION ON SCROLL
// ========================================

/**
 * Animate skill tags when they come into view
 */
const skillTags = document.querySelectorAll('.skill-tag');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = `slideInUp 0.5s ease forwards`;
                entry.target.style.opacity = '1';
            }, index * 50);
        }
    });
}, { threshold: 0.5 });

skillTags.forEach((tag) => {
    tag.style.opacity = '0';
    skillObserver.observe(tag);
});

// ========================================
// PROJECT CARD HOVER EFFECT ENHANCEMENT
// ========================================

/**
 * Enhanced hover effect for project cards
 */
document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mouseenter', function () {
        this.style.boxShadow = '0 30px 60px rgba(0, 217, 255, 0.3)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.boxShadow = '0 8px 16px rgba(0, 217, 255, 0.1)';
    });
});

// ========================================
// ACHIEVEMENT COUNTER (OPTIONAL)
// ========================================

/**
 * Animate achievement badges when visible
 */
const achievementItems = document.querySelectorAll('.achievement-item');

const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `slideInLeft 0.6s ease forwards`;
            achievementObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

achievementItems.forEach((item) => {
    achievementObserver.observe(item);
});

// ========================================
// NAVIGATION STICKY EFFECT
// ========================================

/**
 * Add subtle shadow to navbar on scroll
 */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 217, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ========================================
// PAGE LOAD ANIMATIONS
// ========================================

/**
 * Stagger animations for hero section elements on page load
 */
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');

    // Stagger animation for hero elements
    setTimeout(() => {
        if (heroTitle) heroTitle.style.animation = 'fadeInDown 0.8s ease';
    }, 100);

    setTimeout(() => {
        if (heroSubtitle) heroSubtitle.style.animation = 'fadeInUp 0.8s ease';
    }, 200);

    setTimeout(() => {
        if (heroDescription) heroDescription.style.animation = 'fadeInUp 0.8s ease';
    }, 300);

    setTimeout(() => {
        if (heroButtons) heroButtons.style.animation = 'fadeInUp 0.8s ease';
    }, 400);
});

// ========================================
// UTILITY ANIMATIONS
// ========================================

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);

// ========================================
// SMOOTH SCROLL BEHAVIOR FOR LINKS
// ========================================

/**
 * Handle external link analytics (optional)
 */
document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.addEventListener('click', function (e) {
        // Add analytics or tracking here if needed
        console.log('Opening external link:', this.href);
    });
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

/**
 * Lazy load images if needed
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
    });
}

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c🚀 Welcome to Manohar\'s Portfolio!', 'color: #00d9ff; font-size: 16px; font-weight: bold;');
console.log('%cLooking at the code? I appreciate your interest!', 'color: #00ff00; font-size: 12px;');
console.log('%cFeel free to reach out: manohargr10@gmail.com', 'color: #aa00ff; font-size: 12px;');
