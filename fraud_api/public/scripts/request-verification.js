const transactionId = "1"; // Adjust as needed
const reason = "Suspicious activity detected";

fetch('/api/verify', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ transactionId, reason })
})
.then(response => response.json())
.then(data => {
    document.getElementById('verification-result').innerText = JSON.stringify(data, null, 2);
})
.catch(error => console.error('Error:', error));
