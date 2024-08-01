let express = require("express");
const { emit } = require("process");
let app = express();
let port = 3000;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

let products = [
  { productId: 1, name: "Laptop", inStock: true },
  { productId: 2, name: "Phone", inStock: true },
  { productId: 3, name: "Tablet", inStock: false },
];
let employees = [
  { employeeId: 1, name: "Alice", active: true },
  { employeeId: 2, name: "Bob", active: true },
  { employeeId: 3, name: "Charlie", active: false },
];
let orders = [
  { orderId: 1, product: "Laptop", delivered: false },
  { orderId: 2, product: "Phone", delivered: true },
  { orderId: 3, product: "Tablet", delivered: false },
];

let reservations = [
  { reservationId: 1, name: "John", confirmed: false },
  { reservationId: 2, name: "Jane", confirmed: true },
  { reservationId: 3, name: "Jack", confirmed: false },
];
let subscriptions = [
  { subscriptionId: 1, service: "Netflix", active: false },
  { subscriptionId: 2, service: "Spotify", active: true },
  { subscriptionId: 3, service: "Amazon Prime", active: false },
];

/*
Example 1: Remove Out of Stock Products

Create an endpoint /products/remove-out-of-stock to return all the products currently in stock & remove the products that are out of stock

Create a function removeOutOfStockProducts to filter out products that are out of stock.

API Call:

http://localhost:3000/products/remove-out-of-stock


Expected output:

[
  { 'productId': 1, 'name': 'Laptop', 'inStock': true },
  { 'productId': 2, 'name': 'Phone', 'inStock': true }
]
*/
function removeOutOfStockProducts(products) {
  return products.filter((product) => product.inStock); //return all the products currently in stock & remove the products that are out of stock
}
app.get("/products/remove-out-of-stock", (req, res) => {
  let inStockProducts = removeOutOfStockProducts(products);
  if (!inStockProducts) {
    return res.status(404).json({ error: "No products in stock" });
  }
  products = inStockProducts;
  res.json(inStockProducts);
});

/*
Example 2: Update Employee Active Status by ID

Create an endpoint /employees/update to update the status of an employee

Declare employeeId and active variables.

Create a function updateEmployeeStatusById to update the status of an employee by ID.

API call:

http://localhost:3000>/employees/update?employeeId=1&active=false

Expected output:

[
  { 'employeeId': 1, 'name': 'Alice', 'active': false },
  { 'employeeId': 2, 'name': 'Bob', 'active': true },
  { 'employeeId': 3, 'name': 'Charlie', 'active': false }
]
*/
function updateEmployeeStatusById(employees, employeeId, active) {
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].employeeId === employeeId) {
      employees[i].active = active;
      break;
    }
  }
  return employees; // return whole array
}
app.get("/employees/update", (req, res) => {
  let employeeId = parseInt(req.query.employeeId);
  let active = req.query.active === "true";
  console.log("original employee arr", employees);
  let updatedEmployees = updateEmployeeStatusById(
    employees,
    employeeId,
    active,
  );
  if (!updatedEmployees) {
    return res.status(404).json({ error: "Employee not found" });
  }
  console.log("update employees arr ", employees);
  res.json(updatedEmployees);
});

/*
Example 3: Update Order Delivery Status by ID

Create an endpoint /orders/update to update the delivery status of an order

Declare orderId and delivered variables to accept input from query parameters.

Create a function updateOrderStatusById to update the status of an order by ID.

API call:

http://localhost:3000/orders/update?orderId=1&delivered=true

Expected output:

[
  { 'orderId': 1, 'product': 'Laptop', 'delivered': true },
  { 'orderId': 2, 'product': 'Phone', 'delivered': true },
  { 'orderId': 3, 'product': 'Tablet', 'delivered': false }
]
*/
function updateOrderStatusById(orders, orderId, delivered) {
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].orderId === orderId) {
      orders[i].delivered = delivered;
      break;
    }
  }
  return orders; // return whole array
}
app.get("/orders/update", (req, res) => {
  let orderId = parseInt(req.query.orderId);
  let delivered = req.query.delivered === "true";
  console.log("original order arr", orders);
  let updatedOrders = updateOrderStatusById(orders, orderId, delivered);
  if (!updatedOrders) {
    return res.status(404).json({ error: "Order not found" });
  }
  console.log("update order arr ", orders);
  res.json(updatedOrders);
});

/*
Example 4: Remove Unconfirmed Reservations

Create an endpoint /reservations/remove-unconfirmed to remove unconfirmed reservations & return only the confirmed ones.

Create a function removeUnconfirmedReservations to filter out unconfirmed reservations.

API call:

http://localhost:3000/reservations/remove-unconfirmed

Expected output:

[
  { 'reservationId': 2, 'name': 'Jane', 'confirmed': true }
]
*/
function removeUnconfirmedReservations(reservations) {
  return reservations.filter((reservation) => reservation.confirmed);
}
app.get("/reservations/remove-unconfirmed", (req, res) => {
  console.log("original reservation arr", reservations);
  let unconfirmedReservations = removeUnconfirmedReservations(reservations);
  if (!unconfirmedReservations) {
    return res.status(404).json({ error: "No unconfirmed reservations" });
  }
  reservations = unconfirmedReservations; // updating the original arr with modfied arr
  console.log("orriginal reservation arr after deletion", reservations);
  res.json(unconfirmedReservations);
});

/*
Example 5: Update Subscription Status by ID

Create an endpoint /subscriptions/update to update the status of a subscription.

Declare subscriptionId and active variables to accept input from query parameters.

Create a function updateSubscriptionStatusById to update the status of a subscription by ID.

API Call:

http://localhost:3000/subscriptions/update?subscriptionId=1&active=true


Expected output:

[
  { 'subscriptionId': 1, 'service': 'Netflix', 'active': true },
  { 'subscriptionId': 2, 'service': 'Spotify', 'active': true },
  { 'subscriptionId': 3, 'service': 'Amazon Prime', 'active': false }
]
*/
function updateSubscriptionStatusById(subscriptions, subscriptionId, active) {
  for (let i = 0; i < subscriptions.length; i++) {
    if (subscriptions[i].subscriptionId === subscriptionId) {
      subscriptions[i].active = active;
      break;
    }
  }
  return subscriptions; // return whole array
}
app.get("/subscriptions/update", (req, res) => {
  let subscriptionId = parseInt(req.query.subscriptionId);
  let active = req.query.active === "true";
  console.log("original subscription arr", subscriptions);
  let updatedSubscriptions = updateSubscriptionStatusById(
    subscriptions,
    subscriptionId,
    active,
  );
  if (!updatedSubscriptions) {
    return res.status(404).json({ error: "Subscription not found" });
  }
  console.log("update subscription arr ", subscriptions);
  res.json(updatedSubscriptions);
});
