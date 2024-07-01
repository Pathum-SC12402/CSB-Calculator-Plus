document.addEventListener('DOMContentLoaded', () => {
    loadConverter('base');
});

function loadConverter(defaultType = null) {
    const converterType = defaultType || document.getElementById('converter-type').value;
    const fieldsContainer = document.getElementById('converter-fields');
    fieldsContainer.innerHTML = '';

    switch (converterType) {
        case 'length':
            fieldsContainer.innerHTML = `
                <center><h3>Length Converter</h3></center><br>
                <input type="number" id="length-input" class="inputs" placeholder="Enter value">
                <select id="length-units-from">
                    <option value="m">Meters</option>
                    <option value="km">Kilometers</option>
                    <option value="cm">Centimeters</option>
                    <option value="mm">Millimeters</option>
                    <option value="in">Inches</option>
                    <option value="ft">Feet</option>
                    <option value="yd">Yards</option>
                    <option value="mi">Miles</option>
                </select>
                <div class="arrow">⬇</div>
                <select id="length-units-to">
                    <option value="cm">Centimeters</option>
                    <option value="m">Meters</option>
                    <option value="km">Kilometers</option>
                    <option value="mm">Millimeters</option>
                    <option value="in">Inches</option>
                    <option value="ft">Feet</option>
                    <option value="yd">Yards</option>
                    <option value="mi">Miles</option>
                </select>
                <button onclick="convertLength()">Convert</button><br><br>
                <fieldset class="result-fieldset">
                    <legend>Result</legend>
                    <input class="result" id="length-result" type="text" placeholder="Answer" readonly>
                </fieldset>
            `;
            break;
        case 'mass':
            fieldsContainer.innerHTML = `
                <center><h3>Mass or Weight Converter</h3></center><br>
                <input type="number" id="mass-input" class="inputs" placeholder="Enter value">
                <select id="mass-units-from">
                    <option value="kg">Kilograms</option>
                    <option value="g">Grams</option>
                    <option value="mg">Milligrams</option>
                    <option value="lb">Pounds</option>
                    <option value="oz">Ounces</option>
                    <option value="ton">Tons</option>
                    <option value="t">Metric Tons</option>
                </select>
                <div class="arrow">⬇</div>
                <select id="mass-units-to">
                    <option value="kg">Kilograms</option>
                    <option value="g">Grams</option>
                    <option value="mg">Milligrams</option>
                    <option value="lb">Pounds</option>
                    <option value="oz">Ounces</option>
                    <option value="ton">Tons</option>
                    <option value="t">Metric Tons</option>
                </select>
                <button onclick="convertMass()">Convert</button><br><br>
                <fieldset class="result-fieldset">
                    <legend>Result</legend>
                    <input class="result" id="mass-result" type="text" placeholder="Answer" readonly>
                </fieldset>
            `;
            break;
        case 'temperature':
            fieldsContainer.innerHTML = `
                <center><h3>Temperature Converter</h3></center><br>
                <input type="number" id="temperature-input" class="inputs" placeholder="Enter value">
                <select id="temperature-units-from">
                    <option value="c">Celsius</option>
                    <option value="f">Fahrenheit</option>
                    <option value="k">Kelvin</option>
                </select>
                <div class="arrow">⬇</div>
                <select id="temperature-units-to">
                    <option value="c">Celsius</option>
                    <option value="f">Fahrenheit</option>
                    <option value="k">Kelvin</option>
                </select>
                <button onclick="convertTemperature()">Convert</button><br><br>
                <fieldset class="result-fieldset">
                    <legend>Result</legend>
                    <input class="result" id="temperature-result" type="text" placeholder="Answer" readonly>
                </fieldset>
            `;
            break;
        case 'angle':
            fieldsContainer.innerHTML = `
                <center><h3>Angle Converter</h3></center><br>
                <input type="number" id="angle-input" class="inputs" placeholder="Enter value">
                <select id="angle-units-from">
                    <option value="deg">Degrees</option>
                    <option value="rad">Radians</option>
                    <option value="grad">Gradians</option>
                </select>
                <div class="arrow">⬇</div>
                <select id="angle-units-to">
                    <option value="deg">Degrees</option>
                    <option value="rad">Radians</option>
                    <option value="grad">Gradians</option>
                </select>
                <button onclick="convertAngle()">Convert</button><br><br>
                <fieldset class="result-fieldset">
                    <legend>Result</legend>
                    <input class="result" id="angle-result" type="text" placeholder="Answer" readonly>
                </fieldset>
            `;
            break;
        case 'base':
            fieldsContainer.innerHTML = `
                <center><h3>Base Converter</h3></center><br>
                <input type="text" id="base-input" class="inputs" placeholder="Enter value">
                <select id="base-units-from">
                    <option value="bin">Binary</option>
                    <option value="oct">Octal</option>
                    <option value="dec">Decimal</option>
                    <option value="hex">Hexadecimal</option>
                    <option value="custom">Custom Base</option>
                </select>
                <input type="number" id="custom-base-from" class="inputs" placeholder="Enter custom base (if selected)" style="display:none;" min="2" max="36">
                <div class="arrow">⬇</div>
                <select id="base-units-to">
                    <option value="bin">Binary</option>
                    <option value="oct">Octal</option>
                    <option value="dec">Decimal</option>
                    <option value="hex">Hexadecimal</option>
                    <option value="custom">Custom Base</option>
                </select>
                <input type="number" id="custom-base-to" class="inputs" placeholder="Enter custom base (if selected)" style="display:none;" min="2" max="36">
                <button onclick="convertBase()">Convert</button><br><br>
                <fieldset class="result-fieldset">
                    <legend>Result</legend>
                    <input class="result" id="base-result" type="text" placeholder="Answer" readonly>
                </fieldset>
            `;
            document.getElementById('base-units-from').addEventListener('change', handleCustomBase);
            document.getElementById('base-units-to').addEventListener('change', handleCustomBase);
            break;
        case 'time':
            fieldsContainer.innerHTML = `
                <center><h3>Time Converter</h3></center><br>
                <input type="number" id="time-input" class="inputs" placeholder="Enter value" min="0">
                <select id="time-units-from">
                    <option value="second">Seconds</option>
                    <option value="minute">Minutes</option>
                    <option value="hour">Hours</option>
                    <option value="day">Days</option>
                    <option value="week">Weeks</option>
                    <option value="month">Months</option>
                    <option value="year">Years</option>
                </select>
                <div class="arrow">⬇</div>
                <select id="time-units-to">
                    <option value="second">Seconds</option>
                    <option value="minute">Minutes</option>
                    <option value="hour">Hours</option>
                    <option value="day">Days</option>
                    <option value="week">Weeks</option>
                    <option value="month">Months</option>
                    <option value="year">Years</option>
                </select>
                <button onclick="convertTime()">Convert</button><br><br>
                <fieldset class="result-fieldset">
                    <legend>Result</legend>
                    <input class="result" id="time-result" type="text" placeholder="Answer" readonly>
                </fieldset>
            `;
            break;
        default:
            fieldsContainer.innerHTML = '<p>Please select a converter type.</p>';
    }
}

