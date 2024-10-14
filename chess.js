document.addEventListener('DOMContentLoaded', () => {
  let isLoading = false;

  function loadHtml() {
    if (isLoading) return;
    isLoading = true;

    fetch('chess.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        document.querySelector('#chess').innerHTML = data;
      })
      .catch(err => console.error('Error loading HTML:', err))
      .finally(() => {
        isLoading = false;
      });
  }


  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadHtml();
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(document.querySelector('#load-more-chess'));
});
