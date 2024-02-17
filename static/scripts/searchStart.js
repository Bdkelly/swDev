function getFlights() {
    console.log("Searching Flights")
    const departureCity = document.getElementById('fromdrop').value;
    const arrivalCity = document.getElementById('todrop').value;
    const departureDate = document.getElementById('departureDate').value;
    const returnDate = document.getElementById('returnDate').value;
    console.log(returnDate,departureCity,departureDate,arrivalCity)
}