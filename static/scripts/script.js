function runpython() {
    const departureCity = document.getElementById('departureCity').value;
    // Create a JSON object with arguments for the Python script
    const arguments = { departureCity };
  
    // Make an AJAX request to the Flask app endpoint
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/run_python_script', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const responseData = JSON.parse(xhr.responseText);
          console.log(responseData); // Log the data from the Python script
  
          // You can now process the responseData here, e.g., display it on the page
          // Example:
          const outputElement = document.getElementById('output');
          outputElement.textContent = JSON.stringify(responseData, null, 2);
        } else {
          console.error('Error running Python script:', xhr.statusText);
        }
      }
    };
  
    xhr.send(JSON.stringify({ arguments }));