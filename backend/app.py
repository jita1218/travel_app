from dotenv import load_dotenv
load_dotenv()

from flask import Flask
from flask_pymongo import PyMongo
from config import Config
from flask_cors import CORS
from routes import create_app

# Initialize app using factory
app = create_app()

# Enable CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize Mongo (optional if not used in create_app)
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

# Run app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=Config.PORT, debug=True)
