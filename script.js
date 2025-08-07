// Trending Products Data
const trendingProducts = [
    {
        id: 1,
        name: "Sony WH-1000XM5 Wireless Headphones",
        description: "Industry-leading noise cancellation with 30-hour battery life and premium comfort",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        category: "Tech",
        badge: "🔥 Best Seller",
        rating: 4.9,
        reviews: 1247
    },
    {
        id: 2,
        name: "Apple Watch Series 9",
        description: "Advanced health monitoring with ECG, blood oxygen, and temperature sensing",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        category: "Tech",
        badge: "⚡ New Release",
        rating: 4.8,
        reviews: 892
    },
    {
        id: 3,
        name: "Sustainable Bamboo T-Shirt Collection",
        description: "Ultra-soft bamboo fabric, anti-bacterial, and eco-friendly fashion statement",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        category: "Fashion",
        badge: "🌱 Eco-Friendly",
        rating: 4.7,
        reviews: 456
    },
    {
        id: 4,
        name: "Breville Barista Express Espresso Machine",
        description: "Professional-grade espresso machine with built-in grinder and steam wand",
        price: 699.99,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop",
        category: "Home & Living",
        badge: "☕ Premium",
        rating: 4.9,
        reviews: 678
    },
    {
        id: 5,
        name: "Drunk Elephant Skincare Set",
        description: "Complete anti-aging routine with vitamin C, retinol, and hyaluronic acid",
        price: 189.99,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
        category: "Beauty",
        badge: "✨ Luxury",
        rating: 4.8,
        reviews: 1123
    },
    {
        id: 6,
        name: "JBL Charge 5 Portable Speaker",
        description: "Waterproof speaker with 20-hour battery and powerful bass",
        price: 179.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
        category: "Tech",
        badge: "🎵 Party Ready",
        rating: 4.6,
        reviews: 789
    },
    {
        id: 7,
        name: "Yeti Rambler 36oz Water Bottle",
        description: "Vacuum insulated stainless steel, keeps drinks cold for 7 days",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop",
        category: "Home & Living",
        badge: "💧 Adventure",
        rating: 4.9,
        reviews: 2341
    },
    {
        id: 8,
        name: "Samsung Wireless Charger Trio",
        description: "Charge phone, watch, and earbuds simultaneously with fast charging",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
        category: "Tech",
        badge: "⚡ 3-in-1",
        rating: 4.7,
        reviews: 445
    },
    {
        id: 9,
        name: "Lululemon Align Yoga Mat",
        description: "Premium non-slip yoga mat with alignment lines and carrying strap",
        price: 98.99,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
        category: "Beauty",
        badge: "🧘 Premium",
        rating: 4.8,
        reviews: 567
    },
    {
        id: 10,
        name: "Philips Hue Smart Bulb Starter Kit",
        description: "16 million colors, voice control, and automation with bridge included",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
        category: "Home & Living",
        badge: "💡 Smart Home",
        rating: 4.7,
        reviews: 892
    },
    {
        id: 11,
        name: "Coach Willow Tote Bag",
        description: "Handcrafted leather tote with signature hardware and interior organization",
        price: 395.99,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop",
        category: "Fashion",
        badge: "👜 Designer",
        rating: 4.8,
        reviews: 234
    },
    {
        id: 12,
        name: "Canon EOS R6 Mark II",
        description: "Full-frame mirrorless camera with 4K video and advanced autofocus",
        price: 2499.99,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
        category: "Tech",
        badge: "📸 Professional",
        rating: 4.9,
        reviews: 156
    },
    {
        id: 13,
        name: "Dyson Airwrap Multi-Styler",
        description: "Revolutionary hair styling tool with multiple attachments and intelligent heat control",
        price: 599.99,
        image: "https://images.unsplash.com/photo-1522338140263-f46f5913618a?w=400&h=300&fit=crop",
        category: "Beauty",
        badge: "💇‍♀️ Revolutionary",
        rating: 4.8,
        reviews: 2341
    },
    {
        id: 14,
        name: "Nike Air Jordan 1 Retro High",
        description: "Classic basketball sneaker with premium leather and iconic design",
        price: 170.99,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
        category: "Fashion",
        badge: "🏀 Iconic",
        rating: 4.9,
        reviews: 1892
    },
    {
        id: 15,
        name: "Instant Pot Duo 7-in-1",
        description: "Pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer",
        price: 119.99,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        category: "Home & Living",
        badge: "🍳 7-in-1",
        rating: 4.8,
        reviews: 3456
    },
    {
        id: 16,
        name: "Oculus Quest 3 VR Headset",
        description: "Standalone VR headset with pancake lenses and mixed reality capabilities",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=300&fit=crop",
        category: "Tech",
        badge: "🥽 Next Gen",
        rating: 4.7,
        reviews: 567
    },
    {
        id: 17,
        name: "La Mer Moisturizing Cream",
        description: "Luxury face cream with miracle broth and sea kelp for radiant skin",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
        category: "Beauty",
        badge: "💎 Luxury",
        rating: 4.9,
        reviews: 892
    },
    {
        id: 18,
        name: "Tesla Model 3 Wireless Phone Charger",
        description: "Custom wireless charger designed specifically for Tesla Model 3/Y",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
        category: "Tech",
        badge: "🚗 Tesla Ready",
        rating: 4.6,
        reviews: 234
    },
    {
        id: 19,
        name: "Hermès Silk Scarf",
        description: "Hand-rolled silk scarf with iconic Hermès design and craftsmanship",
        price: 495.99,
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
        category: "Fashion",
        badge: "🧣 Heritage",
        rating: 4.9,
        reviews: 123
    },
    {
        id: 20,
        name: "Le Creuset Dutch Oven",
        description: "Enameled cast iron Dutch oven perfect for braising, baking, and slow cooking",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        category: "Home & Living",
        badge: "🍲 Lifetime",
        rating: 4.9,
        reviews: 2341
    }
];

