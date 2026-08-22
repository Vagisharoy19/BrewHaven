document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (username === '' || email === '' || password === '' || confirmPassword === '') {
                alert('All fields are required!');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }

            console.log('Form submitted successfully!');
            console.log('Username:', username);
            console.log('Email:', email);

            alert('Sign Up successful! (This is a client-side demo. Data is not stored.)');
        });
    }
});
