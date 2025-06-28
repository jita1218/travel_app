from flask import Blueprint, request
from controller.wishlist_controller import (
    add_to_wishlist_controller,
    get_wishlist_controller,
    remove_from_wishlist_controller
)

wishlist_bp = Blueprint("wishlist", __name__)

@wishlist_bp.route("/add", methods=["POST"])
def add_wishlist():
    print("Adding destination to wishlist")
    data = request.get_json()
    return add_to_wishlist_controller(data)

@wishlist_bp.route("/get", methods=["GET"])
def get_wishlist():
    print("Fetching wishlist")
    username = request.args.get("username")
    return get_wishlist_controller(username)

@wishlist_bp.route("/remove", methods=["DELETE"])
def remove_wishlist():
    print("Removing destination from wishlist")
    data = request.get_json()
    return remove_from_wishlist_controller(data)