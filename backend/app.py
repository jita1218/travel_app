from dotenv import load_dotenv
load_dotenv()

from flask import Flask
from flask_pymongo import PyMongo
from config import Config
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

# Load configuration from Config class
app.config.from_object(Config)

# Enable CORS for all routes and origins
CORS(app, resources={r"/*": {"origins": "*"}})

mongo = PyMongo(app)

@app.route('/')
def home():
    return "Welcome to the Flask MongoDB API!"

# Test MongoDB connection
try:
    mongo.cx.admin.command('ping')
    print("MongoDB connection successful!")
except Exception as e:
    print("MongoDB connection failed:", e)

# Register authentication blueprint
from routes.auth_routes import auth_bp
app.register_blueprint(auth_bp, url_prefix="/auth")

# Register destination blueprint
from routes.destination_routes import destination_bp
app.register_blueprint(destination_bp, url_prefix="/api/destination")

# Run the Flask app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=Config.PORT, debug=True)