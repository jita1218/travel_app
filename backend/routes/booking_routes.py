from flask import Blueprint, request
from controller.booking_controller import (
    create_booking_controller,
    get_user_bookings_controller,
    cancel_booking_controller
)
from flask_cors import cross_origin

booking_bp = Blueprint("booking", __name__)

@booking_bp.route("/create", methods=["POST","OPTIONS"])
@cross_origin()
def create_booking():
    # Endpoint to create a new booking
    print("Creating a new booking")
    data = request.get_json()
    return create_booking_controller(data)

@booking_bp.route("/my", methods=["GET"])
def get_user_bookings():
    # Endpoint to fetch bookings for a specific user
    print("Fetching user bookings")
    username = request.args.get("username")
    return get_user_bookings_controller(username)

@booking_bp.route("/cancel", methods=["DELETE"])
def cancel_booking():
    # Endpoint to cancel an existing booking
    print("Cancelling a booking")
    data = request.get_json()
    return cancel_booking_controller(data)