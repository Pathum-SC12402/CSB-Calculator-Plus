document.getElementById('menu-toggle').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
});

document.getElementById('calculator-btn').addEventListener('click', function() {
    loadContent('Calculator.html', 'calculator-content', 'calculator-header');
});

document.getElementById('geometry-btn').addEventListener('click', function() {
    loadContent('Geometry.html', 'geometry-content', 'geometry-header');
});

document.getElementById('converter-btn').addEventListener('click', function() {
    loadContent('Converter.html', 'converter-content', 'converter-header');
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

const modeToggle = document.getElementById('mode-toggle');
const logo = document.getElementById('logo');
const footerLogo = document.getElementById('footer-logo');

modeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('dark-mode')) {
        modeToggle.textContent = '☀️';
        logo.src = 'Source/Images/logo-white.webp';
        footerLogo.src = 'Source/Images/logo-white.webp';
    } else {
        modeToggle.textContent = '🌙';
        logo.src = 'Source/Images/logo.webp';
        footerLogo.src = 'Source/Images/logo.webp';
    }
});

// Set default mode
document.body.classList.add('light-mode');
