const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static('static'));

// Parse JSON bodies
app.use(bodyParser.json());

// Define route to run Python script
app.post('/run_python_script', (req, res) => {
    const arguments = req.body.arguments || [];

    // Execute the Python script with provided arguments
    const pythonProcess = spawn('python', ['flask_app/apiCall/other.py', ...arguments]);
    
    pythonProcess.stdout.on('data', (data) => {
        const output = JSON.parse(data.toString());
        console.log(output);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
