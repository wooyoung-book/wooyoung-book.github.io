document.addEventListener('DOMContentLoaded', () => {
  let isLoading = false;

  function loadHtml() {
    if (isLoading) return; // 이미 로딩 중이면 무시
    isLoading = true;

    fetch('chess.html') // 여기에 로드할 HTML 파일 경로를 입력하세요.
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        document.querySelector('#chess').innerHTML = data; // 로드한 HTML을 삽입
      })
      .catch(err => console.error('Error loading HTML:', err))
      .finally(() => {
        isLoading = false; // 로딩 완료
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
