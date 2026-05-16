// --- 1. UI ELEMENT SELECTION ---
// Forms for toggling
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const showRegisterBtn = document.getElementById("show-register");
const showLoginBtn = document.getElementById("show-login");

// Dashboard & Auth Container
const authContainer = document.getElementById("auth-container"); // Grabs the main container by ID
const dashboard = document.getElementById("dashboard");
const logoutBtn = document.getElementById("logout-btn");

// Registration Inputs
const regForm = document.getElementById("reg-form");
const regUsername = document.getElementById("reg-username");
const regEmail = document.getElementById("reg-email");
const regPassword = document.getElementById("reg-password");

// Login Inputs
const loginAuthForm = document.getElementById("login-auth-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");

// --- 2. TOGGLE BETWEEN LOGIN & REGISTER ---
showRegisterBtn.addEventListener("click", () => {
  loginForm.classList.replace("block", "hidden");
  registerForm.classList.replace("hidden", "block");
});

showLoginBtn.addEventListener("click", () => {
  registerForm.classList.replace("block", "hidden");
  loginForm.classList.replace("hidden", "block");
});

// --- 3. REGISTRATION LOGIC ---
regForm.addEventListener("submit", async (e) => {
  e.preventDefault(); 

  const userData = {
    username: regUsername.value,
    email: regEmail.value,
    password: regPassword.value,
  };

  try {
    const response = await fetch("http://127.0.0.1:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (response.ok) {
      alert("SUCCESS: " + result.message);
      regForm.reset(); 
      showLoginBtn.click(); 
    } else {
      alert("ERROR: " + result.error);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("CRITICAL ERROR: Could not connect to the Python server.");
  }
});

// --- 4. LOGIN LOGIC ---
loginAuthForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const loginData = {
    email: loginEmail.value,
    password: loginPassword.value,
  };

  try {
    const response = await fetch("http://127.0.0.1:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const result = await response.json();

    if (response.ok) {
      // Success! Hide the login screen, show the dashboard!
      authContainer.classList.add("hidden");
      dashboard.classList.replace("hidden", "block");
    } else {
      // Failed (wrong password or email doesn't exist)
      alert("ACCESS DENIED: " + result.error);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("CRITICAL ERROR: Could not connect to the Python server.");
  }
});

// --- 5. LOGOUT LOGIC ---
logoutBtn.addEventListener("click", () => {
  dashboard.classList.replace("block", "hidden");
  authContainer.classList.remove("hidden");
  loginAuthForm.reset();
});