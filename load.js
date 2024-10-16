document.addEventListener('DOMContentLoaded', () => {
  const detailsElements = document.querySelectorAll('.content-details');

  detailsElements.forEach(details => {
    const contentSpan = details.querySelector('.content');
    const url = details.getAttribute('data-url');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadContent(details, contentSpan, url);
          observer.unobserve(entry.target); // 한 번만 로드
        }
      });
    });

    observer.observe(details);
  });

  function loadContent(detailsElement, contentSpan, url) {
    if (!contentSpan.innerHTML) {
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
        .catch(err => console.error('Error loading HTML content:', err));
    }
  }

  function setupNestedDropdowns(container) {
    const nestedDetails = container.querySelectorAll('.nested-content-details');

    nestedDetails.forEach(details => {
      const nestedContentSpan = details.querySelector('.nested-content');
      const nestedUrl = details.getAttribute('data-url');

      const nestedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadContent(details, nestedContentSpan, nestedUrl);
            nestedObserver.unobserve(entry.target); // 한 번만 로드
          }
        });
      });

      nestedObserver.observe(details); // 중첩 드롭다운을 뷰포트에 감시
    });
  }
});
