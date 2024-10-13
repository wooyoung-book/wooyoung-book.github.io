    let lastVideoClicked = null;

    function videoClicked(event) {
        lastVideoClicked = event.target;
    }

    function exitFullscreen() {
        if (lastVideoClicked) {
            lastVideoClicked.scrollIntoView({ behavior: 'smooth' });
        }
    }
