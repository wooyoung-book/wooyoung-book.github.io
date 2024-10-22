document.addEventListener("DOMContentLoaded", function() {
    const musicContainer = document.getElementById('music-c');
    const musicDetails = document.getElementById('music-d');
    const musicEContainer = document.getElementById('music-e');
    
    let linksAdded = false; // 링크 추가 여부 추적
    let existingIframe = null; // 기존 iframe 변수
    let highlightedLink = null; // 현재 하이라이트된 링크
    let videoId = ''; // 현재 비디오 ID 초기화
    
    musicDetails.addEventListener('toggle', function() {
        if (musicDetails.open && !linksAdded) {
            musicContainer.innerHTML = createLinksHTML();
            linksAdded = true; // 링크 추가 후 플래그 설정
        } 
        
        if (musicDetails.open && videoId) {
            const linkToHighlight = musicContainer.querySelector(`a[data-video-id="${videoId}"]`);
            // 드롭다운이 열릴 때 현재 비디오 ID에 따라 하이라이트와 iframe 설정
            if (linkToHighlight) {
                highlightedLink = linkToHighlight;
                highlightedLink.classList.add('highlight');
                highlightedLink.style.backgroundColor = '#98FF98'; // 하이라이트 색상
                highlightedLink.style.transform = 'scale(1.1) translateX(10px)'; // 확대 효과
            }
        }
    });

    musicContainer.addEventListener('click', function(event) {
        if (event.target.matches('a[data-video-id]')) {
            event.preventDefault(); // 기본 링크 클릭 동작 방지
            
            // 클릭한 링크가 하이라이트된 링크가 아닌 경우에만 하이라이트 처리
            const targetLink = event.target;
            if (highlightedLink !== targetLink) {
                // 모든 링크를 원래 색으로 복원 (하이라이트 해제)
                if (highlightedLink) {
                    highlightedLink.classList.remove('highlight');
                    highlightedLink.style.backgroundColor = '#fff'; // 원래 색
                    highlightedLink.style.transform = 'scale(1) translateX(0)'; // 초기 크기
                }

                // 클릭한 링크 하이라이트
                highlightedLink = targetLink; // 현재 하이라이트된 링크 저장
                highlightedLink.classList.add('highlight');
                highlightedLink.style.backgroundColor = '#98FF98'; // 새로운 하이라이트 색상
                highlightedLink.style.transform = 'scale(1.1) translateX(10px)'; // 확대 효과
                highlightedLink.style.margin = 0;

            videoId = targetLink.getAttribute('data-video-id');

            // 비디오 ID 유효성 검사
            if (!videoId) {
                alert("유효하지 않은 비디오 ID입니다.");
                return;
            }

            // 기존 iframe이 없으면 새로 생성
            if (!existingIframe) {
                createVideoContainer();
            }

            // 기존 iframe src를 빈 문자열로 설정 후 다시 설정
            existingIframe.src = ''; // 비워서 초기화
            existingIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playlist=${videoId}`; // 새로운 src 설정
        }
    });

    function createLinksHTML() {
        const links = [
            { id: "pkbXucb7mtA", label: "Bola - Para Qweqway" },
            { id: "d_34u3yowvE", label: "Sounds From The Ground - This Land" },
            { id: "RgmufUgVmi8", label: "Shadowy Men - Zombie Compromise" },
            { id: "mmCnQDUSO4I", label: "Shostakovich - Waltz No. 2" },
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
                       padding: 0; 
                       background-color: #fff; 
                       color: #000; 
                       text-decoration: none; 
                       border-bottom: 1px solid #000; 
                       transition: background-color 0.3s, transform 0.2s; 
                       font-size: 14px; 
                       cursor: pointer;" 
                   onmouseover="this.style.backgroundColor='#98FF98'; this.style.transform='scale(1.1)';" 
                   onmouseout="this.style.backgroundColor='#fff'; this.style.transform='scale(1)';">
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
        videoContainer.appendChild(existingIframe); // 비디오 컨테이너에 iframe 추가

        const closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '5px';
        closeButton.style.right = '5px';
        closeButton.style.backgroundColor = '#FF6347'; // 버튼 배경 색상
        closeButton.style.color = 'white'; // 버튼 글자 색상
        closeButton.style.border = 'none';
        closeButton.style.padding = '3px 11px'; // 버튼 크기 조정
        closeButton.style.cursor = 'pointer';
        closeButton.style.zIndex = '10'; // 버튼이 비디오 위에 보이도록
        closeButton.style.transition = 'transform 0.2s'; // 버튼 확대 효과

        closeButton.addEventListener('click', function() {
            videoContainer.remove(); // 비디오 컨테이너 제거
            existingIframe = null; // 기존 iframe 변수 초기화
            highlightedLink = null; // 하이라이트된 링크 초기화
            videoId = ''; // 비디오 ID 초기화
        });

        closeButton.onmouseover = function() {
            this.style.transform = 'scale(1.1)'; // 확대 효과
        };
        closeButton.onmouseout = function() {
            this.style.transform = 'scale(1)'; // 원래 크기로 복원
        };

        videoContainer.appendChild(closeButton); // 비디오 컨테이너에 버튼 추가
        musicEContainer.appendChild(videoContainer); // 음악 컨테이너에 비디오 추가
    }
});
