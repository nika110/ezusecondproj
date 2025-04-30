document.addEventListener('DOMContentLoaded', function() {
    initDashboardTabs();
    loadPurchasedServices();
    updateWalletInfo();
});

// Initialize dashboard tab navigation
function initDashboardTabs() {
    const navLinks = document.querySelectorAll('.dashboard__nav a');
    const sections = document.querySelectorAll('.dashboard__section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href').substring(1);
            
            // Remove active class from all links and sections
            navLinks.forEach(link => link.parentElement.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link and target section
            this.parentElement.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// Load purchased services from local storage
function loadPurchasedServices() {
    const purchases = JSON.parse(localStorage.getItem('boostverse_purchases') || '[]');
    const purchasedContainer = document.getElementById('purchased-services');
    const activeContainer = document.getElementById('active-boosts');
    const completedContainer = document.getElementById('completed-boosts');
    
    const noPurchases = document.getElementById('no-purchases');
    const noActive = document.getElementById('no-active');
    const noCompleted = document.getElementById('no-completed');
    
    // Clear containers
    if (purchasedContainer) purchasedContainer.innerHTML = noPurchases ? noPurchases.outerHTML : '';
    if (activeContainer) activeContainer.innerHTML = noActive ? noActive.outerHTML : '';
    if (completedContainer) completedContainer.innerHTML = noCompleted ? noCompleted.outerHTML : '';
    
    // Get counts
    const purchasedCount = purchases.length;
    const activeCount = purchases.filter(p => p.status === 'active').length;
    const completedCount = purchases.filter(p => p.status === 'completed').length;
    const pendingCount = purchases.filter(p => p.status === 'pending').length;
    
    // Update stats
    updateStatsCount('purchased-count', purchasedCount);
    updateStatsCount('active-count', activeCount);
    updateStatsCount('completed-count', completedCount);
    
    // Calculate total spent
    const totalSpent = purchases.reduce((total, purchase) => total + purchase.price, 0);
    updateTotalSpent(totalSpent);
    
    // If no purchases, show empty state
    if (purchases.length === 0) {
        if (noPurchases) noPurchases.style.display = 'block';
        if (noActive) noActive.style.display = 'block';
        if (noCompleted) noCompleted.style.display = 'block';
        return;
    }
    
    // Hide empty states
    if (noPurchases) noPurchases.style.display = 'none';
    
    // Create cards for each purchase and add to appropriate container
    purchases.forEach(purchase => {
        const card = createBoostCard(purchase);
        
        // Add to appropriate container based on status
        if (purchase.status === 'active' && activeContainer) {
            if (noActive) noActive.style.display = 'none';
            activeContainer.appendChild(card);
        } else if (purchase.status === 'completed' && completedContainer) {
            if (noCompleted) noCompleted.style.display = 'none';
            completedContainer.appendChild(card);
        } else if (purchasedContainer) {
            purchasedContainer.appendChild(card);
        }
    });
    
    // If no active or completed purchases, show empty state
    if (activeCount === 0 && noActive) noActive.style.display = 'block';
    if (completedCount === 0 && noCompleted) noCompleted.style.display = 'block';
}

// Create boost card
function createBoostCard(purchase) {
    // Get service info from purchase
    const serviceId = purchase.id;
    const serviceName = purchase.name;
    const servicePrice = purchase.price;
    const serviceStatus = purchase.status || 'pending';
    const purchaseDate = new Date(purchase.date).toLocaleDateString();
    
    // Generate random progress for active boosts
    const progress = serviceStatus === 'active' ? Math.floor(Math.random() * 70) + 20 : 100;
    
    // Get mock data for the card
    const image = `img/services/${serviceId.includes('lol') ? 'lol-boost.jpg' : serviceId.includes('valorant') ? 'valorant-boost.jpg' : serviceId.includes('wow') ? 'wow-boost.jpg' : 'fortnite-boost.jpg'}`;
    const seller = purchase.seller ? purchase.seller.slice(0, 4) + '...' + purchase.seller.slice(-4) : 'Unknown';
    
    // Create card element
    const card = document.createElement('div');
    card.className = 'boost-card';
    
    // Status badge classes
    const statusClasses = {
        'pending': 'boost-card__status-badge--pending',
        'active': 'boost-card__status-badge--active',
        'completed': 'boost-card__status-badge--completed'
    };
    
    // Action buttons based on status
    let actionButtons = '';
    if (serviceStatus === 'pending') {
        actionButtons = `<button class="btn btn--small btn--outline">Track Status</button>`;
    } else if (serviceStatus === 'active') {
        actionButtons = `
            <button class="btn btn--small btn--outline">Contact Booster</button>
            <button class="btn btn--small btn--outline">Track Progress</button>
        `;
    } else if (serviceStatus === 'completed') {
        actionButtons = `
            <button class="btn btn--small btn--outline">Leave Review</button>
            <button class="btn btn--small btn--primary">Order Again</button>
        `;
    }
    
    // Progress bar for active services
    let progressBar = '';
    if (serviceStatus === 'active') {
        progressBar = `
            <div class="progress-bar">
                <div class="progress-bar__fill" style="width: ${progress}%"></div>
            </div>
            <div class="progress-bar__label">
                <span>${progress}% Complete</span>
                <span>Estimated: 2 days left</span>
            </div>
        `;
    }
    
    // Build card HTML
    card.innerHTML = `
        <div class="boost-card__image">
            <img src="${image}" alt="${serviceName}">
        </div>
        <div class="boost-card__info">
            <h3>${serviceName}</h3>
            <div class="boost-card__details">
                <span><i class="fas fa-calendar"></i> ${purchaseDate}</span>
                <span><i class="fas fa-user"></i> Booster: ${seller}</span>
            </div>
            <div class="boost-card__price">${servicePrice} SOL</div>
            ${progressBar}
        </div>
        <div class="boost-card__status">
            <div class="boost-card__status-badge ${statusClasses[serviceStatus] || ''}">${serviceStatus}</div>
            <div class="boost-card__actions">
                ${actionButtons}
            </div>
        </div>
    `;
    
    return card;
}

// Update stats count
function updateStatsCount(elementId, count) {
    const element = document.getElementById(elementId);
    if (element) element.textContent = count;
}

// Update total spent
function updateTotalSpent(amount) {
    const element = document.getElementById('total-spent');
    if (element) element.textContent = `${amount.toFixed(2)} SOL`;
}

// Update wallet info if connected
function updateWalletInfo() {
    if (window.boostVerseWallet) {
        const walletState = window.boostVerseWallet.getWalletState();
        
        if (walletState.connected) {
            // Update username
            const usernameEl = document.querySelector('.dashboard__username');
            if (usernameEl) usernameEl.textContent = 'Wallet User';
            
            // Update wallet address
            const addressEl = document.querySelector('.wallet-address');
            if (addressEl) {
                const shortAddress = walletState.publicKey.slice(0, 4) + '...' + walletState.publicKey.slice(-4);
                addressEl.textContent = shortAddress;
            }
            
            // Update balance
            const balanceEl = document.querySelector('.wallet-balance');
            if (balanceEl) balanceEl.textContent = `${walletState.balance.toFixed(2)} SOL`;
        }
    }
}

// Simulate status update (for demo purposes)
function simulateStatusUpdate() {
    const purchases = JSON.parse(localStorage.getItem('boostverse_purchases') || '[]');
    
    if (purchases.length === 0) return;
    
    // Update statuses based on random timing
    purchases.forEach((purchase, index) => {
        if (purchase.status === 'pending') {
            // 70% chance to update to active
            if (Math.random() < 0.7) {
                purchases[index].status = 'active';
            }
        } else if (purchase.status === 'active') {
            // 30% chance to update to completed
            if (Math.random() < 0.3) {
                purchases[index].status = 'completed';
            }
        }
    });
    
    // Save updated purchases
    localStorage.setItem('boostverse_purchases', JSON.stringify(purchases));
    
    // Reload dashboard
    loadPurchasedServices();
}

// Run the status update simulation every 10 seconds
setInterval(simulateStatusUpdate, 10000);
