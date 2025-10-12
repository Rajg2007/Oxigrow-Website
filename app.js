// app.js - main logic (vanilla JS) for product listing, cart and checkout.
// Keep code style similar to student's original but structured.

const PRODUCTS = [
  { id: 'p20', name: '20 Litre Water Bottle', price: 100, stock: 20 },
  { id: 'p10',  name: '10 Litre Water Bottle',  price: 90, stock: 50 },
  { id: 'p5'  ,  name:    '5 Litre Water Bottle', price: 75, stock: 80 },
  { id: 'p2'   ,  name:     '2 Litre Pack (12)',   price: 480, stock: 80 },
  { id: 'p1'    ,  name:       '1 Litre Pack (12)', price: 240, stock: 80 },
  { id: 'p500'   ,  name:        '500 Milliliter Pack (12)', price: 200, stock: 80 },
  { id: 'p250'    ,  name:        '250 Milliliter Pack (12)', price: 180, stock: 80 }
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
      content.innerHTML = `<section id="about" class="about-section">
  <div class="about-container">
    <h2>About Us</h2>
    <p class="intro-text">
      <strong>SHREE SAMARTH INDUSTRIES</strong> is proud to be associated with your esteemed organization, 
      and we deeply appreciate your continued trust and partnership over the years.
    </p>

    <p>
      With over 8 years of experience, we have built a strong reputation for delivering high-quality packaged drinking water products. 
      What started as a small operation in 2016 has now grown into a renowned business, 
      serving a wide network of customers across various areas in Pune. 
      Today, we proudly cater to a base of over 16 loyal customers and businesses.
    </p>

    <p>
      At the core of our operations is a strong commitment to customer satisfaction. 
      We believe that ethical practices, competitive pricing, and on-time delivery 
      are the true measures of success. These values have made us a trusted and preferred partner in the market.
    </p>

    <div class="team-section">
      <h3>Our Team</h3>
      <p>
        Our team consists of well-qualified and experienced professionals dedicated to maintaining the highest standards. 
        To ensure we stay ahead of industry trends, we conduct regular training sessions 
        to sharpen skills and stay updated with market demands. Our team includes:
      </p>
      <ul>
        <li>Quality Controllers</li>
        <li>Technicians</li>
        <li>Machine Operators</li>
        <li>Sales & Marketing Personnel</li>
      </ul>
    </div>

    <p class="closing-text">
      We look forward to building a long-term relationship with your organization. 
      We would be delighted to meet in person to discuss how our products and services can meet your needs. 
      For inquiries or business collaborations, please don’t hesitate to reach out to us.
    </p>
  </div>
</section>`;
  } else if(section === 'contact'){
    content.innerHTML = `<section id="contact" class="contact-section">
  <div class="contact-container">
    <h2>Contact Us</h2>
    <p class="contact-intro">
      Have questions or need to place an order? We're here to help!
    </p>

    <div class="contact-card">
      <h3>SHREE SAMARTH INDUSTRIES</h3>
      <p class="contact-subtitle">Mineral Drinking Water & Cold Water Jar Suppliers</p>

      <div class="contact-info">
        <p><strong>Address:</strong> Near Sajai Mandir, Kamthe Mala, Fursungi, Pune - 412308</p>
        <p><strong>Phone:</strong> 
          <a href="tel:+919623646767">9623 64 6767</a> / 
          <a href="tel:+919552566767">9552 56 6767</a> / 
          <a href="tel:+919689284999">9689 28 4999</a>
        </p>
        <p><strong>Email:</strong> 
          <a href="mailto:oxigrow@example.com">oxigrow@example.com</a>
        </p>
      </div>
    </div>
  </div>
</section>`;
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
      <div class="form-row"><input type="email" id="customer" name="email" required placeholder="Enter your email"></div>
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
function isValidPhone(v){ return /^[1-9][0-9]{9}$/.test(v); }
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
