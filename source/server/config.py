# app configuration
import os

# Development Configuration for App.py
class Development(object):
	DEBUG = True
	TESTING = False
	FLASK_ENV = 'development'

	# Need to export the database_url variable (as detailed in the README)
	SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']

