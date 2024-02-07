from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/runpython',methods=['POST'])
def runpython():
    data = request.get_json()
    args = data.get('arguments', [])
    result = subprocess.run(['python','example.py'] + args , capture_output=True, text=True)
    return jsonify({'output': result.stdout})