
const mockBoostersData = [
    {
      id: 1,
      username: "KingKong",
      avatar: "assets/images/leagueOfLegends.jpg",
      games: ["League of Legends", "Valorant"],
      rating: 5.0,
      totalOrders: 2,
      responseTime: "3",
      specialization: ["League of Legends", "Valorant"],
      aboutMe: "Former semi-pro player with extensive tournament experience. I've been playing League since Season 2 and have reached Challenger in multiple seasons. I enjoy helping players improve their gameplay while efficiently boosting their accounts.",
      skillsAndAchievements: [
        "Top 50 Challenger (2021-2022)",
        "Regional Tournament Winner 2020",
        "Known for Lee Sin, Zed, and Yasuo mastery",
        "Coached 2 players to Diamond+"
      ],
      performanceStats: {
        winRate: "92%",
        kdaRatio: "8.5",
        averageGameTime: "28 minutes",
        successRate: "99%"
      },
      servicesOffered: [
        {
          id: 'service-1',
          name: "Rank Boosting",
          description: "Fast and reliable rank boosting. I'll help you climb the ranks quickly with a high win rate.",
          price: "0.058",
          checkpoints: [
            "68%+ Win Rate",
            "Fast Completion",
            "Secure Account Handling"]
        },
        {
          id: 'service-2',
          name: "Rank Boosting",
          description: "Fast and reliable rank boosting. I'll help you climb the ranks quickly with a high win rate.",
          price: "0.047",
          checkpoints: [
            "32%+ Win Rate",
            "Fast Completion",
            "Secure Account Handling"]
        }
      ],
      languages: ["English", "German"],
      availability: "Mon-Fri: 4PM-11PM, Weekends: All Day",
      hourlyRate: 25,
    },
    {
      id: 3,
      username: "FortKnight",
      avatar: "assets/images/fortnite.jpg",
      games: ["Fortnite"],
      rating: 5.0,
      totalOrders: 2,
      responseTime: "2",
      specialization: ["Fortnite"],
      aboutMe: "Competitive Fortnite player since Chapter 1. I've earned multiple cash cup placements and specialize in helping players improve their mechanics, particularly building and editing. I can help with both arena points grinding and improving skills.",
      skillsAndAchievements: [
        "Multiple Cash Cup Top 100 finishes",
        "Champion League every season",
        "20,000+ Arena Points peak",
        "Known for fast editing and piece control"
      ],
      performanceStats: {
        winRate: "32%",
        kd: "5.8",
        buildSpeed: "Very High",
        successRate: "95%"
      },
      servicesOffered: [
        {
          id: 'service-3',
          name: "Rank Boosting",
          description: "Fast and reliable rank boosting. I'll help you climb the ranks quickly with a high win rate.",
          price: "0.044",
          checkpoints: [
            "32%+ Win Rate",
            "Fast Completion",
            "Secure Account Handling"]
        }
      ],
      languages: ["English"],
      availability: "Daily: 2PM-2AM",
      hourlyRate: 22,
    },
    {
      id: 4,
      username: "Dota_Expert",
      avatar: "assets/images/dota2.jpg",
      games: ["Dota 2"],
      rating: 4.9,
      totalOrders: 412,
      responseTime: "2",
      specialization: ["Dota 2"],
      aboutMe: "Former professional Dota 2 player with 7+ years of experience. I have a deep understanding of the meta and game mechanics. I specialize in positions 1 and 2, with expertise in micro-intensive heroes and efficient farming patterns.",
      skillsAndAchievements: [
        "9000+ MMR peak",
        "Top 200 Leaderboard player",
        "Regional tournament champion",
        "Known for Meepo, Invoker, and Anti-Mage mastery"
      ],
      performanceStats: {
        winRate: "86%",
        kdaRatio: "6.2",
        averageGPM: "650+",
        successRate: "99%"
      },
      servicesOffered: [
        {
          id: 'service-4',
          name: "Rank Boosting",
          description: "Efficient MMR climbing with any heroes",
          price: "0.051",
          checkpoints: [
            "86%+ Win Rate",
            "Fast Completion",
            "Secure Account Handling"]
        }
      ],
      languages: ["English", "Russian"],
      availability: "Flexible Hours",
      hourlyRate: 35,
    },
    {
      id: 5,
      username: "DeathShot",
      avatar: "assets/images/cs2.jpg",
      games: ["CS2"],
      rating: "-",
      totalOrders: 0,
      responseTime: "2",
      specialization: ["AWP Specialist", "Entry Fragging", "Site Execution", "Rank Boosting"],
      aboutMe: "FACEIT lvl 10 player with extensive ESEA experience. I've been playing Counter-Strike for over 6 years and excel at both AWPing and rifling. Known for precise aim, exceptional game sense, and strategic utility usage.",
      skillsAndAchievements: [
        "Global Elite since 2018",
        "FACEIT Level 10 (3000+ Elo)",
        "ESEA Rank A+",
        "Multiple local LAN tournament wins"
      ],
      performanceStats: {
        winRate: "85%",
        headshotPercentage: "68%",
        averageADR: "105",
        successRate: "98%"
      },
      servicesOffered: [
        {
          id: 'service-5',
          name: "Rank Boosting",
          description: "Fast and reliable rank boosting. I'll help you climb the ranks quickly with a high win rate.",
          price: "0.047",
          checkpoints: [
            "86%+ Win Rate",
            "Fast Completion",
            "Secure Account Handling"
          ]
        }
      ],
      languages: ["English", "German"],
      availability: "Evenings: 6PM-12AM",
      hourlyRate: 28,
    }
  ];

  
    
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const boosterId = urlParams.get('username');
    
    const currentBoosterId = boosterId || '1';
    
    loadBoosterData(currentBoosterId);
    
    initCursor();
    initAnimations();
});

