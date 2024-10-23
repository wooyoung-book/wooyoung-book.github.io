 // CSS 스타일 인라인 추가
        const style = document.createElement('style');
        style.innerHTML = `
            body {
                font-family: Arial, sans-serif;
            }
            #music-d {
                cursor: pointer;
            }
            .highlight {
                background-color: #98FF98;
            }
            .video-container {
                position: relative;
                width: 320px;
                height: 180px;
                margin-top: 10px;
            }
            .close-button {
                position: absolute;
                top: 5px;
                right: 5px;
                background-color: #FF6347;
                color: white;
                border: none;
                padding: 3px 11px;
                cursor: pointer;
                z-index: 10;
                transition: transform 0.2s;
            }
            .close-button:hover {
                transform: scale(1.1);
            }
            .link {
                display: block;
                padding: 5px;
                text-decoration: none;
                color: #000;
                border-bottom: 1px solid #ccc;
            }
        `;
        document.head.appendChild(style);

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
                    }
                } else {
                    removeHighlight();
                    videoId = '';
                }
            });

            musicContainer.addEventListener('click', function(event) {
                const targetLink = event.target.closest('a[data-video-id]');
                if (targetLink) {
                    event.preventDefault();
                    const currentVideoId = targetLink.getAttribute('data-video-id');

                    if (highlightedLink !== targetLink) {
                        removeHighlight();
                        highlightedLink = targetLink;
                        highlightLink(currentVideoId);
                        videoId = currentVideoId;

                        if (!existingIframe) {
                            createVideoContainer();
                        }
                        existingIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playlist=${videoId}`;

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
                    removeHighlight();
                    videoId = '';
                    history.pushState(null, '', window.location.pathname);
                });

                videoContainer.appendChild(closeButton);
                musicEContainer.appendChild(videoContainer);
            }

            document.addEventListener('click', function(event) {
                if (!musicDetails.contains(event.target)) {
                    if (highlightedLink) {
                        highlightLink(highlightedLink.getAttribute('data-video-id'));
                    }
                }
            });
        });
