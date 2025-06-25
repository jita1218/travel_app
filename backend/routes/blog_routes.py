from flask import Blueprint, request
from controller.review_controller import add_review_controller, get_all_reviews_controller

blog_bp = Blueprint("blog", __name__)

@blog_bp.route("/review", methods=["POST"])
def add_review():
    data = request.get_json()
    return add_review_controller(data)

@blog_bp.route("/reviews", methods=["GET"])
def get_reviews():
    return get_all_reviews_controller()