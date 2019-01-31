# app configuration
import os

class Development(object):
	"""
	Development environment configuration
	"""

	# must export these from the command line, and
	# these lines of code will grab the variable names
	# from the environment

	# for example, typing the following in the command line:
	# export DATABASE_URL='mydatabaseurl'

	# this will set SQL_ALCHEMY_DATABASE_URL = 'mydatabaseurl'

	# no debugging or testing just yet


	DEBUG = True
	TESTING = False
	FLASK_ENV = 'development'
	JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
	# this is how we connect to the database
	SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
