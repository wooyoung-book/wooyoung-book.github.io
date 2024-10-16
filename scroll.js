function scrollToElementPosition(elementId, relativePosition = 0.5, behavior = 'smooth') {
    const element = document.getElementById(elementId);

    if (!element) {
        console.error(`Element with ID "${elementId}" not found.`);
        return;
    }

    element.onload = function() {
        const elementDocument = element.contentDocument || element.contentWindow.document;

        if (elementDocument) {
            const totalHeight = elementDocument.body.scrollHeight; // 문서의 전체 높이
            const scrollTo = totalHeight * relativePosition; // 상대적 위치 계산

            elementDocument.defaultView.scrollTo({
                top: scrollTo,
                behavior: behavior
            });
        }
    };
}

// 사용 예시
// scrollToElementPosition('myIframe', 0.5); // 문서 높이의 50% 위치로 스크롤

