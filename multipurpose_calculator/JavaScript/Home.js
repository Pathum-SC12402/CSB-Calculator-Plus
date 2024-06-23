document.getElementById('dropbtn').addEventListener('click', function() {
    var menu = document.getElementById('dropdown-content');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
});

// Hide menu when clicking outside
document.addEventListener('click', function(event) {
    var menu = document.getElementById('menu');
    var menuToggle = document.getElementById('menu-toggle');
    if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
        menu.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Load the saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
});

document.getElementById('home-btn').addEventListener('click', function() {
    window.location.href='Home.html';
});

document.getElementById('calculator-btn').addEventListener('click', function() {
    loadContent('Calculator');
    this.onclick(document.getElementById('dropdown-content').style.display='none');
});

document.getElementById('scientific-btn').addEventListener('click', function() {
    loadContent('Scientific');
    this.onclick(document.getElementById('dropdown-content').style.display='none');
});

document.getElementById('integration-btn').addEventListener('click', function() {
    loadContent('Integration');
    this.onclick(document.getElementById('dropdown-content').style.display='none');
});

document.getElementById('derivation-btn').addEventListener('click', function() {
    loadContent('Derivation');
    this.onclick(document.getElementById('dropdown-content').style.display='none');
});

document.getElementById('geometry-btn').addEventListener('click', function() {
    loadContent('Geometry');
    this.onclick(document.getElementById('dropdown-content').style.display='none');
});

document.getElementById('converter-btn').addEventListener('click', function() {
    loadContent('Convertor');
    this.onclick(document.getElementById('dropdown-content').style.display='none');
});

function loadContent(type) {
    fetch(`${type}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('home-content').innerHTML = html;
            loadCSS(`CSS/${type}.css`);
            loadJS(`JavaScript/${type}.js`);
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
    if (document.body.classList.contains('dark-mode')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});

function setTheme(theme) {
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(`${theme}-mode`);

    if (theme === 'dark') {
        modeToggle.textContent = '☀️';
        logo.src = '/multipurpose_calculator/Source/Images/logo-white.webp';
        footerLogo.src = '/multipurpose_calculator/Source/Images/logo-white.webp';
    } else {
        modeToggle.textContent = '🌙';
        logo.src = '/multipurpose_calculator/Source/Images/logo.webp';
        footerLogo.src = '/multipurpose_calculator/Source/Images/logo.webp';
    }

    // Save the theme to localStorage
    localStorage.setItem('theme', theme);
}

// Set default mode to light if not set                     
if (!localStorage.getItem('theme')) {                            // THIS CODE NOT WORKING
    setTheme('light');
}
