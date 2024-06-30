function addLimit() {
    const setLimitDiv = document.getElementById('setLimit');
    setLimitDiv.innerHTML = `
        <input type="number" class="limit" id="lowerLimit" placeholder="Lower limit" step="any">
        <input type="number" class="limit" id="upperLimit" placeholder="Upper limit" step="any">
    `;
}

function calculateIntegration() {
    const func = document.getElementById('integration-input').value;
    const variable = document.getElementById('integration-variable').value;
    const lower = parseFloat(document.getElementById('lowerLimit').value);
    const upper = parseFloat(document.getElementById('upperLimit').value);
    let result;
    
    if (!isNaN(lower) && !isNaN(upper)) {
        try {
            // Define the function
            const expr = math.compile(func);

            // Numerical integration using the trapezoidal rule
            const integrate = (func, varName, a, b, n = 1000) => {
                const h = (b - a) / n;
                let sum = 0.5 * (func.evaluate({ [varName]: a }) + func.evaluate({ [varName]: b }));

                for (let i = 1; i < n; i++) {
                    const x = a + i * h;
                    sum += func.evaluate({ [varName]: x });
                }

                return sum * h;
            }

            result = integrate(expr, variable, lower, upper).toFixed(10);
        } catch (e) {
            result = 'Invalid function, variable, or limits';
        }
    } else {
        try {
            const expr = math.compile(func);

            // Perform symbolic integration (indefinite)
            result = math.integral(expr, variable).toString();
        } catch (e) {
            result = 'Invalid function or integration error';
        }
    }

    document.getElementById('integration-result').innerText = result;
    
}