function loadBoosterData(username) {
    const currentUser = mockBoostersData.find(booster => booster.username === username);
    document.getElementById('boosterRating').textContent = currentUser.rating;
    document.getElementById('totalOrders').textContent = currentUser.totalOrders;
    document.getElementById('responseTime').textContent = currentUser.responseTime + ' hour';
    document.getElementById('boosterImage').src = currentUser.avatar;
    const boosterGamesDiv = document.getElementById("boosterGames");
    currentUser.specialization.forEach(game => {
        const span = document.createElement("span");
        span.className = "game-tag";
        span.textContent = game;
        boosterGamesDiv.appendChild(span);
    });
    document.getElementById('aboutMe').textContent = currentUser.aboutMe;

    const boosterAchievementsDiv = document.getElementById("boosterAchievements");

    currentUser.skillsAndAchievements.forEach(text => {
      const div = document.createElement("div");
      div.className = "achievement";
  
      const icon = document.createElement("i");
      icon.className = "fas fa-trophy";
  
      const span = document.createElement("span");
      span.textContent = text;
  
      div.appendChild(icon);
      div.appendChild(span);
      boosterAchievementsDiv.appendChild(div);
    });

    const performanceStatsDiv = document.getElementById("performanceStats");

    Object.entries(currentUser.performanceStats).forEach(([labelKey, value]) => {
      const labelFormatted = labelKey
        .replace(/([A-Z])/g, ' $1') // add space before capitals
        .replace(/^./, str => str.toUpperCase()); // capitalize first letter
  
      const statBar = document.createElement("div");
      statBar.className = "stat-bar";
  
      const label = document.createElement("div");
      label.className = "stat-bar__label";
      label.textContent = labelFormatted;
  
      const track = document.createElement("div");
      track.className = "stat-bar__track";
  
      const fill = document.createElement("div");
      fill.className = "stat-bar__fill";
  
      // Get numeric part of the value for width, fallback to 100
      const numeric = parseInt(value);
      fill.style.width = isNaN(numeric) ? "100%" : `${numeric}%`;
      fill.textContent = value;
  
      track.appendChild(fill);
      statBar.appendChild(label);
      statBar.appendChild(track);
      performanceStatsDiv.appendChild(statBar);
    });

    
    populateReviews(currentUser.customerReviews);
    populateRelatedServices(currentUser.servicesOffered);

    
    
    console.log(`Loading booster data for ID: ${boosterId}`);
}

function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 100);
    });
}

function initAnimations() {
    // Animation for stat bars
    const statBars = document.querySelectorAll('.stat-bar__fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.textContent;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statBars.forEach(bar => {
        // Initial state - width 0
        bar.style.width = '0%';
        observer.observe(bar);
    });
}
function populateReviews(reviews) {
    const reviewsContainer = document.getElementById('boosterReviews');
    if(!reviewsContainer) return;
    reviewsContainer.innerHTML = '';
    
    reviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <div class="review-card">
                        <div class="review-header">
                            <div class="reviewer-info">
                                <img src="assets/images/avatars/user1.jpg" alt="User" class="reviewer-avatar">
                                <div>
                                    <h4>${review.username}</h4>
                                    <div class="review-stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="review-date">2 weeks ago</div>
                        </div>
                        <p class="review-text">${review.comment}</p>
                        <div class="review-game">
                            <img src="assets/images/icons/lol-icon.png" alt="League of Legends">
                            <span>League of Legends</span>
                        </div>
            </div>
        `;
        
        reviewsContainer.appendChild(reviewCard);
    });
}

function populateRelatedServices(data){
  const reviewsContainer = document.getElementById('boosterServices');
  if(!reviewsContainer) return;
  reviewsContainer.innerHTML = '';

  data.forEach(val=>{
    const reviewCard = document.createElement('div');
    console.log("DATA", data)

    reviewCard.innerHTML =`
    <div class="service-card">
          <div class="service-card__header">
              <h3>${val.name}</h3>
              <div class="service-price">from <span class="price">${val.price} SOL</span></div>
          </div>
          <p>${val.description}</p>
          <ul class="service-features">
              ${val.checkpoints.map(checkpoint => `<li><i class="fas fa-check"></i> ${checkpoint}</li>`).join('')}
          </ul>
          <a href="service-details.html?id=${val.id}" class="btn btn--primary btn--medium">Order Now</a>
      </div>
  `;

  reviewsContainer.appendChild(reviewCard);
  })
            
                
}