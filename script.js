// DOM Elements
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
const wishlistIcon = document.querySelector('.wishlist-icon');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn, .quick-add-btn');
const navItems = document.querySelectorAll('.nav-item');
const categoryCards = document.querySelectorAll('.category-card');
const wishlistButtons = document.querySelectorAll('.wishlist-btn');
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const newsletterForm = document.querySelector('.newsletter-form');
const trendingKeywords = document.querySelectorAll('.keyword');
const loadMoreBtn = document.querySelector('.load-more-btn');

// Global State
let cart = [];
let wishlist = [];
let cartItemCount = 0;
let wishlistCount = 3; // Initial wishlist count
let currentFilter = 'all';

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    startCountdownTimers();
    startFlashTimer();
    initializeAnimations();
    updateCartDisplay();
    updateWishlistDisplay();
});

// Event Listeners
function initializeEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Trending keywords
    trendingKeywords.forEach(keyword => {
        keyword.addEventListener('click', function() {
            searchInput.value = this.textContent.trim();
            handleSearch();
        });
    });

    // Navigation items
    navItems.forEach(nav => {
        nav.addEventListener('click', handleNavigation);
    });

    // Category cards
    categoryCards.forEach(category => {
        category.addEventListener('click', handleCategoryClick);
    });

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });

    // Wishlist functionality
    wishlistButtons.forEach(btn => {
        btn.addEventListener('click', handleWishlist);
    });

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });

    // Newsletter subscription
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Cart and wishlist icons
    cartIcon.addEventListener('click', handleCartClick);
    wishlistIcon.addEventListener('click', handleWishlistClick);

    // Load more products
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', handleLoadMore);
    }

    // Global click effects
    document.addEventListener('click', createClickEffect);
}

// Search functionality
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        showNotification('🔍 Please enter a search term', 'warning');
        return;
    }

    // Add loading animation
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    // Simulate search process
    setTimeout(() => {
        // Reset search button
        searchBtn.innerHTML = '<i class="fas fa-search"></i>';
        
        // Show search results
        showNotification(`🎉 Found amazing deals for "${searchTerm}"!`, 'success');
        
        // Animate product cards
        animateSearchResults();
        
        // Filter products based on search term (simple simulation)
        filterProductsBySearch(searchTerm);
    }, 1500);
}

// Navigation handler
function handleNavigation(e) {
    e.preventDefault();
    const navItem = e.currentTarget;
    
    // Remove active class from all nav items
    navItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked item
    navItem.classList.add('active');
    
    // Get category name
    const categoryName = navItem.querySelector('span').textContent;
    
    // Show navigation feedback
    showNotification(`🎯 Browsing ${categoryName} section`, 'info');
    
    // Animate page content
    animatePageTransition();
}

// Category click handler
function handleCategoryClick(e) {
    const category = e.currentTarget;
    const categoryName = category.querySelector('h3').textContent;
    
    // Add ripple effect
    createRippleEffect(category, e);
    
    // Show category feedback
    showNotification(`🛍️ Exploring ${categoryName} category`, 'success');
    
    // Simulate category filtering
    setTimeout(() => {
        filterProductsByCategory(categoryName.toLowerCase());
    }, 300);
}

// Add to cart functionality
function handleAddToCart(e) {
    e.preventDefault();
    const button = e.target;
    const productCard = button.closest('.deal-card, .product-card');
    
    if (!productCard) return;

    // Get product details
    const productName = productCard.querySelector('h4')?.textContent || 'Product';
    const priceElement = productCard.querySelector('.current-price');
    const productPrice = priceElement ? priceElement.textContent : '$99.99';
    const productImage = productCard.querySelector('img')?.src || '';

    // Create cart item
    const cartItem = {
        id: Date.now(),
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
    };

    // Add to cart
    cart.push(cartItem);
    cartItemCount++;
    updateCartDisplay();

    // Button animation
    const originalText = button.textContent;
    const originalBackground = button.style.background;
    
    button.textContent = '✅ Added!';
    button.style.background = 'linear-gradient(135deg, #2ed573, #17c0eb)';
    button.style.transform = 'scale(1.05)';
    button.disabled = true;

    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = originalBackground;
        button.style.transform = 'scale(1)';
        button.disabled = false;
    }, 2000);

    // Show success notification
    showNotification(`🛒 ${productName} added to cart!`, 'success');
    
    // Animate cart icon
    animateCartIcon();
    
    // Create floating animation
    createFloatingCartIcon(button);
}

