# auth.py
from flask import jsonify, request, Blueprint
from models import db, User, TokenBlocklist
from werkzeug.security import check_password_hash
from datetime import datetime, timezone
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity, get_jwt
)
from flask_cors import cross_origin

auth_bp = Blueprint("auth_bp", __name__)

# -------------------------------
# Login Endpoint
# -------------------------------
@auth_bp.route("/login", methods=["POST", "OPTIONS"])
@cross_origin(origins="http://127.0.0.1:5173", supports_credentials=True)
def login():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200

    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_admin": user.is_admin,
        }
        return jsonify({"access_token": access_token, "user": user_data}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 404

# -------------------------------
# Current User Endpoint
# -------------------------------
@auth_bp.route("/current_user", methods=["GET", "OPTIONS"])
@cross_origin(origins="http://127.0.0.1:5173", supports_credentials=True)
@jwt_required()
def current_user():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200

    current_user_id = get_jwt_identity()
    
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "User not found"}), 401

    user_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "is_admin": user.is_admin,
    }
    return jsonify(user_data), 200

# -------------------------------
# Logout Endpoint
# -------------------------------
@auth_bp.route("/logout", methods=["DELETE", "OPTIONS"])
@cross_origin(origins="http://127.0.0.1:5173", supports_credentials=True)
@jwt_required()
def logout():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200

    jti = get_jwt()["jti"]
    now = datetime.now(timezone.utc)
    db.session.add(TokenBlocklist(jti=jti, created_at=now))
    db.session.commit()
    return jsonify({"success": "Logged out successfully"}), 200
