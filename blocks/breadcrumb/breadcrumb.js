export default function decorate(block) {
    const productName = document.querySelector(".details-wrapper .details p").textContent;
    block.innerHTML = `<span class="breadcrumb-item"><a href="/">Home</a></span>/<span class="breadcrumb-item">${productName}</span>`;
}