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
        const width = detailsElement.getAttribute('data-iframe-width');
        const height = detailsElement.getAttribute('data-iframe-height');
        const aspectRatio = detailsElement.getAttribute('data-aspect-ratio');
        const border = detailsElement.getAttribute('data-iframe-border');
        const title = detailsElement.getAttribute('data-iframe-title');

        // 속성이 정의된 경우에만 적용
        if (width) iframe.style.width = width;
        if (height) iframe.style.height = height;
        if (aspectRatio) iframe.style.aspectRatio = aspectRatio;
        if (border) iframe.frameBorder = border;
        if (title) iframe.title = title;
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
