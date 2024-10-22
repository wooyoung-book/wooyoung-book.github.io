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
            console.log("Links added to music container");
        } 
        
        if (musicDetails.open && videoId) {
            const linkToHighlight = musicContainer.querySelector(`a[data-video-id="${videoId}"]`);
            if (linkToHighlight) {
                highlightedLink = linkToHighlight;
                highlightedLink.classList.add('highlight');
                highlightedLink.style.backgroundColor = '#98FF98'; 
                highlightedLink.style.transform = 'scale(1.1) translateX(10px)'; 
            }
        }
    });

    musicContainer.addEventListener('click', function(event) {
        if (event.target.matches('a[data-video-id]')) {
            event.preventDefault();
            const targetLink = event.target;
            if (highlightedLink !== targetLink) {
                if (highlightedLink) {
                    highlightedLink.classList.remove('highlight');
                    highlightedLink.style.backgroundColor = '#fff'; 
                    highlightedLink.style.transform = 'scale(1) translateX(0)';
                }

                highlightedLink = targetLink; 
                highlightedLink.classList.add('highlight');
                highlightedLink.style.backgroundColor = '#98FF98';
                highlightedLink.style.transform = 'scale(1.1) translateX(10px)';

                videoId = targetLink.getAttribute('data-video-id');
                if (!videoId) {
                    alert("유효하지 않은 비디오 ID입니다.");
                    return;
                }

                if (!existingIframe) {
                    createVideoContainer();
                }

                existingIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playlist=${videoId}`; 
            }
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
                   onmouseover="this.style.backgroundColor='#98FF98'; this.style.transform='scale(1.1) translateX(10px)';"
                   onmouseout="this.style.backgroundColor='#fff'; this.style.transform='scale(1) translateX(0)';">
                    ${link.label}
                </a>
            </div>
        `).join('');
    }

    function createVideoContainer() {
        const videoContainer = document.createElement('div');
        videoContainer.style.position = 'relative';
        videoContainer.style.width = '320px';
        videoContainer.style.height = '180px';
        videoContainer.style.marginTop = '10px';

        existingIframe = document.createElement('iframe');
        existingIframe.width = "100%";
        existingIframe.height = "100%";
        existingIframe.frameBorder = "0";
        existingIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        existingIframe.allowFullscreen = true;
        videoContainer.appendChild(existingIframe);

        const closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '5px';
        closeButton.style.right = '5px';
        closeButton.style.backgroundColor = '#FF6347';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.padding = '3px 11px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.zIndex = '10';
        closeButton.style.transition = 'transform 0.2s';

        closeButton.addEventListener('click', function() {
            videoContainer.remove();
            existingIframe = null;
            highlightedLink = null;
            videoId = '';
        });

        closeButton.onmouseover = function() {
            this.style.transform = 'scale(1.1)';
        };
        closeButton.onmouseout = function() {
            this.style.transform = 'scale(1)';
        };

        videoContainer.appendChild(closeButton);
        musicEContainer.appendChild(videoContainer);
    }
});
