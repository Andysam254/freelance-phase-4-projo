from flask import Flask, jsonify, request
from flask_migrate import Migrate
from models import db, TokenBlocklist  
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_cors import CORS


app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///freelance_job_board.db'
db.init_app(app)
migrate = Migrate(app, db)

# JWT configuration
app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=30)

# Initialize the JWT Manager
jwt = JWTManager(app)




CORS(app, origins=["http://localhost:5174", "http://127.0.0.1:5174"], supports_credentials=True)
# Import your blueprints (make sure these are defined in your views module)
from views import user_bp, job_bp, application_bp, auth_bp

# Register the blueprints with the app
app.register_blueprint(user_bp)
app.register_blueprint(job_bp)
app.register_blueprint(application_bp)
app.register_blueprint(auth_bp)

# Define a callback function to check if a token has been revoked
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()
    return token is not None

if __name__ == "__main__":
    app.run(debug=True)
