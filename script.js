// ============================================
// RAPSIFY OFFICIAL STORE - FULL INTERACTIVE JS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

let cart = [];
let products = [];

// INISIALISASI APP
function initApp() {
    loadProducts();
    setupEventListeners();
    updateCartUI();
}

// PRODUCTS DATA (20+ iPhone Products)
function loadProducts() {
    products = [
        { id: 1, name: 'iPhone 15 Pro Max 1TB', price: 24999000, emoji: '🟤', storage: '1TB' },
        { id: 2, name: 'iPhone 15 Pro 512GB', price: 18999000, emoji: '🟠', storage: '512GB' },
        { id: 3, name: 'iPhone 15 Pro 256GB', price: 16999000, emoji: '🟡', storage: '256GB' },
        { id: 4, name: 'iPhone 15 512GB', price: 15999000, emoji: '🔵', storage: '512GB' },
        { id: 5, name: 'iPhone 15 256GB', price: 13999000, emoji: '🟢', storage: '256GB' },
        { id: 6, name: 'iPhone 15 128GB', price: 12999000, emoji: '🔵', storage: '128GB' },
        { id: 7, name: 'iPhone 14 Pro Max 1TB', price: 21999000, emoji: '🟣', storage: '1TB' },
        { id: 8, name: 'iPhone 14 Pro 512GB', price: 17999000, emoji: '🟠', storage: '512GB' },
        { id: 9, name: 'iPhone 14 Pro 256GB', price: 15999000, emoji: '🟡', storage: '256GB' },
        { id: 10, name: 'iPhone 14 Plus 512GB', price: 14999000, emoji: '🔴', storage: '512GB' },
        { id: 11, name: 'iPhone 14 256GB', price: 12999000, emoji: '🔵', storage: '256GB' },
        { id: 12, name: 'iPhone 14 128GB', price: 11999000, emoji: '🟢', storage: '128GB' },
        { id: 13, name: 'iPhone 13 Pro Max 1TB', price: 18999000, emoji: '🟤', storage: '1TB' },
        { id: 14, name: 'iPhone 13 Pro 512GB', price: 15999000, emoji: '🟣', storage: '512GB' },
        { id: 15, name: 'iPhone 13 256GB', price: 10999000, emoji: '🔴', storage: '256GB' },
        { id: 16, name: 'iPhone 13 128GB', price: 9999000, emoji: '🔵', storage: '128GB' },
        { id: 17, name: 'iPhone 12 Pro Max 512GB', price: 14999000, emoji: '🟠', storage: '512GB' },
        { id: 18, name: 'iPhone 12 256GB', price: 9999000, emoji: '🟣', storage: '256GB' },
        { id: 19, name: 'iPhone SE 2022 256GB', price: 7999000, emoji: '🔴', storage: '256GB' },
        { id: 20, name: 'iPhone 11 128GB', price: 6999000, emoji: '🟡', storage: '128GB' },
        { id: 21, name: 'iPhone XR 128GB', price: 5999000, emoji: '🔵', storage: '128GB' },
        { id: 22, name: 'iPhone 15 Pro Max Desert', price: 25999000, emoji: '🏜️', storage: '1TB' }
    ];
    
    renderProducts();
}

// RENDER PRODUCTS
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">Rp ${formatRupiah(product.price)}</div>
            <div class="product-actions">
                <button class="btn btn-small btn-primary" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Keranjang
                </button>
                <button class="btn btn-small btn-yellow" onclick="buyNow(${product.id})">
                    <i class="fas fa-bolt"></i> Beli Sekarang
                </button>
            </div>
        </div>
    `).join('');
}

// FORMAT RUPIAH
function formatRupiah(angka) {
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// ADD TO CART
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    showNotification('Ditambahkan ke keranjang!', 'success');
}

// BUY NOW
function buyNow(productId) {
    const product = products.find(p => p.id === productId);
    cart = [{ ...product, quantity: 1 }];
    openCartModal();
    showNotification('Langsung ke checkout!', 'warning');
}

// UPDATE CART UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// OPEN CART MODAL
function openCartModal() {
    document.getElementById('cartModal').style.display = 'flex';
    renderCartItems();
}

// CLOSE CART MODAL
function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
}

// RENDER CART ITEMS
function renderCartItems() {
    const cartItemsEl = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p style="text-align: center; color: #64748b; padding: 40px;">Keranjang kosong 😢</p>';
        totalEl.textContent = 'Rp 0';
        return;
    }
    
    cartItemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">Rp ${formatRupiah(item.price)}</div>
                <div style="display: flex; align-items: center; gap: 10px; margin-top: 5px;">
                    <button onclick="changeQuantity(${item.id}, -1)" style="width: 30px; height: 30px; border: none; background: #f1f5f9; border-radius: 50%; cursor: pointer; font-size: 18px;">-</button>
                    <span style="font-weight: 600; min-width: 20px; text-align: center;">${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)" style="width: 30px; height: 30px; border: none; background: #f1f5f9; border-radius: 50%; cursor: pointer; font-size: 18px;">+</button>
                    <button onclick="removeFromCart(${item.id})" style="margin-left: auto; background: #ef4444; color: white; border: none; padding: 5px 12px; border-radius: 8px; cursor: pointer; font-size: 12px;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalEl.textContent = `Rp ${formatRupiah(total)}`;
}

// CHANGE QUANTITY
function changeQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            renderCartItems();
            updateCartUI();
        }
    }
}

// REMOVE FROM CART
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCartItems();
    updateCartUI();
}

// CLEAR CART
function clearCart() {
    cart = [];
    renderCartItems();
    updateCartUI();
    showNotification('Keranjang dikosongkan', 'info');
}

// CHECKOUT
function checkout() {
    if (cart.length === 0) {
        showNotification('Keranjang kosong!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const message = `Halo Rapsify! Saya mau order:\n\n${cart.map(item => 
        `${item.name} (${item.storage}) x${item.quantity} = Rp ${formatRupiah(item.price * item.quantity)}`
    ).join('\n')}\n\nTotal: Rp ${formatRupiah(total)}\n\nAlamat: [isi alamat]\n\nTerima kasih! 😊`;
    
    const whatsappUrl = `https://wa.me/6285281296342?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    showNotification('Berhasil! WhatsApp terbuka 🚀', 'success');
}

