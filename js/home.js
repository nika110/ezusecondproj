document.addEventListener('DOMContentLoaded', function() {
    // Add click listeners to all game cards in the popular games section
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        console.log("C", card)
        card.addEventListener('click', function() {
            // Get game identifier from data attribute or another source
            // Assuming each card has a data-game attribute with the game ID
            const gameId = this.getAttribute('data-game');

            console.log("ASD", gameId, this)
            
            if (gameId) {
                // Redirect to services page with game filter parameter
                window.location.href = `services.html?filter=${gameId}`;
            }
        });
    });
});
