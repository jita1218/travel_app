from mongoengine import Document, StringField, DateTimeField
from datetime import datetime, timezone
from werkzeug.security import generate_password_hash, check_password_hash

class User(Document):
    fullname = StringField(required=True)
    username = StringField(required=True, unique=True)
    password_hash = StringField(required=True, min_length=6)
    created_at = DateTimeField(default=lambda: datetime.now(timezone.utc))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
