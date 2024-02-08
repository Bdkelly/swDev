function runPythonScript() {
    const departureCity = document.getElementById('departureCity').value;
    const arrivalCity = document.getElementById('arrivalCity').value;
    // Arguments to pass to the Python script
    var arguments = { departureCity };

    // Make an AJAX request to run the Python script
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/run_python_script', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var responseData = JSON.parse(xhr.responseText);
            console.log(responseData);
        }
    } else {
        console.error('Error running Python script:', xhr.statusText);
      }
    };
    xhr.send(JSON.stringify({ arguments }));
}
