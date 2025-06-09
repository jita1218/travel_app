from mongoengine import Document, StringField, DateTimeField
from datetime import datetime, timezone
from werkzeug.security import generate_password_hash, check_password_hash

class User(Document):
    # Full name of the user (required)
    fullname = StringField(required=True)
    # Unique username for the user (required)
    username = StringField(required=True, unique=True)
    # Hashed password (required, minimum length 6)
    password_hash = StringField(required=True, min_length=6)
    # Timestamp when the user was created (defaults to current UTC time)
    created_at = DateTimeField(default=lambda: datetime.now(timezone.utc))

    def set_password(self, password):
        # Hash the password 
        self.password_hash = generate_password_hash(password)
        

    def check_password(self, password):
        # Check if the provided password matches the hashed password
        return check_password_hash(self.password_hash, password)
