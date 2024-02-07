from flask import jsonify, request
from flask_app import app
import subprocess
import json

@app.route('/run_python_script', methods=['POST'])
def runpython():
    data = request.get_json()
    arguments = data.get('arguments', [])
    
    # Execute the Python script with provided arguments
    result = subprocess.run(['python', 'python_script.py'] + arguments, capture_output=True, text=True)
    
    # Return JSON response
    return jsonify({'output': result.stdout})