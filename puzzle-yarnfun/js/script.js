const playerNotifications = [
        '🇺🇸 Player Alice entered the game',
        '🇬🇧 Player Bob entered the game',
        '🇨🇦 Player Charlie entered the game',
        '🇦🇺 Player Diana entered the game',
        '🇩🇪 Player Eva entered the game',
        '🇫🇷 Player Frank entered the game',
        '🇯🇵 Player Grace entered the game',
        '🇰🇷 Player Henry entered the game',
        '🇧🇷 Player Jack entered the game',
        '🇷🇺 Player Kevin entered the game',
        '🇮🇳 Player Lily entered the game',
        '🇮🇹 Player Mark entered the game',
        '🇪🇸 Player Nancy entered the game',
        '🇲🇽 Player Oscar entered the game',
        '🇦🇷 Player Paula entered the game',
        '🇿🇦 Player Quentin entered the game',
        '🇸🇪 Player Rachel entered the game',
        '🇳🇴 Player Steven entered the game',
        '🇩🇰 Player Tina entered the game',
        '🇳🇱 Player Ulysses entered the game',
        '🇧🇪 Player Vera entered the game',
        '🇨🇭 Player Walter entered the game',
        '🇵🇹 Player Xena entered the game',
        '🇵🇱 Player Yvonne entered the game',
        '🇮🇪 Player Zach entered the game',
        '🇳🇿 Player Amy entered the game',
        '🇸🇬 Player Ben entered the game',
        '🇲🇾 Player Cindy entered the game',
        '🇹🇭 Player David entered the game',
        '🇮🇩 Player Emma entered the game',
        '🇻🇳 Player Fred entered the game',
        '🇵🇭 Player Gina entered the game',
        '🇹🇷 Player Harry entered the game',
        '🇪🇬 Player Isabel entered the game',
        '🇸🇦 Player James entered the game',
        '🇮🇱 Player Kara entered the game',
        '🇮🇷 Player Leo entered the game',
        '🇮🇶 Player Mia entered the game',
        '🇦🇹 Player Noah entered the game',
        '🇧🇬 Player Olivia entered the game',
        '🇨🇿 Player Paul entered the game',
        '🇫🇮 Player Quinn entered the game',
        '🇬🇷 Player Rose entered the game',
        '🇭🇺 Player Sam entered the game',
        '🇱🇹 Player Tina entered the game',
        '🇱🇻 Player Uma entered the game',
        '🇲🇹 Player Vince entered the game',
        '🇷🇴 Player Wendy entered the game',
        '🇸🇰 Player Xavier entered the game',
        '🇸🇮 Player Yara entered the game',
        '🇪🇪 Player Zack entered the game',
        '🇭🇷 Player Alice entered the game',
        '🇧🇦 Player Bob entered the game',
        '🇲🇪 Player Charlie entered the game',
        '🇸🇲 Player Diana entered the game',
        '🇻🇦 Player Eva entered the game',
        '🇲🇨 Player Frank entered the game',
        '🇱🇺 Player Grace entered the game',
        '🇦🇱 Player Henry entered the game',
        '🇲🇰 Player Jack entered the game',
        '🇧🇾 Player Kevin entered the game',
        '🇺🇦 Player Lily entered the game',
        '🇬🇪 Player Mark entered the game',
        '🇦🇲 Player Nancy entered the game',
        '🇦🇿 Player Oscar entered the game',
        '🇰🇿 Player Paula entered the game',
        '🇺🇿 Player Quentin entered the game',
        '🇹🇯 Player Rachel entered the game',
        '🇰🇬 Player Steven entered the game',
        '🇲🇩 Player Tina entered the game',
        '🇦🇫 Player Ulysses entered the game',
        '🇧🇭 Player Vera entered the game',
        '🇰🇼 Player Walter entered the game',
        '🇴🇲 Player Xena entered the game',
        '🇶🇦 Player Yvonne entered the game',
        '🇦🇪 Player Zach entered the game',
        '🇲🇦 Player Amy entered the game',
        '🇹🇳 Player Ben entered the game',
        '🇩🇿 Player Cindy entered the game',
        '🇸🇩 Player David entered the game',
        '🇪🇷 Player Emma entered the game',
        '🇩🇯 Player Fred entered the game',
        '🇸🇴 Player Gina entered the game',
        '🇰🇪 Player Harry entered the game',
        '🇺🇬 Player Isabel entered the game',
        '🇹🇿 Player James entered the game',
        '🇷🇼 Player Kara entered the game',
        '🇧🇮 Player Leo entered the game',
        '🇲🇿 Player Mia entered the game',
        '🇿🇲 Player Noah entered the game',
        '🇲🇼 Player Olivia entered the game',
        '🇿🇼 Player Paul entered the game',
        '🇧🇼 Player Quinn entered the game',
        '🇳🇦 Player Rose entered the game',
        '🇱🇸 Player Sam entered the game',
        '🇸🇿 Player Tina entered the game',
        '🇨🇴 Player Uma entered the game',
        '🇻🇪 Player Vince entered the game',
        '🇪🇨 Player Wendy entered the game',
        '🇵🇪 Player Xavier entered the game',
        '🇧🇴 Player Yara entered the game',
        '🇨🇱 Player Zack entered the game',
        '🇵🇾 Player Alice entered the game',
        '🇬🇾 Player Bob entered the game',
        '🇯🇲 Player Charlie entered the game',
        '🇹🇹 Player Diana entered the game',
        '🇧🇹 Player Eva entered the game'
    ];

