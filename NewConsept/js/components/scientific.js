let inputVal = "";
let arrayValuesDisplay = [];
let arrayValuesCalculate = [];
let ans = 0;

function insert(inputVal) {}

function insertResult(result) {
    document.querySelector("#result").innerHTML = "=";
    document.querySelector("#result").insertAdjacentHTML("beforeend", `${result}`);
}

document.querySelector("#buttons").addEventListener('click', (e) => {
    const targetClass = e.target.classList;
    const value = e.target.dataset.value;

    if (targetClass.contains('btn-num')) {
        arrayValuesCalculate.push(e.target.innerText);
        arrayValuesDisplay.push(e.target.innerText);
    }

    if (targetClass.contains('btn-sign')) {
        changeSign();
    }

    if (targetClass.contains('btn-dot')) {
        arrayValuesCalculate.push('.');
        arrayValuesDisplay.push('.');
    }

    checkEXPMode(e);

    if (targetClass.contains('btn-special') && !targetClass.contains('btn-none')) {
        arrayValuesDisplay.push(e.target.innerText);

        if (targetClass.contains('btn-alg')) {
            arrayValuesCalculate.push(`Math.${value}`);
            arrayValuesCalculate.push('(');
            arrayValuesDisplay.push('(');
        } else if (targetClass.contains('btn-mult')) {
            arrayValuesCalculate.push('*');
        } else if (targetClass.contains('btn-sqrt')) {
            arrayValuesCalculate.push('Math.sqrt(');
            arrayValuesDisplay.push('(');
        } else if (targetClass.contains('btn-PI')) {
            arrayValuesCalculate.push('Math.PI');
        } else if (targetClass.contains('btn-E')) {
            arrayValuesCalculate.push('Math.E');
        } else if (targetClass.contains('btn-%')) {
            arrayValuesCalculate.push('/100');
        } else {
            arrayValuesCalculate.push(e.target.innerText);
        }
    }

    if (targetClass.contains('btn-EXP')) {
        arrayValuesCalculate.push('*10**(');
        arrayValuesDisplay.push("x10<sup>");
        modeOnlyDigitKey = 1;
    }

    if (targetClass.contains('btn-exp1')) {
        arrayValuesCalculate.push('**(-1)');
        arrayValuesDisplay.push('⁻¹');
    }
    if (targetClass.contains('btn-exp2')) {
        arrayValuesCalculate.push('**(2)');
        arrayValuesDisplay.push('²');
    }
    if (targetClass.contains('btn-exp3')) {
        arrayValuesCalculate.push('**(3)');
        arrayValuesDisplay.push('³');
    }
    if (targetClass.contains('btn-pow')) {
        arrayValuesCalculate.push('**');
        arrayValuesDisplay.push('^');
    }
    if (targetClass.contains('btn-Ans')) {
        arrayValuesCalculate.push(ans);
        arrayValuesDisplay.push('Ans');
    }

    updateDisplay();
});

let modeOnlyDigitKey = 0;
function checkEXPMode(e) {
    if (!['btn-num', 'btn-dot', 'btn-del', 'btn-sign'].includes(e.target.classList[1])) {
        if (modeOnlyDigitKey == 1) {
            arrayValuesCalculate.push('*1)');
            arrayValuesDisplay.push("</sup>");
            modeOnlyDigitKey = 0;
        }
    }
}

function updateDisplay() {
    document.querySelector("#display").innerHTML = arrayValuesDisplay.join('');
}

const availableChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '/', '-', '(', ')', '|', '^'];
window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.key == "Escape") {document.querySelector("#btn-AC").click();}
    else if (e.key == "Enter") {document.querySelector("#btn-equal").click();} 
    else if (e.key == 'Backspace') {document.querySelector("#Del").click();}
    else if (e.key == '*') { document.querySelector('.btn-mult').click();}
    else if (availableChars.includes(e.key)) {
        if (availableChars.indexOf(e.key) <= 9) {
            arrayValuesCalculate.push(e.key);
            arrayValuesDisplay.push(e.key);
        } else {
            arrayValuesCalculate.push(e.key);
            arrayValuesDisplay.push(e.key);
        }
    }
    updateDisplay();
});

document.querySelector("#btn-AC").addEventListener('click', (e) => {
    arrayValuesCalculate = [];
    arrayValuesDisplay = [];
    inputVal = "";
    strNums = "";
    strFuns = "";
    result = 0;
    document.querySelector("#display").innerHTML = "";
    document.querySelector("#result").innerHTML = "=";
});

