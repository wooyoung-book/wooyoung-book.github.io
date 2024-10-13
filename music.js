fetch('music.md')
  .then(response => response.text())
  .then(data => {
    document.getElementById('music').innerText = data;
})
  .catch(error => console.error('Error fetching file:', error));