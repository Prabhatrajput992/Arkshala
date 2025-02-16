// Active navbar
document.addEventListener('DOMContentLoaded', function() {
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-links a');
    menuItem.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add('active');
        }
    });
});

// Slider
let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll(".slide");
    slides.forEach(slide => slide.style.display = "none");

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

showSlides();

// Review slide
document.addEventListener("DOMContentLoaded", function () {
    const reviewsContainer = document.querySelector('.reviews-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    reviewsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        reviewsContainer.classList.add('active');
        startX = e.pageX - reviewsContainer.offsetLeft;
        scrollLeft = reviewsContainer.scrollLeft;
    });

    reviewsContainer.addEventListener('mouseleave', () => {
        isDown = false;
        reviewsContainer.classList.remove('active');
    });

    reviewsContainer.addEventListener('mouseup', () => {
        isDown = false;
        reviewsContainer.classList.remove('active');
    });

    reviewsContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - reviewsContainer.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        reviewsContainer.scrollLeft = scrollLeft - walk;
    });
});

// Function animation value
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    const timer = setInterval(function() {
        current += increment;
        obj.textContent = current + (id === 'purity' ? '%' : '');
        
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

window.onload = function() {
    animateValue("years", 0, 25, 2000);
    animateValue("customers", 0, 500, 2000);
    animateValue("products", 0, 800, 2000);
    animateValue("purity", 0, 100, 2000);
};

// Cart Functionality 
let products = [];
let currentPage = 1;
const itemsPerPage = 10;
let cart = [];

// Fetch product data from JSON file
fetch('product.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        renderProducts();
        updatePaginationButtons();
    })
    .catch(error => console.error("Error loading products:", error));

function renderProducts(filteredProducts = products) {
    const productContainer = document.getElementById("productGrid");
    productContainer.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = filteredProducts.slice(start, end);

    paginatedItems.forEach(product => {
        const card = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">₹${product.price}</p>
                    <div class="rating">⭐ ${product.rating}</div>
                </div>
                <div class="product-actions">
                    <a href="${product.navigateUrl}" target="_blank" class="buy-now">Buy Now</a>
                    <button class="add-to-cart" onclick="addToCart('${product.name}', 1)">Add to Cart</button>
                </div>
            </div>
        `;
        productContainer.innerHTML += card;
    });

    updatePaginationButtons(filteredProducts);
}

function updatePaginationButtons(filteredProducts = products) {
    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage >= Math.ceil(filteredProducts.length / itemsPerPage);
}

function changePage(step) {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    if (currentPage + step >= 1 && currentPage + step <= totalPages) {
        currentPage += step;
        renderProducts();
        updatePaginationButtons();
    }
}

function searchProducts() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
    currentPage = 1;
    renderProducts(filteredProducts);
    updatePaginationButtons(filteredProducts);
}

function addToCart(productName, quantity) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += quantity;
    } else {
        cart.push({ name: productName, quantity });
    }
    updateCartCount();
}

function updateCartCount() {
    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Search icon
function toggleSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput.style.display === 'none' || searchInput.style.display === '') {
        searchInput.style.display = 'block';
        searchInput.focus();
    } else {
        searchInput.style.display = 'none';
    }
}

// Toggle menu icon
function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}