// WHATSAPP DIRECT
function openWhatsApp() {
    const message = `Halo Rapsify! Saya tertarik beli iPhone dari Rapsify Official Store 💜\n\nBisa kasih info promo terbaru?`;
    window.open(`https://wa.me/6285281296342?text=${encodeURIComponent(message)}`, '_blank');
}

// SCROLL TO SECTION
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// NOTIFICATION SYSTEM
function showNotification(message, type = 'info') {
    // Hapus notifikasi lama
    const oldNotif = document.querySelector('.notification');
    if (oldNotif) oldNotif.remove();
    
    const notif = document.createElement('div');
    notif.className = `notification notification-${type}`;
    notif.innerHTML = `
        <i class="fas fa-${getIcon(type)}"></i>
        ${message}
    `;
    notif.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getColor(type)};
        color: white;
        padding: 20px 30px;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        z-index: 3000;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 12px;
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 400px;
    `;
    
    document.body.appendChild(notif);
    
    // Animasi masuk
    requestAnimationFrame(() => {
        notif.style.transform = 'translateX(0)';
        notif.style.opacity = '1';
    });
    
    // Auto remove
    setTimeout(() => {
        notif.style.transform = 'translateX(400px)';
        notif.style.opacity = '0';
        setTimeout(() => notif.remove(), 400);
    }, 4000);
}

function getIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #34d399)',
        error: 'linear-gradient(135deg, #ef4444, #f87171)',
        warning: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
        info: 'linear-gradient(135deg, #3b82f6, #60a5fa)'
    };
    return colors[type] || colors.info;
}

// EVENT LISTENERS
function setupEventListeners() {
    // Cart Icon
    document.getElementById('cartIcon').addEventListener('click', openCartModal);
    
    // Close Cart Modal
    document.getElementById('closeCart').addEventListener('click', closeCartModal);
    document.getElementById('cartModal').addEventListener('click', function(e) {
        if (e.target === this) closeCartModal();
    });
    
    // Navbar Mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Smooth scroll untuk nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// RESPONSIVE MOBILE MENU (Tambahan CSS diperlukan di style.css)
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .hamburger { display: flex; }
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0,0,0,0.05);
            padding: 20px 0;
        }
        .nav-menu.active { left: 0; }
        .hero-buttons { flex-direction: column; }
        .product-actions { flex-direction: column; }
        .cart-modal-content { margin: 20px; }
    }
    .hamburger.active span:nth-child(2) { opacity: 0; }
    .hamburger.active span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
    .hamburger.active span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
`;
document.head.appendChild(style);

// INTERACTIVE PARTICLES (Bonus Gen Z Effect)
function createParticles() {
    const particles = document.createElement('canvas');
    particles.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    document.body.appendChild(particles);
    
    const ctx = particles.getContext('2d');
    particles.width = window.innerWidth;
    particles.height = window.innerHeight;
    
    const particleCount = 50;
    const particlesArray = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * particles.width;
            this.y = Math.random() * particles.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > particles.width || this.x < 0) this.speedX *= -1;
            if (this.y > particles.height || this.y < 0) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, particles.width, particles.height);
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
    
    window.addEventListener('resize', () => {
        particles.width = window.innerWidth;
        particles.height = window.innerHeight;
    });
}

createParticles();