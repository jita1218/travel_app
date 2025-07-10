from flask import jsonify, g, request
from models.review_model import Review
from models.booking_model import Booking
from datetime import datetime
from mongoengine.errors import ValidationError

def add_review_controller(data):
    # Get username from session/token (not from request body)
    username = data.get("username")
    destination = data.get("destination")
    review_text = data.get("review")
    rating = data.get("rating")

    if not destination or not review_text or rating is None:
        return jsonify({"error": "All fields are required (destination, review, rating)"}), 400

    # Check if user has a booking for this destination
    booking = Booking.objects(username=username, destination=destination).first()
    if not booking:
        return jsonify({"error": "You can only review destinations you have booked."}), 403

    try:
        rating = int(rating)
        if rating < 1 or rating > 5:
            raise ValueError
    except ValueError:
        return jsonify({"error": "Rating must be an integer between 1 and 5"}), 400

    try:
        review = Review(
            username=username,
            destination=destination,
            review=review_text,
            rating=rating,
            timestamp=datetime.utcnow()
        )
        review.save()
        return jsonify({
            "message": "Review added successfully",
            "id": str(review.id)
        }), 201
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
# Controller to get all reviews

def get_user_reviews_controller(username):
    reviews = Review.objects(username=username).order_by("-timestamp")
    output = [
        {
            "username": r.username,
            "destination": r.destination,
            "review": r.review,
            "rating": r.rating,
            "timestamp": r.timestamp.isoformat()
        }
        for r in reviews
    ]
    return jsonify(output), 200

def get_all_reviews_controller():
    reviews = Review.objects().order_by("-timestamp")
    output = [
        {
            "username": r.username,
            "destination": r.destination,
            "review": r.review,
            "rating": r.rating,
            "timestamp": r.timestamp.isoformat()
        }
        for r in reviews
    ]
    return jsonify(output), 200