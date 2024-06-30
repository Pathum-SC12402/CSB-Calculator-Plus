function calculateDerivation() {
    const functionInput = document.getElementById("function-input").value;
    const baseInput = document.getElementById("base-input").value;
    const orderInput = parseInt(document.getElementById("order-input").value, 10);
    let result;

    if (isNaN(orderInput) || orderInput < 1) {
        document.getElementById('result').innerHTML = 'Error: The order of the derivative must be a positive integer';
        return;
    }

    try {
        result = functionInput;
        for (let i = 0; i < orderInput; i++) {
            result = math.derivative(result, baseInput).toString();
        }

        document.getElementById('result').innerText = `Derivative: ${result}`;
        
        // Plot the original function and its derivative
        plotGraph(functionInput, result, baseInput);
    } catch (error) {
        // Handle errors if input is invalid
        console.error('Error calculating derivative:', error);
        document.getElementById('result').innerHTML = 'Error: Invalid expression';
    }
}

function plotGraph(functionInput, derivative, baseInput) {
    const xValues = math.range(-10, 10, 0.1).toArray();
    const yValuesOriginal = xValues.map(x => math.evaluate(functionInput, { x }));
    const yValuesDerivative = xValues.map(x => math.evaluate(derivative, { x }));

    const trace1 = {
        x: xValues,
        y: yValuesOriginal,
        mode: 'lines',
        name: 'Original Function'
    };

    const trace2 = {
        x: xValues,
        y: yValuesDerivative,
        mode: 'lines',
        name: 'Derivative'
    };

    const layout = {
        title: 'Function and its Derivative',
        xaxis: { title: 'x' },
        yaxis: { title: 'y' },
        plot_bgcolor: getComputedStyle(document.body).getPropertyValue('--converter-bg'),
        paper_bgcolor: getComputedStyle(document.body).getPropertyValue('--converter-bg'),
        font: {
            color: getComputedStyle(document.body).getPropertyValue('--converter-text')
        }
    };
        Plotly.newPlot('plot', [trace1, trace2], layout);
}

function updatePlotTheme() {
    const plotElement = document.getElementById('plot');
    const layoutUpdate = {
        plot_bgcolor: getComputedStyle(document.body).getPropertyValue('--converter-bg'),
        paper_bgcolor: getComputedStyle(document.body).getPropertyValue('--converter-bg'),
        font: {
            color: getComputedStyle(document.body).getPropertyValue('--converter-text')
        }
    };
    Plotly.relayout(plotElement, layoutUpdate);
}

document.getElementById('clear').addEventListener('click', () => {
    document.getElementById('function-input').value = '';
    document.getElementById('base-input').value = '';
    document.getElementById('order-input').value = '';
    document.getElementById('result').innerText = '';
    Plotly.purge('plot');
});

document.addEventListener('DOMContentLoaded', () => {
    // Ensure the plot updates when the theme changes
    const observer = new MutationObserver(updatePlotTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
});

function handleResize() {
    const plot = document.getElementById('plot');
    if (window.innerWidth < 840) {
        plot.style.display = 'none';
    } else {
        plot.style.display = 'block';
    }
}

window.addEventListener('resize', handleResize);

handleResize();
      
