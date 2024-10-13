fetch('video.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('video').innerHTML = data;
    })
    .catch(error => console.error('Error fetching HTML:', error));
