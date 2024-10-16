  document.getElementById('aliceDetails').addEventListener('toggle', function() {
    if (this.open) {
      const iframe = document.getElementById('alice');
      iframe.onload = function() {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const totalHeight = iframeDocument.body.scrollHeight;
        iframe.contentWindow.scrollTo({
          top: totalHeight,
          behavior: 'smooth'
        });
      };
    }
  });
