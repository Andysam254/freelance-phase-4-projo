from flask import jsonify, request, Blueprint
from models import db, Job, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

job_bp = Blueprint("job_bp", __name__)

# ==================================JOBS======================================

# CREATE - Add Job
@job_bp.route("/job/add", methods=["POST"])
@jwt_required()
def add_job():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    title = data.get('title')
    description = data.get('description')
    skills_required = data.get('skills_required')
    budget = data.get('budget')
    deadline_str = data.get('deadline')  # Get the deadline as a string
    category = data.get('category')

    if not all([title, description, skills_required, budget, deadline_str, category]):
        return jsonify({"error": "All fields are required"}), 400

    # Convert deadline string to Python datetime object
    try:
        deadline = datetime.strptime(deadline_str, "%Y-%m-%d")
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

    new_job = Job(
        title=title,
        description=description,
        skills_required=skills_required,
        budget=budget,
        deadline=deadline,  # Correct datetime object
        category=category,
        user_id=current_user_id,
        is_active=True,
        is_complete=False
    )

    db.session.add(new_job)
    db.session.commit()

    return jsonify({"success": "Job added successfully"}), 201
#fetching  jobs 

@job_bp.route("/job/all", methods=["GET"])
def get_all_jobs():
    jobs = Job.query.all()
    jobs_list = [{
        "id": job.id,
        "title": job.title,
        "description": job.description,
        "category": job.category,
        "budget": job.budget,
        "deadline": job.deadline.strftime("%Y-%m-%d")
    } for job in jobs]
    return jsonify({"jobs": jobs_list}), 200


# UPDATE - Update Job
@job_bp.route("/job/<int:job_id>", methods=["PUT"])
@jwt_required()
def update_job(job_id):
    current_user_id = get_jwt_identity()
    data = request.get_json()

    job = Job.query.get(job_id)

    if not job or job.user_id != current_user_id:
        return jsonify({"error": "Job not found or unauthorized"}), 403

    title = data.get('title', job.title)
    description = data.get('description', job.description)
    skills_required = data.get('skills_required', job.skills_required)
    budget = data.get('budget', job.budget)
    category = data.get('category', job.category)
    is_active = data.get('is_active', job.is_active)
    is_complete = data.get('is_complete', job.is_complete)

    # ✅ Convert deadline string to datetime before updating
    deadline_str = data.get('deadline')
    if deadline_str:
        try:
            deadline = datetime.strptime(deadline_str, "%Y-%m-%d")
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400
    else:
        deadline = job.deadline

    # Apply updates
    job.title = title
    job.description = description
    job.skills_required = skills_required
    job.budget = budget
    job.deadline = deadline
    job.category = category
    job.is_active = is_active
    job.is_complete = is_complete

    db.session.commit()
    return jsonify({"success": "Job updated successfully"}), 200



# DELETE - Delete Job
@job_bp.route("/job/<int:job_id>", methods=["DELETE"])
@jwt_required()
def delete_job(job_id):
    current_user_id = get_jwt_identity()

    job = Job.query.filter_by(id=job_id, user_id=current_user_id).first()

    if not job:
        return jsonify({"error": "Job not found or unauthorized"}), 403

    db.session.delete(job)
    db.session.commit()
    return jsonify({"success": "Job deleted successfully"}), 200