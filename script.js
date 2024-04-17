document.getElementById('distanceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("Formulario enviado");

    const origin = parseInt(document.getElementById('origin').value);
    const destination = parseInt(document.getElementById('destination').value);
    console.log("Origen:", origin, "Destino:", destination);

    const distance = calculateDistance(origin, destination);
    const time = calculateTime(distance);

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Distancia: ${distance.toFixed(2)} metros<br>Tiempo estimado: ${time.toFixed(2)} segundos`;
});

function calculateDistance(origin, destination) {
    const distancePerFloor = 28; // Distancia entre pisos (en metros)
    const stairDistance = 7.01; // Distancia por escalera entre pisos (en metros)
    const elevatorDistance = 4; // Distancia al ascensor (en metros)

    const originFloor = Math.floor(origin / 100);
    const destinationFloor = Math.floor(destination / 100);

    // Calcular la distancia entre los pisos
    let totalDistance = Math.abs(destinationFloor - originFloor) * distancePerFloor;

    // Calcular la distancia adicional si se usa el ascensor o las escaleras
    if (originFloor !== destinationFloor) {
        totalDistance += elevatorDistance;
    } else {
        totalDistance += Math.abs(destination - origin) * stairDistance;
    }

    return totalDistance;
}

function calculateTime(distance) {
    const walkingSpeed = 5; // Velocidad promedio caminando (en km/h)
    const runningSpeed = 15; // Velocidad promedio corriendo (en km/h)
    const elevatorTime = 12.47; // Tiempo de viaje en el ascensor entre pisos (en segundos)

    // Convertir la distancia a kilómetros
    const distanceInKm = distance / 1000;

    // Calcular el tiempo basado en la velocidad de caminar
    let time = distanceInKm / walkingSpeed * 60 * 60; // Convertir a segundos

    // Si la distancia es corta, se puede correr para ahorrar tiempo
    if (distanceInKm < 0.5) {
        time = distanceInKm / runningSpeed * 60 * 60; // Convertir a segundos
    }

    // Agregar tiempo adicional si se usa el ascensor
    if (distance % 100 !== 0) {
        time += elevatorTime;
    }

    return time;
}
