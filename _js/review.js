fetch('_html/review.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('review').innerHTML = data;
    })
    .catch(error => console.error('Error fetching HTML:', error));
