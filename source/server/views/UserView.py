# this will serve as our RESTful routing
# for the users

from flask import request, Response, json, Blueprint
from models.User import UserModel

# save the User REST API as a blueprint
user_api = Blueprint('user_api',__name__)

@user_api.route('/', methods=['POST'])
def create():
	"""
	Create a user and add to db
	"""
	data = request.json
	print(data)

	user = UserModel(data)
	user.save()
	return custom_response(data,201)
	
@user_api.route('/', methods=['GET'])
def get_all():
	"""
	Get all users
	"""
	return custom_response(users,201)

def custom_response(res, status_code):
  """
  Custom Response Function
  @res: the response to be sent (i.e. a JSON object)
  @status_code: the status code to be sent in the response
  """

  return Response(
    mimetype="application/json",
    response=json.dumps(res),
    status=status_code
  )
