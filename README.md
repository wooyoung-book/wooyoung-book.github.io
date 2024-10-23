<div id="music-e"></div>

<div style="border-bottom: 0.5px solid;">
  <details id="music-d" class="content-details">
    <summary><b>Music(Ambient/Instrumental/...)</b></summary>
    <span id="music-c" class="content" style="overflow-y: scroll; height:300px; display:block"></span>
  </details>
</div>

<div style="border-bottom: 0.5px solid;">
  <details class="content-details" data-url="chess.html">
    <summary><b>I hate chess.</b></summary>
    <span class="content" style="display:block"></span>
  </details>
</div>

<div style="border-bottom: 0.5px solid;">
  <details class="content-details" data-url="video.html">
    <summary><b>Video</b></summary>
    <span class="content" style="display:block"></span>
  </details>
</div>

<div style="border-bottom: 0.5px solid;">
  <details class="content-details" data-url="review.html">
    <summary><b>Book Review</b></summary>
    <span class="content" style="overflow-y: scroll; height:500px; display:block"></span>
  </details>
</div>

<script src="load.js" defer></script>
<script src="music.js" defer></script>

<div id="custom-dropdown" class="dropdown">
    <button onclick="toggleDropdown()">드롭다운</button>
    <div id="dropdown-content" class="dropdown-content hidden">
        <a href="#">링크 1</a>
        <a href="#">링크 2</a>
        <a href="#">링크 3</a>
    </div>
</div>
<script>
  function toggleDropdown() {
    const content = document.getElementById('dropdown-content');
    content.classList.toggle('hidden');
}
</script>


