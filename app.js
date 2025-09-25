// app.js - main logic (vanilla JS) for product listing, cart and checkout.
// Keep code style similar to student's original but structured.

const PRODUCTS = [
  { id: 'p20', name: '20 Litre Water Bottle', price: 350, stock: 20 },
  { id: 'p5',  name: '5 Litre Water Bottle',  price: 120, stock: 50 },
  { id: 'p1',  name: '1 Litre Pack (12)',      price: 240, stock: 80 }
];

function $(id){return document.getElementById(id)}
function showSection(section){
  const content = $('content');
  if(section === 'home' || section === 'products'){
    content.innerHTML = `<h2>Our Products</h2><div class="products-grid" id="products"></div>`;
    renderProducts();
    updateCartCount();
  } else if(section === 'cart'){
    renderCart();
  } else if(section === 'about'){
    content.innerHTML = `<h2>About Us</h2><p>SHREE SAMARTH INDUSTRIES has been producing potable packaged water for over 8 years. We focus on hygiene and timely delivery.</p>`;
  } else if(section === 'contact'){
    content.innerHTML = `<h2>Contact</h2><p>Email: oxigrow@example.com<br/>Phone: +91 90000 00000</p>`;
  }
}

// Render products dynamically
function renderProducts(){
  const container = document.getElementById('products');
  container.innerHTML = '';
  PRODUCTS.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `<h3>${p.name}</h3>
                    <p>Price: ₹${p.price}</p>
                    <p>Stock: ${p.stock}</p>
                    <button ${p.stock===0?'disabled':''} onclick="addToCart('${p.id}')">Add to Cart</button>`;
    container.appendChild(div);
  });
}

// CART helpers using localStorage
function getCart(){ return JSON.parse(localStorage.getItem('cart')) || []; }
function saveCart(cart){ localStorage.setItem('cart', JSON.stringify(cart)); }
function updateCartCount(){
  const count = getCart().reduce((s,i)=>s+i.qty,0);
  const el = document.querySelector('#cartCount');
  if(el) el.textContent = count;
}

// add to cart (increments qty if exists)
function addToCart(productId){
  const product = PRODUCTS.find(p=>p.id===productId);
  if(!product) return alert('Product not found');
  let cart = getCart();
  const existing = cart.find(i=>i.productId===productId);
  if(existing){
    if(existing.qty+1 > product.stock) return alert('Not enough stock');
    existing.qty += 1;
  } else {
    cart.push({ productId, name: product.name, price: product.price, qty: 1 });
  }
  saveCart(cart);
  updateCartCount();
  alert(product.name + ' added to cart!');
}

// Render cart and checkout form
function renderCart(){
  const content = $('content');
  const cart = getCart();
  if(cart.length === 0){
    content.innerHTML = '<h2>Your cart is empty</h2><p><a href="#" onclick="showSection(\'products\')">Browse products</a></p>';
    updateCartCount();
    return;
  }
  let html = '<h2>Your Cart</h2><ul class="cart-list">';
  let total = 0;
  cart.forEach((item,idx)=>{
    total += item.price * item.qty;
    html += `<li class="cart-item">${item.name} — ₹${item.price} x ${item.qty}
             <span><button onclick="changeQty(${idx}, -1)">-</button>
             <button onclick="changeQty(${idx}, 1)">+</button>
             <button onclick="removeFromCart(${idx})">Remove</button></span></li>`;
  });
  html += `</ul><p>Total: ₹${total.toFixed(2)}</p>`;
  html += `<h3>Checkout</h3>
    <form id="checkoutForm" onsubmit="placeOrder(event)">
      <div class="form-row"><input name="name" placeholder="Full name" required></div>
      <div class="form-row"><input name="phone" placeholder="Phone (10 digits)" required></div>
      <div class="form-row"><input name="email" placeholder="Email"></div>
      <div class="form-row"><textarea name="address" placeholder="Delivery address" required></textarea></div>
      <div class="form-row"><button class="primary" type="submit">Place order</button></div>
    </form>`;
  content.innerHTML = html;
  updateCartCount();
}

function changeQty(index, delta){
  const cart = getCart();
  if(!cart[index]) return;
  const product = PRODUCTS.find(p=>p.id===cart[index].productId);
  const newQty = cart[index].qty + delta;
  if(newQty <= 0){ cart.splice(index,1); }
  else if(newQty > product.stock){ alert('Not enough stock'); return; }
  else cart[index].qty = newQty;
  saveCart(cart);
  renderCart();
}

function removeFromCart(index){
  const cart = getCart();
  cart.splice(index,1);
  saveCart(cart);
  renderCart();
}

// validate simple inputs
function isValidPhone(v){ return /^\d{10}$/.test(v); }
function placeOrder(event){
  event.preventDefault();
  const form = event.target;
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const email = form.email.value.trim();
  const address = form.address.value.trim();
  if(!name || !address) return alert('Please fill name and address');
  if(!isValidPhone(phone)) return alert('Enter a valid 10-digit phone number');
  const cart = getCart();
  if(cart.length===0) return alert('Cart empty');
  // reduce stock locally (demo). For production use backend transaction.
  for(const item of cart){
    const product = PRODUCTS.find(p=>p.id===item.productId);
    if(item.qty > product.stock) return alert('Insufficient stock for ' + product.name);
    product.stock -= item.qty;
  }
  // Save order to localStorage 'orders' (demo). Replace with Firestore write if configured.
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const order = {
    id: 'ORD' + Date.now(),
    name, phone, email, address, items: cart, total: cart.reduce((s,i)=>s+i.price*i.qty,0),
    date: new Date().toISOString(), status: 'Pending'
  };
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.removeItem('cart');
  alert('Order placed! Your order id: ' + order.id);
  showSection('home');
}

// initial landing
showSection('home');
