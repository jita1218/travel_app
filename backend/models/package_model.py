from mongoengine import Document, StringField, IntField, ListField

# Define the Package document schema for MongoDB using MongoEngine
class Package(Document):
    # Name of the package (required)
    name = StringField(required=True)
    # Destination of the package (required)
    destination = StringField(required=True)
    # Duration of the package (required)
    duration = StringField(required=True)
    # Price per person for the package (required)
    pricePerPerson = IntField(required=True)
    # List of features included in the package
    features = ListField(StringField())

    meta = {
        # Name of the MongoDB collection
        'collection': 'packages',
        # Default ordering by destination field
        'ordering': ['destination'],
        # Allow fields not defined in the schema
        'strict': False
    }
