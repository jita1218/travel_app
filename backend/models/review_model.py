from mongoengine import Document, StringField, IntField, DateTimeField
from datetime import datetime

class Review(Document):
    username = StringField(required=True)
    destination = StringField(required=True)
    review = StringField(required=True)
    rating = IntField(min_value=1, max_value=5, required=True)
    timestamp = DateTimeField(default=datetime.utcnow)

    meta = {'collection': 'reviews'}
