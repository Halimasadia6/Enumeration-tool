// DOM Elements
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const cartButton = document.querySelector('.cart');
const cartCount = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const filterTabs = document.querySelectorAll('.tab');
const productCards = document.querySelectorAll('.product-card');
const newsletterForm = document.querySelector('.newsletter-form');
const categoryCards = document.querySelectorAll('.category-card');
const actionButtons = document.querySelectorAll('.action-btn');

// Shopping Cart State
let cart = [];
let cartItemCount = 3; // Initial cart count

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    animateOnScroll();
    typeWriterEffect();
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

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });

    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', handleFilter);
    });

    // Newsletter subscription
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Category cards
    categoryCards.forEach(card => {
        card.addEventListener('click', handleCategoryClick);
    });

    // Action buttons (heart and eye icons)
    actionButtons.forEach(button => {
        button.addEventListener('click', handleActionButton);
    });

    // Cart button
    cartButton.addEventListener('click', handleCartClick);

    // Smooth scrolling for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            document.querySelector('.products').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}

// Search functionality
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        showNotification('Please enter a search term', 'warning');
        return;
    }

    // Add loading animation
    searchButton.innerHTML = '<div class="loading"></div>';
    
    // Simulate search delay
    setTimeout(() => {
        const products = document.querySelectorAll('.product-card');
        let foundProducts = 0;

        products.forEach(product => {
            const title = product.querySelector('h3').textContent.toLowerCase();
            const isVisible = title.includes(searchTerm);
            
            product.style.display = isVisible ? 'block' : 'none';
            if (isVisible) foundProducts++;
        });

        // Reset search button
        searchButton.innerHTML = '<i class="fas fa-search"></i>';
        
        if (foundProducts === 0) {
            showNotification(`No products found for "${searchTerm}"`, 'info');
        } else {
            showNotification(`Found ${foundProducts} product(s) for "${searchTerm}"`, 'success');
            document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
        }
    }, 1000);
}

// Add to cart functionality
function handleAddToCart(e) {
    e.preventDefault();
    const button = e.target;
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('.current-price').textContent;
    
    // Create cart item
    const cartItem = {
        id: Date.now(),
        name: productName,
        price: productPrice,
        quantity: 1
    };
    
    cart.push(cartItem);
    cartItemCount++;
    updateCartCount();
    
    // Button animation
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.style.background = 'linear-gradient(135deg, #2ed573 0%, #17c0eb 100%)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }, 1500);
    
    showNotification(`${productName} added to cart!`, 'success');
    animateCartIcon();
}

// Filter products
function handleFilter(e) {
    const filter = e.target.textContent.toLowerCase();
    
    // Update active tab
    filterTabs.forEach(tab => tab.classList.remove('active'));
    e.target.classList.add('active');
    
    // Filter products
    productCards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'block';
        } else {
            const category = getProductCategory(card);
            card.style.display = category.includes(filter) ? 'block' : 'none';
        }
    });
    
    // Animate filtered products
    setTimeout(() => {
        const visibleCards = document.querySelectorAll('.product-card[style="display: block;"], .product-card:not([style])');
        visibleCards.forEach((card, index) => {
            card.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s both`;
        });
    }, 100);
}

// Get product category based on content
function getProductCategory(card) {
    const title = card.querySelector('h3').textContent.toLowerCase();
    
    if (title.includes('headphones') || title.includes('smartphone') || title.includes('coffee maker') || title.includes('watch')) {
        return 'electronics';
    } else if (title.includes('shoes') || title.includes('backpack')) {
        return 'fashion';
    } else {
        return 'home';
    }
}

// Newsletter subscription
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (isValidEmail(email)) {
        const button = e.target.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Subscribed!';
            emailInput.value = '';
            showNotification('Successfully subscribed to newsletter!', 'success');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        }, 1500);
    } else {
        showNotification('Please enter a valid email address', 'error');
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Category click handler
function handleCategoryClick(e) {
    const category = e.currentTarget.querySelector('h3').textContent.toLowerCase();
    
    // Update filter tabs
    filterTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.textContent.toLowerCase() === category) {
            tab.classList.add('active');
        }
    });
    
    // Filter products
    handleFilter({ target: { textContent: category } });
    
    // Scroll to products
    document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
}

// Action button handler (heart and eye icons)
function handleActionButton(e) {
    e.preventDefault();
    const icon = e.target.closest('.action-btn').querySelector('i');
    
    if (icon.classList.contains('fa-heart')) {
        // Toggle wishlist
        if (icon.classList.contains('fas')) {
            icon.classList.replace('fas', 'far');
            showNotification('Removed from wishlist', 'info');
        } else {
            icon.classList.replace('far', 'fas');
            showNotification('Added to wishlist!', 'success');
        }
    } else if (icon.classList.contains('fa-eye')) {
        // Quick view
        showNotification('Quick view feature coming soon!', 'info');
    }
}

// Cart click handler
function handleCartClick() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'info');
    } else {
        showNotification(`You have ${cart.length} item(s) in your cart`, 'info');
    }
}

// Update cart count
function updateCartCount() {
    cartCount.textContent = cartItemCount;
}

// Animate cart icon
function animateCartIcon() {
    cartButton.style.animation = 'none';
    setTimeout(() => {
        cartButton.style.animation = 'bounce 0.6s ease-in-out';
    }, 10);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles for notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '600',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
    });
    
    // Set background color based on type
    const colors = {
        success: 'linear-gradient(135deg, #2ed573, #17c0eb)',
        error: 'linear-gradient(135deg, #ff4757, #ff3838)',
        warning: 'linear-gradient(135deg, #ffa502, #ff6348)',
        info: 'linear-gradient(135deg, #667eea, #764ba2)'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Animate elements on scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.product-card, .category-card, .newsletter-content');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

// Typewriter effect for hero title
function typeWriterEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid white';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        heroTitle.textContent = text.slice(0, i + 1);
        i++;
        
        if (i === text.length) {
            clearInterval(typeInterval);
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    }, 100);
}

// Add bounce animation for cart
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounce {
        0%, 20%, 60%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        80% {
            transform: translateY(-5px);
        }
    }
`;
document.head.appendChild(bounceStyle);

// Smooth page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Performance optimization - lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Add loading overlay
function showLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading amazing products...</p>
        </div>
    `;
    
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '9999',
        backdropFilter: 'blur(5px)'
    });
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s ease';
        setTimeout(() => overlay.remove(), 500);
    }, 2000);
}

// Show loading on page load
window.addEventListener('load', () => {
    setTimeout(showLoadingOverlay, 500);
});

console.log('🛍️ EliteShop initialized successfully! Ready for LinkedIn showcase! 🚀');