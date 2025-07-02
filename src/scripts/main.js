// Initialize Lucide icons
lucide.createIcons();

// DOM elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const registerBtns = document.querySelectorAll('.register-btn');
const modal = document.getElementById('registration-modal');
const modalClose = document.getElementById('modal-close');
const scheduleTab = document.querySelectorAll('.schedule-tab');
const scheduleDays = document.querySelectorAll('.schedule-day');
const faqItems = document.querySelectorAll('.faq-item');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
});

// Close mobile nav when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
    });
});

// Active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Registration modal
registerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Schedule tabs
scheduleTab.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetDay = tab.getAttribute('data-day');
        
        // Update active tab
        scheduleTab.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update active day
        scheduleDays.forEach(day => {
            day.classList.remove('active');
            if (day.id === targetDay) {
                day.classList.add('active');
            }
        });
    });
});

// FAQ accordion
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Track card interactions
const trackCards = document.querySelectorAll('.track-card');
trackCards.forEach(card => {
    const trackBtn = card.querySelector('.track-btn');
    
    trackBtn.addEventListener('click', () => {
        const trackType = card.getAttribute('data-track');
        console.log(`Exploring ${trackType} track`);
        // Here you could navigate to a detailed track page or show more info
    });
});

// Notify form submission
const notifyForm = document.querySelector('.notify-form');
if (notifyForm) {
    const notifyInput = notifyForm.querySelector('.notify-input');
    const notifyBtn = notifyForm.querySelector('.btn');
    
    notifyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = notifyInput.value.trim();
        
        if (email && isValidEmail(email)) {
            // Simulate form submission
            notifyBtn.textContent = 'Subscribed!';
            notifyBtn.style.background = 'var(--success)';
            notifyInput.value = '';
            
            setTimeout(() => {
                notifyBtn.textContent = 'Notify Me';
                notifyBtn.style.background = '';
            }, 3000);
        } else {
            notifyInput.style.borderColor = 'var(--error)';
            setTimeout(() => {
                notifyInput.style.borderColor = '';
            }, 3000);
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Countdown timer (if needed for event)
function createCountdown(targetDate) {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            countdownElement.innerHTML = "Event Started!";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">Seconds</span>
            </div>
        `;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Initialize countdown for January 24, 2025
const eventDate = new Date('2025-01-24T09:00:00').getTime();
createCountdown(eventDate);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
    
    // Close mobile nav with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
    }
});

// Performance optimization: Lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Add loading states
function showLoading(element) {
    element.classList.add('loading');
    element.disabled = true;
}

function hideLoading(element) {
    element.classList.remove('loading');
    element.disabled = false;
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('BernHack 2025 website loaded successfully!');
    
    // Add entrance animations to hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-stats, .hero-actions');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}