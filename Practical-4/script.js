// ==========================================
// SHOP EASE ONLINE STORE
// PRACTICAL 4 - DOM & EVENT HANDLING
// ==========================================


// ==========================================
// 1. getElementById()
// ==========================================

let welcomeButton = document.getElementById("welcomeButton");
let customerName = document.getElementById("customerName");
let message = document.getElementById("message");



// ==========================================
// 2. getElementsByClassName()
// ==========================================

let products = document.getElementsByClassName("product");

for (let i = 0; i < products.length; i++) {

    products[i].addEventListener("mouseover", function () {
        products[i].style.backgroundColor = "pink";
    });

    products[i].addEventListener("mouseout", function () {
        products[i].style.backgroundColor = "";
    });

}


// ==========================================
// 3. getElementsByTagName()
// ==========================================

let productNames = document.getElementsByTagName("h3");

for (let i = 0; i < productNames.length; i++) {
    productNames[i].style.color = "darkblue";
}


// ==========================================
// 4. querySelector()
// ==========================================

let firstPrice = document.querySelector(".price");

firstPrice.textContent = "₹48,000";


// ==========================================
// 5. querySelectorAll()
// ==========================================

let allPrices = document.querySelectorAll(".price");

allPrices.forEach(function (price) {
    price.style.color = "green";
});


// ==========================================
// 6. Modify HTML Content
// ==========================================

let feedbackHeading = document.querySelector("#feedback h2");

feedbackHeading.textContent = "Customer Feedback";


// ==========================================
// 7. Modify HTML Attributes
// ==========================================

let productImage = document.querySelector("#productImage");

productImage.setAttribute("alt", "Laptop Product");
productImage.setAttribute("width", "200");


// ==========================================
// 8. Modify CSS Styles
// ==========================================

let interactionSection = document.querySelector("#interaction");

interactionSection.style.padding = "20px";


// ==========================================
// 9. Create and Append Element
// ==========================================

let productsSection = document.querySelector("#products");

let newProductMessage = document.createElement("p");

newProductMessage.textContent =
    "Free delivery available on all products!";

productsSection.appendChild(newProductMessage);


// ==========================================
// 10. Remove Element
// ==========================================

setTimeout(function () {
    newProductMessage.remove();
}, 5000);


// ==========================================
// 11. Replace Element
// ==========================================

let oldMessage = document.querySelector("#ratingMessage");

let newMessage = document.createElement("p");

newMessage.textContent =
    "Please select a rating to give your feedback.";

newMessage.id = "ratingMessage";

oldMessage.replaceWith(newMessage);

let ratingMessage = document.getElementById("ratingMessage");


// ==========================================
// 12. Double-Click Event
// ==========================================

let laptopProduct = document.querySelector(".product");

laptopProduct.addEventListener("dblclick", function () {
    alert("You selected the Laptop!");
});


// ==========================================
// 13. Keyboard Events
// ==========================================

customerName.addEventListener("keydown", function () {
    message.textContent = "You are typing...";
});


// ==========================================
// 14. Change Event
// ==========================================

let ratingSelect = document.querySelector("#rating");

ratingSelect.addEventListener("change", function () {

    let rating = Number(ratingSelect.value);

    if (rating === 5) {
        ratingMessage.textContent =
            "Excellent! Thank you for your feedback.";
    }
    else if (rating === 4) {
        ratingMessage.textContent =
            "Very Good! We appreciate your feedback.";
    }
    else if (rating === 3) {
        ratingMessage.textContent =
            "Good! Thank you for your feedback.";
    }
    else if (rating === 2) {
        ratingMessage.textContent =
            "We will try to improve our service.";
    }
    else if (rating === 1) {
        ratingMessage.textContent =
            "We are sorry. We will work to improve.";
    }
    else {
        ratingMessage.textContent =
            "Please select a rating.";
    }

});


// ==========================================
// 15. Theme Toggle
// ==========================================

let themeButton = document.querySelector("#themeButton");

let darkMode = false;

themeButton.addEventListener("click", function () {

    if (darkMode === false) {

        document.body.classList.add("dark-mode");

        themeButton.textContent = "Light Mode";

        darkMode = true;

    }
    else {

        document.body.classList.remove("dark-mode");

        themeButton.textContent = "Dark Mode";

        darkMode = false;

    }

});

// ==========================================
// 16. Image Interaction
// ==========================================

let imageEnlarged = false;

productImage.addEventListener("click", function () {

    if (imageEnlarged === false) {

        productImage.style.width = "300px";

        message.textContent =
            "Laptop image enlarged!";

        productImage.setAttribute(
            "alt",
            "ShopEase Laptop Product Image"
        );

        imageEnlarged = true;

    }
    else {

        productImage.style.width = "200px";

        message.textContent =
            "Laptop image restored!";

        imageEnlarged = false;

    }

});


