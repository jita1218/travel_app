import jwt
from datetime import datetime, timedelta
from flask import current_app
import os

def generate_token(user_id, expires_in_days=7):
    # Ensure token is only generated in a secure environment
    flask_env = os.getenv("FLASK_ENV", "development")
    if flask_env != "development":
        print("Warning: Generating JWT in non-production environment!")

    payload = {
        "sub": str(user_id),
        "exp": datetime.utcnow() + timedelta(days=expires_in_days)
    }
    token = jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")
    return token