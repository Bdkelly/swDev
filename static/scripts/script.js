function runpython() {
    const departureCity = document.getElementById('departureCity').value;
    const arrivalCity = document.getElementById('arrivalCity').value;
    // Arguments to pass to the Python script
    var requestData = { departureCity, arrivalCity };

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/run_python_script', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Request was successful
                console.log(JSON.parse(xhr.responseText));
            } else {
                // Request failed
                console.error('Request failed with status:', xhr.status);
            }
        };
    
        xhr.onerror = function () {
            // Error during the request
            console.error('Request failed');
        };
    
        xhr.send(JSON.stringify(requestData));
    }
        