from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import MetaData

# Initialize SQLAlchemy
metadata = MetaData()
db = SQLAlchemy(metadata=metadata)

# User Model
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    username = db.Column(db.String, nullable=False, unique=True)
   #exit is_approved = db.Column(db.Boolean, default=False)
    password = db.Column(db.String, nullable=False)
    role = db.Column(db.Enum('freelancer', 'client', 'admin', name='user_roles'), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    # Relationships
    applications = db.relationship('Application', back_populates='user', cascade='all, delete-orphan')
    jobs = db.relationship('Job', back_populates='user', cascade='all, delete-orphan', lazy=True)

# Job Model
class Job(db.Model):
    __tablename__ = 'job'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    deadline = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    is_complete = db.Column(db.Boolean, default=False)
    skills_required = db.Column(db.Text, nullable=False)
    budget = db.Column(db.Numeric, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    category = db.Column(db.String, nullable=False)

    # Foreign Key
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Relationships
    user = db.relationship('User', back_populates='jobs')
    applications = db.relationship('Application', back_populates='job', cascade='all, delete-orphan')

# Application Model

class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Ensure auto-increment
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'), nullable=False)
    cover_letter = db.Column(db.Text, nullable=False)
    resume = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(20), default="pending", nullable=False)

    # Relationships
    user = db.relationship('User', back_populates='applications')
    job = db.relationship('Job', back_populates='applications')

# Token Blocklist Model
class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)
