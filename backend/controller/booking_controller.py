from flask import jsonify
from models.booking_model import Booking
from datetime import datetime

# Controller to create a new booking
def create_booking_controller(data):
    username = data.get("username")
    destination = data.get("destination")
    travel_date = data.get("travel_date")
    num_people = data.get("num_people")

    # Validate required fields
    if not username or not destination or not travel_date or not num_people:
        return jsonify({"error": "All fields are required"}), 400

    # Parse and validate travel date
    try:
        travel_date_obj = datetime.fromisoformat(travel_date)
    except ValueError:
        return jsonify({"error": "Invalid travel date format. Use ISO format (YYYY-MM-DD)."}), 400

    # Create and save the booking
    booking = Booking(
        username=username,
        destination=destination,
        travel_date=travel_date_obj,
        num_people=int(num_people)
    )
    booking.save()

    # Return success response with booking ID
    return jsonify({
        "message": "Booking created successfully",
        "id": str(booking.id)
    }), 201

# Controller to get all bookings for a user
def get_user_bookings_controller(username):
    # Validate username
    if not username:
        return jsonify({"error": "Username is required"}), 400

    # Query bookings for the user, ordered by creation date (descending)
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
    # Return list of bookings
    return jsonify(output), 200

# Controller to cancel a booking
def cancel_booking_controller(data):
    username = data.get("username")
    destination = data.get("destination")

    # Validate required fields
    if not username or not destination:
        return jsonify({"error": "Username and destination are required"}), 400

    # Delete the booking matching username and destination
    deleted = Booking.objects(username=username, destination=destination).delete()
    if deleted == 0:
        return jsonify({"error": "Booking not found"}), 404

    # Return success response
    return jsonify({"message": "Booking cancelled"}), 200