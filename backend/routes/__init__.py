from flask import Flask
from mongoengine import connect
from dotenv import load_dotenv
from config import Config

def create_app():
    load_dotenv()  # Load environment variables

    app = Flask(__name__)
    app.config.from_object(Config)

    connect(host=app.config['MONGO_URI'])  # Connect to MongoDB

    from .auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    from .destination_routes import destination_bp
    app.register_blueprint(destination_bp, url_prefix="/api/destination")
    
    from .blog_routes import blog_bp
    app.register_blueprint(blog_bp, url_prefix="/api/blog")
    
    from .wishlist_routes import wishlist_bp
    app.register_blueprint(wishlist_bp, url_prefix="/api/wishlist")
    
    from .booking_routes import booking_bp
    app.register_blueprint(booking_bp, url_prefix="/api/booking")
    return app
