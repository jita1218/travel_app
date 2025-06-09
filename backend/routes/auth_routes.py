from flask import Blueprint, request, jsonify
from controller.auth_controller import signup, login, signout

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def register():
    return signup()

@auth_bp.route('/login', methods=['POST'])
def login_route():
    return login()

@auth_bp.route('/signout', methods=['POST'])
def signout_route():
    return signout()