document.addEventListener('DOMContentLoaded', () => {
    // Content sections
    const homeSection = document.getElementById('home-section');
    const productListingSection = document.getElementById('product-listing');
    const sidebarSection = document.getElementById('sidebar');
    const shoppingCartSection = document.getElementById('shopping-cart');
    const aboutUsSection = document.getElementById('about-us');
    const contactDetailsSection = document.getElementById('contact-details');
    const paymentSection = document.getElementById('payment-section');

    // Helper function to hide all content sections
    function hideAllSections() {
        const sections = [homeSection, productListingSection, sidebarSection, shoppingCartSection, aboutUsSection, contactDetailsSection, paymentSection];
        sections.forEach(section => {
            if (section) section.classList.add('hidden');
        });
    }

    // Helper function to show specific sections
    function showHomeSection() {
        hideAllSections();
        if (homeSection) homeSection.classList.remove('hidden');
    }

    function showProductsSection() {
        hideAllSections();
        if (productListingSection) productListingSection.classList.remove('hidden');
        if (sidebarSection) sidebarSection.classList.remove('hidden');
    }

    function showCartSection() {
        hideAllSections();
        if (shoppingCartSection) shoppingCartSection.classList.remove('hidden');
        renderCart();
    }

    function showAboutSection() {
        hideAllSections();
        if (aboutUsSection) aboutUsSection.classList.remove('hidden');
    }

    function showContactSection() {
        hideAllSections();
        if (contactDetailsSection) contactDetailsSection.classList.remove('hidden');
    }

    function showPaymentSection() {
        hideAllSections();
        if (paymentSection) paymentSection.classList.remove('hidden');
    }

    // Cart array with localStorage persistence
    let cart = JSON.parse(localStorage.getItem('techConnectCart') || '[]');

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('techConnectCart', JSON.stringify(cart));
        updateCartBadge();
    }

    // DOM elements for cart
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    // DOM elements for price filter
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const applyPriceFilterBtn = document.getElementById('apply-price-filter-btn');

    // DOM elements for search
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    // DOM elements for checkout
    const checkoutBtn = document.getElementById('checkout-btn');
    const confirmPaymentBtn = document.getElementById('confirm-payment-btn');
    const backToCartBtn = document.getElementById('back-to-cart-btn');

    // Home page buttons
    const browseProductsBtn = document.getElementById('browse-products-btn');
    const contactUsBtn = document.getElementById('contact-us-btn');

    // Payment method elements
    const codRadio = document.getElementById('cod');
    const imepayRadio = document.getElementById('imepay');
    const imepayQrSection = document.getElementById('imepay-qr-section');
    const paymentAmountSpan = document.getElementById('payment-amount');


    // Sample Laptop Data
    const laptops = [
        {
            id: 1,
            name: "Dell XPS 15",
            price: 180000,
            image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop&auto=format",
            description: "Powerful and sleek laptop for professionals.",
            specifications: { RAM: "16GB", Storage: "512GB SSD", Processor: "Intel Core i7" }
        },
        {
            id: 2,
            name: "MacBook Pro 16",
            price: 250000,
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&auto=format",
            description: "Top-tier performance for creative workflows.",
            specifications: { RAM: "16GB", Storage: "1TB SSD", Processor: "Apple M1 Pro" }
        },
        {
            id: 3,
            name: "HP Spectre x360",
            price: 165000,
            image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop&auto=format",
            description: "Versatile 2-in-1 laptop with a stunning display.",
            specifications: { RAM: "16GB", Storage: "512GB SSD", Processor: "Intel Core i7" }
        },
        {
            id: 4,
            name: "Lenovo IdeaPad Slim 5",
            price: 85000,
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&auto=format",
            description: "Affordable and reliable for everyday use.",
            specifications: { RAM: "8GB", Storage: "256GB SSD", Processor: "AMD Ryzen 5" }
        },
        {
            id: 5,
            name: "Asus ROG Strix G15",
            price: 220000,
            image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop&auto=format",
            description: "High-performance gaming laptop.",
            specifications: { RAM: "16GB", Storage: "1TB SSD", Processor: "AMD Ryzen 9", Graphics: "NVIDIA RTX 3070" }
        },
        {
            id: 6,
            name: "Acer Swift 3",
            price: 78000,
            image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop&auto=format",
            description: "Lightweight and portable for students.",
            specifications: { RAM: "8GB", Storage: "512GB SSD", Processor: "Intel Core i5" }
        }
    ];

    // Function to render product listings
    function renderProducts(productsToRender) {
        if (!productListingSection) {
            console.error("Product listing section not found!");
            return;
        }
        // Clear existing products
        productListingSection.innerHTML = '<h2>Products</h2>'; // Keep the heading

        if (productsToRender.length === 0) {
            const noProductsMessage = document.createElement('p');
            noProductsMessage.textContent = 'No products match your criteria.';
            productListingSection.appendChild(noProductsMessage);
            return; // Exit if no products to render
        }

        const productGrid = document.createElement('div');
        productGrid.className = 'product-grid'; // For potential CSS styling

        productsToRender.forEach(laptop => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            
            // Create image with error handling
            const imgElement = document.createElement('img');
            imgElement.src = laptop.image;
            imgElement.alt = laptop.name;
            imgElement.style.cssText = 'width:100%; max-width:200px; height:auto; margin-bottom:10px;';
            imgElement.loading = 'lazy'; // Add lazy loading
            
            // Add error handling for images
            imgElement.onerror = function() {
                this.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=' + encodeURIComponent(laptop.name);
                this.alt = laptop.name + ' (Image not available)';
            };
            
            // Add loading indicator
            imgElement.onload = function() {
                this.style.opacity = '1';
            };
            imgElement.style.opacity = '0.7';
            imgElement.style.transition = 'opacity 0.3s ease';
            
            productItem.innerHTML = `
                <div class="product-image-container" style="position: relative; margin-bottom: 10px;">
                    ${imgElement.outerHTML}
                </div>
                <h3>${laptop.name}</h3>
                <p class="price">NPR ${laptop.price.toLocaleString()}</p>
                <p class="description">${laptop.description}</p>
                <div class="specifications">
                    <strong>Specifications:</strong>
                    <ul>
                        ${Object.entries(laptop.specifications).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
                    </ul>
                </div>
                <button class="add-to-cart-btn" data-product-id="${laptop.id}">Add to Cart</button>
            `;
            productGrid.appendChild(productItem);
        });
        productListingSection.appendChild(productGrid);
    }

    // Render products on initial load
    renderProducts(laptops);

    // Function to filter products by price
    function filterProductsByPrice() {
        const minPrice = parseFloat(minPriceInput.value);
        const maxPrice = parseFloat(maxPriceInput.value);

        let filteredLaptops = laptops;

        if (!isNaN(minPrice) && !isNaN(maxPrice) && minPrice > maxPrice) {
            alert("Minimum price cannot be greater than maximum price.");
            renderProducts([]); // Show no products
            return;
        }

        if (!isNaN(minPrice)) {
            filteredLaptops = filteredLaptops.filter(laptop => laptop.price >= minPrice);
        }

        if (!isNaN(maxPrice)) {
            filteredLaptops = filteredLaptops.filter(laptop => laptop.price <= maxPrice);
        }

        renderProducts(filteredLaptops);
    }


    // Function to add a product to the cart
    function addToCart(productId) {
        const productIdNum = parseInt(productId); // Ensure productId is a number
        const productToAdd = laptops.find(laptop => laptop.id === productIdNum);

        if (productToAdd) {
            const existingCartItem = cart.find(item => item.id === productIdNum);
            if (existingCartItem) {
                existingCartItem.quantity += 1;
                showNotification(`"${productToAdd.name}" quantity increased to ${existingCartItem.quantity}`, 'success', 2000);
            } else {
                cart.push({...productToAdd, quantity: 1 }); // Add product with quantity 1
                showNotification(`"${productToAdd.name}" added to cart!`, 'success', 2000);
            }
            console.log("Current cart:", cart);
            renderCart(); // Update cart display
            saveCart(); // Save to localStorage and update badge
        } else {
            console.error(`Product with ID ${productIdNum} not found.`);
            showNotification('Error adding product to cart', 'error');
        }
    }

    // Update cart badge with item count
    function updateCartBadge() {
        const cartLink = document.querySelector('nav a[data-section="cart"]');
        if (cartLink) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            
            // Remove existing badge
            const existingBadge = cartLink.querySelector('.cart-badge');
            if (existingBadge) {
                existingBadge.remove();
            }
            
            // Add new badge if there are items
            if (totalItems > 0) {
                const badge = document.createElement('span');
                badge.className = 'cart-badge';
                badge.textContent = totalItems;
                cartLink.appendChild(badge);
            }
        }
    }

    // Function to render cart items and total
    function renderCart() {
        if (!cartItemsContainer || !cartTotalElement) {
            console.error("Cart items container or total element not found.");
            return;
        }

        // Clear previous cart items
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalElement.innerHTML = ''; // Clear total if cart is empty
            if(checkoutBtn) checkoutBtn.style.display = 'none'; // Hide checkout button if cart is empty
        } else {
            if(checkoutBtn) checkoutBtn.style.display = 'block'; // Show checkout button if cart has items
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item'; // For styling
                cartItemElement.innerHTML = `
                    <span>${item.name} (x${item.quantity})</span>
                    <span>NPR ${(item.price * item.quantity).toLocaleString()}</span>
                    <button class="remove-from-cart-btn" data-product-id="${item.id}">Remove</button>
                `;
                cartItemsContainer.appendChild(cartItemElement);
                totalPrice += item.price * item.quantity;
            });
            cartTotalElement.innerHTML = `<h3>Total: NPR ${totalPrice.toLocaleString()}</h3>`;
        }
    }

    // Function to remove an item from the cart
    function removeFromCart(productId) {
        const productIdNum = parseInt(productId);
        const itemIndex = cart.findIndex(item => item.id === productIdNum);

        if (itemIndex > -1) {
            const removedItem = cart.splice(itemIndex, 1)[0]; // Remove item and get it
            console.log(`Product "${removedItem.name}" removed from cart.`);
            showNotification(`"${removedItem.name}" removed from cart`, 'info', 2000);
        } else {
            console.log(`Product with ID ${productIdNum} not found in cart.`);
            showNotification('Error removing product from cart', 'error');
        }
        renderCart(); // Update cart display
        saveCart(); // Save to localStorage and update badge
    }

    // Event listener for "Add to Cart" buttons using event delegation
    if (productListingSection) {
        productListingSection.addEventListener('click', (event) => {
            if (event.target.classList.contains('add-to-cart-btn')) {
                const productId = event.target.dataset.productId;
                if (productId) {
                    addToCart(productId);
                } else {
                    console.error("Product ID not found on button.");
                }
            }
        });
    }

    // Event listener for "Remove from Cart" buttons using event delegation
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-from-cart-btn')) {
                const productId = event.target.dataset.productId;
                if (productId) {
                    removeFromCart(productId);
                } else {
                    console.error("Product ID not found on remove button.");
                }
            }
        });
    }

    // Event Listener for Apply Price Filter button
    if (applyPriceFilterBtn) {
        applyPriceFilterBtn.addEventListener('click', filterProductsByPrice);
    }

    // Enhanced search function with debouncing
    const debouncedSearch = debounceSearch(searchProducts, 300);

    // Function to search products
    function searchProducts() {
        const query = searchInput.value.toLowerCase().trim();

        if (!query) {
            renderProducts(laptops); // Show all products if query is empty
            return;
        }

        const searchedLaptops = laptops.filter(laptop => {
            const nameMatch = laptop.name.toLowerCase().includes(query);
            const descriptionMatch = laptop.description.toLowerCase().includes(query);
            // Search specifications too
            const specsMatch = Object.values(laptop.specifications).some(spec => 
                String(spec).toLowerCase().includes(query)
            );
            return nameMatch || descriptionMatch || specsMatch;
        });

        renderProducts(searchedLaptops);
        
        // Show search results feedback
        if (searchedLaptops.length === 0) {
            showNotification(`No products found for "${query}". Try different keywords.`, 'info', 3000);
        } else if (searchedLaptops.length < laptops.length) {
            showNotification(`Found ${searchedLaptops.length} product(s) matching "${query}"`, 'info', 2000);
        }
    }

    // Event Listener for Search button and real-time search
    if (searchBtn) {
        searchBtn.addEventListener('click', searchProducts);
    }
    
    // Add real-time search as user types
    if (searchInput) {
        searchInput.addEventListener('input', debouncedSearch);
        
        // Add Enter key support
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchProducts();
            }
        });
    }

    // Function to calculate cart total
    function calculateCartTotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Event Listener for "Proceed to Checkout" button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            showPaymentSection();
            if (paymentAmountSpan) paymentAmountSpan.textContent = calculateCartTotal().toLocaleString();
        });
    }

    // Event Listener for "Confirm Payment" button
    if (confirmPaymentBtn) {
        confirmPaymentBtn.addEventListener('click', () => {
            const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
            
            // Simulate payment
            if (selectedPaymentMethod === 'cod') {
                alert("Order Confirmed! Cash on Delivery selected. Our team will contact you soon.");
            } else if (selectedPaymentMethod === 'imepay') {
                alert("Payment Successful! IME Pay payment confirmed. Thank you for your order.");
            }

            cart = []; // Clear the cart array
            renderCart(); // Update the cart display (will show empty cart and hide checkout button)
            saveCart(); // Save empty cart to localStorage and update badge

            hideAllSections(); // Hide all sections including payment section
            if(paymentSection) paymentSection.classList.add('hidden'); // Ensure payment section is hidden
            if(homeSection) homeSection.classList.remove('hidden'); // Show home section
            setActiveNavLink(navLinks.home); // Set home as active
        });
    }

    // Event Listener for "Back to Cart" button
    if (backToCartBtn) {
        backToCartBtn.addEventListener('click', () => {
            hideAllSections();
            if(paymentSection) paymentSection.classList.add('hidden'); // Hide payment section
            if(shoppingCartSection) shoppingCartSection.classList.remove('hidden'); // Show cart section
            setActiveNavLink(navLinks.cart); // Set cart as active nav link
            renderCart(); // Re-render cart to ensure it's up-to-date
            updateCartBadge(); // Ensure cart badge is up-to-date
        });
    }


    // Navigation Link Handling
    const allNavLinks = document.querySelectorAll('header nav ul li a');
    
    function setActiveNavLink(clickedLink) {
        allNavLinks.forEach(link => link.classList.remove('active-nav'));
        if (clickedLink) {
            clickedLink.classList.add('active-nav');
        }
    }

    const navLinks = {
        home: document.querySelector('header nav ul li:nth-child(1) a'),
        products: document.querySelector('header nav ul li:nth-child(2) a'),
        cart: document.querySelector('header nav ul li:nth-child(3) a'),
        about: document.querySelector('header nav ul li:nth-child(4) a'),
        contact: document.querySelector('header nav ul li:nth-child(5) a')
    };

    function showHomeOrProducts() {
        hideAllSections();
        if(paymentSection) paymentSection.classList.add('hidden'); // Ensure payment is hidden
        if(productListingSection) productListingSection.classList.remove('hidden');
        if(sidebarSection) sidebarSection.classList.remove('hidden');
    }

    function showHomeSection() {
        hideAllSections();
        if(paymentSection) paymentSection.classList.add('hidden'); // Ensure payment is hidden
        if(homeSection) homeSection.classList.remove('hidden');
    }

    if (navLinks.home) {
        navLinks.home.addEventListener('click', (e) => {
            e.preventDefault();
            showHomeSection();
            setActiveNavLink(e.currentTarget);
        });
    }

    if (navLinks.products) {
        navLinks.products.addEventListener('click', (e) => {
            e.preventDefault();
            showHomeOrProducts();
            setActiveNavLink(e.currentTarget);
        });
    }

    if (navLinks.cart) {
        navLinks.cart.addEventListener('click', (e) => {
            e.preventDefault();
            hideAllSections();
            if(paymentSection) paymentSection.classList.add('hidden');
            if(shoppingCartSection) shoppingCartSection.classList.remove('hidden');
            renderCart();
            setActiveNavLink(e.currentTarget);
        });
    }

    if (navLinks.about) {
        navLinks.about.addEventListener('click', (e) => {
            e.preventDefault();
            hideAllSections();
            if(paymentSection) paymentSection.classList.add('hidden');
            if(aboutUsSection) aboutUsSection.classList.remove('hidden');
            setActiveNavLink(e.currentTarget);
        });
    }

    if (navLinks.contact) {
        navLinks.contact.addEventListener('click', (e) => {
            e.preventDefault();
            hideAllSections();
            if(paymentSection) paymentSection.classList.add('hidden');
            if(contactDetailsSection) contactDetailsSection.classList.remove('hidden');
            setActiveNavLink(e.currentTarget);
        });
    }

    // Home page button event listeners
    if (browseProductsBtn) {
        browseProductsBtn.addEventListener('click', () => {
            showHomeOrProducts();
            setActiveNavLink(navLinks.products);
        });
    }

    if (contactUsBtn) {
        contactUsBtn.addEventListener('click', () => {
            hideAllSections();
            if(paymentSection) paymentSection.classList.add('hidden');
            if(contactDetailsSection) contactDetailsSection.classList.remove('hidden');
            setActiveNavLink(navLinks.contact);
        });
    }

    // IME Pay payment method toggle functionality
    if (imepayRadio && codRadio && imepayQrSection) {
        imepayRadio.addEventListener('change', () => {
            if (imepayRadio.checked) {
                imepayQrSection.classList.remove('hidden');
            }
        });

        codRadio.addEventListener('change', () => {
            if (codRadio.checked) {
                imepayQrSection.classList.add('hidden');
            }
        });
    }

    // Notification system for better user feedback
    function showNotification(message, type = 'info', duration = 5000) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    }

    // Add loading state management
    function showLoading() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="spinner"></div>
                <p>Loading TechConnect Nepal...</p>
            </div>
        `;
        document.body.appendChild(loader);
    }

    function hideLoading() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }
    }

    // Add error boundary for better error handling
    window.addEventListener('error', (event) => {
        console.error('Global error:', event.error);
        showNotification('Something went wrong. Please refresh the page.', 'error');
    });

    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        showNotification('A network error occurred. Please check your connection.', 'error');
    });

    // Enhanced product filtering with debounce
    let searchTimeout;
    function debounceSearch(func, delay) {
        return function(...args) {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Contact Form Handler with Basin Form Service
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = new FormData(this);
            
            try {
                // Submit to Basin form endpoint
                const response = await fetch('https://usebasin.com/f/5e6755407364', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const name = formData.get('name');
                    showNotification(`Thank you, ${name}! Your message has been sent successfully. We'll get back to you soon.`, 'success', 6000);
                    this.reset(); // Clear form
                } else {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Basin form submission failed:', error);
                showNotification('Failed to send message. Please try again or contact us directly at nikishsubedi1@gmail.com', 'error', 8000);
            } finally {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Initial Page Load View
    hideAllSections(); // Hide all sections initially
    if(paymentSection) paymentSection.classList.add('hidden'); // Ensure payment section is hidden
    showHomeSection(); // Show home section by default
    if(navLinks.home) setActiveNavLink(navLinks.home); // Set Home as active nav link by default
    
    // Initialize cart badge
    updateCartBadge();
    
    // Show initial loading complete notification
    setTimeout(() => {
        showNotification('TechConnect Nepal is ready! Browse our latest laptops.', 'success', 3000);
    }, 500);
});
