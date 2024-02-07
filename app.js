const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(bodyParser.json());

app.post('/run_python_script', (req, res) => {
    const arguments = req.body.arguments || [];

    // Execute the Python script with provided arguments
    const pythonProcess = spawn('python', ['flask_app/python_script.py', ...arguments]);
    
    pythonProcess.stdout.on('data', (data) => {
        const output = JSON.parse(data.toString());
        res.json({ output });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
