// 모든 iframe에 대해 유튜브 API 초기화
const iframes = document.querySelectorAll('.youtube-video');
iframes.forEach(iframe => {
    const player = new YT.Player(iframe, {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
});

// 모든 비디오에 대한 상태 변화 감지
function onPlayerStateChange(event) {
    // 비디오가 풀스크린에서 해제될 때
    if (event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED) {
        const iframeRect = event.target.getIframe().getBoundingClientRect();
        const videoPosition = iframeRect.top + window.scrollY; // 문서 내 비디오의 위치

        // 해당 위치로 스크롤 이동
        scrollToVideoPosition(videoPosition);
    }
}

// 지정한 위치로 스크롤하는 함수
function scrollToVideoPosition(position) {
    window.scrollTo({
        top: position,
        behavior: 'smooth' // 부드러운 스크롤 애니메이션
    });
}
