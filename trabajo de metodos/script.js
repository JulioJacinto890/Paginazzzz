document.getElementById('newton-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtener los valores ingresados por el usuario
    const func = document.getElementById('function').value;
    const deriv = document.getElementById('derivative').value;
    let x0 = parseFloat(document.getElementById('initial').value);
    const tolerance = parseFloat(document.getElementById('tolerance').value);
    const maxIterations = parseInt(document.getElementById('iterations').value);
    
    // Función para evaluar una expresión matemática con un valor dado de x
    function evaluate(expression, x) {
        return math.evaluate(expression, {x: x});
    }
    
    let iterations = 0;
    let error = 1;
    
    while (error > tolerance && iterations < maxIterations) {
        const fx = evaluate(func, x0);
        const dfx = evaluate(deriv, x0);
        
        if (dfx === 0) {
            document.getElementById('result').innerText = "La derivada es cero, no se puede continuar.";
            return;
        }
        
        const x1 = x0 - fx / dfx;
        error = Math.abs(x1 - x0);
        x0 = x1;
        iterations++;
    }


    if (iterations === maxIterations) {
        document.getElementById('result').innerText = "Se alcanzó el número máximo de iteraciones sin converger.";
    } else {
        document.getElementById('result').innerText = `Raíz encontrada: x ≈ ${x0.toFixed(5)} en ${iterations} iteraciones con un error de ${error}.`;
    }
});
