document.addEventListener('DOMContentLoaded', function() {
    // Sample boosters data - in a real application, this would come from an API or database
    const boostersData = [
        {
            id: 'booster1',
            name: 'KingKong',
            games: ['lol', 'valorant'],
            avatar: './assets/images/leagueOfLegends.webp',
            rating: 5.0,
            reviews: 2,
            jobsCompleted: 3,
            successRate: 100,
            responseTime: '3h',
            description: 'Master tier player specializing in jungle and mid lane. Over 3 years of boosting experience.'
        },
        {
            id: 'booster4',
            name: 'FortKnight',
            games: ['fortnite'],
            avatar: 'img/boosters/avatar4.jpg',
            rating: 5.0,
            reviews: 1,
            jobsCompleted: 2,
            successRate: 100,
            responseTime: '2h',
            description: 'Tournament winner with creative building techniques and aggressive playstyle.'
        },
        {
            id: 'booster5',
            name: 'Dota_Expert',
            games: ['dota'],
            avatar: 'img/boosters/avatar5.jpg',
            rating: 5.0,
            reviews: 1,
            jobsCompleted: 1,
            successRate: 100,
            responseTime: '2h',
            description: 'Divine rank player with expertise in carry and mid roles. Consistent performance in high MMR games.'
        },
        {
            id: 'booster6',
            name: 'DeathShot',
            games: ['CS 2'],
            avatar: 'img/boosters/avatar6.jpg',
            rating: 0,
            reviews: 0,
            jobsCompleted: 0,
            successRate: 0,
            responseTime: '2h',
            description: 'Rank up from Silver to Global Elite.'
        },


    ];

    // DOM Elements
    const boostersGrid = document.getElementById('boosters-grid');
    const gameFilters = document.querySelectorAll('.game-filter');
    const searchInput = document.querySelector('.sellers-search__input');
    const searchButton = document.querySelector('.sellers-search__button');
    const paginationNumbers = document.querySelectorAll('.pagination__number');
    const prevButton = document.querySelector('.pagination__btn--prev');
    const nextButton = document.querySelector('.pagination__btn--next');

    // State variables
    let currentFilter = 'all';
    let currentPage = 1;
    let boostersPerPage = 6;
    let filteredBoosters = [...boostersData];
    let searchQuery = '';

    // Initialize
    displayBoosters();

    // Event Listeners
    gameFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Update active class
            gameFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            // Update filter and reset to page 1
            currentFilter = filter.dataset.game;
            currentPage = 1;
            updatePaginationUI();
            applyFiltersAndSearch();
        });
    });

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        currentPage = 1;
        updatePaginationUI();
        applyFiltersAndSearch();
    });

    searchButton.addEventListener('click', () => {
        applyFiltersAndSearch();
    });

    // Pagination event listeners
    paginationNumbers.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent !== '...') {
                currentPage = parseInt(button.textContent);
                updatePaginationUI();
                displayBoosters();
            }
        });
    });

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePaginationUI();
            displayBoosters();
        }
    });

    nextButton.addEventListener('click', () => {
        const maxPages = Math.ceil(filteredBoosters.length / boostersPerPage);
        if (currentPage < maxPages) {
            currentPage++;
            updatePaginationUI();
            displayBoosters();
        }
    });

    // Functions
    function applyFiltersAndSearch() {
        // Apply game filter
        if (currentFilter === 'all') {
            filteredBoosters = [...boostersData];
        } else {
            filteredBoosters = boostersData.filter(booster => 
                booster.games.includes(currentFilter)
            );
        }

        // Apply search query
        if (searchQuery) {
            filteredBoosters = filteredBoosters.filter(booster => 
                booster.name.toLowerCase().includes(searchQuery) || 
                booster.description.toLowerCase().includes(searchQuery)
            );
        }

        displayBoosters();
        updatePaginationUI();
    }

    function displayBoosters() {
        // Clear current boosters
        boostersGrid.innerHTML = '';

        // Calculate slice of boosters to display based on pagination
        const startIndex = (currentPage - 1) * boostersPerPage;
        const endIndex = startIndex + boostersPerPage;
        const boostersToDisplay = filteredBoosters.slice(startIndex, endIndex);

        if (boostersToDisplay.length === 0) {
            boostersGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No boosters found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }

        // Create and add booster cards
        boostersToDisplay.forEach(booster => {
            const gameElements = booster.games.map(game => {
                const gameNames = {
                    lol: 'League of Legends',
                    valorant: 'Valorant',
                    fortnite: 'Fortnite',
                    dota: 'Dota 2'
                };
                return `<span>${gameNames[game]}</span>`;
            }).join('');

            const stars = generateStars(booster.rating);

            const boosterCard = document.createElement('div');
            boosterCard.className = 'booster-card';
            boosterCard.innerHTML = `
                <div class="booster-card__header">
                    <div class="booster-card__name">
                        <h3>${booster.name}</h3>
                        <div class="booster-card__games">
                            ${gameElements}
                        </div>
                    </div>
                </div>
                <div class="booster-card__wrapper">
                    <div class="booster-card__rating">
                        ${stars}
                        <span>${booster.rating} (${booster.reviews} reviews)</span>
                    </div>
                    <p class="booster-card__desc">${booster.description}</p>
                    <div class="booster-card__stats">
                        <div class="stat">
                            <h4>${booster.jobsCompleted}</h4>
                            <p>Jobs Completed</p>
                        </div>
                        <div class="stat">
                            <h4>${booster.successRate}%</h4>
                            <p>Success Rate</p>
                        </div>
                        <div class="stat">
                            <h4>${booster.responseTime}</h4>
                            <p>Response Time</p>
                        </div>
                    </div>
                    <div class="booster-card__bottom">
                        <a href="booster-details.html?username=${booster.name}" class="btn btn--small btn--primary">View Profile</a>
                    </div>
                </div>
            `;

            boostersGrid.appendChild(boosterCard);
        });
    }

    function generateStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }

        return stars;
    }

    function updatePaginationUI() {
        const totalPages = Math.ceil(filteredBoosters.length / boostersPerPage);
        
        // Update pagination numbers
        paginationNumbers.forEach(button => {
            const pageNum = parseInt(button.textContent);
            if (!isNaN(pageNum)) {
                if (pageNum === currentPage) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }

                // Hide pagination numbers that don't make sense for current page count
                if (pageNum > totalPages) {
                    button.style.display = 'none';
                } else {
                    button.style.display = 'block';
                }
            }
        });

        // Update prev/next buttons
        if (currentPage === 1) {
            prevButton.classList.add('disabled');
        } else {
            prevButton.classList.remove('disabled');
        }

        if (currentPage >= totalPages) {
            nextButton.classList.add('disabled');
        } else {
            nextButton.classList.remove('disabled');
        }
    }
});
