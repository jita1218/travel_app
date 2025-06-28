from flask import jsonify
from models.wishlist_model import Wishlist
from datetime import datetime
from mongoengine.errors import NotUniqueError

# Controller to add a destination to the user's wishlist
def add_to_wishlist_controller(data):
    username = data.get("username")
    destination = data.get("destination")

    # Validate input
    if not username or not destination:
        return jsonify({"error": "Username and destination are required"}), 400

    try:
        # Create and save new wishlist item
        item = Wishlist(username=username, destination=destination, added_at=datetime.utcnow())
        item.save()
        return jsonify({"message": "Destination added to wishlist!"}), 201

    except NotUniqueError:
        # Handle duplicate entry
        return jsonify({"error": "Destination already in wishlist"}), 409

# Controller to get all wishlist items for a user
def get_wishlist_controller(username):
    # Validate input
    if not username:
        return jsonify({"error": "Username is required"}), 400

    # Query wishlist items for the user, ordered by most recent
    items = Wishlist.objects(username=username).order_by("-added_at")
    output = [
        {
            "destination": item.destination,
            "added_at": item.added_at.isoformat()
        }
        for item in items
    ]
    return jsonify(output), 200

# Controller to remove a destination from the user's wishlist
def remove_from_wishlist_controller(data):
    username = data.get("username")
    destination = data.get("destination")

    # Validate input
    if not username or not destination:
        return jsonify({"error": "Username and destination required"}), 400

    # Delete the wishlist item
    deleted = Wishlist.objects(username=username, destination=destination).delete()
    if deleted == 0:
        # Item not found
        return jsonify({"error": "Item not found"}), 404

    return jsonify({"message": "Item removed from wishlist"}), 200