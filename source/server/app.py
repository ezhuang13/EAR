# create the application

from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import os
from config import Development

# Initialize the Flask application
app = Flask(__name__, static_folder='../static')

# Configure Application based on Configuration Object (JSON)
app.config.from_object(Development)
	
# Initialize the SQLAlchemy Database with our Application
db = SQLAlchemy(app)

# Import the API Routes as Blueprints
from routes import user_api as user_blueprint

# Register API's for each model
app.register_blueprint(user_blueprint, url_prefix='/api/v1/users')

# Render the Tempalte HTML file at the base route!
@app.route('/')
def index():
	return render_template('index.html')

# Create and Run the Application here.
if __name__ == '__main__':
	app.run()