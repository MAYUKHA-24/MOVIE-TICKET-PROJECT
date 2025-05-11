let currentUser = '';
let currentMovie = '';
let ticketPrice = 0;
let selectedSeats = [];

// ----------------------------
// Sign-Up Logic
// ----------------------------
// eslint-disable-next-line no-unused-vars
function signup() {
  const username = document.getElementById("new-username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("new-password").value.trim();

  if (!username || !email || !password) {
    alert("All fields are required!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const userExists = users.some(user => user.username === username || user.email === email);
  if (userExists) {
    alert("Username or Email already exists!");
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Sign-up successful! Please login.");
  toggleAuth('login');
}

// ----------------------------
// Login Logic
// ----------------------------
// eslint-disable-next-line no-unused-vars
function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const matchedUser = users.find(user => user.username === username && user.password === password);

  if (!matchedUser) {
    alert("Invalid username or password.");
    return;
  }

  currentUser = matchedUser.username;
  document.getElementById('user-name').innerText = currentUser;
  switchScreen('login-screen', 'movie-screen');
}

// ----------------------------
// Toggle Login/Signup Forms
// ----------------------------
function toggleAuth(mode) {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  if (mode === "signup") {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  } else {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  }
}

// ----------------------------
// Movie Selection Logic
// ----------------------------
// eslint-disable-next-line no-unused-vars
function chooseMovie(movie, price) {
  currentMovie = movie;
  ticketPrice = price;
  document.getElementById('movie-title').innerText = movie;
  generateSeats();
  updateCost();
  switchScreen('movie-screen', 'seat-screen');
}

function generateSeats() {
  const seatsContainer = document.getElementById('seats');
  seatsContainer.innerHTML = '';
  selectedSeats = [];

  for (let i = 1; i <= 64; i++) {
    const seat = document.createElement('div');
    seat.classList.add('seat');

    if (Math.random() < 0.1) {
      seat.classList.add('booked');
    } else {
      seat.addEventListener('click', () => toggleSeat(i, seat));
    }

    seat.innerText = i;
    seatsContainer.appendChild(seat);
  }
}

function toggleSeat(seatNumber, element) {
  if (element.classList.contains('selected')) {
    element.classList.remove('selected');
    selectedSeats = selectedSeats.filter(s => s !== seatNumber);
  } else {
    element.classList.add('selected');
    selectedSeats.push(seatNumber);
  }
  updateCost();
}

function updateCost() {
  document.getElementById('count').innerText = selectedSeats.length;
  document.getElementById('total').innerText = selectedSeats.length * ticketPrice;
}

// ----------------------------
// Confirm Booking
// ----------------------------
// eslint-disable-next-line no-unused-vars
function confirmBooking() {
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat.");
    return;
  }

  document.getElementById('summary-name').innerText = currentUser;
  document.getElementById('summary-movie').innerText = currentMovie;
  document.getElementById('summary-seats').innerText = selectedSeats.join(', ');
  document.getElementById('summary-total').innerText = selectedSeats.length * ticketPrice;

  switchScreen('seat-screen', 'summary-screen');
}

// ----------------------------
// Switch Screens
// ----------------------------
function switchScreen(hideId, showId) {
  document.getElementById(hideId).classList.remove('active');
  document.getElementById(showId).classList.add('active');
}
