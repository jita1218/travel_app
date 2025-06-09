import jwt
from datetime import datetime, timedelta
from flask import current_app
import os
import logging

logger = logging.getLogger(__name__)

def generate_token(user_id, expires_in_days=7):
    flask_env = os.getenv("FLASK_ENV", "development")
    
    if flask_env != "development":
        logger.info("Generating JWT in non-production environment: %s", flask_env)

    # Prepare the payload with subject and expiration
    payload = {
        "sub": str(user_id),
        "exp": datetime.utcnow() + timedelta(days=expires_in_days)
    }
    try:
        # Encode the payload using the app's secret key and HS256 algorithm
        token = jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")
        return token
    except Exception as e:
        
        logger.error("Error generating JWT: %s", str(e))
        return None
