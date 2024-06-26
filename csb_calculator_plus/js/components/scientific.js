let isDegree = true;
let memoryValue = 0;

function setDegreeMode() {
    isDegree = true;
    document.getElementById('deg-btn').classList.add('active-btn');
    document.getElementById('deg-btn').classList.remove('inactive-btn');
    document.getElementById('deg-btn').value = 'true';
    document.getElementById('rad-btn').classList.remove('active-btn');
    document.getElementById('rad-btn').classList.add('inactive-btn');
    document.getElementById('rad-btn').value = 'false';
}

function setRadianMode() {
    isDegree = false;
    document.getElementById('rad-btn').classList.add('active-btn');
    document.getElementById('rad-btn').classList.remove('inactive-btn');
    document.getElementById('rad-btn').value = 'true';
    document.getElementById('deg-btn').classList.remove('active-btn');
    document.getElementById('deg-btn').classList.add('inactive-btn');
    document.getElementById('deg-btn').value = 'false';
}

function clearDisplay() {
    if(document.getElementById('display').value === '')
        document.getElementById('formatted-display').innerHTML = '';
    else
        document.getElementById('display').value = ''; 
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
    let display = document.getElementById('display');
    if(document.getElementById('rad-btn').value === 'true'){
        let expression2 = display.value
            .replace(/π/g, 'Math.PI')
            .replace(/\^/g,'**')
            .replace(/sin\(/g, 'Math.sin\(')
            .replace(/cos\(/g, 'Math.cos\(')
            .replace(/tan\(/g, 'Math.tan\(')
            .replace(/√\(/g, 'Math.sqrt\(')
            .replace(/log\(/g, 'Math.log\(')
            .replace(/exp\(/g,'Math.exp\(')
            .replace(/'asin'\(/g, 'Math.asin\(')
            .replace(/'acos'\(/g, 'Math.acos\(')
            .replace(/'atan'\(/g, 'Math.atan\(');
            try {
                display.value = eval(expression2);
            } catch (error) {
                display.value = 'Error';
            }
            console.log(expression2);
    
    } else {
        let expression2 = display.value
            .replace(/π/g, 'Math.PI')
            .replace(/√\(/g, 'Math.sqrt\(')
            .replace(/log\(/g, 'Math.log\(')
            .replace(/exp\(/g,'Math.exp\(')
            .replace(/\^/g,'**')
            .replace(/sin\(/g, 'Math.sin\((Math.PI/180)*')
            .replace(/cos\(/g, 'Math.cos\((Math.PI/180)*')
            .replace(/tan\(/g, 'Math.tan\((Math.PI/180)*')
            .replace(/'asin'\(/g, 'Math.asin\(')
            .replace(/'acos'\(/g, 'Math.acos\(')
            .replace(/'atan'\(/g, 'Math.atan\(');
            try {
                display.value = eval(expression2);
            } catch (error) {
                display.value = 'Error';
            }
            console.log(expression2);
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

function togglePlusMinus(){
    let dis = document.getElementById('display');
    let regex = /[+\-*\/]/;
    if(dis.value === '')
        dis.value = '-';
    else if (dis.value.startsWith("-(") && dis.value.endsWith(")")) {
        dis.value = dis.value.slice(2, -1); // Remove "-(" from the beginning and ")" from the end
      }
    else if(dis.value.slice(0,1) === '-')
        dis.value = dis.value.slice(1);
    else if(regex.test(dis.value))
        dis.value = '-(' + dis.value + ')';
    else
        dis.value = '-' + dis.value;
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
