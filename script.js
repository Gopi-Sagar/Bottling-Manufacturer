const cartBtn = document.querySelector('.navbar-text img');
const cart = document.querySelector('.cart');
const cartItems = document.querySelector('.cart-items');
const totalPrice = document.querySelector('.total-price');
const checkoutBtn = document.querySelector('.checkout-btn');
const addToCartBtns = document.querySelectorAll('.add-to-cart');

let items = [];

function addItemToCart(item, quantity) {
  const index = items.findIndex(i => i.id === item.id);
  if (index >= 0) {
    items[index].quantity += quantity;
    const li = cartItems.children[index];
    li.querySelector('.item-quantity').textContent = items[index].quantity;
  } else {
    items.push({...item, quantity: quantity});
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="item-name">${item.name}</span>
      <span class="item-price">₹${item.price}</span>
      <span class="item-quantity">${quantity}</span>
    `;
    cartItems.appendChild(li);
  }
  updateTotalPrice();
}

function updateTotalPrice() {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  totalPrice.textContent = `Total Price: ₹${total}`;
}

function clearCart() {
  items = [];
  cartItems.innerHTML = '';
  totalPrice.textContent = 'Total Price: ₹ 0';
}

cartBtn.addEventListener('click', () => {
  cart.classList.toggle('open');
});

checkoutBtn.addEventListener('click', () => {
  alert('Thank you for your purchase!');
  clearCart();
});

addToCartBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const item = {
      id: btn.dataset.id,
      name: btn.parentElement.querySelector('.item-name').textContent,
      price: Number(btn.parentElement.querySelector('.item-price').textContent.slice(1))
    };
    const quantity = 1;
    addItemToCart(item, quantity);
  });
});

document.addEventListener('click', (event) => {
  if (!cart.contains(event.target) && !cartBtn.contains(event.target)) {
    cart.classList.remove('open');
  }
});
