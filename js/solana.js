document.addEventListener('DOMContentLoaded', function() {
    // Check if Solana is available
    const isSolanaAvailable = window.solana || window.phantom?.solana;
    
    // Connect wallet button
    const connectButton = document.getElementById('connectWallet');
    
    if (connectButton) {
        if (!isSolanaAvailable) {
            connectButton.addEventListener('click', function() {
                showNotification('Phantom wallet not detected. Please install Phantom extension.', 'error');
                setTimeout(() => {
                    window.open('https://phantom.app/', '_blank');
                }, 2000);
            });
        } else {
            // Initialize wallet state
            initWallet();
            
            // Connect to wallet
            connectButton.addEventListener('click', connectWallet);
        }
    }
});

// Wallet state
let wallet = {
    connected: false,
    publicKey: null,
    balance: 0
};

// Initialize wallet connection
async function initWallet() {
    try {
        // Check if already connected
        const provider = getProvider();
        if (provider) {
            const resp = await provider.connect({ onlyIfTrusted: true });
            handleConnection(resp);
        }
    } catch (error) {
        console.log('Auto-connect error:', error);
    }
}

// Get Solana provider (Phantom or other compatible wallet)
function getProvider() {
    if (window.solana?.isPhantom) {
        return window.solana;
    }
    
    if (window.phantom?.solana?.isPhantom) {
        return window.phantom.solana;
    }
    
    return null;
}

// Connect to wallet
async function connectWallet() {
    try {
        const provider = getProvider();
        
        if (!provider) {
            showNotification('Phantom wallet not detected. Please install Phantom extension.', 'error');
            return;
        }
        
        const resp = await provider.connect();
        handleConnection(resp);
        
    } catch (error) {
        console.error('Connection error:', error);
        showNotification('Failed to connect wallet. Please try again.', 'error');
    }
}

// Handle successful connection
async function handleConnection(resp) {
    wallet.publicKey = resp.publicKey.toString();
    wallet.connected = true;
    
    // Update UI
    updateWalletUI();
    
    // Get balance
    await getBalance();
    
    // Listen for account changes
    const provider = getProvider();
    provider.on('accountChanged', async () => {
        wallet.publicKey = provider.publicKey?.toString();
        wallet.connected = !!provider.publicKey;
        updateWalletUI();
        await getBalance();
    });
    
    // Listen for connection events
    provider.on('connect', async (publicKey) => {
        wallet.publicKey = publicKey.toString();
        wallet.connected = true;
        updateWalletUI();
        await getBalance();
    });
    
    provider.on('disconnect', () => {
        wallet.publicKey = null;
        wallet.connected = false;
        wallet.balance = 0;
        updateWalletUI();
    });
}

// Update wallet UI
function updateWalletUI() {
    const connectButton = document.getElementById('connectWallet');
    
    if (connectButton) {
        if (wallet.connected) {
            const shortAddress = wallet.publicKey.slice(0, 4) + '...' + wallet.publicKey.slice(-4);
            connectButton.textContent = shortAddress;
            connectButton.classList.add('btn--connected');
            
            // Add disconnect option on hover
            const disconnectBtn = document.createElement('button');
            disconnectBtn.className = 'btn btn--small btn--outline disconnect-btn';
            disconnectBtn.textContent = 'Disconnect';
            disconnectBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                disconnectWallet();
            });
            
            const btnWrapper = document.createElement('div');
            btnWrapper.className = 'wallet-btn-wrapper';
            
            // Replace connect button with wrapper
            connectButton.parentNode.insertBefore(btnWrapper, connectButton);
            btnWrapper.appendChild(connectButton);
            btnWrapper.appendChild(disconnectBtn);
        } else {
            connectButton.textContent = 'Connect Wallet';
            connectButton.classList.remove('btn--connected');
            
            // Remove wrapper if exists
            const wrapper = document.querySelector('.wallet-btn-wrapper');
            if (wrapper && wrapper.contains(connectButton)) {
                wrapper.parentNode.insertBefore(connectButton, wrapper);
                wrapper.parentNode.removeChild(wrapper);
            }
        }
    }
}

