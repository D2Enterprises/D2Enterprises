// Example: Animation on scroll
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    let scrollPosition = window.scrollY;

    hero.style.backgroundPositionY = -scrollPosition / 2 + 'px';
});
if (!name || !address || !phone) {
    alert("Please complete all fields.");
    return;
}
const images = [
    "sambar-96-256.img",
    "anotherproduct-120-342.img",
    "productname-50-123.img"
];

function generateProductCards() {
    const productContainer = document.getElementById('product-container');

    images.forEach(image => {
        // Split the filename into parts
        const parts = image.split('-');
        const name = parts[0];
        const price = parts[1];
        const number = parts[2].split('.')[0];

        // Create the HTML for the product card
        const productCard = `
            <div class="product-card">
                <img src="images/${image}" alt="Product ${number}">
                <h2>${name}</h2>
                <p>$${price}</p>
                <button onclick="addToCart('${name}', ${price})">Add to Cart</button>
            </div>
        `;

        // Append the product card to the container
        productContainer.innerHTML += productCard;
    });
}

// Call the function to generate the product cards
generateProductCards();

