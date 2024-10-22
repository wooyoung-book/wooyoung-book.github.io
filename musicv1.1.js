
document.addEventListener("DOMContentLoaded", function() {
    const dropdownButton = document.getElementById('dropdown-button');
    const dropdownMenu = document.getElementById('dropdown-menu');

    // Populate the dropdown menu with links from music.js
    dropdownMenu.innerHTML = createLinksHTML();

    dropdownButton.addEventListener('click', function() {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    dropdownMenu.addEventListener('click', function(event) {
        if (event.target.matches('a[data-video-id]')) {
            event.preventDefault(); // 기본 링크 클릭 동작 방지
            const videoId = event.target.getAttribute('data-video-id');
            alert(`Selected Video ID: ${videoId}`); // 비디오 ID를 확인하기 위한 알림
            dropdownMenu.style.display = 'none'; // 메뉴 숨기기
        }
    });
});

function createLinksHTML() {
    const links = [
        { id: "pkbXucb7mtA", label: "Bola - Para Qweqway" },
        { id: "d_34u3yowvE", label: "Sounds From The Ground - This Land" },
        { id: "RgmufUgVmi8", label: "Shadowy Men On A Shadowy Planet - Zombie Compromise" },
        { id: "mmCnQDUSO4I", label: "Dmitri Shostakovich - Waltz No. 2" },
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

    return links.map(link => `
        <div style="margin: 5px; padding: 5px;">
            <a href="#" 
               data-video-id="${link.id}">
                ${link.label}
            </a>
        </div>
    `).join('');
}
