// login.js
document.addEventListener('DOMContentLoaded', function () {
    // Guest button functionality
    const guestButton = document.getElementById('guestButton');
    const guestSections = document.getElementById('guest-sections');

    guestButton.addEventListener('click', function() {
        if (guestSections.classList.contains('hidden')) {
            guestSections.classList.remove('hidden');
        } else {
            guestSections.classList.add('hidden');
        }
    });

    // Add login form functionality here if needed
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Get the stored password for the entered username
    const storedPassword = localStorage.getItem(username);

    // Validate credentials
    if (storedPassword && storedPassword === password) {
        // Store login status in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username); // Store current user info

        // Redirect to index.html after successful login
        window.location.href = "index.html";
    } else {
        // Show error message
        document.getElementById('errorMessage').style.display = 'block';
    }
});
});
