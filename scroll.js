let players = [];
const scrollPositions = [];

// 유튜브 API가 로드된 후 호출되는 함수
function onYouTubeIframeAPIReady() {
    const iframes = document.querySelectorAll('.youtube-video');
    iframes.forEach(iframe => {
        const player = new YT.Player(iframe, {
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
        players.push(player); // 플레이어 저장
    });
}

// 비디오 상태 변화 감지
function onPlayerStateChange(event) {
    // 비디오가 실행될 때
    if (event.data === YT.PlayerState.PLAYING) {
        const scrollY = window.scrollY; // 현재 스크롤 위치
        scrollPositions.push(scrollY); // 위치 저장
        localStorage.setItem('scrollPositions', JSON.stringify(scrollPositions)); // 로컬 저장
    }

    // 비디오가 풀스크린에서 해제될 때
    if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
        scrollToLastPosition(); // 저장된 위치로 스크롤
    }
}

// 스크롤 위치로 이동하는 함수
function scrollToLastPosition() {
    const savedPositions = JSON.parse(localStorage.getItem('scrollPositions'));
    if (savedPositions && savedPositions.length > 0) {
        const lastPosition = savedPositions.pop(); // 마지막 위치 가져오기
        localStorage.setItem('scrollPositions', JSON.stringify(savedPositions)); // 업데이트된 배열 저장
        window.scrollTo({
            top: lastPosition,
            behavior: 'smooth' // 부드러운 스크롤 애니메이션
        });
    }
}
