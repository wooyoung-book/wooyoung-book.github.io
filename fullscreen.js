        window.onload = function() {
        const scrollpos = sessionStorage.getItem('scrollPosition');
        if (scrollpos) {
            window.scrollTo(0, scrollpos);
            sessionStorage.removeItem('scrollpos');
        }
    };

    window.onbeforeunload = function() {
        sessionStorage.setItem('scrollpos', window.scrollY);
    };