// Wishlist functionality
function handleWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const btn = e.currentTarget;
    const icon = btn.querySelector('i');
    const productCard = btn.closest('.product-card');
    const productName = productCard?.querySelector('h4')?.textContent || 'Product';

    if (icon.classList.contains('fas')) {
        // Remove from wishlist
        icon.classList.replace('fas', 'far');
        btn.style.color = '#666';
        wishlistCount = Math.max(0, wishlistCount - 1);
        showNotification(`💔 ${productName} removed from wishlist`, 'warning');
    } else {
        // Add to wishlist
        icon.classList.replace('far', 'fas');
        btn.style.color = '#ff6b6b';
        wishlistCount++;
        showNotification(`❤️ ${productName} added to wishlist!`, 'success');
    }

    // Update wishlist display
    updateWishlistDisplay();
    
    // Heart animation
    btn.style.transform = 'scale(1.3)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 300);
}

// Filter functionality
function handleFilter(e) {
    const button = e.target;
    const filter = button.dataset.filter;
    
    // Update active filter
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    currentFilter = filter;
    
    // Filter products
    filterProducts(filter);
    
    // Show filter feedback
    const filterName = filter === 'all' ? 'All Products' : filter.charAt(0).toUpperCase() + filter.slice(1);
    showNotification(`🎯 Showing ${filterName}`, 'info');
}

// Newsletter submission
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const submitButton = e.target.querySelector('button');
    const email = emailInput.value;

    if (!isValidEmail(email)) {
        showNotification('❌ Please enter a valid email address', 'error');
        emailInput.style.borderColor = '#ff6b6b';
        setTimeout(() => {
            emailInput.style.borderColor = '';
        }, 2000);
        return;
    }

    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = '📧 Subscribing...';
    submitButton.disabled = true;

    setTimeout(() => {
        submitButton.textContent = '✅ Subscribed!';
        emailInput.value = '';
        showNotification('🎉 Welcome to TemuMart family! Check your email for exclusive deals!', 'success');
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 3000);
    }, 2000);
}

// Cart click handler
function handleCartClick() {
    if (cart.length === 0) {
        showNotification('🛒 Your cart is empty. Start shopping for amazing deals!', 'info');
    } else {
        showNotification(`🛍️ You have ${cart.length} awesome item(s) in your cart! Total value: ${calculateCartTotal()}`, 'success');
        animateCartIcon();
    }
}

// Wishlist click handler
function handleWishlistClick() {
    if (wishlistCount === 0) {
        showNotification('💝 Your wishlist is empty. Add some products you love!', 'info');
    } else {
        showNotification(`❤️ You have ${wishlistCount} item(s) in your wishlist!`, 'success');
    }
}

// Load more products
function handleLoadMore() {
    const button = loadMoreBtn;
    const originalText = button.textContent;
    
    button.textContent = 'Loading...';
    button.disabled = true;
    
    // Simulate loading
    setTimeout(() => {
        // Create new product cards (simulation)
        const productsGrid = document.querySelector('.products-grid');
        const newProducts = createNewProductCards();
        
        newProducts.forEach(product => {
            productsGrid.appendChild(product);
            // Animate new products
            setTimeout(() => {
                product.style.animation = 'colorfulPop 0.6s ease-out forwards';
            }, 100);
        });
        
        button.textContent = originalText;
        button.disabled = false;
        
        showNotification('🎉 More amazing products loaded!', 'success');
    }, 1500);
}

// Countdown timers
function startCountdownTimers() {
    // Hero countdown timer
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    
    if (hours && minutes && seconds) {
        let totalSeconds = 23 * 3600 + 45 * 60 + 30; // 23h 45m 30s
        
        const updateHeroTimer = () => {
            const h = Math.floor(totalSeconds / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            const s = totalSeconds % 60;
            
            hours.textContent = h.toString().padStart(2, '0');
            minutes.textContent = m.toString().padStart(2, '0');
            seconds.textContent = s.toString().padStart(2, '0');
            
            if (totalSeconds > 0) {
                totalSeconds--;
            } else {
                showNotification('🎉 Flash Sale Started! New deals available!', 'success');
                totalSeconds = 24 * 3600; // Reset to 24 hours
            }
        };
        
        updateHeroTimer();
        setInterval(updateHeroTimer, 1000);
    }
}

// Flash sale timer
function startFlashTimer() {
    const flashTimer = document.getElementById('flash-timer');
    
    if (flashTimer) {
        let timeLeft = 2 * 60 * 60 + 45 * 60 + 30; // 2h 45m 30s
        
        const updateFlashTimer = () => {
            const hours = Math.floor(timeLeft / 3600);
            const minutes = Math.floor((timeLeft % 3600) / 60);
            const seconds = timeLeft % 60;
            
            flashTimer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft > 0) {
                timeLeft--;
            } else {
                flashTimer.textContent = '🔥 SALE ENDED!';
                flashTimer.style.background = '#ff4757';
                showNotification('⚡ Flash Sale Ended! Check out our new deals!', 'info');
            }
        };
        
        updateFlashTimer();
        setInterval(updateFlashTimer, 1000);
    }
}

