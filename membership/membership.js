document.addEventListener('DOMContentLoaded', () => {
    const membershipForm = document.getElementById('membershipForm');
    const loginForm = document.getElementById('loginForm');
    const showLoginLink = document.getElementById('showLogin');
    const showRegisterLink = document.getElementById('showRegister');

    function showLoginForm() {
        membershipForm.style.display = 'none';
        loginForm.style.display = 'block';
    }

    function showMembershipForm() {
        loginForm.style.display = 'none';
        membershipForm.style.display = 'block';
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            showLoginForm();
        });
    }

    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            showMembershipForm();
        });
    }

    if (membershipForm) {
        membershipForm.addEventListener('submit', (e) => {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            alert("Registration form submitted! (No actual backend submission)");
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            alert("Login form submitted! (No actual backend submission)");
        });
    }
});
