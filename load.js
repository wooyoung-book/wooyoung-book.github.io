document.addEventListener('DOMContentLoaded', () => {
  const detailsElements = document.querySelectorAll('.content-details');

  detailsElements.forEach(details => {
    const contentSpan = details.querySelector('.content');
    const url = details.getAttribute('data-url');
    const type = details.getAttribute('data-type');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadContent(details, contentSpan, url, type);
          observer.unobserve(entry.target); // 한 번만 로드
        }
      });
    });

    observer.observe(details);
  });

  function loadContent(detailsElement, contentSpan, url, type) {
    if (!contentSpan.innerHTML) {
      if (type === 'html') {
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
      } else if (type === 'iframe') {
        const iframe = document.createElement('iframe');
        iframe.src = url; // iframe의 src 설정
        iframe.style.width = detailsElement.getAttribute('data-iframe-width') || '100%'; // 기본값 100%
        iframe.style.height = detailsElement.getAttribute('data-iframe-height') || '300px'; // 기본값 300px
        iframe.frameBorder = detailsElement.getAttribute('data-iframe-border') || '0'; // 기본값 0
        iframe.title = detailsElement.getAttribute('data-iframe-title') || ''; // 제목 설정 (접근성)
        contentSpan.appendChild(iframe); // contentSpan에 iframe 추가
      }
    }
  }

  function setupNestedDropdowns(container) {
    const nestedDetails = container.querySelectorAll('.nested-content-details');

    nestedDetails.forEach(details => {
      const nestedContentSpan = details.querySelector('.nested-content');
      const nestedUrl = details.getAttribute('data-url');
      const nestedType = details.getAttribute('data-type');

      const nestedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadContent(details, nestedContentSpan, nestedUrl, nestedType);
            nestedObserver.unobserve(entry.target); // 한 번만 로드
          }
        });
      });

      nestedObserver.observe(details); // 중첩 드롭다운을 뷰포트에 감시
    });
  }
});
