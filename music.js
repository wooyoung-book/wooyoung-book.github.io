document.addEventListener("DOMContentLoaded", function() {
            // music.html 파일 불러오기
            fetch('music.html')
                .then(response => response.text())
                .then(data => {
                    // music.html의 내용을 body에 삽입
                    document.body.innerHTML += data;

                    // 링크 선택
                    const videoLinks = document.querySelectorAll('a[data-video-id]');
                    videoLinks.forEach(link => {
                        link.addEventListener('click', function(event) {
                            event.preventDefault(); // 기본 링크 클릭 동작 방지

                            // 기존 iframe 제거
                            const existingIframe = document.getElementById('music-e').querySelector('iframe');
                            if (existingIframe) {
                                existingIframe.remove();
                            }

                            // iframe 생성
                            const videoId = link.getAttribute('data-video-id');
                            const iframe = document.createElement('iframe');
                            iframe.src = `https://www.youtube.com/embed/${videoId}`;
                            iframe.width = "560";
                            iframe.height = "315";
                            iframe.frameBorder = "0";
                            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                            iframe.allowFullscreen = true;

                            // X 버튼 생성
                            const closeButton = document.createElement('button');
                            closeButton.textContent = 'X';

                            // X 버튼 클릭 시 iframe 제거
                            closeButton.addEventListener('click', function() {
                                document.getElementById('music-e').removeChild(iframe);
                                document.getElementById('music-e').removeChild(closeButton);
                            });

                            // music-e에 iframe과 X 버튼 추가
                            document.getElementById('music-e').appendChild(iframe);
                            document.getElementById('music-e').appendChild(closeButton);
                        });
                    });
                })
                .catch(error => console.error('Error fetching music.html:', error));
        });
