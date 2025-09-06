// Mobile-First Wedding Invitation JavaScript

// Performance optimization - Throttle function
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

// Debounce function for resize events
function debounce(func, wait) {
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

// Mobile-optimized countdown timer
function updateCountdown() {
    const weddingDate = new Date('December 27, 2025 09:30:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = 
            '<div style="text-align: center; color: var(--accent); font-family: \'Playfair Display\', serif; font-size: 1.2rem;">The Wedding Has Begun! Alhamdulillah! 🎉</div>';
        return;
    }

    // Calculate time components
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM elements with error checking
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
    if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
    if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
}

// Mobile navigation functionality
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open (mobile UX improvement)
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a link
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside (mobile UX)
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Enhanced smooth scrolling with mobile optimization
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Mobile-optimized scroll behavior
                const isMobile = window.innerWidth < 768;
                const offset = isMobile ? 70 : 80; // Account for mobile nav height
                
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile-optimized navigation visibility on scroll
function initScrollNavigation() {
    let lastScrollTop = 0;
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;

    const handleScroll = throttle(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show navbar after scrolling down a bit
        if (scrollTop > 100) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
        
        lastScrollTop = scrollTop;
    }, 100); // Throttle to improve performance on mobile
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Mobile-optimized intersection observer for animations
function initScrollAnimations() {
    // Reduced threshold and root margin for better mobile performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.schedule-card, .travel-card, .cultural-card, .food-card, .faq-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.schedule-card, .travel-card, .cultural-card, .food-card, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Mobile-optimized confetti function
function launchMobileConfetti() {
    // Check if confetti is available
    if (typeof confetti === 'undefined') return;
    
    const colors = ['#A2D9CE', '#2C3E50', '#DAA520', '#FFFFFF', '#F3F3F3'];
    const isMobile = window.innerWidth < 768;
    
    // Reduce particle count on mobile for better performance
    const particleCount = isMobile ? 75 : 150;
    
    confetti({
        particleCount: particleCount,
        spread: 70,
        origin: { y: 0.6, x: 0.3 },
        colors: colors,
        disableForReducedMotion: true
    });

    setTimeout(() => {
        confetti({
            particleCount: particleCount,
            spread: 70,
            origin: { y: 0.6, x: 0.7 },
            colors: colors,
            disableForReducedMotion: true
        });
    }, 200);
}

// Welcome modal functionality
function closeWelcome() {
    const modal = document.getElementById('welcomeModal');
    if (!modal) return;
    
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        modal.style.display = 'none';
        launchMobileConfetti();
        
        // Additional confetti after delay for celebration
        setTimeout(launchMobileConfetti, 1000);
    }, 500);
}

// Mobile-optimized calendar function
function addToCalendar(title, location, datetime) {
    try {
        const date = new Date(datetime);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const formattedDate = `${year}${month}${day}T${hours}${minutes}00`;
        const endDate = `${year}${month}${day}T${(parseInt(hours) + 3).toString().padStart(2, '0')}${minutes}00`;

        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formattedDate}/${endDate}&details=${encodeURIComponent('Muhsin & Fathima Wedding Celebration - Join us for this blessed occasion!')}&location=${encodeURIComponent(location)}`;

        window.open(googleCalendarUrl, '_blank');
    } catch (error) {
        console.error('Calendar integration error:', error);
        // Fallback - just alert the user
        alert('Please add this event to your calendar manually: ' + title + ' on ' + datetime);
    }
}

// Mobile FAQ accordion functionality
function toggleFaq(questionElement) {
    const faqItem = questionElement.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items for mobile (accordion behavior)
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current item
    faqItem.classList.toggle('active');
    
    // Scroll to the opened FAQ item on mobile for better UX
    if (!isActive && window.innerWidth < 768) {
        setTimeout(() => {
            questionElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 300);
    }
}

// Touch gesture improvements
function initTouchEnhancements() {
    // Prevent zoom on double tap for better UX
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });

    // Add touch feedback to interactive elements
    const interactiveElements = document.querySelectorAll('.schedule-card, .travel-card, .cultural-card, .food-card, button, .nav-links a');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.opacity = '';
            }, 150);
        }, { passive: true });
        
        element.addEventListener('touchcancel', function() {
            this.style.opacity = '';
        }, { passive: true });
    });
}

// Performance monitoring for mobile
function initPerformanceOptimizations() {
    // Lazy load images when they come into view
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Preload critical resources
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Preload confetti script if not already loaded
            if (typeof confetti === 'undefined') {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
                document.head.appendChild(script);
            }
        });
    }
}

// Main initialization function
function initMobileWeddingInvitation() {
    // Core functionality
    updateCountdown();
    initMobileNavigation();
    initSmoothScrolling();
    initScrollNavigation();
    initScrollAnimations();
    initTouchEnhancements();
    initPerformanceOptimizations();
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    
    // Handle orientation changes on mobile
    const handleOrientationChange = debounce(() => {
        // Recalculate heights and positions after orientation change
        window.scrollTo(0, window.scrollY);
    }, 100);
    
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
    
    // Handle visibility change for battery optimization
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause expensive operations when page is not visible
            console.log('Page hidden - pausing animations');
        } else {
            // Resume operations
            console.log('Page visible - resuming animations');
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileWeddingInvitation();
    
    // Add initial animations
    setTimeout(() => {
        const heroCard = document.querySelector('.hero-card');
        const countdown = document.querySelector('.countdown');
        
        if (heroCard) {
            heroCard.style.opacity = '1';
            heroCard.style.transform = 'translateY(0) scale(1)';
        }
        
        if (countdown) {
            countdown.style.opacity = '1';
            countdown.style.transform = 'scale(1)';
        }
    }, 300);
    
    // Launch confetti after a delay for celebration
    setTimeout(launchMobileConfetti, 800);
});

// Handle page load event
window.addEventListener('load', () => {
    // Hide loading indicators, start final animations
    document.body.classList.add('loaded');
    
    // Additional confetti celebration
    setTimeout(launchMobileConfetti, 500);
});

// Export functions for global access
window.closeWelcome = closeWelcome;
window.addToCalendar = addToCalendar;
window.toggleFaq = toggleFaq;
