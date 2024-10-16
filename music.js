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
                <a href="#" data-video-id="d_34u3yowvE" style="color: black; text-decoration: none; background-color: #FFFEBD;">Sounds From The Ground - This Land</a><br>
                <a href="#" data-video-id="RgmufUgVmi8" style="color: black; text-decoration: none; background-color: #FFFEBD;">Shadowy Men On A Shadowy Planet - Zombie Compromise</a><br>
                <a href="#" data-video-id="mmCnQDUSO4I" style="color: black; text-decoration: none; background-color: #FFFEBD;">Dmitri Shostakovich - Waltz No. 2</a><br>
                <a href="https://archive.org/details/exp037" style="color: black; text-decoration: none; background-color: #FFFEBD;">Wrexsoul - Alchemy Sound LP</a><br>
                <a href="#" data-video-id="0VpQi7EOEDg" style="color: black; text-decoration: none; background-color: #FFFEBD;">Drakphaser - Phasius Earth</a><br>
                <a href="#" data-video-id="oAN_UVHtCro" style="color: black; text-decoration: none; background-color: #FFFEBD;">Dalot - Infinite Window</a><br>
                <a href="#" data-video-id="hxdfiHGrcCA" style="color: black; text-decoration: none; background-color: #FFFEBD;">winterlight - Between Joy</a><br>
                <a href="#" data-video-id="ZCDAszFV-7U" style="color: black; text-decoration: none; background-color: #FFFEBD;">Damjan Mravunac - False God</a><br>
                <a href="#" data-video-id="QMV3A65PTG0" style="color: black; text-decoration: none; background-color: #FFFEBD;">S1gns of L1fe - Synesthetic State</a><br>
                <a href="#" data-video-id="HhmHj1Wn5s4" style="color: black; text-decoration: none; background-color: #FFFEBD;">Dav Dralleon - Sword Ov Saturn</a><br>
                <a href="#" data-video-id="Q13-FiOJvFk" style="color: black; text-decoration: none; background-color: #FFFEBD;">Quench - Slick</a><br>
                <a href="#" data-video-id="Jydilwi-ric" style="color: black; text-decoration: none; background-color: #FFFEBD;">Rechenzentrum - Happy End</a><br>
                <a href="#" data-video-id="w9sSkEWbopA" style="color: black; text-decoration: none; background-color: #FFFEBD;">Sense - Walking Water</a>
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

            // 새로운 iframe 생성
            const videoContainer = document.createElement('div');
            videoContainer.style.position = 'relative';
            videoContainer.style.width = '320px'; // 비디오 크기 조정
            videoContainer.style.height = '180px'; // 비율 맞추기

            // iframe 생성
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`; // 자동 재생 및 반복 재생 추가
            iframe.width = "100%"; // 컨테이너에 맞추기
            iframe.height = "100%"; // 컨테이너에 맞추기
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;

            // X 버튼 생성
            const closeButton = document.createElement('button');
            closeButton.textContent = 'X';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '5px';
            closeButton.style.right = '5px';
            closeButton.style.backgroundColor = '#FF6347'; // 버튼 배경 색상
            closeButton.style.color = 'white'; // 버튼 글자 색상
            closeButton.style.border = 'none';
            closeButton.style.padding = '3px 15px';
            closeButton.style.cursor = 'pointer';
            closeButton.style.zIndex = '10'; // 버튼이 비디오 위에 보이도록

            closeButton.addEventListener('click', function() {
                videoContainer.remove(); // 비디오 컨테이너 제거
            });

            // DOM에 추가
            videoContainer.appendChild(iframe);
            videoContainer.appendChild(closeButton);
            musicEContainer.appendChild(videoContainer);
        }
    });
});
