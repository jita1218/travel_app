from flask import Blueprint, request
from controller.review_controller import add_review_controller, get_all_reviews_controller, get_user_reviews_controller

blog_bp = Blueprint("blog", __name__)

@blog_bp.route("/review", methods=["POST"])
def add_review():
    print("Adding new review")
    data = request.get_json()
    return add_review_controller(data)

@blog_bp.route("/reviews", methods=["GET"])
def get_reviews():
    username = request.args.get("username")
    if username:
        return get_user_reviews_controller(username)
    else:
        return get_all_reviews_controller()