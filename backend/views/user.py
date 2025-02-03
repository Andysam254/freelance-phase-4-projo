# user.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash
from models import db, User  

user_bp = Blueprint('user_bp', __name__)

# -------------------------------
# Fetch All Users (Admin Only)
# -------------------------------
@user_bp.route("/users", methods=["GET"])
@jwt_required()
def fetch_users():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user or not current_user.is_admin:
        return jsonify({"error": "Unauthorized"}), 403

    users = User.query.all()
    user_list = []
    for user in users:
        user_list.append({
            'id': user.id,
            'email': user.email,
            'is_admin': user.is_admin,
            'username': user.username,
            "jobs_posted": [
                {
                    "id": job.id,
                    "title": job.title,
                    "description": job.description,
                    "budget": job.budget,
                } for job in user.jobs_posted
            ],
            "applications": [
                {
                    "id": application.id,
                    "job_id": application.job_id,
                    "cover_letter": application.cover_letter,
                } for application in user.applications
            ],
        })

    return jsonify(user_list), 200

## -------------------------------
# Register New User
# -------------------------------
@user_bp.route("/users", methods=["POST"])
@jwt_required(optional=True)  # Allows both authenticated (admin) and unauthenticated users
def add_user():
    data = request.get_json()

    # Validate required fields
    required_fields = ['username', 'email', 'password']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    username = data['username']
    email = data['email']
    password = generate_password_hash(data['password'])
    role = data.get('role', 'freelancer')

    # Check if the username or email already exists
    if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
        return jsonify({"error": "Username or email already exists"}), 406

    # Check if request is from an authenticated admin
    current_user_id = get_jwt_identity()
    is_admin_request = False
    if current_user_id:
        current_user = User.query.get(current_user_id)
        if current_user and current_user.is_admin:
            is_admin_request = True

    # Only allow admin flag if the request is coming from an admin
    is_admin = bool(data.get('is_admin', False)) if is_admin_request else False

    # Create new user
    new_user = User(username=username, email=email, password=password, role=role, is_admin=is_admin)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "success": "User account created successfully!",
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email,
            "role": new_user.role,
            "is_admin": new_user.is_admin
        }
    }), 201

# -------------------------------
# Update User
# -------------------------------
@user_bp.route("/users/<int:user_id>", methods=["PATCH"])
@jwt_required()
def update_user(user_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user is None:
        return jsonify({"error": "Unauthorized"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User doesn't exist!"}), 404

    # Users can update themselves; admins can update any user
    if current_user.id != user_id and not current_user.is_admin:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()

    username = data.get('username', user.username)
    email = data.get('email', user.email)
    password = generate_password_hash(data['password']) if data.get('password') else user.password
    role = data.get("role", user.role)

    # Check if username or email is taken by another user
    if User.query.filter(User.username == username, User.id != user.id).first() or \
       User.query.filter(User.email == email, User.id != user.id).first():
        return jsonify({"error": "Username or email already exists"}), 406

    user.username = username
    user.email = email
    user.password = password
    user.role = role

    db.session.commit()
    return jsonify({
        "success": "Updated successfully",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role
        }
    }), 200

# -------------------------------
# Delete User
# -------------------------------
@user_bp.route("/users/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User you're trying to delete doesn't exist!"}), 406

    # Users can delete their own account; admins can delete any user
    if current_user.id != user_id and not current_user.is_admin:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(user)
    db.session.commit()
    return jsonify({"success": "Deleted successfully"}), 200
