// Trending Products Data
const trendingProducts = [
    {
        id: 1,
        name: "Wireless Noise-Canceling Headphones",
        description: "Premium sound quality with active noise cancellation technology",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        category: "Tech",
        badge: "🔥 Hot"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        description: "Track your health and fitness with advanced sensors",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        category: "Tech",
        badge: "⚡ New"
    },
    {
        id: 3,
        name: "Organic Cotton T-Shirt",
        description: "Comfortable and sustainable fashion for everyday wear",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        category: "Fashion",
        badge: "🌱 Eco"
    },
    {
        id: 4,
        name: "Minimalist Coffee Maker",
        description: "Brew perfect coffee with elegant design",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop",
        category: "Home & Living",
        badge: "☕ Popular"
    },
    {
        id: 5,
        name: "Natural Skincare Set",
        description: "Complete skincare routine with organic ingredients",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
        category: "Beauty",
        badge: "✨ Best Seller"
    },
    {
        id: 6,
        name: "Portable Bluetooth Speaker",
        description: "Waterproof speaker with 360° sound",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
        category: "Tech",
        badge: "🎵 Trending"
    },
    {
        id: 7,
        name: "Sustainable Water Bottle",
        description: "Keep drinks cold for 24 hours, hot for 12 hours",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop",
        category: "Home & Living",
        badge: "💧 Eco-Friendly"
    },
    {
        id: 8,
        name: "Wireless Charging Pad",
        description: "Fast wireless charging for all compatible devices",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
        category: "Tech",
        badge: "⚡ Fast"
    },
    {
        id: 9,
        name: "Yoga Mat Premium",
        description: "Non-slip yoga mat with carrying strap",
        price: 44.99,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
        category: "Beauty",
        badge: "🧘 Popular"
    },
    {
        id: 10,
        name: "Smart LED Light Bulb",
        description: "Control your lighting with voice commands",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
        category: "Home & Living",
        badge: "💡 Smart"
    },
    {
        id: 11,
        name: "Leather Crossbody Bag",
        description: "Handcrafted genuine leather bag",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop",
        category: "Fashion",
        badge: "👜 Luxury"
    },
    {
        id: 12,
        name: "Digital Camera Mirrorless",
        description: "Professional quality photos and videos",
        price: 899.99,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
        category: "Tech",
        badge: "📸 Pro"
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
});

// Display products
function displayProducts() {
    productGrid.innerHTML = '';
    
    trendingProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
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
    showNotification(`${product.name} added to cart!`);
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
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
            showNotification('Thank you for subscribing!');
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
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
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

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .product-card {
        animation: fadeInUp 0.6s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .category-card {
        animation: fadeInUp 0.6s ease;
    }
    
    .category-card:nth-child(1) { animation-delay: 0.1s; }
    .category-card:nth-child(2) { animation-delay: 0.2s; }
    .category-card:nth-child(3) { animation-delay: 0.3s; }
    .category-card:nth-child(4) { animation-delay: 0.4s; }
    
    .product-card:nth-child(1) { animation-delay: 0.1s; }
    .product-card:nth-child(2) { animation-delay: 0.2s; }
    .product-card:nth-child(3) { animation-delay: 0.3s; }
    .product-card:nth-child(4) { animation-delay: 0.4s; }
    .product-card:nth-child(5) { animation-delay: 0.5s; }
    .product-card:nth-child(6) { animation-delay: 0.6s; }
    .product-card:nth-child(7) { animation-delay: 0.7s; }
    .product-card:nth-child(8) { animation-delay: 0.8s; }
    .product-card:nth-child(9) { animation-delay: 0.9s; }
    .product-card:nth-child(10) { animation-delay: 1.0s; }
    .product-card:nth-child(11) { animation-delay: 1.1s; }
    .product-card:nth-child(12) { animation-delay: 1.2s; }
`;

document.head.appendChild(style);

// Search functionality (placeholder)
document.querySelector('.search-btn').addEventListener('click', () => {
    showNotification('Search feature coming soon!');
});

// Mobile menu toggle (placeholder)
document.querySelector('.menu-toggle').addEventListener('click', () => {
    showNotification('Mobile menu coming soon!');
});

// Checkout functionality (placeholder)
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    showNotification('Checkout feature coming soon!');
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
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .category-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});