document.getElementById('base-select').addEventListener('change', function() {
    updateButtons(this.value);
    clearDisplay();
});

function updateButtons(base) {
    const allButtons = document.querySelectorAll('.calculator button');
    allButtons.forEach(btn => {
        const val = btn.getAttribute('data-value');
        if (val === 'CE' || val === 'DEL') return; // Always enable C and DEL buttons

        if ((base === '2' && parseInt(val, 10) > 1) ||
            (base === '8' && parseInt(val, 10) > 7) ||
            (base === '10' && parseInt(val, 16) > 9)) {
            btn.disabled = true;
        } else {
            btn.disabled = false;
        }

        // Handle hexadecimal buttons
        if (base === '16' && (val >= 'A' && val <= 'F')) {
            btn.style.display = 'inline-block';
        } else if (val >= 'A' && val <= 'F') {
            btn.style.display = 'none';
        }
    });
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function appendCharacter(char) {
    const display = document.getElementById('display');
    display.value += char;
}

function calculateResult() {
    const display = document.getElementById('display');
    const base = parseInt(document.getElementById('base-select').value, 10);
    try {
        const result = calculateInBase(display.value, base);
        display.value = formatOutputForBase(result, base);
        updateHistory(`${display.value} = ${result}`);
    } catch (e) {
        display.value = 'Error';
    }
}

function calculateInBase(expression, base) {
    const parts = expression.split(/([\+\-\*\/])/);
    let result = 0;
    let currentOperation = null;

    parts.forEach(part => {
        if (['+', '-', '*', '/'].includes(part)) {
            currentOperation = part;
        } else {
            let number = convertBaseToDecimal(part, base);
            switch (currentOperation) {
                case '+': result += number; break;
                case '-': result -= number; break;
                case '*': result *= number; break;
                case '/': result /= number; break;
                default: result = number; // First number in expression
            }
        }
    });

    return result;
}

function convertBaseToDecimal(value, base) {
    const [integer, fraction] = value.split('.');
    let decimalValue = parseInt(integer, base);

    if (fraction) {
        decimalValue += fraction.split('').reduce((acc, digit, index) => {
            return acc + parseInt(digit, base) / Math.pow(base, index + 1);
        }, 0);
    }

    return decimalValue;
}

function formatOutputForBase(value, base) {
    const integerPart = Math.floor(value);
    const fractionPart = value - integerPart;
    let baseInteger = integerPart.toString(base).toUpperCase();
    if (fractionPart === 0) return baseInteger;

    let baseFraction = '';
    let fraction = fractionPart;
    for (let i = 0; i < 5; i++) { // Limit to 5 decimal places
        fraction *= base;
        let digit = Math.floor(fraction);
        baseFraction += digit.toString(base).toUpperCase();
        fraction -= digit;
    }

    return `${baseInteger}.${baseFraction}`;
}

//History of the Answers in Decimal Number System

function updateHistory(entry) {
    const historyList = document.getElementById('history-list');
    const listItem = document.createElement('li');
    listItem.textContent = entry;
    historyList.appendChild(listItem);
    if (historyList.childNodes.length > 10) {
        historyList.removeChild(historyList.firstChild);
    }
}

document.getElementById('history-toggle').addEventListener('click', function() {
    const historyElement = document.getElementById('history');
    historyElement.style.display = historyElement.style.display === 'block' ? 'none' : 'block';
});
