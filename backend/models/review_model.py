from mongoengine import Document, StringField, DateTimeField
from datetime import datetime

class Review(Document):
    username = StringField(required=True)
    destination = StringField(required=True)
    review = StringField(required=True)
    timestamp = DateTimeField(default=datetime.utcnow)

    meta = {'collection': 'reviews'}  # Optional: custom collection name