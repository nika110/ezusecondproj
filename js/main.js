document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initCustomCursor();
    initMobileMenu();
    initSlider();
    initScrollAnimations();
    // populateServiceCards();
    initSliderDots();
});

// Custom cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Add some delay to follower for smooth effect
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Add hover effect
    const hoverable = document.querySelectorAll('a, button, .game-card, .slider-arrow, .slider-dot');
    hoverable.forEach(item => {
        item.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        item.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
    
    // Hide cursor when it leaves the window
    document.addEventListener('mouseout', function(e) {
        if (e.relatedTarget === null) {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
        }
    });
    
    document.addEventListener('mouseover', function() {
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';
    });
}

// Mobile menu
function initMobileMenu() {
    const burger = document.getElementById('burger');
    const nav = document.querySelector('.nav');
    
    if (burger) {
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            let mobileMenu = document.querySelector('.mobile-menu');
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                
                // Clone navigation
                const navClone = nav.cloneNode(true);
                mobileMenu.appendChild(navClone);
                
                document.body.appendChild(mobileMenu);
                
                // Add event listeners to mobile menu links
                const mobileLinks = mobileMenu.querySelectorAll('.nav__link');
                mobileLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        burger.classList.remove('active');
                        mobileMenu.classList.remove('active');
                    });
                });
            }
            
            mobileMenu.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
}

// Testimonial slider
function initSlider() {
    const slider = document.querySelector('.testimonials__slider');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (!slider || !prevBtn || !nextBtn || testimonials.length === 0) return;
    
    let currentIndex = 0;
    const testimonialWidth = slider.clientWidth;
    
    // Set initial position
    updateSlider();
    
    // Add event listeners to buttons
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateSlider();
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlider();
    });
    
    // Auto slide every 5 seconds
    let autoSlide = setInterval(function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlider();
    }, 5000);
    
    // Pause auto slide on hover
    slider.addEventListener('mouseenter', function() {
        clearInterval(autoSlide);
    });
    
    slider.addEventListener('mouseleave', function() {
        autoSlide = setInterval(function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateSlider();
        }, 5000);
    });
    
    // Update slider position
    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// Create slider dots
function initSliderDots() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (!dotsContainer || testimonials.length === 0) return;
    
    // Create a dot for each testimonial
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'slider-dot';
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', function() {
            const slider = document.querySelector('.testimonials__slider');
            slider.style.transform = `translateX(-${index * 100}%)`;
            
            // Update active dot
            document.querySelectorAll('.slider-dot').forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
        
        dotsContainer.appendChild(dot);
    });
}

// Animations on scroll
function initScrollAnimations() {
    // Add animation classes to elements
    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('fade-in');
    });
    
    document.querySelectorAll('.step').forEach(el => {
        el.classList.add('fade-in');
    });
    
    document.querySelectorAll('.game-card').forEach((el, i) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${i * 0.1}s`;
    });
    
    // Check for elements in viewport
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    
    function checkInView() {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            if (rect.top <= windowHeight * 0.8) {
                el.classList.add('active');
            }
        });
    }
    
    // Initial check
    checkInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkInView);
}

// Populate service cards
function populateServiceCards() {
    const servicesGrid = document.querySelector('.services__grid');
    
    if (!servicesGrid) return;
    
    // Sample service data
    const services = [
        {
            title: 'Rank Boosting',
            game: 'League of Legends',
            price: 45,
            image: 'img/services/lol-boost.jpg',
            rating: 4.9,
            reviews: 124
        },
        {
            title: 'Rank Boosting',
            game: 'Valorant',
            price: 60,
            image: 'img/services/valorant-boost.jpg',
            rating: 4.8,
            reviews: 89
        },
        {
            title: 'Raid Boosting',
            game: 'CS 2',
            price: 120,
            image: 'img/services/wow-boost.jpg',
            rating: 5.0,
            reviews: 76
        },
    ];
    
    // Create service cards
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card fade-in';
        
        card.innerHTML = `
            <div class="service-card__image">
                <img src="${service.image}" alt="${service.title}">
                <div class="service-card__tag">${service.game}</div>
            </div>
            <div class="service-card__content">
                <h3 class="service-card__title">${service.title}</h3>
                <div class="service-card__rating">
                    <i class="fas fa-star"></i>
                    <span>${service.rating} (${service.reviews} reviews)</span>
                </div>
                <div class="service-card__price">
                    <span class="price">${service.price} SOL</span>
                    <a href="service-details.html" class="btn btn--small btn--primary">View Details</a>
                </div>
            </div>
        `;
        
        servicesGrid.appendChild(card);
    });
}
