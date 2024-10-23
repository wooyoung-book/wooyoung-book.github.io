// 첫 로딩 여부 확인
if (!sessionStorage.getItem('isFirstLoad')) {
    // 쿠키 삭제 함수
    function deleteCookie(name) {
        document.cookie = name + '=; Max-Age=0; path=/';
    }

    // 모든 쿠키 삭제 함수
    function deleteAllCookies() {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            const equalPos = cookie.indexOf("=");
            const cookieName = equalPos > -1 ? cookie.substr(0, equalPos) : cookie;
            deleteCookie(cookieName);
        }
    }

    // 캐시 무시하고 페이지 새로 고침
    function reloadWithoutCache() {
        window.location.reload(true);
    }

    // 실행
    deleteAllCookies();
    reloadWithoutCache();

    // 첫 로딩 상태 기록
    sessionStorage.setItem('isFirstLoad', 'true');
}
