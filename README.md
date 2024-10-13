<div style="border-bottom: 0.5px solid; padding: 3px;"><details><summary><b>Music(Ambient/Instrumental/...)</b>
</summary><span id="music" style="font-size: 90%; display:block"></span></details></div>
<script src="music.js"></script>

<div style="border-bottom: 0.5px solid; padding: 3px;"><b>Book Review</b>
<span id="review" style="display:block; font-size: 90%"></span></div>
<script src="review.js"></script>

<div style="border-bottom: 0.5px solid; padding: 3px;"><details><summary><b>Video</b>
</summary><span id="video" style="display:block"></span></details></div>
<script src="video.js"></script>
  <script>
        document.addEventListener('DOMContentLoaded', function() {
            window.addEventListener('beforeunload', function() {
                sessionStorage.setItem('scrollPosition', window.scrollY);
            });

            const scrollPosition = sessionStorage.getItem('scrollPosition');
            if (scrollPosition) {
                window.scrollTo(0, parseInt(scrollPosition, 10));
                sessionStorage.removeItem('scrollPosition');
            }
        });
    </script>
i hate chess


