const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const app = express();


// Serve static files
app.use(express.static('static'));
const port = process.env.PORT || 8080;

// Parse JSON bodies
app.use(bodyParser.json());

// Define route to run Python script
app.post('/run_python_script', (req, res) => {
    const data  = req.body.arguments;
    const depcity = data.departureCity;

    // Execute the Python script with provided arguments
    const pythonProcess = spawn('python', ['flask_app/other.py', depcity]);
    
    pythonProcess.stdout.on('data', (data) => {
        try {
            const parsedData = JSON.parse(data.toString()); // Attempt to parse as JSON first
            console.log(JSON.stringify(parsedData)); 
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
