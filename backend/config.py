import os

class Config:
    MONGO_URI = os.getenv("MONGO_URI")
    SECRET_KEY = os.getenv("SECRET_KEY")
    PORT = int(os.getenv("PORT"))
    OPENTRIPMAP_API_KEY = os.getenv("OPENTRIPMAP_API_KEY")

