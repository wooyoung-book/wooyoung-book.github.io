document.addEventListener("DOMContentLoaded", function() {
    const musicContainer = document.getElementById('music-c');
    const musicDetails = document.getElementById('music-d');
    const musicEContainer = document.getElementById('music-e');
    
    let linksAdded = false; // 링크 추가 여부 추적
    let existingIframe = null; // 기존 iframe 변수

    musicDetails.addEventListener('toggle', function() {
        if (musicDetails.open && !linksAdded) {
            // 링크 추가
            const linksHTML = createLinksHTML();
            musicContainer.innerHTML = linksHTML;
            linksAdded = true; // 링크 추가 후 플래그 설정
        }
    });

    musicContainer.addEventListener('click', function(event) {
        if (event.target.matches('a[data-video-id]')) {
            event.preventDefault(); // 기본 링크 클릭 동작 방지
            
            const videoId = event.target.getAttribute('data-video-id');

            // 비디오 ID 유효성 검사
            if (!videoId) {
                alert("유효하지 않은 비디오 ID입니다.");
                return;
            }

            // 기존 iframe이 없으면 새로 생성
            if (!existingIframe) {
                createVideoContainer();
            }

            // iframe src 업데이트
            existingIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playlist=${videoId}`; // 자동 재생 및 반복 재생 추가
        }
    });

    function createLinksHTML() {
        return `
            <a href="#" data-video-id="pkbXucb7mtA" aria-label="Bola - Para Qweqway">Bola - Para Qweqway</a><br>
            <a href="#" data-video-id="d_34u3yowvE" aria-label="Sounds From The Ground - This Land">Sounds From The Ground - This Land</a><br>
            <a href="#" data-video-id="RgmufUgVmi8" aria-label="Shadowy Men On A Shadowy Planet - Zombie Compromise">Shadowy Men On A Shadowy Planet - Zombie Compromise</a><br>
            <a href="#" data-video-id="mmCnQDUSO4I" aria-label="Dmitri Shostakovich - Waltz No. 2">Dmitri Shostakovich - Waltz No. 2</a><br>
            <a href="#" data-video-id="0VpQi7EOEDg" aria-label="Drakphaser - Phasius Earth">Drakphaser - Phasius Earth</a><br>
            <a href="#" data-video-id="oAN_UVHtCro" aria-label="Dalot - Infinite Window">Dalot - Infinite Window</a><br>
            <a href="#" data-video-id="hxdfiHGrcCA" aria-label="winterlight - Between Joy">winterlight - Between Joy</a><br>
            <a href="#" data-video-id="ZCDAszFV-7U" aria-label="Damjan Mravunac - False God">Damjan Mravunac - False God</a><br>
            <a href="#" data-video-id="QMV3A65PTG0" aria-label="S1gns of L1fe - Synesthetic State">S1gns of L1fe - Synesthetic State</a><br>
            <a href="#" data-video-id="HhmHj1Wn5s4" aria-label="Dav Dralleon - Sword Ov Saturn">Dav Dralleon - Sword Ov Saturn</a><br>
            <a href="#" data-video-id="Q13-FiOJvFk" aria-label="Quench - Slick">Quench - Slick</a><br>
            <a href="#" data-video-id="Jydilwi-ric" aria-label="Rechenzentrum - Happy End">Rechenzentrum - Happy End</a><br>
            <a href="#" data-video-id="w9sSkEWbopA" aria-label="Sense - Walking Water">Sense - Walking Water</a>
        `;
    }

    function createVideoContainer() {
        const videoContainer = document.createElement('div');
        videoContainer.style.position = 'relative';
        videoContainer.style.width = '320px'; // 비디오 크기 조정
        videoContainer.style.height = '180px'; // 비율 맞추기
        videoContainer.style.marginTop = '10px'; // 위쪽 여백 추가

        existingIframe = document.createElement('iframe');
        existingIframe.width = "100%"; // 컨테이너에 맞추기
        existingIframe.height = "100%"; // 컨테이너에 맞추기
        existingIframe.frameBorder = "0";
        existingIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        existingIframe.allowFullscreen = true;

        videoContainer.appendChild(existingIframe); // 비디오 컨테이너에 iframe 추가

        const closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '5px';
        closeButton.style.right = '5px';
        closeButton.style.backgroundColor = '#FF6347'; // 버튼 배경 색상
        closeButton.style.color = 'white'; // 버튼 글자 색상
        closeButton.style.border = 'none';
        closeButton.style.padding = '3px 10px'; // 버튼 크기 조정
        closeButton.style.cursor = 'pointer';
        closeButton.style.zIndex = '10'; // 버튼이 비디오 위에 보이도록

        closeButton.addEventListener('click', function() {
            videoContainer.remove(); // 비디오 컨테이너 제거
            existingIframe = null; // 기존 iframe 변수 초기화
        });

        videoContainer.appendChild(closeButton); // 비디오 컨테이너에 버튼 추가
        musicEContainer.appendChild(videoContainer); // 음악 컨테이너에 비디오 추가
    }
});
