fetch('/api/trends')
    .then(response => response.json())
    .then(data => {
        const trendsContainer = document.getElementById('trends');
        data.trends.forEach(trend => {
            const trendDiv = document.createElement('div');
            trendDiv.innerText = `Year: ${trend.year}, Fraud Count: ${trend.fraudCount}`;
            trendsContainer.appendChild(trendDiv);
        });
    })
    .catch(error => console.error('Error:', error));
