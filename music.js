
        // CSS 스타일 인라인 추가
        const style = document.createElement('style');
        style.innerHTML = `
            body {
                font-family: Arial, sans-serif;
            }
            #music-c {
                text-align: center; /* 링크 중앙 정렬 */
                cursor: pointer;
            }

            #music-d summary.bold {
                    font-weight: bold;
                }

            .video-container {
                position: relative;
                width: 320px;
                height: 180px;
                margin-top: 0;
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
                padding: 1px;
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
                let videoContainer = null;
            let linksAdded = false;
            let existingIframe = null;
        let currentActiveLink = null;

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
                }

                musicContainer.querySelectorAll('a[data-video-id]').forEach(link => {
                link.style.display = '';  // 모든 항목 보이기
                });

                // 현재 진행 중인 항목 숨기기
                if (currentActiveLink) {
                    currentActiveLink.style.display = 'none';  // 현재 항목 숨기기
                }
        });
            musicContainer.addEventListener('click', function(event) {
                const targetLink = event.target.closest('a[data-video-id]');
                if (targetLink) {
                    event.preventDefault();
                    const videoId = targetLink.getAttribute('data-video-id');
                    musicDetails.querySelector('summary').textContent = `현재 플레이: ${targetLink.textContent}`;
                        musicDetails.querySelector('summary').classList.add('bold');
                    // 드롭다운 제목 하이라이트
                    musicDetails.querySelector('summary').style.backgroundColor = '#98FF98';

                
                    if (!existingIframe) {
                        createVideoContainer();
                    }
                        
   (existingIframe.contentWindow || existingIframe.documentWindow).location.replace(`https://www.youtube.com/embed/${videoId}?autoplay=1&playlist=${videoId}`);

                   // existingIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playlist=${videoId}`;

                     // 현재 진행 중인 항목 업데이트
                 currentActiveLink = targetLink;

                        // 모든 항목 보이게 하고 현재 진행 중인 항목 숨기기
                        musicContainer.querySelectorAll('a[data-video-id]').forEach(link => {
                            link.style.display = ''; // 모든 항목 보이기
                        });

                        // 클릭한 항목 숨기기
                        currentActiveLink.style.display = 'none';  // 해당 항목 숨기기

                }
            });

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

        function closeVideo() {
                         if (videoContainer) {
                        videoContainer.remove();
                    }
                    existingIframe = null;

                    // 드롭다운 제목 복구
                    const summary = musicDetails.querySelector('summary');
                    summary.style.backgroundColor = ''; // 하이라이트 제거
                    summary.textContent = 'Music(Ambient/Instrumental/...)'; // 제목 복구
        }

            function createVideoContainer() {
                videoContainer = document.createElement('div');
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
                        closeVideo();
                });

                videoContainer.appendChild(closeButton);
                musicEContainer.appendChild(videoContainer);
            }


});
