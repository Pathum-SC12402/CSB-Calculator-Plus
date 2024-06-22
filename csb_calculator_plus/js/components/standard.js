let history = [];

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
    try {
        const result = eval(display.value);
        if (history.length >= 10) {
            history.shift();
        }
        history.push(`${display.value} = ${result}`);
        display.value = result;
        updateHistory();
    } catch (e) {
        display.value = 'Error';
    }
}

function calculatePercentage() {
    const display = document.getElementById('display');
    display.value = parseFloat(display.value) / 100;
}

function togglePlusMinus() {
    const display = document.getElementById('display');
    if (display.value.charAt(0) === '-') {
        display.value = display.value.slice(1);
    } else {
        display.value = '-' + display.value;
    }
}

function toggleHistory() {
    const historyElement = document.getElementById('history');
    if (historyElement.style.display === 'block') {
        historyElement.style.display = 'none';
    } else {
        historyElement.style.display = 'block';
    }
}

function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        historyList.appendChild(listItem);
    });
}

document.getElementById('history-toggle').addEventListener('click', toggleHistory);
