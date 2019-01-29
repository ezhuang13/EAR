# this will serve as our RESTful routing
# for the users

from flask import request, json, Blueprint

user_api = Blueprint('user_api',__name__)

@user_api.route('/', methods=['POST'])
def create():
	"""
	Create a user and add to db
	"""

	data = request.get_json()
	return data