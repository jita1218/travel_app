from flask import jsonify
from models.review_model import Review
from datetime import datetime

# Controller to add a new review
def add_review_controller(data):
    # Extract fields from the input data
    username = data.get("username")
    destination = data.get("destination")
    review_text = data.get("review")

    # Validate required fields
    if not username or not destination or not review_text:
        return jsonify({"error": "All fields are required"}), 400

    # Create a new Review object
    review = Review(
        username=username,
        destination=destination,
        review=review_text,
        timestamp=datetime.utcnow()
    )
    review.save()  # Save the review to the database

    # Return success response with the new review's ID
    return jsonify({
        "message": "Review added successfully",
        "id": str(review.id)
    }), 201

# Controller to get all reviews
def get_all_reviews_controller():
    # Retrieve all reviews, ordered by timestamp descending
    reviews = Review.objects().order_by("-timestamp")
    # Format the reviews for JSON response
    output = [
        {
            "username": r.username,
            "destination": r.destination,
            "review": r.review,
            "timestamp": r.timestamp.isoformat()
        }
        for r in reviews
    ]
    return jsonify(output), 200