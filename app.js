const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const app = express();


// Serve static files
app.use(express.static('static'));
const port = process.env.PORT || 8080;

// Parse JSON bodies
app.use(bodyParser.json());
//
app.post('/Alive',(req,res) => {
    const data  = req;
    const pythonProcess = spawn('python', ['flask_app/useap.py']);
    pythonProcess.stdout.on('data',(data) => {
        const parsedData = JSON.parse(data.toString());
        res.json(parsedData);
    }
}
// Define route to run Python script
app.post('/run_python_script', (req, res) => {
    const data  = req.body.arguments;
    const depcity = data.departureCity;
    const arrcity = data.arrivalCity

    // Execute the Python script with provided arguments
    const pythonProcess = spawn('python', ['flask_app/real.py', depcity,arrcity]);
    
    pythonProcess.stdout.on('data', (data) => {
        try {
            const parsedData = JSON.parse(data.toString()); // Attempt to parse as JSON first
            res.json(parsedData); 
        } catch (error) {
            // If it's not valid JSON, handle it differently (see method 2)
            console.log("Data is not in JSON format:", data.toString());  
        } 
    });
});
app.post('/flight_find', (req, res) => {
    const data  = req.body.arguments;
    const depcity = [data.fromdata.skyId,data.fromdata.entityId];
    const arrcity = [data.todata.skyId,data.todata.entityId];
    const depdate = data.departureDate;
    const retdate = data.returnDate;
    // Execute the Python script with provided arguments
    const pythonProcess = spawn('python', ['flask_app/flight_get.py', depcity,arrcity,depdate,retdate]);
    
    pythonProcess.stdout.on('data', (data) => {
        try {
            const parsedData = JSON.parse(data.toString()); // Attempt to parse as JSON first
            res.json(parsedData); 
        } catch (error) {
            // If it's not valid JSON, handle it differently (see method 2)
            console.log("Data is not in JSON format:", data.toString());  
        } 
    });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
