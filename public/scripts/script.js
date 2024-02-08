
function searchFlights() {
    const departureCity = document.getElementById('departureCity').value;
    const arrivalCity = document.getElementById('arrivalCity').value;
    const departureDate = document.getElementById('departureDate').value;
    const returnDate = document.getElementById('returnDate').value;

    console.log(returnDate,departureCity,departureDate,arrivalCity)
};

function runpython(){
    const departureCity = document.getElementById('departureCity').value;
    const arrivalCity = document.getElementById('arrivalCity').value;
    const departureDate = document.getElementById('departureDate').value;
    const returnDate = document.getElementById('returnDate').value;

    var args = [departureCity,arrivalCity]

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/runpython', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var responseData = JSON.parse(xhr.responseText);
            console.log(responseData);
        }
    };
    xhr.send(JSON.stringify({ arguments: args }));
}