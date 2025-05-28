document.addEventListener('DOMContentLoaded', () => {
    // Navigation links
    const navHome = document.querySelector('header nav ul li a[href="#"]'); // Assuming Home is the first link
    const navProducts = document.querySelector('header nav ul li a[href="#Products"]'); // Assuming Products is the second link
    const navCart = document.querySelector('header nav ul li a[href="#Cart"]');
    const navAbout = document.querySelector('header nav ul li a[href="#About Us"]');
    const navContact = document.querySelector('header nav ul li a[href="#Contact"]');

    // Content sections
    const productListingSection = document.getElementById('product-listing');
    const sidebarSection = document.getElementById('sidebar');
    const shoppingCartSection = document.getElementById('shopping-cart');
    const aboutUsSection = document.getElementById('about-us');
    const contactDetailsSection = document.getElementById('contact-details');

    // Helper function to hide all content sections
    function hideAllSections() {
        productListingSection.classList.add('hidden');
        sidebarSection.classList.add('hidden');
        shoppingCartSection.classList.add('hidden');
        aboutUsSection.classList.add('hidden');
        contactDetailsSection.classList.add('hidden');
    }

    // Helper function to show a specific section
    // Note: For products/home, sidebar needs to be shown explicitly
    function showSection(sectionId) {
        hideAllSections();
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.remove('hidden');
        }
    }

    // Initial view: Show Products and Sidebar, hide others
    // (Handled by navigation setup below)

    // Cart array
    let cart = [];

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
    const paymentSection = document.getElementById('payment-section');
    const confirmPaymentBtn = document.getElementById('confirm-payment-btn');
    const backToCartBtn = document.getElementById('back-to-cart-btn');


    // Sample Laptop Data
    const laptops = [
        {
            id: 1,
            name: "Dell XPS 15",
            price: 180000,
            image: "https://via.placeholder.com/200x150.png?text=Dell+XPS+15",
            description: "Powerful and sleek laptop for professionals.",
            specifications: { RAM: "16GB", Storage: "512GB SSD", Processor: "Intel Core i7" }
        },
        {
            id: 2,
            name: "MacBook Pro 16",
            price: 250000,
            image: "https://via.placeholder.com/200x150.png?text=MacBook+Pro+16",
            description: "Top-tier performance for creative workflows.",
            specifications: { RAM: "16GB", Storage: "1TB SSD", Processor: "Apple M1 Pro" }
        },
        {
            id: 3,
            name: "HP Spectre x360",
            price: 165000,
            image: "https://via.placeholder.com/200x150.png?text=HP+Spectre+x360",
            description: "Versatile 2-in-1 laptop with a stunning display.",
            specifications: { RAM: "16GB", Storage: "512GB SSD", Processor: "Intel Core i7" }
        },
        {
            id: 4,
            name: "Lenovo IdeaPad Slim 5",
            price: 85000,
            image: "https://via.placeholder.com/200x150.png?text=Lenovo+IdeaPad",
            description: "Affordable and reliable for everyday use.",
            specifications: { RAM: "8GB", Storage: "256GB SSD", Processor: "AMD Ryzen 5" }
        },
        {
            id: 5,
            name: "Asus ROG Strix G15",
            price: 220000,
            image: "https://via.placeholder.com/200x150.png?text=Asus+ROG+Strix",
            description: "High-performance gaming laptop.",
            specifications: { RAM: "16GB", Storage: "1TB SSD", Processor: "AMD Ryzen 9", Graphics: "NVIDIA RTX 3070" }
        },
        {
            id: 6,
            name: "Acer Swift 3",
            price: 78000,
            image: "https://via.placeholder.com/200x150.png?text=Acer+Swift+3",
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
            productItem.className = 'product-item'; // For styling individual product items
            productItem.innerHTML = `
                <img src="${laptop.image}" alt="${laptop.name}" style="width:100%; max-width:200px; height:auto; margin-bottom:10px;">
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
                // For now, just log that it's already there. Future: increment quantity.
                console.log(`Product "${productToAdd.name}" is already in the cart.`);
                alert(`"${productToAdd.name}" is already in your cart!`);
            } else {
                cart.push({...productToAdd, quantity: 1 }); // Add product with quantity 1
                console.log(`Product "${productToAdd.name}" added to cart.`);
                alert(`"${productToAdd.name}" has been added to your cart!`);
            }
            console.log("Current cart:", cart);
            renderCart(); // Update cart display
        } else {
            console.error(`Product with ID ${productIdNum} not found.`);
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
                    <span>${item.name} (Quantity: ${item.quantity})</span>
                    <span>NPR ${item.price.toLocaleString()}</span>
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
            alert(`"${removedItem.name}" has been removed from your cart.`);
        } else {
            console.log(`Product with ID ${productIdNum} not found in cart.`);
        }
        renderCart(); // Update cart display
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
            // Optional: Extend to search specifications
            // const specsMatch = Object.values(laptop.specifications).some(spec => 
            //     String(spec).toLowerCase().includes(query)
            // );
            return nameMatch || descriptionMatch; // || specsMatch;
        });

        renderProducts(searchedLaptops);
    }

    // Event Listener for Search button
    if (searchBtn) {
        searchBtn.addEventListener('click', searchProducts);
    }

    // Event Listener for "Proceed to Checkout" button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            hideAllSections(); // Hide product listing, sidebar, cart, about, contact
            if(paymentSection) paymentSection.classList.remove('hidden'); // Show payment section
            // Note: Current hideAllSections also hides shoppingCartSection, which contains checkoutBtn.
            // If paymentSection is considered part of the "main content" that should be hidden by hideAllSections,
            // then we need to make sure paymentSection is also added to hideAllSections logic or handled separately.
            // For now, explicitly showing paymentSection after hideAllSections works.
        });
    }

    // Event Listener for "Confirm Payment" button
    if (confirmPaymentBtn) {
        confirmPaymentBtn.addEventListener('click', () => {
            // Simulate payment
            alert("Payment Successful! Thank you for your order.");

            cart = []; // Clear the cart array
            renderCart(); // Update the cart display (will show empty cart and hide checkout button)

            hideAllSections(); // Hide all sections including payment section
            if(paymentSection) paymentSection.classList.add('hidden'); // Ensure payment section is hidden
            if(productListingSection) productListingSection.classList.remove('hidden'); // Show product listing
            if(sidebarSection) sidebarSection.classList.remove('hidden'); // Show sidebar
        });
    }

    // Event Listener for "Back to Cart" button
    if (backToCartBtn) {
        backToCartBtn.addEventListener('click', () => {
            if(paymentSection) paymentSection.classList.add('hidden'); // Hide payment section
            if(shoppingCartSection) shoppingCartSection.classList.remove('hidden'); // Show cart section
            renderCart(); // Re-render cart to ensure it's up-to-date
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

    if (navLinks.home) {
        navLinks.home.addEventListener('click', (e) => {
            e.preventDefault();
            showHomeOrProducts();
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

    // Initial Page Load View
    hideAllSections(); // Hide all sections initially
    if(paymentSection) paymentSection.classList.add('hidden'); // Ensure payment section is hidden
    showHomeOrProducts(); // Show product listing and sidebar
    if(navLinks.products) setActiveNavLink(navLinks.products); // Set Products as active nav link by default
});
