fetch('music.txt')
  .then(response => response.text())
  .then(data => {
    document.getElementById('fileContent').innerText = data;
})
  .catch(error => console.error('Error fetching file:', error));