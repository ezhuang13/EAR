# create the application

from flask import Flask, render_template
from views.UserView import user_api as user_blueprint
from config import app_config
import os

def create_app(env_name):
	"""
	Create the application!
	"""

	# initialize application
	app = Flask(__name__)

	# configure app based on the configurations we created
	app.config.from_object(app_config[env_name])

	# register api's for each 'model'
	# set the url_prefix to what the endpoint
	# will end up being
	app.register_blueprint(user_blueprint,url_prefix='/api/v1/users')

	@app.route('/', methods=['GET'])
	def index():
		return render_template('index.html')


	return app



# add REST endpoints here

# create and run the app here
if __name__ == '__main__':
	# just development for now
	env_name = os.getenv('FLASK_ENV')
	app = create_app(env_name)
	app.run()

