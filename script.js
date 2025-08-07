// DOM Elements
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const closeCart = document.querySelector('.close-cart');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const quickViewButtons = document.querySelectorAll('.quick-view-btn');
const colorOptions = document.querySelectorAll('.color-option');
const storageOptions = document.querySelectorAll('.storage-option');
const navLinks = document.querySelectorAll('.nav-link');
const categoryCards = document.querySelectorAll('.category-card');
const newsletterForm = document.querySelector('.newsletter-form');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

// Global State
let cart = JSON.parse(localStorage.getItem('techvault-cart')) || [];
let selectedColors = {};
let selectedStorage = {};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeProductCustomization();
    initializeScrollAnimations();
    updateCartDisplay();
    initializeHeader();
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

    // Cart functionality
    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartModal);
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });

    // Add to cart buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });

    // Quick view buttons
    quickViewButtons.forEach(button => {
        button.addEventListener('click', handleQuickView);
    });

    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Category cards
    categoryCards.forEach(card => {
        card.addEventListener('click', handleCategoryClick);
    });

    // Newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Color and storage options
    colorOptions.forEach(option => {
        option.addEventListener('click', handleColorSelection);
    });

    storageOptions.forEach(option => {
        option.addEventListener('click', handleStorageSelection);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Header scroll effect
function initializeHeader() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
    });
}

// Search functionality
function handleSearch() {
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm === '') {
        showNotification('Please enter a search term', 'warning');
        return;
    }

    // Add loading state
    searchBtn.classList.add('loading');
    searchBtn.disabled = true;

    // Simulate search
    setTimeout(() => {
        searchBtn.classList.remove('loading');
        searchBtn.disabled = false;
        
        // Filter products
        const products = document.querySelectorAll('.product-card');
        let foundProducts = 0;

        products.forEach(product => {
            const productName = product.querySelector('.product-name').textContent.toLowerCase();
            const productDescription = product.querySelector('.product-description').textContent.toLowerCase();
            
            if (productName.includes(searchTerm.toLowerCase()) || 
                productDescription.includes(searchTerm.toLowerCase())) {
                product.style.display = 'block';
                product.classList.add('fade-in');
                foundProducts++;
            } else {
                product.style.display = 'none';
            }
        });

        if (foundProducts > 0) {
            showNotification(`Found ${foundProducts} products for "${searchTerm}"`, 'success');
        } else {
            showNotification(`No products found for "${searchTerm}"`, 'error');
            // Reset products display
            products.forEach(product => {
                product.style.display = 'block';
            });
        }
    }, 800);
}

// Product customization
function initializeProductCustomization() {
    // Initialize default selections
    document.querySelectorAll('.product-card').forEach((card, index) => {
        const productId = `product-${index}`;
        
        // Set default color
        const firstColor = card.querySelector('.color-option');
        if (firstColor) {
            firstColor.classList.add('active');
            selectedColors[productId] = firstColor.dataset.color;
        }
        
        // Set default storage
        const firstStorage = card.querySelector('.storage-option');
        if (firstStorage) {
            firstStorage.classList.add('active');
            selectedStorage[productId] = firstStorage.dataset.storage;
        }
    });
}

// Color selection
function handleColorSelection(e) {
    const colorOption = e.target;
    const productCard = colorOption.closest('.product-card');
    const productId = Array.from(document.querySelectorAll('.product-card')).indexOf(productCard);
    const productKey = `product-${productId}`;

    // Remove active class from all colors in this product
    productCard.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
    });

    // Add active class to selected color
    colorOption.classList.add('active');
    selectedColors[productKey] = colorOption.dataset.color;

    // Add visual feedback
    colorOption.style.transform = 'scale(1.3)';
    setTimeout(() => {
        colorOption.style.transform = 'scale(1.2)';
    }, 150);

    showNotification(`Selected ${colorOption.dataset.color} color`, 'info');
}

