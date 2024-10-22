document.addEventListener("DOMContentLoaded", function() {
    const musicContainer = document.getElementById('music-c');
    const musicDetails = document.getElementById('music-d');
    const musicEContainer = document.getElementById('music-e');
    
    let linksAdded = false;
    let existingIframe = null;
    let highlightedLink = null;
    let videoId = '';
    
    // 관련 정보 표시를 위한 요소
    const infoDisplay = document.createElement('div');
    infoDisplay.style.marginTop = '10px';
    infoDisplay.style.fontSize = '16px';
    musicEContainer.appendChild(infoDisplay);
    
    musicDetails.addEventListener('toggle', function() {
        if (musicDetails.open) {
            if (!linksAdded) {
                musicContainer.innerHTML = createLinksHTML();
                linksAdded = true;
                console.log("Links added to music container");
            }
            if (videoId) {
                highlightLink(videoId);
            }
        }
    });

    musicContainer.addEventListener('click', function(event) {
        const targetLink = event.target.closest('a[data-video-id]');
        if (targetLink) {
            event.preventDefault();
            const currentVideoId = targetLink.getAttribute('data-video-id');
            const currentLabel = targetLink.textContent; // 링크 정보 저장

            if (highlightedLink !== targetLink) {
                removeHighlight();
                highlightedLink = targetLink;
                highlightLink(currentVideoId);
                videoId = currentVideoId;

                if (!existingIframe) {
                    createVideoContainer();
                }
                existingIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playlist=${videoId}`; 

                // iframe 아래에 링크 정보 표시
                infoDisplay.textContent = `현재 재생 중: ${currentLabel}`;
            }
        }
    });

    function highlightLink(videoId) {
        const linkToHighlight = musicContainer.querySelector(`a[data-video-id="${videoId}"]`);
        if (linkToHighlight) {
            linkToHighlight.classList.add('highlight');
            linkToHighlight.style.backgroundColor = '#98FF98'; 
            linkToHighlight.style.transform = 'scale(1.1) translateX(10px)'; 
        }
    }

    function removeHighlight() {
        if (highlightedLink) {
            highlightedLink.classList.remove('highlight');
            highlightedLink.style.backgroundColor = '#fff'; 
            highlightedLink.style.transform = 'scale(1) translateX(0)';
        }
    }

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
            removeHighlight(); // Clear highlight when closing
            videoId = '';
            infoDisplay.textContent = ''; // 정보 초기화
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
