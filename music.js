document.addEventListener("DOMContentLoaded", function() {
    const musicContainer = document.getElementById('music-c');
    const musicDetails = document.getElementById('music-d');
    const musicEContainer = document.getElementById('music-e');
    
    let linksAdded = false; // 링크가 추가되었는지 여부를 추적

    musicDetails.addEventListener('toggle', function() {
        if (musicDetails.open && !linksAdded) {
            // 링크 추가
            const linksHTML = `
                <a href="#" data-video-id="pkbXucb7mtA" style="color: black; text-decoration: none; background-color: #FFFEBD;">Bola - Para Qweqway</a><br>
                <a href="#" data-video-id="d_34u3yowvE" style="color: black; text-decoration: none; background-color: #FFFEBD;">Sounds From The Ground - This Land</a>
            `;
            musicContainer.innerHTML = linksHTML;
            linksAdded = true; // 링크 추가 후 플래그 설정
        }
    });

    musicContainer.addEventListener('click', function(event) {
        if (event.target.matches('a[data-video-id]')) {
            event.preventDefault(); // 기본 링크 클릭 동작 방지
            
            const videoId = event.target.getAttribute('data-video-id');
            
            // 기존 iframe 제거
            const existingIframe = musicEContainer.querySelector('iframe');
            if (existingIframe) {
                existingIframe.remove();
            }

            // iframe과 X 버튼 생성
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            iframe.width = "560";
            iframe.height = "315";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;

            const closeButton = document.createElement('button');
            closeButton.textContent = 'X';

            closeButton.addEventListener('click', function() {
                iframe.remove();
                closeButton.remove();
            });

            // DOM에 추가
            musicEContainer.appendChild(iframe);
            musicEContainer.appendChild(closeButton);
        }
    });
});
