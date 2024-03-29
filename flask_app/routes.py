from flask import jsonify, request
from flask_app import app
import subprocess
import json

@app.route('/run_python_script', methods=['POST'])
def run_python_script():
    data = request.get_json()
    print(data)
    arguments = data.get('arguments', [])
    print(arguments)
    # Execute the Python script with provided arguments
    result = subprocess.run(['python', 'other.py'] + arguments, capture_output=True, text=True)
    
    # Return JSON response
    return jsonify({'output': result.stdout})
