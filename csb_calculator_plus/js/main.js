document.getElementById('menu-toggle').addEventListener('click', function() {
    var menu = document.getElementById('menu');
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
    loadCalculator('standard');
    // Load the saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
});

document.getElementById('standard-btn').addEventListener('click', () => loadCalculator('standard'));
document.getElementById('scientific-btn').addEventListener('click', () => loadCalculator('scientific'));
document.getElementById('programmer-btn').addEventListener('click', () => loadCalculator('programmer'));
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
        logo.src = 'images/logo-white.webp';
        footerLogo.src = 'images/logo-white.webp';
    } else {
        modeToggle.textContent = '🌙';
        logo.src = 'images/logo.webp';
        footerLogo.src = 'images/logo.webp';
    }

    // Save the theme to localStorage
    localStorage.setItem('theme', theme);
}

// Set default mode to light if not set
if (!localStorage.getItem('theme')) {
    setTheme('light');
}

// Load standard calculator by default
loadCalculator('standard');

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    const isCtrlOrCmd = event.ctrlKey || event.metaKey;
    if (isCtrlOrCmd) {
        switch (event.key) {
            case '1':
                loadCalculator('standard');
                break;
            case '2':
                loadCalculator('scientific');
                break;
            case '3':
                loadCalculator('programmer');
                break;
            case '4':
                loadCalculator('converter');
                break;
            case '5':
                loadCalculator('integration');
                break;
            case '6':
                loadCalculator('derivation');
                break;
            default:
                break;
        }
    }
});

//Need to Check in the Windows Environment

// //Second Key Combinations to Load Calculators
// document.addEventListener('keydown', function(event) {
//     const isAltShift = event.altKey && event.shiftKey;
//     if (isAltShift) {
//         switch (event.key) {
//             case '1':
//                 loadCalculator('standard');
//                 break;
//             case '2':
//                 loadCalculator('scientific');
//                 break;
//             case '3':
//                 loadCalculator('programmer');
//                 break;
//             case '4':
//                 loadCalculator('converter');
//                 break;
//             case '5':
//                 loadCalculator('integration');
//                 break;
//             case '6':
//                 loadCalculator('derivation');
//                 break;
//             default:
//                 break;
//         }
//     }
// });