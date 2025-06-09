from dotenv import load_dotenv
load_dotenv()

from routes import create_app

from flask import Flask
from flask_pymongo import PyMongo
from config import Config

app = Flask(__name__)

app.config.from_object(Config)

mongo = PyMongo(app)

# Check if the MongoDB connection is successful
try:
    # The 'admin' command 'ping' is a simple way to check connection
    mongo.cx.admin.command('ping')
    print("MongoDB connection successful!")
except Exception as e:
    print("MongoDB connection failed:", e)


from routes.auth_routes import auth_bp
app.register_blueprint(auth_bp, url_prefix="/auth")

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)