from flask import jsonify
from models.wishlist_model import Wishlist
from datetime import datetime
from mongoengine.errors import NotUniqueError

def add_to_wishlist_controller(data):
    username = data.get("username")
    destination = data.get("destination")

    if not username or not destination:
        return jsonify({"error": "Username and destination are required"}), 400

    try:
        item = Wishlist(username=username, destination=destination, added_at=datetime.utcnow())
        item.save()
        return jsonify({"message": "Destination added to wishlist!"}), 201

    except NotUniqueError:
        return jsonify({"error": "Destination already in wishlist"}), 409


def get_wishlist_controller(username):
    if not username:
        return jsonify({"error": "Username is required"}), 400

    items = Wishlist.objects(username=username).order_by("-added_at")
    output = [
        {
            "destination": item.destination,
            "added_at": item.added_at.isoformat()
        }
        for item in items
    ]
    return jsonify(output), 200


def remove_from_wishlist_controller(data):
    username = data.get("username")
    destination = data.get("destination")

    if not username or not destination:
        return jsonify({"error": "Username and destination required"}), 400

    deleted = Wishlist.objects(username=username, destination=destination).delete()
    if deleted == 0:
        return jsonify({"error": "Item not found"}), 404

    return jsonify({"message": "Item removed from wishlist"}), 200