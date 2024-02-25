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
let savedFlights = [];
function saveFlights(){
  document.addEventListener('change', (event) => {
    const checkbox = event.target;
    if (checkbox.type === 'checkbox') {
      const flightKey = checkbox.value;
      if (checkbox.checked) {
        savedFlights.push(flightKey); 
      } else {
        // Remove from array if unchecked
        const index = savedFlights.indexOf(flightKey); 
        if (index > -1) { 
          savedFlights.splice(index, 1);
        }
      }
      console.log("Saved Flights:", savedFlights); // To check
    }
  });
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
  const firstFlightKey = Object.keys(flightData)[0]; 
  const firstFlightInfo = flightData[firstFlightKey];
  header = document.createElement('div');
  const orgdestElement = document.createElement('h2');
  orgdestElement.textContent = `Origin: ${firstFlightInfo.Origin} --> Destination: ${firstFlightInfo.Destination}`;
  header.appendChild(orgdestElement)
  flightbox.appendChild(header);
  Object.entries(flightData).forEach(([flightKey, flightInfo]) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const label = document.createElement('label');
    label.htmlFor = `flight-${flightKey}`;
    label.textContent = 'Save Flight';
    checkbox.id = `flight-${flightKey}`; // Assuming you have unique flight identifiers
    checkbox.value = flightKey;
    const flightDiv = document.createElement('div');
    flightDiv.classList.add('flight-info');
    flightDiv.classList.add('part-bubble');
    //
    const priceElement = document.createElement('p');
    priceElement.textContent = `Price: ${flightInfo.Price}`;
    const scoreElement = document.createElement('p');
    scoreElement.textContent = `Score: ${flightInfo.Score}`;
    //
    const dep = document.createElement('p');
    dep.textContent = `Departure`;
    const flightToElement = document.createElement('div');
    if("flightFrom" in flightInfo){
      const retu = document.createElement('p');
      retu.textContent = `Return`;
      for (const stopKey in flightInfo.flightTo) {
        const stop = flightInfo.flightTo[stopKey];
        const stopElement = document.createElement('p');
        stopElement.textContent = `From: ${stop.start} To: ${stop.end} (${stop.durationInMinutes} mins) by ${stop.carrier}`;
        flightToElement.appendChild(stopElement);
      }
      const flightfromElement = document.createElement('div');
      for (const key in flightInfo.flightFrom) {
        const stop = flightInfo.flightFrom[key];
        const stopElement = document.createElement('p');
        stopElement.textContent = `From: ${stop.start} To: ${stop.end} (${stop.durationInMinutes} mins) by ${stop.carrier}`;
        flightfromElement.appendChild(stopElement);
      }
      flightDiv.appendChild(orgdestElement)
      flightDiv.appendChild(priceElement);
      flightDiv.appendChild(scoreElement);
      flightDiv.appendChild(dep);
      flightDiv.appendChild(flightToElement);
      flightDiv.appendChild(retu);
      flightDiv.appendChild(flightfromElement);
      flightbox.appendChild(flightDiv);
    }else{
      const flightToElement = document.createElement('div');
      for (const stopKey in flightInfo.flightTo) {
        const stop = flightInfo.flightTo[stopKey];
        const stopElement = document.createElement('p');
        stopElement.textContent = `From: ${stop.start} To: ${stop.end} (${stop.durationInMinutes} mins) by ${stop.carrier}`;
        flightToElement.appendChild(stopElement);
      }
      flightDiv.appendChild(priceElement);
      flightDiv.appendChild(scoreElement);
      flightDiv.appendChild(dep);
      flightDiv.appendChild(flightToElement);
    }
    flightDiv.appendChild(checkbox);
    flightDiv.appendChild(label); 
    flightbox.appendChild(flightDiv);
    // 
  });

  }
  )
console.log("DONE")
};
function clearFlights() {
  updateDropdown()
  const flightbox = document.getElementById('flight-box');
  flightbox.innerHTML = ""; 
}
function updateDropdown() {
  fromdrop.innerHTML = "";
  todrop.innerHTML = ""; 
}

