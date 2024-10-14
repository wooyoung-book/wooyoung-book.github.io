document.addEventListener('DOMContentLoaded', () => {
  const detailsElements = document.querySelectorAll('.content-details');

  detailsElements.forEach(details => {
    const contentSpan = details.querySelector('.content');
    const url = details.getAttribute('data-url');

    // IntersectionObserver 설정
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 드롭다운이 열릴 때만 콘텐츠를 로드
          loadContent(details, contentSpan, url);
          observer.unobserve(entry.target); // 한 번만 로드
        }
      });
    });

    // 드롭다운 요소가 뷰포트에 들어올 때 감시
    observer.observe(details);
  });

  function loadContent(detailsElement, contentSpan, url) {
    if (!contentSpan.innerHTML) { // 콘텐츠가 비어 있을 때만 로드
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(data => {
          contentSpan.innerHTML = data; // 로드한 내용을 삽입
          setupNestedDropdowns(contentSpan); // 중첩 드롭다운 초기화
        })
        .catch(err => console.error('Error loading content:', err));
    }
  }

  function setupNestedDropdowns(container) {
    const nestedDetails = container.querySelectorAll('.nested-content-details');

    nestedDetails.forEach(details => {
      const nestedContentSpan = details.querySelector('.nested-content');

      details.addEventListener('toggle', () => {
        if (details.open && !nestedContentSpan.innerHTML) {
          // 중첩 드롭다운이 열릴 때 콘텐츠 로드
          const nestedUrl = details.getAttribute('data-url');
          fetch(nestedUrl)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.text();
            })
            .then(data => {
              nestedContentSpan.innerHTML = data; // 로드한 내용을 삽입
              nestedContentSpan.style.display = 'block'; // 내용 표시
            })
            .catch(err => console.error('Error loading nested content:', err));
        }
      });
    });
  }
});
