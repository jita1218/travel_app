# app/__init__.py
import os
from flask import Flask
from mongoengine import connect
from dotenv import load_dotenv
from config import Config

def create_app():
    load_dotenv()  # Load values from .env file

    app = Flask(__name__)
    app.config.from_object(Config)

    connect(host=app.config['MONGO_URI'])  # Use MONGO_URI from .env

    from .auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    return app
