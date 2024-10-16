function scrollToElementPosition(elementId, relativePosition = 0.5, behavior = 'smooth') {
    const element = document.getElementById(elementId);

    if (!element) {
        console.error(`Element with ID "${elementId}" not found.`);
        return;
    }

    // Set up the onload event handler
    element.onload = function() {
        const elementDocument = element.contentDocument || element.contentWindow.document;

        if (elementDocument) {
            // Calculate the total height of the document
            const totalHeight = elementDocument.body.scrollHeight; 
            const scrollTo = totalHeight * relativePosition; // Calculate the scroll position

            // Scroll to the calculated position
            elementDocument.defaultView.scrollTo({
                top: scrollTo,
                behavior: behavior
            });
        }
    };

    // If the iframe is already loaded (in case it loads quickly), trigger the onload manually
    if (element.contentDocument.readyState === 'complete') {
        element.onload();
    }
}

// Example usage
// scrollToElementPosition('myIframe', 0.5); // Scroll to 50% of document height
