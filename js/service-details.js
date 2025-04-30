const gameRanks = {
    'service-1': {
        perRankPrice: 0.058,
        ranks: [            
            { value: 'iron4', label: 'Iron 4', order: 1 },
            { value: 'iron3', label: 'Iron 3', order: 2 },
            { value: 'iron2', label: 'Iron 2', order: 3 },
            { value: 'iron1', label: 'Iron 1', order: 4 },

            { value: 'bronze4', label: 'Bronze 4', order: 5 },
            { value: 'bronze3', label: 'Bronze 3', order: 6 },
            { value: 'bronze2', label: 'Bronze 2', order: 7 },
            { value: 'bronze1', label: 'Bronze 1', order: 8 },

            { value: 'silver4', label: 'Silver 4', order: 9 },
            { value: 'silver3', label: 'Silver 3', order: 10 },
            { value: 'silver2', label: 'Silver 2', order: 11 },
            { value: 'silver1', label: 'Silver 1', order: 12 },

            { value: 'gold4', label: 'Gold 4', order: 13 },
            { value: 'gold3', label: 'Gold 3', order: 14 },
            { value: 'gold2', label: 'Gold 2', order: 15 },
            { value: 'gold1', label: 'Gold 1', order: 16 },

            { value: 'platinum4', label: 'Platinum 4', order: 17 },
            { value: 'platinum3', label: 'Platinum 3', order: 18 },
            { value: 'platinum2', label: 'Platinum 2', order: 19 },
            { value: 'platinum1', label: 'Platinum 1', order: 20 },

            { value: 'emerald4', label: 'Emerald 4', order: 21 },
            { value: 'emerald3', label: 'Emerald 3', order: 22 },
            { value: 'emerald2', label: 'Emerald 2', order: 23 },
            { value: 'emerald1', label: 'Emerald 1', order: 24 },

            { value: 'diamond4', label: 'Diamond 4', order: 25 },
            { value: 'diamond3', label: 'Diamond 3', order: 26 },
            { value: 'diamond2', label: 'Diamond 2', order: 27 },
            { value: 'diamond1', label: 'Diamond 1', order: 28 },

            { value: 'master', label: 'Master', order: 8 },
        ]
    },
    'service-2': {
        perRankPrice: 0.047,
        ranks: [
            { value: 'iron1', label: 'Iron 1', order: 1 },
            { value: 'iron2', label: 'Iron 2', order: 2 },
            { value: 'iron3', label: 'Iron 3', order: 3 },
            { value: 'bronze1', label: 'Bronze 1', order: 4 },
            { value: 'bronze2', label: 'Bronze 2', order: 5 },
            { value: 'bronze3', label: 'Bronze 3', order: 6 },
            { value: 'silver1', label: 'Silver 1', order: 7 },
            { value: 'silver2', label: 'Silver 2', order: 8 },
            { value: 'silver3', label: 'Silver 3', order: 9 },
            { value: 'gold1', label: 'Gold 1', order: 10 },
            { value: 'gold2', label: 'Gold 2', order: 11 },
            { value: 'gold3', label: 'Gold 3', order: 12 },
            { value: 'platinum1', label: 'Platinum 1', order: 13 },
            { value: 'platinum2', label: 'Platinum 2', order: 14 },
            { value: 'platinum3', label: 'Platinum 3', order: 15 },
            { value: 'diamond1', label: 'Diamond 1', order: 16 },
            { value: 'diamond2', label: 'Diamond 2', order: 17 },
            { value: 'diamond3', label: 'Diamond 3', order: 18 },
            { value: 'ascendant1', label: 'Ascendant 1', order: 19 },
            { value: 'ascendant2', label: 'Ascendant 2', order: 20 },
            { value: 'ascendant3', label: 'Ascendant 3', order: 21 },
            { value: 'immortal1', label: 'Immortal 1', order: 22 },
            { value: 'immortal2', label: 'Immortal 2', order: 23 },
            { value: 'immortal3', label: 'Immortal 3', order: 24 },
            { value: 'radiant', label: 'Radiant', order: 25 }
        ],
    },
    'service-3': {
        perRankPrice: 0.044,
        ranks: [            
            { value: 'bronze1', label: 'Bronze 1', order: 1 },
            { value: 'bronze2', label: 'Bronze 2', order: 2 },
            { value: 'bronze3', label: 'Bronze 3', order: 3 },
            { value: 'silver1', label: 'Silver 1', order: 4 },
            { value: 'silver2', label: 'Silver 2', order: 5 },
            { value: 'silver3', label: 'Silver 3', order: 6 },
            { value: 'gold1', label: 'Gold 1', order: 7 },
            { value: 'gold2', label: 'Gold 2', order: 8 },
            { value: 'gold3', label: 'Gold 3', order: 9 },
            { value: 'platinum1', label: 'Platinum 1', order: 10 },
            { value: 'platinum2', label: 'Platinum 2', order: 11 },
            { value: 'platinum3', label: 'Platinum 3', order: 12 },
            { value: 'diamond1', label: 'Diamond 1', order: 13 },
            { value: 'diamond2', label: 'Diamond 2', order: 14 },
            { value: 'diamond3', label: 'Diamond 3', order: 15 },
            { value: 'elite', label: 'Elite', order: 16 },
            { value: 'champion', label: 'Champion', order: 17 },
            { value: 'unreal', label: 'Unreal', order: 18 },
        ]
    },
    'service-4': {
        perRankPrice: 0.051,
        ranks: [            
            { value: 'herald1', label: 'Herald 1', order: 1 },
            { value: 'herald2', label: 'Herald 2', order: 2 },
            { value: 'herald3', label: 'Herald 3', order: 3 },
            { value: 'herald4', label: 'Herald 4', order: 4 },
            { value: 'herald5', label: 'Herald 5', order: 5 },
            { value: 'guardian1', label: 'Guardian 1', order: 6 },
            { value: 'guardian2', label: 'Guardian 2', order: 7 },
            { value: 'guardian3', label: 'Guardian 3', order: 8 },
            { value: 'guardian4', label: 'Guardian 4', order: 9 },
            { value: 'guardian5', label: 'Guardian 5', order: 10 },
            { value: 'crusader1', label: 'Crusader 1', order: 11 },
            { value: 'crusader2', label: 'Crusader 2', order: 12 },
            { value: 'crusader3', label: 'Crusader 3', order: 13 },
            { value: 'crusader4', label: 'Crusader 4', order: 14 },
            { value: 'crusader5', label: 'Crusader 5', order: 15 },
            { value: 'archon1', label: 'Archon 1', order: 16 },
            { value: 'archon2', label: 'Archon 2', order: 17 },
            { value: 'archon3', label: 'Archon 3', order: 18 },
            { value: 'archon4', label: 'Archon 4', order: 19 },
            { value: 'archon5', label: 'Archon 5', order: 20 },
            { value: 'legend1', label: 'Legend 1', order: 21 },
            { value: 'legend2', label: 'Legend 2', order: 22 },
            { value: 'legend3', label: 'Legend 3', order: 23 },
            { value: 'legend4', label: 'Legend 4', order: 24 },
            { value: 'legend5', label: 'Legend 5', order: 25 },
            { value: 'ancient1', label: 'Ancient 1', order: 26 },
            { value: 'ancient2', label: 'Ancient 2', order: 27 },
            { value: 'ancient3', label: 'Ancient 3', order: 28 },
            { value: 'ancient4', label: 'Ancient 4', order: 29 },
            { value: 'ancient5', label: 'Ancient 5', order: 30 },
            { value: 'divine1', label: 'Divine 1', order: 31 },
            { value: 'divine2', label: 'Divine 2', order: 32 },
            { value: 'divine3', label: 'Divine 3', order: 33 },
            { value: 'divine4', label: 'Divine 4', order: 34 },
            { value: 'divine5', label: 'Divine 5', order: 35 },
            { value: 'immortal1', label: 'Immortal', order: 36 },
        ]
    },
    'service-5': {
        perRankPrice: 0.047,
         ranks: [
            { value: 'silver1', label: 'Silver I', order: 1 },
            { value: 'silver2', label: 'Silver II', order: 2 },
            { value: 'silver3', label: 'Silver III', order: 3 },
            { value: 'silver4', label: 'Silver IV', order: 4 },
            { value: 'silver_elite', label: 'Silver Elite', order: 5 },
            { value: 'silver_elite_master', label: 'Silver Elite Master', order: 6 },
          
            { value: 'gold_nova1', label: 'Gold Nova I', order: 7 },
            { value: 'gold_nova2', label: 'Gold Nova II', order: 8 },
            { value: 'gold_nova3', label: 'Gold Nova III', order: 9 },
            { value: 'gold_nova_master', label: 'Gold Nova Master', order: 10 },
          
            { value: 'master_guardian1', label: 'Master Guardian I', order: 12 },
            { value: 'master_guardian2', label: 'Master Guardian II', order: 14 },
            { value: 'master_guardian_elite', label: 'Master Guardian Elite', order: 16 },
            { value: 'distinguished_master_guardian', label: 'Distinguished Master Guardian', order: 18 },
          
            { value: 'legendary_eagle', label: 'Legendary Eagle', order: 21 },
            { value: 'legendary_eagle_master', label: 'Legendary Eagle Master', order: 25 },
          
            { value: 'supreme_master_first_class', label: 'Supreme Master First Class', order: 31 },
            { value: 'global_elite', label: 'Global Elite', order: 40}
          ]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    initRankSelects();
});

