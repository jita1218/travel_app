from flask import Blueprint, request
from controller.wishlist_controller import (
    add_to_wishlist_controller,
    get_wishlist_controller,
    remove_from_wishlist_controller
)

wishlist_bp = Blueprint("wishlist", __name__)

@wishlist_bp.route("/add", methods=["POST", "OPTIONS"])
def add_wishlist():
    # Endpoint to add a destination to the wishlist
    print("Adding destination to wishlist")
    data = request.get_json()  # Get JSON data from the request body
    return add_to_wishlist_controller(data)  # Call controller to handle logic

@wishlist_bp.route("/get", methods=["GET"])
def get_wishlist():
    # Endpoint to fetch the wishlist for a user
    print("Fetching wishlist")
    username = request.args.get("username")  # Get username from query parameters
    return get_wishlist_controller(username)  # Call controller to handle logic

@wishlist_bp.route("/remove", methods=["DELETE", "OPTIONS"])
def remove_wishlist():
    # Endpoint to remove a destination from the wishlist
    print("Removing destination from wishlist")
    data = request.get_json()  # Get JSON data from the request body
    return remove_from_wishlist_controller(data)  # Call controller to handle logic