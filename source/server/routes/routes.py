# this will serve as our RESTful routing
# for the users

from flask import request, Response, json, Blueprint, g
from models.user import UserModel, UserSchema
user_schema = UserSchema()


# save the User REST API as a blueprint
user_api = Blueprint('user_api',__name__)
# create user schema
user_schema = UserSchema()

@user_api.route('/', methods=['POST'])
def create():
	"""
	Create a user and add to db
	"""

	# Get the json, turn it into JSON serializable format
	req_data = request.get_json()
	data, error = user_schema.load(req_data)
	
	# if there is an error, return the nature of the error with status code 400
	if error:
		return custom_response(error, 400)
	# make sure that username is unique
	user_in_db = UserModel.get_user_by_username(data.get('username'))
	
	# if the user is already in the database, don't add database
	if user_in_db:
		message = {'error': 'User already exist, please supply another username'}
		return custom_response(message,400)
	
	
	print(data)

	# turn it into a UserModel, then save it to the db
	user = UserModel(data)
	user.save()

	# successful response!
	return custom_response(data,201)
	
@user_api.route('/', methods=['GET'])
def get_all():
	"""
	Get all users
	"""
	# get all users
	users = UserModel.get_all_users()

	# JSON serializable users
	ser_user = user_schema.dump(users,many=True).data

	# return successful response
	return custom_response(ser_user,201)

@user_api.route('/<user_id>',methods=['GET'])
def get_a_user(user_id):
	"""
	Get one user by id
	"""
	user = UserModel.get_one_user(user_id)

	# user not in db, return error
	if not user:
		return custom_response({'error':'user not found'},404)

	# get JSON serializable user
	ser_user = user_schema.dump(user).data

	# successful response
	return custom_response(ser_user,200)


@user_api.route('/<user_id>', methods=['DELETE'])
def delete(user_id):
	"""
	Delete a user based on id
	"""

	# get the user based on the ID
	user = UserModel.get_one_user(user_id)

	# delete it
	user.delete()

	# successful delete
	return custom_response({'message':'deleted'},204)

@user_api.route('/login',methods=['POST'])
def login():
	"""
	Request to log in for a user
	"""
# get json and turn it into schema format
	req_data = request.get_json()
	data,error = user_schema.load(req_data, partial=True)

# print it 
	print(data)

# if there's an error, return the error and status code 400
	if error:
		return custom_response(error,400)

	# if they didn't enter in their username or password, return error
	if not data.get('username') or not data.get('password'):
		return custom_response({'error':'username and password required to sign in'},400)
	user = UserModel.get_user_by_username(data.get('username'))

	# make sure user is in db
	if not user:
		return custom_response({'error':'invalid credentials'},400)
	
	# check the password to make sure it's correct
	if not user.check_hash(data.get('password')):
		return custom_response({'error':'invalid credentials'},400)

	# successful log in! return serialized JSON data
	ser_data = user_schema.dump(user).data
	return custom_response({'message':'successfully logged in'},201)

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

########## Restful API Routes for Other Models / Schemas ##########

# Just need to fill in similar to what's above.
