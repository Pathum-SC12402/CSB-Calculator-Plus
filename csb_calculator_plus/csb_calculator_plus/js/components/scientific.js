//let isDegree = true;
//let memoryValue = 0;

function setDegreeMode() {
    //isDegree = true;
    document.getElementById('deg-btn').classList.add('active-btn');
    document.getElementById('deg-btn').classList.remove('inactive-btn');
    document.getElementById('deg-btn').value = 'true';
    document.getElementById('rad-btn').classList.remove('active-btn');
    document.getElementById('rad-btn').classList.add('inactive-btn');
    document.getElementById('rad-btn').value = 'false';
}

function setRadianMode() {
    //isDegree = false;
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
    if(document.getElementById('display').value === ''){
        const formattedDisplay = document.getElementById('formatted-display');
        formattedDisplay.innerHTML = formattedDisplay.innerHTML.slice(0, -1);
    }
    else{
        const display = document.getElementById('display');
        display.value = display.value.slice(0, -1);
    }
}

function appendCharacter(char) {
    const display = document.getElementById('display');
    const formattedDisplay = document.getElementById('formatted-display');
    display.value += char;
    formattedDisplay.innerHTML += char;
}

function appendOperationCharacter(char){
    const display = document.getElementById('display');
    const formattedDisplay = document.getElementById('formatted-display');
    formattedDisplay.innerHTML += char;
    display.value += char;
}

function calculateResult() {
    let display = document.getElementById('display');
    const formattedDisplay = document.getElementById('formatted-display');
    let expression2;

    if (document.getElementById('rad-btn').value === 'true') {
        expression2 = formattedDisplay.innerHTML
            .replace(/π/g, 'Math.PI')
            .replace(/\^/g, '')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/sin⁻¹\(/g, 'Math.asin(')
            .replace(/cos⁻¹\(/g, 'Math.acos(')
            .replace(/tan⁻¹\(/g, 'Math.atan(')
            .replace(/√\(/g, 'Math.sqrt(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/e\^\(/g, 'Math.exp(')
            .replace(/log₁₀\(/g, 'Math.log10(');
    } else {
        expression2 = formattedDisplay.innerHTML
            .replace(/π/g, 'Math.PI')
            .replace(/√\(/g, 'Math.sqrt(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/e\^\(/g, 'Math.exp(')
            .replace(/\^/g, '')
            .replace(/log₁₀\(/g, 'Math.log10(')
            .replace(/sin\(/g, 'Math.sin((Math.PI/180)*')
            .replace(/cos\(/g, 'Math.cos((Math.PI/180)*')
            .replace(/tan\(/g, 'Math.tan((Math.PI/180)*')
            .replace(/sin⁻¹\(/g, 'Math.asin(')
            .replace(/cos⁻¹\(/g, 'Math.acos(')
            .replace(/tan⁻¹\(/g, 'Math.atan(');
    }

    try {
        let result = eval(expression2);

        // Check for finite and valid numerical results
        if (!isFinite(result) || isNaN(result)) {
            display.value = 'Error';
        } else {
            // Round the result to avoid floating-point precision issues
            result = Math.round(result * 1e12) / 1e12;

            // Check for extremely large or small results
            if (Math.abs(result) > 1e12 || Math.abs(result) < 1e-12) {
                display.value = 'Out of Range';
            } else {
                display.value = result;
            }
        }
    } catch (error) {
        display.value = 'Error';
    }
    console.log(expression2);
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
    let dis = document.getElementById('formatted-display');
    if(dis.innerHTML.endsWith("+") || dis.innerHTML.endsWith("-") ||dis.innerHTML.endsWith("*") ||dis.innerHTML.endsWith("/")){
        if(dis.innerHTML === '')
            dis.innerHTML = '-(';
        else if(dis.innerHTML === '-(')
            dis.innerHTML = dis.innerHTML.slice(2);
        else if (dis.innerHTML.startsWith("-(")) {
            dis.innerHTML = dis.innerHTML.slice(2); // Remove "-(" from the beginning and ")" from the end
        }
        else
            dis.innerHTML = '-(' + dis.innerHTML;
    } else {
        if(dis.innerHTML === '')
            dis.innerHTML = '-(';
        else if (dis.innerHTML.startsWith("-(") && dis.innerHTML.endsWith(")")) {
            dis.innerHTML = dis.innerHTML.slice(2, -1); // Remove "-(" from the beginning and ")" from the end
        }
        else if(dis.innerHTML === '-(')
            dis.innerHTML = dis.innerHTML.slice(2);
        else
            dis.innerHTML = '-(' + dis.innerHTML + ')'; 
    }
}

// function memoryClear() {
//     memoryValue = 0;
// }

// function memoryRecall() {
//     document.getElementById('display').value = memoryValue;
// }

// function memoryAdd() {
//     const display = document.getElementById('display');
//     const value = parseFloat(display.value);
//     if (!isNaN(value)) {
//         memoryValue += value;
//     }
// }

// function memorySubtract() {
//     const display = document.getElementById('display');
//     const value = parseFloat(display.value);
//     if (!isNaN(value)) {
//         memoryValue -= value;
//     }
// }

// document.getElementById('history-toggle').addEventListener('click', function() {
//     const historyElement = document.getElementById('history');
//     historyElement.style.display = historyElement.style.display === 'block' ? 'none' : 'block';
// });