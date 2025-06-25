from flask import Blueprint, request
from controller.booking_controller import (
    create_booking_controller,
    get_user_bookings_controller,
    cancel_booking_controller
)

booking_bp = Blueprint("booking", __name__)

@booking_bp.route("/create", methods=["POST"])
def create_booking():
    data = request.get_json()
    return create_booking_controller(data)

@booking_bp.route("/my", methods=["GET"])
def get_user_bookings():
    username = request.args.get("username")
    return get_user_bookings_controller(username)

@booking_bp.route("/cancel", methods=["DELETE"])
def cancel_booking():
    data = request.get_json()
    return cancel_booking_controller(data)