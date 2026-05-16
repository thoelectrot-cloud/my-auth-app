const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterBtn = document.getElementById('show-register');
const showLoginBtn = document.getElementById('show-login');

showRegisterBtn.addEventListener('click', () => {
    loginForm.classList.replace('block', 'hidden');
    registerForm.classList.replace('hidden', 'block');
});

showLoginBtn.addEventListener('click', () => {
    registerForm.classList.replace('block', 'hidden');
    loginForm.classList.replace('hidden', 'block');
});
// --- NEW: REGISTRATION LOGIC ---

// 1. Grab the form and the inputs by their new IDs
const regForm = document.getElementById('reg-form');
const regUsername = document.getElementById('reg-username');
const regEmail = document.getElementById('reg-email');
const regPassword = document.getElementById('reg-password');

// 2. Listen for the moment the user clicks "Sign Up"
regForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // STOP the page from reloading (the old-school HTML way)

    // 3. Pack the data into a neat little package (JSON)
    const userData = {
        username: regUsername.value,
        email: regEmail.value,
        password: regPassword.value
    };

    try {
        // 4. Send the package to your Python server!
        const response = await fetch('http://127.0.0.1:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        // 5. Read Python's reply
        const result = await response.json();

        if (response.ok) {
            // Success! The server sent back a 201 code.
            alert('SUCCESS: ' + result.message);
            regForm.reset(); // Clear out the form inputs
            showLoginBtn.click(); // Automatically flip them over to the Login screen
        } else {
            // The server rejected it (e.g., username already taken)
            alert('ERROR: ' + result.error);
        }

    } catch (error) {
        console.error('Error:', error);
        alert('CRITICAL ERROR: Could not connect to the Python server.');
    }
});