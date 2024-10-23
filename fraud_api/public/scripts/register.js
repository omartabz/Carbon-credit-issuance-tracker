document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('regMessage').style.display = 'block';
            document.getElementById('errorMessage').style.display = 'none';
            document.getElementById('registerForm').reset();
        } else {
            return response.json().then(data => {
                document.getElementById('errorMessage').textContent = data.message;
                document.getElementById('errorMessage').style.display = 'block';
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

