document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (response.ok) {
            // Store user info in local storage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            window.location.href = 'index.html'; // Redirect to home
        } else {
            document.getElementById('errorMessage').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Guest access functionality
document.getElementById('guestButton').addEventListener('click', function() {
    localStorage.setItem('isLoggedIn', 'false'); // Set guest login
    window.location.href = 'index.html'; // Redirect to home as guest
});
