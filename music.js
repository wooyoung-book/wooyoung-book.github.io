document.addEventListener("DOMContentLoaded", function() {
    const myElement = document.querySelector('.music-e');
    const videoLinks = document.querySelectorAll('a[data-video-id]');

    videoLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // 링크 클릭 시 기본 동작 방지

            // 기존 iframe이 있다면 제거
            const existingIframe = myElement.querySelector('iframe');
            if (existingIframe) {
                existingIframe.remove();
            }

            // iframe 생성
            const videoId = this.getAttribute('data-video-id');
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            iframe.width = "560";
            iframe.height = "315";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;

            // X 버튼 생성
            const closeButton = document.createElement('button');
            closeButton.textContent = 'X';
            closeButton.style.marginLeft = '10px';

            // X 버튼 클릭 시 iframe 제거
            closeButton.addEventListener('click', function() {
                myElement.removeChild(iframe);
                myElement.removeChild(closeButton);
            });

            // myElement에 iframe과 X 버튼 추가
            myElement.appendChild(iframe);
            myElement.appendChild(closeButton);
        });
    });
});
