document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    // Check if the user already exists
    if (localStorage.getItem(username)) {
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('regMessage').style.display = 'none'; // Hide success message if error
    } else {
        // Store new user credentials in localStorage
        localStorage.setItem(username, password);
        document.getElementById('regMessage').style.display = 'block';
        document.getElementById('errorMessage').style.display = 'none'; // Hide error message on success
    }
});
