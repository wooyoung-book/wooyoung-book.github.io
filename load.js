document.addEventListener('DOMContentLoaded', () => {
  const detailsElements = document.querySelectorAll('.content-details');

  detailsElements.forEach(details => {
    const contentSpan = details.querySelector('.content');
    const url = details.getAttribute('data-url');
    const type = details.getAttribute('data-type');

    // IntersectionObserver 설정
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadContent(details, contentSpan, url, type);
          observer.unobserve(entry.target); // 한 번만 로드
        }
      });
    });

    // 드롭다운 요소가 뷰포트에 들어올 때 감시
    observer.observe(details);
  });

  function loadContent(detailsElement, contentSpan, url, type) {
    if (!contentSpan.innerHTML) { // 콘텐츠가 비어 있을 때만 로드
      if (type === 'html') {
        // HTML 파일 로드
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(data => {
            contentSpan.innerHTML = data; // 로드한 내용을 삽입
          })
          .catch(err => console.error('Error loading HTML content:', err));
      } else if (type === 'iframe') {
        // iframe 로드
        const iframe = document.createElement('iframe');
        iframe.src = url; // iframe의 src 설정
        iframe.style.width = '100%';
        iframe.style.height = '300px'; // 필요에 따라 높이 조정
        iframe.frameBorder = '0';
        contentSpan.appendChild(iframe); // contentSpan에 iframe 추가
      }
    }
  }
});
