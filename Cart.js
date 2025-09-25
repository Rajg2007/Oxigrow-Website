// Fetch existing orders
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Elements
const cartList = document.getElementById('cartList');
const addBtn = document.getElementById('addOrder');

// Display orders
function displayCart() {
  cartList.innerHTML = '';
  orders.forEach((order, i) => {
    const li = document.createElement('li');
    li.textContent = `${order.product} x ${order.quantity} by ${order.customer}`;
    cartList.appendChild(li);
  });
}

// Add new order
addBtn.addEventListener('click', () => {
  const product = document.getElementById('product').value.trim();
  const quantity = parseInt(document.getElementById('quantity').value);
  const customer = document.getElementById('customer').value.trim();

  if (!product || !customer || quantity <= 0) return alert("Please fill all fields correctly");

  orders.push({ product, quantity, customer });
  localStorage.setItem('orders', JSON.stringify(orders));
  displayCart();

  // Clear inputs
  document.getElementById('product').value = '';
  document.getElementById('quantity').value = 1;
  document.getElementById('customer').value = '';
});

// Initial display
displayCart();
