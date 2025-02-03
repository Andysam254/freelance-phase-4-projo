from flask import jsonify, request, Blueprint
from models import db, Application

application_bp = Blueprint("application_bp", __name__)

# ==================================APPLICATIONS======================================
# Add Application
@application_bp.route("/applications", methods=["POST"])
def add_application():
    data = request.get_json()
    user_id = data.get('user_id')
    job_id = data.get('job_id')
    cover_letter = data.get('cover_letter')
    resume = data.get('resume')

    if not user_id or not job_id or not cover_letter or not resume:
        return jsonify({"error": "All fields are required"}), 400

    existing_application = Application.query.filter_by(user_id=user_id, job_id=job_id).first()
    if existing_application:
        return jsonify({"error": "You have already applied for this job"}), 406

    new_application = Application(user_id=user_id, job_id=job_id, cover_letter=cover_letter, resume=resume, status='pending')
    db.session.add(new_application)
    db.session.commit()
    return jsonify({"success": "Application submitted successfully"}), 201

# Get All Applications
@application_bp.route("/applications", methods=["GET"])
def get_applications():
    applications = Application.query.all()
    applications_list = [{
        "id": app.id,
        "user_id": app.user_id,
        "job_id": app.job_id,
        "cover_letter": app.cover_letter,
        "resume": app.resume,
        "status": app.status
    } for app in applications]
    return jsonify(applications_list), 200

# Get Application by ID
@application_bp.route("/applications/<int:application_id>", methods=["GET"])
def get_application(application_id):
    application = Application.query.get(application_id)
    if not application:
        return jsonify({"error": "Application not found"}), 406
    return jsonify({
        "id": application.id,
        "user_id": application.user_id,
        "job_id": application.job_id,
        "cover_letter": application.cover_letter,
        "resume": application.resume,
        "status": application.status
    }), 200

# Update Application
@application_bp.route("/applications/<int:application_id>", methods=["PUT"])
def update_application(application_id):
    data = request.get_json()
    status = data.get('status')

    if not status:
        return jsonify({"error": "Status is required"}), 400

    application = Application.query.get(application_id)
    if not application:
        return jsonify({"error": "Application not found"}), 406

    application.status = status
    db.session.commit()
    return jsonify({"success": "Application updated successfully"}), 200

# Delete Application
@application_bp.route("/applications/<int:application_id>", methods=["DELETE"])
def delete_application(application_id):
    application = Application.query.get(application_id)
    if not application:
        return jsonify({"error": "Application not found"}), 406

    db.session.delete(application)
    db.session.commit()
    return jsonify({"success": "Application deleted successfully"}), 200
