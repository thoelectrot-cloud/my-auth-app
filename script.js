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