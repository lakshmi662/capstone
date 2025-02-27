export default function decorate(block) {
    async function fetchAndDisplayProducts() {
        try {
            if (!window.cachedJsonUrl) {
                const jsonLink = document.querySelector("a[href$='.json']");
                if (!jsonLink) return;
                window.cachedJsonUrl = jsonLink.href;
            }
            
            const response = await fetch(window.cachedJsonUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            const productContainer = block.querySelector(".productlist > div > div");
            if (!productContainer) return;
            
            productContainer.innerHTML = "";
            
            const getProductsPerSlide = () => (window.innerWidth >= 900 ? 5 : window.innerWidth >= 600 ? 3 : 2);
            const productsPerSlide = getProductsPerSlide();
            const totalSlides = Math.ceil(data.data.length / productsPerSlide);
            
            for (let i = 0; i < totalSlides; i++) {
                const slide = document.createElement("div");
                slide.classList.add("product-slide");
                
                data.data.slice(i * productsPerSlide, (i + 1) * productsPerSlide).forEach(product => {
                    const productCard = document.createElement("div");
                    productCard.classList.add("product-card");
                    
                    productCard.innerHTML = `
                    <a href="${product.path}" class="product-link">
                        <img src="${product.productimage}" alt="${product.productname}" class="product-image">
                        <h2 class="product-title">${product.productname}</h2>
                    </a>
                    <p class="product-price">${product.productprice}</p>
                    <button class="add-to-cart">ADD TO CART</button>
                    <svg class="wishlist-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1 7.8 7.8 7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"></path>
                    </svg>
                `;
                    slide.appendChild(productCard);
                });
                productContainer.appendChild(slide);
            }
            addCarousel(totalSlides);
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    }

    function addCarousel(totalSlides) {
        const container = block.querySelector(".productlist > div > div");
        const slides = block.querySelectorAll(".product-slide");
        let currentIndex = 0;
        
        const wrapper = document.createElement("div");
        wrapper.classList.add("carousel-wrapper");
        container.parentNode.insertBefore(wrapper, container);
        wrapper.appendChild(container);
        
        const dotsContainer = document.createElement("div");
        dotsContainer.classList.add("dots-container");
        
        for (let i = 0; i < (window.innerWidth >= 900 ? 2 : 5); i++) {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            
            dot.addEventListener("click", () => {
                currentIndex = i;
                updateSlide();
            });
            dotsContainer.appendChild(dot);
        }
        wrapper.appendChild(dotsContainer);
        
        function updateSlide() {
            slides.forEach((slide, index) => {
                slide.style.display = index === currentIndex ? "flex" : "none";
            });
            block.querySelectorAll(".dot").forEach((dot, index) => {
                dot.classList.toggle("active", index === currentIndex);
            });
        }
        
        container.style.display = "flex";
        container.style.overflow = "hidden";
        container.style.width = "100%";
        slides.forEach(slide => {
            slide.style.display = "none";
            slide.style.justifyContent = "space-between";
            slide.style.width = "100%";
        });
        updateSlide();
    }
    
    fetchAndDisplayProducts();
    window.addEventListener("resize", fetchAndDisplayProducts);
}
