function calculateDerivation() {
    const input = document.getElementById("input").value;
    let result;

    try {
        //compute the derivative with respect to 'x' //
        answer = math.derivative(input, 'x').toString();
        document.getElementById('result').innerText = `Answer: ${answer}`;
    } catch (error) {
        // handle errors if input is invalid //
        console.error('Error calculating derivative:', error);
        document.getElementById('result').innerHTML = 'Error: Invalid expression';
    }
}