function calculateDerivation() {
    const input = document.getElementById("input").value;
    let result;

    try {
        //compute the derivative with respect to 'x' //
        result = math.derivative(input, 'x').toString();
        document.getElementById('result').innerText = `Result: ${result}`;
    } catch (error) {
        // handle errors if input is invalid //
        console.error('Error calculating derivative:', error);
        document.getElementById('result').innerHTML = 'Error: Invalid expression';
    }
}