document.addEventListener('DOMContentLoaded', function() {
    // initFaqItems();
    initScrollAnimations();
    initStatCounters();
});

// // Initialize FAQ accordion functionality
// function initFaqItems() {
//     const faqItems = document.querySelectorAll('.faq-item');
    
//     if (faqItems.length === 0) return;
    
//     faqItems.forEach(item => {
//         const question = item.querySelector('.faq-item__question');
        
//         question.addEventListener('click', function() {
//             // Toggle active class on clicked item
//             item.classList.toggle('active');
        
//         });
//     });
    
//     // Open first FAQ item by default
//     faqItems[0].classList.add('active');
// }

// Counter animation for stats
function initStatCounters() {
    const statValues = document.querySelectorAll('.about-stat__value');
    
    if (statValues.length === 0) return;
    
    // Create IntersectionObserver to trigger animation when stats are in view
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const targetText = el.innerText;
                const targetValue = parseInt(targetText.replace(/\D/g, ''));
                const suffix = targetText.replace(/[0-9]/g, '');
                
                // Start from 0
                let count = 0;
                
                // Set animation duration based on target value
                const duration = Math.min(2000, Math.max(1000, targetValue / 10));
                const interval = 16; // 60fps
                const increment = targetValue / (duration / interval);
                
                // Animate counter
                const timer = setInterval(() => {
                    count += increment;
                    
                    if (count >= targetValue) {
                        el.innerText = `${Math.floor(targetValue)}${suffix}`;
                        clearInterval(timer);
                    } else {
                        el.innerText = `${Math.floor(count)}${suffix}`;
                    }
                }, interval);
                
                // Stop observing once animation has started
                observer.unobserve(el);
            }
        });
    }, options);
    
    // Start observing each stat value
    statValues.forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations for about page elements
function initScrollAnimations() {
    // Add animation classes to elements
    document.querySelectorAll('.about-stat').forEach((el, i) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${i * 0.1}s`;
    });
    
    document.querySelectorAll('.our-story__content').forEach(el => {
        el.classList.add('fade-in-left');
    });
    
    document.querySelectorAll('.our-story__image').forEach(el => {
        el.classList.add('fade-in-right');
    });
    
    document.querySelectorAll('.mission, .vision').forEach((el, i) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${i * 0.2}s`;
    });
    
    document.querySelectorAll('.team-member').forEach((el, i) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${i * 0.1}s`;
    });
    
    document.querySelectorAll('.value-card').forEach((el, i) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${i * 0.1}s`;
    });
    
    document.querySelectorAll('.faq-item').forEach((el, i) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${i * 0.1}s`;
    });
    
    // Check if elements are in viewport and add active class
    function checkElementsInView() {
        const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
        
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            if (rect.top <= windowHeight * 0.8) {
                el.classList.add('active');
            }
        });
    }
    
    // Check on page load
    checkElementsInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkElementsInView);
}

// Parallax effect for about hero section
window.addEventListener('scroll', function() {
    const aboutHero = document.querySelector('.about-hero');
    
    if (!aboutHero) return;
    
    const scrollY = window.scrollY;
    const heroHeight = aboutHero.offsetHeight;
    
    if (scrollY <= heroHeight) {
        const parallaxOffset = scrollY * 0.4;
        aboutHero.style.backgroundPositionY = `-${parallaxOffset}px`;
    }
});

// Handle smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (!targetElement) return;
        
        e.preventDefault();
        
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});
