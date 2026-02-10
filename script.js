// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced navbar on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for enhanced styling
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Intersection Observer for scroll reveal animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards with staggered animations
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.company-card, .project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        observer.observe(card);
    });
});

// Active nav link highlighting based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        const fadeSpeed = 0.9; // Fade out by 60% of viewport height
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            hero.style.opacity = Math.max(0, 1 - (scrolled / (window.innerHeight * fadeSpeed)));
        }
    });
}

// Mouse move effect for hero gradient
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (hero && window.pageYOffset < window.innerHeight) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;

        hero.style.backgroundPosition = `${x}% ${y}%`;
    }
});

// Add floating animation to cards on hover
document.querySelectorAll('.company-card, .project-card, .logo-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.4s ease';
    });
});

// Smooth reveal for section titles
const sectionTitles = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            titleObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px'
});

sectionTitles.forEach((title, index) => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    titleObserver.observe(title);
});

// Add ripple effect to buttons
document.querySelectorAll('.cta-button, .contact-button').forEach(button => {
    button.addEventListener('click', function(e) {
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

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy operations
const throttledScroll = throttle(() => {
    // Any additional scroll operations can go here
}, 100);

window.addEventListener('scroll', throttledScroll);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation enhancement
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Add cursor trail effect (subtle)
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.cursor-circle');

if (window.innerWidth > 768) { // Only on desktop
    document.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });
}

// Copy Email to Clipboard
const copyEmailLink = document.getElementById('copyEmail');
if (copyEmailLink) {
    copyEmailLink.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = copyEmailLink.getAttribute('data-email');

        try {
            await navigator.clipboard.writeText(email);
            const originalText = copyEmailLink.textContent;
            copyEmailLink.textContent = 'Copied!';
            copyEmailLink.style.color = 'var(--primary-color)';

            setTimeout(() => {
                copyEmailLink.textContent = originalText;
                copyEmailLink.style.color = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    });
}

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Scroll to top when clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
console.log('%c✨ Designed for Stanley Wu', 'color: #7b2ff7; font-size: 14px;');