// Shopping Cart
let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartBtn = document.querySelector('.cart-btn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    setupEventListeners();
    updateCartCount();
    addParallaxEffects();
});

// Display products
function displayProducts() {
    productGrid.innerHTML = '';
    
    trendingProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create product card with enhanced design
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card enhanced-card';
    
    const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    
    card.innerHTML = `
        ${product.badge ? `<div class="product-badge enhanced-badge">${product.badge}</div>` : ''}
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-overlay">
                <button class="quick-view-btn">Quick View</button>
                <button class="wishlist-btn">❤</button>
            </div>
        </div>
        <div class="product-info enhanced-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-rating">
                <span class="stars">${stars}</span>
                <span class="rating-text">${product.rating} (${product.reviews})</span>
            </div>
            <div class="product-price-container">
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-shipping">Free Shipping</div>
            </div>
            <button class="add-to-cart enhanced-btn" onclick="addToCart(${product.id})">
                <span class="btn-text">Add to Cart</span>
                <span class="btn-icon">🛒</span>
            </button>
        </div>
    `;
    
    return card;
}

// Add to cart functionality
function addToCart(productId) {
    const product = trendingProducts.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification(`${product.name} added to cart!`, 'success');
    
    // Add cart animation
    const cartIcon = document.querySelector('.cart-btn');
    cartIcon.classList.add('cart-bounce');
    setTimeout(() => cartIcon.classList.remove('cart-bounce'), 300);
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Animate cart count
    if (totalItems > 0) {
        cartCount.classList.add('pulse');
        setTimeout(() => cartCount.classList.remove('pulse'), 500);
    }
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : 'ℹ️'}</span>
            <span class="notification-text">${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'linear-gradient(135deg, #667eea, #764ba2)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInEnhanced 0.4s ease;
        max-width: 300px;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutEnhanced 0.4s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 3000);
}

// Setup event listeners
function setupEventListeners() {
    // Cart modal
    cartBtn.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartModal);
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');
    
    newsletterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = newsletterInput.value.trim();
        if (email && isValidEmail(email)) {
            showNotification('Thank you for subscribing! You\'ll receive exclusive offers soon!', 'success');
            newsletterInput.value = '';
        } else {
            showNotification('Please enter a valid email address.');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    // CTA button
    document.querySelector('.cta-btn').addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Quick view and wishlist buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-view-btn')) {
            showNotification('Quick view feature coming soon!');
        }
        if (e.target.classList.contains('wishlist-btn')) {
            e.target.classList.toggle('active');
            showNotification(e.target.classList.contains('active') ? 'Added to wishlist!' : 'Removed from wishlist');
        }
    });
}

