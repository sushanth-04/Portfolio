// Portfolio JavaScript - Interactive Functionality

// Initialize Lucide icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// DOM Elements - Will be initialized when DOM is ready
let navigation = null;
let mobileMenuBtn = null;
let mobileMenu = null;
let backToTopBtn = null;

// Navigation scroll effect
let isScrolled = false;

function handleScroll() {
    if (!navigation) {
        navigation = document.getElementById('navigation');
    }
    if (!navigation) return;
    
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        if (!isScrolled) {
            navigation.classList.add('scrolled');
            isScrolled = true;
        }
    } else {
        if (isScrolled) {
            navigation.classList.remove('scrolled');
            isScrolled = false;
        }
    }
}

// Mobile menu toggle
let isMobileMenuOpen = false;

function toggleMobileMenu() {
    if (!mobileMenu) {
        mobileMenu = document.getElementById('mobile-menu');
    }
    if (!mobileMenuBtn) {
        mobileMenuBtn = document.getElementById('mobile-menu-btn');
    }
    if (!mobileMenu || !mobileMenuBtn) return;
    
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (isMobileMenuOpen) {
        // Keep 'hidden' class but add 'show' class to display menu
        // This matches the test expectation
        mobileMenu.classList.add('show');
        mobileMenuBtn.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.remove('show');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

// Smooth scroll to section
function scrollToSection(targetId) {
    const element = document.querySelector(targetId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navigation
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }
    }
}

// Back to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide back to top button
function handleBackToTopVisibility() {
    if (!backToTopBtn) {
        backToTopBtn = document.getElementById('back-to-top');
    }
    if (!backToTopBtn) return;
    
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
function observeElements() {
    const elementsToObserve = document.querySelectorAll('.hero-content, .about-text, .education-card, .skills-card, .project-card, .contact-card');
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
}

// Button click handlers
function setupButtonHandlers() {
    // Initialize DOM elements
    navigation = document.getElementById('navigation');
    mobileMenuBtn = document.getElementById('mobile-menu-btn');
    mobileMenu = document.getElementById('mobile-menu');
    backToTopBtn = document.getElementById('back-to-top');
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .footer-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            if (target) {
                scrollToSection(target);
            }
        });
    });

    // Hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const target = button.getAttribute('data-target');
            if (target) {
                scrollToSection(target);
            }
        });
    });

    // Back to top button
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
    }

    // Mobile menu button
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
}

// Parallax effect for hero orbs
function handleParallax() {
    const heroOrbs = document.querySelectorAll('.hero-orb');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    heroOrbs.forEach((orb, index) => {
        const speed = index === 0 ? 0.5 : 0.3;
        orb.style.transform = `translateY(${rate * speed}px)`;
    });
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    if (!element) return;
    
    let i = 0;
    // Clear content
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            // Use textContent to add characters without HTML encoding
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    // Start typing with the specified speed delay
    setTimeout(type, speed);
}

// Initialize typing effect
function initTypingEffect() {
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const originalText = heroName.textContent;
        heroName.textContent = '';
        
        setTimeout(() => {
            typeWriter(heroName, originalText, 150);
        }, 1000);
    }
}

// Smooth reveal animation for stats
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const isPlus = finalValue.includes('+');
        const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
        
        if (numericValue) {
            let currentValue = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(timer);
                }
                
                let displayValue = Math.floor(currentValue);
                if (isPlus) displayValue += '+';
                if (isPercentage) displayValue += '%';
                
                stat.textContent = displayValue;
            }, 30);
        }
    });
}

// Initialize stats animation when stats section is visible
function initStatsAnimation() {
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
}

// Hover effects for project cards
function setupProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Button hover effects
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (button.classList.contains('btn-primary')) {
                button.style.boxShadow = '0 0 40px hsl(var(--glow-primary) / 0.6)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            if (button.classList.contains('btn-primary')) {
                button.style.boxShadow = '0 0 30px hsl(var(--glow-primary) / 0.3)';
            }
        });
    });
}

// Smooth scroll for anchor links
function setupSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                scrollToSection(targetId);
            }
        });
    });
}

// Loading animation
function showLoadingAnimation() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Show loading animation
    showLoadingAnimation();
    
    // Initialize all functionality
    setupButtonHandlers();
    observeElements();
    initTypingEffect();
    initStatsAnimation();
    setupProjectCardEffects();
    setupButtonEffects();
    setupSmoothScroll();
    
    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        handleScroll();
        handleBackToTopVisibility();
        handleParallax();
    });
    
    // Initial calls
    handleScroll();
    handleBackToTopVisibility();
    
    // Re-initialize Lucide icons after dynamic content
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768 && isMobileMenuOpen) {
        toggleMobileMenu();
    }
});

// Handle escape key for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
        toggleMobileMenu();
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    handleScroll();
    handleBackToTopVisibility();
    handleParallax();
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Add some additional interactive features
function addInteractiveFeatures() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
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
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
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
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', addInteractiveFeatures);

// Reset function for tests
function resetState() {
    navigation = null;
    mobileMenuBtn = null;
    mobileMenu = null;
    backToTopBtn = null;
    isScrolled = false;
    isMobileMenuOpen = false;
}

// Expose functions and variables to global scope for testing
if (typeof window !== 'undefined') {
    window.handleScroll = handleScroll;
    window.toggleMobileMenu = toggleMobileMenu;
    window.scrollToSection = scrollToSection;
    window.scrollToTop = scrollToTop;
    window.handleBackToTopVisibility = handleBackToTopVisibility;
    window.typeWriter = typeWriter;
    window.resetState = resetState;
    
    // Expose isMobileMenuOpen with getter/setter
    Object.defineProperty(window, 'isMobileMenuOpen', {
        get: function() { return isMobileMenuOpen; },
        set: function(value) { isMobileMenuOpen = value; },
        configurable: true
    });
    
    // Expose isScrolled with getter/setter for testing
    Object.defineProperty(window, 'isScrolled', {
        get: function() { return isScrolled; },
        set: function(value) { isScrolled = value; },
        configurable: true
    });
    
    // Also expose to global object for tests
    if (typeof global !== 'undefined') {
        Object.defineProperty(global, 'isMobileMenuOpen', {
            get: function() { return isMobileMenuOpen; },
            set: function(value) { isMobileMenuOpen = value; },
            configurable: true
        });
        
        Object.defineProperty(global, 'isScrolled', {
            get: function() { return isScrolled; },
            set: function(value) { isScrolled = value; },
            configurable: true
        });
    }
}

// Console message for developers
console.log('%c🚀 BVS Sushanth Portfolio', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #666; font-size: 14px;');
console.log('%cAI/ML Engineer • Problem Solver • Continuous Learner', 'color: #999; font-size: 12px;');