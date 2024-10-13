
fetch('/_html/music.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('music').innerHTML = data;
    })
    .catch(error => console.error('Error fetching HTML:', error));

