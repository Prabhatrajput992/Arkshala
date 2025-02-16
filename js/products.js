document.addEventListener('DOMContentLoaded', function() {
    fetch('product.json')
        .then(response => response.json())
        .then(products => {
            const productContainer = document.getElementById('product-container');
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product';
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>Price: $${product.price}</p>
                    <p>Rating: ${product.rating}</p>
                    <a href="${product.navigateUrl}">View Product</a>
                `;
                productContainer.appendChild(productElement);
            });
        });
});
