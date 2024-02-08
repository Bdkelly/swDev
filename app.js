const express = require('express');
const { spawn } = require('child_process');
const app = express();
app.use(express.static('static'));

// Define route to run Python script
app.post('/run_python_script', (req, res) => {
    const arguments = req.body.arguments || [];
    const depcity = arguments[0]; // Assuming the departure city is the first argument
  
    // Execute the Python script with provided arguments
    const pythonProcess = spawn('python', ['flask_app/apiCall/other.py', depcity]);
  
    pythonProcess.stdout.on('data', (data) => {
        // Data received from the Python script
        console.log('Python script output:', data.toString());
    });
    
    // Listen for errors from the Python script
    pythonProcess.stderr.on('data', (data) => {
        // Error output from the Python script
        console.error('Python script error:', data.toString());
    });
    
    // Listen for Python script exit
    pythonProcess.on('exit', (code) => {
        // Exit code of the Python script
        console.log('Python script exited with code:', code);
    });
