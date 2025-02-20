async function fetchAndDisplayProducts() {
    try {
        const response = await fetch("http://localhost:3000/product.json");
        const data = await response.json();

        const productContainer = document.querySelector(".productlist > div > div");
        
        if (!productContainer) {
            console.error("Error: Product container not found.");
            return;
        }

        if (data.data && data.data.length > 0) {
            productContainer.innerHTML = ""; // Clear previous content

            data.data.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("product-card");

                productCard.innerHTML = `
                    <img src="${product.productimage}" alt="${product.productname}" class="product-image">
                    <h2 class="product-title">${product.productname}</h2>
                    <p class="product-price">$${product.productprice}</p>
                    <button class="add-to-cart">ADD TO CART</button>
                    <svg class="wishlist-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1 7.8 7.8 7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"></path>
                        </svg>
                `;

                productContainer.appendChild(productCard);
            });
        } else {
            productContainer.innerHTML = "<p>No products available.</p>";
        }
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
}

// Call the function
fetchAndDisplayProducts();
