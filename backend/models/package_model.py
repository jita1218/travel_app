from mongoengine import Document, StringField, IntField, ListField

class Package(Document):
    name = StringField(required=True)
    destination = StringField(required=True)
    duration = StringField(required=True)
    pricePerPerson = IntField(required=True)
    features = ListField(StringField())

    meta = {
        'collection': 'packages',
        'ordering': ['destination'],
        'strict': False
    }
