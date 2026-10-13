const products = [
    {
        id: 1,
        name: "RGB Mechanical Keyboard",
        category: "Keyboard",
        price: 49.99,
        image: "images/keyboard1.jpg"
    },
    {
        id: 2,
        name: "Super Mini Keyboard",
        category: "Keyboard",
        price: 59.99,
        image: "images/keyboard2.jpg"
    },
    {
        id: 3,
        name: "RGB K70",
        category: "Keyboard",
        price: 69.99,
        image: "images/keyboard3.jpg"
    },
    {
        id: 4,
        name: "Classic Keyboard",
        category: "Keyboard",
        price: 45.99,
        image: "images/keyboard4.jpg"
    },
    {
        id: 5,
        name: "Gaming Keyboard Pro",
        category: "Keyboard",
        price: 79.99,
        image: "images/keyboard5.jpg"
    },
    {
        id: 6,
        name: "RGB Gaming Mouse",
        category: "Mouse",
        price: 29.99,
        image: "images/mouse1.jpg"
    },
    {
        id: 7,
        name: "Wireless Mouse",
        category: "Mouse",
        price: 39.99,
        image: "images/mouse2.jpg"
    },
    {
        id: 8,
        name: "Gaming Mouse Pro",
        category: "Mouse",
        price: 49.99,
        image: "images/mouse3.jpg"
    },
    {
        id: 9,
        name: "Gaming Headset",
        category: "Headset",
        price: 39.99,
        image: "images/headset1.jpg"
    },
    {
        id: 10,
        name: "Wireless Headset",
        category: "Headset",
        price: 49.99,
        image: "images/headset2.jpg"
    },
    {
        id: 11,
        name: "RGB Headset",
        category: "Headset",
        price: 59.99,
        image: "images/headset3.jpg"
    },
    {
        id: 12,
        name: "Premium Headset",
        category: "Headset",
        price: 69.99,
        image: "images/headset4.jpg"
    }
];


let cart = [];


/* SHOW PRODUCTS */

function showProducts(list = products) {

    const box = document.getElementById("productList");

    box.innerHTML = "";

    if (list.length === 0) {
        box.innerHTML = "<h3>No products found.</h3>";
        return;
    }

    list.forEach(product => {

        box.innerHTML += `
            <div class="product">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="productInfo">

                    <h3>${product.name}</h3>

                    <p>${product.category}</p>

                    <div class="productBottom">

                        <span class="price">
                            $${product.price.toFixed(2)}
                        </span>

                        <button
                            class="add"
                            onclick="addToCart(${product.id})"
                        >
                            + Cart
                        </button>

                    </div>

                </div>

            </div>
        `;
    });
}


/* ADD TO CART */

function addToCart(id) {

    const product = products.find(
        item => item.id === id
    );

    const existing = cart.find(
        item => item.id === id
    );

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    alert(product.name + " added to cart!");
}


/* UPDATE CART */

function updateCart() {

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.getElementById("cartCount").textContent = count;

    renderCart();
}


/* SHOW CART */

function renderCart() {

    const box = document.getElementById("cartItems");

    const totalBox = document.getElementById("total");

    box.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        box.innerHTML = "<p>Your cart is empty.</p>";

        totalBox.textContent = "$0.00";

        return;
    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        box.innerHTML += `
            <div class="cartItem">

                <img src="${item.image}">

                <div class="cartInfo">

                    <h4>${item.name}</h4>

                    <p>$${item.price.toFixed(2)}</p>

                </div>

                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>

                <button
                    class="remove"
                    onclick="removeFromCart(${item.id})"
                >
                    🗑
                </button>

            </div>
        `;
    });

    totalBox.textContent = "$" + total.toFixed(2);
}


/* CHANGE QUANTITY */

function changeQuantity(id, amount) {

    const item = cart.find(
        item => item.id === id
    );

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart = cart.filter(
            item => item.id !== id
        );
    }

    updateCart();
}


/* REMOVE */

function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    updateCart();
}


/* OPEN CART */

function openCart() {

    document
        .getElementById("cartModal")
        .classList.add("active");

}


/* CLOSE CART */

function closeCart() {

    document
        .getElementById("cartModal")
        .classList.remove("active");

}


/* LOGIN */

function openLogin() {

    document
        .getElementById("loginModal")
        .classList.add("active");

}


function closeLogin() {

    document
        .getElementById("loginModal")
        .classList.remove("active");

}


function login() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    const message =
        document.getElementById("loginMessage");

    if (!username || !password) {

        message.textContent =
            "Please enter username and password.";

        message.style.color = "red";

        return;
    }

    message.textContent =
        "Login successful!";

    message.style.color = "green";
}


/* SEARCH */

function searchProducts() {

    const text =
        document
            .getElementById("search")
            .value
            .toLowerCase();

    const result = products.filter(product =>
        product.name.toLowerCase().includes(text)
    );

    showProducts(result);
}


/* FILTER */

function filterProducts(category) {

    document.getElementById("category").value =
        category;

    if (category === "All") {

        showProducts(products);

    } else {

        const result = products.filter(
            product => product.category === category
        );

        showProducts(result);
    }
}


/* ORDER NOW */

function goProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* CHECKOUT */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    let total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    alert(
        "Order successful!\n\n" +
        "Total: $" +
        total.toFixed(2)
    );

    cart = [];

    updateCart();

    closeCart();
}


/* CLOSE MODAL */

window.onclick = function(event) {

    const cartModal =
        document.getElementById("cartModal");

    const loginModal =
        document.getElementById("loginModal");

    if (event.target === cartModal) {
        closeCart();
    }

    if (event.target === loginModal) {
        closeLogin();
    }
};


/* START */

showProducts();

updateCart();
