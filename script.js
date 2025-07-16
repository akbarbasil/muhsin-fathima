// Enhanced Countdown Timer Logic
function updateCountdown() {
    const weddingDate = new Date('December 27, 2025 09:30:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Calculate time components
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM elements with calculated values, padding with leading zeros
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    // Display message if wedding date has passed
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<h3 style="color: var(--accent); font-family: \'Playfair Display\', serif;">The Wedding Has Begun! Alhamdulillah! 🎉</h3>';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call to display countdown immediately

// Enhanced smooth scrolling for navigation links
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

// Enhanced show/hide navigation on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.getElementById('navbar');

    if (scrollTop > 100) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }

    lastScrollTop = scrollTop;
});

// Enhanced Intersection Observer for festive section animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Special animation for schedule items
            if (entry.target.classList.contains('schedule')) {
                const items = entry.target.querySelectorAll('.schedule-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                        item.style.transition = 'transform 0.7s cubic-bezier(.23,1.01,.32,1), box-shadow 0.7s';
                        item.style.transform = 'scale(1.05) rotate(-1deg)';
                        setTimeout(() => {
                            item.style.transform = 'scale(1) rotate(0deg)';
                        }, 400);
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Enhanced floating element creation
function createFloatingElement() {
    const symbols = ['☪', '✨', '🕌', '💐', '🌸', '⭐', '💖', '💍', '🌙', '💫', '🤲', '📿'];
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    element.style.left = Math.random() * 100 + '%';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = (Math.random() * 10 + 12) + 's';
    element.style.fontSize = (Math.random() * 0.8 + 1.2) + 'rem';

    document.body.appendChild(element);

    // Remove element after animation
    setTimeout(() => {
        element.remove();
    }, parseFloat(element.style.animationDuration) * 1000 + parseFloat(element.style.animationDelay) * 1000);
}

// Create new floating elements periodically
setInterval(createFloatingElement, 4000);

// Enhanced parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Enhanced confetti animation function
function launchConfetti() {
    // Multiple confetti bursts
    const colors = ['#A2D9CE', '#2C3E50', '#DAA520', '#FFFFFF', '#F3F3F3'];

    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6, x: 0.3 },
        colors: colors
    });

    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6, x: 0.7 },
            colors: colors
        });
    }, 200);
}

// Enhanced welcome modal and initial animations
window.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        document.querySelector('.glass-card').classList.add('animate-hero');
        document.querySelector('.countdown').classList.add('animate-countdown');
    }, 100);
    setTimeout(launchConfetti, 600);
});

// Enhanced close welcome modal function
function closeWelcome() {
    const modal = document.getElementById('welcomeModal');
    modal.style.opacity = 0;
    modal.style.transform = 'scale(0.95)';
    setTimeout(() => {
        modal.style.display = 'none';
        launchConfetti();

        // Additional welcome confetti after delay
        setTimeout(launchConfetti, 1000);
    }, 500);
}

// Enhanced slideshow logic with more transitions
const slides = document.querySelectorAll('#slideshow .slide');
let currentSlide = 0;

setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}, 5000); // Change slide every 5 seconds

// Enhanced calendar function
function addToCalendar(title, location, datetime) {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const formattedDate = `${year}${month}${day}T${hours}${minutes}00`;
    const endDate = `${year}${month}${day}T${(parseInt(hours) + 3).toString().padStart(2, '0')}${minutes}00`; // 3 hour duration

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formattedDate}/${endDate}&details=${encodeURIComponent('Muhsin & Fathima Wedding Celebration - Join us for this blessed occasion!')}&location=${encodeURIComponent(location)}`;

    window.open(googleCalendarUrl, '_blank');
}

// Enhanced scroll reveal for elements
const revealElements = document.querySelectorAll('.food-item, .cultural-item, .travel-item, .qna-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(el);
}); 