// DOM Elements
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn, .quick-add-btn');
const navItems = document.querySelectorAll('.nav-item');
const flashProducts = document.querySelectorAll('.flash-product');
const categoryItems = document.querySelectorAll('.category-item');
const storageOptions = document.querySelectorAll('.storage');
const colorOptions = document.querySelectorAll('.color');
const wishlistButtons = document.querySelectorAll('.wishlist-btn');
const newsletterForm = document.querySelector('.newsletter-form');
const trendingSearches = document.querySelectorAll('.trending-searches span');

// Shopping Cart State
let cart = [];
let cartItemCount = 0;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    startFlashSaleTimer();
    startCountdownTimer();
    animateOnScroll();
    initializeColorfulAnimations();
});

// Event Listeners
function initializeEventListeners() {
    // Search functionality
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Trending searches
    trendingSearches.forEach(search => {
        search.addEventListener('click', function() {
            searchInput.value = this.textContent;
            handleSearch();
        });
    });

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });

    // Navigation items
    navItems.forEach(nav => {
        nav.addEventListener('click', handleNavigation);
    });

    // Flash products hover effects
    flashProducts.forEach(product => {
        product.addEventListener('click', handleProductClick);
    });

    // Category items
    categoryItems.forEach(category => {
        category.addEventListener('click', handleCategoryClick);
    });

    // Storage options
    storageOptions.forEach(storage => {
        storage.addEventListener('click', handleStorageSelection);
    });

    // Color options
    colorOptions.forEach(color => {
        color.addEventListener('click', handleColorSelection);
    });

    // Wishlist buttons
    wishlistButtons.forEach(btn => {
        btn.addEventListener('click', handleWishlist);
    });

    // Newsletter subscription
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Cart icon
    cartIcon.addEventListener('click', handleCartClick);
}

// Search functionality with colorful feedback
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        showColorfulNotification('🔍 Please enter a search term', 'warning');
        return;
    }

    // Add loading animation
    searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    // Simulate search with colorful feedback
    setTimeout(() => {
        // Reset search button
        searchButton.innerHTML = '<i class="fas fa-search"></i>';
        
        // Show colorful search results
        showColorfulNotification(`🎉 Found amazing deals for "${searchTerm}"!`, 'success');
        
        // Animate search results
        animateSearchResults();
    }, 1500);
}

// Add to cart with colorful animations
function handleAddToCart(e) {
    e.preventDefault();
    const button = e.target;
    const productCard = button.closest('.flash-product, .iphone-card, .trending-card');
    
    // Create cart item
    const productName = productCard.querySelector('h4, .product-name')?.textContent || 'Product';
    const productPrice = productCard.querySelector('.sale-price, .current-price, .price')?.textContent || '₹999';
    
    const cartItem = {
        id: Date.now(),
        name: productName,
        price: productPrice,
        quantity: 1
    };
    
    cart.push(cartItem);
    cartItemCount++;
    updateCartCount();
    
    // Colorful button animation
    const originalText = button.textContent;
    const originalBackground = button.style.background;
    
    button.textContent = '✅ Added!';
    button.style.background = 'linear-gradient(135deg, #2ed573, #17c0eb)';
    button.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = originalBackground;
        button.style.transform = 'scale(1)';
    }, 2000);
    
    showColorfulNotification(`🛒 ${productName} added to cart!`, 'success');
    animateCartIcon();
    createFloatingIcon();
}

// Navigation with colorful highlights
function handleNavigation(e) {
    e.preventDefault();
    const navItem = e.currentTarget;
    
    // Remove active class from all nav items
    navItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked item
    navItem.classList.add('active');
    
    // Colorful feedback
    const category = navItem.querySelector('span').textContent;
    showColorfulNotification(`🎯 Browsing ${category} section`, 'info');
    
    // Animate content based on selection
    animateContentChange();
}