function handleCustomBase() {
    const fromUnit = document.getElementById('base-units-from').value;
    const toUnit = document.getElementById('base-units-to').value;
    document.getElementById('custom-base-from').style.display = fromUnit === 'custom' ? 'block' : 'none';
    document.getElementById('custom-base-to').style.display = toUnit === 'custom' ? 'block' : 'none';
}

function getBaseValue(base) {
    switch (base) {
        case 'bin':
            return 2;
        case 'oct':
            return 8;
        case 'dec':
            return 10;
        case 'hex':
            return 16;
        case 'custom':
            return 'custom';
        default:
            return null;
    }
}

function isValidForBase(input, base) {
    const maxChar = base <= 10 ? '' : `A-${String.fromCharCode(65 + base - 11)}`;
    const regex = new RegExp(`^[0-${Math.min(base - 1, 9)}${maxChar}]*$`, 'i');
    return regex.test(input.replace('-', '').replace('.', ''));
}

function convertBase() {
    const input = document.getElementById('base-input').value.toUpperCase();
    const unitFrom = document.getElementById('base-units-from').value;
    const unitTo = document.getElementById('base-units-to').value;
    const customBaseFrom = parseInt(document.getElementById('custom-base-from').value);
    const customBaseTo = parseInt(document.getElementById('custom-base-to').value);

    if (input.trim() === '') {
        document.getElementById('base-result').value = "Please input a valid number";
        return;
    }

    let baseFromValue = getBaseValue(unitFrom);
    let baseToValue = getBaseValue(unitTo);

    if (baseFromValue === 'custom' && (isNaN(customBaseFrom) || customBaseFrom < 2 || customBaseFrom > 36)) {
        document.getElementById('base-result').value = 'Please enter a valid base (2 - 36)';
        return;
    }
    if (baseToValue === 'custom' && (isNaN(customBaseTo) || customBaseTo < 2 || customBaseTo > 36)) {
        document.getElementById('base-result').value = 'Please enter a valid base (2 - 36)';
        return;
    }

    if (baseFromValue === 'custom') baseFromValue = customBaseFrom;
    if (baseToValue === 'custom') baseToValue = customBaseTo;

    if (!isValidForBase(input, baseFromValue)) {
        document.getElementById('base-result').value = `Invalid input for base ${baseFromValue}`;
        return;
    }

    // Check if converting from same base to same base
    if (baseFromValue === baseToValue) {
        document.getElementById('base-result').value = `${input}${convertToSubscript(baseFromValue)}`;
        return;
    }    

    const convertToDecimal = (value, base) => {
        const negative = value.startsWith('-');
        if (negative) value = value.slice(1);

        const [integer, fraction] = value.split('.');
        let decimalValue = parseInt(integer, base);

        if (fraction) {
            decimalValue += fraction.split('').reduce((acc, digit, index) => {
                return acc + parseInt(digit, base) / Math.pow(base, index + 1);
            }, 0);
        }

        return negative ? -decimalValue : decimalValue;
    };

    const convertFromDecimal = (value, base) => {
        const negative = value < 0;
        if (negative) value = -value;

        const integerPart = Math.floor(value);
        const fractionPart = value - integerPart;
        let baseInteger = integerPart.toString(base).toUpperCase();
        if (fractionPart === 0) return negative ? `-${baseInteger}` : baseInteger;

        let baseFraction = '';
        let fraction = fractionPart;
        for (let i = 0; i < 5; i++) { // Limit to 5 decimal places
            fraction *= base;
            let digit = Math.floor(fraction);
            baseFraction += digit.toString(base).toUpperCase();
            fraction -= digit;
        }

        return negative ? `-${baseInteger}.${baseFraction}` : `${baseInteger}.${baseFraction}`;
    };

    let result;
    try {
        const decimalValue = convertToDecimal(input, baseFromValue);
        result = convertFromDecimal(decimalValue, baseToValue);
    } catch (e) {
        document.getElementById('base-result').value = 'Error in conversion';
        return;
    }

    document.getElementById('base-result').value = `${result}${convertToSubscript(baseToValue)}`;
}

