document.getElementById('dropbtn').addEventListener('click', function() {
    var menu = document.getElementById('dropdown-content');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
});

document.getElementById('home-btn').addEventListener('click', function() {
    window.location.href='Home.html';
});

document.getElementById('calculator-btn').addEventListener('click', function() {
    loadContent('Calculator');
    this.onclick(document.getElementById('home-header').innerHTML="Calculator",
    document.getElementById('dropdown-content').style.display='none');
});

document.getElementById('scientific-btn').addEventListener('click', function() {
    loadContent('Scientific');
    this.onclick(document.getElementById('home-header').innerHTML="Scientific",
    document.getElementById('dropdown-content').style.display='none');
});

document.getElementById('integration-btn').addEventListener('click', function() {
    loadContent('Integration');
    this.onclick(document.getElementById('home-header').innerHTML="Integration",
    document.getElementById('dropdown-content').style.display='none');
});

document.getElementById('derivation-btn').addEventListener('click', function() {
    loadContent('Derivation');
    this.onclick(document.getElementById('home-header').innerHTML="Derivation",
    document.getElementById('dropdown-content').style.display='none');
});

document.getElementById('geometry-btn').addEventListener('click', function() {
    loadContent('Geometry');
    this.onclick(document.getElementById('home-header').innerHTML="Deometric",
    document.getElementById('dropdown-content').style.display='none');
});

document.getElementById('converter-btn').addEventListener('click', function() {
    loadContent('Converter');
    this.onclick(document.getElementById('home-header').innerHTML="Converter",
    document.getElementById('dropdown-content').style.display='none');
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