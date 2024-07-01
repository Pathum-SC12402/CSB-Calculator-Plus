document.addEventListener('DOMContentLoaded', () => {
    const shapeSelect = document.getElementById('shape-select');
    const parameterSelect = document.getElementById('parameter-select');
    const inputFieldsDiv = document.getElementById('input-fields');
    const resultParagraph = document.getElementById('result');
    const plotDiv = document.getElementById('shape-canvas');

    shapeSelect.addEventListener('change', () => {
        const shape = shapeSelect.value;
        populateParameterOptions(shape);
        drawShapePrototype(shape);
    });

    parameterSelect.addEventListener('change', () => {
        const shape = shapeSelect.value;
        const parameter = parameterSelect.value;
        populateInputFields(shape, parameter);
    });

    document.getElementById('geometry-form').addEventListener('submit', (e) => {
        e.preventDefault();
        calculateResult();
    });

    function populateParameterOptions(shape) {
        const options = {
            line: ['Length'],
            rectangle: ['Area', 'Perimeter'],
            circle: ['Area', 'Circumference'],
            triangle: ['Area', 'Perimeter'],
            sphere: ['Volume', 'Surface Area'],
            cube: ['Volume', 'Surface Area'],
            cylinder: ['Volume', 'Surface Area'],
            cone: ['Volume', 'Surface Area'],
            torus: ['Volume', 'Surface Area'],
            // Add more shapes and parameters as needed
        };

        parameterSelect.innerHTML = '<option value="" disabled selected>Select Parameter</option>';
        if (options[shape]) {
            options[shape].forEach(param => {
                const option = document.createElement('option');
                option.value = param.toLowerCase().replace(' ', '-');
                option.textContent = param;
                parameterSelect.appendChild(option);
            });
            parameterSelect.disabled = false;
        } else {
            parameterSelect.disabled = true;
        }

        inputFieldsDiv.innerHTML = '';
        resultParagraph.textContent = '';
        Plotly.purge(plotDiv);
    }

    function populateInputFields(shape, parameter) {
        const inputFields = {
            line: '<input type="number" id="length" placeholder="Length">',
            rectangle: '<input type="number" id="length" placeholder="Length"><input type="number" id="width" placeholder="Width">',
            circle: '<input type="number" id="radius" placeholder="Radius">',
            triangle: '<input type="number" id="base" placeholder="Base"><input type="number" id="height" placeholder="Height"><input type="number" id="side1" placeholder="Side 1"><input type="number" id="side2" placeholder="Side 2">',
            sphere: '<input type="number" id="radius" placeholder="Radius">',
            cube: '<input type="number" id="side" placeholder="Side Length">',
            cylinder: '<input type="number" id="radius" placeholder="Radius"><input type="number" id="height" placeholder="Height">',
            cone: '<input type="number" id="radius" placeholder="Radius"><input type="number" id="height" placeholder="Height">',
            torus: '<input type="number" id="major-radius" placeholder="Major Radius"><input type="number" id="minor-radius" placeholder="Minor Radius">',
            // Add more shapes and inputs as needed
        };

        inputFieldsDiv.innerHTML = inputFields[shape] || '';
        resultParagraph.textContent = '';
        Plotly.purge(plotDiv);
    }

    function calculateResult() {
        const shape = shapeSelect.value;
        const parameter = parameterSelect.value;
        let result = '';

        switch (shape) {
            case 'line':
                if (parameter === 'length') {
                    const length = parseFloat(document.getElementById('length').value);
                    result = `Length: ${length} units`;
                    drawLine(length);
                }
                break;
            case 'rectangle':
                const length = parseFloat(document.getElementById('length').value);
                const width = parseFloat(document.getElementById('width').value);
                if (parameter === 'area') {
                    result = `Area: ${length * width} square units`;
                } else if (parameter === 'perimeter') {
                    result = `Perimeter: ${(2 * length) + (2 * width)} units`;
                }
                drawRectangle(length, width);
                break;
            case 'circle':
                const radius = parseFloat(document.getElementById('radius').value);
                if (parameter === 'area') {
                    result = `Area: ${(Math.PI * radius * radius).toFixed(2)} square units`;
                } else if (parameter === 'circumference') {
                    result = `Circumference: ${(2 * Math.PI * radius).toFixed(2)} units`;
                }
                drawCircle(radius);
                break;
            case 'triangle':
                const base = parseFloat(document.getElementById('base').value);
                const height = parseFloat(document.getElementById('height').value);
                const side1 = parseFloat(document.getElementById('side1').value);
                const side2 = parseFloat(document.getElementById('side2').value);
                if (parameter === 'area') {
                    result = `Area: ${(0.5 * base * height).toFixed(2)} square units`;
                } else if (parameter === 'perimeter') {
                    result = `Perimeter: ${(base + side1 + side2).toFixed(2)} units`;
                }
                drawTriangle(base, height);
                break;
            case 'sphere':
                const sphereRadius = parseFloat(document.getElementById('radius').value);
                if (parameter === 'volume') {
                    result = `Volume: ${((4 / 3) * Math.PI * Math.pow(sphereRadius, 3)).toFixed(2)} cubic units`;
                } else if (parameter === 'surface-area') {
                    result = `Surface Area: ${(4 * Math.PI * Math.pow(sphereRadius, 2)).toFixed(2)} square units`;
                }
                drawSphere(sphereRadius);
                break;
            case 'cube':
                const side = parseFloat(document.getElementById('side').value);
                if (parameter === 'volume') {
                    result = `Volume: ${(Math.pow(side, 3)).toFixed(2)} cubic units`;
                } else if (parameter === 'surface-area') {
                    result = `Surface Area: ${(6 * Math.pow(side, 2)).toFixed(2)} square units`;
                }
                drawCube(side);
                break;
            case 'cylinder':
                const cylinderRadius = parseFloat(document.getElementById('radius').value);
                const cylinderHeight = parseFloat(document.getElementById('height').value);
                if (parameter === 'volume') {
                    result = `Volume: ${(Math.PI * Math.pow(cylinderRadius, 2) * cylinderHeight).toFixed(2)} cubic units`;
                } else if (parameter === 'surface-area') {
                    result = `Surface Area: ${(2 * Math.PI * cylinderRadius * (cylinderHeight + cylinderRadius)).toFixed(2)} square units`;
                }
                drawCylinder(cylinderRadius, cylinderHeight);
                break;
            case 'cone':
                const coneRadius = parseFloat(document.getElementById('radius').value);
                const coneHeight = parseFloat(document.getElementById('height').value);
                if (parameter === 'volume') {
                    result = `Volume: ${(Math.PI * Math.pow(coneRadius, 2) * (coneHeight / 3)).toFixed(2)} cubic units`;
                } else if (parameter === 'surface-area') {
                    const slantHeight = Math.sqrt(Math.pow(coneHeight, 2) + Math.pow(coneRadius, 2));
                    result = `Surface Area: ${(Math.PI * coneRadius * (coneRadius + slantHeight)).toFixed(2)} square units`;
                }
                drawCone(coneRadius, coneHeight);
                break;
            case 'torus':
                const majorRadius = parseFloat(document.getElementById('major-radius').value);
                const minorRadius = parseFloat(document.getElementById('minor-radius').value);
                if (parameter === 'volume') {
                    result = `Volume: ${(2 * Math.PI * Math.PI * majorRadius * Math.pow(minorRadius, 2)).toFixed(2)} cubic units`;
                } else if (parameter === 'surface-area') {
                    result = `Surface Area: ${(4 * Math.PI * Math.PI * majorRadius * minorRadius).toFixed(2)} square units`;
                }
                drawTorus(majorRadius, minorRadius);
                break;
            // Add more shapes and calculations as needed
        }

        resultParagraph.textContent = result;
    }

    function drawShapePrototype(shape) {
        switch (shape) {
            case 'line':
                drawLine(100); // Default length
                break;
            case 'rectangle':
                drawRectangle(100, 50); // Default length and width
                break;
            case 'circle':
                drawCircle(50); // Default radius
                break;
            case 'triangle':
                drawTriangle(100, 50); // Default base and height
                break;
            case 'sphere':
                drawSphere(50); // Default radius
                break;
            case 'cube':
                drawCube(50); // Default side length
                break;
            case 'cylinder':
                drawCylinder(50, 100); // Default radius and height
                break;
            case 'cone':
                drawCone(50, 100); // Default radius and height
                break;
            case 'torus':
                drawTorus(70, 30); // Default major and minor radius
                break;
            // Add more shapes as needed
        }
    }

    function drawLine(length) {
        const data = [{
            x: [0, length],
            y: [0, 0],
            mode: 'lines',
            type: 'scatter'
        }];
        Plotly.newPlot(plotDiv, data);
    }

    function drawRectangle(length, width) {
        const data = [{
            x: [0, length, length, 0, 0],
            y: [0, 0, width, width, 0],
            mode: 'lines',
            type: 'scatter'
        }];
        Plotly.newPlot(plotDiv, data);
    }

    function drawCircle(radius) {
        const theta = math.range(0, 2 * Math.PI, 0.01, true).toArray();
        const x = theta.map(t => radius * Math.cos(t));
        const y = theta.map(t => radius * Math.sin(t));
        const data = [{
            x: x,
            y: y,
            mode: 'lines',
            type: 'scatter'
        }];
        Plotly.newPlot(plotDiv, data);
    }

    function drawTriangle(base, height) {
        const data = [{
            x: [0, base, base / 2, 0],
            y: [0, 0, height, 0],
            mode: 'lines',
            type: 'scatter'
        }];
        Plotly.newPlot(plotDiv, data);
    }

    function drawSphere(radius) {
        drawCircle(radius); // Simplified as a circle in 2D
    }

    function drawCube(side) {
        const data = [{
            x: [0, side, side, 0, 0, side, side, 0, 0, side, side],
            y: [0, 0, side, side, 0, 0, side, side, side, side, 0],
            mode: 'lines',
            type: 'scatter'
        }];
        Plotly.newPlot(plotDiv, data);
    }

    function drawCylinder(radius, height) {
        const theta = math.range(0, 2 * Math.PI, 0.01, true).toArray();
        const x = theta.map(t => radius * Math.cos(t));
        const y1 = theta.map(t => radius * Math.sin(t));
        const y2 = y1.map(y => y + height);
        const data = [{
            x: x.concat(x),
            y: y1.concat(y2),
            mode: 'lines',
            type: 'scatter'
        }];
        Plotly.newPlot(plotDiv, data);
    }

    function drawCone(radius, height) {
        const theta = math.range(0, 2 * Math.PI, 0.01, true).toArray();
        const x = theta.map(t => radius * Math.cos(t));
        const y = theta.map(t => radius * Math.sin(t));
        const data = [{
            x: x.concat([0, ...x]),
            y: y.concat([height, ...y.map(() => 0)]),
            mode: 'lines',
            type: 'scatter'
        }];
        Plotly.newPlot(plotDiv, data);
    }

    function drawTorus(majorRadius, minorRadius) {
        const theta = math.range(0, 2 * Math.PI, 0.01, true).toArray();
        const r = t => majorRadius + minorRadius * Math.cos(t);
        const x = theta.map(t => r(t) * Math.cos(t));
        const y = theta.map(t => r(t) * Math.sin(t));
        const data = [{
            x: x,
            y: y,
            mode: 'lines',
            type: 'scatter'
        }];
        Plotly.newPlot(plotDiv, data);
    }

    // Responsive canvas resizing
    window.addEventListener('resize', () => {
        Plotly.Plots.resize(plotDiv);
    });
});