function convertToSubscript(base) {
    const subscriptMap = {
        '0': '₀',
        '1': '₁',
        '2': '₂',
        '3': '₃',
        '4': '₄',
        '5': '₅',
        '6': '₆',
        '7': '₇',
        '8': '₈',
        '9': '₉'
    };
    return String(base).split('').map(char => subscriptMap[char] || char).join('');
}


function convertLength() {
    const input = parseFloat(document.getElementById('length-input').value);
    const unitFrom = document.getElementById('length-units-from').value;
    const unitTo = document.getElementById('length-units-to').value;
    let result;

    if (isNaN(input)) {
        document.getElementById('length-result').value = "Please input a value";
        return;
    }

    const conversionFactors = {
        m: 1,
        km: 0.001,
        cm: 100,
        mm: 1000,
        in: 39.3701,
        ft: 3.28084,
        yd: 1.09361,
        mi: 0.000621371
    };

    const valueInMeters = input / conversionFactors[unitFrom];

    result = valueInMeters * conversionFactors[unitTo];

    document.getElementById('length-result').value = `${result.toFixed(3)} ${unitTo.toUpperCase()}`;
}

function convertMass() {
    const input = parseFloat(document.getElementById('mass-input').value);
    const unitFrom = document.getElementById('mass-units-from').value;
    const unitTo = document.getElementById('mass-units-to').value;
    let result;

    if (isNaN(input)) {
        document.getElementById('mass-result').value = "Please input a value";
        return;
    }

    const conversionFactors = {
        kg: 1,
        g: 1000,
        mg: 1000000,
        lb: 2.20462,
        oz: 35.274,
        ton: 0.00110231,
        t: 0.001
    };

    const valueInKilograms = input / conversionFactors[unitFrom];

    result = valueInKilograms * conversionFactors[unitTo];

    document.getElementById('mass-result').value = `${result.toFixed(3)} ${unitTo.toUpperCase()}`;
}

function convertTemperature() {
    const input = parseFloat(document.getElementById('temperature-input').value);
    const unitFrom = document.getElementById('temperature-units-from').value;
    const unitTo = document.getElementById('temperature-units-to').value;
    let result;

    if (isNaN(input)) {
        document.getElementById('temperature-result').value = "Please input a value";
        return;
    }

    if (unitFrom === 'c' && unitTo === 'f') {
        result = (input * 9 / 5) + 32;
    } else if (unitFrom === 'f' && unitTo === 'c') {
        result = (input - 32) * 5 / 9;
    } else if (unitFrom === 'c' && unitTo === 'k') {
        result = input + 273.15;
    } else if (unitFrom === 'k' && unitTo === 'c') {
        result = input - 273.15;
    } else if (unitFrom === 'f' && unitTo === 'k') {
        result = (input + 459.67) * 5 / 9;
    } else if (unitFrom === 'k' && unitTo === 'f') {
        result = (input * 9 / 5) - 459.67;
    } else {
        result = input;
    }

    document.getElementById('temperature-result').value = `${result.toFixed(3)} °${unitTo.toUpperCase()}`;
}

