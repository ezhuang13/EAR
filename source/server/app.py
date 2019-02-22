# create the application

from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import os
from config import Development
from models import db

def create_app():
	# Initialize the Flask application
	app = Flask(__name__, static_folder='../static')

	# Configure Application based on Configuration Object (JSON)
	app.config.from_object(Development)
		
	# Initialize the SQLAlchemy Database with our Application
	db.init_app(app)

	# Import the API Routes as Blueprints
	from routes.routes import user_api as user_blueprint

	# Register API's for each model
	app.register_blueprint(user_blueprint, url_prefix='/api/v1/users')

	# Render the Template HTML file at the base route!
	@app.route('/')
	def index():
		return render_template('index.html')

	# Creates a dummy route for all other routes (so whenever you type in /login or
	# /workstation, it will actually take you to that route instead of denying you)
	@app.route('/<path:dummy>')
	def dummy(dummy):
		return render_template('index.html')
	
	return app

# Create and Run the Application here.
if __name__ == '__main__':
	app = create_app()
	app.run()