// Flash sale timer
function startFlashSaleTimer() {
    const timer = document.querySelector('.timer');
    if (!timer) return;
    
    let timeLeft = 2 * 60 * 60 + 45 * 60 + 30; // 2h 45m 30s
    
    const updateTimer = () => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        timer.textContent = `Ends in: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            timer.textContent = '🔥 SALE ENDED!';
            timer.style.background = '#ff4757';
        }
    };
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Countdown timer for hero section
function startCountdownTimer() {
    const timeUnits = document.querySelectorAll('.time-unit');
    if (timeUnits.length === 0) return;
    
    let totalSeconds = 23 * 3600 + 45 * 60 + 12; // 23h 45m 12s
    
    const updateCountdown = () => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        if (timeUnits[0]) timeUnits[0].querySelector('.number').textContent = hours;
        if (timeUnits[1]) timeUnits[1].querySelector('.number').textContent = minutes;
        if (timeUnits[2]) timeUnits[2].querySelector('.number').textContent = seconds;
        
        if (totalSeconds > 0) {
            totalSeconds--;
        }
    };
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Handle product clicks with colorful animations
function handleProductClick(e) {
    const product = e.currentTarget;
    const productName = product.querySelector('.product-name').textContent;
    
    // Add colorful click effect
    product.style.transform = 'scale(0.95)';
    setTimeout(() => {
        product.style.transform = 'scale(1)';
    }, 150);
    
    showColorfulNotification(`👀 Viewing ${productName}`, 'info');
}

// Category click handler with colorful transitions
function handleCategoryClick(e) {
    const category = e.currentTarget;
    const categoryName = category.querySelector('h3').textContent;
    
    // Add ripple effect
    createRippleEffect(category, e);
    
    showColorfulNotification(`🛍️ Exploring ${categoryName}`, 'success');
}

// Storage selection for iPhones
function handleStorageSelection(e) {
    const storage = e.target;
    const card = storage.closest('.iphone-card');
    
    // Remove active class from all storage options in this card
    card.querySelectorAll('.storage').forEach(s => s.classList.remove('active'));
    
    // Add active class to clicked storage
    storage.classList.add('active');
    
    // Update price based on storage (simulation)
    const priceElement = card.querySelector('.current-price');
    const basePrice = parseInt(priceElement.textContent.replace(/[^\d]/g, ''));
    const storageSize = storage.textContent;
    
    let newPrice = basePrice;
    if (storageSize.includes('512GB')) newPrice += 10000;
    if (storageSize.includes('1TB')) newPrice += 20000;
    
    priceElement.textContent = `₹${newPrice.toLocaleString()}`;
    
    showColorfulNotification(`📱 Selected ${storageSize} storage`, 'info');
}

// Color selection for iPhones
function handleColorSelection(e) {
    const color = e.target;
    const card = color.closest('.iphone-card');
    
    // Remove active class from all colors in this card
    card.querySelectorAll('.color').forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked color
    color.classList.add('active');
    
    // Add color selection animation
    color.style.transform = 'scale(1.3)';
    setTimeout(() => {
        color.style.transform = 'scale(1.2)';
    }, 200);
    
    showColorfulNotification(`🎨 Color selected!`, 'success');
}

// Wishlist functionality
function handleWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const btn = e.currentTarget;
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('fas')) {
        icon.classList.replace('fas', 'far');
        btn.style.color = '#666';
        showColorfulNotification('💔 Removed from wishlist', 'warning');
    } else {
        icon.classList.replace('far', 'fas');
        btn.style.color = '#ff4757';
        showColorfulNotification('❤️ Added to wishlist!', 'success');
    }
    
    // Heart animation
    btn.style.transform = 'scale(1.3)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 300);
}

// Newsletter subscription with validation
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (isValidEmail(email)) {
        const button = e.target.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = '📧 Subscribing...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = '✅ Subscribed!';
            emailInput.value = '';
            showColorfulNotification('🎉 Welcome to MegaMart family! Check your email for exclusive deals!', 'success');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 3000);
        }, 2000);
    } else {
        showColorfulNotification('❌ Please enter a valid email address', 'error');
        emailInput.style.borderColor = '#ff4757';
        setTimeout(() => {
            emailInput.style.borderColor = '';
        }, 2000);
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Cart click handler
function handleCartClick() {
    if (cart.length === 0) {
        showColorfulNotification('🛒 Your cart is empty. Start shopping!', 'info');
    } else {
        showColorfulNotification(`🛍️ You have ${cart.length} awesome item(s) in your cart!`, 'success');
        animateCartIcon();
    }
}

// Update cart count with animation
function updateCartCount() {
    cartCount.textContent = cartItemCount;
    
    // Animate cart count
    cartCount.style.transform = 'scale(1.5)';
    cartCount.style.background = '#2ed573';
    
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
        cartCount.style.background = '#ff4757';
    }, 300);
}

// Animate cart icon
function animateCartIcon() {
    cartIcon.style.animation = 'none';
    setTimeout(() => {
        cartIcon.style.animation = 'bounce 0.8s ease-in-out';
    }, 10);
}

// Create floating cart icon animation
function createFloatingIcon() {
    const floatingIcon = document.createElement('div');
    floatingIcon.innerHTML = '🛒';
    floatingIcon.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        font-size: 2rem;
        z-index: 10000;
        animation: floatToCart 1s ease-out forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(floatingIcon);
    
    setTimeout(() => {
        floatingIcon.remove();
    }, 1000);
}

// Show colorful notifications
function showColorfulNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.colorful-notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `colorful-notification notification-${type}`;
    notification.textContent = message;
    
    // Colorful gradient backgrounds
    const colors = {
        success: 'linear-gradient(135deg, #2ed573, #17c0eb, #667eea)',
        error: 'linear-gradient(135deg, #ff4757, #ff3838, #c44569)',
        warning: 'linear-gradient(135deg, #ffa502, #ff6348, #ff9ff3)',
        info: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)'
    };
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '15px',
        color: 'white',
        fontWeight: '700',
        fontSize: '1rem',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        maxWidth: '350px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
        background: colors[type] || colors.info,
        backdropFilter: 'blur(10px)'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1.05)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 200);
    
    // Auto remove with bounce out animation
    setTimeout(() => {
        notification.style.transform = 'translateX(100%) scale(0.8)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Create ripple effect
function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Animate search results
function animateSearchResults() {
    const allProducts = document.querySelectorAll('.flash-product, .trending-card, .iphone-card');
    allProducts.forEach((product, index) => {
        product.style.animation = `none`;
        setTimeout(() => {
            product.style.animation = `colorfulPop 0.6s ease-out ${index * 0.1}s both`;
        }, 100);
    });
}

// Animate content change
function animateContentChange() {
    const sections = document.querySelectorAll('.flash-sale, .categories-section, .iphone-section, .trending-section');
    sections.forEach((section, index) => {
        section.style.animation = `colorfulSlide 0.8s ease-out ${index * 0.2}s both`;
    });
}

// Initialize colorful animations on scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'colorfulSlideUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe colorful elements
    const animateElements = document.querySelectorAll(
        '.flash-product, .category-item, .iphone-card, .trending-card, .promo-banner'
    );
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

// Initialize colorful animations and effects
function initializeColorfulAnimations() {
    // Add hover effects to category items
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add floating animation to flash sale products
    flashProducts.forEach((product, index) => {
        product.style.animationDelay = `${index * 0.2}s`;
        product.classList.add('floating');
    });
    
    // Add colorful loading animation
    addColorfulLoadingCSS();
    
    // Add rainbow border animation to trending searches
    trendingSearches.forEach(search => {
        search.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(45deg, #667eea, #764ba2, #f093fb)';
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        search.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.2)';
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add colorful CSS animations
function addColorfulLoadingCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes colorfulPop {
            0% {
                opacity: 0;
                transform: scale(0.8) translateY(20px);
            }
            50% {
                transform: scale(1.05) translateY(-5px);
            }
            100% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        @keyframes colorfulSlide {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes colorfulSlideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes bounce {
            0%, 20%, 60%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-15px);
            }
            80% {
                transform: translateY(-8px);
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes floatToCart {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(200px, -200px) scale(0.5);
                opacity: 0;
            }
        }
        
        @keyframes floating {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-5px);
            }
        }
        
        .floating {
            animation: floating 3s ease-in-out infinite;
        }
        
        .colorful-notification {
            animation: colorfulNotificationSlide 0.3s ease-out;
        }
        
        @keyframes colorfulNotificationSlide {
            from {
                transform: translateX(100%) scale(0.8);
                opacity: 0;
            }
            to {
                transform: translateX(0) scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add some fun interactive elements
document.addEventListener('click', function(e) {
    // Create colorful click effects
    const clickEffect = document.createElement('div');
    clickEffect.style.cssText = `
        position: fixed;
        left: ${e.clientX - 10}px;
        top: ${e.clientY - 10}px;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #667eea, #764ba2, #f093fb);
        border-radius: 50%;
        animation: clickPop 0.5s ease-out forwards;
        pointer-events: none;
        z-index: 9999;
    `;
    
    document.body.appendChild(clickEffect);
    
    setTimeout(() => {
        clickEffect.remove();
    }, 500);
});

// Add click pop animation
const clickPopStyle = document.createElement('style');
clickPopStyle.textContent = `
    @keyframes clickPop {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(clickPopStyle);

console.log('🌈 MegaMart initialized with colorful Daraz/Temu style! Ready to boost your LinkedIn profile! 🚀');