let responseData;
let flightData;

function runpython() {
    //This function get info from webpage to pass to Python to get Airport data for webpage
    console.log("Running")
    const departureCity = document.getElementById('departureCity').value;
    const arrivalCity = document.getElementById('arrivalCity').value;
    fetch('/run_python_script', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ arguments: { departureCity, arrivalCity } })
  })
  .then(response => response.json())
  .then(data => {
      responseData = data;
      updateDropdown()
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
document.getElementById('saver').addEventListener('click', saveFlights);
function saveFlights(){
  //Tried to save flight data function does not work
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkedFlights = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const flightKey = checkbox.value;
            const flightInfo = flightData[flightKey];
            checkedFlights.push(flightInfo);
        }
    });

    console.log("Checked Flights:", checkedFlights);
    postCheckedFlights(checkedFlights)
}
function postCheckedFlights(checkedFlights){
  //Tried to post flight data to savedflight.html page
  const postData = JSON.stringify(checkedFlights);
  fetch('/saveflights.html', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({postData})
})
.then(response => response.json())
.then(data => {
    flightData = data;
    const flightbox = document.getElementById('flight-box');
    Object.entries(flightData).forEach(([flightKey, flightInfo]) => {
      const flightDiv = document.createElement('div');
      flightDiv.classList.add('flight-info');
      flightDiv.classList.add('part-bubble');
      const priceElement = document.createElement('p');
      priceElement.textContent = `Price: ${flightInfo.Price}`;
      const scoreElement = document.createElement('p');
      scoreElement.textContent = `Score: ${flightInfo.Score}`;
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
    });
}
function getFlights(){
  //Get flight data (Airport, Departure Date, Return Date *optional) and passes it to Python to call API to get all flight information
  console.log("Searching Flights")
  if (!responseData) {
    console.error("responseData is not available. Did you call runpython() first?");
    return;
  }
  clearFlights()
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
  //Creates html items, and posts then to web page
  flightData = data;
  const flightbox = document.getElementById('flight-box');
  createheader(flightData,flightbox);
  Object.entries(flightData).forEach(([flightKey, flightInfo]) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const label = document.createElement('label');
    label.htmlFor = `flight-${flightKey}`;
    label.textContent = 'Save Flight';
    checkbox.id = `flight-${flightKey}`;
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
  //Clears flight info
  const flightbox = document.getElementById('flight-box');
  flightbox.innerHTML = ""; 
}
function updateDropdown() {
  //Clears dropdown information from page
  fromdrop.innerHTML = "";
  todrop.innerHTML = ""; 
}
function createheader(flightData,flightbox){
  //Function to clean up getFlights function, and post Data to webpage
  const firstFlightKey = Object.keys(flightData)[0]; 
  const firstFlightInfo = flightData[firstFlightKey];
  header = document.createElement('div');
  header.classList.add('part-bubble');
  const orgdestElement = document.createElement('h2');
  orgdestElement.classList.add('header');
  orgdestElement.textContent = `Origin: ${firstFlightInfo.Origin} --> Destination: ${firstFlightInfo.Destination}`;
  header.appendChild(orgdestElement)
  flightbox.appendChild(header);
}