// Utility Functions
function updateCartDisplay() {
    cartCount.textContent = cartItemCount;
    
    // Animate cart count
    cartCount.style.transform = 'scale(1.3)';
    cartCount.style.background = '#2ed573';
    
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
        cartCount.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a52)';
    }, 300);
}

function updateWishlistDisplay() {
    const wishlistBadge = wishlistIcon.querySelector('.badge');
    if (wishlistBadge) {
        wishlistBadge.textContent = wishlistCount;
        
        // Animate wishlist count
        wishlistBadge.style.transform = 'scale(1.3)';
        setTimeout(() => {
            wishlistBadge.style.transform = 'scale(1)';
        }, 300);
    }
}

function calculateCartTotal() {
    const total = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
        return sum + (price * item.quantity);
    }, 0);
    return `$${total.toFixed(2)}`;
}

function animateCartIcon() {
    cartIcon.style.animation = 'none';
    setTimeout(() => {
        cartIcon.style.animation = 'bounce 0.8s ease-in-out';
    }, 10);
}

function createFloatingCartIcon(sourceElement) {
    const rect = sourceElement.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();
    
    const floatingIcon = document.createElement('div');
    floatingIcon.innerHTML = '🛒';
    floatingIcon.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        font-size: 2rem;
        z-index: 10000;
        pointer-events: none;
        transition: all 1s ease-out;
    `;
    
    document.body.appendChild(floatingIcon);
    
    // Animate to cart
    setTimeout(() => {
        floatingIcon.style.left = `${cartRect.left + cartRect.width / 2}px`;
        floatingIcon.style.top = `${cartRect.top + cartRect.height / 2}px`;
        floatingIcon.style.transform = 'scale(0.5)';
        floatingIcon.style.opacity = '0';
    }, 100);
    
    setTimeout(() => {
        floatingIcon.remove();
    }, 1100);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.temu-notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `temu-notification notification-${type}`;
    notification.textContent = message;
    
    // Colorful gradient backgrounds based on type
    const colors = {
        success: 'linear-gradient(135deg, #2ed573, #17c0eb, #667eea)',
        error: 'linear-gradient(135deg, #ff6b6b, #ff3838, #c44569)',
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
        transition: 'all 0.4s ease',
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
    }, 300);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%) scale(0.8)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    }, 4000);
}

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

function createClickEffect(e) {
    // Skip if clicking on input elements or buttons
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        return;
    }
    
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
}

function animateSearchResults() {
    const allProducts = document.querySelectorAll('.deal-card, .product-card');
    allProducts.forEach((product, index) => {
        product.style.animation = 'none';
        setTimeout(() => {
            product.style.animation = `colorfulPop 0.6s ease-out ${index * 0.1}s both`;
        }, 100);
    });
}

function animatePageTransition() {
    const sections = document.querySelectorAll('.flash-deals, .categories-section, .trending-section, .promo-banners');
    sections.forEach((section, index) => {
        section.style.animation = `colorfulSlide 0.8s ease-out ${index * 0.2}s both`;
    });
}

function filterProducts(filter) {
    productCards.forEach(card => {
        const category = card.dataset.category;
        
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.animation = 'colorfulPop 0.6s ease-out forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterProductsBySearch(searchTerm) {
    const allProducts = document.querySelectorAll('.deal-card, .product-card');
    let visibleCount = 0;
    
    allProducts.forEach(product => {
        const productName = product.querySelector('h4')?.textContent.toLowerCase() || '';
        
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
            product.style.animation = 'colorfulPop 0.6s ease-out forwards';
            visibleCount++;
        } else {
            product.style.display = 'none';
        }
    });
    
    if (visibleCount === 0) {
        showNotification('😅 No products found. Try a different search term!', 'warning');
    }
}

function filterProductsByCategory(categoryName) {
    const allProducts = document.querySelectorAll('.deal-card, .product-card');
    
    allProducts.forEach((product, index) => {
        // Simple category simulation - in real app this would be based on actual data
        const shouldShow = Math.random() > 0.3; // Random simulation
        
        if (shouldShow) {
            product.style.display = 'block';
            setTimeout(() => {
                product.style.animation = `colorfulPop 0.6s ease-out forwards`;
            }, index * 100);
        } else {
            product.style.display = 'none';
        }
    });
}

function createNewProductCards() {
    const newProducts = [];
    const productNames = [
        'Smart Bluetooth Speaker',
        'Wireless Gaming Controller',
        'USB-C Fast Charger',
        'Bluetooth Fitness Tracker',
        'Portable Power Bank'
    ];
    
    const prices = ['$29.99', '$39.99', '$19.99', '$49.99', '$24.99'];
    const originalPrices = ['$79.99', '$89.99', '$49.99', '$99.99', '$59.99'];
    
    for (let i = 0; i < 3; i++) {
        const product = document.createElement('div');
        product.className = 'product-card';
        product.dataset.category = 'electronics';
        
        product.innerHTML = `
            <div class="product-badge hot">NEW</div>
            <div class="wishlist-btn">
                <i class="far fa-heart"></i>
            </div>
            <img src="https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=250&h=250&fit=crop" alt="${productNames[i]}">
            <div class="product-content">
                <h4>${productNames[i]}</h4>
                <div class="rating">
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>
                    <span class="rating-count">(${Math.floor(Math.random() * 1000) + 100})</span>
                </div>
                <div class="price-section">
                    <span class="current-price">${prices[i]}</span>
                    <span class="original-price">${originalPrices[i]}</span>
                    <span class="discount">-${Math.floor(Math.random() * 30) + 40}%</span>
                </div>
                <div class="shipping-info">
                    <i class="fas fa-shipping-fast"></i>
                    <span>Free Shipping</span>
                </div>
                <button class="quick-add-btn">Quick Add</button>
            </div>
        `;
        
        // Add event listeners to new elements
        const addToCartBtn = product.querySelector('.quick-add-btn');
        const wishlistBtn = product.querySelector('.wishlist-btn');
        
        addToCartBtn.addEventListener('click', handleAddToCart);
        wishlistBtn.addEventListener('click', handleWishlist);
        
        newProducts.push(product);
    }
    
    return newProducts;
}

function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll(
        '.deal-card, .category-card, .product-card, .promo-banner'
    );
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
    
    // Add hover effects to category cards
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add floating animation to trending keywords
    trendingKeywords.forEach((keyword, index) => {
        keyword.style.animationDelay = `${index * 0.2}s`;
        keyword.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(45deg, #667eea, #764ba2, #f093fb)';
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        keyword.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add CSS animations dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
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
        
        .floating {
            animation: floating 3s ease-in-out infinite;
        }
        
        @keyframes floating {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles();

// Console welcome message
console.log('🌈 TemuMart loaded successfully! Shop like a billionaire! 🚀');

// Add some easter eggs for fun
let clickCount = 0;
document.addEventListener('click', function() {
    clickCount++;
    if (clickCount === 50) {
        showNotification('🎉 Wow! You\'re really exploring our site! Here\'s a special 90% OFF code: EXPLORER90', 'success');
    } else if (clickCount === 100) {
        showNotification('🏆 Ultimate Explorer! You get FREE SHIPPING for life! Code: FREESHIPLIFE', 'success');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'S' to focus search
    if (e.key.toLowerCase() === 's' && !e.ctrlKey && !e.metaKey) {
        if (document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
            showNotification('🔍 Search activated! Type away!', 'info');
        }
    }
    
    // Press 'C' to show cart
    if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey) {
        if (document.activeElement !== searchInput) {
            e.preventDefault();
            handleCartClick();
        }
    }
    
    // Press 'W' to show wishlist
    if (e.key.toLowerCase() === 'w' && !e.ctrlKey && !e.metaKey) {
        if (document.activeElement !== searchInput) {
            e.preventDefault();
            handleWishlistClick();
        }
    }
});