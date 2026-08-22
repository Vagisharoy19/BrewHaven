document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const usernameEmail = document.getElementById('username-email').value.trim();
            const password = document.getElementById('password').value;

            if (usernameEmail === '' || password === '') {
                alert('Both fields are required!');
                return;
            }

            console.log('Login attempt with:');
            console.log('Username/Email:', usernameEmail);
            console.log('Password:', password);

            if (usernameEmail === 'testuser' && password === 'password123') {
                alert('Login successful! Welcome!');
            } else {
                alert('Invalid username/email or password. Please try again.');
            }
        });
    }
});