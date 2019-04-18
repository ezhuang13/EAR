# create the application
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import os
from config import Development
from models import db
from flask_cors import CORS

def create_app():
	# Initialize the Flask application
	app = Flask(__name__)
	CORS(app, support_credentials=True)

	# Configure Application based on Configuration Object (JSON)
	app.config.from_object(Development)
		
	# Initialize the SQLAlchemy Database with our Application
	db.init_app(app)

	# Import the API Routes as Blueprints
	from routes.user import user_api as user_blueprint
	from routes.project import project_api as project_blueprint

	# Register API's for each model
	app.register_blueprint(user_blueprint, url_prefix='/users')
	app.register_blueprint(project_blueprint, url_prefix='/project')

	# Return the Application!
	return app

# Create and Run the Application here.
if __name__ == '__main__':
	app = create_app()
	app.run(debug=False, host='0.0.0.0')
