document.addEventListener('DOMContentLoaded', () => {
    loadConverter(null);
});

function loadConverter(defaultType) {
    const converterType = defaultType || document.getElementById('converter-type').value;
    const fieldsContainer = document.getElementById('converter-fields');
    fieldsContainer.innerHTML = '';

    switch (converterType) {
        case 'length':
            fieldsContainer.innerHTML = `
                <center><h3>Length Converter</h3></center><br>
                <input type="number" id="length-input" placeholder="Enter value">
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
                <button onclick="convertLength()">Convert</button>
                <p id="length-result"></p>
            `;
            break;
        case 'mass':
            fieldsContainer.innerHTML = `
                <center><h3>Mass or Weight Converter</h3></center><br>
                <input type="number" id="mass-input" placeholder="Enter value">
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
                <button onclick="convertMass()">Convert</button>
                <p id="mass-result"></p>
            `;
            break;
        case 'temperature':
            fieldsContainer.innerHTML = `
                <center><h3>Temperature Converter</h3></center><br>
                <input type="number" id="temperature-input" placeholder="Enter value">
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
                <button onclick="convertTemperature()">Convert</button>
                <p id="temperature-result"></p>
            `;
            break;
        case 'angle':
            fieldsContainer.innerHTML = `
                <center><h3>Angle Converter</h3></center><br>
                <input type="number" id="angle-input" placeholder="Enter value">
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
                <button onclick="convertAngle()">Convert</button>
                <p id="angle-result"></p>
            `;
            break;
        case 'base':
            fieldsContainer.innerHTML = `
                <center><h3>Base Converter</h3></center><br>
                <input type="text" id="base-input" placeholder="Enter value">
                <select id="base-units-from">
                    <option value="bin">Binary</option>
                    <option value="oct">Octal</option>
                    <option value="dec">Decimal</option>
                    <option value="hex">Hexadecimal</option>
                    <option value="custom">Custom Base</option>
                </select>
                <input type="number" id="custom-base-from" placeholder="Enter custom base (if selected)" style="display:none;" min="2" max="36">
                <div class="arrow">⬇</div>
                <select id="base-units-to">
                    <option value="bin">Binary</option>
                    <option value="oct">Octal</option>
                    <option value="dec">Decimal</option>
                    <option value="hex">Hexadecimal</option>
                    <option value="custom">Custom Base</option>
                </select>
                <input type="number" id="custom-base-to" placeholder="Enter custom base (if selected)" style="display:none;" min="2" max="36">
                <button onclick="convertBase()">Convert</button>
                <p id="base-result"></p>
            `;
            document.getElementById('base-units-from').addEventListener('change', handleCustomBase);
            document.getElementById('base-units-to').addEventListener('change', handleCustomBase);
            break;
        case 'time':
            fieldsContainer.innerHTML = `
                <center><h3>Time Converter</h3></center><br>
                <input type="number" id="time-input" placeholder="Enter value">
                <select id="time-units-from">
                    <option value="sec">Seconds</option>
                    <option value="min">Minutes</option>
                    <option value="hour">Hours</option>
                    <option value="day">Days</option>
                    <option value="week">Weeks</option>
                    <option value="year">Years</option>
                </select>
                <div class="arrow">⬇</div>
                <select id="time-units-to">
                    <option value="sec">Seconds</option>
                    <option value="min">Minutes</option>
                    <option value="hour">Hours</option>
                    <option value="day">Days</option>
                    <option value="week">Weeks</option>
                    <option value="year">Years</option>
                </select>
                <button onclick="convertTime()">Convert</button>
                <p id="time-result"></p>
            `;
            break;
        default:
            fieldsContainer.innerHTML = '<p>Please select a converter type.</p>';
    }
}
function convertTime(){
    const input=parseInt(document.getElementById("time-input").value);
    const unitFrom=document.getElementById("time-units-from").value;
    const unitTo=document.getElementById("time-units-to").value;

    let result;

    const conversionFactors = {
        sec: 31536000,
        min: 525600,
        hour: 8760,
        day: 365,
        week: 48,
        year: 1,
    };

    // Convert input to hours first
    const valueInyear = input / conversionFactors[unitFrom];

    // Convert from hours to the target unit
    result = valueInyear * conversionFactors[unitTo];

    document.getElementById('time-result').innerHTML = `Result: ${result} ${unitTo}`;
}

function handleCustomBase() {
    const fromUnit = document.getElementById('base-units-from').value;
    const toUnit = document.getElementById('base-units-to').value;
    document.getElementById('custom-base-from').style.display = fromUnit === 'custom' ? 'block' : 'none';
    document.getElementById('custom-base-to').style.display = toUnit === 'custom' ? 'block' : 'none';
}

