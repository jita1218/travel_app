from flask import Blueprint
from controller.auth_controller import signup, login, signout

# Create a Blueprint for authentication routes
auth_bp = Blueprint('auth', __name__)

# Route for user signup
@auth_bp.route('/signup', methods=['POST'])
def register():
    return signup()

# Route for user login
@auth_bp.route('/login', methods=['POST'])
def login_route():
    return login()

# Route for user signout
@auth_bp.route('/signout', methods=['POST'])
def signout_route():
    return signout()
