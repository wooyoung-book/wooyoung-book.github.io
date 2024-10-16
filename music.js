document.addEventListener("DOMContentLoaded", function() {
    const myElement = document.getElementById('music-e');

    // music.html 파일 불러오기
    fetch('music.html')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const videoLinks = doc.querySelectorAll('a[data-video-id]');

            // 링크에 클릭 이벤트 추가
            videoLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault();

                    // 기존 iframe 제거
                    const existingIframe = myElement.querySelector('iframe');
                    if (existingIframe) {
                        existingIframe.remove();
                    }

                    // iframe 생성
                    const videoId = link.getAttribute('data-video-id');
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

            // 불러온 링크를 추가
            videoLinks.forEach(link => myElement.appendChild(link.cloneNode(true)));
        })
        .catch(error => console.error('Error fetching music.html:', error));
});
