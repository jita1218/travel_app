from flask import jsonify
from models.review_model import Review
from datetime import datetime

def add_review_controller(data):
    username = data.get("username")
    destination = data.get("destination")
    review_text = data.get("review")

    if not username or not destination or not review_text:
        return jsonify({"error": "All fields are required"}), 400

    review = Review(
        username=username,
        destination=destination,
        review=review_text,
        timestamp=datetime.utcnow()
    )
    review.save()

    return jsonify({
        "message": "Review added successfully",
        "id": str(review.id)
    }), 201


def get_all_reviews_controller():
    reviews = Review.objects().order_by("-timestamp")
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