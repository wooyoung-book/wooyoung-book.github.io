fetch('chess.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('chess').innerHTML = data;
    })
    .catch(error => console.error('Error fetching HTML:', error));
