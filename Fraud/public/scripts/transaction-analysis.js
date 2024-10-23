const transactionId = "1"; // Replace with actual transaction ID
fetch(`/api/transactions/${transactionId}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('transaction-details').innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => console.error('Error:', error));
