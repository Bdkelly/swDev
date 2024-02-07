function searchFlights() {
    const departureCity = document.getElementById('departureCity').value;
    const arrivalCity = document.getElementById('arrivalCity').value;
    const departureDate = document.getElementById('departureDate').value;
    const returnDate = document.getElementById('returnDate').value;

    // Call the Node.js backend to invoke the Python script
    fetch('http://localhost:3000/api/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            departureCity,
            arrivalCity,
            departureDate,
            returnDate,
        }),
    })
        .then(response => response.json())
        .then(data => {
            // Display the results on the page (replace with your actual display logic)
            const resultsDiv = document.getElementById('flightResults');
            resultsDiv.innerHTML = `<h2>Flight Information</h2>`;
            resultsDiv.innerHTML += `<p>Departure City: ${data.departureCity}</p>`;
            resultsDiv.innerHTML += `<p>Arrival City: ${data.arrivalCity}</p>`;
            // Add more information as needed
        })
        .catch(error => console.error('Error fetching data:', error));
}