function convertAngle() {
    const input = parseFloat(document.getElementById('angle-input').value);
    const unitFrom = document.getElementById('angle-units-from').value;
    const unitTo = document.getElementById('angle-units-to').value;
    let result;

    if (isNaN(input)) {
        document.getElementById('angle-result').value = "Please input a value";
        return;
    }

    if (unitFrom === 'deg' && unitTo === 'rad') {
        result = input * (Math.PI / 180);
    } else if (unitFrom === 'rad' && unitTo === 'deg') {
        result = input * (180 / Math.PI);
    } else if (unitFrom === 'deg' && unitTo === 'grad') {
        result = input * (200 / 180);
    } else if (unitFrom === 'grad' && unitTo === 'deg') {
        result = input * (180 / 200);
    } else if (unitFrom === 'rad' && unitTo === 'grad') {
        result = input * (200 / Math.PI);
    } else if (unitFrom === 'grad' && unitTo === 'rad') {
        result = input * (Math.PI / 200);
    } else {
        result = input;
    }

    document.getElementById('angle-result').value = `${result.toFixed(3)} ${unitTo.toUpperCase()}`;
}

function convertTime() {
    const input = parseInt(document.getElementById("time-input").value);
    const unitFrom = document.getElementById("time-units-from").value;
    const unitTo = document.getElementById("time-units-to").value;

    let result;

    if (isNaN(input) || input < 0) {
        document.getElementById('time-result').value = "Please input a valid value";
        return;
    }

    const conversionFactors = {
        second: 1,
        minute: 60,
        hour: 3600,
        day: 86400,
        week: 604800,
        month: 2592000,
        year: 31536000
    };

    const valueInSeconds = input * conversionFactors[unitFrom];

    result = valueInSeconds / conversionFactors[unitTo];

    let formattedResult;
    if (unitTo === "second") {
        formattedResult = `${result.toFixed(0)} SECONDS`;
    } else if (unitTo === "minute") {
        const minutes = Math.floor(result);
        const seconds = (result - minutes) * 60;
        formattedResult = `${minutes}:${seconds.toFixed(0).padStart(2, '0')} MINUTES`;
    } else if (unitTo === "hour") {
        const hours = Math.floor(result);
        const minutes = Math.floor((result - hours) * 60);
        const seconds = (((result - hours) * 60 - minutes) * 60);
        formattedResult = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toFixed(0).padStart(2, '0')} HOURS`;
    } else if (unitTo === "day") {
        const days = Math.floor(result);
        const remainingSeconds = valueInSeconds % 86400;
        const hours = Math.floor(remainingSeconds / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = (remainingSeconds % 60);
        formattedResult = `${days} DAYS ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toFixed(0).padStart(2, '0')} ~ APPROXIMATION`;
    } else if (unitTo === "week") {
        const weeks = Math.floor(result);
        const remainingSeconds = valueInSeconds % 604800;
        const days = Math.floor(remainingSeconds / 86400);
        const hours = Math.floor((remainingSeconds % 86400) / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = (remainingSeconds % 60);
        formattedResult = `${weeks} WEEKS ${days} DAYS ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toFixed(0).padStart(2, '0')} ~ APPROXIMATION`;
    } else if (unitTo === "month") {
        const months = Math.floor(result);
        const remainingSeconds = valueInSeconds % 2592000;
        const days = Math.floor(remainingSeconds / 86400);
        const hours = Math.floor((remainingSeconds % 86400) / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = (remainingSeconds % 60);
        formattedResult = `${months} MONTHS ${days} DAYS ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toFixed(0).padStart(2, '0')} ~ APPROXIMATION`;
    } else if (unitTo === "year") {
        const years = Math.floor(result);
        const remainingSeconds = valueInSeconds % 31536000;
        const days = Math.floor(remainingSeconds / 86400);
        const hours = Math.floor((remainingSeconds % 86400) / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = (remainingSeconds % 60);
        formattedResult = `${years} YEARS ${days} DAYS ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toFixed(0).padStart(2, '0')} ~ APPROXIMATION`;
    } else {
        formattedResult = `${result.toFixed(2)} ${unitTo.toUpperCase()}`;
    }

    document.getElementById('time-result').value = formattedResult;
}