// Disconnect wallet
async function disconnectWallet() {
    try {
        const provider = getProvider();
        if (provider) {
            await provider.disconnect();
        }
        
        wallet.publicKey = null;
        wallet.connected = false;
        wallet.balance = 0;
        
        updateWalletUI();
        showNotification('Wallet disconnected', 'success');
    } catch (error) {
        console.error('Disconnect error:', error);
        showNotification('Failed to disconnect wallet', 'error');
    }
}

// Get wallet balance
async function getBalance() {
    if (!wallet.connected) return;
    
    try {
        const provider = getProvider();
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));
        const publicKey = new solanaWeb3.PublicKey(wallet.publicKey);
        
        const balance = await connection.getBalance(publicKey);
        wallet.balance = balance / solanaWeb3.LAMPORTS_PER_SOL;
        
        // Update balance display if exists
        const balanceEl = document.querySelector('.wallet-balance');
        if (balanceEl) {
            balanceEl.textContent = `${wallet.balance.toFixed(2)} SOL`;
        }
    } catch (error) {
        console.error('Error getting balance:', error);
    }
}

// Send transaction
async function sendTransaction(recipientAddress, amount) {
    if (!wallet.connected) {
        showNotification('Please connect your wallet first', 'error');
        return false;
    }
    
    try {
        const provider = getProvider();
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));
        
        // Create transaction
        const transaction = new solanaWeb3.Transaction();
        
        // Add transfer instruction
        transaction.add(
            solanaWeb3.SystemProgram.transfer({
                fromPubkey: new solanaWeb3.PublicKey(wallet.publicKey),
                toPubkey: new solanaWeb3.PublicKey(recipientAddress),
                lamports: amount * solanaWeb3.LAMPORTS_PER_SOL
            })
        );
        
        // Sign and send transaction
        const { blockhash } = await connection.getRecentBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = new solanaWeb3.PublicKey(wallet.publicKey);
        
        const signed = await provider.signTransaction(transaction);
        const signature = await connection.sendRawTransaction(signed.serialize());
        
        // Wait for confirmation
        await connection.confirmTransaction(signature);
        
        // Update balance after transaction
        await getBalance();
        
        showNotification('Payment sent successfully!', 'success');
        return true;
    } catch (error) {
        console.error('Transaction error:', error);
        showNotification('Transaction failed: ' + error.message, 'error');
        return false;
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Check if notification container exists
    let container = document.querySelector('.notifications');
    
    if (!container) {
        container = document.createElement('div');
        container.className = 'notifications';
        document.body.appendChild(container);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    // Add icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <p>${message}</p>
        <button class="notification__close"><i class="fas fa-times"></i></button>
    `;
    
    container.appendChild(notification);
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        notification.classList.add('notification--closing');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('notification--closing');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
    
    // Add animation
    setTimeout(() => {
        notification.classList.add('notification--visible');
    }, 10);
}

// Purchase service
async function purchaseService(serviceId, serviceName, price, sellerAddress) {
    if (!wallet.connected) {
        showNotification('Please connect your wallet to purchase this service', 'warning');
        document.getElementById('connectWallet').click();
        return;
    }
    
    // Check balance
    if (wallet.balance < price) {
        showNotification('Insufficient balance to purchase this service', 'error');
        return;
    }
    
    // Confirm purchase
    const confirmed = confirm(`Are you sure you want to purchase ${serviceName} for ${price} SOL?`);
    
    if (confirmed) {
        // Show loading
        showNotification('Processing payment...', 'info');
        
        // Send transaction
        const success = await sendTransaction(sellerAddress, price);
        
        if (success) {
            // Record purchase in local storage
            recordPurchase(serviceId, serviceName, price, sellerAddress);
            
            // Show success and redirect
            showNotification('Purchase successful! Redirecting to dashboard...', 'success');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        }
    }
}

// Record purchase in local storage
function recordPurchase(serviceId, serviceName, price, sellerAddress) {
    const purchases = JSON.parse(localStorage.getItem('boostverse_purchases') || '[]');
    
    purchases.push({
        id: serviceId,
        name: serviceName,
        price: price,
        seller: sellerAddress,
        date: new Date().toISOString(),
        status: 'pending'
    });
    
    localStorage.setItem('boostverse_purchases', JSON.stringify(purchases));
}

// Export functions for use in other scripts
window.boostVerseWallet = {
    connectWallet,
    disconnectWallet,
    sendTransaction,
    purchaseService,
    getWalletState: () => ({ ...wallet })
};
