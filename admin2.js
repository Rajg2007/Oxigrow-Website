function getOrders() {
  const orders = localStorage.getItem('orders');
  return orders ? JSON.parse(orders) : [];
}

function displayOrders() {
  const orders = getOrders();
  const tbody = document.getElementById('ordersTable');
  tbody.innerHTML = '';

  orders.forEach((order, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${order.product}</td>
      <td>${order.quantity}</td>
      <td>${order.customer}</td>
      <td><button onclick="deleteOrder(${i})">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function deleteOrder(index) {
  const orders = getOrders();
  orders.splice(index, 1);
  localStorage.setItem('orders', JSON.stringify(orders));
  displayOrders();
}

displayOrders();
S