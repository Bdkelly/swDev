let flightData;
function getFlights() {
    console.log("Searching Flights")
    const departureCity = document.getElementById('fromdrop').value;
    const arrivalCity = document.getElementById('todrop').value;
    const departureDate = document.getElementById('departureDate').value;
    const returnDate = document.getElementById('returnDate').value;
    console.log(departureCity,arrivalCity,departureDate,returnDate)

    fetch('/flight_find',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ arguments: { departureCity,arrivalCity,departureDate,returnDate } })
    })
    .then(response => response.json())
    .then(data => {
      flightData = data;
      console.log(flightData)
    })
    .catch(error => console.error('Error running Python script:', error));
};