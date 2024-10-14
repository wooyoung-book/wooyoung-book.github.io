document.addEventListener('DOMContentLoaded', () => {
  let isLoading = false;

  // HTML 콘텐츠를 로드하는 함수
  function loadHtml() {
    if (isLoading) return; // 이미 로딩 중이면 무시
    isLoading = true;

    fetch('chess.html')
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

  // Intersection Observer 설정
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadHtml(); // 뷰포트에 들어오면 로드
        observer.unobserve(entry.target); // 한 번만 로드
      }
    });
  });

  // 감시할 요소 설정
  const loadMoreElement = document.querySelector('#load-more-chess');
  if (loadMoreElement) {
    observer.observe(loadMoreElement);
  }
});
