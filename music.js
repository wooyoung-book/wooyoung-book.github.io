<div id="music-e"></div>
<script src="music.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const myElement = document.getElementById('music-e'); // ID로 선택
        fetch('links.html')
            .then(response => response.text())
            .then(data => {
                myElement.innerHTML = data;
                initializeLinks(); // 링크 초기화 함수 호출
            });
    });

    function initializeLinks() {
        const videoLinks = document.querySelectorAll('#music-e a[data-video-id]'); // 불러온 HTML 내의 링크 선택
        videoLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // 기본 링크 클릭 동작 방지

                // 기존 iframe 제거
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
    }
</script>