// Performance utilities
const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Document ready event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize all features
    initBulletComments();
    initDownloadList();
    initDownloadCounter();
    initSmoothScroll();
    initScrollAnimations();
    initPlayerNotifications();
    generateGameComments();
});

// Player Online Notifications
function initPlayerNotifications() {
   

    // Create a container for the notifications
    const notificationsContainer = document.createElement('div');
    notificationsContainer.style.position = 'fixed';
    notificationsContainer.style.top = '20px';
    notificationsContainer.style.left = '20px';
    notificationsContainer.style.zIndex = '1000';
    notificationsContainer.style.display = 'flex';
    notificationsContainer.style.flexDirection = 'column-reverse';
    notificationsContainer.style.gap = '10px';
    document.body.appendChild(notificationsContainer);

    // Function to show a new notification
    function showNewNotification() {
        // Randomly select a notification
        const randomIndex = Math.floor(Math.random() * playerNotifications.length);
        const notificationText = playerNotifications[randomIndex];
        
         // box-shadow: 0 8px 25px rgba(129, 107, 255, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.15);
        //    border: 1px solid rgba(255, 255, 255, 0.2);
        //     text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

        // Create a new notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            background: linear-gradient(135deg, rgba(0, 0, 235, 0.8) 0%, rgba(117, 107, 255, 0.95) 100%);
            color: #fff;
            padding:15px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 1.2rem;
           
            animation: slideInLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), scaleIn 0.3s ease-out 0.2s both, fadeOut 0.6s ease-in 8.5s forwards;
            touch-action: manipulation;
            backdrop-filter: blur(10px);
          
            transition: all 0.3s ease;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 90vw;
            word-wrap: break-word;
            overflow: hidden;
            position: relative;
            overflow: hidden;
        `;
        
        // Add a decorative element
        const decor = document.createElement('div');
        decor.style.cssText = `
            position: absolute;
            top: 0;
            right: 0;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
            border-radius: 0 0 0 18px;
            pointer-events: none;
        `;
        notification.appendChild(decor);
        
        // Add text content
        const textSpan = document.createElement('span');
        textSpan.textContent = notificationText;
        textSpan.style.display = 'inline-block';
        textSpan.style.position = 'relative';
        textSpan.style.zIndex = '1';
        notification.appendChild(textSpan);
        
        // Add hover effect
        notification.addEventListener('mouseenter', () => {
            notification.style.transform = 'translateY(-2px) scale(1.02)';
            notification.style.boxShadow = '0 12px 35px rgba(132, 107, 255, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.2)';
        });
        
        notification.addEventListener('mouseleave', () => {
            notification.style.transform = 'translateY(0) scale(1)';
            notification.style.boxShadow = '0 8px 25px rgba(107, 127, 255, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.15)';
        });
        
        // Add the notification to the container
        notificationsContainer.appendChild(notification);
        
        // Remove the notification after animation completes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 9000);
    }
    
    // Add animations for the notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInLeft {
            from {
                transform: translateX(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes scaleIn {
            from {
                transform: scale(0.95);
                opacity: 0.8;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(-20px);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Set initial notification with delay to错开Welcome message
    setTimeout(() => {
        showNewNotification();
        
        // Show new notification every 10 seconds
        setInterval(showNewNotification, 10000);
    }, 5000);
}

// Bullet Comments Function
function initBulletComments() {
    const bulletContainer = document.getElementById('bullets-container');
    const bulletMessages = [
        '🇺🇸 Player Alice Daily Claimed!',
        '🇬🇧 Player Bob Daily Claimed!',
        '🇨🇦 Player Charlie Daily Claimed!',
        '🇦🇺 Player Diana Daily Claimed!',
        '🇩🇪 Player Eva Daily Claimed!',
        '🇫🇷 Player Frank Daily Claimed!',
        '🇯🇵 Player Grace Daily Claimed!',
        '🇰🇷 Player Henry Daily Claimed!',
        '🇧🇷 Player Jack Daily Claimed!',
        '🇷🇺 Player Kevin Daily Claimed!',
        '🇮🇳 Player Lily Daily Claimed!',
        '🇮🇹 Player Mark Daily Claimed!',
        '🇪🇸 Player Nancy Daily Claimed!',
        '🇲🇽 Player Oscar Daily Claimed!',
        '🇦🇷 Player Paula Daily Claimed!',
        '🇿🇦 Player Quentin Daily Claimed!',
        '🇸🇪 Player Rachel Daily Claimed!',
        '🇳🇴 Player Steven Daily Claimed!',
        '🇩🇰 Player Tina Daily Claimed!',
        '🇳🇱 Player Ulysses Daily Claimed!',
        '🇧🇪 Player Vera Daily Claimed!',
        '🇨🇭 Player Walter Daily Claimed!',
        '🇵🇹 Player Xena Daily Claimed!',
        '🇵🇱 Player Yvonne Daily Claimed!',
        '🇮🇪 Player Zach Daily Claimed!',
        '🇳🇿 Player Amy Daily Claimed!',
        '🇸🇬 Player Ben Daily Claimed!',
        '🇲🇾 Player Cindy Daily Claimed!',
        '🇹🇭 Player David Daily Claimed!',
        '🇮🇩 Player Emma Daily Claimed!',
        '🇻🇳 Player Fred Daily Claimed!',
        '🇵🇭 Player Gina Daily Claimed!',
        '🇹🇷 Player Harry Daily Claimed!',
        '🇪🇬 Player Isabel Daily Claimed!',
        '🇸🇦 Player James Daily Claimed!',
        '🇮🇱 Player Kara Daily Claimed!',
        '🇮🇷 Player Leo Daily Claimed!',
        '🇮🇶 Player Mia Daily Claimed!',
        '🇦🇹 Player Noah Daily Claimed!',
        '🇧🇬 Player Olivia Daily Claimed!',
        '🇨🇿 Player Paul Daily Claimed!',
        '🇫🇮 Player Quinn Daily Claimed!',
        '🇬🇷 Player Rose Daily Claimed!',
        '🇭🇺 Player Sam Daily Claimed!',
        '🇱🇹 Player Tina Daily Claimed!',
        '🇱🇻 Player Uma Daily Claimed!',
        '🇲🇹 Player Vince Daily Claimed!',
        '🇷🇴 Player Wendy Daily Claimed!',
        '🇸🇰 Player Xavier Daily Claimed!',
        '🇸🇮 Player Yara Daily Claimed!',
        '🇪🇪 Player Zack Daily Claimed!',
        '🇭🇷 Player Alice Daily Claimed!',
        '🇧🇦 Player Bob Daily Claimed!',
        '🇲🇪 Player Charlie Daily Claimed!',
        '🇸🇲 Player Diana Daily Claimed!',
        '🇻🇦 Player Eva Daily Claimed!',
        '🇲🇨 Player Frank Daily Claimed!',
        '🇱🇺 Player Grace Daily Claimed!',
        '🇦🇱 Player Henry Daily Claimed!',
        '🇲🇰 Player Jack Daily Claimed!',
        '🇧🇾 Player Kevin Daily Claimed!',
        '🇺🇦 Player Lily Daily Claimed!',
        '🇬🇪 Player Mark Daily Claimed!',
        '🇦🇲 Player Nancy Daily Claimed!',
        '🇦🇿 Player Oscar Daily Claimed!',
        '🇰🇿 Player Paula Daily Claimed!',
        '🇺🇿 Player Quentin Daily Claimed!',
        '🇹🇯 Player Rachel Daily Claimed!',
        '🇰🇬 Player Steven Daily Claimed!',
        '🇲🇩 Player Tina Daily Claimed!',
        '🇦🇫 Player Ulysses Daily Claimed!',
        '🇧🇭 Player Vera Daily Claimed!',
        '🇰🇼 Player Walter Daily Claimed!',
        '🇴🇲 Player Xena Daily Claimed!',
        '🇶🇦 Player Yvonne Daily Claimed!',
        '🇦🇪 Player Zach Daily Claimed!',
        '🇲🇦 Player Amy Daily Claimed!',
        '🇹🇳 Player Ben Daily Claimed!',
        '🇩🇿 Player Cindy Daily Claimed!',
        '🇸🇩 Player David Daily Claimed!',
        '🇪🇷 Player Emma Daily Claimed!',
        '🇩🇯 Player Fred Daily Claimed!',
        '🇸🇴 Player Gina Daily Claimed!',
        '🇰🇪 Player Harry Daily Claimed!',
        '🇺🇬 Player Isabel Daily Claimed!',
        '🇹🇿 Player James Daily Claimed!',
        '🇷🇼 Player Kara Daily Claimed!',
        '🇧🇮 Player Leo Daily Claimed!',
        '🇲🇿 Player Mia Daily Claimed!',
        '🇿🇲 Player Noah Daily Claimed!',
        '🇲🇼 Player Olivia Daily Claimed!',
        '🇿🇼 Player Paul Daily Claimed!',
        '🇧🇼 Player Quinn Daily Claimed!',
        '🇳🇦 Player Rose Daily Claimed!',
        '🇱🇸 Player Sam Daily Claimed!',
        '🇸🇿 Player Tina Daily Claimed!',
        '🇨🇴 Player Uma Daily Claimed!',
        '🇻🇪 Player Vince Daily Claimed!',
        '🇪🇨 Player Wendy Daily Claimed!',
        '🇵🇪 Player Xavier Daily Claimed!',
        '🇧🇴 Player Yara Daily Claimed!',
        '🇨🇱 Player Zack Daily Claimed!',
        '🇵🇾 Player Alice Daily Claimed!',
        '🇬🇾 Player Bob Daily Claimed!',
        '🇯🇲 Player Charlie Daily Claimed!',
        '🇹🇹 Player Diana Daily Claimed!',
        '🇧🇹 Player Eva Daily Claimed!',
        '🇳🇬 Player Frank Daily Claimed!',
        '🇿🇦 Player Grace Daily Claimed!',
        '🇰🇪 Player Henry Daily Claimed!',
        '🇹🇿 Player Jack Daily Claimed!',
        '🇺🇬 Player Kevin Daily Claimed!',
        '🇲🇼 Player Lily Daily Claimed!',
        '🇿🇼 Player Mark Daily Claimed!',
        '🇧🇼 Player Nancy Daily Claimed!',
        '🇳🇦 Player Oscar Daily Claimed!',
        '🇱🇸 Player Paula Daily Claimed!',
        '🇸🇿 Player Quentin Daily Claimed!',
        '🇲🇦 Player Rachel Daily Claimed!',
        '🇹🇳 Player Steven Daily Claimed!',
        '🇩🇿 Player Tina Daily Claimed!',
        '🇸🇩 Player Ulysses Daily Claimed!',
        '🇪🇷 Player Vera Daily Claimed!',
        '🇩🇯 Player Walter Daily Claimed!',
        '🇸🇴 Player Xena Daily Claimed!',
        '🇦🇫 Player Yvonne Daily Claimed!',
        '🇧🇭 Player Zach Daily Claimed!',
        '🇰🇼 Player Amy Daily Claimed!',
        '🇴🇲 Player Ben Daily Claimed!',
        '🇶🇦 Player Cindy Daily Claimed!',
        '🇦🇪 Player David Daily Claimed!',
        '🇸🇦 Player Emma Daily Claimed!',
        '🇮🇱 Player Fred Daily Claimed!',
        '🇮🇷 Player Gina Daily Claimed!',
        '🇮🇶 Player Harry Daily Claimed!',
        '🇦🇹 Player Isabel Daily Claimed!',
        '🇧🇬 Player James Daily Claimed!',
        '🇨🇿 Player Kara Daily Claimed!',
        '🇫🇮 Player Leo Daily Claimed!',
        '🇬🇷 Player Mia Daily Claimed!',
        '🇭🇺 Player Noah Daily Claimed!',
        '🇱🇹 Player Olivia Daily Claimed!',
        '🇱🇻 Player Paul Daily Claimed!',
        '🇲🇹 Player Quinn Daily Claimed!',
        '🇷🇴 Player Rose Daily Claimed!',
        '🇸🇰 Player Sam Daily Claimed!',
        '🇸🇮 Player Tina Daily Claimed!',
        '🇪🇪 Player Uma Daily Claimed!',
        '🇭🇷 Player Vince Daily Claimed!',
        '🇧🇦 Player Wendy Daily Claimed!',
        '🇲🇪 Player Xavier Daily Claimed!',
        '🇸🇲 Player Yara Daily Claimed!',
        '🇻🇦 Player Zack Daily Claimed!',
        '🇲🇨 Player Alice Daily Claimed!',
        '🇱🇺 Player Bob Daily Claimed!',
        '🇦🇱 Player Charlie Daily Claimed!',
        '🇲🇰 Player Diana Daily Claimed!',
        '🇧🇾 Player Eva Daily Claimed!',
        '🇺🇦 Player Frank Daily Claimed!',
        '🇬🇪 Player Grace Daily Claimed!',
        '🇦🇲 Player Henry Daily Claimed!',
        '🇦🇿 Player Jack Daily Claimed!',
        '🇰🇿 Player Kevin Daily Claimed!',
        '🇺🇿 Player Lily Daily Claimed!',
        '🇹🇯 Player Mark Daily Claimed!',
        '🇰🇬 Player Nancy Daily Claimed!',
        '🇲🇩 Player Oscar Daily Claimed!',
        '🇳🇿 Player Paula Daily Claimed!',
        '🇸🇬 Player Quentin Daily Claimed!',
        '🇲🇾 Player Rachel Daily Claimed!',
        '🇹🇭 Player Steven Daily Claimed!',
        '🇮🇩 Player Tina Daily Claimed!',
        '🇻🇳 Player Ulysses Daily Claimed!',
        '🇵🇭 Player Vera Daily Claimed!',
        '🇮🇳 Player Walter Daily Claimed!',
        '🇮🇹 Player Xena Daily Claimed!',
        '🇪🇸 Player Yvonne Daily Claimed!',
        '🇲🇽 Player Zach Daily Claimed!',
        '🇦🇷 Player Amy Daily Claimed!',
        '🇧🇷 Player Ben Daily Claimed!',
        '🇷🇺 Player Cindy Daily Claimed!',
        '🇯🇵 Player David Daily Claimed!',
        '🇰🇷 Player Emma Daily Claimed!',
        '🇩🇪 Player Fred Daily Claimed!',
        '🇫🇷 Player Gina Daily Claimed!',
        '🇨🇦 Player Harry Daily Claimed!',
        '🇬🇧 Player Isabel Daily Claimed!',
        '🇺🇸 Player James Daily Claimed!',
        '🇦🇺 Player Kara Daily Claimed!',
        '🇳🇿 Player Leo Daily Claimed!',
        '🇸🇬 Player Mia Daily Claimed!',
        '🇲🇾 Player Noah Daily Claimed!',
        '🇹🇭 Player Olivia Daily Claimed!',
        '🇮🇩 Player Paul Daily Claimed!',
        '🇻🇳 Player Quinn Daily Claimed!',
        '🇵🇭 Player Rose Daily Claimed!',
        '🇹🇷 Player Sam Daily Claimed!',
        '🇪🇬 Player Tina Daily Claimed!',
        '🇸🇦 Player Uma Daily Claimed!',
        '🇮🇱 Player Vince Daily Claimed!',
        '🇮🇷 Player Wendy Daily Claimed!',
        '🇮🇶 Player Xavier Daily Claimed!',
        '🇦🇹 Player Yara Daily Claimed!',
        '🇧🇬 Player Zack Daily Claimed!',
        '🇨🇿 Player Alice Daily Claimed!',
        '🇫🇮 Player Bob Daily Claimed!',
        '🇬🇷 Player Charlie Daily Claimed!',
        '🇭🇺 Player Diana Daily Claimed!',
        '🇱🇹 Player Eva Daily Claimed!',
        '🇱🇻 Player Frank Daily Claimed!',
        '🇲🇹 Player Grace Daily Claimed!',
        '🇷🇴 Player Henry Daily Claimed!',
        '🇸🇰 Player Jack Daily Claimed!',
        '🇸🇮 Player Kevin Daily Claimed!',
        '🇪🇪 Player Lily Daily Claimed!',
        '🇭🇷 Player Mark Daily Claimed!',
        '🇧🇦 Player Nancy Daily Claimed!',
        '🇲🇪 Player Oscar Daily Claimed!',
        '🇸🇲 Player Paula Daily Claimed!',
        '🇻🇦 Player Quentin Daily Claimed!',
        '🇲🇨 Player Rachel Daily Claimed!',
        '🇱🇺 Player Steven Daily Claimed!'    ];

    // Create a new bullet comment
    function createBullet() {
        const bullet = document.createElement('div');
        bullet.className = 'bullet';
        bullet.textContent = bulletMessages[Math.floor(Math.random() * bulletMessages.length)];
        
        // Random position and size - optimized for better visibility in viewport
        const containerWidth = bulletContainer.offsetWidth;
        const containerHeight = bulletContainer.offsetHeight;
        const randomLeft = Math.random() * (containerWidth - 250);
        const randomSize = Math.random() * 0.6 + 0.7; // 0.7 to 1.3 (increased variation)
        const randomDuration = Math.random() * 10 + 8; // 8 to 18 seconds (slower speed for longer visibility)
        
        // Start position within visible area (20% to 80% of container height)
        const startY = containerHeight * (0.2 + Math.random() * 0.6);
        bullet.style.top = `${startY}px`;
        
        bullet.style.left = `${randomLeft}px`;
        bullet.style.transform = `scale(${randomSize})`;
        bullet.style.animationDuration = `${randomDuration}s`;
        
        bulletContainer.appendChild(bullet);
        
        // Remove bullet after animation completes
        setTimeout(() => {
            if (bullet.parentNode) {
                bullet.parentNode.removeChild(bullet);
            }
        }, randomDuration * 1000);
    }

    // Create initial bullets - increased from 5 to 10 for denser start
    for (let i = 0; i < 10; i++) {
        setTimeout(createBullet, i * 500); // Decreased from 1s to 500ms
    }

    // Create bullets continuously with throttling - increased density
    const throttledCreateBullet = throttle(createBullet, 800); // Decreased from 2000ms to 800ms
    setInterval(throttledCreateBullet, 800);
}

// Download Counter Function
function initDownloadCounter() {
    const downloadCounter = document.getElementById('download-counter');
    
    // Get saved data from localStorage
    const savedData = JSON.parse(localStorage.getItem('downloadData')) || {
        count: 5000, // Initial download count
        lastVisit: Date.now()
    };
    
    // Calculate days since last visit
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const daysSinceLastVisit = Math.floor((now - savedData.lastVisit) / oneDay);
    
    // Increment download count based on days passed
    if (daysSinceLastVisit > 0) {
        const incrementPerDay = Math.floor(Math.random() * 51) + 50; // 50-100 per day
        const totalIncrement = incrementPerDay * daysSinceLastVisit;
        savedData.count += totalIncrement;
        savedData.lastVisit = now;
        
        // Save updated data
        localStorage.setItem('downloadData', JSON.stringify(savedData));
    }
    
    // Animate the counter to the current value
    function animateCounter(start, end, duration) {
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Smooth easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);
            
            // Format the number with commas
            downloadCounter.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Initial animation
    animateCounter(0, savedData.count, 2000);
    
    // Add a small random increment every 30 seconds to simulate real-time downloads
    setInterval(() => {
        savedData.count += Math.floor(Math.random() * 3) + 1; // 1-3 downloads every 30s
        localStorage.setItem('downloadData', JSON.stringify(savedData));
        
        // Animate the increment
        const currentCount = parseInt(downloadCounter.textContent.replace(/,/g, ''));
        animateCounter(currentCount, savedData.count, 500);
    }, 30000);
}

// Array to track used avatar indices
let usedAvatarIndices = [];

// Get random avatar image from images/icon directory with deduplication
function getRandomAvatar() {
    const totalAvatars = 32; // Total number of avatars available
    
    // If all avatars have been used, reset the used array
    if (usedAvatarIndices.length >= totalAvatars) {
        usedAvatarIndices = [];
    }
    
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * totalAvatars) + 1;
    } while (usedAvatarIndices.includes(randomIndex));
    
    // Add the selected index to used array
    usedAvatarIndices.push(randomIndex);
    
    const indexStr = randomIndex.toString().padStart(2, '0');
    return `images/icon/avatar_${indexStr}.webp`;
}

// Update existing avatar placeholders with random images
function updateExistingAvatars() {
    const avatarElements = document.querySelectorAll('.avatar');
    avatarElements.forEach(avatar => {
        // Only update if it's a div element (not already an img)
        if (avatar.tagName === 'DIV') {
            const avatarImg = document.createElement('img');
            avatarImg.src = getRandomAvatar();
            avatarImg.alt = 'User avatar';
            avatarImg.className = 'avatar';
            avatarImg.setAttribute('aria-hidden', 'true');
            avatar.parentNode.replaceChild(avatarImg, avatar);
        }
    });
}

// Comments Generation Function
function generateGameComments() {
    const games = [
        "Yarn Sort 3D: Jam Puzzle",
        "Yarn Sort Master 3D",
        "Yarn Sort 3D: Unwind Puzzle",
        "Puzzle: Yarn Fun",
        "Yarn Sort",
        "Yarn Sort Puzzle",
        "Yarn Escape: Wool Sort 3D",
        "Color Yarn Puzzle",
        "Wool Sorting: Unravel Yarn 3D",
        "Wool Sort",
        "Wool Sort Puzzle",
        "Yarn Color Sort",
        "Thread Sort Puzzle: Color Yarn",
        "Knit Sort: Yarn Puzzle",
        "Yarn Sort 3D: Color Puzzle",
        "Hexa Yarn Sort–Knitting Puzzle",
        "Yarn Layer: Wool sort Game",
        "Knit Sort: Yarn Color Sort",
        "Wool Sort Master: Knitting Jam",
        "Wool Sort: Knit Away",
        "Yarn Sort: Color Jam",
        "Wool Knit - Color Sort 3D",
        "Color Yarn 3D",
        "Wool Knit: Sort Colors",
        "Yarn Puzzle: Sort & Relax",
        "Wool Match: Sort 3 Wools",
        "Yarn Fever! Unravel Puzzle",
        "YarnTower：Cat Sort",
        "Wool Knit Sort – Yarn Puzzle",
        "Yarn Puzzle",
        "Puzzle: Yarn Fun",
        "Wool Yarn Puzzle",
        "Wool Puzzle 3D",
        "Wool 3D Puzzle - Yarn Unravel",
        "Color Yarn Puzzle",
        "Yarn Sort 3D: Jam Puzzle",
        "Yarn Match Puzzle",
        "Yarndom: Unravel Puzzle",
        "Wool Puzzle 3D",
        "Yarn Fever! Unravel Puzzle",
        "Yarn Sort Puzzle",
        "Yarn Snake: Tangle Puzzle",
        "Wool Puzzle",
        "Wool Sorting: Unravel Yarn 3D",
        "Yarn Match Master",
        "Wool Wonder! Unravel Puzzle",
        "Wool Puzzle: Sort Challenge",
        "Wool Out: Color Yarn Puzzle",
        "Wool Blast: Yarn Color Rescue",
        "Yarn Sort 3D: Color Puzzle"
    ];
    
    // Comment templates for different game types
    const commentTemplates = [
        "I absolutely love this yarn sorting game! The {game} has the most relaxing gameplay and beautiful graphics.",
        "{game} is my new obsession. I can't stop sorting those colorful yarns. Perfect for winding down after a long day.",
        "This game is so satisfying! The way the yarns unravel in {game} is so realistic and enjoyable.",
        "{game} is the best yarn sorting puzzle I've ever played. The levels are challenging but not frustrating.",
        "I'm hooked on {game}! The 3D effects make the yarn sorting experience so immersive.",
        "What a delightful game! {game} has adorable graphics and smooth gameplay. Perfect for all ages.",
        "{game} is my go-to relaxation game. The yarn sorting mechanics are so well-designed and fun.",
        "I love how {game} combines puzzle-solving with the satisfying feeling of untangling yarn. Great concept!",
        "This game is brilliant! {game} has the right balance of challenge and relaxation. Highly recommended.",
        "{game} is the perfect game for anyone who loves puzzles and cute aesthetics. The yarn colors are so vibrant!",
        "I've been playing {game} for hours and I'm still not bored. The level variety is impressive.",
        "The 3D yarn in {game} looks so realistic! I can almost feel the texture. Great attention to detail.",
        "{game} is a must-have for puzzle lovers. The sorting mechanics are unique and addictive.",
        "I love how {game} helps me unwind. The calming music and smooth animations make it perfect for stress relief.",
        "{game} is so much fun! I enjoy trying to beat my own records in the yarn sorting levels.",
        "The graphics in {game} are stunning. The yarns have such beautiful colors and textures.",
        "I can't get enough of {game}! The puzzle design is clever and keeps me engaged.",
        "{game} is the perfect companion for my commute. It's offline and so much fun to play.",
        "I love the simple yet addictive gameplay of {game}. It's easy to learn but hard to master.",
        "{game} has become my daily relaxation ritual. I look forward to sorting yarns every evening.",
        "The controls in {game} are so intuitive. I picked it up right away and haven't put it down since.",
        "{game} is a gem of a game. The yarn sorting concept is executed perfectly.",
        "I'm impressed by how polished {game} is. Everything from the graphics to the gameplay is top-notch.",
        "{game} is my favorite puzzle game right now. The yarn theme makes it so unique and charming.",
        "I love the challenge of {game}. The harder levels really test my yarn sorting skills!",
        "{game} is such a cute and fun game. The little yarn characters are adorable.",
        "The satisfaction of completing a level in {game} is unmatched. I love seeing all the yarns sorted correctly.",
        "{game} has great replay value. I keep coming back to beat my high scores.",
        "I recommend {game} to anyone looking for a relaxing yet engaging puzzle game.",
        "The variety of levels in {game} is amazing. There's always something new to challenge me.",
        "{game} is the perfect blend of puzzle-solving and creativity. I love the yarn art aspect.",
        "I'm amazed by how realistic the yarn physics are in {game}. It makes the sorting experience so much better.",
        "{game} is my new favorite way to unwind. The calming atmosphere is exactly what I need.",
        "The graphics in {game} are so vibrant and eye-catching. The yarn colors really pop!",
        "I can't believe how addictive {game} is. I started playing this morning and it's already evening.",
        "{game} is a fantastic game for all ages. My kids love it as much as I do.",
        "The level design in {game} is brilliant. Each level presents a new and interesting yarn sorting challenge.",
        "I love the offline feature of {game}. I can play it anywhere, even without internet.",
        "{game} has become my go-to game when I need a break. It's so relaxing and enjoyable.",
        "The attention to detail in {game} is impressive. The yarn textures look so real.",
        "I'm hooked on {game}! The yarn sorting mechanics are so satisfying and fun.",
        "{game} is a must-play for puzzle enthusiasts. The yarn theme is refreshing and unique.",
        "I love how {game} keeps me mentally engaged while also helping me relax.",
        "The music in {game} is so calming and fits the yarn theme perfectly.",
        "{game} is the best yarn sorting game I've ever played. I highly recommend it to everyone.",
        "I can't stop playing {game}! The levels are challenging but always fair.",
        "{game} has such a charming aesthetic. The yarn characters and background music make it so cozy.",
        "I'm impressed by the smooth animations in {game}. The yarns move so fluidly when being sorted.",
        "{game} is a delightful surprise. I wasn't expecting to love yarn sorting this much!",
        "I recommend {game} to anyone looking for a fun, relaxing, and addictive puzzle game."
    ];
    
    // Generate random usernames
    const usernames = [];
    const nameParts = ["Alice", "Bob", "Charlie", "Diana", "Eva", "Frank", "Grace", "Henry", "Ivy", "Jack", "Kate", "Leo", "Mia", "Noah", "Olivia", "Paul", "Quinn", "Rose", "Sam", "Tina", "Uma", "Vince", "Wendy", "Xavier", "Yara", "Zack"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
    
    for (let i = 0; i < 50; i++) {
        const firstName = nameParts[Math.floor(Math.random() * nameParts.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        usernames.push(`${firstName} ${lastName}`);
    }
    
    // Generate random dates
    function getRandomDate() {
        const days = Math.floor(Math.random() * 30) + 1;
        if (days === 1) return "1 day ago";
        return `${days} days ago`;
    }
    
    
// Generate random ratings (2-5 stars, with 2 stars limited to 5%)
    let twoStarCount = 0;
    const totalComments = games.length - 3; // Excluding first 3 games
    const maxTwoStarComments = Math.ceil(totalComments * 0.05); // 5% of total comments
    
    function getRandomRating() {
        // If we've already reached the max 2-star comments, generate 3-5 stars
        if (twoStarCount >= maxTwoStarComments) {
            const rating = Math.floor(Math.random() * 3) + 3; // 3-5 stars
            return "⭐".repeat(rating);
        }
        
        // Generate a weighted random number
        const random = Math.random();
        
        // 5% chance for 2 stars, 95% chance for 3-5 stars
        if (random < 0.05) {
            twoStarCount++;
            return "⭐⭐";
        } else {
            const rating = Math.floor(Math.random() * 3) + 3; // 3-5 stars
            return "⭐".repeat(rating);
        }
    }
    
    // Get comments container
    const commentsList = document.querySelector(".comments-list");
    
    // Clear existing comments (keep the first 3 if needed)
    // commentsList.innerHTML = '';
    
    // Generate and add comments
    games.forEach((game, index) => {
        // Skip first 3 games as they already have comments
        if (index < 3) return;
        
        const username = usernames[index];
        const avatarUrl = getRandomAvatar();
        const date = getRandomDate();
        const rating = getRandomRating();
        const ratingValue = rating.length; // Get numeric rating value
        
        // Choose a random comment template and replace {game} with actual game name
        const template = commentTemplates[Math.floor(Math.random() * commentTemplates.length)];
        const commentContent = template.replace(/{game}/g, game);
        
        // Create comment element with Schema.org structured data
        const commentElement = document.createElement("div");
        commentElement.className = "comment";
        commentElement.role = "article";
        commentElement.itemScope = true;
        commentElement.itemType = "https://schema.org/Review";
        commentElement.innerHTML = `
            <div class="comment-header">
                <div class="user-info">
                    <img src="${avatarUrl}" alt="User avatar" class="avatar" aria-hidden="true">
                    <div class="user-details" itemProp="author" itemScope itemType="https://schema.org/Person">
                        <h4 itemProp="name">${username}</h4>
                        <p itemProp="datePublished" content="${new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}">${date}</p>
                    </div>
                </div>
                <div class="rating" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                    <meta itemProp="worstRating" content="1">
                    <meta itemProp="bestRating" content="5">
                    <meta itemProp="ratingValue" content="${ratingValue}">${rating}
                </div>
            </div>
            <div class="comment-content" itemProp="reviewBody">
                <p>${commentContent}</p>
            </div>
        `;
        
        // Add animation class
        commentElement.style.opacity = "0";
        commentElement.style.transform = "translateY(20px)";
        commentElement.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        
        // Append to comments list
        commentsList.appendChild(commentElement);
        
        // Animate in
        setTimeout(() => {
            commentElement.style.opacity = "1";
            commentElement.style.transform = "translateY(0)";
        }, index * 50); // Stagger animation
    });
}

// Download List Function
function initDownloadList() {
    const downloadList = document.getElementById('download-list');
    const users = [
        { name: 'Alice', country: 'USA', time: '2 minutes ago' },
        { name: 'Bob', country: 'UK', time: '5 minutes ago' },
        { name: 'Charlie', country: 'Canada', time: '10 minutes ago' },
        { name: 'Diana', country: 'Australia', time: '15 minutes ago' },
        { name: 'Eva', country: 'Germany', time: '20 minutes ago' },
        { name: 'Frank', country: 'France', time: '25 minutes ago' },
        { name: 'Grace', country: 'Japan', time: '30 minutes ago' },
        { name: 'Henry', country: 'South Korea', time: '35 minutes ago' }
    ];

    // Shuffle users array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Get random user avatar image from images/user/01 directory
    function getRandomUserAvatar() {
        const totalAvatars = 50; // Total number of user avatars available (1.png to 50.png)
        const randomIndex = Math.floor(Math.random() * totalAvatars) + 1;
        return `images/user/01/${randomIndex}.png`;
    }
    
    // Create download items
    function createDownloadItems() {
        const shuffledUsers = shuffleArray([...users]);
        
        shuffledUsers.forEach(user => {
            const downloadItem = document.createElement('div');
            downloadItem.className = 'download-item';
            
            const avatarImg = getRandomUserAvatar();
            
            downloadItem.innerHTML = `
                <div class="download-avatar">
                    <img src="${avatarImg}" alt="User avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
                </div>
                <div class="download-info">
                    <h4>${user.name}</h4>
                    <p>${user.country} • ${user.time}</p>
                </div>
            `;
            
            downloadList.appendChild(downloadItem);
        });
    }

    // Update download times
    function updateDownloadTimes() {
        const downloadItems = downloadList.querySelectorAll('.download-item');
        downloadItems.forEach(item => {
            const timeElement = item.querySelector('.download-info p');
            const currentTime = timeElement.textContent;
            
            // Simulate time passing
            if (currentTime.includes('minutes')) {
                const minutes = parseInt(currentTime);
                if (minutes < 59) {
                    timeElement.textContent = timeElement.textContent.replace(minutes, minutes + 1);
                } else {
                    timeElement.textContent = timeElement.textContent.replace(/\d+ minutes ago/, '1 hour ago');
                }
            } else if (currentTime.includes('hour')) {
                const hours = parseInt(currentTime);
                if (hours < 23) {
                    timeElement.textContent = timeElement.textContent.replace(hours, hours + 1);
                } else {
                    timeElement.textContent = timeElement.textContent.replace(/\d+ hours ago/, '1 day ago');
                }
            }
        });
    }

    createDownloadItems();
    
    // Update download times every minute
    setInterval(updateDownloadTimes, 60000);
}

// Smooth Scroll Function
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Check if targetId is just '#' (not a valid selector)
            if (targetId === '#') {
                return; // Skip this link
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Lazy Loading Function
function initLazyLoading() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px 100px 0px',
        threshold: 0
    };
    
    const lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    lazyObserver.unobserve(img);
                }
            }
        });
    }, observerOptions);
    
    // Apply lazy loading to images
    document.querySelectorAll('img[data-src]').forEach(img => {
        lazyObserver.observe(img);
    });
}

// Scroll Animations Function
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        animationObserver.observe(section);
    });
}

// Add some additional interactivity
window.addEventListener('load', function() {
    // Add a welcome message
    setTimeout(() => {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: rgba(0, 0, 235, 0.8);
            color: #fff;
            padding: 15px 25px;
            border-radius: 25px;
            font-weight: bold;
            z-index: 1000;
            animation: slideInRight 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), fadeOut 0.5s ease-in 3s forwards;
            box-shadow: 0 5px 15px rgba(26, 27, 27, 0.4);
            touch-action: manipulation;
        `;
        welcomeMessage.textContent = 'Welcome to Puzzle: Yarn Fun! 🧶🐱';
        
        document.body.appendChild(welcomeMessage);
        
        // Add CSS animation for the welcome message
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Remove welcome message from DOM after animation
        setTimeout(() => {
            if (welcomeMessage.parentNode) {
                welcomeMessage.parentNode.removeChild(welcomeMessage);
            }
        }, 4000);
    }, 1000);
    
    // Add parallax effect to the video background with throttling
    const parallaxEffect = throttle(function() {
        const scrolled = window.pageYOffset;
        const video = document.querySelector('.video-container video');
        
        if (video && scrolled < window.innerHeight) {
            // Use requestAnimationFrame for smoother animations
            requestAnimationFrame(() => {
                video.style.transform = `translateY(${scrolled * 0.5}px)`;
            });
        }
    }, 16); // ~60fps
    
    window.addEventListener('scroll', parallaxEffect);
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // If user presses space, scroll down
    if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    }
    
    // If user presses arrow keys, scroll accordingly
    if (e.code === 'ArrowUp') {
        window.scrollBy({ top: -window.innerHeight * 0.3, behavior: 'smooth' });
    } else if (e.code === 'ArrowDown') {
        window.scrollBy({ top: window.innerHeight * 0.3, behavior: 'smooth' });
    }
});

// Add hover effects to game cards and items
document.addEventListener('DOMContentLoaded', function() {
    // Update existing avatar placeholders with random images
    updateExistingAvatars();
    
    const gameCards = document.querySelectorAll('.game-card');
    const gameItems = document.querySelectorAll('.game-item');
    const planetItems = document.querySelectorAll('.planet-web-item');
    
    // Add interactive effect to planet web items
    planetItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Pause rotation on click
            this.closest('.planet-web').style.animationPlayState = 'paused';
            
            // Add highlight effect
            this.style.zIndex = '100';
            this.style.transform = 'scale(1.5) translateZ(300px)';
            this.style.boxShadow = '0 15px 35px rgba(117, 107, 255, 1)';
            
            // Resume rotation after 3 seconds
            setTimeout(() => {
                this.closest('.planet-web').style.animationPlayState = 'running';
                this.style.zIndex = '';
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 3000);
        });
    });
    
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    gameItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add loading animation
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
});