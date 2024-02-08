function runpython() {
    const departureCity = document.getElementById('departureCity').value;
    const arrivalCity = document.getElementById('arrivalCity').value;
    // Arguments to pass to the Python script
    var arguments = { departureCity };

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/run_python_script', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                console.log(responseData);
            }
        };
        xhr.send(JSON.stringify({ arguments: arguments }));
    }
    