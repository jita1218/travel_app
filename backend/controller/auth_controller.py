# controllers/auth_controller.py
from flask import jsonify, current_app, request, make_response
from datetime import datetime, timedelta
import jwt
from models.user_model import User
from werkzeug.security import generate_password_hash, check_password_hash
from utils.generateToken import generate_token


def signup():
    try:
        data = request.json
        full_name = data.get('fullName')
        username = data.get('username')
        password = data.get('password')
        confirmPassword = data.get('confirmPassword')


        if not all([full_name, username, password, confirmPassword]):
            return jsonify({'error': 'All fields are required'}), 400

        if password != confirmPassword:
            return jsonify({'error': 'Passwords do not match'}), 400

        if User.objects(username=username).first():
            return jsonify({'error': 'User already exists'}), 400

        hashed_password = generate_password_hash(password)

        new_user = User(
            fullname=full_name,
            username=username,
            password_hash=hashed_password,
        )

        new_user.save()

        token = generate_token(new_user.id)
        
        response = make_response(jsonify({
            '_id': str(new_user.id),
            'fullName': new_user.fullname,
            'username': new_user.username,
            # 'profilePic': getattr(new_user, 'profile_pic', "")
        }), 201)

        response.set_cookie('jwt', token, httponly=True, max_age=604800)
        return response

    except Exception as e:
        print('Error in signup controller', str(e))
        return jsonify({'error': 'Internal server error'}), 500


def login():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        user = User.objects(username=username).first()
        if not user or not check_password_hash(user.password_hash, password):
            return jsonify({'error': 'Invalid username or password'}), 400

        token = jwt.encode({
            "sub": str(user.id),
            "exp": datetime.utcnow() + timedelta(days=7)
        }, current_app.config['SECRET_KEY'], algorithm="HS256")

        response = make_response(jsonify({
            '_id': str(user.id),
            'fullName': user.fullname,
            'username': user.username,
        }), 200)

        response.set_cookie('jwt', token, httponly=True, max_age=604800)
        return response

    except Exception as e:
        print('Error in login controller', str(e))
        return jsonify({'error': 'Internal server error'}), 500


def signout():
    try:
        response = make_response(jsonify({"message": "Logged out successfully"}), 200)
        response.set_cookie('jwt', '', max_age=0)
        return response
    except Exception as e:
        print('Error in logout controller', str(e))
        return jsonify({'error': 'Internal server error'}), 500
