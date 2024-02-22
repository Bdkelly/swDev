let responseData;
let flightData;

function runpython() {
    console.log("Running")
    const departureCity = document.getElementById('departureCity').value;
    const arrivalCity = document.getElementById('arrivalCity').value;
    // Create a JSON object with arguments for the Python script
  
    // Make an AJAX request to the Flask app endpoint
    fetch('/run_python_script', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ arguments: { departureCity, arrivalCity } })
  })
    keepAlive()
  .then(response => response.json())
  .then(data => {
      responseData = data;
      updateDropdown()
      // Assuming responseData is like: { departureCity: '...', arrivalCity: '...', otherFlightData: ... }
      var fromdrop = document.getElementById('fromdrop');
      for (var key in responseData.from){
        var option = document.createElement("option");
        option.value = key;
        option.text = responseData.from[key].title;
        fromdrop.add(option);
      }
      var todrop = document.getElementById('todrop');
      for (var key in responseData.to){
        var option = document.createElement("option");
        option.value = key;
        option.text = responseData.to[key].title;
        todrop.add(option);
      }
  })
  .catch(error => console.error('Error running Python script:', error));
};
function updateDropdown() {
  fromdrop.innerHTML = "";
  todrop.innerHTML = ""; 
}
function getFlights(){
  console.log("Searching Flights")
  if (!responseData) {
    console.error("responseData is not available. Did you call runpython() first?");
    return; // Exit if no data 
  }
  const fromapid = fromdrop.value;
  const toapid = todrop.value;
  //Real Data
  const fromdata = responseData.from[fromapid];
  const todata = responseData.to[toapid]
  const departureDate = document.getElementById('departureDate').value;
  const returnDate = document.getElementById('returnDate').value;
  const arguments = {fromdata,todata,departureDate,returnDate};
  fetch('/flight_find',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ arguments: { fromdata,todata,departureDate,returnDate } })
})
.then(response => response.json())
.then(data => {
  flightData = data;
  const flightbox = document.getElementById('flight-box');
  Object.entries(flightData).forEach(([flightKey, flightInfo]) => {
    const flightDiv = document.createElement('div');
    flightDiv.classList.add('flight-info');
    flightDiv.classList.add('part-bubble');
    //
    const priceElement = document.createElement('p');
    priceElement.textContent = `Price: ${flightInfo.Price}`;
    const scoreElement = document.createElement('p');
    scoreElement.textContent = `Score: ${flightInfo.Score}`;
    const flightToElement = document.createElement('div');
    for (const stopKey in flightInfo.flightTo) {
      const stop = flightInfo.flightTo[stopKey];
  
      const stopElement = document.createElement('p');
      stopElement.textContent = `From: ${stop.start} To: ${stop.end} 
                                 (${stop.durationInMinutes} mins) by ${stop.carrier}`;
      flightToElement.appendChild(stopElement);
    }
    //
    flightDiv.appendChild(flightToElement); 
    flightDiv.appendChild(priceElement);
    flightDiv.appendChild(scoreElement);
    flightbox.appendChild(flightDiv);
      
  });

  }
  )
console.log("DONE")
.catch(error => console.error('Error running Python script:', error));
};
function keepAlive(){
    console.log("Trying")
    fetch('/Alive',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ arguments: { fromdata,todata,departureDate,returnDate } })
})
    .then(response => response.json())
      .then(data => {
          console.log(data)
      })
}

