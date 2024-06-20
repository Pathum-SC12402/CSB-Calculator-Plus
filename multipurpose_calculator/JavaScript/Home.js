document.getElementById('home-btn').addEventListener('click', function() {
    loadContent('Home.html', 'home-content', 'home-header');
});
document.getElementById('calculator-btn').addEventListener('click', function() {
    loadContent('Calculator.html', 'calculator-content', 'calculator-header');
});
document.getElementById('scientific-btn').addEventListener('click', function() {
    loadContent('Scientific.html', 'scientific-content', 'scientific-header');
});
document.getElementById('integration-btn').addEventListener('click', function() {
    loadContent('Integration.html', 'integration-content', 'integration-header');
});
document.getElementById('derivation-btn').addEventListener('click', function() {
    loadContent('Derivation.html', 'derivation-content', 'derivation-header');
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
            document.getElementById('home-content').innerHTML = newContent;
            document.getElementById('home-header').innerHTML = newHeader;
        })
        .catch(err => console.error('Failed to load the page: ', err));
}