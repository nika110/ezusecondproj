document.addEventListener('DOMContentLoaded', function() {
    loadAllServices();
    initServiceFilters();
    initServiceSearch();
    checkUrlFilterParams(); // Add this line to check for URL parameters
});

// Sample service data - in a real app, this would come from a backend API
const services = [
    {
        id: 'service-1',
        title: 'Rank Boosting (Bronze to Gold)',
        game: 'League of Legends',
        gameId: 'lol',
        price: 0.058,
        image: './assets/images/leagueOfLegends.webp',
        rating: "5.0",
        reviews: 1,
        seller: 'KingKong',
        sellerAddress: '8ZJdFpzJmCwCU5CtR4PArdtJUKYVLQJQ9x5o1zTgZ9aQ',
        description: 'Get boosted from Bronze to Gold rank by our professional boosters. Fast and reliable service.',
        features: ['Professional boosters', '2-3 day delivery', 'Account security', '24/7 Support']
    },
    {
        id: 'service-2',
        title: 'Competitive Rank-Up (Silver to Diamond)',
        game: 'Valorant',
        gameId: 'valorant',
        price: 0.047,
        image: './assets/images/valorant.jpeg',
        rating: "5.0",
        reviews: 1,
        seller: 'KingKong',
        sellerAddress: '3KLdxWWzjsxNajZJP2wweZxvMvXKjNNLjPXT7rWMFDdc',
        description: 'Rank up quickly with our professional Valorant players. We guarantee fast results.',
        features: ['High-rank players', 'Discrete boosting', 'Stream friendly', 'Full account privacy']
    },
    {
        id: 'service-3',
        title: 'Arena Points Boost (0-5000)',
        game: 'Fortnite',
        gameId: 'fortnite',
        price: 0.044,
        image: './assets/images/fortnite.jpg',
        rating: "5.0",
        reviews: 1,
        seller: 'FortKnight',
        sellerAddress: '9ZGNjbMAdkAJQugsaUCEpeYXYYFsqY8hQF4JvzKZbrtN',
        description: 'Boost your arena points quickly and efficiently with our Fortnite experts.',
        features: ['Fast completion', 'Safe methods', 'Progress tracking', 'Competitive players']
    },
    {
        id: 'service-4',
        title: 'MMR Boosting (4k to 6k)',
        game: 'Dota 2',
        gameId: 'dota',
        price: 0.051,
        image: './assets/images/dota2.jpg',
        rating: "5.0",
        reviews: 1,
        seller: 'Dota_Expert',
        sellerAddress: '7HyUzGJBSeT4FjmJox1XBMQyDGjzn4a5syKsAihnBFMm',
        description: 'Get your MMR boosted by our 7k+ MMR boosters. We play on your account safely and efficiently.',
        features: ['7k+ MMR boosters', 'Hero preferences', 'Behavior score maintenance', 'Regular updates']
    },
    {
        id: 'service-5',
        title: 'Competitive Rank Boost (Silver to Global)',
        game: 'CS 2',
        gameId: 'csgo',
        price: 0.047,
        image: './assets/images/cs2.jpg',
        rating: '-',
        reviews: 0,
        seller: 'DeathShot',
        sellerAddress: '2QypzqcLZXtZKrNTZGpLfbqsWQNXdB9hJyQ8TztZbdmK',
        description: 'Rank up from Silver to Global Elite with our experienced boosters. Safe and reliable.',
        features: ['Professional FPS players', 'Rank guarantee', 'Discreet boosting', 'Account safety']
    }
];

// Load all services into the grid
function loadAllServices() {
    const servicesGrid = document.getElementById('services-grid');
    
    if (!servicesGrid) return;
    
    // Clear existing services
    servicesGrid.innerHTML = '';
    
    // Create service cards
    services.forEach(service => {
        const card = createServiceCard(service);
        servicesGrid.appendChild(card);
    });
}

