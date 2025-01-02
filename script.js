// Select elements
let modal = document.getElementById("orderModal");
let closeBtn = document.querySelector(".close-btn");
let submitOrderBtn = document.getElementById("submitOrder");
let orderForm = document.getElementById("orderForm");
let orderConfirmation = document.getElementById("orderConfirmation");

// Handle Order Button Click
document.querySelectorAll('.order-btn').forEach(button => {
  button.addEventListener('click', (event) => {
    const item = event.target.getAttribute('data-item');  // Get item name
    const price = event.target.getAttribute('data-price');  // Get item price
    openModal(item, price);
  });
});

// Open Modal and Set Item Details
function openModal(item, price) {
  modal.style.display = "block";
  
  // Reset the form
  orderForm.reset();
  
  // Set the order details in the form or display area
  orderForm.dataset.item = item;
  orderForm.dataset.price = price;
}

// Close Modal
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// Submit Order
orderForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission to server

  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const paymentMethod = document.getElementById("paymentMethod").value;

  if (!name || !address || !paymentMethod) {
    alert("All fields are required!");
    return;
  }

  // Get item details from the form
  const item = orderForm.dataset.item;
  const price = orderForm.dataset.price;

  // Show confirmation message in the modal
  orderConfirmation.innerHTML = `Thank you, ${name}!<br>Your order for ${item} ($${price}) has been placed.<br>Delivery Address: ${address}<br>Payment Method: ${paymentMethod}.`;

  // Optionally, close the modal after a delay
  setTimeout(() => {
    modal.style.display = "none";
  }, 5000);
});


// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.querySelector('input[name="name"]');
  const email = document.querySelector('input[name="email"]');
  const message = document.querySelector('textarea[name="message"]');
  let valid = true;

  // Name Validation
  if (name.value.trim() === '') {
    setError(name, 'Name is required.');
    valid = false;
  } else {
    clearError(name);
  }

  // Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    setError(email, 'Enter a valid email address.');
    valid = false;
  } else {
    clearError(email);
  }

  // Message Validation
  if (message.value.trim() === '') {
    setError(message, 'Message cannot be empty.');
    valid = false;
  } else {
    clearError(message);
  }

  // If all fields are valid, display confirmation
  if (valid) {
    displayConfirmation();
    contactForm.reset();
  }
});

// Set Error Message
function setError(element, message) {
  const parent = element.parentElement;
  const errorDisplay = parent.querySelector('.error-message');
  errorDisplay.textContent = message;
  errorDisplay.style.display = 'block';
  element.style.borderColor = 'red';
}

// Clear Error Message
function clearError(element) {
  const parent = element.parentElement;
  const errorDisplay = parent.querySelector('.error-message');
  errorDisplay.textContent = '';
  errorDisplay.style.display = 'none';
  element.style.borderColor = '';
}

// Display Confirmation Message
function displayConfirmation() {
  const confirmationBox = document.createElement('div');
  confirmationBox.className = 'confirmation-box';
  confirmationBox.textContent = 'Your message has been successfully sent!';
  document.body.appendChild(confirmationBox);

  setTimeout(() => {
    confirmationBox.remove();
  }, 3000);
}
