let isDegree = true;
let memoryValue = 0;

function setDegreeMode() {
    isDegree = true;
    document.getElementById('deg-btn').classList.add('active-btn');
    document.getElementById('deg-btn').classList.remove('inactive-btn');
    document.getElementById('rad-btn').classList.remove('active-btn');
    document.getElementById('rad-btn').classList.add('inactive-btn');
}

function setRadianMode() {
    isDegree = false;
    document.getElementById('rad-btn').classList.add('active-btn');
    document.getElementById('rad-btn').classList.remove('inactive-btn');
    document.getElementById('deg-btn').classList.remove('active-btn');
    document.getElementById('deg-btn').classList.add('inactive-btn');
}

function clearDisplay() {
    document.getElementById('display').value = '';
    document.getElementById('formatted-display').innerHTML = '';
}

function deleteLast() {
    const display = document.getElementById('display');
    const formattedDisplay = document.getElementById('formatted-display');
    display.value = display.value.slice(0, -1);
    formattedDisplay.innerHTML = formattedDisplay.innerHTML.slice(0, -1);
}

function appendCharacter(char) {
    const display = document.getElementById('display');
    const formattedDisplay = document.getElementById('formatted-display');
    display.value += char;
    formattedDisplay.innerHTML += formatCharacter(char);
}

function formatCharacter(char) {
    if (char === 'Math.PI') return 'π';
    if (char === 'Math.sqrt(') return '√(';
    if (char === 'Math.exp(') return 'e^(';
    if (char === 'Math.pow(') return '^(';
    if (char === 'Math.log10(') return 'log(';
    if (char === 'Math.log(') return 'ln(';
    if (char === 'Math.sin(') return 'sin(';
    if (char === 'Math.cos(') return 'cos(';
    if (char === 'Math.tan(') return 'tan(';
    if (char === 'Math.asin(') return 'sin<sup>-1</sup>(';
    if (char === 'Math.acos(') return 'cos<sup>-1</sup>(';
    if (char === 'Math.atan(') return 'tan<sup>-1</sup>(';
    return char;
}

function calculateResult() {
    const display = document.getElementById('display');
    let expression = display.value;

    try {
        if (isDegree) {
            expression = expression.replace(/Math.(sin|cos|tan|asin|acos|atan)\(/g, match => {
                return `${match.slice(0, -1)}(Math.PI/180*`;
            });
        }
        expression = expression.replace(/\^/g, '**');
        const result = eval(expression);
        display.value = result;
        updateHistory(expression + " = " + result);
    } catch (e) {
        display.value = 'Error';
    }
}

function calculateFraction() {
    const display = document.getElementById('display');
    const expression = display.value;
    try {
        const result = eval(expression);
        const fraction = math.fraction(result);
        const closestFraction = `${fraction.n}/${fraction.d}`;
        display.value = closestFraction;
        updateHistory(expression + " = " + closestFraction);
    } catch (e) {
        display.value = 'Error';
    }
}

function updateHistory(entry) {
    const historyList = document.getElementById('history-list');
    const listItem = document.createElement('li');
    listItem.textContent = entry;
    historyList.appendChild(listItem);
    if (historyList.childNodes.length > 10) {
        historyList.removeChild(historyList.firstChild);
    }
}

function calculatePercentage() {
    const display = document.getElementById('display');
    const value = parseFloat(display.value);
    if (!isNaN(value)) {
        display.value = value / 100;
    }
}

function togglePlusMinus() {
    const display = document.getElementById('display');
    const value = parseFloat(display.value);
    if (!isNaN(value)) {
        display.value = -value;
    }
}

function memoryClear() {
    memoryValue = 0;
}

function memoryRecall() {
    document.getElementById('display').value = memoryValue;
}

function memoryAdd() {
    const display = document.getElementById('display');
    const value = parseFloat(display.value);
    if (!isNaN(value)) {
        memoryValue += value;
    }
}

function memorySubtract() {
    const display = document.getElementById('display');
    const value = parseFloat(display.value);
    if (!isNaN(value)) {
        memoryValue -= value;
    }
}

document.getElementById('history-toggle').addEventListener('click', function() {
    const historyElement = document.getElementById('history');
    historyElement.style.display = historyElement.style.display === 'block' ? 'none' : 'block';
});