// Create a service card element
function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-card fade-in';
    card.dataset.game = service.gameId;
    
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
                <a href="service-details.html?id=${service.id}" class="btn btn--small btn--primary">View Details</a>
            </div>
        </div>
    `;
    
    return card;
}

// Initialize service filters
function initServiceFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter services
            filterServices(filter);
        });
    });
}

// Filter services by game
function filterServices(filter) {
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (serviceCards.length === 0) return;
    
    serviceCards.forEach(card => {
        if (filter === 'all' || card.dataset.game === filter) {
            card.style.display = 'block';
            
            // Add animation
            setTimeout(() => {
                card.classList.add('fade-in-active');
            }, 10);
        } else {
            card.style.display = 'none';
            card.classList.remove('fade-in-active');
        }
    });
}

// Initialize search functionality
function initServiceSearch() {
    const searchInput = document.querySelector('.services-search__input');
    const searchButton = document.querySelector('.services-search__button');
    
    if (!searchInput || !searchButton) return;
    
    // Search on button click
    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim().toLowerCase();
        searchServices(query);
    });
    
    // Search on enter key press
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim().toLowerCase();
            searchServices(query);
        }
    });
}

// Search services by title or game
function searchServices(query) {
    if (!query) {
        loadAllServices();
        return;
    }
    
    const filteredServices = services.filter(service => 
        service.title.toLowerCase().includes(query) || 
        service.game.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query)
    );
    
    const servicesGrid = document.getElementById('services-grid');
    
    if (!servicesGrid) return;
    
    // Clear existing services
    servicesGrid.innerHTML = '';
    
    if (filteredServices.length === 0) {
        // Show no results message
        servicesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No services found</h3>
                <p>Try different keywords or browse all services</p>
                <button class="btn btn--primary" onclick="loadAllServices()">Show All Services</button>
            </div>
        `;
        return;
    }
    
    // Create service cards for filtered services
    filteredServices.forEach(service => {
        const card = createServiceCard(service);
        servicesGrid.appendChild(card);
    });
}

// Get service details by ID
function getServiceById(id) {
    return services.find(service => service.id === id);
}

// Load service details on the details page
function loadServiceDetails() {
    // Get service ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');
    
    if (!serviceId) {
        window.location.href = 'services.html';
        return;
    }
    
    // Get service by ID
    const service = getServiceById(serviceId);
    
    if (!service) {
        window.location.href = 'services.html';
        return;
    }
    
    // Update page title
    document.title = `${service.title} | BoostVerse`;
    
    // Update service details
    const serviceImage = document.querySelector('.service-details__image img');
    const serviceTitle = document.querySelector('.service-details__content h1');
    const serviceRating = document.querySelector('.service-details__meta-item.rating span');
    const serviceGame = document.querySelector('.service-details__meta-item.game span');
    const serviceSeller = document.querySelector('.service-details__meta-item.seller span');
    const serviceDesc = document.querySelector('.service-details__description p');
    const serviceFeatures = document.querySelector('.service-details__features ul');
    const servicePrice = document.querySelector('.service-sidebar__price');
    const buyButton = document.querySelector('.service-sidebar__cta .btn');
    
    if (serviceImage) serviceImage.src = service.image;
    if (serviceTitle) serviceTitle.textContent = service.title;
    if (serviceRating) serviceRating.textContent = `${service.rating} (${service.reviews} reviews)`;
    if (serviceGame) serviceGame.textContent = service.game;
    if (serviceSeller) serviceSeller.textContent = service.seller;
    if (serviceDesc) serviceDesc.textContent = service.description;
    if (servicePrice) servicePrice.textContent = `${service.price} SOL`;
    
    // Update features list
    if (serviceFeatures) {
        serviceFeatures.innerHTML = '';
        service.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            serviceFeatures.appendChild(li);
        });
    }
    
    // Add purchase event listener
    if (buyButton) {
        buyButton.addEventListener('click', function() {
            if (window.boostVerseWallet) {
                window.boostVerseWallet.purchaseService(
                    service.id, 
                    service.title, 
                    service.price, 
                    service.sellerAddress
                );
            } else {
                alert('Wallet connection not available. Please try again later.');
            }
        });
    }
}

// Check for filter parameter in URL and apply filter
function checkUrlFilterParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameFilter = urlParams.get('filter');
    
    if (gameFilter) {
        // Find the button with the matching data-filter attribute
        const filterButton = document.querySelector(`.filter-button[data-filter="${gameFilter}"]`);
        if (filterButton) {
            // Simulate a click on the button to apply the filter
            filterButton.click();
        }
    }
}

// Check if we're on the service details page and load details
if (window.location.pathname.includes('service-details.html')) {
    document.addEventListener('DOMContentLoaded', loadServiceDetails);
}