// ==========================================
// 17. Product Selection
// ==========================================

let productButtons =
    document.querySelectorAll(".product button");

productButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        let product = button.parentElement;

        let productName =
            product.querySelector("h3").textContent;

        let productPrice =
            product.querySelector(".price").textContent;

        message.textContent =
            "Selected: " +
            productName +
            " | Price: " +
            productPrice;

    });

});


// ==========================================
// 18. Live Character Count
// ==========================================

customerName.addEventListener("keyup", function () {

    let nameLength =
        customerName.value.length;

    message.textContent =
        "Characters entered: " +
        nameLength;

});


// ==========================================
// 19. Customer Name Validation
// ==========================================

welcomeButton.addEventListener("click", function () {

    let name = customerName.value.trim();

    if (name === "") {

        message.textContent =
            "Please enter your name.";

    }
    else {

        message.textContent =
            "Welcome to ShopEase, " +
            name +
            "!";

    }

});


// ==========================================
// 20. Dynamic Product Creation
// ==========================================

let newProduct = document.createElement("div");

newProduct.className = "product";

newProduct.innerHTML = `
    <h3>Smart Watch</h3>
    <p class="price">₹5,000</p>
    <button>View Product</button>
`;

let productList =
    document.querySelector(".product-list");

productList.appendChild(newProduct);


// ==========================================
// 21. Smart Watch Button
// ==========================================

let newProductButton =
    newProduct.querySelector("button");

newProductButton.addEventListener("click", function () {

    let productName =
        newProduct.querySelector("h3").textContent;

    let productPrice =
        newProduct.querySelector(".price").textContent;

    message.textContent =
        "Selected: " +
        productName +
        " | Price: " +
        productPrice;

});


// ==========================================
// 22. Remove Smart Watch
// ==========================================

let removeButton =
    document.createElement("button");

removeButton.textContent =
    "Remove Product";

newProduct.appendChild(removeButton);

removeButton.addEventListener("click", function () {

    newProduct.remove();

});


// ==========================================
// 23. Dynamic Menu
// ==========================================

let menu = document.createElement("ul");

let homeItem = document.createElement("li");
homeItem.textContent = "Home";

let productsItem = document.createElement("li");
productsItem.textContent = "Products";

let contactItem = document.createElement("li");
contactItem.textContent = "Contact";

menu.appendChild(homeItem);
menu.appendChild(productsItem);
menu.appendChild(contactItem);

document.body.insertBefore(
    menu,
    document.body.firstChild
);


// ==========================================
// 24. Dynamic Menu Interaction
// ==========================================

productsItem.addEventListener("click", function () {

    productsSection.scrollIntoView({
        behavior: "smooth"
    });

});


// ==========================================
// 25. Shopping Cart
// ==========================================

let cartHeading =
    document.createElement("h2");

cartHeading.textContent =
    "Shopping Cart";

let cart =
    document.createElement("div");

cart.id = "cart";

productsSection.appendChild(cartHeading);
productsSection.appendChild(cart);


// ==========================================
// 26. Cart Count
// ==========================================

let cartCount =
    document.createElement("p");

cartCount.textContent =
    "Items in Cart: 0";

cartHeading.after(cartCount);


// ==========================================
// 27. Add Products to Cart
// ==========================================

productButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        let product = button.parentElement;

        let productName =
            product.querySelector("h3").textContent;

        let productPrice =
            product.querySelector(".price").textContent;

        let cartItem =
            document.createElement("p");

        cartItem.textContent =
            productName +
            " - " +
            productPrice;

        cart.appendChild(cartItem);

        cartCount.textContent =
            "Items in Cart: " +
            cart.children.length;

    });

});


// ==========================================
// 28. Remove Cart Item
// ==========================================

cart.addEventListener("dblclick", function (event) {

    if (event.target.tagName === "P") {

        event.target.remove();

        cartCount.textContent =
            "Items in Cart: " +
            cart.children.length;

    }

});


// ==========================================
// 29. Dynamic Product Details
// ==========================================

let productDetails =
    document.createElement("p");

productDetails.textContent =
    "Click a product to view its details.";

productList.after(productDetails);

document.querySelectorAll(".product")
    .forEach(function (product) {

        product.addEventListener("click", function () {

            let name =
                product.querySelector("h3").textContent;

            let price =
                product.querySelector(".price").textContent;

            productDetails.textContent =
                "Product: " +
                name +
                " | Price: " +
                price;

        });

    });


// ==========================================
// 30. Dynamic Status Message
// ==========================================

let statusMessage =
    document.createElement("p");

statusMessage.textContent =
    "ShopEase is ready for shopping!";

interactionSection.appendChild(statusMessage);