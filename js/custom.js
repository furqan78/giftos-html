// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

 // Function to show product details in modal
 function showProductDetails(productId) {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id == productId);

            if (product) {
                // Update modal content
                document.getElementById('modal-product-name').textContent = product.name;
                document.getElementById('modal-product-price').textContent = `$${product.price}`;
                document.getElementById('modal-product-description').textContent = product.description;
                document.getElementById('modal-product-image').src = product.image;
                document.getElementById('share-whatsapp').href = `https://api.whatsapp.com/send?phone=YOUR_BUSINESS_NUMBER&text=Check out this product: ${product.name}%0APrice: $${product.price}%0A${window.location.href}`;

                // Show modal
                $('#productModal').modal('show');
            } else {
                console.error('Product not found:', productId);
            }
        })
        .catch(error => console.error('Error loading product details:', error));
}

getYear();

// owl carousel 

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 6
        }
    }
})

// Fetch and display products
fetch('../products.json')
.then(response => response.json())
.then(products => {
    const productList = document.getElementById('product-list');

    products.forEach(product => {
        // Create product card
        const productCard = document.createElement('div');
        productCard.classList.add('col-sm-6', 'col-md-4', 'col-lg-3');
        productCard.innerHTML = `
            <div class="box" data-product-id="${product.id}">
                <div class="img-box">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="detail-box">
                    <h6>${product.name}</h6>
                    <h6>Price <span>$${product.price}</span></h6>
                </div>
                ${product.isNew ? '<div class="new"><span>New</span></div>' : ''}
            </div>
        `;
        productList.appendChild(productCard);
    });

    // Add click event listener to each product card
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click', () => {
            const productId = box.dataset.productId;
            showProductDetails(productId);
        });
    });
})
.catch(error => console.error('Error fetching product data:', error));