// Function to initialize select elements
function initRankSelects() {
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

    console.log(serviceId)

    const currentRankSelect = document.getElementById('currentRankSelect');
    const desiredRankSelect = document.getElementById('desiredRankSelect');
    const priceElement = document.querySelector('.service-sidebar__price');
    const deliveryTimeElement = document.querySelector('.service-sidebar__delivery-time');
    
    // Function to populate a select element with rank options
    function populateRankSelect(selectElement, ranks) {
        // Clear existing options
        selectElement.innerHTML = '';
        
        // Add options for each rank
        ranks.forEach(rank => {
            const option = document.createElement('option');
            option.value = rank.value;
            option.textContent = rank.label;
            selectElement.appendChild(option);
        });
    }
    console.log("A", gameRanks, serviceId)
    populateRankSelect(currentRankSelect, gameRanks[serviceId].ranks);
    populateRankSelect(desiredRankSelect, gameRanks[serviceId].ranks);
    
    // Set desiredRank to order 2 (Iron 2) on page load
    const rankOrder2 = gameRanks[serviceId].ranks.find(rank => rank.order === 2);
    if (rankOrder2) {
        desiredRankSelect.value = rankOrder2.value;
    }
    
    // Function to calculate price based on rank difference
    function calculatePrice() {
        const currentRankValue = currentRankSelect.value;
        const desiredRankValue = desiredRankSelect.value;
        
        // Find the rank objects
        const currentRank = gameRanks[serviceId].ranks.find(rank => rank.value === currentRankValue);
        const desiredRank = gameRanks[serviceId].ranks.find(rank => rank.value === desiredRankValue);
        
        // Calculate rank difference
        const rankDifference = desiredRank.order - currentRank.order;
        
        // Return 0 if desired rank is lower than or equal to current rank
        if (rankDifference <= 0) {
            return 0;
        }
        
        // Calculate price based on rank difference
        return rankDifference * gameRanks[serviceId].perRankPrice;
    }
    
    // Function to calculate days needed based on rank difference
    function calculateDaysNeeded() {
        const currentRankValue = currentRankSelect.value;
        const desiredRankValue = desiredRankSelect.value;
        
        // Find the rank objects
        const currentRank = gameRanks[serviceId].ranks.find(rank => rank.value === currentRankValue);
        const desiredRank = gameRanks[serviceId].ranks.find(rank => rank.value === desiredRankValue);
        
        // Calculate rank difference
        const rankDifference = desiredRank.order - currentRank.order;
        
        // Return 0 if desired rank is lower than or equal to current rank
        if (rankDifference <= 0) {
            return 0;
        }
        
        // Each rank difference needs 1 day
        return rankDifference;
    }
    
    // Function to update the price display
    function updatePrice() {
        const price = calculatePrice();
        if (price <= 0) {
            priceElement.textContent = "Please select a higher desired rank";
            if (deliveryTimeElement) {
                deliveryTimeElement.textContent = "Invalid Rank Selection";
            }
        } else {
            priceElement.textContent = price.toFixed(3) + "  SOL";
            
            // Update delivery time
            if (deliveryTimeElement) {
                const daysNeeded = calculateDaysNeeded();
                if (daysNeeded > 0) {
                    // Format as "X-Y day delivery"
                    deliveryTimeElement.textContent = `${daysNeeded}-${daysNeeded + 1} day delivery`;
                } else {
                    deliveryTimeElement.textContent = "Invalid Rank Selection";
                }
            }
        }
    }
    
    // Add event listeners to select elements
    currentRankSelect.addEventListener('change', updatePrice);
    desiredRankSelect.addEventListener('change', updatePrice);
    
    // Initialize price on page load
    updatePrice();
}