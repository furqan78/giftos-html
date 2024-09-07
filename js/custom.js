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
fetch('products.json')
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
                    <h6><span>₹${product.price}</span></h6>
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

document.getElementById('contact-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission
    const sendEmailButton = document.getElementById('send-email');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    switch (true) {
        case !name:
            alert("Please enter name");
            break;
        case name.length < 3:
            alert("Name should contains at least 3 characters");
            break;
        case !email:
            alert("please enter email");
            break;
        case !phone:
            alert("Please enter phone no");
            break;
        case phone.length != 10:
            alert("Please enter valid phone no");
            break;
        case !message:
            alert("Please enter message");
            break;
        case message.length < 20:
            alert("Message should contains at least 20 characters");
            break;
        default:
            sendEmailButton.setAttribute('disabled', true); // Disable the button
            sendEmailButton.innerText = "Loading...";
            // Create a data object
            const formData = {
                name: name,
                email: email,
                phone: phone,
                message: message,
                appname: "Yoursstyle Hub"
            };

            try {
                // Make a POST request to the API
                const response = await fetch('http://localhost:3000/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                // Check if the request was successful
                if (response.ok) {
                    alert('Your message has been sent successfully!');
                    // Optionally, reset the form
                    document.getElementById('contact-form').reset();
                    sendEmailButton.removeAttribute('disabled');
                    sendEmailButton.innerText = "SEND";
                } else {
                    alert('There was a problem sending your message. Please try again.');
                    sendEmailButton.removeAttribute('disabled');
                    sendEmailButton.innerText = "SEND";
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was a problem sending your message. Please try again.');
                sendEmailButton.removeAttribute('disabled');
                sendEmailButton.innerText = "SEND";
            }
            break;

    }
});
