document.addEventListener("DOMContentLoaded", function() {
    const musicContainer = document.getElementById('music-c');
    const musicDetails = document.getElementById('music-d');
    const musicEContainer = document.getElementById('music-e');
    
    let linksAdded = false; // 링크 추가 여부 추적
    let existingIframe = null; // 기존 iframe 변수

    musicDetails.addEventListener('toggle', function() {
        if (musicDetails.open && !linksAdded) {
            musicContainer.innerHTML = createLinksHTML();
            linksAdded = true; // 링크 추가 후 플래그 설정
        }
    });

    musicContainer.addEventListener('click', function(event) {
        if (event.target.matches('a[data-video-id]')) {
            event.preventDefault(); // 기본 링크 클릭 동작 방지

            // 모든 링크를 원래 색으로 복원
            musicContainer.querySelectorAll('a[data-video-id]').forEach(link => {
                link.classList.remove('highlight');
                link.style.backgroundColor = '#FFFEBD'; // 원래 색
                link.style.transform = 'scale(1)'; // 초기 크기
            });

            // 클릭한 링크 하이라이트
            const targetLink = event.target;
            targetLink.classList.add('highlight');
            targetLink.style.backgroundColor = '#FFC107'; // 하이라이트 색상
            targetLink.style.transform = 'scale(1.05)'; // 확대 효과

            const videoId = targetLink.getAttribute('data-video-id');

            // 비디오 ID 유효성 검사
            if (!videoId) {
                alert("유효하지 않은 비디오 ID입니다.");
                return;
            }

            // 기존 iframe이 없으면 새로 생성
            if (!existingIframe) {
                createVideoContainer();
            }

            // iframe src 업데이트 (두 번 클릭처럼 동작하게 설정)
            setTimeout(() => {
                existingIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playlist=${videoId}`; // 자동 재생 및 반복 재생 추가
            }, 50); // 50ms 지연
        }
    });

    function createLinksHTML() {
        const links = [
            { id: "pkbXucb7mtA", label: "Bola - Para Qweqway" },
            { id: "d_34u3yowvE", label: "Sounds From The Ground - This Land" },
            { id: "RgmufUgVmi8", label: "Shadowy Men On A Shadowy Planet - Zombie Compromise" },
            { id: "mmCnQDUSO4I", label: "Dmitri Shostakovich - Waltz No. 2" },
            { id: "0VpQi7EOEDg", label: "Drakphaser - Phasius Earth" },
            { id: "oAN_UVHtCro", label: "Dalot - Infinite Window" },
            { id: "hxdfiHGrcCA", label: "winterlight - Between Joy" },
            { id: "ZCDAszFV-7U", label: "Damjan Mravunac - False God" },
            { id: "QMV3A65PTG0", label: "S1gns of L1fe - Synesthetic State" },
            { id: "HhmHj1Wn5s4", label: "Dav Dralleon - Sword Ov Saturn" },
            { id: "Q13-FiOJvFk", label: "Quench - Slick" },
            { id: "Jydilwi-ric", label: "Rechenzentrum - Happy End" },
            { id: "w9sSkEWbopA", label: "Sense - Walking Water" },
        ];

        return links.map(link => `
            <div style="margin: 0;">
                <a href="#" 
                   data-video-id="${link.id}" 
                   style="
                       display: block; 
                       padding: 6px 10px; 
                       background-color: #FFFEBD; 
                       color: #333; 
                       text-decoration: none; 
                       border: 1px solid transparent; 
                       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                       transition: background-color 0.3s, transform 0.2s;
                       font-size: 14px; 
                   "
                   onmouseover="this.style.backgroundColor='#FFC107'; this.style.transform='scale(1.05)';"
                   onmouseout="this.style.backgroundColor='#FFFEBD'; this.style.transform='scale(1)';">
                    ${link.label}
                </a>
            </div>
        `).join('');
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
        existingIframe.loading = "lazy";
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
