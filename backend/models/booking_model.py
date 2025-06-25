from mongoengine import Document, StringField, DateTimeField, IntField
from datetime import datetime

class Booking(Document):
    username = StringField(required=True)
    destination = StringField(required=True)
    travel_date = DateTimeField(required=True)
    num_people = IntField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)

    meta = {'collection': 'bookings'}