// Storage selection
function handleStorageSelection(e) {
    const storageOption = e.target;
    const productCard = storageOption.closest('.product-card');
    const productId = Array.from(document.querySelectorAll('.product-card')).indexOf(productCard);
    const productKey = `product-${productId}`;

    // Remove active class from all storage options in this product
    productCard.querySelectorAll('.storage-option').forEach(option => {
        option.classList.remove('active');
    });

    // Add active class to selected storage
    storageOption.classList.add('active');
    selectedStorage[productKey] = storageOption.dataset.storage;

    // Update price based on storage (simulation)
    updatePriceForStorage(productCard, storageOption.dataset.storage);

    showNotification(`Selected ${storageOption.dataset.storage} storage`, 'info');
}

// Update price based on storage
function updatePriceForStorage(productCard, storage) {
    const priceElement = productCard.querySelector('.current-price');
    const originalPrice = parseInt(priceElement.textContent.replace(/[^\d]/g, ''));
    
    let newPrice = originalPrice;
    if (storage === '256GB') newPrice += 100;
    if (storage === '512GB') newPrice += 200;
    if (storage === '1TB') newPrice += 400;

    // Animate price change
    priceElement.style.transform = 'scale(1.1)';
    priceElement.style.color = '#ef4444';
    
    setTimeout(() => {
        priceElement.textContent = `$${newPrice}`;
        priceElement.style.transform = 'scale(1)';
        priceElement.style.color = '#2563eb';
    }, 200);
}

// Add to cart functionality
function handleAddToCart(e) {
    e.preventDefault();
    const button = e.target;
    const productCard = button.closest('.product-card');
    const productId = Array.from(document.querySelectorAll('.product-card')).indexOf(productCard);
    const productKey = `product-${productId}`;

    // Get product details
    const productName = productCard.querySelector('.product-name').textContent;
    const productPrice = productCard.querySelector('.current-price').textContent;
    const productImage = productCard.querySelector('.product-image img').src;
    const selectedColor = selectedColors[productKey] || 'Default';
    const selectedStorageOption = selectedStorage[productKey] || 'Default';

    // Create cart item
    const cartItem = {
        id: Date.now(),
        name: productName,
        price: productPrice,
        image: productImage,
        color: selectedColor,
        storage: selectedStorageOption,
        quantity: 1
    };

    // Add to cart
    cart.push(cartItem);
    saveCartToStorage();
    updateCartDisplay();

    // Button animation
    const originalText = button.textContent;
    const originalBackground = button.style.background;
    
    button.textContent = '✓ Added!';
    button.style.background = '#10b981';
    button.classList.add('loading');
    button.disabled = true;

    // Create floating animation
    createFloatingIcon(button);

    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = originalBackground;
        button.classList.remove('loading');
        button.disabled = false;
    }, 2000);

    showNotification(`${productName} added to cart!`, 'success');
    animateCartIcon();
}

// Quick view functionality
function handleQuickView(e) {
    e.preventDefault();
    const button = e.target;
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.product-name').textContent;

    // Add pulse effect
    button.style.transform = 'scale(1.1)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);

    showNotification(`Quick view for ${productName}`, 'info');
}

// Navigation
function handleNavigation(e) {
    e.preventDefault();
    const link = e.target;

    // Remove active class from all links
    navLinks.forEach(navLink => {
        navLink.classList.remove('active');
    });

    // Add active class to clicked link
    link.classList.add('active');

    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Category click
function handleCategoryClick(e) {
    const categoryCard = e.currentTarget;
    const categoryName = categoryCard.querySelector('h3').textContent;

    // Add click effect
    categoryCard.style.transform = 'translateY(-15px) scale(1.05)';
    setTimeout(() => {
        categoryCard.style.transform = 'translateY(0) scale(1)';
    }, 300);

    showNotification(`Browsing ${categoryName} category`, 'info');

    // Scroll to products section
    const targetSection = categoryName.toLowerCase().includes('iphone') ? '#iphones' : '#accessories';
    const targetElement = document.querySelector(targetSection);
    if (targetElement) {
        setTimeout(() => {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    }
}

// Newsletter submission
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const submitButton = e.target.querySelector('button[type="submit"]');
    const email = emailInput.value;

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        emailInput.style.borderColor = '#ef4444';
        setTimeout(() => {
            emailInput.style.borderColor = '';
        }, 2000);
        return;
    }

    // Show loading
    const originalText = submitButton.textContent;
    submitButton.classList.add('loading');
    submitButton.disabled = true;

    setTimeout(() => {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        emailInput.value = '';
        showNotification('Successfully subscribed to newsletter!', 'success');
    }, 1500);
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Cart functionality
function openCart() {
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateCartDisplay();
}

function closeCartModal() {
    cartModal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateCartDisplay() {
    // Update cart count
    cartCount.textContent = cart.length;
    
    // Animate cart count
    if (cart.length > 0) {
        cartCount.style.transform = 'scale(1.3)';
        cartCount.style.background = '#10b981';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
            cartCount.style.background = '#ef4444';
        }, 300);
    }

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
    } else {
        displayCartItems();
        updateCartTotal();
    }
}