// Function to show default bases in numeric
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

// Function to validate the input
function isValidForBase(input, base) {
    const regex = new RegExp(`^-?[0-9A-F.]+$`, 'i');
    return regex.test(input);
}

function convertLength() {
    const input = parseFloat(document.getElementById('length-input').value);
    const unitFrom = document.getElementById('length-units-from').value;
    const unitTo = document.getElementById('length-units-to').value;
    let result;

    // Conversion factors relative to meters
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

    // Convert input to meters first
    const valueInMeters = input / conversionFactors[unitFrom];

    // Convert from meters to the target unit
    result = valueInMeters * conversionFactors[unitTo];

    document.getElementById('time-result').innerHTML = `Result: ${result} ${unitTo.toUpperCase()}`;
}

function convertMass() {
    const input = parseFloat(document.getElementById('mass-input').value);
    const unitFrom = document.getElementById('mass-units-from').value;
    const unitTo = document.getElementById('mass-units-to').value;
    let result;

    // Conversion factors relative to kilograms
    const conversionFactors = {
        kg: 1,
        g: 1000,
        mg: 1000000,
        lb: 2.20462,
        oz: 35.274,
        ton: 0.00110231,
        t: 0.001
    };

    // Convert input to kilograms first
    const valueInKilograms = input / conversionFactors[unitFrom];

    // Convert from kilograms to the target unit
    result = valueInKilograms * conversionFactors[unitTo];

    document.getElementById('mass-result').innerHTML = `Result: ${result} ${unitTo.toUpperCase()}`;
}

function convertTemperature() {
    const input = parseFloat(document.getElementById('temperature-input').value);
    const unitFrom = document.getElementById('temperature-units-from').value;
    const unitTo = document.getElementById('temperature-units-to').value;
    let result;

    // Conversion logic for temperature
    if (unitFrom === 'c' && unitTo === 'f') {
        result = (input * 9/5) + 32;
    } else if (unitFrom === 'f' && unitTo === 'c') {
        result = (input - 32) * 5/9;
    } else if (unitFrom === 'c' && unitTo === 'k') {
        result = input + 273.15;
    } else if (unitFrom === 'k' && unitTo === 'c') {
        result = input - 273.15;
    } else if (unitFrom === 'f' && unitTo === 'k') {
        result = (input + 459.67) * 5/9;
    } else if (unitFrom === 'k' && unitTo === 'f') {
        result = (input * 9/5) - 459.67;
    } else {
        result = input; // When converting between the same units
    }

    document.getElementById('temperature-result').innerHTML = `Result: ${result} °${unitTo.toUpperCase()}`;
}

function convertAngle() {
    const input = parseFloat(document.getElementById('angle-input').value);
    const unitFrom = document.getElementById('angle-units-from').value;
    const unitTo = document.getElementById('angle-units-to').value;
    let result;

    // Conversion logic for angle
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
        result = input; // When converting between the same units
    }

    document.getElementById('angle-result').innerHTML = `Result: ${result} ${unitTo.toUpperCase()}`;
}

function convertBase() {
    const input = document.getElementById('base-input').value.toUpperCase();
    const unitFrom = document.getElementById('base-units-from').value;
    const unitTo = document.getElementById('base-units-to').value;
    const customBaseFrom = parseInt(document.getElementById('custom-base-from').value);
    const customBaseTo = parseInt(document.getElementById('custom-base-to').value);

    let baseFromValue = getBaseValue(unitFrom);
    let baseToValue = getBaseValue(unitTo);

    // Validate custom bases
    if (baseFromValue === 'custom' && (isNaN(customBaseFrom) || customBaseFrom < 2 || customBaseFrom > 36)) {
        document.getElementById('base-result').innerHTML = 'Invalid custom base. Please enter a value between 2 and 36.';
        return;
    }
    if (baseToValue === 'custom' && (isNaN(customBaseTo) || customBaseTo < 2 || customBaseTo > 36)) {
        document.getElementById('base-result').innerHTML = 'Invalid custom base. Please enter a value between 2 and 36.';
        return;
    }

    // Use custom base values if applicable
    if (baseFromValue === 'custom') baseFromValue = customBaseFrom;
    if (baseToValue === 'custom') baseToValue = customBaseTo;

    if (!isValidForBase(input, baseFromValue)) {
        document.getElementById('base-result').innerHTML = `Invalid input for base ${baseFromValue}`;
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
        document.getElementById('base-result').innerHTML = 'Error in conversion';
        return;
    }

    document.getElementById('base-result').innerHTML = `Result: ${result}<sub>${baseToValue}</sub>`;
}
