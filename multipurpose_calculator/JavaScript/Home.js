document.getElementById('calculator-btn').addEventListener('click', function() {
    loadContent('Calculator.html', 'calculator-content', 'calculator-header');
});

document.getElementById('geometry-btn').addEventListener('click', function() {
    loadContent('Geometry.html', 'geometry-content', 'geometry-header');
});

document.getElementById('converter-btn').addEventListener('click', function() {
    loadContent('Convertor.html', 'converter-content', 'converter-header');
});

function loadContent(url, contentId, headerId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const newContent = doc.getElementById(contentId).innerHTML;
            const newHeader = doc.getElementById(headerId).innerHTML;
            document.getElementById('content-area').innerHTML = newContent;
            document.getElementById('main-header').innerHTML = newHeader;
        })
        .catch(err => console.error('Failed to load the page: ', err));
}