// Open cart modal
function openCart() {
    displayCartItems();
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close cart modal
function closeCartModal() {
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Display cart items
function displayCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some trending products to get started!</p>
            </div>
        `;
        cartTotal.textContent = '$0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item enhanced-cart-item';
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-category">${item.category}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
        `;
        
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }
    
    updateCartCount();
    displayCartItems();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    displayCartItems();
    showNotification('Item removed from cart');
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add parallax effects
function addParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card, .category-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Add enhanced CSS animations
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = `
    @keyframes slideInEnhanced {
        from {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
        }
        to {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes slideOutEnhanced {
        from {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
        to {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
        }
    }
    
    @keyframes cartBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
    }
    
    .cart-bounce {
        animation: cartBounce 0.3s ease;
    }
    
    .pulse {
        animation: pulse 0.5s ease;
    }
    
    .enhanced-card {
        position: relative;
        overflow: hidden;
        background: linear-gradient(145deg, #ffffff, #f8f9fa);
        border: 1px solid rgba(102, 126, 234, 0.1);
    }
    
    .enhanced-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        transition: left 0.5s;
    }
    
    .enhanced-card:hover::before {
        left: 100%;
    }
    
    .product-image-container {
        position: relative;
        overflow: hidden;
    }
    
    .product-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .enhanced-card:hover .product-overlay {
        opacity: 1;
    }
    
    .quick-view-btn, .wishlist-btn {
        background: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 600;
    }
    
    .quick-view-btn:hover {
        background: #667eea;
        color: white;
        transform: translateY(-2px);
    }
    
    .wishlist-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
    }
    
    .wishlist-btn.active {
        background: #ff4757;
        color: white;
    }
    
    .enhanced-badge {
        background: linear-gradient(135deg, #ff6b6b, #ee5a24);
        font-weight: 700;
        letter-spacing: 0.5px;
        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    }
    
    .product-category {
        color: #667eea;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 0.5rem;
    }
    
    .product-rating {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .stars {
        color: #ffd700;
        font-size: 0.9rem;
    }
    
    .rating-text {
        color: #666;
        font-size: 0.8rem;
    }
    
    .product-price-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .product-shipping {
        color: #4CAF50;
        font-size: 0.8rem;
        font-weight: 600;
    }
    
    .enhanced-btn {
        background: linear-gradient(135deg, #667eea, #764ba2);
        border: none;
        padding: 1rem;
        border-radius: 15px;
        color: white;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        overflow: hidden;
    }
    
    .enhanced-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
    }
    
    .enhanced-btn:hover::before {
        left: 100%;
    }
    
    .enhanced-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
    }
    
    .btn-icon {
        font-size: 1.2rem;
    }
    
    .empty-cart {
        text-align: center;
        padding: 3rem 1rem;
    }
    
    .empty-cart-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
        opacity: 0.5;
    }
    
    .empty-cart h3 {
        color: #333;
        margin-bottom: 0.5rem;
    }
    
    .empty-cart p {
        color: #666;
    }
    
    .enhanced-cart-item {
        background: #f8f9fa;
        border-radius: 15px;
        padding: 1rem;
        margin-bottom: 1rem;
        border: 1px solid #e9ecef;
    }
    
    .remove-item {
        background: #ff4757;
        color: white;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        transition: all 0.3s ease;
    }
    
    .remove-item:hover {
        background: #ff3742;
        transform: scale(1.1);
    }
    
    .quantity-display {
        background: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: 600;
        min-width: 40px;
        text-align: center;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-icon {
        font-size: 1.2rem;
    }
`;

document.head.appendChild(enhancedStyle);

// Search functionality (placeholder)
document.querySelector('.search-btn').addEventListener('click', () => {
    showNotification('Advanced search with filters coming soon!');
});

// Mobile menu toggle (placeholder)
document.querySelector('.menu-toggle').addEventListener('click', () => {
    showNotification('Mobile menu with categories coming soon!');
});

// Checkout functionality (placeholder)
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    showNotification('Secure checkout with multiple payment options coming soon!');
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .category-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.9)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});