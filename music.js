document.addEventListener("DOMContentLoaded", function() {
    const musicContainer = document.getElementById('music-c');
    const musicDetails = document.getElementById('music-d');
    const musicEContainer = document.getElementById('music-e');

    let linksAdded = false;
    let existingIframe = null;
    let highlightedLink = null;
    let videoId = '';

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

    musicDetails.addEventListener('toggle', function() {
        if (musicDetails.open) {
            if (!linksAdded) {
                musicContainer.innerHTML = createLinksHTML(links);
                linksAdded = true;
                console.log("Links added to music container");
            }
        } else {
            // 드롭다운이 닫힐 때 하이라이트를 제거하고 비디오 ID 초기화
            removeHighlight();
            videoId = '';
        }
    });

    musicContainer.addEventListener('click', function(event) {
        const targetLink = event.target.closest('a[data-video-id]');
        if (targetLink) {
            event.preventDefault();
            const currentVideoId = targetLink.getAttribute('data-video-id');

            // 현재 재생 중인 링크가 바뀌면 하이라이트
            if (highlightedLink !== targetLink) {
                removeHighlight();
                highlightedLink = targetLink;
                highlightLink(currentVideoId);
                videoId = currentVideoId;

                if (!existingIframe) {
                    createVideoContainer();
                }
                existingIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playlist=${videoId}`;

                // 드롭다운 제목 업데이트
                musicDetails.querySelector('summary').textContent = targetLink.textContent;
            }
        }
    });

    function highlightLink(videoId) {
        const linkToHighlight = musicContainer.querySelector(`a[data-video-id="${videoId}"]`);
        if (linkToHighlight) {
            linkToHighlight.classList.add('highlight');
        }
    }

    function removeHighlight() {
        if (highlightedLink) {
            highlightedLink.classList.remove('highlight');
        }
    }

    function createLinksHTML(links) {
        return links.map(link => `
            <div style="margin: 0;">
                <a href="#" 
                   data-video-id="${link.id}" 
                   class="link">
                    ${link.label}
                </a>
            </div>
        `).join('');
    }

    function createVideoContainer() {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';

        existingIframe = document.createElement('iframe');
        existingIframe.width = "100%";
        existingIframe.height = "100%";
        existingIframe.frameBorder = "0";
        existingIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        existingIframe.allowFullscreen = true;
        videoContainer.appendChild(existingIframe);

        const closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        closeButton.className = 'close-button';

        closeButton.addEventListener('click', function() {
            videoContainer.remove();
            existingIframe = null;
            removeHighlight(); // Clear highlight when closing
            videoId = '';
            history.pushState(null, '', window.location.pathname); // 해시 초기화
        });

        videoContainer.appendChild(closeButton);
        musicEContainer.appendChild(videoContainer);
    }

    // 드롭다운 외부 클릭 처리
    document.addEventListener('click', function(event) {
        if (!musicDetails.contains(event.target)) {
            // 드롭다운 외부 클릭 시 하이라이트 유지
            if (highlightedLink) {
                highlightLink(highlightedLink.getAttribute('data-video-id'));
            }
        }
    });
});
