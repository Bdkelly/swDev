const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/search', (req, res) => {
    const { departureCity, arrivalCity, departureDate, returnDate } = req.body;

    if (departureCity !== arrivalCity) {
        // Execute the Python script as a subprocess
        exec(
            `python3 api_script.py ${departureCity} ${arrivalCity} ${departureDate} ${returnDate}`,
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error: ${error.message}`);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                res.json(JSON.parse(stdout));
            }
        );
    } else {
        res.status(400).json({ error: 'Departure and arrival cities should be different' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
});