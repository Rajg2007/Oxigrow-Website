// Fetch existing orders
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Elements
const cartList = document.getElementById('cartList');
const addBtn = document.getElementById('addOrder');
const productInput = document.getElementById('product');
const quantityInput = document.getElementById('quantity');
const customerInput = document.getElementById('customer');

// Display orders
function displayCart() {
  cartList.innerHTML = '';
  orders.forEach((order, i) => {
    const li = document.createElement('li');
    li.textContent = `${order.product} x ${order.quantity} by ${order.customer}`;
    cartList.appendChild(li);
  });
  
  // Scroll to the last order
  if (orders.length > 0) {
    cartList.lastChild.scrollIntoView({ behavior: 'smooth' });
  }
}

// Add new order
addBtn.addEventListener('click', () => {
  const product = productInput.value.trim();
  const quantity = parseInt(quantityInput.value);
  const customer = customerInput.value.trim();

  if (!product || !customer || quantity <= 0) {
    return alert("Please fill all fields correctly");
  }

  orders.push({ product, quantity, customer });
  localStorage.setItem('orders', JSON.stringify(orders));
  displayCart();

  // Clear inputs and focus on product
  productInput.value = '';
  quantityInput.value = 1;
  customerInput.value = '';
  productInput.focus();
});

// Initial display
displayCart();
