const products = [
  { id: 1, name: "Smartphone", price: 299.99, image: "images/phone.jpg" },
  { id: 2, name: "Headphones", price: 99.99, image: "images/headphones.jpg" },
  { id: 3, name: "Smartwatch", price: 199.99, image: "images/watch.jpg" },
  { id: 4, name: "Laptop", price: 899.99, image: "images/laptop.jpg" }
];

const productContainer = document.getElementById("product-container");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts() {
  productContainer.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productContainer.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    cartItemsContainer.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);

  localStorage.setItem("cart", JSON.stringify(cart));
}

clearCartBtn.addEventListener("click", () => {
  cart = [];
  updateCart();
});



document.body.classList.add('dark-theme');

renderProducts();
updateCart();
