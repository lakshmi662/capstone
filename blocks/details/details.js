export default function decorate(block) {
    block.children[1].classList.add('colorWrapper');
    block.querySelector('.colorWrapper').children[0].classList.add('colordetails');
    block.querySelector('.colorWrapper').children[1].classList.add('coloroptions');

    block.children[2].classList.add('sizeWrapper');
    block.querySelector('.sizeWrapper').children[0].classList.add('sizedetails');
    block.querySelector('.sizeWrapper').children[1].classList.add('sizeoptions');

    block.children[3].classList.add('quantityWrapper');
    block.querySelector('.quantityWrapper').children[0].classList.add('quantitydetails');
    block.querySelector('.quantityWrapper').children[1].classList.add('quantityselector');
    block.querySelector('.quantityselector').innerHTML = `
        <button class="decrease">-</button>
        <span>1</span>
        <button class="increase">+</button>
    `;

    console.log(block.children[1]);

    const mainImage = document.querySelector(".image-wrapper img");
    const thumbnails = document.querySelectorAll(".thumbnail-container img");

    thumbnails.forEach(thumbnail => {
        thumbnail?.addEventListener("click", function () {
            mainImage.src = this.src;
            thumbnails.forEach(img => img.classList.remove("active"));
            this.classList.add("active");
        });
    });

    const decreaseBtn = block.querySelector(".quantityselector .decrease");
    const increaseBtn = block.querySelector(".quantityselector .increase");
    const quantitySpan = block.querySelector(".quantityselector span");

    let quantity = 1;

    decreaseBtn?.addEventListener("click", function () {
        if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
        }
    });

    increaseBtn?.addEventListener("click", function () {
        quantity++;
        quantitySpan.textContent = quantity;
    });

    const colorOptions = block.querySelectorAll(".coloroptions p");
    const sizeOptions = block.querySelectorAll(".sizeoptions p");

    colorOptions.forEach(option => {
        option?.addEventListener("click", function () {
            colorOptions.forEach(opt => opt.classList.remove("selected"));
            this.classList.add("selected");
            block.querySelector('.colordetails p:last-child').innerHTML = `Selected Color: ${option.innerText}`;
        });
    });

    sizeOptions.forEach(option => {
        option?.addEventListener("click", function () {
            sizeOptions.forEach(opt => opt.classList.remove("selected"));
            this.classList.add("selected");
            block.querySelector('.sizedetails p:last-child').innerHTML = `Selected Size: ${option.innerText}`;
        });
    });

    const addToCartBtn = block.querySelector(".add-to-cart button");

    addToCartBtn?.addEventListener("click", function () {
        const selectedColor = block.querySelector(".coloroptions p.selected");
        const selectedSize = block.querySelector(".sizeoptions p.selected");

        if (!selectedColor || !selectedSize) {
            alert("Please select a color and size before adding to cart.");
            return;
        }

        alert(`Added ${quantity} item(s) in ${selectedColor.textContent} color and ${selectedSize.textContent} size to cart!`);
    });

    console.log(block);
}
