from flask import jsonify
from models.booking_model import Booking
from datetime import datetime

def create_booking_controller(data):
    username = data.get("username")
    destination = data.get("destination")
    travel_date = data.get("travel_date")
    num_people = data.get("num_people")

    if not username or not destination or not travel_date or not num_people:
        return jsonify({"error": "All fields are required"}), 400

    try:
        travel_date_obj = datetime.fromisoformat(travel_date)
    except ValueError:
        return jsonify({"error": "Invalid travel date format. Use ISO format (YYYY-MM-DD)."}), 400

    booking = Booking(
        username=username,
        destination=destination,
        travel_date=travel_date_obj,
        num_people=int(num_people)
    )
    booking.save()

    return jsonify({
        "message": "Booking created successfully",
        "id": str(booking.id)
    }), 201


def get_user_bookings_controller(username):
    if not username:
        return jsonify({"error": "Username is required"}), 400

    bookings = Booking.objects(username=username).order_by("-created_at")
    output = [
        {
            "destination": b.destination,
            "travel_date": b.travel_date.strftime("%Y-%m-%d"),
            "num_people": b.num_people,
            "created_at": b.created_at.isoformat()
        }
        for b in bookings
    ]
    return jsonify(output), 200


def cancel_booking_controller(data):
    username = data.get("username")
    destination = data.get("destination")

    if not username or not destination:
        return jsonify({"error": "Username and destination are required"}), 400

    deleted = Booking.objects(username=username, destination=destination).delete()
    if deleted == 0:
        return jsonify({"error": "Booking not found"}), 404

    return jsonify({"message": "Booking cancelled"}), 200