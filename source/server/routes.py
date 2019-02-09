# Holds all the different routes for the different models (defined as blueprints)
from flask import request, Response, json, Blueprint
from models import Users

########## Restful API Routes for the User Model / Schema ##########
user_api = Blueprint('user_api', __name__)
users = ''

@user_api.route('/', methods=['POST'])
def create():
		data = request.json
		print(data)

		user = Users(data)
		user.save()
		return custom_response(data,201)
	
@user_api.route('/', methods=['GET'])
def get_users():
		return custom_response(users, 201)

@user_api.route('/test', methods=['GET'])
def custom_response(res, status_code):
  return Response(
    mimetype="application/json",
    response=json.dumps(res),
    status=status_code
  )

########## Restful API Routes for Other Models / Schemas ##########

# Just need to fill in similar to what's above.
