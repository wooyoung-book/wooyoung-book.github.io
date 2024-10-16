document.addEventListener("DOMContentLoaded", function() {
    const myElement = document.getElementById('music-e'); // ID로 선택

    // music.html 파일 불러오기
    fetch('music.html')
        .then(response => response.text())
        .then(data => {
            // 가져온 HTML 내용에서 링크만 추출
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const videoLinks = doc.querySelectorAll('a[data-video-id]');

            // 링크 추가
            videoLinks.forEach(link => {
                const newLink = document.createElement('a');
                newLink.href = "#";
                newLink.setAttribute('data-video-id', link.getAttribute('data-video-id'));
                newLink.textContent = link.textContent;

                myElement.appendChild(newLink);

                // 클릭 이벤트 추가
                newLink.addEventListener('click', function(event) {
                    event.preventDefault(); // 기본 링크 클릭 동작 방지

                    // 기존 iframe 제거
                    const existingIframe = myElement.querySelector('iframe');
                    if (existingIframe) {
                        existingIframe.remove();
                    }

                    // iframe 생성
                    const videoId = newLink.getAttribute('data-video-id');
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
});
