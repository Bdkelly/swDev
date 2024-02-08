from flask import Flask

app = Flask(__name__)

@app.route('/Flask',method=['GET'])
def index():
    return "Flask Server"

if __name__ == "__main__":
    app.run(port=5000, debug=True)