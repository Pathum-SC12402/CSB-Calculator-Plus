const history = new Array();

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}
//update the expression
function appendCharacter(char) {
    const display = document.getElementById('display');
    display.value += char;
}
//evaluate the expression
function calculateResult() {
    const display = document.getElementById('display');

    if(display.value == ''){
        alert("Please enter an expression to evaluate");
    }else{
        try {
            const result = eval(display.value);
            if (history.length >= 10) {
                history.shift();
            }
            if(display.value != result){
                updateHistory(`${display.value} = ${result}`);
            }
            display.value = result;
        } catch (e) {
            display.value = 'Error';
        }
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
//show history of calculations
function toggleHistory() {
    const historyElement = document.getElementById('history');
    if (historyElement.style.display === 'block') {
        historyElement.style.display = 'none';
    } else {
        historyElement.style.display = 'block';
    }
}

function updateHistory(element){
    const historyList = document.getElementById('history-list');
    if(element != history[history.length - 1]){
        history.push(element);
        historyList.innerHTML = '';
        history.forEach((element, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = element;
            listItem.setAttribute('key', index);
            listItem.addEventListener('click', handleClick);
            historyList.appendChild(listItem);
        });
    }    
}

function handleClick(event) {
    // Retrieve the key value from the clicked <li> element
    const keyValue = event.target.getAttribute('key');
    document.getElementById('display').value = history[keyValue].split(' =')[0];
    console.log("It works, Index = "+keyValue);
    // You can also return the key value or use it as needed
    return keyValue;
}

document.getElementById('history-toggle').addEventListener('click', toggleHistory);