function displayCartItems() {
    cartItems.innerHTML = '';
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid #e2e8f0;">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 0.25rem 0; font-size: 0.9rem;">${item.name}</h4>
                    <p style="margin: 0; font-size: 0.8rem; color: #64748b;">
                        ${item.color} • ${item.storage}
                    </p>
                    <p style="margin: 0.25rem 0 0 0; font-weight: 600; color: #2563eb;">${item.price}</p>
                </div>
                <button onclick="removeFromCart(${index})" style="background: #ef4444; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToStorage();
    updateCartDisplay();
    showNotification('Item removed from cart', 'info');
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
        return sum + price;
    }, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function saveCartToStorage() {
    localStorage.setItem('techvault-cart', JSON.stringify(cart));
}

// Animations
function animateCartIcon() {
    cartIcon.style.animation = 'none';
    setTimeout(() => {
        cartIcon.style.animation = 'bounce 0.6s ease';
    }, 10);
}

function createFloatingIcon(sourceElement) {
    const rect = sourceElement.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();
    
    const floatingIcon = document.createElement('div');
    floatingIcon.innerHTML = '🛒';
    floatingIcon.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        font-size: 1.5rem;
        z-index: 10000;
        pointer-events: none;
        transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        opacity: 1;
    `;
    
    document.body.appendChild(floatingIcon);
    
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

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.product-card, .category-card, .feature-card');
    animateElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Notifications
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#2563eb'
    };

    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: colors[type] || colors.info,
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        fontSize: '0.9rem',
        fontWeight: '600',
        zIndex: '10001',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        maxWidth: '300px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)'
    });

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

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize product hover effects
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Initialize category card hover effects
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'S' to focus search
    if (e.key.toLowerCase() === 's' && !e.ctrlKey && !e.metaKey && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        searchInput.focus();
        showNotification('Search activated', 'info');
    }
    
    // Press 'C' to open cart
    if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        openCart();
    }
    
    // Press 'Escape' to close cart
    if (e.key === 'Escape') {
        closeCartModal();
    }
});

// Add loading animation CSS
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
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
    
    .notification {
        animation: slideInRight 0.3s ease;
    }
    
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
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .loading {
        position: relative;
        color: transparent !important;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 16px;
        margin: -8px 0 0 -8px;
        border: 2px solid #ffffff;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border-top: 1px solid #e2e8f0;
            padding: 1rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(loadingStyle);

// Performance optimization - Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Console welcome message
console.log('🚀 TechVault - Premium Technology Store loaded successfully!');
console.log('💡 Keyboard shortcuts: S = Search, C = Cart, Esc = Close modals');

// Analytics simulation (replace with real analytics)
function trackEvent(eventName, properties = {}) {
    console.log(`📊 Event: ${eventName}`, properties);
    // Replace with real analytics tracking
    // gtag('event', eventName, properties);
}

// Track page load
trackEvent('page_view', {
    page: 'home',
    timestamp: new Date().toISOString()
});

// Export functions for global access
window.removeFromCart = removeFromCart;
window.trackEvent = trackEvent;