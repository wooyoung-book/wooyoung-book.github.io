document.addEventListener("DOMContentLoaded", function() {
    // 첫 시작 시 강제 새로 고침
    if (!window.location.search.includes('refreshed=true')) {
        // 새로 고침을 위해 URL에 쿼리 매개변수를 추가
        const newUrl = window.location.href.split('?')[0] + '?refreshed=true';
        history.replaceState(null, '', newUrl); // URL 변경, 새로 고침하지 않음
        // 페이지 새로 고침 (캐시 무시)
        window.location.reload(true);
    }

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

    // 탭 종료 시 쿠키 삭제
    window.addEventListener('beforeunload', function() {
        deleteAllCookies();
    });
});
