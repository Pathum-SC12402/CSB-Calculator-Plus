document.getElementById('menu-toggle').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
});

document.getElementById('standard-btn').addEventListener('click', () => loadCalculator('standard'));
document.getElementById('scientific-btn').addEventListener('click', () => loadCalculator('scientific'));
document.getElementById('converter-btn').addEventListener('click', () => loadCalculator('converter'));
document.getElementById('integration-btn').addEventListener('click', () => loadCalculator('integration'));
document.getElementById('derivation-btn').addEventListener('click', () => loadCalculator('derivation'));

function loadCalculator(type) {
    fetch(`components/${type}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content-area').innerHTML = html;
            loadCSS(`css/components/${type}.css`);
            loadJS(`js/components/${type}.js`);
        })
        .catch(err => console.error('Failed to load calculator: ', err));
}

function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

function loadJS(src) {
    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
}

const modeToggle = document.getElementById('mode-toggle');
const logo = document.getElementById('logo');
const footerLogo = document.getElementById('footer-logo');

modeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('dark-mode')) {
        modeToggle.textContent = '☀️';
        logo.src = 'images/logo-white.webp';
        footerLogo.src = 'images/logo-white.webp';
    } else {
        modeToggle.textContent = '🌙';
        logo.src = 'images/logo.webp';
        footerLogo.src = 'images/logo.webp';
    }
});

// Set default mode
document.body.classList.add('light-mode');

// Load standard calculator by default
loadCalculator('standard');