document.querySelector("#clearAll").addEventListener('click', (e) => {
    document.querySelector("#historial").innerText = "";
    clearHistory();
});

document.querySelector("#Del").addEventListener('click', (e) => {
    if (arrayValuesDisplay[arrayValuesDisplay.length - 1] == '</sup>') {
        arrayValuesCalculate.pop();
        arrayValuesDisplay.pop();
        modeOnlyDigitKey = 1;
    }
    if (arrayValuesDisplay[arrayValuesDisplay.length - 1] == 'x10<sup>') {
        modeOnlyDigitKey = 0;
    }

    arrayValuesCalculate.pop();
    arrayValuesDisplay.pop();
    updateDisplay();
});

let expression = "";
let result = 0;
document.querySelector("#btn-equal").addEventListener('click', (e) => {
    checkEXPMode(e);
    expression = arrayValuesCalculate.join('');
    found = expression.match(/\d+(?=\()|\d+(?=M)/g);
    expression = expression.replace(/\d+(?=\()|\d+(?=M)/g, `(${found})*`);
    expression = expression.replace(/\)(?=\d+)/g, ")*");
    expression = expression.replace(/\)\(/g, ")*(");
    expression = countParenthesesAndFix(expression);

    calculate(expression);
    insertResult(result);
    saveToHistorial();
});

function calculate(expression) {
    try {
        result = eval(expression);
        ans = result;
        return result;
    } catch (err) {
        result = "Error";
        return result;
    }
}

let expHistoryArray = [];
let resHistoryArray = [];
let arrayValuesCalculateHistory = [];
let arrayValuesDisplayHistory = [];
let countHistory = 0;
let historyString = "";

function saveToHistorial() {
    let equation = arrayValuesDisplay.join('');
    let resultH = result;

    if (resultH != "Error" && resultH != "undefined" && resultH != "function sqrt() { [native code] }" && resultH != "NaN") {
        document.querySelector("#historial").insertAdjacentHTML("afterbegin", `<section class='hist ${countHistory}'> ${countHistory + 1}) ${equation} = ${resultH} </section>`);

        historyString = JSON.stringify(arrayValuesDisplay);
        arrayValuesDisplayHistory.push(historyString);
        arrayValuesCalculateHistory.push(JSON.stringify(arrayValuesCalculate));

        expHistoryArray.push(equation);
        resHistoryArray.push(resultH);
        countHistory++;
    }
}

function clearHistory() {
    countHistory = 0;
    expHistoryArray = [];
    resHistoryArray = [];
}

document.querySelector('body').addEventListener('click', function (e) {
    if (e.target.classList[0] == 'hist') {
        let historyValue = e.target.classList[1] * 1;
        let memResult = resHistoryArray[historyValue];
        let memExpr = JSON.parse(arrayValuesDisplayHistory[historyValue]);
        let memEval = JSON.parse(arrayValuesCalculateHistory[historyValue]);

        arrayValuesCalculate = memEval;
        insertResult(memResult);
        arrayValuesDisplay = memExpr;
        updateDisplay();
    }
});

function changeSign() {
    let index = arrayValuesCalculate.length - 1;
    while ((arrayValuesCalculate[index] == '.') || (typeof ((arrayValuesCalculate[index])) == "number")) {
        index--;
    }
    if (arrayValuesCalculate[index] != '-' && arrayValuesCalculate[index] != '+') {
        arrayValuesCalculate.splice(index + 1, 0, '-');
        arrayValuesDisplay.splice(index + 1, 0, '-');
    } else if (arrayValuesCalculate[index] == '-') {
        arrayValuesCalculate[index] = '+';
        arrayValuesDisplay[index] = '+';
    } else if (arrayValuesCalculate[index] == '+') {
        arrayValuesCalculate[index] = '-';
        arrayValuesDisplay[index] = '-';
    }
    updateDisplay();
}

function countParenthesesAndFix(expression) {
    if (expression.match(/\(/g)) {
        let parenthesescount = 0;
        if (expression.match(/\)/g)) {
            parenthesescount = expression.match(/\(/g).length - expression.match(/\)/g).length;
        } else {
            parenthesescount = expression.match(/\(/g).length;
        }

        while (parenthesescount > 0) {
            expression = expression.concat(')');
            parenthesescount = expression.match(/\(/g).length - expression.match(/\)/g).length;
        }
    }
    return expression;
}

function divideAndConquer(expression) {
    // Placeholder for potential future use
}

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
