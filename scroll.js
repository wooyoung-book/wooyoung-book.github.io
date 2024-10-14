const scrollPositions = [];

// 클릭 이벤트 시 스크롤 위치 기록
document.addEventListener('click', () => {
    const scrollY = window.scrollY;
    scrollPositions.push(scrollY);
    localStorage.setItem('scrollPositions', JSON.stringify(scrollPositions));
});

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
    if (event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED) {
        const savedPositions = JSON.parse(localStorage.getItem('scrollPositions'));
        if (savedPositions && savedPositions.length > 0) {
            const lastPosition = savedPositions.pop();
            localStorage.setItem('scrollPositions', JSON.stringify(savedPositions));
            window.scrollTo(0, lastPosition);
        }
    }
}
