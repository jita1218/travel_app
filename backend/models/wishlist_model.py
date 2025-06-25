from mongoengine import Document, StringField, DateTimeField
from datetime import datetime

class Wishlist(Document):
    username = StringField(required=True)
    destination = StringField(required=True)
    added_at = DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'wishlist',
        'indexes': [
            {'fields': ('username', 'destination'), 'unique': True}
        ]
    }