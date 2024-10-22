<div id="music-c" style="position: relative; display: inline-block;">
    <button id="dropdown-button" style="padding: 10px; background-color: #FFFEBD; border: none; border-radius: 5px; cursor: pointer;">
        Select a Track
    </button>
    <div id="dropdown-menu" style="display: none; position: absolute; background-color: white; border: 1px solid #ccc; z-index: 1000; margin-top: 5px; border-radius: 5px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
        ${createLinksHTML()}
    </div>
</div>

document.addEventListener("DOMContentLoaded", function() {
    const dropdownButton = document.getElementById('dropdown-button');
    const dropdownMenu = document.getElementById('dropdown-menu');

    dropdownButton.addEventListener('click', function() {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    // 링크 클릭 시 비디오 재생 코드 유지...
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
               data-video-id="${link.id}" 
               style="
                   display: block; 
                   padding: 10px; 
                   background-color: #FFFEBD; 
                   color: black; 
                   text-decoration: none; 
                   border-radius: 5px; 
                   transition: background-color 0.3s;
               "
               onmouseover="this.style.backgroundColor='#FFD700';"
               onmouseout="this.style.backgroundColor='#FFFEBD';">
                ${link.label}
            </a>
        </div>
    `).join('');
}
